import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { getLocale } from "@/i18n/server";
import { ClaimUnlock } from "@/features/akademie/ClaimUnlock";

export const metadata: Metadata = { title: "Kauf freischalten", robots: { index: false } };
export const dynamic = "force-dynamic";

/**
 * Rückweg nach dem Direktkauf, z. B. aus der Shopify-Bestellbestätigung:
 * https://www.hofgeschichten.app/kauf/fertig?c={{ attributes.hg_claim }}
 */
export default async function Page({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const en = (await getLocale()) === "en";
  return (
    <LegalPage title={en ? "Unlock your purchase" : "Kauf freischalten"}>
      <ClaimUnlock claim={typeof c === "string" ? c : null} en={en} />
    </LegalPage>
  );
}
