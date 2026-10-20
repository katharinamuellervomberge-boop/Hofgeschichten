import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { episodes, getEpisode } from "@/content/episodes";
import { EpisodeScreen } from "@/features/listen/EpisodeScreen";
import { isFreelyAvailable, publicEpisodes } from "@/lib/access";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return publicEpisodes(episodes).map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  return { title: ep ? `Folge ${ep.number}` : "Hörspiel" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  if (!site.features.audio) notFound();
  const { slug } = await params;
  const episode = getEpisode(slug);
  // Kostenpflichtige Folgen werden in V1 gar nicht ausgeliefert (keine Browser-Sperre).
  if (!episode || !isFreelyAvailable(episode)) notFound();
  return <EpisodeScreen episode={episode} />;
}
