import type { ReactNode } from "react";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { COL, FONT_BODY, PAPER, Pop, T, back, ease, headPoint, hs, lerp, sm, type Place } from "./nov-kit";
import { LOOK_T, Stamp } from "./n2-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, BrandLine, Bubble, Face, Frame, vo, type VoLines } from "./viral-kit";
import { ArrowL } from "./hg1-haenger-reel";
import POVJ from "./pov-lines.json";
import RLJ from "./rlsaetze-lines.json";

/* Tagesset 03 · Funny-Reels ohne Sprecher (18.11.2026).
   `pov` (08:00): „POV: Du willst heute einfach nur entspannt reiten.“ – Erschrecken realistisch: stehen bleiben, Kopf hoch, Auge groß.
   `rlsaetze` (19:30): „Reitlehrer sagen Dinge …“ – MEHR KREUZ / HAND STEHEN LASSEN / MEHR BEIN.
   Bestand: RidingHorse, Arena, Face, Bubble, Big, Stamp, Eis-Kristalle wie `festhalten`. Neu: Blatt + Windlinien. */

const NOD = 8;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
const rs = (nod: number, hand: P = SITZ.hand, slack = 0.3): RideState => ({ nod, reach: 0, hand, rein: REIN - 0.3 + slack });

/* ================= POV ================= */
const PV = vo(POVJ as VoLines);
export const POV_TOTAL = PV.total;
const PL: Place = { x: 540 - 160 * 2.7, y: 1400 - 285 * 2.7, k: 2.7 };
function Leaf({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M-30 0 Q0 -26 30 0 Q0 26 -30 0 Z" fill="#D9932E" stroke="#9E6418" strokeWidth="3" />
      <path d="M-30 0 L34 0" stroke="#9E6418" strokeWidth="3" />
    </g>
  );
}
export function renderPov(t: number) {
  const { S } = PV;
  const spook = t >= S("03");
  const tt = spook ? S("03") : t; // Beine frieren beim Erschrecken ein
  const head = spook ? sm((t - S("03")) / 0.18) : 0;
  const nod = lerp(NOD + 2 * Math.sin(t * 2.6), -22, head);
  const s = rs(nod, [SITZ.hand[0] + 4 * head, SITZ.hand[1] - 6 * head], 0.3 + 3 * head);
  const gait = spook ? ("stand" as const) : ("schritt" as const);
  const zoom = spook ? 1 + 0.55 * ease((t - S("03")) / 0.25) * (1 - sm((t - S("04") + 0.2) / 0.5)) : 1;
  const eye = hs(PL, [333, 77]);
  const pivot: P = spook ? eye : [540, 1000];
  // Blatt fliegt von rechts herein und landet vor dem Pferd
  const lf = sm((t - S("02") - 0.1) / 1.8);
  const leaf: P = [lerp(1150, eye[0] + 120, lf), lerp(760, 1380, lf) - 60 * Math.sin(lf * Math.PI * 2)];
  const cuts = [S("02") - 0.05, S("03"), S("04") - 0.05, S("05") - 0.05];
  let txt: ReactNode;
  if (t < S("02") - 0.05) txt = <Big t={t} a={0} lines={["POV: Du willst heute", "einfach nur entspannt reiten."]} y={220} size={70} />;
  else if (t < S("03")) txt = <Big t={t} a={S("02") - 0.05} lines={["Der Wind: 3 km/h."]} y={260} size={92} />;
  else if (t < S("04") - 0.05) txt = <Big t={t} a={S("03")} lines={["Mein Pferd:"]} y={240} size={92} />;
  else if (t < S("05") - 0.05) txt = <Big t={t} a={S("04") - 0.05} lines={["Ich: Wir wollten doch", "nur Schritt reiten."]} y={220} size={76} />;
  else txt = <Big t={t} a={S("05") - 0.05} lines={["Wer hat auch", "so ein Pferd?"]} y={220} size={96} col={COL.rust} />;
  return (
    <Frame t={t} cuts={cuts} after={
      <g>
        {txt}
        {t >= S("03") + 0.15 && t < S("04") - 0.05 && <Stamp t={t} a={S("03") + 0.15} x={540} y={430} text="LEBENSGEFAHR." size={86} />}
        {t >= S("04") - 0.05 && t < S("05") - 0.05 && <Face t={t} x={540} y={1250} r={170} kind="reiter" mood="forced" a={S("04") - 0.05} />}
        {t < S("03") && <Face t={t} x={170} y={680} r={80} kind="reiter" mood="smile" />}
        {t >= S("05") - 0.05 && <ArrowL from={[540, 1200]} to={[540, 1200 + 160 * ease((t - S("05")) / 0.4)]} col={COL.rust} w={16} head={40} />}
        {t >= S("05") && <BrandLine t={t} a={S("05") + 0.3} text="Hofgeschichten" y={1500} />}
      </g>
    }>
      <g transform={`translate(${pivot[0]} ${pivot[1]}) scale(${zoom}) translate(${-pivot[0]} ${-pivot[1]})`}>
        <Arena t={tt} speed={groundSpeed("schritt", PL.k)} y={PL.y + 285 * PL.k} top={540} />
        <RidingHorse t={tt} pl={PL} look={LOOK_T} gait={gait} id="pv-r" s={s} />
        {spook && (
          <g>
            <circle cx={eye[0]} cy={eye[1]} r={11 + 3 * head} fill={PAPER} stroke="#2B1D14" strokeWidth="2" opacity={head} />
            <circle cx={eye[0] + 2} cy={eye[1]} r={6} fill="#1A120D" opacity={head} />
            <g transform={`translate(${eye[0] - 20} ${eye[1] - 150}) scale(${back((t - S("03") - 0.1) / 0.3) * (1 + 0.06 * Math.sin(t * 9))})`}>
              <circle r={44} fill={COL.rust} /><T x={0} y={22} size={64} color={PAPER}>!</T>
            </g>
          </g>
        )}
        {t >= S("02") - 0.05 && <Leaf x={leaf[0]} y={leaf[1]} rot={lf * 540} />}
        {t >= S("02") - 0.05 && t < S("03") + 0.4 && [0, 1, 2].map((i) => {
          const u = ((t - S("02")) * 0.9 + i / 3) % 1;
          return <path key={i} d={`M${1100 - 1200 * u} ${700 + i * 120} q60 -30 120 0 t120 0`} stroke={PAPER} strokeWidth="8" fill="none" strokeLinecap="round" opacity={0.8 * Math.sin(u * Math.PI)} />;
        })}
      </g>
      {t >= S("04") - 0.05 && t < S("05") - 0.05 && <rect x={0} y={540} width={1080} height={1380} fill={COL.bg} opacity=".55" />}
    </Frame>
  );
}

/* ================= Reitlehrer-Sätze ================= */
const RL = vo(RLJ as VoLines);
export const RL_TOTAL = RL.total;
function Ice({ p, t, o }: { p: P; t: number; o: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o * 0.9} stroke="#8FB7D4" strokeWidth="6" strokeLinecap="round">
      {[[-60, -50], [70, -40], [10, 60]].map(([dx, dy], i) => {
        const r = 24 + 4 * Math.sin(t * 3 + i);
        return (
          <g key={i} transform={`translate(${p[0] + dx} ${p[1] + dy}) rotate(${i * 20})`}>
            {[0, 60, 120].map((a) => <path key={a} transform={`rotate(${a})`} d={`M${-r} 0 L${r} 0 M${r * 0.55} -8 L${r * 0.75} 0 L${r * 0.55} 8 M${-r * 0.55} -8 L${-r * 0.75} 0 L${-r * 0.55} 8`} />)}
          </g>
        );
      })}
    </g>
  );
}
const RPL: Place = { x: 540 - 160 * 2.7, y: 1420 - 285 * 2.7, k: 2.7 };
export function renderRlsaetze(t: number) {
  const { S } = RL;
  const cuts = [S("02") - 0.05, S("03") - 0.05, S("04") - 0.05, S("05") - 0.05];
  let body: ReactNode;
  if (t < S("02") - 0.05) {
    body = (
      <g>
        <Big t={t} a={0} lines={["Reitlehrer sagen Dinge,", "die ohne Erklärung", "keinen Sinn ergeben."]} y={560} size={84} />
        <Face t={t} x={540} y={1180} r={170} kind="trainer" mood="neutral" a={0.3} />
      </g>
    );
  } else if (t < S("03") - 0.05) {
    const a = S("02");
    const r = t >= a + 1.0;
    body = (
      <g>
        <Face t={t} x={270} y={620} r={130} kind="trainer" mood="neutral" label="Reitlehrerin" />
        <Bubble t={t} a={a} label="Reitlehrerin" lines={["„MEHR KREUZ!“"]} y={850} size={90} fill={COL.forest} />
        {r && <Face t={t} x={810} y={620} r={130} kind="reiter" mood="confused" label="Ich" a={a + 1.0} />}
        {r && <Bubble t={t} a={a + 1.1} lines={["Welches Körperteil", "genau?!"]} y={1150} size={66} fill={COL.honey} color={COL.forestDeep} tail="right" />}
        {r && [0, 1, 2].map((i) => <Pop key={i} t={t} a={a + 1.4 + i * 0.2} x={[690, 960, 820][i]} y={[440, 470, 380][i]} text="?" fill={COL.rust} size={48} />)}
      </g>
    );
  } else if (t < S("04") - 0.05) {
    const a = S("03");
    const fz = t >= a + 1.0;
    const tw = fz ? a + 1.0 : t;
    // Hände eingefroren, Pferd geht im Schritt weiter: Kopf nickt, Zügel wird abwechselnd straff/locker
    const nodW = 4 * Math.sin((2 * Math.PI * t) / 1.1);
    const nodWf = 4 * Math.sin((2 * Math.PI * tw) / 1.1);
    const s = rs(NOD + nodW, fz ? [SITZ.hand[0] + (headPoint(BIT, NOD + nodWf, 0)[0] - B0[0]), SITZ.hand[1]] : [SITZ.hand[0] + (headPoint(BIT, NOD + nodW, 0)[0] - B0[0]), SITZ.hand[1]]);
    const info = rideInfo(t, "schritt", s);
    const hand = hs(RPL, [info.h[0], info.h[1] + info.bob]);
    const elbow = hs(RPL, [info.body.elbow[0], info.body.elbow[1] + info.bob]);
    const tight = fz && info.tension > 0.15;
    body = (
      <g>
        <Arena t={t} speed={groundSpeed("schritt", RPL.k)} y={RPL.y + 285 * RPL.k} top={540} />
        <RidingHorse t={t} pl={RPL} look={LOOK_T} gait="schritt" id="rl-r" s={s} reinColor={tight ? COL.rust : LEATHER} reinW={2.8} />
        <Ice p={hand} t={t} o={fz ? 1 : 0} />
        <Ice p={elbow} t={t + 1} o={fz ? 0.8 : 0} />
        {fz && <rect x={0} y={540} width={1080} height={900} fill="#BFDDF0" opacity={0.18 * Math.max(0, 1 - (t - a - 1.0) / 0.4)} />}
        <Bubble t={t} a={a} label="Reitlehrerin" lines={["„HAND STEHEN LASSEN!“"]} y={170} size={70} fill={COL.forest} />
        {fz && <T x={540} y={520} size={76} color={COL.rust} italic>*friert ein*</T>}
      </g>
    );
  } else if (t < S("05") - 0.05) {
    const a = S("04");
    const s = rs(NOD + 2 * Math.sin(t * 2));
    const info = rideInfo(t, "stand", s);
    const calf = hs(RPL, [(info.body.knee[0] + info.body.ankle[0]) / 2, (info.body.knee[1] + info.body.ankle[1]) / 2 + info.bob]);
    body = (
      <g>
        <Arena t={t} speed={0} y={RPL.y + 285 * RPL.k} top={540} />
        <RidingHorse t={t} pl={RPL} look={LOOK_T} gait="stand" id="rl-b" s={s} />
        <Bubble t={t} a={a} label="Reitlehrerin" lines={["„MEHR BEIN!“"]} y={170} size={90} fill={COL.forest} />
        {t >= a + 0.8 && <Pop t={t} a={a + 0.8} x={calf[0] - 100} y={calf[1] + 20} text="1" fill={COL.honey} color={COL.forestDeep} size={56} />}
        {t >= a + 1.3 && <Pop t={t} a={a + 1.3} x={calf[0] + 160} y={calf[1] + 250} text="2 (andere Seite)" fill={COL.honey} color={COL.forestDeep} size={40} />}
        {t >= a + 1.8 && <Bubble t={t} a={a + 1.8} lines={["Ich habe doch", "nur zwei?!"]} y={1450} size={64} fill={COL.honey} color={COL.forestDeep} tail="right" />}
        {t >= a + 1.8 && <Face t={t} x={900} y={560} r={90} kind="reiter" mood="worried" a={a + 1.8} />}
      </g>
    );
  } else {
    const a = S("05");
    body = (
      <g>
        <Big t={t} a={a - 0.05} lines={["Welche Reitlehrer-", "Anweisung verstehst du", "bis heute nicht?"]} y={560} size={80} col={COL.rust} />
        <ArrowL from={[540, 950]} to={[540, 950 + 200 * ease((t - a - 0.3) / 0.4)]} col={COL.rust} w={16} head={40} />
        <BrandLine t={t} a={a + 0.5} text="Hofgeschichten" y={1400} />
      </g>
    );
  }
  return <Frame t={t} cuts={cuts}>{body}</Frame>;
}
