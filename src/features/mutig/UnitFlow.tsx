"use client";

import { useMemo, useState } from "react";
import Link from "@/i18n/Link";
import { WEEKS, weekOf } from "@/content/mutig/katalog";
import type { Tool, UnitContent, WegLesson } from "@/content/mutig/types";
import { AbschlussCard } from "./AbschlussCard";
import { Barometer } from "./Barometer";
import { fearWord, saddleLocked, today, uid, unitUnlockedInOrder } from "./logic";
import { useMutig } from "./store";
import styles from "./mutig.module.css";

type Props = {
  unit: UnitContent;
  title: string;
  lesson: WegLesson | null;
  tool: Tool | null;
  audioUrl: string | null;
};

type StepId = "vorher" | "impuls" | "uebung" | "weg" | "stall" | "nachher" | "fertig";

export function UnitFlow({ unit, title, lesson, tool, audioUrl }: Props) {
  const { state, update } = useMutig();
  const [i, setI] = useState(0);
  const [before, setBefore] = useState<number | null>(null);
  const [after, setAfter] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [input, setInput] = useState<string | null>(null);
  const [stall, setStall] = useState<"ja" | "nein" | null>(null);
  const [companion, setCompanion] = useState(false);
  const [saving, setSaving] = useState(false);

  const steps = useMemo<StepId[]>(() => {
    const s: StepId[] = ["vorher", "impuls", "uebung"];
    if (lesson) s.push("weg");
    if (unit.stall) s.push("stall");
    s.push("nachher", "fertig");
    return s;
  }, [lesson, unit.stall]);

  if (!state) return <p className={styles.muted}>Einen Moment …</p>;
  if (!state.onboarded) {
    return (
      <div className={styles.card}>
        <p className={styles.p}>Bevor du mit den Einheiten startest, mach bitte kurz den Start-Check.</p>
        <Link className={styles.btn} href="/mutig-reiten">Zum Start</Link>
      </div>
    );
  }
  if (!state.done.includes(unit.n) && !unitUnlockedInOrder(state, unit.n)) {
    return (
      <div className={styles.card}>
        <h1 className={styles.h2}>Tag {unit.n} · {title}</h1>
        <p className={styles.p}>Diese Einheit öffnet sich, sobald du Tag {unit.n - 1} abgeschlossen hast.</p>
        <Link className={styles.btn} href="/mutig-reiten">Zur Übersicht</Link>
      </div>
    );
  }

  const st = steps[i];
  const key = unit.eingabe?.key;
  const value = input ?? (key ? state.notes[key] ?? "" : "");
  const w = weekOf(unit.n);
  const way = state.weg && lesson ? lesson[state.weg] : null;
  const locked = !!unit.stall?.sattel && saddleLocked(state);
  const stallOk = !unit.stall || stall === "nein" || (stall === "ja" && (!unit.stall.begleitung || companion));
  const go = () => setI((x) => Math.min(x + 1, steps.length - 1));

  async function finish() {
    setSaving(true);
    try {
      const d = today();
      await update((s) => ({
        ...s,
        done: s.done.includes(unit.n) ? s.done : [...s.done, unit.n].sort((x, y) => x - y),
        units: { ...s.units, [unit.n]: { date: d, before, after, note } },
        notes: key && input !== null ? { ...s.notes, [key]: input.trim() } : s.notes,
        notesDate: key && input !== null ? { ...s.notesDate, [key]: s.notesDate[key] ?? d } : s.notesDate,
        diary: [{ id: uid(), date: d, title: `Tag ${unit.n} · ${title}`, before, after, text: note.trim() }, ...s.diary],
      }));
      go();
    } finally {
      setSaving(false);
    }
  }

  const top = (
    <div className={styles.progressTop}>
      <Link className={styles.back} href="/mutig-reiten">‹ Übersicht</Link>
      {st !== "fertig" && <span>Schritt {i + 1} von {steps.length - 1}</span>}
    </div>
  );
  const head = (
    <>
      <p className={styles.kicker}>Woche {w} · {WEEKS[w - 1]} · Tag {unit.n}</p>
      <h1 className={styles.h1}>{title}</h1>
    </>
  );

  return (
    <div className={styles.narrow}>
      {top}

      {st === "vorher" && (
        <div className={styles.card}>
          {head}
          <p className={styles.muted}>Lernziel: {unit.ziel}</p>
          <h2 className={styles.h2}>Wie groß ist deine Angst gerade, wenn du an deine aktuelle Stufe denkst?</h2>
          <Barometer value={before} onChange={setBefore} label="Angst vor der Einheit" />
          <div className={styles.row}>
            <button className={styles.btn} type="button" disabled={before === null} onClick={go}>Weiter</button>
            <button className={styles.btnLink} type="button" onClick={go}>Überspringen</button>
          </div>
        </div>
      )}

      {st === "impuls" && (
        <div className={styles.card}>
          {head}
          {audioUrl ? (
            <>
              <audio className={styles.audio} controls preload="none" src={audioUrl}>
                Dein Browser kann das Audio nicht abspielen. Den Text findest du darunter.
              </audio>
              <details className={styles.transcript}>
                <summary>Text zum Mitlesen</summary>
                {unit.text.map((p, k) => <p key={k}>{p}</p>)}
              </details>
            </>
          ) : (
            <>
              <p className={styles.note}>Die Audio-Aufnahme für diesen Tag folgt. Bis dahin kannst du den Impuls hier lesen.</p>
              <div className={styles.transcript}>
                {unit.text.map((p, k) => <p key={k}>{p}</p>)}
              </div>
            </>
          )}
          <button className={styles.btn} type="button" onClick={go}>Weiter zur Übung</button>
        </div>
      )}

      {st === "uebung" && (
        <div className={styles.card}>
          <p className={styles.kicker}>Übung · {unit.uebung.dauer}</p>
          <h2 className={styles.h2}>{unit.uebung.titel}</h2>
          <ol className={styles.steps}>
            {unit.uebung.schritte.map((s) => <li key={s}>{s}</li>)}
          </ol>
          {tool && (
            <p className={styles.note}>
              Neues Werkzeug: <strong>{tool.name}</strong> – {tool.warum} Du findest es jederzeit unter{" "}
              <Link href="/mutig-reiten/werkzeuge">Werkzeuge</Link>.
            </p>
          )}
          {unit.eingabe && (
            <label className={styles.field}>
              {unit.eingabe.label}
              {unit.eingabe.multiline ? (
                <textarea className={styles.textarea} value={value} placeholder={unit.eingabe.placeholder} maxLength={4000} onChange={(e) => setInput(e.target.value)} />
              ) : (
                <input className={styles.input} value={value} placeholder={unit.eingabe.placeholder} maxLength={140} onChange={(e) => setInput(e.target.value)} />
              )}
            </label>
          )}
          {unit.link && <Link className={styles.btnGhost} href={unit.link.href}>{unit.link.label}</Link>}
          <button className={styles.btn} type="button" onClick={go}>Weiter</button>
        </div>
      )}

      {st === "weg" && (
        <div className={styles.card}>
          <p className={styles.kicker}>Für deinen Weg</p>
          {way ? (
            <>
              <h2 className={styles.h2}>{way.titel}</h2>
              {way.text.map((p, k) => <p key={k} className={styles.p}>{p}</p>)}
            </>
          ) : (
            <p className={styles.p}>Wähle deinen Weg im Start-Check, dann erscheint hier deine Zusatzlektion.</p>
          )}
          <button className={styles.btn} type="button" onClick={go}>Weiter</button>
        </div>
      )}

      {st === "stall" && unit.stall && (
        <div className={styles.card}>
          <p className={styles.kicker}>Am Stall</p>
          <h2 className={styles.h2}>{unit.stall.text}</h2>
          {unit.stall.hinweis && <p className={styles.muted}>{unit.stall.hinweis}</p>}
          {locked ? (
            <p className={styles.warn}>
              Diese Aufgabe ist im Sattel. Du hast angegeben, dass deine Freigabe noch fehlt – deshalb bleibt sie gesperrt. Mach die
              Kopf- und Körperübungen und bleib auf deiner Bodenstufe. Die Freigabe kannst du in deiner{" "}
              <Link href="/mutig-reiten/leiter">Mut-Leiter</Link> bestätigen.
            </p>
          ) : (
            <>
              <p className={styles.note}>
                Achte auf dein Pferd: Kopf hoch, Ohren angelegt, Schweifschlagen oder Schwitzen heißen, dass der Schritt für euch beide
                zu groß ist. Dann abbrechen und kleiner weitermachen.
              </p>
              <div className={styles.choices}>
                <button type="button" className={styles.choice} aria-pressed={stall === "ja"} onClick={() => setStall("ja")}>Ich habe die Aufgabe gemacht</button>
                <button type="button" className={styles.choice} aria-pressed={stall === "nein"} onClick={() => setStall("nein")}>Heute nicht am Stall – mache ich später</button>
              </div>
              {stall === "ja" && unit.stall.begleitung && (
                <label className={styles.check}>
                  <input type="checkbox" checked={companion} onChange={(e) => setCompanion(e.target.checked)} />
                  Eine zweite Person war dabei{state.begleitung ? ` (z. B. ${state.begleitung})` : ""}.
                </label>
              )}
            </>
          )}
          <button className={styles.btn} type="button" disabled={!locked && !stallOk} onClick={go}>Weiter</button>
        </div>
      )}

      {st === "nachher" && (
        <div className={styles.card}>
          <h2 className={styles.h2}>Und jetzt? Wie groß ist deine Angst, wenn du an deine aktuelle Stufe denkst?</h2>
          <Barometer value={after} onChange={setAfter} label="Angst nach der Einheit" />
          <label className={styles.field}>
            Was nimmst du heute mit? (freiwillig)
            <textarea className={styles.textarea} value={note} maxLength={2000} onChange={(e) => setNote(e.target.value)} />
          </label>
          <button className={styles.btn} type="button" disabled={saving} onClick={finish}>Einheit abschließen</button>
        </div>
      )}

      {st === "fertig" && (
        unit.n === 30 ? (
          <>
          <div className={styles.certificate}>
            <p className={styles.kicker}>Urkunde</p>
            <h1 className={styles.h1}>Mutig reiten – geschafft</h1>
            <p className={styles.lead}>30 Einheiten, sechs Wochen, viele kleine Schritte. Du hast dir deinen Mut selbst zurückgeholt.</p>
            <p className={styles.muted}>{new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}</p>
            <Link className={styles.btn} href="/mutig-reiten">Zur Übersicht</Link>
          </div>
          <AbschlussCard state={state} />
          </>
        ) : (
          <div className={`${styles.card} ${styles.center}`}>
            <div className={styles.seal} aria-hidden>✓</div>
            <h1 className={styles.h2}>Ein weiterer Schritt auf deinem Weg.</h1>
            {before !== null && after !== null && (
              <p className={styles.p}>
                Vorher {before}, jetzt {after} – {fearWord(after)}.
              </p>
            )}
            {unit.vergleich && state.start !== null && after !== null && (
              <p className={styles.p}>
                Zum Vergleich: Beim Start-Check lag dein Wert bei {state.start} von 10.
              </p>
            )}
            <p className={styles.muted}>Egal, wie die Zahl heute aussieht: Dranbleiben ist das, was zählt.</p>
            <div className={styles.row}>
              <Link className={styles.btn} href="/mutig-reiten">Zur Übersicht</Link>
              <Link className={styles.btnGhost} href="/mutig-reiten/leiter">Zur Mut-Leiter</Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}
