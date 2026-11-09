import type { Metadata } from "next";
import { GameOverview } from "@/features/games/GameOverview";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Spielen & Wissen" };
export const dynamic = "force-dynamic";

export default async function Page() {
  return <GameOverview academyUnlocked={await hasGrosseAkademie()} />;
}
