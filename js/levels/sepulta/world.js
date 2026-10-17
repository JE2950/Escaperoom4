"use strict";
// ════════════════════════════════════════════════════════════════
// BUILD THE BURIED CITY
// ════════════════════════════════════════════════════════════════
let READ = [];        // readable meshes
const anim = { water: null, lava: null, dust: null, statueShine: [] };
let templeFire = null, shaftMesh = null;
function readable(m, note) { m.userData.read = note; READ.push(m); }

function buildWorld() {
  // ── Cavern ──
  const cave = new THREE.SphereGeometry(100, 96, 48);
  const p = cave.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = Math.sin(v.x * 0.08) * Math.cos(v.z * 0.07) + Math.sin(v.y * 0.13 + v.x * 0.05) * 0.8 + Math.cos(v.z * 0.19 - v.y * 0.11) * 0.5;
    v.multiplyScalar(1 + n * 0.05 + (Math.random() - 0.5) * 0.012); p.setXYZ(i, v.x, v.y, v.z);
  }
  cave.computeVertexNormals();
  const cm = mesh(cave, MAT.rock, 0, -6, -10, WORLD, true); cm.scale.set(1, 0.55, 0.92); cm.material = MAT.rock.clone(); cm.material.side = THREE.BackSide; cm.material.map = cm.material.map.clone(); cm.material.map.repeat.set(10, 5); cm.material.bumpMap = cm.material.map; cm.receiveShadow = true;

  // ── Ground ──
  const gg = planeGeo(220, 220, 4, quality === 'high' ? 160 : 90, quality === 'high' ? 160 : 90), gp = gg.attributes.position;
  for (let i = 0; i < gp.count; i++) gp.setY(i, terrain(gp.getX(i), gp.getZ(i)));
  gg.computeVertexNormals();
  const gm = mesh(gg, MAT.ground, 0, 0, -10); gm.castShadow = false;
  // the ground mesh is centred at z = -10, so shift its vertices back
  for (let i = 0; i < gp.count; i++) gp.setY(i, terrain(gp.getX(i), gp.getZ(i) - 10));
  gg.computeVertexNormals(); gp.needsUpdate = true;

  // Stalactites and boulders
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 80, x = Math.cos(a) * r, z = -10 + Math.sin(a) * r * 0.92;
    const e = 1 - (x * x + ((z + 10) / 0.92) ** 2) / 10000; if (e <= 0.05) continue;
    const yTop = -6 + 55 * Math.sqrt(e) - 1, h = 3 + Math.random() * 9;
    const s = mesh(new THREE.ConeGeometry(0.6 + Math.random() * 1.6, h, 7), MAT.rock, x, yTop - h / 2 + 1, z, WORLD, true); s.rotation.x = Math.PI;
  }
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * Math.PI * 2, r = 58 + Math.random() * 26, x = Math.cos(a) * r / 0.9, z = -10 + Math.sin(a) * r;
    if (Math.abs(z - RIVER_Z) < 9 || Math.abs(z - LAVA_Z) < 8) continue;
    const sz = 1.5 + Math.random() * 5;
    const b = mesh(new THREE.DodecahedronGeometry(sz, 1), MAT.rock, x, terrain(x, z) + sz * 0.3, z); b.scale.set(1, 0.6 + Math.random() * 0.8, 1); b.rotation.set(Math.random(), Math.random(), Math.random());
  }

  // ── The river and the jetty ──
  const water = mesh(planeGeo(240, 16, 8), MAT.water, 0, -0.7, RIVER_Z, WORLD, true); water.receiveShadow = true; anim.water = water;
  mesh(boxGeo(6, 0.3, 10.5, 1.5), MAT.wood, -30, 0.1, 41.75);
  for (const zz of [37.5, 41, 44.5, 46.8]) for (const xx of [-32.8, -27.2]) mesh(new THREE.CylinderGeometry(0.16, 0.18, 2.4, 8), MAT.wood, xx, -0.6, zz);
  const hull = new THREE.CylinderGeometry(1.25, 1.25, 7, 18, 1, true, Math.PI / 2, Math.PI); hull.rotateX(Math.PI / 2);
  const boat = mesh(hull, std({ map: texFrom(C.wood), side: THREE.DoubleSide, roughness: 0.85 }), -35.2, -0.15, 42.5); boat.scale.y = 0.55;
  mesh(boxGeo(2.3, 0.08, 0.35, 1), MAT.wood, -35.2, -0.25, 41.3); mesh(boxGeo(2.3, 0.08, 0.35, 1), MAT.wood, -35.2, -0.25, 43.8);
  const oar = mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.4, 6), MAT.wood, -34.2, 0.1, 43); oar.rotation.z = 1.2;
  mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 6), MAT.wood, -28.2, 0.95, 39.8);
  const lantern = mesh(boxGeo(0.22, 0.3, 0.22, 1), MAT.ember, -28.2, 1.8, 39.8, WORLD, true); lantern.material = std({ color: 0x331a06, emissive: 0xffaa44, emissiveIntensity: 2 });
  addLightSource(-28.2, 1.9, 39.8, 0xffaa55, 14, 16, 1.5);
  // tombstone
  const stone = mesh(boxGeo(0.9, 1.4, 0.22, 1), MAT.marble, -24.5, 0.7, 35.4); stone.rotation.y = -0.25;
  stone.material = std({ map: inscription(['D · M', 'GAIVS', 'NAVTA', 'VIX · ANN · CCXX'], 0.9, 1.4, C.marble, 'rgba(70,40,25,.92)'), roughness: 0.5 });
  readable(stone, { title: 'A gravestone', lat: 'D(is) M(anibus). Gaius, nauta. vix(it) ann(os) CCXX.', en: 'To the spirits of the dead. Gaius, boatman. He lived 220 years.',
    about: 'Romans began gravestones with D M, short for Dis Manibus, “to the spirits of the dead”. A boatman called Gaius who lived for 220 years? Strange. The old man on the jetty is called Gaius too.' });
  solid(-25, 35.2, -24, 35.6);

  // ── Paving ──
  mesh(planeGeo(32, 24, 3.2), MAT.pave, 0, 0.03, 0);
  mesh(planeGeo(6, 19, 3.2), MAT.pave, 0, 0.03, -21.5);
  const path = mesh(planeGeo(5, 31, 3.2), MAT.pave, -21, 0.03, 24.5); path.rotation.y = Math.atan2(-18, 24.5);
  mesh(planeGeo(12, 7, 3.2), MAT.pave, 22, 0.035, 15);

  // ── Forum ──
  const basin = mesh(new THREE.CylinderGeometry(2.3, 2.4, 0.6, 40), MAT.marble, 0, 0.3, 0);
  mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.05, 40), MAT.water, 0, 0.52, 0, WORLD, true);
  mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.5, 16), MAT.marble, 0, 0.9, 0);
  mesh(new THREE.CylinderGeometry(0.7, 0.25, 0.3, 20), MAT.marble, 0, 1.7, 0);
  solid(-2.4, -2.4, 2.4, 2.4, 0.6); void basin;
  for (let z = -10; z <= 10; z += 4) column(14.5, 0, z, 6, 0.36);
  mesh(boxGeo(1, 0.7, 21.5, 2), MAT.marble, 14.5, 6.3, 0);
  for (let x = -10; x <= 10; x += 4) column(x, 0, 10.5, 6, 0.36);
  mesh(boxGeo(21.5, 0.7, 1, 2), MAT.marble, 0, 6.3, 10.5);
  // basilica on the west side, with the magistrate's tribunal
  const bas = house(-22.5, 0, 9, 26, 9, MAT.cream, null, null); void bas;
  for (const z of [-10, -6.5, 6.5, 10]) column(-16.8, 0, z, 8, 0.42);
  mesh(boxGeo(1.2, 0.8, 24, 2), MAT.marble, -16.8, 8.4, 0);
  mesh(boxGeo(4, 1.4, 8, 2), MAT.marble, -14.5, 0.7, 0); solid(TRIB.x0, TRIB.z0, TRIB.x1, TRIB.z1, TRIB.top);
  mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.5, 16), MAT.marble, -15.6, 1.65, -1.6);
  // the golden statue
  mesh(boxGeo(1.5, 1.7, 2.2, 1), MAT.marble, 8, 0.85, -6); solid(7.25, -7.1, 8.75, -4.9);
  const statue = makePerson({ metal: MAT.gold, toga: 1, tunic: 1, hair: 1, scale: 1.25 }); statue.root.position.set(8, 1.7, -6); statue.root.rotation.y = -0.6;
  statue.arms[1].sh.rotation.x = -1.6; statue.arms[1].elbow.rotation.x = -0.3; WORLD.add(statue.root);
  const plq = mesh(boxGeo(1.2, 0.6, 0.04, 1), MAT.marble, 8, 0.95, -4.88);
  plq.material = std({ map: inscription(['VVLCANO', 'SERVATORI'], 1.2, 0.6, C.marble, 'rgba(80,40,20,.92)'), roughness: 0.5 });
  readable(plq, { title: 'On the statue’s base', lat: 'Vulcano servatori.', en: 'To Vulcan the saviour.',
    about: 'The golden statue shows the first magistrate of the buried city. The people set it up to thank Vulcan for keeping them alive under the mountain.' });

  // ── The bakery (south), Fabia's shop ──
  house(-6, 22, 9, 7, 4.3, MAT.ochre, null, 'n');
  const oven = mesh(new THREE.SphereGeometry(1.6, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), MAT.rock, -7.5, 0, 24); oven.scale.y = 0.85; solid(-9.1, 22.4, -5.9, 25.6);
  mesh(boxGeo(0.9, 0.7, 0.3, 1), MAT.ember, -7.5, 0.5, 22.45, WORLD, true);
  makeFire(-7.5, 0.25, 22.6, 0.45, 22, 14);
  mesh(boxGeo(3.4, 1, 0.8, 1), MAT.wood, -2.6, 0.5, 20.6); solid(-4.3, 20.2, -0.9, 21);
  for (let i = 0; i < 6; i++) { const b = mesh(new THREE.SphereGeometry(0.17, 12, 8), MAT.bread, -3.9 + i * 0.5, 1.07, 20.6); b.scale.y = 0.55; }
  const sign = mesh(boxGeo(0.05, 0.9, 2.6, 1), MAT.ochre, -1.45, 2.6, 22);
  sign.material = std({ map: inscription(['FABIA PANEM', 'OPTIMVM FACIT'], 2.6, 0.9, C.plOchre, 'rgba(130,25,15,.95)'), roughness: 0.9 });
  readable(sign, { title: 'Painted on the bakery wall', lat: 'Fabia panem optimum facit.', en: 'Fabia makes the best bread.',
    about: 'Shopkeepers in Pompeii painted adverts like this on their walls, in red letters. You can still read many of them today.' });

  // ── The smithy (east), Marcus's forge ──
  house(22, 2, 7, 9, 4.3, MAT.grey, null, 'w');
  mesh(boxGeo(1.8, 1, 1.8, 1), MAT.rock, 23.8, 0.5, 0); solid(22.9, -0.9, 24.7, 0.9);
  mesh(boxGeo(1.5, 0.12, 1.5, 1), MAT.ember, 23.8, 1.02, 0, WORLD, true);
  makeFire(23.8, 1.05, 0, 0.5, 26, 16);
  mesh(boxGeo(0.35, 0.6, 0.8, 1), MAT.wood, 21.2, 0.3, 3.2); mesh(boxGeo(0.4, 0.18, 0.9, 1), MAT.iron, 21.2, 0.69, 3.2); solid(20.9, 2.7, 21.5, 3.7);
  for (let i = 0; i < 4; i++) { const tl = mesh(boxGeo(0.06, 0.7, 0.06, 1), MAT.iron, 25.2, 2.1, -2.2 + i * 0.5); tl.rotation.z = 0.1; }

  // ── Houses ──
  [[12, -20, 8, 8, 4.6, MAT.cream, 'w'], [26, -14, 9, 8, 5, MAT.red, 'w'], [28, -28, 10, 9, 5.2, MAT.ochre, 'w'], [-12, -22, 9, 8, 4.6, MAT.ochre, 'e'],
   [-28, -24, 9, 9, 5, MAT.grey, 'e'], [30, 12, 8, 8, 4.5, MAT.cream, 'w'], [24, 22, 9, 7, 4.2, MAT.red, 'n'], [8, 24, 9, 7, 4.5, MAT.cream, 'n'],
   [24, 31, 8, 6, 4, MAT.grey, 'n'], [-34, -6, 8, 9, 4.5, MAT.red, 'e'], [-38, 8, 8, 8, 4.2, MAT.ochre, 'e'], [-30, 16, 8, 8, 4.4, MAT.cream, 'e'],
   [16, -34, 8, 8, 4.8, MAT.red, 'w'], [-16, -34, 8, 8, 4.8, MAT.cream, 'e'], [38, -2, 8, 10, 4.6, MAT.ochre, 'w'], [-42, 22, 9, 8, 4.2, MAT.grey, 'e']
  ].forEach(h => house(...h));

  // ── The temple of Vulcan ──
  mesh(boxGeo(18, 3, 22, 2.5), MAT.marble, 0, 1.5, -49);
  solid(-9, -60, 9, -38, 3);
  for (let i = 0; i < 7; i++) mesh(boxGeo(10, (i + 1) * 3 / 7, 1, 2), MAT.marble, 0, (i + 1) * 3 / 14, -31.5 - i);
  for (let x = -7.5; x <= 7.5; x += 3) column(x, 3, -40, 7, 0.5);
  for (let z = -43; z >= -58; z -= 3) { column(-7.5, 3, z, 7, 0.5); column(7.5, 3, z, 7, 0.5); }
  // the cella, with a doorway at the front
  mesh(boxGeo(11, 7, 0.6, 2.5), MAT.cream, 0, 6.5, -57.7);
  mesh(boxGeo(0.6, 7, 12, 2.5), MAT.cream, -5.5, 6.5, -51.5); mesh(boxGeo(0.6, 7, 12, 2.5), MAT.cream, 5.5, 6.5, -51.5);
  mesh(boxGeo(4.3, 7, 0.6, 2.5), MAT.cream, -3.35, 6.5, -45.5); mesh(boxGeo(4.3, 7, 0.6, 2.5), MAT.cream, 3.35, 6.5, -45.5);
  mesh(boxGeo(2.4, 2.3, 0.6, 2.5), MAT.cream, 0, 8.85, -45.5);
  solid(-5.8, -58, -5.2, -45.2, 10); solid(5.2, -58, 5.8, -45.2, 10); solid(-5.8, -45.8, -1.2, -45.2, 10); solid(1.2, -45.8, 5.8, -45.2, 10); solid(-5.8, -58, 5.8, -57.4, 10);
  mesh(boxGeo(19, 0.9, 22, 2), MAT.marble, 0, 10.45, -49);
  const tg = new THREE.Group(); tg.position.set(0, 0.9, -49); tg.userData.wall = MAT.marble; WORLD.add(tg); roof(tg, 18.4, 22, 10);
  // Vulcan in bronze, inside the cella
  mesh(boxGeo(1.6, 1.2, 1.6, 1), MAT.marble, 0, 3.6, -55.5);
  const vulcan = makePerson({ metal: MAT.bronze, tunic: 1, hair: 1, beard: 1, belt: 1, hammer: 1, scale: 1.7 });
  vulcan.root.position.set(0, 4.2, -55.5); vulcan.arms[1].sh.rotation.x = -0.6; vulcan.arms[1].elbow.rotation.x = -1.1; WORLD.add(vulcan.root);
  addLightSource(0, 7, -52, 0xff9a50, 10, 12, 1.5);
  // the sacred fire in its bronze bowl
  for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; const leg = mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.3, 6), MAT.bronze, Math.cos(a) * 0.55, 3.6, -42.5 + Math.sin(a) * 0.55); leg.rotation.set(Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25); }
  mesh(new THREE.CylinderGeometry(1.15, 0.5, 0.6, 24), MAT.bronze, 0, 4.4, -42.5); solid(-1.2, -43.7, 1.2, -41.3);
  mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.05, 24), MAT.ember, 0, 4.68, -42.5, WORLD, true);
  templeFire = makeFire(0, 4.7, -42.5, 1.6, 120, 45);
  // the Law, carved on the front of the podium
  const law = mesh(boxGeo(5.2, 1.5, 0.08, 1), MAT.marble, -7, 1.6, -37.95);
  law.material = std({ map: inscription(['LEX · VVLCANI', 'DVM · IGNIS · ARDET', 'VRBS · VIVIT'], 5.2, 1.5, C.marble, 'rgba(120,30,20,.95)'), roughness: 0.45 });
  readable(law, { title: 'The Law of Vulcan', lat: 'Lex Vulcani: dum ignis ardet, urbs vivit.', en: 'The law of Vulcan: as long as the fire burns, the city lives.',
    about: 'Two hundred years ago Vulcan saved the people of this city when the mountain swallowed it. His fire must never go out. If it dies, the mountain wakes.' });

  // ── Lava behind the temple ──
  anim.lava = mesh(planeGeo(110, 12, 8), MAT.lava, 0, -1.0, LAVA_Z, WORLD, true);
  anim.lavaLight = addLightSource(0, 3, LAVA_Z, 0xff4a14, 70, 60, 1.2);
  for (let i = 0; i < 6; i++) {
    const pts = []; let x = -40 + i * 16 + Math.random() * 6, y = 4;
    for (let k = 0; k < 6; k++) { pts.push(new THREE.Vector3(x, y, -84 + Math.sin(k + i) * 1.5)); x += (Math.random() - 0.5) * 6; y += 3 + Math.random() * 3; }
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 30, 0.35 + Math.random() * 0.3, 6), MAT.lava, 0, 0, 0, WORLD, true);
  }

  // ── Torches ──
  [[-3.2, -12.5, 0], [3.2, -12.5, 0], [-3.2, -30.5, 26], [3.2, -30.5, 0], [-15.5, 11.5, 24], [15.5, 11.5, 0], [15.5, -11.5, 22], [-12, 14.5, 0], [-26, 32, 0]].forEach(([x, z, pw]) => torch(x, z, pw));

  // ── The light shaft from the crack in the roof ──
  const top = new THREE.Vector3(10, 49, 4), bot = new THREE.Vector3(0, 0, -1), len = top.distanceTo(bot);
  const sg = new THREE.CylinderGeometry(2.4, 8.5, len, 32, 1, true);
  shaftMesh = new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ map: TEX.shaft, color: 0x9fb4d8, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  shaftMesh.position.copy(top).add(bot).multiplyScalar(0.5);
  shaftMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.clone().sub(bot).normalize());
  WORLD.add(shaftMesh);
  const hole = mesh(new THREE.CircleGeometry(3.2, 24), new THREE.MeshBasicMaterial({ color: 0xe8f0ff, fog: false }), top.x, top.y + 0.5, top.z, WORLD, true); hole.rotation.x = Math.PI / 2;
  // dust drifting in the light
  const dn = 500, dp = new Float32Array(dn * 3);
  for (let i = 0; i < dn; i++) { const t = Math.random(), r = Math.random() * lerp(2.2, 8, t); const a = Math.random() * 6.3; const c = top.clone().lerp(bot, t); dp[i * 3] = c.x + Math.cos(a) * r; dp[i * 3 + 1] = c.y; dp[i * 3 + 2] = c.z + Math.sin(a) * r; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  anim.dust = new THREE.Points(dg, new THREE.PointsMaterial({ size: 0.09, map: TEX.glow, color: 0xfff1d0, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
  WORLD.add(anim.dust);

  // ── Real props (scanned models from Poly Haven, CC0) ──
  // the bakery: storage jars, a water bucket and a barrel
  [['ceramic_vase_01', -2.6, 24.6, 2.4], ['antique_ceramic_vase_01', -3.4, 24.8, 2.1], ['ceramic_vase_04', -4.2, 24.7, 2.4]].forEach(([id, x, z, s]) => prop(id, x, 0, z, { scale: s, rot: x * 2, solid: 0.25 }));
  prop('wooden_bucket_01', -9.6, 0, 21.2, { rot: 0.4, solid: 0.25 });
  prop('wine_barrel_01', -9.5, 0, 19.6, { rot: 1.2, solid: 0.4 });
  // the smithy
  prop('wooden_bucket_01', 22.2, 0, 4.3, { rot: 1, solid: 0.25 });
  prop('wine_barrel_01', 24.6, 0, 5.4, { solid: 0.4 });
  prop('wooden_crate_01', 24.7, 0, 3.4, { rot: Math.PI / 2, solid: 0.45 });
  prop('wooden_axe', 25.0, 0, 1.9, { rot: -Math.PI / 2, tilt: 0.12 });
  // the forum: a bronze horse and two marble busts on pedestals, tall jars by the tribunal
  mesh(boxGeo(2.4, 1.3, 1.3, 1), MAT.marble, 5.5, 0.65, 4); solid(4.3, 3.35, 6.7, 4.65, 1.3);
  prop('horse_statue_01', 5.5, 1.3, 4, { scale: 8.5 });
  for (const s of [-1, 1]) {
    mesh(boxGeo(0.7, 1.25, 0.7, 1), MAT.marble, 12.6, 0.62, s * 10.4); solid(12.25, s * 10.4 - 0.35, 12.95, s * 10.4 + 0.35, 1.25);
    prop('marble_bust_01', 12.6, 1.25, s * 10.4, { rot: -Math.PI / 2, scale: 1.4 });
  }
  [-5, 5].forEach(z => prop('antique_ceramic_vase_01', -11.9, 0, z, { scale: 2.2, rot: z, solid: 0.35 }));
  // the temple: bronze vessels on the podium
  prop('brass_pot_01', -3.4, 3, -43.6, { scale: 1.6, solid: 0.3 });
  [-2.5, 2.5].forEach(x => prop('brass_vase_01', x, 3, -44.9, { scale: 2, rot: x, solid: 0.2 }));
  // the jetty and the riverbank
  prop('wooden_crate_02', -32.1, 0.25, 45.2, { rot: 0.15, solid: 0.6 });
  prop('wooden_crate_01', -32.0, 0.72, 45.2, { rot: 1.4 });
  prop('wine_barrel_01', -27.9, 0.25, 45.9, { rot: 0.7, solid: 0.4 });
  prop('wooden_crate_02', -25.8, 0, 32.4, { rot: 0.6, solid: 0.6 });
  prop('wine_barrel_01', -24.6, 0, 31.6, { solid: 0.4 });
  // great scanned rocks around the edge of the cavern
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * Math.PI * 2 + Math.random() * 0.3, r = 64 + Math.random() * 8, x = Math.cos(a) * r / 0.9, z = -10 + Math.sin(a) * r;
    if (Math.abs(z - RIVER_Z) < 8 || Math.abs(z - LAVA_Z) < 7) continue;
    const big = i % 3 === 0;
    prop(big ? 'rock_face_01' : 'boulder_01', x, terrain(x, z) - 0.4, z, { scale: big ? 2.2 + Math.random() : 2.5 + Math.random() * 2, rot: Math.random() * 6.3 });
  }
}
