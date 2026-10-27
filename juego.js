/* ASAGMBA - ARCHIVO GENERADO por build.py el 2026-10-26 18:00.
   NO lo edites a mano: cambia los archivos de src/ y vuelve a construir (Ctrl+Shift+B). */
(function () {
/* ---------- 01-datos-y-carga.js ---------- */
const CF = [132, 89, 50],
  OF = [119, 140, 50];
const ET = {
  slime: { hp: 25, i: 'es' },
  slimeC: { hp: 25, i: 'ec' },
  slimeF: { hp: 30, i: 'ef' },
  eye: { hp: 25, i: 'ee', fly: 1 },
  cat: { hp: 20, i: 'et' },
  bat: { hp: 15, i: 'eb', fly: 1 },
  ghost: { hp: 30, i: 'eg', fly: 1 },
  skel: { hp: 40, i: 'ek' },
  skelG: { hp: 45, i: 'ekg' },
  skelH: { hp: 55, i: 'ekh' },
  hood: { hp: 30, i: 'eh' },
  demon: { hp: 70, i: 'dsw' },
  hallo: { hp: 30, i: 'ehal' },
  shade: { hp: 36, i: 'eshd' },
  hunt: { hp: 56, i: 'ehun' },
  wboss: { hp: 320, i: 'ewb' },
};
const P2 = [
  [260, 300, 110],
  [450, 250, 90],
  [640, 300, 120],
  [880, 290, 150],
  [1100, 235, 100],
  [1280, 290, 110],
  [1500, 250, 140],
  [1750, 300, 100],
  [1900, 245, 90],
];
const E2 = [
  ['slime', 380, 382],
  ['skel', 700, 382],
  ['bat', 560, 200],
  ['hood', 930, 290],
  ['slime', 1100, 382],
  ['bat', 1300, 170],
  ['ghost', 1500, 220],
  ['skel', 1700, 382],
  ['bat', 1850, 160],
  ['hood', 1960, 382],
  ['slime', 2000, 382],
];
const P1 = [
  [250, 310, 96, 's'],
  [430, 262, 64, 's'],
  [560, 312, 128, 's'],
  [700, 250, 96, 'b'],
  [810, 282, 96, 's'],
  [920, 232, 96, 's'],
  [1040, 292, 128, 's'],
  [1220, 252, 96, 's'],
  [1350, 312, 96, 's'],
];
const E1 = [
  ['slime', 330, 382],
  ['cat', 470, 382],
  ['bat', 560, 190],
  ['slimeC', 620, 312],
  ['skel', 860, 382],
  ['eye', 830, 160],
  ['skelG', 990, 382],
  ['ghost', 1040, 190],
  ['slimeF', 1160, 382],
  ['hood', 1100, 292],
  ['skelH', 1300, 382],
  ['bat', 1390, 170],
  ['hood', 1260, 252],
];
const W = 700,
  H = 406,
  ARENA = 1500;
let LEVEL = W * 3,
  GROUND = 382;
const cv = document.getElementById('c'),
  ctx = cv.getContext('2d');
cv.width = 1400;
cv.height = 812;
ctx.imageSmoothingEnabled = false;
const img = {};
let loaded = 0;
for (const k in SRC) {
  const i = new Image();
  i.onload = () => {
    if (++loaded == Object.keys(SRC).length) {
      init();
      try {
        lookApply();
      } catch (e) {
        console.error(e);
      }
      enterMenu();
      loadCine();
      requestAnimationFrame(loop);
    }
  };
  i.src = SRC[k];
  img[k] = i;
}
const FOODS = [
  { id: 'nac', n: 'Nacatamal', d: 'Restaura 60 de vida', t: 0, w: 0.2 },
  { id: 'gal', n: 'Gallo Pinto', d: 'Stamina se regenera x3 (30s)', t: 30, w: 0.12 },
  { id: 'tis', n: 'Tiste', d: 'Todo cuesta la mitad de stamina (20s)', t: 20, w: 0.1 },
  { id: 'pin', n: 'Pinolillo', d: 'Velocidad +35% (25s)', t: 25, w: 0.1 },
  { id: 'vig', n: 'Vigoron', d: 'Dano de espada +60% (20s)', t: 20, w: 0.09 },
  { id: 'que', n: 'Quesillo', d: 'Escudo: bloquea los proximos 3 golpes', t: 0, w: 0.09 },
  { id: 'ind', n: 'Indio Viejo', d: 'Regenera 5 de vida por segundo (10s)', t: 10, w: 0.1 },
  { id: 'ros', n: 'Rosquilla', d: 'Doble salto y +20% de salto (30s)', t: 30, w: 0.08 },
  { id: 'cac', n: 'Cacao', d: 'Vampirismo: curas 30% del dano (25s)', t: 25, w: 0.06 },
  { id: 'ron', n: 'Rondon', d: 'Aura de fuego que quema cerca (15s)', t: 15, w: 0.06 },
];
const ALIAS = { hp: 'nac', st: 'tis' },
  ITEMS = {};
FOODS.forEach(f => (ITEMS[f.id] = f));
ITEMS.hp = ITEMS.nac;
ITEMS.st = ITEMS.tis;
let buf = {},
  hasSword = false,
  hasGem = false,
  KILLS = 0,
  NEED = 14,
  GEMS = [],
  ENC = [],
  ENCI = 0,
  SPX = 0,
  TF = { t: 0 },
  STRUCTS = [];
const TELE = { x: 3800 };
function randFood() {
  const r = Math.random();
  let a = 0;
  for (const f of FOODS) {
    a += f.w;
    if (r < a) return f.id;
  }
  return 'nac';
}
function stc(n) {
  return n * (buf.tis > 0 ? 0.5 : 1);
}
function sdmg(a) {
  return Math.round(20 * ATK[a.c].dm * (buf.vig > 0 ? 1.6 : 1));
}

/* ---------- 02-controles.js ---------- */
const keys = {};
let area = 1,
  platforms = [],
  enemies = [],
  trans = null,
  winText = '',
  brickP,
  orbs = [],
  parryReq,
  ms = 0,
  paused,
  hasSave,
  flashW = 0,
  atk1,
  atk2,
  bolts,
  slash,
  iT = 0,
  jumpReq,
  dashReq,
  lastSpace,
  p,
  B,
  inv,
  pick,
  shots,
  state,
  showInv,
  toast,
  toastT,
  cam,
  last = performance.now();
addEventListener('keydown', e => {
  audioStart();
  if (INV.open) {
    // con el inventario abierto, las teclas son del inventario (21c-inventario.js)
    e.preventDefault();
    invKey(e);
    return;
  }
  if (state == 'cust') {
    e.preventDefault();
    if (!e.repeat) custKey(e);
    return;
  }
  if (state == 'menu' || state == 'exit') {
    e.preventDefault();
    menuKey(e);
    return;
  }
  if (e.code == 'KeyM' && AC) {
    muted = !muted;
    MG.gain.value = muted ? 0 : 0.6;
  }
  if (state == 'letter') {
    e.preventDefault();
    if (!e.repeat && (e.code == 'Space' || e.code == 'Enter' || e.code == 'KeyE')) letterClick();
    return;
  }
  if (state == 'gate') {
    e.preventDefault();
    if (!e.repeat) {
      keys[e.code] = true;
      if (e.code == 'KeyE') gateE();
    }
    return;
  }
  if (state == 'talk') {
    e.preventDefault();
    if (!e.repeat && (e.code == 'KeyE' || e.code == 'Space' || e.code == 'Enter')) talkNext();
    return;
  }
  if (state == 'meet') {
    e.preventDefault();
    if (!e.repeat && (e.code == 'Space' || e.code == 'Enter' || e.code == 'KeyE')) meetNext();
    return;
  }
  if (state == 'skyq') {
    e.preventDefault();
    return;
  }
  if (state == 'cine') {
    e.preventDefault();
    if (!e.repeat && CN.t > 1.2 && (e.code == 'Space' || e.code == 'Enter' || e.code == 'KeyE')) endCine();
    return;
  }
  if (state == 'newdata' || state == 'void' || state == 'rewind') {
    e.preventDefault();
    return;
  }
  if (e.code == 'KeyE' && state == 'room' && Math.abs(p.x - LETTER.x) < 70) {
    openLetter();
    return;
  }
  if (
    e.code == 'KeyE' &&
    state == 'play' &&
    area == 5 &&
    gateAlpha() > 0.8 &&
    Math.abs(p.x - PORTAL.x) < 80
  ) {
    if (!hasGem) {
      say(
        'El obelisco no responde. Le falta la gema del Guardián (' +
          Math.min(KILLS, NEED) +
          '/' +
          NEED +
          ').',
      );
      sfx('parry');
      return;
    }
    startPortal();
    return;
  }
  if (e.code == 'KeyE' && state == 'play') {
    const ch = nearChest();
    if (ch) {
      openChest(ch);
      return;
    }
  }
  if (e.code == 'KeyE' && state == 'play' && area == 1) {
    const n = nearNPC();
    if (n) {
      startTalk(n);
      return;
    }
    if (Math.abs(p.x - TELE.x) < 70) {
      startTele();
      return;
    }
  }
  if (['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Tab'].includes(e.code)) e.preventDefault();
  if (e.repeat) return;
  keys[e.code] = true;
  if (e.code == 'KeyW') jumpReq = true;
  if (e.code == 'Space') {
    const t = performance.now() / 1000;
    if (t - lastSpace <= 0.3 && p.dashCd <= 0) {
      dashReq = true;
      jumpReq = false;
      lastSpace = -9;
    } else {
      jumpReq = true;
      lastSpace = t;
    }
  }
  if (e.code == 'KeyJ' || e.code == 'KeyK') atk1 = true;
  if (e.code == 'KeyL') parryReq = true;
  if (e.code == 'Escape' && state == 'play') {
    save();
    paused = true;
    musPause();
    enterMenu();
  }
  if (e.code == 'KeyI' || e.code == 'Tab') invToggle();
  if (e.code == 'KeyR') restart();
  const m = /^Digit([0-9])$/.exec(e.code);
  if (m) useItem(m[1] == '0' ? 9 : +m[1] - 1);
});
function mpos(e) {
  const r = cv.getBoundingClientRect();
  return [((e.clientX - r.left) * W) / r.width, ((e.clientY - r.top) * H) / r.height];
}
function hitItem(e) {
  const [x, y] = mpos(e);
  for (let i = 0; i < MI.length; i++) if (x < 300 && Math.abs(y - (192 + i * 30)) < 14) return i;
  return -1;
}
cv.addEventListener('mousemove', e => {
  if (state == 'cust') {
    const m = mpos(e);
    CU.mx = m[0];
    CU.my = m[1];
  }
  if (state == 'menu') {
    const i = hitItem(e);
    if (i >= 0) ms = i;
  }
});
cv.addEventListener('mousedown', e => {
  cv.focus();
  audioStart();
  if (INV.open) {
    invMouse('down', e);
    return;
  }
  if (state == 'letter') {
    letterClick();
    return;
  }
  if (state == 'cine') {
    if (CN.t > 1.2) endCine();
    return;
  }
  if (state == 'meet') {
    meetNext();
    return;
  }
  if (state == 'skyq') return;
  if (state == 'talk') {
    talkNext();
    return;
  }
  if (state == 'newdata' || state == 'void' || state == 'rewind' || state == 'gate') return;
  if (state == 'room' && nearLetter(e)) {
    openLetter();
    return;
  }
  if (state == 'cust') {
    custClick(e);
    return;
  }
  if (state == 'menu') {
    const i = hitItem(e);
    if (i >= 0) {
      ms = i;
      menuPick(i);
    }
  } else if (state == 'exit') enterMenu();
  else atk1 = true;
});
addEventListener('keyup', e => (keys[e.code] = false));
addEventListener('blur', () => {
  for (const k in keys) keys[k] = false;
});

/* ---------- 03-jugador-y-bucle.js ---------- */
function init() {
  area = 1;
  LEVEL = W * 3;
  GROUND = 382;
  fx = [];
  platforms = [];
  enemies = [];
  jumpReq = dashReq = atk1 = parryReq = false;
  orbs = [];
  slash = null;
  iT = 0;
  flashW = 0;
  lastSpace = -9;
  state = 'play';
  showInv = false;
  toast = '';
  toastT = 0;
  shots = [];
  p = {
    x: LEVEL / 2 - 300,
    y: GROUND,
    vx: 0,
    vy: 0,
    face: -1,
    dash: 0,
    dashCd: 0,
    t: 0,
    hp: 100,
    sta: 100,
    staWait: 0,
    inv: 0,
    shield: 0,
    dj: true,
    comboT: 0,
    victT: 0,
    kb: 0,
    kbCd: 0,
    on: true,
    run: false,
    dropT: 0,
    landT: 0,
    hurtT: 0,
    crouch: false,
    dl: 0,
    atkCd: 0,
    atk: null,
    combo: 0,
    parry: 0,
    pcd: 0,
    ghosts: [],
  };
  B = {
    on: false,
    hp: 300,
    max: 300,
    st: '',
    t: 0,
    x: 0,
    y: 0,
    face: -1,
    open: false,
    hitCd: 0,
    flash: 0,
    a: 1,
    px: 0,
    pt: 0,
    sx: 0,
    fired: 0,
    beam: 0,
    bt: 0,
    bc: 5,
    ph2: false,
    o: 0,
    rg: 0,
    rn: 0,
    ang: 0,
  };
  inv = {};
  buf = {};
  hasSword = false;
  hasGem = false;
  KILLS = 0;
  GEMS = [];
  pick = [
    [300, 'hp'],
    [650, 'st'],
    [950, 'hp'],
    [1200, 'st'],
    [1350, 'hp'],
    [1800, 'hp'],
    [1950, 'st'],
  ].map(([x, id]) => ({ x, id, got: false }));
  cam = p.x - W / 2;
}
function say(s) {
  toast = s;
  toastT = 2;
}
function useItem(i) {
  if (state != 'play') return;
  const f = FOODS[i];
  if (!f || !(inv[f.id] > 0)) return;
  if (f.id == 'nac') {
    if (p.hp >= 100) return say('Vida llena');
    p.hp = Math.min(100, p.hp + 60);
  } else if (f.id == 'que') p.shield = 3;
  else buf[f.id] = f.t;
  inv[f.id]--;
  sfx('pick');
  flashW = 0.05;
  say(f.n + ': ' + f.d);
}
function addItem(id) {
  id = ALIAS[id] || id;
  if ((inv[id] || 0) >= 9) return false;
  inv[id] = (inv[id] || 0) + 1;
  return true;
}
function sprP(s, x, y, f, a) {
  ctx.save();
  ctx.globalAlpha = a;
  ctx.translate(Math.round(x - cam), Math.round(y));
  ctx.scale(f, 1);
  hdraw(s.fi);
  ctx.restore();
}
function bossBox() {
  if (B.ph2) return { w: 80, h: 66 };
  const o = B.open,
    ch = B.st == 'charge';
  return o ? { w: 80, h: 90 } : { w: 100, h: ch ? 48 : 60 };
}
function loop(now) {
  if (AC) {
    musTick();
    zmTick();
  }
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  updPFX(dt);
  if ((state == 'play' || state == 'room') && !INV.open) {
    if (HS > 0) HS -= dt;
    else update(dt, now);
  } else if (state == 'intro') {
    iT += dt;
    const md = area == 3 && musOn();
    if (md ? musTime() >= MUS.DROP && iT > 0.5 : iT > 3.2) {
      state = 'play';
      B.bc = 5;
      if (md) {
        flashW = Math.max(flashW, 0.35);
      }
    }
  } else if (state == 'newdata') {
    ND.t += dt;
    if (ND.t > 1.5) {
      state = 'void';
      ND.t = 0;
      sfx('boom');
      flashW = 0.8;
      ambient('void');
    }
  } else if (state == 'void') {
    ND.t += dt;
    if (ND.t > 11) enterGate();
  } else if (state == 'rewind') {
    RW.t += dt;
    if (RW.t > 3.2) {
      loadArea(1);
      state = 'play';
      flashW = 1.2;
      blackIn = 0;
      say('Level 1');
    }
  } else if (state == 'talk') {
    talk.s += dt;
  } else if (state == 'tele') {
    TF.t += dt;
    if (TF.t > 2.2) {
      loadArea(5);
      state = 'play';
      flashW = 1.2;
    }
  } else if (state == 'cine') {
    CN.t += dt;
    if (CN.t > 8.1) endCine();
  } else if (state == 'skyq') updSkyQ(dt);
  else if (state == 'meet') updMeet(dt);
  else if (state == 'gate') {
    gateUpdate(dt);
  } else if (state == 'portalfx') {
    PF.t += dt;
    p.x += (PORTAL.x - p.x) * Math.min(1, dt * 1.6);
    p.face = Math.sign(PORTAL.x - p.x) || p.face;
    if (PF.t > 3.2) startCine();
  } else if (state == 'trans') {
    trans.t += dt;
    if (trans.t > 1.1 && !trans.d) {
      trans.d = 1;
      loadArea(trans.to);
    }
    if (trans.t > 2.7) state = 'play';
  }
  draw();
  requestAnimationFrame(loop);
}
function update(dt, now) {
  const dir = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0);
  if (dir) p.face = dir;
  p.t += dt;
  p.dashCd -= dt;
  p.inv -= dt;
  p.staWait -= dt;
  B.hitCd -= dt;
  B.flash -= dt;
  toastT -= dt;
  p.dropT -= dt;
  p.landT -= dt;
  p.hurtT -= dt;
  p.kbCd -= dt;
  p.comboT -= dt;
  p.victT -= dt;
  for (const k in buf) if (buf[k] > 0) buf[k] -= dt;
  if (buf.ind > 0) p.hp = Math.min(100, p.hp + 5 * dt);
  if (dashReq) {
    dashReq = false;
    if (p.sta >= 30) {
      p.sta -= stc(30);
      p.staWait = 0.6;
      p.dash = 0.18;
      p.dashCd = 0.45;
      sfx('dash');
      puff(p.x, p.y, 6, p.face);
      animKick(1.22, 0.84);
      for (let i = 0; i < 10; i++)
        pfx(
          p.x - p.face * rnd(0, 14),
          p.y - rnd(8, 50),
          -p.face * rnd(60, 180),
          rnd(-20, 20),
          0.3,
          i % 2 ? '#bff2ff' : '#ffffff',
          2,
          0,
        );
    }
  }
  const ground = p.on;
  p.crouch = !!(keys.KeyS && p.on && !p.atk && p.dash <= 0 && p.parry <= 0);
  if (p.dash > 0) {
    p.dash -= dt;
    p.vx = p.face * 620;
    p.vy = 0;
    if (Math.round(now / 30) % 2 == 0) p.ghosts.push({ x: p.x, y: p.y, f: p.face, a: 0.5, s: curAnim() });
  } else {
    p.run = !!(keys.ShiftLeft || keys.ShiftRight) && dir != 0 && p.sta > 3 && !p.crouch;
    if (p.run) {
      p.sta = Math.max(0, p.sta - stc(14) * dt);
      p.staWait = 0.5;
    }
    if (p.kb > 0) {
      p.kb -= dt;
      p.vx *= Math.max(0, 1 - 3.5 * dt);
    } else {
      const mx = (p.run ? 320 : p.crouch ? 80 : 190) * (buf.pin > 0 ? 1.35 : 1),
        ac = p.on ? (dir ? 1100 : 1500) : dir ? 520 : 260;
      p.vx += Math.max(-ac * dt, Math.min(ac * dt, dir * mx - p.vx));
    }
    if (jumpReq && ground && keys.KeyS && p.y < GROUND - 1) {
      p.dropT = 0.3;
      p.y += 3;
      p.on = false;
    } else if (jumpReq && ground && p.sta >= 10) {
      p.vy = -520 * (buf.ros > 0 ? 1.2 : 1);
      p.sta -= stc(10);
      p.staWait = 0.6;
      puff(p.x, p.y, 5, 0);
      animKick(0.84, 1.18);
    } else if (jumpReq && !ground && buf.ros > 0 && p.dj && p.sta >= 8) {
      p.vy = -480;
      p.dj = false;
      p.sta -= stc(8);
      puff(p.x, p.y, 6, 0);
      sfx('dash');
      animKick(0.88, 1.14);
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * 6.283;
        pfx(
          p.x + Math.cos(a) * 10,
          p.y - 4 + Math.sin(a) * 3,
          Math.cos(a) * 90,
          Math.sin(a) * 24,
          0.3,
          'rgba(220,245,255,.9)',
          2,
          0,
        );
      }
    }
    p.vy += 1500 * dt * (keys.KeyS && p.vy > 0 ? 2.5 : 1);
  }
  p.atkCd -= dt;
  p.pcd -= dt;
  p.parry -= dt;
  if (parryReq) {
    parryReq = false;
    if (p.pcd <= 0 && p.sta >= 8) {
      p.sta -= stc(8);
      p.staWait = 0.6;
      p.parry = 0.28;
      p.pcd = 0.7;
      p.atk = null;
    }
  }
  if (atk1) {
    atk1 = false;
    if (!hasSword)
      say(
        'Smara: "¿Pelear con las manos? Mejor le pido algo a la Anciana del Fuego." (E para hablar)',
      );
    else if (p.atkCd <= 0 && p.sta >= 8 && p.parry <= 0 && (!p.atk || p.atk.t > ATK[p.atk.c].e * 0.72)) {
      p.sta -= stc(8);
      p.staWait = 0.6;
      p.atkCd = 0.12;
      // combo de 5 en el suelo (en forma espíritu sigue el de 3) y ataques en el aire (22b-ataques-smara.js)
      const c = ataqueElegir();
      p.comboT = 1.0;
      p.atk = { t: 0, f: p.face, c, hit: false };
      sfx('swing');
      SLS.push({ t: 0, c, f: p.face });
    }
  }
  const live = B.on && B.st != 'enter' && B.st != 'morph',
    bb = bossBox();
  if (p.atk) {
    const a = p.atk;
    a.t += dt;
    if (!a.hit && a.t >= ATK[a.c].h) {
      a.hit = true;
      const dm = sdmg(a);
      // cada ataque tiene su propia zona de golpe (atkCaja en 22b-ataques-smara.js)
      if (live && golpeToca(a, B.x - bb.w / 2, B.y - bb.h / 2, B.x + bb.w / 2, B.y + bb.h / 2)) hitBoss(dm);
      for (const e of enemies) {
        const s = esz(e);
        if (
          !(e.sp > 0) &&
          !e.dying &&
          golpeToca(a, e.x - s.w / 2 - 6, ecy(e) - s.h / 2 - 6, e.x + s.w / 2 + 6, ecy(e) + s.h / 2 + 6)
        )
          dmgE(e, dm);
      }
    }
    if (a.t > ATK[a.c].e) p.atk = null;
  }
  jumpReq = false;
  if (p.staWait <= 0) p.sta = Math.min(100, p.sta + 28 * dt * (buf.gal > 0 ? 3 : 1));
  p.x = Math.max(20, Math.min(LEVEL - 20, p.x + p.vx * dt));
  const py = p.y,
    vy0 = p.vy,
    was0 = p.on;
  p.y += p.vy * dt;
  p.on = false;
  for (const pl of platforms)
    if (
      p.vy >= 0 &&
      p.dropT <= 0 &&
      !(pl.st >= 2) &&
      p.x > pl.x - 8 &&
      p.x < pl.x + pl.w + 8 &&
      py <= pl.y + 1 &&
      p.y >= pl.y
    ) {
      p.y = pl.y;
      p.vy = 0;
      p.on = true;
      p.pl = pl;
      if (pl.bn) {
        p.vy = -860;
        p.on = false;
        pl.bt = 0.3;
        sfx('dash');
      }
    }
  if (p.y >= GROUND) {
    p.y = GROUND;
    p.vy = 0;
    p.on = true;
  }
  if (p.on) p.dj = true;
  else p.pl = null;
  if (p.on && !was0 && vy0 > 180) {
    const q = Math.min(1, vy0 / 950);
    p.landT = 0.15;
    puff(p.x, p.y, 4 + Math.round(q * 6), 0);
    animKick(1 + 0.24 * q, 1 - 0.22 * q);
  }
  animTick(dt);
  polishTick(dt, was0, vy0);
  if (p.run && p.on && Math.floor(p.t * 14) != p.dl) {
    p.dl = Math.floor(p.t * 14);
    puff(p.x - p.face * 8, p.y, 1, p.face);
  }
  for (const f of fx) {
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    f.l -= dt;
  }
  fx = fx.filter(f => f.l > 0);
  updEnemies(dt);
  if (buf.ron > 0) {
    p.fire = (p.fire || 0) - dt;
    if (p.fire <= 0) {
      p.fire = 0.5;
      for (const e of enemies)
        if (!(e.sp > 0) && Math.hypot(e.x - p.x, ecy(e) - pcy()) < 95) dmgE(e, 6, true);
      if (B.on && Math.hypot(B.x - p.x, B.y - pcy()) < 130) hitBoss(6);
    }
  }
  if (area == 5) {
    for (let b = 0; b < 2; b++)
      if (!MBD[b] && p.x > MBX[b] - 520) {
        MBD[b] = 1;
        const m = mkE('wboss', MBX[b], GROUND);
        foeInit(m);
        m.hp = b ? 560 : 320;
        m.mhp = m.hp;
        m.sp = 1.2;
        if (b) {
          m.special = 1;
          m.sealed = true;
        }
        enemies.push(m);
        say(
          b
            ? 'El Guardián de la Gema cierra el camino.'
            : 'Algo enorme despierta adelante. Smara: "...eso no es un árbol."',
        );
      }
    while (ENCI < ENC.length && ENC[ENCI].x < p.x + 560) spawnEnc(ENC[ENCI++]);
    enemies = enemies.filter(e => !e.dead);
  }
  if (area == 1) npcSurprise(performance.now() / 1000);
  faseTick(dt); // nueva fase: espiritus y reliquias (27-nueva-fase.js)
  if (area == 1 || area == 5)
    for (const c of CPS)
      if (!c.on && Math.abs(p.x - c.x) < 40) {
        c.on = true;
        CPX = c.x;
        p.hp = Math.min(100, p.hp + 30);
        p.sta = 100;
        say('Punto de descanso: el fuego guarda tu camino.');
        sfx('pick');
        save();
      }
  if (area == 1)
    for (const c of CAMPS) if (Math.abs(p.x - c.x) < 110 && p.hp < 100) p.hp = Math.min(100, p.hp + 10 * dt);
  if (area == 2 && p.x > LEVEL - 70) {
    winText = 'To be continued...';
    state = 'win';
  }
  for (const g of GEMS)
    if (!g.got && Math.abs(g.x - p.x) < 30 && Math.abs(g.y - (p.y - 30)) < 80) {
      g.got = true;
      hasGem = true;
      sfx('boom');
      flashW = 0.5;
      say('¡Gema del Guardián! El obelisco ya puede escucharte.');
      save();
    }
  for (const k of pick)
    if (!k.got && Math.abs(k.x - p.x) < 22 && Math.abs(p.y - (k.y || GROUND)) < 55 && addItem(k.id)) {
      k.got = true;
      save();
      sfx('pick');
      say('Recogiste: ' + ITEMS[k.id].n);
    }
  const la = Math.max(-90, Math.min(90, p.vx * 0.28)),
    target = Math.max(0, Math.min(LEVEL - W, p.x - W / 2 + la));
  cam += (target - cam) * (1 - Math.exp(-4.2 * dt));
  if (area == 3 && !B.on && !B.done) {
    B.wait = (B.wait || 0) + dt;
    if (musOn() ? musTime() >= MUS.BOSS : B.wait > (MUS.loading ? 5 : 2)) startBoss();
  }
  if (B.on) bossAI(dt);
  for (const s of shots) {
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.life -= dt;
    const pr = p.parry > 0,
      near = Math.abs(s.x - p.x) < (pr ? 40 : 14) && Math.abs(s.y - pcy()) < (pr ? 40 : 24);
    if (near && pr && !s.r) {
      s.vx *= -1.3;
      s.vy *= -1.3;
      s.r = 1;
      flashW = 0.1;
      p.sta = Math.min(100, p.sta + 10);
      say('PARRY!');
    } else if (near && !s.r && p.inv <= 0 && p.dash <= 0) {
      hurt(12);
      s.life = 0;
    }
    if (s.r && live && Math.abs(s.x - B.x) < bb.w / 2 && Math.abs(s.y - B.y) < bb.h / 2) {
      hitBoss(18);
      s.life = 0;
    }
  }
  shots = shots.filter(s => s.life > 0);
  for (const o of orbs) {
    o.vy += (o.g || 0) * dt;
    o.x += o.vx * dt;
    o.y += o.vy * dt;
    o.life -= dt;
    const d = Math.hypot(o.x - p.x, o.y - pcy());
    if (p.parry > 0 && d < 46) {
      o.life = 0;
      p.sta = Math.min(100, p.sta + 2);
    } else if (d < 12 && p.inv <= 0 && p.dash <= 0) {
      hurt(8);
      o.life = 0;
    }
  }
  orbs = orbs.filter(
    o => o.life > 0 && o.y < GROUND + 30 && o.y > -30 && o.x > cam - 40 && o.x < cam + W + 40,
  );
  if (p.hp <= 0) {
    state = 'dead';
    p.deadAt = performance.now();
    if (area == 3) musStop(2);
  }
}
function hitBoss(d) {
  if (B.st == 'morph') return;
  sfx('hit');
  if (p.atk || p.dash > 0) hitFX(B.x, B.y, !!(p.atk && p.atk.c == 2));
  if (buf.cac > 0) p.hp = Math.min(100, p.hp + d * 0.3);
  B.hp -= d;
  B.flash = 0.12;
  if (B.hp <= 0) {
    if (!B.ph2) {
      B.ph2 = true;
      B.st = 'morph';
      B.t = 0;
      B.hp = B.max = 220;
      B.open = false;
      B.beam = 0;
      B.bc = 999;
      B.face = 1;
      shots = [];
      flashW = 1.2;
      sfx('boom');
      say('ARLOS despierta: el guardián del cruce que ya no existe');
      musPhase2();
    } else {
      B.on = false;
      B.done = true;
      orbs = [];
      shots = [];
      musOutro();
      startSkyQ();
    }
  }
}

/* ---------- 04-jefe-arlos.js ---------- */
function orb(x, y, a, s) {
  orbs.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 7 });
}
function girlAI(dt) {
  const tx = cam + W * 0.72,
    ty = GROUND - 95 + Math.sin(B.t * 2) * 10;
  B.x += (tx - B.x) * Math.min(1, 3 * dt);
  B.y += (ty - B.y) * Math.min(1, 3 * dt);
  if (B.st == 'morph') {
    B.flash = Math.sin(B.t * 40) > 0 ? 0.1 : 0;
    if (B.t > 0.8) {
      B.st = 'girl';
      B.t = 0;
      B.o = 0;
      B.rg = 0.2;
      B.rn = 2;
      B.ang = 0;
    }
    return;
  }
  B.o -= dt;
  B.rg -= dt;
  B.rn -= dt;
  if (B.o <= 0) {
    B.o = 0.09;
    B.ang += 0.55;
    for (let k = 0; k < 2; k++) orb(B.x, B.y, B.ang + k * Math.PI, 140);
  }
  if (B.rg <= 0) {
    B.rg = 1.7;
    const off = Math.random() * 6;
    for (let k = 0; k < 44; k++) orb(B.x, B.y, (k / 44) * Math.PI * 2 + off, 175);
  }
  if (B.rn <= 0) {
    B.rn = 3.4;
    for (let k = 0; k < 22; k++)
      orbs.push({ x: cam + Math.random() * W, y: -10, vx: 0, vy: 150 + Math.random() * 80, life: 5 });
  }
  if (p.dash > 0 && B.hitCd <= 0 && Math.abs(B.x - p.x) < 36 && Math.abs(B.y - pcy()) < 60) {
    hitBoss(30);
    B.hitCd = 0.5;
  }
}
function hurt(d) {
  const _sx = nearestFoeX();
  if (p.shield > 0 && p.parry <= 0) {
    p.shield--;
    p.inv = 0.6;
    flashW = 0.1;
    say('Escudo de quesillo: quedan ' + p.shield);
    sfx('parry');
    return;
  }
  if (p.parry > 0) {
    p.sta = Math.min(100, p.sta + 20);
    p.inv = 0.5;
    flashW = 0.12;
    say('PARRY!');
    sfx('parry');
    return;
  }
  p.hp -= d;
  p.inv = 1;
  p.hurtT = 0.25;
  sfx('hurt');
  knock(_sx);
}
function bossAI(dt) {
  B.t += dt;
  const fast = B.hp < B.max / 2 ? 1.35 : 1;
  if (B.st == 'enter') {
    B.pt = Math.min(B.t / 1, 1);
    B.a = Math.min(1, B.t / 1.2);
    if (B.t > 0.8) B.x = B.px - 170 * Math.min(1, (B.t - 0.8) / 1.6);
    if (B.t > 2.8) {
      B.st = 'hover';
      B.t = 0;
      state = 'intro';
      iT = 0;
    }
    return;
  }
  if (B.pt > 0) B.pt = Math.max(0, B.pt - dt);
  if (B.ph2) {
    girlAI(dt);
    return;
  }
  const bx = bossBox();
  B.bc -= dt;
  if (B.bc <= 0 && !B.beam) {
    B.beam = 1;
    B.bt = 0;
    B.bc = 999;
  }
  if (B.beam) {
    B.bt += dt;
    if (B.beam == 1 && B.bt > 0.9) {
      B.beam = 2;
      B.bt = 0;
    } else if (B.beam == 2) {
      if (p.inv <= 0 && p.dash <= 0 && beamHit()) hurt(15);
      if (B.bt > 1.5) {
        B.beam = 0;
        B.bc = 5;
      }
    }
  }
  if (B.st == 'hover') {
    const tx = cam + W * 0.68,
      ty = GROUND - 110 + Math.sin(B.t * 3) * 18;
    B.x += (tx - B.x) * Math.min(1, 3 * dt);
    B.y += (ty - B.y) * Math.min(1, 3 * dt);
    B.face = p.x < B.x ? -1 : 1;
    if (B.t > 1.6 / fast) {
      B.t = 0;
      if (Math.random() < 0.5) {
        B.st = 'tele';
        B.side = p.x < cam + W / 2 ? 1 : -1;
        B.sx = B.side > 0 ? cam + W - 60 : cam + 60;
      } else {
        B.st = 'mouth';
        B.fired = 0;
        B.open = true;
      }
    }
  } else if (B.st == 'tele') {
    B.x += (B.sx - B.x) * Math.min(1, 6 * dt);
    B.y += (GROUND - 30 - B.y) * Math.min(1, 6 * dt);
    B.face = -B.side;
    B.x += (Math.random() - 0.5) * 4;
    if (B.t > 0.8) {
      B.st = 'charge';
      B.t = 0;
      B.cdir = -B.side;
    }
  } else if (B.st == 'charge') {
    B.x += B.cdir * 520 * fast * dt;
    B.face = B.cdir;
    if (B.t > 1.5 || B.x < cam - 120 || B.x > cam + W + 120) {
      B.st = 'hover';
      B.t = 0;
    }
  } else if (B.st == 'mouth') {
    B.x += (cam + W * 0.7 - B.x) * Math.min(1, 3 * dt);
    B.y += (GROUND - 70 - B.y) * Math.min(1, 3 * dt);
    B.face = -1;
    const n = Math.floor((B.t - 0.5) / 0.3) + 1;
    while (B.t > 0.5 && B.fired < Math.min(n, 3)) {
      B.fired++;
      const a = Math.atan2(p.y - 30 - B.y, p.x - B.x);
      shots.push({ x: B.x - 40, y: B.y - 10, vx: Math.cos(a) * 260, vy: Math.sin(a) * 260, life: 3, a });
    }
    if (B.t > 1.7 / fast) {
      B.open = false;
      B.st = 'hover';
      B.t = 0;
    }
  }
  if (B.st == 'enter') return;
  const dx = Math.abs(B.x - p.x),
    dy = Math.abs(B.y - pcy());
  if (dx < bx.w / 2 + 10 && dy < bx.h / 2 + 25) {
    if (p.dash > 0) {
      if (B.hitCd <= 0) {
        hitBoss(30);
        B.hitCd = 0.5;
      }
    } else if (p.inv <= 0) hurt(20);
  }
}
function beamPts(n) {
  const cx = cam + W / 2,
    cy = GROUND - 125,
    ph = performance.now() / 700,
    o = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2,
      r = 0.55 + 0.45 * Math.cos(3 * a + ph);
    o.push([cx + 235 * r * Math.cos(a + ph * 0.3), cy + 135 * r * Math.sin(a + ph * 0.3)]);
  }
  return o;
}
function beamHit() {
  const px = p.x,
    py = pcy();
  return beamPts(160).some(([x, y]) => Math.hypot(x - px, y - py) < 16);
}
function drawBeam(t) {
  const pts = beamPts(160),
    a = B.beam == 1 ? 0.3 + 0.2 * Math.sin(t * 30) : Math.max(0, Math.min(1, (1.5 - B.bt) / 0.3));
  const path = o => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => {
      const X = Math.round(x - cam) + (o ? (Math.random() - 0.5) * o : 0),
        Y = y + (o ? (Math.random() - 0.5) * o : 0);
      i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
    });
  };
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = a;
  ctx.lineJoin = 'round';
  if (B.beam == 1) {
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#ff6a2a';
    ctx.lineWidth = 2;
    path(0);
    ctx.stroke();
  } else {
    ctx.shadowColor = '#ff4a10';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#ff4a14';
    ctx.lineWidth = 9;
    path(0);
    ctx.stroke();
    ctx.strokeStyle = '#ffa52e';
    ctx.lineWidth = 5;
    path(0);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#fff1b8';
    ctx.lineWidth = 2;
    path(0);
    ctx.stroke();
    ctx.strokeStyle = '#7ec4ff';
    ctx.lineWidth = 1;
    for (let k = 0; k < 2; k++) {
      path(10);
      ctx.stroke();
    }
    ctx.fillStyle = '#fff';
    for (let i = 0; i < pts.length; i += 40) {
      ctx.beginPath();
      ctx.arc(pts[i][0] - cam, pts[i][1], 3, 0, 7);
      ctx.fill();
    }
  }
  ctx.restore();
}

/* ---------- 05-plataformas-y-monstruo.js ---------- */
function drawPlat() {
  if (area == 1 || area == 5) {
    drawGrass();
    if (area == 5) nightShade();
    return;
  }
  if (!brickP) {
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 14;
    const x = c.getContext('2d');
    x.fillStyle = '#3a3042';
    x.fillRect(0, 0, 16, 14);
    x.fillStyle = '#8b7d86';
    for (let r = 0; r < 2; r++) {
      const o = r ? 4 : 0;
      for (let k = -1; k < 3; k++) x.fillRect(o + k * 8 + 1, r * 7 + 1, 6, 5);
    }
    x.fillStyle = '#b5a8b0';
    x.fillRect(0, 0, 16, 1);
    brickP = ctx.createPattern(c, 'repeat');
  }
  for (const pl of platforms) {
    ctx.save();
    ctx.translate(Math.round(pl.x - cam), pl.y);
    ctx.fillStyle = brickP;
    ctx.fillRect(0, 0, pl.w, 14);
    ctx.fillStyle = '#0004';
    ctx.fillRect(0, 14, pl.w, 3);
    ctx.restore();
  }
}
function drawMon() {
  const im = img.m2,
    w = im.width,
    h = im.height,
    t = performance.now() / 1000,
    N = 14,
    sw = w / N;
  const sp = B.st == 'morph' ? 0.3 + 0.7 * Math.min(1, B.t / 0.8) : 1,
    chg = B.st == 'girl' && B.rg < 0.45 ? (0.45 - B.rg) / 0.45 : 0,
    s = sp * (1 + 0.04 * Math.sin(t * 3) + 0.14 * chg);
  ctx.rotate(Math.sin(t * 1.5) * 0.04);
  for (let i = 0; i < N; i++) {
    const ed = Math.abs(i - N / 2) / (N / 2),
      dy = Math.sin(t * 3 + i * 0.8) * (1.5 + ed * 4);
    ctx.drawImage(im, i * sw, 0, sw, h, (-w / 2 + i * sw) * s, (-h / 2) * s + dy, sw * s + 0.6, h * s);
  }
  ctx.fillStyle = 'rgba(255,50,50,' + (0.25 + chg * 0.75) + ')';
  ctx.beginPath();
  ctx.arc(0.019 * w * s, -0.05 * h * s, (3 + chg * 9) * s, 0, 7);
  ctx.fill();
}

/* ---------- 06-audio-base.js ---------- */
/* ===== AUDIO (todo sintetizado, sin archivos) ===== */
let AC,
  MG,
  NB,
  muted = false,
  ambN = [],
  tickT = 0;
/* MUSB (la opera de Arlos) esta en assets/musica-arlos.js */

/* ---------- 07-musica-arlos.js ---------- */
/* ===== MUSICA DEL JEFE ARLOS (opera) =====
   90 BPM: compas = 2.667 s, primer tiempo fuerte en 2.005 s.
   intro (sube la tension) -> el golpe fuerte en 28.67 s coincide con el inicio de la pelea
   bucle de 24 compases 31.338 s -> 95.338 s con fundido corto (sin clic)
   fase 2: barrido de filtro y salto al inicio del bucle en el siguiente compas
   muerte de ARLOS: cierre suave (111.34 s -> final). Muerte de Smara: se apaga. */
const MUS = {
  buf: null,
  loading: false,
  g: null,
  f: null,
  cur: null,
  old: [],
  vol: 0.85,
  LS: 31.338,
  LE: 95.338,
  OUT: 111.338,
  START: 20.672,
  BOSS: 23.339,
  DROP: 28.672,
  DB: 2.005,
  BAR: 8 / 3,
  pausedAt: null,
};
function musLoad(cb) {
  if (MUS.buf) {
    cb && cb();
    return;
  }
  if (!AC) return;
  if (MUS.loading) {
    MUS.cbs = (MUS.cbs || []).concat(cb ? [cb] : []);
    return;
  }
  MUS.loading = true;
  MUS.cbs = cb ? [cb] : [];
  const b = atob(MUSB),
    u = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
  const ok = buf => {
      MUS.buf = buf;
      MUS.loading = false;
      const c = MUS.cbs;
      MUS.cbs = [];
      c.forEach(f => f());
    },
    bad = () => {
      MUS.loading = false;
      MUS.cbs = [];
    };
  try {
    const pr = AC.decodeAudioData(u.buffer, ok, bad);
    if (pr && pr.catch) pr.catch(bad);
  } catch (e) {
    bad();
  }
}
function musChain() {
  if (MUS.g) return;
  MUS.f = AC.createBiquadFilter();
  MUS.f.type = 'lowpass';
  MUS.f.frequency.value = 18000;
  MUS.f.Q.value = 0.7;
  MUS.g = AC.createGain();
  MUS.g.gain.value = 0;
  MUS.f.connect(MUS.g);
  MUS.g.connect(MG);
}
function musSrc(at, off, loop) {
  const s = AC.createBufferSource();
  s.buffer = MUS.buf;
  const g = AC.createGain();
  g.gain.value = 0;
  s.connect(g);
  g.connect(MUS.f);
  s.start(Math.max(AC.currentTime, at), Math.max(0, off));
  return { s, g, startAt: at, off, loop, sched: false };
}
function musCross(at, off, loop, xf) {
  xf = xf || 0.08;
  const h = xf / 2,
    n = musSrc(at - h, off - h, loop);
  n.startAt = at;
  n.off = off;
  n.g.gain.setValueAtTime(0, Math.max(AC.currentTime, at - h));
  n.g.gain.linearRampToValueAtTime(1, at + h);
  const o = MUS.cur;
  if (o) {
    o.g.gain.cancelScheduledValues(at - h);
    o.g.gain.setValueAtTime(1, Math.max(AC.currentTime, at - h));
    o.g.gain.linearRampToValueAtTime(0, at + h);
    try {
      o.s.stop(at + h + 0.05);
    } catch (e) {}
  }
  MUS.cur = n;
  return n;
}
function musTime() {
  const c = MUS.cur;
  if (!c || !AC) return -1;
  return c.off + (AC.currentTime - c.startAt);
}
function musOn() {
  return !!MUS.cur;
}
function musMaster(v, d) {
  const now = AC.currentTime,
    g = MUS.g.gain;
  g.cancelScheduledValues(now);
  g.setValueAtTime(g.value, now);
  g.linearRampToValueAtTime(v, now + (d || 0.01));
}
function musFilter(fq, d) {
  const now = AC.currentTime,
    f = MUS.f.frequency;
  f.cancelScheduledValues(now);
  f.setValueAtTime(f.value, now);
  f.exponentialRampToValueAtTime(fq, now + (d || 0.01));
}
function musPlay(off, fade) {
  if (!AC) return;
  MUS.pausedAt = null;
  musLoad(() => {
    musChain();
    musKill();
    const now = AC.currentTime + 0.04;
    musCross(now, off, true, 0.02);
    musFilter(18000, 0.05);
    MUS.g.gain.setValueAtTime(0, AC.currentTime);
    musMaster(MUS.vol, fade || 0.8);
  });
}
function musKill() {
  for (const c of [MUS.cur]) {
    if (c) {
      try {
        c.s.stop();
      } catch (e) {}
    }
  }
  MUS.cur = null;
}
function musStop(d) {
  if (!MUS.cur || !AC) return;
  d = d || 1.2;
  musMaster(0, d);
  musFilter(600, d);
  const c = MUS.cur;
  setTimeout(
    () => {
      if (MUS.cur === c) {
        musKill();
      }
    },
    d * 1000 + 80,
  );
}
function musTick() {
  const c = MUS.cur;
  if (!c || !AC || !c.loop || c.sched) return;
  const endAt = c.startAt + (MUS.LE - c.off);
  if (c.off < MUS.LE && AC.currentTime > endAt - 0.6) {
    c.sched = true;
    musCross(endAt, MUS.LS, true, 0.09);
  }
}
function musNextBar(minAhead) {
  const p = musTime();
  let nb = MUS.DB + Math.ceil((p - MUS.DB) / MUS.BAR + 1e-4) * MUS.BAR;
  while (nb - p < (minAhead || 0)) nb += MUS.BAR;
  return AC.currentTime + (nb - p);
}
function musPhase2() {
  if (!musOn()) return;
  musFilter(420, 0.25);
  const at = musNextBar(0.9);
  setTimeout(
    () => {
      if (musOn()) musFilter(18000, 0.35);
    },
    Math.max(0, (at - AC.currentTime) * 1000 - 40),
  );
  musCross(at, MUS.LS, true, 0.12);
  const g = MUS.g.gain,
    now = AC.currentTime;
  g.cancelScheduledValues(now);
  g.setValueAtTime(g.value, now);
  g.linearRampToValueAtTime(MUS.vol * 0.55, now + 0.25);
  g.setValueAtTime(MUS.vol * 0.55, at - 0.05);
  g.linearRampToValueAtTime(Math.min(1, MUS.vol * 1.08), at + 0.15);
}
function musOutro() {
  if (!musOn()) return;
  const p = musTime(),
    beat = MUS.BAR / 4;
  let nb = MUS.DB + Math.ceil((p - MUS.DB) / beat + 1e-4) * beat;
  const at = AC.currentTime + (nb - p);
  musCross(at, MUS.OUT, false, 0.35);
  musFilter(2600, 3);
  const c = MUS.cur;
  setTimeout(
    () => {
      if (MUS.cur === c) MUS.cur = null;
    },
    (at - AC.currentTime + 120 - MUS.OUT) * 1000,
  );
}
function musPause() {
  if (!musOn()) return;
  MUS.pausedAt = musTime();
  musStop(0.25);
}
function musResume() {
  if (MUS.pausedAt == null) return;
  const p = MUS.pausedAt;
  MUS.pausedAt = null;
  if (p > MUS.LE) return;
  musPlay(p, 0.4);
}

/* ---------- 08-musica-por-zona.js ---------- */
/* ===== MUSICA POR ZONA (compuesta en codigo con Web Audio) =====
   menu: tema de Mulukuku · cabaña: canción de cuna · puerta: flauta en la niebla
   ribera (dia): son en 6/8 con marimba · noche: los Duhindu silban · blanco: piano del Errante
   cielo de Prahaku: campanas y marimba en lidio.  La pelea con Arlos usa su opera (MUS). */
const ZM = { cur: null, want: null, next: 0, step: 0, bus: null, dly: null, vol: 0.8, duck: 1, inten: 0 };
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
function zmInit() {
  if (ZM.bus || !AC) return;
  ZM.bus = AC.createGain();
  ZM.bus.gain.value = ZM.vol;
  ZM.bus.connect(MG);
  const d = AC.createDelay(1.2);
  d.delayTime.value = 0.36;
  const fb = AC.createGain();
  fb.gain.value = 0.32;
  const lp = AC.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2600;
  ZM.dly = AC.createGain();
  ZM.dly.gain.value = 0.5;
  ZM.dly.connect(d);
  d.connect(lp);
  lp.connect(fb);
  fb.connect(d);
  lp.connect(ZM.bus);
}
function zv(dst, t, f, type, a, dec, g, o) {
  o = o || {};
  const os = AC.createOscillator();
  os.type = type;
  os.frequency.setValueAtTime(f, t);
  if (o.glide) os.frequency.exponentialRampToValueAtTime(o.glide, t + (o.gt || dec));
  if (o.vib) {
    const l = AC.createOscillator(),
      lg = AC.createGain();
    l.frequency.value = o.vib;
    lg.gain.value = f * 0.012;
    l.connect(lg);
    lg.connect(os.frequency);
    l.start(t);
    l.stop(t + a + dec + 0.1);
  }
  const gn = AC.createGain();
  gn.gain.setValueAtTime(0.0001, t);
  gn.gain.linearRampToValueAtTime(g, t + a);
  gn.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  let last = gn;
  if (o.lp) {
    const fl = AC.createBiquadFilter();
    fl.type = 'lowpass';
    fl.frequency.value = o.lp;
    gn.connect(fl);
    last = fl;
  }
  if (o.pan && AC.createStereoPanner) {
    const pn = AC.createStereoPanner();
    pn.pan.value = o.pan;
    last.connect(pn);
    last = pn;
  }
  os.connect(gn);
  last.connect(dst);
  if (o.send) last.connect(ZM.dly);
  os.start(t);
  os.stop(t + a + dec + 0.05);
}
function znoise(dst, t, f, q, dec, g, type) {
  const s = AC.createBufferSource();
  s.buffer = NB || (NB = nz());
  const fl = AC.createBiquadFilter();
  fl.type = type || 'bandpass';
  fl.frequency.value = f;
  fl.Q.value = q || 1;
  const gn = AC.createGain();
  gn.gain.setValueAtTime(g, t);
  gn.gain.exponentialRampToValueAtTime(0.0001, t + dec);
  s.connect(fl);
  fl.connect(gn);
  gn.connect(dst);
  s.start(t, Math.random() * 1.5);
  s.stop(t + dec + 0.02);
}
// instrumentos
const I_ = {
  marimba: (d, t, m, g, s) => {
    const f = mtof(m);
    zv(d, t, f, 'sine', 0.002, 0.42, g, { send: s });
    zv(d, t, f * 4, 'sine', 0.001, 0.07, g * 0.35);
    zv(d, t, f * 10, 'sine', 0.001, 0.025, g * 0.12);
  },
  bass: (d, t, m, g) => {
    zv(d, t, mtof(m), 'triangle', 0.005, 0.55, g);
    zv(d, t, mtof(m) * 2, 'sine', 0.005, 0.2, g * 0.25);
  },
  pad: (d, t, ms, dur, g) => {
    for (const m of ms) {
      zv(d, t, mtof(m), 'sawtooth', dur * 0.35, dur * 0.9, g, { lp: 900 });
      zv(d, t, mtof(m) * 1.004, 'triangle', dur * 0.35, dur * 0.9, g * 0.8);
    }
  },
  flute: (d, t, m, dur, g) => {
    zv(d, t, mtof(m), 'sine', 0.09, dur, g, { vib: 5.2, send: 1 });
    znoise(d, t, mtof(m) * 2, 4, 0.12, g * 0.2);
  },
  bell: (d, t, m, g) => {
    const f = mtof(m);
    zv(d, t, f, 'sine', 0.002, 1.6, g, { send: 1 });
    zv(d, t, f * 2.76, 'sine', 0.002, 0.5, g * 0.3);
    zv(d, t, f * 5.4, 'sine', 0.001, 0.18, g * 0.12);
  },
  piano: (d, t, m, g, pan) => {
    const f = mtof(m);
    zv(d, t, f, 'triangle', 0.003, 1.9, g, { send: 1, pan });
    zv(d, t, f * 2, 'sine', 0.003, 0.8, g * 0.25, { pan });
  },
  box: (d, t, m, g) => {
    const f = mtof(m);
    zv(d, t, f, 'sine', 0.001, 0.9, g, { send: 1 });
    zv(d, t, f * 3, 'sine', 0.001, 0.25, g * 0.25);
  },
  shaker: (d, t, g) => znoise(d, t, 6500, 1.2, 0.05, g, 'highpass'),
  wood: (d, t, g) => {
    zv(d, t, 820, 'sine', 0.001, 0.06, g);
    znoise(d, t, 2400, 4, 0.02, g * 0.5);
  },
  conga: (d, t, m, g) => zv(d, t, mtof(m), 'sine', 0.002, 0.22, g, { glide: mtof(m) * 0.85, gt: 0.2 }),
  kick: (d, t, g) => zv(d, t, 120, 'sine', 0.002, 0.32, g, { glide: 42, gt: 0.25 }),
  clave: (d, t, g) => zv(d, t, 2500, 'sine', 0.001, 0.05, g),
  whistle: (d, t, g) => {
    const p = (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.5),
      b = 1700 + Math.random() * 500;
    zv(d, t, b, 'sine', 0.04, 0.32, g, { glide: b * 1.45, gt: 0.18, pan: p, send: 1 });
    zv(d, t + 0.42, b * 1.3, 'sine', 0.03, 0.38, g * 0.85, { glide: b * 0.92, gt: 0.3, pan: p, send: 1 });
  },
};
// pistas: cada una define pasos por compas, segundos por paso y que suena en cada paso
const TRK = {
  menu: {
    spb: 16,
    sec: 60 / 76 / 4,
    bars: 8,
    fn(d, t, bar, s) {
      const P = [
          [62, 65, 69, 72],
          [60, 64, 67, 72],
          [58, 62, 65, 69],
          [57, 61, 64, 69],
        ],
        c = P[bar % 4],
        ar = [0, 1, 2, 3, 2, 1, 2, 1];
      if (s % 2 == 0) I_.marimba(d, t, c[ar[(s / 2) % 8]] + 12, 0.1, 1);
      if (s == 0) {
        I_.pad(d, t, c, 2.6, 0.022);
        I_.bass(d, t, c[0] - 24, 0.2);
      }
      if (s == 8) I_.bass(d, t, c[0] - 17, 0.13);
      const M = [
        [0, 74, 4],
        [4, 72, 2],
        [6, 69, 2],
        [8, 72, 6],
        [0, 76, 6],
        [6, 74, 2],
        [8, 72, 4],
        [12, 69, 4],
        [0, 70, 4],
        [4, 72, 4],
        [8, 74, 8],
        [0, 73, 8],
        [8, 76, 8],
      ];
      const mel =
        bar < 4
          ? [
              [0, 74, 6],
              [8, 72, 6],
            ]
          : [
              [0, 77, 4],
              [4, 76, 4],
              [8, 74, 8],
            ];
      for (const [st, m, l] of mel) if (st == s) I_.flute(d, t, m, l * this.sec * 0.95, 0.05);
    },
  },
  room: {
    spb: 12,
    sec: 60 / 66 / 4,
    bars: 4,
    fn(d, t, bar, s) {
      const C = [
          [65, 69, 72],
          [70, 74, 77],
          [72, 76, 79],
          [65, 69, 72],
        ][bar],
        ar = [0, 1, 2, 1, 2, 1];
      if (s % 2 == 0) I_.box(d, t, C[ar[s / 2]] + 12, 0.045);
      const mel = [
          [72, 0],
          [74, 4],
          [76, 8],
        ],
        m2 = [
          [77, 0],
          [76, 6],
        ];
      for (const [m, st] of bar % 2 ? m2 : mel) if (st == s) I_.box(d, t, m + 12, 0.05);
      if (s == 0) I_.bass(d, t, C[0] - 24, 0.08);
    },
  },
  gate: {
    spb: 8,
    sec: 60 / 58 / 2,
    bars: 4,
    fn(d, t, bar, s) {
      if (s == 0) {
        I_.pad(d, t, [45, 52, 57, 60], 4.5, 0.035);
        if (bar % 2 == 0) I_.bell(d, t, 45 + 12, 0.12);
      }
      if (s % 2 == 0) I_.clave(d, t, 0.02);
      const ph = [
          [2, 69, 3],
          [5, 72, 2],
          [7, 71, 1],
        ],
        ph2 = [
          [1, 76, 2],
          [3, 74, 2],
          [6, 72, 3],
        ];
      for (const [st, m, l] of bar % 2 ? ph2 : ph) if (st == s) I_.flute(d, t, m, l * this.sec, 0.08);
    },
  },
  forest: {
    spb: 6,
    sec: 0.27,
    bars: 8,
    fn(d, t, bar, s) {
      const prog = [
          [55, 59, 62],
          [60, 64, 67],
          [62, 66, 69],
          [55, 59, 62],
          [52, 55, 59],
          [60, 64, 67],
          [62, 66, 69],
          [62, 66, 69],
        ],
        c = prog[bar];
      const camp = ZM.inten < 0;
      const mel = [
          [0, 74],
          [2, 71],
          [3, 74],
          [4, 76],
          [5, 74],
        ],
        mel2 = [
          [0, 79],
          [1, 78],
          [2, 76],
          [3, 74],
          [5, 71],
        ],
        mel3 = [
          [0, 72],
          [2, 76],
          [3, 79],
          [4, 76],
        ],
        mel4 = [
          [0, 74],
          [3, 78],
          [4, 81],
          [5, 78],
        ];
      const M = [mel, mel3, mel4, mel2, mel, mel3, mel4, mel4][bar];
      for (const [st, m] of M)
        if (st == s) {
          I_.marimba(d, t, m, 0.11, 1);
          I_.marimba(d, t, m - (m % 12 == 2 || m % 12 == 7 ? 4 : 3), 0.06);
        }
      if (s == 0 || s == 3) I_.bass(d, t, c[0] - 12 - (s == 3 ? -7 : 0), 0.16);
      if (s == 1 || s == 4 || s == 5) I_.marimba(d, t, c[(s + bar) % 3] + 12, 0.04);
      if (!camp) {
        I_.shaker(d, t, s == 0 || s == 3 ? 0.05 : 0.025);
        if (s == 2 || s == 5) I_.wood(d, t, 0.05);
        if (s == 0) I_.conga(d, t, 50, 0.16);
        if (s == 3) I_.conga(d, t, 55, 0.11);
      }
    },
  },
  night: {
    spb: 8,
    sec: 60 / 84 / 2,
    bars: 8,
    fn(d, t, bar, s) {
      const B = [40, 40, 41, 40, 43, 41, 40, 38],
        G = ZM.inten > 0;
      I_.bass(d, t, B[s] - 12 + (bar % 4 == 3 ? 5 : 0), 0.15);
      if (s == 0) {
        I_.pad(d, t, bar % 2 ? [52, 55, 59] : [53, 57, 60], 3.2, 0.016);
        I_.kick(d, t, 0.3);
      }
      if (s == 3) I_.kick(d, t, 0.2);
      if (bar % 2 == 1 && s == 4) {
        I_.marimba(d, t, 76, 0.07, 1);
        I_.marimba(d, t, 77, 0.05, 1);
      }
      if (bar % 4 == 2 && s == 6) I_.flute(d, t, 71, 0.9, 0.035);
      if (G) {
        I_.shaker(d, t, 0.03);
        if (s % 2 == 0) I_.kick(d, t, 0.22);
        if (s == 2 || s == 6) I_.conga(d, t, 47, 0.15);
        if (s == 7) I_.conga(d, t, 52, 0.12);
      } else if (s == 2 || s == 6) I_.clave(d, t, 0.012);
      if (s == 0 && Math.random() < 0.22) I_.whistle(d, t + Math.random() * 0.6, 0.045);
    },
  },
  white: {
    spb: 4,
    sec: 0.5,
    bars: 8,
    fn(d, t, bar, s) {
      const N = [60, 64, 66, 67, 71, 72, 74, 76, 79];
      if ((s == 0 && bar % 2 == 0) || Math.random() < 0.12) {
        const m = N[Math.floor(Math.random() * N.length)];
        I_.piano(d, t, m, 0.13, Math.random() * 0.8 - 0.4);
      }
      if (s == 0 && bar % 4 == 0) I_.piano(d, t, 48, 0.11, 0);
    },
  },
};
function zmWant() {
  if (
    state == 'cine' ||
    state == 'newdata' ||
    state == 'void' ||
    state == 'rewind' ||
    state == 'skyq' ||
    state == 'portalfx' ||
    state == 'tele'
  )
    return null;
  if (state == 'meet') return 'white';
  if (state == 'menu' || state == 'exit' || state == 'cust') return 'menu';
  if (state == 'room' || (state == 'letter' && area == 0)) return 'room';
  if (state == 'gate' || area == 4) return 'gate';
  if (area == 1) return 'forest';
  if (area == 5) return 'night';
  return null;
}
function zmTick() {
  if (!AC || !MG) return;
  zmInit();
  const w = zmWant();
  if (w !== ZM.want) {
    ZM.want = w;
    if (ZM.cur) {
      const g = ZM.cur.g;
      g.gain.cancelScheduledValues(AC.currentTime);
      g.gain.setValueAtTime(g.gain.value, AC.currentTime);
      g.gain.linearRampToValueAtTime(0, AC.currentTime + 1.4);
      const old = g;
      setTimeout(() => {
        try {
          old.disconnect();
        } catch (e) {}
      }, 2500);
    }
    ZM.cur = null;
    if (w) {
      const g = AC.createGain();
      g.gain.setValueAtTime(0, AC.currentTime);
      g.gain.linearRampToValueAtTime(1, AC.currentTime + 1.6);
      g.connect(ZM.bus);
      ZM.cur = { k: w, g, bar: 0, step: 0, next: AC.currentTime + 0.08 };
    }
  }
  // intensidad segun la situacion
  ZM.inten = 0;
  if (area == 1 && typeof CAMPS != 'undefined' && CAMPS.some(c => Math.abs(p.x - c.x) < 240)) ZM.inten = -1;
  if (area == 5 && enemies.some(e => e.t == 'wboss' && !e.dying && !(e.sp > 0) && Math.abs(e.x - p.x) < 700))
    ZM.inten = 1;
  const dk = state == 'dead' ? 0.35 : state == 'talk' ? 0.6 : 1;
  ZM.bus.gain.setTargetAtTime(muted ? 0 : ZM.vol * dk, AC.currentTime, 0.3);
  const c = ZM.cur;
  if (!c) return;
  const T = TRK[c.k];
  if (c.next < AC.currentTime - 0.3) c.next = AC.currentTime + 0.05;
  while (c.next < AC.currentTime + 0.22) {
    try {
      T.fn(c.g, c.next, c.bar, c.step);
    } catch (e) {}
    c.next += T.sec;
    if (++c.step >= T.spb) {
      c.step = 0;
      c.bar = (c.bar + 1) % T.bars;
    }
  }
}

/* ---------- 09-duskclaw.js ---------- */
/* ===== DUSKCLAW: monstruos de la noche (sprite articulado por piezas del .aseprite) ===== */
const DKM = {
  'back-arm': { sx: 0, w: 10, h: 19, x: 24, y: 17, piv: [27.5, 18.0] },
  legL: { sx: 11, w: 9, h: 12, x: 15, y: 27, piv: null },
  legR: { sx: 21, w: 8, h: 12, x: 24, y: 27, piv: null },
  upper: { sx: 30, w: 18, h: 27, x: 12, y: 0, piv: null },
  pants: { sx: 49, w: 19, h: 13, x: 13, y: 22, piv: null },
  'front-arm': { sx: 69, w: 10, h: 21, x: 10, y: 16, piv: [15.0, 17.0] },
  coat: { sx: 80, w: 21, h: 10, x: 10, y: 9, piv: null },
  anchor: [21.5, 39.0],
};
const DUSK = {
  dusk: { n: 'Garra del Ocaso', hp: 42, sc: 1.5, spd: 72, pal: null },
  duskS: {
    n: 'Sombra Duskclaw',
    hp: 34,
    sc: 1.5,
    spd: 96,
    pal: { eye: [236, 72, 96], c1: [46, 32, 64], c2: [80, 56, 108], cl: [240, 224, 255] },
  },
  duskL: {
    n: 'Duskclaw Lanzador',
    hp: 30,
    sc: 1.5,
    spd: 62,
    pal: { eye: [110, 226, 246], c1: [30, 48, 72], c2: [56, 86, 116], cl: [206, 236, 255] },
  },
  duskB: {
    n: 'Duskclaw Bruto',
    hp: 96,
    sc: 2,
    spd: 46,
    pal: { eye: [246, 172, 60], c1: [72, 38, 30], c2: [112, 62, 44], cl: [238, 218, 180] },
  },
};
for (const k in DUSK) ET[k] = { hp: DUSK[k].hp, i: 'dkp' };
const DKC = {};
function dkRecolor(im, pal) {
  const c = document.createElement('canvas');
  c.width = im.width;
  c.height = im.height;
  const x = c.getContext('2d');
  x.drawImage(im, 0, 0);
  if (!pal) return c;
  const d = x.getImageData(0, 0, c.width, c.height),
    a = d.data;
  for (let i = 0; i < a.length; i += 4) {
    if (!a[i + 3]) continue;
    const r = a[i],
      g = a[i + 1],
      b = a[i + 2];
    let n = null;
    if (r == 126 && g == 198 && b == 134) n = pal.eye;
    else if (r == 43 && g == 56 && b == 56) n = pal.c1;
    else if (r == 63 && g == 82 && b == 77) n = pal.c2;
    else if (r > 220 && g > 220 && b > 220) n = pal.cl;
    if (n) {
      a[i] = n[0];
      a[i + 1] = n[1];
      a[i + 2] = n[2];
    }
  }
  x.putImageData(d, 0, 0);
  return c;
}
function dkSheets(t) {
  if (!DKC[t]) {
    const P = DUSK[t].pal;
    DKC[t] = { parts: dkRecolor(img.dkp, P), idle: dkRecolor(img.dki, P) };
  }
  return DKC[t];
}
const dkEye = t => {
  const p = DUSK[t].pal;
  return p ? p.eye : [126, 198, 134];
};
// dibuja una pieza en coordenadas del sprite (origen = pies)
function dkPart(sh, n, dx, dy, rot) {
  const m = DKM[n],
    ax = DKM.anchor[0],
    ay = DKM.anchor[1];
  if (rot) {
    const [px, py] = m.piv;
    ctx.save();
    ctx.translate(px - ax + dx, py - ay + dy);
    ctx.rotate(rot);
    ctx.drawImage(sh, m.sx, 0, m.w, m.h, m.x - px, m.y - py, m.w, m.h);
    ctx.restore();
  } else ctx.drawImage(sh, m.sx, 0, m.w, m.h, Math.round(m.x - ax + dx), Math.round(m.y - ay + dy), m.w, m.h);
}
function dkRig(sh, P) {
  const b = P.bob || 0;
  dkPart(sh, 'back-arm', 0, b, P.ba || 0);
  dkPart(sh, 'legL', P.lx || 0, -(P.ly || 0), 0);
  dkPart(sh, 'legR', -(P.lx || 0), -(P.ry || 0), 0);
  dkPart(sh, 'upper', 0, b, 0);
  dkPart(sh, 'pants', P.sw || 0, b * 0.5, 0);
  dkPart(sh, 'front-arm', 0, b, P.fa || 0);
  dkPart(sh, 'coat', 0, b, 0);
}
function dkClawTip(e, P) {
  const m = DKM['front-arm'],
    [px, py] = m.piv,
    ax = DKM.anchor[0],
    ay = DKM.anchor[1],
    L = 18,
    a = P.fa || 0;
  const S = DUSK[e.t].sc,
    f = e.dir;
  return {
    x: e.x + f * S * (px - ax - Math.sin(a) * L),
    y: e.y + S * (py - ay + (P.bob || 0) + Math.cos(a) * L),
  };
}
/* ---------- IA ---------- */
function duskAI(e, dt, dx, ad, sg) {
  const D = DUSK[e.t],
    T = e.t;
  e.ft = (e.ft || 0) + dt;
  e.at = (e.at || 0) + dt;
  if (e.hitT > 0) e.hitT -= dt;
  if (e.dying) {
    e.dt += dt;
    for (const q of e.bits || []) {
      q.vy += 700 * dt;
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.r += q.vr * dt;
      if (q.y > GROUND - 4) {
        q.y = GROUND - 4;
        q.vy *= -0.3;
        q.vx *= 0.6;
        q.vr *= 0.5;
      }
    }
    if (e.dt > 1.3) e.dead = 1;
    return true;
  }
  if (!e.mode || (e.mode == 'move' && e.st0 === undefined)) {
    e.mode = 'idle';
    e.st0 = 1;
    e.dir = sg;
    e.wk = 0;
  }
  const near = ad < 520 && Math.abs(pcy() - (e.y - 30)) < 160;
  if (e.mode != 'atk' && e.mode != 'wind' && e.mode != 'charge' && e.mode != 'fade' && e.mode != 'appear')
    e.dir = sg;
  const go = v => {
    e.x += v * dt;
    e.wk += (Math.abs(v) * dt) / 9;
  };
  if (e.hitT > 0 && T != 'duskB') {
    e.x += -e.dir * 80 * dt * (e.hitT / 0.25);
    return false;
  }
  switch (e.mode) {
    case 'idle':
      if (near) {
        e.mode = 'walk';
        e.at = 0;
        e.alert = 0.7;
        sfx('swing');
      } else if (Math.random() < dt * 0.15 && !e.brk) {
        e.brk = e.ft;
      }
      if (e.brk && e.ft - e.brk > 1.6) e.brk = 0;
      break;
    case 'walk': {
      const want = T == 'duskL' ? 260 : T == 'duskS' ? 190 : T == 'duskB' ? 120 : 64;
      if (!near && ad > 640) {
        e.mode = 'idle';
        break;
      }
      if (T == 'duskL') {
        if (ad < want - 50) go(-sg * D.spd);
        else if (ad > want + 40) go(sg * D.spd);
      } else if (ad > want) go(sg * D.spd * (ad > 260 ? 1.15 : 1));
      if (e.cd <= 0 && ad < want + 60) {
        if (T == 'duskS') {
          e.mode = 'fade';
          e.at = 0;
          sfx('dash');
        } else if (T == 'duskB') {
          e.mode = Math.random() < 0.5 ? 'charge' : 'jump';
          e.at = 0;
          e.hd = 0;
          if (e.mode == 'charge') sfx('rumble');
        } else {
          e.mode = 'wind';
          e.at = 0;
          e.hd = 0;
          e.combo = T == 'dusk' && Math.random() < 0.4 ? 2 : 1;
        }
      }
      break;
    }
    case 'wind':
      if (e.at > (T == 'duskL' ? 0.5 : 0.38)) {
        e.mode = 'atk';
        e.at = 0;
        sfx('swing');
        if (T == 'duskL') {
          const a = Math.atan2(pcy() - (e.y - 40), dx);
          for (let k = -1; k <= 1; k += 2 - (e.combo > 1 ? 1 : 0)) {
            eo(
              e.x + e.dir * 10,
              e.y - 40,
              Math.cos(a + k * 0.14) * 190,
              Math.sin(a + k * 0.14) * 190 - 70,
              'k',
              2.4,
              260,
            );
          }
        }
      }
      break;
    case 'atk':
      if (T != 'duskL' && e.at < 0.18) {
        e.x += e.dir * 150 * dt;
        if (!e.hd && ad < 62 && Math.abs(pcy() - (e.y - 28)) < 60 && p.inv <= 0 && p.dash <= 0) {
          e.hd = 1;
          hurt(T == 'duskS' ? 12 : 11);
        }
      }
      if (e.at > (T == 'duskL' ? 0.35 : 0.42)) {
        if (e.combo > 1) {
          e.combo--;
          e.mode = 'wind';
          e.at = 0.18;
          e.hd = 0;
        } else {
          e.mode = 'rec';
          e.at = 0;
        }
      }
      break;
    case 'rec':
      if (T == 'duskS') {
        go(-sg * 140);
      }
      if (e.at > 0.55) {
        e.mode = 'walk';
        e.cd = 1.2 + Math.random() * 1.1;
      }
      break;
    case 'fade':
      e.al = Math.max(0.08, 1 - e.at / 0.35);
      if (e.at > 0.45) {
        e.x = Math.max(e.x0, Math.min(e.x1, p.x - p.face * 58));
        e.dir = Math.sign(p.x - e.x) || 1;
        e.mode = 'appear';
        e.at = 0;
        sfx('dash');
      }
      break;
    case 'appear':
      e.al = Math.min(1, e.at / 0.2);
      if (e.at > 0.22) {
        e.mode = 'atk';
        e.at = 0;
        e.hd = 0;
        e.combo = 1;
        sfx('swing');
      }
      break;
    case 'charge':
      if (e.at < 0.55) {
        e.shk = 1;
      } else if (e.at < 1.2) {
        e.shk = 0;
        e.x += e.dir * 330 * dt;
        if (Math.random() < dt * 30)
          pfx(e.x - e.dir * 14, GROUND - 2, -e.dir * rnd(40, 120), -rnd(10, 60), 0.4, '#3a3440', 3, 300);
        if (!e.hd && ad < 46 && Math.abs(pcy() - (e.y - 40)) < 70 && p.inv <= 0 && p.dash <= 0) {
          e.hd = 1;
          hurt(18);
          knock(e.x);
        }
      } else {
        e.mode = 'rec';
        e.at = 0;
      }
      break;
    case 'jump':
      if (e.at < 0.35) {
        e.shk = 0.6;
      } else if (!e.air) {
        e.air = 1;
        e.vy = -560;
        e.vx = (p.x - e.x) * 1.2;
        e.shk = 0;
        sfx('dash');
      }
      if (e.air) {
        e.vy += 1500 * dt;
        e.y += e.vy * dt;
        e.x += e.vx * dt;
        if (e.y >= e.by) {
          e.y = e.by;
          e.air = 0;
          e.mode = 'rec';
          e.at = 0;
          sfx('boom');
          SHK = Math.max(SHK || 0, 5);
          for (const s of [-1, 1]) eo(e.x + s * 20, GROUND - 30, s * 230, 0, 'w', 1.2);
          for (let i = 0; i < 14; i++)
            pfx(
              e.x + rnd(-30, 30),
              GROUND - 2,
              rnd(-140, 140),
              -rnd(30, 160),
              0.5,
              i % 2 ? '#2b2530' : '#6b5a50',
              3,
              500,
            );
        }
      }
      break;
  }
  if (e.mode == 'atk' || e.mode == 'charge' || e.mode == 'jump') return false;
  return false;
}
/* ---------- dibujo ---------- */
function duskPose(e, t) {
  const T = e.t,
    P = {};
  const ph = e.wk || 0;
  if (e.mode == 'walk' || (e.mode == 'rec' && T == 'duskS')) {
    P.lx = Math.cos(ph) * 1.4;
    P.ly = Math.max(0, Math.sin(ph)) * 2;
    P.ry = Math.max(0, -Math.sin(ph)) * 2;
    P.bob = -Math.abs(Math.sin(ph)) * 1;
    P.ba = Math.sin(ph) * 0.35;
    P.fa = -Math.sin(ph) * 0.3;
    P.sw = Math.round(Math.sin(ph));
  }
  if (e.mode == 'wind') {
    const k = Math.min(1, e.at / 0.35);
    P.fa = k * 2.3;
    P.ba = -k * 0.5;
    P.bob = k * 1;
  }
  if (e.mode == 'atk') {
    const k = Math.min(1, e.at / 0.14);
    P.fa = 2.3 - k * 4;
    P.ba = 0.4;
    P.bob = -1;
  }
  if (e.mode == 'charge') {
    P.fa = -1.2;
    P.ba = -1;
    P.bob = 1;
    if (e.at > 0.55) {
      P.lx = Math.cos(t * 30) * 2;
      P.ly = Math.max(0, Math.sin(t * 30)) * 2;
      P.ry = Math.max(0, -Math.sin(t * 30)) * 2;
    }
  }
  if (e.mode == 'jump') {
    P.fa = e.air ? -2.4 : 0.6;
    P.ba = e.air ? 2.4 : -0.6;
    P.bob = e.air ? -1 : 2;
  }
  if (e.hitT > 0) {
    P.fa = (P.fa || 0) + 0.6;
    P.bob = 1;
  }
  return P;
}
function drawDusk(e, t) {
  const D = DUSK[e.t],
    S = D.sc,
    sh = dkSheets(e.t),
    x = Math.round(e.x - cam);
  if (x < -80 || x > W + 80) return;
  // charco de sombra al aparecer
  if (e.sp > 0) {
    const k = 1 - e.sp / 0.8;
    ctx.fillStyle = 'rgba(8,6,14,' + 0.7 * Math.min(1, k * 2) + ')';
    ctx.beginPath();
    ctx.ellipse(x, e.y, 24 * Math.min(1, k * 1.6), 5, 0, 0, 7);
    ctx.fill();
  }
  if (e.dying) {
    const k = e.dt / 1.3;
    for (const q of e.bits || []) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - k * 1.1);
      ctx.translate(Math.round(q.x - cam), Math.round(q.y));
      ctx.rotate(q.r);
      ctx.scale(S * e.dir, S);
      const m = DKM[q.n];
      ctx.drawImage(sh.parts, m.sx, 0, m.w, m.h, -m.w / 2, -m.h / 2, m.w, m.h);
      ctx.restore();
    }
    const ec = dkEye(e.t);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(' + ec + ',' + Math.max(0, 0.8 - k) + ')';
    pdisc(x, Math.round(e.y - (60 * S) / 1.5 - k * 60), 3 + k * 6);
    ctx.restore();
    return;
  }
  const rise = e.sp > 0 ? Math.round(39 * S * (e.sp / 0.8)) : 0;
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  ctx.beginPath();
  ctx.ellipse(x, e.y + 1, 10 * S, 2.5 * S, 0, 0, 7);
  ctx.fill();
  ctx.save();
  if (rise) {
    ctx.beginPath();
    ctx.rect(x - 60, e.y - 120, 120, 120);
    ctx.clip();
  }
  const al = (e.al == null ? 1 : e.al) * (e.sp > 0 ? 1 - (e.sp / 0.8) * 0.4 : 1);
  ctx.globalAlpha = al;
  const shk = e.shk ? (Math.random() - 0.5) * 2 * e.shk : 0;
  ctx.translate(x + shk, Math.round(e.y) + rise);
  ctx.scale(S * e.dir, S);
  const fl = e.hit > 0 && Math.floor(t * 30) % 2,
    P = duskPose(e, t),
    src = fl ? { parts: fimg(sh.parts, 'brightness(2.4)'), idle: fimg(sh.idle, 'brightness(2.4)') } : sh;
  // estela fantasma (sombra y carga)
  if (e.mode == 'appear' || (e.mode == 'charge' && e.at > 0.55) || (e.mode == 'rec' && e.t == 'duskS')) {
    ctx.save();
    ctx.globalAlpha = al * 0.3;
    ctx.translate(-8, 0);
    dkRig(src.parts, P);
    ctx.translate(-8, 0);
    ctx.globalAlpha = al * 0.15;
    dkRig(src.parts, P);
    ctx.restore();
  }
  const still = e.mode == 'idle' || (e.mode == 'walk' && false) || e.sp > 0;
  if (still) {
    const f = e.brk ? 8 + Math.min(15, Math.floor((e.ft - e.brk) / 0.1)) : Math.floor(e.ft * 8 + e.id) % 8;
    ctx.drawImage(src.idle, f * 25, 0, 25, 39, -12.5, -39, 25, 39);
  } else dkRig(src.parts, P);
  // ojos que brillan
  const ec = dkEye(e.t),
    eb =
      e.mode == 'wind' || (e.mode == 'charge' && e.at < 0.55) || (e.mode == 'jump' && !e.air)
        ? 1
        : 0.45 + 0.2 * Math.sin(t * 4 + e.id);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(' + ec + ',' + 0.35 * eb + ')';
  ctx.beginPath();
  ctx.ellipse(1.5, -31.5 + (P.bob || 0), 4 + eb * 2, 2 + eb, 0, 0, 7);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
  // estela del zarpazo
  if (e.mode == 'atk' && e.at < 0.2 && e.t != 'duskL') {
    const k = e.at / 0.2;
    ctx.save();
    ctx.globalAlpha = (1 - k) * 0.85;
    ctx.strokeStyle = D.pal ? 'rgb(' + D.pal.cl + ')' : '#eeeeee';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const cx = x + e.dir * (-8 * S),
      cy = e.y - 22 * S;
    ctx.arc(cx, cy, 20 * S, e.dir > 0 ? -1.3 : Math.PI - 1.4, e.dir > 0 ? 1.4 : Math.PI + 1.3);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.restore();
  }
  // humo de sombra que sube del abrigo
  if (Math.random() < 0.08)
    pfx(
      e.x + rnd(-8, 8) * S,
      e.y - rnd(10, 26) * S,
      rnd(-6, 6),
      -rnd(14, 30),
      0.9,
      'rgba(20,16,30,.8)',
      2,
      0,
    );
  if (e.alert > 0) {
    e.alert -= 1 / 60;
    ctx.fillStyle = '#ffd77a';
    ctx.font = '10px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText('!', x, Math.round(e.y - 44 * S - Math.sin(e.alert * 9) * 3));
    ctx.textAlign = 'left';
  }
}
function duskDie(e) {
  e.dying = 1;
  e.dt = 0;
  e.mode = 'dead';
  const S = DUSK[e.t].sc,
    ax = DKM.anchor[0],
    ay = DKM.anchor[1];
  e.bits = ['back-arm', 'legL', 'legR', 'upper', 'pants', 'front-arm', 'coat'].map(n => {
    const m = DKM[n];
    return {
      n,
      x: e.x + e.dir * S * (m.x + m.w / 2 - ax),
      y: e.y + S * (m.y + m.h / 2 - ay),
      vx: rnd(-160, 160),
      vy: -rnd(120, 320),
      r: 0,
      vr: rnd(-9, 9),
    };
  });
  for (let i = 0; i < 22; i++)
    pfx(
      e.x + rnd(-12, 12),
      e.y - rnd(10, 50),
      rnd(-120, 120),
      -rnd(20, 160),
      rnd(0.5, 1),
      i % 3 ? '#141018' : 'rgb(' + dkEye(e.t) + ')',
      i % 3 ? 3 : 2,
      120,
    );
  sfx('crackle');
  SHK = Math.max(SHK || 0, 3);
}
function drawDuskOrbs(t) {
  for (const o of orbs) {
    if (o.c == 'k') {
      const a = t * 14 + o.x * 0.1;
      ctx.save();
      ctx.translate(Math.round(o.x - cam), Math.round(o.y));
      ctx.rotate(a);
      ctx.fillStyle = '#cfe8ff';
      ctx.fillRect(-6, -1, 9, 2);
      ctx.fillRect(1, -4, 2, 4);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-5, -1, 6, 1);
      ctx.restore();
    } else if (o.c == 'w') {
      const x = Math.round(o.x - cam);
      ctx.fillStyle = 'rgba(30,24,36,.85)';
      for (let i = 0; i < 4; i++)
        ctx.fillRect(
          x - 3 + i * 2 * Math.sign(o.vx),
          GROUND - 6 - i * 3 - Math.sin(t * 30 + i) * 2,
          3,
          6 + i * 3,
        );
      ctx.fillStyle = 'rgba(246,172,60,.7)';
      ctx.fillRect(x - 1, GROUND - 14, 2, 2);
    }
  }
}

function rnd(a, b) {
  return a + Math.random() * (b - a);
}

/* ---------- 10-pulido-smara.js ---------- */
/* ===== PULIDO DE SMARA: pausa de impacto, temblor, estelas de corte, sombra, polvo, vaho, estiramiento ===== */
let HS = 0,
  SHK = 0;
const PFX = [],
  SLS = [];
function pfx(x, y, vx, vy, l, c, s, g) {
  if (PFX.length < 400) PFX.push({ x, y, vx, vy, l, m: l, c, s: s || 2, g: g || 0 });
}
function updPFX(dt) {
  for (let i = PFX.length - 1; i >= 0; i--) {
    const q = PFX[i];
    q.l -= dt;
    if (q.l <= 0) {
      PFX.splice(i, 1);
      continue;
    }
    q.x += q.vx * dt;
    q.y += q.vy * dt;
    q.vy += q.g * dt;
    q.vx *= 0.985;
  }
  for (let i = SLS.length - 1; i >= 0; i--) {
    SLS[i].t += dt;
    if (SLS[i].t > 0.22) SLS.splice(i, 1);
  }
  SHK = Math.max(0, SHK - dt * 18);
}
function drawPFX() {
  for (const q of PFX) {
    ctx.globalAlpha = Math.max(0, Math.min(1, (q.l / q.m) * 1.4));
    ctx.fillStyle = q.c;
    ctx.fillRect(Math.round(q.x - cam - q.s / 2), Math.round(q.y - q.s / 2), q.s, q.s);
  }
  ctx.globalAlpha = 1;
}
function hitFX(x, y, big) {
  HS = Math.max(HS, big ? 0.07 : 0.045);
  SHK = Math.max(SHK, big ? 4 : 2.4);
  for (let i = 0; i < (big ? 14 : 9); i++) {
    const a = Math.random() * 6.283,
      s = rnd(80, 260);
    pfx(
      x,
      y,
      Math.cos(a) * s,
      Math.sin(a) * s,
      rnd(0.15, 0.32),
      i % 3 ? '#ffffff' : '#ffd98a',
      i % 4 ? 2 : 3,
      0,
    );
  }
  SLS.push({ t: 0.12, hit: 1, x, y });
}
function drawSlashes() {
  for (const s of SLS) {
    const k = s.t / 0.22;
    if (s.hit) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'rgba(255,240,200,' + (1 - k) + ')';
      ctx.lineWidth = 2;
      const r = 6 + k * 18,
        x = s.x - cam;
      ctx.beginPath();
      ctx.moveTo(x - r, s.y);
      ctx.lineTo(x + r, s.y);
      ctx.moveTo(x, s.y - r);
      ctx.lineTo(x, s.y + r);
      ctx.stroke();
      ctx.restore();
      continue;
    }
    const x = p.x - cam,
      y = p.y - 32,
      f = s.f;
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(f, 1);
    ctx.globalAlpha = Math.max(0, 1 - k * 1.2);
    const g = ctx.createLinearGradient(-20, -30, 46, 20);
    g.addColorStop(0, 'rgba(190,240,255,0)');
    g.addColorStop(0.6, 'rgba(220,250,255,.85)');
    g.addColorStop(1, '#ffffff');
    ctx.strokeStyle = g;
    ctx.lineCap = 'round';
    const e = Math.min(1, s.t / 0.08);
    if (s.c == 0) {
      ctx.lineWidth = 5 * (1 - k);
      ctx.beginPath();
      ctx.arc(8, 4, 38, -1.25, -1.25 + 2.3 * e);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.arc(8, 4, 38, -1.0, -1.25 + 2.3 * e);
      ctx.stroke();
    } else if (s.c == 1) {
      ctx.lineWidth = 6 * (1 - k);
      ctx.beginPath();
      ctx.arc(4, -6, 42, -2.2, -2.2 + 2.6 * e);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.arc(4, -6, 42, -2.0, -2.2 + 2.6 * e);
      ctx.stroke();
    } else {
      ctx.lineWidth = 4 * (1 - k);
      ctx.beginPath();
      ctx.moveTo(10, 6);
      ctx.lineTo(10 + 70 * e, 6);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,' + (1 - k) + ')';
      ctx.fillRect(10 + 70 * e - 3, 4, 6, 4);
    }
    ctx.restore();
  }
}
function drawPShadow() {
  if (state == 'dead') return;
  const gy = p.on ? p.y : area == 3 || area == 1 || area == 5 || area == 0 || area == 4 || area == 6 ? GROUND : null;
  if (gy == null) return;
  const h = Math.max(0, gy - p.y),
    k = Math.max(0.25, 1 - h / 220);
  ctx.fillStyle = 'rgba(0,0,0,' + 0.28 * k + ')';
  ctx.beginPath();
  ctx.ellipse(Math.round(p.x - cam), gy + 1, 13 * k, 3 * k, 0, 0, 7);
  ctx.fill();
}
function polishTick(dt, was0, vy0) {
  const A = p.an || {};
  // aterrizaje: polvo en anillo y temblor si cae de alto
  if (p.on && !was0 && vy0 > 180) {
    const q = Math.min(1, vy0 / 950);
    for (let i = 0; i < 6 + q * 10; i++) {
      const s = (i % 2 ? 1 : -1) * rnd(40, 150) * (0.5 + q);
      pfx(p.x + rnd(-6, 6), p.y - 2, s, -rnd(10, 50), rnd(0.25, 0.45), '#d8cdb4', 2, 200);
    }
    if (vy0 > 760) {
      SHK = Math.max(SHK, 3);
    }
  }
  // derrape al cambiar de direccion corriendo
  if (p.on && p.lastFace !== undefined && p.lastFace !== p.face && Math.abs(p.vx) > 140) {
    for (let i = 0; i < 6; i++)
      pfx(p.x + p.face * 4, p.y - 1, -p.face * rnd(30, 120), -rnd(10, 40), 0.35, '#cbbfa8', 2, 200);
    sfx('swing');
  }
  p.lastFace = p.face;
  // estela al correr rapido
  p.trT = (p.trT || 0) - dt;
  if (p.run && p.on && Math.abs(p.vx) > 250 && p.trT <= 0) {
    p.trT = 0.07;
    p.ghosts.push({ x: p.x, y: p.y, f: p.face, a: 0.22, s: curAnim() });
  }
  // tiempo quieta -> estirarse
  if (p.on && Math.abs(p.vx) < 12 && !p.atk && p.dash <= 0 && !p.crouch && p.parry <= 0 && state == 'play')
    p.idl = (p.idl || 0) + dt;
  else p.idl = 0;
  // vaho en la noche
  if (area == 5 && p.idl > 1 && Math.floor(p.idl / 2.6) != Math.floor((p.idl - dt) / 2.6))
    for (let i = 0; i < 5; i++)
      pfx(
        p.x + p.face * (9 + i),
        p.y - 49,
        p.face * rnd(8, 22),
        -rnd(4, 12),
        rnd(0.6, 1),
        'rgba(220,230,255,.55)',
        2,
        -10,
      );
  // chispas al caer rapido y lineas de velocidad
  if (!p.on && p.vy > 620 && Math.random() < dt * 30)
    pfx(p.x + rnd(-10, 10), p.y - rnd(0, 50), 0, -p.vy * 0.4, 0.12, 'rgba(255,255,255,.6)', 1, 0);
  // pasos
  if (p.on && Math.abs(p.vx) > 60) {
    const fr = Math.floor(p.t * (p.run ? 16 : 7 + Math.abs(p.vx) / 45)) % 8;
    if (fr !== p.lstep && (fr == 1 || fr == 5)) {
      if (AC && !muted) sfx('step');
    }
    p.lstep = fr;
  }
}
function stretchFrame() {
  if (!(p.idl > 6)) return null;
  const c = (p.idl - 6) % 10;
  if (c > 1.6) return null;
  const k = Math.floor((c / 1.6) * 7);
  return VIC + Math.min(6, [0, 1, 2, 3, 3, 2, 1][k] || 0);
}

function drawNightSky(t, top) {
  const W_ = 1152,
    H_ = 648,
    par = [0, 0.02, 0.05, 0.1],
    sp = [0, 1.2, 3, 6];
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  for (let i = 0; i < 4; i++) {
    const im = img['zn' + (i + 1)],
      o = ((((cam * par[i] + t * sp[i]) * 2) % W_) + W_) % W_;
    for (let x = -o; x < cv.width; x += W_) ctx.drawImage(im, Math.round(x), 0, W_, H_);
  }
  ctx.restore();
  for (let i = 0; i < 26; i++) {
    const x = (((i * 97.3 - cam * 0.02) % W) + W) % W,
      y = (i * 37.1) % (top + 40);
    if (Math.sin(t * 1.7 + i * 2.1) > 0.85) {
      ctx.fillStyle = 'rgba(235,240,255,.9)';
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      ctx.fillStyle = 'rgba(235,240,255,.35)';
      ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1);
      ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3);
    }
  }
}
const _sfxBase = sfx;
sfx = function (k) {
  if (k == 'step') {
    if (!AC || muted) return;
    const t = AC.currentTime,
      s = AC.createBufferSource();
    s.buffer = NB || (NB = nz());
    const f = AC.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 900 + Math.random() * 300;
    const g = AC.createGain();
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(f);
    f.connect(g);
    g.connect(MG);
    s.start(t, Math.random());
    s.stop(t + 0.06);
    return;
  }
  _sfxBase(k);
};

function audioStart() {
  if (AC) {
    if (AC.state == 'suspended') AC.resume();
    return;
  }
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    MG = AC.createGain();
    MG.gain.value = 0.6;
    MG.connect(AC.destination);
    musLoad();
  } catch (e) {
    AC = null;
  }
}
function nz() {
  const b = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate),
    d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function noiseSrc(f, type, g, lh, la) {
  const s = AC.createBufferSource();
  s.buffer = NB || (NB = nz());
  s.loop = true;
  const fl = AC.createBiquadFilter();
  fl.type = type;
  fl.frequency.value = f;
  const gn = AC.createGain();
  gn.gain.value = g;
  s.connect(fl);
  fl.connect(gn);
  gn.connect(MG);
  s.start();
  ambN.push(s);
  if (lh) {
    const o = AC.createOscillator();
    o.frequency.value = lh;
    const lg = AC.createGain();
    lg.gain.value = la;
    o.connect(lg);
    lg.connect(gn.gain);
    o.start();
    ambN.push(o);
  }
}
function tone(f, type, g, det) {
  const o = AC.createOscillator();
  o.type = type;
  o.frequency.value = f;
  o.detune.value = det || 0;
  const gn = AC.createGain();
  gn.gain.value = g;
  o.connect(gn);
  gn.connect(MG);
  o.start();
  ambN.push(o);
}
function ambient(k) {
  if (!AC) return;
  for (const n of ambN) {
    try {
      n.stop();
    } catch (e) {}
  }
  ambN = [];
  if (k == 'void') {
    tone(55, 'sine', 0.12);
    tone(82.4, 'sine', 0.07, 6);
    tone(110.5, 'triangle', 0.03, -9);
    noiseSrc(400, 'lowpass', 0.05, 0.1, 0.03);
  }
  if (k == 'room') {
    noiseSrc(4500, 'bandpass', 0.035, 0.2, 0.012);
    noiseSrc(450, 'lowpass', 0.04, 0.12, 0.02);
    noiseSrc(110, 'lowpass', 0.04, 22, 0.03);
    tone(55, 'sine', 0.02);
  }
  if (k == 'gate') {
    noiseSrc(600, 'lowpass', 0.05, 0.1, 0.03);
    noiseSrc(3200, 'bandpass', 0.012, 0.2, 0.006);
  }
  if (k == 'level') {
    noiseSrc(700, 'bandpass', 0.035, 0.08, 0.03);
  }
}
function sfx(k) {
  if (!AC || muted) return;
  const t = AC.currentTime;
  const env = (g, d) => {
    const gn = AC.createGain();
    gn.gain.setValueAtTime(g, t);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
    gn.connect(MG);
    return gn;
  };
  const osc = (f0, f1, d, ty, g) => {
    const o = AC.createOscillator();
    o.type = ty || 'sine';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + d);
    o.connect(env(g, d));
    o.start(t);
    o.stop(t + d);
  };
  const nb = (f, d, g) => {
    const s = AC.createBufferSource();
    s.buffer = NB || (NB = nz());
    const fl = AC.createBiquadFilter();
    fl.type = 'bandpass';
    fl.frequency.value = f;
    s.connect(fl);
    fl.connect(env(g, d));
    s.start(t);
    s.stop(t + d);
  };
  if (k == 'boom') {
    osc(90, 25, 1.2, 'sine', 0.9);
    nb(200, 0.8, 0.6);
  } else if (k == 'tick') nb(2500, 0.03, 0.12);
  else if (k == 'swing') nb(1800, 0.12, 0.25);
  else if (k == 'hit') {
    osc(220, 80, 0.12, 'square', 0.2);
    nb(900, 0.1, 0.3);
  } else if (k == 'hurt') osc(180, 60, 0.25, 'sawtooth', 0.3);
  else if (k == 'pick') osc(600, 1200, 0.15, 'triangle', 0.2);
  else if (k == 'parry') {
    osc(1400, 1800, 0.2, 'sine', 0.25);
    osc(700, 900, 0.2, 'triangle', 0.15);
  } else if (k == 'dash') nb(900, 0.18, 0.2);
  else if (k == 'rewind') {
    osc(60, 1800, 2.6, 'sawtooth', 0.12);
    nb(1200, 2.6, 0.3);
  } else if (k == 'page') nb(3000, 0.12, 0.15);
  else if (k == 'wake') {
    osc(200, 500, 0.4, 'sine', 0.2);
    nb(900, 0.3, 0.12);
  } else if (k == 'rumble') {
    nb(70, 3.6, 0.7);
    osc(45, 90, 3.6, 'sine', 0.5);
  } else if (k == 'crackle') nb(1500 + Math.random() * 2500, 0.04, 0.12);
  else if (k == 'thunder') nb(110, 2.5, 0.8);
  else if (k == 'portal') {
    osc(50, 400, 2.8, 'sawtooth', 0.18);
    nb(800, 3, 0.25);
    osc(200, 1600, 3, 'sine', 0.1);
  }
}

/* ---------- 11-intro.js ---------- */
/* ===== INTRO: NEW DATA -> negro con frase ===== */
const PHRASE = 'Los dioses no son dioses sin humanos y los humanos no son humanos si no creen en ellos.';
let ND = { t: 0 },
  RW = { t: 0 },
  LT = { t: 0, need: 9 },
  blackIn = 0;
function startNewData() {
  state = 'newdata';
  ND = { t: 0 };
}
function wrapT(s, mw) {
  const w = s.split(' '),
    L = [];
  let c = '';
  for (const x of w) {
    const t = c ? c + ' ' + x : x;
    if (ctx.measureText(t).width > mw && c) {
      L.push(c);
      c = x;
    } else c = t;
  }
  L.push(c);
  return L;
}
function drawIntro() {
  if (state == 'newdata') {
    drawMenu();
    ctx.fillStyle = 'rgba(0,0,0,' + Math.min(0.7, ND.t) + ')';
    ctx.fillRect(0, 0, W, H);
    const sh = ND.t > 1.15 ? (Math.random() - 0.5) * 8 : 0;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '34px ' + PS;
    ctx.globalAlpha = Math.min(1, ND.t * 2.5) * (Math.floor(ND.t * 8) % 2 || ND.t > 1.15 ? 1 : 0.6);
    ctx.fillText('NEW DATA', W / 2 + sh, H / 2 + 12);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  } else {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    const t = ND.t,
      n = Math.max(0, Math.floor((t - 1) * 26)),
      al = t > 9.2 ? Math.max(0, (10.8 - t) / 1.6) : 1;
    ctx.globalAlpha = al;
    ctx.fillStyle = '#e8e8f0';
    ctx.font = 'italic 17px Georgia,serif';
    ctx.textAlign = 'center';
    const L = wrapT(PHRASE, 520);
    let k = n;
    L.forEach((ln, i) => {
      ctx.fillText(ln.slice(0, Math.max(0, k)), W / 2, H / 2 - (L.length - 1) * 13 + i * 28);
      k -= ln.length + 1;
    });
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
  if (flashW > 0) {
    ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, flashW) + ')';
    ctx.fillRect(0, 0, W, H);
    flashW -= 0.04;
  }
}

/* ---------- 12-cuarto.js ---------- */
/* ===== CUARTO ===== */
/* ===== CUARTO (cabaña acogedora, dibujada a mano en pixel art) ===== */
const LETTER = { x: 382, y: 290 };
let roomS,
  crkT = 0;
const rainD = Array.from({ length: 46 }, (_, i) => ({ x: i * 37.3, y: i * 53.1, v: 140 + (i % 5) * 40 }));
const MOTES = Array.from({ length: 22 }, (_, i) => ({ a: i * 2.3, b: i * 1.7, s: 6 + (i % 4) * 3 }));
function enterRoom() {
  area = 0;
  LEVEL = W;
  GROUND = 382;
  platforms = [];
  enemies = [];
  pick = [];
  orbs = [];
  shots = [];
  fx = [];
  B.on = false;
  p.x = 230;
  p.y = GROUND;
  p.vy = 0;
  p.on = true;
  cam = 0;
  state = 'room';
  blackIn = 1;
  ambient('room');
  clearInterval(tickT);
  clearInterval(crkT);
  tickT = setInterval(() => {
    if (state == 'room' || state == 'letter') sfx('tick');
  }, 1000);
  crkT = setInterval(() => {
    if (state == 'room' || state == 'letter') {
      if (Math.random() < 0.6) sfx('crackle');
      if ((performance.now() / 1000) % 14 < 0.23) setTimeout(() => sfx('thunder'), 900 + Math.random() * 700);
    }
  }, 230);
  say('Apretá E en el escritorio para leer la carta');
}
function nearLetter(e) {
  const [x, y] = mpos(e);
  return Math.hypot(x - LETTER.x, y - LETTER.y) < 34 && Math.abs(p.x - LETTER.x) < 100;
}
function buildRoom() {
  roomS = document.createElement('canvas');
  roomS.width = 350;
  roomS.height = 203;
  const c = roomS.getContext('2d');
  const R = (x, y, w, h, col) => {
    c.fillStyle = col;
    c.fillRect(x, y, w, h);
  };
  for (let x = 0; x < 350; x += 10) {
    R(x, 0, 10, 170, ['#5b3d2c', '#654532', '#56392a'][(x / 10) % 3]);
    R(x, 0, 1, 170, '#47301f');
    for (let y = 6 + (x % 7); y < 170; y += 24) R(x + 3, y, 1, 3, '#47301f');
  }
  R(0, 0, 350, 9, '#2f1d12');
  R(0, 9, 350, 2, '#1f130b');
  for (let x = 20; x < 350; x += 70) R(x, 0, 6, 12, '#2f1d12');
  R(0, 150, 350, 20, '#3a2417');
  R(0, 150, 350, 2, '#6e4a33');
  for (let x = 0; x < 350; x += 24) R(x, 152, 1, 18, '#2a190f');
  R(0, 170, 350, 33, '#7a5535');
  for (let y = 170; y < 203; y += 8) R(0, y, 350, 1, '#5a3c24');
  for (let x = 0; x < 350; x += 29)
    for (let y = 170; y < 203; y += 8) R(x + ((y / 8) % 2) * 14, y, 1, 8, '#5a3c24');
  R(0, 170, 350, 2, '#2a190f');
  R(110, 182, 150, 14, '#8c2f3a');
  R(112, 184, 146, 10, '#a8434d');
  R(118, 186, 134, 6, '#7a2530');
  for (let x = 118; x < 252; x += 8) R(x, 188, 3, 2, '#e8c46a');
  R(10, 52, 52, 118, '#3a2417');
  R(12, 54, 48, 114, '#2a190f');
  for (let r = 0; r < 5; r++) {
    const y = 56 + r * 22;
    R(12, y + 18, 48, 3, '#4d3220');
    let x = 14;
    const cols = ['#a33', '#37a', '#c93', '#3a6', '#835', '#478', '#b62'];
    for (let k = 0; k < 9; k++) {
      const w = 3 + ((k * 7 + r * 3) % 3),
        h = 12 + ((k * 5 + r) % 6);
      R(x, y + 18 - h, w, h, cols[(k + r * 2) % 7]);
      R(x, y + 18 - h, 1, h, 'rgba(255,255,255,.25)');
      x += w + 1;
      if (x > 56) break;
    }
  }
  R(28, 40, 18, 12, '#8a4b2d');
  R(30, 34, 14, 8, '#6b8f4e');
  R(34, 28, 6, 8, '#7fae5c');
  R(26, 36, 6, 4, '#8bc36a');
  R(42, 36, 6, 4, '#8bc36a');
  R(78, 70, 70, 100, '#59544f');
  for (let y = 70; y < 170; y += 10)
    for (let x = 78 + ((y / 10) % 2) * 7; x < 148; x += 14) {
      R(x, y, 13, 9, (x + y) % 3 ? '#6e6962' : '#7c776f');
      R(x, y + 9, 13, 1, '#3d3935');
    }
  R(72, 64, 82, 8, '#3d3935');
  R(72, 64, 82, 2, '#827c72');
  R(92, 106, 42, 64, '#14100d');
  R(94, 108, 38, 62, '#0a0806');
  R(92, 100, 42, 6, '#3d3935');
  R(96, 22, 34, 34, '#2f1d12');
  R(98, 24, 30, 30, '#2b4a6b');
  R(98, 44, 30, 10, '#2f6a4a');
  R(98, 36, 30, 8, '#3d6f86');
  R(116, 28, 8, 8, '#f2d68a');
  R(158, 28, 64, 76, '#2f1d12');
  R(161, 31, 58, 70, '#07101f');
  for (let i = 0; i < 30; i++) R(161 + ((i * 37) % 58), 31 + ((i * 23) % 40), 1, 1, 'rgba(255,255,255,.7)');
  R(176, 36, 9, 9, '#e9ecc8');
  R(178, 38, 7, 7, '#07101f');
  c.fillStyle = '#050b16';
  for (let x = 161; x < 219; x += 6) {
    c.fillRect(x, 72 + ((x * 3) % 9), 5, 29);
    c.fillRect(x + 1, 66 + ((x * 5) % 7), 3, 8);
  }
  R(189, 31, 2, 70, '#2f1d12');
  R(161, 64, 58, 2, '#2f1d12');
  R(154, 104, 72, 5, '#4d3220');
  R(154, 104, 72, 1, '#8a6544');
  R(150, 150, 82, 6, '#6b4a2e');
  R(150, 150, 82, 1, '#9a7048');
  R(154, 156, 74, 4, '#4d3220');
  R(154, 156, 6, 34, '#4d3220');
  R(222, 156, 6, 34, '#4d3220');
  R(160, 160, 56, 26, '#3a2417');
  R(162, 162, 26, 22, '#4d3220');
  R(190, 162, 24, 22, '#4d3220');
  R(173, 170, 4, 2, '#c9a050');
  R(201, 170, 4, 2, '#c9a050');
  R(158, 144, 18, 3, '#a33');
  R(160, 141, 16, 3, '#37a');
  R(159, 138, 15, 3, '#c93');
  R(206, 146, 5, 5, '#1a1a2a');
  R(208, 138, 1, 9, '#e8e0c8');
  R(252, 138, 92, 10, '#4d3220');
  R(252, 138, 92, 2, '#7a5535');
  R(340, 118, 6, 72, '#4d3220');
  R(252, 148, 6, 42, '#4d3220');
  R(258, 154, 82, 22, '#e8dcc0');
  R(262, 140, 24, 16, '#f4eedc');
  R(262, 140, 24, 2, '#fff');
  R(262, 154, 82, 18, '#3a5f9a');
  R(262, 154, 82, 3, '#5a82c0');
  for (let x = 270; x < 340; x += 14) R(x, 160, 2, 12, '#2e4d80');
  R(258, 174, 82, 10, '#3a2417');
  c.fillStyle = '#2f1d12';
  c.beginPath();
  c.arc(262, 60, 14, 0, 7);
  c.fill();
  c.fillStyle = '#e9dfc6';
  c.beginPath();
  c.arc(262, 60, 12, 0, 7);
  c.fill();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.283;
    R(Math.round(262 + Math.sin(a) * 10), Math.round(60 - Math.cos(a) * 10), 1, 1, '#2f1d12');
  }
  R(113, 0, 1, 22, '#1f130b');
  R(108, 22, 12, 3, '#2f1d12');
  R(109, 25, 10, 10, '#e8b04a');
  R(108, 35, 12, 2, '#2f1d12');
}
function drawRoom(t) {
  if (!roomS) buildRoom();
  ctx.drawImage(roomS, 0, 0, W, H);
  ctx.save();
  ctx.beginPath();
  ctx.rect(322, 62, 116, 140);
  ctx.clip();
  const lt = t % 14,
    fl = lt < 0.12 || (lt > 0.3 && lt < 0.38);
  if (fl) {
    ctx.fillStyle = 'rgba(200,215,255,.6)';
    ctx.fillRect(322, 62, 116, 140);
  }
  ctx.strokeStyle = 'rgba(160,195,235,.55)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const d of rainD) {
    const x = 322 + ((d.x + t * 14) % 116),
      y = 62 + ((d.y + t * d.v) % 140);
    ctx.moveTo(x, y);
    ctx.lineTo(x - 2, y + 7);
  }
  ctx.stroke();
  ctx.restore();
  const sw = Math.sin(t * 1.1) * 3;
  ctx.fillStyle = '#2f1d12';
  ctx.fillRect(300, 52, 160, 4);
  ctx.fillStyle = '#8c2f3a';
  ctx.beginPath();
  ctx.moveTo(306, 56);
  ctx.lineTo(342, 56);
  ctx.lineTo(338 + sw, 208);
  ctx.lineTo(310 + sw * 0.5, 208);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(418, 56);
  ctx.lineTo(454, 56);
  ctx.lineTo(450 - sw, 208);
  ctx.lineTo(422 - sw * 0.5, 208);
  ctx.fill();
  ctx.strokeStyle = '#6e2029';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 1; i < 4; i++) {
    ctx.moveTo(306 + i * 9, 56);
    ctx.lineTo(310 + i * 8 + sw * 0.6, 206);
    ctx.moveTo(418 + i * 9, 56);
    ctx.lineTo(422 + i * 8 - sw * 0.6, 206);
  }
  ctx.stroke();
  const d = new Date(),
    mi = d.getMinutes() * 6 + d.getSeconds() / 10,
    ho = (d.getHours() % 12) * 30 + d.getMinutes() / 2;
  ctx.strokeStyle = '#2f1d12';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(524, 120);
  ctx.lineTo(524 + Math.sin(mi * 0.01745) * 19, 120 - Math.cos(mi * 0.01745) * 19);
  ctx.moveTo(524, 120);
  ctx.lineTo(524 + Math.sin(ho * 0.01745) * 12, 120 - Math.cos(ho * 0.01745) * 12);
  ctx.stroke();
  // fuego
  ctx.fillStyle = '#3a2417';
  ctx.fillRect(194, 330, 64, 10);
  ctx.fillRect(200, 322, 50, 9);
  ctx.fillStyle = '#24140c';
  ctx.fillRect(204, 324, 10, 4);
  ctx.fillRect(232, 326, 12, 4);
  const cols = ['#ff7a1a', '#ffb02e', '#fff1a0'];
  for (let k = 0; k < 3; k++)
    for (let i = 0; i < 7; i++) {
      const x = 192 + i * 11,
        h = (24 + 14 * Math.abs(Math.sin(t * 6 + i * 1.7)) + 6 * Math.sin(t * 11 + i * 3)) * (1 - k * 0.3);
      ctx.fillStyle = cols[k];
      ctx.beginPath();
      ctx.moveTo(x - 6 + k * 2, 334);
      ctx.lineTo(x + Math.sin(t * 5 + i) * 2, 334 - h);
      ctx.lineTo(x + 6 - k * 2, 334);
      ctx.fill();
    }
  for (let i = 0; i < 8; i++) {
    const q = (t * 0.7 + i / 8) % 1;
    ctx.fillStyle = 'rgba(255,' + (160 + i * 10) + ',60,' + (1 - q) + ')';
    ctx.fillRect(Math.round(204 + i * 7 + Math.sin(t * 3 + i) * 6), Math.round(318 - q * 60), 2, 2);
  }
  ctx.globalCompositeOperation = 'lighter';
  let g = ctx.createRadialGradient(226, 310, 10, 226, 310, 210);
  g.addColorStop(0, 'rgba(255,140,50,' + (0.26 + 0.08 * Math.sin(t * 9) + 0.04 * Math.random()) + ')');
  g.addColorStop(1, 'rgba(255,110,30,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 100, 520, 306);
  g = ctx.createRadialGradient(417, 274, 3, 417, 274, 70);
  g.addColorStop(0, 'rgba(255,200,90,' + (0.28 + 0.1 * Math.random()) + ')');
  g.addColorStop(1, 'rgba(255,180,60,0)');
  ctx.fillStyle = g;
  ctx.fillRect(340, 200, 160, 140);
  g = ctx.createRadialGradient(228, 64, 3, 228, 64, 80);
  g.addColorStop(0, 'rgba(255,190,80,' + (0.2 + 0.05 * Math.sin(t * 1.7)) + ')');
  g.addColorStop(1, 'rgba(255,170,60,0)');
  ctx.fillStyle = g;
  ctx.fillRect(150, 0, 160, 160);
  ctx.globalAlpha = 0.05 + 0.02 * Math.sin(t * 0.5);
  ctx.fillStyle = '#bcd8ff';
  ctx.beginPath();
  ctx.moveTo(330, 205);
  ctx.lineTo(432, 205);
  ctx.lineTo(330, 406);
  ctx.lineTo(180, 406);
  ctx.fill();
  ctx.globalAlpha = 1;
  for (const m of MOTES) {
    const x = 300 + ((m.a * 30 + t * m.s * 0.6) % 130),
      y = 208 + ((m.b * 40 + t * m.s) % 180);
    ctx.fillStyle = 'rgba(190,215,255,' + (0.25 + 0.3 * Math.sin(t * 2 + m.a)) + ')';
    ctx.fillRect(Math.round(x), Math.round(y), 2, 2);
  }
  ctx.globalCompositeOperation = 'source-over';
  // vela
  ctx.fillStyle = '#e8e0c8';
  ctx.fillRect(416, 278, 3, 16);
  ctx.fillStyle = '#ffb02e';
  ctx.beginPath();
  ctx.moveTo(414, 278);
  ctx.lineTo(417.5 + Math.sin(t * 9) * 1.2, 266 - Math.random() * 2);
  ctx.lineTo(421, 278);
  ctx.fill();
  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(416, 272, 3, 6);
  // gato dormido en la alfombra
  const cx = 300,
    cy = 384,
    br = 1 + 0.045 * Math.sin(t * 1.7);
  ctx.fillStyle = '#34343f';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 9 * br, 19, 9 * br, 0, 0, 6.283);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx - 17, cy - 8, 7, 0, 7);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 22, cy - 13);
  ctx.lineTo(cx - 20, cy - 20);
  ctx.lineTo(cx - 16, cy - 14);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy - 14);
  ctx.lineTo(cx - 11, cy - 20);
  ctx.lineTo(cx - 9, cy - 12);
  ctx.fill();
  ctx.strokeStyle = '#34343f';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx + 18, cy - 6);
  ctx.quadraticCurveTo(cx + 34, cy - 2 + Math.sin(t * 1.3) * 3, cx + 26, cy - 14 + Math.sin(t * 1.3) * 3);
  ctx.stroke();
  ctx.fillStyle = '#4a4a58';
  ctx.fillRect(cx - 8, cy - 16 * br, 14, 2);
  ctx.fillStyle = '#111';
  ctx.fillRect(cx - 20, cy - 9, 4, 1);
  ctx.fillStyle = 'rgba(255,255,255,' + (0.4 + 0.3 * Math.sin(t * 1.7)) + ')';
  ctx.font = '9px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('z', cx - 30, cy - 26 - ((t * 8) % 12));
  // carta
  ctx.save();
  ctx.translate(LETTER.x, LETTER.y + Math.sin(t * 2) * 1.5);
  ctx.rotate(-0.12);
  ctx.globalCompositeOperation = 'lighter';
  g = ctx.createRadialGradient(0, 0, 2, 0, 0, 26);
  g.addColorStop(0, 'rgba(255,230,150,.45)');
  g.addColorStop(1, 'rgba(255,230,150,0)');
  ctx.fillStyle = g;
  ctx.fillRect(-28, -28, 56, 56);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#efe6cf';
  ctx.fillRect(-11, -8, 22, 16);
  ctx.fillStyle = '#b5a782';
  ctx.fillRect(-11, -8, 22, 1);
  ctx.fillRect(-8, -4, 16, 1);
  ctx.fillRect(-8, 0, 16, 1);
  ctx.fillRect(-8, 4, 10, 1);
  ctx.fillStyle = '#c33';
  ctx.fillRect(-2, 2, 4, 4);
  ctx.restore();
  if (state == 'room' && Math.abs(p.x - LETTER.x) < 70) {
    ctx.fillStyle = '#fff';
    ctx.font = '9px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText('[E] READ', LETTER.x, LETTER.y - 26);
    ctx.textAlign = 'left';
  }
  if (fl) {
    ctx.fillStyle = 'rgba(220,230,255,.14)';
    ctx.fillRect(0, 0, W, H);
  }
  g = ctx.createRadialGradient(W / 2, H / 2, 160, W / 2, H / 2, 430);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,10,.45)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

const LTXT = [
  'A quien despierte aquí:',
  'No te asustés. Tu nacatamal se enfrió, pero vos seguís viva. Lo más probable. No quise tomarte el pulso, me dio pena.',
  'Estás en Mulukukú, aunque no en el de hoy. En miskito su nombre quiere decir «ribera de sahinos»: la orilla del río Tuma donde los chanchos de monte bajaban a beber y los espíritus se sentaban a escuchar a la gente.',
  'Aquí todo tiene dueño. Liwa Mairin cuida las aguas, los Duhindu silban en el monte cuidando a los animales, en las ceibas viejas duermen espíritus que no perdonan un machetazo, y en las nubes Prahaku manda sobre el viento, el trueno y el tiempo.',
  'No son los santos de las estampitas. Son más viejos que las estrellas y viven de una sola cosa: de que alguien los nombre. Cuando el pueblo dejó de contar sus historias en la orilla, se fueron apagando, y por las grietas entró lo que no tiene nombre.',
  'El puente entre los dos mundos se partió. Arlos, el que lo cuidaba, se quedó del otro lado, roto y furioso, cuidando un cruce que ya no existe. Este pueblo ya se levantó del lodo y del huracán más de una vez; esta vez le toca a alguien que crea.',
  'La puerta está frente a vos. Tocala. Si estás leyendo esto, ya sos vos. P.D.: si no sobrevivís, no me demandés; la carta no incluía seguro. —La que te espera junto al fuego',
];
function openLetter() {
  state = 'letter';
  LT = { t: 0, need: LTXT.join(' ').length / 80 };
  sfx('page');
}
function letterClick() {
  if (LT.t < 0.4) return;
  if (LT.t < LT.need) LT.t = LT.need + 0.01;
  else {
    state = 'gate';
    GS.ph = 5;
    sfx('page');
  }
}
function drawLetter() {
  ctx.textAlign = 'left';
  LT.t += 0.016;
  ctx.fillStyle = 'rgba(0,0,0,.72)';
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-0.012);
  ctx.fillStyle = '#e9dcbc';
  ctx.fillRect(-270, -185, 540, 370);
  ctx.strokeStyle = '#8a7550';
  ctx.lineWidth = 3;
  ctx.strokeRect(-270, -185, 540, 370);
  ctx.fillStyle = '#3a2d20';
  ctx.font = 'italic 12px Georgia,serif';
  let k = Math.floor(LT.t * 80),
    y = -152;
  for (const para of LTXT) {
    for (const ln of wrapT(para, 480)) {
      ctx.fillText(ln.slice(0, Math.max(0, k)), -240, y);
      k -= ln.length + 1;
      y += 16;
    }
    y += 7;
  }
  ctx.restore();
  if (LT.t > LT.need) {
    ctx.fillStyle = '#fff';
    ctx.font = '9px ' + PS;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(performance.now() / 250);
    ctx.fillText('CLICK TO CONTINUE', W / 2, H - 20);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
}

/* ---------- 13-rebobinar.js ---------- */
/* ===== REBOBINAR EL TIEMPO ===== */
const DJ = [
  'Buena noticia: ya no te duele nada.',
  'Los dioses lo vieron. Se rieron, pero con cariño.',
  'No es morirse, es descansar con ganas.',
  'Tu nacatamal sigue esperando. Qué fiel.',
  'Intento heroico. Funeral corto.',
  'Murió como vivió: golpeando lo que no debía.',
  'La Anciana dijo que no se lo contaras.',
  'Nota mental: el suelo también cuenta como enemigo.',
  'Reencarnaste otra vez. Los dioses ya ni cobran.',
];
function startRewind() {
  state = 'rewind';
  RW = { t: 0, j: Math.floor(Math.random() * DJ.length) };
  sfx('rewind');
}
function drawRewind() {
  const t = RW.t,
    k = Math.min(1, t / 3.2),
    tm = performance.now() / 1000;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-k * k * 2.6);
  const z = 1 + k * k * 1.8;
  ctx.scale(z, z);
  ctx.translate(-W / 2, -H / 2);
  drawRoom(tm);
  drawPlayer();
  drawScythe();
  ctx.restore();
  for (let i = 0; i < 9; i++) {
    const y = Math.random() * H,
      h = 5 + Math.random() * 28,
      o = (Math.random() - 0.5) * 70 * k;
    ctx.drawImage(cv, 0, y * 2, W * 2, h * 2, o, y, W, h);
  }
  ctx.fillStyle = 'rgba(110,190,255,' + (0.1 + 0.2 * k) + ')';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,.18)';
  for (let y = (tm * 80) % 6; y < H; y += 6) ctx.fillRect(0, y, W, 2);
  const cx = W / 2,
    cy = H / 2,
    r = 96 * Math.min(1, k * 3);
  if (r > 4) {
    ctx.strokeStyle = 'rgba(255,255,255,.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 7);
    ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * 6.283;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r * 0.86, cy + Math.sin(a) * r * 0.86);
      ctx.lineTo(cx + Math.cos(a) * r * 0.96, cy + Math.sin(a) * r * 0.96);
      ctx.stroke();
    }
    const am = -(t * 9 + t * t * 7),
      ah = -(t * 1.2 + t * t * 0.9);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(am) * r * 0.8, cy - Math.cos(am) * r * 0.8);
    ctx.stroke();
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(ah) * r * 0.5, cy - Math.cos(ah) * r * 0.5);
    ctx.stroke();
  }
  ctx.fillStyle = '#fff';
  ctx.font = '12px ' + PS;
  ctx.textAlign = 'center';
  ctx.globalAlpha = Math.floor(t * 6) % 2 ? 0.4 : 1;
  ctx.fillText('<< REWIND', W / 2, H - 30);
  ctx.globalAlpha = 1;
  ctx.font = '9px ' + PS;
  ctx.fillStyle = '#d8d8d8';
  ctx.fillText(DJ[RW.j || 0], W / 2, H - 56);
  ctx.textAlign = 'left';
  if (k > 0.78) {
    ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, (k - 0.78) * 4.5) + ')';
    ctx.fillRect(0, 0, W, H);
  }
}

/* ---------- 14-gran-puerta.js ---------- */
/* ===== NIVEL 1: bosque turquesa luminoso ===== */
/* ===== ESCENA INICIAL: LA GRAN PUERTA, VISTA DESDE ARRIBA ===== */
let gateS,
  doorS,
  GS = { ph: 0, t: 0 },
  CPX = 0,
  CPS = [];
const NOTE = { x: 350, y: 362 },
  SPEECH =
    '¿Dónde estoy? Estaba comiendo un nacatamal y no recuerdo nada... Si me morí, que al menos me dejen terminarlo.';
const ease = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
function mk(w, h, s) {
  const c = document.createElement('canvas');
  c.width = w * s;
  c.height = h * s;
  const x = c.getContext('2d');
  x.scale(s, s);
  return [c, x];
}
function enterGate() {
  area = 4;
  LEVEL = W;
  GROUND = 382;
  platforms = [];
  enemies = [];
  pick = [];
  orbs = [];
  shots = [];
  fx = [];
  B.on = false;
  GS = {
    ph: 0,
    t: 0,
    px: 350,
    py: 340,
    o: 0,
    og: 0,
    s: 0,
    w: 0,
    note: 0,
    wt: 0,
    face: -1,
    sc: 0.62,
    mv: false,
    dust: [],
  };
  state = 'gate';
  blackIn = 1;
  ambient('gate');
  clearInterval(tickT);
  clearInterval(crkT);
  crkT = setInterval(() => {
    if (state == 'gate' || (state == 'letter' && area == 4)) {
      if (Math.random() < 0.5) sfx('crackle');
    }
  }, 260);
}
function gateE() {
  const g = GS;
  if (g.ph == 0) {
    g.ph = 1;
    g.t = 0;
    sfx('wake');
  } else if (g.ph == 3 && Math.abs(g.px - NOTE.x) < 60 && Math.abs(g.py - NOTE.y) < 36) {
    g.ph = 4;
    openLetter();
  } else if (g.ph == 5 && g.py < 348 && Math.abs(g.px - 350) < 110) {
    g.ph = 6;
    g.t = 0;
    g.o = 0;
    sfx('rumble');
  }
}
function gateUpdate(dt) {
  const g = GS;
  g.t += dt;
  if (g.ph == 1) {
    g.w = Math.min(1, g.t / 2.2);
    if (g.t > 2.4) {
      g.ph = 2;
      g.t = 0;
      g.s = 0;
      g.face = 1;
    }
  } else if (g.ph == 2) {
    g.s += dt;
    if (g.s > 5.2) {
      g.ph = 3;
      g.note = 0;
      sfx('page');
    }
  }
  if (g.ph >= 3 && g.note < 1) g.note = Math.min(1, g.note + dt * 3);
  g.mv = false;
  if (g.ph == 2 || g.ph == 3 || g.ph == 5) {
    const dx = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0),
      dy = (keys.KeyS || keys.ArrowDown ? 1 : 0) - (keys.KeyW || keys.ArrowUp ? 1 : 0);
    if (dx || dy) {
      const l = Math.hypot(dx, dy);
      g.px = Math.max(190, Math.min(510, g.px + (dx / l) * 95 * dt));
      g.py = Math.max(322, Math.min(394, g.py + (dy / l) * 70 * dt));
      g.mv = true;
      g.wt += dt;
      if (dx) g.face = dx;
    }
  }
  if (g.ph == 6) {
    g.o += dt;
    g.og = ease(Math.min(1, g.o / 3.2));
    if (Math.random() < 0.6 && g.o < 3.4)
      g.dust.push({
        x: 240 + Math.random() * 219,
        y: 306,
        vx: (Math.random() - 0.5) * 30,
        vy: -20 - Math.random() * 40,
        l: 0.9,
      });
    if (g.o > 3.7) {
      g.ph = 7;
      g.t = 0;
    }
  }
  if (g.ph == 7) {
    g.px += (350 - g.px) * Math.min(1, dt * 2.2);
    g.py += (314 - g.py) * Math.min(1, dt * 1.4);
    g.face = 1;
    g.mv = true;
    g.wt += dt;
    g.sc = 0.62 - 0.12 * Math.min(1, g.t / 1.7);
    if (g.t > 1.8) {
      g.ph = 8;
      g.t = 0;
    }
  }
  if (g.ph == 8 && g.t > 1) {
    loadArea(1);
    state = 'play';
    flashW = 1.3;
  }
  for (const d of g.dust) {
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.l -= dt;
  }
  g.dust = g.dust.filter(d => d.l > 0);
}
function bubble(x, y, text, typed) {
  ctx.font = '13px Georgia,serif';
  ctx.textAlign = 'left';
  const L = wrapT(text, 184),
    w = 204,
    h = L.length * 17 + 14,
    bx = Math.max(8, Math.min(W - w - 8, x - w / 2)),
    by = y - h - 12;
  ctx.fillStyle = 'rgba(8,10,30,.35)';
  ctx.fillRect(bx + 3, by + 3, w, h);
  ctx.fillStyle = '#f4f1e6';
  ctx.fillRect(bx, by, w, h);
  ctx.fillStyle = '#2a2438';
  ctx.fillRect(bx, by, w, 2);
  ctx.fillRect(bx, by + h - 2, w, 2);
  ctx.fillStyle = '#f4f1e6';
  ctx.beginPath();
  ctx.moveTo(x - 6, by + h);
  ctx.lineTo(x, by + h + 10);
  ctx.lineTo(x + 6, by + h);
  ctx.fill();
  ctx.fillStyle = '#2a2438';
  let k = typed;
  L.forEach((ln, i) => {
    ctx.fillText(ln.slice(0, Math.max(0, k)), bx + 10, by + 20 + i * 17);
    k -= ln.length + 1;
  });
}
/* ===== ESCENA INICIAL: LA GRAN PUERTA (pixel art, vista desde arriba) ===== */
let glc, glx;
function pdisc(x, y, r) {
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(r * r - dy * dy));
    ctx.fillRect(x - w, y + dy, 2 * w + 1, 1);
  }
}
function pglow(x, y, r, col, a) {
  ctx.fillStyle = col;
  ctx.globalAlpha = a;
  for (let i = 4; i >= 1; i--) pdisc(Math.round(x), Math.round(y), Math.round((r * i) / 4));
  ctx.globalAlpha = 1;
}
function pflame(x, y, t) {
  const cols = ['#ff7a1a', '#ffb02e', '#fff1a0'];
  for (let k = 0; k < 3; k++)
    for (let dx = -3 + k; dx <= 3 - k; dx++) {
      const h = Math.max(
        2,
        Math.round(
          9 - k * 2.5 - Math.abs(dx) * 1.2 + 3 * Math.sin(t * 9 + dx * 1.7 + x) + 1.5 * Math.sin(t * 17 + dx),
        ),
      );
      ctx.fillStyle = cols[k];
      ctx.fillRect(x + dx, y - h, 1, h);
    }
}
function hf(col, row, x, y, s) {
  ctx.drawImage(img.her, col * 48, row * 48, 48, 48, x - 24 * 1.5 * s, y - 46 * 1.5 * s, 72 * s, 72 * s);
}
function bubble2(x, y, text, typed) {
  ctx.font = '7px ' + PS;
  ctx.textAlign = 'left';
  const L = wrapT(text, 196),
    w = 212,
    h = L.length * 13 + 16,
    bx = Math.max(8, Math.min(W - w - 8, Math.round(x - w / 2))),
    by = Math.round(y - h - 14);
  ctx.fillStyle = '#1d1830';
  ctx.fillRect(bx + 3, by, w - 6, h);
  ctx.fillRect(bx, by + 3, w, h - 6);
  ctx.fillStyle = '#f7f3e6';
  ctx.fillRect(bx + 3, by + 3, w - 6, h - 6);
  ctx.fillRect(bx + 6, by + 3, w - 12, h - 6);
  ctx.fillRect(bx + 3, by + 6, w - 6, h - 12);
  ctx.fillStyle = '#1d1830';
  ctx.fillRect(Math.round(x) - 6, by + h, 12, 3);
  ctx.fillRect(Math.round(x) - 3, by + h + 3, 6, 3);
  ctx.fillStyle = '#f7f3e6';
  ctx.fillRect(Math.round(x) - 4, by + h - 3, 8, 3);
  ctx.fillRect(Math.round(x) - 1, by + h, 3, 3);
  ctx.fillStyle = '#2a2438';
  let k = typed;
  L.forEach((ln, i) => {
    ctx.fillText(ln.slice(0, Math.max(0, k)), bx + 9, by + 16 + i * 13);
    k -= ln.length + 1;
  });
}
function drawGate4() {
  const t = performance.now() / 1000,
    g = GS;
  ctx.fillStyle = '#080c20';
  ctx.fillRect(0, 0, W, H);
  const sh = g.ph == 6 && g.o < 3.4 ? (Math.random() - 0.5) * 2.4 * (1 - g.o / 3.4) : 0;
  ctx.save();
  ctx.translate(Math.round(sh), Math.round(sh * 0.6));
  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.scale(1.5, 1.5);
  ctx.drawImage(img.gsc, 0, 0);
  const og = g.og || 0,
    s2 = Math.round(og * 24);
  if (og > 0) {
    if (!glc) {
      glc = document.createElement('canvas');
      glc.width = 467;
      glc.height = 271;
      glx = glc.getContext('2d');
    }
    glx.globalCompositeOperation = 'source-over';
    glx.clearRect(0, 0, 467, 271);
    for (let y = 0; y < 206; y += 3) {
      const k = y / 206;
      glx.fillStyle =
        'rgb(' +
        Math.round(255 - k * 25) +
        ',' +
        Math.round(244 - k * 50) +
        ',' +
        Math.round(200 - k * 80) +
        ')';
      glx.fillRect(233 - s2 - 1, y, s2 * 2 + 2, 3);
    }
    glx.globalCompositeOperation = 'destination-in';
    glx.drawImage(img.gms, 0, 0);
    ctx.drawImage(glc, 0, 0);
  }
  ctx.save();
  ctx.beginPath();
  ctx.rect(160, 0, 146, 206);
  ctx.clip();
  ctx.drawImage(img.gdr, 160, 0, 73, 271, 160 - s2, 0, 73, 271);
  ctx.drawImage(img.gdr, 233, 0, 73, 271, 233 + s2, 0, 73, 271);
  ctx.restore();
  ctx.globalCompositeOperation = 'lighter';
  for (const fx0 of [72, 395]) {
    pglow(fx0, 140, 52, '#ff8a2a', 0.05 + 0.015 * Math.sin(t * 9 + fx0));
    pglow(fx0, 140, 24, '#ffc060', 0.07);
  }
  pglow(233, 62, 26, '#4fe8d8', 0.05 + 0.03 * Math.sin(t * 1.6) + og * 0.08);
  if (og > 0) {
    ctx.fillStyle = '#ffe2a0';
    ctx.globalAlpha = 0.16 * og;
    for (let y = 206; y < 271; y += 2) {
      const hw = s2 + (y - 206) * 0.9;
      ctx.fillRect(233 - hw, y, hw * 2, 2);
    }
    ctx.globalAlpha = 1;
  }
  ctx.globalCompositeOperation = 'source-over';
  pflame(72, 138, t);
  pflame(395, 138, t);
  ctx.fillStyle = '#eaf0ff';
  for (let i = 0; i < 60; i++) {
    const x = (((i * 53.7 + t * (4 + (i % 5) * 2) + Math.sin(t * 0.7 + i) * 6) % 467) + 467) % 467,
      y = (i * 37.1 + t * (9 + (i % 4) * 5)) % 271;
    ctx.globalAlpha = 0.45 + 0.4 * Math.sin(i + t);
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  for (const d of g.dust) {
    ctx.globalAlpha = Math.max(0, d.l);
    ctx.fillStyle = '#d9cfa8';
    ctx.fillRect(Math.round(d.x), Math.round(d.y), 3, 3);
  }
  ctx.globalAlpha = 1;
  // almohada
  if (g.ph <= 1 || g.ph >= 2)
    ctx.drawImage(img.pil, 0, 0, 26, 12, Math.round(350 - 52), Math.round(340 - 18), 39, 18);
  // nota
  if (g.ph >= 3 && g.note > 0) {
    ctx.save();
    ctx.translate(NOTE.x, NOTE.y - 6);
    ctx.scale(g.note, g.note);
    ctx.rotate(-0.1);
    ctx.fillStyle = '#ffe69a';
    ctx.globalAlpha = 0.25;
    pdisc(0, 0, 18);
    pdisc(0, 0, 12);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#efe6cf';
    ctx.fillRect(-13, -9, 26, 18);
    ctx.fillStyle = '#b5a782';
    ctx.fillRect(-13, -9, 26, 2);
    ctx.fillRect(-9, -4, 18, 2);
    ctx.fillRect(-9, 0, 18, 2);
    ctx.fillRect(-9, 4, 12, 2);
    ctx.fillStyle = '#c33';
    ctx.fillRect(-2, 2, 4, 4);
    ctx.restore();
  }
  // personaje: Samara
  const al = g.ph == 7 ? Math.max(0, 1 - g.t / 1.7) : 1,
    s = g.ph == 7 ? g.sc / 0.62 : 1;
  ctx.globalAlpha = al;
  ctx.fillStyle = 'rgba(8,10,34,.4)';
  ctx.fillRect(Math.round(g.px - 26 * s), Math.round(g.py - 2), Math.round(52 * s), 4);
  let fi = 0,
    flip = g.face < 0;
  if (g.ph == 0) {
    fi = HI.sleep;
    flip = false;
  } else if (g.ph == 1) {
    const k = g.t;
    fi = k < 0.6 ? HI.lie : k < 1.2 ? HI.wake1 : k < 1.8 ? HI.wake2 : HI.kneel;
    flip = false;
  } else if (g.mv) fi = RUN + (Math.floor(g.wt * 10) % 8);
  else fi = HI['idle_' + (Math.floor(t * 3) % 4)];
  ctx.save();
  ctx.translate(Math.round(g.px), Math.round(g.py + (g.ph == 0 ? (Math.floor(t * 1.4) % 2) * -1.5 : 0)));
  ctx.scale((flip ? -1 : 1) * s, s);
  hdraw(fi);
  ctx.restore();
  ctx.globalAlpha = 1;
  if (g.ph == 0 || (g.ph == 1 && g.t < 0.6)) {
    ctx.drawImage(
      img.zzb,
      (Math.floor(t * 1.4) % 2) * 30,
      0,
      30,
      24,
      Math.round(g.px - 34),
      Math.round(g.py - 70 + Math.sin(t * 2) * 2),
      45,
      36,
    );
  }
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5);
  if (g.ph == 0) ctx.fillText('[E] WAKE UP', g.px, g.py - 80);
  else if (g.ph == 3 && Math.abs(g.px - NOTE.x) < 60 && Math.abs(g.py - NOTE.y) < 36)
    ctx.fillText('[E] READ', g.px, g.py - 62);
  else if (g.ph == 5 && g.py < 348 && Math.abs(g.px - 350) < 110)
    ctx.fillText('[E] OPEN THE GATE', g.px, g.py - 62);
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  if (g.ph == 2) bubble2(g.px, g.py - 60, SPEECH, Math.floor(g.s * 30));
  ctx.restore();
  if (state == 'letter') drawLetter();
  if (g.ph == 8) {
    ctx.fillStyle = 'rgba(255,246,214,' + Math.min(1, g.t / 0.9) + ')';
    ctx.fillRect(0, 0, W, H);
  }
  if (blackIn > 0) {
    ctx.fillStyle = 'rgba(0,0,0,' + blackIn + ')';
    ctx.fillRect(0, 0, W, H);
    blackIn -= 0.02;
  }
}

/* ---------- 15-nivel-generacion.js ---------- */
/* ===== NIVEL 1 LARGO: generacion, checkpoints, mirada de enemigos ===== */
function genL1(mode) {
  let sd = mode == 5 ? 29 : 11;
  const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const P = [],
    G = GROUND;
  const nearCamp = (x, m) =>
    mode == 1 && (CAMPS.some(c => Math.abs(x - c.x) < m) || Math.abs(x - TELE.x) < m);
  const x0 = mode == 5 ? 700 : 240,
    x1 = mode == 5 ? 12900 : 3650;
  let x = x0,
    u = 82,
    i = 0;
  while (x < x1) {
    const w = [96, 64, 128, 96, 64][i % 5];
    u = Math.max(60, Math.min(154, u + [-50, -24, 0, 24, 50][Math.floor(rnd() * 5)]));
    const k = i % 7 == 3 ? 'b' : 's';
    if (k == 'b' && u < 102) u = 102;
    if (!nearCamp(x, 200)) P.push([Math.round(x), G - u, k == 'b' ? 96 : w, k]);
    x += (k == 'b' ? 96 : w) + 48 + Math.floor(rnd() * 70);
    i++;
    if (i % 6 == 5) x += 150 + Math.floor(rnd() * 80);
  }
  if (mode == 1) P.length = 0;
  const pk = [];
  if (mode == 1) {
    for (let px = 300, j = 0; px < 3700; px += 380 + Math.floor(rnd() * 120), j++)
      if (!nearCamp(px, 90)) pk.push({ x: px, id: FOODS[Math.floor(rnd() * 10)].id, y: G, got: false });
    for (let j = 2; j < P.length; j += 6)
      pk.push({ x: P[j][0] + P[j][2] / 2, id: FOODS[Math.floor(rnd() * 10)].id, y: P[j][1], got: false });
  } else
    for (let j = 1; j < P.length; j += 7)
      pk.push({ x: P[j][0] + P[j][2] / 2, id: FOODS[Math.floor(rnd() * 10)].id, y: P[j][1], got: false });
  return { P, pk };
}
let MBD = [0, 0];
const MBX = [4400, 12200];
function spawnE(x) {
  if (MBX.some(b => Math.abs(x - b) < 380)) return;
  const k = Math.min(1, x / 13000);
  SN++;
  const WT =
    k < 0.15
      ? [
          ['hallo', 0.6],
          ['shade', 0.4],
        ]
      : k < 0.4
        ? [
            ['hallo', 0.35],
            ['shade', 0.3],
            ['demon', 0.2],
            ['hunt', 0.15],
          ]
        : k < 0.7
          ? [
              ['hallo', 0.2],
              ['shade', 0.2],
              ['demon', 0.25],
              ['hunt', 0.35],
            ]
          : [
              ['hallo', 0.15],
              ['shade', 0.15],
              ['demon', 0.3],
              ['hunt', 0.4],
            ];
  let r = Math.random(),
    ty = WT[0][0];
  for (const [n, w] of WT) {
    if (r < w) {
      ty = n;
      break;
    }
    r -= w;
  }
  const e = mkE(ty, x, GROUND);
  foeInit(e);
  e.sp = ty == 'demon' ? 0.9 : 0.8;
  enemies.push(e);
}
function genStructs() {
  let sd = 23;
  const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const S = [];
  let x = 260;
  while (x < 13000) {
    const r = rnd(),
      k =
        r < 0.15
          ? 'fence'
          : r < 0.27
            ? 'torch'
            : r < 0.36
              ? 'ruin'
              : r < 0.44
                ? 'tower'
                : r < 0.5
                  ? 'stone'
                  : r < 0.54
                    ? 'hut'
                    : r < 0.66
                      ? 'grave'
                      : r < 0.75
                        ? 'scare'
                        : r < 0.84
                          ? 'barr'
                          : r < 0.93
                            ? 'wall'
                            : 'stat';
    S.push({
      k,
      x: Math.round(x),
      w: k == 'fence' ? 96 + Math.floor(rnd() * 3) * 32 : 0,
      v: Math.floor(rnd() * 3),
    });
    x += 230 + Math.floor(rnd() * 220);
  }
  return S;
}
function torchAt(x, y, t, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  pflame(0, 0, t);
  ctx.restore();
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#ff9a3a';
  for (let i = 3; i >= 1; i--) {
    ctx.globalAlpha = 0.05 + 0.01 * Math.sin(t * 9 + x);
    pdisc(x, y - 6, Math.round(i * 14 * s));
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}
function drawStructs(t) {
  if (area != 5) return;
  const G = GROUND;
  for (const s of STRUCTS) {
    const x = Math.round(s.x - cam);
    if (x < -260 || x > W + 140) continue;
    if (s.k == 'fence') {
      VPI = fimg(img.vp, 'brightness(.6) saturate(.75)');
      for (let i = 0; i <= s.w; i += 40) {
        if (i < s.w) {
          prl('fRail1', x + i + 4, G - 27);
          prl('fRail2', x + i + 4, G - 15);
        }
        pr(['fPil1', 'fPil2', 'fPil3'][((((s.x / 40) | 0) + i / 40) % 3) | 0], x + i, G + 1);
      }
      VPI = null;
    } else if (s.k == 'torch') {
      VPI = fimg(img.vp, 'brightness(.7)');
      pr('torchP', x, G + 1);
      VPI = null;
      torchAt(x, G - 25, t, 1.5);
    } else if (s.k == 'grave') {
      VPI = fimg(img.vp, 'brightness(.6) saturate(.7)');
      pr('grave' + (1 + s.v), x - 24, G + 2);
      pr('grave' + (1 + ((s.v + 1) % 4)), x + 8, G + 3);
      pr('grave' + (1 + ((s.v + 2) % 4)), x + 38, G + 2);
      VPI = null;
    } else if (s.k == 'scare') {
      VPI = fimg(img.vp, 'brightness(.55) saturate(.7)');
      prs('scare', x, G + 2, t, 0.012);
      VPI = null;
    } else if (s.k == 'barr') {
      VPI = fimg(img.vp, 'brightness(.6) saturate(.75)');
      pr('barr', x, G + 2);
      pr('spikes', x + 60, G + 1);
      VPI = null;
    } else if (s.k == 'wall') {
      VPI = fimg(img.vp, 'brightness(.6) saturate(.8)');
      pr('wall', x + 40, G + 2);
      pr('torchP', x - 14, G + 1);
      VPI = null;
      torchAt(x - 14, G - 25, t, 1.3);
    } else if (s.k == 'stat') {
      VPI = fimg(img.vp, 'brightness(.55) saturate(.7)');
      pr('statue', x, G + 2);
      VPI = null;
    } else if (s.k == 'ruin') {
      const hs = [44 + s.v * 10, 66 - s.v * 8, 30];
      [0, 26, 52].forEach((dx, j) => {
        ctx.fillStyle = '#34404f';
        ctx.fillRect(x + dx, G - hs[j], 14, hs[j]);
        ctx.fillStyle = '#4c5b70';
        ctx.fillRect(x + dx, G - hs[j], 4, hs[j]);
        ctx.fillStyle = '#232c38';
        ctx.fillRect(x + dx + 11, G - hs[j], 3, hs[j]);
        ctx.fillRect(x + dx + 3, G - hs[j] - 3, 8, 3);
      });
      ctx.fillStyle = '#34404f';
      ctx.fillRect(x + 8, G - 8, 10, 8);
      ctx.fillRect(x + 36, G - 5, 8, 5);
      ctx.fillStyle = '#3d6f5a';
      ctx.fillRect(x + 2, G - 30, 3, 2);
      ctx.fillRect(x + 28, G - 20, 3, 2);
      ctx.fillStyle = 'rgba(111,240,224,' + (0.5 + 0.4 * Math.sin(t * 2 + s.x)) + ')';
      ctx.fillRect(x + 28, G - 34, 2, 6);
    } else if (s.k == 'tower') {
      for (const dx of [-16, 14]) {
        ctx.fillStyle = '#2e2016';
        ctx.fillRect(x + dx, G - 62, 4, 62);
        ctx.fillStyle = '#4a3424';
        ctx.fillRect(x + dx, G - 62, 1, 62);
      }
      ctx.fillStyle = '#3a2a1c';
      ctx.fillRect(x - 20, G - 64, 44, 5);
      ctx.fillRect(x - 20, G - 80, 3, 16);
      ctx.fillRect(x + 21, G - 80, 3, 16);
      ctx.fillRect(x - 20, G - 80, 44, 2);
      ctx.fillStyle = '#4a3a22';
      for (let k = 0; k < 5; k++) ctx.fillRect(x - 24 + k * 10, G - 92 + k * 0, 12, 4);
      ctx.fillStyle = '#6a5030';
      ctx.fillRect(x - 22, G - 94, 48, 4);
      torchAt(x + 22, G - 84, t, 1.2);
    } else if (s.k == 'stone') {
      ctx.fillStyle = '#3a4658';
      ctx.fillRect(x - 7, G - 44, 14, 44);
      ctx.fillStyle = '#51607a';
      ctx.fillRect(x - 7, G - 44, 4, 44);
      ctx.fillStyle = '#272f3d';
      ctx.fillRect(x + 4, G - 44, 3, 44);
      ctx.fillRect(x - 5, G - 48, 10, 4);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = '#4fe8d8';
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 2 + s.x);
      ctx.fillRect(x - 1, G - 38, 2, 18);
      ctx.fillRect(x - 4, G - 30, 8, 2);
      ctx.globalAlpha = 0.06;
      pdisc(x, G - 30, 22);
      ctx.restore();
      ctx.globalAlpha = 1;
    } else {
      ctx.drawImage(fimg(img.hut, 'brightness(.5) saturate(.8)'), x - 50, G - 70);
      ctx.fillStyle = 'rgba(255,170,70,' + (0.55 + 0.2 * Math.sin(t * 7 + s.x)) + ')';
      ctx.fillRect(x - 26, G - 18, 5, 8);
    }
  }
}
function drawFore(t) {
  const night = area == 5,
    off = cam * 1.3;
  for (let x = Math.floor(off / 46) * 46 - 46; x < off + W + 46; x += 46) {
    const i = Math.floor(x / 46),
      h = 16 + Math.floor(rh(i) * 26),
      px = Math.round(x - off),
      sw = Math.round(Math.sin(t * 1.5 + i) * 2);
    for (let b = 0; b < 4; b++) {
      const bh = h - b * 4,
        bx = px + b * 5 + Math.round((sw * (b + 1)) / 4);
      ctx.fillStyle = night
        ? ['#07120d', '#0b1a12', '#10241a'][b % 3]
        : ['#16331c', '#1e4a26', '#2a6030'][b % 3];
      ctx.fillRect(bx, H - bh, 3, bh);
      ctx.fillRect(bx + (b % 2 ? 2 : -2) + sw, H - bh - 3, 3, 3);
    }
  }
}
function nightShade() {
  const G = GROUND;
  ctx.fillStyle = 'rgba(10,16,48,.55)';
  ctx.fillRect(0, G - 10, W, 46);
}
function drawTeleOld(t) {
  if (area != 1) return;
  const x = Math.round(TELE.x - cam),
    G = GROUND;
  if (x < -90 || x > W + 90) return;
  ctx.fillStyle = '#2a3450';
  ctx.fillRect(x - 36, G - 2, 72, 2);
  ctx.fillStyle = '#3a4660';
  ctx.fillRect(x - 34, G - 8, 68, 6);
  ctx.fillStyle = '#4e5c7c';
  ctx.fillRect(x - 28, G - 14, 56, 6);
  ctx.fillStyle = '#6a7a9a';
  ctx.fillRect(x - 28, G - 14, 56, 2);
  for (const dx of [-24, 24]) {
    ctx.fillStyle = '#46546e';
    ctx.fillRect(x + dx - 5, G - 66, 10, 52);
    ctx.fillStyle = '#5a6a88';
    ctx.fillRect(x + dx - 5, G - 66, 3, 52);
    ctx.fillStyle = '#2a3450';
    ctx.fillRect(x + dx + 3, G - 66, 2, 52);
    ctx.fillStyle = 'rgba(120,255,235,' + (0.6 + 0.4 * Math.sin(t * 3 + dx)) + ')';
    for (let k = 0; k < 4; k++) ctx.fillRect(x + dx - 1, G - 60 + k * 10, 2, 5);
  }
  ctx.fillStyle = '#4e5c7c';
  ctx.fillRect(x - 30, G - 74, 60, 8);
  ctx.fillStyle = '#6a7a9a';
  ctx.fillRect(x - 30, G - 74, 60, 2);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#6ff0e0';
  for (let i = 0; i < 5; i++) {
    ctx.globalAlpha = 0.08 + 0.03 * Math.sin(t * 2 + i);
    ctx.fillRect(x - 19 + i * 3, G - 68, 38 - i * 6, 54);
  }
  for (let i = 0; i < 10; i++) {
    const q = (t * 0.5 + i / 10) % 1;
    ctx.globalAlpha = 1 - q;
    ctx.fillStyle = '#bff8f0';
    ctx.fillRect(Math.round(x - 16 + ((i * 37) % 32)), Math.round(G - 14 - q * 54), 2, 2);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  if (state == 'play' && Math.abs(p.x - TELE.x) < 70) {
    ctx.fillStyle = '#fff';
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5);
    ctx.fillText('[E] VIAJAR A LA NOCHE', x, G - 84);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
}
function startTele() {
  state = 'tele';
  TF = { t: 0 };
  sfx('portal');
}
function drawTeleFx() {
  const k = TF.t / 2.2,
    px = Math.round(p.x - cam),
    py = Math.round(p.y - 30);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#7ff5e8';
  for (let i = 5; i >= 1; i--) {
    ctx.globalAlpha = 0.09 + k * 0.08;
    pdisc(px, py, Math.round(((18 + k * k * 430) * i) / 5));
  }
  for (let i = 0; i < 18; i++) {
    const a = i * 0.35 + TF.t * 5,
      r = (1 - ((TF.t * 0.9 + i / 18) % 1)) * (140 + k * 260);
    ctx.globalAlpha = 0.8;
    ctx.fillRect(Math.round(px + Math.cos(a) * r), Math.round(py + Math.sin(a) * r * 0.7), 4, 4);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  if (k > 0.8) {
    ctx.fillStyle = 'rgba(235,255,250,' + Math.min(1, (k - 0.8) * 5) + ')';
    ctx.fillRect(0, 0, W, H);
  }
}
function drawShrines(t) {
  if (area != 1 && area != 5) return;
  for (const c of CPS) {
    const x = Math.round(c.x - cam);
    if (x < -60 || x > W + 60) continue;
    const y = GROUND;
    ctx.fillStyle = '#232c3d';
    ctx.fillRect(x - 9, y - 6, 18, 6);
    ctx.fillStyle = '#2f3a50';
    ctx.fillRect(x - 6, y - 26, 12, 20);
    ctx.fillStyle = '#3b4864';
    ctx.fillRect(x - 8, y - 30, 16, 5);
    ctx.fillRect(x - 4, y - 34, 8, 5);
    ctx.fillStyle = '#10161f';
    ctx.fillRect(x - 3, y - 24, 6, 10);
    const a = c.on ? 1 : 0.25;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y - 20, 2, x, y - 20, c.on ? 60 : 22);
    g.addColorStop(0, 'rgba(94,242,224,' + 0.5 * a + ')');
    g.addColorStop(1, 'rgba(94,242,224,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 60, y - 80, 120, 100);
    ctx.restore();
    ctx.fillStyle = c.on ? '#9ffff3' : '#3b6f78';
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 14);
    ctx.lineTo(x + Math.sin(t * 6 + c.x) * 1.5, y - 24 - (c.on ? 4 : 0) - Math.random() * (c.on ? 3 : 0));
    ctx.lineTo(x + 3, y - 14);
    ctx.fill();
  }
}
const EYES = {
  slime: [
    [3, 6],
    [6, 6],
  ],
  slimeC: [
    [3, 6],
    [6, 6],
  ],
  slimeF: [
    [3, 5],
    [6, 5],
  ],
  eye: [[3, 5]],
  cat: [
    [3, 2],
    [5, 2],
  ],
  bat: [
    [4, 3],
    [6, 3],
  ],
  ghost: [
    [4, 14],
    [8, 14],
  ],
  skel: [
    [3, 5],
    [6, 5],
  ],
  skelG: [
    [3, 11],
    [6, 11],
  ],
  skelH: [
    [5, 8],
    [8, 8],
  ],
  hood: [
    [6, 6],
    [9, 6],
  ],
};
function gaze(e, w, h, fly, flip) {
  const L = EYES[e.t];
  if (!L) return;
  const atk = e.st == 1 || e.st == 2 || e.pounce;
  const ex = p.x - e.x,
    ey = pcy() - (fly ? e.y : e.y - h / 2),
    d = Math.hypot(ex, ey) || 1,
    gx = (ex / d) * flip,
    gy = ey / d;
  for (const q of L) {
    const lx = (q[0] + 0.5) * 3 - w / 2,
      ly = (q[1] + 0.5) * 3 - (fly ? h / 2 : h);
    ctx.fillStyle = atk ? '#ffe3e3' : '#f2f5ff';
    ctx.fillRect(lx - 2.5, ly - 2.5, 5, 5);
    ctx.fillStyle = atk ? '#e0121c' : '#0d1018';
    ctx.fillRect(lx - 1.3 + gx * 1.5, ly - 1.3 + gy * 1.5, 2.6, 2.6);
  }
  if (atk) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const q of L) {
      const lx = (q[0] + 0.5) * 3 - w / 2,
        ly = (q[1] + 0.5) * 3 - (fly ? h / 2 : h),
        g = ctx.createRadialGradient(lx, ly, 1, lx, ly, 12);
      g.addColorStop(0, 'rgba(255,40,40,.75)');
      g.addColorStop(1, 'rgba(255,40,40,0)');
      ctx.fillStyle = g;
      ctx.fillRect(lx - 12, ly - 12, 24, 24);
    }
    ctx.restore();
  }
}

/* ---------- 16-nivel-escenario.js ---------- */
/* ===== NIVEL 1 (estilo Kingdom Two Crowns): colinas y pinos, tierra en corte y rio con reflejo ===== */
const SCW = 600,
  SCH = 337.5;
function drawBG1(t) {
  ctx.imageSmoothingEnabled = false;
  const G = GROUND,
    top = Math.round(G - 262),
    night = area == 5;
  if (night) {
    drawNightSky(t, top);
  } else {
    ctx.drawImage(img.sky, 0, 0, 1, 1, 0, 0, W, top + 2);
    ctx.drawImage(img.sky, 0, 0, 1, 675, 0, top, W, SCH);
    ctx.drawImage(img.sky, 0, 674, 1, 1, 0, top + SCH - 1, W, H);
  }
  const cls = [img.cl1, img.cl2, img.cl3],
    cy = [top + 22, top + 58, top + 8];
  if (!night)
    for (let k = 0; k < 3; k++) {
      const im = cls[k],
        w = im.width / 2,
        h = im.height / 2,
        m = W + w + 60,
        x = ((((k * 310 + t * (5 + k * 2.5) - cam * 0.03) % m) + m) % m) - w - 30;
      ctx.drawImage(im, Math.round(x), Math.round(cy[k]), w, h);
    }
  if (!night) ctx.drawImage(img.mon, Math.round(300 - cam * 0.03 - 157), Math.round(G - 30 - 247), 315, 247);
  const off = cam * 0.3;
  for (let k = Math.floor(off / SCW); k <= Math.floor(off / SCW) + 2; k++) {
    ctx.save();
    ctx.translate(k * SCW - off + (k & 1 ? SCW : 0), top);
    if (k & 1) ctx.scale(-1, 1);
    ctx.scale(0.5, 0.5);
    for (let y = 0; y < 520; y += 12) {
      const sw = Math.sin(t * 1.2 + y * 0.015 + k) * (y < 420 ? 2.4 * (1 - y / 520) : 0);
      ctx.drawImage(img.scn, 0, y, 1200, 12, sw, y, 1200, 12);
    }
    ctx.drawImage(img.scn, 0, 520, 1200, 155, 0, 520, 1200, 155);
    ctx.restore();
  }
  if (night) {
    ctx.globalCompositeOperation = 'multiply';
    {
      const mg = ctx.createLinearGradient(0, top - 20, 0, top + 110);
      mg.addColorStop(0, '#ffffff');
      mg.addColorStop(1, '#34447e');
      ctx.fillStyle = mg;
    }
    ctx.fillRect(0, 0, W, G + 2);
    ctx.globalCompositeOperation = 'source-over';
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#4fe8d8';
    ctx.globalAlpha = 0.1 + 0.06 * Math.sin(t * 1.6);
    pdisc(Math.round(300 - cam * 0.03), Math.round(G - 30 - 247 + 28), 12);
    ctx.restore();
    ctx.globalAlpha = 1;
    for (let i = 0; i < 22; i++) {
      const x = (((i * 83 + t * (6 + (i % 4) * 3) + Math.sin(t + i) * 14) % W) + W) % W,
        y = G - 20 - ((i * 47 + t * (8 + (i % 5) * 3)) % (G - 80));
      ctx.fillStyle = 'rgba(210,255,120,' + (0.4 + 0.5 * Math.abs(Math.sin(t * 2 + i))) + ')';
      ctx.fillRect(Math.round(x), Math.round(y), 3, 3);
    }
    return;
  }
  const k = Math.max(0, Math.min(1, p.x / Math.max(1, LEVEL - 300))),
    warm = Math.sin(Math.min(1, k * 1.25) * Math.PI * 0.8),
    dusk = Math.max(0, (k - 0.62) / 0.38);
  if (warm > 0) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#ffb050';
    for (let i = 4; i >= 1; i--) {
      ctx.globalAlpha = 0.035 * warm;
      pdisc(Math.round(W * 0.82), Math.round(G - 90), Math.round(50 + i * 52));
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = 'rgba(255,160,70,' + 0.1 * warm + ')';
  ctx.fillRect(0, 0, W, G);
  ctx.fillStyle = 'rgba(60,30,110,' + 0.34 * dusk + ')';
  ctx.fillRect(0, 0, W, G);
  for (let i = 0; i < 18; i++) {
    const x = (((i * 83 + t * (8 + (i % 4) * 3) + Math.sin(t + i) * 14) % W) + W) % W,
      y = G - 20 - ((i * 47 + t * (10 + (i % 5) * 4)) % (G - 60));
    if (dusk > 0.25) {
      ctx.fillStyle =
        'rgba(210,255,120,' + (0.4 + 0.5 * Math.abs(Math.sin(t * 2 + i))) * Math.min(1, dusk * 1.6) + ')';
      ctx.fillRect(Math.round(x), Math.round(y), 3, 3);
    } else {
      ctx.fillStyle = i % 3 ? 'rgba(250,255,190,.7)' : 'rgba(120,205,110,.9)';
      ctx.fillRect(Math.round(x), Math.round(y), i % 3 ? 2 : 3, 2);
    }
  }
}
function rh(n) {
  return Math.abs(Math.sin(n * 127.1) * 43758.5453) % 1;
}
const GLY = [
  (() => {
    const p = [];
    for (let a = 0; a < 18.8; a += 0.4) {
      const r = a * 0.42;
      p.push([Math.round(Math.cos(a) * r), Math.round(Math.sin(a) * r)]);
    }
    return p;
  })(),
  (() => {
    const p = [];
    for (let a = 0; a < 6.28; a += 0.4) p.push([Math.round(Math.cos(a) * 4), Math.round(Math.sin(a) * 4)]);
    for (let k = 0; k < 8; k++) {
      const a = k * 0.785;
      for (let r = 6; r < 9; r++) p.push([Math.round(Math.cos(a) * r), Math.round(Math.sin(a) * r)]);
    }
    return p;
  })(),
  [
    [-9, 2],
    [-8, 0],
    [-7, -2],
    [-6, 0],
    [-5, 2],
    [-4, 0],
    [-3, -2],
    [-2, 0],
    [-1, 2],
    [0, 0],
    [1, -2],
    [2, 0],
    [3, 2],
    [4, 0],
    [5, -2],
    [6, 0],
    [7, 2],
    [8, 0],
    [9, -2],
  ],
  [
    [0, -6],
    [1, -6],
    [-1, -6],
    [0, -5],
    [0, -4],
    [0, -3],
    [0, -2],
    [0, -1],
    [0, 0],
    [-1, 1],
    [-2, 2],
    [1, 1],
    [2, 2],
    [-4, -3],
    [-3, -3],
    [-2, -3],
    [2, -3],
    [3, -3],
    [4, -3],
  ],
  (() => {
    const p = [];
    for (let i = 0; i < 4; i++) {
      const s = 8 - i * 2;
      for (let k = -s; k <= s; k++) p.push([k, -s], [k, s], [-s, k], [s, k]);
    }
    return p;
  })(),
];
function drawGrass() {
  const t = performance.now() / 1000,
    G = GROUND,
    T = img.tl,
    x0 = Math.floor(cam / 10) * 10;
  const bands = ['#8a5c34', '#7e5330', '#744c2c', '#6a4528', '#5f3e24', '#553820'];
  for (let b = 0; b < 17; b++) {
    ctx.fillStyle = bands[Math.min(5, Math.floor(b / 3))];
    ctx.fillRect(0, G + b * 2, W, 2);
  }
  ctx.fillStyle = 'rgba(40,24,12,.5)';
  for (let x = Math.floor(cam / 120) * 120 - 120; x < cam + W + 120; x += 120) {
    const i = Math.floor(x / 120),
      cx = Math.round(x - cam + rh(i) * 80),
      cy = G + 4 + Math.floor(rh(i + 9) * 18);
    ctx.fillRect(cx, cy, 10 + Math.floor(rh(i + 3) * 14), 2);
    ctx.fillRect(cx + 8, cy + 2, 2, 6);
    ctx.fillRect(cx + 10, cy + 8, 8, 2);
  }
  for (let x = Math.floor(cam / 410) * 410 - 410; x < cam + W + 410; x += 410) {
    const i = Math.floor(x / 410),
      gl = GLY[((i % 5) + 5) % 5],
      gx = Math.round(x + 205 - cam),
      gy = G + 17;
    ctx.fillStyle = '#2e1c0e';
    for (const [a, b] of gl) ctx.fillRect(gx + a * 2 + 1, gy + b * 2 + 1, 2, 2);
    ctx.fillStyle = '#b88e58';
    for (const [a, b] of gl) ctx.fillRect(gx + a * 2, gy + b * 2, 2, 2);
  }
  ctx.fillStyle = '#2a1a0c';
  ctx.fillRect(0, G + 32, W, 2);
  drawGroundNat(t, G);
  for (const pl of platforms) drawPlat9(pl);
}
/* ===== optimizacion: copia unica de la franja a reflejar (antes se copiaba el canvas sobre si mismo ~40 veces por cuadro) ===== */
let RFC = null,
  RFX = null;
function grabBand(y0, y1) {
  const Y0 = Math.max(0, Math.floor(y0 * 2)),
    Y1 = Math.min(cv.height, Math.ceil(y1 * 2)),
    h = Math.max(1, Y1 - Y0);
  if (!RFC || RFC.width != cv.width || RFC.height < h) {
    RFC = document.createElement('canvas');
    RFC.width = cv.width;
    RFC.height = Math.max(h, RFC ? RFC.height : 0);
    RFX = RFC.getContext('2d');
    RFX.imageSmoothingEnabled = false;
  }
  RFX.clearRect(0, 0, RFC.width, h);
  RFX.drawImage(cv, 0, Y0, cv.width, h, 0, 0, cv.width, h);
  return Y0;
}
function drawWater1(t) {
  const G = GROUND,
    wt = G + 34,
    hh = H - wt;
  let g = ctx.createLinearGradient(0, wt, 0, H);
  g.addColorStop(0, area == 5 ? '#0c2030' : '#2d5a3a');
  g.addColorStop(1, area == 5 ? '#050d1a' : '#1c3a3a');
  ctx.fillStyle = g;
  ctx.fillRect(0, wt, W, hh);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, wt, W, hh);
  ctx.clip();
  ctx.globalAlpha = 0.6;
  const B0 = grabBand(Math.max(0, G - 4 - hh), G - 2);
  for (let y = 0; y < hh; y += 2) {
    const sy = G - 4 - y;
    if (sy < 0) break;
    const o = Math.sin(t * 1.8 + y * 0.4 + cam * 0.012) * (1 + y * 0.03);
    ctx.drawImage(RFC, 0, sy * 2 - B0, W * 2, 4, o, wt + y, W, 2);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  g = ctx.createLinearGradient(0, wt, 0, H);
  g.addColorStop(0, 'rgba(10,30,24,.15)');
  g.addColorStop(1, 'rgba(8,24,30,.6)');
  ctx.fillStyle = g;
  ctx.fillRect(0, wt, W, hh);
  ctx.fillStyle = 'rgba(225,245,235,.4)';
  for (let i = 0; i < 46; i++) {
    const x = (((i * 97 + t * (10 + (i % 5) * 4) - cam * 0.5) % W) + W) % W,
      y = wt + 4 + ((i * 31) % (hh - 6));
    ctx.fillRect(Math.round(x), Math.round(y), 6 + (i % 4) * 3, 1);
  }
  ctx.fillStyle = '#17281a';
  ctx.fillRect(0, wt, W, 2);
}

/* ---------- 17-campamentos-npc.js ---------- */
/* ===== CAMPAMENTOS Y NPC DEL ANTIGUO MULUKUKU ===== */
let NPCS = [],
  talk = null;
const CAMPS = [
  {
    x: 600,
    n: [
      ['elder', -48],
      ['weaver', 52],
    ],
  },
  {
    x: 1450,
    n: [
      ['guard', -52],
      ['stele', 64],
    ],
  },
  {
    x: 2300,
    n: [
      ['sage', -34],
      ['weaver', 56],
    ],
  },
  {
    x: 3150,
    n: [
      ['elder', -52],
      ['guard', 54],
    ],
  },
];
const NPCD = {
  elder: {
    i: 'npe',
    nm: 'La Anciana del Fuego · sukia',
    V: [
      {
        g: ['sword', 'nac'],
        L: [
          '¡Ay, santo! ¿Y vos de dónde saliste? Sos rarísima, criatura: esa ropa, ese pelo, esa cara de recién caída del cielo. ¿De dónde sos, pues?',
          '¿Smara, te llamás? ¿Y no sabés de dónde venís? Mmm... Bueno, aquí estás a salvo junto al fuego. Soy la Anciana del Fuego, la sukia de esta ribera: curo lo que los espíritus enferman y regaño lo que la gente rompe.',
          'No, no estás muerta: ya revisé, y el más allá tiene peor servicio. Estás en Mulukukú, pero en el de antes. En miskito su nombre quiere decir «ribera de sahinos»: la orilla del Tuma donde los chanchos de monte bajaban a beber.',
          'Aquí todo tiene dueño, hija. El agua es de Liwa Mairin, el monte es de los Duhindu que cuidan a los venados, las ceibas viejas tienen espíritu, y allá arriba Prahaku manda sobre el viento, el trueno y el tiempo.',
          'Ellos viven de que la gente los nombre. Cuando dejamos de contar sus historias en la orilla, se fueron apagando, y por las grietas empezó a entrar lo que no tiene nombre. Por eso el eco te llamó: necesitamos a alguien que todavía crea.',
          'Tomá el Alba de Mulukukú, la katana que se templó en el Tuma con la primera luz. Antes de usarla pedile permiso al monte: aquí hasta el palo de jocote tiene quien lo defienda.',
          'Golpeá con J, K o clic: son tres golpes en combo. Ahora andá. Y si morís, no me lo contés: odio el papeleo.',
        ],
      },
      {
        g: ['ind', 'vig'],
        L: [
          'Casi llegás al final del camino, hija. Bajo esta ceiba se contaban los cuentos: del Cadejo blanco que acompaña al que camina de noche, y del negro que lo pierde.',
          'Más allá, el obelisco te lleva a la noche. Si oís silbidos entre los árboles, no contestés: son los Duhindu, y no les gusta que los arremeden.',
          'Tomá indio viejo para sanar y vigorón para golpear con fuerza. Es lo más parecido a un seguro de vida que hay por aquí.',
        ],
      },
    ],
  },
  guard: {
    i: 'npg',
    nm: 'El Guardián del Camino',
    V: [
      {
        g: ['gal', 'pin'],
        L: [
          'Cuidado, viajera. Al final de este camino flota un obelisco, y del otro lado empieza la noche.',
          'Cuando Prahaku truena sin que llueva, algo cruza las grietas. Esas criaturas no son del monte: los Duhindu las odian más que nosotros.',
          'Te siguen con la mirada. Cuando sus ojos se ponen rojos, van a atacar. Cuando ya los ves rojos y seguís ahí parada, ya es tarde.',
          'Los de escudo solo bajan la guardia después de embestir. Esperá, esquivá y golpeá.',
          'Llevá gallo pinto y pinolillo: te darán aliento y pies ligeros. Los pies ligeros son lo único que ha salvado a los guardias de mi familia. A los que quedan.',
        ],
      },
      {
        g: ['ron'],
        L: [
          'Desde esta colina vigilo el obelisco. Quien cruza no siempre vuelve. Yo me quedo con sus zapatos, por si acaso.',
          'En la noche, al final del camino, hay otro obelisco. No te llevará al Puente Roto sin una gema, y esa la guarda un Guardián sellado.',
          'El sello se rompe cuando caen las criaturas de la zona. Casi todas. No hace falta ser perfeccionista, solo seguir viva.',
          'Si de noche un perro blanco camina a tu lado, dejalo: es el Cadejo y te está cuidando. Si es negro... corré, y no mirés atrás.',
          'Tomá este rondón: su fuego te protegerá. Y si no, al menos te calienta mientras te rodean.',
        ],
      },
    ],
  },
  weaver: {
    i: 'npw',
    nm: 'La Tejedora de Estrellas',
    V: [
      {
        g: ['que'],
        L: [
          'Tejo el cielo en cada hilo. Cada estrella es el nombre de alguien que no debemos olvidar: un abuelo, un río, un espíritu.',
          'En el Mulukukú antiguo los nombres se guardaban contándolos en la orilla. Este pueblo se levantó del lodo y del huracán más de una vez, y siempre fue igual: primero se recuerda, después se reconstruye.',
          'Tomá este quesillo: te protege como un escudo. Dura tres golpes, como la paciencia de mi suegro, que en paz descanse.',
        ],
      },
      {
        g: ['tis'],
        L: [
          'Mi abuela decía que Liwa Mairin se lleva al que ensucia el río, y que a veces se enamora de los pescadores. También decía que no mirara a la luna. Murió mirando la luna.',
          'Hay una Liwa blanca que comparte la pesca y una negra que no perdona. Por eso al Tuma se le habla con respeto, aunque sea para pedirle una mojarra.',
          'Tomá tiste: te dejará hacer más con menos esfuerzo. Con el miedo no funciona; ya probé.',
        ],
      },
    ],
  },
  sage: {
    i: 'nps',
    nm: 'El Memorioso',
    V: [
      {
        g: ['cac', 'ros'],
        L: [
          'Los espíritus no mueren. Duermen cuando nadie los recuerda. A los humanos nos pasa igual, pero con funeral.',
          'Arlos cuidaba el puente entre el mundo de los vivos y el de los dueños, ahí donde el Tuma se dobla. Cuando la gente olvidó, el puente se partió y él se quedó del otro lado, cuidando un cruce que ya no existe.',
          'No es tu enemigo: es un dolor viejo que la grieta usa. Eso no le impide querer matarte, ojo.',
          'Dicen que el Aubiya sale a las tres de la tarde entre las palmeras para enredar a los que maltratan a los animales. Si te perdés a esa hora, no es el mapa: es él.',
          'Llevá cacao y rosquillas. El cacao te devuelve fuerza con cada golpe, y la rosquilla te da alas: doble salto, no resurrección.',
        ],
      },
    ],
  },
  stele: {
    i: 'stl',
    nm: 'Estela de Mulukukú',
    V: [
      {
        g: null,
        L: [
          'Estela del antiguo Mulukukú, «ribera de sahinos».',
          '«Quien nombre a los dueños del agua, del monte y del cielo, sostendrá el cielo. Quien los olvide, lo verá caer.»',
          'Más abajo alguien rayó: «Aquí quedó Fulano, por no creer». Qué manera de recibir una reseña.',
          'Al pie de la piedra brilla una runa con forma de sahino. Parece reconocerte. O le caés mal; con las runas nunca se sabe.',
        ],
      },
    ],
  },
};
function nearNPC() {
  let b = null,
    bd = 56;
  for (const n of NPCS) {
    const d = Math.abs(p.x - n.x);
    if (d < bd) {
      bd = d;
      b = n;
    }
  }
  return b;
}
function npcData(n) {
  const d = NPCD[n.k];
  return d.V[n.vi % d.V.length];
}
function startTalk(n) {
  state = 'talk';
  talk = { n, i: 0, s: 0 };
  sfx('page');
}
function giveGifts(v, n) {
  const gs = Array.isArray(v.g) ? v.g : v.g ? [v.g] : [];
  for (const g of gs) {
    if (g == 'sword') {
      hasSword = true;
      p.victT = 1.8;
      say('Obtuviste la Katana Legendaria «Alba de Mulukuku»');
      flashW = 0.5;
      sfx('boom');
    } else if (addItem(g)) say('Recibiste: ' + ITEMS[ALIAS[g] || g].n);
  }
  n.done = true;
  sfx('pick');
}
function talkNext() {
  const v = npcData(talk.n),
    full = v.L[talk.i];
  if (talk.s * 32 < full.length) {
    talk.s = 999;
    return;
  }
  if (++talk.i >= v.L.length) {
    if (v.g && !talk.n.done) giveGifts(v, talk.n);
    state = 'play';
  } else talk.s = 0;
}
function drawTalk() {
  const n = talk.n,
    v = npcData(n),
    d = NPCD[n.k],
    x = n.x - cam;
  bubble2(x, GROUND - (n.k == 'stele' ? 96 : 92), v.L[talk.i], Math.floor(talk.s * 32));
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd77a';
  ctx.fillText(d.nm, Math.max(90, Math.min(W - 90, Math.round(x))), GROUND + 14);
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.5 + 0.5 * Math.sin(performance.now() / 250);
  ctx.fillText('[E]', Math.max(90, Math.min(W - 90, Math.round(x))), GROUND + 27);
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}
function drawCamps(t) {
  if (area != 1) return;
  const G = GROUND;
  for (const c of CAMPS) {
    const x = Math.round(c.x - cam);
    if (x < -260 || x > W + 260) continue;
    ctx.drawImage(img.hut, x - 135, G - 70);
    dressCamp(c.x, x, G, t);
    ctx.fillStyle = '#4a2c18';
    ctx.fillRect(x - 14, G - 5, 28, 4);
    ctx.fillRect(x - 10, G - 8, 20, 4);
    ctx.fillStyle = '#2a1a0e';
    ctx.fillRect(x - 14, G - 2, 28, 2);
    ctx.save();
    ctx.translate(x, G - 7);
    ctx.scale(2, 2);
    pflame(0, 0, t);
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#ff9a3a';
    for (let i = 4; i >= 1; i--) {
      ctx.globalAlpha = 0.05 + 0.01 * Math.sin(t * 9);
      pdisc(x, G - 14, i * 16);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    for (let i = 0; i < 5; i++) {
      const q = (t * 0.5 + i / 5) % 1;
      ctx.fillStyle = 'rgba(60,50,50,' + 0.5 * (1 - q) + ')';
      ctx.fillRect(Math.round(x + Math.sin(t + i) * 5), Math.round(G - 28 - q * 40), 3, 3);
    }
    if (Math.abs(p.x - c.x) < 110 && p.hp < 100)
      for (let i = 0; i < 3; i++) {
        const q = (t * 0.8 + i / 3) % 1,
          px = Math.round(p.x - cam + (i - 1) * 8),
          py = Math.round(p.y - 30 - q * 34);
        ctx.fillStyle = 'rgba(120,255,150,' + (1 - q) + ')';
        ctx.fillRect(px, py, 3, 3);
        ctx.fillRect(px + 1, py - 1, 1, 5);
      }
  }
  for (const n of NPCS) drawNPC(n, t);
}

/* ---------- 18-portal.js ---------- */
/* ===== PORTAL DE PIEDRA ===== */
let PORTAL = { x: 4800 };
let PF = { t: 0 };
function gateAlpha() {
  return area == 5 ? Math.max(0, Math.min(1, (p.x - (PORTAL.x - 350)) / 260)) : 0;
}
function rune(cx, cy, s, col) {
  ctx.fillStyle = col;
  for (let i = 0; i < 3; i++) {
    const o = i * 5 * s;
    ctx.fillRect(cx - 14 * s + o, cy - 14 * s + o, 3 * s, 28 * s - o * 2);
    ctx.fillRect(cx - 14 * s + o, cy - 14 * s + o, 24 * s - o * 2, 3 * s);
  }
  ctx.fillRect(cx + 4 * s, cy - 14 * s, 3 * s, 12 * s);
  ctx.fillRect(cx + 4 * s, cy - 3 * s, 10 * s, 3 * s);
}
function drawGateOld(t) {
  const a = gateAlpha();
  if (a <= 0) return;
  const x = Math.round(PORTAL.x - cam),
    y = GROUND;
  ctx.save();
  ctx.globalAlpha = a;
  for (const dx of [-120, 118]) {
    ctx.fillStyle = '#14100d';
    ctx.fillRect(x + dx, y - 190, 6, 190);
    ctx.fillRect(x + dx - 12, y - 150, 12, 4);
    ctx.fillRect(x + dx + 6, y - 120, 12, 4);
    ctx.fillRect(x + dx - 10, y - 90, 10, 4);
    ctx.fillStyle = 'rgba(255,120,40,' + (0.5 + 0.3 * Math.sin(t * 3 + dx)) + ')';
    ctx.fillRect(x + dx + 2, y - 170, 2, 60);
  }
  ctx.globalCompositeOperation = 'lighter';
  let g = ctx.createRadialGradient(x, y - 70, 10, x, y - 70, 180);
  g.addColorStop(0, 'rgba(255,120,30,' + (0.3 + 0.08 * Math.sin(t * 3)) + ')');
  g.addColorStop(1, 'rgba(255,100,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - 180, y - 250, 360, 270);
  ctx.globalCompositeOperation = 'source-over';
  for (const [rx, ry, rw, rh] of [
    [x - 62, y - 132, 26, 132],
    [x + 36, y - 132, 26, 132],
    [x - 62, y - 146, 124, 20],
  ]) {
    ctx.fillStyle = '#262c35';
    ctx.fillRect(rx, ry, rw, rh);
    for (let yy = ry; yy < ry + rh; yy += 10)
      for (let xx = rx + ((yy / 10) % 2) * 6; xx < rx + rw; xx += 14) {
        ctx.fillStyle = (xx + yy) % 3 ? '#343b46' : '#2d343e';
        ctx.fillRect(xx, yy, Math.min(13, rx + rw - xx), 9);
        ctx.fillStyle = '#161a20';
        ctx.fillRect(xx, yy + 9, 13, 1);
      }
  }
  ctx.fillStyle = '#6b6a35';
  for (let i = 0; i < 10; i++) ctx.fillRect(x - 62 + ((i * 23) % 110), y - 146 + ((i * 37) % 140), 3, 2);
  ctx.fillStyle = '#4b2a18';
  ctx.fillRect(x - 36, y - 126, 72, 126);
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 6; i++) {
    const k = (t * 0.5 + i / 6) % 1;
    ctx.globalAlpha = a * (1 - k) * 0.35;
    ctx.fillStyle = '#ff8a2a';
    ctx.fillRect(x - 36, y - k * 126, 72, 8);
  }
  ctx.globalAlpha = a;
  g = ctx.createRadialGradient(x, y - 72, 4, x, y - 72, 50);
  g.addColorStop(0, 'rgba(255,140,50,' + (0.5 + 0.2 * Math.sin(t * 3)) + ')');
  g.addColorStop(1, 'rgba(255,100,30,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - 40, y - 126, 80, 126);
  ctx.globalCompositeOperation = 'source-over';
  rune(x, y - 72, 1.5, 'rgba(255,130,40,' + (0.75 + 0.25 * Math.sin(t * 3)) + ')');
  for (let i = 0; i < 12; i++) {
    const q = (t * 0.25 + i / 12) % 1;
    ctx.fillStyle = 'rgba(255,' + (130 + i * 8) + ',50,' + (1 - q) + ')';
    ctx.fillRect(Math.round(x - 50 + ((i * 37 + t * 8) % 100)), Math.round(y - q * 140), 2, 2);
  }
  ctx.restore();
  if (state == 'play' && a > 0.8 && Math.abs(p.x - PORTAL.x) < 80) {
    ctx.fillStyle = '#fff';
    ctx.font = '9px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText('[E] ENTER', x, y - 160);
    ctx.textAlign = 'left';
  }
}
function startPortal() {
  state = 'portalfx';
  PF = { t: 0 };
  sfx('portal');
}
function pfxOverlay() {
  const k = PF.t / 3.2,
    cx = Math.round(PORTAL.x - cam),
    cy = GROUND - 80;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60 + k * k * 700);
  g.addColorStop(0, 'rgba(255,170,70,' + Math.min(1, k * 1.6) + ')');
  g.addColorStop(0.5, 'rgba(255,110,30,' + k * 0.7 + ')');
  g.addColorStop(1, 'rgba(255,90,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 16; i++) {
    const a = i * 0.9 + PF.t * 3,
      r = (1 - ((PF.t * 0.8 + i / 16) % 1)) * (120 + k * 300);
    ctx.fillStyle = 'rgba(255,150,60,.7)';
    ctx.fillRect(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.7), 4, 4);
  }
  ctx.restore();
  rune(cx, cy, 1.5 + k * 6, 'rgba(255,200,120,' + Math.min(0.8, k) + ')');
  if (k > 0.82) {
    ctx.fillStyle = 'rgba(255,236,200,' + Math.min(1, (k - 0.82) * 5.5) + ')';
    ctx.fillRect(0, 0, W, H);
  }
}

/* ---------- 19-arena-jefe.js ---------- */
/* ===== ARENA DEL JEFE: vacio negro con arboles blancos y suelo espejo ===== */
let voidS;
function buildVoid() {
  voidS = document.createElement('canvas');
  voidS.width = 350;
  voidS.height = 203;
  const c = voidS.getContext('2d');
  let sd = 7;
  const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const line = (x0, y0, x1, y1, w) => {
    const n = Math.max(1, Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let i = 0; i <= n; i++)
      c.fillRect(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), w, w);
  };
  const br = (x, y, a, l, w, d) => {
    if (d <= 0 || l < 3) return;
    const x1 = x + Math.cos(a) * l,
      y1 = y - Math.sin(a) * l;
    c.fillStyle = d > 3 ? '#f6f6f6' : '#d4d4d4';
    line(x, y, x1, y1, w);
    br(x1, y1, a + 0.45 * (rnd() + 0.3), l * 0.72, Math.max(1, w - (d > 3 ? 1 : 0)), d - 1);
    br(x1, y1, a - 0.45 * (rnd() + 0.3), l * 0.7, Math.max(1, w - (d > 3 ? 1 : 0)), d - 1);
    if (rnd() < 0.4) br(x1, y1, a + (rnd() - 0.5) * 0.6, l * 0.5, 1, d - 2);
  };
  br(176, 150, 1.5, 30, 4, 6);
  br(172, 150, 1.95, 18, 3, 5);
  br(180, 150, 1.15, 16, 2, 4);
  br(138, 150, 1.7, 26, 2, 5);
  br(56, 150, 1.5, 12, 1, 3);
  for (let k = 0; k < 5; k++) {
    const x = 262 + k * 5,
      h = 24 + (k % 2) * 5;
    c.fillStyle = '#ececec';
    line(x, 150, x, 150 - h, 1);
    for (let j = 0; j < 5; j++) {
      c.fillRect(x - 2, 150 - h + j * 4, 2, 1);
      c.fillRect(x + 1, 152 - h + j * 4, 2, 1);
    }
  }
  for (let i = 0; i < 10; i++) {
    const x = 20 + i * 34 + (i % 3) * 5;
    c.fillStyle = '#bdbdbd';
    line(x, 150, x + (i % 2 ? 2 : -2), 142 - (i % 3) * 3, 1);
  }
  c.fillStyle = '#bcbcbc';
  c.fillRect(0, 150, 350, 2);
  c.fillStyle = '#fff';
  c.fillRect(0, 150, 350, 1);
}
const VST = Array.from({ length: 70 }, (_, i) => ({ x: (i * 83.7) % 700, y: (i * 47.9) % 280, s: i % 3 }));
function drawVoid(t) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  for (const s of VST) {
    ctx.fillStyle = 'rgba(255,255,255,' + (0.15 + 0.5 * Math.abs(Math.sin(t * 0.8 + s.x))) + ')';
    ctx.fillRect(Math.round((s.x + t * 2) % W), s.y, s.s ? 2 : 1, s.s ? 2 : 1);
  }
  if (!voidS) buildVoid();
  ctx.drawImage(voidS, 0, 0, W, H);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  let g = ctx.createRadialGradient(352, 230, 10, 352, 230, 170);
  g.addColorStop(0, 'rgba(255,255,255,' + (0.1 + 0.03 * Math.sin(t)) + ')');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(150, 60, 400, 260);
  for (let k = 0; k < 3; k++) {
    const bx0 = k == 0 ? 130 : k == 1 ? 530 : 620,
      by0 = k == 0 ? 220 : k == 1 ? 250 : 150;
    for (let j = 14; j >= 0; j--) {
      const tt = t - j * 0.04,
        x = bx0 + Math.sin(tt * 0.7 + k * 2) * 24,
        y = by0 + Math.sin(tt * 1.1 + k) * 16 - j * 1.5;
      ctx.globalAlpha = (1 - j / 15) * 0.35;
      ctx.fillStyle = '#fff';
      ctx.fillRect(Math.round(x - 3 + j * 0.2), Math.round(y), 6 - j * 0.3, 6 - j * 0.3);
    }
    const x = bx0 + Math.sin(t * 0.7 + k * 2) * 24,
      y = by0 + Math.sin(t * 1.1 + k) * 16;
    g = ctx.createRadialGradient(x, y, 2, x, y, 26);
    g.addColorStop(0, 'rgba(255,255,255,.9)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = g;
    ctx.fillRect(x - 26, y - 26, 52, 52);
  }
  for (let k = 0; k < 2; k++) {
    const ph = (t * 0.22 + k * 0.5) % 1;
    if (ph < 0.35) {
      const q = ph / 0.35,
        x = 420 + k * 40 - q * 220,
        y = 30 + k * 30 + q * 120;
      ctx.globalAlpha = 1 - q;
      ctx.fillStyle = '#fff';
      for (let j = 0; j < 18; j++)
        ctx.fillRect(Math.round(x + j * 3), Math.round(y - j * 1.6), 3 - j * 0.12, 2);
    }
  }
  ctx.globalAlpha = 1;
  g = ctx.createLinearGradient(0, GROUND - 50, 0, GROUND);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(255,255,255,' + (0.1 + 0.04 * Math.sin(t * 0.7)) + ')');
  ctx.fillStyle = g;
  ctx.fillRect(0, GROUND - 50, W, 50);
  ctx.restore();
}
function drawReflect(t) {
  const G = GROUND,
    hh = H - G - 4;
  ctx.save();
  ctx.globalAlpha = 0.42;
  const B0 = grabBand(Math.max(0, G - 2 - hh), G);
  for (let y = 0; y < hh; y += 2) {
    if (G - 2 - y < 0) break;
    const o = Math.sin(t * 2.4 + y * 0.35) * (1 + y * 0.03);
    ctx.drawImage(RFC, 0, (G - 2 - y) * 2 - B0, W * 2, 4, o, G + 4 + y, W, 2);
  }
  ctx.restore();
  const g = ctx.createLinearGradient(0, G + 4, 0, H);
  g.addColorStop(0, 'rgba(0,0,0,.15)');
  g.addColorStop(1, 'rgba(0,0,0,.9)');
  ctx.fillStyle = g;
  ctx.fillRect(0, G + 4, W, hh);
}
function startBoss() {
  B.on = true;
  B.st = 'enter';
  B.t = 0;
  B.px = cam + W * 0.74 + 170;
  B.x = B.px;
  B.y = GROUND - 70;
  B.face = -1;
  B.a = 0;
  say('Algo se mueve en el Puente Roto...');
}

/* ---------- 20-animaciones.js ---------- */
/* ===== ANIMACIONES DEL PERSONAJE ===== */
let fx = [];
function pcy() {
  return p.y - (p.crouch ? 20 : 32);
}
function puff(x, y, n, dir) {
  for (let k = 0; k < n; k++)
    fx.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y - 1,
      vx: (Math.random() - 0.5) * 40 - (dir || 0) * 30,
      vy: -10 - Math.random() * 25,
      l: 0.35 + Math.random() * 0.2,
    });
}
const SM = {
    cw: 130,
    ch: 108,
    ax: 56,
    ay: 95,
    cols: 10,
    idx: {
      Running_01: 0,
      Running_02: 1,
      Running_03: 2,
      Running_04: 3,
      Running_05: 4,
      Running_06: 5,
      Running_07: 6,
      Running_08: 7,
      Victory_01: 8,
      Victory_02: 9,
      Victory_03: 10,
      Victory_04: 11,
      Victory_05: 12,
      Victory_06: 13,
      Victory_07: 14,
      Backward_Kick_01: 15,
      Backward_Kick_02: 16,
      Backward_Kick_03: 17,
      Backward_Kick_04: 18,
      Backward_Kick_05: 19,
      Backward_Kick_06: 20,
      Downward_Slash_01: 21,
      Downward_Slash_02: 22,
      Downward_Slash_03: 23,
      Downward_Slash_04: 24,
      Downward_Slash_05: 25,
      Downward_Slash_06: 26,
      Downward_Slash_07: 27,
      Downward_Slash_08: 28,
      Downward_Stab_01: 29,
      Downward_Stab_02: 30,
      Downward_Stab_03: 31,
      Downward_Stab_04: 32,
      Downward_Stab_05: 33,
      Regular_Slash_01: 34,
      Regular_Slash_02: 35,
      Regular_Slash_03: 36,
      Regular_Slash_04: 37,
      Regular_Slash_05: 38,
      Regular_Slash_06: 39,
      Regular_Slash_07: 40,
      idle_0: 41,
      idle_1: 42,
      idle_2: 43,
      idle_3: 44,
      jumpUp: 45,
      fall: 46,
      land: 47,
      crouch: 48,
      crouchW1: 49,
      crouchW2: 50,
      dash: 51,
      hurt: 52,
      lie: 53,
      sleep: 54,
      wake1: 55,
      wake2: 56,
      kneel: 57,
    },
  },
  HI = SM.idx,
  RUN = HI.Running_01,
  VIC = HI.Victory_01,
  KICK = HI.Backward_Kick_01;
const ATK = [
  { f: HI.Regular_Slash_01, n: 7, d: 0.05, h: 0.1, e: 0.36, dm: 1 },
  { f: HI.Downward_Slash_01, n: 8, d: 0.045, h: 0.18, e: 0.38, dm: 1.15 },
  { f: HI.Downward_Stab_01, n: 5, d: 0.065, h: 0.2, e: 0.34, dm: 1.7 },
  // ataques nuevos (22b-ataques-smara.js arma sus cuadros, giros y medias lunas)
  { f: HI.Regular_Slash_03, n: 1, d: 0.05, h: 0.08, e: 0.42, dm: 1.1, nom: 'giro' }, // 3: giro completo (pega adelante y atrás)
  { f: HI.Regular_Slash_05, n: 1, d: 0.05, h: 0.14, e: 0.42, dm: 1.5, nom: 'estocada' }, // 4: estocada baja con embestida
  { f: HI.Regular_Slash_04, n: 1, d: 0.05, h: 0.1, e: 0.5, dm: 1.8, nom: 'ascendente' }, // 5: tajo ascendente que la levanta
  { f: HI.Regular_Slash_03, n: 1, d: 0.05, h: 0.06, e: 0.46, dm: 0.9, nom: 'remolino' }, // 6: remolino en el aire (3 golpes)
  { f: HI.Downward_Stab_04, n: 1, d: 0.05, h: 0.3, e: 0.66, dm: 1.4, nom: 'picada' }, // 7: picada (S en el aire) con onda al caer
];
function wf(f) {
  return { fi: f };
}

/* ---------- 21-personalizacion.js ---------- */
/* ===== PERSONALIZACION DEL PERSONAJE: recoloreo del sprite + peinados + accesorios ===== */
const LOOK_DEF = {
  hair: 0,
  cloth: 0,
  head: 0,
  face: 0,
  col: { hair: '#141018', skin: '#f2c4bc', cloth: '#ffffff', shoe: '#ffffff' },
};
const LPAL = [
  '#fbe7d9',
  '#f2c4bc',
  '#e0a989',
  '#c68863',
  '#8d5a3f',
  '#5a3626',
  '#141018',
  '#4a3426',
  '#8a5a2b',
  '#d8a548',
  '#f0e6c0',
  '#ffffff',
  '#e04848',
  '#f08a3c',
  '#f4d04a',
  '#5cc06a',
  '#2f8f6a',
  '#3a9fd8',
  '#3d5bd0',
  '#7a4fd0',
  '#d05ab0',
  '#f4a6c8',
  '#8a8f99',
  '#2a2d3a',
];
const HAIRS = ['Largo', 'Corto', 'Coletas', 'Moño', 'Cola'],
  CLOTHS = ['Liso', 'Rayas', 'Lunares', 'Cinturón', 'Bicolor'];
const HEADS = [
  { n: 'Nada' },
  { n: 'Lazo', m: 'bow', c: '#e8414e', dx: -11, dy: 1 },
  { n: 'Gorra', m: 'cap', c: '#3a6fd8', dx: -8, dy: -3 },
  { n: 'Sombrero', m: 'witch', c: '#5b3aa0', dx: -8, dy: -10 },
  { n: 'Corona', m: 'crown', c: '#f2c43a', dx: -5, dy: -5 },
  { n: 'Flor', m: 'flower', c: '#f48ab8', dx: 3, dy: 1 },
  { n: 'Orejas', m: 'ears', c: '#2a2030', dx: -8, dy: -4 },
];
const FACES = [
  { n: 'Nada' },
  { n: 'Lentes', m: 'glasses', c: '#1a1420', g: 'rgba(205,235,255,.6)' },
  { n: 'Gafas de sol', m: 'glasses', c: '#1a1420', g: '#241c2c' },
];
const LMAP = {
  bow: ['.aa...aa.', 'adla.alda', 'aaaakaaaa', 'adda.adda', '.aa...aa.'],
  cap: [
    '....aaaaaaa......',
    '..aaaaaaaaaaa....',
    '.aaaaaaaaalaa....',
    '.aaaaaaaaaaaaa...',
    '.dddddddddddddddd',
  ],
  witch: [
    '.........kk.....',
    '........kak.....',
    '.......kaak.....',
    '......kaaak.....',
    '.....kaaaak.....',
    '....kaaaaak.....',
    '....kaaaaaak....',
    '...kyyyyyyyyk...',
    '.kaaaaaaaaaaaak.',
    'kaaaaaaaaaaaaaak',
    '.kkkkkkkkkkkkkk.',
  ],
  crown: ['y....y....y', 'a...ala...a', 'aa.aaaaa.aa', 'aaaaaraaaaa', 'aaaaaaaaaaa', 'ddddddddddd'],
  flower: ['.a.a.', 'aayaa', '.aaa.', 'n.n.n', '..n..'],
  ears: ['..k.........k...', '.kak.......kak..', '.kpak.....kpak..', 'kaaaak...kaaaak.'],
  glasses: ['.kkk.kkk.', 'kgggkgggk', '.kkk.kkk.'],
};
let LOOK = JSON.parse(JSON.stringify(LOOK_DEF)),
  LOOKB = null,
  HRC = null,
  HCLS = null,
  HSRC = null,
  HANC = [],
  LOOKV = null;
try {
  const s = JSON.parse(localStorage.getItem('asagmba_look'));
  if (s) {
    Object.assign(LOOK, s);
    LOOK.col = Object.assign({}, LOOK_DEF.col, s.col || {});
  }
} catch (e) {}
const hex3 = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function shadeHex(h, k) {
  const c = hex3(h).map(v => Math.max(0, Math.min(255, Math.round(v * k))));
  return 'rgb(' + c.join(',') + ')';
}
function lookPrep() {
  const im = img.hr,
    w = im.width,
    h = im.height,
    c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const x = c.getContext('2d');
  x.drawImage(im, 0, 0);
  HSRC = x.getImageData(0, 0, w, h).data;
  const d = HSRC;
  HCLS = new Uint8Array(w * h);
  const dk = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (d[i * 4 + 3] < 10) continue;
    const r = d[i * 4],
      g = d[i * 4 + 1],
      b = d[i * 4 + 2],
      mx = Math.max(r, g, b),
      mn = Math.min(r, g, b);
    if (mx < 70) {
      dk[i] = 1;
      HCLS[i] = 5;
    } else
      HCLS[i] =
        r - b >= 18 && r >= 90 && r >= g ? 2 : mx - mn < 26 || (mx > 140 && mx - mn < 70 && b >= r) ? 3 : 6;
  }
  const CW = SM.cw,
    CH = SM.ch,
    cols = SM.cols,
    rows = Math.floor(h / CH),
    core = new Uint8Array(w * h),
    seen = new Uint8Array(w * h),
    lying = [HI.lie, HI.sleep];
  for (let fi = 0; fi < cols * rows; fi++) {
    const X0 = (fi % cols) * CW,
      Y0 = Math.floor(fi / cols) * CH,
      inF = (x, y) => x >= X0 && x < X0 + CW && y >= Y0 && y < Y0 + CH;
    // pelo = masa oscura gruesa (no las lineas finas del contorno ni los ojos)
    for (let y = Y0 + 1; y < Y0 + CH - 1; y++)
      for (let x = X0 + 1; x < X0 + CW - 1; x++) {
        const i = y * w + x;
        if (!dk[i]) continue;
        let n = 0;
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) n += dk[i + a * w + b];
        if (n >= 8) core[i] = 1;
      }
    for (let y = Y0; y < Y0 + CH; y++)
      for (let x = X0; x < X0 + CW; x++) {
        const i = y * w + x;
        if (!core[i] || seen[i]) continue;
        const q = [i],
          comp = [];
        seen[i] = 1;
        while (q.length) {
          const j = q.pop();
          comp.push(j);
          const jx = j % w,
            jy = (j / w) | 0;
          for (const [nx, ny] of [
            [jx + 1, jy],
            [jx - 1, jy],
            [jx, jy + 1],
            [jx, jy - 1],
          ]) {
            if (!inF(nx, ny)) continue;
            const k = ny * w + nx;
            if (core[k] && !seen[k]) {
              seen[k] = 1;
              q.push(k);
            }
          }
        }
        if (comp.length >= 20)
          for (const j of comp) {
            HCLS[j] = 1;
            const jx = j % w,
              jy = (j / w) | 0;
            for (let a = -1; a <= 1; a++)
              for (let b = -1; b <= 1; b++) {
                const k = (jy + a) * w + jx + b;
                if (inF(jx + b, jy + a) && dk[k]) HCLS[k] = 1;
              }
          }
      }
    let foot = -1,
      ht = 999;
    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CW; x++) {
        const k = HCLS[(Y0 + y) * w + X0 + x];
        if (!k) continue;
        if (y > foot) foot = y;
        if (k == 1 && y < ht) ht = y;
      }
    if (ht == 999 || foot < 0) {
      HANC[fi] = { ok: false };
      continue;
    }
    let sx = 0,
      n = 0,
      hl = 999,
      hr = -1;
    for (let y = ht; y < ht + 10; y++)
      for (let x = 0; x < CW; x++)
        if (HCLS[(Y0 + y) * w + X0 + x] == 1) {
          if (y < ht + 6) {
            sx += x;
            n++;
          }
          if (x < hl) hl = x;
          if (x > hr) hr = x;
        }
    const hx = n ? sx / n : CW / 2;
    const lie = lying.includes(fi);
    let ex = 0,
      ey = 0,
      en = 0,
      fx = 0,
      fn = 0,
      ct = 999;
    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CW; x++) {
        const i = (Y0 + y) * w + X0 + x,
          k = HCLS[i];
        if (k == 3 && !lie && (y < ht + 21 || Math.abs(x - hx) > (y > foot - 15 ? 34 : 16))) HCLS[i] = 6;
        if (HCLS[i] == 3 && y < ct) ct = y;
        if (k == 5 && y >= ht + 5 && y <= ht + 22 && Math.abs(x - hx) < 14) {
          ex += x;
          ey += y;
          en++;
        }
        if (k == 2 && y >= ht + 8 && y <= ht + 18) {
          fx += x;
          fn++;
        }
      }
    if (!lie) {
      const cs = [];
      for (let y = 0; y < CH; y++)
        for (let x = 0; x < CW; x++) {
          const i = (Y0 + y) * w + X0 + x;
          if (HCLS[i] != 3 || seen[i] == 2) continue;
          const q = [i],
            comp = [];
          seen[i] = 2;
          let mn = 999,
            x0 = 999,
            x1 = -1,
            y1 = -1;
          while (q.length) {
            const j = q.pop();
            comp.push(j);
            const jx = j % w,
              jy = (j / w) | 0;
            if (jy - Y0 < mn) mn = jy - Y0;
            if (jy - Y0 > y1) y1 = jy - Y0;
            if (jx - X0 < x0) x0 = jx - X0;
            if (jx - X0 > x1) x1 = jx - X0;
            for (const [nx, ny] of [
              [jx + 1, jy],
              [jx - 1, jy],
              [jx, jy + 1],
              [jx, jy - 1],
              [jx + 1, jy + 1],
              [jx - 1, jy + 1],
              [jx + 1, jy - 1],
              [jx - 1, jy - 1],
            ]) {
              if (!inF(nx, ny)) continue;
              const k = ny * w + nx;
              if (HCLS[k] == 3 && seen[k] != 2) {
                seen[k] = 2;
                q.push(k);
              }
            }
          }
          cs.push({ comp, mn, w: x1 - x0 + 1, h: y1 - mn + 1 });
        }
      if (cs.length) {
        cs.sort((a, b) => b.comp.length - a.comp.length);
        const dr = cs[0];
        ct = dr.mn;
        for (const c of cs.slice(1))
          if (c.mn + c.h > dr.mn + dr.h || c.mn > dr.mn + 8) {
            const sh = c.w >= 4 && c.w <= 24 && c.h <= 16 && (c.w <= 14 || c.mn + c.h >= foot - 3);
            for (const j of c.comp) HCLS[j] = sh ? 4 : 6;
          }
      }
    }
    HANC[fi] = {
      ok: !lie,
      ht,
      hx,
      hl,
      hr,
      foot,
      ct: ct == 999 ? ht + 24 : ct,
      ex: en ? ex / en : fn ? fx / fn + 2 : hx + 4,
      ey: en ? ey / en : ht + 13,
      face: en > 0 || fn > 0,
    };
  }
  for (const k of ['wake1', 'wake2']) if (HANC[HI[k]]) HANC[HI[k]].ok = false;
}
function lookApply() {
  if (!HCLS) lookPrep();
  const w = img.hr.width,
    h = img.hr.height;
  if (!HRC) {
    HRC = document.createElement('canvas');
    HRC.width = w;
    HRC.height = h;
  }
  const L = LOOK,
    C = L.col,
    D = LOOK_DEF.col,
    x = HRC.getContext('2d'),
    out = x.createImageData(w, h),
    o = out.data,
    d = HSRC;
  o.set(d);
  const hc = hex3(C.hair),
    sc = hex3(C.skin),
    cc = hex3(C.cloth),
    zc = hex3(C.shoe),
    chH = C.hair != D.hair,
    chS = C.skin != D.skin,
    chC = C.cloth != D.cloth || L.cloth > 0,
    chZ = C.shoe != D.shoe,
    cut = L.hair > 0;
  const lumC = (cc[0] + cc[1] + cc[2]) / 3,
    acc =
      lumC > 150
        ? [cc[0] * 0.55, cc[1] * 0.55, cc[2] * 0.62]
        : [Math.min(255, cc[0] + 120), Math.min(255, cc[1] + 120), Math.min(255, cc[2] + 120)];
  const put = (i, c, k) => {
    o[i * 4] = Math.min(255, c[0] * k);
    o[i * 4 + 1] = Math.min(255, c[1] * k);
    o[i * 4 + 2] = Math.min(255, c[2] * k);
  };
  const CW = SM.cw,
    CH = SM.ch,
    cols = SM.cols,
    rows = Math.floor(h / CH);
  for (let fi = 0; fi < cols * rows; fi++) {
    const a = HANC[fi],
      X0 = (fi % cols) * CW,
      Y0 = Math.floor(fi / cols) * CH;
    if (!a) continue;
    const ht = a.ok ? a.ht : 0,
      cut0 = a.ok ? ht + 17 : 999,
      belt = a.ok ? a.ct + 8 : -9,
      mid = a.ok ? (a.ct + a.foot - 11) / 2 : 999;
    for (let y = 0; y < CH; y++)
      for (let xx = 0; xx < CW; xx++) {
        const i = (Y0 + y) * w + X0 + xx,
          k = HCLS[i];
        if (!k) continue;
        const l = (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3;
        if (k == 1) {
          if (cut && y > cut0) {
            o[i * 4 + 3] = 0;
            continue;
          }
          if (chH) {
            const e = HCLS[i - 1] != 1 || HCLS[i + 1] != 1 || HCLS[i - w] != 1 || HCLS[i + w] != 1,
              dy = y - ht,
              hl = !e && a.ok && dy >= 2 && dy <= 4 && Math.abs(xx - a.hx) < 8 && (xx + dy) % 4 != 0;
            put(
              i,
              hc,
              e
                ? 0.58
                : hl
                  ? 1.42
                  : (1.12 - Math.min(0.32, dy / 90)) * ((xx + (dy >> 2)) % 3 == 0 ? 0.86 : 1),
            );
          }
        } else if (k == 2 && chS) put(i, sc, Math.min(1.15, l / 215));
        else if (k == 3 && chC) {
          let kk = Math.min(1.08, l / 240),
            c = cc;
          if (L.cloth == 1 && (y >> 1) % 2) kk *= 0.8;
          else if (L.cloth == 2 && (xx + (y >> 2) * 2) % 4 == 0 && y % 4 == 1) c = acc;
          else if (L.cloth == 3 && (y == belt || y == belt + 1)) c = acc;
          else if (L.cloth == 4 && y > mid) kk *= 0.72;
          put(i, c, kk);
        } else if (k == 4 && chZ) put(i, zc, Math.min(1.08, l / 240));
      }
    if (cut && a.ok)
      for (let y = cut0 + 1; y < CH; y++)
        for (let xx = 0; xx < CW; xx++) {
          const i = (Y0 + y) * w + X0 + xx;
          if (HCLS[i] != 1) continue;
          let L1 = -1,
            R1 = -1;
          for (let s = 1; s <= 6; s++) {
            if (L1 < 0 && xx - s >= 0) {
              const j = i - s;
              if (HCLS[j] >= 2 && HCLS[j] != 5) L1 = j;
            }
            if (R1 < 0 && xx + s < CW) {
              const j = i + s;
              if (HCLS[j] >= 2 && HCLS[j] != 5) R1 = j;
            }
          }
          if (L1 >= 0 && R1 >= 0) {
            const j = i - L1 <= R1 - i ? L1 : R1;
            o[i * 4] = o[j * 4];
            o[i * 4 + 1] = o[j * 4 + 1];
            o[i * 4 + 2] = o[j * 4 + 2];
            o[i * 4 + 3] = 255;
          }
        }
  }
  x.putImageData(out, 0, 0);
  if (typeof FIMG != 'undefined') FIMG.delete(HRC);
}
function lpix(map, x0, y0, col, lens, s) {
  const P = {
    a: col,
    d: shadeHex(col, 0.62),
    l: shadeHex(col, 1.45),
    k: '#1a1420',
    w: '#ffffff',
    y: '#ffd84a',
    g: lens || '#bfe6ff',
    r: '#d8304a',
    p: '#f4a6c8',
    n: '#4caf50',
  };
  s = s || 1;
  for (let r = 0; r < map.length; r++)
    for (let c = 0; c < map[r].length; c++) {
      const ch = map[r][c];
      if (ch == '.') continue;
      ctx.fillStyle = P[ch];
      ctx.fillRect(x0 + c * s, y0 + r * s, s, s);
    }
}
function hairTail(x0, y0, len, dir, sw, col, t) {
  const dk = shadeHex(col, 0.6);
  for (let pass = 0; pass < 2; pass++) {
    ctx.fillStyle = pass ? col : dk;
    for (let i = 0; i < len; i++) {
      const wv = Math.max(1, 3.4 - (i / len) * 2.2) + (pass ? 0 : 1.2),
        x = x0 + dir * (i * 0.28 + sw * i * 0.55) + Math.sin(t * 7 + i * 0.45) * 0.7 * (0.3 + sw),
        y = y0 + i * (1 - sw * 0.45);
      ctx.fillRect(Math.round(x - wv / 2), Math.round(y), Math.round(wv), 1);
    }
  }
}
function lookOver(fi) {
  const a = HANC[fi];
  if (!a || !a.ok) return;
  const L = LOOK,
    col = L.col.hair,
    ax = SM.ax,
    ay = SM.ay,
    hx = Math.round(a.hx) - ax,
    ht = a.ht - ay,
    t = performance.now() / 1000;
  const v = LOOKV != null ? LOOKV : typeof p == 'object' && p ? Math.abs(p.vx || 0) : 0,
    sw = Math.min(1, v / 320);
  const hl = a.hl - ax,
    hr = a.hr - ax;
  if (L.hair == 2) {
    hairTail(hl + 1, ht + 7, 13, -1, sw * 0.6, col, t);
    hairTail(hr - 1, ht + 8, 11, 1, 0, col, t + 1);
  } else if (L.hair == 3) {
    ctx.fillStyle = shadeHex(col, 0.6);
    ctx.beginPath();
    ctx.arc(hx - 4, ht - 2, 4.6, 0, 7);
    ctx.fill();
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(hx - 4, ht - 2.4, 3.4, 0, 7);
    ctx.fill();
    ctx.fillStyle = shadeHex(col, 1.6);
    ctx.fillRect(hx - 5, ht - 3, 2, 1);
  } else if (L.hair == 4) {
    hairTail(hl + 1, ht + 4, 16, -1, sw, col, t);
    ctx.fillStyle = L.col.cloth == '#ffffff' ? '#e8414e' : L.col.cloth;
    ctx.fillRect(hl, ht + 3, 3, 2);
  }
  const H = HEADS[L.head];
  if (H && H.m) lpix(LMAP[H.m], hx + H.dx, ht + H.dy, H.c);
  const F = FACES[L.face];
  if (F && F.m && a.face) lpix(LMAP[F.m], Math.round(a.ex) - ax - 4, Math.round(a.ey) - ay - 1, F.c, F.g);
}
let HFLT = null;
function hdraw(fi) {
  const SRCI = HRC || img.hr;
  ctx.drawImage(
    HFLT ? fimg(SRCI, HFLT) : SRCI,
    (fi % SM.cols) * SM.cw,
    Math.floor(fi / SM.cols) * SM.ch,
    SM.cw,
    SM.ch,
    -SM.ax,
    -SM.ay,
    SM.cw,
    SM.ch,
  );
  if (HANC.length) lookOver(fi);
}
function lookSave() {
  try {
    localStorage.setItem('asagmba_look', JSON.stringify(LOOK));
  } catch (e) {}
}

/* ---- pantalla PERSONALIZAR (desde el menu de inicio) ---- */
let CU = { t: 0, tgt: 'hair', face: 1, mx: -1, my: -1, hit: [] };
function enterCust() {
  if (!HCLS) lookApply();
  LOOKB = JSON.parse(JSON.stringify(LOOK));
  CU = { t: 0, tgt: 'hair', face: 1, mx: -1, my: -1, hit: [] };
  state = 'cust';
  sfx('pick');
}
function custSet(f) {
  f();
  lookApply();
  sfx('hit');
}
function custOk() {
  lookSave();
  state = 'menu';
  sfx('pick');
}
function custBack() {
  if (LOOKB) {
    LOOK = LOOKB;
    lookApply();
  }
  state = 'menu';
}
function custRand() {
  const r = n => Math.floor(Math.random() * n),
    pick = a => a[r(a.length)];
  custSet(() => {
    LOOK = {
      hair: r(HAIRS.length),
      cloth: r(CLOTHS.length),
      head: Math.random() < 0.7 ? r(HEADS.length) : 0,
      face: Math.random() < 0.35 ? 1 + r(2) : 0,
      col: {
        hair: pick([
          '#141018',
          '#4a3426',
          '#8a5a2b',
          '#d8a548',
          '#f0e6c0',
          '#e04848',
          '#3d5bd0',
          '#7a4fd0',
          '#f4a6c8',
          '#5cc06a',
        ]),
        skin: pick(LPAL.slice(0, 6)),
        cloth: pick(LPAL.slice(11)),
        shoe: pick(LPAL.slice(6)),
      },
    };
  });
}
function custKey(e) {
  if (e.code == 'Enter') custOk();
  else if (e.code == 'Escape' || e.code == 'Backspace') custBack();
  else if (e.code == 'KeyR') custRand();
  else if (e.code == 'ArrowLeft' || e.code == 'ArrowRight' || e.code == 'KeyA' || e.code == 'KeyD')
    CU.face *= -1;
}
function custClick(e) {
  const [x, y] = mpos(e);
  for (const h of CU.hit)
    if (x >= h.x && x < h.x + h.w && y >= h.y && y < h.y + h.h) {
      h.f();
      return;
    }
}
function cuPanel(x, y, w, h, title) {
  ctx.fillStyle = '#3d4a4c';
  ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
  ctx.fillStyle = '#9aa7a5';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#b9c4c1';
  ctx.fillRect(x, y, w, 1);
  if (title) {
    ctx.fillStyle = '#6c7a79';
    ctx.fillRect(x + 4, y + 4, w - 8, 14);
    ctx.fillStyle = '#f4f1e6';
    ctx.font = '7px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText(title, x + w / 2, y + 14);
    ctx.textAlign = 'left';
  }
}
function cuCell(x, y, s, sel, f) {
  const hov = CU.mx >= x && CU.mx < x + s && CU.my >= y && CU.my < y + s;
  ctx.fillStyle = hov ? '#5d8f8a' : '#4b6e6b';
  ctx.fillRect(x, y, s, s);
  ctx.fillStyle = '#365251';
  ctx.fillRect(x, y + s - 2, s, 2);
  if (sel) {
    ctx.fillStyle = '#ffc23a';
    const L = 6;
    for (const [cx, cy, dx, dy] of [
      [x - 1, y - 1, 1, 1],
      [x + s + 1, y - 1, -1, 1],
      [x - 1, y + s + 1, 1, -1],
      [x + s + 1, y + s + 1, -1, -1],
    ]) {
      ctx.fillRect(dx > 0 ? cx : cx - L, dy > 0 ? cy : cy - 2, L, 2);
      ctx.fillRect(dx > 0 ? cx : cx - 2, dy > 0 ? cy : cy - L, 2, L);
    }
  }
  CU.hit.push({ x, y, w: s, h: s, f });
}
function cuBtn(x, y, w, h, txt, c1, c2, f) {
  const hov = CU.mx >= x && CU.mx < x + w && CU.my >= y && CU.my < y + h;
  ctx.fillStyle = '#2a2226';
  ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
  ctx.fillStyle = hov ? c2 : c1;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'rgba(255,255,255,.25)';
  ctx.fillRect(x, y, w, 2);
  ctx.fillStyle = 'rgba(0,0,0,.25)';
  ctx.fillRect(x, y + h - 3, w, 3);
  ctx.fillStyle = '#fff';
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillText(txt, x + w / 2, y + h / 2 + 4);
  ctx.textAlign = 'left';
  CU.hit.push({ x, y, w, h, f });
}
function iconHair(cx, cy, st) {
  const C = LOOK.col,
    hc = C.hair,
    dk = shadeHex(hc, 0.6);
  ctx.fillStyle = hc;
  if (st == 0) {
    ctx.fillRect(cx - 8, cy - 3, 16, 15);
    ctx.fillStyle = dk;
    ctx.fillRect(cx - 8, cy + 10, 16, 2);
  }
  if (st == 2) {
    ctx.fillRect(cx - 11, cy + 1, 4, 10);
    ctx.fillRect(cx + 7, cy + 1, 4, 10);
  }
  if (st == 3) {
    ctx.beginPath();
    ctx.arc(cx, cy - 9, 4, 0, 7);
    ctx.fill();
  }
  if (st == 4) {
    ctx.fillRect(cx - 11, cy - 2, 4, 12);
    ctx.fillRect(cx - 12, cy + 8, 3, 4);
  }
  ctx.fillStyle = C.skin;
  ctx.fillRect(cx - 6, cy - 3, 12, 11);
  ctx.fillStyle = hc;
  ctx.fillRect(cx - 7, cy - 7, 14, 5);
  ctx.fillRect(cx - 7, cy - 3, 3, st == 1 ? 6 : 4);
  ctx.fillRect(cx + 4, cy - 3, 3, st == 1 ? 6 : 3);
  ctx.fillStyle = '#1a1420';
  ctx.fillRect(cx - 3, cy + 2, 2, 2);
  ctx.fillRect(cx + 2, cy + 2, 2, 2);
}
function iconCloth(cx, cy, st) {
  const c = LOOK.col.cloth,
    dk = shadeHex(c, 0.62);
  for (let y = 0; y < 16; y++) {
    const w = y < 6 ? 8 : 8 + (y - 6);
    for (let x = 0; x < w * 2; x++) {
      let col = c;
      if (st == 1 && (y >> 1) % 2) col = shadeHex(c, 0.8);
      if (st == 2 && (x + (y >> 2) * 2) % 4 == 0 && y % 4 == 1) col = dk;
      if (st == 3 && (y == 6 || y == 7)) col = dk;
      if (st == 4 && y > 8) col = shadeHex(c, 0.72);
      ctx.fillStyle = col;
      ctx.fillRect(cx - w + x, cy - 8 + y, 1, 1);
    }
  }
  ctx.fillStyle = C2(c);
  ctx.fillRect(cx - 9, cy - 8, 3, 6);
  ctx.fillRect(cx + 6, cy - 8, 3, 6);
}
function C2(c) {
  return LOOK.col.skin;
}
function drawCust() {
  CU.hit = [];
  CU.t += 1 / 60;
  const t = CU.t;
  ctx.drawImage(img.mb, 0, 0, W, H);
  ctx.fillStyle = 'rgba(8,14,16,.55)';
  ctx.fillRect(0, 0, W, H);
  // vista previa
  cuPanel(22, 22, 214, 362);
  ctx.fillStyle = '#6fa9a2';
  ctx.fillRect(28, 28, 202, 350);
  for (let i = 0; i < 9; i++) {
    ctx.fillStyle = 'rgba(255,255,255,' + (0.05 + 0.03 * Math.sin(t + i)) + ')';
    ctx.fillRect(28, 40 + i * 38, 202, 1);
  }
  const cyc = t % 8,
    fi =
      cyc < 3.5
        ? HI['idle_' + (Math.floor(t * 3) % 4)]
        : cyc < 6
          ? RUN + (Math.floor(t * 12) % 8)
          : VIC + Math.min(6, Math.floor((cyc - 6) * 7));
  LOOKV = cyc >= 3.5 && cyc < 6 ? 260 : 0;
  ctx.fillStyle = 'rgba(20,40,40,.35)';
  ctx.beginPath();
  ctx.ellipse(129, 318, 46, 9, 0, 0, 7);
  ctx.fill();
  ctx.save();
  ctx.translate(129, 318);
  ctx.scale(3.6 * CU.face, 3.6);
  hdraw(fi);
  ctx.restore();
  LOOKV = null;
  CU.hit.push({
    x: 28,
    y: 28,
    w: 202,
    h: 300,
    f: () => {
      CU.face *= -1;
    },
  });
  ctx.fillStyle = '#e9f3f0';
  ctx.font = '6px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillText('clic para girar', 129, 350);
  ctx.fillText(HAIRS[LOOK.hair] + ' · ' + CLOTHS[LOOK.cloth], 129, 364);
  ctx.textAlign = 'left';
  // titulo
  cuPanel(246, 22, 432, 22);
  ctx.fillStyle = '#f4f1e6';
  ctx.font = '10px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillText('PERSONALIZAR', 462, 38);
  ctx.textAlign = 'left';
  // cabello
  cuPanel(246, 52, 212, 128, 'CABELLO');
  HAIRS.forEach((n, i) => {
    const x = 258 + (i % 4) * 48,
      y = 74 + Math.floor(i / 4) * 48;
    cuCell(x, y, 40, LOOK.hair == i, () => custSet(() => (LOOK.hair = i)));
    iconHair(x + 20, y + 22, i);
  });
  ctx.fillStyle = '#2d3a3b';
  ctx.font = '6px ' + PS;
  ctx.fillText(HAIRS[LOOK.hair].toUpperCase(), 306 + 52, 150);
  // ropa
  cuPanel(466, 52, 212, 128, 'ROPA');
  CLOTHS.forEach((n, i) => {
    const x = 478 + (i % 4) * 48,
      y = 74 + Math.floor(i / 4) * 48;
    cuCell(x, y, 40, LOOK.cloth == i, () => custSet(() => (LOOK.cloth = i)));
    iconCloth(x + 20, y + 21, i);
  });
  ctx.fillStyle = '#2d3a3b';
  ctx.font = '6px ' + PS;
  ctx.fillText(CLOTHS[LOOK.cloth].toUpperCase(), 526 + 52, 150);
  // accesorios
  cuPanel(246, 188, 212, 146, 'ACCESORIOS');
  HEADS.forEach((a, i) => {
    const x = 256 + (i % 5) * 40,
      y = 210 + Math.floor(i / 5) * 40;
    cuCell(x, y, 34, LOOK.head == i, () => custSet(() => (LOOK.head = i)));
    if (a.m) {
      const m = LMAP[a.m],
        s = m[0].length > 12 ? 1.6 : 2;
      lpix(
        m,
        Math.round(x + 17 - (m[0].length * s) / 2),
        Math.round(y + 17 - (m.length * s) / 2),
        a.c,
        null,
        s,
      );
    } else {
      ctx.strokeStyle = '#c4d2cf';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + 17, y + 17, 8, 0, 7);
      ctx.moveTo(x + 11, y + 23);
      ctx.lineTo(x + 23, y + 11);
      ctx.stroke();
    }
  });
  FACES.forEach((a, i) => {
    if (!i) return;
    const x = 256 + (i + 1) * 40,
      y = 250;
    cuCell(x, y, 34, LOOK.face == i, () => custSet(() => (LOOK.face = LOOK.face == i ? 0 : i)));
    lpix(LMAP.glasses, x + 8, y + 14, a.c, a.g, 2);
  });
  ctx.fillStyle = '#2d3a3b';
  ctx.font = '6px ' + PS;
  ctx.fillText('CABEZA: ' + HEADS[LOOK.head].n.toUpperCase(), 258, 306);
  ctx.fillText('CARA: ' + FACES[LOOK.face].n.toUpperCase(), 258, 320);
  // colores
  cuPanel(466, 188, 212, 146, 'COLORES');
  LPAL.forEach((c, i) => {
    const x = 474 + (i % 6) * 15,
      y = 212 + Math.floor(i / 6) * 15,
      sel = LOOK.col[CU.tgt] == c;
    ctx.fillStyle = '#2a3333';
    ctx.fillRect(x - 1, y - 1, 14, 14);
    ctx.fillStyle = c;
    ctx.fillRect(x, y, 12, 12);
    if (sel) {
      ctx.strokeStyle = '#ffc23a';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 1, y - 1, 14, 14);
    }
    CU.hit.push({ x, y, w: 13, h: 13, f: () => custSet(() => (LOOK.col[CU.tgt] = c)) });
  });
  [
    ['hair', 'Cabello'],
    ['skin', 'Piel'],
    ['cloth', 'Ropa'],
    ['shoe', 'Zapatos'],
  ].forEach(([k, n], i) => {
    const x = 568,
      y = 210 + i * 21,
      on = CU.tgt == k;
    ctx.fillStyle = on ? '#5d8f8a' : '#7d8b8a';
    ctx.fillRect(x, y, 104, 17);
    if (on) {
      ctx.fillStyle = '#ffc23a';
      ctx.fillRect(x, y, 3, 17);
    }
    ctx.fillStyle = '#f4f1e6';
    ctx.font = '6px ' + PS;
    ctx.fillText(n, x + 7, y + 11);
    ctx.fillStyle = '#1d2526';
    ctx.fillRect(x + 83, y + 2, 15, 13);
    ctx.fillStyle = LOOK.col[k];
    ctx.fillRect(x + 84, y + 3, 13, 11);
    CU.hit.push({
      x,
      y,
      w: 104,
      h: 17,
      f: () => {
        CU.tgt = k;
        sfx('hit');
      },
    });
  });
  ctx.fillStyle = '#2d3a3b';
  ctx.font = '6px ' + PS;
  ctx.fillText('Elige qué pintar', 476, 288);
  ctx.fillText('y luego un color', 476, 300);
  // botones
  cuBtn(246, 346, 136, 30, 'ACEPTAR', '#3e9a4c', '#4fb85e', custOk);
  cuBtn(394, 346, 136, 30, 'ALEATORIO', '#d29a1e', '#eab434', custRand);
  cuBtn(542, 346, 136, 30, 'VOLVER', '#c23c34', '#de5148', custBack);
  ctx.fillStyle = '#c9d6d3';
  ctx.font = '6px ' + PS;
  ctx.fillText('ENTER aceptar · R aleatorio · ESC volver', 246, 396);
}

/* ---------- 21c-inventario.js ---------- */
/* ===== INVENTARIO INTERACTIVO (sistema del juego completo, no solo de la fase) =====
   Se abre con I o Tab. Mientras está abierto el juego queda en pausa.
   Dos pestañas (Q / E, o clic en la pestaña):
   1) OBJETOS: la bolsa de comida (nacatamal, gallo pinto, vigorón...) de 10 filas x 5 columnas.
      Desde aquí se arman las 5 casillas de la BARRA RÁPIDA (teclas 1 a 5).
   2) EQUIPO: los objetos que Smara puede llevar puestos (máximo 3), en una bolsa de 4 filas x 5 columnas.
      Solo funcionan los que están puestos.
   Controles con el inventario abierto:
   - mouse: clic = seleccionar · arrastrar = mover / cambiar de lugar · doble clic = usar / poner o quitar
   - teclado: flechas o WASD = moverse · Enter o Espacio = usar / poner o quitar · 1-5 = mandar a la barra
     · Q / E = cambiar de pestaña · Esc / I / Tab = cerrar
   Cada casilla guarda hasta 9 unidades de lo mismo. */

const INV = {
  open: false,
  tab: 0, // 0 objetos, 1 equipo
  bolsa: new Array(50).fill(null), // [{id, n}] 10 filas x 5 columnas
  barra: new Array(5).fill(null), // barra rápida (teclas 1 a 5)
  eqBolsa: new Array(20).fill(null), // equipables: 4 filas x 5 columnas (guarda la clave)
  eqPuesto: new Array(3).fill(null), // lo que Smara lleva puesto (máximo 3)
  sel: { zona: 'bolsa', i: 0 },
  arr: null, // arrastre en curso
  clicT: 0,
  aviso: '',
  avisoT: 0,
  t0: 0,
};
const INV_COLS = 5,
  INV_FILAS = 10,
  EQ_FILAS = 4,
  PILA = 9;
// objetos equipables registrados por otras partes del juego (por ejemplo los tesoros de la nueva fase)
const EQUIPABLES = [];
function registrarEquipables(lista) {
  for (const q of lista) if (!EQUIPABLES.find(e => e.k == q.k)) EQUIPABLES.push(q);
}
function equipable(k) {
  return EQUIPABLES.find(e => e.k == k);
}
function equipado(k) {
  return INV.eqPuesto.includes(k);
}
function comida(id) {
  return FOODS.find(f => f.id == id);
}

/* ---- datos ---- */
// el resto del juego sigue usando "inv" (conteo por tipo); se recalcula desde las casillas
function invSync() {
  const c = {};
  for (const s of [...INV.bolsa, ...INV.barra]) if (s) c[s.id] = (c[s.id] || 0) + s.n;
  for (const k in inv) delete inv[k];
  Object.assign(inv, c);
}
function invVaciar() {
  INV.bolsa.fill(null);
  INV.barra.fill(null);
  INV.eqBolsa.fill(null);
  INV.eqPuesto.fill(null);
  INV.open = false;
  invSync();
}
// meter un objeto: primero junto a los iguales, luego en la barra si hay hueco, luego en la bolsa
function invAgregar(id, n) {
  id = ALIAS[id] || id;
  if (!comida(id)) return false;
  n = n || 1;
  for (const L of [INV.barra, INV.bolsa])
    for (const s of L)
      while (s && s.id == id && s.n < PILA && n > 0) {
        s.n++;
        n--;
      }
  for (const L of [INV.barra, INV.bolsa])
    for (let i = 0; i < L.length && n > 0; i++)
      if (!L[i]) {
        const k = Math.min(PILA, n);
        L[i] = { id, n: k };
        n -= k;
      }
  invSync();
  return n == 0;
}
function invAgregarEquipable(k) {
  if (!equipable(k) || INV.eqBolsa.includes(k) || INV.eqPuesto.includes(k)) return;
  const libre = INV.eqPuesto.indexOf(null);
  if (libre >= 0) INV.eqPuesto[libre] = k; // si hay un espacio libre, se lo pone sola
  else {
    const j = INV.eqBolsa.indexOf(null);
    if (j >= 0) INV.eqBolsa[j] = k;
  }
}
// usar comida (mismos efectos que antes)
function usarComida(id) {
  const f = comida(id);
  if (!f) return false;
  if (f.id == 'nac') {
    if (p.hp >= 100) {
      say('Vida llena');
      return false;
    }
    p.hp = Math.min(100, p.hp + 60);
  } else if (f.id == 'que') p.shield = 3;
  else buf[f.id] = f.t;
  sfx('pick');
  flashW = 0.05;
  say(f.n + ': ' + f.d);
  return true;
}
function usarCasilla(L, i) {
  const s = L[i];
  if (!s || !usarComida(s.id)) return;
  s.n--;
  if (s.n <= 0) L[i] = null;
  invSync();
}
// teclas 1 a 5 durante el juego
useItem = function (i) {
  if (state != 'play' || i < 0 || i > 4) return;
  usarCasilla(INV.barra, i);
};
addItem = function (id) {
  return invAgregar(id, 1);
};
function invPoner(k) {
  if (INV.eqPuesto.includes(k)) {
    // quitar
    const j = INV.eqBolsa.indexOf(null);
    if (j < 0) return invAvisar('La bolsa de equipo está llena');
    INV.eqPuesto[INV.eqPuesto.indexOf(k)] = null;
    INV.eqBolsa[j] = k;
    sfx('swing');
    return;
  }
  const libre = INV.eqPuesto.indexOf(null);
  if (libre < 0) return invAvisar('Máximo 3 objetos puestos: quitá uno primero');
  INV.eqBolsa[INV.eqBolsa.indexOf(k)] = null;
  INV.eqPuesto[libre] = k;
  sfx('pick');
  flashW = 0.04;
}
function invAvisar(s) {
  INV.aviso = s;
  INV.avisoT = 1.8;
  sfx('parry');
}
// guardar / cargar (lo usa la partida firmada)
function invGuardar() {
  return {
    b: INV.bolsa.map(s => (s ? [s.id, s.n] : 0)),
    h: INV.barra.map(s => (s ? [s.id, s.n] : 0)),
    eb: INV.eqBolsa.map(k => k || 0),
    ep: INV.eqPuesto.map(k => k || 0),
  };
}
function invCargar(d, viejo) {
  invVaciar();
  if (d && Array.isArray(d.b)) {
    const pila = v => (Array.isArray(v) && comida(v[0]) ? { id: v[0], n: Math.max(1, Math.min(PILA, v[1] | 0)) } : null);
    d.b.slice(0, 50).forEach((v, i) => (INV.bolsa[i] = pila(v)));
    (d.h || []).slice(0, 5).forEach((v, i) => (INV.barra[i] = pila(v)));
    (d.eb || []).slice(0, 20).forEach((k, i) => (INV.eqBolsa[i] = typeof k == 'string' ? k : null));
    (d.ep || []).slice(0, 3).forEach((k, i) => (INV.eqPuesto[i] = typeof k == 'string' ? k : null));
  } else if (viejo) for (const id in viejo) invAgregar(id, viejo[id] | 0); // partidas viejas: conteos sueltos
  invSync();
}
// revisión de seguridad (la llama el vigilante de stats en 34-proteccion.js)
function invValidar() {
  const ok = s => s && comida(s.id) && Number.isInteger(s.n) && s.n >= 1 && s.n <= PILA;
  for (const L of [INV.bolsa, INV.barra]) for (let i = 0; i < L.length; i++) if (L[i] && !ok(L[i])) L[i] = null;
  if (INV.bolsa.length != 50) INV.bolsa.length = 50;
  if (INV.barra.length != 5) INV.barra.length = 5;
  if (INV.eqPuesto.length != 3) INV.eqPuesto.length = 3;
  const vistos = new Set();
  for (const L of [INV.eqPuesto, INV.eqBolsa])
    for (let i = 0; i < L.length; i++) {
      const k = L[i];
      if (k && (typeof k != 'string' || vistos.has(k))) L[i] = null;
      else if (k) vistos.add(k);
    }
  invSync();
}

/* ---- abrir / cerrar ---- */
function invToggle() {
  if (!INV.open && state != 'play' && state != 'room') return;
  INV.open = !INV.open;
  INV.arr = null;
  INV.t0 = performance.now() / 1000;
  sfx('swing');
}

/* ---- geometría de la pantalla (en coordenadas del mundo 700x406) ---- */
const IG = { x: 64, y: 50, w: 572, h: 322, c: 21 };
function invCasillas() {
  // devuelve [{zona, i, x, y, s}] de todo lo que se puede tocar en la pestaña actual
  const L = [],
    X = IG.x,
    Y = IG.y;
  if (INV.tab == 0) {
    for (let i = 0; i < 50; i++) L.push({ zona: 'bolsa', i, x: X + 18 + (i % INV_COLS) * IG.c, y: Y + 46 + Math.floor(i / INV_COLS) * IG.c, s: 19 });
    for (let i = 0; i < 5; i++) L.push({ zona: 'barra', i, x: X + 222 + i * 34, y: Y + 262, s: 28 });
  } else {
    for (let i = 0; i < 3; i++) L.push({ zona: 'puesto', i, x: X + 24 + i * 40, y: Y + 238, s: 30 });
    for (let i = 0; i < 20; i++) L.push({ zona: 'eq', i, x: X + 168 + (i % INV_COLS) * 27, y: Y + 50 + Math.floor(i / INV_COLS) * 27, s: 24 });
  }
  return L;
}
const invPestanas = () => [
  { t: 0, x: IG.x + 14, y: IG.y + 8, w: 120, h: 20, n: 'OBJETOS' },
  { t: 1, x: IG.x + 140, y: IG.y + 8, w: 120, h: 20, n: 'EQUIPO' },
];
function invLista(zona) {
  return zona == 'bolsa' ? INV.bolsa : zona == 'barra' ? INV.barra : zona == 'eq' ? INV.eqBolsa : INV.eqPuesto;
}
function invCasillaEn(x, y) {
  return invCasillas().find(c => x >= c.x && x < c.x + c.s && y >= c.y && y < c.y + c.s) || null;
}
function invMover(a, b) {
  if (!a || !b || (a.zona == b.zona && a.i == b.i)) return;
  const A = invLista(a.zona),
    B = invLista(b.zona),
    comidaZ = z => z == 'bolsa' || z == 'barra';
  if (comidaZ(a.zona) != comidaZ(b.zona)) return;
  const sa = A[a.i],
    sb = B[b.i];
  if (!sa) return;
  // juntar pilas iguales
  if (sb && sa.id && sb.id == sa.id) {
    const k = Math.min(PILA - sb.n, sa.n);
    sb.n += k;
    sa.n -= k;
    if (sa.n <= 0) A[a.i] = null;
  } else {
    A[a.i] = sb;
    B[b.i] = sa;
  }
  invSync();
  sfx('swing');
}
function invAccion(c) {
  if (!c) return;
  const L = invLista(c.zona);
  if (c.zona == 'bolsa' || c.zona == 'barra') usarCasilla(L, c.i);
  else if (L[c.i]) invPoner(L[c.i]);
}

/* ---- entrada ---- */
function invKey(e) {
  const k = e.code;
  if (k == 'Escape' || k == 'KeyI' || k == 'Tab') return invToggle();
  if (e.repeat && !k.startsWith('Arrow')) return;
  if (k == 'KeyQ' || k == 'KeyE') {
    INV.tab = 1 - INV.tab;
    INV.sel = INV.tab == 0 ? { zona: 'bolsa', i: 0 } : { zona: 'eq', i: 0 };
    sfx('swing');
    return;
  }
  const S = INV.sel,
    cols = S.zona == 'barra' ? 5 : S.zona == 'puesto' ? 3 : INV_COLS,
    tam = invLista(S.zona).length;
  let dx = 0,
    dy = 0;
  if (k == 'ArrowLeft' || k == 'KeyA') dx = -1;
  if (k == 'ArrowRight' || k == 'KeyD') dx = 1;
  if (k == 'ArrowUp' || k == 'KeyW') dy = -1;
  if (k == 'ArrowDown' || k == 'KeyS') dy = 1;
  if (dx || dy) {
    let i = S.i + dx + dy * cols;
    // saltar entre zonas: de la bolsa a la barra y del equipo puesto a la bolsa de equipo
    if (S.zona == 'bolsa' && i >= tam) INV.sel = { zona: 'barra', i: Math.min(4, S.i % 5) };
    else if (S.zona == 'barra' && dy < 0) INV.sel = { zona: 'bolsa', i: 45 + Math.min(4, S.i) };
    else if (S.zona == 'eq' && i >= tam) INV.sel = { zona: 'puesto', i: Math.min(2, S.i % 5) };
    else if (S.zona == 'puesto' && dy < 0) INV.sel = { zona: 'eq', i: 15 + S.i };
    else if (S.zona == 'eq' && dx < 0 && S.i % 5 == 0) INV.sel = { zona: 'puesto', i: 2 };
    else if (S.zona == 'puesto' && dx > 0 && S.i == 2) INV.sel = { zona: 'eq', i: 0 };
    else INV.sel.i = Math.max(0, Math.min(tam - 1, i));
    return;
  }
  if (k == 'Enter' || k == 'Space') return invAccion(INV.sel);
  const m = /^Digit([1-5])$/.exec(k);
  if (m && (S.zona == 'bolsa' || S.zona == 'barra')) invMover(S, { zona: 'barra', i: +m[1] - 1 });
}
function invMouse(tipo, e) {
  const [x, y] = mpos(e);
  if (tipo == 'down') {
    for (const t of invPestanas())
      if (x >= t.x && x < t.x + t.w && y >= t.y && y < t.y + t.h) {
        if (INV.tab != t.t) {
          INV.tab = t.t;
          INV.sel = t.t == 0 ? { zona: 'bolsa', i: 0 } : { zona: 'eq', i: 0 };
          sfx('swing');
        }
        return;
      }
    // botón de cerrar
    if (x > IG.x + IG.w - 26 && x < IG.x + IG.w - 8 && y > IG.y + 8 && y < IG.y + 26) return invToggle();
    const c = invCasillaEn(x, y);
    if (!c) return;
    const now = performance.now();
    if (INV.sel.zona == c.zona && INV.sel.i == c.i && now - INV.clicT < 330) {
      invAccion(c); // doble clic
      INV.clicT = 0;
      return;
    }
    INV.clicT = now;
    INV.sel = { zona: c.zona, i: c.i };
    if (invLista(c.zona)[c.i]) INV.arr = { de: c, x, y, mov: false };
  } else if (tipo == 'move') {
    INV.mx = x;
    INV.my = y;
    if (INV.arr && Math.hypot(x - INV.arr.x, y - INV.arr.y) > 4) INV.arr.mov = true;
  } else if (tipo == 'up') {
    const A = INV.arr;
    INV.arr = null;
    if (!A || !A.mov) return;
    const c = invCasillaEn(x, y);
    if (!c) return;
    const eqZ = z => z == 'eq' || z == 'puesto';
    if (eqZ(A.de.zona) && eqZ(c.zona)) {
      // equipo: arrastrar a un espacio de "puesto" lo pone, a la bolsa lo quita
      const LA = invLista(A.de.zona),
        LB = invLista(c.zona),
        a = LA[A.de.i],
        b = LB[c.i];
      LA[A.de.i] = b;
      LB[c.i] = a;
      sfx('pick');
    } else invMover(A.de, c);
    INV.sel = { zona: c.zona, i: c.i };
  }
}
cv.addEventListener('mousemove', e => INV.open && invMouse('move', e));
addEventListener('mouseup', e => INV.open && invMouse('up', e));

/* ---- dibujo ---- */
const IC = {
  fondo: '#14151f',
  panel: '#1c1e2b',
  hueco: '#0e0f17',
  borde: '#d8d2cf',
  sepia: '#2c2621',
  texto: '#efe9de',
  suave: '#8a93ad',
  sel: '#8ff6ff',
  oro: '#e8c070',
};
function marco(x, y, w, h, relleno, borde) {
  ctx.fillStyle = borde || IC.borde;
  ctx.fillRect(x + 2, y, w - 4, h);
  ctx.fillRect(x, y + 2, w, h - 4);
  ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
  ctx.fillStyle = relleno || IC.panel;
  ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
}
function casilla(c, sel, extra) {
  const { x, y, s } = c;
  ctx.fillStyle = sel ? IC.sel : '#3a3d52';
  ctx.fillRect(x - 1, y - 1, s + 2, s + 2);
  ctx.fillStyle = extra || IC.hueco;
  ctx.fillRect(x, y, s, s);
  ctx.fillStyle = 'rgba(255,255,255,.05)';
  ctx.fillRect(x, y, s, 1);
}
function dibujarComida(id, x, y, s) {
  const k = FOODS.findIndex(f => f.id == id);
  if (k >= 0) ctx.drawImage(img.itm, k * 16, 0, 16, 16, x, y, s, s);
}
function dibujarEquipable(k, x, y, s) {
  const q = equipable(k);
  if (q && q.dibujar) q.dibujar(x, y, s);
}
function textoPartido(txt, x, y, max, lh) {
  const pal = txt.split(' ');
  let l = '',
    yy = y;
  for (const w of pal) {
    const t = l ? l + ' ' + w : w;
    if (ctx.measureText(t).width > max && l) {
      ctx.fillText(l, x, yy);
      l = w;
      yy += lh;
    } else l = t;
  }
  if (l) ctx.fillText(l, x, yy);
  return yy;
}
function drawInventario() {
  const now = performance.now() / 1000,
    ap = Math.min(1, (now - INV.t0) / 0.15),
    X = IG.x,
    Y = IG.y + Math.round((1 - ap) * 12);
  ctx.save();
  ctx.globalAlpha = 0.72 * ap;
  ctx.fillStyle = '#05060c';
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = ap;
  // marco principal estilo pergamino oscuro con esquinas
  marco(X, Y, IG.w, IG.h, IC.fondo, IC.borde);
  ctx.fillStyle = IC.sepia;
  ctx.fillRect(X + 4, Y + 32, IG.w - 8, 2);
  for (const [cx, cy] of [[X + 4, Y + 4], [X + IG.w - 10, Y + 4], [X + 4, Y + IG.h - 10], [X + IG.w - 10, Y + IG.h - 10]]) {
    ctx.fillStyle = IC.oro;
    ctx.fillRect(cx, cy, 6, 2);
    ctx.fillRect(cx, cy, 2, 6);
    ctx.fillRect(cx + 4, cy + 4, 2, 2);
  }
  // pestañas
  for (const t of invPestanas()) {
    const on = INV.tab == t.t;
    marco(t.x, Y + 8, t.w, t.h, on ? '#2e3247' : IC.hueco, on ? IC.sel : '#3a3d52');
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillStyle = on ? IC.texto : IC.suave;
    ctx.fillText(t.n, t.x + t.w / 2, Y + 22);
  }
  ctx.font = '8px ' + PS;
  ctx.fillStyle = IC.suave;
  ctx.textAlign = 'left';
  ctx.fillText('Q/E', X + 268, Y + 22);
  // cerrar
  marco(X + IG.w - 26, Y + 8, 18, 18, IC.hueco, '#3a3d52');
  ctx.fillStyle = IC.texto;
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillText('x', X + IG.w - 17, Y + 21);
  ctx.textAlign = 'left';
  const cas = invCasillas().map(c => ({ ...c, y: c.y + (Y - IG.y) }));
  const S = INV.sel;
  const esSel = c => S.zona == c.zona && S.i == c.i;
  if (INV.tab == 0) dibujarObjetos(cas, esSel, X, Y, now);
  else dibujarEquipo(cas, esSel, X, Y, now);
  // lo que se está arrastrando sigue al mouse
  if (INV.arr && INV.arr.mov) {
    const v = invLista(INV.arr.de.zona)[INV.arr.de.i];
    ctx.globalAlpha = 0.85;
    if (v && v.id) dibujarComida(v.id, INV.mx - 12, INV.my - 12, 24);
    else if (v) dibujarEquipable(v, INV.mx - 12, INV.my - 12, 24);
    ctx.globalAlpha = ap;
  }
  // aviso
  if (INV.avisoT > 0) {
    INV.avisoT -= 1 / 60;
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff9a8a';
    ctx.fillText(INV.aviso, X + IG.w / 2, Y + IG.h - 10);
  }
  // ayuda
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'right';
  ctx.fillStyle = IC.suave;
  ctx.fillText(INV.tab == 0 ? 'ARRASTRA · DOBLE CLIC: USAR · ESC' : 'ARRASTRA · DOBLE CLIC: PONER · ESC', X + IG.w - 12, Y + IG.h - 24);
  ctx.textAlign = 'left';
  ctx.restore();
  pixelar(0, 0, W, H);
}
// "pixelar": copia la zona a un lienzo del tamaño del mundo (1 pixel = 1 pixel del juego) sin suavizado
// y la vuelve a pegar, así líneas, brillos y letras quedan en bloques de pixel exactos
let PXC = null;
function pixelar(x, y, w, h) {
  if (!PXC) {
    PXC = document.createElement('canvas');
    PXC.width = W;
    PXC.height = H;
  }
  const px = PXC.getContext('2d');
  px.imageSmoothingEnabled = false;
  px.clearRect(0, 0, W, H);
  px.drawImage(cv, x * 2, y * 2, w * 2, h * 2, x, y, w, h);
  ctx.save();
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(PXC, x, y, w, h, x, y, w, h);
  ctx.restore();
}
function dibujarObjetos(cas, esSel, X, Y, now) {
  ctx.font = '8px ' + PS;
  ctx.fillStyle = IC.oro;
  ctx.fillText('BOLSA 10x5', X + 18, Y + 42);
  for (const c of cas) {
    const L = invLista(c.zona),
      s = L[c.i];
    casilla(c, esSel(c), c.zona == 'barra' ? '#181a26' : null);
    if (s) {
      const pad = c.zona == 'barra' ? 4 : 1;
      dibujarComida(s.id, c.x + pad, c.y + pad, c.s - pad * 2);
      ctx.font = '8px ' + PS;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'right';
      ctx.fillText(s.n, c.x + c.s - 1, c.y + c.s - 1);
      ctx.textAlign = 'left';
    }
    if (c.zona == 'barra') {
      ctx.font = '8px ' + PS;
      ctx.fillStyle = IC.suave;
      ctx.fillText(c.i + 1, c.x + 2, c.y + 8);
    }
  }
  ctx.font = '8px ' + PS;
  ctx.fillStyle = IC.oro;
  ctx.fillText('BARRA RÁPIDA 1-5', X + 222, Y + 256);
  // panel de detalle
  const dx = X + 140,
    dy = Y + 44;
  marco(dx, dy, 412, 190, IC.panel, '#3a3d52');
  const s = invLista(INV.sel.zona)[INV.sel.i];
  if (s) {
    const f = comida(s.id);
    ctx.fillStyle = IC.hueco;
    ctx.fillRect(dx + 14, dy + 14, 56, 56);
    dibujarComida(s.id, dx + 18, dy + 18 + Math.round(Math.sin(now * 3)), 48);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.texto;
    ctx.fillText(f.n.toUpperCase(), dx + 84, dy + 28);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.sel;
    ctx.fillText('x' + s.n + (inv[s.id] > s.n ? '   (total ' + inv[s.id] + ')' : ''), dx + 84, dy + 44);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = '#c9d0e6';
    textoPartido(f.d, dx + 84, dy + 62, 312, 11);
    if (f.t) {
      ctx.fillStyle = IC.suave;
      ctx.fillText('Dura ' + f.t + ' segundos.', dx + 84, dy + 92);
    }
    if (buf[s.id] > 0) {
      ctx.fillStyle = IC.oro;
      ctx.fillRect(dx + 84, dy + 102, Math.round((200 * buf[s.id]) / f.t), 4);
      ctx.font = '8px ' + PS;
      ctx.fillText(Math.ceil(buf[s.id]) + 's', dx + 290, dy + 108);
    }
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.suave;
    ctx.fillText('ENTER: COMER', dx + 84, dy + 130);
    ctx.fillText(INV.sel.zona == 'bolsa' ? '1-5: A LA BARRA' : 'EN LA BARRA: TECLA ' + (INV.sel.i + 1), dx + 84, dy + 144);
  } else {
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.suave;
    ctx.fillText('Casilla vacía', dx + 18, dy + 28);
    ctx.font = '8px ' + PS;
    textoPartido('Las comidas que recogés caen aquí. Arrastrá las que más usás a la barra rápida.', dx + 18, dy + 48, 380, 11);
  }
  // arma (siempre visible)
  ctx.font = '8px ' + PS;
  ctx.fillStyle = IC.oro;
  ctx.fillText('ARMA', dx + 18, dy + 168);
  if (hasSword) {
    ctx.drawImage(img.sw, dx + 60, dy + 159, 44, 14);
    ctx.fillStyle = IC.texto;
    ctx.font = '8px ' + PS;
    ctx.fillText('Katana Alba de Mulukukú', dx + 112, dy + 170);
  } else {
    ctx.fillStyle = IC.suave;
    ctx.font = '8px ' + PS;
    ctx.fillText('Sin arma', dx + 60, dy + 170);
  }
}
function dibujarEquipo(cas, esSel, X, Y, now) {
  // retrato de Smara con su forma actual
  marco(X + 18, Y + 44, 132, 180, IC.hueco, '#3a3d52');
  ctx.save();
  ctx.translate(X + 84, Y + 206);
  ctx.scale(2, 2);
  hdraw(HI['idle_' + (Math.floor(now * 3) % 4)]);
  ctx.restore();
  ctx.font = '8px ' + PS;
  ctx.fillStyle = IC.oro;
  ctx.fillText('PUESTOS MÁX 3', X + 18, Y + 234);
  ctx.fillText('EQUIPO 4 x 5', X + 168, Y + 42);
  for (const c of cas) {
    const L = invLista(c.zona),
      k = L[c.i],
      pues = c.zona == 'puesto';
    if (pues) {
      // engaste con brillo cuando tiene algo
      if (k) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.2 + 0.1 * Math.sin(now * 3 + c.i);
        ctx.drawImage(halo('cian'), c.x - 10, c.y - 10, c.s + 20, c.s + 20);
        ctx.restore();
      }
      casilla(c, esSel(c), '#181a26');
      ctx.fillStyle = k ? IC.oro : '#3a3d52';
      for (const [px, py] of [[c.x - 2, c.y - 2], [c.x + c.s, c.y - 2], [c.x - 2, c.y + c.s], [c.x + c.s, c.y + c.s]]) ctx.fillRect(px, py, 2, 2);
    } else casilla(c, esSel(c));
    if (k) dibujarEquipable(k, c.x + 3, c.y + 3, c.s - 6);
  }
  // detalle
  const dx = X + 316,
    dy = Y + 44,
    k = invLista(INV.sel.zona)[INV.sel.i],
    q = k && equipable(k);
  marco(dx, dy, 238, 180, IC.panel, '#3a3d52');
  if (q) {
    ctx.fillStyle = IC.hueco;
    ctx.fillRect(dx + 12, dy + 12, 40, 40);
    dibujarEquipable(k, dx + 16, dy + 16 + Math.round(Math.sin(now * 3)), 32);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.texto;
    textoPartido(q.n.toUpperCase(), dx + 60, dy + 22, 170, 10);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = equipado(k) ? IC.sel : IC.suave;
    ctx.fillRect(dx + 60, dy + 44, 6, 6);
    ctx.fillText(equipado(k) ? 'PUESTO' : 'GUARDADO', dx + 70, dy + 51);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = '#c9d0e6';
    const y2 = textoPartido(q.d, dx + 12, dy + 72, 214, 11);
    ctx.fillStyle = '#9a917f';
    if (q.h) textoPartido(q.h, dx + 12, y2 + 16, 214, 11);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.suave;
    ctx.fillText(equipado(k) ? 'ENTER: QUITAR' : 'ENTER: PONER', dx + 12, dy + 170);
  } else {
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.suave;
    ctx.fillText('Nada aquí', dx + 12, dy + 26);
    ctx.font = '8px ' + PS;
    textoPartido('Los tesoros que encontrás en los cofres se guardan aquí. Solo funcionan los que Smara lleva puestos.', dx + 12, dy + 46, 214, 11);
  }
  // reliquias de los espíritus: siempre activas
  if (typeof RELIQ != 'undefined' && RELIQ.size) {
    ctx.font = '8px ' + PS;
    ctx.fillStyle = IC.oro;
    ctx.fillText('RELIQUIAS', X + 168, Y + 172);
    let x = X + 168,
      fila = 0;
    for (const n of ESPIRITUS) {
      if (!RELIQ.has(n.k)) continue;
      const ch = Math.min(n.cabH, 12),
        cw = Math.min(n.w, 18);
      if (x + cw + 4 > X + 306) {
        x = X + 168;
        fila++;
      }
      const yy = Y + 178 + fila * 20;
      ctx.fillStyle = IC.hueco;
      ctx.fillRect(x, yy, cw + 4, ch + 4);
      ctx.drawImage(img.esp, n.sx + Math.max(0, Math.floor((n.w - cw) / 2)), n.k == 'sombrero' ? 4 : 0, cw, ch, x + 2, yy + 2, cw, ch);
      x += cw + 7;
    }
  }
}
// barra rápida en el HUD (5 casillas)
function drawHotbar() {
  const n = 5,
    x0 = Math.round(W / 2 - n * 13);
  for (let i = 0; i < n; i++) {
    const x = x0 + i * 26,
      s = INV.barra[i];
    ctx.fillStyle = '#3a3d52';
    ctx.fillRect(x - 1, 6, 24, 24);
    ctx.fillStyle = '#0e0f17cc';
    ctx.fillRect(x, 7, 22, 22);
    if (s) {
      dibujarComida(s.id, x + 3, 10, 16);
      ctx.fillStyle = '#fff';
      ctx.font = '8px ' + PS;
      ctx.textAlign = 'right';
      ctx.fillText(s.n, x + 21, 28);
      const f = comida(s.id);
      if (buf[s.id] > 0) {
        ctx.fillStyle = '#ffe070';
        ctx.fillRect(x, 30, Math.max(1, Math.round((22 * buf[s.id]) / f.t)), 2);
      }
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8a93b5';
    ctx.font = '8px ' + PS;
    ctx.fillText(i + 1, x + 2, 14);
  }
  ctx.font = '8px ' + PS;
  ctx.fillStyle = '#8a93b5';
  ctx.fillText('I', x0 + n * 26 + 4, 22);
  if (p.shield > 0) {
    ctx.fillStyle = '#7ad0ff';
    ctx.font = '8px ' + PS;
    ctx.fillText('ESCUDO x' + p.shield, 8, 40);
  }
}
// partida nueva: inventario vacío · reintentar tras morir: se conserva
const initInv = init;
init = function () {
  initInv();
  invVaciar();
};
const restartInv = restart;
restart = function () {
  const g = invGuardar();
  restartInv();
  invCargar(g);
};

/* ---------- 22-animacion-resorte.js ---------- */
/* ---- animacion: estirar/aplastar con resorte, inclinacion suave, polvo al caminar ---- */
function animSt() {
  return p.an || (p.an = { sx: 1, sy: 1, vx: 0, vy: 0, lean: 0, lf: p.face, st: -1 });
}
function animKick(sx, sy) {
  const A = animSt();
  A.sx = sx;
  A.sy = sy;
  A.vx = 0;
  A.vy = 0;
}
function animTick(dt) {
  const A = animSt(),
    k = 330,
    dm = 17;
  let tx = 1,
    ty = 1;
  if (!p.on && p.dash <= 0) {
    const s = Math.min(0.09, Math.abs(p.vy) / 5200);
    ty = 1 + s;
    tx = 1 - s * 0.6;
  }
  A.vx += ((tx - A.sx) * k - A.vx * dm) * dt;
  A.vy += ((ty - A.sy) * k - A.vy * dm) * dt;
  A.sx = Math.max(0.7, Math.min(1.3, A.sx + A.vx * dt));
  A.sy = Math.max(0.7, Math.min(1.3, A.sy + A.vy * dt));
  if (A.lf !== p.face) {
    A.lf = p.face;
    if (p.on && p.dash <= 0 && !p.atk) A.sx = Math.min(A.sx, 0.84);
  }
  let tl;
  if (p.dash > 0) tl = p.face * 0.11;
  else if (p.on) tl = (p.vx / 320) * (p.run ? 0.1 : 0.05);
  else tl = (p.vx / 320) * 0.07;
  if (p.atk) tl += p.atk.f * 0.06 * Math.max(0, 1 - p.atk.t / 0.16);
  if (p.parry > 0) tl -= p.face * 0.05;
  if (p.crouch) tl *= 0.4;
  A.lean += (tl - A.lean) * Math.min(1, 12 * dt);
  if (p.on && !p.run && !p.crouch && Math.abs(p.vx) > 60) {
    const fr = Math.floor(p.t * (7 + Math.abs(p.vx) / 45)) % 8;
    if (fr != A.st && (fr == 1 || fr == 5)) puff(p.x - p.face * 6, p.y, 1, p.face);
    A.st = fr;
  }
}
function drawPlayer() {
  const s = curAnim(),
    A = animSt();
  let lean = A.lean,
    sx = A.sx,
    sy = A.sy,
    ox = 0;
  if (state == 'dead') {
    lean = 0;
    sx = sy = 1;
  } else {
    if (p.on && Math.abs(p.vx) < 20 && !p.atk && p.dash <= 0 && !p.crouch) {
      const b = Math.sin(p.t * 3.2);
      sy *= 1 + 0.016 * b;
      sx *= 1 - 0.008 * b;
    }
    if (p.dash > 0) sx *= 1.08;
    if (p.hurtT > 0) ox = (Math.random() - 0.5) * 2.2;
  }
  ctx.save();
  ctx.translate(Math.round(p.x - cam + ox), Math.round(p.y));
  ctx.rotate(lean);
  ctx.scale(p.face * sx, sy);
  HFLT =
    p.hurtT > 0
      ? p.hurtT > 0.13
        ? 'brightness(2.6) saturate(.2)'
        : 'sepia(1) saturate(6) hue-rotate(-30deg)'
      : null;
  hdraw(s.fi);
  HFLT = null;
  ctx.restore();
}

function curAnim() {
  const a = p.atk,
    mv = Math.abs(p.vx) > 25;
  if (state == 'dead') return wf(HI.lie);
  if (p.hurtT > 0) return wf(HI.hurt);
  if (p.victT > 0) return wf(VIC + (Math.floor(p.t * 8) % 7));
  if (p.dash > 0) return wf(HI.dash);
  if (p.parry > 0) return wf(KICK + Math.min(5, Math.floor(((0.28 - p.parry) / 0.28) * 6)));
  if (a) {
    const A = ATK[a.c];
    return wf(A.f + Math.min(A.n - 1, Math.floor(a.t / A.d)));
  }
  if (!p.on) return wf(p.vy < 0 ? HI.jumpUp : HI.fall);
  if (p.landT > 0) return wf(HI.land);
  if (p.crouch) return wf(mv ? (Math.floor(p.t * 7) % 2 ? HI.crouchW2 : HI.crouchW1) : HI.crouch);
  if (mv) return wf(RUN + (Math.floor(p.t * (p.run ? 16 : 7 + Math.abs(p.vx) / 45)) % 8));
  {
    const sf = stretchFrame();
    if (sf != null) return wf(sf);
  }
  return wf(HI['idle_' + (Math.floor(p.t * 3) % 4)]);
}

/* ---------- 22b-ataques-smara.js ---------- */
/* =====================================================================
   ATAQUES NUEVOS DE SMARA (inspirados en una hoja de combos de espada)
   En el suelo, J/K encadena un COMBO DE 5:
     1 corte normal → 2 corte hacia abajo → 3 GIRO (vuelta completa, pega
     adelante y atrás) → 4 ESTOCADA BAJA (se agacha y se lanza hacia adelante)
     → 5 TAJO ASCENDENTE (media luna vertical que la levanta del suelo)
   En el aire:
     J      → REMOLINO: da una vuelta en el aire, 3 golpes, flota un poquito
     S + J  → PICADA: baja de golpe con la espada; al caer suelta una onda
              en el piso que pega a los dos lados
   Todos los cortes dejan MEDIAS LUNAS blancas gruesas en el centro y finas
   en las puntas (como en la hoja de referencia). Los tres cortes de antes
   también las usan ahora, y dan un pasito adelante para que pesen más.
   En forma espíritu se mantiene su combo de 3 (28b-forma-espiritu.js).
   ===================================================================== */
const COMBO5 = [0, 1, 3, 4, 5];

/* ---------------- ZONA DE GOLPE de cada ataque ----------------
   Antes todos los ataques usaban la misma caja (un punto 42 px adelante).
   Ahora cada uno tiene su propia zona, igual a lo que se ve en pantalla:
   el giro y el remolino pegan a los dos lados, la estocada llega lejos y
   bajito, el ascendente pega alto, y la picada pega alrededor al caer.
   golpeToca(a, x0, y0, x1, y1): ¿la zona del ataque toca ese rectángulo? */
function atkCaja(a) {
  const f = a.f0 || a.f, x = p.x, y = p.y;
  const fr = (d0, d1, y0, y1) => (f > 0 ? { x0: x + d0, x1: x + d1, y0: y + y0, y1: y + y1 } : { x0: x - d1, x1: x - d0, y0: y + y0, y1: y + y1 });
  switch (a.c) {
    case 0: return fr(-12, 96, -80, 6);
    case 1: return fr(-16, 100, -96, 8);
    case 2: return fr(-6, 104, -62, 6);
    case 3: return { x0: x - 84, x1: x + 84, y0: y - 78, y1: y + 6 }; // giro
    case 4: return fr(-6, 124, -54, 6); // estocada baja
    case 5: return fr(-12, 88, -150, 6); // ascendente
    case 6: return { x0: x - 80, x1: x + 80, y0: y - 104, y1: y + 34 }; // remolino
    case 7: return { x0: x - 94, x1: x + 94, y0: y - 64, y1: y + 6 }; // picada al caer
  }
  return fr(-12, 96, -80, 6);
}
function golpeToca(a, x0, y0, x1, y1) {
  const c = atkCaja(a);
  return c.x0 < x1 && c.x1 > x0 && c.y0 < y1 && c.y1 > y0;
}
function ataqueElegir() {
  const espiritu = typeof FORMA != 'undefined' && FORMA.on;
  if (espiritu) {
    p.combo = p.comboT > 0 ? (p.combo + 1) % 3 : 0;
    return p.combo;
  }
  if (!p.on && !(p.kb > 0)) return keys.KeyS ? 7 : 6; // (no cuenta el saltito de un empujón)
  p.combo = p.comboT > 0 ? (p.combo + 1) % COMBO5.length : 0;
  return COMBO5[p.combo];
}
// golpes extra de cada ataque: [tiempo, lado (1 adelante, -1 atrás)]
const GOLPES_EXTRA = { 3: [[0.21, -1]], 6: [[0.18, -1], [0.3, 1]], 7: [[0.36, -1]] };

/* ---------------- medias lunas ---------------- */
const CORTES = [];
// x, y: centro · r radio · a0→a1 ángulos (en el sentido en que se dibuja) · g grosor
// barre: segundos que tarda en dibujarse · vida: segundos en total · pega: sigue a Smara
function corte(o) {
  CORTES.push(Object.assign({ t: 0, barre: 0.07, vida: 0.26, g: 12, f: p.face, pega: true, ox: p.x, oy: p.y }, o));
}
function corteDibujar(c) {
  const k = c.t / c.vida;
  if (k >= 1) return;
  const bx = c.pega ? p.x : c.ox, by = c.pega ? p.y : c.oy;
  const sweep = Math.min(1, c.t / c.barre);
  const a0 = c.a0, a1 = c.a0 + (c.a1 - c.a0) * sweep;
  // al desvanecerse, la cola se come la media luna y se adelgaza
  const cola = Math.max(0, (k - 0.35) / 0.65), as = a0 + (a1 - a0) * cola;
  const g = c.g * (1 - k * 0.6), N = 22;
  ctx.save();
  ctx.translate(Math.round(bx - cam), Math.round(by));
  ctx.scale(c.f, 1);
  ctx.translate(c.x, c.y);
  const pathCres = (gr, rr) => {
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const u = i / N, a = as + (a1 - as) * u;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * (c.ry || 1));
    }
    for (let i = N; i >= 0; i--) {
      const u = i / N, a = as + (a1 - as) * u, w = gr * Math.sin(Math.PI * Math.min(1, u * 1.15)); // fina en las puntas
      ctx.lineTo(Math.cos(a) * (rr - w), Math.sin(a) * (rr - w) * (c.ry || 1));
    }
    ctx.closePath();
  };
  ctx.globalAlpha = Math.max(0, 1 - k * 1.1);
  ctx.fillStyle = '#c9d2db';
  pathCres(g, c.r);
  ctx.fill();
  ctx.fillStyle = '#f6f9ff';
  pathCres(g * 0.55, c.r);
  ctx.fill();
  // filo brillante
  if (k < 0.5) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(190,240,255,.5)';
    pathCres(2.2, c.r + 1);
    ctx.fill();
  }
  ctx.restore();
}
// estela recta de las estocadas
function estela(o) {
  CORTES.push(Object.assign({ t: 0, vida: 0.22, recta: true, f: p.face, pega: true, ox: p.x, oy: p.y }, o));
}
function estelaDibujar(c) {
  const k = c.t / c.vida;
  if (k >= 1) return;
  const bx = c.pega ? p.x : c.ox, by = c.pega ? p.y : c.oy, e = Math.min(1, c.t / 0.06);
  ctx.save();
  ctx.translate(Math.round(bx - cam), Math.round(by));
  ctx.scale(c.f, 1);
  ctx.globalAlpha = 1 - k;
  const L = c.largo * e, h = c.alto * (1 - k * 0.7);
  ctx.fillStyle = '#c9d2db';
  ctx.beginPath(); ctx.moveTo(c.x, c.y - h); ctx.lineTo(c.x + L, c.y); ctx.lineTo(c.x, c.y + h); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.moveTo(c.x + L * 0.2, c.y - h * 0.4); ctx.lineTo(c.x + L, c.y); ctx.lineTo(c.x + L * 0.2, c.y + h * 0.4); ctx.closePath(); ctx.fill();
  ctx.restore();
}

/* ---------------- qué pasa al empezar cada ataque ---------------- */
function ataqueEmpieza(a) {
  const c = a.c, on = p.on;
  if (on) puff(p.x - p.face * 6, p.y, 3, p.face);
  if (c == 0) corte({ x: 4, y: -34, r: 40, a0: -1.35, a1: 1.05, g: 12 });
  else if (c == 1) corte({ x: 2, y: -40, r: 46, a0: -2.4, a1: 0.7, g: 15, barre: 0.08 });
  else if (c == 2) estela({ x: 10, y: -30, largo: 80, alto: 5 });
  else if (c == 3) {
    // giro: una vuelta entera alrededor de Smara + un anillo fino
    corte({ x: 0, y: -32, r: 46, a0: -1.7, a1: -1.7 + Math.PI * 2, g: 13, barre: 0.24, vida: 0.38, ry: 0.72 });
    corte({ x: 0, y: -30, r: 54, a0: -1.2, a1: -1.2 + Math.PI * 2, g: 4, barre: 0.26, vida: 0.36, ry: 0.6 });
    sfx('dash');
  } else if (c == 4) {
    // estocada baja: se agacha, se lanza y deja una estela larga a ras del piso
    estela({ x: 16, y: -16, largo: 120, alto: 6, vida: 0.26 });
    corte({ x: 70, y: -16, r: 26, a0: -1.2, a1: 1.2, g: 8, barre: 0.05, vida: 0.2, ry: 0.7 });
  } else if (c == 5) {
    // tajo ascendente: media luna vertical alta que queda en el lugar
    corte({ x: 14, y: -40, r: 56, a0: 1.6, a1: -1.75, g: 18, barre: 0.1, vida: 0.38, pega: false });
    corte({ x: 22, y: -40, r: 44, a0: 1.4, a1: -1.5, g: 5, barre: 0.12, vida: 0.32, pega: false });
  } else if (c == 6) {
    // remolino en el aire: dos vueltas finas que siguen a Smara
    corte({ x: 0, y: -32, r: 40, a0: -1.6, a1: -1.6 + Math.PI * 2, g: 11, barre: 0.2, vida: 0.34 });
    corte({ x: 0, y: -32, r: 48, a0: 1.5, a1: 1.5 + Math.PI * 2, g: 5, barre: 0.3, vida: 0.44 });
  } else if (c == 7) {
    p.vy = 760;
    sfx('dash');
  }
}
// la onda de la picada al tocar el suelo (medias lunas bajitas a los dos lados)
function picadaCae() {
  SHK = Math.max(SHK, 5);
  sfx('boom');
  for (const f of [1, -1]) {
    corte({ f, x: 6, y: -6, r: 62, a0: -2.9, a1: -0.05, g: 14, barre: 0.08, vida: 0.34, ry: 0.42, pega: false });
    corte({ f, x: 30, y: -2, r: 40, a0: -2.6, a1: -0.1, g: 6, barre: 0.1, vida: 0.3, ry: 0.35, pega: false });
  }
  for (let i = 0; i < 18; i++) pfx(p.x + rnd(-30, 30), p.y - 2, (i % 2 ? 1 : -1) * rnd(60, 220), rnd(-140, -30), rnd(0.25, 0.5), i % 3 ? '#d6cfc0' : '#ffffff', 2, 500);
  puff(p.x, p.y, 8, 0);
}

/* ---------------- cada cuadro del ataque ---------------- */
let ultAtaque = null;
function ataquesSmaraTick(dt) {
  for (let i = CORTES.length - 1; i >= 0; i--) { CORTES[i].t += dt; if (CORTES[i].t > CORTES[i].vida) CORTES.splice(i, 1); }
  const a = p.atk;
  if (!a) { ultAtaque = null; return; }
  if (a.raiz !== undefined ? a.raiz !== ultAtaque : a !== ultAtaque) {
    // ataque nuevo
    a.raiz = a.raiz || a;
    a.f0 = a.f;
    a.extra = 0;
    ultAtaque = a.raiz;
    a.cayo = false;
    if (!(typeof FORMA != 'undefined' && FORMA.on)) ataqueEmpieza(a);
  }
  const t = a.t, c = a.c, esp = typeof FORMA != 'undefined' && FORMA.on;
  if (esp) return;
  // pasito adelante en los cortes de suelo
  if ((c == 0 || c == 1) && p.on && t < 0.08) p.x += p.face * 110 * dt;
  if (c == 3 && p.on && t < 0.2) p.x += p.face * 60 * dt;
  // estocada: embestida
  if (c == 4 && t > 0.05 && t < 0.2) {
    p.x += p.face * 560 * dt;
    if (Math.random() < 0.7) pfx(p.x - p.face * 10, p.y - 2, -p.face * rnd(40, 120), rnd(-50, -10), 0.3, '#cbbfa8', 2, 200);
  }
  // ascendente: salta con el corte
  if (c == 5 && t > 0.05 && !a.salto) { a.salto = 1; if (p.on) { p.vy = -470; p.on = false; } else p.vy = Math.min(p.vy, -260); }
  // remolino: flota mientras gira
  if (c == 6 && t < 0.32 && !p.on) p.vy = Math.min(p.vy, 30);
  // picada: cae en línea recta y aguanta la pose hasta tocar el suelo
  if (c == 7) {
    if (!p.on && !a.cayo) {
      p.vy = Math.max(p.vy, 760);
      a.t = Math.min(a.t, 0.12);
      if (Math.random() < 0.8) pfx(p.x + rnd(-4, 4), p.y - rnd(30, 70), 0, -160, 0.2, '#e8f4ff', 2, 0);
    } else if (!a.cayo) {
      a.cayo = true;
      a.t = ATK[7].h; // pega al tocar el suelo
      picadaCae();
    }
  }
  // golpes extra (al otro lado, o de nuevo): un ataque "hermano" para que vuelva a pegar
  const ex = GOLPES_EXTRA[c];
  if (ex && a.extra < ex.length && a.t >= ex[a.extra][0] && a.hit) {
    const [, lado] = ex[a.extra];
    const n = Object.assign({}, a, { hit: false, f: a.f0 * lado, extra: a.extra + 1 });
    n.t = Math.max(a.t, ATK[c].h);
    p.atk = n;
  }
}

/* ---------------- cuerpo de Smara durante los ataques nuevos ---------------- */
function cuadroAtaque(a) {
  const t = a.t;
  switch (a.c) {
    case 3: return t < 0.05 ? 34 : t < 0.26 ? 36 : t < 0.32 ? 37 : t < 0.37 ? 39 : 40;
    case 4: return t < 0.06 ? HI.crouch : t < 0.28 ? 38 : t < 0.35 ? 39 : 40;
    case 5: return t < 0.05 ? HI.crouch : t < 0.11 ? 37 : t < 0.17 ? 35 : t < 0.32 ? 22 : 23;
    case 6: return t < 0.34 ? 36 : 46;
    case 7: return !a.cayo ? 32 : a.t < ATK[7].h + 0.1 ? 33 : 26;
  }
  return null;
}
const curAnimAT = curAnim;
curAnim = function () {
  const a = p.atk;
  if (a && a.c >= 3 && state != 'dead' && !(p.hurtT > 0) && !(typeof FORMA != 'undefined' && FORMA.on)) {
    const f = cuadroAtaque(a);
    if (f != null) return wf(f);
  }
  return curAnimAT();
};
const drawPlayerAT = drawPlayer;
drawPlayer = function () {
  const a = p.atk;
  if (!a || a.c < 3 || (typeof FORMA != 'undefined' && FORMA.on)) return drawPlayerAT();
  const t = a.t, cx = p.x - cam, cy = p.y - 32;
  ctx.save();
  if (a.c == 3 && t > 0.05 && t < 0.26) {
    // el giro: se da vuelta dos veces (cambia de lado muy rápido)
    if (Math.floor((t - 0.05) / 0.052) % 2) { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }
  } else if (a.c == 4 && t < 0.3) {
    // agachada y tirada hacia adelante
    ctx.translate(cx, p.y);
    ctx.rotate(p.face * 0.16);
    ctx.scale(1.06, 0.86);
    ctx.translate(-cx, -p.y);
  } else if (a.c == 6 && t < 0.34) {
    // vuelta completa en el aire
    ctx.translate(cx, cy);
    ctx.rotate(p.face * (t / 0.34) * Math.PI * 2);
    ctx.translate(-cx, -cy);
  } else if (a.c == 5 && t > 0.1) {
    ctx.translate(cx, p.y);
    ctx.rotate(-p.face * 0.12);
    ctx.translate(-cx, -p.y);
  }
  drawPlayerAT();
  ctx.restore();
};

/* ---------------- conexión ---------------- */
const animTickAT = animTick;
animTick = function (dt) {
  animTickAT(dt);
  ataquesSmaraTick(dt);
};
// las medias lunas reemplazan a los arcos finos de antes (las chispas de impacto se quedan)
const drawSlashesAT = drawSlashes;
drawSlashes = function () {
  const todos = SLS.splice(0);
  for (const s of todos) if (s.hit) SLS.push(s);
  drawSlashesAT();
  SLS.length = 0;
  for (const s of todos) SLS.push(s);
  // en forma espíritu siguen sus arcos propios
  if (typeof FORMA != 'undefined' && FORMA.on) {
    SLS.splice(0);
    for (const s of todos) if (!s.hit) SLS.push(s);
    drawSlashesAT();
    SLS.length = 0;
    for (const s of todos) SLS.push(s);
  }
  for (const c of CORTES) (c.recta ? estelaDibujar : corteDibujar)(c);
};

/* ---------- 23-carteles-zona.js ---------- */
/* ===== CARTELES DE ZONA ===== */
const ZN = {
  1: ['RIBERA DE SAHINOS', 'Mulukukú antiguo · orillas del río Tuma'],
  5: ['LA NOCHE DE LOS DUHINDU', 'cuando el monte silba, no contestés'],
  3: ['EL PUENTE ROTO', 'donde Arlos cuida un cruce que ya no existe'],
  6: ['EL BOSQUE DE LA NIEBLA', 'donde esperan los que nadie nombró'],
};
let ZC = null,
  ZCL = -1;
function zoneCard(n) {
  if (ZN[n] && n !== ZCL) {
    ZC = { t: 0, n };
  }
  ZCL = n;
}
function drawZC() {
  if (!ZC || state != 'play') return;
  ZC.t += 1 / 60;
  const t = ZC.t;
  if (t > 4.6) {
    ZC = null;
    return;
  }
  const a = Math.max(0, Math.min(1, t / 0.7, (4.6 - t) / 0.9)),
    [ti, su] = ZN[ZC.n];
  ctx.save();
  ctx.globalAlpha = a;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  ctx.fillRect(0, 96, W, 56);
  ctx.font = '14px ' + PS;
  ctx.fillStyle = '#000';
  ctx.fillText(ti, W / 2 + 2, 124);
  ctx.fillStyle = '#f4ecd8';
  ctx.fillText(ti, W / 2, 122);
  const lw = (Math.min(1, t / 1.2) * ctx.measureText(ti).width) / 2 + 20;
  ctx.fillRect(W / 2 - lw, 130, lw * 2, 1);
  ctx.font = '7px ' + PS;
  ctx.fillStyle = '#d8c9a8';
  ctx.fillText(su, W / 2, 144);
  ctx.restore();
}

function loadArea(n) {
  zoneCard(n);
  if (n != 3 && musOn()) musStop(1);
  area = n;
  LEVEL = n == 3 ? W : n == 1 ? W * 6 : n == 5 ? W * 19 : n == 6 ? W * 11 : W * 3;
  GROUND = n == 3 ? 300 : n == 1 || n == 5 ? 306 : n == 6 ? 1200 : 382;
  orbs = [];
  shots = [];
  fx = [];
  B.on = false;
  B.beam = 0;
  clearInterval(tickT);
  clearInterval(crkT);
  NPCS = [];
  STRUCTS = [];
  CHESTS = mkChests(n);
  if (n == 1) {
    const g = genL1(1);
    platforms = g.P.map(([x, y, w, k]) => ({ x, y, w, k }));
    enemies = [];
    pick = g.pk;
    CPS = [];
    CPX = 0;
    {
      const cn = {};
      CAMPS.forEach(c =>
        c.n.forEach(([k, dx]) => {
          cn[k] = cn[k] || 0;
          NPCS.push({ k, x: c.x + dx, vi: cn[k]++, done: false, id: Math.random() * 9 });
        }),
      );
    }
    p.x = 60;
    p.y = GROUND;
    p.vy = 0;
    p.on = true;
    cam = 0;
    ambient('level');
    say(
      'Caminá hacia la derecha: la Anciana del Fuego te espera junto a la ceiba.',
    );
  }
  if (n == 5) {
    const g = genL1(5);
    platforms = g.P.map(([x, y, w, k]) => ({ x, y, w, k }));
    enemies = [];
    pick = g.pk;
    CPS = [2800, 5600, 8400, 11000].map(x => ({ x, on: false }));
    CPX = 0;
    STRUCTS = genStructs();
    SPX = 720;
    SN = 0;
    MBD = [0, 0];
    PORTAL.x = 13100;
    ENC = genEnc();
    ENCI = 0;
    KILLS = 0;
    GEMS = [];
    NEED = Math.ceil(0.75 * ENC.length);
    p.x = 80;
    p.y = GROUND;
    p.vy = 0;
    p.on = true;
    cam = 0;
    ambient('gate');
    say(
      'Cayó la noche y el monte silba. Vencé a las criaturas de la grieta para romper el sello.',
    );
  }
  if (n == 6) cieloCargar(); // NUEVA FASE: todo está en 27-nueva-fase.js
  if (n == 2) {
    platforms = P2.map(([x, y, w]) => ({ x, y, w }));
    pick = [
      [250, 'hp', 382],
      [700, 'st', 382],
      [935, 'hp', 290],
      [1150, 'hp', 235],
      [1560, 'st', 250],
      [1900, 'hp', 382],
    ].map(([x, id, y]) => ({ x, id, y, got: false }));
    enemies = E2.map(([t, x, y]) => mkE(t, x, y));
    p.x = 60;
    p.y = GROUND;
    p.vy = 0;
    p.on = true;
    cam = 0;
    p.hp = Math.min(100, p.hp + 40);
    p.sta = 100;
    ambient('level');
    say('Llegá al final del bosque.');
  }
  if (n == 3) {
    platforms = [];
    enemies = [];
    pick = [
      { x: 330, id: 'hp', y: 300, got: false },
      { x: 600, id: 'st', y: 300, got: false },
    ];
    B.wait = 0;
    B.done = false;
    p.x = 120;
    p.y = GROUND;
    p.vy = 0;
    p.on = true;
    cam = 0;
    p.sta = 100;
    ambient('');
    musPlay(MUS.START, 1.6);
  }
  save();
}

/* ---------- 24-enemigos.js ---------- */
/* ===== ENEMIGOS: cada uno con animacion y ataque propio ===== */
function mkE(t, x, y) {
  const e = {
    t,
    x,
    y,
    by: y,
    sx: x,
    hp: ET[t].hp,
    vx: 0,
    vy: 0,
    cd: 1 + Math.random() * 2,
    dir: 1,
    hit: 0,
    st: 0,
    tm: 0,
    face: 1,
    a: 1,
    id: Math.random() * 9,
    x0: -1e9,
    x1: 1e9,
    shield: t == 'skelH',
    sq: 0,
    sp: 0,
  };
  if (!ET[t].fly && y < GROUND - 1) {
    const pl = platforms.find(q => Math.abs(q.y - y) < 2 && x >= q.x && x <= q.x + q.w);
    if (pl) {
      e.x0 = pl.x + 10;
      e.x1 = pl.x + pl.w - 10;
    }
  }
  return e;
}
function esz(e) {
  if (DUSK[e.t]) return { w: 20 * DUSK[e.t].sc, h: 39 * DUSK[e.t].sc };
  if (e.t == 'demon') return { w: 52, h: 50 };
  if (ENM[e.t]) return { w: ENM[e.t].w, h: ENM[e.t].h };
  const im = img[ET[e.t].i];
  return { w: im.width * 3, h: im.height * 3 };
}
function ecy(e) {
  return ET[e.t].fly ? e.y : e.y - (e.z || 0) - esz(e).h / 2;
}
function dmgE(e, d, ig) {
  if (e.dying) return;
  if (e.sealed && KILLS < NEED) {
    say('El Guardián está sellado (' + KILLS + '/' + NEED + '). Primero vencé a las criaturas de la grieta.');
    sfx('parry');
    e.hit = 0.15;
    return;
  }
  if (e.shield && !ig) {
    say('¡Bloqueado! Rodealo o pasale por encima con un dash.');
    sfx('parry');
    e.x += Math.sign(e.x - p.x) * 6;
    e.hit = 0.15;
    return;
  }
  sfx('hit');
  if (buf.cac > 0) p.hp = Math.min(100, p.hp + d * 0.3);
  if (DUSK[e.t] && e.al != null && e.al < 0.3) return;
  e.hp -= d;
  e.hit = 0.3;
  if (DUSK[e.t]) {
    e.hitT = e.t == 'duskB' ? 0.06 : 0.25;
    e.al = 1;
    if (e.mode == 'fade' || e.mode == 'appear') {
      e.mode = 'rec';
      e.at = 0;
    }
  }
  if (p.atk || p.dash > 0) hitFX(e.x, ecy(e), !!(p.atk && p.atk.c == 2));
  if (e.t == 'demon' && e.hp > 0) {
    e.hitT = 0.25;
    e.mode = 'move';
    e.hd = 0;
  }
  if (ENM[e.t] && e.hp > 0) {
    if (e.t == 'wboss') e.hitT = 0.12;
    else {
      e.hitT = 0.22;
      e.mode = 'move';
      e.hd = 0;
    }
  }
  e.x += Math.sign(e.x - p.x) * 14;
  if (e.st == 1 && e.t != 'skelH') e.st = 0;
  if (e.hp <= 0) {
    killCount(e);
    if (DUSK[e.t]) {
      duskDie(e);
      const nd = e.t == 'duskB' ? 3 : 1;
      for (let k = 0; k < nd; k++)
        pick.push({ x: e.x + k * 18 - nd * 9, id: randFood(), y: e.by || GROUND, got: false });
      return;
    }
    if (ENM[e.t]) {
      e.dying = 1;
      e.dt = 0;
      const nd = { hallo: 1, shade: 2, hunt: 3, wboss: 5}[e.t];
      for (let k = 0; k < nd; k++)
        pick.push({ x: e.x + k * 18 - nd * 9, id: randFood(), y: GROUND, got: false });
      if (e.t == 'wboss') {
        if (e.special) {
          GEMS.push({ x: Math.round(e.x), y: GROUND - 26, got: false });
          say('¡El Guardián soltó una gema!');
        } else {
          CHESTS.push({ x: Math.round(e.x), ty: 3, st: 0, t0: 0 });
          say('¡Guardián del pantano derrotado!');
        }
        p.victT = 1.5;
      }
      return;
    }
    if (e.t == 'demon') {
      e.dying = 1;
      e.dt = 0;
      for (let k = 0; k < 3; k++) pick.push({ x: e.x + k * 18 - 18, id: randFood(), y: GROUND, got: false });
      return;
    }
    e.dead = 1;
    if (Math.random() < 0.7) pick.push({ x: e.x, id: randFood(), y: ET[e.t].fly ? GROUND : e.y, got: false });
    if (Math.random() < 0.2)
      pick.push({ x: e.x + 14, id: randFood(), y: ET[e.t].fly ? GROUND : e.y, got: false });
  }
}
function hop(e, dt) {
  if (e.vy === 0 && e.y >= e.by) return 0;
  e.vy += 1200 * dt;
  e.y += e.vy * dt;
  e.x += e.vx * dt;
  if (e.y >= e.by) {
    e.y = e.by;
    e.vy = 0;
    e.vx = 0;
    return 1;
  }
  return 2;
}
function eo(x, y, vx, vy, c, life, g) {
  orbs.push({ x, y, vx, vy, c, life: life || 3, g: g || 0 });
}
function updEnemies(dt) {
  for (const e of enemies) {
    if (e.sp > 0) {
      e.sp -= dt;
      continue;
    }
    e.cd -= dt;
    e.hit -= dt;
    e.tm -= dt;
    const dx = p.x - e.x,
      ad = Math.abs(dx),
      sg = Math.sign(dx) || 1,
      T = e.t,
      s = esz(e);
    e.face = sg;
    if (T == 'slime') {
      const h = hop(e, dt);
      if (h == 1 && ad < 220) {
        e.sq = 0.18;
        eo(e.x, e.by - 18, 170, 0, 'v', 1.1);
        eo(e.x, e.by - 18, -170, 0, 'v', 1.1);
      }
      if (h == 0 && ad < 280 && e.cd <= 0) {
        e.vy = -320;
        e.vx = sg * 90;
        e.cd = 1.4;
      }
    } else if (T == 'slimeC') {
      const h = hop(e, dt);
      if (h == 0 && e.st == 0 && e.cd <= 0 && ad < 330) {
        e.st = 1;
        e.tm = 0.45;
      }
      if (e.st == 1 && e.tm <= 0) {
        e.st = 0;
        e.cd = 2.3;
        eo(e.x, e.y - 20, Math.max(-260, Math.min(260, dx)), -300, 'i', 2.6, 600);
      }
    } else if (T == 'slimeF') {
      if (e.st == 0 && e.cd <= 0 && ad < 340) {
        e.st = 1;
        e.tm = 0.5;
      }
      if (e.st == 1 && e.tm <= 0) {
        e.st = 2;
        e.tm = 0.7;
        e.dir = sg;
        e.fl = -1;
      }
      if (e.st == 2) {
        e.x += e.dir * 300 * dt;
        const f = Math.floor(e.tm * 12);
        if (f != e.fl) {
          e.fl = f;
          eo(e.x, e.by - 16, 0, 0, 'f', 0.9);
        }
        if (e.tm <= 0) {
          e.st = 0;
          e.cd = 2.8;
        }
      }
    } else if (T == 'cat') {
      const h = hop(e, dt);
      if (h == 1) e.pounce = 0;
      if (h == 0 && e.st == 0 && e.cd <= 0 && ad < 270) {
        e.st = 1;
        e.tm = 0.4;
      }
      if (e.st == 1 && e.tm <= 0) {
        e.st = 0;
        e.cd = 2;
        e.vy = -300;
        e.vx = sg * 330;
        e.pounce = 1;
      }
    } else if (T == 'bat') {
      if (e.st == 0) {
        e.x += (ad < 340 ? sg * 70 : 0) * dt;
        e.y = e.by + Math.sin(performance.now() / 300 + e.id) * 20;
        if (e.cd <= 0 && ad < 250) {
          e.st = 1;
          e.tm = 0.35;
        }
      } else if (e.st == 1) {
        e.y -= 50 * dt;
        if (e.tm <= 0) {
          e.st = 2;
          e.tx = p.x;
          e.ty = p.y - 30;
        }
      } else if (e.st == 2) {
        const d = Math.hypot(e.tx - e.x, e.ty - e.y) || 1;
        e.x += ((e.tx - e.x) / d) * 320 * dt;
        e.y += ((e.ty - e.y) / d) * 320 * dt;
        if (d < 12) {
          e.st = 3;
          e.tm = 0.8;
        }
      } else {
        e.y += (e.by - e.y) * Math.min(1, 2.2 * dt);
        e.x += (e.sx - e.x) * Math.min(1, 0.8 * dt);
        if (e.tm <= 0) {
          e.st = 0;
          e.cd = 2.2;
        }
      }
    } else if (T == 'eye') {
      e.y = e.by + Math.sin(performance.now() / 500 + e.id) * 14;
      if (ad > 220) e.x += sg * 30 * dt;
      if (e.st == 0 && e.cd <= 0 && ad < 400) {
        e.st = 1;
        e.tm = 0.7;
      }
      if (e.st == 1 && e.tm <= 0) {
        e.st = 0;
        e.cd = 2.8;
        const a = Math.atan2(p.y - 30 - e.y, dx);
        for (let k = -1; k <= 1; k++)
          eo(e.x, e.y, Math.cos(a + k * 0.28) * 190, Math.sin(a + k * 0.28) * 190, 'p', 3);
      }
    } else if (T == 'ghost') {
      e.a = e.st == 1 ? Math.max(0.12, e.tm / 0.5) : e.st == 2 ? 1 - Math.max(0, e.tm / 0.4) * 0.85 : 1;
      if (e.st == 0) {
        const d = Math.hypot(dx, p.y - 40 - e.y) || 1;
        e.x += (dx / d) * 34 * dt;
        e.y += ((p.y - 40 - e.y) / d) * 34 * dt;
        if (e.cd <= 0 && ad < 420) {
          e.st = 1;
          e.tm = 0.5;
        }
      } else if (e.st == 1 && e.tm <= 0) {
        e.x = p.x + (Math.random() < 0.5 ? -1 : 1) * 150;
        e.y = Math.max(60, p.y - 70 - Math.random() * 40);
        e.st = 2;
        e.tm = 0.4;
      } else if (e.st == 2 && e.tm <= 0) {
        for (let k = 0; k < 8; k++)
          eo(e.x, e.y, Math.cos(k * 0.785) * 150, Math.sin(k * 0.785) * 150, 'p', 3);
        e.st = 0;
        e.cd = 3.2;
      }
    } else if (T == 'skel') {
      if (e.st == 1) {
        if (e.tm <= 0) {
          e.st = 0;
          e.cd = 2.4;
          eo(e.x, e.y - 30, sg * 150, -260, 'b', 2.5, 600);
        }
      } else {
        if (ad < 150) e.dir = sg;
        else if (Math.abs(e.x - e.sx) > 90) e.dir = -Math.sign(e.x - e.sx);
        e.x += e.dir * 45 * dt;
        if (e.cd <= 0 && ad < 260 && ad > 70) {
          e.st = 1;
          e.tm = 0.3;
        }
      }
    } else if (T == 'skelG') {
      if (e.st == 0) {
        if (ad < 320) e.x += sg * 70 * dt;
        if (ad < 110 && e.cd <= 0) {
          e.st = 1;
          e.tm = 0.35;
        }
      } else if (e.st == 1 && e.tm <= 0) {
        e.st = 2;
        e.tm = 0.25;
        e.dir = sg;
      } else if (e.st == 2) {
        e.x += e.dir * 290 * dt;
        if (e.tm <= 0) {
          e.st = 0;
          e.cd = 1.8;
        }
      }
    } else if (T == 'skelH') {
      e.shield = e.st != 3;
      if (e.st == 0) {
        if (ad < 300) e.x += sg * 45 * dt;
        if (ad < 240 && e.cd <= 0) {
          e.st = 1;
          e.tm = 0.5;
        }
      } else if (e.st == 1 && e.tm <= 0) {
        e.st = 2;
        e.tm = 0.6;
        e.dir = sg;
      } else if (e.st == 2) {
        e.x += e.dir * 300 * dt;
        if (e.tm <= 0) {
          e.st = 3;
          e.tm = 1.2;
        }
      } else if (e.st == 3 && e.tm <= 0) {
        e.st = 0;
        e.cd = 2.4;
      }
    } else if (T == 'hood') {
      if (e.st == 0 && e.cd <= 0 && ad < 380) {
        e.st = 1;
        e.tm = 0.3;
      }
      if (e.st == 1 && e.tm <= 0) {
        e.st = 0;
        e.cd = 2.4;
        const a = Math.atan2(p.y - 30 - (e.y - 24), dx);
        for (let k = -1; k <= 1; k++)
          eo(e.x, e.y - 24, Math.cos(a + k * 0.22) * 165, Math.sin(a + k * 0.22) * 165, 'p', 3.5);
      }
    } else if (T == 'demon') {
      e.ft += dt;
      if (e.dying) {
        e.dt += dt;
        if (e.dt > 11 * 0.09) e.dead = 1;
        continue;
      }
      if (e.hitT > 0) {
        e.hitT -= dt;
      } else if (e.mode == 'atk') {
        e.am += dt;
        const fr = Math.floor(e.am / 0.06);
        if (fr >= 4 && fr <= 9 && !e.hd && ad < 100 && Math.abs(pcy() - (e.y - 24)) < 75) {
          e.hd = 1;
          hurt(14);
        }
        if (e.am > 14 * 0.06) {
          e.mode = 'move';
          e.cd = 2.2;
          e.hd = 0;
        }
      } else if (e.mode == 'cmb') {
        e.am += dt;
        if (e.am > 0.2 && e.am < 0.75) {
          e.x += e.dir * 400 * dt;
          if (!e.hd && Math.abs(p.x - e.x) < 50 && Math.abs(pcy() - (e.y - 24)) < 65) {
            e.hd = 1;
            hurt(18);
          }
        }
        if (e.am > 0.9) {
          e.mode = 'move';
          e.cd = 2.6;
          e.hd = 0;
        }
      } else {
        e.mode = 'move';
        if (ad > 70) e.x += sg * (ad > 220 ? 105 : 60) * dt;
        if (e.cd <= 0 && ad < 190) {
          e.mode = Math.random() < 0.55 ? 'atk' : 'cmb';
          e.am = 0;
          e.hd = 0;
          e.dir = sg;
        }
      }
    } else if (DUSK[T]) {
      if (duskAI(e, dt, dx, ad, sg)) continue;
    } else if (ENM[T]) {
      if (foeAI(e, dt, ad, sg)) continue;
    }
    e.x = Math.max(e.x0, Math.min(e.x1, e.x));
    if (
      !e.dying &&
      !(e.sp > 0) &&
      !(p.kbCd > 0) &&
      !(p.dash > 0) &&
      ad < s.w / 2 + 8 &&
      Math.abs(ecy(e) - pcy()) < s.h / 2 + 24
    ) {
      knock(e.x);
      p.kbCd = 0.5;
      e.x -= sg * 6;
    }
    if (
      T != 'demon' &&
      !ENM[T] &&
      !DUSK[T] &&
      !(T == 'ghost' && e.a < 0.5) &&
      ad < s.w / 2 + 8 &&
      Math.abs(ecy(e) - pcy()) < s.h / 2 + 22
    ) {
      if (p.dash > 0) {
        if (e.hit <= 0) dmgE(e, 30);
      } else if (p.inv <= 0)
        hurt(
          (e.st == 2 && (T == 'skelG' || T == 'skelH' || T == 'slimeF')) ||
            e.pounce ||
            (T == 'bat' && e.st == 2)
            ? 16
            : 10,
        );
    }
  }
  enemies = enemies.filter(e => !e.dead);
}
function drawEnemies(t) {
  for (const e of enemies) {
    if (e.sp > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = '#9a50ff';
      ctx.globalAlpha = 0.55 * (e.sp / 0.9);
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * 6.283 + e.sp * 6;
        ctx.fillRect(
          Math.round(e.x - cam + Math.cos(a) * 22),
          Math.round(GROUND - 2 + Math.sin(a) * 4),
          3,
          2,
        );
      }
      ctx.restore();
    }
    if (DUSK[e.t]) {
      drawDusk(e, t);
      continue;
    }
    if (e.t == 'demon') {
      drawDemon(e, t);
      continue;
    }
    if (ENM[e.t]) {
      drawFoe(e, t);
      continue;
    }
    const T = e.t,
      im = img[ET[T].i],
      w = im.width * 3,
      h = im.height * 3,
      fly = ET[T].fly;
    let sx = 1,
      sy = 1 + 0.06 * Math.sin(t * 6 + e.id),
      rot = 0,
      ox = 0,
      oy = 0;
    if (T == 'slime' || T == 'slimeC' || T == 'slimeF') {
      if (e.y < e.by - 1) {
        sy = 1.25;
        sx = 0.85;
      } else if (e.sq > 0) {
        sy = 0.7;
        sx = 1.25;
        e.sq -= 0.016;
      }
      if (e.st == 1) {
        sy = 0.75;
        sx = 1.15;
      }
    } else if (T == 'bat') sy = 1 + 0.45 * Math.sin(t * 22 + e.id);
    else if (T == 'skel' || T == 'skelG' || T == 'skelH') rot = Math.sin(t * 8 + e.id) * 0.07;
    else if (T == 'cat') {
      if (e.st == 1) {
        sy = 0.7;
        sx = 1.2;
      }
    } else if (T == 'eye') {
      sx = sy = 1 + 0.05 * Math.sin(t * 3 + e.id) + (e.st == 1 ? 0.2 : 0);
      rot = Math.sin(t * 1.7 + e.id) * 0.08;
    } else if (T == 'ghost') oy = Math.sin(t * 3 + e.id) * 3;
    else if (T == 'hood') {
      oy = Math.sin(t * 2.2 + e.id) * 2;
      rot = Math.sin(t * 1.5 + e.id) * 0.04;
    }
    if (e.st == 1 && T != 'ghost') ox = (Math.random() - 0.5) * 3;
    ctx.save();
    ctx.globalAlpha = (e.hit > 0 ? 0.5 : 1) * (e.a === undefined ? 1 : e.a) * (e.sp > 0 ? 1 - e.sp / 0.9 : 1);
    const EFL = e.st == 1 && T != 'ghost';
    ctx.translate(Math.round(e.x - cam + ox), Math.round(e.y + oy + (e.sp > 0 ? (e.sp / 0.9) * 22 : 0)));
    ctx.rotate(rot);
    ctx.scale((p.x < e.x ? 1 : -1) * sx, sy);
    ctx.drawImage(EFL ? fimg(im, 'brightness(1.9)') : im, -w / 2, fly ? -h / 2 : -h, w, h);
    gaze(e, w, h, fly, p.x < e.x ? 1 : -1);
    ctx.restore();
    if (T == 'skelH') {
      ctx.save();
      ctx.translate(Math.round(e.x - cam), Math.round(e.y - h / 2));
      if (e.shield) {
        ctx.scale(e.face, 1);
        ctx.strokeStyle = 'rgba(120,200,255,' + (0.5 + 0.3 * Math.sin(t * 10)) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(10, 0, 22, -1, 1);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#ffe066';
        for (let k = 0; k < 3; k++)
          ctx.fillRect(Math.cos(t * 6 + k * 2.1) * 14, -h / 2 - 6 + Math.sin(t * 6 + k * 2.1) * 3, 3, 3);
      }
      ctx.restore();
    }
  }
}

/* ---------- 25-cinematica.js ---------- */
function restart() {
  const a = area,
    cx = CPX,
    keep = { inv: inv, sw: hasSword, gem: hasGem };
  init();
  inv = keep.inv;
  hasSword = keep.sw;
  hasGem = keep.gem;
  if (a == 0 || a == 4) enterGate();
  else {
    state = 'play';
    loadArea(a);
    if ((a == 1 || a == 5) && cx > 0) {
      p.x = cx;
      cam = Math.max(0, Math.min(LEVEL - W, p.x - W / 2));
      CPS.forEach(c => {
        if (c.x <= cx) c.on = true;
      });
      CPX = cx;
    }
  }
}

const TPF = [
  [1, 1],
  [9, 1],
  [1, 8],
  [9, 8],
  [1, 15],
  [9, 15],
]; // marcos del pack: tierra, acero, musgo, pizarra, hielo, arena
function tdraw(fr, c, r, x, y) {
  const f = TPF[fr];
  ctx.drawImage(img.tp, (f[0] + c) * 8, (f[1] + r) * 8, 8, 8, x, y, 16, 16);
}
function drawPlat9(pl) {
  const n = Math.max(2, Math.round(pl.w / 16)),
    rows = pl.k == 'b' ? 3 : 2,
    x0 = Math.round(pl.x - cam),
    y0 = pl.y - 3,
    q = (pl.x / 16) | 0,
    fr = area == 5 ? [1, 5, 4, 0][q % 4] : [0, 2][q % 2];
  for (let j = 0; j < rows; j++) {
    const r = j == 0 ? 0 : j == rows - 1 ? 4 : 2;
    for (let i = 0; i < n; i++) {
      const c = i == 0 ? 0 : i == n - 1 ? 4 : 1 + ((q + i + j) % 3);
      tdraw(fr, c, r, x0 + i * 16, y0 + j * 16);
    }
  }
}
let CN = { t: 0, skip: 0 },
  CNF = [],
  CB = null,
  CS = null,
  SN = 0;
function loadCine() {
  if (CNF.length) return;
  for (const u of CINE) {
    const i = new Image();
    i.src = u;
    CNF.push(i);
  }
}
function playCine() {
  if (state != 'cine' || !CB || !AC) return;
  try {
    CS = AC.createBufferSource();
    CS.buffer = CB;
    const g = AC.createGain();
    g.gain.value = 0.95;
    CS.connect(g);
    g.connect(MG);
    CS.start(0, Math.max(0, Math.min(7.5, CN.t)));
  } catch (e) {}
}
function startCine() {
  loadCine();
  state = 'cine';
  CN = { t: 0, skip: 0 };
  ambient('void');
  if (AC && !muted) {
    try {
      if (CB) playCine();
      else {
        const b = atob(CAUD.split(',')[1]),
          u = new Uint8Array(b.length);
        for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
        AC.decodeAudioData(
          u.buffer,
          x => {
            CB = x;
            playCine();
          },
          () => {},
        );
      }
    } catch (e) {}
  }
}
function endCine() {
  try {
    if (CS) CS.stop();
  } catch (e) {}
  CS = null;
  loadArea(3);
  state = 'play';
  flashW = 1.1;
  B.wait = 0;
}
function drawCine() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  const t = CN.t,
    i = Math.min(CNF.length - 1, Math.floor(t * 10)),
    im = CNF[i];
  const a = t < 0.8 ? t / 0.8 : t > 7.3 ? Math.max(0, (8 - t) / 0.7) : 1;
  if (im && im.complete && im.width) {
    const sh = t > 2.5 ? (Math.random() - 0.5) * (t > 5 ? 3 : 1.4) : 0;
    ctx.globalAlpha = a;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(im, sh, (H - 394) / 2 + sh, W, 394);
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, 34);
  ctx.fillRect(0, H - 34, W, 34);
  const tx =
    t > 1.2 && t < 3.2
      ? 'Miles de ojos te observan desde el vacío.'
      : t > 3.6 && t < 5.4
        ? 'Uno de ellos jamás parpadea.'
        : t > 5.8 && t < 7.6
          ? 'ARLOS despierta.'
          : '';
  if (tx) {
    const s0 = t < 3.2 ? 1.2 : t < 5.4 ? 3.6 : 5.8;
    ctx.globalAlpha = Math.max(
      0,
      Math.min(1, (t - s0) / 0.5, (s0 + (t < 3.2 ? 2 : t < 5.4 ? 1.8 : 1.8) - t) / 0.5),
    );
    ctx.fillStyle = '#ff5a5a';
    ctx.font = '9px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText(tx, W / 2, H - 13);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
  if (t > 1.2) {
    ctx.fillStyle = '#8a8a8a';
    ctx.font = '7px ' + PS;
    ctx.textAlign = 'right';
    ctx.fillText('ESPACIO: OMITIR', W - 8, H - 3);
    ctx.textAlign = 'left';
  }
}
function drawDemon(e, t) {
  const S = 2,
    fl = p.x < e.x ? -1 : 1;
  let row, fr;
  if (e.dying) {
    row = 7;
    fr = Math.min(10, Math.floor(e.dt / 0.09));
  } else if (e.hitT > 0) {
    row = 6;
    fr = Math.floor(e.ft * 12) % 2;
  } else if (e.mode == 'atk') {
    row = 4;
    fr = Math.min(13, Math.floor(e.am / 0.06));
  } else if (e.mode == 'cmb') {
    row = 5;
    fr = Math.min(7, Math.floor(e.am / 0.1));
  } else {
    const ad = Math.abs(p.x - e.x);
    if (ad > 220) {
      row = 2;
      fr = Math.floor(e.ft * 14) % 8;
    } else if (ad > 70) {
      row = 3;
      fr = Math.floor(e.ft * 9) % 7;
    } else {
      row = 0;
      fr = Math.floor(e.ft * 8) % 7;
    }
  }
  const dir = e.mode == 'cmb' ? e.dir : fl;
  ctx.save();
  ctx.globalAlpha = (e.hit > 0 ? 0.6 : 1) * (e.sp > 0 ? 1 - e.sp / 0.9 : 1);
  ctx.translate(Math.round(e.x - cam), Math.round(e.y + (e.sp > 0 ? (e.sp / 0.9) * 20 : 0)));
  ctx.scale(dir, 1);
  ctx.drawImage(img.dsw, fr * 128, row * 64, 128, 64, -28 * S, -50 * S, 128 * S, 64 * S);
  ctx.restore();
}

const PR = {
    crateL: [42, 19, 45, 45],
    crateS: [127, 29, 35, 35],
    barrel: [195, 29, 27, 35],
    pot1: [264, 35, 17, 29],
    pot2: [294, 45, 21, 19],
    pot3: [328, 35, 19, 29],
    lampP: [941, 32, 16, 97],
    lampOn: [969, 6, 13, 18],
    torchP: [653, 37, 8, 24],
    fPil1: [35, 95, 8, 33],
    fPil2: [54, 95, 8, 33],
    fPil3: [70, 95, 9, 33],
    fRail1: [92, 96, 40, 9],
    fRail2: [92, 107, 39, 9],
    fRail3: [91, 119, 41, 9],
    signA: [388, 23, 27, 41],
    signB: [416, 11, 31, 53],
    board: [189, 163, 68, 61],
    well: [32, 165, 87, 91],
    bucket: [134, 231, 21, 25],
    hayB: [284, 259, 41, 29],
    hayP: [192, 254, 62, 34],
    scare: [704, 230, 64, 90],
    anvil: [857, 172, 42, 20],
    grave1: [447, 167, 34, 25],
    grave2: [511, 145, 35, 47],
    grave3: [579, 147, 27, 45],
    grave4: [643, 149, 27, 43],
    grass1: [391, 470, 17, 10],
    grass2: [421, 469, 23, 11],
    grass3: [458, 473, 11, 7],
    grass4: [390, 500, 19, 12],
    grass5: [420, 503, 24, 9],
    grass6: [455, 501, 17, 11],
    grass7: [391, 530, 20, 14],
    grass8: [418, 535, 29, 9],
    grass9: [454, 536, 19, 8],
    flowerA: [397, 429, 5, 5],
    flowerB: [429, 428, 7, 7],
    bush1: [356, 580, 57, 29],
    bush2: [452, 573, 89, 36],
    bush3: [576, 572, 95, 37],
    barrow: [32, 308, 96, 40],
    tree1: [833, 446, 153, 163],
    tree2: [694, 471, 120, 138],
    bannerP: [570, 231, 46, 89],
    banner: [642, 226, 28, 61],
    logs: [163, 335, 90, 49],
    bag1: [452, 222, 25, 34],
    bag2: [514, 225, 29, 31],
    rock1: [816, 365, 33, 19],
    rock2: [874, 358, 46, 26],
    rock3: [934, 369, 21, 15],
    wheat1: [514, 494, 28, 50],
    wheat2: [545, 485, 28, 59],
    wheat3: [580, 487, 24, 57],
    wheat4: [613, 490, 23, 54],
    wheat5: [645, 497, 25, 48],
    sun1: [930, 261, 27, 59],
    sun2: [899, 257, 26, 63],
    sun3: [869, 261, 22, 58],
    statue: [703, 115, 35, 77],
    table: [315, 196, 73, 28],
    chair: [394, 188, 22, 36],
    bench: [453, 89, 85, 39],
    stallT: [387, 320, 90, 28],
    stallP: [483, 329, 20, 87],
    stallTab: [391, 383, 85, 33],
    basket: [325, 371, 22, 13],
    pump1: [577, 97, 30, 31],
    pump2: [614, 105, 21, 23],
    stump: [800, 165, 31, 27],
    dummy: [777, 253, 47, 67],
    target: [717, 20, 38, 44],
    rack: [254, 95, 68, 33],
    wall: [733, 629, 136, 43],
    barr: [873, 20, 45, 44],
    fireBowl: [797, 33, 39, 31],
    recall: [161, 574, 31, 34],
    recallG: [202, 585, 11, 12],
    spikes: [799, 117, 33, 11],
    sign: [480, 18, 32, 46],
    hammer: [352, 144, 33, 13],
    kettle: [330, 401, 14, 15],
    cauldron: [361, 340, 16, 12],
    lampS: [976, 37, 33, 26],
  },
  CHR = {
    Wooden: [
      [31, 35, 34, 29],
      [95, 32, 34, 32],
      [159, 29, 34, 35],
      [223, 27, 34, 37],
      [287, 24, 34, 40],
      [351, 26, 34, 38],
      [415, 28, 34, 36],
    ],
    Iron: [
      [31, 98, 34, 30],
      [95, 94, 34, 34],
      [159, 90, 34, 38],
      [223, 87, 34, 41],
      [287, 89, 34, 39],
      [351, 93, 34, 35],
      [415, 96, 34, 32],
    ],
    Silver: [
      [31, 162, 34, 30],
      [96, 158, 34, 34],
      [159, 156, 34, 36],
      [223, 155, 34, 37],
      [287, 153, 34, 39],
      [351, 154, 34, 38],
      [415, 155, 34, 37],
    ],
    Golden: [
      [31, 227, 34, 29],
      [95, 223, 34, 33],
      [159, 221, 34, 35],
      [223, 219, 34, 37],
      [287, 217, 34, 39],
      [351, 218, 34, 38],
      [415, 220, 34, 36],
    ],
  };

/* ---------- 26-mundo-cofres-obeliscos.js ---------- */
/* optimizacion: los filtros (brillo/saturacion) se aplican una sola vez a una copia de la imagen, no en cada dibujo */
const FIMG = new WeakMap();
let VPI = null,
  FOK = null;
function fimg(im, f) {
  if (FOK === null) {
    try {
      const t = document.createElement('canvas').getContext('2d');
      t.filter = 'brightness(.5)';
      FOK = t.filter == 'brightness(.5)';
    } catch (e) {
      FOK = false;
    }
  }
  if (!FOK || !im || !im.width) return im;
  let m = FIMG.get(im);
  if (!m) {
    m = {};
    FIMG.set(im, m);
  }
  if (!m[f]) {
    const c = document.createElement('canvas');
    c.width = im.width;
    c.height = im.height;
    const x = c.getContext('2d');
    x.filter = f;
    x.drawImage(im, 0, 0);
    m[f] = c;
  }
  return m[f];
}
function pr(k, x, y) {
  const r = PR[k];
  ctx.drawImage(
    VPI || img.vp,
    r[0],
    r[1],
    r[2],
    r[3],
    Math.round(x - r[2] / 2),
    Math.round(y - r[3]),
    r[2],
    r[3],
  );
}
function prl(k, x, y) {
  const r = PR[k];
  ctx.drawImage(VPI || img.vp, r[0], r[1], r[2], r[3], Math.round(x), Math.round(y), r[2], r[3]);
}
function prs(k, x, y, t, a) {
  const r = PR[k];
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.transform(1, 0, Math.sin(t * 1.3 + x * 0.013) * a, 1, 0, 0);
  ctx.drawImage(VPI || img.vp, r[0], r[1], r[2], r[3], -Math.round(r[2] / 2), -r[3], r[2], r[3]);
  ctx.restore();
}
function nearCampX(x, m) {
  return (
    area == 1 &&
    (CAMPS.some(c => Math.abs(x - c.x) < m) || Math.abs(x - TELE.x) < m || Math.abs(x - 60) < m * 0.6)
  );
}
function vegBack(t) {
  const G = GROUND,
    n = area == 5;
  for (let c = Math.floor((cam - 220) / 520); c <= Math.floor((cam + W + 220) / 520); c++) {
    const px = c * 520 + rh(c * 3 + 1) * 320;
    if (rh(c + 41) < (n ? 0.5 : 0.72) && !nearCampX(px, 190))
      prs(rh(c + 7) > 0.5 ? 'tree1' : 'tree2', px - cam, G + 4, t, 0.006);
  }
  for (let c = Math.floor((cam - 100) / 210); c <= Math.floor((cam + W + 100) / 210); c++) {
    const px = c * 210 + rh(c + 5) * 130;
    if (rh(c + 17) < 0.55 && !nearCampX(px, 70))
      pr(['bush1', 'bush2', 'bush3'][Math.floor(rh(c + 2) * 3)], px - cam, G + 3);
  }
  for (let c = Math.floor((cam - 60) / 340); c <= Math.floor((cam + W + 60) / 340); c++) {
    const px = c * 340 + rh(c + 13) * 220;
    if (rh(c + 29) < 0.35 && !nearCampX(px, 60))
      pr(['rock1', 'rock2', 'rock3'][Math.floor(rh(c + 8) * 3)], px - cam, G + 2);
  }
  if (!n) {
    for (let c = Math.floor((cam - 80) / 600); c <= Math.floor((cam + W + 80) / 600); c++) {
      const px = c * 600 + rh(c + 21) * 300;
      if (rh(c + 33) < 0.3 && !nearCampX(px, 110))
        for (let k = 0; k < 4; k++)
          prs('wheat' + (1 + ((((c + k) % 5) + 5) % 5)), px + k * 13 - cam, G + 2, t, 0.02);
    }
    for (let c = Math.floor((cam - 80) / 780); c <= Math.floor((cam + W + 80) / 780); c++) {
      const px = c * 780 + rh(c + 55) * 400;
      if (rh(c + 61) < 0.28 && !nearCampX(px, 110))
        for (let k = 0; k < 3; k++) prs('sun' + (1 + k), px + k * 20 - cam, G + 2, t, 0.014);
    }
  }
}
function vegFront(t) {
  const G = GROUND,
    n = area == 5;
  for (let c = Math.floor((cam - 30) / 46); c <= Math.floor((cam + W + 30) / 46); c++) {
    const px = c * 46 + rh(c * 5 + 2) * 40;
    if (rh(c + 9) < 0.82) prs('grass' + (1 + Math.floor(rh(c + 4) * 9)), px - cam, G + 3, t, 0.045);
    if (!n && rh(c * 5 + 3) < 0.3) pr(rh(c + 6) > 0.5 ? 'flowerA' : 'flowerB', px + 14 - cam, G + 2);
  }
}
function butterflies(t) {
  if (area != 1) return;
  const G = GROUND;
  for (let i = 0; i < 9; i++) {
    const cx = 380 + i * 420,
      x = cx + Math.sin(t * 0.5 + i * 1.7) * 90 + Math.sin(t * 1.3 + i) * 20 - cam,
      y = G - 34 - Math.abs(Math.sin(t * 0.7 + i * 2.1)) * 30 - Math.sin(t * 2.3 + i) * 6;
    if (x < -10 || x > W + 10) continue;
    const f = Math.floor(t * 14 + i) % 2,
      cs = [
        ['#ffd45a', '#fff3b0'],
        ['#ff8fb0', '#ffd2e0'],
        ['#8fd0ff', '#e0f4ff'],
      ][i % 3];
    ctx.fillStyle = cs[0];
    ctx.fillRect(Math.round(x) - 3, Math.round(y) - (f ? 2 : 0), 3, f ? 3 : 2);
    ctx.fillRect(Math.round(x) + 1, Math.round(y) - (f ? 2 : 0), 3, f ? 3 : 2);
    ctx.fillStyle = cs[1];
    ctx.fillRect(Math.round(x), Math.round(y), 1, 2);
  }
}
function drawGroundNat(t, G) {
  const NF = 'brightness(.55) saturate(.7) hue-rotate(10deg)';
  if (area == 5) VPI = fimg(img.vp, NF);
  vegBack(t);
  VPI = null;
  for (let x = -(((cam % 256) + 256) % 256); x < W; x += 256) ctx.drawImage(img.cap, x, G - 5);
  if (area == 5) VPI = fimg(img.vp, NF);
  vegFront(t);
  VPI = null;
  butterflies(t);
}
function dressCamp(cx, x, G, t) {
  if (cx == 600) {
    pr('crateL', x - 124, G + 1);
    pr('crateS', x - 124, G - 44);
    pr('barrel', x - 98, G + 1);
    pr('pot1', x + 96, G + 1);
    pr('pot3', x + 114, G + 1);
    pr('pot2', x + 132, G + 1);
    pr('hayB', x + 160, G + 1);
  } else if (cx == 1450) {
    pr('rack', x - 124, G + 1);
    pr('anvil', x - 88, G + 1);
    pr('dummy', x + 112, G + 1);
    pr('target', x + 160, G + 1);
    pr('barrel', x + 134, G + 1);
  } else if (cx == 2300) {
    prs('scare', x - 126, G + 1, t, 0.01);
    for (let k = 0; k < 3; k++) prs('wheat' + (2 + k), x - 100 + k * 12, G + 2, t, 0.02);
    pr('stallP', x + 74, G + 1);
    pr('stallP', x + 150, G + 1);
    pr('stallTab', x + 112, G + 1);
    pr('stallT', x + 112, G - 68);
    pr('basket', x + 94, G - 30);
    pr('pump2', x + 126, G - 30);
    pr('bag1', x + 172, G + 1);
  } else if (cx == 3150) {
    pr('well', x - 124, G + 1);
    pr('bucket', x - 80, G + 1);
    pr('bench', x + 128, G + 1);
    pr('bag2', x + 96, G + 1);
    pr('table', x + 176, G + 1);
    pr('chair', x + 206, G + 1);
  }
}
function drawPath(t) {
  if (area != 1) return;
  const G = GROUND;
  for (const lx of [300, 1030, 1880, 2730, 3480]) {
    const x = Math.round(lx - cam);
    if (x < -50 || x > W + 50) continue;
    pr('lampP', x, G + 1);
    prl('lampS', x - 8, G - 97);
    pr('lampOn', x + 17, G - 78);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#ffb050';
    for (let i = 4; i >= 1; i--) {
      ctx.globalAlpha = 0.05 + 0.012 * Math.sin(t * 5 + lx);
      pdisc(x + 17, G - 84, i * 13);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  const D = [
    ['signB', 250],
    ['board', 1010],
    ['signA', 3380],
    ['barrow', 1190],
    ['stump', 760],
    ['pump1', 1710],
    ['pump2', 1745],
    ['hayP', 2050],
    ['logs', 2960],
    ['pump1', 2860],
    ['bag1', 3560],
  ];
  for (const [k, wx] of D) {
    const x = Math.round(wx - cam);
    if (x < -80 || x > W + 80) continue;
    pr(k, x, G + 1);
  }
}
let CHESTS = [];
const CHN = ['Wooden', 'Iron', 'Silver', 'Golden'];
function mkChests(n) {
  const L =
    n == 1
      ? [
          [950, 0],
          [1850, 0],
          [2700, 1],
          [3480, 1],
        ]
      : n == 5
        ? [
            [1500, 1],
            [3000, 1],
            [4800, 2],
            [6600, 2],
            [8200, 2],
            [9900, 3],
            [11500, 3],
            [12700, 3],
          ]
        : [];
  return L.map(a => ({ x: a[0], ty: a[1], st: 0, t0: 0 }));
}
function nearChest() {
  for (const c of CHESTS) if (!c.st && Math.abs(p.x - c.x) < 46) return c;
  return null;
}
function openChest(c) {
  c.st = 1;
  c.t0 = performance.now() / 1000;
  sfx('pick');
  const n = [1, 2, 2, 3][c.ty];
  for (let i = 0; i < n; i++)
    pick.push({ x: c.x + (i - (n - 1) / 2) * 24, id: randFood(), y: GROUND, got: false });
  for (let k = 0; k < 10; k++)
    fx.push({
      x: c.x + (Math.random() - 0.5) * 20,
      y: GROUND - 20,
      vx: (Math.random() - 0.5) * 60,
      vy: -30 - Math.random() * 40,
      l: 0.5 + Math.random() * 0.3,
    });
  say(
    ['Cofre de madera', 'Cofre de hierro', 'Cofre de plata', 'Cofre dorado'][c.ty] +
      ': ¡provisiones para el camino!',
  );
}
function drawChests(t) {
  zoneHUD(t);
  for (const c of CHESTS) {
    const x = Math.round(c.x - cam);
    if (x < -40 || x > W + 40) continue;
    const f = c.st ? Math.min(6, Math.floor((t - c.t0) * 9)) : 0,
      r = CHR[CHN[c.ty]][f];
    ctx.drawImage(img.chs, r[0], r[1], r[2], r[3], Math.round(x - r[2] / 2), GROUND - r[3] + 2, r[2], r[3]);
    if (!c.st && c.ty == 3) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = '#ffd45a';
      ctx.globalAlpha = 0.06 + 0.03 * Math.sin(t * 3);
      pdisc(x, GROUND - 14, 22);
      ctx.restore();
      ctx.globalAlpha = 1;
    }
    if (state == 'play' && !c.st && Math.abs(p.x - c.x) < 46) {
      ctx.fillStyle = '#fff';
      ctx.font = '8px ' + PS;
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5);
      ctx.fillText('[E] ABRIR', x, GROUND - 44);
      ctx.globalAlpha = 1;
      ctx.textAlign = 'left';
    }
  }
}

const ENM = {
    hallo: {
      cw: 50,
      ch: 24,
      ax: 16,
      ay: 23,
      cols: 12,
      anims: { idle: [0, 6], run: [1, 4], atk: [2, 7], hit: [3, 1] },
      sc: 2.0,
      w: 24,
      h: 46,
      nat: 1,
    },
    shade: {
      cw: 56,
      ch: 42,
      ax: 30,
      ay: 41,
      cols: 12,
      anims: { idle: [0, 6], run: [1, 6], turn: [2, 1] },
      sc: 1.5,
      w: 24,
      h: 61,
      nat: 1,
    },
    hunt: {
      cw: 114,
      ch: 48,
      ax: 27,
      ay: 45,
      cols: 12,
      anims: {
        idle: [0, 12],
        run: [1, 8],
        atk1: [2, 3],
        atk3: [3, 5],
        dash: [4, 3],
        hit: [5, 1],
        death: [6, 10],
      },
      sc: 1.5,
      w: 19,
      h: 58,
      nat: 1,
    },
    wboss: {
      cw: 228,
      ch: 87,
      ax: 100,
      ay: 86,
      cols: 12,
      anims: {
        idle: [0, 14],
        walk: [2, 14],
        atk1: [4, 10],
        atk2: [5, 9],
        pre3: [6, 3],
        mid3: [7, 4],
        end3: [8, 7],
        hit: [9, 1],
        death: [10, 33],
      },
      sc: 2.0,
      w: 68,
      h: 114,
      nat: 1,
    },
  },
  OBK = { cw: 32, ch: 133, n: 13 };
function foeInit(e) {
  e.mode = 'move';
  e.ft = 0;
  e.am = 0;
  e.hitT = 0;
  e.dt = 0;
  e.cd = 0.8 + Math.random() * 1.2;
  e.hd = 0;
  e.dir = 1;
  e.turnT = 0;
  e.lf = 1;
  e.dying = 0;
}
function foeDie(k) {
  return { hallo: 0.5, shade: 0.5, hunt: 0.9, wboss: 2}[k];
}
function foeNear(e, rx, ry) {
  return Math.abs(p.x - e.x) < rx && Math.abs(pcy() - (e.y - (e.z || 0) - ENM[e.t].h / 2)) < ry;
}
function foeAI(e, dt, ad, sg) {
  const T = e.t;
  e.ft += dt;
  if (e.dying) {
    e.dt += dt;
    if (e.dt > foeDie(T)) e.dead = 1;
    return true;
  }
  if (e.sp > 0) return true;
  if (e.hitT > 0) e.hitT -= dt;
  if (T != 'wboss' && e.hitT > 0) return false;
  if (T == 'hallo') {
    if (e.mode == 'atk') {
      e.am += dt;
      if (e.am > 0.18 && e.am < 0.55) {
        e.x += e.dir * 380 * dt;
        if (!e.hd && foeNear(e, 46, 48)) {
          e.hd = 1;
          hurt(12);
        }
      }
      if (e.am > 0.62) {
        e.mode = 'move';
        e.cd = 1.6 + Math.random();
      }
    } else {
      if (ad < 460 && ad > 50) e.x += sg * 125 * dt;
      if (e.cd <= 0 && ad < 240) {
        e.mode = 'atk';
        e.am = 0;
        e.hd = 0;
        e.dir = sg;
      }
    }
  } else if (T == 'shade') {
    if (e.turnT > 0) e.turnT -= dt;
    if (sg != e.lf && e.mode == 'move') {
      e.lf = sg;
      e.turnT = 0.12;
    }
    if (e.mode == 'atk') {
      e.am += dt;
      if (e.am < 0.35) {
        e.x += e.dir * 330 * dt;
        if (!e.hd && foeNear(e, 62, 50)) {
          e.hd = 1;
          hurt(11);
        }
      }
      if (e.am > 0.5) {
        e.mode = 'move';
        e.cd = 1.3 + Math.random() * 0.8;
      }
    } else {
      if (ad < 480 && ad > 90) e.x += sg * 170 * dt;
      if (e.cd <= 0 && ad < 150) {
        e.mode = 'atk';
        e.am = 0;
        e.hd = 0;
        e.dir = sg;
      }
    }
  } else if (T == 'hunt') {
    const A = e.mode;
    if (A == 'atk1') {
      e.am += dt;
      if (e.am < 0.15) e.x += e.dir * 90 * dt;
      if (!e.hd && e.am > 0.08 && foeNear(e, 78, 60)) {
        e.hd = 1;
        hurt(12);
      }
      if (e.am > 0.3) {
        e.mode = 'move';
        e.cd = 1 + Math.random();
      }
    } else if (A == 'atk3') {
      e.am += dt;
      if (!e.hd && e.am > 0.2 && foeNear(e, 125, 70)) {
        e.hd = 1;
        hurt(18);
      }
      if (e.am > 0.55) {
        e.mode = 'move';
        e.cd = 1.6 + Math.random();
      }
    } else if (A == 'dash') {
      e.am += dt;
      if (e.am > 0.1 && e.am < 0.38) {
        e.x += e.dir * 330 * dt;
        if (!e.hd && foeNear(e, 50, 55)) {
          e.hd = 1;
          hurt(14);
        }
      }
      if (e.am > 0.45) {
        e.mode = 'move';
        e.cd = 1.4 + Math.random();
      }
    } else {
      if (ad < 520 && ad > 70) e.x += sg * 115 * dt;
      if (e.cd <= 0 && ad < 210) {
        const r = Math.random();
        e.mode = r < 0.4 ? 'atk1' : r < 0.75 ? 'atk3' : 'dash';
        e.am = 0;
        e.hd = 0;
        e.dir = sg;
      }
    }
  } else if (T == 'wboss') {
    const A = e.mode,
      K = e.special ? 1.35 : 1,
      dtk = dt * K;
    e.ft += dt * (K - 1);
    if (A == 'atk1' || A == 'atk2') {
      e.am += dtk;
      const n = A == 'atk1' ? 0.7 : 0.63,
        rg = A == 'atk1' ? 175 : 215,
        dm = A == 'atk1' ? 20 : 22;
      if (!e.hd && e.am > 0.28 && e.am < 0.5 && foeNear(e, rg, 80)) {
        e.hd = 1;
        hurt(dm);
      }
      if (e.am > n) {
        e.mode = 'move';
        e.cd = (1.5 + Math.random()) / K;
      }
    } else if (A == 'atk3') {
      e.am += dtk;
      if (e.am > 0.36 && e.am < 0.6) e.x += e.dir * 250 * dtk;
      if (!e.hd && e.am > 0.62 && e.am < 0.8 && foeNear(e, 285, 90)) {
        e.hd = 1;
        hurt(30);
      }
      if (e.am > 1.1) {
        e.mode = 'move';
        e.cd = 2.2 / K;
      }
    } else {
      if (ad > 140) e.x += sg * (e.special ? 76 : 58) * dt;
      if (e.cd <= 0 && ad < 270) {
        const r = Math.random();
        e.mode = r < 0.38 ? 'atk1' : r < 0.7 ? 'atk2' : 'atk3';
        e.am = 0;
        e.hd = 0;
        e.dir = sg;
      }
    }
  }
  return false;
}
function foeAnim(e, ad) {
  const T = e.t,
    f = (fps, len) => Math.floor(e.ft * fps) % len;
  if (e.dying) {
    if (T == 'hunt') return ['death', Math.min(9, Math.floor(e.dt / 0.09))];
    if (T == 'wboss') return ['death', Math.min(32, Math.floor(e.dt / 0.06))];
    return [ENM[T].anims.hit ? 'hit' : 'idle', 0];
  }
  if (T == 'hallo') {
    if (e.hitT > 0) return ['hit', 0];
    if (e.mode == 'atk') return ['atk', Math.min(6, Math.floor(e.am / 0.08))];
    return ad > 50 ? ['run', f(10, 4)] : ['idle', f(8, 6)];
  }
  if (T == 'shade') {
    if (e.turnT > 0) return ['turn', 0];
    if (e.mode == 'atk') return ['run', f(16, 6)];
    return ad < 480 && ad > 90 ? ['run', f(12, 6)] : ['idle', f(8, 6)];
  }
  if (T == 'hunt') {
    if (e.hitT > 0) return ['hit', 0];
    if (e.mode == 'atk1') return ['atk1', Math.min(2, Math.floor(e.am / 0.1))];
    if (e.mode == 'atk3') return ['atk3', Math.min(4, Math.floor(e.am / 0.11))];
    if (e.mode == 'dash') return ['dash', Math.min(2, Math.floor(e.am / 0.15))];
    return ad > 70 ? ['run', f(12, 8)] : ['idle', f(8, 12)];
  }
  if (e.mode == 'atk1') return ['atk1', Math.min(9, Math.floor(e.am / 0.07))];
  if (e.mode == 'atk2') return ['atk2', Math.min(8, Math.floor(e.am / 0.07))];
  if (e.mode == 'atk3') {
    if (e.am < 0.36) return ['pre3', Math.min(2, Math.floor(e.am / 0.12))];
    if (e.am < 0.6) return ['mid3', Math.min(3, Math.floor((e.am - 0.36) / 0.06))];
    return ['end3', Math.min(6, Math.floor((e.am - 0.6) / 0.07))];
  }
  return ad > 140 ? ['walk', f(10, 14)] : ['idle', f(9, 14)];
}
function drawFoe(e, t) {
  const M = ENM[e.t],
    ad = Math.abs(p.x - e.x),
    an = foeAnim(e, ad),
    A = M.anims[an[0]],
    i = an[1],
    r = A[0] + Math.floor(i / M.cols),
    c = i % M.cols,
    sg = p.x < e.x ? -1 : 1,
    dir = e.mode != 'move' && e.dir && !e.dying ? e.dir : sg;
  let al = e.hit > 0 ? 0.65 : 1;
  if (e.sp > 0) al *= 1 - e.sp / 1.2;
  if (e.dying && (e.t == 'hallo' || e.t == 'shade')) al *= Math.max(0, 1 - e.dt / foeDie(e.t));
  ctx.save();
  ctx.globalAlpha = al;
  ctx.translate(Math.round(e.x - cam), Math.round(e.y - (e.z || 0) + (e.sp > 0 ? (e.sp / 1.2) * 18 : 0)));
  ctx.scale(dir * M.nat * M.sc, M.sc);
  const WFL = e.t == 'wboss' && e.mode == 'atk3' && e.am < 0.36;
  ctx.drawImage(
    WFL ? fimg(img[ET[e.t].i], 'brightness(1.7)') : img[ET[e.t].i],
    c * M.cw,
    r * M.ch,
    M.cw,
    M.ch,
    -M.ax,
    -M.ay,
    M.cw,
    M.ch,
  );
  ctx.restore();
  if (e.t == 'wboss' && !e.dying && !(e.sp > 0)) {
    const bx = Math.round(e.x - cam),
      by = Math.round(e.y - M.h) - 16;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(bx - 56, by, 112, 7);
    ctx.fillStyle = '#c0394a';
    ctx.fillRect(bx - 55, by + 1, Math.round((110 * Math.max(0, e.hp)) / (e.mhp || 320)), 5);
    ctx.fillStyle = '#ffd77a';
    ctx.font = '7px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText(e.special ? 'GUARDIÁN DE LA GEMA' : 'GUARDIÁN DEL PANTANO', bx, by - 4);
    ctx.textAlign = 'left';
  }
  if (e.sealed && KILLS < NEED && !e.dying) {
    const bx = Math.round(e.x - cam),
      cy = Math.round(e.y - M.h / 2);
    ctx.save();
    ctx.strokeStyle = 'rgba(190,120,255,' + (0.5 + 0.3 * Math.sin(t * 5)) + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(bx, cy, M.w * 0.75, M.h * 0.65, 0, 0, 7);
    ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(150,90,255,.12)';
    ctx.fill();
    ctx.restore();
  }
}
function drawObeliskAt(x, G, t, red, al, lock) {
  const fr = Math.floor(t * 8) % OBK.n,
    cx = Math.round(x),
    by = G + 3;
  ctx.save();
  ctx.globalAlpha = al;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const gc = red ? '255,90,40' : '80,255,235';
  let g = ctx.createRadialGradient(cx, by - 70, 6, cx, by - 70, 120);
  g.addColorStop(0, 'rgba(' + gc + ',' + (0.28 + 0.08 * Math.sin(t * 2.5)) + ')');
  g.addColorStop(1, 'rgba(' + gc + ',0)');
  ctx.globalAlpha = al * (lock ? 0.3 : 1);
  ctx.fillStyle = g;
  ctx.fillRect(cx - 120, by - 190, 240, 200);
  ctx.globalAlpha = al * (0.22 + 0.1 * Math.sin(t * 3));
  ctx.strokeStyle = red ? '#ff7a4a' : '#6ff0e0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, by - 1, 34 + Math.sin(t * 2) * 3, 7, 0, 0, 7);
  ctx.stroke();
  ctx.restore();
  ctx.imageSmoothingEnabled = true;
  const OI = lock
    ? fimg(img.obk, 'grayscale(.9) brightness(.65)')
    : red
      ? fimg(img.obk, 'hue-rotate(180deg) saturate(1.3)')
      : img.obk;
  ctx.drawImage(OI, fr * OBK.cw, 0, OBK.cw, OBK.ch, cx - OBK.cw / 2, by - OBK.ch, OBK.cw, OBK.ch);
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = al;
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 10; i++) {
    const q = (t * 0.35 + i / 10) % 1;
    ctx.fillStyle = red ? 'rgba(255,140,70,' + (1 - q) + ')' : 'rgba(110,255,235,' + (1 - q) + ')';
    ctx.fillRect(
      Math.round(cx - 24 + ((i * 37) % 48) + Math.sin(t * 2 + i) * 4),
      Math.round(by - 8 - q * 150),
      2,
      2,
    );
  }
  ctx.restore();
}
function drawTele(t) {
  if (area != 1) return;
  const x = Math.round(TELE.x - cam);
  if (x < -120 || x > W + 120) return;
  drawObeliskAt(x, GROUND, t, false, 1);
  if (state == 'play' && Math.abs(p.x - TELE.x) < 70) {
    ctx.fillStyle = '#fff';
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5);
    ctx.fillText('[E] VIAJAR A LA NOCHE', x, GROUND - 150);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
}
function drawTeleProps(t) {
  if (area != 1) return;
  const x = Math.round(TELE.x - cam),
    G = GROUND;
  if (x < -140 || x > W + 140) return;
  for (const dx of [-72, 72]) {
    pr('fireBowl', x + dx, G + 1);
    torchAt(x + dx, G - 27, t, 1.1);
  }
}
function drawGate(t) {
  const a = gateAlpha();
  if (a <= 0) return;
  const x = Math.round(PORTAL.x - cam);
  if (x < -120 || x > W + 120) return;
  drawObeliskAt(x, GROUND, t, hasGem, a, !hasGem);
  for (const dx of [-72, 72]) {
    ctx.globalAlpha = a;
    pr('fireBowl', x + dx, GROUND + 1);
    ctx.globalAlpha = 1;
    torchAt(x + dx, GROUND - 27, t, 1.1);
  }
  if (state == 'play' && a > 0.8 && Math.abs(p.x - PORTAL.x) < 80) {
    ctx.fillStyle = '#fff';
    ctx.font = '9px ' + PS;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5);
    ctx.fillText(hasGem ? '[E] ENTRAR · ARLOS' : 'SELLADO · NECESITAS LA GEMA', x, GROUND - 150);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
}

function pickT(k, rnd) {
  const WT =
    k < 0.15
      ? [
          ['hallo', 0.6],
          ['shade', 0.4],
        ]
      : k < 0.4
        ? [
            ['hallo', 0.35],
            ['shade', 0.3],
            ['demon', 0.2],
            ['hunt', 0.15],
          ]
        : k < 0.7
          ? [
              ['hallo', 0.28],
              ['shade', 0.27],
              ['demon', 0.2],
              ['hunt', 0.25],
            ]
          : [
              ['hallo', 0.25],
              ['shade', 0.25],
              ['demon', 0.22],
              ['hunt', 0.28],
            ];
  let r = rnd(),
    ty = WT[0][0];
  for (const [n, w] of WT) {
    if (r < w) {
      ty = n;
      break;
    }
    r -= w;
  }
  return ty;
}
function genEnc() {
  let sd = 41;
  const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647,
    G = GROUND,
    E = [];
  // suelo: separados, con alguna pareja
  let x = 820;
  while (x < 12100) {
    if (Math.abs(x - MBX[0]) < 380) {
      x += 380;
      continue;
    }
    E.push({ x: Math.round(x), t: pickT(x / 13000, rnd), y: G });
    if (rnd() < 0.12 && x > 1600)
      E.push({ x: Math.round(x + 170 + rnd() * 60), t: pickT(x / 13000, rnd), y: G });
    x += 640 + Math.floor(rnd() * 180);
  }
  // guardianes de cofres (cofre mas valioso = guardia mas fuerte)
  for (const c of mkChests(5)) {
    if (Math.abs(c.x - MBX[0]) < 300) continue;
    E.push({ x: c.x + 130, t: ['hallo', 'shade', 'hunt', 'demon'][c.ty], y: G });
  }
  // plataformas: un enemigo encima de cada 6ta plataforma
  platforms.forEach((pl, i) => {
    if (pl.x < 1200 || pl.x > 11800 || pl.w < 96 || i % 4 != 2) return;
    if (Math.abs(pl.x - MBX[0]) < 300) return;
    let t = pickT(pl.x / 13000, rnd);
    if (t == 'demon') t = 'shade';
    E.push({ x: Math.round(pl.x + pl.w / 2), t, y: pl.y, pl: 1 });
  });
  // custodios del obelisco
  E.push({ x: 12650, t: 'hunt', y: G, k: 1 });
  E.push({ x: 12850, t: 'hunt', y: G, k: 1 });
  E.sort((a, b) => a.x - b.x);
  // limpia solapes en el suelo (>=150 entre enemigos del suelo)
  const out = [];
  let lastG = -1e9;
  for (const e of E) {
    if (e.pl) {
      out.push(e);
      continue;
    }
    if (e.x - lastG < 150) continue;
    lastG = e.x;
    out.push(e);
  }
  const TOTAL = 15,
    even = (a, n) =>
      n <= 0
        ? []
        : n >= a.length
          ? a
          : Array.from({ length: n }, (_, i) => a[Math.round((i * (a.length - 1)) / Math.max(1, n - 1))]);
  const cust = out.filter(e => e.k),
    plats = even(
      out.filter(e => e.pl),
      4,
    ),
    gr = out.filter(e => !e.pl && !e.k);
  const fin = [...cust, ...plats, ...gr.filter(e => !e.pl && !e.k)];
  // Duskclaw: emboscadas pensadas por tramo (garras solas al inicio, lanzadores en lo alto con apoyo abajo, sombras junto a las tumbas, brutos custodiando)
  const DKP = [
    [1500, 'dusk'],
    [2350, 'dusk'],
    [3300, 'duskL', 1],
    [3420, 'dusk'],
    [5100, 'duskS'],
    [5950, 'duskL', 1],
    [6900, 'duskS'],
    [7600, 'duskB'],
    [8200, 'duskL', 1],
    [9000, 'dusk'],
    [9150, 'duskS'],
    [9850, 'duskB'],
    [10600, 'duskS'],
    [11350, 'dusk'],
    [11500, 'duskL', 1],
    [11780, 'duskB'],
  ];
  const dk = [];
  for (const [x, t, pl] of DKP) {
    let y = G,
      xx = x;
    if (pl) {
      let best = null,
        bd = 380;
      for (const q of platforms) {
        if (q.w < 96) continue;
        const d = Math.abs(q.x + q.w / 2 - x);
        if (d < bd) {
          bd = d;
          best = q;
        }
      }
      if (best) {
        xx = Math.round(best.x + best.w / 2);
        y = best.y;
      }
    }
    dk.push({ x: xx, t, y, pl: y < G ? 1 : 0 });
  }
  const all = [...fin.filter(e => e.k || !dk.some(d => Math.abs(d.x - e.x) < 130)), ...dk];
  all.sort((a, b) => a.x - b.x);
  return all;
}
function spawnEnc(c) {
  const e = mkE(c.t, c.x, c.y);
  foeInit(e);
  e.sp = c.t == 'demon' ? 0.9 : 0.8;
  enemies.push(e);
}
function killCount(e) {
  if (area != 5) return;
  const was = KILLS < NEED;
  KILLS += e.t == 'wboss' ? (e.special ? 0 : 3) : 1;
  if (was && KILLS >= NEED) {
    say('¡El sello se rompió! Ahora el Guardián puede ser vencido.');
    sfx('boom');
    flashW = 0.3;
  }
}
function drawGems(t) {
  for (const g of GEMS) {
    if (g.got) continue;
    const x = Math.round(g.x - cam),
      y = Math.round(g.y + Math.sin(t * 3) * 4);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#6ff0e0';
    for (let i = 3; i >= 1; i--) {
      ctx.globalAlpha = 0.08 + 0.03 * Math.sin(t * 4);
      pdisc(x, y, i * 12);
    }
    ctx.restore();
    ctx.fillStyle = '#bff8ee';
    ctx.beginPath();
    ctx.moveTo(x, y - 11);
    ctx.lineTo(x + 8, y - 3);
    ctx.lineTo(x, y + 11);
    ctx.lineTo(x - 8, y - 3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#37c9b4';
    ctx.beginPath();
    ctx.moveTo(x, y - 11);
    ctx.lineTo(x + 8, y - 3);
    ctx.lineTo(x, y + 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 3, y - 6, 2, 2);
  }
}
function zoneHUD(t) {
  if (area != 5 || state != 'play') return;
  const w = 190,
    x = Math.round(W / 2 - w / 2);
  ctx.fillStyle = 'rgba(0,0,0,.5)';
  ctx.fillRect(x, 6, w, 18);
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillStyle = hasGem ? '#7fe8d0' : KILLS >= NEED ? '#ffd77a' : '#e6e6e6';
  ctx.fillText(
    hasGem
      ? 'GEMA OBTENIDA · VE AL OBELISCO'
      : KILLS >= NEED
        ? 'SELLO ROTO · DERROTA AL GUARDIAN'
        : 'ENEMIGOS ' + Math.min(KILLS, NEED) + '/' + NEED,
    W / 2,
    18,
  );
  ctx.textAlign = 'left';
  if (hasGem) {
    const gx = x + w - 14,
      gy = 15;
    ctx.fillStyle = '#bff8ee';
    ctx.beginPath();
    ctx.moveTo(gx, gy - 6);
    ctx.lineTo(gx + 5, gy - 1);
    ctx.lineTo(gx, gy + 6);
    ctx.lineTo(gx - 5, gy - 1);
    ctx.closePath();
    ctx.fill();
  }
}
function nearestFoeX() {
  let b = null,
    bd = 1e9;
  for (const e of enemies) {
    if (e.dying || e.dead) continue;
    const d = Math.abs(e.x - p.x);
    if (d < bd) {
      bd = d;
      b = e;
    }
  }
  if (B.on) return B.x;
  return b && bd < 420 ? b.x : null;
}
function knock(sx) {
  const sg = sx == null ? -p.face : p.x >= sx ? 1 : -1;
  p.vx = sg * 340;
  p.vy = Math.min(p.vy, -190);
  p.on = false;
  p.kb = 0.25;
  p.dash = 0;
}

/* ---------- 27-cielo-en-blanco.js ---------- */
/* Archivo vacío: el área 6 ahora es el Bosque de la Niebla (27-nueva-fase.js y siguientes).
   Puedes borrar este archivo sin problema. */

/* ---------- 27-enemigos-cielo.js ---------- */
/* Archivo vacío: el área 6 ahora es el Bosque de la Niebla (27-nueva-fase.js y siguientes).
   Puedes borrar este archivo sin problema. */

/* ---------- 27-nueva-fase.js ---------- */
/* ===== NUEVA FASE (área 6) =====
   Fondo: "Dark Forest" de Val_DeMar (itch.io, licencia CC0), 5 capas con PARALLAX:
   cuando Smara camina, cada capa se mueve a distinta velocidad (las lejanas casi nada,
   las cercanas más), igual que en las otras zonas. Todas se repiten sin corte.
   - Las capas se dibujan a su tamaño real (1 pixel = 1 del mundo, como Smara).
   - El suelo gris del camino se mantiene (sacado del fondo anterior, pixel 2x2) y va pegado a Smara.
   - Abajo va el agua con el reflejo de todo (fondo, espíritus y Smara). */
const NF = {
  capas: [
    { k: 'df1', f: 0.04 }, // cielo y troncos lejanos
    { k: 'df2', f: 0.12 },
    { k: 'df3', f: 0.24 },
    { k: 'df4', f: 0.4 },
    { k: 'df5', f: 0.62 }, // árboles grandes y arbustos con flores
  ],
  capaW: 512,
  capaH: 360,
  capaBase: 314, // donde termina abajo cada capa (justo detrás del camino)
  sueloY: 296, // donde empieza la tira del suelo gris (con sus hierbitas)
  sueloW: 640, // ancho de la tira (320 pixeles x 2)
  suelo: 310, // donde pisa Smara
  agua: 336, // línea del agua: abajo de esto va el reflejo
  largo: 4400, // largo de la fase (inicio, zona de combate, camino de los espíritus)
};
function cieloCargar() {
  LEVEL = NF.largo;
  GROUND = NF.suelo;
  platCargar(); // 27c-plataformas.js
  CHESTS = [];
  tesorosCargar(); // 28c-tesoros.js
  enemies = [];
  pick = [];
  CPS = [];
  CPX = 0;
  ENC = [];
  ENCI = 0;
  STRUCTS = [];
  p.x = 120;
  p.y = GROUND;
  p.vy = 0;
  p.vx = 0;
  p.on = true;
  p.pl = null;
  cam = 0;
  SIETE.usada = false;
  ambient('');
}
// parallax: cada capa se corre según la cámara multiplicada por su velocidad
function drawCielo(t) {
  t = tMundo(); // se congela cuando Smara detiene el tiempo
  const top = NF.capaBase - NF.capaH;
  ctx.fillStyle = '#5d6478';
  ctx.fillRect(0, 0, W, H);
  brilloPreparar(); // siembra los hongos y esporas que brillan (27b-brillo-del-bosque.js)
  NF.capas.forEach((c, li) => {
    const off = Math.round(cam * c.f) % NF.capaW;
    const im = (BR.capas[li] && BR.capas[li].combo) || img[c.k]; // capa + brillos ya juntos (27b)
    for (let x = -off; x < W; x += NF.capaW) ctx.drawImage(im, x, top);
  });
  brilloBloom(t);
  // suelo gris: se repite en espejo para que no se note la unión
  const c0 = Math.floor(cam / NF.sueloW);
  for (let i = c0; i <= c0 + 2; i++) {
    const x = i * NF.sueloW - Math.round(cam);
    if (x > W || x + NF.sueloW < 0) continue;
    ctx.save();
    if (i % 2) {
      ctx.translate(x + NF.sueloW, NF.sueloY);
      ctx.scale(-1, 1);
    } else ctx.translate(x, NF.sueloY);
    ctx.drawImage(img.nfs, 0, 0, 320, 20, 0, 0, 640, 40);
    ctx.restore();
  }
  for (const n of ESPIRITUS) drawEspiritu(n, t); // espiritus (28-espiritus.js), detrás de Smara
  formaVelo(); // oscurece el bosque durante la transformación (28b-forma-espiritu.js)
}
// agua con reflejo: copia lo que hay arriba de la línea del agua y lo dibuja de cabeza, con ondas
function drawCieloAgua(t) {
  t = tMundo();
  const wt = NF.agua,
    hh = H - wt;
  let g = ctx.createLinearGradient(0, wt, 0, H);
  g.addColorStop(0, '#2a3148');
  g.addColorStop(1, '#10141f');
  ctx.fillStyle = g;
  ctx.fillRect(0, wt, W, hh);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, wt, W, hh);
  ctx.clip();
  ctx.globalAlpha = 0.62;
  const B0 = grabBand(Math.max(0, wt - hh - 2), wt);
  for (let y = 0; y < hh; y += 2) {
    const sy = wt - 2 - y;
    if (sy < 0) break;
    const o = Math.round(Math.sin(t * 1.6 + y * 0.35 + cam * 0.01) * (1 + y * 0.04)) * 2;
    ctx.drawImage(RFC, 0, sy * 2 - B0, W * 2, 4, o, wt + y, W, 2);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  g = ctx.createLinearGradient(0, wt, 0, H);
  g.addColorStop(0, 'rgba(20,26,44,.12)');
  g.addColorStop(1, 'rgba(8,10,22,.55)');
  ctx.fillStyle = g;
  ctx.fillRect(0, wt, W, hh);
  ctx.fillStyle = 'rgba(200,215,240,.32)';
  for (let i = 0; i < 34; i++) {
    const x = (((i * 97 + t * (8 + (i % 5) * 3) - cam * 0.5) % W) + W) % W,
      y = wt + 4 + ((i * 31) % (hh - 6));
    ctx.fillRect(Math.round(x / 2) * 2, Math.round(y / 2) * 2, 6 + (i % 4) * 2, 2);
  }
  ctx.fillStyle = '#1a1d2a';
  ctx.fillRect(0, wt, W, 2);
  if (TIEMPO.parado) {
    ctx.save();
    ctx.globalCompositeOperation = 'saturation';
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, NF.agua, W, H - NF.agua);
    ctx.restore();
  }
  tiempoOnda();
  dibujarReloj();
  formaCine(); // transformación de Smara (28b-forma-espiritu.js)
  drawTesorosHUD(t);
  drawCharla(); // globos de texto encima de todo
  drawReliquias(t);
}

/* ---------- 27b-brillo-del-bosque.js ---------- */
/* ===== BRILLO DEL BOSQUE (bioluminiscencia hecha a mano, estilo Mycelium) =====
   Sobre las capas de Dark Forest se "siembran" cosas que brillan, en pixel art:
   - hongos repisa pegados a los troncos (capas 4 y 5), con su brillo latiendo
   - hongos con tallo encima de los arbustos (capa 5)
   - esporas de luz en las copas de los árboles y puntitos lejanos (capas 2 a 5)
   - las flores rojas del fondo ahora brillan
   - luciérnagas flotando
   El brillo (bloom) se pinta en un lienzo a la mitad y se agranda sin suavizar, así
   el resplandor también queda "pixelado" y no borroso. Todo se mueve con su capa (parallax).
   La siembra usa una semilla fija: siempre sale igual. */

const BR = {
  listo: false,
  capas: [], // por capa: { lienzo (pixeles que brillan), focos: [{x,y,r,c,a,ph,v}] }
  esc: 2, // cada pixel del bloom = 2x2 del mundo (igual que el suelo)
  bloom: null,
  bx: null,
  halos: {},
  luci: [],
};
// colores de luz: [centro, borde]
const LUZ = {
  cian: ['#a8fbff', '#3cc8da'],
  menta: ['#b6ffd9', '#36c08c'],
  lila: ['#ecc2ff', '#9a5ad8'],
  coral: ['#ffc2b0', '#f1645b'],
};
function semilla(s) {
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function halo(nombre) {
  if (BR.halos[nombre]) return BR.halos[nombre];
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const x = c.getContext('2d'),
    g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, LUZ[nombre][1]);
  g.addColorStop(0.35, LUZ[nombre][1] + '88');
  g.addColorStop(1, LUZ[nombre][1] + '00');
  x.fillStyle = g;
  x.fillRect(0, 0, 32, 32);
  return (BR.halos[nombre] = c);
}
function brilloPreparar() {
  if (BR.listo) return;
  BR.listo = true;
  const R = semilla(20261020),
    pick = a => a[Math.floor(R() * a.length)];
  const W0 = NF.capaW,
    H0 = NF.capaH;
  for (let li = 0; li < NF.capas.length; li++) {
    const im = img[NF.capas[li].k],
      c = document.createElement('canvas');
    c.width = W0;
    c.height = H0;
    const x = c.getContext('2d');
    x.drawImage(im, 0, 0);
    const d = x.getImageData(0, 0, W0, H0).data;
    x.clearRect(0, 0, W0, H0);
    const px = (i, j) => {
      if (i < 0 || j < 0 || i >= W0 || j >= H0) return null;
      const k = (j * W0 + i) * 4;
      return d[k + 3] ? [d[k], d[k + 1], d[k + 2]] : null;
    };
    const es = (i, j, set) => {
      const q = px(i, j);
      return q && set.some(s => s[0] == q[0] && s[1] == q[1] && s[2] == q[2]);
    };
    const focos = [],
      ocupado = [];
    const libre = (i, j, r) => ocupado.every(([a, b]) => Math.hypot(a - i, b - j) > r);
    const dot = (i, j, col) => {
      x.fillStyle = col;
      x.fillRect(i, j, 1, 1);
    };
    // capa 5 (la más cercana)
    if (li == 4) {
      const TRONCO = [[60, 24, 12], [38, 16, 10], [80, 33, 18]],
        ARBUSTO = [[12, 17, 29], [10, 14, 20], [11, 15, 21], [16, 22, 39]],
        COPA = [[14, 20, 47], [23, 30, 62], [19, 27, 62], [16, 24, 57]],
        FLOR = [[241, 100, 91]];
      // hongos repisa en los bordes de los troncos
      for (let n = 0, intento = 0; n < 11 && intento < 6000; intento++) {
        const i = Math.floor(R() * W0),
          j = 110 + Math.floor(R() * 200);
        if (!es(i, j, TRONCO)) continue;
        const der = !es(i + 1, j, TRONCO),
          izq = !es(i - 1, j, TRONCO);
        if (der == izq || !libre(i, j, 18)) continue;
        const s = der ? 1 : -1,
          col = pick(['cian', 'cian', 'menta', 'lila']),
          [C, B] = LUZ[col],
          pisos = 1 + Math.floor(R() * 3);
        for (let k = 0; k < pisos; k++) {
          const y = j + k * 4,
            w = 3 + Math.floor(R() * 2);
          for (let a = 0; a < w; a++) dot(i + s * (a + 1), y, a == w - 1 ? B : C);
          for (let a = 0; a < w - 1; a++) dot(i + s * (a + 1), y + 1, B);
          focos.push({ x: i + s * 3, y: y, r: 10, c: col, a: 0.75, ph: R() * 6.28, v: 1 + R() * 1.5 });
        }
        ocupado.push([i, j]);
        n++;
      }
      // hongos con tallo encima de los arbustos
      for (let n = 0, intento = 0; n < 16 && intento < 8000; intento++) {
        const i = 2 + Math.floor(R() * (W0 - 4)),
          j = 270 + Math.floor(R() * 88);
        if (!es(i, j, ARBUSTO) || px(i, j - 1) || !libre(i, j, 16)) continue;
        const col = pick(['cian', 'menta', 'lila', 'cian']),
          [C, B] = LUZ[col],
          alto = 2 + Math.floor(R() * 4),
          ancho = R() < 0.5 ? 1 : 2;
        for (let k = 1; k <= alto; k++) dot(i, j - k, '#9fb6c4');
        const y = j - alto - 1;
        for (let a = -ancho; a <= ancho; a++) dot(i + a, y, Math.abs(a) == ancho ? B : C);
        for (let a = -ancho + 1; a <= ancho - 1; a++) dot(i + a, y - 1, C);
        if (R() < 0.5) {
          // hongo chiquito al lado
          const i2 = i + (R() < 0.5 ? -3 : 3);
          dot(i2, j - 1, '#9fb6c4');
          dot(i2, j - 2, C);
          dot(i2 - 1, j - 2, B);
          dot(i2 + 1, j - 2, B);
        }
        focos.push({ x: i, y: y, r: 12, c: col, a: 0.85, ph: R() * 6.28, v: 1.2 + R() * 1.5 });
        ocupado.push([i, j]);
        n++;
      }
      // esporas en las copas
      for (let n = 0, intento = 0; n < 70 && intento < 9000; intento++) {
        const i = Math.floor(R() * W0),
          j = Math.floor(R() * 150);
        if (!es(i, j, COPA)) continue;
        const col = pick(['cian', 'lila', 'menta']);
        dot(i, j, LUZ[col][0]);
        if (R() < 0.35) dot(i + 1, j, LUZ[col][1]);
        if (n % 3 == 0) focos.push({ x: i, y: j, r: 6, c: col, a: 0.5, ph: R() * 6.28, v: 1.5 + R() * 2 });
        n++;
      }
      // flores rojas que brillan
      for (let j = 0; j < H0; j++)
        for (let i = 0; i < W0; i++)
          if (es(i, j, FLOR) && !es(i - 1, j, FLOR) && !es(i, j - 1, FLOR)) {
            dot(i, j, '#ffd6c8');
            focos.push({ x: i + 1, y: j + 1, r: 11, c: 'coral', a: 0.38, ph: R() * 6.28, v: 1 + R() });
          }
    }
    // capa 4: hongos repisa más tenues
    if (li == 3) {
      const TRONCO = [[48, 38, 36], [39, 33, 32]];
      for (let n = 0, intento = 0; n < 6 && intento < 5000; intento++) {
        const i = Math.floor(R() * W0),
          j = 120 + Math.floor(R() * 170);
        if (!es(i, j, TRONCO)) continue;
        const der = !es(i + 1, j, TRONCO),
          izq = !es(i - 1, j, TRONCO);
        if (der == izq || !libre(i, j, 30)) continue;
        const s = der ? 1 : -1;
        for (let a = 0; a < 3; a++) dot(i + s * (a + 1), j, a == 2 ? '#2e8fa6' : '#6fd3e2');
        dot(i + s, j + 1, '#2e8fa6');
        dot(i + s * 2, j + 1, '#2e8fa6');
        focos.push({ x: i + s * 2, y: j, r: 8, c: 'cian', a: 0.4, ph: R() * 6.28, v: 1 + R() });
        ocupado.push([i, j]);
        n++;
      }
    }
    // capas lejanas: puntitos de luz
    if (li == 1 || li == 2) {
      const n = li == 1 ? 14 : 22;
      for (let k = 0; k < n; k++) {
        const i = Math.floor(R() * W0),
          j = 60 + Math.floor(R() * 250);
        if (!px(i, j)) continue;
        dot(i, j, li == 1 ? '#5f8fa8' : '#78b8cc');
        focos.push({ x: i, y: j, r: 5, c: 'cian', a: li == 1 ? 0.18 : 0.28, ph: R() * 6.28, v: 0.6 + R() });
      }
    }
    // optimización: la capa y sus pixeles que brillan se juntan una sola vez en un lienzo,
    // así cada cuadro se dibuja 1 imagen por capa en vez de 2
    const combo = document.createElement('canvas');
    combo.width = W0;
    combo.height = H0;
    const cx = combo.getContext('2d');
    cx.drawImage(im, 0, 0);
    cx.drawImage(c, 0, 0);
    BR.capas[li] = { lienzo: c, combo, focos };
  }
  // luciérnagas
  for (let k = 0; k < 18; k++)
    BR.luci.push({ x: R() * 900, y: 130 + R() * 160, ph: R() * 6.28, v: 0.4 + R() * 0.6, c: pick(['menta', 'cian', 'menta']), f: 0.75 + R() * 0.2 });
  BR.bloom = document.createElement('canvas');
  BR.bloom.width = Math.ceil(W / BR.esc);
  BR.bloom.height = Math.ceil(H / BR.esc);
  BR.bx = BR.bloom.getContext('2d');
}
// pixeles que brillan de una capa (se dibuja justo encima de la capa)
function brilloCapa(li, x, top, t) {
  const L = BR.capas[li];
  if (!L) return;
  ctx.globalAlpha = 0.82 + Math.sin(t * 1.3 + li) * 0.18;
  ctx.drawImage(L.lienzo, x, top);
  ctx.globalAlpha = 1;
}
// resplandor de todas las capas + luciérnagas, en un lienzo chico agrandado sin suavizar
function brilloBloom(t) {
  // optimización: con la cámara quieta, el resplandor se recalcula un cuadro sí y uno no
  // (las luces laten lento); si la cámara se mueve se recalcula siempre para que no tiemble
  BR.par = !BR.par;
  const e = BR.esc,
    alto = Math.ceil(NF.agua / e); // solo hasta la línea del agua (abajo lo cubre el reflejo)
  if (BR.par && BR.camB != null && Math.abs(BR.camB - cam) < 0.5) {
    brilloComponer(0, alto);
    brilloLuciernagas();
    return;
  }
  BR.camB = cam;
  const b = BR.bx,
    top = NF.capaBase - NF.capaH;
  b.clearRect(0, 0, BR.bloom.width, BR.bloom.height);
  b.globalCompositeOperation = 'lighter';
  for (let li = 0; li < NF.capas.length; li++) {
    const L = BR.capas[li];
    if (!L || !L.focos.length) continue;
    const off = Math.round(cam * NF.capas[li].f) % NF.capaW;
    for (let x0 = -off; x0 < W; x0 += NF.capaW)
      for (const f of L.focos) {
        const X = x0 + f.x,
          Y = top + f.y;
        if (X < -f.r || X > W + f.r) continue;
        b.globalAlpha = f.a * (0.55 + 0.45 * Math.sin(t * f.v + f.ph));
        const r = f.r / e;
        b.drawImage(halo(f.c), X / e - r, Y / e - r, r * 2, r * 2);
      }
  }
  // luciérnagas: flotan y titilan
  for (const l of BR.luci) {
    const X = ((((l.x + Math.sin(t * l.v + l.ph) * 30 - cam * l.f) % 960) + 960) % 960) - 130,
      Y = l.y + Math.sin(t * l.v * 1.7 + l.ph * 2) * 14,
      a = Math.max(0, Math.sin(t * l.v * 2.3 + l.ph));
    l.sx = X;
    l.sy = Y;
    l.a = a;
    if (a <= 0.05) continue;
    b.globalAlpha = a * 0.8;
    const r = 9 / e;
    b.drawImage(halo(l.c), X / e - r, Y / e - r, r * 2, r * 2);
  }
  b.globalAlpha = 1;
  b.globalCompositeOperation = 'source-over';
  brilloComponer(0, alto);
  brilloLuciernagas();
}
function brilloComponer(dx, alto) {
  const e = BR.esc;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 0.9;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(BR.bloom, 0, 0, BR.bloom.width, alto, dx, 0, BR.bloom.width * e, alto * e);
  ctx.restore();
}
function brilloLuciernagas() {
  // el cuerpo de cada luciérnaga: 2x2 pixeles
  for (const l of BR.luci) {
    if (!(l.a > 0.05)) continue;
    ctx.globalAlpha = Math.min(1, l.a * 1.3);
    ctx.fillStyle = LUZ[l.c][0];
    ctx.fillRect(Math.round(l.sx / 2) * 2, Math.round(l.sy / 2) * 2, 2, 2);
  }
  ctx.globalAlpha = 1;
}

/* ---------- 27c-plataformas.js ---------- */
/* ===== PLATAFORMAS DE LA NUEVA FASE =====
   Tiles de "Dark Forest Platform Pack" (Atari Boy, CC0), recoloreados a los azules del bosque.
   Cada tile es de 16x16 y se dibuja a 32x32 (pixel 2x2, igual que el suelo y los espíritus).
   Son plataformas de un solo sentido: se sube desde abajo, se baja con S + salto.
   Distribución:
   - inicio (Venado y Oveja): libre, para hablar tranquila
   - 1000 a 2450: ZONA DE COMBATE (todavía sin enemigos): escalones de distinta altura para
     pelear arriba y abajo, un mirador alto con bloques de runas y descansos entre saltos
   - 2500 en adelante: camino de los demás espíritus, con algunas plataformas para variar
   Smara salta unos 90 px: cada escalón sube 55-70 px para que siempre se alcance. */
const PL_TILE = 16,
  PL_ESC = 2;
const PLAT_FASE = [
  // [x, y (donde se pisa), tiles de ancho, adornos]
  // --- zona de combate ---
  [1040, 252, 3, 'arbusto'],
  [1210, 192, 4, ''],
  [1410, 252, 2, ''],
  [1540, 186, 5, 'runas'],
  [1600, 120, 2, 'runas'], // mirador alto
  [1790, 244, 3, 'arbusto'],
  [1950, 184, 3, ''],
  [2110, 124, 4, 'runas'],
  [2290, 236, 3, ''],
  // --- camino de los espíritus ---
  [2780, 244, 3, 'arbusto'],
  [3080, 200, 3, ''],
  [3400, 240, 2, ''],
  [3680, 196, 4, 'runas'],
  [3990, 240, 3, 'arbusto'],
];
function platCargar() {
  platforms = PLAT_FASE.map(([x, y, n, deco]) => ({ x, y, w: n * PL_TILE * PL_ESC, deco, n }));
}
function tile(tx, ty, x, y) {
  ctx.drawImage(img.pltl, tx * PL_TILE, ty * PL_TILE, PL_TILE, PL_TILE, x, y, PL_TILE * PL_ESC, PL_TILE * PL_ESC);
}
function drawPlatFase(t) {
  const T = PL_TILE * PL_ESC;
  for (const pl of platforms) {
    const x0 = Math.round(pl.x - cam);
    if (x0 > W + 40 || x0 + pl.w < -40) continue;
    const y0 = pl.y - 6; // el pasto sobresale un poco por encima de donde se pisa
    // sombra suave debajo
    ctx.fillStyle = 'rgba(8,10,20,.25)';
    ctx.fillRect(x0 + 6, y0 + T, pl.w - 12, 4);
    for (let i = 0; i < pl.n; i++) {
      const tx = pl.n == 1 ? 7 : i == 0 ? 6 : i == pl.n - 1 ? 10 : 7 + (i % 3);
      tile(tx, 2, x0 + i * T, y0);
    }
    // raíces y musgo que cuelgan y brillan
    for (let k = 6; k < pl.w - 6; k += 10) {
      const s = (pl.x + k) * 7,
        largo = 2 + (s % 5),
        bri = 0.5 + 0.5 * Math.sin(t * 1.8 + s);
      ctx.fillStyle = '#1d2238';
      ctx.fillRect(x0 + k, y0 + T - 2, 2, largo * 2);
      if (s % 3 == 0) {
        ctx.globalAlpha = bri;
        ctx.fillStyle = '#8ff6ff';
        ctx.fillRect(x0 + k, y0 + T - 2 + largo * 2, 2, 2);
        ctx.globalAlpha = 1;
      }
    }
    // adornos encima (no estorban al caminar)
    if (pl.deco == 'arbusto') ctx.drawImage(img.pltl, 96, 112, 48, 16, x0 + pl.w / 2 - 48, y0 - 26, 96, 32);
    if (pl.deco == 'runas') {
      const bx = x0 + pl.w - T - 4;
      tile(7, 5, bx, y0 - T + 6);
      // las runas laten como los hongos
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.25 + 0.2 * Math.sin(t * 2.2 + pl.x);
      ctx.drawImage(halo('cian'), bx - 8, y0 - T - 2, T + 16, T + 16);
      ctx.restore();
    }
  }
  drawCofres(t); // 28c-tesoros.js
}
// el mundo se pone gris al detener el tiempo: se aplica después de enemigos, antes de Smara
const drawEnemiesBase = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesBase(t);
  if (area == 6) tiempoVelo();
};
const drawPlatBase = drawPlat;
drawPlat = function () {
  if (area == 6) return drawPlatFase(tMundo());
  return drawPlatBase();
};

/* ---------- 28-espiritus.js ---------- */
/* ===== ESPIRITUS ANIMALES (nueva fase) =====
   Animales que hablan: fueron mentes inocentes que nunca pudieron ver la luz del mundo
   como la ven los humanos. Al morir se quedaron en la niebla, esperando que alguien los nombre.
   Cada uno le regala a Smara una RELIQUIA (efecto permanente).
   - Sprites: tu imagen, bajada a su pixel real (cada pixel = 2x2 en el mundo, igual que el fondo).
   - Animación por piezas: cabeza, orejas, cola, sombrero, borde del fantasma... cada pieza se
     mueve por separado (respirar, parpadear, mover la cola, quitarse el sombrero, flotar...).
   - Hablan con globos de texto sobre la cabeza; Smara también contesta con globos.
   - E / Espacio / Enter / clic: hablar y pasar el texto. */

const ESC_E = 2; // tamaño de cada pixel del sprite en el mundo
const C_CLARO = '#d8d2cf',
  C_OSCURO = '#2c2621';
// partes: [x, y, w, h, tipo] en pixeles del sprite. ojos: [x, y, color que los tapa al parpadear]
const ESPIRITUS = [
  {
    k: 'venado', nm: 'El Venado de Hueso', x: 560, sx: 0, w: 18, h: 32, voz: 330,
    partes: [[0, 0, 18, 13, 'cabeza'], [0, 13, 18, 19, 'cuerpo']], ojos: [],
    reliq: { n: 'Asta de Bienvenida', d: 'Regeneras vida poco a poco.' },
    charla: [
      ['e', '¡...!'],
      ['e', '¡Una humana! ¿Cómo llegaste hasta aquí con los ojos abiertos?'],
      ['s', 'Yo también me lo pregunto. Un rayo me trajo... creo.'],
      ['e', 'Perdoná el susto. Aquí nunca llega nadie que todavía respire.'],
      ['e', 'Este es el Bosque de la Niebla. Aquí quedamos los que fuimos animales.'],
      ['e', 'Mentes sin malicia que nunca vimos la luz del mundo como la ven ustedes.'],
      ['e', 'Ustedes miran el sol y piensan en mañana. Nosotros solo sentíamos su calor... hasta que un día ya no estuvo.'],
      ['s', '¿Entonces están... muertos?'],
      ['e', 'Estamos esperando. Los Duhindu me cuidaban en el monte. Cuando la gente dejó de nombrarlos, nadie me cuidó a mí.'],
      ['e', 'Tomá esto, para que el camino no te pese. Los demás también querrán verte: hace mucho que nadie nos escucha.'],
    ],
    otra: ['La niebla no muerde. Solo olvida. Caminá despacio y nombrá lo que veas.'],
  },
  {
    k: 'conejo', nm: 'La Liebre de Capa', x: 2650, sx: 19, w: 15, h: 32, voz: 620,
    partes: [[0, 0, 15, 7, 'orejas'], [0, 7, 15, 9, 'cabeza'], [0, 16, 15, 16, 'cuerpo']],
    ojos: [[7, 11, C_CLARO], [8, 11, C_CLARO]],
    reliq: { n: 'Pata de la Liebre', d: 'Saltas más alto.' },
    charla: [
      ['e', '¡Ay! ¡Me asustaste! Tengo el corazón como tambor... bueno, tenía.'],
      ['e', 'Yo corría de todo: de la sombra, del viento, de mi propio eco.'],
      ['e', 'Nunca me quedé quieta el tiempo suficiente para mirar el cielo.'],
      ['s', '¿Y ahora?'],
      ['e', 'Ahora tengo tiempo de sobra y nada de qué huir. Es rarísimo.'],
      ['e', 'Tomá. Saltá por mí, y mirá para arriba cuando estés en el aire.'],
    ],
    otra: ['¿Ya miraste para arriba? Desde el aire el bosque parece menos triste.'],
  },
  {
    k: 'zorro', nm: 'El Zorro de Abrigo', x: 2950, sx: 35, w: 18, h: 31, voz: 260,
    partes: [[0, 0, 18, 12, 'cabeza'], [0, 12, 4, 12, 'cola'], [4, 12, 14, 19, 'cuerpo']],
    ojos: [[11, 7, C_CLARO], [12, 7, C_CLARO]],
    reliq: { n: 'Cola de Zorro', d: 'El dash se recarga más rápido.' },
    charla: [
      ['e', 'Una humana con espada en el bosque de los espíritus. Qué cuento tan viejo.'],
      ['e', 'Me llamaban ladrón. Yo solo tenía hambre, y el hambre no sabe de dueños.'],
      ['e', 'Ustedes ven el mundo con reglas. Nosotros lo veíamos con la nariz.'],
      ['s', 'No vengo a robarte nada.'],
      ['e', 'Ya sé. Por eso te doy algo. Para que llegués primero, como yo.'],
    ],
    otra: ['Primero llega el que no se detiene a pedir permiso. Pero vos pedilo igual.'],
  },
  {
    k: 'oveja', nm: 'La Oveja Negra', x: 860, sx: 54, w: 16, h: 28, voz: 400,
    partes: [[0, 0, 16, 9, 'cabeza'], [0, 9, 16, 19, 'cuerpo']], ojos: [],
    reliq: { n: 'Forma de Niebla', d: 'Clic: detienes el tiempo 1.5 s. 15% menos daño.' },
    charla: [
      ['e', 'Shhh... no hablés fuerte. Aquí la niebla escucha.'],
      ['e', 'Yo seguía al rebaño. Nunca supe a dónde íbamos, solo que no quería quedarme sola.'],
      ['e', 'Vos tampoco sabés a dónde vas, ¿verdad? Se te nota en la sombra: aquí los humanos se van borrando.'],
      ['s', '¿Me voy a borrar?'],
      ['e', 'No si te ponés la lana de la niebla. Te va a cambiar un poco por fuera. Por dentro seguís siendo vos.'],
      ['e', 'Quedate quieta. Esto hace cosquillas.'],
    ],
    despues: [
      ['s', '...¿Esta soy yo?'],
      ['e', 'Ahora la niebla te reconoce. Tu espada duerme en tu espalda.'],
      ['e', 'Y la niebla no tiene prisa: si se lo pedís, detiene el tiempo un suspiro. Uno y medio, nada más.'],
      ['e', 'Úsalo cuando el bosque se ponga feo. Más adelante se pone feo, créeme.'],
    ],
    otra: ['Te queda bien la niebla. Acordate: clic y el tiempo se detiene un suspiro.'],
  },
  {
    k: 'sombrero', nm: 'El Viajero del Sombrero', x: 3250, sx: 71, w: 27, h: 31, voz: 210,
    partes: [[0, 0, 27, 13, 'sombrero'], [10, 13, 17, 4, 'cabeza'], [0, 13, 10, 18, 'maletin'], [10, 17, 17, 14, 'cuerpo']],
    ojos: [],
    reliq: { n: 'Aire del Maletín', d: 'La stamina se recupera más rápido.' },
    charla: [
      ['e', 'Buenas, buenas. ¿Viajera también? Se le nota en los zapatos.'],
      ['e', 'Volé de río en río toda mi vida. Cargaba este maletín y nunca supe qué tenía adentro.'],
      ['e', 'Ustedes abren las cosas para entenderlas. Nosotros solo las cargábamos.'],
      ['s', '¿Y ya lo abriste?'],
      ['e', 'Hoy sí, por usted. Adentro había aire de un día largo. Lléveselo: le va a hacer falta.'],
    ],
    otra: ['Un viaje no se termina: se deja de cargar. Buen camino, señorita.'],
  },
  {
    k: 'fantasma', nm: 'El Sin Forma', x: 3550, sx: 99, w: 11, h: 20, voz: 520, flota: 1,
    partes: [[0, 0, 11, 15, 'cuerpo'], [0, 15, 11, 5, 'borde']],
    ojos: [[1, 4, C_CLARO], [4, 4, C_CLARO]],
    reliq: { n: 'Velo del Sin Forma', d: 'Al recibir un golpe, quedas invulnerable más tiempo.' },
    charla: [
      ['e', '...¿me ves? Nadie me ve.'],
      ['e', 'No me acuerdo qué animal era. Solo que le tenía miedo a la luz de las casas.'],
      ['e', 'Los que no tienen nombre se van borrando. Yo ya casi no tengo bordes.'],
      ['s', 'Yo te veo. Y te voy a recordar.'],
      ['e', '...gracias. Tomá un pedazo de mí. Cuando te golpeen, la niebla te va a esconder un rato.'],
    ],
    otra: ['Todavía me ves. Todavía estoy.'],
  },
  {
    k: 'gatita', nm: 'La Gatita del Delantal', x: 3850, sx: 111, w: 14, h: 26, voz: 700,
    partes: [[0, 0, 14, 10, 'cabeza'], [0, 10, 2, 12, 'cola'], [2, 10, 12, 16, 'cuerpo']],
    ojos: [[3, 6, C_CLARO], [7, 6, C_CLARO]],
    reliq: { n: 'Cascabel del Fogón', d: 'Tus golpes hacen 15% más daño.' },
    charla: [
      ['e', '¡Bienvenida, bienvenida! Perdón el desorden, la niebla se mete en todo.'],
      ['e', 'Yo vivía en una cocina. Me daban las sobras y yo cuidaba que no entraran ratones.'],
      ['e', 'Era feliz y no sabía que se llamaba así. Ustedes tienen palabras para todo.'],
      ['e', 'Nosotros solo teníamos el calor del fogón.'],
      ['s', 'Esa palabra es «hogar».'],
      ['e', 'Hogar... qué bonito suena. Tomá, para que golpeés con ganas.'],
    ],
    otra: ['Hogar, hogar, hogar. Me la estoy aprendiendo.'],
  },
  {
    k: 'gatonegro', nm: 'El Gato Negro', x: 4150, sx: 126, w: 15, h: 29, voz: 170,
    partes: [[0, 0, 15, 11, 'cabeza'], [10, 11, 5, 10, 'cola'], [0, 11, 10, 18, 'cuerpo'], [10, 21, 5, 8, 'cuerpo']],
    ojos: [[2, 6, C_OSCURO], [6, 6, C_OSCURO]],
    reliq: { n: 'Siete Vidas', d: 'Una vez por zona, sobrevives a un golpe mortal.' },
    charla: [
      ['e', 'Al fin. Te estuve mirando desde que llegaste.'],
      ['e', 'A mí los humanos me temían. Decían que traía mala suerte. Yo solo quería un pedazo de sol.'],
      ['e', 'La luz que ustedes ven, nosotros la sentíamos. Y la oscuridad que ustedes niegan, nosotros la cuidábamos.'],
      ['s', '¿Por qué me ayudan todos?'],
      ['e', 'Porque vos todavía podés volver. Llevate mis vidas: me sobran seis.'],
    ],
    otra: ['Seis vidas me quedan. Con una sola ya se puede ser feliz, ¿sabés?'],
  },
];
for (const n of ESPIRITUS) n.cabH = n.partes[0][3];

/* ---- estado ---- */
const RELIQ = new Set(); // reliquias que tiene Smara
let CHARLA = null, // conversación actual
  PENDIENTE = null, // conversación que empieza en un momento
  REGALO = null, // cartel de "recibiste..."
  SIETE = { usada: false };
const EST = {}; // estado de animación de cada espíritu
function faseReset() {
  RELIQ.clear();
  for (const n of ESPIRITUS) EST[n.k] = null;
  CHARLA = null;
  PENDIENTE = null;
  REGALO = null;
  formaQuitar();
  tesorosReset();
  FORMA.tr = null;
  FORMA.fuerza = null;
  FORMA.blanco = 0;
  FORMA.desenv = 0;
}
function est(n) {
  return EST[n.k] || (EST[n.k] = { dado: false, visto: false, sorpresa: -9, talk: 0, f: 1, parpa: 2 + Math.random() * 3, tic: 3, hat: -9, feliz: -9, ph: Math.random() * 6 });
}

/* ---- efectos de las reliquias ---- */
const hurtBase = hurt;
hurt = function (d) {
  if (RELIQ.has('oveja')) d *= 0.85;
  const hp0 = p.hp;
  hurtBase(d);
  if (p.hp < hp0) {
    if (RELIQ.has('fantasma')) p.inv = Math.max(p.inv, 1.7);
    if (p.hp <= 0 && RELIQ.has('gatonegro') && !SIETE.usada) {
      SIETE.usada = true;
      p.hp = 1;
      p.inv = 2;
      flashW = 0.6;
      sfx('parry');
      say('Siete Vidas: el Gato Negro te prestó una.');
    }
  }
};
const sdmgBase = sdmg;
sdmg = a => Math.round(sdmgBase(a) * (RELIQ.has('gatita') ? 1.15 : 1));
function reliqTick(dt) {
  if (RELIQ.has('venado') && p.hp > 0 && p.hp < 100) p.hp = Math.min(100, p.hp + 0.8 * dt);
  if (RELIQ.has('zorro') && p.dashCd > 0) p.dashCd -= dt * 0.5;
  if (RELIQ.has('sombrero') && p.staWait <= 0) p.sta = Math.min(100, p.sta + 11 * dt);
  if (RELIQ.has('conejo')) {
    if (!p.on && p.wasOn && p.vy < -400 && !p.jb) {
      p.vy *= 1.12;
      p.jb = 1;
    }
    if (p.on) p.jb = 0;
  }
  p.wasOn = p.on;
}

/* ---- cada cuadro (llamado desde update) ---- */
function faseTick(dt) {
  reliqTick(dt);
  formaTick(dt);
  tesorosTick(dt);
  if (area != 6) return;
  const t = performance.now() / 1000;
  for (const n of ESPIRITUS) {
    const s = est(n),
      dx = p.x - n.x;
    if (Math.abs(dx) < 240) s.f = dx < 0 ? -1 : 1; // mira a Smara
    // el venado se sorprende al verla y la saluda solo
    if (n.k == 'venado' && !s.visto && dx > -190) {
      s.visto = true;
      s.sorpresa = t;
      sfx('parry');
      // Smara se detiene y el venado empieza a hablar después del susto
      state = 'globo';
      p.vx = 0;
      p.atk = null;
      PENDIENTE = { n, t: t + 0.8 };
    }
    if (n.k == 'conejo' && !s.visto && Math.abs(dx) < 120) {
      s.visto = true;
      s.sorpresa = t;
    }
    if (n.k == 'sombrero' && !s.visto && Math.abs(dx) < 150) {
      s.visto = true;
      s.hat = t; // se quita el sombrero al verla
    }
    // chispas de espíritu
    if (Math.abs(n.x - cam - W / 2) < W && Math.random() < dt * 2.2)
      pfx(n.x + rnd(-14, 14), GROUND - rnd(4, n.h * ESC_E), rnd(-5, 5), -rnd(8, 18), rnd(1, 1.8), 'rgba(232,250,240,.75)', 2, -3);
  }
  if (REGALO && t - REGALO.t > 3.2) REGALO = null;
}
function cercano() {
  let b = null;
  for (const n of ESPIRITUS) if (Math.abs(p.x - n.x) < 64 && (!b || Math.abs(p.x - n.x) < Math.abs(p.x - b.x))) b = n;
  return b;
}

/* ---- conversación con globos ---- */
function empezarCharla(n) {
  const s = est(n),
    L = s.dado ? n.otra.map(t => ['e', t]) : n.charla;
  CHARLA = { n, L, i: 0, c: 0, t0: performance.now() / 1000 };
  if (n.k == 'sombrero') s.hat = performance.now() / 1000;
  state = 'globo';
  p.vx = 0;
  p.atk = null;
  p.face = n.x < p.x ? -1 : 1;
}
function charlaCon(n, L) {
  CHARLA = { n, L, i: 0, c: 0, t0: performance.now() / 1000, desp: true };
  state = 'globo';
  p.vx = 0;
}
function charlaAvanza() {
  const C = CHARLA;
  if (!C) return;
  const full = C.L[C.i][1].length;
  if (C.c < full) {
    C.c = full;
    return;
  }
  C.i++;
  C.c = 0;
  if (C.i >= C.L.length) terminarCharla();
}
function terminarCharla() {
  const n = CHARLA.n,
    s = est(n),
    C0 = CHARLA;
  CHARLA = null;
  state = 'play';
  jumpReq = dashReq = atk1 = parryReq = false;
  if (!s.dado && n.k == 'oveja' && !C0.desp) {
    // la Oveja Negra no da un objeto: transforma a Smara (28b-forma-espiritu.js)
    s.dado = true;
    s.feliz = performance.now() / 1000;
    RELIQ.add(n.k);
    formaEmpezar(n);
    return;
  }
  if (!s.dado) {
    s.dado = true;
    s.feliz = performance.now() / 1000;
    RELIQ.add(n.k);
    REGALO = { n, t: performance.now() / 1000 };
    save();
    sfx('pick');
    flashW = 0.15;
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * 6.283;
      pfx(p.x, p.y - 40, Math.cos(a) * rnd(40, 120), Math.sin(a) * rnd(40, 120), rnd(0.4, 0.8), i % 2 ? '#fff6d8' : '#bff5e4', 2, 0);
    }
  }
}
function blip(f) {
  if (!AC || muted) return;
  const t = AC.currentTime,
    o = AC.createOscillator(),
    g = AC.createGain();
  o.type = 'square';
  o.frequency.value = f * (0.94 + Math.random() * 0.12);
  g.gain.setValueAtTime(0.022, t);
  g.gain.exponentialRampToValueAtTime(0.0008, t + 0.05);
  o.connect(g);
  g.connect(MG);
  o.start(t);
  o.stop(t + 0.06);
}
addEventListener('keydown', e => {
  if (e.repeat) return;
  if (state == 'globo' && ['KeyE', 'Space', 'Enter', 'KeyJ'].includes(e.code)) {
    e.preventDefault();
    charlaAvanza();
    if (state == 'play') jumpReq = dashReq = atk1 = false;
  } else if (state == 'play' && area == 6 && e.code == 'KeyE' && !TIEMPO.parado && !INV.open) {
    const n = cercano();
    if (n) empezarCharla(n);
  }
});
cv.addEventListener('mousedown', () => {
  if (state == 'globo') {
    charlaAvanza();
    atk1 = false;
  }
});
// el texto se escribe letra por letra (también cuando el juego está "pausado" en la charla)
function charlaTick(dt) {
  const C = CHARLA;
  if (!C) return;
  const L = C.L[C.i][1],
    c0 = Math.floor(C.c);
  C.c = Math.min(L.length, C.c + dt * 42);
  const c1 = Math.floor(C.c);
  if (c1 > c0 && c1 % 2 == 0 && L[c1 - 1] != ' ') blip(C.L[C.i][0] == 's' ? 560 : C.n.voz);
}

/* ---- dibujo de un espíritu, por piezas ---- */
function drawEspiritu(n, t) {
  const s = est(n),
    X = Math.round(n.x - cam);
  if (X < -60 || X > W + 60) return;
  const hablando = CHARLA && CHARLA.n === n && CHARLA.L[CHARLA.i][0] == 'e' && CHARLA.c < CHARLA.L[CHARLA.i][1].length;
  let Y = GROUND,
    sy = 1;
  // sorpresa: salto con estirón
  const tr = performance.now() / 1000, // tiempo real para los gestos (no depende del tiempo detenido)
    ts = tr - s.sorpresa;
  if (ts < 0.55) {
    const k = ts / 0.55;
    Y -= Math.round(Math.sin(k * Math.PI) * 14);
    sy = k < 0.15 ? 0.85 : k < 0.5 ? 1.1 : 0.92;
  }
  // feliz al regalar: dos saltitos
  const tf = tr - s.feliz;
  if (tf < 0.9) Y -= Math.round(Math.abs(Math.sin(tf * Math.PI * 2.2)) * 6);
  if (n.flota) Y -= 18 + Math.round(Math.sin(t * 1.8 + s.ph) * 3) * 2;
  // sombra
  ctx.fillStyle = 'rgba(20,30,30,' + (n.flota ? 0.18 : 0.3) + ')';
  ctx.beginPath();
  ctx.ellipse(X, GROUND + 1, n.w * 0.9, 3, 0, 0, 7);
  ctx.fill();
  // tiempos de cada gesto
  const resp = Math.sin(t * 2.4 + s.ph) > 0.55 ? 1 : 0; // respiración: la cabeza baja 1 pixel
  const habla = hablando ? (Math.floor(t * 7) % 2) : 0;
  if (!TIEMPO.parado) s.parpa -= 1 / 60;
  const ojosCerrados = s.parpa < 0.12 && s.parpa > 0;
  if (s.parpa <= 0) s.parpa = n.k == 'gatonegro' ? 4 + Math.random() * 3 : 2.5 + Math.random() * 3;
  const cola = Math.sin(t * (n.k == 'gatonegro' ? 2.2 : 3.6) + s.ph) > 0 ? 1 : 0;
  const oreja = (t + s.ph) % 3.4 < 0.22 && Math.floor((t + s.ph) * 18) % 2 ? 1 : 0;
  const th = tr - s.hat,
    sombrero = th < 1.1 ? (th < 0.15 || th > 0.95 ? -1 : -3) : 0;
  const borde = Math.floor(t * 4 + s.ph) % 2;
  ctx.save();
  ctx.translate(X, Y);
  ctx.scale(s.f, sy);
  if (n.flota) ctx.globalAlpha = 0.82 + Math.sin(t * 2.6) * 0.1;
  const ox = -Math.round(n.w / 2);
  for (const [px, py, pw, ph, tipo] of n.partes) {
    let dx = 0,
      dy = 0;
    if (tipo == 'cabeza' || tipo == 'orejas' || tipo == 'sombrero') dy = resp + habla;
    if (tipo == 'orejas') dx = oreja;
    if (tipo == 'sombrero') dy += sombrero;
    if (tipo == 'cola') dx = n.k == 'gatonegro' ? cola : -cola;
    if (tipo == 'borde') dx = borde ? 1 : 0;
    if (tipo == 'maletin') dy = 0;
    ctx.drawImage(img.esp, n.sx + px, py, pw, ph, (ox + px + dx) * ESC_E, (py - n.h + dy) * ESC_E, pw * ESC_E, ph * ESC_E);
  }
  if (ojosCerrados)
    for (const [ex, ey, c] of n.ojos) {
      ctx.fillStyle = c;
      ctx.fillRect((ox + ex) * ESC_E, (ey - n.h + resp + habla) * ESC_E, ESC_E, ESC_E);
    }
  ctx.restore();
  ctx.globalAlpha = 1;
  // emotes y aviso de "E"
  const top = Y - n.h * ESC_E - 8;
  if (ts < 1.4) emote('!', X, top - 6);
  else if (n.k == 'fantasma' && !s.dado && Math.abs(p.x - n.x) < 150 && !CHARLA) emote('?', X, top - 4);
  else if (tf < 1.6) emote('<3', X, top - 6 - tf * 6);
  if (state == 'play' && cercano() === n) {
    const b = Math.round(Math.sin(t * 5) * 1.5);
    ctx.fillStyle = C_OSCURO;
    ctx.fillRect(X - 6, top - 12 + b, 12, 12);
    ctx.fillStyle = '#f4efe6';
    ctx.fillRect(X - 5, top - 11 + b, 10, 10);
    ctx.fillStyle = C_OSCURO;
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText('E', X + 0.5, top - 2 + b);
    ctx.textAlign = 'left';
  }
}
// emotes en pixel: ! ? y corazón
const EMO = {
  '!': ['.##.', '.##.', '.##.', '.##.', '....', '.##.'],
  '?': ['.###.', '#...#', '...#.', '..#..', '.....', '..#..'],
  '<3': ['.#.#.', '#####', '#####', '.###.', '..#..'],
};
function emote(k, x, y) {
  const m = EMO[k],
    w = m[0].length,
    Y = Math.round(y - m.length * 2);
  ctx.fillStyle = C_OSCURO;
  for (let j = -1; j <= m.length; j++)
    for (let i = -1; i <= w; i++) {
      const on = (a, b) => m[b] && m[b][a] == '#';
      if (!on(i, j) && (on(i - 1, j) || on(i + 1, j) || on(i, j - 1) || on(i, j + 1))) ctx.fillRect(Math.round(x - w) + i * 2, Y + j * 2, 2, 2);
    }
  ctx.fillStyle = k == '<3' ? '#e86a7a' : '#fff6d8';
  for (let j = 0; j < m.length; j++) for (let i = 0; i < w; i++) if (m[j][i] == '#') ctx.fillRect(Math.round(x - w) + i * 2, Y + j * 2, 2, 2);
}

/* ---- globos de texto ---- */
function partir(txt, max) {
  const out = [];
  let l = '';
  for (const w of txt.split(' ')) {
    const tl = l ? l + ' ' + w : w;
    if (ctx.measureText(tl).width > max && l) {
      out.push(l);
      l = w;
    } else l = tl;
  }
  if (l) out.push(l);
  return out;
}
function globo(x, yTop, quien, txt, visible, esSmara) {
  ctx.font = '8px ' + PS;
  const max = 196,
    lines = partir(txt, max),
    lh = 11,
    wMax = Math.max(...lines.map(l => ctx.measureText(l).width), ctx.measureText(quien).width * 0.85),
    bw = Math.round(wMax) + 16,
    bh = lines.length * lh + 24;
  let bx = Math.round(x - bw / 2);
  bx = Math.max(6, Math.min(W - 6 - bw, bx));
  const by = Math.max(46, Math.round(yTop - bh - 10));
  // sombra, borde y relleno en pasos de pixel
  ctx.fillStyle = 'rgba(10,20,20,.35)';
  ctx.fillRect(bx + 3, by + 3, bw, bh);
  ctx.fillStyle = C_OSCURO;
  ctx.fillRect(bx + 2, by, bw - 4, bh);
  ctx.fillRect(bx, by + 2, bw, bh - 4);
  ctx.fillStyle = esSmara ? '#fdf8f2' : '#efe9de';
  ctx.fillRect(bx + 2, by + 2, bw - 4, bh - 4);
  // colita hacia quien habla
  const tx = Math.max(bx + 8, Math.min(bx + bw - 14, Math.round(x - 3)));
  ctx.fillStyle = C_OSCURO;
  ctx.fillRect(tx - 2, by + bh - 2, 10, 2);
  ctx.fillRect(tx, by + bh, 6, 2);
  ctx.fillRect(tx + 2, by + bh + 2, 2, 4);
  ctx.fillStyle = esSmara ? '#fdf8f2' : '#efe9de';
  ctx.fillRect(tx, by + bh - 2, 6, 2);
  ctx.fillRect(tx + 2, by + bh, 2, 2);
  // nombre y texto
  ctx.textAlign = 'left';
  ctx.font = '7px ' + PS;
  ctx.fillStyle = esSmara ? '#9a5a6a' : '#5b7a6c';
  ctx.fillText(quien, bx + 8, by + 12);
  ctx.font = '8px ' + PS;
  ctx.fillStyle = C_OSCURO;
  let left = visible;
  lines.forEach((l, i) => {
    if (left <= 0) return;
    ctx.fillText(l.slice(0, left), bx + 8, by + 24 + i * lh);
    left -= l.length + 1;
  });
  if (visible >= txt.length && Math.floor(performance.now() / 350) % 2) {
    ctx.fillStyle = C_OSCURO;
    ctx.fillRect(bx + bw - 12, by + bh - 9, 6, 2);
    ctx.fillRect(bx + bw - 11, by + bh - 7, 4, 2);
    ctx.fillRect(bx + bw - 10, by + bh - 5, 2, 2);
  }
}
let charlaUlt = performance.now();
function drawCharla() {
  const now = performance.now();
  charlaTick(Math.min(0.05, (now - charlaUlt) / 1000));
  charlaUlt = now;
  if (PENDIENTE && now / 1000 >= PENDIENTE.t) {
    const n = PENDIENTE.n;
    PENDIENTE = null;
    empezarCharla(n);
  }
  const C = CHARLA;
  if (!C) return;
  const [q, txt] = C.L[C.i];
  if (q == 's') globo(p.x - cam, p.y - 92, 'Smara', txt, Math.floor(C.c), true);
  else {
    const n = C.n;
    globo(n.x - cam, GROUND - n.h * ESC_E - (n.flota ? 18 : 0), n.nm, txt, Math.floor(C.c), false);
  }
}

/* ---- reliquias en el HUD y cartel de regalo ---- */
function drawReliquias(t) {
  let x = 8;
  for (const n of ESPIRITUS) {
    if (!RELIQ.has(n.k)) continue;
    const ch = Math.min(n.cabH, 12),
      cw = Math.min(n.w, 18);
    ctx.fillStyle = 'rgba(16,24,26,.55)';
    ctx.fillRect(x, 32, cw + 4, ch + 4);
    ctx.drawImage(img.esp, n.sx + Math.max(0, Math.floor((n.w - cw) / 2)), n.k == 'sombrero' ? 4 : 0, cw, ch, x + 2, 34, cw, ch);
    x += cw + 7;
  }
  const R = REGALO;
  if (!R) return;
  const k = performance.now() / 1000 - R.t,
    a = Math.min(1, k * 4, (3.2 - k) * 2);
  ctx.globalAlpha = Math.max(0, a);
  ctx.font = '8px ' + PS;
  const t1 = 'RECIBISTE: ' + R.n.reliq.n.toUpperCase(),
    t2 = R.n.reliq.d,
    bw = Math.max(ctx.measureText(t1).width, ctx.measureText(t2).width * 0.9) + 60,
    bx = Math.round(W / 2 - bw / 2),
    by = 56 - Math.round((1 - Math.min(1, k * 3)) * 10);
  ctx.fillStyle = C_OSCURO;
  ctx.fillRect(bx, by, bw, 38);
  ctx.fillStyle = '#efe9de';
  ctx.fillRect(bx + 2, by + 2, bw - 4, 34);
  const n = R.n,
    ch = Math.min(n.cabH, 13);
  const sc = n.w * 2 <= 36 && ch * 2 <= 28 ? 2 : 1;
  ctx.drawImage(img.esp, n.sx, n.k == 'sombrero' ? 4 : 0, n.w, ch, bx + 8, by + 5 + Math.round(Math.sin(t * 6)), n.w * sc, ch * sc);
  ctx.fillStyle = '#5b7a6c';
  ctx.fillText(t1, bx + 46, by + 16);
  ctx.font = '7px ' + PS;
  ctx.fillStyle = C_OSCURO;
  ctx.fillText(t2, bx + 46, by + 29);
  ctx.globalAlpha = 1;
}

/* ---- guardar el avance de la fase en la partida (reliquias, espíritus, tesoros, transformación) ---- */
function faseGuardar() {
  return {
    r: [...RELIQ],
    d: ESPIRITUS.filter(n => est(n).dado).map(n => n.k),
    v: ESPIRITUS.filter(n => est(n).visto).map(n => n.k),
    t: [...TES],
    f: FORMA.on ? 1 : 0,
  };
}
function faseCargar(d) {
  if (!d || typeof d != 'object') return;
  faseReset();
  const esp = ESPIRITUS.map(n => n.k),
    tes = TESOROS.map(q => q.k),
    lista = (v, ok) => (Array.isArray(v) ? v.filter(k => ok.includes(k)) : []);
  lista(d.r, esp).forEach(k => RELIQ.add(k));
  for (const n of ESPIRITUS) {
    const s = est(n);
    if (lista(d.d, esp).includes(n.k)) s.dado = true;
    if (lista(d.v, esp).includes(n.k)) s.visto = true;
  }
  lista(d.t, tes).forEach(k => TES.add(k));
  if (d.f) formaActivar();
  if (area == 6) tesorosCargar();
}
// partida nueva: la fase empieza de cero
const initFase = init;
init = function () {
  initFase();
  faseReset();
};

/* ---------- 28-zona-nubes.js ---------- */
/* Archivo vacío: el área 6 ahora es el Bosque de la Niebla (27-nueva-fase.js y siguientes).
   Puedes borrar este archivo sin problema. */

/* ---------- 28b-forma-espiritu.js ---------- */
/* ===== SMARA ESPÍRITU (la transformación que da la Oveja Negra) =====
   Diseño propio, hecho sobre el mismo sprite de Smara (mide igual y usa sus mismas
   animaciones de caminar, correr, saltar y atacar, recicladas):
   - cabello blanco con bordes negros, ojos normales (los mismos de Smara)
   - vestido al estilo clásico de los espíritus animales: sepia oscuro con cuello, botones,
     cinta y ruedo color crema
   - katana guardada en la espalda (se ve la funda y el mango); la hoja brilla al atacar
   - PODER: clic izquierdo = detiene el tiempo 2.5 s (recarga 10 s) (todo se congela menos Smara).
     Un relojito arriba a la derecha muestra el tiempo detenido y la recarga.
   - transformación: anillo de esporas, silueta blanca, destello, y saca la katana de la espalda */

const FORMA = {
  on: false,
  c: null, // hoja de sprites recoloreada
  g: null, // capa de brillo (marcas del kimono, ojos, hoja)
  base: null, // HRC original para volver a Smara
  tr: null, // transformación en curso
  fuerza: null, // cuadro forzado durante la cinemática
  blanco: 0, // silueta blanca (0..1)
  desenv: 0, // sacando la katana (0..1)
  ultAtk: null,
};

/* ---- 1) recoloreo del sprite (una sola vez) ---- */
function formaPreparar() {
  if (FORMA.c) return;
  if (!HCLS) lookPrep();
  const im = img.hr,
    w = im.width,
    h = im.height,
    d = HSRC;
  const mk = () => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  };
  FORMA.c = mk();
  FORMA.g = mk();
  const x = FORMA.c.getContext('2d'),
    gx = FORMA.g.getContext('2d'),
    out = x.createImageData(w, h),
    o = out.data,
    gl = gx.createImageData(w, h),
    G = gl.data;
  o.set(d);
  const put = (i, c, k) => {
    o[i * 4] = Math.min(255, c[0] * k);
    o[i * 4 + 1] = Math.min(255, c[1] * k);
    o[i * 4 + 2] = Math.min(255, c[2] * k);
  };
  const brilla = (i, c, a) => {
    G[i * 4] = c[0];
    G[i * 4 + 1] = c[1];
    G[i * 4 + 2] = c[2];
    G[i * 4 + 3] = a;
  };
  const PELO = [238, 241, 247],
    PELO_B = [16, 14, 22],
    SEPIA = [44, 38, 33],
    SEPIA_S = [30, 26, 22],
    CREMA = [216, 210, 207],
    CREMA_S = [188, 180, 174],
    HOJA = [206, 236, 252],
    ZAPATO = [30, 26, 22],
    CIAN = [140, 246, 255];
  const CW = SM.cw,
    CH = SM.ch,
    cols = SM.cols,
    rows = Math.floor(h / CH);
  for (let fi = 0; fi < cols * rows; fi++) {
    const a = HANC[fi],
      X0 = (fi % cols) * CW,
      Y0 = Math.floor(fi / cols) * CH;
    if (!a) continue;
    const hx = a.ok ? a.hx : 56,
      ht = a.ok ? a.ht : 40,
      ct = a.ok ? a.ct : 60,
      foot = a.ok ? a.foot : 95;
    // separar el vestido (cerca del cuerpo) de la hoja de la katana y los efectos (lejos del cuerpo)
    const comp = new Int32Array(CW * CH).fill(-1),
      esHoja = [];
    let nc = 0;
    for (let y = 0; y < CH; y++)
      for (let xx = 0; xx < CW; xx++) {
        const i = (Y0 + y) * w + X0 + xx;
        if (HCLS[i] != 3 || comp[y * CW + xx] >= 0) continue;
        const pila = [[xx, y]];
        comp[y * CW + xx] = nc;
        let n = 0,
          dentro = 0;
        while (pila.length) {
          const [cx, cy] = pila.pop();
          n++;
          if (Math.abs(cx - hx) <= 15 && cy >= ht + 8 && cy <= foot) dentro++;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nx = cx + dx,
              ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= CW || ny >= CH || comp[ny * CW + nx] >= 0) continue;
            if (HCLS[(Y0 + ny) * w + X0 + nx] != 3) continue;
            comp[ny * CW + nx] = nc;
            pila.push([nx, ny]);
          }
        }
        esHoja[nc++] = dentro / n < 0.5;
      }
    // zona de la cara (piel entre el pelo y el pecho): ahí los pixeles negros son los ojos
    let fx0 = CW,
      fx1 = -1,
      fy0 = CH,
      fy1 = -1;
    if (a.ok)
      for (let y = ht; y < ct; y++)
        for (let xx = 0; xx < CW; xx++)
          if (HCLS[(Y0 + y) * w + X0 + xx] == 2) {
            fx0 = Math.min(fx0, xx);
            fx1 = Math.max(fx1, xx);
            fy0 = Math.min(fy0, y);
            fy1 = Math.max(fy1, y);
          }
    const piel = (xx, y) => xx >= 0 && xx < CW && HCLS[(Y0 + y) * w + X0 + xx] == 2;
    const esOjo = (xx, y) => {
      if (xx <= fx0 || xx >= fx1 || y <= fy0 || y >= fy1) return false;
      let L = false,
        R = false;
      for (let k = 1; k <= 4; k++) {
        if (piel(xx - k, y)) L = true;
        if (piel(xx + k, y)) R = true;
      }
      return L && R;
    };
    for (let y = 0; y < CH; y++)
      for (let xx = 0; xx < CW; xx++) {
        const i = (Y0 + y) * w + X0 + xx,
          k = HCLS[i];
        if (!k) continue;
        const l = (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3;
        if ((k == 1 || k == 5) && esOjo(xx, y)) continue; // ojos: se quedan como los dibujó Smara
        if (k == 1) {
          const borde = HCLS[i - 1] != 1 || HCLS[i + 1] != 1 || HCLS[i - w] != 1 || HCLS[i + w] != 1,
            dy = y - ht;
          put(i, borde ? PELO_B : PELO, borde ? 1 : (1.02 - Math.min(0.2, dy / 120)) * ((xx + (dy >> 2)) % 3 == 0 ? 0.9 : 1));
        } // la piel se queda con su color normal, para que la cara se distinga del pelo blanco
        else if ((k == 3 || k == 4 || k == 6) && a.ok && y >= ht && y < ct - 2 && Math.abs(xx - hx) <= 24) {
          // dentro de la cabeza: cerca de la cara son los ojos (se dejan como los dibujó Smara: normales);
          // más afuera son mechones de pelo (blancos)
          if (Math.abs(xx - hx) > 10) put(i, PELO, 1);
        }
        else if (k == 3) {
          if (esHoja[comp[y * CW + xx]]) {
            put(i, HOJA, Math.min(1.05, l / 235));
            brilla(i, CIAN, 120);
          } else {
            // vestido al estilo clásico de los espíritus animales: sepia oscuro con detalles crema
            const dxc = xx - hx,
              cinta = a.ok && (y == ct + 8 || y == ct + 9),
              cuello = a.ok && y < ct - 1 && Math.abs(dxc) <= 4,
              boton = a.ok && y > ct && y < ct + 8 && Math.abs(dxc) <= 0 && (y - ct) % 3 == 1,
              ruedo = HCLS[i + w] != 3 && y > ct + 10;
            if (cuello) put(i, CREMA, 1);
            else if (cinta) put(i, CREMA_S, 1);
            else if (boton) put(i, CREMA, 1);
            else if (ruedo) put(i, CREMA_S, 1);
            else put(i, l < 205 ? SEPIA_S : SEPIA, 1);
          }
        } else if (k == 4) put(i, ZAPATO, Math.min(1.1, l / 230));
      }
  }
  x.putImageData(out, 0, 0);
  gx.putImageData(gl, 0, 0);
}
function formaActivar() {
  formaPreparar();
  if (FORMA.on) return;
  FORMA.base = HRC;
  HRC = FORMA.c;
  FORMA.on = true;
}
function formaQuitar() {
  if (!FORMA.on) return;
  HRC = FORMA.base;
  FORMA.on = false;
  tiempoReanudar();
}

/* ---- 2) dibujo extra encima y debajo del sprite (en el espacio del cuadro) ---- */
const ES_ATAQUE = fi => fi >= HI.Downward_Slash_01 && fi <= HI.Regular_Slash_07;
function linea(x0, y0, x1, y1, g, col) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 1.5));
  ctx.fillStyle = col;
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    ctx.fillRect(Math.round(x0 + (x1 - x0) * t), Math.round(y0 + (y1 - y0) * t), g, g);
  }
}
function anclas(fi) {
  const a = HANC[fi];
  const ok = a && a.ok;
  return {
    hx: (ok ? a.hx : 56) - SM.ax,
    ht: (ok ? a.ht : 40) - SM.ay,
    ct: (ok ? a.ct : 62) - SM.ay,
    foot: (ok ? a.foot : 95) - SM.ay,
  };
}
// funda y mango en la espalda (el sprite mira a la derecha: la espalda es la izquierda).
// La funda va detrás del cuerpo; el mango asoma por encima del hombro, delante del pelo.
function vainaGeo(fi) {
  const A = anclas(fi),
    boca = [A.hx - 8, A.ht + 17],
    punta = [A.hx - 2, A.ct + 27],
    L = Math.hypot(boca[0] - punta[0], boca[1] - punta[1]);
  return { boca, punta, d: [(boca[0] - punta[0]) / L, (boca[1] - punta[1]) / L] };
}
function vainaAtras(fi) {
  const { boca, punta } = vainaGeo(fi);
  linea(punta[0], punta[1], boca[0], boca[1], 2, '#151622');
  linea(punta[0] - 1, punta[1], boca[0] - 1, boca[1], 1, '#3a3f58');
}
function vainaDelante(fi) {
  const { boca, d } = vainaGeo(fi),
    s = FORMA.desenv * 30,
    m0 = [boca[0] + d[0] * s, boca[1] + d[1] * s];
  if (s > 0) {
    // la hoja que va saliendo de la funda
    linea(boca[0], boca[1], m0[0], m0[1], 1, '#d6f2ff');
    linea(boca[0] + 1, boca[1], m0[0] + 1, m0[1], 1, '#7ff0ff');
  }
  ctx.fillStyle = '#8ff6ff';
  ctx.fillRect(Math.round(m0[0]) - 1, Math.round(m0[1]), 3, 2); // tsuba
  linea(m0[0] + d[0] * 2, m0[1] + d[1] * 2, m0[0] + d[0] * 11, m0[1] + d[1] * 11, 2, '#262838');
  for (let k = 3; k <= 10; k += 3) {
    ctx.fillStyle = '#5fd3e0';
    ctx.fillRect(Math.round(m0[0] + d[0] * k), Math.round(m0[1] + d[1] * k), 1, 1);
  }
  ctx.fillStyle = '#9fb6c4';
  ctx.fillRect(Math.round(m0[0] + d[0] * 12), Math.round(m0[1] + d[1] * 12), 2, 2); // remate del mango
}
// envolver hdraw: aura y funda detrás, brillos delante
const hdrawBase = hdraw;
hdraw = function (fi) {
  if (!FORMA.on && !FORMA.blanco) return hdrawBase(fi);
  const t = performance.now() / 1000,
    atq = ES_ATAQUE(fi);
  if (FORMA.on) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.18 + 0.06 * Math.sin(t * 2);
    const A = anclas(fi);
    ctx.drawImage(halo('cian'), A.hx - 30, A.ct - 34, 60, 60);
    ctx.restore();
    vainaAtras(fi);
  }
  hdrawBase(fi);
  if (FORMA.on && !atq) vainaDelante(fi);
  const sx = (fi % SM.cols) * SM.cw,
    sy = Math.floor(fi / SM.cols) * SM.ch;
  if (FORMA.on) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.55 + 0.35 * Math.sin(t * 2.6);
    ctx.drawImage(FORMA.g, sx, sy, SM.cw, SM.ch, -SM.ax, -SM.ay, SM.cw, SM.ch);
    ctx.restore();
  }
  if (FORMA.blanco > 0) {
    ctx.globalAlpha = Math.min(1, FORMA.blanco);
    ctx.drawImage(fimg(HRC || img.hr, 'brightness(0) invert(1)'), sx, sy, SM.cw, SM.ch, -SM.ax, -SM.ay, SM.cw, SM.ch);
    ctx.globalAlpha = 1;
  }
};
// cuadro forzado en la cinemática
const curAnimBase = curAnim;
curAnim = function () {
  return FORMA.fuerza != null ? wf(FORMA.fuerza) : curAnimBase();
};

/* ---- 3) PODER: detener el tiempo (clic izquierdo) ---- */
const TIEMPO = {
  base: 2.5, // segundos con el tiempo detenido (la Corona de Sacuanjoche suma 0.5)
  dura: 2.5,
  recarga: 10, // segundos para volver a usarlo
  parado: false,
  t0: 0, // cuándo empezó
  listo: 0, // cuándo se puede volver a usar
  pausa: 0, // tiempo total congelado (el mundo "se atrasa" esto)
  onda: -9,
};
// reloj del mundo: no avanza mientras el tiempo está detenido
function tMundo() {
  const now = performance.now() / 1000;
  return now - TIEMPO.pausa - (TIEMPO.parado ? now - TIEMPO.t0 : 0);
}
function tiempoDetener() {
  const now = performance.now() / 1000;
  if (TIEMPO.parado || now < TIEMPO.listo) return;
  TIEMPO.parado = true;
  TIEMPO.dura = TIEMPO.base + (equipado('sacuanjoche') ? 0.5 : 0);
  TIEMPO.t0 = now;
  TIEMPO.onda = now;
  SHK = Math.max(SHK, 2);
  sonidoTiempo(true);
}
function tiempoReanudar() {
  if (!TIEMPO.parado) return;
  const now = performance.now() / 1000;
  TIEMPO.pausa += now - TIEMPO.t0;
  TIEMPO.parado = false;
  TIEMPO.listo = now + TIEMPO.recarga;
  sonidoTiempo(false);
}
function sonidoTiempo(para) {
  if (!AC || muted) return;
  const t = AC.currentTime,
    o = AC.createOscillator(),
    g = AC.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(para ? 880 : 140, t);
  o.frequency.exponentialRampToValueAtTime(para ? 110 : 900, t + 0.45);
  g.gain.setValueAtTime(0.12, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  o.connect(g);
  g.connect(MG);
  o.start(t);
  o.stop(t + 0.55);
}
cv.addEventListener('mousedown', e => {
  if (!FORMA.on || state != 'play' || INV.open || e.button !== 0) return;
  atk1 = false; // en esta forma el clic no ataca: detiene el tiempo
  tiempoDetener();
});
// partículas congeladas (los cortes de Smara sí siguen)
const updPFXBase = updPFX;
updPFX = function (dt) {
  if (!TIEMPO.parado) return updPFXBase(dt);
  for (let i = SLS.length - 1; i >= 0; i--) {
    SLS[i].t += dt;
    if (SLS[i].t > 0.22) SLS.splice(i, 1);
  }
  SHK = Math.max(0, SHK - dt * 18);
};
// mientras el tiempo está detenido, los enemigos y sus disparos no se mueven
const updEnemiesBase = updEnemies;
updEnemies = function (dt) {
  if (TIEMPO.parado) return;
  return updEnemiesBase(dt);
};
function formaTick(dt) {
  if (TIEMPO.parado) {
    const now = performance.now() / 1000;
    if (Math.floor((now - TIEMPO.t0) * 4) != Math.floor((now - TIEMPO.t0 - dt) * 4)) blip(1400); // tic tac
    if (now - TIEMPO.t0 >= TIEMPO.dura) tiempoReanudar();
  }
  if (!FORMA.on) return;
  ataquesTick(dt);
}
/* ---- 3b) más variedad en los ataques de Smara Espíritu ----
   - cayendo: PICADA (baja en picada con la estocada y al caer suelta una onda que hace daño)
   - saltando (mientras sube): CORTE ASCENDENTE (corta hacia arriba y sube un poco más)
   - corriendo: ESTOCADA (se lanza hacia adelante dejando imágenes de sí misma)
   - en el suelo: el combo de 3 golpes, cada golpe con su propio efecto (luna, pétalos, chispa) */
const ATQ = { tipo: null, t: 0, cayo: false };
function esporas(n, x, y, vx, vy, cols, g) {
  for (let i = 0; i < n; i++)
    pfx(x + rnd(-6, 6), y + rnd(-6, 6), vx * rnd(0.4, 1.2) + rnd(-30, 30), vy * rnd(0.4, 1.2) + rnd(-30, 30), rnd(0.3, 0.7), cols[i % cols.length], 2, g || 0);
}
function ataquesTick(dt) {
  const a = p.atk;
  if (a && a !== FORMA.ultAtk) {
    // ataque nuevo: decidir qué variante es
    ATQ.t = 0;
    ATQ.cayo = false;
    if (!p.on && p.vy < -60) {
      ATQ.tipo = 'ascendente'; // atacar mientras sube: corte hacia arriba que la impulsa un poco más
      a.c = 1;
      p.vy = Math.min(p.vy, -340);
    } else if (!p.on) {
      ATQ.tipo = 'picada'; // atacar mientras cae: baja en picada
      a.c = 2;
      p.vy = 680;
      blip(180);
    } else if (p.run && Math.abs(p.vx) > 180) {
      ATQ.tipo = 'estocada';
      a.c = 2;
    } else ATQ.tipo = 'combo' + a.c;
    const fx = p.x + p.face * 30,
      fy = p.y - 34;
    if (ATQ.tipo == 'combo0') esporas(10, fx, fy, p.face * 120, -40, ['#8ff6ff', '#d6f2ff'], 40); // luna creciente
    if (ATQ.tipo == 'combo1') esporas(14, fx, fy - 10, p.face * 60, 40, ['#fff4d6', '#f2c230', '#ffffff'], 120); // pétalos de sacuanjoche
    if (ATQ.tipo == 'combo2') {
      esporas(18, fx + p.face * 14, fy, p.face * 220, 0, ['#ffffff', '#8ff6ff'], 0); // chispa de la estocada
      SHK = Math.max(SHK, 2);
    }
    if (ATQ.tipo == 'ascendente') esporas(16, p.x + p.face * 18, p.y - 20, p.face * 40, -180, ['#8ff6ff', '#ecc2ff'], 0);
  }
  FORMA.ultAtk = a;
  if (!a) {
    ATQ.tipo = null;
    return;
  }
  ATQ.t += dt;
  if (ATQ.tipo == 'picada') {
    if (!p.on) {
      p.vy = Math.max(p.vy, 680);
      a.t = Math.min(a.t, ATK[2].h + 0.02); // mantiene la pose de estocada mientras cae
      if (Math.random() < 0.6) pfx(p.x + rnd(-6, 6), p.y - rnd(20, 50), 0, -120, 0.25, '#8ff6ff', 2, 0);
    } else if (!ATQ.cayo) {
      ATQ.cayo = true;
      // onda al caer: daña a lo que esté cerca
      SHK = Math.max(SHK, 4);
      sfx('boom');
      for (let i = 0; i < 26; i++) {
        const s = (i % 2 ? 1 : -1) * rnd(60, 260);
        pfx(p.x, p.y - 2, s, -rnd(20, 120), rnd(0.3, 0.6), i % 3 ? '#8ff6ff' : '#ffffff', 2, 300);
      }
      SLS.push({ t: 0.05, hit: 1, x: p.x, y: p.y - 10 });
      for (const e of enemies) if (!e.dying && Math.abs(e.x - p.x) < 90 && Math.abs(ecy(e) - p.y) < 70) dmgE(e, Math.round(sdmg(a) * 1.3));
    }
  } else if (ATQ.tipo == 'estocada' && ATQ.t < 0.16) {
    p.x += p.face * 760 * dt;
    if (Math.floor(ATQ.t * 60) % 2 == 0) p.ghosts.push({ x: p.x, y: p.y, f: p.face, a: 0.35, s: curAnim() });
  } else if (ATQ.tipo == 'ascendente' && ATQ.t < 0.25 && Math.random() < 0.7)
    pfx(p.x + p.face * rnd(10, 30), p.y - rnd(30, 70), p.face * 30, -rnd(60, 140), 0.3, '#ecc2ff', 2, 0);
}
// mundo en gris mientras el tiempo está detenido (Smara se dibuja después y queda a color)
function tiempoVelo() {
  if (!TIEMPO.parado) return;
  const k = Math.min(1, (performance.now() / 1000 - TIEMPO.t0) / 0.15);
  ctx.save();
  ctx.globalCompositeOperation = 'saturation';
  ctx.globalAlpha = k;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = 0.35 * k;
  ctx.fillStyle = '#7a86b8';
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
// onda que se expande desde Smara al detener el tiempo
function tiempoOnda() {
  const k = (performance.now() / 1000 - TIEMPO.onda) / 0.45;
  if (k < 0 || k > 1) return;
  ctx.save();
  ctx.globalCompositeOperation = 'difference';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * (1 - k) + 2;
  ctx.beginPath();
  ctx.arc(p.x - cam, p.y - 30, 20 + k * 520, 0, 7);
  ctx.stroke();
  ctx.restore();
}
// relojito en pixel (arriba a la derecha)
function dibujarReloj() {
  if (!FORMA.on) return;
  const now = performance.now() / 1000,
    cx = W - 26,
    cy = 56,
    R = 11;
  let frac, col;
  if (TIEMPO.parado) {
    frac = 1 - (now - TIEMPO.t0) / TIEMPO.dura; // lo que queda de tiempo detenido
    col = '#8ff6ff';
  } else if (now < TIEMPO.listo) {
    frac = 1 - (TIEMPO.listo - now) / TIEMPO.recarga; // recargando
    col = '#5b6684';
  } else {
    frac = 1;
    col = '#d6f2ff';
  }
  const listo = !TIEMPO.parado && now >= TIEMPO.listo;
  ctx.save();
  if (listo) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.25 + 0.15 * Math.sin(now * 4);
    ctx.drawImage(halo('cian'), cx - 20, cy - 20, 40, 40);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  // caja y esfera
  ctx.fillStyle = '#10121c';
  for (let y = -R - 1; y <= R + 1; y++) {
    const r = Math.round(Math.sqrt(Math.max(0, (R + 1) ** 2 - y * y)));
    ctx.fillRect(cx - r, cy + y, r * 2 + 1, 1);
  }
  ctx.fillStyle = '#e8ecf4';
  for (let y = -R + 1; y <= R - 1; y++) {
    const r = Math.round(Math.sqrt(Math.max(0, (R - 1) ** 2 - y * y)));
    ctx.fillRect(cx - r, cy + y, r * 2 + 1, 1);
  }
  // porción: tiempo restante o recarga (pixel a pixel)
  ctx.fillStyle = col;
  for (let y = -R + 2; y <= R - 2; y++)
    for (let x = -R + 2; x <= R - 2; x++) {
      if (x * x + y * y > (R - 2) ** 2) continue;
      const a = (Math.atan2(x, -y) / (Math.PI * 2) + 1) % 1;
      if (a <= frac) ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  // marcas de las horas y manecilla
  ctx.fillStyle = '#10121c';
  for (let h = 0; h < 12; h += 3) {
    const a = (h / 12) * Math.PI * 2;
    ctx.fillRect(Math.round(cx + Math.sin(a) * (R - 2)), Math.round(cy - Math.cos(a) * (R - 2)), 1, 1);
  }
  const ang = TIEMPO.parado ? (TIEMPO.t0 % 1) * 6.28 : now * 2;
  for (let k = 0; k < R - 3; k++) ctx.fillRect(Math.round(cx + Math.sin(ang) * k), Math.round(cy - Math.cos(ang) * k), 1, 1);
  ctx.fillRect(cx - 1, cy - R - 3, 3, 2); // botón de arriba
  ctx.font = '6px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillStyle = listo ? '#d6f2ff' : '#8a93ad';
  ctx.fillText(TIEMPO.parado ? (TIEMPO.dura - (now - TIEMPO.t0)).toFixed(1) : listo ? 'CLIC' : Math.ceil(TIEMPO.listo - now) + 's', cx, cy + R + 10);
  ctx.textAlign = 'left';
  ctx.restore();
}

/* ---- 4) la transformación ---- */
function formaEmpezar(n) {
  formaPreparar();
  FORMA.tr = { n, t0: performance.now() / 1000, fase: 0 };
  state = 'transf';
  p.vx = 0;
  p.atk = null;
}
function formaCine() {
  const T = FORMA.tr;
  if (!T) return;
  const t = performance.now() / 1000,
    k = t - T.t0;
  // anillo de esporas que sube
  if (k < 1.7)
    for (let i = 0; i < 3; i++) {
      const a = Math.random() * 6.283;
      pfx(p.x + Math.cos(a) * 26, p.y - 4 + Math.sin(a) * 4, -Math.cos(a) * 8, -rnd(30, 70), rnd(0.6, 1), ['#8ff6ff', '#b6ffd9', '#ecc2ff'][i], 2, -10);
    }
  if (k < 1.6) {
    FORMA.fuerza = HI.idle_0;
    FORMA.blanco = Math.max(0, (k - 0.5) / 1.1) * (0.75 + 0.25 * Math.sin(k * 22));
  } else if (T.fase == 0) {
    T.fase = 1;
    formaActivar();
    flashW = 1.2;
    SHK = Math.max(SHK, 4);
    sfx('boom');
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * 6.283;
      pfx(p.x, p.y - 34, Math.cos(a) * rnd(60, 200), Math.sin(a) * rnd(60, 200), rnd(0.5, 1), i % 2 ? '#8ff6ff' : '#ffffff', 2, 0);
    }
  }
  if (k >= 1.6 && k < 2.4) {
    FORMA.fuerza = HI.kneel;
    FORMA.blanco = Math.max(0, 1 - (k - 1.6) / 0.6);
  } else if (k >= 2.4 && k < 3.2) {
    // saca la katana de la espalda
    FORMA.blanco = 0;
    FORMA.fuerza = HI.idle_0;
    FORMA.desenv = Math.min(1, (k - 2.4) / 0.7);
    if (T.fase == 1 && k > 2.45) {
      T.fase = 2;
      sfx('swing');
    }
  } else if (k >= 3.2 && k < 3.75) {
    // corte de presentación con la hoja que brilla
    FORMA.desenv = 0;
    const A = ATK[0];
    FORMA.fuerza = A.f + Math.min(A.n - 1, Math.floor((k - 3.2) / 0.075));
    if (T.fase == 2) {
      T.fase = 3;
      SLS.push({ t: 0, c: 0, f: p.face });
      sfx('swing');
      for (let i = 0; i < 14; i++)
        pfx(p.x + p.face * rnd(10, 50), p.y - rnd(20, 56), p.face * rnd(40, 140), -rnd(10, 60), rnd(0.4, 0.8), '#8ff6ff', 2, 40);
    }
  } else if (k >= 3.75 && k < 4.4) FORMA.fuerza = VIC + Math.min(6, Math.floor((k - 3.75) / 0.09));
  else if (k >= 4.4) {
    FORMA.fuerza = null;
    FORMA.tr = null;
    state = 'play';
    REGALO = { n: T.n, t };
    save();
    sfx('pick');
    say('Clic: detener el tiempo 2.5 s · J/K: katana (subiendo: corte ascendente · cayendo: picada · corriendo: estocada)');
    if (T.n.despues) charlaCon(T.n, T.n.despues);
  }
}
// oscurece un poco la pantalla durante la transformación
function formaVelo() {
  const T = FORMA.tr;
  if (!T) return;
  const k = performance.now() / 1000 - T.t0,
    a = Math.min(0.4, k * 0.5) * (k > 3.8 ? Math.max(0, 1 - (k - 3.8) / 0.6) : 1);
  ctx.fillStyle = 'rgba(6,8,18,' + a + ')';
  ctx.fillRect(0, 0, W, H);
}
// al salir de la fase vuelve a ser Smara
const loadAreaBase = loadArea;
loadArea = function (n) {
  if (n != 6) formaQuitar();
  return loadAreaBase(n);
};

/* ---------- 28c-tesoros.js ---------- */
/* ===== COFRES Y TESOROS DE LA NUEVA FASE =====
   - Cofres: los mismos del juego original, recoloreados a los azules del bosque (los herrajes
     dorados ahora brillan en cian). Se abren con E.
   - Tesoros: objetos EQUIPABLES (pestaña EQUIPO del inventario; solo funcionan los puestos, máximo 3).
     Íconos del "16x16 RPG Asset Pack" de ssugmi (uso comercial permitido), rediseñados
     y renombrados con cosas de Mulukukú y Nicaragua. No se gastan.
   Ubicación: casi todos arriba de las plataformas, para premiar a quien explora. */
const TESOROS = [
  { k: 'brujula', n: 'Brújula del Tuma', d: 'Una flecha te señala el próximo cofre o espíritu.', i: 4,
    h: 'El río Tuma nunca se pierde: siempre llega a Mulukukú.' },
  { k: 'guarumo', n: 'Hoja de Guarumo', d: 'Todo cuesta 25% menos stamina.', i: 6,
    h: 'El guarumo crece primero donde el monte se cayó: es el que vuelve a empezar.' },
  { k: 'sacuanjoche', n: 'Corona de Sacuanjoche', d: 'El tiempo detenido dura 0.5 s más.', i: 1,
    h: 'La flor nacional florece en la seca, cuando nadie la espera.' },
  { k: 'minero', n: 'Anillo del Triángulo Minero', d: 'Tus golpes hacen 10% más daño.', i: 2,
    h: 'Oro de Siuna, Bonanza y Rosita: pesado como el trabajo que costó.' },
  { k: 'guardabarranco', n: 'Pluma de Guardabarranco', d: 'Doble salto.', i: 0,
    h: 'El ave nacional: anida en los barrancos y no le teme a la caída.' },
  { k: 'jicaro', n: 'Collar de Jícaro', d: 'Un escudo que bloquea un golpe; vuelve cada 20 s.', i: 3,
    h: 'Del jícaro se hace la jícara del pinolillo... y, dicen, amuletos contra el mal de ojo.' },
  { k: 'guapote', n: 'Guapote del Tuma', d: 'Si tu vida baja de 30, te cura 35 (cada 45 s).', i: 5,
    h: 'El pez más bravo del río. Pica fuerte y no se rinde.' },
];
const TES = new Set(); // los que ya se encontraron
// se registran como objetos equipables del inventario (pestaña EQUIPO)
registrarEquipables(TESOROS.map(q => ({ ...q, dibujar: (x, y, s) => ctx.drawImage(img.tes, q.i * 16, 0, 16, 16, x, y, s, s) })));
// [x, y del suelo donde va el cofre, tipo (1 hierro, 3 especial), tesoro]
const COFRES_FASE = [
  [300, null, 1, 'brujula'],
  [1270, 192, 1, 'guarumo'],
  [1632, 120, 3, 'sacuanjoche'], // el mirador más alto
  [2150, 124, 1, 'minero'],
  [3120, 200, 1, 'guardabarranco'],
  [3730, 196, 1, 'jicaro'],
  [4300, null, 1, 'guapote'],
];
let COFRES = [],
  TES_AVISO = null;
const TES_T = { jicaro: 0, guapote: 0 };
function tesorosCargar() {
  COFRES = COFRES_FASE.map(([x, y, ty, k]) => ({ x, y: y || GROUND, ty, k, st: TES.has(k) ? 2 : 0, t0: -9 }));
}
function tesorosReset() {
  TES.clear();
  TES_AVISO = null;
}
function cofreCerca() {
  for (const c of COFRES) if (c.st == 0 && Math.abs(p.x - c.x) < 34 && Math.abs(p.y - c.y) < 30) return c;
  return null;
}
function abrirCofre(c) {
  c.st = 1;
  c.t0 = performance.now() / 1000;
  sfx('pick');
  SHK = Math.max(SHK, 1.5);
  setTimeout(() => {
    TES.add(c.k);
    invAgregarEquipable(c.k);
    save();
    TES_AVISO = { tes: TESOROS.find(q => q.k == c.k), t: performance.now() / 1000 };
    sfx('pick');
    flashW = 0.12;
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * 6.283;
      pfx(c.x, c.y - 24, Math.cos(a) * rnd(30, 110), Math.sin(a) * rnd(30, 110) - 40, rnd(0.4, 0.8), i % 2 ? '#8ff6ff' : '#fff6d8', 2, 60);
    }
  }, 650);
}
addEventListener('keydown', e => {
  if (e.repeat || e.code != 'KeyE' || state != 'play' || area != 6 || TIEMPO.parado || INV.open) return;
  const c = cofreCerca();
  if (c) {
    e.stopImmediatePropagation();
    abrirCofre(c);
  }
});
/* ---- efectos ---- */
const sdmgTes = sdmg;
sdmg = a => Math.round(sdmgTes(a) * (equipado('minero') ? 1.1 : 1));
const stcBase = stc;
stc = n => stcBase(n) * (equipado('guarumo') ? 0.75 : 1);
// doble salto con la pluma (en el aire, W o Espacio otra vez)
addEventListener('keydown', e => {
  if (e.repeat || state != 'play' || INV.open || !equipado('guardabarranco')) return;
  if ((e.code == 'KeyW' || e.code == 'Space') && !p.on && p.dj && p.sta >= 8 && p.dash <= 0) {
    p.dj = false;
    p.vy = -470;
    p.sta -= stc(8);
    for (let i = 0; i < 8; i++) pfx(p.x + rnd(-8, 8), p.y, rnd(-60, 60), rnd(10, 60), rnd(0.3, 0.5), i % 2 ? '#3cc8da' : '#c0602a', 2, 0);
    sfx('swing');
  }
});
function tesorosTick(dt) {
  const now = performance.now() / 1000;
  if (equipado('jicaro') && p.shield <= 0 && now > TES_T.jicaro) {
    p.shield = 1;
    TES_T.jicaro = now + 20;
  }
  if (equipado('jicaro') && p.shield > 0) TES_T.jicaro = Math.max(TES_T.jicaro, now + 20);
  if (equipado('guapote') && p.hp > 0 && p.hp < 30 && now > TES_T.guapote) {
    p.hp = Math.min(100, p.hp + 35);
    TES_T.guapote = now + 45;
    say('Guapote del Tuma: +35 de vida.');
    sfx('pick');
  }
  if (TES_AVISO && now - TES_AVISO.t > 4) TES_AVISO = null;
}
/* ---- dibujo ---- */
function drawCofres(t) {
  for (const c of COFRES) {
    const x = Math.round(c.x - cam);
    if (x < -40 || x > W + 40) continue;
    const f = c.st == 0 ? 0 : c.st == 2 ? 6 : Math.min(6, Math.floor((performance.now() / 1000 - c.t0) * 9)),
      r = CHR[CHN[c.ty]][f];
    if (c.st == 0) {
      // brillo que invita a abrirlo
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = (c.ty == 3 ? 0.35 : 0.2) + 0.1 * Math.sin(t * 3 + c.x);
      ctx.drawImage(halo('cian'), x - 26, c.y - 44, 52, 52);
      ctx.restore();
    }
    ctx.drawImage(img.chs6, r[0], r[1], r[2], r[3], Math.round(x - r[2] / 2), c.y - r[3] + 2, r[2], r[3]);
    if (c.st == 0 && cofreCerca() === c && state == 'play') {
      const b = Math.round(Math.sin(t * 5) * 1.5);
      ctx.fillStyle = '#2c2621';
      ctx.fillRect(x - 6, c.y - 54 + b, 12, 12);
      ctx.fillStyle = '#f4efe6';
      ctx.fillRect(x - 5, c.y - 53 + b, 10, 10);
      ctx.fillStyle = '#2c2621';
      ctx.font = '8px ' + PS;
      ctx.textAlign = 'center';
      ctx.fillText('E', x + 0.5, c.y - 44 + b);
      ctx.textAlign = 'left';
    }
    // el tesoro sube del cofre
    const k = performance.now() / 1000 - c.t0;
    if (c.st == 1 && k > 0.4 && k < 2.2) {
      const tes = TESOROS.find(q => q.k == c.k),
        y = c.y - 30 - Math.min(1, (k - 0.4) / 0.5) * 26 + Math.sin(k * 6) * 2;
      ctx.globalAlpha = Math.min(1, (2.2 - k) * 2);
      ctx.drawImage(img.tes, tes.i * 16, 0, 16, 16, x - 16, Math.round(y) - 16, 32, 32);
      ctx.globalAlpha = 1;
    }
    if (c.st == 1 && k > 2.2) c.st = 2;
  }
}
function drawTesorosHUD(t) {
  // fila de tesoros debajo de las reliquias
  let x = 8;
  for (const q of TESOROS) {
    if (!equipado(q.k)) continue;
    ctx.fillStyle = 'rgba(16,24,26,.55)';
    ctx.fillRect(x, 50, 18, 18);
    ctx.drawImage(img.tes, q.i * 16, 0, 16, 16, x + 1, 51, 16, 16);
    x += 21;
  }
  // brújula: flecha hacia lo próximo
  if (equipado('brujula') && state == 'play') {
    const metas = [...COFRES.filter(c => c.st == 0).map(c => c.x), ...ESPIRITUS.filter(n => !est(n).dado).map(n => n.x)].filter(
      mx => mx > p.x + 40,
    );
    if (metas.length) {
      const mx = Math.min(...metas),
        d = Math.round((mx - p.x) / 10),
        cx = W / 2,
        cy = 54,
        b = Math.round(Math.sin(t * 4) * 2);
      ctx.fillStyle = '#8ff6ff';
      for (let k = 0; k < 6; k++) ctx.fillRect(cx + b + k, cy - (5 - k), 2, (5 - k) * 2 + 1);
      ctx.fillRect(cx + b - 10, cy - 1, 10, 3);
      ctx.font = '6px ' + PS;
      ctx.textAlign = 'center';
      ctx.fillText(d + ' m', cx, cy + 14);
      ctx.textAlign = 'left';
    }
  }
  // cartel del tesoro encontrado
  const A = TES_AVISO;
  if (!A) return;
  const k = performance.now() / 1000 - A.t, // tiempo real (el cartel no se congela)
    a = Math.max(0, Math.min(1, k * 4, (4 - k) * 2));
  ctx.globalAlpha = a;
  ctx.font = '8px ' + PS;
  const t1 = 'ENCONTRASTE: ' + A.tes.n.toUpperCase();
  ctx.font = '7px ' + PS;
  const bw = Math.max(ctx.measureText(t1).width * 1.15, ctx.measureText(A.tes.d).width, ctx.measureText(A.tes.h).width) + 60,
    bx = Math.round(W / 2 - bw / 2),
    by = 98;
  ctx.fillStyle = '#2c2621';
  ctx.fillRect(bx, by, bw, 50);
  ctx.fillStyle = '#efe9de';
  ctx.fillRect(bx + 2, by + 2, bw - 4, 46);
  ctx.drawImage(img.tes, A.tes.i * 16, 0, 16, 16, bx + 8, by + 9 + Math.round(Math.sin(t * 6)), 32, 32);
  ctx.font = '8px ' + PS;
  ctx.fillStyle = '#5b7a6c';
  ctx.fillText(t1, bx + 48, by + 15);
  ctx.font = '7px ' + PS;
  ctx.fillStyle = '#2c2621';
  ctx.fillText(A.tes.d, bx + 48, by + 28);
  ctx.fillStyle = '#7d756c';
  ctx.fillText(A.tes.h, bx + 48, by + 40);
  ctx.globalAlpha = 1;
}

/* ---------- 28d-pilar-y-cadejo.js ---------- */
/* =====================================================================
   EL PILAR Y EL CADEJO
   · Al final del Bosque de la Niebla hay un pilar de piedra con runas.
     El Gato Negro (el último espíritu) le avisa a Smara que los pilares
     conectan mundos que no son reales.
   · Si Smara lo toca, la luz se la lleva a EL LLANO DE LOS SUSURROS
     (área 9): un campo de noche bajo las nubes y la luna, pasto morado
     y blanco, agua que lo refleja todo (ver 28f-campo-de-noche.js).
   · Al final llega corriendo el CADEJO (sprites de wolf_sin_fuego.zip):
     frena frente a Smara y, cuando abre el hocico, habla.
   ===================================================================== */
const PILAR = { x: 4372 };
let CD = { on: false },
  pilarAviso = 0;

/* ---------------- el Gato Negro ahora avisa de los pilares ---------------- */
(() => {
  const g = ESPIRITUS.find(n => n.k == 'gatonegro');
  if (!g) return;
  const fin = g.charla.pop();
  g.charla.push(
    ['e', '¿Ves esa piedra que brilla, allá al final? Es un pilar.'],
    ['e', 'Los pilares conectan mundos que no son reales. Del otro lado, ningún espíritu te cuida.'],
    ['s', '¿Y si tengo que seguir?'],
    ['e', 'Entonces tocalo. Pero si escuchás una cadena arrastrándose... no te des la vuelta.'],
    fin,
  );
  g.otra = ['El pilar te está esperando. Acordate: si escuchás la cadena, no te des la vuelta.'];
})();

/* ---------------- sonidos ---------------- */
function cdTono(f0, f1, d, ty, g, dl) {
  if (!AC || muted) return;
  const t = AC.currentTime + (dl || 0), o = AC.createOscillator(), gn = AC.createGain();
  o.type = ty || 'sine';
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + d);
  gn.gain.setValueAtTime(0.0001, t);
  gn.gain.exponentialRampToValueAtTime(g, t + 0.01);
  gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(gn); gn.connect(MG); o.start(t); o.stop(t + d + 0.05);
}
function cdRuido(d, fr, g, q, sube) {
  if (!AC || muted) return;
  const t = AC.currentTime, b = AC.createBuffer(1, Math.ceil(AC.sampleRate * d), AC.sampleRate), dd = b.getChannelData(0);
  for (let i = 0; i < dd.length; i++) dd[i] = Math.random() * 2 - 1;
  const s = AC.createBufferSource(), f = AC.createBiquadFilter(), gn = AC.createGain();
  s.buffer = b; f.type = 'bandpass'; f.Q.value = q || 0.8;
  f.frequency.value = fr;
  gn.gain.setValueAtTime(sube ? 0.0001 : g, t);
  gn.gain.exponentialRampToValueAtTime(sube ? g : 0.0001, t + d * 0.95);
  s.connect(f); f.connect(gn); gn.connect(MG); s.start(t);
}
const cdSnd = {
  pilar: () => { cdTono(220, 880, 1.4, 'triangle', 0.06); cdTono(330, 1320, 1.4, 'sine', 0.04); cdRuido(1.4, 3000, 0.08, 0.8, true); },
  susto: () => { sfx('boom'); cdRuido(0.8, 600, 0.45); cdTono(90, 40, 1.2, 'sawtooth', 0.3); cdTono(1400, 1300, 0.6, 'square', 0.05); },
  grunido: () => { cdRuido(0.9, 140, 0.25, 4); cdTono(60, 45, 0.9, 'sawtooth', 0.12); },
  voz: () => { cdTono(70 + Math.random() * 20, 55, 0.07, 'sawtooth', 0.09); cdRuido(0.07, 300, 0.06, 3); },
  cadena: () => { for (let i = 0; i < 4; i++) cdTono(2200 + Math.random() * 600, 1800, 0.05, 'square', 0.02, i * 0.07); },
};

/* =====================================================================
   1) EL PILAR (área 6)
   ===================================================================== */
function pilarTick(dt) {
  if (area != 6 || state != 'play') return;
  const g = ESPIRITUS.find(n => n.k == 'gatonegro');
  if (Math.abs(p.x - PILAR.x) < 20) {
    if (g && !est(g).dado) {
      if (performance.now() / 1000 > pilarAviso) { pilarAviso = performance.now() / 1000 + 4; say('El pilar zumba... Algo te dice que primero hables con el Gato Negro.'); }
      return;
    }
    // ¡toca el pilar!
    CD = { on: false, tp: { t: 0 } };
    state = 'cdtp';
    p.vx = 0;
    cdSnd.pilar();
  }
}
function dibujarPilar(t) {
  if (area != 6) return;
  const x = Math.round(PILAR.x - cam), base = GROUND;
  if (x < -60 || x > W + 60) return;
  const k = CD.tp ? Math.min(1, CD.tp.t / 1.2) : 0;
  // haz de luz que sube
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 0.18 + 0.08 * Math.sin(t * 2) + k * 0.6;
  const g = ctx.createLinearGradient(0, 0, 0, base);
  g.addColorStop(0, 'rgba(143,246,255,0)');
  g.addColorStop(1, 'rgba(143,246,255,1)');
  ctx.fillStyle = g;
  const w = 10 + k * 40;
  ctx.fillRect(x - w / 2, 0, w, base - 40);
  ctx.globalAlpha = 0.35 + 0.15 * Math.sin(t * 3) + k * 0.5;
  ctx.drawImage(halo('cian'), x - 40, base - 90, 80, 80);
  ctx.restore();
  // la piedra
  ctx.fillStyle = '#10121c';
  ctx.fillRect(x - 11, base - 62, 22, 62);
  ctx.fillStyle = '#3a4258';
  ctx.fillRect(x - 10, base - 60, 20, 60);
  ctx.fillStyle = '#4e5874';
  ctx.fillRect(x - 10, base - 60, 6, 60);
  ctx.fillStyle = '#2a3044';
  ctx.fillRect(x + 6, base - 60, 4, 60);
  ctx.fillStyle = '#10121c';
  ctx.fillRect(x - 13, base - 66, 26, 6);
  ctx.fillStyle = '#5a6684';
  ctx.fillRect(x - 12, base - 65, 24, 4);
  // runas que laten
  const br = 0.5 + 0.5 * Math.sin(t * 3);
  ctx.fillStyle = 'rgba(143,246,255,' + (0.5 + br * 0.5) + ')';
  const R = [[-4, -52, 8, 1], [-1, -55, 2, 7], [-5, -40, 3, 3], [2, -40, 3, 3], [-4, -30, 8, 1], [-2, -28, 1, 5], [1, -28, 1, 5], [-3, -16, 6, 2], [-1, -19, 2, 8]];
  for (const [rx, ry, rw, rh] of R) ctx.fillRect(x + rx, base + ry, rw, rh);
  // chispas
  if (Math.random() < 0.3) pfx(PILAR.x + rnd(-10, 10), base - rnd(0, 60), rnd(-10, 10), rnd(-50, -20), rnd(0.6, 1.2), Math.random() < 0.5 ? '#8ff6ff' : '#e8d6ff', 2, -10);
}
// la luz se lleva a Smara
function pilarCineTick(dt) {
  const T = CD.tp;
  T.t += dt;
  p.x += (PILAR.x - p.x) * Math.min(1, dt * 4);
  if (T.t < 1.4) {
    p.y = GROUND - Math.min(24, T.t * 20);
    if (Math.random() < 0.9) pfx(p.x + rnd(-14, 14), p.y - rnd(0, 60), rnd(-20, 20), rnd(-120, -40), rnd(0.4, 0.8), Math.random() < 0.5 ? '#8ff6ff' : '#ffffff', 2, -30);
    SHK = Math.max(SHK, T.t * 2);
  }
  if (T.t > 1.2 && !T.f) { T.f = 1; flashW = 1.3; }
  if (T.t > 1.7) {
    loadArea(9);
    state = 'play';
    blackIn = 1.4;
  }
}


/* =====================================================================
   2) EL LLANO DE LOS SUSURROS (área 9)
   El escenario (nubes de noche, pasto morado y blanco, agua con reflejo,
   el Espanto y los sonidos del campo) está en 28f-campo-de-noche.js.
   ===================================================================== */
const CD_X = { susto: 1500 };
function cdCargar() {
  LEVEL = W * 3;
  GROUND = LL.suelo;
  platforms = []; enemies = []; pick = []; CHESTS = []; NPCS = []; STRUCTS = []; GEMS = [];
  p.x = 70; p.y = GROUND; p.vy = 0; p.vx = 0; p.on = true; p.face = 1;
  cam = 0;
  ambient('');
  CD = { on: true, t: 0, perro: null };
}

/* =====================================================================
   3) EL CADEJO (sprites de wolf_sin_fuego.zip)
   Llega corriendo desde la derecha, frena de golpe frente a Smara,
   habla abriendo el hocico y al final se le tira encima.
   ===================================================================== */
// es el mismo Cadejo de la Noche de los Duhindu (29c-cadejo-noche.js): se acuerda de Smara
const CD_FRASES = [
  'Te dije que te acordaras de este perro, niña.',
  'Y aun así tocaste el pilar. Este mundo no es real: está hecho de lo que te contaron.',
  'Aquí no puedo ser tu amigo. En este cuento me pintaron de negro.',
  '¿Querés saber quién es el malo? Vamos a preguntárselo al blanco.',
];
const CDJ = { w: 48, h: 43, esc: 3, llega: 0.75 };
function cdTick(dt) {
  if (!CD.on) return;
  CD.t += dt;
  if (Math.random() < dt * 0.12) cdSnd.cadena(); // a lo lejos, una cadena...
  if (!CD.perro && state == 'play' && p.x > CD_X.susto && !(LL.esp || []).some(e => e.st != 'muere') && !(CD.mons || []).some(m => m.st != 'muere' && m.st != 'montado')) {
    // se oye algo que corre por el pasto...
    const meta = Math.min(LEVEL - 40, p.x + 170);
    CD.perro = { x: cam + W + 70, x0: cam + W + 70, meta, t: 0, i: -1, s: 0, n: 0, boca: 0, fin: 0 };
    state = 'cdcine';
    p.vx = 0;
    p.face = 1;
    cdRuido(0.8, 1800, 0.12, 0.6, true);
  }
}
function cdCineTick(dt) {
  const D = CD.perro;
  D.t += dt;
  // 1) corre hacia Smara
  if (D.t < CDJ.llega) {
    const k = D.t / CDJ.llega;
    D.x = D.x0 + (D.meta - D.x0) * (1 - (1 - k) * (1 - k));
    if (Math.random() < 0.6) pfx(D.x + 30, GROUND - 2, rnd(20, 90), rnd(-70, -20), 0.35, Math.random() < 0.5 ? '#f4eeff' : '#4a2a58', 2, 300);
    return;
  }
  D.x = D.meta;
  // 2) ¡PUM! frena de golpe
  if (!D.pum) {
    D.pum = 1;
    cdSnd.susto();
    SHK = 12;
    flashW = 0.3;
    for (let i = 0; i < 26; i++) pfx(D.x + rnd(-30, 40), GROUND - rnd(0, 20), rnd(-60, 220), rnd(-160, -20), rnd(0.3, 0.8), Math.random() < 0.35 ? '#ff8a3a' : Math.random() < 0.5 ? '#f4eeff' : '#2a1830', 2, 300);
  }
  const u = D.t - CDJ.llega;
  if (u < 0.4) p.x -= dt * 70; // Smara retrocede del susto
  if (u > 0.5 && !D.g) { D.g = 1; cdSnd.grunido(); }
  if (u > 1.3 && D.i < 0) { D.i = 0; D.s = 0; D.n = 0; }
  if (D.i >= 0 && D.i < CD_FRASES.length) {
    const L = CD_FRASES[D.i];
    D.s += dt;
    const n = Math.min(L.length, Math.floor(D.s * 16));
    if (n > D.n) { if (L[n - 1] != ' ' && n % 2 == 0) cdSnd.voz(); D.n = n; }
    // el hocico se abre y se cierra mientras habla
    D.boca = n < L.length ? 0.4 + 0.6 * Math.abs(Math.sin(D.s * 14)) : Math.max(0, D.boca - dt * 3);
    if (D.s > L.length / 16 + 1.6) { D.i++; D.s = 0; D.n = 0; if (D.i < CD_FRASES.length) cdSnd.grunido(); }
  } else if (D.i >= CD_FRASES.length) {
    // 3) se lanza contra la pantalla
    D.fin += dt;
    D.boca = 1;
    if (D.fin > 0.25 && !D.ruge) { D.ruge = 1; cdSnd.susto(); SHK = 14; }
    // no la mata: la arrastra al blanco, donde la espera el Cuentero (40-jefe-cuentero.js)
    if (D.fin > 3.6 && !D.lleva) { D.lleva = 1; loadArea(7); blackIn = 1.2; flashW = 0.6; }
  }
}
// qué cuadro de la hoja toca
function cdCuadro(D, t) {
  if (D.t < CDJ.llega) return Math.floor(D.t * 16) % 6;
  if (D.fin) return D.fin < 0.12 ? 0 : 2; // salta con el hocico abierto
  if (D.t < CDJ.llega + 0.25) return 5; // frenada
  if (D.boca > 0.75) return 8;
  if (D.boca > 0.45) return 7;
  if (D.boca > 0.15) return 6;
  return 0;
}
function cdPos(D) {
  const salto = D.fin ? Math.min(1, D.fin / 0.5) : 0;
  return { salto, sc: CDJ.esc + salto * 5, x: D.x - cam - salto * 200, y: GROUND + salto * 60 };
}
function cdPerro(t) {
  const D = CD.perro;
  if (!D || !img.cdj) return;
  const k = cdCuadro(D, t), P = cdPos(D), sc = P.sc;
  // respira (sube y baja un pixel) cuando está quieto
  const resp = D.t > CDJ.llega + 0.25 && !D.fin ? Math.round(Math.sin(t * 3)) : 0;
  // sombra
  ctx.fillStyle = 'rgba(10,4,16,.45)';
  ctx.fillRect(Math.round(P.x - 20 * sc), GROUND - 2, Math.round(40 * sc), 3);
  ctx.save();
  ctx.translate(Math.round(P.x), Math.round(P.y));
  ctx.drawImage(img.cdj, k * CDJ.w, 0, CDJ.w, CDJ.h, Math.round(-24 * sc), Math.round(-43 * sc) + resp, CDJ.w * sc, CDJ.h * sc);
  ctx.restore();
}
// brillo de brasas detrás (la cola y las costillas son de fuego apagado)
function cdResplandor(t) {
  const D = CD.perro;
  if (!D) return;
  const P = cdPos(D), x = P.x + 4 * P.sc, y = P.y - 22 * P.sc, r = 46 * P.sc * (1 + Math.sin(t * 4) * 0.06);
  const a = Math.min(1, D.t / 0.3);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, 'rgba(150,50,20,' + 0.3 * a + ')');
  g.addColorStop(0.6, 'rgba(80,20,60,' + 0.18 * a + ')');
  g.addColorStop(1, 'rgba(40,0,40,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();
}
// los ojos celestes brillan
function cdOjos(t) {
  const D = CD.perro;
  if (!D || D.t < CDJ.llega + 0.25 || D.fin > 0.12) return;
  const P = cdPos(D), x = P.x + (-24 + 7.5) * P.sc, y = P.y + (-43 + 21.5) * P.sc + Math.round(Math.sin(t * 3));
  const parpadeo = Math.sin(t * 0.9) > 0.97 ? 0.2 : 1;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
  g.addColorStop(0, 'rgba(60,220,255,' + 0.7 * parpadeo + ')');
  g.addColorStop(1, 'rgba(0,120,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - 12, y - 12, 24, 24);
  ctx.restore();
}
// globo del Cadejo (solo mientras habla)
function cdGlobo() {
  const D = CD.perro;
  if (!D || D.i < 0 || D.i >= CD_FRASES.length) return;
  const full = CD_FRASES[D.i];
  if (!D.n) return;
  ctx.font = '8px ' + PS;
  // la frase completa decide el tamaño del globo (en varias líneas si es larga)
  const lineas = wrapT(full, 300), w = Math.max(80, Math.max(...lineas.map(l => ctx.measureText(l).width)) + 20), h = 18 + lineas.length * 12;
  const hx = D.x - cam - 50, bx = Math.round(Math.max(8, Math.min(W - w - 8, hx - w / 2))), by = GROUND - 140 - h;
  const tem = D.boca > 0.6 ? (Math.random() - 0.5) * 2 : 0;
  ctx.fillStyle = '#ff7a2a';
  ctx.fillRect(bx - 2 + tem, by - 2, w + 4, h + 4);
  ctx.fillStyle = '#0c0812';
  ctx.fillRect(bx + tem, by, w, h);
  for (let k = 0; k < 6; k++) { ctx.fillStyle = '#ff7a2a'; ctx.fillRect(Math.round(hx) - 6 + k, by + h + k, 12 - k * 2 + 2, 1); }
  ctx.fillStyle = '#5ae0ff';
  ctx.font = '6px ' + PS;
  ctx.fillText('CADEJO', bx + 8 + tem, by + 10);
  ctx.font = '8px ' + PS;
  ctx.fillStyle = '#f4e6e0';
  let quedan = D.n;
  lineas.forEach((l, k) => {
    if (quedan <= 0) return;
    ctx.fillText(l.slice(0, quedan), bx + 8 + tem + (Math.random() < 0.1 ? 1 : 0), by + 24 + k * 12);
    quedan -= l.length + 1;
  });
}
function cdFinal() {
  const D = CD.perro;
  if (!D || !D.fin) return;
  const a = Math.min(1, Math.max(0, (D.fin - 0.45) / 0.15));
  ctx.fillStyle = 'rgba(0,0,0,' + a + ')';
  ctx.fillRect(0, 0, W, H);
  if (D.fin > 1.4) {
    // solo quedan los ojos... y el texto
    const k = Math.min(1, (D.fin - 1.4) / 1);
    ctx.globalAlpha = Math.max(0, 1 - (D.fin - 1.4) / 2.5);
    ctx.fillStyle = '#5ae0ff';
    ctx.fillRect(W / 2 - 30, H / 2 - 40, 10, 4);
    ctx.fillRect(W / 2 + 20, H / 2 - 40, 10, 4);
    ctx.globalAlpha = k;
    ctx.textAlign = 'center';
    ctx.font = '9px ' + PS;
    ctx.fillStyle = '#c9d0e6';
    ctx.fillText('...el Cadejo la arrastra hacia el blanco.', W / 2, H / 2 + 10);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
}

/* =====================================================================
   CONEXIÓN CON EL JUEGO
   ===================================================================== */
const loadAreaCD = loadArea;
loadArea = function (n) {
  loadAreaCD(n);
  if (n == 9) cdCargar();
  else CD.on = false;
};
const updEnemiesCD = updEnemies;
updEnemies = function (dt) {
  updEnemiesCD(dt);
  pilarTick(dt);
  if (area == 9) cdTick(dt);
};
const drawPlatCD = drawPlat;
drawPlat = function () {
  const t = performance.now() / 1000;
  if (area == 9) return cnFondo(t); // 28f-campo-de-noche.js
  drawPlatCD();
  dibujarPilar(t);
};
const drawPFXCD = drawPFX;
drawPFX = function () {
  drawPFXCD();
  if (area != 9) return;
  const t = performance.now() / 1000;
  cdResplandor(t);
  cdPerro(t);
  cdOjos(t);
};
const drawZCCD = drawZC;
drawZC = function () {
  drawZCCD();
  if (area == 9) cdFinal();
};
let cdUlt = performance.now();
const drawCD = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.033, (now - cdUlt) / 1000);
  cdUlt = now;
  if (state == 'cdtp') pilarCineTick(dt);
  if (state == 'cdcine' && area == 9) cdCineTick(dt);
  // durante el susto y la luz del pilar la pantalla también tiembla
  const s0 = state;
  if (s0 == 'cdcine' || s0 == 'cdtp') state = 'play';
  drawCD();
  state = s0;
};

/* ---------- 28e-monstruo-del-camino.js ---------- */
/* =====================================================================
   EL MONSTRUO DEL CAMINO VIEJO (área 9, antes del Cadejo)
   Una bestia roja con un cristal verde en la cabeza (sprites del ENEMY.zip).
   Baja dentro de un rayo de luz, igual que Smara llegó por el pilar,
   y le cierra el camino: hay que vencerla para seguir.
   Cuadros de la hoja (10x10, 73x61 cada uno, mirando a la derecha):
     1-12 aparece · 13-40 camina · 41 golpe recibido · 42-49 mordida
     50-54 rugido · 55-79 embestida · 80 golpe recibido · 81-99 muere
   ===================================================================== */
const MON = {
  w: 73, h: 61, ax: 24, ay: 61, esc: 2, // ancla en las patas; se dibuja al doble
  vida: 140,
  anim: {
    nace: { a: 1, b: 12, fps: 12, loop: false },
    camina: { a: 13, b: 40, fps: 16, loop: true },
    muerde: { a: 42, b: 49, fps: 14, loop: false },
    ruge: { a: 50, b: 54, fps: 10, loop: false },
    embiste: { a: 55, b: 79, fps: 26, loop: true },
    muere: { a: 81, b: 99, fps: 12, loop: false },
  },
  // dónde aparecen (cuando Smara pasa por "x", el monstruo baja en "en")
  oleadas: [{ x: 560, en: 760 }, { x: 830, en: 990 }],
};
function monNuevo(x) {
  CD.mons.push({ x, y: GROUND, face: -1, hp: MON.vida, st: 'nace', t: 0, cd: 1, flash: 0, vx: 0, hit: false, ultAtk: null, kb: 0 });
  cdTono(1800, 300, 1.0, 'sawtooth', 0.05);
  cdRuido(1.0, 3000, 0.12, 0.8, true);
  SHK = Math.max(SHK, 3);
}
function monCuadro(m) {
  if (m.st == 'noqueado' || m.st == 'montado') return montaCuadro(m);
  if (m.flash > 0) return 41;
  const A = MON.anim[m.st] || MON.anim.camina, n = A.b - A.a + 1, k = Math.floor(m.t * A.fps);
  return A.a + (A.loop ? k % n : Math.min(n - 1, k));
}
function monDur(st) {
  const A = MON.anim[st];
  return (A.b - A.a + 1) / A.fps;
}
function monTick(dt) {
  if (!CD.on) return;
  CD.mons = CD.mons || [];
  CD.ola = CD.ola || 0;
  // aparecen cuando Smara avanza (la siguiente solo si ya venció a la anterior)
  const O = MON.oleadas[CD.ola];
  if (O && state == 'play' && p.x > O.x && !CD.mons.some(m => m.st != 'muere' && m.st != 'montado')) { CD.ola++; monNuevo(O.en); }
  for (const m of CD.mons) {
    m.t += dt;
    m.flash -= dt;
    m.cd -= dt;
    const dx = p.x - m.x, ad = Math.abs(dx);
    if (m.st == 'nace') {
      if (m.t > 0.55 && !m.g) { m.g = 1; cdSnd.grunido(); }
      if (m.t >= monDur('nace')) { m.st = 'camina'; m.t = 0; }
      continue;
    }
    if (m.st == 'muere' || m.st == 'montado') continue;
    if (m.st == 'noqueado') { noqTick(m, dt); continue; }
    if (m.st != 'embiste') m.face = dx < 0 ? -1 : 1;
    if (m.st == 'camina') {
      if (m.kb > 0) { m.kb -= dt; m.x -= m.face * 120 * dt; }
      else if (ad > 52) m.x += m.face * 55 * dt;
      if (ad < 70 && m.cd <= 0) { m.st = 'muerde'; m.t = 0; m.hit = false; cdTono(220, 90, 0.2, 'sawtooth', 0.08); }
      else if (ad > 140 && ad < 320 && m.cd <= 0 && Math.random() < dt * 0.9) { m.st = 'ruge'; m.t = 0; cdSnd.grunido(); }
    } else if (m.st == 'muerde') {
      // la mordida pega en los cuadros del medio
      const k = monCuadro(m);
      if (!m.hit && k >= 45 && k <= 47) {
        m.hit = true;
        cdRuido(0.12, 900, 0.2);
        SHK = Math.max(SHK, 2);
        if (Math.abs(p.x - (m.x + m.face * 40)) < 34 && p.y > GROUND - 70 && p.inv <= 0 && p.dash <= 0) { CD.golpe = m.x; hurt(14); }
      }
      if (m.t >= monDur('muerde')) { m.st = 'camina'; m.t = 0; m.cd = 0.9; }
    } else if (m.st == 'ruge') {
      // escupe chispas por la boca antes de embestir
      if (Math.random() < 0.6) pfx(m.x + m.face * 52, GROUND - 40, m.face * rnd(40, 140), rnd(-60, 20), rnd(0.2, 0.4), Math.random() < 0.5 ? '#ffffff' : '#5af0b4', 2, 200);
      if (m.t >= monDur('ruge') + 0.15) { m.st = 'embiste'; m.t = 0; m.face = dx < 0 ? -1 : 1; cdRuido(0.6, 500, 0.25); }
    } else if (m.st == 'embiste') {
      m.x += m.face * 300 * dt;
      if (Math.random() < 0.5) pfx(m.x - m.face * 20, GROUND - 2, -m.face * rnd(30, 90), rnd(-60, -10), 0.3, '#3a2e2a', 2, 300);
      if (ad < 40 && p.y > GROUND - 60 && p.inv <= 0 && p.dash <= 0) { CD.golpe = m.x; hurt(16); }
      if (m.t > 0.9 || m.x < cam + 20 || m.x > cam + W - 20) { m.st = 'camina'; m.t = 0; m.cd = 1.4; SHK = Math.max(SHK, 3); }
    }
    m.x = Math.max(40, Math.min(LEVEL - 40, m.x));
    // (el choque con Smara, que la empuja para atrás, está en 28f: cnEmpuje)
  }
  // golpes de Smara
  const a = p.atk;
  if (a && a.hit && CD.ultAtk !== a) {
    CD.ultAtk = a;
    const hx = p.x + a.f * 42;
    for (const m of CD.mons) {
      if (m.st == 'nace' || m.st == 'muere' || m.st == 'montado') continue;
      // cuerpo de la bestia: de la cola a la cabeza (mira hacia m.face)
      const cx = m.x + m.face * 18, my = m.y || GROUND;
      if (golpeToca(a, cx - 52, my - 64, cx + 52, my)) { monDanio(m, sdmg(a), a.c == 2 || a.c >= 3); }
    }
  }
  CD.mons = CD.mons.filter(m => !(m.st == 'muere' && m.t > monDur('muere') + 0.3));
}
function monDibujar(t) {
  if (!CD.on || !CD.mons || !img.mon9) return;
  for (const m of CD.mons) {
    const k = monCuadro(m), sx = (k % 10) * MON.w, sy = Math.floor(k / 10) * MON.h, e = MON.esc;
    const x = Math.round(m.x - cam), y = Math.round(m.st == 'montado' ? p.y : m.y);
    if (x < -200 || x > W + 200) continue;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(m.face, 1);
    // al morir parpadea
    if (m.st == 'muere' && k >= 90) ctx.globalAlpha = k % 2 ? 0.4 : 0.9;
    ctx.drawImage(img.mon9, sx, sy, MON.w, MON.h, -MON.ax * e, -MON.ay * e, MON.w * e, MON.h * e);
    ctx.restore();
  }
}
// el cristal verde brilla en la oscuridad (y la barrita de vida)
function monBrillos(t) {
  if (!CD.on || !CD.mons) return;
  for (const m of CD.mons) {
    if (m.st == 'muere') continue;
    if (m.st == 'noqueado' || m.st == 'montado') { montaBrillos(m, t); continue; }
    const x = m.x - cam + m.face * 36, y = GROUND - 56;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y, 0, x, y, 16);
    g.addColorStop(0, 'rgba(90,240,180,' + (0.45 + 0.15 * Math.sin(t * 5)) + ')');
    g.addColorStop(1, 'rgba(90,240,180,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 16, y - 16, 32, 32);
    ctx.restore();
    if (m.st != 'nace') {
      const bx = Math.round(m.x - cam - 20), by = GROUND - 78;
      ctx.fillStyle = '#000a';
      ctx.fillRect(bx - 1, by - 1, 42, 4);
      ctx.fillStyle = '#c4163c';
      ctx.fillRect(bx, by, Math.round(40 * Math.max(0, m.hp) / MON.vida), 2);
    }
  }
}

/* =====================================================================
   NOQUEO Y MONTURA
   · Cuando a la bestia le queda poca vida (MON.noqueo) cae NOQUEADA:
     se tambalea, se desploma y le dan vueltas estrellitas en la cabeza.
   · Si Smara se acerca y aprieta E, se le sube encima y la MONTA por
     un tiempo limitado (MON.monta segundos):
       A/D más rápido · Espacio salta con ella · doble Espacio = embestida
       E = mordida · J/K Smara sigue usando la guadaña desde arriba
     Lo que la bestia atropella al correr o embestir recibe daño.
   · Al acabarse el tiempo Smara salta y la bestia cae rendida.
   · Si nadie la monta en MON.noqDur segundos, se levanta furiosa.
   ===================================================================== */
MON.noqueo = 35;
MON.noqDur = 8;
MON.monta = 10;
let MONTA = null;
function monDanio(m, d, fuerte) {
  if (m.st == 'noqueado') d *= 2; // golpe de gracia
  m.hp -= d;
  m.flash = 0.08;
  if (m.st != 'noqueado') m.kb = 0.12;
  sfx('hit');
  hitFX(m.x, GROUND - 30, fuerte);
  for (let i = 0; i < 8; i++) pfx(m.x, GROUND - 30, rnd(-140, 140), rnd(-160, 20), rnd(0.2, 0.4), i % 2 ? '#c4163c' : '#5af0b4', 2, 300);
  if (m.hp <= 0) {
    m.st = 'muere';
    m.t = 0;
    sfx('boom');
    SHK = Math.max(SHK, 5);
    pick.push({ x: m.x, id: 'nac', y: GROUND, got: false }); // deja un nacatamal
  } else if (!m.noq && m.hp <= MON.noqueo && m.st != 'noqueado') {
    // ¡NOQUEADA!
    m.st = 'noqueado';
    m.t = 0;
    m.noq = 1;
    m.kb = 0;
    m.hp = Math.max(1, m.hp);
    sfx('boom');
    SHK = Math.max(SHK, 6);
    cdTono(900, 200, 0.9, 'triangle', 0.06); // silbido de mareo
    cdTono(1300, 300, 0.9, 'sine', 0.04, 0.1);
    for (let i = 0; i < 14; i++) pfx(m.x + m.face * 30, GROUND - 4, rnd(-120, 120), rnd(-120, -20), rnd(0.3, 0.6), '#5a4a3e', 3, 400);
  }
}
function noqTick(m, dt) {
  if (m.t > 0.66 && m.t < 0.7 && !m.pum) { m.pum = 1; SHK = Math.max(SHK, 4); cdRuido(0.4, 200, 0.3); }
  if (m.t > MON.noqDur) {
    // nadie la montó: se levanta furiosa
    m.st = 'ruge';
    m.t = 0;
    m.noq = 0;
    m.pum = 0;
    m.hp = Math.min(MON.vida, m.hp + 30);
    cdSnd.grunido();
  }
}
function montaCuadro(m) {
  const t = m.t;
  if (m.st == 'noqueado') {
    if (t < 0.36) return 78 + Math.floor(t / 0.12); // se tambalea
    if (t < 0.66) return 81 + Math.floor((t - 0.36) / 0.1); // se desploma
    if (t > MON.noqDur - 1.4) return Math.floor(t * 9) % 2 ? 85 : 81; // ya se quiere levantar
    return Math.floor(t * 1.4) % 2 ? 85 : 84; // respira tirada en el suelo
  }
  // montada
  if (t < 0.4) return [85, 84, 83, 82, 81, 80, 79][Math.min(6, Math.floor(t / 0.058))]; // se levanta
  if (MONTA && MONTA.muerde > 0) return 42 + Math.min(7, Math.floor((1 - MONTA.muerde / 0.5) * 8));
  if (p.dash > 0 || Math.abs(p.vx) > 250) return 55 + (Math.floor(t * 26) % 25);
  if (Math.abs(p.vx) > 25) return 13 + (Math.floor(t * (14 + Math.abs(p.vx) / 18)) % 28);
  return 13;
}
// estrellitas, aviso de E y barras de tiempo
function montaBrillos(m, t) {
  const x = Math.round(m.x - cam);
  if (m.st == 'noqueado') {
    if (m.t < 0.66) return;
    // estrellitas dando vueltas sobre la cabeza (tirada, la cabeza queda adelante)
    const hx = x + m.face * 70, hy = GROUND - 34;
    for (let i = 0; i < 3; i++) {
      const a = t * 4 + (i * Math.PI * 2) / 3, sx = Math.round(hx + Math.cos(a) * 14), sy = Math.round(hy + Math.sin(a) * 4);
      ctx.fillStyle = Math.sin(a) > 0 ? '#ffe45a' : '#c9a83a';
      ctx.fillRect(sx - 1, sy, 3, 1);
      ctx.fillRect(sx, sy - 1, 1, 3);
    }
    // "KO" que sube y baja
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000a';
    ctx.fillText('KO', hx + 1, hy - 13 + Math.round(Math.sin(t * 3) * 2));
    ctx.fillStyle = '#ffe45a';
    ctx.fillText('KO', hx, hy - 14 + Math.round(Math.sin(t * 3) * 2));
    // cuánto le falta para levantarse
    const k = Math.max(0, 1 - m.t / MON.noqDur), bx = x - 20, by = GROUND - 44;
    ctx.fillStyle = '#000a';
    ctx.fillRect(bx - 1, by - 1, 42, 4);
    ctx.fillStyle = '#ffe45a';
    ctx.fillRect(bx, by, Math.round(40 * k), 2);
    if (state == 'play' && montaCerca(m)) {
      const b = Math.round(Math.sin(t * 6) * 1.5), ty = GROUND - 70 + b;
      ctx.fillStyle = '#1a1424';
      ctx.fillRect(x - 34, ty - 10, 68, 14);
      ctx.fillStyle = '#5af0b4';
      ctx.fillRect(x - 33, ty - 9, 66, 12);
      ctx.fillStyle = '#1a1424';
      ctx.font = '7px ' + PS;
      ctx.fillText('E MONTAR', x, ty);
    }
    ctx.textAlign = 'left';
  } else if (MONTA && MONTA.m === m) {
    // tiempo de la montura
    const k = Math.max(0, MONTA.t / MON.monta), bx = x - 30, by = Math.round(p.y) - 112;
    ctx.fillStyle = '#000a';
    ctx.fillRect(bx - 1, by - 1, 62, 5);
    ctx.fillStyle = k < 0.3 && Math.floor(t * 8) % 2 ? '#ff5a5a' : '#5af0b4';
    ctx.fillRect(bx, by, Math.round(60 * k), 3);
    ctx.font = '6px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e8fff4';
    ctx.fillText('E MUERDE', x, by - 3);
    ctx.textAlign = 'left';
  }
}
function montaCerca(m) {
  return Math.abs(p.x - (m.x + m.face * 30)) < 64 && p.y > GROUND - 40;
}
function montar(m) {
  MONTA = { m, t: MON.monta, sube: 0.35, muerde: 0, cd: 0, golpe: new Map(), paso: 0 };
  m.st = 'montado';
  m.t = 0;
  p.x = m.x;
  p.vx = 0;
  p.vy = -240;
  p.on = false;
  p.atk = null;
  cdSnd.grunido();
  cdTono(400, 900, 0.3, 'triangle', 0.05);
  toast = '¡Montaste a la bestia!';
  toastT = 2;
}
function bajar() {
  const m = MONTA.m;
  MONTA = null;
  // la bestia cae rendida
  m.st = 'muere';
  m.t = 0;
  m.x = p.x;
  pick.push({ x: m.x, id: 'nac', y: GROUND, got: false });
  sfx('boom');
  SHK = Math.max(SHK, 5);
  // Smara salta para atrás
  p.y = GROUND - 50;
  p.vy = -380;
  p.vx = -p.face * 140;
  p.on = false;
  p.kb = 0.25;
}
// lo que la bestia muerde o atropella
function montaPega(x0, x1, d, quien) {
  const a = Math.min(x0, x1), b = Math.max(x0, x1), ahora = performance.now();
  for (const o of [...CD.mons, ...(LL.esp || [])]) {
    if (o === MONTA.m || o.st == 'muere' || o.st == 'nace' || o.st == 'aparece') continue;
    if (o.x < a - 20 || o.x > b + 20) continue;
    if (ahora - (MONTA.golpe.get(o) || 0) < 450) continue;
    MONTA.golpe.set(o, ahora);
    SHK = Math.max(SHK, 3);
    if (LL.esp.includes(o)) espDanio(o, d, MONTA.m.face); // el Espanto (28f)
    else { monDanio(o, d, quien == 'muerde'); o.x += MONTA.m.face * 18; }
  }
}
function montaTick(dt) {
  if (!MONTA) return;
  const m = MONTA.m;
  if (area != 9 || p.hp <= 0 || CD.perro) { bajar(); return; }
  MONTA.t -= dt;
  MONTA.sube -= dt;
  MONTA.muerde -= dt;
  MONTA.cd -= dt;
  // más rápida que Smara a pie
  if (p.kb <= 0 && p.dash <= 0 && MONTA.sube <= 0) {
    const dir = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0);
    p.x += dir * (keys.ShiftLeft || keys.ShiftRight ? 170 : 120) * dt;
  }
  p.x = Math.max(30, Math.min(LEVEL - 30, p.x));
  p.crouch = false;
  m.x = p.x;
  m.face = p.face;
  // pisadas pesadas
  if (p.on && Math.abs(p.vx) > 25) {
    MONTA.paso -= dt * (1 + Math.abs(p.vx) / 200);
    if (MONTA.paso <= 0) {
      MONTA.paso = 0.28;
      SHK = Math.max(SHK, 1.2);
      cdRuido(0.12, 160, 0.15, 2);
      for (let i = 0; i < 4; i++) pfx(m.x - m.face * 10 + rnd(-10, 10), GROUND - 1, rnd(-60, 60), rnd(-70, -20), 0.35, '#4a2a58', 2, 300);
    }
  }
  // mordida
  if (MONTA.muerde > 0 && MONTA.muerde < 0.28 && !MONTA.mordio) {
    MONTA.mordio = 1;
    cdRuido(0.15, 900, 0.25);
    montaPega(m.x + m.face * 30, m.x + m.face * 120, 34, 'muerde');
  }
  // atropella al correr o embestir
  if (p.dash > 0 || Math.abs(p.vx) > 150) montaPega(m.x - m.face * 10, m.x + m.face * 80, p.dash > 0 ? 22 : 10, 'pisa');
  if (MONTA.t <= 0) bajar();
}
addEventListener('keydown', e => {
  if (e.code != 'KeyE' || e.repeat || area != 9 || state != 'play') return;
  if (MONTA) {
    if (MONTA.cd <= 0 && MONTA.sube <= 0) {
      MONTA.muerde = 0.5;
      MONTA.cd = 0.65;
      MONTA.mordio = 0;
      cdSnd.grunido();
    }
    return;
  }
  const m = (CD.mons || []).find(m => m.st == 'noqueado' && m.t > 0.66 && montaCerca(m));
  if (m) montar(m);
});
// Smara sentada en el lomo
const drawPlayerMON = drawPlayer;
drawPlayer = function () {
  if (!MONTA || area != 9) return drawPlayerMON();
  const k = Math.max(0, MONTA.sube / 0.35), mueve = p.on && Math.abs(p.vx) > 25;
  const alto = 46 * (1 - k) + Math.sin(k * Math.PI) * 22 + (mueve ? Math.round(Math.abs(Math.sin(MONTA.m.t * 9)) * 2) : 0);
  const y0 = p.y, x0 = p.x, c0 = p.crouch, v0 = p.vx, o0 = p.on, l0 = p.landT;
  p.y -= alto;
  p.x -= p.face * 4;
  // sentada con las piernas recogidas, también cuando la bestia salta
  if (!p.atk && MONTA.sube <= 0) { p.crouch = true; p.vx = 0; p.on = true; p.landT = 0; }
  drawPlayerMON();
  p.y = y0; p.x = x0; p.crouch = c0; p.vx = v0; p.on = o0; p.landT = l0;
};
const drawPShadowMON = drawPShadow;
drawPShadow = function () {
  if (MONTA && area == 9) {
    ctx.fillStyle = 'rgba(10,4,16,.45)';
    ctx.fillRect(Math.round(p.x - cam - 40), GROUND - 2, 90, 3);
    return;
  }
  drawPShadowMON();
};

/* ---------------- conexión ---------------- */
const loadAreaMON = loadArea;
loadArea = function (n) {
  loadAreaMON(n);
  MONTA = null;
  if (n == 9) { CD.mons = []; CD.ola = 0; }
};
const updEnemiesMON = updEnemies;
updEnemies = function (dt) {
  updEnemiesMON(dt);
  if (area == 9) { montaTick(dt); monTick(dt); }
};
const drawEnemiesMON = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesMON(t);
  if (area == 9) monDibujar(performance.now() / 1000);
};
const drawPFXMON = drawPFX;
drawPFX = function () {
  drawPFXMON();
  if (area == 9) monBrillos(performance.now() / 1000);
};
// el empujón al recibir un golpe va en la dirección correcta
const nearestFoeXMON = nearestFoeX;
nearestFoeX = function () {
  if (area == 9 && CD.golpe != null) { const g = CD.golpe; CD.golpe = null; return g; }
  return nearestFoeXMON();
};

/* ---------- 28f-campo-de-noche.js ---------- */
/* =====================================================================
   EL LLANO DE LOS SUSURROS (área 9, del otro lado del pilar)
   · Cielo: las NUBES DE NOCHE con la luna (zn1-zn4), en parallax:
     cuando Smara camina, cada capa se corre a distinta velocidad.
   · Lomas, un ranchito lejos, cercos y pasto alto (también en parallax).
   · Suelo de pasto color tierra morada con PASTO BRILLANTE BLANCO que
     se mece con el viento y se aparta cuando Smara pasa.
   · Abajo, el AGUA con el reflejo de todo.
   · El ESPANTO (sprites de character.zip): una sombra con jaula en la
     cabeza y una lanza; barre el suelo con un tajo blanco (¡saltalo!).
   · Ambiente del campo: viento, grillos, ranas, un búho... y SUSURROS.
   ===================================================================== */
const LL = { suelo: 310, agua: 336, sueloY: 296 };
ZN[9] = ['EL LLANO DE LOS SUSURROS', 'un mundo que no es real'];

/* ---------------- capas pre-dibujadas ---------------- */
const LLC = {};
function cnArmar() {
  if (LLC.ok) return;
  LLC.ok = 1;
  const R = (() => { let s = 77; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  // cada capa guarda solo la franja que usa (y0..y1): dibujar pixeles vacíos también cuesta
  const capa = (w, y0, y1, f) => { const c = document.createElement('canvas'); c.width = w; c.height = y1 - y0; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.translate(0, -y0); f(x); c.y = y0; return c; };
  // brillo redondo pre-dibujado (luna, halos, ojos): más barato que un degradado nuevo en cada cuadro
  const halo = (r, c0, c1) => { const c = document.createElement('canvas'); c.width = c.height = r * 2; const x = c.getContext('2d'), g = x.createRadialGradient(r, r, 0, r, r, r); g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(0, 0, r * 2, r * 2); return c; };
  LLC.luna = halo(44, 'rgba(120,220,255,.25)', 'rgba(80,120,255,0)');
  LLC.halo = halo(70, 'rgba(120,100,170,.22)', 'rgba(60,40,100,0)');
  LLC.ojo = halo(10, 'rgba(255,60,60,.8)', 'rgba(255,0,0,0)');
  // pasto blanco: cada hoja (alto x inclinación x capa) ya dibujada en una hoja de sprites
  const PA = document.createElement('canvas');
  PA.width = 17 * 20; PA.height = 2 * 13 * 13;
  const pa = PA.getContext('2d');
  for (let cp = 0; cp < 2; cp++)
    for (let h = 0; h < 13; h++)
      for (let L = -8; L <= 8; L++)
        for (let j = 0; j < h; j++) {
          const k = j / h;
          pa.fillStyle = k > 0.7 ? '#ffffff' : k > 0.35 ? '#e4dcff' : cp ? '#a596d6' : '#8e7cc4';
          pa.fillRect((L + 8) * 20 + 10 + Math.round(L * k * k), (cp * 13 + h) * 13 + 12 - j, 1, 1);
        }
  LLC.pasto = PA;
  // lomas lejanas con un ranchito y árboles de ceiba
  LLC.lomas = capa(1200, 150, 300, c => {
    const alto = x => 250 - 22 * Math.sin(x * 0.006) - 12 * Math.sin(x * 0.017 + 1) - 5 * Math.sin(x * 0.05);
    for (let x = 0; x < 1200; x++) {
      const y = Math.round(alto(x));
      c.fillStyle = '#1d1430'; c.fillRect(x, y, 1, H - y);
      c.fillStyle = '#2c1f45'; c.fillRect(x, y, 1, 1);
    }
    // matorrales redondos sobre las lomas
    for (const cx of [140, 520, 930]) {
      const b = Math.round(alto(cx));
      c.fillStyle = '#181026';
      for (let i = 0; i < 90; i++) { const a = R() * Math.PI, r = R() * 16; c.fillRect(Math.round(cx + Math.cos(a) * r * 1.6), Math.round(b + 2 - Math.sin(a) * r * 0.7), 3, 2); }
    }
    // ranchito con la ventana encendida
    const rx = 720, rb = Math.round(alto(rx));
    c.fillStyle = '#140d22'; c.fillRect(rx, rb - 12, 22, 12);
    for (let k = 0; k < 8; k++) c.fillRect(rx - 3 + k, rb - 12 - k, 28 - k * 2, 1);
    c.fillStyle = '#ffcf6a'; c.fillRect(rx + 14, rb - 8, 3, 3);
  });
  // ruinas del campo: casas de adobe, una ermita, un pozo y muros de piedra
  LLC.ruinas = capa(1600, 170, 300, c => cnRuinas(c, R));
  // pasto alto (más cerca)
  LLC.cerco = capa(900, 252, 300, c => {
    for (let x = 0; x < 900; x++) {
      const y = Math.round(286 + 4 * Math.sin(x * 0.02) + 2 * Math.sin(x * 0.07));
      c.fillStyle = '#24183a'; c.fillRect(x, y, 1, H - y);
    }
    for (let i = 0; i < 1400; i++) { const x = R() * 900, h = 3 + R() * 10, y = 288 + 4 * Math.sin(x * 0.02); c.fillStyle = R() < 0.5 ? '#2e2046' : '#382858'; c.fillRect(Math.round(x), Math.round(y - h), 1, Math.round(h)); }
  });
  // el suelo del área 6 pintado de tierra morada
  const s = document.createElement('canvas');
  s.width = 320; s.height = 20;
  const sx = s.getContext('2d');
  sx.drawImage(img.nfs, 0, 0);
  const d = sx.getImageData(0, 0, 320, 20), P = [[26, 12, 32], [38, 18, 46], [52, 26, 62], [68, 36, 78], [86, 48, 98], [108, 64, 120], [138, 88, 150]];
  for (let i = 0; i < d.data.length; i += 4) {
    if (!d.data[i + 3]) continue;
    const L = (d.data[i] + d.data[i + 1] + d.data[i + 2]) / 3, k = Math.max(0, Math.min(P.length - 1, Math.round(((L - 40) / 67) * (P.length - 1))));
    d.data[i] = P[k][0]; d.data[i + 1] = P[k][1]; d.data[i + 2] = P[k][2];
  }
  sx.putImageData(d, 0, 0);
  LLC.suelo = s;
  // brillito para las puntas del pasto blanco
  const g = document.createElement('canvas');
  g.width = g.height = 12;
  const gx = g.getContext('2d'), gr = gx.createRadialGradient(6, 6, 0, 6, 6, 6);
  gr.addColorStop(0, 'rgba(235,225,255,.55)');
  gr.addColorStop(1, 'rgba(235,225,255,0)');
  gx.fillStyle = gr; gx.fillRect(0, 0, 12, 12);
  LLC.brillo = g;
}
const cnHash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ---------------- el fondo (va detrás de Smara) ---------------- */
function cnFondo(t) {
  cnArmar();
  t = tMundo();
  ctx.fillStyle = '#1b1430';
  ctx.fillRect(0, 296, W, 40);
  // nubes de noche: estrellas, luna, nubes de atrás y de adelante.
  // [capa, parallax, viento, franja de la imagen que tiene algo (y0, alto, x0, ancho)]
  const top = -20, cap = [['zn1', 0.03, 0, 0, 324, 0, 576], ['zn2', 0.01, 0, 79, 21, 246, 21], ['zn3', 0.1, 1.5, 53, 271, 0, 576], ['zn4', 0.2, 3.5, 127, 197, 0, 576]];
  for (const [k, f, v, y0, h, x0, w] of cap) {
    const im = img[k];
    if (!im) continue;
    const o = (((cam * f + t * v) % 576) + 576) % 576;
    for (let x = -o; x < W; x += 576) if (x + x0 + w > 0 && x + x0 < W) ctx.drawImage(im, x0, y0, w, h, Math.round(x) + x0, top + y0, w, h);
    if (k == 'zn2') { // la luna brilla
      const mx = ((256 - cam * f) % 576 + 576) % 576, my = top + 89, r = Math.round(40 + Math.sin(t * 0.8) * 3);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (const xl of [mx, mx - 576, mx + 576]) if (xl > -60 && xl < W + 60) ctx.drawImage(LLC.luna, Math.round(xl - r), my - r, r * 2, r * 2);
      ctx.restore();
    }
  }
  // estrellitas que titilan
  for (let i = 0; i < 30; i++) {
    const x = (((i * 97.3 - cam * 0.03) % W) + W) % W, y = (i * 37.1) % 170;
    if (Math.sin(t * 1.7 + i * 2.1) > 0.8) { ctx.fillStyle = 'rgba(235,240,255,.9)'; ctx.fillRect(Math.round(x), Math.round(y), 1, 1); ctx.fillStyle = 'rgba(235,240,255,.3)'; ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1); ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3); }
  }
  // lomas, ruinas y pasto alto en parallax
  for (const [c, f] of [[LLC.lomas, 0.3], [LLC.ruinas, 0.42], [LLC.cerco, 0.55]]) {
    const w = c.width, o = Math.round(((cam * f) % w + w) % w);
    for (let x = -o; x < W; x += w) ctx.drawImage(c, x, c.y);
  }
  // neblina baja
  for (let i = 0; i < 7; i++) {
    const x = ((((i * 173 + t * (6 + i)) - cam * 0.7) % (W + 300)) + W + 300) % (W + 300) - 150;
    ctx.fillStyle = 'rgba(160,140,210,' + (0.05 + 0.02 * Math.sin(t + i)) + ')';
    ctx.fillRect(Math.round(x), 280 + (i % 3) * 5, 160 + (i % 4) * 30, 4);
    ctx.fillRect(Math.round(x) + 20, 284 + (i % 3) * 5, 110, 3);
  }
  // suelo de tierra morada (se repite en espejo como en el área 6)
  const c0 = Math.floor(cam / 640);
  for (let i = c0; i <= c0 + 2; i++) {
    const x = i * 640 - Math.round(cam);
    if (x > W || x + 640 < 0) continue;
    ctx.save();
    if (i % 2) { ctx.translate(x + 640, LL.sueloY); ctx.scale(-1, 1); } else ctx.translate(x, LL.sueloY);
    ctx.drawImage(LLC.suelo, 0, 0, 320, 20, 0, 0, 640, 40);
    ctx.restore();
  }
  cnPlataformas(t);
  cnPasto(t, 0);
}

/* ---------------- estructuras del fondo ---------------- */
// colores: pared, sombra, borde que alumbra la luna, techo, hueco oscuro, luz de vela
const RU = { pa: '#2b1f3e', so: '#1f1630', lu: '#4d3d6b', te: '#3a2036', te2: '#2a1628', hu: '#110a1b', ve: '#ffcf6a' };
function cnRuinas(c, R) {
  const B = 292; // donde se apoyan (el pasto alto les tapa la base)
  const rect = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  // pared de adobe con grietas y ladrillos marcados
  const pared = (x, y, w, h) => {
    rect(x, y, w, h, RU.pa);
    rect(x, y, 2, h, RU.lu); // la luna alumbra el lado izquierdo
    rect(x + w - 3, y, 3, h, RU.so);
    for (let i = 0; i < w * h / 60; i++) rect(x + 3 + R() * (w - 8), y + 2 + R() * (h - 4), 3 + R() * 4, 1, R() < 0.5 ? RU.so : '#33264a');
    for (let k = 0; k < 2; k++) { let gx = x + 6 + R() * (w - 12), gy = y + R() * 6; for (let j = 0; j < 8; j++) { rect(gx, gy, 1, 2, RU.hu); gx += R() < 0.5 ? -1 : 1; gy += 2; } }
  };
  // techo de tejas a dos aguas (si "roto", le falta un pedazo)
  const techo = (x, y, w, alto, roto) => {
    for (let j = 0; j < alto; j++) {
      const a = x - 4 + j * (w / 2 + 4) / alto, b = x + w + 4 - j * (w / 2 + 4) / alto;
      for (let xx = a; xx < b; xx += 1) {
        if (roto && xx > x + w * 0.55 && xx < x + w * 0.8 && j < alto - 3) continue;
        rect(xx, y - j, 1, 1, (Math.floor(xx / 3) + j) % 2 ? RU.te : RU.te2);
      }
    }
    for (let xx = x - 4; xx < x + w / 2; xx++) rect(xx, y - Math.round((xx - x + 4) * alto / (w / 2 + 4)), 1, 1, RU.lu);
  };
  const casa = (x, w, h, roto, vela) => {
    const y = B - h;
    pared(x, y, w, h);
    rect(x + w * 0.2, B - 20, 10, 20, RU.hu); // puerta
    rect(x + w * 0.2 - 1, B - 21, 12, 1, RU.lu);
    rect(x + w * 0.62, y + 8, 9, 8, vela ? '#2a1a10' : RU.hu); // ventana
    if (vela) { rect(x + w * 0.62 + 3, y + 11, 3, 4, RU.ve); rect(x + w * 0.62 + 4, y + 10, 1, 1, '#fff2c0'); }
    rect(x + w * 0.62 + 4, y + 8, 1, 8, RU.so);
    techo(x, y, w, Math.round(w / 3.2), roto);
  };
  // ermita de pueblo: fachada con espadaña y campana
  const ermita = (x) => {
    const w = 56, h = 46, y = B - h;
    pared(x + 50, B - 30, 64, 30); // la nave, atrás
    techo(x + 50, B - 30, 64, 14, false);
    pared(x, y, w, h);
    for (let j = 0; j < 18; j++) rect(x + j * 1.5, y - j, w - j * 3, 1, j % 3 ? RU.pa : RU.lu); // frontón
    // espadaña con la campana
    rect(x + w / 2 - 9, y - 34, 18, 18, RU.pa);
    rect(x + w / 2 - 9, y - 34, 2, 18, RU.lu);
    rect(x + w / 2 - 5, y - 30, 10, 10, RU.hu);
    rect(x + w / 2 - 3, y - 27, 6, 6, '#6b5a3a'); rect(x + w / 2 - 1, y - 21, 2, 2, '#6b5a3a');
    rect(x + w / 2 - 11, y - 36, 22, 2, RU.lu);
    // puerta en arco y ventana redonda
    rect(x + w / 2 - 7, B - 22, 14, 22, RU.hu);
    for (let i = 0; i < 4; i++) rect(x + w / 2 - 6 + i, B - 23 - i, 12 - i * 2, 1, RU.hu);
    rect(x + w / 2 - 3, y + 6, 6, 6, '#2a1a10'); rect(x + w / 2 - 1, y + 8, 2, 2, RU.ve);
  };
  // pozo de piedra con su techito
  const pozo = (x) => {
    rect(x, B - 12, 26, 12, RU.pa); rect(x, B - 12, 26, 2, RU.lu);
    for (let i = 0; i < 6; i++) rect(x + 1 + i * 4, B - 9 + (i % 2) * 4, 3, 2, RU.so);
    rect(x + 2, B - 30, 2, 18, RU.so); rect(x + 22, B - 30, 2, 18, RU.so);
    for (let j = 0; j < 6; j++) rect(x - 2 + j, B - 30 - j, 30 - j * 2, 1, j % 2 ? RU.te : RU.te2);
    rect(x + 12, B - 28, 1, 10, '#6a6070'); rect(x + 10, B - 18, 5, 4, '#3a3040');
  };
  // muro de piedras caído
  const muro = (x, w) => {
    for (let i = 0; i < w; i += 7) {
      const h = 8 + Math.round(10 * Math.abs(Math.sin(i * 0.05)) * (R() * 0.5 + 0.5));
      for (let y = 0; y < h; y += 5) rect(x + i + ((y / 5) % 2) * 3, B - y - 5, 6, 4, (i + y) % 3 ? RU.pa : '#33264a');
      rect(x + i, B - h - 1, 6, 1, RU.lu);
    }
    for (let i = 0; i < 6; i++) rect(x + w + 4 + R() * 30, B - 4 - R() * 3, 5, 4, RU.pa); // piedras sueltas
  };
  const roca = (x, w, h) => { for (let j = 0; j < h; j++) { const k = Math.sin((j / h) * Math.PI * 0.5); rect(x + (1 - k) * w * 0.3, B - j, w - (1 - k) * w * 0.6 + j % 2, 1, j > h - 3 ? RU.lu : RU.pa); } };
  casa(110, 74, 36, true, false);
  pozo(260);
  ermita(470);
  muro(700, 120);
  casa(940, 60, 30, false, true);
  roca(1080, 40, 16);
  roca(1110, 24, 10);
  casa(1260, 70, 34, true, false);
  muro(1400, 70);
}

/* ---------------- plataformas de tierra morada ---------------- */
// [x, y donde se pisa, ancho]. Smara salta ~90 px: ninguna queda a más de 60 del piso o de otra.
const LL_PLAT = [
  [300, 252, 96],
  [470, 200, 80],
  [640, 250, 112],
  [820, 192, 80],
  [960, 248, 96],
  [1150, 200, 96],
  [1290, 252, 80],
];
function cnPlatCanvas(w) {
  LLC.plat = LLC.plat || {};
  if (LLC.plat[w]) return LLC.plat[w];
  const c = document.createElement('canvas');
  c.width = w + 8; c.height = 40;
  const x = c.getContext('2d');
  let s = w * 31;
  const R = () => (s = (s * 16807) % 2147483647) / 2147483647;
  // terrón de tierra morada que se angosta para abajo
  for (let j = 0; j < 22; j++) {
    const m = Math.round(Math.pow(j / 22, 1.6) * w * 0.35) + Math.round(R() * 2);
    x.fillStyle = j < 3 ? '#6c4078' : j < 7 ? '#563062' : j < 14 ? '#44244e' : '#341a3e';
    x.fillRect(4 + m, 6 + j, w - m * 2, 1);
  }
  for (let i = 0; i < w / 3; i++) { x.fillStyle = R() < 0.5 ? '#26122e' : '#8a5896'; x.fillRect(Math.round(6 + R() * (w - 8)), Math.round(10 + R() * 10), 2, 1); }
  // raíces colgando
  for (let k = 10; k < w - 6; k += 9 + Math.floor(R() * 8)) { const l = 3 + Math.floor(R() * 8); x.fillStyle = '#2a1830'; x.fillRect(4 + k, 26, 1, l); }
  // borde de pasto y florecitas blancas
  for (let i = 0; i < w; i++) { x.fillStyle = (i * 7) % 5 ? '#8a5896' : '#a596d6'; x.fillRect(4 + i, 5 - ((i * 13) % 3 == 0 ? 1 : 0), 1, 2); }
  for (let i = 6; i < w - 4; i += 5 + Math.floor(R() * 7)) { const h = 2 + Math.floor(R() * 4); x.fillStyle = '#e4dcff'; x.fillRect(4 + i, 5 - h, 1, h); x.fillStyle = '#ffffff'; x.fillRect(4 + i, 5 - h, 1, 1); }
  return (LLC.plat[w] = c);
}
function cnPlataformas(t) {
  for (const pl of platforms) {
    const x0 = Math.round(pl.x - cam);
    if (x0 > W + 20 || x0 + pl.w < -20) continue;
    const bob = 0; // quietas: se pisan firme
    ctx.fillStyle = 'rgba(10,4,16,.3)';
    ctx.fillRect(x0 + 10, GROUND - 1, pl.w - 20, 2); // sombra en el suelo
    ctx.drawImage(cnPlatCanvas(pl.w), x0 - 4, pl.y - 6 + bob);
    // unas chispitas blancas que caen de las raíces
    const k = Math.floor(t * 2 + pl.x) % 4;
    ctx.fillStyle = 'rgba(228,220,255,.6)';
    ctx.fillRect(x0 + 12 + ((pl.x + k * 23) % (pl.w - 20)), pl.y + 24 + ((t * 20 + pl.x) % 30), 1, 1);
  }
}

/* ---------------- pasto blanco brillante ---------------- */
// capa 0: detrás de Smara (raíz en el suelo) · capa 1: adelante (más bajito y ralo)
function cnPasto(t, capa) {
  // calidad (35-opciones.js): BAJO sin pasto de adelante y más ralo · ULTRA más tupido
  const q = GFX.n;
  if (capa && q == 0) return;
  const paso = capa ? (q == 3 ? 5 : 7) : q == 0 ? 6 : q == 3 ? 2 : 3, y0 = capa ? LL.suelo + 9 : LL.suelo + 2;
  const i0 = Math.floor(cam / paso) - 2, i1 = Math.floor((cam + W) / paso) + 2;
  const brillos = [];
  for (let i = i0; i <= i1; i++) {
    const r = cnHash(i * (capa ? 3.7 : 1));
    if (r < (capa ? 0.45 : 0.25)) continue;
    const wx = i * paso + Math.floor(r * paso), x = Math.round(wx - cam);
    const h = capa ? 4 + Math.floor(r * 6) : 3 + Math.floor(r * 8);
    // el viento y Smara al pasar
    let lean = Math.sin(t * 1.8 + wx * 0.03) * 1.6 + Math.sin(t * 4.1 + i) * 0.4;
    const dx = wx - p.x;
    if (Math.abs(dx) < 14 && p.y > GROUND - 14) lean += Math.sign(dx || 1) * (14 - Math.abs(dx)) * 0.45;
    const L = Math.max(-8, Math.min(8, Math.round(lean)));
    ctx.drawImage(LLC.pasto, (L + 8) * 20, (capa * 13 + h) * 13, 20, 13, x - 10, y0 - 13, 20, 13);
    if (r > 0.82) brillos.push([x + lean, y0 - h]);
  }
  if (q < 2) return; // los brillitos de las puntas, desde ALTO
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 0.7 + Math.sin(t * 2) * 0.2;
  for (const [x, y] of brillos) ctx.drawImage(LLC.brillo, Math.round(x - 6), Math.round(y - 6));
  ctx.restore();
}

/* ---------------- luciérnagas ---------------- */
function cnLuciernagas(t) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const n = [0, 8, 16, 28][GFX.n];
  for (let i = 0; i < n; i++) {
    const wx = i * 141 + Math.sin(t * 0.4 + i) * 40, x = ((((wx - cam * 0.9) % (W + 80)) + W + 80) % (W + 80)) - 40;
    const y = 230 + (i * 23) % 70 + Math.sin(t * 0.9 + i * 1.7) * 12, a = Math.max(0, Math.sin(t * 1.3 + i * 2.3));
    if (a < 0.05) continue;
    ctx.globalAlpha = a;
    ctx.drawImage(LLC.brillo, Math.round(x - 6), Math.round(y - 6));
    ctx.fillStyle = '#e8ffb0';
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  }
  ctx.restore();
}

/* ---------------- el agua con el reflejo de todo ---------------- */
function cnAgua(t) {
  t = tMundo();
  const wt = LL.agua, hh = H - wt;
  let g = ctx.createLinearGradient(0, wt, 0, H);
  g.addColorStop(0, '#231a3c'); g.addColorStop(1, '#0b0816');
  ctx.fillStyle = g;
  ctx.fillRect(0, wt, W, hh);
  ctx.save();
  ctx.beginPath(); ctx.rect(0, wt, W, hh); ctx.clip();
  ctx.globalAlpha = 0.6;
  const B0 = grabBand(Math.max(0, wt - hh - 2), wt);
  for (let y = 0; y < hh; y += 2) {
    const sy = wt - 2 - y;
    if (sy < 0) break;
    const o = Math.round(Math.sin(t * 1.6 + y * 0.35 + cam * 0.01) * (1 + y * 0.04)) * 2;
    ctx.drawImage(RFC, 0, sy * 2 - B0, W * 2, 4, o, wt + y, W, 2);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  g = ctx.createLinearGradient(0, wt, 0, H);
  g.addColorStop(0, 'rgba(30,20,50,.12)'); g.addColorStop(1, 'rgba(8,6,20,.55)');
  ctx.fillStyle = g;
  ctx.fillRect(0, wt, W, hh);
  ctx.fillStyle = 'rgba(210,200,255,.3)';
  for (let i = 0; i < 34; i++) {
    const x = (((i * 97 + t * (8 + (i % 5) * 3) - cam * 0.5) % W) + W) % W, y = wt + 4 + ((i * 31) % (hh - 6));
    ctx.fillRect(Math.round(x / 2) * 2, Math.round(y / 2) * 2, 6 + (i % 4) * 2, 2);
  }
  ctx.fillStyle = '#140e22';
  ctx.fillRect(0, wt, W, 2);
}

/* =====================================================================
   EL ESPANTO (character.zip)
   ===================================================================== */
const ESPA = {
  fw: 312, fh: 144, ax: 96, fps: 17, n: 29, vida: 120,
  fila: { quieto: 0, aparece: 0, camina: 1, ataca: 2, muere: 0 },
  tajos: [7, 13], // cuadros del ataque donde sale el tajo blanco
  // cuando Smara pasa por "x", aparece uno en "en"
  oleadas: [{ x: 200, en: 440 }, { x: 1120, en: 1340 }],
};
function espNuevo(x) {
  LL.esp.push({ x, face: -1, hp: ESPA.vida, st: 'aparece', t: 0, cd: 1.2, flash: 0, kb: 0, golpes: {} });
  cnSusurro(1.6, 0.09); // aparece susurrando
  cdTono(300, 120, 1.2, 'sine', 0.05);
}
function espCuadro(e) {
  if (e.st == 'ataca') return Math.min(ESPA.n - 1, Math.floor(e.t * ESPA.fps));
  return Math.floor(e.t * ESPA.fps) % ESPA.n;
}
function espTick(dt) {
  LL.esp = LL.esp || [];
  LL.ola = LL.ola || 0;
  const O = ESPA.oleadas[LL.ola];
  if (O && state == 'play' && p.x > O.x && !LL.esp.some(e => e.st != 'muere') && !(CD.mons || []).some(m => m.st != 'muere' && m.st != 'montado')) { LL.ola++; espNuevo(O.en); }
  for (const e of LL.esp) {
    e.t += dt; e.flash -= dt; e.cd -= dt;
    const dx = p.x - e.x, ad = Math.abs(dx);
    if (e.st == 'aparece') {
      if (Math.random() < 0.5) pfx(e.x + rnd(-30, 30), GROUND - rnd(0, 130), rnd(-10, 10), rnd(-50, -10), rnd(0.4, 0.9), '#b8a8e0', 1, -20);
      if (e.t > 1.2) { e.st = 'quieto'; e.t = 0; }
      continue;
    }
    if (e.st == 'muere') { if (Math.random() < 0.8) pfx(e.x + rnd(-24, 24), GROUND - rnd(0, 130), rnd(-10, 10), rnd(-80, -20), rnd(0.5, 1), Math.random() < 0.5 ? '#e4dcff' : '#2a2038', 2, -30); continue; }
    if (e.st != 'ataca') e.face = dx < 0 ? -1 : 1;
    if (e.st == 'quieto' || e.st == 'camina') {
      if (e.kb > 0) { e.kb -= dt; e.x -= e.face * 90 * dt; }
      else if (ad > 120) { if (e.st != 'camina') { e.st = 'camina'; e.t = 0; } e.x += e.face * 42 * dt; }
      else if (e.st != 'quieto') { e.st = 'quieto'; e.t = 0; }
      if (ad < 200 && e.cd <= 0) {
        e.st = 'ataca'; e.t = 0; e.golpes = {};
        cdTono(900, 1400, 0.25, 'triangle', 0.05); // aviso
        cnSusurro(0.6, 0.07);
      }
    } else if (e.st == 'ataca') {
      const k = espCuadro(e);
      for (const tk of ESPA.tajos) {
        if (k >= tk && !e.golpes[tk]) {
          e.golpes[tk] = 1;
          cdRuido(0.3, 2600, 0.18, 0.7);
          cdTono(1800, 300, 0.25, 'sawtooth', 0.04);
          SHK = Math.max(SHK, 3);
          // el tajo barre el suelo: de un poco atrás hasta bien adelante
          const rel = (p.x - e.x) * e.face;
          if (rel > -85 && rel < 210 && p.y > GROUND - 38 && p.inv <= 0 && p.dash <= 0) { CD.golpe = e.x; hurt(13); }
        }
      }
      if (e.t >= ESPA.n / ESPA.fps) { e.st = 'quieto'; e.t = 0; e.cd = 1.3 + Math.random() * 0.8; }
    }
    e.x = Math.max(40, Math.min(LEVEL - 40, e.x));
  }
  // golpes de Smara
  const a = p.atk;
  if (a && a.hit && LL.ultAtk !== a) {
    LL.ultAtk = a;
    const hx = p.x + a.f * 42;
    for (const e of LL.esp) {
      if (e.st == 'aparece' || e.st == 'muere') continue;
      if (golpeToca(a, e.x - 26, GROUND - 140, e.x + 26, GROUND)) espDanio(e, sdmg(a), 0, a.c == 2 || a.c >= 3);
    }
  }
  LL.esp = LL.esp.filter(e => !(e.st == 'muere' && e.t > 1.6));
}
// daño al Espanto (de la guadaña de Smara o de la bestia montada); "emp" lo empuja hacia ese lado
function espDanio(e, d, emp, fuerte) {
  if (e.st == 'muere' || e.st == 'aparece') return;
  e.hp -= d; e.flash = 0.09; e.kb = 0.1;
  if (emp) e.x += emp * 22;
  sfx('hit');
  hitFX(e.x, GROUND - 60, !!fuerte);
  for (let i = 0; i < 8; i++) pfx(e.x, GROUND - 60, rnd(-140, 140), rnd(-160, 20), rnd(0.2, 0.4), i % 2 ? '#e4dcff' : '#2a2038', 2, 300);
  if (e.hp <= 0) {
    e.st = 'muere'; e.t = 0;
    sfx('boom'); SHK = Math.max(SHK, 5);
    cnSusurro(1.4, 0.1);
    pick.push({ x: e.x, id: 'nac', y: GROUND, got: false });
  }
}

/* ---------------- CHOQUE: los enemigos empujan a Smara para atrás ---------------- */
// cuerpo de cada enemigo: centro (corrido hacia donde mira), medio ancho y alto
function cnCuerpos() {
  const L = [];
  for (const m of CD.mons || []) if (m.st != 'muere' && m.st != 'nace' && m.st != 'noqueado' && m.st != 'montado') L.push({ o: m, cx: m.x + m.face * 8, hw: m.st == 'embiste' ? 40 : 34, h: 56 });
  for (const e of LL.esp || []) if (e.st != 'muere' && e.st != 'aparece') L.push({ o: e, cx: e.x, hw: 20, h: 56 });
  return L;
}
function cnEmpuje(dt) {
  LL.empT = (LL.empT || 0) - dt;
  const montada = typeof MONTA != 'undefined' && MONTA;
  for (const c of cnCuerpos()) {
    const dx = p.x - c.cx, lim = c.hw + 8;
    if (Math.abs(dx) >= lim || p.y < GROUND - c.h) continue; // saltando por encima no choca
    const lado = dx == 0 ? -(c.o.face || 1) : Math.sign(dx);
    if (montada) {
      // montada en la bestia, la que empuja es ella
      c.o.x -= lado * Math.min(lim - Math.abs(dx), 4);
      continue;
    }
    p.x = c.cx + lado * lim; // no se atraviesan
    if (LL.empT <= 0) {
      LL.empT = 0.35;
      p.vx = lado * 280; // ¡empujón para atrás!
      p.vy = Math.min(p.vy, -110);
      p.on = false;
      p.kb = 0.18;
      p.dash = 0;
      animKick(0.82, 1.12);
      puff(p.x, p.y, 4, lado);
      cdRuido(0.1, 300, 0.12, 2);
    }
  }
}

function espDibujar(t) {
  if (!img.espanto) return;
  for (const e of LL.esp || []) {
    const x = Math.round(e.x - cam);
    if (x < -260 || x > W + 260) continue;
    const fila = ESPA.fila[e.st] || 0, k = espCuadro(e);
    // un halo pálido para que la sombra se recorte contra la noche
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(LLC.halo, x - 70, GROUND - 140);
    ctx.restore();
    ctx.save();
    ctx.translate(x, GROUND);
    ctx.scale(e.face, 1);
    if (e.st == 'aparece') ctx.globalAlpha = Math.min(1, e.t / 1.1) * (Math.random() < 0.15 ? 0.5 : 1);
    if (e.st == 'muere') ctx.globalAlpha = Math.max(0, 1 - e.t / 1.4);
    if (e.flash > 0) ctx.filter = 'brightness(5)';
    ctx.drawImage(img.espanto, k * ESPA.fw, fila * ESPA.fh, ESPA.fw, ESPA.fh, -ESPA.ax, -ESPA.fh, ESPA.fw, ESPA.fh);
    ctx.restore();
    // antes del tajo le brillan los ojos de rojo
    if (e.st == 'ataca' && k < 7) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(LLC.ojo, x + e.face * 2 - 10, GROUND - 102);
      ctx.restore();
    }
    // barrita de vida
    if (e.st != 'aparece' && e.st != 'muere') {
      const bx = x - 20, by = GROUND - 152;
      ctx.fillStyle = '#000a'; ctx.fillRect(bx - 1, by - 1, 42, 4);
      ctx.fillStyle = '#b8a8e0'; ctx.fillRect(bx, by, Math.round(40 * Math.max(0, e.hp) / ESPA.vida), 2);
    }
  }
}

/* =====================================================================
   SONIDOS DEL CAMPO (todo sintetizado)
   ===================================================================== */
const LLA = { on: false, src: [], g: null, prox: {} };
// un solo buffer de ruido (4 s) que comparten el viento y los susurros
function cnRuidoBuf() {
  if (LLA.ruido && LLA.ruido.sampleRate == AC.sampleRate) return LLA.ruido;
  const seg = 4, b = AC.createBuffer(1, Math.ceil(AC.sampleRate * seg), AC.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return (LLA.ruido = b);
}
function cnSalida(pan) {
  const g = AC.createGain();
  if (AC.createStereoPanner) { const pn = AC.createStereoPanner(); pn.pan.value = pan; g.connect(pn); pn.connect(LLA.g || MG); }
  else g.connect(LLA.g || MG);
  return g;
}
function cnAmbEmpezar() {
  if (!AC || LLA.on) return;
  LLA.on = true;
  const t = AC.currentTime;
  LLA.g = AC.createGain();
  LLA.g.gain.setValueAtTime(0.0001, t);
  LLA.g.gain.exponentialRampToValueAtTime(1, t + 2.5);
  LLA.g.connect(MG);
  // viento: ruido grave que sube y baja
  const s = AC.createBufferSource(); s.buffer = cnRuidoBuf(); s.loop = true;
  const f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 420;
  const vg = AC.createGain(); vg.gain.value = 0.05;
  const lfo = AC.createOscillator(), lg = AC.createGain(); lfo.frequency.value = 0.12; lg.gain.value = 0.035;
  lfo.connect(lg); lg.connect(vg.gain);
  const lf2 = AC.createOscillator(), l2 = AC.createGain(); lf2.frequency.value = 0.07; l2.gain.value = 180;
  lf2.connect(l2); l2.connect(f.frequency);
  s.connect(f); f.connect(vg); vg.connect(LLA.g);
  s.start(t); lfo.start(t); lf2.start(t);
  LLA.src = [s, lfo, lf2];
  LLA.prox = { grillo: 0, rana: 1.5, buho: 6, susurro: 3, perro: 14, vaca: 22 };
}
function cnAmbParar() {
  if (!LLA.on) return;
  LLA.on = false;
  const t = AC.currentTime, g = LLA.g;
  g.gain.cancelScheduledValues(t);
  g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
  for (const s of LLA.src) s.stop(t + 0.9);
  setTimeout(() => g.disconnect(), 1200);
  LLA.src = [];
  LLA.g = null;
}
function cnNota(f0, f1, d, ty, gan, pan, dl) {
  const t = AC.currentTime + (dl || 0), o = AC.createOscillator(), g = cnSalida(pan);
  o.type = ty; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + d);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gan, t + Math.min(0.02, d / 3)); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g); o.start(t); o.stop(t + d + 0.05);
}
// grillo: tres o cuatro "cri" muy agudos
function cnGrillo() {
  // un solo oscilador con el volumen en pulsos (antes era uno por cada "cri")
  const f = 4300 + Math.random() * 700, n = 3 + Math.floor(Math.random() * 3), gan = 0.006 + Math.random() * 0.008;
  const t = AC.currentTime, o = AC.createOscillator(), g = cnSalida(Math.random() * 1.6 - 0.8);
  o.frequency.value = f;
  g.gain.setValueAtTime(0, t);
  for (let i = 0; i < n; i++) { const u = t + i * 0.06; g.gain.setValueAtTime(0, u); g.gain.linearRampToValueAtTime(gan, u + 0.008); g.gain.linearRampToValueAtTime(0, u + 0.035); }
  o.connect(g); o.start(t); o.stop(t + n * 0.06 + 0.05);
}
// rana: "croc" grave
function cnRana() {
  const pan = Math.random() * 1.6 - 0.8, f = 110 + Math.random() * 60;
  for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) cnNota(f, f * 0.8, 0.09, 'square', 0.012, pan, i * 0.14);
}
// búho: "uu... uu-uu"
function cnBuho() {
  const pan = Math.random() * 1.4 - 0.7;
  cnNota(390, 350, 0.45, 'sine', 0.03, pan, 0);
  cnNota(380, 340, 0.25, 'sine', 0.025, pan, 0.7);
  cnNota(380, 330, 0.5, 'sine', 0.025, pan, 1.0);
}
// un perro ladra muy lejos
function cnPerroLejos() {
  const pan = Math.random() < 0.5 ? -0.8 : 0.8;
  for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) { cnNota(520, 300, 0.12, 'sawtooth', 0.006, pan, i * 0.35); cnNota(700, 380, 0.08, 'square', 0.003, pan, i * 0.35); }
}
// una vaca muge a lo lejos
function cnVaca() {
  const pan = Math.random() * 1.2 - 0.6, t = AC.currentTime, o = AC.createOscillator(), f = AC.createBiquadFilter(), g = cnSalida(pan);
  o.type = 'sawtooth'; o.frequency.setValueAtTime(140, t); o.frequency.linearRampToValueAtTime(175, t + 0.5); o.frequency.linearRampToValueAtTime(120, t + 1.6);
  f.type = 'lowpass'; f.frequency.setValueAtTime(300, t); f.frequency.linearRampToValueAtTime(700, t + 0.6); f.frequency.linearRampToValueAtTime(250, t + 1.6);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.02, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.7);
  o.connect(f); f.connect(g); o.start(t); o.stop(t + 1.8);
}
// SUSURROS: ruido que pasa por "vocales" que cambian, con eses, de un lado al otro
function cnSusurro(dur, gan) {
  if (!AC || muted) return;
  dur = dur || 1 + Math.random() * 1.5;
  gan = gan || 0.05 + Math.random() * 0.03;
  dur = Math.min(dur, 3.5);
  const t = AC.currentTime, s = AC.createBufferSource();
  s.buffer = cnRuidoBuf();
  const F = [[700, 1200], [400, 2300], [300, 900], [500, 1800], [600, 1000]];
  const f1 = AC.createBiquadFilter(), f2 = AC.createBiquadFilter(), hp = AC.createBiquadFilter();
  f1.type = f2.type = 'bandpass'; f1.Q.value = 7; f2.Q.value = 9; hp.type = 'highpass'; hp.frequency.value = 5200;
  const g = AC.createGain(), gs = AC.createGain(), salida = AC.createGain();
  let pn = null;
  if (AC.createStereoPanner) { pn = AC.createStereoPanner(); const a = Math.random() < 0.5 ? -1 : 1; pn.pan.setValueAtTime(a * 0.9, t); pn.pan.linearRampToValueAtTime(-a * 0.5, t + dur); salida.connect(pn); pn.connect(LLA.g || MG); }
  else salida.connect(LLA.g || MG);
  g.gain.setValueAtTime(0.0001, t); gs.gain.setValueAtTime(0.0001, t);
  // sílabas
  let u = t;
  while (u < t + dur - 0.1) {
    const sy = 0.09 + Math.random() * 0.14, v = F[Math.floor(Math.random() * F.length)];
    f1.frequency.setValueAtTime(v[0], u); f2.frequency.setValueAtTime(v[1], u);
    g.gain.linearRampToValueAtTime(gan, u + sy * 0.3); g.gain.linearRampToValueAtTime(gan * 0.15, u + sy);
    if (Math.random() < 0.35) { gs.gain.linearRampToValueAtTime(gan * 0.5, u + 0.03); gs.gain.linearRampToValueAtTime(0.0001, u + sy * 0.8); } // "sss"
    u += sy + (Math.random() < 0.2 ? 0.15 : 0.02);
  }
  g.gain.linearRampToValueAtTime(0.0001, u + 0.05);
  s.connect(f1); s.connect(f2); s.connect(hp);
  f1.connect(g); f2.connect(g); hp.connect(gs);
  g.connect(salida); gs.connect(salida);
  s.start(t, Math.random() * (4 - dur - 0.1)); s.stop(t + dur + 0.1);
}
function cnAmbTick(dt) {
  if (!AC) return;
  if (!LLA.on) cnAmbEmpezar();
  const P = LLA.prox;
  for (const k in P) P[k] -= dt;
  if (P.grillo <= 0) { cnGrillo(); P.grillo = 0.12 + Math.random() * 0.4; }
  if (P.rana <= 0) { cnRana(); P.rana = 2 + Math.random() * 5; }
  if (P.buho <= 0) { cnBuho(); P.buho = 10 + Math.random() * 10; }
  if (P.perro <= 0) { cnPerroLejos(); P.perro = 18 + Math.random() * 15; }
  if (P.vaca <= 0) { cnVaca(); P.vaca = 25 + Math.random() * 20; }
  // los susurros se hacen más seguidos mientras más avanza Smara
  if (P.susurro <= 0) { cnSusurro(); P.susurro = Math.max(2, 7 - p.x / 350) + Math.random() * 4; }
}

/* ---------------- conexión ---------------- */
const loadAreaCN = loadArea;
loadArea = function (n) {
  loadAreaCN(n);
  if (n == 9) { LL.esp = []; LL.ola = 0; platforms = LL_PLAT.map(([x, y, w]) => ({ x, y, w })); }
};
const updEnemiesCN = updEnemies;
updEnemies = function (dt) {
  updEnemiesCN(dt);
  if (area == 9) { espTick(dt); cnEmpuje(dt); }
};
const drawEnemiesCN = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesCN(t);
  if (area == 9) espDibujar(performance.now() / 1000);
};
// adelante de Smara: pasto, luciérnagas, el agua y, encima de todo, el globo del Cadejo
const drawPFXCN = drawPFX;
drawPFX = function () {
  drawPFXCN();
  if (area != 9) return;
  const t = performance.now() / 1000;
  cnPasto(tMundo(), 1);
  cnLuciernagas(t);
  cnAgua(t);
  cdGlobo();
};
let cnUlt = performance.now();
const drawCN = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.05, (now - cnUlt) / 1000);
  cnUlt = now;
  if (area == 9 && (state == 'play' || state == 'cdcine' || state == 'pause')) cnAmbTick(dt);
  else if (LLA.on) cnAmbParar();
  drawCN();
};

/* ---------- 29-despues-de-arlos.js ---------- */
/* ===== DESPUES DE ARLOS: «me siento rara», rayo del cielo que la absorbe ===== */
const easeIO = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
let SQ = { t: 0, r: 0, ps: [] };
function startSkyQ() {
  state = 'skyq';
  SQ = { t: 0, r: 0, ps: [] };
  p.victT = 0;
  p.vx = 0;
  p.atk = null;
  p.dash = 0;
  p.parry = 0;
  sfx('boom');
  flashW = 0.4;
}
function updSkyQ(dt) {
  const q = SQ;
  q.t += dt;
  const t = q.t;
  p.t += dt;
  if (t < 4.4 && p.y < GROUND) {
    p.vy += 1500 * dt;
    p.y = Math.min(GROUND, p.y + p.vy * dt);
    if (p.y >= GROUND) {
      p.y = GROUND;
      p.vy = 0;
      p.on = true;
    }
  }
  if (t > 1.2 && t < 4.4 && Math.random() < dt * 16)
    q.ps.push({
      x: p.x + (Math.random() - 0.5) * 18,
      y: p.y - Math.random() * 50,
      vx: (Math.random() - 0.5) * 16,
      vy: -18 - Math.random() * 26,
      l: 1,
      c: Math.random() < 0.5 ? '#3a2450' : '#8a6cff',
    });
  if (t > 3.5 && !q.s1) {
    q.s1 = 1;
    sfx('thunder');
  }
  if (t > 4.3 && !q.s2) {
    q.s2 = 1;
    sfx('boom');
    sfx('thunder');
    flashW = 0.8;
  }
  if (t > 4.4 && t < 7.4) {
    const k = Math.min(1, (t - 4.4) / 3);
    p.y = GROUND - easeIO(k) * 40;
    if (!q.s3 && t > 5) {
      q.s3 = 1;
      sfx('portal');
    }
    for (let i = 0; i < 3; i++)
      if (Math.random() < dt * 70)
        q.ps.push({
          x: p.x + (Math.random() - 0.5) * 30 * (1 - k * 0.6),
          y: p.y - Math.random() * 64,
          vx: 0,
          vy: -40 - Math.random() * 90,
          l: 1.3,
          c: Math.random() < 0.5 ? '#fff6c8' : ['#bfe8ff', LOOK.col.cloth, LOOK.col.hair][i],
          up: 1,
        });
  }
  if (t > 4.4 && Math.floor(t * 2.5) != Math.floor((t - dt) * 2.5) && t < 7.4) sfx('rumble');
  for (const s of q.ps) {
    if (s.up) {
      s.vy -= 420 * dt;
      s.x += (p.x - s.x) * Math.min(1, 4 * dt);
    }
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.l -= dt * 0.7;
  }
  q.ps = q.ps.filter(s => s.l > 0 && s.y > -30);
  if (t > 8.6) startMeet();
}
function drawAbsorb() {
  const t = SQ.t;
  let sx = 1,
    sy = 1,
    al = 1,
    ox = 0,
    fi;
  if (t < 1.2) fi = VIC + Math.min(6, Math.floor(t * 8));
  else if (t < 1.7) fi = HI.idle_0;
  else if (t < 4.4) fi = t < 2.4 ? HI.hurt : HI.kneel;
  else fi = HI.jumpUp;
  if (t > 1.2 && t < 4.4) ox = (Math.random() - 0.5) * (t > 3 ? 2.6 : 1.2);
  if (t > 4.4) {
    const k = Math.min(1, (t - 4.4) / 2.8);
    sx = 1 - k * 0.93;
    sy = 1 + k * 2.4;
    al = 1 - Math.max(0, (k - 0.75) / 0.25);
  }
  if (al <= 0) return;
  HFLT =
    t > 1.4 && t < 4.4 && Math.floor(t * 11) % 6 == 0
      ? 'invert(1) hue-rotate(180deg)'
      : t > 4.4
        ? 'brightness(1.7) saturate(.35)'
        : null;
  ctx.save();
  ctx.globalAlpha = al;
  ctx.translate(Math.round(p.x - cam + ox), Math.round(p.y));
  ctx.scale(p.face * sx, sy);
  hdraw(fi);
  ctx.restore();
  HFLT = null;
}
function drawSkyQ() {
  const t = SQ.t,
    x = Math.round(p.x - cam),
    G = GROUND;
  if (t > 3.1) {
    ctx.fillStyle =
      'rgba(12,8,34,' + Math.min(0.5, (t - 3.1) * 0.35) * (t > 7.6 ? Math.max(0, 1 - (t - 7.6)) : 1) + ')';
    ctx.fillRect(0, 0, W, H);
  }
  if (t > 3.3 && t < 4.4) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,' + (0.4 + 0.6 * Math.random()) + ')';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    let xx = x,
      yy = 0;
    ctx.moveTo(xx, 0);
    for (let i = 0; i < 7; i++) {
      xx += (Math.random() - 0.5) * 16;
      yy += 8 + (t - 3.3) * 10;
      ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    ctx.restore();
  }
  if (t > 3.6 && t < 8.3) {
    let w;
    if (t < 4.3) w = 1 + (t - 3.6) * 2;
    else if (t < 4.6) w = 2.4 + ((t - 4.3) / 0.3) * 26;
    else if (t < 7.4) w = 28 + Math.sin(t * 22) * 3;
    else w = 28 * Math.max(0, 1 - (t - 7.4) / 0.9);
    const bot = G + 4;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    let g = ctx.createLinearGradient(x - w * 1.7, 0, x + w * 1.7, 0);
    g.addColorStop(0, 'rgba(140,200,255,0)');
    g.addColorStop(0.3, 'rgba(160,215,255,.45)');
    g.addColorStop(0.5, 'rgba(255,255,255,.95)');
    g.addColorStop(0.7, 'rgba(160,215,255,.45)');
    g.addColorStop(1, 'rgba(140,200,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - w * 1.7, 0, w * 3.4, bot);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fillRect(x - w * 0.22, 0, w * 0.44, bot);
    for (let i = 0; i < 6; i++) {
      const q = (t * 1.1 + i / 6) % 1,
        yy = bot - q * bot;
      ctx.strokeStyle = 'rgba(220,240,255,' + (1 - q) * 0.65 + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(x, yy, w * 0.95 + 4, w * 0.22 + 2, 0, 0, 7);
      ctx.stroke();
    }
    const e = ctx.createRadialGradient(x, bot, 0, x, bot, 70);
    e.addColorStop(0, 'rgba(255,255,255,.75)');
    e.addColorStop(1, 'rgba(160,210,255,0)');
    ctx.fillStyle = e;
    ctx.fillRect(x - 70, bot - 70, 140, 80);
    ctx.restore();
  }
  for (const s of SQ.ps) {
    ctx.globalAlpha = Math.min(1, s.l);
    ctx.fillStyle = s.c;
    ctx.fillRect(Math.round(s.x - cam), Math.round(s.y), 2, 2);
  }
  ctx.globalAlpha = 1;
  if (t > 1.3 && t < 4.3) {
    const l2 = t > 2.9;
    bubble2(
      x,
      Math.round(G - 74),
      l2 ? 'Me siento rara... ¿qué me está pasando?' : 'Me siento rara...',
      Math.floor((t - (l2 ? 2.9 : 1.3)) * 24),
    );
  }
  if (t > 7.6) {
    ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, (t - 7.6) / 0.9) + ')';
    ctx.fillRect(0, 0, W, H);
  }
}

/* ---------- 29b-arlos-espadas-rojas.js ---------- */
/* =====================================================================
   ARLOS: ATAQUE NUEVO "LAS ESPADAS ROJAS"
   · Cuando a Arlos le baja la vida (70% y 35% en la fase 1, 50% en la 2)
     se DESVANECE durante 15 SEGUNDOS y del suelo salen exactamente DOS
     guerreros de espada roja (el enemigo "demon").
   · Mientras no está, no se le puede pegar. Si Smara mata a los dos antes,
     Arlos vuelve un poco antes. Si a los 15 s siguen vivos, se deshacen en
     humo cuando él regresa.
   · Además, los guerreros de espada roja (en todo el juego) tienen ATAQUES
     NUEVOS con sus animaciones, sacados de la hoja de referencia:
       ESTOCADA BAJA  se agacha y se lanza a ras del suelo (saltala)
       GIRO           vuelta completa con un anillo rojo (pega a los dos lados)
       CORTE AMPLIO   media luna horizontal larga hacia adelante
       ASCENDENTE     media luna vertical que sube con un saltito
       SALTO + CORTE  salta hacia Smara y cae con un tajo que hace temblar el piso
   ===================================================================== */
const ESPROJA = { dura: 15 };

/* ---------------- 1) Arlos se esconde ---------------- */
function arlosDebeEsconderse() {
  if (B.aus || B.st == 'enter' || B.st == 'morph') return false;
  B.conv = B.conv || {};
  const k = B.hp / B.max;
  const marcas = B.ph2 ? [['f2a', 0.5]] : [['f1a', 0.7], ['f1b', 0.35]];
  for (const [id, lim] of marcas) if (k <= lim && !B.conv[id]) { B.conv[id] = 1; return true; }
  return false;
}
function arlosEsconder() {
  B.aus = { t: 0, sale: true, dem: [], vuelve: false };
  B.beam = 0;
  B.open = false;
  flashW = Math.max(flashW, 0.5);
  sfx('portal');
  say('Arlos se hunde en el vacío... algo sube del suelo.');
  for (let i = 0; i < 30; i++) pfx(B.x + rnd(-40, 40), B.y + rnd(-50, 50), rnd(-80, 80), rnd(-140, -20), rnd(0.4, 0.9), i % 2 ? '#9b2fd6' : '#1a1028', 3, -40);
}
function arlosAusente(dt) {
  const A = B.aus;
  A.t += dt;
  // se desvanece (0-0.6 s)
  if (!A.vuelve) B.a = Math.max(0, 1 - A.t / 0.6);
  // salen los dos guerreros
  if (A.t > 0.6 && !A.dem.length) {
    for (const lado of [-1, 1]) {
      const x = Math.max(cam + 50, Math.min(cam + W - 50, p.x + lado * 180));
      const e = mkE('demon', x, GROUND);
      foeInit(e);
      e.sp = 0.9; // el círculo morado del que salen
      e.arlos = 1;
      e.x0 = cam + 20;
      e.x1 = cam + W - 20;
      enemies.push(e);
      A.dem.push(e);
    }
    SHK = Math.max(SHK, 5);
    sfx('boom');
  }
  // si los dos ya murieron, vuelve antes
  const vivos = A.dem.filter(e => !e.dying && !e.dead && enemies.includes(e));
  if (A.dem.length && !vivos.length && A.t < ESPROJA.dura - 1.5) A.t = ESPROJA.dura - 1.5;
  // vuelve
  if (A.t >= ESPROJA.dura && !A.vuelve) {
    A.vuelve = true;
    A.tv = 0;
    for (const e of vivos) { e.dying = 1; e.dt = 0; e.mode = 'move'; } // los que quedan se hacen humo
    flashW = Math.max(flashW, 0.9);
    sfx('boom');
    say('¡Arlos regresa!');
  }
  if (A.vuelve) {
    A.tv += dt;
    B.a = Math.min(1, A.tv / 0.6);
    if (Math.random() < 0.6) pfx(B.x + rnd(-40, 40), B.y + rnd(-50, 50), rnd(-40, 40), rnd(-40, 40), 0.5, '#9b2fd6', 3, 0);
    if (A.tv > 0.6) {
      B.aus = null;
      B.a = 1;
      B.t = 0;
      if (!B.ph2) { B.st = 'hover'; B.bc = 3; }
    }
  }
}
const bossAIRojas = bossAI;
bossAI = function (dt) {
  if (B.aus) { B.t += dt; return arlosAusente(dt); }
  if (arlosDebeEsconderse()) { arlosEsconder(); return; }
  bossAIRojas(dt);
};
// mientras no está, no recibe golpes
const hitBossRojas = hitBoss;
hitBoss = function (d) {
  if (B.aus) return;
  hitBossRojas(d);
};
// cuenta regresiva arriba
function arlosCuenta() {
  if (!B.on || !B.aus || B.aus.vuelve) return;
  const s = Math.max(0, Math.ceil(ESPROJA.dura - B.aus.t));
  ctx.font = '8px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000a';
  ctx.fillRect(W / 2 - 92, 40, 184, 18);
  ctx.fillStyle = '#ff5a7a';
  ctx.fillText('ARLOS VUELVE EN ' + s, W / 2, 53);
  ctx.textAlign = 'left';
}

/* ---------------- 2) ataques nuevos del guerrero de espada roja ---------------- */
const DM_ATAQ = ['est', 'giro', 'amplio', 'asc', 'salto'];
const esDMx = e => e.t == 'demon' && DM_ATAQ.includes(e.mode) && !e.dying;
const DM_CORTES = [];
function dmCorte(o) {
  DM_CORTES.push(Object.assign({ t: 0, barre: 0.08, vida: 0.3, g: 12, ry: 1 }, o));
}
function dmElegir(e) {
  const ad = Math.abs(p.x - e.x);
  if (ad > 200 && ad < 330) return 'salto';
  if (ad < 190) return DM_ATAQ[Math.floor(Math.random() * 4)];
  return null;
}
function dmTick(e, dt) {
  const ad = Math.abs(p.x - e.x), dir = e.dir, am = (e.am += dt);
  const fy = e.y - 24;
  const golpe = (ok, d) => { if (!e.hd && ok && p.inv <= 0 && p.dash <= 0) { e.hd = 1; hurt(d); } };
  const fin = (t, cd) => { if (am > t) { e.mode = 'move'; e.cd = cd; e.hd = 0; e.z = 0; } };
  const delante = (a, b) => { const r = (p.x - e.x) * dir; return r > a && r < b; };
  if (e.mode == 'est') {
    if (am > 0.3 && am < 0.55) {
      e.x += dir * 520 * dt;
      if (Math.random() < 0.6) pfx(e.x - dir * 14, GROUND - 2, -dir * rnd(40, 120), rnd(-50, -10), 0.3, '#5a2030', 2, 200);
      if (!e.fx1) { e.fx1 = 1; dmCorte({ e, recta: 1, x: 10, y: -14, largo: 110, alto: 5, vida: 0.32 }); sfx('swing'); }
      golpe(Math.abs(p.x - e.x) < 42 && p.y > GROUND - 30, 14); // va bajito: saltando se esquiva
    }
    fin(0.8, 1.8);
  } else if (e.mode == 'giro') {
    if (am > 0.25 && !e.fx1) { e.fx1 = 1; dmCorte({ e, x: 0, y: -26, r: 52, a0: -1.6, a1: -1.6 + Math.PI * 2, g: 13, barre: 0.3, vida: 0.45, ry: 0.7 }); sfx('swing'); }
    if (am > 0.25 && am < 0.6) golpe(ad < 76 && Math.abs(pcy() - fy) < 60, 14);
    fin(0.85, 1.8);
  } else if (e.mode == 'amplio') {
    if (am > 0.38 && !e.fx1) { e.fx1 = 1; dmCorte({ e, x: 6, y: -24, r: 88, a0: -1.1, a1: 1.0, g: 16, barre: 0.09, vida: 0.34, ry: 0.55 }); sfx('swing'); SHK = Math.max(SHK, 2); }
    if (am > 0.38 && am < 0.5) golpe(delante(-10, 125) && Math.abs(pcy() - fy) < 55, 16);
    fin(0.85, 2);
  } else if (e.mode == 'asc') {
    if (am > 0.28) {
      const k = Math.min(1, (am - 0.28) / 0.5);
      e.z = Math.sin(k * Math.PI) * 46;
      if (!e.fx1) { e.fx1 = 1; dmCorte({ e, fijo: 1, ox: e.x, oy: e.y, x: 12, y: -30, r: 56, a0: 1.6, a1: -1.75, g: 17, barre: 0.1, vida: 0.4 }); sfx('swing'); }
      if (am < 0.42) golpe(delante(-10, 80) && p.y > GROUND - 130, 15);
    }
    fin(0.95, 2);
  } else if (e.mode == 'salto') {
    if (!e.sx0) { e.sx0 = e.x; e.tx = Math.max(e.x0, Math.min(e.x1, p.x - dir * 24)); }
    if (am > 0.25 && am < 0.8) {
      const k = (am - 0.25) / 0.55;
      e.x = e.sx0 + (e.tx - e.sx0) * k;
      e.z = Math.sin(k * Math.PI) * 95;
      if (!e.fx1 && k > 0.55) { e.fx1 = 1; dmCorte({ e, x: 8, y: -40, r: 60, a0: -2.2, a1: 0.9, g: 15, barre: 0.15, vida: 0.4 }); sfx('swing'); }
    } else if (am >= 0.8 && !e.cayo) {
      e.cayo = 1; e.z = 0;
      SHK = Math.max(SHK, 6);
      sfx('boom');
      for (const f of [1, -1]) dmCorte({ e, fijo: 1, ox: e.x, oy: e.y, f, x: 4, y: -4, r: 70, a0: -2.9, a1: -0.05, g: 14, barre: 0.08, vida: 0.36, ry: 0.4 });
      for (let i = 0; i < 16; i++) pfx(e.x + rnd(-20, 20), GROUND - 2, (i % 2 ? 1 : -1) * rnd(60, 240), rnd(-140, -30), rnd(0.25, 0.5), i % 3 ? '#ff4a6a' : '#2a1020', 2, 500);
      golpe(ad < 88 && p.y > GROUND - 40, 16);
    }
    fin(1.15, 2.2);
  }
  e.x = Math.max(e.x0, Math.min(e.x1, e.x));
}
const updEnemiesRojas = updEnemies;
updEnemies = function (dt) {
  // antes del juego normal: decidir si el guerrero usa un ataque nuevo (60% de las veces)
  for (const e of enemies) {
    if (e.t == 'demon' && e.z && !esDMx(e)) e.z = 0; // si lo golpearon en el aire, baja
    if (e.t != 'demon' || e.dying || e.sp > 0 || e.hitT > 0 || e.mode != 'move' || e.cd - dt > 0) continue; // (el juego normal ataca en el mismo cuadro en que cd llega a 0)
    if (Math.random() > 0.6) continue; // deja que use sus ataques de siempre
    const m = dmElegir(e);
    if (!m) continue;
    e.mode = m; e.am = 0; e.hd = 0; e.fx1 = 0; e.cayo = 0; e.sx0 = 0; e.z = 0;
    e.dir = Math.sign(p.x - e.x) || 1;
    cdTono(500, 900, 0.18, 'triangle', 0.03); // brillito de aviso
  }
  // los que están en un ataque nuevo se manejan aparte (el juego normal los cortaría)
  const nuevos = enemies.filter(esDMx);
  if (nuevos.length) enemies = enemies.filter(e => !esDMx(e));
  updEnemiesRojas(dt);
  for (const e of nuevos) {
    e.ft = (e.ft || 0) + dt;
    e.cd -= dt; e.hit -= dt;
    if (e.hitT > 0) { e.hitT -= dt; e.mode = 'move'; e.z = 0; }
    else dmTick(e, dt);
    if (!enemies.includes(e) && !e.dead) enemies.push(e);
  }
  for (let i = DM_CORTES.length - 1; i >= 0; i--) { DM_CORTES[i].t += dt; if (DM_CORTES[i].t > DM_CORTES[i].vida) DM_CORTES.splice(i, 1); }
};
// cuerpo del guerrero en los ataques nuevos (cuadros de su hoja + aplastar/girar)
function dmCuadro(e) {
  const am = e.am;
  switch (e.mode) {
    case 'est': return am < 0.3 ? [4, 1 + (Math.floor(am * 10) % 2), 0.86] : am < 0.6 ? [5, 2, 0.9] : [5, 3, 1];
    case 'giro': return am < 0.25 ? [4, 2, 0.92] : am < 0.6 ? [5, 5 + (Math.floor(am / 0.07) % 2), 1] : [4, 12, 1];
    case 'amplio': return am < 0.38 ? [4, Math.min(3, Math.floor(am / 0.1)), 1] : [4, Math.min(13, 9 + Math.floor((am - 0.38) / 0.1)), 1];
    case 'asc': return am < 0.28 ? [4, 1, 0.85] : [4, Math.min(12, 10 + Math.floor((am - 0.28) / 0.15)), 1];
    case 'salto': return am < 0.25 ? [4, 1, 0.8] : am < 0.8 ? [2, 3, 1.05] : [4, Math.min(13, 11 + Math.floor((am - 0.8) / 0.1)), 0.9];
  }
  return [0, 0, 1];
}
const drawDemonRojas = drawDemon;
drawDemon = function (e, t) {
  if (!esDMx(e)) {
    drawDemonRojas(e, t);
    if (e.arlos && !e.dying) dmMarca(e, t);
    return;
  }
  const S = 2, [row, fr, sy] = dmCuadro(e);
  let dir = e.dir;
  if (e.mode == 'giro' && e.am > 0.25 && e.am < 0.6 && Math.floor((e.am - 0.25) / 0.06) % 2) dir = -dir; // da vueltas
  // aviso: la espada brilla antes de atacar
  const aviso = (e.mode == 'est' && e.am < 0.3) || (e.mode == 'amplio' && e.am < 0.38) || (e.mode == 'giro' && e.am < 0.25) || (e.mode == 'asc' && e.am < 0.28) || (e.mode == 'salto' && e.am < 0.25);
  ctx.save();
  ctx.globalAlpha = e.hit > 0 ? 0.6 : 1;
  ctx.translate(Math.round(e.x - cam), Math.round(e.y - (e.z || 0)));
  ctx.scale(dir, sy);
  ctx.drawImage(img.dsw, fr * 128, row * 64, 128, 64, -28 * S, -50 * S, 128 * S, 64 * S);
  ctx.restore();
  if (e.z > 2) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(Math.round(e.x - cam - 14), GROUND - 1, 28, 2); }
  if (aviso && Math.floor(t * 16) % 2) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#ff4a6a';
    const x = Math.round(e.x - cam + e.dir * 14), y = Math.round(e.y - (e.z || 0) - 40);
    ctx.fillRect(x - 1, y - 5, 2, 10); ctx.fillRect(x - 5, y - 1, 10, 2);
    ctx.restore();
  }
  if (e.arlos) dmMarca(e, t);
};
// los dos de Arlos llevan una llamita morada encima (para distinguirlos)
function dmMarca(e, t) {
  const x = Math.round(e.x - cam), y = Math.round(e.y - (e.z || 0) - 62 + Math.sin(t * 5) * 2);
  ctx.fillStyle = '#9b2fd6';
  ctx.fillRect(x - 2, y, 4, 4);
  ctx.fillStyle = '#e6c2ff';
  ctx.fillRect(x - 1, y + 1, 2, 2);
}
// medias lunas rojas
function dmCorteDibujar(c) {
  const k = c.t / c.vida;
  if (k >= 1) return;
  const e = c.e, f = c.f || (e ? e.dir : 1);
  const bx = c.fijo ? c.ox : e.x, by = c.fijo ? c.oy : e.y - (e.z || 0);
  ctx.save();
  ctx.translate(Math.round(bx - cam), Math.round(by));
  ctx.scale(f, 1);
  ctx.globalAlpha = Math.max(0, 1 - k * 1.1);
  if (c.recta) {
    const L = c.largo * Math.min(1, c.t / 0.06), h = c.alto * (1 - k * 0.6);
    ctx.fillStyle = '#c4163c';
    ctx.beginPath(); ctx.moveTo(c.x, c.y - h); ctx.lineTo(c.x + L, c.y); ctx.lineTo(c.x, c.y + h); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffd0d8';
    ctx.beginPath(); ctx.moveTo(c.x + L * 0.2, c.y - h * 0.4); ctx.lineTo(c.x + L, c.y); ctx.lineTo(c.x + L * 0.2, c.y + h * 0.4); ctx.closePath(); ctx.fill();
    ctx.restore();
    return;
  }
  ctx.translate(c.x, c.y);
  const sw = Math.min(1, c.t / c.barre), a1 = c.a0 + (c.a1 - c.a0) * sw;
  const as = c.a0 + (a1 - c.a0) * Math.max(0, (k - 0.35) / 0.65), N = 22, g = c.g * (1 - k * 0.6);
  const camino = gr => {
    ctx.beginPath();
    for (let i = 0; i <= N; i++) { const a = as + (a1 - as) * (i / N); ctx.lineTo(Math.cos(a) * c.r, Math.sin(a) * c.r * c.ry); }
    for (let i = N; i >= 0; i--) { const u = i / N, a = as + (a1 - as) * u, w = gr * Math.sin(Math.PI * Math.min(1, u * 1.15)); ctx.lineTo(Math.cos(a) * (c.r - w), Math.sin(a) * (c.r - w) * c.ry); }
    ctx.closePath();
  };
  ctx.fillStyle = '#c4163c';
  camino(g); ctx.fill();
  ctx.fillStyle = '#ff7a92';
  camino(g * 0.55); ctx.fill();
  if (k < 0.5) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,200,210,.6)'; camino(2.2); ctx.fill(); }
  ctx.restore();
}
const drawEnemiesRojas = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesRojas(t);
  for (const c of DM_CORTES) dmCorteDibujar(c);
};
const drawZCRojas = drawZC;
drawZC = function () {
  drawZCRojas();
  arlosCuenta();
};

/* ---------- 29c-cadejo-noche.js ---------- */
/* =====================================================================
   EL CADEJO NEGRO EN LA NOCHE DE LOS DUHINDU (área 5, antes de Arlos)
   · Al empezar la noche se oye un AULLIDO DOBLE, raro, como dos perros
     aullando a destiempo y desafinados. Smara mira para todos lados...
   · ¡PUM! aparece el Cadejo (sprites de wolf_sin_fuego.zip) y conversan.
   · El Cadejo le siembra la duda: ¿y si el malo no es él... sino el BLANCO?
     (el Cadejo blanco de los cuentos, y el espacio en blanco del Errante)
   · Al final se ríe y se va corriendo. Pasa una sola vez por partida.
   Controles: E / ESPACIO / J / click para pasar el texto.
   ===================================================================== */
const CJN_FRASES = [
  ['c', '¡Guau! Niña... ¿qué hace una humana en estos escenarios?'],
  ['s', '¡Aaaa! ¡El Cadejo negro!'],
  ['c', 'Tranquila. Si te quisiera hacer daño, ya no estarías parada ahí.'],
  ['s', 'Mi abuela decía que el Cadejo negro persigue a los que andan de noche... y que el blanco los cuida.'],
  ['c', '¿Y vos le creíste? Qué fácil es pintar a uno de negro y al otro de blanco.'],
  ['s', '¿Qué querés decir?'],
  ['c', 'Que te enseñaron a tenerme miedo a mí. Pero... ¿y si el malo no soy yo?'],
  ['c', '¿Y si el malo es el blanco?'],
  ['s', '...¿El blanco?'],
  ['c', 'Un lugar sin colores, donde alguien te habla bonito y te dice que todo tiene sentido. Ahí nada es lo que parece.'],
  ['c', 'Adelante, en el puente, te espera algo grande. Cuando lo venzás, vas a llegar al blanco. Acordate de este perro.'],
  ['s', '¿Y por qué me ayudás?'],
  ['c', '¿Quién dijo que te estoy ayudando? ...Guau.'],
];
const CJN = { visto: false, on: false };
// la escena pasa una sola vez por partida (y no si cargás una partida ya adelantada)
const initCJN = init;
init = function () {
  initCJN();
  CJN.visto = false;
  CJN.on = false;
};

/* ---------------- el aullido doble ---------------- */
function cjAullido(largo) {
  if (!AC || muted) return;
  largo = largo || 3;
  const t = AC.currentTime, out = AC.createGain();
  out.gain.setValueAtTime(0.0001, t);
  out.gain.exponentialRampToValueAtTime(0.2, t + 0.45);
  out.gain.exponentialRampToValueAtTime(0.16, t + largo * 0.75);
  out.gain.exponentialRampToValueAtTime(0.0001, t + largo);
  // eco largo, como en el monte
  const dl = AC.createDelay(1), fb = AC.createGain();
  dl.delayTime.value = 0.27;
  fb.gain.value = 0.42;
  dl.connect(fb); fb.connect(dl);
  out.connect(MG); out.connect(dl); dl.connect(MG);
  // tres voces: el aullido, otro desafinado (tritono) que entra tarde, y un gruñido grave
  for (const [m, d, ring] of [[1, 0, 0], [1.414, 0.14, 1], [0.5, 0.06, 0]]) {
    const o = AC.createOscillator(), bp = AC.createBiquadFilter(), g = AC.createGain();
    o.type = 'sawtooth';
    const f0 = 250 * m, s = t + d;
    o.frequency.setValueAtTime(f0, s);
    o.frequency.exponentialRampToValueAtTime(f0 * 2.1, s + largo * 0.22);
    o.frequency.exponentialRampToValueAtTime(f0 * 1.85, s + largo * 0.62);
    o.frequency.exponentialRampToValueAtTime(f0 * 1.15, s + largo * 0.95);
    const lfo = AC.createOscillator(), lg = AC.createGain();
    lfo.frequency.value = 5.2 + m;
    lg.gain.value = 10 * m;
    lfo.connect(lg); lg.connect(o.frequency);
    bp.type = 'bandpass';
    bp.frequency.value = 800 * Math.sqrt(m);
    bp.Q.value = 2.6;
    g.gain.value = m == 0.5 ? 0.5 : 0.9;
    o.connect(bp); bp.connect(g);
    if (ring) {
      // modulación en anillo: lo que lo hace sonar raro, como de otro mundo
      const rm = AC.createGain(), ro = AC.createOscillator();
      rm.gain.value = 0;
      ro.frequency.value = 33;
      ro.connect(rm.gain);
      g.connect(rm); rm.connect(out);
      ro.start(s); ro.stop(t + largo + 0.2);
    } else g.connect(out);
    o.start(s); o.stop(t + largo + 0.2);
    lfo.start(s); lfo.stop(t + largo + 0.2);
  }
}

/* ---------------- la escena ---------------- */
function cjnEmpezar() {
  CJN.visto = true;
  CJN.on = true;
  CJN.t = 0;
  CJN.i = -1;
  CJN.vis = 0;
  CJN.s = 0;
  CJN.pum = false;
  CJN.sale = 0;
  CJN.x = Math.min(LEVEL - 60, p.x + 130);
  state = 'cjcine';
  p.vx = 0;
  p.atk = null;
  cjAullido(3.2);
}
function cjnSiguiente() {
  if (!CJN.on || CJN.i < 0 || CJN.sale) return;
  const L = CJN_FRASES[CJN.i][1];
  if (CJN.vis < L.length) { CJN.vis = L.length; return; }
  CJN.i++;
  CJN.vis = 0;
  CJN.s = 0;
  if (CJN.i >= CJN_FRASES.length) {
    // se ríe y se va corriendo
    CJN.i = CJN_FRASES.length - 1;
    CJN.sale = 0.001;
    cdSnd.grunido();
    cjAullido(1.6);
  }
}
function cjnTick(dt) {
  const C = CJN;
  C.t += dt;
  // Smara mira para todos lados mientras suena el aullido
  if (C.t < 2.6) {
    p.face = C.t < 0.9 ? 1 : C.t < 1.7 ? -1 : 1;
    SHK = Math.max(SHK, 0.6);
  }
  if (C.t > 2.7 && !C.pum) {
    // ¡PUM!
    C.pum = true;
    p.face = 1;
    flashW = 0.35;
    SHK = 12;
    cdSnd.susto();
    for (let i = 0; i < 30; i++) pfx(C.x + rnd(-40, 40), GROUND - rnd(0, 70), rnd(-200, 200), rnd(-200, 40), rnd(0.3, 0.9), i % 3 ? '#0c0a12' : '#5ae0ff', 3, 300);
  }
  if (C.pum && C.t < 3.1) p.x -= dt * 80; // retrocede del susto
  if (C.t > 3.6 && C.i < 0) { C.i = 0; C.vis = 0; C.s = 0; }
  if (C.i >= 0 && !C.sale) {
    const [q, L] = CJN_FRASES[C.i];
    C.s += dt;
    const n0 = Math.floor(C.vis);
    C.vis = Math.min(L.length, C.vis + dt * 30);
    if (Math.floor(C.vis) > n0 && L[Math.floor(C.vis) - 1] != ' ' && Math.floor(C.vis) % 2 == 0) q == 'c' ? cdSnd.voz() : blip(880 + Math.random() * 120);
    // si nadie aprieta nada, igual avanza
    if (C.vis >= L.length && C.s > L.length / 30 + 3.2) cjnSiguiente();
  }
  if (C.sale) {
    C.sale += dt;
    C.x += dt * (120 + C.sale * 700);
    if (C.sale > 1.2) {
      C.on = false;
      state = 'play';
      say('El Cadejo se perdió en el monte. Su pregunta no.');
    }
  }
}
// cuadro del perro: corre al irse, abre el hocico al hablar, respira quieto
function cjnCuadro() {
  const C = CJN;
  if (C.sale) return Math.floor(C.sale * 16) % 6;
  if (C.i >= 0) {
    const [q, L] = CJN_FRASES[C.i];
    if (q == 'c' && C.vis < L.length) { const b = Math.abs(Math.sin(C.s * 14)); return b > 0.7 ? 8 : b > 0.35 ? 7 : 6; }
  }
  return 0;
}
function cjnPerro(t) {
  const C = CJN;
  if (!C.on || !C.pum || !img.cdj) return;
  const k = cjnCuadro(), sc = 2, x = Math.round(C.x - cam), resp = C.sale ? 0 : Math.round(Math.sin(t * 3)); // un poco más chico que Smara
  const a = Math.min(1, (C.t - 2.7) / 0.12) * (C.sale ? Math.max(0, 1 - C.sale / 1.2) : 1);
  // humo negro a los pies
  ctx.fillStyle = 'rgba(8,6,14,.35)';
  ctx.fillRect(x - 40, GROUND - 2, 80, 3);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, GROUND - 22, 0, x, GROUND - 22, 50);
  g.addColorStop(0, 'rgba(90,30,120,' + 0.25 * a + ')');
  g.addColorStop(1, 'rgba(40,0,60,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - 50, GROUND - 72, 100, 100);
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = a;
  ctx.drawImage(img.cdj, k * 48, 0, 48, 43, x - 24 * sc, GROUND - 43 * sc + resp, 48 * sc, 43 * sc);
  ctx.restore();
  // ojos celestes
  if (!C.sale) {
    const ex = x + (-24 + 7.5) * sc, ey = GROUND + (-43 + 21.5) * sc + resp;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const e2 = ctx.createRadialGradient(ex, ey, 0, ex, ey, 10);
    e2.addColorStop(0, 'rgba(60,220,255,' + 0.7 * a + ')');
    e2.addColorStop(1, 'rgba(0,120,255,0)');
    ctx.fillStyle = e2;
    ctx.fillRect(ex - 10, ey - 10, 20, 20);
    ctx.restore();
  }
}
function cjnOverlay(t) {
  const C = CJN;
  if (!C.on) return;
  // la noche se pone más oscura mientras suena el aullido
  const os = C.t < 2.7 ? Math.min(0.45, C.t / 2.7 * 0.45) : Math.max(0.2, 0.45 - (C.t - 2.7) * 0.3);
  ctx.fillStyle = 'rgba(4,2,10,' + (C.sale ? os * Math.max(0, 1 - C.sale) : os) + ')';
  ctx.fillRect(0, 0, W, H);
  // el perro va encima de todo (que nada del escenario lo tape) y resalta en lo oscuro
  cjnPerro(t);
  // franjas de cine
  const lb = Math.min(1, C.t / 0.6) * 30 * (C.sale ? Math.max(0, 1 - C.sale / 1.2) : 1);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, lb);
  ctx.fillRect(0, H - lb, W, lb);
  if (C.t < 2.7) {
    ctx.font = '7px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(200,190,230,' + Math.min(1, C.t) + ')';
    ctx.fillText('(un aullido... y otro encima, desafinado)', W / 2, H - 12);
    ctx.textAlign = 'left';
  }
  if (C.i >= 0 && !C.sale) {
    const [q, L] = CJN_FRASES[C.i];
    if (q == 'c') globo(C.x - cam - 26, GROUND - 66, 'EL CADEJO NEGRO', L, Math.floor(C.vis), false);
    else globo(p.x - cam, p.y - 76, 'SMARA', L, Math.floor(C.vis), true);
    ctx.font = '6px ' + PS;
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,.6)';
    ctx.fillText('E / ESPACIO', W - 10, H - 10);
    ctx.textAlign = 'left';
  }
}

/* ---------------- conexión ---------------- */
const updEnemiesCJN = updEnemies;
updEnemies = function (dt) {
  updEnemiesCJN(dt);
  if (area == 5 && !CJN.visto && state == 'play' && p.x > 520 && p.x < 1400 && p.on) cjnEmpezar();
};
addEventListener(
  'keydown',
  e => {
    if (state != 'cjcine') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!e.repeat && ['KeyE', 'Space', 'Enter', 'KeyJ', 'KeyK'].includes(e.code)) cjnSiguiente();
  },
  true,
);
cv.addEventListener('mousedown', () => { if (state == 'cjcine') cjnSiguiente(); });
const drawZCCJN = drawZC;
drawZC = function () {
  drawZCCJN();
  if (area == 5) cjnOverlay(performance.now() / 1000);
};
let cjnUlt = performance.now();
const drawCJN = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.033, (now - cjnUlt) / 1000);
  cjnUlt = now;
  if (state == 'cjcine') {
    cjnTick(dt);
    // durante la escena se dibuja el mundo como si se jugara (con temblor)
    if (state == 'cjcine') { state = 'play'; drawCJN(); state = 'cjcine'; return; }
  }
  drawCJN();
};

/* ---------- 30-espacio-en-blanco.js ---------- */
/* ===== EL ESPACIO EN BLANCO: el Errante (animacion del video + extras) y dialogo ===== */
const MEET = [
  [0, 'Llegaste. Todos llegan después de matar a algo grande.'],
  [1, '¿Dónde estoy? Hace un segundo había un monstruo... y ahora no hay nada. Ni siquiera colores.'],
  [
    0,
    'Este es el espacio entre una pregunta y su respuesta. No hay colores porque nadie ha decidido todavía qué significan.',
  ],
  [1, '¿Estoy muerta?'],
  [0, 'No. Estás despierta. A veces se siente parecido.'],
  [1, 'Yo solo quería terminar mi nacatamal. ¿Por qué yo? ¿Por qué estoy aquí?'],
  [
    0,
    'Porque todavía nombrás las cosas. El cielo de Mulukukú se sostiene con la gente que cree y que cuenta, aunque sea historias de almuerzo.',
  ],
  [1, '¿Mulukukú? Si yo de Mulukukú solo sé lo que sale en los videos... y en los chistes.'],
  [0, 'Lo sé. Para vos Mulukukú es un nombre que suena chistoso. Un meme que alguien comparte para hacer reír.'],
  [0, 'Hoy hay gente que lo usa así: "te voy a mandar a Mulukukú", "eso queda más lejos que Mulukukú". Lo dicen, se ríen y siguen bajando la pantalla.'],
  [1, 'Bueno... a mí también me dio risa la primera vez.'],
  [0, 'Reírse no está mal. Lo triste es quedarse ahí: conocer un lugar solo por la broma que hicieron de él.'],
  [0, 'Detrás del nombre hay ríos, monte, gente que madruga y animales que nadie nombra. Eso no cabe en un video de quince segundos.'],
  [1, '¿Entonces el Mulukukú que yo me imagino... no es el de verdad?'],
  [0, 'Es real para vos, porque lo armaste con lo que te contaron. Pero está hecho de bromas, y lo que está hecho de bromas se rompe fácil.'],
  [0, 'Más adelante vas a encontrar pilares que llevan a mundos así: hechos de lo que la gente cree saber sin haber ido nunca.'],
  [1, '¿Y si solo estoy fingiendo? ¿Y si no sé lo que hago?'],
  [0, 'Todos fingen. La diferencia es quién sigue caminando mientras finge.'],
  [1, 'Entonces... nada de esto tiene sentido.'],
  [0, 'El mundo no trae sentido de fábrica. Se lo ponés vos, paso a paso, golpe a golpe.'],
  [1, 'Qué consuelo más raro.'],
  [
    0,
    'Arriba, Prahaku abrió su ojo: el Sol que mira. Lleva siglos haciéndose tu misma pregunta. Andá a darle una respuesta.',
  ],
  [1, 'Me sigo sintiendo rara... pero ya no tengo miedo.'],
  [0, 'Eso es lo único que el viento no se lleva. Ahora, subí.'],
];
let MT = null,
  DITH = null;
function startMeet() {
  if (musOn()) musStop(1.5);
  state = 'meet';
  MT = { t: 0, i: -1, s: 0, end: 0, dust: [], gy: [] };
  for (let i = 0; i < 40; i++) MT.gy.push(Math.floor(Math.random() * 3) * 2);
  sfx('wake');
}
function updMeet(dt) {
  const m = MT;
  m.t += dt;
  m.s += dt;
  if (m.i < 0 && m.t > 2.6) {
    m.i = 0;
    m.s = 0;
    sfx('page');
  }
  if (Math.random() < dt * 26)
    m.dust.push({
      x: -10,
      y: 120 + Math.random() * 190,
      vx: 60 + Math.random() * 90,
      ph: Math.random() * 6,
      l: 1,
    });
  if (Math.random() < dt * 6)
    m.dust.push({
      x: 440 + Math.random() * 30,
      y: 240 + Math.random() * 50,
      vx: 30 + Math.random() * 50,
      ph: Math.random() * 6,
      l: 1,
      c: 1,
    });
  for (const d of m.dust) {
    d.x += d.vx * dt;
    d.y += Math.sin(m.t * 3 + d.ph) * 12 * dt;
    if (d.c) d.l -= dt * 0.5;
  }
  m.dust = m.dust.filter(d => d.x < W + 10 && d.l > 0);
  if (m.end) {
    m.end += dt;
    if (m.end > 2.4) {
      MT = null;
      loadArea(6);
      state = 'play';
      flashW = 1.4;
      p.hp = Math.min(100, p.hp + 40);
      p.sta = 100;
      sfx('boom');
      save(); // la partida queda guardada al llegar al Bosque de la Niebla
    }
  }
}
function meetNext() {
  const m = MT;
  if (!m || m.end) return;
  if (m.i < 0) {
    m.t = Math.max(m.t, 2.6);
    return;
  }
  const L = MEET[m.i][1];
  if (m.s * 30 < L.length) {
    m.s = 99;
    return;
  }
  if (++m.i >= MEET.length) {
    m.i = MEET.length - 1;
    m.end = 0.001;
    sfx('portal');
    sfx('boom');
  } else {
    m.s = 0;
    sfx('page');
  }
}
function drawMeet() {
  const m = MT,
    t = m.t,
    GY = 270,
    ink = '#141418',
    paper = '#f3f1ea';
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);
  if (!DITH) {
    const c = document.createElement('canvas');
    c.width = c.height = 2;
    const x = c.getContext('2d');
    x.fillStyle = ink;
    x.fillRect(0, 0, 1, 1);
    x.fillRect(1, 1, 1, 1);
    DITH = ctx.createPattern(c, 'repeat');
  }
  // horizonte de puntos y rayitas que se mueven con el viento
  ctx.fillStyle = ink;
  for (let r = 0; r < 10; r++) {
    const y = GY - 6 + r * 6 + ((r * 3) % 4),
      sp = 6 + r * 5;
    for (let i = 0; i < 28; i++) {
      const xx = (((((i * 97 + r * 53) % W) + t * sp) % W) + W) % W,
        len = 1 + ((i * 7 + r) % 4) * (r > 4 ? 2 : 1);
      ctx.fillRect(Math.round(xx), y, len, 1);
      if ((i + r) % 9 == 0) ctx.fillRect(Math.round(xx) + 1, y - 1, 1, 1);
    }
  }
  // franja inferior tramada con borde escalonado
  ctx.fillStyle = DITH;
  for (let i = 0; i < 40; i++) {
    const x0 = i * 18,
      h = m.gy[i];
    ctx.fillRect(x0, GY + 60 - h, 18, H);
  }
  // polvo
  ctx.fillStyle = ink;
  for (const d of m.dust) {
    ctx.globalAlpha = d.c ? d.l : 1;
    ctx.fillRect(Math.round(d.x), Math.round(d.y), d.c ? 1 : 2, 1);
  }
  ctx.globalAlpha = 1;
  // el Errante (cuadros del video) con extras: respira, brillo en los ojos al hablar, aura del baston
  const talkF = m.i >= 0 && MEET[m.i][0] == 0 && m.s * 30 < MEET[m.i][1].length,
    fx = 455,
    fa = Math.min(1, t / 1.4),
    fr = Math.floor(t * 12.5) % 24,
    br = Math.sin(t * 1.7) > 0.85 ? 1 : 0;
  ctx.save();
  ctx.globalAlpha = fa;
  ctx.translate(fx, GY + 42);
  ctx.scale(1.5, 1.5);
  ctx.fillStyle = 'rgba(20,20,24,.18)';
  ctx.beginPath();
  ctx.ellipse(16, 0, 24, 3, 0, 0, 7);
  ctx.fill();
  ctx.drawImage(
    img.zwf,
    fr * 80,
    0,
    80,
    81,
    -8,
    -81 - br + (talkF ? Math.round(Math.sin(t * 18)) : 0) * 0,
    80,
    81,
  );
  if (talkF || m.end) {
    ctx.fillStyle = '#f3f1ea';
    if (Math.floor(t * 6) % 5 != 0) {
      ctx.fillRect(15, -70, 1, 1);
      ctx.fillRect(19, -70, 1, 1);
    }
  }
  const sg = (talkF ? 1 : 0.4) + (m.end ? 2 : 0);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 0.7;
  for (let i = 0; i < 3; i++) {
    const q = (t * 0.8 + i / 3) % 1;
    ctx.globalAlpha = fa * (1 - q) * 0.5 * sg;
    ctx.beginPath();
    ctx.arc(1, -44, 2 + q * 7 * sg, 0, 7);
    ctx.stroke();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  // Smara aparece desde un hilo de tinta y queda en gris
  const sxp = 235,
    ap = Math.min(1, Math.max(0, (t - 0.3) / 1.6));
  if (t < 2) {
    ctx.fillStyle = ink;
    const k = 1 - ap;
    ctx.fillRect(sxp - 1, 0, 2, Math.round(GY * k));
    for (let i = 0; i < 14; i++) {
      const yy = (t * 240 + i * 37) % GY;
      if (yy < GY * k + 40)
        ctx.fillRect(sxp + Math.round(Math.sin(i * 2.1 + t * 5) * 6 * (1 - k)), Math.round(yy), 2, 2);
    }
  }
  if (ap > 0) {
    const talkS = m.i >= 0 && MEET[m.i][1] && MEET[m.i][0] == 1 && m.s * 30 < MEET[m.i][1].length,
      fi = m.end
        ? HI.jumpUp
        : talkS
          ? HI.idle_0 + (Math.floor(t * 6) % 4)
          : HI['idle_' + (Math.floor(t * 3) % 4)];
    HFLT = 'grayscale(1) contrast(1.35)';
    ctx.save();
    ctx.globalAlpha = ap;
    ctx.translate(sxp, GY + 42 + (talkS ? -Math.abs(Math.sin(t * 9)) : 0));
    ctx.scale(
      1 - 0.6 * (1 - ap) + (m.end ? -Math.min(0.9, m.end * 0.5) : 0),
      1 + 2 * (1 - ap) + (m.end ? Math.min(2, m.end) : 0),
    );
    hdraw(fi);
    ctx.restore();
    HFLT = null;
  }
  // franjas de cine
  const lb = Math.min(1, t / 1) * 26;
  ctx.fillStyle = ink;
  ctx.fillRect(0, 0, W, lb);
  ctx.fillRect(0, H - lb * 0.4, W, lb * 0.4);
  // globo inferior
  if (m.i >= 0 && !m.end) {
    const [sp, txt] = MEET[m.i],
      typed = Math.floor(m.s * 30),
      bx = 40,
      by = 338,
      bw = W - 80,
      bh = 52,
      tx = sp ? sxp : fx + 24;
    ctx.fillStyle = ink;
    ctx.fillRect(bx - 2, by - 2, bw + 4, bh + 4);
    ctx.fillStyle = paper;
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = ink;
    for (let i = 0; i < 8; i++) ctx.fillRect(Math.round(tx) - 8 + i, by - 2 - i, 16 - 2 * i, 2);
    ctx.fillStyle = paper;
    for (let i = 0; i < 6; i++) ctx.fillRect(Math.round(tx) - 6 + i, by - 1 - i, 12 - 2 * i, 2);
    ctx.fillStyle = ink;
    ctx.fillRect(bx + 10, by - 12, sp ? 62 : 96, 12);
    ctx.fillStyle = paper;
    ctx.font = '7px ' + PS;
    ctx.fillText(sp ? 'SMARA' : 'EL ERRANTE', bx + 15, by - 3);
    ctx.fillStyle = ink;
    ctx.font = '8px ' + PS;
    const L = wrapT(txt.slice(0, typed), bw - 28);
    L.forEach((l, i) => ctx.fillText(l, bx + 14, by + 18 + i * 14));
    if (typed >= txt.length && Math.floor(t * 3) % 2) {
      ctx.fillRect(bx + bw - 18, by + bh - 12, 8, 2);
      ctx.fillRect(bx + bw - 16, by + bh - 10, 4, 2);
    }
  }
  if (m.i < 0 && t > 1.2) {
    ctx.fillStyle = ink;
    ctx.globalAlpha = Math.min(1, t - 1.2);
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText('...', W / 2, 350);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = 'rgba(20,20,24,.55)';
  ctx.font = '6px ' + PS;
  ctx.fillText('[E] / ESPACIO', W - 120, 328);
  if (m.end) {
    const k = m.end;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      const r = k * 260 - i * 50;
      if (r > 0) {
        ctx.beginPath();
        ctx.arc(fx + 2, GY - 14, r, 0, 7);
        ctx.stroke();
      }
    }
    if (k > 1.2) {
      ctx.fillStyle =
        Math.floor(k * 14) % 2 && k < 1.6 ? ink : 'rgba(255,255,255,' + Math.min(1, (k - 1.2) / 0.9) + ')';
      ctx.fillRect(0, 0, W, H);
    }
  }
}

/* ---------- 31-npc-vida.js ---------- */
/* ===== NPC CON MAS VIDA: contorno, respiracion, parpadeo, gestos, emotes y sorpresa al ver a Smara ===== */
const NPX = {},
  NPFX = {
    elder: { gem: [35, 12, '79,232,216'], emo: '...' },
    guard: { tip: [34, 2], sway: 9, emo: '!' },
    weaver: { emo: '♪' },
    sage: { gem: [35, 9, '150,170,255'], stars: 1, emo: '?' },
  };
function npcPrep(k) {
  if (NPX[k]) return NPX[k];
  const im = img[k],
    w = im.width,
    h = im.height,
    W2 = w + 2,
    H2 = h + 2;
  const mk = () => {
    const c = document.createElement('canvas');
    c.width = W2;
    c.height = H2;
    return c;
  };
  const c = mk(),
    x = c.getContext('2d');
  x.drawImage(im, 1, 1);
  const id = x.getImageData(0, 0, W2, H2),
    D = id.data,
    O = new Uint8ClampedArray(D),
    A = (xx, yy) => (xx < 0 || yy < 0 || xx >= W2 || yy >= H2 ? 0 : D[(yy * W2 + xx) * 4 + 3]);
  for (let yy = 0; yy < H2; yy++)
    for (let xx = 0; xx < W2; xx++) {
      const i = (yy * W2 + xx) * 4;
      if (D[i + 3] > 10) continue;
      if (A(xx - 1, yy) > 10 || A(xx + 1, yy) > 10 || A(xx, yy - 1) > 10 || A(xx, yy + 1) > 10) {
        O[i] = 24;
        O[i + 1] = 16;
        O[i + 2] = 30;
        O[i + 3] = 255;
      }
    }
  const skin = i =>
      D[i + 3] > 10 && D[i] > 120 && D[i] > D[i + 1] && D[i + 1] > D[i + 2] && D[i] - D[i + 2] > 40,
    dark = i => D[i + 3] > 10 && (D[i] + D[i + 1] + D[i + 2]) / 3 < 60;
  const B = new Uint8ClampedArray(O),
    stars = [];
  let eyes = 0;
  for (let yy = 1; yy < Math.min(H2, 24); yy++)
    for (let xx = 1; xx < W2 - 1; xx++) {
      const i = (yy * W2 + xx) * 4;
      if (!dark(i)) continue;
      let L = 0,
        R = 0;
      for (let s = 1; s <= 3; s++) {
        if (!L && skin((yy * W2 + xx - s) * 4)) L = s;
        if (!R && skin((yy * W2 + xx + s) * 4)) R = s;
      }
      if (L && R) {
        const j = (yy * W2 + xx - L) * 4;
        B[i] = D[j];
        B[i + 1] = D[j + 1];
        B[i + 2] = D[j + 2];
        eyes++;
      }
    }
  for (let yy = 0; yy < H2; yy++)
    if (yy > 24)
      for (let xx = 0; xx < W2; xx++) {
        const i = (yy * W2 + xx) * 4;
        if (D[i + 3] > 10 && D[i] > 200 && D[i + 1] > 200 && D[i + 2] > 200) stars.push([xx, yy]);
      }
  id.data.set(O);
  x.putImageData(id, 0, 0);
  const cb = mk();
  if (eyes) {
    const xb = cb.getContext('2d'),
      ib = xb.createImageData(W2, H2);
    ib.data.set(B);
    xb.putImageData(ib, 0, 0);
  }
  return (NPX[k] = { c, b: eyes ? cb : c, w: W2, h: H2, stars });
}
function npcEmote(x, y, s, t0, t) {
  const k = Math.min(1, (t - t0) * 6),
    a = Math.min(1, (1.6 - (t - t0)) * 3);
  if (a <= 0) return;
  ctx.save();
  ctx.globalAlpha = a;
  const yy = Math.round(y - 6 * k),
    w = s.length > 1 ? 20 : 12;
  ctx.fillStyle = '#1d1830';
  ctx.fillRect(x - w / 2 - 1, yy - 13, w + 2, 13);
  ctx.fillRect(x - 1, yy, 3, 2);
  ctx.fillStyle = '#f7f3e6';
  ctx.fillRect(x - w / 2, yy - 12, w, 11);
  ctx.fillRect(x, yy - 1, 1, 2);
  ctx.fillStyle = s == '!' ? '#d8304a' : '#1d1830';
  ctx.font = '7px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillText(s, x + 0.5, yy - 3);
  ctx.textAlign = 'left';
  ctx.restore();
}
function drawNPC(n, t) {
  const d = NPCD[n.k],
    G = GROUND,
    x = Math.round(n.x - cam);
  if (x < -60 || x > W + 60) return;
  const st = n.k == 'stele';
  if (!n.an)
    n.an = { blink: 2 + Math.random() * 3, emo: -9, next: t + 4 + Math.random() * 6, hop: -9, seen: false };
  const A = n.an,
    X = npcPrep(d.i),
    w = X.w,
    h = X.h,
    fl = st ? 1 : p.x < n.x ? -1 : 1,
    talking = state == 'talk' && talk && talk.n === n,
    near = Math.abs(p.x - n.x) < 150 && state == 'play';
  if (!st && near && !A.seen) {
    A.seen = true;
    A.hop = t;
    A.emo = t;
    A.es = '!';
  }
  if (!st && t > A.next && !near) {
    A.emo = t;
    A.es = (NPFX[n.k] || {}).emo || '...';
    A.next = t + 7 + Math.random() * 7;
  }
  const blink = !st && (t % A.blink < 0.13 || (talking && Math.sin(t * 1.3 + n.id) > 0.97)),
    hopY = t - A.hop < 0.35 ? -Math.round(Math.sin(((t - A.hop) / 0.35) * Math.PI) * (n.sur ? 7 : 4)) : 0;
  const br = st ? 0 : Math.sin(t * (talking ? 7 : 2.2) + n.id) > (talking ? 0 : 0.35) ? 1 : 0,
    SPL = Math.round(h * 0.42),
    S = 1.5;
  ctx.fillStyle = 'rgba(10,14,8,.32)';
  ctx.beginPath();
  ctx.ellipse(x, G + 1, w * 0.55, 3.5, 0, 0, 7);
  ctx.fill();
  ctx.save();
  ctx.translate(x, G + hopY);
  ctx.scale(fl * S, S);
  const src = blink ? X.b : X.c;
  ctx.drawImage(src, 0, SPL, w, h - SPL, -w / 2, -h + SPL + 1, w, h - SPL);
  const sw = (NPFX[n.k] || {}).sway;
  if (sw) {
    const ox = Math.round(Math.sin(t * 2.6 + n.id));
    ctx.drawImage(src, 0, 0, w, sw, -w / 2 + ox, -h + 1 - br, w, sw);
    ctx.drawImage(src, 0, sw, w, SPL + 1 - sw, -w / 2, -h + 1 - br + sw, w, SPL + 1 - sw);
  } else ctx.drawImage(src, 0, 0, w, SPL + 1, -w / 2, -h + 1 - br, w, SPL + 1);
  const F = NPFX[n.k] || {};
  if (F.gem) {
    const [gx, gy, c] = F.gem,
      pu = 0.35 + 0.3 * Math.sin(t * 2.4 + n.id) + (talking ? 0.25 : 0);
    ctx.globalCompositeOperation = 'lighter';
    const gg = ctx.createRadialGradient(gx + 1 - w / 2, gy + 1 - h, 0, gx + 1 - w / 2, gy + 1 - h, 7);
    gg.addColorStop(0, 'rgba(' + c + ',' + pu + ')');
    gg.addColorStop(1, 'rgba(' + c + ',0)');
    ctx.fillStyle = gg;
    ctx.fillRect(gx - 6 - w / 2, gy - 6 - h, 14, 14);
    if (Math.sin(t * 3 + n.id) > 0.92) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(gx + 1 - w / 2, gy - 4 - h, 1, 3);
      ctx.fillRect(gx - w / 2, gy - 3 - h, 3, 1);
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  if (F.tip && (t * 0.5 + n.id) % 3 < 0.25) {
    const [gx, gy] = F.tip,
      q = ((t * 0.5 + n.id) % 3) / 0.25;
    ctx.fillStyle = 'rgba(255,255,255,' + (1 - q) + ')';
    ctx.fillRect(gx - w / 2, gy + 1 - h - 1, 1, 4);
    ctx.fillRect(gx - 1 - w / 2, gy + 2 - h, 3, 1);
  }
  if (F.stars)
    for (let i = 0; i < X.stars.length; i++) {
      const [a, b] = X.stars[i];
      if (Math.sin(t * 3 + i * 1.7) > 0.6) {
        ctx.fillStyle = 'rgba(255,255,230,.9)';
        ctx.fillRect(a - w / 2, b - h - br * (b < SPL ? 1 : 0), 1, 1);
        ctx.fillStyle = 'rgba(255,255,230,.35)';
        ctx.fillRect(a - 1 - w / 2, b - h, 3, 1);
        ctx.fillRect(a - w / 2, b - 1 - h, 1, 3);
      }
    }
  ctx.restore();
  if (st) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#4fe8d8';
    ctx.globalAlpha = 0.05 + 0.04 * Math.sin(t * 2);
    for (let i = 3; i >= 1; i--) pdisc(x, G - h * S + 30, i * 12);
    ctx.restore();
    ctx.globalAlpha = 1;
    for (let i = 0; i < 4; i++) {
      const q = (t * 0.4 + i / 4) % 1;
      ctx.fillStyle = 'rgba(120,255,235,' + (1 - q) * 0.7 + ')';
      ctx.fillRect(Math.round(x - 14 + ((i * 11) % 28)), Math.round(G - 20 - q * 60), 1, 2);
    }
  }
  if (n.k == 'weaver' && !talking) {
    for (let i = 0; i < 2; i++) {
      const q = (t * 0.35 + i / 2) % 1;
      ctx.fillStyle = ['rgba(230,80,70,', 'rgba(60,190,190,'][i] + (1 - q) * 0.8 + ')';
      ctx.fillRect(Math.round(x + fl * 16 + Math.sin(t * 2 + i * 3) * 4), Math.round(G - 30 - q * 24), 1, 1);
    }
  }
  if (!talking && t - A.emo < 1.6) npcEmote(x + fl * 4, Math.round(G - h * S + hopY - 4), A.es, A.emo, t);
  if (n.sur && t - n.sur < 3.4 && state == 'play')
    bubble2(
      x,
      Math.round(G - h * S - 8),
      '¿¡Y vos de dónde saliste!? ¡Qué rara sos, criatura!',
      Math.floor((t - n.sur - 0.3) * 30),
    );
  if (state == 'play' && Math.abs(p.x - n.x) < 56) {
    ctx.fillStyle = '#fff';
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5);
    ctx.fillText(st ? '[E] LEER' : '[E] HABLAR', x, G - h * S - 8);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
}
function npcSurprise(t) {
  const n = NPCS.find(q => q.k == 'elder' && q.vi == 0);
  if (!n || n.sur || n.done) return;
  if (Math.abs(p.x - n.x) < 190 && state == 'play') {
    n.sur = t;
    n.an = n.an || { blink: 3, emo: -9, next: t + 9, hop: -9, seen: false };
    n.an.seen = true;
    n.an.hop = t;
    n.an.emo = t;
    n.an.es = '!';
    sfx('parry');
  }
}

/* ---------- 32-hud-menu-guardado.js ---------- */
function bar(x, y, w, h, v, col, label) {
  ctx.fillStyle = '#000a';
  ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = col;
  ctx.fillRect(x, y, Math.max(0, w * v), h);
  ctx.fillStyle = '#fff';
  ctx.font = '8px monospace';
  ctx.fillText(label, x + 3, y + h - 2);
}
function icon(id, x, y, s) {
  id = ALIAS[id] || id;
  const k = FOODS.findIndex(f => f.id == id);
  ctx.fillStyle = '#1a1d2c';
  ctx.fillRect(x, y, s, s);
  if (k >= 0) ctx.drawImage(img.itm, k * 16, 0, 16, 16, x, y, s, s);
}
function icon2(id, x, y, s) {
  id = ALIAS[id] || id;
  const k = FOODS.findIndex(f => f.id == id);
  if (k >= 0) {
    ctx.fillStyle = 'rgba(0,0,0,.25)';
    ctx.fillRect(x + 2, y + s - 1, s - 4, 2);
    ctx.drawImage(img.itm, k * 16, 0, 16, 16, x, y, s, s);
  }
}
function drawScythe() {
  if (p.parry > 0) {
    const k = p.parry / 0.28;
    ctx.save();
    ctx.strokeStyle = 'rgba(190,235,255,' + k + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x - cam, pcy(), 30 + (1 - k) * 10, 0, 7);
    ctx.stroke();
    ctx.restore();
  }
}
const MI = ['NEW GAME', 'CONTINUE', 'PERSONALIZAR', 'EXIT'];
function enterMenu() {
  state = 'menu';
  try {
    hasSave = !!leerPartida(); // solo cuenta si la firma es valida (ver 34-proteccion.js)
  } catch (e) {
    hasSave = false;
  }
}
function menuOK(i) {
  return i != 1 || hasSave || paused;
}
function save() {
  try {
    guardarPartida({ area, x: p.x, inv, inv2: invGuardar(), fase: faseGuardar(), sw: hasSword, gem: hasGem, pick: pick.map(k => k.got), hp: p.hp });
  } catch (e) {}
}
function menuPick(i) {
  if (state == 'exit') {
    enterMenu();
    return;
  }
  if (!menuOK(i)) return;
  if (i == 0) {
    init();
    paused = false;
    startNewData();
  } else if (i == 1) {
    if (paused) {
      paused = false;
      state = 'play';
      musResume();
    } else {
      init();
      try {
        const s = leerPartida(); // partida firmada y revisada: si alguien la edito, se rechaza
        if (!s) throw new Error('partida invalida');
        loadArea(s.area || 1);
        p.x = s.x;
        cam = Math.max(0, Math.min(LEVEL - W, p.x - W / 2));
        inv = Array.isArray(s.inv) ? {} : s.inv || {};
        invCargar(s.inv2, s.inv); // casillas del inventario (o conteos viejos)
        faseCargar(s.fase); // avance de la nueva fase (28-espiritus.js)
        hasSword = !!s.sw;
        hasGem = !!s.gem;
        s.pick.forEach((g, k) => {
          if (pick[k]) pick[k].got = g;
        });
        p.hp = s.hp;
      } catch (e) {}
      state = 'play';
      ambient('level');
    }
  } else if (i == 2) enterCust();
  else state = 'exit';
}
function menuKey(e) {
  if (state == 'exit') {
    enterMenu();
    return;
  }
  if (e.code == 'ArrowUp' || e.code == 'KeyW') ms = (ms + MI.length - 1) % MI.length;
  else if (e.code == 'ArrowDown' || e.code == 'KeyS') ms = (ms + 1) % MI.length;
  else if (e.code == 'Enter' || e.code == 'Space') menuPick(ms);
}
const PS = "'Press Start 2P',monospace";
function drawMenu() {
  if (state == 'exit') {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '14px ' + PS;
    ctx.fillText('THANKS FOR PLAYING', W / 2, H / 2);
    ctx.font = '8px ' + PS;
    ctx.fillText('press any key', W / 2, H / 2 + 26);
    ctx.textAlign = 'left';
    return;
  }
  ctx.drawImage(img.mb, 0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, W * 0.6, 0);
  g.addColorStop(0, 'rgba(0,12,4,.7)');
  g.addColorStop(1, 'rgba(0,12,4,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'left';
  ctx.font = '44px ' + PS;
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#0c2410';
  ctx.lineJoin = 'round';
  ctx.strokeText('ASAGMBA', 32, 118);
  ctx.fillStyle = '#f4fff0';
  ctx.fillText('ASAGMBA', 32, 118);
  ctx.font = '12px ' + PS;
  MI.forEach((s, i) => {
    const on = i == ms,
      ok = menuOK(i);
    ctx.fillStyle = !ok ? '#5f6f5c' : on ? '#fff' : '#bfd1b8';
    ctx.fillText((on ? '> ' : '  ') + (i == 1 && paused ? 'RESUME' : s), 36, 196 + i * 30);
  });
  ctx.font = '7px ' + PS;
  ctx.fillStyle = '#9fb596';
  ctx.fillText('W/S + ENTER, or click', 36, H - 14);
}

/* ---------- 33-dibujo-principal.js ---------- */
function draw() {
  const _sk = SHK > 0 && state == 'play' ? SHK : 0;
  ctx.setTransform(
    2,
    0,
    0,
    2,
    Math.round((Math.random() - 0.5) * _sk * 2),
    Math.round((Math.random() - 0.5) * _sk * 2),
  );
  ctx.imageSmoothingEnabled = false;
  if (state == 'skyq') {
    const q = SQ.t,
      a = q < 3.4 ? 0 : q < 4.3 ? 1.5 : q < 4.8 ? 7 : q < 7.4 ? 2.4 : 0;
    ctx.translate((Math.random() - 0.5) * a, (Math.random() - 0.5) * a);
  }
  if (state == 'cust') {
    drawCust();
    return;
  }
  if (state == 'menu' || state == 'exit') {
    drawMenu();
    return;
  }
  if (state == 'newdata' || state == 'void') {
    drawIntro();
    return;
  }
  if (state == 'rewind') {
    drawRewind();
    return;
  }
  if (state == 'cine') {
    drawCine();
    return;
  }
  if (state == 'meet') {
    drawMeet();
    return;
  }
  if (state == 'gate' || (state == 'letter' && area == 4)) {
    drawGate4();
    return;
  }
  ctx.fillStyle = '#10121c';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'left';
  const pfx = state == 'portalfx';
  if (pfx) {
    const k = PF.t / 3.2,
      z = 1 + k * k * 2.2,
      cx = PORTAL.x - cam,
      cy = GROUND - 80;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(z, z);
    ctx.translate(-cx, -cy);
  }
  const tn = performance.now() / 1000;
  if (area == 0) drawRoom(tn);
  else if (area == 1 || area == 5) drawBG1(tn);
  else if (area == 3) drawVoid(tn);
  else if (area == 6) drawCielo(tn);
  else
    for (let i = Math.floor(cam / W); i <= Math.floor(cam / W) + 1; i++) {
      if (i < 0 || i > 2) continue;
      ctx.save();
      ctx.translate(i * W - Math.round(cam), 0);
      if (i % 2) {
        ctx.translate(W, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(img.b2, 0, 0);
      ctx.restore();
    }
  const t = performance.now() / 1000;
  for (const k of pick)
    if (!k.got) {
      const y = (k.y || GROUND) - 18 + Math.sin(t * 3 + k.x) * 3;
      icon2(k.id, Math.round(k.x - cam - 12), Math.round(y - 14), 24);
    }
  drawPlat();
  drawStructs(t);
  drawShrines(t);
  drawTele(t);
  drawTeleProps(t);
  drawPath(t);
  drawChests(t);
  drawGems(t);
  drawCamps(t);
  drawEnemies(t);
  drawGate(t);
  if ((B.on || B.pt > 0) && area != 3) {
    const pw = img.po.width * B.pt,
      ph = img.po.height * B.pt;
    if (pw > 1) ctx.drawImage(img.po, Math.round(B.px - cam - pw / 2), Math.round(GROUND - ph), pw, ph);
  }
  if (B.on) {
    const F = B.open ? OF : CF,
      sh = B.open ? img.bo : img.bc;
    ctx.save();
    ctx.globalAlpha = (B.flash > 0 ? 0.5 : 1) * B.a;
    ctx.translate(Math.round(B.x - cam), Math.round(B.y));
    ctx.scale(B.face, 1);
    if (B.st == 'enter') ctx.scale(0.6 + 0.4 * B.a, 0.6 + 0.4 * B.a);
    if (B.ph2) drawMon();
    else {
      const fi = Math.floor((performance.now() / 1000) * 6) % F[2];
      ctx.drawImage(sh, fi * F[0], 0, F[0], F[1], -F[0] / 2, -F[1] / 2, F[0], F[1]);
    }
    ctx.restore();
  }
  for (const s of shots) {
    ctx.save();
    ctx.translate(Math.round(s.x - cam), Math.round(s.y));
    ctx.rotate(s.a);
    ctx.drawImage(img.bs, -img.bs.width / 2, -img.bs.height / 2);
    ctx.restore();
  }
  if (B.beam) drawBeam(t);
  const OC = {
    g: ['#ff9d00', '#fff3a0'],
    i: ['#27b8ff', '#e4f8ff'],
    f: ['#ff3a14', '#ffd34d'],
    b: ['#cfc8b2', '#ffffff'],
    p: ['#9a3dff', '#f0d4ff'],
    v: ['#3ed84a', '#e8ffd9'],
  };
  for (const k in OC) {
    const L = orbs.filter(o => (o.c || 'g') == k);
    if (!L.length) continue;
    ctx.fillStyle = OC[k][0];
    ctx.beginPath();
    for (const o of L) {
      ctx.moveTo(o.x - cam + 6, o.y);
      ctx.arc(o.x - cam, o.y, 6, 0, 7);
    }
    ctx.fill();
    ctx.fillStyle = OC[k][1];
    ctx.beginPath();
    for (const o of L) {
      ctx.moveTo(o.x - cam + 3.5, o.y);
      ctx.arc(o.x - cam, o.y, 3.5, 0, 7);
    }
    ctx.fill();
  }
  drawDuskOrbs(t);
  p.ghosts = p.ghosts.filter(g => (g.a -= 0.04) > 0);
  for (const g of p.ghosts) sprP(g.s, g.x, g.y, g.f, g.a);
  const blink = p.inv > 0 && Math.floor(t * 14) % 2;
  for (const f of fx) {
    ctx.globalAlpha = Math.max(0, f.l / 0.5);
    ctx.fillStyle = '#cbbfa8';
    ctx.fillRect(Math.round(f.x - cam), Math.round(f.y), 3, 3);
  }
  ctx.globalAlpha = 1;
  if (state == 'skyq') drawAbsorb();
  else if (!blink && !(state == 'portalfx' && PF.t > 1.9)) {
    drawPShadow();
    drawPlayer();
    drawScythe();
  }
  drawSlashes();
  drawPFX();
  if (pfx) {
    ctx.restore();
    pfxOverlay();
  }
  if (area == 3) drawReflect(performance.now() / 1000);
  else if (area == 1 || area == 5) {
    drawWater1(performance.now() / 1000);
    drawFore(performance.now() / 1000);
  } else if (area == 6) drawCieloAgua(performance.now() / 1000);
  // HUD
  bar(8, 8, 110, 9, p.hp / 100, '#d6384a', 'HP ' + Math.ceil(p.hp));
  bar(8, 21, 110, 7, p.sta / 100, '#3fcf6b', 'STAMINA');
  if (B.on && B.st != 'enter') bar(W / 2 - 110, H - 30, 220, 8, B.hp / B.max, '#9b2fd6', 'ARLOS');
  drawHotbar(); // barra rápida de 5 casillas (21c-inventario.js)
  ctx.fillStyle = '#fff';
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  if (toastT > 0) ctx.fillText(toast, W / 2, 48);
  if (INV.open) drawInventario(); // inventario interactivo (21c-inventario.js)

  if (state == 'intro') {
    const a = iT < 0.6 ? iT / 0.6 : iT > 2.6 ? Math.max(0, (3.2 - iT) / 0.6) : 1;
    ctx.fillStyle = 'rgba(0,0,0,' + a + ')';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha =
      Math.max(0, Math.min(1, (iT - 0.5) / 0.6)) * (iT > 2.5 ? Math.max(0, (3.2 - iT) / 0.7) : 1);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 76px Georgia,serif';
    ctx.textAlign = 'center';
    try {
      ctx.letterSpacing = '14px';
    } catch (e) {}
    ctx.fillText('ARLOS', W / 2 + 7, H / 2 + 26);
    try {
      ctx.letterSpacing = '0px';
    } catch (e) {}
    ctx.globalAlpha = 1;
  }
  if (state == 'letter') drawLetter();
  if (state == 'talk') drawTalk();
  if (state == 'tele') drawTeleFx();
  if (state == 'skyq') drawSkyQ();
  if (state == 'trans') {
    const s = trans.t,
      a = s < 1 ? s : s < 1.9 ? 1 : Math.max(0, (2.7 - s) / 0.8);
    ctx.fillStyle = 'rgba(0,0,0,' + a + ')';
    ctx.fillRect(0, 0, W, H);
    if (a > 0.95) {
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.font = '26px ' + PS;
      ctx.fillText('AREA 2', W / 2, H / 2);
      ctx.font = '9px ' + PS;
      ctx.fillText('Twilight Grove', W / 2, H / 2 + 28);
    }
  }
  if (state == 'dead' || state == 'win') {
    ctx.fillStyle = '#000b';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(state == 'win' ? winText : 'You fell.', W / 2, H / 2);
    ctx.font = '10px monospace';
    ctx.fillText('Press R to play again', W / 2, H / 2 + 20);
  }
  drawZC();
  if (flashW > 0) {
    ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, flashW) + ')';
    ctx.fillRect(0, 0, W, H);
    flashW -= 0.02;
  }
  if (blackIn > 0) {
    ctx.fillStyle = 'rgba(0,0,0,' + blackIn + ')';
    ctx.fillRect(0, 0, W, H);
    blackIn -= 0.02;
  }
  ctx.textAlign = 'left';
}

/* ---------- 34-proteccion.js ---------- */
/* ===== PROTECCION DE STATS (personaje y enemigos) =====
   Capas de defensa:
   1) Todo el juego corre dentro de un cierre privado (lo arma build.py), asi que desde la
      consola del navegador NO existen p, B, enemies, ET, ATK... no hay nada que tocar.
   2) Las tablas de stats (vida de enemigos, ataques, comidas) quedan congeladas: ni el propio
      codigo puede cambiarlas despues de cargar.
   3) Un vigilante revisa cada cuadro que ningun valor se salga de lo legal (vida, stamina,
      escudo, invulnerabilidad, efectos de comida, vida de enemigos y del jefe) y lo corrige.
   4) La partida guardada va firmada: si alguien la edita en localStorage, se rechaza.
   Nota honesta: en un juego que corre en el navegador nada es 100% imposible de trampear para
   alguien experto con el depurador, pero esto bloquea los trucos normales (consola,
   editar el guardado, cambiar valores sueltos). */

const LIM = Object.freeze({
  hp: 100, // vida maxima de Smara
  sta: 100, // stamina maxima
  escudo: 3, // golpes que aguanta el quesillo
  invul: 2, // segundos maximos de invulnerabilidad seguidos
  porItem: 9, // maximo de cada comida en el inventario
  jefe: Object.freeze([300, 220]), // vida maxima de Arlos en fase 1 y 2
});

/* ---- 2) tablas congeladas ---- */
function congelar(o) {
  if (o && typeof o == 'object' && !Object.isFrozen(o)) {
    Object.freeze(o);
    for (const k of Object.keys(o)) congelar(o[k]);
  }
  return o;
}
congelar(ET);
congelar(FOODS);
congelar(ITEMS);
congelar(ALIAS);
congelar(DUSK);
Object.freeze(ATK);
ATK.forEach(a => Object.freeze(a));

/* ---- 3) vigilante de stats ---- */
const VIDA_ENEMIGO = new WeakMap(); // vida con la que nacio cada enemigo
const num = (v, def) => (typeof v == 'number' && Number.isFinite(v) ? v : def);
const tope = (v, a, b) => Math.max(a, Math.min(b, v));
let vidaLegal = LIM.hp;

function vigilarStats() {
  if (p) {
    p.hp = tope(num(p.hp, vidaLegal), -999, LIM.hp);
    vidaLegal = p.hp;
    p.sta = tope(num(p.sta, 0), 0, LIM.sta);
    p.shield = tope(Math.floor(num(p.shield, 0)), 0, LIM.escudo);
    p.inv = Math.min(num(p.inv, 0), LIM.invul);
  }
  if (buf) {
    for (const k in buf) {
      const f = ITEMS[k];
      if (!f) delete buf[k];
      else buf[k] = Math.min(num(buf[k], 0), f.t);
    }
  }
  invValidar(); // casillas del inventario: tipos válidos y máximo 9 por casilla (21c-inventario.js)
  if (enemies) {
    for (const e of enemies) {
      if (!VIDA_ENEMIGO.has(e)) VIDA_ENEMIGO.set(e, num(e.hp, ET[e.t] ? ET[e.t].hp : 1));
      const max = VIDA_ENEMIGO.get(e);
      e.hp = Math.min(num(e.hp, max), max);
      if (e.mhp != null && e.mhp !== max) e.mhp = max;
    }
  }
  if (B) {
    const maxB = B.ph2 ? LIM.jefe[1] : LIM.jefe[0];
    if (B.max !== maxB) B.max = maxB;
    B.hp = Math.min(num(B.hp, maxB), maxB);
  }
}

// el vigilante corre antes de cada cuadro del juego
const loopOriginal = loop;
loop = function (now) {
  vigilarStats();
  loopOriginal(now);
};

/* ---- 4) partida guardada con firma ---- */
const CLAVE_PARTIDA = 'asagmba';
const SAL = 'Mulukuku·ribera-de-sahinos·Smara·' + 0x5a6b;
function huella(txt) {
  let h1 = 0xdeadbeef ^ 0x9e37,
    h2 = 0x41c6ce57 ^ 0x79b9;
  for (let i = 0; i < txt.length; i++) {
    const c = txt.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(36) + '-' + (h1 >>> 0).toString(36);
}
function guardarPartida(o) {
  try {
    const d = JSON.stringify(o);
    localStorage.setItem(CLAVE_PARTIDA, JSON.stringify({ v: 2, d, f: huella(SAL + d + SAL) }));
  } catch (e) {}
}
function leerPartida() {
  try {
    const w = JSON.parse(localStorage.getItem(CLAVE_PARTIDA));
    if (!w || w.v !== 2 || typeof w.d != 'string' || w.f !== huella(SAL + w.d + SAL)) return null;
    return limpiarPartida(JSON.parse(w.d));
  } catch (e) {
    return null;
  }
}
// aunque la firma sea buena, cada dato se revisa contra los limites del juego
function limpiarPartida(s) {
  if (!s || typeof s != 'object') return null;
  const area = Number.isInteger(s.area) && s.area >= 0 && s.area <= 6 ? s.area : 1;
  const inv = {};
  if (s.inv && typeof s.inv == 'object' && !Array.isArray(s.inv))
    for (const k in s.inv) if (ITEMS[k]) inv[k] = tope(Math.floor(num(s.inv[k], 0)), 0, LIM.porItem);
  return {
    area,
    x: num(s.x, 120),
    inv,
    inv2: s.inv2 && typeof s.inv2 == 'object' ? s.inv2 : null, // invCargar revisa cada casilla
    fase: s.fase && typeof s.fase == 'object' ? s.fase : null, // faseCargar solo acepta claves conocidas
    sw: !!s.sw,
    gem: !!s.gem,
    pick: Array.isArray(s.pick) ? s.pick.map(g => !!g) : [],
    hp: tope(num(s.hp, LIM.hp), 1, LIM.hp),
  };
}

/* ---------- 35-opciones.js ---------- */
/* =====================================================================
   OPCIONES (la tuerca del menú principal)
   · Arriba a la derecha del menú hay una tuerca. Click en ella (o la tecla O)
     abre las OPCIONES.
   · AUDIO: volumen general, música, efectos y silenciar (lo mismo que la M).
   · JUEGO: la dificultad (FÁCIL · NORMAL · MEDIO · DIFÍCIL), ver 36-dificultad.js
   · GRÁFICOS: BAJO · MEDIO · ALTO · ULTRA
       BAJO  : sin reflejo en el agua, sin resplandores, pocas partículas,
               menos pasto y sin luciérnagas (para compus lentas)
       MEDIO : reflejo y resplandores, pero menos partículas y luciérnagas
       ALTO  : todo como fue diseñado
       ULTRA : todo + bloom (la luz se derrama), viñeta, grano de película,
               más luciérnagas y pasto más tupido
   · Se guarda en el navegador y se aplica al instante (se ve detrás del panel).
   Controles: W/S elegir · A/D cambiar · ENTER activar · ESC volver
   ===================================================================== */
const OPC = { general: 1, musica: 0.8, efectos: 1, calidad: 2, sel: 0, hover: -1, gearHover: false, abierta: 0 };
const GFX_NOMBRES = ['BAJO', 'MEDIO', 'ALTO', 'ULTRA'];
const GFX_INFO = [
  ['Sin reflejo en el agua ni resplandores.', 'Pocas partículas. Para computadoras lentas.'],
  ['Reflejo y resplandores encendidos.', 'Menos partículas y luciérnagas.'],
  ['Todo como fue diseñado.', 'Recomendado.'],
  ['RTX: rayos de luz, bloom y sombras reales.', '(!) Baja el rendimiento en PCs lentas.'],
];
// GFX.n lo leen otras partes del juego (pasto, luciérnagas, partículas, reflejo)
const GFX = { n: 2 };
(() => {
  try {
    const o = JSON.parse(localStorage.getItem('asagmba_opciones'));
    if (o) for (const k of ['general', 'musica', 'efectos', 'calidad']) if (typeof o[k] == 'number') OPC[k] = o[k];
    if (o && o.mudo) muted = true;
  } catch (e) {}
  OPC.calidad = Math.max(0, Math.min(3, Math.round(OPC.calidad)));
  GFX.n = OPC.calidad;
})();
function opcGuardar() {
  try {
    localStorage.setItem('asagmba_opciones', JSON.stringify({ general: OPC.general, musica: OPC.musica, efectos: OPC.efectos, calidad: OPC.calidad, mudo: muted }));
  } catch (e) {}
}

/* ---------------- AUDIO: tres canales ----------------
   antes todo iba a MG. Ahora: MG = efectos · OPC.bm = música · los dos van a OPC.bg (general) */
function opcAudio() {
  if (!AC || !MG) return;
  if (!OPC.bg) {
    try {
      OPC.bg = AC.createGain();
      OPC.bg.connect(AC.destination);
      OPC.bm = AC.createGain();
      OPC.bm.connect(OPC.bg);
      MG.disconnect();
      MG.connect(OPC.bg);
    } catch (e) { OPC.bg = null; return; }
  }
  // la música (la ópera de Arlos y la música por zona) pasa a su propio canal
  for (const n of [MUS.g, ZM.bus]) if (n && !n.opc) { n.disconnect(); n.connect(OPC.bm); n.opc = 1; }
  const g = OPC.general, ef = muted ? 0 : 0.6 * OPC.efectos, mu = muted ? 0 : 0.6 * OPC.musica;
  if (OPC.bg.gain.value != g) OPC.bg.gain.value = g;
  if (MG.gain.value != ef) MG.gain.value = ef;
  if (OPC.bm.gain.value != mu) OPC.bm.gain.value = mu;
}

/* ---------------- GRÁFICOS ---------------- */
// partículas: en BAJO y MEDIO salen menos
const pfxOPC = pfx;
pfx = function (x, y, vx, vy, l, c, s, g) {
  if (GFX.n == 0 && Math.random() < 0.7) return;
  if (GFX.n == 1 && Math.random() < 0.4) return;
  pfxOPC(x, y, vx, vy, l, c, s, g);
};
// reflejo del agua: en BAJO no se copia nada (el agua queda lisa)
const grabBandOPC = grabBand;
grabBand = function (y0, y1) {
  if (GFX.n > 0 || !RFC) return grabBandOPC(y0, y1);
  if (!OPC.rfLimpio) { RFX.clearRect(0, 0, RFC.width, RFC.height); OPC.rfLimpio = 1; }
  return Math.max(0, Math.floor(y0 * 2));
};
// resplandor del Bosque de la Niebla: apagado en BAJO
const brilloBloomOPC = brilloBloom;
brilloBloom = function (t) {
  if (GFX.n == 0) return;
  brilloBloomOPC(t);
};
// ULTRA: bloom + viñeta + grano, pintado encima de todo
const PFXU = {};
function ultraPreparar() {
  if (PFXU.ok && PFXU.w == cv.width) return;
  PFXU.ok = 1;
  PFXU.w = cv.width;
  PFXU.chico = document.createElement('canvas');
  PFXU.chico.width = Math.round(cv.width / 4);
  PFXU.chico.height = Math.round(cv.height / 4);
  PFXU.cx = PFXU.chico.getContext('2d');
  PFXU.vin = document.createElement('canvas');
  PFXU.vin.width = cv.width;
  PFXU.vin.height = cv.height;
  const v = PFXU.vin.getContext('2d'), r = Math.hypot(cv.width, cv.height) / 2;
  const g = v.createRadialGradient(cv.width / 2, cv.height / 2, r * 0.45, cv.width / 2, cv.height / 2, r);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,8,.55)');
  v.fillStyle = g;
  v.fillRect(0, 0, cv.width, cv.height);
  PFXU.grano = document.createElement('canvas');
  PFXU.grano.width = PFXU.grano.height = 128;
  const q = PFXU.grano.getContext('2d'), d = q.createImageData(128, 128);
  for (let i = 0; i < d.data.length; i += 4) { const c = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = c; d.data[i + 3] = 40; }
  q.putImageData(d, 0, 0);
  PFXU.patron = ctx.createPattern(PFXU.grano, 'repeat');
}
function ultraDibujar() {
  ultraPreparar();
  const c = PFXU.cx, w = PFXU.chico.width, h = PFXU.chico.height;
  // bloom: la imagen achicada (borrosa) y con las luces realzadas, sumada encima
  c.globalCompositeOperation = 'copy';
  c.imageSmoothingEnabled = true;
  c.filter = 'brightness(.8) contrast(2.2) saturate(1.4)';
  c.drawImage(cv, 0, 0, w, h);
  c.filter = 'none';
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.32;
  ctx.drawImage(PFXU.chico, 0, 0, cv.width, cv.height);
  // viñeta
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.drawImage(PFXU.vin, 0, 0);
  // grano que se mueve
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.5;
  ctx.translate(Math.floor(Math.random() * 128), Math.floor(Math.random() * 128));
  ctx.fillStyle = PFXU.patron;
  ctx.fillRect(-128, -128, cv.width + 128, cv.height + 128);
  ctx.restore();
  ctx.imageSmoothingEnabled = false;
}

/* ---------------- la tuerca (pixel art, 8 dientes, gira cuando la apuntás) ---------------- */
const TUERCA = [];
function tuercaPreparar() {
  if (TUERCA.length) return;
  for (let f = 0; f < 6; f++) {
    const c = document.createElement('canvas');
    c.width = c.height = 26;
    const x = c.getContext('2d'), rot = (f / 6) * (Math.PI / 4);
    for (let j = 0; j < 26; j++)
      for (let i = 0; i < 26; i++) {
        const dx = i - 12.5, dy = j - 12.5, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx) - rot;
        const diente = Math.cos(a * 8) > 0.35;
        const borde = diente ? 12 : 9.5;
        if (r > borde || r < 3.6) continue;
        // luz arriba a la izquierda, sombra abajo a la derecha
        const luz = (-dx - dy) / (r || 1);
        x.fillStyle = r > borde - 1.2 || r < 4.8 ? '#20283a' : luz > 0.5 ? '#e6edf5' : luz > -0.3 ? '#b3bfcc' : '#7b889a';
        x.fillRect(i, j, 1, 1);
      }
    TUERCA.push(c);
  }
}
const TU = { x: W - 40, y: 12, s: 28 }; // donde está en el menú
function tuercaDibujar(t) {
  tuercaPreparar();
  const on = OPC.gearHover || state == 'opc';
  const f = on ? Math.floor(t * 10) % 6 : 0;
  ctx.fillStyle = on ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.35)';
  ctx.fillRect(TU.x - 2, TU.y - 2, TU.s + 4, TU.s + 4);
  ctx.drawImage(TUERCA[f], TU.x + 1, TU.y + 1);
  if (on && state == 'menu') {
    ctx.font = '7px ' + PS;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#f4fff0';
    ctx.fillText('OPCIONES', TU.x - 8, TU.y + 18);
    ctx.textAlign = 'left';
  }
}
function enTuerca(x, y) {
  return x > TU.x - 4 && x < TU.x + TU.s + 4 && y > TU.y - 4 && y < TU.y + TU.s + 4;
}

/* ---------------- la pantalla de opciones ---------------- */
// filas: 0 general · 1 música · 2 efectos · 3 silenciar · 4 calidad · 5 volver
const OP = { x: 130, y: 26, w: 440, h: 362 };
const OP_FILAS = [
  { k: 'general', n: 'VOLUMEN GENERAL', y: 86 },
  { k: 'musica', n: 'MÚSICA', y: 108 },
  { k: 'efectos', n: 'EFECTOS', y: 130 },
  { k: 'mudo', n: 'SILENCIAR TODO', y: 152 },
  { k: 'calidad', n: 'CALIDAD', y: 196 },
  { k: 'dificultad', n: 'DIFICULTAD', y: 286 },
  { k: 'consejos', n: 'CONSEJOS', y: 344 },
  { k: 'volver', n: 'VOLVER', y: 368 },
];
const SL = { x: 330, w: 150 }; // barra de los volúmenes
function abrirOpciones() {
  OPC.volverA = state;
  state = 'opc';
  OPC.sel = 0;
  OPC.abierta = 0;
  sfx('page');
}
function cerrarOpciones() {
  opcGuardar();
  state = OPC.volverA == 'opc' ? 'menu' : OPC.volverA || 'menu';
  sfx('page');
}
function opcCambiar(fila, d) {
  const F = OP_FILAS[fila];
  if (F.k == 'general' || F.k == 'musica' || F.k == 'efectos') {
    OPC[F.k] = Math.max(0, Math.min(1, Math.round((OPC[F.k] + d * 0.1) * 10) / 10));
    if (F.k != 'musica') sfx('hit'); // para escuchar cómo queda
  } else if (F.k == 'mudo') {
    muted = !muted;
    if (!muted) sfx('hit');
  } else if (F.k == 'calidad') {
    OPC.calidad = Math.max(0, Math.min(3, OPC.calidad + d));
    GFX.n = OPC.calidad;
    OPC.rfLimpio = 0; if (OPC.calidad == 3) OPC.avisoT = 4.5;
    sfx('dash');
  } else if (F.k == 'dificultad') difCambiar(d == 0 ? 1 : d, true);
  else if (F.k == 'consejos') consejosAlternar();
  else if (F.k == 'volver' && d == 0) cerrarOpciones();
  opcGuardar();
}
function opcTecla(e) {
  const c = e.code;
  if (c == 'Escape' || c == 'Backspace') return cerrarOpciones();
  if (c == 'ArrowUp' || c == 'KeyW') { OPC.sel = (OPC.sel + OP_FILAS.length - 1) % OP_FILAS.length; sfx('step'); }
  else if (c == 'ArrowDown' || c == 'KeyS') { OPC.sel = (OPC.sel + 1) % OP_FILAS.length; sfx('step'); }
  else if (c == 'ArrowLeft' || c == 'KeyA') opcCambiar(OPC.sel, -1);
  else if (c == 'ArrowRight' || c == 'KeyD') opcCambiar(OPC.sel, 1);
  else if (c == 'Enter' || c == 'Space') {
    const k = OP_FILAS[OPC.sel].k;
    if (k == 'volver') cerrarOpciones();
    else if (k == 'mudo') opcCambiar(OPC.sel, 0);
    else if (k == 'calidad') { OPC.calidad = (OPC.calidad + 1) % 4; GFX.n = OPC.calidad; OPC.rfLimpio = 0; if (OPC.calidad == 3) OPC.avisoT = 4.5; sfx('dash'); opcGuardar(); }
    else if (k == 'dificultad') difCambiar(1, true);
    else if (k == 'consejos') consejosAlternar();
    else opcCambiar(OPC.sel, 1);
  }
}
// las cajitas de calidad
function cajaCalidad(i) {
  return { x: 236 + i * 80, y: 184, w: 74, h: 20 };
}
function opcFilaEn(x, y) {
  if (x < OP.x || x > OP.x + OP.w) return -1;
  for (let i = 0; i < OP_FILAS.length; i++) if (Math.abs(y - (OP_FILAS[i].y - 4)) < 11) return i;
  return -1;
}
function opcClick(x, y) {
  const i = opcFilaEn(x, y);
  if (i < 0) return;
  OPC.sel = i;
  const k = OP_FILAS[i].k;
  if (k == 'general' || k == 'musica' || k == 'efectos') {
    if (x >= SL.x - 6 && x <= SL.x + SL.w + 6) {
      OPC[k] = Math.max(0, Math.min(1, Math.round(((x - SL.x) / SL.w) * 10) / 10));
      if (k != 'musica') sfx('hit');
      opcGuardar();
    }
  } else if (k == 'mudo') opcCambiar(i, 0);
  else if (k == 'calidad') {
    for (let q = 0; q < 4; q++) {
      const b = cajaCalidad(q);
      if (x > b.x && x < b.x + b.w) { OPC.calidad = q; GFX.n = q; OPC.rfLimpio = 0; if (OPC.calidad == 3) OPC.avisoT = 4.5; sfx('dash'); opcGuardar(); }
    }
  } else if (k == 'dificultad') {
    for (let q = 0; q < 4; q++) {
      const b = cajaCalidad(q);
      if (x > b.x && x < b.x + b.w) difPoner(q);
    }
  } else if (k == 'consejos') consejosAlternar();
  else if (k == 'volver') cerrarOpciones();
}
function opcDibujar(t) {
  OPC.abierta = Math.min(1, OPC.abierta + 1 / 12);
  const a = OPC.abierta, e = 0.9 + 0.1 * a;
  // detrás se ve el menú, oscurecido
  drawMenu();
  ctx.fillStyle = 'rgba(0,6,2,' + 0.55 * a + ')';
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(e, e);
  ctx.translate(-W / 2, -H / 2);
  ctx.globalAlpha = a;
  // panel
  ctx.fillStyle = '#0c2410';
  ctx.fillRect(OP.x - 3, OP.y - 3, OP.w + 6, OP.h + 6);
  ctx.fillStyle = '#16341b';
  ctx.fillRect(OP.x, OP.y, OP.w, OP.h);
  ctx.fillStyle = '#24502c';
  ctx.fillRect(OP.x, OP.y, OP.w, 2);
  ctx.fillStyle = '#081a0b';
  ctx.fillRect(OP.x, OP.y + OP.h - 2, OP.w, 2);
  ctx.font = '14px ' + PS;
  ctx.fillStyle = '#f4fff0';
  ctx.textAlign = 'center';
  ctx.fillText('OPCIONES', W / 2, OP.y + 26);
  ctx.textAlign = 'left';
  // títulos de sección
  ctx.font = '8px ' + PS;
  ctx.fillStyle = '#8fd49a';
  ctx.fillText('AUDIO', OP.x + 20, 66);
  ctx.fillText('GRÁFICOS', OP.x + 20, 176);
  ctx.fillText('JUEGO', OP.x + 20, 266);
  ctx.fillStyle = '#24502c';
  ctx.fillRect(OP.x + 70, 62, OP.w - 90, 1);
  ctx.fillRect(OP.x + 100, 172, OP.w - 120, 1);
  ctx.fillRect(OP.x + 70, 262, OP.w - 90, 1);
  for (let i = 0; i < OP_FILAS.length; i++) {
    const F = OP_FILAS[i], on = OPC.sel == i, y = F.y;
    if (on) { ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(OP.x + 8, y - 15, OP.w - 16, 22); }
    ctx.font = '8px ' + PS;
    ctx.fillStyle = on ? '#ffffff' : '#bfd1b8';
    if (F.k == 'volver') {
      ctx.textAlign = 'center';
      ctx.fillText((on ? '> ' : '') + F.n + (on ? ' <' : ''), W / 2, y);
      ctx.textAlign = 'left';
      continue;
    }
    ctx.fillText((on ? '> ' : '  ') + F.n, OP.x + 20, y);
    if (F.k == 'general' || F.k == 'musica' || F.k == 'efectos') {
      // barra de 10 cuadritos
      const v = OPC[F.k], n = Math.round(v * 10);
      for (let q = 0; q < 10; q++) {
        ctx.fillStyle = q < n ? (muted ? '#5f6f5c' : on ? '#8ff09f' : '#5fc070') : '#0a1e0d';
        ctx.fillRect(SL.x + q * 15, y - 10, 12, 10);
      }
      ctx.fillStyle = on ? '#ffffff' : '#9fb596';
      ctx.fillText(Math.round(v * 100) + '%', SL.x + SL.w + 8, y);
      if (on) { ctx.fillText('<', SL.x - 14, y); }
    } else if (F.k == 'mudo') {
      ctx.fillStyle = muted ? '#ff8a6a' : '#8ff09f';
      ctx.fillText(muted ? 'SÍ' : 'NO', SL.x, y);
      ctx.fillStyle = '#6f8a6a';
      ctx.font = '6px ' + PS;
      ctx.fillText('(tecla M)', SL.x + 34, y);
    } else if (F.k == 'calidad') {
      for (let q = 0; q < 4; q++) {
        const b = cajaCalidad(q), sel = OPC.calidad == q;
        ctx.fillStyle = sel ? '#8ff09f' : '#0a1e0d';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = sel ? '#0c2410' : '#24502c';
        ctx.fillRect(b.x + 2, b.y + 2, b.w - 4, b.h - 4);
        ctx.fillStyle = sel ? '#ffffff' : '#9fb596';
        ctx.textAlign = 'center';
        ctx.font = '7px ' + PS;
        ctx.fillText(GFX_NOMBRES[q], b.x + b.w / 2, b.y + 14);
        ctx.textAlign = 'left';
      }
      // qué hace cada calidad
      ctx.font = '7px ' + PS;
      ctx.fillStyle = '#d6e8cf';
      const I = GFX_INFO[OPC.calidad];
      ctx.fillText(I[0], OP.x + 34, 222);
      ctx.fillStyle = OPC.calidad == 3 ? '#ffb05a' : '#9fb596';
      ctx.fillText(I[1], OP.x + 34, 236);
      // mini muestra de partículas según la calidad
      const cant = [3, 7, 12, 18][OPC.calidad];
      for (let k = 0; k < cant; k++) {
        const px = OP.x + 34 + ((k * 53 + t * 40) % (OP.w - 70)), py = 246 + Math.sin(t * 2 + k) * 4;
        ctx.fillStyle = k % 2 ? '#e4dcff' : '#8ff6ff';
        ctx.fillRect(Math.round(px), Math.round(py), 2, 2);
      }
    } else if (F.k == 'dificultad') difFilaDibujar(on, t); // 36-dificultad.js
    else if (F.k == 'consejos') {
      ctx.fillStyle = CSJ.on ? '#8ff09f' : '#ff8a6a';
      ctx.fillText(CSJ.on ? 'SÍ' : 'NO', SL.x, y);
      ctx.fillStyle = '#6f8a6a';
      ctx.font = '6px ' + PS;
      ctx.fillText(CSJ.on ? '(al prenderlos se ven todos otra vez)' : '(el juego no explica nada nuevo)', SL.x + 34, y);
    }
  }
  ctx.font = '6px ' + PS;
  ctx.fillStyle = '#6f8a6a';
  ctx.textAlign = 'center';
  ctx.fillText('W/S elegir · A/D cambiar · ENTER · ESC volver · o con el mouse', W / 2, OP.y + OP.h - 8);
  ctx.textAlign = 'left';
  ctx.restore();
  ctx.globalAlpha = 1;
}

/* ---------------- conexión ---------------- */
addEventListener(
  'keydown',
  e => {
    if (state == 'opc') {
      e.preventDefault();
      e.stopImmediatePropagation(); // que no la agarren los controles del juego (R reinicia, etc.)
      if (!e.repeat || /Arrow|Key[WASD]/.test(e.code)) opcTecla(e);
      return;
    }
    if (state == 'menu' && e.code == 'KeyO' && !e.repeat) {
      e.preventDefault();
      e.stopImmediatePropagation();
      abrirOpciones();
    }
  },
  true,
);
cv.addEventListener('mousemove', e => {
  const [x, y] = mpos(e);
  OPC.gearHover = state == 'menu' && enTuerca(x, y);
  if (state == 'opc') { const i = opcFilaEn(x, y); if (i >= 0) OPC.sel = i; }
  cv.style.cursor = OPC.gearHover || (state == 'opc' && opcFilaEn(x, y) >= 0) ? 'pointer' : '';
});
cv.addEventListener('mousedown', e => {
  const [x, y] = mpos(e);
  if (state == 'opc') return opcClick(x, y);
  if (state == 'menu' && enTuerca(x, y)) abrirOpciones();
});
// la música del menú sigue sonando dentro de las opciones
const zmWantOPC = zmWant;
zmWant = function () {
  if (state == 'opc') return 'menu';
  return zmWantOPC();
};
// el menú se dibuja con su tuerca
const drawMenuOPC = drawMenu;
drawMenu = function () {
  drawMenuOPC();
  if (state == 'menu') {
    const t = performance.now() / 1000;
    tuercaDibujar(t);
    ctx.font = '7px ' + PS;
    ctx.fillStyle = '#9fb596';
    ctx.textAlign = 'right';
    ctx.fillText('O: OPCIONES', W - 14, H - 14);
    ctx.textAlign = 'left';
  }
};
const drawOPC = draw;
draw = function () {
  opcAudio();
  if (state == 'opc') {
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.imageSmoothingEnabled = false;
    opcDibujar(performance.now() / 1000);
    tuercaDibujar(performance.now() / 1000);
  } else drawOPC();
  if (GFX.n == 3) ultraDibujar();
};

/* ---------- 36-dificultad.js ---------- */
/* =====================================================================
   DIFICULTAD: FÁCIL · NORMAL · MEDIO · DIFÍCIL
   Se elige al empezar una NUEVA PARTIDA (y se puede cambiar en la tuerca).
                 golpes para   stamina   daño que   velocidad de   jefes
                 matar         gasta     recibe     los enemigos   (vida)
     FÁCIL       como antes    no        x0.7       normal         -20%
     NORMAL      5             no        x1         normal         igual
     MEDIO       6             sí        x1.25      +10%           +15%
     DIFÍCIL     7             sí        x1.5       +20%           +30%
   · "Golpes" = cortes normales de Smara (20 de daño). Los ataques fuertes
     del combo matan antes.
   · Desde MEDIO los enemigos tienen MÁS ATAQUES:
       - el Espanto tira su lanza de lejos (agachate o saltala)
       - la bestia roja da un SALTO APLASTANTE que hace temblar el piso
     En DIFÍCIL atacan todavía más seguido.
   · Los enemigos chicos muestran una barrita de vida cuando los golpeás.
   ===================================================================== */
const DIF_NOM = ['FÁCIL', 'NORMAL', 'MEDIO', 'DIFÍCIL'];
const DIF_COL = ['#7fd6ff', '#8ff09f', '#ffd25a', '#ff6a5a'];
const DIF_DAT = [
  { golpes: 0, sta: false, dano: 0.7, vel: 1, jefe: 0.8, mon: 5, esp: 4, ataques: 0, info: ['Enemigos como siempre. Sin stamina.', 'Recibís menos daño. Para disfrutar la historia.'] },
  { golpes: 5, sta: false, dano: 1, vel: 1, jefe: 1, mon: 7, esp: 6, ataques: 0, info: ['Los enemigos aguantan 5 espadazos.', 'Sin stamina.'] },
  { golpes: 6, sta: true, dano: 1.25, vel: 1.1, jefe: 1.15, mon: 8, esp: 7, ataques: 1, info: ['6 espadazos, con stamina, pegan más fuerte.', 'Los enemigos tienen ataques nuevos.'] },
  { golpes: 7, sta: true, dano: 1.5, vel: 1.2, jefe: 1.3, mon: 9, esp: 8, ataques: 2, info: ['7 espadazos, con stamina, pegan mucho más.', 'Más rápidos y atacan todo el tiempo.'] },
];
const DIF = { n: 1 };
try {
  const v = +localStorage.getItem('asagmba_dificultad');
  if (v >= 0 && v <= 3 && localStorage.getItem('asagmba_dificultad') != null) DIF.n = v;
} catch (e) {}
const difD = () => DIF_DAT[DIF.n];
function difPoner(n) {
  DIF.n = Math.max(0, Math.min(3, n));
  try { localStorage.setItem('asagmba_dificultad', String(DIF.n)); } catch (e) {}
  sfx('dash');
}
function difCambiar(d, vuelta) {
  difPoner(vuelta ? (DIF.n + d + 4) % 4 : DIF.n + d);
}

/* ---------------- vida de los enemigos ---------------- */
const DIF_VISTO = new WeakMap(); // enemigo -> vida máxima que le tocó
function difAjustarEnemigos() {
  if (!enemies) return;
  const D = difD();
  for (const e of enemies) {
    if (DIF_VISTO.has(e) || e.dying) continue;
    let hp = e.hp;
    const jefe = DUSK[e.t] || e.t == 'wboss';
    if (jefe) hp = Math.round(hp * D.jefe);
    else if (D.golpes) hp = Math.max(hp, D.golpes * 20 - 2); // -2: el 5º espadazo siempre termina
    e.hp = hp;
    if (e.mhp != null) e.mhp = hp;
    DIF_VISTO.set(e, hp);
  }
}
// esto corre ANTES del vigilante de 34-proteccion.js, así la vida nueva es la "de nacimiento"
const loopDIF = loop;
loop = function (now) {
  difAjustarEnemigos();
  try { if (!difD().sta && p) p.sta = 100; } catch (e) {} // FÁCIL y NORMAL: sin stamina
  loopDIF(now);
};
// la barra de stamina solo aparece cuando cuenta
const barDIF = bar;
bar = function (x, y, w, h, v, col, label) {
  if (label == 'STAMINA' && !difD().sta) {
    ctx.font = '7px monospace';
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fillText(DIF_NOM[DIF.n], x, y + h - 1);
    return;
  }
  barDIF(x, y, w, h, v, col, label);
};
// daño que recibe Smara
const hurtDIF = hurt;
hurt = function (d) {
  hurtDIF(Math.max(1, Math.round(d * difD().dano)));
};
// la vida de Arlos tiene tope fijo (34-proteccion.js): en vez de subirla, Smara le pega más o menos
const hitBossDIF = hitBoss;
hitBoss = function (d) {
  hitBossDIF(Math.max(1, Math.round(d / difD().jefe)));
};
// enemigos más rápidos (se mueven y atacan más seguido)
const updEnemiesDIF = updEnemies;
updEnemies = function (dt) {
  updEnemiesDIF(dt * difD().vel);
  if (area == 9) difAtaquesNuevos(dt);
};
// barrita de vida de los enemigos chicos (cuando ya les pegaste)
const drawEnemiesDIF = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesDIF(t);
  for (const e of enemies || []) {
    const max = DIF_VISTO.get(e);
    if (!max || e.dying || e.hp >= max || e.hp <= 0 || DUSK[e.t] || e.t == 'wboss') continue;
    const s = esz(e), x = Math.round(e.x - cam - 14), y = Math.round(ecy(e) - s.h / 2 - 8);
    ctx.fillStyle = '#000a';
    ctx.fillRect(x - 1, y - 1, 30, 4);
    ctx.fillStyle = '#d6384a';
    ctx.fillRect(x, y, Math.round(28 * e.hp / max), 2);
  }
};

/* ---------------- área 9: vida según dificultad y ATAQUES NUEVOS ---------------- */
const loadAreaDIF = loadArea;
loadArea = function (n) {
  if (n == 9) { MON.vida = difD().mon * 20; ESPA.vida = difD().esp * 20; LL.lanzas = []; }
  loadAreaDIF(n);
  if (n == 9) LL.lanzas = [];
};
MON.anim.salta = { a: 55, b: 79, fps: 26, loop: true };
ESPA.fila.lanza = 2;
// al tirar la lanza usa solo el impulso del ataque (cuadros 0-6)
const espCuadroDIF = espCuadro;
espCuadro = function (e) {
  if (e.st == 'lanza') return Math.min(6, Math.floor(e.t * ESPA.fps));
  return espCuadroDIF(e);
};
function difAtaquesNuevos(dt) {
  const A = difD().ataques;
  LL.lanzas = LL.lanzas || [];
  if (A > 0 && state == 'play') {
    // el Espanto tira la lanza cuando Smara está lejos
    for (const e of LL.esp || []) {
      const ad = Math.abs(p.x - e.x);
      if ((e.st == 'quieto' || e.st == 'camina') && ad > 210 && ad < 460 && e.cd <= 0 && Math.random() < dt * (A == 2 ? 3 : 1.6)) {
        e.st = 'lanza'; e.t = 0; e.tiro = 0; e.face = p.x < e.x ? -1 : 1;
        cdTono(700, 1100, 0.3, 'triangle', 0.05);
      }
      if (e.st == 'lanza') {
        if (e.t > 0.38 && !e.tiro) {
          e.tiro = 1;
          LL.lanzas.push({ x: e.x + e.face * 40, y: GROUND - 46, vx: e.face * (A == 2 ? 380 : 320), t: 0 });
          cdRuido(0.25, 2400, 0.12, 0.8);
        }
        if (e.t > 0.6) { e.st = 'quieto'; e.t = 0; e.cd = A == 2 ? 0.9 : 1.5; }
      }
    }
    // la bestia roja: SALTO APLASTANTE
    for (const m of CD.mons || []) {
      const ad = Math.abs(p.x - m.x);
      if (m.st == 'camina' && ad > 150 && ad < 330 && m.cd <= 0 && !(m.kb > 0) && Math.random() < dt * (A == 2 ? 1.2 : 0.6)) {
        m.st = 'salta'; m.t = 0; m.sx = m.x; m.tx = p.x - Math.sign(p.x - m.x) * 30; m.face = p.x < m.x ? -1 : 1;
        cdSnd.grunido();
      }
      if (m.st == 'salta') {
        const k = (m.t - 0.3) / 0.55;
        if (k < 0) { m.y = GROUND; if (Math.random() < 0.5) pfx(m.x, GROUND - 2, rnd(-60, 60), rnd(-60, -10), 0.3, '#4a2a58', 2, 300); }
        else if (k < 1) { m.x = m.sx + (m.tx - m.sx) * k; m.y = GROUND - Math.sin(k * Math.PI) * 110; }
        else {
          m.y = GROUND; m.x = m.tx;
          // ¡PUM! onda en el piso a los dos lados
          SHK = Math.max(SHK, 8);
          sfx('boom');
          cdRuido(0.5, 160, 0.35, 2);
          for (let i = 0; i < 24; i++) pfx(m.x + rnd(-20, 20), GROUND - 2, (i % 2 ? 1 : -1) * rnd(80, 280), rnd(-160, -30), rnd(0.3, 0.6), i % 3 ? '#5a3a68' : '#e4dcff', 2, 500);
          if (Math.abs(p.x - m.x) < 95 && p.y > GROUND - 24 && p.inv <= 0 && p.dash <= 0) { CD.golpe = m.x; hurt(14); }
          m.st = 'camina'; m.t = 0; m.cd = A == 2 ? 1.1 : 1.8;
        }
      }
    }
  }
  // las lanzas vuelan
  for (const L of LL.lanzas) {
    L.t += dt;
    L.x += L.vx * dt;
    // le pega si está parada (agachada o saltando la esquiva)
    const cuerpoArriba = p.y - (p.crouch ? 34 : 60);
    if (!L.fin && Math.abs(L.x - p.x) < 14 && L.y > cuerpoArriba && L.y < p.y - 4 && p.inv <= 0 && p.dash <= 0) {
      L.fin = 1;
      CD.golpe = L.x - L.vx;
      hurt(10);
    }
    // con la guadaña se puede partir
    const a = p.atk;
    if (!L.fin && a && a.t < 0.2 && Math.abs(L.x - (p.x + a.f * 30)) < 40 && Math.abs(L.y - pcy()) < 40) {
      L.fin = 1;
      sfx('parry');
      for (let i = 0; i < 8; i++) pfx(L.x, L.y, rnd(-120, 120), rnd(-120, 20), 0.3, '#e4dcff', 2, 300);
    }
  }
  LL.lanzas = LL.lanzas.filter(L => !L.fin && L.t < 3 && L.x > cam - 100 && L.x < cam + W + 100);
}
function difLanzasDibujar() {
  for (const L of LL.lanzas || []) {
    const x = Math.round(L.x - cam), y = Math.round(L.y), f = Math.sign(L.vx);
    ctx.fillStyle = 'rgba(228,220,255,.25)';
    ctx.fillRect(x - f * 40, y - 1, f * 40, 3); // estela
    ctx.fillStyle = '#2a2038';
    ctx.fillRect(Math.min(x, x - f * 26), y, 26, 2); // asta
    ctx.fillStyle = '#e4dcff';
    for (let k = 0; k < 6; k++) ctx.fillRect(x + f * k, y - 2 + Math.floor(k / 2), 1, 6 - Math.floor(k / 2) * 2); // punta
  }
}
const drawPFXDIF = drawPFX;
drawPFX = function () {
  if (area == 9) difLanzasDibujar();
  drawPFXDIF();
};

/* ---------------- elegir dificultad al empezar NUEVA PARTIDA ---------------- */
const SDIF = { sel: 1, t: 0 };
const menuPickDIF = menuPick;
menuPick = function (i) {
  if (state == 'menu' && i == 0 && menuOK(0)) {
    state = 'dific';
    SDIF.sel = DIF.n;
    SDIF.t = 0;
    SDIF.t0 = performance.now(); // el mismo click de NEW GAME no elige una carta
    sfx('page');
    return;
  }
  menuPickDIF(i);
};
function difEmpezar() {
  difPoner(SDIF.sel);
  state = 'menu';
  menuPickDIF(0);
}
function difCaja(i) {
  return { x: 46 + i * 156, y: 120, w: 140, h: 190 };
}
function difPantalla(t) {
  SDIF.t += 1 / 60;
  drawMenu();
  ctx.fillStyle = 'rgba(0,6,2,.72)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.font = '14px ' + PS;
  ctx.fillStyle = '#f4fff0';
  ctx.fillText('ELEGÍ LA DIFICULTAD', W / 2, 78);
  for (let i = 0; i < 4; i++) {
    const b = difCaja(i), on = SDIF.sel == i, D = DIF_DAT[i], yy = b.y - (on ? 6 + Math.round(Math.sin(t * 4) * 2) : 0);
    ctx.fillStyle = on ? DIF_COL[i] : '#0c2410';
    ctx.fillRect(b.x - 2, yy - 2, b.w + 4, b.h + 4);
    ctx.fillStyle = on ? '#16341b' : '#10261a';
    ctx.fillRect(b.x, yy, b.w, b.h);
    ctx.font = '10px ' + PS;
    ctx.fillStyle = DIF_COL[i];
    ctx.fillText(DIF_NOM[i], b.x + b.w / 2, yy + 26);
    // calaveritas: cuántas más, más difícil
    for (let k = 0; k <= i; k++) {
      const cx = b.x + b.w / 2 - i * 9 + k * 18, cy = yy + 42;
      ctx.fillStyle = on ? '#f4fff0' : '#7f9a7a';
      ctx.fillRect(cx - 5, cy, 10, 8); ctx.fillRect(cx - 3, cy + 8, 6, 3);
      ctx.fillStyle = '#10261a';
      ctx.fillRect(cx - 3, cy + 3, 2, 2); ctx.fillRect(cx + 1, cy + 3, 2, 2);
    }
    ctx.font = '6px ' + PS;
    ctx.fillStyle = on ? '#ffffff' : '#9fb596';
    const L = [
      (D.golpes ? D.golpes + ' espadazos' : 'enemigos normales'),
      'stamina: ' + (D.sta ? 'SÍ' : 'NO'),
      'daño recibido x' + D.dano,
      D.ataques ? (D.ataques == 2 ? 'ataques: muchos' : 'ataques nuevos') : 'ataques: normales',
    ];
    L.forEach((l, k) => ctx.fillText(l, b.x + b.w / 2, yy + 84 + k * 18));
    ctx.fillStyle = on ? '#d6e8cf' : '#6f8a6a';
    wrapT(D.info[1], b.w - 14).forEach((l, k) => ctx.fillText(l, b.x + b.w / 2, yy + 162 + k * 11));
  }
  ctx.font = '7px ' + PS;
  ctx.fillStyle = '#9fb596';
  ctx.fillText('A/D elegir · ENTER empezar · ESC volver · (se puede cambiar en la tuerca)', W / 2, H - 40);
  ctx.textAlign = 'left';
}
// fila de dificultad dentro de la tuerca (35-opciones.js)
function difFilaDibujar(on, t) {
  for (let q = 0; q < 4; q++) {
    const b = cajaCalidad(q), sel = DIF.n == q, y = 274;
    ctx.fillStyle = sel ? DIF_COL[q] : '#0a1e0d';
    ctx.fillRect(b.x, y, b.w, b.h);
    ctx.fillStyle = sel ? '#0c2410' : '#24502c';
    ctx.fillRect(b.x + 2, y + 2, b.w - 4, b.h - 4);
    ctx.fillStyle = sel ? '#ffffff' : '#9fb596';
    ctx.textAlign = 'center';
    ctx.font = '7px ' + PS;
    ctx.fillText(DIF_NOM[q], b.x + b.w / 2, y + 14);
    ctx.textAlign = 'left';
  }
  ctx.font = '7px ' + PS;
  ctx.fillStyle = '#d6e8cf';
  ctx.fillText(DIF_DAT[DIF.n].info[0], OP.x + 34, 312);
  ctx.fillStyle = '#9fb596';
  ctx.fillText(DIF_DAT[DIF.n].info[1], OP.x + 34, 326);
}
addEventListener(
  'keydown',
  e => {
    if (state != 'dific') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.repeat) return;
    const c = e.code;
    if (c == 'ArrowLeft' || c == 'KeyA' || c == 'ArrowUp' || c == 'KeyW') { SDIF.sel = (SDIF.sel + 3) % 4; sfx('step'); }
    else if (c == 'ArrowRight' || c == 'KeyD' || c == 'ArrowDown' || c == 'KeyS') { SDIF.sel = (SDIF.sel + 1) % 4; sfx('step'); }
    else if (c == 'Enter' || c == 'Space') difEmpezar();
    else if (c == 'Escape' || c == 'Backspace') { state = 'menu'; sfx('page'); }
  },
  true,
);
cv.addEventListener('mousemove', e => {
  if (state != 'dific') return;
  const [x, y] = mpos(e);
  for (let i = 0; i < 4; i++) { const b = difCaja(i); if (x > b.x && x < b.x + b.w && y > b.y - 8 && y < b.y + b.h) SDIF.sel = i; }
});
cv.addEventListener('mousedown', e => {
  if (state != 'dific' || performance.now() - SDIF.t0 < 250) return;
  const [x, y] = mpos(e);
  for (let i = 0; i < 4; i++) { const b = difCaja(i); if (x > b.x && x < b.x + b.w && y > b.y - 8 && y < b.y + b.h) { SDIF.sel = i; difEmpezar(); } }
});
const zmWantDIF = zmWant;
zmWant = function () {
  if (state == 'dific') return 'menu';
  return zmWantDIF();
};
const drawDIF = draw;
draw = function () {
  if (state == 'dific') {
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.imageSmoothingEnabled = false;
    difPantalla(performance.now() / 1000);
    if (GFX.n == 3) ultraDibujar();
    return;
  }
  drawDIF();
};

/* ---------- 37-rtx.js ---------- */
/* =====================================================================
   RTX (calidad ULTRA en la tuerca)
   Al elegir ULTRA el juego usa los efectos de luz de la escena del video:
   · RAYOS DE LUZ (god rays): lo brillante de la pantalla se estira desde
     la luz de cada zona (la luna en el Llano y en la noche, el cielo en
     el bosque, el sol en la ribera) y bajan haces de luz suaves.
   · BLOOM: las luces se derraman sobre lo que tienen alrededor.
   · SOMBRA DE SMARA proyectada por esa luz, estirada sobre el piso.
   · Viñeta de color y grano de película.
   Todo esto pide más a la computadora: por eso, al elegir ULTRA, sale un
   AVISO de que puede bajar el rendimiento (y el texto queda en naranja).
   En menús y pantallas especiales se usa el ULTRA simple (sin rayos).
   ===================================================================== */
// de dónde viene la luz en cada zona (coordenadas de pantalla, 700x406) y de qué color
function rtxFuente() {
  if (area == 9) return { x: ((256.5 - cam * 0.01) % 576 + 576) % 576, y: 69.5, col: '150,210,255', haces: true, tono: 'rgba(6,8,30,.45)' };
  if (area == 5) return { x: W * 0.36, y: 40, col: '160,200,255', haces: true, tono: 'rgba(4,8,26,.45)' };
  if (area == 6) return { x: W * 0.32, y: -10, col: '170,240,255', haces: true, tono: 'rgba(6,14,28,.4)' };
  if (area == 1) return { x: W * 0.78, y: -20, col: '255,230,160', haces: true, tono: 'rgba(30,18,4,.3)', fuerza: 0.3, umbral: 'brightness(.42) contrast(4.5) saturate(1.2)', mezcla: 0.45 }; // de día todo es claro: rayos más suaves
  if (area == 3) return { x: W * 0.5, y: 60, col: '255,255,255', haces: false, tono: 'rgba(0,0,0,.5)' };
  return { x: W * 0.5, y: -20, col: '220,230,255', haces: false, tono: 'rgba(0,0,10,.4)' };
}
const RTXP = {};
function rtxGPreparar() {
  if (RTXP.ok && RTXP.w == cv.width) return;
  RTXP.ok = 1;
  RTXP.w = cv.width;
  RTXP.a = document.createElement('canvas');
  RTXP.a.width = Math.round(cv.width / 6);
  RTXP.a.height = Math.round(cv.height / 6);
  RTXP.b = document.createElement('canvas');
  RTXP.b.width = RTXP.a.width;
  RTXP.b.height = RTXP.a.height;
  RTXP.ax = RTXP.a.getContext('2d');
  RTXP.bx = RTXP.b.getContext('2d');
  RTXP.vin = {};
}
function rtxVineta(tono) {
  if (RTXP.vin[tono]) return RTXP.vin[tono];
  const c = document.createElement('canvas');
  c.width = cv.width;
  c.height = cv.height;
  const v = c.getContext('2d'), r = Math.hypot(cv.width, cv.height) / 2;
  const g = v.createRadialGradient(cv.width / 2, cv.height * 0.45, r * 0.4, cv.width / 2, cv.height * 0.45, r);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, tono);
  v.fillStyle = g;
  v.fillRect(0, 0, cv.width, cv.height);
  return (RTXP.vin[tono] = c);
}
function rtxPase(t) {
  rtxGPreparar();
  const F = rtxFuente(), w = RTXP.a.width, h = RTXP.a.height, k = w / W;
  // 1) solo lo brillante
  const a = RTXP.ax;
  a.globalCompositeOperation = 'copy';
  a.filter = F.umbral || 'brightness(.55) contrast(3.2) saturate(1.3)';
  a.drawImage(cv, 0, 0, w, h);
  a.filter = 'none';
  // 2) se estira desde la luz (rayos)
  const mx = F.x * k, my = F.y * k, b = RTXP.bx;
  b.globalCompositeOperation = 'copy';
  b.globalAlpha = 1;
  b.drawImage(RTXP.a, 0, 0);
  b.globalCompositeOperation = 'lighter';
  for (let i = 1; i <= 9; i++) {
    const s = 1 + i * 0.07;
    b.globalAlpha = 0.42 * (F.fuerza || 1) * (1 - i / 10);
    b.drawImage(RTXP.a, mx - mx * s, my - my * s, w * s, h * s);
  }
  // 3) haces de luz suaves
  if (F.haces) {
    b.globalAlpha = 1;
    for (let i = 0; i < 5; i++) {
      const an0 = 1.15 + i * 0.18 + Math.sin(t * 0.15 + i) * 0.05, L = h * 1.5, an = 0.05 + (i % 2) * 0.03;
      const g = b.createLinearGradient(mx, my, mx + Math.cos(an0) * L, my + Math.sin(an0) * L);
      g.addColorStop(0, 'rgba(' + F.col + ',' + (0.11 + 0.05 * Math.sin(t * 0.5 + i)) + ')');
      g.addColorStop(1, 'rgba(' + F.col + ',0)');
      b.fillStyle = g;
      b.beginPath();
      b.moveTo(mx, my);
      b.lineTo(mx + Math.cos(an0 - an) * L, my + Math.sin(an0 - an) * L);
      b.lineTo(mx + Math.cos(an0 + an) * L, my + Math.sin(an0 + an) * L);
      b.closePath();
      b.fill();
    }
  }
  // 4) todo encima: luz + viñeta + grano
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = F.mezcla || 0.6;
  ctx.drawImage(RTXP.b, 0, 0, cv.width, cv.height);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.drawImage(rtxVineta(F.tono), 0, 0);
  if (PFXU.patron) {
    ctx.globalAlpha = 0.18;
    ctx.translate(Math.floor(Math.random() * 128), Math.floor(Math.random() * 128));
    ctx.fillStyle = PFXU.patron;
    ctx.fillRect(-128, -128, cv.width + 128, cv.height + 128);
  }
  ctx.restore();
  ctx.imageSmoothingEnabled = false;
}
// ULTRA: en el juego usa RTX; en menús, cine y el espacio en blanco, el ULTRA simple
const ultraDibujarRTX = ultraDibujar;
ultraDibujar = function () {
  const enJuego = (state == 'play' || state == 'cdcine' || state == 'cjcine' || state == 'room') && area != 0;
  if (!enJuego) return ultraDibujarRTX();
  ultraPreparar(); // deja listo el grano de película
  rtxPase(performance.now() / 1000);
};

/* ---------------- sombra de Smara proyectada por la luz ---------------- */
let RTX_SOMBRA = false;
const hdrawRTX = hdraw;
hdraw = function (fi) {
  if (!RTX_SOMBRA) return hdrawRTX(fi);
  const S = HRC || img.hr;
  ctx.drawImage(fimg(S, 'brightness(0)'), (fi % SM.cols) * SM.cw, Math.floor(fi / SM.cols) * SM.ch, SM.cw, SM.ch, -SM.ax, -SM.ay, SM.cw, SM.ch);
};
const drawPShadowRTX = drawPShadow;
drawPShadow = function () {
  drawPShadowRTX();
  if (GFX.n != 3 || !p.on || state == 'dead' || ![1, 5, 6, 9].includes(area)) return;
  const F = rtxFuente(), fx = Math.round(p.x - cam), fy = Math.round(p.y);
  const lado = fx >= F.x ? 1 : -1; // la sombra se aleja de la luz
  ctx.save();
  ctx.globalAlpha = area == 1 ? 0.3 : 0.42;
  ctx.translate(fx, fy);
  ctx.transform(1, 0, -1.6 * lado, -0.22, 0, 0);
  ctx.translate(-fx, -fy);
  RTX_SOMBRA = true;
  try { drawPlayer(); } finally { RTX_SOMBRA = false; }
  ctx.restore();
};

/* ---------------- aviso al elegir ULTRA ---------------- */
let rtxUlt = performance.now();
const drawRTX = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.05, (now - rtxUlt) / 1000);
  rtxUlt = now;
  drawRTX();
  if (OPC.avisoT > 0 && state == 'opc') {
    OPC.avisoT -= dt;
    const a = Math.min(1, OPC.avisoT * 2);
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.globalAlpha = a;
    const bw = 360, bh = 64, bx = W / 2 - bw / 2, by = H / 2 - bh / 2 - 10;
    ctx.fillStyle = '#ffb05a';
    ctx.fillRect(bx - 3, by - 3, bw + 6, bh + 6);
    ctx.fillStyle = '#2a1608';
    ctx.fillRect(bx, by, bw, bh);
    ctx.textAlign = 'center';
    ctx.font = '10px ' + PS;
    ctx.fillStyle = '#ffb05a';
    ctx.fillText('(!) AVISO', W / 2, by + 20);
    ctx.font = '7px ' + PS;
    ctx.fillStyle = '#ffe8cc';
    ctx.fillText('ULTRA activa los efectos RTX (rayos de luz, bloom y sombras).', W / 2, by + 38);
    ctx.fillText('Puede bajar el rendimiento en computadoras lentas.', W / 2, by + 52);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
};

/* ---------- 38-consejos.js ---------- */
/* =====================================================================
   CONSEJOS: el juego enseña cada cosa justo cuando hace falta
   Un cartelito arriba ("CONSEJO") aparece la primera vez que algo se vuelve
   útil, y se va solo cuando Smara lo hace (o a los pocos segundos).
   Cada consejo sale UNA sola vez (queda guardado en el navegador).
   Se pueden apagar o volver a ver en la tuerca → JUEGO → CONSEJOS.
     moverse · atacar y combo · dash · parry · ataques en el aire ·
     stamina · comidas · montar a la bestia · detener el tiempo ·
     forma espíritu · pilar
   ===================================================================== */
const CONSEJOS = {
  mover: { t: 'A / D para caminar. W o ESPACIO para saltar. SHIFT para correr.', hecho: () => CSJ.movio && CSJ.salto },
  atacar: { t: 'J, K o clic para atacar. Seguí apretando: es un combo de 5 golpes (giro, estocada y tajo ascendente al final).', hecho: () => CSJ.ataques >= 4 },
  dash: { t: 'ESPACIO dos veces = DASH. Pasás a través de los ataques y le hacés daño a lo que atravesás.', hecho: () => p.dash > 0 },
  parry: { t: 'L justo antes de que te peguen = PARRY. No recibís daño, devolvés los disparos y recuperás stamina.', hecho: () => p.parry > 0 },
  aire: { t: 'En el aire: J = REMOLINO (pega a los dos lados). S + J = PICADA: caés de golpe y soltás una onda.', hecho: () => p.atk && p.atk.c >= 6 },
  stamina: { t: 'Sin stamina no podés atacar ni hacer dash. Quedate quieta un momento y se llena sola.', hecho: () => p.sta > 60 },
  comida: { t: 'Las comidas van a la barra 1-5: apretá el número para comer. I abre el inventario.', hecho: () => false },
  montar: { t: '¡La bestia está noqueada! Acercate y apretá E para MONTARLA unos segundos. Montada: E muerde y atropellás todo.', hecho: () => typeof MONTA != 'undefined' && MONTA },
  tiempo: { t: 'Q = DETENER EL TIEMPO unos segundos. Todo se congela menos vos: aprovechalo para pegar.', hecho: () => TIEMPO.parado },
  forma: { t: 'FORMA ESPÍRITU: clic detiene el tiempo. Atacá subiendo, cayendo o corriendo para cortes distintos.', hecho: () => false },
  pilar: { t: 'Los pilares llevan a otros mundos. Hablá con el Gato Negro antes de tocarlo.', hecho: () => false },
};
const CSJ = { visto: {}, cola: [], act: null, t: 0, movio: false, salto: false, ataques: 0, ultAtk: null, on: true };
try {
  const g = JSON.parse(localStorage.getItem('asagmba_consejos'));
  if (g) { CSJ.visto = g.visto || {}; CSJ.on = g.on !== false; }
} catch (e) {}
function consejosGuardar() {
  try { localStorage.setItem('asagmba_consejos', JSON.stringify({ visto: CSJ.visto, on: CSJ.on })); } catch (e) {}
}
function consejo(k) {
  if (!CSJ.on || CSJ.visto[k] || CSJ.cola.includes(k) || (CSJ.act && CSJ.act.k == k)) return;
  CSJ.cola.push(k);
}
// tuerca → JUEGO → CONSEJOS: al volver a prenderlos, se ven todos otra vez
function consejosAlternar() {
  CSJ.on = !CSJ.on;
  if (CSJ.on) { CSJ.visto = {}; CSJ.cola = []; }
  else CSJ.act = null;
  consejosGuardar();
  sfx('dash');
}
function consejosTick(dt) {
  if (Math.abs(p.vx) > 30) CSJ.movio = true;
  if (!p.on) CSJ.salto = true;
  if (p.atk && p.atk !== CSJ.ultAtk && !(p.atk.raiz && p.atk.raiz === CSJ.ultAtk)) { CSJ.ataques++; CSJ.ultAtk = p.atk.raiz || p.atk; }
  // ¿cuándo hace falta cada consejo?
  if (area == 1) consejo('mover');
  if (hasSword) consejo('atacar');
  const cerca = x => Math.abs(x - p.x) < 320;
  const hayEnemigo = (enemies || []).some(e => !e.dying && cerca(e.x)) || (CD.mons || []).some(m => m.st != 'muere' && cerca(m.x)) || (LL.esp || []).some(e => e.st != 'muere' && cerca(e.x)) || (typeof JF != 'undefined' && JF.on);
  if (hasSword && hayEnemigo && CSJ.visto.atacar) consejo('dash');
  const disparo = (shots || []).length || (orbs || []).length || (LL.lanzas || []).length || (typeof JF != 'undefined' && JF.on);
  if (disparo && CSJ.visto.dash) consejo('parry');
  if (!p.on && hayEnemigo && CSJ.visto.atacar && CSJ.visto.dash) consejo('aire');
  if (DIF_DAT[DIF.n].sta && p.sta < 15) consejo('stamina');
  if ((CD.mons || []).some(m => m.st == 'noqueado')) consejo('montar');
  if (area == 7 && typeof JF != 'undefined' && JF.on && !JF.cine) consejo('tiempo');
  if (typeof FORMA != 'undefined' && FORMA.on) consejo('forma');
  if (area == 6 && Math.abs(p.x - PILAR.x) < 300) consejo('pilar');
  // mostrar de a uno
  if (!CSJ.act && CSJ.cola.length) { CSJ.act = { k: CSJ.cola.shift(), t: 0, listo: 0 }; blip(660); }
  if (CSJ.act) {
    const A = CSJ.act, C = CONSEJOS[A.k];
    A.t += dt;
    if (!A.listo && A.t > 1.2 && C.hecho()) { A.listo = A.t; blip(990); } // lo hizo: se va con un "¡bien!"
    const fin = A.listo ? A.listo + 1.2 : 9;
    if (A.t > fin) { CSJ.visto[A.k] = 1; consejosGuardar(); CSJ.act = null; }
  }
}
// avisar de la comida cuando agarra la primera
const invAgregarCS = invAgregar;
invAgregar = function (id, n) {
  const r = invAgregarCS(id, n);
  if (r) consejo('comida');
  return r;
};
function consejosDibujar() {
  const A = CSJ.act;
  if (!A) return;
  const C = CONSEJOS[A.k], fin = A.listo ? A.listo + 1.2 : 9;
  const a = Math.min(1, A.t / 0.3, (fin - A.t) / 0.4);
  ctx.save();
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.globalAlpha = Math.max(0, a);
  ctx.font = '7px ' + PS;
  const L = wrapT(C.t, 380), w = 400, h = 22 + L.length * 11, x = W / 2 - w / 2, y = 62 - (1 - Math.min(1, A.t / 0.3)) * 10;
  ctx.fillStyle = A.listo ? '#8ff09f' : '#ffd25a';
  ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
  ctx.fillStyle = '#10141f';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = A.listo ? '#8ff09f' : '#ffd25a';
  ctx.fillText(A.listo ? '¡BIEN!' : 'CONSEJO', x + 10, y + 12);
  ctx.fillStyle = '#e8ecf6';
  L.forEach((l, i) => ctx.fillText(l, x + 10, y + 26 + i * 11));
  // barrita del tiempo que le queda
  ctx.fillStyle = 'rgba(255,255,255,.2)';
  ctx.fillRect(x, y + h - 2, Math.round(w * Math.max(0, 1 - A.t / fin)), 2);
  ctx.restore();
}
let csUlt = performance.now();
const drawCS = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.05, (now - csUlt) / 1000);
  csUlt = now;
  drawCS();
  if (state == 'play' && !INV.open) { consejosTick(dt); consejosDibujar(); }
};

/* ---------- 39-mapas.js ---------- */
/* =====================================================================
   MAPAS Y RITMO
   1) LA NOCHE DE LOS DUHINDU era larguísima (13.300 px) y se hacía pesada.
      Ahora mide ~72 %: todo se acerca (fogatas, cofres, guardianes, el
      obelisco) y se sacan algunas plataformas repetidas. Lo que estaba
      encima de una plataforma que se quitó baja al suelo.
   2) EL LLANO DE LOS SUSURROS era corto: ahora es más largo y tiene una
      SUBIDA por escalones (plataformas en 3 alturas) antes del Cadejo,
      con murciélagos y fantasmas, otra bestia y un tercer Espanto.
   3) EL BOSQUE DE LA NIEBLA tenía su "zona de combate" vacía: ahora hay
      sombras, fantasmas, murciélagos y encapuchados entre los escalones.
   ===================================================================== */

/* ---------------- 1) la Noche, más corta ---------------- */
const NOCHE_K = 0.72;
const MBX0 = MBX.slice();
function nocheAcortar() {
  const K = NOCHE_K, G = GROUND, sx = x => Math.round(x * K);
  // a qué plataforma pertenece cada cosa que está arriba de una
  const deQue = o => platforms.find(pl => o.x >= pl.x - 2 && o.x <= pl.x + pl.w + 2 && Math.abs(pl.y - o.y) < 3);
  const sobre = [];
  for (const k of pick) if (k.y < G - 1) sobre.push([k, deQue(k)]);
  for (const e of ENC) if (e.pl) sobre.push([e, deQue(e)]);
  for (const [o, pl] of sobre) if (pl) o.dx = o.x - pl.x;
  // se quita 1 de cada 3 plataformas (las del medio de cada tramo)
  const quedan = platforms.filter((pl, i) => i % 3 != 2);
  // se acercan, sin que ninguna se monte encima de la anterior
  let fin = -1e9;
  for (const pl of quedan) {
    pl.x = Math.max(sx(pl.x), fin + 44);
    fin = pl.x + pl.w;
  }
  for (const [o, pl] of sobre) {
    if (pl && quedan.includes(pl)) o.x = pl.x + o.dx;
    else { o.x = sx(o.x); o.y = G; o.pl = 0; } // su plataforma ya no está: baja al suelo
    delete o.dx;
  }
  platforms = quedan;
  for (const k of pick) if (k.y >= G - 1) k.x = sx(k.x);
  for (const e of ENC) if (!e.pl) e.x = sx(e.x);
  ENC.sort((a, b) => a.x - b.x);
  for (const c of CPS) c.x = sx(c.x);
  for (const c of CHESTS) c.x = sx(c.x);
  for (const s of STRUCTS) s.x = sx(s.x);
  for (let b = 0; b < MBX.length; b++) MBX[b] = sx(MBX0[b]);
  PORTAL.x = sx(PORTAL.x);
  LEVEL = Math.round(LEVEL * K);
}

/* ---------------- 2) el Llano, más largo y con subida ---------------- */
CD_X.susto = 2780; // el Cadejo espera al final
MON.oleadas.push({ x: 1720, en: 1960 });
ESPA.oleadas.push({ x: 2160, en: 2420 });
// la subida: tres alturas, se puede ir por arriba y saltarse peleas... o no
LL_PLAT.push(
  [1470, 252, 96], [1600, 200, 80], [1730, 148, 96], [1880, 200, 80],
  [2000, 252, 96], [2130, 200, 96], [2270, 148, 80], [2410, 200, 96], [2550, 252, 80],
);

/* ---------------- enemigos extra por zona ---------------- */
// [x donde aparecen, [[tipo, x, y], ...]]  (y = 0 es el suelo)
const OLAS_EXTRA = {
  6: [
    [950, [['ghost', 1180, 240], ['bat', 1260, 190]]],
    [1420, [['shade', 1620, 0], ['ghost', 1700, 210]]],
    [1860, [['hood', 2020, 0], ['bat', 2120, 170], ['hallo', 2260, 0]]],
  ],
  9: [
    [240, [['bat', 520, 210]]],
    [1440, [['bat', 1700, 160], ['bat', 1760, 200]]],
    [2280, [['ghost', 2500, 220], ['bat', 2560, 170]]],
  ],
};
let olaExtra = 0;
function olasExtraTick() {
  const L = OLAS_EXTRA[area];
  if (!L || state != 'play') return;
  while (olaExtra < L.length && p.x > L[olaExtra][0]) {
    for (const [t, x, y] of L[olaExtra][1]) {
      const e = mkE(t, Math.min(LEVEL - 40, x), y || GROUND);
      foeInit(e);
      e.sp = 0.8; // salen de su círculo morado
      enemies.push(e);
    }
    olaExtra++;
  }
}

/* ---------------- conexión ---------------- */
const loadAreaMAP = loadArea;
loadArea = function (n) {
  if (n == 5) for (let b = 0; b < MBX.length; b++) MBX[b] = MBX0[b]; // se genera con las medidas de siempre...
  loadAreaMAP(n);
  if (n == 5) nocheAcortar(); // ...y después se acerca todo
  if (n == 9) LEVEL = W * 4.5;
  olaExtra = 0;
};
const updEnemiesMAP = updEnemies;
updEnemies = function (dt) {
  updEnemiesMAP(dt);
  olasExtraTick();
};

/* ---------- 40-jefe-cuentero.js ---------- */
/* =====================================================================
   JEFE FINAL: EL CUENTERO  (área 7 · "El Blanco")
   Se llega desde el Llano de los Susurros: el Cadejo arrastra a Smara
   hasta aquí, al "blanco" del que le habló en la noche. Al vencerlo
   sigue el epílogo (40b-epilogo.js).
   Un mago encapuchado con máscara blanca, manto gris con bordes dorados,
   gemas azules y un arco mágico celeste en la espalda.
   · Aparece en el suelo, habla con Smara y después se eleva.
   · Se teletransporta cerca o lejos de Smara.
   · RAYO: saca la mano, la apunta y el arco de su espalda dispara un rayo
     que la persigue durante 0.6 s.
   · MINI SOL: después de ciertos ataques va al medio, se vuelve un sol y
     tira una ráfaga de columnas de luz. Mientras, el escenario cambia al
     del inicio (Ribera de Sahinos) pero vacío, sin NPC, y le hace ver a
     Smara que solo conoce esta tierra porque la toman en broma.
   · FASE 2 (50 %): se transforma en un ser humano con el cuerpo hecho
     de galaxia y suma meteoros, constelaciones, estrellas y palmazo.
   ===================================================================== */
const CU_SUELO = 330,
  CU_VIDA = 1000,
  CU_ALTO = 68; // del capuchón al ruedo (Smara mide ~64)
const CU_CHARLA = [
  ['CUENTERO', 'Bienvenida, Smara. Pasá adelante, que el cuento ya empezó.'],
  ['SMARA', '¿Esto es... el blanco? El Cadejo me dijo que aquí estaba el malo.'],
  ['CUENTERO', '¿El perro? También es parte del cuento. Lo pintaron de negro para que le tuvieras miedo.'],
  ['SMARA', '¿Quién sos vos?'],
  ['CUENTERO', 'El que cuenta. Este Mulukukú no está en ningún mapa: lo armaste vos, aquí adentro.'],
  ['SMARA', 'No... yo conozco Mulukukú.'],
  ['CUENTERO', '¿Lo conocés? ¿O conocés los chistes? "Más lejos que Mulukukú." Los videos graciosos que te pasaban por el teléfono.'],
  ['SMARA', '...'],
  ['CUENTERO', 'El viejo del bastón te habló bonito, ¿verdad? En el blanco todos hablamos bonito.'],
  ['CUENTERO', 'Tranquila. De risas también se hacen mundos. Vamos a ver cuánto aguanta el tuyo.'],
];
// lo que dice cuando se vuelve sol y el escenario cambia al del inicio
const CU_SOL = [
  'Mirá, Smara: este es el lugar de donde sacaste tu Mulukukú.',
  'Cada pantalla es un video que te hizo reír. Ninguno lo grabó alguien de allá.',
  '"Más lejos que Mulukukú." Un millón de veces lo escuchaste, y nunca preguntaste qué hay allá.',
  'Tu río, tus monstruos, tu cielo: recortes de videos graciosos, pegados con cariño.',
  'Las risas suenan fuerte, ¿verdad? Tapan todo lo demás.',
  'Y aun así, de todo este ruido sacaste algo tuyo. Eso ya no es un chiste.',
];
// lo que va diciendo en la fase 2
const CU_HIST = [
  'Tu Mulukukú nació de un chiste que alguien dijo en voz alta.',
  'Lo demás lo pusiste vos: un video gracioso por aquí, un meme por allá.',
  'Un pueblo lejísimos, al final del mundo, donde todo puede pasar. Así te lo vendieron.',
  'Y vos le pusiste dioses, espíritus y un cielo que se cae.',
  'Yo soy la voz que repetía la broma. Cada vez que te reías, yo crecía.',
  'Si me ganás, el chiste se acaba... y queda solo lo que vos decidás creer.',
  '¿De verdad querés saber cómo es fuera de tu cabeza?',
];
let JF = { on: false },
  cuIntroVista = false;

/* ---------------- utilidades ---------------- */
const jfE = {
  in: k => k * k,
  out: k => 1 - (1 - k) * (1 - k),
  io: k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2),
};
const jfL = (a, b, k) => a + (b - a) * k;
const jfC = (v, a, b) => Math.max(a, Math.min(b, v));
function jfRng(seed) {
  let s = seed >>> 0 || 1;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
function jfLinea(x0, y0, x1, y1, c) {
  c = c || ctx;
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let e = dx + dy, n = 0;
  while (n++ < 1500) {
    c.fillRect(x0, y0, 1, 1);
    if (x0 == x1 && y0 == y1) break;
    const e2 = 2 * e;
    if (e2 >= dy) { e += dy; x0 += sx; }
    if (e2 <= dx) { e += dx; y0 += sy; }
  }
}
const cuOscuro = () => JF.fondo == 1 || JF.inicio > 0 || JF.inv > 0.5;

/* ---------------- sonido ---------------- */
function jfTono(f0, f1, d, ty, g, dl) {
  if (!AC || muted) return;
  const t = AC.currentTime + (dl || 0), o = AC.createOscillator(), gn = AC.createGain();
  o.type = ty || 'sine';
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + d);
  gn.gain.setValueAtTime(0.0001, t);
  gn.gain.exponentialRampToValueAtTime(g, t + 0.01);
  gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(gn); gn.connect(MG); o.start(t); o.stop(t + d + 0.05);
}
function jfRuido(d, fr, g, sube) {
  if (!AC || muted) return;
  const t = AC.currentTime, b = AC.createBuffer(1, Math.ceil(AC.sampleRate * d), AC.sampleRate), dd = b.getChannelData(0);
  for (let i = 0; i < dd.length; i++) dd[i] = Math.random() * 2 - 1;
  const s = AC.createBufferSource(), f = AC.createBiquadFilter(), gn = AC.createGain();
  s.buffer = b; f.type = 'bandpass'; f.Q.value = 0.8;
  f.frequency.setValueAtTime(sube ? fr * 0.2 : fr, t);
  f.frequency.exponentialRampToValueAtTime(sube ? fr : fr * 0.2, t + d);
  gn.gain.setValueAtTime(sube ? 0.0001 : g, t);
  gn.gain.exponentialRampToValueAtTime(sube ? g : 0.0001, t + d * 0.95);
  s.connect(f); f.connect(gn); gn.connect(MG); s.start(t);
}
const jfSnd = {
  aviso: () => jfTono(660, 990, 0.12, 'triangle', 0.05),
  columna: () => { jfRuido(0.9, 3000, 0.16); jfTono(110, 105, 1.0, 'sawtooth', 0.05); jfTono(1320, 1310, 0.9, 'sine', 0.05); jfTono(1650, 1640, 0.9, 'sine', 0.03); },
  tele: () => jfRuido(0.3, 3200, 0.14, true),
  aparece: () => { jfTono(1500, 750, 0.25, 'sine', 0.08); jfRuido(0.15, 2200, 0.1); },
  apunta: () => jfTono(300, 1200, 0.75, 'triangle', 0.05),
  rayo: () => { jfRuido(0.7, 4200, 0.18); jfTono(880, 860, 0.8, 'sawtooth', 0.04); },
  sol: () => { jfTono(110, 440, 0.9, 'sawtooth', 0.07); jfTono(1760, 1760, 1.2, 'sine', 0.03); },
  golpe: () => { sfx('boom'); jfTono(70, 30, 0.4, 'sine', 0.3); },
  carga: () => jfTono(220, 880, 0.5, 'triangle', 0.05),
  letra: () => jfTono(560 + Math.random() * 80, 520, 0.04, 'triangle', 0.03),
  letraS: () => jfTono(880, 860, 0.03, 'square', 0.015),
  estrella: () => jfTono(1400, 2200, 0.12, 'sine', 0.04),
  palma: () => { jfRuido(0.3, 1600, 0.25); jfTono(200, 60, 0.3, 'sine', 0.2); },
};

/* ---------------- reiniciar ---------------- */
function jfReset() {
  JF = {
    on: true, hp: CU_VIDA, max: CU_VIDA, fase: 1, forma: 'manto', x: 530, y: CU_SUELO, face: -1, vis: 0, flash: 0, t: 0,
    pasos: [], i: 0, pt: 0, fondo: 0, fondoMix: 0, inicio: 0, velo: 0, solK: 0, mano: null, arco: 0,
    pil: { L: [] }, textos: [], hpVista: CU_VIDA, alerta: 0, invFlash: 0, reflejo: null, mareo: 0, tipParry: false, anillos: [], estela: [], quemas: [], pop: 0, golpeX: 0, rayas: [], rayos: [], gotas: [], relampagos: [], flechas: [], minip: [], arcos: null, inv: 0, orbes: [], constel: null, ondas: [], habla: null,
    lineaSol: 0, lineaHist: 0, ciclo: 0, cine: { k: 'intro', t: 0, i: -1, s: 0, n: 0, larga: !cuIntroVista },
    blanco: 0, iris: null, ultAtk: null, ultimo: '', srcX: null, musT: 0, paso: 0,
  };
  jfPlan([{ k: 'idle', d: 0.6 }]);
}
const cuFlota = () => CU_SUELO - 22 + Math.sin(JF.t * 2) * 3;
function cuArco() {
  // de dónde salen los rayos: el centro del arco (o del halo en la forma de galaxia)
  return JF.forma == 'galaxia' ? { x: JF.x, y: JF.y - 58 } : { x: JF.x - JF.face * 7, y: JF.y - CU_ALTO + 21 };
}

/* =====================================================================
   PASOS Y ATAQUES
   ===================================================================== */
const JF_ATQ = {
  rayo: () => [{ k: 'tele' }, { k: 'apunta' }, { k: 'dispara' }, { k: 'tele', r: 1 }, { k: 'apunta', d: 0.4 }, { k: 'dispara' }, { k: 'rec', d: 0.7 }],
  rayo2: () => [{ k: 'tele' }, { k: 'apunta' }, { k: 'dispara' }, { k: 'tele', r: 1 }, { k: 'apunta', d: 0.35 }, { k: 'dispara' }, { k: 'tele', r: 1 }, { k: 'apunta', d: 0.3 }, { k: 'dispara' }, { k: 'rec', d: 0.6 }],
  sol: () => [{ k: 'sol' }, { k: 'rec', d: 0.8 }],
  meteoros: () => [{ k: 'meteoros' }, { k: 'rec', d: 0.9 }],
  constel: () => [{ k: 'constel' }, { k: 'rec', d: 1.0 }],
  orbes: () => [{ k: 'orbes' }, { k: 'rec', d: 0.8 }],
  palma: () => [{ k: 'tele', cerca: 1 }, { k: 'palma' }, { k: 'rec', d: 1.2 }],
  transforma: () => [{ k: 'centro' }, { k: 'despierta' }],
  tormenta: () => [{ k: 'tormenta' }, { k: 'rec', d: 1.0 }],
  arcos: () => [{ k: 'arcos' }, { k: 'rec', d: 1.1 }],
};
function jfPlan(lista) {
  JF.pasos = lista;
  JF.i = 0;
  JF.pt = 0;
  jfIni();
}
function jfPaso() {
  return JF.pasos[JF.i] || { k: 'idle' };
}
function jfDur(P) {
  const d = PASO[P.k].d;
  return P.d || (d instanceof Function ? d(P) : d) || 1;
}
function jfIni() {
  const P = jfPaso(), D = PASO[P.k];
  P.x0 = JF.x;
  P.y0 = JF.y;
  P.hecho = {};
  if (D.ini) D.ini(P);
}
function jfElegir() {
  if (JF.pendiente) {
    JF.pendiente = false;
    return jfPlan(JF_ATQ.transforma());
  }
  JF.ciclo++;
  let k;
  if (JF.fase == 1) k = ['rayo', 'arcos', 'rayo', 'sol', 'arcos', 'tormenta'][(JF.ciclo - 1) % 6]; // la tormenta llega después de varios ataques
  else if (JF.ciclo % 3 == 0) k = 'sol'; // cada tercer ataque: el mini sol
  else {
    const pool = ['rayo2', 'meteoros', 'constel', 'orbes', 'palma', 'arcos', 'tormenta'];
    do k = pool[Math.floor(Math.random() * pool.length)];
    while (k == JF.ultimo);
  }
  JF.ultimo = k;
  JF.alerta = 0.45;
  if (!JF.tipParry && (k == 'arcos' || k == 'rayo')) { JF.tipParry = true; say('Tip: presioná L justo cuando te llegue la flecha o el rayo para hacer PARRY y devolverlo.'); }
  // a veces encadena un ataque detrás de otro sin descansar
  const pausa = Math.random() < 0.45 ? 0.12 : JF.fase == 1 ? 0.5 : 0.3;
  jfPlan([{ k: 'idle', d: pausa }, ...JF_ATQ[k]()]);
}
function jfFlotar(dt, quieto) {
  JF.face = p.x < JF.x ? -1 : 1;
  JF.y = jfL(JF.y, cuFlota() + (quieto ? 8 : 0), 1 - Math.exp(-5 * dt));
  if (quieto) return;
  const meta = jfC(p.x + (JF.x > p.x ? 160 : -160), 50, W - 50);
  JF.x += jfC(meta - JF.x, -70 * dt, 70 * dt);
}
// cambia el escenario (con un velo blanco rápido)
function cuEscenario(a) {
  JF.cambio = { t0: JF.t, a };
}
function cuCambioTick() {
  const C = JF.cambio;
  if (!C) return;
  const s = JF.t - C.t0;
  JF.velo = s < 0.22 ? s / 0.22 : Math.max(0, 1 - (s - 0.22) / 0.45);
  if (s >= 0.22 && !C.ok) { C.ok = 1; JF.inicio = C.a == 'inicio' ? 1 : 0; }
  if (s > 0.7) { JF.cambio = null; JF.velo = 0; }
}
const PASO = {
  idle: {
    d: 1,
    ini() { if (JF.fase == 2 && JF.lineaHist < CU_HIST.length && Math.random() < 0.75) cuDecir(CU_HIST[JF.lineaHist++]); },
    tick(P, u, dt) { jfFlotar(dt); JF.mano = null; },
  },
  rec: { d: 0.8, tick(P, u, dt) { jfFlotar(dt, true); JF.cansado = 1; JF.mano = null; JF.arco = jfL(JF.arco, 0, 0.1); } },

  /* ---------- TELETRANSPORTE (cerca o lejos) ---------- */
  tele: {
    d: P => (JF.fase == 2 ? 0.5 : 0.6) * (P.r ? 0.75 : 1),
    ini(P) { P.lejos = P.cerca ? false : Math.random() < 0.5; },
    tick(P, u) {
      if (u < 0.38) {
        JF.vis = 1 - u / 0.38;
        if (!P.hecho.a) { P.hecho.a = 1; jfSnd.tele(); JF.rayas.push({ x: JF.x, t: 0 }); cuAnillo(JF.x, JF.y - 34, 40, 4, '#7a4cff', 0.3); }
        if (Math.random() < 0.7) pfx(JF.x + rnd(-12, 12), JF.y - rnd(0, CU_ALTO), rnd(-20, 20), rnd(-90, -30), rnd(0.3, 0.6), Math.random() < 0.5 ? '#3fd8ff' : '#ffffff', 2, -40);
      } else if (u < 0.68) {
        JF.vis = 0;
        if (!P.hecho.b) {
          P.hecho.b = 1;
          let tx;
          if (P.lejos) tx = p.x < W / 2 ? rnd(W - 150, W - 60) : rnd(60, 150);
          else { const lado = Math.random() < 0.5 ? -1 : 1; tx = p.x + lado * rnd(70, 100); if (tx < 50 || tx > W - 50) tx = p.x - lado * rnd(70, 100); }
          JF.x = jfC(tx, 50, W - 50);
          JF.y = cuFlota();
          JF.face = p.x < JF.x ? -1 : 1;
          P.tx = JF.x;
        }
      } else {
        if (!P.hecho.c) { P.hecho.c = 1; jfSnd.aparece(); cuChispas(JF.x, JF.y - 34, 22); JF.face = p.x < JF.x ? -1 : 1; JF.pop = 1; cuAnillo(JF.x, JF.y - 34, 6, 46, '#3fd8ff', 0.35); JF.rayas.push({ x: JF.x, t: 0 }); }
        JF.vis = jfE.out((u - 0.68) / 0.32);
      }
    },
    fin() { JF.vis = 1; },
  },

  /* ---------- RAYO: apunta con la mano y el arco dispara ---------- */
  apunta: {
    d: P => (JF.fase == 2 ? 0.45 : 0.6),
    ini() { jfSnd.apunta(); },
    tick(P, u, dt) {
      JF.face = p.x < JF.x ? -1 : 1;
      JF.y = jfL(JF.y, cuFlota(), 0.1);
      const o = cuArco();
      JF.apuntaA = Math.atan2(pcy() - o.y, p.x - o.x);
      JF.mano = { a: JF.apuntaA, k: jfE.out(Math.min(1, u * 2)) };
      JF.arco = u;
    },
  },
  dispara: {
    d: 0.9,
    ini() {
      JF.pop = 0.6;
      JF.golpeX = -Math.cos(JF.apuntaA) * 8;
      cuAnillo(cuArco().x, cuArco().y, 4, 30, '#9fe4ff', 0.25, true);
      JF.rayos.push({ a: JF.apuntaA, t: 0, giro: JF.fase == 2 ? 2.5 : 2.0 });
      jfSnd.rayo();
      SHK = Math.max(SHK, 3);
    },
    tick(P, u, dt) {
      JF.arco = 1;
      const R = JF.rayos[JF.rayos.length - 1];
      if (R) JF.mano = { a: R.a, k: 1 };
    },
    fin() { JF.arco = 0.3; },
  },

  /* ---------- MINI SOL + ráfaga de columnas de luz ---------- */
  sol: {
    d: P => 0.9 + (JF.fase == 2 ? 7 : 5) * 1.35 + 1.0 + 0.9,
    ini(P) {
      P.olas = JF.fase == 2 ? ['lados', 'centro', 'sigue', 'pares', 'impares', 'sigue', 'lados'] : ['lados', 'centro', 'pares', 'impares', 'sigue'];
      jfSnd.sol();
    },
    tick(P, u, dt) {
      const s = JF.pt, n = P.olas.length, fin = 0.9 + n * 1.35 + 1.0;
      JF.mano = null;
      if (s < 0.9) {
        // va al medio, sube y se vuelve sol
        const k = jfE.io(s / 0.9);
        JF.x = jfL(P.x0, W / 2, k);
        JF.y = jfL(P.y0, 130, k);
        JF.solK = k;
        if (s > 0.45 && !P.hecho.e) { P.hecho.e = 1; cuEscenario('inicio'); cuRisasSnd(); }
      } else if (s < fin) {
        JF.solK = 1;
        JF.y = 130 + Math.sin(JF.t * 2) * 3;
        // dos frases por cada sol
        if (s > 1.0 && !P.hecho.d1) { P.hecho.d1 = 1; cuDecir(CU_SOL[JF.lineaSol++ % CU_SOL.length], 3.6); }
        if (s > 4.8 && !P.hecho.d2) { P.hecho.d2 = 1; cuDecir(CU_SOL[JF.lineaSol++ % CU_SOL.length], 3.6); }
        for (let i = 0; i < n; i++) {
          if (s >= 0.9 + i * 1.35 && !P.hecho['o' + i]) { P.hecho['o' + i] = 1; cuOla(P.olas[i]); }
        }
      } else {
        // vuelve a la normalidad
        const k = jfE.io(jfC((s - fin) / 0.9, 0, 1));
        JF.solK = 1 - k;
        JF.y = jfL(130, cuFlota(), k);
        if (k > 0.4 && !P.hecho.v) { P.hecho.v = 1; cuEscenario('blanco'); }
      }
    },
    fin() { JF.solK = 0; if (JF.inicio) cuEscenario('blanco'); },
  },

  /* ---------- FASE 2 ---------- */
  meteoros: {
    d: 3.0,
    ini() {
      for (let i = 0; i < 18; i++) {
        const x = i % 3 == 0 ? jfC(p.x + rnd(-30, 30), 20, W - 20) : rnd(20, W - 20);
        JF.gotas.push({ x, ts: JF.t + 0.15 + i * 0.13, y: -20, cae: false, ok: false });
      }
      jfSnd.carga();
    },
    tick(P, u, dt) { jfFlotar(dt, true); JF.mano = { a: -Math.PI / 2, k: 1 }; },
  },
  constel: {
    // estrellas que se unen en líneas; las líneas avisan y luego queman
    d: 2.2,
    ini() {
      const N = [];
      for (let i = 0; i < 6; i++) N.push({ x: 40 + i * 124 + rnd(-30, 30), y: rnd(150, CU_SUELO - 10) });
      N.sort(() => Math.random() - 0.5);
      JF.constel = { t0: JF.t, N };
      jfSnd.carga();
    },
    tick(P, u, dt) {
      jfFlotar(dt, true);
      JF.mano = { a: -Math.PI / 2 + JF.face * 0.6, k: 1 };
      const C = JF.constel, s = JF.t - C.t0;
      for (let i = 0; i < C.N.length; i++) if (s > i * 0.12 && !P.hecho['n' + i]) { P.hecho['n' + i] = 1; jfSnd.estrella(); }
      if (s > 1.1 && !P.hecho.f) { P.hecho.f = 1; jfRuido(0.5, 4000, 0.15); SHK = Math.max(SHK, 3); }
      if (s > 1.1 && s < 1.6) {
        for (let i = 0; i < C.N.length - 1; i++) {
          const a = C.N[i], b = C.N[i + 1], ax = b.x - a.x, ay = b.y - a.y, L2 = ax * ax + ay * ay;
          const k = jfC(((p.x - a.x) * ax + (pcy() - a.y) * ay) / L2, 0, 1);
          // revisa la cabeza, el centro y los pies de Smara
          for (const yy of [p.y - 8, pcy(), p.y - (p.crouch ? 36 : 56)]) {
            const k2 = jfC(((p.x - a.x) * ax + (yy - a.y) * ay) / L2, 0, 1);
            if (Math.hypot(p.x - (a.x + ax * k2), yy - (a.y + ay * k2)) < 7) { JF.srcX = a.x + ax * k; jfDanar(16); }
          }
        }
      }
    },
    fin() { JF.constel = null; },
  },
  orbes: {
    d: 1.6,
    ini() { jfSnd.carga(); },
    tick(P, u, dt) {
      jfFlotar(dt, true);
      for (let i = 0; i < 5; i++) {
        if (u > 0.2 + i * 0.12 && !P.hecho['o' + i]) {
          P.hecho['o' + i] = 1;
          const o = cuArco(), a = Math.atan2(pcy() - o.y, p.x - o.x) + (i - 2) * 0.5;
          JF.mano = { a, k: 1 };
          JF.orbes.push({ x: o.x, y: o.y, vx: Math.cos(a) * 140, vy: Math.sin(a) * 140, t: 0, vivo: true });
          jfSnd.estrella();
        }
      }
    },
  },
  palma: {
    // aparece pegado y empuja con la palma: ola de estrellas → dash o saltar hacia atrás
    d: 0.9,
    tick(P, u, dt) {
      JF.face = P.dir || (P.dir = p.x < JF.x ? -1 : 1);
      if (u < 0.5) { JF.mano = { a: JF.face > 0 ? 0 : Math.PI, k: jfE.out(u / 0.5) * 0.6 }; JF.arco = u * 2; }
      else {
        if (!P.hecho.s) { P.hecho.s = 1; jfSnd.palma(); SHK = Math.max(SHK, 5); for (let i = 0; i < 14; i++) pfx(JF.x + JF.face * 22, JF.y - 40 + rnd(-20, 20), JF.face * rnd(120, 300), rnd(-60, 60), rnd(0.2, 0.5), i % 2 ? '#9fe4ff' : '#ffffff', 2, 0); }
        JF.mano = { a: JF.face > 0 ? 0 : Math.PI, k: 1 };
        if (u < 0.7) {
          const x0 = Math.min(JF.x + JF.face * 8, JF.x + JF.face * 86), x1 = Math.max(JF.x + JF.face * 8, JF.x + JF.face * 86);
          if (jfToca(x0, JF.y - 70, x1, JF.y + 20)) { JF.srcX = JF.x; jfDanar(18); }
        }
      }
    },
  },

  /* ---------- TORMENTA: desaparece, el fondo se invierte y caen rayos ---------- */
  tormenta: {
    d: 5.4,
    tick(P, u, dt) {
      const s = JF.pt;
      JF.mano = null;
      if (s < 0.5) {
        JF.vis = 1 - s / 0.5;
        JF.inv = s / 0.5;
        if (!P.hecho.a) { P.hecho.a = 1; jfSnd.tele(); jfRuido(1.2, 300, 0.25); cuDecir('Apaguemos la pantalla un ratito.', 2.2); }
        if (Math.random() < 0.7) pfx(JF.x + rnd(-12, 12), JF.y - rnd(0, CU_ALTO), rnd(-30, 30), rnd(-120, -40), rnd(0.3, 0.6), '#9fe4ff', 2, -40);
      } else if (s < 4.5) {
        JF.vis = 0;
        JF.inv = 1;
        for (let i = 0; i < 30; i++) {
          if (s >= 0.6 + i * 0.12 && !P.hecho['r' + i]) {
            P.hecho['r' + i] = 1;
            const x = i % 3 == 0 ? jfC(p.x + rnd(-18, 18), 16, W - 16) : i % 5 == 1 ? jfC(p.x + p.vx * 0.5, 16, W - 16) : rnd(16, W - 16);
            JF.relampagos.push({ x, t: 0, s: Math.floor(Math.random() * 999) });
          }
        }
      } else {
        // vuelve a aparecer, lejos de Smara
        JF.inv = Math.max(0, 1 - (s - 4.5) / 0.5);
        if (!P.hecho.v) {
          P.hecho.v = 1;
          JF.x = p.x < W / 2 ? rnd(W - 200, W - 80) : rnd(80, 200);
          JF.y = cuFlota();
          JF.face = p.x < JF.x ? -1 : 1;
          jfSnd.aparece();
          cuChispas(JF.x, JF.y - 34, 16);
        }
        JF.vis = jfC((s - 4.6) / 0.6, 0, 1);
      }
    },
    fin() { JF.inv = 0; JF.vis = 1; },
  },

  /* ---------- CUATRO ARCOS: disparan en orden; las flechas hacen mini pilares ---------- */
  arcos: {
    d: 4.4,
    ini() {
      // izquierda, arriba-izquierda, arriba-derecha, derecha (en ese orden disparan)
      JF.arcos = { t: 0, B: [Math.PI, -2.35, -0.79, 0].map(a => ({ a, tens: 0 })) };
      jfSnd.carga();
      cuDecir('Cada flecha es una risa que escuchaste.', 2.6);
    },
    tick(P, u, dt) {
      jfFlotar(dt, true);
      JF.mano = { a: -Math.PI / 2, k: 1 };
      JF.arco = 0.6;
      const A = JF.arcos, s = JF.pt;
      A.t = s;
      for (let n = 0; n < 12; n++) {
        const tf = 0.8 + n * 0.24, B = A.B[n % 4];
        if (s > tf - 0.2 && s < tf) B.tens = (s - (tf - 0.2)) / 0.2;
        if (s >= tf && !P.hecho['f' + n]) {
          P.hecho['f' + n] = 1;
          B.tens = 0;
          B.retro = 1; // retroceso del arco al disparar
          cuAnillo(cuArcoPos(B).x, cuArcoPos(B).y, 4, 18, '#e8d6ff', 0.25, true);
          const o = cuArcoPos(B), tx = jfC(p.x + p.vx * 0.12, 10, W - 10), ty = p.y - 24; // apunta al cuerpo; si esquiva, sigue hasta el suelo
          const a = Math.atan2(ty - o.y, tx - o.x);
          JF.flechas.push({ x: o.x, y: o.y, vx: Math.cos(a) * 560, vy: Math.sin(a) * 560, a, t: 0 });
          jfTono(1600, 700, 0.15, 'sawtooth', 0.04);
          jfRuido(0.12, 4000, 0.08);
        }
      }
    },
    fin() { if (JF.arcos) for (const B of JF.arcos.B) { const o = cuArcoPos(B); cuChispas(o.x, o.y, 6); } JF.arcos = null; JF.arco = 0; },
  },

  /* ---------- ATURDIDO (le devolviste el rayo) ---------- */
  aturdido: {
    d: 1.5,
    ini() { JF.mareo = 1; JF.mano = null; JF.arco = 0; },
    tick(P, u, dt) {
      JF.y = jfL(JF.y, CU_SUELO - 6, 0.08);
      JF.golpeX = Math.sin(JF.t * 30) * 2 * (1 - u);
      JF.cansado = 1;
    },
    fin() { JF.mareo = 0; },
  },

  /* ---------- cambio de fase ---------- */
  centro: {
    d: 0.9,
    tick(P, u) {
      JF.vis = u < 0.4 ? 1 - u / 0.4 : u < 0.55 ? 0 : (u - 0.55) / 0.45;
      if (u >= 0.4 && !P.hecho.m) { P.hecho.m = 1; JF.x = W / 2; JF.y = cuFlota(); jfSnd.tele(); }
      JF.face = p.x < JF.x ? -1 : 1;
    },
  },
  despierta: {
    d: 0.1,
    ini() { JF.cine = { k: 'transforma', t: 0 }; state = 'jfcine'; JF.habla = null; },
  },
};
// una ola de columnas de luz (aviso 1 s, quema 0.75 s)
function cuOla(tipo) {
  const t0 = JF.t, L = JF.pil.L, w6 = W / 6;
  const n0 = L.length;
  // (solo la primera columna de cada ola hace los pitidos de aviso)
  const add = (x0, x1, extra) => L.push(Object.assign({ x0, x1, ta: t0, tf: t0 + 1.0, td: 0.75, calla: L.length > n0 }, extra || {}));
  if (tipo == 'lados') { add(0, W / 2 - 70); add(W / 2 + 70, W); }
  else if (tipo == 'centro') add(W / 2 - 100, W / 2 + 100);
  else if (tipo == 'pares') for (let i = 0; i < 6; i += 2) add(i * w6 + 4, (i + 1) * w6 - 4);
  else if (tipo == 'impares') for (let i = 1; i < 6; i += 2) add(i * w6 + 4, (i + 1) * w6 - 4);
  else if (tipo == 'sigue') add(p.x - 85, p.x + 85, { sigue: t0 + 0.6 });
}
function cuDecir(txt, dur) {
  JF.habla = { txt, t: 0, dur: dur || Math.max(3.2, txt.length / 16 + 1.6), n: 0 };
}

/* =====================================================================
   DAÑO
   ===================================================================== */
function jfToca(x0, y0, x1, y1) {
  const top = p.y - (p.crouch ? 40 : 62);
  return p.x + 9 > x0 && p.x - 9 < x1 && p.y > y0 && top < y1;
}
function jfDanar(d) {
  if (p.inv > 0 || p.dash > 0 || state != 'play' || JF.dios) return false;
  hurt(d);
  HS = Math.max(HS, 0.07);
  SHK = Math.max(SHK, 4);
  for (let i = 0; i < 10; i++) pfx(p.x, pcy(), rnd(-160, 160), rnd(-160, 60), rnd(0.2, 0.45), i % 2 ? '#3fd8ff' : '#ffffff', 2, 300);
  return true;
}
function jfVulnerable() {
  const k = jfPaso().k;
  if (JF.cine || JF.vis < 0.6 || JF.solK > 0.1) return false;
  return !['centro', 'despierta', 'sol', 'tormenta'].includes(k);
}
function jfHerir(d, big) {
  if (!jfVulnerable()) {
    for (let i = 0; i < 4; i++) pfx(JF.x, JF.y - 34, rnd(-90, 90), rnd(-90, 30), 0.2, '#9a948c', 2, 0);
    return;
  }
  sfx('hit');
  hitFX(JF.x, JF.y - 34, big);
  JF.flash = 0.12;
  JF.golpeX = (JF.x > p.x ? 1 : -1) * 6;
  JF.pop = Math.max(JF.pop, 0.35);
  cuChispas(JF.x, JF.y - 34, 10);
  cuTexto(String(d), JF.x + rnd(-10, 10), JF.y - 74, big ? '#ffd95a' : '#ffffff');
  JF.hp -= d;
  if (JF.fase == 1 && JF.hp <= JF.max / 2) {
    JF.hp = JF.max / 2;
    if (!JF.transPedida) {
      JF.transPedida = true;
      // si está siendo sol, espera a que termine; si no, se transforma ya
      if (jfPaso().k == 'sol') JF.pendiente = true;
      else { cuLimpiar(); JF.vis = 1; jfPlan(JF_ATQ.transforma()); }
    }
  }
  if (JF.fase == 2 && JF.hp <= 0) {
    JF.hp = 0;
    cuLimpiar();
    JF.cine = { k: 'muere', t: 0 };
    state = 'jfcine';
    sfx('boom');
    cuDecir('...Bien. Entonces contalo vos, a tu manera. Ya no es un chiste: es tu cuento.', 4.2);
  }
}
function cuLimpiar() {
  JF.relampagos = []; JF.flechas = []; JF.minip = []; JF.arcos = null; JF.inv = 0; JF.anillos = []; JF.rayas = []; JF.reflejo = null; JF.mareo = 0;
  JF.pil = { L: [] }; JF.rayos = []; JF.gotas = []; JF.orbes = []; JF.constel = null; JF.mano = null; JF.arco = 0; JF.solK = 0;
  if (JF.inicio) cuEscenario('blanco');
}
function cuChispas(x, y, n) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * 6.283, s = rnd(40, 180);
    pfx(x + rnd(-8, 8), y + rnd(-20, 20), Math.cos(a) * s, Math.sin(a) * s, rnd(0.25, 0.6), ['#3fd8ff', '#ffffff', '#d9a43a', '#7a4cff'][i % 4], 2, 60);
  }
}

/* =====================================================================
   BUCLE DEL JEFE
   ===================================================================== */
function jfTick(dt) {
  if (!JF.on) return;
  JF.t += dt;
  JF.flash -= dt;
  JF.pop = Math.max(0, JF.pop - dt * 4);
  JF.alerta = Math.max(0, JF.alerta - dt);
  JF.invFlash = Math.max(0, JF.invFlash - dt);
  JF.hpVista = JF.hpVista > JF.hp ? Math.max(JF.hp, JF.hpVista - JF.max * 0.35 * dt) : JF.hp;
  for (const x of JF.textos) x.t += dt;
  JF.textos = JF.textos.filter(x => x.t < 0.9);
  if (JF.reflejo) { JF.reflejo.t += dt; if (JF.reflejo.t > 0.3) JF.reflejo = null; }
  JF.golpeX *= Math.max(0, 1 - dt * 14);
  for (const a of JF.anillos) a.t += dt;
  JF.anillos = JF.anillos.filter(a => a.t < a.d);
  for (const r of JF.rayas) r.t += dt;
  JF.rayas = JF.rayas.filter(r => r.t < 0.35);
  for (const q of JF.quemas) q.t += dt;
  JF.quemas = JF.quemas.filter(q => q.t < 2.5);
  // estela fantasma cuando se mueve rápido o aparece
  JF.estT = (JF.estT || 0) - dt;
  const mov = Math.hypot(JF.x - (JF.ux || JF.x), JF.y - (JF.uy || JF.y));
  if (JF.estT <= 0 && JF.vis > 0.4 && JF.solK < 0.3 && (mov > 1.2 || JF.pop > 0.3)) { JF.estT = 0.04; JF.estela.push({ x: JF.x, y: JF.y, a: 0.45, f: JF.face, forma: JF.forma }); }
  JF.ux = JF.x; JF.uy = JF.y;
  for (const g of JF.estela) g.a -= dt * 1.8;
  JF.estela = JF.estela.filter(g => g.a > 0).slice(-7);
  if (JF.arcos) for (const B of JF.arcos.B) B.retro = Math.max(0, (B.retro || 0) - dt * 6);
  JF.cansado = 0;
  cuCambioTick();
  if (JF.habla) {
    const h = JF.habla;
    h.t += dt;
    const n = Math.min(h.txt.length, Math.floor(h.t * 30));
    if (n > h.n && n % 2 == 0 && h.txt[n] != ' ') jfSnd.letra();
    h.n = n;
    if (h.t > h.dur) JF.habla = null;
  }
  if (JF.cine) return;
  const P = jfPaso(), D = PASO[P.k], dur = jfDur(P);
  JF.pt += dt;
  if (D.tick) D.tick(P, jfC(JF.pt / dur, 0, 1), dt);
  if (JF.pt >= dur && JF.pasos[JF.i] === P) {
    if (D.fin) D.fin(P);
    JF.i++;
    JF.pt = 0;
    if (JF.i >= JF.pasos.length) jfElegir();
    else jfIni();
  }
  jfGolpesSmara();
  // rayos que persiguen 0.6 s
  for (const R of JF.rayos) {
    R.t += dt;
    const o = cuArco();
    if (R.t < 0.6) {
      const want = Math.atan2(pcy() - o.y, p.x - o.x);
      let da = want - R.a;
      while (da > Math.PI) da -= 2 * Math.PI;
      while (da < -Math.PI) da += 2 * Math.PI;
      R.a += jfC(da, -R.giro * dt, R.giro * dt);
    }
    if (R.t < 0.78) {
      const cx = Math.cos(R.a), cy = Math.sin(R.a);
      let toca = false;
      for (const yy of [pcy(), p.y - 8]) {
        const k = (p.x - o.x) * cx + (yy - o.y) * cy;
        if (k > 0 && Math.abs((p.x - o.x) * cy - (yy - o.y) * cx) < (p.parry > 0 ? 14 : 9)) toca = true;
      }
      if (toca) {
        if (p.parry > 0 && !R.parado) cuParryRayo(R);
        else if (!R.parado) { JF.srcX = o.x; jfDanar(16); }
      }
      if (Math.random() < 0.5) pfx(o.x + cx * rnd(30, 300), o.y + cy * rnd(30, 300), rnd(-30, 30), rnd(-30, 30), 0.3, '#9fe4ff', 2, 0);
    }
  }
  JF.rayos = JF.rayos.filter(R => R.t < 0.9);
  // columnas de luz (tiempos absolutos)
  for (const q of JF.pil.L) {
    if (q.sigue && JF.t < q.sigue) {
      const c = jfL((q.x0 + q.x1) / 2, p.x, 1 - Math.exp(-4 * dt));
      q.x0 = c - 85;
      q.x1 = c + 85;
    }
    const nb = Math.floor((JF.t - q.ta) / 0.25);
    if (JF.t >= q.ta && JF.t < q.tf && !q['b' + nb]) { q['b' + nb] = 1; if (!q.calla) jfSnd.aviso(); }
    const k = JF.t - q.tf;
    if (k >= 0 && !q.son) {
      q.son = 1;
      jfSnd.columna();
      SHK = Math.max(SHK, 4);
      flashW = Math.max(flashW, 0.1);
      for (let i = 0; i < 24; i++) pfx(rnd(q.x0, q.x1), CU_SUELO - 1, rnd(-70, 70), rnd(-380, -80), rnd(0.4, 0.9), i % 3 ? '#fff6c8' : '#ffffff', 2, -60);
      cuAnillo((q.x0 + q.x1) / 2, CU_SUELO, 10, (q.x1 - q.x0) * 0.7, '#ffd95a', 0.4);
      JF.quemas.push({ x0: q.x0, x1: q.x1, t: 0 });
    }
    if (k > 0.07 && k < q.td - 0.1 && p.x + 8 > q.x0 && p.x - 8 < q.x1) { JF.srcX = (q.x0 + q.x1) / 2; jfDanar(20); }
  }
  JF.pil.L = JF.pil.L.filter(q => JF.t < q.tf + q.td);
  // meteoros
  for (const g of JF.gotas) {
    if (JF.t < g.ts + 0.7) continue;
    if (!g.cae) { g.cae = true; jfSnd.estrella(); }
    g.y += 900 * dt;
    if (!g.ok && g.y >= CU_SUELO) {
      g.ok = true;
      g.tImp = JF.t;
      for (let i = 0; i < 6; i++) pfx(g.x, CU_SUELO, rnd(-120, 120), rnd(-160, -40), rnd(0.2, 0.4), i % 2 ? '#9fe4ff' : '#ffffff', 2, 600);
    }
    if (!g.ok && jfToca(g.x - 6, g.y - 18, g.x + 6, g.y)) { JF.srcX = g.x; jfDanar(12); }
  }
  JF.gotas = JF.gotas.filter(g => !g.ok || JF.t - g.tImp < 0.5);
  // estrellas que persiguen
  for (const o of JF.orbes) {
    if (!o.vivo) continue;
    o.t += dt;
    const ax = p.x - o.x, ay = pcy() - o.y, d = Math.hypot(ax, ay) || 1;
    o.vx += (ax / d) * 160 * dt;
    o.vy += (ay / d) * 160 * dt;
    const v = Math.hypot(o.vx, o.vy);
    if (v > 175) { o.vx *= 175 / v; o.vy *= 175 / v; }
    o.x += o.vx * dt;
    o.y += o.vy * dt;
    if (d < 13) { JF.srcX = o.x; if (jfDanar(10)) { o.vivo = false; cuChispas(o.x, o.y, 8); } }
    if (o.t > 4.5 || o.y > CU_SUELO) { o.vivo = false; cuChispas(o.x, Math.min(o.y, CU_SUELO), 6); }
  }
  JF.orbes = JF.orbes.filter(o => o.vivo);
  // rayos de la tormenta (aviso 0.7 s y luego cae)
  for (const r of JF.relampagos) {
    r.t += dt;
    if (r.t >= 0.7 && !r.son) {
      r.son = 1;
      jfRuido(0.45, 3500, 0.2);
      jfTono(220, 60, 0.3, 'sawtooth', 0.06);
      SHK = Math.max(SHK, 5);
      flashW = Math.max(flashW, 0.06);
      cuAnillo(r.x, CU_SUELO, 6, 40, '#9fe4ff', 0.3);
      JF.quemas.push({ x0: r.x - 8, x1: r.x + 8, t: 0 });
      for (let i = 0; i < 10; i++) pfx(r.x + rnd(-6, 6), CU_SUELO - 2, rnd(-140, 140), rnd(-200, -40), rnd(0.2, 0.5), i % 2 ? '#9fe4ff' : '#ffffff', 2, 500);
    }
    if (r.t >= 0.7 && r.t < 0.9 && Math.abs(p.x - r.x) < 14) { JF.srcX = r.x; jfDanar(14); }
  }
  JF.relampagos = JF.relampagos.filter(r => r.t < 1.0);
  // flechas de los arcos
  for (const f of JF.flechas) {
    f.t += dt;
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    if (Math.random() < 0.6) pfx(f.x, f.y, rnd(-30, 30), rnd(-30, 30), 0.2, Math.random() < 0.5 ? '#e8d6ff' : '#9fe4ff', 1, 0);
    const dP = Math.hypot(p.x - f.x, pcy() - f.y);
    if (f.amiga) {
      // flecha devuelta: va contra el Cuentero
      if (Math.hypot(JF.x - f.x, JF.y - 34 - f.y) < 22 && !f.fin) {
        f.fin = 1;
        cuAnillo(f.x, f.y, 4, 30, '#ffd95a', 0.3, true);
        if (jfVulnerable()) { jfHerir(22, true); cuTexto('¡DE VUELTA!', JF.x, JF.y - 90, '#ffd95a'); }
        else cuChispas(f.x, f.y, 8);
      }
      if (f.y >= CU_SUELO || f.y < -20) f.fin = 1;
    } else if (dP < (p.parry > 0 ? 22 : 12) && !f.fin) {
      if (p.parry > 0) {
        // PARRY: la flecha sale disparada hacia el Cuentero
        f.amiga = true;
        const a = Math.atan2(JF.y - 34 - f.y, JF.x - f.x);
        f.vx = Math.cos(a) * 760; f.vy = Math.sin(a) * 760; f.a = a; f.t = 0;
        cuParryFx(f.x, f.y, false);
      } else { f.fin = 1; JF.srcX = f.x; jfDanar(10); }
    }
    if (!f.amiga && f.y >= CU_SUELO && !f.fin) {
      f.fin = 1;
      JF.minip.push({ x: f.x, t: 0 });
      cuAnillo(f.x, CU_SUELO, 4, 26, '#ffd95a', 0.3);
      SHK = Math.max(SHK, 2);
      jfTono(1320, 1310, 0.4, 'sine', 0.04);
      jfRuido(0.3, 3000, 0.1);
      for (let i = 0; i < 8; i++) pfx(f.x, CU_SUELO - 2, rnd(-100, 100), rnd(-160, -40), rnd(0.2, 0.4), i % 2 ? '#fff1a8' : '#ffffff', 2, 400);
    }
  }
  JF.flechas = JF.flechas.filter(f => !f.fin && f.t < 2 && f.x > -20 && f.x < W + 20);
  // mini pilares de luz donde caen las flechas
  for (const m of JF.minip) {
    m.t += dt;
    if (m.t > 0.08 && m.t < 0.5 && Math.abs(p.x - m.x) < 13) { JF.srcX = m.x; jfDanar(12); }
  }
  JF.minip = JF.minip.filter(m => m.t < 0.65);
  jfMusica();
}

/* ---------------- música ---------------- */
const JF_ARP = [60, 64, 67, 71, 72, 71, 67, 64];
function jfMusica() {
  if (!AC || muted) return;
  if (JF.musT < AC.currentTime) JF.musT = AC.currentTime + 0.05;
  while (JF.musT < AC.currentTime + 0.12) {
    const st = JF.paso++, dl = JF.musT - AC.currentTime, sb = Math.floor(st / 32) % 2 ? -3 : 0;
    if (JF.fase == 2) {
      jfTono(mtof(JF_ARP[st % 8] + sb), mtof(JF_ARP[st % 8] + sb) * 0.99, 0.16, 'square', 0.015, dl);
      if (st % 4 == 0) jfTono(mtof(36 + sb), 45, 0.3, 'triangle', 0.12, dl);
      if (st % 8 == 6) jfTono(mtof(84 + sb), mtof(84 + sb), 0.3, 'sine', 0.012, dl);
      JF.musT += 0.15;
    } else {
      if (st % 8 == 0) jfTono(mtof(48 + sb), mtof(48 + sb), 0.9, 'sine', 0.06, dl);
      if (st % 8 == 4) jfTono(mtof(76 + (st % 16 == 4 ? 0 : -1)), mtof(76), 1.0, 'sine', 0.014, dl);
      JF.musT += 0.2;
    }
  }
}

/* =====================================================================
   CINEMÁTICAS
   ===================================================================== */
function cuCharlaLinea() {
  const C = JF.cine;
  return C && C.k == 'intro' && C.i >= 0 && C.i < CU_CHARLA.length ? CU_CHARLA[C.i] : null;
}
function cuAvanzar() {
  const C = JF.cine, L = cuCharlaLinea();
  if (!L) return;
  if (C.n < L[1].length) C.n = L[1].length;
  else { C.i++; C.s = 0; C.n = 0; }
}
addEventListener('keydown', e => {
  if (area != 7 || state != 'jfcine' || !JF.cine || JF.cine.k != 'intro' || e.repeat) return;
  if (['KeyE', 'Enter', 'KeyJ', 'Space'].includes(e.code)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    cuAvanzar();
  }
});
function jfCineTick(dt) {
  const C = JF.cine;
  C.t += dt;
  if (C.k == 'intro') {
    p.face = JF.x > p.x ? 1 : -1;
    JF.face = -1;
    // 1) aparece de pie en el suelo, dentro de un círculo de runas
    JF.vis = jfC((C.t - 0.4) / 1.2, 0, 1);
    if (!C.sube) JF.y = CU_SUELO;
    if (C.t > 0.4 && !C.s0) { C.s0 = 1; jfSnd.aparece(); }
    if (C.t > 1.8 && C.i < 0) C.i = C.larga ? 0 : CU_CHARLA.length;
    const L = cuCharlaLinea();
    if (L) {
      C.s += dt;
      const n = Math.min(L[1].length, Math.floor(C.s * 32));
      if (n > C.n) { if (n % 2 == 0 && L[1][n] != ' ') (L[0] == 'SMARA' ? jfSnd.letraS : jfSnd.letra)(); C.n = n; }
      if (C.n >= L[1].length && C.s > L[1].length / 32 + 2.2) { C.i++; C.s = 0; C.n = 0; }
    } else if (C.i >= CU_CHARLA.length) {
      // 2) se eleva y empieza la pelea
      C.sube = (C.sube || 0) + dt;
      const k = jfE.io(jfC(C.sube / 1.1, 0, 1));
      JF.y = jfL(CU_SUELO, cuFlota(), k);
      if (C.sube < 1.1 && Math.random() < 0.6) pfx(JF.x + rnd(-14, 14), CU_SUELO - 2, rnd(-20, 20), rnd(-80, -30), rnd(0.3, 0.6), '#3fd8ff', 2, 0);
      if (!C.s1) { C.s1 = 1; jfSnd.carga(); }
      if (C.sube > 3.4) { cuIntroVista = true; JF.cine = null; state = 'play'; }
    }
  } else if (C.k == 'transforma') {
    // anillos, el manto se deshace, flash blanco, y el blanco se encoge en su pecho
    JF.y = jfL(JF.y, CU_SUELO - 70, 0.04);
    if (C.t < 1.4 && Math.random() < 0.9) pfx(JF.x + rnd(-14, 14), JF.y - rnd(0, CU_ALTO), rnd(-60, 60), rnd(-40, 80), rnd(0.4, 0.9), ['#5b4535', '#7f8171', '#d9a43a', '#3fd8ff'][Math.floor(Math.random() * 4)], 2, 200);
    if (C.t > 0.1 && !C.s0) { C.s0 = 1; jfTono(110, 880, 1.3, 'sawtooth', 0.08); jfRuido(1.3, 3000, 0.12, true); }
    JF.flash = C.t < 1.4 && Math.floor(C.t * 14) % 2 ? 0.05 : 0;
    JF.blanco = C.t < 1.3 ? 0 : C.t < 1.4 ? (C.t - 1.3) / 0.1 : C.t < 1.8 ? 1 : 0;
    if (C.t > 1.4 && !C.cambio) {
      C.cambio = 1;
      JF.forma = 'galaxia';
      JF.fase = 2;
      JF.fondo = 1;
      JF.inicio = 0;
      JF.vis = 1;
      JF.paso = 0;
      sfx('boom');
      SHK = 8;
    }
    if (C.t > 1.8) {
      const k = jfE.io(jfC((C.t - 1.8) / 1.5, 0, 1)), bx = JF.x, by = JF.y - 40;
      const R0 = Math.max(Math.hypot(bx, by), Math.hypot(W - bx, by), Math.hypot(bx, H - by), Math.hypot(W - bx, H - by)) + 10;
      JF.iris = { x: bx, y: by, r: jfL(R0, 0, k) };
    }
    if (C.t > 3.3) JF.iris = null;
    if (C.t > 3.4 && !C.dijo) { C.dijo = 1; cuDecir('¿Querés ver de qué está hecho tu cuento? De estrellas... y de risas ajenas.', 3.6); }
    if (C.t > 6.2) { JF.cine = null; state = 'play'; jfPlan([{ k: 'idle', d: 1.0 }]); }
  } else if (C.k == 'muere') {
    JF.arco = 0;
    JF.y = jfL(JF.y, CU_SUELO - 2, 0.03);
    if (C.t > 2.2) {
      JF.vis = Math.max(0, 1 - (C.t - 2.2) / 2.6);
      if (Math.random() < 0.9) for (let i = 0; i < 2; i++) pfx(JF.x + rnd(-16, 16), JF.y - rnd(0, 72), rnd(-30, 30), rnd(-140, -60), rnd(0.6, 1.2), ['#9fe4ff', '#ffffff', '#c44cff'][i % 3], 2, -60);
    }
    if (C.t > 4.8) JF.fondoMix = jfC((C.t - 4.8) / 1.6, 0, 1);
    if (C.t > 7.6 && !C.epi) { C.epi = 1; epiEmpezar(); } // 40b-epilogo.js
  }
}

/* =====================================================================
   EL CUENTERO, dibujado pixel por pixel (1 pixel = 1 pixel del mundo)
   ===================================================================== */
const CUC = {
  capa: '#8b8d7c', capaS: '#6b6d5e', capaL: '#a7a996', oro: '#d9a43a', oroS: '#a8761e',
  tunica: '#5b4535', tunicaS: '#3a2c22', tunicaD: '#2a201a', manto: '#7f8171', mantoS: '#666858', mantoL: '#9a9c8b',
  mascara: '#efedf6', mascaraS: '#b8b0d8', mascaraD: '#8c84b8', ojo: '#5d4fe0', ojoL: '#c9c2ff', hueco: '#1c1530',
  gema: '#2f7fe0', gemaL: '#9fd0ff', gemaD: '#1f56c0', manga: '#d8d4ea', mangaS: '#a9a3c4',
  arco: '#3fd8ff', arcoD: '#2bb8e8', chispa: '#7a4cff', luz: '#e6f6ff', luzA: '#8ad8ff',
};
function cuArcoMagico(cx, cy, r, t, k) {
  // el arco celeste de la espalda: anillo, figuras geométricas y chispas
  ctx.save();
  if (k > 0.05) {
    ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
    const g = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.8);
    g.addColorStop(0, 'rgba(63,216,255,0)');
    g.addColorStop(0.6, 'rgba(63,216,255,' + 0.35 * k + ')');
    g.addColorStop(1, 'rgba(63,216,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - r * 2, cy - r * 2, r * 4, r * 4);
  }
  ctx.restore();
  ctx.fillStyle = CUC.arco;
  for (let a = 0; a < 6.283; a += 1 / r) ctx.fillRect(Math.round(cx + Math.cos(a) * r) - 1, Math.round(cy + Math.sin(a) * r) - 1, 2, 2);
  ctx.fillStyle = CUC.arcoD;
  const r2 = Math.round(r * 0.62);
  for (let a = t * 0.8; a < t * 0.8 + 4.4; a += 1 / r2) ctx.fillRect(Math.round(cx + Math.cos(a) * r2), Math.round(cy + Math.sin(a) * r2), 1, 1);
  // triángulo que gira
  const v = [0, 1, 2].map(i => [cx + Math.cos(-t * 0.6 + i * 2.094) * r, cy + Math.sin(-t * 0.6 + i * 2.094) * r]);
  for (let i = 0; i < 3; i++) jfLinea(v[i][0], v[i][1], v[(i + 1) % 3][0], v[(i + 1) % 3][1]);
  // nodo blanco y chispas violetas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(cx + Math.cos(t * 1.4) * r) - 1, Math.round(cy + Math.sin(t * 1.4) * r) - 1, 3, 3);
  ctx.fillStyle = CUC.chispa;
  for (let i = 0; i < 4; i++) {
    const a = t * (0.9 + i * 0.2) + i * 1.6, rr = r + 4 + Math.sin(t * 3 + i) * 2;
    if ((Math.floor(t * 5) + i) % 4) ctx.fillRect(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), 2, 2);
  }
  if (Math.floor(t * 3) % 2) { ctx.fillStyle = CUC.gema; ctx.fillRect(Math.round(cx), Math.round(cy - r - 6), 2, 3); }
}
function cuManto(x, y, t, o) {
  const f = o.face || 1, vis = o.vis == null ? 1 : o.vis;
  if (vis <= 0.01) return;
  const RD = jfRng(Math.floor(t * 20) * 31 + 5);
  const top = Math.round(y - CU_ALTO);
  const C = c => (o.flash ? '#ffffff' : o.sil ? o.sil : c);
  const P = (dx, dy, w, h, c) => {
    if (vis < 1 && RD() > vis) return;
    ctx.fillStyle = C(c);
    ctx.fillRect(Math.round(f > 0 ? x + dx : x - dx - w), top + dy, w, h || 1);
  };
  const sway = Y => Math.sin(Y * 0.18 - t * 2) * Math.max(0, Y - 40) * 0.04;
  // arco mágico detrás
  if (!o.sil && vis > 0.3) cuArcoMagico(Math.round(f > 0 ? x - 7 : x + 7), top + 21, 17, t, o.arco || 0);
  // --- túnica (Y 24..66) ---
  for (let Y = 24; Y <= 66; Y++) {
    const k = (Y - 24) / 42, hw = Math.round(9 + 6 * k), s = Math.round(sway(Y));
    P(-hw + s, Y, hw * 2, 1, CUC.tunica);
    P(hw - 4 + s, Y, 3, 1, CUC.tunicaD); // frente oscuro
    if (Y >= 30) P(hw - 5 + s, Y, 1, 1, CUC.oro); // borde dorado del frente
    if (Y < 61) {
      // manto gris sobre la espalda
      const mw = Math.round(hw + 1 - k * 2);
      P(-hw + s, Y, mw, 1, CUC.manto);
      P(-hw + s, Y, 2, 1, CUC.mantoS);
      if (Y % 4 < 2) P(-hw + 4 + s, Y, 2, 1, CUC.mantoL);
      P(-hw + mw + s, Y, 1, 1, CUC.oro);
    }
  }
  // ruedo dorado
  P(-15 + Math.round(sway(66)), 65, 30, 2, CUC.oro);
  P(-15 + Math.round(sway(66)), 67, 30, 1, CUC.oroS);
  P(-13, 60, 2, 1, CUC.oro); // borde del manto gris
  // gemas azules en el borde del manto
  for (const Y of [34, 40, 46, 52]) { const hw = Math.round(9 + 6 * ((Y - 24) / 42)); P(-hw + 2, Y, 2, 2, CUC.gema); P(-hw + 2, Y, 1, 1, CUC.gemaL); }
  // broche del pecho
  P(-7, 26, 5, 6, CUC.oro);
  P(-6, 27, 3, 4, CUC.gemaD);
  P(-6, 27, 1, 1, CUC.gemaL);
  // --- capucha (Y 6..27) ---
  const hwH = [3, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9];
  for (let r = 0; r < hwH.length; r++) {
    const Y = 6 + r, hw = hwH[r];
    P(-hw, Y, hw * 2 + 1, 1, CUC.capa);
    P(-hw, Y, 2, 1, CUC.capaS);
    if (r < 4) P(-hw + 2, Y, hw, 1, CUC.capaL);
  }
  // abertura de la cara con borde dorado y la máscara
  for (let Y = 9; Y <= 23; Y++) {
    const e = (Y - 16) / 7, hw = Math.round(4.6 * Math.sqrt(Math.max(0, 1 - e * e)));
    if (hw <= 0) continue;
    P(3 - hw - 1, Y, 1, 1, CUC.oro);
    P(3 + hw + 1, Y, 1, 1, CUC.oro);
    P(3 - hw, Y, hw * 2 + 1, 1, CUC.hueco);
  }
  P(1, 8, 5, 1, CUC.oro);
  for (let Y = 10; Y <= 21; Y++) {
    const e = (Y - 15.5) / 6, hw = Math.round(3.4 * Math.sqrt(Math.max(0, 1 - e * e)));
    if (hw <= 0) continue;
    P(4 - hw, Y, hw * 2, 1, CUC.mascara);
    P(4 - hw, Y, 1, 1, CUC.mascaraS);
    if (Y > 18) P(4 - hw, Y, hw * 2, 1, CUC.mascaraD);
  }
  P(5, 13, 2, 2, CUC.ojo);
  P(6, 13, 1, 1, CUC.ojoL);
  // --- brazo con la luz (sale de la manga y apunta) ---
  const sh = { x: 6, y: 28 };
  let hx = 13, hy = 18 + Math.round(Math.sin(t * 2.4));
  if (o.mano) {
    const a = f > 0 ? o.mano.a : Math.PI - o.mano.a; // ángulo en coordenadas locales (mirando a la derecha)
    const tx = sh.x + Math.cos(a) * 15, ty = sh.y + Math.sin(a) * 15;
    hx = Math.round(jfL(hx, tx, o.mano.k));
    hy = Math.round(jfL(hy, ty, o.mano.k));
  }
  for (let k = 0; k <= 1; k += 0.08) P(Math.round(jfL(sh.x, hx, k)) - 1, Math.round(jfL(sh.y, hy, k)) - 1, 3, 3, k < 0.7 ? CUC.manga : CUC.mangaS);
  return { hx: f > 0 ? x + hx : x - hx, hy: top + hy };
}
function cuLuzMano(m, t, k) {
  if (!m) return;
  const r = 6 + k * 8 + Math.sin(t * 8) * 1.5;
  ctx.save();
  ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
  const g = ctx.createRadialGradient(m.hx, m.hy, 0, m.hx, m.hy, r);
  g.addColorStop(0, 'rgba(160,230,255,' + (cuOscuro() ? 0.8 : 0.55) + ')');
  g.addColorStop(1, 'rgba(63,216,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(m.hx - r, m.hy - r, r * 2, r * 2);
  ctx.restore();
  ctx.fillStyle = CUC.luzA;
  ctx.fillRect(Math.round(m.hx) - 2, Math.round(m.hy) - 2, 5, 5);
  ctx.fillStyle = CUC.luz;
  ctx.fillRect(Math.round(m.hx) - 1, Math.round(m.hy) - 1, 3, 3);
}

/* ---------- forma 2: humano con cuerpo de galaxia ---------- */
const CU_SIL = document.createElement('canvas'),
  CU_GAL = document.createElement('canvas');
CU_SIL.width = CU_GAL.width = 56;
CU_SIL.height = CU_GAL.height = 84;
const cuSx = CU_SIL.getContext('2d'),
  cuGx = CU_GAL.getContext('2d');
const CU_ESTR = Array.from({ length: 46 }, (_, i) => ({ x: (i * 37.7) % 56, y: (i * 53.3) % 84, v: 2 + (i % 5), b: i % 7 == 0 }));
function cuSilueta(c, col, t, o) {
  // la figura humana (mirando a la derecha); se dibuja en un canvas chico
  c.clearRect(0, 0, 56, 84);
  c.fillStyle = col;
  const cx = 28, bob = 0;
  const disco = (x, y, r) => { for (let yy = -r; yy <= r; yy++) { const w = Math.round(Math.sqrt(r * r - yy * yy)); c.fillRect(x - w, y + yy, w * 2 + 1, 1); } };
  const palo = (x0, y0, x1, y1, w0, w1) => { for (let k = 0; k <= 1; k += 0.04) { const w = Math.round(jfL(w0, w1, k)); c.fillRect(Math.round(jfL(x0, x1, k) - w / 2), Math.round(jfL(y0, y1, k) - w / 2), w, w); } };
  disco(cx + 1, 9 + bob, 6);
  c.fillRect(cx - 1, 15, 4, 3);
  for (let Y = 17; Y <= 43; Y++) {
    const hw = Y < 21 ? 10 : Y < 37 ? Math.round(jfL(10, 6, (Y - 21) / 16)) : 7;
    c.fillRect(cx + 1 - hw, Y, hw * 2, 1);
  }
  // piernas flotando, puntas abajo
  const sw = Math.sin(t * 2) * 1.5;
  palo(cx - 3, 43, cx - 5 + sw, 80, 5, 2);
  palo(cx + 4, 43, cx + 5 + sw, 78, 5, 2);
  // brazos
  palo(cx - 8, 19, cx - 12, 41, 4, 3);
  const sh = { x: cx + 9, y: 19 };
  let ex = cx + 12, ey = 41;
  if (o.mano) {
    const a = o.face > 0 ? o.mano.a : Math.PI - o.mano.a;
    ex = jfL(ex, sh.x + Math.cos(a) * 22, o.mano.k);
    ey = jfL(ey, sh.y + Math.sin(a) * 22, o.mano.k);
  }
  palo(sh.x, sh.y, ex, ey, 4, 3);
  disco(Math.round(ex), Math.round(ey), 2);
  return { hx: ex, hy: ey };
}
function cuGalaxia(x, y, t, o) {
  const vis = o.vis == null ? 1 : o.vis;
  if (vis <= 0.01) return null;
  const f = o.face || 1, X0 = Math.round(x - 28), Y0 = Math.round(y - 82);
  // halo (el arco ahora es un anillo completo)
  if (vis > 0.3) cuArcoMagico(Math.round(x), Math.round(y - 58), 19, t, o.arco || 0.3);
  // silueta para el borde de luz
  const m = cuSilueta(cuSx, '#9fe4ff', t, o);
  // relleno de galaxia
  cuSilueta(cuGx, '#ffffff', t, o);
  cuGx.globalCompositeOperation = 'source-in';
  const g = cuGx.createLinearGradient(0, 0, 0, 84);
  g.addColorStop(0, '#2a1060');
  g.addColorStop(0.5, '#1a0b4a');
  g.addColorStop(1, '#0d1240');
  cuGx.fillStyle = o.flash ? '#ffffff' : g;
  cuGx.fillRect(0, 0, 56, 84);
  cuGx.globalCompositeOperation = 'source-atop'; // lo demás se pinta encima, solo dentro del cuerpo
  if (!o.flash) {
    for (const [cx, cy, r, c] of [[28 + Math.sin(t * 0.7) * 8, 30 + Math.cos(t * 0.5) * 8, 16, 'rgba(196,76,255,.45)'], [24 + Math.cos(t * 0.6) * 6, 58 + Math.sin(t * 0.8) * 6, 14, 'rgba(47,208,200,.35)'], [34, 12, 8, 'rgba(255,120,200,.3)']]) {
      const n = cuGx.createRadialGradient(cx, cy, 0, cx, cy, r);
      n.addColorStop(0, c);
      n.addColorStop(1, 'rgba(0,0,0,0)');
      cuGx.fillStyle = n;
      cuGx.fillRect(0, 0, 56, 84);
    }
    for (const s of CU_ESTR) {
      const yy = (s.y + t * s.v) % 84, tw = Math.sin(t * 4 + s.x) > 0.3;
      cuGx.fillStyle = s.b ? '#ffffff' : tw ? '#cfe8ff' : '#6a7ad0';
      cuGx.fillRect(Math.round(s.x), Math.round(yy), 1, 1);
      if (s.b && tw) { cuGx.fillRect(Math.round(s.x) - 1, Math.round(yy), 3, 1); cuGx.fillRect(Math.round(s.x), Math.round(yy) - 1, 1, 3); }
    }
    // la estrella del pecho
    cuGx.fillStyle = '#ffffff';
    cuGx.fillRect(29, 26, 1, 5); cuGx.fillRect(27, 28, 5, 1);
  }
  cuGx.globalCompositeOperation = 'source-over';
  ctx.save();
  ctx.globalAlpha = vis;
  ctx.translate(f > 0 ? X0 : X0 + 56, Y0);
  ctx.scale(f, 1);
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) ctx.drawImage(CU_SIL, dx, dy);
  ctx.drawImage(CU_GAL, 0, 0);
  // la máscara blanca sigue siendo su cara
  ctx.fillStyle = CUC.mascara;
  ctx.fillRect(27, 4, 7, 10);
  ctx.fillRect(28, 3, 5, 12);
  ctx.fillStyle = CUC.mascaraS;
  ctx.fillRect(27, 4, 1, 10);
  ctx.fillStyle = CUC.ojo;
  ctx.fillRect(31, 7, 2, 2);
  ctx.fillStyle = CUC.ojoL;
  ctx.fillRect(32, 7, 1, 1);
  ctx.restore();
  return { hx: f > 0 ? X0 + m.hx : X0 + 56 - m.hx, hy: Y0 + m.hy };
}
/* ---------- mini sol ---------- */
function cuSol(x, y, t, k) {
  const r = Math.round(4 + 12 * k);
  ctx.save();
  ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
  g.addColorStop(0, 'rgba(255,230,140,' + 0.7 * k + ')');
  g.addColorStop(0.4, 'rgba(255,170,60,' + 0.3 * k + ')');
  g.addColorStop(1, 'rgba(255,140,40,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
  ctx.restore();
  // rayos que giran
  ctx.fillStyle = '#ffd23f';
  for (let i = 0; i < 12; i++) {
    const a = t * 0.8 + (i * Math.PI) / 6, l = r + 5 + (i % 2 ? 4 : 9) * k + Math.sin(t * 6 + i) * 2;
    jfLinea(x + Math.cos(a) * (r + 2), y + Math.sin(a) * (r + 2), x + Math.cos(a) * l, y + Math.sin(a) * l);
  }
  // disco pixelado
  for (let j = -r; j <= r; j++) {
    const w = Math.round(Math.sqrt(r * r - j * j));
    ctx.fillStyle = Math.abs(j) > r * 0.75 ? '#ff9a1f' : '#ffd23f';
    ctx.fillRect(Math.round(x - w), Math.round(y + j), w * 2 + 1, 1);
  }
  const r2 = Math.round(r * 0.6);
  ctx.fillStyle = '#fff6c8';
  for (let j = -r2; j <= r2; j++) { const w = Math.round(Math.sqrt(r2 * r2 - j * j)); ctx.fillRect(Math.round(x - w), Math.round(y + j), w * 2 + 1, 1); }
  // su máscara en el centro del sol
  if (k > 0.5) {
    ctx.fillStyle = CUC.mascara;
    ctx.fillRect(Math.round(x) - 3, Math.round(y) - 4, 7, 9);
    ctx.fillStyle = CUC.mascaraS;
    ctx.fillRect(Math.round(x) - 3, Math.round(y) - 4, 1, 9);
    ctx.fillStyle = CUC.ojo;
    ctx.fillRect(Math.round(x) + 1, Math.round(y) - 2, 2, 2);
  }
}

/* ---------- fondo: blanco / inicio (Ribera de Sahinos vacía) / bucles cósmicos ---------- */
const JF_LB = document.createElement('canvas');
JF_LB.width = 234;
JF_LB.height = 136;
const jfLx = JF_LB.getContext('2d'),
  jfImg = jfLx.createImageData(234, 136),
  jfPx = new Uint32Array(jfImg.data.buffer);
const jfPal = c => c.map(h => (255 << 24) | (parseInt(h.slice(5, 7), 16) << 16) | (parseInt(h.slice(3, 5), 16) << 8) | parseInt(h.slice(1, 3), 16));
const JF_PAL = jfPal(['#0a0620', '#140a3a', '#22105a', '#33167a', '#4a1d92', '#6a24a6', '#8c32b4', '#b44cc0', '#d47ad0', '#b44cc0', '#8c32b4', '#6a24a6', '#4a1d92', '#33167a', '#22105a', '#140a3a']);
const JF_PAL2 = jfPal(['#041020', '#061a34', '#0a2a4c', '#0f3e66', '#155682', '#1f72a0', '#2d90bc', '#1f72a0', '#155682', '#0f3e66', '#0a2a4c', '#061a34']);
const JF_DA = (() => {
  const d = new Float32Array(234 * 136), a = new Float32Array(234 * 136);
  for (let y = 0; y < 136; y++) for (let x = 0; x < 234; x++) { const dx = x - 117, dy = (y - 60) * 1.15; d[y * 234 + x] = Math.hypot(dx, dy); a[y * 234 + x] = Math.atan2(dy, dx); }
  return { d, a };
})();
let jfLBt = -1;
function jfBucles(t) {
  if (Math.abs(t - jfLBt) < 1 / 40) return;
  jfLBt = t;
  const D = JF_DA.d, A = JF_DA.a;
  for (let y = 0; y < 136; y++) {
    const imp = y & 1, ow = Math.sin(y * 0.11 + t * (imp ? 2.1 : -2.1)) * 7;
    for (let x = 0; x < 234; x++) {
      const xx = Math.round(x + ow), i = y * 234 + jfC(xx, 0, 233);
      const v = Math.sin(D[i] * 0.21 - t * 2.4 + Math.sin(A[i] * 3 + t * 0.9) * 2.3) + Math.sin(xx * 0.05 + y * 0.07 + t) * 0.5;
      if (imp) jfPx[y * 234 + x] = JF_PAL[Math.floor((v + 1.5) * 4 + t * 7) & 15];
      else {
        const w = Math.sin(D[i] * 0.13 + t * 1.6 + A[i] * 2) + Math.cos(y * 0.09 - t * 1.3) * 0.6;
        jfPx[y * 234 + x] = w > 0.55 ? JF_PAL2[((Math.floor(w * 6 - t * 5) % 12) + 12) % 12] : JF_PAL[Math.floor((v + 1.5) * 4 + t * 7) & 15];
      }
    }
  }
  // estrellitas encima
  for (let i = 0; i < 60; i++) {
    const x = (i * 97) % 234, y = (i * 59) % 110;
    if (Math.sin(t * 3 + i) > 0.2) jfPx[y * 234 + x] = 0xffffffff;
  }
  jfLx.putImageData(jfImg, 0, 0);
}
/* ---------- LA SALA DE LAS PANTALLAS (cuando se vuelve sol) ----------
   Una pared infinita de televisores viejos flotando en la oscuridad: cada uno pasa
   un "video" de donde Smara sacó su Mulukukú (recortes de sus propios escenarios),
   estática, o risas grabadas. Las risas suben flotando como en un video gracioso. */
const CU_RUIDO = document.createElement('canvas');
CU_RUIDO.width = 48;
CU_RUIDO.height = 32;
const cuRx = CU_RUIDO.getContext('2d'), cuRimg = cuRx.createImageData(48, 32);
let cuRuidoT = 0;
const CU_TVS = (() => {
  const L = [], R = jfRng(77);
  for (let fila = 0; fila < 4; fila++)
    for (let i = 0; i < 9; i++) {
      const w = 54 + Math.round(R() * 18), h = Math.round(w * 0.72);
      L.push({ x: i * 80 - 10 + fila * 26 + R() * 14, y: 24 + fila * 66 + R() * 10, w, h, tipo: Math.floor(R() * 6), ph: R() * 6, cambia: 3 + R() * 5, prof: 0.55 + fila * 0.15 });
    }
  return L;
})();
const CU_RISAS = ['JAJAJA', 'jsjsjs', 'XD', 'JAJAJ', 'ajjaja', 'JSJSJ', 'LOL', 'jajaj'];
function cuTele(tv, t) {
  const bob = Math.sin(t * 0.8 + tv.ph) * 3, x = Math.round(tv.x), y = Math.round(tv.y + bob), w = tv.w, h = tv.h, sw = w - 10, sh = h - 12;
  // cada cierto tiempo cambia de "canal" (con estática en el cambio)
  const ciclo = Math.floor((t + tv.ph * 3) / tv.cambia), tipo = (tv.tipo + ciclo) % 6, enCambio = (t + tv.ph * 3) % tv.cambia < 0.18;
  ctx.globalAlpha = tv.prof;
  // carcasa
  ctx.fillStyle = '#05030a';
  ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = '#2a2236';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#3e3450';
  ctx.fillRect(x, y, w, 2);
  ctx.fillStyle = '#16101e';
  ctx.fillRect(x + w - 4, y + 6, 2, 2);
  ctx.fillRect(x + w - 4, y + 10, 2, 2);
  // antena
  ctx.fillStyle = '#3e3450';
  jfLinea(x + w / 2, y, x + w / 2 - 8, y - 9);
  jfLinea(x + w / 2, y, x + w / 2 + 7, y - 10);
  // pantalla
  const px = x + 4, py = y + 5;
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py, sw, sh);
  ctx.clip();
  if (enCambio || tipo == 2) ctx.drawImage(CU_RUIDO, 0, 0, 48, 32, px, py, sw, sh);
  else if (tipo == 0 && img.scn) ctx.drawImage(img.scn, (t * 30 + tv.ph * 200) % 900, 300, 300, 220, px, py, sw, sh);
  else if (tipo == 1 && img.sky && img.mon) { ctx.drawImage(img.sky, 0, 200, 1, 400, px, py, sw, sh); ctx.drawImage(img.mon, px - 10 + Math.sin(t + tv.ph) * 6, py + sh * 0.25, sw * 1.3, sh); }
  else if (tipo == 3) {
    ctx.fillStyle = '#ffd95a';
    ctx.fillRect(px, py, sw, sh);
    ctx.fillStyle = '#2a1608';
    ctx.font = '8px ' + PS;
    ctx.textAlign = 'center';
    ctx.fillText(CU_RISAS[Math.floor(t * 2 + tv.ph) % CU_RISAS.length], px + sw / 2 + Math.sin(t * 9) * 2, py + sh / 2 + 3);
    ctx.textAlign = 'left';
  } else if (tipo == 4 && img.b2) ctx.drawImage(img.b2, (t * 20 + tv.ph * 100) % 400, 40, 300, 240, px, py, sw, sh);
  else {
    // barras de "risas grabadas" que suben y bajan
    ctx.fillStyle = '#16203a';
    ctx.fillRect(px, py, sw, sh);
    for (let i = 0; i < 6; i++) {
      const bh = Math.round((0.3 + 0.7 * Math.abs(Math.sin(t * 6 + i * 1.3 + tv.ph))) * (sh - 6));
      ctx.fillStyle = ['#ff5a6a', '#ffd95a', '#3fd8ff'][i % 3];
      ctx.fillRect(px + 3 + i * Math.floor((sw - 6) / 6), py + sh - 3 - bh, Math.floor((sw - 6) / 6) - 2, bh);
    }
  }
  // líneas de TV y brillo del vidrio
  ctx.fillStyle = 'rgba(0,0,0,.25)';
  for (let yy = py + ((t * 20) % 2 | 0); yy < py + sh; yy += 2) ctx.fillRect(px, yy, sw, 1);
  ctx.fillStyle = 'rgba(255,255,255,.08)';
  ctx.fillRect(px, py, sw, Math.round(sh * 0.35));
  ctx.restore();
  // luz que tira la pantalla
  ctx.globalAlpha = tv.prof * 0.12;
  ctx.fillStyle = tipo == 3 ? '#ffd95a' : '#8ad8ff';
  ctx.fillRect(x - 6, y - 6, w + 12, h + 12);
  ctx.globalAlpha = 1;
}
function cuPantallas(t) {
  // estática (se recalcula 20 veces por segundo)
  if (Math.abs(t - cuRuidoT) > 0.05) {
    cuRuidoT = t;
    const d = cuRimg.data;
    for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    cuRx.putImageData(cuRimg, 0, 0);
  }
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#120a1e');
  g.addColorStop(1, '#05030a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // pared de televisores, de atrás para adelante
  for (const tv of CU_TVS) cuTele(tv, t);
  // oscurece un poco para que se lea la pelea
  ctx.fillStyle = 'rgba(8,4,16,.35)';
  ctx.fillRect(0, 0, W, CU_SUELO);
  // conos de luz del "foco" (el sol)
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const dx of [-150, 0, 150]) {
    const gg = ctx.createLinearGradient(0, 120, 0, CU_SUELO);
    gg.addColorStop(0, 'rgba(255,220,140,.12)');
    gg.addColorStop(1, 'rgba(255,220,140,0)');
    ctx.fillStyle = gg;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 8, 120); ctx.lineTo(W / 2 + 8, 120); ctx.lineTo(W / 2 + dx + 60, CU_SUELO); ctx.lineTo(W / 2 + dx - 60, CU_SUELO);
    ctx.fill();
  }
  ctx.restore();
  // escenario: piso brillante con reflejos de las pantallas
  ctx.fillStyle = '#0a0612';
  ctx.fillRect(0, CU_SUELO, W, H - CU_SUELO);
  for (let i = 0; i < 14; i++) {
    const x = (i * 53 + t * 8) % W;
    ctx.fillStyle = ['rgba(138,216,255,.10)', 'rgba(255,217,90,.10)', 'rgba(255,90,106,.08)'][i % 3];
    ctx.fillRect(Math.round(x), CU_SUELO + 4 + (i % 4) * 9, 30, 2);
  }
  ctx.fillStyle = '#ffd95a';
  ctx.fillRect(0, CU_SUELO, W, 1);
  ctx.fillStyle = 'rgba(255,217,90,.25)';
  for (let i = 1; i < 8; i++) ctx.fillRect(0, CU_SUELO + i * i, W, 1);
  // risas que flotan hacia arriba
  ctx.textAlign = 'center';
  for (let i = 0; i < 12; i++) {
    const vida = 4 + (i % 3), k = ((t + i * 1.7) % vida) / vida, x = ((i * 137) % (W - 80)) + 40 + Math.sin(t * 2 + i) * 8, y = CU_SUELO - 10 - k * 220;
    ctx.globalAlpha = Math.sin(k * Math.PI) * 0.8;
    ctx.font = (i % 3 == 0 ? 10 : 7) + 'px ' + PS;
    ctx.fillStyle = '#05030a';
    ctx.fillText(CU_RISAS[i % CU_RISAS.length], Math.round(x) + 1, Math.round(y) + 1);
    ctx.fillStyle = ['#ffd95a', '#ff8ac8', '#8ad8ff', '#ffffff'][i % 4];
    ctx.fillText(CU_RISAS[i % CU_RISAS.length], Math.round(x), Math.round(y));
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  // "grabando"
  if (Math.floor(t * 2) % 2) { ctx.fillStyle = '#ff3a4a'; ctx.fillRect(10, 46, 5, 5); }
  ctx.fillStyle = '#ffffff';
  ctx.font = '7px ' + PS;
  ctx.fillText('REC', 19, 52);
}
// risas grabadas (sonido)
function cuRisasSnd() {
  if (!AC || muted) return;
  for (let i = 0; i < 9; i++) jfTono(330 + (i % 3) * 60 + Math.random() * 40, 260, 0.09, 'square', 0.025, i * 0.11 + Math.random() * 0.03);
  jfRuido(1.0, 1800, 0.05);
}
function jfFondo(t) {
  if (JF.inicio) return cuPantallas(t);
  if (JF.fondo) {
    jfBucles(t);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(JF_LB, 0, 0, 234, 110, 0, 0, W, CU_SUELO);
    ctx.globalAlpha = 0.35;
    ctx.translate(0, H + CU_SUELO);
    ctx.scale(1, -1);
    ctx.drawImage(JF_LB, 0, 80, 234, 30, 0, CU_SUELO, W, H - CU_SUELO);
    ctx.restore();
    ctx.fillStyle = 'rgba(6,4,20,.3)';
    ctx.fillRect(0, 0, W, CU_SUELO);
    ctx.fillStyle = 'rgba(4,2,14,.75)';
    ctx.fillRect(0, CU_SUELO, W, H - CU_SUELO);
    ctx.fillStyle = '#9fe4ff';
    ctx.fillRect(0, CU_SUELO, W, 1);
    ctx.fillStyle = 'rgba(159,228,255,.2)';
    for (let i = 0; i < 9; i++) ctx.fillRect(0, Math.round(CU_SUELO + 3 + i * i * 0.9), W, 1);
    if (JF.fondoMix > 0) { ctx.fillStyle = 'rgba(244,242,236,' + JF.fondoMix + ')'; ctx.fillRect(0, 0, W, H); }
  }
  if (!JF.fondo || JF.fondoMix > 0) {
    if (!JF.fondo) { ctx.fillStyle = '#f4f2ec'; ctx.fillRect(0, 0, W, H); }
    ctx.fillStyle = 'rgba(40,38,36,.12)';
    ctx.fillRect(0, CU_SUELO, W, 1);
    for (let i = 0; i < 16; i++) { const yy = CU_SUELO + Math.pow(i / 16, 2) * (H - CU_SUELO); ctx.fillRect(Math.round((i * 97) % W), Math.round(yy), 8 + i * 2, 1); }
    ctx.fillStyle = '#2c2621';
    for (let i = 0; i < 40; i++) {
      const xx = ((i * 173.3 + t * (14 + (i % 5) * 9)) % (W + 20)) - 10, yy = 30 + ((i * 61.7) % 280) + Math.sin(t * 1.5 + i) * 6;
      ctx.globalAlpha = 0.25 + (i % 3) * 0.15;
      ctx.fillRect(Math.round(xx), Math.round(yy), i % 4 ? 1 : 2, 1);
    }
    ctx.globalAlpha = 1;
  }
}

/* ---------- el jefe (detrás de Smara) ---------- */
function jfDibujarJefe(t) {
  if (!JF.on) return;
  const P = jfPaso();
  cuAvisoColumnas(t);
  // círculo de runas en el suelo cuando aparece
  if (JF.cine && JF.cine.k == 'intro' && (!JF.cine.sube || JF.cine.sube < 1.4)) {
    const k = jfC(JF.cine.t / 0.8, 0, 1) * (JF.cine.sube ? 1 - JF.cine.sube / 1.4 : 1), x = Math.round(JF.x - cam), rx = Math.round(30 * k);
    ctx.fillStyle = CUC.arco;
    for (let a = 0; a < 6.283; a += 0.06) ctx.fillRect(Math.round(x + Math.cos(a) * rx), Math.round(CU_SUELO + Math.sin(a) * rx * 0.22), 2, 1);
    ctx.fillStyle = CUC.chispa;
    for (let i = 0; i < 6; i++) { const a = t * 2 + i * 1.05; ctx.fillRect(Math.round(x + Math.cos(a) * rx * 0.6), Math.round(CU_SUELO + Math.sin(a) * rx * 0.13), 2, 1); }
  }
  // aviso de la tele: chispitas donde va a salir
  if (P.k == 'tele' && P.tx != null && JF.vis < 0.5) {
    const u = jfC(JF.pt / jfDur(P), 0, 1), k = jfC((u - 0.38) / 0.3, 0, 1), R = jfRng(Math.floor(t * 12));
    ctx.fillStyle = CUC.arco;
    for (let i = 0; i < 6 + k * 18; i++) ctx.fillRect(Math.round(P.tx - cam + (R() - 0.5) * 50 * k), Math.round(CU_SUELO - 20 - R() * 60 * k), 1, 1);
  }
  // sombra
  const sw = Math.round(24 * jfC(1 - (CU_SUELO - JF.y) / 260, 0.3, 1) * JF.vis);
  if (sw > 2 && JF.solK < 0.5) {
    ctx.fillStyle = cuOscuro() ? 'rgba(0,0,0,.45)' : 'rgba(20,10,10,.16)';
    ctx.fillRect(Math.round(JF.x - cam - sw / 2), CU_SUELO, sw, 2);
  }
  // quemaduras en el suelo que se apagan
  for (const q of JF.quemas) {
    ctx.fillStyle = cuOscuro() ? 'rgba(255,200,120,' + 0.35 * (1 - q.t / 2.5) + ')' : 'rgba(80,50,20,' + 0.25 * (1 - q.t / 2.5) + ')';
    ctx.fillRect(Math.round(q.x0 - cam), CU_SUELO, Math.round(q.x1 - q.x0), 2);
  }
  // estela fantasma
  for (const g of JF.estela) {
    ctx.globalAlpha = g.a * 0.6 * JF.vis;
    if (g.forma == 'galaxia') cuGalaxia(g.x - cam, Math.round(g.y), t, { face: g.f, flash: true });
    else cuManto(g.x - cam, Math.round(g.y), t, { face: g.f, sil: cuOscuro() ? '#3fd8ff' : '#9fd0ff' });
  }
  ctx.globalAlpha = 1;
  // rayas de luz del teletransporte
  for (const r of JF.rayas) {
    const k = r.t / 0.35, w = Math.round(10 * (1 - k)) + 1;
    ctx.fillStyle = 'rgba(159,228,255,' + (1 - k) + ')';
    ctx.fillRect(Math.round(r.x - cam - w / 2), 0, w, CU_SUELO);
    ctx.fillStyle = 'rgba(255,255,255,' + (1 - k) + ')';
    ctx.fillRect(Math.round(r.x - cam) - 1, 0, 2, CU_SUELO);
  }
  let m = null;
  const bx = JF.x - cam + JF.golpeX;
  // estirón al aparecer o recibir golpe (squash & stretch)
  const sq = JF.pop * Math.sin(JF.pop * 9);
  ctx.save();
  ctx.translate(bx, JF.y);
  ctx.scale(1 - sq * 0.18, 1 + sq * 0.22);
  ctx.translate(-bx, -JF.y);
  if (JF.solK < 1) {
    ctx.globalAlpha = 1 - JF.solK;
    if (JF.forma == 'galaxia') m = cuGalaxia(bx, Math.round(JF.y), t, { face: JF.face, vis: JF.vis, mano: JF.mano, arco: JF.arco, flash: JF.flash > 0 });
    else m = cuManto(bx, Math.round(JF.y), t, { face: JF.face, vis: JF.vis, mano: JF.mano, arco: Math.max(JF.arco || 0, JF.cansado ? 0 : 0.15), flash: JF.flash > 0 });
    ctx.globalAlpha = 1;
    if (JF.vis > 0.3 && JF.solK < 0.5) cuLuzMano(m, t, JF.mano ? JF.mano.k : 0.2);
  }
  ctx.restore();
  // destello en la máscara antes de atacar
  if (JF.alerta > 0 && JF.vis > 0.5 && JF.solK < 0.5) {
    const mx = Math.round(bx + JF.face * (JF.forma == 'galaxia' ? 3 : 5)), my = Math.round(JF.y - (JF.forma == 'galaxia' ? 74 : CU_ALTO - 13)), r = Math.round(3 + (0.45 - JF.alerta) * 20);
    ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, JF.alerta * 3) + ')';
    ctx.fillRect(mx - r, my, r * 2 + 1, 1);
    ctx.fillRect(mx, my - r, 1, r * 2 + 1);
    ctx.fillRect(mx - 1, my - 1, 3, 3);
  }
  // estrellitas de mareo
  if (JF.mareo) {
    for (let i = 0; i < 4; i++) {
      const a = JF.t * 5 + i * 1.57, hx = bx + Math.cos(a) * 14, hy = JF.y - CU_ALTO - 6 + Math.sin(a) * 4;
      ctx.fillStyle = i % 2 ? '#ffd95a' : '#ffffff';
      ctx.fillRect(Math.round(hx) - 1, Math.round(hy), 3, 1);
      ctx.fillRect(Math.round(hx), Math.round(hy) - 1, 1, 3);
    }
  }
  if (JF.solK > 0) cuSol(Math.round(bx), Math.round(JF.y - 34), t, JF.solK);
  // anillos de la transformación
  if (JF.cine && JF.cine.k == 'transforma' && JF.cine.t < 1.4) {
    const s = JF.cine.t;
    for (let i = 0; i < 3; i++) {
      const r = 10 + s * 30 + i * 10;
      ctx.fillStyle = i % 2 ? CUC.arco : CUC.chispa;
      for (let a = 0; a < 6.283; a += 2 / r) ctx.fillRect(Math.round(bx + Math.cos(a + s * (i + 1)) * r), Math.round(JF.y - 34 + Math.sin(a + s * (i + 1)) * r * 0.5), 2, 1);
    }
  }
}
function cuAvisoColumnas(t) {
  for (const q of JF.pil.L) {
    if (JF.t < q.ta || JF.t >= q.tf) continue;
    const k = (JF.t - q.ta) / (q.tf - q.ta), on = Math.floor(JF.t * 10) % 2 == 0, x0 = Math.round(q.x0 - cam), w = Math.round(q.x1 - q.x0);
    ctx.fillStyle = cuOscuro() ? 'rgba(255,240,190,' + (0.1 + k * 0.25) + ')' : 'rgba(214,150,30,' + (0.05 + k * 0.15) + ')';
    ctx.fillRect(x0, 0, w, CU_SUELO);
    ctx.fillStyle = cuOscuro() ? '#ffe9a6' : '#c98a1a';
    ctx.fillRect(x0, 0, 1, CU_SUELO);
    ctx.fillRect(x0 + w - 1, 0, 1, CU_SUELO);
    if (on) for (let xx = x0 + 6; xx < x0 + w - 4; xx += 14) { ctx.fillRect(xx, CU_SUELO - 2, 6, 2); ctx.fillRect(xx + 2, CU_SUELO - 4, 2, 2); }
    const cx = x0 + Math.round(w / 2);
    ctx.fillRect(cx - 1, 50, 3, 10);
    ctx.fillRect(cx - 1, 62, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 2, Math.round(k * 40), 4, 4);
  }
}

/* ---------- lo que va delante de Smara ---------- */
function jfColumna(q, k, t) {
  const x0 = q.x0 - cam, w = q.x1 - q.x0, cx = x0 + w / 2, osc = cuOscuro();
  const abre = jfE.out(jfC(k / 0.1, 0, 1)), cierra = k > q.td - 0.2 ? jfC((q.td - k) / 0.2, 0, 1) : 1, a = abre * cierra;
  const ww = w * (0.35 + 0.65 * abre) * (0.6 + 0.4 * cierra), xl = Math.round(cx - ww / 2);
  ctx.save();
  ctx.globalCompositeOperation = osc ? 'lighter' : 'source-over';
  const g = ctx.createLinearGradient(xl - 18, 0, xl + ww + 18, 0), cE = osc ? '255,200,120' : '255,190,60';
  g.addColorStop(0, 'rgba(' + cE + ',0)');
  g.addColorStop(0.12, 'rgba(' + cE + ',' + 0.45 * a + ')');
  g.addColorStop(0.5, 'rgba(' + cE + ',' + 0.65 * a + ')');
  g.addColorStop(0.88, 'rgba(' + cE + ',' + 0.45 * a + ')');
  g.addColorStop(1, 'rgba(' + cE + ',0)');
  ctx.fillStyle = g;
  ctx.fillRect(xl - 18, 0, ww + 36, CU_SUELO);
  ctx.restore();
  ctx.globalAlpha = a;
  ctx.fillStyle = osc ? '#fff1c2' : '#ffd95a';
  ctx.fillRect(xl, 0, Math.round(ww), CU_SUELO);
  ctx.fillStyle = osc ? '#fffbe8' : '#fff1a8';
  ctx.fillRect(Math.round(cx - ww * 0.3), 0, Math.round(ww * 0.6), CU_SUELO);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(cx - ww * 0.12), 0, Math.max(2, Math.round(ww * 0.24)), CU_SUELO);
  ctx.fillStyle = osc ? 'rgba(255,190,90,.55)' : 'rgba(224,150,30,.5)';
  const R = jfRng(Math.round(q.x0) + 3);
  for (let i = 0; i < Math.round(ww / 9); i++) {
    const xx = Math.round(xl + 3 + R() * (ww - 6)), len = 20 + R() * 50, sp = 300 + R() * 300, yy = ((t * sp + R() * 400) % (CU_SUELO + len)) - len;
    ctx.fillRect(xx, Math.round(yy), 1, Math.round(len));
  }
  ctx.fillStyle = osc ? '#ffb347' : '#e09a1c';
  const R2 = jfRng(Math.floor(t * 30) + Math.round(q.x0));
  for (let yy = 0; yy < CU_SUELO; yy += 6) {
    ctx.fillRect(xl - 1 - Math.round(R2() * 4), yy, 2, 3);
    ctx.fillRect(Math.round(xl + ww) - 1 + Math.round(R2() * 4), yy + 3, 2, 3);
  }
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(xl - 10), CU_SUELO - 4, Math.round(ww + 20), 4);
  ctx.globalAlpha = 1;
}
function cuRayo(R, t) {
  const o = cuArco(), ox = o.x - cam, oy = o.y, cx = Math.cos(R.a), cy = Math.sin(R.a);
  const a = R.t < 0.06 ? R.t / 0.06 : R.t > 0.78 ? Math.max(0, (0.9 - R.t) / 0.12) : 1, L = 900;
  ctx.save();
  ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
  for (const [w, c] of [[16, 'rgba(63,216,255,' + 0.25 * a + ')'], [9, 'rgba(120,230,255,' + 0.55 * a + ')']]) {
    ctx.strokeStyle = c;
    ctx.lineWidth = w + Math.sin(t * 40) * 1.5;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + cx * L, oy + cy * L);
    ctx.stroke();
  }
  ctx.restore();
  // núcleo pixelado
  ctx.globalAlpha = a;
  ctx.fillStyle = '#e8fbff';
  for (let k = 0; k < L; k += 2) ctx.fillRect(Math.round(ox + cx * k) - 1, Math.round(oy + cy * k) - 1, 3, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(ox) - 5, Math.round(oy) - 5, 10, 10);
  ctx.globalAlpha = 1;
}
function jfDibujarFrente(t) {
  if (!JF.on) return;
  for (const q of JF.pil.L) { const k = JF.t - q.tf; if (k >= 0 && k <= q.td) jfColumna(q, k, t); }
  // línea de puntería mientras apunta
  const P = jfPaso();
  if (P.k == 'apunta' && JF.apuntaA != null && JF.vis > 0.5) {
    const o = cuArco();
    ctx.fillStyle = 'rgba(63,216,255,' + (Math.floor(t * 16) % 2 ? 0.75 : 0.3) + ')';
    for (let k = 10; k < 700; k += 6) ctx.fillRect(Math.round(o.x - cam + Math.cos(JF.apuntaA) * k), Math.round(o.y + Math.sin(JF.apuntaA) * k), 2, 1);
  }
  for (const R of JF.rayos) cuRayo(R, t);
  // meteoros
  for (const g of JF.gotas) {
    const x = Math.round(g.x - cam), k = jfC((JF.t - g.ts) / 0.7, 0, 1);
    if (JF.t >= g.ts && !g.ok) {
      ctx.fillStyle = 'rgba(63,216,255,' + (0.25 + k * 0.5) + ')';
      const ww = Math.round(4 + k * 12);
      ctx.fillRect(x - ww / 2, CU_SUELO - 1, ww, 2);
    }
    if (g.cae && !g.ok) {
      ctx.fillStyle = '#9fe4ff';
      ctx.fillRect(x - 1, Math.round(g.y) - 26, 2, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - 3, Math.round(g.y) - 6, 6, 6);
      ctx.fillRect(x - 1, Math.round(g.y) - 8, 2, 10);
    }
    if (g.ok) {
      const q = (JF.t - g.tImp) / 0.5;
      ctx.fillStyle = '#9fe4ff';
      ctx.globalAlpha = 1 - q;
      ctx.fillRect(x - Math.round(6 + q * 14), CU_SUELO - 2, Math.round(12 + q * 28), 2);
      ctx.globalAlpha = 1;
    }
  }
  // constelación
  if (JF.constel) {
    const C = JF.constel, s = JF.t - C.t0;
    for (let i = 0; i < C.N.length; i++) {
      if (s < i * 0.12) continue;
      const n = C.N[i], x = Math.round(n.x - cam), y = Math.round(n.y);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - 3, y, 7, 1);
      ctx.fillRect(x, y - 3, 1, 7);
      ctx.fillRect(x - 1, y - 1, 3, 3);
      if (i < C.N.length - 1 && s > (i + 1) * 0.12) {
        const b = C.N[i + 1];
        if (s < 1.1) {
          ctx.fillStyle = 'rgba(159,228,255,' + (Math.floor(s * 14) % 2 ? 0.8 : 0.3) + ')';
          jfLinea(x, y, b.x - cam, b.y);
        } else if (s < 1.6) {
          ctx.save();
          ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
          ctx.strokeStyle = 'rgba(159,228,255,.5)';
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(b.x - cam, b.y);
          ctx.stroke();
          ctx.restore();
          ctx.fillStyle = '#ffffff';
          jfLinea(x, y, b.x - cam, b.y);
          jfLinea(x, y + 1, b.x - cam, b.y + 1);
        }
      }
    }
  }
  // estrellas que persiguen
  for (const o of JF.orbes) {
    const x = Math.round(o.x - cam), y = Math.round(o.y);
    ctx.fillStyle = '#9fe4ff';
    ctx.fillRect(x - 4, y, 9, 1);
    ctx.fillRect(x, y - 4, 1, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 1, y - 1, 3, 3);
  }
  // el rayo devuelto (de Smara al Cuentero)
  if (JF.reflejo) {
    const r = JF.reflejo, a = 1 - r.t / 0.3;
    ctx.save();
    ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
    for (const [w, c] of [[14, 'rgba(255,217,90,' + 0.4 * a + ')'], [6, 'rgba(255,255,255,' + 0.9 * a + ')']]) {
      ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(r.x0 - cam, r.y0); ctx.lineTo(JF.x - cam, JF.y - 34); ctx.stroke();
    }
    ctx.restore();
  }
  // números y textos que flotan
  ctx.textAlign = 'center';
  for (const x of JF.textos) {
    const k = x.t / 0.9, sc = x.t < 0.1 ? 1 + (0.1 - x.t) * 6 : 1;
    ctx.globalAlpha = 1 - Math.max(0, (k - 0.6) / 0.4);
    ctx.font = Math.round((x.txt.length > 4 ? 8 : 9) * sc) + 'px ' + PS;
    ctx.fillStyle = '#05020a';
    ctx.fillText(x.txt, Math.round(x.x - cam) + 1, Math.round(x.y - k * 22) + 1);
    ctx.fillStyle = x.c;
    ctx.fillText(x.txt, Math.round(x.x - cam), Math.round(x.y - k * 22));
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  // anillos de choque
  for (const a of JF.anillos) {
    const k = a.t / a.d, r = jfL(a.r0, a.r1, jfE.out(k));
    ctx.globalAlpha = 1 - k;
    ctx.fillStyle = a.c;
    const paso = Math.max(0.05, 2 / Math.max(4, r));
    for (let q = 0; q < 6.283; q += paso) ctx.fillRect(Math.round(a.x - cam + Math.cos(q) * r), Math.round(a.y + Math.sin(q) * r * (a.redondo ? 1 : 0.3)), 2, 2);
    ctx.globalAlpha = 1;
  }
  // tormenta: aviso en el suelo y el rayo que cae
  for (const r of JF.relampagos) {
    const x = Math.round(r.x - cam);
    if (r.t < 0.7) {
      const on = Math.floor(r.t * 14) % 2;
      ctx.fillStyle = on ? '#9fe4ff' : '#3fd8ff';
      ctx.fillRect(x - 8, CU_SUELO - 2, 16, 2);
      ctx.fillRect(x - 1, CU_SUELO - 6, 2, 4);
      ctx.fillStyle = 'rgba(159,228,255,' + (0.15 + r.t * 0.4) + ')';
      for (let y = 0; y < CU_SUELO; y += 8) ctx.fillRect(x, y, 1, 4);
    } else if (r.t < 0.95) {
      const a = 1 - (r.t - 0.7) / 0.25, R = jfRng(r.s + Math.floor(r.t * 30));
      const pts = [[x + (R() - 0.5) * 30, 0]];
      for (let y = 30; y < CU_SUELO; y += 26) pts.push([x + (R() - 0.5) * 22, y]);
      pts.push([x, CU_SUELO]);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const [w, c] of [[9, 'rgba(63,216,255,' + 0.35 * a + ')'], [4, 'rgba(200,180,255,' + 0.7 * a + ')']]) {
        ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath();
        pts.forEach(([px_, py_], i) => (i ? ctx.lineTo(px_, py_) : ctx.moveTo(px_, py_)));
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < pts.length - 1; i++) jfLinea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
      ctx.fillRect(x - 10, CU_SUELO - 3, 20, 3);
      ctx.globalAlpha = 1;
    }
  }
  // mini pilares de luz
  for (const m of JF.minip) cuMiniPilar(m, t);
  // los cuatro arcos y sus flechas
  if (JF.arcos) for (const B of JF.arcos.B) cuArcoDorado(B, t);
  for (const f of JF.flechas) cuFlecha(f, t);
  // pasto del escenario del inicio, adelante
  // globos
  const L = cuCharlaLinea();
  if (L) {
    if (L[0] == 'SMARA') globo(p.x - cam, p.y - 70, 'SMARA', L[1], JF.cine.n, true);
    else cuGlobo(L[1], JF.cine.n, 1);
  } else if (JF.habla && (JF.vis > 0.3 || JF.solK > 0)) cuGlobo(JF.habla.txt, JF.habla.n, jfC(Math.min(JF.habla.t * 6, (JF.habla.dur - JF.habla.t) * 4), 0, 1));
}
function cuGlobo(txt, n, a) {
  ctx.font = '7px ' + PS;
  const pal = txt.split(' '), lin = [];
  let l = '';
  for (const w of pal) { if (ctx.measureText((l + ' ' + w).trim()).width > 236) { lin.push(l); l = w; } else l = (l + ' ' + w).trim(); }
  lin.push(l);
  const bw = Math.max(...lin.map(s => ctx.measureText(s).width), ctx.measureText('CUENTERO').width) + 20, bh = lin.length * 12 + 24;
  const hx = JF.x - cam, hy = JF.solK > 0.5 ? JF.y - 34 - 30 : JF.y - CU_ALTO - (JF.forma == 'galaxia' ? 22 : 8);
  const bx = Math.round(jfC(hx - bw / 2, 8, W - bw - 8)), abajo = hy - bh - 8 < 44, by = Math.round(abajo ? JF.y + (JF.solK > 0.5 ? -4 : 10) : hy - bh - 8);
  ctx.globalAlpha = jfC(a, 0, 1);
  ctx.fillStyle = CUC.oro;
  ctx.fillRect(bx, by - 2, bw, bh + 4);
  ctx.fillRect(bx - 2, by, bw + 4, bh);
  ctx.fillStyle = '#16203a';
  ctx.fillRect(bx, by, bw, bh);
  const cx = jfC(Math.round(hx), bx + 8, bx + bw - 8);
  if (!abajo) for (let k = 0; k < 5; k++) { ctx.fillStyle = CUC.oro; ctx.fillRect(cx - (5 - k) - 1, by + bh + k, (5 - k) * 2 + 2, 1); ctx.fillStyle = '#16203a'; ctx.fillRect(cx - (5 - k) + 1, by + bh + k - 1, Math.max(0, (5 - k) * 2 - 2), 1); }
  ctx.textAlign = 'left';
  ctx.fillStyle = CUC.arco;
  ctx.fillText('CUENTERO', bx + 10, by + 12);
  ctx.fillStyle = '#eef3ff';
  let left = n;
  lin.forEach((s, j) => {
    if (left <= 0) return;
    ctx.fillText(s.slice(0, left), bx + 10, by + 26 + j * 12);
    left -= s.length + 1;
  });
  ctx.globalAlpha = 1;
}

// golpes de Smara (también funcionan con el tiempo detenido)
function jfGolpesSmara() {
  const a = p.atk;
  if (a && a.hit && JF.ultAtk !== a) {
    JF.ultAtk = a;
    const hx = p.x + a.f * 42;
    if (golpeToca(a, JF.x - 18, JF.y - 72, JF.x + 18, JF.y + 4)) jfHerir(sdmg(a), a.c == 2 || a.c >= 3);
    for (const o of JF.orbes) if (o.vivo && Math.hypot(o.x - hx, o.y - pcy()) < 55) { o.vivo = false; cuChispas(o.x, o.y, 8); sfx('hit'); }
  }
}
// Q = detener el tiempo (2.5 s, recarga 10 s): el Cuentero y todos sus ataques se congelan
addEventListener('keydown', e => {
  if (e.code != 'KeyQ' || e.repeat || area != 7 || state != 'play') return;
  const now = performance.now() / 1000;
  if (TIEMPO.parado || now < TIEMPO.listo) { sfx('hurt'); return; }
  tiempoDetener();
  JF.relojFx = 0.4;
  for (let i = 0; i < 18; i++) { const a = (i / 18) * 6.283; pfx(p.x + Math.cos(a) * 8, pcy() + Math.sin(a) * 8, Math.cos(a) * 160, Math.sin(a) * 160, 0.4, i % 2 ? '#8ff6ff' : '#ffffff', 2, 0); }
});
function cuReloj() {
  // relojito arriba a la derecha (tecla Q)
  const now = performance.now() / 1000, cx = W - 24, cy = 58, Rr = 11;
  let frac, col;
  if (TIEMPO.parado) { frac = 1 - (now - TIEMPO.t0) / TIEMPO.dura; col = '#8ff6ff'; }
  else if (now < TIEMPO.listo) { frac = 1 - (TIEMPO.listo - now) / TIEMPO.recarga; col = '#5b6684'; }
  else { frac = 1; col = '#d6f2ff'; }
  const listo = !TIEMPO.parado && now >= TIEMPO.listo;
  if (listo) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(143,246,255,' + (0.12 + 0.08 * Math.sin(now * 4)) + ')'; ctx.fillRect(cx - 16, cy - 16, 32, 32); ctx.restore(); }
  ctx.fillStyle = '#10121c';
  for (let y = -Rr - 1; y <= Rr + 1; y++) { const r = Math.round(Math.sqrt(Math.max(0, (Rr + 1) ** 2 - y * y))); ctx.fillRect(cx - r, cy + y, r * 2 + 1, 1); }
  ctx.fillStyle = '#e8ecf4';
  for (let y = -Rr + 1; y <= Rr - 1; y++) { const r = Math.round(Math.sqrt(Math.max(0, (Rr - 1) ** 2 - y * y))); ctx.fillRect(cx - r, cy + y, r * 2 + 1, 1); }
  ctx.fillStyle = col;
  for (let y = -Rr + 2; y <= Rr - 2; y++) for (let x = -Rr + 2; x <= Rr - 2; x++) {
    if (x * x + y * y > (Rr - 2) ** 2) continue;
    if ((Math.atan2(x, -y) / (Math.PI * 2) + 1) % 1 <= frac) ctx.fillRect(cx + x, cy + y, 1, 1);
  }
  ctx.fillStyle = '#10121c';
  const ang = TIEMPO.parado ? (TIEMPO.t0 % 1) * 6.28 : now * 2;
  for (let k = 0; k < Rr - 3; k++) ctx.fillRect(Math.round(cx + Math.sin(ang) * k), Math.round(cy - Math.cos(ang) * k), 1, 1);
  ctx.fillRect(cx - 1, cy - Rr - 3, 3, 2);
  ctx.font = '6px ' + PS;
  ctx.textAlign = 'center';
  ctx.fillStyle = listo ? '#d6f2ff' : '#8a93ad';
  ctx.fillText(TIEMPO.parado ? (TIEMPO.dura - (now - TIEMPO.t0)).toFixed(1) : listo ? 'Q' : Math.ceil(TIEMPO.listo - now) + 's', cx, cy + Rr + 10);
  ctx.textAlign = 'left';
}
function cuTexto(txt, x, y, c) {
  JF.textos.push({ txt, x, y, c, t: 0 });
}
function cuParryFx(x, y, grande) {
  sfx('parry');
  jfTono(1800, 2600, 0.15, 'square', 0.05);
  HS = Math.max(HS, grande ? 0.16 : 0.09);
  SHK = Math.max(SHK, grande ? 8 : 4);
  JF.invFlash = grande ? 0.1 : 0.05;
  p.inv = Math.max(p.inv, 0.35);
  p.sta = Math.min(100, p.sta + 15);
  cuAnillo(x, y, 4, grande ? 60 : 34, '#ffffff', 0.3, true);
  cuAnillo(x, y, 2, grande ? 40 : 22, '#ffd95a', 0.25, true);
  for (let i = 0; i < (grande ? 26 : 14); i++) { const a = Math.random() * 6.283, v = rnd(80, 280); pfx(x, y, Math.cos(a) * v, Math.sin(a) * v, rnd(0.2, 0.5), i % 3 ? '#ffd95a' : '#ffffff', 2, 0); }
  cuTexto('¡PARRY!', p.x, p.y - 74, '#ffd95a');
}
function cuParryRayo(R) {
  // PARRY al rayo: se corta, el reflejo le pega al Cuentero y lo deja mareado
  R.parado = 1;
  R.t = Math.max(R.t, 0.78);
  cuParryFx(p.x, pcy(), true);
  JF.reflejo = { x0: p.x, y0: pcy(), t: 0 };
  const antes = jfPaso().k;
  JF.vis = 1;
  jfHerir(30, true);
  const k = jfPaso().k;
  if (!JF.cine && k == antes && k != 'centro' && k != 'despierta' && JF.hp > 0) { JF.rayos = []; jfPlan([{ k: 'aturdido' }, { k: 'rec', d: 0.3 }]); }
}
function cuAnillo(x, y, r0, r1, c, d, redondo) {
  JF.anillos.push({ x, y, r0, r1, c, d: d || 0.35, t: 0, redondo });
}
/* ---------- arcos dorados con electricidad ---------- */
function cuArcoPos(B) {
  const A = JF.arcos, k = jfE.out(jfC(A.t / 0.5, 0, 1)), r = 54 * k;
  const a = B.a + Math.sin(JF.t * 1.5 + B.a) * 0.08;
  return { x: JF.x + Math.cos(a) * r, y: JF.y - 34 + Math.sin(a) * r * 0.8 };
}
function cuArcoDorado(B, t) {
  const o0 = cuArcoPos(B), A = JF.arcos, k = jfE.out(jfC(A.t / 0.5, 0, 1));
  if (k <= 0.05) return;
  // gira al aparecer y retrocede al disparar
  const tg = Math.atan2(CU_SUELO - o0.y, p.x - o0.x), o = { x: o0.x - Math.cos(tg) * (B.retro || 0) * 7, y: o0.y - Math.sin(tg) * (B.retro || 0) * 7 };
  // apunta a Smara
  const tgt = tg, ang = A.t < 0.5 ? B.a + (tgt - B.a) * k + (1 - k) * 6.283 : tgt;
  const c = Math.cos(ang), s = Math.sin(ang), X = o.x - cam, Y = o.y;
  const P = (lx, ly, col, w) => { ctx.fillStyle = col; ctx.fillRect(Math.round(X + lx * c - ly * s) - 1, Math.round(Y + lx * s + ly * c) - 1, w || 2, w || 2); };
  const sc = (0.5 + 0.5 * k) * 1.45, tens = B.tens || 0;
  // brillo
  ctx.save();
  ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
  const g = ctx.createRadialGradient(X, Y, 0, X, Y, 22);
  g.addColorStop(0, 'rgba(200,180,255,' + (0.3 + tens * 0.4) + ')');
  g.addColorStop(1, 'rgba(160,200,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(X - 22, Y - 22, 44, 44);
  ctx.restore();
  // cuerda de electricidad (se tensa antes de disparar)
  const tipY = 13 * sc, pull = -2 - 8 * tens;
  ctx.fillStyle = Math.floor(t * 20) % 2 ? '#ffffff' : '#e8d6ff';
  for (const sg of [-1, 1]) for (let q = 0; q <= 1; q += 0.08) P(jfL(-2, pull, q) + (Math.random() - 0.5) * 1.2, jfL(sg * tipY, 0, q), Math.random() < 0.5 ? '#ffffff' : '#c9b8ff', 1);
  // flecha de luz puesta
  if (tens > 0) for (let q = pull; q < 16; q += 1) P(q, (Math.random() - 0.5) * 0.8, q > 9 ? '#ffffff' : '#9fe4ff', 1);
  // el arco dorado (curva hacia el frente, puntas recurvas)
  for (let q = -1; q <= 1.001; q += 0.07) {
    const lx = (4 - 6 * q * q) * sc, ly = 13 * q * sc;
    P(lx, ly, '#e8b04a');
    P(lx - 1, ly, '#a8761e', 1);
    if (Math.abs(q) < 0.6) P(lx + 1, ly, '#ffe9a6', 1);
  }
  P(-3 * sc, -14 * sc, '#e8b04a'); P(-3 * sc, 14 * sc, '#e8b04a');
  // empuñadura con vendas
  P(4 * sc, -2, '#3fc8c0'); P(4 * sc, 2, '#3fc8c0'); P(4 * sc, 0, '#2a2a3a');
  // chispas de electricidad alrededor
  const R = jfRng(Math.floor(t * 18) + Math.round(B.a * 100));
  ctx.fillStyle = '#e8d6ff';
  for (let i = 0; i < 3; i++) {
    let gx = X + (R() - 0.5) * 30, gy = Y + (R() - 0.5) * 30;
    for (let n = 0; n < 3; n++) { const nx = gx + (R() - 0.5) * 10, ny = gy + (R() - 0.5) * 10; jfLinea(gx, gy, nx, ny); gx = nx; gy = ny; }
  }
}
function cuFlecha(f, t) {
  const c = Math.cos(f.a), s = Math.sin(f.a), x = f.x - cam, y = f.y;
  ctx.save();
  ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
  ctx.strokeStyle = f.amiga ? 'rgba(255,217,90,.7)' : 'rgba(159,228,255,.5)';
  ctx.lineWidth = f.amiga ? 7 : 5;
  ctx.beginPath(); ctx.moveTo(x - c * 22, y - s * 22); ctx.lineTo(x, y); ctx.stroke();
  ctx.restore();
  // cuerpo en zigzag (rayo) y punta
  ctx.fillStyle = '#ffffff';
  let px_ = x - c * 20, py_ = y - s * 20;
  for (let i = 1; i <= 4; i++) {
    const k = i / 4, j = (i % 2 ? 1 : -1) * 2 * (i < 4 ? 1 : 0);
    const nx = x - c * 20 * (1 - k) - s * j, ny = y - s * 20 * (1 - k) + c * j;
    jfLinea(px_, py_, nx, ny); px_ = nx; py_ = ny;
  }
  ctx.fillStyle = f.amiga ? '#ffffff' : '#e8b04a';
  ctx.fillRect(Math.round(x) - 2, Math.round(y) - 2, 4, 4);
  ctx.fillStyle = f.amiga ? '#ffd95a' : '#ffffff';
  ctx.fillRect(Math.round(x + c * 2) - 1, Math.round(y + s * 2) - 1, 2, 2);
  if (f.amiga) { ctx.fillStyle = 'rgba(255,217,90,.6)'; for (let k = 4; k < 30; k += 3) ctx.fillRect(Math.round(x - c * k), Math.round(y - s * k), 2, 2); }
}
function cuMiniPilar(m, t) {
  const k = m.t / 0.65, a = m.t < 0.08 ? m.t / 0.08 : 1 - Math.max(0, (m.t - 0.45) / 0.2), x = m.x - cam, h = 110, w = 22 * (0.5 + 0.5 * Math.min(1, m.t / 0.08));
  ctx.save();
  ctx.globalCompositeOperation = cuOscuro() ? 'lighter' : 'source-over';
  const g = ctx.createLinearGradient(0, CU_SUELO - h, 0, CU_SUELO);
  g.addColorStop(0, 'rgba(255,214,90,0)');
  g.addColorStop(0.4, 'rgba(255,214,90,' + 0.6 * a + ')');
  g.addColorStop(1, 'rgba(255,240,180,' + 0.9 * a + ')');
  ctx.fillStyle = g;
  ctx.fillRect(Math.round(x - w / 2 - 4), CU_SUELO - h, Math.round(w + 8), h);
  ctx.restore();
  ctx.globalAlpha = Math.max(0, a);
  ctx.fillStyle = cuOscuro() ? '#fff1c2' : '#ffd95a';
  ctx.fillRect(Math.round(x - w / 2), CU_SUELO - Math.round(h * 0.8), Math.round(w), Math.round(h * 0.8));
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(x - w * 0.15), CU_SUELO - Math.round(h * 0.9), Math.max(2, Math.round(w * 0.3)), Math.round(h * 0.9));
  ctx.fillRect(Math.round(x - w), CU_SUELO - 3, Math.round(w * 2), 3);
  ctx.globalAlpha = 1;
}

function jfEncima(t) {
  if (!JF.on) return;
  ctx.textAlign = 'left';
  const C = JF.cine, enIntro = C && C.k == 'intro';
  if (!enIntro) {
    const bx = W / 2 - 130, by = H - 26, bw = 260, sh = JF.flash > 0 ? Math.round((Math.random() - 0.5) * 3) : 0;
    ctx.fillStyle = '#05020a';
    ctx.fillRect(bx - 2 + sh, by - 2, bw + 4, 12);
    ctx.fillStyle = '#3a3046';
    ctx.fillRect(bx + sh, by, bw, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx + sh, by, Math.round(bw * Math.max(0, JF.hpVista) / JF.max), 8);
    ctx.fillStyle = JF.fase == 1 ? '#2f7fe0' : '#8c32b4';
    ctx.fillRect(bx + sh, by, Math.round(bw * Math.max(0, JF.hp) / JF.max), 8);
    ctx.fillStyle = 'rgba(255,255,255,.25)';
    ctx.fillRect(bx + sh, by, Math.round(bw * Math.max(0, JF.hp) / JF.max), 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(W / 2 + sh, by - 1, 1, 10);
    ctx.font = '7px ' + PS;
    ctx.fillStyle = '#05020a';
    ctx.fillText('EL CUENTERO', bx + 4 + sh, by - 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('EL CUENTERO', bx + 3 + sh, by - 5);
  }
  if (enIntro) {
    const k = jfC(C.t / 0.6, 0, 1) * (C.sube ? jfC(1 - (C.sube - 2.6) / 0.6, 0, 1) : 1);
    ctx.fillStyle = '#0c0a0e';
    ctx.fillRect(0, 0, W, Math.round(28 * k));
    ctx.fillRect(0, H - Math.round(28 * k), W, Math.round(28 * k));
    if (cuCharlaLinea()) {
      ctx.fillStyle = '#7d756c';
      ctx.font = '6px ' + PS;
      ctx.textAlign = 'right';
      ctx.fillText('E / ENTER: SIGUIENTE', W - 10, H - 10);
      ctx.textAlign = 'left';
    }
  }
  // carteles con el nombre
  let cart = null;
  if (enIntro && C.sube > 0.8) cart = [C.sube - 0.8, 'EL CUENTERO', 'el que cuenta a Mulukukú como chiste', '#2f7fe0'];
  if (C && C.k == 'transforma' && C.t > 3.6) cart = [C.t - 3.6, 'EL CUENTERO', 'forma estelar', '#b44cc0'];
  if (cart) {
    const [s, a1, a2, col] = cart, a = jfC(Math.min(s / 0.4, (2.4 - s) / 0.5), 0, 1);
    ctx.globalAlpha = a;
    ctx.textAlign = 'center';
    ctx.font = '22px ' + PS;
    ctx.fillStyle = cuOscuro() ? '#000000' : '#2c2621';
    ctx.fillText(a1, W / 2 + 2, 122);
    ctx.fillStyle = col;
    ctx.fillText(a1, W / 2, 120);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = cuOscuro() ? '#cfe8ff' : '#5a524b';
    ctx.fillText(a2, W / 2, 144);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
  if (!(JF.cine && JF.cine.k == 'intro')) { tiempoOnda(); cuReloj(); }
  if (TIEMPO.parado) {
    // texto grande
    const s = performance.now() / 1000 - TIEMPO.t0;
    if (s < 0.8) {
      ctx.globalAlpha = 1 - s / 0.8;
      ctx.textAlign = 'center';
      ctx.font = Math.round(18 + s * 10) + 'px ' + PS;
      ctx.fillStyle = '#05030a';
      ctx.fillText('¡ALTO!', W / 2 + 2, 112);
      ctx.fillStyle = '#8ff6ff';
      ctx.fillText('¡ALTO!', W / 2, 110);
      ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
    }
  }
  if (p.hp < 30 && state == 'play') {
    const a = (0.25 + 0.15 * Math.sin(performance.now() / 160)) * (1 - p.hp / 30);
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.62);
    g.addColorStop(0, 'rgba(200,0,30,0)');
    g.addColorStop(1, 'rgba(200,0,30,' + a.toFixed(3) + ')');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  if (JF.invFlash > 0) { ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  if (JF.velo > 0) { ctx.fillStyle = 'rgba(255,255,255,' + JF.velo + ')'; ctx.fillRect(0, 0, W, H); }
  if (JF.blanco > 0) { ctx.fillStyle = 'rgba(255,255,255,' + JF.blanco + ')'; ctx.fillRect(0, 0, W, H); }
  if (JF.iris && JF.iris.r > 0.5) {
    const I = JF.iris, r = I.r, cx = I.x - cam;
    ctx.fillStyle = '#ffffff';
    for (let y = Math.max(0, Math.floor(I.y - r)); y < Math.min(H, I.y + r); y += 3) {
      const dy = y + 1.5 - I.y, hw = Math.sqrt(Math.max(0, r * r - dy * dy));
      ctx.fillRect(Math.round((cx - hw) / 3) * 3, y, Math.round((hw * 2) / 3) * 3, 3);
    }
    const COL = ['#3fd8ff', '#7a4cff', '#c44cff', '#ffffff', '#2fd0c8', '#d9a43a'];
    for (let a = 0; a < 6.283; a += 0.04) {
      ctx.fillStyle = COL[Math.floor(a * 3 + t * 12) % 6];
      ctx.fillRect(Math.round((cx + Math.cos(a) * r) / 3) * 3, Math.round((I.y + Math.sin(a) * r) / 3) * 3, 3, 3);
    }
  }
  if (C && C.k == 'muere' && C.t > 6.4) {
    const a = jfC((C.t - 6.4) / 1, 0, 1);
    ctx.globalAlpha = a;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2c2621';
    ctx.font = '12px ' + PS;
    ctx.fillText('SE ACABÓ EL CUENTO', W / 2, H / 2 - 10);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
}

/* =====================================================================
   CONEXIÓN CON EL JUEGO (envoltorios)
   ===================================================================== */
const loadAreaJF = loadArea;
loadArea = function (n) {
  loadAreaJF(n);
  if (n != 7) {
    JF.on = false;
    return;
  }
  LEVEL = W;
  GROUND = CU_SUELO;
  platforms = [];
  enemies = [];
  pick = [];
  CHESTS = [];
  NPCS = [];
  STRUCTS = [];
  GEMS = [];
  p.x = 170;
  p.y = GROUND;
  p.vy = 0;
  p.vx = 0;
  p.on = true;
  p.face = 1;
  cam = 0;
  ambient('');
  jfReset();
  state = 'jfcine';
};
const updEnemiesJF = updEnemies;
updEnemies = function (dt) {
  updEnemiesJF(dt);
  if (area != 7) return;
  if (TIEMPO.parado) jfGolpesSmara(); // con el tiempo detenido solo Smara se mueve
  else jfTick(dt);
};
const drawPlatJF = drawPlat;
drawPlat = function () {
  if (area == 7) {
    jfFondo(performance.now() / 1000);
    // tormenta: los colores del fondo se invierten
    if (JF.inv > 0) { ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = 'rgba(255,255,255,' + JF.inv + ')'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    return;
  }
  drawPlatJF();
};
const drawEnemiesJF = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesJF(t);
  if (area == 7) {
    jfDibujarJefe(t);
    tiempoVelo(); // el fondo y el jefe se vuelven grises (Smara no)
  }
};
const drawPFXJF = drawPFX;
drawPFX = function () {
  drawPFXJF();
  if (area == 7) {
    if (TIEMPO.parado) ctx.filter = 'grayscale(1) brightness(.85)';
    jfDibujarFrente(performance.now() / 1000);
    ctx.filter = 'none';
  }
};
const drawZCJF = drawZC;
drawZC = function () {
  if (area == 7) jfEncima(performance.now() / 1000);
  drawZCJF();
};
const nearestFoeXJF = nearestFoeX;
nearestFoeX = function () {
  if (area == 7 && JF.on) return JF.srcX != null ? JF.srcX : JF.x;
  return nearestFoeXJF();
};
let jfUlt = performance.now();
const drawJF = draw;
draw = function () {
  const now = performance.now(),
    dt = Math.min(0.033, (now - jfUlt) / 1000);
  jfUlt = now;
  if (state == 'jfcine' && area == 7) {
    jfCineTick(dt);
    jfTick(dt);
  }
  drawJF();
};

/* ---------- 40b-epilogo.js ---------- */
/* =====================================================================
   EPÍLOGO: EL REMATE DEL "BLANCO"
   Después de vencer al Cuentero (40-jefe-cuentero.js):
   · Todo queda en blanco, como una hoja. Llega el Cadejo caminando.
   · Se responde la pregunta de la noche ("¿y si el malo es el blanco?"):
     el blanco no miente, se queda callado; el que llena el silencio es el
     que cuenta. El Errante tampoco era bueno ni malo.
   · Smara decide conocer el Mulukukú de verdad. El blanco se llena de
     color (amanece) y se van caminando juntos.
   · Cartel final y vuelta al menú.
   E / ESPACIO / J / clic: pasar el texto.
   ===================================================================== */
ZN[7] = ['EL BLANCO', 'donde vive el que cuenta'];
const EPI_FRASES = [
  ['c', '¿Ya ves? Te dije que el malo era el blanco.'],
  ['s', '¿Era el blanco... o lo que yo le metí adentro?'],
  ['c', 'Las dos cosas. El blanco no miente: solo se queda callado. El que llena el silencio es el que cuenta.'],
  ['s', '¿Y el Errante? ¿También era parte del cuento?'],
  ['c', 'Te trajo hasta aquí con palabras bonitas, para que encontraras al Cuentero vos sola. Eso no lo hace malo... pero tampoco bueno.'],
  ['c', 'Ni negro ni blanco, niña. Así es la gente. Así es Mulukukú.'],
  ['s', 'Entonces quiero conocerlo de verdad. No el de los chistes.'],
  ['c', 'Ahí sí te acompaño. ...Guau.'],
];
const EPI = { on: false };
function epiEmpezar() {
  EPI.on = true;
  EPI.t = 0;
  EPI.i = -1;
  EPI.vis = 0;
  EPI.s = 0;
  EPI.fase = 'llega'; // llega · charla · amanece · fin
  EPI.cx = W + 60; // el Cadejo entra por la derecha
  EPI.sx = 230;
  EPI.k = 0;
  state = 'epilogo';
  JF.on = false;
  sfx('page');
}
function epiSiguiente() {
  if (EPI.fase == 'fin') {
    if (EPI.k > 2.5) { EPI.on = false; enterMenu(); }
    return;
  }
  if (EPI.fase != 'charla' || EPI.i < 0) return;
  const L = EPI_FRASES[EPI.i][1];
  if (EPI.vis < L.length) { EPI.vis = L.length; return; }
  EPI.i++;
  EPI.vis = 0;
  EPI.s = 0;
  sfx('page');
  if (EPI.i >= EPI_FRASES.length) { EPI.i = EPI_FRASES.length - 1; EPI.fase = 'amanece'; EPI.k = 0; }
}
function epiTick(dt) {
  EPI.t += dt;
  p.t = (p.t || 0) + dt;
  if (EPI.fase == 'llega') {
    EPI.cx = Math.max(470, EPI.cx - dt * 220);
    if (EPI.cx <= 470 && EPI.t > 2.2) { EPI.fase = 'charla'; EPI.i = 0; }
  } else if (EPI.fase == 'charla') {
    const [q, L] = EPI_FRASES[EPI.i];
    EPI.s += dt;
    const n0 = Math.floor(EPI.vis);
    EPI.vis = Math.min(L.length, EPI.vis + dt * 30);
    if (Math.floor(EPI.vis) > n0 && Math.floor(EPI.vis) % 2 == 0 && L[Math.floor(EPI.vis) - 1] != ' ') q == 'c' ? cdSnd.voz() : blip(880 + Math.random() * 120);
    if (EPI.vis >= L.length && EPI.s > L.length / 30 + 3.4) epiSiguiente();
  } else if (EPI.fase == 'amanece') {
    EPI.k += dt;
    // caminan juntos hacia la derecha mientras el blanco se llena de color
    // primero el Cadejo se pone al lado de Smara, después caminan juntos
    if (EPI.k <= 1.5) EPI.cx += (EPI.sx + 64 - EPI.cx) * Math.min(1, dt * 3);
    else { EPI.sx += dt * 60; EPI.cx = EPI.sx + 64; }
    if (EPI.k > 9) { EPI.fase = 'fin'; EPI.k = 0; sfx('boom'); }
  } else if (EPI.fase == 'fin') EPI.k += dt;
}
function epiDibujar(t) {
  const k = EPI.fase == 'amanece' ? Math.min(1, EPI.k / 5) : EPI.fase == 'fin' ? 1 : 0;
  const G = 300;
  // la hoja en blanco
  ctx.fillStyle = '#f3f1ea';
  ctx.fillRect(0, 0, W, H);
  // amanecer que sube desde abajo
  if (k > 0) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#2b3a6b');
    g.addColorStop(0.45, '#e98a6a');
    g.addColorStop(0.62, '#ffd59a');
    g.addColorStop(1, '#ffe9c0');
    ctx.globalAlpha = k;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // el sol saliendo detrás de las lomas
    ctx.fillStyle = '#fff3c8';
    ctx.beginPath(); ctx.arc(W * 0.66, G - 40 + (1 - k) * 60, 34, 0, 7); ctx.fill();
    // lomas verdes, el río Tuma y la orilla
    ctx.fillStyle = '#3b6a4a';
    for (let x = 0; x < W; x += 2) { const y = G - 30 - 16 * Math.sin(x * 0.012) - 8 * Math.sin(x * 0.031 + 1); ctx.fillRect(x, y, 2, H - y); }
    ctx.fillStyle = '#2d5a3a';
    ctx.fillRect(0, G, W, H - G);
    ctx.fillStyle = '#5aa0c8';
    ctx.fillRect(0, G + 30, W, 40);
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    for (let i = 0; i < 18; i++) ctx.fillRect(Math.round((i * 53 + t * 20) % W), G + 36 + (i * 7) % 30, 10, 1);
    ctx.globalAlpha = 1;
  }
  // horizonte de tinta (el blanco)
  if (k < 1) {
    ctx.globalAlpha = 1 - k;
    ctx.fillStyle = '#141418';
    for (let r = 0; r < 6; r++) for (let i = 0; i < 24; i++) ctx.fillRect(Math.round(((i * 97 + r * 53) % W + t * (6 + r * 4)) % W), G + r * 6, 1 + (i % 3), 1);
    ctx.fillRect(0, G, W, 1);
    ctx.globalAlpha = 1;
  }
  // Smara
  const x0 = p.x, y0 = p.y, cam0 = cam, vx0 = p.vx, on0 = p.on, f0 = p.face, at0 = p.atk;
  cam = 0; p.x = EPI.sx; p.y = G; p.on = true; p.atk = null;
  p.vx = EPI.fase == 'amanece' && EPI.k > 1.5 ? 60 : 0;
  p.face = EPI.fase == 'amanece' && EPI.k > 1.5 ? 1 : 1;
  drawPShadow();
  drawPlayer();
  p.x = x0; p.y = y0; cam = cam0; p.vx = vx0; p.on = on0; p.face = f0; p.atk = at0;
  // el Cadejo
  if (img.cdj) {
    const camina = EPI.fase == 'llega' && EPI.cx > 470;
    const habla = EPI.fase == 'charla' && EPI_FRASES[EPI.i][0] == 'c' && EPI.vis < EPI_FRASES[EPI.i][1].length;
    const anda = EPI.fase == 'amanece';
    let fr = 0;
    if (camina || anda) fr = Math.floor(t * 12) % 6;
    else if (habla) { const b = Math.abs(Math.sin(EPI.s * 14)); fr = b > 0.7 ? 8 : b > 0.35 ? 7 : 6; }
    const sc = 2, x = Math.round(EPI.cx);
    ctx.save();
    ctx.translate(x, G);
    if (anda && EPI.k > 1.5) ctx.scale(-1, 1); // al irse mira hacia adelante, como Smara
    ctx.drawImage(img.cdj, fr * 48, 0, 48, 43, -24 * sc, -43 * sc + (camina || anda ? 0 : Math.round(Math.sin(t * 3))), 48 * sc, 43 * sc);
    ctx.restore();
  }
  // globos de texto
  if (EPI.fase == 'charla' && EPI.i >= 0) {
    const [q, L] = EPI_FRASES[EPI.i];
    if (q == 'c') globo(EPI.cx - 26, G - 66, 'EL CADEJO', L, Math.floor(EPI.vis), false);
    else globo(EPI.sx, G - 76, 'SMARA', L, Math.floor(EPI.vis), true);
    ctx.font = '6px ' + PS;
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(20,20,24,.55)';
    ctx.fillText('E / ESPACIO', W - 10, H - 10);
    ctx.textAlign = 'left';
  }
  if (EPI.fase == 'amanece' && EPI.k > 2.5) {
    ctx.globalAlpha = Math.min(1, (EPI.k - 2.5) / 1.5) * Math.min(1, (9 - EPI.k) / 1.2);
    ctx.textAlign = 'center';
    ctx.font = '14px ' + PS;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('AMANECE EN MULUKUKÚ', W / 2, 90);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
  // cartel final
  if (EPI.fase == 'fin') {
    ctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, EPI.k / 1.2) + ')';
    ctx.fillRect(0, 0, W, H);
    const a = Math.min(1, Math.max(0, (EPI.k - 1) / 1.2));
    ctx.globalAlpha = a;
    ctx.textAlign = 'center';
    ctx.font = '22px ' + PS;
    ctx.fillStyle = '#f4fff0';
    ctx.fillText('FIN', W / 2, H / 2 - 30);
    ctx.font = '8px ' + PS;
    ctx.fillStyle = '#c9d0e6';
    ctx.fillText('El Mulukukú de verdad queda fuera de la pantalla.', W / 2, H / 2 + 6);
    ctx.fillText('Andá a conocerlo.', W / 2, H / 2 + 22);
    ctx.font = '7px ' + PS;
    ctx.fillStyle = '#7d86a6';
    ctx.fillText('Gracias por jugar ASAGMBA', W / 2, H / 2 + 56);
    if (EPI.k > 2.5 && Math.floor(t * 2) % 2) ctx.fillText('apretá E para volver al menú', W / 2, H / 2 + 76);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }
}
addEventListener(
  'keydown',
  e => {
    if (state != 'epilogo') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!e.repeat && ['KeyE', 'Space', 'Enter', 'KeyJ', 'KeyK'].includes(e.code)) epiSiguiente();
  },
  true,
);
cv.addEventListener('mousedown', () => { if (state == 'epilogo') epiSiguiente(); });
const zmWantEPI = zmWant;
zmWant = function () {
  if (state == 'epilogo') return EPI.fase == 'charla' || EPI.fase == 'llega' ? 'white' : 'room';
  return zmWantEPI();
};
let epiUlt = performance.now();
const drawEPI = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.05, (now - epiUlt) / 1000);
  epiUlt = now;
  if (state == 'epilogo') {
    epiTick(dt);
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.imageSmoothingEnabled = false;
    epiDibujar(now / 1000);
    return;
  }
  drawEPI();
};

/* ---------- 41-llano-en-desarrollo.js ---------- */
/* =====================================================================
   EL LLANO DE LOS SUSURROS: EN DESARROLLO
   La zona que sigue al Bosque de la Niebla (después del pilar) queda
   solo con el paisaje: sin Espantos, sin bestias, sin murciélagos ni
   fantasmas, y sin el Cadejo. Al entrar sale un anuncio de que la zona
   está en desarrollo; después queda una etiqueta chiquita en la esquina,
   y al llegar al final del camino se vuelve a avisar.
   Para volver a activar todo: poner LLANO_EN_DESARROLLO en false.
   ===================================================================== */
const LLANO_EN_DESARROLLO = true;
const LDEV = { t: 0, fin: 0 };
function llanoVaciar() {
  LL.ola = 99; // no aparece ningún Espanto
  CD.ola = 99; // ni bestias
  CD.mons = [];
  LL.esp = [];
  LL.lanzas = [];
  enemies = [];
  CD.perro = null;
}
if (LLANO_EN_DESARROLLO) {
  CD_X.susto = 1e9; // el Cadejo no aparece
  OLAS_EXTRA[9] = []; // ni murciélagos ni fantasmas
  const loadAreaLDEV = loadArea;
  loadArea = function (n) {
    loadAreaLDEV(n);
    if (n == 9) { llanoVaciar(); LDEV.t = 0; LDEV.fin = 0; }
  };
  const updEnemiesLDEV = updEnemies;
  updEnemies = function (dt) {
    if (area == 9) llanoVaciar();
    updEnemiesLDEV(dt);
  };
  let ldevUlt = performance.now();
  const drawLDEV = draw;
  draw = function () {
    const now = performance.now(), dt = Math.min(0.05, (now - ldevUlt) / 1000);
    ldevUlt = now;
    drawLDEV();
    if (area != 9 || state != 'play') return;
    LDEV.t += dt;
    if (p.x > LEVEL - 260) LDEV.fin += dt; else LDEV.fin = 0;
    ctx.save();
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    // anuncio grande: al entrar (después del cartel de la zona) y al llegar al final del camino
    const tg = LDEV.t - 3, a = tg > 0 && tg < 6.5 ? Math.min(1, tg / 0.5, (6.5 - tg) / 0.6) : LDEV.fin > 0.3 ? Math.min(1, (LDEV.fin - 0.3) / 0.5) : 0;
    if (a > 0) {
      const w = 420, h = 74, x = W / 2 - w / 2, y = 150;
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ffd25a';
      ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
      ctx.fillStyle = '#14101e';
      ctx.fillRect(x, y, w, h);
      // franjas de "obra" arriba y abajo
      for (let i = 0; i < w - 8; i += 16) { ctx.fillStyle = (i / 16) % 2 ? '#14101e' : '#ffd25a'; ctx.fillRect(x + i, y, 8, 4); ctx.fillRect(x + i + 8, y + h - 4, 8, 4); }
      ctx.textAlign = 'center';
      ctx.font = '12px ' + PS;
      ctx.fillStyle = '#ffd25a';
      ctx.fillText('EN DESARROLLO', W / 2, y + 28);
      ctx.font = '7px ' + PS;
      ctx.fillStyle = '#e8ecf6';
      ctx.fillText(LDEV.fin > 0.3 ? 'Hasta aquí llega el camino por ahora.' : 'Esta zona todavía se está construyendo.', W / 2, y + 46);
      ctx.fillText(LDEV.fin > 0.3 ? 'Volvé pronto: aquí sigue la historia.' : 'Por ahora podés recorrer el paisaje.', W / 2, y + 60);
      ctx.textAlign = 'left';
    }
    // etiqueta chiquita en la esquina
    ctx.globalAlpha = 0.85;
    ctx.font = '7px ' + PS;
    const tx = 'EN DESARROLLO', tw = ctx.measureText(tx).width + 14;
    ctx.fillStyle = '#ffd25a';
    ctx.fillRect(W - tw - 8, H - 24, tw, 14);
    ctx.fillStyle = '#14101e';
    ctx.fillText(tx, W - tw - 1, H - 14);
    ctx.restore();
  };
}

/* ---------- 42-flamerita.js ---------- */
/* =====================================================================
   FLAMERITA (easter egg en el Llano, la zona en desarrollo)
   Un gatito sentado en el pasto, homenaje a Flamera, streamer nica de
   Jinotepe que hace directos jugando (TikTok y Twitch) y cuya comunidad
   se llama "Flamera Army".
   · Al acercarte: "E para interactuar con Flamerita".
   · Con E: "¡Miau! ¡Qué nota, mae!" (corazones y maullido) y después
     aparece una CARTA ESPECIAL con el gatito. E / ESPACIO la cierra.
   ===================================================================== */
const FLAM = { x: 980, t: 0, habla: 0, carta: 0, tiene: false };
const FLAM_IMG = new Image();
FLAM_IMG.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAD10lEQVR4nI2UfWjVZRTHP+f5/e7u3WbbvHfOq5MSg9jb7U4hKOyPtPpHTVzNlrI2KSTBfyJ68SV7AQ0CqUQkUDNLpVSskEiCClYIrb/CNUULMpgzX6bu6u7d7u/3PKc/du9VY74ceOBwnsP3fJ9zvs9BVVFVnCpLW+pU7SjZQkxVC35AW7pOwxvitzslZ2kqobk9b2tnc6WqBjckBSxvqdSL+9br0lRC7wbUULCoy3PhTJyt6zbQkUqqAg7l2XStvv/ma/gSY8u6VSxLxTXk9uYXnZzvqF/wILs2ruDJxiq6WioV4LM1a7FBhIuDFcRnmFsjTQQasTF2bnyRRStfIXH2Cs8tASvgrGFS68NMShsyfT0IIXIH0FJpUXhqSReJwQxDyTqsQFYsWbEM9v2COndXLAHMKAAB1jh8DRmeOoVksoFcfBqeWgIPDAEj/T0YHIrPnZpgYjiWpybrlrWrqevaRu30JowaklNn8vh7vaXELBbPwe43VtORrtHbgo4LwIBYGptbUVEQRz4SpdyOYQVC8alAQCyBibB9zas831KlIQEKPDOnXNtnV6otthKMnjuyk2t91yhzyowFTQz0/8qMhkdQv4x/vvsDz0H9wmYunzmOGx5m9abN7D82IBClfU65HvrkRyBCx4rH+PL3a+KrWhERPff9FhLTHuL0iR5mNs7l9Mle7muay9TFKWL5gDP/nuSvr44yf8cBwjAjQrTAy4H64GX4/IsjdLQmVFTH2yN+hV789gOqp7fgS4jDYHA44Oetu/A0YOYTDdSFo8Q6P0I1JwB5oDsd1R2vb6A8/SjlqXnXdaphVkREKati6PBbxKfP5vzgnwA8MP9+jDoqrLD38B62ddxLRETzquIB4iLkEzXYY72E3CD+EvhvX+MkCmrHlUDAeQkIL11gRCwLl6ykXMt4ef86RMenApCNOLza+Pj0S2CF+8ETRznX/0NBGgoaIbw0hKhB1ACOg9/s4OP2WYhXrWOAoBhXRtTl0P8zdU6lvbVWD+47BKUPZDDxKTB0gXucx1XjWNjWXZDYbmokqsN71xIEY1QvfgdVlevftCQw+PTdbiBPzosCluS0FKd++htrQoqLbUwtbU+/QCiWgCiRK+fB5W9+ftEO9mVYsHIN2ze9RFRHChXHG5cxtpRXqR6eQnuqCmeUis7NOJuRCUGLAKsODHB54BTgWL5sEa3zZpGsrwVxqDiuiuBrQMyOMblrPerGRMSDiaZfGpwRrIA1EBoYjddTWd2A5o5TF7NkB84yqetDbHBFdmvkZl5F8d9MVm65MAQwYlABa+2Eq/U/xqfyjveZjNwAAAAASUVORK5CYII=';
const FLAM_FRASE = '¡Miau! ¡Qué nota, mae!';
function flamCerca() {
  return area == 9 && state == 'play' && Math.abs(p.x - FLAM.x) < 56 && p.y > GROUND - 30;
}
function flamMaullido() {
  if (!AC || muted) return;
  const t = AC.currentTime, o = AC.createOscillator(), f = AC.createBiquadFilter(), g = AC.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(620, t);
  o.frequency.linearRampToValueAtTime(980, t + 0.16);
  o.frequency.linearRampToValueAtTime(560, t + 0.5);
  f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 2.5;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.12, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
  o.connect(f); f.connect(g); g.connect(MG);
  o.start(t); o.stop(t + 0.6);
}
function flamInteractuar() {
  FLAM.habla = 0.001;
  flamMaullido();
  for (let i = 0; i < 8; i++) pfx(FLAM.x + rnd(-10, 10), GROUND - 30, rnd(-40, 40), rnd(-90, -40), rnd(0.6, 1), i % 2 ? '#ff7aa8' : '#ffd0e0', 2, -20);
}
function flamTick(dt) {
  FLAM.t += dt;
  if (FLAM.habla) {
    FLAM.habla += dt;
    // después de decir la frase, aparece la carta (la primera vez)
    if (FLAM.habla > 2.4 && !FLAM.tiene) { FLAM.tiene = true; FLAM.carta = 0.001; state = 'flcarta'; sfx('pick'); }
    if (FLAM.habla > 3.2) FLAM.habla = 0;
  }
}
function flamDibujar(t) {
  if (area != 9 || !FLAM_IMG.complete) return;
  const x = Math.round(FLAM.x - cam), e = 2, w = FLAM_IMG.width * e, h = FLAM_IMG.height * e;
  if (x < -60 || x > W + 60) return;
  const resp = Math.floor(t * 1.6) % 2; // respira
  const salto = FLAM.habla && FLAM.habla < 0.4 ? Math.round(Math.sin((FLAM.habla / 0.4) * Math.PI) * 8) : 0;
  ctx.fillStyle = 'rgba(10,4,16,.4)';
  ctx.fillRect(x - 14, GROUND - 1, 30, 3);
  ctx.drawImage(FLAM_IMG, x - w / 2, GROUND - h + resp - salto, w, h - resp);
  // aviso para interactuar
  if (flamCerca() && !FLAM.habla) {
    const b = Math.round(Math.sin(t * 6) * 1.5), txt = 'E para interactuar con Flamerita';
    ctx.font = '7px ' + PS;
    const tw = ctx.measureText(txt).width + 14, ty = GROUND - h - 18 + b;
    ctx.fillStyle = '#1a1424';
    ctx.fillRect(Math.round(x - tw / 2) - 1, ty - 11, tw + 2, 16);
    ctx.fillStyle = '#ff9ec2';
    ctx.fillRect(Math.round(x - tw / 2), ty - 10, tw, 14);
    ctx.fillStyle = '#1a1424';
    ctx.textAlign = 'center';
    ctx.fillText(txt, x, ty);
    ctx.textAlign = 'left';
  }
  // lo que dice
  if (FLAM.habla) globo(x, GROUND - h - 6, 'FLAMERITA', FLAM_FRASE, Math.floor(FLAM.habla * 30), false);
}
function flamCarta(t) {
  FLAM.carta = Math.min(1, FLAM.carta + 1 / 15);
  const k = FLAM.carta, s = 0.6 + 0.4 * (1 - Math.pow(1 - k, 3));
  ctx.fillStyle = 'rgba(0,0,0,' + 0.6 * k + ')';
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(s, s);
  ctx.rotate((1 - k) * 0.3);
  const cw = 220, ch = 300, x = -cw / 2, y = -ch / 2;
  // la carta: borde dorado, fondo rosado y brillo
  ctx.fillStyle = '#d9a43a'; ctx.fillRect(x - 4, y - 4, cw + 8, ch + 8);
  ctx.fillStyle = '#fff4e0'; ctx.fillRect(x - 2, y - 2, cw + 4, ch + 4);
  const g = ctx.createLinearGradient(0, y, 0, y + ch);
  g.addColorStop(0, '#ffb3cf'); g.addColorStop(1, '#ff7aa8');
  ctx.fillStyle = g; ctx.fillRect(x, y, cw, ch);
  ctx.fillStyle = '#fff4e0'; ctx.fillRect(x + 14, y + 40, cw - 28, 130);
  ctx.fillStyle = '#ffe3ee'; ctx.fillRect(x + 16, y + 42, cw - 32, 126);
  // brillito que pasa
  const bx = ((t * 120) % (cw + 120)) - 60;
  ctx.globalAlpha = 0.25; ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.moveTo(x + bx, y); ctx.lineTo(x + bx + 30, y); ctx.lineTo(x + bx - 30, y + ch); ctx.lineTo(x + bx - 60, y + ch); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.textAlign = 'center';
  ctx.font = '8px ' + PS; ctx.fillStyle = '#7a1f45';
  ctx.fillText('CARTA ESPECIAL', 0, y + 18);
  ctx.font = '14px ' + PS; ctx.fillStyle = '#ffffff';
  ctx.fillText('FLAMERA', 1, y + 35); ctx.fillStyle = '#7a1f45'; ctx.fillText('FLAMERA', 0, y + 34);
  // el gatito grande
  if (FLAM_IMG.complete) ctx.drawImage(FLAM_IMG, -FLAM_IMG.width * 2.8, y + 52 + Math.round(Math.sin(t * 3) * 2), FLAM_IMG.width * 5.6, FLAM_IMG.height * 5.6);
  ctx.font = '7px ' + PS; ctx.fillStyle = '#4a1230';
  ['Streamer nica de Jinotepe.', 'Hace directos jugando', 'en TikTok y Twitch.', '', '¡Saludos a la Flamera Army!'].forEach((l, i) => ctx.fillText(l, 0, y + 196 + i * 14));
  ctx.font = '6px ' + PS; ctx.fillStyle = '#7a1f45';
  ctx.fillText('"¡Miau! ¡Qué nota, mae!"', 0, y + ch - 14);
  ctx.textAlign = 'left';
  ctx.restore();
  if (k >= 1 && Math.floor(t * 2) % 2) {
    ctx.font = '7px ' + PS; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff';
    ctx.fillText('E / ESPACIO para guardar la carta', W / 2, H - 14);
    ctx.textAlign = 'left';
  }
}
addEventListener(
  'keydown',
  e => {
    if (e.repeat) return;
    if (state == 'flcarta') {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (FLAM.carta >= 1 && ['KeyE', 'Space', 'Enter', 'Escape'].includes(e.code)) { state = 'play'; FLAM.carta = 0; say('Guardaste la Carta de Flamera.'); }
      return;
    }
    if (e.code == 'KeyE' && flamCerca() && !FLAM.habla) {
      e.preventDefault();
      e.stopImmediatePropagation();
      flamInteractuar();
    }
  },
  true,
);
const loadAreaFLAM = loadArea;
loadArea = function (n) {
  loadAreaFLAM(n);
  FLAM.habla = 0;
  FLAM.carta = 0;
};
const drawEnemiesFLAM = drawEnemies;
drawEnemies = function (t) {
  drawEnemiesFLAM(t);
  if (area == 9) flamDibujar(performance.now() / 1000);
};
let flamUlt = performance.now();
const drawFLAM = draw;
draw = function () {
  const now = performance.now(), dt = Math.min(0.05, (now - flamUlt) / 1000);
  flamUlt = now;
  if (area == 9 && state == 'play') flamTick(dt);
  if (state == 'flcarta') {
    // el juego queda quieto detrás de la carta
    state = 'play'; drawFLAM(); state = 'flcarta';
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    flamCarta(now / 1000);
    return;
  }
  drawFLAM();
};
})();
