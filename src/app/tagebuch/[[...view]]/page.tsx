import type { Metadata } from "next";
import { DiaryApp } from "@/features/tagebuch/DiaryApp";
import { DiaryPreview } from "@/features/tagebuch/DiaryPreview";
import { hasAcademy, isMember } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Mein Reitertagebuch", robots: { index: false } };
export const dynamic = "force-dynamic";

type Params = { view?: string[] };

/**
 * Mein Reitertagebuch – nur mit aktiver Hof-Mitgliedschaft (bestehende Prüfung
 * über das signierte Cookie). Alle anderen sehen die Vorschau.
 * Die Tagebuchdaten selbst liegen nur auf dem Gerät (features/tagebuch/db.ts).
 */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { view = [] } = await params;
  if (!(await isMember())) return <DiaryPreview hasAcademy={await hasAcademy()} />;
  return <DiaryApp view={view.slice(0, 2)} />;
}
