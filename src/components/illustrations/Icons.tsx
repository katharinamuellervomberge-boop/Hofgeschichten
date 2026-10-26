import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "home"
  | "headphones"
  | "horse"
  | "puzzle"
  | "pass"
  | "play"
  | "pause"
  | "back"
  | "speaker"
  | "rewind"
  | "forward"
  | "check"
  | "star"
  | "parents"
  | "external"
  | "replay"
  | "lock"
  | "close"
  | "horseshoe"
  | "lupe"
  | "academy"
  | "barn"
  | "gift"
  | "letter";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="5" height="7" rx="2" />
      <rect x="16" y="14" width="5" height="7" rx="2" />
    </>
  ),
  horse: (
    <>
      <path d="M7 21c0-4 .5-7 2.5-9.5L8 9l2-4 1.5 2C15 7 19 10 20 15l-2.5 1.5L15 13c-.8 3-.5 5 .5 8" />
      <path d="M10 5 9.4 2.8 12 4.5" />
      <circle cx="13.4" cy="9.6" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
  puzzle: (
    <>
      <path d="M5 8h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v4H5v-4a2 2 0 1 0 0-4Z" />
    </>
  ),
  pass: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <circle cx="12" cy="11" r="3.5" />
      <path d="M9 17h6" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />,
  pause: (
    <>
      <rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    </>
  ),
  back: <path d="M15 5 8 12l7 7" />,
  speaker: (
    <>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6" />
      <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  rewind: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4.5h4.5" />
      <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="currentColor" stroke="none" fontFamily="system-ui">15</text>
    </>
  ),
  forward: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 4v4.5h-4.5" />
      <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="currentColor" stroke="none" fontFamily="system-ui">15</text>
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z" />,
  parents: (
    <>
      <circle cx="8.5" cy="7.5" r="3" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M3 20c.5-4 2.8-6 5.5-6s5 2 5.5 6" />
      <path d="M13.5 15.2c.9-.8 1.9-1.2 3-1.2 2.3 0 4 1.8 4.5 6" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  replay: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4.5h4.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  /* Reitakademie: Doktorhut mit Quaste */
  academy: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14Z" />
      <path d="M6.5 11.5v4.2c1.6 1.5 3.4 2.3 5.5 2.3s3.9-.8 5.5-2.3v-4.2" />
      <path d="M21.5 9.5v5" />
    </>
  ),
  /* Mein Hof: Scheune mit Kreuztor */
  barn: (
    <>
      <path d="M3.5 20V10l3-4.5h11l3 4.5v10Z" />
      <path d="M3.5 10h17" />
      <rect x="8.5" y="13" width="7" height="7" />
      <path d="m8.5 13 7 7M15.5 13l-7 7" />
    </>
  ),
  /* Hofpost: Briefumschlag */
  letter: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6.5L20.5 7" />
    </>
  ),
  /* Wochenpaket */
  gift: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="1.5" />
      <path d="M3 7h18v3H3ZM12 7v13" />
      <path d="M12 7c-1.5-3-5-3.5-5-1.5S10 7 12 7Zm0 0c1.5-3 5-3.5 5-1.5S14 7 12 7Z" />
    </>
  ),
  lupe: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5.5 5.5" strokeWidth={3} />
    </>
  ),
  horseshoe: (
    <>
      <path d="M6 20V11a6 6 0 0 1 12 0v9" strokeWidth={4.2} />
      <circle cx="6" cy="16" r=".9" fill="var(--paper, #fff)" stroke="none" />
      <circle cx="18" cy="16" r=".9" fill="var(--paper, #fff)" stroke="none" />
      <circle cx="6.6" cy="11" r=".9" fill="var(--paper, #fff)" stroke="none" />
      <circle cx="17.4" cy="11" r=".9" fill="var(--paper, #fff)" stroke="none" />
    </>
  ),
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
