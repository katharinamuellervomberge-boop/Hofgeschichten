import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblemInfo } from "@/content/coach/index";
import { loadProblem } from "@/content/coach/probleme.server";
import { exercisesForProblem } from "@/content/coach/access.server";
import { CoachAnalysis } from "@/features/coach/CoachAnalysis";
import { CoachLocked } from "@/features/coach/CoachLocked";
import { hasDiary, hasRiderCoach } from "@/lib/entitlements/server";

type Params = { problem: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const info = getProblemInfo((await params).problem);
  return { title: info ? `${info.title} · Rider Coach` : "Rider Coach", robots: { index: false } };
}

/**
 * Problemanalyse und Lösungsweg. Die Inhalte (Fragen, Ursachen, Übungen) gehen nur an
 * Käufer – und beim Demo-Problem an alle. Die Prüfung läuft hier auf dem Server.
 */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { problem: slug } = await params;
  const info = getProblemInfo(slug);
  const problem = loadProblem(slug);
  if (!info || !problem) notFound();
  const owned = await hasRiderCoach();
  if (!owned && !info.demo) return <CoachLocked info={info} />;
  return <CoachAnalysis problem={problem} exercises={exercisesForProblem(problem)} owned={owned} canSave={await hasDiary()} />;
}
