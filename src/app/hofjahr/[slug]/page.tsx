import type { Metadata } from "next";
import { site } from "@/content/site";
import { notFound } from "next/navigation";
import { getRelease } from "@/content/membership";
import { loadPremiumContent } from "@/content/premium/registry.server";
import { lessonActivity } from "@/content/akademie/activity";
import { HofHoerspielScreen } from "@/features/hofjahr/HofHoerspielScreen";
import { HofTagGame } from "@/features/hofjahr/HofTagGame";
import { PremiumLessonScreen } from "@/features/hofjahr/PremiumLessonScreen";
import { ReleaseLocked } from "@/features/hofjahr/ReleaseLocked";
import { releaseAccess } from "@/lib/entitlements/server";

type Params = { slug: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getRelease(slug)?.title ?? site.clubName };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  // Serverseitige Prüfung von Mitgliedschaft UND Veröffentlichungstermin – vorher verlassen keine Inhalte den Server.
  const access = await releaseAccess(slug);
  if (!access) notFound();
  if (access.state !== "open") return <ReleaseLocked release={access.release} member={access.state === "upcoming"} />;

  const content = loadPremiumContent(slug);
  if (!content) return <ReleaseLocked release={access.release} member />;
  if (content.kind === "game") return <HofTagGame release={access.release} parts={content.parts} />;
  if (content.kind === "audio") {
    const r = access.release;
    return (
      <HofHoerspielScreen
        release={r}
        episode={{
          slug: `hofjahr-${r.slug}`,
          number: 1,
          title: r.title,
          teaser: r.teaser,
          audioSrc: `/api/hofjahr-audio/${r.slug}`,
          durationSeconds: content.durationSeconds,
          horse: content.horse,
          characters: content.characters,
          status: "published",
          access: "purchase",
          coverTint: "#DDE3D6",
        }}
      />
    );
  }
  return <PremiumLessonScreen release={access.release} lesson={content.lesson} activity={lessonActivity(content.lesson)} />;
}
