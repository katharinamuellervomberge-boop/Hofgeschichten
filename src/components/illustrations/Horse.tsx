import type { HorseLook } from "@/content/types";

type Props = {
  look: HorseLook;
  /** Eindeutiger Präfix für SVG-IDs (z. B. der Slug) */
  uid: string;
  flip?: boolean;
  title?: string;
  className?: string;
  /** Position innerhalb einer größeren SVG-Szene */
  box?: { x: number; y: number; width: number; height?: number };
};

/* Körperformen in Seitenansicht – realistische Proportionen:
   Widerristhöhe ≈ Rumpflänge, Beine ≈ halbe Höhe, Kopf ≈ ⅓ Rumpf. */
export const BODY =
  "M108,120 C120,104 160,102 195,114 C215,120 235,114 252,104 C268,92 288,70 306,52 C312,46 322,46 328,52 C340,64 356,94 368,116 C374,128 370,140 358,142 C350,143 344,140 340,134 C334,130 326,128 318,122 C308,116 304,110 302,106 C296,122 296,140 293,156 C290,172 286,182 276,190 C266,196 256,198 244,196 C210,200 168,200 140,196 C126,196 112,190 104,176 C98,160 98,136 108,120 Z";
export const FRONT_LEG =
  "M266,186 C262,206 260,226 258,246 C258,262 258,274 258,284 C259,290 263,294 268,298 L248,298 C245,292 244,288 244,284 C244,272 244,260 245,248 C244,228 240,208 236,192 Z";
export const HIND_LEG =
  "M150,186 C152,212 140,230 130,244 C128,256 130,270 130,284 C131,290 136,294 140,298 L119,298 C117,292 116,288 116,284 C115,268 114,256 110,248 C104,240 104,226 104,210 C104,196 106,186 108,178 Z";
const FRONT_SOCK = "M244,268 L258,268 L258,284 C259,290 263,294 268,298 L248,298 C245,292 244,288 244,284 Z";
const HIND_SOCK = "M116,268 L130,268 L130,284 C131,290 136,294 140,298 L119,298 C117,292 116,288 116,284 Z";
export const TAIL = "M106,126 C84,142 78,196 86,244 C92,256 100,244 100,226 C102,200 104,172 114,152 Z";
export const MANE =
  "M250,108 C266,92 286,68 304,50 C312,44 318,46 320,50 C314,54 312,58 314,64 C306,72 300,84 292,96 C280,108 264,112 250,112 Z";
export const FORELOCK = "M322,50 C330,52 334,58 332,68 C328,62 324,58 318,56 Z";
export const EAR = "M310,54 L313,32 C318,36 322,42 323,50 Z";
export const BLAZE =
  "M332,58 C337,64 343,76 349,90 C354,101 360,110 363,118 C360,120 357,119 355,117 C349,105 343,93 339,82 C336,72 333,64 332,58 Z";
export const STAR = "M343,60 l3,6 6,1 -5,4 1,6 -5,-3 -5,3 1,-6 -5,-4 6,-1 Z";

const DAPPLES: Array<[number, number, number]> = [
  [140, 135, 9], [165, 128, 7], [190, 140, 10], [215, 132, 8], [160, 160, 8],
  [235, 150, 9], [128, 160, 7], [205, 165, 7], [255, 130, 7], [180, 175, 6],
  [270, 155, 6], [145, 182, 6], [225, 178, 6],
];

const HOOF = (x: number) => `M${x},298 L${x + 20},298 L${x + 23},305 L${x - 2},305 Z`;

export function Horse({ look, uid, flip, title, className, box }: Props) {
  const socks = new Set(look.socks ?? []);
  const id = `hg-${uid.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox="70 20 320 292"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={flip && !box ? { transform: "scaleX(-1)" } : undefined}
      x={box?.x}
      y={box?.y}
      width={box?.width}
      height={box ? (box.height ?? (box.width * 292) / 320) : undefined}
    >
      <defs>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-body`}>
          <path d={BODY} />
        </clipPath>
        {/* Unterbeine (für schwarze Beine beim Braunen oder weiße Beine beim Schecken) */}
        <clipPath id={`${id}-lower`} clipPathUnits="userSpaceOnUse">
          <rect x="60" y="238" width="340" height="70" />
        </clipPath>
      </defs>

      {/* Bodenschatten */}
      <ellipse cx="195" cy="305" rx="118" ry="6" fill="#80634D" opacity="0.2" />

      {/* entfernte Beine */}
      <g transform="translate(14,0)">
        <path d={FRONT_LEG} fill={look.coatShade} />
        {look.points && <path d={FRONT_LEG} fill={look.points} clipPath={`url(#${id}-lower)`} opacity="0.85" />}
        {socks.has("frontFar") && <path d={FRONT_SOCK} fill="#EDE8DF" />}
        <path d={HOOF(248)} fill={look.hoof} />
      </g>
      <g transform="translate(16,0)">
        <path d={HIND_LEG} fill={look.coatShade} />
        {look.points && <path d={HIND_LEG} fill={look.points} clipPath={`url(#${id}-lower)`} opacity="0.85" />}
        {socks.has("hindFar") && <path d={HIND_SOCK} fill="#EDE8DF" />}
        <path d={HOOF(119)} fill={look.hoof} />
      </g>

      <path d={TAIL} fill={look.mane} />
      {look.maneLight && (
        <path d="M100,150 C92,180 90,212 94,236" fill="none" stroke={look.maneLight} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      )}

      {/* Rumpf & nahe Beine */}
      <path d={BODY} fill={look.coat} />
      <path d={FRONT_LEG} fill={look.coat} />
      <path d={HIND_LEG} fill={look.coat} />
      {look.points && (
        <g clipPath={`url(#${id}-lower)`}>
          <path d={FRONT_LEG} fill={look.points} />
          <path d={HIND_LEG} fill={look.points} />
        </g>
      )}
      {socks.has("frontNear") && <path d={FRONT_SOCK} fill="#F7F3EC" />}
      {socks.has("hindNear") && <path d={HIND_SOCK} fill="#F7F3EC" />}
      <path d={HOOF(248)} fill={look.hoof} />
      <path d={HOOF(119)} fill={look.hoof} />

      <g clipPath={`url(#${id}-body)`}>
        {look.pinto && (
          <g fill="#F3EEE4">
            {/* großer weißer Rumpf mit farbigen Platten auf Rücken und Kruppe (wie bei Tivoli) */}
            <path d="M150,112 C170,104 200,112 214,116 C224,140 238,150 252,148 C262,160 266,178 262,200 L140,200 C146,186 150,170 146,156 C142,140 142,124 150,112 Z" />
            <path d="M258,104 C272,92 288,76 300,62 L310,70 C300,86 290,98 278,110 C270,114 262,112 258,104 Z" />
          </g>
        )}
        {look.dapples &&
          DAPPLES.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff" opacity="0.28" />
          ))}
        <rect x="70" y="20" width="320" height="200" fill={`url(#${id}-light)`} />
        <rect x="70" y="20" width="320" height="200" fill={`url(#${id}-shade)`} />
      </g>

      {/* Muskel-Andeutungen: Schulter, Hinterhand, Ganasche */}
      <g fill="none" stroke={look.coatShade} strokeWidth="2" strokeLinecap="round" opacity="0.35">
        <path d="M262,122 C276,138 278,160 270,182" />
        <path d="M150,124 C160,140 158,166 146,186" />
        <path d="M318,120 C312,104 316,92 330,92" />
      </g>

      <path d={MANE} fill={look.maneLight ?? look.mane} />
      {look.maneLight && (
        <path d="M252,108 C268,94 288,70 304,52" fill="none" stroke={look.mane} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      )}
      <path d={EAR} fill={look.coat} />
      <path d="M313,38 L315,48 L320,48 Z" fill={look.coatShade} />
      <path d={FORELOCK} fill={look.mane} />

      {look.face === "blaze" && <path d={BLAZE} fill="#F7F3EC" />}
      {look.face === "star" && <path d={STAR} fill="#F7F3EC" />}

      {/* Auge mit Wimpernbogen */}
      <circle cx="330" cy="78" r="3.8" fill="#1A120D" />
      <circle cx="331.3" cy="76.8" r="1.1" fill="#fff" opacity="0.85" />
      <path d="M325,74 C328,71 333,71 336,73" fill="none" stroke="#1A120D" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      {/* Nüster & Maul */}
      <path d="M359,121 C361,118 365,119 365,123" fill="none" stroke="#2B1D16" strokeWidth="2" strokeLinecap="round" />
      <path d="M346,136 C350,138 354,138 358,137" fill="none" stroke="#2B1D16" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
