"use client";

import Link from "@/i18n/Link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  areaHref,
  exerciseHref,
  getAreaInfo,
  isTrialExercise,
  riderLabCatalog,
  riderLabHref,
  RIDER_LAB_SUB,
  RIDER_LAB_TITLE,
  type RiderLabAreaInfo,
} from "@/content/riderlab/katalog";
import { progressActions, useProgress } from "@/lib/progress/store";
import type { Progress } from "@/lib/progress/types";
import { AcademyBuyBox } from "@/features/akademie/AcademyHome";
import { ExerciseAnimation, useClock } from "./ExerciseAnimation";
import { FigureScene, C } from "./Figure";
import { GROUND, loopLength, poseAt } from "./kinematics";
import { areaDoneCount, exerciseCount, exerciseDone, labDoneCount } from "./progress";
import { Trainer } from "./Trainer";
import type { Animation, Exercise } from "./types";
import ak from "@/features/akademie/academy.module.css";
import styles from "./riderlab.module.css";

const TOTAL = riderLabCatalog.reduce((n, a) => n + a.exercises.length, 0);

/** Nächste offene Übung, die auf diesem Gerät geöffnet werden darf */
function nextExercise(p: Progress, unlocked: boolean) {
  for (const a of riderLabCatalog)
    for (const e of a.exercises) if ((unlocked || isTrialExercise(a, e.id)) && !exerciseDone(p, e.id)) return { area: a, ex: e };
  return null;
}

/** Kleine, laufende Vorschau ohne Bedienelemente (für Karten) */
export function AnimThumb({ anim }: { anim: Animation }) {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const [t] = useClock(!still);
  const T = loopLength(anim.frames);
  const { pose } = poseAt(anim.frames, t, anim.view === "front" ? "front" : "side");
  return (
    <svg viewBox="40 20 280 230" aria-hidden className={styles.thumb}>
      <rect x="0" y="0" width="360" height={GROUND} fill="transparent" />
      <path d={`M0 ${GROUND} H360`} stroke={C.sandDeep} strokeWidth="2" />
      <FigureScene view={anim.view} pose={pose} props={anim.props} t={T > 0 ? t % T : 0} />
    </svg>
  );
}

function Safety() {
  return (
    <aside className={styles.safety} aria-label="Sicherheit">
      <Icon name="star" />
      <p>
        <strong>Sicher üben:</strong> Bewege dich nur im angenehmen Bereich und brich die Übung bei Schmerzen ab. Kinder üben nur altersgerecht und mit einem Erwachsenen.
        Die Übungen für zu Hause ersetzen keinen Reitunterricht und keine ärztliche oder physiotherapeutische Beratung.
      </p>
    </aside>
  );
}

/* ---------- /akademie/rider-lab ---------- */

export function RiderLabHome({ unlocked, previews }: { unlocked: boolean; previews: Record<string, Animation> }) {
  const progress = useProgress();
  const done = labDoneCount(progress, riderLabCatalog);
  const next = nextExercise(progress, unlocked);
  return (
    <div className="page">
      <PageHeader title={RIDER_LAB_TITLE} backHref="/akademie" backLabel="Zurück zur Reitakademie" />
      <div className={ak.page}>
        <section className={ak.hero} aria-labelledby="rl-title">
          <p className={ak.eyebrow}>Reitakademie · Rider Lab</p>
          <h1 id="rl-title" className={ak.heroTitle}>
            {RIDER_LAB_SUB}
          </h1>
          <p className={ak.heroText}>
            Viele Sitzprobleme haben ihre Ursache nicht im Sattel, sondern im Körper: eine feste Hüfte, ein steifes Sprunggelenk, fehlende Balance. Im Rider Lab trainierst du
            Beweglichkeit, Balance und Koordination zu Hause – {TOTAL} animierte Übungen in {riderLabCatalog.length} Bereichen, mit Timer und Wiederholungszähler.
          </p>
          <div className={ak.progress}>
            <span className={ak.progressLabel}>
              <span>Dein Fortschritt</span>
              <span>
                {done} von {TOTAL} Übungen
              </span>
            </span>
            <div className={ak.bar} role="progressbar" aria-valuemin={0} aria-valuemax={TOTAL} aria-valuenow={done} aria-label="Fortschritt im Rider Lab">
              <span style={{ width: `${(done / TOTAL) * 100}%` }} />
            </div>
          </div>
          <div className={ak.heroRow}>
            {next && (
              <Link href={exerciseHref(next.area, next.ex)} className={ak.cta}>
                <Icon name="play" />
                <span>
                  {done > 0 ? "Weiter trainieren" : unlocked ? "Erste Übung starten" : "Probeübung starten"}
                  <span className={ak.ctaSub}>{next.ex.title}</span>
                </span>
              </Link>
            )}
          </div>
        </section>

        <section aria-labelledby="rl-areas">
          <div className={ak.sectionHead}>
            <h2 id="rl-areas" className={ak.sectionTitle}>
              Die {riderLabCatalog.length} Trainingsbereiche
            </h2>
            {!unlocked && <span className={ak.sectionMeta}>Je Bereich eine Probeübung gratis</span>}
          </div>
          <ul className={ak.modules}>
            {riderLabCatalog.map((a, i) => (
              <li key={a.id} style={{ animationDelay: `${i * 60}ms` }}>
                <AreaCard area={a} unlocked={unlocked} preview={previews[a.slug]} />
              </li>
            ))}
          </ul>
        </section>

        <Safety />
        {!unlocked && <AcademyBuyBox path={progress.settings.academyPath} compact />}
      </div>
    </div>
  );
}

function AreaCard({ area: a, unlocked, preview }: { area: RiderLabAreaInfo; unlocked: boolean; preview?: Animation }) {
  const progress = useProgress();
  const done = areaDoneCount(progress, a);
  return (
    <Link href={areaHref(a)} className={ak.module} aria-label={`Bereich ${a.number}: ${a.title}, ${done} von ${a.exercises.length} Übungen geschafft`}>
      <div className={ak.moduleArt} style={{ background: a.tint }} aria-hidden>
        {preview && <AnimThumb anim={preview} />}
        <span className={ak.moduleNum}>{a.number}</span>
      </div>
      <div className={ak.moduleBody}>
        <span className={ak.moduleTitle}>{a.title}</span>
        <span className={ak.moduleTeaser}>{a.problem}</span>
        <span className={ak.moduleMeta}>
          <span>{a.exercises.length} Übungen</span>
          {done > 0 ? (
            <span className={ak.miniBar} aria-hidden>
              <span style={{ width: `${(done / a.exercises.length) * 100}%` }} />
            </span>
          ) : !unlocked ? (
            <span className={`${ak.tag} ${ak.tagGold}`}>1 Probeübung gratis</span>
          ) : null}
        </span>
      </div>
    </Link>
  );
}

/* ---------- /akademie/rider-lab/[bereich] ---------- */

export function RiderLabArea({ slug, unlocked, preview }: { slug: string; unlocked: boolean; preview?: Animation }) {
  const progress = useProgress();
  const a = getAreaInfo(slug);
  if (!a) return null;
  const done = areaDoneCount(progress, a);
  const open = (id: string) => unlocked || isTrialExercise(a, id);
  const next = a.exercises.find((e) => open(e.id) && !exerciseDone(progress, e.id));
  return (
    <div className="page">
      <PageHeader title={a.title} backHref={riderLabHref} backLabel="Zurück zum Rider Lab" />
      <div className={ak.page}>
        <section className={`${ak.moduleHead} ${styles.areaHead}`} style={{ background: a.tint }}>
          <div>
            <p className={ak.eyebrow}>
              Rider Lab · Bereich {a.number} von {riderLabCatalog.length}
            </p>
            <p className={ak.moduleHeadTitle}>{a.problem}</p>
            <p className={styles.areaIntro}>{a.intro}</p>
            <p className={ak.small}>
              {done} von {a.exercises.length} Übungen geschafft
              {!unlocked && " · die erste Übung ist kostenlos"}
            </p>
          </div>
          {preview && (
            <div className={styles.areaArt} aria-hidden>
              <AnimThumb anim={preview} />
            </div>
          )}
        </section>

        <ul className={ak.rows}>
          {a.exercises.map((e) => {
            const isDone = exerciseDone(progress, e.id);
            const isOpen = open(e.id);
            const isNext = next?.id === e.id;
            return (
              <li key={e.id}>
                <Link
                  href={exerciseHref(a, e)}
                  className={`${ak.row} ${isNext ? ak.rowNext : ""} ${!isOpen ? ak.rowLocked : ""}`}
                  aria-label={`Übung ${e.number}: ${e.title}${isDone ? ", geschafft" : ""}${!isOpen ? ", in der Reitakademie" : ""}`}
                >
                  <span className={`${ak.rowIcon} ${isDone ? ak.rowIconDone : ""}`} aria-hidden>
                    <Icon name={isDone ? "check" : isOpen ? "play" : "lock"} />
                  </span>
                  <span>
                    <span className={ak.rowTitle}>
                      {e.number}. {e.title}
                    </span>
                    <span className={ak.rowMeta}>
                      {e.doseLabel}
                      {" · "}
                      {isTrialExercise(a, e.id) && !unlocked
                        ? "Probeübung · kostenlos"
                        : isDone
                          ? `${exerciseCount(progress, e.id)}× trainiert`
                          : isNext
                            ? "als Nächstes"
                            : isOpen
                              ? "Übung"
                              : "in der Reitakademie"}
                    </span>
                  </span>
                  <Icon name="back" className={ak.rowGo} aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>

        <Safety />
        {!unlocked && <AcademyBuyBox path={progress.settings.academyPath} compact />}
      </div>
    </div>
  );
}

/* ---------- /akademie/rider-lab/[bereich]/[uebung] ---------- */

export function RiderLabExercise({ areaSlug, ex, unlocked }: { areaSlug: string; ex: Exercise; unlocked: boolean }) {
  const progress = useProgress();
  const a = getAreaInfo(areaSlug)!;
  const done = exerciseDone(progress, ex.id);
  const [justDone, setJustDone] = useState(false);
  const href = exerciseHref(a, ex);
  useEffect(() => {
    progressActions.setLast({ href, title: ex.title, area: "Rider Lab" });
  }, [href, ex.title]);

  const pos = a.exercises.findIndex((e) => e.id === ex.id);
  const following = a.exercises[pos + 1];
  const nextArea = riderLabCatalog[riderLabCatalog.findIndex((x) => x.id === a.id) + 1];
  const next = following
    ? unlocked
      ? { href: exerciseHref(a, following), label: `Nächste Übung: ${following.title}` }
      : { href: "/akademie#ak-buy", label: "Alle Übungen freischalten" }
    : nextArea
      ? { href: areaHref(nextArea), label: `Weiter zum Bereich „${nextArea.title}“` }
      : { href: riderLabHref, label: "Zurück zum Rider Lab" };
  const T = loopLength(ex.anim.frames);
  const secondsPerRep = T / (ex.anim.repsPerLoop ?? 1);

  return (
    <div className="page">
      <PageHeader title={ex.title} backHref={areaHref(a)} backLabel={`Zurück zu „${a.title}“`} />
      <div className={styles.exercise}>
        {/* A · Titel und Trainingsziel */}
        <header className={styles.exHead}>
          <p className={ak.eyebrow}>
            Rider Lab · {a.title} · Übung {ex.number} von {TOTAL}
          </p>
          <p className={styles.exGoal}>{ex.goal}</p>
          <p className={styles.exDose}>
            <span className={`${ak.tag} ${ak.tagGold}`}>{ex.doseLabel}</span>
            {done && (
              <span className={`${ak.tag}`}>
                <Icon name="check" /> {exerciseCount(progress, ex.id)}× trainiert
              </span>
            )}
          </p>
        </header>

        <div className={styles.exGrid}>
          {/* B · Animierte Demonstration */}
          <div className={styles.exStage}>
            <ExerciseAnimation anim={ex.anim} title={ex.title} />
            {ex.viewNote && <p className={styles.viewNote}>{ex.viewNote}</p>}
          </div>

          <div className={styles.exText}>
            {/* C · Schritt für Schritt */}
            <section className={styles.block} aria-labelledby="rl-steps">
              <h2 id="rl-steps" className={styles.blockTitle}>
                So geht&apos;s
              </h2>
              <ol className={styles.steps}>
                {ex.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              {ex.easier && (
                <p className={styles.easier}>
                  <strong>Leichter:</strong> {ex.easier}
                </p>
              )}
              {ex.caution && (
                <p className={styles.caution}>
                  <strong>Achtung:</strong> {ex.caution}
                </p>
              )}
            </section>

            {/* D · Interaktiver Trainingsmodus */}
            <Trainer
              dose={ex.dose}
              secondsPerRep={secondsPerRep}
              done={done}
              onComplete={() => {
                progressActions.completeGame(ex.id);
                setJustDone(true);
              }}
            />

            {/* G · Fortschritt */}
            {justDone && (
              <section className={styles.doneBox} aria-live="polite">
                <p className={styles.doneTitle}>
                  <Icon name="check" /> Eingetragen – gespeichert auf diesem Gerät.
                </p>
                <p>Halte im Reitertagebuch fest, wie sich dein Sitz in der nächsten Reitstunde anfühlt.</p>
                <div className={styles.doneRow}>
                  <Link href="/tagebuch" className={`${ak.cta} ${ak.ctaDark}`}>
                    <Icon name="diary" /> Zum Reitertagebuch
                  </Link>
                  <Link href={next.href} className={`${ak.cta} ${ak.ctaGhost}`}>
                    {next.label}
                  </Link>
                </div>
              </section>
            )}

            {/* E · Aha-Moment */}
            <section className={`${styles.block} ${styles.aha}`} aria-labelledby="rl-aha">
              <h2 id="rl-aha" className={styles.blockTitle}>
                Aha!
              </h2>
              <p>{ex.aha}</p>
            </section>

            {/* F · Transfer in den Sattel */}
            <section className={`${styles.block} ${styles.transfer}`} aria-labelledby="rl-transfer">
              <h2 id="rl-transfer" className={styles.blockTitle}>
                In der nächsten Reitstunde
              </h2>
              <p>{ex.transfer}</p>
            </section>

            <Safety />

            {!justDone && (
              <Link href={next.href} className={ak.row}>
                <span className={ak.rowIcon} aria-hidden>
                  <Icon name="play" />
                </span>
                <span>
                  <span className={ak.rowTitle}>{next.label}</span>
                </span>
                <Icon name="back" className={ak.rowGo} aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- gesperrt ---------- */

export function RiderLabLocked({ areaSlug, title }: { areaSlug: string; title: string }) {
  const progress = useProgress();
  const a = getAreaInfo(areaSlug);
  const trial = a?.exercises[0];
  return (
    <div className="page">
      <PageHeader title={title} backHref={a ? areaHref(a) : riderLabHref} backLabel={a ? `Zurück zu „${a.title}“` : "Zurück zum Rider Lab"} />
      <div className={ak.page}>
        <p className={ak.note}>
          <Icon name="lock" />
          <span>Diese Übung gehört zur Reitakademie. Die erste Übung jedes Rider-Lab-Bereichs kannst du kostenlos ausprobieren.</span>
        </p>
        {a && trial && (
          <Link href={exerciseHref(a, trial)} className={ak.row}>
            <span className={ak.rowIcon} aria-hidden>
              <Icon name="play" />
            </span>
            <span>
              <span className={ak.rowTitle}>{trial.title}</span>
              <span className={ak.rowMeta}>Probeübung · kostenlos</span>
            </span>
            <Icon name="back" className={ak.rowGo} aria-hidden />
          </Link>
        )}
        <AcademyBuyBox path={progress.settings.academyPath} />
      </div>
    </div>
  );
}
