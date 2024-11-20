import { useEffect, useRef, useState } from 'react';

function Osc1({change, settings}){
  
  return (
    <div className='control'>
      <div className='param'>
        <h3>Frequency</h3>
        <input value={settings.frequency} onChange={change} type='number' id='frequency' min={50} max={5000}/>
        <input value={settings.frequency} onChange={change} type='range' id='frequency' min={50} max={5000}/>
      </div>
      <div className='param'>
        <h3>detune</h3>
        <input value={settings.detune} onChange={change} type='number' id='detune' min={-100} max={100}/>
        <input value={settings.detune} onChange={change} type='range' id='detune' min={-100} max={100}/>
      </div>
    </div>
    
    
  )
};

export default Osc1