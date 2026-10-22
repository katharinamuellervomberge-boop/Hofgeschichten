import type { Metadata } from "next";
import { membership } from "@/content/membership";
import { SalesPage } from "@/features/membership/SalesPage";
import { getMembershipStatus } from "@/lib/entitlements/server";

export const metadata: Metadata = {
  title: membership.name,
  description: `Ein ganzes Jahr voller Hofabenteuer: ${membership.name} – ${membership.price} einmalig für das ganze erste Jahr. Jeden Freitag ab ${membership.firstReleaseLabel} neue Inhalte.`,
};
export const dynamic = "force-dynamic";

export default async function Page() {
  return <SalesPage status={await getMembershipStatus()} />;
}
