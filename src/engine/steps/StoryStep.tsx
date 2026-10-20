"use client";

import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { getCharacter } from "@/content/characters";
import { pick, type StoryStep as S } from "../types";
import { VisualView } from "../VisualView";
import { NextButton, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

const BIG = new Set(["scene", "notebook"]);

export function StoryStep({ step, level, onDone }: StepProps<S>) {
  const text = pick(step.text, level);
  useAutoSpeak(text, level);
  const kid = step.speaker && step.speaker !== "erzaehler" ? getCharacter(step.speaker) : undefined;

  return (
    <>
      {step.visual && (
        <div className={`${styles.storyVisual} ${BIG.has(step.visual.kind) ? "" : styles.storySmallVisual}`}>
          <VisualView v={step.visual} />
        </div>
      )}
      <div className={styles.bubble}>
        {kid && <KidPortrait kid={kid} className={styles.speaker} />}
        <div className={styles.bubbleBody}>
          {kid && <span className={styles.speakerName}>{kid.name}</span>}
          <p className={styles.storyText}>{text}</p>
        </div>
        <SpeakButton text={text} size="sm" />
      </div>
      <NextButton onClick={() => onDone()} />
    </>
  );
}
