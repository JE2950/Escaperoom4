"use strict";
// ════════════════════════════════════════════════════════════════
// LATIN TASKS (the question logic is shared with Fuga Romana)
// ════════════════════════════════════════════════════════════════
function maxAttempts(q) { return q.type === 'un' ? 3 : Math.max(1, Math.min(3, q.opts.length - 1)); }
function latinHtml(q) {
  if (q.type === 'gap' || q.type === 'parse') {
    const idx = q.type === 'gap' ? q.gapIdx : q.target; let n = -1;
    return esc(q.it.lat).replace(/[A-Za-z]+/g, m => { n++; if (n !== idx) return m; return q.type === 'gap' ? '<span class="gap" id="gapSlot">&nbsp;</span>' : `<span class="tgt">${m}</span>`; });
  }
  return esc(q.it.lat);
}
function solvedLine(q) {
  if (q.type === 'parse') return `<em>${esc(words(q.it.lat)[q.target])}</em>: ${esc(q.answer)}.`;
  return `<em>${esc(q.it.lat)}</em> = ${esc(q.it.en)}`;
}
function orderCorrect(q, placed) {
  const want = q.tokens.map(lc), got = placed.map(lc);
  if (got.join(' ') === want.join(' ')) return true;
  if (got.length !== want.length) return false;
  if ([...got].sort().join(' ') !== [...want].sort().join(' ')) return false;
  if (got[got.length - 1] !== want[want.length - 1]) return false;
  const pairs = new Set(got.slice(0, -1).map((g, i) => g + ' ' + got[i + 1]));
  for (let i = 0; i < want.length - 1; i++) if (GLUE.has(want[i]) && !pairs.has(want[i] + ' ' + want[i + 1])) return false;
  return true;
}
function openQuestion(n, qi, k) {
  curQ = { n, qi, k, q: game.qs[qi], attempts: 0, answered: false, placed: [] };
  mode = 'question'; $('dlg').classList.remove('on');
  sfx.click(); renderQuestion(); show('sQ');
}
function renderQuestion() {
  const { q, n, k } = curQ;
  let h = `<div class="q-head"><span>${esc(n.def.name)} · task ${k + 1} of 3</span><span class="nm">Question ${curQ.qi + 1} of 15</span></div>`;
  h += `<div class="q-task">${esc(q.prompt)}</div>`;
  if (q.type === 'un') h += `<div class="q-en big">${esc(q.it.en)}</div>`;
  else { h += `<div class="q-latin">${latinHtml(q)}</div>`; if (q.type === 'gap') h += `<div class="q-en">${esc(q.it.en)}</div>`; }
  h += `<div class="q-meta"><div class="dots">Tries:`;
  for (let a = 0; a < maxAttempts(q); a++) h += `<div class="dotq" id="qd${a}"></div>`;
  h += `</div>`;
  const t = helpEnabled ? TABLES[q.hint] : null;
  if (t) h += `<button class="wbtn small" id="qHelp">Grammar table</button>`;
  h += `</div>`;
  if (t) {
    h += `<div class="gtable" id="qTable"><strong>${esc(t.title)}</strong><table><tr>${t.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr>`;
    t.rows.forEach(r => { h += '<tr>' + r.map(c => `<td>${esc(c)}</td>`).join('') + '</tr>'; });
    h += '</table>' + (t.note ? `<div class="note">${esc(t.note)}</div>` : '') + '</div>';
  }
  if (q.type === 'un') {
    h += `<div class="slots" id="qSlots"></div><div class="bank">`;
    q.bank.forEach((w, i) => { h += `<button class="wbtn tok" data-tok="${i}">${esc(w)}</button>`; });
    h += `</div><div class="row"><button class="wbtn" id="qCheck">Check</button><button class="wbtn" id="qClear">Clear</button></div>`;
  } else {
    h += '<div class="choices">';
    q.opts.forEach((o, i) => { h += `<button class="wbtn choice${o.latin ? ' lat' : ''}" data-opt="${i}"><span class="k">${i + 1}</span><span>${esc(o.text)}</span></button>`; });
    h += '</div>';
  }
  h += `<div class="feed" id="qFeed"></div><div class="q-done" id="qDoneRow"><button class="wbtn" id="qDone">Give it back to ${esc(n.def.name)} ▶</button></div>`;
  $('qPanel').innerHTML = h;
  if (q.type === 'un') renderSlots();
  $('sQ').scrollTop = 0;
}
function renderSlots() {
  const q = curQ.q;
  $('qSlots').innerHTML = curQ.placed.length ? curQ.placed.map((t, i) => `<button class="wbtn tok" data-placed="${i}">${esc(q.bank[t])}</button>`).join('') : '<span class="ph">Tap the words below in order.</span>';
  document.querySelectorAll('[data-tok]').forEach(el => el.classList.toggle('used', curQ.placed.includes(+el.dataset.tok)));
}
function feedback(ok, html) { const b = $('qFeed'); b.className = 'feed show ' + (ok ? 'ok' : 'no'); b.innerHTML = html; }
function markDot(a, ok) { const d = $('qd' + a); if (d) d.classList.add(ok ? 'ok' : 'no'); }
function triesLeft() { const n = maxAttempts(curQ.q) - curQ.attempts; return n === 1 ? '1 try left.' : n + ' tries left.'; }
function finishQ(ok) {
  curQ.answered = true;
  const first = ok && curQ.attempts === 1;
  if (first) game.score++;
  game.results[curQ.qi] = { q: curQ.q, first, ok };
  document.querySelectorAll('#qPanel [data-opt], #qPanel [data-tok], #qPanel [data-placed], #qCheck, #qClear').forEach(b => b.disabled = true);
  $('qDoneRow').classList.add('show');
  setTimeout(() => $('qDone').focus({ preventScroll: true }), 50);
}
function chooseOpt(i) {
  if (curQ.answered) return;
  const q = curQ.q, o = q.opts[i], btn = document.querySelector(`#qPanel [data-opt="${i}"]`);
  if (!btn || btn.classList.contains('no')) return;
  curQ.attempts++; markDot(curQ.attempts - 1, o.ok); btn.classList.add(o.ok ? 'ok' : 'no');
  if (q.type === 'gap' && o.ok) $('gapSlot').textContent = o.text;
  if (o.ok) { sfx.right(); feedback(true, '✓ ' + solvedLine(q)); finishQ(true); return; }
  sfx.wrong();
  if (curQ.attempts >= maxAttempts(q)) {
    q.opts.forEach((x, j) => { if (x.ok) document.querySelector(`#qPanel [data-opt="${j}"]`).classList.add('ok'); });
    if (q.type === 'gap') $('gapSlot').textContent = q.answer;
    feedback(false, '✗ The right answer: ' + solvedLine(q)); finishQ(false);
  } else feedback(false, '✗ Not that one. ' + triesLeft());
}
function checkOrder() {
  if (curQ.answered || !curQ.placed.length) return;
  const q = curQ.q; curQ.attempts++;
  const ok = orderCorrect(q, curQ.placed.map(t => q.bank[t])); markDot(curQ.attempts - 1, ok);
  if (ok) { sfx.right(); feedback(true, '✓ ' + solvedLine(q)); finishQ(true); return; }
  sfx.wrong();
  if (curQ.attempts >= maxAttempts(q)) { feedback(false, '✗ The right answer: ' + solvedLine(q)); finishQ(false); }
  else feedback(false, '✗ Not yet. ' + triesLeft());
}
function closeQuestion() {
  const { n, k } = curQ, r = game.results[curQ.qi]; curQ = null;
  show(null); mode = 'talk';
  const after = solvedCount(n.id) === 3 ? ' That is everything I needed. Thank you.' : '';
  say(n, esc((r.ok ? D[n.id].thanks[k] : 'Never mind. At least now we both know the answer.') + after), menu(n));
}

// ── Reading carved and painted Latin ──
function openRead(note) {
  mode = 'read'; unlockPointer(); sfx.click();
  if (note.title === 'The Law of Vulcan') game.seenLaw = true;
  $('qPanel').innerHTML = `<div class="q-head"><span>Something to read</span><span class="nm">${esc(note.title)}</span></div>` +
    `<div class="q-latin">${esc(note.lat)}</div><div class="q-en">${esc(note.en)}</div><div class="note-about">${esc(note.about)}</div>` +
    `<div class="q-done show"><button class="wbtn" id="readClose">Carry on ▶</button></div>`;
  show('sQ');
}

// ── Journal ──
function openJournal() {
  if (!game) return;
  const prev = mode; mode = 'journal'; unlockPointer();
  const h = Math.min(12, Math.floor(game.clock / HOUR) + 1);
  let b = `<h2>Diarium</h2><p class="empty">${LV.when(h, game.loop)} ${game.loop > 1 ? `You have lived this ${LV.key === 2 ? 'night' : 'day'} before. You remember everything.` : ''}</p>`;
  b += `<h4>THE LAW</h4>${LV.lawHtml}`;
  b += `<h4>WHAT YOU MUST DO</h4><p>${LV.mustDo}</p>`;
  const cl = PEOPLE.filter(p => game.clues[p.id]);
  b += `<h4>CLUES (${cl.length} of 5)</h4>` + (cl.length ? `<ul>${cl.map(p => `<li>${esc(D[p.id].clueShort)}</li>`).join('')}</ul>` : '<p class="empty">No clues yet. People only share secrets with those who help them.</p>');
  b += `<h4>PEOPLE</h4><ul>${PEOPLE.map(p => { const s = solvedCount(p.id); return `<li><span class="who">${esc(p.name)}</span>, ${esc(p.role)}. <span class="ticks3">${'●'.repeat(s)}${'○'.repeat(3 - s)}</span> ${s === 3 ? (game.clues[p.id] ? 'Helped. Clue found.' : 'Helped. Ask what they have seen.') : `${3 - s} task${3 - s === 1 ? '' : 's'} left.`}</li>`; }).join('')}</ul>`;
  b += `<h4>LATIN</h4><p>Right first time: ${game.score} of ${game.results.filter(Boolean).length} answered. 15 tasks in all.</p>`;
  b += `<div class="row-c"><button class="btn" id="jClose" style="color:#2e2214;border-color:#7a5a2a">Close the journal</button></div>`;
  $('jBody').innerHTML = b;
  game.jPrev = prev;
  show('sJournal');
}
function closeJournal() { if (game.jPrev === 'pause') { mode = 'pause'; show('sPause'); } else enterPlay(); }
