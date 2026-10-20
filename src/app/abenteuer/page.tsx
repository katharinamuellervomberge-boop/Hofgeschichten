import type { Metadata } from "next";
import { publishedAdventures } from "@/content/adventures";
import { AdventureList } from "@/features/adventure/AdventureList";
import { getOwnedAdventures } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Abenteuer" };

export default async function Page() {
  const owned = await getOwnedAdventures();
  return <AdventureList list={publishedAdventures} owned={owned} />;
}
