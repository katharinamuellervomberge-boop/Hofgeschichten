/**
 * Gemeinsame Geometrie für Inhalte und Szenen (Szene = 800 × 500).
 * Das Pferd (components/illustrations/Horse.tsx, viewBox 70 20 320 292) steht
 * in Szenen mit Pferd immer an derselben Stelle – so passen Tipp-Ziele und Bild zusammen.
 */
export const SCENE_W = 800;
export const SCENE_H = 500;

export const HORSE_BOX = { x: 220, y: 118, width: 400 } as const;
const SCALE = HORSE_BOX.width / 320;

/** Punkt am Pferd (Koordinaten aus Horse.tsx) → Punkt in der Szene */
export function hp(hx: number, hy: number): { x: number; y: number } {
  return { x: Math.round(HORSE_BOX.x + (hx - 70) * SCALE), y: Math.round(HORSE_BOX.y + (hy - 20) * SCALE) };
}

/** Wichtige Stellen am Pferd */
export const HORSE_POINTS = {
  auge: hp(330, 78),
  nuestern: hp(360, 122),
  fell: hp(200, 150),
  schulter: hp(268, 150),
  maehne: hp(285, 82),
  schweif: hp(92, 196),
  vorderbein: hp(252, 236),
  hinterbein: hp(124, 246),
  vorderhuf: hp(258, 300),
  hinterhuf: hp(129, 300),
  vorderhufFern: hp(272, 300),
  hinterhufFern: hp(145, 300),
} as const;
