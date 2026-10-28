import type { Metadata } from "next";
import { releases } from "@/content/membership";
import { publishedAdventures } from "@/content/adventures";
import type { WeekState } from "@/features/hofjahr/WeekCard";
import { HofweltScreen } from "@/features/hofwelt/HofweltScreen";
import { getAccessibleAdventures, isMember, releaseAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Die Hofgeschichten-Welt" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const weekStates: Record<string, WeekState> = {};
  for (const r of releases) {
    const a = await releaseAccess(r.slug);
    weekStates[r.slug] = a?.state ?? "locked";
  }
  return (
    <HofweltScreen
      weekStates={weekStates}
      member={await isMember()}
      owned={await getAccessibleAdventures()}
      adventures={publishedAdventures}
      now={new Date().toISOString()}
    />
  );
}
