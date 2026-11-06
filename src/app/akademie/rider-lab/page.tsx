import type { Metadata } from "next";
import { riderLabAreas } from "@/content/riderlab/uebungen.server";
import { RiderLabHome } from "@/features/riderlab/RiderLabScreens";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Rider Lab – Dein Körper. Dein Sitz. Dein Reiten." };
export const dynamic = "force-dynamic";

/** Vorschau je Bereich: die Animation der Probeübung (ohnehin frei zugänglich) */
const previews = () => Object.fromEntries(riderLabAreas.map((a) => [a.slug, a.exercises[0].anim]));

export default async function Page() {
  return <RiderLabHome unlocked={await hasGrosseAkademie()} previews={previews()} />;
}
