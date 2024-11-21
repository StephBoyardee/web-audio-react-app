// audioContext.js
console.log('audioContext.js is being run');


const actx = new (window.AudioContext || window.webkitAudioContext)();
const out = actx.destination;

const osc1 = actx.createOscillator();
const gain1 = actx.createGain();
const filter = actx.createBiquadFilter();

osc1.connect(filter);
filter.connect(gain1);
gain1.connect(out);

export { actx, osc1, gain1, filter, out };