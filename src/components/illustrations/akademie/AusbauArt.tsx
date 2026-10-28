import type { ReactNode } from "react";
import { getHorse } from "@/content/horses";
import { AnimHorse, type LegId, type LegJoints } from "./AnimHorse";
import { Rider, Tack } from "./RiderScene";
import type { Body, P } from "./geometry";
import type { JumpPhase, LateralMove, ObstacleKind } from "./scene-names";

/**
 * Bilder für den Ausbau der Reitakademie (Dressur, Springen, Seitengänge).
 * Alle Szenen: viewBox 0 0 800 600, gleiche Farben wie AkademieArt.
 */

const C = {
  bg: "#EFE8D8",
  paper: "#FBF8F1",
  forest: "#344638",
  forestDeep: "#26342A",
  forestSoft: "#5E7360",
  sage: "#DDE3D6",
  sand: "#D9C6A5",
  sandLight: "#E8DCC4",
  sandDeep: "#C4AC84",
  brown: "#80634D",
  brownDeep: "#5E4636",
  gold: "#C99A4E",
  rust: "#A4573A",
  ink: "#2C2A24",
  water: "#7FA7B5",
  white: "#F7F3EC",
};

const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

function Label({ x, y, children, anchor = "middle", size = 26, color = C.forestDeep }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number; color?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} fontFamily={FONT} paintOrder="stroke" stroke={C.paper} strokeWidth={size / 5} strokeLinejoin="round">
      {children}
    </text>
  );
}

function Arrowhead({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10Z" fill={color} />
    </marker>
  );
}

/* =====================================================================
   Hindernisse (Schrägansicht: Stangen laufen leicht in die Tiefe)
   ===================================================================== */

const DEPTH: P = [46, -30]; // Versatz von der nahen zur fernen Seite

function Standard({ x, ground, h, far }: { x: number; ground: number; h: number; far?: boolean }) {
  return <rect x={x - 5} y={ground - h - 18} width="10" height={h + 18} rx="2" fill={far ? "#E9E2D2" : C.paper} stroke={C.brownDeep} strokeWidth="2.5" />;
}

function Pole({ x, y, w = 1 }: { x: number; y: number; w?: number }) {
  const [dx, dy] = DEPTH;
  const t = 9 * w;
  // Stange mit rot-weißen Abschnitten
  const segs = 4;
  return (
    <g>
      {Array.from({ length: segs }, (_, i) => {
        const a = i / segs;
        const b = (i + 1) / segs;
        return (
          <path
            key={i}
            d={`M${x + dx * a} ${y + dy * a} L${x + dx * b} ${y + dy * b} L${x + dx * b} ${y + dy * b + t} L${x + dx * a} ${y + dy * a + t} Z`}
            fill={i % 2 ? C.white : C.rust}
            stroke={C.brownDeep}
            strokeWidth="1.5"
          />
        );
      })}
    </g>
  );
}

/** Ein Steilsprung: zwei Ständer, Stangen senkrecht übereinander */
function Vertical({ x, ground, h, poles = 3 }: { x: number; ground: number; h: number; poles?: number }) {
  const [dx, dy] = DEPTH;
  const ys = Array.from({ length: poles }, (_, i) => ground - h + (i * (h - 14)) / Math.max(1, poles - 1) * (poles > 1 ? 1 : 0));
  return (
    <g>
      <Standard x={x + dx} ground={ground + dy} h={h} far />
      {ys.map((y, i) => (
        <Pole key={i} x={x} y={y} />
      ))}
      <Standard x={x} ground={ground} h={h} />
    </g>
  );
}

function Wall({ x, ground, h }: { x: number; ground: number; h: number }) {
  const [dx, dy] = DEPTH;
  const w = 34;
  return (
    <g stroke={C.brownDeep} strokeWidth="2">
      {/* Oberseite */}
      <path d={`M${x} ${ground - h} L${x + dx} ${ground - h + dy} L${x + dx + w} ${ground - h + dy} L${x + w} ${ground - h} Z`} fill="#C98B6B" />
      {/* Seite */}
      <path d={`M${x + w} ${ground - h} L${x + w + dx} ${ground - h + dy} L${x + w + dx} ${ground + dy} L${x + w} ${ground} Z`} fill="#9C5F45" />
      {/* Vorderseite mit Steinen */}
      <rect x={x} y={ground - h} width={w} height={h} fill="#B5714F" />
      {Array.from({ length: Math.floor(h / 18) }, (_, i) => (
        <path key={i} d={`M${x} ${ground - h + (i + 1) * 18}h${w}`} strokeWidth="1.4" opacity=".7" />
      ))}
    </g>
  );
}

function Water({ x, ground, w }: { x: number; ground: number; w: number }) {
  return (
    <g>
      <path d={`M${x} ${ground + 8} L${x + w} ${ground + 8} L${x + w + 40} ${ground - 18} L${x + 40} ${ground - 18} Z`} fill={C.water} stroke="#5D8593" strokeWidth="2" />
      <path d={`M${x + 30} ${ground - 4} q12 -6 24 0 t24 0 t24 0`} stroke={C.paper} strokeWidth="2.5" fill="none" opacity=".7" />
      {/* kleine Hecke als Absprungmarkierung */}
      <path d={`M${x - 6} ${ground + 8} q6 -22 14 -26 q8 4 12 18 q6 -16 12 -14 q6 6 6 22 Z`} fill="#6E8A5C" />
    </g>
  );
}

function Cross({ x, ground, h }: { x: number; ground: number; h: number }) {
  const [dx, dy] = DEPTH;
  return (
    <g>
      <Standard x={x + dx} ground={ground + dy} h={h} far />
      <path d={`M${x} ${ground - h} L${x + dx} ${ground + dy - 6}`} stroke={C.rust} strokeWidth="9" strokeLinecap="round" />
      <path d={`M${x} ${ground - 6} L${x + dx} ${ground + dy - h}`} stroke={C.white} strokeWidth="9" strokeLinecap="round" />
      <path d={`M${x} ${ground - 6} L${x + dx} ${ground + dy - h}`} stroke={C.brownDeep} strokeWidth="9" strokeLinecap="round" opacity=".15" />
      <Standard x={x} ground={ground} h={h} />
    </g>
  );
}

function Cavaletti({ x, ground }: { x: number; ground: number }) {
  const [dx, dy] = DEPTH;
  const end = (ex: number, ey: number) => (
    <path d={`M${ex - 14} ${ey} L${ex + 14} ${ey - 30} M${ex + 14} ${ey} L${ex - 14} ${ey - 30}`} stroke={C.brownDeep} strokeWidth="6" strokeLinecap="round" />
  );
  return (
    <g>
      {end(x + dx, ground + dy)}
      <Pole x={x} y={ground - 24} />
      {end(x, ground)}
    </g>
  );
}

/** Zeichnet ein Hindernis mit seiner Vorderkante bei x (Szenen-Koordinaten) */
export function Obstacle({ kind, x, ground, scale = 1 }: { kind: ObstacleKind; x: number; ground: number; scale?: number }) {
  const h = 100 * scale;
  switch (kind) {
    case "steil":
      return <Vertical x={x} ground={ground} h={h} />;
    case "oxer":
      return (
        <g>
          <Vertical x={x + 70 * scale} ground={ground} h={h + 6} poles={2} />
          <Vertical x={x} ground={ground} h={h - 6} poles={3} />
        </g>
      );
    case "triplebarre":
      return (
        <g>
          <Vertical x={x + 120 * scale} ground={ground} h={h + 10} poles={1} />
          <Vertical x={x + 60 * scale} ground={ground} h={h * 0.72} poles={1} />
          <Vertical x={x} ground={ground} h={h * 0.44} poles={1} />
        </g>
      );
    case "mauer":
      return <Wall x={x} ground={ground} h={h} />;
    case "wasser":
      return <Water x={x} ground={ground} w={180 * scale} />;
    case "kreuz":
      return <Cross x={x} ground={ground} h={h * 0.6} />;
    case "cavaletti":
      return <Cavaletti x={x} ground={ground} />;
    default:
      return null;
  }
}

const OBSTACLE_NAMES: Record<ObstacleKind, string> = {
  steil: "Steilsprung",
  oxer: "Oxer",
  triplebarre: "Triplebarre",
  mauer: "Mauer",
  wasser: "Wassergraben",
  kreuz: "Kreuzsprung",
  cavaletti: "Cavaletti",
};

function Ground({ y = 470 }: { y?: number }) {
  return (
    <g>
      <rect width="800" height="600" fill={C.bg} />
      <path d={`M0 ${y - 150}c160-26 320-18 480-24s240-14 320-8v60H0Z`} fill="#C9CDB4" opacity=".55" />
      <rect y={y - 40} width="800" height={640 - y} fill="#E3D3B4" />
      <path d={`M0 ${y + 90}c200 8 600 8 800 0V600H0Z`} fill={C.sand} opacity=".7" />
    </g>
  );
}

/** Ein Hindernis groß, mit Name und Bemaßung */
export function ObstacleScene({ kind, className }: { kind: ObstacleKind; className?: string }) {
  const ground = 440;
  const x = kind === "triplebarre" ? 270 : kind === "oxer" ? 300 : kind === "wasser" ? 260 : 340;
  const id = `obs-${kind}`;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={OBSTACLE_NAMES[kind]}>
      <defs>
        <Arrowhead id={id} color={C.forest} />
      </defs>
      <Ground y={ground + 40} />
      <g transform={`translate(${x} ${ground}) scale(1.7) translate(${-x} ${-ground})`}>
        <Obstacle kind={kind} x={x} ground={ground} />
      </g>
      {/* Reitrichtung */}
      <path d="M90 540H250" stroke={C.forest} strokeWidth="6" strokeLinecap="round" markerEnd={`url(#${id})`} />
      <Label x={90} y={580} anchor="start" size={22} color={C.forest}>
        Reitrichtung
      </Label>
      {kind === "oxer" && (
        <g>
          <path d={`M${x} 470 H${x + 119}`} stroke={C.gold} strokeWidth="4" markerStart={`url(#${id})`} markerEnd={`url(#${id})`} />
          <Label x={x + 60} y={500} size={22}>
            Weite
          </Label>
        </g>
      )}
      <Label x={400} y={70} size={40}>
        {OBSTACLE_NAMES[kind]}
      </Label>
    </svg>
  );
}

/** Kombination oder Distanz von der Seite: Hindernisse mit Galoppsprüngen dazwischen */
export function CourseLineScene({ variant, className }: { variant: "kombination" | "distanz"; className?: string }) {
  const ground = 400;
  const id = `line-${variant}`;
  const fences: Array<{ x: number; kind: ObstacleKind; label: string }> =
    variant === "kombination"
      ? [
          { x: 110, kind: "steil", label: "A" },
          { x: 350, kind: "oxer", label: "B" },
          { x: 640, kind: "steil", label: "C" },
        ]
      : [
          { x: 110, kind: "steil", label: "" },
          { x: 640, kind: "oxer", label: "" },
        ];
  // Galoppsprünge als Bögen zwischen den Hindernissen
  const strides: Array<[number, number]> =
    variant === "kombination"
      ? [
          [150, 238],
          [238, 330],
          [420, 494],
          [494, 562],
          [562, 630],
        ]
      : [
          [160, 256],
          [256, 352],
          [352, 448],
          [448, 544],
          [544, 630],
        ];
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={variant === "kombination" ? "Dreifache Kombination mit Abständen" : "Zwei Hindernisse auf einer Linie mit Galoppsprüngen"}>
      <defs>
        <Arrowhead id={id} color={C.forest} />
      </defs>
      <Ground y={ground + 40} />
      {fences.map((f, i) => (
        <g key={i}>
          <Obstacle kind={f.kind} x={f.x} ground={ground} scale={0.8} />
          {f.label && (
            <Label x={f.x + 30} y={ground - 130} size={34} color={C.rust}>
              {f.label}
            </Label>
          )}
        </g>
      ))}
      {strides.map(([a, b], i) => (
        <g key={i}>
          <path d={`M${a} ${ground + 30} Q${(a + b) / 2} ${ground - 40} ${b} ${ground + 30}`} fill="none" stroke={C.forestSoft} strokeWidth="4" strokeDasharray="3 8" strokeLinecap="round" />
          <ellipse cx={b} cy={ground + 34} rx="9" ry="5" fill={C.brownDeep} opacity=".6" />
        </g>
      ))}
      {variant === "kombination" ? (
        <g>
          <path d={`M140 ${ground + 80} H350`} stroke={C.forest} strokeWidth="4" markerStart={`url(#${id})`} markerEnd={`url(#${id})`} />
          <Label x={245} y={ground + 112} size={19}>
            ca. 7,5–8 m
          </Label>
          <Label x={245} y={ground + 138} size={17} color={C.brownDeep}>
            1 Galoppsprung
          </Label>
          <path d={`M420 ${ground + 80} H640`} stroke={C.forest} strokeWidth="4" markerStart={`url(#${id})`} markerEnd={`url(#${id})`} />
          <Label x={530} y={ground + 112} size={19}>
            ca. 10,5–11 m
          </Label>
          <Label x={530} y={ground + 138} size={17} color={C.brownDeep}>
            2 Galoppsprünge
          </Label>
          <Label x={400} y={70} size={36}>
            Dreifache Kombination
          </Label>
        </g>
      ) : (
        <g>
          <path d={`M140 ${ground + 80} H640`} stroke={C.forest} strokeWidth="4" markerStart={`url(#${id})`} markerEnd={`url(#${id})`} />
          <Label x={390} y={ground + 118} size={22}>
            ca. 18 m · 4 Galoppsprünge (je ca. 3,5 m)
          </Label>
          <Label x={400} y={70} size={36}>
            Distanz zählen
          </Label>
        </g>
      )}
    </svg>
  );
}

/* =====================================================================
   Sprungphasen (Seitenansicht mit Pferd und Reiterin)
   ===================================================================== */

/** Reiterin im leichten Sitz / Springsitz, Koordinaten wie geometry.ts (Pferde-Einheiten) */
const SPRING: Body = {
  hip: [226, 95],
  shoulder: [247, 60],
  head: [255, 42],
  elbow: [252, 86],
  hand: [272, 98],
  knee: [246, 145],
  ankle: [229, 186],
  heel: [224, 192],
  toe: [243, 193],
};
const FLUG: Body = { ...SPRING, hip: [232, 90], shoulder: [263, 66], head: [277, 52], elbow: [272, 93], hand: [298, 106], knee: [248, 144] };
const LANDUNG: Body = { ...SPRING, hip: [224, 96], shoulder: [243, 60], head: [249, 42], elbow: [252, 88], hand: [282, 102] };

type PhaseDef = {
  body: Body;
  rotate: number;
  pivot: P;
  dy: number;
  legs?: Partial<Record<LegId, LegJoints>>;
  gait: "galopp-rechts" | "stand";
  time: number;
  /** Hindernis-Position (linke Kante, Szenen-x) */
  fence: number | null;
  title: string;
};

const PHASES: Record<JumpPhase, PhaseDef> = {
  anreiten: { body: SPRING, rotate: 0, pivot: [200, 200], dy: 0, gait: "galopp-rechts", time: 0.55, fence: 650, title: "1 · Anreiten" },
  absprung: {
    body: FLUG,
    rotate: -20,
    pivot: [150, 296],
    dy: 0,
    gait: "stand",
    time: 0,
    legs: {
      VL: { knee: [304, 176], foot: [288, 220] },
      VR: { knee: [314, 172], foot: [300, 214] },
      HL: { knee: [108, 230], foot: [150, 288] },
      HR: { knee: [122, 228], foot: [162, 286] },
    },
    fence: 545,
    title: "2 · Absprung",
  },
  flug: {
    body: FLUG,
    rotate: -5,
    pivot: [200, 200],
    dy: -70,
    gait: "stand",
    time: 0,
    legs: {
      VL: { knee: [300, 198], foot: [276, 224] },
      VR: { knee: [311, 194], foot: [288, 220] },
      HL: { knee: [94, 214], foot: [98, 256] },
      HR: { knee: [106, 212], foot: [110, 254] },
    },
    fence: 335,
    title: "3 · Flugphase",
  },
  landung: {
    body: LANDUNG,
    rotate: 20,
    pivot: [266, 300],
    dy: 0,
    gait: "stand",
    time: 0,
    legs: {
      VL: { knee: [262, 238], foot: [268, 290] },
      VR: { knee: [279, 232], foot: [294, 274] },
      HL: { knee: [118, 226], foot: [142, 252] },
      HR: { knee: [130, 224], foot: [156, 250] },
    },
    fence: 130,
    title: "4 · Landung",
  },
  weiter: { body: SPRING, rotate: 0, pivot: [200, 200], dy: 0, gait: "galopp-rechts", time: 1.3, fence: 20, title: "5 · Weiterreiten" },
};

const JBOX = { x: 150, y: 140, width: 420 };

export function JumpScene({ phase, horse = "scrabble", className, title = true }: { phase: JumpPhase; horse?: string; className?: string; title?: boolean }) {
  const def = PHASES[phase];
  const look = getHorse(horse)?.look ?? getHorse("tonga")!.look;
  const k = JBOX.width / 320;
  const ground = JBOX.y + (288 - 20) * k + 14; // Bodenlinie unter den Hufen
  const h = (JBOX.width * 292) / 320;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={`Sprung: ${def.title.replace(/^\d · /, "")}`}>
      <Ground y={ground + 40} />
      {def.fence !== null && <Obstacle kind="steil" x={def.fence} ground={ground} scale={1.3} />}
      <svg x={JBOX.x} y={JBOX.y + def.dy * k} width={JBOX.width} height={h} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={look} gait={def.gait} time={def.time} legs={def.legs} rotate={def.rotate} pivot={def.pivot} noShadow={def.dy !== 0}>
          <Tack hand={def.body.hand} longRein={false} stirrupsDown={false} />
          <Rider b={def.body} pose="leicht" />
        </AnimHorse>
      </svg>
      {def.dy !== 0 && <ellipse cx="400" cy={ground + 12} rx="150" ry="9" fill={C.brown} opacity=".16" />}
      {title && (
        <Label x={400} y={64} size={38}>
          {def.title}
        </Label>
      )}
    </svg>
  );
}

/* =====================================================================
   Pferd von oben: Seitengänge, Wendungen, Rückwärtsrichten
   ===================================================================== */

type TopPose = { x: number; y: number; angle: number; bend: number; opacity?: number; color?: string };

/** Hufpositionen (vorn links/rechts, hinten links/rechts) eines Pferdes von oben */
function topHoofs({ x, y, angle, bend }: TopPose): P[] {
  const rad = (d: number) => (d * Math.PI) / 180;
  const a = rad(angle);
  const b = rad(bend);
  const fw = (p: P, ang: number, len: number): P => [p[0] + Math.cos(ang) * len, p[1] + Math.sin(ang) * len];
  const withers = fw([x, y], a - b / 2, 46);
  const hip = fw([x, y], a + Math.PI + b / 2, 50);
  const side = (p: P, ang: number, d: number): P => [p[0] + Math.cos(ang + Math.PI / 2) * d, p[1] + Math.sin(ang + Math.PI / 2) * d];
  return [side(withers, a - b / 2, -17), side(withers, a - b / 2, 17), side(hip, a + b / 2, -17), side(hip, a + b / 2, 17)];
}

/** Hufspuren: verschiedene Abstände zur Bande, nahe beieinander liegende zählen als eine Spur */
function trackLines(pose: TopPose): number[] {
  const ys = topHoofs(pose)
    .map((h) => h[1])
    .sort((p, q) => p - q);
  const out: number[] = [];
  for (const y of ys) if (!out.length || y - out[out.length - 1] > 12) out.push(y);
  return out;
}

/** Pferd von oben. angle = Blickrichtung in Grad (0 = nach rechts), bend = Biegung in Grad (+ = nach links gebogen) */
function TopHorse({ x, y, angle, bend, opacity = 1, color = C.brown }: TopPose) {
  // Wirbelsäule: Hüfte – Mitte – Widerrist – Kopf
  const rad = (d: number) => (d * Math.PI) / 180;
  const mid: P = [x, y];
  const a = rad(angle);
  const b = rad(bend);
  const fw = (p: P, ang: number, len: number): P => [p[0] + Math.cos(ang) * len, p[1] + Math.sin(ang) * len];
  const withers = fw(mid, a - b / 2, 46);
  const hip = fw(mid, a + Math.PI + b / 2, 50);
  const poll = fw(withers, a - b, 56);
  const nose = fw(poll, a - b * 1.2, 30);
  const side = (p: P, ang: number, d: number): P => [p[0] + Math.cos(ang + Math.PI / 2) * d, p[1] + Math.sin(ang + Math.PI / 2) * d];
  const hoofs: P[] = [side(withers, a - b / 2, -17), side(withers, a - b / 2, 17), side(hip, a + b / 2, -17), side(hip, a + b / 2, 17)];
  return (
    <g opacity={opacity}>
      {hoofs.map((h, i) => (
        <circle key={i} cx={h[0]} cy={h[1]} r="7" fill={C.ink} opacity=".75" />
      ))}
      <path d={`M${hip[0]} ${hip[1]} Q${mid[0]} ${mid[1]} ${withers[0]} ${withers[1]}`} stroke={color} strokeWidth="46" strokeLinecap="round" fill="none" />
      <path d={`M${withers[0]} ${withers[1]} L${poll[0]} ${poll[1]}`} stroke={color} strokeWidth="24" strokeLinecap="round" />
      <path d={`M${poll[0]} ${poll[1]} L${nose[0]} ${nose[1]}`} stroke={color} strokeWidth="18" strokeLinecap="round" />
      {/* Schweif */}
      <path d={`M${hip[0]} ${hip[1]} L${fw(hip, a + Math.PI + b / 2, 30)[0]} ${fw(hip, a + Math.PI + b / 2, 30)[1]}`} stroke={C.brownDeep} strokeWidth="9" strokeLinecap="round" />
      {/* Reiterin von oben */}
      <circle cx={mid[0] + Math.cos(a) * 6} cy={mid[1] + Math.sin(a) * 6} r="14" fill={C.forest} stroke={C.paper} strokeWidth="3" />
    </g>
  );
}

const LATERAL_TITLES: Record<LateralMove, string> = {
  gerade: "Geradeaus: 2 Hufspuren",
  schenkelweichen: "Schenkelweichen",
  schulterherein: "Schulterherein: 3 Hufspuren",
  travers: "Travers: 4 Hufspuren",
  renvers: "Renvers: 4 Hufspuren",
  traversale: "Traversale",
  vorhandwendung: "Vorhandwendung",
  hinterhandwendung: "Hinterhandwendung",
  rueckwaerts: "Rückwärtsrichten",
  pirouette: "Pirouette im Galopp",
};

export function LateralScene({ move, className }: { move: LateralMove; className?: string }) {
  const id = `lat-${move}`;
  const wallY = 120;
  const trackY = 210;
  const poses: TopPose[] = [];
  let tracks: number[] = [];
  let arrow = "M120 470 H680";
  const xs = [190, 400, 610];
  switch (move) {
    case "gerade":
      xs.forEach((x, i) => poses.push({ x, y: trackY, angle: 0, bend: 0, opacity: i === 2 ? 1 : 0.35 }));
      break;
    case "schulterherein":
      xs.forEach((x, i) => poses.push({ x, y: trackY + 22, angle: 18, bend: -12, opacity: i === 2 ? 1 : 0.35 }));
      break;
    case "travers":
      xs.forEach((x, i) => poses.push({ x, y: trackY + 22, angle: -30, bend: -18, opacity: i === 2 ? 1 : 0.35 }));
      break;
    case "renvers":
      xs.forEach((x, i) => poses.push({ x, y: trackY + 46, angle: 30, bend: 18, opacity: i === 2 ? 1 : 0.35 }));
      break;
    case "schenkelweichen":
      // Kopf zur Bande, das Pferd tritt vorwärts-seitwärts an der Bande entlang
      xs.forEach((x, i) => poses.push({ x, y: trackY + 50, angle: -45, bend: 6, opacity: i === 2 ? 1 : 0.35 }));
      break;
    case "traversale":
      [0, 1, 2].forEach((i) => poses.push({ x: 200 + i * 200, y: 210 + i * 90, angle: 8, bend: -14, opacity: i === 2 ? 1 : 0.35 }));
      arrow = "M170 300 L660 500";
      break;
    case "vorhandwendung":
      [0, 90, 180].forEach((r, i) => {
        const cx = 400;
        const cy = 330;
        const ang = (r * Math.PI) / 180;
        // Vorderbeine bleiben in der Mitte, die Hinterhand dreht außen herum
        poses.push({ x: cx - Math.cos(ang) * 60, y: cy - Math.sin(ang) * 60, angle: r, bend: 0, opacity: i === 2 ? 1 : 0.35 });
      });
      arrow = "";
      break;
    case "hinterhandwendung":
    case "pirouette":
      [0, 90, 180].forEach((r, i) => {
        const cx = 400;
        const cy = 330;
        const ang = (r * Math.PI) / 180;
        // Hinterbeine bleiben in der Mitte, die Vorhand dreht außen herum
        poses.push({ x: cx + Math.cos(ang) * 60, y: cy + Math.sin(ang) * 60, angle: r, bend: move === "pirouette" ? -10 : 0, opacity: i === 2 ? 1 : 0.35 });
      });
      arrow = "";
      break;
    case "rueckwaerts":
      poses.push({ x: 520, y: 320, angle: 0, bend: 0, opacity: 0.35 });
      poses.push({ x: 380, y: 320, angle: 0, bend: 0 });
      arrow = "M520 450 H260";
      break;
  }
  const along = ["gerade", "schulterherein", "travers", "renvers"].includes(move);
  if (along && poses.length) tracks = trackLines(poses[poses.length - 1]);
  const turning = move === "vorhandwendung" || move === "hinterhandwendung" || move === "pirouette";
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={`Von oben: ${LATERAL_TITLES[move]}`}>
      <defs>
        <Arrowhead id={id} color={C.forest} />
      </defs>
      <rect width="800" height="600" fill={C.bg} />
      <rect x="40" y={wallY} width="720" height="420" rx="8" fill={C.sandLight} />
      {!turning && (
        <g>
          <rect x="40" y={wallY - 16} width="720" height="16" rx="4" fill={C.brown} />
          <Label x={70} y={wallY - 28} anchor="start" size={20} color={C.brownDeep}>
            Bande
          </Label>
        </g>
      )}
      {tracks.map((t, i) => (
        <path key={i} d={`M60 ${t} H740`} stroke={i % 2 ? C.forestSoft : C.gold} strokeWidth="3" strokeDasharray="8 10" />
      ))}
      {turning && (
        <circle
          cx={400}
          cy={330}
          r={move === "vorhandwendung" ? 108 : 108}
          fill="none"
          stroke={C.forestSoft}
          strokeWidth="3"
          strokeDasharray="8 10"
        />
      )}
      {turning && <circle cx={400} cy={330} r={move === "pirouette" ? 26 : 14} fill={C.gold} opacity=".55" />}
      {poses.map((p, i) => (
        <TopHorse key={i} {...p} />
      ))}
      {arrow && <path d={arrow} stroke={C.forest} strokeWidth="6" strokeLinecap="round" fill="none" markerEnd={`url(#${id})`} />}
      {move === "rueckwaerts" && (
        <Label x={390} y={500} size={22}>
          diagonale Beinpaare, Schritt für Schritt zurück
        </Label>
      )}
      {turning && (
        <Label x={400} y={520} size={22}>
          {move === "vorhandwendung" ? "Vorderbeine treten auf der Stelle" : move === "pirouette" ? "kleiner Kreis der Hinterbeine" : "Hinterbeine treten auf der Stelle"}
        </Label>
      )}
      <Label x={400} y={66} size={34}>
        {LATERAL_TITLES[move]}
      </Label>
    </svg>
  );
}

/* =====================================================================
   Dressurviereck 20 × 60 m
   ===================================================================== */

export function Arena2060Scene({ className }: { className?: string }) {
  const X0 = 70;
  const Y0 = 190;
  const M = 11;
  const px = (m: number) => X0 + m * M;
  const py = (m: number) => Y0 + m * M;
  const side: Array<[string, number]> = [
    ["K", 6],
    ["V", 18],
    ["E", 30],
    ["S", 42],
    ["H", 54],
  ];
  const other: Array<[string, number]> = [
    ["F", 6],
    ["P", 18],
    ["B", 30],
    ["R", 42],
    ["M", 54],
  ];
  const center: Array<[string, number]> = [
    ["D", 6],
    ["L", 18],
    ["X", 30],
    ["I", 42],
    ["G", 54],
  ];
  const Letter = ({ l, x, y }: { l: string; x: number; y: number }) => (
    <g>
      <circle cx={x} cy={y} r="19" fill={C.paper} stroke={C.brown} strokeWidth="3" />
      <text x={x} y={y + 8} textAnchor="middle" fontSize="22" fontWeight={700} fill={C.forestDeep} fontFamily={FONT}>
        {l}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Dressurviereck 20 mal 60 Meter mit allen Buchstaben">
      <rect width="800" height="600" fill={C.bg} />
      <rect x={px(0)} y={py(0)} width={60 * M} height={20 * M} fill={C.sandLight} stroke={C.white} strokeWidth="6" />
      <path d={`M${px(0)} ${py(10)}H${px(60)}`} stroke={C.sandDeep} strokeWidth="2" strokeDasharray="6 10" />
      {center.map(([l, m]) => (
        <g key={l}>
          <circle cx={px(m)} cy={py(10)} r="5" fill={C.sandDeep} />
          <Label x={px(m)} y={py(10) - 14} size={20} color={C.brownDeep}>
            {l}
          </Label>
        </g>
      ))}
      {side.map(([l, m]) => (
        <Letter key={l} l={l} x={px(m)} y={py(0) - 30} />
      ))}
      {other.map(([l, m]) => (
        <Letter key={l} l={l} x={px(m)} y={py(20) + 30} />
      ))}
      <Letter l="A" x={px(0) - 30} y={py(10)} />
      <Letter l="C" x={px(60) + 30} y={py(10)} />
      <Label x={400} y={70} size={32}>
        Dressurviereck 20 × 60 m
      </Label>
      <Label x={400} y={110} size={20} color={C.brownDeep}>
        Hier sitzen die Richter bei C
      </Label>
    </svg>
  );
}
