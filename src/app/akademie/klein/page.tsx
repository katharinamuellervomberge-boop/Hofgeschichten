import type { Metadata } from "next";
import { ACADEMY_TIERS } from "@/content/akademie";
import { AcademyTierScreen } from "@/features/akademie/AcademyOverview";

export const metadata: Metadata = { title: ACADEMY_TIERS.klein.title };

export default function Page() {
  return <AcademyTierScreen tier="klein" unlocked />;
}
