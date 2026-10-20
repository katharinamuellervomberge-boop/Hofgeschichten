"use client";

import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { PersonPortrait } from "@/components/illustrations/PersonPortrait";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { getCharacter } from "@/content/characters";
import { getPerson } from "@/content/people";
import { pick, type StoryStep as S } from "../types";
import { VisualView } from "../VisualView";
import { NextButton, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

const BIG = new Set(["scene", "notebook", "doc"]);

export function StoryStep({ step, level, onDone }: StepProps<S>) {
  const text = pick(step.text, level);
  useAutoSpeak(text, level);
  const kid = step.speaker && step.speaker !== "erzaehler" ? getCharacter(step.speaker) : undefined;
  const person = !kid && step.speaker && step.speaker !== "erzaehler" ? getPerson(step.speaker) : undefined;
  const name = kid?.name ?? person?.name;

  return (
    <>
      {step.visual && (
        <div className={`${styles.storyVisual} ${BIG.has(step.visual.kind) ? "" : styles.storySmallVisual}`}>
          <VisualView v={step.visual} />
        </div>
      )}
      <div className={styles.bubble}>
        {kid && <KidPortrait kid={kid} className={styles.speaker} />}
        {person && <PersonPortrait person={person} className={styles.speaker} />}
        <div className={styles.bubbleBody}>
          {name && <span className={styles.speakerName}>{name}</span>}
          <p className={styles.storyText}>{text}</p>
        </div>
        <SpeakButton text={text} size="sm" />
      </div>
      <NextButton onClick={() => onDone()} />
    </>
  );
}
