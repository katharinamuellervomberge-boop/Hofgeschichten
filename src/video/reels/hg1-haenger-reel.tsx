import type { ReactNode } from "react";
import { COL, Caption, FONT_BODY, Ground, NodHorse, PAPER, Phone, Pop, T, W, back, ease, hs, lerp, sm, type Place, type VLine } from "./nov-kit";
import { LOOK_T, NumCard } from "./n2-kit";
import { HomeScreen } from "./nov-akademie";
import { LOOKS, TopHorse, world, type Pt } from "./top";
import { Big, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./haenger-lines.json";

/* Hofgeschichten Reel 01 „Warum dein Pferd NICHT in den Hänger will!“ (comp `haenger`, 17.11.2026), Jessica v4 ×1,12.
   Vier gleichwertige Faktoren: Hell-Dunkel-Wechsel, Untergrund, Fluchttier/enger Raum, Erfahrung (inkl. Schmerz).
   Die Pferdeperspektive ist ausdrücklich als Illustration gekennzeichnet – keine Simulation des Pferdesehens.
   Quellen: Murphy/Hall/Arkins 2009 (doi 10.1155/2009/721798), Hanggi & Ingersoll 2009 (doi 10.1016/j.beproc.2009.04.009),
   Yorke/Matusiewicz/Padalino 2017 (doi 10.1294/jes.28.67), Ferguson & Rosales-Ruiz 2001 (doi 10.1901/jaba.2001.34-409).
   Neu gezeichnet: nur der Anhänger (seitlich, von hinten, von oben). Pferde, Boden, Karten, Akademie-Handy = Bestand. */

const { S, E, total } = vo(LJ as VoLines);
export const HAENGER_TOTAL = total;

const TEXT: Record<string, string> = {
  "01": "Dein Pferd will nicht in den Hänger?",
  "02": "Vielleicht liegt es daran, was es dort sieht.",
  "03": "Draußen ist es hell,",
  "04": "drinnen deutlich dunkler.",
  "05": "Pferdeaugen brauchen Zeit, um sich an diesen Wechsel anzupassen.",
  "06": "Im ersten Moment sind Details schwerer zu erkennen.",
  "07": "Dazu kommt der Boden:",
  "08": "Rampe, Kante, Schatten.",
  "09": "Das muss dein Pferd erst einschätzen –",
  "10": "und eine hohl klingende Rampe ist ungewohnt.",
  "11": "Pferde sind Fluchttiere.",
  "12": "Ein enger Raum mit wenig Ausweichmöglichkeit ist nicht automatisch vertraut.",
  "13": "Und Pferde lernen aus Erfahrung.",
  "14": "Schlechte Erlebnisse beim Verladen oder Fahren wirken nach –",
  "15": "manchmal stecken auch Schmerzen dahinter.",
  "16": "Statt „stur“ lohnt sich ein zweiter Blick.",
  "17": "Du willst dein Pferd besser verstehen?",
  "18": "Dann entdecke die Reitakademie von Hofgeschichten.",
};
const CAP: VLine[] = Object.entries((LJ as VoLines).lines).map(([id, [a, b]]) => ({ id, text: TEXT[id], start: a, dur: b - a }));

/* ---------- Helfer ---------- */
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, u: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], Math.max(0, Math.min(1, u))))).join(",")})`;
};
const lp = (p: Pt, q: Pt, u: number): Pt => [lerp(p[0], q[0], u), lerp(p[1], q[1], u)];

function Tag({ x, y, text, size = 30, fill = COL.forestDeep, color = PAPER, o = 1 }: { x: number; y: number; text: string; size?: number; fill?: string; color?: string; o?: number }) {
  if (o <= 0.01) return null;
  const w = text.length * size * 0.54 + 60;
  return (
    <g opacity={o}>
      <rect x={x - w / 2} y={y - size * 1.0} width={w} height={size * 1.75} rx={size * 0.87} fill={fill} />
      <T x={x} y={y + size * 0.12} size={size} font={FONT_BODY} weight={800} color={color}>{text}</T>
    </g>
  );
}
/** „Grund n von 4“ + Punkte */
function FHead({ t, a, n, title, size = 100 }: { t: number; a: number; n: number; title: string; size?: number }) {
  const k = ease((t - a) / 0.3);
  return (
    <g>
      <g opacity={k}>
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={486 + i * 36} cy={86} r={11} fill={i < n ? COL.honey : COL.sand} />)}
        <T x={540} y={150} size={30} font={FONT_BODY} weight={800} color={COL.rust}>{`GRUND ${n} VON 4`}</T>
      </g>
      <Big t={t} a={a} lines={[title]} y={265} size={size} />
    </g>
  );
}
function ArrowL({ from, to, col, w = 12, head = 30, o = 1 }: { from: Pt; to: Pt; col: string; w?: number; head?: number; o?: number }) {
  const ang = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const bx = to[0] - Math.cos(ang) * head * 0.8, by = to[1] - Math.sin(ang) * head * 0.8;
  const l: Pt = [to[0] - Math.cos(ang - 0.5) * head, to[1] - Math.sin(ang - 0.5) * head];
  const r: Pt = [to[0] - Math.cos(ang + 0.5) * head, to[1] - Math.sin(ang + 0.5) * head];
  return (
    <g opacity={o}>
      <path d={`M${from[0]} ${from[1]} L${bx} ${by}`} stroke={col} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${to[0]} ${to[1]} L${l[0]} ${l[1]} L${r[0]} ${r[1]} Z`} fill={col} />
    </g>
  );
}
function Cross({ x, y, s = 22, o = 1 }: { x: number; y: number; s?: number; o?: number }) {
  return <path opacity={o} d={`M${x - s} ${y - s} L${x + s} ${y + s} M${x + s} ${y - s} L${x - s} ${y + s}`} stroke={COL.rust} strokeWidth="10" strokeLinecap="round" />;
}

/* ---------- Anhänger (neu) ---------- */
const INT_LIT = "#4A423A";
const INT_DARK = "#0F0D0B";
/** Seitlich-schräg: Ursprung = Boden unter der linken Kante der Rückwand, Rampe heruntergelassen nach links */
function TrailerSide({ ax, gy, k, dark = 0.85, shade = 0 }: { ax: number; gy: number; k: number; dark?: number; shade?: number }) {
  const top: Pt[] = [[0, -70], [170, -70]];
  const bot: Pt[] = [[-120, 6], [60, 6]];
  return (
    <g transform={`translate(${ax} ${gy}) scale(${k})`}>
      <ellipse cx={300} cy={8} rx={330} ry={14} fill="#000" opacity=".12" />
      {/* Deichsel + Stützrad */}
      <path d="M590 -95 L760 -70" stroke="#5B5A55" strokeWidth="12" strokeLinecap="round" />
      <circle cx={735} cy={-22} r={16} fill="#2B2622" />
      <path d="M735 -70 V-38" stroke="#5B5A55" strokeWidth="8" />
      {/* Seitenwand (perspektivisch) */}
      <path d="M170 -540 L590 -572 Q600 -572 600 -560 L600 -60 L170 -50 Z" fill="#E6E9DE" stroke={COL.forest} strokeWidth="5" strokeLinejoin="round" />
      <path d="M170 -330 L600 -350 L600 -322 L170 -304 Z" fill={COL.honey} />
      <rect x={455} y={-505} width={95} height={62} rx={14} fill="#B9C7CF" stroke={COL.forest} strokeWidth="5" transform="skewY(-4)" />
      {/* Rad + Kotflügel */}
      <circle cx={400} cy={-36} r={50} fill="#2B2622" />
      <circle cx={400} cy={-36} r={18} fill="#9A9A92" />
      <path d="M332 -50 A68 68 0 0 1 468 -54" stroke={COL.forest} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Rückwand mit Öffnung */}
      <path d="M0 -70 V-500 Q0 -540 40 -540 H130 Q170 -540 170 -500 V-70 Z" fill={COL.forest} />
      <rect x={14} y={-524} width={142} height={454} rx={26} fill={mix(INT_LIT, INT_DARK, dark)} />
      <path d="M20 -100 L150 -100" stroke="#000" strokeOpacity=".25" strokeWidth="6" />
      {/* Rampe */}
      <path d={`M${top[0]} L${top[1]} L${bot[1]} L${bot[0]} Z`} fill="#9A8569" stroke="#5E4E40" strokeWidth="4" strokeLinejoin="round" />
      {[1, 2, 3, 4, 5, 6].map((i) => {
        const a = lp(top[0], bot[0], i / 7), b = lp(top[1], bot[1], i / 7);
        return <path key={i} d={`M${a[0] + 3} ${a[1]} L${b[0] - 3} ${b[1]}`} stroke="#6F5D49" strokeWidth="5" strokeLinecap="round" />;
      })}
      {shade > 0.01 && (() => {
        const a = lp(top[0], bot[0], 0.42), b = lp(top[1], bot[1], 0.42);
        return <path d={`M0 -70 L170 -70 L${b[0]} ${b[1]} L${a[0]} ${a[1]} Z`} fill="#1C1611" opacity={0.6 * shade} />;
      })()}
    </g>
  );
}
const sideP = (ax: number, gy: number, k: number, p: Pt): Pt => [ax + p[0] * k, gy + p[1] * k];

/** Von hinten, aus Pferdesicht (Illustration) */
function TrailerFront({ dark, detail, glare }: { dark: number; detail: number; glare: number }) {
  const O = { x0: 276, x1: 804, y0: 668, y1: 1290 };
  const B = { x0: 400, x1: 680, y0: 790, y1: 1150 };
  const dc = "#8B8174";
  return (
    <g>
      <defs>
        <clipPath id="hg-pic"><rect x={0} y={560} width={W} height={920} /></clipPath>
        <mask id="hg-glare">
          <rect x={0} y={560} width={W} height={920} fill="#fff" />
          <rect x={O.x0} y={O.y0} width={O.x1 - O.x0} height={O.y1 - O.y0} rx={30} fill="#000" />
        </mask>
        <radialGradient id="hg-vig" cx="0.5" cy="0.55" r="0.75">
          <stop offset="0.55" stopColor={COL.forestDeep} stopOpacity="0" />
          <stop offset="1" stopColor={COL.forestDeep} stopOpacity=".55" />
        </radialGradient>
        <radialGradient id="hg-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF6D8" />
          <stop offset="1" stopColor="#FFF6D8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath="url(#hg-pic)">
        <rect x={0} y={560} width={W} height={760} fill="#F8F3E6" />
        <circle cx={140} cy={640} r={260} fill="url(#hg-sun)" />
        <Ground y={1290} h={200} id="hg-f" />
        {/* Anhänger-Körper + Räder */}
        <rect x={196} y={1236} width={44} height={96} rx={12} fill="#2B2622" />
        <rect x={840} y={1236} width={44} height={96} rx={12} fill="#2B2622" />
        <path d="M222 1300 V650 Q222 612 262 610 H818 Q858 612 858 650 V1300 Z" fill="#E6E9DE" stroke={COL.forest} strokeWidth="6" />
        <path d="M250 1300 V670 Q250 640 282 640 H798 Q830 640 830 670 V1300 Z" fill={COL.forest} />
        {/* Innenraum */}
        <rect x={O.x0} y={O.y0} width={O.x1 - O.x0} height={O.y1 - O.y0} rx={30} fill={mix(INT_LIT, INT_DARK, dark)} />
        <g opacity={detail}>
          <rect x={B.x0} y={B.y0} width={B.x1 - B.x0} height={B.y1 - B.y0} rx={10} fill={dc} opacity=".35" />
          <g stroke={dc} strokeWidth="4" opacity=".7">
            <path d={`M${O.x0 + 20} ${O.y0 + 20} L${B.x0} ${B.y0} M${O.x1 - 20} ${O.y0 + 20} L${B.x1} ${B.y0} M${O.x0 + 10} ${O.y1 - 6} L${B.x0} ${B.y1} M${O.x1 - 10} ${O.y1 - 6} L${B.x1} ${B.y1}`} />
            {[0.25, 0.5, 0.75].map((u) => <path key={u} d={`M${lerp(O.x0 + 10, B.x0, u)} ${lerp(O.y1 - 6, B.y1, u)} H${lerp(O.x1 - 10, B.x1, u)}`} />)}
          </g>
          {/* Trennwand + Brustbalken */}
          <path d={`M540 ${O.y0 + 4} L540 1040`} stroke="#A99E8F" strokeWidth="16" strokeLinecap="round" />
          <path d={`M${B.x0 + 6} 960 H${B.x1 - 6}`} stroke="#A99E8F" strokeWidth="12" strokeLinecap="round" />
          {/* Heunetz */}
          <ellipse cx={460} cy={870} rx={46} ry={56} fill="#B29A5E" opacity=".75" />
          <path d="M424 840 L496 900 M430 900 L494 846 M460 814 V926" stroke="#6F5D3C" strokeWidth="3" />
          {/* Anbindering */}
          <circle cx={625} cy={890} r={13} fill="none" stroke="#C9BFAF" strokeWidth="5" />
        </g>
        {/* Rampe */}
        <path d={`M${O.x0} ${O.y1} L${O.x1} ${O.y1} L900 1478 L180 1478 Z`} fill="#9A8569" stroke="#5E4E40" strokeWidth="4" />
        {[1, 2, 3, 4, 5].map((i) => {
          const y = lerp(O.y1, 1478, i / 6);
          return <path key={i} d={`M${lerp(O.x0, 180, i / 6) + 6} ${y} H${lerp(O.x1, 900, i / 6) - 6}`} stroke="#6F5D49" strokeWidth="6" />;
        })}
        <rect x={0} y={560} width={W} height={920} fill="#FFFDF5" opacity={glare} mask="url(#hg-glare)" />
        <rect x={0} y={560} width={W} height={920} fill="url(#hg-vig)" />
      </g>
    </g>
  );
}

/* ---------- Szenen ---------- */
const HK = 1.35;
const HOOK_PL: Place = { x: 440 - 302 * HK, y: 1450 - 285 * HK, k: HK };
function Hook({ t }: { t: number }) {
  const a2 = S("02");
  const z = 1 + 0.32 * sm((t - a2) / 2.2);
  const nod = 12 * sm((t - a2 - 0.2) / 0.8);
  const eye = hs(HOOK_PL, [326, 72]);
  const op0 = sideP(600, 1450, 1.15, [14, -524]), op1 = sideP(600, 1450, 1.15, [14, -90]);
  const cone = sm((t - a2 - 0.4) / 0.6);
  const ear = hs(HOOK_PL, [300, 26]);
  return (
    <g>
      <g transform={`translate(700 1150) scale(${z}) translate(-700 -1150)`}>
        <Ground y={1450} h={200} id="hg-h" />
        <TrailerSide ax={600} gy={1450} k={1.15} dark={0.9} />
        <NodHorse t={t} pl={HOOK_PL} look={LOOK_T} gait="stand" id="hg-hh" nod={nod} />
        {cone > 0.01 && <path d={`M${eye[0]} ${eye[1]} L${op0[0] + 20} ${op0[1] + 60} L${op1[0] + 20} ${op1[1]} Z`} fill={COL.honey} opacity={0.28 * cone} />}
        {t >= a2 && (
          <g transform={`translate(${ear[0] - 10} ${ear[1] - 90}) scale(${back((t - a2) / 0.35) * (1 + 0.06 * Math.sin(t * 7))})`}>
            <circle r="52" fill={COL.rust} />
            <T x={0} y={24} size={74} color={PAPER}>?</T>
          </g>
        )}
      </g>
      <rect x={0} y={0} width={W} height={510} fill={COL.bg} />
      <Big t={t} a={0} lines={["Warum dein Pferd", "NICHT in den", "Hänger will!"]} y={175} size={100} />
    </g>
  );
}
function Light({ t }: { t: number }) {
  const a = S("03");
  const adapt = sm((t - S("05")) / (E("06") - S("05") + 0.3));
  const dark = t < S("04") - 0.05 ? 0.7 : 1 - 0.42 * adapt;
  const glare = 0.12 + 0.22 * sm((t - a) / 0.5) - 0.12 * adapt;
  const detail = 0.06 + 0.94 * adapt;
  const meter = ease((t - S("05") + 0.1) / 0.3);
  return (
    <g>
      <TrailerFront dark={dark} detail={detail} glare={glare} />
      <Tag x={540} y={612} text="aus Pferdesicht – angenähert" size={28} fill={PAPER} color={COL.forestDeep} o={ease((t - a) / 0.4) * 0.92} />
      <FHead t={t} a={a - 0.12} n={1} title="Hell → Dunkel" />
      {meter < 0.01 ? (
        <g>
          <Pop t={t} a={a + 0.1} x={330} y={445} text="draußen: hell" fill={COL.honey} color={COL.forestDeep} size={36} />
          <Pop t={t} a={S("04")} x={750} y={445} text="drinnen: dunkler" fill={COL.forestDeep} size={36} />
        </g>
      ) : (
        <g opacity={meter}>
          <T x={150} y={448} size={34} font={FONT_BODY} weight={800} color={COL.forestDeep} anchor="start">Anpassung</T>
          <rect x={360} y={418} width={560} height={40} rx={20} fill={COL.sandLight} />
          <rect x={360} y={418} width={Math.max(40, 560 * adapt)} height={40} rx={20} fill={COL.honey} />
          <T x={950} y={452} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft} anchor="start">⏱</T>
        </g>
      )}
      <Tag x={540} y={1512} text="Illustration · keine exakte Simulation des Pferdesehens" size={24} fill={COL.forestDeep} o={0.88} />
    </g>
  );
}
const GK = 2.3, GAX = 650, GGY = 1420;
const GPL: Place = { x: 350 - 302 * 1.45, y: GGY - 285 * 1.45, k: 1.45 };
function Floor({ t }: { t: number }) {
  const a = S("07"), d8 = E("08") - S("08");
  const m = [S("08") + 0.05, S("08") + 0.05 + d8 / 3, S("08") + 0.05 + (2 * d8) / 3];
  const P: Pt[] = [sideP(GAX, GGY, GK, [2, -15]), sideP(GAX, GGY, GK, [-90, 6]), sideP(GAX, GGY, GK, [64, -56])];
  const names = ["Rampe", "Kante", "Schatten"];
  const nod = 20 * sm((t - S("09") - 0.1) / 0.8);
  const wave = t >= S("10") + 0.8;
  const c = sideP(GAX, GGY, GK, [27, -32]);
  return (
    <g>
      <Ground y={GGY} h={160} id="hg-g" />
      <TrailerSide ax={GAX} gy={GGY} k={GK} dark={0.92} shade={sm((t - m[2]) / 0.3) * 0.6 + 0.4} />
      <NodHorse t={t} pl={GPL} look={LOOK_T} gait="stand" id="hg-gh" nod={nod} />
      {P.map((p, i) => {
        const k = back((t - m[i]) / 0.35);
        if (k <= 0.01) return null;
        const pulse = 1 + 0.12 * Math.sin((t - m[i]) * 7);
        return (
          <g key={i} transform={`translate(${p[0]} ${p[1]})`}>
            <circle r={44 * pulse} fill="none" stroke={COL.honey} strokeWidth="7" opacity={0.9} />
            <g transform={`scale(${Math.max(0.01, Math.min(1.2, k))})`}>
              <circle r={30} fill={COL.rust} />
              <T x={0} y={13} size={36} font={FONT_BODY} weight={900} color={PAPER}>{String(i + 1)}</T>
            </g>
          </g>
        );
      })}
      {wave && [0, 1, 2].map((i) => {
        const u = ((t - S("10") - 0.8) * 0.9 + i / 3) % 1;
        return <circle key={i} cx={c[0]} cy={c[1]} r={40 + 220 * u} fill="none" stroke={COL.honey} strokeWidth={8 * (1 - u)} opacity={1 - u} />;
      })}
      {wave && <T x={770} y={1110} size={60} color={PAPER} italic>klonk!</T>}
      <rect x={0} y={0} width={W} height={530} fill={COL.bg} />
      <FHead t={t} a={a - 0.12} n={2} title="Der Boden" />
      {names.map((n, i) => <Pop key={n} t={t} a={m[i]} x={[230, 540, 850][i]} y={445} text={`${i + 1} ${n}`} fill={COL.rust} size={36} />)}
      {t >= S("10") && <Tag x={540} y={600} text="hohler Klang = ungewohnt" size={34} fill={COL.honey} color={COL.forestDeep} o={ease((t - S("10")) / 0.3)} />}
    </g>
  );
}
const DIRS = [0, 45, 90, 135, 180, 225, 270, 315];
function Flight({ t }: { t: number }) {
  const a = S("11");
  const up: Pt = [540, 820], lo: Pt = [540, 1250];
  const ka = sm((t - a - 0.2) / 0.6);
  const kb = ease((t - S("12") + 0.05) / 0.4);
  const ra = sm((t - S("12") - 0.6) / 0.6);
  const late = t >= S("12") + 2.3;
  return (
    <g>
      <defs>
        <clipPath id="hg-up"><rect x={40} y={575} width={1000} height={440} rx={36} /></clipPath>
        <clipPath id="hg-lo"><rect x={40} y={1035} width={1000} height={440} rx={36} /></clipPath>
      </defs>
      <g clipPath="url(#hg-up)">
        <rect x={40} y={575} width={1000} height={440} fill="#B9C59B" />
        {DIRS.map((d) => {
          const r = (d * Math.PI) / 180;
          const len = lerp(110, 300, ka);
          return <ArrowL key={d} from={[up[0] + Math.cos(r) * 100, up[1] + Math.sin(r) * 100]} to={[up[0] + Math.cos(r) * len, up[1] + Math.sin(r) * len]} col={COL.forest} o={ka} />;
        })}
        <TopHorse at={up} ang={-90} look={LOOKS.tivoli} step={0} s={3} noRider />
      </g>
      <Tag x={150} y={625} text="Weide" size={30} fill={COL.forestDeep} />
      {kb > 0.01 && (
        <g opacity={kb}>
          <g clipPath="url(#hg-lo)">
            <rect x={40} y={1035} width={1000} height={440} fill="#E3D3B4" />
            <rect x={420} y={1060} width={240} height={380} fill="#5D574C" />
            <rect x={438} y={1078} width={204} height={362} fill="#8C8276" />
            <rect x={438} y={1440} width={204} height={40} fill="#9A8569" />
            {DIRS.map((d) => {
              const r = (d * Math.PI) / 180;
              const back_ = d === 90;
              const len = back_ ? lerp(150, 225, ra) : lerp(100, 120, ra);
              const tip: Pt = [lo[0] + Math.cos(r) * len, lo[1] + Math.sin(r) * len];
              return (
                <g key={d}>
                  <ArrowL from={[lo[0] + Math.cos(r) * (back_ ? 140 : 80), lo[1] + Math.sin(r) * (back_ ? 140 : 80)]} to={tip} col={back_ ? COL.honey : COL.forest} w={10} head={24} o={ra} />
                  {!back_ && d !== 270 && <Cross x={lo[0] + Math.cos(r) * 135} y={lo[1] + Math.sin(r) * 135} s={14} o={sm((t - S("12") - 1.2) / 0.3)} />}
                </g>
              );
            })}
            <TopHorse at={lo} ang={-90} look={LOOKS.tivoli} step={0} s={2.8} noRider />
          </g>
          <Tag x={160} y={1085} text="Hänger" size={30} fill={COL.forestDeep} />
        </g>
      )}
      <FHead t={t} a={a - 0.12} n={3} title="Fluchttier" />
      {!late ? (
        <Pop t={t} a={a + 0.5} x={540} y={445} text="Sicherheit durch Ausweichen" fill={COL.forest} size={36} />
      ) : (
        <Pop t={t} a={S("12") + 2.3} x={540} y={445} text="eng · neu · nicht automatisch vertraut" fill={COL.rust} size={34} />
      )}
    </g>
  );
}
function Experience({ t }: { t: number }) {
  const a = S("13");
  const c = [a + 0.4, a + 1.0, S("14") + 2.0];
  const arr = (i: number) => sm((t - c[i + 1] + 0.25) / 0.3);
  return (
    <g>
      <FHead t={t} a={a - 0.12} n={4} title="Erfahrung" />
      <NumCard t={t} a={c[0]} x={540} y={560} w={820} n="1" title="Erlebnis" sub="z. B. Stress beim Verladen oder Fahren" col={COL.rust} />
      <NumCard t={t} a={c[1]} x={540} y={850} w={820} n="2" title="Lernen" sub="das Pferd verknüpft den Hänger damit" col={COL.honey} />
      <NumCard t={t} a={c[2]} x={540} y={1140} w={820} n="3" title="Nächstes Mal" sub="zögern, ausweichen, verweigern" col={COL.forest} />
      {[0, 1].map((i) => <ArrowL key={i} from={[540, 800 + i * 290]} to={[540, 800 + i * 290 + 18 * arr(i) + 2]} col={COL.inkSoft} w={8} head={20} o={arr(i)} />)}
      {t >= S("15") && <Tag x={540} y={1445} text="Schmerzen? Tierärztlich abklären lassen" size={32} fill={COL.rust} o={ease((t - S("15")) / 0.3)} />}
    </g>
  );
}
function Verdict({ t }: { t: number }) {
  const a = S("16");
  const k = 1.9;
  const pl: Place = { x: 540 - 230 * k, y: 1350 - 285 * k, k };
  const strike = ease((t - a - 0.55) / 0.35);
  const chips: Array<[string, number, number]> = [["1 Licht", 250, 650], ["2 Boden", 830, 650], ["3 Fluchttier", 270, 1450], ["4 Erfahrung", 810, 1450]];
  return (
    <g>
      <Ground y={1350} h={150} id="hg-v" />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="hg-vh" nod={-3 + 3 * Math.sin(t * 2)} />
      {chips.map(([s, x, y], i) => <Pop key={s} t={t} a={a + 0.9 + i * 0.22} x={x} y={y} text={s} fill={[COL.honey, COL.rust, COL.forest, COL.brown][i]} color={i === 0 ? COL.forestDeep : PAPER} size={36} />)}
      <Big t={t} a={a - 0.1} lines={["„stur“?"]} y={250} size={140} col={COL.rust} />
      {strike > 0 && <path d={`M290 222 L${290 + 500 * strike} ${222 - 10 * strike}`} stroke={COL.forestDeep} strokeWidth="16" strokeLinecap="round" />}
      {t >= a + 1.0 && <T x={540} y={430} size={60} color={COL.forestDeep} o={ease((t - a - 1.0) / 0.3)}>Nicht stur. Viele Gründe.</T>}
    </g>
  );
}
function Akademie({ t }: { t: number }) {
  const a = S("17");
  const py = lerp(1960, 440, ease((t - a + 0.1) / 0.6));
  const hi = sm((t - S("18") - 0.2) / 0.3);
  const fin = E("18") + 0.3;
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Dein Pferd", "besser verstehen?"]} y={190} size={84} />
      <Phone x={280} y={py} w={520} id="hg-ph">
        <g transform={`translate(296 ${py + 16})`}>
          <HomeScreen scroll={0} />
          {hi > 0.01 && <rect x={10} y={398} width={468} height={164} rx="22" fill="none" stroke={COL.honey} strokeWidth={6 + 2 * Math.sin(t * 6)} opacity={hi} />}
        </g>
      </Phone>
      {hi > 0.01 && t < fin && <Tag x={540} y={1440} text="Modul 1: Pferde verstehen" size={34} fill={COL.honey} color={COL.forestDeep} o={hi} />}
      {t >= fin && (
        <g opacity={Math.min(1, back((t - fin) / 0.4))}>
          <rect x={90} y={1400} width={900} height={250} rx="44" fill={COL.forest} />
          <T x={540} y={1490} size={52} color={PAPER}>Hofgeschichten Reitakademie</T>
          <T x={540} y={1560} size={40} font={FONT_BODY} weight={800} color={COL.honey}>einmalig 29,90 € · dauerhaft</T>
          <T x={540} y={1622} size={44} font={FONT_BODY} weight={900} color={PAPER}>Link in Bio</T>
        </g>
      )}
    </g>
  );
}

export function renderHaenger(t: number) {
  const cuts = [S("03") - 0.12, S("07") - 0.12, S("11") - 0.12, S("13") - 0.12, S("16") - 0.12, S("17") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Light t={t} />;
  else if (t < cuts[2]) body = <Floor t={t} />;
  else if (t < cuts[3]) body = <Flight t={t} />;
  else if (t < cuts[4]) body = <Experience t={t} />;
  else if (t < cuts[5]) body = <Verdict t={t} />;
  else body = <Akademie t={t} />;
  return <Frame t={t} cuts={cuts} after={<Caption t={t} lines={CAP} y={1580} />}>{body}</Frame>;
}

/** Cover (Hook-Bild ohne Untertitel) */
export function renderHaengerCover() {
  return <Frame t={3.4} cuts={[]}><Hook t={3.4} /></Frame>;
}
