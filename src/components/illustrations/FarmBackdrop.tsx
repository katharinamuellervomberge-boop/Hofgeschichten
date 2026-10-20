/** Hof-Landschaft im Kinderbuchstil – Hintergrund der Startseite. */
export function FarmBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 520"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="fb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9E3CF" />
          <stop offset="0.7" stopColor="#F3ECDC" />
        </linearGradient>
        <radialGradient id="fb-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F2D7A0" />
          <stop offset="0.55" stopColor="#EBCB8C" stopOpacity="0.55" />
          <stop offset="1" stopColor="#EBCB8C" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="520" fill="url(#fb-sky)" />
      <circle cx="610" cy="110" r="120" fill="url(#fb-sun)" />
      <circle cx="610" cy="110" r="38" fill="#EFD39A" />

      {/* Wolken */}
      <g fill="#FBF8F1" opacity="0.9">
        <path d="M120,92 c8,-22 40,-24 50,-6 c14,-10 38,-2 36,16 c12,2 14,20 -2,22 h-92 c-18,0 -20,-26 8,-32 Z" />
        <path d="M430,60 c6,-14 28,-16 34,-4 c10,-6 26,0 24,12 c8,2 8,14 -2,14 h-62 c-12,0 -12,-18 6,-22 Z" />
      </g>

      {/* Vögel */}
      <g fill="none" stroke="#5E7360" strokeWidth="2.2" strokeLinecap="round">
        <path d="M300,120 q7,-7 14,0 q7,-7 14,0" />
        <path d="M338,98 q5,-5 10,0 q5,-5 10,0" />
      </g>

      {/* ferne Hügel */}
      <path d="M0,270 C120,220 220,236 320,250 C430,266 520,214 640,220 C720,224 770,240 800,250 V520 H0 Z" fill="#C7CDB4" />
      <path d="M0,300 C140,262 260,286 380,280 C500,274 600,252 800,282 V520 H0 Z" fill="#AFBA97" />

      {/* Bäume links */}
      <g>
        <rect x="70" y="214" width="10" height="70" rx="4" fill="#6B5240" />
        <ellipse cx="75" cy="200" rx="44" ry="52" fill="#5E7360" />
        <ellipse cx="60" cy="214" rx="26" ry="30" fill="#536855" />
        <rect x="140" y="236" width="8" height="54" rx="4" fill="#6B5240" />
        <ellipse cx="144" cy="226" rx="30" ry="38" fill="#6E8268" />
      </g>

      {/* Stall / Hof */}
      <g>
        <path d="M520,300 V214 L598,160 L676,214 V300 Z" fill="#9A6A4C" />
        <path d="M506,222 L598,150 L690,222 L680,230 L598,166 L516,230 Z" fill="#344638" />
        <path d="M520,214 L598,160 L676,214" fill="none" stroke="#26342A" strokeWidth="3" />
        {/* Holzlatten */}
        <g stroke="#80634D" strokeWidth="2" opacity="0.6">
          <path d="M540,226 V300 M560,212 V300 M580,200 V300 M616,200 V300 M636,212 V300 M656,226 V300" />
        </g>
        {/* Tor */}
        <path d="M576,300 V246 C576,232 620,232 620,246 V300 Z" fill="#5E4636" />
        <path d="M576,250 L620,296 M620,250 L576,296" stroke="#C4AC84" strokeWidth="3" />
        <path d="M576,300 V246 C576,232 620,232 620,246 V300" fill="none" stroke="#C4AC84" strokeWidth="3" />
        {/* Heuluke */}
        <rect x="586" y="188" width="24" height="22" rx="3" fill="#5E4636" />
        <path d="M588,206 c6,-6 14,-6 20,0 v4 h-20 Z" fill="#D9B86A" />
        {/* Wetterhahn: Pferdekopf */}
        <path d="M598,150 V128" stroke="#26342A" strokeWidth="2.5" />
        <path d="M592,128 C594,118 604,116 608,122 L612,128 L606,128 L604,125 L600,130 Z" fill="#26342A" />
      </g>

      {/* Heuballen */}
      <g>
        <rect x="690" y="276" width="56" height="34" rx="14" fill="#D9B86A" />
        <path d="M700,284 h36 M698,294 h40 M702,304 h32" stroke="#B8954D" strokeWidth="2" />
        <rect x="724" y="250" width="46" height="30" rx="12" fill="#E3C47A" />
        <path d="M732,258 h30 M730,268 h34" stroke="#B8954D" strokeWidth="2" />
      </g>

      {/* Weide */}
      <path d="M0,320 C160,296 300,312 420,306 C560,300 680,296 800,312 V520 H0 Z" fill="#9FAE8A" />
      <path d="M0,380 C180,356 360,372 520,366 C640,362 720,360 800,368 V520 H0 Z" fill="#8FA07A" opacity="0.8" />

      {/* Weg */}
      <path d="M560,316 C540,360 470,410 380,520 H470 C520,440 590,370 600,316 Z" fill="#D9C6A5" opacity="0.9" />

      {/* Zaun */}
      <g stroke="#80634D" strokeLinecap="round">
        <path d="M0,348 C120,340 240,338 360,342" strokeWidth="5" fill="none" />
        <path d="M0,370 C120,362 240,360 360,364" strokeWidth="5" fill="none" />
        {[14, 76, 138, 200, 262, 324].map((x) => (
          <path key={x} d={`M${x},332 V388`} strokeWidth="9" />
        ))}
      </g>

      {/* Grasbüschel & Blumen */}
      <g fill="none" stroke="#6E8268" strokeWidth="2.5" strokeLinecap="round">
        <path d="M60,470 l-6,-16 M64,470 l0,-20 M68,470 l6,-16" />
        <path d="M250,500 l-6,-16 M254,500 l0,-20 M258,500 l6,-16" />
        <path d="M700,480 l-6,-16 M704,480 l0,-20 M708,480 l6,-16" />
        <path d="M430,440 l-5,-12 M433,440 l0,-15 M436,440 l5,-12" />
      </g>
      <g>
        <circle cx="110" cy="440" r="4" fill="#FBF8F1" />
        <circle cx="122" cy="452" r="3.5" fill="#EFD39A" />
        <circle cx="640" cy="430" r="4" fill="#FBF8F1" />
        <circle cx="760" cy="450" r="3.5" fill="#EFD39A" />
        <circle cx="330" cy="470" r="3.5" fill="#FBF8F1" />
      </g>
    </svg>
  );
}
