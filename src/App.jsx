import { useEffect, useRef, useState } from 'react';
import Osc1 from './components/Osc1';
import './App.scss'

let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

osc1.connect(gain1);
gain1.connect(out);

let isStarted = false;

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const [osc1Settings, setOsc1Settings] = useState({
    frequency: 440,
    detune: 0
  })

  function handleClick() {
    if (!isStarted) {
      osc1.start();
      isStarted = true;
    }
    isPlaying ? gain1.gain.value=0 : gain1.gain.value=1;
    setIsPlaying(!isPlaying);
  }

  function changeOsc1(e) {
    let {value, id} = e.target;
    setOsc1Settings({...osc1Settings, [id]: value});
    osc1[id].value = value;
  }

  return (
    <>
    <div className='App'>
      <h1>Sliders</h1>
      <button onClick={handleClick}>{isPlaying ? 'Stop' : 'Start'}</button>
      <Osc1 
      change={changeOsc1}
      settings={osc1Settings}
      />
    </div>
    </>
  )
}

export default App
