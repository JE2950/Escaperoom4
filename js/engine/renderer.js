"use strict";
// ════════════════════════════════════════════════════════════════
// URBS SEPULTA
// A first-person Latin mystery. The question bank and question
// builder above are shared with Fuga Romana.
// ════════════════════════════════════════════════════════════════
const store = {
  get(k, d) { try { const v = localStorage.getItem('fugaRomanaMC.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('fugaRomanaMC.' + k, JSON.stringify(v)); } catch (e) {} },
};
let ticked = new Set(store.get('grammar', 'ABCDEFGHIJKLMNOPQR'.split('')));
let types = new Set(store.get('types', QTYPES.map(q => q.k)));
let helpEnabled = store.get('help', true);
const coarse = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
// Graphics: 'school' (the default, built for school PCs and tablets), 'low' (Standard) or 'high'
let quality = store.get('sepultaGraphics', 'school');
if (!['school', 'low', 'high'].includes(quality)) quality = 'school';
let renderScale = store.get('sepultaScale', 0.8);   // School PC draws fewer pixels and lets the browser scale up

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// ════════════════════════════════════════════════════════════════
// RENDERER
// ════════════════════════════════════════════════════════════════
const canvas = $('gl');
let renderer = null;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: quality !== 'school', powerPreference: 'high-performance' }); } catch (e) { renderer = null; }
if (!renderer) $('noGL').style.display = 'grid';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090604);
scene.fog = new THREE.FogExp2(0x191b20, 0.0105);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.05, 500);
camera.rotation.order = 'YXZ';
const L1G = new THREE.Group(); scene.add(L1G);   // each level builds into its own group
let WORLD = L1G;
let composer = null;
function applyQuality() {
  if (!renderer) return;
  const hi = quality === 'high';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, hi ? 1.75 : 1) * (quality === 'school' ? renderScale : 1));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.shadowMap.enabled = hi;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene.traverse(o => { if (o.material) [].concat(o.material).forEach(m => m.needsUpdate = true); });
  if (composer) { composer.passes.forEach(p => p.dispose && p.dispose()); composer.dispose(); }
  composer = null;
  if (hi) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const ao = new SSAOPass(scene, camera, Math.round(innerWidth * .65), Math.round(innerHeight * .65));
    ao.kernelRadius = 0.65; ao.minDistance = 0.001; ao.maxDistance = 0.12;
    composer.addPass(ao);
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.25, 0.4, 0.95));
    composer.addPass(new OutputPass());
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(innerWidth, innerHeight);
  }
  if (typeof buildLightPool === 'function') buildLightPool();
}
function setQuality(q) {
  quality = q; store.set('sepultaGraphics', q); store.set('sepultaScale', renderScale);
  applyQuality();
}
