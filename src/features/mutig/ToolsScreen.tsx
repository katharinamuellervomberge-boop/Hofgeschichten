"use client";

import { useEffect, useRef, useState } from "react";
import type { Tool, ToolId } from "@/content/mutig/types";
import { useMutig } from "./store";
import { SubNav } from "./SubNav";
import styles from "./mutig.module.css";

/** Eigene Einträge, die zu einem Werkzeug gehören */
const OWN: Partial<Record<ToolId, [string, string][]>> = {
  satz: [["satz", "Dein Mutmacher-Satz"], ["satzHalle", "Dein Satz für volle Hallen"]],
  plan: [["plan1", "Plan 1"], ["plan2", "Plan 2"], ["plan3", "Plan 3"], ["schlechtetage", "Plan für schlechte Tage"]],
  ritual: [["ritual", "Dein Ritual"]],
  gedanken: [["gedanken", "Deine Gedanken und Antworten"]],
};

/** Atem-Begleiter: 4 Sekunden ein, 6 Sekunden aus, fünf Atemzüge */
function Pacer() {
  const [phase, setPhase] = useState<"aus" | "ein" | "ausatmen" | "fertig">("aus");
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function run(n: number) {
    if (n >= 5) return setPhase("fertig");
    setCount(n + 1);
    setPhase("ein");
    timer.current = setTimeout(() => {
      setPhase("ausatmen");
      timer.current = setTimeout(() => run(n + 1), 6000);
    }, 4000);
  }

  const label = phase === "ein" ? "Einatmen …" : phase === "ausatmen" ? "Langsam ausatmen …" : phase === "fertig" ? "Gut gemacht." : "";
  return (
    <div className={styles.row} aria-live="polite">
      <button className={styles.btnGhost} type="button" onClick={() => run(0)} disabled={phase === "ein" || phase === "ausatmen"}>
        {phase === "fertig" ? "Noch einmal" : "Mit Begleiter atmen"}
      </button>
      {label && (
        <span className={styles.word}>
          {label}
          {(phase === "ein" || phase === "ausatmen") && <small className={styles.xs}> · Atemzug {count} von 5</small>}
        </span>
      )}
    </div>
  );
}

export function ToolsScreen({ tools }: { tools: Tool[] }) {
  const { state } = useMutig();
  const done = state?.done ?? [];
  const reached = (t: Tool) => done.includes(t.tag) || done.some((n) => n >= t.tag);

  return (
    <div className={styles.stack}>
      <SubNav />
      <div className={styles.card}>
        <h1 className={styles.h1}>Dein Mut-Werkzeugkasten</h1>
        <p className={styles.muted}>Acht Werkzeuge, jedes so kurz, dass es am Stall funktioniert. Freigeschaltet ist alles – im Programm lernst du sie nacheinander kennen.</p>
      </div>
      <ul className={styles.tools}>
        {tools.map((t) => (
          <li key={t.id} id={t.id} className={styles.card}>
            <div className={styles.between}>
              <h2 className={styles.h2}>{t.name}</h2>
              <span className={reached(t) ? styles.pillGood : styles.pill}>{reached(t) ? "gelernt" : `ab Tag ${t.tag}`}</span>
            </div>
            <p className={styles.xs}>{t.dauer} · {t.wann}</p>
            <p className={styles.p}>{t.warum}</p>
            <ol className={styles.steps}>
              {t.schritte.map((s) => <li key={s}>{s}</li>)}
            </ol>
            {t.id === "atem" && <Pacer />}
            {(OWN[t.id] ?? [])
              .filter(([k]) => state?.notes[k])
              .map(([k, label]) => (
                <div key={k} className={styles.note}>
                  <strong>{label}:</strong>
                  <div style={{ whiteSpace: "pre-wrap" }}>{state?.notes[k]}</div>
                </div>
              ))}
          </li>
        ))}
      </ul>
      <p className={styles.xs}>
        Langsames Atmen, ein äußerer Blickpunkt, Selbstgespräch, Wenn-dann-Pläne, mentales Training und Routinen sind in Studien gut untersucht,
        meist in anderen Sportarten. Für Angst beim Reiten selbst ist ihre Wirkung nicht eigens erforscht.
      </p>
    </div>
  );
}
