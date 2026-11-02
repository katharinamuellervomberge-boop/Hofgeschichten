import type { ReactNode } from "react";
import { AnimHorse, GAIT_DEFS, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { BODIES, SITZ, type Body, type P } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { COL, FONT_BODY, FONT_DISPLAY, ScrollingArena, wrap, clamp01, smooth } from "@/video/kit";
import { riseAmount } from "@/video/leichttraben";
import { LOOKS, TopHorse, type Glow, type Pt } from "@/video/reels/top";
import TIMING from "./timing.json";

/* 16:9-Lernvideos der Reitakademie (1280 × 720), gebaut aus den Reel-Grafiken. Zeiten aus timing.json (gemessene Aufnahme). */

export const LW = 1280;
export const LH = 720;
const PAPER = COL.paper;
const ST = { x: 24, y: 84, w: 766, h: 490 }; // Bühne links
const PN = { x: 810, y: 84, w: 446, h: 490 }; // Tafel rechts

type TLine = { id: string; start: number; end: number; chunks: Array<{ text: string; start: number; end: number }> };
type Timing = { audio: string; total: number; lines: TLine[] };
const ALL = TIMING as unknown as Record<string, Timing>;

export type Mark = "huefte" | "knie" | "absatz" | "hand" | "wade" | "schulter" | "buegel" | "bauch" | "becken" | "gesaess";
export type SideBeat = {
  v: "side"; gait: Gait; to?: [Gait, string]; ride?: "sitz" | "rise" | "ls" | "ls-in" | "falsch" | "aussitzen-dann-rise";
  marks?: Mark[]; legs?: Partial<Record<LegId, string>>; updown?: boolean; hand?: boolean; wade?: "sit" | "on"; chip?: string; chipCol?: string; hind?: boolean;
};
export type TopBeat = {
  v: "top"; mode: "circle" | "straight" | "drift"; glow?: Glow; bend?: number; poll?: number; outBack?: number; pull?: number;
  rails?: boolean; sides?: boolean; chip?: string; chipCol?: string; shoulder?: boolean; speed?: number;
};
export type TreppeBeat = { v: "treppe"; mode: "down" | "profi" | "up" };
export type Beat = (SideBeat | TopBeat | TreppeBeat) & { h?: Array<"g" | "s" | "z"> };
export type Section = { from: string; kicker: string; title: string; items?: Array<[string, string, string?]>; hilfen?: Array<"g" | "s" | "z">; treppe?: boolean };
export type LernDef = { slug: string; chip: string; beats: Record<string, Beat>; sections: Section[]; merke: string[] };

export function timingOf(slug: string) {
  return ALL[slug];
}

/* ---------- Zeit-Helfer ---------- */
function mk(slug: string) {
  const tm = ALL[slug];
  const line = (id: string) => tm.lines.find((l) => l.id === id)!;
  const idx = (t: number) => {
    let k = 0;
    tm.lines.forEach((l, i) => { if (t >= l.start - 0.25) k = i; });
    return k;
  };
  /** Zeitpunkt eines Wortes innerhalb eines Satzes (über die Zeichenposition geschätzt) */
  const word = (id: string, w: string, text: string) => {
    const l = line(id);
    const i = Math.max(0, text.indexOf(w));
    return l.start + (i / text.length) * (l.end - l.start);
  };
  return { tm, line, idx, word };
}

const ease = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const lerpP = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
function lerpBody(a: Body, b: Body, u: number): Body {
  const o = {} as Body;
  (Object.keys(a) as Array<keyof Body>).forEach((k) => { o[k] = lerpP(a[k], b[k], u); });
  return o;
}
/** Leichter Sitz: Po aus dem Sattel, Oberkörper vor, Hände am Hals vor */
const LS: Body = { ...BODIES.leicht, hip: [231, 93], shoulder: [246, 57], head: [253, 40], elbow: [249, 84], hand: [262, 97], knee: [251, 143] };
const RISE_UP: Body = { ...BODIES.leicht, elbow: [236, 84], hand: SITZ.hand, ankle: SITZ.ankle, heel: SITZ.heel, toe: SITZ.toe };

/* ---------- Seitenansicht ---------- */
const SK = 1.4;
const SX0 = 105;
const SGROUND = 462;
const SY0 = SGROUND - 285 * SK;

function speedOf(g: Gait) {
  if (g === "stand") return 0;
  const G = GAIT_DEFS[g];
  return (G.stride / (G.duty * G.cycle)) * SK;
}

function Ring({ p, k, col = COL.honey, r = 9 }: { p: P; k: number; col?: string; r?: number }) {
  if (k <= 0.02) return null;
  return (
    <g opacity={k}>
      <circle cx={p[0]} cy={p[1]} r={r + 5} fill={col} opacity=".28" />
      <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={col} strokeWidth="2.6" />
    </g>
  );
}

function markPoint(m: Mark, b: Body): P {
  switch (m) {
    case "huefte": case "gesaess": return b.hip;
    case "knie": return b.knee;
    case "absatz": return b.heel;
    case "hand": return b.hand;
    case "wade": return lerpP(b.knee, b.ankle, 0.5);
    case "schulter": return b.shoulder;
    case "buegel": return [b.toe[0] - 7, b.toe[1] - 2];
    case "bauch": return [b.hip[0] + 9, b.hip[1] - 16];
    case "becken": return [b.hip[0] + 6, b.hip[1] - 2];
  }
}

function Chip({ x, y, text, fill = COL.forest, color = PAPER, size = 22, k = 1 }: { x: number; y: number; text: string; fill?: string; color?: string; size?: number; k?: number }) {
  if (k <= 0.02) return null;
  const w = text.length * size * 0.56 + 36;
  return (
    <g opacity={k} transform={`translate(${x} ${y + (1 - k) * 10})`}>
      <rect x={-w / 2} y={-size * 1.05} width={w} height={size * 1.9} rx={size * 0.95} fill={fill} />
      <text textAnchor="middle" y={size * 0.3} fontFamily={FONT_BODY} fontSize={size} fontWeight="700" fill={color}>{text}</text>
    </g>
  );
}

function SideScene({ t, b: beat, t0, tSwitch }: { t: number; b: SideBeat; t0: number; tSwitch: number }) {
  const look = getHorse("tonga")!.look;
  const gait: Gait = beat.to && t >= tSwitch ? beat.to[0] : beat.gait;
  const cyc = gait === "trab" ? GAIT_DEFS.trab.cycle : 0.8;
  // Reiterkörper
  let body: Body = SITZ;
  let u = 0;
  if (beat.ride === "rise" && gait === "trab") u = riseAmount(t);
  if (beat.ride === "aussitzen-dann-rise" && gait === "trab") u = t > tSwitch ? riseAmount(t) * smooth((t - tSwitch) / 0.5) : 0;
  if (beat.ride === "falsch" && gait === "trab") {
    // erst falscher Fuß, dann einen Takt sitzen bleiben, dann richtig
    const c = cyc;
    const mid = t0 + 1.2;
    const m = mid + ((((0.25 - ((mid + c / 2) / c)) % 1) + 1) % 1) * c; // Nullstelle des falschen Aufstehens
    u = t < m ? riseAmount(t + c / 2) : t < m + c / 2 ? 0 : riseAmount(t);
  }
  if (u > 0) body = lerpBody(SITZ, RISE_UP, u);
  if (beat.ride === "ls-in") body = lerpBody(SITZ, LS, smooth((t - t0 - 0.6) / 0.8));
  if (beat.ride === "ls") body = LS;
  // Hand: annehmen und nachgeben
  let pull = 0;
  if (beat.hand) {
    const p = ((t - t0) % 1.6) / 1.6;
    pull = p < 0.3 ? smooth(p / 0.3) : p < 0.55 ? 1 : 1 - smooth((p - 0.55) / 0.3);
    body = { ...body, hand: [body.hand[0] - 7 * pull, body.hand[1] + 1 * pull], elbow: [body.elbow[0] - 5 * pull, body.elbow[1]] };
  }
  const sitK = 1 - u;
  const pulse = 0.75 + 0.25 * Math.sin(t * 6);
  const marks = beat.marks ?? [];
  const appear = ease((t - t0 + 0.1) / 0.5);
  return (
    <g>
      <ScrollingArena t={t} speed={speedOf(gait)} y={300} />
      <svg x={SX0} y={SY0} width={320 * SK} height={292 * SK} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={look} gait={gait} time={t} highlight={beat.legs}>
          <Tack hand={body.hand} longRein={false} stirrupsDown={false} />
          <Rider b={body} pose={u > 0.5 || beat.ride?.startsWith("ls") ? "leicht" : "sitz"} />
          {marks.map((m, i) => <Ring key={m} p={markPoint(m, body)} k={appear * pulse * ease((t - t0 - i * 0.35) / 0.4)} col={m === "hand" && beat.hand && pull > 0.5 ? COL.rust : COL.honey} />)}
          {beat.wade && <Ring p={markPoint("wade", body)} k={beat.wade === "on" ? pulse : clamp01((sitK - 0.55) / 0.3)} col={COL.forest} r={13} />}
          {marks.includes("becken") && <path d={`M${body.hip[0] + 14},${body.hip[1] - 4} l16,0 m-6,-5 l6,5 l-6,5`} stroke={COL.honey} strokeWidth="2.6" fill="none" strokeLinecap="round" opacity={appear} />}
        </AnimHorse>
      </svg>
      {beat.updown && gait === "trab" && (
        <g>
          <text x={680} y={150} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize={64} fontWeight="800" fill={COL.forest} opacity={0.2 + 0.8 * clamp01((u - 0.4) * 3)}>AUF</text>
          <text x={680} y={230} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize={64} fontWeight="800" fill={COL.brown} opacity={0.2 + 0.8 * clamp01((0.6 - u) * 3)}>AB</text>
        </g>
      )}
      {beat.wade === "sit" && (
        <g>
          <Chip x={600} y={60} text={sitK > 0.6 ? "hinsetzen + drücken" : "aufstehen + locker"} fill={sitK > 0.6 ? COL.forest : COL.sand} color={sitK > 0.6 ? PAPER : COL.forestDeep} />
        </g>
      )}
      {beat.hand && <Chip x={600} y={60} text={pull > 0.5 ? "annehmen …" : "… nachgeben"} fill={pull > 0.5 ? COL.rust : COL.forest} />}
      {beat.hind && (
        <g opacity={appear}>
          <path d="M260 395 C 300 360, 350 360, 380 390" stroke={COL.honey} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2 10" />
          <path d="M370 375 l12 16 l-20 2" stroke={COL.honey} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {beat.chip && !beat.hand && beat.wade !== "sit" && <Chip x={beat.updown ? 380 : 600} y={60} text={beat.chip} fill={beat.chipCol ?? COL.forest} k={ease((t - t0) / 0.4)} />}
    </g>
  );
}

/* ---------- Ansicht von oben ---------- */
const TC: Pt = [383, 255]; // Zirkelmitte auf der Bühne
function TopScene({ t, b: beat, t0 }: { t: number; b: TopBeat; t0: number }) {
  const R0 = 168;
  const sp = beat.speed ?? 0.32;
  let R = R0;
  if (beat.mode === "drift") R = R0 + 45 * smooth((t - t0 - 0.6) / 2.5);
  const th = 1.1 - t * sp; // gegen den Uhrzeiger = linke Hand
  let at: Pt = [TC[0] + R * Math.cos(th), TC[1] + R * Math.sin(th)];
  let ang = (Math.atan2(-Math.cos(th), Math.sin(th)) * 180) / Math.PI;
  if (beat.mode === "straight") { at = [240 + ((t - t0) * 30) % 60, 255]; ang = 0; }
  const k = ease((t - t0 + 0.1) / 0.5);
  const s = 2.45;
  const outerShoulder = (() => {
    const a = (ang * Math.PI) / 180;
    return [at[0] + 14 * s * Math.cos(a) - 15 * s * Math.sin(a), at[1] + 14 * s * Math.sin(a) + 15 * s * Math.cos(a)] as Pt;
  })();
  return (
    <g>
      <rect x={0} y={0} width={ST.w} height={ST.h} fill="#E3D3B4" />
      <rect x={18} y={18} width={ST.w - 36} height={ST.h - 36} rx="10" fill="none" stroke="#FBF8F1" strokeWidth="7" opacity=".8" />
      {beat.mode !== "straight" && <circle cx={TC[0]} cy={TC[1]} r={R0} fill="none" stroke={COL.brown} strokeWidth="3" strokeDasharray="10 12" opacity=".45" />}
      {beat.mode !== "straight" && <circle cx={TC[0]} cy={TC[1]} r="6" fill={COL.brown} opacity=".6" />}
      {beat.rails && (
        <g opacity={k} fill="none" stroke={COL.forest} strokeWidth="6" strokeLinecap="round">
          <circle cx={TC[0]} cy={TC[1]} r={R0 - 52} strokeDasharray="26 14" />
          <circle cx={TC[0]} cy={TC[1]} r={R0 + 52} strokeDasharray="26 14" />
        </g>
      )}
      {beat.sides && (
        <g opacity={k}>
          <Chip x={TC[0]} y={TC[1] + 6} text="innen · Mitte" fill={COL.honey} color={COL.forestDeep} />
          <Chip x={TC[0] + R0 + 100} y={TC[1] + 6} text="außen · Bande" fill={COL.forest} />
        </g>
      )}
      <TopHorse at={at} ang={ang} look={LOOKS.tonga} step={t * 1.3} s={s} bend={beat.bend ?? -8} poll={beat.poll ?? 0} handPull={beat.pull ?? 0} outBack={beat.outBack ?? 0} glow={beat.glow ?? {}} />
      {beat.shoulder && (
        <g opacity={k}>
          <circle cx={outerShoulder[0]} cy={outerShoulder[1]} r="18" fill="none" stroke={COL.rust} strokeWidth="4" />
          <Chip x={383} y={445} text="Schulter rutscht nach außen weg" fill={COL.rust} />
        </g>
      )}
      {beat.mode === "straight" && (beat.pull ?? 0) > 0 && (
        <g opacity={k}>
          <Chip x={383} y={420} text="Kopf dreht – Körper nicht!" fill={COL.rust} />
        </g>
      )}
      {beat.chip && <Chip x={383} y={50} text={beat.chip} fill={beat.chipCol ?? COL.forest} k={k} />}
    </g>
  );
}

/* ---------- Gangarten-Treppe ---------- */
const STEPS = ["Halt", "Schritt", "Trab", "Galopp"];
function TreppeScene({ t, b: beat, t0, t1, active }: { t: number; b: TreppeBeat; t0: number; t1: number; active: number }) {
  const sx = (i: number) => 110 + i * 150;
  const sy = (i: number) => 400 - i * 75;
  const pos = active;
  const k = ease((t - t0) / 0.5);
  return (
    <g>
      <rect width={ST.w} height={ST.h} fill={COL.sage} />
      {STEPS.map((s, i) => (
        <g key={s}>
          <rect x={sx(i) - 10} y={sy(i)} width={160} height={ST.h - sy(i)} fill={i === pos ? COL.honey : i % 2 ? COL.sand : COL.sandLight} />
          <text x={sx(i) + 70} y={sy(i) + 42} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize="30" fontWeight="800" fill={COL.forestDeep}>{s}</text>
        </g>
      ))}
      {/* Kugel springt die Stufen hinab */}
      <g transform={`translate(${sx(pos) + 70} ${sy(pos) - 38})`}>
        <circle r="30" fill={COL.forest} />
        <text y="10" textAnchor="middle" fontFamily={FONT_BODY} fontSize="28" fill={PAPER}>🐴</text>
      </g>
      {beat.mode === "profi" && (
        <g opacity={k}>
          <path d={`M${sx(3) + 70} ${sy(3) - 80} C ${sx(2) + 70} ${sy(3) - 190}, ${sx(1) + 120} ${sy(1) - 170}, ${sx(1) + 80} ${sy(1) - 75}`} stroke={COL.rust} strokeWidth="6" fill="none" strokeDasharray="4 12" strokeLinecap="round" />
          <Chip x={sx(2) + 70} y={sy(3) - 150} text="Profis: direkt Galopp → Schritt" fill={COL.rust} />
        </g>
      )}
      {beat.mode === "down" && <Chip x={383} y={50} text="Stufe für Stufe – mit halben Paraden" fill={COL.forest} k={k} />}
      {t1 < 0 && null}
    </g>
  );
}

/* ---------- Tafel rechts ---------- */
function Panel({ t, sec, startOf, items }: { t: number; sec: Section; startOf: (id: string) => number; items: Array<[string, string, string?]> }) {
  const a = startOf(sec.from);
  const k = ease((t - a + 0.3) / 0.5);
  const title = wrap(sec.title, 22);
  let y = PN.y + 64;
  return (
    <g opacity={k}>
      <rect x={PN.x} y={PN.y + 6} width={PN.w} height={PN.h} rx="26" fill={COL.brown} opacity=".12" />
      <rect x={PN.x} y={PN.y} width={PN.w} height={PN.h} rx="26" fill={PAPER} />
      <text x={PN.x + 30} y={PN.y + 46} fontFamily={FONT_BODY} fontSize="17" fontWeight="700" letterSpacing="1.5" fill={COL.rust}>{sec.kicker.toUpperCase()}</text>
      {title.map((l, i) => {
        y = PN.y + 92 + i * 40;
        return <text key={i} x={PN.x + 30} y={y} fontFamily={FONT_DISPLAY} fontSize="34" fontWeight="800" fill={COL.forestDeep}>{l}</text>;
      })}
      {(() => {
        let yy = y + 30;
        return items.map(([text, id, col], i) => {
          const ki = ease((t - startOf(id) + 0.1) / 0.4);
          const ls = wrap(text, 33);
          const y0 = yy;
          yy += ls.length * 29 + 16;
          if (ki <= 0) return null;
          return (
            <g key={i} opacity={ki} transform={`translate(${(1 - ki) * 16} 0)`}>
              <circle cx={PN.x + 40} cy={y0 + 14} r="9" fill={col ?? COL.honey} />
              {ls.map((l, j) => <text key={j} x={PN.x + 60} y={y0 + 22 + j * 29} fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.ink}>{l}</text>)}
            </g>
          );
        });
      })()}
    </g>
  );
}

function HilfenRow({ on, y }: { on: Array<"g" | "s" | "z">; y: number }) {
  const H3: Array<["g" | "s" | "z", string, string]> = [["g", "Gewicht", COL.brownDeep], ["s", "Schenkel", COL.forest], ["z", "Zügel", COL.rust]];
  return (
    <g>
      {H3.map(([id, label, col], i) => {
        const lit = on.includes(id);
        const x = PN.x + 30 + i * 134;
        return (
          <g key={id}>
            <rect x={x} y={y} width={124} height={42} rx="21" fill={lit ? col : COL.bg} stroke={lit ? col : COL.sand} strokeWidth="2" />
            <text x={x + 62} y={y + 28} textAnchor="middle" fontFamily={FONT_BODY} fontSize="19" fontWeight="700" fill={lit ? PAPER : COL.inkSoft}>{label}</text>
          </g>
        );
      })}
    </g>
  );
}

function MiniTreppe({ active, y }: { active: number; y: number }) {
  return (
    <g>
      {STEPS.map((s, i) => {
        const x = PN.x + 30 + i * 100;
        const h = 18 + i * 10;
        const on = i === active;
        return (
          <g key={s}>
            <rect x={x} y={y + 40 - h} width={92} height={h} rx="5" fill={on ? COL.honey : COL.sandLight} />
            <text x={x + 46} y={y + 62} textAnchor="middle" fontFamily={FONT_BODY} fontSize="17" fontWeight="700" fill={on ? COL.forestDeep : COL.inkSoft}>{s}</text>
          </g>
        );
      })}
    </g>
  );
}

function Merke({ t, at, lines }: { t: number; at: number; lines: string[] }) {
  const k = ease((t - at) / 0.5);
  if (k <= 0) return null;
  const rows = lines.flatMap((l) => wrap(l, 30));
  const h = 90 + rows.length * 50;
  const y0 = ST.y + (ST.h - h) / 2;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 20})`}>
      <rect x={ST.x} y={ST.y} width={ST.w} height={ST.h} rx="26" fill={COL.forestDeep} opacity=".55" />
      <rect x={ST.x + 50} y={y0} width={ST.w - 100} height={h} rx="30" fill={COL.honey} />
      <text x={ST.x + ST.w / 2} y={y0 + 52} textAnchor="middle" fontFamily={FONT_BODY} fontSize="22" fontWeight="700" letterSpacing="2" fill={COL.forestDeep}>MERKE</text>
      {rows.map((r, i) => (
        <text key={i} x={ST.x + ST.w / 2} y={y0 + 104 + i * 50} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize="38" fontWeight="800" fill={COL.forestDeep}>{r}</text>
      ))}
    </g>
  );
}

function Captions({ text }: { text: string }) {
  const lines = wrap(text, 68);
  const h = 22 + lines.length * 38;
  return (
    <g>
      <rect x="110" y={LH - 18 - h} width={LW - 220} height={h} rx="18" fill={COL.forestDeep} opacity="0.9" />
      {lines.map((l, i) => (
        <text key={i} x={LW / 2} y={LH - 18 - h + 41 + i * 38} textAnchor="middle" fontFamily={FONT_BODY} fontSize="28" fontWeight="700" fill={PAPER}>{l}</text>
      ))}
    </g>
  );
}

/* ---------- Gesamtbild ---------- */
export function renderLern(def: LernDef, lineTexts: Record<string, string>, t: number): ReactNode {
  const { tm, line, idx, word } = mk(def.slug);
  const i = idx(t);
  const L = tm.lines[i];
  const beat = def.beats[L.id];
  const prev = i > 0 ? def.beats[tm.lines[i - 1].id] : undefined;
  const tSwitch = beat.v === "side" && beat.to ? word(L.id, beat.to[1], lineTexts[L.id]) : beat.v === "side" && beat.ride === "aussitzen-dann-rise" ? word(L.id, "Danach", lineTexts[L.id]) : 1e9;
  // Überblendung bei Ansichtswechsel oder Gangartwechsel
  const changed = !prev || prev.v !== beat.v || (prev.v === "side" && beat.v === "side" && (prev.to?.[0] ?? prev.gait) !== beat.gait);
  const since = t - (L.start - 0.25);
  let cover = changed ? 1 - clamp01(since / 0.35) : 0;
  if (beat.v === "side" && beat.to) cover = Math.max(cover, 1 - clamp01(Math.abs(t - tSwitch) / 0.22));
  // aktive Stufe (Treppe)
  const gaitIdx = (g: Gait) => (g === "stand" ? 0 : g === "schritt" ? 1 : g === "trab" ? 2 : 3);
  let active = 0;
  if (beat.v === "side") active = gaitIdx(beat.to && t >= tSwitch ? beat.to[0] : beat.gait);
  else if (beat.v === "top") active = 2;
  if (beat.v === "treppe") {
    const txt = lineTexts[L.id];
    if (beat.mode === "down") {
      const w = ["Galopp, Trab", "Trab, Schritt", "Schritt, Halt", "Halt. Bei"].map((x) => word(L.id, x, txt));
      active = t < w[1] ? 3 : t < w[2] ? 2 : t < w[3] ? 1 : 0;
      if (t > word(L.id, "Bei jedem", txt)) active = 3 - (Math.floor((t - word(L.id, "Bei jedem", txt)) / 0.9) % 4);
    } else active = t < word(L.id, "direkt", txt) ? 3 : 1;
  }
  // Tafel
  let si = 0;
  def.sections.forEach((s, k) => { if (t >= line(s.from).start - 0.3) si = k; });
  const sec = def.sections[si];
  const merkeAt = line("merke").start - 0.1;
  const chunk = L.chunks.find((c) => t >= c.start - 0.15 && t < c.end + 0.6) ?? (t < L.end + 0.6 ? L.chunks[L.chunks.length - 1] : undefined);
  const startOf = (id: string) => line(id).start;
  return (
    <svg viewBox={`0 0 ${LW} ${LH}`} width={LW} height={LH} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={LW} height={LH} fill={COL.bg} />
      <defs>
        <clipPath id="stage"><rect x={0} y={0} width={ST.w} height={ST.h} rx="26" /></clipPath>
      </defs>
      <g transform={`translate(${ST.x} ${ST.y})`} clipPath="url(#stage)">
        {beat.v === "side" && <SideScene t={t} b={beat} t0={L.start} tSwitch={tSwitch} />}
        {beat.v === "top" && <TopScene t={t} b={beat} t0={L.start} />}
        {beat.v === "treppe" && <TreppeScene t={t} b={beat} t0={L.start} t1={L.end} active={active} />}
        {cover > 0 && <rect width={ST.w} height={ST.h} fill={COL.bg} opacity={cover} />}
      </g>
      <Panel t={t} sec={sec} startOf={startOf} items={sec.items ?? []} />
      {sec.hilfen && <HilfenRow on={beat.h ?? sec.hilfen} y={PN.y + PN.h - (sec.treppe ? 128 : 66)} />}
      {sec.treppe && <MiniTreppe active={active} y={PN.y + PN.h - 76} />}
      <Merke t={t} at={merkeAt} lines={def.merke} />
      {/* Kopfzeile */}
      <g transform="translate(24 24)">
        <rect width={def.chip.length * 11.2 + 48} height="40" rx="20" fill={COL.forest} />
        <path d="M18 27v-9a6 6 0 0 1 12 0v9" fill="none" stroke={PAPER} strokeWidth="3.4" strokeLinecap="round" />
        <text x="40" y="27" fontFamily={FONT_BODY} fontSize="19" fontWeight="700" fill={PAPER}>{def.chip}</text>
      </g>
      {chunk && t < merkeAt && <Captions text={chunk.text} />}
    </svg>
  );
}
