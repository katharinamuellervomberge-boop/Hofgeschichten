import type { Metadata } from "next";
import { DiaryApp } from "@/features/tagebuch/DiaryApp";
import { DiaryPreview } from "@/features/tagebuch/DiaryPreview";
import { ridingSpaceStatus } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Riding Space – Reitertagebuch, Trainingsplaner & Rider Coach", robots: { index: false } };
export const dynamic = "force-dynamic";

type Params = { view?: string[] };

/**
 * Riding Space (Reitertagebuch, Trainingsplaner, Rider Coach) – seit 14.11.2026 eigenes Produkt.
 * Frei mit Riding-Space-Kauf (12 Monate), Bestandsschutz (Reitakademie vor der Trennung) oder
 * aktiver Hof-Mitgliedschaft (siehe hasRidingSpace). Alle anderen sehen die Vorschau.
 * Die Tagebuchdaten selbst liegen nur auf dem Gerät (features/tagebuch/db.ts).
 */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { view = [] } = await params;
  const status = await ridingSpaceStatus();
  if (!status.active) return <DiaryPreview expired={status.expired} />;
  return <DiaryApp view={view.slice(0, 2)} accessUntil={status.via === "kauf" ? status.until : undefined} />;
}
