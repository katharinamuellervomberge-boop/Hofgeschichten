import type { Metadata } from "next";
import { meinTagAmHof } from "@/content/products";
import { HoftagGame } from "@/features/hoftag/HoftagGame";
import { hoftagAccess } from "@/lib/entitlements/server";

export const metadata: Metadata = {
  title: meinTagAmHof.fullName,
  description: `${meinTagAmHof.subtitle} Ein ganzer Tag Verantwortung für Tivoli, Tonga oder Scrabble – das Pferdepflege-Spiel der Hofgeschichten für Kinder von 6 bis 12 Jahren.`,
};
export const dynamic = "force-dynamic";

/**
 * „Hofgeschichten – Mein Tag am Hof“. Die Freischaltung wird auf dem Server geprüft
 * (Mitgliedschaft oder Einzelkauf); ohne Freischaltung ist der erste Hoftag frei.
 */
export default async function Page() {
  return <HoftagGame access={await hoftagAccess()} />;
}
