import type { ReactNode } from "react";
import { COL, FONT_BODY, Ground, NodHorse, PAPER, T, W, back, ease, lerp, sm, type Place } from "./nov-kit";
import { LOOK_T } from "./n2-kit";
import { Arena, RidingHorse } from "./rs-kit";
import { type Fig } from "./bein-reel";
import { Face, Frame, vo, type Mood, type VoLines } from "./viral-kit";
import type { P } from "@/components/illustrations/akademie/geometry";
import LJ from "./dating-lines.json";

/* Funny-Reel (international, EN): „What he thought dating a horse girl would be like VS. what he actually signed up for.“
   comp `dating`, 18.11.2026, Jessica v4 ×1,08. Ohne Logo, ohne Werbung.
   Bestand: RidingHorse (Galopp, Zeitlupe), NodHorse Tivoli, Person (bein-reel) als „er“, Face laie/reiter, Ground, Arena.
   Neu: Mistkarre, Heuballen, Schabracken-Stapel, Auto bei Nacht, Text-Kästen im Instagram-Stil. Running Gag: weiße Sneaker werden immer dreckiger. */

const { S, E, total } = vo(LJ as VoLines);
export const DATING_TOTAL = total;

/* ---------- Er: Pose-Bausteine (lokal, Boden y = 0, Blick nach rechts) ---------- */
const JACKET = "#3E5C78", JEANS = "#40566E", JEANS_D = "#33465B", HAIR_HIM = "#A27A43";
function fig(p: Partial<Fig>): Fig {
  return {
    hip: [0, -90], shoulder: [3, -148], head: [6, -168],
    knee: [3, -46], ankle: [0, -6], heel: [-5, 0], toe: [13, 0],
    knee2: [-3, -46], ankle2: [-4, -6], heel2: [-9, 0], toe2: [9, 0],
    elbow: [8, -120], hand: [14, -94], elbow2: [-2, -120], hand2: [2, -94], ...p,
  };
}
function walkLegs(ph: number, amp = 1): Partial<Fig> {
  const a = Math.sin(ph) * 16 * amp, b = -a;
  const lift = (v: number) => Math.max(0, v) * 0.35;
  return {
    knee: [4 + a * 0.6, -46 - lift(a)], ankle: [a, -6 - lift(a)], heel: [a - 5, -lift(a)], toe: [a + 13, -lift(a)],
    knee2: [-2 + b * 0.6, -46 - lift(b)], ankle2: [b, -6 - lift(b)], heel2: [b - 5, -lift(b)], toe2: [b + 13, -lift(b)],
  };
}
const SKIN = "#E8AE86";
/** Er: dicke Comic-Glieder, Kopf = Face „laie“ (Mimik!), Sneaker mit Matsch */
function Him({ t, x, y, s, f, flip = false, dirt = 0, hay = false, mood = "neutral", look }: { t: number; x: number; y: number; s: number; f: Fig; flip?: boolean; dirt?: number; hay?: boolean; mood?: Mood; look?: number }) {
  const X = (p: P): P => [x + (flip ? -1 : 1) * p[0] * s, y + p[1] * s];
  const seg = (a: P, b: P, c: string, w: number) => { const A = X(a), B = X(b); return <path d={`M${A[0]} ${A[1]} L${B[0]} ${B[1]}`} stroke={c} strokeWidth={w * s} strokeLinecap="round" />; };
  const hp = X(f.hip), sh = X(f.shoulder);
  const dx = sh[0] - hp[0], dy = sh[1] - hp[1], l = Math.hypot(dx, dy), nx = (-dy / l), ny = dx / l;
  const torso = `M${hp[0] - nx * 11 * s} ${hp[1] - ny * 11 * s + 6} L${sh[0] - nx * 14 * s} ${sh[1] - ny * 14 * s} Q${sh[0]} ${sh[1] - 6 * s} ${sh[0] + nx * 14 * s} ${sh[1] + ny * 14 * s} L${hp[0] + nx * 11 * s} ${hp[1] + ny * 11 * s + 6} Z`;
  const hd = X(f.head);
  const dirtC = (k: number) => `rgb(${Math.round(lerp(246, 120, k))},${Math.round(lerp(244, 90, k))},${Math.round(lerp(238, 64, k))})`;
  const shoe = (ankle: P, heel: P, toe: P, k: number) => {
    const A = X(ankle), H = X(heel), O = X(toe), d = flip ? -1 : 1;
    return (
      <g key={k}>
        <path d={`M${H[0] - d * 3 * s} ${H[1]} Q${H[0]} ${A[1] - 2 * s} ${A[0]} ${A[1] - 3 * s} Q${O[0]} ${O[1] - 7 * s} ${O[0] + d * 5 * s} ${O[1]} Z`} fill={dirtC(dirt)} stroke="#8F8A80" strokeWidth={1.2 * s} strokeLinejoin="round" />
        <path d={`M${H[0] - d * 3 * s} ${H[1] - 1.5 * s} L${O[0] + d * 5 * s} ${O[1] - 1.5 * s}`} stroke={dirt > 0.4 ? "#5E4636" : "#D9D4CA"} strokeWidth={2.4 * s} />
        {dirt > 0.3 && <circle cx={(H[0] + O[0]) / 2} cy={O[1] - 5 * s} r={2.2 * s} fill="#6E5240" opacity={dirt} />}
      </g>
    );
  };
  return (
    <g>
      {seg(f.shoulder, f.elbow2, "#2F4A63", 8)}{seg(f.elbow2, f.hand2, "#2F4A63", 8)}
      {seg(f.hip, f.knee2, JEANS_D, 15)}{seg(f.knee2, f.ankle2, JEANS_D, 12)}
      {shoe(f.ankle2, f.heel2, f.toe2, 0)}
      <path d={torso} fill={JACKET} />
      {seg(f.hip, f.knee, JEANS, 15)}{seg(f.knee, f.ankle, JEANS, 12)}
      {shoe(f.ankle, f.heel, f.toe, 1)}
      {seg(f.shoulder, [ (f.shoulder[0] + f.head[0]) / 2, (f.shoulder[1] + f.head[1]) / 2 ], SKIN, 7)}
      <Face t={t} x={hd[0]} y={hd[1]} r={16 * s} kind="laie" mood={mood} look={look ?? (flip ? -0.5 : 0.5)} />
      {hay && <g stroke="#E3C47A" strokeWidth={2 * s} strokeLinecap="round">{[[-12, -14, 0, -18], [-2, -17, 10, -13], [6, -13, 16, -19], [-14, -6, -4, -2]].map(([a, b, c, d], i) => <path key={i} d={`M${hd[0] + a * s} ${hd[1] + b * s} L${hd[0] + c * s} ${hd[1] + d * s}`} />)}</g>}
      {seg(f.shoulder, f.elbow, "#3E5C78", 8.5)}{seg(f.elbow, f.hand, "#3E5C78", 8.5)}
      {(() => { const H = X(f.hand); return <circle cx={H[0]} cy={H[1]} r={5 * s} fill={SKIN} />; })()}
    </g>
  );
}

/* ---------- Text im Instagram-Stil ---------- */
function Meme({ lines, y = 210, size = 64 }: { lines: string[]; y?: number; size?: number }) {
  const lh = size * 1.25;
  const w = Math.min(980, Math.max(...lines.map((l) => l.length)) * size * 0.54 + 70);
  return (
    <g>
      <rect x={540 - w / 2} y={y - size * 1.05} width={w} height={lines.length * lh + size * 0.55} rx={22} fill={PAPER} />
      {lines.map((l, i) => <T key={i} x={540} y={y + i * lh} size={size} font={FONT_BODY} weight={800} color="#1B1A17">{l}</T>)}
    </g>
  );
}

/* ---------- 1 · Traum ---------- */
function Dream({ t }: { t: number }) {
  const slow = t * 0.5;
  const pl: Place = { x: 600 - 160 * 2.0, y: 1150 - 285 * 2.0, k: 2.0 };
  const f = fig({ shoulder: [10, -146], head: [14, -166], elbow: [26, -118], hand: [36, -112], elbow2: [20, -118], hand2: [32, -108] });
  return (
    <g>
      <defs>
        <linearGradient id="dt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F4B979" /><stop offset="0.6" stopColor="#F7DDB0" /><stop offset="1" stopColor="#F3E7C9" /></linearGradient>
        <radialGradient id="dt-sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF6DA" /><stop offset="1" stopColor="#FFF6DA" stopOpacity="0" /></radialGradient>
      </defs>
      <rect x={0} y={0} width={W} height={1920} fill="url(#dt-sky)" />
      <circle cx={820} cy={860} r={330} fill="url(#dt-sun)" />
      <path d="M0 1080 Q300 1020 560 1060 T1080 1040 V1920 H0 Z" fill="#B7B76A" />
      <rect x={0} y={1130} width={W} height={800} fill="#A3A85C" />
      <RidingHorse t={slow} pl={pl} look={LOOK_T} gait="galopp-rechts" id="dt-r" s={{ nod: 6, reach: 0, hand: [244, 112], rein: 120 }} />
      {/* Zaun vorne */}
      <g fill="#C49A5A" stroke="#80634D" strokeWidth="4">
        <rect x={0} y={1420} width={W} height={26} rx={8} /><rect x={0} y={1520} width={W} height={26} rx={8} />
        {[120, 560, 1000].map((x) => <rect key={x} x={x - 18} y={1380} width={36} height={300} rx={8} />)}
      </g>
      <Him t={t} x={330} y={1790} s={3.0} f={f} mood="smile" look={0.7} />
      {[0, 1, 2, 3].map((i) => {
        const u = ((t * 0.5 + i / 4) % 1);
        return <path key={i} transform={`translate(${380 + 40 * Math.sin(i * 2 + t)} ${1260 - 260 * u}) scale(${1.2 + i * 0.2})`} d="M0 6 C-14 -8 -6 -20 0 -10 C6 -20 14 -8 0 6 Z" fill="#E0605A" opacity={Math.sin(u * Math.PI) * 0.9} />;
      })}
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={(i * 211 + t * 30) % 1080} cy={700 + ((i * 137) % 500)} r={3 + (i % 3)} fill="#FFF6DA" opacity={0.4 + 0.4 * Math.sin(t * 2 + i)} />)}
      <rect x={0} y={0} width={W} height={1920} fill="#F7C98A" opacity=".12" />
      <Meme lines={["What he thought", "dating a horse girl", "would be like."]} y={250} />
    </g>
  );
}

/* ---------- 2 · Mistkarre im Matsch ---------- */
function Barrow({ x, y, s, jig }: { x: number; y: number; s: number; jig: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${jig})`}>
      <path d="M-10 -78 L40 -64" stroke="#6E5240" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 -92 L120 -92 L104 -48 L44 -48 Z" fill="#6F8A5A" stroke="#3E5A48" strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 -92 Q50 -132 74 -118 Q86 -140 104 -116 Q122 -112 118 -92 Z" fill="#6B4A2E" />
      <g stroke="#E3C47A" strokeWidth="2" strokeLinecap="round">{[[44, -104, 56, -112], [70, -122, 80, -116], [92, -108, 104, -114], [60, -98, 66, -108]].map(([a, b, c, d], i) => <path key={i} d={`M${a} ${b} L${c} ${d}`} />)}</g>
      <path d="M50 -48 L46 -8 M98 -48 L110 -18" stroke="#3E5A48" strokeWidth="4" strokeLinecap="round" />
      <circle cx={112} cy={-14} r={15} fill="#2B2622" />
      <ellipse cx={112} cy={2} rx={28} ry={6} fill="#4F3A2A" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${66 + i * 16} -150 q-6 -10 0 -20 q6 -10 0 -20`} stroke="#8B7A5A" strokeWidth="2.5" fill="none" opacity=".6" />)}
    </g>
  );
}
function Mud({ t }: { t: number }) {
  const a = S("03");
  const ph = (t - a) * 7;
  const slip = Math.sin(ph * 1.3) * 3;
  const f = fig({ hip: [0, -86], shoulder: [26, -140], head: [36, -158], elbow: [44, -112], hand: [58, -84], elbow2: [40, -110], hand2: [54, -82], ...walkLegs(ph, 0.8) });
  return (
    <g>
      <defs><linearGradient id="dt-grey" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8E979C" /><stop offset="1" stopColor="#C2C7C6" /></linearGradient></defs>
      <rect x={0} y={0} width={W} height={1920} fill="url(#dt-grey)" />
      <rect x={640} y={820} width={440} height={560} fill="#7C6450" /><path d="M620 830 L860 690 L1100 830 Z" fill="#5E4636" />
      <rect x={0} y={1380} width={W} height={540} fill="#6E5240" />
      {[[180, 1500, 160], [700, 1560, 220], [420, 1700, 180]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.18} fill="#4F3A2A" opacity=".8" />)}
      {Array.from({ length: 40 }, (_, i) => { const x = (i * 97 + t * 900) % 1180 - 50, y = ((i * 211 + t * 1600) % 1300) + 500; return <path key={i} d={`M${x} ${y} l-14 34`} stroke="#E8EEF0" strokeWidth="3" opacity=".5" />; })}
      <Him t={t} x={230 + slip} y={1480} s={3.6} f={f} dirt={0.75} mood="worried" />
      <Barrow x={230 + 58 * 3.6} y={1480} s={3.6} jig={Math.sin(t * 22) * 1.2} />
      {[0, 1, 2, 3].map((i) => { const u = ((t - a) * 2.2 + i / 4) % 1; return <circle key={i} cx={230 + 112 * 3.6 + 40 * u * (i % 2 ? 1 : -1)} cy={1480 - 80 * Math.sin(u * Math.PI)} r={8} fill="#5E4232" opacity={1 - u} />; })}
      <Meme lines={["Unpaid stable employee."]} y={260} />
    </g>
  );
}

/* ---------- 3 · Heu ---------- */
function Bale({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="#E3C47A" stroke="#8B6B3E" strokeWidth="5" />
      {[0.3, 0.55, 0.8].map((u) => <path key={u} d={`M${x + 12} ${y + h * u} H${x + w - 12}`} stroke="#B8954D" strokeWidth="5" strokeLinecap="round" />)}
      <path d={`M${x + w * 0.3} ${y} V${y + h} M${x + w * 0.7} ${y} V${y + h}`} stroke="#A4573A" strokeWidth="6" />
    </g>
  );
}
function Hay({ t }: { t: number }) {
  const a = S("04");
  const stare = t >= a + 0.85;
  if (stare) {
    return (
      <g>
        <rect x={0} y={0} width={W} height={1920} fill="#C99F6E" />
        {Array.from({ length: 9 }, (_, i) => <rect key={i} x={0} y={540 + i * 130} width={W} height={8} fill="#A97F55" />)}
        <Face t={t} x={540} y={1060} r={300} kind="laie" mood="neutral" look={0} a={-1} />
        <g stroke="#E3C47A" strokeWidth="9" strokeLinecap="round">{[[400, 790, 470, 760], [520, 770, 600, 790], [640, 800, 700, 770], [430, 830, 470, 870], [680, 840, 720, 880], [560, 760, 590, 720]].map(([x1, y1, x2, y2], i) => <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} />)}</g>
        <Meme lines={["Apparently I work here now."]} y={260} />
      </g>
    );
  }
  const ph = (t - a) * 6;
  const f = fig({ shoulder: [-4, -148], head: [-2, -168], elbow: [12, -132], hand: [26, -124], elbow2: [8, -130], hand2: [22, -118], ...walkLegs(ph, 0.6) });
  const s = 3.6, x = 250 + (t - a) * 120, y = 1500;
  return (
    <g>
      <rect x={0} y={0} width={W} height={1920} fill="#C99F6E" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={0} y={540 + i * 130} width={W} height={8} fill="#A97F55" />)}
      <rect x={0} y={1500} width={W} height={420} fill="#E8D49C" />
      <Him t={t} x={x} y={y} s={s} f={f} dirt={0.8} hay mood="forced" />
      <Bale x={x + 10 * s} y={y - 182 * s} w={90 * s * 0.85} h={34 * s} />
      <Bale x={x + 14 * s} y={y - 146 * s} w={90 * s * 0.85} h={34 * s} />
      <Meme lines={["Apparently I work here now."]} y={260} />
    </g>
  );
}

/* ---------- 4 · Störrisches Pferd ---------- */
function Lead({ t }: { t: number }) {
  const a = S("05");
  const k = 2.5;
  const pl: Place = { x: 520 - (330 - 70) * k, y: 1460 - 285 * k, k };
  const head: P = [pl.x + (352 - 70) * k, pl.y + (118 - 20) * k];
  const slip = 10 * Math.sin((t - a) * 9) * sm((t - a - 0.4) / 0.3);
  const hx = 880 + slip, gy = 1470, s = 3.1;
  const f = fig({ hip: [0, -84], shoulder: [-30, -138], head: [-38, -156], elbow: [2, -116], hand: [28, -102], elbow2: [-2, -114], hand2: [24, -106], knee: [20, -44], ankle: [38, -6], heel: [33, 0], toe: [51, 0], knee2: [-12, -46], ankle2: [-16, -6], heel2: [-21, 0], toe2: [-3, 0] });
  // Er schaut nach links (flip): lokales x wird gespiegelt
  const hand: P = [hx - 28 * s, gy - 102 * s];
  return (
    <g>
      <Arena t={0} speed={0} y={1460} top={0} />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="dt-l" nod={4 + 1.5 * Math.sin(t * 14)} />
      <path d={`M${head[0]} ${head[1]} Q${(head[0] + hand[0]) / 2} ${Math.max(head[1], hand[1]) + 6} ${hand[0]} ${hand[1]}`} stroke="#C0392B" strokeWidth="9" fill="none" />
      <Him t={t} x={hx} y={gy} s={s} f={f} flip dirt={0.85} mood="worried" />
      {t >= a + 0.6 && <T x={330} y={760} size={44} font={FONT_BODY} weight={800} color={COL.inkSoft} italic>*chew chew*</T>}
      {[0, 1].map((i) => <path key={i} d={`M${hx + 60 + i * 30} ${gy - 600 - i * 30} q14 -10 0 -24`} stroke={COL.inkSoft} strokeWidth="5" fill="none" opacity={0.5 + 0.5 * Math.sin(t * 8 + i)} />)}
      <Meme lines={["She said he's", "easy to handle."]} y={250} />
    </g>
  );
}

/* ---------- 5 · Schabracken ---------- */
const BEIGES: Array<[string, string]> = [["#E8DCC4", "ecru"], ["#DCCBAA", "sand"], ["#E3D5B8", "oat"], ["#D6C3A1", "latte"], ["#EADFCB", "cream"], ["#CDB898", "taupe"], ["#E0CFAF", "biscuit"], ["#D9C9AE", "almond"], ["#E6D8BD", "linen"], ["#D2BE9C", "camel-ish"], ["#E4D2B3", "nude"], ["#DDCDB0", "beige (?)"]];
function Pads({ t }: { t: number }) {
  const a = S("06");
  const n = Math.min(BEIGES.length, 4 + Math.floor(Math.max(0, t - a - 0.2) / 0.16));
  const s = 3.2, x = 300, gy = 1480;
  const wob = Math.sin(t * 7) * Math.min(6, n * 0.5);
  const f = fig({ shoulder: [2, -148], head: [6, -166], elbow: [16, -124], hand: [28, -104], elbow2: [12, -122], hand2: [24, -100] });
  const baseY = gy - 100 * s, px = x + 20 * s, pw = 110;
  const last = n - 1;
  return (
    <g>
      <rect x={0} y={0} width={W} height={1920} fill="#B48A62" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 95} y={0} width={6} height={1920} fill="#9C734D" />)}
      {[[760, 760], [920, 900]].map(([x1, y1], i) => <g key={i}><rect x={x1} y={y1} width={110} height={18} rx={6} fill="#6E5240" /><path d={`M${x1 + 10} ${y1 + 18} q40 90 90 0`} stroke="#5E4636" strokeWidth="8" fill="none" /></g>)}
      <rect x={0} y={1480} width={W} height={440} fill="#8C6B4E" />
      <Him t={t} x={x} y={gy} s={s} f={f} dirt={0.85} mood={n > 9 ? "dizzy" : "confused"} />
      <g transform={`rotate(${wob} ${px + pw * s * 0.5} ${baseY})`}>
        {BEIGES.slice(0, n).map(([c], i) => {
          const drop = i === last ? 1 - ease((t - a - 0.2 - (i - 4) * 0.16) / 0.14) : 0;
          return <rect key={i} x={px} y={baseY - (i + 1) * 9 * s - drop * 300} width={pw * s * 0.6} height={9 * s} rx={10} fill={c} stroke="#A99674" strokeWidth="3" />;
        })}
      </g>
      {/* Ihr Arm reicht von rechts nach */}
      <g transform={`translate(${lerp(1200, 900, ease((t - a) / 0.3))} ${baseY - (n + 1) * 9 * s})`}>
        <path d="M0 0 L-160 10" stroke="#D8C3A0" strokeWidth="38" strokeLinecap="round" />
        <circle cx={-170} cy={10} r={20} fill="#E8AE86" />
      </g>
      {BEIGES.slice(4, n).map(([, name], i) => <T key={name} x={880} y={1000 + i * 60} size={44} font={FONT_BODY} weight={800} color={PAPER} anchor="middle">{name}</T>)}
      <Meme lines={["Learning 47 shades of beige."]} y={260} />
    </g>
  );
}

/* ---------- 6 · Nachts im Auto ---------- */
function Car({ t }: { t: number }) {
  const a = S("07");
  const later = t >= S("08") - 0.1;
  const sink = sm((t - a) / (E("08") - a)) * 70;
  const clock = later ? "00:12" : "21:07";
  return (
    <g>
      <rect x={0} y={0} width={W} height={1920} fill="#1C2436" />
      {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 173) % 1080} cy={520 + ((i * 97) % 500)} r={2 + (i % 2)} fill="#F4EFE2" opacity={0.4 + 0.4 * Math.sin(t * 3 + i)} />)}
      <circle cx={880} cy={640} r={50} fill="#F4EFE2" opacity=".85" />
      <rect x={640} y={960} width={440} height={420} fill="#2B3448" /><path d="M620 970 L860 840 L1100 970 Z" fill="#232B3C" />
      <rect x={760} y={1120} width={150} height={260} fill="#F2C26A" /><path d="M760 1380 L690 1520 L980 1520 L910 1380 Z" fill="#F2C26A" opacity=".25" />
      <rect x={0} y={1380} width={W} height={540} fill="#262D3B" />
      {/* Auto */}
      <path d="M90 1460 Q100 1290 250 1270 L330 1160 Q360 1130 420 1130 L640 1130 Q700 1130 730 1170 L800 1270 Q900 1290 900 1400 L900 1460 Z" fill="#7A8794" stroke="#4A5562" strokeWidth="6" />
      <defs><clipPath id="dt-win"><path d="M270 1270 L345 1170 Q365 1150 420 1150 L630 1150 Q680 1150 705 1180 L770 1270 Z" /></clipPath></defs>
      <path d="M270 1270 L345 1170 Q365 1150 420 1150 L630 1150 Q680 1150 705 1180 L770 1270 Z" fill="#30405A" />
      <g clipPath="url(#dt-win)">
        <rect x={480} y={1170 + sink} width={70} height={110} rx={10} fill="#BFE0FF" opacity=".9" />
        <Face t={t} x={560} y={1235 + sink} r={70} kind="laie" mood={later ? "dizzy" : "forced"} look={-0.5} a={-1} />
        <rect x={270} y={1150} width={500} height={130} fill="#BFD3E6" opacity={0.18 + 0.15 * sm((t - a) / 2)} />
      </g>
      <circle cx={260} cy={1460} r={64} fill="#1E1C1A" /><circle cx={260} cy={1460} r={24} fill="#8A8F96" />
      <circle cx={740} cy={1460} r={64} fill="#1E1C1A" /><circle cx={740} cy={1460} r={24} fill="#8A8F96" />
      <rect x={110} y={600} width={260} height={110} rx={18} fill="#0E1320" stroke="#3A4A66" strokeWidth="4" />
      <T x={240} y={680} size={70} font={FONT_BODY} weight={900} color={later ? "#FF6A5A" : "#7FE0C2"}>{clock}</T>
      {later && <g transform={`translate(540 860) rotate(-4) scale(${Math.max(0.01, back((t - S("08") + 0.1) / 0.3))})`}><rect x={-260} y={-60} width={520} height={100} rx={14} fill="#E5392E" /><T x={0} y={8} size={56} font={FONT_BODY} weight={900} color={PAPER}>3 HOURS LATER</T></g>}
      <Meme lines={["She said she'd", "be 5 minutes."]} y={250} />
    </g>
  );
}

/* ---------- 7 · Sein Liebling ---------- */
function Fav({ t }: { t: number }) {
  const a = S("09");
  const z = lerp(4.6, 5.4, sm((t - a) / 1.6));
  const pl: Place = { x: 600 - (330 - 70) * z, y: 1080 - (80 - 20) * z, k: z };
  return (
    <g>
      <rect x={0} y={0} width={W} height={1920} fill="#F3E3C8" />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="dt-f" nod={-4 + 3 * Math.sin(t * 3)} blink={t > a + 1.2 && t < a + 1.35 ? 1 : 0} />
      {[0, 1, 2, 3, 4].map((i) => { const u = ((t - a) * 0.8 + i / 5) % 1; return <path key={i} transform={`translate(${720 + 120 * Math.sin(i * 2)} ${1000 - 400 * u}) scale(1.6)`} d="M0 6 C-14 -8 -6 -20 0 -10 C6 -20 14 -8 0 6 Z" fill="#E0605A" opacity={Math.sin(u * Math.PI)} />; })}
      <g>
        <circle cx={200} cy={1490} r={120} fill={PAPER} />
        <Face t={t} x={200} y={1490} r={105} kind="reiter" mood="smile" look={0.6} a={a + 0.3} />
        <circle cx={880} cy={1490} r={120} fill={PAPER} />
        <Face t={t} x={880} y={1490} r={105} kind="laie" mood="forced" look={-0.6} a={a + 0.5} />
        {t >= a + 0.5 && [[840, 1450], [915, 1530], [870, 1545]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={11} fill="#6E5240" opacity=".8" />)}
        <T x={200} y={1650} size={30} font={FONT_BODY} weight={800} color={COL.inkSoft}>her</T>
        <T x={880} y={1650} size={30} font={FONT_BODY} weight={800} color={COL.inkSoft}>him</T>
      </g>
      <Meme lines={["And somehow this guy", "is still her favorite."]} y={250} size={60} />
      {t >= S("10") && (
        <g opacity={ease((t - S("10")) / 0.3)}>
          <path d="M760 420 Q860 470 850 600" stroke="#E5392E" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M824 580 L850 612 L874 576" stroke="#E5392E" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </g>
  );
}

export function renderDating(t: number) {
  const cuts = [S("03") - 0.25, S("04") - 0.1, S("05") - 0.1, S("06") - 0.1, S("07") - 0.1, S("09") - 0.1];
  let body: ReactNode;
  if (t < cuts[0]) body = <Dream t={t} />;
  else if (t < cuts[1]) body = <Mud t={t} />;
  else if (t < cuts[2]) body = <Hay t={t} />;
  else if (t < cuts[3]) body = <Lead t={t} />;
  else if (t < cuts[4]) body = <Pads t={t} />;
  else if (t < cuts[5]) body = <Car t={t} />;
  else body = <Fav t={t} />;
  // Plattenkratzer-Standbild: 2 Frames weiß blitzen
  const flash = t >= cuts[0] && t < cuts[0] + 0.07;
  return <Frame t={t} cuts={cuts}>{body}{flash && <rect x={0} y={0} width={W} height={1920} fill="#FFFFFF" opacity=".75" />}</Frame>;
}
export function renderDatingCover() {
  return (
    <Frame t={0.2} cuts={[]}>
      <g transform="translate(0 0)"><Pads t={S("06") + 1.6} /></g>
    </Frame>
  );
}
