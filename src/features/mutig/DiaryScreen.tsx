"use client";

import { useRef, useState } from "react";
import { WEGE } from "@/content/mutig/katalog";
import type { Weg } from "@/content/mutig/types";
import { Barometer } from "./Barometer";
import { dateLabel, today, uid } from "./logic";
import { deleteAll, downloadBackup, restoreBackup, useMutig } from "./store";
import { SubNav } from "./SubNav";
import styles from "./mutig.module.css";

export function DiaryScreen() {
  const { state, update } = useMutig();
  const [text, setText] = useState("");
  const [fear, setFear] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const file = useRef<HTMLInputElement>(null);

  if (!state) return <p className={styles.muted}>Einen Moment …</p>;

  // Verlauf: Barometer nach jeder Einheit
  const curve = Object.entries(state.units)
    .map(([n, u]) => ({ n: Number(n), v: u.after }))
    .filter((x): x is { n: number; v: number } => x.v !== null)
    .sort((a, b) => a.n - b.n);

  async function add() {
    if (!text.trim() && fear === null) return;
    await update((s) => ({ ...s, diary: [{ id: uid(), date: today(), title: "Eigener Eintrag", before: null, after: fear, text: text.trim() }, ...s.diary] }));
    setText("");
    setFear(null);
  }

  async function onFile(f: File | undefined) {
    if (!f) return;
    const err = await restoreBackup(f);
    setMsg(err ?? "Deine Sicherung wurde wiederhergestellt.");
    if (file.current) file.current.value = "";
  }

  return (
    <div className={styles.stack}>
      <SubNav />
      <div className={styles.card}>
        <h1 className={styles.h1}>Dein Mut-Tagebuch</h1>
        <p className={styles.muted}>Einheiten und Durchgänge landen hier automatisch. Du kannst auch eigene Gedanken festhalten.</p>
      </div>

      {curve.length > 0 && (
        <section className={styles.card} aria-labelledby="mr-curve">
          <h2 id="mr-curve" className={styles.h2}>Dein Barometer nach den Einheiten</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 110 }} role="img" aria-label={`Angstwerte nach den Einheiten: ${curve.map((c) => `Tag ${c.n}: ${c.v}`).join(", ")}`}>
            {curve.map((c) => (
              <span key={c.n} title={`Tag ${c.n}: ${c.v}`} style={{ flex: 1, maxWidth: 18, height: `${Math.max(6, c.v * 10)}%`, background: "var(--forest)", borderRadius: "4px 4px 0 0", opacity: 0.85 }} />
            ))}
          </div>
          <p className={styles.xs}>Je niedriger der Balken, desto kleiner die Angst. Schwankungen sind normal.</p>
        </section>
      )}

      <section className={styles.card} aria-labelledby="mr-new">
        <h2 id="mr-new" className={styles.h2}>Neuer Eintrag</h2>
        <textarea className={styles.textarea} value={text} maxLength={2000} placeholder="Was ist heute passiert? Was hat geholfen?" onChange={(e) => setText(e.target.value)} aria-label="Eintrag" />
        <div className={styles.field}>
          Angst heute (freiwillig)
          <Barometer value={fear} onChange={setFear} label="Angst heute" />
        </div>
        <button className={styles.btn} type="button" onClick={add} disabled={!text.trim() && fear === null}>Speichern</button>
      </section>

      <section className={styles.card} aria-labelledby="mr-list">
        <h2 id="mr-list" className={styles.h2}>Einträge</h2>
        {state.diary.length === 0 && <p className={styles.muted}>Noch keine Einträge.</p>}
        <ul className={styles.units}>
          {state.diary.map((d) => (
            <li key={d.id} className={styles.unit} style={{ gridTemplateColumns: "1fr" }}>
              <span className={styles.unitMeta}>
                {dateLabel(d.date)} · {d.title}
                {d.before !== null && d.after !== null ? ` · ${d.before} → ${d.after}` : d.after !== null ? ` · Angst ${d.after}` : ""}
              </span>
              {d.text && <span style={{ whiteSpace: "pre-wrap" }}>{d.text}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section id="daten" className={styles.card} aria-labelledby="mr-data">
        <h2 id="mr-data" className={styles.h2}>Deine Daten</h2>
        <p className={styles.muted}>
          Alles, was du in Mutig reiten einträgst, bleibt auf diesem Gerät. Nichts wird an uns übertragen. Wenn du das Gerät wechselst oder den
          Browserverlauf löschst, sind die Einträge weg – lade dir deshalb ab und zu eine Sicherung herunter.
        </p>
        {state.onboarded && (
          <label className={styles.field}>
            Dein Weg
            <select
              className={styles.input}
              value={state.weg ?? ""}
              onChange={(e) => update((s) => ({ ...s, weg: e.target.value as Weg }))}
            >
              {(Object.keys(WEGE) as Weg[]).map((w) => <option key={w} value={w}>{WEGE[w].titel}</option>)}
            </select>
          </label>
        )}
        <div className={styles.row}>
          <button className={styles.btnGhost} type="button" onClick={() => downloadBackup(state)}>Sicherung herunterladen</button>
          <button className={styles.btnGhost} type="button" onClick={() => file.current?.click()}>Sicherung wiederherstellen</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => onFile(e.target.files?.[0])} />
        </div>
        {msg && <p className={styles.note} role="status">{msg}</p>}
        {confirm ? (
          <div className={styles.warn}>
            <p className={styles.notePlain}>Wirklich alle Einträge, deine Mut-Leiter und deinen Fortschritt von diesem Gerät löschen? Das lässt sich nicht rückgängig machen.</p>
            <div className={styles.row}>
              <button className={styles.danger} type="button" onClick={async () => { await deleteAll(); setConfirm(false); setMsg("Alle Daten von Mutig reiten wurden von diesem Gerät gelöscht."); }}>
                Ja, alles löschen
              </button>
              <button className={styles.btnLink} type="button" onClick={() => setConfirm(false)}>Abbrechen</button>
            </div>
          </div>
        ) : (
          <button className={styles.btnLink} type="button" onClick={() => setConfirm(true)}>Alle Daten löschen</button>
        )}
      </section>
    </div>
  );
}
