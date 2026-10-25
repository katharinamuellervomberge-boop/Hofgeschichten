import type { Metadata } from "next";
import { ACADEMY_TIERS } from "@/content/akademie";
import { releases } from "@/content/membership";
import { AcademyTierScreen, type MonthlyLesson } from "@/features/akademie/AcademyOverview";
import { hasGrosseAkademie, releaseAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: ACADEMY_TIERS.gross.title };
export const dynamic = "force-dynamic";

export default async function Page() {
  // Monatslektionen der Reitakademie aus den Freitagsfolgen (nur für Mitglieder, ab Termin)
  const monthly: MonthlyLesson[] = [];
  for (const r of releases.filter((x) => x.category === "Reitakademie")) {
    const a = await releaseAccess(r.slug);
    if (a) monthly.push({ release: a.release, state: a.state });
  }
  return <AcademyTierScreen tier="gross" unlocked={await hasGrosseAkademie()} monthly={monthly} />;
}
