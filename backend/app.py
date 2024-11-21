from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import uuid

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure the SQLAlchemy part of the app instance
db_username = 'web_audio_react_app'
db_password = os.getenv('DB_PASSWORD')
db_name = 'web_audio_react_test' #os.getenv('DB_NAME')
db_host = 'localhost'

# Configure the SQLAlchemy part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_username}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# Define a model for users
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

# Define a model
class Settings(db.Model):
    saveSettingName = db.Column(db.String(50), nullable=False),
    id = db.Column(db.Integer, primary_key=True)
    osc1_frequency = db.Column(db.Float, nullable=False)
    osc1_detune = db.Column(db.Float, nullable=False)
    osc1_type = db.Column(db.String(50), nullable=False)
    filter_frequency = db.Column(db.Float, nullable=False)
    filter_detune = db.Column(db.Float, nullable=False)
    filter_Q = db.Column(db.Float, nullable=False)
    filter_gain = db.Column(db.Float, nullable=False)
    filter_type = db.Column(db.String(50), nullable=False)
    is_playing = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)


# Create the database and the database table
with app.app_context():
    db.create_all()

@app.route('/ack', methods=['POST'])
def ack():
    data = request.get_json()
    print(f"Received message: {data['message']}")
    return jsonify({"status": "success", "message": "Acknowledged"}), 200

@app.route('/db', methods=['POST'])
def save_message():
    try:
        data = request.get_json()
        print(f"Received settings: {data}")
        storedUserId = data.get('user_Id')
        print(f"1")
        if not storedUserId:
            return jsonify({"status": "error", "message": "User ID not provided"}), 400
        print(f"2")
        new_settings = Settings(
            saveSettingName=data['saveSettingName'],
            osc1_frequency=data['osc1Settings']['frequency'],
            osc1_detune=data['osc1Settings']['detune'],
            osc1_type=data['osc1Settings']['type'],
            filter_frequency=data['filter1Settings']['frequency'],
            filter_detune=data['filter1Settings']['detune'],
            filter_Q=data['filter1Settings']['Q'],
            filter_gain=data['filter1Settings']['gain'],
            filter_type=data['filter1Settings']['type'],
            is_playing=data['isPlaying'],
            user_id=storedUserId
        )
        print(f"3")
        db.session.add(new_settings)
        db.session.commit()
        print(f"4")
        return jsonify({"status": "success", "message": "Settings saved"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": "Error saving settings"}), 500    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Authenticate user (this is a simple example, you should hash passwords and use a secure method)
    user = User.query.filter_by(username=username, password=password).first()
    userSettings = Settings.query.filter_by(user_id=user.id)
    print(f"UserSettings: {userSettings}")
    if user:
        return jsonify({"status": "success", "userId": user.id}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401
    
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"New User: {data}")
        username = data.get('username')
        password = data.get('password')
        new_user = User(
            username=username,
            password=password
        )
        db.session.add(new_user)
        db.session.commit()
        user = User.query.filter_by(username=username, password=password).first()
        return jsonify({"status": "success", "message": "User Created", "userId": user.id}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": "Error creating new user"}), 500   

if __name__ == '__main__':
    app.run(debug=True)