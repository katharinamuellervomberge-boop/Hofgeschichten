import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isTrialExercise } from "@/content/riderlab/katalog";
import { loadExercise } from "@/content/riderlab/uebungen.server";
import { RiderLabExercise, RiderLabLocked } from "@/features/riderlab/RiderLabScreens";
import { hasGrosseAkademie } from "@/lib/entitlements/server";
import { getLocale } from "@/i18n/server";
import { EnglishDom } from "@/i18n/EnglishDom";
import { riderLabText, translateRiderLabExercise } from "@/content/riderlab/en";

type Params = { bereich: string; uebung: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { bereich, uebung } = await params;
  const found = loadExercise(bereich, uebung);
  const en = (await getLocale()) === "en";
  return { title: found ? `${en ? riderLabText(found.ex.title) : found.ex.title} · Rider Lab` : "Rider Lab" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { bereich, uebung } = await params;
  const found = loadExercise(bereich, uebung);
  if (!found) notFound();
  const unlocked = await hasGrosseAkademie();
  // Gesperrt wie die Lektionen: Inhalte kommen erst nach der Freischaltung in den Browser
  const en = (await getLocale()) === "en";
  const wrap = (page: ReactNode) => (en ? <EnglishDom pack="riderlab">{page}</EnglishDom> : page);
  if (!unlocked && !isTrialExercise(found.area, found.ex.id))
    return wrap(<RiderLabLocked areaSlug={bereich} title={en ? riderLabText(found.ex.title) : found.ex.title} />);
  return wrap(<RiderLabExercise areaSlug={bereich} ex={en ? translateRiderLabExercise(found.ex) : found.ex} unlocked={unlocked} />);
}
