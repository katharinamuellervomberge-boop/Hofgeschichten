import type { ReactNode } from "react";
import { COL, FONT_BODY, PAPER, Pop, T, back, ease, sm } from "./nov-kit";
import { TopBahn, along, bx, by, pathD, type Bahn } from "./n2-kit";
import { LOOKS, TopHorse } from "./top";
import { Big, BrandLine, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./bahnranking-lines.json";

/* Reel „Bahnfiguren: harmlos vs. wirklich schwer“ (comp `bahnranking`, 12.11.2026) – humorvolles Ranking, keine Statistik.
   Viereck 20 × 40 von oben (A links, C rechts; K–E–H oben, F–B–M unten). Richtige Linien waldgrün, Fehler-Versionen
   bewusst überzeichnet in Rost. Geometrie: Hufschlag 1 m innen, Ecken als Viertelkreis, Wechsel H–X–F, Zirkel über die
   ganze Breite durch A und X, Schlangenlinie 3 Bögen (Halbkreise + gerade über die Mittellinie), Volte ohne Maßangabe. */

const { S, E, total } = vo(LJ as VoLines);
export const BRK_TOTAL = total;
type P = [number, number];
const B: Bahn = { x: 80, y: 700, m: 23 };

/* ---------- Geometrie (Meter) ---------- */
/** Polyline → Funktion u∈[0,1] mit gleichmäßiger Geschwindigkeit */
function poly(pts: P[]) {
  const d = [0];
  for (let i = 1; i < pts.length; i++) d.push(d[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const L = d[d.length - 1];
  return (u: number): P => {
    const s = Math.min(1, Math.max(0, u)) * L;
    let i = 1;
    while (i < d.length - 1 && d[i] < s) i++;
    const r = (s - d[i - 1]) / (d[i] - d[i - 1] || 1);
    return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * r, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * r];
  };
}
const arcPts = (c: P, r: number, a0: number, a1: number, n = 24): P[] => Array.from({ length: n + 1 }, (_, i) => {
  const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
  return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
});
const line = (a: P, b: P, n = 12): P[] => Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);

// Ganze Bahn, rechte Hand (im Bild im Uhrzeigersinn) ab A, Hufschlag 1 m innen, Ecken Radius 3 m
const RC = 3, I = 1;
const ganze = poly([
  ...line([I, 10], [I, I + RC]), ...arcPts([I + RC, I + RC], RC, 180, 270),
  ...line([I + RC, I], [40 - I - RC, I]), ...arcPts([40 - I - RC, I + RC], RC, 270, 360),
  ...line([40 - I, I + RC], [40 - I, 10]),
]);
// Fehler: Pferd „driftet“ auf der langen Seite in die Bahn
const drift = poly([
  ...line([I, 10], [I, I + RC]), ...arcPts([I + RC, I + RC], RC, 180, 270),
  ...Array.from({ length: 60 }, (_, i): P => { const x = I + RC + ((40 - 2 * I - 2 * RC) * i) / 59; return [x, I + 5.5 * Math.sin((Math.PI * i) / 59) ** 1.2 + 1.2 * Math.sin(i / 4)]; }),
  ...arcPts([40 - I - RC, I + RC], RC, 270, 360), ...line([40 - I, I + RC], [40 - I, 10]),
]);
// Durch die ganze Bahn wechseln: von C kommend linke Hand, H–X–F, weiter Richtung A
const Hp: P = [34, I], X: P = [20, 10], Fp: P = [6, 20 - I];
const wechsel = poly([[40 - I, 4], ...arcPts([40 - I - RC, I + RC], RC, 0, -90), ...line([40 - I - RC, I], Hp, 4), ...line(Hp, Fp, 30), ...line(Fp, [I + RC, 20 - I], 4), ...arcPts([I + RC, 20 - I - RC], RC, 90, 180)]);
const wechselFalsch = poly([[40 - I, 4], ...arcPts([40 - I - RC, I + RC], RC, 0, -90), ...line([40 - I - RC, I], Hp, 4),
  ...Array.from({ length: 50 }, (_, i): P => {
    const u = i / 49; const bx0 = Hp[0] + (Fp[0] - Hp[0]) * u, by0 = Hp[1] + (Fp[1] - Hp[1]) * u;
    const nx = 0.6, ny = 0.8; const off = 2.6 * Math.sin(u * Math.PI * 3) + 2.2 * Math.sin(u * Math.PI);
    return [bx0 + nx * off, by0 + ny * off * 0.6];
  }), ...line(Fp, [I + RC, 20 - I], 4)]);
// Zirkel an A: Mittelpunkt (10,10), durch A und X
const zirkel = poly(arcPts([10, 10], 9.5, 180, 540, 90));
const ei = poly(Array.from({ length: 91 }, (_, i): P => {
  const a = (180 + (360 * i) / 90) * Math.PI / 180;
  const k = 1 + 0.32 * Math.cos(a);
  return [12 + 9.8 * Math.cos(a) * (0.86 + 0.14 * k), 10 + 8.2 * Math.sin(a) * k * 0.85];
}));
// Schlangenlinie durch die ganze Bahn, 3 Bögen: Halbkreise zwischen den Hufschlägen, dazwischen gerade über die Mittellinie
const r3 = (40 - 2 * I) / 6, xa = I + 2 * r3, xb = I + 4 * r3;
const schlange = poly([
  ...line([I, 10], [I, I + r3]),
  ...arcPts([I + r3, I + r3], r3, 180, 360),
  ...line([xa, I + r3], [xa, 20 - I - r3]),
  ...arcPts([20, 20 - I - r3], r3, 180, 0),
  ...line([xb, 20 - I - r3], [xb, I + r3]),
  ...arcPts([40 - I - r3, I + r3], r3, 180, 360),
  ...line([40 - I, I + r3], [40 - I, 10]),
]);
const schlangeFalsch = poly([
  ...line([I, 10], [I, 4]), ...arcPts([4, 4], 3, 180, 360), ...line([7, 4], [7, 14]), ...arcPts([15, 14], 8, 180, 0),
  ...line([23, 14], [23, 7]), ...arcPts([26, 7], 3, 180, 360), ...line([29, 7], [29, 16]), ...arcPts([32.5, 16], 3.5, 180, 0),
  ...line([36, 16], [36, 8]), ...arcPts([37.5, 8], 1.5, 180, 300),
]);
// Volte an E (Hufschlag oben), rechte Hand
const volte = poly(arcPts([20, I + 4.5], 4.5, 270, 630, 60));

/* ---------- Szenen-Bausteine ---------- */
function Route({ f, u1, col, w = 10, dash, o = 1 }: { f: (u: number) => P; u1: number; col: string; w?: number; dash?: string; o?: number }) {
  if (u1 <= 0.001) return null;
  return <path d={pathD(B, f, 160, Math.min(1, u1))} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} opacity={o} />;
}
function Rider({ f, u, t, bend = 0, look = LOOKS.tivoli }: { f: (u: number) => P; u: number; t: number; bend?: number; look?: typeof LOOKS.tivoli }) {
  const { p, ang } = along(B, f, Math.min(0.997, Math.max(0.003, u)));
  return <TopHorse at={p} ang={ang} look={look} step={t * 1.5} s={2.3} bend={bend} />;
}
function Rank({ t, a, n, title }: { t: number; a: number; n: number; title: string }) {
  const k = back((t - a) / 0.35);
  return (
    <g>
      <g transform={`translate(170 330) scale(${Math.max(0.01, k)})`}>
        <circle r={100} fill={n === 1 ? COL.rust : COL.forest} />
        <T x={0} y={8} size={40} font={FONT_BODY} weight={800} color={COL.honey}>PLATZ</T>
        <T x={0} y={74} size={84} color={PAPER}>{String(n)}</T>
      </g>
      <g opacity={ease((t - a - 0.1) / 0.3)}>
        <T x={300} y={350} size={Math.min(76, 720 / (title.length * 0.5))} anchor="start">{title}</T>
        <g>
          {[5, 4, 3, 2, 1].map((m, i) => (
            <rect key={m} x={300 + i * 92} y={390} width={80} height={18} rx="9" fill={6 - m <= 6 - n ? (n === 1 ? COL.rust : COL.honey) : COL.sandLight} />
          ))}
          <T x={300} y={450} size={26} font={FONT_BODY} weight={700} color={COL.inkSoft} anchor="start">harmlos → fies</T>
        </g>
      </g>
    </g>
  );
}
const u = (t: number, a: number, d: number) => sm((t - a) / d);

export function renderBRK(t: number) {
  const s5 = S("03") - 0.1, s4 = S("05") - 0.1, s3 = S("07") - 0.1, s2 = S("10") - 0.1, s1 = S("12") - 0.1, fin = S("15") - 0.1;
  let scene: ReactNode;
  if (t < s5) {
    const k = (t * 0.22) % 1;
    scene = (
      <g>
        <Big t={t} a={0} lines={["Bahnfiguren gerankt danach,", "wie harmlos sie aussehen …"]} y={250} size={74} />
        {t >= S("02") - 0.05 && <Big t={t} a={S("02") - 0.05} lines={["… und wie schwer sie wirklich", "sauber zu reiten sind."]} y={480} size={52} col={COL.rust} />}
        <TopBahn b={B}>
          <Route f={zirkel} u1={1} col={COL.forest} w={5} o={0.25} />
          <Route f={schlange} u1={1} col={COL.forest} w={5} o={0.25} />
          <Route f={volte} u1={1} col={COL.forest} w={5} o={0.25} />
          <Route f={wechsel} u1={1} col={COL.forest} w={5} o={0.25} />
          <Rider f={zirkel} u={k} t={t} bend={6} />
        </TopBahn>
        <T x={540} y={1260} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>unser Ranking – rein subjektiv, keine Statistik</T>
      </g>
    );
  } else if (t < s4) {
    const bad = t >= S("04") - 0.05;
    const ug = u(t, s5 + 0.1, E("03") - s5);
    const ub = u(t, S("04"), E("04") - S("04") - 0.2);
    scene = (
      <g>
        <Rank t={t} a={s5} n={5} title="Ganze Bahn" />
        <TopBahn b={B}>
          <Route f={ganze} u1={bad ? 1 : ug} col={COL.forest} w={bad ? 6 : 10} o={bad ? 0.35 : 1} />
          {bad && <Route f={drift} u1={ub} col={COL.rust} />}
          <Rider f={bad ? drift : ganze} u={bad ? ub : ug} t={t} />
        </TopBahn>
        <Big t={t} a={S("03") + 0.5} b={S("04") - 0.06} lines={["„Sieht leicht aus.“"]} y={1340} size={70} />
        {bad && <Big t={t} a={S("04")} lines={["Bis dein Pferd entscheidet,", "dass geradeaus optional ist."]} y={1330} size={62} col={COL.rust} />}
      </g>
    );
  } else if (t < s3) {
    const bad = t >= S("06") - 0.05;
    const ug = u(t, s4 + 0.1, E("05") - s4);
    const ub = u(t, S("06"), E("06") - S("06"));
    const xk = back((t - S("06") - 1.2) / 0.3);
    scene = (
      <g>
        <Rank t={t} a={s4} n={4} title="Durch die ganze Bahn wechseln" />
        <TopBahn b={B}>
          <circle cx={bx(B, 20)} cy={by(B, 10)} r={10} fill={COL.forestDeep} />
          <T x={bx(B, 20) + 26} y={by(B, 10) - 16} size={34} font={FONT_BODY} weight={900} color={COL.forestDeep}>X</T>
          <Route f={wechsel} u1={bad ? 1 : ug} col={COL.forest} w={bad ? 6 : 10} o={bad ? 0.35 : 1} />
          {bad && <Route f={wechselFalsch} u1={ub} col={COL.rust} />}
          <Rider f={bad ? wechselFalsch : wechsel} u={bad ? ub : ug} t={t} />
          {bad && xk > 0.01 && <circle cx={bx(B, 20)} cy={by(B, 10)} r={60 * Math.min(1.1, xk)} fill="none" stroke={COL.rust} strokeWidth="6" strokeDasharray="12 8" />}
        </TopBahn>
        {!bad && <Big t={t} a={S("05") + 0.3} lines={["Auf dem Papier: eine Linie."]} y={1340} size={66} />}
        {bad && <Big t={t} a={S("06")} lines={["In echt: Warum sind wir bei X", "plötzlich 2 Meter daneben?"]} y={1330} size={60} col={COL.rust} />}
      </g>
    );
  } else if (t < s2) {
    const egg = t >= S("08") - 0.05 && t < S("09") - 0.05;
    const fix = t >= S("09") - 0.05;
    const uz = ((t - s3) * 0.45) % 1;
    scene = (
      <g>
        <Rank t={t} a={s3} n={3} title="Zirkel" />
        <TopBahn b={B}>
          <Route f={zirkel} u1={egg ? 1 : u(t, s3, 0.8)} col={COL.forest} w={egg ? 6 : 10} o={egg ? 0.3 : 1} />
          {egg && <Route f={ei} u1={u(t, S("08") - 0.05, 0.5)} col={COL.rust} w={12} />}
          <Rider f={egg ? ei : zirkel} u={uz} t={t} bend={6} />
          {fix && [[1, 10], [10, 0.5], [10, 19.5], [19.5, 10]].map(([x, y], i) => (
            <circle key={i} cx={bx(B, x)} cy={by(B, y)} r={14 * Math.min(1, back((t - S("09") - i * 0.12) / 0.25))} fill={COL.honey} stroke={PAPER} strokeWidth="4" />
          ))}
        </TopBahn>
        {!egg && !fix && <Big t={t} a={S("07")} lines={["Zirkel."]} y={1350} size={110} />}
        {egg && <Big t={t} a={S("08")} lines={["Nicht: Ei."]} y={1350} size={110} col={COL.rust} shake={10} />}
        {fix && <Big t={t} a={S("09")} lines={["Rund. Wirklich rund.", "Über die ganze Bahnbreite."]} y={1330} size={60} col={COL.forest} />}
      </g>
    );
  } else if (t < s1) {
    const bad = t >= S("11") - 0.05;
    const ug = u(t, s2 + 0.1, S("11") - s2 - 0.2);
    const ub = u(t, S("11"), E("11") - S("11"));
    scene = (
      <g>
        <Rank t={t} a={s2} n={2} title="Schlangenlinie" />
        <TopBahn b={B}>
          <line x1={bx(B, 0)} x2={bx(B, 40)} y1={by(B, 10)} y2={by(B, 10)} stroke={PAPER} strokeWidth="3" strokeDasharray="10 10" />
          <Route f={schlange} u1={bad ? 1 : ug} col={COL.forest} w={bad ? 6 : 10} o={bad ? 0.35 : 1} />
          {bad && <Route f={schlangeFalsch} u1={ub} col={COL.rust} />}
          <Rider f={bad ? schlangeFalsch : schlange} u={bad ? ub : ug} t={t} />
        </TopBahn>
        {!bad && <Pop t={t} a={s2 + 0.4} x={540} y={1300} text="Beispiel: 3 gleich große Bögen" fill={COL.forest} size={34} />}
        {bad && <Big t={t} a={S("11") + 0.2} lines={["3 Bögen?", "Heute: 4,7."]} y={1320} size={84} col={COL.rust} />}
      </g>
    );
  } else if (t < fin) {
    const uz = ((t - s1) * 0.6) % 1;
    const tags = ["Balance", "Biegung", "Spurtreue", "Kontrolle"];
    const pos: P[] = [[260, 1400], [820, 1400], [260, 1520], [820, 1520]];
    scene = (
      <g>
        <Rank t={t} a={s1} n={1} title="Volte" />
        <TopBahn b={B}>
          <Route f={zirkel} u1={1} col={COL.forest} w={5} o={t < S("13") ? 0.25 : 0} dash="10 10" />
          <Route f={volte} u1={u(t, s1, 0.6)} col={COL.forest} w={10} />
          <Rider f={volte} u={uz} t={t} bend={10} />
        </TopBahn>
        {t < S("13") - 0.05 && <Big t={t} a={S("12") + 0.8} lines={["„Sieht aus wie ein kleiner Zirkel.“"]} y={1340} size={58} />}
        {t >= S("13") - 0.05 && t < S("14") - 0.05 && <Big t={t} a={S("13") - 0.05} lines={["Kleiner ≠ leichter."]} y={1360} size={100} col={COL.rust} shake={10} />}
        {t >= S("14") - 0.05 && (
          <g>
            <T x={540} y={1300} size={40} font={FONT_BODY} weight={800} color={COL.inkSoft}>Je enger die Linie, desto wichtiger:</T>
            {tags.map((tg, i) => <Pop key={tg} t={t} a={S("14") + 0.2 + i * 0.35} x={pos[i][0]} y={pos[i][1]} text={tg} fill={i % 2 ? COL.honey : COL.forest} color={i % 2 ? COL.forestDeep : PAPER} size={40} />)}
          </g>
        )}
      </g>
    );
  } else {
    const opts = ["Zirkel", "Schlangenlinie", "Volte", "Ich treffe grundsätzlich keinen Buchstaben"];
    scene = (
      <g>
        <Big t={t} a={fin} lines={["Welche Bahnfigur zerstört", "regelmäßig deine", "komplette Planung?"]} y={300} size={80} />
        {opts.map((o, i) => {
          const k = back((t - fin - 0.6 - i * 0.3) / 0.3);
          if (k <= 0.01) return null;
          const y = 760 + i * 150;
          const w = i === 3 ? 900 : 560;
          return (
            <g key={o} opacity={Math.min(1, k)} transform={`translate(540 ${y}) scale(${Math.max(0.01, k)}) translate(-540 ${-y})`}>
              <rect x={540 - w / 2} y={y - 58} width={w} height={110} rx="55" fill={i === 3 ? COL.rust : PAPER} stroke={COL.forest} strokeWidth="5" />
              <T x={540} y={y + 14} size={i === 3 ? 38 : 50} font={i === 3 ? FONT_BODY : undefined} weight={800} color={i === 3 ? PAPER : COL.forestDeep}>{o}</T>
            </g>
          );
        })}
        <g opacity={ease((t - fin - 1.9) / 0.3)}>
          <T x={540} y={1440} size={44} color={COL.forest}>Schreib's in die Kommentare ↓</T>
        </g>
        <g opacity={ease((t - fin - 2.4) / 0.4)}>
          <T x={540} y={1720} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>Bahnfiguren + Hilfengebung lernst du Schritt für Schritt</T>
          <T x={540} y={1764} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>in der Hofgeschichten Reitakademie.</T>
        </g>
        <BrandLine t={t} a={fin + 2.4} text="Hofgeschichten | Die Reitakademie" y={1850} />
      </g>
    );
  }
  const cuts = [s5, S("04") - 0.05, s4, S("06") - 0.05, s3, S("08") - 0.05, S("09") - 0.05, s2, S("11") - 0.05, s1, S("13") - 0.05, fin];
  const rank = t < s4 ? 5 : t < s3 ? 4 : t < s2 ? 3 : t < s1 ? 2 : 1;
  return <Frame t={t} cuts={cuts} progress={{ a: s5, b: fin, label: `#${rank}` }}>{scene}</Frame>;
}
