import type { ReactNode } from "react";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { COL, Caption, FONT_BODY, PAPER, Pop, T, back, ease, headPoint, hs, lerp, sm, type Place, type VLine } from "./nov-kit";
import { LOOK_T, Stamp } from "./n2-kit";
import { Arena, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, BrandLine, Bubble, Face, Frame, vo, type VoLines } from "./viral-kit";
import { ArrowL, Tag } from "./hg1-haenger-reel";
import P2J from "./pov2-lines.json";
import R2J from "./rl2-lines.json";

/* Tagesset 03 · Funny-Reels mit Stimme (v2, 17.11.2026 abends), Jessica v4.
   `pov2` (08:00): Tierdoku – Kamerasucher, Zeitlupe, Bedrohungs-HUD, Gefahrenpegel, Pferd beschnuppert das Blatt → Entwarnung.
   Erschrecken realistisch: stehen bleiben, Kopf hoch, Auge groß; Untersuchen = Kopf senken und schnuppern.
   `rl2` (19:30): Reitlehrer-Sätze wörtlich genommen – ✚-Regen, Hand im „Handstand“ auf dem Zaunpfosten, Bein-Verleih.
   Bestand: RidingHorse, Arena, Face, Bubble, Big, Stamp, Tag, Caption. Neu: Sucher/HUD/Pegel, Blatt, Handstand-Hand, Verleih-Karte. */

const NOD = 8;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
const rs = (nod: number, slack = 0.3, hand: P = SITZ.hand): RideState => ({ nod, reach: 0, hand, rein: REIN - 0.3 + slack });
const caps = (J: VoLines, txt: Record<string, string>): VLine[] => Object.entries(J.lines).map(([id, [a, b]]) => ({ id, text: txt[id], start: a, dur: b - a }));

/* ======================= POV · Tierdoku ======================= */
const PV = vo(P2J as VoLines);
export const POV2_TOTAL = PV.total;
const PV_TXT: Record<string, string> = {
  "01": "Hier sehen wir eine Reiterin in ihrem natürlichen Lebensraum.", "02": "Ihr Plan für heute:", "03": "ganz entspannt Schritt reiten.",
  "04": "Doch dann …", "05": "ein Blatt.", "06": "Windstärke: drei Kilometer pro Stunde.", "07": "Das Pferd erkennt sofort: Lebensgefahr.",
  "08": "Nach einer kurzen Untersuchung steht fest:", "09": "Es war ein Blatt.", "10": "Die Reiterin akzeptiert ihr Schicksal.", "11": "Wer hat auch so ein Pferd?",
};
const PV_CAP = caps(P2J as VoLines, PV_TXT);
const PL: Place = { x: 470 - 160 * 2.7, y: 1400 - 285 * 2.7, k: 2.7 };
const SNIFF = 24, REACH = 10;

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-34 0 Q0 -30 34 0 Q0 30 -34 0 Z" fill="#D9932E" stroke="#9E6418" strokeWidth="3" />
      <path d="M-36 0 L38 0 M-6 0 L8 -12 M-6 0 L8 12 M12 0 L22 -9 M12 0 L22 9" stroke="#9E6418" strokeWidth="3" fill="none" />
    </g>
  );
}
/** Kamerasucher: Ecken, REC, Timecode */
function Finder({ t, red = false }: { t: number; red?: boolean }) {
  const c = red ? "#FF5A4A" : PAPER;
  const fr = Math.floor(t * 25) % 25, s = Math.floor(t);
  const tc = `00:00:${String(12 + s).padStart(2, "0")}:${String(fr).padStart(2, "0")}`;
  const L = 70;
  const box = [70, 580, 1010, 1490];
  return (
    <g stroke={c} strokeWidth="7" fill="none" strokeLinecap="round">
      <path d={`M${box[0]} ${box[1] + L} V${box[1]} H${box[0] + L} M${box[2] - L} ${box[1]} H${box[2]} V${box[1] + L} M${box[2]} ${box[3] - L} V${box[3]} H${box[2] - L} M${box[0] + L} ${box[3]} H${box[0]} V${box[3] - L}`} />
      <g stroke="none">
        {Math.floor(t * 2) % 2 === 0 && <circle cx={128} cy={636} r={14} fill="#E5392E" />}
        <T x={156} y={648} size={32} font={FONT_BODY} weight={900} color={c} anchor="start">REC</T>
        <T x={952} y={648} size={30} font={FONT_BODY} weight={800} color={c} anchor="end">{tc}</T>
      </g>
    </g>
  );
}
function LowerThird({ t, a, b, title, sub }: { t: number; a: number; b: number; title: string; sub: string }) {
  const k = ease((t - a) / 0.35) * (1 - ease((t - b) / 0.3));
  if (k <= 0.01) return null;
  return (
    <g transform={`translate(${lerp(-700, 0, k)} 0)`}>
      <rect x={90} y={1340} width={640} height={118} rx={18} fill={COL.forestDeep} opacity=".92" />
      <rect x={90} y={1340} width={14} height={118} rx={7} fill={COL.honey} />
      <T x={130} y={1392} size={40} weight={800} color={PAPER} anchor="start" italic>{title}</T>
      <T x={130} y={1438} size={28} font={FONT_BODY} weight={700} color={COL.honey} anchor="start">{sub}</T>
    </g>
  );
}
/** Gefahrenpegel 0…1 */
function Gauge({ v, o }: { v: number; o: number }) {
  if (o <= 0.01) return null;
  const x0 = 140, x1 = 940, y = 430;
  const col = v > 0.66 ? "#E5392E" : v > 0.33 ? COL.honey : COL.forest;
  return (
    <g opacity={o}>
      <T x={x0} y={y - 40} size={30} font={FONT_BODY} weight={900} color={COL.inkSoft} anchor="start">GEFAHRENSTUFE</T>
      <rect x={x0} y={y - 20} width={x1 - x0} height={44} rx={22} fill={COL.sandLight} />
      <rect x={x0} y={y - 20} width={Math.max(44, (x1 - x0) * v)} height={44} rx={22} fill={col} />
      <T x={x1} y={y - 40} size={30} font={FONT_BODY} weight={900} color={col} anchor="end">{v > 0.66 ? "LEBENSGEFAHR" : v > 0.33 ? "ERHÖHT" : "ENTSPANNT"}</T>
    </g>
  );
}
/** Zeitlupe: S04 … S07 läuft die Welt mit 30 % */
function warp(t: number) {
  const { S } = PV;
  const a = S("04"), b = S("07");
  if (t < a) return t;
  if (t < b) return a + (t - a) * 0.3;
  return a + (b - a) * 0.3;
}
export function renderPov2(t: number) {
  const { S, E } = PV;
  const tw = warp(t);
  const spook = t >= S("07");
  const head = spook ? sm((t - S("07") - 0.15) / 0.2) : 0;
  const sniff = sm((t - S("08") - 0.3) / 0.9);
  const relax = sm((t - S("09")) / 0.6);
  const nod = spook ? lerp(lerp(NOD, -22, head), SNIFF, sniff) - 3 * relax * Math.sin(t * 3) : NOD + 2 * Math.sin(tw * 2.6);
  const s: RideState = { ...rs(nod, 0.3 + 9 * Math.max(head, sniff)), reach: REACH * sniff };
  const gait = spook ? ("stand" as const) : ("schritt" as const);
  const eye = hs(PL, [333, 77]);
  const muzzle = hs(PL, headPoint(BIT, SNIFF, REACH));
  // Blatt: schwebt in Zeitlupe herein und landet vor dem Pferdemaul
  const lf = sm((t - S("05") + 0.3) / (S("07") - S("05") + 0.2));
  const land: P = [muzzle[0] + 60, 1395];
  const leaf: P = [lerp(1150, land[0], lf), lerp(700, land[1], lf) - 70 * Math.sin(lf * Math.PI * 2.5)];
  const showLeaf = t >= S("05") - 0.3;
  const zoom = 1;
  const shake = spook ? 10 * Math.sin(t * 60) * Math.max(0, 1 - (t - S("07") - 0.15) / 0.5) * (t > S("07") + 0.15 ? 1 : 0) : 0;
  const slow = t >= S("04") && t < S("07");
  const hud = t >= S("07") && t < S("08");
  const danger = t < S("07") ? 0.08 : lerp(lerp(0.08, 1, sm((t - S("07") - 0.1) / 1.6)), 0.06, sm((t - S("09")) / 0.6));
  const gaugeO = sm((t - S("07") + 0.1) / 0.3) * (1 - sm((t - S("10") + 0.1) / 0.3));
  const cuts = [S("04") - 0.05, S("07") + 0.1, S("10") - 0.1, S("11") - 0.1];

  let top: ReactNode = null;
  if (t < S("02") - 0.1) top = <g><T x={540} y={150} size={30} font={FONT_BODY} weight={900} color={COL.rust}>HOFGESCHICHTEN · TIERDOKU</T><Big t={t} a={0.1} lines={["Ein ganz normaler", "Reittag"]} y={270} size={92} /></g>;
  else if (t < S("04") - 0.05) top = (
    <g>
      <Big t={t} a={S("02") - 0.1} lines={["Der Plan:"]} y={220} size={92} />
      <Pop t={t} a={S("03")} x={330} y={410} text="☑ Schritt" fill={COL.forest} size={44} />
      <Pop t={t} a={S("03") + 0.6} x={750} y={410} text="☑ entspannt" fill={COL.forest} size={44} />
    </g>
  );
  else if (t < S("06") - 0.05) top = <Big t={t} a={S("04") - 0.05} lines={["Doch dann …"]} y={260} size={110} />;
  else if (t < S("07")) top = <Big t={t} a={S("06") - 0.05} lines={["🍃 3 km/h"]} y={270} size={120} />;
  else if (t < S("10") - 0.1) top = <Gauge v={danger} o={gaugeO} />;
  else if (t < S("11") - 0.1) top = <Big t={t} a={S("10") - 0.1} lines={["Die Reiterin:"]} y={260} size={100} />;
  else top = <Big t={t} a={S("11") - 0.1} lines={["Wer hat auch", "so ein Pferd?"]} y={220} size={100} col={COL.rust} />;

  return (
    <Frame t={t} cuts={cuts} after={
      <g>
        {top}
        {t >= S("07") + 1.3 && t < S("08") && <Stamp t={t} a={S("07") + 1.3} x={540} y={1250} text="LEBENSGEFAHR." size={90} />}
        {t >= S("08") + 0.6 && t < S("09") && <Pop t={t} a={S("08") + 0.6} x={540} y={540} text="🔍 Untersuchung läuft …" fill={COL.honey} color={COL.forestDeep} size={44} />}
        {t >= S("09") && t < S("10") - 0.1 && <Pop t={t} a={S("09")} x={540} y={540} text="Gefahr gebannt ✓" fill={COL.forest} size={56} />}
        {t >= S("10") - 0.1 && t < S("11") - 0.1 && <Face t={t} x={540} y={1050} r={210} kind="reiter" mood="forced" a={S("10") - 0.1} />}
        {t >= S("10") - 0.1 && t < S("11") - 0.1 && <LowerThird t={t} a={S("10") + 0.2} b={S("11") - 0.3} title="Die Reiterin" sub="hat soeben aufgegeben" />}
        {t >= S("11") - 0.1 && <ArrowL from={[540, 1180]} to={[540, 1180 + 170 * ease((t - S("11")) / 0.4)]} col={COL.rust} w={16} head={40} />}
        {t >= S("11") && <BrandLine t={t} a={S("11") + 0.3} text="Hofgeschichten" y={1480} />}
        <Caption t={t} lines={PV_CAP} y={1580} />
      </g>
    }>
      <g transform={`translate(${shake} 0) translate(${eye[0]} ${eye[1]}) scale(${zoom}) translate(${-eye[0]} ${-eye[1]})`}>
        <Arena t={tw} speed={groundSpeed("schritt", PL.k)} y={PL.y + 285 * PL.k} top={540} />
        <RidingHorse t={spook ? S("07") : tw} pl={PL} look={LOOK_T} gait={gait} id="pv2" s={s} />
        {spook && head > 0.01 && sniff < 0.6 && (
          <g opacity={head * (1 - sniff / 0.6)}>
            <circle cx={eye[0]} cy={eye[1]} r={14} fill={PAPER} stroke="#2B1D14" strokeWidth="2" />
            <circle cx={eye[0] + 2} cy={eye[1]} r={6} fill="#1A120D" />
            <g transform={`translate(${eye[0] - 20} ${eye[1] - 150}) scale(${back((t - S("07") - 0.25) / 0.3) * (1 + 0.06 * Math.sin(t * 9))})`}>
              <circle r={44} fill={COL.rust} /><T x={0} y={22} size={64} color={PAPER}>!</T>
            </g>
          </g>
        )}
        {sniff > 0.5 && t < S("09") + 0.3 && <path d={`M${muzzle[0]} ${muzzle[1]} L${land[0]} ${land[1] - 10}`} stroke={COL.forestDeep} strokeWidth="5" strokeDasharray="10 10" opacity={0.7 * (1 - sm((t - S("09")) / 0.3))} />}
        {/* Schnuppern: Atemwölkchen */}
        {sniff > 0.7 && t < S("10") && [0, 1, 2].map((i) => {
          const u = ((t - S("08")) * 1.6 + i / 3) % 1;
          return <circle key={i} cx={muzzle[0] + 20 + 50 * u} cy={muzzle[1] - 10 - 30 * u} r={8 + 10 * u} fill={PAPER} opacity={0.7 * (1 - u)} />;
        })}
        {showLeaf && <Leaf x={leaf[0]} y={leaf[1]} rot={lf * 600} s={1.2} />}
        {t >= S("06") - 0.05 && t < S("07") + 0.4 && [0, 1, 2].map((i) => {
          const u = ((tw - S("06")) * 2.2 + i / 3) % 1;
          return <path key={i} d={`M${1100 - 1200 * u} ${680 + i * 110} q60 -30 120 0 t120 0`} stroke={PAPER} strokeWidth="8" fill="none" strokeLinecap="round" opacity={0.85 * Math.sin(u * Math.PI)} />;
        })}
      </g>
      {/* Zeitlupe: leicht entsättigt + Label */}
      {slow && <rect x={0} y={540} width={1080} height={960} fill="#E9E1CF" opacity=".28" />}
      {slow && <Tag x={860} y={720} text="ZEITLUPE" size={30} fill={COL.forestDeep} />}
      {/* Bedrohungs-HUD */}
      {hud && (
        <g>
          <rect x={0} y={540} width={1080} height={960} fill="#E5392E" opacity={0.12 + 0.05 * Math.sin(t * 12)} />
          {Array.from({ length: 16 }, (_, i) => <rect key={i} x={0} y={540 + i * 60 + ((t * 120) % 60)} width={1080} height={3} fill="#E5392E" opacity=".25" />)}
          <g transform={`translate(${land[0]} ${land[1]}) rotate(${t * 90})`} stroke="#E5392E" strokeWidth="6" fill="none">
            <circle r={70} strokeDasharray="30 18" />
            <path d="M-100 0 H-78 M78 0 H100 M0 -100 V-78 M0 78 V100" />
          </g>
          <Tag x={540} y={1110} text="BEDROHUNG ERKANNT: BLATT" size={36} fill="#E5392E" />
        </g>
      )}
      {t < S("10") - 0.1 && <Finder t={t} red={hud} />}
      {t < S("02") + 0.4 && <LowerThird t={t} a={0.6} b={S("02") + 0.1} title="Equus caballus" sub="Freizeitpferd · Tag 4.382 ohne Drama" />}
      {t >= S("10") - 0.1 && t < S("11") - 0.1 && <rect x={0} y={540} width={1080} height={1380} fill={COL.bg} opacity=".6" />}
    </Frame>
  );
}
export function renderPov2Cover() {
  const t = PV.S("07") + 1.5;
  return renderPov2(t);
}

/* ======================= Reitlehrer-Sätze · wörtlich ======================= */
const R2 = vo(R2J as VoLines);
export const RL2_TOTAL = R2.total;
const R2_TXT: Record<string, string> = {
  "01": "Reitlehrer-Sätze.", "02": "Wörtlich genommen.", "03": "„Mehr Kreuz!“", "04": "Okay.", "05": "Mehr Kreuz.",
  "06": "„Hand stehen lassen!“", "07": "Mach ich.", "08": "Die steht jetzt da hinten.", "09": "„Mehr Bein!“",
  "10": "Ich hab nur zwei.", "11": "Das Pferd hat vier. Soll ich mir eins leihen?", "12": "Welchen Satz verstehst du bis heute nicht?",
};
const R2_CAP = caps(R2J as VoLines, R2_TXT);
const RPL: Place = { x: 540 - 160 * 2.6, y: 1420 - 285 * 2.6, k: 2.6 };
const SKIN = "#E8AE86", SKIN_D = "#C98E68";
/** Hand im „Handstand“: steht auf Zeige- und Mittelfinger, Daumen winkt */
function StandingHand({ x, y, t, s = 1 }: { x: number; y: number; t: number; s?: number }) {
  const w = 18 * Math.sin(t * 9);
  const step = 6 * Math.sin(t * 6);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M-14 0 L${-18 + step} 70`} stroke={SKIN} strokeWidth="20" strokeLinecap="round" />
      <path d={`M14 0 L${18 - step} 70`} stroke={SKIN} strokeWidth="20" strokeLinecap="round" />
      <rect x={-44} y={-90} width={88} height={100} rx={34} fill={SKIN} stroke={SKIN_D} strokeWidth="4" />
      <path d="M-30 -86 L-34 -122 M-6 -90 L-6 -128" stroke={SKIN} strokeWidth="18" strokeLinecap="round" />
      <g transform={`translate(40 -50) rotate(${-40 + w})`}><path d="M0 0 L36 -24" stroke={SKIN} strokeWidth="20" strokeLinecap="round" /></g>
      <circle cx={-14} cy={-50} r={5} fill="#3B2A20" /><circle cx={12} cy={-50} r={5} fill="#3B2A20" />
      <path d="M-12 -30 Q0 -20 12 -30" stroke="#3B2A20" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}
function Plus({ x, y, k, c }: { x: number; y: number; k: number; c: string }) {
  if (k <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) scale(${k}) rotate(${(x * 7) % 30 - 15})`}><path d="M-14 -40 H14 V-14 H40 V14 H14 V40 H-14 V14 H-40 V-14 H-14 Z" fill={c} stroke={PAPER} strokeWidth="5" /></g>;
}
const PLUS: Array<[number, number]> = [[220, 760], [860, 740], [140, 1000], [930, 980], [330, 620], [720, 600], [520, 1240], [160, 1250], [930, 1230], [600, 820], [420, 900], [780, 1100]];
export function renderRl2(t: number) {
  const { S } = R2;
  const cuts = [S("03") - 0.1, S("06") - 0.1, S("09") - 0.1, S("12") - 0.1];
  let body: ReactNode;
  if (t < S("03") - 0.1) {
    body = (
      <g>
        <Big t={t} a={0.05} lines={["Reitlehrer-Sätze."]} y={520} size={104} />
        <Big t={t} a={S("02") - 0.05} lines={["Wörtlich genommen."]} y={660} size={90} col={COL.rust} />
        <Face t={t} x={330} y={1130} r={150} kind="trainer" mood="neutral" label="Reitlehrerin" a={0.3} />
        <Face t={t} x={760} y={1130} r={150} kind="reiter" mood="smile" label="Ich" a={0.5} />
        {t >= S("02") && <Tag x={540} y={1420} text="📖 Reiterisch → wörtlich" size={36} fill={COL.forestDeep} o={ease((t - S("02")) / 0.3)} />}
      </g>
    );
  } else if (t < S("06") - 0.1) {
    const a = S("03");
    const n = t >= S("05") ? PLUS.length : t >= S("04") ? 4 : 0;
    const s = rs(NOD + 2 * Math.sin(t * 2.6));
    body = (
      <g>
        <Arena t={t} speed={groundSpeed("schritt", RPL.k)} y={RPL.y + 285 * RPL.k} top={540} />
        <RidingHorse t={t} pl={RPL} look={LOOK_T} gait="schritt" id="r2a" s={s} />
        {PLUS.slice(0, n).map(([x, y], i) => <Plus key={i} x={x} y={y} k={back((t - (i < 4 ? S("04") : S("05")) - (i % 4) * 0.08 - Math.floor(i / 4) * 0.12) / 0.3)} c={[COL.rust, COL.honey, COL.forest][i % 3]} />)}
        <Bubble t={t} a={a} label="Reitlehrerin" lines={["„MEHR KREUZ!“"]} y={170} size={90} fill={COL.forest} />
        {t >= S("04") && <Face t={t} x={920} y={470} r={80} kind="reiter" mood="proud" a={S("04")} />}
        {t >= S("05") && <Pop t={t} a={S("05") + 0.3} x={300} y={470} text="✚ erledigt 👍" fill={COL.honey} color={COL.forestDeep} size={40} />}
      </g>
    );
  } else if (t < S("09") - 0.1) {
    const a = S("06");
    const P2: Place = { x: 700 - 160 * 2.0, y: 1420 - 285 * 2.0, k: 2.0 };
    const v = groundSpeed("schritt", P2.k);
    const post = 210 - v * 0.6 * Math.max(0, t - S("07"));
    const s = rs(NOD + 2 * Math.sin(t * 2.6));
    const gone = t >= S("07");
    body = (
      <g>
        <Arena t={t} speed={v} y={P2.y + 285 * P2.k} top={540} />
        {gone && (
          <g>
            <rect x={post - 24} y={1150} width={48} height={230} rx={8} fill="#8C7A66" stroke="#5E4E40" strokeWidth="4" />
            <StandingHand x={post} y={1080} t={t} s={1.1} />
          </g>
        )}
        <RidingHorse t={t} pl={P2} look={LOOK_T} gait="schritt" id="r2b" s={s} />
        {gone && <Tag x={Math.max(250, post + 40)} y={860} text="Hand: stehen gelassen ✓" size={32} fill={COL.forest} o={ease((t - S("08")) / 0.3)} />}
        <Bubble t={t} a={a} label="Reitlehrerin" lines={["„HAND STEHEN LASSEN!“"]} y={170} size={70} fill={COL.forest} />
        {t >= S("07") && <Face t={t} x={920} y={470} r={80} kind="reiter" mood="nod" a={S("07")} />}
      </g>
    );
  } else if (t < S("12") - 0.1) {
    const a = S("09");
    const s = rs(NOD + 2 * Math.sin(t * 2));
    const info = rideInfo(t, "stand", s);
    const calf = hs(RPL, [(info.body.knee[0] + info.body.ankle[0]) / 2, (info.body.knee[1] + info.body.ankle[1]) / 2 + info.bob]);
    const form = t >= S("11") + 1.0;
    body = (
      <g>
        <Arena t={t} speed={0} y={RPL.y + 285 * RPL.k} top={540} />
        <RidingHorse t={t} pl={RPL} look={LOOK_T} gait="stand" id="r2c" s={s} />
        <Bubble t={t} a={a} label="Reitlehrerin" lines={["„MEHR BEIN!“"]} y={170} size={90} fill={COL.forest} />
        {t >= S("10") && (
          <g>
            <Pop t={t} a={S("10")} x={calf[0] - 110} y={calf[1]} text="Ich: 2" fill={COL.honey} color={COL.forestDeep} size={44} />
            {[[300, 1320], [430, 1330], [640, 1330], [760, 1320]].map(([x, y], i) => (
              <Pop key={i} t={t} a={S("11") + i * 0.15} x={x} y={y} text={String(i + 1)} fill={COL.forest} size={40} />
            ))}
            {t >= S("11") && <Pop t={t} a={S("11") + 0.5} x={880} y={1200} text="Pferd: 4" fill={COL.forest} size={44} />}
          </g>
        )}
        {form && (
          <g transform={`translate(540 760) scale(${Math.max(0.01, back((t - S("11") - 1.0) / 0.35))}) rotate(-3)`}>
            <rect x={-330} y={-170} width={660} height={340} rx={26} fill={PAPER} stroke={COL.forestDeep} strokeWidth="6" />
            <T x={0} y={-100} size={50} color={COL.forestDeep}>Bein-Verleih</T>
            <T x={-270} y={-20} size={36} font={FONT_BODY} weight={800} color={COL.forestDeep} anchor="start">☑ 1 Bein, gebraucht</T>
            <T x={-270} y={40} size={36} font={FONT_BODY} weight={800} color={COL.forestDeep} anchor="start">☐ mit Gefühl</T>
            <T x={-270} y={100} size={30} font={FONT_BODY} weight={700} color={COL.rust} anchor="start">Preis: 1 Karotte</T>
          </g>
        )}
      </g>
    );
  } else {
    const a = S("12");
    body = (
      <g>
        <Big t={t} a={a - 0.1} lines={["Welchen Satz", "verstehst du", "bis heute nicht?"]} y={560} size={96} col={COL.rust} />
        <ArrowL from={[540, 1000]} to={[540, 1000 + 200 * ease((t - a - 0.3) / 0.4)]} col={COL.rust} w={16} head={40} />
        <BrandLine t={t} a={a + 0.5} text="Hofgeschichten" y={1420} />
      </g>
    );
  }
  return <Frame t={t} cuts={cuts} after={<Caption t={t} lines={R2_CAP} y={1580} />}>{body}</Frame>;
}
export function renderRl2Cover() {
  return renderRl2(R2.S("08") + 0.8);
}
