import type { Metadata } from "next";
import { adventNow } from "@/content/advent/access.server";
import { CertificateScreen } from "@/features/advent/StallScreen";

export const metadata: Metadata = { title: "Weihnachtsurkunde · Das Geheimnis des Winterhofs" };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ testdatum?: string | string[] }> }) {
  const { query } = adventNow((await searchParams).testdatum);
  return <CertificateScreen query={query} />;
}
