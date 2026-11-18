"use client";

import { memo } from "react";
import { ARENA_WIDTH, arenaLength, arenaLetters, pathD, sampleAt, type Sample, type Track } from "@/content/arena/geometry";
import type { Annotation, ArenaSize, Phase, Segment } from "@/content/arena/types";
import styles from "./arena.module.css";

export type Layers = { linie: boolean; buchstaben: boolean; richtung: boolean; hilfen: boolean; erklaerungen: boolean };

const PAD = 3.2;
/** Die Geometrie rechnet in Metern; das SVG zeichnet in Dezimetern, damit Schrift nie unter 1 px fällt */
const U = 10;

/** Text an einem Meterpunkt; Schriftgröße in CSS (Dezimeter-Maßstab) */
function T({ x, y, className, anchor = "middle", children, central }: { x: number; y: number; className: string; anchor?: "start" | "middle" | "end"; children: string | number; central?: boolean }) {
  return (
    <text transform={`translate(${x} ${y}) scale(${1 / U})`} className={className} textAnchor={anchor} dominantBaseline={central ? "central" : undefined}>
      {children}
    </text>
  );
}

/** Statische Ebenen (Bahn, Buchstaben, Linie, Richtung, Phasenmarken) – zeichnen nur neu, wenn sich Übung, Hand oder Ebenen ändern */
const StaticLayers = memo(function StaticLayers({
  size,
  segments,
  track,
  phases,
  phaseTimes,
  annotations,
  layers,
}: {
  size: ArenaSize;
  segments: Segment[];
  track: Track;
  phases: Phase[];
  phaseTimes: number[];
  annotations: Annotation[];
  layers: Layers;
}) {
  const L = arenaLength(size);
  const letters = arenaLetters(size);
  const d = pathD(segments);
  const arrows = [0.12, 0.38, 0.62, 0.88].map((k) => sampleAt(track, track.totalTime * k));
  return (
    <>
      {/* 1 Bahn */}
      <rect x={0} y={0} width={L} height={ARENA_WIDTH} rx={0.25} className={styles.surface} />
      <line x1={0} y1={10} x2={L} y2={10} className={styles.centerline} />

      {/* 2 Buchstaben */}
      {layers.buchstaben && (
        <g className={styles.letters} aria-hidden>
          {letters.map((l) => {
            if (l.side === "mitte")
              return (
                <g key={l.l}>
                  <circle cx={l.x} cy={l.y} r={0.18} className={styles.midDot} />
                  <T x={l.x + 0.5} y={l.y - 0.45} className={styles.midLetter} anchor="start">
                    {l.l}
                  </T>
                </g>
              );
            const x = l.side === "kurz" ? (l.x === 0 ? -1.7 : L + 1.7) : l.x;
            const y = l.side === "oben" ? -1.5 : l.side === "unten" ? ARENA_WIDTH + 1.5 : l.y;
            return (
              <g key={l.l}>
                <line
                  x1={l.side === "kurz" ? (l.x === 0 ? -0.5 : L + 0.5) : l.x}
                  y1={l.side === "oben" ? -0.5 : l.side === "unten" ? ARENA_WIDTH + 0.5 : l.y}
                  x2={l.side === "kurz" ? (l.x === 0 ? 0 : L) : l.x}
                  y2={l.side === "oben" ? 0 : l.side === "unten" ? ARENA_WIDTH : l.y}
                  className={styles.tick}
                />
                <T x={x} y={y} className={styles.letter} central>
                  {l.l}
                </T>
              </g>
            );
          })}
        </g>
      )}

      {/* 3 Linie (ganze Linie hell; der gerittene Teil wird darüber gezeichnet) */}
      {layers.linie && <path d={d} className={styles.lineGhost} />}

      {/* 4 Bewegungsrichtung */}
      {layers.richtung &&
        arrows.map((a, i) => (
          <path
            key={i}
            d="M -0.55 -0.5 L 0.35 0 L -0.55 0.5"
            className={styles.chevron}
            transform={`translate(${a.p.x} ${a.p.y}) rotate(${a.heading})`}
            aria-hidden
          />
        ))}

      {/* 7 Hilfen-Marken: Beginn jeder Phase, mit Nummer (nicht nur Farbe) */}
      {layers.hilfen &&
        phases.map((p, i) => {
          const s = sampleAt(track, phaseTimes[i]);
          return (
            <g key={p.id} transform={`translate(${s.p.x} ${s.p.y})`} aria-hidden>
              <circle r={0.85} className={styles.phaseMark} />
              <T x={0} y={0} className={styles.phaseNum} central>
                {i + 1}
              </T>
            </g>
          );
        })}

      {/* 8 Erklärende Notizen */}
      {layers.erklaerungen &&
        annotations.map((a) => (
          <T key={a.label} x={a.at.x} y={a.at.y + (a.at.y <= 0.01 ? 1.6 : a.at.y >= ARENA_WIDTH - 0.01 ? -1.2 : -1)} className={styles.note}>
            {a.label}
          </T>
        ))}
    </>
  );
});

/**
 * Bahn von oben in echten Metern (viewBox = Meter). A links, C rechts, K–E–H oben.
 * Das Pferd ist ein Symbol: Es zeigt Ort und Richtung, keine Biegung.
 */
export function ArenaView({
  size,
  segments,
  track,
  phases,
  phaseTimes,
  annotations,
  layers,
  sample,
  label,
}: {
  size: ArenaSize;
  segments: Segment[];
  track: Track;
  phases: Phase[];
  phaseTimes: number[];
  annotations: Annotation[];
  layers: Layers;
  sample: Sample;
  label: string;
}) {
  const L = arenaLength(size);
  const progress = track.totalLen > 0 ? sample.s / track.totalLen : 0;
  return (
    <svg
      viewBox={`${-PAD * U} ${-PAD * U} ${(L + 2 * PAD) * U} ${(ARENA_WIDTH + 2 * PAD) * U}`}
      className={styles.arenaSvg}
      role="img"
      aria-label={label}
    >
      <g transform={`scale(${U})`}>
      <StaticLayers size={size} segments={segments} track={track} phases={phases} phaseTimes={phaseTimes} annotations={annotations} layers={layers} />
      {layers.linie && (
        <path d={pathD(segments)} pathLength={1} className={styles.lineDone} strokeDasharray={`${progress} 1`} />
      )}
      {/* 5 Pferd und Reiter (Symbol) */}
      <g transform={`translate(${sample.p.x} ${sample.p.y}) rotate(${sample.heading})`}>
        <ellipse cx={-0.2} cy={0} rx={1.35} ry={0.5} className={styles.horseBody} />
        <path d="M 0.9 -0.22 L 2.05 -0.16 Q 2.35 0 2.05 0.16 L 0.9 0.22 Z" className={styles.horseBody} />
        <circle cx={-0.15} cy={0} r={0.36} className={styles.rider} />
      </g>
      </g>
    </svg>
  );
}
