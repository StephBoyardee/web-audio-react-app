import { createContext, useReducer, useState } from "react"; 
import { actx, osc1, gain1, filter, out } from '../audioContext';
// let actx = new AudioContext();
// let out = actx.destination;

// let osc1 = actx.createOscillator();
// let gain1 = actx.createGain();
// let filter = actx.createBiquadFilter();

// osc1.connect(filter);
// filter.connect(gain1);
// gain1.connect(out);

const CTX = createContext();
export { CTX }; //"named export" - name must match in file that imports it


//Only tracks state, DOES NOT change Web Audio API Objects values
//Web Audio API Objects values are changed in the components
let isStarted = false;
export function reducer(state, action){
  switch(action.type){
    //COULD ADD START STOP
    case 'TOGGLE_OSC1':
      if (!isStarted) {
        osc1.start();
        isStarted = true;
      }
      return {...state, isPlaying: !action.payload};
    case 'CHANGE_OSC1':
      return {...state, osc1Settings: action.payload};
    case 'CHANGE_OSC1_TYPE':
      return {...state, osc1Settings: {...state.osc1, type: action.payload}};
    case 'CHANGE_FILTER1':
      return {...state, filter1Settings: action.payload};
    case 'CHANGE_FILTER1_TYPE':
      return {...state, filter1Settings: {...state.filter1, type: action.payload}};
    default:
      console.log('reducer error. action: ', action);
      return {state};
  }
}

export default function Store(props){
  const stateHook = useReducer(reducer, {
    osc1Settings: {
      frequency: osc1.frequency.value,
      detune: osc1.detune.value,
      type: osc1.type,
    },

    filter1Settings: {
      frequency: filter.frequency.value,
      detune: filter.detune.value,
      Q: filter.Q.value,
      gain: filter.gain.value,
      type: filter.type 
    },
    isPlaying: false
  })
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
};