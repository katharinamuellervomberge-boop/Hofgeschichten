import type { Metadata } from "next";
import { HelpScreen } from "@/features/mutig/HelpScreen";
import { hasMutigReiten } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Hilfe · Mutig reiten" };
export const dynamic = "force-dynamic";

export default async function Page() {
  return <HelpScreen owned={await hasMutigReiten()} />;
}
