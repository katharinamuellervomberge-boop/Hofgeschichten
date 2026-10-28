import type { Metadata } from "next";
import { GameOverview } from "@/features/games/GameOverview";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Spielen & Wissen" };
export const dynamic = "force-dynamic";

export default async function Page() {
  // Große Hofspiele für Mitglieder stehen seit 28.10.2026 in der Hofwelt (/hofwelt)
  return <GameOverview academyUnlocked={await hasGrosseAkademie()} />;
}
