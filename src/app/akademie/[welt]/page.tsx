import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorld } from "@/content/akademie";
import { AcademyLocked } from "@/features/akademie/AcademyLocked";
import { WorldScreen } from "@/features/akademie/WorldScreen";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { welt: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { welt } = await params;
  return { title: getWorld(welt)?.title ?? "Reitakademie" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { welt } = await params;
  const world = getWorld(welt);
  if (!world) notFound();
  if (world.tier === "gross" && !(await hasGrosseAkademie())) return <AcademyLocked title={world.title} />;
  return <WorldScreen slug={welt} />;
}
