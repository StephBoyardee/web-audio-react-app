import { useEffect, useRef, useState } from 'react';

function Osc1({changeFrequency, changeDetune}){
  const [frequency, setFrequency] = useState(440);
  const [detune, setDetune] = useState(0);
  
  function handleChangeFrequency(e){
    const newFreq = e.target.value;
    
    if(newFreq < 50) setFrequency(50);
    else if(newFreq > 5000) setFrequency(5000);
    
    setFrequency(e.target.value);
    changeFrequency(e);
  }

  function handleChangeDetune(e){
    const newDetune = e.target.value;
    
    if(newDetune < -100) setDetune(-100);
    else if(newDetune > 100) setDetune(100);
    
    setDetune(e.target.value);
    changeDetune(e);
  }
  
  return (
    <div className='control'>
      <div className='param'>
        <h3>Frequency</h3>
        <input value={frequency} onChange={handleChangeFrequency} type='number' id='frequency' min={50} max={5000}/>
        <input value={frequency} onChange={handleChangeFrequency} type='range' id='frequency' min={50} max={5000}/>
      </div>
      <div className='param'>
        <h3>detune</h3>
        <input value={detune} onChange={handleChangeDetune} type='number' id='detune' min={-100} max={100}/>
        <input value={detune} onChange={handleChangeDetune} type='range' id='detune' min={-100} max={100}/>
      </div>
    </div>
    
    
  )
};

export default Osc1