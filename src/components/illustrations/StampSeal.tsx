import type { ReactNode } from "react";
import type { StampInfo } from "@/content/types";

const motifs: Record<StampInfo["motif"], ReactNode> = {
  headphones: (
    <g fill="none" strokeWidth="5" strokeLinecap="round">
      <path d="M34 62V54a16 16 0 0 1 32 0v8" />
      <rect x="30" y="58" width="10" height="16" rx="4" fill="currentColor" />
      <rect x="60" y="58" width="10" height="16" rx="4" fill="currentColor" />
    </g>
  ),
  star: <path d="m50 30 6 12.5 13.5 2-9.8 9.5 2.3 13.5L50 61l-12 6.5 2.3-13.5-9.8-9.5 13.5-2Z" fill="currentColor" />,
  horse: (
    <path
      d="M38 72c0-8 1-13 5-18l-3-5 4-8 3 4c7 0 15 6 17 15l-5 3-5-6c-1.6 6-1 10 1 15Z M44 41l-1.5-4.5 5 3.5"
      fill="currentColor"
    />
  ),
  carrot: (
    <g>
      <path d="M36 68c-3 3 0 6 3 4l20-20c3-3 2-9-4-9-3 0-5 2-6 4Z" fill="currentColor" />
      <path d="M57 41c1-6 6-9 9-8-1 3-5 6-8 8M58 43c5-1 9 0 9 3-3 1-7 0-9-1" fill="currentColor" />
    </g>
  ),
  cards: (
    <g fill="none" strokeWidth="4.5" strokeLinejoin="round">
      <rect x="32" y="36" width="20" height="28" rx="4" transform="rotate(-10 42 50)" />
      <rect x="48" y="36" width="20" height="28" rx="4" transform="rotate(10 58 50)" fill="currentColor" />
    </g>
  ),
  ear: (
    <g>
      <path d="M44 70c-6-14-6-28 2-40 8 10 10 26 6 40Z" fill="currentColor" />
      <path d="M58 70c-2-14 0-28 8-38 6 12 4 28-2 38Z" fill="currentColor" opacity=".7" />
    </g>
  ),
  horseshoe: (
    <path d="M36 72V52a14 14 0 0 1 28 0v20h-8V52a6 6 0 0 0-12 0v20Z" fill="currentColor" />
  ),
  brush: (
    <g>
      <rect x="30" y="40" width="40" height="14" rx="7" fill="currentColor" />
      <path d="M34 56v12M40 56v13M46 56v13M52 56v13M58 56v13M64 56v12" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  question: (
    <g fill="none" strokeWidth="7" strokeLinecap="round">
      <path d="M40 40a10 10 0 1 1 14 9c-3 2-4 4-4 8" />
      <circle cx="50" cy="68" r="2" fill="currentColor" />
    </g>
  ),
  magnifier: (
    <g fill="none" strokeWidth="6" strokeLinecap="round">
      <circle cx="46" cy="46" r="13" />
      <path d="M56 56l12 12" strokeWidth="8" />
    </g>
  ),
  pumpkin: (
    <g>
      <ellipse cx="50" cy="56" rx="22" ry="17" fill="currentColor" />
      <path d="M50 39c0-6 3-10 8-11" fill="none" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 41c-5 6-5 24 0 30M50 41c5 6 5 24 0 30" fill="none" stroke="#F5F0E5" strokeWidth="2.5" opacity=".6" />
    </g>
  ),
  footprint: (
    <g fill="currentColor">
      <path d="M44 30c8-2 14 4 14 12 0 6-2 10-2 14H42c0-4-2-8-2-14 0-6 0-11 4-12Z" />
      <rect x="42" y="60" width="14" height="11" rx="3" />
    </g>
  ),
  lock: (
    <g>
      <path d="M40 48v-6a10 10 0 0 1 20 0v6" fill="none" strokeWidth="6" />
      <rect x="34" y="47" width="32" height="24" rx="5" fill="currentColor" />
    </g>
  ),
  eye: (
    <g>
      <path d="M28 50c6-10 14-14 22-14s16 4 22 14c-6 10-14 14-22 14s-16-4-22-14Z" fill="none" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="7" fill="currentColor" />
    </g>
  ),
  /* ---------- Reitakademie ---------- */
  helmet: (
    <g>
      <path d="M30 60c0-16 9-26 20-26s20 10 20 24v2Z" fill="currentColor" />
      <path d="M68 58c5 0 9 2 12 5H66" fill="currentColor" />
      <path d="M40 62c2 6 6 9 10 9" fill="none" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  seat: (
    <g fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="30" r="6" fill="currentColor" stroke="none" />
      <path d="M50 38v18l8 12M50 56l-6 14" />
      <path d="M32 58c8 6 28 6 36 0" />
    </g>
  ),
  signals: (
    <g fill="none" strokeWidth="5" strokeLinecap="round">
      <path d="M36 40c-6 6-6 14 0 20M64 40c6 6 6 14 0 20" />
      <path d="M28 32c-12 12-12 24 0 36M72 32c12 12 12 24 0 36" opacity=".6" />
      <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
    </g>
  ),
  walk: (
    <g fill="currentColor">
      <circle cx="32" cy="50" r="6" />
      <circle cx="44" cy="50" r="6" />
      <circle cx="56" cy="50" r="6" />
      <circle cx="68" cy="50" r="6" />
    </g>
  ),
  trot: (
    <g fill="currentColor">
      <circle cx="36" cy="38" r="7" />
      <circle cx="64" cy="62" r="7" />
      <circle cx="64" cy="38" r="7" opacity=".55" />
      <circle cx="36" cy="62" r="7" opacity=".55" />
      <path d="M36 38 64 62" fill="none" strokeWidth="3" strokeDasharray="3 4" />
    </g>
  ),
  canter: (
    <g>
      <path d="M28 60c8-20 36-20 44 0" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 6" />
      <circle cx="32" cy="58" r="6" fill="currentColor" />
      <circle cx="50" cy="44" r="6" fill="currentColor" />
      <circle cx="68" cy="58" r="6" fill="currentColor" />
    </g>
  ),
  arena: (
    <g fill="none" strokeWidth="4.5" strokeLinejoin="round">
      <rect x="26" y="34" width="48" height="32" rx="3" />
      <circle cx="40" cy="50" r="10" />
      <path d="M56 50h12" strokeLinecap="round" />
    </g>
  ),
  dressage: (
    <g fill="none" strokeWidth="4" strokeLinecap="round">
      <path d="M28 66 72 34" strokeDasharray="2 7" />
      <path d="M28 56 62 32" />
      <path d="M38 68 72 44" />
    </g>
  ),
  jump: (
    <g>
      <path d="M26 66V46M74 66V46" fill="none" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M26 52h48" fill="none" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 44c10-22 46-22 56 0" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 6" />
    </g>
  ),
  heart: <path d="M50 70S30 58 30 44c0-6 4-11 10-11 5 0 8 3 10 6 2-3 5-6 10-6 6 0 10 5 10 11 0 14-20 26-20 26Z" fill="currentColor" />,
  rosette: (
    <g>
      <path d="M44 60l-6 18 7-4 4 7 4-15M56 60l6 18-7-4-4 7-4-15" fill="currentColor" />
      <circle cx="50" cy="46" r="17" fill="currentColor" />
      <circle cx="50" cy="46" r="9" fill="none" stroke="#F5F0E5" strokeWidth="2.5" opacity=".7" />
    </g>
  ),
};

type Props = {
  stamp: StampInfo;
  earned: boolean;
  className?: string;
  /** leichte Drehung wie echt gestempelt */
  tilt?: number;
};

/** Runder Stempel im Abenteuerpass. Nicht verdient = gestrichelter Umriss. */
export function StampSeal({ stamp, earned, className, tilt = 0 }: Props) {
  const color = earned ? (stamp.motif === "horseshoe" || stamp.motif === "rosette" ? "#A4573A" : stamp.academy ? "#80634D" : "#344638") : "#C4AC84";
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ color, transform: `rotate(${earned ? tilt : 0}deg)` }}
      aria-hidden
    >
      {earned ? (
        <>
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 3" />
          <g stroke="currentColor">{motifs[stamp.motif]}</g>
          {/* leicht ungleichmäßiger Druck */}
          <circle cx="50" cy="50" r="46" fill="#F5F0E5" opacity=".12" />
        </>
      ) : (
        <>
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="7 7" />
          <g stroke="currentColor" opacity=".55">{motifs[stamp.motif]}</g>
        </>
      )}
    </svg>
  );
}
