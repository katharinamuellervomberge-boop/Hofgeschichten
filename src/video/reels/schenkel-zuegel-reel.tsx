import { Arrow, COL, Caption, E, FONT_BODY, Header, PAPER, S, T, W, H, ease, sm, win, type VLine } from "./rkit";
import { Callout, HAND_IN, HAND_OUT, LEG_IN, LOOKS, TopHorse, world, type Pt } from "./top";

/* Reel (9:16): „Innerer Schenkel, äußerer Zügel – was heißt das?“ – Pferd von oben auf dem Zirkel, linke Hand
   (innen = links im Bild). Innerer Schenkel am Gurt treibt das innere Hinterbein, Pferd biegt sich drumherum.
   Äußerer Zügel fängt auf, begrenzt die äußere Schulter, hält das Tempo. Bild: ein Band schräg durchs Pferd.
   Fehler: am inneren Zügel ziehen → Hals knickt ab, Pferd fällt über die äußere Schulter.
   Bleibt in der Akademie: wie sich das im Sattel anfühlt. Ergänzt Reel 17 (Stellung). */

/** Zeiten aus der Aufnahme (Jessica v4, 01.11.), Stimme beginnt bei 0,4 s im Reel */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["hook", "Innerer Schenkel, äußerer Zügel – was heißt das eigentlich?", 0, 4.41],
  ["was", "Auf gebogenen Linien gibt es innen und außen. Innen ist die Seite zur Mitte der Kurve.", 4.84, 10.37],
  ["schenkel", "Der innere Schenkel liegt am Gurt. Er treibt das innere Hinterbein nach vorn – und das Pferd biegt sich um ihn herum.", 10.71, 17.28],
  ["zuegel", "Der äußere Zügel fängt diese Energie auf. Er begrenzt die äußere Schulter und hält das Tempo.", 17.65, 23.26],
  ["band", "Stell es dir vor wie ein Band: schräg durchs Pferd, vom inneren Schenkel zum äußeren Zügel.", 23.59, 29.37],
  ["fehler", "Und der innere Zügel? Der stellt nur kurz – dann gibt er nach. Ziehst du innen, knickt nur der Hals ab, und das Pferd fällt über die äußere Schulter.", 29.73, 38.5],
  ["merke", "Merke: Innen treiben, außen begrenzen – die innere Hand bleibt leicht.", 38.89, 44.28],
  ["tease", "Wie sich das im Sattel anfühlt? Das lernt dein Kind in der Reitakademie.", 44.65, 48.67],
];
export const SZ_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
const L = SZ_LINES;
export const SZ_TOTAL = E(L, "tease") + 2.6;

/** Wortmarken aus der Aufnahme (Pausen gemessen, innerhalb der Teilsätze anteilig) */
const MARKS: Record<string, number> = {
  "hook|Innerer": 0.05, "hook|äußerer": 1.25, "hook|was heißt": 3.06,
  "was|innen und": 6.72, "was|außen.": 7.37,
  "schenkel|am Gurt": 12.18, "schenkel|treibt": 12.94, "schenkel|biegt sich": 15.94,
  "zuegel|fängt": 18.7, "zuegel|begrenzt": 20.68, "zuegel|hält": 22.4,
  "band|schräg": 25.59, "band|vom inneren": 26.91, "band|äußeren Zügel": 28.49,
  "fehler|stellt nur": 31.47, "fehler|dann gibt": 32.58, "fehler|Ziehst du": 33.93, "fehler|knickt": 34.83, "fehler|fällt über": 37.17,
  "merke|Innen treiben": 39.89,
};
function at(id: string, word: string) {
  if (MARKS[`${id}|${word}`] !== undefined) return MARKS[`${id}|${word}`] + VO;
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

const IN_COL = COL.honey; // innerer Schenkel
const OUT_COL = COL.forest; // äußerer Zügel
const BAD = COL.rust;

/* ---------- Pferd ---------- */
const HC: Pt = [540, 1060];
const SC = 7;
// Zirkel: Mittelpunkt links außerhalb des Bildes
const ZC: Pt = [-760, 1060];
const ZR = HC[0] - ZC[0];

function horseState(t: number) {
  // Biegung um den inneren Schenkel
  const bendUp = sm((t - at("schenkel", "biegt sich")) / 0.8);
  // Fehler: innen ziehen
  const pullA = at("fehler", "Ziehst du");
  const badIn = sm((t - pullA) / 0.6) * (1 - sm((t - S(L, "merke") + 0.3) / 0.5));
  const slip = sm((t - at("fehler", "fällt über") + 0.2) / 0.9) * (1 - sm((t - S(L, "merke") + 0.3) / 0.5));
  // kurz stellen, dann nachgeben
  const stell = sm((t - at("fehler", "stellt nur")) / 0.3) * (1 - sm((t - at("fehler", "dann gibt")) / 0.4));
  const bend = -6 - 8 * bendUp - 30 * badIn;
  const poll = -10 * stell - 6 * badIn;
  const drift = 120 * slip * (0.85 + 0.15 * Math.sin(t * 1.3));
  const yaw = 16 * slip;
  const handPull = 0.5 * stell + 1.1 * badIn;
  return { bend, poll, drift, yaw, handPull, stell, badIn, slip };
}

const w = (p: Pt, st: ReturnType<typeof horseState>) => world([HC[0] + st.drift, HC[1]], -90 + st.yaw, SC, p);

/* ---------- Boden mit Zirkellinie ---------- */
function Ground({ t }: { t: number }) {
  return (
    <g>
      <defs>
        <clipPath id="sz-sand"><rect x={0} y={600} width={W} height={894} /></clipPath>
        <linearGradient id="sz-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={0} y={600} width={W} height={900} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 50 }, (_, i) => {
          const x = (i * 211) % W;
          const y = 620 + ((i * 137) % 860);
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>
      <circle clipPath="url(#sz-sand)" cx={ZC[0]} cy={ZC[1]} r={ZR} fill="none" stroke={COL.honey} strokeWidth="7" strokeDasharray="22 18" strokeDashoffset={t * 150} opacity=".7" />
      <rect x={0} y={598} width={W} height={150} fill="url(#sz-fade)" />
      <rect x={0} y={1494} width={W} height={10} fill={COL.brown} opacity=".4" />
    </g>
  );
}

/* ---------- Liste neben dem Pferd ---------- */
type Item = { text: string; at: number };
function List({ t, items, o, col, x }: { t: number; items: Item[]; o: number; col: string; x: number }) {
  if (o <= 0) return null;
  const cur = items.reduce((c, it, i) => (t >= it.at ? i : c), -1);
  const h = 76;
  const y0 = 820;
  return (
    <g opacity={o}>
      {items.map((it, i) => {
        const k = ease((t - it.at) / 0.35);
        if (k <= 0) return null;
        const on = i === cur;
        const y = y0 + i * (h + 18);
        return (
          <g key={i} opacity={k * (on ? 1 : 0.8)} transform={`translate(${x + (1 - k) * (x < 540 ? -60 : 60)} ${y}) scale(${on ? 1 : 0.94})`}>
            <rect x={-180} y={-h / 2} width={360} height={h} rx={h / 2} fill={on ? col : PAPER} stroke={col} strokeWidth="4" />
            <T x={0} y={11} size={30} font={FONT_BODY} weight={700} color={on ? (col === IN_COL ? COL.forestDeep : PAPER) : col === IN_COL ? COL.brownDeep : col}>{it.text}</T>
          </g>
        );
      })}
    </g>
  );
}

function Title({ t, id, top, sub, color = COL.forestDeep, start, end }: { t: number; id: string; top: string; sub?: string; color?: string; start?: number; end?: number }) {
  const a = start ?? S(L, id);
  const o = win(t, a, end ?? E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - a) / 0.4);
  const k2 = ease((t - a - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={290} size={Math.min(84, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={366} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

/** Hook direkt auf der Grafik (ohne dunkle Titelkarte): Frage oben, Schenkel + Zügel leuchten am Pferd */
function Hook({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook") + 0.1, 0.35);
  if (o <= 0) return null;
  const k = (a: number) => ease((t - a) / 0.4);
  const a1 = at("hook", "Innerer") - 0.9; // erste Zeile schon im ersten Bild (Vorschaubild)
  const a2 = at("hook", "äußerer");
  const a3 = at("hook", "was heißt");
  return (
    <g opacity={o}>
      <g opacity={k(a1)} transform={`translate(0 ${(1 - k(a1)) * 30})`}>
        <T x={540} y={250} size={92} color={COL.brownDeep}>innerer Schenkel</T>
        <rect x={250} y={268} width={580 * k(a1)} height={10} rx="5" fill={IN_COL} />
      </g>
      <g opacity={k(a2)} transform={`translate(0 ${(1 - k(a2)) * 30})`}>
        <T x={540} y={372} size={92} color={OUT_COL}>äußerer Zügel</T>
      </g>
      <g opacity={k(a3)} transform={`translate(0 ${(1 - k(a3)) * 30})`}>
        <T x={540} y={456} size={56} color={COL.rust} italic>was heißt das?</T>
      </g>
    </g>
  );
}

/* ---------- Spickzettel ---------- */
const CARD: Array<[string, string, string[]]> = [
  ["Innerer Schenkel", COL.honey, ["liegt am Gurt", "treibt das innere Hinterbein", "Pferd biegt sich drumherum"]],
  ["Äußerer Zügel", COL.sage, ["fängt die Energie auf", "begrenzt die äußere Schulter", "hält das Tempo"]],
  ["Innerer Zügel", "#E0A285", ["stellt nur kurz", "gibt dann nach", "nie innen ziehen"]],
];
function Spick({ t }: { t: number }) {
  const a = S(L, "merke") - 0.2;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 50})`}>
      <rect width={W} height={H} fill={COL.bg} opacity={0.94} />
      <rect x={70} y={150} width={940} height={1230} rx="44" fill={COL.forestDeep} />
      <T x={540} y={240} size={38} font={FONT_BODY} weight={700} color={COL.honey}>SPICKZETTEL · SCHENKEL & ZÜGEL</T>
      {CARD.map(([head, col, items], i) => {
        const y = 300 + i * 300;
        const ki = ease((t - a - 0.25 - i * 0.2) / 0.4);
        return (
          <g key={head} opacity={ki} transform={`translate(${(1 - ki) * -40} 0)`}>
            <rect x={120} y={y} width={840} height={270} rx="30" fill={COL.forest} />
            <rect x={120} y={y} width={18} height={270} rx="9" fill={col} />
            <T x={170} y={y + 72} size={56} color={PAPER} anchor="start">{head}</T>
            {items.map((it, j) => (
              <T key={it} x={190} y={y + 132 + j * 46} size={34} font={FONT_BODY} weight={700} color={j === 2 && i === 2 ? "#E0A285" : COL.sand} anchor="start">{`• ${it}`}</T>
            ))}
          </g>
        );
      })}
      <g opacity={ease((t - at("merke", "Innen treiben")) / 0.4)}>
        <rect x={120} y={1210} width={840} height={130} rx="65" fill={COL.honey} />
        <T x={540} y={1262} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>MERKE</T>
        <T x={540} y={1314} size={40} color={COL.forestDeep}>Innen treiben › außen begrenzen</T>
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
      <T x={540} y={1497} size={48} color={COL.forestDeep}>Wie fühlt sich das im Sattel an?</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>Lernt dein Kind in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Reiterhilfen · Link in der Bio</T>
    </g>
  );
}

export function renderSchenkelZuegel(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const st = horseState(t);
  const at0: Pt = [HC[0] + st.drift, HC[1]];
  const ang = -90 + st.yaw;
  const P = (p: Pt) => w(p, st);

  const wasO = win(t, S(L, "was"), E(L, "was"));
  const sO = win(t, S(L, "schenkel"), E(L, "schenkel"));
  const zO = win(t, S(L, "zuegel"), E(L, "zuegel"));
  const bandO = win(t, S(L, "band"), E(L, "band"));
  const fO = win(t, S(L, "fehler"), E(L, "fehler"));
  const hookOn = win(t, 0, E(L, "hook"));
  const legGlow = Math.max(sO, bandO, hookOn * ease((t - at("hook", "Innerer")) / 0.4));
  const reinGlow = Math.max(zO, bandO, hookOn * ease((t - at("hook", "äußerer")) / 0.4));
  const inRein = st.stell + st.badIn;

  const leg = P(LEG_IN);
  const hand = P(HAND_OUT);
  const handIn = P([HAND_IN[0] - 4 * st.handPull, HAND_IN[1]]);
  const hindIn = P([-24, -9]);
  const shoulderOut = P([18, 13]);

  // Band: vom inneren Schenkel zum äußeren Zügel
  const bandU = ease((t - at("band", "schräg")) / 0.9);
  const bandA = P([-24, -13]);
  const bandB = P([30, 13]);
  const bandEnd: Pt = [bandA[0] + (bandB[0] - bandA[0]) * bandU, bandA[1] + (bandB[1] - bandA[1]) * bandU];

  const hookO = win(t, 0, E(L, "hook"));
  const hideHead = Math.max(hookO, win(t, S(L, "merke") - 0.2, SZ_TOTAL + 1));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Ground t={t} />
      {/* innen / außen */}
      {wasO > 0 && (
        <g opacity={wasO}>
          <g opacity={ease((t - at("was", "innen und")) / 0.4)}>
            <T x={170} y={1250} size={56} color={IN_COL}>innen</T>
            <Arrow from={[250, 1300]} to={[60, 1300]} color={IN_COL} w={8} head={20} />
            <T x={170} y={1360} size={28} font={FONT_BODY} weight={700} color={COL.brownDeep}>zur Mitte der Kurve</T>
          </g>
          <g opacity={ease((t - at("was", "außen.")) / 0.4)}>
            <T x={900} y={1250} size={56} color={OUT_COL}>außen</T>
          </g>
        </g>
      )}
      <TopHorse at={at0} ang={ang} look={LOOKS.tonga} step={t * 1.3} s={SC} bend={st.bend} poll={st.poll} handPull={st.handPull}
        glow={{ innerLeg: legGlow, outerRein: reinGlow, innerRein: inRein, pull: st.badIn }} />

      {/* innerer Schenkel: treibt das innere Hinterbein vor, Biegung drumherum */}
      {sO > 0 && (
        <g opacity={sO}>
          <g opacity={ease((t - at("schenkel", "treibt")) / 0.4)}>
            <Arrow from={[hindIn[0] - 70, hindIn[1] + 40]} to={[hindIn[0] - 70, hindIn[1] - 90 - 14 * pulse]} color={IN_COL} w={10} head={22} />
          </g>
          <g opacity={ease((t - at("schenkel", "biegt sich")) / 0.4)}>
            <path d={`M${leg[0] - 20} ${leg[1] - 240} A 260 260 0 0 0 ${leg[0] - 20} ${leg[1] + 240}`} fill="none" stroke={IN_COL} strokeWidth="6" strokeDasharray="14 12" transform={`translate(${-6 * pulse} 0)`} opacity=".85" />
          </g>
        </g>
      )}
      <List t={t} o={sO} col={IN_COL} x={210} items={[
        { text: "am Gurt", at: at("schenkel", "am Gurt") },
        { text: "treibt nach vorn", at: at("schenkel", "treibt") },
        { text: "Biegung drumherum", at: at("schenkel", "biegt sich") },
      ]} />

      {/* äußerer Zügel: fängt auf, begrenzt Schulter */}
      {zO > 0 && (
        <g opacity={zO}>
          <g opacity={ease((t - at("zuegel", "begrenzt")) / 0.4)}>
            <path d={`M${shoulderOut[0] + 40} ${shoulderOut[1] - 150} V${shoulderOut[1] + 260}`} stroke={OUT_COL} strokeWidth="14" strokeLinecap="round" />
            <path d={`M${shoulderOut[0] + 40} ${shoulderOut[1] - 150} V${shoulderOut[1] + 260}`} stroke={PAPER} strokeWidth="4" strokeDasharray="14 14" strokeLinecap="round" />
          </g>
        </g>
      )}
      <List t={t} o={zO} col={OUT_COL} x={870} items={[
        { text: "fängt auf", at: at("zuegel", "fängt") },
        { text: "begrenzt die Schulter", at: at("zuegel", "begrenzt") },
        { text: "hält das Tempo", at: at("zuegel", "hält") },
      ]} />

      {hookOn > 0 && (
        <g opacity={hookOn}>
          <Callout k={ease((t - at("hook", "Innerer") - 0.3) / 0.4)} from={leg} to={[leg[0] - 240, leg[1] + 170]} text="innerer Schenkel" color={COL.brownDeep} size={30} />
          <Callout k={ease((t - at("hook", "äußerer") - 0.2) / 0.4)} from={hand} to={[hand[0] + 230, hand[1] - 120]} text="äußerer Zügel" color={OUT_COL} size={30} />
        </g>
      )}
      {/* Band */}
      {bandO > 0 && bandU > 0.01 && (
        <g opacity={bandO}>
          <path d={`M${bandA[0]} ${bandA[1]} L${bandEnd[0]} ${bandEnd[1]}`} stroke={IN_COL} strokeWidth={44} strokeLinecap="round" opacity=".35" />
          <path d={`M${bandA[0]} ${bandA[1]} L${bandEnd[0]} ${bandEnd[1]}`} stroke={IN_COL} strokeWidth={12} strokeLinecap="round" strokeDasharray="18 16" strokeDashoffset={-t * 80} />
          {bandU > 0.9 && <Arrow from={[bandB[0] - (bandB[0] - bandA[0]) * 0.15, bandB[1] - (bandB[1] - bandA[1]) * 0.15]} to={[bandB[0] + 20, bandB[1] - 20]} color={IN_COL} w={12} head={30} />}
          <circle cx={leg[0]} cy={leg[1]} r={26 + 5 * pulse} fill="none" stroke={IN_COL} strokeWidth="6" />
          {bandU > 0.95 && <circle cx={hand[0]} cy={hand[1]} r={26 + 5 * pulse} fill="none" stroke={OUT_COL} strokeWidth="6" />}
          <Callout k={ease((t - at("band", "vom inneren")) / 0.4)} from={leg} to={[leg[0] - 240, leg[1] + 170]} text="innerer Schenkel" color={COL.brownDeep} size={30} />
          <Callout k={ease((t - at("band", "äußeren Zügel")) / 0.4)} from={hand} to={[hand[0] + 230, hand[1] - 120]} text="äußerer Zügel" color={OUT_COL} size={30} />
        </g>
      )}

      {/* Fehler: innen ziehen */}
      {fO > 0 && (
        <g opacity={fO}>
          <Callout k={win(t, at("fehler", "stellt nur"), at("fehler", "Ziehst du") - 0.1)} from={handIn} to={[handIn[0] - 250, handIn[1] - 60]} text={t < at("fehler", "dann gibt") ? "kurz stellen" : "… und nachgeben"} color={COL.brownDeep} size={30} />
          <Callout k={ease((t - at("fehler", "knickt")) / 0.4) * st.badIn} from={P([30, -6])} to={[P([30, -6])[0] - 260, P([30, -6])[1] - 40]} text="Hals knickt ab" color={BAD} size={32} />
          <g opacity={st.slip}>
            <Arrow from={[shoulderOut[0] + 40, shoulderOut[1] + 40]} to={[shoulderOut[0] + 190 + 10 * pulse, shoulderOut[1] + 40]} color={BAD} w={12} head={26} />
            <Callout k={st.slip} from={shoulderOut} to={[shoulderOut[0] + 120, shoulderOut[1] + 260]} text="fällt über die Schulter" color={BAD} size={30} />
          </g>
        </g>
      )}

      <Header t={t} hide={hideHead} />
      <Title t={t} id="was" top="Innen und außen" sub="auf jeder gebogenen Linie" />
      <Title t={t} id="schenkel" top="Innerer Schenkel" sub="der Motor für die Biegung" color={COL.brownDeep} />
      <Title t={t} id="zuegel" top="Äußerer Zügel" sub="fängt auf und begrenzt" color={OUT_COL} />
      <Title t={t} id="band" top="Wie ein Band" sub="schräg durchs Pferd" />
      <Title t={t} id="fehler" top="Und der innere Zügel?" sub="stellt kurz – dann gibt er nach" end={at("fehler", "Ziehst du") - 0.1} />
      <Title t={t} id="fehler" start={at("fehler", "Ziehst du")} top="Innen ziehen? ✗" sub="Hals knickt, Schulter fällt raus" color={BAD} />
      <Caption t={t} lines={L} skip={["hook", "merke", "tease"]} y={1560} />
      <Spick t={t} />
      <Tease t={t} />
      <Hook t={t} />
    </svg>
  );
}
