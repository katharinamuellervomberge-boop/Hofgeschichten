import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { UNIT_COUNT, isUnitReleased, releaseLabel, unitReleaseDate, unitTitle } from "@/content/mutig/katalog";
import { WEG_LESSONS, loadUnit } from "@/content/mutig/einheiten.server";
import { TOOLS } from "@/content/mutig/werkzeuge.server";
import { UnitFlow } from "@/features/mutig/UnitFlow";
import { hasMutigReiten } from "@/lib/entitlements/server";
import styles from "@/features/mutig/mutig.module.css";
import Link from "@/i18n/Link";

type Params = { n: string };
export const dynamic = "force-dynamic";

const parse = (s: string) => (/^\d{1,2}$/.test(s) ? Number(s) : NaN);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const n = parse((await params).n);
  return { title: n >= 1 && n <= UNIT_COUNT ? `Tag ${n} · ${unitTitle(n)} · Mutig reiten` : "Mutig reiten" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const n = parse((await params).n);
  if (!(n >= 1 && n <= UNIT_COUNT)) notFound();
  // Inhalte kommen erst nach der Freischaltung in den Browser
  if (!(await hasMutigReiten())) redirect("/mutig-reiten");
  if (!isUnitReleased(n)) {
    return (
      <div className={styles.narrow}>
        <div className={styles.card}>
          <p className={styles.kicker}>Tag {n}</p>
          <h1 className={styles.h2}>{unitTitle(n)} erscheint am {releaseLabel(unitReleaseDate(n))}.</h1>
          <p className={styles.p}>Bis dahin: Arbeite an deiner Mut-Leiter weiter und wiederhole deine Werkzeuge.</p>
          <Link className={styles.btn} href="/mutig-reiten">Zur Übersicht</Link>
        </div>
      </div>
    );
  }
  const unit = loadUnit(n);
  if (!unit) notFound();
  const lesson = unit.weg ? WEG_LESSONS[unit.weg] ?? null : null;
  const tool = unit.werkzeug ? TOOLS.find((t) => t.id === unit.werkzeug) ?? null : null;
  return <UnitFlow unit={unit} title={unitTitle(n)} lesson={lesson} tool={tool} audioUrl={unit.audio ? `/api/mutig-audio/${n}` : null} />;
}
