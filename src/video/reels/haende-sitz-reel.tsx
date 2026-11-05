import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, headPoint, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";

/* Reiten verstehen (9:16): „Warum kannst du deine Hände nicht ruhig halten?“ (comp `haende`)
   Aussitzen im Trab. Unruhige Hand = Bewegung aus Becken/Oberkörper wird über steife Arme an die Hand weitergegeben:
   Hand hüpft im Takt (2× pro Trabzyklus) und etwas unregelmäßig, Zügel wird abwechselnd straff/locker (feste Zügellänge).
   Ausbalanciert: Ellenbogen (IK) gleicht aus, Hand bleibt ruhig zum Pferdemaul. Kette Becken → Schulter → Ellenbogen →
   Hand → Maul als Fluss-Linie. Vorher/Nachher: steife Arme ✗ / elastische Ellenbogen ✓. Kein „Festhalten“ als Lösung. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Reitlehrer sagt ständig: Hände ruhig!", 0, 2.89],
  ["a2", "Aber wie soll das gehen?", 3.25, 4.59],
  ["b1", "Deine Hände wackeln im Trab?", 4.95, 6.59],
  ["c1", "Oft beginnt das Problem gar nicht in den Händen, sondern im Sitz.", 7.05, 10.57],
  ["d1", "Wackeln Becken und Oberkörper, wandert jede Bewegung über die Arme bis ins Pferdemaul.", 10.94, 16.13],
  ["e1", "Festhalten hilft nicht.", 16.44, 17.85],
  ["e2", "Elastische Ellenbogen und Schultern gleichen die Bewegung aus.", 18.15, 21.39],
  ["f1", "Ruhige Hände entstehen durch Balance und elastische Arme.", 21.75, 25.4],
  ["g1", "Reiten verstehen statt nur Anweisungen hören.", 25.72, 28.35],
  ["g2", "Hofgeschichten Reitakademie – 19,90 €.", 28.67, 31.79],
];
export const HAENDE_LINES = mkLines(REC);
const L = HAENDE_LINES;
export const HAENDE_TOTAL = E(L, "g2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tonga")!.look;
const GAIT = "trab" as const;
const CYC = 1.6;
const NOD = 10;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;

/** Hand-Unruhe (Pferde-Koordinaten): im Trabtakt + etwas unregelmäßig */
function wobble(tt: number): P {
  const ph = (2 * Math.PI * 2 * tt) / CYC;
  return [1.6 * Math.sin(ph * 0.5 + 0.7) + 0.8 * Math.sin(tt * 7.3), 5.2 * Math.sin(ph + 0.4) + 1.4 * Math.sin(tt * 11.1)];
}
function ride(tt: number, shaky: number): RideState {
  const w = wobble(tt);
  return { nod: NOD, reach: 0, hand: [SITZ.hand[0] + w[0] * shaky, SITZ.hand[1] + w[1] * shaky], rein: REIN };
}

/* Kamera */
const V_FULL: Place = { x: 540 - 160 * 2.6, y: 1390 - 285 * 2.6, k: 2.6 };
const V_MED: Place = { x: 540 - (225 - 70) * 3.4, y: 820 - (70 - 20) * 3.4, k: 3.4 };
function camera(t: number): Place {
  const keys: Array<[number, Place]> = [
    [0, V_FULL],
    [S(L, "c1") - 0.3, V_MED],
    [S(L, "f1") - 0.4, V_FULL],
  ];
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const u = sm((t - keys[i][0]) / 0.8);
    if (u <= 0) break;
    const n = keys[i][1];
    v = { x: lerp(v.x, n.x, u), y: lerp(v.y, n.y, u), k: lerp(v.k, n.k, u) };
  }
  return v;
}

function Ring({ p, col, o, pulse, r = 26 }: { p: P; col: string; o: number; pulse: number; r?: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      <circle cx={p[0]} cy={p[1]} r={r + 6 * pulse} fill="none" stroke={col} strokeWidth="6" />
      <circle cx={p[0]} cy={p[1]} r={r * 0.4} fill={col} opacity=".35" />
    </g>
  );
}
/** ↕ Bewegungspfeil */
function Bounce({ p, col, o, amp = 30 }: { p: P; col: string; o: number; amp?: number }) {
  if (o <= 0.01) return null;
  const [x, y] = p;
  return (
    <g opacity={o} stroke={col} strokeWidth="6" strokeLinecap="round" fill="none">
      <path d={`M${x} ${y - amp} V${y + amp}`} />
      <path d={`M${x - 12} ${y - amp + 14} L${x} ${y - amp} L${x + 12} ${y - amp + 14}`} />
      <path d={`M${x - 12} ${y + amp - 14} L${x} ${y + amp} L${x + 12} ${y + amp - 14}`} />
    </g>
  );
}

function Panel({ t, x, good }: { t: number; x: number; good: boolean }) {
  const k = 1.9;
  const pl: Place = { x: x + 250 - (225 - 70) * k, y: 1260 - 285 * k, k };
  const id = good ? "hs-r" : "hs-l";
  const s = ride(t, good ? 0 : 1);
  const info = rideInfo(t, GAIT, s);
  const col = good ? COL.forest : COL.rust;
  const tight = !good && info.tension > 0.15;
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g>
      <defs><clipPath id={`${id}-c`}><rect x={x + 10} y={640} width={520} height={760} rx="36" /></clipPath></defs>
      <g clipPath={`url(#${id}-c)`}>
        <g transform={`translate(${x - 270} 0)`}><Arena t={t} speed={groundSpeed(GAIT, k)} y={pl.y + 285 * k} top={640} /></g>
        <RidingHorse t={t} pl={pl} look={LOOK} gait={GAIT} id={id} s={s} reinColor={tight ? COL.rust : LEATHER} reinW={2.8} glow={good ? COL.forest : tight ? COL.rust : undefined} />
        {good ? (
          <>
            <Ring p={scr(info.body.elbow)} col={COL.forest} o={1} pulse={pulse} r={20} />
            <Ring p={scr(info.body.shoulder)} col={COL.forest} o={0.8} pulse={pulse} r={18} />
          </>
        ) : (
          <Bounce p={[scr(info.h)[0] + 46, scr(info.h)[1]]} col={COL.rust} o={1} amp={34} />
        )}
      </g>
      <rect x={x + 10} y={640} width={520} height={760} rx="36" fill="none" stroke={col} strokeWidth="6" />
      <g transform={`translate(${x + 270} 1320)`}>
        <circle r="38" fill={col} />
        <T x={0} y={16} size={46} font={FONT_BODY} weight={700} color={PAPER}>{good ? "✓" : "✗"}</T>
      </g>
      <T x={x + 270} y={1440} size={34} font={FONT_BODY} weight={700} color={col}>{good ? "ausbalanciert" : "steife Arme"}</T>
      <T x={x + 270} y={1490} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft}>{good ? "elastische Ellenbogen" : "Hand hüpft mit"}</T>
    </g>
  );
}

export function renderHaende(t: number) {
  const pl = camera(t);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const calm = sm((t - S(L, "f1") + 0.2) / 0.8);
  const shaky = 1 - calm;
  const s = ride(t, shaky);
  const info = rideInfo(t, GAIT, s);
  const tight = info.tension > 0.15;
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const hipS = scr(info.body.hip);
  const shS = scr(info.body.shoulder);
  const elS = scr(info.body.elbow);
  const handS = scr(info.h);
  const bitS = scr(info.b);

  const splitA = S(L, "e1") - 0.2;
  const splitB = E(L, "e2") + 0.25;
  const splitO = win(t, splitA, splitB, 0.4);
  const mainO = 1 - splitO;

  const hookEnd = E(L, "a2") + 0.15;
  const bO = win(t, at("a1", "Hände") - 0.2, E(L, "b1") + 0.3);
  const cO = win(t, at("c1", "Sitz") - 0.4, E(L, "d1"));
  const pelO = Math.max(cO, win(t, at("d1", "Becken") - 0.1, E(L, "d1")));
  const torO = Math.max(cO, win(t, at("d1", "Oberkörper") - 0.1, E(L, "d1")));
  const flowU = sm((t - at("d1", "wandert")) / 2.2);
  const flowO = win(t, at("d1", "wandert") - 0.1, E(L, "d1") + 0.2);
  const fO = win(t, S(L, "f1"), E(L, "f1") + 0.3);

  const endA = S(L, "g1") - 0.15;
  const endO = win(t, endA, HAENDE_TOTAL + 1);
  const hideHead = Math.max(win(t, 0, hookEnd), splitO, endO);

  /* Fluss-Linie Becken → Schulter → Ellenbogen → Hand → Maul */
  const chain: P[] = [hipS, shS, elS, handS, bitS];
  const segs = chain.length - 1;
  const fu = flowU * segs;
  const full = Math.floor(fu);
  const pts: P[] = chain.slice(0, Math.min(chain.length, full + 1));
  if (full < segs) {
    const a = chain[full];
    const b = chain[full + 1];
    const r = fu - full;
    pts.push([lerp(a[0], b[0], r), lerp(a[1], b[1], r)]);
  }
  const flowD = "M" + pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {mainO > 0.01 && (
        <g opacity={mainO}>
          <Arena t={t} speed={groundSpeed(GAIT, pl.k)} y={pl.y + 285 * pl.k} />
          <RidingHorse t={t} pl={pl} look={LOOK} gait={GAIT} id="hs" s={s} reinColor={tight && shaky > 0.5 ? COL.rust : LEATHER} reinW={2.6}
            glow={shaky > 0.5 ? (t > S(L, "b1") - 0.2 && tight ? COL.rust : undefined) : COL.forest} />
          {/* Hände wackeln */}
          <Bounce p={[handS[0] + 60, handS[1]]} col={COL.rust} o={bO * shaky} amp={36} />
          <Pop t={t} a={at("a1", "Hände") - 0.1} x={handS[0] + 150} y={handS[1] - 80} text="Hände ruhig!" fill={COL.rust} size={32} o={win(t, at("a1", "Hände") - 0.1, hookEnd)} />
          {/* Sitz */}
          <Ring p={hipS} col={COL.honey} o={pelO} pulse={pulse} r={30} />
          <Ring p={[lerp(hipS[0], shS[0], 0.5), lerp(hipS[1], shS[1], 0.5)]} col={COL.honey} o={torO * 0.9} pulse={pulse} r={24} />
          <Bounce p={[hipS[0] - 70, hipS[1]]} col={COL.honey} o={pelO * shaky} amp={30} />
          <Pop t={t} a={at("c1", "Sitz") - 0.2} x={hipS[0] - 170} y={hipS[1] + 90} text="Becken" fill={COL.honey} color={COL.forestDeep} size={32} o={pelO} />
          <Pop t={t} a={at("c1", "Sitz")} x={shS[0] - 190} y={shS[1] - 40} text="Oberkörper" fill={COL.honey} color={COL.forestDeep} size={32} o={torO} />
          {/* Weitergabe */}
          {flowO > 0.01 && pts.length > 1 && (
            <g opacity={flowO}>
              <path d={flowD} fill="none" stroke={COL.rust} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity=".22" />
              <path d={flowD} fill="none" stroke={COL.rust} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 12" strokeDashoffset={-t * 70} />
              {pts.length > 1 && <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={12 + 4 * pulse} fill={COL.rust} />}
            </g>
          )}
          <Pop t={t} a={at("d1", "Arme") - 0.1} x={elS[0] + 40} y={elS[1] + 120} text="über die Arme" fill={COL.rust} size={30} o={win(t, at("d1", "Arme") - 0.1, E(L, "d1") + 0.2)} />
          <Pop t={t} a={at("d1", "Pferdemaul") - 0.1} x={Math.min(880, bitS[0])} y={bitS[1] + 110} text="bis ins Maul" fill={COL.rust} size={30} o={win(t, at("d1", "Pferdemaul") - 0.1, E(L, "d1") + 0.2)} />
          {/* Lösung */}
          {fO > 0.01 && (
            <g opacity={fO}>
              <Ring p={elS} col={COL.forest} o={ease((t - at("f1", "elastische") + 0.1) / 0.3)} pulse={pulse} r={22} />
              <Ring p={hipS} col={COL.forest} o={ease((t - at("f1", "Balance") + 0.1) / 0.3)} pulse={pulse} r={28} />
              <Pop t={t} a={at("f1", "Balance") - 0.05} x={300} y={1490} text="Balance im Sitz" fill={COL.forest} size={34} />
              <Pop t={t} a={at("f1", "elastische") - 0.05} x={760} y={1490} text="elastische Arme" fill={COL.forest} size={34} />
            </g>
          )}
        </g>
      )}

      {splitO > 0.01 && (
        <g opacity={splitO}>
          <rect width={W} height={H} fill={COL.bg} />
          <g opacity={ease((t - S(L, "e1") + 0.1) / 0.4)}><Panel t={t} x={0} good={false} /></g>
          <g opacity={ease((t - S(L, "e2") + 0.1) / 0.4)}><Panel t={t} x={540} good /></g>
          <Pop t={t} a={S(L, "e1")} x={540} y={300} text="Festhalten hilft nicht ✗" fill={COL.rust} size={46} />
          <Pop t={t} a={S(L, "e2")} x={540} y={420} text="Ellenbogen & Schultern gleichen aus" fill={COL.forest} size={34} />
        </g>
      )}

      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={endA + 0.1} lines={["Reiten verstehen –", "statt nur Anweisungen hören."]} sub="Hofgeschichten Reitakademie · 19,90 €" y={230} />
          <Brand t={t} a={S(L, "g2") + 0.1} sub="Reitakademie · einmalig 19,90 € · kein Abo" y={1440} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={70} gap={86} y0={240} lines={[
        { text: "Dein Reitlehrer sagt ständig:", at: -0.9, size: 62 },
        { text: "„HÄNDE RUHIG!“", at: at("a1", "Hände") - 0.25, hi: true, size: 92 },
        { text: "Aber wie soll das gehen? 🤔", at: S(L, "a2") - 0.1, italic: true, size: 58 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={E(L, "b1")} top="Deine Hände wackeln?" sub="im Trab hüpft die Hand mit" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c1")} top="Oft beginnt es im Sitz" sub="Becken und Oberkörper" y={290} />
      <Title t={t} a={S(L, "d1")} b={E(L, "d1")} top="Die Bewegung wandert" sub="vom Sitz über die Arme bis ins Maul" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "f1")} b={E(L, "f1")} top="Ruhige Hände entstehen" sub="durch Balance und elastische Arme" color={COL.forest} y={290} />
      <Caption t={t} lines={L} skip={["a1", "a2", "e1", "g1", "g2"]} y={1610} />
    </svg>
  );
}
