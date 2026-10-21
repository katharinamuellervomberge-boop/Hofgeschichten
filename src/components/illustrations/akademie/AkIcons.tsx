import type { ReactNode } from "react";

/** Kleine Symbole der Reitakademie (viewBox 0 0 64 64, wie die Hof-Symbole). */

const OUT = "#5E4636";

const icons = {
  "ak-stiefel": (
    <>
      <path d="M22 6h18v34c8 2 16 6 18 12v6H12V50c0-4 4-8 10-10Z" fill="#3E2C22" stroke="#2A1D16" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 52h46" stroke="#6B4A33" strokeWidth="4" />
      <path d="M12 58h10" stroke="#2A1D16" strokeWidth="4" />
    </>
  ),
  "ak-sandale": (
    <>
      <path d="M8 48c0-6 6-10 16-10h18c8 0 14 4 14 10s-6 8-14 8H20C12 56 8 54 8 48Z" fill="#D9C6A5" stroke={OUT} strokeWidth="2.5" />
      <path d="M22 40l6-10 6 10M36 40l4-8" stroke="#A4573A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M16 42c4-2 8 0 8 4" stroke="#E8AE86" strokeWidth="5" strokeLinecap="round" fill="none" />
    </>
  ),
  "ak-sprechblase": (
    <>
      <path d="M8 14c0-4 3-6 6-6h36c4 0 6 2 6 6v22c0 4-2 6-6 6H28l-12 12v-12h-2c-3 0-6-2-6-6Z" fill="#DDE3D6" stroke="#344638" strokeWidth="3" strokeLinejoin="round" />
      <path d="M18 22h28M18 31h18" stroke="#344638" strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  "ak-blitz": (
    <>
      <path d="M36 4 14 36h16l-6 24 26-34H34Z" fill="#C99A4E" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  "ak-trense": (
    <>
      <path d="M22 6c-6 10-8 22-6 36M42 6c6 10 8 22 6 36" stroke="#4E3524" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M18 12h28M14 30h36" stroke="#4E3524" strokeWidth="4" strokeLinecap="round" />
      <circle cx="16" cy="48" r="7" fill="none" stroke="#9A9893" strokeWidth="3.5" />
      <circle cx="48" cy="48" r="7" fill="none" stroke="#9A9893" strokeWidth="3.5" />
      <path d="M23 48h18" stroke="#9A9893" strokeWidth="3.5" />
    </>
  ),
  "ak-buegel": (
    <>
      <path d="M28 4h8v14h-8Z" fill="#4E3524" />
      <path d="M16 56c0-18 6-34 16-38 10 4 16 20 16 38Z" fill="none" stroke="#9A9893" strokeWidth="5" strokeLinejoin="round" />
      <path d="M14 56h36" stroke="#5E4636" strokeWidth="7" strokeLinecap="round" />
    </>
  ),
  "ak-gurt": (
    <>
      <rect x="22" y="4" width="20" height="56" rx="4" fill="#6B4A33" stroke="#4E3524" strokeWidth="2.5" />
      <rect x="18" y="12" width="28" height="12" rx="2" fill="none" stroke="#9A9893" strokeWidth="3" />
      <rect x="18" y="40" width="28" height="12" rx="2" fill="none" stroke="#9A9893" strokeWidth="3" />
    </>
  ),
  "ak-gewicht": (
    <>
      {/* Sattel mit Sitzpunkt */}
      <path d="M6 34c8 8 44 8 52 0l-4 12c-10 6-34 6-44 0Z" fill="#6B4A33" stroke="#4E3524" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 6v18" stroke="#C99A4E" strokeWidth="5" strokeLinecap="round" />
      <path d="M24 18l8 9 8-9" stroke="#C99A4E" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "ak-schenkel": (
    <>
      <path d="M20 4l10 26-4 22h-10c-2 0-2 6 0 6h22l-2-26L30 4Z" fill="#3E2C22" stroke="#2A1D16" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 30c6 2 10 6 12 12M44 40c4 2 6 4 8 8" stroke="#C99A4E" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  ),
  "ak-zuegel": (
    <>
      <path d="M4 52C18 44 28 38 34 30" stroke="#4E3524" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="30" y="12" width="20" height="30" rx="9" fill="#5E4636" stroke="#3E2C22" strokeWidth="2" />
      <path d="M32 14c4-8 14-8 16 0" stroke="#7A5C47" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M44 42c4 6 8 10 14 12" stroke="#4E3524" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  "ak-herz": (
    <path d="M32 56S6 40 6 22c0-8 6-14 13-14 6 0 10 4 13 8 3-4 7-8 13-8 7 0 13 6 13 14 0 18-26 34-26 34Z" fill="#A4573A" stroke="#7A3D28" strokeWidth="2.5" strokeLinejoin="round" />
  ),
  "ak-pause": (
    <>
      <circle cx="32" cy="32" r="26" fill="#DDE3D6" stroke="#344638" strokeWidth="3" />
      <rect x="22" y="18" width="7" height="28" rx="3" fill="#344638" />
      <rect x="35" y="18" width="7" height="28" rx="3" fill="#344638" />
    </>
  ),
  "ak-stopp": (
    <>
      <path d="M22 4h20l18 18v20L42 60H22L4 42V22Z" fill="#A4573A" stroke="#7A3D28" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 32h24" stroke="#FBF8F1" strokeWidth="7" strokeLinecap="round" />
    </>
  ),
  "ak-auge": (
    <>
      <path d="M4 32c8-14 18-20 28-20s20 6 28 20c-8 14-18 20-28 20S12 46 4 32Z" fill="#FBF8F1" stroke="#344638" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="10" fill="#5E4636" />
      <circle cx="35" cy="29" r="3" fill="#FBF8F1" />
    </>
  ),
  "ak-hand-stopp": (
    <>
      <path d="M18 58V30c0-3 2-5 4-5s4 2 4 5V12c0-3 2-5 4-5s4 2 4 5v14V10c0-3 2-5 4-5s4 2 4 5v18-12c0-3 2-5 4-5s4 2 4 5v26c0 12-8 20-18 20h-6c-3 0-6-1-6-4Z" fill="#E8AE86" stroke="#B7795A" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  "ak-schaukel": (
    <>
      {/* Wellenlinie = schwingende Bewegung */}
      <path d="M4 36c8-14 16-14 24 0s16 14 24 0 8-6 8-6" stroke="#344638" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="24" r="4" fill="#C99A4E" />
      <circle cx="40" cy="48" r="4" fill="#C99A4E" />
    </>
  ),
  "ak-wasser-pferd": (
    <>
      <path d="M8 40h48l-6 18H14Z" fill="#9FB4BE" stroke="#5E7A86" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 46c6-3 10 3 16 0s10 3 16 0" stroke="#E6EEF1" strokeWidth="3" fill="none" />
      <path d="M20 40V26c0-8 6-14 14-14l8-6 2 4-4 6c4 4 6 8 6 14v10" fill="#80634D" stroke={OUT} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type AkIconName = keyof typeof icons;

export function isAkIconName(n: string): n is AkIconName {
  return n in icons;
}

export function AkIcon({ name, className, title }: { name: AkIconName; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {icons[name]}
    </svg>
  );
}
