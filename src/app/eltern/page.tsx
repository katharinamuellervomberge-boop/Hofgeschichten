import type { Metadata } from "next";
import { ParentsArea } from "@/features/parents/ParentsArea";
import { codesConfigured } from "@/lib/entitlements/codes";
import { getOwnedAdventures } from "@/lib/entitlements/server";
import { shopifyConfigured } from "@/lib/entitlements/shopify";
import { entitlementsConfigured } from "@/lib/entitlements/token";

export const metadata: Metadata = { title: "Elternbereich" };

export default async function Page() {
  const base = entitlementsConfigured();
  return (
    <ParentsArea
      owned={await getOwnedAdventures()}
      orderUnlockAvailable={base && shopifyConfigured()}
      codeUnlockAvailable={base && codesConfigured()}
    />
  );
}
