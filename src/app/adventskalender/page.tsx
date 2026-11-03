import type { Metadata } from "next";
import { adventNow, adventOffer } from "@/content/advent/access.server";
import { doorSummaries } from "@/content/advent/doors.server";
import { adventState } from "@/content/advent/schedule";
import { adventskalender } from "@/content/products";
import { AdventCalendar } from "@/features/advent/AdventCalendar";

export const metadata: Metadata = {
  title: adventskalender.fullName,
  description: `${adventskalender.subtitle} Der Pferde-Adventskalender der Hofgeschichten für Kinder von 5 bis 12 Jahren.`,
};
export const dynamic = "force-dynamic";

type Search = { testdatum?: string | string[] };

/**
 * Adventskalender-Übersicht. Datum und Berechtigung werden auf dem Server bestimmt;
 * Titel und Fundstücke werden nur für Türchen ausgeliefert, die nach Datum offen sind.
 */
export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const { now, query } = adventNow((await searchParams).testdatum);
  const state = adventState(now);
  return <AdventCalendar state={state} summaries={doorSummaries(state.unlocked)} offer={await adventOffer()} query={query} />;
}
