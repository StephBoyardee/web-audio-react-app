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
  const [freq, setFreq] = useState(false)
  const [detune, setDetune] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  function handleClick() {
    if (!isStarted) {
      osc1.start();
      isStarted = true;
    }
    isPlaying ? gain1.gain.value=0 : gain1.gain.value=1;
    setIsPlaying(!isPlaying);
  }

  const changeOsc1Freq = (e) => {
    setFreq(e.target.value);
    osc1.frequency.value = e.target.value;
    console.log(e.target.value);
  };

  const changeOsc1Detune = (e) => {
    setDetune(e.target.value);
    osc1.detune.value = e.target.value;
    console.log(e.target.value);
  };

  return (
    <>
    <div className='App'>
      <h1>Sliders</h1>
      <button onClick={handleClick}>{isPlaying ? 'Stop' : 'Start'}</button>
      <Osc1 changeFrequency={changeOsc1Freq} changeDetune={changeOsc1Detune}/>
    </div>
    </>
  )
}

export default App
