import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorld, worlds } from "@/content/akademie";
import { WorldScreen } from "@/features/akademie/WorldScreen";

type Params = { welt: string };

export function generateStaticParams(): Params[] {
  return worlds.map((w) => ({ welt: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { welt } = await params;
  return { title: getWorld(welt)?.title ?? "Reitakademie" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { welt } = await params;
  if (!getWorld(welt)) notFound();
  return <WorldScreen slug={welt} />;
}
