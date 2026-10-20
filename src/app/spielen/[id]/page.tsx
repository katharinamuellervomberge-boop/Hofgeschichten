import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games, getGame } from "@/content/games";
import { GameRoute } from "@/features/games/GameRoute";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return games.map((g) => ({ id: g.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getGame(id)?.title ?? "Spiel" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  if (!getGame(id)) notFound();
  return <GameRoute id={id} />;
}
