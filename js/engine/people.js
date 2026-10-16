"use strict";
// ════════════════════════════════════════════════════════════════
// PEOPLE
// ════════════════════════════════════════════════════════════════
function faceTex(o) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
  const sk = '#' + new THREE.Color(o.skin).getHexString();
  x.fillStyle = sk; x.fillRect(0, 0, 256, 128);
  const cx = 64;
  x.fillStyle = 'rgba(190,80,70,.14)'; x.beginPath(); x.ellipse(cx - 15, 70, 8, 5, 0, 0, 7); x.ellipse(cx + 15, 70, 8, 5, 0, 0, 7); x.fill();
  for (const s of [-1, 1]) {
    x.fillStyle = 'rgba(0,0,0,.12)'; x.beginPath(); x.ellipse(cx + s * 11, 57, 6.5, 4, 0, 0, 7); x.fill();
    x.fillStyle = '#f1ebe2'; x.beginPath(); x.ellipse(cx + s * 11, 58, 4.6, 2.5, 0, 0, 7); x.fill();
    x.fillStyle = o.eye || '#3a2a1e'; x.beginPath(); x.arc(cx + s * 11, 58, 2.2, 0, 7); x.fill();
    x.fillStyle = '#0d0907'; x.beginPath(); x.arc(cx + s * 11, 58, 1.05, 0, 7); x.fill();
    x.strokeStyle = o.brow || '#2a1c12'; x.lineWidth = o.female ? 1.6 : 2.4; x.beginPath(); x.moveTo(cx + s * 6, 52.5); x.quadraticCurveTo(cx + s * 11, 50, cx + s * 16, 52.5 + (o.female ? -0.6 : 0.6)); x.stroke();
  }
  x.strokeStyle = 'rgba(0,0,0,.2)'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(cx + 1.5, 60); x.lineTo(cx + 2.5, 69); x.lineTo(cx - 2.5, 70.5); x.stroke();
  if (o.beard) {
    x.globalAlpha = 0.82; x.fillStyle = o.beard; x.beginPath(); x.ellipse(cx, 80, 22, 15, 0, 0, Math.PI); x.fill();
    x.fillRect(cx - 22, 68, 6, 13); x.fillRect(cx + 16, 68, 6, 13); x.beginPath(); x.ellipse(cx, 76, 9, 3, 0, 0, 7); x.fill(); x.globalAlpha = 1;
  }
  if (o.old) { x.strokeStyle = 'rgba(0,0,0,.12)'; x.lineWidth = 1; for (const s of [-1, 1]) { x.beginPath(); x.moveTo(cx + s * 18, 56); x.lineTo(cx + s * 21, 60); x.stroke(); } x.beginPath(); x.moveTo(cx - 8, 46); x.lineTo(cx + 8, 46); x.stroke(); }
  x.strokeStyle = o.female ? '#93413c' : '#6e3c32'; x.lineWidth = o.female ? 2.6 : 2.2;
  x.beginPath(); x.moveTo(cx - 6, 78); x.quadraticCurveTo(cx, 80, cx + 6, 78); x.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
// Detailed articulated figures. The original root/body/limb rig is retained.
function makePerson(o) {
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const metal = o.metal || null, female = !!o.female;
  const col = new THREE.Color(o.skin === undefined ? 0xc49a78 : o.skin).convertLinearToSRGB();
  const skinCanvas = paintTex(256, (u,v) => {
    const n = fbm(N1,u*24,v*24,24,4);
    return [col.r*255*(.91+.16*n),col.g*255*(.91+.13*n),col.b*255*(.92+.12*n)];
  });
  const skinMap = texFrom(skinCanvas);
  const skinM = metal || std({map:skinMap,roughness:.72,bumpMap:skinMap,bumpScale:.0008});
  const lipM = metal || std({color:new THREE.Color(o.skin).multiply(new THREE.Color(0xc08e86)),roughness:.68});
  const hairM = metal || std({color:o.hair||0x33231b,roughness:.96});
  const cloth = c => metal || std({color:c,map:TEX.cloth,bumpMap:TEX.cloth,bumpScale:.0025,roughness:.97});
  const tunicM = cloth(o.tunic), shoeM = metal || MAT.leather;
  const ellipsoid = (parent,mat,x,y,z,sx,sy,sz,segments=20) => {
    const m=mesh(new THREE.SphereGeometry(1,segments,14),mat,x,y,z,parent);
    m.scale.set(sx,sy,sz);return m;
  };
  const limb = (parent,mat,top,bottom,length,x,y,z) => mesh(new THREE.CylinderGeometry(top,bottom,length,18,3),mat,x,y,z,parent);
  const strap = (parent,x,y,z,w,h,d,rz=0) => {
    const m=mesh(boxGeo(w,h,d,1),shoeM,x,y,z,parent);m.rotation.z=rz;return m;
  };
  const legs=[];
  for (const side of [-1,1]) {
    const hip=new THREE.Group();hip.position.set(side*.095,.86,0);body.add(hip);
    limb(hip,skinM,.067,.054,.39,0,-.19,0);
    ellipsoid(hip,skinM,0,-.39,.012,.055,.061,.055);
    limb(hip,skinM,.053,.032,.36,0,-.59,0);
    ellipsoid(hip,skinM,0,-.78,.012,.036,.052,.043);
    ellipsoid(hip,skinM,0,-.817,.069,.047,.033,.11);
    ellipsoid(hip,shoeM,0,-.842,.057,.057,.017,.127);
    strap(hip,0,-.803,.055,.108,.016,.03);
    strap(hip,0,-.796,.115,.105,.016,.026);
    strap(hip,side*.032,-.735,.013,.014,.13,.016,side*.18);
    strap(hip,0,-.706,.012,.078,.014,.085);
    legs.push(hip);
  }
  const long = female || !!o.toga;
  const profile=[];
  const levels=24;
  for(let i=0;i<=levels;i++) {
    const t=i/levels,y=lerp(long?.095:.52,1.475,t);
    let r;
    if(y<.9) r=lerp(long?.26:.245,.185,(y-(long?.095:.52))/(.9-(long?.095:.52)));
    else if(y<1.22)r=lerp(.185,.205,(y-.9)/.32);
    else if(y<1.35)r=lerp(.205,female?.204:.238,(y-1.22)/.13);
    else r=lerp(female?.204:.238,.055,(y-1.35)/.125);
    profile.push(new THREE.Vector2(r,y));
  }
  const torso=mesh(new THREE.LatheGeometry(profile,64),tunicM,0,0,0,body);
  const pos=torso.geometry.attributes.position;
  for(let i=0;i<pos.count;i++) {
    const x=pos.getX(i),z=pos.getZ(i),y=pos.getY(i),a=Math.atan2(x,z);
    const fold=(.018*Math.sin(a*14+y*1.8)+.008*Math.sin(a*23-y*3))*Math.max(.15,1-Math.abs(y-.65));
    const r=Math.hypot(x,z),f=1+fold/Math.max(r,.05);
    pos.setXYZ(i,x*f,y,z*f*.7);
  }
  torso.geometry.computeVertexNormals();
  // Sleeved shoulders, tapered arms, articulated wrists and separate fingers.
  const arms=[];
  for(const side of [-1,1]) {
    const sh=new THREE.Group();sh.position.set(side*(female?.198:.226),1.365,0);body.add(sh);
    ellipsoid(sh,tunicM,0,-.035,0,.075,.09,.081);
    limb(sh,tunicM,.076,.061,.17,0,-.10,0);
    limb(sh,skinM,.056,.045,.24,0,-.20,0);
    const elbow=new THREE.Group();elbow.position.y=-.325;sh.add(elbow);
    ellipsoid(elbow,skinM,0,0,0,.045,.046,.045);
    limb(elbow,skinM,.045,.026,.255,0,-.13,0);
    ellipsoid(elbow,skinM,0,-.27,0,.027,.033,.028);
    const hand=new THREE.Group();hand.position.set(0,-.31,.006);elbow.add(hand);
    ellipsoid(hand,skinM,0,0,0,.034,.044,.021);
    for(let f=0;f<4;f++) {
      const len=[.047,.058,.055,.042][f],x=(f-1.5)*.015;
      const finger=mesh(new THREE.CapsuleGeometry(.008,len,3,8),skinM,x,-.047-len*.25,.006,hand);
      finger.rotation.x=-.13;finger.rotation.z=(f-1.5)*.04;
    }
    const thumb=mesh(new THREE.CapsuleGeometry(.010,.033,3,8),skinM,-side*.038,-.010,.005,hand);thumb.rotation.z=-side*.6;
    sh.rotation.z=side*.085;arms.push({sh,elbow,hand});
  }
  // Leather waist tie and a bronze buckle.
  if(o.belt) {
    const belt=mesh(new THREE.TorusGeometry(.195,.016,8,48),shoeM,0,.985,0,body);belt.rotation.x=Math.PI/2;belt.scale.y=.73;
    mesh(boxGeo(.042,.036,.012,1),metal||MAT.bronze,.018,.984,.151,body);
    strap(body,.03,.89,.151,.022,.17,.013,.08);
  }
  if(o.apron) {
    const g=new THREE.PlaneGeometry(.35,.61,12,18),p=g.attributes.position;
    for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);p.setZ(i,.012*Math.sin(x*69)*(1-(y+.305)/.61));}
    g.computeVertexNormals();const mat=cloth(o.apron);if(!metal)mat.side=THREE.DoubleSide;
    mesh(g,mat,0,.88,.165,body);
  }
  if(o.toga || o.palla) {
    const material=cloth(o.toga||o.palla);if(!metal)material.side=THREE.DoubleSide;
    const drape=new THREE.LatheGeometry(profile.filter(v=>v.y>.28&&v.y<1.44).map(v=>new THREE.Vector2(v.x+.024,v.y)),64,.18,Math.PI*1.65);
    const p=drape.attributes.position;
    for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),y=p.getY(i),a=Math.atan2(x,z);const f=1+.065*Math.sin(a*11+y*4);p.setXYZ(i,x*f,y+.026*Math.sin(a*2),z*f*.77);}
    drape.computeVertexNormals();const garment=mesh(drape,material,0,0,0,body);garment.rotation.y=.52;
    const sash=new THREE.PlaneGeometry(.17,.87,6,24),sp=sash.attributes.position;
    for(let i=0;i<sp.count;i++)sp.setZ(i,.009*Math.sin(sp.getX(i)*120));sash.computeVertexNormals();
    const band=mesh(sash,material,.018,1.13,.17,body);band.rotation.z=.53;
    if(o.border){const trim=mesh(new THREE.PlaneGeometry(.027,.87),cloth(o.border),.075,1.10,.182,body);trim.rotation.z=.53;}
  }
  limb(body,skinM,.046,.057,.135,0,1.49,0);
  // Sculpted head: separate jaw, cheekbones, eye sockets and projecting bridge.
  const head=new THREE.Group();head.position.y=1.635;body.add(head);
  const skull=new THREE.SphereGeometry(1,40,32),sv=skull.attributes.position;
  for(let i=0;i<sv.count;i++){
    let x=sv.getX(i),y=sv.getY(i),z=sv.getZ(i);
    const jaw=y<-.15?lerp(.73,1,Math.min(1,(y+1)/.85)):1;
    x*=.099*jaw;y*=.139;z*=.096;
    if(z>0){const cheeks=Math.exp(-((Math.abs(x)-.055)**2/.0005+(y+.01)**2/.001));z+=cheeks*.012;
      const socket=Math.exp(-((Math.abs(x)-.040)**2/.00020+(y-.028)**2/.00018));z-=socket*.014;
      if(y<-.035)z+=.009*(1-Math.min(1,Math.abs(y+.07)/.07));}
    sv.setXYZ(i,x,y,z);
  }
  skull.computeVertexNormals();mesh(skull,skinM,0,0,0,head);
  const eyes=[], lids=[];
  for(const side of [-1,1]) {
    const eye=new THREE.Group();eye.position.set(side*.039,.026,.083);head.add(eye);eyes.push(eye);
    ellipsoid(eye,metal||std({color:0xc6b9a5,roughness:.45}),0,0,0,.021,.010,.012);
    ellipsoid(eye,metal||std({color:o.eye||0x4a3525,roughness:.35}),0,0,.011,.007,.007,.0025);
    ellipsoid(eye,metal||std({color:0x15120e,roughness:.25}),0,0,.013,.0033,.004,.001);
    if(!metal)ellipsoid(eye,std({color:0xf6ead5,roughness:.15}),-.002,.002,.014,.0012,.0012,.0007,8);
    const lid=mesh(new THREE.TorusGeometry(.018,.003,6,22,Math.PI),skinM,0,.001,.003,eye);lid.scale.y=.55;lids.push(lid);
    const brow=mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(side*.019,.045,.089),new THREE.Vector3(side*.039,.052,.089),new THREE.Vector3(side*.059,.046,.075)]),10,.0035,5,false),hairM,0,0,0,head);
    const ear=ellipsoid(head,skinM,side*.097,-.006,-.006,.017,.029,.013);
    ellipsoid(head,lipM,side*.107,-.006,.001,.006,.017,.008);
  }
  ellipsoid(head,skinM,0,.010,.093,.010,.034,.015);
  ellipsoid(head,skinM,0,-.014,.109,.015,.012,.017);
  for(const side of [-1,1]){
    ellipsoid(head,skinM,side*.012,-.022,.101,.009,.007,.011);
    ellipsoid(head,metal||std({color:0x50392c,roughness:1}),side*.010,-.025,.110,.004,.002,.003,12);
  }
  const mouth=new THREE.Group();mouth.position.set(0,-.056,.092);head.add(mouth);
  ellipsoid(mouth,lipM,0,.002,.001,.024,.004,.005);
  const lowerLip=ellipsoid(mouth,lipM,0,-.004,.001,.021,.004,.005);
  const seam=mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-.022,0,.004),new THREE.Vector3(0,-.001,.006),new THREE.Vector3(.022,0,.004)]),12,.0009,4,false),metal||std({color:0x60463b,roughness:1}),0,0,0,mouth);
  // Fine hair is instanced: a single draw call for many individual locks.
  if(o.hair){
    const capGeo=new THREE.SphereGeometry(1,40,20,0,Math.PI*2,0,Math.PI*(female?.60:.49));
    const cap=mesh(capGeo,hairM,0,.012,-.013,head);cap.scale.set(.103,.143,.100);cap.rotation.x=-.24;
    const count=96,locks=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,6),hairM,count),dummy=new THREE.Object3D();
    for(let i=0;i<count;i++){
      const a=i*2.399963,phi=Math.acos(1-(i+.5)/count*.95);
      dummy.position.set(Math.cos(a)*Math.sin(phi)*.102,Math.cos(phi)*.143+.012,Math.sin(a)*Math.sin(phi)*.10-.013);
      dummy.scale.set(.007,.013,.006);dummy.rotation.set(phi,a,.3*Math.sin(i));dummy.updateMatrix();locks.setMatrixAt(i,dummy.matrix);
    }locks.castShadow=true;head.add(locks);
    if(female){ellipsoid(head,hairM,0,.016,-.108,.058,.060,.043);}
  }
  if(o.beard){
    const bm=metal||std({color:o.beard,roughness:1});
    const g=new THREE.SphereGeometry(1,32,18,0,Math.PI*2,Math.PI*.48,Math.PI*.44);
    const p=g.attributes.position;for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);p.setXYZ(i,x*.095,y*.145,z*.102+.003);}
    const indices=g.index.array, keep=[];
    for(let i=0;i<indices.length;i+=3){
      let mouthHole=true;
      for(let j=0;j<3;j++){const k=indices[i+j];if(!(Math.abs(p.getX(k))<.031&&p.getY(k)>-.071&&p.getZ(k)>.055))mouthHole=false;}
      if(!mouthHole)keep.push(indices[i],indices[i+1],indices[i+2]);
    }
    g.setIndex(keep);g.computeVertexNormals();mesh(g,bm,0,-.004,0,head);
    for(const side of [-1,1])ellipsoid(head,bm,side*.011,-.043,.101,.015,.005,.006);
  }
  if(o.veil){
    const vm=cloth(o.veil);if(!metal)vm.side=THREE.DoubleSide;
    const v=mesh(new THREE.SphereGeometry(1,40,24,0,Math.PI*2,0,Math.PI*.67),vm,0,.012,-.020,head);v.scale.set(.12,.162,.118);v.rotation.x=-.48;
  }
  if(o.old){
    const wrinkleM=metal||std({color:new THREE.Color(o.skin).multiplyScalar(.73),roughness:.9});
    for(let i=0;i<3;i++){
      const pts=[new THREE.Vector3(-.034,.069+i*.010,.076-i*.007),new THREE.Vector3(0,.067+i*.010,.088-i*.006),new THREE.Vector3(.034,.069+i*.010,.076-i*.007)];
      mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),12,.00065,4,false),wrinkleM,0,0,0,head);
    }
  }
  if(o.laurel){const l=mesh(new THREE.TorusGeometry(.106,.010,7,32),metal||std({color:0x59623a,roughness:.8}),0,.061,-.006,head);l.rotation.x=Math.PI/2+.20;}
  if(o.hammer){const h=new THREE.Group();h.position.y=-.3;arms[1].elbow.add(h);mesh(new THREE.CylinderGeometry(.018,.018,.55,10),metal||MAT.wood,0,.02,.14,h).rotation.x=Math.PI/2;mesh(boxGeo(.09,.09,.20,1),metal||MAT.iron,0,.02,.4,h).rotation.x=Math.PI/2;}
  root.traverse(m=>{if(m.isMesh){m.castShadow=true;m.receiveShadow=true;}});
  if(o.scale)root.scale.setScalar(o.scale);
  return {root,body,legs,arms,head,torso,eyes,lids,mouth,lowerLip,seed:Math.random()*10};
}
// st: { walk: 0..1, phase, talk, look (head yaw), wave }
function animatePerson(p, t, st) {
  const w = st.walk || 0, ph = st.phase || 0;
  p.torso.scale.y = 1 + Math.sin(t * 1.6 + p.seed) * 0.011;
  p.legs[0].rotation.x = Math.sin(ph) * 0.55 * w; p.legs[1].rotation.x = -Math.sin(ph) * 0.55 * w;
  p.body.position.y = Math.abs(Math.cos(ph)) * 0.03 * w;
  const idle = Math.sin(t * 1.3 + p.seed) * 0.03;
  p.arms[0].sh.rotation.x = -Math.sin(ph) * 0.45 * w + idle; p.arms[0].elbow.rotation.x = -0.15 - 0.2 * w;
  if (st.talk) {
    p.arms[1].sh.rotation.x = -0.45 - 0.18 * Math.sin(t * 2.6 + p.seed);
    p.arms[1].elbow.rotation.x = -0.8 + 0.25 * Math.sin(t * 3.4);
  } else if (st.pose === 'pipe') {
    for (const a of p.arms) { a.sh.rotation.x = -1.15 + Math.sin(t * 2 + p.seed) * 0.03; a.elbow.rotation.x = -1.75; }
  } else if (st.pose === 'hammer') {
    p.arms[1].sh.rotation.x = -0.9 - 0.5 * Math.max(0, Math.sin(t * 2.4)); p.arms[1].elbow.rotation.x = -0.9;
  } else { p.arms[1].sh.rotation.x = Math.sin(ph) * 0.45 * w - idle; p.arms[1].elbow.rotation.x = -0.15 - 0.2 * w; }
  const look = clamp(st.look || 0, -1, 1);
  p.head.rotation.y = lerp(p.head.rotation.y, look, 0.08);
  p.head.rotation.x = st.talk ? Math.sin(t * 2.1) * 0.035 : Math.sin(t*.63+p.seed)*.009;
  // Blinks and restrained speaking motion; no dialogue timing changes.
  const blinkPhase=(t+p.seed*1.7)%4.7;
  const blink=blinkPhase<.16 ? Math.max(.08,Math.abs(blinkPhase-.08)/.08) : 1;
  if(p.eyes) p.eyes.forEach(e=>e.scale.y=blink);
  if(p.lowerLip) p.lowerLip.position.y=-.004-(st.talk?.003*Math.max(0,Math.sin(t*9+p.seed)):0);

}
