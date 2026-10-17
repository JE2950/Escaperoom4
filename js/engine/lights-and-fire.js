"use strict";
// ════════════════════════════════════════════════════════════════
// LIGHTS
// ════════════════════════════════════════════════════════════════
WORLD.add(new THREE.HemisphereLight(0x7d8ea6, 0x3a2414, 0.7));
WORLD.add(new THREE.AmbientLight(0x656d79, 0.32));
// Low strength image-based bounce light gives stone and metal grounded reflections.
if (renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const target = pmrem.fromScene(room, 0.04);
  scene.environment = target.texture;
  room.dispose(); pmrem.dispose();
}
const shaftLight = new THREE.SpotLight(0xd8e4ff, 9, 0, 0.36, 0.7, 0);   // daylight through a crack in the roof
shaftLight.position.set(10, 52, 4); shaftLight.target.position.set(0, 0, -1);
shaftLight.castShadow = true; shaftLight.shadow.mapSize.set(2048, 2048); shaftLight.shadow.bias = -0.0004; shaftLight.shadow.normalBias = 0.05;
shaftLight.shadow.camera.near = 20; shaftLight.shadow.camera.far = 90;
WORLD.add(shaftLight, shaftLight.target);
const fill = new THREE.DirectionalLight(0xffb070, 0.35); fill.position.set(-20, 30, -40); WORLD.add(fill);

// ── The light pool ──
// Every fire, lamp and lava flow registers a light source, but only a few real
// lights exist: 3 on School PC, 5 on Standard, 8 on High. Each frame they move to the
// sources nearest the camera and fade in, so distant fires keep their glow without
// costing anything. The number of lights never changes, so shaders never recompile.
let lightSources = [];
let lightPool = [];
const POOL_SIZE = { school: 3, low: 5, high: 8 };
function buildLightPool() {
  lightPool.forEach(s => scene.remove(s.light));
  lightPool = [];
  for (let i = 0; i < (POOL_SIZE[quality] || 3); i++) {
    const light = new THREE.PointLight(0xff8a3c, 0, 20, 1.4); scene.add(light);
    lightPool.push({ light, src: null, fade: 0 });
  }
}
function addLightSource(x, y, z, color, power, dist, decay) {
  const s = { pos: new THREE.Vector3(x, y, z), color: new THREE.Color(color), power, intensity: power, dist: dist || 30, decay: decay || 1.4 };
  lightSources.push(s); return s;
}
function updateLightPool(dt) {
  const cam = camera.position;
  const ranked = lightSources.filter(s => s.intensity > 0.01).map(s => [s, s.pos.distanceTo(cam) / s.dist]).filter(r => r[1] < 1.6).sort((a, b) => a[1] - b[1]);
  lightPool.forEach((slot, i) => {
    const r = ranked[i], L = slot.light;
    if (!r) { L.intensity = 0; slot.src = null; return; }
    const s = r[0];
    if (slot.src !== s) { slot.src = s; slot.fade = 0; L.position.copy(s.pos); L.color.copy(s.color); L.distance = s.dist; L.decay = s.decay; }
    slot.fade = Math.min(1, slot.fade + dt * 2.5);
    L.intensity = s.intensity * slot.fade * clamp(1.6 - r[1], 0, 1);
  });
}

// ── Fire: additive sprites plus one flickering light ──
let fires = [];
function makeFire(x, y, z, s, power, dist) {
  const grp = new THREE.Group(); grp.position.set(x, y, z); WORLD.add(grp);
  const sprites = [];
  const n = Math.round(10 + 10 * s);
  for (let i = 0; i < n; i++) {
    const m = new THREE.SpriteMaterial({ map: TEX.glow, color: 0xffa040, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false });
    const sp = new THREE.Sprite(m);
    sp.userData = { life: Math.random(), speed: 0.7 + Math.random() * 0.7, ox: (Math.random() - 0.5) * 0.5 * s, oz: (Math.random() - 0.5) * 0.5 * s };
    grp.add(sp); sprites.push(sp);
  }
  let light = null;
  if (power) light = addLightSource(x, y + 0.5 * s, z, 0xff8a3c, power, dist || 30);
  const f = { grp, sprites, s, light, power, on: true, level: 1 };
  fires.push(f); return f;
}
function updateFires(dt, t) {
  for (const f of fires) {
    f.level = clamp(f.level + (f.on ? dt : -dt * 0.6), 0, 1);
    for (const sp of f.sprites) {
      const u = sp.userData; u.life += dt * u.speed; if (u.life > 1) { u.life -= 1; u.ox = (Math.random() - 0.5) * 0.5 * f.s; u.oz = (Math.random() - 0.5) * 0.5 * f.s; }
      const L = u.life, k = f.level;
      sp.position.set(u.ox * (1 - L), L * 1.3 * f.s, u.oz * (1 - L));
      const sc = f.s * (0.75 * (1 - L) + 0.2) * k;
      sp.scale.set(sc, sc * 1.3, 1);
      sp.material.color.setHSL(0.1 - L * 0.07, 1, 0.6 - L * 0.3);
      sp.material.opacity = (1 - L) * 0.85 * k;
    }
    if (f.light) f.light.intensity = f.power * f.level * (0.82 + 0.12 * Math.sin(t * 13 + f.s * 7) + 0.08 * Math.sin(t * 31.7));
  }
}
