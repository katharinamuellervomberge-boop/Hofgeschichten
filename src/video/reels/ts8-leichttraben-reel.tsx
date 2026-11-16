import type { ReactNode } from "react";
import { legPhase } from "@/components/illustrations/akademie/AnimHorse";
import { BIT, SITZ } from "@/components/illustrations/akademie/geometry";
import { leichttraben, riderBody, riseAmount } from "../leichttraben";
import { timeline } from "../kit";
import { COL, FONT_BODY, NodHorse, PAPER, T, back, ease, headPoint, hs, lerp, sm, type Place } from "./nov-kit";
import { LOOK_T, Ride, Stamp } from "./n2-kit";
import { Arena, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, BrandLine, Face, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./leichttraben-lines.json";

/* Tagesset 02 · Reel 04 „Warum stehen Reiter beim Traben auf?“ (comp `leichttraben`, 16.11.2026) – Riding 101.
   Trab = Zweitakt mit diagonalen Beinpaaren (HL+VR grün, HR+VL honig). Leichttraben über `RidingHorse posting`
   (Aufstehen einmal pro Trabzyklus, wie im Akademie-Lernvideo). Kniebeugen-Gag klar als ✗ markiert. Aussitzen gleichwertig.
   Schluss: echter Ausschnitt aus dem Akademie-Lernvideo „Leichttraben – so geht’s!“. */

const { S, E, total } = vo(LJ as VoLines);
export const LT_TOTAL = total;

const NOD = 10;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
const RS: RideState = { nod: NOD, reach: 0, hand: SITZ.hand, rein: REIN };
const V: Place = { x: 540 - 160 * 2.6, y: 1390 - 285 * 2.6, k: 2.6 };
const PAIR_A = COL.forest; // HL + VR
const PAIR_B = COL.honey; // HR + VL

function Posting({ t, pl = V, posting = true, id = "lt-r", ground = true }: { t: number; pl?: Place; posting?: boolean; id?: string; ground?: boolean }) {
  return (
    <g>
      {ground && <Arena t={t} speed={groundSpeed("trab", pl.k)} y={pl.y + 285 * pl.k} top={560} />}
      <RidingHorse t={t} pl={pl} look={LOOK_T} gait="trab" id={id} s={RS} posting={posting} />
    </g>
  );
}
/** ↑/↓ am Becken der Reiterin, passend zum Aufstehen */
function UpDown({ t, pl = V, o = 1 }: { t: number; pl?: Place; o?: number }) {
  if (o <= 0.01) return null;
  const info = rideInfo(t, "trab", RS, true);
  const hip = hs(pl, [info.body.hip[0] - 28, info.body.hip[1] + info.bob]);
  const up = riseAmount(t + 0.02) > riseAmount(t);
  const col = up ? COL.forest : COL.rust;
  const dir = up ? -1 : 1;
  return (
    <g opacity={o} stroke={col} strokeWidth="10" strokeLinecap="round" fill="none">
      <path d={`M${hip[0]} ${hip[1] - dir * 40} V${hip[1] + dir * 40}`} />
      <path d={`M${hip[0] - 20} ${hip[1] + dir * 18} L${hip[0]} ${hip[1] + dir * 42} L${hip[0] + 20} ${hip[1] + dir * 18}`} />
    </g>
  );
}

/* ---------- Szenen ---------- */
function Hook({ t }: { t: number }) {
  return (
    <g>
      <Big t={t} a={0} lines={["WARUM MACHT", "MAN DAS?"]} y={300} size={110} />
      <Posting t={t} />
      <UpDown t={t} o={sm((t - 0.8) / 0.3)} />
    </g>
  );
}
function Squats({ t }: { t: number }) {
  // übertrieben: zu hoch, zu schnell, aus dem Takt – ausdrücklich ✗
  const u = 0.5 + 0.5 * Math.sin(t * 9);
  const b = riderBody(-0.2 + 1.9 * u);
  return (
    <g>
      <Big t={t} a={S("02") - 0.1} lines={["KNIEBEUGEN", "AUF DEM PFERD?"]} y={300} size={96} col={COL.rust} />
      <Arena t={t} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={560} />
      <Ride t={t} pl={V} gait="trab" id="lt-sq" b={b} look={LOOK_T} nod={NOD} />
      <Face t={t} x={880} y={640} r={90} kind="laie" mood="what" />
      <Stamp t={t} a={S("02") + 1.0} x={540} y={1560} text="SO NICHT 😅" size={72} />
    </g>
  );
}
function System({ t }: { t: number }) {
  const beat = (t * 1.25) % 1;
  return (
    <g>
      <rect width={1080} height={1920} fill={COL.forestDeep} />
      <Big t={t} a={S("03") - 0.1} lines={["Dahinter steckt", "ein System."]} y={760} size={104} col={COL.sandLight} />
      {[0, 1].map((i) => (
        <circle key={i} cx={460 + i * 160} cy={1120} r={44 * (Math.floor(beat * 2) === i ? 1.25 : 1)} fill={i ? COL.honey : COL.forest} stroke={PAPER} strokeWidth="5" />
      ))}
    </g>
  );
}
function landPulse(leg: "VR" | "VL", t: number) {
  const { p } = legPhase("trab", leg, t);
  return Math.exp(-p * 1.6 * 5);
}
function Trot({ t }: { t: number }) {
  const k = 2.7;
  const pl: Place = { x: 540 - 160 * k, y: 1360 - 285 * k, k };
  const hl = { HL: PAIR_A, VR: PAIR_A, HR: PAIR_B, VL: PAIR_B };
  const pA = landPulse("VR", t), pB = landPulse("VL", t);
  return (
    <g>
      <Big t={t} a={S("04") - 0.1} lines={["Im Trab: immer", "zwei Beine zusammen"]} y={280} size={84} />
      <Arena t={t} speed={groundSpeed("trab", k)} y={1360} top={560} />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="trab" id="lt-t" nod={NOD} highlight={hl} />
      <g transform="translate(540 1530)">
        <g transform={`translate(-150 0) scale(${1 + 0.35 * pA})`}><circle r="66" fill={PAIR_A} /><T x={0} y={28} size={80} color={PAPER}>1</T></g>
        <g transform={`translate(150 0) scale(${1 + 0.35 * pB})`}><circle r="66" fill={PAIR_B} /><T x={0} y={28} size={80} color={PAPER}>2</T></g>
      </g>
      {t >= S("05") - 0.1 && t < S("06") - 0.1 && <Big t={t} a={S("05") - 0.1} lines={["schräg gegenüber"]} y={1720} size={64} col={COL.forest} />}
      {t >= S("06") - 0.1 && <Big t={t} a={S("06") - 0.1} lines={["TRAB = ZWEITAKT"]} y={1720} size={86} col={COL.rust} />}
    </g>
  );
}
function Post({ t }: { t: number }) {
  const up = riseAmount(t + 0.02) > riseAmount(t);
  const words = ["09", "10", "11", "12"];
  const wi = words.filter((id) => t >= S(id) - 0.05).length - 1;
  let head: ReactNode;
  if (t < S("09") - 0.1) head = <Big t={t} a={S("07") - 0.1} lines={["Leichttraben:"]} y={260} size={92} />;
  else if (t < S("13") - 0.1) head = <T x={540} y={360} size={170} color={wi % 2 === 0 ? COL.forest : COL.rust}>{wi % 2 === 0 ? "AUF" : "AB"}</T>;
  else head = <Big t={t} a={S("13") - 0.1} lines={["Immer im Rhythmus", "des Pferdes"]} y={260} size={86} col={COL.forest} />;
  return (
    <g>
      {head}
      <Posting t={t} />
      <UpDown t={t} />
      {t < S("09") - 0.1 && (
        <g>
          <rect x={190} y={1480} width={700} height={130} rx="65" fill={up ? COL.forest : COL.rust} />
          <T x={540} y={1566} size={60} color={PAPER}>{up ? "Takt 1: kurz aufstehen" : "Takt 2: weich hinsetzen"}</T>
        </g>
      )}
      {t >= S("13") - 0.1 && (
        <g transform="translate(540 1560)">
          {[0, 1].map((i) => {
            const pulse = landPulse(i ? "VL" : "VR", t);
            return <g key={i} transform={`translate(${(i - 0.5) * 300} 0) scale(${1 + 0.3 * pulse})`}><circle r="56" fill={i ? PAIR_B : PAIR_A} /><T x={0} y={22} size={46} font={FONT_BODY} weight={900} color={PAPER}>{i ? "AB" : "AUF"}</T></g>;
          })}
        </g>
      )}
    </g>
  );
}
function Comfort({ t }: { t: number }) {
  const info = rideInfo(t, "trab", RS, true);
  const back1 = hs(V, [160, 118 + info.bob]);
  return (
    <g>
      <Big t={t} a={S("14") - 0.1} lines={["Nicht jeden Tritt", "aussitzen"]} y={280} size={88} />
      <Posting t={t} />
      {t >= S("15") - 0.1 && (
        <g>
          <circle cx={back1[0]} cy={back1[1]} r={70 + 8 * Math.sin(t * 6)} fill="none" stroke={COL.forest} strokeWidth="8" opacity={ease((t - S("15")) / 0.3)} />
          <g opacity={ease((t - S("15")) / 0.3)}>
            <rect x={150} y={1480} width={780} height={110} rx="55" fill={COL.forest} />
            <T x={540} y={1552} size={48} color={PAPER}>oft angenehmer für dich</T>
          </g>
          <g opacity={ease((t - S("15") - 1.6) / 0.3)}>
            <rect x={110} y={1620} width={860} height={110} rx="55" fill={COL.honey} />
            <T x={540} y={1692} size={44} color={COL.forestDeep}>… und meist auch für den Pferderücken</T>
          </g>
        </g>
      )}
    </g>
  );
}
function Both({ t }: { t: number }) {
  const k = 1.75;
  const plL: Place = { x: 270 - 225 * k, y: 1270 - 285 * k, k };
  const plR: Place = { x: 810 - 225 * k, y: 1270 - 285 * k, k };
  const both = t >= S("19") - 0.1;
  return (
    <g>
      {!both ? <Big t={t} a={S("16") - 0.1} lines={["Aber: keine Pflicht!"]} y={300} size={90} col={COL.rust} /> : <Big t={t} a={S("19") - 0.1} lines={["BEIDES GIBT ES."]} y={300} size={110} col={COL.forest} />}
      <defs>
        <clipPath id="lt-cl"><rect x={20} y={620} width={510} height={780} rx="36" /></clipPath>
        <clipPath id="lt-cr"><rect x={550} y={620} width={510} height={780} rx="36" /></clipPath>
      </defs>
      <g clipPath="url(#lt-cl)">
        <rect x={20} y={620} width={510} height={780} fill={COL.bg} />
        <g transform="translate(-270 0)"><Arena t={t} speed={groundSpeed("trab", k)} y={1270} top={620} /></g>
        <RidingHorse t={t} pl={plL} look={LOOK_T} gait="trab" id="lt-bl" s={RS} posting />
      </g>
      <g clipPath="url(#lt-cr)">
        <rect x={550} y={620} width={510} height={780} fill={COL.bg} />
        <g transform="translate(270 0)"><Arena t={t} speed={groundSpeed("trab", k)} y={1270} top={620} /></g>
        <RidingHorse t={t} pl={plR} look={LOOK_T} gait="trab" id="lt-br" s={RS} />
      </g>
      <rect x={20} y={620} width={510} height={780} rx="36" fill="none" stroke={COL.forest} strokeWidth="6" />
      <rect x={550} y={620} width={510} height={780} rx="36" fill="none" stroke={COL.honey} strokeWidth="6" />
      <T x={275} y={1480} size={54} color={COL.forest}>Leichttraben</T>
      <T x={805} y={1480} size={54} color={COL.brownDeep}>Aussitzen</T>
      <T x={275} y={1540} size={32} font={FONT_BODY} weight={800} color={COL.inkSoft}>auf – ab im Takt</T>
      <T x={805} y={1540} size={32} font={FONT_BODY} weight={800} color={COL.inkSoft}>sitzen bleiben, mitschwingen</T>
      {both && [0, 1].map((i) => (
        <g key={i} transform={`translate(${275 + i * 530} 1640) scale(${back((t - S("19") - i * 0.15) / 0.3)})`}>
          <circle r="44" fill={COL.forest} />
          <T x={0} y={17} size={50} font={FONT_BODY} color={PAPER}>✓</T>
        </g>
      ))}
    </g>
  );
}
const TL = timeline(leichttraben);
function Akademie({ t }: { t: number }) {
  const a = S("20");
  const vt = TL.start("auf") + Math.max(0, t - a);
  const y = lerp(1960, 620, ease((t - a + 0.1) / 0.6));
  const fin = E("20") - 0.3;
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Reiten lernen.", "Endlich verstehen."]} y={260} size={86} />
      <rect x={40} y={y - 30} width={1000} height={622} rx="40" fill={COL.forestDeep} />
      <svg x={60} y={y - 10} width={960} height={540} viewBox="0 0 1280 720">
        <rect width={1280} height={720} fill={PAPER} />
        {leichttraben.render(vt, TL)}
      </svg>
      <T x={540} y={y + 650} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>Lernvideo aus der Akademie: „Leichttraben – so geht’s!“</T>
      {t >= fin && (
        <g opacity={Math.min(1, back((t - fin) / 0.4))}>
          <rect x={90} y={1440} width={900} height={210} rx="44" fill={COL.forest} />
          <T x={540} y={1530} size={52} color={PAPER}>Hofgeschichten Reitakademie</T>
          <T x={540} y={1604} size={44} font={FONT_BODY} weight={800} color={COL.honey}>einmalig 29,90 €</T>
        </g>
      )}
      <BrandLine t={t} a={fin + 0.4} text="Link in der Bio" />
    </g>
  );
}

export function renderLeichttraben(t: number) {
  const cuts = [S("02") - 0.12, S("03") - 0.12, S("04") - 0.12, S("07") - 0.12, S("14") - 0.12, S("16") - 0.12, S("20") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Squats t={t} />;
  else if (t < cuts[2]) body = <System t={t} />;
  else if (t < cuts[3]) body = <Trot t={t} />;
  else if (t < cuts[4]) body = <Post t={t} />;
  else if (t < cuts[5]) body = <Comfort t={t} />;
  else if (t < cuts[6]) body = <Both t={t} />;
  else body = <Akademie t={t} />;
  return <Frame t={t} cuts={cuts}>{body}</Frame>;
}
