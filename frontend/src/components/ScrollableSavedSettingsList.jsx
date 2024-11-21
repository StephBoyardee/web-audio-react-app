import { useEffect, useState } from 'react';

export default function ScrollableSavedSettingsList() {
  const [savedSettingsList, setSavedSettingsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  useEffect(() => {
    console.log('useEffect!!!!!!!!!!!!!!!!!!');
    const storedUserSettings = localStorage.getItem('userSettings');
    if (storedUserSettings) {
      setSavedSettingsList(storedUserSettings);
    }
  }, []);
  
  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
    {savedSettingsList.map((item, index) => (
      <div
      key={index}
      onClick={() => setSelectedItem(item)}
      style={{
        backgroundColor: selectedItem === item ? 'lightblue' : 'white',
        padding: '10px',
        cursor: 'pointer'
      }}
      >
      {item}
      </div>
    ))}
    </div>
  );
};