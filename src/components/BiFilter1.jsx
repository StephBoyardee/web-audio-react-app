function BiFilter1( {change, settings, changeType} ) {
  let {frequency, detune, Q, gain, type} = settings;
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
        <h3>Q</h3>
        <div className="input-group">
          <input value={Q} onChange={change} type='number' id='Q' max={10}/>
          <input value={Q} onChange={change} type='range' id='Q' max={10}/>
        </div>
      </div>
      <div className='param'>
        <h3>Gain</h3>
        <div className="input-group">
          <input value={gain} onChange={change} type='number' id='gain' max={10}/>
          <input value={gain} onChange={change} type='range' id='gain' max={10}/>
        </div>
      </div>

      <div className='param'>
        <h3>Filter Type</h3>
        <button className={`${type==='lowpass' && 'active'}`} onClick={changeType} id='lowpass' >Lowpass</button>
        <button className={`${type==='highpass' && 'active'}`} onClick={changeType} id='highpass' >Highpass</button>
        <button className={`${type==='bandpass' && 'active'}`} onClick={changeType} id='bandpass' >Bandpass</button>
        <button className={`${type==='lowshelf' && 'active'}`} onClick={changeType} id='lowshelf' >Lowshelf</button>
      </div>
    </div>
  );
};

export default BiFilter1;