import type { Metadata } from "next";
import { ACADEMY_TITLE } from "@/content/akademie";
import { AcademyHome } from "@/features/akademie/AcademyHome";
import { getLocale } from "@/i18n/server";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLocale()) === "en" ? "The Riding Academy – online riding course" : ACADEMY_TITLE };
}
export const dynamic = "force-dynamic";

export default async function Page() {
  return <AcademyHome unlocked={await hasGrosseAkademie()} />;
}
