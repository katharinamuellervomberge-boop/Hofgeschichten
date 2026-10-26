import { AnimHorse, GAIT_DEFS, legPhase, legsOnGround, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { BigWord, COL, Card, FONT_BODY, FONT_DISPLAY, Frame, ScrollingArena, fade, type Line, type Timeline, type VideoDef } from "./kit";

/* Gangarten-Videos: Schritt (Viertakt), Trab (Zweitakt), Galopp (Dreitakt) */

type MovingGait = Exclude<Gait, "stand">;

const K = 1.5;
const X0 = 80;
const GROUND_Y = 545;
const Y0 = GROUND_Y - 285 * K;

const LEG_NAME: Record<LegId, string> = { VL: "vorne links", VR: "vorne rechts", HL: "hinten links", HR: "hinten rechts" };

/** Takte je Gangart: Beine, die zusammen auffußen */
export const BEATS: Record<MovingGait, LegId[][]> = {
  schritt: [["HL"], ["VL"], ["HR"], ["VR"]],
  trab: [["HL", "VR"], ["HR", "VL"]],
  "galopp-rechts": [["HL"], ["HR", "VL"], ["VR"]],
  "galopp-links": [["HR"], ["HL", "VR"], ["VL"]],
};

const BEAT_COLORS = [COL.honey, COL.pairB, COL.rust, COL.brown];

function beatOf(gait: MovingGait, leg: LegId) {
  return BEATS[gait].findIndex((b) => b.includes(leg));
}

/** Puls (0–1) kurz nach dem Auffußen eines Beins */
function landPulse(gait: MovingGait, leg: LegId, time: number) {
  const { p } = legPhase(gait, leg, time);
  return Math.exp(-p * GAIT_DEFS[gait].cycle * 4.5);
}

/** Hufschlag-Plan von oben (Kopf rechts, linke Seite oben) – synchron zum Pferd */
function HoofMap({ gait, time, x, y, numbers = true }: { gait: MovingGait; time: number; x: number; y: number; numbers?: boolean }) {
  const ground = legsOnGround(gait, time);
  const float = ground.length === 0;
  const lead = gait === "galopp-rechts" ? "R" : gait === "galopp-links" ? "L" : null;
  const pos = (leg: LegId): [number, number] => {
    const fwd = lead && leg[1] === lead ? 26 : 0;
    return [x + (leg[0] === "V" ? 300 : 120) + fwd, y + (leg[1] === "L" ? 70 : 190)];
  };
  return (
    <g>
      <rect x={x} y={y} width={460} height={260} rx="26" fill={COL.paper} />
      {/* Pferd von oben, schematisch */}
      <ellipse cx={x + 210} cy={y + 130} rx="150" ry="58" fill={COL.sandLight} />
      <path d={`M${x + 350} ${y + 130} q50 -18 74 0 q-24 18 -74 0Z`} fill={COL.sandLight} />
      {!float && (
        <text x={x + 230} y={y + 136} textAnchor="middle" fontFamily={FONT_BODY} fontSize="16" fill={COL.inkSoft}>
          von oben · Kopf →
        </text>
      )}
      {(["VL", "VR", "HL", "HR"] as LegId[]).map((leg) => {
        const [cx, cy] = pos(leg);
        const on = ground.includes(leg);
        const b = beatOf(gait, leg);
        const c = BEAT_COLORS[b];
        const pulse = landPulse(gait, leg, time);
        return (
          <g key={leg}>
            <circle cx={cx} cy={cy} r={30 + 6 * pulse} fill={on ? c : COL.paper} stroke={c} strokeWidth="4" />
            <path d={`M${cx - 12} ${cy + 10}v-9a12 13 0 0 1 24 0v9h-7v-9a5 5 0 0 0-10 0v9Z`} fill={on ? COL.paper : COL.brownDeep} />
            {numbers && (
              <g>
                <circle cx={cx + 28} cy={cy - 26} r="15" fill={COL.forest} />
                <text x={cx + 28} y={cy - 19} textAnchor="middle" fontFamily={FONT_BODY} fontSize="20" fontWeight="700" fill={COL.paper}>
                  {b + 1}
                </text>
              </g>
            )}
            <text x={cx} y={cy + (leg[1] === "L" ? -40 : 56)} textAnchor="middle" fontFamily={FONT_BODY} fontSize="17" fill={COL.inkSoft}>
              {LEG_NAME[leg]}
            </text>
          </g>
        );
      })}
      {float && (
        <g>
          <rect x={x + 150} y={y + 112} width={120} height={36} rx="18" fill={COL.forest} />
          <text x={x + 210} y={y + 137} textAnchor="middle" fontFamily={FONT_BODY} fontSize="20" fontWeight="700" fill={COL.paper}>
            Schwebe!
          </text>
        </g>
      )}
    </g>
  );
}

/** Taktleiste: welcher Takt ist gerade dran? */
function BeatBar({ gait, time, x, y, words }: { gait: MovingGait; time: number; x: number; y: number; words: string[] }) {
  const beats = BEATS[gait];
  const w = 460 / beats.length;
  return (
    <g>
      {beats.map((legs, i) => {
        const pulse = landPulse(gait, legs[0], time);
        return (
          <g key={i}>
            <BigWord x={x + w * i + w / 2} y={y} text={words[i] ?? String(i + 1)} on={pulse} color={BEAT_COLORS[i]} size={beats.length > 2 ? 58 : 72} />
          </g>
        );
      })}
    </g>
  );
}

export type GaitVideoConfig = {
  slug: string;
  title: string;
  world: string;
  lesson: string;
  chip: string;
  gait: MovingGait;
  horse: string;
  /** Kicker und Titel der Titelkarte */
  kicker: string;
  heading: string;
  sub: string;
  kid: "lea" | "mila" | "ben";
  lines: Line[];
  /** Taktwörter (z. B. „ta“, „tam“) */
  beatWords: string[];
  /** Ab welchem Satz die Taktleiste erscheint */
  beatsFrom: string;
  /** Satz, in dem die Beine nacheinander namentlich hervorgehoben werden */
  namesAt?: string;
  /** Satz, in dem der Bodenkontakt gezählt wird */
  groundAt?: string;
  /** Satz mit Zeitlupe (halbe Geschwindigkeit) */
  slowAt?: string;
  merksatz: string[];
  /** Zweite Gangart zum Vergleich (z. B. Linksgalopp) ab diesem Satz */
  compare?: { at: string; gait: MovingGait; label: string };
};

/** Pferde-Uhr: läuft während `slowAt` mit halber Geschwindigkeit */
function horseClock(t: number, tl: Timeline, slowAt?: string) {
  if (!slowAt) return t;
  const a = tl.start(slowAt) - 0.3;
  const b = tl.end(slowAt) + 0.3;
  if (t <= a) return t;
  if (t <= b) return a + (t - a) * 0.5;
  return a + (b - a) * 0.5 + (t - b);
}

export function makeGaitVideo(c: GaitVideoConfig): VideoDef {
  const look = getHorse(c.horse)!.look;
  return {
    slug: c.slug,
    title: c.title,
    world: c.world,
    lesson: c.lesson,
    lines: c.lines,
    render: (t, tl) => {
      const cmp = c.compare && t >= tl.start(c.compare.at) - 0.2 ? c.compare : null;
      const gait = cmp ? cmp.gait : c.gait;
      const h = horseClock(t, tl, c.slowAt);
      const def = GAIT_DEFS[gait];
      const slow = c.slowAt ? fade(t, tl.start(c.slowAt), tl.end(c.slowAt), 0.3) : 0;
      const speed = (def.stride / (def.duty * def.cycle)) * K;
      const beats = fade(t, tl.start(c.beatsFrom), tl.start("merke") - 0.4);
      const names = c.namesAt ? fade(t, tl.start(c.namesAt), tl.end(c.namesAt)) : 0;
      const groundCount = c.groundAt ? fade(t, tl.start(c.groundAt), tl.end(c.groundAt)) : 0;
      const highlight: Partial<Record<LegId, string>> = {};
      if (beats > 0.3) for (const leg of ["VL", "VR", "HL", "HR"] as LegId[]) if (legPhase(gait, leg, h).stance) highlight[leg] = BEAT_COLORS[beatOf(gait, leg)];
      const onGround = legsOnGround(gait, h);
      const merke = fade(t, tl.start("merke"), tl.total + 1, 0.5);
      const title = fade(t, 0, tl.end("titel"), 0.5);
      return (
        <Frame t={t} tl={tl} chip={c.chip}>
          <ScrollingArena t={h} speed={speed} y={400} />
          <svg x={X0} y={Y0} width={320 * K} height={292 * K} viewBox="70 20 320 292" overflow="visible">
            <AnimHorse look={look} gait={gait} time={h} highlight={highlight}>
              <Tack hand={null} longRein={false} stirrupsDown />
            </AnimHorse>
          </svg>
          {slow > 0 && (
            <g opacity={slow}>
              <rect x={X0 + 10} y={100} width={150} height={40} rx="20" fill={COL.rust} />
              <text x={X0 + 85} y={127} textAnchor="middle" fontFamily={FONT_BODY} fontSize="20" fontWeight="700" fill={COL.paper}>
                Zeitlupe
              </text>
            </g>
          )}
          {cmp && (
            <g>
              <rect x={X0 + 170} y={100} width={cmp.label.length * 12 + 40} height={40} rx="20" fill={COL.forest} />
              <text x={X0 + 190} y={127} fontFamily={FONT_BODY} fontSize="20" fontWeight="700" fill={COL.paper}>
                {cmp.label}
              </text>
            </g>
          )}
          {beats > 0 && merke < 0.5 && (
            <g opacity={beats}>
              <HoofMap gait={gait} time={h} x={770} y={90} />
              <rect x={770} y={366} width={460} height={names > 0 ? 40 + BEATS[gait].length * 34 : 110} rx="22" fill={COL.paper} />
              {names <= 0 && <BeatBar gait={gait} time={h} x={770} y={444} words={c.beatWords} />}
            </g>
          )}
          {names > 0 && (
            <g opacity={names}>
              {BEATS[gait].map((legs, i) => (
                <text key={i} x={796} y={404 + i * 34} fontFamily={FONT_BODY} fontSize="23" fontWeight="700" fill={BEAT_COLORS[i]} opacity={0.4 + 0.6 * landPulse(gait, legs[0], h)}>
                  {i + 1}. {legs.map((l) => LEG_NAME[l]).join(" + ")}
                </text>
              ))}
            </g>
          )}
          {groundCount > 0 && (
            <g opacity={groundCount}>
              <rect x={X0 + 10} y={150} width={300} height={56} rx="28" fill={COL.forest} />
              <text x={X0 + 160} y={187} textAnchor="middle" fontFamily={FONT_BODY} fontSize="26" fontWeight="700" fill={COL.paper}>
                Hufe am Boden: {onGround.length}
              </text>
            </g>
          )}
          {merke > 0 && (
            <g opacity={merke}>
              <Card x={740} y={110} w={490} h={350} fill={COL.forest}>
                <text x={772} y={166} fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.honey}>
                  MERKSATZ
                </text>
                {c.merksatz.map((l, i) => (
                  <text key={l} x={772} y={226 + i * 52} fontFamily={FONT_DISPLAY} fontSize="38" fontWeight="700" fill={COL.paper}>
                    {l}
                  </text>
                ))}
              </Card>
            </g>
          )}
          {title > 0 && (
            <g opacity={title}>
              <rect width="1280" height="720" fill={COL.bg} opacity="0.86" />
              <Card x={250} y={170} w={780} h={300}>
                <image href={`/kids/${c.kid}-320.webp`} x={290} y={215} width={210} height={210} />
                <text x={540} y={270} fontFamily={FONT_BODY} fontSize="24" fontWeight="700" fill={COL.rust}>
                  {c.kicker}
                </text>
                <text x={540} y={340} fontFamily={FONT_DISPLAY} fontSize="58" fontWeight="800" fill={COL.forestDeep}>
                  {c.heading}
                </text>
                <text x={540} y={392} fontFamily={FONT_DISPLAY} fontSize="38" fontWeight="600" fill={COL.forest}>
                  {c.sub}
                </text>
              </Card>
            </g>
          )}
        </Frame>
      );
    },
  };
}

export const schritt = makeGaitVideo({
  slug: "schritt-viertakt",
  title: "Der Schritt im Viertakt",
  world: "schritt-reiten",
  lesson: "der-viertakt",
  chip: "Große Reitakademie · Schritt",
  gait: "schritt",
  horse: "scrabble",
  kicker: "GROSSE REITAKADEMIE · SCHRITT REITEN",
  heading: "Der Schritt",
  sub: "– im Viertakt",
  kid: "ben",
  beatWords: ["1", "2", "3", "4"],
  beatsFrom: "einzeln",
  namesAt: "reihenfolge",
  groundAt: "boden",
  merksatz: ["Schritt ist Viertakt:", "eins, zwei, drei, vier.", "Immer sind Hufe", "am Boden."],
  lines: [
    { id: "titel", text: "Der Schritt – im Viertakt.", pause: 0.8 },
    { id: "einzeln", text: "Im Schritt setzt das Pferd jeden Huf einzeln auf. Zähl mit: eins, zwei, drei, vier." },
    { id: "reihenfolge", text: "Erst hinten links, dann vorne links. Dann hinten rechts und dann vorne rechts.", pause: 1 },
    { id: "boden", text: "Immer sind zwei oder drei Hufe am Boden. Darum gibt es im Schritt keine Schwebephase." },
    { id: "ruhig", text: "Deshalb ist der Schritt so ruhig und gemütlich. Er ist die langsamste Gangart.", pause: 1.2 },
    { id: "merke", text: "Merke: Schritt ist Viertakt – eins, zwei, drei, vier.", pause: 1.5 },
  ],
});

export const trab = makeGaitVideo({
  slug: "trab-zweitakt",
  title: "Der Trab im Zweitakt",
  world: "trab-reiten",
  lesson: "der-zweitakt",
  chip: "Große Reitakademie · Trab",
  gait: "trab",
  horse: "tonga",
  kicker: "GROSSE REITAKADEMIE · TRAB REITEN",
  heading: "Der Trab",
  sub: "– im Zweitakt",
  kid: "lea",
  beatWords: ["ta", "tam"],
  beatsFrom: "paare",
  namesAt: "diagonal",
  groundAt: "schwebe",
  slowAt: "schwebe",
  merksatz: ["Trab ist Zweitakt:", "diagonale Beinpaare", "und eine kleine", "Schwebephase."],
  lines: [
    { id: "titel", text: "Der Trab – im Zweitakt.", pause: 0.8 },
    { id: "paare", text: "Im Trab bewegen sich immer zwei Beine gleichzeitig: ein Vorderbein und das Hinterbein über Kreuz." },
    { id: "diagonal", text: "Hinten links geht mit vorne rechts, hinten rechts mit vorne links. Das nennt man diagonale Beinpaare.", pause: 1 },
    { id: "takt", text: "Hör auf den Takt: ta-tam, ta-tam. Das sind die zwei Takte.", pause: 1 },
    { id: "schwebe", text: "Zwischen den Takten schwebt das Pferd ganz kurz. Dann berührt kein Huf den Boden.", pause: 0.8 },
    { id: "spueren", text: "Darum spürst du im Trab ein Auf und Ab im Sattel.", pause: 1 },
    { id: "merke", text: "Merke: Trab ist Zweitakt mit diagonalen Beinpaaren und einer kleinen Schwebephase.", pause: 1.5 },
  ],
});

export const galopp = makeGaitVideo({
  slug: "galopp-dreitakt",
  title: "Der Galopp im Dreitakt",
  world: "galopp-verstehen",
  lesson: "der-dreitakt",
  chip: "Große Reitakademie · Galopp",
  gait: "galopp-rechts",
  horse: "tivoli",
  kicker: "GROSSE REITAKADEMIE · GALOPP VERSTEHEN",
  heading: "Der Galopp",
  sub: "– im Dreitakt",
  kid: "mila",
  beatWords: ["ba", "da", "bumm"],
  beatsFrom: "takte",
  namesAt: "reihenfolge",
  groundAt: "schwebe",
  slowAt: "schwebe",
  compare: { at: "links", gait: "galopp-links", label: "Linksgalopp" },
  merksatz: ["Galopp ist Dreitakt", "mit Schwebephase.", "Rechtsgalopp: rechts", "greift weiter vor."],
  lines: [
    { id: "titel", text: "Der Galopp – im Dreitakt.", pause: 0.8 },
    { id: "takte", text: "Im Galopp hörst du drei Takte und dann eine kleine Pause: ba-da-bumm, ba-da-bumm." },
    { id: "reihenfolge", text: "Im Rechtsgalopp fußt zuerst das linke Hinterbein auf. Dann das rechte Hinterbein und das linke Vorderbein zusammen. Zuletzt das rechte Vorderbein.", pause: 1 },
    { id: "schwebe", text: "Danach fliegt das Pferd kurz durch die Luft. Das ist die Schwebephase.", pause: 0.8 },
    { id: "vorgreifen", text: "Im Rechtsgalopp greifen die rechten Beine weiter nach vorne." },
    { id: "links", text: "Im Linksgalopp ist es genau andersherum: Jetzt greifen die linken Beine weiter vor.", pause: 1 },
    { id: "hand", text: "In der Reitbahn galoppierst du auf der rechten Hand im Rechtsgalopp und auf der linken Hand im Linksgalopp.", pause: 1 },
    { id: "merke", text: "Merke: Galopp ist Dreitakt mit Schwebephase. Im Rechtsgalopp greifen die rechten Beine weiter vor.", pause: 1.5 },
  ],
});
