import type { Metadata } from "next";
import { riderLabAreas } from "@/content/riderlab/uebungen.server";
import { RiderLabHome } from "@/features/riderlab/RiderLabScreens";
import { hasGrosseAkademie } from "@/lib/entitlements/server";
import { getLocale } from "@/i18n/server";
import { EnglishDom } from "@/i18n/EnglishDom";
import { translateRiderLabAnim } from "@/content/riderlab/en";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLocale()) === "en" ? "Rider Lab – Your body. Your seat. Your riding." : "Rider Lab – Dein Körper. Dein Sitz. Dein Reiten." };
}
export const dynamic = "force-dynamic";

/** Vorschau je Bereich: die Animation der Probeübung (ohnehin frei zugänglich) */
const previews = (en: boolean) => Object.fromEntries(riderLabAreas.map((a) => [a.slug, en ? translateRiderLabAnim(a.exercises[0].anim) : a.exercises[0].anim]));

export default async function Page() {
  const en = (await getLocale()) === "en";
  const page = <RiderLabHome unlocked={await hasGrosseAkademie()} previews={previews(en)} />;
  return en ? <EnglishDom pack="riderlab">{page}</EnglishDom> : page;
}
