import { horses } from "@/content/horses";
import { Horse } from "../Horse";

/**
 * Die „Geisterweide“ im Morgennebel (viewBox 0 0 800 600).
 * Alle drei Pferde schauen mit gespitzten Ohren zur Weidehütte rechts.
 */
export function GeisterweideScene({ className, calm }: { className?: string; calm?: boolean }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Die Geisterweide im Nebel">
      <defs>
        <linearGradient id="gw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9DCCD" />
          <stop offset="1" stopColor="#EEEBDD" />
        </linearGradient>
        <linearGradient id="gw-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF8F1" stopOpacity="0" />
          <stop offset=".5" stopColor="#FBF8F1" stopOpacity=".8" />
          <stop offset="1" stopColor="#FBF8F1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#gw-sky)" />
      <circle cx="160" cy="90" r="36" fill="#F2D7A0" opacity=".7" />

      {/* ferne Bäume */}
      <g fill="#A3AE93">
        <ellipse cx="300" cy="170" rx="46" ry="60" />
        <rect x="294" y="200" width="12" height="60" fill="#80634D" />
        <ellipse cx="470" cy="190" rx="34" ry="44" />
        <rect x="465" y="214" width="10" height="44" fill="#80634D" />
      </g>
      {/* Herbstlaub */}
      <g fill="#D9803E" opacity=".75">
        <ellipse cx="282" cy="150" rx="10" ry="6" />
        <ellipse cx="318" cy="186" rx="9" ry="5" />
        <ellipse cx="300" cy="130" rx="8" ry="5" />
        <ellipse cx="460" cy="176" rx="7" ry="4" />
      </g>

      {/* Weide */}
      <path d="M0 250c200-20 500-10 800-20v370H0Z" fill="#9FAE8A" />
      <path d="M0 330c240-16 520-6 800-14v284H0Z" fill="#8FA07A" />

      {/* Weidehütte rechts */}
      <g>
        <path d="M600 330V210l90-60 90 60v120Z" fill="#8C6A4E" />
        <path d="M588 216 690 140l102 76-10 8-92-68-92 68Z" fill="#344638" />
        <g stroke="#6A4F39" strokeWidth="3" opacity=".7">
          <path d="M620 220v110M650 200v130M730 200v130M760 220v110" />
        </g>
        <rect x="664" y="246" width="52" height="84" fill="#5E4636" />
        <rect x="664" y="326" width="52" height="5" fill="#2B1D16" />
        <rect x="700" y="282" width="10" height="14" rx="2" fill="#C9A15E" />
      </g>

      {/* Zaun mit der „Geister“-Decke */}
      <g stroke="#80634D" strokeLinecap="round">
        <path d="M0 300C100 296 200 296 300 300" strokeWidth="6" fill="none" />
        <path d="M0 330C100 326 200 326 300 330" strokeWidth="6" fill="none" />
        {[20, 110, 200, 290].map((x) => (
          <path key={x} d={`M${x} 280V350`} strokeWidth="10" />
        ))}
      </g>
      <g className={calm ? undefined : "hg-flutter"}>
        <path
          d="M80 298c2 30 0 60 8 92 14-8 24-2 34 6 12-8 22-10 34-2 10-30 8-64 10-96Z"
          fill="#F7F3EC"
          stroke="#C9C3B6"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M92 320c20 6 50 6 70 0" stroke="#E2DBCC" strokeWidth="3" fill="none" />
        <path d="M110 300v30M140 300v28" stroke="#E2DBCC" strokeWidth="2" />
      </g>

      {/* Heuballen */}
      <g>
        <rect x="30" y="470" width="96" height="58" rx="22" fill="#E3C47A" stroke="#B8954D" strokeWidth="3" />
        <path d="M42 486h72M38 500h80M42 514h72" stroke="#B8954D" strokeWidth="2.5" />
      </g>

      {/* Kürbis */}
      <ellipse cx="730" cy="520" rx="30" ry="22" fill="#D9803E" stroke="#5E4636" strokeWidth="3" />
      <path d="M730 498c0-8 4-14 10-16" stroke="#4F6A47" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* Pferde – alle mit Blick zur Hütte */}
      <Horse look={horses[0].look} uid="gw-tivoli" box={{ x: 330, y: 236, width: 180 }} />
      <Horse look={horses[2].look} uid="gw-tonga" box={{ x: 140, y: 340, width: 230 }} />
      <Horse look={horses[1].look} uid="gw-scrabble" box={{ x: 360, y: 320, width: 300 }} />

      {/* Nebelschwaden */}
      <rect x="-20" y="250" width="840" height="120" fill="url(#gw-fog)" />
      <rect x="-20" y="470" width="840" height="110" fill="url(#gw-fog)" opacity=".6" />
    </svg>
  );
}
