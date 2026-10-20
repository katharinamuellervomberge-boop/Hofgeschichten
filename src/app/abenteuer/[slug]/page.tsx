import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdventureMeta } from "@/content/adventures";
import { loadAdventureContent } from "@/content/adventures/registry.server";
import { AdventureHub } from "@/features/adventure/AdventureHub";
import { LockedAdventure } from "@/features/adventure/LockedAdventure";
import { canAccessAdventure } from "@/lib/entitlements/server";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getAdventureMeta(slug)?.title ?? "Abenteuer" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const meta = getAdventureMeta(slug);
  if (!meta) notFound();

  // Serverseitige Prüfung: Ohne Berechtigung werden keine Inhalte ausgeliefert.
  if (!(await canAccessAdventure(slug))) return <LockedAdventure meta={meta} />;

  const content = loadAdventureContent(slug);
  if (!content) notFound();
  return <AdventureHub meta={meta} clues={content.clues} />;
}
