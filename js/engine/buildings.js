"use strict";
// ════════════════════════════════════════════════════════════════
// BUILDINGS
// ════════════════════════════════════════════════════════════════
function roof(g, w, d, h) {
  const alongX = w >= d, span = alongX ? d : w, len = alongX ? w : d, a = 0.42, half = span / 2 + 0.5, rise = Math.tan(a) * span / 2;
  const sh = new THREE.Shape(); sh.moveTo(-span / 2, 0); sh.lineTo(span / 2, 0); sh.lineTo(0, rise); sh.closePath();
  const attic = new THREE.ExtrudeGeometry(sh, { depth: len - 0.02, bevelEnabled: false }); attic.translate(0, 0, -(len - 0.02) / 2);
  if (alongX) attic.rotateY(Math.PI / 2);
  mesh(attic, g.userData.wall, 0, h, 0, g);
  for (const s of [-1, 1]) {
    const pw = half / Math.cos(a), cy = h + rise - (half / 2) * Math.tan(a) + 0.07;
    if (alongX) { const p = mesh(boxGeo(len + 0.9, 0.14, pw, 2), MAT.roof, 0, cy, s * half / 2, g); p.rotation.x = s * a; }
    else { const p = mesh(boxGeo(pw, 0.14, len + 0.9, 2), MAT.roof, s * half / 2, cy, 0, g); p.rotation.z = -s * a; }
  }
}
// A house: plaster walls, red dado, tiled roof. open = the side left open (a shop front).
function house(x, z, w, d, h, wall, door, open) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.userData.wall = wall; WORLD.add(g);
  const t = 0.35;
  const sides = { n: [0, -d / 2 + t / 2, w, t], s: [0, d / 2 - t / 2, w, t], w: [-w / 2 + t / 2, 0, t, d], e: [w / 2 - t / 2, 0, t, d] };
  for (const [side, [cx, cz, sw, sd]] of Object.entries(sides)) {
    if (side === open) continue;
    mesh(boxGeo(sw, h, sd, 2.5), wall, cx, h / 2, cz, g);
    mesh(boxGeo(sw + 0.03, 0.95, sd + 0.03, 1.5), MAT.dado, cx, 0.475, cz, g);
    if (open) solid(x + cx - sw / 2, z + cz - sd / 2, x + cx + sw / 2, z + cz + sd / 2);
  }
  if (!open) {
    solid(x - w / 2, z - d / 2, x + w / 2, z + d / 2);
    mesh(boxGeo(w - 0.4, 0.2, d - 0.4, 2), wall, 0, h - 0.1, 0, g);
    const D = { n: [0, -d / 2 - 0.04, 1.4, 0.1], s: [0, d / 2 + 0.04, 1.4, 0.1], e: [w / 2 + 0.04, 0, 0.1, 1.4], w: [-w / 2 - 0.04, 0, 0.1, 1.4] }[door];
    if (D) {
      mesh(boxGeo(D[2], 2.4, D[3], 1), MAT.door, D[0], 1.2, D[1], g);
      mesh(boxGeo(D[2] + (D[2] > 1 ? 0.3 : 0.06), 0.18, D[3] + (D[3] > 1 ? 0.3 : 0.06), 1), MAT.marble, D[0], 2.5, D[1], g);
    }
    // small high windows
    for (const s of [-1, 1]) {
      if (w > d) { mesh(boxGeo(0.55, 0.5, d + 0.06, 1), MAT.dark, s * w / 4, h - 1.1, 0, g, true); }
      else { mesh(boxGeo(w + 0.06, 0.5, 0.55, 1), MAT.dark, 0, h - 1.1, s * d / 4, g, true); }
    }
  }
  roof(g, w, d, h);
  return g;
}
function column(x, y, z, h, r, parent) {
  const g = new THREE.Group(); g.position.set(x, y, z); (parent || WORLD).add(g);
  mesh(new THREE.CylinderGeometry(r * 1.3, r * 1.35, 0.32, 20), MAT.marble, 0, 0.16, 0, g);
  mesh(new THREE.CylinderGeometry(r * 0.85, r, h - 0.74, 22), MAT.marble, 0, 0.32 + (h - 0.74) / 2, 0, g);
  mesh(new THREE.CylinderGeometry(r * 1.15, r * 0.85, 0.18, 20), MAT.marble, 0, h - 0.33, 0, g);
  mesh(boxGeo(r * 2.7, 0.24, r * 2.7, 1), MAT.marble, 0, h - 0.12, 0, g);
  solid(x - r, z - r, x + r, z + r, y + h);
  return g;
}
function torch(x, z, power) {
  mesh(new THREE.CylinderGeometry(0.07, 0.09, 2.2, 8), MAT.wood, x, 1.1, z);
  mesh(new THREE.CylinderGeometry(0.22, 0.1, 0.22, 10), MAT.iron, x, 2.25, z);
  makeFire(x, 2.3, z, 0.55, power || 0, 18);
  solid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
}
