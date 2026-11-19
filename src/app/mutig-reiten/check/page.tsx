import type { Metadata } from "next";
import { mutigReiten } from "@/content/products";
import { CheckFlow } from "@/features/mutig/CheckFlow";
import { hasMutigReiten } from "@/lib/entitlements/server";

export const metadata: Metadata = {
  title: "Angst-Check · Mutig reiten",
  description: "Kostenloser Angst-Check für Reiterinnen: Finde in 3 Minuten deinen Mut-Typ und deine ersten Schritte.",
};
export const dynamic = "force-dynamic";

export default async function Page() {
  return <CheckFlow mode="free" owned={await hasMutigReiten()} checkoutUrl={mutigReiten.checkoutUrl} price={mutigReiten.price} />;
}
