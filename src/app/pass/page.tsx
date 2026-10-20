import type { Metadata } from "next";
import { AdventurePass } from "@/features/pass/AdventurePass";
import { getOwnedAdventures } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Abenteuerpass" };

export default async function Page() {
  return <AdventurePass owned={await getOwnedAdventures()} />;
}
