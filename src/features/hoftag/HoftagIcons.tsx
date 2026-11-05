import type { ReactNode } from "react";
import type { StatKey, TimeOfDay } from "@/content/hoftag/types";

/**
 * Eigene Symbole für „Mein Tag am Hof“ – im Strich der Hofgeschichten-Icons
 * (24er Raster, runde Enden), mit einer zarten Füllung in der Markenpalette.
 */

export const STAT_COLOR: Record<StatKey, string> = {
  wohl: "#A4573A",
  wasser: "#5F8A96",
  futter: "#B8893F",
  pflege: "#5E7360",
  bewegung: "#80634D",
  vertrauen: "#344638",
};

export const STAT_LABEL: Record<StatKey, string> = {
  wohl: "Wohlbefinden",
  wasser: "Wasser",
  futter: "Futter",
  pflege: "Pflege",
  bewegung: "Bewegung",
  vertrauen: "Vertrauen",
};

const STAT_PATHS: Record<StatKey, ReactNode> = {
  // Herz mit kleiner Hufeisen-Kerbe
  wohl: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10C19.5 15.4 12 20 12 20Z" fill="currentColor" fillOpacity=".18" />
      <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10C19.5 15.4 12 20 12 20Z" />
    </>
  ),
  // Tropfen
  wasser: (
    <>
      <path d="M12 3.5c3.2 4 5.5 7.2 5.5 10.2a5.5 5.5 0 0 1-11 0c0-3 2.3-6.2 5.5-10.2Z" fill="currentColor" fillOpacity=".18" />
      <path d="M12 3.5c3.2 4 5.5 7.2 5.5 10.2a5.5 5.5 0 0 1-11 0c0-3 2.3-6.2 5.5-10.2Z" />
      <path d="M9.4 14.2a2.7 2.7 0 0 0 2.2 2.6" />
    </>
  ),
  // Heubündel mit Band
  futter: (
    <>
      <path d="M6 20c1-5 1.5-10 0-15M10 20.5c.5-6 .5-11-.5-16.5M14 20.5c-.5-6-.5-11 .5-16.5M18 20c-1-5-1.5-10 0-15" />
      <path d="M5 11.5h14" strokeWidth="2.6" stroke="currentColor" opacity=".55" />
    </>
  ),
  // Bürste mit Funkeln
  pflege: (
    <>
      <rect x="4" y="11" width="12" height="5" rx="2.5" fill="currentColor" fillOpacity=".18" />
      <rect x="4" y="11" width="12" height="5" rx="2.5" />
      <path d="M6 16v3M9 16v3M12 16v3M15 16v2.5" />
      <path d="M18.5 4v4M16.5 6h4M20 10.5v2M19 11.5h2" />
    </>
  ),
  // Hufabdruck in Bewegung
  bewegung: (
    <>
      <path d="M9 19.5c-2.6 0-4.5-2.3-4.5-5.6S7.3 7 11 7s6.5 3.6 6.5 6.9-1.9 5.6-4.5 5.6v-3.2a2 2 0 0 0-4 0Z" fill="currentColor" fillOpacity=".18" />
      <path d="M9 19.5c-2.6 0-4.5-2.3-4.5-5.6S7.3 7 11 7s6.5 3.6 6.5 6.9-1.9 5.6-4.5 5.6v-3.2a2 2 0 0 0-4 0Z" />
      <path d="M2.5 5.5h4M1.5 9h3M17 4.5h4.5" />
    </>
  ),
  // Hand und Nüstern: Vertrauen
  vertrauen: (
    <>
      <path d="M4 14.5c2.5-.3 4.4.4 6 1.8l2.5 2.2c.9.8 2.4.1 2.2-1.2" />
      <path d="M4 19h5.5c1.9 0 3.4-.4 5-1.4l3.6-2.4c1-.7.6-2.3-.7-2.3-.9 0-2 .5-3 1.1" />
      <path d="M13 10c-1.3-2.8-.6-5.4 1.6-6.4 2.4-1 4.7.3 5.6 2.6.7 1.8.4 3.6-.7 4.8" fill="currentColor" fillOpacity=".18" />
      <path d="M16 7.4h.01M18.3 8.6h.01" strokeWidth="2.4" />
    </>
  ),
};

export function StatIcon({ stat, className, size = 24 }: { stat: StatKey; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ color: STAT_COLOR[stat] }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {STAT_PATHS[stat]}
    </svg>
  );
}

/* ---------- Tageszeiten ---------- */

const TIME_PATHS: Record<TimeOfDay, ReactNode> = {
  morgen: (
    <>
      <path d="M3 17h18" />
      <path d="M7 17a5 5 0 0 1 10 0" fill="#E9B872" fillOpacity=".55" />
      <path d="M12 6.5v2.5M5.6 10.2l1.7 1.6M18.4 10.2l-1.7 1.6" />
      <path d="M6 20.5h12" opacity=".5" />
    </>
  ),
  vormittag: (
    <>
      <circle cx="12" cy="12" r="4" fill="#E9B872" fillOpacity=".6" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />
    </>
  ),
  mittag: (
    <>
      <circle cx="10" cy="9" r="3.6" fill="#E9B872" fillOpacity=".6" />
      <path d="M10 2.8v1.6M4 9H2.6M5.6 4.6l1 1M14.4 4.6l-1 1" />
      <path d="M8 19.5h9.5a3.5 3.5 0 0 0 .3-7 4.6 4.6 0 0 0-8.7 1.2A2.9 2.9 0 0 0 8 19.5Z" fill="#FBF8F1" />
    </>
  ),
  nachmittag: (
    <>
      <path d="M3 17h18" />
      <circle cx="12" cy="12.5" r="4" fill="#D9803E" fillOpacity=".5" />
      <path d="M12 4.5v2M5 8l1.5 1.3M19 8l-1.5 1.3" />
      <path d="M5 20.5h14" opacity=".5" />
    </>
  ),
  abend: (
    <>
      <path d="M17.5 15.2A7 7 0 0 1 9 5.5a7 7 0 1 0 8.5 9.7Z" fill="#E8DCC4" fillOpacity=".8" />
      <path d="M16.5 4.5v2.4M15.3 5.7h2.4M20 9.5v1.6M19.2 10.3h1.6" />
    </>
  ),
};

export function TimeIcon({ time, className, size = 26 }: { time: TimeOfDay; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {TIME_PATHS[time]}
    </svg>
  );
}

/* ---------- Bedien-Symbole ---------- */

export type UiIconName = "map" | "book" | "medal" | "arrow" | "bulb" | "paw" | "sparkle" | "retry";

const UI_PATHS: Record<UiIconName, ReactNode> = {
  map: (
    <>
      <path d="M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2Z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5C6.5 4.3 9.5 4.3 12 6c2.5-1.7 5.5-1.7 8-.5v13c-2.5-1.2-5.5-1.2-8 .5-2.5-1.7-5.5-1.7-8-.5Z" />
      <path d="M12 6v13" />
    </>
  ),
  medal: (
    <>
      <path d="M8 3.5h3l1.5 5M16 3.5h-3l-1 3.5" />
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="m12 11.6 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3Z" />
    </>
  ),
  arrow: <path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" />,
  bulb: (
    <>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M12 3.5a5.5 5.5 0 0 0-3.2 10c.7.5 1.2 1.3 1.2 2.2v.3h4v-.3c0-.9.5-1.7 1.2-2.2A5.5 5.5 0 0 0 12 3.5Z" />
    </>
  ),
  paw: (
    <>
      <path d="M12 13c-2.8 0-5 2.6-5 4.6 0 1.6 1.6 2.4 3 1.9.8-.3 1.3-.5 2-.5s1.2.2 2 .5c1.4.5 3-.3 3-1.9 0-2-2.2-4.6-5-4.6Z" />
      <circle cx="7" cy="9.5" r="1.8" />
      <circle cx="10.3" cy="6" r="1.8" />
      <circle cx="13.7" cy="6" r="1.8" />
      <circle cx="17" cy="9.5" r="1.8" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5Z" />
      <path d="M18.5 16v4M16.5 18h4" />
    </>
  ),
  retry: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4v4h4" />
    </>
  ),
};

export function UiIcon({ name, className, size }: { name: UiIconName; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {UI_PATHS[name]}
    </svg>
  );
}
