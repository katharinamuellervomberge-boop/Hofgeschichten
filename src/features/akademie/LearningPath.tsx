"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { worlds } from "@/content/akademie";
import { lernpfad, type PathStation } from "@/content/akademie/lernpfad";
import { getRelease } from "@/content/membership";
import { useProgress } from "@/lib/progress/store";
import type { Progress } from "@/lib/progress/types";
import { worldDone } from "./progress";
import styles from "./lernpfad.module.css";

export type PremiumState = "open" | "upcoming" | "locked";

function stationDone(s: PathStation, p: Progress): boolean {
  if (s.kind === "premium") return (p.games[s.progressId]?.completedCount ?? 0) > 0;
  if (s.kind === "free") {
    if (s.world) {
      const w = worlds.find((x) => x.id === s.world);
      return w ? worldDone(p, w) : false;
    }
    return (s.progressIds ?? []).length > 0 && (s.progressIds ?? []).every((id) => (p.games[id]?.completedCount ?? 0) > 0);
  }
  return false;
}

/** Die fünf Kapitel der Reitakademie als zusammenhängender Lernpfad. */
export function LearningPath({ premium }: { premium: Record<string, PremiumState> }) {
  const progress = useProgress();
  return (
    <section aria-labelledby="ak-pfad">
      <h2 id="ak-pfad" className={styles.title}>
        Dein Lernpfad
      </h2>
      <ol className={styles.path}>
        {lernpfad.map((c) => (
          <li key={c.number} className={styles.chapter}>
            <span className={styles.no} aria-hidden>
              {c.number}
            </span>
            <div className={styles.body}>
              <h3 className={styles.chapterTitle}>
                Kapitel {c.number}: {c.title}
              </h3>
              <p className={styles.topics}>{c.topics.join(" · ")}</p>
              <ul className={styles.stations}>
                {c.stations.map((s) => {
                  const done = stationDone(s, progress);
                  if (s.kind === "planned") {
                    return (
                      <li key={s.title}>
                        <span className={`${styles.station} ${styles.planned}`}>
                          <Icon name="lock" />
                          <span>{s.title}</span>
                          <em>Noch nicht verfügbar</em>
                        </span>
                      </li>
                    );
                  }
                  if (s.kind === "premium") {
                    const state = premium[s.release] ?? "locked";
                    const r = getRelease(s.release);
                    const date = r?.dateLabel.replace(/^Freitag, /, "").replace(/ 2026$/, "");
                    return (
                      <li key={s.title}>
                        <Link href={`/hofjahr/${s.release}`} className={`${styles.station} ${styles.premium} ${done ? styles.done : ""}`}>
                          <Icon name={done ? "check" : state === "open" ? "play" : "lock"} />
                          <span>{s.title}</span>
                          <em>{state === "open" ? (done ? "Geschafft" : "Neu") : `Premium · ab ${date}`}</em>
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={s.title}>
                      <Link href={s.href} className={`${styles.station} ${done ? styles.done : ""}`}>
                        <Icon name={done ? "check" : "play"} />
                        <span>{s.title}</span>
                        <em>{done ? "Geschafft" : "Kostenlos"}</em>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
