import type { Metadata } from "next";
import { ACADEMY_TITLE } from "@/content/akademie";
import { AcademyHome } from "@/features/akademie/AcademyHome";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: ACADEMY_TITLE };
export const dynamic = "force-dynamic";

export default async function Page() {
  return <AcademyHome unlocked={await hasGrosseAkademie()} />;
}
