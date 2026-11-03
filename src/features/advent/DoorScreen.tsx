"use client";

import Link from "@/i18n/Link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { GoldHorseshoe } from "@/components/illustrations/advent/GoldHorseshoe";
import { WinterStall } from "@/components/illustrations/advent/WinterStall";
import { decosForDay, FULL_STALL } from "@/content/advent/decor";
import { GAME_LABEL } from "@/content/advent/games";
import { doorDateLabel } from "@/content/advent/schedule";
import type { AdventDoor, DoorPart } from "@/content/advent/types";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import { VisualView } from "@/engine/VisualView";
import { progressActions } from "@/lib/progress/store";
import { Certificate } from "./Certificate";
import { CardCanvas, CardDesigner, DecoThumb, StallDecorator, useAdvent } from "./DecorateGame";
import { Portrait } from "./Portrait";
import styles from "./advent.module.css";

type Props = { door: AdventDoor; query: string };

/**
 * Ein Türchen: Kapitel lesen → Aufgabe(n) lösen → goldenes Hufeisen.
 * Abschnitt 0 = Kapitel, 1…n = Teile aus `door.parts`, danach die Belohnung.
 * Der Abschnitt wird als „letzter Spielstand“ gespeichert.
 */
export function DoorScreen({ door, query }: Props) {
  const advent = useAdvent();
  const total = door.parts.length;
  const [stage, setStage] = useState(0); // 0 Kapitel, 1..total Teile, total+1 Belohnung
  const [fresh, setFresh] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const already = Boolean(advent.doors[String(door.day)]);
  const resumePart = advent.last && advent.last.door === door.day && !already && advent.last.part > 0 && advent.last.part <= total ? advent.last.part : 0;
  const newDecos = useMemo(() => decosForDay(door.day), [door.day]);

  useEffect(() => {
    progressActions.setLast({ href: `/adventskalender/${door.day}`, title: `Türchen ${door.day}: ${door.title}`, area: "Adventskalender" });
  }, [door.day, door.title]);

  const go = (next: number) => {
    setStage(next);
    if (next >= 1 && next <= total) progressActions.setAdventLast(door.day, next);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const finish = () => {
    const isNew = progressActions.completeAdventDoor(
      door.day,
      newDecos.map((d) => d.id),
    );
    // Die Karte für Tivoli hängt nach dem Gestalten gleich an seiner Box
    if (door.parts.some((p) => p.kind === "card")) progressActions.setAdventStall("karte", "karte-tivoli");
    setFresh(isNew);
    go(total + 1);
  };

  const nextFrom = (i: number) => (i + 1 <= total ? go(i + 1) : finish());

  return (
    <div className={styles.page}>
      <div className={styles.doorPage} ref={topRef} style={{ scrollMarginTop: 80 }}>
        <div className={styles.topRow}>
          <Link href={`/adventskalender${query}`} className={styles.backLink}>
            <Icon name="back" />
            Kalender
          </Link>
          <span className={styles.dateTag}>
            Türchen {door.day} · {doorDateLabel(door.day)}
          </span>
        </div>

        <div className={styles.steps} aria-hidden>
          {Array.from({ length: total + 2 }, (_, i) => (
            <span key={i} className={`${styles.stepDot} ${i < stage ? styles.stepDotDone : ""} ${i === stage ? styles.stepDotNow : ""}`} />
          ))}
        </div>

        {stage === 0 && (
          <>
            {resumePart > 0 && (
              <div className={styles.resume}>
                <span>Du warst schon bei: {door.parts[resumePart - 1].title}</span>
                <button type="button" className={`${styles.btn} ${styles.btnSmall}`} onClick={() => go(resumePart)}>
                  Dort weiterspielen
                </button>
              </div>
            )}
            <article className={styles.chapter} aria-labelledby="kapitel">
              <div className={styles.chapterArt}>
                <VisualView v={{ kind: "scene", scene: door.chapter.scene }} />
              </div>
              <div className={styles.cast}>
                {door.chapter.cast.map((c) => (
                  <Portrait key={c} who={c} />
                ))}
              </div>
              <div className={styles.chapterBody}>
                <span className={styles.chapterLabel}>Kapitel {door.day}</span>
                <h1 id="kapitel" className={styles.chapterTitle}>
                  {door.title}
                </h1>
                <div className={styles.prose}>
                  {door.chapter.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className={styles.chapterEnd}>
                  <button type="button" className={styles.btn} onClick={() => go(1)}>
                    {door.day === 24 ? "Weiter zum Finale" : `Los geht’s: ${GAME_LABEL[door.parts[0].kind === "steps" ? door.parts[0].game : door.game]}`}
                    <Icon name="play" />
                  </button>
                </div>
              </div>
            </article>
          </>
        )}

        {stage >= 1 && stage <= total && (
          <PartView key={`${door.day}-${stage}`} part={door.parts[stage - 1]} day={door.day} index={stage} total={total} onDone={() => nextFrom(stage)} />
        )}

        {stage === total + 1 && (
          <Reward door={door} fresh={fresh} shoes={Object.keys(advent.doors).length} query={query} onReplay={() => go(0)} />
        )}
      </div>
    </div>
  );
}

function PartView({ part, day, index, total, onDone }: { part: DoorPart; day: number; index: number; total: number; onDone: () => void }) {
  const kicker = total > 1 ? `Teil ${index} von ${total}` : part.kind === "steps" ? GAME_LABEL[part.game] : "Aufgabe";
  const head = (intro?: string) => (
    <header className={styles.partHead}>
      <p className={styles.partKicker}>{kicker}</p>
      <h2 className={styles.partTitle}>{part.title}</h2>
      {intro && <p className={styles.partIntro}>{intro}</p>}
    </header>
  );

  switch (part.kind) {
    case "steps":
      return (
        <section>
          {head(part.intro)}
          <div className={styles.panel}>
            <ActivityPlayer
              activity={{ id: `advent-${day}-${index}`, title: part.title, intro: "", steps: part.steps }}
              autoStart
              tint="var(--wh-paper)"
              onComplete={() => onDone()}
              renderDone={() => null}
            />
          </div>
        </section>
      );
    case "decorate":
      return (
        <section>
          {head(part.intro)}
          <StallDecorator goal={part.goal} extraUnlocked={decosForDay(day).map((d) => d.id)} onDone={onDone} wide />
        </section>
      );
    case "card":
      return (
        <section>
          {head(part.intro)}
          <CardDesigner onDone={onDone} />
        </section>
      );
    case "surprise":
      return <Surprise part={part} kicker={kicker} onDone={onDone} />;
    case "stall":
      return <FinalStall part={part} kicker={kicker} onDone={onDone} />;
    case "message":
      return (
        <section>
          {head()}
          <div className={styles.letter}>
            <div className={styles.prose}>
              {part.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className={styles.center}>
            <button type="button" className={styles.btn} onClick={onDone}>
              Weiter
              <Icon name="play" />
            </button>
          </div>
        </section>
      );
    case "certificate":
      return (
        <section>
          {head("Trag deinen Namen ein und drucke deine Urkunde aus. Danach bekommst du das letzte goldene Hufeisen.")}
          <div className={styles.panel}>
            <Certificate finale />
          </div>
          <div className={styles.center}>
            <button type="button" className={`${styles.btn} ${styles.btnGold}`} onClick={onDone}>
              Das 24. Hufeisen holen
              <Icon name="horseshoe" />
            </button>
          </div>
        </section>
      );
  }
}

function Surprise({ part, kicker, onDone }: { part: Extract<DoorPart, { kind: "surprise" }>; kicker: string; onDone: () => void }) {
  const [open, setOpen] = useState<number[]>([]);
  const all = open.length === part.boxes.length;
  return (
    <section>
      <header className={styles.partHead}>
        <p className={styles.partKicker}>{kicker}</p>
        <h2 className={styles.partTitle}>{part.title}</h2>
        <p className={styles.partIntro}>{part.intro}</p>
      </header>
      <div className={styles.boxes}>
        {part.boxes.map((b, i) => {
          const isOpen = open.includes(i);
          return (
            <button
              key={i}
              type="button"
              className={`${styles.surpriseBox} ${isOpen ? styles.surpriseOpen : ""}`}
              onClick={() => !isOpen && setOpen([...open, i])}
              aria-expanded={isOpen}
            >
              {b.owner === "du" ? <Icon name="gift" /> : <Portrait who={b.owner} />}
              <span>
                <strong>{b.label}</strong>
                {isOpen ? <span style={{ display: "block", marginTop: 4 }}>{b.reveal}</span> : <span style={{ display: "block", fontWeight: 400 }}>Antippen!</span>}
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.center} aria-live="polite">
        {all && (
          <button type="button" className={styles.btn} onClick={onDone}>
            Weiter
            <Icon name="play" />
          </button>
        )}
      </div>
    </section>
  );
}

function FinalStall({ part, kicker, onDone }: { part: Extract<DoorPart, { kind: "stall" }>; kicker: string; onDone: () => void }) {
  const advent = useAdvent();
  // Der fertig geschmückte Stall: deine Auswahl – leere Plätze werden festlich ergänzt
  const decor = { ...FULL_STALL, ...advent.stall };
  return (
    <section>
      <header className={styles.partHead}>
        <p className={styles.partKicker}>{kicker}</p>
        <h2 className={styles.partTitle}>{part.title}</h2>
        <p className={styles.partIntro}>{part.intro}</p>
      </header>
      <div className={styles.stage}>
        <WinterStall decor={decor} card={advent.card} label="Dein fertig geschmückter Weihnachtsstall an Heiligabend" />
      </div>
      <div className={styles.center}>
        <button type="button" className={styles.btn} onClick={onDone}>
          Weiter
          <Icon name="play" />
        </button>
      </div>
    </section>
  );
}

function Reward({ door, fresh, shoes, query, onReplay }: { door: AdventDoor; fresh: boolean; shoes: number; query: string; onReplay: () => void }) {
  const advent = useAdvent();
  const decos = decosForDay(door.day);
  const final = door.day === 24;
  return (
    <section className={styles.reward} aria-live="polite">
      <GoldHorseshoe className={styles.rewardShoe} number={door.day} title={`Goldenes Hufeisen Nummer ${door.day}`} />
      <h2 className={styles.rewardTitle}>{final ? "Frohe Weihnachten!" : `Hufeisen Nr. ${door.day}`}</h2>
      <p className={styles.rewardText}>{door.reward.message}</p>
      {fresh ? (
        <span className={styles.already}>Du hast jetzt {shoes} von 24 goldenen Hufeisen.</span>
      ) : (
        <span className={styles.already}>Dieses Hufeisen hattest du schon – schön, dass du nochmal gespielt hast!</span>
      )}
      <div className={styles.rewardGrid}>
        <div className={styles.rewardCard}>
          <p className={styles.rewardCardTitle}>Neu im Fundbuch</p>
          <VisualView v={{ kind: "doc", doc: door.reward.found.doc }} />
        </div>
        {decos.length > 0 && (
          <div className={styles.rewardCard}>
            <p className={styles.rewardCardTitle}>Neu für deinen Weihnachtsstall</p>
            <ul className={styles.decoList}>
              {decos.map((d) => (
                <li key={d.id}>
                  <span className={styles.decoThumb}>
                    <DecoThumb deco={d} card={advent.card} />
                  </span>
                  <span>
                    <strong>{d.name}</strong>
                    <br />
                    {d.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {door.parts.some((p) => p.kind === "card") && (
          <div className={styles.rewardCard}>
            <p className={styles.rewardCardTitle}>Deine Karte für Tivoli</p>
            <CardCanvas card={advent.card} className={styles.cardSvg} />
          </div>
        )}
      </div>
      {door.teaser && <p className={styles.teaser}>{door.teaser}</p>}
      <div className={styles.rewardActions}>
        <Link href={`/adventskalender${query}`} className={`${styles.btn} ${styles.btnGold}`}>
          Zum Kalender
        </Link>
        {decos.length > 0 && (
          <Link href={`/adventskalender/stall${query}`} className={`${styles.btn} ${styles.btnGhost}`}>
            Stall schmücken
          </Link>
        )}
        {final && (
          <Link href={`/adventskalender/urkunde${query}`} className={`${styles.btn} ${styles.btnGhost}`}>
            Urkunde
          </Link>
        )}
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onReplay}>
          <Icon name="replay" />
          Nochmal
        </button>
      </div>
    </section>
  );
}
