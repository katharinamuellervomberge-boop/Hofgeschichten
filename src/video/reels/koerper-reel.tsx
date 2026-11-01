import { AnimHorse, bodyBob } from "@/components/illustrations/akademie/AnimHorse";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import type { HorseLook } from "@/content/types";
import { riderBody } from "../leichttraben";
import { ArenaHorse, Arrow, COL, Caption, Chip, Dots, E, FONT_BODY, Header, PAPER, PointHead, S, SkyDefs, T, W, H, back, ease, seq, sm, toScreen, win, type VLine } from "./rkit";

/* Reel (9:16): „Vorhand, Mittelhand, Hinterhand in 30 Sekunden“ – Spickzettel zum Speichern (Format wie Reel 18).
   Pferd in Seitenansicht (Kopf rechts), Schritt. Die drei Abschnitte färben sich ein:
   Vorhand = honey (trägt mehr Gewicht), Mittelhand = forest (hier sitzt du), Hinterhand = rust (der Motor).
   Bleibt in der Akademie: wie man die Hinterhand mit den Hilfen aktiviert. */

/** Zeiten GESCHÄTZT (noch keine Aufnahme) – nach der Aufnahme durch echte Zeiten ersetzen wie in hilfen-reel.tsx */
export const KOERPER_LINES: VLine[] = seq([
  ["hook", "Vorhand, Mittelhand, Hinterhand – in 30 Sekunden. Speichern!", 3.5],
  ["drei", "Jedes Pferd hat drei Teile: vorne, in der Mitte und hinten.", 4.0],
  ["vor", "Die Vorhand: Kopf, Hals, Schultern und Vorderbeine. Sie trägt mehr als die Hälfte vom Gewicht.", 6.2],
  ["mitte", "Die Mittelhand: vom Widerrist über den Rücken bis zur Lende. Genau hier sitzt du.", 5.6],
  ["hinter", "Die Hinterhand: Kruppe, Hüfte und Hinterbeine. Das ist der Motor – sie schiebt das Pferd nach vorne.", 6.4],
  ["warum", "Deshalb treibst du von hinten nach vorne – und ziehst nicht vorne am Zügel.", 4.4],
  ["merke", "Merke: Hinten der Motor, in der Mitte du, vorne das Lenkrad.", 4.2],
  ["tease", "Wie du die Hinterhand aktivierst? Das lernt dein Kind in der Reitakademie.", 4.4],
], 0.4, 0.4);
const L = KOERPER_LINES;
export const KOERPER_TOTAL = E(L, "tease") + 2.6;

/** Wortmarken – nach der Aufnahme hier echte Zeiten eintragen (ohne VO-Versatz), sonst anteilig nach Zeichen */
const MARKS: Record<string, number> = {};
function at(id: string, word: string) {
  if (MARKS[`${id}|${word}`] !== undefined) return MARKS[`${id}|${word}`];
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

const V_COL = COL.honey;
const M_COL = COL.forest;
const H_COL = COL.rust;

/* ---------- Abschnitte am Pferd (Pferde-Koordinaten, Kopf rechts) ---------- */
// Grenze Vorhand | Mittelhand: Widerrist → hinter dem Ellbogen; Grenze Mittelhand | Hinterhand: Lende → vor dem Knie
const CUT_V: Array<[number, number]> = [[270, 0], [254, 92], [236, 206], [222, 330]];
const CUT_H: Array<[number, number]> = [[172, 0], [170, 92], [162, 206], [160, 330]];
const poly = (pts: Array<[number, number]>) => pts.map((p) => p.join(",")).join(" ");
const REG = {
  v: poly([...CUT_V, [420, 330], [420, 0]]),
  m: poly([...CUT_H, ...[...CUT_V].reverse()]),
  h: poly([[40, 0], [40, 330], ...[...CUT_H].reverse()]),
};

function RegionDefs() {
  const tint = (id: string, c: string) => (
    <filter id={id} filterUnits="userSpaceOnUse" x="0" y="0" width="460" height="360">
      <feFlood floodColor={c} />
      <feComposite in2="SourceAlpha" operator="in" />
    </filter>
  );
  return (
    <defs>
      {tint("kr-tv", "#E0B062")}
      {tint("kr-tm", "#7C9A6E")}
      {tint("kr-th", "#C8714E")}
      <clipPath id="kr-cv"><polygon points={REG.v} /></clipPath>
      <clipPath id="kr-cm"><polygon points={REG.m} /></clipPath>
      <clipPath id="kr-ch"><polygon points={REG.h} /></clipPath>
    </defs>
  );
}

/** Eingefärbte Kopie des Pferdes, auf einen Abschnitt beschnitten (gleiche Pose wie das echte Pferd) */
function Tint({ t, reg, k, look }: { t: number; reg: "v" | "m" | "h"; k: number; look: HorseLook }) {
  if (k <= 0.01) return null;
  return (
    <g clipPath={`url(#kr-c${reg})`} opacity={0.82 * k}>
      <g filter={`url(#kr-t${reg})`}>
        <AnimHorse look={look} gait="schritt" time={t} noShadow />
      </g>
    </g>
  );
}

function Cuts({ k }: { k: number }) {
  if (k <= 0.01) return null;
  const line = (pts: Array<[number, number]>) => `M${pts[1].join(",")} L${pts[2].join(",")}`;
  return (
    <g opacity={k} fill="none" strokeLinecap="round">
      <path d={line(CUT_V)} stroke={PAPER} strokeWidth="2.6" strokeDasharray="6 5" />
      <path d={line(CUT_H)} stroke={PAPER} strokeWidth="2.6" strokeDasharray="6 5" />
    </g>
  );
}

/* ---------- Beschriftungen ---------- */
type Lab = { text: string; p: [number, number]; chip: [number, number]; word: string; col: string };
function Labels({ t, id, items, o }: { t: number; id: string; items: Lab[]; o: number }) {
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      {items.map((it) => {
        const k = back((t - at(id, it.word)) / 0.4);
        if (k <= 0.01) return null;
        const p = toScreen(it.p);
        return (
          <g key={it.text} opacity={Math.min(1, k)}>
            <path d={`M${it.chip[0]} ${it.chip[1] - 10} L${p[0]} ${p[1]}`} stroke={COL.forestDeep} strokeWidth="4" opacity=".7" />
            <circle cx={p[0]} cy={p[1]} r="9" fill={COL.forestDeep} stroke={PAPER} strokeWidth="3" />
            <g transform={`translate(${it.chip[0]} ${it.chip[1]}) scale(${Math.max(0.01, k)}) translate(${-it.chip[0]} ${-it.chip[1]})`}>
              <Chip x={it.chip[0]} y={it.chip[1]} text={it.text} fill={it.col === V_COL ? COL.forestDeep : it.col} size={30} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Gewichtsverteilung: vorne mehr als die Hälfte */
function Waage({ t }: { t: number }) {
  const o = win(t, at("vor", "Sie trägt"), E(L, "vor"));
  if (o <= 0) return null;
  const k = ease((t - at("vor", "Sie trägt")) / 0.6);
  const x0 = 140;
  const w = 800;
  const front = 0.58 * k; // nur Anschauung: „mehr als die Hälfte“, keine feste Zahl
  return (
    <g opacity={o}>
      <rect x={x0} y={1360} width={w} height={64} rx="32" fill={COL.sandLight} stroke={COL.brown} strokeOpacity=".35" strokeWidth="3" />
      <rect x={x0 + w * (1 - front)} y={1360} width={w * front} height={64} rx="32" fill={V_COL} />
      <path d={`M${x0 + w / 2} 1346 V1438`} stroke={COL.forestDeep} strokeWidth="4" strokeDasharray="8 7" />
      <T x={x0 + w * 0.25} y={1405} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>hinten</T>
      <T x={x0 + w * 0.75} y={1405} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep} o={k}>vorne</T>
      <T x={540} y={1478} size={34} font={FONT_BODY} weight={700} color={COL.forestDeep} o={ease((t - at("vor", "mehr als")) / 0.4)}>vorne: mehr als die Hälfte vom Gewicht</T>
    </g>
  );
}

/** Zahnrad = Motor an der Kruppe */
function Gear({ c, r, rot, col }: { c: [number, number]; r: number; rot: number; col: string }) {
  return (
    <g transform={`translate(${c[0]} ${c[1]}) rotate(${rot})`}>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={-r * 0.22} y={-r * 1.28} width={r * 0.44} height={r * 0.5} rx={r * 0.08} fill={col} transform={`rotate(${i * 45})`} />
      ))}
      <circle r={r} fill={col} />
      <circle r={r * 0.42} fill={PAPER} />
    </g>
  );
}

function Motor({ t, pulse }: { t: number; pulse: number }) {
  const o = win(t, at("hinter", "Das ist"), E(L, "hinter"));
  if (o <= 0) return null;
  const g = back((t - at("hinter", "Motor")) / 0.45);
  const s = ease((t - at("hinter", "schiebt")) / 0.5);
  const c = toScreen([132, 140]);
  const a = toScreen([150, 156]);
  const b = toScreen([318, 150]);
  const tip: [number, number] = [a[0] + (b[0] - a[0]) * s + 14 * pulse * s, a[1] + (b[1] - a[1]) * s];
  return (
    <g opacity={o}>
      {s > 0.02 && <Arrow from={a} to={tip} color={PAPER} w={22} head={34} />}
      {s > 0.02 && <Arrow from={a} to={tip} color={H_COL} w={13} head={30} />}
      <g transform={`translate(${c[0]} ${c[1]}) scale(${Math.max(0.01, g)})`}>
        <circle r="66" fill={PAPER} stroke={H_COL} strokeWidth="6" />
        <Gear c={[0, 0]} r={32} rot={t * 90} col={H_COL} />
      </g>
      <g opacity={Math.min(1, g)}>
        <Chip x={c[0]} y={c[1] - 92} text="Motor" fill={H_COL} size={34} />
      </g>
    </g>
  );
}

/** „von hinten nach vorne“ – Pfeil läuft über die Oberlinie */
function Flow({ t }: { t: number }) {
  const o = win(t, S(L, "warum"), E(L, "warum"));
  if (o <= 0) return null;
  const pts = ([[118, 150], [170, 164], [240, 160], [262, 150], [322, 142]] as Array<[number, number]>).map(toScreen);
  const d = `M${pts[0][0]} ${pts[0][1]} C${pts[1][0]} ${pts[1][1]} ${pts[2][0]} ${pts[2][1]} ${pts[3][0]} ${pts[3][1]} L${pts[4][0] - 30} ${pts[4][1] + 2}`;
  const len = 560;
  const u = ease((t - at("warum", "von hinten")) / 1.1);
  const ok = back((t - at("warum", "von hinten") - 0.3) / 0.45);
  const no = back((t - at("warum", "ziehst nicht")) / 0.45);
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={PAPER} strokeWidth="24" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - u)} />
      <path d={d} fill="none" stroke={COL.honey} strokeWidth="14" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - u)} />
      {u > 0.96 && <Arrow from={[pts[4][0] - 40, pts[4][1] + 2]} to={[pts[4][0] + 10, pts[4][1]]} color={COL.honey} w={14} head={30} />}
      <g opacity={Math.min(1, ok)} transform={`translate(540 1392) scale(${Math.max(0.01, ok)}) translate(-540 -1392)`}>
        <Chip x={540} y={1392} text="✓ von hinten nach vorne treiben" fill={COL.forest} size={34} />
      </g>
      <g opacity={Math.min(1, no)} transform={`translate(540 1484) scale(${Math.max(0.01, no)}) translate(-540 -1484)`}>
        <Chip x={540} y={1484} text="✗ vorne am Zügel ziehen" fill={H_COL} size={34} />
      </g>
    </g>
  );
}

/* ---------- Texte oben ---------- */
function Title({ t, id, top, sub, color = COL.forestDeep }: { t: number; id: string; top: string; sub?: string; color?: string }) {
  const o = win(t, S(L, id), E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - S(L, id)) / 0.4);
  const k2 = ease((t - S(L, id) - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={290} size={Math.min(88, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={366} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

// Reihenfolge wie am Pferd: hinten links, vorne rechts (Kopf rechts)
const TRIO: Array<[string, string, string, number]> = [["Hinterhand", "hinten", H_COL, 0], ["Mittelhand", "Mitte", M_COL, 1], ["Vorhand", "vorne", V_COL, 2]];

function Drei({ t }: { t: number }) {
  const o = win(t, S(L, "drei"), E(L, "drei"));
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <Title t={t} id="drei" top="3 Teile" sub="vorne · in der Mitte · hinten" />
      {TRIO.map(([label, word, col, i]) => {
        const k = back((t - at("drei", word)) / 0.4);
        if (k <= 0) return null;
        const x = 540 + (i - 1) * 310;
        return (
          <g key={label} transform={`translate(${x} 490) scale(${Math.max(0.01, k)})`}>
            <rect x={-145} y={-46} width={290} height={92} rx="46" fill={col} />
            <T x={0} y={14} size={40} font={FONT_BODY} weight={700} color={col === V_COL ? COL.forestDeep : PAPER}>{label}</T>
          </g>
        );
      })}
    </g>
  );
}

/** Hook: dunkle Titelkarte wie Reel 18 */
function Hook({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook") + 0.1, 0.35);
  if (o <= 0) return null;
  const k = (d: number) => ease((t + 0.4 - d) / 0.45);
  const rows: Array<[string, string]> = [["Vorhand", V_COL], ["Mittelhand", COL.sage], ["Hinterhand", "#E0A285"]];
  return (
    <g opacity={o}>
      <rect width={W} height={H} fill={COL.forestDeep} />
      <rect x={250} y={420} width={580} height={1080} rx="20" fill={COL.forest} opacity=".55" />
      <rect x={290} y={460} width={500} height={1000} rx="12" fill="none" stroke={COL.sand} strokeWidth="4" strokeDasharray="14 14" opacity=".35" />
      {rows.map(([s, c], i) => (
        <g key={s} opacity={k(i * 0.12)} transform={`translate(0 ${(1 - k(i * 0.12)) * 40})`}>
          <T x={540} y={700 + i * 120} size={104} color={c}>{s}</T>
        </g>
      ))}
      <g opacity={k(0.45)} transform={`translate(0 ${(1 - k(0.45)) * 40})`}>
        <T x={540} y={1060} size={84} color={PAPER} italic>in 30 Sekunden</T>
      </g>
      <g opacity={ease((t - 0.8) / 0.4)}>
        <path d="M132 1128 h28 v44 l-14 -10 l-14 10 Z" fill={COL.rust} />
        <T x={560} y={1162} size={38} font={FONT_BODY} weight={700} color={COL.sand}>Speichern für die nächste Reitstunde</T>
      </g>
    </g>
  );
}

/* ---------- Spickzettel (Merke) ---------- */
const CARD: Array<[string, string, string[]]> = [
  ["1 · Vorhand", V_COL, ["Kopf · Hals · Schultern · Vorderbeine", "trägt mehr Gewicht", "das Lenkrad"]],
  ["2 · Mittelhand", COL.sage, ["Widerrist · Rücken · Lende", "die Brücke", "hier sitzt du"]],
  ["3 · Hinterhand", "#E0A285", ["Kruppe · Hüfte · Hinterbeine", "schiebt nach vorne", "der Motor"]],
];
function Spick({ t }: { t: number }) {
  const a = S(L, "merke") - 0.2;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 50})`}>
      <rect width={W} height={H} fill={COL.bg} opacity={0.94} />
      <rect x={70} y={150} width={940} height={1230} rx="44" fill={COL.forestDeep} />
      <T x={540} y={240} size={38} font={FONT_BODY} weight={700} color={COL.honey}>SPICKZETTEL · PFERDEKÖRPER</T>
      {CARD.map(([head, col, items], i) => {
        const y = 300 + i * 300;
        const ki = ease((t - a - 0.25 - i * 0.2) / 0.4);
        return (
          <g key={head} opacity={ki} transform={`translate(${(1 - ki) * -40} 0)`}>
            <rect x={120} y={y} width={840} height={270} rx="30" fill={COL.forest} />
            <rect x={120} y={y} width={18} height={270} rx="9" fill={col} />
            <T x={170} y={y + 72} size={56} color={PAPER} anchor="start">{head}</T>
            {items.map((it, j) => (
              <T key={it} x={190} y={y + 132 + j * 46} size={34} font={FONT_BODY} weight={700} color={j === 2 ? col : COL.sand} anchor="start">{`• ${it}`}</T>
            ))}
          </g>
        );
      })}
      <g opacity={ease((t - at("merke", "Hinten der Motor")) / 0.4)}>
        <rect x={120} y={1210} width={840} height={130} rx="65" fill={COL.honey} />
        <T x={540} y={1262} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>MERKE</T>
        <T x={540} y={1314} size={36} color={COL.forestDeep}>Motor hinten › du › Lenkrad vorne</T>
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
      <T x={540} y={1497} size={48} color={COL.forestDeep}>Wie aktiviere ich die Hinterhand?</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>Lernt dein Kind in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Reiterhilfen · Link in der Bio</T>
    </g>
  );
}

/* ---------- Beschriftungen je Abschnitt (Pferdepunkt → Chip auf dem Bildschirm) ---------- */
const VOR: Lab[] = [
  { text: "Kopf", p: [342, 92], chip: [930, 660], word: "Kopf", col: V_COL },
  { text: "Hals", p: [284, 88], chip: [700, 600], word: "Hals", col: V_COL },
  { text: "Schultern", p: [262, 150], chip: [790, 1010], word: "Schultern", col: V_COL },
  { text: "Vorderbeine", p: [254, 236], chip: [850, 1110], word: "Vorderbeine", col: V_COL },
];
const MITTE: Lab[] = [
  { text: "Widerrist", p: [252, 102], chip: [690, 660], word: "Widerrist", col: M_COL },
  { text: "Rücken", p: [208, 114], chip: [500, 590], word: "Rücken", col: M_COL },
  { text: "Lende", p: [176, 108], chip: [300, 660], word: "Lende", col: M_COL },
];
const HINTER: Lab[] = [
  { text: "Kruppe", p: [132, 106], chip: [200, 610], word: "Kruppe", col: H_COL },
  { text: "Hüfte", p: [150, 134], chip: [470, 640], word: "Hüfte", col: H_COL },
];
const HINTER_BEIN: Lab[] = [{ text: "Hinterbeine", p: [124, 236], chip: [250, 1430], word: "Hinterbeine", col: H_COL }];

export function renderKoerper(t: number) {
  const look = getHorse("tonga")!.look;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const b = riderBody(0);
  const bob = bodyBob("schritt", t);

  const dreiO = win(t, S(L, "drei"), E(L, "drei"));
  const vO = win(t, S(L, "vor"), E(L, "vor"));
  const mO = win(t, S(L, "mitte"), E(L, "mitte"));
  const hO = win(t, S(L, "hinter"), E(L, "hinter"));
  const tv = Math.max(dreiO * sm((t - at("drei", "vorne")) / 0.3), vO);
  const tm = Math.max(dreiO * sm((t - at("drei", "Mitte")) / 0.3), mO);
  const th = Math.max(dreiO * sm((t - at("drei", "hinten")) / 0.3), hO);
  const cuts = Math.max(dreiO, vO, mO, hO);

  // Reiterin „ploppt“ bei „Genau hier sitzt du“ in den Sattel und bleibt
  const rk = back((t - at("mitte", "Genau hier")) / 0.5);
  const riderOn = rk > 0.01;
  const hip = toScreen([b.hip[0], b.hip[1] + bob]);
  const duO = win(t, at("mitte", "Genau hier"), E(L, "mitte"));
  // Teile-Chips der Mittelhand weichen, wenn die Reiterin kommt
  const mLabO = mO * (1 - sm((t - at("mitte", "Genau hier") + 0.1) / 0.3));

  const highlight = vO > 0.3 ? { VL: V_COL, VR: V_COL } : hO > 0.3 ? { HL: H_COL, HR: H_COL } : {};
  const spans: Array<[number, number]> = ["vor", "mitte", "hinter"].map((id) => [S(L, id), E(L, id)]);
  const hookO = win(t, 0, E(L, "hook"));
  const hideHead = Math.max(hookO, win(t, S(L, "merke") - 0.2, KOERPER_TOTAL + 1));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <SkyDefs />
      <rect width={W} height={H} fill={COL.bg} />
      <ArenaHorse
        t={t}
        gait="schritt"
        look={look}
        highlight={highlight}
        after={
          <g>
            <RegionDefs />
            <Tint t={t} reg="v" k={tv} look={look} />
            <Tint t={t} reg="m" k={tm} look={look} />
            <Tint t={t} reg="h" k={th} look={look} />
            <g transform={`translate(0 ${bob})`}>
              <Cuts k={cuts} />
              {riderOn && (
                <g opacity={Math.min(1, rk)} transform={`translate(0 ${(1 - Math.min(1, rk)) * -40})`}>
                  <Tack hand={b.hand} longRein={false} stirrupsDown={false} />
                  <Rider b={b} pose="sitz" />
                </g>
              )}
            </g>
          </g>
        }
      />
      <Labels t={t} id="vor" items={VOR} o={vO} />
      <Labels t={t} id="mitte" items={MITTE} o={mLabO} />
      <Labels t={t} id="hinter" items={HINTER} o={hO * (1 - sm((t - at("hinter", "Das ist") + 0.1) / 0.3))} />
      <Labels t={t} id="hinter" items={HINTER_BEIN} o={hO} />
      {duO > 0 && (
        <g opacity={duO * Math.min(1, rk)}>
          <Arrow from={[hip[0] - 230, hip[1] - 160]} to={[hip[0] - 40, hip[1] - 30]} color={M_COL} w={9} head={22} />
          <Chip x={hip[0] - 250} y={hip[1] - 180} text="du sitzt hier" fill={M_COL} size={34} />
        </g>
      )}
      <Waage t={t} />
      <Motor t={t} pulse={pulse} />
      <Flow t={t} />
      <Header t={t} hide={hideHead} />
      <Drei t={t} />
      <PointHead t={t} start={S(L, "vor")} end={E(L, "vor")} n="1" title="Vorhand" sub="trägt mehr Gewicht" />
      <PointHead t={t} start={S(L, "mitte")} end={E(L, "mitte")} n="2" title="Mittelhand" sub="hier sitzt du" />
      <PointHead t={t} start={S(L, "hinter")} end={E(L, "hinter")} n="3" title="Hinterhand" sub="der Motor" />
      <Title t={t} id="warum" top="Von hinten nach vorne" sub="treiben statt ziehen" color={COL.forest} />
      <Dots t={t} spans={spans} y={1545} />
      <Caption t={t} lines={L} skip={["hook", "merke", "tease"]} y={1610} />
      <Spick t={t} />
      <Tease t={t} />
      <Hook t={t} />
    </svg>
  );
}
