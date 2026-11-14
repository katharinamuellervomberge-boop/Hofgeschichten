import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { ridingSpace } from "@/content/products";
import { MoodIcon } from "./ui";
import s from "./tagebuch.module.css";

/**
 * Vorschau für alle ohne Riding Space (seit 14.11.2026 eigenes Produkt; Bestandskäufer der
 * Reitakademie und Mitglieder schalten weiterhin frei).
 * Zeigt nur Beispielinhalte, die klar als Beispiel gekennzeichnet sind – keine echten Daten.
 */
export function DiaryPreview() {
  return (
    <div className={`page ${s.diary}`}>
      <div className={s.stack}>
        <header className={s.hero}>
          <p className="eyebrow">Riding Space</p>
          <h1 className={s.heroTitle}>Reitertagebuch, Trainingsplaner &amp; Rider Coach</h1>
          <p className={s.heroSub}>Jede Reitstunde festhalten. Jede Woche planen. Hilfe, wenn es im Sattel hakt.</p>
        </header>

        <div className={s.previewStage} aria-label="Beispielansicht">
          <span className={s.previewBadge}>Beispiel</span>
          <div className={s.previewEntry}>
            <span className={s.entryDate}>
              <strong>14</strong>
              <span>Nov.</span>
            </span>
            <span className={s.entryBody}>
              <span className={s.entryMeta}>Schulpferd Paula · Reitunterricht · 45 Min.</span>
              <span className={s.entryText}>Zum ersten Mal ganz alleine angaloppiert – und Paula hat sofort verstanden, was ich wollte!</span>
            </span>
            <MoodIcon mood="super" className={`${s.entryMood} ${s.moodInk_super}`} />
          </div>
          <div className={s.previewGoal}>
            <span className={s.tag}>Ziel geschafft</span>
            <strong>Sicher angaloppieren</strong>
          </div>
        </div>

        <ul className={s.featureList}>
          <li>
            <Icon name="horse" /> Steckbriefe für deine Pferde – eigenes Pferd, Reitbeteiligung oder Schulpferd
          </li>
          <li>
            <Icon name="pass" /> Reitstunden in Sekunden eintragen, mit fünf Fragen zum Nachdenken
          </li>
          <li>
            <Icon name="check" /> Eigene Ziele setzen und abhaken – ohne Ranglisten, ohne Druck
          </li>
          <li>
            <Icon name="plan" /> Trainingsplaner für Woche und Monat – mit Plan-Builder, Ruhetagen und Zielen mit Verlauf
          </li>
          <li>
            <Icon name="check" /> Rider Coach: Problem im Sattel beschreiben, passende Übungen und einen Wochenplan bekommen
          </li>
          <li>
            <Icon name="star" /> Lieblingsmomente sammeln und jeden Monat zurückblicken
          </li>
        </ul>

        <section className={`${s.card} ${s.upgrade}`}>
          <h2 className={s.cardTitle}>Riding Space – {ridingSpace.price} für 12 Monate</h2>
          <p className={s.small}>
            Kein Abo: Der Zugang endet nach 12 Monaten automatisch. Alle Einträge bleiben privat auf eurem Gerät. Wer die
            Reitakademie vor dem 15.11.2026 gekauft hat, hat den Riding Space bereits inklusive.
          </p>
          <div className={s.actions}>
            <a href={ridingSpace.checkoutUrl} target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>
              Riding Space kaufen
            </a>
            <Link href="/eltern#riding-space" className={s.btnText}>
              Schon gekauft? Freischalten
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
