import type { ReactNode } from "react";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { COL, Caption, FONT_BODY, PAPER, Pop, T, back, ease, headPoint, hs, lerp, sm, type Place, type VLine } from "./nov-kit";
import { Stamp } from "./n2-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, Bubble, Face, Frame, vo, type VoLines } from "./viral-kit";
import { ArrowL, Tag } from "./hg1-haenger-reel";
import { AkCTA, Mark2, Ring } from "./t3-kit";
import LJ from "./kneten-lines.json";

/* Tagesset 03 · Reel 2 „Zügel kneten?! Was soll das eigentlich bedeuten?“ (comp `kneten`, 18.11.2026), Jessica v4 ×1,15.
   Fachlich: halbe Parade = kurzes Zusammenwirken von Gewicht (Körpermitte), Schenkel (treibt weiter) und Zügel (annehmen → nachgeben).
   „Schwämmchen drücken“ = Lernbild für ein kurzes, feines Schließen der Finger aus ruhiger, getragener Hand – kein Dauerkneten, kein Ziehen.
   Neu: Hand-Nahaufnahme (Faust seitlich, Daumen als Dach, Finger schließen/öffnen) + Zügelspannungs-Kurve. Rest: Bestand. */

const { S, E, total } = vo(LJ as VoLines);
export const KNETEN_TOTAL = total;

const TEXT: Record<string, string> = {
  "01": "Zügel kneten?", "02": "Schwämmchen drücken?", "03": "Was sollst du da eigentlich machen?!",
  "04": "Dahinter steckt meistens eine feine Zügelhilfe,", "05": "oft als Teil einer halben Parade.",
  "06": "Viele drücken dauerhaft am Zügel oder ziehen immer wieder.", "07": "Besser:",
  "08": "Deine Hand bleibt ruhig und getragen.", "09": "Nur die Finger schließen sich kurz, als würdest du einen kleinen Schwamm drücken.",
  "10": "Und dann gibst du sofort wieder nach.", "11": "Aber:", "12": "Eine halbe Parade machst du nie nur mit der Hand.",
  "13": "Du spannst kurz deine Körpermitte an, dein Bein treibt weiter –", "14": "die Hand kommt nur dazu.",
  "15": "Der häufigste Fehler?", "16": "Die Hand zieht nach hinten – und dein Pferd hält eher dagegen.",
  "17": "Du willst Reiten endlich so erklärt bekommen, dass du es wirklich verstehst?", "18": "Dann entdecke die Reitakademie von Hofgeschichten.",
};
const CAP: VLine[] = Object.entries((LJ as VoLines).lines).map(([id, [a, b]]) => ({ id, text: TEXT[id], start: a, dur: b - a }));

/* ---------- Hand-Zustand über die Zeit ---------- */
const MID6 = (S("06") + E("06")) / 2;
const PULSE = [S("09") + 0.75, S("10") - 0.05];
function pulse(t: number) {
  return Math.max(...PULSE.map((c) => sm((t - c) / 0.18) - sm((t - c - 0.45) / 0.25)));
}
function handState(t: number) {
  if (t < MID6) return { close: 1, back: 0.12, tension: 0.92 + 0.03 * Math.sin(t * 9) };
  if (t < S("07") - 0.12) {
    const b = 0.5 * (1 - Math.cos((2 * Math.PI * (t - MID6)) / 0.7));
    return { close: 0.9, back: b, tension: 0.42 + 0.5 * b };
  }
  const p = pulse(t);
  const give = t >= S("10") + 0.35 ? -0.12 * sm((t - S("10") - 0.35) / 0.3) * (1 - sm((t - S("10") - 1.3) / 0.4)) : 0;
  return { close: 0.22 + 0.63 * p, back: give, tension: Math.max(0.12, 0.28 + 0.42 * p + give * 1.2) };
}

const SKIN = "#E8AE86", SKIN_D = "#C98E68";
/** Faust seitlich (Blick von außen), Zügel kommt von rechts (Pferdemaul) und läuft durch die Faust, Daumen liegt als Dach oben */
function HandZoom({ t, wrong }: { t: number; wrong: boolean }) {
  const st = handState(t);
  const dx = -70 * st.back;
  const c = st.close;
  const tight = st.tension > 0.6;
  const rc = tight ? COL.rust : LEATHER;
  const ry = 1150; // Zügel Richtung Pferdemaul
  const sag = 60 * Math.max(0, 0.7 - st.tension);
  const entry: P = [600 + dx, 1105];
  return (
    <g transform="translate(560 1080) scale(1.22) translate(-520 -1000)">
      {/* Zügel zum Pferdemaul */}
      <path d={`M${entry[0]} ${entry[1]} Q${(entry[0] + 1080) / 2} ${ry + sag + 10} 1100 ${ry}`} fill="none" stroke={rc} strokeWidth={tight ? 22 : 18} strokeLinecap="round" />
      {tight && <path d={`M${entry[0]} ${entry[1]} Q${(entry[0] + 1080) / 2} ${ry + sag + 10} 1100 ${ry}`} fill="none" stroke={COL.rust} strokeWidth={40} opacity=".2" strokeLinecap="round" />}
      <T x={800} y={ry - 40} size={26} font={FONT_BODY} weight={800} color={COL.inkSoft}>→ Pferdemaul</T>
      <g transform={`translate(${dx} 0)`}>
        {/* Unterarm + Ärmel */}
        <path d="M-60 1330 L400 1020" stroke={COL.forest} strokeWidth="170" strokeLinecap="round" />
        {/* loses Zügelende hinter der Hand */}
        <path d="M470 880 Q400 900 405 1010" fill="none" stroke={LEATHER} strokeWidth="18" strokeLinecap="round" />
        {/* Handrücken / Handfläche */}
        <rect x={380} y={890} width={190} height={230} rx={70} fill={SKIN} stroke={SKIN_D} strokeWidth="5" />
        {/* Zügel in der Faust */}
        <path d={`M${600} 1110 L${595} 905 Q590 870 520 872`} fill="none" stroke={rc} strokeWidth="18" strokeLinecap="round" />
        {/* Finger: Haken um den Zügel, Spitzen gehen beim Schließen zur Handfläche */}
        {[0, 1, 2, 3].map((i) => {
          const y = 905 + i * 52;
          const open = 1 - c;
          const tip = 600 - 70 * c + 26 * open;
          const out = 630 + 46 * open;
          return (
            <path key={i} d={`M540 ${y} L${out - 20} ${y} Q${out + 16} ${y} ${out + 16} ${y + 23} Q${out + 16} ${y + 46} ${out - 20} ${y + 46} L${tip} ${y + 46}`}
              fill={SKIN} stroke={SKIN_D} strokeWidth="5" strokeLinejoin="round" />
          );
        })}
        {/* Daumen als Dach */}
        <path d="M430 900 Q470 840 560 862 Q600 872 596 892 Q560 900 470 912 Z" fill={SKIN} stroke={SKIN_D} strokeWidth="5" />
        {/* Druckpfeile beim Schließen */}
        {c > 0.55 && [0, 1].map((i) => (
          <path key={i} d={`M${700 + 30 * (1 - c)} ${950 + i * 110} l-34 0 m12 -12 l-12 12 l12 12`} stroke={wrong ? COL.rust : COL.forest} strokeWidth="7" fill="none" strokeLinecap="round" opacity={Math.min(1, (c - 0.55) * 3)} />
        ))}
      </g>
      {/* Schwamm */}
      {!wrong && (
        <g transform={`translate(790 790) scale(${1 - 0.38 * c * 0.9 + 0.1} ${1 + 0.12 * c})`} opacity={ease((t - S("09")) / 0.3)}>
          <rect x={-80} y={-48} width={160} height={96} rx={26} fill="#E9C46A" stroke="#B88F35" strokeWidth="5" />
          {[[-40, -14], [8, 10], [40, -20], [-14, 22], [52, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8} fill="#C9A24C" />)}
        </g>
      )}
    </g>
  );
}
/** Zügelspannung der letzten 3 s */
function Graph({ t, a }: { t: number; a: number }) {
  const x0 = 140, x1 = 940, y0 = 560, h = 110;
  const pts: string[] = [];
  for (let i = 0; i <= 90; i++) {
    const tt = t - 3 + (3 * i) / 90;
    if (tt < a) continue;
    pts.push(`${lerp(x0, x1, i / 90).toFixed(1)},${(y0 + h - handState(tt).tension * h).toFixed(1)}`);
  }
  return (
    <g>
      <rect x={x0 - 20} y={y0 - 50} width={x1 - x0 + 40} height={h + 70} rx={26} fill={PAPER} opacity=".92" />
      <T x={x0} y={y0 - 14} size={26} font={FONT_BODY} weight={800} color={COL.inkSoft} anchor="start">Zügelspannung</T>
      <path d={`M${x0} ${y0 + h} H${x1}`} stroke={COL.sand} strokeWidth="3" />
      {pts.length > 1 && <path d={"M" + pts.join(" L")} fill="none" stroke={handState(t).tension > 0.6 ? COL.rust : COL.forest} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />}
    </g>
  );
}

/* ---------- Pferd + Reiterin (wie `festhalten`) ---------- */
const LOOK = getHorse("tonga")!.look;
const NOD = 10;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
const V_FULL: Place = { x: 540 - 160 * 3.4, y: 1460 - 285 * 3.4, k: 3.4 };

/* ---------- Szenen ---------- */
function Hook({ t }: { t: number }) {
  const q = t >= S("03") - 0.1;
  return (
    <g>
      {!q ? (
        <g>
          <Big t={t} a={0} lines={["Zügel kneten?"]} y={210} size={110} />
          <Big t={t} a={S("02") - 0.05} lines={["Schwämmchen drücken?"]} y={350} size={86} col={COL.rust} />
        </g>
      ) : (
        <Big t={t} a={S("03") - 0.1} lines={["Was sollst du da", "eigentlich machen?!"]} y={230} size={92} col={COL.rust} shake={6} />
      )}
      <Face t={t} x={270} y={760} r={130} kind="trainer" mood="neutral" label="Reitlehrerin" />
      <Face t={t} x={810} y={760} r={130} kind="reiter" mood={q ? "what" : "confused"} label="Ich" look={-0.6} />
      <Bubble t={t} a={0.05} b={S("02") - 0.06} label="Reitlehrerin" lines={["„ZÜGEL KNETEN!“"]} y={1020} size={70} fill={COL.forest} />
      <Bubble t={t} a={S("02") - 0.05} label="Reitlehrerin" lines={["„SCHWÄMMCHEN", "DRÜCKEN!“"]} y={1020} size={66} fill={COL.forest} />
    </g>
  );
}
function Terms({ t }: { t: number }) {
  const a = S("04");
  const words: Array<[string, number, number]> = [["Zügel kneten", 300, 600], ["Schwämmchen drücken", 700, 720], ["Hand stehen lassen", 330, 840], ["halbe Parade", 760, 960]];
  const gather = sm((t - a - 1.3) / 0.5);
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Was gemeint ist"]} y={250} size={96} />
      {words.map(([w, x, y], i) => (
        <g key={w} opacity={1 - 0.6 * gather}>
          <Pop t={t} a={a + 0.1 + i * 0.22} x={lerp(x, 540, gather * 0.35)} y={y} text={w} fill={[COL.rust, COL.honey, COL.brown, COL.forest][i]} color={i === 1 ? COL.forestDeep : PAPER} size={40} />
        </g>
      ))}
      {gather > 0.01 && <ArrowL from={[540, 1030]} to={[540, 1030 + 90 * gather]} col={COL.forestDeep} w={12} head={30} o={gather} />}
      {gather > 0.01 && <Tag x={540} y={1210} text="= feine Zügelhilfe" size={56} fill={COL.forest} o={gather} />}
      {t >= S("05") && <Tag x={540} y={1360} text="oft Teil einer halben Parade" size={44} fill={COL.honey} color={COL.forestDeep} o={ease((t - S("05")) / 0.3)} />}
    </g>
  );
}
function Hands({ t }: { t: number }) {
  const wrong = t < S("07") - 0.12;
  return (
    <g>
      <HandZoom t={t} wrong={wrong} />
      <Graph t={t} a={wrong ? S("06") - 0.12 : S("07") - 0.12} />
      {wrong ? (
        <g>
          <Big t={t} a={S("06") - 0.12} lines={["So nicht:"]} y={230} size={110} col={COL.rust} />
          <Pop t={t} a={S("06")} x={540} y={420} text={t < MID6 ? "dauerhaft drücken" : "immer wieder ziehen"} fill={COL.rust} size={44} />
          <Mark2 t={t} a={S("06") + 0.2} x={130} y={800} ok={false} />
        </g>
      ) : (
        <g>
          <Big t={t} a={S("07") - 0.12} lines={["Besser:"]} y={230} size={110} col={COL.forest} />
          {t >= S("08") - 0.05 && t < S("09") && <Pop t={t} a={S("08") - 0.05} x={540} y={420} text="Hand ruhig & getragen" fill={COL.forest} size={44} />}
          {t >= S("09") && t < S("10") - 0.05 && <Pop t={t} a={S("09")} x={540} y={420} text="Finger kurz schließen" fill={COL.forest} size={44} />}
          {t >= S("10") - 0.05 && <Pop t={t} a={S("10") - 0.05} x={540} y={420} text="… und sofort nachgeben" fill={COL.forest} size={44} />}
          <Mark2 t={t} a={S("10") + 0.2} x={130} y={800} ok />
          {t >= E("10") - 0.3 && <Tag x={540} y={1530} text="Wie fein? Je nach Pferd & Situation" size={30} fill={COL.honey} color={COL.forestDeep} o={ease((t - E("10") + 0.3) / 0.3)} />}
        </g>
      )}
    </g>
  );
}
function rideAt(t: number, pull: number): RideState {
  return { nod: NOD - 7 * pull, reach: 0, hand: [SITZ.hand[0] - 9 * pull, SITZ.hand[1] + 1 * pull], rein: REIN };
}
function Together({ t }: { t: number }) {
  const err = t >= S("15") - 0.12;
  const pull = err ? sm((t - S("16") - 0.2) / 0.6) : 0;
  const pl = V_FULL;
  const s = rideAt(t, pull);
  const info = rideInfo(t, "trab", s);
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const core = scr([(info.body.hip[0] + info.body.shoulder[0]) / 2, (info.body.hip[1] + info.body.shoulder[1]) / 2]);
  const calf = scr([(info.body.knee[0] + info.body.ankle[0]) / 2 + 2, (info.body.knee[1] + info.body.ankle[1]) / 2]);
  const hand = scr(info.h);
  const bit = scr(info.b);
  const tight = info.tension > 0.15;
  return (
    <g>
      <Arena t={t} speed={groundSpeed("trab", pl.k)} y={pl.y + 285 * pl.k} top={560} />
      <RidingHorse t={t} pl={pl} look={LOOK} gait="trab" id="kn-r" s={s} reinColor={tight ? COL.rust : LEATHER} reinW={2.8} glow={tight ? COL.rust : t >= S("14") && !err ? COL.forest : undefined} />
      {!err ? (
        <g>
          <Ring t={t} x={core[0]} y={core[1]} col={COL.honey} o={sm((t - S("13") + 0.1) / 0.3)} r={34} n="1" />
          <Ring t={t} x={calf[0]} y={calf[1]} col={COL.forest} o={sm((t - S("13") - 1.3) / 0.3)} r={30} n="2" />
          <Ring t={t} x={hand[0]} y={hand[1]} col={COL.brown} o={sm((t - S("14") + 0.05) / 0.3)} r={24} n="3" />
          {t < S("12") - 0.1 ? <Big t={t} a={S("11") - 0.12} lines={["Aber:"]} y={280} size={120} /> : <Big t={t} a={S("12") - 0.1} lines={["Halbe Parade:", "nie nur mit der Hand"]} y={230} size={84} />}
          {[["1 Körpermitte", S("13"), 200], ["2 Bein treibt", S("13") + 1.3, 540], ["3 Hand", S("14"), 860]].map(([s1, a, x]) => (
            <Pop key={s1 as string} t={t} a={a as number} x={x as number} y={470} text={s1 as string} fill={[COL.honey, COL.forest, COL.brown][[200, 540, 860].indexOf(x as number)]} color={x === 200 ? COL.forestDeep : PAPER} size={36} />
          ))}
        </g>
      ) : (
        <g>
          <Big t={t} a={S("15") - 0.12} lines={["Häufigster Fehler"]} y={250} size={96} col={COL.rust} />
          {pull > 0.05 && <ArrowL from={[hand[0] + 10, hand[1] + 40]} to={[hand[0] - 130 * pull, hand[1] + 40]} col={COL.rust} w={12} head={30} />}
          {pull > 0.3 && <ArrowL from={[bit[0] - 30, bit[1] + 60]} to={[bit[0] + 90, bit[1] + 60]} col={COL.inkSoft} w={10} head={26} o={sm((t - S("16") - 1.3) / 0.3)} />}
          {t >= S("16") + 0.3 && <Stamp t={t} a={S("16") + 0.3} x={540} y={450} text="NACH HINTEN ZIEHEN" size={56} />}
          {t >= S("16") + 1.4 && <Tag x={bit[0] - 40} y={bit[1] - 120} text="hält dagegen" size={32} fill={COL.inkSoft} o={ease((t - S("16") - 1.4) / 0.3)} />}
        </g>
      )}
    </g>
  );
}

export function renderKneten(t: number) {
  const cuts = [S("04") - 0.12, S("06") - 0.12, S("07") - 0.12, S("11") - 0.12, S("15") - 0.12, S("17") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Terms t={t} />;
  else if (t < cuts[3]) body = <Hands t={t} />;
  else if (t < cuts[5]) body = <Together t={t} />;
  else body = <AkCTA t={t} a={S("17")} b={S("18")} fin={E("18") + 0.3} module={4} title={["Reiten wirklich", "verstehen?"]} id="kn-ph" />;
  return <Frame t={t} cuts={cuts} after={<Caption t={t} lines={CAP} y={1580} />}>{body}</Frame>;
}
export function renderKnetenCover() {
  return (
    <Frame t={4} cuts={[]}>
      <Big t={4} a={0} lines={["Zügel kneten?!"]} y={240} size={130} />
      <Big t={4} a={0} lines={["Was deine Finger", "wirklich tun sollen"]} y={400} size={74} col={COL.rust} />
      <HandZoom t={S("09") + 1.0} wrong={false} />
      <Face t={4} x={830} y={1500} r={110} kind="reiter" mood="what" />
    </Frame>
  );
}
