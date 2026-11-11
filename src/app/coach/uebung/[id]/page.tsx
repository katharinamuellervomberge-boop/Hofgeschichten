import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCoachExercise } from "@/content/coach/uebungen.server";
import { isDemoExercise } from "@/content/coach/access.server";
import { CoachExercisePage, CoachLockedExercise } from "@/features/coach/CoachExercisePage";
import { hasRiderCoach } from "@/lib/entitlements/server";

type Params = { id: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const ex = getCoachExercise((await params).id);
  return { title: ex ? `${ex.title} · Rider Coach` : "Rider Coach", robots: { index: false } };
}

/** Einzelne Übung der Rider-Coach-Bibliothek – Inhalte nur für Käufer (und die Übungen des Demo-Wegs). */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const ex = getCoachExercise(id);
  if (!ex) notFound();
  if (!(await hasRiderCoach()) && !isDemoExercise(id)) return <CoachLockedExercise title={ex.title} />;
  return <CoachExercisePage ex={ex} />;
}
