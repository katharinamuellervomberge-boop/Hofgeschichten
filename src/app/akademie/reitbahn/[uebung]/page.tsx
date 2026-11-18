import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARENA_EXERCISES, getArenaExercise } from "@/content/arena";
import { ArenaExerciseScreen } from "@/features/arena/ArenaExerciseScreen";

type Params = { uebung: string };

export function generateStaticParams(): Params[] {
  return ARENA_EXERCISES.map((e) => ({ uebung: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const ex = getArenaExercise((await params).uebung);
  // Prototyp: noch nicht in Suchmaschinen
  return { title: ex ? `${ex.title} – Die Reitbahn` : "Die Reitbahn", robots: { index: false } };
}

/** Die Reitbahn – interaktive Übung (Prototyp, Inhalte im Entwurf) */
export default async function Page({ params }: { params: Promise<Params> }) {
  const ex = getArenaExercise((await params).uebung);
  if (!ex) notFound();
  return <ArenaExerciseScreen exercise={ex} />;
}
