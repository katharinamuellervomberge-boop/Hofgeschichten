import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TOOLS } from "@/content/mutig/werkzeuge.server";
import { ToolsScreen } from "@/features/mutig/ToolsScreen";
import { hasMutigReiten } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Werkzeuge · Mutig reiten" };
export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await hasMutigReiten())) redirect("/mutig-reiten");
  return <ToolsScreen tools={TOOLS} />;
}
