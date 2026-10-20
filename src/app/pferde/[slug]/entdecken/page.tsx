import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHorse, horses } from "@/content/horses";
import { ExploreHorse } from "@/features/horses/ExploreHorse";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return horses.map((h) => ({ slug: h.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${getHorse(slug)?.name ?? "Pferd"} entdecken` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!getHorse(slug)) notFound();
  return <ExploreHorse slug={slug} />;
}
