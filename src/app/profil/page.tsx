import type { Metadata } from "next";
import { ProfileScreen } from "@/features/profil/ProfileScreen";
import { getAccessibleAdventures, getMembershipStatus, hasGrosseAkademie, hasRiderCoach } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Profil" };
export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <ProfileScreen
      academy={await hasGrosseAkademie()}
      coach={await hasRiderCoach()}
      membership={await getMembershipStatus()}
      adventures={await getAccessibleAdventures()}
    />
  );
}
