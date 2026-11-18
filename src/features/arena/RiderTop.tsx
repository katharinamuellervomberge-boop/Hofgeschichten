"use client";

import { memo } from "react";
import { aidSide, insideSide } from "@/content/arena/geometry";
import type { AidId, AidState, Bend, Rein } from "@/content/arena/types";
import styles from "./arena.module.css";

const STATE_WORD: Record<AidState, string> = {
  aktiv: "aktiv",
  verwahrend: "verwahrend",
  nachgebend: "gibt nach",
  neutral: "neutral",
  begleitend: "begleitend",
};

type P = [number, number];
const rot = ([x, y]: P, [cx, cy]: P, deg: number): P => {
  const a = (deg * Math.PI) / 180;
  return [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];
};
const mx = ([x, y]: P): P => [200 - x, y];

/**
 * Reiter und Pferd von oben, Kopf nach oben – die Ansicht, in der sich linke und rechte
 * Hilfen am klarsten zeigen lassen. Schematisch: Stellung, Schulterdrehung und Blick sind
 * angedeutet, nicht gemessen. Hervorgehobene Hilfen bekommen Kontur UND Beschriftung.
 */
export const RiderTop = memo(function RiderTop({
  bend,
  rein,
  nextBend,
  states,
  highlighted,
  selected,
}: {
  bend: Bend;
  /** aktuelle Hand (nach einem Handwechsel die neue) */
  rein: Rein;
  /** beim Umstellen: die neue Biegung, nach der sich innen/außen richten */
  nextBend?: "links" | "rechts";
  states: Partial<Record<AidId, AidState>>;
  highlighted: AidId[];
  selected: AidId | null;
}) {
  const inside = insideSide(bend);
  const dir = inside === "links" ? -1 : inside === "rechts" ? 1 : 0;
  const stellung = dir * 9;
  const shoulders = dir * 7;
  const gaze = dir * 28;
  const hl = (a: AidId) => selected === a || (!selected && highlighted.includes(a));
  const cls = (a: AidId, base: string) => `${base} ${hl(a) ? styles.rtHl : ""} ${selected && selected !== a ? styles.rtDim : ""}`;

  // Schenkel: am Gurt oder hinter dem Gurt – abhängig vom Zustand (verwahrend = hinter dem Gurt)
  const legPts = (aid: AidId): { hip: P; knee: P; foot: P } => {
    const behind = states[aid] === "verwahrend";
    const side = aidSide(aid, bend, rein, nextBend) ?? "links";
    const base = { hip: [84, 152] as P, knee: [65, 137] as P, foot: [60, behind ? 150 : 128] as P };
    return side === "links" ? base : { hip: mx(base.hip), knee: mx(base.knee), foot: mx(base.foot) };
  };
  const pivot: P = [100, 84];
  const bit = (side: "links" | "rechts"): P => rot(side === "links" ? [93, 22] : [107, 22], pivot, stellung);
  const handOf = (side: "links" | "rechts"): P => (side === "links" ? [88, 108] : [112, 108]);
  const reinSide = (aid: AidId) => aidSide(aid, bend, rein, nextBend) ?? "links";
  const legs: AidId[] = ["innenSchenkel", "aussenSchenkel"];
  const reins: AidId[] = ["innenZuegel", "aussenZuegel"];
  const label = (a: AidId) => (states[a] ? STATE_WORD[states[a]!] : "");
  const weightSide = inside && states.gewicht === "aktiv" ? inside : null;

  return (
    <svg viewBox="0 0 200 280" className={styles.riderSvg} role="img" aria-label="Reiter und Pferd von oben, schematisch">
      {/* Pferd */}
      <g transform={`rotate(${stellung} ${pivot[0]} ${pivot[1]})`}>
        <path d="M 85 98 Q 87 68 92 50 L 92 24 Q 100 2 108 24 L 108 50 Q 113 68 115 98 Z" className={styles.rtHorse} />
      </g>
      <ellipse cx={100} cy={170} rx={37} ry={92} className={styles.rtHorse} />
      <path d="M 100 258 Q 96 272 100 278 Q 104 272 100 258" className={styles.rtHorse} />
      <line x1={64} y1={126} x2={136} y2={126} className={styles.rtGirth} />
      <text x={150} y={121} className={styles.rtSmall}>Gurt</text>
      <rect x={79} y={128} width={42} height={46} rx={9} className={styles.rtSaddle} />

      {/* Zügel und Hände */}
      {reins.map((a) => {
        const side = reinSide(a);
        const h = handOf(side);
        const b = bit(side);
        return (
          <g key={a} className={cls(a, styles.rtPart)}>
            <line x1={h[0]} y1={h[1]} x2={b[0]} y2={b[1]} className={styles.rtRein} />
            <circle cx={h[0]} cy={h[1]} r={5} className={styles.rtHand} />
            {hl(a) && (
              <text x={side === "links" ? h[0] - 10 : h[0] + 10} y={h[1] - 12} textAnchor={side === "links" ? "end" : "start"} className={styles.rtLabel}>
                {label(a)}
              </text>
            )}
          </g>
        );
      })}

      {/* Schenkel */}
      {legs.map((a) => {
        const { hip, knee, foot } = legPts(a);
        const side = aidSide(a, bend, rein, nextBend) ?? "links";
        return (
          <g key={a} className={cls(a, styles.rtPart)}>
            <polyline points={`${hip.join(",")} ${knee.join(",")} ${foot.join(",")}`} className={styles.rtLeg} />
            {hl(a) && (
              <text x={side === "links" ? foot[0] - 8 : foot[0] + 8} y={foot[1] + 4} textAnchor={side === "links" ? "end" : "start"} className={styles.rtLabel}>
                {label(a)}
              </text>
            )}
          </g>
        );
      })}

      {/* Becken mit Gesäßknochen */}
      <g className={cls("sitz", styles.rtPart)}>
        <ellipse cx={100} cy={152} rx={21} ry={10} className={styles.rtBody} />
      </g>
      <g className={cls("gewicht", styles.rtPart)}>
        <circle cx={91} cy={154} r={weightSide === "links" ? 4.2 : 2.6} className={styles.rtSeatBone} />
        <circle cx={109} cy={154} r={weightSide === "rechts" ? 4.2 : 2.6} className={styles.rtSeatBone} />
      </g>

      {/* Schultern und Kopf */}
      <g className={cls("oberkoerper", styles.rtPart)} transform={`rotate(${shoulders} 100 136)`}>
        <rect x={69} y={129} width={62} height={14} rx={7} className={styles.rtBody} />
      </g>
      <circle cx={100} cy={134} r={9.5} className={styles.rtHead} />
      <g className={cls("blick", styles.rtPart)} transform={`rotate(${gaze} 100 134)`}>
        <line x1={100} y1={124} x2={100} y2={98} className={styles.rtGaze} />
        <path d="M 95 103 L 100 96 L 105 103" className={styles.rtGaze} />
      </g>
    </svg>
  );
});
