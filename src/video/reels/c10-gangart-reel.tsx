import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, NodHorse, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, win } from "./nov-kit";
import { Arena, LOOK_S, Takt, groundSpeed } from "./n2-kit";

/* Ton-Quiz R10 (9:16): „Welche Gangart ist das?“ (comp `gangart`). Hörproben sind selbst erzeugte Hufschläge,
   im Ton als Pausen eingeschnitten (GAP je Probe). Reihenfolge: 1 = Trab, 2 = Galopp, 3 = Schritt. */

export const GA_GAP = 4.4;
const G = GA_GAP;
/** Schnittpunkte in der Original-Aufnahme (s), an denen je eine Pause G eingefügt wird */
export const GA_CUTS = [3.26, 4.3, 5.26];
const REC: Array<[string, string, number, number]> = [
  ["a1", "Hör mal genau hin:", 0, 1.31],
  ["a2", "Welche Gangart ist das?", 1.65, 3.09],
  ["b1", "Und die hier?", 3.43 + G, 4.09 + G],
  ["c1", "Und die?", 4.56 + 2 * G, 5.08 + 2 * G],
  ["d0", "Auflösung:", 5.5 + 3 * G, 6.28 + 3 * G],
  ["d1", "Schritt – vier Takte.", 6.55 + 3 * G, 8.11 + 3 * G],
  ["d2", "Trab –", 8.47 + 3 * G, 8.93 + 3 * G],
  ["d3", "zwei Takte.", 9.2 + 3 * G, 10.01 + 3 * G],
  ["d4", "Galopp –", 10.37 + 3 * G, 10.8 + 3 * G],
  ["d5", "drei Takte und eine Schwebephase.", 11.07 + 3 * G, 13.32 + 3 * G],
  ["e1", "Wie viele hattest du richtig? Schreib's in die Kommentare!", 13.73 + 3 * G, 16.67 + 3 * G],
];
export const GA_LINES = mkLines(REC);
const L = GA_LINES;
export const GA_TOTAL = E(L, "e1") + 2.6;

export type Pat = { cycle: number; beats: number[]; labels: string[] };
export const PAT: Record<"schritt" | "trab" | "galopp", Pat> = {
  schritt: { cycle: 1.12, beats: [0, 0.28, 0.56, 0.84], labels: ["1", "2", "3", "4"] },
  trab: { cycle: 0.72, beats: [0, 0.36], labels: ["1", "2"] },
  galopp: { cycle: 0.78, beats: [0, 0.14, 0.28], labels: ["1", "2", "3"] },
};
/** Hörproben im End-Zeitstrahl (inkl. 0,4 s Stimmversatz): Start, Dauer, Gangart */
export const GA_SAMPLES: Array<{ a: number; d: number; g: keyof typeof PAT }> = GA_CUTS.map((c, i) => ({
  a: c + i * G + 0.4 + 0.15,
  d: G - 0.35,
  g: (["trab", "galopp", "schritt"] as const)[i],
}));

function Curtain({ t, i }: { t: number; i: number }) {
  const s = GA_SAMPLES[i];
  const p = PAT[s.g];
  const tt = t - s.a;
  const playing = tt >= 0 && tt <= s.d;
  return (
    <g>
      <rect x={90} y={620} width={900} height={760} rx="50" fill={COL.forestDeep} />
      {Array.from({ length: 9 }, (_, k) => (
        <path key={k} d={`M${140 + k * 100} 640 Q${165 + k * 100} 1000 ${140 + k * 100} 1360`} stroke="#000" strokeOpacity=".12" strokeWidth="14" fill="none" />
      ))}
      <T x={540} y={760} size={40} font={FONT_BODY} weight={800} color={COL.honey}>{`Hörprobe ${i + 1}`}</T>
      <T x={540} y={1010} size={220} color={PAPER} o={0.92}>?</T>
      {/* Ton-Wellen */}
      {playing && [0, 1, 2].map((k) => {
        const ph = ((tt - k * 0.25) % 0.75) / 0.75;
        return <circle key={k} cx={540} cy={940} r={170 + ph * 160} fill="none" stroke={COL.honey} strokeWidth="6" opacity={(1 - ph) * 0.6} />;
      })}
      <Takt t={Math.max(0, tt)} cycle={p.cycle} beats={p.beats} labels={p.beats.map(() => "•")} col={COL.honey} y={1230} o={playing ? 1 : 0.4} />
      <T x={540} y={1330} size={28} font={FONT_BODY} weight={700} color={PAPER} o={0.8}>🔊 Ton an!</T>
    </g>
  );
}

export function renderGangart(t: number) {
  const quizEnd = S(L, "d0") - 0.15;
  const cur = t < S(L, "b1") - 0.2 ? 0 : t < S(L, "c1") - 0.2 ? 1 : 2;
  const res = t > S(L, "d0") - 0.15;
  const gNow: "schritt" | "trab" | "galopp" = t < S(L, "d2") - 0.1 ? "schritt" : t < S(L, "d4") - 0.1 ? "trab" : "galopp";
  const gait = gNow === "galopp" ? ("galopp-links" as const) : gNow;
  const pl = { x: 540 - 160 * 2.3, y: 1360 - 285 * 2.3, k: 2.3 };
  const resO = win(t, S(L, "d0") - 0.15, S(L, "e1") - 0.1, 0.3);
  const map: Array<[string, string, string]> = [
    ["1", "Trab", "d2"],
    ["2", "Galopp", "d4"],
    ["3", "Schritt", "d1"],
  ];
  const segA = gNow === "schritt" ? S(L, "d1") : gNow === "trab" ? S(L, "d2") : S(L, "d4");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {!res && <g opacity={win(t, -1, quizEnd, 0.3)}><Curtain t={t} i={cur} /></g>}
      {/* Rate-Pillen 1/2/3 */}
      <g opacity={win(t, 0.3, quizEnd)}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${300 + i * 240} 1500)`}>
            <circle r="52" fill={i === cur ? COL.honey : i < cur ? COL.forest : COL.sandLight} />
            <T x={0} y={18} size={50} color={i === cur ? COL.forestDeep : i < cur ? PAPER : COL.brown}>{String(i + 1)}</T>
          </g>
        ))}
      </g>
      {resO > 0.01 && (
        <g opacity={resO}>
          <Arena t={t} speed={groundSpeed(gait, pl.k)} y={pl.y + 285 * pl.k} />
          <NodHorse t={t} pl={pl} look={LOOK_S} gait={gait} id="ga" nod={6} slices={18} />
          <Takt t={t - segA} cycle={PAT[gNow].cycle} beats={PAT[gNow].beats} labels={PAT[gNow].labels} col={COL.forest} y={620} o={win(t, S(L, "d1"), 99)} />
          {gNow === "galopp" && t > S(L, "d5") + 1.0 && <Pop t={t} a={S(L, "d5") + 1.0} x={540} y={720} text="+ Schwebephase ✈" fill={COL.honey} color={COL.forestDeep} size={32} />}
          {map.map(([n, name, id], i) => {
            const k = back((t - S(L, id) - 0.1) / 0.4);
            if (k <= 0.001) return null;
            const on = gNow === name.toLowerCase();
            return (
              <g key={n} transform={`translate(${210 + i * 330} 1560) scale(${k})`}>
                <rect x={-145} y={-50} width={290} height={100} rx="50" fill={on ? COL.forest : PAPER} stroke={COL.forest} strokeWidth="5" />
                <T x={0} y={14} size={36} font={FONT_BODY} weight={800} color={on ? PAPER : COL.forestDeep}>{`${n} = ${name}`}</T>
              </g>
            );
          })}
        </g>
      )}
      {t > S(L, "e1") - 0.2 && (
        <g>
          <CommentCard t={t} a={S(L, "e1") - 0.1} lines={["Wie viele hattest", "du richtig?"]} sub="1, 2 oder 3 – schreib's in die Kommentare" y={700} />
          <Brand t={t} a={S(L, "e1") + 1.2} y={1460} />
        </g>
      )}
      <Header t={t} label="Die Hofgeschichten · Ton-Quiz" hide={win(t, 0, E(L, "a2") + 0.2)} />
      <HookText t={t} end={E(L, "a2") + 0.2} y0={300} lines={[
        { text: "Hör mal genau hin 🎧", at: -0.9, size: 76 },
        { text: "Welche GANGART ist das?", at: S(L, "a2") - 0.1, hi: true, size: 68 },
      ]} />
      <Title t={t} a={E(L, "a2") + 0.2} b={quizEnd} top={`Hörprobe ${cur + 1} von 3`} sub="Schritt, Trab oder Galopp?" color={COL.forestDeep} y={400} />
      <Title t={t} a={S(L, "d0")} b={S(L, "e1") - 0.1} top="Auflösung" sub="Schritt 4 · Trab 2 · Galopp 3 Takte" color={COL.forest} y={400} />
      <Caption t={t} lines={L} skip={["a1", "a2", "b1", "c1", "d0", "d2", "d4", "e1"]} y={1720} />
    </svg>
  );
}
