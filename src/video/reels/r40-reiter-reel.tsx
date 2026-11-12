import type { ReactNode } from "react";
import { AnimHorse } from "@/components/illustrations/akademie/AnimHorse";
import { COL, FONT_BODY, NodHorse, PAPER, Phone, Pop, T, W, H, back, ease, lerp, sm, win } from "./nov-kit";
import { LOOK_S, LOOK_T, LOOK_TO, Mark, TopBahn, along, type Bahn } from "./n2-kit";
import { LOOKS, TopHorse } from "./top";
import { FigureScene } from "./rl/Figure";
import type { Pose } from "./rl/kinematics";
import C from "./reiter40-cues.json";

/* Reel „Reiter in 40 Sekunden erklärt“ (comp `reiter40`, 9:16, 12.11.2026) – Reichweiten-/Share-Reel.
   Ohne Sprecher: Humor über Timing, große Typo, harte Schnitte (Blitz + Zoom-Punch), SFX + Musik
   aus scripts/video/n2/sfx_reiter40.py (liest dieselben Zeiten aus reiter40-cues.json).
   Keine Produktwerbung – Marke nur ganz am Ende klein. */

export const R40_TOTAL = C.total;

const CUTS = [C.s1, C.s1cut, C.s2, C.s2cut, C.s3, C.s3cut, C.s4, C.s4cut, C.s5, C.s5cut, C.s6, C.s6b, C.s6c, C.s6d, C.s7, C.s7cut, C.s8, C.fin];
const SCENES = [C.s1, C.s2, C.s3, C.s4, C.s5, C.s6, C.s7, C.s8, C.fin];

/* ---------- kleine Helfer ---------- */
const pop = (t: number, a: number, d = 0.3) => back((t - a) / d);
/** Großer Satz, schnappt von groß auf normal ein (Snap statt weichem Einblenden) */
function Big({ t, a, b = 999, lines, y, size = 84, col = COL.forestDeep, font, weight = 800, gap, shake = 0, italic }: { t: number; a: number; b?: number; lines: string[]; y: number; size?: number; col?: string; font?: string; weight?: number; gap?: number; shake?: number; italic?: boolean }) {
  if (t < a || t > b) return null;
  const u = (t - a) / 0.18;
  const k = u < 1 ? 1.22 - 0.22 * sm(u) : 1;
  const sx = shake * Math.sin(t * 90) * Math.max(0, 1 - (t - a) / 0.5);
  const g = gap ?? size * 1.12;
  const yc = y + ((lines.length - 1) * g) / 2;
  return (
    <g opacity={Math.min(1, u * 2.5)} transform={`translate(${540 + sx} ${yc}) scale(${k}) translate(-540 ${-yc})`}>
      {lines.map((l, i) => (
        <T key={i} x={540} y={y + i * g} size={Math.min(size, 980 / (l.length * 0.52))} color={col} font={font} weight={weight} italic={italic}>{l}</T>
      ))}
    </g>
  );
}

/* ---------- Hook: Stoppuhr ---------- */
function Stopwatch({ t, x, y, r }: { t: number; x: number; y: number; r: number }) {
  const s = Math.max(0, 40 - Math.floor(t * 6));
  const a = -Math.PI / 2 + ((40 - s) / 40) * Math.PI * 2;
  return (
    <g>
      <rect x={x - 26} y={y - r - 54} width={52} height={40} rx="10" fill={COL.forestDeep} />
      <circle cx={x} cy={y} r={r + 16} fill={COL.forest} />
      <circle cx={x} cy={y} r={r} fill={PAPER} />
      {Array.from({ length: 40 }, (_, i) => {
        const aa = (i / 40) * Math.PI * 2;
        return <path key={i} d={`M${x + Math.cos(aa) * (r - 10)} ${y + Math.sin(aa) * (r - 10)} L${x + Math.cos(aa) * (r - (i % 5 ? 24 : 38))} ${y + Math.sin(aa) * (r - (i % 5 ? 24 : 38))}`} stroke={COL.forestDeep} strokeWidth={i % 5 ? 4 : 8} strokeLinecap="round" />;
      })}
      <path d={`M${x} ${y} L${x + Math.cos(a) * (r - 46)} ${y + Math.sin(a) * (r - 46)}`} stroke={COL.rust} strokeWidth="12" strokeLinecap="round" />
      <circle cx={x} cy={y} r="16" fill={COL.forestDeep} />
      <T x={x} y={y + r * 0.5} size={70} color={COL.forestDeep}>{`0:${String(s).padStart(2, "0")}`}</T>
    </g>
  );
}

/* ---------- Szene 1: Uhr ---------- */
function Clock({ min, x, y, r }: { min: number; x: number; y: number; r: number }) {
  const ha = ((min / 60) % 12) / 12 * Math.PI * 2 - Math.PI / 2;
  const ma = ((min % 60) / 60) * Math.PI * 2 - Math.PI / 2;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 16} fill={COL.forest} />
      <circle cx={x} cy={y} r={r} fill={PAPER} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <path key={i} d={`M${x + Math.cos(a) * (r - 12)} ${y + Math.sin(a) * (r - 12)} L${x + Math.cos(a) * (r - (i % 3 ? 34 : 52))} ${y + Math.sin(a) * (r - (i % 3 ? 34 : 52))}`} stroke={COL.forestDeep} strokeWidth={i % 3 ? 6 : 10} strokeLinecap="round" />;
      })}
      <path d={`M${x} ${y} L${x + Math.cos(ha) * r * 0.5} ${y + Math.sin(ha) * r * 0.5}`} stroke={COL.forestDeep} strokeWidth="18" strokeLinecap="round" />
      <path d={`M${x} ${y} L${x + Math.cos(ma) * (r - 60)} ${y + Math.sin(ma) * (r - 60)}`} stroke={COL.rust} strokeWidth="11" strokeLinecap="round" />
      <circle cx={x} cy={y} r="20" fill={COL.forestDeep} />
    </g>
  );
}
const hhmm = (min: number) => `${Math.floor(min / 60) % 24}:${String(Math.floor(min % 60)).padStart(2, "0")}`;

function Scene1({ t }: { t: number }) {
  const spin = sm((t - C.s1cut) / 0.35);
  const min = lerp(14 * 60, 20 * 60 + 17, spin) + (t < C.s1cut ? (t - C.s1) * 0.4 : 0);
  const after = t >= C.s1cut;
  return (
    <g>
      <Big t={t} a={C.s1} b={C.s1cut - 0.01} lines={["„Ich bin nur", "2 Stunden im Stall.“"]} y={330} size={82} />
      <Clock min={min} x={540} y={980} r={300} />
      <g>
        <rect x={340} y={1360} width={400} height={120} rx="60" fill={after ? COL.rust : COL.forestDeep} />
        <T x={540} y={1442} size={76} font={FONT_BODY} weight={900} color={PAPER}>{hhmm(min)}</T>
      </g>
      {after && <Big t={t} a={C.s1cut + 0.15} lines={["6 Stunden später."]} y={380} size={104} col={COL.rust} shake={10} />}
      {after && <Pop t={t} a={C.s1cut + 0.6} x={540} y={1580} text="„nur kurz die Hufe auskratzen“" fill={COL.honey} color={COL.forestDeep} size={34} />}
    </g>
  );
}

/* ---------- Szene 2: voller Spind → Warenkorb ---------- */
function Locker({ t }: { t: number }) {
  const cols = [COL.forest, COL.rust, COL.honey, "#5E7360", COL.brown, "#8FA3B8", COL.rust, COL.forest, "#C98AA0", COL.honey, "#5E7360", COL.brownDeep];
  const bounce = Math.sin(t * 22) * 4 * Math.max(0, 1 - (t - C.s2 - 0.4) / 0.6);
  return (
    <g>
      <rect x={250} y={640} width={580} height={860} rx="22" fill={COL.brown} />
      <rect x={272} y={662} width={536} height={816} rx="12" fill={COL.brownDeep} />
      {[0, 1, 2].map((s) => <rect key={s} x={272} y={880 + s * 220} width={536} height={14} fill={COL.brown} />)}
      {/* gestapelte Schabracken */}
      {cols.map((c, i) => {
        const shelf = Math.floor(i / 4);
        const j = i % 4;
        const yy = 862 + shelf * 220 - j * 38 + (j === 3 ? bounce : 0);
        return <rect key={i} x={300 + (i % 2) * 14} y={yy - 34} width={470} height={36} rx="14" fill={c} stroke="#00000022" strokeWidth="3" />;
      })}
      {/* Halfter am Haken + Tür halb auf */}
      <path d="M560 1240 q-90 40 -60 150 q70 40 140 0 q30 -110 -60 -150" fill="none" stroke={COL.rust} strokeWidth="14" />
      <path d="M560 1240 q-90 40 -60 150 q70 40 140 0 q30 -110 -60 -150" fill="none" stroke={COL.honey} strokeWidth="5" strokeDasharray="10 14" />
      <path d="M830 640 L960 700 L960 1460 L830 1500 Z" fill={COL.brown} opacity=".9" />
      <Pop t={t} a={C.s2 + 0.5} x={540} y={1600} text="Spind: voll." fill={COL.forestDeep} size={36} />
    </g>
  );
}
const CART: Array<[string, string, string]> = [
  ["Halfter", "29,95 €", COL.rust],
  ["Schabracke", "54,95 €", "#5E7360"],
  ["Leckerlis", "9,95 €", COL.honey],
  ["Fliegenhaube", "34,95 €", "#8FA3B8"],
];
function Cart({ t }: { t: number }) {
  const X = 300, Y = 560;
  const a0 = C.s2cut + 0.15;
  const n = Math.min(4, Math.max(0, Math.floor((t - a0) / 0.3) + 1));
  const sum = [0, 29.95, 84.9, 94.85, 129.8][n];
  const ding = t > a0 + 1.25;
  return (
    <Phone x={X - 20} y={Y - 30} w={540} id="r40c">
      <g transform={`translate(${X - 4} ${Y - 14})`}>
        <rect width={508} height={150} fill={COL.forest} />
        <T x={254} y={98} size={46} color={PAPER}>{`Warenkorb (${n})`}</T>
        {CART.slice(0, n).map(([name, price, c], i) => {
          const k = pop(t, a0 + i * 0.3, 0.25);
          return (
            <g key={name} opacity={Math.min(1, k)} transform={`translate(0 ${190 + i * 150}) scale(1 ${Math.max(0.01, Math.min(1.1, k))})`}>
              <rect x={24} y={0} width={460} height={124} rx="22" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
              <rect x={44} y={22} width={80} height={80} rx="16" fill={c} />
              <T x={144} y={74} size={31} anchor="start" font={FONT_BODY} weight={800} color={COL.forestDeep}>{name}</T>
              <T x={466} y={74} size={28} anchor="end" font={FONT_BODY} weight={700} color={COL.inkSoft}>{price}</T>
            </g>
          );
        })}
        <rect x={24} y={820} width={460} height={4} fill={COL.sand} />
        <T x={44} y={890} size={40} anchor="start" font={FONT_BODY} weight={800} color={COL.forestDeep}>Summe</T>
        <g transform={ding ? `translate(466 878) scale(${1 + 0.25 * Math.max(0, 1 - (t - a0 - 1.25) / 0.3)}) translate(-466 -878)` : undefined}>
          <T x={466} y={892} size={52} anchor="end" color={ding ? COL.rust : COL.forestDeep}>{`${sum.toFixed(2).replace(".", ",")} €`}</T>
        </g>
        <rect x={24} y={940} width={460} height={88} rx="44" fill={ding ? COL.forest : COL.sand} />
        <T x={254} y={998} size={36} font={FONT_BODY} weight={800} color={PAPER}>{ding ? "Bestellt ✓" : "Jetzt kaufen"}</T>
      </g>
    </Phone>
  );
}
function Scene2({ t }: { t: number }) {
  if (t < C.s2cut) {
    return (
      <g>
        <Big t={t} a={C.s2} lines={["„Ich brauche wirklich", "nichts mehr fürs Pferd.“"]} y={330} size={78} />
        <Locker t={t} />
      </g>
    );
  }
  return (
    <g>
      <Big t={t} a={C.s2cut} b={C.s2b - 0.01} lines={["2 Minuten später:"]} y={330} size={70} col={COL.inkSoft} />
      <Cart t={t} />
      <Big t={t} a={C.s2b} lines={["„…aber die Farbe", "hatte ich noch nicht.“"]} y={300} size={76} col={COL.rust} />
    </g>
  );
}

/* ---------- Szene 3: Husten ---------- */
const BASE: Pose = {
  hip: [180, 133], tr: 0,
  l1: { th: 2, kn: 0, footAbs: 0 }, l2: { th: 2, kn: 0, footAbs: 0 },
  a1: { a: 10, el: 6 }, a2: { a: 10, el: 6 },
};
function coughK(t: number, at: number[]) {
  return Math.max(0, ...at.map((a) => (t >= a && t < a + 0.35 ? Math.sin(((t - a) / 0.35) * Math.PI) : 0)));
}
function Puff({ x, y, k, s = 1 }: { x: number; y: number; k: number; s?: number }) {
  if (k <= 0.02) return null;
  return (
    <g opacity={k} transform={`translate(${x} ${y}) scale(${s * (0.6 + 0.6 * k)})`}>
      <path d="M0 0 l38 -18 M4 10 l46 4 M0 20 l36 22" stroke={COL.inkSoft} strokeWidth="8" strokeLinecap="round" />
    </g>
  );
}
function Scene3({ t }: { t: number }) {
  if (t < C.s3cut) {
    const ck = [C.s3 + 0.1, C.s3cough2];
    const k = coughK(t, ck);
    const pose: Pose = { ...BASE, shUp: 3 * k, a1: { hand: [192, 64] }, neck: -6 * k };
    const KK = 4.4;
    return (
      <g>
        <ellipse cx={540} cy={1700} rx={360} ry={46} fill={COL.sandLight} />
        <g transform={`translate(${540 - 180 * KK} ${560 + 10 * k}) scale(${KK})`}>
          <FigureScene view="front" pose={pose} t={2} />
        </g>
        <Puff x={610} y={790} k={k} s={1.2} />
        {t > ck[0] && <Pop t={t} a={ck[0]} x={300} y={600} text="*hust*" fill={COL.sandLight} color={COL.inkSoft} size={36} o={win(t, ck[0], ck[1] + 0.3)} />}
        <Big t={t} a={C.s3wird} lines={["„Wird schon.“"]} y={360} size={100} />
      </g>
    );
  }
  const ca = C.s3cut + 0.3;
  const k = coughK(t, [ca]);
  const pl = { x: 540 - 165 * 3, y: 1080, k: 3 };
  const zoom = 1 + 0.12 * sm((t - ca) / 0.25);
  const subs = ["Tierarzt?", "Temperatur?", "Atemfrequenz?", "Seit wann?!"];
  return (
    <g>
      <g transform={`translate(540 1300) scale(${zoom}) translate(-540 -1300)`}>
        <rect x={0} y={1500} width={W} height={420} fill="#E3D3B4" />
        <NodHorse t={t} pl={pl} look={LOOK_T} id="r40h" nod={22 * k} reach={8 * k} />
        <Puff x={pl.x + (378 - 70) * 3} y={pl.y + (150 - 20) * 3} k={k} s={1.6} />
      </g>
      {t < C.s3big && t > ca && <Pop t={t} a={ca} x={820} y={1000} text="*hust*" fill={COL.sandLight} color={COL.inkSoft} size={34} />}
      <Big t={t} a={C.s3big} lines={["WAR DAS", "EIN HUSTEN?!"]} y={300} size={128} col={COL.rust} shake={14} />
      {subs.map((s, i) => (
        <Pop key={s} t={t} a={C.s3sub + i * 0.28} x={i % 2 ? 760 : 320} y={640 + i * 100} text={s} fill={COL.forestDeep} size={40} />
      ))}
    </g>
  );
}

/* ---------- Szene 4: „nur kurz Stall“ ---------- */
const TASKS = ["Misten", "Füttern", "Putzen", "Reiten", "Absatteln", "Pferd waschen", "Koppel", "Futter vorbereiten"];
function Scene4({ t }: { t: number }) {
  if (t < C.s4cut) {
    return (
      <g>
        <Big t={t} a={C.s4} lines={["„Heute mache ich", "nur kurz Stall.“"]} y={560} size={92} />
        <Pop t={t} a={C.s4 + 0.6} x={540} y={900} text="Plan: 30 Minuten" fill={COL.forest} size={44} />
      </g>
    );
  }
  const a0 = C.s4cut + 0.1;
  const step = (C.s4kurz - 0.2 - a0) / TASKS.length;
  const done = Math.min(TASKS.length, Math.max(0, Math.floor((t - a0) / step) + 1));
  const min = 15 * 60 + Math.min(1, (t - a0) / (step * TASKS.length)) * 412;
  const dim = sm((t - C.s4kurz) / 0.2);
  return (
    <g>
      <g opacity={1 - 0.92 * dim}>
        <rect x={720} y={190} width={280} height={100} rx="50" fill={COL.forestDeep} />
        <T x={860} y={262} size={60} font={FONT_BODY} weight={900} color={PAPER}>{hhmm(min)}</T>
        {TASKS.slice(0, done).map((s, i) => {
          const k = pop(t, a0 + i * step, 0.2);
          const y = 380 + i * 160;
          return (
            <g key={s} opacity={Math.min(1, k)} transform={`translate(540 ${y + 60}) scale(${Math.max(0.01, Math.min(1.08, k))}) translate(-540 ${-(y + 60)})`}>
              <rect x={120} y={y} width={840} height={124} rx="30" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
              <Mark x={200} y={y + 62} ok k={1} r={36} />
              <T x={268} y={y + 82} size={56} anchor="start" color={COL.forestDeep}>{s}</T>
            </g>
          );
        })}
      </g>
      {t >= C.s4kurz && (
        <g opacity={ease((t - C.s4kurz) / 0.25)}>
          <rect x={430} y={1000} width={220} height={90} rx="45" fill={COL.bg} /><T x={540} y={1062} size={60} italic color={COL.forestDeep}>kurz.</T>
        </g>
      )}
    </g>
  );
}

/* ---------- Szene 5: Reithose ---------- */
function Breeches({ spot }: { spot: number }) {
  return (
    <g>
      {/* Oberschenkel → Knie → Stiefel (Nahaufnahme, leicht schräg) */}
      <path d="M330 380 C 320 700 360 960 420 1120 L 640 1120 C 700 940 760 700 760 380 Z" fill="#EFE7D6" />
      <path d="M330 380 C 320 700 360 960 420 1120" fill="none" stroke="#D8CCB4" strokeWidth="6" />
      <path d="M545 380 C 548 700 540 950 530 1120" fill="none" stroke="#D8CCB4" strokeWidth="4" strokeDasharray="14 10" />
      {/* Kniebesatz */}
      <path d="M400 860 C 470 830 610 830 690 860 L 660 1110 L 430 1110 Z" fill={COL.sandLight} stroke="#D8CCB4" strokeWidth="4" />
      {/* Stiefel */}
      <path d="M405 1100 L 655 1100 L 690 1760 L 380 1760 Z" fill="#2E2621" />
      <path d="M395 1100 L 665 1100 L 668 1150 L 392 1150 Z" fill="#3B302A" />
      <rect x={300} y={330} width={480} height={70} rx="10" fill="#EFE7D6" />
      <rect x={300} y={330} width={480} height={18} fill="#D8CCB4" />
      {spot > 0 && <ellipse cx={600} cy={640} rx={7 * spot} ry={5 * spot} fill="#7A5A3A" transform="rotate(-20 600 640)" />}
    </g>
  );
}
function Scene5({ t }: { t: number }) {
  if (t < C.s5cut) {
    return (
      <g>
        <g transform="translate(140 420) scale(0.74)"><Breeches spot={0} /></g>
        <Big t={t} a={C.s5} lines={["„Meine Reithose kann", "ruhig dreckig werden.“"]} y={300} size={76} />
        <Pop t={t} a={C.s5 + 0.5} x={800} y={760} text="Reithose · neu ✨" fill={COL.honey} color={COL.forestDeep} size={40} />
      </g>
    );
  }
  const z = 1 + 2.4 * sm((t - C.s5spot) / 0.35);
  const dark = 0.45 * sm((t - C.s5spot - 0.2) / 0.3);
  const ringK = pop(t, C.s5spot + 0.3, 0.25);
  return (
    <g>
      <g transform={`translate(600 640) scale(${z}) translate(-600 -640)`}>
        <Breeches spot={t > C.s5spot ? 1 : 0} />
        {ringK > 0.01 && <circle cx={600} cy={640} r={22 * Math.min(1.1, ringK)} fill="none" stroke={COL.rust} strokeWidth="4" />}
      </g>
      <rect width={W} height={H} fill="#000" opacity={dark} />
      <Big t={t} a={C.s5no} lines={["NEIN."]} y={1500} size={230} col={COL.rust} shake={22} />
    </g>
  );
}

/* ---------- Szene 6: „eine letzte Runde“ ---------- */
const B6: Bahn = { x: 80, y: 760, m: 23 };
const track = (u: number): [number, number] => {
  const a = u * Math.PI * 2;
  const c = Math.cos(a), s = Math.sin(a);
  return [20 + 17.6 * Math.sign(c) * Math.pow(Math.abs(c), 0.3), 10 - 7.6 * Math.sign(s) * Math.pow(Math.abs(s), 0.3)];
};
function Scene6({ t }: { t: number }) {
  const lap = (t - C.s6) / 1.15;
  const u = ((lap % 1) + 1) % 1;
  const { p, ang } = along(B6, track, Math.min(0.996, Math.max(0.004, u)));
  const n = t < C.s6b ? 1 : t < C.s6c ? 2 : t < C.s6d ? 3 : 4;
  const lines: Array<[number, string[], string]> = [
    [C.s6, ["„Eine letzte Runde.“"], COL.forestDeep],
    [C.s6b, ["„Okay, noch eine.“"], COL.forestDeep],
    [C.s6c, ["„Die war nicht perfekt.“"], COL.forestDeep],
    [C.s6d, ["„JETZT eine letzte.“"], COL.rust],
  ];
  return (
    <g>
      <TopBahn b={B6}>
        <TopHorse at={p} ang={ang} look={LOOKS.tivoli} step={t * 1.6} s={2.6} />
      </TopBahn>
      {lines.map(([a, l, c], i) => (
        <Big key={i} t={t} a={a} b={(lines[i + 1]?.[0] ?? 99) - 0.01} lines={l} y={430} size={92} col={c} shake={i === 3 ? 10 : 0} />
      ))}
      <g transform={`translate(540 1420) scale(${1 + 0.18 * Math.max(0, 1 - (t - [C.s6, C.s6b, C.s6c, C.s6d][n - 1]) / 0.25)}) translate(-540 -1420)`}>
        <rect x={250} y={1340} width={580} height={120} rx="60" fill={n === 4 ? COL.rust : COL.forestDeep} />
        <T x={540} y={1420} size={54} font={FONT_BODY} weight={900} color={PAPER}>{`Letzte Runde Nr. ${n}`}</T>
      </g>
    </g>
  );
}

/* ---------- Szene 7: Wetter-App ---------- */
function Cloud({ x, y, s = 1, col = COL.sand }: { x: number; y: number; s?: number; col?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={col}>
      <circle cx={-40} cy={10} r={40} /><circle cx={10} cy={-14} r={54} /><circle cx={60} cy={14} r={38} />
      <rect x={-80} y={10} width={180} height={42} rx="21" />
    </g>
  );
}
function Weather({ t, rider }: { t: number; rider: boolean }) {
  const X = 300, Y = 560;
  const rows: Array<[string, string]> = [["Regen", "80 %"], ["Wind", "35 km/h"], ["Nachts", "3 °C"]];
  const hiA = C.s7cut + 0.15;
  const hi = (i: number) => (rider ? Math.max(0, Math.min(1, (t - (hiA + 0.3 + i * 0.3)) / 0.12)) : 0);
  const k0 = rider ? Math.max(0, Math.min(1, (t - hiA) / 0.12)) : 0;
  return (
    <Phone x={X - 20} y={Y - 30} w={540} id="r40w">
      <g transform={`translate(${X - 4} ${Y - 14})`}>
        <rect width={508} height={1050} fill="#E4EAE2" />
        <T x={254} y={120} size={38} font={FONT_BODY} weight={700} color={COL.inkSoft}>Morgen · am Hof</T>
        <Cloud x={190} y={240} s={1.1} col="#B9C2BB" />
        {Array.from({ length: 6 }, (_, i) => {
          const yy = 330 + (((t * 300 + i * 47) % 70));
          return <path key={i} d={`M${130 + i * 26} ${yy} l-8 22`} stroke="#6F8DA6" strokeWidth="6" strokeLinecap="round" />;
        })}
        <g transform={`translate(380 300) scale(${1 + 0.2 * k0 * Math.max(0, 1 - (t - hiA) / 0.4)})`}>
          <T x={0} y={40} size={150} color={k0 > 0.5 ? COL.rust : COL.forestDeep}>8°</T>
        </g>
        {rows.map(([a, b], i) => {
          const h = hi(i);
          return (
            <g key={a}>
              <rect x={30} y={520 + i * 150} width={448} height={124} rx="26" fill={h > 0.5 ? COL.rust : PAPER} />
              <T x={60} y={600 + i * 150} size={42} anchor="start" font={FONT_BODY} weight={800} color={h > 0.5 ? PAPER : COL.forestDeep}>{a}</T>
              <T x={450} y={600 + i * 150} size={42} anchor="end" font={FONT_BODY} weight={800} color={h > 0.5 ? PAPER : COL.inkSoft}>{b}</T>
            </g>
          );
        })}
      </g>
    </Phone>
  );
}
function Thought({ t, a, x, y, text, tail }: { t: number; a: number; x: number; y: number; text: string; tail: -1 | 1 }) {
  const k = pop(t, a, 0.28);
  if (k <= 0.01) return null;
  const w = text.length * 26 + 80;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)})`}>
      <circle cx={tail * (w / 2 - 10)} cy={64} r={14} fill={PAPER} stroke={COL.forest} strokeWidth="4" />
      <circle cx={tail * (w / 2 + 14)} cy={92} r={8} fill={PAPER} stroke={COL.forest} strokeWidth="4" />
      <rect x={-w / 2} y={-50} width={w} height={100} rx="50" fill={PAPER} stroke={COL.forest} strokeWidth="5" />
      <T x={0} y={16} size={46} color={COL.forestDeep}>{text}</T>
    </g>
  );
}
function Scene7({ t }: { t: number }) {
  const rider = t >= C.s7cut;
  const th: Array<[string, number, number, -1 | 1]> = [["Decke?", 230, 640, 1], ["Keine Decke?", 830, 760, -1], ["100 g?", 220, 1180, 1], ["Ist ihm warm?", 820, 1300, -1], ["Ist ihm kalt?", 300, 1600, 1]];
  return (
    <g>
      <g transform={`translate(540 1080) scale(${rider ? 0.92 : 1}) translate(-540 -1080)`}>
        <Weather t={t} rider={rider} />
      </g>
      {!rider ? (
        <g>
          <Big t={t} a={C.s7} lines={["Normale Menschen:"]} y={250} size={64} col={COL.inkSoft} />
          <Big t={t} a={C.s7 + 0.35} lines={["„Was ziehe ich morgen an?“"]} y={360} size={70} />
        </g>
      ) : (
        <g>
          <Big t={t} a={C.s7cut} lines={["Reiter:"]} y={250} size={70} col={COL.rust} />
          <Big t={t} a={C.s7cut + 0.2} lines={["„8 °C … Regen … Wind …", "nachts 3 °C …“"]} y={350} size={58} />
          {th.map(([s, x, y, tl], i) => <Thought key={s} t={t} a={C.s7th + i * C.s7step} x={x} y={y} text={s} tail={tl} />)}
        </g>
      )}
    </g>
  );
}

/* ---------- Szene 8: Fotogalerie ---------- */
type Kind = "full" | "nase" | "essen" | "unscharf" | "hinten";
const KINDS: Kind[] = ["full", "nase", "full", "essen", "hinten", "full", "unscharf", "nase", "full", "essen", "full", "hinten", "nase", "full", "unscharf", "full", "essen", "nase", "full", "hinten", "full", "full", "nase", "essen"];
const LOOKS3 = [LOOK_T, LOOK_TO, LOOK_S];
function Tile({ t, kind, i, x, y, s }: { t: number; kind: Kind; i: number; x: number; y: number; s: number }) {
  const look = LOOKS3[i % 3];
  const vb = kind === "nase" ? "290 50 120 120" : kind === "hinten" ? "60 40 190 190" : "70 30 320 292";
  const bgc = ["#DDE3D6", "#E8DCC4", "#E4EAE2"][i % 3];
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} fill={bgc} />
      <svg x={x} y={y} width={s} height={s} viewBox={vb} preserveAspectRatio="xMidYMid slice">
        {kind === "unscharf" && <defs><filter id={`r40b${i}`}><feGaussianBlur stdDeviation="9" /></filter></defs>}
        <g filter={kind === "unscharf" ? `url(#r40b${i})` : undefined} transform={kind === "essen" ? "rotate(18 284 110)" : undefined}>
          <AnimHorse look={look} gait="stand" time={t + i} />
        </g>
      </svg>
    </g>
  );
}
function Scene8({ t }: { t: number }) {
  const X = 296, Y = 546, s = 120, g = 4;
  const fill = Math.floor((t - C.s8 - 0.1) / 0.03);
  const count = Math.round(lerp(18000, 18436, sm((t - C.s8) / 0.7)));
  const labels = ["Pferd.", "Pferd.", "Pferdenase.", "Pferd beim Essen.", "Pferd unscharf.", "Pferd von hinten."];
  const li = Math.min(labels.length - 1, Math.floor((t - C.s8lab) / 0.3));
  return (
    <g>
      <Phone x={X - 16} y={Y - 16} w={540} id="r40g">
        <g>
          <rect x={X} y={Y} width={508} height={1075} fill={PAPER} />
          <T x={X + 28} y={Y + 80} size={44} anchor="start" color={COL.forestDeep}>Fotos</T>
          <T x={X + 480} y={Y + 80} size={30} anchor="end" font={FONT_BODY} weight={700} color={COL.inkSoft}>{count.toLocaleString("de-DE")}</T>
          {KINDS.map((k, i) => (i < fill ? <Tile key={i} t={t} kind={k} i={i} x={X + 8 + (i % 4) * (s + g)} y={Y + 120 + Math.floor(i / 4) * (s + g)} s={s} /> : null))}
        </g>
      </Phone>
      <Big t={t} a={C.s8} lines={[`Fotos: ${count.toLocaleString("de-DE")}`]} y={300} size={86} />
      <Pop t={t} a={C.s8 + 0.6} x={540} y={430} text="davon Pferd: 17.900" fill={COL.rust} size={44} />
      {t >= C.s8lab && (
        <g key={li}>
          <Big t={t} a={C.s8lab + li * 0.3} lines={[labels[li]]} y={1800} size={li > 1 ? 70 : 86} col={COL.forestDeep} />
        </g>
      )}
    </g>
  );
}

/* ---------- Finale ---------- */
function Final({ t }: { t: number }) {
  const peek = sm((t - C.fin3) / 0.5);
  const pl = { x: lerp(-1100, -640, peek), y: 1180, k: 3.2 };
  const share = ease((t - C.cta) / 0.35);
  return (
    <g>
      <rect x={0} y={1640} width={W} height={280} fill="#E3D3B4" />
      {peek > 0 && <NodHorse t={t} pl={pl} look={LOOK_T} id="r40f" nod={-6 + 6 * Math.sin(t * 2)} blink={t % 3 < 0.12 ? 1 : 0} />}
      <Big t={t} a={C.fin} lines={["Reiter."]} y={560} size={190} />
      <Big t={t} a={C.fin2} lines={["Völlig normale Menschen."]} y={700} size={64} col={COL.inkSoft} font={FONT_BODY} weight={800} />
      <Big t={t} a={C.fin3} lines={["…nur mit Pferd."]} y={880} size={104} col={COL.rust} />
      {share > 0 && (
        <g opacity={share} transform={`translate(0 ${(1 - share) * 30})`}>
          <rect x={300} y={1010} width={700} height={150} rx="40" fill={COL.forest} />
          <path d="M360 1105 l70 -30 l-70 -30 l14 30 Z" fill={COL.honey} />
          <T x={670} y={1072} size={36} font={FONT_BODY} weight={800} color={PAPER}>Schick das dem Reiter,</T>
          <T x={670} y={1122} size={36} font={FONT_BODY} weight={800} color={COL.honey}>der GENAU so ist.</T>
        </g>
      )}
      <g opacity={ease((t - C.brand) / 0.4)}>
        <T x={540} y={1840} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>Hofgeschichten – Reiten endlich verstehen.</T>
      </g>
    </g>
  );
}

/* ---------- Hook ---------- */
function Hook({ t }: { t: number }) {
  return (
    <g>
      <Stopwatch t={t} x={540} y={1100} r={300} />
      <g>
        <T x={540} y={330} size={104}>Reiter in</T>
        <T x={540} y={450} size={104} color={COL.rust}>40 Sekunden</T>
        <T x={540} y={570} size={104}>erklärt.</T>
      </g>
      <Pop t={t} a={0.55} x={540} y={720} text="Für alle Nicht-Reiter." fill={COL.forestDeep} size={40} />
    </g>
  );
}

function Progress({ t }: { t: number }) {
  if (t < C.s1 || t >= C.fin) return null;
  const i = SCENES.findIndex((s, j) => t >= s && t < SCENES[j + 1]);
  const u = (t - C.s1) / (C.fin - C.s1);
  return (
    <g>
      <rect x={0} y={0} width={W} height={14} fill={COL.sandLight} />
      <rect x={0} y={0} width={W * u} height={14} fill={COL.honey} />
      <rect x={880} y={60} width={150} height={64} rx="32" fill={COL.forestDeep} opacity=".9" />
      <T x={955} y={104} size={34} font={FONT_BODY} weight={800} color={PAPER}>{`${i + 1}/8`}</T>
    </g>
  );
}

export function renderR40(t: number) {
  const last = [0, ...CUTS].filter((c) => c <= t).pop() ?? 0;
  const punch = last > 0 ? 1 + 0.06 * (1 - ease((t - last) / 0.3)) : 1;
  const flash = last > 0 ? Math.max(0, 1 - (t - last) / 0.1) : 0;
  let scene: ReactNode;
  if (t < C.s1) scene = <Hook t={t} />;
  else if (t < C.s2) scene = <Scene1 t={t} />;
  else if (t < C.s3) scene = <Scene2 t={t} />;
  else if (t < C.s4) scene = <Scene3 t={t} />;
  else if (t < C.s5) scene = <Scene4 t={t} />;
  else if (t < C.s6) scene = <Scene5 t={t} />;
  else if (t < C.s7) scene = <Scene6 t={t} />;
  else if (t < C.s8) scene = <Scene7 t={t} />;
  else if (t < C.fin) scene = <Scene8 t={t} />;
  else scene = <Final t={t} />;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g transform={`translate(540 960) scale(${punch}) translate(-540 -960)`}>{scene}</g>
      <Progress t={t} />
      {flash > 0 && <rect width={W} height={H} fill={PAPER} opacity={flash * 0.75} />}
    </svg>
  );
}
