"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "@/i18n/Link";
import { HorsePortrait } from "@/components/illustrations/HorsePortrait";
import { horses } from "@/content/horses";
import { PHASES } from "@/content/hoftag/day";
import { horseProfiles } from "@/content/hoftag/horses";
import { getPlace, PLACES, toPlace, type Place } from "@/content/hoftag/places";
import { emptyHoftag, type HoftagProgress, type HorseId, type PlaceId, type TimeOfDay } from "@/content/hoftag/types";
import { meinTagAmHof } from "@/content/products";
import { progressActions, useProgress } from "@/lib/progress/store";
import { completeTask, currentTask, fillText, finishDay, HORSE_NAMES, isReturning, markEventSeen, newDay, pendingEvent, phaseProgress } from "./engine";
import { HofMap } from "./HofMap";
import { UiIcon } from "./HoftagIcons";
import { Btn, Speech, StatGrid, TimeBar } from "./parts";
import { ErfolgeScreen, EveningScreen, HofbuchScreen, IntroScreen, PickScreen, SummaryScreen } from "./Screens";
import { setSoundEnabled, sfx, startAmbience, stopAmbience } from "./sound";
import { TaskView } from "./TaskView";
import styles from "./hoftag.module.css";

/**
 * „Hofgeschichten – Mein Tag am Hof“
 * Ein ganzer Tag Verantwortung für Tivoli, Tonga oder Scrabble.
 *
 * Zugang (`access`, vom Server geprüft): Mitglieder und Käufer spielen beliebig viele
 * Hoftage. Ohne Freischaltung ist der erste Hoftag zum Kennenlernen frei.
 */

export type HoftagAccess = "member" | "owned" | null;

type View = "home" | "task" | "map" | "hofbuch" | "erfolge" | "pick" | "evening" | "summary" | "event";

const GREETING: Record<TimeOfDay, string> = {
  morgen: "Guten Morgen",
  vormittag: "Schönen Vormittag",
  mittag: "Mittagszeit",
  nachmittag: "Hallo am Nachmittag",
  abend: "Guten Abend",
};

const save = (fn: (h: HoftagProgress) => HoftagProgress) => progressActions.updateHoftag(fn);

export function HoftagGame({ access }: { access: HoftagAccess }) {
  const progress = useProgress();
  const h = progress.hoftag ?? emptyHoftag;
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("home");
  const [introStep, setIntroStep] = useState<"welcome" | "pick">("welcome");
  const [mapPlace, setMapPlace] = useState<Place | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    setMounted(true);
    progressActions.setLast({ href: "/hoftag", title: "Mein Tag am Hof", area: "Spielen" });
  }, []);

  const soundOn = h.sound !== false;
  const ambTime: TimeOfDay = h.day && !h.day.finishedAt ? (currentTask(h.day)?.phase ?? "abend") : "morgen";
  useEffect(() => {
    setSoundEnabled(soundOn);
    if (mounted && soundOn) startAmbience(ambTime);
    return () => stopAmbience();
  }, [mounted, soundOn, ambTime]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  if (!mounted) return <div className={styles.loading} aria-busy="true" />;

  const unlocked = access !== null;
  const canStartDay = unlocked || h.daysCompleted === 0;

  /* ---------- Erster Start ---------- */
  if (!h.introSeen || !h.horse) {
    if (introStep === "welcome") return <Shell><IntroScreen onNext={() => setIntroStep("pick")} /></Shell>;
    return (
      <Shell>
        <PickScreen
          onPick={(horse) => {
            sfx.schnauben();
            save((p) => ({ ...p, horse, introSeen: true, day: newDay(p, horse, Date.now()) }));
            setView("home");
          }}
        />
      </Shell>
    );
  }

  const day = h.day;
  const running = day && !day.finishedAt ? day : null;
  const cur = running ? currentTask(running) : null;
  const time: TimeOfDay = running ? (cur?.phase ?? "abend") : "morgen";

  const startNewDay = (horse: HorseId) => {
    sfx.schnauben();
    save((p) => ({ ...p, horse, day: newDay(p, horse, Date.now()) }));
    setNewBadges([]);
    setView("home");
  };

  const openTask = () => {
    if (!running) return;
    sfx.tap();
    if (pendingEvent(running)) setView("event");
    else if (cur) setView("task");
    else setView("evening");
  };

  /* ---------- Ansichten ---------- */

  if (view === "pick") {
    return (
      <Shell onHome={() => setView("home")}>
        <PickScreen current={h.horse} onPick={startNewDay} />
      </Shell>
    );
  }
  if (view === "hofbuch") return <Shell onHome={() => setView("home")}><HofbuchScreen progress={h} /></Shell>;
  if (view === "erfolge") return <Shell onHome={() => setView("home")}><ErfolgeScreen progress={h} /></Shell>;

  if (view === "summary" && day?.finishedAt) {
    return (
      <Shell>
        <SummaryScreen
          day={day}
          progress={h}
          newBadges={newBadges}
          onHofbuch={() => setView("hofbuch")}
          onNewDay={() => setView("home")}
          canPlayMore={unlocked}
        />
      </Shell>
    );
  }

  if (view === "evening" && running && !cur) {
    return (
      <Shell>
        <TimeBar current="abend" finished />
        <EveningScreen
          day={running}
          onNext={() => {
            sfx.done();
            const before = h.badges;
            save((p) => finishDay(p, Date.now()));
            const after = finishDay(h, Date.now()).badges;
            setNewBadges(after.filter((b) => !before.includes(b)));
            setView("summary");
          }}
        />
      </Shell>
    );
  }

  if (view === "event" && running) {
    const ev = pendingEvent(running);
    if (ev) {
      return (
        <Shell onHome={() => setView("home")}>
          <TimeBar current={time} />
          <section className={styles.event} role="status">
            <p className={styles.kicker}>Heute auf dem Hof</p>
            <h1 className={styles.h1}>{fillText(ev.text, running.horse)}</h1>
            <Speech who={ev.speaker}>
              <p>{ev.task ? fillText(ev.task.intro, running.horse) : fillText(ev.learn ?? "", running.horse)}</p>
            </Speech>
            <Btn
              variant="gold"
              onClick={() => {
                sfx.tap();
                save((p) => (p.day ? { ...p, day: markEventSeen(p.day, ev.id) } : p));
                setView(cur ? "task" : "home");
              }}
            >
              {ev.task ? "Los geht's" : "Weiter"}
            </Btn>
          </section>
        </Shell>
      );
    }
  }

  if (view === "task" && running && cur) {
    return (
      <Shell onHome={() => setView("home")}>
        <TimeBar current={cur.phase} />
        <TaskView
          key={cur.task.id}
          task={cur.task}
          day={running}
          time={cur.phase}
          onDone={() => {
            const nextDay = completeTask(running, cur.task);
            save((p) => ({ ...p, day: nextDay, lastPlayedAt: Date.now() }));
            const next = currentTask(nextDay);
            if (!next) setView("evening");
            else if (next.phase !== cur.phase || pendingEvent(nextDay)) setView("home");
            else setView("task");
          }}
        />
      </Shell>
    );
  }

  if (view === "map") {
    return (
      <Shell onHome={() => setView("home")}>
        <section className={styles.stack} aria-labelledby="map-title">
          <p className={styles.kicker}>Unser Hof von oben</p>
          <h1 id="map-title" className={styles.h1}>
            Hofkarte
          </h1>
          <HofMap time={time} highlight={cur?.task.place ?? null} onSelect={(id: PlaceId) => setMapPlace(getPlace(id))} />
          {mapPlace && (
            <div className={styles.card} role="status">
              <h2 className={styles.cardTitle}>{mapPlace.name}</h2>
              <p>{mapPlace.info}</p>
              {cur && cur.task.place === mapPlace.id ? (
                <Btn variant="gold" onClick={openTask}>
                  {fillText(cur.task.title, running!.horse)}
                </Btn>
              ) : cur ? (
                <p className={styles.small}>Deine nächste Aufgabe wartet {toPlace(getPlace(cur.task.place)).replace(/^zu[mr] /, (m) => (m === "zur " ? "in der " : "im "))}.</p>
              ) : null}
            </div>
          )}
          {!mapPlace && <p className={styles.hint}>Tippe auf einen Bereich, um ihn kennenzulernen.</p>}
          <p className={styles.visually}>Bereiche: {PLACES.map((p) => p.name).join(", ")}</p>
        </section>
      </Shell>
    );
  }

  /* ---------- Startbildschirm des Spiels ---------- */

  const horse = h.horse;
  const hData = horses.find((x) => x.slug === horse)!;
  const name = HORSE_NAMES[horse];

  // Kein laufender Tag: neuen Hoftag anbieten (oder Freischaltung)
  if (!running) {
    return (
      <Shell>
        {isReturning(h, now) && (
          <Speech who="hanna">
            <p>Schön, dass du wieder auf dem Hof bist! {name} freut sich über Besuch.</p>
          </Speech>
        )}
        <section className={styles.home}>
          <h1 className={styles.h1}>Ein neuer Tag auf dem Hof</h1>
          <div className={styles.heroHorse} style={{ background: hData.tint }}>
            <HorsePortrait horse={hData} className={styles.heroImg} priority />
          </div>
          {canStartDay ? (
            <div className={styles.actions}>
              <Btn variant="gold" onClick={() => startNewDay(horse)}>
                Hoftag mit {name} starten
              </Btn>
              <Btn variant="ghost" onClick={() => setView("pick")}>
                Anderes Pferd wählen
              </Btn>
            </div>
          ) : (
            <Offer />
          )}
        </section>
        <HomeNav onMap={() => setView("map")} onBook={() => setView("hofbuch")} onErfolge={() => setView("erfolge")} />
      </Shell>
    );
  }

  const progressDots = phaseProgress(running);
  const nextPlace = cur ? getPlace(cur.task.place) : null;
  const ev = pendingEvent(running);

  return (
    <Shell>
      <TimeBar current={time} />
      <section className={styles.home} aria-labelledby="home-title">
        <h1 id="home-title" className={styles.h1}>
          {GREETING[time]}, {name}!
        </h1>
        <div className={styles.homeGrid}>
          <div className={styles.heroHorse} style={{ background: hData.tint }}>
            <HorsePortrait horse={hData} className={styles.heroImg} priority />
            <span className={styles.heroTraits}>{horseProfiles[horse].traits.join(" · ")}</span>
          </div>
          <StatGrid stats={running.stats} compact />
        </div>

        <div className={styles.next}>
          <p className={styles.eyebrow}>{ev ? "Heute auf dem Hof" : "Deine nächste Aufgabe"}</p>
          <p className={styles.nextText}>{ev ? fillText(ev.text, horse) : cur ? fillText(cur.task.teaser, horse) : `${name} ist versorgt. Der Abend beginnt.`}</p>
          <Btn variant="gold" onClick={openTask}>
            {cur && nextPlace ? toPlace(nextPlace).replace(/^z/, "Z") : "Zum Feierabend"}
          </Btn>
        </div>

        <div className={styles.dayProgress} aria-label="Tagesfortschritt">
          <span className={styles.eyebrow}>Tagesfortschritt</span>
          <ol className={styles.dots}>
            {progressDots.map((p) => {
              const label = PHASES.find((x) => x.id === p.phase)?.label ?? p.phase;
              const state = p.done >= p.total ? styles.dotDone : p.phase === time ? styles.dotNow : "";
              return (
                <li key={p.phase} className={`${styles.dotItem} ${state}`} aria-label={`${label}: ${p.done} von ${p.total}`}>
                  <span className={styles.dot} />
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <HomeNav onMap={() => setView("map")} onBook={() => setView("hofbuch")} onErfolge={() => setView("erfolge")} />
    </Shell>
  );
}

function Shell({ children, onHome }: { children: ReactNode; onHome?: () => void }) {
  return (
    <div className="page">
      <div className={styles.game}>
      <div className={styles.topline}>
        {onHome ? (
          <button type="button" className={styles.backLink} onClick={onHome}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5 8 12l7 7" />
            </svg>
            Mein Tag am Hof
          </button>
        ) : (
          <Link href="/spielen" className={styles.backLink}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5 8 12l7 7" />
            </svg>
            Spielen
          </Link>
        )}
        <span className={styles.brandline}>Dein Pferd. Dein Stall. Dein Tag.</span>
        <SoundToggle />
      </div>
      {children}
      </div>
    </div>
  );
}

/** Stallgeräusche an/aus – wird im Spielstand gemerkt */
function SoundToggle() {
  const on = (useProgress().hoftag?.sound ?? true) !== false;
  return (
    <button
      type="button"
      className={`${styles.soundBtn} ${on ? "" : styles.soundOff}`}
      aria-pressed={on}
      aria-label={on ? "Stallgeräusche ausschalten" : "Stallgeräusche einschalten"}
      onClick={() => {
        setSoundEnabled(!on);
        save((p) => ({ ...p, sound: !on }));
        if (!on) window.setTimeout(() => sfx.schnauben(0.8), 50);
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" />
        {on ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="m16 9.5 5 5M21 9.5l-5 5" />}
      </svg>
      <span>{on ? "Ton an" : "Ton aus"}</span>
    </button>
  );
}

function HomeNav({ onMap, onBook, onErfolge }: { onMap: () => void; onBook: () => void; onErfolge: () => void }) {
  return (
    <nav className={styles.homeNav} aria-label="Im Spiel">
      <button type="button" onClick={() => { sfx.tap(); onMap(); }}>
        <UiIcon name="map" />
        <span>Hof</span>
      </button>
      <button type="button" onClick={() => { sfx.tap(); onBook(); }}>
        <UiIcon name="book" />
        <span>Hofbuch</span>
      </button>
      <button type="button" onClick={() => { sfx.tap(); onErfolge(); }}>
        <UiIcon name="medal" />
        <span>Erfolge</span>
      </button>
    </nav>
  );
}

/** Nach dem Kennenlern-Tag: Hinweis auf Mitgliedschaft und Einzelkauf – ohne Druck, ohne Countdown */
function Offer() {
  return (
    <div className={styles.offer}>
      <h2 className={styles.cardTitle}>Weitere Hoftage</h2>
      <p>
        Dein erster Hoftag war zum Kennenlernen. Mit der Hof-Mitgliedschaft ist „Mein Tag am Hof“ inklusive – jeden Tag mit neuen Ereignissen.
        {meinTagAmHof.price && meinTagAmHof.checkoutUrl ? ` Oder einzeln für ${meinTagAmHof.price}.` : ""}
      </p>
      <p className={styles.small}>Bitte frag deine Eltern. Dein Hofbuch, dein Vertrauen und deine XP bleiben gespeichert.</p>
      <div className={styles.actions}>
        <Link href="/mitgliedschaft" className={`${styles.btn} ${styles.btn_primary}`}>
          Zur Mitgliedschaft
        </Link>
        {meinTagAmHof.checkoutUrl && (
          <a href={meinTagAmHof.checkoutUrl} className={`${styles.btn} ${styles.btn_ghost}`} rel="noopener">
            Einzeln freischalten
          </a>
        )}
        <Link href="/eltern" className={`${styles.btn} ${styles.btn_ghost}`}>
          Schon gekauft? Freischalten
        </Link>
      </div>
    </div>
  );
}
