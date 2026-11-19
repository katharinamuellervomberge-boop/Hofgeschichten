"use client";

import Link from "@/i18n/Link";
import { TYPEN, WEEKS, WEGE } from "@/content/mutig/katalog";
import { AbschlussCard } from "./AbschlussCard";
import { CheckFlow } from "./CheckFlow";
import { currentStepIndex, fearWord, nextUnit, unitUnlockedInOrder } from "./logic";
import { useMutig } from "./store";
import { SubNav } from "./SubNav";
import styles from "./mutig.module.css";

export type UnitMeta = { n: number; title: string; released: boolean; release: string };

const SIX_MONTHS = 182 * 86400 * 1000;

export function Dashboard({ units }: { units: UnitMeta[] }) {
  const { state, error } = useMutig();
  if (error) return <p className={styles.warn}>Dieser Browser kann keine Daten speichern (z. B. im privaten Modus). Bitte öffne die App in einem normalen Fenster.</p>;
  if (!state) return <p className={styles.muted}>Einen Moment …</p>;
  if (!state.onboarded) return <CheckFlow mode="onboarding" owned checkoutUrl={null} price={null} />;

  const n = nextUnit(state);
  const nextMeta = units.find((u) => u.n === n);
  const week = Math.min(6, Math.floor((n - 1) / 5) + 1);
  const li = currentStepIndex(state.ladder);
  const step = state.ladder[li];
  const lastFear = step?.runs.at(-1)?.fear ?? null;
  const brief = state.notes.brief && state.notesDate.brief && Date.now() - new Date(state.notesDate.brief).getTime() >= SIX_MONTHS;

  return (
    <div className={styles.stack}>
      <SubNav />

      {state.warn && (
        <div className={styles.note}>
          Denk daran: Wenn dich ein Erlebnis auch außerhalb des Stalls nicht loslässt, gibt es gute Hilfe.{" "}
          <Link href="/mutig-reiten/hilfe">Anlaufstellen ansehen</Link>
        </div>
      )}

      {brief && (
        <div className={styles.card}>
          <p className={styles.kicker}>Dein Brief von vor sechs Monaten</p>
          <p className={styles.p} style={{ whiteSpace: "pre-wrap" }}>{state.notes.brief}</p>
        </div>
      )}

      <section className={styles.hero} aria-labelledby="mr-next">
        <p className={styles.kicker}>
          Woche {week} · {WEEKS[week - 1]}
        </p>
        {n > 30 ? (
          <>
            <h1 id="mr-next" className={styles.h1}>Du hast alle 30 Einheiten geschafft.</h1>
            <p className={styles.lead}>Deine Leiter, deine Werkzeuge und dein Tagebuch bleiben hier. Mach in deinem Tempo weiter.</p>
          </>
        ) : nextMeta && !nextMeta.released ? (
          <>
            <h1 id="mr-next" className={styles.h1}>Tag {n} erscheint am {nextMeta.release}.</h1>
            <p className={styles.lead}>
              Bis dahin: Arbeite an deiner Mut-Leiter weiter und wiederhole deine Werkzeuge. Gefestigte Stufen sind das Wichtigste.
            </p>
            <Link className={styles.btn} href="/mutig-reiten/leiter">Zur Mut-Leiter</Link>
          </>
        ) : (
          <>
            <h1 id="mr-next" className={styles.h1}>Tag {n} · {nextMeta?.title}</h1>
            <p className={styles.lead}>Etwa 10–15 Minuten: Audio-Impuls, Übung und, wenn es passt, eine kleine Aufgabe am Stall.</p>
            <Link className={styles.btn} href={`/mutig-reiten/tag/${n}`}>{state.done.length ? "Weitermachen" : "Loslegen"}</Link>
          </>
        )}
      </section>

      <AbschlussCard state={state} />

      <section className={styles.card} aria-labelledby="mr-weeks">
        <div className={styles.between}>
          <h2 id="mr-weeks" className={styles.h2}>Deine sechs Wochen</h2>
          <span className={styles.xs}>{state.done.length} von 30</span>
        </div>
        <div className={styles.journey}>
          {WEEKS.map((w, k) => {
            const d = state.done.filter((x) => x > k * 5 && x <= k * 5 + 5).length;
            return (
              <div key={w} className={k + 1 === week ? styles.weekCur : undefined}>
                <span className={styles.bar}><i style={{ width: `${(d / 5) * 100}%` }} /></span>
                <small>{k + 1} · {w}</small>
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.card}>
        <p className={styles.kicker}>Deine Mut-Leiter</p>
        {step ? (
          <>
            <h2 className={styles.h2}>Stufe {li + 1}: {step.t}</h2>
            <p className={styles.muted}>
              {lastFear !== null ? `Zuletzt: ${lastFear} von 10 – ${fearWord(lastFear)}.` : "Noch kein Durchgang auf dieser Stufe."}
            </p>
          </>
        ) : (
          <p className={styles.muted}>Deine Leiter ist noch leer.</p>
        )}
        <Link className={styles.btnGhost} href="/mutig-reiten/leiter">Durchgang eintragen</Link>
      </div>

      {(state.notes.satz || state.typ) && (
        <div className={styles.card}>
          {state.notes.satz && (
            <>
              <p className={styles.kicker}>Dein Mutmacher-Satz</p>
              <p className={styles.h2}>„{state.notes.satz}“</p>
            </>
          )}
          {state.typ && (
            <p className={styles.muted}>
              {TYPEN[state.typ].name}
              {state.weg ? ` · Weg: ${WEGE[state.weg].titel}` : ""}
            </p>
          )}
        </div>
      )}

      {WEEKS.map((w, k) => (
        <section key={w} className={styles.card} aria-labelledby={`mr-w${k + 1}`}>
          <h2 id={`mr-w${k + 1}`} className={styles.h2}>Woche {k + 1} · {w}</h2>
          <ul className={styles.units}>
            {units.slice(k * 5, k * 5 + 5).map((u) => {
              const done = state.done.includes(u.n);
              const open = u.released && unitUnlockedInOrder(state, u.n);
              const cls = `${styles.unit} ${done ? styles.unitDone : ""} ${u.n === n && open ? styles.unitNext : ""} ${!open ? styles.unitLocked : ""}`;
              const meta = done ? "geschafft" : !u.released ? `erscheint am ${u.release}` : !open ? "nach der vorherigen Einheit" : u.n === n ? "als Nächstes" : "";
              const inner = (
                <>
                  <span className={styles.unitNum}>{done ? "✓" : u.n}</span>
                  <span>
                    <span className={styles.unitTitle}>{u.title}</span>
                    {meta && <span className={styles.unitMeta}> · {meta}</span>}
                  </span>
                  <span aria-hidden>{open ? "›" : ""}</span>
                </>
              );
              return (
                <li key={u.n}>
                  {open ? <Link className={cls} href={`/mutig-reiten/tag/${u.n}`}>{inner}</Link> : <div className={cls}>{inner}</div>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <p className={styles.xs}>
        Mutig reiten ersetzt keine ärztliche oder psychotherapeutische Behandlung. Alle Einträge bleiben auf diesem Gerät –{" "}
        <Link href="/mutig-reiten/tagebuch#daten">Sicherung und Löschen</Link>.
      </p>
    </div>
  );
}
