/**
 * Geometrie der Reitakademie-Szenen (ohne React), damit Inhalte und Prüfskripte
 * Suchbild-Punkte berechnen können.
 */

export type RiderPose =
  | "sitz" // ausbalancierter Sitz
  | "vor" // Oberkörper zu weit vorn
  | "zurueck" // Oberkörper zu weit hinten
  | "stuhl" // Stuhlsitz: Beine zu weit vorn
  | "absatz" // Absatz hochgezogen
  | "leicht" // Aufstehen beim Leichttraben
  | "langzuegel" // Pause am langen Zügel
  | "ohne"; // nur Pferd mit Sattelzeug

export type RiderMark =
  | "kopf"
  | "blick"
  | "schulter"
  | "huefte"
  | "absatz"
  | "hand"
  | "knie"
  | "gesaess"
  | "schenkel-gurt"
  | "schenkel-hinter"
  | "stimme"
  | "sattel"
  | "buegel"
  | "gurt"
  | "trense"
  | "zuegel"
  | "gebiss"
  | "aufsteighilfe";

export type P = [number, number];

export type Body = {
  hip: P;
  shoulder: P;
  head: P;
  elbow: P;
  hand: P;
  knee: P;
  ankle: P;
  heel: P;
  toe: P;
};

/* Punkte in Pferde-Koordinaten (viewBox der Hof-Illustration: 70 20 320 292). */
export const SITZ: Body = {
  hip: [219, 103],
  shoulder: [222, 60],
  head: [225, 41],
  elbow: [227, 86],
  hand: [250, 95],
  knee: [245, 146],
  ankle: [228, 187],
  heel: [224, 193],
  toe: [243, 195],
};

export const BODIES: Record<Exclude<RiderPose, "ohne">, Body> = {
  sitz: SITZ,
  langzuegel: { ...SITZ, hand: [247, 100], elbow: [226, 88] },
  vor: { ...SITZ, shoulder: [238, 64], head: [246, 48], elbow: [242, 90], hand: [258, 99] },
  zurueck: { ...SITZ, shoulder: [207, 61], head: [202, 43], elbow: [218, 87], hand: [247, 95], ankle: [238, 187], heel: [235, 193], toe: [254, 194] },
  stuhl: {
    ...SITZ,
    hip: [214, 103],
    shoulder: [211, 61],
    head: [210, 42],
    elbow: [222, 87],
    hand: [248, 96],
    knee: [251, 142],
    ankle: [256, 181],
    heel: [253, 187],
    toe: [272, 188],
  },
  absatz: { ...SITZ, ankle: [229, 186], heel: [222, 184], toe: [237, 200] },
  leicht: {
    ...SITZ,
    hip: [229, 92],
    shoulder: [238, 53],
    head: [243, 35],
    elbow: [241, 80],
    hand: [255, 93],
    knee: [250, 144],
  },
};

export const BIT: P = [346, 131];

/* Lage der Pferde-Illustration in der Szene */
export const BOX = { x: 120, y: 48, width: 560 };
const K = BOX.width / 320;

/** Pferde-Koordinaten → Szenen-Koordinaten (für Suchbild-Hotspots). */
export function toScene([x, y]: P): P {
  return [Math.round(BOX.x + (x - 70) * K), Math.round(BOX.y + (y - 20) * K)];
}

const TACK_POINTS: Record<string, P> = {
  sattel: [222, 108],
  buegel: [220, 188],
  gurt: [239, 168],
  trense: [326, 74],
  zuegel: [298, 112],
  gebiss: [346, 131],
  aufsteighilfe: [196, 268],
};

/** Mittelpunkt einer Markierung in Szenen-Koordinaten (für Hotspots). */
export function riderPoint(mark: RiderMark, pose: RiderPose = "sitz"): P {
  const b = pose === "ohne" ? SITZ : BODIES[pose];
  const map: Partial<Record<RiderMark, P>> = {
    kopf: b.head,
    blick: [b.head[0] + 18, b.head[1] - 2],
    schulter: b.shoulder,
    huefte: b.hip,
    absatz: b.heel,
    hand: b.hand,
    knee: b.knee,
    knie: b.knee,
    gesaess: [b.hip[0] - 4, b.hip[1] + 4],
    "schenkel-gurt": [b.ankle[0] + 6, b.ankle[1] - 14],
    "schenkel-hinter": [b.ankle[0] - 12, b.ankle[1] - 8],
    stimme: [b.head[0] + 22, b.head[1] + 10],
  } as Partial<Record<RiderMark, P>>;
  return toScene(map[mark] ?? TACK_POINTS[mark] ?? b.hip);
}


/* ---------- Reitbahn 20 × 40 m (siehe ArenaScene) ---------- */

export const ARENA = { x: 60, y: 140, m: 17 };

/** Bahnpunkt in Metern (von der A-Seite bzw. der oberen Bande) → Szenen-Koordinaten */
export function arenaPoint(fromA: number, fromTop: number): P {
  return [ARENA.x + fromA * ARENA.m, ARENA.y + fromTop * ARENA.m];
}

/** Lage der Bahnbuchstaben in der Szene */
export const LETTER_POINTS: Record<"A" | "K" | "E" | "H" | "C" | "M" | "B" | "F" | "X", P> = {
  A: [ARENA.x - 34, ARENA.y + 10 * ARENA.m],
  C: [ARENA.x + 40 * ARENA.m + 34, ARENA.y + 10 * ARENA.m],
  K: [ARENA.x + 6 * ARENA.m, ARENA.y - 34],
  E: [ARENA.x + 20 * ARENA.m, ARENA.y - 34],
  H: [ARENA.x + 34 * ARENA.m, ARENA.y - 34],
  F: [ARENA.x + 6 * ARENA.m, ARENA.y + 20 * ARENA.m + 34],
  B: [ARENA.x + 20 * ARENA.m, ARENA.y + 20 * ARENA.m + 34],
  M: [ARENA.x + 34 * ARENA.m, ARENA.y + 20 * ARENA.m + 34],
  X: [ARENA.x + 20 * ARENA.m, ARENA.y + 10 * ARENA.m],
};
