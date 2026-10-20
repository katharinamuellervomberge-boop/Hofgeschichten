"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { adventureStamps } from "@/content/stamps";
import type { AdventureMeta } from "@/content/types";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import type { Activity, ClueDef, StoryStep } from "@/engine/types";
import { ClueContext, VisualView } from "@/engine/VisualView";
import { progressActions, useProgress } from "@/lib/progress/store";
import { speak } from "@/lib/speech";
import engine from "@/engine/engine.module.css";
import { phrases } from "@/lib/voice/phrases";
import styles from "./Adventure.module.css";

type Props = {
  meta: AdventureMeta;
  mission: Activity;
  clues: Record<string, ClueDef>;
};

export function MissionScreen({ meta, mission, clues }: Props) {
  const progress = useProgress();
  const saved = progress.adventures[meta.slug];
  const [runClues, setRunClues] = useState<string[]>([]);
  const index = meta.missions.findIndex((m) => m.id === mission.id);
  const prev = index > 0 ? meta.missions[index - 1] : null;
  const next = meta.missions[index + 1];
  const locked = prev !== null && !(saved?.missions ?? []).includes(prev.id);
  const collected = [...(saved?.clues ?? []), ...runClues.filter((c) => !(saved?.clues ?? []).includes(c))];
  const stamps = adventureStamps(meta.slug);
  const missionStamp = stamps.find((s) => s.id === `${meta.slug}:${mission.id}`)!;
  const finalStamp = stamps[stamps.length - 1];
  const firstScene = mission.steps.find((s): s is StoryStep => s.type === "story" && !!s.visual)?.visual;

  return (
    <ClueContext.Provider value={{ clues, collected }}>
      <div className="page">
        <PageHeader
          title={`Mission ${index + 1}`}
          spoken={phrases.missionHeader(index + 1, mission.title)}
          backHref={`/abenteuer/${meta.slug}`}
          backLabel="Zur Missionsübersicht"
        >
          {mission.title}
        </PageHeader>

        {locked ? (
          <div className={styles.lockedCard}>
            <span className={styles.lockIcon} aria-hidden>
              <Icon name="lock" />
            </span>
            <p className={styles.lockedText}>Löse zuerst Mission {index}: {prev?.title}.</p>
            <Link href={`/abenteuer/${meta.slug}/${prev?.id}`} className={styles.parentLink}>
              Zu Mission {index}
            </Link>
          </div>
        ) : (
          <ActivityPlayer
            activity={mission}
            tint="#E4E2D3"
            introArt={firstScene ? <VisualView v={firstScene} /> : undefined}
            onClues={(c) => setRunClues((r) => [...r, ...c.filter((x) => !r.includes(x))])}
            onComplete={({ clues: found }) => {
              progressActions.completeMission(meta.slug, mission.id, found);
              setRunClues([]);
              const isLast = !next;
              window.setTimeout(
                () => speak(isLast ? phrases.caseSolved(finalStamp.title) : phrases.missionDone(index + 2)),
                300,
              );
            }}
            renderDone={({ replay }) => (
              <div className={engine.done}>
                <StampSeal stamp={next ? missionStamp : finalStamp} earned tilt={-8} className={engine.doneSeal} />
                <h2 className={engine.doneTitle}>{next ? "Mission geschafft!" : "Fall gelöst!"}</h2>
                <p className={engine.doneText}>
                  {next
                    ? `Neue Hinweise stehen in deinem Detektivbuch.`
                    : `Du hast das Abzeichen „${finalStamp.title}“ verdient. Es ist jetzt in deinem Pass.`}
                </p>
                <div className={engine.doneActions}>
                  <button type="button" className={engine.doneBtn} onClick={replay}>
                    <Icon name="replay" />
                    Nochmal
                  </button>
                  {next ? (
                    <Link href={`/abenteuer/${meta.slug}/${next.id}`} className={`${engine.doneBtn} ${engine.doneBtnPrimary}`}>
                      <Icon name="play" />
                      Mission {index + 2}
                    </Link>
                  ) : (
                    <Link href="/pass" className={`${engine.doneBtn} ${engine.doneBtnPrimary}`}>
                      <Icon name="pass" />
                      Zum Pass
                    </Link>
                  )}
                </div>
              </div>
            )}
          />
        )}
      </div>
    </ClueContext.Provider>
  );
}
