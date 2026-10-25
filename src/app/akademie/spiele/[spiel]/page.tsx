import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAcademyGameInfo } from "@/content/akademie";
import { loadAcademyGame } from "@/content/akademie/inhalte.server";
import { AcademyGameScreen } from "@/features/akademie/AcademyGameScreen";
import { AcademyLocked } from "@/features/akademie/AcademyLocked";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { spiel: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { spiel } = await params;
  return { title: getAcademyGameInfo(spiel)?.title ?? "Reitakademie" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { spiel } = await params;
  const found = loadAcademyGame(spiel);
  if (!found) notFound();
  if (found.tier === "gross" && !(await hasGrosseAkademie())) return <AcademyLocked title={found.game.title} />;
  const { activity, ...info } = found.game;
  return <AcademyGameScreen game={{ ...info, tier: found.tier }} activity={activity} />;
}
