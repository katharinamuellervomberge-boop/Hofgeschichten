import type { EarMoodRef } from "./types";

/** Einfache Stimmungssymbole – verständlich ohne Lesen. */
export function MoodIcon({ mood, className }: { mood: EarMoodRef; className?: string }) {
  const stroke = mood === "grummelig" ? "#7a3d27" : mood === "aufgeregt" ? "#8a5a12" : mood === "entspannt" ? "#5E4636" : "#26342A";
  if (mood === "neugierig")
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden style={{ color: stroke }}>
        <path d="M6 32c8-12 16-18 26-18s18 6 26 18c-8 12-16 18-26 18S14 44 6 32Z" fill="#FBF8F1" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="9" fill="currentColor" />
        <circle cx="35" cy="29" r="3" fill="#FBF8F1" />
        <path d="M32 2v6M50 8l-4 5M14 8l4 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  if (mood === "entspannt")
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden style={{ color: stroke }}>
        <path d="M8 34c8 8 40 8 48 0" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M38 8h12L38 22h12M22 14h8l-8 9h8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 48c6 4 30 4 36 0" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity=".5" />
      </svg>
    );
  if (mood === "aufgeregt")
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden style={{ color: stroke }}>
        <circle cx="32" cy="34" r="22" fill="#FBF8F1" stroke="currentColor" strokeWidth="4" />
        <circle cx="32" cy="34" r="8" fill="currentColor" />
        <path d="M32 2v6M8 10l5 5M56 10l-5 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden style={{ color: stroke }}>
      <path d="M16 36a12 12 0 0 1 2-24 16 16 0 0 1 30 2 10 10 0 0 1 0 22Z" fill="#FBF8F1" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M34 36l-8 12h10l-6 12" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
