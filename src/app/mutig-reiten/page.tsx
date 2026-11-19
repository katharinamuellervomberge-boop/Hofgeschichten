import type { Metadata } from "next";
import { UNIT_TITLES, isUnitReleased, releaseLabel, unitReleaseDate } from "@/content/mutig/katalog";
import { Dashboard } from "@/features/mutig/Dashboard";
import { Preview } from "@/features/mutig/Preview";
import { hasMutigReiten } from "@/lib/entitlements/server";

export const metadata: Metadata = {
  title: "Mutig reiten – 6 Wochen gegen Angst beim Reiten",
  description: "Das 6-Wochen-Programm gegen Angst beim Reiten: nach dem Sturz, beim Wiedereinstieg und nach der Geburt. Mit kostenlosem Angst-Check.",
};
export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await hasMutigReiten())) return <Preview />;
  const now = new Date();
  const units = UNIT_TITLES.map((title, k) => ({
    n: k + 1,
    title,
    released: isUnitReleased(k + 1, now),
    release: releaseLabel(unitReleaseDate(k + 1)),
  }));
  return <Dashboard units={units} />;
}
