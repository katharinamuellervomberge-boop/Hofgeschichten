import type { HorseLook } from "@/content/types";
import { CipherGlyph } from "../CipherGlyph";
import { Horse } from "../Horse";
import { ItemIcon } from "../ItemIcons";

/**
 * Szenen für „Mystery Files – Die Nacht im Geisterstall“ (Lindenhof).
 * Alle Szenen: viewBox 0 0 800 600. Hotspot-Koordinaten stehen in
 * content/adventures/geisterstall.server.ts – beim Ändern hier mitziehen!
 */

const OUT = "#3B261B";

/** Flocke: kleines, schneeweißes Schulpony (24 Jahre). */
export const FLOCKE_LOOK: HorseLook = {
  coat: "#F7F3EC",
  coatShade: "#DED7CA",
  mane: "#EDE6D8",
  hoof: "#8C7A68",
  face: "none",
};

/** Kater Moritz – versteckt sich in mehreren Bildern (Bonus-Suche). */
function Moritz({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 24c-2-14 2-24 16-24s18 10 16 24Z" fill="#2C2A24" />
      <path d="M14 22c10 0 14-8 12-16" stroke="#2C2A24" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-6" r="12" fill="#2C2A24" />
      <path d="M-10 -12l-3-12 10 7M10 -12l3-12-10 7" fill="#2C2A24" />
      <ellipse cx="-5" cy="-7" rx="2.4" ry="3" fill="#E3C47A" />
      <ellipse cx="5" cy="-7" rx="2.4" ry="3" fill="#E3C47A" />
    </g>
  );
}

function Pumpkin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="24" ry="18" fill="#D9803E" stroke="#8C4A22" strokeWidth="2.5" />
      <path d="M0-18c-6 6-6 30 0 36M0-18c6 6 6 30 0 36M-14-14c-6 6-6 22 2 30M14-14c6 6 6 22-2 30" stroke="#B8622E" strokeWidth="2" fill="none" />
      <path d="M0-17c0-6 2-10 6-12" stroke="#4F6A47" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Hoof({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-11 6c-3-9 1-17 11-17s14 8 11 17c-4 2-7 0-8-3l-3-6-3 6c-1 3-4 5-8 3Z" fill="#3B2F28" />
    </g>
  );
}

/* =================================================================
   1 · Tatort: das hintere Ende der Stallgasse am Morgen
   Ziele: Laterne (290,345) · Schlüsselbrett (400,250) · Spinnennetz (492,212)
          Hufspuren (585,520) · Zettel (430,548)
   Ablenker: Boxen (95,300) · Besen (360,410) · Kürbisse (455,418) · Moritz (742,548)
   ================================================================= */
export function StallgasseScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Die Stallgasse am Morgen">
      <defs>
        <radialGradient id="lh-glow" cx=".5" cy=".6" r=".6">
          <stop offset="0" stopColor="#F7D58A" stopOpacity=".95" />
          <stop offset="1" stopColor="#F7D58A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Decke */}
      <path d="M0 0h800v80H0Z" fill="#2E2621" />
      <path d="M0 0l200 80M800 0 600 80M300 0v80M500 0v80" stroke="#1E1915" strokeWidth="6" />
      {/* Rückwand */}
      <rect x="200" y="80" width="400" height="350" fill="#E8D8BC" />
      <g stroke="#D3BF9C" strokeWidth="2">
        {[120, 160, 200, 240, 280, 320, 360, 400].map((y) => (
          <path key={y} d={`M200 ${y}H600`} />
        ))}
      </g>
      {/* Wimpelkette */}
      <path d="M215 100c90 30 280 30 370 0" stroke="#5E4636" strokeWidth="2" fill="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const x = 225 + i * 34;
        const y = 104 + Math.sin((i / 10) * Math.PI) * 20;
        const c = ["#D9803E", "#2C2A24", "#6E3B3F"][i % 3];
        return <path key={i} d={`M${x - 11} ${y}h22l-11 20Z`} fill={c} />;
      })}

      {/* linke Seitenwand mit Boxen */}
      <path d="M0 80h200v350L0 600Z" fill="#D9C6A5" />
      {[
        [10, 140, 95, 520],
        [105, 120, 190, 460],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <path d={`M${x1} ${y1 + 10}L${x2} ${y1 + 30}V${y2 - 20}L${x1} ${y2 + 30}Z`} fill="#6E3B3F" stroke={OUT} strokeWidth="3" />
          <g stroke="#2C2A24" strokeWidth="3">
            {Array.from({ length: 5 }, (_, k) => (
              <path key={k} d={`M${x1 + 10 + k * 16} ${y1 + 16 + k * 4}V${y1 + 110 + k * 2}`} />
            ))}
          </g>
          {/* Riegel zu */}
          <rect x={x2 - 34} y={(y1 + y2) / 2 + 30} width="26" height="8" rx="2" fill="#C99A4E" stroke={OUT} strokeWidth="2" />
        </g>
      ))}

      {/* Sattelkammer – offen, warmes Licht */}
      <rect x="226" y="196" width="108" height="236" fill="#F5D99A" />
      <ellipse cx="290" cy="360" rx="90" ry="110" fill="url(#lh-glow)" />
      <path d="M226 196l-26 10v232l26-6Z" fill="#6E3B3F" stroke={OUT} strokeWidth="3" />
      <rect x="222" y="190" width="116" height="8" fill="#5E4636" />
      <rect x="224" y="166" width="120" height="22" rx="3" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
      <text x="284" y="183" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1" fill="#2C2A24">
        SATTELKAMMER
      </text>
      <rect x="258" y="382" width="64" height="8" fill="#5E4636" />
      <path d="M264 390v40M316 390v40" stroke="#5E4636" strokeWidth="5" />
      {/* Laterne */}
      <g>
        <path d="M290 318c-8 0-10-10 0-12 10 2 8 12 0 12Z" fill="none" stroke="#2C2A24" strokeWidth="3" />
        <rect x="276" y="326" width="28" height="6" rx="2" fill="#6E3B3F" />
        <rect x="279" y="332" width="22" height="38" rx="4" fill="#FBEBC2" stroke="#2C2A24" strokeWidth="2.5" />
        <path d="M290 362c-6-4-6-12 0-20 6 8 6 16 0 20Z" fill="#E07A2E" />
        <rect x="276" y="370" width="28" height="10" rx="2" fill="#6E3B3F" />
      </g>

      {/* Schlüsselbrett: 5 Haken, 4 Schlüssel */}
      <rect x="352" y="224" width="100" height="16" rx="3" fill="#B08A57" stroke={OUT} strokeWidth="2" />
      {[364, 383, 402, 421, 440].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 240v8`} stroke="#4A4540" strokeWidth="3" />
          {i !== 3 && (
            <g transform={`translate(${x - 10} 246) scale(.32)`}>
              <ItemIcon name="schluessel" size={64} />
            </g>
          )}
        </g>
      ))}
      <rect x="380" y="200" width="44" height="18" rx="9" fill="#D9803E" opacity=".9" />
      <text x="402" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FBF8F1">
        5
      </text>

      {/* Tür zum Alten Stall – Spinnennetz zerrissen */}
      <rect x="474" y="190" width="100" height="242" fill="#6E3B3F" stroke={OUT} strokeWidth="3" />
      <path d="M484 204h80v214h-80ZM484 204l80 214" fill="none" stroke="#4E2A2D" strokeWidth="6" />
      <rect x="548" y="306" width="10" height="20" rx="2" fill="#C99A4E" stroke={OUT} strokeWidth="1.5" />
      <rect x="470" y="166" width="108" height="22" rx="3" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
      <text x="524" y="183" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1" fill="#2C2A24">
        ALTER STALL
      </text>
      <g stroke="#FBF8F1" strokeWidth="1.6" fill="none" opacity=".9">
        <path d="M476 192l30 30M476 192h42M476 192v40M476 192l38 16" />
        <path d="M490 192c0 6-6 12-14 12M504 192c0 10-12 20-28 22" />
        <path d="M518 192c0 6 4 12 8 18M476 232c4 4 2 10 6 16" strokeDasharray="3 4" />
      </g>

      {/* rechte Seitenwand mit offener Hintertür */}
      <path d="M600 80h200v520L600 430Z" fill="#D3BF9C" />
      <path d="M640 190l90-36v400l-90-70Z" fill="#2F3B33" stroke={OUT} strokeWidth="3" />
      <path d="M648 210l74-28v120l-74 20Z" fill="#7D8E77" opacity=".6" />
      <path d="M648 340l74-12v190l-74-60Z" fill="#9FAE8A" opacity=".55" />
      <circle cx="770" cy="270" r="14" fill="#FBF8F1" opacity=".55" />

      {/* Boden */}
      <path d="M0 600 200 430h400l200 170Z" fill="#F2E7D2" />
      <path d="M200 430 120 600M400 430v170M600 430l80 170" stroke="#E0D2B6" strokeWidth="2" />

      {/* Besen */}
      <path d="M392 330l-30 72" stroke="#B08A57" strokeWidth="5" strokeLinecap="round" />
      <path d="M352 396l20 8-8 22-20-6Z" fill="#C4703A" stroke={OUT} strokeWidth="2" />

      {/* Kürbisse */}
      <Pumpkin x={444} y={420} s={0.6} />
      <Pumpkin x={472} y={414} s={0.8} />

      {/* Hufspuren: von der Hintertür zur Sattelkammer, dann zum Alten Stall */}
      {[
        [690, 560, -60],
        [650, 540, -70],
        [610, 522, -75],
        [568, 506, -80],
        [526, 492, -85],
        [484, 478, -88],
        [440, 466, -92],
        [396, 456, -95],
        [350, 448, -100],
        [312, 442, -110],
        [340, 452, 70],
        [380, 448, 80],
        [420, 448, 85],
        [462, 444, 88],
        [504, 440, 92],
      ].map(([x, y, r], i) => (
        <Hoof key={i} x={x} y={y} rot={r} s={0.8 + (y - 440) / 400} />
      ))}

      {/* zerknüllter Zettel */}
      <path d="M408 534l20-12 26 6 6 18-16 14-28-2-10-12Z" fill="#FBF8F1" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M420 538l14 4 6 10M434 528l2 14" stroke="#A9A398" strokeWidth="1.8" fill="none" />

      {/* Heuballen mit Moritz */}
      <rect x="700" y="550" width="100" height="50" rx="4" fill="#E3C47A" stroke="#B08A57" strokeWidth="3" />
      <path d="M716 560v34M736 560v34M760 560v34M784 560v34" stroke="#C9A15E" strokeWidth="2" />
      <Moritz x={742} y={536} s={0.85} />
    </svg>
  );
}

/* =================================================================
   2 · Das Schwarze Brett
   Ziel: fehlender Abreißstreifen (632,420)
   Ablenker: Halloween (150,200) · Hufschmied (395,160) · Sattelkammer (420,330)
             Kater vermisst (170,430) · übrige Streifen (560,425)
   ================================================================= */
export function SchwarzesBrettScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Das Schwarze Brett im Stall">
      <rect width="800" height="600" fill="#D9C6A5" />
      <rect x="40" y="40" width="720" height="520" rx="10" fill="#6E3B3F" />
      <rect x="58" y="58" width="684" height="484" rx="4" fill="#C8A777" />
      <g fill="#B8955F" opacity=".5">
        {Array.from({ length: 60 }, (_, i) => (
          <circle key={i} cx={70 + ((i * 97) % 660)} cy={70 + ((i * 53) % 460)} r="2" />
        ))}
      </g>

      {/* Halloween-Plakat */}
      <g transform="rotate(-3 150 200)">
        <rect x="70" y="90" width="170" height="220" fill="#FBF3E2" stroke={OUT} strokeWidth="1.5" />
        <text x="155" y="130" textAnchor="middle" fontSize="24" fontWeight="700" fill="#C4703A" fontFamily="Georgia, serif">
          Halloween
        </text>
        <text x="155" y="150" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#2C2A24">
          AUF DEM LINDENHOF
        </text>
        {["31. Oktober, ab 17 Uhr", "Kürbisse schnitzen", "Stockbrot", "Nachtwanderung", "Übernachtung im Heu", "Anmeldung bei Tilda"].map((t, i) => (
          <text key={t} x="155" y={176 + i * 22} textAnchor="middle" fontSize="13" fontWeight={i === 4 ? 700 : 400} fill="#2C2A24">
            {t}
          </text>
        ))}
        <circle cx="155" cy="96" r="8" fill="#D9803E" stroke={OUT} strokeWidth="1.5" />
      </g>

      {/* Hufschmied */}
      <g transform="rotate(2 395 160)">
        <rect x="290" y="90" width="210" height="130" fill="#FFFFFF" stroke={OUT} strokeWidth="1.5" />
        {["HUFSCHMIED kommt am", "3. November.", "Alle Pferde bis 8 Uhr", "putzen!", "            – Wilhelm"].map((t, i) => (
          <text key={i} x="304" y={122 + i * 20} fontSize="14" fontFamily="Courier New, monospace" fill="#2C2A24">
            {t}
          </text>
        ))}
        <circle cx="395" cy="96" r="8" fill="#344638" stroke={OUT} strokeWidth="1.5" />
      </g>

      {/* Sattelkammer schließen */}
      <g transform="rotate(-2 420 330)">
        <rect x="320" y="280" width="200" height="90" fill="#FFFFFF" stroke={OUT} strokeWidth="1.5" />
        <text x="336" y="316" fontSize="14" fontFamily="Courier New, monospace" fill="#2C2A24">
          Sattelkammer bitte
        </text>
        <text x="336" y="336" fontSize="14" fontFamily="Courier New, monospace" fill="#2C2A24">
          IMMER schließen!
        </text>
        <text x="440" y="358" fontSize="13" fontFamily="Courier New, monospace" fill="#2C2A24">
          – H. L.
        </text>
        <circle cx="420" cy="286" r="8" fill="#D9803E" stroke={OUT} strokeWidth="1.5" />
      </g>

      {/* Kater vermisst */}
      <g transform="rotate(1 170 430)">
        <rect x="72" y="360" width="236" height="150" fill="#FFFFFF" stroke={OUT} strokeWidth="1.5" />
        <Moritz x={108} y={432} s={1.1} />
        <text x="140" y="392" fontSize="15" fontWeight="700" fill="#2C2A24">
          VERMISST!
        </text>
        {["Kater Moritz.", "Schwarz, frech.", "Bitte melden bei", "A. Voss (Nachbarhof)"].map((t, i) => (
          <text key={i} x="140" y={414 + i * 18} fontSize="11.5" fontFamily="Courier New, monospace" fill="#2C2A24">
            {t}
          </text>
        ))}
        <circle cx="180" cy="366" r="8" fill="#344638" stroke={OUT} strokeWidth="1.5" />
      </g>

      {/* Zuhause gesucht – mit Abreißstreifen */}
      <g>
        <rect x="540" y="90" width="190" height="290" fill="#FFFFFF" stroke={OUT} strokeWidth="1.5" />
        <text x="635" y="126" textAnchor="middle" fontSize="16" fontWeight="700" letterSpacing="1" fill="#6E3B3F">
          ZUHAUSE GESUCHT!
        </text>
        {["Ponystute FLOCKE,", "24 Jahre, Schimmel,", "lieb zu Kindern.", "Ihre Besitzerin zieht", "ins Seniorenheim.", "Flocke braucht bis", "31. Oktober einen", "neuen Platz!"].map((t, i) => (
          <text
            key={i}
            x="554"
            y={154 + i * 21}
            fontSize="13"
            fontFamily="Courier New, monospace"
            fontWeight={i === 0 || i === 6 ? 700 : 400}
            fill="#2C2A24"
          >
            {t}
          </text>
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 540 + i * 31.6;
          if (i === 3) {
            return <path key={i} d={`M${x + 2} 380h28`} stroke={OUT} strokeWidth="1.5" strokeDasharray="3 3" />;
          }
          return (
            <g key={i}>
              <rect x={x} y="380" width="31.6" height="90" fill="#FFFFFF" stroke={OUT} strokeWidth="1" strokeDasharray="4 3" />
              <text x={x + 20} y="390" fontSize="10" fill="#2C2A24" transform={`rotate(90 ${x + 20} 390)`} fontFamily="Courier New, monospace">
                Hof Erlenbruch
              </text>
            </g>
          );
        })}
        <circle cx="635" cy="96" r="8" fill="#6E3B3F" stroke={OUT} strokeWidth="1.5" />
      </g>

      {/* Spinnennetz Ecke */}
      <g stroke="#FBF8F1" strokeWidth="1.4" fill="none" opacity=".8">
        <path d="M742 58l-60 60M742 58h-80M742 58v80M742 58l-74 30M742 58l-30 74" />
        <path d="M722 58c0 10 10 20 20 20M700 58c0 22 20 42 42 42M680 58c0 32 30 62 62 62" />
      </g>
    </svg>
  );
}

/* =================================================================
   3 · Hofplan von oben
   Ziele im hellen Blickfeld: Stalltür (210,330) · Sattelkammer-Fenster (620,300) · Zaun (560,150)
   Ablenker: Hintertür (490,382) · Anhänger (370,520)
   Weitere Orte: Alter Stall Box C (700,370) · Wohnhaus (165,120)
   ================================================================= */
export function HofplanScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Hofplan des Lindenhofs von oben">
      <rect width="800" height="600" fill="#F2E6C8" />
      <rect x="12" y="12" width="776" height="576" fill="none" stroke="#2C2A24" strokeWidth="4" />
      {/* Dorfstraße */}
      <rect x="20" y="20" width="36" height="560" fill="#E3D4B4" />
      <path d="M38 40v520" stroke="#FBF8F1" strokeWidth="3" strokeDasharray="14 12" />
      <text x="46" y="440" fontSize="12" fontWeight="700" letterSpacing="3" fill="#5E4636" transform="rotate(-90 46 440)">
        DORFSTRASSE
      </text>

      {/* Blickfeld Oma Greta */}
      <path d="M180 150 L780 118 L780 292 L240 298 L240 384 L204 384 Z" fill="#FFFDF4" opacity=".9" />
      <path d="M180 150 L780 118 M180 150 L204 384" stroke="#D9803E" strokeWidth="2" strokeDasharray="5 5" />
      <text x="470" y="222" fontSize="12" fontWeight="700" letterSpacing="1.5" fill="#C4703A">
        OMA GRETAS BLICKFELD (HELL)
      </text>

      {/* Wohnhaus */}
      <rect x="90" y="60" width="160" height="90" fill="#E3D4B4" stroke="#2C2A24" strokeWidth="3" />
      <text x="170" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="#2C2A24">
        WOHNHAUS
      </text>
      <text x="170" y="120" textAnchor="middle" fontSize="11" fill="#5E4636">
        Hanna &amp; Oma Greta
      </text>
      <rect x="166" y="144" width="28" height="8" fill="#D9803E" stroke="#2C2A24" strokeWidth="1.5" />
      <text x="214" y="170" fontSize="10" fill="#5E4636">
        Oma Gretas Fenster
      </text>

      {/* Kürbisbeet, Linde */}
      <rect x="290" y="70" width="80" height="50" rx="6" fill="#DDE3D6" stroke="#5E7360" strokeWidth="2" strokeDasharray="4 3" />
      {[305, 325, 345].map((x) => (
        <circle key={x} cx={x} cy="100" r="7" fill="#D9803E" />
      ))}
      <circle cx="420" cy="240" r="22" fill="#A3AE93" stroke="#5E7360" strokeWidth="2" />
      <text x="450" y="244" fontSize="11" fill="#5E4636">
        Linde
      </text>

      {/* Hof Voss + Zaun */}
      <rect x="610" y="40" width="150" height="70" fill="#E3D4B4" stroke="#2C2A24" strokeWidth="3" />
      <text x="685" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#2C2A24">
        HOF VOSS
      </text>
      <path d="M400 150H770" stroke="#2C2A24" strokeWidth="3" />
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} d={`M${410 + i * 28} 140v20`} stroke="#2C2A24" strokeWidth="3" />
      ))}
      <text x="520" y="178" fontSize="11" fontWeight="700" fill="#5E4636">
        Zaun zu Herrn Voss
      </text>

      {/* Hauptstall */}
      <rect x="230" y="280" width="370" height="100" fill="#E3D4B4" stroke="#2C2A24" strokeWidth="3" />
      {["BOX 1", "BOX 2", "BOX 3", "BOX 4", "BOX 5"].map((b, i) => (
        <g key={b}>
          <rect x={230 + i * 74} y="280" width="74" height="54" fill="none" stroke="#2C2A24" strokeWidth="2" />
          <text x={267 + i * 74} y="304" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2C2A24">
            {b}
          </text>
          <text x={267 + i * 74} y="320" textAnchor="middle" fontSize="10" fill="#5E4636">
            {["Donner", "Zimt", "Luna", "Mogli", "Kastanie"][i]}
          </text>
        </g>
      ))}
      <text x="415" y="362" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="4" fill="#2C2A24">
        STALLGASSE
      </text>
      {/* Stalltür links */}
      <rect x="222" y="336" width="10" height="38" fill="#D9803E" stroke="#2C2A24" strokeWidth="1.5" />
      <text x="150" y="330" fontSize="11" fontWeight="700" fill="#2C2A24">
        Stalltür
      </text>
      {/* Hintertür unten */}
      <rect x="470" y="376" width="40" height="10" fill="#D9803E" stroke="#2C2A24" strokeWidth="1.5" />
      <text x="490" y="404" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2C2A24">
        Hintertür
      </text>
      {/* Hund Bruno */}
      <path d="M180 372l14-12 14 12v16h-28Z" fill="#6E3B3F" stroke="#2C2A24" strokeWidth="2" />
      <text x="194" y="404" textAnchor="middle" fontSize="10" fill="#5E4636">
        Bruno
      </text>

      {/* Sattelkammer + Fenster */}
      <rect x="600" y="280" width="90" height="56" fill="#F5D99A" stroke="#2C2A24" strokeWidth="3" />
      <text x="645" y="300" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2C2A24">
        SATTEL-
      </text>
      <text x="645" y="314" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2C2A24">
        KAMMER
      </text>
      <rect x="604" y="274" width="32" height="8" fill="#D9803E" stroke="#2C2A24" strokeWidth="1.5" />
      {/* Alter Stall */}
      <rect x="600" y="336" width="170" height="80" fill="#E3D4B4" stroke="#2C2A24" strokeWidth="3" />
      <text x="685" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2C2A24">
        ALTER STALL
      </text>
      {["A", "B", "C"].map((b, i) => (
        <g key={b}>
          <rect x={606 + i * 54} y="362" width="52" height="48" fill="#D9C6A5" stroke="#2C2A24" strokeWidth="2" />
          <text x={632 + i * 54} y="391" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2C2A24">
            BOX {b}
          </text>
        </g>
      ))}
      <rect x="596" y="340" width="8" height="24" fill="#6E3B3F" />

      {/* Futterkammer */}
      <rect x="240" y="384" width="140" height="44" fill="#E3D4B4" stroke="#2C2A24" strokeWidth="2" />
      <text x="310" y="403" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2C2A24">
        FUTTERKAMMER
      </text>
      <text x="310" y="419" textAnchor="middle" fontSize="9.5" fill="#5E4636">
        darüber wohnt Wilhelm
      </text>

      {/* Reitplatz, Scheune, Anhänger */}
      <rect x="80" y="450" width="150" height="100" fill="none" stroke="#2C2A24" strokeWidth="2" strokeDasharray="8 6" />
      <text x="155" y="505" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2C2A24">
        REITPLATZ
      </text>
      <rect x="290" y="430" width="160" height="70" fill="#E3D4B4" stroke="#2C2A24" strokeWidth="3" />
      <text x="370" y="462" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2C2A24">
        SCHEUNE
      </text>
      <text x="370" y="480" textAnchor="middle" fontSize="10" fill="#5E4636">
        Heu &amp; Stroh
      </text>
      <rect x="335" y="508" width="70" height="28" rx="6" fill="#4F6A47" stroke="#2C2A24" strokeWidth="2" />
      <text x="370" y="526" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FBF8F1">
        Anhänger
      </text>

      {/* Weide, Bach */}
      <text x="560" y="480" fontSize="16" fontStyle="italic" fill="#5E7360" fontFamily="Georgia, serif">
        Weide
      </text>
      <path d="M520 590c60-40 120-50 180-80s80-40 90-60" stroke="#8FB0B8" strokeWidth="10" fill="none" />
      <path d="M520 590c60-40 120-50 180-80s80-40 90-60" stroke="#FBF8F1" strokeWidth="2" strokeDasharray="10 8" fill="none" />

      {/* Wege */}
      <text x="70" y="40" fontSize="10" fill="#5E4636">
        zum Sportplatz: 25 Min. mit dem Rad
      </text>
      <text x="70" y="575" fontSize="10" fill="#5E4636">
        in die Stadt: 20 Min. mit dem Auto
      </text>
    </svg>
  );
}

/* =================================================================
   4 · Der Hufabdruck auf dem Messgitter (1 Kästchen = 1 cm)
   Ziel: fehlendes Stück am Rand (282,236)
   ================================================================= */
export function HufabdruckScene({ className }: { className?: string }) {
  const cell = 40;
  const x0 = 140;
  const y0 = 60;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Hufabdruck auf einem Messgitter">
      <rect width="800" height="600" fill="#EDE5D3" />
      <rect x={x0 - 20} y={y0 - 40} width={13 * cell + 40} height={12 * cell + 70} fill="#FBF8F1" stroke="#5E4636" strokeWidth="2" />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={`v${i}`} d={`M${x0 + i * cell} ${y0}V${y0 + 12 * cell}`} stroke="#9FB4BC" strokeWidth={i % 13 === 0 ? 2 : 1} />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <path key={`h${i}`} d={`M${x0} ${y0 + i * cell}H${x0 + 13 * cell}`} stroke="#9FB4BC" strokeWidth={i % 12 === 0 ? 2 : 1} />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <text key={i} x={x0 + i * cell + cell / 2} y={y0 - 12} textAnchor="middle" fontSize="14" fill="#5E4636" fontFamily="Courier New, monospace">
          {i + 1}
        </text>
      ))}
      {/* Abdruck: 9 Kästchen breit (Spalte 3 bis 11), barhuf mit V, Kerbe links oben */}
      <path
        d={`M${x0 + 2 * cell} ${y0 + 6 * cell}
            C${x0 + 2 * cell} ${y0 + 2.6 * cell} ${x0 + 4 * cell} ${y0 + 1.4 * cell} ${x0 + 6.5 * cell} ${y0 + 1.4 * cell}
            C${x0 + 9 * cell} ${y0 + 1.4 * cell} ${x0 + 11 * cell} ${y0 + 2.6 * cell} ${x0 + 11 * cell} ${y0 + 6 * cell}
            C${x0 + 11 * cell} ${y0 + 9 * cell} ${x0 + 9.6 * cell} ${y0 + 11 * cell} ${x0 + 7.4 * cell} ${y0 + 11 * cell}
            L${x0 + 6.5 * cell} ${y0 + 10.2 * cell} L${x0 + 5.6 * cell} ${y0 + 11 * cell}
            C${x0 + 3.4 * cell} ${y0 + 11 * cell} ${x0 + 2 * cell} ${y0 + 9 * cell} ${x0 + 2 * cell} ${y0 + 6 * cell}Z`}
        fill="#2C2A24"
        opacity=".88"
      />
      {/* V (Strahl) */}
      <path d={`M${x0 + 6.5 * cell} ${y0 + 4.4 * cell}L${x0 + 5.5 * cell} ${y0 + 10.4 * cell}H${x0 + 7.5 * cell}Z`} fill="#FBF8F1" />
      {/* Kerbe: hier fehlt ein Stück */}
      <path d={`M${x0 + 2.55 * cell} ${y0 + 2.7 * cell}l30 -26 22 30 -30 16Z`} fill="#FBF8F1" />
      <text x="400" y="560" textAnchor="middle" fontSize="15" fill="#5E4636" fontFamily="Courier New, monospace">
        Stallgasse, 31.10., 6:52 Uhr · 1 Kästchen = 1 cm
      </text>
    </svg>
  );
}

/* =================================================================
   5 · Die Spur in der Stallgasse von oben (für die Laufrichtung)
   ================================================================= */
export function HufspurScene({ className }: { className?: string }) {
  const prints: Array<[number, number]> = [
    [110, 470], [160, 440], [210, 470], [260, 440], [310, 460], [360, 430], [410, 450], [460, 420],
    [510, 440], [560, 410], [610, 430], [660, 400], [710, 420],
  ];
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Die Hufspur in der Stallgasse von oben">
      <rect width="800" height="600" fill="#EDE5D3" />
      <rect x="40" y="240" width="720" height="280" fill="#FBF6EA" stroke="#5E4636" strokeWidth="3" />
      <rect x="40" y="200" width="720" height="40" fill="#D9C6A5" />
      <rect x="40" y="520" width="720" height="40" fill="#D9C6A5" />
      <rect x="60" y="520" width="110" height="40" fill="#2C2A24" />
      <text x="115" y="546" textAnchor="middle" fontSize="15" fontWeight="700" fill="#FBF8F1">
        HINTERTÜR
      </text>
      <rect x="420" y="200" width="140" height="40" fill="#E3C47A" stroke="#5E4636" strokeWidth="2" />
      <text x="490" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="#2C2A24">
        SATTELKAMMER
      </text>
      <rect x="740" y="300" width="40" height="160" fill="#6E3B3F" />
      <text x="766" y="380" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FBF8F1" transform="rotate(-90 766 380)">
        ALTER STALL
      </text>
      <text x="70" y="280" fontSize="14" fontWeight="700" letterSpacing="2" fill="#5E4636">
        STALLGASSE VON OBEN
      </text>
      {/* Hufabdrücke: runde Seite zeigt nach vorn (nach rechts) */}
      {prints.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(90)`}>
          <path d="M-13 8c-4-11 1-21 13-21s17 10 13 21c-5 3-8 0-10-4l-3-7-3 7c-2 4-5 7-10 4Z" fill="#2C2A24" />
        </g>
      ))}
      {/* Abstecher in die Sattelkammer */}
      {[[480, 330], [500, 290], [520, 320]].map(([x, y], i) => (
        <g key={`s${i}`} transform={`translate(${x} ${y}) rotate(${i === 1 ? 0 : 180})`}>
          <path d="M-13 8c-4-11 1-21 13-21s17 10 13 21c-5 3-8 0-10-4l-3-7-3 7c-2 4-5 7-10 4Z" fill="#2C2A24" />
        </g>
      ))}
      <Moritz x={700} y={190} s={0.7} />
    </svg>
  );
}

/* =================================================================
   6 · Die Sattelkammer des Lindenhofs
   Lücken (Inventur): Pony-Haken (318,232) · Deckenregal (262,110) · Eimer (452,520)
   Suchbild: Streichhölzer (640,436) · Karotte (520,560) · Foto (690,560)
   Ablenker: Sättel (520,90) · Maus (240,470) · Truhe/Moritz (700,500) · Hufeisen (740,40)
   ================================================================= */
export function LindenhofSattelkammerScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Die alte Sattelkammer im Laternenlicht">
      <defs>
        <radialGradient id="lsk-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#F7D58A" stopOpacity=".7" />
          <stop offset="1" stopColor="#F7D58A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="#E9DCC2" />
      <g stroke="#D5C4A3" strokeWidth="2">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${i * 52} 0V500`} />
        ))}
      </g>
      <rect y="500" width="800" height="100" fill="#C9A97F" />
      <path d="M0 530H800M0 565H800" stroke="#B08A57" strokeWidth="2" />
      <circle cx="640" cy="390" r="150" fill="url(#lsk-glow)" />

      {/* Deckenregal: 2 von 3 Decken */}
      <rect x="40" y="130" width="250" height="10" fill="#6E3B3F" />
      <rect x="50" y="92" width="80" height="38" rx="6" fill="#344638" stroke={OUT} strokeWidth="2" />
      <path d="M78 92v38M86 92v38" stroke="#C99A4E" strokeWidth="3" />
      <rect x="138" y="92" width="80" height="38" rx="6" fill="#6E3B3F" stroke={OUT} strokeWidth="2" />
      <path d="M166 92v38M174 92v38" stroke="#C99A4E" strokeWidth="3" />
      <rect x="226" y="96" width="70" height="34" rx="6" fill="none" stroke="#B9A381" strokeWidth="2" strokeDasharray="5 5" />
      <rect x="56" y="62" width="70" height="20" rx="3" fill="#FBF8F1" stroke={OUT} strokeWidth="1.5" />
      <text x="91" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2C2A24">
        DECKEN
      </text>

      {/* Halfter: 4 + leerer PONY-Haken */}
      <rect x="40" y="186" width="300" height="10" rx="4" fill="#C99A4E" stroke={OUT} strokeWidth="1.5" />
      {[
        [70, "#344638"],
        [130, "#6E3B3F"],
        [190, "#344638"],
        [250, "#2C2A24"],
      ].map(([x, c]) => (
        <g key={x as number} fill="none" stroke={c as string} strokeWidth="6" strokeLinecap="round">
          <path d={`M${(x as number) - 12} 200c-10 26-6 54 12 64 18-10 22-38 12-64`} />
          <path d={`M${(x as number) - 14} 226h28`} />
        </g>
      ))}
      <path d="M318 196v12c0 6 8 6 8 0" stroke="#4A4540" strokeWidth="3" fill="none" />
      <rect x="296" y="222" width="44" height="18" rx="3" fill="#C99A4E" stroke={OUT} strokeWidth="1.5" />
      <text x="318" y="235" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2C2A24">
        PONY
      </text>
      <rect x="56" y="160" width="70" height="20" rx="3" fill="#FBF8F1" stroke={OUT} strokeWidth="1.5" />
      <text x="91" y="174" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2C2A24">
        HALFTER
      </text>

      {/* Sättel */}
      <rect x="380" y="128" width="290" height="8" fill="#B08A57" />
      {["#6E3B3F", "#2C2A24", "#C4703A", "#6E3B3F", "#344638"].map((c, i) => (
        <path key={i} d={`M${394 + i * 56} 128c0-30 8-44 22-44s22 14 22 44Z`} fill={c} stroke={OUT} strokeWidth="2" />
      ))}
      {/* Trensen */}
      <rect x="380" y="186" width="290" height="8" fill="#B08A57" />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i} fill="none" stroke={["#6E3B3F", "#2C2A24", "#6E3B3F", "#344638", "#2C2A24", "#6E3B3F"][i]} strokeWidth="4">
          <path d={`M${400 + i * 46} 194v70M${414 + i * 46} 194v70`} />
          <circle cx={407 + i * 46} cy="276" r="10" />
        </g>
      ))}

      {/* Putzkisten + Maus */}
      <rect x="40" y="410" width="230" height="8" fill="#5E4636" />
      <path d="M52 418v80M258 418v80" stroke="#5E4636" strokeWidth="6" />
      <rect x="56" y="370" width="80" height="40" rx="5" fill="#C4703A" stroke={OUT} strokeWidth="2" />
      <rect x="150" y="370" width="80" height="40" rx="5" fill="#5E7360" stroke={OUT} strokeWidth="2" />
      <g transform="translate(240 470)">
        <ellipse cx="0" cy="0" rx="16" ry="10" fill="#A9A398" />
        <circle cx="-14" cy="-6" r="6" fill="#A9A398" />
        <path d="M16 2c10 0 14 6 20 4" stroke="#A9A398" strokeWidth="2" fill="none" />
        <circle cx="-17" cy="-7" r="1.6" fill="#2C2A24" />
      </g>

      {/* Eimer: 2 von 3 */}
      <g transform="translate(330 470)">
        <ItemIcon name="eimer" size={64} />
      </g>
      <g transform="translate(386 470)">
        <ItemIcon name="eimer" size={64} />
      </g>
      <rect x="444" y="480" width="56" height="52" rx="4" fill="none" stroke="#B9A381" strokeWidth="2" strokeDasharray="5 5" />

      {/* Fenster mit Mond, Hufeisen darüber */}
      <rect x="690" y="70" width="90" height="110" fill="#2E3B33" stroke="#6E3B3F" strokeWidth="6" />
      <circle cx="745" cy="110" r="16" fill="#F2EEE6" />
      <path d="M735 70v110M690 125h90" stroke="#6E3B3F" strokeWidth="5" />
      <path d="M726 52c0-18 28-18 28 0" stroke="#B08A57" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* Tisch mit Laterne, Streichhölzern und Stallbuch */}
      <rect x="590" y="446" width="180" height="10" fill="#5E4636" />
      <path d="M602 456v60M758 456v60" stroke="#5E4636" strokeWidth="6" />
      <g>
        <rect x="660" y="378" width="34" height="8" rx="2" fill="#6E3B3F" />
        <rect x="664" y="386" width="26" height="46" rx="4" fill="#FBEBC2" stroke="#2C2A24" strokeWidth="2.5" />
        <path d="M677 424c-7-5-7-14 0-24 7 10 7 19 0 24Z" fill="#E07A2E" />
        <rect x="660" y="432" width="34" height="14" rx="2" fill="#6E3B3F" />
      </g>
      <g transform="translate(616 420) scale(.5)">
        <ItemIcon name="streichholz" size={64} />
      </g>
      <g transform="translate(706 412) scale(.55)">
        <ItemIcon name="stallbuch" size={64} />
      </g>

      {/* offene Truhe mit Moritz */}
      <rect x="640" y="500" width="130" height="70" fill="#6E3B3F" stroke={OUT} strokeWidth="3" />
      <path d="M640 500l10-36h110l10 36" fill="#5A2F33" stroke={OUT} strokeWidth="3" />
      <rect x="694" y="520" width="22" height="16" fill="#C99A4E" />
      <Moritz x={706} y={494} s={0.6} />

      {/* Karotte am Boden */}
      <g transform="translate(500 548) rotate(-20)">
        <path d="M0 0l40 6-40 8Z" fill="#E07A2E" stroke="#8C4A22" strokeWidth="1.5" />
        <path d="M0 7l-10-8M0 7l-12 2M0 7l-8 10" stroke="#4F6A47" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* altes Foto vor der Truhe */}
      <g transform="rotate(12 690 570)">
        <rect x="664" y="548" width="52" height="44" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
        <rect x="669" y="553" width="42" height="28" fill="#C7CDB4" />
        <path d="M680 576c2-8 10-10 16-8l6-4 2 6c-2 4-6 6-10 6Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/* =================================================================
   7 · Das Schlüsselbrett groß (Logikrätsel)
   ================================================================= */
export const KEY_GRIPS = ["schluessel-rund", "schluessel-eckig", "schluessel-herz", null, "schluessel-klee"] as const;

export function SchluesselbrettScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Das Schlüsselbrett: fünf Haken, vier Schlüssel">
      <rect width="800" height="600" fill="#E8D8BC" />
      <g stroke="#D3BF9C" strokeWidth="2">
        {[80, 160, 240, 320, 400, 480, 560].map((y) => (
          <path key={y} d={`M0 ${y}H800`} />
        ))}
      </g>
      <rect x="60" y="120" width="680" height="70" rx="10" fill="#B08A57" stroke={OUT} strokeWidth="4" />
      {KEY_GRIPS.map((g, i) => {
        const x = 140 + i * 130;
        return (
          <g key={i}>
            <rect x={x - 46} y="134" width="92" height="26" rx="4" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
            <path d={`M${x - 30} 148c10-6 20 6 30 0s20-6 30 0`} stroke="#C4AC84" strokeWidth="2" fill="none" />
            <path d={`M${x} 190v24`} stroke="#4A4540" strokeWidth="6" strokeLinecap="round" />
            {g ? (
              <g transform={`translate(${x - 64} 200) scale(2)`}>
                <ItemIcon name={g} size={64} />
              </g>
            ) : (
              <>
                <path d={`M${x} 214v20c0 8 12 8 12 0`} stroke="#4A4540" strokeWidth="5" fill="none" />
                <text x={x} y="300" textAnchor="middle" fontSize="22" fontStyle="italic" fill="#6E3B3F" fontFamily="Georgia, serif">
                  leer!
                </text>
              </>
            )}
            <circle cx={x} cy="440" r="22" fill="#2C2A24" />
            <text x={x} y="448" textAnchor="middle" fontSize="22" fontWeight="700" fill="#FBF8F1">
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* =================================================================
   8 · Das alte Foto: Vorder- und Rückseite (Spiegelschrift)
   ================================================================= */
export function AltesFotoScene({ className }: { className?: string }) {
  const back = ["FLOCKE WIRD 8!", "MIT IHREM", "BESTEN FREUND.", "SOMMERFEST AUF", "DEM LINDENHOF"];
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Das alte Foto: vorne ein Mann mit Pony, hinten Spiegelschrift">
      <rect width="800" height="600" fill="#EDE5D3" />
      {/* Vorderseite */}
      <g transform="rotate(-3 210 300)">
        <rect x="40" y="80" width="340" height="400" fill="#FBF8F1" stroke="#B9A381" strokeWidth="2" />
        <rect x="60" y="100" width="300" height="300" fill="#DDE3D6" />
        <path d="M60 300h300v100H60Z" fill="#B5C2A4" />
        <path d="M60 230l60-40 60 40v70H60Z" fill="#6E3B3F" />
        <path d="M80 130c60 24 220 24 280 0" stroke="#5E4636" strokeWidth="1.5" fill="none" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${86 + i * 30} ${136 + Math.sin((i / 8) * Math.PI) * 12}h18l-9 14Z`} fill={["#D9803E", "#344638", "#6E3B3F"][i % 3]} />
        ))}
        <circle cx="320" cy="150" r="22" fill="#F2D7A0" />
        {/* Torte mit 8 */}
        <rect x="76" y="320" width="64" height="40" rx="4" fill="#F2D7A0" stroke={OUT} strokeWidth="2" />
        <rect x="80" y="300" width="56" height="22" rx="4" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
        <text x="108" y="318" textAnchor="middle" fontSize="20" fontWeight="700" fill="#6E3B3F">
          8
        </text>
        {/* junger Wilhelm: Mütze, Bleistift, Schnurrbart */}
        <g>
          <path d="M150 400c0-50 16-70 44-70s44 20 44 70Z" fill="#6E3B3F" />
          <ellipse cx="194" cy="276" rx="30" ry="34" fill="#E7C2A0" />
          <path d="M162 262c0-24 14-34 32-34s34 10 34 34Z" fill="#344638" />
          <path d="M156 262h80c0 6-4 9-10 9h-62c-5 0-8-3-8-9Z" fill="#344638" stroke={OUT} strokeWidth="1.5" />
          <g transform="rotate(-28 232 262)">
            <rect x="222" y="258" width="34" height="8" rx="1" fill="#D9803E" stroke={OUT} strokeWidth="1.2" />
            <path d="M256 258l8 4-8 4Z" fill="#E8C9A0" />
          </g>
          <circle cx="182" cy="280" r="3" fill="#2C2A24" />
          <circle cx="206" cy="280" r="3" fill="#2C2A24" />
          <path d="M178 294c6-5 12-3 16-1 4-2 10-4 16 1-6 4-12 3-16 2-4 1-10 2-16-2Z" fill="#7A6450" />
        </g>
        {/* Flocke mit grünem Halfter */}
        <Horse look={FLOCKE_LOOK} uid="foto-flocke" box={{ x: 210, y: 240, width: 170 }} />
        <text x="210" y="452" textAnchor="middle" fontSize="16" fill="#5E4636" fontFamily="Courier New, monospace">
          Vorderseite
        </text>
      </g>

      {/* Rückseite mit Spiegelschrift */}
      <g transform="rotate(2 590 300)">
        <rect x="420" y="80" width="340" height="400" fill="#FBF8F1" stroke="#B9A381" strokeWidth="2" />
        <rect x="440" y="100" width="300" height="300" fill="#F3ECDD" stroke="#E0D2B6" strokeWidth="2" />
        <g transform="translate(1180 0) scale(-1 1)">
          {back.map((t, i) => (
            <text key={i} x="590" y={170 + i * 46} textAnchor="middle" fontSize="27" fontWeight="700" fill="#344638" opacity=".8" fontFamily="Comic Sans MS, Chalkboard SE, sans-serif">
              {t}
            </text>
          ))}
        </g>
        <text x="590" y="452" textAnchor="middle" fontSize="16" fill="#5E4636" fontFamily="Courier New, monospace">
          Rückseite
        </text>
      </g>
    </svg>
  );
}

/* =================================================================
   9 · Auflösung: Flocke in Box C im Alten Stall
   ================================================================= */
export function AlterStallScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Im Alten Stall: das weiße Pony Flocke in Box C">
      <defs>
        <radialGradient id="as-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#F7D58A" stopOpacity=".75" />
          <stop offset="1" stopColor="#F7D58A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="#4A3A30" />
      <g stroke="#3B2E26" strokeWidth="4">
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${i * 70} 0V440`} />
        ))}
      </g>
      <circle cx="300" cy="200" r="260" fill="url(#as-glow)" />
      <rect y="440" width="800" height="160" fill="#E3C47A" />
      <g stroke="#C9A15E" strokeWidth="3">
        {Array.from({ length: 30 }, (_, i) => (
          <path key={i} d={`M${(i * 53) % 800} ${460 + ((i * 31) % 120)}l24 ${i % 2 ? -6 : 6}`} />
        ))}
      </g>
      {/* Laterne */}
      <path d="M300 0v70" stroke="#2C2A24" strokeWidth="4" />
      <rect x="282" y="70" width="36" height="10" rx="2" fill="#6E3B3F" />
      <rect x="286" y="80" width="28" height="58" rx="5" fill="#FBEBC2" stroke="#2C2A24" strokeWidth="2.5" />
      <path d="M300 128c-8-6-8-16 0-28 8 12 8 22 0 28Z" fill="#E07A2E" />
      <rect x="282" y="138" width="36" height="12" rx="2" fill="#6E3B3F" />
      {/* Schild Box C + Spinnennetz */}
      <rect x="620" y="60" width="110" height="40" rx="5" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
      <text x="675" y="88" textAnchor="middle" fontSize="22" fontWeight="700" letterSpacing="2" fill="#2C2A24">
        BOX C
      </text>
      <g stroke="#E8DCC4" strokeWidth="1.4" fill="none" opacity=".7">
        <path d="M800 0l-70 70M800 0h-90M800 0v90M800 0l-84 34" />
        <path d="M776 0c0 14 10 24 24 24M750 0c0 28 22 50 50 50" />
      </g>
      {/* Boxenwand vorne links mit Wilhelm */}
      <rect x="0" y="360" width="250" height="240" fill="#6E3B3F" stroke={OUT} strokeWidth="3" />
      <rect x="0" y="350" width="260" height="16" fill="#5A2F33" />
      <path d="M50 366v234M100 366v234M150 366v234M200 366v234" stroke="#5A2F33" strokeWidth="3" />
      <g>
        <path d="M70 350c0-50 20-70 50-70s50 20 50 70Z" fill="#6E3B3F" stroke={OUT} strokeWidth="2" />
        <ellipse cx="120" cy="236" rx="34" ry="38" fill="#E7C2A0" />
        <path d="M84 222c0-26 16-38 36-38s38 12 38 38Z" fill="#344638" />
        <path d="M78 222h88c0 7-4 10-11 10H89c-6 0-11-3-11-10Z" fill="#344638" />
        <g transform="rotate(-28 160 222)">
          <rect x="150" y="218" width="36" height="9" rx="1" fill="#D9803E" stroke={OUT} strokeWidth="1.2" />
          <path d="M186 218l8 4.5-8 4.5Z" fill="#E8C9A0" />
        </g>
        <path d="M106 244c3-3 7-3 9 0M126 244c3-3 7-3 9 0" stroke="#2C2A24" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M100 258c7-6 14-4 20-2 6-2 13-4 20 2-7 5-14 4-20 3-6 1-13 2-20-3Z" fill="#B9AFA2" />
        {/* Schlüssel in der Hand */}
        <g transform="translate(140 290) rotate(30) scale(.95)">
          <ItemIcon name="schluessel" size={64} />
        </g>
      </g>
      {/* Flocke mit grünem Halfter, Decke und Karotte */}
      <Horse look={FLOCKE_LOOK} uid="as-flocke" box={{ x: 330, y: 210, width: 330 }} />
      <svg x={330} y={210} width={330} height={(330 * 292) / 320} viewBox="70 20 320 292" aria-hidden>
        <path d="M150 112c40-14 90-14 130-4l6 70c-40 10-96 10-136 0Z" fill="#344638" stroke="#26342A" strokeWidth="3" />
        <path d="M176 112v66M188 112v66" stroke="#C99A4E" strokeWidth="5" />
        <g fill="none" stroke="#4F6A47" strokeWidth="6" strokeLinecap="round">
          <path d="M318 58c4 22 14 44 30 58" />
          <path d="M338 104c8-6 20-4 26 6" />
        </g>
        <path d="M362 126l30 -6-26 16Z" fill="#E07A2E" stroke="#8C4A22" strokeWidth="1.5" />
      </svg>
      {/* Kater Moritz, Eimer, Kürbis */}
      <Moritz x={300} y={520} s={1.3} />
      <g transform="translate(680 470)">
        <ItemIcon name="eimer" size={80} />
      </g>
      <Pumpkin x={610} y={540} s={0.9} />
    </svg>
  );
}

/* =================================================================
   Titelbild: der Lindenhof in der Nacht vor Halloween (ruhig, nicht gruselig)
   ================================================================= */
export function GeisterstallCover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Der Lindenhof in einer nebligen Halloween-Nacht">
      <defs>
        <linearGradient id="gc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F2A24" />
          <stop offset="1" stopColor="#3A4A40" />
        </linearGradient>
        <radialGradient id="gc-moon" cx=".5" cy=".5" r=".5">
          <stop offset=".55" stopColor="#F2EEE6" stopOpacity=".35" />
          <stop offset="1" stopColor="#F2EEE6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gc-lamp" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#F7D58A" stopOpacity=".9" />
          <stop offset="1" stopColor="#F7D58A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#gc-sky)" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 137) % 800} cy={(i * 59) % 300} r={i % 3 ? 1.2 : 2} fill="#F2EEE6" opacity=".7" />
      ))}
      <circle cx="590" cy="170" r="150" fill="url(#gc-moon)" />
      <circle cx="590" cy="170" r="84" fill="#F2EEE6" />
      <circle cx="562" cy="150" r="14" fill="#E3DACB" />
      <circle cx="616" cy="196" r="10" fill="#E3DACB" />
      {/* Stall */}
      <path d="M70 300h330l60 80v130H40V380Z" fill="#141C17" />
      <path d="M190 300l50-50 50 50Z" fill="#141C17" />
      <rect x="226" y="268" width="28" height="36" rx="14" fill="#E3C47A" opacity=".9" />
      <path d="M240 250v-40M226 214c8-8 22-8 30 0l-10 4Z" stroke="#141C17" strokeWidth="5" fill="#141C17" />
      <circle cx="260" cy="430" r="80" fill="url(#gc-lamp)" />
      <rect x="244" y="406" width="34" height="34" fill="#F5D99A" />
      <path d="M261 406v34M244 423h34" stroke="#141C17" strokeWidth="3" />
      {[100, 150, 320, 370].map((x) => (
        <rect key={x} x={x} y="410" width="30" height="30" fill="#2A332D" />
      ))}
      {/* Flocke im Nebel */}
      <g opacity=".8">
        <Horse look={FLOCKE_LOOK} uid="cover-flocke" box={{ x: 470, y: 330, width: 230 }} />
      </g>
      {/* Nebelbänder */}
      <path d="M0 470c140-20 300 10 420-6s260-24 380-6v40H0Z" fill="#DDE3D6" opacity=".35" />
      <path d="M0 520c160-18 320 8 460-4s240-18 340-4v40H0Z" fill="#DDE3D6" opacity=".3" />
      {/* Zaun und Boden */}
      <rect y="540" width="800" height="60" fill="#141C17" />
      <path d="M0 520H800" stroke="#141C17" strokeWidth="6" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={20 + i * 70} y="500" width="8" height="50" fill="#141C17" />
      ))}
      <Pumpkin x={90} y={548} s={1.1} />
      <Pumpkin x={150} y={556} s={0.7} />
      <Moritz x={720} y={500} s={0.9} />
    </svg>
  );
}

/* Kleines Glyphen-Beispiel für den Geheimzettel als Bild (z. B. im Detektivbuch) */
export function GeheimzettelScene({ className }: { className?: string }) {
  const words = ["FLOCKE", "IN", "BOX", "C", "NUR", "HEU", "UND", "KAROTTEN"];
  let x = 60;
  let y = 200;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Ein zerknitterter Zettel mit Geheimzeichen">
      <rect width="800" height="600" fill="#EDE5D3" />
      <path d="M30 120l740-20 10 380-750 30Z" fill="#FBF8F1" stroke="#B9A381" strokeWidth="2" />
      <path d="M120 140l60 330M420 110l-40 380M640 120l30 360" stroke="#E6DCC8" strokeWidth="3" />
      {words.map((w) => {
        if (x + w.length * 46 > 760) {
          x = 60;
          y += 120;
        }
        const g = (
          <g key={w + x + y}>
            {w.split("").map((ch, i) => (
              <svg key={i} x={x + i * 46} y={y - 40} width="44" height="44" viewBox="0 0 40 40" color="#2C2A24">
                <CipherGlyph letter={ch} />
              </svg>
            ))}
          </g>
        );
        x += w.length * 46 + 34;
        return g;
      })}
    </svg>
  );
}
