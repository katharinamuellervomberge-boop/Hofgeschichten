import type { Metadata } from "next";
import { ACADEMY_TITLE } from "@/content/akademie";
import { lernpfad } from "@/content/akademie/lernpfad";
import { AcademyOverview } from "@/features/akademie/AcademyOverview";
import type { PremiumState } from "@/features/akademie/LearningPath";
import { releaseAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: ACADEMY_TITLE };
export const dynamic = "force-dynamic";

export default async function Page() {
  const premium: Record<string, PremiumState> = {};
  for (const c of lernpfad) {
    for (const s of c.stations) {
      if (s.kind === "premium") premium[s.release] = (await releaseAccess(s.release))?.state ?? "locked";
    }
  }
  return <AcademyOverview premium={premium} />;
}
