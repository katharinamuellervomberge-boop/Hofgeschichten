import Link from "@/i18n/Link";
import type { ArenaExercise } from "@/content/arena/types";
import { exerciseById } from "@/content/training/uebungen";
import { arenaFigures, EVIDENCE_LABEL, variantsOf } from "@/content/arena";
import { ArenaPlayer } from "./ArenaPlayer";
import { SaveButton } from "./SaveButton";
import styles from "./arena.module.css";
import { getLocale } from "@/i18n/server";
import { EnglishDom } from "@/i18n/EnglishDom";
import { arenaText, translateArena } from "@/content/arena/en";

const LEVEL = { 1: "Einsteiger", 2: "Fortgeschritten", 3: "Erfahren" } as const;
const REVIEW = { entwurf: "Entwurf", geprueft: "Geprüft", freigegeben: "Freigegeben" } as const;

/** Detailseite einer Reitbahn-Übung: Kopf, interaktive Bahn, Hintergrund, Fehler, Weiterlernen */
export async function ArenaExerciseScreen({ exercise }: { exercise: ArenaExercise }) {
  // Englisch: Inhalte hier übersetzen, die Oberfläche übersetzt EnglishDom im Browser
  const en = (await getLocale()) === "en";
  const ex = en ? translateArena(exercise) : exercise;
  const variants = en ? variantsOf(exercise).map(translateArena) : variantsOf(exercise);
  const name = (s: string) => (en ? arenaText(s) : s);
  const GAIT = { halt: "Halt", schritt: "Schritt", trab: "Trab", galopp: "Galopp" } as const;
  const gaits = [...new Set(ex.phases.map((p) => GAIT[p.gait]))].join(" · ");
  const number = String(arenaFigures().findIndex((e) => e.id === variants[0].id) + 1).padStart(2, "0");
  const page = (
    <div className={styles.page}>
      <nav aria-label="Brotkrumen" className={styles.crumbs}>
        <Link href="/tagebuch">Riding Space</Link>
        <span aria-hidden>/</span>
        <Link href="/tagebuch/reitbahn">Die Reitbahn</Link>
      </nav>

      <header className={styles.hero}>
        <p className="eyebrow">Die Reitbahn · Übung {number}</p>
        <h1 className={styles.heroTitle}>{ex.title}</h1>
        <p className={styles.heroLead}>{ex.description}</p>
        <dl className={styles.heroFacts}>
          <div>
            <dt>Niveau</dt>
            <dd>{LEVEL[ex.difficulty]}</dd>
          </div>
          <div>
            <dt>Lernzeit</dt>
            <dd>ca. {ex.learnMinutes} Min</dd>
          </div>
          <div>
            <dt>Gangart</dt>
            <dd>{gaits}</dd>
          </div>
          <div>
            <dt>Hand</dt>
            <dd>{ex.changesRein ? "mit Handwechsel" : "gleiche Hand"}</dd>
          </div>
          {variants.length > 1 && (
            <div>
              <dt>Varianten</dt>
              <dd>{variants.map((v) => v.variantLabel).join(" · ")}</dd>
            </div>
          )}
        </dl>
        {ex.reviewStatus !== "freigegeben" && (
          <p className={styles.review} role="note">
            <strong>{REVIEW[ex.reviewStatus]}</strong> – {ex.reviewNote}
          </p>
        )}
      </header>

      <ArenaPlayer variants={variants} initial={Math.max(0, variants.findIndex((v) => v.id === ex.id))} />

      <div className={styles.below}>
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Darum geht es</h2>
          <ul className={styles.list}>
            {ex.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className={styles.small}>Voraussetzungen: {ex.prerequisites.join(" · ")}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Warum es funktioniert</h2>
          {ex.whyItWorks.map((x, i) => (
            <p key={i} className={styles.explain}>
              <span className={`${styles.evidence} ${styles["ev_" + x.evidence]}`}>{EVIDENCE_LABEL[x.evidence]}</span>
              {x.text}
            </p>
          ))}
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Häufige Fehler</h2>
          <p className={styles.small}>Ein Anzeichen hat selten nur eine Ursache. Die Liste zeigt, was oft dahintersteckt.</p>
          <div className={styles.mistakes}>
            {ex.mistakes.map((m) => {
              const rel = m.relatedExerciseId ? exerciseById(m.relatedExerciseId) : undefined;
              return (
                <details key={m.id} className={styles.mistake}>
                  <summary>{m.title}</summary>
                  <dl>
                    <dt>Was du merkst</dt>
                    <dd>{m.notice}</dd>
                    <dt>Mögliche Ursachen</dt>
                    <dd>
                      <ul>
                        {m.factors.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </dd>
                    <dt>Was hilft</dt>
                    <dd>{m.correction}</dd>
                    {rel && (
                      <>
                        <dt>Passende Übung</dt>
                        <dd>{name(rel.name)}</dd>
                      </>
                    )}
                  </dl>
                </details>
              );
            })}
          </div>
          <div className={styles.safety} role="note">
            {ex.safetyNotes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Tipps für die Bahn</h2>
          <ul className={styles.list}>
            {ex.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Weiter</h2>
          <div className={styles.actions}>
            <Link href="/tagebuch/plan" className={styles.primaryLink}>
              Im Trainingsplaner einplanen
            </Link>
            <SaveButton id={ex.id} />
          </div>
          {ex.relatedLessons.length > 0 && (
            <>
              <p className="eyebrow" style={{ marginTop: "var(--space-5)" }}>
                Passende Lektionen
              </p>
              <ul className={styles.related}>
                {ex.relatedLessons.map((l) => (
                  <li key={l.id}>
                    <Link href={l.href}>{l.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  );
  return en ? <EnglishDom pack="arena">{page}</EnglishDom> : page;
}
