import type { ReactNode } from "react";
import { COL, FONT_BODY, PAPER, T, back, ease, lerp, sm } from "./nov-kit";
import { LOOK_T, Ride, Stamp, TopBahn, V_SIDE, bx, by, pose, type Bahn } from "./n2-kit";
import { Arena, groundSpeed } from "./rs-kit";
import { LOOKS, TopHorse, type Pt } from "./top";
import { Big, BrandLine, Face, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./phasen-lines.json";

/* Tagesset 02 · Reel 01 „Die 5 Phasen einer Reitstunde“ (comp `phasen`, 16.11.2026) – Funny, Naturdoku-Ton.
   Roter Faden: Stimmungskurve oben (Achterbahn), pro Phase ein Stück. Ende = Anfangsbild (Loop). */

const { S, E, total } = vo(LJ as VoLines);
export const PHASEN_TOTAL = total;

const PH = ["02", "06", "10", "14", "19", "24"] as const; // Phasenstarts, letzter = Loop
const PHS = PH.map((id) => S(id) - 0.12);
const MOOD = [0.5, 0.92, 0.32, 0.04, 0.78, 1.35];
const NAMES = ["Selbstüberschätzung", "Realität", "Existenzkrise", "Der perfekte Moment", "Größenwahn"];

/* ---------- Stimmungskurve ---------- */
function Curve({ t }: { t: number }) {
  const x0 = 110, x1 = 970, yTop = 150, yBot = 300;
  const px = (i: number) => lerp(x0, x1, i / 5);
  const py = (v: number) => yBot - v * (yBot - yTop);
  const loop = t >= PHS[5];
  // Fortschritt in Phasen-Einheiten
  let prog = 0;
  for (let i = 0; i < 5; i++) prog += sm((t - PHS[i]) / Math.max(0.6, Math.min(1.6, (PHS[i + 1] - PHS[i]) * 0.5)));
  const pts: string[] = [];
  const n = Math.floor(prog * 24);
  for (let j = 0; j <= n; j++) {
    const u = j / 24;
    const i = Math.min(4, Math.floor(u));
    const f = u - i;
    const v = lerp(MOOD[i], MOOD[i + 1], 0.5 - 0.5 * Math.cos(Math.PI * f));
    pts.push(`${px(u).toFixed(1)},${Math.max(40, py(v)).toFixed(1)}`);
  }
  const head = pts.length ? pts[pts.length - 1].split(",").map(Number) : [px(0), py(MOOD[0])];
  const fade = loop ? 1 - sm((t - PHS[5]) / 0.4) : 1;
  return (
    <g>
      <rect x={70} y={120} width={940} height={210} rx="30" fill={PAPER} opacity=".75" />
      <T x={100} y={160} size={24} font={FONT_BODY} weight={800} color={COL.inkSoft} anchor="start">STIMMUNG</T>
      {[1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={px(i - 0.5)} y1={308} x2={px(i - 0.5)} y2={318} stroke={COL.sandLight} strokeWidth="4" />
          <T x={px(i - 0.5)} y={312 + 4} size={22} font={FONT_BODY} weight={900} color={t >= PHS[i - 1] && !loop ? COL.rust : COL.sand}>{String(i)}</T>
        </g>
      ))}
      <g opacity={fade}>
        {pts.length > 1 && <path d={"M" + pts.join(" L")} fill="none" stroke={COL.rust} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />}
        <circle cx={head[0]} cy={head[1]} r="13" fill={COL.rust} />
      </g>
      {loop && <circle cx={px(0)} cy={py(MOOD[0])} r={13 * back((t - PHS[5] - 0.2) / 0.3)} fill={COL.rust} />}
    </g>
  );
}

function PhaseTitle({ t, i }: { t: number; i: number }) {
  return <Big t={t} a={PHS[i]} lines={[`Phase ${i + 1}:`, NAMES[i]]} y={440} size={78} col={i === 3 ? COL.honey : COL.forestDeep} />;
}

/* ---------- Szenen ---------- */
const GROUND = 1390;
function SideRide({ t, gait = "schritt", b, slow = 1, pl = V_SIDE }: { t: number; gait?: "schritt" | "trab"; b?: ReturnType<typeof pose>; slow?: number; pl?: typeof V_SIDE }) {
  const tt = t * slow;
  return (
    <g>
      <Arena t={tt} speed={groundSpeed(gait, pl.k)} y={GROUND} top={640} />
      <Ride t={tt} pl={pl} gait={gait} id="ph-r" b={b ?? pose({})} look={LOOK_T} />
    </g>
  );
}
function Hook({ t, loop = false }: { t: number; loop?: boolean }) {
  return (
    <g>
      {!loop && <Big t={t} a={0} lines={["DIE 5 PHASEN", "EINER REITSTUNDE"]} y={440} size={96} />}
      {loop && (
        <g>
          <Big t={t} a={PHS[5]} lines={["Nächste Reitstunde:"]} y={440} size={70} />
          {t >= S("25") - 0.1 && <Big t={t} a={S("25") - 0.1} lines={["PHASE 1."]} y={560} size={110} col={COL.rust} shake={5} />}
        </g>
      )}
      <SideRide t={t} b={pose({ lean: -3 })} />
    </g>
  );
}
function P1({ t }: { t: number }) {
  const sure = t >= S("05") - 0.1;
  return (
    <g>
      <PhaseTitle t={t} i={0} />
      <SideRide t={t} b={pose({ lean: -5 })} />
      {sure && (
        <g>
          <Big t={t} a={S("05") - 0.1} lines={["„HEUTE WIRD’S", "RICHTIG GUT.“"]} y={1560} size={76} col={COL.forest} />
          {[0, 1, 2, 3].map((i) => <Spark key={i} t={t} x={[180, 900, 260, 820][i]} y={[1500, 1480, 1700, 1690][i]} a={S("05") + i * 0.15} />)}
        </g>
      )}
    </g>
  );
}
const BB: Bahn = { x: 80, y: 650, m: 23 };
function P2({ t }: { t: number }) {
  // Plan: gerade von links nach rechts durch die Mitte. Realität: Pferd schwankt immer stärker weg, Richtung Tür (A).
  const a = PHS[1] + 0.3;
  const u = Math.max(0, t - a);
  const path = (q: number): Pt => {
    const x = 6 + q * 3.2;
    const amp = Math.min(6.5, 0.4 + q * 0.9);
    const drift = q > 4.2 ? (q - 4.2) * 2.4 : 0;
    return [x - drift * 1.4, 10 + amp * Math.sin(q * 1.9) + drift];
  };
  const pts: string[] = [];
  for (let q = 0; q <= u; q += 0.05) { const p = path(q); pts.push(`${bx(BB, p[0]).toFixed(1)},${by(BB, Math.min(19, p[1])).toFixed(1)}`); }
  const p = path(u), p2 = path(u + 0.05);
  const ang = (Math.atan2(p2[1] - p[1], p2[0] - p[0]) * 180) / Math.PI;
  return (
    <g>
      <PhaseTitle t={t} i={1} />
      <TopBahn b={BB} letters={false}>
        <path d={`M${bx(BB, 6)} ${by(BB, 10)} L${bx(BB, 35)} ${by(BB, 10)}`} stroke={COL.forest} strokeWidth="10" strokeDasharray="22 14" strokeLinecap="round" />
        <path d={`M${bx(BB, 33.5)} ${by(BB, 8.3)} L${bx(BB, 35.6)} ${by(BB, 10)} L${bx(BB, 33.5)} ${by(BB, 11.7)}`} stroke={COL.forest} strokeWidth="10" fill="none" strokeLinecap="round" />
        {pts.length > 1 && <path d={"M" + pts.join(" L")} fill="none" stroke={COL.rust} strokeWidth="9" strokeLinecap="round" />}
        <TopHorse at={[bx(BB, p[0]), by(BB, Math.min(19, p[1]))]} ang={ang} look={LOOKS.tivoli} step={t * 1.2} s={2.0} />
      </TopBahn>
      <g opacity={ease((t - S("08") + 0.1) / 0.3)}>
        <T x={300} y={1240} size={50} color={COL.forest}>PLAN</T>
        <T x={540} y={1240} size={44} font={FONT_BODY} weight={900} color={COL.inkSoft}>vs.</T>
        <T x={790} y={1240} size={50} color={COL.rust}>REALITÄT</T>
      </g>
      {t >= S("09") - 0.1 && <Stamp t={t} a={S("09") - 0.05} x={540} y={1450} text="NICHT DA, WO DU WILLST" size={56} />}
    </g>
  );
}
function P3({ t }: { t: number }) {
  const qs = ["Kann ich überhaupt reiten?", "Warum mache ich das?", "Soll ich Tennis spielen?"];
  const a = S("13");
  const step = Math.max(0.6, (E("13") - a) / 3);
  return (
    <g>
      <PhaseTitle t={t} i={2} />
      <Face t={t} x={540} y={900} r={200} kind="reiter" mood={t >= a ? "worried" : "confused"} />
      {t >= S("12") - 0.05 && <Stamp t={t} a={S("12") - 0.05} x={540} y={1230} text="12 JAHRE REITERFAHRUNG" size={50} col={COL.forestDeep} />}
      {qs.map((q, i) => {
        const k = back((t - a - i * step) / 0.3);
        if (k <= 0.01) return null;
        const y = 1370 + i * 130;
        const w = q.length * 27 + 100;
        const x = 540 + (i % 2 ? 60 : -60);
        return (
          <g key={q} opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, Math.min(1, k))}) rotate(${i % 2 ? 2 : -2})`}>
            <rect x={-w / 2} y={-46} width={w} height={86} rx="43" fill={i === 2 ? COL.rust : COL.forestDeep} />
            <T x={0} y={15} size={46} font={FONT_BODY} weight={800} color={PAPER}>{q}</T>
          </g>
        );
      })}
    </g>
  );
}
function Spark({ t, x, y, a, s = 1 }: { t: number; x: number; y: number; a: number; s?: number }) {
  const k = back((t - a) / 0.3);
  if (k <= 0.01) return null;
  const tw = 0.8 + 0.25 * Math.sin((t - a) * 9 + x);
  const r = 34 * s * Math.min(1, k) * tw;
  return <path transform={`translate(${x} ${y}) rotate(${(t - a) * 60})`} d={`M0 ${-r} Q${r * 0.18} ${-r * 0.18} ${r} 0 Q${r * 0.18} ${r * 0.18} 0 ${r} Q${-r * 0.18} ${r * 0.18} ${-r} 0 Q${-r * 0.18} ${-r * 0.18} 0 ${-r}Z`} fill={COL.honey} />;
}
function P4({ t }: { t: number }) {
  const a = S("16");
  const n = Math.min(3, Math.floor(Math.max(0, t - a - 0.2) / Math.max(0.55, (E("16") - a) / 3)) + (t >= a + 0.2 ? 1 : 0));
  const three = t >= S("17") - 0.05;
  const sense = t >= S("18") - 0.1;
  const zoom = 1 + 0.18 * sm((t - a) / 1.5);
  const pl = { x: 540 - (160 - 0) * 2.6 * zoom, y: GROUND - 285 * 2.6 * zoom + 40 * (zoom - 1), k: 2.6 * zoom };
  return (
    <g>
      <PhaseTitle t={t} i={3} />
      <SideRide t={t} gait="trab" slow={t >= a ? 0.45 : 1} pl={pl} />
      {t >= a && [0, 1, 2, 3, 4, 5].map((i) => <Spark key={i} t={t} x={[150, 930, 220, 880, 120, 960][i]} y={[760, 800, 1060, 1100, 1300, 1320][i]} a={a + i * 0.2} s={0.8 + (i % 3) * 0.2} />)}
      {t >= a && !three && (
        <g>
          {[1, 2, 3].map((i) => (
            <g key={i} opacity={n >= i ? 1 : 0.25} transform={`translate(${340 + (i - 1) * 200} 1560) scale(${n === i ? 1.15 : 1})`}>
              <circle r="62" fill={n >= i ? COL.honey : COL.sandLight} />
              <T x={0} y={26} size={76} color={COL.forestDeep}>{String(i)}</T>
            </g>
          ))}
        </g>
      )}
      {three && !sense && <Big t={t} a={S("17") - 0.05} lines={["3 PERFEKTE", "TRITTE"]} y={1520} size={110} col={COL.honey} shake={8} />}
      {sense && (
        <g>
          <Big t={t} a={S("18") - 0.1} lines={["Das Leben", "ergibt Sinn."]} y={1520} size={86} col={COL.forest} />
        </g>
      )}
    </g>
  );
}
function P5({ t }: { t: number }) {
  const rise = back((t - PHS[4] - 0.2) / 0.5);
  const oly = t >= S("23") - 0.1;
  const blocks = [
    { x: 200, h: 220, n: "2", c: COL.sand },
    { x: 540, h: 330, n: "1", c: COL.honey },
    { x: 880, h: 160, n: "3", c: "#C08A63" },
  ];
  const baseY = 1500;
  const k = 1.75;
  const pl = { x: 540 - 165 * k, y: baseY - 330 - 285 * k + 14, k };
  return (
    <g>
      <PhaseTitle t={t} i={4} />
      {t >= S("21") - 0.1 && t < S("23") - 0.1 && (
        <g opacity={ease((t - S("22") + 0.1) / 0.3)}>
          <rect x={110} y={1590} width={860} height={110} rx="55" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
          <T x={540} y={1660} size={40} font={FONT_BODY} weight={800} italic color={COL.inkSoft}>„… wenn wir jetzt konsequent trainieren …“</T>
        </g>
      )}
      {oly && <Big t={t} a={S("23") - 0.1} lines={["OLYMPIA 2032?"]} y={640} size={120} col={COL.rust} shake={6} />}
      <g transform={`translate(0 ${(1 - Math.min(1, rise)) * 500})`}>
        {blocks.map((b) => (
          <g key={b.n}>
            <rect x={b.x - 160} y={baseY - b.h} width={320} height={b.h} rx="14" fill={b.c} />
            <T x={b.x} y={baseY - b.h + 110} size={100} color={PAPER}>{b.n}</T>
          </g>
        ))}
        <Ride t={t} pl={pl} gait="stand" id="ph-pod" b={pose({ lean: -6 })} look={LOOK_T} />
        {t >= S("22") && (
          <g transform={`translate(${pl.x + (200 - 70) * k} ${pl.y + (78 - 20) * k}) scale(${0.55 * back((t - S("22")) / 0.4)})`}>
            <path d="M-34 -110 L0 -40 L34 -110" stroke={COL.rust} strokeWidth="16" fill="none" />
            <circle r="46" fill={COL.honey} stroke="#B0843E" strokeWidth="6" />
            <T x={0} y={18} size={48} color={COL.forestDeep}>1</T>
          </g>
        )}
      </g>
      <rect x={0} y={baseY} width={1080} height={420} fill="#E3D3B4" />
      {oly && [0, 1, 2, 3, 4].map((i) => <Spark key={i} t={t} x={[140, 940, 300, 780, 540][i]} y={[1620, 1600, 1760, 1750, 1680][i]} a={S("23") + i * 0.1} />)}
    </g>
  );
}

export function renderPhasen(t: number) {
  const i = PHS.filter((s) => s <= t).length - 1;
  let body: ReactNode;
  if (i < 0) body = <Hook t={t} />;
  else if (i === 0) body = <P1 t={t} />;
  else if (i === 1) body = <P2 t={t} />;
  else if (i === 2) body = <P3 t={t} />;
  else if (i === 3) body = <P4 t={t} />;
  else if (i === 4) body = <P5 t={t} />;
  else body = <Hook t={t} loop />;
  const cuts = [...PHS, S("17") - 0.05];
  return (
    <Frame t={t} cuts={cuts}>
      {body}
      <Curve t={t} />
      {t >= E("25") + 0.2 && (
        <g opacity={ease((t - E("25") - 0.2) / 0.3)}>
          <rect x={80} y={1560} width={920} height={160} rx="40" fill={COL.forestDeep} />
          <T x={540} y={1626} size={36} font={FONT_BODY} weight={800} color={PAPER}>Markier deine Stallfreundin, die nach</T>
          <T x={540} y={1678} size={36} font={FONT_BODY} weight={800} color={COL.honey}>drei guten Tritten Olympia plant 👇</T>
        </g>
      )}
      <BrandLine t={t} a={E("25") + 0.5} text="Hofgeschichten" />
    </Frame>
  );
}
