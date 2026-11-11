"use client";

import Link from "@/i18n/Link";
import { Icon, type IconName } from "@/components/illustrations/Icons";
import { coachNextStep } from "@/features/tagebuch/coach";
import { refInfo, weekStart } from "@/features/tagebuch/plan";
import { today } from "@/features/tagebuch/sanitize";
import { useDiary } from "@/features/tagebuch/store";
import type { DiaryData } from "@/features/tagebuch/types";
import { useProgress } from "@/lib/progress/store";
import type { Progress } from "@/lib/progress/types";
import styles from "./HomeScreen.module.css";

export type HomeAccess = { academy: boolean; diary: boolean; coach: boolean };

type Step = { key: string; icon: IconName; title: string; text: string; href: string };

const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

/**
 * „Dein nächster Schritt“: höchstens drei Aktionen, die zum tatsächlichen Stand auf diesem Gerät
 * passen (Fortschritt, Tagebuch, Plan, Rider Coach). Nichts wird erfunden – ohne Daten nur der Einstieg.
 */
function steps(progress: Progress, d: DiaryData | null, access: HomeAccess): Step[] {
  const out: Step[] = [];
  const t = today();

  // 1. Rider Coach: fällige Einheit, Rückmeldung, offenes Problem
  if (d) {
    const c = coachNextStep(d);
    if (c && (access.coach || c.kind === "plan"))
      out.push({ key: "coach", icon: c.kind === "plan" ? "plan" : "coach", title: c.title, text: c.text, href: c.href });
  }

  // 2. Heute im Trainingsplan (ohne Coach-Einheiten, die oben schon stehen)
  if (d) {
    const todays = d.plan.filter((p) => p.date === t && !p.done && p.kind !== "coach");
    if (todays.length)
      out.push({
        key: "today",
        icon: "plan",
        title: "Heute in deinem Trainingsplan",
        text: todays.length === 1 ? todays[0].title : `${todays[0].title} und ${todays.length - 1} weitere`,
        href: "/tagebuch/plan",
      });
  }

  // 3. Letzte Lektion fortsetzen
  if (progress.last && progress.last.href.startsWith("/akademie"))
    out.push({ key: "lesson", icon: progress.last.href.includes("rider-lab") ? "lab" : "academy", title: "Setze deine letzte Lektion fort", text: progress.last.title, href: progress.last.href });

  // 4. Reitstunde dokumentieren: geplante Reitstunde ohne Eintrag oder längere Pause
  if (d && access.diary) {
    const ridden = d.plan
      .filter((p) => p.kind === "reiten" && p.date <= t && p.date >= weekStart() && !p.entryId)
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    const last = [...d.entries].sort((a, b) => b.date.localeCompare(a.date))[0];
    if (ridden) out.push({ key: "entry", icon: "diary", title: "Dokumentiere deine letzte Reitstunde", text: ridden.title, href: `/tagebuch/stunde?plan=${ridden.id}` });
    else if (last && daysBetween(last.date, t) >= 5)
      out.push({ key: "entry", icon: "diary", title: "Dokumentiere deine letzte Reitstunde", text: `Dein letzter Eintrag ist ${daysBetween(last.date, t)} Tage her.`, href: "/tagebuch/stunde" });
    else if (!last && d.horses.length + d.goals.length > 0)
      out.push({ key: "entry", icon: "diary", title: "Halte deine erste Reitstunde fest", text: "Was hat geklappt, was war schwierig?", href: "/tagebuch/stunde" });
  }

  // 5. Offenes Ziel ohne Einheiten diese Woche
  if (d) {
    const thisWeek = new Set(d.plan.filter((p) => p.date >= weekStart() && p.goalId).map((p) => p.goalId));
    const goal = d.goals.find((g) => g.status !== "geschafft" && !thisWeek.has(g.id));
    if (goal) out.push({ key: "goal", icon: "star", title: "Arbeite an deinem Trainingsziel", text: goal.title, href: "/tagebuch/plan" });
  }

  // 6. Alle Ziele geschafft: neues Ziel
  if (d && d.goals.length > 0 && !d.goals.some((g) => g.status !== "geschafft"))
    out.push({ key: "newgoal", icon: "star", title: "Setze dir ein neues Ziel", text: `${d.goals.length} ${d.goals.length === 1 ? "Ziel" : "Ziele"} geschafft – was kommt als Nächstes?`, href: "/tagebuch/ziele" });

  // 7. Nichts gespeichert: Einstieg passend zum Kaufstand
  if (out.length === 0) {
    const first = refInfo("ra-w2-l1");
    out.push({ key: "start", icon: "academy", title: access.academy ? "Starte mit deiner ersten Lektion" : "Probier eine kostenlose Lektion", text: first?.title ?? "Reitakademie", href: first?.href ?? "/akademie" });
    if (access.coach) out.push({ key: "coach-start", icon: "coach", title: "Löse dein aktuelles Reitproblem", text: "Was klappt beim Reiten gerade nicht?", href: "/coach" });
  }

  const seen = new Set<string>();
  return out.filter((s) => (seen.has(s.key) ? false : (seen.add(s.key), true))).slice(0, 3);
}

function StepList({ list }: { list: Step[] }) {
  if (list.length === 0) return null;
  return (
    <section className={styles.next} aria-labelledby="home-next">
      <h2 id="home-next" className={styles.nextTitle}>
        Dein nächster Schritt
      </h2>
      <ul className={styles.nextList}>
        {list.map((s, i) => (
          <li key={s.key} style={{ animationDelay: `${i * 70}ms` }}>
            <Link href={s.href} className={styles.nextItem}>
              <span className={styles.nextIcon} aria-hidden>
                <Icon name={s.icon} />
              </span>
              <span>
                <span className={styles.nextKicker}>{s.title}</span>
                <span className={styles.nextText}>{s.text}</span>
              </span>
              <Icon name="back" className={styles.arrow} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WithDiary({ access }: { access: HomeAccess }) {
  const progress = useProgress();
  const diary = useDiary();
  if (diary.status === "loading") return null;
  return <StepList list={steps(progress, diary.status === "ready" ? diary.data : null, access)} />;
}

function WithoutDiary({ access }: { access: HomeAccess }) {
  const progress = useProgress();
  return <StepList list={steps(progress, null, access)} />;
}

/** Tagebuchdaten nur öffnen, wenn das Tagebuch freigeschaltet ist */
export function NextStep({ access }: { access: HomeAccess }) {
  return access.diary || access.coach ? <WithDiary access={access} /> : <WithoutDiary access={access} />;
}
