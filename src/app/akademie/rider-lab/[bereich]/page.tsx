import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAreaInfo, riderLabCatalog } from "@/content/riderlab/katalog";
import { riderLabAreas } from "@/content/riderlab/uebungen.server";
import { RiderLabArea } from "@/features/riderlab/RiderLabScreens";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { bereich: string };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return riderLabCatalog.map((a) => ({ bereich: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { bereich } = await params;
  const a = getAreaInfo(bereich);
  return { title: a ? `${a.title} · Rider Lab` : "Rider Lab" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { bereich } = await params;
  const area = riderLabAreas.find((a) => a.slug === bereich);
  if (!area) notFound();
  return <RiderLabArea slug={bereich} unlocked={await hasGrosseAkademie()} preview={area.exercises[0].anim} />;
}
