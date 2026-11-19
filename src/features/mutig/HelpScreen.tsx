import Link from "@/i18n/Link";
import { HELP } from "@/content/mutig/katalog";
import styles from "./mutig.module.css";

/** Hilfe und Anlaufstellen – für alle frei zugänglich */
export function HelpScreen({ owned }: { owned: boolean }) {
  return (
    <div className={styles.narrow}>
      <div className={styles.card}>
        <p className={styles.kicker}>Mutig reiten</p>
        <h1 className={styles.h1}>Hilfe und Anlaufstellen</h1>
        <p className={styles.p}>
          Mutig reiten hilft bei Angst beim Reiten. Es ersetzt keine ärztliche oder psychotherapeutische Behandlung. Hol dir bitte zusätzlich
          Unterstützung, wenn eines davon auf dich zutrifft:
        </p>
        <ul className={styles.steps}>
          <li>Bilder vom Erlebnis kommen immer wieder, auch ungewollt.</li>
          <li>Du hast Albträume oder schläfst schlecht.</li>
          <li>Die Angst taucht auch außerhalb des Stalls auf oder schränkt deinen Alltag ein.</li>
          <li>Die Beschwerden halten länger als etwa vier Wochen an.</li>
        </ul>
      </div>
      <div className={styles.card}>
        <h2 className={styles.h2}>Wo du Hilfe findest</h2>
        <ul className={styles.steps}>
          <li>Deine Hausärztin oder dein Hausarzt ist eine gute erste Anlaufstelle.</li>
          <li>Termine bei Psychotherapeutinnen vermittelt der Terminservice der Kassenärztlichen Vereinigung unter <strong>{HELP.terminservice}</strong>.</li>
          <li>Die TelefonSeelsorge ist rund um die Uhr erreichbar, kostenlos und anonym: <strong>{HELP.seelsorge}</strong> oder <strong>{HELP.seelsorge2}</strong>.</li>
          <li>Im Notfall: <strong>112</strong>.</li>
        </ul>
      </div>
      <div className={styles.card}>
        <h2 className={styles.h2}>Nach der Geburt</h2>
        <p className={styles.p}>
          Wann du wieder reiten kannst, entscheidet deine Hebamme, Frauenärztin oder Beckenboden-Physiotherapeutin. Pausiere und lass dich
          untersuchen bei Druckgefühl nach unten, ungewolltem Urin- oder Stuhlverlust oder Schmerzen im Becken oder Rücken.
        </p>
      </div>
      <Link className={styles.btnGhost} href={owned ? "/mutig-reiten" : "/mutig-reiten/check"}>
        {owned ? "Zurück zum Programm" : "Zum kostenlosen Angst-Check"}
      </Link>
    </div>
  );
}
