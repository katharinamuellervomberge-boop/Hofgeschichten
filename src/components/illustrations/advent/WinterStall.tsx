import type { ReactNode } from "react";
import { horses } from "@/content/horses";
import { HorseHead } from "../HorseHead";
import { Puppy } from "../Puppy";

/**
 * Der Winterhof – Hauptbild des Adventskalenders (viewBox 0 0 800 600).
 *
 * Gleicher Stall wie in „Ein Tag auf dem Hof“ (HofTag.tsx: drei Boxen Tivoli · Scrabble · Tonga,
 * Giebel mit rundem Fenster), hier als Winterabend ohne Schnee, mit Raureif.
 * `decor` legt fest, welche Dekoration an welchem Platz hängt (content/advent/decor.ts).
 * `children` werden obenauf gezeichnet (z. B. versteckte Gegenstände in Suchbildern).
 */

const OUT = "#4A3328";
const GOLD = "#D4A84F";
const GOLD_LIGHT = "#F2D58A";
const BORDEAUX = "#7A2533";
const FIR = "#2F4A3A";
const FIR_LIGHT = "#4E6B52";
const look = (slug: string) => horses.find((h) => h.slug === slug)!.look;

/** Boxentüren: x-Position und Pferd */
export const STALL_DOORS = [
  { x: 185, horse: "tivoli", name: "Tivoli" },
  { x: 345, horse: "scrabble", name: "Scrabble" },
  { x: 505, horse: "tonga", name: "Tonga" },
] as const;
const DOOR_W = 110;

/** Punkte entlang der Dachkante (für Girlande und Lichter) */
function roofPoints(n: number): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = 140 + t * 520;
    const y = x <= 400 ? 226 - ((x - 140) / 260) * 140 : 86 + ((x - 400) / 260) * 140;
    pts.push([x, y]);
  }
  return pts;
}

export type CardLook = Record<string, string>;

/** Wo die Plätze im Bild liegen (für die Markierungen beim Schmücken) */
export const SLOT_POS: Record<string, { x: number; y: number }> = {
  giebel: { x: 400, y: 168 },
  traufe: { x: 262, y: 168 },
  lichter: { x: 538, y: 168 },
  sterne: { x: 485, y: 302 },
  schilder: { x: 240, y: 262 },
  schleifen: { x: 560, y: 410 },
  decken: { x: 400, y: 372 },
  karte: { x: 250, y: 400 },
  laternen: { x: 634, y: 320 },
  baum: { x: 78, y: 430 },
  geschenke: { x: 720, y: 484 },
  kruemel: { x: 400, y: 530 },
};

/** Bildausschnitt je Platz – für die kleinen Vorschaubilder beim Schmücken */
export const SLOT_CROP: Record<string, string> = {
  giebel: "315 88 170 150",
  traufe: "120 70 300 210",
  lichter: "120 70 560 280",
  sterne: "140 230 520 110",
  schilder: "175 236 300 120",
  schleifen: "175 340 450 110",
  decken: "175 330 450 120",
  karte: "190 330 130 120",
  laternen: "120 270 560 90",
  baum: "0 300 170 250",
  geschenke: "640 410 160 130",
  kruemel: "330 440 140 130",
};

type Props = {
  decor?: Record<string, string>;
  /** Gestaltung der Weihnachtskarte (für den Platz „karte“) */
  card?: CardLook;
  className?: string;
  label?: string;
  children?: ReactNode;
  /** Pferdeköpfe in den Boxen zeigen */
  horsesOut?: boolean;
  /** Bildausschnitt (Standard: ganzes Bild) */
  viewBox?: string;
};

export function WinterStall({ decor = {}, card, className, label, children, horsesOut = true, viewBox = "0 0 800 600" }: Props) {
  const has = (slot: string) => decor[slot];
  const lit = Boolean(decor.lichter || decor.laternen || decor.baum === "baum-lichter");
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={label ?? "Der Winterhof am Abend: Stall mit den Boxen von Tivoli, Scrabble und Tonga"}>
      <defs>
        <linearGradient id="wh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F3236" />
          <stop offset=".55" stopColor="#4C5A6A" />
          <stop offset="1" stopColor="#D9A983" />
        </linearGradient>
        <radialGradient id="wh-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFE3A3" stopOpacity=".85" />
          <stop offset="1" stopColor="#FFE3A3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wh-window" cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#FFE7B0" />
          <stop offset="1" stopColor="#E3A55A" />
        </radialGradient>
        <linearGradient id="wh-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset=".55" stopColor={GOLD} />
          <stop offset="1" stopColor="#A67C2E" />
        </linearGradient>
      </defs>

      {/* Himmel, Sterne, Mondsichel */}
      <rect width="800" height="600" fill="url(#wh-sky)" />
      {[[60, 50], [150, 92], [236, 34], [300, 110], [520, 46], [600, 96], [690, 30], [748, 120], [470, 20], [96, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.8} fill="#FBF3DF" opacity={0.75 + (i % 2) * 0.2} />
      ))}
      <path d="M676 74a26 26 0 1 0 22 40 21 21 0 1 1-22-40Z" fill="#F4E6C2" opacity=".9" />

      {/* Hügel mit Tannen */}
      <path d="M0 330c90-40 210-52 330-40s250-6 330-30 110-6 140 10v150H0Z" fill="#3F5446" />
      {[[30, 318, 1], [70, 300, 1.3], [112, 312, 0.9], [640, 286, 1.2], [690, 278, 1.5], [742, 292, 1.1], [776, 300, 0.9]].map(([x, y, s], i) => (
        <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0-44 14-16H7l12 18H5l11 16H-16l11-16h-14l12-18h-7Z" fill={FIR} />
      ))}

      {/* Boden mit Raureif */}
      <path d="M0 430h800v170H0Z" fill="#8C7A62" />
      <path d="M0 444c200-10 480 8 800-6v16c-300 12-560-6-800 6Z" fill="#A99880" opacity=".7" />
      {[[40, 520], [120, 570], [250, 552], [330, 586], [470, 560], [560, 590], [650, 548], [760, 574], [710, 512], [90, 470], [520, 478]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}h14M${x + 4} ${y + 6}h10`} stroke="#E8E2D4" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
      ))}

      {/* Licht auf dem Boden, wenn es leuchtet */}
      {lit && <ellipse cx="400" cy="470" rx="330" ry="46" fill="url(#wh-glow)" opacity=".55" />}

      {/* Der Stall */}
      <g>
        <path d="M150 440V226L400 92l250 134v214Z" fill="#9A6A4C" stroke={OUT} strokeWidth="3" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M150 ${250 + i * 22}h500`} stroke="#85593E" strokeWidth="2" opacity=".55" />
        ))}
        <path d="M122 236 400 80l278 156-14 16L400 104 136 252Z" fill="#2B3F33" stroke={OUT} strokeWidth="2" />
        {/* Raureif auf dem Dach */}
        <path d="M128 238 400 86l272 152" fill="none" stroke="#E7E4DA" strokeWidth="3" opacity=".6" strokeDasharray="10 7" />
        {/* rundes Giebelfenster */}
        <circle cx="400" cy="168" r="26" fill="url(#wh-window)" stroke={OUT} strokeWidth="3" />
        <path d="M400 142v52M374 168h52" stroke={OUT} strokeWidth="3" />
        {/* Boxen */}
        {STALL_DOORS.map((d, i) => (
          <g key={d.horse}>
            <rect x={d.x} y="282" width={DOOR_W} height="158" rx="4" fill="#5E4636" stroke={OUT} strokeWidth="2.5" />
            <rect x={d.x + 6} y="288" width={DOOR_W - 12} height="66" fill="#2A211C" />
            {horsesOut && (
              <svg x={d.x + (i === 1 ? -2 : 6)} y="262" width="104" height="96" viewBox="0 0 260 240">
                <g transform={i === 2 ? "translate(260 0) scale(-1 1)" : undefined}>
                  <HorseHead look={look(d.horse)} mood={i === 1 ? "entspannt" : "neugierig"} title={d.name} />
                </g>
              </svg>
            )}
            <rect x={d.x} y="354" width={DOOR_W} height="86" fill="#6E5140" stroke={OUT} strokeWidth="2.5" />
            <path d={`M${d.x + 8} 362l${DOOR_W - 16} 70M${d.x + DOOR_W - 8} 362l-${DOOR_W - 16} 70`} stroke="#93694C" strokeWidth="6" strokeLinecap="round" />
            <rect x={d.x - 2} y="350" width={DOOR_W + 4} height="8" rx="2" fill="#4A3328" />
            {/* schlichtes Namensschild */}
            {!has("schilder") && (
              <g>
                <rect x={d.x + 18} y="252" width={DOOR_W - 36} height="22" rx="4" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
                <text x={d.x + DOOR_W / 2} y="268" textAnchor="middle" fontSize="14" fontFamily="var(--font-body), sans-serif" fill="#344638" fontWeight="700">
                  {d.name}
                </text>
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Heuballen und Holzbank (immer da) */}
      <g>
        <rect x="186" y="466" width="104" height="58" rx="12" fill="#E3C47A" stroke={OUT} strokeWidth="3" />
        <path d="M196 484h84M194 498h88M198 511h80" stroke="#B8954D" strokeWidth="3" strokeLinecap="round" />
        <path d="M222 466v58M256 466v58" stroke={BORDEAUX} strokeWidth="3" />
      </g>

      {/* ---------- Dekorationen ---------- */}
      {has("traufe") && <Garland />}
      {has("lichter") && <Lights />}
      {decor.sterne && <Stars gold={decor.sterne === "sterne-gold"} />}
      {has("schilder") && <FestivePlates />}
      {decor.decken && <Blankets color={decor.decken === "decke-gruen" ? "#2F4A3A" : BORDEAUX} />}
      {decor.schleifen && <DoorBows color={decor.schleifen === "schleifen-gold" ? GOLD : "#B5323F"} />}
      {has("karte") && <TivoliCard card={card ?? {}} />}
      {decor.giebel === "adventskranz" && <Wreath />}
      {decor.giebel === "stern-gross" && <BigStar />}
      {decor.giebel === "hufeisen-gold" && <GoldenShoeCrest />}
      {has("laternen") && <Lanterns />}
      {decor.baum && <Tree lit={decor.baum === "baum-lichter"} />}
      {has("geschenke") && <Gifts />}

      {/* Krümel sitzt vorn – weit weg von den Pferden */}
      <g transform="translate(350 452) scale(.82)">
        <Puppy />
        {has("kruemel") && (
          <g transform="translate(60 74)">
            <path d="M0 0-16-9v18Z M0 0 16-9v18Z" fill="#B5323F" stroke={OUT} strokeWidth="2" strokeLinejoin="round" />
            <circle r="5" fill="#8E2530" stroke={OUT} strokeWidth="2" />
          </g>
        )}
      </g>

      {children}
    </svg>
  );
}

/* ---------- einzelne Dekorationen ---------- */

function Garland() {
  const pts = roofPoints(26);
  const d = pts.map(([x, y], i) => (i === 0 ? `M${x} ${y + 10}` : `Q${(pts[i - 1][0] + x) / 2} ${(pts[i - 1][1] + y) / 2 + 22} ${x} ${y + 10}`)).join(" ");
  return (
    <g>
      <path d={d} fill="none" stroke={FIR} strokeWidth="13" strokeLinecap="round" />
      <path d={d} fill="none" stroke={FIR_LIGHT} strokeWidth="5" strokeDasharray="3 6" strokeLinecap="round" />
      {pts.filter((_, i) => i % 3 === 0).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x - 4} cy={y + 14} r="4" fill="#B5323F" />
          <circle cx={x + 3} cy={y + 16} r="4" fill="#C8414B" />
        </g>
      ))}
    </g>
  );
}

function Lights() {
  const pts = roofPoints(30);
  return (
    <g>
      <path d={pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y + 20}`).join("")} fill="none" stroke="#2A2A24" strokeWidth="1.5" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 24} r="12" fill="url(#wh-glow)" />
          <circle cx={x} cy={y + 24} r="3.6" fill={i % 2 ? "#FFE7A8" : "#FFD27A"} />
        </g>
      ))}
      {/* Lichterkette über den Boxen */}
      {Array.from({ length: 21 }, (_, i) => {
        const x = 170 + i * 23;
        const y = 240 + Math.sin(i * 0.9) * 3;
        return (
          <g key={`b${i}`}>
            <circle cx={x} cy={y} r="10" fill="url(#wh-glow)" />
            <circle cx={x} cy={y} r="3.2" fill="#FFE7A8" />
          </g>
        );
      })}
    </g>
  );
}

function star(cx: number, cy: number, r: number) {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    p.push(`${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${p.join("L")}Z`;
}

function Stars({ gold }: { gold: boolean }) {
  const spots = [
    [315, 300],
    [485, 300],
    [168, 268],
    [632, 268],
  ];
  return (
    <g>
      {spots.map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} 236V${y - 16}`} stroke="#C9B48F" strokeWidth="1.5" />
          {gold ? (
            <path d={star(x, y, 16)} fill="url(#wh-gold)" stroke="#8C6A28" strokeWidth="1.5" strokeLinejoin="round" />
          ) : (
            <g stroke="#E6C77A" strokeWidth="3" strokeLinecap="round">
              {[0, 45, 90, 135].map((a) => (
                <path key={a} transform={`rotate(${a} ${x} ${y})`} d={`M${x - 16} ${y}h32`} />
              ))}
              <circle cx={x} cy={y} r="4" fill={BORDEAUX} stroke="none" />
            </g>
          )}
        </g>
      ))}
    </g>
  );
}

function FestivePlates() {
  return (
    <g>
      {STALL_DOORS.map((d) => (
        <g key={d.horse}>
          <path d={`M${d.x + 12} 250h${DOOR_W - 24}l6 12-6 12H${d.x + 12}l-6-12Z`} fill="#7A5338" stroke={OUT} strokeWidth="2" />
          <text x={d.x + DOOR_W / 2} y="267" textAnchor="middle" fontSize="15" fontFamily="var(--font-display), serif" fill="#F6EBD2" fontWeight="700">
            {d.name}
          </text>
          {/* Ilex */}
          <path d={`M${d.x + 6} 252c8-6 16-2 14 6-8 2-12-2-14-6Z`} fill={FIR_LIGHT} />
          <circle cx={d.x + 12} cy="258" r="3.4" fill="#C8414B" />
          <circle cx={d.x + 17} cy="261" r="3" fill="#B5323F" />
        </g>
      ))}
    </g>
  );
}

function Blankets({ color }: { color: string }) {
  return (
    <g>
      {STALL_DOORS.map((d) => (
        <g key={d.horse}>
          <path d={`M${d.x + 4} 356h${DOOR_W - 8}v30c-18 6-36 4-${(DOOR_W - 8) / 2} 8-${(DOOR_W - 8) / 2 - 18}-6-${(DOOR_W - 8) / 2}-2-${(DOOR_W - 8) / 2}-6Z`} fill={color} stroke={OUT} strokeWidth="2" />
          <path d={`M${d.x + 4} 382c18 4 36 2 ${(DOOR_W - 8) / 2} 6 ${(DOOR_W - 8) / 2 - 18}-6 ${(DOOR_W - 8) / 2}-2 ${(DOOR_W - 8) / 2}-6`} fill="none" stroke={GOLD} strokeWidth="3" />
          <path d={`M${d.x + DOOR_W / 2 - 8} 368l8-6 8 6-8 6Z`} fill={GOLD} />
        </g>
      ))}
    </g>
  );
}

function DoorBows({ color }: { color: string }) {
  return (
    <g>
      {STALL_DOORS.map((d) => {
        const x = d.x + DOOR_W / 2;
        const y = 404;
        return (
          <g key={d.horse}>
            <path d={`M${x} ${y}c-18-14-30-4-24 6 6 8 18 2 24-6Zm0 0c18-14 30-4 24 6-6 8-18 2-24-6Z`} fill={color} stroke={OUT} strokeWidth="2" />
            <path d={`M${x - 3} ${y + 2}l-10 22M${x + 3} ${y + 2}l10 22`} stroke={color} strokeWidth="6" strokeLinecap="round" />
            <circle cx={x} cy={y} r="5" fill={color} stroke={OUT} strokeWidth="2" />
          </g>
        );
      })}
    </g>
  );
}

const CARD_PAPER: Record<string, string> = { creme: "#F6EFDF", tanne: "#2F4A3A", bordeaux: BORDEAUX, nacht: "#24324A" };

function TivoliCard({ card }: { card: CardLook }) {
  const paper = CARD_PAPER[card.papier ?? "creme"] ?? CARD_PAPER.creme;
  return (
    <g transform="translate(250 398) rotate(-6)">
      <rect x="-18" y="-22" width="36" height="44" rx="2" fill={paper} stroke={GOLD} strokeWidth="2.5" />
      <path d={star(0, -4, 9)} fill="url(#wh-gold)" />
      <path d="M-10 12h20" stroke={paper === "#F6EFDF" ? BORDEAUX : "#F6EFDF"} strokeWidth="2" />
      <path d="M0-22v-8" stroke="#C9B48F" strokeWidth="1.5" />
    </g>
  );
}

function Wreath() {
  return (
    <g>
      <path d="M400 104 362 168M400 104l38 64M400 104v58" stroke="#B5323F" strokeWidth="2.5" />
      <ellipse cx="400" cy="178" rx="50" ry="15" fill="none" stroke={FIR} strokeWidth="16" />
      <ellipse cx="400" cy="178" rx="50" ry="15" fill="none" stroke={FIR_LIGHT} strokeWidth="6" strokeDasharray="2 5" />
      {[[-38, 4], [-14, 13], [14, 13], [38, 4]].map(([dx, dy], i) => (
        <g key={i}>
          <rect x={400 + dx - 5} y={178 + dy - 30} width="10" height="26" rx="2" fill="#F6EFDF" stroke={OUT} strokeWidth="1.5" />
          <circle cx={400 + dx} cy={178 + dy - 36} r="9" fill="url(#wh-glow)" />
          <path d={`M${400 + dx} ${178 + dy - 41}c4 4 3 8 0 9-3-1-4-5 0-9Z`} fill="#FFD27A" />
        </g>
      ))}
      {[[-24, 18], [0, 22], [24, 18], [-48, 8], [48, 8]].map(([dx, dy], i) => (
        <circle key={i} cx={400 + dx} cy={168 + dy} r="4" fill="#C8414B" />
      ))}
      <path d="M400 192c-14 6-18 18-10 22l10-14 10 14c8-4 4-16-10-22Z" fill={BORDEAUX} />
    </g>
  );
}

function BigStar() {
  return (
    <g>
      <circle cx="400" cy="168" r="58" fill="url(#wh-glow)" />
      <path d={star(400, 168, 40)} fill="url(#wh-gold)" stroke="#8C6A28" strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

function GoldenShoeCrest() {
  return (
    <g>
      <circle cx="400" cy="168" r="60" fill="url(#wh-glow)" />
      <circle cx="400" cy="168" r="40" fill="none" stroke={FIR} strokeWidth="14" />
      <circle cx="400" cy="168" r="40" fill="none" stroke={FIR_LIGHT} strokeWidth="5" strokeDasharray="2 5" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={400 + Math.cos((a * Math.PI) / 180) * 40} cy={168 + Math.sin((a * Math.PI) / 180) * 40} r="4" fill="#C8414B" />
      ))}
      <g transform="translate(400 170) scale(1.15)">
        <GoldShoePath />
      </g>
    </g>
  );
}

/** Goldenes Hufeisen (Öffnung nach unten), Mittelpunkt im Ursprung, ca. 40 × 44 */
export function GoldShoePath({ shine = true, fill = "url(#wh-gold)" }: { shine?: boolean; fill?: string }) {
  return (
    <g>
      <path d="M-20 20V-2a20 20 0 0 1 40 0v22h-9V-2a11 11 0 0 0-22 0v22Z" fill={fill} stroke="#8C6A28" strokeWidth="2" strokeLinejoin="round" />
      {[[-15.5, 12], [-15.5, 2], [15.5, 12], [15.5, 2], [-10, -12], [10, -12]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#8C6A28" />
      ))}
      {shine && <path d="M-14-8a15 15 0 0 1 8-8" stroke="#FFF4CF" strokeWidth="2.4" strokeLinecap="round" fill="none" />}
    </g>
  );
}

function Lanterns() {
  return (
    <g>
      {[166, 634].map((x) => (
        <g key={x}>
          <path d={`M${x} 286v12`} stroke={OUT} strokeWidth="3" />
          <circle cx={x} cy="320" r="34" fill="url(#wh-glow)" />
          <path d={`M${x - 10} 298h20l4 8h-28Z`} fill="#A67C2E" stroke={OUT} strokeWidth="2" />
          <rect x={x - 11} y="306" width="22" height="28" rx="3" fill="#FFE3A3" stroke="#A67C2E" strokeWidth="3" />
          <path d={`M${x} 306v28`} stroke="#A67C2E" strokeWidth="2" />
          <path d={`M${x - 13} 334h26v5h-26Z`} fill="#A67C2E" stroke={OUT} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}

function Tree({ lit }: { lit: boolean }) {
  return (
    <g transform="translate(78 0)">
      <rect x="-7" y="486" width="14" height="22" fill="#6E5140" />
      <path d="M-32 508h64l-6 24h-52Z" fill={BORDEAUX} stroke={OUT} strokeWidth="2" />
      <path d="M0 330 42 412H22l34 46H30l34 40h-128l34-40h-26l34-46h-20Z" fill={FIR} stroke="#22362A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M-30 404c20 8 40 8 58 0M-40 452c26 10 56 10 80 0M-52 494c30 10 72 10 104 0" fill="none" stroke={FIR_LIGHT} strokeWidth="3" opacity=".7" />
      {lit && (
        <g>
          {[[-14, 392], [16, 420], [-26, 446], [8, 470], [34, 478], [-40, 488], [22, 444], [-4, 430]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="11" fill="url(#wh-glow)" />
              <circle cx={x} cy={y} r="5.5" fill={i % 3 === 0 ? "#B5323F" : i % 3 === 1 ? GOLD : "#F6EFDF"} stroke={OUT} strokeWidth="1" />
            </g>
          ))}
          <circle cx="0" cy="326" r="20" fill="url(#wh-glow)" />
          <path d={star(0, 326, 13)} fill="url(#wh-gold)" stroke="#8C6A28" strokeWidth="1.5" />
        </g>
      )}
    </g>
  );
}

function Gifts() {
  return (
    <g>
      <rect x="668" y="470" width="62" height="52" rx="3" fill={BORDEAUX} stroke={OUT} strokeWidth="2.5" />
      <path d="M699 470v52M668 494h62" stroke={GOLD} strokeWidth="6" />
      <rect x="724" y="486" width="50" height="36" rx="3" fill="#2F4A3A" stroke={OUT} strokeWidth="2.5" />
      <path d="M749 486v36M724 502h50" stroke="#F6EFDF" strokeWidth="5" />
      <rect x="686" y="436" width="44" height="34" rx="3" fill="#F6EFDF" stroke={OUT} strokeWidth="2.5" />
      <path d="M708 436v34" stroke="#B5323F" strokeWidth="6" />
      <path d="M708 436c-12-12-22-4-16 2 4 4 12 2 16-2Zm0 0c12-12 22-4 16 2-4 4-12 2-16-2Z" fill="#B5323F" stroke={OUT} strokeWidth="1.5" />
      <path d="M699 470c-10-10-18-4-13 2 3 3 9 2 13-2Zm0 0c10-10 18-4 13 2-3 3-9 2-13-2Z" fill={GOLD} stroke={OUT} strokeWidth="1.5" />
    </g>
  );
}
