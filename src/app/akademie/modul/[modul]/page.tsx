import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { academyModules, getModule } from "@/content/akademie/module";
import { ModuleScreen } from "@/features/akademie/ModuleScreen";
import { getLocale } from "@/i18n/server";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

type Params = { modul: string };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return academyModules.map((m) => ({ modul: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { modul } = await params;
  const locale = await getLocale();
  return { title: getModule(modul, locale)?.title ?? (locale === "en" ? "Riding Academy" : "Reitakademie") };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { modul } = await params;
  if (!getModule(modul)) notFound();
  return <ModuleScreen slug={modul} unlocked={await hasGrosseAkademie()} />;
}
