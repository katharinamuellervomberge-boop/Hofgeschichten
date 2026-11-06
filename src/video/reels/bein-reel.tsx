import { bodyBob, type Gait } from "@/components/illustrations/akademie/AnimHorse";
import { BIT, SITZ, type Body, type P } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import type { ReactNode } from "react";
import { HomeScreen } from "./nov-akademie";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Ground, Header, HookText, IconBadge, NodHorse, PAPER, Phone, Pop, S, T, Title, W, H, back, ease, headPoint, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { Arrow, Merk } from "./rkit";
import { Arena, LEATHER, elbowFor, groundSpeed, reinGeom } from "./rs-kit";

/* Reiten verstehen (9:16): „Deine Knie rutschen immer hoch?“ (comp `bein`)
   Reiterin seitlich auf Tivoli. Bein-Posen als Gelenkpunkte (Hüfte, Knie, Sprunggelenk, Ferse, Zehe) in
   Pferde-Koordinaten, weich ineinander überblendet: hochgezogen · klemmt · Ferse gedrückt (Bein rutscht vor) · lang.
   Ursachen 1–3 in Nahaufnahme, Einflüsse (Bügel, Sattel, Beweglichkeit), Vergleich ✗/✓ mit Linie Ohr–Schulter–Hüfte–Ferse,
   Ferse etwas tiefer als die Zehe (nicht gedrückt). Übung 1 nur im Stand mit Helfer, Übung 2 Hüftbeuger-Dehnung im
   halben Kniestand. Übung 3 (im Sattel) bleibt gesperrt → Reitakademie. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Deine Knie rutschen beim Reiten immer hoch?", 0, 2.7],
  ["a2", "Und dein Bein will einfach nicht nach unten?", 3.12, 5.3],
  ["b1", "Meistens liegt das gar nicht am Bein selbst.", 5.75, 8.04],
  ["c1", "Du klemmst mit Knie und Oberschenkel.", 8.4, 10.68],
  ["d1", "Deine Hüfte ist fest – und das Becken schwingt nicht mit.", 11.06, 14.09],
  ["e1", "Oder du drückst die Fersen mit aller Kraft nach unten.", 14.45, 17.4],
  ["f1", "Auch Bügellänge, Sattel und Beweglichkeit spielen mit.", 17.79, 20.83],
  ["g1", "Richtig ist: lockere Hüfte, langer Oberschenkel –", 21.18, 24.5],
  ["g2", "der Unterschenkel fällt von selbst nach unten.", 24.77, 26.83],
  ["g3", "Die Ferse sinkt, ganz ohne Druck.", 27.16, 29.39],
  ["h1", "Zwei Übungen zum Ausprobieren:", 29.72, 31.45],
  ["i0", "Eins:", 31.81, 32.32],
  ["i1", "Im Stand, wenn jemand dein Pferd hält, spannst du die Knie kurz fest an –", 32.59, 36.85],
  ["i2", "und lässt wieder los.", 37.31, 38.65],
  ["i3", "Spür, wie dein Bein weicher wird.", 39.03, 41.03],
  ["j0", "Zwei,", 41.43, 41.86],
  ["j1", "am Boden:", 42.14, 42.72],
  ["j2", "halber Kniestand, Becken leicht aufrichten,", 43.04, 45.71],
  ["j3", "langsam nach vorn.", 45.97, 47.1],
  ["j4", "Eine Dehnung vorne an der Hüfte –", 47.46, 49.29],
  ["j5", "aber niemals Schmerz.", 49.55, 50.98],
  ["k1", "Ein langes Bein entsteht durch Losgelassenheit –", 51.33, 54.2],
  ["k2", "nicht durch Druck.", 54.51, 55.46],
  ["l1", "Die wichtigste Übung im Sattel?", 55.87, 57.35],
  ["l2", "Zeigen wir dir in der Hofgeschichten Reitakademie.", 57.61, 60.24],
  ["l3", "Schreib AKADEMIE in die Kommentare!", 60.46, 62.37],
];
export const BEIN_LINES = mkLines(REC);
const L = BEIN_LINES;
export const BEIN_TOTAL = E(L, "l3") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tivoli")!.look;
const NOD = 6;
const REIN = Math.hypot(headPoint(BIT, NOD, 0)[0] - SITZ.hand[0] - 2, headPoint(BIT, NOD, 0)[1] - SITZ.hand[1]) + 1.5;

/* ---------- Bein-Posen (Pferde-Koordinaten) ---------- */
type Leg = { knee: P; ankle: P; heel: P; toe: P };
const LEG: Record<"sitz" | "hoch" | "klemm" | "drueck" | "lang", Leg> = {
  sitz: { knee: SITZ.knee, ankle: SITZ.ankle, heel: SITZ.heel, toe: SITZ.toe },
  /** Knie hochgezogen, Unterschenkel nach hinten-oben, Ferse hoch */
  hoch: { knee: [256, 135], ankle: [241, 176], heel: [235, 173], toe: [252, 188] },
  /** noch stärker geklemmt */
  klemm: { knee: [258, 132], ankle: [245, 171], heel: [239, 168], toe: [256, 183] },
  /** Ferse mit Kraft gedrückt: Bein rutscht nach vorn, Knie geht mit hoch */
  drueck: { knee: [252, 140], ankle: [250, 182], heel: [246, 190], toe: [266, 184] },
  /** lockere Hüfte, langer Oberschenkel, Unterschenkel hängt, Ferse etwas tiefer als die Zehe */
  lang: { knee: [242, 150], ankle: [226, 191], heel: [221, 197], toe: [240, 195] },
};
const mixP = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
const mixLeg = (a: Leg, b: Leg, u: number): Leg => ({ knee: mixP(a.knee, b.knee, u), ankle: mixP(a.ankle, b.ankle, u), heel: mixP(a.heel, b.heel, u), toe: mixP(a.toe, b.toe, u) });
/** Posen-Folge: ab Zeitpunkt k[0] in `dur` Sekunden zur Pose k[1] */
function legAt(t: number, keys: Array<[number, Leg]>, dur = 0.5): Leg {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const u = sm((t - keys[i][0]) / dur);
    if (u <= 0) break;
    v = mixLeg(v, keys[i][1], u);
  }
  return v;
}
const LEAN = { shoulder: [215, 61] as P, head: [216, 42] as P };
/** Körper aus Bein-Pose; `lean` = Oberkörper hinter die Senkrechte (Stuhlsitz), `swing` = Becken schwingt mit */
function bodyFor(leg: Leg, lean = 0, swing = 0): Body {
  const dx = swing;
  const sh = mixP(SITZ.shoulder, LEAN.shoulder, lean);
  const hd = mixP(SITZ.head, LEAN.head, lean);
  const hip: P = [SITZ.hip[0] + dx, SITZ.hip[1]];
  const shoulder: P = [sh[0] + dx * 0.4, sh[1]];
  const head: P = [hd[0] + dx * 0.3, hd[1]];
  const hand = SITZ.hand;
  return { hip, shoulder, head, hand, elbow: elbowFor(shoulder, SITZ.elbow, SITZ.hand, hand), ...leg };
}
/** Becken schwingt im Schritt mit (pro Hinterbein ein Schwung) */
const swingAt = (t: number, amt: number) => amt * 1.6 * Math.sin((2 * Math.PI * t) / 1.2);

const legPath = (b: Body) => `M${b.hip[0]},${b.hip[1]} L${b.knee[0]},${b.knee[1]} L${b.ankle[0]},${b.ankle[1]} L${b.toe[0]},${b.toe[1]}`;

/** Pferd + Reiterin mit eigener Bein-Pose und echter Zügellinie */
function RideFig({ t, pl, gait, id, b, glow }: { t: number; pl: Place; gait: Gait; id: string; b: Body; glow?: string }) {
  const r = reinGeom({ nod: NOD, reach: 0, hand: b.hand, rein: REIN });
  const bob = bodyBob(gait, t);
  return (
    <g>
      <NodHorse t={t} pl={pl} look={LOOK} gait={gait} id={id} nod={NOD} slices={18}>
        <Tack hand={b.hand} longRein={false} stirrupsDown={false} noRein />
      </NodHorse>
      <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
        <g transform={`translate(0 ${bob})`}>
          {glow && <path d={legPath(b)} fill="none" stroke={glow} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" opacity=".22" />}
          <Rider b={b} pose="sitz" />
          <path d={r.path} fill="none" stroke={LEATHER} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={b.hand[0]} cy={b.hand[1]} r="4.6" fill="#5E4636" />
        </g>
      </svg>
    </g>
  );
}

/* ---------- kleine Zeichen ---------- */
function Ring({ p, col, o, pulse, r = 26 }: { p: P; col: string; o: number; pulse: number; r?: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      <circle cx={p[0]} cy={p[1]} r={r + 6 * pulse} fill="none" stroke={col} strokeWidth="6" />
      <circle cx={p[0]} cy={p[1]} r={r * 0.4} fill={col} opacity=".35" />
    </g>
  );
}
function Arr({ from, to, col, o, w = 8 }: { from: P; to: P; col: string; o: number; w?: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      <Arrow from={from} to={to} color={PAPER} w={w + 7} head={w * 2.6} />
      <Arrow from={from} to={to} color={col} w={w} head={w * 2.6} />
    </g>
  );
}
function Lock({ x, y, s = 1, col = COL.forestDeep }: { x: number; y: number; s?: number; col?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 -6 V-24 a22 22 0 0 1 44 0 V-6" fill="none" stroke={col} strokeWidth="9" strokeLinecap="round" />
      <rect x="-34" y="-8" width="68" height="54" rx="12" fill={col} />
      <circle cx="0" cy="14" r="7" fill={COL.honey} />
      <rect x="-3" y="16" width="6" height="16" rx="3" fill={COL.honey} />
    </g>
  );
}
function camera(t: number, keys: Array<[number, Place]>, dur = 0.8): Place {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const u = sm((t - keys[i][0]) / dur);
    if (u <= 0) break;
    const n = keys[i][1];
    v = { x: lerp(v.x, n.x, u), y: lerp(v.y, n.y, u), k: lerp(v.k, n.k, u) };
  }
  return v;
}

/* ---------- Mensch stehend/kniend (für Helfer und Übung am Boden) ---------- */
type Fig = { hip: P; shoulder: P; head: P; knee: P; ankle: P; heel: P; toe: P; knee2: P; ankle2: P; heel2: P; toe2: P; elbow: P; hand: P; elbow2: P; hand2: P };
const SKIN = "#E8AE86";
function seg(a: P, b: P, col: string, w: number) {
  return <path d={`M${a[0]},${a[1]} L${b[0]},${b[1]}`} stroke={col} strokeWidth={w} strokeLinecap="round" />;
}
function foot(ankle: P, heel: P, toe: P, col: string) {
  return <path d={`M${ankle[0]},${ankle[1] - 3} L${heel[0]},${heel[1]} L${toe[0]},${toe[1]} Q${(ankle[0] + toe[0]) / 2},${ankle[1] - 2} ${ankle[0]},${ankle[1] - 3} Z`} fill={col} stroke={col} strokeWidth="5" strokeLinejoin="round" />;
}
function Person({ f, face, jacket, legs, legsShade, boots, hair = "#5A3420" }: { f: Fig; face: 1 | -1; jacket: string; legs: string; legsShade: string; boots: string; hair?: string }) {
  const dx = f.shoulder[0] - f.hip[0];
  const dy = f.shoulder[1] - f.hip[1];
  const l = Math.hypot(dx, dy);
  const nx = (-dy / l) * 11;
  const ny = (dx / l) * 11;
  const [hx, hy] = f.head;
  return (
    <g>
      {seg(f.shoulder, f.elbow2, "#26342A", 7)}
      {seg(f.elbow2, f.hand2, "#26342A", 7)}
      {seg(f.hip, f.knee2, legsShade, 15)}
      {seg(f.knee2, f.ankle2, boots, 11)}
      {foot(f.ankle2, f.heel2, f.toe2, boots)}
      <path d={`M${f.hip[0] - nx},${f.hip[1] - ny + 3} L${f.shoulder[0] - nx * 0.85},${f.shoulder[1] - ny * 0.85} Q${f.shoulder[0]},${f.shoulder[1] - 8} ${f.shoulder[0] + nx * 0.85},${f.shoulder[1] + ny * 0.85} L${f.hip[0] + nx},${f.hip[1] + ny + 3} Z`} fill={jacket} />
      {seg(f.shoulder, [hx, hy + 8], SKIN, 7)}
      <path d={`M${hx - face * 8},${hy - 4} C${hx - face * 18},${hy + 2} ${hx - face * 16},${hy + 16} ${hx - face * 12},${hy + 22}`} stroke={hair} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r="10" fill={SKIN} />
      <path d={`M${hx - 10},${hy - 1} C${hx - 9},${hy - 13} ${hx + 9},${hy - 13} ${hx + 10},${hy - 1} C${hx + 4},${hy - 7} ${hx - 4},${hy - 7} ${hx - 10},${hy - 1} Z`} fill={hair} />
      <circle cx={hx + face * 6} cy={hy} r="1.4" fill="#2C2A24" />
      {seg(f.hip, f.knee, legs, 15)}
      {seg(f.knee, f.ankle, boots, 11)}
      {foot(f.ankle, f.heel, f.toe, boots)}
      {seg(f.shoulder, f.elbow, "#2E3D31", 7.5)}
      {seg(f.elbow, f.hand, "#2E3D31", 7.5)}
      <circle cx={f.hand[0]} cy={f.hand[1]} r="4.4" fill={SKIN} />
    </g>
  );
}
/** Helferin steht vor dem Pferd und hält es am Strick (Pferde-Koordinaten, Blick nach links) */
const HELPER: Fig = {
  hip: [401, 190], shoulder: [398, 132], head: [396, 112],
  knee: [396, 236], ankle: [394, 279], heel: [399, 283], toe: [382, 283],
  knee2: [404, 236], ankle2: [405, 279], heel2: [410, 283], toe2: [393, 283],
  elbow: [386, 158], hand: [372, 166], elbow2: [405, 162], hand2: [404, 190],
};
/** Halber Kniestand (lokale Einheiten, Boden y = 0, Blick nach rechts). `shift` 0–1 = nach vorn verlagern */
function kneel(shift: number): Fig {
  const knee2: P = [-40, -7];
  const th = ((22 + 12 * shift) * Math.PI) / 180;
  const hip: P = [knee2[0] + 54 * Math.sin(th), knee2[1] - 54 * Math.cos(th)];
  const ankle: P = [34, -8];
  const e0: P = [hip[0] + 48, hip[1] + 14];
  const knee = elbowFor(hip, e0, [e0[0], e0[1] + 42], ankle);
  const shoulder: P = [hip[0] + 3, hip[1] - 50];
  const head: P = [shoulder[0] + 3, shoulder[1] - 22];
  const hand: P = [knee[0] - 10, knee[1] - 8];
  const a0: P = [shoulder[0] + 8, shoulder[1] + 25];
  const elbow = elbowFor(shoulder, a0, [a0[0] + 20, a0[1] + 17], hand);
  return {
    hip, shoulder, head, knee, ankle, heel: [26, -2], toe: [50, -2],
    knee2, ankle2: [-84, -7], heel2: [-86, -12], toe2: [-100, -2],
    elbow, hand, elbow2: [elbow[0] - 4, elbow[1] + 2], hand2: [hand[0] - 6, hand[1] + 4],
  };
}

/* ---------- Kamera-Einstellungen ---------- */
const V_FULL: Place = { x: 540 - 160 * 2.6, y: 1390 - 285 * 2.6, k: 2.6 };
const V_LEG: Place = { x: 540 - (238 - 70) * 3.9, y: 1000 - (150 - 20) * 3.9, k: 3.9 };
const V_EX: Place = { x: 520 - (290 - 70) * 2.35, y: 1420 - 285 * 2.35, k: 2.35 };

/* ---------- Szene: Vergleich ✗ / ✓ ---------- */
function Panel({ t, x, good }: { t: number; x: number; good: boolean }) {
  const k = 2.2;
  const pl: Place = { x: x + 270 - (232 - 70) * k, y: 1330 - 285 * k, k };
  const id = good ? "bn-r" : "bn-l";
  const u = sm((t - S(L, "g1") - 0.3) / (E(L, "g2") - S(L, "g1") - 0.3));
  const leg = good ? mixLeg(LEG.sitz, LEG.lang, u) : LEG.hoch;
  const b = bodyFor(leg, 0, good ? swingAt(t, 1) : 0);
  const bob = bodyBob("schritt", t);
  const scr = (p: P) => hs(pl, [p[0], p[1] + bob]);
  const col = good ? COL.forest : COL.rust;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const lineO = ease((t - S(L, "g2")) / 0.5);
  const line = [[b.head[0], b.head[1] - 22], b.shoulder, b.hip, [b.heel[0], b.heel[1] + 6]].map((p) => scr(p as P));
  const lineD = "M" + line.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L");
  const heelO = good ? ease((t - S(L, "g3")) / 0.4) : 0;
  const hS = scr(b.heel);
  const tS = scr(b.toe);
  return (
    <g>
      <defs><clipPath id={`${id}-c`}><rect x={x + 10} y={620} width={520} height={760} rx="36" /></clipPath></defs>
      <g clipPath={`url(#${id}-c)`}>
        <g transform={`translate(${x - 270} 0)`}><Arena t={t} speed={groundSpeed("schritt", k)} y={pl.y + 285 * k} top={620} /></g>
        <RideFig t={t} pl={pl} gait="schritt" id={id} b={b} glow={good && u > 0.3 ? COL.forest : !good ? COL.rust : undefined} />
        {lineO > 0.01 && <path d={lineD} fill="none" stroke={good ? COL.forest : COL.rust} strokeWidth="4.5" strokeDasharray="12 9" opacity={lineO * 0.9} />}
        {good ? (
          <>
            <Ring p={scr(b.hip)} col={COL.forest} o={ease((t - at("g1", "lockere")) / 0.3)} pulse={pulse} r={20} />
            <Ring p={scr(b.knee)} col={COL.forest} o={ease((t - at("g1", "langer")) / 0.3) * 0.8} pulse={pulse} r={16} />
          </>
        ) : (
          <Ring p={scr(b.knee)} col={COL.rust} o={1} pulse={pulse} r={20} />
        )}
        {heelO > 0.01 && (
          <g opacity={heelO} stroke={COL.honey} strokeWidth="4" strokeDasharray="8 6">
            <path d={`M${hS[0] - 50} ${hS[1] + 3} H${tS[0] + 40}`} />
            <path d={`M${tS[0] - 16} ${tS[1] + 3} H${tS[0] + 40}`} opacity=".6" />
          </g>
        )}
        {heelO > 0.01 && <Arr from={[hS[0] - 34, hS[1] - 70]} to={[hS[0] - 34, hS[1] - 8]} col={COL.forest} o={heelO} w={6} />}
      </g>
      <rect x={x + 10} y={620} width={520} height={760} rx="36" fill="none" stroke={col} strokeWidth="6" />
      <g transform={`translate(${x + 270} 1310)`}>
        <circle r="38" fill={col} />
        <T x={0} y={16} size={46} font={FONT_BODY} weight={700} color={PAPER}>{good ? "✓" : "✗"}</T>
      </g>
      <T x={x + 270} y={1440} size={36} font={FONT_BODY} weight={700} color={col}>{good ? "losgelassen" : "angespannt"}</T>
      <T x={x + 270} y={1490} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft}>{good ? "Bein lang, Ferse sinkt" : "Bein hochgezogen"}</T>
    </g>
  );
}

/* ---------- Szene: Übungskarten ---------- */
function ExCard({ t, a, x, y, n, title, sub, locked }: { t: number; a: number; x: number; y: number; n: string; title: string; sub: string; locked?: boolean }) {
  const k = back((t - a) / 0.45);
  if (k <= 0.01) return null;
  const w = 290;
  const h = 400;
  const fill = locked ? COL.sandLight : COL.forest;
  const ink = locked ? COL.brownDeep : PAPER;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} ${y + h / 2}) scale(${Math.max(0.01, k)}) translate(${-x} ${-(y + h / 2)})`}>
      <rect x={x - w / 2} y={y} width={w} height={h} rx="36" fill={fill} stroke={locked ? COL.honey : "none"} strokeWidth="5" strokeDasharray={locked ? "14 10" : undefined} />
      <g filter={locked ? "url(#bn-blur)" : undefined} opacity={locked ? 0.55 : 1}>
        <circle cx={x} cy={y + 96} r="52" fill={locked ? COL.sand : COL.honey} />
        <T x={x} y={y + 120} size={64} color={locked ? COL.brownDeep : COL.forestDeep}>{n}</T>
        <T x={x} y={y + 228} size={40} color={ink}>{title}</T>
        <T x={x} y={y + 282} size={28} font={FONT_BODY} weight={700} color={locked ? COL.brown : COL.sand}>{sub}</T>
      </g>
      {locked && (
        <>
          <Lock x={x} y={y + 190} s={1.15} />
          <T x={x} y={y + 352} size={26} font={FONT_BODY} weight={700} color={COL.forestDeep}>in der Reitakademie</T>
        </>
      )}
    </g>
  );
}

export function renderBein(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookEnd = E(L, "a2") + 0.15;

  /* Szenenfenster */
  const bA = S(L, "f1") - 0.25;
  const bF = S(L, "g1") - 0.25;
  const bG = S(L, "h1") - 0.25;
  const bH = S(L, "i0") - 0.2;
  const bI = S(L, "j0") - 0.2;
  const bJ = S(L, "k1") - 0.25;
  const bK = S(L, "l1") - 0.25;
  const oA = win(t, 0, bA, 0.35);
  const oF = win(t, bA, bF, 0.35);
  const oG = win(t, bF, bG, 0.35);
  const oH = win(t, bG, bH, 0.35);
  const oI = win(t, bH, bI, 0.35);
  const oJ = win(t, bI, bJ, 0.35);
  const oK = win(t, bJ, bK, 0.35);
  const oL = win(t, bK, BEIN_TOTAL + 1, 0.35);

  /* --- A: Hook + Ursachen --- */
  const plA = camera(t, [[0, V_FULL], [S(L, "b1") - 0.35, V_LEG]]);
  const tDr = at("e1", "drückst") - 0.1;
  const legA = legAt(t, [[0, LEG.sitz], [0.15, LEG.hoch], [at("c1", "klemmst") - 0.1, LEG.klemm], [S(L, "d1") + 0.2, LEG.hoch], [tDr, LEG.drueck]], 0.55);
  const bA_ = bodyFor(legA, sm((t - tDr) / 0.6), 0);
  const bobA = bodyBob("schritt", t);
  const sA = (p: P) => hs(plA, [p[0], p[1] + bobA]);
  const kneeA = sA(bA_.knee);
  const hipA = sA(bA_.hip);
  const ankA = sA(bA_.ankle);
  const heelA = sA(bA_.heel);
  const thighM = sA(mixP(bA_.hip, bA_.knee, 0.55));
  const ghost = bodyFor(LEG.lang);
  const gO = win(t, S(L, "a2") - 0.1, E(L, "b1") - 0.3) * 0.9;
  const cO = win(t, S(L, "c1") - 0.1, E(L, "c1"));
  const dO = win(t, S(L, "d1") - 0.1, E(L, "d1"));
  const eO = win(t, S(L, "e1") - 0.1, E(L, "e1") + 0.2);
  const qO = win(t, at("b1", "Bein") - 0.3, E(L, "b1"));
  /* Klemmen: Druckpfeile quer zum Oberschenkel */
  const tv = [bA_.knee[0] - bA_.hip[0], bA_.knee[1] - bA_.hip[1]];
  const tl = Math.hypot(tv[0], tv[1]);
  const nrm: P = [-tv[1] / tl, tv[0] / tl];
  const pinch = 8 * Math.sin(t * 9);

  /* --- I: Übung 1 --- */
  const tFest = at("i1", "fest") - 0.05;
  const tLos = at("i2", "lässt");
  const legI = legAt(t, [[0, LEG.sitz], [tFest, LEG.klemm], [tLos, LEG.sitz], [S(L, "i3") - 0.1, LEG.lang]], 0.4);
  const bI_ = bodyFor(legI);
  const sI = (p: P) => hs(V_EX, p);
  const tense = win(t, tFest, tLos - 0.2, 0.15);
  const relax = win(t, tLos, bI, 0.3);
  const bitI = headPoint(BIT, NOD, 0);
  const handH = HELPER.hand;
  const rope = `M${bitI[0]},${bitI[1] + 2} Q${(bitI[0] + handH[0]) / 2},${Math.max(bitI[1], handH[1]) + 22} ${handH[0]},${handH[1]}`;

  /* --- J: Übung 2 --- */
  const shift = sm((t - S(L, "j3") + 0.1) / 1.4);
  const fig = kneel(shift);
  const KX = 610;
  const KY = 1320;
  const KS = 4.5;
  const sJ = (p: P): P => [KX + p[0] * KS, KY + p[1] * KS];
  const tiltO = win(t, at("j2", "Becken") - 0.1, E(L, "j3"), 0.3);
  const fwdO = win(t, S(L, "j3") - 0.1, E(L, "j3") + 0.4, 0.3);
  const strO = ease((t - S(L, "j4") + 0.1) / 0.5);
  const stretchD = (() => {
    const a = sJ(fig.hip);
    const b = sJ(mixP(fig.hip, fig.knee2, 0.62));
    return `M${a[0]},${a[1]} L${b[0]},${b[1]}`;
  })();
  const hipJ = sJ(fig.hip);

  /* --- K: Merksatz --- */
  const bK_ = bodyFor(LEG.lang, 0, swingAt(t, 1));

  /* --- L: Ende --- */
  const lockK = ease((t - S(L, "l1") + 0.1) / 0.5);
  const lockO = win(t, bK, S(L, "l2") + 0.2, 0.35);
  const phoneO = win(t, S(L, "l2") - 0.1, S(L, "l3") + 0.1, 0.4);
  const scroll = 380 * sm((t - S(L, "l2") - 0.6) / 1.6);
  const comO = ease((t - S(L, "l3") + 0.1) / 0.3);

  const hideHead = Math.max(win(t, 0, hookEnd), oL);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs><filter id="bn-blur"><feGaussianBlur stdDeviation="6" /></filter></defs>
      <rect width={W} height={H} fill={COL.bg} />

      {/* A · Hook + drei Ursachen */}
      {oA > 0.01 && (
        <g opacity={oA}>
          <Arena t={t} speed={groundSpeed("schritt", plA.k)} y={plA.y + 285 * plA.k} />
          <svg x={plA.x} y={plA.y} width={320 * plA.k} height={292 * plA.k} viewBox="70 20 320 292" overflow="visible" opacity={gO}>
            <g transform={`translate(0 ${bobA})`}>
              <path d={legPath(ghost)} fill="none" stroke={COL.forest} strokeWidth="4" strokeDasharray="6 5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={ghost.heel[0]} cy={ghost.heel[1]} r="4" fill={COL.forest} />
            </g>
          </svg>
          <RideFig t={t} pl={plA} gait="schritt" id="bn-a" b={bA_} glow={t > 0.5 && t < bA ? COL.rust : undefined} />
          {/* Hook: Knie hoch */}
          <Ring p={kneeA} col={COL.rust} o={win(t, 0.5, E(L, "b1") - 0.4)} pulse={pulse} r={30} />
          <Arr from={[kneeA[0] + 80, kneeA[1] + 60]} to={[kneeA[0] + 80, kneeA[1] - 40]} col={COL.rust} o={win(t, 0.6, hookEnd)} />
          <Arr from={[ankA[0] + 40, ankA[1] - 10]} to={[sA(ghost.ankle)[0] + 40, sA(ghost.ankle)[1] + 30]} col={COL.forest} o={win(t, S(L, "a2"), E(L, "a2") + 0.2) * 0.9} w={6} />
          {/* b1: liegt woanders */}
          <Pop t={t} a={at("b1", "Bein") - 0.3} x={hipA[0] - 120} y={hipA[1] - 30} text="Hüfte?" fill={COL.honey} color={COL.forestDeep} size={34} o={qO} />
          <Pop t={t} a={at("b1", "Bein") - 0.1} x={kneeA[0] + 150} y={kneeA[1] - 30} text="Knie?" fill={COL.honey} color={COL.forestDeep} size={34} o={qO} />
          <Pop t={t} a={at("b1", "Bein") + 0.1} x={heelA[0] - 110} y={heelA[1] + 40} text="Ferse?" fill={COL.honey} color={COL.forestDeep} size={34} o={qO} />
          {/* 1 Klemmen */}
          <Arr from={[thighM[0] + nrm[0] * (190 + pinch), thighM[1] + nrm[1] * (190 + pinch)]} to={[thighM[0] + nrm[0] * 50, thighM[1] + nrm[1] * 50]} col={COL.rust} o={cO} />
          <Arr from={[thighM[0] - nrm[0] * (190 + pinch), thighM[1] - nrm[1] * (190 + pinch)]} to={[thighM[0] - nrm[0] * 50, thighM[1] - nrm[1] * 50]} col={COL.rust} o={cO} />
          <Pop t={t} a={at("c1", "Knie")} x={kneeA[0] + 170} y={kneeA[1] - 60} text="Knie geht hoch" fill={COL.rust} size={32} o={cO} />
          <Pop t={t} a={at("c1", "Oberschenkel")} x={ankA[0] + 190} y={ankA[1] + 40} text="Unterschenkel weg" fill={COL.rust} size={30} o={cO} />
          {/* 2 Hüfte fest */}
          <Ring p={hipA} col={COL.rust} o={dO} pulse={pulse} r={34} />
          {dO > 0.01 && <g opacity={dO}><Lock x={hipA[0] - 120} y={hipA[1] - 20} s={0.9} col={COL.rust} /></g>}
          {dO > 0.01 && (
            <g opacity={win(t, at("d1", "Becken") - 0.1, E(L, "d1")) } stroke={COL.rust} strokeWidth="7" strokeLinecap="round" fill="none">
              <path d={`M${hipA[0] - 70} ${hipA[1] + 90} H${hipA[0] + 70}`} />
              <path d={`M${hipA[0] - 50} ${hipA[1] + 72} L${hipA[0] - 70} ${hipA[1] + 90} L${hipA[0] - 50} ${hipA[1] + 108}`} />
              <path d={`M${hipA[0] + 50} ${hipA[1] + 72} L${hipA[0] + 70} ${hipA[1] + 90} L${hipA[0] + 50} ${hipA[1] + 108}`} />
              <path d={`M${hipA[0] - 30} ${hipA[1] + 60} L${hipA[0] + 30} ${hipA[1] + 120}`} strokeWidth="9" />
            </g>
          )}
          <Pop t={t} a={at("d1", "Becken")} x={kneeA[0] + 160} y={kneeA[1] - 70} text="zieht das Bein hoch" fill={COL.rust} size={30} o={win(t, at("d1", "Becken"), E(L, "d1"))} />
          {/* 3 Ferse drücken */}
          <Arr from={[heelA[0], heelA[1] - 150 + pinch]} to={[heelA[0], heelA[1] - 30]} col={COL.rust} o={eO} w={10} />
          <Ring p={ankA} col={COL.rust} o={win(t, at("e1", "Kraft") - 0.2, E(L, "e1") + 0.2)} pulse={pulse} r={22} />
          <Arr from={[ankA[0] - 120, ankA[1] + 60]} to={[ankA[0] - 10, ankA[1] + 60]} col={COL.rust} o={win(t, at("e1", "Kraft"), E(L, "e1") + 0.2)} />
          <Pop t={t} a={at("e1", "Kraft")} x={ankA[0] - 70} y={ankA[1] + 170} text="Bein rutscht nach vorn" fill={COL.rust} size={30} o={win(t, at("e1", "Kraft"), E(L, "e1") + 0.2)} />
          <Pop t={t} a={at("e1", "unten") - 0.2} x={kneeA[0] + 150} y={kneeA[1] - 60} text="Sprunggelenk steif" fill={COL.rust} size={30} o={win(t, at("e1", "unten") - 0.2, E(L, "e1") + 0.2)} />
        </g>
      )}

      {/* F · Bügel, Sattel, Beweglichkeit */}
      {oF > 0.01 && (
        <g opacity={oF}>
          <IconBadge t={t} a={at("f1", "Bügellänge") - 0.1} x={220} y={880} r={112} col={COL.forest} label="Bügellänge" icon={
            <g fill="none" stroke={PAPER} strokeWidth="8" strokeLinejoin="round" strokeLinecap="round">
              <path d="M0 -60 V-22" stroke={COL.honey} strokeWidth="10" />
              <path d="M-30 40 H30 L18 -20 H-18 Z" />
              <path d="M-36 40 H36" strokeWidth="12" />
            </g>} />
          <IconBadge t={t} a={at("f1", "Sattel") - 0.1} x={540} y={880} r={112} col={COL.forest} label="Sattel" icon={
            <g>
              <path d="M-58 -12 C-38 12 26 14 46 -14 L58 -22 C56 4 44 24 22 32 L-36 32 C-52 22 -62 4 -58 -12 Z" fill={PAPER} />
              <path d="M-8 32 L-4 58" stroke={COL.honey} strokeWidth="8" strokeLinecap="round" />
            </g>} />
          <IconBadge t={t} a={at("f1", "Beweglichkeit") - 0.1} x={860} y={880} r={112} col={COL.forest} label="Beweglichkeit" icon={
            <g fill="none" stroke={PAPER} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="14" cy="-48" r="11" fill={PAPER} stroke="none" />
              <path d="M10 -34 L4 2" />
              <path d="M4 2 L-26 22 L-54 22" />
              <path d="M4 2 L34 6 L36 42" />
              <path d="M-18 -18 a30 30 0 0 1 40 -6" stroke={COL.honey} strokeWidth="6" />
            </g>} />
          <Pop t={t} a={at("f1", "Bügellänge") + 0.3} x={220} y={1150} text="zu kurz?" fill={COL.honey} color={COL.forestDeep} size={30} />
          <Pop t={t} a={at("f1", "Sattel") + 0.3} x={540} y={1150} text="passt er?" fill={COL.honey} color={COL.forestDeep} size={30} />
          <Pop t={t} a={at("f1", "Beweglichkeit") + 0.3} x={860} y={1150} text="Hüfte & Co." fill={COL.honey} color={COL.forestDeep} size={30} />
          <Pop t={t} a={at("f1", "spielen")} x={540} y={1330} text="Das ist bei jedem anders" fill={COL.forest} size={34} />
        </g>
      )}

      {/* G · Vergleich */}
      {oG > 0.01 && (
        <g opacity={oG}>
          <Panel t={t} x={0} good={false} />
          <g opacity={ease((t - S(L, "g1") + 0.1) / 0.4)}><Panel t={t} x={540} good /></g>
          <Pop t={t} a={at("g1", "lockere")} x={540} y={520} text="lockere Hüfte · langer Oberschenkel" fill={COL.forest} size={32} o={win(t, at("g1", "lockere"), E(L, "g1") + 0.1)} />
          <Pop t={t} a={S(L, "g2")} x={540} y={520} text="Unterschenkel fällt nach unten" fill={COL.forest} size={34} o={win(t, S(L, "g2"), E(L, "g2") + 0.1)} />
          <Pop t={t} a={S(L, "g3")} x={540} y={520} text="Ferse etwas tiefer – ohne Druck" fill={COL.forest} size={34} o={win(t, S(L, "g3"), bG)} />
        </g>
      )}

      {/* H · Übungskarten */}
      {oH > 0.01 && (
        <g opacity={oH}>
          <ExCard t={t} a={S(L, "h1") + 0.1} x={210} y={720} n="1" title="Knie lösen" sub="im Stand" />
          <ExCard t={t} a={S(L, "h1") + 0.45} x={540} y={720} n="2" title="Hüfte dehnen" sub="am Boden" />
          <ExCard t={t} a={S(L, "h1") + 0.8} x={870} y={720} n="3" title="Bein lang" sub="im Sattel" locked />
        </g>
      )}

      {/* I · Übung 1: Knie lösen (im Stand, mit Helferin) */}
      {oI > 0.01 && (
        <g opacity={oI}>
          <Arena t={t} speed={0} y={V_EX.y + 285 * V_EX.k} />
          <RideFig t={t} pl={V_EX} gait="stand" id="bn-i" b={bI_} glow={relax > 0.3 && t > S(L, "i3") - 0.2 ? COL.forest : undefined} />
          <svg x={V_EX.x} y={V_EX.y} width={320 * V_EX.k} height={292 * V_EX.k} viewBox="70 20 320 292" overflow="visible">
            <path d={rope} fill="none" stroke="#C99A4E" strokeWidth="2.6" strokeLinecap="round" />
            <Person f={HELPER} face={-1} jacket="#B98A45" legs="#5E7360" legsShade="#4D6150" boots="#3E2C22" hair="#3C2A1E" />
          </svg>
          <Pop t={t} a={at("i1", "jemand") - 0.1} x={sI(HELPER.head)[0] - 60} y={sI(HELPER.head)[1] - 70} text="Helfer hält" fill={COL.honey} color={COL.forestDeep} size={30} />
          <Ring p={sI(bI_.knee)} col={COL.rust} o={tense} pulse={pulse} r={26} />
          <Ring p={sI(bI_.knee)} col={COL.forest} o={relax} pulse={pulse} r={26} />
          <Pop t={t} a={tFest} x={sI(bI_.knee)[0] - 210} y={sI(bI_.knee)[1] - 10} text="kurz anspannen" fill={COL.rust} size={32} o={tense} />
          <Pop t={t} a={tLos} x={sI(bI_.knee)[0] - 200} y={sI(bI_.knee)[1] - 10} text="loslassen" fill={COL.forest} size={34} o={relax} />
          <Arr from={[sI(bI_.ankle)[0] - 60, sI(bI_.ankle)[1] - 80]} to={[sI(bI_.ankle)[0] - 60, sI(bI_.ankle)[1] + 10]} col={COL.forest} o={win(t, S(L, "i3"), bI)} w={7} />
          <Pop t={t} a={at("i3", "weicher") - 0.1} x={sI(bI_.ankle)[0] - 160} y={sI(bI_.ankle)[1] + 120} text="Bein wird weicher" fill={COL.forest} size={32} />
        </g>
      )}

      {/* J · Übung 2: Hüftbeuger dehnen (halber Kniestand) */}
      {oJ > 0.01 && (
        <g opacity={oJ}>
          <Ground y={KY - 30} h={H - KY + 30} id="bn-g" />
          <rect x={KX - 125 * KS} y={KY - 2} width={200 * KS} height={4 * KS} rx={2 * KS} fill="#5E7360" />
          <g transform={`translate(${KX} ${KY}) scale(${KS})`}>
            <Person f={fig} face={1} jacket="#344638" legs="#EFE6D2" legsShade="#D9CBB0" boots="#3E2C22" />
          </g>
          {strO > 0.01 && <path d={stretchD} fill="none" stroke="#6FA56F" strokeWidth={40 + 8 * pulse} strokeLinecap="round" opacity={strO * 0.45} />}
          {tiltO > 0.01 && (
            <g opacity={tiltO} fill="none" stroke={COL.honey} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M${hipJ[0] + 70} ${hipJ[1] - 40} A90 90 0 0 0 ${hipJ[0] - 70} ${hipJ[1] - 40}`} />
              <path d={`M${hipJ[0] - 92} ${hipJ[1] - 62} L${hipJ[0] - 70} ${hipJ[1] - 40} L${hipJ[0] - 46} ${hipJ[1] - 60}`} />
            </g>
          )}
          <Pop t={t} a={at("j2", "aufrichten") - 0.2} x={540} y={560} text="Becken leicht aufrichten" fill={COL.honey} color={COL.forestDeep} size={32} o={tiltO} />
          <Arr from={[hipJ[0] + 120, hipJ[1] + 10]} to={[hipJ[0] + 240, hipJ[1] + 10]} col={COL.forest} o={fwdO} w={9} />
          <Pop t={t} a={S(L, "j3")} x={hipJ[0] + 330} y={hipJ[1] - 50} text="langsam nach vorn" fill={COL.forest} size={30} o={fwdO} />
          <Pop t={t} a={at("j4", "Dehnung") - 0.1} x={540} y={1470} text="Dehnung vorne an der Hüfte" fill={COL.forest} size={34} o={win(t, S(L, "j4"), bJ)} />
          <Pop t={t} a={at("j5", "Schmerz") - 0.2} x={540} y={560} text="niemals Schmerz!" fill={COL.rust} size={38} />
        </g>
      )}

      {/* K · Merksatz */}
      {oK > 0.01 && (
        <g opacity={oK}>
          <Arena t={t} speed={groundSpeed("schritt", V_FULL.k)} y={V_FULL.y + 285 * V_FULL.k} />
          <RideFig t={t} pl={V_FULL} gait="schritt" id="bn-k" b={bK_} glow={COL.forest} />
          <rect width={W} height={640} fill={COL.bg} />
          <Merk t={t} at={S(L, "k1") - 0.1} lines={["Ein langes Bein entsteht", "durch Losgelassenheit –"]} sub="nicht durch Druck." />
        </g>
      )}

      {/* L · Akademie */}
      {oL > 0.01 && (
        <g opacity={oL}>
          {lockO > 0.01 && (
            <g opacity={lockO} transform={`translate(540 980) scale(${0.6 + 0.4 * lockK}) translate(-540 -980)`}>
              <rect x={240} y={700} width={600} height={560} rx="48" fill={COL.sandLight} stroke={COL.honey} strokeWidth="6" strokeDasharray="16 12" />
              <g filter="url(#bn-blur)" opacity=".55">
                <T x={540} y={810} size={52} color={COL.brownDeep}>Übung 3</T>
                <T x={540} y={1120} size={46} color={COL.brownDeep}>Bein lang werden lassen</T>
                <T x={540} y={1180} size={34} font={FONT_BODY} weight={700} color={COL.brown}>im Sattel</T>
              </g>
              <Lock x={540} y={960} s={2} />
            </g>
          )}
          {lockO > 0.01 && <Title t={t} a={bK} b={S(L, "l2") - 0.1} top="Die wichtigste Übung?" sub="nur in der Hofgeschichten Reitakademie" y={330} />}
          {phoneO > 0.01 && (
            <g opacity={phoneO}>
              <Phone x={280} y={470} w={520} id="bn-p">
                <g transform="translate(296 486)"><HomeScreen scroll={scroll} /></g>
              </Phone>
              <Pop t={t} a={S(L, "l2") + 0.3} x={540} y={380} text="81 Lektionen · 9 Module" fill={COL.forest} size={40} />
            </g>
          )}
          {comO > 0.01 && <CommentCard t={t} a={S(L, "l3") - 0.1} lines={["Schreib „AKADEMIE“", "in die Kommentare"]} sub="… und wir schicken dir den Link" y={560} />}
          <Brand t={t} a={S(L, "l2") + 0.2} sub="Reitakademie · einmalig 19,90 € · kein Abo" y={1570} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={84} gap={98} y0={250} lines={[
        { text: "Deine Knie rutschen", at: -0.9, size: 78 },
        { text: "immer HOCH?", at: at("a1", "hoch") - 0.25, hi: true, size: 100 },
        { text: "Und das Bein will nicht runter? 🤔", at: S(L, "a2") - 0.1, italic: true, size: 50 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={E(L, "b1")} top="Meist liegt's nicht am Bein" sub="sondern an Knie, Hüfte oder Ferse" y={290} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c1")} top="1 · Du klemmst" sub="mit Knie und Oberschenkel" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "d1")} b={E(L, "d1")} top="2 · Feste Hüfte" sub="das Becken schwingt nicht mit" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "e1")} b={E(L, "e1") + 0.2} top="3 · Fersen runterdrücken" sub="mit aller Kraft" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "f1")} b={E(L, "f1") + 0.1} top="Das spielt auch mit" sub="Bügellänge · Sattel · Beweglichkeit" y={330} />
      <Title t={t} a={S(L, "g1")} b={bG - 0.1} top="So sieht es richtig aus" sub="Ohr – Schulter – Hüfte – Ferse" color={COL.forest} y={290} />
      <Title t={t} a={S(L, "h1")} b={bH - 0.1} top="2 Übungen" sub="zum Ausprobieren" color={COL.forest} y={420} />
      <Title t={t} a={S(L, "i0")} b={bI - 0.1} top="Übung 1 · Knie lösen" sub="nur im Stand · jemand hält dein Pferd" color={COL.forest} y={290} />
      <Title t={t} a={S(L, "j0")} b={bJ - 0.1} top="Übung 2 · Hüfte dehnen" sub="am Boden · halber Kniestand" color={COL.forest} y={290} />
      <Caption t={t} lines={L} skip={["a1", "a2", "h1", "i0", "j0", "j1", "k1", "k2", "l2", "l3"]} y={1610} />
    </svg>
  );
}
