"use strict";
// ════════════════════════════════════════════════════════════════
// THE DAY: hours, the magistrate's walk, and the twelfth hour
// ════════════════════════════════════════════════════════════════
const AULUS_PATH = [[-11.5, 0], [-4, -9], [-2.2, -14], [-2.2, -30], [-2.2, -38.5], [-2.6, -41.2]];
function tickDay(dt) {
  const before = Math.floor(game.clock / HOUR);
  game.clock += dt;
  const hr = Math.floor(game.clock / HOUR);
  if (hr !== before && hr < 12) {
    sfx.bell();
    const tt = LV.hourToast(hr); if (tt) toast(tt, 4000);
  }
  if (hr >= 10) { const a = npc(LV.culprit); if (a && !a.path && !a.done) { a.path = LV.culpritPath.slice(); a.walk = 1; } }
  if (game.clock >= 12 * HOUR) loopEnd();
}
function loopEnd() {
  mode = 'loopend'; unlockPointer(); $('dlg').classList.remove('on');
  LV.loopEnd();
  $('flash').style.opacity = 1;
  setTimeout(() => { $('veil').style.opacity = 1; }, 1800);
  setTimeout(() => {
    $('flash').style.opacity = 0;
    game.loop++;
    const lt = LV.loopText(clueCount() >= 3);
    $('loopH').textContent = lt[0];
    $('loopWhen').textContent = `${LV.dayWord.toUpperCase()} ${ROMAN(game.loop)}`;
    $('loopP1').textContent = lt[1];
    $('loopP2').textContent = lt[2];
    resetDay();
    show('sLoop'); $('veil').style.opacity = 0;
  }, 3800);
}
function ending() {
  mode = 'end';
  const seq = LV.ending();
  let i = 0;
  const next = () => { if (i >= seq.length) { $('dlg').classList.remove('on'); return showEnd(); } const [who, txt] = seq[i++]; say(who, txt, [{ label: i < seq.length ? 'Continue' : LV.lastBtn, fn: next }]); };
  next();
}
function showEnd() {
  sfx.win(); mode = 'end';
  const mins = Math.round((performance.now() - game.t0) / 60000);
  $('endH').textContent = LV.endH;
  $('endSub').textContent = LV.endSub(game.loop, helpedCount());
  $('nextBtn').style.display = LV.next ? '' : 'none';
  const answered = game.results.filter(Boolean).length;
  $('endScore').innerHTML = `${game.score} / 15<small>Latin tasks right first time · ${answered} of 15 attempted · about ${mins} minute${mins === 1 ? '' : 's'}</small>`;
  const missed = {};
  game.results.forEach(r => { if (r && !r.first) missed[r.q.focus] = (missed[r.q.focus] || 0) + 1; });
  let h = LV.fact;
  const ks = GRAMMAR.filter(g => missed[g.k]);
  if (ks.length) h += `<h3>GRAMMAR TO REVISE</h3><ul>` + ks.map(g => `<li>${esc(g.name)} <span class="ch">· ${esc(g.ch)} · ${missed[g.k]} ${missed[g.k] === 1 ? 'question' : 'questions'}</span></li>`).join('') + `</ul><div style="height:18px"></div>`;
  h += `<h3>YOUR ANSWERS</h3><table class="rev">`;
  game.results.forEach((r, i) => {
    if (!r) return;
    const q = r.q; let qt = esc(q.it.lat), at = esc(q.it.en);
    if (q.type === 'parse') { qt = `${esc(words(q.it.lat)[q.target])} <span class="a">in</span> ${esc(q.it.lat)}`; at = esc(q.answer); }
    if (q.type === 'gap') at = `${esc(q.answer)} · ${esc(q.it.en)}`;
    h += `<tr><td class="n">${i + 1}</td><td><div class="q">${qt}</div><div class="a">${at}</div></td><td class="m ${r.first ? 'ok' : 'no'}">${r.first ? '✓' : '✗'}</td></tr>`;
  });
  h += '</table>';
  if (answered < 15) h += `<p class="ch" style="margin-top:12px">You left ${15 - answered} task${15 - answered === 1 ? '' : 's'} undone. Play again to help everyone.</p>`;
  $('endBody').innerHTML = h;
  show('sEnd');
}
