"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import { shuffle } from "../shuffle";
import { forLevel, pick, type MatchStep as S } from "../types";
import { VisualView } from "../VisualView";
import { Feedback, NextButton, Prompt, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

type Drag = { id: string; x: number; y: number; startX: number; startY: number; moved: boolean };

/**
 * Zuordnen per Drag-and-Drop – mit gleichwertiger Tipp-Alternative:
 * 1. Teil antippen (wird markiert)  2. Aufgabe antippen.
 * Funktioniert auch mit Tastatur und Screenreader (alles sind Knöpfe).
 */
export function MatchStep({ step, level, onDone }: StepProps<S>) {
  const targets = useMemo(() => forLevel(step.targets, level), [step.targets, level]);
  const items = useMemo(() => shuffle(forLevel(step.items, level)), [step.items, level]);
  const [placed, setPlaced] = useState<Record<string, string>>({}); // itemId -> targetId
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; tone: "good" | "hint" } | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const justDragged = useRef(false);
  const prompt = pick(step.prompt, level);
  useAutoSpeak(prompt, level);

  const remaining = items.filter((i) => !placed[i.id]);
  const complete = remaining.length === 0;

  const tryPlace = (itemId: string, targetId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || placed[itemId]) return;
    if (item.target === targetId) {
      setPlaced((p) => ({ ...p, [itemId]: targetId }));
      setSelected(null);
      setMsg({ text: item.say, tone: "good" });
      speak(item.say);
    } else {
      const parts = item.wrong ? [item.wrong] : [phrases.doesNotFit(item.label), phrases.tryOtherTask];
      setMsg({ text: parts.join(" "), tone: "hint" });
      speak(parts);
    }
  };

  /* ----- Ziehen mit Finger oder Maus ----- */
  const targetAt = (x: number, y: number): string | null => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-target]");
    return el?.dataset.target ?? null;
  };

  const onPointerDown = (e: RPointerEvent<HTMLButtonElement>, id: string) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const d = { id, x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, moved: false };
    dragRef.current = d;
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const moved = d.moved || Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 8;
      const next = { ...d, x: e.clientX, y: e.clientY, moved };
      dragRef.current = next;
      if (moved) {
        setDrag(next);
        setHover(targetAt(e.clientX, e.clientY));
      }
    };
    const up = (e: PointerEvent) => {
      const d = dragRef.current;
      dragRef.current = null;
      if (!d) return;
      if (d.moved) {
        justDragged.current = true;
        window.setTimeout(() => (justDragged.current = false), 60);
        const t = targetAt(e.clientX, e.clientY);
        setDrag(null);
        setHover(null);
        if (t) tryPlace(d.id, t);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, placed, targets]);

  const draggedItem = drag ? items.find((i) => i.id === drag.id) : undefined;

  return (
    <>
      <Prompt text={prompt} />

      <ul className={styles.matchTargets}>
        {targets.map((t) => {
          const here = items.filter((i) => placed[i.id] === t.id);
          return (
            <li key={t.id}>
              <button
                type="button"
                data-target={t.id}
                className={`${styles.matchTarget} ${selected ? styles.matchTargetActive : ""} ${hover === t.id ? styles.matchTargetHover : ""}`}
                onClick={() => {
                  if (selected) tryPlace(selected, t.id);
                  else speak(t.label);
                }}
                aria-label={selected ? `Hierhin legen: ${t.label}` : t.label}
              >
                {t.visual && <VisualView v={t.visual} decorative />}
                <span>{t.label}</span>
                <span className={styles.matchPlaced}>
                  {here.map((i) => (
                    <VisualView key={i.id} v={i.visual} decorative />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {!complete && (
        <ul className={styles.tray} aria-label="Putzkiste">
          {remaining.map((i) => (
            <li key={i.id}>
              <button
                type="button"
                className={`${styles.trayItem} ${selected === i.id ? styles.trayItemSelected : ""} ${drag?.id === i.id ? styles.trayItemDragging : ""}`}
                onPointerDown={(e) => onPointerDown(e, i.id)}
                onClick={() => {
                  if (justDragged.current) {
                    justDragged.current = false;
                    return;
                  }
                  setSelected((s) => (s === i.id ? null : i.id));
                  speak(i.label);
                }}
                aria-pressed={selected === i.id}
                aria-label={`${i.label}${selected === i.id ? " – ausgewählt, jetzt eine Aufgabe antippen" : ""}`}
              >
                <VisualView v={i.visual} decorative />
                <span>{i.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {drag?.moved && draggedItem && (
        <div className={styles.ghost} style={{ left: drag.x, top: drag.y }} aria-hidden>
          <VisualView v={draggedItem.visual} decorative />
        </div>
      )}

      <Feedback text={msg?.text ?? null} tone={msg?.tone ?? "good"} />
      {complete && <NextButton onClick={() => onDone()} />}
    </>
  );
}
