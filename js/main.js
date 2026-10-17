"use strict";
// ════════════════════════════════════════════════════════════════
// MAIN LOOP
// ════════════════════════════════════════════════════════════════
let portraitId = '';
let last = performance.now(), titleT = 0;
window.addEventListener('resize', () => {
  if (!renderer) return;
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false); if (composer) composer.setSize(innerWidth, innerHeight);
});
function updateNpcs(dt, t) {
  for (const n of NPCS) {
    const p = n.p;
    // the magistrate's walk, and the townsfolk strolling round the forum
    const path = n.path || (n.loop ? [n.loop[(n.seg + 1) % n.loop.length]] : null);
    let moving = false;
    if (path && path.length && mode !== 'talk') {
      const [tx, tz] = path[0], dx = tx - n.x, dz = tz - n.z, d = Math.hypot(dx, dz), step = (n.speed || 1.25) * dt;
      if (d < step) { n.x = tx; n.z = tz; if (n.path) { n.path.shift(); if (!n.path.length) { n.path = null; n.done = true; LV.onArrive(n); } } else n.seg = (n.seg + 1) % n.loop.length; }
      else { n.x += dx / d * step; n.z += dz / d * step; n.yaw = Math.atan2(dx, dz); moving = true; }
      let gy = groundY(n.x, n.z);
      if (n.x > TRIB.x0 && n.x < TRIB.x1 && n.z > TRIB.z0 && n.z < TRIB.z1) gy = TRIB.top;
      n.y = lerp(n.y, gy, Math.min(1, dt * 6));
    }
    n.walk = lerp(n.walk || 0, moving ? 1 : 0, Math.min(1, dt * 6));
    if (moving) n.phase += dt * 6.2;
    // turn to face the player when talking, glance at them when near
    const dxp = P.x - n.x, dzp = P.z - n.z, dist = Math.hypot(dxp, dzp);
    const toP = Math.atan2(dxp, dzp);
    if (n.talking) { let d = toP - n.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); n.yaw += d * Math.min(1, dt * 4); }
    let rel = toP - n.yaw; rel = Math.atan2(Math.sin(rel), Math.cos(rel));
    const lookAt = mode !== 'title' && dist < 6 && Math.abs(rel) < 1.6 && n.id !== 'walker' ? rel : 0;
    p.root.position.set(n.x, n.y, n.z); p.root.rotation.y = n.yaw;
    animatePerson(p, t, { walk: n.walk, phase: n.phase, talk: n.talking, look: lookAt, pose: !n.talking && n.def.pose });
  }
}
// If the game runs below about 27 frames a second for a few seconds, step the graphics down
const perf = { t: 0, n: 0, warm: 0 };
function watchFrameRate(dt) {
  if (mode !== 'play') { perf.t = perf.n = perf.warm = 0; return; }
  perf.warm += dt; if (perf.warm < 4) return;        // ignore the first seconds after loading
  perf.t += dt; perf.n++;
  if (perf.t < 4) return;
  const fps = perf.n / perf.t; perf.t = perf.n = 0;
  if (fps >= 27) return;
  if (quality === 'high') setQuality('low');
  else if (quality === 'low') setQuality('school');
  else if (renderScale > 0.61) { renderScale = Math.max(0.6, renderScale - 0.1); setQuality('school'); }
  else return;
  perf.warm = 0;
  toast('<span class="g">GRAPHICS LOWERED</span><br>to keep the game smooth on this computer.', 3000);
}
function frame(now) {
  requestAnimationFrame(frame);
  if (!renderer) return;
  const dt = Math.min(0.05, (now - last) / 1000); last = now; const t = now / 1000;
  if (mode === 'play') {
    updatePlayer(dt); updateTarget(); tickDay(dt); updateClock();
    const z = zoneAt(P.x, P.z); if (z[0] !== lastZone) { lastZone = z[0]; if (game.clock > 2) banner(z[0], z[1]); }
  }
  if (talkN && talkN.id !== portraitId) { portraitId = talkN.id; document.getElementById('portrait').src = PORTRAITS[portraitId] || ''; }
  updateNpcs(dt, t);
  updateFires(dt, t);
  updateLightPool(dt);
  watchFrameRate(dt);
  TEX.water.offset.x = t * 0.02;
  if (LV.key === 2 && mode === 'play') pipeTune(dt);
  if (LV.key === 1 && anim.lava) { TEX.lava.offset.x = t * 0.006; TEX.lava.offset.y = Math.sin(t * 0.2) * 0.02; anim.lavaLight.intensity = 70 * (0.85 + 0.15 * Math.sin(t * 1.3)); }
  if (anim.dust) { anim.dust.rotation.y = t * 0.01; }
  // camera
  if (mode === 'title' || !game) {
    titleT += dt * 0.035;
    const tc = LV.title;
    camera.position.set(tc.cx + Math.sin(titleT) * tc.r, tc.h + Math.sin(titleT * 0.7) * 3, tc.cz + Math.cos(titleT) * tc.rz);
    camera.lookAt(...tc.look);
  } else {
    shake = Math.max(0, shake - dt * 0.05);
    let ex = P.x, ey = P.y + EYE, ez = P.z, yaw = P.yaw, pitch = P.pitch;
    if (mode === 'talk' && talkN) {      // turn to face the person you are talking to
      const hx = talkN.x - P.x, hz = talkN.z - P.z, hy = talkN.y + 1.6 * (talkN.p.root.scale.y) - ey;
      const want = Math.atan2(-hx, -hz), wantP = Math.atan2(hy, Math.hypot(hx, hz));
      let d = want - P.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      P.yaw += d * Math.min(1, dt * 4); P.pitch = lerp(P.pitch, wantP, Math.min(1, dt * 4)); yaw = P.yaw; pitch = P.pitch;
    }
    camera.position.set(ex + (Math.random() - 0.5) * shake, ey + (Math.random() - 0.5) * shake, ez);
    camera.rotation.set(pitch, yaw, 0);
  }
  if (composer) composer.render(); else renderer.render(scene, camera);
}

// A handle for testing from the browser console
window.SEPULTA = { P, npc, useLevel, openQuestion, chooseOpt, checkOrder, closeQuestion, askClue, accuseStart, get curQ() { return curQ; }, get LV() { return LV; }, get NPCS() { return NPCS; }, startTalk, offerTask, openJournal, loopEnd, ending, accuse, tickDay, get game() { return game; }, get opts() { return opts; }, get mode() { return mode; }, set mode(v) { mode = v; } };

// ── Boot ──
buildSetup();
if (renderer) {
  applyQuality();
  const go = () => {
    LEVELS[1].build = () => {
    buildWorld();
    PEOPLE1.forEach(addNpc);
    addWalker([[-10, 6], [10, 6], [10, -9], [-10, -9]], { tunic: 0x7a6a50, skin: 0xd8a888, hair: 0x2a1a10, belt: true });
    addWalker([[10, 8], [-6, 9], [-10, -6], [6, -9]], { tunic: 0x556070, skin: 0xb88a68, hair: 0x4a3020, female: true });
    addWalker([[-24, 28], [-14, 14], [-4, 4], [-14, 14]], { tunic: 0x8a4a3a, skin: 0xe0b896, hair: 0x6a6a66, beard: '#6a6a66', old: true });
    };
    useLevel(1);
    applyQuality();
    requestAnimationFrame(frame);
  };
  if (document.fonts && document.fonts.load) Promise.race([document.fonts.load('700 40px Cinzel'), new Promise(r => setTimeout(r, 1500))]).then(go, go); else go();
}
