import { useEffect, useRef, useState } from 'react';
import Osc1 from './components/Osc1';
import BiFilter1 from './components/BiFilter1';
import './App.scss'

let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();
let filter = actx.createBiquadFilter();

osc1.connect(filter);
filter.connect(gain1);
gain1.connect(out);

let isStarted = false;

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [osc1Settings, setOsc1Settings] = useState({
    frequency: osc1.frequency.value,
    detune: osc1.detune.value,
    type: osc1.type 
  });

  const [filter1Settings, setFilter1Settings] = useState({
    frequency: filter.frequency.value,
    detune: filter.detune.value,
    Q: filter.Q.value,
    gain: filter.gain.value,
    type: filter.type 
  });

  
  function handleClick() {
    if (!isStarted) {
      osc1.start();
      isStarted = true;
    }
    isPlaying ? gain1.gain.value=0 : gain1.gain.value=1;
    setIsPlaying(!isPlaying);
  };

  function changeOsc1(e) {
    let {value, id} = e.target;
    setOsc1Settings({...osc1Settings, [id]: value});
    osc1[id].value = value;
  };

  function changeOsc1Type(e){
    let { id } = e.target;
    setOsc1Settings({...osc1Settings, type: id});
    osc1.type = id;
    console.log(id)
  };

  function changeFilter1(e) {
    let {value, id} = e.target;
    setFilter1Settings({...filter1Settings, [id]: value});
    filter[id].value = value;
  }

  function changeFilter1Type(e){
    let { id } = e.target;
    setFilter1Settings({...filter1Settings, type: id});
    filter.type = id;
    console.log(id)
  }

  return (
    <>
    <div className='App'>
      <h1>Sliders</h1>
      <button onClick={handleClick}>{isPlaying ? 'Stop' : 'Start'}</button>
      <Osc1 
        change={changeOsc1}
        changeType={changeOsc1Type}
        settings={osc1Settings}
      />
      <BiFilter1 
        change={changeFilter1}
        changeType={changeFilter1Type}
        settings={filter1Settings}
      />
    </div>
    </>
  )
}

export default App
