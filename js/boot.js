// ════════════════════════════════════════════════════════════════
// BOOT
// Loads Three.js, the photo textures, then the game scripts in order.
// The game scripts are ordinary scripts, so they share one global scope,
// in the same order they appeared in the original single file.
// ════════════════════════════════════════════════════════════════
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

Object.assign(window, { THREE, EffectComposer, RenderPass, UnrealBloomPass, SSAOPass, RoomEnvironment, OutputPass, GLTFLoader });

// Photo textures: drawn onto 768 px canvases so the texture code can use them like its painted ones
const PHOTO_KEYS = ['rock', 'pave', 'plCream', 'plOchre', 'plRed', 'marble', 'wood', 'roof', 'bronze'];
window.PHOTO_CANVAS = {};
await Promise.all(PHOTO_KEYS.map(key => new Promise(resolve => {
  const img = new Image();
  img.onload = () => { const c = document.createElement('canvas'); c.width = c.height = 768; c.getContext('2d').drawImage(img, 0, 0, 768, 768); PHOTO_CANVAS[key] = c; resolve(); };
  img.onerror = resolve;
  img.src = `assets/textures/${key}.jpg`;
})));

// The game, in load order. To add a level, add its file here and register it in js/game/levels.js.
const SCRIPTS = [
  'js/data/latin-bank.js',
  'js/engine/renderer.js',
  'js/engine/textures.js',
  'js/levels/sepulta/terrain.js',
  'js/engine/lights-and-fire.js',
  'js/engine/buildings.js',
  'js/engine/people.js',
  'js/levels/sepulta/world.js',
  'js/levels/sepulta/people.js',
  'js/game/state.js',
  'js/game/audio.js',
  'js/game/hud.js',
  'js/game/dialogue.js',
  'js/game/latin-tasks.js',
  'js/game/time-loop.js',
  'js/game/player.js',
  'js/game/setup-screen.js',
  'js/levels/rubicon.js',
  'js/game/levels.js',
  'js/main.js'
];
for (const src of SCRIPTS) {
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = () => reject(new Error('Could not load ' + src));
    document.body.appendChild(s);
  });
}
