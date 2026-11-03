import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/illustrations/Icons";
import { WinterStall } from "@/components/illustrations/advent/WinterStall";
import { adventNow, adventOffer, canPlayDoor } from "@/content/advent/access.server";
import { getDoor } from "@/content/advent/doors.server";
import { ADVENT, adventState, isDoorOpenByDate } from "@/content/advent/schedule";
import { AdventOffer } from "@/features/advent/AdventOffer";
import { DoorScreen } from "@/features/advent/DoorScreen";
import styles from "@/features/advent/advent.module.css";

export const dynamic = "force-dynamic";

type Params = { tag: string };
type Search = { testdatum?: string | string[] };

function dayOf(tag: string): number | null {
  const n = Number(tag);
  return /^\d{1,2}$/.test(tag) && n >= 1 && n <= ADVENT.doors ? n : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const day = dayOf((await params).tag);
  return { title: day ? `Türchen ${day} · Das Geheimnis des Winterhofs` : "Adventskalender" };
}

/**
 * Ein Türchen. Doppelte Prüfung auf dem Server, bevor Inhalte ausgeliefert werden:
 *  1. Datum (Europe/Berlin): Zukünftige Türchen bleiben zu.
 *  2. Berechtigung: Kauf, Paket oder Mitgliedschaft – außer bei freien Türchen.
 */
export default async function Page({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<Search> }) {
  const day = dayOf((await params).tag);
  if (!day) notFound();
  const { now, query } = adventNow((await searchParams).testdatum);

  if (!isDoorOpenByDate(day, now)) {
    const state = adventState(now);
    const wait = day - state.unlocked;
    return (
      <div className={styles.page}>
        <div className={styles.doorPage}>
          <div className={styles.topRow}>
            <Link href={`/adventskalender${query}`} className={styles.backLink}>
              <Icon name="back" />
              Kalender
            </Link>
          </div>
          <div className={styles.lockedBox}>
            <Icon name="lock" className={styles.bigLock} />
            <h1 className={styles.lockedTitle}>Türchen {day} ist noch zu</h1>
            <p className={styles.lockedText}>
              Es öffnet am {day}. Dezember{state.phase === "running" ? ` – noch ${wait} ${wait === 1 ? "Tag" : "Tage"}` : ""}. Bis dahin kannst du die offenen Türchen spielen und deinen Stall schmücken.
            </p>
            <div className={styles.center}>
              <Link href={`/adventskalender${query}`} className={styles.btn}>
                Zum Kalender
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!(await canPlayDoor(day))) {
    return (
      <div className={styles.page}>
        <div className={styles.doorPage}>
          <div className={styles.topRow}>
            <Link href={`/adventskalender${query}`} className={styles.backLink}>
              <Icon name="back" />
              Kalender
            </Link>
            <span className={styles.dateTag}>Türchen {day}</span>
          </div>
          <div className={styles.stage} style={{ marginBottom: "var(--space-4)" }}>
            <WinterStall label="Der Winterhof wartet auf dich" />
          </div>
          <div className={styles.lockedBox} style={{ marginBottom: "var(--space-4)" }}>
            <h1 className={styles.lockedTitle}>Hinter diesem Türchen geht das Geheimnis weiter</h1>
            <p className={styles.lockedText}>Frag deine Eltern: Mit dem ganzen Adventskalender kannst du alle 24 Türchen öffnen.</p>
          </div>
          <AdventOffer {...await adventOffer()} />
        </div>
      </div>
    );
  }

  const door = getDoor(day);
  if (!door) notFound();
  return <DoorScreen door={door} query={query} />;
}
