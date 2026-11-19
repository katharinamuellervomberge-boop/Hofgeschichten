import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LadderScreen } from "@/features/mutig/LadderScreen";
import { hasMutigReiten } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Mut-Leiter · Mutig reiten" };
export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await hasMutigReiten())) redirect("/mutig-reiten");
  return <LadderScreen />;
}
