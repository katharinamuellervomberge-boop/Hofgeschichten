import type { ReactNode } from "react";
import { Horse } from "@/components/illustrations/Horse";
import { Puppy } from "@/components/illustrations/Puppy";
import { horses } from "@/content/horses";
import { BOX } from "@/content/hoftag/day";
import { HORSE_BOX, SCENE_H, SCENE_W } from "@/content/hoftag/geometry";
import type { HorseId, SceneId, TimeOfDay } from "@/content/hoftag/types";

/**
 * Gezeichnete Szenen (800 × 500) im Stil der Hofgeschichten-Illustrationen:
 * warme Holztöne, Papierfarben, weiche Formen. Licht und Himmel folgen der Tageszeit.
 * Sobald gemalte Szenen da sind (content/hoftag/assets.ts), können sie diese ersetzen.
 */

const OUT = "#5E4636";

export const SKY: Record<TimeOfDay, [string, string]> = {
  morgen: ["#EFCFB0", "#F4E6D2"],
  vormittag: ["#CFDFE0", "#F1ECDC"],
  mittag: ["#BFD6DC", "#EEF0E4"],
  nachmittag: ["#EBCB98", "#F2E2C4"],
  abend: ["#36435A", "#8A6F78"],
};

type Props = {
  scene: SceneId;
  time: TimeOfDay;
  horse?: HorseId | null;
  /** Box mit Mist und nasser Stelle zeichnen */
  dirty?: boolean;
  /** Krümel sitzt in der Szene */
  kruemel?: boolean;
  /** Pferd frisst Heu (Abendbild) */
  hay?: boolean;
  className?: string;
  children?: ReactNode;
  label?: string;
};

export function Scene({ scene, time, horse, dirty, kruemel, hay, className, children, label }: Props) {
  const h = horse ? horses.find((x) => x.slug === horse) : undefined;
  const night = time === "abend";
  const uid = `sc-${scene}-${time}`;
  const indoor = scene === "box" || scene === "boxtuer" || scene === "heulager" || scene === "futterkammer";
  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className={className} role="img" aria-label={label ?? "Szene"}>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY[time][0]} />
          <stop offset="1" stopColor={SKY[time][1]} />
        </linearGradient>
        <radialGradient id={`${uid}-lamp`} cx="0.5" cy="0.05" r="0.75">
          <stop offset="0" stopColor="#FFD892" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFD892" stopOpacity="0" />
        </radialGradient>
      </defs>

      {scene === "box" || scene === "boxtuer" ? <BoxRoom uid={uid} time={time} /> : null}
      {scene === "paddock" ? <Outdoor uid={uid} time={time} ground="#E2CFA6" fence /> : null}
      {scene === "hof" ? <HofPlatz uid={uid} time={time} /> : null}
      {scene === "reitplatz" ? <Reitplatz uid={uid} time={time} /> : null}
      {scene === "putzplatz" ? <Putzplatz uid={uid} time={time} /> : null}
      {scene === "heulager" ? <Heulager /> : null}
      {scene === "futterkammer" ? <Futterkammer /> : null}

      {scene === "paddock" && <PaddockProps herdOf={horse ?? null} />}

      {dirty && (scene === "box" || scene === "boxtuer") && (
        <g>
          <WetPatch x={BOX.nass.x} y={BOX.nass.y} />
          {BOX.mist.map((m, i) => (
            <Manure key={i} x={m.x} y={m.y} />
          ))}
        </g>
      )}

      {hay && <HayPile x={HORSE_BOX.x + 410} y={470} />}

      {h && (scene === "boxtuer" || scene === "paddock" || scene === "putzplatz" || scene === "reitplatz" || scene === "hof") && (
        <Horse look={h.look} uid={`${uid}-${h.slug}`} box={HORSE_BOX} />
      )}

      {kruemel && (
        <g transform="translate(40 360) scale(.75)">
          <Puppy />
        </g>
      )}

      {/* Licht der Tageszeit */}
      {night && <rect width={SCENE_W} height={SCENE_H} fill="#1D2433" opacity={indoor ? 0.18 : 0.28} style={{ mixBlendMode: "multiply" }} />}
      {night && indoor && <rect width={SCENE_W} height={SCENE_H} fill={`url(#${uid}-lamp)`} />}
      {time === "morgen" && <rect width={SCENE_W} height={SCENE_H} fill="#F3C89A" opacity=".1" />}
      {time === "nachmittag" && <rect width={SCENE_W} height={SCENE_H} fill="#E8A75E" opacity=".08" />}

      {children}
    </svg>
  );
}

/* ---------- Bausteine ---------- */

function Planks({ x, y, w, h, color, line }: { x: number; y: number; w: number; h: number; color: string; line: string }) {
  const rows = [];
  for (let yy = y + 34; yy < y + h; yy += 34) rows.push(<path key={yy} d={`M${x} ${yy}H${x + w}`} stroke={line} strokeWidth="2" opacity=".5" />);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={color} />
      {rows}
    </g>
  );
}

function BoxRoom({ uid, time }: { uid: string; time: TimeOfDay }) {
  return (
    <g>
      <Planks x={0} y={0} w={800} h={330} color="#D2B48A" line="#A9875F" />
      <rect x="0" y="0" width="800" height="26" fill="#8C6A4E" />
      {/* Fenster */}
      <rect x={BOX.fenster.x - 64} y={BOX.fenster.y - 50} width="128" height="98" rx="6" fill={`url(#${uid}-sky)`} stroke={OUT} strokeWidth="5" />
      <path d={`M${BOX.fenster.x} ${BOX.fenster.y - 50}v98M${BOX.fenster.x - 64} ${BOX.fenster.y}h128`} stroke={OUT} strokeWidth="4" />
      {time === "abend" && <circle cx={BOX.fenster.x + 34} cy={BOX.fenster.y - 22} r="9" fill="#F3E6C8" />}
      {/* Heuraufe */}
      <rect x="54" y="300" width="118" height="70" rx="8" fill="#E3C47A" stroke={OUT} strokeWidth="3" />
      <path d="M62 300v70M84 300v70M106 300v70M128 300v70M150 300v70" stroke="#8C6A4E" strokeWidth="4" />
      <path d="M58 300c10-14 30-16 46-8 14-10 38-10 64 4" fill="#E3C47A" stroke="#B8954D" strokeWidth="2" />
      {/* Tränke */}
      <path d={`M${BOX.traenke.x - 42} ${BOX.traenke.y - 22}h84l-8 38h-68Z`} fill="#9AA3A0" stroke={OUT} strokeWidth="3" />
      <ellipse cx={BOX.traenke.x} cy={BOX.traenke.y - 22} rx="42" ry="7" fill="#8FB3BE" stroke={OUT} strokeWidth="2.5" />
      <path d={`M${BOX.traenke.x} ${BOX.traenke.y + 16}v40`} stroke="#7C8682" strokeWidth="6" />
      {/* Boxentür */}
      <rect x="742" y="120" width="70" height="220" fill="#3E5A45" stroke={OUT} strokeWidth="3" />
      <path d="M742 160h70M742 300h70" stroke="#2C4434" strokeWidth="4" />
      <rect x={BOX.tuer.x - 14} y={BOX.tuer.y - 8} width="28" height="16" rx="4" fill="#C99A4E" stroke={OUT} strokeWidth="2.5" />
      {/* Lampe */}
      <path d={`M${BOX.licht.x} 0v22`} stroke={OUT} strokeWidth="3" />
      <path d={`M${BOX.licht.x - 22} 46c0-14 10-24 22-24s22 10 22 24Z`} fill="#344638" stroke={OUT} strokeWidth="2.5" />
      <ellipse cx={BOX.licht.x} cy="48" rx="10" ry="5" fill={time === "abend" ? "#FFE2A6" : "#F3E6C8"} />
      {/* Boden: Stroh */}
      <rect x="0" y="330" width="800" height="170" fill="#E6CF8E" />
      <path d="M0 330h800" stroke="#B8954D" strokeWidth="3" />
      {STRAW.map(([x, y, a], i) => (
        <path key={i} d={`M${x} ${y}l${a} -6`} stroke="#C7A35A" strokeWidth="2.4" strokeLinecap="round" />
      ))}
    </g>
  );
}

const STRAW: Array<[number, number, number]> = [
  [30, 360, 18], [90, 420, -14], [160, 470, 20], [240, 350, -16], [300, 440, 18], [360, 480, -20], [420, 380, 16],
  [480, 410, -18], [540, 350, 14], [600, 470, -16], [660, 420, 18], [720, 380, -14], [770, 460, 16], [200, 400, 12],
  [120, 360, -10], [700, 480, 12], [400, 440, -12], [520, 480, 14],
];

function Forest({ y, color }: { y: number; color: string }) {
  return (
    <path
      d={`M0 ${y}c30-40 50-50 70-30 16-50 46-60 70-20 20-34 50-40 70-6 24-46 60-50 84-10 22-30 52-34 76 0 24-44 58-46 84-8 20-28 52-30 72 4 24-40 58-44 82-6 22-30 54-30 76 4 26-36 60-38 86 2v${70}H0Z`}
      fill={color}
    />
  );
}

function Outdoor({ uid, time, ground, fence }: { uid: string; time: TimeOfDay; ground: string; fence?: boolean }) {
  const sun = SUN[time];
  return (
    <g>
      <rect width="800" height="500" fill={`url(#${uid}-sky)`} />
      {sun && <circle cx={sun.x} cy={sun.y} r={sun.r} fill={sun.c} opacity=".9" />}
      <Forest y={200} color={time === "abend" ? "#2E3B33" : "#6F8466"} />
      <Forest y={226} color={time === "abend" ? "#25302A" : "#56705A"} />
      <rect x="0" y="260" width="800" height="240" fill={ground} />
      {fence && (
        <g stroke={OUT} strokeWidth="3">
          {[40, 190, 340, 490, 640, 780].map((x) => (
            <rect key={x} x={x - 8} y="226" width="16" height="74" fill="#A9875F" />
          ))}
          <rect x="0" y="238" width="800" height="12" fill="#C4A27A" />
          <rect x="0" y="268" width="800" height="12" fill="#C4A27A" />
        </g>
      )}
    </g>
  );
}

const SUN: Record<TimeOfDay, { x: number; y: number; r: number; c: string } | null> = {
  morgen: { x: 680, y: 170, r: 34, c: "#F6C785" },
  vormittag: { x: 600, y: 80, r: 30, c: "#F8E3A8" },
  mittag: { x: 420, y: 56, r: 30, c: "#FBEFC4" },
  nachmittag: { x: 180, y: 110, r: 34, c: "#F2B66E" },
  abend: { x: 120, y: 80, r: 18, c: "#F3E6C8" },
};

function PaddockProps({ herdOf }: { herdOf: HorseId | null }) {
  const others = horses.filter((x) => x.slug !== herdOf).slice(0, 2);
  return (
    <g>
      {/* Heunetz am Pfosten */}
      <path d="M58 250c-18 30-16 64 6 80 22-16 26-50 8-80Z" fill="#E3C47A" stroke={OUT} strokeWidth="2.5" />
      <path d="M50 270l28 30M48 296l26-28M54 316l20-22" stroke="#8C6A4E" strokeWidth="1.6" />
      {/* Herde im Hintergrund */}
      {others.map((o, i) => (
        <Horse key={o.slug} look={o.look} uid={`herd-${o.slug}`} box={{ x: 606 + i * 72, y: 200 + i * 14, width: 112 }} />
      ))}
      {/* Wassertrog */}
      <path d="M660 400h110l-8 48h-94Z" fill="#9AA3A0" stroke={OUT} strokeWidth="3" />
      <ellipse cx="715" cy="400" rx="55" ry="8" fill="#8FB3BE" stroke={OUT} strokeWidth="2.5" />
    </g>
  );
}

function HofPlatz({ uid, time }: { uid: string; time: TimeOfDay }) {
  return (
    <g>
      <Outdoor uid={uid} time={time} ground="#DCCDB0" />
      {/* Stall im Hintergrund */}
      <rect x="60" y="150" width="520" height="140" fill="#B07A4F" stroke={OUT} strokeWidth="3" />
      <path d="M40 156 320 96l280 60Z" fill="#7E5A44" stroke={OUT} strokeWidth="3" />
      {[110, 210, 410, 510].map((x) => (
        <rect key={x} x={x} y="190" width="50" height="40" fill={time === "abend" ? "#F5D38E" : "#E9E2CF"} stroke={OUT} strokeWidth="2.5" />
      ))}
      <rect x="282" y="196" width="76" height="94" fill="#3E5A45" stroke={OUT} strokeWidth="3" />
      <path d="M282 196l76 94M358 196l-76 94" stroke="#2C4434" strokeWidth="3" />
      {/* Linde */}
      <rect x="660" y="190" width="20" height="110" fill="#7E5A44" />
      <circle cx="670" cy="160" r="70" fill={time === "abend" ? "#3E5038" : "#7E9468"} />
      <circle cx="630" cy="190" r="44" fill={time === "abend" ? "#35452F" : "#6F8466"} />
      {/* Kies */}
      {KIES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#B8A88A" />
      ))}
    </g>
  );
}

const KIES: Array<[number, number]> = [
  [40, 330], [120, 380], [200, 340], [260, 470], [330, 360], [410, 410], [470, 340], [540, 470], [600, 380], [680, 350],
  [740, 420], [90, 460], [160, 430], [380, 470], [500, 400], [640, 460], [720, 480], [300, 410],
];

function Reitplatz({ uid, time }: { uid: string; time: TimeOfDay }) {
  return (
    <g>
      <Outdoor uid={uid} time={time} ground="#E4D3AE" />
      {/* Flutlicht */}
      {[90, 710].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="120" width="8" height="160" fill="#7C8682" />
          <rect x={x - 18} y="110" width="36" height="14" rx="3" fill="#5D574C" />
          {time === "abend" && <path d={`M${x - 16} 124 L${x - 80} 300 H${x + 80} L${x + 16} 124Z`} fill="#FFE8B0" opacity=".18" />}
        </g>
      ))}
      {/* Bande */}
      <rect x="0" y="270" width="800" height="22" fill="#F3EEE4" stroke={OUT} strokeWidth="2.5" />
      {/* Bodenstangen */}
      <g stroke={OUT} strokeWidth="2">
        <rect x="120" y="470" width="190" height="11" rx="5" fill="#F3EEE4" />
        <rect x="140" y="440" width="170" height="10" rx="5" fill="#A4573A" />
      </g>
    </g>
  );
}

function Putzplatz({ uid, time }: { uid: string; time: TimeOfDay }) {
  return (
    <g>
      <Outdoor uid={uid} time={time} ground="#CFC3AE" />
      {/* Dach */}
      <path d="M0 0h800v70H0Z" fill="#7E5A44" />
      <path d="M0 70h800" stroke={OUT} strokeWidth="4" />
      {[30, 770].map((x) => (
        <rect key={x} x={x - 12} y="70" width="24" height="330" fill="#A9875F" stroke={OUT} strokeWidth="3" />
      ))}
      {/* Pflaster */}
      {[300, 350, 400, 450].map((y) => (
        <path key={y} d={`M0 ${y}H800`} stroke="#B3A68E" strokeWidth="2" />
      ))}
      {[80, 200, 320, 440, 560, 680].map((x, i) => (
        <path key={x} d={`M${x + (i % 2) * 30} 260V500`} stroke="#B3A68E" strokeWidth="2" />
      ))}
      {/* Anbindering */}
      <rect x="690" y="150" width="60" height="150" fill="#C4A27A" stroke={OUT} strokeWidth="3" />
      <circle cx="720" cy="210" r="12" fill="none" stroke="#5D574C" strokeWidth="4" />
      {/* Putzkasten */}
      <rect x="40" y="420" width="130" height="56" rx="6" fill="#3E5A45" stroke={OUT} strokeWidth="3" />
      <path d="M40 436h130" stroke="#2C4434" strokeWidth="3" />
    </g>
  );
}

function Heulager() {
  return (
    <g>
      <Planks x={0} y={0} w={800} h={330} color="#B89468" line="#8C6A4E" />
      {/* Heuballen */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <g key={`${row}-${col}`}>
            <rect x={40 + col * 130 + (row % 2) * 40} y={90 + row * 72} width="124" height="66" rx="10" fill="#E3C47A" stroke={OUT} strokeWidth="2.5" />
            <path d={`M${80 + col * 130 + (row % 2) * 40} ${90 + row * 72}v66M${124 + col * 130 + (row % 2) * 40} ${90 + row * 72}v66`} stroke="#A4573A" strokeWidth="2.5" />
          </g>
        )),
      )}
      {/* Heubedampfer */}
      <rect x="660" y="260" width="110" height="110" rx="8" fill="#5E7360" stroke={OUT} strokeWidth="3" />
      <path d="M684 252c0-10 10-10 10-20M714 252c0-10 10-10 10-20M744 252c0-10 10-10 10-20" stroke="#F3EEE4" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8" />
      <rect x="0" y="330" width="800" height="170" fill="#D8C49A" />
      <path d="M0 330h800" stroke="#A9875F" strokeWidth="3" />
    </g>
  );
}

function Futterkammer() {
  return (
    <g>
      <Planks x={0} y={0} w={800} h={340} color="#D9C6A5" line="#B39A76" />
      <rect x="60" y="80" width="680" height="14" fill="#8C6A4E" />
      {[100, 190, 280, 560, 640].map((x, i) => (
        <rect key={x} x={x} y={48} width="60" height="32" rx="4" fill={["#C99A4E", "#DDE3D6", "#A4573A", "#E8DCC4", "#5E7360"][i]} stroke={OUT} strokeWidth="2" />
      ))}
      {/* Futtertonnen */}
      {[170, 370, 570].map((x, i) => (
        <g key={x}>
          <rect x={x - 70} y="200" width="140" height="200" rx="18" fill={["#5E7360", "#80634D", "#344638"][i]} stroke={OUT} strokeWidth="3" />
          <rect x={x - 78} y="188" width="156" height="28" rx="10" fill="#2C2A24" />
          <rect x={x - 30} y="260" width="60" height="34" rx="5" fill="#F3EEE4" stroke={OUT} strokeWidth="2" />
        </g>
      ))}
      <rect x="0" y="400" width="800" height="100" fill="#BBA98A" />
    </g>
  );
}

function Manure({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 12} rx="30" ry="8" fill="#000" opacity=".12" />
      <circle cx={x - 12} cy={y + 4} r="11" fill="#7A5A3A" stroke={OUT} strokeWidth="2" />
      <circle cx={x + 10} cy={y + 5} r="12" fill="#6E5034" stroke={OUT} strokeWidth="2" />
      <circle cx={x} cy={y - 8} r="11" fill="#84633F" stroke={OUT} strokeWidth="2" />
      <path d={`M${x - 4} ${y - 12}c2-2 5-2 7 0`} stroke="#A98A63" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function WetPatch({ x, y }: { x: number; y: number }) {
  return <path d={`M${x - 52} ${y}c4-18 30-26 54-20 26-6 50 4 50 20s-26 22-52 18c-26 4-56-2-52-18Z`} fill="#A88B5A" opacity=".75" />;
}

function HayPile({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 70} ${y}c6-40 40-56 70-50 30-6 64 10 70 50Z`} fill="#E3C47A" stroke={OUT} strokeWidth="2.5" />
      <path d={`M${x - 40} ${y - 20}l14-12M${x} ${y - 36}l10 14M${x + 34} ${y - 18}l-10-14`} stroke="#B8954D" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

/** Einzelne Bildelemente für Sammel-Aufgaben */
export function CollectArt({ item, x, y, collected }: { item: string; x: number; y: number; collected: boolean }) {
  if (item === "mist") return collected ? null : <Manure x={x} y={y} />;
  if (item === "schlamm")
    return collected ? null : (
      <g opacity=".92">
        <path d={`M${x - 30} ${y}c0-18 20-26 34-18 18-8 32 6 26 22-4 14-22 18-34 12-14 6-26-2-26-16Z`} fill="#6B5236" />
        <circle cx={x + 30} cy={y - 18} r="6" fill="#6B5236" />
      </g>
    );
  if (item === "stein")
    return collected ? null : <path d={`M${x - 10} ${y + 4}c0-8 6-12 12-12s10 6 8 12c-2 5-18 6-20 0Z`} fill="#8D8A80" stroke={OUT} strokeWidth="2" />;
  if (item === "heu") return collected ? null : <HayBunch x={x} y={y} />;
  if (item === "stroh" || item === "spaene") {
    const fill = item === "spaene" ? "#EBD9B4" : "#EFD99A";
    return collected ? (
      <g>
        <ellipse cx={x} cy={y} rx="52" ry="20" fill={fill} />
        <path d={`M${x - 30} ${y - 4}l18-6M${x + 4} ${y + 6}l16-8M${x + 20} ${y - 8}l14 4`} stroke="#C7A35A" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    ) : (
      <ellipse cx={x} cy={y} rx="48" ry="18" fill="#A88B66" opacity=".8" />
    );
  }
  return null;
}

function HayBunch({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 18} rx="34" ry="7" fill="#000" opacity=".1" />
      <path d={`M${x - 34} ${y + 16}c2-26 20-36 34-34 16-2 32 10 34 34Z`} fill="#E3C47A" stroke={OUT} strokeWidth="2.5" />
      <path d={`M${x - 18} ${y}l10-10M${x + 4} ${y - 10}l6 12M${x + 18} ${y + 2}l-6-10`} stroke="#B8954D" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}
