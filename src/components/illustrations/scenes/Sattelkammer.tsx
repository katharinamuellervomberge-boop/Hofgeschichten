import { ItemIcon } from "../ItemIcons";

/**
 * Sattelkammer am Morgen des Kürbisfests (viewBox 0 0 800 600).
 * Hotspot-Koordinaten in content/adventures/geisterweide.
 */
export function SattelkammerScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Die Sattelkammer">
      <defs>
        <linearGradient id="sk-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B88E66" />
          <stop offset="1" stopColor="#A57D58" />
        </linearGradient>
        <linearGradient id="sk-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E7C0" stopOpacity=".55" />
          <stop offset="1" stopColor="#F7E7C0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Wand */}
      <rect width="800" height="470" fill="url(#sk-wall)" />
      <g stroke="#8C6A4E" strokeWidth="2" opacity=".55">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M0 ${50 + i * 50}H800`} />
        ))}
      </g>
      {/* Boden */}
      <rect y="470" width="800" height="130" fill="#7E5F45" />
      <g stroke="#6A4F39" strokeWidth="2">
        <path d="M0 505H800M0 545H800M0 585H800" />
      </g>

      {/* Tür links, einen Spalt offen */}
      <rect x="30" y="200" width="190" height="290" fill="#3B2A20" />
      <path d="M48 214h120v276H48Z" fill="#F2E3C4" opacity=".7" />
      <path d="M40 206l140 18v266l-140 0Z" fill="#6E4E38" stroke="#3B261B" strokeWidth="3" />
      <path d="M60 240l100 12M60 300l100 8M60 360l100 6M60 420l100 4" stroke="#5E4636" strokeWidth="3" />
      {/* offener Riegel */}
      <rect x="172" y="372" width="34" height="9" rx="3" fill="#9A9893" stroke="#4A4540" strokeWidth="2" />
      <rect x="198" y="364" width="12" height="26" rx="2" fill="#7A7873" stroke="#4A4540" strokeWidth="2" />
      {/* Türrahmen */}
      <rect x="216" y="196" width="14" height="296" fill="#5E4636" />
      {/* Fenster rechts oben mit Herbstnebel */}
      <rect x="590" y="50" width="170" height="130" rx="6" fill="#E8E6D8" stroke="#5E4636" strokeWidth="6" />
      <path d="M594 140c40-16 80-6 162-20v56H594Z" fill="#C7CDB4" />
      <circle cx="640" cy="110" r="20" fill="#D9803E" opacity=".8" />
      <path d="M640 92v-8" stroke="#4F6A47" strokeWidth="4" />
      <path d="M675 50v130M590 115h170" stroke="#5E4636" strokeWidth="5" />
      <rect x="590" y="50" width="170" height="130" fill="url(#sk-light)" />

      {/* Hakenleiste mit Namensschildern */}
      <rect x="250" y="150" width="320" height="22" rx="4" fill="#6E4E38" stroke="#3B261B" strokeWidth="2" />
      {[
        { x: 300, name: "TONGA", halter: "#A4573A" },
        { x: 410, name: "TIVOLI", halter: null },
        { x: 520, name: "SCRABBLE", halter: "#5E7360" },
      ].map((h) => (
        <g key={h.name}>
          <path d={`M${h.x} 172v22c0 10 14 10 14 0`} stroke="#4A4540" strokeWidth="5" fill="none" strokeLinecap="round" />
          <rect x={h.x - 38} y="118" width="90" height="26" rx="4" fill="#FBF8F1" stroke="#5E4636" strokeWidth="2" />
          <text x={h.x + 7} y="137" textAnchor="middle" fontSize="15" fontWeight="700" fill="#344638" fontFamily="Georgia, serif">
            {h.name}
          </text>
          {h.halter && (
            <g fill="none" stroke={h.halter} strokeWidth="7" strokeLinecap="round">
              <path d={`M${h.x - 10} 200c-14 30-10 70 14 86 22-16 28-56 14-86`} />
              <path d={`M${h.x - 12} 236h40`} />
            </g>
          )}
        </g>
      ))}
      {/* Staubrand: hier hing etwas */}
      <path d="M398 205c-12 30-8 68 14 84 20-16 26-54 14-84" fill="none" stroke="#C9A57E" strokeWidth="5" strokeDasharray="4 7" opacity=".9" />

      {/* Sattelhalter rechts */}
      {[260, 370].map((y) => (
        <g key={y}>
          <rect x="770" y={y - 6} width="30" height="16" fill="#5E4636" />
          <path d={`M600 ${y}c30-26 140-26 170 0 0 30-30 52-86 52s-84-22-84-52Z`} fill="#80634D" stroke="#5E4636" strokeWidth="3" />
          <path d={`M628 ${y + 14}c30 18 86 18 114 0`} stroke="#C4AC84" strokeWidth="2.5" fill="none" strokeDasharray="5 5" />
          <path d={`M684 ${y + 48}v40`} stroke="#5E4636" strokeWidth="4" />
          <rect x="672" y={y + 84} width="24" height="10" rx="3" fill="#9A9893" />
        </g>
      ))}

      {/* Werkzeugbrett: Umriss der Schere ist leer */}
      <g>
        <rect x="282" y="318" width="132" height="112" rx="6" fill="#C9A57E" stroke="#6E4E38" strokeWidth="3" />
        {/* Hammer */}
        <rect x="296" y="334" width="10" height="56" rx="3" fill="#80634D" />
        <rect x="288" y="330" width="26" height="12" rx="3" fill="#7A7873" />
        {/* leerer Scheren-Umriss */}
        <g fill="none" stroke="#6E4E38" strokeWidth="2.5" strokeDasharray="4 4">
          <circle cx="332" cy="398" r="9" />
          <circle cx="352" cy="398" r="9" />
          <path d="M336 390l12-46M348 390l-12-46" />
        </g>
        {/* Zange */}
        <path d="M384 334l-8 50M392 334l8 50" stroke="#5E7360" strokeWidth="6" strokeLinecap="round" />
        <circle cx="388" cy="346" r="4" fill="#7A7873" />
      </g>

      {/* Putzkiste */}
      <g>
        <rect x="560" y="462" width="124" height="70" rx="8" fill="#344638" stroke="#26342A" strokeWidth="3" />
        <path d="M576 462c0-26 92-26 92 0" stroke="#26342A" strokeWidth="6" fill="none" />
        <rect x="580" y="448" width="40" height="18" rx="6" fill="#A4573A" />
        <path d="M630 430v34" stroke="#C4AC84" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Kürbis-Deko */}
      <g transform="translate(700 500) scale(1.4)">
        <ItemIcon name="kuerbis" size={64} />
      </g>

      {/* große Reitstiefel-Abdrücke (glatte Sohle, Absatz) */}
      <g fill="#4A3426" opacity=".8">
        {[
          [250, 566, -70],
          [300, 538, -75],
          [352, 566, -70],
          [398, 540, -78],
        ].map(([x, y, rot]) => (
          <g key={`${x}`} transform={`translate(${x} ${y}) rotate(${rot})`}>
            <path d="M-6 -22c8-2 14 4 14 12 0 6-2 10-2 14H-8c0-4-2-8-2-14 0-6 0-11 4-12Z" />
            <rect x="-7" y="8" width="13" height="10" rx="3" />
          </g>
        ))}
      </g>

      {/* glitzernder Reflektor-Schnipsel */}
      <g transform="translate(450 560) rotate(-12)">
        <rect x="0" y="0" width="46" height="12" rx="2" fill="#E6E9EC" stroke="#9A9893" strokeWidth="2" />
        <path d="M6 2l4 8M16 2l4 8M26 2l4 8M36 2l4 8" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M50 -6l3 6 6 2-6 2-3 6-3-6-6-2 6-2Z" fill="#F2D7A0" />
      </g>

      {/* Garnrolle mit Faden */}
      <g transform="translate(130 540)">
        <rect x="0" y="0" width="30" height="8" rx="2" fill="#C4AC84" />
        <rect x="4" y="8" width="22" height="22" fill="#E6E9EC" />
        <path d="M4 12h22M4 17h22M4 22h22" stroke="#B8BEC4" strokeWidth="1.5" />
        <rect x="0" y="30" width="30" height="8" rx="2" fill="#C4AC84" />
        <path d="M26 20c20 4 30 14 46 10" stroke="#E6E9EC" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}
