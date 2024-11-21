import { useContext } from 'react';
import {CTX} from '../context/Store';
import {osc1} from '../audioContext';

function Osc1(){
  const [state, dispatch] = useContext(CTX);
  let {frequency, detune, type} = state.osc1Settings;

  function change(e){
    let {value, id} = e.target;
    dispatch({type: 'CHANGE_OSC1', payload: {...state.osc1Settings, [id]: value}});
    osc1[id].value = value;
  };
  
  function changeType(e){
    let { id } = e.target;
    dispatch({type: 'CHANGE_OSC1_TYPE', payload: id});
    osc1.type = id;
  }

  function change2(e){
    let {value, id} = e.target;
    dispatch({type: 'CHANGE_OSC1', payload: {...state.osc1Settings, [id]: value}});
    osc1[id].value = value;
  };

  function changeType2(e){
    let { id } = e.target;
    dispatch({type: 'CHANGE_OSC1_TYPE', payload: {id}});
  }

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
        <h3>Waveform</h3>
        <button value={type} className={`${type==='sine' && 'active'}`} onClick={changeType} id='sine' >Sine</button>
        <button value={type} className={`${type==='sawtooth' && 'active'}`} onClick={changeType} id='sawtooth' >Sawtooth</button>
        <button value={type} className={`${type==='triangle' && 'active'}`} onClick={changeType} id='triangle' >Triangle</button>
        <button value={type} className={`${type==='square' && 'active'}`} onClick={changeType} id='square' >Square</button>
      </div>
    </div>
  )
};

export default Osc1;