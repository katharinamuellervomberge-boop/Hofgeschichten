import { AnimHorse } from "@/components/illustrations/akademie/AnimHorse";
import { BODY } from "@/components/illustrations/Horse";
import { getHorse } from "@/content/horses";
import { Arrow, COL, Caption, Chip, E, FONT_BODY, Header, PAPER, S, T, W, H, back, clamp01, ease, lerp, sm, win, type VLine } from "./rkit";
import { Callout, type Pt } from "./top";

/* Pferdewissen (9:16): „Warum können Pferde nicht erbrechen?“ – Pferd in Seitenansicht, hebt neugierig den Kopf.
   Körper wird durchsichtig: Futterweg Maul → Speiseröhre → Magen. Lupe auf den Mageneingang:
   kräftiger Schließmuskel (Kardia) + schräge Einmündung der Speiseröhre, die bei vollem Magen wie eine Klappe zudrückt.
   Fazit: praktisch kein Erbrechen → Magenprobleme können gefährlich werden (ruhig, ohne Drama). */

/** Zeiten aus der Aufnahme (Jessica v4, 02.11.), Stimme beginnt bei 0,4 s im Reel. Teilsätze aus den Sprechpausen. */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["hook", "Warum können Pferde eigentlich nicht erbrechen?", 0, 2.68],
  ["m1", "Bei uns Menschen funktioniert das.", 3.02, 4.77],
  ["m2", "Aber bei Pferden?", 5.09, 6.1],
  ["f1", "Das Futter rutscht durch die Speiseröhre in den Magen.", 6.54, 9.32],
  ["f2", "Und dort ist der Eingang besonders fest verschlossen.", 9.65, 12.36],
  ["s1", "Ein kräftiger Schließmuskel hält ihn zu.", 12.69, 14.88],
  ["s2", "Und weil die Speiseröhre schräg in den Magen mündet,", 15.27, 18.05],
  ["s3", "drückt sich der Eingang wie eine Klappe zusätzlich zu.", 18.05, 20.92],
  ["d1", "Deshalb können Pferde praktisch nicht erbrechen.", 21.36, 24.34],
  ["d2", "Und genau deshalb können Magenprobleme besonders gefährlich werden.", 24.7, 28.58],
  ["e1", "Wusstest du das schon?", 28.96, 29.85],
  ["e2", "Speichere dir dieses Pferdewissen!", 30.21, 32.22],
];
export const ERBRECHEN_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
const L = ERBRECHEN_LINES;
export const ERBRECHEN_TOTAL = E(L, "e2") + 2.6;

/** Wortzeitpunkt im Teilsatz (anteilig nach Zeichen) */
function at(id: string, word: string) {
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

const LOOK = getHorse("tonga")!.look;
const WALL = "#D9967A";
const INSIDE = "#F4D5C4";
const FOOD = COL.honey;

/* ---------- Anatomie in Pferde-Koordinaten (viewBox 70 20 320 292) ---------- */
const ESO: Pt[] = [[354, 118], [336, 106], [318, 102], [302, 112], [292, 128], [286, 146], [274, 150], [260, 140], [246, 132], [233, 132]];
const STOMACH = "M234,134 C246,142 246,160 236,168 C224,178 200,176 192,164 C184,152 188,134 200,129 C210,125 224,128 234,134 Z";
const CARDIA: Pt = [233, 133];

function polyLen(p: Pt[]) {
  let s = 0;
  for (let i = 1; i < p.length; i++) s += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
  return s;
}
function polyAt(p: Pt[], u: number): Pt {
  let rest = clamp01(u) * polyLen(p);
  for (let i = 1; i < p.length; i++) {
    const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
    if (rest <= d) return [lerp(p[i - 1][0], p[i][0], rest / d), lerp(p[i - 1][1], p[i][1], rest / d)];
    rest -= d;
  }
  return p[p.length - 1];
}
/** weiche Kurve durch Punkte (Catmull-Rom) */
function smoothPath(p: Pt[]) {
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}
const ESO_D = smoothPath(ESO);
const ESO_LEN = polyLen(ESO) * 1.05;

/* ---------- Pferd: Platz im Bild (groß ↔ klein bei der Lupe) ---------- */
type Place = { x: number; y: number; k: number };
const BIG: Place = { x: 70, y: 690, k: 2.88 };
const SMALL: Place = { x: 20, y: 1010, k: 1.55 };
const toS = (pl: Place, [x, y]: Pt): Pt => [pl.x + (x - 70) * pl.k, pl.y + (y - 20) * pl.k];

/** Schnittlinie quer durch den Hals, um `off` Richtung Kopf verschoben (von y=-60 bis y=200) */
const SLICES = [0, 1, 2, 3, 4];
function seamPts(off: number) {
  const dx = 0.72 * off, dy = -0.69 * off;
  const x = (y: number) => 253 + ((y - 30) * 38) / 120;
  return `L${x(-60) + dx},${-60 + dy} L${x(200) + dx},${200 + dy}`;
}

function seamRev(off: number) {
  const dx = 0.72 * off, dy = -0.69 * off;
  const x = (y: number) => 253 + ((y - 30) * 38) / 120;
  return `L${x(200) + dx},${200 + dy} L${x(-60) + dx},${-60 + dy}`;
}

/** Pferd in Seitenansicht; Kopf und Hals drehen um den Halsansatz (`nod` < 0 = Kopf hoch) */
function SideHorse({ t, pl, nod, xray, blink }: { t: number; pl: Place; nod: number; xray: number; blink: number }) {
  const horse = <AnimHorse look={LOOK} gait="stand" time={t} />;
  const breathe = 1 + 0.006 * Math.sin(t * 1.7);
  return (
    <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
      <defs>
        <clipPath id="eb-rest"><path d={`M0,-60 ${seamPts(8)} L460,200 L460,420 L0,420 Z`} /></clipPath>
        {SLICES.map((i) => (
          <clipPath key={i} id={`eb-s${i}`}><path d={i === SLICES.length - 1 ? `M${seamPts(i * 7).slice(1)} L460,200 L460,-60 Z` : `M${seamPts(i * 7).slice(1)} ${seamRev((i + 1) * 7 + 4)} Z`} /></clipPath>
        ))}
      </defs>
      <g opacity={1 - 0.62 * xray} transform={`translate(195 300) scale(1 ${breathe}) translate(-195 -300)`}>
        <g clipPath="url(#eb-rest)">{horse}</g>
        {/* Hals biegt sich in Scheiben, damit keine Kante entsteht */}
        {SLICES.map((i) => (
          <g key={i} transform={`rotate(${(nod * (i + 1)) / SLICES.length} 284 110)`}>
            <g clipPath={`url(#eb-s${i})`}>
              {horse}
              {i === SLICES.length - 1 && blink > 0.01 && <ellipse cx="330" cy="78" rx="5.4" ry={5.4 * blink} fill={LOOK.coat} />}
            </g>
          </g>
        ))}
      </g>
      {xray > 0.01 && (
        <g opacity={xray}>
          <path d={BODY} fill="none" stroke={COL.forestDeep} strokeWidth={1.4} strokeDasharray="4 3" opacity=".7" />
          {/* Zwerchfell (gestrichelt), Magen liegt direkt dahinter */}
          <path d="M250,108 C240,130 240,170 252,196" fill="none" stroke={COL.brown} strokeWidth="1.2" strokeDasharray="2 3" opacity=".6" />
        </g>
      )}
    </svg>
  );
}

/** Speiseröhre + Magen auf dem durchsichtigen Pferd (Pferde-Koordinaten, im selben svg-Platz) */
function Anatomy({ t, pl, o, draw, stomach, bolus, ring }: { t: number; pl: Place; o: number; draw: number; stomach: number; bolus: number; ring: number }) {
  if (o <= 0.01) return null;
  const b = polyAt(ESO, bolus);
  return (
    <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible" opacity={o}>
      <g transform={`translate(214 150) scale(${Math.max(0.01, stomach)}) translate(-214 -150)`} opacity={Math.min(1, stomach)}>
        <path d={STOMACH} fill={INSIDE} stroke={WALL} strokeWidth="3" />
        <path d="M196,160 Q214,154 238,160" fill="none" stroke={FOOD} strokeWidth="2" opacity=".6" />
      </g>
      <path d={ESO_D} fill="none" stroke={WALL} strokeWidth="6.5" strokeLinecap="round" strokeDasharray={`${ESO_LEN * draw} ${ESO_LEN}`} />
      <path d={ESO_D} fill="none" stroke={INSIDE} strokeWidth="2.4" strokeLinecap="round" strokeDasharray={`${ESO_LEN * draw} ${ESO_LEN}`} />
      {bolus > 0 && bolus < 1 && <circle cx={b[0]} cy={b[1]} r="3.6" fill={FOOD} stroke={COL.brownDeep} strokeWidth=".8" />}
      {ring > 0.01 && (
        <g opacity={ring}>
          <circle cx={CARDIA[0]} cy={CARDIA[1]} r={7 + Math.sin(t * 6)} fill="none" stroke={COL.rust} strokeWidth="2.4" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Lupe: Mageneingang ---------- */
const LC: Pt = [700, 760];
const LR = 270;
const LS = LR / 280;
const toL = ([x, y]: Pt): Pt => [LC[0] + x * LS, LC[1] + y * LS];
// Speiseröhre kommt schräg von links oben
const DIR: Pt = [0.727, 0.687];
const NRM: Pt = [-0.687, 0.727];
const J: Pt = [-55, -21];
const along = (s: number, side = 0): Pt => [J[0] + DIR[0] * s + NRM[0] * side, J[1] + DIR[1] * s + NRM[1] * side];
const TUBE_ANG = (Math.atan2(DIR[1], DIR[0]) * 180) / Math.PI;

function Lens({ t, o, bolusU, closed, squeeze, angle, flap, press, fill }: { t: number; o: number; bolusU: number; closed: number; squeeze: number; angle: number; flap: number; press: number; fill: number }) {
  if (o <= 0.01) return null;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const lumen = 30 * (1 - closed);
  const A = along(-420);
  const tip = along(30);
  const cuff = along(-38);
  const b = bolusU < 0.75 ? along(lerp(-360, -10, bolusU / 0.75)) : along(lerp(-10, 150, (bolusU - 0.75) / 0.25));
  // Klappe: Scharnier an der hinteren Lippe, schwenkt über die Öffnung
  const hinge = along(18, -34);
  const flapAng = lerp(TUBE_ANG + 20, TUBE_ANG + 90, flap);
  const level = lerp(170, 60, fill);
  return (
    <g opacity={o}>
      <defs>
        <clipPath id="eb-lens"><circle cx={LC[0]} cy={LC[1]} r={LR} /></clipPath>
      </defs>
      <circle cx={LC[0]} cy={LC[1]} r={LR + 16} fill={COL.forestDeep} opacity=".12" />
      <circle cx={LC[0]} cy={LC[1]} r={LR} fill={PAPER} />
      <g clipPath="url(#eb-lens)">
        <g transform={`translate(${LC[0]} ${LC[1]}) scale(${LS})`}>
          {/* Speiseröhre: Wand + Innenraum */}
          <path d={`M${A[0]},${A[1]} L${tip[0]},${tip[1]}`} stroke={WALL} strokeWidth="96" strokeLinecap="butt" />
          {/* Magen */}
          <ellipse cx="80" cy="150" rx="262" ry="202" fill={WALL} />
          <ellipse cx="80" cy="150" rx="240" ry="180" fill={INSIDE} />
          {/* Mageninhalt */}
          <clipPath id="eb-mag"><ellipse cx="80" cy="150" rx="240" ry="180" /></clipPath>
          <g clipPath="url(#eb-mag)">
            <path d={`M-200,${level + 6 * Math.sin(t * 2)} Q-60,${level - 14} 80,${level + 4 * Math.sin(t * 2 + 1)} T360,${level} L360,400 L-200,400 Z`} fill={COL.sandLight} />
            {[[-40, 40], [60, 20], [150, 60], [10, 90]].map(([x, dy], i) => (
              <ellipse key={i} cx={x} cy={level + dy} rx="16" ry="9" fill={COL.sand} transform={`rotate(${i * 40} ${x} ${level + dy})`} />
            ))}
          </g>
          {/* Schließmuskel (Manschette um den Eingang) */}
          <g transform={`translate(${cuff[0]} ${cuff[1]}) rotate(${TUBE_ANG})`}>
            <rect x={-30} y={-62 - 6 * squeeze} width={60} height={124 + 12 * squeeze} rx="22" fill={COL.rust} />
            {[-18, -6, 6, 18].map((x) => (
              <path key={x} d={`M${x},${-54 - 6 * squeeze} L${x},${54 + 6 * squeeze}`} stroke="#8A4630" strokeWidth="3" opacity=".7" />
            ))}
          </g>
          {/* Innenraum der Röhre (wird beim Schließen schmal) */}
          {lumen > 0.5 && <path d={`M${A[0]},${A[1]} L${tip[0]},${tip[1]}`} stroke={INSIDE} strokeWidth={lumen} />}
          {lumen <= 0.5 && <path d={`M${A[0]},${A[1]} L${along(-70)[0]},${along(-70)[1]}`} stroke={INSIDE} strokeWidth={30} />}
          {/* Futterbrocken */}
          {bolusU > 0 && bolusU < 1 && <circle cx={b[0]} cy={b[1]} r={24 - 10 * Math.max(0, (bolusU - 0.6) * 2)} fill={FOOD} stroke={COL.brownDeep} strokeWidth="3" />}
          {/* Quetsch-Pfeile am Muskel */}
          {squeeze > 0.01 && (
            <g opacity={squeeze}>
              <g transform={`translate(${cuff[0]} ${cuff[1]}) rotate(${TUBE_ANG})`}>
                <Arrow from={[0, -130 - 8 * pulse]} to={[0, -78]} color={COL.rust} w={9} head={18} />
                <Arrow from={[0, 130 + 8 * pulse]} to={[0, 78]} color={COL.rust} w={9} head={18} />
              </g>
            </g>
          )}
          {/* Winkel: schräge Einmündung */}
          {angle > 0.01 && (
            <g opacity={angle}>
              <path d={`M${along(-200)[0]},${along(-200)[1]} L${J[0]},${J[1]} L${J[0] + 230},${J[1] - 40}`} fill="none" stroke={COL.forest} strokeWidth="5" strokeDasharray="12 9" />
              <path d={`M${along(-90)[0]},${along(-90)[1]} A 90 90 0 0 1 ${J[0] + 88},${J[1] - 16}`} fill="none" stroke={COL.forest} strokeWidth="7" strokeDasharray={`${180 * angle} 400`} />
            </g>
          )}
          {/* Klappe */}
          {flap > 0.01 && (
            <g opacity={Math.min(1, flap * 3)} transform={`translate(${hinge[0]} ${hinge[1]}) rotate(${flapAng})`}>
              <rect x={-4} y={-14} width={96} height={28} rx="14" fill={WALL} stroke="#B9735A" strokeWidth="3" />
            </g>
          )}
          {/* Druck von innen drückt die Klappe zu */}
          {press > 0.01 && (
            <g opacity={press}>
              {[[30, 130], [110, 110], [-40, 150]].map(([x, y], i) => (
                <Arrow key={i} from={[x, y + 10 * pulse]} to={[x - 40 + i * 6, y - 70 + 10 * pulse]} color={COL.honey} w={9} head={18} />
              ))}
            </g>
          )}
        </g>
      </g>
      <circle cx={LC[0]} cy={LC[1]} r={LR} fill="none" stroke={COL.forest} strokeWidth="10" />
    </g>
  );
}

/* ---------- Texte ---------- */
function Title({ t, a, b, top, sub, color = COL.forestDeep }: { t: number; a: number; b: number; top: string; sub?: string; color?: string }) {
  const o = win(t, a, b);
  if (o <= 0) return null;
  const k1 = ease((t - a) / 0.4);
  const k2 = ease((t - a - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={300} size={Math.min(84, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={378} size={Math.min(42, 940 / (sub.length * 0.52))} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

/** Einstieg direkt auf der Grafik: erste Zeile schon im ersten Bild, „NICHT“ springt bei „nicht“ auf */
function Hook({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook") + 0.15, 0.35);
  if (o <= 0) return null;
  const k = (a: number) => ease((t - a) / 0.4);
  const a1 = -0.9;
  const a2 = 0.25;
  const aN = at("hook", "nicht") - 0.15;
  const a3 = aN + 0.3;
  const n = back((t - aN) / 0.45);
  return (
    <g opacity={o}>
      <g opacity={k(a1)} transform={`translate(0 ${(1 - k(a1)) * 30})`}>
        <T x={540} y={250} size={86}>Warum können Pferde</T>
      </g>
      <g opacity={k(a2)} transform={`translate(0 ${(1 - k(a2)) * 30})`}>
        <T x={540} y={345} size={86} italic>eigentlich</T>
      </g>
      {n > 0.01 && (
        <g opacity={Math.min(1, n)} transform={`translate(540 455) scale(${Math.max(0.01, n)}) translate(-540 -455)`}>
          <T x={540} y={515} size={176} color={COL.rust}>NICHT</T>
          <rect x={300} y={538} width={480 * ease((t - aN - 0.3) / 0.4)} height={12} rx="6" fill={COL.rust} opacity=".85" />
        </g>
      )}
      <g opacity={k(a3)} transform={`translate(0 ${(1 - k(a3)) * 30})`}>
        <T x={540} y={640} size={96}>erbrechen?</T>
      </g>
    </g>
  );
}

function QBubble({ p, k }: { p: Pt; k: number }) {
  if (k <= 0.01) return null;
  return (
    <g transform={`translate(${p[0]} ${p[1]}) scale(${Math.max(0.01, k)})`} opacity={Math.min(1, k)}>
      <circle r="62" fill={COL.rust} />
      <path d="M-20 52 L-44 86 L6 60 Z" fill={COL.rust} />
      <T x={0} y={30} size={88} color={PAPER}>?</T>
    </g>
  );
}

function Ende({ t }: { t: number }) {
  const a = S(L, "e1") - 0.15;
  const k1 = ease((t - a) / 0.45);
  if (k1 <= 0) return null;
  const a2 = S(L, "e2") - 0.15;
  const k2 = back((t - a2) / 0.5);
  const kb = ease((t - a2 - 1.0) / 0.5);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, t - a2 - 1) * 5);
  return (
    <g>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={300} size={88}>Wusstest du</T>
        <T x={540} y={400} size={88}>das schon? 🐴</T>
      </g>
      {k2 > 0.01 && (
        <g opacity={Math.min(1, k2)} transform={`translate(540 520) scale(${Math.max(0.01, k2) * pulse}) translate(-540 -520)`}>
          <rect x={110} y={460} width={860} height={120} rx="60" fill={COL.rust} />
          <path d="M170 488 h34 v58 l-17 -13 l-17 13 Z" fill={PAPER} />
          <T x={580} y={538} size={42} font={FONT_BODY} weight={700} color={PAPER}>Speichere dir dieses Pferdewissen!</T>
        </g>
      )}
      <g opacity={kb} transform={`translate(0 ${(1 - kb) * 40})`}>
        <rect x={90} y={1560} width={900} height={170} rx="34" fill={COL.honey} />
        <path d="M150 1676 v-42 a26 26 0 0 1 52 0 v42" fill="none" stroke={COL.forestDeep} strokeWidth="9" strokeLinecap="round" />
        <T x={580} y={1636} size={54} color={COL.forestDeep}>Die Hofgeschichten</T>
        <T x={580} y={1696} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Pferdewissen · Reitakademie · Link in der Bio</T>
      </g>
    </g>
  );
}

function Ground() {
  return (
    <g>
      <defs>
        <linearGradient id="eb-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={0} y={1390} width={W} height={160} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 16 }, (_, i) => {
          const x = (i * 211) % W;
          const y = 1450 + ((i * 37) % 90);
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>
      <rect x={0} y={1388} width={W} height={60} fill="url(#eb-fade)" />
      <rect x={0} y={1544} width={W} height={10} fill={COL.brown} opacity=".35" />
    </g>
  );
}

export function renderErbrechen(t: number) {
  // Phasen
  const xray = sm((t - E(L, "m2") + 0.1) / 0.8) * (1 - sm((t - S(L, "d1") - 0.2) / 0.8));
  const zoom = sm((t - S(L, "f2") + 0.1) / 0.9) * (1 - sm((t - S(L, "d1") + 0.1) / 0.9));
  const pl: Place = { x: lerp(BIG.x, SMALL.x, zoom), y: lerp(BIG.y, SMALL.y, zoom), k: lerp(BIG.k, SMALL.k, zoom) };

  // Kopf: hebt sich neugierig im Hook, ruhiges Nicken, am Ende Blick nach vorn/unten zum Zuschauer
  const lift = sm((t - 0.2) / 0.9) * (1 - sm((t - S(L, "m1")) / 1.0));
  const idle = Math.sin(t * 1.1) * 1.2;
  const look = sm((t - S(L, "e1") + 0.2) / 0.7);
  const nod = -8 * lift + idle * (1 - xray) + 6 * look * (1 - 0.3 * Math.sin(Math.max(0, t - S(L, "e1")) * 2.2));
  const bt = (t - S(L, "e2") - 0.4) % 2.6;
  const blink = t > S(L, "e2") && bt >= 0 && bt < 0.22 ? Math.sin((bt / 0.22) * Math.PI) : t > 2.2 && t < 2.42 ? Math.sin(((t - 2.2) / 0.22) * Math.PI) : 0;

  // Anatomie
  const draw = sm((t - S(L, "f1") + 0.1) / 1.3);
  const stomachK = back((t - at("f1", "Magen") + 0.15) / 0.5);
  const loop = (t - S(L, "f1") - 0.6) / 2.2;
  const bolus = t > S(L, "f1") + 0.6 && t < S(L, "f2") + 0.3 ? loop - Math.floor(loop) : 0;
  const anaO = Math.max(win(t, S(L, "f1") - 0.2, E(L, "s3")), 0) * xray;
  const ringOnHorse = win(t, S(L, "f2"), E(L, "s3"));

  // Lupe
  const lensK = back((t - S(L, "f2") - 0.35) / 0.6);
  const lensO = Math.min(1, lensK) * (1 - sm((t - S(L, "d1") + 0.2) / 0.5));
  const bolusU = clamp01((t - S(L, "f2") - 0.6) / 1.4);
  const closeA = at("f2", "fest") - 0.1;
  const closed = sm((t - closeA) / 0.5);
  const squeeze = win(t, S(L, "s1") + 0.1, E(L, "s1") + 0.2) * (0.6 + 0.4 * Math.sin(t * 7));
  const angle = ease((t - at("s2", "schräg")) / 0.6) * win(t, S(L, "s2"), E(L, "s3"));
  const flap = sm((t - S(L, "s3") - 0.1) / 0.8);
  const press = win(t, S(L, "s3"), E(L, "s3") + 0.3);
  const fill = sm((t - S(L, "s3") + 0.3) / 1.2);

  const cardiaS = toS(pl, CARDIA);
  const qK = back((t - S(L, "m2") - 0.05) / 0.45) * (1 - sm((t - S(L, "f1") + 0.2) / 0.4));
  const head = toS(pl, [338, 46]);
  const humanO = win(t, S(L, "m1"), E(L, "m1") + 0.1);

  const hookOn = win(t, 0, E(L, "hook"));
  const hideHead = Math.max(hookOn, win(t, S(L, "e1") - 0.15, ERBRECHEN_TOTAL + 1));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Ground />
      <SideHorse t={t} pl={pl} nod={nod} xray={xray} blink={blink} />
      <Anatomy t={t} pl={pl} o={anaO} draw={draw} stomach={stomachK} bolus={bolus} ring={ringOnHorse} />

      {/* Beschriftung auf dem Pferd (Futterweg) */}
      <g opacity={win(t, S(L, "f1"), E(L, "f1") + 0.1)}>
        <Callout k={ease((t - at("f1", "Speiseröhre")) / 0.4)} from={toS(pl, [296, 120])} to={[880, 820]} text="Speiseröhre" color={COL.brownDeep} size={32} />
        <Callout k={ease((t - at("f1", "Magen")) / 0.4)} from={toS(pl, [214, 152])} to={[300, 640]} text="Magen" color={COL.rust} size={32} />
      </g>

      {/* Lupe auf den Mageneingang */}
      {lensO > 0.01 && (
        <g opacity={lensO}>
          <path d={`M${cardiaS[0]} ${cardiaS[1]} L${LC[0] - LR * 0.72} ${LC[1] + LR * 0.7}`} stroke={COL.forest} strokeWidth="5" strokeDasharray="10 8" />
          <circle cx={cardiaS[0]} cy={cardiaS[1]} r="16" fill="none" stroke={COL.forest} strokeWidth="5" />
        </g>
      )}
      <g transform={`translate(${LC[0]} ${LC[1]}) scale(${Math.max(0.01, Math.min(1.05, lensK))}) translate(${-LC[0]} ${-LC[1]})`}>
        <Lens t={t} o={lensO} bolusU={bolusU} closed={closed} squeeze={squeeze} angle={angle} flap={flap} press={press} fill={fill} />
      </g>
      {lensO > 0.01 && (
        <g opacity={lensO}>
          <Callout k={ease((t - S(L, "f2") - 0.9) / 0.4)} from={toL(along(-210, 0))} to={[230, 560]} text="Speiseröhre" color={COL.brownDeep} size={30} />
          <Callout k={ease((t - S(L, "f2") - 1.2) / 0.4)} from={toL([140, 200])} to={[790, 1090]} text="Magen" color={COL.brownDeep} size={30} />
          <Callout k={ease((t - at("s1", "Schließmuskel") + 0.1) / 0.4)} from={toL(along(-38, 50))} to={[220, 760]} text="Schließmuskel" color={COL.rust} size={32} />
          <Callout k={angle} from={toL([J[0] + 70, J[1] - 40])} to={[860, 440]} text="mündet schräg" color={COL.forest} size={30} />
          <Callout k={ease((t - at("s3", "Klappe") + 0.1) / 0.4)} from={toL(along(60, -10))} to={[230, 930]} text="wirkt wie eine Klappe" color={COL.forest} size={30} />
        </g>
      )}

      {/* Mensch: geht – Pferd: ? */}
      {humanO > 0 && (
        <g opacity={humanO}>
          <Chip x={540} y={520} text="Mensch: ✓ möglich" fill={COL.forest} size={40} />
        </g>
      )}
      <QBubble p={[head[0] - 230, head[1] - 40]} k={qK} />

      {/* Fazit */}
      {win(t, S(L, "d1") - 0.1, E(L, "d2")) > 0 && (
        <g opacity={win(t, S(L, "d1") - 0.1, E(L, "d2"))}>
          <g opacity={ease((t - S(L, "d1") + 0.1) / 0.4)}>
            <T x={540} y={265} size={74}>Deshalb können Pferde</T>
            <T x={540} y={360} size={72}>
              praktisch <tspan fill={COL.rust}>nicht</tspan> erbrechen!
            </T>
          </g>
          <g opacity={ease((t - S(L, "d2") + 0.05) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "d2") + 0.05) / 0.4)) * 30})`}>
            <rect x={110} y={420} width={860} height={150} rx="34" fill={COL.sage} />
            <T x={540} y={485} size={38} font={FONT_BODY} weight={700} color={COL.forestDeep}>Und genau deshalb können Magenprobleme</T>
            <T x={540} y={538} size={38} font={FONT_BODY} weight={700} color={COL.forestDeep}>besonders gefährlich werden.</T>
          </g>
          <g opacity={ease((t - at("d2", "gefährlich")) / 0.5)}>
            <Chip x={540} y={1650} text="Bauchweh beim Pferd? Tierarzt rufen." fill={COL.forestDeep} size={36} />
          </g>
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Pferdewissen" hide={hideHead} />
      <Title t={t} a={S(L, "m1")} b={E(L, "m1")} top="Bei uns Menschen …" sub="funktioniert das" color={COL.forest} />
      <Title t={t} a={S(L, "m2")} b={E(L, "m2") + 0.1} top="Aber bei Pferden?" color={COL.rust} />
      <Title t={t} a={S(L, "f1") - 0.1} b={E(L, "f1")} top="Der Weg des Futters" sub="Maul → Speiseröhre → Magen" />
      <Title t={t} a={S(L, "f2")} b={E(L, "f2")} top="Der Mageneingang" sub="ist besonders fest verschlossen" />
      <Title t={t} a={S(L, "s1")} b={E(L, "s1")} top="Kräftiger Schließmuskel" sub="hält den Eingang zu" color={COL.rust} />
      <Title t={t} a={S(L, "s2")} b={E(L, "s3")} top="Schräge Einmündung" sub="bei vollem Magen drückt sie wie eine Klappe zu" color={COL.forest} />
      <Caption t={t} lines={L} skip={["hook", "d1", "d2", "e1", "e2"]} y={1580} />
      <Ende t={t} />
      <Hook t={t} />
    </svg>
  );
}
