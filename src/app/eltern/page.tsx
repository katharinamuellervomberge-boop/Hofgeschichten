import type { Metadata } from "next";
import { ParentsArea } from "@/features/parents/ParentsArea";
import { codesConfigured } from "@/lib/entitlements/codes";
import { getAccessibleAdventures, getMembershipStatus, getOwnedAdventures } from "@/lib/entitlements/server";
import { shopifyConfigured } from "@/lib/entitlements/shopify";
import { entitlementsConfigured } from "@/lib/entitlements/token";
import { UnlockEn } from "@/features/parents/UnlockEn";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLocale()) === "en" ? "Buy & unlock" : "Elternbereich" };
}
export const dynamic = "force-dynamic";

export default async function Page() {
  const base = entitlementsConfigured();
  // Englische Version: nur Kauf und Freischaltung der Reitakademie
  if ((await getLocale()) === "en")
    return <UnlockEn owned={await getOwnedAdventures()} orderUnlockAvailable={base && shopifyConfigured()} codeUnlockAvailable={base && codesConfigured()} />;
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
