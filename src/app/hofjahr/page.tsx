import type { Metadata } from "next";
import { releases } from "@/content/membership";
import { HofjahrScreen } from "@/features/hofjahr/HofjahrScreen";
import type { WeekState } from "@/features/hofjahr/WeekCard";
import { site } from "@/content/site";
import { isMember, releaseAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: site.clubName };
export const dynamic = "force-dynamic";

export default async function Page() {
  const weekStates: Record<string, WeekState> = {};
  for (const r of releases) {
    const a = await releaseAccess(r.slug);
    weekStates[r.slug] = a?.state ?? "locked";
  }
  return <HofjahrScreen weekStates={weekStates} member={await isMember()} now={new Date().toISOString()} />;
}
