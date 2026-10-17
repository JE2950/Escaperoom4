"use strict";
// ════════════════════════════════════════════════════════════════
// LEVEL 3: THE IDES OF MARCH, NIGHT OF 14 MARCH 44 BC
// A slave scribe lies dead in the garden of Marcus Brutus. He had
// been copying a list of names. Find his killer, and uncover the plot.
// The house of Brutus stands north of the street; Caesar's house,
// the Domus Publica, stands to the south-east.
// ════════════════════════════════════════════════════════════════
const BRUTUS = { x0: -14, x1: 14, z0: -30, z1: -4 };
function groundY3() { return 0; }
function walkable3(x, z) { return x > -33 && x < 31 && z > -29.6 && z < 5.6; }
function zoneAt3(x, z) {
  if (z < -4 && Math.abs(x) < 14) {
    if (z < -20) return ['The Garden', 'peristylium'];
    if (z < -16 && Math.abs(x) < 4) return ['The Study of Brutus', 'tablinum'];
    return ['The House of Brutus', 'atrium'];
  }
  if (x > 9 && z > 1.5) return ['The House of Caesar', 'domus publica'];
  return ['A Street in Rome', 'via'];
}

const PEOPLE3 = [
  { id: 'lucius', name: 'Lucius', role: 'the house boy', at: [-5.5, 0, -8.5], face: Math.PI / 2,
    look: { tunic: 0x9a8a6a, skin: 0xd8a888, hair: 0x3a2414, belt: true, scale: 0.84 } },
  { id: 'portia', name: 'Portia', role: 'wife of Brutus', at: [-5.6, 0, -24.5], face: Math.PI / 2,
    look: { tunic: 0xe8e0d0, palla: 0x34466a, skin: 0xe4bc9a, hair: 0x1a120c, female: true, eye: '#2a1a10' } },
  { id: 'cassius', name: 'Cassius', role: 'the lean senator', at: [2.4, 0, -17.6], face: -Math.PI / 2,
    look: { tunic: 0xf0ebe0, toga: 0xf4f0e6, border: 0x6a1a5a, skin: 0xcaa080, hair: 0x2a221a, scale: 1.04 } },
  { id: 'casca', name: 'Casca', role: 'tribune of the people', at: [7.5, 0, -11.5], face: -Math.PI / 2,
    look: { tunic: 0xf0ebe0, toga: 0xf4f0e6, skin: 0xc89a78, hair: 0x4a3020, scale: 1.02 } },
  { id: 'calpurnia', name: 'Calpurnia', role: 'wife of Caesar', at: [18, 0, 5.5], face: Math.PI,
    look: { tunic: 0xe0d8c8, palla: 0x6a2a3a, veil: 0x6a2a3a, skin: 0xe8c4a4, hair: 0x2a1a10, female: true } },
];
const EXTRAS3 = [
  { id: 'artemidorus', name: 'Artemidorus', role: 'a Greek teacher', at: [-3.2, 0, 1.6], face: Math.PI,
    look: { tunic: 0xd8ccb0, palla: 0x5a5040, skin: 0xd0a682, hair: 0xb0aca4, beard: '#b0aca4', old: true } },
  { id: 'brutus', name: 'Brutus', role: 'praetor of Rome', at: [-2.2, 0, -18.6], face: Math.PI,
    look: { tunic: 0xf0ebe0, toga: 0xf4f0e6, border: 0x6a1a5a, skin: 0xd8b090, hair: 0x2a221a } },
];
const SUSPECTS3 = ['lucius', 'portia', 'cassius', 'casca', 'calpurnia'];
const D3 = {
  lucius: {
    greet: 'Oh! I thought you were the master. Please, do not go into the garden. Felix is lying there under a cloak.',
    again: 'Oh! I thought you were... You were here last night. Weren’t you? But last night is tonight.',
    who: 'Lucius. I carry the lamps and pour the wine for master Brutus. Felix taught me my letters. He was kind to me.',
    extra: [
      { label: 'What happened to Felix?', text: 'Someone stabbed him in the garden, in the second watch. He was the master’s scribe. He wrote faster than anyone in Rome.' },
      { label: 'Who is in the house tonight?', text: 'The master and the mistress. And two senators who came after dark with their hoods up: Cassius and Casca. They have been whispering in the study for hours.' },
    ],
    intros: ['Felix was teaching me this sentence. Can you help me finish it?', 'The cook left a message on her tablet. I cannot read her writing.', 'Felix left this on his desk. Help me read it. Please.'],
    thanks: ['Thank you! Felix would have been proud of me.', 'Ha. She wants more olives. Thank you.', 'He wrote it for me. I did not know.'],
    clue: 'Felix told me a secret this evening. “Tonight I buy my freedom, Lucius,” he said. “A man in the street pays gold for names.” He went to the garden in the second watch with his wax tablet. A little later, master Casca left the study to “get some air”.',
    clueShort: 'Lucius: Felix planned to sell a list of names for gold. In the second watch he went to the garden, and soon after, Casca left the study to “get some air”.',
  },
  portia: {
    greet: 'Who let you in? This is a house of mourning tonight. Speak quietly.',
    again: 'Who let you... No. I know your face. I have seen it in a dream, perhaps.',
    who: 'Porcia, daughter of Cato, wife of Marcus Brutus. My husband has not slept for days. He thinks I do not notice.',
    extra: [
      { label: 'There is blood on your dress.', text: 'Yes. I cut my own leg with a knife, three days ago, to prove to my husband that I can bear pain and keep a secret. He has not told me his secret yet. That blood is mine, stranger, not Felix’s.' },
    ],
    intros: ['Read this to me. My eyes are tired, and my heart more so.', 'My father Cato loved this line. I have half forgotten it.', 'A letter came for my husband. It is not sealed. Help me read it.'],
    thanks: ['Thank you. You read well.', 'Yes. That is how he said it.', 'Hm. Read nothing else that comes for him.'],
    clue: 'In the second watch I heard a cry from the garden. I went to the colonnade and saw a man in a toga climb over the garden wall. He held his right hand against his chest, wrapped in a cloth. I did not see his face.',
    clueShort: 'Portia: after the cry in the second watch, a man in a toga climbed over the garden wall, holding his right hand wrapped in a cloth.',
  },
  cassius: {
    greet: 'A stranger, tonight of all nights. You have a hungry look, friend. So do I, they tell me.',
    again: 'A stranger, tonight of... I have met you before. I never forget a face, and I never trust one.',
    who: 'Gaius Cassius Longinus, praetor. Caesar says I have a lean and hungry look, and think too much. He is right.',
    extra: [
      { label: 'Why are you here so late?', text: 'Brutus and I are old friends. Friends talk late. About books. About Rome. About tomorrow.' },
      { label: 'What happens tomorrow?', text: 'Tomorrow is the Ides of March. The Senate meets in the hall of Pompey. Caesar will be there. Everyone who matters will be there.' },
    ],
    intros: ['I have written a line for a speech. Check it for me.', 'A note was pushed under the door. Help me read it.', 'This old saying keeps running in my head. Help me get it right.'],
    thanks: ['Good. You have a sharp mind.', 'Hm. Not the note I hoped for. Thank you.', 'Yes. Exactly so.'],
    clue: 'Very well. Casca came back to the study late, out of breath, with his hand wrapped in a napkin. He said he cut it on a broken jar. And I saw his belt: the sheath of his dagger was empty. Tomorrow, in the hall of Pompey, every one of us must have a dagger. You understand me, stranger?',
    clueShort: 'Cassius: Casca came back late and out of breath, with his hand wrapped, and his dagger sheath was empty. The plotters mean to use their daggers on Caesar tomorrow, in the hall of Pompey.',
  },
  casca: {
    greet: 'What are you staring at? Never seen a tribune before? Go and stare at someone else.',
    again: 'What are you staring at? ...Have we met? I feel I have told you to go away before.',
    who: 'Publius Servilius Casca, tribune of the people. I speak plainly and I act quickly. That is all you need to know.',
    extra: [
      { label: 'What happened to your hand?', text: 'I cut it on a broken wine jar. Clumsy. Nothing more. Why does everyone keep asking?' },
      { label: 'Where were you in the second watch?', text: 'Here. In the study. Talking about books. Ask Cassius. No, don’t ask Cassius. Ask Brutus.' },
    ],
    intros: ['You look clever. Read this for me.', 'Somebody left this on the wall of my house. What does it say?', 'Check this sentence. I want to say it in the Senate.'],
    thanks: ['Fine. Now leave me alone.', 'Hm. I don’t like the sound of that.', 'Good. They will remember it.'],
    clueLabel: 'Show me your hand.', narrate: true,
    locked: 'My hand is my business. Make yourself useful, and perhaps I will answer your questions.',
    clue: 'Casca pulls his right hand away, but too late. The cloth around it is soaked red, and the cut runs across the palm, as if he grabbed a blade. A broken corner of a wax tablet slips from his toga. Scratched on it, in Felix’s neat hand: <em>nomina coniuratorum</em>, the names of the plotters.',
    clueShort: 'Casca has a deep cut across his palm, as if he grabbed a blade, and he hides a broken corner of Felix’s tablet: “nomina coniuratorum”.',
  },
  calpurnia: {
    greet: 'You should not be in the street at this hour. Nobody should. The gods are restless tonight.',
    again: 'You should not be... You again. You were in my dream.',
    who: 'Calpurnia, wife of Gaius Julius Caesar. Tonight I dreamed the roof of our house fell, and I held my husband dead in my arms.',
    extra: [
      { label: 'Tell me about your dream.', text: 'Blood, and a toga full of holes, and my husband in my arms. I will beg him not to go to the Senate tomorrow. He laughs at dreams. He laughs at everything except his enemies.' },
    ],
    intros: ['A soothsayer gave my husband this warning. Help me read it.', 'I wrote a prayer to Juno. Is it right?', 'The words above our door are worn. Help me read them.'],
    thanks: ['Thank you. I will show him.', 'May Juno hear it.', 'Yes. I will have them painted again.'],
    clue: 'I could not sleep. In the third watch I watched a man in a toga come out of the street from Brutus’s house and wash his hand in our fountain. The water ran dark. He threw something into the basin. It flashed like a blade.',
    clueShort: 'Calpurnia: in the third watch a man in a toga came from the house of Brutus, washed his hand in her fountain, and threw something like a blade into the basin.',
  },
  artemidorus: {
    greet: 'You! Yes, you. You are no Roman, I can see that. Neither am I. Help me, stranger. A man has been murdered in that house.',
    again: 'You! Yes, you. You are... Strange. I feel I have asked you for help before.',
    who: 'Artemidorus of Cnidus. I teach Greek to the sons of senators, and the sons of senators talk. I have heard things, stranger. Terrible things about tomorrow.',
    extra: [
      { label: 'Who was Felix?', text: 'The scribe of Brutus. He was copying a list for me, the names of men who plan to kill Caesar tomorrow. Tonight someone killed him first. Find the killer, and we find the list.' },
      { label: 'What will you do with the names?', text: 'Write them on a scroll and put it in Caesar’s own hand before he reaches the Senate. But I need proof. Bring me the killer, with three witnesses.' },
    ],
  },
  brutus: {
    greet: 'Forgive me. I am poor company tonight. A slave of mine is dead, and my mind is full of other things.',
    again: 'Forgive me. I am... You. Every night you come. Or is it the same night?',
    who: 'Marcus Junius Brutus, praetor of Rome. My ancestor drove the last king out of this city. People say I should do the same. They leave notes on my chair.',
    extra: [
      { label: 'Do you love Caesar?', text: 'I love Caesar. I love Rome more. A man can love two things, stranger, and still have to choose.' },
      { label: 'Who killed Felix?', text: 'I do not know. I swear it by the gods. If one of my guests did this, he has stained something that should have been clean.' },
    ],
  },
};
const AMBIENT3 = ['Not now. The master is not to be disturbed.', 'Did you hear? Poor Felix. In the garden.', 'Go home, stranger. Rome is dangerous at night.', 'Tomorrow is the Ides. My mother says it is an unlucky day.'];

// ── Helpers for this level ──
function wallBox(x0, z0, x1, z1, h, mat) {
  const w = Math.abs(x1 - x0), d = Math.abs(z1 - z0);
  mesh(boxGeo(w, h, d, 2.5), mat, (x0 + x1) / 2, h / 2, (z0 + z1) / 2);
  mesh(boxGeo(w + 0.03, 0.95, d + 0.03, 1.5), MAT.dado, (x0 + x1) / 2, 0.475, (z0 + z1) / 2);
  solid(x0, z0, x1, z1);
}
function cypress(x, z, s) {
  mesh(new THREE.CylinderGeometry(0.08 * s, 0.12 * s, 1.2 * s, 6), MAT.bark, x, 0.6 * s, z);
  const c = mesh(new THREE.ConeGeometry(0.75 * s, 5 * s, 9), MAT.leaf, x, 3.3 * s, z); c.scale.x = 0.85;
  solid(x - 0.3, z - 0.3, x + 0.3, z + 0.3);
}
function signTex(lines, w, h) { return std({ map: inscription(lines, w, h, C.plCream, 'rgba(120,25,15,.95)'), roughness: 0.9 }); }

function buildIdes() {
  if (!MAT.leaf) nightTextures();
  // ── Sky, stars and moon (as at the Rubicon, but a city night) ──
  const sky = new THREE.Mesh(new THREE.SphereGeometry(330, 32, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(C.sky), side: THREE.BackSide, fog: false, depthWrite: false }));
  sky.material.map.colorSpace = THREE.SRGBColorSpace; WORLD.add(sky);
  const sn = 1400, sp = new Float32Array(sn * 3);
  for (let i = 0; i < sn; i++) { const a = Math.random() * Math.PI * 2, e = Math.asin(0.08 + Math.random() * 0.92); sp[i * 3] = Math.cos(a) * Math.cos(e) * 300; sp[i * 3 + 1] = Math.sin(e) * 300; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 300; }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  WORLD.add(new THREE.Points(sg, new THREE.PointsMaterial({ size: 1.5, sizeAttenuation: false, color: 0xdfe6ff, fog: false, transparent: true, opacity: 0.8, depthWrite: false })));
  const moonDir = new THREE.Vector3(0.5, 0.66, -0.56).normalize();
  const mn = new THREE.Mesh(new THREE.CircleGeometry(8, 32), new THREE.MeshBasicMaterial({ color: 0xf2f0e6, fog: false }));
  mn.position.copy(moonDir).multiplyScalar(290); mn.lookAt(0, 0, 0); WORLD.add(mn);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0x9fb2e0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, opacity: 0.55 }));
  halo.position.copy(mn.position); halo.scale.set(80, 80, 1); WORLD.add(halo);
  WORLD.add(new THREE.HemisphereLight(0x4a5a84, 0x140e0a, 0.8));
  WORLD.add(new THREE.AmbientLight(0x243048, 0.55));
  const ml = new THREE.DirectionalLight(0xb0c2ff, 0.9);
  ml.position.copy(moonDir).multiplyScalar(70).add(new THREE.Vector3(0, 0, -10)); ml.target.position.set(0, 0, -10);
  ml.castShadow = true; ml.shadow.mapSize.set(2048, 2048); const sc = ml.shadow.camera; sc.left = -40; sc.right = 40; sc.top = 40; sc.bottom = -40; sc.near = 10; sc.far = 180;
  ml.shadow.bias = -0.0005; ml.shadow.normalBias = 0.05; WORLD.add(ml, ml.target);

  // ── Ground: the street is paved; the garden is grass ──
  mesh(planeGeo(120, 90, 3.2), MAT.pave, 0, 0, -10).castShadow = false;
  mesh(planeGeo(26, 9.6, 4), MAT.grass, 0, 0.02, -25);
  mesh(planeGeo(27.6, 11.6, 2), MAT.marble, 0, 0.015, -10);

  // ── The house of Brutus ──
  const W = MAT.red, Wc = MAT.cream;
  wallBox(-14.2, -4.2, -1.4, -3.8, 6, W); wallBox(1.4, -4.2, 14.2, -3.8, 6, W);   // front, with the door gap
  mesh(boxGeo(2.8, 1.4, 0.4, 1.5), W, 0, 5.3, -4);                                  // above the door
  mesh(boxGeo(3.2, 0.25, 0.6, 1), MAT.marble, 0, 4.55, -3.9);
  wallBox(-14.2, -30.2, 14.2, -29.8, 6, Wc);                                         // back of the garden
  wallBox(-14.2, -30, -13.8, -4, 6, W); wallBox(13.8, -30, 14.2, -4, 6, W);          // sides
  wallBox(-14, -16.2, -4.2, -15.8, 6, W); wallBox(4.2, -16.2, 14, -15.8, 6, W);      // atrium back wall
  wallBox(-14, -20.2, -4.2, -19.8, 6, Wc); wallBox(4.2, -20.2, 14, -19.8, 6, Wc);    // garden front wall
  wallBox(-4.4, -20, -4, -16, 6, W); wallBox(4, -20, 4.4, -16, 6, W);               // the study (tablinum)
  for (const [x0, x1, z0, z1] of [[-14, 14, -16, -14], [-14, 14, -6, -4], [-14, -4, -14, -6], [4, 14, -14, -6], [-4.4, 4.4, -20, -16]])
    mesh(boxGeo(x1 - x0, 0.3, z1 - z0, 2), MAT.roof, (x0 + x1) / 2, 6.1, (z0 + z1) / 2);   // atrium roof round the opening
  // the pool under the opening, and its columns
  mesh(boxGeo(5.2, 0.25, 4.2, 1), MAT.marble, 0, 0.12, -10); solid(-2.6, -12.1, 2.6, -7.9, 0.25);
  mesh(planeGeo(4.6, 3.6, 2), MAT.water, 0, 0.26, -10, WORLD, true);
  [[-4, -14], [4, -14], [-4, -6], [4, -6]].forEach(([x, z]) => column(x, 0, z, 6, 0.3));
  // the lararium (household shrine) and benches
  mesh(boxGeo(1.6, 2.2, 0.5, 1), MAT.marble, -12.8, 1.1, -12); solid(-13.6, -12.25, -12, -11.75);
  makeFire(-12.8, 2.25, -11.8, 0.18, 8, 8);
  // braziers in the atrium
  for (const x of [-8.5, 8.5]) { mesh(new THREE.CylinderGeometry(0.4, 0.2, 0.3, 14), MAT.bronze, x, 1.05, -5.6); mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), MAT.bronze, x, 0.45, -5.6); solid(x - 0.4, -6, x + 0.4, -5.2); makeFire(x, 1.2, -5.6, 0.45, 18, 14); }
  // the study: Brutus's chair, his desk, and the notes left on the chair
  mesh(boxGeo(1, 0.08, 0.8, 1), MAT.marble, -2.2, 0.75, -19.3); for (const [a, b] of [[-0.4, -0.3], [0.4, -0.3], [-0.4, 0.3], [0.4, 0.3]]) mesh(boxGeo(0.05, 0.72, 0.05, 1), MAT.marble, -2.2 + a, 0.37, -19.3 + b);
  const notes = mesh(boxGeo(0.34, 0.03, 0.26, 1), std({ map: inscription(['BRVTE', 'DORMIS?'], 0.34, 0.26, C.plCream, 'rgba(40,30,20,.95)'), roughness: 0.9 }), -2.1, 0.81, -19.3);
  readable(notes, { title: 'Notes left on Brutus’s chair', lat: 'Brute, dormis? Non es verus Brutus.', en: 'Brutus, are you asleep? You are not the true Brutus.',
    about: 'The historian Plutarch says people left notes like these on Brutus’s chair in the weeks before the Ides of March. They wanted him to act like his ancestor, who had driven the last king out of Rome.' });
  solid(-2.8, -19.8, -1.6, -18.8, 0.85);
  prop('wooden_table_02', 2.2, 0, -19.1, { rot: Math.PI / 2, solid: 0.6 });
  makeFire(2.4, 0.86, -19.1, 0.14, 10, 9);
  prop('jug_01', 1.95, 0.8, -18.8, { rot: 1 });
  // the garden: colonnade, fountain, cypresses, and Felix under his cloak
  for (let x = -12; x <= 12; x += 4) { column(x, 0, -21.4, 4.4, 0.24); column(x, 0, -28.6, 4.4, 0.24); }
  mesh(boxGeo(27.6, 0.3, 1.6, 2), MAT.roof, 0, 4.55, -21); mesh(boxGeo(27.6, 0.3, 1.6, 2), MAT.roof, 0, 4.55, -29);
  mesh(new THREE.CylinderGeometry(1.4, 1.5, 0.5, 30), MAT.marble, 0, 0.25, -25); solid(-1.5, -26.5, 1.5, -23.5, 0.5);
  mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.05, 30), MAT.water, 0, 0.44, -25, WORLD, true);
  mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.2, 12), MAT.marble, 0, 0.8, -25);
  [[-10, -24], [-10, -26.5], [10, -24], [10, -26.5]].forEach(([x, z]) => cypress(x, z, 0.9));
  [[-7, -27.8], [-3.5, -22.2], [4, -27.9]].forEach(([x, z], i) => prop('shrub_02', x, 0, z, { scale: 0.7, rot: i * 2, detail: true }));
  const cloak = std({ map: TEX.cloth, color: 0x6a2a20, roughness: 0.95 });
  const body = mesh(new THREE.CapsuleGeometry(0.28, 1.3, 6, 14), cloak, 7, 0.22, -26.6); body.rotation.z = Math.PI / 2; body.scale.set(1, 1, 0.6); solid(6, -26.9, 8, -26.3, 0.4);
  mesh(new THREE.SphereGeometry(0.12, 10, 8), MAT.leather, 7.95, 0.08, -26.45);
  const tab = mesh(boxGeo(0.3, 0.025, 0.22, 1), std({ map: inscription(['NOMINA', '· · · · ·'], 0.3, 0.22, C.wood, 'rgba(230,210,160,.9)'), roughness: 0.9 }), 6.1, 0.03, -25.9);
  tab.rotation.y = 0.4;
  readable(tab, { title: 'Felix’s wax tablet', lat: 'Nomina... [the rest is scraped away]', en: 'The names of... [the rest is scraped away]',
    about: 'Felix was copying a list of names. Someone scraped the wax clean with the point of a blade, and broke off one corner. Whoever has that corner knows who killed him.' });
  makeFire(-12.6, 0.15, -27.6, 0.3, 12, 12); makeFire(12.6, 0.15, -27.6, 0.3, 10, 12);
  // the oil lamp Felix dropped, still burning beside him
  mesh(new THREE.SphereGeometry(0.09, 12, 8), MAT.bronze, 6.6, 0.06, -25.5).scale.set(1.4, 0.55, 1);
  makeFire(6.6, 0.1, -25.5, 0.12, 14, 9);

  // ── The street ──
  torch(-2.3, -3.3, 18); torch(2.3, -3.3, 0);
  // the statue of Lucius Junius Brutus, who drove out the last king
  mesh(boxGeo(1.3, 1.5, 1.3, 1), MAT.marble, -9, 0.75, 3); solid(-9.65, 2.35, -8.35, 3.65, 1.5);
  const st = makePerson({ metal: MAT.bronze, toga: 1, tunic: 1, hair: 1, beard: 1, scale: 1.2 }); st.root.position.set(-9, 1.5, 3); st.root.rotation.y = Math.PI;
  st.arms[0].sh.rotation.x = -1.2; WORLD.add(st.root);
  const pl = mesh(boxGeo(1.0, 0.5, 0.04, 1), std({ map: inscription(['L · IVNIVS · BRVTVS', 'VTINAM · VIVERES'], 1, 0.5, C.marble, 'rgba(90,30,20,.92)'), roughness: 0.5 }), -9, 0.95, 2.33);
  pl.rotation.y = Math.PI;
  readable(pl, { title: 'Scratched on the statue', lat: 'L. Iunius Brutus. Utinam viveres!', en: 'Lucius Junius Brutus. If only you were alive!',
    about: 'Lucius Junius Brutus drove the last king, Tarquin the Proud, out of Rome in 509 BC. Suetonius says someone scratched “utinam viveres” on his statue in 44 BC, to shame his descendant Marcus Brutus into acting against Caesar.' });
  // the fountain in front of Caesar's house
  mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.6, 28), MAT.marble, 13.2, 0.3, 1.2); solid(11.95, -0.05, 14.45, 2.45, 0.6);
  mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.05, 28), MAT.water, 13.2, 0.55, 1.2, WORLD, true);
  mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.4, 12), MAT.marble, 13.2, 1, 1.2);

  // ── The house of Caesar (the Domus Publica), with a portico ──
  house(18, 14.6, 16, 14, 6, MAT.cream, 'n');
  for (const x of [11.5, 14.5, 21.5, 24.5]) column(x, 0, 6.3, 5, 0.3);
  mesh(boxGeo(16, 0.4, 1.8, 2), MAT.marble, 18, 5.2, 6.8);
  torch(16.4, 6.6, 16); torch(19.6, 6.6, 0);
  const sign = mesh(new THREE.PlaneGeometry(2.6, 0.7), signTex(['C · IVLIVS · CAESAR', 'DICT · PERPETVO · PONT · MAX'], 2.6, 0.7), 18, 3.4, 7.56);
  sign.rotation.y = Math.PI;
  readable(sign, { title: 'Above Caesar’s door', lat: 'C. Iulius Caesar, dict(ator) perpetuo, pont(ifex) max(imus).', en: 'Gaius Julius Caesar, dictator for life, chief priest.',
    about: 'In February 44 BC Caesar was made dictator for life. As chief priest of Rome he lived in the Domus Publica, beside the Sacred Way. A month later he was dead.' });

  // ── Neighbouring houses close off the street ──
  [[-25, -12, 14, 15, 6, MAT.ochre, 's'], [24, -12, 14, 15, 6, MAT.grey, 's'], [-24, 12, 14, 12, 5.5, MAT.grey, 'n'], [-6, 12.5, 12, 13, 6, MAT.ochre, 'n'],
   [-37, 0, 6, 26, 7, MAT.red, 'e'], [34, -2, 6, 22, 7, MAT.red, 'w'], [29, 12, 8, 12, 5, MAT.ochre, 'n']].forEach(h => house(...h));
  prop('wine_barrel_01', -18.4, 0, -3.9, { solid: 0.4 }); prop('wooden_crate_02', -20, 0, -4.2, { rot: 0.2, solid: 0.6 });
  prop('antique_ceramic_vase_01', 6.4, 0, 4.5, { scale: 2, solid: 0.3 });
  prop('wooden_bucket_01', 11.4, 0, 2.7, { rot: 1, solid: 0.25 });

  // ── People ──
  PEOPLE3.forEach(addNpc); EXTRAS3.forEach(addNpc);
  const ca = npc('casca');
  const bandage = mesh(new THREE.SphereGeometry(0.06, 10, 8), std({ map: TEX.cloth, color: 0xe2d6c0, roughness: 0.95 }), 0, 0, 0.005, ca.p.arms[0].hand);
  bandage.scale.set(0.85, 1.05, 0.7);
  mesh(new THREE.SphereGeometry(0.03, 8, 6), std({ color: 0x7a1410, roughness: 0.8 }), 0.012, -0.012, 0.035, ca.p.arms[0].hand);
  const slave = () => ({ tunic: pick([0x8a7a5a, 0x6a5a4a, 0x7a6a52]), skin: pick([0xd6a482, 0xb07a58, 0xe0b896, 0x8e5e40]), hair: pick([0x1a120c, 0x3a2414]), belt: true });
  addWalker([[-11.2, -7], [-11.2, -14.6], [-6.5, -14.6], [-6.5, -7]], slave());
  addWalker([[-28, 0.5], [26, 0.5]], slave());
  for (const n of NPCS) n.p.root.traverse(m => { if (m.material && m.material.envMapIntensity !== undefined && !m.material.metalness) m.material.envMapIntensity = 0.05; });
}
