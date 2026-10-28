"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { LegalLinks } from "@/components/layout/LegalPage";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { PageHeader } from "@/components/ui/PageHeader";
import { allLessons } from "@/content/akademie";
import { ACADEMY_PATHS, academyModules, moduleHref, moduleLessons } from "@/content/akademie/module";
import { publishedAdventures } from "@/content/adventures";
import { hofpost, membership as plan } from "@/content/membership";
import { grosseAkademie } from "@/content/products";
import { allStamps } from "@/content/stamps";
import { lessonDone } from "@/features/akademie/progress";
import type { MembershipStatus } from "@/lib/entitlements/server";
import { earnedStamps } from "@/lib/progress/stamps";
import { progressActions, useProgress } from "@/lib/progress/store";
import styles from "./profil.module.css";

type Props = { academy: boolean; membership: MembershipStatus; adventures: string[] };

/**
 * Profil (seit 28.10.2026): Lernweg, Lernfortschritt, Freischaltungen dieses Geräts,
 * die drei Produkte und Einstellungen. Es gibt bewusst kein Konto – alles gilt für dieses Gerät.
 * Käufe und Codes laufen weiter über den Elternbereich.
 */
export function ProfileScreen({ academy, membership, adventures }: Props) {
  const progress = useProgress();
  const total = allLessons().length;
  const done = allLessons().filter((l) => lessonDone(progress, l)).length;
  const stamps = earnedStamps(progress).size;
  const premiumCases = publishedAdventures.filter((a) => a.access === "premium");
  const ownedCases = premiumCases.filter((a) => adventures.includes(a.slug));
  const path = progress.settings.academyPath;

  return (
    <div className="page">
      <PageHeader title="Profil" />
      <div className={styles.stack}>
        <p className={styles.device}>
          <Icon name="star" />
          Kein Konto, keine Anmeldung: Fortschritt und Freischaltungen gelten für dieses Gerät.
        </p>

        {/* Lernweg */}
        <section className={styles.card} aria-labelledby="pr-path">
          <h2 id="pr-path" className={styles.h2}>
            Lernweg in der Reitakademie
          </h2>
          <div className={styles.pathRow} role="radiogroup" aria-label="Lernweg">
            {ACADEMY_PATHS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={path === p.id}
                className={`${styles.pathBtn} ${path === p.id ? styles.pathOn : ""}`}
                onClick={() => progressActions.setAcademyPath(p.id)}
              >
                <strong>{p.title.replace(" Academy", "")}</strong>
                <span>{p.ages}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Fortschritt */}
        <section className={styles.card} aria-labelledby="pr-progress">
          <div className={styles.head}>
            <h2 id="pr-progress" className={styles.h2}>
              Lernfortschritt
            </h2>
            <Link href="/pass" className={styles.more}>
              Abzeichen-Pass
            </Link>
          </div>
          <dl className={styles.stats}>
            <div>
              <dt>Lektionen</dt>
              <dd>
                {done}
                <small> / {total}</small>
              </dd>
            </div>
            <div>
              <dt>Abzeichen</dt>
              <dd>
                {stamps}
                <small> / {allStamps().length}</small>
              </dd>
            </div>
            <div>
              <dt>Spiele</dt>
              <dd>{Object.keys(progress.games).filter((k) => !k.startsWith("ra-w")).length}</dd>
            </div>
          </dl>
          <ul className={styles.modules}>
            {academyModules.map((m) => {
              const ls = moduleLessons(m);
              const d = ls.filter((x) => lessonDone(progress, x.lesson)).length;
              return (
                <li key={m.id}>
                  <Link href={moduleHref(m)} className={styles.moduleRow}>
                    <span>
                      {m.number}. {m.title}
                    </span>
                    <span className={styles.bar} aria-hidden>
                      <span style={{ width: `${(d / ls.length) * 100}%` }} />
                    </span>
                    <span className={styles.count}>
                      {d}/{ls.length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Freischaltungen */}
        <section className={styles.card} aria-labelledby="pr-unlocks">
          <h2 id="pr-unlocks" className={styles.h2}>
            Käufe &amp; Freischaltungen
          </h2>
          <ul className={styles.unlocks}>
            <li>
              <Icon name={academy ? "check" : "lock"} />
              <span>
                <strong>Reitakademie</strong>
                {academy ? "Freigeschaltet" : "Probelektionen offen"}
              </span>
            </li>
            <li>
              <Icon name={membership.active ? "check" : "lock"} />
              <span>
                <strong>Mitgliedschaft</strong>
                {membership.active ? `Aktiv bis ${new Date(membership.until).toLocaleDateString("de-DE")}` : "Nicht aktiv"}
              </span>
            </li>
            <li>
              <Icon name={ownedCases.length ? "check" : "lock"} />
              <span>
                <strong>Detektivfälle</strong>
                {ownedCases.length} von {premiumCases.length} freigeschaltet
              </span>
            </li>
          </ul>
          <Link href="/eltern#abenteuer" className={styles.parentLink}>
            <Icon name="parents" />
            Code eingeben &amp; Käufe verwalten (Elternbereich)
          </Link>
        </section>

        {/* Angebote – drei getrennte Produkte */}
        <section aria-labelledby="pr-shop">
          <h2 id="pr-shop" className={styles.h2}>
            Angebote
          </h2>
          <ul className={styles.products}>
            <li className={`${styles.product} ${styles.productMain}`}>
              <span className={styles.productKicker}>Einmalzahlung · kein Abo</span>
              <strong className={styles.productName}>Reitakademie</strong>
              <span className={styles.productPrice}>{grosseAkademie.price ?? "14,90 €"}</span>
              <span className={styles.productText}>Alle Module inkl. Dressur und Springen, dauerhafter Zugriff.</span>
              <Link href="/akademie" className={styles.productLink}>
                {academy ? "Zur Akademie" : "Ansehen"}
              </Link>
            </li>
            <li className={styles.product}>
              <span className={styles.productKicker}>Founder-Angebot 2026</span>
              <strong className={styles.productName}>Founder-Mitgliedschaft</strong>
              <span className={styles.productPrice}>
                {plan.price} <small>erstes Jahr</small>
              </span>
              <span className={styles.productText}>Die digitale Hofwelt mit wöchentlich neuen Inhalten.</span>
              <Link href="/mitgliedschaft" className={styles.productLink}>
                Ansehen
              </Link>
            </li>
            <li className={styles.product}>
              <span className={styles.productKicker}>Mit echter Post</span>
              <strong className={styles.productName}>Hofpost Premium</strong>
              <span className={styles.productPrice}>
                {hofpost.price} <small>erstes Jahr</small>
              </span>
              <span className={styles.productText}>Jahresmitgliedschaft plus {hofpost.letters} echte Briefe.</span>
              <Link href="/mitgliedschaft#hofpost" className={styles.productLink}>
                Ansehen
              </Link>
            </li>
          </ul>
        </section>

        {/* Einstellungen */}
        <section className={styles.card} aria-labelledby="pr-settings">
          <h2 id="pr-settings" className={styles.h2}>
            Einstellungen
          </h2>
          <p className={styles.label}>Schwierigkeit in Spielen und Abenteuern</p>
          <LevelSwitch />
          <Link href="/eltern#p-settings" className={styles.parentLink}>
            <Icon name="parents" />
            Weitere Einstellungen, Datenschutz und Zurücksetzen
          </Link>
        </section>

        <LegalLinks />
      </div>
    </div>
  );
}
