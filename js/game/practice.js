"use strict";
// ════════════════════════════════════════════════════════════════
// QUICK PRACTICE: AURUM (catch the coins)
// A Latin task appears at the top. Gold coins fall, each stamped with
// an answer. Move the purse to catch the coin with the right answer.
// Uses the same question builder and title-screen ticks as the main game.
// ════════════════════════════════════════════════════════════════
const Aurum = (() => {
  const KEY = 'urbsSepulta.aurum';
  const SPEEDS = { gentle: 0.72, normal: 1, fast: 1.3 };
  const LANE_MAX = 4;
  const store = { get(k, d) { try { const v = localStorage.getItem(KEY + '.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(KEY + '.' + k, JSON.stringify(v)); } catch (e) {} } };
  const PRAISE = ['Optime!', 'Euge!', 'Bene!', 'Macte!', 'Recte!', 'Laudo te!'];
  let root, cv, cx, W = 0, H = 0, dpr = 1, raf = 0, last = 0, run = null, ac = null, isOpen = false, held = [];
  const el = id => document.getElementById(id);
  const RAF = window.requestAnimationFrame.bind(window);
  // While the coins fall, hold back the 3D city's frames so the computer only draws one thing.
  window.requestAnimationFrame = cb => { if (isOpen && cb !== loop) { held.push(cb); return 0; } return RAF(cb); };

  // ── Questions: the main game's multiple-choice types only ──
  function pool() {
    const items = BANK.filter(it => subset(it.t, ticked));
    const out = [];
    items.forEach(it => {
      const ts = [];
      if (types.has('tr')) ts.push('tr');
      if (types.has('gap') && (it.g || []).some(g => subset(extraTags(g[2]), ticked))) ts.push('gap');
      if (types.has('parse') && (it.p || []).some(p => p[1] !== 'tense' || tensesAllowed().length > 1)) ts.push('parse');
      ts.forEach(t => out.push([it, t]));
    });
    return out;
  }
  function nextQuestion() {
    if (!run.queue.length) run.queue = shuffle(run.pool.slice());
    if (run.back.length && run.back[0].due <= run.asked) { const b = run.back.shift(); return makeQuestion(b.it, b.type); }
    const [it, t] = run.queue.shift();
    return makeQuestion(it, t);
  }

  // ── Sound: a coin chink, a dull thud, a low groan ──
  function tone(f, d, type, v, slide, delay) {
    if (!ac) return; try {
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + (delay || 0);
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v || 0.08, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + 0.05);
    } catch (e) {}
  }
  const sfx = {
    chink: () => { tone(2400, 0.25, 'sine', 0.07); tone(3150, 0.3, 'sine', 0.05, 0, 0.05); tone(1800, 0.35, 'triangle', 0.04, 0, 0.1); },
    lead: () => { tone(160, 0.35, 'triangle', 0.12, 80); },
    lost: () => { tone(220, 0.5, 'sawtooth', 0.04, 90); },
    rise: () => [660, 880, 1100].forEach((f, i) => tone(f, 0.25, 'triangle', 0.05, 0, i * 0.09)),
  };

  // ── Drawing ──
  function bg(t) {
    const g = cx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0b0c18'); g.addColorStop(0.55, '#2a1a14'); g.addColorStop(1, '#4a2a16');
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    // Vesuvius glowing on the horizon
    const hy = H * 0.72;
    cx.fillStyle = '#160e0c';
    cx.beginPath(); cx.moveTo(W * 0.35, hy); cx.lineTo(W * 0.58, H * 0.42); cx.lineTo(W * 0.66, H * 0.43); cx.lineTo(W * 0.92, hy); cx.closePath(); cx.fill();
    const glow = cx.createRadialGradient(W * 0.62, H * 0.42, 2, W * 0.62, H * 0.42, H * 0.25);
    glow.addColorStop(0, `rgba(226,118,58,${0.45 + 0.1 * Math.sin(t * 1.3)})`); glow.addColorStop(1, 'rgba(226,118,58,0)');
    cx.fillStyle = glow; cx.fillRect(0, 0, W, H);
    // a colonnade in silhouette
    cx.fillStyle = '#0d0907';
    const n = Math.max(5, Math.round(W / 150)), gap = W / n;
    cx.fillRect(0, hy - 18, W, 22);
    for (let i = 0; i < n; i++) { const x = gap * (i + 0.5); cx.fillRect(x - 13, hy - 18 - H * 0.36, 26, H * 0.36); cx.fillRect(x - 20, hy - 18 - H * 0.36 - 10, 40, 12); }
    cx.fillRect(0, hy - 18 - H * 0.36 - 34, W, 26);
    // torches
    for (let i = 0; i < n; i += 2) {
      const x = gap * (i + 0.5) + 26, y = hy - H * 0.22, f = 0.75 + 0.25 * Math.sin(t * 9 + i * 1.7);
      const tg = cx.createRadialGradient(x, y, 1, x, y, 70); tg.addColorStop(0, `rgba(255,190,90,${0.55 * f})`); tg.addColorStop(1, 'rgba(255,150,60,0)');
      cx.fillStyle = tg; cx.fillRect(x - 70, y - 70, 140, 140);
      cx.fillStyle = '#ffcf7a'; cx.beginPath(); cx.ellipse(x, y - 4, 4, 9 * f, 0, 0, Math.PI * 2); cx.fill();
    }
    // paving
    const pg = cx.createLinearGradient(0, hy, 0, H); pg.addColorStop(0, '#3a2a1e'); pg.addColorStop(1, '#1e140e');
    cx.fillStyle = pg; cx.fillRect(0, hy, W, H - hy);
    cx.strokeStyle = 'rgba(0,0,0,.35)'; cx.lineWidth = 1;
    for (let y = hy + 14, k = 0; y < H; y += 12 + k * 4, k++) { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }
    // ash drifting down
    cx.fillStyle = 'rgba(200,190,180,.35)';
    for (let i = 0; i < 50; i++) { const x = (i * 131.7 + t * 9 * (1 + i % 3)) % W, y = (i * 77.3 + t * 22 * (1 + i % 4)) % H; cx.fillRect(x, y, 2, 2); }
  }
  function coin(x, y, r, spin, lead, glint) {
    const sx = Math.max(0.12, Math.abs(Math.cos(spin)));
    cx.save(); cx.translate(x, y); cx.scale(sx, 1);
    const g = cx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
    if (lead) { g.addColorStop(0, '#b7b7b4'); g.addColorStop(1, '#5d5d5a'); } else { g.addColorStop(0, '#fff2b0'); g.addColorStop(0.45, '#e8bd4e'); g.addColorStop(1, '#9a6a1a'); }
    cx.fillStyle = g; cx.beginPath(); cx.arc(0, 0, r, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = lead ? '#444' : '#7a5212'; cx.lineWidth = r * 0.12; cx.stroke();
    cx.strokeStyle = lead ? 'rgba(40,40,40,.5)' : 'rgba(122,82,18,.55)'; cx.lineWidth = r * 0.06;
    cx.beginPath(); cx.arc(0, 0, r * 0.72, 0, Math.PI * 2); cx.stroke();
    // an emperor's head in profile, very simply
    cx.fillStyle = lead ? 'rgba(50,50,50,.45)' : 'rgba(122,82,18,.5)';
    cx.beginPath(); cx.ellipse(r * 0.04, -r * 0.08, r * 0.3, r * 0.36, 0, 0, Math.PI * 2); cx.fill();
    cx.fillRect(-r * 0.18, r * 0.18, r * 0.36, r * 0.3);
    if (glint && !lead) { cx.fillStyle = 'rgba(255,255,255,.75)'; cx.beginPath(); cx.arc(-r * 0.4, -r * 0.4, r * 0.12, 0, Math.PI * 2); cx.fill(); }
    cx.restore();
  }
  function wrap(text, maxW) {
    const words = String(text).split(' '), lines = []; let line = '';
    for (const w of words) { const t = line ? line + ' ' + w : w; if (cx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
    if (line) lines.push(line); return lines;
  }
  function tag(c) {
    const fs = Math.max(15, Math.min(20, W / 52));
    cx.font = `${c.lat ? 'italic ' : ''}600 ${fs}px 'EB Garamond', Georgia, serif`;
    const lines = wrap(c.text, run.laneW - 26).slice(0, 4);
    let w = 0; lines.forEach(l => w = Math.max(w, cx.measureText(l).width));
    const tw = w + 22, th = lines.length * fs * 1.2 + 12, x = c.x - tw / 2, y = c.y + c.r + 8;
    cx.globalAlpha = c.fade;
    cx.strokeStyle = 'rgba(217,181,106,.6)'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(c.x, c.y + c.r); cx.lineTo(c.x, y); cx.stroke();
    cx.fillStyle = c.state === 'lead' ? 'rgba(70,60,55,.95)' : c.state === 'ok' ? 'rgba(60,90,50,.95)' : 'rgba(236,224,200,.96)';
    cx.fillRect(x, y, tw, th);
    cx.strokeStyle = c.state === 'ok' ? '#9fd08a' : '#7a5a2a'; cx.lineWidth = 2; cx.strokeRect(x + .5, y + .5, tw - 1, th - 1);
    cx.fillStyle = c.state === 'lead' || c.state === 'ok' ? '#f5ecd8' : '#2a1a0c'; cx.textAlign = 'center'; cx.textBaseline = 'top';
    lines.forEach((l, i) => cx.fillText(l, c.x, y + 7 + i * fs * 1.2));
    cx.globalAlpha = 1;
    c.bottom = y + th;
  }
  function purse(x, y, s, bulge, t) {
    cx.save(); cx.translate(x, y);
    // shadow
    cx.fillStyle = 'rgba(0,0,0,.35)'; cx.beginPath(); cx.ellipse(0, s * 0.95, s * 0.9, s * 0.16, 0, 0, Math.PI * 2); cx.fill();
    const w = s * (0.85 + bulge * 0.12);
    const g = cx.createLinearGradient(-w, 0, w, 0); g.addColorStop(0, '#4a2c16'); g.addColorStop(0.45, '#8a5a30'); g.addColorStop(1, '#3a2010');
    cx.fillStyle = g;
    cx.beginPath(); cx.moveTo(-s * 0.55, -s * 0.1);
    cx.bezierCurveTo(-w * 1.15, s * 0.2, -w, s * 0.95, 0, s * 0.92);
    cx.bezierCurveTo(w, s * 0.95, w * 1.15, s * 0.2, s * 0.55, -s * 0.1); cx.closePath(); cx.fill();
    // the neck and drawstring
    cx.fillStyle = '#6a4222'; cx.beginPath(); cx.ellipse(0, -s * 0.12, s * 0.62, s * 0.16, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#1a0e06'; cx.beginPath(); cx.ellipse(0, -s * 0.14, s * 0.5, s * 0.1, 0, 0, Math.PI * 2); cx.fill();
    if (run && run.gold > 0) { for (let i = 0; i < Math.min(run.gold, 6); i++) coin(-s * 0.3 + i * s * 0.12, -s * 0.18 - (i % 2) * 4, s * 0.1, 0, false, false); }
    cx.strokeStyle = '#c9a060'; cx.lineWidth = 3; cx.beginPath(); cx.moveTo(-s * 0.45, s * 0.02); cx.quadraticCurveTo(0, s * 0.12, s * 0.45, s * 0.02); cx.stroke();
    cx.beginPath(); cx.moveTo(s * 0.2, s * 0.08); cx.quadraticCurveTo(s * 0.3, s * 0.35 + Math.sin(t * 4) * 3, s * 0.18, s * 0.5); cx.stroke();
    cx.restore();
  }

  // ── The game ──
  function newRun() {
    const p = pool();
    run = { pool: p, queue: shuffle(p.slice()), back: [], coins: [], sparks: [], q: null, lives: 3, score: 0, streak: 0, best: 0, caught: 0, asked: 0, t: 0,
      px: W / 2, tx: W / 2, keys: { l: false, r: false }, laneW: 0, wait: 0.6, over: false, paused: false, missed: [], gold: 0, bulge: 0, round: 0,
      speed: SPEEDS[store.get('speed', 'normal')] || 1 };
  }
  function laneX(i, n) { return (W / n) * (i + 0.5); }
  function ask() {
    const q = nextQuestion(); run.q = q; run.asked++; run.round++;
    const opts = q.opts.slice(0, LANE_MAX), n = opts.length;
    if (!opts.some(o => o.ok)) opts[n - 1] = q.opts.find(o => o.ok);
    run.laneW = W / n;
    const fall = (8.5 - Math.min(3.5, run.round * 0.12)) / run.speed;
    const r = Math.max(20, Math.min(34, W / 34));
    showQuestion(q);
    const top = el('auQ').getBoundingClientRect().bottom || H * 0.2;
    run.coins = shuffle(opts).map((o, i) => ({ text: o.text, ok: o.ok, lat: !!o.latin, x: laneX(i, n), y: top - r * 1.2 - Math.random() * 30, y0: 0, r, spin: Math.random() * 6, vs: 2 + Math.random() * 2,
      state: 'fall', fade: 1, delay: i * 0.18 + Math.random() * 0.25 }));
    const floor = purseY() - purseSize() * 0.2;
    run.coins.forEach(c => { c.y0 = c.y; c.v = (floor - c.y0) / fall; });
    run.resolved = false;
  }
  function showQuestion(q) {
    let h = `<div class="au-task">${esc(q.prompt)}</div>`;
    if (q.type === 'gap' || q.type === 'parse' || q.type === 'tr') h += `<div class="au-lat">${latinHtml(q)}</div>`;
    if (q.type === 'gap') h += `<div class="au-en">${esc(q.it.en)}</div>`;
    el('auQ').innerHTML = h; el('auQ').classList.remove('ok', 'bad');
  }
  const purseSize = () => Math.max(46, Math.min(70, W / 16));
  const purseY = () => H - purseSize() - Math.max(64, H * 0.08);
  function resolve(c, how) {
    if (run.resolved) return; run.resolved = true;
    const q = run.q, right = q.opts.find(o => o.ok).text, rightS = /[.!?]$/.test(right) ? right : right + '.';
    if (how === 'caught-ok') {
      run.streak++; run.best = Math.max(run.best, run.streak); run.caught++; run.gold++; run.bulge = 1;
      const pts = 10 + Math.min(run.streak - 1, 9) * 2; run.score += pts;
      c.state = 'ok'; sfx.chink(); sparks(c.x, purseY(), 22);
      say(`<b>${PRAISE[Math.floor(Math.random() * PRAISE.length)]}</b> +${pts}${run.streak > 2 ? ` · streak ×${run.streak}` : ''}`, 'ok');
      el('auQ').classList.add('ok');
      if (run.caught % 8 === 0) { sfx.rise(); say(`<b>The coins fall faster now.</b> Keep going!`, 'ok'); }
    } else {
      run.lives--; run.streak = 0;
      run.missed.push({ q, right });
      run.back.push({ it: q.it, type: q.type, due: run.asked + 3 });
      if (how === 'caught-bad') { c.state = 'lead'; sfx.lead(); say(`<b>A lead coin!</b> The answer was <span class="au-a">${esc(rightS)}</span>`, 'bad'); }
      else { sfx.lost(); say(`<b>The gold coin got away.</b> The answer was <span class="au-a">${esc(rightS)}</span>`, 'bad'); }
      run.coins.forEach(k => { if (k.ok) k.state = 'ok'; });
      el('auQ').classList.add('bad');
    }
    hud();
    run.wait = how === 'caught-ok' ? 1.0 : 2.6;
    if (run.lives <= 0) setTimeout(gameOver, 1600);
  }
  function sparks(x, y, n) { for (let i = 0; i < n; i++) run.sparks.push({ x, y, vx: (Math.random() - .5) * 360, vy: -Math.random() * 380 - 80, life: 0.6 + Math.random() * 0.5 }); }
  function say(html, cls) { const s = el('auSay'); s.innerHTML = html; s.className = 'show ' + (cls || ''); clearTimeout(say.t); say.t = setTimeout(() => s.className = '', cls === 'bad' ? 3200 : 1600); }
  function hud() {
    el('auScore').innerHTML = `<span>Denarii <b>${run.score}</b></span>${run.streak > 1 ? `<span>Streak <b>×${run.streak}</b></span>` : ''}`;
    el('auLives').innerHTML = [0, 1, 2].map(i => `<i class="${i < run.lives ? 'on' : ''}"></i>`).join('');
  }
  function step(dt) {
    run.t += dt; run.bulge = Math.max(0, run.bulge - dt * 2);
    // move the purse: keys glide, a pointer sets a target
    const sp = W * 1.1;
    if (run.keys.l) run.tx = run.px - sp * 0.2; if (run.keys.r) run.tx = run.px + sp * 0.2;
    const ps = purseSize();
    run.tx = Math.max(ps, Math.min(W - ps, run.tx));
    const d = run.tx - run.px, mv = Math.sign(d) * Math.min(Math.abs(d), sp * dt);
    run.px += mv;
    if (!run.q || (run.resolved && (run.wait -= dt) <= 0)) { if (!run.over && run.lives > 0) ask(); return; }
    const py = purseY(), mouth = py - ps * 0.15;
    for (const c of run.coins) {
      c.spin += c.vs * dt;
      if (c.state === 'lead' || c.state === 'ok' && run.resolved) { c.fade = Math.max(0, c.fade - dt * 0.6); if (c.state === 'ok' && c.caught) c.y += (py - c.y) * Math.min(1, dt * 8); else if (!c.caught) c.y += c.v * dt * 0.4; continue; }
      if (c.delay > 0) { c.delay -= dt; continue; }
      c.y += c.v * dt;
      if (run.resolved) { c.fade = Math.max(0, c.fade - dt * 1.5); continue; }
      if (c.y + c.r >= mouth && c.y - c.r <= mouth + 10 && Math.abs(c.x - run.px) < ps * 0.75) { c.caught = true; resolve(c, c.ok ? 'caught-ok' : 'caught-bad'); continue; }
      if (c.ok && c.y - c.r > py + ps * 0.6) resolve(c, 'missed');
    }
    for (const s of run.sparks) { s.life -= dt; s.vy += 900 * dt; s.x += s.vx * dt; s.y += s.vy * dt; }
    run.sparks = run.sparks.filter(s => s.life > 0);
  }
  function draw() {
    bg(run ? run.t : performance.now() / 1000);
    if (!run) return;
    // lane guides
    if (run.q && !run.resolved) {
      const n = run.coins.length; cx.strokeStyle = 'rgba(217,181,106,.08)'; cx.lineWidth = 1;
      for (let i = 1; i < n; i++) { const x = (W / n) * i; cx.beginPath(); cx.moveTo(x, H * 0.22); cx.lineTo(x, purseY()); cx.stroke(); }
    }
    for (const c of run.coins) {
      if (c.delay > 0 || c.fade <= 0) continue;
      cx.globalAlpha = c.fade; coin(c.x, c.y, c.r, c.spin, c.state === 'lead', true); cx.globalAlpha = 1;
      if (!c.caught) tag(c);
    }
    for (const s of run.sparks) { cx.fillStyle = `rgba(255,${200 + Math.random() * 55 | 0},90,${Math.min(1, s.life * 2)})`; cx.fillRect(s.x, s.y, 3, 3); }
    purse(run.px, purseY(), purseSize(), run.bulge, run.t);
  }
  function loop(now) {
    raf = RAF(loop);
    const dt = Math.min(0.1, (now - last) / 1000 || 0); last = now;
    if (run && !run.paused && !run.over) step(dt);
    draw();
  }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (run && run.coins.length) { const n = run.coins.length; run.laneW = W / n; run.coins.forEach((c, i) => c.x = laneX(i, n)); }
  }

  // ── Screens ──
  function card(id, html) { ['auIntro', 'auPause', 'auOver'].forEach(s => { el(s).classList.toggle('on', s === id); if (s !== id) el(s).innerHTML = ''; }); if (id) el(id).innerHTML = `<div class="au-card">${html}</div>`; el('auTop').style.visibility = id === 'auIntro' ? 'hidden' : 'visible'; }
  function intro() {
    const sp = store.get('speed', 'normal'), best = store.get('best', 0), n = pool().length;
    if (!n) { card('auIntro', `<h2>AURUM</h2><p>Nothing to practise with the current ticks. Tick some grammar and at least one of “translate”, “choose the right form” or “parse” on the title screen.</p><div class="au-btns"><button class="btn" data-au="back">Back to the title screen</button></div>`); return; }
    card('auIntro', `<h2>AURUM</h2><div class="au-sub">Quick practice · catch the gold</div>
      <p>Vesuvius is shaking the treasury, and coins are raining into the forum. Each one is stamped with an answer to the Latin task at the top. Only one coin in each fall is true gold. The rest are lead.</p>
      <ul><li>Move the purse with <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd>, the mouse, or your finger. <kbd>1</kbd>–<kbd>4</kbd> jump straight to a lane.</li>
      <li>Catch the gold coin. A lead coin, or letting the gold one fall past you, costs one of your three lamps.</li>
      <li>A task you miss comes back a little later, so you can put it right.</li></ul>
      <div class="au-stat">${n} possible tasks from your ticks on the title screen${best ? ` · best here: <b>${best}</b> denarii` : ''}</div>
      <div class="au-btns au-speed">${Object.keys(SPEEDS).map(k => `<button class="btn small${k === sp ? ' on' : ''}" data-speed="${k}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div>
      <div class="au-btns"><button class="btn big" data-au="go">Begin</button><button class="btn" data-au="back">Back to the title screen</button></div>`);
  }
  function start() {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) { ac = null; }
    newRun(); card(null); hud(); el('auQ').style.display = 'block';
  }
  function pause() { if (!run || run.over || run.paused) return; run.paused = true; card('auPause', `<h2>PAUSED</h2><div class="au-btns"><button class="btn big" data-au="resume">Resume</button><button class="btn" data-au="back">Back to the title screen</button></div>`); }
  function resume() { if (!run) return; run.paused = false; card(null); last = performance.now(); }
  function gameOver() {
    if (!run || run.over) return; run.over = true;
    const best = store.get('best', 0), isBest = run.score > best; if (isBest) store.set('best', run.score);
    const seen = new Set(), rows = run.missed.filter(m => { const k = m.q.it.lat + '|' + m.q.type; if (seen.has(k)) return false; seen.add(k); return true; })
      .map(m => `<li><span class="au-l">${m.q.type === 'tr' ? esc(m.q.it.lat) : latinHtml(m.q).replace('<span class="gap" id="gapSlot">&nbsp;</span>', '___')}</span><br><span class="au-p">${esc(m.q.prompt)}</span> <span class="au-a">${esc(m.right)}</span></li>`).join('');
    el('auQ').style.display = 'none';
    card('auOver', `<h2>FINIS</h2><div class="au-big">${run.score} <small>denarii</small></div>
      <div class="au-stat">${isBest ? '<b>A new best!</b> · ' : best ? `Best: ${best} · ` : ''}${run.caught} of ${run.asked} caught · longest streak ${run.best}</div>
      ${rows ? `<div class="au-rev"><h4>Practise these</h4><ul>${rows}</ul></div>` : ''}
      <div class="au-btns"><button class="btn big" data-au="go">Play again</button><button class="btn" data-au="back">Back to the title screen</button></div>`);
  }
  function close() {
    isOpen = false; cancelAnimationFrame(raf); raf = 0; run = null; root.classList.remove('on');
    const h = held; held = []; h.forEach(cb => RAF(cb));
  }
  function setLane(i) { if (!run || !run.coins.length) return; const n = run.coins.length; if (i < n) run.tx = laneX(i, n); }

  function build() {
    root = document.createElement('div'); root.id = 'aurum';
    root.innerHTML = `<canvas id="auCv"></canvas>
      <div id="auTop"><div id="auScore"></div><div style="display:flex;gap:10px;align-items:center"><div id="auLives"></div><button class="btn small" data-au="pause">❚❚</button></div></div>
      <div id="auQ"></div><div id="auSay"></div>
      <div class="au-screen" id="auIntro"></div><div class="au-screen" id="auPause"></div><div class="au-screen" id="auOver"></div>`;
    document.body.appendChild(root);
    cv = el('auCv'); cx = cv.getContext('2d');
    window.addEventListener('resize', () => { if (isOpen) resize(); });
    const keyOf = e => (e.code === 'ArrowLeft' || e.code === 'KeyA') ? 'l' : (e.code === 'ArrowRight' || e.code === 'KeyD') ? 'r' : null;
    // Capture keys while open, so the 3D game never sees them
    window.addEventListener('keydown', e => {
      if (!isOpen) return; e.stopImmediatePropagation();
      if (e.key === 'Escape') { if (run && run.paused) resume(); else pause(); e.preventDefault(); return; }
      const k = keyOf(e); if (k && run) { run.keys[k] = true; e.preventDefault(); }
      if (/^Digit[1-4]$/.test(e.code)) setLane(+e.code.slice(5) - 1);
    }, true);
    window.addEventListener('keyup', e => { if (!isOpen) return; e.stopImmediatePropagation(); const k = keyOf(e); if (k && run) { run.keys[k] = false; run.tx = run.px; } }, true);
    const point = e => { if (!run || run.paused || run.over) return; const p = e.touches ? e.touches[0] : e; run.tx = p.clientX; };
    cv.addEventListener('mousemove', point); cv.addEventListener('mousedown', point);
    cv.addEventListener('touchstart', e => { point(e); e.preventDefault(); }, { passive: false });
    cv.addEventListener('touchmove', e => { point(e); e.preventDefault(); }, { passive: false });
    root.addEventListener('click', e => {
      e.stopPropagation();
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.speed) { store.set('speed', b.dataset.speed); root.querySelectorAll('[data-speed]').forEach(x => x.classList.toggle('on', x === b)); return; }
      const a = b.dataset.au;
      if (a === 'go') start(); else if (a === 'back') close(); else if (a === 'pause') pause(); else if (a === 'resume') resume();
    });
    window.addEventListener('blur', () => { if (isOpen) pause(); });
  }
  function open() {
    if (!root) build();
    if (document.pointerLockElement) document.exitPointerLock();
    root.classList.add('on'); isOpen = true; run = null; resize();
    el('auQ').style.display = 'none'; intro();
    last = performance.now(); if (!raf) raf = RAF(loop);
  }
  return { open, close, get run() { return run; }, _gameOver: () => gameOver(), _setLane: setLane };
})();
document.getElementById('aurumBtn').addEventListener('click', e => { e.stopPropagation(); Aurum.open(); });
