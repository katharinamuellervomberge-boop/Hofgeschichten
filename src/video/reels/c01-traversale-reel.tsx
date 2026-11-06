import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, mkLines, sm, win, wordAt } from "./nov-kit";
import { Merk } from "./rkit";
import { LOOKS, TopHorse, world, type Pt } from "./top";
import { TopBahn, bx, by, pathD, ReplySticker, type Bahn } from "./n2-kit";

/* Community-Reel R1 (9:16): „Schenkelweichen oder Traversale?“ (comp `traversale`)
   Zwei Vierecke von oben übereinander, gleiche schräge Linie (vorwärts-seitwärts).
   Oben Schenkelweichen: Stellung gegen die Bewegungsrichtung, nahezu gerade, keine Versammlung.
   Unten Traversale: Stellung + Längsbiegung in Bewegungsrichtung, Vorhand etwas voraus. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Schenkelweichen oder Traversale?", 0, 2.1],
  ["a2", "Von oben sieht man den Unterschied sofort.", 2.43, 4.88],
  ["b1", "Bei beiden geht dein Pferd vorwärts und seitwärts.", 5.28, 8.13],
  ["c1", "Beim Schenkelweichen ist es leicht gegen die Bewegungsrichtung gestellt – und kaum gebogen.", 8.48, 13.2],
  ["d1", "Bei der Traversale ist es in die Bewegungsrichtung gestellt und gebogen.", 13.57, 17.47],
  ["d2", "Die Vorhand geht dabei etwas voraus.", 17.86, 20.33],
  ["e1", "Schenkelweichen lockert und lehrt die Schenkelhilfe.", 20.71, 23.61],
  ["e2", "Die Traversale ist eine versammelnde Lektion.", 23.99, 26.57],
  ["f0", "Merke:", 27.0, 27.54],
  ["f1", "Schenkelweichen lockert –", 27.94, 29.39],
  ["f2", "die Traversale versammelt.", 29.7, 31.29],
  ["g1", "Welche Frage sollen wir als Nächstes beantworten?", 31.71, 34.05],
  ["g2", "Schreib sie in die Kommentare!", 34.35, 35.79],
];
export const TRAV_LINES = mkLines(REC);
const L = TRAV_LINES;
export const TRAV_TOTAL = E(L, "g2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const B1: Bahn = { x: 80, y: 570, m: 23 };
const B2: Bahn = { x: 80, y: 1200, m: 23 };
/** gleiche Linie: vom Mittelbereich schräg zum Hufschlag (Meter) */
const X0 = 6;
const X1 = 34;
const Y0 = 9;
const Y1 = 18.5;
const line = (u: number): Pt => [X0 + (X1 - X0) * u, Y0 + (Y1 - Y0) * u];
const CYCLE = 5.2;

function Lane({ t, b, kind, o, hl, z }: { t: number; b: Bahn; kind: "sw" | "tr"; o: number; hl: number; z: number }) {
  const u = (t % CYCLE) / CYCLE;
  const uu0 = sm(Math.min(1, u / 0.9));
  const uu = uu0 + (0.5 - uu0) * sm(z);
  const [xm, ym] = line(uu);
  const pos0: Pt = [bx(b, xm), by(b, ym)];
  const cen: Pt = [bx(b, 20), by(b, 10)];
  const pos: Pt = [pos0[0] + (cen[0] - pos0[0]) * sm(z), pos0[1] + (cen[1] - pos0[1]) * sm(z)];
  const sw = kind === "sw";
  // Schenkelweichen: fast parallel zur langen Seite, Kopf leicht nach oben (weg von der Bewegung)
  // Traversale: Vorhand etwas voraus (Körper zeigt leicht nach unten), Stellung + Biegung nach unten (in Bewegungsrichtung)
  const ang = sw ? 1 : 9;
  const bend = sw ? -3 : 10;
  const poll = sw ? -15 : 13;
  const col = sw ? COL.rust : COL.forest;
  const s = 1.65 + 3.9 * sm(z);
  const P = (p: Pt) => world(pos, ang, s, p);
  // Körperlinie Schweif → Widerrist → Genick
  const tail = P([-30, 0]);
  const wither = P([14, 0]);
  const head = world(pos, ang + bend, s, [44, 0]);
  const mid = sw ? P([-8, 0]) : world(pos, ang + bend * 0.5, s, [-8, -6]);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g opacity={o}>
      <TopBahn b={b}>
        <g opacity={1 - 0.85 * sm(z)}>
          <path d={pathD(b, line)} fill="none" stroke={COL.honey} strokeWidth="6" strokeDasharray="14 12" opacity=".75" />
          <path d={pathD(b, line, 80, uu)} fill="none" stroke={col} strokeWidth="9" strokeLinecap="round" opacity=".8" />
        </g>
      </TopBahn>
      {/* Bewegungsrichtung (in der Nahaufnahme) */}
      {z > 0.05 && (
        <g opacity={sm(z)}>
          <path d={`M${cen[0] - 300} ${cen[1] - 150} L${cen[0] + 300} ${cen[1] + 150}`} stroke={COL.honey} strokeWidth="7" strokeDasharray="16 12" opacity=".8" />
          <path d={`M${cen[0] + 300} ${cen[1] + 150} l-34 -4 l14 -28 Z`} fill={COL.honey} />
        </g>
      )}
      <TopHorse at={pos} ang={ang} look={sw ? LOOKS.tonga : LOOKS.tivoli} step={t * 1.2} s={s} bend={bend} poll={poll} />
      {/* Körperlinie */}
      <g opacity={hl}>
        <path d={`M${tail[0]} ${tail[1]} Q${mid[0]} ${mid[1]} ${wither[0]} ${wither[1]} L${head[0]} ${head[1]}`} fill="none" stroke={col} strokeWidth="6" strokeDasharray="10 8" strokeLinecap="round" />
        <circle cx={head[0]} cy={head[1]} r={12 + 3 * pulse} fill="none" stroke={col} strokeWidth="4" />
      </g>
      <g transform={`translate(${bx(b, 20)} ${b.y - 46})`}>
        <rect x={-190} y={-38} width={380} height={64} rx="32" fill={col} />
        <T x={0} y={8} size={36} font={FONT_BODY} weight={800} color={PAPER}>{sw ? "Schenkelweichen" : "Traversale"}</T>
      </g>
    </g>
  );
}

export function renderTraversale(t: number) {
  const hookEnd = E(L, "a2") + 0.15;
  const lanesO = win(t, hookEnd - 0.3, S(L, "f0") - 0.2, 0.35);
  const hl1 = Math.max(win(t, S(L, "c1"), E(L, "c1") + 0.2), win(t, S(L, "e1"), E(L, "e1") + 0.1));
  const hl2 = Math.max(win(t, S(L, "d1"), E(L, "d2") + 0.2), win(t, S(L, "e2"), E(L, "e2") + 0.1));
  const dim1 = Math.max(win(t, S(L, "d1"), E(L, "d2") + 0.2), win(t, S(L, "e2"), E(L, "e2") + 0.1));
  const zoom = win(t, S(L, "c1") - 0.4, E(L, "e2") + 0.2, 0.6);
  const dim2 = Math.max(win(t, S(L, "c1"), E(L, "c1") + 0.2), win(t, S(L, "e1"), E(L, "e1") + 0.1));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* Hook: Kommentar */}
      <ReplySticker t={t} a={-0.2} b={hookEnd} name="lena.reitet" text={["Was ist der Unterschied zwischen", "Schenkelweichen und Traversale? 🤔"]} y={620} />
      {lanesO > 0.01 && (
        <g>
          <Lane t={t} b={B1} kind="sw" o={lanesO * (1 - 0.6 * dim1)} hl={hl1} z={zoom} />
          <Lane t={t} b={B2} kind="tr" o={lanesO * (1 - 0.6 * dim2)} hl={hl2} z={zoom} />
        </g>
      )}
      {/* b1: vorwärts + seitwärts */}
      {[B1, B2].map((b, i) => (
        <g key={i} opacity={win(t, at("b1", "vorwärts") - 0.2, E(L, "b1") + 0.2)}>
          <path d={`M${bx(b, 30)} ${by(b, 4)} h120`} stroke={COL.forest} strokeWidth="9" strokeLinecap="round" />
          <path d={`M${bx(b, 30) + 120} ${by(b, 4)} l-24 -16 l0 32 Z`} fill={COL.forest} />
          <path d={`M${bx(b, 36)} ${by(b, 2.5)} v90`} stroke={COL.honey} strokeWidth="9" strokeLinecap="round" />
          <path d={`M${bx(b, 36)} ${by(b, 2.5) + 90} l-16 -24 l32 0 Z`} fill={COL.honey} />
        </g>
      ))}
      <Pop t={t} a={at("b1", "vorwärts") - 0.1} x={540} y={540} text="vorwärts + seitwärts" fill={COL.forestDeep} size={34} o={win(t, at("b1", "vorwärts") - 0.1, E(L, "b1") + 0.2)} />
      {/* c1: Schenkelweichen */}
      <Pop t={t} a={at("c1", "gestellt") - 0.2} x={540} y={B1.y + 545} text="Stellung GEGEN die Bewegung" fill={COL.rust} size={32} o={win(t, at("c1", "gestellt") - 0.2, at("c1", "kaum") - 0.15)} />
      <Pop t={t} a={at("c1", "kaum") - 0.1} x={540} y={B1.y + 545} text="kaum gebogen" fill={COL.rust} size={32} o={win(t, at("c1", "kaum") - 0.1, E(L, "c1") + 0.2)} />
      {/* d: Traversale */}
      <Pop t={t} a={at("d1", "gestellt") - 0.2} x={540} y={B2.y + 530} text="Stellung + Biegung IN Bewegungsrichtung" fill={COL.forest} size={30} o={win(t, at("d1", "gestellt") - 0.2, at("d2", "Vorhand") - 0.15)} />
      <Pop t={t} a={at("d2", "Vorhand") - 0.1} x={540} y={B2.y + 530} text="Vorhand etwas voraus" fill={COL.forest} size={32} o={win(t, at("d2", "Vorhand") - 0.1, E(L, "d2") + 0.2)} />
      {/* e: Zweck */}
      <Pop t={t} a={at("e1", "lockert") - 0.2} x={540} y={B1.y + 545} text="lockert · lehrt die Schenkelhilfe" fill={COL.honey} color={COL.forestDeep} size={32} o={win(t, at("e1", "lockert") - 0.2, E(L, "e1") + 0.1)} />
      <Pop t={t} a={at("e2", "versammelnde") - 0.3} x={540} y={B2.y + 530} text="versammelnde Lektion" fill={COL.honey} color={COL.forestDeep} size={34} o={win(t, at("e2", "versammelnde") - 0.3, E(L, "e2") + 0.1)} />
      {/* Merksatz */}
      <g opacity={win(t, S(L, "f0") - 0.1, E(L, "f2") + 0.4)}>
        <Merk t={t} at={S(L, "f0") - 0.1} lines={["Schenkelweichen lockert –", "die Traversale versammelt."]} />
      </g>
      {/* Kommentar */}
      <g opacity={ease((t - S(L, "g1") + 0.2) / 0.3)}>
        <CommentCard t={t} a={S(L, "g1") - 0.1} lines={["Welche Frage sollen", "wir als Nächstes klären?"]} sub="Ab in die Kommentare 💬" y={760} />
        <Brand t={t} a={S(L, "g2")} />
      </g>
      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={300} lines={[
        { text: "Schenkelweichen", at: -0.9, size: 92 },
        { text: "oder TRAVERSALE?", at: at("a1", "Traversale") - 0.2, hi: true, size: 92 },
        { text: "Von oben sieht man's sofort 👀", at: S(L, "a2") - 0.1, italic: true, size: 50 },
      ]} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c1") + 0.2} top="Schenkelweichen" sub="leicht gegen die Bewegung gestellt" color={COL.rust} y={340} />
      <Title t={t} a={S(L, "d1")} b={E(L, "d2") + 0.2} top="Traversale" sub="in Bewegungsrichtung gestellt und gebogen" color={COL.forest} y={340} />
      <Caption t={t} lines={L} skip={["a1", "a2", "c1", "d1", "d2", "e1", "e2", "f0", "f1", "f2", "g1", "g2"]} y={1820} />
    </svg>
  );
}
