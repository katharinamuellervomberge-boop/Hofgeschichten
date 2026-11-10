import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, mkLines, win, wordAt, type Place } from "./nov-kit";
import { Merk } from "./rkit";
import { Arena, LEG, LOOK_T, Mark, NumCard, Ride, Stamp, V_SIDE, groundSpeed, pose, scr } from "./n2-kit";
import { RF_HEADER, RfTag, SaveCard } from "./rf-kit";

/* RIDER FIX 1 (9:16): „Du kannst einfach nicht aussitzen?“ (comp `rf-aussitzen`)
   Seitenansicht Tivoli im Trab. Hook: Reiterin steif, hüpft gegen die Bewegung (rot).
   Vergleich steif ↔ beweglich, dann 3 Punkte: Becken schwingt mit, Knie locker + atmen,
   wenige Tritte aussitzen → leichttraben. Merksatz, Speichern. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Du hüpfst beim Aussitzen ständig im Sattel?", 0, 2.58],
  ["a2", "Dann machst du vielleicht genau diesen Fehler.", 2.96, 5.2],
  ["b1", "Viele wollen möglichst still sitzen.", 5.57, 7.79],
  ["b2", "Aber genau das macht es schlimmer.", 8.19, 10.74],
  ["c0", "Eins:", 11.25, 11.76],
  ["c1", "Becken und Hüfte gehen elastisch mit.", 12.06, 14.16],
  ["d0", "Zwei:", 14.56, 14.98],
  ["d1", "Ruhig weiteratmen, die Knie nicht klemmen.", 15.39, 18.05],
  ["e0", "Drei:", 18.44, 18.84],
  ["e1", "Nur wenige Tritte aussitzen, dann wieder leichttraben.", 19.17, 22.41],
  ["f1", "Aussitzen heißt nicht stillhalten, sondern mitbewegen.", 22.77, 26.05],
  ["g1", "Speichern für deine nächste Reitstunde!", 26.3, 28.32],
];
export const RF1_LINES = mkLines(REC);
const L = RF1_LINES;
export const RF1_TOTAL = E(L, "g1") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const BEAT = 0.36; // ein Trab-Tritt (Zyklus 0,72 s)
/** steif: Reiterin wird nach jedem Tritt hochgeworfen und landet hart */
const stiffBody = (t: number) => pose({ leg: LEG.klemm, lean: -3, dy: -7 * Math.pow(Math.abs(Math.sin((Math.PI * t) / BEAT + 0.9)), 1.6) });
/** beweglich: Becken schwingt mit, Oberkörper bleibt ruhig */
const softBody = (t: number, amt = 1) => pose({ leg: LEG.sitz, swing: 3.2 * amt * Math.sin((2 * Math.PI * t) / BEAT), dy: -1.2 * Math.abs(Math.sin((Math.PI * t) / BEAT)) });
/** leichttraben: jeden zweiten Tritt aufstehen */
const postBody = (t: number) => pose({ leg: LEG.sitz, lean: 7, dy: -11 * Math.max(0, Math.sin((2 * Math.PI * t) / (2 * BEAT))) });

const small = (cx: number, ground: number, k: number): Place => ({ x: cx - 160 * k, y: ground - 285 * k, k });

export function renderRf1(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookEnd = E(L, "a2") + 0.15;
  const cmpA = S(L, "b1") - 0.25;
  const cmpB = S(L, "c0") - 0.2;
  const bigO = Math.max(win(t, -1, cmpA, 0.3), win(t, cmpB, 99, 0.3));
  const cmpO = win(t, cmpA, cmpB, 0.3);
  const good = t >= cmpB;
  const tPost = at("e1", "leichttraben") - 0.15;
  const posting = t >= tPost && t < S(L, "f1") - 0.1;
  const pl = V_SIDE;
  const b = !good ? stiffBody(t) : posting ? postBody(t) : softBody(t);
  const hip = scr(pl, "trab", t, b.hip);
  const knee = scr(pl, "trab", t, b.knee);
  const head = scr(pl, "trab", t, b.head);
  const cardsO = win(t, S(L, "c0") - 0.1, S(L, "f1") - 0.1);
  const plL = small(270, 1300, 1.5);
  const plR = small(810, 1300, 1.5);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* Große Seitenansicht */}
      {bigO > 0.01 && (
        <g opacity={bigO}>
          <Arena t={t} speed={groundSpeed("trab", pl.k)} y={pl.y + 285 * pl.k} />
          <Ride t={t} pl={pl} gait="trab" id="rf1" b={b} look={LOOK_T} nod={good ? 8 : 0} glow={!good && t > 0.4 ? COL.rust : good && !posting && t > S(L, "c1") ? COL.forest : undefined} />
          {/* Hook: Hüpf-Pfeil + „Sattel“-Lücke */}
          <g opacity={win(t, 0.3, hookEnd)}>
            <path d={`M${head[0] - 150} ${head[1] + 40} v-90`} stroke={COL.rust} strokeWidth="11" strokeLinecap="round" />
            <path d={`M${head[0] - 150} ${head[1] - 70} l-22 32 h44 Z`} fill={COL.rust} />
            <Pop t={t} a={0.5} x={head[0] + 180} y={head[1] - 40} text="hüpf · hüpf · hüpf" fill={COL.rust} size={32} />
          </g>
          {/* 1 Becken */}
          <g opacity={win(t, S(L, "c1") - 0.1, E(L, "c1") + 0.4)}>
            <path d={`M${hip[0] - 85} ${hip[1] + 30} Q${hip[0]} ${hip[1] + 75} ${hip[0] + 85} ${hip[1] + 30}`} stroke={COL.honey} strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d={`M${hip[0] - 85} ${hip[1] + 30} l-6 -28 l30 12 Z M${hip[0] + 85} ${hip[1] + 30} l6 -28 l-30 12 Z`} fill={COL.honey} />
            <circle cx={hip[0]} cy={hip[1]} r={24 + 4 * pulse} fill="none" stroke={COL.honey} strokeWidth="5" />
            <Pop t={t} a={at("c1", "elastisch") - 0.2} x={hip[0] - 40} y={hip[1] + 160} text="Becken schwingt mit" fill={COL.forest} size={32} />
          </g>
          {/* 2 Atmen + Knie */}
          <g opacity={win(t, S(L, "d1") - 0.1, E(L, "d1") + 0.3)}>
            <circle cx={knee[0]} cy={knee[1]} r={34 + 5 * pulse} fill="none" stroke={COL.forest} strokeWidth="6" />
            <Pop t={t} a={at("d1", "Knie") - 0.2} x={knee[0] + 210} y={knee[1] + 10} text="Knie locker" fill={COL.forest} size={32} />
            <Pop t={t} a={S(L, "d1")} x={head[0] - 230} y={head[1] + 70} text={Math.sin(t * 1.6) > 0 ? "einatmen …" : "… ausatmen"} fill={COL.honey} color={COL.forestDeep} size={30} />
          </g>
          {/* 3 wenige Tritte → leichttraben */}
          <g opacity={win(t, S(L, "e1") - 0.1, E(L, "e1") + 0.3)}>
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={430 + i * 60} cy={1530} r={18} fill={t > S(L, "e1") + 0.35 * (i + 1) ? COL.forest : PAPER} stroke={COL.forest} strokeWidth="4" />
            ))}
            <T x={640} y={1543} size={36} font={FONT_BODY} weight={800} color={COL.forestDeep}>…</T>
            <Pop t={t} a={tPost} x={540} y={1610} text="→ wieder leichttraben" fill={COL.forest} size={32} />
          </g>
        </g>
      )}
      {/* Vergleich steif ↔ beweglich */}
      {cmpO > 0.01 && (
        <g opacity={cmpO}>
          <Arena t={t} speed={groundSpeed("trab", 1.5)} y={1300} />
          <Ride t={t} pl={plL} gait="trab" id="rf1l" b={stiffBody(t)} look={LOOK_T} nod={0} glow={COL.rust} />
          <Ride t={t} pl={plR} gait="trab" id="rf1r" b={softBody(t)} look={LOOK_T} nod={8} glow={COL.forest} />
          <Mark x={270} y={720} ok={false} k={ease((t - S(L, "b1")) / 0.3)} />
          <Mark x={810} y={720} ok k={ease((t - S(L, "b2")) / 0.3)} />
          <T x={270} y={1420} size={40} color={COL.rust}>steif & „still“</T>
          <T x={810} y={1420} size={40} color={COL.forest} o={ease((t - S(L, "b2")) / 0.3)}>beweglich</T>
          <T x={270} y={1470} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft}>wird hochgeworfen</T>
          <T x={810} y={1470} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft} o={ease((t - S(L, "b2")) / 0.3)}>Becken geht mit</T>
          <Stamp t={t} a={at("b2", "schlimmer") - 0.1} x={540} y={540} text="STILL = STEIF" size={64} />
        </g>
      )}
      {/* Punkte 1–3 */}
      <g opacity={cardsO}>
        <NumCard t={t} a={S(L, "c0") - 0.1} x={190} y={430} w={300} n="1" title="Becken geht mit" sub="elastisch, nicht fest" col={COL.forest} dim={t > S(L, "d0") ? 1 : 0} />
        <NumCard t={t} a={S(L, "d0") - 0.1} x={540} y={430} w={300} n="2" title="atmen · Knie locker" sub="nicht festklemmen" col={COL.forest} dim={t > S(L, "e0") ? 1 : 0} />
        <NumCard t={t} a={S(L, "e0") - 0.1} x={890} y={430} w={300} n="3" title="wenige Tritte" sub="dann leichttraben" col={COL.forest} />
      </g>
      <Merk t={t} at={S(L, "f1") - 0.1} lines={["Nicht stillhalten –", "MITBEWEGEN."]} sub="Aussitzen = mit dem Pferd schwingen" />
      {/* Ende */}
      <g opacity={win(t, S(L, "g1") - 0.1, 99, 0.3)}>
        <SaveCard t={t} a={S(L, "g1")} title="📌 Speichern" sub="für deine nächste Reitstunde" y={1480} />
        <Brand t={t} a={S(L, "g1") + 1.2} y={1600} />
      </g>
      <Header t={t} label={RF_HEADER} hide={win(t, 0, hookEnd)} />
      <RfTag o={win(t, -1, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "Du HÜPFST", at: -0.9, hi: true, size: 92 },
        { text: "beim Aussitzen?", at: -0.6, size: 80 },
        { text: "Vielleicht genau dieser Fehler …", at: S(L, "a2") - 0.1, size: 52 },
      ]} />
      <Title t={t} a={cmpA} b={cmpB} top="Steif vs. beweglich" color={COL.forestDeep} y={330} />
      <Title t={t} a={cmpB} b={S(L, "f1") - 0.1} top="So klappt's" color={COL.forest} y={330} />
      <Caption t={t} lines={L} skip={["c0", "d0", "e0", "g1"]} y={1720} />
    </svg>
  );
}
