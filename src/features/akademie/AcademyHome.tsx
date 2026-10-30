"use client";

import Link from "@/i18n/Link";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { allLessons } from "@/content/akademie";
import { academyVideos } from "@/content/akademie/videos";
import {
  academyPaths,
  modulesIn,
  academyOrder,
  moduleHref,
  moduleLessons,
  pathInfo,
  type AcademyModule,
} from "@/content/akademie/module";
import { academyCheckoutUrl, academyPriceLabel, regionalCheckoutUrl } from "@/content/products";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/locale";
import { VisualView } from "@/engine/VisualView";
import { progressActions, useProgress } from "@/lib/progress/store";
import type { AcademyPath, Progress } from "@/lib/progress/types";
import { LessonVideo } from "./LessonVideo";
import { lessonDone, lessonHref } from "./progress";
import styles from "./academy.module.css";

/* ---------- Hilfen ---------- */

const grown = (path: AcademyPath | null | undefined) => path === "teen" || path === "adult";

/** Nächste sinnvolle Lektion: erste offene, die auf diesem Gerät auch geöffnet werden darf */
export function nextAcademyLesson(p: Progress, unlocked: boolean, locale: Locale = "de") {
  const order = academyOrder(locale).filter((x) => unlocked || x.trial);
  return order.find((x) => !lessonDone(p, x.lesson)) ?? null;
}

/* ---------- /akademie ---------- */

export function AcademyHome({ unlocked }: { unlocked: boolean }) {
  const locale = useLocale();
  const en = locale === "en";
  const academyModules = modulesIn(locale);
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

  const info = pathInfo(path, locale)!;
  const total = allLessons().length;
  const done = allLessons().filter((l) => lessonDone(progress, l)).length;
  const next = nextAcademyLesson(progress, unlocked, locale);
  const isGrown = grown(path);

  return (
    <div className="page">
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="ak-title">
          <p className={styles.eyebrow}>{en ? "The Riding Academy" : "Die Reitakademie"} · {info.title}</p>
          <h1 id="ak-title" className={styles.heroTitle}>
            {en
              ? isGrown
                ? "Understand riding – step by step."
                : "Learn to ride with Lea, Mila and Ben."
              : isGrown
                ? "Reiten verstehen – Schritt für Schritt."
                : "Reiten lernen mit Lea, Mila und Ben."}
          </h1>
          <p className={styles.heroText}>
            {en
              ? isGrown
                ? `${academyModules.length} modules – from your first contact with a horse to school figures, the aids, dressage and jumping. With clear explanations, exercises and quizzes.`
                : `${academyModules.length} modules all about horses: understanding them, caring for them, riding them – all the way to dressage and jumping. With pictures, games and quizzes.`
              : isGrown
              ? `${academyModules.length} Module vom ersten Kontakt mit dem Pferd über Bahnfiguren und Hilfen bis zu Dressur und Springen – mit Erklärungen, Lernvideos, Übungen und Quiz.`
              : `${academyModules.length} Module rund ums Pferd: verstehen, pflegen, reiten – bis zu Dressur und Springen. Mit Bildern, Spielen und Quiz.`}
          </p>
          {done > 0 && (
            <div className={styles.progress}>
              <span className={styles.progressLabel}>
                <span>{en ? "Your progress" : "Dein Fortschritt"}</span>
                <span>
                  {done} {en ? "of" : "von"} {total} {en ? "lessons" : "Lektionen"}
                </span>
              </span>
              <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={en ? "Progress in the Riding Academy" : "Fortschritt in der Reitakademie"}>
                <span style={{ width: `${(done / total) * 100}%` }} />
              </div>
            </div>
          )}
          <div className={styles.heroRow}>
            {next && (
              <Link href={lessonHref(next.world, next.lesson)} className={styles.cta}>
                <Icon name="play" />
                <span>
                  {en
                    ? done > 0
                      ? "Continue learning"
                      : unlocked
                        ? "Start the first lesson"
                        : "Start a free lesson"
                    : done > 0
                      ? "Weiterlernen"
                      : unlocked
                        ? "Erste Lektion starten"
                        : "Probelektion starten"}
                  <span className={styles.ctaSub}>{next.lesson.title}</span>
                </span>
              </Link>
            )}
            <button type="button" className={styles.pathChip} onClick={() => setPicking(true)}>
              {en ? "Track" : "Lernweg"}: {info.title} <span>{en ? "change" : "ändern"}</span>
            </button>
          </div>
        </section>

        {unlocked && (
          <p className={styles.owned}>
            <Icon name="check" />
            {en ? "The whole Riding Academy is unlocked on this device." : "Die ganze Reitakademie ist auf diesem Gerät freigeschaltet."}
          </p>
        )}

        <section aria-labelledby="ak-modules">
          <div className={styles.sectionHead}>
            <h2 id="ak-modules" className={styles.sectionTitle}>
              {en ? `The ${academyModules.length} modules` : `Die ${academyModules.length} Module`}
            </h2>
            {!unlocked && <span className={styles.sectionMeta}>{en ? "One free sample lesson per module" : "Je Modul eine Probelektion gratis"}</span>}
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

        {/* Die Lernvideos sind deutsch vertont – in der englischen Version vorerst ausgeblendet */}
        {!en && <section aria-labelledby="ak-videos">
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
        </section>}

        <p className={styles.note}>
          <Icon name="star" />
          <span>
            {en
              ? "The Riding Academy teaches knowledge about horses and riding. Riding itself is learned in lessons with a qualified instructor. Your progress is saved only on this device."
              : "Die Reitakademie vermittelt Wissen rund ums Pferd und ums Reiten. Das Reiten selbst lernt man im Unterricht bei einer qualifizierten Reitlehrkraft. Der Lernfortschritt wird nur auf diesem Gerät gespeichert."}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- Modulkarte ---------- */

function ModuleCard({ module: m, unlocked, path }: { module: AcademyModule; unlocked: boolean; path: AcademyPath }) {
  const locale = useLocale();
  const en = locale === "en";
  const progress = useProgress();
  const lessons = moduleLessons(m, locale);
  const done = lessons.filter((x) => lessonDone(progress, x.lesson)).length;
  const soon = m.topics.filter((t) => t.lessons.length === 0 && !t.games && !t.link).length;
  return (
    <Link href={moduleHref(m)} className={styles.module} aria-label={en ? `Module ${m.number}: ${m.title}, ${done} of ${lessons.length} lessons done` : `Modul ${m.number}: ${m.title}, ${done} von ${lessons.length} Lektionen geschafft`}>
      <div className={styles.moduleArt} style={{ background: m.tint }} aria-hidden>
        <VisualView v={m.cover} decorative />
        <span className={styles.moduleNum}>{m.number}</span>
      </div>
      <div className={styles.moduleBody}>
        <span className={styles.moduleTitle}>{m.title}</span>
        <span className={styles.moduleTeaser}>{grown(path) ? m.teaser.grown : m.teaser.kids}</span>
        <span className={styles.moduleMeta}>
          <span>{lessons.length} {en ? "lessons" : "Lektionen"}</span>
          {done > 0 ? (
            <span className={styles.miniBar} aria-hidden>
              <span style={{ width: `${(done / lessons.length) * 100}%` }} />
            </span>
          ) : !unlocked ? (
            <span className={`${styles.tag} ${styles.tagGold}`}>{en ? "1 free lesson" : "1 Probelektion gratis"}</span>
          ) : null}
          {soon > 0 && <span className={`${styles.tag} ${styles.tagMuted}`}>+ {soon} {en ? "coming soon" : "in Vorbereitung"}</span>}
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
  const locale = useLocale();
  const en = locale === "en";
  const kids = !grown(path);
  const price = academyPriceLabel(locale);
  const checkout = academyCheckoutUrl(locale);
  const modules = modulesIn(locale).length;
  const T = en
    ? {
        eyebrow: "One-time payment · no subscription",
        titleKids: "Unlock the whole Riding Academy",
        titleGrown: `Unlock the entire Riding Academy for a one-time ${price}.`,
        checks: [
          `All ${modules} modules with ${allLessons().length} interactive lessons – from the basics to dressage and jumping`,
          "Explanations with pictures, exercises and quizzes with feedback",
          "Final quiz, knowledge tests and badges",
          "Permanent access – every lesson can be repeated",
        ],
        askParents: "Ask your parents – they can unlock the Riding Academy for you.",
        toParents: "For parents",
        forParents: `For parents: ${price} one-time, no subscription.`,
        once: "one-time",
        buy: "Unlock now",
        code: "I've already bought it",
        small:
          "Prices are shown in your local currency at checkout. After buying, enter your order number and the email address you used for the order – the academy unlocks instantly. Parents buy for under-18s.",
      }
    : {
        eyebrow: "Einmalzahlung · kein Abo",
        titleKids: "Die ganze Reitakademie freischalten",
        titleGrown: `Schalte die gesamte Reitakademie für einmalig ${price} frei.`,
        checks: [
          `Alle ${modules} Module mit ${allLessons().length} interaktiven Lektionen – von den Grundlagen bis zu Dressur und Springen`,
          "6 animierte Lernvideos, Übungen und Quiz",
          "Abschlussquiz und Teilnahmezertifikat",
          "Dauerhafter Zugriff auf die enthaltenen Grundlagenmodule",
        ],
        askParents: "Frag deine Eltern – sie können die Reitakademie im Elternbereich freischalten.",
        toParents: "Zum Elternbereich",
        forParents: `Für Eltern: ${price} einmalig, kein Abo.`,
        once: "einmalig",
        buy: "Jetzt freischalten",
        code: "Code eingeben",
        small:
          "Nach dem Kauf kommt ein Freischaltcode per E-Mail. Den Code im Bereich „Code eingeben“ eintragen – fertig. Bei Minderjährigen kaufen die Eltern.",
      };
  return (
    <section className={styles.buy} aria-labelledby="ak-buy-title" id="ak-buy">
      <p className={styles.eyebrow}>{T.eyebrow}</p>
      <h2 id="ak-buy-title" className={styles.buyTitle}>
        {kids ? T.titleKids : T.titleGrown}
      </h2>
      {!compact && (
        <ul className={styles.checks}>
          {T.checks.map((c) => (
            <li key={c}>
              <Icon name="check" />
              {c}
            </li>
          ))}
        </ul>
      )}
      {kids ? (
        <>
          <p>{T.askParents}</p>
          <div className={styles.buyActions}>
            <Link href="/eltern#akademie" className={`${styles.cta} ${styles.ctaDark}`}>
              <Icon name="parents" />
              {T.toParents}
            </Link>
          </div>
          <p className={styles.small}>{T.forParents}</p>
        </>
      ) : (
        <>
          <p className={styles.buyPrice}>
            {price} <small>{T.once}</small>
          </p>
          <div className={styles.buyActions}>
            {checkout && (
              <a
                href={checkout}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${styles.ctaDark}`}
                // Englisch: USA-Shop (US-Dollar) oder UK-Shop (Pfund) je nach Gerät
                onClick={(e) => en && (e.currentTarget.href = regionalCheckoutUrl())}
              >
                <Icon name="external" />
                {T.buy}
              </a>
            )}
            <Link href="/eltern#akademie" className={`${styles.cta} ${styles.ctaGhost}`}>
              {T.code}
            </Link>
          </div>
          <p className={styles.small}>{T.small}</p>
        </>
      )}
    </section>
  );
}

/* ---------- Lernweg-Wahl ---------- */

export function PathPicker({ current, onDone }: { current: AcademyPath | null; onDone?: () => void }) {
  const locale = useLocale();
  const en = locale === "en";
  return (
    <section className={styles.picker} aria-labelledby="path-title">
      <div className={styles.pickerHead}>
        <p className={styles.eyebrow}>{en ? "The Riding Academy" : "Die Reitakademie"}</p>
        <h1 id="path-title" className={styles.pickerTitle}>
          {en ? "Choose your learning track" : "Wähle deinen Lernweg"}
        </h1>
        <p className={styles.small}>
          {en
            ? "The same expert knowledge, explained to suit you. You can switch tracks at any time."
            : "Gleiches Fachwissen, passend erklärt. Du kannst den Lernweg jederzeit wechseln."}
        </p>
      </div>
      <ul className={styles.paths}>
        {academyPaths(locale).map((p) => (
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
        {en
          ? "Only your choice of track is saved – no name, no age, and only on this device."
          : "Gespeichert wird nur die Wahl des Lernwegs – kein Name, kein Alter, nur auf diesem Gerät."}
      </p>
    </section>
  );
}
