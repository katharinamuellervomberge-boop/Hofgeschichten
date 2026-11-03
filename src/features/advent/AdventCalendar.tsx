"use client";

import Link from "@/i18n/Link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { GoldHorseshoe } from "@/components/illustrations/advent/GoldHorseshoe";
import { WinterStall } from "@/components/illustrations/advent/WinterStall";
import { ADVENT_START_UTC, type AdventState } from "@/content/advent/schedule";
import { GAME_LABEL } from "@/content/advent/games";
import type { DoorSummary } from "@/content/advent/types";
import { adventskalender } from "@/content/products";
import { VisualView } from "@/engine/VisualView";
import { AdventOffer, type OfferInfo } from "./AdventOffer";
import { useAdvent } from "./DecorateGame";
import styles from "./advent.module.css";

/** Feste, gemischte Anordnung der Türchen (wie bei einem echten Adventskalender) */
const ORDER = [7, 15, 2, 22, 11, 4, 19, 1, 13, 9, 17, 5, 21, 3, 12, 20, 8, 16, 6, 23, 10, 18, 14, 24];

type Props = {
  state: AdventState;
  summaries: DoorSummary[];
  offer: OfferInfo;
  /** Testdatum für Vorschau-Umgebungen, wird an Links angehängt (sonst "") */
  query: string;
};

function Countdown({ initialDays }: { initialDays: number }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = Date.parse(ADVENT_START_UTC);
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);
  const days = left === null ? initialDays : Math.floor(left / 86_400_000);
  const hours = left === null ? 0 : Math.floor((left % 86_400_000) / 3_600_000);
  const mins = left === null ? 0 : Math.floor((left % 3_600_000) / 60_000);
  return (
    <div className={styles.countdown} role="timer" aria-live="off">
      <span className={styles.todayKicker}>Das erste Türchen öffnet am 1. Dezember</span>
      <div className={styles.countdownNums}>
        <span>
          <b>{days}</b>
          {days === 1 ? "Tag" : "Tage"}
        </span>
        <span>
          <b>{hours}</b>
          Std.
        </span>
        <span>
          <b>{mins}</b>
          Min.
        </span>
      </div>
    </div>
  );
}

export function AdventCalendar({ state, summaries, offer, query }: Props) {
  const advent = useAdvent();
  const [toast, setToast] = useState<string | null>(null);
  const done = (d: number) => Boolean(advent.doors[String(d)]);
  const shoes = Object.keys(advent.doors).length;
  const access = offer.access;
  const free = adventskalender.freeDoors;
  const nextOpen = Array.from({ length: state.unlocked }, (_, i) => i + 1).find((d) => !done(d));
  const lastPlayed = advent.last && advent.last.door <= state.unlocked && !done(advent.last.door) ? advent.last.door : null;
  const found = summaries.filter((s) => done(s.day));
  const todayOpen = state.today !== null && !done(state.today);
  // Wohin der große Knopf führt: angefangenes Türchen → heutiges → ältestes offenes → heutiges (nochmal)
  const focus = state.phase === "before" ? null : lastPlayed ?? (todayOpen ? state.today : nextOpen ?? state.today);
  const focusLabel = lastPlayed
    ? "Weiterspielen, wo du aufgehört hast"
    : todayOpen
      ? "Heutiges Türchen"
      : nextOpen
        ? "Dieses Türchen wartet noch auf dich"
        : "Heute schon geschafft – nochmal spielen?";

  const href = (d: number) => `/adventskalender/${d}${query}`;

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="Der Winterhof">
        <WinterStall decor={advent.stall} card={advent.card} className={styles.heroArt} />
      </section>
      <div className={styles.heroCard}>
        <p className={styles.kicker}>HOFgeschichten · Adventskalender 2026</p>
        <h1 className={styles.title}>Das Geheimnis des Winterhofs</h1>
        <p className={styles.subtitle}>{adventskalender.subtitle}</p>
        <div className={styles.ornament} aria-hidden>
          <GoldHorseshoe />
        </div>
      </div>

      <div className={styles.content}>
        {state.phase === "before" && <Countdown initialDays={state.daysUntilStart} />}

        {focus && (
          <Link href={href(focus)} className={styles.today}>
            <span className={styles.todayNum}>{focus}</span>
            <span className={styles.todayText}>
              <span className={styles.todayKicker}>{focusLabel}</span>
              <span className={styles.todayTitle}>{summaries.find((s) => s.day === focus)?.title}</span>
            </span>
            <Icon name="play" width={28} height={28} style={{ marginLeft: "auto", flex: "none" }} />
          </Link>
        )}

        <section className={styles.collection} aria-labelledby="hufeisen">
          <div className={styles.collectionHead}>
            <h2 id="hufeisen" className={styles.sectionTitle}>
              Deine goldenen Hufeisen
            </h2>
            <span className={styles.count}>{shoes} von 24</span>
          </div>
          <div className={styles.shoes} role="img" aria-label={`${shoes} von 24 goldenen Hufeisen gesammelt`}>
            {Array.from({ length: 24 }, (_, i) => (
              <GoldHorseshoe key={i} className={styles.shoe} empty={!done(i + 1)} number={i + 1} />
            ))}
          </div>
          <p className={styles.progressNote}>
            {state.phase === "before"
              ? "Für jedes gelöste Türchen bekommst du ein goldenes Hufeisen."
              : `${summaries.length} von 24 Türchen sind offen · ${Math.max(0, summaries.length - found.length)} davon warten noch auf dich.`}
          </p>
        </section>

        <section className={styles.wall} aria-labelledby="tuerchen">
          <h2 id="tuerchen" className={styles.wallTitle}>
            Die 24 Türchen
          </h2>
          <div className={styles.doors}>
            {ORDER.map((d) => {
              const openByDate = d <= state.unlocked;
              const isDone = done(d);
              const isToday = state.today === d;
              const needsAccess = openByDate && !access && !free.includes(d);
              const title = summaries.find((s) => s.day === d)?.title;
              const cls = [
                styles.door,
                d === 24 ? styles.doorBig : "",
                !openByDate ? styles.doorLocked : isDone ? styles.doorDone : styles.doorOpen,
                isToday && !isDone ? styles.doorToday : "",
              ].join(" ");
              const inner = (
                <>
                  <span className={styles.inside} aria-hidden>
                    {isDone && <GoldHorseshoe />}
                  </span>
                  <span className={styles.leaf} aria-hidden>
                    <span className={styles.plate}>{d}</span>
                  </span>
                  {(needsAccess || !openByDate) && <Icon name="lock" className={styles.lockMark} />}
                  {isToday && <span className={styles.todayRibbon}>Heute</span>}
                </>
              );
              if (!openByDate) {
                return (
                  <button
                    key={d}
                    type="button"
                    className={cls}
                    aria-label={`Türchen ${d} – öffnet am ${d}. Dezember`}
                    onClick={() =>
                      setToast(
                        state.phase === "before"
                          ? `Geduld! Türchen ${d} öffnet am ${d}. Dezember.`
                          : `Türchen ${d} öffnet am ${d}. Dezember – noch ${d - state.unlocked} ${d - state.unlocked === 1 ? "Tag" : "Tage"}.`,
                      )
                    }
                  >
                    {inner}
                  </button>
                );
              }
              return (
                <Link
                  key={d}
                  href={href(d)}
                  className={cls}
                  aria-label={`Türchen ${d}: ${title ?? ""}${isDone ? " – geschafft, goldenes Hufeisen gesammelt" : ""}${needsAccess ? " – Freischaltung nötig" : ""}`}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
          {toast && (
            <p className={styles.toast} role="status">
              {toast}
            </p>
          )}
          <div className={styles.wallLegend} aria-hidden>
            <span>Offene Tür mit Hufeisen = geschafft</span>
            <span>Leuchtende Tür = wartet auf dich</span>
          </div>
        </section>

        <div className={styles.tiles}>
          <Link href={`/adventskalender/stall${query}`} className={styles.tile}>
            <span className={styles.tileArt} aria-hidden>
              <WinterStall decor={advent.stall} card={advent.card} viewBox="100 60 600 420" />
            </span>
            <span>
              <span className={styles.tileTitle}>Mein Weihnachtsstall</span>
              <span className={styles.tileText}>
                {advent.decos.length === 0
                  ? "Noch ganz schlicht. Ab dem 9. Dezember darfst du schmücken."
                  : `${advent.decos.length} Dekorationen freigeschaltet · ${Object.keys(advent.stall).length} Plätze geschmückt`}
              </span>
            </span>
          </Link>
          {done(24) ? (
            <Link href={`/adventskalender/urkunde${query}`} className={styles.tile}>
              <span className={styles.tileArt} aria-hidden style={{ display: "grid", placeItems: "center", background: "var(--wh-paper)" }}>
                <GoldHorseshoe />
              </span>
              <span>
                <span className={styles.tileTitle}>Deine Weihnachtsurkunde</span>
                <span className={styles.tileText}>Mit deinem Namen – zum Ausdrucken.</span>
              </span>
            </Link>
          ) : (
            <div className={styles.tile}>
              <span className={styles.tileArt} aria-hidden style={{ display: "grid", placeItems: "center", background: "var(--wh-paper)", color: "var(--wh-wood)" }}>
                <Icon name="letter" width={40} height={40} />
              </span>
              <span>
                <span className={styles.tileTitle}>Weihnachtsurkunde</span>
                <span className={styles.tileText}>Wartet hinter Türchen 24 auf dich.</span>
              </span>
            </div>
          )}
        </div>

        <details className={styles.foundBook}>
          <summary>
            <span>
              <span className={styles.sectionTitle} style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Dein Fundbuch
              </span>
              <br />
              <span className={styles.hint}>Alle Hinweise, die du gefunden hast · {found.length} von 24</span>
            </span>
            <Icon name="lupe" width={28} height={28} />
          </summary>
          {found.length === 0 ? (
            <p className={styles.foundEmpty}>Noch leer. Öffne ein Türchen und löse die Aufgabe – dann landet hier dein erstes Fundstück.</p>
          ) : (
            <div className={styles.foundList}>
              {found.map((s) => (
                <VisualView key={s.day} v={{ kind: "doc", doc: s.found.doc }} />
              ))}
            </div>
          )}
        </details>

        <AdventOffer {...offer} />
        <p className={styles.hint} style={{ textAlign: "center" }}>
          Für Kinder von 5 bis 12 Jahren · Zum Vorlesen und Selberspielen · {GAME_LABEL.quiz}, {GAME_LABEL.find}, {GAME_LABEL.match} und mehr
        </p>
      </div>
    </div>
  );
}
