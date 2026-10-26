import { AnimHorse, GAIT_DEFS, legPhase } from "@/components/illustrations/akademie/AnimHorse";
import { BODIES, SITZ, type Body, type P } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { BigWord, COL, Card, FONT_BODY, FONT_DISPLAY, Frame, ScrollingArena, clamp01, fade, smooth, type Timeline, type VideoDef } from "./kit";

/* Lernvideo „Leichttraben verstehen“ – Welt 5, Lektion 2 (und 4) */

const GAIT = "trab" as const;
const G = GAIT_DEFS[GAIT];
const K = 1.5; // Maßstab Pferde-Einheiten → Pixel
const X0 = 110;
const GROUND_Y = 545;
const Y0 = GROUND_Y - 285 * K;
const SPEED = (G.stride / (G.duty * G.cycle)) * K;

const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const lerpP = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];

/** Reiterin zwischen Sitzen (u=0) und Aufstehen (u=1); die Hand bleibt, wo sie ist */
export function riderBody(u: number): Body {
  const L = BODIES.leicht;
  return {
    hip: lerpP(SITZ.hip, L.hip, u),
    shoulder: lerpP(SITZ.shoulder, L.shoulder, u),
    head: lerpP(SITZ.head, L.head, u),
    elbow: lerpP(SITZ.elbow, [236, 84], u),
    hand: SITZ.hand,
    knee: lerpP(SITZ.knee, L.knee, u),
    ankle: SITZ.ankle,
    heel: SITZ.heel,
    toe: SITZ.toe,
  };
}

/** Aufstehen, wenn das äußere Vorderbein (VR) nach vorne schwingt; einsitzen, wenn VR + HL auffußen */
export function riseAmount(time: number) {
  const p = (time / G.cycle) % 1;
  return (1 - Math.cos(2 * Math.PI * (p - 0.25))) / 2;
}

/** Kurzer Puls nach dem Auffußen eines Beins (0–1) */
function landPulse(leg: "VR" | "VL", time: number) {
  const { p } = legPhase(GAIT, leg, time);
  return Math.exp(-p * G.cycle * 5);
}

const toScreen = ([x, y]: P): P => [X0 + (x - 70) * K, Y0 + (y - 20) * K];

function Panel({ t, tl }: { t: number; tl: Timeline }) {
  const pairs = fade(t, tl.start("paare"), tl.end("tatam"));
  const aufab = fade(t, tl.start("auf"), tl.end("ruecken"));
  const hint = fade(t, tl.start("huefte"), tl.end("huefte"));
  const hands = fade(t, tl.start("haende"), tl.end("ruecken"));
  const tip = fade(t, tl.start("tipp"), tl.end("tipp"));
  const pA = landPulse("VR", t);
  const pB = landPulse("VL", t);
  const u = riseAmount(t);
  return (
    <g>
      {pairs > 0 && (
        <g opacity={pairs}>
          <PairRow y={150} color={COL.pairA} title="Beinpaar 1" text="hinten links + vorne rechts" on={pA} />
          <PairRow y={270} color={COL.pairB} title="Beinpaar 2" text="hinten rechts + vorne links" on={pB} />
          <g opacity={fade(t, tl.start("tatam"), tl.end("tatam"))}>
            <BigWord x={900} y={470} text="ta" on={pA} color={COL.pairA} size={84} />
            <BigWord x={1080} y={470} text="tam" on={pB} color={COL.pairB} size={84} />
          </g>
        </g>
      )}
      {aufab > 0 && (
        <g opacity={aufab}>
          <BigWord x={1000} y={250} text="AUF" on={smooth((u - 0.45) * 4)} color={COL.forest} size={110} />
          <BigWord x={1000} y={400} text="AB" on={smooth((0.55 - u) * 4)} color={COL.brown} size={110} />
        </g>
      )}
      {hint > 0 && (
        <g opacity={hint}>
          <Note x={760} y={470} lines={["Aus der Hüfte nach vorn-oben", "Knie federt · Absatz tief"]} />
        </g>
      )}
      {hands > 0 && (
        <g opacity={hands}>
          <Note x={760} y={470} lines={["Hände bleiben ruhig", "an derselben Stelle"]} accent />
        </g>
      )}
      {tip > 0 && (
        <g opacity={tip}>
          <Card x={760} y={120} w={460} h={330}>
            <text x={790} y={175} fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.rust}>
              PROFI-TIPP
            </text>
            <text x={790} y={222} fontFamily={FONT_DISPLAY} fontSize="34" fontWeight="700" fill={COL.forestDeep}>
              Äußere Schulter
            </text>
            <text x={790} y={262} fontFamily={FONT_DISPLAY} fontSize="34" fontWeight="700" fill={COL.forestDeep}>
              geht nach vorn?
            </text>
            <BigWord x={990} y={370} text={u > 0.5 ? "AUF!" : "ab"} on={u > 0.5 ? 1 : 0.4} color={u > 0.5 ? COL.honey : COL.brown} size={80} />
            <text x={790} y={425} fontFamily={FONT_BODY} fontSize="20" fill={COL.inkSoft}>
              Hier: linke Hand – außen ist rechts
            </text>
          </Card>
        </g>
      )}
    </g>
  );
}

function PairRow({ y, color, title, text, on }: { y: number; color: string; title: string; text: string; on: number }) {
  return (
    <g>
      <rect x={760} y={y} width={460} height={96} rx="22" fill={COL.paper} stroke={color} strokeWidth={3 + 4 * on} />
      <circle cx={812} cy={y + 48} r={22 + 6 * on} fill={color} />
      <text x={856} y={y + 40} fontFamily={FONT_DISPLAY} fontSize="28" fontWeight="700" fill={COL.forestDeep}>
        {title}
      </text>
      <text x={856} y={y + 74} fontFamily={FONT_BODY} fontSize="22" fill={COL.inkSoft}>
        {text}
      </text>
    </g>
  );
}

function Note({ x, y, lines, accent }: { x: number; y: number; lines: string[]; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y - 46} width={460} height={34 + lines.length * 36} rx="20" fill={accent ? COL.honey : COL.forest} />
      {lines.map((l, i) => (
        <text key={l} x={x + 24} y={y - 8 + i * 36} fontFamily={FONT_BODY} fontSize="26" fontWeight="700" fill={accent ? COL.forestDeep : COL.paper}>
          {l}
        </text>
      ))}
    </g>
  );
}

function Scene({ t, tl }: { t: number; tl: Timeline }) {
  const look = getHorse("tonga")!.look;
  const riding = clamp01((t - tl.start("auf") + 0.3) / 0.6); // vorher sitzt die Reiterin aus
  const u = riseAmount(t) * riding;
  const b = riderBody(u);
  const pairs = fade(t, tl.start("paare"), tl.end("tatam"));
  const tip = fade(t, tl.start("tipp"), tl.end("tipp"));
  const marks = fade(t, tl.start("huefte"), tl.end("huefte"));
  const hands = fade(t, tl.start("haende"), tl.end("ruecken"));
  const highlight = pairs > 0.3 ? { HL: COL.pairA, VR: COL.pairA, HR: COL.pairB, VL: COL.pairB } : tip > 0.3 ? { VR: COL.honey } : {};
  return (
    <g>
      <ScrollingArena t={t} speed={SPEED} y={400} />
      <svg x={X0} y={Y0} width={320 * K} height={292 * K} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={look} gait={GAIT} time={t} highlight={highlight}>
          <Tack hand={b.hand} longRein={false} stirrupsDown={false} />
          <Rider b={b} pose={u > 0.5 ? "leicht" : "sitz"} />
          {marks > 0 && (
            <g opacity={marks} fill="none" stroke={COL.honey} strokeWidth="2.6" strokeLinecap="round">
              <circle cx={b.hip[0]} cy={b.hip[1]} r="9" />
              <path d={`M${b.hip[0] + 8},${b.hip[1] - 6} l14,-12 m-8,0 l8,0 l0,8`} />
              <circle cx={b.knee[0]} cy={b.knee[1]} r="8" />
              <circle cx={b.heel[0]} cy={b.heel[1]} r="8" />
            </g>
          )}
          {hands > 0 && (
            <g opacity={hands}>
              <circle cx={b.hand[0]} cy={b.hand[1]} r="11" fill="none" stroke={COL.honey} strokeWidth="3" />
              <path d={`M${b.hand[0] - 30},${b.hand[1]} H${b.hand[0] + 30}`} stroke={COL.honey} strokeWidth="1.6" strokeDasharray="3 3" />
            </g>
          )}
        </AnimHorse>
      </svg>
    </g>
  );
}

function TitleCard({ t, tl }: { t: number; tl: Timeline }) {
  const o = fade(t, 0, tl.end("titel"), 0.5);
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <rect width="1280" height="720" fill={COL.bg} opacity="0.86" />
      <Card x={250} y={170} w={780} h={300}>
        <image href="/kids/ben-320.webp" x={290} y={215} width={210} height={210} />
        <text x={540} y={270} fontFamily={FONT_BODY} fontSize="24" fontWeight="700" fill={COL.rust}>
          GROSSE REITAKADEMIE · TRAB REITEN
        </text>
        <text x={540} y={340} fontFamily={FONT_DISPLAY} fontSize="62" fontWeight="800" fill={COL.forestDeep}>
          Leichttraben
        </text>
        <text x={540} y={392} fontFamily={FONT_DISPLAY} fontSize="40" fontWeight="600" fill={COL.forest}>
          – so geht’s!
        </text>
      </Card>
    </g>
  );
}

function Merksatz({ t, tl }: { t: number; tl: Timeline }) {
  const o = fade(t, tl.start("merke"), tl.total + 1, 0.5);
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <Card x={740} y={120} w={490} h={330} fill={COL.forest}>
        <text x={772} y={176} fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.honey}>
          MERKSATZ
        </text>
        {["Auf – ab", "im Takt des Pferdes.", "Die Hände", "bleiben ruhig."].map((l, i) => (
          <text key={l} x={772} y={236 + i * 52} fontFamily={FONT_DISPLAY} fontSize="40" fontWeight="700" fill={COL.paper}>
            {l}
          </text>
        ))}
      </Card>
    </g>
  );
}

export const leichttraben: VideoDef = {
  slug: "leichttraben",
  title: "Leichttraben – so geht’s!",
  world: "trab-reiten",
  lesson: "leichttraben",
  lines: [
    { id: "titel", text: "Leichttraben – so geht's!", pause: 0.8 },
    { id: "paare", text: "Im Trab bewegen sich immer zwei Beine zusammen: ein Vorderbein und das Hinterbein über Kreuz." },
    { id: "tatam", text: "Darum hüpfst du im Sattel: ta-tam, ta-tam.", pause: 1.2 },
    { id: "auf", text: "Beim Leichttraben stehst du bei einem Takt ein kleines bisschen auf …", pause: 0.3 },
    { id: "ab", text: "… und beim nächsten Takt setzt du dich weich wieder hin. Auf – ab, auf – ab.", pause: 1.4 },
    { id: "huefte", text: "Die Bewegung kommt aus der Hüfte, nach vorn und nach oben. Das Knie federt, der Absatz bleibt tief." },
    { id: "haende", text: "Ganz wichtig: Deine Hände bleiben ruhig an derselben Stelle." },
    { id: "ruecken", text: "So ziehst du nicht am Maul, und der Rücken deines Pferdes wird geschont.", pause: 1 },
    { id: "tipp", text: "Profi-Tipp: Du stehst auf, wenn die äußere Schulter des Pferdes nach vorne geht.", pause: 2 },
    { id: "merke", text: "Merke: Auf – ab im Takt des Pferdes. Die Hände bleiben ruhig.", pause: 1.5 },
  ],
  render: (t, tl) => (
    <Frame t={t} tl={tl} chip="Große Reitakademie · Trab">
      <Scene t={t} tl={tl} />
      <Panel t={t} tl={tl} />
      <Merksatz t={t} tl={tl} />
      <TitleCard t={t} tl={tl} />
    </Frame>
  ),
};

export { toScreen };
