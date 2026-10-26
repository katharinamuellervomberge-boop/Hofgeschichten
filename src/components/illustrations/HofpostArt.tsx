import { horses } from "@/content/horses";
import { HorseHead } from "./HorseHead";
import styles from "./HofpostArt.module.css";

/**
 * Titelbild der Hofpost: ein geöffneter Brief vom Hof mit Pferdefoto,
 * Wachssiegel, Briefmarke und Stickern (Markenpalette, Kinderbuch-Stil).
 * Drei Ebenen übereinander, damit der Pferdekopf im Brief steckt.
 */

const OUT = "#5E4636";
const PAPER = "#FBF8F1";

export function HofpostArt({ className, label = "Ein geöffneter Brief vom Hof mit einem Pferdefoto, einem Siegel und Stickern" }: { className?: string; label?: string }) {
  const tivoli = horses.find((h) => h.slug === "tivoli") ?? horses[0];
  return (
    <div className={className} role="img" aria-label={label} style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden" }}>
      {/* hinten: Hintergrund, Umschlag-Rückseite, Brief */}
      <svg viewBox="0 0 800 600" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
        <rect width="800" height="600" fill="#DDE3D6" />
        <circle cx="690" cy="96" r="58" fill="#F2DDB3" opacity=".75" />
        <path d="M0 520c120-28 260-34 400-26s280 22 400 6v100H0Z" fill="#C9D2BD" />
        <ellipse cx="400" cy="552" rx="262" ry="18" fill="#9FAE8A" opacity=".55" />
        {/* geöffnete Lasche */}
        <path d="M170 262 400 96l230 166Z" fill="#D9C6A5" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        {/* Rückwand */}
        <rect x="170" y="262" width="460" height="282" rx="6" fill="#C4AC84" stroke={OUT} strokeWidth="4" />
        {/* der Brief, leicht schräg */}
        <g transform="rotate(-3 400 275)">
          <rect x="215" y="112" width="370" height="330" rx="10" fill={PAPER} stroke={OUT} strokeWidth="3" />
          <rect x="245" y="135" width="160" height="130" rx="8" fill="#E8DCC4" stroke={OUT} strokeWidth="3" />
          {[150, 174, 198, 222].map((y, i) => (
            <path key={y} d={`M428 ${y}h${i === 3 ? 84 : 128}`} stroke="#C4AC84" strokeWidth="7" strokeLinecap="round" />
          ))}
          <path d="M428 248h56" stroke="#A4573A" strokeWidth="7" strokeLinecap="round" />
          {[292, 318].map((y) => (
            <path key={y} d={`M248 ${y}h300`} stroke="#E8DCC4" strokeWidth="7" strokeLinecap="round" />
          ))}
        </g>
      </svg>

      {/* Mitte: Pferdekopf im Foto des Briefs */}
      <div
        aria-hidden
        style={{ position: "absolute", left: `${(243 / 800) * 100}%`, top: `${(141 / 600) * 100}%`, width: `${(156 / 800) * 100}%`, height: `${(124 / 600) * 100}%`, transform: "rotate(-3deg)", borderRadius: "6px", overflow: "hidden", background: "#DDE3D6" }}
      >
        <HorseHead look={tivoli.look} mood="neugierig" className={styles.head} />
      </div>

      {/* vorne: Umschlagtasche, Siegel, Marke, Sticker */}
      <svg viewBox="0 0 800 600" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
        <path d="M170 304 400 434l230-130v234a6 6 0 0 1-6 6H176a6 6 0 0 1-6-6Z" fill="#E8DCC4" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M172 540 334 424M628 540 466 424" stroke={OUT} strokeWidth="3" opacity=".3" strokeLinecap="round" />
        {/* Adresse */}
        <text x="212" y="496" fontFamily="var(--font-display), Georgia, serif" fontSize="30" fontStyle="italic" fill={OUT}>
          Für dich!
        </text>
        <path d="M212 518h132" stroke="#80634D" strokeWidth="5" strokeLinecap="round" opacity=".45" />
        {/* Briefmarke */}
        <g transform="rotate(4 560 486)">
          <rect x="516" y="446" width="88" height="80" rx="4" fill={PAPER} stroke="#C4AC84" strokeWidth="5" strokeDasharray="6 5" />
          <rect x="526" y="456" width="68" height="60" rx="3" fill="#C99A4E" />
          <path d="M546 506v-20a14 14 0 0 1 28 0v20" fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round" /><circle cx="546" cy="500" r="1.8" fill="#C99A4E" /><circle cx="546" cy="489" r="1.8" fill="#C99A4E" /><circle cx="574" cy="500" r="1.8" fill="#C99A4E" /><circle cx="574" cy="489" r="1.8" fill="#C99A4E" />
        </g>
        {/* Wachssiegel mit Hufeisen */}
        <circle cx="400" cy="432" r="38" fill="#A4573A" stroke="#7E3F2A" strokeWidth="4" />
        <circle cx="400" cy="432" r="27" fill="none" stroke="#C97A5A" strokeWidth="2.5" opacity=".8" />
        <path d="M386 448v-18a14 14 0 0 1 28 0v18" fill="none" stroke="#F2DDB3" strokeWidth="7" strokeLinecap="round" /><circle cx="386" cy="442" r="1.8" fill="#A4573A" /><circle cx="386" cy="431" r="1.8" fill="#A4573A" /><circle cx="414" cy="442" r="1.8" fill="#A4573A" /><circle cx="414" cy="431" r="1.8" fill="#A4573A" />
        {/* Sticker */}
        <g transform="rotate(-10 120 190)">
          <circle cx="120" cy="190" r="44" fill={PAPER} stroke="#C4AC84" strokeWidth="3" />
          <path d="m120 160 9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3Z" fill="#C99A4E" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        </g>
        <g transform="rotate(8 690 300)">
          <circle cx="690" cy="300" r="42" fill={PAPER} stroke="#C4AC84" strokeWidth="3" />
          <path d="M690 324c-22-14-32-26-32-38a14 14 0 0 1 32-6 14 14 0 0 1 32 6c0 12-10 24-32 38Z" fill="#A4573A" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        </g>
        <g transform="rotate(-6 96 420)">
          <circle cx="96" cy="420" r="40" fill="#344638" stroke={OUT} strokeWidth="3" />
          <path d="M80 440v-20a16 16 0 0 1 32 0v20" fill="none" stroke="#F5F0E5" strokeWidth="8" strokeLinecap="round" /><circle cx="80" cy="434" r="2" fill="#344638" /><circle cx="80" cy="423" r="2" fill="#344638" /><circle cx="112" cy="434" r="2" fill="#344638" /><circle cx="112" cy="423" r="2" fill="#344638" />
        </g>
        {/* kleine Funkel */}
        {[[226, 70], [584, 60], [740, 440]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y - 12}v24M${x - 12} ${y}h24`} stroke="#C99A4E" strokeWidth="4" strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}
