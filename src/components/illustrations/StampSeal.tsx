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
  const color = earned ? (stamp.motif === "horseshoe" ? "#A4573A" : "#344638") : "#C4AC84";
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
