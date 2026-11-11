import Link from "@/i18n/Link";
import type { CoachExercise } from "@/content/coach/types";
import { ExerciseDetails, ExerciseMeta } from "./ExerciseCard";
import { PremiumBox } from "./CoachHome";
import s from "./coach.module.css";

export function CoachExercisePage({ ex }: { ex: CoachExercise }) {
  return (
    <div className="page">
      <article className={s.analysis}>
        <header className={s.problemHead}>
          <Link href="/coach" className={s.linkBtn} style={{ width: "fit-content" }}>
            ← Rider Coach
          </Link>
          <p className={s.kicker}>Übung</p>
          <h1 className={s.problemH1}>{ex.title}</h1>
          <ExerciseMeta ex={ex} />
        </header>
        <div className={`${s.card} ${s.exerciseBody}`} style={{ padding: "var(--space-5)" }}>
          <ExerciseDetails ex={ex} withLink={false} />
        </div>
      </article>
    </div>
  );
}

export function CoachLockedExercise({ title }: { title: string }) {
  return (
    <div className="page">
      <div className={s.analysis}>
        <header className={s.problemHead}>
          <Link href="/coach" className={s.linkBtn} style={{ width: "fit-content" }}>
            ← Rider Coach
          </Link>
          <p className={s.kicker}>Übung · Premium</p>
          <h1 className={s.problemH1}>{title}</h1>
        </header>
        <PremiumBox compact />
      </div>
    </div>
  );
}
