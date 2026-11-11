"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { COACH_QUESTION, coachCategories, coachExamples, coachProblems, demoProblem, problemHref } from "@/content/coach/index";
import { riderCoach } from "@/content/products";
import { useDiary } from "@/features/tagebuch/store";
import { coachNextStep, programProgress } from "@/features/tagebuch/coach";
import { CoachSearch } from "./CoachSearch";
import s from "./coach.module.css";

export function CompassArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="38" strokeDasharray="1 3.2" />
      <path d="M50 4v10M50 86v10M4 50h10M86 50h10" strokeWidth="2" />
      <path d="M61 39 55 55 39 61 45 45z" fill="currentColor" fillOpacity="0.35" />
      <circle cx="50" cy="50" r="2.4" fill="currentColor" />
    </svg>
  );
}

/** Startseite /coach – Suche, Beispiele, alle Themen, persönlicher Bereich oder Freischaltung */
export function CoachHome({ owned }: { owned: boolean }) {
  return (
    <div className="page">
      <div className={s.page}>
        <section className={s.hero} aria-labelledby="coach-title">
          <CompassArt className={s.compass} />
          <p className={s.kicker}>Rider Coach · Dein persönlicher Problemlöser</p>
          <h1 id="coach-title" className={s.heroTitle}>
            {COACH_QUESTION}
          </h1>
          <p className={s.heroText}>
            Beschreib dein Problem in eigenen Worten. Ein paar kurze Fragen – dann bekommst du mögliche Ursachen, passende Übungen und auf Wunsch einen eigenen
            Trainingsplan.
          </p>
          <CoachSearch owned={owned} />
          <div className={s.examples} aria-label="Beispiele">
            {coachExamples.map((p) => (
              <Link key={p.id} href={problemHref(p)} className={s.example}>
                {p.title}
                {!owned && p.demo && <span className={s.demoTag}>Demo</span>}
              </Link>
            ))}
          </div>
        </section>

        {owned ? <MyCoachTeaser /> : <PremiumBox />}

        <section aria-labelledby="coach-all">
          <div className={s.sectionHead}>
            <h2 id="coach-all" className={s.sectionTitle}>
              Alle Themen
            </h2>
            <span className={s.sectionMeta}>{coachProblems.length} Lösungswege · weitere folgen</span>
          </div>
          <div className={s.categories}>
            {coachCategories.map((c) => {
              const list = coachProblems.filter((p) => p.category === c.id);
              if (list.length === 0) return null;
              return (
                <div key={c.id} className={s.category}>
                  <h3>{c.title}</h3>
                  <ul className={s.problemList}>
                    {list.map((p) => (
                      <li key={p.id}>
                        <Link href={problemHref(p)} className={s.problemLink}>
                          <span className={s.problemTitle}>
                            {p.title}
                            {!owned && p.demo && <span className={s.demoTag}>Demo</span>}
                          </span>
                          {!owned && !p.demo ? <Icon name="lock" className={s.lockIcon} aria-label="Premium" /> : <Icon name="back" />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="coach-how">
          <h2 id="coach-how" className={s.sectionTitle} style={{ marginBottom: "var(--space-3)" }}>
            So funktioniert der Rider Coach
          </h2>
          <ol className={s.causes}>
            {[
              ["Problem finden", "Tippe ein, was nicht klappt – auch umgangssprachlich oder mit Tippfehlern."],
              ["Kurz eingrenzen", "3 bis 5 Fragen, die sich nach deinen Antworten richten. Bei Warnzeichen fragt der Coach nach Sicherheit."],
              ["Lösungsweg und Plan", "Mögliche Ursachen, Übungen, Tipps für die nächste Reitstunde – und ein Trainingsplan, den du im Rider Lab und Tagebuch weiterführst."],
            ].map(([t, x], i) => (
              <li key={t} className={s.block} style={{ animationDelay: `${i * 80}ms` }}>
                <span className={s.blockNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={s.blockBody}>
                  <strong>{t}</strong>
                  <span className={s.muted}>{x}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <aside className={s.note}>
          <Icon name="star" />
          <p>
            Der Rider Coach nennt mögliche Ursachen, keine Diagnosen. Er ersetzt weder Reitunterricht noch eine tierärztliche Untersuchung. Bei Schmerzen, Lahmheit,
            Abwehrverhalten oder Ausrüstungsproblemen empfiehlt er immer eine fachliche Abklärung.
          </p>
        </aside>
      </div>
    </div>
  );
}

/** Für Nicht-Käufer: was Premium bringt, Demo, Freischalten (kein Kauf-Knopf ohne Shop-Produkt) */
export function PremiumBox({ compact = false }: { compact?: boolean }) {
  return (
    <section className={s.premium} aria-labelledby="coach-premium">
      <span className={s.premiumBadge}>
        <Icon name="star" /> Premium-Add-on
      </span>
      <h2 id="coach-premium" className={s.sectionTitle}>
        Rider Coach freischalten
      </h2>
      {!compact && (
        <ul className={s.featureList}>
          {[
            "Alle Lösungswege mit interaktiver Problemanalyse",
            "Mögliche Ursachen verständlich erklärt – mit Sicherheitshinweisen",
            "Übungsbibliothek mit Schritt-für-Schritt-Anleitungen",
            "Trainingsplan per Klick – weitergeführt in Rider Lab und Reitertagebuch",
            "Rückmeldung „Hat es geholfen?“ mit Alternativen, wenn nicht",
          ].map((t) => (
            <li key={t}>
              <Icon name="check" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}
      <p className={s.muted}>
        {riderCoach.price ? `${riderCoach.price} einmalig, dauerhafter Zugriff, kein Abo.` : "Einmalkauf mit dauerhaftem Zugriff, kein Abo."} Die Suche und ein kompletter Demo-Lösungsweg
        sind kostenlos.
      </p>
      <div className={s.btnRow}>
        <Link href={problemHref(demoProblem)} className={`${s.btn} ${s.btnHoney}`}>
          <Icon name="play" /> Demo ausprobieren
        </Link>
        {riderCoach.checkoutUrl && riderCoach.price ? (
          <a href={riderCoach.checkoutUrl} target="_blank" rel="noopener noreferrer" className={s.btn}>
            Für {riderCoach.price} kaufen
          </a>
        ) : null}
        <Link href="/eltern#abenteuer" className={`${s.btn} ${s.btnGhost}`}>
          <Icon name="lock" /> Code oder Bestellnummer eingeben
        </Link>
      </div>
    </section>
  );
}

/** Für Käufer: nächster Schritt und Überblick aus den gespeicherten Daten */
function MyCoachTeaser() {
  const diary = useDiary();
  if (diary.status !== "ready") return null;
  const d = diary.data;
  const step = coachNextStep(d);
  const plans = d.goals.filter((g) => g.program && g.status !== "geschafft");
  const openCases = d.coach.filter((c) => c.status === "offen");
  if (!step && plans.length === 0 && d.coach.length === 0) return null;
  return (
    <section aria-labelledby="coach-mine" className={s.card}>
      <div className={s.sectionHead}>
        <h2 id="coach-mine" className={s.sectionTitle}>
          Mein Coach
        </h2>
        <Link href="/coach/mein-coach" className={s.linkBtn}>
          Alles ansehen
        </Link>
      </div>
      {step && (
        <Link href={step.href} className={s.problemLink}>
          <span className={s.problemTitle}>
            <span className={s.kicker} style={{ display: "block" }}>
              {step.title}
            </span>
            {step.text}
          </span>
          <Icon name="back" />
        </Link>
      )}
      <p className={s.muted} style={{ marginTop: "var(--space-3)" }}>
        {[
          openCases.length ? `${openCases.length} ${openCases.length === 1 ? "Thema" : "Themen"} in Arbeit` : undefined,
          plans.length ? `${plans.length} aktive${plans.length === 1 ? "r" : ""} Trainingsplan${plans.length === 1 ? "" : "e"}` : undefined,
          plans[0] ? (() => {
            const pp = programProgress(d, plans[0]);
            return pp ? `„${plans[0].title}“: Woche ${pp.week} von ${pp.weeks}` : undefined;
          })() : undefined,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </section>
  );
}
