import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArenaExercise } from "@/content/arena";
import { ArenaExerciseScreen } from "@/features/arena/ArenaExerciseScreen";
import { DiaryPreview } from "@/features/tagebuch/DiaryPreview";
import { hasRidingSpace } from "@/lib/entitlements/server";

type Params = { uebung: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const ex = getArenaExercise((await params).uebung);
  return { title: ex ? `${ex.title} – Die Reitbahn` : "Die Reitbahn", robots: { index: false } };
}

/** Die Reitbahn – interaktive Übung. Teil des Riding Space (gleiche Prüfung wie Tagebuch und Planer). */
export default async function Page({ params }: { params: Promise<Params> }) {
  const ex = getArenaExercise((await params).uebung);
  if (!ex) notFound();
  if (!(await hasRidingSpace())) return <DiaryPreview />;
  return <ArenaExerciseScreen exercise={ex} />;
}
