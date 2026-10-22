import type { Metadata } from "next";
import { releases } from "@/content/membership";
import { HofjahrScreen } from "@/features/hofjahr/HofjahrScreen";
import type { WeekState } from "@/features/hofjahr/WeekCard";
import { releaseAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Mein Hofjahr" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const weekStates: Record<string, WeekState> = {};
  for (const r of releases) {
    const a = await releaseAccess(r.slug);
    weekStates[r.slug] = a?.state ?? "locked";
  }
  return <HofjahrScreen weekStates={weekStates} now={new Date().toISOString()} />;
}
