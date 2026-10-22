import type { Metadata } from "next";
import { ParentsArea } from "@/features/parents/ParentsArea";
import { codesConfigured } from "@/lib/entitlements/codes";
import { getAccessibleAdventures, getMembershipStatus, getOwnedAdventures } from "@/lib/entitlements/server";
import { shopifyConfigured } from "@/lib/entitlements/shopify";
import { entitlementsConfigured } from "@/lib/entitlements/token";

export const metadata: Metadata = { title: "Elternbereich" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const base = entitlementsConfigured();
  return (
    <ParentsArea
      owned={await getOwnedAdventures()}
      accessible={await getAccessibleAdventures()}
      membership={await getMembershipStatus()}
      orderUnlockAvailable={base && shopifyConfigured()}
      codeUnlockAvailable={base && codesConfigured()}
    />
  );
}
