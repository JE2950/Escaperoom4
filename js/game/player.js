"use strict";
// ════════════════════════════════════════════════════════════════
// PLAYER, INPUT AND INTERACTION
// ════════════════════════════════════════════════════════════════
const PR = 0.32, EYE = 1.62;
let shake = 0, stepT = 0, target = null;
let isTouch = coarse;
function setTouch(on) { isTouch = on; document.body.classList.toggle('touch', on); }
setTouch(isTouch);
window.addEventListener('touchstart', () => { if (!isTouch) setTouch(true); }, { passive: true, capture: true });
const touch = { on: false, jx: 0, jy: 0, jid: null, lid: null, lx: 0, ly: 0 };

function enterPlay() {
  mode = 'play'; show(null);
  if (!isTouch && canvas.requestPointerLock && document.pointerLockElement !== canvas) { try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => {}); } catch (e) {} }
}
function unlockPointer() { if (document.pointerLockElement) document.exitPointerLock(); for (const k in keys) keys[k] = false; }
function pauseGame() {
  if (mode !== 'play') return;
  mode = 'pause'; unlockPointer();
  const h = Math.min(12, Math.floor(game.clock / HOUR) + 1);
  $('pauseInfo').textContent = `${LV.when(h, game.loop)} Clues found: ${clueCount()} of 5. Time stands still while you rest here.`;
  show('sPause');
}
function blocked(nx, nz, y) {
  if (!walkable(nx, nz)) return true;
  if (groundY(nx, nz) - y > 0.55) return true;
  for (const c of COL) if (nx > c.x0 - PR && nx < c.x1 + PR && nz > c.z0 - PR && nz < c.z1 + PR && y < c.top - 0.25) return true;
  for (const n of NPCS) if (!n.gone && Math.hypot(nx - n.x, nz - n.z) < 0.55 && Math.abs(n.y - y) < 1.5) return true;
  return false;
}
function updatePlayer(dt) {
  let fx = 0, fz = 0;
  if (keys.KeyW || keys.ArrowUp) fz += 1; if (keys.KeyS || keys.ArrowDown) fz -= 1;
  if (keys.KeyD || keys.ArrowRight) fx += 1; if (keys.KeyA || keys.ArrowLeft) fx -= 1;
  if (touch.on) { fx += touch.jx; fz -= touch.jy; }
  const len = Math.hypot(fx, fz); if (len > 1) { fx /= len; fz /= len; }
  const sp = (keys.ShiftLeft || keys.ShiftRight) ? 6 : 3.6;
  const s = Math.sin(P.yaw), c = Math.cos(P.yaw);
  const vx = (-s * fz + c * fx) * sp, vz = (-c * fz - s * fx) * sp;
  const nx = P.x + vx * dt, nz = P.z + vz * dt;
  if (!blocked(nx, P.z, P.y)) P.x = nx;
  if (!blocked(P.x, nz, P.y)) P.z = nz;
  const gy = groundY(P.x, P.z);
  let floor = gy;
  for (const cc of COL) if (cc.top < 50 && P.x > cc.x0 && P.x < cc.x1 && P.z > cc.z0 && P.z < cc.z1 && P.y >= cc.top - 0.3) floor = Math.max(floor, cc.top);
  P.y = P.y > floor ? Math.max(floor, P.y - dt * 9) : lerp(P.y, floor, Math.min(1, dt * 14));
  if (Math.hypot(vx, vz) > 0.5) { stepT -= dt * Math.hypot(vx, vz); if (stepT < 0) { stepT = 1.7; sfx.step(); } }
}
const ray = new THREE.Raycaster(); ray.far = 3.4;
const center = new THREE.Vector2(0, 0);
function updateTarget() {
  ray.setFromCamera(center, camera);
  const objs = [...NPCS.filter(n => !n.gone).map(n => n.p.root), ...READ];
  const hit = ray.intersectObjects(objs, true)[0];
  target = null;
  if (hit) {
    let o = hit.object; while (o && !o.userData.npc && !o.userData.read) o = o.parent;
    if (o) target = o.userData.npc ? { npc: o.userData.npc } : { read: o.userData.read };
  }
  const verb = isTouch ? 'USE' : 'E';
  let msg = '';
  if (target && target.npc) msg = target.npc.id === 'walker' ? `<b>${verb}</b>Speak to the ${LV.walker[0]}` : `<b>${verb}</b>Talk to ${target.npc.def.name}, ${target.npc.def.role}`;
  else if (target && target.read) msg = `<b>${verb}</b>Read: ${target.read.title}`;
  $('prompt').innerHTML = msg; $('dot').classList.toggle('hot', !!target);
}
function interact() {
  if (mode !== 'play' || !target) return;
  if (target.npc) startTalk(target.npc); else if (target.read) openRead(target.read);
}

document.addEventListener('keydown', e => {
  if (mode === 'talk' || mode === 'end') {
    const m = /^Digit([1-9])$/.exec(e.code); if (m && $('dlg').classList.contains('on')) { const o = opts[+m[1] - 1]; if (o) { e.preventDefault(); sfx.click(); o.fn(); } }
    if ((e.code === 'Enter' || e.code === 'Space') && opts.length === 1 && $('dlg').classList.contains('on')) { e.preventDefault(); opts[0].fn(); }
    return;
  }
  if (mode === 'question') {
    if (!curQ) return;
    if (/^Digit[1-4]$/.test(e.code) && !curQ.answered && curQ.q.opts) { chooseOpt(+e.code[5] - 1); e.preventDefault(); }
    else if (e.code === 'Enter' && curQ.answered) { e.preventDefault(); closeQuestion(); }
    return;
  }
  if (mode === 'read') { if (['Enter', 'Escape', 'KeyE', 'Space'].includes(e.code)) { e.preventDefault(); enterPlay(); } return; }
  if (mode === 'journal') { if (['KeyJ', 'Escape', 'Enter'].includes(e.code)) { e.preventDefault(); closeJournal(); } return; }
  if (mode !== 'play') return;
  keys[e.code] = true;
  if (e.code === 'KeyE' || e.code === 'KeyF') interact();
  if (e.code === 'KeyJ') openJournal();
  if (e.code === 'Escape' && !document.pointerLockElement) pauseGame();
  if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.code] = false; });
window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; if (mode === 'play' && !isTouch) pauseGame(); });
let dragging = false, dragX = 0, dragY = 0;
canvas.addEventListener('mousedown', e => {
  if (mode !== 'play') return;
  if (isTouch) setTouch(false);
  if (document.pointerLockElement === canvas) { if (e.button === 0) interact(); return; }
  dragging = true; dragX = e.clientX; dragY = e.clientY;
  try { const r = canvas.requestPointerLock && canvas.requestPointerLock(); if (r && r.catch) r.catch(() => {}); } catch (err) {}
});
window.addEventListener('mouseup', e => { if (dragging && mode === 'play' && !document.pointerLockElement && Math.hypot(e.clientX - dragX, e.clientY - dragY) < 4) interact(); dragging = false; });
document.addEventListener('mousemove', e => {
  if (mode !== 'play') return;
  if (document.pointerLockElement === canvas) look(e.movementX, e.movementY, 0.0022);
  else if (dragging) { look(e.clientX - dragX, e.clientY - dragY, 0.005); dragX = e.clientX; dragY = e.clientY; }
});
function look(dx, dy, s) { P.yaw -= dx * s; P.pitch = clamp(P.pitch - dy * s, -1.45, 1.45); }
document.addEventListener('pointerlockchange', () => { if (document.pointerLockElement !== canvas && mode === 'play') pauseGame(); });
function joyMove(t) {
  const r = $('joy').getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  let dx = t.clientX - cx, dy = t.clientY - cy; const m = Math.hypot(dx, dy), max = r.width / 2 - 10;
  if (m > max) { dx *= max / m; dy *= max / m; }
  touch.jx = dx / max; touch.jy = dy / max; $('joyKnob').style.transform = `translate(${dx}px,${dy}px)`;
}
$('joy').addEventListener('touchstart', e => { e.preventDefault(); const t = e.changedTouches[0]; touch.jid = t.identifier; touch.on = true; joyMove(t); }, { passive: false });
canvas.addEventListener('touchstart', e => { e.preventDefault(); if (mode !== 'play') return; const t = e.changedTouches[0]; touch.lid = t.identifier; touch.lx = t.clientX; touch.ly = t.clientY; touch.on = true; }, { passive: false });
document.addEventListener('touchmove', e => {
  for (const t of e.changedTouches) {
    if (t.identifier === touch.jid) joyMove(t);
    else if (t.identifier === touch.lid && mode === 'play') { look(t.clientX - touch.lx, t.clientY - touch.ly, 0.006); touch.lx = t.clientX; touch.ly = t.clientY; }
  }
}, { passive: true });
document.addEventListener('touchend', e => {
  for (const t of e.changedTouches) {
    if (t.identifier === touch.jid) { touch.jid = null; touch.jx = touch.jy = 0; $('joyKnob').style.transform = ''; }
    if (t.identifier === touch.lid) touch.lid = null;
  }
});
$('tUse').addEventListener('touchstart', e => { e.preventDefault(); interact(); }, { passive: false });
$('tJournal').addEventListener('click', () => { if (mode === 'play') openJournal(); });
$('tPause').addEventListener('click', () => pauseGame());

document.addEventListener('click', e => {
  const t = e.target;
  const o = t.closest('.opt'); if (o && $('dlg').classList.contains('on')) { const f = opts[+o.dataset.o]; if (f) { sfx.click(); f.fn(); } return; }
  const lvb = t.closest('[data-level]'); if (lvb && mode === 'title') { initAudio(); sfx.click(); begin(+lvb.dataset.level); return; }
  if (t.closest('#introBtn')) { sfx.click(); $('veil').style.opacity = 0; enterPlay(); setTimeout(() => banner(LV.arrive[0], LV.arrive[1]), 400); setTimeout(() => toast(LV.arrive[2], 5000), 1500); return; }
  if (t.closest('#loopBtn')) { sfx.click(); enterPlay(); setTimeout(() => banner(`${LV.dayWord} ${ROMAN(game.loop)}`, LV.again), 300); return; }
  if (t.closest('#resumeBtn')) { sfx.click(); enterPlay(); return; }
  if (t.closest('#journalBtn2')) { sfx.click(); openJournal(); return; }
  if (t.closest('#quitBtn') || t.closest('#titleBtn')) { sfx.click(); mode = 'title'; game = null; $('dlg').classList.remove('on'); show('sTitle'); return; }
  if (t.closest('#againBtn')) { sfx.click(); begin(LV.key); return; }
  if (t.closest('#nextBtn')) { sfx.click(); begin(LV.next); return; }
  if (t.closest('#jClose')) { sfx.click(); closeJournal(); return; }
  if (t.closest('#readClose')) { sfx.click(); enterPlay(); return; }
  if (mode !== 'question' || !curQ) return;
  if (t.closest('#qHelp')) { $('qTable').classList.toggle('show'); sfx.click(); return; }
  if (t.closest('#qDone')) { closeQuestion(); return; }
  const opt = t.closest('[data-opt]'); if (opt) { chooseOpt(+opt.dataset.opt); return; }
  if (curQ.answered) return;
  const tok = t.closest('[data-tok]');
  if (tok && !tok.classList.contains('used')) { curQ.placed.push(+tok.dataset.tok); sfx.click(); renderSlots(); return; }
  const pl = t.closest('[data-placed]'); if (pl) { curQ.placed.splice(+pl.dataset.placed, 1); sfx.click(); renderSlots(); return; }
  if (t.closest('#qCheck')) { checkOrder(); return; }
  if (t.closest('#qClear')) { curQ.placed = []; renderSlots(); }
});
