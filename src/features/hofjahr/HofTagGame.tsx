"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { HOFTAG_STEPS, hofjahrBadges, hoftagProgressId } from "@/content/hofjahr";
import type { Release } from "@/content/membership";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import type { Activity, StoryStep } from "@/engine/types";
import { VisualView } from "@/engine/VisualView";
import { progressActions, useProgress } from "@/lib/progress/store";
import styles from "./hofjahr.module.css";

type Part = { id: string; title: string; activity: Activity };

const HOFHELD = hofjahrBadges.find((b) => b.id === "hj-hofheld")!;
const TINTS = ["#F3E6CF", "#DDE3D6", "#E8DCC4", "#E2E8D8", "#EFE3D1", "#E1DCE6"];

/** Das Hofspiel: sechs Teile von morgens bis abends. Jeder Teil wird lokal gespeichert und ist wiederholbar. */
export function HofTagGame({ release, parts }: { release: Release; parts: Part[] }) {
  const progress = useProgress();
  const [active, setActive] = useState<number | null>(null);
  const isDone = (id: string) => (progress.games[hoftagProgressId(id)]?.completedCount ?? 0) > 0;
  const doneCount = parts.filter((p) => isDone(p.id)).length;
  const allDone = doneCount === parts.length;

  if (active !== null) {
    const part = parts[active];
    const next = parts[active + 1];
    const art = part.activity.steps.find((s): s is StoryStep => s.type === "story" && !!s.visual)?.visual;
    return (
      <div className="page">
        <PageHeader title={part.title}>
          <button type="button" className={styles.btn} onClick={() => setActive(null)}>
            <Icon name="back" />
            Tagesplan
          </button>{" "}
          Teil {active + 1} von {parts.length}
        </PageHeader>
        <ActivityPlayer
          key={part.id}
          activity={part.activity}
          tint={TINTS[active % TINTS.length]}
          introArt={art ? <VisualView v={art} /> : undefined}
          onComplete={() => progressActions.completeGame(hoftagProgressId(part.id))}
          renderDone={({ replay }) => {
            const finished = parts.every((p) => p.id === part.id || isDone(p.id));
            return (
              <div className={styles.done} role="status">
                {finished ? (
                  <>
                    <StampSeal stamp={HOFHELD} earned tilt={-8} className={styles.doneSeal} />
                    <p className={styles.heroTitle}>DU BIST EIN ECHTER HOFHELD!</p>
                    <p>Du hast einen ganzen Tag auf dem Hof geschafft. Das Abzeichen „Hofheld“ ist jetzt in deinem Hofjahr.</p>
                  </>
                ) : (
                  <>
                    <span className={styles.lockIcon} aria-hidden>
                      <Icon name="check" />
                    </span>
                    <h2 className={styles.doneTitle}>{part.title} – geschafft!</h2>
                  </>
                )}
                <div className={styles.actions}>
                  <button type="button" className={styles.btn} onClick={replay}>
                    <Icon name="replay" />
                    Nochmal
                  </button>
                  {next && !finished ? (
                    <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setActive(active + 1)}>
                      Weiter: {next.title}
                    </button>
                  ) : (
                    <Link href="/hofjahr" className={`${styles.btn} ${styles.btnPrimary}`}>
                      <Icon name="star" />
                      Zu Mein Hofjahr
                    </Link>
                  )}
                  <button type="button" className={styles.btn} onClick={() => setActive(null)}>
                    Tagesplan
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeader title={release.title} backHref="/hofjahr" backLabel="Zurück zu Mein Hofjahr" />
      <div className={styles.stack}>
        <div className={styles.heroArt}>
          <VisualView v={{ kind: "scene", scene: allDone ? "ht-abend" : "ht-morgen" }} />
        </div>
        <div>
          <p className={styles.meterLabel}>
            {doneCount} von {parts.length} Teilen geschafft
          </p>
          <div className={styles.meter} role="progressbar" aria-valuemin={0} aria-valuemax={parts.length} aria-valuenow={doneCount} aria-label="Fortschritt im Hoftag">
            <span style={{ width: `${(doneCount / parts.length) * 100}%` }} />
          </div>
        </div>
        <ol className={styles.day}>
          {parts.map((p, i) => {
            const done = isDone(p.id);
            const open = i === 0 || isDone(parts[i - 1].id);
            const step = HOFTAG_STEPS.find((s) => s.id === p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  className={`${styles.part} ${done ? styles.partDone : ""}`}
                  disabled={!open}
                  onClick={() => setActive(i)}
                  aria-label={`Teil ${i + 1}: ${p.title}${done ? ", geschafft" : open ? "" : ", noch gesperrt"}`}
                >
                  <span className={styles.partNo} aria-hidden>
                    {done ? <Icon name="check" /> : open ? i + 1 : <Icon name="lock" />}
                  </span>
                  <span className={styles.partText}>
                    <span className={styles.partTime}>{step?.time}</span>
                    <span className={styles.partTitle}>{p.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className={styles.practice}>
          Hinweis für Erwachsene: Das Spiel zeigt, wie ein Hoftag abläuft. Echte Pferde führen, füttern und versorgen Kinder nur
          unter Anleitung erfahrener Erwachsener; Futtermengen legt immer der jeweilige Stall fest.
        </p>
      </div>
    </div>
  );
}
