"use strict";
// ════════════════════════════════════════════════════════════════
// SETUP SCREEN
// ════════════════════════════════════════════════════════════════
function buildSetup() {
  $('presets').innerHTML = PRESETS.map((p, i) => `<button class="btn small" data-preset="${i}">${esc(p.label)}</button>`).join('') + `<button class="btn small" data-preset="clear">Clear all</button>`;
  $('ticks').innerHTML = GRAMMAR.map(g => `<label class="tick"><input type="checkbox" data-g="${g.k}"><span class="box"></span><span>${esc(g.name)}<span class="ch">${esc(g.ch)}</span></span></label>`).join('');
  $('qtypes').innerHTML = QTYPES.map(q => `<label class="tick"><input type="checkbox" data-t="${q.k}"><span class="box"></span><span>${esc(q.name)}</span></label>`).join('');
  $('presets').addEventListener('click', e => { const b = e.target.closest('[data-preset]'); if (!b) return; const p = b.dataset.preset; ticked = new Set(p === 'clear' ? [] : PRESETS[+p].keys.split('')); syncSetup(); });
  $('ticks').addEventListener('change', e => { const k = e.target.dataset.g; if (!k) return; e.target.checked ? ticked.add(k) : ticked.delete(k); syncSetup(); });
  $('qtypes').addEventListener('change', e => { const k = e.target.dataset.t; if (!k) return; e.target.checked ? types.add(k) : types.delete(k); syncSetup(); });
  $('gfx').addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (!b) return; quality = b.dataset.q; store.set('sepultaQuality', quality); applyQuality(); syncSetup(); });
  syncSetup();
}
function syncSetup() {
  document.querySelectorAll('[data-g]').forEach(i => i.checked = ticked.has(i.dataset.g));
  document.querySelectorAll('[data-t]').forEach(i => i.checked = types.has(i.dataset.t));
  document.querySelectorAll('[data-q]').forEach(b => b.classList.toggle('on', b.dataset.q === quality));
  const keyStr = [...ticked].sort().join('');
  document.querySelectorAll('[data-preset]').forEach(b => b.classList.toggle('on', b.dataset.preset !== 'clear' && PRESETS[+b.dataset.preset].keys === keyStr));
  store.set('grammar', [...ticked]); store.set('types', [...types]);
  const st = $('setupStatus'), btns = document.querySelectorAll('[data-level]');
  const warn = m => { st.textContent = m; st.className = 'status warn'; btns.forEach(b => b.disabled = true); };
  if (!ticked.size) return warn('Tick at least one grammar point.');
  if (!types.size) return warn('Tick at least one question type.');
  const n = availableItems().length;
  if (n < 15) return warn(`The game needs 15 sentences, but only ${n} in the book use just this grammar. Tick more grammar points.`);
  st.textContent = `${n} sentences from the book use only the ticked grammar.`; st.className = 'status'; btns.forEach(b => b.disabled = false);
}
function begin(k) {
  $('loading').classList.add('on');
  setTimeout(async () => {
    useLevel(k || LV.key);
    await modelsReady();
    $('introH').textContent = LV.intro.h; $('introWhen').textContent = LV.intro.when;
    $('introBody').innerHTML = LV.intro.body; $('introBtn').textContent = LV.intro.btn;
    newGame();
    $('loading').classList.remove('on');
    mode = 'intro'; show('sIntro');
  }, 40);
}
