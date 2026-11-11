import type { Metadata } from "next";
import { CoachHome } from "@/features/coach/CoachHome";
import { hasRiderCoach } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Rider Coach – Was klappt beim Reiten gerade nicht?" };
export const dynamic = "force-dynamic";

/** Rider Coach: Suche und Themen sind für alle sichtbar, Lösungswege nur nach Freischaltung (außer Demo). */
export default async function Page() {
  return <CoachHome owned={await hasRiderCoach()} />;
}
