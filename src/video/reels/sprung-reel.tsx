import { AnimHorse, GAIT_DEFS, legPhase, type LegId, type LegJoints } from "@/components/illustrations/akademie/AnimHorse";
import { Obstacle } from "@/components/illustrations/akademie/AusbauArt";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { BODIES, SITZ, type Body, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import type { HorseLook } from "@/content/types";
import type { ReactNode } from "react";
import { ScrollingArena } from "../kit";
import { Arrow, COL, Caption, Chip, E, FONT_BODY, GROUND, Header, K, PAPER, S, SkyDefs, T, W, H, X0, ARENA_TOP, back, clamp01, ease, lerp, seq, sm, toScreen, win, type VLine } from "./rkit";

/* Reel 20 (9:16): „Dein erster Sprung fängt am Boden an“ – Spickzettel zum Speichern (Format wie Reel 18).
   Seitenansicht, Pferd läuft auf der Stelle, Hindernisse kommen von rechts. Leichter Sitz → Linie & Blick →
   4 Stufen als Treppe: Stange im Schritt, Stangen im Trab, Cavaletti, kleines Kreuz.
   Bleibt in der Akademie: woran man merkt, dass ein Kind bereit für den ersten Sprung ist. */

/** Zeiten GESCHÄTZT (noch keine Aufnahme) – nach der Aufnahme durch echte Zeiten ersetzen wie in koerper-reel.tsx */
export const SPRUNG_LINES: VLine[] = seq([
  ["hook", "Dein erster Sprung? Der fängt am Boden an. Speichern!", 3.6],
  ["sitz", "Zuerst kommt der leichte Sitz: Gesäß aus dem Sattel, Absätze tief, Hände vor.", 5.6],
  ["linie", "Reite gerade auf die Mitte der Stange zu – und schau drüber, nicht drauf.", 5.0],
  ["schritt", "Stufe eins: eine Stange im Schritt.", 3.0],
  ["trab", "Stufe zwei: mehrere Stangen im Trab – im gleichen Takt.", 4.0],
  ["cav", "Stufe drei: Cavaletti, ein kleines bisschen höher.", 3.6],
  ["kreuz", "Stufe vier: ein kleines Kreuz. Halt dich an der Mähne fest – der Zügel bleibt locker.", 5.6],
  ["merke", "Merke: Mitte, Blick nach vorn, Takt halten. Und nur mit Reitlehrer!", 4.6],
  ["tease", "Wann dein Kind bereit ist für den ersten Sprung? Das lernt es in der Reitakademie.", 4.8],
], 0.4, 0.4);
const L = SPRUNG_LINES;
export const SPRUNG_TOTAL = E(L, "tease") + 2.6;

/** Wortmarken – nach der Aufnahme echte Zeiten eintragen (ohne VO-Versatz), sonst anteilig nach Zeichen */
const MARKS: Record<string, number> = {};
function at(id: string, word: string) {
  if (MARKS[`${id}|${word}`] !== undefined) return MARKS[`${id}|${word}`];
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

/* ---------- Bewegung: Pferd bleibt stehen, der Boden läuft ---------- */
const speedOf = (g: "schritt" | "trab") => (GAIT_DEFS[g].stride / (GAIT_DEFS[g].duty * GAIT_DEFS[g].cycle)) * K;
const VS = speedOf("schritt");
const VT = speedOf("trab");
const T_TRAB = () => S(L, "trab");
/** Sprung über das Kreuz: Mitte der Flugphase */
const TJ = () => at("kreuz", "ein kleines") + 0.9;
const JD = 1.1; // Dauer vom Absprung bis zur Landung (s)
const FRONT_X = toScreen([254, 0])[0]; // Vorderhufe
const MID_X = toScreen([195, 0])[0]; // Pferdemitte
const JUMP_RUN = 440; // so weit läuft der Boden während des Sprungs (px)
const VJ = JUMP_RUN / JD;

function speedAt(t: number) {
  const tj = TJ();
  if (t >= tj - JD / 2 && t < tj + JD / 2) return VJ;
  return t < T_TRAB() ? VS : VT;
}
/** Zurückgelegter Weg in Bildschirm-Pixeln (numerisch integriert) */
function dist(t: number) {
  const dt = 1 / 120;
  let d = 0;
  for (let x = 0; x < t; x += dt) d += speedAt(x) * Math.min(dt, t - x);
  return d;
}
/** Bildschirm-x eines Hindernisses, das zur Zeit `tc` bei `xc` liegt */
const objX = (t: number, tc: number, xc: number) => xc + (dist(tc) - dist(t));

/* ---------- Sprungposen (aus den Sprungphasen der Akademie) ---------- */
const SPRING: Body = { hip: [226, 95], shoulder: [247, 60], head: [255, 42], elbow: [252, 86], hand: [272, 98], knee: [246, 145], ankle: [229, 186], heel: [224, 192], toe: [243, 193] };
const FLUG: Body = { ...SPRING, hip: [232, 90], shoulder: [263, 66], head: [277, 52], elbow: [272, 93], hand: [298, 106], knee: [248, 144] };
const LANDUNG: Body = { ...SPRING, hip: [224, 96], shoulder: [243, 60], head: [249, 42], elbow: [252, 88], hand: [282, 102] };
type Legs = Record<LegId, LegJoints>;
const ABSPRUNG_L: Legs = { VL: { knee: [304, 176], foot: [288, 220] }, VR: { knee: [314, 172], foot: [300, 214] }, HL: { knee: [108, 230], foot: [150, 288] }, HR: { knee: [122, 228], foot: [162, 286] } };
const FLUG_L: Legs = { VL: { knee: [300, 198], foot: [276, 224] }, VR: { knee: [311, 194], foot: [288, 220] }, HL: { knee: [94, 214], foot: [98, 256] }, HR: { knee: [106, 212], foot: [110, 254] } };
const LANDUNG_L: Legs = { VL: { knee: [262, 238], foot: [268, 290] }, VR: { knee: [279, 232], foot: [294, 274] }, HL: { knee: [118, 226], foot: [142, 252] }, HR: { knee: [130, 224], foot: [156, 250] } };
const LEGS: LegId[] = ["VL", "VR", "HL", "HR"];
const lp = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
const lerpLegs = (a: Legs, b: Legs, u: number): Legs => Object.fromEntries(LEGS.map((l) => [l, { knee: lp(a[l].knee, b[l].knee, u), foot: lp(a[l].foot, b[l].foot, u) }])) as Legs;
const lerpBody = (a: Body, b: Body, u: number): Body => Object.fromEntries((Object.keys(a) as Array<keyof Body>).map((k) => [k, lp(a[k], b[k], u)])) as Body;

const PIV: P = [200, 200];
function rotY([x, y]: P, deg: number) {
  const r = (deg * Math.PI) / 180;
  return PIV[1] + (x - PIV[0]) * Math.sin(r) + (y - PIV[1]) * Math.cos(r);
}

/** Zustand des Sprungs: null = normaler Trab */
function jump(t: number) {
  const u = (t - (TJ() - JD / 2)) / JD;
  if (u < 0 || u > 1) return null;
  const legs = u < 0.2 ? ABSPRUNG_L : u < 0.5 ? lerpLegs(ABSPRUNG_L, FLUG_L, sm((u - 0.2) / 0.3)) : u < 0.75 ? lerpLegs(FLUG_L, LANDUNG_L, sm((u - 0.5) / 0.25)) : LANDUNG_L;
  const rot = u < 0.2 ? lerp(0, -14, sm(u / 0.2)) : u < 0.5 ? lerp(-14, -4, sm((u - 0.2) / 0.3)) : u < 0.8 ? lerp(-4, 12, sm((u - 0.5) / 0.3)) : lerp(12, 0, sm((u - 0.8) / 0.2));
  // tiefster Huf bleibt auf dem Boden, dazu der Flugbogen
  const low = Math.max(...LEGS.map((l) => rotY(legs[l].foot, rot)));
  const air = Math.max(0, low - 288) + 28 * Math.sin(Math.PI * u);
  const body = u < 0.25 ? lerpBody(SPRING, FLUG, sm(u / 0.25)) : u < 0.7 ? FLUG : lerpBody(FLUG, LANDUNG, sm((u - 0.7) / 0.3));
  return { u, legs, rot, air, body };
}

/* ---------- Hindernisse ---------- */
const OB_K = 1.9; // Szenen-Einheiten der Akademie-Hindernisse → Bildschirm
const GY = 1288; // Bodenlinie unter den Hufen (Bildschirm)

function GroundPole({ x }: { x: number }) {
  const dx = 46 * OB_K;
  const dy = -30 * OB_K;
  const th = 9 * OB_K;
  const y = GY - th;
  return (
    <g>
      {Array.from({ length: 4 }, (_, i) => {
        const a = i / 4;
        const b = (i + 1) / 4;
        return <path key={i} d={`M${x + dx * a} ${y + dy * a} L${x + dx * b} ${y + dy * b} L${x + dx * b} ${y + dy * b + th} L${x + dx * a} ${y + dy * a + th} Z`} fill={i % 2 ? PAPER : COL.rust} stroke={COL.brownDeep} strokeWidth="3" />;
      })}
    </g>
  );
}
function Ob({ kind, x, scale = 1 }: { kind: "cavaletti" | "kreuz"; x: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${GY}) scale(${OB_K})`}>
      <Obstacle kind={kind} x={0} ground={0} scale={scale} />
    </g>
  );
}

/** Wann welche Stange unter den Vorderhufen liegt */
const POLE_STEP = () => at("schritt", "eine Stange") + 0.5;
const POLE_TRAB = () => [0, 1, 2].map((i) => at("trab", "mehrere") + 0.2 + i * 1.45);
const CAV_T = () => at("cav", "bisschen") + 0.9;

function Obstacles({ t }: { t: number }) {
  const out: ReactNode[] = [];
  const vis = (x: number) => x > -200 && x < W + 100;
  const xs = objX(t, POLE_STEP(), FRONT_X - 30);
  if (vis(xs)) out.push(<GroundPole key="s" x={xs} />);
  POLE_TRAB().forEach((tc, i) => {
    const x = objX(t, tc, FRONT_X - 30);
    if (vis(x)) out.push(<GroundPole key={`t${i}`} x={x} />);
  });
  const xc = objX(t, CAV_T(), FRONT_X - 30);
  if (vis(xc)) out.push(<Ob key="c" kind="cavaletti" x={xc} />);
  const xk = objX(t, TJ(), MID_X - 20);
  if (vis(xk)) out.push(<Ob key="k" kind="kreuz" x={xk} scale={1.5} />);
  return <g>{out}</g>;
}

/* ---------- Bühne: Reitplatz + Pferd + Reiterin ---------- */
function Stage({ t, look, children }: { t: number; look: HorseLook; children: () => ReactNode }) {
  const d = dist(t);
  const gait = t < T_TRAB() ? "schritt" : "trab";
  const j = jump(t);
  return (
    <g>
      <svg x={0} y={ARENA_TOP} width={W} height={H - ARENA_TOP} viewBox={`0 0 ${W / 2} ${(H - ARENA_TOP) / 2}`}>
        <ScrollingArena t={d / 2} speed={1} y={(GROUND - 60 - ARENA_TOP) / 2} />
        <rect y={(GROUND - 80 - ARENA_TOP) / 2} width={W} height={H} fill="#E3D3B4" />
      </svg>
      <rect y={ARENA_TOP - 2} width={W} height={240} fill="url(#rksky)" />
      <Obstacles t={t} />
      {j && <ellipse cx={MID_X} cy={GY + 4} rx={230} ry={12} fill={COL.brown} opacity={0.18} />}
      <svg x={X0} y={GROUND - 285 * K - (j ? j.air * K : 0)} width={320 * K} height={292 * K} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={look} gait={j ? "stand" : gait} time={t} legs={j ? j.legs : undefined} rotate={j ? j.rot : 0} pivot={PIV} noShadow={!!j}>
          {children()}
        </AnimHorse>
      </svg>
    </g>
  );
}

/* ---------- Treppe: 4 Stufen ---------- */
const STEPS: Array<[string, string]> = [["schritt", "Schritt"], ["trab", "Trab"], ["cav", "Cavaletti"], ["kreuz", "Kreuz"]];
function Treppe({ t }: { t: number }) {
  const o = win(t, S(L, "schritt") - 0.1, E(L, "kreuz"));
  if (o <= 0) return null;
  const cur = STEPS.reduce((c, [id], i) => (t >= S(L, id) - 0.1 ? i : c), -1);
  return (
    <g opacity={o}>
      {STEPS.map(([id, label], i) => {
        const k = back((t - S(L, id) + 0.1) / 0.45);
        const done = i < cur;
        const on = i === cur;
        const x = 330 + i * 140;
        const h = 34 + i * 22;
        const fill = on ? COL.honey : done ? COL.forest : PAPER;
        const sc = on ? 0.94 + 0.08 * Math.min(1, k) : 1;
        return (
          <g key={id} transform={`translate(${x} 462) scale(${sc}) translate(${-x} -462)`}>
            <rect x={x - 62} y={462 - h} width={124} height={h} rx="14" fill={fill} stroke={on || done ? fill : COL.sand} strokeWidth="4" />
            <T x={x} y={462 - h + 29} size={28} font={FONT_BODY} weight={700} color={on ? COL.forestDeep : done ? PAPER : COL.brown}>{done ? "✓" : String(i + 1)}</T>
            <T x={x} y={496} size={24} font={FONT_BODY} weight={700} color={on ? COL.forestDeep : COL.inkSoft}>{label}</T>
          </g>
        );
      })}
    </g>
  );
}

/* ---------- Texte oben ---------- */
function Title({ t, id, top, sub, color = COL.forestDeep, end }: { t: number; id: string; top: string; sub?: string; color?: string; end?: number }) {
  const o = win(t, S(L, id), end ?? E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - S(L, id)) / 0.4);
  const k2 = ease((t - S(L, id) - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={290} size={Math.min(84, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={366} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

function Pop({ t, a, x, y, text, fill, size = 32 }: { t: number; a: number; x: number; y: number; text: string; fill: string; size?: number }) {
  const k = back((t - a) / 0.4);
  if (k <= 0.01) return null;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)}) translate(${-x} ${-y})`}>
      <Chip x={x} y={y} text={text} fill={fill} size={size} />
    </g>
  );
}

/** Hook: dunkle Titelkarte wie Reel 18 */
function Hook({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook") + 0.1, 0.35);
  if (o <= 0) return null;
  const k = (d: number) => ease((t + 0.4 - d) / 0.45);
  return (
    <g opacity={o}>
      <rect width={W} height={H} fill={COL.forestDeep} />
      <rect x={250} y={420} width={580} height={1080} rx="20" fill={COL.forest} opacity=".55" />
      <rect x={290} y={460} width={500} height={1000} rx="12" fill="none" stroke={COL.sand} strokeWidth="4" strokeDasharray="14 14" opacity=".35" />
      <g opacity={k(0)} transform={`translate(0 ${(1 - k(0)) * 40})`}>
        <T x={540} y={760} size={104} color={PAPER}>Dein erster</T>
        <T x={540} y={880} size={104} color={PAPER}>Sprung</T>
      </g>
      <g opacity={k(0.2)} transform={`translate(0 ${(1 - k(0.2)) * 40})`}>
        <T x={540} y={1010} size={84} color={COL.honey} italic>fängt am Boden an</T>
      </g>
      {/* kleine Stange als Zeichen */}
      <g opacity={k(0.35)} transform="translate(392 1060) scale(1.6)">
        {Array.from({ length: 4 }, (_, i) => <rect key={i} x={i * 46} y={0} width={46} height={14} fill={i % 2 ? PAPER : COL.rust} />)}
      </g>
      <g opacity={ease((t - 0.8) / 0.4)}>
        <path d="M132 1148 h28 v44 l-14 -10 l-14 10 Z" fill={COL.rust} />
        <T x={560} y={1182} size={38} font={FONT_BODY} weight={700} color={COL.sand}>Speichern für die nächste Reitstunde</T>
      </g>
    </g>
  );
}

/** Linie von oben: gerade auf die Mitte der Stange */
function Linie({ t }: { t: number }) {
  const a = S(L, "linie");
  const b = at("linie", "und schau");
  const o = win(t, a, b - 0.1);
  if (o <= 0) return null;
  const k = ease((t - a) / 0.45);
  const u = clamp01((t - a - 0.5) / 2.2);
  const dot: P = [540, 950 - 300 * ease(u)];
  return (
    <g opacity={o} transform={`translate(0 ${(1 - k) * 40})`}>
      <rect x={140} y={430} width={800} height={600} rx="36" fill={PAPER} stroke={COL.sand} strokeWidth="4" />
      <rect x={180} y={470} width={720} height={520} rx="18" fill="#E3D3B4" />
      <T x={540} y={520} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>von oben</T>
      {/* falsche Linie: schräg zum Rand */}
      <path d="M300 960 L700 650" stroke={COL.rust} strokeWidth="8" strokeDasharray="18 14" opacity=".75" />
      <Pop t={t} a={a + 1.6} x={760} y={900} text="✗ schräg" fill={COL.rust} size={30} />
      {/* richtige Linie: gerade auf die Mitte */}
      <path d="M540 980 L540 640" stroke={COL.honey} strokeWidth="10" strokeDasharray="20 14" />
      {/* Stange */}
      <g>
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={360 + i * 60} y={620} width={60} height={22} fill={i % 2 ? PAPER : COL.rust} stroke={COL.brownDeep} strokeWidth="3" />)}
      </g>
      <circle cx={540} cy={631} r={40 + 6 * Math.sin(t * 6)} fill="none" stroke={COL.forest} strokeWidth="6" />
      <Pop t={t} a={at("linie", "Mitte")} x={540} y={580} text="Mitte" fill={COL.forest} size={30} />
      <circle cx={dot[0]} cy={dot[1]} r="20" fill={COL.forest} stroke={PAPER} strokeWidth="5" />
      <Pop t={t} a={a + 1.2} x={330} y={760} text="✓ gerade" fill={COL.forest} size={30} />
    </g>
  );
}

/* ---------- Spickzettel (Merke) ---------- */
const CARD: Array<[string, string, string[]]> = [
  ["1 · Leichter Sitz", COL.honey, ["Gesäß aus dem Sattel", "Absätze tief", "Hände vor"]],
  ["2 · Linie & Blick", COL.sage, ["gerade auf die Mitte", "Blick über die Stange", "gleicher Takt"]],
  ["3 · Vier Stufen", "#E0A285", ["Stange im Schritt › Stangen im Trab", "Cavaletti", "kleines Kreuz"]],
];
function Spick({ t }: { t: number }) {
  const a = S(L, "merke") - 0.2;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 50})`}>
      <rect width={W} height={H} fill={COL.bg} opacity={0.94} />
      <rect x={70} y={150} width={940} height={1230} rx="44" fill={COL.forestDeep} />
      <T x={540} y={240} size={38} font={FONT_BODY} weight={700} color={COL.honey}>SPICKZETTEL · ERSTER SPRUNG</T>
      {CARD.map(([head, col, items], i) => {
        const y = 300 + i * 300;
        const ki = ease((t - a - 0.25 - i * 0.2) / 0.4);
        return (
          <g key={head} opacity={ki} transform={`translate(${(1 - ki) * -40} 0)`}>
            <rect x={120} y={y} width={840} height={270} rx="30" fill={COL.forest} />
            <rect x={120} y={y} width={18} height={270} rx="9" fill={col} />
            <T x={170} y={y + 72} size={56} color={PAPER} anchor="start">{head}</T>
            {items.map((it, j) => (
              <T key={it} x={190} y={y + 132 + j * 46} size={34} font={FONT_BODY} weight={700} color={COL.sand} anchor="start">{`• ${it}`}</T>
            ))}
          </g>
        );
      })}
      <g opacity={ease((t - at("merke", "Mitte")) / 0.4)}>
        <rect x={120} y={1210} width={840} height={140} rx="70" fill={COL.honey} />
        <T x={540} y={1272} size={46} color={COL.forestDeep}>Mitte · Blick · Takt</T>
        <T x={540} y={1322} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep} o={ease((t - at("merke", "Und nur")) / 0.4)}>nur mit Reitlehrer · immer mit Helm</T>
      </g>
    </g>
  );
}

function Tease({ t }: { t: number }) {
  const a = S(L, "tease") - 0.1;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, t - a - 2) * 5);
  return (
    <g opacity={k} transform={`translate(540 ${1540 + (1 - k) * 40}) scale(${pulse}) translate(-540 -1540)`}>
      <rect x={90} y={1420} width={900} height={250} rx="36" fill={COL.honey} />
      <T x={540} y={1497} size={44} color={COL.forestDeep}>Wann ist mein Kind bereit zum Springen?</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>Lernt es in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Springen · Link in der Bio</T>
    </g>
  );
}

export function renderSprung(t: number) {
  const look = getHorse("tonga")!.look;
  const j = jump(t);
  // leichter Sitz ab „leichte Sitz“, vorher Grundsitz
  const lu = sm((t - at("sitz", "leichte Sitz")) / 0.5);
  const kreuzO = win(t, S(L, "kreuz"), E(L, "kreuz"));
  const base: Body = lerpBody(SITZ, BODIES.leicht, lu);
  const b: Body = j ? j.body : kreuzO > 0 ? lerpBody(BODIES.leicht, SPRING, sm((t - S(L, "kreuz")) / 0.5)) : base;
  const mane = win(t, at("kreuz", "Halt dich"), E(L, "kreuz"));
  const loose = win(t, at("kreuz", "der Zügel"), E(L, "kreuz"));

  const sitzO = win(t, S(L, "sitz"), E(L, "sitz"));
  const eyeO = win(t, at("linie", "und schau"), E(L, "linie"));
  const trabO = win(t, S(L, "trab"), E(L, "trab"));
  const cavO = win(t, S(L, "cav"), E(L, "cav"));
  const hookO = win(t, 0, E(L, "hook"));
  const hideHead = Math.max(hookO, win(t, S(L, "merke") - 0.2, SPRUNG_TOTAL + 1));

  // Taktzahl im Trab: diagonales Beinpaar A (HL+VR) oder B
  const pairA = legPhase("trab", "HL", t).stance;
  // Abstand zwischen den ersten beiden Trabstangen
  const [p1, p2] = POLE_TRAB().slice(0, 2).map((tc) => objX(t, tc, FRONT_X - 30));
  const cavX = objX(t, CAV_T(), FRONT_X - 30);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <SkyDefs />
      <rect width={W} height={H} fill={COL.bg} />
      <Stage t={t} look={look}>
        {() => (
          <g>
            <Tack hand={b.hand} longRein={loose > 0.3} stirrupsDown={false} />
            <Rider b={b} pose={lu > 0.5 || j || kreuzO > 0 ? "leicht" : "sitz"} />
            {/* leichter Sitz: drei Pfeile */}
            {sitzO > 0 && (
              <g opacity={sitzO}>
                <g opacity={ease((t - at("sitz", "Gesäß")) / 0.3)}><Arrow from={[b.hip[0] - 14, b.hip[1] + 12]} to={[b.hip[0] - 14, b.hip[1] - 10]} color={COL.honey} w={3.6} head={8} /></g>
                <g opacity={ease((t - at("sitz", "Absätze")) / 0.3)}><Arrow from={[b.heel[0] - 4, b.heel[1] + 2]} to={[b.heel[0] - 4, b.heel[1] + 22]} color={COL.honey} w={3.6} head={8} /></g>
                <g opacity={ease((t - at("sitz", "Hände")) / 0.3)}><Arrow from={[b.hand[0] + 4, b.hand[1]]} to={[b.hand[0] + 26, b.hand[1] + 4]} color={COL.honey} w={3.6} head={8} /></g>
              </g>
            )}
            {/* Blick: über die Stange (richtig) – auf die Stange (falsch) */}
            {eyeO > 0 && (
              <g opacity={eyeO}>
                <path d={`M${b.head[0] + 6} ${b.head[1] + 2} L${b.head[0] + 170} ${b.head[1] + 10}`} stroke={COL.honey} strokeWidth="3.4" strokeDasharray="7 6" strokeLinecap="round" />
                <g opacity={ease((t - at("linie", "nicht drauf")) / 0.3)}>
                  <path d={`M${b.head[0] + 6} ${b.head[1] + 6} L${b.head[0] + 90} 286`} stroke={COL.rust} strokeWidth="3.4" strokeDasharray="7 6" strokeLinecap="round" />
                </g>
              </g>
            )}
            {/* Mähne festhalten */}
            {mane > 0 && <circle cx={b.hand[0] + 2} cy={b.hand[1]} r={12 + 2 * Math.sin(t * 8)} fill="none" stroke={COL.honey} strokeWidth="3.4" opacity={mane} />}
          </g>
        )}
      </Stage>

      {/* Beschriftungen leichter Sitz */}
      {sitzO > 0 && (
        <g opacity={sitzO}>
          <Pop t={t} a={at("sitz", "Gesäß")} x={250} y={720} text="Gesäß raus" fill={COL.forestDeep} />
          <Pop t={t} a={at("sitz", "Absätze")} x={250} y={1120} text="Absätze tief" fill={COL.forestDeep} />
          <Pop t={t} a={at("sitz", "Hände")} x={880} y={620} text="Hände vor" fill={COL.forestDeep} />
        </g>
      )}
      {eyeO > 0 && (
        <g opacity={eyeO}>
          <Pop t={t} a={at("linie", "und schau")} x={540} y={1400} text="✓ Blick über die Stange" fill={COL.forest} size={34} />
          <Pop t={t} a={at("linie", "nicht drauf")} x={540} y={1490} text="✗ auf die Stange starren" fill={COL.rust} size={34} />
        </g>
      )}
      {/* Trab: Takt + Abstand */}
      {trabO > 0 && (
        <g opacity={trabO}>
          <g opacity={ease((t - at("trab", "gleichen Takt")) / 0.3)}>
            <T x={430} y={1500} size={84} color={pairA ? COL.honey : COL.sand}>1</T>
            <T x={540} y={1492} size={60} color={COL.sand}>·</T>
            <T x={650} y={1500} size={84} color={pairA ? COL.sand : COL.forest}>2</T>
          </g>
          {p1 > 40 && p2 < W - 40 && (
            <g opacity={ease((t - at("trab", "mehrere") - 0.6) / 0.3)}>
              <path d={`M${p1 + 20} 1302 V1322 H${p2 + 20} V1302`} fill="none" stroke={COL.forestDeep} strokeWidth="4" />
              <Chip x={(p1 + p2) / 2 + 20} y={1366} text="ca. 1,2–1,3 m · Pony kürzer" fill={COL.forestDeep} size={26} />
            </g>
          )}
        </g>
      )}
      {cavO > 0 && cavX > 60 && cavX < W - 120 && (
        <g opacity={cavO * ease((t - at("cav", "bisschen")) / 0.3)}>
          <path d={`M${cavX - 40} ${GY} V${GY - 50}`} stroke={COL.forestDeep} strokeWidth="4" />
          <path d={`M${cavX - 52} ${GY} H${cavX - 28} M${cavX - 52} ${GY - 50} H${cavX - 28}`} stroke={COL.forestDeep} strokeWidth="4" />
          <Chip x={Math.min(W - 180, cavX + 120)} y={1390} text="ca. 20–30 cm hoch" fill={COL.forestDeep} size={28} />
        </g>
      )}
      {kreuzO > 0 && (
        <g opacity={kreuzO}>
          <Pop t={t} a={at("kreuz", "Halt dich")} x={540} y={1400} text="✓ an der Mähne festhalten" fill={COL.forest} size={34} />
          <Pop t={t} a={at("kreuz", "der Zügel")} x={540} y={1490} text="✓ Zügel bleibt locker" fill={COL.forest} size={34} />
        </g>
      )}

      <Header t={t} hide={hideHead} />
      <Title t={t} id="sitz" top="Zuerst: leichter Sitz" sub="das brauchst du für jeden Sprung" />
      <Title t={t} id="linie" top="Gerade auf die Mitte" sub="und den Blick nach vorn" color={COL.forest} />
      <Linie t={t} />
      <Title t={t} id="schritt" top="Stufe 1 · Stange im Schritt" />
      <Title t={t} id="trab" top="Stufe 2 · Stangen im Trab" />
      <Title t={t} id="cav" top="Stufe 3 · Cavaletti" />
      <Title t={t} id="kreuz" top="Stufe 4 · kleines Kreuz" color={COL.forest} />
      <Treppe t={t} />
      <Caption t={t} lines={L} skip={["hook", "merke", "tease"]} y={1560} />
      <Spick t={t} />
      <Tease t={t} />
      <Hook t={t} />
    </svg>
  );
}
