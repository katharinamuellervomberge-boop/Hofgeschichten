import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { ReleaseArt } from "@/components/illustrations/ReleaseArt";
import type { Release } from "@/content/membership";
import { site } from "@/content/site";
import styles from "./hofjahr.module.css";

export type WeekState = "open" | "upcoming" | "locked";

const shortDate = (r: Release) => r.dateLabel.replace(/ 2026$/, "");

/** Karte einer Freitagsfolge – für Kinder (ohne Preis) und auf der Verkaufsseite. */
export function WeekCard({ release, state, audience = "kids" }: { release: Release; state: WeekState; audience?: "kids" | "parents" }) {
  const statusText =
    state === "open"
      ? "Jetzt spielen"
      : audience === "parents"
        ? `Ab diesem Freitag verfügbar: ${shortDate(release)}`
        : state === "upcoming"
          ? `Ab ${shortDate(release)} für dich da`
          : `Ab ${shortDate(release)} – für ${site.clubName}-Mitglieder`;

  const inner = (
    <>
      <div className={styles.weekArt}>
        <ReleaseArt art={release.art} />
        <span className={styles.weekDate}>{shortDate(release)}</span>
      </div>
      <div className={styles.weekBody}>
        <div className={styles.weekMeta}>
          <span className={styles.cat}>{release.category}</span>
          <span className={styles.premiumMark}>
            <Icon name="star" />
            Premium
          </span>
        </div>
        <h3 className={styles.weekTitle}>{release.title}</h3>
        <p className={styles.weekText}>{audience === "parents" ? release.description : release.teaser}</p>
        {audience === "parents" && (
          <ul className={styles.weekList}>
            {release.contents.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        <p className={styles.weekStatus}>
          {state === "open" ? <Icon name="play" width={18} height={18} style={{ display: "inline", verticalAlign: "-3px" }} /> : null} {statusText}
        </p>
      </div>
    </>
  );

  if (audience === "parents") return <article className={styles.week}>{inner}</article>;
  return (
    <Link href={`/hofjahr/${release.slug}`} className={`${styles.week} ${state === "open" ? styles.weekOpen : ""}`}>
      {inner}
    </Link>
  );
}
