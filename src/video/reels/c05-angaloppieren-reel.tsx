import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";
import { Arena, LEG, LOOK_S, Mark, NumCard, Ride, Takt, V_SIDE, groundSpeed, pose, scr } from "./n2-kit";

/* Community-Reel R5 (9:16): „Dein Pferd rennt beim Angaloppieren in den Trab?“ (comp `angaloppieren`)
   Seitenansicht (Scrabble). Trab wird hektisch (Takt beschleunigt), 3 Ursachen als Karten, dann ruhiger Trab,
   aufrechter Sitz, innerer Schenkel am Gurt, äußerer leicht dahinter, klarer Linksgalopp im Dreitakt. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Du willst angaloppieren –", 0, 1.52],
  ["a2", "und dein Pferd trabt einfach immer schneller?", 1.84, 4.17],
  ["b1", "Meist liegt es an einem von drei Dingen.", 4.7, 6.92],
  ["c0", "Eins:", 7.26, 7.76],
  ["c1", "Das Pferd ist nicht vorbereitet –", 8.05, 9.72],
  ["c2", "keine halbe Parade, keine Aufmerksamkeit.", 10.0, 12.59],
  ["d0", "Zwei:", 12.95, 13.42],
  ["d1", "Du lehnst dich nach vorn und schiebst dein Pferd auf die Vorhand.", 13.76, 16.77],
  ["e0", "Drei:", 17.09, 17.49],
  ["e1", "Die Hilfe kommt im falschen Moment oder ist unklar.", 17.82, 20.71],
  ["f0", "Besser:", 21.09, 21.54],
  ["f1", "im ruhigen Trab vorbereiten, aufrecht sitzen –", 21.84, 24.71],
  ["f2", "innerer Schenkel am Gurt,", 25.05, 26.5],
  ["f3", "äußerer leicht dahinter –", 26.78, 28.29],
  ["f4", "und dann klar angaloppieren.", 28.61, 30.55],
  ["g1", "Wie klappt dein Angaloppieren?", 30.93, 32.4],
  ["g2", "Schreib AKADEMIE für die ganze Lektion!", 32.66, 35.08],
];
export const ANG_LINES = mkLines(REC);
const L = ANG_LINES;
export const ANG_TOTAL = E(L, "g2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

export function renderAngaloppieren(t: number) {
  const hookEnd = E(L, "a2") + 0.15;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const good = t >= S(L, "f0") - 0.2;
  const canter = t >= at("f4", "angaloppieren") - 0.2;
  // Tempo: Hook wird hektisch, bei den Ursachen gleichmäßig hektisch, ab „Besser“ ruhig
  const k = good ? lerp(1.45, 0.92, sm((t - S(L, "f0")) / 1.2)) : t < hookEnd ? lerp(1, 1.5, sm(t / 3.5)) : 1.45;
  // eigene Zeitachse, damit die Beine beim Tempowechsel nicht springen
  const tt = good ? 14 + (t - S(L, "f0")) * k : t * (t < hookEnd ? lerp(1, 1.25, sm(t / 3.5)) : 1.45);
  const gait = canter ? ("galopp-links" as const) : ("trab" as const);
  const lean = good ? lerp(22, 0, sm((t - S(L, "f1")) / 0.8)) : sm((t - S(L, "d1")) / 0.6) * 22;
  const b = pose({ lean, leg: LEG.sitz });
  const pl = V_SIDE;
  const ank = scr(pl, gait, tt, b.ankle);
  const head = scr(pl, gait, tt, [340, 70]);
  const wither = scr(pl, gait, tt, [270, 96]);
  const cardsO = win(t, S(L, "b1") - 0.1, S(L, "f0") - 0.1);
  const cycle = canter ? 0.75 : 0.72 / k;
  const sceneO = win(t, 0, S(L, "g1") - 0.1, 0.3);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={sceneO}>
        <Arena t={tt} speed={groundSpeed(canter ? "galopp-links" : "trab", pl.k)} y={pl.y + 285 * pl.k} />
        <Ride t={tt} pl={pl} gait={gait} id="ang" b={b} look={LOOK_S} nod={good ? 9 : 2} />
        {/* Takt */}
        <Takt t={tt} cycle={cycle} beats={canter ? [0, 0.25, 0.5] : [0, cycle / 2]} labels={canter ? ["ba", "da", "bumm"] : ["1", "2"]} col={canter ? COL.forest : t < S(L, "b1") ? COL.rust : COL.honey} y={1550} o={Math.max(win(t, -1, S(L, "b1") - 0.1), win(t, S(L, "f1"), S(L, "g1") - 0.1))} />
        <Pop t={t} a={S(L, "a2") + 0.4} x={760} y={620} text="immer schneller 💨" fill={COL.rust} size={34} o={win(t, S(L, "a2"), S(L, "b1") - 0.1)} />
        {/* Ursachen */}
        <g opacity={cardsO}>
          <NumCard t={t} a={S(L, "c0") - 0.1} x={190} y={430} w={300} n="1" title="nicht vorbereitet" sub="keine halbe Parade" dim={t > S(L, "d0") ? 1 : 0} />
          <NumCard t={t} a={S(L, "d0") - 0.1} x={540} y={430} w={300} n="2" title="nach vorn gelehnt" sub="Pferd auf der Vorhand" dim={t > S(L, "e0") ? 1 : 0} />
          <NumCard t={t} a={S(L, "e0") - 0.1} x={890} y={430} w={300} n="3" title="Hilfe unklar" sub="falscher Moment" />
        </g>
        <g opacity={win(t, S(L, "c1"), E(L, "c2") + 0.1)}>
          <circle cx={head[0]} cy={head[1] - 70} r={44} fill={PAPER} stroke={COL.rust} strokeWidth="5" />
          <T x={head[0]} y={head[1] - 52} size={56} font={FONT_BODY} weight={900} color={COL.rust}>?</T>
        </g>
        <g opacity={win(t, at("d1", "Vorhand") - 0.4, E(L, "d1") + 0.2)}>
          <path d={`M${wither[0]} ${wither[1] - 120} v100`} stroke={COL.rust} strokeWidth="12" strokeLinecap="round" />
          <path d={`M${wither[0]} ${wither[1] - 10} l-22 -32 h44 Z`} fill={COL.rust} />
          <Pop t={t} a={at("d1", "Vorhand") - 0.3} x={wither[0] + 120} y={wither[1] - 150} text="Gewicht auf die Vorhand" fill={COL.rust} size={30} />
        </g>
        <g opacity={win(t, S(L, "e1"), E(L, "e1") + 0.1)}>
          <circle cx={200} cy={760} r={70} fill={PAPER} stroke={COL.rust} strokeWidth="6" />
          <path d={`M200 760 v-42 M200 760 l30 18`} stroke={COL.rust} strokeWidth="8" strokeLinecap="round" />
          <Pop t={t} a={S(L, "e1") + 0.2} x={200} y={890} text="falscher Moment?" fill={COL.rust} size={30} />
        </g>
        {/* Besser */}
        <Pop t={t} a={at("f1", "ruhigen") - 0.2} x={540} y={470} text="ruhiger Trab · aufrecht sitzen" fill={COL.forest} size={34} o={win(t, at("f1", "ruhigen") - 0.2, S(L, "f2") - 0.1)} />
        <g opacity={win(t, S(L, "f2") - 0.1, E(L, "f4") + 0.3)}>
          <circle cx={ank[0] + 8} cy={ank[1] - 60} r={34 + 5 * pulse} fill="none" stroke={COL.forest} strokeWidth="6" />
          <Pop t={t} a={S(L, "f2") - 0.1} x={ank[0] + 210} y={ank[1] - 70} text="innen: am Gurt" fill={COL.forest} size={30} />
        </g>
        <g opacity={win(t, S(L, "f3") - 0.1, E(L, "f4") + 0.3)}>
          <path d={`M${ank[0] - 30} ${ank[1] - 100} l-40 110`} stroke={COL.honey} strokeWidth="14" strokeLinecap="round" strokeDasharray="14 10" />
          <Pop t={t} a={S(L, "f3") - 0.1} x={ank[0] - 220} y={ank[1] - 70} text="außen: leicht dahinter" fill={COL.honey} color={COL.forestDeep} size={30} />
        </g>
        <Pop t={t} a={at("f4", "klar") - 0.1} x={540} y={470} text="✓ klarer Galopp – ba-da-bumm" fill={COL.forest} size={34} o={win(t, at("f4", "klar") - 0.1, S(L, "g1") - 0.1)} />
      </g>
      <g opacity={ease((t - S(L, "g1") + 0.15) / 0.3)}>
        <CommentCard t={t} a={S(L, "g1") - 0.1} lines={["Wie klappt dein", "Angaloppieren?"]} sub="Schreib AKADEMIE für die ganze Lektion" y={640} />
        <Brand t={t} a={S(L, "g2") + 0.3} />
      </g>
      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={270} lines={[
        { text: "Du willst angaloppieren …", at: -0.9, size: 76 },
        { text: "und es TRABT SCHNELLER?", at: S(L, "a2") - 0.1, hi: true, size: 84 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={S(L, "f0") - 0.1} top="3 häufige Gründe" color={COL.rust} y={330} />
      <Title t={t} a={S(L, "f0") - 0.05} b={S(L, "g1") - 0.1} top="Besser so" color={COL.forest} y={330} />
      <Caption t={t} lines={L} skip={["a1", "a2", "c0", "d0", "e0", "f0", "g1", "g2"]} y={1700} />
    </svg>
  );
}
