import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DiaryScreen } from "@/features/mutig/DiaryScreen";
import { hasMutigReiten } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Mut-Tagebuch · Mutig reiten" };
export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await hasMutigReiten())) redirect("/mutig-reiten");
  return <DiaryScreen />;
}
