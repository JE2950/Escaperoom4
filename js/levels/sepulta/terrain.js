"use strict";
// ════════════════════════════════════════════════════════════════
// THE GROUND: heights and what you can walk on
// ════════════════════════════════════════════════════════════════
let COL = [];   // solid boxes: { x0, x1, z0, z1, top }
function solid(x0, z0, x1, z1, top) { COL.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), top: top === undefined ? 99 : top }); }
const RIVER_Z = 45.5, LAVA_Z = -70;
function terrain(x, z) {
  let y = 0;
  const r = Math.hypot(x * 0.9, z + 10);
  if (r > 62) y += Math.pow((r - 62) / 9, 2) * 1.6 + (fbm(N2, (x + 200) / 25, (z + 200) / 25, 16, 3) - 0.5) * 3 * smooth(62, 80, r);
  y -= 2.2 * (1 - smooth(4, 8, Math.abs(z - RIVER_Z)));
  y -= 1.6 * (1 - smooth(3, 7, Math.abs(z - LAVA_Z))) * (Math.abs(x) < 40 ? 1 : smooth(52, 40, Math.abs(x)));
  return y;
}
const TRIB = { x0: -16.5, x1: -12.5, z0: -4, z1: 4, top: 1.4 };
function groundY1(x, z) {
  if (x > -33 && x < -27 && z > 36.5 && z < 47) return 0.25;                       // jetty
  if (x > -9 && x < 9 && z > -60 && z < -38) return 3;                              // temple podium
  if (x > -5 && x < 5 && z >= -38 && z < -31) return 3 * (-31 - z) / 7;             // temple steps
  return terrain(x, z);
}
function walkable1(x, z) {
  if (z > 38.3 && !(x > -32.6 && x < -27.4 && z < 46.4)) return false;
  if (z < -61.2) return false;
  if (Math.hypot(x * 0.9, z + 10) > 74) return false;
  return true;
}
