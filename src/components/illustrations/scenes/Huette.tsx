import { ItemIcon } from "../ItemIcons";

/**
 * Vor der Weidehütte: Zahlenschloss, Rätselzettel, Dinge zum Zählen
 * (4 Kürbisse, 2 Hufeisen, 5 Äpfel). viewBox 0 0 800 600.
 */
export function HuetteScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Vor der Weidehütte">
      <rect width="800" height="600" fill="#E4E2D3" />
      {/* Hüttenwand */}
      <rect x="150" y="40" width="500" height="460" fill="#9A6A4C" />
      <g stroke="#80634D" strokeWidth="3">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${175 + i * 50} 40V500`} />
        ))}
      </g>
      <path d="M120 60 400 -40 680 60Z" fill="#344638" />
      {/* Tür */}
      <rect x="320" y="170" width="160" height="320" fill="#5E4636" stroke="#3B261B" strokeWidth="4" />
      <path d="M330 200h140M330 330h140M330 460h140" stroke="#4A3426" strokeWidth="4" />
      {/* Spalt unter der Tür mit Pfotenspuren */}
      <rect x="326" y="486" width="148" height="10" fill="#1F1611" />
      {/* Zahlenschloss */}
      <g>
        <path d="M444 318v-22a16 16 0 0 1 32 0v22" fill="none" stroke="#7A7873" strokeWidth="7" />
        <rect x="432" y="316" width="56" height="52" rx="8" fill="#C9A15E" stroke="#6E5530" strokeWidth="3" />
        {[442, 456, 470].map((x) => (
          <rect key={x} x={x} y="330" width="10" height="24" rx="2" fill="#2C2A24" />
        ))}
      </g>
      {/* Hufeisen an der Wand (2) */}
      <g transform="translate(196 120) scale(1.2)">
        <ItemIcon name="hufeisen" size={64} />
      </g>
      <g transform="translate(540 110) scale(1.2) rotate(10 32 32)">
        <ItemIcon name="hufeisen" size={64} />
      </g>
      {/* Rätselzettel (3) */}
      <g transform="translate(360 196) scale(1.1)">
        <ItemIcon name="zettel" size={64} />
      </g>
      <g transform="translate(560 250) scale(1.1) rotate(-6 32 32)">
        <ItemIcon name="zettel" size={64} />
      </g>
      <g transform="translate(40 300) scale(1.1) rotate(5 32 32)">
        <ItemIcon name="zettel" size={64} />
      </g>
      {/* Zaunpfahl links */}
      <rect x="60" y="370" width="26" height="160" fill="#80634D" />

      {/* Boden */}
      <rect y="500" width="800" height="100" fill="#8FA07A" />
      <g fill="#4A3426" opacity=".8">
        {[
          [300, 570],
          [348, 540],
          [392, 518],
        ].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y}) rotate(55) scale(.85)`}>
            <path d="M-6 -22c8-2 14 4 14 12 0 6-2 10-2 14H-8c0-4-2-8-2-14 0-6 0-11 4-12Z" />
            <rect x="-7" y="8" width="13" height="10" rx="3" />
          </g>
        ))}
      </g>
      {/* Kürbisse (4) */}
      {[
        [170, 470, 1.3],
        [230, 490, 1],
        [120, 500, 1.05],
        [200, 530, 0.9],
      ].map(([x, y, s]) => (
        <g key={`${x}${y}`} transform={`translate(${x - 32 * s} ${y - 32 * s}) scale(${s})`}>
          <ItemIcon name="kuerbis" size={64} />
        </g>
      ))}
      {/* Fass mit Apfelkorb (5 Äpfel) */}
      <rect x="560" y="400" width="110" height="130" rx="18" fill="#80634D" stroke="#5E4636" strokeWidth="3" />
      <path d="M560 440h110M560 490h110" stroke="#5E4636" strokeWidth="4" />
      <path d="M560 400c10-30 100-30 110 0" fill="#C4AC84" stroke="#80634D" strokeWidth="3" />
      {[
        [575, 360],
        [605, 352],
        [635, 360],
        [590, 380],
        [620, 380],
      ].map(([x, y]) => (
        <g key={`${x}${y}`} transform={`translate(${x - 14} ${y - 14}) scale(.55)`}>
          <ItemIcon name="apfel" size={64} />
        </g>
      ))}
    </svg>
  );
}

/** In der Hütte: Tivolis Halfter mit neuen Leuchtstreifen auf der Werkbank (viewBox 0 0 800 600). */
export function HuetteInnenScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="In der Weidehütte: Tivolis Halfter liegt mit neuen Leuchtstreifen auf der Werkbank">
      <defs>
        <linearGradient id="hi-beam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E7C0" stopOpacity=".8" />
          <stop offset="1" stopColor="#F7E7C0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="#7A5A42" />
      <g stroke="#6A4C37" strokeWidth="3">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${i * 52} 0V600`} />
        ))}
      </g>
      {/* Fenster mit Laterne */}
      <rect x="560" y="70" width="160" height="120" rx="6" fill="#E4E2D3" stroke="#5E4636" strokeWidth="6" />
      <path d="M640 70v120M560 130h160" stroke="#5E4636" strokeWidth="5" />
      <g transform="translate(80 60) scale(1.5)">
        <ItemIcon name="laterne" size={64} />
      </g>
      <path d="M0 0h260l420 600H0Z" fill="url(#hi-beam)" />
      {/* Werkbank */}
      <rect x="70" y="350" width="660" height="34" rx="6" fill="#9A6A4C" stroke="#5E4636" strokeWidth="3" />
      <rect x="100" y="384" width="26" height="190" fill="#80634D" />
      <rect x="674" y="384" width="26" height="190" fill="#80634D" />
      <rect y="560" width="800" height="40" fill="#5E4636" />
      {/* Tivolis Halfter mit Leuchtstreifen */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M230 344c-30-60-10-130 60-150 60 18 90 90 60 150" stroke="#344638" strokeWidth="16" />
        <path d="M232 268h120" stroke="#344638" strokeWidth="16" />
        <path d="M230 344c-30-60-10-130 60-150 60 18 90 90 60 150" stroke="#E6E9EC" strokeWidth="5" strokeDasharray="14 10" />
        <path d="M232 268h120" stroke="#E6E9EC" strokeWidth="5" strokeDasharray="14 10" />
      </g>
      <circle cx="232" cy="268" r="10" fill="#C9A15E" stroke="#4A4540" strokeWidth="2" />
      <circle cx="352" cy="268" r="10" fill="#C9A15E" stroke="#4A4540" strokeWidth="2" />
      {/* Glitzern */}
      <g fill="#F2D7A0">
        <path d="M300 180l4 9 9 3-9 3-4 9-4-9-9-3 9-3Z" />
        <path d="M380 230l3 6 6 2-6 2-3 6-3-6-6-2 6-2Z" />
        <path d="M200 220l3 6 6 2-6 2-3 6-3-6-6-2 6-2Z" />
      </g>
      {/* Nähkästchen, Schere, Garn */}
      <rect x="440" y="300" width="120" height="50" rx="8" fill="#A4573A" stroke="#5E4636" strokeWidth="3" />
      <rect x="452" y="292" width="96" height="12" rx="4" fill="#C96B5A" />
      <g transform="translate(580 300)" fill="none" stroke="#4A4540" strokeWidth="5" strokeLinecap="round">
        <circle cx="10" cy="40" r="9" />
        <circle cx="34" cy="40" r="9" />
        <path d="M14 32l20-30M30 32L10 2" />
      </g>
      <g transform="translate(640 310)">
        <rect x="0" y="0" width="26" height="7" rx="2" fill="#C4AC84" />
        <rect x="3" y="7" width="20" height="20" fill="#E6E9EC" />
        <rect x="0" y="27" width="26" height="7" rx="2" fill="#C4AC84" />
      </g>
      {/* Notizkarte */}
      <g transform="translate(410 200) rotate(-4)">
        <rect width="150" height="96" rx="6" fill="#FBF8F1" stroke="#C4AC84" strokeWidth="2" />
        <path d="M16 26h110M16 44h118M16 62h90" stroke="#C4AC84" strokeWidth="3" strokeLinecap="round" />
        <g transform="translate(104 58) scale(.55)">
          <ItemIcon name="kuerbis" size={64} />
        </g>
      </g>
    </svg>
  );
}
