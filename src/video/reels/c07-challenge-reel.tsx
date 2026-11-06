import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, win } from "./nov-kit";
import { Countdown, Note } from "./n2-kit";
import { FigureScene } from "./rl/Figure";
import { poseAt, type Frame, type Pose } from "./rl/kinematics";
import type { Overlay } from "./rl/types";

/* Challenge-Reel R7 (9:16): „Schaffst du 20 Sekunden?“ (comp `challenge`) – Rider-Lab-Einbeinstand (Frontansicht).
   Im Ton wird nach „Los geht's!“ eine Pause von G Sekunden eingefügt (Countdown mit Musik, keine Stimme). */

export const CH_GAP = 20.4;
const G = CH_GAP;
const REC: Array<[string, string, number, number]> = [
  ["a1", "Reiter-Challenge: Schaffst du zwanzig Sekunden?", 0, 1.85],
  ["b1", "Stell dich auf ein Bein –", 2.3, 3.61],
  ["b2", "Becken waagerecht, Blick nach vorn.", 3.97, 5.95],
  ["c1", "Und jetzt: zwanzig Sekunden ruhig stehen.", 6.32, 9.05],
  ["c2", "Los geht's!", 9.34, 10.18],
  ["d1", "Geschafft?", 10.51 + G, 11.07 + G],
  ["d2", "Dann die andere Seite – und stitch uns, wenn du's kannst!", 11.45 + G, 14.42 + G],
  ["e1", "Balance am Boden macht dich sicherer im Sattel.", 14.81 + G, 17.28 + G],
  ["e2", "Zwanzig solche Übungen findest du im neuen Rider Lab der Hofgeschichten Reitakademie.", 17.65 + G, 22.36 + G],
];
export const CH_LINES = mkLines(REC);
const L = CH_LINES;
export const CH_TOTAL = E(L, "e2") + 2.6;

const FRONT: Pose = {
  hip: [180, 133],
  tr: 0,
  l1: { th: 2, kn: 0, footAbs: 0 },
  l2: { th: 2, kn: 0, footAbs: 0 },
  a1: { a: 10, el: 6 },
  a2: { a: 10, el: 6 },
};
const oneLeg = (u: number, o: Partial<Pose> = {}): Pose => ({
  ...FRONT,
  hip: [180 - 4 * u, 133],
  l2: { th: 2 + 6 * u, kn: 6 * u, thK: 1 - 0.55 * u, footAbs: 0 },
  a1: { a: 10 + 10 * u, el: 6 },
  a2: { a: 10 + 10 * u, el: 6 },
  ...o,
});
const sway = (t: number, k: number) => oneLeg(1, { hip: [176 + k * Math.sin(t * 1.7) * 1.2, 133], tr: k * Math.sin(t * 1.7 + 0.6) * 1.2 });

const OV: Overlay[] = [
  { k: "level", a: "hip1", b: "hip2", ext: 16, tone: "ok" },
  { k: "press", at: "an1", tone: "hint" },
];

const K = 3.3;
const FX = 540 - 180 * K;
const FY = 600;

function Confetti({ t, a }: { t: number; a: number }) {
  const u = t - a;
  if (u < 0 || u > 2.4) return null;
  const cols = [COL.honey, COL.forest, COL.rust, COL.sandLight];
  return (
    <g opacity={1 - Math.max(0, u - 1.8) / 0.6}>
      {Array.from({ length: 46 }, (_, i) => {
        const ang = (i * 137.5 * Math.PI) / 180;
        const sp = 380 + (i % 7) * 70;
        const x = 540 + Math.cos(ang) * sp * Math.min(1, u * 1.6);
        const y = 470 + Math.sin(ang) * sp * 0.7 * Math.min(1, u * 1.6) + 420 * u * u;
        return <rect key={i} x={x} y={y} width="18" height="30" rx="4" fill={cols[i % 4]} transform={`rotate(${i * 40 + u * 400} ${x + 9} ${y + 15})`} />;
      })}
    </g>
  );
}

function RLCard({ t, a, y = 1180 }: { t: number; a: number; y?: number }) {
  const k = back((t - a) / 0.5);
  if (k <= 0.001) return null;
  const areas = ["Das lange Bein", "Leichttraben", "Galopp", "Die ruhige Hand", "Leichter Sitz"];
  return (
    <g transform={`translate(540 ${y}) scale(${k})`}>
      <rect x={-440} y={-60} width={880} height={470} rx="40" fill={COL.forestDeep} />
      <T x={0} y={16} size={58} color={PAPER}>NEU: Rider Lab</T>
      <T x={0} y={66} size={30} font={FONT_BODY} weight={700} color={COL.honey}>20 Übungen · 5 Bereiche · in der Reitakademie</T>
      {areas.map((s, i) => {
        const kk = back((t - a - 0.3 - i * 0.12) / 0.4);
        return (
          <g key={s} transform={`translate(0 ${130 + i * 54}) scale(${Math.max(0.001, kk)})`}>
            <rect x={-260} y={-22} width={520} height={44} rx="22" fill={PAPER} opacity=".95" />
            <T x={0} y={11} size={28} font={FONT_BODY} weight={800} color={COL.forestDeep}>{s}</T>
          </g>
        );
      })}
    </g>
  );
}

export function renderChallenge(t: number) {
  const cdA = E(L, "c2") + 0.25; // Countdown-Start
  const cdE = cdA + 20;
  const lift1 = S(L, "b1") + 0.2;
  const sideB = S(L, "d2") + 0.8; // andere Seite
  const frames: Frame[] = [
    { t: 0, pose: oneLeg(0) },
    { t: lift1, pose: oneLeg(0) },
    { t: lift1 + 1.1, pose: oneLeg(1) },
  ];
  let pose: Pose;
  let mirror = false;
  if (t < cdE + 0.4) {
    pose = t < lift1 + 1.1 ? poseAt(frames, t, "front").pose : sway(t, t > cdA ? 1 : 0.4);
  } else if (t < sideB) {
    const u = Math.min(1, (t - cdE - 0.4) / 0.9);
    pose = oneLeg(1 - u);
  } else {
    mirror = true;
    const u = Math.min(1, (t - sideB) / 1.0);
    pose = u < 1 ? oneLeg(u) : sway(t, 0.6);
  }
  const figO = win(t, -1, S(L, "e2") - 0.1, 0.35);
  const cdO = win(t, cdA - 0.3, S(L, "d1") - 0.05, 0.3);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={figO}>
        <ellipse cx={540} cy={FY + 232 * K} rx={330} ry={44} fill={COL.sandLight} />
        <g transform={`translate(${FX} ${FY}) scale(${K})`}>
          <g transform={mirror ? "translate(360 0) scale(-1 1)" : undefined}>
            <FigureScene view="front" pose={pose} overlays={t > lift1 + 0.8 ? OV : []} t={2} />
          </g>
        </g>
        <Pop t={t} a={S(L, "b2")} x={830} y={FY + 133 * K + 10} text="Becken waagerecht" fill={COL.forest} size={32} o={win(t, S(L, "b2"), cdA)} />
        <Pop t={t} a={at2("b2")} x={790} y={FY + 30 * K} text="Blick nach vorn" fill={COL.honey} color={COL.forestDeep} size={30} o={win(t, at2("b2"), cdA - 0.5)} />
        <Pop t={t} a={S(L, "d2") + 0.6} x={540} y={FY - 20} text="↔ andere Seite" fill={COL.forest} size={34} o={win(t, S(L, "d2") + 0.6, S(L, "e1"))} />
        <Pop t={t} a={L.find((l) => l.id === "d2")!.start + 1.9} x={540} y={1470} text="🎬 Stitch uns!" fill={COL.rust} size={44} o={win(t, S(L, "d2") + 1.9, S(L, "e1") + 0.3)} />
      </g>
      {cdO > 0.01 && (
        <g opacity={cdO}>
          <Countdown t={t} a={cdA} secs={20} y={440} r={140} />
          {t > cdA + 9 && t < cdE && <Pop t={t} a={cdA + 9} x={540} y={630} text="Halbzeit! 💪" fill={COL.honey} color={COL.forestDeep} size={34} o={win(t, cdA + 9, cdA + 12)} />}
          {t > cdA + 15 && t < cdE && <Pop t={t} a={cdA + 15} x={540} y={630} text="Fast geschafft!" fill={COL.forest} size={34} />}
        </g>
      )}
      <Confetti t={t} a={cdE} />
      <RLCard t={t} a={S(L, "e2") + 0.2} y={700} />
      <Brand t={t} a={S(L, "e2") + 1.6} y={1330} />
      <Note text="Stütze in Reichweite · bei Schmerzen aufhören" y={1840} o={win(t, S(L, "b1"), S(L, "e2"))} />
      <Header t={t} label="Die Hofgeschichten · Rider Lab" hide={win(t, 0, E(L, "a1") + 0.3)} />
      <HookText t={t} end={E(L, "a1") + 0.3} y0={300} lines={[
        { text: "Reiter-Challenge", at: -0.9, size: 76 },
        { text: "Schaffst du 20 SEKUNDEN?", at: 0.6, hi: true, size: 64 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={cdA - 0.2} top="Auf ein Bein" sub="Becken waagerecht · Blick nach vorn" color={COL.forest} y={400} />
      <Title t={t} a={S(L, "d1")} b={S(L, "e1")} top="Geschafft?" sub="Dann die andere Seite!" color={COL.forestDeep} y={400} />
      <Title t={t} a={S(L, "e1")} b={S(L, "e2")} top="Balance am Boden" sub="macht dich sicherer im Sattel" color={COL.forest} y={400} />
      <Caption t={t} lines={L} skip={["a1", "c2", "d1"]} y={1600} />
      {t > cdA + 0.1 && t < S(L, "d1") - 0.3 && <T x={540} y={1300 + 380} size={34} font={FONT_BODY} weight={800} color={COL.forestDeep} o={ease((t - cdA) / 0.4)}>ruhig stehen · ruhig atmen</T>}
    </svg>
  );
}
function at2(id: string) {
  const l = L.find((x) => x.id === id)!;
  return l.start + l.dur * 0.5;
}
