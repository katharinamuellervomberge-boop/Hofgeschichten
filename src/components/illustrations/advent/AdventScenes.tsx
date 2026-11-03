import type { ReactNode } from "react";
import { horses } from "@/content/horses";
import { HorseHead } from "../HorseHead";
import { ItemIcon, type ItemName } from "../ItemIcons";
import { Puppy } from "../Puppy";
import { GoldShoePath, WinterStall } from "./WinterStall";

/**
 * Suchbilder des Adventskalenders (viewBox 0 0 800 600).
 * Die Koordinaten der Ziele stehen in WH_SPOTS – Inhalt (doors.server.ts) und Bild
 * verwenden so immer dieselben Punkte.
 */

export const WH_SPOTS = {
  /** Türchen 1: Stallgasse – das erste goldene Hufeisen und der Brief */
  brief: {
    hufeisen: { x: 726, y: 462, r: 40 },
    brief: { x: 478, y: 222, r: 34 },
    glueck: { x: 120, y: 112, r: 32 },
    tonne: { x: 560, y: 410, r: 44 },
  },
  /** Türchen 3: Hof – Bens Mütze und die alte Dose */
  muetze: {
    muetze: { x: 238, y: 470, r: 40 },
    dose: { x: 744, y: 498, r: 38 },
    handschuh: { x: 640, y: 470, r: 30 },
    schal: { x: 100, y: 484, r: 34 },
  },
  /** Türchen 18: Stallgasse – Krümels Weihnachtsmission */
  mission: {
    zweig: { x: 470, y: 470, r: 40 },
    lichter: { x: 250, y: 488, r: 36 },
    laterne: { x: 580, y: 194, r: 34 },
    band: { x: 350, y: 478, r: 36 },
    moehren: { x: 640, y: 520, r: 38 },
    pinsel: { x: 724, y: 466, r: 36 },
  },
  /** Türchen 21: Stallgasse – sechs heruntergefallene Hufeisen */
  hufeisen: {
    h1: { x: 512, y: 532, r: 32 },
    h2: { x: 350, y: 470, r: 32 },
    h3: { x: 610, y: 200, r: 30 },
    h4: { x: 606, y: 448, r: 30 },
    h5: { x: 250, y: 486, r: 30 },
    h6: { x: 724, y: 468, r: 32 },
    glueck: { x: 120, y: 112, r: 32 },
  },
} as const;

const OUT = "#4A3328";

/** Kleines Symbol in einer Szene */
function Item({ name, x, y, size = 48, rotate = 0 }: { name: ItemName; x: number; y: number; size?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) rotate(${rotate} ${size / 2} ${size / 2})`}>
      <ItemIcon name={name} size={size} />
    </g>
  );
}

function Shoe({ x, y, s = 0.9, rotate = 0 }: { x: number; y: number; s?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      <GoldShoePath fill="url(#whs-gold)" />
    </g>
  );
}

/** Nägel des alten Hufeisenbretts: 3 Reihen × 8 */
const BOARD_NAILS = Array.from({ length: 24 }, (_, i) => ({ x: 296 + (i % 8) * 25, y: 132 + Math.floor(i / 8) * 30 }));

/**
 * Die Stallgasse im Winter: Tivolis Box, das alte Brett mit 24 Nägeln,
 * Fenster, alter Sattelschrank, Futtertonne, Putzkiste, Heuballen.
 * `hung` = Anzahl goldener Hufeisen am Brett.
 */
function Stallgasse({ hung = 0, label, children, className }: { hung?: number; label: string; children?: ReactNode; className?: string }) {
  const tivoli = horses.find((h) => h.slug === "tivoli")!.look;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id="whs-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6DD98" />
          <stop offset=".55" stopColor="#D4A84F" />
          <stop offset="1" stopColor="#A67C2E" />
        </linearGradient>
        <radialGradient id="whs-lamp" cx=".5" cy=".3" r=".7">
          <stop offset="0" stopColor="#FFE3A3" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFE3A3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="whs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#25363A" />
          <stop offset="1" stopColor="#C99A7A" />
        </linearGradient>
      </defs>
      {/* Wand */}
      <rect width="800" height="440" fill="#B98A63" />
      {Array.from({ length: 15 }, (_, i) => (
        <path key={i} d={`M0 ${60 + i * 26}h800`} stroke="#A0734F" strokeWidth="2" opacity=".6" />
      ))}
      {/* Deckenbalken */}
      <rect width="800" height="44" fill="#4A3328" />
      {[90, 330, 570].map((x) => (
        <rect key={x} x={x} y="0" width="34" height="56" fill="#5E4636" />
      ))}
      {/* Lampe */}
      <ellipse cx="400" cy="250" rx="300" ry="230" fill="url(#whs-lamp)" />
      <path d="M400 44v26" stroke="#2C2A24" strokeWidth="3" />
      <path d="M380 70h40l-8 16h-24Z" fill="#344638" stroke={OUT} strokeWidth="2" />
      <circle cx="400" cy="90" r="6" fill="#FFE3A3" />

      {/* Boden */}
      <rect y="440" width="800" height="160" fill="#D6C7A8" />
      <path d="M0 440h800" stroke="#9C8A6C" strokeWidth="4" />
      {[[0, 500, 800, 506], [0, 560, 800, 570]].map(([a, b, c, d], i) => (
        <path key={i} d={`M${a} ${b}L${c} ${d}`} stroke="#BFAF8E" strokeWidth="2" />
      ))}
      {[120, 330, 560, 700].map((x, i) => (
        <path key={i} d={`M${x} 440l-30 160`} stroke="#BFAF8E" strokeWidth="2" />
      ))}

      {/* Tivolis Box */}
      <g>
        <rect x="16" y="140" width="214" height="320" rx="4" fill="#5E4636" stroke={OUT} strokeWidth="3" />
        <rect x="26" y="150" width="194" height="128" fill="#2A211C" />
        <svg x="40" y="140" width="160" height="148" viewBox="0 0 260 240">
          <HorseHead look={tivoli} mood="neugierig" title="Tivoli" />
        </svg>
        <rect x="16" y="278" width="214" height="182" fill="#6E5140" stroke={OUT} strokeWidth="3" />
        <path d="M28 290l190 158M218 290 28 448" stroke="#93694C" strokeWidth="8" strokeLinecap="round" />
        <rect x="12" y="272" width="222" height="10" rx="2" fill="#4A3328" />
        <rect x="66" y="54" width="114" height="26" rx="4" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
        <text x="123" y="73" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="var(--font-body), sans-serif" fill="#344638">
          Tivoli
        </text>
        {/* gewöhnliches Glückshufeisen aus Eisen */}
        <g transform="translate(120 112) scale(.8)">
          <path d="M-20 20V-2a20 20 0 0 1 40 0v22h-9V-2a11 11 0 0 0-22 0v22Z" fill="#7C7F80" stroke="#3B3A34" strokeWidth="2" />
        </g>
      </g>

      {/* Das alte Brett mit 24 Nägeln */}
      <g>
        <rect x="270" y="98" width="226" height="118" rx="6" fill="#6E4A33" stroke={OUT} strokeWidth="3" />
        <rect x="278" y="106" width="210" height="102" rx="4" fill="none" stroke="#8C6448" strokeWidth="2" />
        {BOARD_NAILS.map((n, i) =>
          i < hung ? (
            <g key={i}>
              <circle cx={n.x} cy={n.y - 8} r="2.4" fill="#2C2A24" />
              <g transform={`translate(${n.x} ${n.y + 2}) scale(.42)`}>
                <GoldShoePath fill="url(#whs-gold)" shine={false} />
              </g>
            </g>
          ) : (
            <circle key={i} cx={n.x} cy={n.y - 8} r="2.6" fill="#2C2A24" />
          ),
        )}
      </g>

      {/* Fenster */}
      <g>
        <rect x="524" y="96" width="124" height="104" fill="url(#whs-sky)" stroke="#5E4636" strokeWidth="6" />
        <path d="M524 150c30-12 60-6 124-12v62H524Z" fill="#3F5446" />
        <path d="M546 150l10-22 10 22Zm70 0 12-26 12 26Z" fill="#2F4A3A" />
        <path d="M586 96v104M524 148h124" stroke="#5E4636" strokeWidth="5" />
        <path d="M528 100l14 0-14 14Zm116 96h-14l14-14Z" fill="#EDEBE4" opacity=".7" />
        <rect x="514" y="200" width="144" height="12" rx="2" fill="#80634D" stroke={OUT} strokeWidth="2" />
      </g>

      {/* alter Sattelschrank */}
      <g>
        <rect x="664" y="150" width="128" height="300" rx="4" fill="#7A5338" stroke={OUT} strokeWidth="3" />
        <path d="M728 158v266" stroke={OUT} strokeWidth="3" />
        <rect x="674" y="164" width="46" height="252" rx="3" fill="none" stroke="#8C6448" strokeWidth="2" />
        <rect x="736" y="164" width="46" height="252" rx="3" fill="none" stroke="#8C6448" strokeWidth="2" />
        <circle cx="720" cy="290" r="4" fill="#C9A15E" />
        <circle cx="736" cy="290" r="4" fill="#C9A15E" />
        <rect x="660" y="430" width="136" height="20" fill="#5E4636" stroke={OUT} strokeWidth="2.5" />
        {/* loses Brett unten */}
        <path d="M690 450h76l-4 22h-68Z" fill="#2A211C" />
        <path d="M766 450l14 18" stroke="#5E4636" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Futtertonne */}
      <g>
        <path d="M528 364h64l-4 100h-56Z" fill="#7F96A0" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <rect x="522" y="352" width="76" height="14" rx="5" fill="#5F7680" stroke={OUT} strokeWidth="2.5" />
        <path d="M532 400h56M532 430h56" stroke="#6A808A" strokeWidth="3" />
      </g>

      {/* Besen */}
      <g>
        <path d="M268 300 250 452" stroke="#9A6A4C" strokeWidth="6" strokeLinecap="round" />
        <path d="M232 452h36l6 24h-48Z" fill="#C49A5A" stroke={OUT} strokeWidth="2" />
      </g>

      {/* Putzkiste */}
      <g>
        <path d="M300 454h104l-6 54h-92Z" fill="#344638" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <path d="M312 454c0-18 80-18 80 0" fill="none" stroke="#2C2A24" strokeWidth="4" />
        <path d="M308 474h88" stroke="#5E7360" strokeWidth="3" />
      </g>

      {/* Heuballen */}
      <g>
        <rect x="418" y="478" width="118" height="70" rx="12" fill="#E3C47A" stroke={OUT} strokeWidth="3" />
        <path d="M428 498h98M426 514h102M430 530h94" stroke="#B8954D" strokeWidth="3" strokeLinecap="round" />
        <path d="M456 478v70M498 478v70" stroke="#7A2533" strokeWidth="3" />
      </g>

      {children}
    </svg>
  );
}

/* ---------- Türchen 1 ---------- */
export function StallgasseBriefScene({ className }: { className?: string }) {
  return (
      <Stallgasse className={className} label="Die Stallgasse am Abend: Tivolis Box, ein altes Brett mit Nägeln, Fenster, ein alter Schrank">
        {/* Brief, hinter das Brett geklemmt */}
        <g transform="translate(478 222) rotate(-18)">
          <rect x="-26" y="-9" width="52" height="18" rx="9" fill="#EFE3C4" stroke={OUT} strokeWidth="2" />
          <path d="M-8-9v18M8-9v18" stroke="#B5323F" strokeWidth="3" />
        </g>
        {/* goldenes Hufeisen im Spalt unter dem Schrank */}
        <Shoe x={724} y={466} s={0.62} rotate={-90} />
        {/* Krümel schnuppert */}
        <g transform="translate(600 450) scale(.62)">
          <Puppy />
        </g>
      </Stallgasse>
  );
}

/* ---------- Türchen 3 ---------- */
export function HofMuetzeScene({ className }: { className?: string }) {
  return (
    <WinterStall className={className} label="Der Winterhof: Heuballen, Stall und Krümel">
      {/* Bens Mütze im Heu */}
      <g transform="translate(238 474) rotate(-14)">
        <ItemIcon name="muetze" size={52} />
      </g>
      {/* alte Blechdose, halb ausgegraben */}
      <g transform="translate(744 498)">
        <ellipse cx="0" cy="20" rx="34" ry="8" fill="#6E5A44" />
        <rect x="-22" y="-12" width="44" height="30" rx="4" fill="#9C3A3A" stroke={OUT} strokeWidth="2" />
        <rect x="-24" y="-16" width="48" height="8" rx="3" fill="#7A2533" stroke={OUT} strokeWidth="2" />
        <path d="M-12 2h24" stroke="#D4A84F" strokeWidth="3" />
        <path d="M-30 18c10-6 22-8 34-4s20 2 26-2" stroke="#8C7A62" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      <Item name="handschuh" x={640} y={470} size={44} rotate={20} />
      <Item name="schal" x={100} y={484} size={56} rotate={-10} />
    </WinterStall>
  );
}

/* ---------- Türchen 18 ---------- */
export function StallgasseMissionScene({ className }: { className?: string }) {
  return (
      <Stallgasse className={className} hung={17} label="Die Stallgasse voller Dinge für das Weihnachtsfest">
        {/* Tannenzweig auf dem Heu */}
        <g transform="translate(470 470) rotate(-12)">
          <path d="M-36 4h72" stroke="#5E4636" strokeWidth="4" strokeLinecap="round" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M${-30 + i * 9} 4l-8-14M${-30 + i * 9} 4l-8 14`} stroke="#2F4A3A" strokeWidth="5" strokeLinecap="round" />
          ))}
        </g>
        {/* Lichterkette im Eimer */}
        <g transform="translate(250 488)">
          <path d="M-22-14h44l-6 34h-32Z" fill="#9BA79A" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M-18-16c8-14 22-14 34 0" fill="none" stroke="#2C2A24" strokeWidth="2" />
          {[[-12, -18], [0, -24], [12, -18], [-4, -12]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#FFD27A" stroke="#A67C2E" strokeWidth="1.2" />
          ))}
        </g>
        {/* Laterne auf dem Fensterbrett */}
        <Item name="laterne" x={580} y={180} size={50} />
        {/* Schleifenband in der Putzkiste */}
        <g transform="translate(350 470)">
          <circle r="16" fill="#B5323F" stroke={OUT} strokeWidth="2" />
          <circle r="6" fill="#7A2533" />
          <path d="M14 6c14 4 20 14 14 22" stroke="#B5323F" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
        {/* Korb mit Möhren */}
        <g transform="translate(640 520)">
          <path d="M-34-8h68l-8 30h-52Z" fill="#B88A55" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M-30 2h60M-28 12h56" stroke="#8C6448" strokeWidth="2" />
          <g transform="translate(-30 -40)">
            <ItemIcon name="karotte" size={36} />
          </g>
          <g transform="translate(-4 -42) rotate(12 18 18)">
            <ItemIcon name="karotte" size={36} />
          </g>
        </g>
        {/* Pinsel mit Goldfarbe unter dem Schrank */}
        <g transform="translate(724 466) rotate(-8)">
          <path d="M-30 0h40" stroke="#9A6A4C" strokeWidth="6" strokeLinecap="round" />
          <path d="M10-6h8v12h-8Z" fill="#9BA79A" stroke={OUT} strokeWidth="1.5" />
          <path d="M18-6c10 0 16 4 18 6-2 2-8 6-18 6Z" fill="#D4A84F" stroke="#8C6A28" strokeWidth="1.5" />
        </g>
        {/* Krümel wartet */}
        <g transform="translate(150 470) scale(.6)">
          <Puppy />
        </g>
      </Stallgasse>
  );
}

/* ---------- Türchen 21 ---------- */
export function StallgasseHufeisenScene({ className }: { className?: string }) {
  return (
      <Stallgasse className={className} hung={14} label="Die Stallgasse: Vom Brett sind Hufeisen heruntergefallen">
        <Shoe x={512} y={534} s={0.6} rotate={70} />
        <Shoe x={350} y={470} s={0.58} rotate={-20} />
        <Shoe x={610} y={196} s={0.55} rotate={0} />
        <Shoe x={604} y={452} s={0.55} rotate={100} />
        <Shoe x={250} y={488} s={0.55} rotate={180} />
        <Shoe x={724} y={466} s={0.58} rotate={-90} />
      </Stallgasse>
  );
}

/* ---------- Bilder für Geschichten und Rätsel ---------- */
export function StallgasseScene({ className }: { className?: string }) {
  return <Stallgasse className={className} label="Die Stallgasse am Abend mit dem alten Brett und seinen 24 Nägeln" />;
}

export function WinterhofScene({ className }: { className?: string }) {
  return <WinterStall className={className} />;
}
