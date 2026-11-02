import { LOOKS, TopHorse } from "./top";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, W, H, along, back, clamp01, ease, mkLines, samplePath, sm, win } from "./nov-kit";

/* November 06 (9:16, Rätsel): „Kennst du diese 5 Bahnfiguren?“ – immer dieselbe Bahn 20 × 40 m von oben
   (Buchstaben wie in der App: K E H oben, F B M unten, A links, C rechts). Je Figur: Pferd reitet die Linie,
   ~2 s Ratezeit (im Schnitt eingefügt), dann der Name. Linienführung nach den Hufschlagfiguren:
   1 Aus der Ecke kehrt (halbe Volte 10 m aus der Ecke, schräg zurück zur langen Seite bei E, Handwechsel)
   2 Durch den Zirkel wechseln (zwei halbe Volten durch die Zirkelmitte)  3 Schlangenlinien, 3 Bögen
   4 Einfache Schlangenlinie an der langen Seite (5 m tief bei E, von H bis K, ohne Handwechsel)
   5 Aus dem Zirkel wechseln (bei X vom einen in den anderen Zirkel). */

/** Zeiten aus der Aufnahme, Ratepausen (je 2,0 s) nach „Nummer …:“ eingefügt */
const REC: Array<[string, string, number, number]> = [
  ["p1", "Du kennst Zirkel, ganze Bahn und durch die ganze Bahn wechseln?", 0, 3.93],
  ["p2", "Dann wird es jetzt schwieriger!", 4.28, 5.79],
  ["p3", "Kennst du auch diese fünf Hufschlagfiguren?", 6.18, 8.37],
  ["n1", "Nummer eins:", 8.79, 9.56],
  ["f1", "Aus der Ecke kehrt.", 11.84, 12.99],
  ["n2", "Nummer zwei:", 13.41, 14.2],
  ["f2", "Durch den Zirkel wechseln.", 16.51, 17.88],
  ["n3", "Nummer drei:", 18.3, 19.0],
  ["f3", "Schlangenlinien durch die Bahn mit drei Bögen.", 21.3, 23.83],
  ["n4", "Nummer vier:", 24.24, 24.93],
  ["f4", "Eine einfache Schlangenlinie an der langen Seite.", 27.28, 29.89],
  ["n5", "Und Nummer fünf:", 30.22, 31.21],
  ["f5", "Aus dem Zirkel wechseln.", 33.44, 34.78],
  ["q1", "Na, wie viele hättest du ohne die Auflösung erkannt?", 35.16, 38.13],
  ["q2", "Schreib deine Punktzahl in die Kommentare!", 38.43, 40.46],
];
export const N06_LINES = mkLines(REC);
const L = N06_LINES;
export const N06_TOTAL = E(L, "q2") + 2.6;

/* ---------- Bahn ---------- */
const M = 24;
const AX = 60;
const AY = 650;
const px = (m: number) => AX + m * M;
const py = (m: number) => AY + m * M;
const P = (x: number, y: number) => `${px(x)} ${py(y)}`;
const R = (r: number) => `${r * M} ${r * M}`;

type Fig = { name: string; d: string; faint?: string[] };
const FIGS: Fig[] = [
  {
    name: "Aus der Ecke kehrt",
    d: `M${P(14, 1)} L${P(34, 1)} A${R(5)} 0 0 1 ${P(34, 11)} L${P(20, 1)} L${P(10, 1)}`,
  },
  {
    name: "Durch den Zirkel wechseln",
    d: `M${P(19.4, 10)} A${R(9.4)} 0 0 0 ${P(10, 0.6)} A${R(4.7)} 0 0 0 ${P(10, 10)} A${R(4.7)} 0 0 1 ${P(10, 19.4)} A${R(9.4)} 0 0 1 ${P(0.6, 10)}`,
    faint: [`M${P(10, 0.6)} A${R(9.4)} 0 1 0 ${px(10) + 1} ${py(0.6)}`],
  },
  {
    name: "Schlangenlinien durch die Bahn · 3 Bögen",
    d: (() => {
      const w = 38 / 3;
      const xs = [0, 1, 2, 3].map((i) => 1 + i * w);
      let d = `M${P(1, 16)} L${P(1, 10)}`;
      const ys = [1, 19, 1];
      for (let i = 0; i < 3; i++) d += ` Q${P(xs[i], ys[i])} ${P((xs[i] + xs[i + 1]) / 2, ys[i])} Q${P(xs[i + 1], ys[i])} ${P(xs[i + 1], 10)}`;
      return d + ` L${P(39, 16)}`;
    })(),
  },
  {
    name: "Einfache Schlangenlinie an der langen Seite",
    d: `M${P(39, 1)} L${P(34, 1)} C${P(27, 1)} ${P(27, 6)} ${P(20, 6)} C${P(13, 6)} ${P(13, 1)} ${P(6, 1)} L${P(1.5, 1)}`,
  },
  {
    name: "Aus dem Zirkel wechseln",
    d: `M${P(10.5, 0.5)} A${R(9.5)} 0 1 0 ${P(20, 10)} A${R(9.5)} 0 1 1 ${P(29.5, 19.5)}`,
    faint: [`M${P(10.5, 0.5)} A${R(9.5)} 0 1 0 ${px(10.5) + 1} ${py(0.5)}`, `M${P(29.5, 0.5)} A${R(9.5)} 0 1 0 ${px(29.5) + 1} ${py(0.5)}`],
  },
];
const KNOWN = [
  `M${P(1, 1)} H${px(39)} V${py(19)} H${px(1)} Z`,
  `M${P(10, 0.6)} A${R(9.4)} 0 1 0 ${px(10) + 1} ${py(0.6)}`,
  `M${P(2, 19)} Q${P(6, 19)} ${P(6.5, 18.5)} L${P(33.5, 1.5)} Q${P(34, 1)} ${P(38, 1)}`,
];

function Arena() {
  const letters: Array<[string, number, number]> = [["A", px(0) - 30, py(10) + 12], ["C", px(40) + 30, py(10) + 12], ["K", px(6), py(0) - 16], ["E", px(20), py(0) - 16], ["H", px(34), py(0) - 16], ["F", px(6), py(20) + 42], ["B", px(20), py(20) + 42], ["M", px(34), py(20) + 42]];
  return (
    <g>
      <rect x={px(0)} y={py(0)} width={40 * M} height={20 * M} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth="12" />
      <rect x={px(1)} y={py(1)} width={38 * M} height={18 * M} rx="20" fill="none" stroke="#CDB68F" strokeWidth="14" opacity=".6" />
      <circle cx={px(20)} cy={py(10)} r="5" fill={COL.brown} opacity=".5" />
      {letters.map(([l, x, y]) => (
        <T key={l} x={x} y={y} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l}</T>
      ))}
    </g>
  );
}

function Rider({ d, u }: { d: string; u: number }) {
  const a = along(d, u);
  const b = along(d, Math.min(1, u + 0.02));
  let turn = b.ang - a.ang;
  if (turn > 180) turn -= 360;
  if (turn < -180) turn += 360;
  return <TopHorse at={a.p} ang={a.ang} look={LOOKS.tonga} step={u * 8} s={0.95} bend={Math.max(-14, Math.min(14, turn * 2.2))} />;
}

function FigLine({ d, u, col, w = 9 }: { d: string; u: number; col: string; w?: number }) {
  const { len } = samplePath(d);
  if (u <= 0.005) return null;
  return (
    <g>
      <path d={d} fill="none" stroke={PAPER} strokeWidth={w + 8} strokeLinecap="round" strokeDasharray={`${len * u} ${len}`} opacity=".8" />
      <path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${len * u} ${len}`} />
    </g>
  );
}

export function renderN06(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookO = win(t, 0, E(L, "p2") + 0.1);
  const endA = S(L, "q1") - 0.2;
  const endO = win(t, endA, N06_TOTAL + 1);
  const hideHead = Math.max(hookO, endO);
  const cur = [1, 2, 3, 4, 5].reduce((c, i) => (t >= S(L, `n${i}`) - 0.2 ? i : c), 0);
  const knownO = win(t, S(L, "p1"), E(L, "p3"));
  const knownAt = [S(L, "p1") + 0.5, S(L, "p1") + 1.3, S(L, "p1") + 2.6];

  // aktuelle Figur
  let figEl = null;
  if (cur > 0) {
    const i = cur - 1;
    const f = FIGS[i];
    const a = S(L, `n${cur}`) + 0.15;
    const nameA = S(L, `f${cur}`) - 0.05;
    const next = cur < 5 ? S(L, `n${cur + 1}`) - 0.2 : endA;
    const u = sm((t - a) / (nameA + 0.5 - a));
    const o = win(t, a - 0.15, next, 0.3);
    const named = back((t - nameA) / 0.45);
    const guess = win(t, E(L, `n${cur}`), nameA, 0.2);
    figEl = (
      <g opacity={o}>
        {f.faint?.map((d, j) => <path key={j} d={d} fill="none" stroke={COL.honey} strokeWidth="5" strokeDasharray="12 12" opacity=".55" />)}
        <FigLine d={f.d} u={u} col={named > 0.01 ? COL.forest : COL.rust} />
        <Rider d={f.d} u={u} />
        {/* Nummer */}
        <g transform={`translate(540 520)`}>
          <circle r={70} fill={COL.honey} />
          <T x={0} y={26} size={80} color={COL.forestDeep}>{String(cur)}</T>
        </g>
        {guess > 0.01 && (
          <g opacity={guess}>
            <T x={540} y={1300} size={52} color={COL.rust}>Rate mal … 🤔</T>
            <circle cx={540} cy={1380} r={30} fill="none" stroke={COL.sand} strokeWidth="8" />
            <circle cx={540} cy={1380} r={30} fill="none" stroke={COL.rust} strokeWidth="8" strokeDasharray={`${188 * clamp01((t - E(L, `n${cur}`)) / (nameA - E(L, `n${cur}`)))} 200`} transform="rotate(-90 540 1380)" />
          </g>
        )}
        {named > 0.01 && (
          <g opacity={Math.min(1, named)} transform={`translate(540 1300) scale(${Math.max(0.01, named)}) translate(-540 -1300)`}>
            {(() => {
              const size = f.name.length > 30 ? 34 : 44;
              const w = Math.min(1000, f.name.length * size * 0.56 + 80);
              return (
                <g>
                  <rect x={540 - w / 2} y={1240} width={w} height={110} rx="55" fill={COL.forest} />
                  <T x={540} y={1310} size={size} font={FONT_BODY} weight={700} color={PAPER}>{f.name}</T>
                </g>
              );
            })()}
          </g>
        )}
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={1 - sm((t - endA) / 0.4) * 0.8}>
        <Arena />
        {knownO > 0 && (
          <g opacity={knownO * (1 - sm((t - S(L, "p2")) / 0.4) * 0.6)}>
            {KNOWN.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={COL.forest} strokeWidth="6" opacity={ease((t - knownAt[i]) / 0.4) * 0.6} strokeDasharray="14 10" />
            ))}
            <Pop t={t} a={knownAt[1]} x={250} y={1300} text="Zirkel ✓" fill={COL.forest} size={32} />
            <Pop t={t} a={knownAt[0]} x={540} y={1300} text="ganze Bahn ✓" fill={COL.forest} size={32} />
            <Pop t={t} a={knownAt[2]} x={540} y={1410} text="durch die ganze Bahn wechseln ✓" fill={COL.forest} size={32} />
          </g>
        )}
        {figEl}
        {/* Punkte 1–5 */}
        {cur > 0 && (
          <g>
            {[1, 2, 3, 4, 5].map((i) => {
              const done = i < cur || (i === cur && t >= S(L, `f${i}`) - 0.05);
              const x = 540 + (i - 3) * 110;
              return (
                <g key={i}>
                  <circle cx={x} cy={1480} r={i === cur ? 34 : 26} fill={done ? COL.forest : PAPER} stroke={i === cur ? COL.rust : COL.sand} strokeWidth="5" />
                  <T x={x} y={1492} size={i === cur ? 34 : 28} font={FONT_BODY} weight={700} color={done ? PAPER : COL.brown}>{String(i)}</T>
                </g>
              );
            })}
          </g>
        )}
      </g>
      {win(t, S(L, "p2"), E(L, "p2") + 0.1) > 0 && (
        <g opacity={win(t, S(L, "p2"), E(L, "p2") + 0.1)}>
          <g opacity={ease((t - S(L, "p2")) / 0.35)} transform={`translate(540 520) scale(${0.9 + 0.1 * ease((t - S(L, "p2")) / 0.35)}) translate(-540 -520)`}>
            <T x={540} y={540} size={72} color={COL.rust}>Jetzt wird’s schwieriger!</T>
          </g>
        </g>
      )}
      {endO > 0 && (
        <g opacity={endO}>
          <g opacity={ease((t - endA) / 0.4)}>
            <T x={540} y={290} size={64}>Wie viele hättest du</T>
            <T x={540} y={370} size={64}>ohne Auflösung erkannt?</T>
          </g>
          {(() => {
            const k = back((t - endA - 0.4) / 0.5);
            return (
              <g opacity={Math.min(1, k)} transform={`translate(540 620) scale(${Math.max(0.01, k)}) translate(-540 -620)`}>
                <circle cx={540} cy={620} r={170 + 6 * pulse} fill={COL.honey} />
                <T x={540} y={680} size={170} color={COL.forestDeep}>?/5</T>
              </g>
            );
          })()}
          <CommentCard t={t} a={S(L, "q2") - 0.1} lines={["5/5? Oder war eine dabei,", "die du noch nie geritten bist? 👀"]} sub="Schreib deine Punktzahl in die Kommentare 👇" y={880} />
          <Brand t={t} a={S(L, "q2") + 0.5} sub="Bahnfiguren · Reitakademie · Link in der Bio" y={1260} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Bahnfiguren-Quiz" hide={hideHead} />
      <HookText t={t} end={E(L, "p2") + 0.1} size={76} gap={92} y0={230} lines={[
        { text: "Diese 5 Hufschlagfiguren", at: -0.9 },
        { text: "kennen selbst manche", at: 0.5 },
        { text: "erfahrene Reiter nicht!", at: 1.2, hi: true },
      ]} />
      {win(t, S(L, "p3"), E(L, "p3") + 0.3) > 0 && (
        <g opacity={win(t, S(L, "p3"), E(L, "p3") + 0.3)}>
          <T x={540} y={300} size={70}>Kennst du diese</T>
          <T x={540} y={390} size={70} color={COL.rust}>5 Hufschlagfiguren?</T>
        </g>
      )}
      <Caption t={t} lines={L} skip={["p1", "p2", "p3", "q1", "q2"]} y={1600} />
    </svg>
  );
}
