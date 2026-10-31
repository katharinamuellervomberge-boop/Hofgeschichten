import { Arrow, COL, Caption, Dots, E, FONT_BODY, Header, PAPER, PointHead, S, T, W, H, back, clamp01, ease, sm, win, type VLine } from "./rkit";
import { HAND_IN, LEG_IN, LOOKS, TopHorse, legOut, world, type Pt } from "./top";

/* Reel 18 (9:16): „Alle Reiterhilfen in 40 Sekunden“ – Spickzettel zum Speichern (Format wie „Die Reitbahn in 40 Sekunden“).
   Pferd von oben, linke Hand. Gewicht · Schenkel · Zügel (+ Stimme). Endkarte = Spickzettel zum Screenshotten.
   Was in der Akademie bleibt: wie die Hilfen zusammenspielen und wie man sie im Sattel gibt. */

/** Zeiten aus der Aufnahme (Jessica v4, 31.10.), Stimme beginnt bei 0,4 s im Reel */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["hook", "Alle Reiterhilfen in 40 Sekunden – speicher dir das!", 0, 3.62],
  ["drei", "Du sprichst mit deinem Pferd über drei Hilfen: Gewicht, Schenkel und Zügel.", 4.09, 8.82],
  ["g", "Eins: das Gewicht. Du belastest beide Gesäßknochen, nur einen – oder du entlastest den Rücken.", 9.25, 15.93],
  ["s", "Zwei: die Schenkel. Am Gurt treiben sie vorwärts. Etwas dahinter treiben sie seitwärts – oder passen auf.", 16.33, 23.65],
  ["z", "Drei: die Zügel. Sie nehmen an, geben nach, halten durch – oder zeigen den Weg.", 24.12, 30.11],
  ["stimme", "Und deine Stimme? Die lobt und beruhigt.", 30.51, 33.19],
  ["merke", "Merke: Gewicht vor Schenkel, Schenkel vor Zügel.", 33.56, 36.96],
  ["tease", "Wie das zusammenspielt, lernt dein Kind in der Reitakademie.", 37.32, 40.67],
];
export const HILFEN_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
/** Wortzeitpunkte aus der Aufnahme (Pausen gemessen, Rest geschätzt) */
const MARKS: Record<string, number> = {
  "drei|Gewicht": 6.75, "drei|Schenkel": 7.5, "drei|Zügel": 8.2,
  "g|beide": 12.0, "g|nur einen": 13.0, "g|entlastest": 14.6,
  "s|Am Gurt": 18.1, "s|Etwas dahinter": 20.1, "s|oder passen": 22.4,
  "z|nehmen an": 25.9, "z|geben nach": 26.8, "z|halten durch": 27.8, "z|zeigen den Weg": 29.0,
  "merke|Gewicht vor": 34.4,
};
const L = HILFEN_LINES;
export const HILFEN_TOTAL = E(L, "tease") + 2.6;

/** Zeitpunkt eines Wortes im Satz (anteilig nach Zeichen) */
function at(id: string, word: string) {
  if (MARKS[`${id}|${word}`] !== undefined) return MARKS[`${id}|${word}`] + VO;
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

const HC: Pt = [540, 1080];
const SC = 5.2;
const ANG = -90;
const w = (p: Pt) => world(HC, ANG, SC, p);

/* ---------- Boden ---------- */
function Ground({ t }: { t: number }) {
  const off = (t * 130) % 880;
  return (
    <g>
      <defs>
        <clipPath id="hi-sand">
          <rect x={0} y={600} width={W} height={900} />
        </clipPath>
        <linearGradient id="hi-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g clipPath="url(#hi-sand)">
        <rect x={0} y={600} width={W} height={900} fill="#E3D3B4" />
        <g fill="#D3BF9C" transform={`translate(0 ${off})`}>
          {Array.from({ length: 60 }, (_, i) => {
            const x = (i * 211) % W;
            const y = -280 + ((i * 137) % 1760);
            return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
          })}
        </g>
        <path d={`M${HC[0]} 560 V1540`} stroke={COL.honey} strokeWidth="7" strokeDasharray="22 18" strokeDashoffset={-t * 130} opacity=".6" />
      </g>
      <rect x={0} y={598} width={W} height={150} fill="url(#hi-fade)" />
      <rect x={0} y={1494} width={W} height={10} fill={COL.brown} opacity=".4" />
    </g>
  );
}

/* ---------- Liste rechts neben dem Pferd ---------- */
type Item = { text: string; sub?: string; at: number };
function List({ t, items, o, col }: { t: number; items: Item[]; o: number; col: string }) {
  if (o <= 0) return null;
  const cur = items.reduce((c, it, i) => (t >= it.at ? i : c), -1);
  const h = items.some((i) => i.sub) ? 96 : 80;
  const y0 = 1080 - ((items.length - 1) * (h + 18)) / 2;
  return (
    <g opacity={o}>
      {items.map((it, i) => {
        const k = ease((t - it.at) / 0.35);
        if (k <= 0) return null;
        const on = i === cur;
        const y = y0 + i * (h + 18);
        const sc = on ? 1 + 0.06 * back((t - it.at) / 0.4) - 0.06 : 0.94;
        return (
          <g key={i} opacity={k * (on ? 1 : 0.75)} transform={`translate(${830 + (1 - k) * 60} ${y}) scale(${sc})`}>
            <rect x={-200} y={-h / 2} width={400} height={h} rx={h / 2} fill={on ? col : PAPER} stroke={col} strokeWidth="4" />
            <T x={0} y={it.sub ? -4 : 12} size={34} font={FONT_BODY} weight={700} color={on ? PAPER : col}>{it.text}</T>
            {it.sub && <T x={0} y={32} size={25} font={FONT_BODY} weight={700} color={on ? PAPER : COL.inkSoft}>{it.sub}</T>}
          </g>
        );
      })}
    </g>
  );
}

/* ---------- Markierungen am Pferd ---------- */
function Glow({ p, k, r = 30, col = COL.honey, pulse }: { p: Pt; k: number; r?: number; col?: string; pulse: number }) {
  if (k <= 0.01) return null;
  return (
    <g opacity={k}>
      <circle cx={p[0]} cy={p[1]} r={r + 8 + 5 * pulse} fill={col} opacity=".28" />
      <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={col} strokeWidth="6" />
    </g>
  );
}

function WeightMarks({ t, pulse }: { t: number; pulse: number }) {
  const o = win(t, S(L, "g") + 0.6, E(L, "g"));
  if (o <= 0) return null;
  const a1 = at("g", "beide");
  const a2 = at("g", "nur einen");
  const a3 = at("g", "entlastest");
  const both = sm((t - a1) / 0.3) * (1 - sm((t - a2) / 0.3));
  const one = sm((t - a2) / 0.3) * (1 - sm((t - a3) / 0.3));
  const light = sm((t - a3) / 0.3);
  const L1 = w([-3, -5]);
  const R1 = w([-3, 5]);
  return (
    <g opacity={o}>
      <Glow p={L1} k={both + one} r={22 + 8 * one} pulse={pulse} />
      <Glow p={R1} k={both} r={22} pulse={pulse} />
      {/* Gewicht nach unten: Pfeile auf die Sitzknochen */}
      {both + one > 0.05 && (
        <g opacity={Math.max(both, one)}>
          <Arrow from={[L1[0] - 70, L1[1] - 110]} to={[L1[0] - 20, L1[1] - 34]} color={COL.honey} w={8} head={18} />
          {both > 0.05 && <Arrow from={[R1[0] + 70, R1[1] - 110]} to={[R1[0] + 20, R1[1] - 34]} color={COL.honey} w={8} head={18} />}
        </g>
      )}
      {/* entlasten: Pfeile nach oben, Rücken frei */}
      {light > 0.05 && (
        <g opacity={light}>
          <Arrow from={[HC[0] - 44, HC[1] + 10]} to={[HC[0] - 44, HC[1] - 90 - 10 * pulse]} color={COL.forest} w={8} head={18} />
          <Arrow from={[HC[0] + 44, HC[1] + 10]} to={[HC[0] + 44, HC[1] - 90 - 10 * pulse]} color={COL.forest} w={8} head={18} />
          <path d={`M${HC[0] - 70} ${HC[1] + 150} Q${HC[0]} ${HC[1] + 120 - 14 * pulse} ${HC[0] + 70} ${HC[1] + 150}`} fill="none" stroke={COL.forest} strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function LegMarks({ t, pulse }: { t: number; pulse: number }) {
  const o = win(t, S(L, "s") + 0.6, E(L, "s"));
  if (o <= 0) return null;
  const a1 = at("s", "Am Gurt");
  const a2 = at("s", "Etwas dahinter");
  const a3 = at("s", "oder passen");
  const fwd = sm((t - a1) / 0.3) * (1 - sm((t - a2) / 0.3));
  const side = sm((t - a2) / 0.3) * (1 - sm((t - a3) / 0.3));
  const guard = sm((t - a3) / 0.3);
  const gurtL = w(LEG_IN);
  const gurtR = w(legOut(0));
  const backL = w([LEG_IN[0] - 9, LEG_IN[1]]);
  const backR = w(legOut(1.2));
  return (
    <g opacity={o}>
      {/* Gurtlinie */}
      <path d={`M${gurtL[0] - 70} ${gurtL[1]} H${gurtR[0] + 70}`} stroke={COL.brown} strokeWidth="5" strokeDasharray="10 10" opacity={0.6 * fwd} />
      <Glow p={gurtL} k={fwd} pulse={pulse} />
      <Glow p={gurtR} k={fwd} pulse={pulse} />
      {fwd > 0.05 && (
        <g opacity={fwd}>
          <Arrow from={[HC[0], HC[1] - 330]} to={[HC[0], HC[1] - 430 - 12 * pulse]} color={COL.honey} w={10} head={22} />
          <T x={gurtL[0] - 150} y={gurtL[1] + 12} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>am Gurt</T>
        </g>
      )}
      {/* seitwärts: innerer Schenkel hinter dem Gurt */}
      <Glow p={backL} k={side} pulse={pulse} />
      {side > 0.05 && (
        <g opacity={side}>
          <Arrow from={[backL[0] - 10, backL[1] + 60]} to={[backL[0] + 150 + 14 * pulse, backL[1] + 60]} color={COL.honey} w={10} head={22} />
          <T x={backL[0] - 150} y={backL[1] + 12} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>dahinter</T>
        </g>
      )}
      {/* verwahrend: äußerer Schenkel hinter dem Gurt als Wand */}
      <Glow p={backR} k={guard} col={COL.forest} pulse={pulse} />
      {guard > 0.05 && (
        <g opacity={guard}>
          <path d={`M${backR[0] + 60} ${backR[1] - 120} V${backR[1] + 150}`} stroke={COL.forest} strokeWidth="14" strokeLinecap="round" />
          <path d={`M${backR[0] + 60} ${backR[1] - 120} V${backR[1] + 150}`} stroke={PAPER} strokeWidth="4" strokeDasharray="14 14" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function reinState(t: number) {
  const o = win(t, S(L, "z") + 0.6, E(L, "z"));
  const a1 = at("z", "nehmen an");
  const a2 = at("z", "geben nach");
  const a3 = at("z", "halten durch");
  const a4 = at("z", "zeigen den Weg");
  const ann = sm((t - a1) / 0.35) * (1 - sm((t - a2) / 0.3));
  const nach = sm((t - a2) / 0.3) * (1 - sm((t - a3) / 0.3));
  const durch = sm((t - a3) / 0.3) * (1 - sm((t - a4) / 0.3));
  const weg = sm((t - a4) / 0.4);
  const pull = o * (1.1 * ann - 0.9 * nach + 0.45 * durch);
  const bend = -14 * weg * o;
  return { o, ann, nach, durch, weg, pull, bend };
}

function ReinMarks({ t, pulse }: { t: number; pulse: number }) {
  const r = reinState(t);
  if (r.o <= 0) return null;
  const hand = w([HAND_IN[0] - 4 * r.pull, HAND_IN[1]]);
  return (
    <g opacity={r.o}>
      {r.ann > 0.05 && <g opacity={r.ann}><Arrow from={[hand[0] - 70, hand[1] - 20]} to={[hand[0] - 70, hand[1] + 70]} color={COL.rust} w={9} head={20} /></g>}
      {r.nach > 0.05 && <g opacity={r.nach}><Arrow from={[hand[0] - 70, hand[1] + 40]} to={[hand[0] - 70, hand[1] - 60]} color={COL.forest} w={9} head={20} /></g>}
      {r.durch > 0.05 && (
        <g opacity={r.durch}>
          <rect x={hand[0] - 96} y={hand[1] - 26} width={52} height={52} rx="10" fill="none" stroke={COL.honey} strokeWidth="7" />
          <path d={`M${hand[0] - 86} ${hand[1]} H${hand[0] - 54}`} stroke={COL.honey} strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
      {r.weg > 0.05 && (
        <g opacity={r.weg}>
          <path d={`M${HC[0] - 20} ${HC[1] - 380} Q${HC[0] - 60} ${HC[1] - 470} ${HC[0] - 190 - 10 * pulse} ${HC[1] - 480}`} fill="none" stroke={COL.honey} strokeWidth="9" strokeLinecap="round" strokeDasharray="18 14" />
          <Arrow from={[HC[0] - 160, HC[1] - 482]} to={[HC[0] - 210 - 10 * pulse, HC[1] - 480]} color={COL.honey} w={9} head={20} />
        </g>
      )}
    </g>
  );
}

/* ---------- Stimme ---------- */
function Voice({ t }: { t: number }) {
  const o = win(t, S(L, "stimme") + 0.2, E(L, "stimme"));
  if (o <= 0) return null;
  const k = back((t - S(L, "stimme") - 0.2) / 0.45);
  const head = w([3, 0]);
  return (
    <g opacity={o}>
      <g transform={`translate(${head[0] + 210} ${head[1] - 120}) scale(${Math.max(0.01, k)})`}>
        <path d="M-120 40 l-40 50 l80 -40 Z" fill={PAPER} />
        <rect x={-170} y={-60} width={340} height={110} rx="55" fill={PAPER} stroke={COL.brown} strokeOpacity=".3" strokeWidth="3" />
        <T x={0} y={14} size={50} color={COL.forest}>„Fein so!“</T>
      </g>
      {[0, 1, 2].map((i) => {
        const ph = (t * 0.8 + i / 3) % 1;
        return <path key={i} transform={`translate(${230 + i * 70} ${1060 - ph * 200}) scale(3)`} opacity={1 - ph} d="M0 10c-9-6-13-11-13-16a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 10-13 16Z" fill={i % 2 ? COL.honey : COL.rust} />;
      })}
    </g>
  );
}

/* ---------- Texte oben ---------- */
function Title({ t, id, top, sub, color = COL.forestDeep }: { t: number; id: string; top: string; sub?: string; color?: string }) {
  const o = win(t, S(L, id), E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - S(L, id)) / 0.4);
  const k2 = ease((t - S(L, id) - 0.25) / 0.4);
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

const TRIO: Array<[string, string, string]> = [["Gewicht", "Gewicht", COL.honey], ["Schenkel", "Schenkel", COL.forest], ["Zügel", "Zügel", COL.rust]];

function Drei({ t }: { t: number }) {
  const o = win(t, S(L, "drei"), E(L, "drei"));
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <Title t={t} id="drei" top="3 Hilfen" sub="so sprichst du mit deinem Pferd" />
      {TRIO.map(([label, word, col], i) => {
        const k = back((t - at("drei", word)) / 0.4);
        if (k <= 0) return null;
        const x = 540 + (i - 1) * 310;
        return (
          <g key={label} transform={`translate(${x} 490) scale(${Math.max(0.01, k)})`}>
            <rect x={-140} y={-46} width={280} height={92} rx="46" fill={col} />
            <T x={0} y={14} size={42} font={FONT_BODY} weight={700} color={i === 0 ? COL.forestDeep : PAPER}>{label}</T>
          </g>
        );
      })}
    </g>
  );
}

/** Hook: dunkle Titelkarte wie „Die Reitbahn in 40 Sekunden“ */
function Hook({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook") + 0.1, 0.35);
  if (o <= 0) return null;
  const k = (d: number) => ease((t + 0.4 - d) / 0.45);
  return (
    <g opacity={o}>
      <rect width={W} height={H} fill={COL.forestDeep} />
      <rect x={250} y={420} width={580} height={1080} rx="20" fill={COL.forest} opacity=".55" />
      <rect x={290} y={460} width={500} height={1000} rx="12" fill="none" stroke={COL.sand} strokeWidth="4" strokeDasharray="14 14" opacity=".35" />
      <g opacity={k(0)} transform={`translate(0 ${(1 - k(0)) * 40})`}>
        <T x={540} y={820} size={112} color={PAPER}>Alle Hilfen</T>
      </g>
      <g opacity={k(0.15)} transform={`translate(0 ${(1 - k(0.15)) * 40})`}>
        <T x={540} y={950} size={112} color={COL.honey} italic>in 40 Sekunden</T>
      </g>
      <g opacity={ease((t - 0.7) / 0.4)}>
        <path d="M132 1028 h28 v44 l-14 -10 l-14 10 Z" fill={COL.rust} />
        <T x={560} y={1062} size={40} font={FONT_BODY} weight={700} color={COL.sand}>Speichern für die nächste Reitstunde</T>
      </g>
    </g>
  );
}

/* ---------- Spickzettel (Merke) ---------- */
const CARD: Array<[string, string, string[]]> = [
  ["1 · Gewicht", COL.honey, ["beidseitig belasten", "einseitig belasten", "entlasten"]],
  ["2 · Schenkel", COL.forest, ["vorwärtstreibend", "seitwärtstreibend", "verwahrend"]],
  ["3 · Zügel", COL.rust, ["annehmen · nachgeben", "durchhalten", "den Weg zeigen"]],
];
function Spick({ t }: { t: number }) {
  const a = S(L, "merke") - 0.2;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 50})`}>
      <rect width={W} height={H} fill={COL.bg} opacity={0.94} />
      <rect x={70} y={150} width={940} height={1230} rx="44" fill={COL.forestDeep} />
      <T x={540} y={240} size={38} font={FONT_BODY} weight={700} color={COL.honey}>SPICKZETTEL · REITERHILFEN</T>
      {CARD.map(([head, col, items], i) => {
        const y = 300 + i * 300;
        const ki = ease((t - a - 0.25 - i * 0.2) / 0.4);
        return (
          <g key={head} opacity={ki} transform={`translate(${(1 - ki) * -40} 0)`}>
            <rect x={120} y={y} width={840} height={270} rx="30" fill={COL.forest} />
            <rect x={120} y={y} width={18} height={270} rx="9" fill={col} />
            <T x={170} y={y + 72} size={56} color={PAPER} anchor="start">{head}</T>
            {items.map((it, j) => (
              <T key={it} x={190} y={y + 132 + j * 46} size={36} font={FONT_BODY} weight={700} color={COL.sand} anchor="start">{`• ${it}`}</T>
            ))}
          </g>
        );
      })}
      <g opacity={ease((t - at("merke", "Gewicht vor")) / 0.4)}>
        <rect x={120} y={1210} width={840} height={130} rx="65" fill={COL.honey} />
        <T x={540} y={1262} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>MERKE</T>
        <T x={540} y={1314} size={44} color={COL.forestDeep}>Gewicht › Schenkel › Zügel</T>
      </g>
    </g>
  );
}

function Tease({ t }: { t: number }) {
  const a = S(L, "tease") - 0.1;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, t - a - 2) * 5);
  return (
    <g opacity={k} transform={`translate(540 ${1540 + (1 - k) * 40}) scale(${pulse}) translate(-540 -1540)`}>
      <rect x={90} y={1420} width={900} height={250} rx="36" fill={COL.honey} />
      <T x={540} y={1497} size={48} color={COL.forestDeep}>Wie alles zusammenspielt?</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>lernt dein Kind in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Reiterhilfen · Link in der Bio</T>
    </g>
  );
}

export function renderHilfen(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const r = reinState(t);
  const all = win(t, S(L, "drei") + 1.0, E(L, "drei"));
  const gw = win(t, S(L, "g"), E(L, "g"));
  const sw = win(t, S(L, "s"), E(L, "s"));
  const zw = win(t, S(L, "z"), E(L, "z"));
  const glow = {
    seat: Math.max(all * sm((t - at("drei", "Gewicht")) / 0.3), gw * 0.5),
    innerLeg: Math.max(all * sm((t - at("drei", "Schenkel")) / 0.3), sw * 0.6),
    outerLeg: Math.max(all * sm((t - at("drei", "Schenkel")) / 0.3), sw * 0.6),
    innerRein: Math.max(all * sm((t - at("drei", "Zügel")) / 0.3), zw),
    outerRein: Math.max(all * sm((t - at("drei", "Zügel")) / 0.3), zw * 0.6),
    pull: r.ann,
  };
  const spans: Array<[number, number]> = ["g", "s", "z"].map((id) => [S(L, id), E(L, id)]);
  const hideHead = win(t, S(L, "merke") - 0.2, HILFEN_TOTAL + 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Ground t={t} />
      <TopHorse at={HC} ang={ANG} look={LOOKS.tonga} step={t * 1.2} s={SC} bend={r.bend} handPull={r.pull} glow={glow} />
      <WeightMarks t={t} pulse={pulse} />
      <LegMarks t={t} pulse={pulse} />
      <ReinMarks t={t} pulse={pulse} />
      <Voice t={t} />
      <List t={t} o={gw} col={COL.brownDeep} items={[
        { text: "beidseitig", sub: "beide Gesäßknochen", at: at("g", "beide") },
        { text: "einseitig", sub: "nur einer", at: at("g", "nur einen") },
        { text: "entlastend", sub: "Rücken frei", at: at("g", "entlastest") },
      ]} />
      <List t={t} o={sw} col={COL.forest} items={[
        { text: "vorwärtstreibend", sub: "am Gurt", at: at("s", "Am Gurt") },
        { text: "seitwärtstreibend", sub: "etwas dahinter", at: at("s", "Etwas dahinter") },
        { text: "verwahrend", sub: "passt auf", at: at("s", "oder passen") },
      ]} />
      <List t={t} o={zw} col={COL.rust} items={[
        { text: "annehmen", at: at("z", "nehmen an") },
        { text: "nachgeben", at: at("z", "geben nach") },
        { text: "durchhalten", at: at("z", "halten durch") },
        { text: "Weg zeigen", at: at("z", "zeigen den Weg") },
      ]} />
      <Header t={t} hide={hideHead} />
      <Drei t={t} />
      <PointHead t={t} start={S(L, "g")} end={E(L, "g")} n="1" title="Gewicht" sub="über deinen Sitz" />
      <PointHead t={t} start={S(L, "s")} end={E(L, "s")} n="2" title="Schenkel" sub="über deine Beine" />
      <PointHead t={t} start={S(L, "z")} end={E(L, "z")} n="3" title="Zügel" sub="über deine Hände" />
      <Title t={t} id="stimme" top="+ deine Stimme" sub="zum Loben und Beruhigen" color={COL.forest} />
      <Dots t={t} spans={spans} y={1545} />
      <Caption t={t} lines={L} skip={["hook", "merke", "tease"]} y={1610} />
      <Spick t={t} />
      <Tease t={t} />
      <Hook t={t} />
      {clamp01(0) > 1 && null}
    </svg>
  );
}
