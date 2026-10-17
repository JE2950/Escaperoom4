"use strict";
// ════════════════════════════════════════════════════════════════
// PROCEDURAL TEXTURES
// ════════════════════════════════════════════════════════════════
function makeNoise(seed) {
  const N = 256, h = new Float32Array(N * N); let s = seed;
  for (let i = 0; i < N * N; i++) { s = (s * 16807) % 2147483647; h[i] = (s - 1) / 2147483646; }
  const g = (i, j, p) => h[(((j % p) + p) % p) * N + (((i % p) + p) % p)];
  return (x, y, p) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    return lerp(lerp(g(xi, yi, p), g(xi + 1, yi, p), u), lerp(g(xi, yi + 1, p), g(xi + 1, yi + 1, p), u), v);
  };
}
const N1 = makeNoise(11), N2 = makeNoise(29);
function fbm(n, x, y, p, oct) { let a = 0, amp = 0.5, f = 1, sum = 0; for (let o = 0; o < (oct || 5); o++) { a += amp * n(x * f, y * f, p * f); sum += amp; amp *= 0.5; f *= 2; } return a / sum; }
const mix3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const mul3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
function paintTex(size, fn) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const x = c.getContext('2d'), img = x.createImageData(size, size), d = img.data;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const col = fn(i / size, j / size, i, j), k = (j * size + i) * 4;
    d[k] = col[0]; d[k + 1] = col[1]; d[k + 2] = col[2]; d[k + 3] = col[3] === undefined ? 255 : col[3];
  }
  x.putImageData(img, 0, 0); return c;
}
function texFrom(c, srgb) {
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb !== false) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8; return t;
}
const C = {};
C.rock = PHOTO_CANVAS.rock || paintTex(512, (u, v) => {
  const n = fbm(N1, u * 8, v * 8, 8, 6), r = 1 - Math.abs(fbm(N2, u * 4, v * 4, 4, 4) - 0.5) * 2;
  return mul3(mix3([52, 45, 40], [122, 108, 94], n), 1 - 0.55 * Math.pow(r, 10));
});
C.ground = paintTex(512, (u, v) => {
  const n = fbm(N1, u * 16, v * 16, 16, 5), m = fbm(N2, u * 4, v * 4, 4, 4);
  let c = mix3([46, 40, 35], [96, 84, 70], n); c = mix3(c, [74, 72, 70], smooth(0.45, 0.7, m) * 0.6);
  return N2(u * 64, v * 64, 64) > 0.86 ? mul3(c, 1.35) : c;
});
C.pave = PHOTO_CANVAS.pave || (() => {
  const rows = 6, cuts = []; let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < rows; i++) { const a = [0]; let x = 0; while (x < 0.85) { x += 0.17 + r() * 0.2; a.push(Math.min(1, x)); } a[a.length - 1] = 1; cuts.push(a); }
  const tone = []; for (let i = 0; i < 64; i++) tone.push(0.78 + r() * 0.38);
  return paintTex(512, (u, v) => {
    const row = Math.min(rows - 1, Math.floor(v * rows)), fv = v * rows - row, cs = cuts[row];
    let k = 1; while (k < cs.length - 1 && cs[k] < u) k++;
    const ed = Math.min(Math.min(fv, 1 - fv) * 512 / rows, Math.min(u - cs[k - 1], cs[k] - u) * 512);
    const n = fbm(N1, u * 16, v * 16, 16, 4);
    let c = mul3(mix3([88, 82, 74], [152, 142, 126], n), tone[(row * 7 + k * 3) % 64]);
    if (ed < 3) c = mul3(c, 0.32); else if (ed < 7) c = mul3(c, 0.72 + (ed - 3) * 0.06);
    return c;
  });
})();
const plaster = base => paintTex(256, (u, v) => {
  const n = fbm(N1, u * 8, v * 8, 8, 5), m = fbm(N2, u * 4, v * 4, 4, 3);
  let c = mul3(base, 0.84 + 0.22 * n); if (m > 0.6) c = mul3(c, 1 - (m - 0.6) * 0.8);
  return c;
});
C.plCream = PHOTO_CANVAS.plCream || plaster([214, 198, 168]); C.plOchre = PHOTO_CANVAS.plOchre || plaster([198, 150, 88]); C.plRed = PHOTO_CANVAS.plRed || plaster([150, 52, 38]); C.plGrey = plaster([170, 162, 150]);
C.dado = plaster([96, 34, 26]);
C.roof = PHOTO_CANVAS.roof || paintTex(256, (u, v) => {
  const ru = (u * 8) % 1, rv = (v * 8) % 1, n = fbm(N2, u * 8, v * 8, 8, 3);
  return mul3(mix3([112, 48, 32], [182, 90, 56], n), (0.5 + 0.55 * Math.sin(ru * Math.PI)) * (rv < 0.12 ? 0.55 : 1));
});
C.marble = PHOTO_CANVAS.marble || paintTex(256, (u, v) => {
  const n = fbm(N1, u * 4, v * 4, 4, 6), vein = Math.abs(Math.sin((u * 3 + v * 2 + n * 3) * Math.PI * 2));
  const c = mul3([232, 226, 214], 0.9 + 0.1 * n); return vein < 0.05 ? mul3(c, 0.8) : c;
});
C.wood = PHOTO_CANVAS.wood || paintTex(256, (u, v) => {
  const pl = Math.floor(u * 4), n = fbm(N2, u * 4, v * 16, 4, 4);
  const c = mix3([62, 40, 24], [126, 88, 54], n * (0.75 + (pl % 2) * 0.25)); return (u * 4) % 1 < 0.025 ? mul3(c, 0.35) : c;
});
C.cloth = paintTex(128, (u, v, i, j) => { const g = 236 * (0.86 + 0.14 * fbm(N1, u * 8, v * 8, 8, 3)) * (((i + j) % 2) ? 0.93 : 1); return [g, g, g]; });
C.water = paintTex(256, (u, v) => { const n = fbm(N2, u * 8, v * 8, 8, 5) * 255; return [n, n, n]; });
C.lava = paintTex(256, (u, v) => { const n = fbm(N1, u * 8, v * 8, 8, 5), r = 1 - Math.abs(n - 0.5) * 2; return mix3([30, 6, 3], [255, 168, 60], Math.pow(r, 4)); });
C.bronze = PHOTO_CANVAS.bronze || paintTex(128, (u, v) => { const n = fbm(N2, u * 8, v * 8, 8, 4); return mix3([96, 64, 30], [190, 140, 70], n); });
function glowCanvas() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.75)'); g.addColorStop(0.6, 'rgba(255,255,255,.18)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c;
}
function shaftCanvas() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 256; const x = c.getContext('2d');
  for (let i = 0; i < 128; i++) {
    const a = 0.25 + 0.75 * fbm(N1, i / 128 * 8, 0.5, 8, 3);
    const g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, `rgba(255,255,255,${0.9 * a})`); g.addColorStop(0.7, `rgba(255,255,255,${0.35 * a})`); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(i, 0, 1, 256);
  }
  return c;
}
// The photo textures are loaded by js/boot.js before this file runs (see PHOTO_CANVAS)
const PORTRAITS = {gaius: 'assets/portraits/gaius.webp', fabia: 'assets/portraits/fabia.webp', marcus: 'assets/portraits/marcus.webp', aulus: 'assets/portraits/aulus.webp', livia: 'assets/portraits/livia.webp'};   // character portraits, shown in the dialogue panel
Object.assign(C, PHOTO_CANVAS);
C.plGrey = C.plCream;
function relief(canvas, amount) {
  return {bumpMap:texFrom(canvas,false), bumpScale:amount};
}

const TEX = {
  glow: new THREE.CanvasTexture(glowCanvas()), shaft: new THREE.CanvasTexture(shaftCanvas()),
  water: texFrom(C.water, false), lava: texFrom(C.lava), cloth: texFrom(C.cloth),
};
TEX.water.repeat.set(10, 2); TEX.lava.repeat.set(8, 2);

// Carved Latin on a stone or marble face
function inscription(lines, w, h, bgCanvas, ink) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = Math.round(1024 * h / w); const x = c.getContext('2d');
  x.drawImage(bgCanvas, 0, 0, c.width, c.height);
  x.fillStyle = 'rgba(0,0,0,.08)'; x.fillRect(0, 0, c.width, c.height);
  x.strokeStyle = 'rgba(60,40,20,.5)'; x.lineWidth = 6; x.strokeRect(14, 14, c.width - 28, c.height - 28);
  const fs = Math.min(110, (c.height - 60) / lines.length * 0.72);
  x.font = `700 ${fs}px Cinzel, Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  lines.forEach((l, i) => {
    const y = c.height / 2 + (i - (lines.length - 1) / 2) * fs * 1.3;
    x.fillStyle = 'rgba(255,255,255,.35)'; x.fillText(l, c.width / 2 + 2, y + 2);
    x.fillStyle = ink; x.fillText(l, c.width / 2, y);
  });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

// ════════════════════════════════════════════════════════════════
// MATERIALS AND GEOMETRY HELPERS
// ════════════════════════════════════════════════════════════════
const std = o => new THREE.MeshStandardMaterial({ envMapIntensity: 0.23, ...o });
const MAT = {
  rock: std({ map: texFrom(C.rock), bumpMap: texFrom(C.rock, false), bumpScale: 0.16, roughness: 0.96, color: 0xd2cec8 }),
  ground: std({ map: texFrom(C.ground), bumpMap: texFrom(C.ground, false), bumpScale: 0.065, roughness: 1 }),
  pave: std({ map: texFrom(C.pave), bumpMap: texFrom(C.pave, false), bumpScale: 0.09, roughness: 0.82 }),
  cream: std({ map: texFrom(C.plCream), ...relief(C.plCream,0.025), roughness: 0.94 }),
  ochre: std({ map: texFrom(C.plOchre), ...relief(C.plOchre,0.025), roughness: 0.92 }),
  red: std({ map: texFrom(C.plRed), ...relief(C.plRed,0.025), roughness: 0.9 }),
  grey: std({ map: texFrom(C.plGrey), ...relief(C.plGrey,0.025), roughness: 0.92 }),
  dado: std({ map: texFrom(C.dado), roughness: 0.85 }),
  roof: std({ map: texFrom(C.roof), bumpMap: texFrom(C.roof, false), bumpScale: 0.09, roughness: 0.8 }),
  marble: std({ map: texFrom(C.marble), ...relief(C.marble,0.008), roughness: 0.38 }),
  wood: std({ map: texFrom(C.wood), ...relief(C.wood,0.022), roughness: 0.86 }),
  dark: std({ color: 0x0c0806, roughness: 1 }),
  door: std({ map: texFrom(C.wood), color: 0x6a4a34, roughness: 0.9 }),
  bronze: std({ map: texFrom(C.bronze), metalness: 0.85, roughness: 0.38 }),
  gold: std({ color: 0xd8a640, metalness: 1, roughness: 0.28 }),
  iron: std({ color: 0x2a2a2c, metalness: 0.8, roughness: 0.5 }),
  leather: std({ color: 0x4a3020, roughness: 0.8 }),
  water: std({ color: 0x0c1a1c, roughness: 0.08, metalness: 0.35, bumpMap: TEX.water, bumpScale: 0.08, transparent: true, opacity: 0.93 }),
  lava: std({ color: 0x220804, emissive: 0xffffff, emissiveMap: TEX.lava, emissiveIntensity: 2.2, roughness: 0.9 }),
  ember: std({ color: 0x200804, emissive: 0xff6a1a, emissiveIntensity: 2.4 }),
  bread: std({ color: 0xb07a3a, roughness: 0.9 }),
};
MAT.marbleCol = MAT.marble;
// Box and plane UVs scaled to world metres so textures keep the same size everywhere
function boxGeo(w, h, d, unit) {
  const g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv; unit = unit || 2;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) { const i = f * 4 + k; uv.setXY(i, uv.getX(i) * dims[f][0] / unit, uv.getY(i) * dims[f][1] / unit); }
  return g;
}
function planeGeo(w, d, unit, sx, sz) {
  const g = new THREE.PlaneGeometry(w, d, sx || 1, sz || 1); g.rotateX(-Math.PI / 2);
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w / unit, uv.getY(i) * d / unit);
  return g;
}
function mesh(geo, mat, x, y, z, parent, noShadow) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z);
  if (!noShadow) { m.castShadow = true; m.receiveShadow = true; }
  (parent || WORLD).add(m); return m;
}
