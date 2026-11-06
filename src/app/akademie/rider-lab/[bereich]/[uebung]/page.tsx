import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isTrialExercise } from "@/content/riderlab/katalog";
import { loadExercise } from "@/content/riderlab/uebungen.server";
import { RiderLabExercise, RiderLabLocked } from "@/features/riderlab/RiderLabScreens";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { bereich: string; uebung: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { bereich, uebung } = await params;
  const found = loadExercise(bereich, uebung);
  return { title: found ? `${found.ex.title} · Rider Lab` : "Rider Lab" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { bereich, uebung } = await params;
  const found = loadExercise(bereich, uebung);
  if (!found) notFound();
  const unlocked = await hasGrosseAkademie();
  // Gesperrt wie die Lektionen: Inhalte kommen erst nach der Freischaltung in den Browser
  if (!unlocked && !isTrialExercise(found.area, found.ex.id)) return <RiderLabLocked areaSlug={bereich} title={found.ex.title} />;
  return <RiderLabExercise areaSlug={bereich} ex={found.ex} unlocked={unlocked} />;
}
