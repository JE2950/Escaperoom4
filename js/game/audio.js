"use strict";
// ════════════════════════════════════════════════════════════════
// AUDIO
// ════════════════════════════════════════════════════════════════
let AC = null, noiseBuf = null, master = null;
function initAudio() {
  if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    master = AC.createGain(); master.gain.value = 0.9; master.connect(AC.destination);
    noiseBuf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // the cave hums: two low tones and filtered air
    [[55, 0.018], [82.4, 0.01], [110.3, 0.004]].forEach(([f, g]) => { const o = AC.createOscillator(), gn = AC.createGain(); o.frequency.value = f; gn.gain.value = g; o.connect(gn); gn.connect(master); o.start(); });
    const s = AC.createBufferSource(), fl = AC.createBiquadFilter(), gn = AC.createGain(); s.buffer = noiseBuf; s.loop = true; fl.type = 'lowpass'; fl.frequency.value = 380; gn.gain.value = 0.035;
    s.connect(fl); fl.connect(gn); gn.connect(master); s.start();
  } catch (e) { AC = null; }
}
function tone(freq, dur, type, vol, slide, delay) {
  if (!AC) return; const t = AC.currentTime + (delay || 0);
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.linearRampToValueAtTime(freq + slide, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol || 0.05, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
}
function noise(dur, vol, freq, delay, q) {
  if (!AC) return; const t = AC.currentTime + (delay || 0);
  const s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
  s.buffer = noiseBuf; f.type = q ? 'bandpass' : 'lowpass'; f.frequency.value = freq; if (q) f.Q.value = q;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + dur + 0.05);
}
const sfx = {
  click: () => tone(880, 0.06, 'sine', 0.03),
  right: () => { tone(523, 0.3, 'triangle', 0.05); tone(659, 0.3, 'triangle', 0.05, 0, 0.1); tone(784, 0.5, 'triangle', 0.05, 0, 0.2); },
  wrong: () => tone(196, 0.4, 'triangle', 0.06, -40),
  clue: () => { [392, 523, 659, 784].forEach((f, i) => tone(f, 0.6, 'sine', 0.04, 0, i * 0.09)); },
  step: () => noise(0.07, 0.05, 900, 0, 1.2),
  bell: () => { tone(220, 2.5, 'sine', 0.06); tone(330, 2.5, 'sine', 0.03); tone(441, 2, 'sine', 0.015); },
  rumble: () => { noise(4, 0.5, 90); noise(3, 0.25, 160, 0.5); },
  win: () => [392, 494, 587, 784, 988].forEach((f, i) => tone(f, 0.9, 'triangle', 0.045, 0, i * 0.16)),
};
