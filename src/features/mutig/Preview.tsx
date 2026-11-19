import Link from "@/i18n/Link";
import { WEEKS, WEGE, WEEK_RELEASE, releaseLabel } from "@/content/mutig/katalog";
import { mutigReiten } from "@/content/products";
import styles from "./mutig.module.css";

/** Vorschau für alle, die das Programm noch nicht freigeschaltet haben – ohne Programminhalte */
export function Preview() {
  const now = Date.now();
  return (
    <div className={styles.stack}>
      <section className={styles.hero} aria-labelledby="mr-title">
        <p className={styles.kicker}>Neu · 6-Wochen-Programm</p>
        <h1 id="mr-title" className={styles.h1}>Mutig reiten</h1>
        <p className={styles.lead}>
          Angst beim Reiten ist keine Schwäche, sondern eine Schutzreaktion. In sechs Wochen lernst du in kleinen Schritten, wieder selbst zu
          entscheiden, was du dir zutraust.
        </p>
        <div className={styles.row}>
          <Link className={styles.btn} href="/mutig-reiten/check">Kostenlosen Angst-Check machen</Link>
        </div>
        <p className={styles.muted}>3 Minuten · ohne Konto · deine Antworten bleiben auf deinem Gerät</p>
      </section>

      <section className={styles.card} aria-labelledby="mr-wege">
        <h2 id="mr-wege" className={styles.h2}>Drei Wege, ein Programm</h2>
        <ul className={styles.features}>
          {Object.values(WEGE).map((w) => (
            <li key={w.titel}>
              <strong>{w.titel}</strong>
              <p className={styles.muted}>{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.card} aria-labelledby="mr-inhalt">
        <h2 id="mr-inhalt" className={styles.h2}>Das bekommst du</h2>
        <ul className={styles.steps}>
          <li>30 kurze Einheiten, je etwa 10–15 Minuten, mit Audio-Impuls zum Hören oder Lesen</li>
          <li>Deine persönliche Mut-Leiter: 10 Stufen vom Boden bis zu deinem eigenen Ziel</li>
          <li>Das Mut-Barometer, mit dem du siehst, wie sich deine Angst verändert</li>
          <li>8 Werkzeuge für Kopf und Körper, die direkt am Stall funktionieren</li>
          <li>Zusatzlektionen für deinen Weg und klare Sicherheitsregeln</li>
          <li>Ein Mut-Tagebuch – alle Einträge bleiben auf deinem Gerät</li>
        </ul>
      </section>

      <section className={styles.card} aria-labelledby="mr-wochen">
        <h2 id="mr-wochen" className={styles.h2}>Die sechs Wochen</h2>
        <ul className={styles.weekList}>
          {WEEKS.map((w, k) => {
            const d = new Date(WEEK_RELEASE[k + 1]);
            return (
              <li key={w}>
                <span>Woche {k + 1} · {w}</span>
                <span className={styles.xs}>{d.getTime() <= now ? "verfügbar" : `ab ${releaseLabel(d)}`}</span>
              </li>
            );
          })}
        </ul>
        <p className={styles.xs}>Die Wochen 3 bis 6 erscheinen gestaffelt. Du startest sofort mit Woche 1 und 2.</p>
      </section>

      <section className={styles.cardForest} aria-labelledby="mr-preis">
        <h2 id="mr-preis" className={styles.h2}>Einmal kaufen, kein Abo</h2>
        <p className={styles.price}>
          {mutigReiten.price}
          {mutigReiten.regularPrice !== mutigReiten.price && <s>{mutigReiten.regularPrice}</s>}
        </p>
        <p className={styles.muted}>Einführungspreis. Nach dem Kauf schaltest du das Programm mit deiner Bestellnummer frei.</p>
        <div className={styles.row}>
          {mutigReiten.checkoutUrl ? (
            <a className={styles.btn} href={mutigReiten.checkoutUrl}>Jetzt holen</a>
          ) : (
            <span className={styles.muted}>Der Verkauf startet in Kürze.</span>
          )}
          <Link className={styles.btnGhost} href="/eltern">Schon gekauft? Freischalten</Link>
        </div>
      </section>

      <p className={styles.xs}>
        Mutig reiten ist ein Selbsthilfe-Programm und ersetzt keine ärztliche oder psychotherapeutische Behandlung.{" "}
        <Link href="/mutig-reiten/hilfe">Hilfe und Anlaufstellen</Link>
      </p>
    </div>
  );
}
