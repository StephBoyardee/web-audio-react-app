import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const button = e.nativeEvent.submitter; // Get the button that was clicked
    const endpoint = button.name === 'newuser' ? 'register' : 'login';

    const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`${endpoint==='register' ? 'Registration' : 'Login'} was successful.`, data);
      // Store the user ID or token in local storage or state
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userSettings', data.userSettings);
      setIsLoggedIn(true);
      setLoggedInUsername(username);
    } else {
      console.error(`${endpoint==='register' ? 'Registration' : 'Login'} Failed.`);
    }
    

    
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {loggedInUsername}!</h2>
        </div>
      ) : (
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><span> DO NOT ENTER A REAL PASSWORD YOU USE</span>
        </div>
        <button name='login' type="submit">Login</button>
        <button name='newuser' type="submit">New User</button>
      </form>
      )}
    </div>
  );
}