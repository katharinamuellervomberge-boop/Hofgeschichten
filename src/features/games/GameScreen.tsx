"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { freeStamps } from "@/content/stamps";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import type { Activity } from "@/engine/types";
import { progressActions } from "@/lib/progress/store";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import engine from "@/engine/engine.module.css";

type Props = {
  activity: Activity;
  /** Stempel-ID, die dieses Spiel vergibt */
  stampId: string;
  backHref: string;
  backLabel: string;
  tint?: string;
  introArt?: ReactNode;
  /** zusätzlicher Link auf dem Abschlussbildschirm */
  more?: { href: string; label: string };
};

/** Gemeinsamer Rahmen für alle kostenlosen Lernspiele. */
export function GameScreen({ activity, stampId, backHref, backLabel, tint, introArt, more }: Props) {
  const stamp = freeStamps.find((s) => s.id === stampId)!;
  useEffect(() => {
    progressActions.setLast({ href: window.location.pathname, title: activity.title, area: "Spielen" });
  }, [activity.title]);
  return (
    <div className="page">
      <PageHeader title={activity.title} backHref={backHref} backLabel={backLabel} />
      <ActivityPlayer
        activity={activity}
        tint={tint}
        introArt={introArt}
        onComplete={() => {
          progressActions.completeGame(activity.id);
          window.setTimeout(() => speak(phrases.gameDone(stamp.title)), 300);
        }}
        renderDone={({ replay }) => (
          <div className={engine.done}>
            <StampSeal stamp={stamp} earned tilt={-8} className={engine.doneSeal} />
            <h2 className={engine.doneTitle}>Geschafft!</h2>
            <p className={engine.doneText}>Der Stempel „{stamp.title}“ ist in deinem Pass.</p>
            <div className={engine.doneActions}>
              <button type="button" className={engine.doneBtn} onClick={replay}>
                <Icon name="replay" />
                Nochmal
              </button>
              <Link href={more?.href ?? "/pass"} className={`${engine.doneBtn} ${engine.doneBtnPrimary}`}>
                <Icon name={more ? "puzzle" : "pass"} />
                {more?.label ?? "Zum Pass"}
              </Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}
