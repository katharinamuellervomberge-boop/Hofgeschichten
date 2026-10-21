import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, worlds } from "@/content/akademie";
import { LessonScreen } from "@/features/akademie/LessonScreen";

type Params = { welt: string; lektion: string };

export function generateStaticParams(): Params[] {
  return worlds.flatMap((w) => w.lessons.map((l) => ({ welt: w.slug, lektion: l.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { welt, lektion } = await params;
  return { title: getLesson(welt, lektion)?.lesson.title ?? "Reitakademie" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { welt, lektion } = await params;
  if (!getLesson(welt, lektion)) notFound();
  return <LessonScreen world={welt} lesson={lektion} />;
}
