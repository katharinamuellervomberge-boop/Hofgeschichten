"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { useProgress } from "@/lib/progress/store";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./HomeScreen.module.css";

/** „Dort weitermachen, wo du aufgehört hast“ – nur bei gespeichertem Fortschritt auf diesem Gerät. */
export function ContinueCard() {
  const { last } = useProgress();
  const en = useLocale() === "en";
  if (!last) return null;
  // In der englischen Version nur Akademie-Ziele anbieten (Titel ist in der Sprache gespeichert, in der zuletzt gelernt wurde)
  if (en && !last.href.startsWith("/akademie")) return null;
  return (
    <Link href={last.href} className={styles.continue}>
      <span className={styles.continueIcon} aria-hidden>
        <Icon name="play" />
      </span>
      <span>
        <span className={styles.continueKicker}>{en ? "Pick up where you left off" : `Dort weitermachen, wo du aufgehört hast · ${last.area}`}</span>
        <span className={styles.continueTitle}>{last.title}</span>
      </span>
      <Icon name="back" className={styles.arrow} aria-hidden />
    </Link>
  );
}
