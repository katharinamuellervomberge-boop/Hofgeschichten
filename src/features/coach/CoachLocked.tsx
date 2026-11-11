import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { coachCategories, demoProblem, problemHref } from "@/content/coach/index";
import type { CoachProblemInfo } from "@/content/coach/types";
import { PremiumBox } from "./CoachHome";
import s from "./coach.module.css";

/** Vorschau eines Premium-Lösungswegs ohne Inhalte (Fragen und Lösungen kommen erst nach der Freischaltung) */
export function CoachLocked({ info }: { info: CoachProblemInfo }) {
  return (
    <div className="page">
      <div className={s.analysis}>
        <header className={s.problemHead}>
          <Link href="/coach" className={s.linkBtn} style={{ width: "fit-content" }}>
            ← Rider Coach
          </Link>
          <p className={s.kicker}>{coachCategories.find((c) => c.id === info.category)?.title} · Premium</p>
          <h1 className={s.problemH1}>{info.title}</h1>
          <p className={s.muted}>{info.teaser}</p>
        </header>
        <div className={s.card}>
          <h2 className={s.cardTitle}>Das bekommst du in diesem Lösungsweg</h2>
          <ul className={s.featureList}>
            {[
              "3 bis 5 kurze Fragen, die sich nach deinen Antworten richten",
              "Mögliche Ursachen – verständlich erklärt, ohne Diagnose",
              "Passende Übungen mit Schritt-für-Schritt-Anleitung",
              "Tipps für die nächste Reitstunde und Sicherheitshinweise",
              "Einen Trainingsplan für dein Rider Lab und Tagebuch",
            ].map((t) => (
              <li key={t}>
                <Icon name="check" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <PremiumBox compact />
        <p className={s.muted}>
          Neugierig? Probier den kompletten Demo-Lösungsweg{" "}
          <Link href={problemHref(demoProblem)} className={s.linkBtn}>
            „{demoProblem.title}“
          </Link>{" "}
          kostenlos aus.
        </p>
      </div>
    </div>
  );
}
