import { Arrow, COL, Caption, Chip, E, FONT_BODY, Header, Hook, Merk, PAPER, PointHead, S, T, W, H, back, clamp01, ease, lerp, sm, win, type VLine } from "./rkit";
import { Callout, LOOKS, TopHorse, pollPoint, world, type Pt } from "./top";

/* Reel 17 (9:16): „Was heißt eigentlich Stellung?“ – Pferd von oben, linke Hand.
   Was: Kopf leicht nach innen, nur im Genick. Erkennen: inneres Auge + Nüsterrand (Blick der Reiterin).
   Fehler 1: zu viel Stellung → Hals knickt ab, Schulter rutscht raus. Fehler 2: Kopf verkippt (Ohren ungleich).
   Was in der Akademie bleibt: wie man die Stellung im Sattel gibt. */

/** Zeiten aus der Aufnahme (Brittney v4, 29.10.), Stimme beginnt bei 0,4 s im Reel */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["hook", "Was heißt eigentlich „Stellung“?", 0, 1.85],
  ["was", "Ganz einfach: Dein Pferd dreht den Kopf ein kleines bisschen nach innen.", 2.29, 6.43],
  ["genick", "Nur im Genick, also direkt hinter den Ohren.", 6.72, 9.15],
  ["erk", "Und woran erkennst du das? Du siehst gerade so das innere Auge und den Rand der Nüster.", 9.57, 14.81],
  ["f1", "Fehler Nummer eins: zu viel Stellung. Dann knickt der Hals ab, und die Schulter rutscht nach außen weg.", 15.34, 21.24],
  ["f2", "Fehler Nummer zwei: Das Pferd kippt den Kopf. Ein Ohr ist dann höher als das andere.", 21.73, 26.88],
  ["merke", "Merke: Stellung ist nur ein kleiner Blick nach innen, kein Ziehen am Zügel.", 27.31, 32.15],
  ["q", "Und wie du die Stellung im Sattel richtig gibst?", 32.54, 34.71],
  ["tease", "Das lernt dein Kind in der Reitakademie.", 35.01, 37.15],
];
export const STELLUNG_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
const L = STELLUNG_LINES;
export const STELLUNG_TOTAL = E(L, "tease") + 2.6;
const at_ = (x: number) => x + VO; // Zeitpunkt in der Aufnahme → Reel
const DREHT = at_(3.48);
const ANTWORT = at_(11.24);
const KNICK = at_(18.2);
const KIPPT = at_(23.05);
const OHR = at_(24.93);

/* ---------- Pferd ---------- */
const HC: Pt = [540, 1150];
const SC = 5.0;

function horseState(t: number) {
  const right = sm((t - DREHT) / 0.9);
  const tooMuch = sm((t - S(L, "f1") - 1.3) / 0.7) * (1 - sm((t - S(L, "f2") + 0.3) / 0.6));
  const slip = sm((t - KNICK) / 1.0) * (1 - sm((t - S(L, "f2") + 0.3) / 0.6));
  const poll = -20 * right - 8 * tooMuch;
  const bend = -2 - 34 * tooMuch;
  const drift = 110 * slip * (0.85 + 0.15 * Math.sin(t * 1.3));
  const yaw = 16 * slip;
  return { poll, bend, drift, yaw, tooMuch, slip };
}

function Ground({ t }: { t: number }) {
  const off = (t * 150) % 880;
  return (
    <g>
      <defs>
        <clipPath id="st-sand">
          <rect x={0} y={600} width={W} height={900} />
        </clipPath>
        <linearGradient id="st-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g clipPath="url(#st-sand)">
        <rect x={0} y={600} width={W} height={900} fill="#E3D3B4" />
        <g fill="#D3BF9C" transform={`translate(0 ${off})`}>
          {Array.from({ length: 60 }, (_, i) => {
            const x = (i * 211) % W;
            const y = -280 + ((i * 137) % 1760);
            return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
          })}
        </g>
        <path d={`M${HC[0]} 560 V1540`} stroke={COL.honey} strokeWidth="7" strokeDasharray="22 18" strokeDashoffset={-t * 150} opacity=".7" />
      </g>
      <rect x={0} y={598} width={W} height={150} fill="url(#st-fade)" />
      <rect x={0} y={1494} width={W} height={10} fill={COL.brown} opacity=".4" />
    </g>
  );
}

/* ---------- Nahaufnahme 1: Blick der Reiterin über den Hals ---------- */
function RiderView({ t, k }: { t: number; k: number }) {
  if (k <= 0) return null;
  const look = LOOKS.tonga;
  const turn = -12 * sm((t - S(L, "erk") - 0.4) / 0.8);
  const hi = ease((t - ANTWORT - 0.6) / 0.4);
  const hi2 = ease((t - ANTWORT - 2.0) / 0.4);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const s = back(k);
  return (
    <g opacity={clamp01(k * 2)} transform={`translate(540 1060) scale(${Math.max(0.01, s)})`}>
      <defs>
        <clipPath id="st-rv">
          <circle r="330" />
        </clipPath>
      </defs>
      <circle r="346" fill={COL.honey} />
      <g clipPath="url(#st-rv)">
        <rect x={-340} y={-340} width={680} height={680} fill="#E3D3B4" />
        {/* Hals von oben, läuft vom Sattel weg */}
        <path d="M-170 340 L-62 -30 L62 -30 L170 340 Z" fill={look.coat} />
        <path d="M0 340 L0 -30" stroke={look.mane} strokeWidth="30" strokeLinecap="round" />
        {/* Kopf, im Genick leicht nach innen (links) gedreht */}
        <g transform={`translate(0 -30) rotate(${turn})`}>
          <path d="M-58 0 C-70 -90 -60 -200 -38 -250 Q0 -290 38 -250 C60 -200 70 -90 58 0 Z" fill={look.coat} stroke="#3B2C22" strokeOpacity=".3" strokeWidth="3" />
          <ellipse cx={0} cy={-245} rx={36} ry={26} fill="#6E3A1E" opacity=".6" />
          {/* inneres Auge und Nüsterrand schimmern links */}
          <path d="M-62 -92 q-14 -14 -2 -32 q6 18 2 32 Z" fill="#26201C" />
          <path d="M-42 -252 q-12 -8 -6 -22" fill="none" stroke="#26201C" strokeWidth="6" strokeLinecap="round" />
          <path d="M-14 -20 C-10 -60 10 -60 14 -20" stroke={look.mane} strokeWidth="18" strokeLinecap="round" fill="none" />
          {/* Ohren */}
          <path d="M-52 -4 L-60 -70 L-24 -14 Z M52 -4 L60 -70 L24 -14 Z" fill={look.coat} stroke="#3B2C22" strokeOpacity=".45" strokeWidth="3" />
          {hi > 0 && <circle cx={-66} cy={-108} r={30 + 5 * pulse} fill="none" stroke={COL.honey} strokeWidth="7" opacity={hi} />}
          {hi2 > 0 && <circle cx={-46} cy={-262} r={28 + 5 * pulse} fill="none" stroke={COL.honey} strokeWidth="7" opacity={hi2} />}
        </g>
        {/* Zügel und Hände */}
        <path d="M-96 330 L-52 -60 M96 330 L52 -60" stroke="#3E2C22" strokeWidth="6" />
        <circle cx={-96} cy={318} r="16" fill="#5E4636" />
        <circle cx={96} cy={318} r="16" fill="#5E4636" />
      </g>
      {hi > 0 && <g opacity={hi}><Chip x={-200} y={-140} text="inneres Auge" fill={COL.forest} size={30} /></g>}
      {hi2 > 0 && <g opacity={hi2}><Chip x={-190} y={-250} text="Nüsterrand" fill={COL.forest} size={30} /></g>}
      <g transform="translate(0 395)">
        <Chip x={0} y={0} text="Blick der Reiterin" fill={COL.forestDeep} size={30} />
      </g>
    </g>
  );
}

/* ---------- Nahaufnahme 2: Kopf von vorn (verkippt) ---------- */
function FrontHead({ t, k }: { t: number; k: number }) {
  if (k <= 0) return null;
  const look = LOOKS.tonga;
  const tilt = 13 * sm((t - KIPPT - 0.2) / 0.7);
  const bad = ease((t - OHR - 0.2) / 0.4);
  const rp = (p: Pt): Pt => {
    const a = (tilt * Math.PI) / 180;
    const x = p[0];
    const y = p[1] - 40;
    return [x * Math.cos(a) - y * Math.sin(a), 40 + x * Math.sin(a) + y * Math.cos(a)];
  };
  const eL0 = rp([-78, -300]);
  const eR0 = rp([78, -300]);
  const eL: Pt = [eL0[0] * 0.86, 30 + eL0[1] * 0.86];
  const eR: Pt = [eR0[0] * 0.86, 30 + eR0[1] * 0.86];
  const s = back(k);
  return (
    <g opacity={clamp01(k * 2)} transform={`translate(540 1080) scale(${Math.max(0.01, s)})`}>
      <circle r="346" fill={COL.honey} />
      <circle r="330" fill={PAPER} />
      {/* Ohrhöhen */}
      {bad <= 0 && <path d={`M-200 ${eL[1]} H200`} stroke={COL.forest} strokeWidth="5" strokeDasharray="14 12" opacity={1 - sm((t - KIPPT) / 0.4)} />}
      {bad > 0 && (
        <g opacity={bad}>
          <path d={`M-210 ${eL[1]} H210 M-210 ${eR[1]} H210`} stroke={COL.rust} strokeWidth="5" strokeDasharray="14 12" />
          <Arrow from={[180, eL[1] - 4]} to={[180, eR[1] + 4]} color={COL.rust} w={6} head={14} />
          <Arrow from={[180, eR[1] + 4]} to={[180, eL[1] - 4]} color={COL.rust} w={6} head={14} />
        </g>
      )}
      <g transform={`translate(0 30) scale(0.86) rotate(${tilt} 0 40)`}>
        <path d="M-96 -186 L-78 -300 L-40 -200 Z M96 -186 L78 -300 L40 -200 Z" fill={look.coat} stroke="#3B2C22" strokeOpacity=".4" strokeWidth="3" />
        <path d="M-100 -190 Q0 -240 100 -190 Q132 -40 112 40 Q84 180 62 250 Q0 292 -62 250 Q-84 180 -112 40 Q-132 -40 -100 -190 Z" fill={look.coat} stroke="#3B2C22" strokeOpacity=".3" strokeWidth="3" />
        <ellipse cx={0} cy={232} rx={66} ry={46} fill="#6E3A1E" opacity=".55" />
        <path d="M-22 -214 Q-6 -170 -18 -128 M0 -222 Q12 -176 4 -120 M20 -212 Q30 -172 22 -136" stroke={look.mane} strokeWidth="14" strokeLinecap="round" fill="none" />
        <ellipse cx={-112} cy={-40} rx={14} ry={20} fill="#26201C" />
        <ellipse cx={112} cy={-40} rx={14} ry={20} fill="#26201C" />
        <path d="M-40 214 q-12 18 4 30 M40 214 q12 18 -4 30" stroke="#26201C" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {bad <= 0 && t < KIPPT + 0.3 && <g opacity={1 - sm((t - KIPPT) / 0.3)}><Chip x={0} y={395} text="Ohren gleich hoch ✓" fill={COL.forest} size={32} /></g>}
      {bad > 0 && <g opacity={bad}><Chip x={0} y={395} text="ein Ohr höher ✗" fill={COL.rust} size={34} /></g>}
    </g>
  );
}

function Title({ t, id, top, sub, color = COL.forestDeep, subAt }: { t: number; id: string; top: string; sub?: string; color?: string; subAt?: number }) {
  const o = win(t, S(L, id), E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - S(L, id)) / 0.4);
  const k2 = ease((t - (subAt ?? S(L, id) + 0.2)) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={300} size={Math.min(88, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={378} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

function Tease({ t }: { t: number }) {
  const at = S(L, "tease") - 0.1;
  const k = ease((t - at) / 0.45);
  if (k <= 0) return null;
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, t - at - 2) * 5);
  return (
    <g opacity={k} transform={`translate(540 ${1540 + (1 - k) * 40}) scale(${pulse}) translate(-540 -1540)`}>
      <rect x={90} y={1420} width={900} height={250} rx="36" fill={COL.honey} />
      <T x={540} y={1497} size={50} color={COL.forestDeep}>Das lernt dein Kind</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Reiterhilfen · Link in der Bio</T>
    </g>
  );
}

export function renderStellung(t: number) {
  const st = horseState(t);
  const at: Pt = [HC[0] + st.drift, HC[1]];
  const ang = -90 + st.yaw;
  const head = world(at, ang, SC, [14 + 30 * Math.cos((st.bend * Math.PI) / 180) + 14, 30 * Math.sin((st.bend * Math.PI) / 180) - 2]);
  const genick = world(at, ang, SC, pollPoint(st.bend));
  const neck = world(at, ang, SC, [28, 0]);
  const shoulder = world(at, ang, SC, [16, 15]);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const rv = win(t, S(L, "erk") + 0.1, E(L, "erk") + 0.1, 0.3);
  const fh = win(t, S(L, "f2") + 0.2, E(L, "f2") + 0.1, 0.3);
  const dim = Math.max(rv, fh);
  const merkAt = S(L, "merke") - 0.2;
  const merkO = 1 - sm((t - S(L, "q") + 0.2) / 0.3);
  const qO = win(t, S(L, "q"), STELLUNG_TOTAL + 1);
  const sides = win(t, S(L, "was"), S(L, "q"));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Ground t={t} />
      {sides > 0 && (
        <g opacity={sides * (1 - dim)}>
          <T x={150} y={1460} size={34} font={FONT_BODY} weight={700} color={COL.brown}>← innen</T>
          <T x={930} y={1460} size={34} font={FONT_BODY} weight={700} color={COL.brown}>außen →</T>
        </g>
      )}
      <TopHorse at={at} ang={ang} look={LOOKS.tonga} step={t * 1.4} s={SC} bend={st.bend} poll={st.poll} />
      {/* Was: Kopf leicht nach innen */}
      <Callout k={win(t, DREHT + 0.6, E(L, "was"))} from={head} to={[head[0] - 230, head[1] + 60]} text="Kopf leicht nach innen" color={COL.honey} />
      {/* Blickrichtung: geradeaus (gestrichelt) vs. Kopf (honig) */}
      {(() => {
        const k = Math.max(win(t, DREHT + 0.3, E(L, "genick")), win(t, S(L, "merke"), S(L, "q")) * 0.9) * (1 - dim);
        if (k <= 0) return null;
        const a0 = ((ang + st.bend) * Math.PI) / 180;
        const a1 = ((ang + st.bend + st.poll) * Math.PI) / 180;
        const g = genick;
        return (
          <g opacity={k} strokeLinecap="round">
            <path d={`M${g[0]} ${g[1]} L${g[0] + Math.cos(a0) * 250} ${g[1] + Math.sin(a0) * 250}`} stroke={COL.forest} strokeWidth="5" strokeDasharray="12 12" />
            <path d={`M${g[0]} ${g[1]} L${g[0] + Math.cos(a1) * 250} ${g[1] + Math.sin(a1) * 250}`} stroke={COL.honey} strokeWidth="7" />
            <path d={`M${g[0] + Math.cos(a0) * 200} ${g[1] + Math.sin(a0) * 200} A200 200 0 0 0 ${g[0] + Math.cos(a1) * 200} ${g[1] + Math.sin(a1) * 200}`} fill="none" stroke={COL.honey} strokeWidth="5" />
          </g>
        );
      })()}
      {/* Genick */}
      {win(t, S(L, "genick"), E(L, "genick")) > 0 && (
        <g opacity={win(t, S(L, "genick"), E(L, "genick"))}>
          <circle cx={genick[0]} cy={genick[1]} r={34 + 6 * pulse} fill={COL.honey} opacity=".3" />
          <circle cx={genick[0]} cy={genick[1]} r={26} fill="none" stroke={COL.honey} strokeWidth="6" />
        </g>
      )}
      <Callout k={win(t, S(L, "genick") + 0.3, E(L, "genick"))} from={genick} to={[genick[0] + 250, genick[1] - 40]} text="Genick" color={COL.honey} size={34} />
      <Callout k={win(t, S(L, "genick") + 1.2, E(L, "genick"))} from={neck} to={[neck[0] + 250, neck[1] + 130]} text="Hals bleibt gerade" color={COL.forest} />
      {/* Fehler 1 */}
      <Callout k={win(t, S(L, "f1") + 1.5, E(L, "f1"))} from={neck} to={[neck[0] - 250, neck[1] + 40]} text="Hals knickt ab" color={COL.rust} />
      {st.slip > 0.2 && win(t, KNICK, E(L, "f1")) > 0 && (
        <g opacity={win(t, KNICK + 0.5, E(L, "f1"))}>
          <circle cx={shoulder[0]} cy={shoulder[1]} r={46 + 8 * pulse} fill="none" stroke={COL.rust} strokeWidth="7" />
          <Arrow from={[shoulder[0] + 55, shoulder[1]]} to={[shoulder[0] + 160 + 20 * pulse, shoulder[1]]} color={COL.rust} w={11} head={26} />
          <Chip x={Math.min(880, shoulder[0] + 120)} y={shoulder[1] + 110} text="Schulter raus!" fill={COL.rust} size={32} />
        </g>
      )}
      {/* Nahaufnahmen */}
      {dim > 0 && <rect x={0} y={600} width={W} height={900} fill={COL.bg} opacity={0.82 * dim} />}
      <RiderView t={t} k={rv} />
      <FrontHead t={t} k={fh} />
      <Header t={t} hide={win(t, merkAt, STELLUNG_TOTAL + 1)} />
      <Hook t={t} end={E(L, "hook")} lines={[["Was heißt"], ["eigentlich"], ["„Stellung“?", COL.rust]]} />
      <Title t={t} id="was" top="Kopf leicht nach innen" sub="ein kleines bisschen – nicht mehr" />
      <Title t={t} id="genick" top="Nur im Genick" sub="direkt hinter den Ohren" />
      <Title t={t} id="erk" top="Woran erkennst du’s?" sub="inneres Auge + Nüsterrand schimmern" subAt={ANTWORT} />
      <PointHead t={t} start={S(L, "f1")} end={E(L, "f1")} n="1" title="Zu viel Stellung" sub="Hals knickt ab – Schulter rutscht raus" />
      <PointHead t={t} start={S(L, "f2")} end={E(L, "f2")} n="2" title="Kopf verkippt" sub="ein Ohr höher als das andere" />
      <g opacity={merkO}>
        <Merk t={t} at={merkAt} lines={["Stellung =", "ein kleiner Blick", "nach innen"]} sub="kein Ziehen am Zügel" />
      </g>
      {qO > 0 && (
        <g opacity={qO}>
          <g opacity={ease((t - S(L, "q")) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "q")) / 0.4)) * 30})`}>
            <T x={540} y={250} size={84}>Und wie gibst du</T>
            <T x={540} y={350} size={84} color={COL.rust}>sie richtig?</T>
          </g>
          <g opacity={ease((t - S(L, "q") - 1.0) / 0.4)}>
            <T x={540} y={430} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>das spürt man im Sattel</T>
          </g>
        </g>
      )}
      <Caption t={t} lines={L} skip={["merke", "tease"]} y={1610} />
      <Tease t={t} />
      {lerp(0, 0, 0) > 1 && null}
    </svg>
  );
}
