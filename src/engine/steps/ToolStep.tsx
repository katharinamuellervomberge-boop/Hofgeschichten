"use client";

import { FeedCalculator } from "@/components/tools/FeedCalculator";
import { RidingVisualizer } from "@/components/tools/RidingVisualizer";
import { pick, type ToolStep as S } from "../types";
import { NextButton, Prompt, type StepProps } from "./shared";

/** Interaktives Werkzeug (Fütterungsrechner, Reitlehre-Visualizer) als Schritt einer Lektion */
export function ToolStep({ step, level, onDone }: StepProps<S>) {
  return (
    <>
      <Prompt text={pick(step.prompt, level)} />
      {step.tool === "fuetterungsrechner" ? <FeedCalculator /> : <RidingVisualizer start={step.start} />}
      <NextButton onClick={() => onDone()} />
    </>
  );
}
