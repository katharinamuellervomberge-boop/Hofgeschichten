import type { Metadata } from "next";
import { ProfileScreen } from "@/features/profil/ProfileScreen";
import { getAccessibleAdventures, getMembershipStatus, hasGrosseAkademie } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Profil" };
export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <ProfileScreen
      academy={await hasGrosseAkademie()}
      membership={await getMembershipStatus()}
      adventures={await getAccessibleAdventures()}
    />
  );
}
