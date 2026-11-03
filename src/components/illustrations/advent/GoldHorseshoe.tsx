import { useId } from "react";
import { GoldShoePath } from "./WinterStall";

/**
 * Goldenes Hufeisen des Adventskalenders – Belohnung für jedes abgeschlossene Türchen.
 * `empty` zeigt den noch leeren Platz (gestrichelter Umriss).
 */
export function GoldHorseshoe({ className, empty, number, title }: { className?: string; empty?: boolean; number?: number; title?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg viewBox="-26 -28 52 56" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <linearGradient id={`gh-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6DD98" />
          <stop offset=".55" stopColor="#D4A84F" />
          <stop offset="1" stopColor="#A67C2E" />
        </linearGradient>
      </defs>
      {empty ? (
        <path
          d="M-20 20V-2a20 20 0 0 1 40 0v22h-9V-2a11 11 0 0 0-22 0v22Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="3 3"
          opacity=".55"
        />
      ) : (
        <GoldShoePath fill={`url(#gh-${id})`} />
      )}
      {number !== undefined && (
        <text x="0" y="17" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="var(--font-display), serif" fill={empty ? "currentColor" : "#5E4012"} opacity={empty ? 0.6 : 1}>
          {number}
        </text>
      )}
    </svg>
  );
}
