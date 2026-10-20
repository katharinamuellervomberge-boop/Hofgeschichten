"use client";

import { useMemo, useRef, useState, type PointerEvent } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import { forLevel, pick, type HotspotStep as S } from "../types";
import { viewBoxOf, VisualView } from "../VisualView";
import { Feedback, NextButton, Prompt, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

/**
 * Interaktives Bild: Ziele antippen (oder per Tastatur auswählen).
 * Jedes Ziel ist ein fokussierbarer Knopf – barrierearm und ohne Ziehen.
 */
export function HotspotStep({ step, level, onDone }: StepProps<S>) {
  const targets = useMemo(() => forLevel(step.targets, level), [step.targets, level]);
  const decoys = useMemo(() => forLevel(step.decoys ?? [], level), [step.decoys, level]);
  const [found, setFound] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ text: string; tone: "good" | "hint" } | null>(null);
  const [miss, setMiss] = useState<{ x: number; y: number; k: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prompt = pick(step.prompt, level);
  const sequence = step.mode === "sequence";
  const current = sequence ? targets[found.length] : undefined;
  const complete = found.length === targets.length;

  useAutoSpeak(sequence && current ? phrases.whereIs(current.label) : prompt, level);

  const say = (text: string | string[], tone: "good" | "hint") => {
    setMsg({ text: typeof text === "string" ? text : text.join(" "), tone });
    speak(text);
  };

  const hitTarget = (id: string) => {
    if (complete) return;
    const t = targets.find((x) => x.id === id)!;
    if (found.includes(id)) {
      say(t.say ? pick(t.say, level) : t.label, "good");
      return;
    }
    if (sequence && current && current.id !== id) {
      say([phrases.thisIs(t.label), phrases.searchedIs(current.label)], "hint");
      return;
    }
    const next = [...found, id];
    setFound(next);
    const text = t.say ? pick(t.say, level) : phrases.found(t.label);
    if (sequence && next.length < targets.length) {
      setMsg({ text, tone: "good" });
      speak([text, phrases.andNowWhereIs(targets[next.length].label)]);
    } else {
      say(text, "good");
    }
  };

  const hitDecoy = (id: string) => {
    const d = decoys.find((x) => x.id === id)!;
    say(d.say, "hint");
  };

  const onBackgroundTap = (e: PointerEvent<SVGRectElement>) => {
    if (complete) return;
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    setMiss({ x: p.x, y: p.y, k: Date.now() });
    say(
      sequence && current
        ? phrases.notHere(current.label)
        : (step.missHint ?? phrases.missDefault),
      "hint",
    );
  };

  const vb = viewBoxOf(step.scene).split(" ").map(Number);

  return (
    <>
      {sequence && current && !complete ? (
        <div className={styles.askBar} aria-live="polite">
          <Icon name="star" width={28} height={28} />
          <span>
            Wo ist <strong>{current.label}</strong>?
          </span>
        </div>
      ) : (
        <Prompt text={prompt} />
      )}

      <div className={styles.stage}>
        <VisualView v={step.scene} />
        <svg ref={svgRef} viewBox={viewBoxOf(step.scene)} className={styles.overlay} role="group" aria-label="Bild zum Antippen">
          <rect x={vb[0]} y={vb[1]} width={vb[2]} height={vb[3]} fill="transparent" onPointerDown={onBackgroundTap} />
          {miss && <circle key={miss.k} cx={miss.x} cy={miss.y} r={(vb[2] / 800) * 26} className={styles.missDot} />}
          {decoys.map((d) => (
            <g
              key={d.id}
              role="button"
              tabIndex={0}
              aria-label={d.label}
              className={styles.hit}
              onClick={() => hitDecoy(d.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), hitDecoy(d.id))}
            >
              <circle cx={d.x} cy={d.y} r={d.r} />
              <circle cx={d.x} cy={d.y} r={d.r} className={styles.ring} />
            </g>
          ))}
          {targets.map((t) => {
            const isFound = found.includes(t.id);
            return (
              <g
                key={t.id}
                role="button"
                tabIndex={0}
                aria-label={isFound ? `${t.label} (gefunden)` : sequence ? t.label : "Etwas Interessantes"}
                className={styles.hit}
                onClick={() => hitTarget(t.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), hitTarget(t.id))}
              >
                <circle cx={t.x} cy={t.y} r={t.r} />
                <circle cx={t.x} cy={t.y} r={t.r} className={isFound ? styles.foundRing : styles.ring} />
                {isFound && (
                  <g className={styles.foundCheck} transform={`translate(${t.x + t.r * 0.62} ${t.y - t.r * 0.62})`}>
                    <circle r={Math.max(9, t.r * 0.32)} fill="#344638" stroke="#fbf8f1" strokeWidth="3" />
                    <path
                      d={`M${-t.r * 0.14} 0l${t.r * 0.09} ${t.r * 0.1} ${t.r * 0.17}-${t.r * 0.2}`}
                      stroke="#fbf8f1"
                      strokeWidth={Math.max(2.5, t.r * 0.07)}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <ul className={styles.chips} aria-label="Gefunden">
        {targets.map((t) =>
          found.includes(t.id) ? (
            <li key={t.id} className={styles.chip}>
              <Icon name="check" width={22} height={22} />
              {t.label}
            </li>
          ) : (
            <li key={t.id} className={`${styles.chip} ${styles.chipEmpty}`} aria-label="Noch nicht gefunden">
              ?
            </li>
          ),
        )}
      </ul>

      <Feedback text={msg?.text ?? null} tone={msg?.tone ?? "good"} />

      {complete && (
        <NextButton
          onClick={() => onDone(targets.map((t) => t.clue).filter((c): c is string => Boolean(c)))}
        />
      )}
    </>
  );
}
