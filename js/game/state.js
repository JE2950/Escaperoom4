"use strict";
// ════════════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════════════
const HOUR = 60;                      // seconds of walking time in each Roman hour
const START = { x: -29.6, z: 34.6, yaw: Math.PI };
let mode = 'title';                  // title | intro | play | talk | question | read | journal | pause | loopend | end
let game = null;
const P = { x: START.x, y: 0, z: START.z, yaw: START.yaw, pitch: 0 };
const keys = {};
let NPCS = [];
let talkN = null, curQ = null, toastT = null, locT = null, lastZone = '';

function addNpc(def) {
  const p = makePerson(def.look); p.root.position.set(...def.at); p.root.rotation.y = def.face; WORLD.add(p.root);
  const n = { def, id: def.id, p, x: def.at[0], y: def.at[1], z: def.at[2], yaw: def.face, phase: 0, walk: 0, path: null, talking: false };
  p.root.traverse(m => { m.userData.npc = n; });
  NPCS.push(n); return n;
}
function addWalker(path, look) {
  const n = addNpc({ id: 'walker', name: 'A citizen', role: '', at: [path[0][0], 0, path[0][1]], face: 0, look });
  n.loop = path; n.seg = 0; n.speed = 1.1 + Math.random() * 0.3; return n;
}

function newGame() {
  game = { qs: buildGame(), results: new Array(15).fill(null), score: 0, clues: {}, loop: 1, clock: 0, accused: false, met: {}, seenLaw: false, t0: performance.now(), wrongAccuse: 0, timeLeft: 0 };
  resetDay();
}
function resetDay() {
  game.clock = 0; game.accused = false; game.met = {};
  const st = LV.start;
  Object.assign(P, { x: st.x, y: groundY(st.x, st.z), z: st.z, yaw: st.yaw, pitch: -0.05 });
  for (const n of NPCS) {
    if (n.loop) continue;
    n.x = n.def.at[0]; n.y = n.def.at[1]; n.z = n.def.at[2]; n.yaw = n.def.face; n.path = null; n.walk = 0; n.gone = false; n.done = false;
    n.p.root.visible = true;
  }
  LV.reset();
}
const npc = id => NPCS.find(n => n.id === id);
function groundY(x, z) { return LV.groundY(x, z); }
function walkable(x, z) { return LV.walkable(x, z); }
function zoneAt(x, z) { return LV.zoneAt(x, z); }
const solvedCount = id => { const b = PEOPLE.findIndex(p => p.id === id) * 3; let k = 0; for (let i = 0; i < 3; i++) if (game.results[b + i]) k++; return k; };
const clueCount = () => Object.keys(game.clues).length;
const helpedCount = () => PEOPLE.filter(p => solvedCount(p.id) === 3).length;
