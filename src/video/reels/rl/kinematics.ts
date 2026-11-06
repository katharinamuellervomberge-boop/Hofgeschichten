/**
 * Rider Lab – Körpermodell für die Übungsanimationen.
 *
 * Eine Pose besteht aus Winkeln (Grad) und wenigen Zielpunkten. Daraus werden die
 * Gelenke berechnet (Vorwärtskinematik bzw. Zwei-Gelenk-IK für Füße/Hände, die an
 * einem Punkt bleiben sollen). So behalten Ober-/Unterschenkel und Arme immer ihre
 * Länge – die Figur „wächst“ nicht zwischen zwei Posen.
 *
 * Koordinaten: viewBox 0 0 360 260, Boden bei y = 230, Figur schaut nach rechts (+x).
 * Winkel von Gliedmaßen: 0 = senkrecht nach unten, + = nach vorn (+x).
 * Rumpf: 0 = aufrecht, + = nach vorn geneigt.
 */

export type P = [number, number];

export const GROUND = 230;
export const LEN = { thigh: 46, shin: 46, trunk: 62, neck: 19, upper: 30, fore: 28, foot: 16, hipW: 10, shW: 19 };

/** Bein: entweder Winkel (th, kn) oder Zielpunkt fürs Sprunggelenk (ank) mit Kniesrichtung */
export type Leg = {
  th?: number;
  kn?: number;
  ank?: P;
  /** IK: auf welcher Seite der Linie Hüfte–Sprunggelenk liegt das Knie (+1 = vorn/oben) */
  side?: 1 | -1;
  /** Kniepunkt fest vorgeben (Kniestand). Unterschenkel dann über sh (Winkel) */
  kp?: P;
  sh?: number;
  /** Fußrichtung absolut (90 = flach nach vorn). Fehlt: rechtwinklig zum Unterschenkel + foot */
  footAbs?: number;
  foot?: number;
  /** Verkürzung des Oberschenkels (Frontansicht: Knie kommt auf den Betrachter zu) */
  thK?: number;
};
export type Arm = { a?: number; el?: number; hand?: P; side?: 1 | -1 };

export type Pose = {
  hip: P;
  /** Rumpfneigung */
  tr: number;
  /** Krümmung der Lendenwirbelsäule: + Hohlkreuz, − Rundrücken */
  arch?: number;
  neck?: number;
  /** Beckenkippung für die Markierung: + nach vorn (Hohlkreuz), − nach hinten (aufgerichtet) */
  pt?: number;
  /** Schultern hochgezogen (Einheiten) */
  shUp?: number;
  /** Frontansicht: Becken seitlich gekippt (Grad, + = rechte Bildseite tiefer) */
  ptilt?: number;
  l1: Leg;
  l2: Leg;
  a1: Arm;
  a2: Arm;
  /** freie Zusatzwerte für Requisiten/Anzeigen (Glas, Uhr, Schulterblatt, Muskel …) */
  x?: Record<string, number>;
};

export type Joints = {
  hip: P;
  hip1: P;
  hip2: P;
  sh: P;
  sh1: P;
  sh2: P;
  head: P;
  spineCtrl: P;
  mid: P;
  kn1: P;
  an1: P;
  he1: P;
  to1: P;
  kn2: P;
  an2: P;
  he2: P;
  to2: P;
  el1: P;
  ha1: P;
  el2: P;
  ha2: P;
  cog: P;
};

const rad = (d: number) => (d * Math.PI) / 180;
export const dir = (a: number): P => [Math.sin(rad(a)), Math.cos(rad(a))];
export const up = (a: number): P => [Math.sin(rad(a)), -Math.cos(rad(a))];
export const add = (a: P, b: P, k = 1): P => [a[0] + b[0] * k, a[1] + b[1] * k];
export const mix = (a: P, b: P, u: number): P => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
export const dist = (a: P, b: P) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const angleOf = (v: P) => (Math.atan2(v[0], v[1]) * 180) / Math.PI; // Winkel „von unten“

/** Zwei-Gelenk-IK: Mittelgelenk zwischen a und c bei Längen l1, l2; side wählt die Lösung */
export function ik(a: P, c: P, l1: number, l2: number, side: 1 | -1): P {
  let d = dist(a, c);
  const max = l1 + l2 - 0.01;
  const min = Math.abs(l1 - l2) + 0.01;
  const v: P = d > 0 ? [(c[0] - a[0]) / d, (c[1] - a[1]) / d] : [0, 1];
  d = Math.min(max, Math.max(min, d));
  const x = (d * d + l1 * l1 - l2 * l2) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  // Normale: side +1 = links von a→c (in Bildkoordinaten „vorn/oben“ für die üblichen Fälle)
  const n: P = [v[1] * side, -v[0] * side];
  return [a[0] + v[0] * x + n[0] * h, a[1] + v[1] * x + n[1] * h];
}

function leg(hip: P, l: Leg, mirror: number): { kn: P; an: P; he: P; to: P; shank: number; footA: number } {
  let kn: P;
  let an: P;
  const thLen = LEN.thigh * (l.thK ?? 1);
  if (l.kp) {
    kn = l.kp;
    const s = (l.sh ?? 0) * mirror;
    an = add(kn, dir(s), LEN.shin);
  } else if (l.ank) {
    an = l.ank;
    // In der Spiegelung (linke Bildseite der Frontansicht) kehrt sich die Seite um
    kn = ik(hip, an, thLen, LEN.shin, ((l.side ?? 1) * (mirror < 0 ? -1 : 1)) as 1 | -1);
  } else {
    const th = (l.th ?? 0) * mirror;
    kn = add(hip, dir(th), thLen);
    an = add(kn, dir(th - (l.kn ?? 0) * mirror), LEN.shin);
  }
  const shank = angleOf([an[0] - kn[0], an[1] - kn[1]]);
  const footA = l.footAbs !== undefined ? l.footAbs * mirror : shank + 90 * (mirror < 0 ? -1 : 1) + (l.foot ?? 0) * mirror;
  const sole = add(an, dir(shank), 6);
  const he = add(sole, dir(footA), -4);
  const to = add(sole, dir(footA), LEN.foot);
  return { kn, an, he, to, shank, footA };
}

function arm(sh: P, a: Arm, mirror: number): { el: P; ha: P } {
  if (a.hand) {
    const el = ik(sh, a.hand, LEN.upper, LEN.fore, ((a.side ?? -1) * (mirror < 0 ? -1 : 1)) as 1 | -1);
    return { el, ha: a.hand };
  }
  const aa = (a.a ?? 0) * mirror;
  const el = add(sh, dir(aa), LEN.upper);
  return { el, ha: add(el, dir(aa + (a.el ?? 0) * mirror), LEN.fore) };
}

/** Gelenke berechnen. view "front": zwei Beine/Arme nebeneinander, Winkel spiegelbildlich (+ = nach außen). */
export function solve(p: Pose, view: "side" | "front" = "side"): Joints {
  const hip = p.hip;
  if (view === "front") {
    const tilt = rad(p.ptilt ?? 0);
    const hv: P = [Math.cos(tilt) * LEN.hipW, Math.sin(tilt) * LEN.hipW];
    const hip1: P = [hip[0] - hv[0], hip[1] - hv[1]];
    const hip2: P = [hip[0] + hv[0], hip[1] + hv[1]];
    const shC = add(hip, up(p.tr), LEN.trunk);
    const shY = -(p.shUp ?? 0);
    const sh1: P = [shC[0] - LEN.shW, shC[1] + shY];
    const sh2: P = [shC[0] + LEN.shW, shC[1] + shY];
    const L1 = leg(hip1, p.l1, -1);
    const L2 = leg(hip2, p.l2, 1);
    const A1 = arm(sh1, p.a1, -1);
    const A2 = arm(sh2, p.a2, 1);
    const head = add(shC, up(p.tr + (p.neck ?? 0)), LEN.neck + 2);
    const mid = mix(hip, shC, 0.5);
    return {
      hip, hip1, hip2, sh: shC, sh1, sh2, head, spineCtrl: mid, mid,
      kn1: L1.kn, an1: L1.an, he1: L1.he, to1: L1.to, kn2: L2.kn, an2: L2.an, he2: L2.he, to2: L2.to,
      el1: A1.el, ha1: A1.ha, el2: A2.el, ha2: A2.ha,
      cog: add(mix(hip, shC, 0.32), [0, 0]),
    };
  }
  const shBase = add(hip, up(p.tr), LEN.trunk);
  const sh = add(shBase, up(p.tr), p.shUp ?? 0);
  const mid = mix(hip, shBase, 0.5);
  const back = up(p.tr - 90); // zeigt zum Rücken
  const spineCtrl = add(mid, back, -(p.arch ?? 0));
  const head = add(sh, up(p.tr + (p.neck ?? 0)), LEN.neck);
  const L1 = leg(hip, p.l1, 1);
  const L2 = leg(hip, p.l2, 1);
  const A1 = arm(sh, p.a1, 1);
  const A2 = arm(sh, p.a2, 1);
  // Körperschwerpunkt grob: Rumpf + Kopf + Beine gewichtet
  const legs = mix(mix(L1.kn, L2.kn, 0.5), hip, 0.5);
  const cog: P = [
    hip[0] * 0.3 + mid[0] * 0.3 + head[0] * 0.08 + legs[0] * 0.32,
    hip[1] * 0.3 + mid[1] * 0.3 + head[1] * 0.08 + legs[1] * 0.32,
  ];
  return {
    hip, hip1: hip, hip2: hip, sh, sh1: sh, sh2: sh, head, spineCtrl, mid,
    kn1: L1.kn, an1: L1.an, he1: L1.he, to1: L1.to, kn2: L2.kn, an2: L2.an, he2: L2.he, to2: L2.to,
    el1: A1.el, ha1: A1.ha, el2: A2.el, ha2: A2.ha,
    cog,
  };
}

/* ---------- Zeit & Überblenden ---------- */

export const smooth = (u: number) => {
  const x = Math.min(1, Math.max(0, u));
  return x * x * (3 - 2 * x);
};

/* Tiefe Mischung zweier Posen: Zahlen und Punkte werden linear gemischt, fehlende Werte übernommen */
function lerpAny(a: unknown, b: unknown, u: number): unknown {
  if (typeof a === "number" && typeof b === "number") return a + (b - a) * u;
  if (Array.isArray(a) && Array.isArray(b)) return a.map((v, i) => lerpAny(v, b[i], u));
  if (a && b && typeof a === "object" && typeof b === "object") {
    const out: Record<string, unknown> = {};
    const keys = new Set([...Object.keys(a as object), ...Object.keys(b as object)]);
    for (const k of keys) {
      const av = (a as Record<string, unknown>)[k];
      const bv = (b as Record<string, unknown>)[k];
      out[k] = av === undefined ? bv : bv === undefined ? av : lerpAny(av, bv, u);
    }
    return out;
  }
  return u < 0.5 ? a : b;
}
export const lerpPose = (a: Pose, b: Pose, u: number) => lerpAny(a, b, u) as Pose;

export type Frame = { t: number; pose: Pose; label?: string };

/**
 * Zwei Posen auf dieselbe Beschreibung bringen: Ist ein Arm/Bein in der einen Pose über Winkel,
 * in der anderen über einen Zielpunkt beschrieben, wird der Winkel-Fall in einen Zielpunkt umgerechnet.
 * Sonst würde beim Überblenden sofort der Zielpunkt gelten (Sprung).
 */
function harmonize(a: Pose, b: Pose, view: "side" | "front"): [Pose, Pose] {
  const ja = solve(a, view);
  const jb = solve(b, view);
  const fixArm = (p: Pose, j: Joints, k: "a1" | "a2"): Arm => {
    const el = k === "a1" ? j.el1 : j.el2;
    const ha = k === "a1" ? j.ha1 : j.ha2;
    const sh = view === "front" ? (k === "a1" ? j.sh1 : j.sh2) : j.sh;
    // Seite der IK so wählen, dass der Ellbogen dort bleibt, wo er war
    const cross = (ha[0] - sh[0]) * (el[1] - sh[1]) - (ha[1] - sh[1]) * (el[0] - sh[0]);
    let side: 1 | -1 = cross < 0 ? 1 : -1;
    if (view === "front" && k === "a1") side = (side * -1) as 1 | -1;
    return { hand: ha, side };
  };
  const fixLeg = (p: Pose, j: Joints, k: "l1" | "l2"): Leg => {
    const kn = k === "l1" ? j.kn1 : j.kn2;
    const an = k === "l1" ? j.an1 : j.an2;
    const hp = view === "front" ? (k === "l1" ? j.hip1 : j.hip2) : j.hip;
    const cross = (an[0] - hp[0]) * (kn[1] - hp[1]) - (an[1] - hp[1]) * (kn[0] - hp[0]);
    let side: 1 | -1 = cross < 0 ? 1 : -1;
    if (view === "front" && k === "l1") side = (side * -1) as 1 | -1;
    const l = p[k];
    return { ank: an, side, footAbs: l.footAbs, foot: l.foot, thK: l.thK };
  };
  const A = { ...a };
  const B = { ...b };
  for (const k of ["a1", "a2"] as const) {
    const ah = !!a[k].hand;
    const bh = !!b[k].hand;
    if (ah && !bh) B[k] = fixArm(b, jb, k);
    if (bh && !ah) A[k] = fixArm(a, ja, k);
  }
  for (const k of ["l1", "l2"] as const) {
    const at = !!a[k].ank;
    const bt = !!b[k].ank;
    if (a[k].kp || b[k].kp) continue;
    if (at && !bt) B[k] = fixLeg(b, jb, k);
    if (bt && !at) A[k] = fixLeg(a, ja, k);
  }
  return [A, B];
}

/** Pose zur Zeit t in einer Schleife aus Keyframes (erstes Bild bei t = 0, letztes = Schleifenende) */
export function poseAt(frames: Frame[], t: number, view: "side" | "front" = "side"): { pose: Pose; label?: string } {
  const T = frames[frames.length - 1].t;
  const tt = T > 0 ? ((t % T) + T) % T : 0;
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1];
    const b = frames[i];
    if (tt <= b.t) {
      const u = b.t > a.t ? smooth((tt - a.t) / (b.t - a.t)) : 1;
      // Beschriftung: die des zuletzt erreichten Keyframes (mit Text)
      let label: string | undefined;
      for (let j = i - 1; j >= 0; j--) if (frames[j].label) { label = frames[j].label; break; }
      const [pa, pb] = harmonize(a.pose, b.pose, view);
      return { pose: lerpPose(pa, pb, u), label };
    }
  }
  return { pose: frames[frames.length - 1].pose, label: frames[frames.length - 1].label };
}

export const loopLength = (frames: Frame[]) => frames[frames.length - 1].t;
