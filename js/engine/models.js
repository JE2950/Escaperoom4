"use strict";
// ════════════════════════════════════════════════════════════════
// REAL 3D MODELS
// Scanned props from Poly Haven (polyhaven.com), all CC0.
// Each model is one compressed file, assets/models/<id>.glb (meshopt geometry, WebP textures).
// prop() places a model straight away as an empty group, then fills it
// in when the file arrives, so level code can place models like boxes.
// ════════════════════════════════════════════════════════════════
const modelLoader = new GLTFLoader();
modelLoader.setMeshoptDecoder(MeshoptDecoder);
const modelCache = {};
let modelsPending = [];
function loadModel(id) {
  if (!modelCache[id]) {
    modelCache[id] = new Promise(resolve => {
      modelLoader.load(`assets/models/${id}.glb`, gltf => {
        gltf.scene.traverse(o => {
          if (!o.isMesh) return;
          o.castShadow = true; o.receiveShadow = true;
          [].concat(o.material).forEach(m => { m.envMapIntensity = 0.35; if (m.map) m.map.anisotropy = 8; });
        });
        resolve(gltf.scene);
      }, undefined, () => resolve(null));     // a missing model is skipped, never fatal
    });
  }
  return modelCache[id];
}
// o: { rot, scale, parent, solid (collision radius in metres), top, detail (only on High graphics), tilt }
function prop(id, x, y, z, o = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z); g.rotation.y = o.rot || 0;
  if (o.tilt) g.rotation.z = o.tilt;
  if (Array.isArray(o.scale)) g.scale.set(...o.scale); else g.scale.setScalar(o.scale || 1);
  (o.parent || WORLD).add(g);
  if (o.solid) solid(x - o.solid, z - o.solid, x + o.solid, z + o.solid, o.top);
  if (o.detail && quality !== 'high') return g;
  const p = loadModel(id).then(m => { if (m) g.add(m.clone()); });
  modelsPending.push(p);
  return g;
}
// Wait for every model placed so far (used behind the loading screen)
function modelsReady() { const p = modelsPending; modelsPending = []; return Promise.race([Promise.all(p), new Promise(r => setTimeout(r, 15000))]); }
