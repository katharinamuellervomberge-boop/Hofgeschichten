/**
 * Geheimschrift der Stallmeister (Gitter- und Kreuzschrift).
 *
 *   A B C | J·K·L·      S        W·
 *   D E F | M·N·O·    T X U    X·X·Y·
 *   G H I | P·Q·R·      V        Z·
 *
 * Jedes Zeichen zeigt die Wände des Fachs, in dem der Buchstabe wohnt.
 * Im zweiten Gitter und im zweiten Kreuz kommt ein Punkt dazu.
 */

const GRID = "ABCDEFGHI";
const GRID_DOT = "JKLMNOPQR";
const CROSS = "STUV";
const CROSS_DOT = "WXYZ";

const LO = 7;
const HI = 33;
const MID = 20;

function gridPaths(i: number): string {
  const r = Math.floor(i / 3);
  const c = i % 3;
  const d: string[] = [];
  if (r > 0) d.push(`M${LO} ${LO}H${HI}`);
  if (r < 2) d.push(`M${LO} ${HI}H${HI}`);
  if (c > 0) d.push(`M${LO} ${LO}V${HI}`);
  if (c < 2) d.push(`M${HI} ${LO}V${HI}`);
  return d.join("");
}

const CROSS_PATHS = [
  `M${LO} ${LO}L${MID} ${HI - 2}L${HI} ${LO}`, // S oben: V
  `M${LO} ${LO}L${HI - 2} ${MID}L${LO} ${HI}`, // T links: >
  `M${HI} ${LO}L${LO + 2} ${MID}L${HI} ${HI}`, // U rechts: <
  `M${LO} ${HI}L${MID} ${LO + 2}L${HI} ${HI}`, // V unten: Λ
];
const CROSS_DOTS: Array<[number, number]> = [
  [MID, 13],
  [13, MID],
  [27, MID],
  [MID, 27],
];

export function isCipherLetter(ch: string): boolean {
  return /^[A-Z]$/.test(ch);
}

export function CipherGlyph({ letter, className }: { letter: string; className?: string }) {
  const L = letter.toUpperCase();
  let d = "";
  let dot: [number, number] | null = null;
  if (GRID.includes(L)) d = gridPaths(GRID.indexOf(L));
  else if (GRID_DOT.includes(L)) {
    d = gridPaths(GRID_DOT.indexOf(L));
    dot = [MID, MID];
  } else if (CROSS.includes(L)) d = CROSS_PATHS[CROSS.indexOf(L)];
  else if (CROSS_DOT.includes(L)) {
    const i = CROSS_DOT.indexOf(L);
    d = CROSS_PATHS[i];
    dot = CROSS_DOTS[i];
  }
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" strokeLinejoin="miter" />
      {dot && <circle cx={dot[0]} cy={dot[1]} r="2.8" fill="currentColor" />}
    </svg>
  );
}
