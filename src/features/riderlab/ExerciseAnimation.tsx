"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { FigureScene, C } from "./Figure";
import { GROUND, loopLength, poseAt, solve, type Frame, type P } from "./kinematics";
import type { Animation, Overlay } from "./types";
import styles from "./riderlab.module.css";

/** Laufende Zeit in Sekunden (requestAnimationFrame), anhaltbar */
export function useClock(playing: boolean) {
  const [t, setT] = useState(0);
  const last = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (last.current !== null) {
        const dt = Math.min(0.1, (now - last.current) / 1000);
        setT((x) => x + dt);
      }
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);
  return [t, setT] as const;
}

function traceFor(frames: Frame[], view: Animation["view"], overlays: Overlay[] | undefined) {
  const out: Record<string, P[]> = {};
  const T = loopLength(frames);
  for (const o of overlays ?? []) {
    if (o.k !== "trace") continue;
    const pts: P[] = [];
    for (let i = 0; i <= 80; i++) {
      const v = view === "front" ? "front" : "side";
      const j = solve(poseAt(frames, (T * i) / 80, v).pose, v);
      pts.push(j[o.at]);
    }
    out[o.at] = pts;
  }
  return out;
}

/**
 * Animierte Vorführung einer Übung: läuft in Schleife, lässt sich anhalten,
 * und zeigt auf Wunsch den häufigsten Fehler (rot).
 */
export function ExerciseAnimation({ anim, title, compact }: { anim: Animation; title: string; compact?: boolean }) {
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [mode, setMode] = useState<"ok" | "bad">("ok");
  const [t, setT] = useClock(playing && !reduced);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const bad = mode === "bad" && anim.mistake;
  const frames = bad ? anim.mistake!.frames : anim.frames;
  const overlays = bad ? anim.mistake!.overlays : anim.overlays;
  const T = loopLength(frames);
  const lt = T > 0 ? t % T : 0;
  const { pose, label } = poseAt(frames, t, anim.view === "front" ? "front" : "side");
  const traces = useMemo(() => traceFor(frames, anim.view, overlays), [frames, anim.view, overlays]);
  const beat = anim.beats && !bad ? [...anim.beats].reverse().find((b) => lt >= b.t) : undefined;
  const beatOn = beat ? lt - beat.t < 0.35 : false;

  return (
    <figure className={`${styles.anim} ${bad ? styles.animBad : ""}`} aria-label={`Animation: ${title}`}>
      <svg viewBox="0 0 360 260" className={styles.animSvg} role="img" aria-label={`${title} – ${bad ? anim.mistake!.label : label ?? "Bewegungsablauf"}`}>
        <rect x="0" y="0" width="360" height="260" fill={C.ivory} />
        <rect x="0" y={GROUND} width="360" height={260 - GROUND} fill={C.sandLight} />
        <path d={`M0 ${GROUND} H360`} stroke={C.sandDeep} strokeWidth="1.5" />
        <FigureScene view={anim.view} pose={pose} props={anim.props} overlays={overlays} t={lt} traces={traces} />
        {anim.beats && !bad && (
          <g>
            {anim.beats.map((b, i) => (
              <g key={i} transform={`translate(${300 + i * 22} 30)`}>
                <circle r={beat === b && beatOn ? 9 : 6} fill={beat === b ? C.honey : C.sand} />
              </g>
            ))}
            {beat && (
              <text x={300 + ((anim.beats.length - 1) * 22) / 2} y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.forestDeep} fontFamily="var(--font-display), Georgia, serif">
                {beat.text}
              </text>
            )}
          </g>
        )}
      </svg>
      <figcaption className={styles.animBar}>
        <span className={styles.animPhase} aria-live="polite">
          {bad ? (
            <>
              <strong>Häufiger Fehler:</strong> {anim.mistake!.label}
            </>
          ) : (
            label ?? "Bewegungsablauf"
          )}
        </span>
        <span className={styles.animControls}>
          {anim.mistake && !compact && (
            <span className={styles.seg} role="group" aria-label="Darstellung">
              <button type="button" aria-pressed={mode === "ok"} onClick={() => { setMode("ok"); setT(0); }}>
                Richtig
              </button>
              <button type="button" aria-pressed={mode === "bad"} onClick={() => { setMode("bad"); setT(0); }}>
                Häufiger Fehler
              </button>
            </span>
          )}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => {
              if (reduced) setReduced(false);
              setPlaying((p) => !p || reduced);
            }}
            aria-label={playing && !reduced ? "Animation anhalten" : "Animation abspielen"}
          >
            <Icon name={playing && !reduced ? "pause" : "play"} />
          </button>
          <button type="button" className={styles.iconBtn} onClick={() => setT(0)} aria-label="Animation von vorn">
            <Icon name="replay" />
          </button>
        </span>
      </figcaption>
      {bad && !compact && <p className={styles.animBadText}>{anim.mistake!.text}</p>}
    </figure>
  );
}
