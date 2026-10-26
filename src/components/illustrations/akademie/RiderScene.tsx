import { Horse } from "../Horse";
import { getHorse } from "@/content/horses";
import { BIT, BODIES, BOX, riderPoint, toScene, type Body, type P, type RiderMark, type RiderPose } from "./geometry";

export type { RiderMark, RiderPose } from "./geometry";

/**
 * Reitakademie: Pferd in Seitenansicht mit Sattel, Trense und (optional)
 * Reiterin. viewBox 0 0 800 600 – passt damit zu den Suchbild-Schritten.
 *
 * Das Pferd wird mit der vorhandenen Hof-Illustration gezeichnet; Sattelzeug
 * und Reiterin liegen in denselben Koordinaten darüber.
 */

const C = {
  jacket: "#344638",
  jacketShade: "#26342A",
  breeches: "#EFE6D2",
  breechesShade: "#D9CBB0",
  boot: "#3E2C22",
  skin: "#E8AE86",
  helmet: "#2C2A24",
  hair: "#5A3420",
  glove: "#5E4636",
  leather: "#6B4A33",
  leatherDark: "#4E3524",
  pad: "#F3EEE4",
  padEdge: "#C99A4E",
  metal: "#B9B3A6",
  gold: "#C99A4E",
};

function torso(b: Body) {
  const [hx, hy] = b.hip;
  const [sx, sy] = b.shoulder;
  const dx = sx - hx;
  const dy = sy - hy;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 10;
  const ny = (dx / len) * 10;
  // leicht gewölbter Rücken, schmalere Schultern
  return `M${hx - nx - 2},${hy - ny + 4} L${sx - nx * 0.8},${sy - ny * 0.8} C${sx},${sy - 6} ${sx + 6},${sy - 4} ${sx + nx * 0.9},${sy + ny * 0.9} L${hx + nx + 2},${hy + ny + 4} Z`;
}

export function Rider({ b, pose }: { b: Body; pose: RiderPose }) {
  const [hx, hy] = b.head;
  const tilt = Math.atan2(b.shoulder[0] - b.hip[0], b.hip[1] - b.shoulder[1]) * (180 / Math.PI);
  const footBall: P = [b.toe[0] - 7, b.toe[1] - 1];
  return (
    <g>
      {/* Steigbügelriemen */}
      <path d={`M222,112 L${footBall[0] - 1},${footBall[1] - 4}`} stroke={C.leatherDark} strokeWidth="2.6" />
      {/* Oberschenkel */}
      <path d={`M${b.hip[0]},${b.hip[1]} L${b.knee[0]},${b.knee[1]}`} stroke={C.breeches} strokeWidth="15" strokeLinecap="round" />
      <path d={`M${b.hip[0] + 2},${b.hip[1] + 6} L${b.knee[0]},${b.knee[1] + 5}`} stroke={C.breechesShade} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      {/* Unterschenkel mit Stiefel */}
      <path d={`M${b.knee[0]},${b.knee[1]} L${b.ankle[0]},${b.ankle[1]}`} stroke={C.boot} strokeWidth="11" strokeLinecap="round" />
      {/* Fuß */}
      <path
        d={`M${b.ankle[0] - 5},${b.ankle[1] - 2} L${b.heel[0] - 2},${b.heel[1] + 1} L${b.toe[0]},${b.toe[1] + 1} C${b.toe[0] + 3},${b.toe[1] - 4} ${b.toe[0] - 6},${b.toe[1] - 8} ${b.ankle[0] + 6},${b.ankle[1] - 3} Z`}
        fill={C.boot}
      />
      {/* Steigbügel unter dem Fußballen */}
      <path
        d={`M${footBall[0] - 7},${footBall[1] + 3} L${footBall[0] + 7},${footBall[1] + 3} L${footBall[0] + 4},${footBall[1] - 7} L${footBall[0] - 4},${footBall[1] - 7} Z`}
        fill="none"
        stroke={C.metal}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Oberkörper */}
      <path d={torso(b)} fill={C.jacket} />
      <path d={`M${b.hip[0] - 9},${b.hip[1] + 2} Q${b.hip[0]},${b.hip[1] + 8} ${b.hip[0] + 11},${b.hip[1] + 2}`} stroke={C.jacketShade} strokeWidth="3" fill="none" opacity=".6" />
      {/* Hals */}
      <path d={`M${b.shoulder[0] + 1},${b.shoulder[1] - 2} L${hx - 1},${hy + 8}`} stroke={C.skin} strokeWidth="7" strokeLinecap="round" />
      {/* Kopf mit Helm (gedreht wie der Oberkörper) */}
      <g transform={`rotate(${tilt * 0.6} ${hx} ${hy})`}>
        <path d={`M${hx - 9},${hy - 2} C${hx - 16},${hy + 6} ${hx - 14},${hy + 18} ${hx - 9},${hy + 22}`} stroke={C.hair} strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r="10" fill={C.skin} />
        <circle cx={hx + 6} cy={hy - 1} r="1.4" fill="#2C2A24" />
        <path d={`M${hx + 8},${hy + 4} q2,1 1,3`} stroke="#B7795A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Helmschale, Schirm, Kinnriemen */}
        <path d={`M${hx - 11},${hy + 1} C${hx - 12},${hy - 14} ${hx + 10},${hy - 16} ${hx + 11},${hy - 2} Z`} fill={C.helmet} />
        <path d={`M${hx + 7},${hy - 4} L${hx + 17},${hy - 2} L${hx + 10},${hy + 1} Z`} fill={C.helmet} />
        <path d={`M${hx - 6},${hy + 1} L${hx + 2},${hy + 10}`} stroke={C.helmet} strokeWidth="1.6" />
      </g>
      {/* Arm */}
      <path
        d={`M${b.shoulder[0] + 1},${b.shoulder[1] + 3} L${b.elbow[0]},${b.elbow[1]} L${b.hand[0] - 3},${b.hand[1]}`}
        stroke={C.jacketShade}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx={b.hand[0]} cy={b.hand[1]} r="4.6" fill={C.glove} />
      {pose === "leicht" && <path d={`M${b.hip[0] - 6},${b.hip[1] + 12} l10,0`} stroke={C.gold} strokeWidth="2" strokeDasharray="2 3" />}
    </g>
  );
}

export function Tack({ hand, longRein, stirrupsDown }: { hand: P | null; longRein: boolean; stirrupsDown: boolean }) {
  const rein = hand
    ? `M${BIT[0]},${BIT[1]} Q${(BIT[0] + hand[0]) / 2},${(BIT[1] + hand[1]) / 2 + (longRein ? 26 : 3)} ${hand[0] + 2},${hand[1]}`
    : `M${BIT[0]},${BIT[1]} C330,140 300,128 262,104`;
  return (
    <g>
      {/* Schabracke */}
      <path d="M180,110 C200,117 230,118 256,104 L260,151 C234,157 206,157 183,153 Z" fill={C.pad} stroke={C.padEdge} strokeWidth="2.5" />
      {/* Sattel */}
      <path d="M195,104 C203,114 222,117 238,111 C244,107 248,101 250,96 L257,98 C255,108 251,117 244,123 L200,125 C194,119 191,110 195,104 Z" fill={C.leather} />
      <path d="M211,119 L243,119 C247,132 247,144 244,155 L215,157 C210,145 209,132 211,119 Z" fill={C.leatherDark} opacity=".75" />
      <path d="M240,121 C246,134 246,148 243,158" stroke={C.leather} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Sattelgurt */}
      <path d="M236,158 L240,198" stroke={C.leatherDark} strokeWidth="8" />
      <rect x="233" y="160" width="10" height="7" rx="1.5" fill="none" stroke={C.metal} strokeWidth="1.6" />
      {stirrupsDown && (
        <g>
          <path d="M222,113 L220,180" stroke={C.leatherDark} strokeWidth="2.6" />
          <path d="M212,192 L228,192 L224,180 L216,180 Z" fill="none" stroke={C.metal} strokeWidth="2.4" strokeLinejoin="round" />
        </g>
      )}
      {/* Trense */}
      <g fill="none" stroke={C.leatherDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M318,52 C320,62 330,92 345,129" />
        <path d="M316,56 L333,60" />
        <path d="M318,58 C312,70 308,82 306,94" strokeWidth="2.2" />
        <path d="M331,117 C342,113 352,108 362,104" strokeWidth="3.6" />
      </g>
      <circle cx={BIT[0]} cy={BIT[1]} r="3.6" fill="none" stroke={C.metal} strokeWidth="2" />
      {/* Zügel */}
      <path d={rein} fill="none" stroke={C.leatherDark} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

function Mark({ at, n, label, left }: { at: P; n: number; label?: string; left?: boolean }) {
  return (
    <g>
      <circle cx={at[0]} cy={at[1]} r="15" fill={C.gold} opacity=".22" />
      <circle cx={at[0]} cy={at[1]} r="10.5" fill={C.gold} stroke="#FBF8F1" strokeWidth="2.5" />
      <text x={at[0]} y={at[1] + 4.6} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FBF8F1" fontFamily="system-ui, sans-serif">
        {n}
      </text>
      {label && (
        <text x={left ? at[0] - 18 : at[0] + 18} y={at[1] + 5} textAnchor={left ? "end" : "start"} fontSize="15" fontWeight="700" fill="#26342A" fontFamily="system-ui, sans-serif" paintOrder="stroke" stroke="#FBF8F1" strokeWidth="4">
          {label}
        </text>
      )}
    </g>
  );
}

export type RiderSceneProps = {
  pose?: RiderPose;
  /** Nummerierte Markierungen (Szenen-Koordinaten werden berechnet) */
  marks?: RiderMark[];
  /** Beschriftung neben den Markierungen */
  labels?: Partial<Record<RiderMark, string>>;
  /** Senkrechte Linie Ohr – Schulter – Hüfte – Absatz */
  line?: boolean;
  /** Linie Ellbogen – Hand – Pferdemaul */
  handLine?: boolean;
  /** Aufsteighilfe (steht auf der linken Seite des Pferdes) */
  block?: boolean;
  horse?: string;
  /** Nahansicht auf Reiterin und Vorderhand (für Bildantworten) */
  zoom?: boolean;
  className?: string;
  title?: string;
};

export function RiderScene({ pose = "sitz", marks = [], labels, line, handLine, block, horse = "tonga", zoom, className, title }: RiderSceneProps) {
  const look = getHorse(horse)?.look ?? getHorse("tonga")!.look;
  const b = pose === "ohne" ? null : BODIES[pose];
  const vb = "70 20 320 292";
  const h = (BOX.width * 292) / 320;
  return (
    <svg viewBox={zoom ? "170 30 480 360" : "0 0 800 600"} className={className} role="img" aria-label={title ?? "Pferd mit Reiterin"}>
      {/* Reitplatz */}
      <rect width="800" height="600" fill="#EFE8D8" />
      <path d="M0 300c160-26 320-18 480-24s240-14 320-8v60H0Z" fill="#C9CDB4" opacity=".7" />
      <rect y="330" width="800" height="270" fill="#E3D3B4" />
      <g stroke="#9A7B5E" strokeWidth="7" strokeLinecap="round">
        <path d="M0 352H800" />
        <path d="M0 382H800" opacity=".75" />
      </g>
      <g fill="#80634D">
        {[40, 200, 360, 520, 680].map((x) => (
          <rect key={x} x={x} y="336" width="10" height="64" rx="3" />
        ))}
      </g>
      <path d="M0 556c200 8 600 8 800 0v44H0Z" fill="#D9C6A5" />

      {/* Aufsteighilfe auf der linken Seite des Pferdes (hinter dem Pferd, zwischen den Beinen sichtbar) */}
      {block && (
        <g transform={`translate(${toScene([170, 236])[0]} ${toScene([170, 236])[1]})`}>
          <path d="M0 122V56h56V0h96v122Z" fill="#5E7360" />
          <path d="M0 56h56M56 0v122" stroke="#344638" strokeWidth="3" />
        </g>
      )}

      <Horse look={look} uid={`ak-${horse}-${pose}`} box={BOX} title={undefined} />

      <svg x={BOX.x} y={BOX.y} width={BOX.width} height={h} viewBox={vb} overflow="visible">
        <Tack hand={b ? b.hand : null} longRein={pose === "langzuegel"} stirrupsDown={!b} />
        {b && <Rider b={b} pose={pose} />}
        {b && line && (
          <path
            d={`M${b.head[0]},${b.head[1] - 22} L${b.shoulder[0]},${b.shoulder[1]} L${b.hip[0]},${b.hip[1]} L${b.heel[0]},${b.heel[1] + 8}`}
            fill="none"
            stroke={C.gold}
            strokeWidth="2.2"
            strokeDasharray="5 4"
          />
        )}
        {b && handLine && (
          <path d={`M${b.elbow[0]},${b.elbow[1]} L${BIT[0]},${BIT[1]}`} fill="none" stroke={C.gold} strokeWidth="2" strokeDasharray="5 4" />
        )}
      </svg>

      {marks.map((m, i) => (
        <Mark key={m} at={riderPoint(m, pose)} n={i + 1} label={labels?.[m]} left={m === "schenkel-hinter"} />
      ))}
    </svg>
  );
}
