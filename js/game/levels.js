"use strict";
// ════════════════════════════════════════════════════════════════
// THE TWO LEVELS
// ════════════════════════════════════════════════════════════════
const LEVELS = {
  1: {
    key: 1, group: L1G, built: false, people: PEOPLE1, extras: [], d: D1, suspects: SUSPECTS1, ambient: AMBIENT1,
    culprit: 'aulus', judge: 'livia', culpritPath: AULUS_PATH, start: START,
    groundY: groundY1, walkable: walkable1, zoneAt: zoneAt1, fog: [0x191b20, 0.0105], bg: 0x090604, env: true,
    title: { r: 34, rz: 30, cx: 0, cz: -8, h: 13, look: [0, 3, -16] },
    walker: ['citizen', '<em>The citizen looks straight through you.</em>', 'Leave them be.'],
    intro: { h: 'Pompeii', when: 'A.D. LXXIX · IX KAL. SEPT.', btn: 'Surge · Get up',
      body: '<p>You run from the falling ash. The ground opens under your feet, and you fall into the dark.</p><p>You wake on a cold riverbank deep inside the mountain. Torches burn along the water. Ahead stands a city that no map has ever shown.</p><p>An old man with a lantern is watching you from the jetty.</p>' },
    arrive: ['The Riverbank', 'ripa', 'The old man on the jetty is watching you. Walk up to him and press <b>E</b> to talk.'],
    clock: (h, loop) => [`HORA ${ROMAN(h)} · DIES ${ROMAN(loop)}`, h >= 11 ? 'The twelfth hour is close.' : `${12 - h} hours until the twelfth hour`],
    when: (h, loop) => `Day ${loop}, hour ${h} of 12.`, dayWord: 'Dies', again: 'the same day, again',
    lawHtml: '<div class="law">DUM IGNIS ARDET, URBS VIVIT</div><p style="text-align:center">As long as the fire burns, the city lives.</p>',
    mustDo: 'Someone will put out Vulcan’s fire at the twelfth hour. Help the people of the city, collect clues, then tell Livia at the temple who it is. She wants proof from at least three witnesses.',
    accuseLabel: 'Someone will put out the fire tonight. I know who.',
    txt: { already: 'You have named someone already today. We shall see what the night brings.', proof: 'Words are cheap, stranger. Bring me proof from at least three witnesses. Then name the guilty one.',
      name: 'Then name them. Choose with care. If you are wrong, the city pays.', notYet: 'Then go, and come back when you are sure.' },
    wrongLine: (id, nm) => id === 'livia' ? 'Me? I have tended this fire for two hundred years. Go, before I lose my patience.' : `${nm}? I will watch ${nm} tonight. Pray to Vulcan that you are right.`,
    hourToast: hr => hr === 10 ? '<span class="g">HORA XI</span><br>The eleventh hour. Something stirs near the forum.' : hr === 6 ? '<span class="g">HORA VII</span><br>Half the day is gone.' : '',
    reset() { templeFire.on = true; templeFire.level = 1; },
    onArrive() {},
    loopEnd() { templeFire.on = false; sfx.rumble(); shake = 0.25; },
    loopText: (proof) => ['The fire dies', 'At the twelfth hour the sacred fire goes out. The mountain wakes, the ground splits, and the city vanishes in fire and ash.',
      `Then you wake on the cold riverbank again. It is the same morning. Everyone has forgotten. You have not: your clues and your Latin stay with you.${proof ? ' You have enough proof. Find Livia before the twelfth hour.' : ''}`],
    ending: () => [
      [npc('livia'), 'The owl. The treasury key. Aulus.'],
      [null, '<em>At the eleventh hour Aulus climbs the temple steps with a bronze key and a jar of water. Livia is waiting for him.</em>'],
      [npc('aulus'), '“Let me through! When the fire dies, the mountain opens. We could see the sky again!”'],
      [npc('livia'), '“When the fire dies, the mountain wakes, and we all die with it. You have read the law, Aulus. Read it again.”'],
      [null, '<em>Aulus drops the key. The twelfth hour comes, and the fire still burns. For the first time in two hundred years, tomorrow arrives.</em>'],
      [null, '<em>At dawn a crack of daylight opens in the roof of the cave. Gaius rows you to the foot of a long stair, and you climb toward the sky.</em>'],
    ], lastBtn: 'Climb into the light',
    endH: 'LIBERTAS', endSub: (loops, helped) => `You broke the curse of the buried city in ${loops === 1 ? 'a single day' : loops + ' days'}. ${helped} of 5 citizens trusted you with their secrets.`,
    fact: '', next: 2,
  },
  2: {
    key: 2, group: null, built: false, people: PEOPLE2, extras: EXTRAS2, d: D2, suspects: SUSPECTS2, ambient: AMBIENT2,
    culprit: 'labienus', judge: 'caesar', culpritPath: [[13, 12], [8, 9.2], [3.2, 7.8], [0.9, 6.9]], start: { x: 4.6, z: -21.6, yaw: Math.PI },
    groundY: groundY2, walkable: walkable2, zoneAt: zoneAt2, fog: [0x0b1018, 0.0125], bg: 0x05080d, env: false, build: buildRubicon,
    title: { r: 36, rz: 32, cx: 0, cz: 2, h: 15, look: [0, 1, 2] },
    walker: ['soldier', '<em>The soldier stamps his feet against the cold.</em>', 'Leave him be.'],
    intro: { h: 'The Rubicon', when: 'A.U.C. DCCV · A.D. IV ID. IAN.', btn: 'Surge · Get up',
      body: '<p>You climb the long stair out of the buried city toward the daylight. The light grows and grows, until it swallows you.</p><p>When it fades, it is night and bitterly cold. You stand on the bank of a small river. A wooden bridge leads across into the dark. Behind you burn the campfires of an army.</p><p>This is the river Rubicon, the edge of Julius Caesar’s province. At dawn, history says, he will lead his army across and start a civil war. But tonight someone plans to steal the eagle of his legion.</p>' },
    arrive: ['The Rubicon', 'flumen Rubico', 'A sentry at the camp gate has seen you. Walk up to him and press <b>E</b> to talk.'],
    clock: (h, loop) => [`VIGILIA ${ROMAN(Math.ceil(h / 3))} · NOX ${ROMAN(loop)}`, h >= 11 ? 'Dawn is close.' : `${12 - h} hours until dawn`],
    when: (h, loop) => `Night ${loop}, watch ${Math.ceil(h / 3)} of 4.`, dayWord: 'Nox', again: 'the same night, again',
    lawHtml: '<div class="law">NE QUIS EXERCITUM EX PROVINCIA EDUCAT</div><p style="text-align:center">No general may lead an army out of his province.</p>',
    mustDo: 'Someone will steal the eagle of the Thirteenth Legion before dawn. Without its eagle the legion will not march, Caesar will never cross, and history will break. Help the people of the camp, collect clues, then tell Caesar in his tent who it is. He wants proof from at least three witnesses.',
    accuseLabel: 'Someone will steal the eagle tonight. I know who.',
    txt: { already: 'You have named someone already tonight. We shall see what dawn brings.', proof: 'Accusations are cheap in an army camp. Bring me proof from at least three witnesses. Then name the thief.',
      name: 'Then name the thief. Choose carefully. My men will act on your word.', notYet: 'Then come back when you are sure.' },
    wrongLine: (id, nm) => `${nm}? Very well. My guards will watch ${nm} until dawn. If you are wrong, stranger, Rome pays the price.`,
    hourToast: hr => hr === 3 ? '<span class="g">VIGILIA II</span><br>The second watch. The camp grows quiet.' : hr === 6 ? '<span class="g">VIGILIA III</span><br>The third watch. Most of the camp is asleep.' : hr === 9 ? '<span class="g">VIGILIA IV</span><br>The last watch. Dawn is coming.' : hr === 10 ? '<span class="g">VIGILIA IV</span><br>Someone is moving toward the standards.' : '',
    reset() { if (eagleStd) eagleStd.visible = true; },
    onArrive(n) { if (n.id === 'labienus' && eagleStd) { eagleStd.visible = false; } },
    loopEnd() { if (eagleStd) eagleStd.visible = false; sfx.bell(); shake = 0.05; },
    loopText: (proof) => ['The eagle is gone', 'At dawn the eagle-bearer finds an empty pole. Without its eagle the Thirteenth refuses to march. Caesar never crosses the Rubicon, and history begins to come apart.',
      `The light swallows you, and you wake on the frozen riverbank at nightfall. Nobody remembers. You do: your clues and your Latin stay with you.${proof ? ' You have enough proof. Find Caesar in his tent before dawn.' : ''}`],
    ending: () => [
      [npc('caesar'), 'Labienus. My oldest friend in Gaul.'],
      [null, '<em>In the last watch Labienus creeps toward the standards with an empty sack. Caesar’s guards are waiting for him.</em>'],
      [npc('labienus'), '“You will start a war, Caesar! Pompey will crush you. I will not help you do it.”'],
      [npc('caesar'), '“Then go to Pompey, Titus. Take your horse. Leave my eagle.”'],
      [null, '<em>At dawn Caesar stands on the bank of the Rubicon and does not move. The whole army waits. Then the piper by the bridge snatches a trumpet from a soldier, blows a mighty blast, and strides across the river.</em>'],
      [npc('caesar'), '“Eatur quo deorum ostenta et inimicorum iniquitas vocat. <em>Iacta alea est.</em>”<br>Let us go where the signs of the gods and the wrongs of our enemies call us. The die is cast.'],
      [null, '<em>The Thirteenth Legion follows its eagle across the Rubicon. The light takes you once more, and this time it carries you home.</em>'],
    ], lastBtn: 'Cross the river',
    endH: 'IACTA ALEA EST', endSub: (loops, helped) => `You kept history on course in ${loops === 1 ? 'a single night' : loops + ' nights'}. ${helped} of 5 people in the camp trusted you with their secrets.`,
    fact: '<div class="fact" style="border-left:3px solid var(--gold);padding:8px 12px;margin-bottom:18px;line-height:1.55"><b style="color:var(--gold2)">This really happened.</b> The historian Suetonius tells us that Caesar hesitated at the Rubicon until a mysterious figure of great size and beauty, who had been sitting nearby playing a reed pipe, seized a trumpet and crossed. Caesar said “iacta alea est”: the die is cast. A few days later Titus Labienus, his best general in Gaul, left him and joined Pompey. Asinius Pollio was there that night, and later wrote a history of the war.</div>',
    next: 0,
  },
};
let LV = LEVELS[1];
// Once a level is built, every piece of scenery that never moves is merged by material,
// so hundreds of walls, columns, tents and stones draw as a few dozen pieces.
// People, readable inscriptions, anything marked keep, and models still loading are left alone.
function mergeStatic(root) {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), mtx = new THREE.Matrix4();
  const skip = o => { for (let a = o; a && a !== root; a = a.parent) if (a.userData.npc || a.userData.read || a.userData.keep || !a.visible) return true; return false; };
  const buckets = new Map();
  root.traverse(o => {
    if (!o.isMesh || o.isInstancedMesh || Array.isArray(o.material) || o.children.length || skip(o)) return;
    if (o.matrixWorld.determinant() < 0) return;
    const key = o.material.uuid + (o.castShadow ? 'c' : '') + (o.receiveShadow ? 'r' : '');
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(o);
  });
  for (const list of buckets.values()) {
    if (list.length < 2) continue;
    const geos = list.map(o => {
      const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      g.applyMatrix4(mtx.multiplyMatrices(inv, o.matrixWorld)); g.clearGroups();
      for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      if (!g.attributes.normal) g.computeVertexNormals();
      return g;
    });
    const merged = mergeGeometries(geos, false);
    geos.forEach(g => g.dispose());
    if (!merged) continue;
    const m = new THREE.Mesh(merged, list[0].material);
    m.castShadow = list[0].castShadow; m.receiveShadow = list[0].receiveShadow;
    list.forEach(o => o.parent.remove(o));
    root.add(m);
  }
}
const ENV = scene.environment;
function useLevel(k) {
  const L = LEVELS[k];
  if (LV === L && L.built) return;
  if (LV.built) Object.assign(LV, { COL, READ, fires, NPCS, lightSources });
  if (!L.built) {
    if (!L.group) { L.group = new THREE.Group(); scene.add(L.group); }
    WORLD = L.group; COL = []; READ = []; fires = []; NPCS = []; lightSources = [];
    LV = L; PEOPLE = L.people; D = L.d;
    L.build(); L.built = true;
    mergeStatic(L.group);
  } else { COL = L.COL; READ = L.READ; fires = L.fires; NPCS = L.NPCS; lightSources = L.lightSources; }
  for (const o of Object.values(LEVELS)) if (o.group) o.group.visible = (o === L);
  LV = L; WORLD = L.group;
  PEOPLE = L.people; D = L.d; SUSPECTS = L.suspects; AMBIENT_LINES = L.ambient;
  scene.fog.color.setHex(L.fog[0]); scene.fog.density = L.fog[1]; scene.background.setHex(L.bg);
  scene.environment = L.env ? ENV : null;
  lastZone = '';
}
let pipeT = 0;
function pipeTune(dt) {
  const pp = npc('piper'); if (!pp) return;
  const d = Math.hypot(P.x - pp.x, P.z - pp.z); if (d > 16) return;
  if ((pipeT -= dt) > 0) return;
  pipeT = 0.35 + Math.random() * 0.5;
  const notes = [523, 587, 659, 784, 880, 1047];
  tone(pick(notes), 0.5 + Math.random() * 0.4, 'sine', 0.03 * (1 - d / 16));
}
