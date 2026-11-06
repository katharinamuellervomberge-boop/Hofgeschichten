import type { Metadata } from "next";
import { DiaryApp } from "@/features/tagebuch/DiaryApp";
import { DiaryPreview } from "@/features/tagebuch/DiaryPreview";
import { hasAcademy, isMember } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Mein Reitertagebuch", robots: { index: false } };
export const dynamic = "force-dynamic";

type Params = { view?: string[] };

/**
 * Mein Reitertagebuch – mit aktiver Hof-Mitgliedschaft ODER gekaufter Reitakademie
 * (bestehende Prüfungen über das signierte Cookie). Alle anderen sehen die Vorschau.
 * Die Tagebuchdaten selbst liegen nur auf dem Gerät (features/tagebuch/db.ts).
 */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { view = [] } = await params;
  const allowed = (await isMember()) || (await hasAcademy());
  if (!allowed) return <DiaryPreview />;
  return <DiaryApp view={view.slice(0, 2)} />;
}
