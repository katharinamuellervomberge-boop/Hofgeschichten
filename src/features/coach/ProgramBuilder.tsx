"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { coachExerciseTitle, defaultDays, WEEKDAY_SHORT } from "@/features/tagebuch/coach";
import { addDays, weekStart } from "@/features/tagebuch/plan";
import type { GoalProgram, Horse } from "@/features/tagebuch/types";
import s from "./coach.module.css";

export type ProgramDraft = { title: string; horseId?: string; program: GoalProgram };

type Props = {
  /** Ziel-Titel und Wochen aus der Vorlage */
  title: string;
  weeks: GoalProgram["weeks"];
  /** Übungen, die zur Auswahl stehen (rc-…) */
  options: string[];
  horses?: Pick<Horse, "id" | "name">[];
  initialDays?: number[];
  initialStart?: string;
  /** Dauer ändern → neue Wochen aus der Vorlage (nur beim Anlegen) */
  resize?: (weeks: number) => GoalProgram["weeks"];
  submitLabel: string;
  onSave: (d: ProgramDraft) => Promise<void>;
  onCancel?: () => void;
};

/**
 * Editierbarer Trainingsplan: Ziel, Dauer (2–8 Wochen), Trainingstage, Übungen je Woche, Start.
 * Wird von „Daraus einen Trainingsplan machen“ und beim Anpassen eines Ziels verwendet.
 * Fortschritt wird nie behauptet – er entsteht erst durch abgehakte Einheiten.
 */
export function ProgramBuilder({ title: t0, weeks: w0, options, horses = [], initialDays, initialStart, resize, submitLabel, onSave, onCancel }: Props) {
  const id = useId();
  const thisWeek = weekStart();
  const [title, setTitle] = useState(t0);
  const [weeks, setWeeks] = useState(w0);
  const [days, setDays] = useState<number[]>(initialDays ?? defaultDays(3));
  const [start, setStart] = useState(initialStart ?? thisWeek);
  const [horseId, setHorseId] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const allOptions = [...new Set([...options, ...weeks.flatMap((w) => w.exercises)])];

  const setCount = (n: number) => {
    if (n < 2 || n > 8) return;
    if (resize) setWeeks(resize(n));
    else if (n > weeks.length) setWeeks([...weeks, ...Array.from({ length: n - weeks.length }, (_, i) => ({ title: `Festigen (${i + 1})`, exercises: weeks[weeks.length - 1].exercises }))]);
    else setWeeks(weeks.slice(0, n));
  };

  const toggleEx = (wi: number, ex: string) =>
    setWeeks((ws) => ws.map((w, i) => (i !== wi ? w : { ...w, exercises: w.exercises.includes(ex) ? w.exercises.filter((x) => x !== ex) : [...w.exercises, ex].slice(0, 8) })));

  async function submit() {
    if (!title.trim()) return setErr("Wie heißt dein Ziel?");
    if (days.length === 0) return setErr("Wähle mindestens einen Trainingstag.");
    if (weeks.some((w) => w.exercises.length === 0)) return setErr("Jede Woche braucht mindestens eine Übung.");
    setErr(null);
    setBusy(true);
    try {
      await onSave({ title: title.trim(), horseId: horseId || undefined, program: { weeks: weeks.map((w) => ({ ...w, title: w.title.trim() || "Woche" })), days: [...days].sort(), start } });
    } catch {
      setErr("Speichern hat nicht geklappt. Bitte nochmal versuchen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={s.builder}>
      <div className={s.field}>
        <label htmlFor={`${id}-t`} className={s.label}>
          Dein Ziel
        </label>
        <input id={`${id}-t`} className={s.input} value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className={s.field}>
        <span className={s.label} id={`${id}-d`}>
          Dauer
        </span>
        <div className={s.stepper} role="group" aria-labelledby={`${id}-d`}>
          <button type="button" aria-label="Eine Woche weniger" onClick={() => setCount(weeks.length - 1)} disabled={weeks.length <= 2}>
            −
          </button>
          <output aria-live="polite">{weeks.length} Wochen</output>
          <button type="button" aria-label="Eine Woche mehr" onClick={() => setCount(weeks.length + 1)} disabled={weeks.length >= 8}>
            +
          </button>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.label} id={`${id}-days`}>
          Trainingstage ({days.length}× pro Woche)
        </span>
        <div className={s.dayChips} role="group" aria-labelledby={`${id}-days`}>
          {WEEKDAY_SHORT.map((d, i) => (
            <button
              key={d}
              type="button"
              className={`${s.chip} ${days.includes(i) ? s.chipOn : ""}`}
              aria-pressed={days.includes(i)}
              onClick={() => setDays((x) => (x.includes(i) ? x.filter((y) => y !== i) : [...x, i]))}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className={s.field}>
        <span className={s.label} id={`${id}-s`}>
          Start
        </span>
        <div className={s.chips} role="group" aria-labelledby={`${id}-s`}>
          {[
            [thisWeek, "Diese Woche"],
            [addDays(thisWeek, 7), "Nächste Woche"],
          ].map(([v, l]) => (
            <button key={v} type="button" className={`${s.chip} ${start === v ? s.chipOn : ""}`} aria-pressed={start === v} onClick={() => setStart(v)}>
              {l}
            </button>
          ))}
        </div>
        {start === thisWeek && <p className={s.muted}>Vergangene Tage dieser Woche werden nicht eingeplant.</p>}
      </div>

      {horses.length > 0 && (
        <div className={s.field}>
          <span className={s.label} id={`${id}-h`}>
            Mit welchem Pferd? (freiwillig)
          </span>
          <div className={s.chips} role="group" aria-labelledby={`${id}-h`}>
            {horses.map((h) => (
              <button key={h.id} type="button" className={`${s.chip} ${horseId === h.id ? s.chipOn : ""}`} aria-pressed={horseId === h.id} onClick={() => setHorseId(horseId === h.id ? "" : h.id)}>
                {h.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={s.field}>
        <span className={s.label}>Übungen je Woche</span>
        <ol className={s.weeks}>
          {weeks.map((w, wi) => (
            <li key={wi} className={s.week}>
              <div className={s.weekHead}>
                <span className={s.weekNum}>Woche {wi + 1}</span>
                <input
                  className={s.weekTitleInput}
                  aria-label={`Titel Woche ${wi + 1}`}
                  value={w.title}
                  maxLength={80}
                  onChange={(e) => setWeeks((ws) => ws.map((x, i) => (i === wi ? { ...x, title: e.target.value } : x)))}
                />
              </div>
              {allOptions.map((ex) => (
                <label key={ex} className={s.exToggle}>
                  <input type="checkbox" checked={w.exercises.includes(ex)} onChange={() => toggleEx(wi, ex)} />
                  <span>{coachExerciseTitle(ex)}</span>
                </label>
              ))}
            </li>
          ))}
        </ol>
      </div>

      {err && (
        <p className={s.error} role="alert">
          {err}
        </p>
      )}
      <div className={s.btnRow}>
        <button type="button" className={s.btn} onClick={submit} disabled={busy}>
          <Icon name="plan" /> {busy ? "Speichert …" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={onCancel}>
            Abbrechen
          </button>
        )}
      </div>
    </div>
  );
}
