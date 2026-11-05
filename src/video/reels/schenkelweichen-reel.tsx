import { Arrow, Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";
import { Callout, HAND_IN, HAND_OUT, LEG_OUT, LOOKS, TopHorse, world, type Pt } from "./top";

/* Reiten verstehen (9:16): „Wie funktioniert Schenkelweichen?“ (comp `schenkelweichen`)
   Viereck von oben (20 × 40 m), linke Hand: von der Viertellinie (5 m) zurück zum Hufschlag, Pferd fast parallel zur langen
   Seite, leicht gegen die Bewegungsrichtung gestellt (nach innen = oben), ohne ausgeprägte Längsbiegung. Vorwärts- und
   Seitwärtspfeil. Nahaufnahme schematisch von oben: Fußfolge wie im Schritt, die inneren Beine kreuzen vor den äußeren.
   Hilfen zurückhaltend: innerer Schenkel leicht hinter dem Gurt seitwärtstreibend, äußerer begrenzend, Zügel: leichte
   Stellung + begrenzen, Sitz geht mit. Danach ganze Linie noch einmal, „Vorwärts bleibt“. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Schenkelweichen sieht einfach aus.", 0, 2.03],
  ["a2", "Aber weißt du, was dein Pferd dabei wirklich macht?", 2.37, 4.89],
  ["b1", "Es geht vorwärts UND seitwärts – zum Beispiel von der Viertellinie zurück zum Hufschlag.", 5.25, 10.38],
  ["c1", "Dabei kreuzen die Vorder- und die Hinterbeine.", 10.75, 13.93],
  ["d1", "Dein innerer Schenkel treibt leicht hinter dem Gurt seitwärts, der äußere begrenzt.", 14.36, 19.03],
  ["d2", "Die Zügel halten eine leichte Stellung, dein Sitz geht mit.", 19.44, 22.78],
  ["e1", "Wichtig:", 23.16, 23.72],
  ["e2", "Das Vorwärts darf nie verloren gehen.", 24.04, 26.26],
  ["f1", "Du willst Reiterhilfen endlich verstehen?", 26.64, 28.61],
  ["f2", "Entdecke die Hofgeschichten Reitakademie – 19,90 €.", 28.95, 32.76],
];
export const SW_LINES = mkLines(REC);
const L = SW_LINES;
export const SW_TOTAL = E(L, "f2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const IN_COL = COL.honey;
const OUT_COL = COL.forest;
const LINE = COL.forest;

/* Szenen */
const A_END = S(L, "c1") - 0.2;
const C_END = E(L, "c1") + 0.3;
const D_END = E(L, "d2") + 0.3;
const R_END = S(L, "f1") - 0.15;

/* ---------- Viereck ---------- */
const M = 23;
const AX = 80;
const AY = 560;
const px = (m: number) => AX + m * M;
const py = (m: number) => AY + m * M;
const Q_Y = 15; // Viertellinie (5 m von der langen Seite)
const TR_Y = 19; // Hufschlag
const X0 = 3;
const XA = 9; // Beginn Schenkelweichen
const XB = 27; // am Hufschlag
const X1 = 37;
/** Reitlinie: y (m) über x (m) */
const yAt = (xm: number) => (xm <= XA ? Q_Y : xm >= XB ? TR_Y : lerp(Q_Y, TR_Y, sm((xm - XA) / (XB - XA)) * 0.15 + ((xm - XA) / (XB - XA)) * 0.85));
const yielding = (xm: number) => xm > XA + 0.3 && xm < XB - 0.3;
const LINE_D = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const xm = lerp(X0, X1, i / 120);
    pts.push(`${px(xm).toFixed(1)},${py(yAt(xm)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
})();
function trail(xm: number) {
  const pts: string[] = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const x = lerp(X0, xm, i / n);
    pts.push(`${px(x).toFixed(1)},${py(yAt(x)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}
/** Fortschritt (m) für Durchgang 1 und Wiederholung */
function xAt(t: number) {
  const k1: Array<[number, number]> = [[-1, X0], [at("b1", "seitwärts") - 0.6, XA], [at("b1", "Hufschlag") + 0.3, XB], [A_END + 0.4, XB + 3]];
  const k2: Array<[number, number]> = [[D_END - 0.3, X0], [D_END + 0.5, XA], [E(L, "e2") - 0.2, XB], [R_END + 0.4, X1]];
  const keys = t < D_END - 0.4 ? k1 : k2;
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, a] = keys[i];
    const [t1, b] = keys[i + 1];
    if (t <= t1) return a + ((b - a) * (t - t0)) / (t1 - t0);
  }
  return keys[keys.length - 1][1];
}

function ArenaView({ t, o, replay }: { t: number; o: number; replay?: boolean }) {
  if (o <= 0.01) return null;
  const xm = xAt(t);
  const y = yAt(xm);
  const pos: Pt = [px(xm), py(y)];
  const yi = yielding(xm);
  const poll = yi ? -9 : -2;
  const ang = yi ? 2 : 0;
  const vecO = replay ? win(t, S(L, "e2"), R_END) : win(t, at("b1", "vorwärts") - 0.2, A_END - 0.2);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g opacity={o}>
      <rect x={px(0)} y={py(0)} width={40 * M} height={20 * M} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth="10" />
      <g fill="#D3BF9C">
        {Array.from({ length: 26 }, (_, i) => (
          <ellipse key={i} cx={px(1 + ((i * 7.3) % 38))} cy={py(1 + ((i * 5.7) % 18))} rx={i % 3 ? 10 : 16} ry="4" />
        ))}
      </g>
      {[["A", px(0) - 26, py(10) + 10], ["C", px(40) + 26, py(10) + 10], ["E", px(20), py(0) - 14], ["B", px(20), py(20) + 38], ["K", px(6), py(20) + 38], ["F", px(34), py(20) + 38]].map(([l, x, yy]) => (
        <T key={l as string} x={x as number} y={yy as number} size={28} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l as string}</T>
      ))}
      {/* Viertellinie + Hufschlag */}
      <path d={`M${px(0.5)} ${py(Q_Y)} H${px(39.5)}`} stroke={PAPER} strokeWidth="4" strokeDasharray="10 12" opacity=".9" />
      <path d={`M${px(0.5)} ${py(TR_Y)} H${px(39.5)}`} stroke={PAPER} strokeWidth="4" opacity=".7" />
      <path d={LINE_D} fill="none" stroke={COL.honey} strokeWidth="6" strokeDasharray="14 12" opacity=".7" />
      <path d={trail(xm)} fill="none" stroke={LINE} strokeWidth="10" strokeLinecap="round" />
      <TopHorse at={pos} ang={ang} look={LOOKS.tonga} step={xm / 1.3} s={1.6} bend={-2} poll={poll} />
      {vecO > 0.01 && (
        <g opacity={vecO}>
          <Arrow from={[pos[0] + 40, pos[1] - 60]} to={[pos[0] + 190 + (replay ? 14 * pulse : 0), pos[1] - 60]} color={COL.forest} w={replay ? 14 : 10} head={replay ? 30 : 24} />
          {!replay && <Arrow from={[pos[0] - 70, pos[1] - 30]} to={[pos[0] - 70, pos[1] + 50]} color={COL.rust} w={10} head={24} />}
          <Pop t={t} a={replay ? S(L, "e2") : at("b1", "vorwärts") - 0.1} x={pos[0] + 150} y={pos[1] - 110} text={replay ? "vorwärts bleibt!" : "vorwärts"} fill={COL.forest} size={30} />
          {!replay && <Pop t={t} a={at("b1", "seitwärts") - 0.1} x={pos[0] - 150} y={pos[1] + 100} text="seitwärts" fill={COL.rust} size={30} />}
        </g>
      )}
      <g opacity={replay ? 0 : win(t, at("b1", "Viertellinie") - 0.2, A_END - 0.2)}>
        <Pop t={t} a={at("b1", "Viertellinie") - 0.2} x={px(5)} y={py(Q_Y) - 50} text="Viertellinie" fill={COL.forestDeep} size={26} />
      </g>
      <g opacity={replay ? 0 : win(t, at("b1", "Hufschlag") - 0.2, A_END - 0.2)}>
        <Pop t={t} a={at("b1", "Hufschlag") - 0.2} x={px(33)} y={py(TR_Y) - 50} text="Hufschlag" fill={COL.forestDeep} size={26} />
      </g>
    </g>
  );
}

/* ---------- Nahaufnahme: Beine kreuzen (schematisch von oben) ---------- */
type Leg = "VL" | "VR" | "HL" | "HR";
const LEGS: Leg[] = ["VL", "VR", "HL", "HR"];
const OFFS: Record<Leg, number> = { HL: 0, VL: 0.25, HR: 0.5, VR: 0.75 };
const CYC_C = 2.2;
const DUTY = 0.52;
const STEP: Pt = [330, 330]; // vorwärts / seitwärts pro Zyklus (Bildpunkte)
const CC: Pt = [540, 1040];
const WL = 56;
const CEN: Record<Leg, Pt> = { VL: [120, -WL], VR: [120, WL], HL: [-170, -WL], HR: [-170, WL] };
const ATT: Record<Leg, Pt> = { VL: [110, -38], VR: [110, 38], HL: [-160, -38], HR: [-160, 38] };
function hoofRel(leg: Leg, tc: number): { p: Pt; lift: number } {
  const p = ((tc / CYC_C - OFFS[leg]) % 1 + 1) % 1;
  const c = CEN[leg];
  const land: Pt = [c[0] + (STEP[0] * DUTY) / 2, c[1] + (STEP[1] * DUTY) / 2];
  const off: Pt = [c[0] - (STEP[0] * DUTY) / 2, c[1] - (STEP[1] * DUTY) / 2];
  if (p < DUTY) {
    const u = p / DUTY;
    return { p: [lerp(land[0], off[0], u), lerp(land[1], off[1], u)], lift: 0 };
  }
  const u = sm((p - DUTY) / (1 - DUTY));
  return { p: [lerp(off[0], land[0], u), lerp(off[1], land[1], u)], lift: Math.sin(Math.PI * u) };
}
function CrossView({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const tc = t * 1;
  const dist: Pt = [(tc / CYC_C) * STEP[0], (tc / CYC_C) * STEP[1]];
  const hooves = Object.fromEntries(LEGS.map((l) => [l, hoofRel(l, tc)])) as Record<Leg, { p: Pt; lift: number }>;
  const crossedF = hooves.VL.p[1] > hooves.VR.p[1];
  const crossedH = hooves.HL.p[1] > hooves.HR.p[1];
  const ab = (p: Pt): Pt => [CC[0] + p[0], CC[1] + p[1]];
  return (
    <g opacity={o}>
      <defs><clipPath id="sw-cx"><rect x={70} y={560} width={940} height={960} rx="40" /></clipPath></defs>
      <g clipPath="url(#sw-cx)">
        <rect x={70} y={560} width={940} height={960} fill="#E3D3B4" />
        <g fill="#D3BF9C">
          {Array.from({ length: 40 }, (_, i) => {
            const x = 70 + ((((i * 211) % 940) - dist[0] * 1) % 940 + 940) % 940;
            const y = 560 + ((((i * 137) % 960) - dist[1] * 1) % 960 + 960) % 960;
            return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 12 : 20} ry="5" />;
          })}
        </g>
        {/* Pferd als Umriss */}
        <g opacity=".2">
          <TopHorse at={CC} ang={0} look={LOOKS.tonga} step={0} s={6.6} bend={-2} poll={-9} />
        </g>
        {/* Bewegungsrichtung */}
        <Arrow from={[860, 640]} to={[940, 720]} color={COL.forestDeep} w={8} head={20} />
        <T x={860} y={625} size={24} font={FONT_BODY} weight={700} color={COL.forestDeep}>Bewegung</T>
        {LEGS.map((l) => {
          const inner = l[1] === "L";
          const col = inner ? IN_COL : OUT_COL;
          const h = hooves[l];
          const a = ab(ATT[l]);
          const p = ab(h.p);
          return (
            <g key={l}>
              <path d={`M${a[0]} ${a[1]} L${p[0]} ${p[1]}`} stroke={col} strokeWidth="14" strokeLinecap="round" opacity=".9" />
              <circle cx={a[0]} cy={a[1]} r="12" fill={col} />
              {h.lift > 0.02 && <ellipse cx={p[0] + 8} cy={p[1] + 10} rx="24" ry="20" fill="#000" opacity={0.12 * h.lift} />}
              <circle cx={p[0]} cy={p[1]} r={24 + 8 * h.lift} fill={col} stroke={PAPER} strokeWidth="5" />
            </g>
          );
        })}
        {(crossedF || crossedH) && (
          <g>
            {crossedF && <T x={ab([110, 0])[0] + 120} y={ab([110, 0])[1] + 12} size={52} color={COL.rust}>✕</T>}
            {crossedH && <T x={ab([-170, 0])[0] - 110} y={ab([-170, 0])[1] + 12} size={52} color={COL.rust}>✕</T>}
          </g>
        )}
      </g>
      <rect x={70} y={560} width={940} height={960} rx="40" fill="none" stroke={COL.forest} strokeWidth="6" />
      <g transform="translate(110 1470)">
        <circle cx={14} cy={-10} r="14" fill={IN_COL} />
        <T x={40} y={0} size={28} font={FONT_BODY} weight={700} color={COL.forestDeep} anchor="start">innere Beine</T>
        <circle cx={284} cy={-10} r="14" fill={OUT_COL} />
        <T x={310} y={0} size={28} font={FONT_BODY} weight={700} color={COL.forestDeep} anchor="start">äußere Beine</T>
        <T x={590} y={0} size={28} font={FONT_BODY} weight={700} color={COL.rust} anchor="start">✕ = kreuzen</T>
      </g>
    </g>
  );
}

/* ---------- Hilfen ---------- */
const HC: Pt = [540, 1060];
const HS = 6.2;
const LEG_IN_BACK: Pt = [-3, -15];
function AidsView({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const P = (p: Pt) => world(HC, 0, HS, p);
  const dist = t * 120;
  const inLeg = ease((t - at("d1", "innerer") + 0.1) / 0.4);
  const outLeg = ease((t - at("d1", "äußere") + 0.1) / 0.4);
  const reins = ease((t - at("d2", "Zügel") + 0.1) / 0.4);
  const seat = ease((t - at("d2", "Sitz") + 0.1) / 0.4);
  const leg = P(LEG_IN_BACK);
  const legO = P(LEG_OUT);
  const hIn = P(HAND_IN);
  const hOut = P(HAND_OUT);
  return (
    <g opacity={o}>
      <rect x={0} y={560} width={W} height={980} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 44 }, (_, i) => {
          const x = ((((i * 211) % W) - dist) % W + W) % W;
          const y = 560 + ((((i * 137) % 980) - dist * 0.3) % 980 + 980) % 980;
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" />;
        })}
      </g>
      <rect x={0} y={1536} width={W} height={10} fill={COL.brown} opacity=".4" />
      <TopHorse at={HC} ang={2} look={LOOKS.tonga} step={t * 0.9} s={HS} bend={-2} poll={-9}
        glow={{ outerLeg: outLeg * 0.9, innerRein: reins, outerRein: reins, seat: seat * 0.7 }} />
      {/* innerer Schenkel: leicht hinter dem Gurt, seitwärtstreibend */}
      {inLeg > 0.01 && (
        <g opacity={inLeg}>
          <circle cx={leg[0]} cy={leg[1]} r={26 + 5 * pulse} fill="none" stroke={IN_COL} strokeWidth="6" />
          <Arrow from={[leg[0], leg[1] - 70]} to={[leg[0], leg[1] - 22 + 6 * pulse]} color={IN_COL} w={9} head={22} />
          <Callout from={leg} to={[330, 760]} text="innerer Schenkel: treibt seitwärts" color={COL.brownDeep} size={28} k={inLeg} />
          <T x={330} y={830} size={24} font={FONT_BODY} weight={700} color={COL.inkSoft}>leicht hinter dem Gurt</T>
        </g>
      )}
      {outLeg > 0.01 && (
        <g opacity={outLeg}>
          <path d={`M${legO[0] - 70} ${legO[1] + 34} H${legO[0] + 70}`} stroke={OUT_COL} strokeWidth="10" strokeLinecap="round" />
          <Callout from={legO} to={[330, 1370]} text="äußerer Schenkel: begrenzt" color={OUT_COL} size={28} k={outLeg} />
        </g>
      )}
      {reins > 0.01 && (
        <g opacity={reins}>
          <Callout from={hIn} to={[790, 770]} text="leichte Stellung" color={COL.brownDeep} size={28} k={reins} />
          <Callout from={hOut} to={[790, 1370]} text="Zügel begrenzen" color={OUT_COL} size={28} k={reins} />
        </g>
      )}
      <Pop t={t} a={at("d2", "Sitz") - 0.05} x={540} y={1480} text="Sitz geht mit · alles fein dosiert" fill={COL.forestDeep} size={32} o={win(t, at("d2", "Sitz") - 0.05, D_END)} />
      <Arrow from={[880, 610]} to={[960, 650]} color={COL.forestDeep} w={8} head={20} />
      <T x={880} y={600} size={24} font={FONT_BODY} weight={700} color={COL.forestDeep}>Bewegung</T>
    </g>
  );
}

export function renderSchenkelweichen(t: number) {
  const aO = win(t, 0, A_END, 0.4);
  const cO = win(t, A_END - 0.3, C_END, 0.4);
  const dO = win(t, C_END - 0.3, D_END, 0.4);
  const rO = win(t, D_END - 0.3, SW_TOTAL + 1, 0.4);
  const hookEnd = E(L, "a2") + 0.2;
  const endA = S(L, "f1") - 0.15;
  const endO = win(t, endA, SW_TOTAL + 1);
  const hideHead = Math.max(win(t, 0, hookEnd), endO);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <ArenaView t={t} o={aO} />
      <CrossView t={t} o={cO} />
      <AidsView t={t} o={dO} />
      <ArenaView t={t} o={rO * (1 - endO * 0.9)} replay />
      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={endA + 0.1} lines={["Reiterhilfen endlich", "verstehen?"]} sub="Entdecke die Hofgeschichten Reitakademie · 19,90 €" y={230} />
          <Brand t={t} a={S(L, "f2") + 0.1} sub="Reitakademie · einmalig 19,90 € · kein Abo" y={1440} />
        </g>
      )}
      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={70} gap={86} y0={250} lines={[
        { text: "Schenkelweichen sieht", at: -0.9 },
        { text: "einfach aus.", at: -0.6 },
        { text: "Aber was macht dein Pferd?", at: S(L, "a2") - 0.1, hi: true, size: 66 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={A_END - 0.2} top="Vorwärts + seitwärts" sub="von der Viertellinie zurück zum Hufschlag" y={300} />
      <Title t={t} a={S(L, "c1") - 0.1} b={C_END - 0.2} top="Die Beine kreuzen" sub="vorne und hinten – im gleichmäßigen Takt" color={COL.forest} y={300} />
      <Title t={t} a={S(L, "d1")} b={D_END - 0.2} top="Die Hilfen" sub="leicht gegen die Bewegung gestellt, kaum gebogen" y={300} />
      <Title t={t} a={S(L, "e1")} b={R_END - 0.2} top="Wichtig: Vorwärts bleibt!" sub="seitwärts darf das Vorwärts nie verdrängen" color={COL.rust} y={300} />
      <Caption t={t} lines={L} skip={["a1", "a2", "e1", "f1", "f2"]} y={1610} />
    </svg>
  );
}
