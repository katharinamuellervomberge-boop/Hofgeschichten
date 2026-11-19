import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAreaInfo, riderLabCatalog } from "@/content/riderlab/katalog";
import { riderLabAreas } from "@/content/riderlab/uebungen.server";
import { RiderLabArea } from "@/features/riderlab/RiderLabScreens";
import { hasGrosseAkademie } from "@/lib/entitlements/server";
import { getLocale } from "@/i18n/server";
import { EnglishDom } from "@/i18n/EnglishDom";
import { riderLabText, translateRiderLabAnim } from "@/content/riderlab/en";

type Params = { bereich: string };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return riderLabCatalog.map((a) => ({ bereich: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { bereich } = await params;
  const a = getAreaInfo(bereich);
  const en = (await getLocale()) === "en";
  return { title: a ? `${en ? riderLabText(a.title) : a.title} · Rider Lab` : "Rider Lab" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { bereich } = await params;
  const area = riderLabAreas.find((a) => a.slug === bereich);
  if (!area) notFound();
  const en = (await getLocale()) === "en";
  const anim = area.exercises[0].anim;
  const page = <RiderLabArea slug={bereich} unlocked={await hasGrosseAkademie()} preview={en ? translateRiderLabAnim(anim) : anim} />;
  return en ? <EnglishDom pack="riderlab">{page}</EnglishDom> : page;
}
