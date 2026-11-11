import type { Metadata } from "next";
import { CoachLocked } from "@/features/coach/CoachLocked";
import { MyCoach } from "@/features/coach/MyCoach";
import { demoProblem } from "@/content/coach/index";
import { hasDiary, hasRiderCoach } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Mein Coach · Rider Coach", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await hasRiderCoach())) return <CoachLocked info={demoProblem} />;
  return <MyCoach canSave={await hasDiary()} />;
}
