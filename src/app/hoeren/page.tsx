import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { episodes } from "@/content/episodes";
import { EpisodeLibrary } from "@/features/listen/EpisodeLibrary";
import { publicEpisodes } from "@/lib/access";

export const metadata: Metadata = { title: "Hörspiele" };

export default function Page() {
  if (!site.features.audio) notFound();
  return <EpisodeLibrary episodes={publicEpisodes(episodes)} />;
}
