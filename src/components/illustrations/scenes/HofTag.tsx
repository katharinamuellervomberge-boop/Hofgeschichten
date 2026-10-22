import { horses } from "@/content/horses";
import { Horse } from "../Horse";
import { Puppy } from "../Puppy";

/**
 * Szenen für das Hofspiel „Ein Tag auf dem Hof“ (viewBox 0 0 800 600).
 * Die Koordinaten der Suchbild-Ziele stehen in HT_SPOTS – Inhalt und Bild
 * verwenden so immer dieselben Punkte.
 */

export const HT_SPOTS = {
  stallbox: {
    mist1: { x: 228, y: 486, r: 46 },
    mist2: { x: 548, y: 520, r: 46 },
    mist3: { x: 404, y: 430, r: 42 },
    nass: { x: 640, y: 448, r: 54 },
    traenke: { x: 676, y: 262, r: 46 },
    heu: { x: 132, y: 250, r: 58 },
    sauber: { x: 320, y: 556, r: 40 },
  },
  weide: {
    latte: { x: 214, y: 318, r: 46 },
    tor: { x: 610, y: 312, r: 60 },
    tuete: { x: 404, y: 300, r: 36 },
    wasser: { x: 120, y: 470, r: 52 },
    baum: { x: 734, y: 190, r: 52 },
  },
} as const;

const OUT = "#5E4636";
const look = (slug: string) => horses.find((h) => h.slug === slug)!.look;

function Stable({ dusk }: { dusk?: boolean }) {
  const door = (x: number, name: string, k: string) => (
    <g key={k}>
      <rect x={x} y="250" width="96" height="130" rx="4" fill="#5E4636" />
      <rect x={x} y="250" width="96" height="58" fill={dusk ? "#3B2A20" : "#2C2A24"} />
      <path d={`M${x} 312h96M${x + 48} 312v68`} stroke="#80634D" strokeWidth="4" />
      <path d={`M${x + 6} 318l40 56M${x + 90} 318l-40 56`} stroke="#9A6A4C" strokeWidth="5" />
      <rect x={x + 14} y="226" width="68" height="20" rx="4" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
      <text x={x + 48} y="241" textAnchor="middle" fontSize="14" fontFamily="var(--font-body), sans-serif" fill="#344638" fontWeight="700">
        {name}
      </text>
    </g>
  );
  return (
    <g>
      <path d="M120 390V200l230-110 230 110v190Z" fill="#9A6A4C" stroke={OUT} strokeWidth="3" />
      <path d="M100 210 350 82l250 128-12 14L350 104 112 224Z" fill="#344638" />
      <path d="M150 230h400" stroke="#80634D" strokeWidth="3" opacity=".5" />
      {door(160, "Tivoli", "d1")}
      {door(302, "Scrabble", "d2")}
      {door(444, "Tonga", "d3")}
      <circle cx="350" cy="160" r="22" fill={dusk ? "#F2C46B" : "#E8E6D8"} stroke={OUT} strokeWidth="3" />
      <path d="M350 146v14l10 6" stroke={OUT} strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Yard({ dusk, label, className }: { dusk?: boolean; label: string; className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id={dusk ? "ht-sky-d" : "ht-sky-m"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dusk ? "#6E6A8E" : "#F3DDBF"} />
          <stop offset="1" stopColor={dusk ? "#E7B48A" : "#F5F0E5"} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${dusk ? "ht-sky-d" : "ht-sky-m"})`} />
      <circle cx={dusk ? 690 : 110} cy={dusk ? 250 : 120} r="46" fill={dusk ? "#F2A65A" : "#F6D58C"} opacity=".95" />
      {dusk && [[90, 70], [200, 40], [420, 60], [560, 30], [720, 90]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#FBF8F1" />)}
      <path d="M0 300c160-50 320-30 460-40s240-30 340 10v60H0Z" fill={dusk ? "#7C8A6C" : "#B8C1A4"} />
      <Stable dusk={dusk} />
      <path d="M0 380h800v220H0Z" fill={dusk ? "#8E7A60" : "#C9B48F"} />
      <path d="M0 410c240-10 520 6 800-4v20c-300 10-560-4-800 6Z" fill="#B49B76" opacity=".6" />
      {/* Wassertrog */}
      <g>
        <path d="M600 420h150l-10 52H610Z" fill="#9BA79A" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="675" cy="420" rx="75" ry="8" fill="#8FB3BE" stroke={OUT} strokeWidth="2.5" />
      </g>
      {/* Heuballen */}
      <g>
        <rect x="40" y="420" width="110" height="64" rx="12" fill="#E3C47A" stroke={OUT} strokeWidth="3" />
        <path d="M50 440h90M48 456h94M52 470h86" stroke="#B8954D" strokeWidth="3" strokeLinecap="round" />
        <path d="M78 420v64M112 420v64" stroke="#A4573A" strokeWidth="3" />
      </g>
      {/* Krümel begrüßt dich – weit weg von den Pferden */}
      <g transform="translate(330 420) scale(1.05)">
        <Puppy />
      </g>
      {dusk && (
        <g>
          <rect x="586" y="300" width="24" height="34" rx="4" fill="#F6D58C" stroke={OUT} strokeWidth="2.5" />
          <path d="M598 300v-16" stroke={OUT} strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}

export function HofMorgenScene({ className }: { className?: string }) {
  return <Yard className={className} label="Der Hof am Morgen: Stall mit drei Boxen, Heuballen, Wassertrog und Krümel" />;
}

export function HofAbendScene({ className }: { className?: string }) {
  return <Yard dusk className={className} label="Der Hof am Abend: Die Stalllaterne brennt" />;
}

/** Innenansicht einer Stallbox: Heuraufe, Tränke, Einstreu mit Pferdeäpfeln und einer nassen Stelle. */
export function StallboxScene({ className }: { className?: string }) {
  const s = HT_SPOTS.stallbox;
  const apple = (cx: number, cy: number, k: string) => (
    <g key={k}>
      {[
        [-18, 6],
        [0, 10],
        [18, 4],
        [-8, -8],
        [10, -6],
      ].map(([dx, dy], i) => (
        <ellipse key={i} cx={cx + dx} cy={cy + dy} rx="13" ry="10" fill="#6A5236" stroke="#4A3426" strokeWidth="2" />
      ))}
      <path d={`M${cx - 10} ${cy - 18}c2-6 6-8 10-6M${cx + 6} ${cy - 20}c2-6 6-6 8-2`} stroke="#9A9893" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" />
    </g>
  );
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Eine Stallbox von innen">
      <rect width="800" height="600" fill="#B88A64" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M0 ${40 + i * 40}h800`} stroke="#9A6A4C" strokeWidth="3" />
      ))}
      {/* Fenster */}
      <rect x="320" y="80" width="160" height="110" rx="6" fill="#DDE3D6" stroke={OUT} strokeWidth="5" />
      <path d="M400 80v110M320 135h160" stroke={OUT} strokeWidth="4" />
      <path d="M330 180c30-30 70-40 140-36v46H330Z" fill="#B8C1A4" />
      {/* Heuraufe links */}
      <g>
        <path d="M60 180h150l-20 120H80Z" fill="#E3C47A" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        {[80, 104, 128, 152, 176].map((x) => (
          <path key={x} d={`M${x} 180l${(x - 132) * -0.12} 120`} stroke="#5E4636" strokeWidth="4" />
        ))}
        <path d="M60 180h150" stroke="#4A4540" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* Selbsttränke rechts */}
      <g>
        <path d="M640 240h72l-8 46h-56Z" fill="#9BA79A" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="676" cy="242" rx="36" ry="7" fill="#8FB3BE" stroke={OUT} strokeWidth="2.5" />
        <path d="M676 200v34" stroke="#4A4540" strokeWidth="6" strokeLinecap="round" />
        <circle cx="676" cy="198" r="8" fill="#4A4540" />
      </g>
      {/* Einstreu */}
      <path d="M0 360c150-20 300-10 420-14s260-6 380 6v248H0Z" fill="#EBD48E" />
      {Array.from({ length: 70 }, (_, i) => {
        const x = (i * 97) % 800;
        const y = 380 + ((i * 53) % 210);
        return <path key={i} d={`M${x} ${y}l${14 + (i % 3) * 4} ${(i % 2 ? -1 : 1) * 5}`} stroke="#C9A75A" strokeWidth="2.5" strokeLinecap="round" />;
      })}
      {/* nasse Stelle */}
      <ellipse cx={s.nass.x} cy={s.nass.y} rx="62" ry="28" fill="#A8925A" opacity=".85" />
      <ellipse cx={s.nass.x + 10} cy={s.nass.y + 4} rx="40" ry="16" fill="#97834F" opacity=".7" />
      {apple(s.mist1.x, s.mist1.y, "m1")}
      {apple(s.mist2.x, s.mist2.y, "m2")}
      {apple(s.mist3.x, s.mist3.y, "m3")}
    </svg>
  );
}

/** Weide mit Holzzaun: eine Latte ist gebrochen, das Tor steht offen, eine Plastiktüte hängt im Zaun. */
export function WeideScene({ className }: { className?: string }) {
  const s = HT_SPOTS.weide;
  const posts = [40, 140, 290, 400, 500, 600, 700, 780];
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Die Weide mit Zaun und Tor">
      <rect width="800" height="600" fill="#E9EEE0" />
      <path d="M0 220c140-40 320-50 480-30s240 0 320-20v80H0Z" fill="#AFBA97" />
      {/* Baum mit Schatten */}
      <g>
        <path d="M730 300v-90" stroke="#5E4636" strokeWidth="18" strokeLinecap="round" />
        <circle cx={s.baum.x} cy={s.baum.y - 20} r="60" fill="#6F8660" />
        <circle cx={s.baum.x - 40} cy={s.baum.y} r="40" fill="#7E9468" />
      </g>
      <path d="M0 250h800v350H0Z" fill="#9FAE8A" />
      <path d="M0 400c200-14 500 10 800-6v206H0Z" fill="#8FA07A" />
      {/* Pferde grasen ruhig in der Ferne */}
      <Horse look={look("tivoli")} uid="ht-w-tivoli" box={{ x: 250, y: 380, width: 170 }} />
      <Horse look={look("scrabble")} uid="ht-w-scrabble" box={{ x: 450, y: 370, width: 200 }} />
      <Horse look={look("tonga")} uid="ht-w-tonga" box={{ x: 600, y: 420, width: 170 }} />
      {/* Wasserwanne */}
      <g>
        <path d={`M${s.wasser.x - 60} 460h120l-10 40H${s.wasser.x - 50}Z`} fill="#9BA79A" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx={s.wasser.x} cy="460" rx="60" ry="7" fill="#8FB3BE" stroke={OUT} strokeWidth="2.5" />
      </g>
      {/* Zaun */}
      <g stroke="#80634D" strokeLinecap="round">
        {posts.map((x) => (
          <path key={x} d={`M${x} 240v110`} strokeWidth="12" />
        ))}
        <path d="M40 270H140M290 270H580M40 318H140M290 318h290" strokeWidth="8" stroke="#C4AC84" />
        {/* gebrochene Latte zwischen 140 und 290 */}
        <path d="M140 270h150" strokeWidth="8" stroke="#C4AC84" />
        <path d="M140 318l56 6M232 330l58-12" strokeWidth="8" stroke="#C4AC84" />
        <path d="M196 324l8 10M232 330l-8 8" strokeWidth="4" stroke="#9A6A4C" />
      </g>
      {/* offenes Tor */}
      <g stroke="#80634D" strokeLinecap="round">
        <path d="M600 240v110M700 240v110" strokeWidth="12" />
        <path d="M600 262l-70 40M600 300l-70 40M600 336l-70 24M600 262l-70 98" strokeWidth="7" stroke="#C4AC84" />
      </g>
      {/* Plastiktüte im Zaun */}
      <path d={`M${s.tuete.x - 20} ${s.tuete.y - 22}c10-6 30-4 38 4l-6 34c-10 6-24 4-32-2Z`} fill="#F7F3EC" stroke="#A9A398" strokeWidth="2.5" />
      <path d={`M${s.tuete.x - 10} ${s.tuete.y - 26}c2-6 8-8 12-4`} stroke="#A9A398" strokeWidth="2.5" fill="none" />
    </svg>
  );
}
