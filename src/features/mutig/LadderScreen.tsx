"use client";

import { useState } from "react";
import { Barometer } from "./Barometer";
import { currentStepIndex, dateLabel, fearWord, isConsolidated, newStepToday, saddleLocked, today, uid, type Step } from "./logic";
import { useMutig } from "./store";
import { SubNav } from "./SubNav";
import styles from "./mutig.module.css";

/**
 * Mut-Leiter: 10 Stufen bis zum eigenen Ziel. Regeln (eigene Setzung, keine Sicherheitsgarantie):
 * gefestigt nach 3 Durchgängen mit Angst ≤ 4 an mindestens zwei Tagen; höchstens eine neue Stufe pro Tag;
 * Sattel-Stufen nur mit Begleitperson und – falls nötig – Freigabe.
 */
export function LadderScreen() {
  const { state, update } = useMutig();
  const [open, setOpen] = useState<string | null>(null);
  const [fuerchte, setFuerchte] = useState("");
  const [passiert, setPassiert] = useState("");
  const [fear, setFear] = useState<number | null>(null);
  const [companion, setCompanion] = useState(false);
  const [saved, setSaved] = useState<number | null>(null);
  const [rename, setRename] = useState<string | null>(null);

  if (!state) return <p className={styles.muted}>Einen Moment …</p>;
  if (!state.onboarded || !state.ladder.length) {
    return (
      <div className={styles.stack}>
        <SubNav />
        <p className={styles.note}>Deine Mut-Leiter entsteht beim Start-Check. Starte ihn auf der Programmseite.</p>
      </div>
    );
  }

  const cur = currentStepIndex(state.ladder);
  const locked = saddleLocked(state);

  function reset() {
    setFuerchte("");
    setPassiert("");
    setFear(null);
    setCompanion(false);
    setRename(null);
  }

  const setLadder = (fn: (l: Step[]) => Step[]) => update((s) => ({ ...s, ladder: fn(s.ladder) }));

  async function addRun(step: Step) {
    if (fear === null) return;
    await setLadder((l) =>
      l.map((x) =>
        x.id === step.id
          ? { ...x, runs: [...x.runs, { id: uid(), date: today(), fuerchte: fuerchte.trim(), passiert: passiert.trim(), fear, begleitung: companion }] }
          : x,
      ),
    );
    await update((s) => ({
      ...s,
      diary: [{ id: uid(), date: today(), title: `Mut-Leiter · ${step.t}`, before: null, after: fear, text: [fuerchte && `Befürchtet: ${fuerchte}`, passiert && `Passiert: ${passiert}`].filter(Boolean).join("\n") }, ...s.diary],
    }));
    setSaved(fear);
    reset();
  }

  async function split(step: Step) {
    await setLadder((l) => {
      const k = l.findIndex((x) => x.id === step.id);
      const copy = [...l];
      copy.splice(k, 0, { id: uid(), t: `${step.t} (kleiner Schritt)`, saddle: step.saddle, runs: [] });
      return copy;
    });
    setOpen(null);
  }

  async function saveName(step: Step) {
    const t = (rename ?? "").trim();
    if (t) await setLadder((l) => l.map((x) => (x.id === step.id ? { ...x, t } : x)));
    setRename(null);
  }

  return (
    <div className={styles.stack}>
      <SubNav />
      <div className={styles.card}>
        <h1 className={styles.h1}>Deine Mut-Leiter</h1>
        <p className={styles.muted}>
          Vor jedem Durchgang schreibst du auf, was du befürchtest, danach, was wirklich passiert ist. Gefestigt ist eine Stufe nach drei
          Durchgängen mit Angst höchstens 4, an mindestens zwei verschiedenen Tagen. Wiederholen ist ausdrücklich erwünscht.
        </p>
      </div>

      {locked && (
        <div className={styles.warn}>
          <p className={styles.notePlain}>
            Deine Sattel-Stufen sind gesperrt, bis dich eine Ärztin oder Hebamme fürs Reiten freigegeben hat. Boden- und Kopfarbeit läuft ganz normal.
          </p>
          <button className={styles.btnLink} type="button" onClick={() => update((s) => ({ ...s, freigabe: "ja" }))}>
            Ich habe meine Freigabe bekommen
          </button>
        </div>
      )}

      {saved !== null && (
        <div className={styles.note} role="status">
          {saved > 7
            ? "Das war heute viel. Geh beim nächsten Mal eine Stufe zurück oder teile diese Stufe, und mach vorher einen Atem-Reset. Dieser Durchgang zählt trotzdem als Training."
            : `Eingetragen: ${saved} von 10 – ${fearWord(saved)}. Gut gemacht.`}
        </div>
      )}

      <ol className={styles.ladder} aria-label="Stufen, von oben nach unten">
        {state.ladder
          .map((s, k) => ({ s, k }))
          .reverse()
          .map(({ s, k }) => {
            const done = isConsolidated(s);
            const goal = k === state.ladder.length - 1;
            const isLocked = (s.saddle && locked) || k > cur;
            const isOpen = open === s.id;
            const firstToday = s.runs.length === 0 && newStepToday(state.ladder, s.id);
            const needCompanion = s.saddle;
            const cls = `${styles.step} ${done ? styles.stepDone : ""} ${k === cur && !done ? styles.stepWork : ""} ${goal ? styles.stepGoal : ""}`;
            return (
              <li key={s.id} className={cls}>
                <div className={styles.stepHead}>
                  <span className={styles.unitNum}>{done ? "✓" : k + 1}</span>
                  <div style={{ display: "grid", gap: "0.35rem" }}>
                    <span className={styles.unitTitle}>{goal ? `Ziel: ${s.t}` : s.t}</span>
                    <span className={styles.pills}>
                      {done && <span className={styles.pillGood}>gefestigt</span>}
                      {!done && k === cur && <span className={styles.pill}>aktuelle Stufe</span>}
                      {s.saddle && <span className={styles.pill}>im Sattel · mit Begleitung</span>}
                      {s.runs.map((r) => (
                        <span key={r.id} className={r.fear > 7 ? styles.pillHigh : r.fear <= 4 ? styles.pillGood : styles.pill} title={dateLabel(r.date)}>
                          {r.fear}
                        </span>
                      ))}
                    </span>
                    {!isOpen && (
                      <button className={styles.btnLink} type="button" onClick={() => { reset(); setSaved(null); setOpen(s.id); }}>
                        {isLocked ? "Ansehen" : "Durchgang eintragen"}
                      </button>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div style={{ display: "grid", gap: "0.7rem" }}>
                    {s.runs.length > 0 && (
                      <ul className={styles.steps} style={{ listStyle: "none", paddingLeft: 0 }}>
                        {s.runs.map((r) => (
                          <li key={r.id} className={styles.muted}>
                            {dateLabel(r.date)} · Angst {r.fear}
                            {r.fuerchte && ` · befürchtet: ${r.fuerchte}`}
                            {r.passiert && ` · passiert: ${r.passiert}`}
                          </li>
                        ))}
                      </ul>
                    )}

                    {isLocked ? (
                      <p className={styles.note}>
                        {s.saddle && locked ? "Gesperrt bis zur Freigabe." : "Diese Stufe öffnet sich, sobald die Stufe darunter gefestigt ist."}
                      </p>
                    ) : firstToday ? (
                      <p className={styles.note}>Heute hast du schon eine neue Stufe begonnen. Höchstens eine neue Stufe pro Tag – wiederhole lieber eine, die du schon kennst.</p>
                    ) : (
                      <>
                        <label className={styles.field}>
                          Vorher: Was befürchtest du?
                          <input className={styles.input} value={fuerchte} maxLength={200} placeholder="Ich befürchte, dass …" onChange={(e) => setFuerchte(e.target.value)} />
                        </label>
                        <label className={styles.field}>
                          Nachher: Was ist wirklich passiert?
                          <input className={styles.input} value={passiert} maxLength={200} onChange={(e) => setPassiert(e.target.value)} />
                        </label>
                        <div className={styles.field}>
                          Wie groß war die Angst?
                          <Barometer value={fear} onChange={setFear} label="Angst bei diesem Durchgang" />
                        </div>
                        {needCompanion && (
                          <label className={styles.check}>
                            <input type="checkbox" checked={companion} onChange={(e) => setCompanion(e.target.checked)} />
                            Eine zweite Person war dabei, ich hatte Helm und passende Ausrüstung.
                          </label>
                        )}
                        <button className={styles.btn} type="button" disabled={fear === null || (needCompanion && !companion)} onClick={() => addRun(s)}>
                          Durchgang speichern
                        </button>
                      </>
                    )}

                    {rename !== null ? (
                      <div className={styles.row}>
                        <input className={styles.input} value={rename} maxLength={160} onChange={(e) => setRename(e.target.value)} aria-label="Neuer Name der Stufe" />
                        <button className={styles.btnGhost} type="button" onClick={() => saveName(s)}>Speichern</button>
                      </div>
                    ) : (
                      <div className={styles.row}>
                        <button className={styles.btnLink} type="button" onClick={() => setRename(s.t)}>Umbenennen</button>
                        {!done && !goal && (
                          <button className={styles.btnLink} type="button" onClick={() => split(s)}>Stufe ist zu groß – teilen</button>
                        )}
                        <button className={styles.btnLink} type="button" onClick={() => { setOpen(null); reset(); }}>Schließen</button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
      </ol>
      <p className={styles.xs}>
        Das Kriterium „gefestigt“ ist eine Orientierung dieses Programms, keine Sicherheitsgarantie. Für Sattel-Stufen empfehlen wir ein ruhiges,
        erfahrenes Pferd.
      </p>
    </div>
  );
}
