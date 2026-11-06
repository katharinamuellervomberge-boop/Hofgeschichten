import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, sm, win, wordAt } from "./nov-kit";
import { LOOKS, TopHorse } from "./top";
import { TopBahn, along, bx, by, pathD, type Bahn } from "./n2-kit";

/* Community-Reel R6 (9:16): „Zirkel, Volte, Kehrtvolte“ (comp `figuren`) – Speicher-Erklärer von oben.
   Viereck 20 × 40, linke Hand. Zirkel am A-Ende (Kreis über die ganze Bahnbreite), Volte bei E/B (kleiner Kreis,
   gleiche Hand), Kehrtvolte (halbe Volte + schräg zurück zum Hufschlag → rechte Hand). Volten ohne Meterangabe. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Zirkel, Volte, Kehrtvolte –", 0, 2.54],
  ["a2", "die meisten verwechseln sie.", 2.88, 4.42],
  ["a3", "Speichern!", 4.69, 5.39],
  ["b1", "Der Zirkel: ein großer Kreis, meist zwanzig Meter, an einem Ende oder in der Mitte der Bahn.", 5.86, 11.88],
  ["c1", "Die Volte: ein kleiner Kreis – du kommst an derselben Stelle wieder an und bleibst auf der gleichen Hand.", 12.33, 18.06],
  ["d0", "Die Kehrtvolte:", 18.49, 19.48],
  ["d1", "ein halber kleiner Kreis und dann schräg zurück zum Hufschlag –", 19.74, 23.19],
  ["d2", "danach reitest du auf der anderen Hand.", 23.55, 26.14],
  ["e1", "Und jetzt du:", 26.54, 27.29],
  ["e2", "Welche Figur war das?", 27.59, 28.78],
  ["e3", "Antwort in die Kommentare!", 29.1, 30.51],
];
export const FIG_LINES = mkLines(REC);
const L = FIG_LINES;
export const FIG_TOTAL = E(L, "e3") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const B: Bahn = { x: 60, y: 760, m: 24 };
const TY = 19.1; // Hufschlag unten
const TAU = Math.PI * 2;
const zirkel = (u: number): [number, number] => [10 + 9.1 * Math.sin(TAU * u), 10 + 9.1 * Math.cos(TAU * u)];
const volte = (u: number): [number, number] => [20 + 4 * Math.sin(TAU * u), TY - 4 + 4 * Math.cos(TAU * u)];
/** Kehrtvolte: halbe Volte, schräg zurück zum Hufschlag, weiter auf der rechten Hand */
const ARC = Math.PI * 4;
const DIAG = Math.hypot(6, 8);
const RUN = 5;
const LEN = ARC + DIAG + RUN;
const kehrt = (u: number): [number, number] => {
  const s = u * LEN;
  if (s <= ARC) {
    const a = (s / ARC) * Math.PI;
    return [30 + 4 * Math.sin(a), TY - 4 + 4 * Math.cos(a)];
  }
  if (s <= ARC + DIAG) {
    const v = (s - ARC) / DIAG;
    return [30 - 6 * v, TY - 8 + 8 * v];
  }
  const v = (s - ARC - DIAG) / RUN;
  return [24 - RUN * v, TY];
};

function Fig({ t, a, d, f, col, name, show = true, nx }: { t: number; a: number; d: number; f: (u: number) => [number, number]; col: string; name?: string; label?: string; show?: boolean; nx?: number }) {
  const u = Math.min(1, Math.max(0, (t - a) / d));
  if (t < a - 0.1) return null;
  const { p, ang } = along(B, f, Math.min(0.999, sm(u) * 0.999 + 0.0005));
  const lp = f(0.25);
  return (
    <g>
      <path d={pathD(B, f, 160, Math.max(0.002, sm(u)))} fill="none" stroke={col} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      {u < 1 && show && <TopHorse at={p} ang={ang} look={LOOKS.tivoli} step={t * 1.4} s={1.5} bend={-6} />}
      {u >= 1 && <circle cx={bx(B, f(1)[0])} cy={by(B, f(1)[1])} r="12" fill={col} />}
      {name && <Pop t={t} a={a + 0.2} x={bx(B, nx ?? lp[0])} y={1350} text={name} fill={col} size={34} />}
    </g>
  );
}

export function renderFiguren(t: number) {
  const hookEnd = E(L, "a3") + 0.15;
  const sceneO = win(t, -1, S(L, "e1") - 0.15, 0.3);
  const quizO = win(t, S(L, "e1") - 0.15, 99, 0.3);
  const hand = t > at("d2", "anderen") - 0.2 ? "rechte Hand" : "linke Hand";
  const handK = back((t - at("d2", "anderen") + 0.2) / 0.4);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={sceneO}>
        <TopBahn b={B} />
        {/* Hook: alle drei Figuren als Vorschau */}
        <g opacity={win(t, -1, S(L, "b1") - 0.2, 0.3)}>
          <Fig t={t} a={0.1} d={1.2} f={zirkel} col={COL.forest} />
          <Fig t={t} a={0.9} d={1.0} f={volte} col={COL.honey} />
          <Fig t={t} a={1.7} d={1.2} f={kehrt} col={COL.rust} />
          <g opacity={win(t, 2.9, S(L, "b1") - 0.2)}>
            <T x={bx(B, 10)} y={by(B, 10) + 22} size={70} color={COL.forestDeep}>?</T>
            <T x={bx(B, 20)} y={by(B, 15) + 22} size={56} color={COL.forestDeep}>?</T>
            <T x={bx(B, 30)} y={by(B, 13) + 22} size={56} color={COL.forestDeep}>?</T>
          </g>
        </g>
        <g opacity={win(t, S(L, "b1") - 0.2, S(L, "e1") - 0.15, 0.3)}>
          <Fig t={t} a={S(L, "b1") + 0.3} d={3.2} f={zirkel} col={COL.forest} name="Zirkel" nx={8} />
          <Fig t={t} a={S(L, "c1") + 0.4} d={2.6} f={volte} col={COL.honey} name="Volte" nx={20} />
          <Fig t={t} a={S(L, "d0") + 0.2} d={3.6} f={kehrt} col={COL.rust} name="Kehrtvolte" nx={32} />
        </g>
        <g opacity={win(t, S(L, "b1"), S(L, "e1") - 0.2)}>
          <g transform={`translate(540 1460) scale(${t > at("d2", "anderen") - 0.2 ? Math.max(0.01, handK) : 1})`}>
            <rect x={-170} y={-40} width={340} height={70} rx="35" fill={t > at("d2", "anderen") - 0.2 ? COL.rust : COL.forest} />
            <T x={0} y={8} size={34} font={FONT_BODY} weight={800} color={PAPER}>{hand}</T>
          </g>
        </g>
        <Pop t={t} a={S(L, "a3") - 0.1} x={540} y={600} text="📌 Speichern für die Reitstunde" fill={COL.honey} color={COL.forestDeep} size={36} o={win(t, S(L, "a3") - 0.1, S(L, "b1") + 0.5)} />
      </g>
      {/* Quiz */}
      {quizO > 0.01 && (
        <g opacity={quizO}>
          <TopBahn b={B} />
          {(() => {
            // gespiegelte Kehrtvolte (anderes Bild als zuvor)
            const f = (u: number): [number, number] => {
              const [x, y] = kehrt(u);
              return [40 - x, y];
            };
            return <Fig t={t} a={S(L, "e1")} d={2.4} f={f} col={COL.forestDeep} show />;
          })()}
          <T x={540} y={1420} size={130} color={COL.rust}>?</T>
          <g opacity={ease((t - S(L, "e2")) / 0.3)}>
            {["Zirkel", "Volte", "Kehrtvolte"].map((s, i) => (
              <Pop key={s} t={t} a={S(L, "e2") + i * 0.15} x={210 + i * 330} y={1540} text={s} fill={COL.forest} size={34} />
            ))}
          </g>
          <Brand t={t} a={S(L, "e3") + 0.4} y={1640} />
        </g>
      )}
      <Header t={t} label="Die Hofgeschichten · Reitbahn" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "Zirkel, Volte, Kehrtvolte", at: -0.9, size: 80 },
        { text: "die meisten VERWECHSELN sie", at: S(L, "a2") - 0.1, hi: true, size: 58 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={E(L, "b1") + 0.2} top="Der Zirkel" sub="großer Kreis · meist 20 m · am Ende oder in der Mitte" color={COL.forest} y={400} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c1") + 0.2} top="Die Volte" sub="kleiner Kreis · gleiche Stelle · gleiche Hand" color={COL.brown} y={400} />
      <Title t={t} a={S(L, "d0")} b={E(L, "d2") + 0.2} top="Die Kehrtvolte" sub="halbe Volte · schräg zurück · neue Hand" color={COL.rust} y={400} />
      <Title t={t} a={S(L, "e1")} b={99} top="Und jetzt du:" sub="Welche Figur war das?" color={COL.forestDeep} y={400} />
      <Caption t={t} lines={L} skip={["a1", "a2", "a3", "d0", "e1", "e2", "e3"]} y={1700} />
    </svg>
  );
}
