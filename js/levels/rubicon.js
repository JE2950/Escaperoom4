"use strict";
// ════════════════════════════════════════════════════════════════
// LEVEL 2: THE RUBICON, NIGHT OF 10 JANUARY 49 BC
// Caesar's camp on the bank of the river. Someone plans to steal the
// eagle of the Thirteenth Legion before dawn.
// ════════════════════════════════════════════════════════════════
const RUBI_Z = -30;
function terrain2(x, z) {
  let y = 0;
  const r = Math.hypot(x, z - 5);
  if (r > 42) y += (fbm(N2, (x + 300) / 30, (z + 300) / 30, 16, 3) - 0.35) * 4.5 * smooth(42, 80, r) + Math.pow(Math.max(0, r - 88) / 12, 2) * 3;
  y -= 2.1 * (1 - smooth(4.5, 8, Math.abs(z - RUBI_Z)));
  return y;
}
function groundY2(x, z) {
  if (x > -1.9 && x < 1.9 && z > -37 && z < -23) return 0.32;                 // the bridge
  return terrain2(x, z);
}
function walkable2(x, z) {
  if (Math.hypot(x, z - 5) > 92) return false;
  if (z < -24.6 && !(x > -1.5 && x < 1.5 && z > -35.6)) return false;       // the river, and Italy beyond it
  return true;
}
function zoneAt2(x, z) {
  if (z < -18) return ['The Rubicon', 'flumen Rubico'];
  if (Math.abs(x) < 6 && z > 3 && z < 18) return ['Caesar’s Headquarters', 'praetorium'];
  if (x < -8 && x > -17 && z > -8 && z < 1) return ['The Cooking Fire', 'focus'];
  if (x > 20 && z > 4 && z < 13) return ['The Horse Lines', 'equi'];
  return ['The Camp of the Thirteenth', 'castra'];
}

const PEOPLE2 = [
  { id: 'rufus', name: 'Rufus', role: 'the sentry', at: [2.9, 0, -16.2], face: Math.PI,
    look: { tunic: 0x8a2a1e, skin: 0xd6a482, hair: 0x7a3418, belt: true } },
  { id: 'tertia', name: 'Tertia', role: 'the camp cook', at: [-12, 0, -2], face: Math.PI,
    look: { tunic: 0x6e604a, skin: 0xc89670, hair: 0x2a1a10, female: true, apron: 0xd8ccb0 } },
  { id: 'lucius', name: 'Lucius', role: 'the eagle-bearer', at: [1.9, 0, 4.4], face: Math.PI,
    look: { tunic: 0x8a2a1e, skin: 0xb07a58, hair: 0x1a120c, beard: '#1a120c', belt: true, veil: 0x9a7a40 } },
  { id: 'pollio', name: 'Pollio', role: 'officer and writer', at: [9.6, 0, -0.4], face: -Math.PI / 2,
    look: { tunic: 0xe6dfd0, skin: 0xe4bc9a, hair: 0x4a3020, belt: true } },
  { id: 'labienus', name: 'Labienus', role: 'commander of the cavalry', at: [15, 0, 15.2], face: -Math.PI / 2,
    look: { tunic: 0x8a2420, palla: 0x7a1a14, skin: 0xc8a080, hair: 0x5a5650, old: true, belt: true } },
];
const EXTRAS2 = [
  { id: 'caesar', name: 'Caesar', role: 'proconsul of Gaul', at: [0, 0, 14.4], face: Math.PI,
    look: { tunic: 0xece6d8, palla: 0x6a1430, skin: 0xe0b896, hair: 0x3a3632, laurel: true, belt: true, old: true } },
  { id: 'piper', name: 'The Piper', role: 'a stranger by the river', at: [-6.5, 0, -22.3], face: Math.PI, pose: 'pipe',
    look: { tunic: 0x3a4a3a, skin: 0xe8c8a8, hair: 0xd8c088, scale: 1.12 } },
];
const SUSPECTS2 = ['rufus', 'tertia', 'lucius', 'pollio', 'labienus'];
const D2 = {
  rufus: {
    greet: 'Halt! Who goes there? Nobody walks out of the river at night. Give the password, or give your name.',
    again: 'Halt! Who goes... Wait. I know your face. How do I know your face?',
    who: 'Rufus, of the Thirteenth Legion. I guard this gate until dawn. Then I march, if Caesar says march.',
    extra: [
      { label: 'Where am I?', text: 'The camp of Gaius Julius Caesar, on the river Rubicon. Across that bridge lies Italy. Caesar’s province ends here, at the water.' },
      { label: 'Why does this river matter?', text: 'Roman law says no general may lead his army out of his province and into Italy. If Caesar crosses with us, it means war with Pompey and the Senate. Civil war.' },
    ],
    intros: ['Tonight’s password is written on this tablet, and I can never remember it. Help me read it.', 'My girl in Ariminum sent me a letter. I am not much of a reader.', 'The centurion left orders for the watch. Help me make sense of them.'],
    thanks: ['Gratias! Now I will not get flogged.', 'Ha! She misses me. Or so you say.', 'Good. Now I know what to do, at least.'],
    clue: 'Something strange? At the second watch an officer walked past my post toward the river, carrying an empty sack. Red cloak, and a gold brooch shaped like a horse. He gave the password, so I let him pass.',
    clueShort: 'Rufus: at the second watch an officer in a red cloak with a gold horse brooch went to the river with an empty sack.',
  },
  tertia: {
    greet: 'Mind the pot, it bites. You look half frozen. Warm your hands, if you like.',
    again: 'Mind the pot, it... Have you stood by my fire before? I could swear you have.',
    who: 'Tertia. I cook for the officers of the Thirteenth. Eight years in Gaul, and still they complain about my porridge.',
    extra: [
      { label: 'What will happen tomorrow?', text: 'If Caesar crosses, we march on Rome. If he does not, we sit here and freeze. Either way, they will want breakfast.' },
    ],
    intros: ['A merchant wrote me a bill on this tablet. I think he is cheating me. Help me check it.', 'The officers left this scrawled on my table. Help me with it.', 'My recipe for the general’s stew has a smudge on it. Help me.'],
    thanks: ['I knew it! The thief. Thank you.', 'Pah. Officers. Thank you all the same.', 'Good. Caesar likes his stew just so.'],
    clue: 'Labienus came to my fire tonight and did not eat. Labienus always eats. He asked me for a sack big enough to hold a goose. “A big goose,” he said, “with wings.” Then he laughed.',
    clueShort: 'Tertia: Labienus did not eat. He asked her for a sack “big enough for a goose, with wings”.',
  },
  lucius: {
    greet: 'Step back from the standards, stranger. That is the eagle of the Thirteenth. Men have died for less than a closer look.',
    again: 'Step back from the... You again? No. We have never met. Have we?',
    who: 'Lucius, eagle-bearer of the Thirteenth Legion. I carry the eagle. Where it goes, the legion follows. If it is ever lost, the legion is shamed for ever.',
    extra: [
      { label: 'Why the lion skin?', text: 'Every eagle-bearer wears one. It shows the men who carries the eagle. It also keeps my ears warm.' },
    ],
    intros: ['The words on the eagle’s plaque are worn. Help me read them.', 'My mother taught me a prayer to Mars. I have muddled the words.', 'A new recruit painted this on his shield. Is it right?'],
    thanks: ['Good. The eagle is proud of you.', 'Mars will thank you. So do I.', 'I will tell the boy. He will be furious.'],
    clue: 'Tonight an officer ordered me to sleep in my tent and leave the eagle alone during the last watch. I could not see his face in the dark. But his brooch caught the firelight: a golden horse.',
    clueShort: 'Lucius: an officer ordered him to leave the eagle unguarded in the last watch. The officer wore a golden horse brooch.',
  },
  pollio: {
    greet: 'Ah. A stranger with a strange look about him. Forgive me, I am a writer. I notice things.',
    again: 'Ah. A stranger with... Odd. I feel I have already written about you.',
    who: 'Gaius Asinius Pollio, officer of Caesar and, one day, I hope, a historian. Tonight I write everything down. Tomorrow might be worth remembering.',
    extra: [
      { label: 'What will Caesar do?', text: 'He has been staring at that river for an hour. If he crosses, the whole world changes. I would not want to be the man who decides.' },
    ],
    intros: ['I have written a sentence for my history and I do not trust it. Check it for me.', 'A messenger brought this note from Rome. Help me read it.', 'A line of Latin keeps running through my head. Help me pin it down.'],
    thanks: ['Excellent. You would make a fine editor.', 'Hm. Bad news from Rome. But thank you.', 'Yes! That is it. You have an ear for Latin.'],
    clue: 'I notice things, as I said. Tonight Labienus sent a rider south with a letter. I saw the seal on it: a lion holding a sword. That is the seal of Pompey the Great, Caesar’s enemy.',
    clueShort: 'Pollio: Labienus sent a rider south with a letter. It carried Pompey’s seal, a lion holding a sword.',
  },
  labienus: {
    greet: 'Who let you in? I am Caesar’s right hand, stranger. Speak quickly, or not at all.',
    again: 'Who let you... Have you been following me? I have seen you before.',
    who: 'Titus Labienus. I have led Caesar’s cavalry for nine years in Gaul. I have won him more battles than he likes to admit.',
    extra: [
      { label: 'Will you follow Caesar across the river?', text: 'Across the river lies Italy, and Rome. Caesar calls it justice. Pompey calls it treason. I call it a cold night. Goodnight.' },
      { label: 'That is a fine brooch.', text: 'A golden horse, for Caesar’s horseman. He gave it to me after Alesia. He likes to remind me what I owe him.' },
    ],
    intros: ['Read this report from my scouts. Their spelling is a crime.', 'Check this order before I send it to the cavalry.', 'This message came in code, they tell me. It looks like plain Latin to me.'],
    thanks: ['Fine. Go away.', 'Correct. You are cleverer than you look.', 'Good. Now leave me be.'],
    clueLabel: 'What are you hiding?', narrate: true,
    locked: 'Hiding? Nothing. Make yourself useful, and perhaps I will waste some time on you.',
    clue: 'Labienus turns away too fast. Folded under his red cloak is an empty sack, big enough to hold a goose. Or an eagle. On the stool by his tent lies a sealed letter addressed to <em>Gnaeus Pompeius Magnus</em>.',
    clueShort: 'Labienus hides an empty sack under his cloak, and has a sealed letter addressed to Pompey the Great.',
  },
  caesar: {
    greet: 'A stranger in my camp at night, on the edge of my province. Speak quickly. I have a river to think about.',
    again: 'A stranger in my... No. Not a stranger. I have seen you before, and I never forget a face.',
    who: 'Gaius Julius Caesar, proconsul of Gaul. Tonight, perhaps, a criminal. Tomorrow, perhaps, the master of Rome.',
    extra: [
      { label: 'Will you cross the Rubicon?', text: 'If I cross, it is war with Pompey and the Senate. If I stay, my enemies will destroy me in the courts. Either way, good men will suffer. Leave me to think.' },
      { label: 'Who do you trust?', text: 'My legions. My eagle. Labienus, my oldest friend in Gaul. Trust is a luxury, stranger, but tonight I must afford it.' },
    ],
  },
  piper: {
    greet: 'You came out of the river with the moonlight on you. Out of tomorrow, I think. Sit. Listen.',
    again: 'You again. The river brings you back, and back. It will keep bringing you until the die is cast.',
    who: 'Who am I? A shepherd. A traveller. A rumour. At dawn, when Caesar stands still at the water, perhaps I will remind him how to cross a river.',
    extra: [
      { label: 'What do you know about the eagle?', text: 'Eagles do not fly at night. Someone will carry this one. Look for the one who rides with horses.' },
      { label: 'Play me a tune.', text: '<em>He plays a few soft notes. The tune drifts over the water, and the sentries on the gate look up.</em>', html: true },
    ],
  },
};
const AMBIENT2 = ['Cold night. My feet are ice.', 'They say Caesar will cross at dawn. Or not. Nobody knows.', 'The Thirteenth follows its eagle. Wherever it goes.', 'Mind the fire, stranger. And mind the centurion.', 'Rome, they say. I have never seen Rome.'];

// ── Night textures ──
function nightTextures() {
  C.grass = paintTex(512, (u, v) => {
    const n = fbm(N1, u * 16, v * 16, 16, 5), m = fbm(N2, u * 4, v * 4, 4, 4);
    let c = mix3([34, 40, 24], [70, 78, 44], n); c = mix3(c, [62, 52, 36], smooth(0.5, 0.75, m) * 0.7);
    return N2(u * 128, v * 128, 128) > 0.8 ? mul3(c, 1.25) : c;
  });
  C.mud = paintTex(512, (u, v) => {
    const n = fbm(N1, u * 16, v * 16, 16, 5), m = fbm(N2, u * 8, v * 8, 8, 4);
    const c = mix3([52, 40, 30], [96, 78, 58], n); return m > 0.62 ? mul3(c, 0.62) : c;
  });
  C.leather = paintTex(256, (u, v) => {
    const pu = Math.floor(u * 4), pv = Math.floor(v * 3), n = fbm(N2, u * 8, v * 8, 8, 4);
    let c = mul3(mix3([92, 66, 42], [146, 108, 70], n), 0.85 + ((pu * 7 + pv * 3) % 5) * 0.06);
    const eu = Math.min((u * 4) % 1, 1 - (u * 4) % 1), ev = Math.min((v * 3) % 1, 1 - (v * 3) % 1);
    if (eu < 0.012 || ev < 0.016) c = mul3(c, 0.55);
    return c;
  });
  C.sky = (() => {
    const c = document.createElement('canvas'); c.width = 8; c.height = 256; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#02040a'); g.addColorStop(0.42, '#08101e'); g.addColorStop(0.5, '#152036'); g.addColorStop(0.56, '#0c1220'); g.addColorStop(1, '#05070c');
    x.fillStyle = g; x.fillRect(0, 0, 8, 256); return c;
  })();
  const t = (c, r) => { const tx = texFrom(c); tx.repeat.set(r, r); return tx; };
  MAT.grass = std({ map: t(C.grass, 1), bumpMap: texFrom(C.grass, false), bumpScale: 0.05, roughness: 1, envMapIntensity: 0 });
  MAT.mud = std({ map: texFrom(C.mud), bumpMap: texFrom(C.mud, false), bumpScale: 0.06, roughness: 0.95, envMapIntensity: 0 });
  MAT.leather = std({ map: texFrom(C.leather), roughness: 0.85, side: THREE.DoubleSide, envMapIntensity: 0 });
  MAT.redLeather = std({ map: texFrom(C.leather), color: 0xc05a48, roughness: 0.85, side: THREE.DoubleSide, envMapIntensity: 0 });
  MAT.leaf = std({ color: 0x1e2a18, roughness: 1, envMapIntensity: 0 });
  MAT.bark = std({ color: 0x2a2018, roughness: 1, envMapIntensity: 0 });
  MAT.silver = std({ color: 0xc8ccd4, metalness: 1, roughness: 0.3 });
}

// A leather tent: a ridge tent with a dark door at one end (ridge runs along z)
function tent(x, z, w, d, h, mat, rot) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot || 0; WORLD.add(g);
  const sh = new THREE.Shape(); sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(0, h); sh.closePath();
  const geo = new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }); geo.translate(0, 0, -d / 2);
  const uv = geo.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.5, uv.getY(i) * 0.5);
  mesh(geo, mat, 0, 0, 0, g);
  const door = new THREE.Shape(); door.moveTo(-w * 0.18, 0); door.lineTo(w * 0.18, 0); door.lineTo(0, h * 0.62); door.closePath();
  mesh(new THREE.ShapeGeometry(door), MAT.dark, 0, 0.01, d / 2 + 0.02, g, true);
  for (const s of [-1, 1]) mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6), MAT.wood, 0, h + 0.1, s * d / 2, g);
  const sw = (rot && Math.abs(Math.sin(rot)) > 0.5) ? d : w, sd = (rot && Math.abs(Math.sin(rot)) > 0.5) ? w : d;
  solid(x - sw / 2, z - sd / 2, x + sw / 2, z + sd / 2);
  return g;
}
function tree(x, z, s, tall) {
  const y = terrain2(x, z);
  const h = (tall ? 5 : 2.6) * s;
  mesh(new THREE.CylinderGeometry(0.12 * s, 0.2 * s, h, 7), MAT.bark, x, y + h / 2, z);
  if (tall) { const c = mesh(new THREE.ConeGeometry(1.3 * s, 7 * s, 9), MAT.leaf, x, y + h + 2.2 * s, z); c.scale.x = 0.8; }
  else for (let i = 0; i < 3; i++) mesh(new THREE.DodecahedronGeometry((1.6 + Math.random()) * s, 1), MAT.leaf, x + (Math.random() - 0.5) * 2 * s, y + h + Math.random() * 1.4 * s, z + (Math.random() - 0.5) * 2 * s);
  solid(x - 0.3 * s, z - 0.3 * s, x + 0.3 * s, z + 0.3 * s);
}
function horse(x, z, rot, col) {
  const g = new THREE.Group(); g.position.set(x, terrain2(x, z), z); g.rotation.y = rot; WORLD.add(g);
  const m = std({ color: col, roughness: 0.75, envMapIntensity: 0.1 }), dark = std({ color: 0x15100c, roughness: 0.9 });
  const body = mesh(new THREE.CapsuleGeometry(0.36, 1.1, 6, 14), m, 0, 1.35, 0, g); body.rotation.x = Math.PI / 2;
  const neck = mesh(new THREE.CylinderGeometry(0.17, 0.27, 0.9, 10), m, 0, 1.85, 0.8, g); neck.rotation.x = 0.6;
  const head = mesh(boxGeo(0.24, 0.26, 0.62, 1), m, 0, 2.18, 1.18, g); head.rotation.x = 0.55;
  mesh(boxGeo(0.06, 0.4, 0.22, 1), dark, 0, 2.05, 0.82, g).rotation.x = 0.6;            // mane
  for (const s of [-1, 1]) mesh(new THREE.ConeGeometry(0.04, 0.14, 5), m, s * 0.08, 2.45, 1.0, g);
  for (const [lx, lz] of [[-0.2, 0.6], [0.2, 0.6], [-0.2, -0.6], [0.2, -0.6]]) mesh(new THREE.CylinderGeometry(0.06, 0.05, 1.05, 8), m, lx, 0.53, lz, g);
  const tail = mesh(new THREE.CylinderGeometry(0.05, 0.1, 0.8, 6), dark, 0, 1.2, -0.95, g); tail.rotation.x = -0.4;
  g.userData.head = head;
  const sw = Math.abs(Math.sin(rot)) > 0.5 ? [1.3, 0.5] : [0.5, 1.3];
  solid(x - sw[0], z - sw[1], x + sw[0], z + sw[1]);
  return g;
}

let eagleStd = null, moon = null, horses2 = [];
function buildRubicon() {
  nightTextures();
  // ── Sky, stars and moon ──
  const sky = new THREE.Mesh(new THREE.SphereGeometry(330, 32, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(C.sky), side: THREE.BackSide, fog: false, depthWrite: false }));
  sky.material.map.colorSpace = THREE.SRGBColorSpace; WORLD.add(sky);
  const sn = 1800, sp = new Float32Array(sn * 3);
  for (let i = 0; i < sn; i++) { const a = Math.random() * Math.PI * 2, e = Math.asin(0.05 + Math.random() * 0.95); sp[i * 3] = Math.cos(a) * Math.cos(e) * 300; sp[i * 3 + 1] = Math.sin(e) * 300; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 300; }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  WORLD.add(new THREE.Points(sg, new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, color: 0xdfe6ff, fog: false, transparent: true, opacity: 0.85, depthWrite: false })));
  const moonDir = new THREE.Vector3(-0.45, 0.62, -0.64).normalize();
  moon = new THREE.Mesh(new THREE.CircleGeometry(9, 32), new THREE.MeshBasicMaterial({ color: 0xf2f0e6, fog: false }));
  moon.position.copy(moonDir).multiplyScalar(290); moon.lookAt(0, 0, 0); WORLD.add(moon);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0x9fb2e0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, opacity: 0.6 }));
  halo.position.copy(moon.position); halo.scale.set(90, 90, 1); WORLD.add(halo);

  // ── Light ──
  WORLD.add(new THREE.HemisphereLight(0x3a4a70, 0x120e0a, 0.55));
  WORLD.add(new THREE.AmbientLight(0x1c2436, 0.35));
  const ml = new THREE.DirectionalLight(0xb0c2ff, 1.1);
  ml.position.copy(moonDir).multiplyScalar(80).add(new THREE.Vector3(0, 0, 5)); ml.target.position.set(0, 0, 5);
  ml.castShadow = true; ml.shadow.mapSize.set(2048, 2048); const sc = ml.shadow.camera; sc.left = -48; sc.right = 48; sc.top = 48; sc.bottom = -48; sc.near = 10; sc.far = 200;
  ml.shadow.bias = -0.0005; ml.shadow.normalBias = 0.05; WORLD.add(ml, ml.target);

  // ── Ground and river ──
  const gg = planeGeo(260, 260, 5, 170, 170), gp = gg.attributes.position;
  for (let i = 0; i < gp.count; i++) gp.setY(i, terrain2(gp.getX(i), gp.getZ(i) + 5));
  gg.computeVertexNormals();
  const gm = mesh(gg, MAT.grass, 0, 0, 5); gm.castShadow = false;
  const water = mesh(planeGeo(300, 15, 8), MAT.water, 0, -0.62, RUBI_Z, WORLD, true); water.receiveShadow = true;
  // camp roads
  mesh(planeGeo(4.5, 28, 4), MAT.mud, 0, 0.03, -4.5);
  mesh(planeGeo(60, 3.5, 4), MAT.mud, 0, 0.035, 0);
  mesh(planeGeo(3.5, 7, 4), MAT.mud, 0, 0.03, -21.5);

  // ── The bridge ──
  mesh(boxGeo(3.6, 0.22, 14.5, 1.5), MAT.wood, 0, 0.2, -30);
  for (const zz of [-35.5, -32.5, -29.5, -26.5, -23.8]) for (const xx of [-1.8, 1.8]) {
    mesh(new THREE.CylinderGeometry(0.13, 0.15, 2.6, 8), MAT.wood, xx, -0.5, zz);
    mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.0, 6), MAT.wood, xx, 0.8, zz);
  }
  for (const xx of [-1.8, 1.8]) mesh(boxGeo(0.1, 0.1, 14, 1), MAT.wood, xx, 1.25, -30);
  solid(-2.2, -37, -1.7, -23.5, 99); solid(1.7, -37, 2.2, -23.5, 99);
  // the boundary stone and a milestone
  const stone = mesh(boxGeo(0.75, 1.35, 0.26, 1), MAT.marble, 3.4, 0.62, -23.4); stone.rotation.y = 0.15;
  stone.material = std({ map: inscription(['FINIS', 'PROVINCIAE'], 0.75, 1.35, C.marble, 'rgba(70,40,25,.92)'), roughness: 0.6 });
  readable(stone, { title: 'A boundary stone', lat: 'Finis provinciae.', en: 'The end of the province.',
    about: 'The Rubicon was the border between Caesar’s province, Cisalpine Gaul, and Italy itself. Roman law banned a general from leading his army out of his province. Crossing this river with soldiers meant civil war.' });
  solid(3.0, -23.6, 3.8, -23.2);
  const ms = mesh(new THREE.CylinderGeometry(0.32, 0.36, 1.5, 20), std({ map: inscription(['ARIMINVM', 'M · P · XIII'], 2.2, 1.5, C.marble, 'rgba(60,40,25,.9)'), roughness: 0.7 }), -3.6, 0.75, -21.4);
  ms.rotation.y = Math.PI;
  readable(ms, { title: 'A milestone', lat: 'Ariminum, m(ilia) p(assuum) XIII.', en: 'Ariminum, thirteen miles.',
    about: 'A Roman mile was a thousand paces: mille passus. The town of Ariminum, on the Italian side of the river, was Caesar’s first target once he crossed.' });
  solid(-4, -21.8, -3.2, -21);

  // ── The palisade: a ring of sharpened stakes with gates north and south ──
  const stakes = [], add = (x, z) => stakes.push([x, z]);
  for (let x = -30; x <= 30; x += 0.45) { if (Math.abs(x) > 3) { add(x, -18); add(x, 30); } }
  for (let z = -18; z <= 30; z += 0.45) { add(-30, z); add(30, z); }
  const sm = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.015, 0.11, 2.7, 6), MAT.wood, stakes.length), dm = new THREE.Object3D();
  stakes.forEach(([x, z], i) => { dm.position.set(x, 1.3, z); dm.rotation.set((Math.random() - 0.5) * 0.06, Math.random() * 3, (Math.random() - 0.5) * 0.06); dm.scale.y = 0.9 + Math.random() * 0.2; dm.updateMatrix(); sm.setMatrixAt(i, dm.matrix); });
  sm.castShadow = sm.receiveShadow = true; WORLD.add(sm);
  solid(-30.3, -18.3, -3, -17.7); solid(3, -18.3, 30.3, -17.7); solid(-30.3, 29.7, -3, 30.3); solid(3, 29.7, 30.3, 30.3);
  solid(-30.3, -18.3, -29.7, 30.3); solid(29.7, -18.3, 30.3, 30.3);
  for (const s of [-1, 1]) {                                  // gate towers
    mesh(boxGeo(1.6, 4.2, 1.6, 1.5), MAT.wood, s * 3.9, 2.1, -18); solid(s * 3.9 - 0.8, -18.8, s * 3.9 + 0.8, -17.2);
    mesh(boxGeo(2, 0.2, 2, 1.5), MAT.wood, s * 3.9, 4.3, -18);
  }
  mesh(boxGeo(9.4, 0.3, 0.5, 1.5), MAT.wood, 0, 4.1, -18);
  torch(-3.3, -16.6, 26); torch(3.3, 19.5, 0);

  // ── Tents in rows ──
  const keepOut = [[-17, -9, -7, 1], [7, -8, 16, 2], [-6.5, 2.5, 6.5, 19], [12, 11, 24, 21], [20, 3, 29, 13], [-3, -18, 3, 30], [-30, -1.8, 30, 1.8], [-22, 11, -17, 17], [6, 20.5, 16, 28]];
  for (let x = -26; x <= 26; x += 5.2) for (let z = -13; z <= 26; z += 6.5) {
    if (keepOut.some(([a, b, c, d]) => x > a - 1.6 && x < c + 1.6 && z > b - 1.8 && z < d + 1.8)) continue;
    tent(x + (Math.random() - 0.5) * 0.3, z, 2.6, 3.2, 2.1, MAT.leather, 0);
  }
  // ── Caesar's headquarters: a large red tent, open at the front ──
  const hq = new THREE.Group(); hq.position.set(0, 0, 13); WORLD.add(hq);
  mesh(boxGeo(9, 2.2, 0.12, 2), MAT.redLeather, 0, 1.1, 3.5, hq);
  for (const s of [-1, 1]) {
    mesh(boxGeo(0.12, 2.2, 7, 2), MAT.redLeather, s * 4.5, 1.1, 0, hq);
    mesh(boxGeo(3.2, 2.2, 0.12, 2), MAT.redLeather, s * 2.9, 1.1, -3.5, hq);
    solid(s * 4.5 - 0.2, 9.5, s * 4.5 + 0.2, 16.5); solid(s > 0 ? 1.3 : -4.5, 9.3, s > 0 ? 4.5 : -1.3, 9.7);
  }
  solid(-4.5, 16.3, 4.5, 16.7);
  const sh = new THREE.Shape(); sh.moveTo(-4.9, 0); sh.lineTo(4.9, 0); sh.lineTo(0, 2.2); sh.closePath();
  const rg = new THREE.ExtrudeGeometry(sh, { depth: 7.6, bevelEnabled: false }); rg.translate(0, 0, -3.8);
  mesh(rg, MAT.redLeather, 0, 2.2, 0, hq);
  prop('wooden_table_02', -1.6, 0, 14.6, { scale: [1.45, 1.05, 1.5] });
  prop('wooden_stool_01', -1.6, 0, 15.75, { rot: 0.3 });
  prop('jug_01', -2.05, 0.84, 15.05, { rot: 1.2 });
  prop('wine_barrel_01', 3.7, 0, 15.7, { solid: 0.4 });
  prop('wooden_crate_02', 3.5, 0, 11.4, { rot: Math.PI / 2, solid: 0.6 });
  solid(-2.8, 13.9, -0.4, 15.3);
  const map = mesh(new THREE.PlaneGeometry(1.6, 0.9), std({ map: inscription(['ITALIA', 'RVBICO · ARIMINVM · ROMA'], 1.6, 0.9, C.plCream, 'rgba(90,40,20,.9)'), roughness: 0.9 }), -1.6, 0.855, 14.6, WORLD);
  map.rotation.x = -Math.PI / 2;
  readable(map, { title: 'Caesar’s map', lat: 'Italia. Rubico, Ariminum, Roma.', en: 'Italy. The Rubicon, Ariminum, Rome.',
    about: 'A map of the road south. Once across the Rubicon, Caesar would take Ariminum, then march on Rome. Pompey and most of the Senate fled before him.' });
  makeFire(1.9, 1.05, 15.6, 0.22, 10, 9);
  mesh(new THREE.CylinderGeometry(0.12, 0.08, 1.0, 8), MAT.bronze, 1.9, 0.5, 15.6);

  // ── The standards, with the eagle of the Thirteenth ──
  eagleStd = new THREE.Group(); eagleStd.position.set(0, 0, 6.2); WORLD.add(eagleStd);
  mesh(new THREE.CylinderGeometry(0.045, 0.05, 3.1, 8), MAT.wood, 0, 1.55, 0, eagleStd);
  mesh(boxGeo(0.5, 0.36, 0.04, 1), MAT.gold, 0, 2.3, 0.05, eagleStd);
  const ring = mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 20), MAT.gold, 0, 3.1, 0, eagleStd); ring.rotation.x = Math.PI / 2;
  const eb = mesh(new THREE.SphereGeometry(0.16, 16, 12), MAT.gold, 0, 3.32, 0, eagleStd); eb.scale.set(0.8, 1.2, 1);
  mesh(new THREE.SphereGeometry(0.08, 12, 10), MAT.gold, 0, 3.58, 0.06, eagleStd);
  for (const s of [-1, 1]) { const w = mesh(boxGeo(0.5, 0.05, 0.22, 1), MAT.gold, s * 0.3, 3.5, -0.02, eagleStd); w.rotation.z = s * 0.7; }
  readable(eagleStd, { title: 'The eagle of the Thirteenth', lat: 'S(enatus) P(opulus)q(ue) R(omanus). Leg(io) XIII.', en: 'The Senate and People of Rome. The Thirteenth Legion.',
    about: 'Every legion carried a golden eagle on a pole. Losing it was the worst disgrace a legion could suffer, and soldiers would die rather than let it be taken. The Thirteenth crossed the Rubicon with Caesar.' });
  for (const s of [-1, 1]) {
    const sg2 = new THREE.Group(); sg2.position.set(s * 1.3, 0, 6.6); WORLD.add(sg2);
    mesh(new THREE.CylinderGeometry(0.035, 0.04, 2.8, 8), MAT.wood, 0, 1.4, 0, sg2);
    for (let k = 0; k < 4; k++) mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16), MAT.silver, 0, 1.6 + k * 0.22, 0.04, sg2).rotation.x = Math.PI / 2;
    mesh(boxGeo(0.12, 0.2, 0.02, 1), MAT.silver, 0, 2.75, 0, sg2);
    solid(s * 1.3 - 0.15, 6.45, s * 1.3 + 0.15, 6.75);
  }
  solid(-0.2, 6.0, 0.2, 6.4);
  mesh(boxGeo(0.9, 0.8, 0.6, 1), MAT.marble, 0, 0.4, 7.6); solid(-0.45, 7.3, 0.45, 7.9);

  // ── Cooking fire, writer's table, the officers' tents and the horse lines ──
  makeFire(-12, 0.15, -4.2, 0.85, 34, 22);
  prop('stone_fire_pit', -12, 0, -4.2, { rot: 0.4 });
  for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; const l = mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.9, 6), MAT.iron, -12 + Math.cos(a) * 0.45, 0.9, -4.2 + Math.sin(a) * 0.45); l.rotation.set(Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25); }
  mesh(new THREE.SphereGeometry(0.33, 16, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), MAT.iron, -12, 1.15, -4.2);
  solid(-12.8, -5, -11.2, -3.4);
  tent(-14.5, -7.2, 2.6, 3.2, 2.1, MAT.leather, Math.PI / 2);
  tent(12.5, -4, 3.2, 3.6, 2.4, MAT.leather, -Math.PI / 2);
  prop('wooden_table_02', 10.1, 0, -1.9, { solid: 0.6 });
  prop('wooden_stool_01', 10.9, 0, -1.0, { rot: 0.5 });
  makeFire(10.55, 0.86, -2.1, 0.16, 9, 8);
  for (let i = 0; i < 3; i++) { const sc2 = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8), MAT.cream, 9.6 + i * 0.2, 0.83, -1.8); sc2.rotation.z = Math.PI / 2; }
  tent(18.5, 17.5, 3.4, 4, 2.5, MAT.redLeather, -Math.PI / 2);
  torch(15.6, 13.4, 16);
  mesh(boxGeo(0.5, 0.45, 0.5, 1), MAT.wood, 16.3, 0.22, 16.8);
  [[23.5, 6, Math.PI / 2, 0x3a2416], [23.5, 8.5, Math.PI / 2, 0x6a4a2e], [23.5, 11, Math.PI / 2, 0x1a1410], [27, 7.2, -Math.PI / 2, 0x8a7a68]].forEach(([x, z, r, c]) => horses2.push(horse(x, z, r, c)));
  mesh(new THREE.CylinderGeometry(0.05, 0.05, 7, 6), MAT.wood, 22, 1.1, 8.5).rotation.x = Math.PI / 2;
  // soldiers' campfires among the tents
  makeFire(-21, 0.15, 14, 0.6, 22, 16); makeFire(21, 0.15, -10, 0.6, 0, 14); makeFire(-23.4, 0.15, -9.8, 0.55, 0, 14);
  [[-21, 14], [21, -10], [-23.4, -9.8]].forEach(([x, z], i) => { prop('stone_fire_pit', x, 0, z, { rot: i * 2, scale: 0.8 }); prop('dry_branches_medium_01', x + 1.1, 0, z + 0.4, { rot: i, detail: true }); });

  // ── Trees along the river and the hills ──
  for (let i = 0; i < 70; i++) {
    let x, z;
    if (i < 40) { x = (Math.random() - 0.5) * 200; z = Math.random() < 0.5 ? -40 - Math.random() * 10 : -21.5 - Math.random() * 2.5; if (Math.abs(x) < 8) continue; }
    else { const a = Math.random() * Math.PI * 2, r = 40 + Math.random() * 45; x = Math.cos(a) * r; z = 5 + Math.sin(a) * r; if (z < -20 && z > -40) continue; }
    if (x > -32 && x < 32 && z > -20 && z < 32) continue;
    tree(x, z, 0.8 + Math.random() * 0.6, Math.random() < 0.45);
  }
  // mist on the water
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0x7d8ca8, transparent: true, opacity: 0.08, depthWrite: false }));
    m.position.set((Math.random() - 0.5) * 110, 0.6, RUBI_Z + (Math.random() - 0.5) * 6); m.scale.set(26, 5, 1); WORLD.add(m);
  }

  // ── Real props (scanned models from Poly Haven, CC0) ──
  prop('tree_stump_01', -13.9, 0, -5.3, { scale: 0.45, rot: 1, detail: true });
  prop('tree_stump_01', -10.2, 0, -5.0, { scale: 0.4, rot: 3, detail: true });
  prop('dry_branches_medium_01', -14.4, 0, -2.2, { rot: 0.8, detail: true });
  prop('wooden_bucket_01', -10.6, 0, -2.4, { rot: 2, solid: 0.25 });
  prop('wooden_bowl_01', -10.9, 0, -3.0, { rot: 1 });
  prop('wine_barrel_01', -15.8, 0, -3.4, { solid: 0.4 }); prop('wine_barrel_01', -15.9, 0, -2.5, { rot: 1.4, solid: 0.4 });
  prop('wine_barrel_01', -4.9, 0, -16.4, { rot: 0.5, solid: 0.4 });
  prop('wooden_bucket_01', 22.0, 0, 6.9, { solid: 0.25 }); prop('wooden_bucket_01', 22.0, 0, 10.1, { rot: 2, solid: 0.25 });
  // the supply dump
  [[8, 23, 0.1], [9.25, 23.2, 1.7]].forEach(([x, z, r]) => prop('wooden_crate_02', x, 0, z, { rot: r, solid: 0.6 }));
  prop('wooden_crate_01', 8.6, 0.47, 23.1, { rot: 0.4 });
  [[12, 22.5], [12.8, 23.3], [13.4, 22.4], [12.6, 24.3]].forEach(([x, z], i) => prop('wine_barrel_01', x, 0, z, { rot: i, solid: 0.4 }));
  prop('wooden_crate_01', 14.8, 0, 25.5, { rot: 2.2, solid: 0.45 });
  // mossy rocks along the river, boulders on the hills
  [[14, -22.9], [-16, -22.8], [28, -23.2], [-30, -23.0], [10, -38.2], [-12, -38.6], [25, -39], [-38, -38.4]].forEach(([x, z], i) =>
    prop(i % 2 ? 'rock_moss_set_02' : 'rock_moss_set_01', x, terrain2(x, z) - 0.2, z, { scale: 0.8 + (i % 3) * 0.2, rot: i * 1.7, detail: true }));
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.4, r = 50 + (i % 3) * 8, x = Math.cos(a) * r, z = 5 + Math.sin(a) * r; if (z < -18 && z > -44) continue; prop('boulder_01', x, terrain2(x, z) - 0.3, z, { scale: 1.6 + (i % 3) * 0.5, rot: i }); }
  // shrubs, ferns and grass outside the palisade and along the bank
  for (let i = 0; i < 12; i++) { const a = Math.random() * Math.PI * 2, r = 34 + Math.random() * 14, x = Math.cos(a) * r, z = 5 + Math.sin(a) * r; if (z < -19 && z > -42) continue; prop(i % 3 ? 'shrub_02' : 'shrub_04', x, terrain2(x, z), z, { scale: i % 3 ? 0.9 + Math.random() * 0.5 : 2.5, rot: Math.random() * 6.3, detail: true }); }
  for (let i = 0; i < 18; i++) { const x = (Math.random() - 0.5) * 90, z = -21.2 - Math.random() * 2.6; if (Math.abs(x) < 6) continue; prop('fern_02', x, terrain2(x, z), z, { scale: 0.9 + Math.random() * 0.6, rot: Math.random() * 6.3, detail: true }); }
  for (let i = 0; i < 45; i++) {
    const x = (Math.random() - 0.5) * 100, z = -21 - Math.random() * 3 + (i % 3 === 0 ? 20 + Math.random() * 40 : 0);
    if ((x > -31 && x < 31 && z > -19 && z < 31) || Math.abs(x) < 4) continue;
    prop('grass_medium_02', x, terrain2(x, z), z, { scale: 1.2 + Math.random() * 0.8, rot: Math.random() * 6.3, detail: true });
  }

  // ── People ──
  PEOPLE2.forEach(addNpc); EXTRAS2.forEach(addNpc);
  const lab = npc('labienus');
  mesh(new THREE.SphereGeometry(0.028, 10, 8), MAT.gold, -0.12, 1.33, 0.16, lab.p.body);    // the golden horse brooch
  const piper = npc('piper');
  const pipe = mesh(new THREE.CylinderGeometry(0.008, 0.013, 0.34, 8), MAT.wood, 0, -0.07, 0.24, piper.p.head); pipe.rotation.x = Math.PI / 2 - 0.55;
  mesh(new THREE.DodecahedronGeometry(0.5, 1), MAT.rock, -6.5, 0.1, -21.6).scale.set(1.2, 0.5, 1);
  const soldier = () => ({ tunic: pick([0x8a2a1e, 0x7a2418, 0x96301f]), skin: pick([0xd6a482, 0xb07a58, 0xe0b896, 0x8e5e40]), hair: pick([0x1a120c, 0x3a2414, 0x6a4a2a]), belt: true });
  addWalker([[-7.8, -12], [-7.8, 2.6], [7.8, 2.6], [7.8, -12]], soldier());
  addWalker([[-26, 0.9], [26, 0.9]], soldier());
  addWalker([[25, 22.8], [-25, 22.8]], soldier());
  [[-20.2, 15.2, 2.5], [-21.8, 12.8, 0.4], [20.4, -9, -2.2], [-23.4, -11.0, 0]].forEach(([x, z, f]) => addNpc({ id: 'walker', name: 'A soldier', role: '', at: [x, 0, z], face: f, look: soldier() }));
  for (const n of NPCS) n.p.root.traverse(m => { if (m.material && m.material.envMapIntensity !== undefined && !m.material.metalness) m.material.envMapIntensity = 0.05; });
}
