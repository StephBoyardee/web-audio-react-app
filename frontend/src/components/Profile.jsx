import { useEffect, useContext, useState } from 'react';
import {CTX} from '../context/Store';

export default function SaveSettings() {
  const [state, dispatch] = useContext(CTX);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [saveSettingName, setSaveSettingName] = useState('default');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsUserLoggedIn(true);
    }
  }, []);

  function handleChangeSaveSettingsName(e) {
    setSaveSettingName(e.target.value);
  };

  const handleSaveSettings = async () => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error('User ID not found in local storage');
      return;
    }

    const data = {
      saveSettingName: saveSettingName, 
      osc1Settings: state.osc1Settings,
      filter1Settings: state.filter1Settings,
      isPlaying: false, // always set to false
      user_Id: storedUserId
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Data sent successfully:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <>
      <label>Save Settings Name</label>
      <input value={saveSettingName} type='text' onChange={handleChangeSaveSettingsName} />
      <button disabled={!isUserLoggedIn} onClick={handleSaveSettings}>Save Settings</button>
    </>
  );
};


