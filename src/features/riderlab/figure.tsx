/**
 * Rider Lab – gemeinsame Animationslogik.
 *
 * Eine Figur im Stil der Reiterin aus der Reitakademie (RiderScene), als Skelett aus Gelenkpunkten.
 * Posen werden über Winkel (Vorwärtskinematik) gebaut, Hände/Füße bei Bedarf per Zwei-Gelenk-IK an
 * Ziele gesetzt. Zwischen zwei Posen wird pro Gelenk in Polarkoordinaten zum Elterngelenk
 * interpoliert (Längen bleiben erhalten); „gepinnte“ Hände/Füße bleiben dabei per IK am Boden/Ziel.
 *
 * Koordinaten: Einheiten ≈ cm, Boden y = 0, x nach rechts, y nach unten. Winkel in Grad wie am
 * Bildschirm: 0 = nach rechts (vorn), 90 = nach unten, -90 = nach oben.
 */
import { useId, type ReactNode } from "react";

export type P = [number, number];
export type View = "side" | "front" | "top";
export type Face = "right" | "up" | "front" | "top";
export type J =
  | "hip" | "hipA" | "hipB" | "sh" | "shA" | "shB" | "head"
  | "elA" | "haA" | "elB" | "haB"
  | "knA" | "anA" | "toA" | "heA" | "knB" | "anB" | "toB" | "heB";

export type Pose = { p: Record<J, P>; arch: number; tilt: number; face: Face };

/* ---------- Grundmaße ---------- */
export const LEN = { tr: 52, nk: 20, ua: 28, fa: 26, th: 44, sh: 42, ft: 17, hl: 5 };
export const FLOOR = -2.5;

const PARENT: Record<J, J | null> = {
  hip: null, hipA: "hip", hipB: "hip", sh: "hip", shA: "sh", shB: "sh", head: "sh",
  elA: "shA", haA: "elA", elB: "shB", haB: "elB",
  knA: "hipA", anA: "knA", toA: "anA", heA: "anA", knB: "hipB", anB: "knB", toB: "anB", heB: "anB",
};
const ORDER: J[] = ["hip", "hipA", "hipB", "sh", "shA", "shB", "head", "elA", "haA", "elB", "haB", "knA", "anA", "toA", "heA", "knB", "anB", "toB", "heB"];
const CHAIN: Record<"anA" | "anB" | "haA" | "haB", [J, J]> = { anA: ["hipA", "knA"], anB: ["hipB", "knB"], haA: ["shA", "elA"], haB: ["shB", "elB"] };
const KIDS: Partial<Record<J, J[]>> = { anA: ["toA", "heA"], anB: ["toB", "heB"] };

/* ---------- Vektorhilfen ---------- */
const rad = (d: number) => (d * Math.PI) / 180;
export const dir = (d: number): P => [Math.cos(rad(d)), Math.sin(rad(d))];
export const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
export const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
export const len = (a: P) => Math.hypot(a[0], a[1]);
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const lerpP = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};
const angOf = (v: P) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

export type Bend = "up" | "down" | "fwd" | "back";
/** Zwei-Gelenk-IK: mittleres Gelenk zwischen a und Ziel t (Längen l1, l2) */
export function ik(a: P, t: P, l1: number, l2: number, bend: Bend | number): P {
  const v = sub(t, a);
  const d = Math.max(0.01, Math.min(len(v), l1 + l2 - 0.01));
  const base = Math.atan2(v[1], v[0]);
  const c = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const p1: P = [a[0] + l1 * Math.cos(base + c), a[1] + l1 * Math.sin(base + c)];
  const p2: P = [a[0] + l1 * Math.cos(base - c), a[1] + l1 * Math.sin(base - c)];
  if (typeof bend === "number") {
    // Vorzeichen des Kreuzprodukts (a→t) × (a→Knie)
    const s1 = Math.sign(v[0] * (p1[1] - a[1]) - v[1] * (p1[0] - a[0]));
    return s1 === bend ? p1 : p2;
  }
  const pick = { up: (p: P) => -p[1], down: (p: P) => p[1], fwd: (p: P) => p[0], back: (p: P) => -p[0] }[bend];
  return pick(p1) >= pick(p2) ? p1 : p2;
}

/* ---------- Posen bauen ---------- */
export type Limb = [number, number, number?];
export type Ref = P | J | { j: J; d: P };
export type Spec = {
  root?: P;
  trunk: number;
  /** Kopf-Richtung (absolut); Standard = Rumpf */
  neck?: number;
  /** + = Hohlkreuz, − = runder Rücken */
  arch?: number;
  /** Beckenkippung (Anzeige): + = nach vorn, − = aufgerichtet */
  tilt?: number;
  face?: Face;
  hipW?: number;
  shW?: number;
  /** Schulterhöhe gegenüber dem Rumpf (+ = hochgezogen) */
  shrug?: number;
  armA: Limb;
  armB?: Limb;
  legA: Limb;
  legB?: Limb;
  /** Verkürzung einzelner Segmente (Blick von vorn/oben) */
  k?: Partial<Record<"thA" | "thB" | "shA" | "shB" | "uaA" | "uaB" | "faA" | "faB" | "tr", number>>;
  /** Pose so verschieben, dass Gelenk J bei P liegt (vor der IK) */
  pin?: [J, P];
  /** Hände/Füße an Ziele (nach dem Verschieben). Beine zuerst, dann Arme (dürfen Beingelenke referenzieren). */
  ik?: Partial<Record<"anA" | "anB" | "haA" | "haB", [Ref, Bend, number?]>>;
};

export function resolve(r: Ref, p: Partial<Record<J, P>>): P {
  if (Array.isArray(r)) return r;
  if (typeof r === "string") return p[r] as P;
  return add(p[r.j] as P, r.d);
}

export function build(s: Spec): Pose {
  const k = (n: keyof NonNullable<Spec["k"]>) => s.k?.[n] ?? 1;
  const p = {} as Record<J, P>;
  const hip: P = s.root ?? [0, -90];
  const perp = (w: number, side: 1 | -1): P => mul(dir(s.trunk + 90 * side), w);
  p.hip = hip;
  p.hipA = add(hip, perp(s.hipW ?? 0, -1));
  p.hipB = add(hip, perp(s.hipW ?? 0, 1));
  p.sh = add(hip, mul(dir(s.trunk), LEN.tr * k("tr")));
  const up = mul(dir(s.trunk), -(s.shrug ?? 0));
  p.shA = add(add(p.sh, perp(s.shW ?? 0, -1)), mul(up, -1));
  p.shB = add(add(p.sh, perp(s.shW ?? 0, 1)), mul(up, -1));
  p.head = add(p.sh, mul(dir(s.neck ?? s.trunk), LEN.nk - (s.shrug ?? 0) * 0.6));
  const arm = (side: "A" | "B", l: Limb) => {
    const sh = p[`sh${side}` as J];
    const el = add(sh, mul(dir(l[0]), LEN.ua * k(`ua${side}` as "uaA")));
    p[`el${side}` as J] = el;
    p[`ha${side}` as J] = add(el, mul(dir(l[1]), LEN.fa * k(`fa${side}` as "faA")));
  };
  const leg = (side: "A" | "B", l: Limb) => {
    const h = p[`hip${side}` as J];
    const kn = add(h, mul(dir(l[0]), LEN.th * k(`th${side}` as "thA")));
    const an = add(kn, mul(dir(l[1]), LEN.sh * k(`sh${side}` as "shA")));
    p[`kn${side}` as J] = kn;
    p[`an${side}` as J] = an;
    const f = l[2] ?? 0;
    p[`to${side}` as J] = add(an, mul(dir(f), LEN.ft));
    p[`he${side}` as J] = add(an, mul(dir(f + 180), LEN.hl));
  };
  arm("A", s.armA);
  arm("B", s.armB ?? s.armA);
  leg("A", s.legA);
  leg("B", s.legB ?? s.legA);
  if (s.pin) {
    const d = sub(s.pin[1], p[s.pin[0]]);
    for (const j of ORDER) p[j] = add(p[j], d);
  }
  const order: Array<"anA" | "anB" | "haA" | "haB"> = ["anA", "anB", "haA", "haB"];
  for (const end of order) {
    const spec = s.ik?.[end];
    if (!spec) continue;
    const [root, mid] = CHAIN[end];
    const leg = end.startsWith("an");
    const side = end.slice(2) as "A" | "B";
    const l1 = (leg ? LEN.th : LEN.ua) * k(`${leg ? "th" : "ua"}${side}` as "thA");
    const l2 = (leg ? LEN.sh : LEN.fa) * k(`${leg ? "sh" : "fa"}${side}` as "shA");
    const t = resolve(spec[0], p);
    p[mid] = ik(p[root], t, l1, l2, spec[1]);
    const v = sub(t, p[mid]);
    const end2 = add(p[mid], mul(v, Math.min(1, l2 / Math.max(0.01, len(v)))));
    const d = sub(end2, p[end]);
    p[end] = end2;
    if (leg) {
      const f = spec[2] ?? (side === "A" ? s.legA[2] : (s.legB ?? s.legA)[2]) ?? 0;
      p[`to${side}` as J] = add(end2, mul(dir(f), LEN.ft));
      p[`he${side}` as J] = add(end2, mul(dir(f + 180), LEN.hl));
    } else void d;
  }
  return { p, arch: s.arch ?? 0, tilt: s.tilt ?? 0, face: s.face ?? "right" };
}

/** Pose direkt aus Punkten (für Ansichten von vorn/oben, wo Winkel unpraktisch sind) */
export function pts(p: Partial<Record<J, P>> & { hip: P; sh: P; head: P }, extra: Partial<Omit<Pose, "p">> = {}): Pose {
  const q = { ...p } as Record<J, P>;
  q.hipA ??= q.hip;
  q.hipB ??= q.hip;
  q.shA ??= q.sh;
  q.shB ??= q.sh;
  for (const s of ["A", "B"] as const) {
    q[`to${s}`] ??= add(q[`an${s}`], [0, 4]);
    q[`he${s}`] ??= q[`an${s}`];
  }
  return { p: q, arch: extra.arch ?? 0, tilt: extra.tilt ?? 0, face: extra.face ?? "front" };
}

/* ---------- Interpolation ---------- */
function bendSign(a: P, m: P, t: P) {
  const v = sub(t, a);
  return Math.sign(v[0] * (m[1] - a[1]) - v[1] * (m[0] - a[0])) || 1;
}
export function blend(A: Pose, B: Pose, u: number, pins: J[] = []): Pose {
  const p = {} as Record<J, P>;
  for (const j of ORDER) {
    const par = PARENT[j];
    if (!par) {
      p[j] = lerpP(A.p[j], B.p[j], u);
      continue;
    }
    const va = sub(A.p[j], A.p[par]);
    const vb = sub(B.p[j], B.p[par]);
    const la = len(va);
    const lb = len(vb);
    if (la < 0.5 || lb < 0.5) {
      p[j] = add(p[par], lerpP(va, vb, u));
      continue;
    }
    const aa = angOf(va);
    let d = angOf(vb) - aa;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    p[j] = add(p[par], mul(dir(aa + d * u), lerp(la, lb, u)));
  }
  for (const end of pins as Array<"anA" | "anB" | "haA" | "haB">) {
    const ch = CHAIN[end];
    if (!ch) continue;
    const [root, mid] = ch;
    const t = lerpP(A.p[end], B.p[end], u);
    const l1 = lerp(len(sub(A.p[mid], A.p[root])), len(sub(B.p[mid], B.p[root])), u);
    const l2 = lerp(len(sub(A.p[end], A.p[mid])), len(sub(B.p[end], B.p[mid])), u);
    p[mid] = ik(p[root], t, l1, l2, bendSign(A.p[root], A.p[mid], A.p[end]));
    const d = sub(t, p[end]);
    p[end] = t;
    for (const kid of KIDS[end] ?? []) p[kid] = add(p[kid], d);
  }
  return { p, arch: lerp(A.arch, B.arch, u), tilt: lerp(A.tilt, B.tilt, u), face: u < 0.5 ? A.face : B.face };
}

/* ---------- Animationen ---------- */
export type Col = "ok" | "bad" | "hint" | "muscle" | "ink";
export const COLORS: Record<Col, string> = { ok: "#344638", bad: "#A4573A", hint: "#C99A4E", muscle: "#6FA56F", ink: "#5D574C" };

export type Prop =
  | { k: "floor" }
  | { k: "mat"; x0: number; x1: number }
  | { k: "chair"; x: number; seat: number; back?: "left" | "right"; w?: number }
  | { k: "wall"; x: number; side: "left" | "right" }
  | { k: "wallBack" }
  | { k: "support"; x: number; h: number };

export type Overlay = { ph?: [number, number] } & (
  | { k: "ring"; at: Ref; c: Col; r?: number }
  | { k: "arrow"; from: Ref; to: Ref; c: Col; bow?: number }
  | { k: "zone"; a: J; b: J; u?: [number, number]; c?: Col; w?: number }
  | { k: "line"; pts: Ref[]; c: Col }
  | { k: "label"; at: Ref; text: string; c: Col; anchor?: "start" | "middle" | "end" }
  | { k: "pelvis" }
  | { k: "spine" }
  | { k: "cog"; strict?: boolean }
  | { k: "level"; at: J }
  | { k: "trail"; j: J; c: Col }
  | { k: "press"; j: J }
  | { k: "scap" }
  | { k: "beat"; n: number; at: P }
  | { k: "water" }
  | { k: "clock"; at: P }
);

export type Anim = {
  view: View;
  /** viewBox x, y, w, h */
  box: [number, number, number, number];
  dur: number;
  keys?: Array<[number, Pose]>;
  fn?: (u: number) => Pose;
  pins?: J[];
  props?: Prop[];
  overlays?: Overlay[];
  /** Beschriftung unter dem Bild (z. B. „✓ entspannt“) */
  caption?: string;
  /** richtig (ok) oder Fehlerbild (bad) – färbt die Beschriftung */
  tone?: "ok" | "bad";
  /** Figur und Markierungen drehen (Draufsicht liegend: −90 = Kopf links) */
  rotate?: number;
};

/** Pose zur Zeit t (Sekunden, läuft in Schleife) */
export function poseAt(a: Anim, t: number): Pose {
  const u = (((t % a.dur) + a.dur) % a.dur) / a.dur;
  if (a.fn) return a.fn(u);
  const keys = a.keys!;
  const tt = u * a.dur;
  for (let i = 0; i < keys.length; i++) {
    const [t0, p0] = keys[i];
    const next = keys[i + 1];
    const t1 = next ? next[0] : a.dur + keys[0][0];
    const p1 = next ? next[1] : keys[0][1];
    if (tt >= t0 && tt < t1) return blend(p0, p1, smooth((tt - t0) / (t1 - t0)), a.pins);
  }
  // vor dem ersten Schlüssel: vom letzten zum ersten
  const [tl, pl] = keys[keys.length - 1];
  const [tf, pf] = keys[0];
  return blend(pl, pf, smooth((tt + a.dur - tl) / (a.dur - tl + tf)), a.pins);
}

/* ---------- Zeichnen ---------- */
const C = {
  jacket: "#344638",
  jacketFar: "#26342A",
  legs: "#EFE6D2",
  legsFar: "#D9CBB0",
  shoe: "#3E2C22",
  skin: "#E8AE86",
  hair: "#5A3420",
  arm: "#2E3D31",
  armFar: "#22302A",
};

const seg = (a: P, b: P, col: string, w: number, key?: string) => (
  <path key={key} d={`M${a[0].toFixed(2)},${a[1].toFixed(2)} L${b[0].toFixed(2)},${b[1].toFixed(2)}`} stroke={col} strokeWidth={w} strokeLinecap="round" fill="none" />
);

function Foot({ an, he, to, col, view }: { an: P; he: P; to: P; col: string; view: View }) {
  if (view !== "side") return <ellipse cx={an[0]} cy={an[1] + 1.5} rx={4.6} ry={3.6} fill={col} />;
  return (
    <path
      d={`M${an[0]},${an[1] - 2.5} L${he[0]},${he[1]} L${to[0]},${to[1]} Q${(an[0] + to[0]) / 2 + 1},${(an[1] + to[1]) / 2 - 3} ${an[0]},${an[1] - 2.5} Z`}
      fill={col}
      stroke={col}
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
  );
}

function torsoPath(po: Pose) {
  const { hip, sh } = po.p;
  const v = sub(sh, hip);
  const n: P = [-v[1] / len(v), v[0] / len(v)];
  // Normale zeigt bei aufrechtem Rumpf nach vorn (Bauchseite): + = Hohlkreuz (Lendenwirbel zur Bauchseite)
  const m = add(lerpP(hip, sh, 0.4), mul(n, po.arch));
  return { d: `M${hip[0]},${hip[1]} Q${m[0]},${m[1]} ${sh[0]},${sh[1]}`, m };
}

function Head({ po, view }: { po: Pose; view: View }) {
  const [hx, hy] = po.p.head;
  const f = po.face;
  if (view === "top" || f === "top") {
    return (
      <g>
        <circle cx={hx} cy={hy} r="10" fill={C.skin} />
        <path d={`M${hx - 10},${hy + 1} C${hx - 9},${hy - 12} ${hx + 9},${hy - 12} ${hx + 10},${hy + 1} C${hx + 4},${hy - 3} ${hx - 4},${hy - 3} ${hx - 10},${hy + 1} Z`} fill={C.hair} />
        <path d={`M${hx},${hy - 9} q-1,-9 -4,-14`} stroke={C.hair} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (f === "front") {
    return (
      <g>
        <path d={`M${hx - 9},${hy - 2} C${hx - 14},${hy + 8} ${hx - 12},${hy + 16} ${hx - 9},${hy + 18}`} stroke={C.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d={`M${hx + 9},${hy - 2} C${hx + 14},${hy + 8} ${hx + 12},${hy + 16} ${hx + 9},${hy + 18}`} stroke={C.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r="10" fill={C.skin} />
        <path d={`M${hx - 10},${hy - 1} C${hx - 9},${hy - 13} ${hx + 9},${hy - 13} ${hx + 10},${hy - 1} C${hx + 4},${hy - 8} ${hx - 4},${hy - 8} ${hx - 10},${hy - 1} Z`} fill={C.hair} />
        <circle cx={hx - 3.6} cy={hy + 0.5} r="1.3" fill="#2C2A24" />
        <circle cx={hx + 3.6} cy={hy + 0.5} r="1.3" fill="#2C2A24" />
        <path d={`M${hx - 2.5},${hy + 5} q2.5,2 5,0`} stroke="#B7795A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  // Seitenansicht: Gesicht zeigt quer zum Hals nach vorn (aufrecht: rechts, Rückenlage: oben)
  const nv = sub(po.p.head, po.p.sh);
  const nl = len(nv) || 1;
  const nn: P = [nv[0] / nl, nv[1] / nl];
  const look: P = [-nn[1], nn[0]];
  const hairC = add(add(po.p.head, mul(look, -2.2)), mul(nn, 1.6));
  const face = add(po.p.head, mul(look, 1.6));
  const eye = add(add(po.p.head, mul(look, 6.4)), mul(nn, 0.5));
  const tail0 = add(add(po.p.head, mul(look, -8)), mul(nn, -1));
  const tail1 = add(add(po.p.head, mul(look, -13)), mul(nn, -12));
  return (
    <g>
      <path d={`M${tail0[0]},${tail0[1]} Q${tail1[0] + look[0] * 4},${tail1[1] + look[1] * 4} ${tail1[0]},${tail1[1]}`} stroke={C.hair} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <circle cx={hairC[0]} cy={hairC[1]} r="10.4" fill={C.hair} />
      <circle cx={face[0]} cy={face[1]} r="9.2" fill={C.skin} />
      <circle cx={eye[0]} cy={eye[1]} r="1.4" fill="#2C2A24" />
    </g>
  );
}

export function Figure({ po, view, ghost }: { po: Pose; view: View; ghost?: boolean }) {
  const q = po.p;
  const side = view === "side";
  const far = side ? { legs: C.legsFar, arm: C.armFar } : { legs: C.legs, arm: C.arm };
  const t = torsoPath(po);
  const torso =
    side ? (
      <path d={t.d} stroke={C.jacket} strokeWidth="23" strokeLinecap="round" fill="none" />
    ) : (
      <path
        d={`M${q.hipA[0] - 6},${q.hipA[1] + 3} L${q.shA[0] - 4},${q.shA[1] - 1} Q${q.sh[0]},${q.sh[1] - 7} ${q.shB[0] + 4},${q.shB[1] - 1} L${q.hipB[0] + 6},${q.hipB[1] + 3} Q${q.hip[0]},${q.hip[1] + 9} ${q.hipA[0] - 6},${q.hipA[1] + 3} Z`}
        fill={C.jacket}
        stroke={C.jacket}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    );
  const legB = (
    <g>
      {seg(q.hipB, q.knB, far.legs, 14)}
      {seg(q.knB, q.anB, far.legs, 11)}
      <Foot an={q.anB} he={q.heB} to={q.toB} col={C.shoe} view={view} />
    </g>
  );
  const legA = (
    <g>
      {seg(q.hipA, q.knA, C.legs, 14)}
      {seg(q.knA, q.anA, C.legs, 11)}
      <Foot an={q.anA} he={q.heA} to={q.toA} col={C.shoe} view={view} />
    </g>
  );
  const armB = (
    <g>
      {seg(q.shB, q.elB, far.arm, 7.5)}
      {seg(q.elB, q.haB, far.arm, 7)}
      <circle cx={q.haB[0]} cy={q.haB[1]} r="4.2" fill={C.skin} />
    </g>
  );
  const armA = (
    <g>
      {seg(q.shA, q.elA, C.arm, 7.5)}
      {seg(q.elA, q.haA, C.arm, 7)}
      <circle cx={q.haA[0]} cy={q.haA[1]} r="4.2" fill={C.skin} />
    </g>
  );
  const neck = seg(q.sh, add(q.sh, mul(sub(q.head, q.sh), 0.55)), C.skin, 7);
  return (
    <g opacity={ghost ? 0.35 : 1}>
      {side ? (
        <>
          {armB}
          {legB}
          {torso}
          {neck}
          <Head po={po} view={view} />
          {legA}
          {armA}
        </>
      ) : (
        <>
          {torso}
          {legB}
          {legA}
          {neck}
          <Head po={po} view={view} />
          {armB}
          {armA}
        </>
      )}
    </g>
  );
}

/* ---------- Requisiten ---------- */
export function Props({ props, box }: { props: Prop[]; box: Anim["box"] }) {
  const [bx, , bw] = box;
  return (
    <g>
      {props.map((pr, i) => {
        switch (pr.k) {
          case "floor":
            return (
              <g key={i}>
                <rect x={bx - 10} y={FLOOR} width={bw + 20} height={40} fill="#E8DCC4" />
                <path d={`M${bx - 10},${FLOOR} H${bx + bw + 10}`} stroke="#C4AC84" strokeWidth="1.6" />
              </g>
            );
          case "mat":
            return <rect key={i} x={pr.x0} y={FLOOR - 1.6} width={pr.x1 - pr.x0} height={3.2} rx={1.6} fill="#5E7360" />;
          case "chair": {
            const w = pr.w ?? 40;
            const x0 = pr.x - w / 2;
            const bk = pr.back === "right" ? x0 + w : x0;
            return (
              <g key={i} fill="none" stroke="#80634D" strokeLinecap="round" strokeWidth="3.4">
                <path d={`M${x0},${pr.seat} H${x0 + w}`} strokeWidth="5" stroke="#5E4636" />
                <path d={`M${x0 + 3},${pr.seat} V${FLOOR}`} />
                <path d={`M${x0 + w - 3},${pr.seat} V${FLOOR}`} />
                {pr.back && <path d={`M${bk},${pr.seat} V${pr.seat - 42}`} strokeWidth="4" stroke="#5E4636" />}
              </g>
            );
          }
          case "wall":
            return (
              <g key={i}>
                <rect x={pr.side === "right" ? pr.x : pr.x - 60} y={-200} width={60} height={200 + FLOOR} fill="#E3E7DA" />
                <path d={`M${pr.x},-200 V${FLOOR}`} stroke="#9FAE8A" strokeWidth="2" />
              </g>
            );
          case "wallBack":
            return <rect key={i} x={bx} y={-200} width={bw} height={200 + FLOOR} fill="#E3E7DA" opacity=".7" />;
          case "support":
            return (
              <g key={i} stroke="#5E4636" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d={`M${pr.x},${FLOOR} V${-pr.h}`} />
                <path d={`M${pr.x - 8},${-pr.h} H${pr.x + 8}`} />
                <path d={`M${pr.x - 10},${FLOOR} H${pr.x + 10}`} strokeWidth="3" />
              </g>
            );
        }
      })}
    </g>
  );
}

/* ---------- Markierungen ---------- */
export function Arrow({ from, to, col, bow = 0, w = 2.6 }: { from: P; to: P; col: string; bow?: number; w?: number }) {
  const v = sub(to, from);
  const l = len(v) || 1;
  const n: P = [-v[1] / l, v[0] / l];
  const m = add(lerpP(from, to, 0.5), mul(n, bow));
  const tv = sub(to, m);
  const ta = angOf(tv);
  const h = 6;
  const a1 = add(to, mul(dir(ta + 150), h));
  const a2 = add(to, mul(dir(ta - 150), h));
  return (
    <g stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${from[0]},${from[1]} Q${m[0]},${m[1]} ${to[0]},${to[1]}`} stroke="#FBF8F1" strokeWidth={w + 2.6} opacity=".85" />
      <path d={`M${a1[0]},${a1[1]} L${to[0]},${to[1]} L${a2[0]},${a2[1]}`} stroke="#FBF8F1" strokeWidth={w + 2.6} opacity=".85" />
      <path d={`M${from[0]},${from[1]} Q${m[0]},${m[1]} ${to[0]},${to[1]}`} />
      <path d={`M${a1[0]},${a1[1]} L${to[0]},${to[1]} L${a2[0]},${a2[1]}`} />
    </g>
  );
}

/** Sichtbarkeit eines Phasenfensters (0–1, darf über das Schleifenende laufen) */
function phase(u: number, ph?: [number, number]) {
  if (!ph) return 1;
  const [a, b] = ph;
  const f = 0.04;
  const inWin = (x: number) => clamp01(Math.min((x - a) / f + 1, (b - x) / f + 1));
  return Math.max(inWin(u), inWin(u + 1), inWin(u - 1));
}

/** Schwerpunkt (grob gewichtet: Rumpf+Kopf schwer, Gliedmaßen leichter) */
export function cog(po: Pose): P {
  const q = po.p;
  const parts: Array<[P, number]> = [
    [lerpP(q.hip, q.sh, 0.45), 0.5],
    [q.head, 0.08],
    [lerpP(q.hipA, q.knA, 0.45), 0.1],
    [lerpP(q.hipB, q.knB, 0.45), 0.1],
    [lerpP(q.knA, q.anA, 0.45), 0.05],
    [lerpP(q.knB, q.anB, 0.45), 0.05],
    [lerpP(q.shA, q.haA, 0.5), 0.05],
    [lerpP(q.shB, q.haB, 0.5), 0.05],
  ];
  const w = parts.reduce((s, [, k]) => s + k, 0);
  return [parts.reduce((s, [p, k]) => s + p[0] * k, 0) / w, parts.reduce((s, [p, k]) => s + p[1] * k, 0) / w];
}

export function Overlays({ a, po, t, u, uid = "rl" }: { a: Anim; po: Pose; t: number; u: number; uid?: string }) {
  const q = po.p;
  const pulse = 0.5 + 0.5 * Math.sin(t * 5);
  const out: ReactNode[] = [];
  (a.overlays ?? []).forEach((o, i) => {
    const vis = phase(u, o.ph);
    if (vis <= 0.01) return;
    const R = (r: Ref) => resolve(r, q);
    let el: ReactNode = null;
    switch (o.k) {
      case "ring": {
        const c = R(o.at);
        el = (
          <g>
            <circle cx={c[0]} cy={c[1]} r={(o.r ?? 9) + 2 * pulse} fill="none" stroke={COLORS[o.c]} strokeWidth="2.6" />
            <circle cx={c[0]} cy={c[1]} r={(o.r ?? 9) * 0.35} fill={COLORS[o.c]} opacity=".4" />
          </g>
        );
        break;
      }
      case "arrow":
        el = <Arrow from={R(o.from)} to={R(o.to)} col={COLORS[o.c]} bow={o.bow} />;
        break;
      case "zone": {
        const [u0, u1] = o.u ?? [0.1, 0.9];
        const A = lerpP(q[o.a], q[o.b], u0);
        const B = lerpP(q[o.a], q[o.b], u1);
        el = <path d={`M${A[0]},${A[1]} L${B[0]},${B[1]}`} stroke={COLORS[o.c ?? "muscle"]} strokeWidth={(o.w ?? 15) + 3 * pulse} strokeLinecap="round" opacity=".5" />;
        break;
      }
      case "line":
        el = <path d={"M" + o.pts.map((r) => R(r).map((x) => x.toFixed(1)).join(",")).join(" L")} stroke={COLORS[o.c]} strokeWidth="1.8" strokeDasharray="4 3" fill="none" />;
        break;
      case "label": {
        const c = R(o.at);
        el = (
          <text x={c[0]} y={c[1]} textAnchor={o.anchor ?? "middle"} fontSize="9" fontWeight="700" fill={COLORS[o.c]} fontFamily="var(--font-body, system-ui)" paintOrder="stroke" stroke="#FBF8F1" strokeWidth="3.2" strokeLinejoin="round">
            {o.text}
          </text>
        );
        break;
      }
      case "pelvis": {
        // Becken als Schale, Kippung relativ zum Rumpf
        const v = sub(q.sh, q.hip);
        const ta = angOf(v) + 90 + po.tilt;
        const c = add(q.hip, mul(dir(angOf(v)), 3));
        const e1 = add(c, mul(dir(ta), 13));
        const e2 = add(c, mul(dir(ta + 180), 13));
        el = (
          <g>
            <path d={`M${e1[0]},${e1[1]} L${e2[0]},${e2[1]}`} stroke={COLORS.hint} strokeWidth="5" strokeLinecap="round" />
            <circle cx={e1[0]} cy={e1[1]} r="2.6" fill={COLORS.hint} />
          </g>
        );
        break;
      }
      case "spine": {
        const tp = torsoPath(po);
        el = <path d={tp.d} stroke={COLORS.hint} strokeWidth="2" strokeDasharray="3 2.5" fill="none" />;
        break;
      }
      case "cog": {
        const g = cog(po);
        const x0 = Math.min(q.heA[0], q.heB[0], q.toA[0], q.toB[0]);
        const x1 = Math.max(q.heA[0], q.heB[0], q.toA[0], q.toB[0]);
        const inside = g[0] >= x0 - 1 && g[0] <= x1 + 1;
        // ohne „strict“ ist „noch nicht über den Füßen“ nur ein Hinweis (z. B. im Sitzen), kein Fehler
        const over = inside;
        const offCol = o.strict ? COLORS.bad : COLORS.hint;
        el = (
          <g>
            <path d={`M${x0},${FLOOR + 3} H${x1}`} stroke={over ? COLORS.ok : offCol} strokeWidth="3" strokeLinecap="round" opacity=".7" />
            <path d={`M${g[0]},${g[1]} V${FLOOR + 2}`} stroke={over ? COLORS.ok : offCol} strokeWidth="1.4" strokeDasharray="3 2.5" />
            <circle cx={g[0]} cy={g[1]} r="5" fill="#FBF8F1" stroke={over ? COLORS.ok : offCol} strokeWidth="2" />
            <path d={`M${g[0] - 5},${g[1]} A5 5 0 0 1 ${g[0]},${g[1] - 5} V${g[1]} Z M${g[0] + 5},${g[1]} A5 5 0 0 1 ${g[0]},${g[1] + 5} V${g[1]} Z`} fill={over ? COLORS.ok : offCol} />
          </g>
        );
        break;
      }
      case "level": {
        const c = q[o.at];
        const tiltDeg = angOf(sub(q.hipB, q.hipA));
        const ok = Math.abs(tiltDeg) < 3 || Math.abs(Math.abs(tiltDeg) - 180) < 3;
        el = (
          <g>
            <path d={`M${c[0] - 26},${c[1] + 12} H${c[0] + 26}`} stroke={ok ? COLORS.ok : COLORS.bad} strokeWidth="1.6" strokeDasharray="4 3" />
            <path d={`M${q.hipA[0]},${q.hipA[1]} L${q.hipB[0]},${q.hipB[1]}`} stroke={ok ? COLORS.ok : COLORS.bad} strokeWidth="3" strokeLinecap="round" opacity=".8" transform="translate(0 12)" />
          </g>
        );
        break;
      }
      case "trail": {
        const n = 48;
        const ptsT: P[] = [];
        for (let k = 0; k <= n; k++) ptsT.push(poseAt(a, (k / n) * a.dur).p[o.j]);
        el = <path d={"M" + ptsT.map((p) => p.map((x) => x.toFixed(1)).join(",")).join(" L")} stroke={COLORS[o.c]} strokeWidth="1.6" strokeDasharray="2.5 2" fill="none" opacity=".9" />;
        break;
      }
      case "press": {
        const c = q[o.j];
        el = <ellipse cx={c[0]} cy={FLOOR + 1} rx={9 + 2 * pulse} ry={3} fill={COLORS.hint} opacity={0.35 + 0.25 * pulse} />;
        break;
      }
      case "scap": {
        // Schulterblätter (hinter dem Rumpf) drehen mit, wenn die Arme steigen
        const els: ReactNode[] = [];
        for (const s of ["A", "B"] as const) {
          const sh = q[`sh${s}`];
          const el2 = q[`el${s}`];
          const raise = clamp01((sh[1] - el2[1] + 10) / 40);
          const sg = s === "A" ? -1 : 1;
          const rot = sg * raise * 28;
          const c = add(sh, [-sg * 5, 12 - raise * 4]);
          els.push(
            <path key={s} d="M-5,-7 L6,-6 L-1,10 Z" transform={`translate(${c[0]} ${c[1]}) rotate(${rot})`} fill="none" stroke={COLORS.hint} strokeWidth="1.6" strokeDasharray="2.5 1.8" strokeLinejoin="round" />,
          );
        }
        el = <g>{els}</g>;
        break;
      }
      case "beat": {
        const k = Math.floor(u * o.n) % o.n;
        el = (
          <g>
            {Array.from({ length: o.n }, (_, i2) => (
              <g key={i2}>
                <circle cx={o.at[0] + i2 * 16} cy={o.at[1]} r={i2 === k ? 6 : 4.5} fill={i2 === k ? COLORS.hint : "#E8DCC4"} />
                <text x={o.at[0] + i2 * 16} y={o.at[1] + 3} textAnchor="middle" fontSize="7" fontWeight="700" fill={i2 === k ? "#FBF8F1" : COLORS.ink} fontFamily="var(--font-body, system-ui)">{i2 + 1}</text>
              </g>
            ))}
          </g>
        );
        break;
      }
      case "water": {
        const dt = 0.06;
        const hm = (pp: Pose) => lerpP(pp.p.haA, pp.p.haB, 0.5);
        const p0 = hm(poseAt(a, t - dt));
        const p1 = hm(po);
        const p2 = hm(poseAt(a, t + dt));
        const acc: P = [(p2[0] - 2 * p1[0] + p0[0]) / (dt * dt), (p2[1] - 2 * p1[1] + p0[1]) / (dt * dt)];
        const vel = Math.hypot(p2[0] - p0[0], p2[1] - p0[1]) / (2 * dt);
        const tiltW = Math.max(-28, Math.min(28, -acc[0] * 0.08 - acc[1] * 0.04));
        const c: P = [p1[0] + 2, p1[1] - 6];
        const spill = vel > 60 || Math.abs(acc[1]) > 500;
        el = (
          <g>
            <defs>
              <clipPath id={`${uid}-glass-${i}`}><path d={`M${c[0] - 6},${c[1] - 9} L${c[0] + 6},${c[1] - 9} L${c[0] + 5},${c[1] + 9} L${c[0] - 5},${c[1] + 9} Z`} /></clipPath>
            </defs>
            <g clipPath={`url(#${uid}-glass-${i})`}>
              <rect x={c[0] - 12} y={c[1] - 1} width={24} height={20} fill="#8DB7C9" opacity=".8" transform={`rotate(${tiltW} ${c[0]} ${c[1]})`} />
            </g>
            <path d={`M${c[0] - 6},${c[1] - 9} L${c[0] + 6},${c[1] - 9} L${c[0] + 5},${c[1] + 9} L${c[0] - 5},${c[1] + 9} Z`} fill="none" stroke="#5D574C" strokeWidth="1.3" />
            {spill && (
              <g fill="#8DB7C9">
                <circle cx={c[0] + 8} cy={c[1] - 11} r="1.6" />
                <circle cx={c[0] + 11} cy={c[1] - 6} r="1.2" />
              </g>
            )}
          </g>
        );
        break;
      }
      case "clock": {
        // Beckenuhr von oben: 12 = Becken vor, 6 = zurück, 3/9 = seitlich
        const ang = u * 360 - 90;
        const d = add(o.at, mul(dir(ang), 15));
        el = (
          <g>
            <circle cx={o.at[0]} cy={o.at[1]} r="20" fill="#FBF8F1" stroke={COLORS.hint} strokeWidth="1.6" />
            {[0, 90, 180, 270].map((g) => {
              const a1 = add(o.at, mul(dir(g - 90), 16));
              const a2 = add(o.at, mul(dir(g - 90), 20));
              return <path key={g} d={`M${a1[0]},${a1[1]} L${a2[0]},${a2[1]}`} stroke={COLORS.hint} strokeWidth="1.6" />;
            })}
            <text x={o.at[0]} y={o.at[1] - 23} textAnchor="middle" fontSize="7" fontWeight="700" fill={COLORS.ink} fontFamily="var(--font-body, system-ui)">vor</text>
            <text x={o.at[0]} y={o.at[1] + 29} textAnchor="middle" fontSize="7" fontWeight="700" fill={COLORS.ink} fontFamily="var(--font-body, system-ui)">zurück</text>
            <circle cx={d[0]} cy={d[1]} r="3.6" fill={COLORS.ok} />
          </g>
        );
        break;
      }
    }
    out.push(
      <g key={i} opacity={vis}>
        {el}
      </g>,
    );
  });
  return <>{out}</>;
}

/** Eine komplette Szene (Requisiten, Figur, Markierungen) zur Zeit t */
export function Scene({ a, t, title }: { a: Anim; t: number; title?: string }) {
  const uid = useId().replace(/:/g, "");
  const po = poseAt(a, t);
  const u = (((t % a.dur) + a.dur) % a.dur) / a.dur;
  const [x, y, w, h] = a.box;
  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} role="img" aria-label={title} style={{ display: "block", width: "100%", height: "auto" }}>
      <rect x={x} y={y} width={w} height={h} fill="#FBF8F1" />
      <Props props={a.props ?? [{ k: "floor" }]} box={a.box} />
      <g transform={a.rotate ? `rotate(${a.rotate})` : undefined}>
        <Figure po={po} view={a.view} />
        <Overlays a={a} po={po} t={t} u={u} uid={uid} />
      </g>
    </svg>
  );
}
