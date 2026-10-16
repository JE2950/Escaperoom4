"use strict";
// ════════════════════════════════════════════════════════════════
// DIALOGUE
// ════════════════════════════════════════════════════════════════
let opts = [];
function say(who, html, choices) {
  $('dlg').classList.add('on');
  $('dlgWho').innerHTML = who ? `${esc(who.def.name)}<small>${esc(who.def.role)}</small>` : '';
  $('dlgTxt').innerHTML = html;
  opts = choices && choices.length ? choices : [{ label: 'Continue', fn: () => endTalk() }];
  $('dlgOpts').innerHTML = opts.map((o, i) => `<button class="opt${o.key ? ' key' : ''}" data-o="${i}"><span class="k">${i + 1}</span>${esc(o.label)}</button>`).join('');
}
function startTalk(n) {
  if (n.id === 'walker') { mode = 'talk'; unlockPointer(); talkN = n; say(null, `${LV.walker[1]} “${esc(pick(AMBIENT_LINES))}”`, [{ label: LV.walker[2], fn: endTalk }]); return; }
  mode = 'talk'; unlockPointer(); talkN = n; n.talking = true;
  const d = D[n.id];
  const first = !game.met[n.id];
  game.met[n.id] = true;
  say(n, esc(first ? (game.loop > 1 && game.everMet && game.everMet[n.id] ? d.again : d.greet) : pick(['Yes?', 'What is it now?', 'You again.', 'Speak.'])), menu(n));
  (game.everMet = game.everMet || {})[n.id] = true;
}
function line(n, html) { say(n, html, menu(n)); }
function menu(n) {
  const d = D[n.id], ch = [];
  ch.push({ label: 'Who are you?', fn: () => line(n, esc(d.who)) });
  for (const e of d.extra || []) ch.push({ label: e.label, fn: () => line(n, e.html ? e.text : esc(e.text)) });
  const done = solvedCount(n.id);
  if (d.intros && done < 3) ch.push({ label: done ? 'Can I help with anything else?' : 'Can I help you with anything?', fn: () => offerTask(n), key: true });
  if (d.clue) ch.push({ label: d.clueLabel || (LV.key === 2 ? 'Have you seen anything strange tonight?' : 'Have you seen anything strange today?'), fn: () => askClue(n), key: done === 3 && !game.clues[n.id] });
  if (n.id === LV.judge) ch.push({ label: LV.accuseLabel, fn: () => accuseStart(n), key: clueCount() >= 3 });
  ch.push({ label: 'Goodbye.', fn: endTalk });
  return ch;
}
function endTalk() {
  $('dlg').classList.remove('on');
  if (talkN) talkN.talking = false;
  talkN = null;
  if (mode === 'end') return;
  enterPlay();
}
function offerTask(n) {
  const b = PEOPLE.findIndex(p => p.id === n.id) * 3;
  let k = 0; while (k < 3 && game.results[b + k]) k++;
  say(n, esc(D[n.id].intros[k]), [{ label: 'Show me.', fn: () => openQuestion(n, b + k, k), key: true }, { label: 'Not now.', fn: () => line(n, 'As you wish.') }]);
}
function askClue(n) {
  const d = D[n.id];
  if (solvedCount(n.id) < 3) {
    line(n, esc(d.locked || (LV.key === 2 ? 'Strange? It is an army camp at night. Everything is strange. Help me first, then perhaps I will talk.' : 'Strange? Everything down here is strange. Help me first. Then perhaps I will talk.')));
    return;
  }
  const fresh = !game.clues[n.id];
  game.clues[n.id] = true;
  say(d.narrate ? null : n, d.narrate ? d.clue : esc(d.clue), menu(n));
  if (fresh) { sfx.clue(); toast(`<span class="g">NEW CLUE</span><br>Written in your journal. You now have ${clueCount()} of 5.`, 3800); }
}
function accuseStart(n) {
  if (game.accused) { line(n, LV.txt.already); return; }
  if (clueCount() < 3) { line(n, LV.txt.proof); return; }
  say(n, LV.txt.name, [
    ...SUSPECTS.map(id => ({ label: `${PEOPLE.find(p => p.id === id).name}, ${PEOPLE.find(p => p.id === id).role}.`, fn: () => accuse(n, id) })),
    { label: 'Not yet.', fn: () => line(n, LV.txt.notYet) },
  ]);
}
function accuse(n, id) {
  game.accused = true;
  if (id === LV.culprit) return ending();
  game.wrongAccuse++;
  const nm = PEOPLE.find(p => p.id === id).name;
  line(n, esc(LV.wrongLine(id, nm)));
}
