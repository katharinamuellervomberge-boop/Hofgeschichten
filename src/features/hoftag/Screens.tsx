"use client";

import { HorsePortrait } from "@/components/illustrations/HorsePortrait";
import { ItemIcon, isItemName } from "@/components/illustrations/ItemIcons";
import { horses } from "@/content/horses";
import { FOUND_ITEMS } from "@/content/hoftag/events";
import { HOFBUCH_SECTIONS, KNOWLEDGE, TOPICS, type Topic } from "@/content/hoftag/hofbuch";
import { horseProfiles, HORSE_IDS } from "@/content/hoftag/horses";
import { BADGES, levelFor, trustLabel } from "@/content/hoftag/progression";
import type { DayState, HoftagProgress, HorseId, SummaryKey } from "@/content/hoftag/types";
import { DAY_BONUS, fillText, HORSE_NAMES } from "./engine";
import { UiIcon } from "./HoftagIcons";
import { Btn, Speech } from "./parts";
import { Scene } from "./Scene";
import styles from "./hoftag.module.css";

/* ---------- Spielstart ---------- */

export function IntroScreen({ onNext, returning }: { onNext: () => void; returning?: boolean }) {
  return (
    <section className={styles.intro}>
      <div className={styles.sceneFrame}>
        <Scene scene="hof" time="morgen" kruemel className={styles.scene} label="Der Hof am Morgen" />
      </div>
      <p className={styles.kicker}>Hofgeschichten – Mein Tag am Hof</p>
      <h1 className={styles.h1}>{returning ? "Schön, dass du wieder auf dem Hof bist!" : "Willkommen auf dem Hof!"}</h1>
      <Speech who="hanna">
        <p>
          Heute darfst du dich um eines unserer Pferde kümmern. Aber ein Pferd braucht viel mehr als nur Streicheleinheiten. Futter, Wasser,
          Bewegung, Pflege und ein sauberer Stall gehören jeden Tag dazu.
        </p>
      </Speech>
      <Btn onClick={onNext} variant="gold">
        Pferd wählen
      </Btn>
    </section>
  );
}

export function PickScreen({ onPick, current }: { onPick: (h: HorseId) => void; current?: HorseId | null }) {
  return (
    <section className={styles.pick} aria-labelledby="pick-title">
      <p className={styles.kicker}>Dein Pflegepferd</p>
      <h1 id="pick-title" className={styles.h1}>
        Wähle dein Pferd
      </h1>
      <ul className={styles.pickList}>
        {HORSE_IDS.map((id) => {
          const h = horses.find((x) => x.slug === id)!;
          const prof = horseProfiles[id];
          return (
            <li key={id}>
              <button type="button" className={`${styles.pickCard} ${current === id ? styles.pickCurrent : ""}`} style={{ background: h.tint }} onClick={() => onPick(id)}>
                <HorsePortrait horse={h} className={styles.pickImg} sizes="(min-width: 720px) 300px, 80vw" />
                <span className={styles.pickBody}>
                  <span className={styles.pickName}>{h.name}</span>
                  <span className={styles.traits}>
                    {prof.traits.map((t) => (
                      <span key={t} className={styles.trait}>
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className={styles.pickText}>{prof.pitch}</span>
                  {current === id && <span className={styles.pickBadge}>Dein Pflegepferd</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Abend & Auswertung ---------- */

export function EveningScreen({ day, onNext }: { day: DayState; onNext: () => void }) {
  return (
    <section className={styles.evening}>
      <div className={`${styles.sceneFrame} ${styles.eveningFrame}`}>
        <Scene scene="boxtuer" time="abend" horse={day.horse} hay className={styles.scene} label={`${HORSE_NAMES[day.horse]} steht zufrieden mit Heu im Stall`} />
        <span className={styles.dusk} aria-hidden />
        <span className={styles.lamp} aria-hidden />
      </div>
      <h1 className={styles.h1}>Der Hof wird ruhig.</h1>
      <p className={styles.lead}>
        Die Sonne ist hinter dem Wald verschwunden. Im Stall gehen die Lampen an. {HORSE_NAMES[day.horse]} zupft zufrieden am Heu.
      </p>
      <Btn onClick={onNext} variant="gold">
        Tag abschließen
      </Btn>
    </section>
  );
}

const SUMMARY_TEXT: Record<SummaryKey, string> = {
  begruesst: "{name} richtig begrüßt",
  gefuettert: "gefüttert",
  wasser: "Wasser kontrolliert",
  ausgemistet: "ausgemistet",
  eingestreut: "frisch eingestreut",
  geputzt: "{name} gepflegt",
  hufe: "Hufe ausgekratzt",
  bewegung: "Bewegung ermöglicht",
  beobachtet: "genau beobachtet",
  geholfen: "auf dem Hof geholfen",
  versorgt: "den Stall für die Nacht versorgt",
};
const SUMMARY_ORDER: SummaryKey[] = ["begruesst", "gefuettert", "wasser", "ausgemistet", "eingestreut", "geputzt", "hufe", "bewegung", "beobachtet", "geholfen", "versorgt"];

export function SummaryScreen({
  day,
  progress,
  newBadges,
  onHofbuch,
  onNewDay,
  canPlayMore,
}: {
  day: DayState;
  progress: HoftagProgress;
  newBadges: string[];
  onHofbuch: () => void;
  onNewDay: () => void;
  canPlayMore: boolean;
}) {
  const lv = levelFor(progress.xp);
  const xp = day.earned.xp + DAY_BONUS.xp;
  const trust = day.earned.trust + DAY_BONUS.trust;
  return (
    <section className={styles.summary} aria-labelledby="sum-title">
      <p className={styles.kicker}>Hoftag {day.number}</p>
      <h1 id="sum-title" className={styles.h1}>
        Geschafft! Dein Tag am Hof ist vorbei.
      </h1>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Heute hast du …</h2>
        <ul className={styles.checklist}>
          {SUMMARY_ORDER.filter((k) => day.summary.includes(k)).map((k) => (
            <li key={k}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {fillText(SUMMARY_TEXT[k], day.horse)}
            </li>
          ))}
        </ul>
        <dl className={styles.rewards}>
          <div>
            <dt>Vertrauen</dt>
            <dd>+{trust}</dd>
          </div>
          <div>
            <dt>Pferdewissen</dt>
            <dd>+{day.earned.knowledge}</dd>
          </div>
          <div>
            <dt>Stallprofi XP</dt>
            <dd>+{xp}</dd>
          </div>
        </dl>
        <LevelBar xp={progress.xp} />
        <p className={styles.small}>
          Level {lv.current.level} – {lv.current.name}
          {lv.next ? ` · noch ${lv.next.minXp - progress.xp} XP bis ${lv.next.name}` : ""}
        </p>
      </div>

      {newBadges.length > 0 && (
        <div className={styles.badgeNew} role="status">
          <UiIcon name="medal" className={styles.badgeNewIcon} />
          <div>
            <p className={styles.badgeNewTitle}>Neues Abzeichen!</p>
            {newBadges.map((id) => (
              <p key={id}>{BADGES.find((b) => b.id === id)?.name}</p>
            ))}
          </div>
        </div>
      )}

      <p className={styles.lead}>Morgen wartet ein neuer Tag auf dich.</p>
      <div className={styles.actions}>
        <Btn onClick={onHofbuch} variant="primary">
          Zum Hofbuch
        </Btn>
        {canPlayMore && (
          <Btn onClick={onNewDay} variant="ghost">
            Neuer Hoftag
          </Btn>
        )}
      </div>
    </section>
  );
}

export function LevelBar({ xp }: { xp: number }) {
  const lv = levelFor(xp);
  return (
    <div className={styles.level} aria-label={`Level ${lv.current.level}: ${lv.current.name}`}>
      <span className={styles.levelBadge}>{lv.current.level}</span>
      <span className={styles.levelTrack}>
        <span className={styles.levelFill} style={{ width: `${lv.progress * 100}%` }} />
      </span>
    </div>
  );
}

/* ---------- Hofbuch ---------- */

export function HofbuchScreen({ progress }: { progress: HoftagProgress }) {
  const topics = Object.keys(TOPICS) as Topic[];
  return (
    <section className={styles.book} aria-labelledby="book-title">
      <p className={styles.kicker}>Deine Sammlung</p>
      <h1 id="book-title" className={styles.h1}>
        Mein Hofbuch
      </h1>
      <nav className={styles.bookNav} aria-label="Bereiche im Hofbuch">
        {HOFBUCH_SECTIONS.map((s) => (
          <a key={s.id} href={`#hb-${s.id}`} className={styles.bookChip}>
            {s.title}
          </a>
        ))}
      </nav>

      <div id="hb-wissen" className={styles.bookSection}>
        <h2 className={styles.h2}>
          Pferdewissen <span className={styles.countTag}>{progress.cards.length} / {KNOWLEDGE.length}</span>
        </h2>
        {topics.map((topic) => (
          <div key={topic} className={styles.topic}>
            <h3 className={styles.h3}>{TOPICS[topic]}</h3>
            <ul className={styles.cards}>
              {KNOWLEDGE.filter((c) => c.topic === topic).map((c) => {
                const have = progress.cards.includes(c.id);
                return (
                  <li key={c.id} className={`${styles.kcard} ${have ? "" : styles.kcardLocked}`} aria-label={have ? undefined : "Noch nicht entdeckt"}>
                    <span className={styles.kcardTitle}>{have ? c.title : "?"}</span>
                    {have && <span className={styles.kcardText}>{c.text}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div id="hb-abzeichen" className={styles.bookSection}>
        <h2 className={styles.h2}>Abzeichen</h2>
        <BadgeList progress={progress} />
      </div>

      <div id="hb-funde" className={styles.bookSection}>
        <h2 className={styles.h2}>Entdeckte Gegenstände</h2>
        {progress.found.length ? (
          <ul className={styles.found}>
            {progress.found.map((id) => {
              const f = FOUND_ITEMS[id];
              if (!f) return null;
              return (
                <li key={id} className={styles.foundItem}>
                  {isItemName(f.icon) && <ItemIcon name={f.icon} className={styles.foundIcon} />}
                  <span>
                    <strong>{f.name}</strong>
                    <br />
                    {f.text}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.empty}>Hier landet, was du auf dem Hof entdeckst. Vielleicht findet Krümel ja etwas …</p>
        )}
      </div>

      <div id="hb-tage" className={styles.bookSection}>
        <h2 className={styles.h2}>Tageserfolge</h2>
        {progress.history.length ? (
          <ul className={styles.days}>
            {progress.history.map((d) => (
              <li key={`${d.number}-${d.date}`} className={styles.dayRow}>
                <span className={styles.dayNum}>Tag {d.number}</span>
                <span>mit {HORSE_NAMES[d.horse]}</span>
                <span className={styles.dayXp}>+{d.xp} XP</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Nach deinem ersten Hoftag steht hier, was du geschafft hast.</p>
        )}
      </div>

      {HOFBUCH_SECTIONS.filter((s) => !s.ready).map((s) => (
        <div key={s.id} id={`hb-${s.id}`} className={`${styles.bookSection} ${styles.soon}`}>
          <h2 className={styles.h2}>{s.title}</h2>
          <p className={styles.empty}>Dieser Teil des Hofbuchs kommt bald.</p>
        </div>
      ))}
    </section>
  );
}

function BadgeList({ progress }: { progress: HoftagProgress }) {
  return (
    <ul className={styles.badges}>
      {BADGES.map((b) => {
        const have = progress.badges.includes(b.id);
        return (
          <li key={b.id} className={`${styles.badge} ${have ? "" : styles.badgeLocked}`}>
            <UiIcon name="medal" className={styles.badgeIcon} />
            <span>
              <strong>{b.name}</strong>
              <br />
              {have ? b.text : "Noch nicht verdient"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Erfolge ---------- */

export function ErfolgeScreen({ progress }: { progress: HoftagProgress }) {
  const lv = levelFor(progress.xp);
  return (
    <section className={styles.book} aria-labelledby="erf-title">
      <p className={styles.kicker}>Dein Fortschritt</p>
      <h1 id="erf-title" className={styles.h1}>
        Erfolge
      </h1>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Level {lv.current.level}</p>
        <h2 className={styles.cardTitle}>{lv.current.name}</h2>
        <LevelBar xp={progress.xp} />
        <p className={styles.small}>
          {progress.xp} XP{lv.next ? ` · nächstes Level: ${lv.next.name} ab ${lv.next.minXp} XP` : " · höchstes Level erreicht"}
        </p>
        <dl className={styles.rewards}>
          <div>
            <dt>Hoftage</dt>
            <dd>{progress.daysCompleted}</dd>
          </div>
          <div>
            <dt>Pferdewissen</dt>
            <dd>{progress.knowledge}</dd>
          </div>
        </dl>
      </div>

      <h2 className={styles.h2}>Vertrauen</h2>
      <ul className={styles.trustList}>
        {HORSE_IDS.map((id) => {
          const h = horses.find((x) => x.slug === id)!;
          const v = progress.trust[id] ?? 0;
          return (
            <li key={id} className={styles.trustRow} style={{ background: h.tint }}>
              <HorsePortrait horse={h} className={styles.trustImg} sizes="64px" />
              <span>
                <strong>{h.name}</strong>
                <br />
                {v > 0 ? `${trustLabel(v)} · ${v}` : "Noch nicht gepflegt"}
              </span>
            </li>
          );
        })}
      </ul>
      <p className={styles.small}>Vertrauen wächst mit jedem Hoftag – und geht nie verloren, auch wenn du mal eine Pause machst.</p>

      <h2 className={styles.h2}>Abzeichen</h2>
      <BadgeList progress={progress} />
    </section>
  );
}
