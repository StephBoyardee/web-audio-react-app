import { useContext } from 'react';
import {CTX} from './context/Store';
import Osc1 from './components/Osc1';
import BiFilter1 from './components/BiFilter1';
import {gain1} from './audioContext';
import SaveSettings from './components/Profile';
//import ScrollableSavedSettingsList from './components/ScrollableSavedSettingsList';
import Login from './components/Login';

import './App.scss'

function App() {
  const [state, dispatch] = useContext(CTX);
  
  function dispatchToggle() {
    dispatch({type: 'TOGGLE_OSC1', payload: state.isPlaying});
    state.isPlaying ? gain1.gain.value=0 : gain1.gain.value=1;
  }

  return (
    <>
    <div className='App'>
      <h1>Sliders</h1>
      <button value={state.isPlaying} onClick={dispatchToggle}>{state.isPlaying ? 'Stop' : 'Start'}</button>
      <Login />
      <SaveSettings />
      <Osc1 />
      <BiFilter1 />
      {/* <ScrollableSavedSettingsList /> */}
    </div>
    </>
  );
}

export default App;
