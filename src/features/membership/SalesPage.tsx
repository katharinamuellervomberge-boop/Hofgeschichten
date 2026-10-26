import Link from "next/link";
import { HorsePortrait } from "@/components/illustrations/HorsePortrait";
import { Icon } from "@/components/illustrations/Icons";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { SeasonArt } from "@/components/illustrations/ReleaseArt";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { LegalLinks } from "@/components/layout/LegalPage";
import { characters } from "@/content/characters";
import { hofjahrBadges } from "@/content/hofjahr";
import { horses } from "@/content/horses";
import { hofpost, membership as plan, releases, yearPlan } from "@/content/membership";
import { site } from "@/content/site";
import type { Visual } from "@/engine/types";
import { VisualView } from "@/engine/VisualView";
import { WeekCard } from "@/features/hofjahr/WeekCard";
import { AdventureCover } from "@/features/adventure/AdventureCover";
import type { MembershipStatus } from "@/lib/entitlements/server";
import { HofpostHint, HofpostOffer } from "./HofpostOffer";
import styles from "./SalesPage.module.css";

const kids = characters.filter((c) => ["lea", "mila", "ben"].includes(c.slug));

const FEATURES: Array<{ title: string; text: string; art: Visual | "adventure" | "badge" | "kids" }> = [
  { title: "Hofgeschichten", text: "Erlebe neue Abenteuer mit Lea, Mila, Ben und Krümel.", art: "kids" },
  { title: "Große Reitakademie", text: "Schritt, Trab, Galopp und Reiten in der Bahn – mit neuen Lektionen jeden Monat.", art: { kind: "scene", scene: "ak-reiter-sitz" } },
  { title: "Hofmissionen", text: "Übernimm spielerisch Verantwortung für den Hof.", art: { kind: "scene", scene: "ht-stallbox" } },
  { title: "Detektivabenteuer", text: "Löse spannende Rätsel und Geheimnisse.", art: "adventure" },
  { title: "Wissen & Spiele", text: "Entdecke spielerisch Neues über Tiere, Natur und das Leben.", art: { kind: "head", horse: "scrabble", mood: "neugierig" } },
  { title: "Sammelabzeichen", text: "Meistere Aufgaben und sammle Auszeichnungen.", art: "badge" },
];

function Cta({ status, second, orderUnlock }: { status: MembershipStatus; second?: boolean; orderUnlock: boolean }) {
  if (status.active) {
    return (
      <p className={styles.memberNote}>
        <Icon name="check" /> Auf diesem Gerät ist die Mitgliedschaft bereits aktiv.
      </p>
    );
  }
  if (!plan.checkoutUrl) {
    // Kein Platzhalter-Kaufknopf: Solange der Shop nicht bereit ist, gibt es keinen Button.
    return (
      <p className={styles.soon} role="note">
        Der Verkauf der {plan.name} startet in Kürze im {site.shopLabel}.
      </p>
    );
  }
  return (
    <div className={styles.ctaWrap}>
      <a href={plan.checkoutUrl} className={styles.cta} target="_blank" rel="noopener noreferrer">
        Jetzt Founder-Mitglied werden
        <Icon name="external" />
      </a>
      <p className={styles.ctaHint}>
        Sicherer Checkout im Horse &amp; Harmonie Shop – dort sehen Sie vor dem Kauf alle Bedingungen.{" "}
        {orderUnlock
          ? "Danach schalten Sie im Elternbereich mit Bestellnummer und E-Mail-Adresse frei."
          : "Ihren persönlichen Freischaltcode erhalten Sie nach dem Kauf per E-Mail; eingeben im Elternbereich."}
      </p>
    </div>
  );
}

/** Verkaufsseite der Founder-Jahresmitgliedschaft (für Eltern). */
export function SalesPage({ status, orderUnlock = false }: { status: MembershipStatus; orderUnlock?: boolean }) {
  return (
    <div className={`page ${styles.page}`}>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="sp-hero">
        <div className={styles.heroText}>
          <p className="eyebrow">{plan.name} 2026</p>
          <h1 id="sp-hero" className={styles.h1}>
            Ein ganzes Jahr voller Hofabenteuer.
          </h1>
          <p className={styles.sub}>
            Eine Welt voller Pferde, Geschichten, Rätsel und kleiner Entdeckungen. Spielerisch lernen, Abenteuer erleben und jeden
            Freitag etwas Neues entdecken.
          </p>
          <div className={styles.price}>
            <span className={styles.priceLabel}>Founder-Jahresmitgliedschaft</span>
            <span className={styles.priceValue}>
              {plan.price} <small>für das ganze erste Jahr</small>
            </span>
            <span className={styles.priceNote}>
              <strong>Einmaliger Jahresbeitrag – keine monatlichen Zahlungen im ersten Jahr</strong> (rechnerisch {plan.perMonthEquivalent} im
              Monat). Ab dem 13. Monat {plan.followUpPrice} {plan.followUpInterval}, dann monatlich kündbar ·{" "}
              <a href="#bedingungen">Bedingungen</a>
            </span>
          </div>
          <Cta status={status} orderUnlock={orderUnlock} />
          <p className={styles.first}>Die ersten neuen Premium-Inhalte erscheinen im {plan.firstReleaseLabel}.</p>
          <HofpostHint />
        </div>
        <div className={styles.heroArt} aria-hidden>
          <div className={styles.horses}>
            {horses.map((h, i) => (
              <div key={h.slug} className={`${styles.horse} ${styles[`horse${i}`]}`}>
                <HorsePortrait horse={h} sizes="(min-width: 900px) 220px, 40vw" priority={i === 0} />
              </div>
            ))}
          </div>
          <div className={styles.heroKids}>
            {kids.map((k) => (
              <KidPortrait key={k.slug} kid={k} sizes="80px" />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Hofpost ---------- */}
      <HofpostOffer status={status} />

      {/* ---------- Enthalten ---------- */}
      <section aria-labelledby="sp-inhalt" className={styles.section}>
        <p className="eyebrow">Das ist enthalten</p>
        <h2 id="sp-inhalt" className={styles.h2}>
          Eine Hofwelt, die mitwächst
        </h2>
        <ul className={styles.features}>
          {FEATURES.map((f) => (
            <li key={f.title} className={styles.feature}>
              <div className={styles.featureArt} aria-hidden>
                {f.art === "kids" ? (
                  <div className={styles.featureKids}>
                    {kids.map((k) => (
                      <KidPortrait key={k.slug} kid={k} sizes="64px" />
                    ))}
                  </div>
                ) : f.art === "adventure" ? (
                  <AdventureCover slug="geisterweide" />
                ) : f.art === "badge" ? (
                  <div className={styles.featureBadges}>
                    {hofjahrBadges.slice(0, 3).map((b, i) => (
                      <StampSeal key={b.id} stamp={b} earned tilt={[-8, 4, -3][i]} />
                    ))}
                  </div>
                ) : (
                  <VisualView v={f.art} decorative />
                )}
              </div>
              <h3 className={styles.h3}>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.bonus}>
          <Icon name="star" />
          <span>Ab sofort dabei: alle bisherigen Premium-Detektivfälle, zum Beispiel „Das Geheimnis der Geisterweide“.</span>
        </p>
      </section>

      {/* ---------- November ---------- */}
      <section aria-labelledby="sp-november" className={styles.section}>
        <p className="eyebrow">Vorschau</p>
        <h2 id="sp-november" className={styles.h2}>
          Dein November auf dem Hof
        </h2>
        <p className={styles.lead}>Vier Freitage. Vier neue Abenteuer. Und ein ganzes Hofjahr, das gerade erst beginnt.</p>
        <ul className={styles.weeks}>
          {releases.map((r) => (
            <li key={r.slug}>
              <WeekCard release={r} state="upcoming" audience="parents" />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Jahr ---------- */}
      <section aria-labelledby="sp-jahr" className={styles.section}>
        <p className="eyebrow">Jahresplanung</p>
        <h2 id="sp-jahr" className={styles.h2}>
          12 Monate. Eine ganze Welt.
        </h2>
        <ol className={styles.months}>
          {yearPlan.map((m, i) => (
            <li key={`${m.month}-${m.year}`} className={`${styles.month} ${i === 0 ? styles.monthNow : ""}`}>
              <SeasonArt season={m.season} className={styles.monthArt} />
              <span className={styles.monthName}>
                {m.month} {m.year}
              </span>
              <span className={styles.monthTheme}>{m.theme}</span>
              <span className={styles.monthStatus}>{i === 0 ? "Start am 6. November" : "Vorschau"}</span>
            </li>
          ))}
        </ol>
        <p className={styles.small}>
          Die Monatsthemen sind unsere redaktionelle Planung. Welche Geschichten, Spiele und Lektionen es genau werden, kann sich
          noch ändern.
        </p>
      </section>

      {/* ---------- Eltern ---------- */}
      <section aria-labelledby="sp-eltern" className={`${styles.section} ${styles.parents}`}>
        <h2 id="sp-eltern" className={styles.h2}>
          Spielzeit, bei der etwas hängen bleibt.
        </h2>
        <p className={styles.lead}>
          Hof Stories verbindet spannende Geschichten und interaktive Abenteuer mit altersgerechtem Wissen rund um Pferde, Natur und
          das Zusammenleben. Kinder entdecken spielerisch, wie Verantwortung, Rücksichtnahme und selbstständiges Denken im Alltag
          aussehen können.
        </p>
        <ul className={styles.pillars}>
          <li>
            <h3 className={styles.h3}>Wissen entdecken</h3>
            <p>Pferde, Tiere, Natur und Zusammenhänge verstehen.</p>
          </li>
          <li>
            <h3 className={styles.h3}>Verantwortung erleben</h3>
            <p>Entscheidungen treffen und spielerisch Fürsorge kennenlernen.</p>
          </li>
          <li>
            <h3 className={styles.h3}>Geschichten erleben</h3>
            <p>Lesen, Rätseln und mitdenken.</p>
          </li>
        </ul>
        <ul className={styles.facts}>
          {[
            "Für Kinder von 4 bis 12 Jahren, in zwei Stufen: Leicht (4–7) und Mittel (8–12)",
            "Kindgerechte Bedienung mit großen Bildern und Knöpfen",
            "Keine Fremdwerbung im Kinderbereich",
            "Keine öffentlichen Kinderprofile, kein Kinderkonto",
            "Kein Chat mit Fremden",
            "Kinder sehen keine Preise und keine Kaufknöpfe",
            "Neue Inhalte jeden Freitag ab November",
          ].map((t) => (
            <li key={t}>
              <Icon name="check" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Bedingungen ---------- */}
      <section aria-labelledby="bedingungen-h" id="bedingungen" className={`${styles.section} ${styles.terms}`}>
        <h2 className={styles.h2} id="bedingungen-h">
          Preis &amp; Vertragsbedingungen
        </h2>
        <dl className={styles.termList}>
          <div>
            <dt>Preis</dt>
            <dd>
              {plan.price} als einmaliger Jahresbeitrag für die ersten {plan.termMonths} Monate, fällig zu Beginn der Mitgliedschaft. Im
              ersten Jahr gibt es keine monatlichen Zahlungen.
            </dd>
          </div>
          <div>
            <dt>Laufzeit</dt>
            <dd>Mindestlaufzeit {plan.termMonths} Monate. Kündigung zum Ende der Mindestlaufzeit mit einer Frist von einem Monat.</dd>
          </div>
          <div>
            <dt>Danach</dt>
            <dd>
              Ohne Kündigung läuft die Mitgliedschaft auf unbestimmte Zeit weiter: ab dem 13. Monat {plan.followUpPrice}{" "}
              {plan.followUpInterval}, jederzeit mit einer Frist von höchstens einem Monat kündbar.
            </dd>
          </div>
          <div>
            <dt>Kündigung</dt>
            <dd>
              Jederzeit online über <Link href={site.legal.cancelUrl}>„Verträge hier kündigen“</Link> oder per E-Mail an{" "}
              {plan.supportEmail}.
            </dd>
          </div>
          <div>
            <dt>Zugang</dt>
            <dd>
              Nach dem Kauf schalten Sie die Mitgliedschaft im Elternbereich frei – mit Bestellnummer und E-Mail-Adresse oder mit dem
              Freischaltcode, den Sie per E-Mail erhalten. Sie gilt für ein Gerät; ein Gerätewechsel ist jederzeit möglich.
            </dd>
          </div>
          <div>
            <dt>Mit Hofpost</dt>
            <dd>
              {hofpost.founderName}: {hofpost.price} als einmaliger Jahresbeitrag für die ersten {plan.termMonths} Monate, inklusive{" "}
              {hofpost.letters} Briefe (ein Brief pro Monat) und Versand innerhalb Deutschlands. Der Briefversand beginnt{" "}
              {hofpost.firstLetterLabel}; die App-Mitgliedschaft ist ab der Freischaltung nutzbar. Laufzeit und Kündigung wie oben; ohne
              Kündigung ab dem 13. Monat {hofpost.followUpPrice} {hofpost.followUpInterval} inklusive Brief, alternativ der dann gültige
              Jahrespreis. Die Lieferadresse geben Sie im Shop an, den Vornamen des Kindes für die Anrede fragen wir per E-Mail ab; Adressänderungen bis zum 25. eines Monats per E-Mail
              gelten für den nächsten Brief.
            </dd>
          </div>
          <div>
            <dt>Spätere Preise</dt>
            <dd>
              Für spätere Neukundinnen und Neukunden planen wir {plan.plannedRegular.map((p) => p.price).join(" bzw. ")}. Diese Preise
              stehen noch nicht verbindlich fest und betreffen Ihre Founder-Jahresmitgliedschaft nicht.
            </dd>
          </div>
        </dl>
        <p className={styles.small}>
          Es gelten unsere <Link href="/agb">AGB</Link> und die <Link href="/widerruf">Widerrufsbelehrung</Link>. Anbieter: KMVB UG
          (haftungsbeschränkt), siehe <Link href="/impressum">Impressum</Link>.
        </p>
        <Cta status={status} second orderUnlock={orderUnlock} />
      </section>

      {/* ---------- Fragen ---------- */}
      <section aria-labelledby="sp-faq" className={styles.section}>
        <h2 id="sp-faq" className={styles.h2}>
          Häufige Fragen
        </h2>
        <div className={styles.faq}>
          <details>
            <summary>Was gibt es schon vor November?</summary>
            <p>
              Mit der Mitgliedschaft sind sofort alle bisherigen Premium-Detektivfälle und die Große Reitakademie freigeschaltet. Die kostenlose Hofwelt und die
              kleine Reitakademie bleiben für alle kostenlos.
            </p>
          </details>
          <details>
            <summary>Was ist die Hofpost?</summary>
            <p>
              Mit dem Jahresabo mit Hofpost bekommt Ihr Kind zusätzlich zur App ein Jahr lang jeden Monat einen echten Brief von Tivoli,
              Scrabble, Tonga oder Hofhund Krümel – mit Foto, einer Aufgabe, einem Sticker und einem Geheimwort, das in der App eine
              Überraschung öffnet. Der erste Brief kommt {hofpost.firstLetterLabel}, im ersten Brief liegen eine Sammelmappe und ein
              Stickerbogen. Für Kinder von 4 bis 12 Jahren.
            </p>
          </details>
          <details>
            <summary>Wann kommen die Briefe und wohin?</summary>
            <p>
              Einmal im Monat, meist in den ersten Tagen des Monats, an die Lieferadresse Ihrer Bestellung – nur innerhalb Deutschlands.
              Für die Anrede fragen wir nur den Vornamen Ihres Kindes ab. Kommt ein Brief nicht an, schreiben Sie an{" "}
              {plan.supportEmail}; wir schicken ihn mit dem nächsten Versand kostenlos nach.
            </p>
          </details>
          <details>
            <summary>Wie funktioniert die Freischaltung?</summary>
            <p>
              Nach dem Kauf geben Sie im Elternbereich Ihre Bestellnummer und die E-Mail-Adresse der Bestellung oder Ihren
              Freischaltcode ein. Die Prüfung erfolgt auf unserem Server; auf dem Gerät wird nur gespeichert, was freigeschaltet ist.
            </p>
          </details>
          <details>
            <summary>Wir haben ein neues Tablet. Was nun?</summary>
            <p>
              Entfernen Sie die Freischaltung im Elternbereich des alten Geräts und schalten Sie auf dem neuen Gerät frei. Ist das alte
              Gerät nicht mehr da, schreiben Sie uns an {plan.supportEmail} – wir setzen die Gerätebindung nach Prüfung des Kaufs zurück.
            </p>
          </details>
          <details>
            <summary>Wird der Spielfortschritt übertragen?</summary>
            <p>
              Der Fortschritt liegt nur lokal auf dem jeweiligen Gerät, damit wir keine Daten über Ihr Kind speichern. Beim Gerätewechsel
              beginnt der Pass daher neu.
            </p>
          </details>
        </div>
      </section>

      <LegalLinks />
    </div>
  );
}
