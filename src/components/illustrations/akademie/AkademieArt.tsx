import type { ReactNode } from "react";
import styles from "./akademie-art.module.css";

/**
 * Illustrationen der kleinen Reitakademie (alle viewBox 0 0 800 600).
 * Ruhige Flächen in den Hofgeschichten-Farben, wenig Text, große Schrift.
 */

const C = {
  bg: "#EFE8D8",
  paper: "#FBF8F1",
  forest: "#344638",
  forestDeep: "#26342A",
  forestSoft: "#5E7360",
  sage: "#DDE3D6",
  sand: "#D9C6A5",
  sandLight: "#E8DCC4",
  sandDeep: "#C4AC84",
  brown: "#80634D",
  brownDeep: "#5E4636",
  gold: "#C99A4E",
  rust: "#A4573A",
  ink: "#2C2A24",
  skin: "#E8AE86",
};

const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

function Label({ x, y, children, anchor = "middle", size = 30, color = C.forestDeep }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number; color?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} fontFamily={FONT} paintOrder="stroke" stroke={C.paper} strokeWidth={size / 5} strokeLinejoin="round">
      {children}
    </text>
  );
}

/* ================================================================
   Pferd von oben (Kopf zeigt nach rechts). Linke Pferdeseite = oben.
   ================================================================ */

function TopHorse({ coat = "#8A4A26", mane = "#1F1712", opacity = 1 }: { coat?: string; mane?: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {/* Schweif */}
      <path d="M276 292c-34-4-70 2-104 8 30 6 70 8 104 8Z" fill={mane} />
      {/* Rumpf mit Hinterhand, Taille, Schultern, Hals und Kopf */}
      <path
        d="M272 300C272 252 296 228 340 226C380 224 410 236 440 238C480 236 510 230 530 240C556 252 572 268 600 276C620 270 648 272 670 280C688 286 704 292 706 300C704 308 688 314 670 320C648 328 620 330 600 324C572 332 556 348 530 360C510 370 480 364 440 362C410 364 380 376 340 374C296 372 272 348 272 300Z"
        fill={coat}
      />
      {/* Rückenlinie und Mähne */}
      <path d="M300 300H520" stroke="#000" strokeOpacity=".12" strokeWidth="5" strokeLinecap="round" />
      <path d="M526 300H640" stroke={mane} strokeWidth="12" strokeLinecap="round" />
      {/* Ohren */}
      <path d="M640 286l20-10-4 16Z M640 314l20 10-4-16Z" fill={coat} />
      <path d="M636 286l20-10-4 16Z M636 314l20 10-4-16Z" fill="#000" opacity=".18" />
    </g>
  );
}

/* ---------- Sicherheitszonen ---------- */

function Person({ x, y, rot = 0, color = C.forest }: { x: number; y: number; rot?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx="0" cy="0" rx="16" ry="26" fill={color} />
      <circle cx="6" cy="0" r="12" fill={C.skin} />
      <path d="M-2-12a12 12 0 0 1 0 24" fill={C.brownDeep} />
    </g>
  );
}

export function ZonesScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Pferd von oben mit Sicherheitszonen">
      <rect width="800" height="600" fill={C.bg} />
      {/* Gefahrenzone hinten */}
      <path d="M262 300 L40 150 A270 270 0 0 0 40 450 Z" fill={C.rust} opacity=".2" />
      <path d="M262 300 L40 150 A270 270 0 0 0 40 450 Z" fill="none" stroke={C.rust} strokeWidth="3" strokeDasharray="10 8" opacity=".7" />
      {/* toter Winkel vorne (direkt vor der Nase) */}
      <path d="M702 300 L800 270 L800 330 Z" fill={C.ink} opacity=".14" />
      {/* sichere Annäherung: schräg von vorne zur Schulter */}
      <path d="M540 255 L760 60 L800 60 L800 160 Z" fill={C.forestSoft} opacity=".2" />
      <path d="M720 100 C660 150 610 196 560 236" fill="none" stroke={C.forest} strokeWidth="6" strokeLinecap="round" strokeDasharray="2 14" />
      <path d="M572 214 l-16 26 30-4" fill="none" stroke={C.forest} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <TopHorse />
      <Person x={742} y={86} rot={140} />
      <Label x={150} y={300} color={C.rust}>
        Abstand!
      </Label>
      <Label x={620} y={80} anchor="end">
        schräg von vorn
      </Label>
      <Label x={770} y={390} anchor="end" size={24} color={C.ink}>
        direkt vorn: sieht dich kaum
      </Label>
    </svg>
  );
}

/* ---------- Gangarten-Diagramm ---------- */

export type GaitName = "schritt" | "trab" | "galopp-rechts" | "galopp-links";
type Leg = "VL" | "VR" | "HL" | "HR";

const GAITS: Record<GaitName, { title: string; beats: Leg[][]; float: boolean; dur: number }> = {
  schritt: { title: "Schritt · Viertakt", beats: [["HL"], ["VL"], ["HR"], ["VR"]], float: false, dur: 2.8 },
  trab: { title: "Trab · Zweitakt", beats: [["HL", "VR"], ["HR", "VL"]], float: true, dur: 1.6 },
  "galopp-rechts": { title: "Rechtsgalopp · Dreitakt", beats: [["HL"], ["HR", "VL"], ["VR"]], float: true, dur: 2.0 },
  "galopp-links": { title: "Linksgalopp · Dreitakt", beats: [["HR"], ["HL", "VR"], ["VL"]], float: true, dur: 2.0 },
};

const LEG_LABEL: Record<Leg, string> = { VL: "vorn links", VR: "vorn rechts", HL: "hinten links", HR: "hinten rechts" };

function legPos(leg: Leg, gait: GaitName): [number, number] {
  // linke Pferdeseite oben (Kopf rechts); im Galopp greifen die führenden Beine weiter vor
  const lead = gait === "galopp-rechts" ? "R" : gait === "galopp-links" ? "L" : null;
  const side = leg[1] as "L" | "R";
  const fwd = lead && side === lead ? 34 : 0;
  const x = (leg[0] === "V" ? 520 : 300) + fwd;
  const y = side === "L" ? 236 : 364;
  return [x, y];
}

export function GaitScene({ gait, animate = true, numbers = true, title = true, className }: { gait: GaitName; animate?: boolean; numbers?: boolean; title?: boolean; className?: string }) {
  const g = GAITS[gait];
  const slots = g.beats.length + (g.float ? (gait === "trab" ? 2 : 1) : 0);
  // Taktfolge mit Schwebephasen: Trab = Takt, Schwebe, Takt, Schwebe; Galopp = 3 Takte, Schwebe
  const order: Array<Leg[] | "float"> =
    gait === "trab" ? [g.beats[0], "float", g.beats[1], "float"] : g.float ? [...g.beats, "float"] : g.beats;
  const step = g.dur / slots;
  const beatOf = (leg: Leg) => g.beats.findIndex((b) => b.includes(leg));
  const slotOf = (leg: Leg) => order.findIndex((b) => b !== "float" && b.includes(leg));
  const legs: Leg[] = ["VL", "VR", "HL", "HR"];
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={`${g.title}: Fußfolge`}>
      <rect width="800" height="600" fill={C.bg} />
      {title && <Label x={400} y={70} size={38}>{g.title}</Label>}
      <g transform="translate(0 20)">
        <TopHorse opacity={0.35} />
        {/* diagonale Beinpaare im Trab */}
        {gait === "trab" && (
          <g stroke={C.gold} strokeWidth="5" strokeDasharray="10 8" opacity=".8">
            <line x1={legPos("HL", gait)[0]} y1={legPos("HL", gait)[1]} x2={legPos("VR", gait)[0]} y2={legPos("VR", gait)[1]} />
            <line x1={legPos("HR", gait)[0]} y1={legPos("HR", gait)[1]} x2={legPos("VL", gait)[0]} y2={legPos("VL", gait)[1]} />
          </g>
        )}
        {legs.map((leg) => {
          const [x, y] = legPos(leg, gait);
          const n = beatOf(leg) + 1;
          return (
            <g key={leg}>
              <circle cx={x} cy={y} r="40" fill={C.paper} stroke={C.forest} strokeWidth="5" />
              {animate && (
                <circle
                  cx={x}
                  cy={y}
                  r="40"
                  fill={C.gold}
                  className={styles.beat}
                  style={{ animationDuration: `${g.dur}s`, animationDelay: `${slotOf(leg) * step}s` }}
                />
              )}
              {/* Huf */}
              <path d={`M${x - 16} ${y + 14}v-12a16 17 0 0 1 32 0v12h-9v-12a7 7 0 0 0-14 0v12Z`} fill={C.brownDeep} />
              {numbers && (
                <g>
                  <circle cx={x + 34} cy={y - 32} r="19" fill={C.forest} />
                  <text x={x + 34} y={y - 23} textAnchor="middle" fontSize="26" fontWeight={700} fill={C.paper} fontFamily={FONT}>
                    {n}
                  </text>
                </g>
              )}
              <Label x={x} y={y + (y < 300 ? -54 : 76)} size={24} color={C.ink}>
                {LEG_LABEL[leg]}
              </Label>
            </g>
          );
        })}
      </g>
      {/* Taktleiste */}
      <g transform={`translate(${400 - (slots * 70) / 2} 548)`}>
        {order.map((b, i) => (
          <g key={i} transform={`translate(${i * 70 + 35} 0)`}>
            {b === "float" ? (
              <>
                <path d="M-22 4c0-10 8-14 14-10 4-10 18-10 20 0 8-2 12 6 8 12h-38c-6 0-8-2-4-2Z" fill={C.sandDeep} opacity=".8" />
                {animate && <path d="M-22 4c0-10 8-14 14-10 4-10 18-10 20 0 8-2 12 6 8 12h-38c-6 0-8-2-4-2Z" fill={C.gold} className={styles.beat} style={{ animationDuration: `${g.dur}s`, animationDelay: `${i * step}s` }} />}
              </>
            ) : (
              <>
                <circle r="22" fill={C.forest} />
                {animate && <circle r="22" fill={C.gold} className={styles.beat} style={{ animationDuration: `${g.dur}s`, animationDelay: `${i * step}s` }} />}
                <text y="9" textAnchor="middle" fontSize="24" fontWeight={700} fill={C.paper} fontFamily={FONT}>
                  {g.beats.indexOf(b) + 1}
                </text>
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Reitbahn 20 × 40 m von oben ---------- */

export type ArenaFigure =
  | "buchstaben"
  | "ganze-bahn"
  | "handwechsel"
  | "halbe-bahn"
  | "laenge"
  | "zirkel"
  | "volte"
  | "schlange"
  | "hufschlag"
  | "begegnung";

/* 1 m = 17 px; Bahn von x 60–740, y 140–480. A links, C rechts. */
const AX = 60;
const AY = 140;
const M = 17;
const px = (m: number) => AX + m * M; // Abstand von der A-Seite
const py = (m: number) => AY + m * M; // Abstand von der oberen Bande

const LETTERS: Array<[string, number, number]> = [
  ["A", px(0) - 34, py(10)],
  ["C", px(40) + 34, py(10)],
  ["K", px(6), py(0) - 34],
  ["E", px(20), py(0) - 34],
  ["H", px(34), py(0) - 34],
  ["F", px(6), py(20) + 34],
  ["B", px(20), py(20) + 34],
  ["M", px(34), py(20) + 34],
];

/* Hufschlag (1 m innen) mit gerundeten Ecken */
const T = 1;
const R = 3;
const trackLeft = // linke Hand: gegen den Uhrzeigersinn (von oben gesehen)
  `M${px(20)} ${py(T)} H${px(T + R)} Q${px(T)} ${py(T)} ${px(T)} ${py(T + R)} V${py(20 - T - R)} Q${px(T)} ${py(20 - T)} ${px(T + R)} ${py(20 - T)} H${px(40 - T - R)} Q${px(40 - T)} ${py(20 - T)} ${px(40 - T)} ${py(20 - T - R)} V${py(T + R)} Q${px(40 - T)} ${py(T)} ${px(40 - T - R)} ${py(T)} H${px(21)}`;

function figurePath(f: ArenaFigure): { d: string; hand?: "links" | "rechts"; faint?: boolean }[] {
  switch (f) {
    case "ganze-bahn":
      return [{ d: trackLeft }];
    case "hufschlag":
      return [{ d: trackLeft }];
    case "handwechsel":
      return [
        { d: trackLeft, faint: true },
        { d: `M${px(2)} ${py(20 - T)} Q${px(5)} ${py(20 - T)} ${px(6)} ${py(19)} L${px(34)} ${py(1)} Q${px(35)} ${py(T)} ${px(38)} ${py(T)}` },
      ];
    case "halbe-bahn":
      return [
        { d: trackLeft, faint: true },
        { d: `M${px(2)} ${py(20 - T)} Q${px(5)} ${py(20 - T)} ${px(6)} ${py(19)} L${px(20)} ${py(1)} Q${px(21)} ${py(T)} ${px(24)} ${py(T)}` },
      ];
    case "laenge":
      return [
        { d: trackLeft, faint: true },
        { d: `M${px(4)} ${py(T)} Q${px(T)} ${py(T)} ${px(T)} ${py(5)} Q${px(T)} ${py(10)} ${px(5)} ${py(10)} H${px(35)} Q${px(40 - T)} ${py(10)} ${px(40 - T)} ${py(15)} Q${px(40 - T)} ${py(20 - T)} ${px(36)} ${py(20 - T)}` },
      ];
    case "zirkel":
      return [
        { d: trackLeft, faint: true },
        { d: `M${px(10)} ${py(0.6)} A${9.4 * M} ${9.4 * M} 0 1 0 ${px(10) + 1} ${py(0.6)}` },
      ];
    case "volte":
      return [
        { d: trackLeft, faint: true },
        { d: `M${px(20)} ${py(0.8)} A${4.6 * M} ${4.6 * M} 0 1 0 ${px(20) + 1} ${py(0.8)}` },
      ];
    case "schlange": {
      const w = (40 - 2) / 3;
      const x0 = 1;
      const xs = [0, 1, 2, 3].map((i) => px(x0 + i * w));
      const yt = py(1);
      const yb = py(19);
      const ym = py(10);
      return [
        { d: trackLeft, faint: true },
        {
          d: `M${xs[0]} ${ym} Q${xs[0]} ${yt} ${(xs[0] + xs[1]) / 2} ${yt} Q${xs[1]} ${yt} ${xs[1]} ${ym} Q${xs[1]} ${yb} ${(xs[1] + xs[2]) / 2} ${yb} Q${xs[2]} ${yb} ${xs[2]} ${ym} Q${xs[2]} ${yt} ${(xs[2] + xs[3]) / 2} ${yt} Q${xs[3]} ${yt} ${xs[3]} ${ym}`,
        },
      ];
    }
    case "begegnung":
      return [{ d: trackLeft, faint: true }];
    case "buchstaben":
      return [];
  }
}

function Arrowhead({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10Z" fill={color} />
    </marker>
  );
}

function RiderDot({ x, y, dir, color }: { x: number; y: number; dir: number; color: string }) {
  // kleines Pferd mit Reiter von oben, Blickrichtung dir (Grad, 0 = rechts)
  return (
    <g transform={`translate(${x} ${y}) rotate(${dir}) scale(1.5)`}>
      <ellipse rx="30" ry="12" fill={color} />
      <ellipse cx="34" rx="10" ry="7" fill={color} />
      <circle cx="-2" r="9" fill={C.paper} stroke={color} strokeWidth="3" />
    </g>
  );
}

export function ArenaScene({ figure, className }: { figure: ArenaFigure; className?: string }) {
  const paths = figurePath(figure);
  const id = `ak-arrow-${figure}`;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={`Reitbahn von oben: ${figure}`}>
      <defs>
        <Arrowhead id={id} color={C.forest} />
        <Arrowhead id={`${id}-f`} color={C.sandDeep} />
      </defs>
      <rect width="800" height="600" fill={C.bg} />
      {/* Bande und Sandboden */}
      <rect x={AX - 10} y={AY - 10} width={40 * M + 20} height={20 * M + 20} rx="10" fill={C.brown} />
      <rect x={AX} y={AY} width={40 * M} height={20 * M} fill={C.sandLight} />
      {/* Mittellinie und X */}
      <path d={`M${px(0)} ${py(10)}H${px(40)}`} stroke={C.sandDeep} strokeWidth="2" strokeDasharray="6 10" />
      <g stroke={C.sandDeep} strokeWidth="4" strokeLinecap="round">
        <path d={`M${px(20) - 9} ${py(10) - 9}l18 18M${px(20) + 9} ${py(10) - 9}l-18 18`} />
      </g>
      <Label x={px(20) + 22} y={py(10) + 32} size={24} color={C.brownDeep}>
        X
      </Label>
      {figure === "hufschlag" && (
        <>
          <rect x={px(2.2)} y={py(2.2)} width={(40 - 4.4) * M} height={(20 - 4.4) * M} rx="34" fill="none" stroke={C.forestSoft} strokeWidth="5" strokeDasharray="12 10" />
          <Label x={px(20)} y={py(4.6)} size={24} color={C.forestSoft}>
            zweiter Hufschlag
          </Label>
          <Label x={px(20)} y={py(20) - 24} size={24} color={C.forest}>
            erster Hufschlag
          </Label>
        </>
      )}
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.faint ? C.sandDeep : C.forest}
          strokeWidth={p.faint ? 4 : 7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={p.faint ? "2 10" : undefined}
          markerEnd={`url(#${p.faint ? `${id}-f` : id})`}
        />
      ))}
      {figure === "begegnung" && (
        <>
          <RiderDot x={px(24)} y={py(T)} dir={180} color={C.forest} />
          <RiderDot x={px(16)} y={py(3)} dir={0} color={C.rust} />
          <Label x={px(29)} y={py(T) + 10} anchor="start" size={22} color={C.forest}>
            linke Hand
          </Label>
          <Label x={px(11)} y={py(3) + 10} anchor="end" size={22} color={C.rust}>
            rechte Hand
          </Label>
        </>
      )}
      {LETTERS.map(([l, x, y]) => (
        <g key={l}>
          <circle cx={x} cy={y} r="22" fill={C.paper} stroke={C.brown} strokeWidth="3" />
          <text x={x} y={y + 9} textAnchor="middle" fontSize="26" fontWeight={700} fill={C.forestDeep} fontFamily={FONT}>
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Reithelm ---------- */

export type HelmetFit = "aufbau" | "richtig" | "offen" | "schief" | "muetze";

export function HelmetScene({ fit, className }: { fit: HelmetFit; className?: string }) {
  const showHead = fit !== "aufbau";
  const rot = fit === "schief" ? -22 : 0;
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Reithelm">
      <rect width="800" height="600" fill={C.bg} />
      <ellipse cx="400" cy="560" rx="240" ry="18" fill={C.brown} opacity=".12" />
      {showHead && (
        <g>
          {/* Schultern und Hals */}
          <path d="M250 600c10-80 70-110 150-110s140 30 150 110Z" fill={C.forest} />
          <path d="M370 500v-60h60v60Z" fill={C.skin} />
          {/* Kopf im Profil, Blick nach rechts */}
          <path d="M290 300c0-90 60-150 130-150 80 0 130 60 130 140 0 20 4 30 18 48 6 8 2 16-8 18l-8 2c2 10 0 18-6 24 4 12-2 22-14 24-4 34-40 56-90 56-90 0-152-60-152-162Z" fill={C.skin} />
          <circle cx="510" cy="300" r="9" fill={C.ink} />
          <path d="M520 382c12 4 22 4 30-2" stroke="#B7795A" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="470" cy="352" r="22" fill="#E99A84" opacity=".35" />
          {/* Ohr */}
          <path d="M380 300c-16-10-34 4-30 24 4 22 22 30 34 22" fill="#DB9E78" />
          {/* Zopf */}
          <path d="M300 300c-40 40-46 110-20 160 16-40 30-90 36-140Z" fill="#5A3420" />
        </g>
      )}
      {fit === "muetze" ? (
        <g>
          <path d="M296 268c0-90 60-128 130-128s126 40 126 128c-80-24-170-24-256 0Z" fill={C.rust} />
          <path d="M290 268c86-26 180-26 268 0v26c-88-24-182-24-268 0Z" fill="#8A4630" />
          <circle cx="426" cy="134" r="22" fill="#E8DCC4" />
        </g>
      ) : (
        <g transform={`rotate(${rot} 420 250)`}>
          {/* Helmschale */}
          <path d="M282 282c-4-106 62-160 144-160 88 0 140 58 140 150v16H282Z" fill={C.ink} />
          <path d="M330 170c30-28 80-36 120-22" stroke="#4A4740" strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Lüftung */}
          <g fill="#4A4740">
            <rect x="372" y="146" width="40" height="10" rx="5" />
            <rect x="440" y="146" width="40" height="10" rx="5" />
          </g>
          {/* Schirm */}
          <path d="M520 272c40-4 76 8 100 26-36 6-72 4-104-6Z" fill={C.ink} />
          {/* Polster-Rand */}
          <path d="M282 288h284" stroke={C.brownDeep} strokeWidth="10" strokeLinecap="round" />
          {/* Kinnriemen */}
          {fit === "offen" ? (
            <g stroke={C.brownDeep} strokeWidth="9" strokeLinecap="round" fill="none">
              <path d="M392 292c-4 60 0 120 6 170" />
              <path d="M470 292c10 50 18 92 22 140" />
              <rect x="482" y="430" width="24" height="16" rx="4" fill={C.gold} stroke="none" />
            </g>
          ) : (
            <g stroke={C.brownDeep} strokeWidth="9" strokeLinecap="round" fill="none">
              <path d="M392 292 L446 452" />
              <path d="M492 292 L452 452" />
              <path d="M446 452 C440 470 470 476 462 452" />
              <rect x="434" y="444" width="30" height="18" rx="5" fill={C.gold} stroke="none" />
            </g>
          )}
        </g>
      )}
      {fit === "aufbau" && (
        <>
          <Label x={426} y={96}>
            feste Schale
          </Label>
          <Label x={640} y={340} anchor="middle">
            Schirm
          </Label>
          <Label x={560} y={470} anchor="start">
            Kinnriemen
          </Label>
        </>
      )}
    </svg>
  );
}

/* ---------- Hände und Zügelhaltung (von vorn gesehen) ---------- */

export type HandsStyle = "richtig" | "verdeckt" | "breit";

function Fist({ x, upright, side }: { x: number; upright: boolean; side: "l" | "r" }) {
  const inward = side === "l" ? 1 : -1;
  return upright ? (
    <g transform={`translate(${x} 300)`}>
      {/* aufrechte Faust: Fingerknöchel zeigen zueinander, Daumen liegt oben auf dem Zügel */}
      <rect x="-42" y="-60" width="84" height="124" rx="36" fill={C.brownDeep} />
      <g stroke="#4A3426" strokeWidth="4" strokeLinecap="round">
        <path d={`M${inward * 10} -30h${inward * 30}M${inward * 10} 0h${inward * 30}M${inward * 10} 30h${inward * 30}`} />
      </g>
      {/* Daumen dachförmig */}
      <path d={`M${-inward * 24} -54 Q0 -100 ${inward * 30} -62`} stroke="#7A5C47" strokeWidth="26" strokeLinecap="round" fill="none" />
    </g>
  ) : (
    <g transform={`translate(${x} 316)`}>
      {/* verdeckte Faust: Handrücken zeigt nach oben */}
      <rect x="-70" y="-42" width="140" height="84" rx="36" fill={C.brownDeep} />
      <g stroke="#4A3426" strokeWidth="4" strokeLinecap="round">
        <path d="M-34 -22v44M0 -26v52M34 -22v44" />
      </g>
    </g>
  );
}

export function HandsScene({ style, className }: { style: HandsStyle; className?: string }) {
  const gap = style === "breit" ? 420 : 170;
  const lx = 400 - gap / 2;
  const rx = 400 + gap / 2;
  const upright = style !== "verdeckt";
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Hände mit Zügeln, von vorn gesehen">
      <rect width="800" height="600" fill={C.bg} />
      {/* Mähnenkamm des Pferdes */}
      <path d="M0 520c200-60 600-60 800 0v80H0Z" fill="#8A4A26" />
      <path d="M260 500c40-20 240-20 280 0" stroke="#1F1712" strokeWidth="26" strokeLinecap="round" fill="none" />
      {/* Zügel */}
      <g stroke="#4E3524" strokeWidth="12" fill="none" strokeLinecap="round">
        <path d={`M${lx} 360 C${lx} 450 380 470 380 600`} />
        <path d={`M${rx} 360 C${rx} 450 420 470 420 600`} />
        <path d={`M${lx + 10} 250 C${lx + 30} 330 380 380 400 420 C420 380 ${rx - 30} 330 ${rx - 10} 250`} opacity=".85" />
      </g>
      <Fist x={lx} upright={upright} side="l" />
      <Fist x={rx} upright={upright} side="r" />
    </svg>
  );
}
