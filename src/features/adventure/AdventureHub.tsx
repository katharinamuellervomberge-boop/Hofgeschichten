"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { adventureStamps } from "@/content/stamps";
import type { AdventureMeta } from "@/content/types";
import type { ClueDef } from "@/engine/types";
import { ClueContext, VisualView } from "@/engine/VisualView";
import { progressActions, useProgress } from "@/lib/progress/store";
import { AdventureCover } from "./AdventureCover";
import { phrases } from "@/lib/voice/phrases";
import styles from "./Adventure.module.css";

type Props = { meta: AdventureMeta; clues: Record<string, ClueDef> };

export function AdventureHub({ meta, clues }: Props) {
  const progress = useProgress();
  const done = progress.adventures[meta.slug]?.missions ?? [];
  const collected = progress.adventures[meta.slug]?.clues ?? [];
  const all = meta.missions.every((m) => done.includes(m.id));
  const badges = adventureStamps(meta.slug);
  const [confirm, setConfirm] = useState(false);

  return (
    <ClueContext.Provider value={{ clues, collected }}>
      <div className="page">
        <PageHeader
          title={meta.title}
          spoken={phrases.adventureHeader(meta.title, meta.teaser)}
          backHref="/abenteuer"
          backLabel="Zurück zu den Abenteuern"
        />
        <div className={styles.hero}>
          <AdventureCover slug={meta.slug} />
          {all && (
            <div className={styles.heroBadge}>
              <StampSeal stamp={badges[badges.length - 1]} earned tilt={-8} />
            </div>
          )}
        </div>

        <div className={styles.hubGrid}>
          <section aria-labelledby="missionen">
            <h2 id="missionen" className={styles.sectionTitle}>
              Missionen
            </h2>
            <ol className={styles.missions}>
              {meta.missions.map((m, i) => {
                const isDone = done.includes(m.id);
                const open = i === 0 || done.includes(meta.missions[i - 1].id);
                const inner = (
                  <>
                    <span className={`${styles.missionBadge} ${isDone ? styles.missionBadgeDone : ""}`}>
                      {isDone ? <Icon name="check" /> : open ? i + 1 : <Icon name="lock" />}
                    </span>
                    <span className={styles.missionText}>
                      <span className={styles.missionLabel}>Mission {i + 1}</span>
                      <span className={styles.missionTitle}>{m.title}</span>
                    </span>
                    {open && (
                      <span className={styles.missionGo} aria-hidden>
                        <Icon name={isDone ? "replay" : "play"} />
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={m.id}>
                    {open ? (
                      <Link
                        href={`/abenteuer/${meta.slug}/${m.id}`}
                        className={`${styles.mission} ${isDone ? styles.missionDone : ""}`}
                        aria-label={`Mission ${i + 1}: ${m.title}${isDone ? " (gelöst, nochmal spielen)" : ""}`}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className={`${styles.mission} ${styles.missionLocked}`} aria-label={`Mission ${i + 1}: noch gesperrt`}>
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-labelledby="buch">
            <h2 id="buch" className={styles.sectionTitle}>
              Mein Detektivbuch
            </h2>
            <VisualView v={{ kind: "notebook" }} />
            {done.length > 0 && (
              <div className={styles.resetRow}>
                {!confirm ? (
                  <button type="button" className={styles.resetBtn} onClick={() => setConfirm(true)}>
                    <Icon name="replay" width={20} height={20} /> Fall neu beginnen
                  </button>
                ) : (
                  <>
                    <span>Alle Missionen und Hinweise löschen?</span>
                    <button
                      type="button"
                      className={styles.resetBtn}
                      onClick={() => {
                        progressActions.resetAdventure(meta.slug);
                        setConfirm(false);
                      }}
                    >
                      Ja
                    </button>
                    <button type="button" className={styles.resetBtn} onClick={() => setConfirm(false)}>
                      Nein
                    </button>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </ClueContext.Provider>
  );
}
