import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorld, lessonActivity } from "@/content/akademie";
import { loadLesson } from "@/content/akademie/inhalte.server";
import { AcademyLocked } from "@/features/akademie/AcademyLocked";
import { LessonScreen } from "@/features/akademie/LessonScreen";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { welt: string; lektion: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { welt, lektion } = await params;
  return { title: getWorld(welt)?.lessons.find((l) => l.slug === lektion)?.title ?? "Reitakademie" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { welt, lektion } = await params;
  const found = loadLesson(welt, lektion);
  if (!found) notFound();
  // Große Akademie: Inhalte verlassen den Server erst nach bestätigter Freischaltung
  if (found.tier === "gross" && !(await hasGrosseAkademie())) return <AcademyLocked title={found.lesson.title} />;
  return <LessonScreen worldSlug={found.world.slug} lesson={found.lesson} activity={lessonActivity(found.lesson)} />;
}
