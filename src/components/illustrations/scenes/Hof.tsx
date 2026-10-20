import { Puppy } from "../Puppy";

/** Hofplatz nach dem Regen – Spuren führen in verschiedene Richtungen (viewBox 0 0 800 600). */
export function HofScene({ className }: { className?: string }) {
  const boot = (x: number, y: number, rot: number, k: string) => (
    <g key={k} transform={`translate(${x} ${y}) rotate(${rot}) scale(.8)`} fill="#4A3426" opacity=".85">
      <path d="M-6 -22c8-2 14 4 14 12 0 6-2 10-2 14H-8c0-4-2-8-2-14 0-6 0-11 4-12Z" />
      <rect x="-7" y="8" width="13" height="10" rx="3" />
    </g>
  );
  const hoof = (x: number, y: number, k: string) => (
    <path key={k} d={`M${x - 10} ${y + 10}v-8a10 11 0 0 1 20 0v8h-6v-8a4 4 0 0 0-8 0v8Z`} fill="#4A3426" opacity=".8" />
  );
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Der Hofplatz">
      <defs>
        <linearGradient id="hof-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4E0CF" />
          <stop offset="1" stopColor="#F1EBDC" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#hof-sky)" />
      {/* Hügel und Nebel hinten */}
      <path d="M0 230c140-40 300-20 420-30s260-30 380 0v80H0Z" fill="#B8C1A4" />
      <path d="M0 250c200-20 420 10 800-10v40H0Z" fill="#F5F0E5" opacity=".7" />

      {/* Stall links */}
      <path d="M0 330V170l120-70 120 70v160Z" fill="#9A6A4C" />
      <path d="M-10 178 120 92l130 86-10 10L120 110 0 190Z" fill="#344638" />
      <path d="M90 330v-90c0-20 60-20 60 0v90Z" fill="#5E4636" />
      <path d="M90 244l60 80M150 244l-60 80" stroke="#C4AC84" strokeWidth="5" />
      <rect x="40" y="200" width="36" height="30" fill="#E8E6D8" stroke="#5E4636" strokeWidth="4" />

      {/* Misthaufen Mitte */}
      <path d="M440 340c10-50 60-70 100-60 30 6 50 30 50 60Z" fill="#8C6A4E" />
      <path d="M470 320c10-20 30-26 50-24M500 300c10-10 26-12 40-6" stroke="#6A4F39" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M470 300l-30-60M440 240l-10-12 18 4" stroke="#80634D" strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="440" y="338" width="150" height="10" fill="#6A4F39" />

      {/* Weidetor rechts mit Nebelweide dahinter */}
      <path d="M640 330c40-30 120-40 160-30v30Z" fill="#AFBA97" />
      <path d="M630 300c60-20 120-10 170-14v20c-60 4-120 0-170 10Z" fill="#FBF8F1" opacity=".75" />
      <g stroke="#80634D" strokeLinecap="round">
        <path d="M630 210v130M790 210v130" strokeWidth="12" />
        <path d="M636 236h148M636 272h148M636 308h148M636 308l148-72" strokeWidth="7" stroke="#C4AC84" />
      </g>
      <circle cx="626" cy="250" r="6" fill="#9A9893" />

      {/* matschiger Boden */}
      <path d="M0 330h800v270H0Z" fill="#A98B6D" />
      <path d="M0 360c200-10 500 10 800-6v26c-300 16-600 0-800 8Z" fill="#9A7A5C" opacity=".6" />
      <ellipse cx="310" cy="470" rx="120" ry="26" fill="#8FA3AC" opacity=".55" />
      <ellipse cx="610" cy="520" rx="80" ry="16" fill="#8FA3AC" opacity=".5" />

      {/* Hufspuren zum Stall */}
      {[
        [200, 560],
        [180, 510],
        [165, 460],
        [150, 410],
        [140, 365],
      ].map(([x, y], i) => hoof(x, y, `h${i}`))}

      {/* Reitstiefel-Spur zum Weidetor */}
      {[
        [90, 590, 60],
        [150, 572, 70],
        [230, 556, 70],
        [320, 540, 75],
        [410, 520, 70],
        [500, 488, 60],
        [570, 450, 50],
        [630, 410, 45],
        [680, 370, 40],
      ].map(([x, y, r], i) => boot(x, y, r + 90, `p${i}`))}

      {/* Laubhaufen am Tor – dort schnüffelt Krümel (außerhalb der Weide) */}
      <g>
        <path d="M470 470c4-30 40-44 70-40s46 20 48 40Z" fill="#C2703A" />
        <g fill="#D9803E">
          <ellipse cx="490" cy="452" rx="12" ry="7" transform="rotate(-20 490 452)" />
          <ellipse cx="530" cy="440" rx="12" ry="7" transform="rotate(15 530 440)" />
          <ellipse cx="562" cy="456" rx="11" ry="6" transform="rotate(-10 562 456)" />
        </g>
        <g fill="#B8954D">
          <ellipse cx="510" cy="462" rx="10" ry="6" transform="rotate(30 510 462)" />
          <ellipse cx="548" cy="466" rx="10" ry="6" transform="rotate(-30 548 466)" />
        </g>
        {/* Reithandschuh im Laub */}
        <path d="M520 448c0-8 4-12 10-12l14 2c4 0 6 4 4 8l-4 10h-20c-3 0-4-4-4-8Z" fill="#26342A" />
        <path d="M534 436l2-8M540 437l3-8M546 440l4-6" stroke="#26342A" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(588 372) scale(.75)">
        <Puppy />
      </g>

      {/* Kürbisse am Wegrand */}
      <g>
        <ellipse cx="370" cy="350" rx="26" ry="20" fill="#D9803E" stroke="#5E4636" strokeWidth="2.5" />
        <path d="M370 331c0-8 4-12 8-14" stroke="#4F6A47" strokeWidth="4" fill="none" />
        <ellipse cx="404" cy="358" rx="18" ry="14" fill="#E0954F" stroke="#5E4636" strokeWidth="2.5" />
      </g>
    </svg>
  );
}
