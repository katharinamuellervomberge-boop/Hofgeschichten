import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAdventureMeta } from "@/content/adventures";
import { loadAdventureContent } from "@/content/adventures/registry.server";
import { MissionScreen } from "@/features/adventure/MissionScreen";
import { canAccessAdventure } from "@/lib/entitlements/server";

type Params = { slug: string; mission: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, mission } = await params;
  const meta = getAdventureMeta(slug);
  const m = meta?.missions.find((x) => x.id === mission);
  return { title: m ? m.title : "Mission" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug, mission } = await params;
  const meta = getAdventureMeta(slug);
  if (!meta) notFound();

  // Serverseitige Berechtigungsprüfung – die Missionsdaten verlassen den Server nur mit gültigem Kauf.
  if (!(await canAccessAdventure(slug))) redirect(`/abenteuer/${slug}`);

  const content = loadAdventureContent(slug);
  const m = content?.missions.find((x) => x.id === mission);
  if (!content || !m) notFound();

  return <MissionScreen meta={meta} mission={m} clues={content.clues} />;
}
