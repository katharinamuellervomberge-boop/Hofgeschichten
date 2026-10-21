import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { academyGames, getAcademyGame } from "@/content/akademie/spiele";
import { AcademyGameScreen } from "@/features/akademie/AcademyGameScreen";

type Params = { spiel: string };

export function generateStaticParams(): Params[] {
  return academyGames.map((g) => ({ spiel: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { spiel } = await params;
  return { title: getAcademyGame(spiel)?.title ?? "Reitakademie" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { spiel } = await params;
  if (!getAcademyGame(spiel)) notFound();
  return <AcademyGameScreen slug={spiel} />;
}
