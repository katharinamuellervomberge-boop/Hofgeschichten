import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { MoodIcon } from "./ui";
import s from "./tagebuch.module.css";

/**
 * Vorschau für Nicht-Mitglieder (auch für Käufer der Reitakademie ohne Mitgliedschaft).
 * Zeigt nur Beispielinhalte, die klar als Beispiel gekennzeichnet sind – keine echten Daten.
 */
export function DiaryPreview({ hasAcademy }: { hasAcademy: boolean }) {
  return (
    <div className={`page ${s.diary}`}>
      <div className={s.stack}>
        <header className={s.hero}>
          <p className="eyebrow">Mein Reitertagebuch · für Mitglieder</p>
          <h1 className={s.heroTitle}>Dein Reitertagebuch</h1>
          <p className={s.heroSub}>Deine Pferde. Deine Fortschritte. Deine schönsten Momente.</p>
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
            <Icon name="star" /> Lieblingsmomente sammeln und jeden Monat zurückblicken
          </li>
        </ul>

        <section className={`${s.card} ${s.upgrade}`}>
          <h2 className={s.cardTitle}>Teil der Hof-Mitgliedschaft</h2>
          <p className={s.small}>
            {hasAcademy
              ? "Du hast die Reitakademie freigeschaltet – schön! Das Reitertagebuch gehört zur Hof-Mitgliedschaft und ist dort zusätzlich enthalten."
              : "Das Reitertagebuch ist für alle Mitglieder enthalten. Die Einträge bleiben privat auf eurem Gerät."}
          </p>
          <div className={s.actions}>
            <Link href="/mitgliedschaft" className={s.btnPrimary}>
              Mitgliedschaft ansehen
            </Link>
            <Link href="/eltern" className={s.btnGhost}>
              Schon Mitglied? Freischalten
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
