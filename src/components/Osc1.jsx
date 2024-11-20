import { useEffect, useRef, useState } from 'react';

function Osc1({change, settings, changeType}){
  let {frequency, detune, type} = settings;

  return (
    <div className='control'>
      <div className='param'>
        <h3>Frequency</h3>
        <div className="input-group">
          <input value={frequency} onChange={change} type='number' id='frequency' min={50} max={5000}/>
          <input value={frequency} onChange={change} type='range' id='frequency' min={50} max={5000}/>
        </div>
      </div>
      <div className='param'>
        <h3>Detune</h3>
        <div className="input-group">
          <input value={detune} onChange={change} type='number' id='detune' min={-100} max={100}/>
          <input value={detune} onChange={change} type='range' id='detune' min={-100} max={100}/>
        </div>
      </div>

      <div className='param'>
        <h3>WaveForm</h3>
        <button className={`${type==='sine' && 'active'}`} onClick={changeType} id='sine' >Sine</button>
        <button className={`${type==='sawtooth' && 'active'}`} onClick={changeType} id='sawtooth' >Sawtooth</button>
        <button className={`${type==='triangle' && 'active'}`} onClick={changeType} id='triangle' >Triangle</button>
        <button className={`${type==='square' && 'active'}`} onClick={changeType} id='square' >Square</button>
      </div>
    </div>
  )
};

export default Osc1