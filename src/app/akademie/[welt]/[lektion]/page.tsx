import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorld, lessonActivity } from "@/content/akademie";
import { isTrialLesson } from "@/content/akademie/module";
import { loadLesson } from "@/content/akademie/inhalte.server";
import { videoForLesson } from "@/content/akademie/videos";
import { AcademyLocked } from "@/features/akademie/AcademyLocked";
import { LessonScreen } from "@/features/akademie/LessonScreen";
import { getLocale } from "@/i18n/server";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { welt: string; lektion: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { welt, lektion } = await params;
  const locale = await getLocale();
  return { title: getWorld(welt, locale)?.lessons.find((l) => l.slug === lektion)?.title ?? (locale === "en" ? "Riding Academy" : "Reitakademie") };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { welt, lektion } = await params;
  const locale = await getLocale();
  const found = loadLesson(welt, lektion, locale);
  if (!found) notFound();
  // Inhalte verlassen den Server erst nach bestätigter Freischaltung – außer bei den Probelektionen (eine je Modul)
  const unlocked = await hasGrosseAkademie();
  if (!unlocked && !isTrialLesson(found.lesson.id)) return <AcademyLocked title={found.lesson.title} lessonId={found.lesson.id} />;
  return (
    <LessonScreen
      worldSlug={found.world.slug}
      lesson={found.lesson}
      activity={lessonActivity(found.lesson, locale)}
      // Lernvideos sind deutsch vertont – in der englischen Version vorerst nicht
      video={unlocked && locale === "de" ? videoForLesson(found.world.slug, found.lesson.slug) : undefined}
      unlocked={unlocked}
    />
  );
}
