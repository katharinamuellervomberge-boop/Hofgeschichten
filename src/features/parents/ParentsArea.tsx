"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { games } from "@/content/games";
import { site } from "@/content/site";
import { freeStamps } from "@/content/stamps";
import { LEVELS } from "@/engine/types";
import { earnedStamps } from "@/lib/progress/stamps";
import { progressActions, useProgress } from "@/lib/progress/store";
import { hasLocalGermanVoice, recordingsAvailable, speechSupported, voiceEnabled } from "@/lib/speech";
import { AcademyParents } from "@/features/akademie/AcademyParents";
import { academyDoneCount } from "@/features/akademie/progress";
import type { MembershipStatus } from "@/lib/entitlements/server";
import { MembershipPanel } from "./MembershipPanel";
import { UnlockPanel } from "./UnlockPanel";
import styles from "./ParentsArea.module.css";

type Props = {
  owned: string[];
  accessible: string[];
  membership: MembershipStatus;
  orderUnlockAvailable: boolean;
  codeUnlockAvailable: boolean;
};

export function ParentsArea({ owned, accessible, membership, orderUnlockAvailable, codeUnlockAvailable }: Props) {
  const progress = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [voice, setVoice] = useState<"unknown" | "yes" | "no">("unknown");

  useEffect(() => {
    if (!voiceEnabled || !speechSupported()) {
      setVoice("no");
      return;
    }
    const check = () => setVoice(hasLocalGermanVoice() ? "yes" : "no");
    const t = window.setTimeout(check, 700);
    window.speechSynthesis.addEventListener?.("voiceschanged", check);
    return () => {
      window.clearTimeout(t);
      window.speechSynthesis.removeEventListener?.("voiceschanged", check);
    };
  }, []);

  const earned = earnedStamps(progress);
  const freeEarned = freeStamps.filter((s) => earned.has(s.id)).length;
  const missionsDone = Object.values(progress.adventures).reduce((n, a) => n + a.missions.length, 0);

  return (
    <div className={`page ${styles.parents}`}>
      <header className={styles.head}>
        <p className="eyebrow">Für Erwachsene</p>
        <h1 className={styles.title}>Elternbereich</h1>
        <p className={styles.lead}>
          „Die Hofgeschichten“ ist eine Produktion von {site.producer}: eine Lernwelt und Detektivspiele rund um das
          echte Leben mit Pferden.
        </p>
      </header>

      <div className={styles.grid}>
        <MembershipPanel membership={membership} />
        <UnlockPanel
          owned={owned}
          accessible={accessible}
          member={membership.active}
          orderUnlockAvailable={orderUnlockAvailable}
          codeUnlockAvailable={codeUnlockAvailable}
        />

        <section className={styles.card} aria-labelledby="p-progress">
          <h2 id="p-progress">Fortschritt auf diesem Gerät</h2>
          <dl className={styles.stats}>
            <div>
              <dt>Stempel Hofwelt</dt>
              <dd>
                {freeEarned} / {freeStamps.length}
              </dd>
            </div>
            <div>
              <dt>Missionen gelöst</dt>
              <dd>{missionsDone}</dd>
            </div>
            <div>
              <dt>Pferde besucht</dt>
              <dd>{progress.horsesVisited.length} / 3</dd>
            </div>
            <div>
              <dt>Lektionen Reitakademie</dt>
              <dd>{academyDoneCount(progress)} / 40</dd>
            </div>
          </dl>
        </section>

        <section className={styles.card} aria-labelledby="p-levels">
          <h2 id="p-levels">Altersstufen</h2>
          <ul className={styles.learnList}>
            {LEVELS.map((l) => (
              <li key={l.id}>
                <strong>{l.label}</strong> <span className={styles.age}>{l.ages}</span>
                <p>
                  {l.id === "leicht"
                    ? voiceEnabled
                      ? "Große Bilder, wenig Text, einfache Aufgaben. Aufgaben werden automatisch vorgelesen (wenn das Gerät eine deutsche Stimme hat)."
                      : "Große Bilder, wenig Text, einfache Aufgaben mit Bild-Antworten. Für Kinder, die noch nicht lesen, am schönsten gemeinsam mit einem Erwachsenen oder größeren Geschwistern."
                    : "Mehr Text, zusammenhängende Geschichte, kniffligere Rätsel und mehr Pferdewissen."}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.card} aria-labelledby="p-learn">
          <h2 id="p-learn">Was Ihr Kind lernt</h2>
          <ul className={styles.learnList}>
            <li>
              <strong>Pferde kennenlernen</strong>
              <p>Körperteile des Pferdes benennen – von Ohren und Huf bis Widerrist, Kruppe und Fessel.</p>
            </li>
            {games.map((g) => (
              <li key={g.id}>
                <strong>{g.title}</strong>
                <p>{g.learns}</p>
              </li>
            ))}
            <li>
              <strong>Die Reitakademie</strong>
              <p>Reitwissen in 8 Lernwelten – von Sicherheit und Sitz über Hilfen und Gangarten bis zu fairem Umgang mit dem Pferd. Welten 1–3 kostenlos, Welten 4–8 in der Großen Akademie. Details weiter unten.</p>
            </li>
          </ul>
        </section>

        <AcademyParents />

        <section className={styles.card} aria-labelledby="p-privacy">
          <h2 id="p-privacy">Datenschutz &amp; Sicherheit</h2>
          <ul className={styles.checks}>
            {[
              "Kein Kinderkonto, keine Anmeldung, kein Name.",
              "Der Spielfortschritt liegt nur lokal im Browser dieses Geräts.",
              "Keine Werbung, keine Tracker, keine Analyse-Cookies.",
              "Keine Chats und keine öffentlichen Profile.",
              "Käufe finden nur im Shop statt – Kinder sehen in der App keine Preise und keine Kaufknöpfe.",
              "Die Freischaltung speichert auf dem Gerät nur, was freigeschaltet ist, und eine zufällige Gerätekennung – keine E-Mail, keine Bestelldaten.",
              ...(voiceEnabled
                ? [
                    "Die Vorlesestimme ist eine vorab aufgenommene KI-Stimme. Beim Spielen wird kein Text an Sprachdienste geschickt; fehlt eine Aufnahme, liest die Stimme des Geräts vor.",
                  ]
                : []),
            ].map((t) => (
              <li key={t}>
                <Icon name="check" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.card} aria-labelledby="p-settings">
          <h2 id="p-settings">Einstellungen</h2>

          {voiceEnabled && (
          <div className={styles.setting}>
            <div>
              <p className={styles.settingTitle}>Vorlesen</p>
              <p className={styles.settingHint}>
                {voice === "no" && !recordingsAvailable()
                  ? "Auf diesem Gerät ist keine lokale deutsche Stimme verfügbar. Die Lautsprecher-Knöpfe werden daher ausgeblendet."
                  : "Lautsprecher-Knöpfe lesen Texte für Kinder vor, die noch nicht lesen können. In der Stufe „Leicht“ werden Aufgaben automatisch vorgelesen."}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={progress.settings.speech}
              className={`${styles.switch} ${progress.settings.speech ? styles.on : ""}`}
              onClick={() => progressActions.setSpeech(!progress.settings.speech)}
            >
              <span className="visually-hidden">Vorlesen</span>
            </button>
          </div>
          )}

          <div className={styles.setting}>
            <div>
              <p className={styles.settingTitle}>Fortschritt zurücksetzen</p>
              <p className={styles.settingHint}>Löscht alle Stempel, Missionen und Hinweise auf diesem Gerät. Käufe bleiben erhalten.</p>
            </div>
            {!confirmReset ? (
              <button type="button" className={styles.secondaryBtn} onClick={() => setConfirmReset(true)}>
                Zurücksetzen
              </button>
            ) : (
              <div className={styles.confirm}>
                <button
                  type="button"
                  className={styles.dangerBtn}
                  onClick={() => {
                    progressActions.resetAll();
                    setConfirmReset(false);
                    setResetDone(true);
                  }}
                >
                  Ja, löschen
                </button>
                <button type="button" className={styles.secondaryBtn} onClick={() => setConfirmReset(false)}>
                  Abbrechen
                </button>
              </div>
            )}
          </div>
          {resetDone && (
            <p className={styles.resetDone} role="status">
              Der Fortschritt wurde zurückgesetzt.
            </p>
          )}
        </section>

        <section className={`${styles.card} ${styles.shop}`} aria-labelledby="p-shop">
          <h2 id="p-shop">Horse &amp; Harmonie Shop</h2>
          <p>Bücher, Abenteuer und mehr rund um die Hofgeschichten. Der Link öffnet eine externe Website in einem neuen Tab.</p>
          <a href={site.shopUrl} target="_blank" rel="noopener noreferrer" className={styles.shopLinkLight}>
            <span>{site.shopLabel}</span>
            <Icon name="external" />
          </a>
        </section>

        <section className={styles.card} aria-labelledby="p-legal">
          <h2 id="p-legal">Rechtliches</h2>
          <ul className={styles.legal}>
            <li>
              {site.legal.imprintUrl ? <a href={site.legal.imprintUrl}>Impressum</a> : <span>Impressum</span>}
              {!site.legal.imprintUrl && <PlaceholderBadge>Wird ergänzt</PlaceholderBadge>}
            </li>
            <li>
              {site.legal.termsUrl ? <a href={site.legal.termsUrl}>AGB</a> : <span>AGB</span>}
              {!site.legal.termsUrl && <PlaceholderBadge>Wird ergänzt</PlaceholderBadge>}
            </li>
            <li>
              {site.legal.privacyUrl ? <a href={site.legal.privacyUrl}>Datenschutzerklärung</a> : <span>Datenschutzerklärung</span>}
              {!site.legal.privacyUrl && <PlaceholderBadge>Wird ergänzt</PlaceholderBadge>}
            </li>
            <li>
              <a href={site.legal.withdrawalUrl}>Widerrufsbelehrung</a>
            </li>
            <li>
              <a href={site.legal.cancelUrl}>Verträge hier kündigen</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
