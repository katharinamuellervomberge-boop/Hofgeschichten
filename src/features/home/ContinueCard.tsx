"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { useProgress } from "@/lib/progress/store";
import styles from "./HomeScreen.module.css";

/** „Dort weitermachen, wo du aufgehört hast“ – nur bei gespeichertem Fortschritt auf diesem Gerät. */
export function ContinueCard() {
  const { last } = useProgress();
  if (!last) return null;
  return (
    <Link href={last.href} className={styles.continue}>
      <span className={styles.continueIcon} aria-hidden>
        <Icon name="play" />
      </span>
      <span>
        <span className={styles.continueKicker}>Dort weitermachen, wo du aufgehört hast · {last.area}</span>
        <span className={styles.continueTitle}>{last.title}</span>
      </span>
      <Icon name="back" className={styles.arrow} aria-hidden />
    </Link>
  );
}
