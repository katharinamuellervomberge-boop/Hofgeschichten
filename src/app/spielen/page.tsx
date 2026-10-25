import type { Metadata } from "next";
import { releases } from "@/content/membership";
import { GameOverview, type MemberGame } from "@/features/games/GameOverview";
import { releaseAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Spiele" };
export const dynamic = "force-dynamic";

export default async function Page() {
  // Große Hofspiele für Mitglieder (z. B. „Ein Tag auf dem Hof“) – Zugriff prüft der Server
  const memberGames: MemberGame[] = [];
  for (const r of releases.filter((x) => x.category === "Hofspiel")) {
    const a = await releaseAccess(r.slug);
    if (a) memberGames.push({ release: a.release, state: a.state });
  }
  return <GameOverview memberGames={memberGames} />;
}
