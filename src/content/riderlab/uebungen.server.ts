/**
 * RIDER LAB – Dein Körper. Dein Sitz. Dein Reiten.
 * Fünf Trainingsbereiche mit je vier Übungen für zu Hause (seit 06.11.2026).
 *
 * Alle Inhalte sind Daten: Texte, Dosierung, Animation (Keyframes mit Posen,
 * Markierungen, Fehlervariante). Die Darstellung übernimmt features/riderlab.
 * Posen: siehe features/riderlab/kinematics.ts (Winkel in Grad, Boden y = 230).
 *
 * Nur auf dem Server: Die Übungen gehören zur Reitakademie. Der Browser bekommt
 * eine Übung erst, wenn sie freigeschaltet (oder Probeübung) ist. Die Übersicht
 * ohne Inhalte steht in katalog.generated.ts (`npm run riderlab:katalog`).
 */
import "server-only";
import type { Frame, Leg, Pose, P } from "@/features/riderlab/kinematics";
import type { Area, Exercise } from "@/features/riderlab/types";

/* ---------- Posen-Bausteine ---------- */

const FLAT = 90; // Fuß flach nach vorn
const footL = (ank: P, footAbs = FLAT): Leg => ({ ank, side: 1, footAbs });

/** aufrecht stehend, Füße hüftbreit (seitlich: hinterer Fuß leicht versetzt) */
const STAND: Pose = {
  hip: [180, 132],
  tr: 0,
  arch: 3,
  l1: footL([184, 224]),
  l2: footL([177, 224]),
  a1: { a: 6, el: 10 },
  a2: { a: -4, el: 8 },
};
const st = (o: Partial<Pose>): Pose => ({ ...STAND, ...o });
const f = (t: number, pose: Pose, label?: string): Frame => ({ t, pose, label });

/** Frontansicht stehend */
const FRONT: Pose = {
  hip: [180, 133],
  tr: 0,
  l1: { th: 2, kn: 0, footAbs: 0 },
  l2: { th: 2, kn: 0, footAbs: 0 },
  a1: { a: 10, el: 6 },
  a2: { a: 10, el: 6 },
};
const fr = (o: Partial<Pose>): Pose => ({ ...FRONT, ...o });

/** Rückenlage (Kopf links), Füße aufgestellt */
const SUPINE: Pose = {
  hip: [200, 219],
  tr: -90,
  arch: 4,
  pt: 0,
  neck: 0,
  l1: footL([248, 224]),
  l2: footL([242, 224]),
  a1: { hand: [195, 225], side: 1 },
  a2: { hand: [192, 225], side: 1 },
};
const sup = (o: Partial<Pose>): Pose => ({ ...SUPINE, ...o });

/** Sitzen auf dem Stuhl (Sitz y = 190) */
const SIT: Pose = {
  hip: [150, 178],
  tr: 0,
  arch: 3,
  l1: footL([199, 224]),
  l2: footL([193, 224]),
  a1: { hand: [182, 170], side: -1 },
  a2: { hand: [178, 170], side: -1 },
};
const sit = (o: Partial<Pose>): Pose => ({ ...SIT, ...o });
const CHAIR = { k: "chair" as const, x: 108, seat: 190, back: "left" as const };

/* Zügelhaltung: Hände vor dem Körper in Hüft-/Bauchhöhe */
const reins = (hx: number, hy: number) => ({ a1: { hand: [hx, hy] as P, side: -1 as const }, a2: { hand: [hx - 3, hy + 1] as P, side: -1 as const } });

/* ========================================================================
   BEREICH 1 – DAS LANGE BEIN
   ======================================================================== */

/* Halber Kniestand: hinteres Knie auf der Matte (fest), Hüfte auf dem Kreis um das Knie */
const KNEE2: P = [150, 224];
const kneelHip = (deg: number): P => [KNEE2[0] + 46 * Math.sin((deg * Math.PI) / 180), KNEE2[1] - 46 * Math.cos((deg * Math.PI) / 180)];
const kneel = (deg: number, o: Partial<Pose> = {}): Pose => {
  const hip = kneelHip(deg);
  return {
    hip,
    tr: 0,
    arch: 5,
    pt: 0,
    l1: footL([224, 224]),
    l2: { kp: KNEE2, sh: -90, footAbs: -90 },
    a1: { hand: [hip[0] + 5, hip[1] - 9], side: -1 },
    a2: { hand: [hip[0] + 1, hip[1] - 8], side: -1 },
    ...o,
  };
};

const ex01: Exercise = {
  id: "rl-01",
  slug: "hueftoeffner",
  number: 1,
  title: "Der Hüftöffner",
  goal: "Für Knie, die im Sattel immer wieder hochrutschen: Eine verkürzte Hüftbeugemuskulatur zieht den Oberschenkel nach oben. Diese Übung dehnt sie kontrolliert.",
  steps: [
    "Halber Kniestand auf einer weichen Unterlage: ein Knie am Boden, der andere Fuß flach vor dir.",
    "Becken leicht nach hinten kippen, als wolltest du das Steißbein nach unten schieben.",
    "Gesäßmuskel auf der Seite des hinteren Beins anspannen.",
    "Sanft nach vorn verlagern, bis du vorn an der Hüfte eine Dehnung spürst. Ruhig weiteratmen.",
  ],
  dose: { kind: "time", seconds: 30, sides: true },
  doseLabel: "30 s je Seite",
  aha: "Die Dehnung entsteht nicht durch weites Vorschieben, sondern durch das aufgerichtete Becken. Wer ins Hohlkreuz ausweicht, spürt viel weniger – und genau diese Hüftbeuger arbeiten im Sattel gegen ein langes Bein.",
  transfer: "In der nächsten Reitstunde im Schritt kurz an das aufgerichtete Becken denken und das Knie bewusst schwer werden lassen – ohne die Ferse herunterzudrücken.",
  easier: "Mit einer Hand an einer Stuhllehne festhalten oder weniger weit nach vorn verlagern.",
  caution: "Bei Knieschmerzen ein gefaltetes Handtuch unter das Knie legen. Die Dehnung darf ziehen, aber nie stechen.",
  anim: {
    view: "side",
    props: [{ k: "mat", x0: 70, x1: 290 }],
    frames: [
      f(0, kneel(18), "Startposition: halber Kniestand"),
      f(1.6, kneel(18, { pt: -12, arch: 0, tr: -2 }), "Becken leicht nach hinten kippen"),
      f(3, kneel(18, { pt: -12, arch: 0, tr: -2 }), "Gesäß auf der hinteren Seite anspannen"),
      f(4.8, kneel(31, { pt: -12, arch: 0, tr: -1 }), "Sanft nach vorn verlagern"),
      f(7.4, kneel(31, { pt: -12, arch: 0, tr: -1 }), "Dehnung vorn an der Hüfte halten"),
      f(9, kneel(18)),
    ],
    overlays: [
      { k: "pelvis", tone: "hint" },
      { k: "arc", at: "hip", r: 27, a0: -50, a1: -135, from: 1.2, to: 4.6 },
      { k: "glow", a: ["hip", -13, 2], b: ["hip", -8, 12], w: 16, pulse: true, from: 3, to: 7.6 },
      { k: "text", at: "hip", o: [-52, -34], text: "Gesäß fest", from: 3, to: 4.6 },
      { k: "arrow", at: "hip", o: [22, -2], d: [26, 0], from: 4.4, to: 7.2 },
      { k: "glow", a: "hip", b: "kn2", w: 20, pulse: true, from: 5.2, to: 8 },
      { k: "text", at: "kn2", o: [6, -66], text: "Dehnung vorn an der Hüfte", from: 5.2, to: 8 },
    ],
    mistake: {
      label: "ins Hohlkreuz ausweichen",
      text: "Das Becken kippt nach vorn, der untere Rücken macht ein Hohlkreuz. Die Hüfte wird kaum gedehnt, dafür wird der Rücken belastet. Lieber weniger weit nach vorn – mit aufgerichtetem Becken.",
      frames: [
        f(0, kneel(18), "Startposition"),
        f(2.4, kneel(33, { pt: 12, arch: 15, tr: -7 }), "nach vorn ins Hohlkreuz"),
        f(5.4, kneel(33, { pt: 12, arch: 15, tr: -7 })),
        f(7, kneel(18)),
      ],
      overlays: [
        { k: "pelvis", tone: "bad" },
        { k: "ring", at: ["mid", -16, 6], tone: "bad", r: 13, from: 2 },
        { k: "text", at: "mid", o: [-60, -6], text: "Hohlkreuz", tone: "bad", from: 2, to: 6 },
      ],
    },
  },
};

/* 90/90: eigene Ansicht (von vorn, leicht von oben). x.s: +1 / −1 = Endstellungen, 0 = Knie stehen auf */
const n90 = (s: number, lean = 0): Pose => ({ ...STAND, x: { s, lean } });
const ex02: Exercise = {
  id: "rl-02",
  slug: "90-90-hueftrotation",
  number: 2,
  title: "Die 90/90-Hüftrotation",
  goal: "Für ein Bein, das sich nicht locker um das Pferd legt: Die Hüfte muss nach innen und außen drehen können, damit Knie und Oberschenkel nicht klemmen.",
  steps: [
    "Am Boden sitzen, beide Knie etwa im rechten Winkel gebeugt: ein Bein vor dir, eines seitlich neben dir.",
    "Hände hinter dem Körper aufstützen, Oberkörper aufrecht.",
    "Die Knie kontrolliert zur anderen Seite drehen, die Füße bleiben am Boden.",
    "Kurz in der neuen Stellung ankommen, dann zurück.",
  ],
  dose: { kind: "reps", reps: 6, sides: true },
  doseLabel: "6 je Seite",
  aha: "Die Bewegung kommt aus den Hüftgelenken – nicht aus dem Oberkörper. Genau diese Drehfähigkeit braucht dein Oberschenkel, um flach am Sattel zu liegen, statt sich mit dem Knie festzuhalten.",
  transfer: "Achte beim nächsten Reiten im Schritt darauf, ob deine Oberschenkel flach anliegen oder ob die Knie drücken. Nur wahrnehmen, nichts erzwingen.",
  easier: "Die Hände weiter hinten aufstützen oder auf einem Kissen sitzen. Nur so weit drehen, wie es ohne Schwung geht.",
  caution: "Bei Knie- oder Leistenschmerzen nicht weiter drehen.",
  viewNote: "Ansicht von vorn, leicht von oben – so sieht man, wie die Knie die Seite wechseln.",
  anim: {
    view: "ninety",
    repsPerLoop: 2,
    frames: [
      f(0, n90(1), "Startposition: beide Knie etwa 90°"),
      f(1.4, n90(1)),
      f(3.6, n90(-1), "Knie kontrolliert zur anderen Seite"),
      f(5, n90(-1), "Aufrecht bleiben – ankommen"),
      f(7.2, n90(1), "Und zurück"),
      f(8.6, n90(1)),
    ],
    overlays: [
      { k: "text", at: [180, 34], text: "Oberkörper bleibt aufrecht" },
      { k: "arc", at: [180, 206], r: 72, a0: 200, a1: 340, tone: "hint", from: 1.4, to: 3.6 },
      { k: "arc", at: [180, 206], r: 72, a0: 340, a1: 200, tone: "hint", from: 5, to: 7.2 },
    ],
    mistake: {
      label: "mit dem Oberkörper ausweichen",
      text: "Der Oberkörper kippt zur Seite und nach hinten, um die Drehung zu schaffen. Dann arbeitet die Hüfte kaum. Lieber kleinere Bewegung, Oberkörper bleibt über dem Becken.",
      frames: [
        f(0, n90(1, 0)),
        f(2.2, n90(-1, -16), "Oberkörper kippt mit"),
        f(3.6, n90(-1, -16)),
        f(5.8, n90(1, 16), "zur anderen Seite gekippt"),
        f(7.2, n90(1, 0)),
      ],
      overlays: [{ k: "text", at: [180, 34], text: "Oberkörper kippt mit", tone: "bad" }],
    },
  },
};

/* Knie zur Wand: Wand rechts, vorderer Fuß flach davor */
const WALL_R = 266;
const k2w = (hip: P, o: Partial<Pose> = {}): Pose => ({
  hip,
  tr: 6,
  arch: 3,
  l1: footL([236, 224]),
  l2: footL([160, 223], 84),
  a1: { hand: [WALL_R - 4, 112], side: -1 },
  a2: { hand: [WALL_R - 4, 118], side: -1 },
  ...o,
});
const ex03: Exercise = {
  id: "rl-03",
  slug: "knie-zur-wand",
  number: 3,
  title: "Knie-zur-Wand",
  goal: "Für einen Absatz, der nicht federn will: Ein bewegliches Sprunggelenk lässt die Ferse von selbst tiefer sinken – ohne Drücken.",
  steps: [
    "Vor einer Wand stehen, einen Fuß flach eine Handbreit vor die Wand stellen.",
    "Mit den Händen leicht an der Wand abstützen.",
    "Das Knie langsam Richtung Wand bewegen. Die Ferse bleibt dabei am Boden.",
    "Zurück in die Ausgangsposition. Fuß etwas weiter weg stellen, wenn es zu leicht geht.",
  ],
  dose: { kind: "reps", reps: 10, sides: true },
  doseLabel: "10 je Seite",
  aha: "Ein elastischer Absatz kommt aus dem Sprunggelenk, das nachgeben kann. Wer die Ferse mit Kraft herunterdrückt, macht das Gelenk fest – das Bein rutscht dann eher nach vorn.",
  transfer: "Im Leichttraben beim Einsitzen kurz spüren, ob das Gewicht in den Bügel sinkt. Den Absatz nicht aktiv herunterdrücken.",
  easier: "Den Fuß näher an die Wand stellen.",
  anim: {
    view: "side",
    props: [{ k: "wall", x: WALL_R }],
    frames: [
      f(0, k2w([196, 139]), "Startposition: Fuß flach vor der Wand"),
      f(1, k2w([196, 139])),
      f(3, k2w([214, 156], { tr: 8 }), "Knie Richtung Wand – Ferse bleibt unten"),
      f(3.8, k2w([214, 156], { tr: 8 })),
      f(5.8, k2w([196, 139]), "Zurück"),
      f(6.4, k2w([196, 139])),
    ],
    overlays: [
      { k: "ring", at: "he1", r: 9, tone: "ok" },
      { k: "text", at: "he1", o: [-64, -22], text: "Ferse bleibt unten" },
      { k: "ring", at: "an1", r: 10, tone: "hint", from: 1, to: 4.2 },
      { k: "arrow", at: "kn1", o: [10, -14], d: [18, 0], tone: "hint", from: 1, to: 3.2 },
    ],
    mistake: {
      label: "Ferse hebt ab",
      text: "Das Knie erreicht die Wand nur, weil die Ferse hochgeht. Dann bewegt sich das Sprunggelenk kaum. Fuß lieber näher an die Wand stellen.",
      frames: [
        f(0, k2w([196, 139])),
        f(2.4, k2w([212, 148], { l1: footL([240, 214], 64) }), "Ferse hebt ab"),
        f(3.6, k2w([212, 148], { l1: footL([240, 214], 64) })),
        f(5.4, k2w([196, 139])),
      ],
      overlays: [{ k: "ring", at: "he1", r: 9, tone: "bad", from: 1.6, to: 4.2 }],
    },
  },
};

/* Knie weich, Bein lang: aufrecht sitzen */
const ex04: Exercise = {
  id: "rl-04",
  slug: "knie-weich-bein-lang",
  number: 4,
  title: "Knie weich, Bein lang",
  goal: "Für klemmende Oberschenkel: den Unterschied zwischen stabiler Muskelarbeit und Festhalten spüren lernen.",
  steps: [
    "Aufrecht auf einen stabilen Stuhl setzen, Füße hüftbreit am Boden.",
    "Die Oberschenkelmuskeln kurz bewusst anspannen.",
    "Die Spannung wieder lösen.",
    "Die Beine schwer und locker hängen lassen – kurz nachspüren.",
  ],
  dose: { kind: "reps", reps: 8 },
  doseLabel: "8 Wiederholungen",
  aha: "Ein ruhiges Bein ist nicht schlaff, aber auch nicht festgehalten. Wer den Unterschied zwischen „anspannen“ und „loslassen“ deutlich spürt, merkt im Sattel schneller, wann er klemmt.",
  transfer: "Im Schritt einmal kurz die Oberschenkel anspannen und wieder lösen – nur im Schritt und wenn dein Reitlehrer einverstanden ist. Spüre, wie das Bein danach tiefer liegt.",
  anim: {
    view: "side",
    props: [CHAIR],
    frames: [
      f(0, sit({}), "Aufrecht sitzen"),
      f(1, sit({})),
      f(2, sit({ l1: footL([208, 220], 98), l2: footL([202, 220], 98) }), "Oberschenkel kurz anspannen"),
      f(3.4, sit({ l1: footL([208, 220], 98), l2: footL([202, 220], 98) })),
      f(4.4, sit({}), "Spannung lösen"),
      f(5.4, sit({ l1: footL([198, 224]), l2: footL([192, 224]) }), "Beine locker hängen lassen"),
      f(8, sit({})),
    ],
    overlays: [
      { k: "glow", a: "hip", b: "kn1", w: 18, pulse: true, tone: "bad", from: 1.6, to: 3.8 },
      { k: "text", at: "kn1", o: [10, -30], text: "angespannt", tone: "bad", from: 1.8, to: 3.8 },
      { k: "glow", a: "hip", b: "kn1", w: 18, tone: "ok", from: 4.6, to: 7.6 },
      { k: "text", at: "kn1", o: [10, -30], text: "locker", from: 4.6, to: 7.6 },
      { k: "arrow", at: "an1", o: [18, -20], d: [0, 14], from: 5, to: 7.4 },
    ],
    mistake: {
      label: "klemmen statt anspannen",
      text: "Die Oberschenkel ziehen nach oben, Knie drücken zusammen, Schultern gehen mit hoch. So fühlt sich Klemmen an – das Bein wird kürzer.",
      frames: [
        f(0, sit({})),
        f(1.6, sit({ tr: -4, shUp: 4, l1: footL([194, 214], 84), l2: footL([188, 214], 84) }), "Bein zieht hoch, alles wird fest"),
        f(4, sit({ tr: -4, shUp: 4, l1: footL([194, 214], 84), l2: footL([188, 214], 84) })),
        f(5.6, sit({})),
      ],
      overlays: [
        { k: "glow", a: "hip", b: "kn1", w: 18, pulse: true, tone: "bad", from: 1.2 },
        { k: "ring", at: "sh", r: 10, tone: "bad", from: 1.4, to: 4.2 },
      ],
    },
  },
};

/* ========================================================================
   BEREICH 2 – LEICHTTRABEN
   ======================================================================== */

const edge = (o: Partial<Pose> = {}): Pose => ({
  hip: [164, 178],
  tr: 12,
  arch: 3,
  l1: footL([210, 224]),
  l2: footL([204, 224]),
  ...reins(212, 150),
  ...o,
});
const ex05: Exercise = {
  id: "rl-05",
  slug: "mini-leichttrab",
  number: 5,
  title: "Mini-Leichttrab am Stuhl",
  goal: "Für zu hohes Aufstehen und schweres Zurückfallen: eine kleine, kontrollierte Hüftbewegung üben statt eines großen Aufstehens.",
  steps: [
    "Vorn auf die Kante eines stabilen Stuhls setzen, Füße stabil unter den Knien.",
    "Den Oberkörper leicht aus der Hüfte nach vorn neigen.",
    "Das Gesäß nur wenige Zentimeter anheben.",
    "Kontrolliert und leise wieder absetzen.",
  ],
  dose: { kind: "reps", reps: 8, sets: 2 },
  doseLabel: "2 × 8",
  aha: "Im Leichttraben hebt dich das Pferd an – du musst nicht aufstehen. Die Bewegung ist klein und geht nach vorn-oben, die Hüfte öffnet sich nur ein Stück.",
  transfer: "Beim nächsten Leichttraben an „wenige Zentimeter“ denken und leise einsitzen, als säße ein rohes Ei im Sattel.",
  easier: "Hände auf die Oberschenkel legen statt vor den Körper.",
  anim: {
    view: "side",
    props: [CHAIR],
    repsPerLoop: 1,
    frames: [
      f(0, edge(), "Sitzen – Füße unter den Knien"),
      f(1.2, edge({ hip: [171, 169], tr: 15, ...reins(214, 146) }), "Gesäß wenige Zentimeter anheben"),
      f(1.8, edge({ hip: [171, 169], tr: 15, ...reins(214, 146) })),
      f(3, edge(), "Kontrolliert absetzen"),
      f(3.6, edge()),
    ],
    overlays: [
      { k: "plumb", at: "cog", tone: "ok" },
      { k: "arrow", at: "hip", o: [-30, 4], d: [6, -14], tone: "hint", from: 0.1, to: 1.2 },
      { k: "arrow", at: "hip", o: [-24, -10], d: [-6, 14], tone: "hint", from: 1.9, to: 3 },
      { k: "text", at: "hip", o: [-46, -30], text: "nur wenige cm", from: 0.8, to: 2.2 },
    ],
    mistake: {
      label: "ganz aufstehen",
      text: "Wer im Leichttraben ganz aufsteht, kommt hinter die Bewegung und fällt beim Einsitzen schwer in den Sattel. Die Knie rutschen dabei oft hoch.",
      frames: [
        f(0, edge()),
        f(1.4, { ...STAND, hip: [190, 136], tr: 8, ...reins(222, 128) }, "zu hoch aufstehen"),
        f(2, { ...STAND, hip: [190, 136], tr: 8, ...reins(222, 128) }),
        f(2.6, edge({ hip: [164, 180] }), "schwer zurückfallen"),
        f(3.6, edge()),
      ],
      overlays: [{ k: "plumb", at: "cog", tone: "bad" }],
    },
  },
};

const soft = (dy: number, o: Partial<Pose> = {}): Pose =>
  st({ hip: [178 - dy * 0.15, 136 + dy], l1: footL([186, 224]), l2: footL([179, 224]), tr: 4, ...reins(206, 128), ...o });
const ex06: Exercise = {
  id: "rl-06",
  slug: "rhythmus-trainer",
  number: 6,
  title: "Der Rhythmus-Trainer",
  goal: "Für unruhiges Leichttraben: Takt und kleine, gleichmäßige Bewegungen aus Knie und Hüfte entwickeln.",
  steps: [
    "Hüftbreit stehen, Knie leicht gebeugt.",
    "Hände vor dem Körper halten wie mit Zügeln.",
    "Im Zweiertakt klein nachfedern: eins – zwei, eins – zwei.",
    "Die Hände bleiben dabei möglichst ruhig.",
  ],
  dose: { kind: "time", seconds: 30 },
  doseLabel: "30 Sekunden",
  aha: "Der Trab hat einen gleichmäßigen Zweitakt. Wer ihn im Körper hat, muss im Sattel nicht mehr „mitrechnen“ – und kann die Bewegung klein halten.",
  transfer: "Im Trab leise „eins – zwei“ mitzählen und beim Leichttraben im selben Takt aufstehen und einsitzen.",
  anim: {
    view: "side",
    repsPerLoop: 2,
    beats: [
      { t: 0.5, text: "eins" },
      { t: 1.5, text: "zwei" },
    ],
    frames: [
      f(0, soft(0), "Kleine Bewegung im Zweitakt"),
      f(0.5, soft(6)),
      f(1, soft(0)),
      f(1.5, soft(6)),
      f(2, soft(0)),
    ],
    overlays: [
      { k: "trace", at: "ha1", tone: "ok" },
      { k: "text", at: "ha1", o: [30, -20], text: "Hände ruhig" },
      { k: "ring", at: "kn1", r: 9, tone: "hint" },
    ],
    mistake: {
      label: "mit dem Oberkörper pumpen",
      text: "Knie bleiben steif, der Oberkörper schaukelt vor und zurück – die Hände wandern mit. So entsteht im Sattel Unruhe statt Takt.",
      frames: [
        f(0, st({ hip: [180, 133], tr: 0, a1: { a: 30, el: 60 }, a2: { a: 28, el: 58 } })),
        f(0.5, st({ hip: [180, 133], tr: 14, arch: -4, a1: { a: 30, el: 60 }, a2: { a: 28, el: 58 } })),
        f(1, st({ hip: [180, 133], tr: 0, a1: { a: 30, el: 60 }, a2: { a: 28, el: 58 } })),
        f(1.5, st({ hip: [180, 133], tr: 14, arch: -4, a1: { a: 30, el: 60 }, a2: { a: 28, el: 58 } })),
        f(2, st({ hip: [180, 133], tr: 0, a1: { a: 30, el: 60 }, a2: { a: 28, el: 58 } })),
      ],
      overlays: [{ k: "trace", at: "ha1", tone: "bad" }],
    },
  },
};

const crossed = { a1: { hand: [176, 104] as P, side: -1 as const }, a2: { hand: [172, 106] as P, side: -1 as const } };
const sts = (hip: P, tr: number, o: Partial<Pose> = {}): Pose => ({
  hip,
  tr,
  arch: 3,
  l1: footL([196, 224]),
  l2: footL([190, 224]),
  a1: { hand: add2(hip, tr, [22, -46]), side: -1 },
  a2: { hand: add2(hip, tr, [18, -44]), side: -1 },
  ...o,
});
/** Hand vor der Brust, dreht mit dem Rumpf */
function add2(hip: P, tr: number, v: P): P {
  const r = (tr * Math.PI) / 180;
  return [hip[0] + v[0] * Math.cos(r) - v[1] * Math.sin(r), hip[1] + v[0] * Math.sin(r) + v[1] * Math.cos(r)];
}
const ex07: Exercise = {
  id: "rl-07",
  slug: "aufstehen-ohne-schwung",
  number: 7,
  title: "Aufstehen ohne Schwung",
  goal: "Für schweres Zurückfallen in den Sattel: die Bewegung über Beine und Hüfte steuern, statt sich mit Schwung nach vorn zu werfen.",
  steps: [
    "Auf einen stabilen Stuhl setzen, Füße hüftbreit und etwas hinter den Knien.",
    "Den Oberkörper aus der Hüfte nach vorn neigen, bis das Gewicht über den Füßen ist.",
    "Langsam aufstehen – ohne Schwung aus den Armen.",
    "Genauso langsam wieder hinsetzen, ohne zu plumpsen.",
  ],
  dose: { kind: "reps", reps: 10, sets: 2 },
  doseLabel: "2 × 10",
  aha: "Entscheidend ist der Schwerpunkt über den Füßen. Liegt er dort, brauchst du keinen Schwung – und kannst auch das Hinsetzen bremsen. Genau das fehlt, wenn man im Leichttraben in den Sattel fällt.",
  transfer: "Beim Einsitzen im Leichttraben bewusst „bremsen“: Die Oberschenkel tragen dich zurück in den Sattel.",
  easier: "Eine höhere Sitzfläche nehmen (z. B. ein Kissen auf den Stuhl).",
  anim: {
    view: "side",
    props: [CHAIR],
    frames: [
      f(0, sts([150, 178], 0), "Aufrecht sitzen"),
      f(1.6, sts([154, 176], 32), "Oberkörper vor – Gewicht über die Füße"),
      f(4, sts([186, 134], 2), "Langsam aufstehen"),
      f(5, sts([186, 134], 2)),
      f(7.4, sts([160, 170], 30), "Kontrolliert hinsetzen"),
      f(8.6, sts([150, 178], 4)),
      f(10, sts([150, 178], 0)),
    ],
    overlays: [
      { k: "plumb", at: "cog", tone: "ok" },
      { k: "glow", a: "hip", b: "kn1", w: 16, pulse: true, tone: "hint", from: 1.6, to: 4 },
      { k: "glow", a: "hip", b: "kn1", w: 16, pulse: true, tone: "hint", from: 5.2, to: 8.4 },
      { k: "text", at: "an1", o: [0, -100], text: "Schwerpunkt über den Füßen", from: 1.4, to: 4.4 },
    ],
    mistake: {
      label: "Schwung holen und zurückplumpsen",
      text: "Mit Armschwung nach vorn werfen und beim Hinsetzen einfach fallen lassen. Der Schwerpunkt ist erst hinter, dann vor den Füßen – die Bewegung ist nicht kontrolliert.",
      frames: [
        f(0, sts([150, 178], 0, crossed)),
        f(0.8, sts([148, 179], -6, { a1: { a: -30, el: 10 }, a2: { a: -34, el: 10 } }), "Schwung holen"),
        f(1.4, sts([160, 174], 50, { a1: { a: 110, el: 0 }, a2: { a: 104, el: 0 } })),
        f(2.1, sts([186, 134], 2)),
        f(3.6, sts([186, 134], 2)),
        f(4.1, sts([152, 179], -4), "zurückplumpsen"),
        f(5.6, sts([150, 178], 0)),
      ],
      overlays: [{ k: "plumb", at: "cog", tone: "bad" }],
    },
  },
};

const ex08: Exercise = {
  id: "rl-08",
  slug: "ruhige-haende-beim-aufstehen",
  number: 8,
  title: "Ruhige Hände beim Aufstehen",
  goal: "Für Hände, die im Leichttraben mit nach oben gehen: Oberkörper, Arme und Beine unabhängig voneinander bewegen.",
  steps: [
    "Vorn auf einen stabilen Stuhl setzen, Hände vor dem Körper wie mit Zügeln.",
    "Schultern locker sinken lassen.",
    "Eine kleine, kontrollierte Aufstehbewegung machen.",
    "Die Hände bleiben möglichst an derselben Stelle – die Ellbogen geben nach.",
  ],
  dose: { kind: "reps", reps: 8, sets: 2 },
  doseLabel: "2 × 8",
  aha: "Die Hände bleiben ruhig, weil sich die Ellbogen öffnen und schließen. Wer die Arme festhält, nimmt jede Bewegung des Körpers mit – im Sattel landet sie im Pferdemaul.",
  transfer: "Beim Leichttraben einmal nur auf die Hände achten: Bleiben sie über dem Widerrist, oder gehen sie mit nach oben?",
  anim: {
    view: "side",
    props: [CHAIR],
    frames: [
      f(0, edge(), "Sitzen, Hände wie mit Zügeln"),
      f(1.6, edge({ hip: [176, 162], tr: 16 }), "Klein aufstehen – Hände bleiben stehen"),
      f(2.2, edge({ hip: [176, 162], tr: 16 })),
      f(3.6, edge(), "Kontrolliert zurück"),
      f(4.2, edge()),
    ],
    overlays: [
      { k: "trace", at: "ha1", tone: "ok" },
      { k: "ring", at: "el1", r: 9, tone: "hint" },
      { k: "text", at: "el1", o: [-44, 22], text: "Ellbogen gibt nach" },
    ],
    mistake: {
      label: "Hände gehen mit nach oben",
      text: "Arme und Schultern sind fest, deshalb wandern die Hände mit dem Körper nach oben und unten. Im Sattel zupft das bei jedem Trabtritt am Pferdemaul.",
      frames: [
        f(0, edge({ a1: { a: 34, el: 64 }, a2: { a: 32, el: 62 } })),
        f(1.6, edge({ hip: [176, 162], tr: 16, shUp: 5, a1: { a: 34, el: 64 }, a2: { a: 32, el: 62 } }), "Hände wandern mit"),
        f(2.2, edge({ hip: [176, 162], tr: 16, shUp: 5, a1: { a: 34, el: 64 }, a2: { a: 32, el: 62 } })),
        f(3.6, edge({ a1: { a: 34, el: 64 }, a2: { a: 32, el: 62 } })),
        f(4.2, edge({ a1: { a: 34, el: 64 }, a2: { a: 32, el: 62 } })),
      ],
      overlays: [{ k: "trace", at: "ha1", tone: "bad" }],
    },
  },
};

/* ========================================================================
   BEREICH 3 – GALOPP
   ======================================================================== */

const clk = (deg: number, o: Partial<Pose> = {}): Pose => {
  const r = (deg * Math.PI) / 180;
  const fwd = Math.cos(r); // 12 Uhr = vorn
  return sit({ pt: 11 * fwd, arch: 3 + 5 * fwd, hip: [150 + 1.5 * fwd, 178], tr: -1.5 * fwd, ...o, x: { clk: deg } });
};
const ex09: Exercise = {
  id: "rl-09",
  slug: "beckenuhr",
  number: 9,
  title: "Die Beckenuhr",
  goal: "Für das Hüpfen im Galoppsattel: das Becken in kleinen Bewegungen wahrnehmen und beweglich machen.",
  steps: [
    "Aufrecht auf einen stabilen Stuhl setzen, Füße hüftbreit.",
    "Stell dir unter dem Becken eine Uhr vor: 12 Uhr vorn, 6 Uhr hinten.",
    "Das Becken sanft nach vorn, zur Seite, nach hinten und zur anderen Seite bewegen.",
    "Daraus kleine, ruhige Kreise machen – in beide Richtungen.",
  ],
  dose: { kind: "time", seconds: 60 },
  doseLabel: "60 Sekunden",
  aha: "Die Bewegung ist viel kleiner, als man denkt. Der Oberkörper bleibt ruhig über dem Becken – genau so geht das Becken im Galopp mit, ohne dass der Oberkörper schaukelt.",
  transfer: "Im Galopp nicht „mitschieben“. Denk lieber an eine kleine, weiche Beckenbewegung – und lass dich von deiner Reitlehrkraft korrigieren.",
  viewNote: "Seitenansicht plus Uhr von oben: Seitlich sieht man das Kippen nach vorn und hinten, die Uhr zeigt den ganzen Kreis.",
  anim: {
    view: "side",
    props: [CHAIR],
    frames: [
      f(0, clk(0), "12 Uhr: Becken kippt leicht nach vorn"),
      f(2, clk(90), "3 Uhr: zur Seite"),
      f(4, clk(180), "6 Uhr: Becken kippt leicht nach hinten"),
      f(6, clk(270), "9 Uhr: zur anderen Seite"),
      f(8, clk(360)),
    ],
    overlays: [
      { k: "pelvis", tone: "hint" },
      { k: "spine", tone: "ok" },
      { k: "clock", at: [298, 74] },
      { k: "text", at: "head", o: [0, -26], text: "Oberkörper bleibt ruhig" },
    ],
    mistake: {
      label: "Oberkörper schaukelt mit",
      text: "Statt des Beckens bewegt sich der ganze Oberkörper vor und zurück. Im Galopp führt genau das zum Schaukeln und Hüpfen.",
      frames: [
        f(0, clk(0, { tr: 12, arch: 0 })),
        f(2, clk(90, { tr: 0 })),
        f(4, clk(180, { tr: -12, arch: 2 })),
        f(6, clk(270, { tr: 0 })),
        f(8, clk(360, { tr: 12, arch: 0 })),
      ],
      overlays: [
        { k: "clock", at: [298, 74], tone: "bad" },
        { k: "ring", at: "head", r: 15, tone: "bad" },
      ],
    },
  },
};

const ex10: Exercise = {
  id: "rl-10",
  slug: "beckenkippen-rueckenlage",
  number: 10,
  title: "Beckenkippen in Rückenlage",
  goal: "Für ein festes Becken im Galopp: Beweglichkeit im unteren Rücken und Becken üben – ohne übermäßiges Hohlkreuz.",
  steps: [
    "Auf den Rücken legen, Knie angewinkelt, Füße hüftbreit aufgestellt.",
    "Das Becken langsam nach vorn kippen: unter dem unteren Rücken entsteht ein kleiner Bogen.",
    "Das Becken langsam zurückkippen: der untere Rücken legt sich sanft auf den Boden.",
    "Ruhig weiteratmen, die Bewegung bleibt klein.",
  ],
  dose: { kind: "reps", reps: 12 },
  doseLabel: "12 Wiederholungen",
  aha: "Das Becken kippt, die Wirbelsäule folgt – ein kleines Wechselspiel. Am Boden spürst du es besonders deutlich, weil der Rücken dir Rückmeldung gibt.",
  transfer: "Im Aussitzen nicht ins Hohlkreuz drücken. Denk an die kleine, weiche Bewegung vom Boden.",
  anim: {
    view: "side",
    props: [{ k: "mat", x0: 90, x1: 290 }],
    frames: [
      f(0, sup({}), "Rückenlage, Füße aufgestellt"),
      f(1.5, sup({ arch: 9, pt: 12 }), "Becken nach vorn – kleiner Bogen"),
      f(3, sup({})),
      f(4.5, sup({ arch: -1, pt: -12 }), "Becken zurück – Rücken legt sich ab"),
      f(6, sup({})),
    ],
    overlays: [
      { k: "spine", tone: "ok" },
      { k: "pelvis", tone: "hint" },
      { k: "text", at: "mid", o: [-20, -40], text: "kleine Bewegung" },
    ],
    mistake: {
      label: "starkes Hohlkreuz, Gesäß hebt ab",
      text: "Die Bewegung wird zu groß: Das Gesäß hebt ab und der untere Rücken macht ein starkes Hohlkreuz. Das belastet den Rücken und hat mit der feinen Beckenbewegung im Sattel nichts zu tun.",
      frames: [
        f(0, sup({})),
        f(1.5, sup({ arch: 17, pt: 22 }), "zu starkes Hohlkreuz"),
        f(3, sup({})),
        f(4.5, sup({ hip: [200, 210], tr: -98, neck: 8, arch: 0, pt: -18 }), "Gesäß hebt ab"),
        f(6, sup({})),
      ],
      overlays: [
        { k: "spine", tone: "bad" },
        { k: "pelvis", tone: "bad" },
      ],
    },
  },
};

const bridge = (o: Partial<Pose> = {}): Pose => sup({ hip: [205, 190], tr: -117, neck: 27, arch: 1, ...o });
const ex11: Exercise = {
  id: "rl-11",
  slug: "glute-bridge-march",
  number: 11,
  title: "Glute Bridge March",
  goal: "Für einen instabilen Sitz im Galopp: Rumpf und Becken stabil halten, während sich die Beine unabhängig bewegen.",
  steps: [
    "Rückenlage, Knie angewinkelt, Füße hüftbreit aufgestellt.",
    "Das Becken kontrolliert anheben, bis Knie, Hüfte und Schultern eine Linie bilden.",
    "Abwechselnd einen Fuß nur leicht vom Boden lösen.",
    "Das Becken bleibt dabei waagerecht und oben.",
  ],
  dose: { kind: "reps", reps: 8, sides: true },
  doseLabel: "8 je Seite",
  aha: "Die Schwierigkeit ist nicht das Anheben, sondern das Becken ruhig zu halten, wenn ein Bein loslässt. Im Sattel ist es genauso: Dein Bein soll treiben können, ohne dass der Sitz wackelt.",
  transfer: "Beim Treiben im Galopp darauf achten, ob dein Becken ruhig bleibt oder ob du mit dem ganzen Körper schiebst.",
  easier: "Nur das Becken anheben und halten, ohne die Füße zu lösen.",
  anim: {
    view: "side",
    props: [{ k: "mat", x0: 90, x1: 290 }],
    frames: [
      f(0, sup({}), "Rückenlage, Füße hüftbreit"),
      f(1.4, bridge(), "Becken kontrolliert anheben"),
      f(2.2, bridge()),
      f(3.2, bridge({ l1: footL([252, 211]) }), "Einen Fuß leicht lösen"),
      f(4, bridge()),
      f(4.8, bridge({ l2: footL([246, 211]) }), "Andere Seite"),
      f(5.6, bridge()),
      f(6.6, bridge()),
      f(8, sup({}), "Langsam ablegen"),
    ],
    overlays: [
      { k: "level", a: [150, 190], b: [262, 190], ext: 0, tone: "ok", from: 1.6, to: 6.6 },
      { k: "text", at: [206, 160], text: "Becken bleibt oben", from: 1.6, to: 6.6 },
      { k: "glow", a: ["hip", 2, 10], b: ["hip", 14, 4], w: 16, pulse: true, tone: "hint", from: 1.4, to: 6.6 },
    ],
    mistake: {
      label: "Becken sackt ab",
      text: "Sobald ein Fuß den Boden verlässt, sackt das Becken ab oder kippt zur Seite. Dann lieber nur halten, bis es ruhig bleibt.",
      frames: [
        f(0, sup({})),
        f(1.4, bridge()),
        f(2.4, bridge({ hip: [205, 202], tr: -110, neck: 20, l1: footL([252, 211]) }), "Becken sackt ab"),
        f(3.4, bridge()),
        f(4.4, bridge({ hip: [205, 202], tr: -110, neck: 20, l2: footL([246, 211]) })),
        f(5.4, bridge()),
        f(6.8, sup({})),
      ],
      overlays: [{ k: "level", a: [150, 190], b: [262, 190], ext: 0, tone: "bad", from: 1.4, to: 5.6 }],
    },
  },
};

const bug = (o: Partial<Pose> = {}): Pose =>
  sup({
    l1: { th: 180, kn: 90, footAbs: 180 },
    l2: { th: 176, kn: 88, footAbs: 178 },
    a1: { a: 180, el: 0 },
    a2: { a: 176, el: 0 },
    arch: 2,
    ...o,
  });
const ex12: Exercise = {
  id: "rl-12",
  slug: "dead-bug",
  number: 12,
  title: "Dead Bug",
  goal: "Für einen Sitz, der nicht unabhängig ist: Arme und Beine koordiniert bewegen, während der Rumpf ruhig bleibt.",
  steps: [
    "Rückenlage, Arme zur Decke, Beine angehoben: Knie über der Hüfte, Unterschenkel waagerecht.",
    "Den unteren Rücken sanft Richtung Boden sinken lassen.",
    "Gegengleich einen Arm über den Kopf und das andere Bein nach vorn langsam strecken.",
    "Zurück zur Mitte, dann die andere Seite.",
  ],
  dose: { kind: "reps", reps: 8, sides: true },
  doseLabel: "8 je Seite",
  aha: "Ob die Übung gelingt, entscheidet der untere Rücken: Bleibt er am Boden, arbeitet der Rumpf. Hebt er ab, übernimmt das Hohlkreuz – genau wie im Sattel, wenn Arme und Beine den Sitz durcheinanderbringen.",
  transfer: "Beim Treiben oder Nachgeben mit einer Hand kurz prüfen: Bleibt dein Oberkörper ruhig, oder reagiert er mit?",
  easier: "Nur das Bein bewegen und die Arme oben lassen – oder nur die Ferse Richtung Boden tippen.",
  viewNote: "Seitenansicht statt Draufsicht: Nur so sieht man, ob der untere Rücken am Boden bleibt. Das vordere Bein und der hintere Arm sind ein Paar.",
  anim: {
    view: "side",
    props: [{ k: "mat", x0: 70, x1: 310 }],
    frames: [
      f(0, bug(), "Arme zur Decke, Beine im 90°-Winkel"),
      f(1.8, bug({ a2: { a: 262, el: 0 }, l1: { th: 102, kn: 8, footAbs: 160 } }), "Gegengleich strecken: Arm und Bein"),
      f(2.6, bug({ a2: { a: 262, el: 0 }, l1: { th: 102, kn: 8, footAbs: 160 } })),
      f(4, bug(), "Zurück zur Mitte"),
      f(5.8, bug({ a1: { a: 262, el: 0 }, l2: { th: 102, kn: 8, footAbs: 160 } }), "Andere Seite"),
      f(6.6, bug({ a1: { a: 262, el: 0 }, l2: { th: 102, kn: 8, footAbs: 160 } })),
      f(8, bug()),
    ],
    repsPerLoop: 1,
    overlays: [
      { k: "spine", tone: "ok" },
      { k: "text", at: "mid", o: [0, 24], text: "Rücken bleibt am Boden" },
      { k: "arrow", at: "ha2", o: [-6, 4], d: [-18, 10], tone: "hint", from: 0.2, to: 1.8 },
      { k: "arrow", at: "an1", o: [8, 4], d: [18, 12], tone: "hint", from: 0.2, to: 1.8 },
      { k: "arrow", at: "ha1", o: [-6, 4], d: [-18, 10], tone: "hint", from: 4.2, to: 5.8 },
      { k: "arrow", at: "an2", o: [8, 4], d: [18, 12], tone: "hint", from: 4.2, to: 5.8 },
    ],
    mistake: {
      label: "Hohlkreuz beim Strecken",
      text: "Beim Strecken hebt der untere Rücken vom Boden ab. Dann ist die Bewegung zu groß – Bein weniger weit strecken.",
      frames: [
        f(0, bug()),
        f(1.8, bug({ arch: 15, pt: 14, a2: { a: 262, el: 0 }, l1: { th: 100, kn: 0, footAbs: 150 } }), "unterer Rücken hebt ab"),
        f(2.8, bug({ arch: 15, pt: 14, a2: { a: 262, el: 0 }, l1: { th: 100, kn: 0, footAbs: 150 } })),
        f(4.2, bug()),
      ],
      overlays: [
        { k: "spine", tone: "bad" },
        { k: "ring", at: ["mid", 4, 10], r: 12, tone: "bad", from: 1.2, to: 3.2 },
      ],
    },
  },
};

/* ========================================================================
   BEREICH 4 – DIE RUHIGE HAND
   ======================================================================== */

const glassPose = (dy: number, o: Partial<Pose> = {}): Pose =>
  st({
    hip: [180 - dy * 0.5, 133 + dy],
    tr: dy * 0.9,
    l1: footL([186, 224]),
    l2: footL([179, 224]),
    a1: { hand: [208, 112 + dy * 0.7], side: -1 },
    a2: { hand: [205, 113 + dy * 0.7], side: -1 },
    x: { gl: 0, slosh: 0 },
    ...o,
  });
const ex13: Exercise = {
  id: "rl-13",
  slug: "wasserglas-challenge",
  number: 13,
  title: "Die Wasserglas-Challenge",
  goal: "Für Hände, die beim Reiten mitwackeln: Hände und Oberkörper getrennt voneinander steuern.",
  steps: [
    "Ein halb gefülltes, bruchsicheres Gefäß (z. B. Plastikbecher) mit beiden Händen vor dem Körper halten.",
    "Kleine Kniebeugen machen.",
    "Die Hände dabei so ruhig führen, dass das Wasser nicht schwappt.",
    "Langsam bleiben – Tempo macht es schwerer.",
  ],
  dose: { kind: "reps", reps: 10 },
  doseLabel: "10 Wiederholungen",
  aha: "Das Wasser zeigt sofort, was die Hände tun. Ruhige Hände sind keine festen Hände: Die Arme gleichen die Bewegung des Körpers aus.",
  transfer: "Stell dir beim nächsten Trab vor, du trägst das Glas in den Händen.",
  caution: "Nur mit bruchsicherem Gefäß üben.",
  anim: {
    view: "side",
    props: [{ k: "glass" }],
    frames: [
      f(0, glassPose(0), "Gefäß mit beiden Händen halten"),
      f(1.6, glassPose(16), "Kleine Kniebeuge"),
      f(2.2, glassPose(16)),
      f(3.6, glassPose(0), "Hände ruhig führen"),
      f(4.2, glassPose(0)),
    ],
    overlays: [
      { k: "trace", at: "ha1", tone: "ok" },
      { k: "text", at: "ha1", o: [74, -14], text: "Wasser bleibt ruhig" },
    ],
    mistake: {
      label: "Gefäß kippt, Wasser schwappt",
      text: "Die Hände gehen mit dem Körper mit und kippen. Im Sattel spürt das Pferd jede dieser Bewegungen im Maul.",
      frames: [
        f(0, glassPose(0)),
        f(0.8, glassPose(8, { a1: { hand: [212, 124], side: -1 }, a2: { hand: [209, 125], side: -1 }, x: { gl: 14, slosh: 5 } })),
        f(1.6, glassPose(16, { a1: { hand: [206, 136], side: -1 }, a2: { hand: [203, 137], side: -1 }, x: { gl: -10, slosh: -5 } }), "Hände wackeln mit"),
        f(2.4, glassPose(16, { a1: { hand: [210, 126], side: -1 }, a2: { hand: [207, 127], side: -1 }, x: { gl: 12, slosh: 4 } })),
        f(3.4, glassPose(4, { a1: { hand: [206, 108], side: -1 }, a2: { hand: [203, 109], side: -1 }, x: { gl: -8, slosh: -4 } })),
        f(4.2, glassPose(0)),
      ],
      overlays: [{ k: "trace", at: "ha1", tone: "bad" }],
    },
  },
};

const elbow = (hx: number, o: Partial<Pose> = {}): Pose =>
  st({ a1: { hand: [hx, 120], side: -1 }, a2: { hand: [hx - 3, 121], side: -1 }, ...o });
const ex14: Exercise = {
  id: "rl-14",
  slug: "elastischer-ellbogen",
  number: 14,
  title: "Der elastische Ellbogen",
  goal: "Für starre Arme: Der Ellbogen ist das Gelenk, das die Bewegung zwischen Körper und Pferdemaul ausgleicht.",
  steps: [
    "Aufrecht stehen, Oberarme hängen locker am Körper.",
    "Die Unterarme nach vorn nehmen, Hände wie mit Zügeln.",
    "Die Unterarme langsam vor- und zurückbewegen – der Ellbogen öffnet und schließt sich.",
    "Die Schultern bleiben dabei unten und entspannt.",
  ],
  dose: { kind: "reps", reps: 12 },
  doseLabel: "12 Wiederholungen",
  aha: "Eine ruhige Hand ist beweglich, nicht starr. Im Schritt nickt das Pferd mit dem Kopf – die Hand geht mit, weil der Ellbogen nachgibt.",
  transfer: "Im Schritt spüren, wie der Ellbogen die Nickbewegung des Pferdes mitgeht, ohne dass die Schultern arbeiten.",
  anim: {
    view: "side",
    frames: [
      f(0, elbow(205), "Ellbogen locker am Körper"),
      f(1, elbow(214), "Unterarm vor – Ellbogen öffnet"),
      f(2, elbow(205)),
      f(3, elbow(197), "Unterarm zurück – Ellbogen schließt"),
      f(4, elbow(205)),
    ],
    overlays: [
      { k: "ring", at: "el1", r: 9, tone: "ok" },
      { k: "arrow", at: "ha1", o: [8, -12], d: [16, 0], tone: "hint", from: 0, to: 1.1 },
      { k: "arrow", at: "ha1", o: [-8, -12], d: [-16, 0], tone: "hint", from: 2, to: 3.1 },
      { k: "text", at: "sh", o: [-50, -18], text: "Schultern unten" },
    ],
    mistake: {
      label: "Schultern hoch, Arm schwingt aus der Schulter",
      text: "Der Ellbogen bleibt fest, stattdessen bewegt sich der ganze Arm aus der Schulter, und die Schultern ziehen nach oben. So wird die Hand unruhig.",
      frames: [
        f(0, st({ shUp: 5, a1: { a: 24, el: 70 }, a2: { a: 22, el: 70 } })),
        f(1, st({ shUp: 6, a1: { a: 44, el: 70 }, a2: { a: 42, el: 70 } }), "ganzer Arm schwingt"),
        f(2, st({ shUp: 5, a1: { a: 24, el: 70 }, a2: { a: 22, el: 70 } })),
        f(3, st({ shUp: 6, a1: { a: 6, el: 70 }, a2: { a: 4, el: 70 } })),
        f(4, st({ shUp: 5, a1: { a: 24, el: 70 }, a2: { a: 22, el: 70 } })),
      ],
      overlays: [
        { k: "ring", at: "sh", r: 10, tone: "bad" },
        { k: "trace", at: "ha1", tone: "bad" },
      ],
    },
  },
};

const slide = (u: number, o: Partial<Pose> = {}): Pose =>
  fr({ a1: { a: 90 + 58 * u, el: 90 - 68 * u }, a2: { a: 90 + 58 * u, el: 90 - 68 * u }, x: { sc: 26 * u }, ...o });
const ex15: Exercise = {
  id: "rl-15",
  slug: "wall-slides",
  number: 15,
  title: "Wall Slides",
  goal: "Für verspannte, hochgezogene Schultern: Schulterkontrolle und Beweglichkeit verbessern.",
  steps: [
    "Mit dem Rücken an eine Wand stellen, Füße eine Fußlänge davor.",
    "Arme wie ein Torpfosten an die Wand legen: Ellbogen auf Schulterhöhe.",
    "Die Arme kontrolliert an der Wand nach oben schieben – nur im angenehmen Bereich.",
    "Langsam zurück. Die Schultern bleiben weg von den Ohren.",
  ],
  dose: { kind: "reps", reps: 10 },
  doseLabel: "10 Wiederholungen",
  aha: "Wenn die Arme nach oben gehen, drehen die Schulterblätter mit – aber die Schultern müssen nicht zu den Ohren. Diese Trennung brauchst du, um im Sattel locker zu bleiben.",
  transfer: "Vor dem Antraben einmal die Schultern bewusst sinken lassen und ausatmen.",
  easier: "Etwas weiter von der Wand weg stehen oder die Arme nur halb hochschieben.",
  caution: "Nur im schmerzfreien Bereich bewegen. Bei Schulterbeschwerden vorher ärztlich abklären.",
  anim: {
    view: "front",
    props: [{ k: "backwall" }],
    frames: [
      f(0, slide(0), "Rücken und Arme an der Wand"),
      f(2.2, slide(1), "Arme langsam nach oben schieben"),
      f(2.8, slide(1)),
      f(5, slide(0), "Kontrolliert zurück"),
      f(5.4, slide(0)),
    ],
    overlays: [
      { k: "scapula", tone: "hint" },
      { k: "level", a: "sh1", b: "sh2", ext: 10, tone: "ok" },
      { k: "text", at: "hip", o: [0, 40], text: "Schultern bleiben unten" },
    ],
    mistake: {
      label: "Schultern zu den Ohren",
      text: "Die Arme kommen nur hoch, weil die Schultern nach oben ziehen. Dann lieber weniger hoch schieben.",
      frames: [
        f(0, slide(0)),
        f(2.2, slide(1, { shUp: 9, x: { sc: 8 } }), "Schultern ziehen hoch"),
        f(2.8, slide(1, { shUp: 9, x: { sc: 8 } })),
        f(5, slide(0)),
      ],
      overlays: [
        { k: "level", a: "sh1", b: "sh2", ext: 10, tone: "bad" },
        { k: "ring", at: "sh1", r: 9, tone: "bad", from: 1.2, to: 3.6 },
        { k: "ring", at: "sh2", r: 9, tone: "bad", from: 1.2, to: 3.6 },
      ],
    },
  },
};

const ex16: Exercise = {
  id: "rl-16",
  slug: "arme-frei-rumpf-stabil",
  number: 16,
  title: "Arme frei, Rumpf stabil",
  goal: "Für einen Oberkörper, der mit jeder Handbewegung mitgeht: Arme unabhängig vom Rumpf bewegen.",
  steps: [
    "Hüftbreit stehen, Knie locker.",
    "Einen Arm langsam nach vorn bis etwa auf Schulterhöhe heben.",
    "Zurück und mit dem anderen Arm abwechseln.",
    "Der Oberkörper bleibt ruhig – kein Zurücklehnen, kein Hohlkreuz.",
  ],
  dose: { kind: "reps", reps: 12 },
  doseLabel: "12 Wiederholungen",
  aha: "Der Rumpf ist das ruhige Zentrum. Wer beim Armheben nach hinten ausweicht, macht das im Sattel auch – zum Beispiel beim Nachgeben oder Anstellen.",
  transfer: "Beim Zügel-Nachfassen im Schritt prüfen: Bleibt dein Oberkörper ruhig?",
  anim: {
    view: "side",
    repsPerLoop: 2,
    frames: [
      f(0, st({}), "Hüftbreit stehen"),
      f(1.2, st({ a1: { a: 90, el: 4 } }), "Einen Arm nach vorn heben"),
      f(2, st({ a1: { a: 90, el: 4 } })),
      f(3, st({}), "Zurück"),
      f(4.2, st({ a2: { a: 90, el: 4 } }), "Anderer Arm"),
      f(5, st({ a2: { a: 90, el: 4 } })),
      f(6, st({})),
    ],
    overlays: [
      { k: "level", a: ["hip", -17, 0], b: ["sh", -17, 0], ext: 22, tone: "ok" },
      { k: "text", at: "mid", o: [-70, 0], text: "Rumpf bleibt ruhig" },
    ],
    mistake: {
      label: "Oberkörper lehnt zurück",
      text: "Mit dem Arm geht der Oberkörper nach hinten, im unteren Rücken entsteht ein Hohlkreuz. Arm lieber nur so hoch heben, wie der Rumpf ruhig bleibt.",
      frames: [
        f(0, st({})),
        f(1.2, st({ tr: -9, arch: 12, a1: { a: 100, el: 4 } }), "zurücklehnen, Hohlkreuz"),
        f(2, st({ tr: -9, arch: 12, a1: { a: 100, el: 4 } })),
        f(3, st({})),
        f(4.2, st({ tr: -9, arch: 12, a2: { a: 100, el: 4 } })),
        f(5, st({ tr: -9, arch: 12, a2: { a: 100, el: 4 } })),
        f(6, st({})),
      ],
      overlays: [{ k: "level", a: ["hip", -17, 0], b: ["sh", -17, 0], ext: 22, tone: "bad" }],
    },
  },
};

/* ========================================================================
   BEREICH 5 – LEICHTER SITZ
   ======================================================================== */

const hocke = (o: Partial<Pose> = {}): Pose => ({
  hip: [166, 152],
  tr: 34,
  arch: 2,
  l1: footL([184, 224]),
  l2: footL([178, 224]),
  a1: { hand: [224, 132], side: -1 },
  a2: { hand: [221, 133], side: -1 },
  ...o,
});
const ex17: Exercise = {
  id: "rl-17",
  slug: "reiter-hocke",
  number: 17,
  title: "Die Reiter-Hocke",
  goal: "Für Kippen und Wackeln im leichten Sitz: Balance in einer ähnlichen Position am Boden üben.",
  steps: [
    "Hüftbreit stehen, Füße fest am Boden.",
    "Knie und Hüfte leicht beugen.",
    "Den Oberkörper mit langem Rücken kontrolliert nach vorn neigen, Hände vor dem Körper.",
    "Die Position halten – das Gewicht bleibt über der Mitte der Füße.",
  ],
  dose: { kind: "time", seconds: 20, sets: 3 },
  doseLabel: "3 × 20 s",
  aha: "Im leichten Sitz trägt dich dein Bein, nicht die Hände am Hals. Liegt dein Schwerpunkt über der Fußmitte, brauchst du keinen Halt.",
  transfer: "Im leichten Sitz kurz prüfen: Könntest du die Hände einen Moment vom Hals nehmen, ohne zu kippen? Nur ausprobieren, wenn deine Reitlehrkraft es erlaubt und das Pferd ruhig ist.",
  easier: "Weniger tief beugen und mit einer Hand an einer Stuhllehne abstützen.",
  anim: {
    view: "side",
    frames: [
      f(0, st({}), "Hüftbreiter Stand"),
      f(1.8, hocke(), "Knie und Hüfte beugen, Oberkörper vor"),
      f(2.6, hocke(), "Position halten – ruhig atmen"),
      f(4.4, hocke({ hip: [166, 153] })),
      f(6.2, hocke()),
      f(8, st({}), "Aufrichten"),
    ],
    overlays: [
      { k: "plumb", at: "cog", tone: "ok" },
      { k: "text", at: "an1", o: [70, -20], text: "Gewicht über der Fußmitte", from: 1.8, to: 7 },
      { k: "glow", a: "hip", b: "kn1", w: 15, pulse: true, tone: "hint", from: 2, to: 6.6 },
    ],
    mistake: {
      label: "Gewicht auf den Zehen, Knie weit vor",
      text: "Der Oberkörper bleibt zu aufrecht, die Knie schieben weit nach vorn, die Fersen heben ab. Der Schwerpunkt liegt vor den Füßen – im Sattel kippst du nach vorn und hältst dich am Hals fest.",
      frames: [
        f(0, st({})),
        f(1.8, hocke({ hip: [178, 158], tr: 12, l1: footL([186, 219], 66), l2: footL([180, 219], 66) }), "Fersen heben ab"),
        f(5, hocke({ hip: [178, 158], tr: 12, l1: footL([186, 219], 66), l2: footL([180, 219], 66) })),
        f(6.6, st({})),
      ],
      overlays: [
        { k: "plumb", at: "cog", tone: "bad" },
        { k: "ring", at: "he1", r: 8, tone: "bad", from: 1.4, to: 5.4 },
      ],
    },
  },
};

const hinge = (u: number, o: Partial<Pose> = {}): Pose =>
  st({ hip: [180 - 22 * u, 133 + 5 * u], tr: 54 * u, arch: 3, neck: 0, a1: { a: -4 * u + 4, el: 8 }, a2: { a: -6 * u, el: 8 }, ...o });
const ex18: Exercise = {
  id: "rl-18",
  slug: "hip-hinge",
  number: 18,
  title: "Hip Hinge",
  goal: "Für ein Einknicken im Rücken im leichten Sitz: die Bewegung aus der Hüfte holen und den Rücken lang lassen.",
  steps: [
    "Aufrecht stehen, Füße hüftbreit, Knie locker.",
    "Die Hüfte nach hinten schieben, als wolltest du mit dem Po eine Tür schließen.",
    "Der Oberkörper neigt sich mit langem, neutralem Rücken nach vorn.",
    "Aus der Hüfte wieder aufrichten.",
  ],
  dose: { kind: "reps", reps: 12 },
  doseLabel: "12 Wiederholungen",
  aha: "Ein Stab am Rücken würde Kopf, Brustwirbelsäule und Kreuzbein gleichzeitig berühren. Genau dieses „Klappen“ in der Hüfte ist der leichte Sitz – nicht das Einrollen im Rücken.",
  transfer: "Beim Übergang in den leichten Sitz an „Hüfte nach hinten, Brust nach vorn“ denken.",
  easier: "Einen Besenstiel an den Rücken halten (Hinterkopf, Schulterblätter, Kreuzbein) als Rückmeldung.",
  anim: {
    view: "side",
    frames: [
      f(0, hinge(0), "Aufrecht stehen"),
      f(2, hinge(1), "Hüfte nach hinten, Rücken bleibt lang"),
      f(2.8, hinge(1)),
      f(4.6, hinge(0), "Aus der Hüfte aufrichten"),
      f(5.2, hinge(0)),
    ],
    overlays: [
      { k: "spine", tone: "ok" },
      { k: "level", a: ["head", -9, -4], b: ["hip", -12, 4], ext: 8, tone: "hint" },
      { k: "arrow", at: "hip", o: [-24, 2], d: [-18, 0], tone: "hint", from: 0.2, to: 2 },
    ],
    mistake: {
      label: "Rundrücken",
      text: "Die Hüfte bleibt vorn, stattdessen rollt sich der Rücken ein und der Kopf hängt. Im leichten Sitz kippt man so nach vorn und verliert die Balance.",
      frames: [
        f(0, hinge(0)),
        f(2, st({ hip: [176, 134], tr: 46, arch: -16, neck: 22, a1: { a: 10, el: 8 }, a2: { a: 6, el: 8 } }), "Rücken rollt sich ein"),
        f(2.8, st({ hip: [176, 134], tr: 46, arch: -16, neck: 22, a1: { a: 10, el: 8 }, a2: { a: 6, el: 8 } })),
        f(4.6, hinge(0)),
      ],
      overlays: [{ k: "spine", tone: "bad" }, { k: "level", a: ["head", -9, -4], b: ["hip", -12, 4], ext: 8, tone: "bad" }],
    },
  },
};

const oneLeg = (u: number, o: Partial<Pose> = {}): Pose =>
  fr({
    hip: [180 - 4 * u, 133],
    l2: { th: 2 + 6 * u, kn: 6 * u, thK: 1 - 0.55 * u, footAbs: 0 },
    a1: { a: 10 + 10 * u, el: 6 },
    a2: { a: 10 + 10 * u, el: 6 },
    ...o,
  });
const ex19: Exercise = {
  id: "rl-19",
  slug: "einbeinstand",
  number: 19,
  title: "Einbeinstand",
  goal: "Für unsichere Balance und instabile Unterschenkel: Gleichgewicht und Beinachse kontrollieren.",
  steps: [
    "Aufrecht stehen, bei Bedarf eine Stuhllehne oder Wand in Reichweite.",
    "Ein Bein anheben, das Knie etwa auf Hüfthöhe oder tiefer.",
    "Das Becken waagerecht halten, der Druck bleibt gleichmäßig unter dem Standfuß.",
    "Halten, dann die Seite wechseln.",
  ],
  dose: { kind: "time", seconds: 20, sides: true },
  doseLabel: "20 s je Seite",
  aha: "Balance ist eine Fähigkeit des Fußes und der Hüfte – nicht der Hände. Wer am Boden auf einem Bein ruhig steht, findet im leichten Sitz leichter seine Mitte.",
  transfer: "Im leichten Sitz das Gewicht gleichmäßig in beide Bügel sinken lassen und prüfen, ob du gerade über dem Pferd bist.",
  easier: "Mit einer Hand an einer Stuhllehne festhalten oder die Fußspitze am Boden lassen.",
  anim: {
    view: "front",
    frames: [
      f(0, oneLeg(0), "Aufrecht stehen"),
      f(1.4, oneLeg(1), "Ein Bein anheben"),
      f(2.2, oneLeg(1), "Halten – Becken bleibt waagerecht"),
      f(4, oneLeg(1, { hip: [177, 133] })),
      f(6, oneLeg(1)),
      f(7.4, oneLeg(0)),
      f(8, oneLeg(0)),
    ],
    overlays: [
      { k: "level", a: "hip1", b: "hip2", ext: 16, tone: "ok" },
      { k: "press", at: "an1", tone: "hint", from: 1.4, to: 7.2 },
      { k: "text", at: "hip", o: [0, -108], text: "Becken waagerecht", from: 1.4, to: 7.2 },
    ],
    mistake: {
      label: "Becken kippt zur freien Seite",
      text: "Die Hüfte des freien Beins sackt ab, der Oberkörper weicht zur Seite aus. Lieber festhalten und das Becken gerade halten.",
      frames: [
        f(0, oneLeg(0)),
        f(1.4, oneLeg(1, { ptilt: 9, tr: -6, hip: [172, 133] }), "Becken kippt ab"),
        f(5, oneLeg(1, { ptilt: 9, tr: -6, hip: [172, 133] })),
        f(6.4, oneLeg(0)),
      ],
      overlays: [{ k: "level", a: "hip1", b: "hip2", ext: 16, tone: "bad" }],
    },
  },
};

const WALL_L = 130;
const wallSit = (u: number, o: Partial<Pose> = {}): Pose => ({
  hip: [145, 134 + 29 * u],
  tr: 0,
  arch: 2,
  l1: footL([180 + 10 * u, 224]),
  l2: footL([174 + 10 * u, 224]),
  a1: { a: 6, el: 20 },
  a2: { a: 2, el: 18 },
  ...o,
});
const ex20: Exercise = {
  id: "rl-20",
  slug: "wall-sit",
  number: 20,
  title: "Wall Sit",
  goal: "Für Beine, die im leichten Sitz schnell müde werden: Kraftausdauer für eine stabile, federnde Position.",
  steps: [
    "Mit dem Rücken an eine stabile Wand lehnen, Füße etwa zwei Fußlängen vor der Wand.",
    "Am Rücken langsam nach unten gleiten – die Knie nur so weit beugen, wie es angenehm ist.",
    "Knie zeigen in Richtung Zehen und bleiben etwa über den Sprunggelenken.",
    "20 bis 30 Sekunden ruhig halten und atmen, dann hochschieben.",
  ],
  dose: { kind: "time", seconds: 20, sets: 3 },
  doseLabel: "3 × 20–30 s",
  aha: "Nicht die Tiefe zählt, sondern das ruhige Halten. Federn kann nur ein Bein, das die Position eine Weile halten kann, ohne fest zu werden.",
  transfer: "Wenn die Beine im leichten Sitz müde werden: lieber kurz aussitzen und neu beginnen, als in den Sattel zu plumpsen.",
  easier: "Nur ein kleines Stück nach unten gleiten oder die Haltezeit verkürzen.",
  caution: "Bei Knieschmerzen weniger tief gehen oder aufhören.",
  anim: {
    view: "side",
    props: [{ k: "wall", x: WALL_L }],
    frames: [
      f(0, wallSit(0), "Rücken an der Wand, Füße vor"),
      f(2, wallSit(1), "Nur so weit beugen, wie es angenehm ist"),
      f(2.6, wallSit(1), "Halten – ruhig atmen"),
      f(6, wallSit(1)),
      f(8, wallSit(0), "Hochschieben"),
    ],
    overlays: [
      { k: "glow", a: "hip", b: "kn1", w: 17, pulse: true, tone: "hint", from: 2, to: 6.4 },
      { k: "glow", a: ["hip", 6, -6], b: ["sh", 6, 14], w: 14, pulse: true, tone: "hint", from: 2, to: 6.4 },
      { k: "plumb", at: "kn1", tone: "ok" },
      { k: "text", at: "kn1", o: [34, -16], text: "Knie über dem Fuß", from: 2, to: 6.4 },
    ],
    mistake: {
      label: "Füße zu nah an der Wand",
      text: "Stehen die Füße zu nah an der Wand, schieben die Knie weit über die Zehen und die Fersen wollen abheben. Das belastet die Knie unnötig.",
      frames: [
        f(0, wallSit(0, { l1: footL([162, 224]), l2: footL([156, 224]) })),
        f(2, wallSit(1, { l1: footL([162, 222], 74), l2: footL([156, 222], 74) }), "Knie schieben weit vor"),
        f(5, wallSit(1, { l1: footL([162, 222], 74), l2: footL([156, 222], 74) })),
        f(7, wallSit(0, { l1: footL([162, 224]), l2: footL([156, 224]) })),
      ],
      overlays: [{ k: "plumb", at: "kn1", tone: "bad" }],
    },
  },
};

/* ---------- Bereiche ---------- */

export const riderLabAreas: Area[] = [
  {
    id: "rl-b1",
    slug: "das-lange-bein",
    number: 1,
    title: "Das lange Bein",
    problem: "Hochrutschende Knie, klemmende Oberschenkel, unruhige Unterschenkel, hochgezogene Fersen.",
    intro: "Ein langes Bein beginnt in der Hüfte: beweglich, aber kontrolliert. Diese vier Übungen arbeiten an Hüfte, Sprunggelenk und dem Gefühl für Loslassen.",
    tint: "#dde3d6",
    exercises: [ex01, ex02, ex03, ex04],
  },
  {
    id: "rl-b2",
    slug: "leichttraben",
    number: 2,
    title: "Leichttraben",
    problem: "Knie rutschen hoch, zu hohes Aufstehen, schweres Zurückfallen, Balance geht verloren.",
    intro: "Leichttraben ist eine kleine Bewegung im Takt. Hier übst du Kontrolle, Rhythmus und ruhige Hände – auf dem Stuhl und im Stand.",
    tint: "#e8dcc4",
    exercises: [ex05, ex06, ex07, ex08],
  },
  {
    id: "rl-b3",
    slug: "galopp",
    number: 3,
    title: "Galopp",
    problem: "Hüpfen im Sattel, steife Hüfte, blockiertes Becken, instabiler Oberkörper.",
    intro: "Im Galopp geht das Becken weich mit, der Rumpf bleibt stabil. Diese Übungen verbinden Beweglichkeit mit Kontrolle.",
    tint: "#efe4d2",
    exercises: [ex09, ex10, ex11, ex12],
  },
  {
    id: "rl-b4",
    slug: "die-ruhige-hand",
    number: 4,
    title: "Die ruhige Hand",
    problem: "Wackelnde Hände, starre Ellbogen, verspannte Schultern, Festhalten an den Zügeln.",
    intro: "Ruhige Hände entstehen durch bewegliche Gelenke und einen stabilen Rumpf – nicht durch Festhalten.",
    tint: "#e3e7dc",
    exercises: [ex13, ex14, ex15, ex16],
  },
  {
    id: "rl-b5",
    slug: "leichter-sitz",
    number: 5,
    title: "Leichter Sitz",
    problem: "Nach vorn kippen, unsichere Balance, ermüdende Beine, instabile Unterschenkel.",
    intro: "Im leichten Sitz trägt dich dein Bein. Hier trainierst du Balance, das Klappen aus der Hüfte und die Kraft zum Halten.",
    tint: "#f0e6d6",
    exercises: [ex17, ex18, ex19, ex20],
  },
];

export const riderLabExercises: Exercise[] = riderLabAreas.flatMap((a) => a.exercises);

export function loadExercise(areaSlug: string, slug: string) {
  const area = riderLabAreas.find((a) => a.slug === areaSlug);
  const ex = area?.exercises.find((e) => e.slug === slug);
  return area && ex ? { area, ex } : undefined;
}
