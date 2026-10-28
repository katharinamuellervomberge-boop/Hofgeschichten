"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { allLessons } from "@/content/akademie";
import { academyVideos } from "@/content/akademie/videos";
import {
  ACADEMY_PATHS,
  academyModules,
  academyOrder,
  moduleHref,
  moduleLessons,
  pathInfo,
  type AcademyModule,
} from "@/content/akademie/module";
import { grosseAkademie } from "@/content/products";
import { VisualView } from "@/engine/VisualView";
import { progressActions, useProgress } from "@/lib/progress/store";
import type { AcademyPath, Progress } from "@/lib/progress/types";
import { LessonVideo } from "./LessonVideo";
import { lessonDone, lessonHref } from "./progress";
import styles from "./academy.module.css";

/* ---------- Hilfen ---------- */

const grown = (path: AcademyPath | null | undefined) => path === "teen" || path === "adult";

/** Nächste sinnvolle Lektion: erste offene, die auf diesem Gerät auch geöffnet werden darf */
export function nextAcademyLesson(p: Progress, unlocked: boolean) {
  const order = academyOrder().filter((x) => unlocked || x.trial);
  return order.find((x) => !lessonDone(p, x.lesson)) ?? null;
}

/* ---------- /akademie ---------- */

export function AcademyHome({ unlocked }: { unlocked: boolean }) {
  const progress = useProgress();
  const path = progress.settings.academyPath;
  const [picking, setPicking] = useState(false);

  if (!path || picking) {
    return (
      <div className="page">
        <PathPicker current={path ?? null} onDone={() => setPicking(false)} />
      </div>
    );
  }

  const info = pathInfo(path)!;
  const total = allLessons().length;
  const done = allLessons().filter((l) => lessonDone(progress, l)).length;
  const next = nextAcademyLesson(progress, unlocked);
  const isGrown = grown(path);

  return (
    <div className="page">
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="ak-title">
          <p className={styles.eyebrow}>Die Reitakademie · {info.title}</p>
          <h1 id="ak-title" className={styles.heroTitle}>
            {isGrown ? "Reiten verstehen – Schritt für Schritt." : "Reiten lernen mit Lea, Mila und Ben."}
          </h1>
          <p className={styles.heroText}>
            {isGrown
              ? `${academyModules.length} Module vom ersten Kontakt mit dem Pferd über Bahnfiguren und Hilfen bis zu Dressur und Springen – mit Erklärungen, Lernvideos, Übungen und Quiz.`
              : `${academyModules.length} Module rund ums Pferd: verstehen, pflegen, reiten – bis zu Dressur und Springen. Mit Bildern, Spielen und Quiz.`}
          </p>
          {done > 0 && (
            <div className={styles.progress}>
              <span className={styles.progressLabel}>
                <span>Dein Fortschritt</span>
                <span>
                  {done} von {total} Lektionen
                </span>
              </span>
              <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label="Fortschritt in der Reitakademie">
                <span style={{ width: `${(done / total) * 100}%` }} />
              </div>
            </div>
          )}
          <div className={styles.heroRow}>
            {next && (
              <Link href={lessonHref(next.world, next.lesson)} className={styles.cta}>
                <Icon name="play" />
                <span>
                  {done > 0 ? "Weiterlernen" : unlocked ? "Erste Lektion starten" : "Probelektion starten"}
                  <span className={styles.ctaSub}>{next.lesson.title}</span>
                </span>
              </Link>
            )}
            <button type="button" className={styles.pathChip} onClick={() => setPicking(true)}>
              Lernweg: {info.title} <span>ändern</span>
            </button>
          </div>
        </section>

        {unlocked && (
          <p className={styles.owned}>
            <Icon name="check" />
            Die ganze Reitakademie ist auf diesem Gerät freigeschaltet.
          </p>
        )}

        <section aria-labelledby="ak-modules">
          <div className={styles.sectionHead}>
            <h2 id="ak-modules" className={styles.sectionTitle}>
              Die {academyModules.length} Module
            </h2>
            {!unlocked && <span className={styles.sectionMeta}>Je Modul eine Probelektion gratis</span>}
          </div>
          <ul className={styles.modules}>
            {academyModules.map((m, i) => (
              <li key={m.id} style={{ animationDelay: `${i * 60}ms` }}>
                <ModuleCard module={m} unlocked={unlocked} path={path} />
              </li>
            ))}
          </ul>
        </section>

        {!unlocked && <AcademyBuyBox path={path} />}

        <section aria-labelledby="ak-videos">
          <div className={styles.sectionHead}>
            <h2 id="ak-videos" className={styles.sectionTitle}>
              Lernvideos
            </h2>
            <span className={styles.sectionMeta}>{academyVideos.length} animierte Videos</span>
          </div>
          {unlocked ? (
            <ul className={styles.videos}>
              {academyVideos.map((v) => (
                <li key={v.slug}>
                  <LessonVideo video={v} compact />
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles.rows}>
              {academyVideos.map((v) => (
                <li key={v.slug}>
                  <span className={`${styles.row} ${styles.rowLocked}`}>
                    <span className={styles.rowIcon} aria-hidden>
                      <Icon name="lock" />
                    </span>
                    <span>
                      <span className={styles.rowTitle}>{v.title}</span>
                      <span className={styles.rowMeta}>{Math.round(v.seconds / 6) / 10} Min. · in der Reitakademie</span>
                    </span>
                    <span />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className={styles.note}>
          <Icon name="star" />
          <span>
            Die Reitakademie vermittelt Wissen rund ums Pferd und ums Reiten. Das Reiten selbst lernt man im Unterricht bei einer
            qualifizierten Reitlehrkraft. Der Lernfortschritt wird nur auf diesem Gerät gespeichert.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- Modulkarte ---------- */

function ModuleCard({ module: m, unlocked, path }: { module: AcademyModule; unlocked: boolean; path: AcademyPath }) {
  const progress = useProgress();
  const lessons = moduleLessons(m);
  const done = lessons.filter((x) => lessonDone(progress, x.lesson)).length;
  const soon = m.topics.filter((t) => t.lessons.length === 0 && !t.games && !t.link).length;
  return (
    <Link href={moduleHref(m)} className={styles.module} aria-label={`Modul ${m.number}: ${m.title}, ${done} von ${lessons.length} Lektionen geschafft`}>
      <div className={styles.moduleArt} style={{ background: m.tint }} aria-hidden>
        <VisualView v={m.cover} decorative />
        <span className={styles.moduleNum}>{m.number}</span>
      </div>
      <div className={styles.moduleBody}>
        <span className={styles.moduleTitle}>{m.title}</span>
        <span className={styles.moduleTeaser}>{grown(path) ? m.teaser.grown : m.teaser.kids}</span>
        <span className={styles.moduleMeta}>
          <span>{lessons.length} Lektionen</span>
          {done > 0 ? (
            <span className={styles.miniBar} aria-hidden>
              <span style={{ width: `${(done / lessons.length) * 100}%` }} />
            </span>
          ) : !unlocked ? (
            <span className={`${styles.tag} ${styles.tagGold}`}>1 Probelektion gratis</span>
          ) : null}
          {soon > 0 && <span className={`${styles.tag} ${styles.tagMuted}`}>+ {soon} in Vorbereitung</span>}
        </span>
      </div>
    </Link>
  );
}

/* ---------- Kaufbox ---------- */

/**
 * „Schalte die gesamte Reitakademie für einmalig 14,90 € frei.“
 * Kids-Lernweg: kein direkter Kauf-Link für Kinder, sondern der Weg über die Eltern.
 */
export function AcademyBuyBox({ path, compact }: { path: AcademyPath | null | undefined; compact?: boolean }) {
  const kids = !grown(path);
  const price = grosseAkademie.price ?? "14,90 €";
  return (
    <section className={styles.buy} aria-labelledby="ak-buy">
      <p className={styles.eyebrow}>Einmalzahlung · kein Abo</p>
      <h2 id="ak-buy" className={styles.buyTitle}>
        {kids ? "Die ganze Reitakademie freischalten" : `Schalte die gesamte Reitakademie für einmalig ${price} frei.`}
      </h2>
      {!compact && (
        <ul className={styles.checks}>
          <li>
            <Icon name="check" />
            Alle {academyModules.length} Module mit {allLessons().length} interaktiven Lektionen – von den Grundlagen bis zu Dressur und Springen
          </li>
          <li>
            <Icon name="check" />
            6 animierte Lernvideos, Übungen und Quiz
          </li>
          <li>
            <Icon name="check" />
            Abschlussquiz und Teilnahmezertifikat
          </li>
          <li>
            <Icon name="check" />
            Dauerhafter Zugriff auf die enthaltenen Grundlagenmodule
          </li>
        </ul>
      )}
      {kids ? (
        <>
          <p>Frag deine Eltern – sie können die Reitakademie im Elternbereich freischalten.</p>
          <div className={styles.buyActions}>
            <Link href="/eltern#akademie" className={`${styles.cta} ${styles.ctaDark}`}>
              <Icon name="parents" />
              Zum Elternbereich
            </Link>
          </div>
          <p className={styles.small}>Für Eltern: {price} einmalig, kein Abo.</p>
        </>
      ) : (
        <>
          <p className={styles.buyPrice}>
            {price} <small>einmalig</small>
          </p>
          <div className={styles.buyActions}>
            {grosseAkademie.checkoutUrl && (
              <a href={grosseAkademie.checkoutUrl} target="_blank" rel="noopener noreferrer" className={`${styles.cta} ${styles.ctaDark}`}>
                <Icon name="external" />
                Jetzt freischalten
              </a>
            )}
            <Link href="/eltern#akademie" className={`${styles.cta} ${styles.ctaGhost}`}>
              Code eingeben
            </Link>
          </div>
          <p className={styles.small}>
            Nach dem Kauf kommt ein Freischaltcode per E-Mail. Den Code im Bereich „Code eingeben“ eintragen – fertig. Bei
            Minderjährigen kaufen die Eltern.
          </p>
        </>
      )}
    </section>
  );
}

/* ---------- Lernweg-Wahl ---------- */

export function PathPicker({ current, onDone }: { current: AcademyPath | null; onDone?: () => void }) {
  return (
    <section className={styles.picker} aria-labelledby="path-title">
      <div className={styles.pickerHead}>
        <p className={styles.eyebrow}>Die Reitakademie</p>
        <h1 id="path-title" className={styles.pickerTitle}>
          Wähle deinen Lernweg
        </h1>
        <p className={styles.small}>Gleiches Fachwissen, passend erklärt. Du kannst den Lernweg jederzeit wechseln.</p>
      </div>
      <ul className={styles.paths}>
        {ACADEMY_PATHS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={`${styles.path} ${current === p.id ? styles.pathActive : ""}`}
              aria-pressed={current === p.id}
              onClick={() => {
                progressActions.setAcademyPath(p.id);
                onDone?.();
              }}
            >
              <span className={styles.pathMark} aria-hidden>
                <Icon name={p.id === "kids" ? "star" : p.id === "teen" ? "play" : "academy"} />
              </span>
              <span className={styles.pathKicker}>{p.ages}</span>
              <span className={styles.pathName}>{p.title}</span>
              <span className={styles.pathText}>{p.text}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.small} style={{ textAlign: "center" }}>
        Gespeichert wird nur die Wahl des Lernwegs – kein Name, kein Alter, nur auf diesem Gerät.
      </p>
    </section>
  );
}
