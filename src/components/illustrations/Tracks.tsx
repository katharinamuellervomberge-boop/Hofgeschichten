import type { ReactNode } from "react";
/** Spurenabdrücke im Matsch – für das Spuren-Vergleichen. */

export type TrackName = "hufeisen" | "barhuf" | "hund" | "katze" | "gummistiefel" | "reitstiefel";

const MUD = "#9A7A5C";
const PRINT = "#5E4636";

function Toe({ x, y, r }: { x: number; y: number; r: number }) {
  return <ellipse cx={x} cy={y} rx={r} ry={r * 1.2} fill={PRINT} />;
}

const tracks: Record<TrackName, ReactNode> = {
  hufeisen: (
    <>
      <path d="M30 86V52a20 22 0 0 1 40 0v34h-11V54a9 10 0 0 0-18 0v32Z" fill={PRINT} />
      {[[35, 78], [35, 64], [38, 50], [65, 78], [65, 64], [62, 50]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill={MUD} />
      ))}
    </>
  ),
  barhuf: (
    <>
      <path d="M28 84c-4-24 2-46 22-46s26 22 22 46c-6 4-14 6-22 6s-16-2-22-6Z" fill={PRINT} />
      <path d="M50 46l-8 34h16Z" fill={MUD} opacity=".8" />
    </>
  ),
  hund: (
    <>
      <path d="M50 58c-12 0-20 10-18 20 1 6 8 8 18 8s17-2 18-8c2-10-6-20-18-20Z" fill={PRINT} />
      <Toe x={30} y={46} r={6} />
      <Toe x={43} y={36} r={6.5} />
      <Toe x={57} y={36} r={6.5} />
      <Toe x={70} y={46} r={6} />
      {/* Krallen */}
      <path d="M28 36l-2-6M42 26l-1-6M58 26l1-6M72 36l2-6" stroke={PRINT} strokeWidth="3.2" strokeLinecap="round" />
    </>
  ),
  katze: (
    <>
      <path d="M50 60c-10 0-17 8-16 16 1 6 7 8 16 8s15-2 16-8c1-8-6-16-16-16Z" fill={PRINT} />
      <Toe x={33} y={50} r={5} />
      <Toe x={44} y={40} r={5.5} />
      <Toe x={56} y={40} r={5.5} />
      <Toe x={67} y={50} r={5} />
    </>
  ),
  reitstiefel: (
    <>
      {/* lange, glatte Sohle mit getrenntem Absatz */}
      <path d="M38 8c12-2 22 4 22 18 0 10-3 18-3 28 0 6-2 10-6 12H40c-4-2-6-6-6-12 0-10-2-18-2-28 0-10 2-17 6-18Z" fill={PRINT} />
      <rect x="37" y="72" width="20" height="18" rx="4" fill={PRINT} />
    </>
  ),
  gummistiefel: (
    <g transform="translate(13 12) scale(.74)">
      <path d="M38 14c10-2 22 2 24 14 1 10-2 20-2 30 0 8 4 14 4 22 0 8-8 12-16 12s-14-6-14-14c0-10 4-16 2-26-2-12-8-36 2-38Z" fill={PRINT} />
      <path d="M40 24h18M38 34h20M40 44h18M44 70h14M44 80h14" stroke={MUD} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
};

export function Track({ track, className, title }: { track: TrackName; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title ?? "Spur"}>
      <circle cx="50" cy="50" r="48" fill={MUD} />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#80634D" strokeWidth="2" />
      <g opacity=".95">{tracks[track]}</g>
    </svg>
  );
}

export function isTrackName(n: string): n is TrackName {
  return n in tracks;
}
