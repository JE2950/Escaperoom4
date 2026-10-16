"use strict";
// ════════════════════════════════════════════════════════════════
// SCREENS AND HUD
// ════════════════════════════════════════════════════════════════
function show(id) {
  ['sTitle', 'sIntro', 'sLoop', 'sPause', 'sQ', 'sJournal', 'sEnd'].forEach(s => $(s).classList.toggle('on', s === id));
  $('hud').classList.toggle('on', !!game && (!id || id === 'sQ' || id === 'sJournal' || id === 'sPause'));
  $('touch').classList.toggle('on', !id && mode === 'play');
}
function toast(html, ms) { const t = $('toast'); t.innerHTML = html; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms || 3200); }
function banner(l, s) { $('locL').textContent = l; $('locS').textContent = s; const e = $('loc'); e.classList.add('show'); clearTimeout(locT); locT = setTimeout(() => e.classList.remove('show'), 3200); }
const ROMAN = n => ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'][n] || String(n);
function updateClock() {
  const h = Math.min(12, Math.floor(game.clock / HOUR) + 1);
  const ct = LV.clock(h, game.loop);
  $('clockT').textContent = ct[0];
  $('clockS').textContent = ct[1];
  $('clockFill').style.width = (game.clock / (12 * HOUR) * 100) + '%';
}
function zoneAt1(x, z) {
  if (z > 28) return ['The Riverbank', 'ripa'];
  if (z < -31) return ['The Temple of Vulcan', 'templum Vulcani'];
  if (Math.abs(x) < 16 && Math.abs(z) < 12) return ['The Forum', 'forum'];
  if (x > -11 && x < -1 && z > 17 && z < 26) return ['The Bakery', 'pistrina'];
  if (x > 17 && x < 26 && z > -3 && z < 7) return ['The Smithy', 'fabrica'];
  return ['The Streets', 'viae'];
}
