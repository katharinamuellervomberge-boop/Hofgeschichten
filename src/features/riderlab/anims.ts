/**
 * Rider Lab – die 20 Übungsanimationen.
 * Jede Übung hat eigene Schlüsselposen (richtig) und ein eigenes Fehlerbild.
 * Bausteine: build() (Winkel + IK) und pts() (Punkte, für Ansichten von vorn/oben) aus ./figure.
 */
import { add, build, dir, len, mul, pts, sub, type Anim, type J, type Limb, type P, type Pose, type Spec } from "./figure";

export type ExerciseAnim = {
  /** Richtige Ausführung – ein Bild oder mehrere synchrone Ansichten */
  panels: Anim[];
  /** Häufiger Fehler (eigene Animation) */
  fault: Anim;
  /** Richtig und Fehler immer nebeneinander zeigen */
  compare?: boolean;
};

const SIDE: Anim["box"] = [-110, -198, 220, 212];
const FRONT: Anim["box"] = [-85, -198, 170, 212];

/* ---------- Hilfen ---------- */
const REINS: Limb = [74, 4];
/** Treffpunkt zweier Kreise (z. B. Hüfte zwischen Knie und hinterem Fuß), obere Lösung */
function meet(c1: P, r1: number, c2: P, r2: number): P {
  const d = len(sub(c2, c1));
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const m = add(c1, mul(sub(c2, c1), a / d));
  const n: P = [-(c2[1] - c1[1]) / d, (c2[0] - c1[0]) / d];
  const p1 = add(m, mul(n, h));
  const p2 = add(m, mul(n, -h));
  return p1[1] < p2[1] ? p1 : p2;
}
function tweak(po: Pose, f: (p: Record<J, P>) => void): Pose {
  const p = { ...po.p };
  f(p);
  return { ...po, p };
}
const shift = (p: Record<J, P>, js: J[], d: P) => js.forEach((j) => (p[j] = add(p[j], d)));

/** Stehend, Füße fest (Beine per IK), Hüfte frei wählbar */
const stand = (root: P, trunk: number, o: Partial<Spec> = {}, feet: [P, P] = [[4, -5], [0, -5]]) =>
  build({
    root,
    trunk,
    armA: REINS,
    legA: [90, 90, 0],
    ...o,
    ik: { anA: [feet[0], "fwd", 0], anB: [feet[1], "fwd", 0], ...(o.ik ?? {}) },
  });

/* =====================================================================
   BEREICH 1 – DAS LANGE BEIN
   ===================================================================== */

/** 1 Hüftöffner: halber Kniestand, Becken aufrichten, Po fest, sanft nach vorn */
const kneel = (th: number, tilt: number, o: Partial<Spec> = {}) =>
  build({
    trunk: -90,
    tilt,
    legA: [0, 90, 0],
    legB: [th, 180, 180],
    armA: [80, 20],
    pin: ["knB", [-22, -5]],
    ...o,
    ik: { anA: [[34, -5], "up", 0], haA: [{ j: "knA", d: [-3, -8] }, "back"], haB: [{ j: "knA", d: [-9, -7] }, "back"] },
  });
const huefteOeffner: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: SIDE,
      dur: 9,
      pins: ["anA", "anB", "haA", "haB"],
      props: [{ k: "floor" }, { k: "mat", x0: -80, x1: 60 }],
      keys: [
        [0, kneel(104, 0)],
        [1.8, kneel(104, -14)],
        [3.6, kneel(119, -14)],
        [6.4, kneel(119, -14)],
        [7.8, kneel(104, -14)],
      ],
      overlays: [
        { k: "pelvis" },
        { k: "arrow", from: { j: "hip", d: [7, -16] }, to: { j: "hip", d: [-7, -18] }, c: "hint", bow: -5, ph: [0.08, 0.36] },
        { k: "label", at: [0, -150], text: "Becken leicht aufrichten", c: "hint", ph: [0.08, 0.36] },
        { k: "ring", at: { j: "hip", d: [-12, 3] }, c: "ok", r: 8, ph: [0.2, 0.82] },
        { k: "label", at: { j: "hip", d: [-30, 22] }, text: "Po fest", c: "ok", ph: [0.2, 0.82] },
        { k: "arrow", from: { j: "hip", d: [10, 6] }, to: { j: "hip", d: [28, 6] }, c: "ok", ph: [0.38, 0.62] },
        { k: "label", at: [0, -150], text: "sanft nach vorn", c: "ok", ph: [0.38, 0.62] },
        { k: "zone", a: "hipB", b: "knB", u: [0, 0.45], ph: [0.45, 0.85] },
        { k: "label", at: [0, -150], text: "Dehnung vorn an der Hüfte", c: "muscle", ph: [0.63, 0.85] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: SIDE,
    dur: 7,
    pins: ["anA", "anB", "haA", "haB"],
    props: [{ k: "floor" }, { k: "mat", x0: -80, x1: 60 }],
    keys: [
      [0, kneel(104, 0)],
      [2, kneel(128, 12, { arch: 10, trunk: -99 })],
      [5, kneel(128, 12, { arch: 10, trunk: -99 })],
    ],
    overlays: [
      { k: "pelvis" },
      { k: "spine" },
      { k: "ring", at: { j: "hip", d: [-6, -18] }, c: "bad", r: 9, ph: [0.25, 0.75] },
      { k: "label", at: [0, -150], text: "Hohlkreuz – Becken kippt nach vorn", c: "bad", ph: [0.25, 0.75] },
    ],
  },
};

/** 2 90/90-Hüftrotation (von vorn) */
type Knees = "L" | "M" | "R";
function f90(state: Knees, lean = 0): Pose {
  const legs: Record<Knees, Partial<Record<J, P>>> = {
    L: { knA: [-16, -4], anA: [24, -5], knB: [46, -5], anB: [43, -9] },
    M: { knA: [-25, -44], anA: [-40, -5], knB: [25, -44], anB: [40, -5] },
    R: { knB: [16, -4], anB: [-24, -5], knA: [-46, -5], anA: [-43, -9] },
  };
  const l = legs[state];
  const lift = Math.abs(lean) * 0.45;
  return pts(
    {
      hip: [0, -12],
      hipA: [-10, -12 - (lean > 0 ? lift : 0)],
      hipB: [10, -12 - (lean < 0 ? lift : 0)],
      sh: [lean, -63],
      shA: [-15 + lean, -62 + (lean > 0 ? 1.5 : 0)],
      shB: [15 + lean, -62 + (lean < 0 ? 1.5 : 0)],
      head: [lean * 1.4, -85],
      elA: [-27 + lean * 0.6, -38],
      haA: [-34, -7],
      elB: [27 + lean * 0.6, -38],
      haB: [34, -7],
      ...l,
    } as Record<J, P> & { hip: P; sh: P; head: P },
    { face: "front" },
  );
}
function f90top(state: Knees): Pose {
  const legs: Record<Knees, Partial<Record<J, P>>> = {
    L: { knA: [-12, 40], anA: [30, 42], knB: [48, 4], anB: [50, -36] },
    M: { knA: [-18, 24], anA: [-34, 40], knB: [18, 24], anB: [34, 40] },
    R: { knB: [12, 40], anB: [-30, 42], knA: [-48, 4], anA: [-50, -36] },
  };
  return pts(
    {
      hip: [0, 0],
      hipA: [-10, 0],
      hipB: [10, 0],
      sh: [0, -5],
      shA: [-17, -5],
      shB: [17, -5],
      head: [0, -6],
      elA: [-26, -12],
      haA: [-30, -30],
      elB: [26, -12],
      haB: [30, -30],
      ...legs[state],
    } as Record<J, P> & { hip: P; sh: P; head: P },
    { face: "top" },
  );
}
const neunzig: ExerciseAnim = {
  panels: [
    {
      view: "front",
      caption: "von vorn",
      box: [-70, -128, 140, 140],
      dur: 8,
      props: [{ k: "floor" }, { k: "mat", x0: -70, x1: 70 }],
      keys: [
        [0, f90("L")],
        [1.2, f90("L")],
        [2.6, f90("M")],
        [4, f90("R")],
        [5.2, f90("R")],
        [6.6, f90("M")],
      ],
      overlays: [
        { k: "line", pts: ["hip", "sh"], c: "ok" },
        { k: "arrow", from: [-46, -14], to: [-30, -54], c: "hint", bow: -10, ph: [0.15, 0.33] },
        { k: "arrow", from: [50, -14], to: [32, -54], c: "hint", bow: 10, ph: [0.15, 0.33] },
        { k: "arrow", from: [-30, -54], to: [-50, -14], c: "hint", bow: 10, ph: [0.33, 0.5] },
        { k: "arrow", from: [32, -54], to: [22, -14], c: "hint", bow: -6, ph: [0.33, 0.5] },
        { k: "arrow", from: [50, -14], to: [32, -54], c: "hint", bow: 10, ph: [0.65, 0.83] },
        { k: "arrow", from: [-46, -14], to: [-30, -54], c: "hint", bow: -10, ph: [0.65, 0.83] },
        { k: "label", at: [0, -118], text: "Oberkörper bleibt aufrecht", c: "ok" },
      ],
    },
    {
      view: "top",
      caption: "von oben: zweimal 90 Grad",
      box: [-70, -58, 140, 116],
      dur: 8,
      props: [],
      keys: [
        [0, f90top("L")],
        [1.2, f90top("L")],
        [2.6, f90top("M")],
        [4, f90top("R")],
        [5.2, f90top("R")],
        [6.6, f90top("M")],
      ],
      overlays: [
        { k: "line", pts: [{ j: "knA", d: [0, -10] }, "knA", { j: "knA", d: [10, 0] }], c: "hint", ph: [0, 0.16] },
        { k: "line", pts: [{ j: "knB", d: [-10, 0] }, "knB", { j: "knB", d: [0, -10] }], c: "hint", ph: [0, 0.16] },
        { k: "line", pts: [{ j: "knA", d: [10, 0] }, "knA", { j: "knA", d: [0, -10] }], c: "hint", ph: [0.5, 0.66] },
        { k: "line", pts: [{ j: "knB", d: [0, -10] }, "knB", { j: "knB", d: [-10, 0] }], c: "hint", ph: [0.5, 0.66] },
      ],
    },
  ],
  fault: {
    view: "front",
    box: [-85, -140, 170, 150],
    dur: 6,
    props: [{ k: "floor" }, { k: "mat", x0: -70, x1: 70 }],
    keys: [
      [0, f90("L")],
      [1.4, f90("M", 15)],
      [2.6, f90("R", 8)],
      [3.6, f90("R")],
      [4.8, f90("M", -15)],
    ],
    overlays: [
      { k: "line", pts: ["hip", "sh"], c: "bad" },
      { k: "label", at: [0, -118], text: "Oberkörper weicht aus, Po hebt ab", c: "bad", ph: [0.15, 0.85] },
    ],
  },
};

/** 3 Knie zur Wand */
function kneeWall(shin: number, heelUp = false): Pose {
  const an: P = heelUp ? [40, -12] : [36, -5];
  const kn = add(an, mul(dir(shin), 42));
  const back: P = [-34, -5];
  const hip = meet(kn, 44, back, 85);
  return build({
    root: hip,
    trunk: -80,
    armA: [-20, -20],
    legA: [0, 90, 0],
    ik: {
      anA: [an, "fwd", heelUp ? 24 : 0],
      anB: [back, "fwd", 0],
      haA: [[56, -112], "down"],
      haB: [[56, -108], "down"],
    },
  });
}
const knieWand: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: [-100, -182, 200, 196],
      dur: 4,
      pins: ["anA", "anB", "haA", "haB"],
      props: [{ k: "floor" }, { k: "wall", x: 58, side: "right" }],
      keys: [
        [0, kneeWall(-84)],
        [1.5, kneeWall(-64)],
        [2.2, kneeWall(-64)],
      ],
      overlays: [
        { k: "ring", at: "anA", c: "hint", r: 7 },
        { k: "arrow", from: { j: "knA", d: [-6, -12] }, to: { j: "knA", d: [8, -16] }, c: "hint", ph: [0.02, 0.38] },
        { k: "ring", at: "heA", c: "ok", r: 6, ph: [0.3, 0.75] },
        { k: "label", at: [6, 9], text: "Ferse bleibt am Boden", c: "ok", ph: [0.3, 0.75] },
        { k: "label", at: [-40, -184], text: "Knie Richtung Wand", c: "hint", ph: [0.02, 0.38] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: [-100, -182, 200, 196],
    dur: 4,
    pins: ["anB", "haA", "haB"],
    props: [{ k: "floor" }, { k: "wall", x: 58, side: "right" }],
    keys: [
      [0, kneeWall(-84)],
      [1.4, kneeWall(-60, true)],
      [2.4, kneeWall(-60, true)],
    ],
    overlays: [
      { k: "ring", at: "heA", c: "bad", r: 7, ph: [0.3, 0.7] },
      { k: "label", at: [6, 9], text: "Ferse hebt ab", c: "bad", ph: [0.3, 0.7] },
    ],
  },
};

/** 4 Knie weich, Bein lang: auf dem Stuhl anspannen – lösen – hängen lassen */
const seatLeg = (shin: number, foot: number, thigh = 2) =>
  build({
    root: [-4, -55],
    trunk: -90,
    armA: [80, 20],
    legA: [thigh, shin, foot],
    legB: [thigh + 1, shin - 2, foot],
    ik: { haA: [{ j: "knA", d: [-16, -7] }, "back"], haB: [{ j: "knB", d: [-20, -7] }, "back"] },
  });
const CHAIR: Anim["props"] = [{ k: "floor" }, { k: "chair", x: -8, seat: -49, back: "left", w: 34 }];
const tense = seatLeg(62, -14, -4);
const relax = seatLeg(90, 22);
const beinLang: ExerciseAnim = {
  compare: true,
  panels: [
    {
      view: "side",
      box: [-60, -170, 140, 182],
      dur: 6,
      pins: ["haA", "haB"],
      props: CHAIR,
      caption: "✓ kurz anspannen – lösen",
      tone: "ok",
      keys: [
        [0, relax],
        [0.9, tense],
        [2.3, tense],
        [3.3, relax],
      ],
      overlays: [
        { k: "zone", a: "hipA", b: "knA", u: [0.15, 0.85], c: "bad", ph: [0.12, 0.42] },
        { k: "label", at: [10, -140], text: "kurz anspannen", c: "bad", ph: [0.12, 0.42] },
        { k: "zone", a: "knA", b: "anA", u: [0.1, 0.9], c: "muscle", w: 11, ph: [0.58, 0.98] },
        { k: "arrow", from: { j: "anA", d: [10, -12] }, to: { j: "anA", d: [10, 4] }, c: "ok", ph: [0.58, 0.98] },
        { k: "label", at: [10, -140], text: "lösen – Bein hängt", c: "ok", ph: [0.58, 0.98] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: [-60, -170, 140, 182],
    dur: 1.2,
    pins: ["haA", "haB"],
    props: CHAIR,
    caption: "✗ dauerhaft fest = klemmen",
    tone: "bad",
    keys: [
      [0, tense],
      [0.6, seatLeg(60, -15, -5)],
    ],
    overlays: [
      { k: "zone", a: "hipA", b: "knA", u: [0.15, 0.85], c: "bad" },
      { k: "label", at: [10, -140], text: "bleibt fest", c: "bad" },
    ],
  },
};

/* =====================================================================
   BEREICH 2 – LEICHTTRABEN
   ===================================================================== */

const sitFeet: [P, P] = [[44, -5], [41, -5]];
const perch = (root: P, trunk: number, arms?: Partial<Spec>) =>
  build({ root, trunk, armA: REINS, legA: [0, 90, 0], ...arms, ik: { anA: [sitFeet[0], "up", 0], anB: [sitFeet[1], "up", 0], ...(arms?.ik ?? {}) } });
const CHAIR2: Anim["props"] = [{ k: "floor" }, { k: "chair", x: -6, seat: -45, back: "left", w: 34 }];

/** 5 Mini-Leichttrab am Stuhl */
const miniTrab: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: [-75, -182, 170, 196],
      dur: 2.6,
      pins: ["anA", "anB"],
      props: CHAIR2,
      keys: [
        [0, perch([0, -47], -70)],
        [0.9, perch([6, -54], -68)],
        [1.3, perch([6, -54], -68)],
        [2.3, perch([0, -47], -70)],
      ],
      overlays: [
        { k: "arrow", from: [-16, -42], to: [-16, -58], c: "ok", ph: [0.02, 0.36] },
        { k: "label", at: [-20, -64], text: "nur wenige cm", c: "ok", anchor: "end", ph: [0.02, 0.5] },
        { k: "arrow", from: [-16, -58], to: [-16, -44], c: "hint", ph: [0.52, 0.88] },
        { k: "label", at: [10, -165], text: "kontrolliert absetzen", c: "hint", ph: [0.52, 0.88] },
        { k: "line", pts: ["hip", "sh"], c: "hint" },
      ],
    },
  ],
  fault: {
    view: "side",
    box: [-75, -182, 170, 196],
    dur: 2.6,
    pins: ["anA", "anB"],
    props: CHAIR2,
    keys: [
      [0, perch([0, -47], -70)],
      [0.8, perch([22, -80], -84)],
      [1.1, perch([22, -80], -84)],
      [1.35, perch([0, -47], -74)],
    ],
    overlays: [
      { k: "label", at: [10, -165], text: "zu hoch – und schwer zurückfallen", c: "bad", ph: [0.2, 0.7] },
      { k: "ring", at: "hip", c: "bad", r: 10, ph: [0.5, 0.65] },
    ],
  },
};

/** 6 Rhythmus-Trainer: kleine federnde Bewegung im Zweiertakt */
const rhythmus: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: SIDE,
      dur: 1.2,
      pins: ["anA", "anB"],
      keys: [
        [0, stand([-2, -86], -86)],
        [0.6, stand([-5, -80], -84)],
      ],
      overlays: [
        { k: "beat", n: 2, at: [40, -160] },
        { k: "ring", at: "knA", c: "hint", r: 7 },
        { k: "label", at: [48, -142], text: "ab · auf", c: "ink" },
      ],
    },
  ],
  fault: {
    view: "side",
    box: SIDE,
    dur: 1.2,
    pins: ["anA", "anB"],
    keys: [
      [0, stand([0, -88], -99, { arch: 6 })],
      [0.6, stand([-10, -70], -68)],
    ],
    overlays: [
      { k: "beat", n: 2, at: [40, -160] },
      { k: "line", pts: ["hip", { j: "head", d: [0, 0] }], c: "bad" },
      { k: "label", at: [0, 10], text: "zu groß – Oberkörper wippt mit", c: "bad" },
    ],
  },
};

/** 7 Aufstehen ohne Schwung */
const seatFeet: [P, P] = [[32, -5], [29, -5]];
const rise = (root: P, trunk: number, o: Partial<Spec> = {}) =>
  build({
    root,
    trunk,
    armA: [70, 60],
    legA: [0, 90, 0],
    ...o,
    ik: { anA: [seatFeet[0], "up", 0], anB: [seatFeet[1], "up", 0], haA: [{ j: "sh", d: [12, 16] }, "down"], haB: [{ j: "sh", d: [8, 18] }, "down"], ...(o.ik ?? {}) },
  });
const CHAIR3: Anim["props"] = [{ k: "floor" }, { k: "chair", x: -12, seat: -45, back: "left", w: 34 }];
const aufstehen: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: [-80, -182, 170, 196],
      dur: 9,
      pins: ["anA", "anB"],
      props: CHAIR3,
      keys: [
        [0, rise([-8, -50], -86)],
        [1.2, rise([-8, -50], -54)],
        [2.7, rise([12, -64], -52)],
        [4.2, rise([28, -89], -88)],
        [5.2, rise([28, -89], -88)],
        [6.7, rise([12, -64], -54)],
        [8.1, rise([-8, -50], -58)],
      ],
      overlays: [
        { k: "cog" },
        { k: "line", pts: ["hip", "sh"], c: "hint" },
        { k: "label", at: [5, 10], text: "aus der Hüfte nach vorn neigen", c: "hint", ph: [0.08, 0.3] },
        { k: "label", at: [5, 10], text: "Schwerpunkt über die Füße", c: "ok", ph: [0.3, 0.5] },
        { k: "label", at: [5, 10], text: "langsam hinsetzen", c: "ok", ph: [0.62, 0.92] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: [-80, -182, 170, 196],
    dur: 5,
    pins: ["anA", "anB"],
    props: CHAIR3,
    keys: [
      [0, rise([-10, -50], -100, { ik: { haA: [{ j: "sh", d: [-6, 30] }, "down"], haB: [{ j: "sh", d: [-8, 30] }, "down"] } })],
      [0.6, rise([0, -54], -32, { ik: { haA: [{ j: "sh", d: [40, 10] }, "down"], haB: [{ j: "sh", d: [38, 12] }, "down"] } })],
      [1.3, rise([28, -89], -88)],
      [2.6, rise([28, -89], -88)],
      [3.1, rise([-8, -50], -80)],
    ],
    overlays: [
      { k: "cog" },
      { k: "label", at: [5, 10], text: "mit Schwung nach vorn werfen", c: "bad", ph: [0.02, 0.3] },
      { k: "label", at: [5, 10], text: "auf den Stuhl plumpsen", c: "bad", ph: [0.5, 0.75] },
    ],
  },
};

/** 8 Ruhige Hände beim Aufstehen (Vergleich) */
const handsOk = (root: P, trunk: number) => perch(root, trunk, { ik: { haA: [[44, -76], "down"], haB: [[41, -75], "down"] } });
const handsBad = (root: P, trunk: number, shrug: number, arm: Limb) => perch(root, trunk, { armA: arm, shrug });
const ruhigeHaende: ExerciseAnim = {
  compare: true,
  panels: [
    {
      view: "side",
      box: [-75, -182, 170, 196],
      dur: 2.6,
      pins: ["anA", "anB", "haA", "haB"],
      props: CHAIR2,
      caption: "✓ Hände bleiben ruhig",
      tone: "ok",
      keys: [
        [0, handsOk([0, -47], -70)],
        [0.9, handsOk([6, -55], -68)],
        [1.3, handsOk([6, -55], -68)],
        [2.3, handsOk([0, -47], -70)],
      ],
      overlays: [
        { k: "trail", j: "haA", c: "ok" },
        { k: "ring", at: "elA", c: "ok", r: 6 },
        { k: "label", at: [10, -168], text: "Ellbogen federn", c: "ok" },
      ],
    },
  ],
  fault: {
    view: "side",
    box: [-75, -182, 170, 196],
    dur: 2.6,
    pins: ["anA", "anB"],
    props: CHAIR2,
    caption: "✗ Arme fest – Hände hüpfen mit",
    tone: "bad",
    keys: [
      [0, handsBad([0, -47], -70, 3, [72, 4])],
      [0.7, handsBad([7, -56], -66, 6, [56, -16])],
      [0.95, handsBad([7, -58], -64, 6, [62, -6])],
      [1.4, handsBad([0, -47], -72, 3, [80, 14])],
    ],
    overlays: [
      { k: "trail", j: "haA", c: "bad" },
      { k: "ring", at: "shA", c: "bad", r: 7 },
      { k: "label", at: [10, -168], text: "Schultern hoch", c: "bad" },
    ],
  },
};

/* =====================================================================
   BEREICH 3 – GALOPP
   ===================================================================== */

/** 9 Beckenuhr: Seitenansicht (vor/zurück) + Vorderansicht (seitlich), synchron */
const clockSide = (amp: number, wild: number) => (u: number) => {
  const c = Math.cos(2 * Math.PI * u);
  return build({
    root: [0 + c * 1.2 * amp, -50],
    trunk: -90 - c * 2 * amp - c * wild * 8,
    neck: -90 - c * wild * 10,
    tilt: 12 * c * amp,
    arch: 4 * c * amp,
    armA: [80, 20],
    legA: [0, 90, 0],
    ik: { anA: [[42, -5], "up", 0], anB: [[39, -5], "up", 0], haA: [{ j: "knA", d: [-12, -7] }, "back"], haB: [{ j: "knB", d: [-16, -7] }, "back"] },
  });
};
const clockFront = (amp: number, wild: number) => (u: number) => {
  const s = Math.sin(2 * Math.PI * u);
  const dx = 3 * s * amp;
  const lift = 2.5 * s * amp;
  const hd = s * wild * 14;
  return pts(
    {
      hip: [dx, -50],
      hipA: [dx - 10, -50 + lift],
      hipB: [dx + 10, -50 - lift],
      sh: [hd * 0.6, -101],
      shA: [-15 + hd * 0.6, -100],
      shB: [15 + hd * 0.6, -100],
      head: [hd, -123],
      elA: [-24 + hd * 0.3, -76],
      haA: [-13, -56],
      elB: [24 + hd * 0.3, -76],
      haB: [13, -56],
      knA: [-12, -44],
      anA: [-13, -5],
      knB: [12, -44],
      anB: [13, -5],
    },
    { face: "front" },
  );
};
const STOOL: Anim["props"] = [{ k: "floor" }, { k: "chair", x: -6, seat: -45, back: "left", w: 32 }];
const STOOL_F: Anim["props"] = [{ k: "floor" }, { k: "chair", x: 0, seat: -45, w: 42 }];
const beckenuhr: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: [-70, -170, 130, 182],
      dur: 6,
      pins: ["anA", "anB", "haA", "haB"],
      props: STOOL,
      fn: clockSide(1, 0),
      caption: "von der Seite: vor und zurück",
      overlays: [{ k: "pelvis" }, { k: "spine" }],
    },
    {
      view: "front",
      box: [-65, -170, 130, 182],
      dur: 6,
      props: STOOL_F,
      fn: clockFront(1, 0),
      caption: "von vorn: zur Seite",
      overlays: [{ k: "level", at: "hip" }, { k: "clock", at: [36, -134] }],
    },
  ],
  fault: {
    view: "side",
    box: [-70, -170, 130, 182],
    dur: 3,
    pins: ["anA", "anB", "haA", "haB"],
    props: STOOL,
    fn: clockSide(2.2, 1),
    overlays: [
      { k: "pelvis" },
      { k: "ring", at: "head", c: "bad", r: 13 },
      { k: "label", at: [0, -158], text: "zu groß – Kopf wackelt mit", c: "bad" },
    ],
  },
};

/** 10 Beckenkippen in Rückenlage */
const SH_FLOOR: P = [-50, -9];
const supine = (o: Partial<Spec> & { trunk?: number }, feet: [P, P] | null = [[32, -5], [29, -5]]) =>
  build({
    trunk: 180,
    neck: 180,
    face: "up",
    armA: [-1, 0],
    legA: [-60, 90, 0],
    pin: ["sh", SH_FLOOR],
    ...o,
    ik: feet ? { anA: [feet[0], "up", 0], anB: [feet[1], "up", 0], ...(o.ik ?? {}) } : o.ik,
  });
const LIE_BOX: Anim["box"] = [-95, -130, 170, 144];
const beckenkippen: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: LIE_BOX,
      dur: 6,
      pins: ["anA", "anB"],
      props: [{ k: "floor" }, { k: "mat", x0: -85, x1: 60 }],
      keys: [
        [0, supine({ arch: 3 })],
        [1.2, supine({ arch: -1, tilt: -14 })],
        [2.6, supine({ arch: -1, tilt: -14 })],
        [3.8, supine({ arch: 7, tilt: 12 })],
        [5, supine({ arch: 7, tilt: 12 })],
      ],
      overlays: [
        { k: "spine" },
        { k: "pelvis" },
        { k: "label", at: [-10, -100], text: "Rücken sanft zum Boden", c: "ok", ph: [0.18, 0.45] },
        { k: "label", at: [-10, -100], text: "kleines Hohlkreuz – nicht mehr", c: "hint", ph: [0.62, 0.85] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: LIE_BOX,
    dur: 4,
    pins: ["anA", "anB"],
    props: [{ k: "floor" }, { k: "mat", x0: -85, x1: 60 }],
    keys: [
      [0, supine({ arch: 3 })],
      [1.4, supine({ arch: 15, tilt: 22 })],
      [2.8, supine({ arch: 15, tilt: 22 })],
    ],
    overlays: [
      { k: "spine" },
      { k: "pelvis" },
      { k: "ring", at: { j: "hip", d: [-20, -6] }, c: "bad", r: 9, ph: [0.3, 0.75] },
      { k: "label", at: [-10, -100], text: "übertriebenes Hohlkreuz", c: "bad", ph: [0.3, 0.75] },
    ],
  },
};

/** 11 Glute Bridge March */
const bridge = (trunk: number, lift?: "A" | "B") =>
  supine({ trunk, ik: lift === "A" ? { anA: [[33, -17], "up", 0] } : lift === "B" ? { anB: [[30, -17], "up", 0] } : {} });
const bridgeMarch: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: LIE_BOX,
      dur: 9,
      pins: ["anA", "anB"],
      props: [{ k: "floor" }, { k: "mat", x0: -85, x1: 60 }],
      keys: [
        [0, bridge(180)],
        [1.2, bridge(151)],
        [2.2, bridge(151, "A")],
        [3.2, bridge(151)],
        [4.2, bridge(151, "B")],
        [5.2, bridge(151)],
        [6.4, bridge(151)],
        [7.6, bridge(180)],
      ],
      overlays: [
        { k: "line", pts: ["sh", "hip", "knA"], c: "ok", ph: [0.14, 0.72] },
        { k: "ring", at: { j: "hip", d: [2, 6] }, c: "muscle", r: 8, ph: [0.14, 0.72] },
        { k: "label", at: [-10, -100], text: "Becken bleibt oben und ruhig", c: "ok", ph: [0.22, 0.6] },
        { k: "arrow", from: { j: "anA", d: [10, 6] }, to: { j: "anA", d: [10, -4] }, c: "hint", ph: [0.22, 0.32] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: LIE_BOX,
    dur: 6,
    pins: ["anA", "anB"],
    props: [{ k: "floor" }, { k: "mat", x0: -85, x1: 60 }],
    keys: [
      [0, bridge(180)],
      [1.2, bridge(151)],
      [2.2, supine({ trunk: 167, ik: { anA: [[33, -17], "up", 0] } })],
      [3.4, bridge(151)],
      [4.6, bridge(180)],
    ],
    overlays: [
      { k: "line", pts: ["sh", "hip", "knA"], c: "bad", ph: [0.2, 0.55] },
      { k: "label", at: [-10, -100], text: "Becken sackt ab", c: "bad", ph: [0.3, 0.55] },
    ],
  },
};

/** 12 Dead Bug – Draufsicht (Figur liegt, Kopf links) */
function bug(ext: "0" | "A" | "B"): Pose {
  const base: Partial<Record<J, P>> = {
    hip: [0, 14],
    hipA: [-10, 14],
    hipB: [10, 14],
    sh: [0, -38],
    shA: [-16, -38],
    shB: [16, -38],
    head: [0, -60],
    elA: [-16, -44],
    haA: [-16, -48],
    elB: [16, -44],
    haB: [16, -48],
    knA: [-10, 21],
    anA: [-10, 52],
    toA: [-10, 60],
    knB: [10, 21],
    anB: [10, 52],
    toB: [10, 60],
  };
  if (ext === "A") Object.assign(base, { elA: [-18, -66], haA: [-20, -92], knB: [11, 56], anB: [12, 96], toB: [12, 104] });
  if (ext === "B") Object.assign(base, { elB: [18, -66], haB: [20, -92], knA: [-11, 56], anA: [-12, 96], toA: [-12, 104] });
  return pts(base as Record<J, P> & { hip: P; sh: P; head: P }, { face: "top" });
}
const bugSide = (ext: boolean, arch = 0) =>
  supine({
    arch,
    armA: ext ? [180, 180] : [-90, -90],
    armB: [-90, -90],
    legA: [-90, 0, -90],
    legB: ext ? [-4, -4, -10] : [-90, 0, -90],
  }, null);
const deadBug: ExerciseAnim = {
  panels: [
    {
      view: "top",
      box: [-115, -62, 230, 124],
      rotate: -90,
      dur: 8,
      props: [],
      keys: [
        [0, bug("0")],
        [0.6, bug("0")],
        [2.2, bug("A")],
        [3, bug("A")],
        [4.4, bug("0")],
        [5, bug("0")],
        [6.6, bug("B")],
        [7.4, bug("B")],
      ],
      caption: "von oben: gegengleich strecken",
      overlays: [
        { k: "ring", at: { j: "hip", d: [0, -12] }, c: "ok", r: 9 },
        { k: "arrow", from: { j: "shA", d: [-6, -14] }, to: { j: "shA", d: [-8, -46] }, c: "hint", ph: [0.08, 0.35] },
        { k: "arrow", from: { j: "hipB", d: [6, 44] }, to: { j: "hipB", d: [6, 76] }, c: "hint", ph: [0.08, 0.35] },
        { k: "arrow", from: { j: "shB", d: [6, -14] }, to: { j: "shB", d: [8, -46] }, c: "hint", ph: [0.58, 0.85] },
        { k: "arrow", from: { j: "hipA", d: [-6, 44] }, to: { j: "hipA", d: [-6, 76] }, c: "hint", ph: [0.58, 0.85] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: LIE_BOX,
    dur: 4,
    props: [{ k: "floor" }, { k: "mat", x0: -85, x1: 60 }],
    keys: [
      [0, bugSide(false)],
      [1.2, bugSide(true, 13)],
      [2.6, bugSide(true, 13)],
    ],
    caption: "von der Seite",
    overlays: [
      { k: "spine" },
      { k: "ring", at: { j: "hip", d: [-18, -8] }, c: "bad", r: 9, ph: [0.3, 0.7] },
      { k: "label", at: [-10, -100], text: "Rücken hebt ab – Hohlkreuz", c: "bad", ph: [0.3, 0.7] },
    ],
  },
};

/* =====================================================================
   BEREICH 4 – DIE RUHIGE HAND
   ===================================================================== */

/** 13 Wasserglas-Challenge: kleine Kniebeugen, Hände ruhig */
const glass = (root: P, trunk: number, hand: P) => stand(root, trunk, { ik: { haA: [hand, "down"], haB: [add(hand, [-3, 1]), "down"] } });
const wasserglas: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: SIDE,
      dur: 3.6,
      pins: ["anA", "anB", "haA", "haB"],
      keys: [
        [0, glass([-2, -89], -86, [26, -102])],
        [1.6, glass([-14, -68], -72, [20, -84])],
        [2.0, glass([-14, -68], -72, [20, -84])],
      ],
      overlays: [{ k: "water" }, { k: "trail", j: "haA", c: "ok" }, { k: "label", at: [0, -184], text: "Wasser bleibt ruhig", c: "ok" }],
    },
  ],
  fault: {
    view: "side",
    box: SIDE,
    dur: 2.4,
    pins: ["anA", "anB", "haA", "haB"],
    keys: [
      [0, glass([-2, -89], -86, [26, -102])],
      [0.35, glass([-6, -80], -82, [34, -92])],
      [0.7, glass([-12, -72], -76, [16, -94])],
      [1.0, glass([-14, -68], -72, [26, -78])],
      [1.4, glass([-8, -78], -80, [18, -104])],
      [1.8, glass([-4, -85], -84, [32, -96])],
    ],
    overlays: [{ k: "water" }, { k: "trail", j: "haA", c: "bad" }, { k: "label", at: [0, -184], text: "Hände ruckeln – Wasser schwappt", c: "bad" }],
  },
};

/** 14 Der elastische Ellbogen */
const elbow = (ua: number, fa: number, shrug = 0) => stand([0, -90], -90, { armA: [ua, fa], armB: [ua + 2, fa + 2], shrug }, [[2, -5], [-2, -5]]);
const ellbogen: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: SIDE,
      dur: 3,
      pins: ["anA", "anB"],
      keys: [
        [0, elbow(82, -22)],
        [1.5, elbow(66, 16)],
      ],
      overlays: [
        { k: "ring", at: "elA", c: "hint", r: 7 },
        { k: "ring", at: "shA", c: "ok", r: 8 },
        { k: "trail", j: "haA", c: "hint" },
        { k: "label", at: [0, -184], text: "Ellbogen öffnet und schließt", c: "hint" },
        { k: "label", at: { j: "shA", d: [-24, 4] }, text: "locker", c: "ok", anchor: "end" },
      ],
    },
  ],
  fault: {
    view: "side",
    box: SIDE,
    dur: 3,
    pins: ["anA", "anB"],
    keys: [
      [0, elbow(90, 20, 6)],
      [1.5, elbow(58, -12, 6)],
    ],
    overlays: [
      { k: "ring", at: "shA", c: "bad", r: 8 },
      { k: "trail", j: "haA", c: "bad" },
      { k: "label", at: [0, -184], text: "Schultern hoch, Ellbogen starr", c: "bad" },
    ],
  },
};

/** 15 Wall Slides (von vorn, Rücken an der Wand) */
const slide = (a: Limb, b: Limb, shrug = 0) =>
  build({ root: [0, -90], trunk: -90, hipW: 10, shW: 15, face: "front", shrug, armA: a, armB: b, legA: [96, 92, 0], legB: [84, 88, 0] });
const wallSlides: ExerciseAnim = {
  panels: [
    {
      view: "front",
      box: FRONT,
      dur: 5,
      props: [{ k: "wallBack" }, { k: "floor" }],
      keys: [
        [0, slide([172, -88], [8, -92])],
        [2.2, slide([-128, -104], [-52, -76])],
        [2.8, slide([-128, -104], [-52, -76])],
      ],
      overlays: [
        { k: "scap" },
        { k: "label", at: [0, 10], text: "Schulterblätter drehen mit", c: "hint", ph: [0.05, 0.5] },
        { k: "label", at: [0, 10], text: "nur so weit wie angenehm", c: "ok", ph: [0.55, 0.98] },
      ],
    },
  ],
  fault: {
    view: "front",
    box: FRONT,
    dur: 4,
    props: [{ k: "wallBack" }, { k: "floor" }],
    keys: [
      [0, slide([172, -88], [8, -92])],
      [1.6, slide([-108, -96], [-72, -84], 8)],
      [2.4, slide([-108, -96], [-72, -84], 8)],
    ],
    overlays: [
      { k: "ring", at: "shA", c: "bad", r: 8, ph: [0.3, 0.7] },
      { k: "ring", at: "shB", c: "bad", r: 8, ph: [0.3, 0.7] },
      { k: "label", at: [0, 10], text: "Schultern ziehen hoch – erzwungen", c: "bad", ph: [0.3, 0.7] },
    ],
  },
};

/** 16 Arme frei, Rumpf stabil (Vergleich) */
const arms = (a: Limb, b: Limb, wobble = 0) =>
  stand([wobble * 0.5, -90], -90 - wobble, { armA: a, armB: b, arch: wobble * 0.7 }, [[2, -5], [-2, -5]]);
const DOWN: Limb = [92, 92];
const FWD: Limb = [2, 2];
const armeFrei: ExerciseAnim = {
  compare: true,
  panels: [
    {
      view: "side",
      box: [-80, -182, 160, 196],
      dur: 4,
      pins: ["anA", "anB"],
      caption: "✓ Rumpf bleibt ruhig",
      tone: "ok",
      keys: [
        [0, arms(DOWN, DOWN)],
        [1, arms(FWD, DOWN)],
        [2, arms(DOWN, DOWN)],
        [3, arms(DOWN, FWD)],
      ],
      overlays: [{ k: "line", pts: ["hip", "sh"], c: "ok" }],
    },
  ],
  fault: {
    view: "side",
    box: [-80, -182, 160, 196],
    dur: 4,
    pins: ["anA", "anB"],
    caption: "✗ Oberkörper weicht nach hinten",
    tone: "bad",
    keys: [
      [0, arms(DOWN, DOWN)],
      [1, arms(FWD, DOWN, 10)],
      [2, arms(DOWN, DOWN)],
      [3, arms(DOWN, FWD, 10)],
    ],
    overlays: [{ k: "line", pts: ["hip", "sh"], c: "bad" }],
  },
};

/* =====================================================================
   BEREICH 5 – LEICHTER SITZ
   ===================================================================== */

/** 17 Reiter-Hocke */
const hocke = (root: P, trunk: number, o: Partial<Spec> = {}) => stand(root, trunk, { armA: [70, 10], ...o });
const reiterHocke: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: SIDE,
      dur: 8,
      pins: ["anA", "anB"],
      keys: [
        [0, hocke([-1, -90], -88)],
        [1.6, hocke([-16, -72], -56)],
        [4, hocke([-16, -73], -57)],
        [6, hocke([-16, -72], -56)],
        [7.4, hocke([-1, -90], -88)],
      ],
      overlays: [
        { k: "cog" },
        { k: "label", at: [0, -184], text: "Schwerpunkt über den Füßen", c: "ok", ph: [0.2, 0.9] },
        { k: "ring", at: "knA", c: "hint", r: 7, ph: [0.2, 0.9] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: SIDE,
    dur: 5,
    pins: ["anA", "anB"],
    keys: [
      [0, hocke([-1, -90], -88)],
      [1.6, hocke([6, -70], -34, { ik: { anA: [[8, -12], "fwd", 30], anB: [[4, -12], "fwd", 30] } })],
      [3.6, hocke([6, -70], -34, { ik: { anA: [[8, -12], "fwd", 30], anB: [[4, -12], "fwd", 30] } })],
    ],
    overlays: [
      { k: "cog", strict: true },
      { k: "label", at: [0, -184], text: "kippt nach vorn – Fersen heben ab", c: "bad", ph: [0.3, 0.75] },
    ],
  },
};

/** 18 Hip Hinge */
const hinge = (root: P, trunk: number, arch = 0, neck?: number) => stand(root, trunk, { armA: [92, 92], arch, neck });
const hipHinge: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: SIDE,
      dur: 4.4,
      pins: ["anA", "anB"],
      keys: [
        [0, hinge([-1, -90], -90)],
        [1.8, hinge([-17, -84], -40)],
        [2.6, hinge([-17, -84], -40)],
      ],
      overlays: [
        { k: "spine" },
        { k: "arrow", from: { j: "hip", d: [-8, 0] }, to: { j: "hip", d: [-24, 0] }, c: "ok", ph: [0.02, 0.4] },
        { k: "label", at: [0, -184], text: "Hüfte nach hinten, Rücken lang", c: "ok" },
      ],
    },
  ],
  fault: {
    view: "side",
    box: SIDE,
    dur: 4.4,
    pins: ["anA", "anB"],
    keys: [
      [0, hinge([-1, -90], -90)],
      [1.8, hinge([-3, -87], -32, -13, 70)],
      [2.6, hinge([-3, -87], -32, -13, 70)],
    ],
    overlays: [
      { k: "spine" },
      { k: "ring", at: { j: "sh", d: [-16, 14] }, c: "bad", r: 10, ph: [0.35, 0.65] },
      { k: "label", at: [0, -184], text: "runder Rücken statt Hüfte nach hinten", c: "bad", ph: [0.3, 0.7] },
    ],
  },
};

/** 19 Einbeinstand (von vorn), Stütze bei Bedarf */
const oneLeg = (lift: number, sway: number) =>
  build({
    root: [-1 + sway, -90],
    trunk: -90,
    hipW: 10,
    shW: 15,
    face: "front",
    armA: [100, 96],
    armB: [70, 20],
    legA: [90, 90, 0],
    legB: [86, 92, 0],
    k: { thB: 1 - 0.25 * lift },
    pin: ["anA", [-11, -5]],
    ik: { anA: [[-11, -5], "fwd", 0], haB: [[44, -94 - 2], "down"] },
  });
const einbein: ExerciseAnim = {
  panels: [
    {
      view: "front",
      box: FRONT,
      dur: 4,
      pins: ["anA", "haB"],
      props: [{ k: "floor" }, { k: "support", x: 44, h: 92 }],
      keys: [
        [0, oneLeg(0, 0)],
        [1, oneLeg(1, 0.6)],
        [2.2, oneLeg(1, -0.6)],
        [3.2, oneLeg(1, 0.4)],
      ],
      overlays: [
        { k: "press", j: "anA" },
        { k: "level", at: "hip" },
        { k: "line", pts: ["hipA", "knA", "anA"], c: "ok", ph: [0.22, 0.95] },
        { k: "label", at: [0, -184], text: "Becken bleibt waagerecht", c: "ok", ph: [0.22, 0.95] },
        { k: "label", at: [80, 10], text: "Stütze bei Bedarf", c: "ink", anchor: "end" },
      ],
    },
  ],
  fault: {
    view: "front",
    box: FRONT,
    dur: 4,
    pins: ["anA", "haB"],
    props: [{ k: "floor" }, { k: "support", x: 44, h: 92 }],
    keys: [
      [0, oneLeg(0, 0)],
      [
        1.2,
        tweak(oneLeg(1, 0), (p) => {
          shift(p, ["hipB", "knB", "anB", "toB", "heB"], [0, 6]);
          p.knA = add(p.knA, [5, 0]);
          shift(p, ["sh", "shA", "shB", "head", "elA", "haA", "elB"], [-5, 0]);
        }),
      ],
      [
        3,
        tweak(oneLeg(1, 0), (p) => {
          shift(p, ["hipB", "knB", "anB", "toB", "heB"], [0, 6]);
          p.knA = add(p.knA, [5, 0]);
          shift(p, ["sh", "shA", "shB", "head", "elA", "haA", "elB"], [-5, 0]);
        }),
      ],
    ],
    overlays: [
      { k: "level", at: "hip" },
      { k: "line", pts: ["hipA", "knA", "anA"], c: "bad", ph: [0.25, 0.8] },
      { k: "label", at: [0, -184], text: "Becken sackt ab, Knie knickt ein", c: "bad", ph: [0.25, 0.8] },
    ],
  },
};

/** 20 Wall Sit */
const wallSit = (root: P, feet: [P, P] = [[14, -5], [11, -5]]) =>
  build({ root, trunk: -90, armA: [80, 20], legA: [0, 90, 0], ik: { anA: [feet[0], "fwd", 0], anB: [feet[1], "fwd", 0], haA: [{ j: "knA", d: [-16, -7] }, "back"], haB: [{ j: "knB", d: [-20, -7] }, "back"] } });
const WALL_L: Anim["props"] = [{ k: "floor" }, { k: "wall", x: -40, side: "left" }];
const wandSitz: ExerciseAnim = {
  panels: [
    {
      view: "side",
      box: [-100, -182, 190, 196],
      dur: 8,
      pins: ["anA", "anB", "haA", "haB"],
      props: WALL_L,
      keys: [
        [0, wallSit([-28, -80])],
        [1.6, wallSit([-28, -57])],
        [6.2, wallSit([-28, -57])],
        [7.6, wallSit([-28, -80])],
      ],
      overlays: [
        { k: "zone", a: "hipA", b: "knA", u: [0.15, 0.85], ph: [0.2, 0.78] },
        { k: "ring", at: { j: "hip", d: [5, -24] }, c: "muscle", r: 8, ph: [0.2, 0.78] },
        { k: "label", at: [10, -168], text: "nur so tief wie angenehm", c: "ok", ph: [0.2, 0.78] },
      ],
    },
  ],
  fault: {
    view: "side",
    box: [-100, -182, 190, 196],
    dur: 6,
    pins: ["anA", "anB", "haA", "haB"],
    props: WALL_L,
    keys: [
      [0, wallSit([-28, -80], [[4, -5], [1, -5]])],
      [1.6, wallSit([-28, -40], [[4, -5], [1, -5]])],
      [4.2, wallSit([-28, -40], [[4, -5], [1, -5]])],
    ],
    overlays: [
      { k: "ring", at: "knA", c: "bad", r: 9, ph: [0.28, 0.72] },
      { k: "label", at: [10, -168], text: "zu tief – Knie weit über den Zehen", c: "bad", ph: [0.28, 0.72] },
    ],
  },
};

export const ANIMS: Record<string, ExerciseAnim> = {
  "hueftoeffner": huefteOeffner,
  "90-90-hueftrotation": neunzig,
  "knie-zur-wand": knieWand,
  "knie-weich-bein-lang": beinLang,
  "mini-leichttrab": miniTrab,
  "rhythmus-trainer": rhythmus,
  "aufstehen-ohne-schwung": aufstehen,
  "ruhige-haende-beim-aufstehen": ruhigeHaende,
  "beckenuhr": beckenuhr,
  "beckenkippen": beckenkippen,
  "glute-bridge-march": bridgeMarch,
  "dead-bug": deadBug,
  "wasserglas-challenge": wasserglas,
  "elastischer-ellbogen": ellbogen,
  "wall-slides": wallSlides,
  "arme-frei-rumpf-stabil": armeFrei,
  "reiter-hocke": reiterHocke,
  "hip-hinge": hipHinge,
  "einbeinstand": einbein,
  "wall-sit": wandSitz,
};
