import type { Metadata } from "next";
import { GameOverview } from "@/features/games/GameOverview";

export const metadata: Metadata = { title: "Spielen" };

export default function Page() {
  return <GameOverview />;
}
