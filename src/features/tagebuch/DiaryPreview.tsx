import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { ridingSpace, ridingSpacePriceLabel } from "@/content/products";
import { getLocale } from "@/i18n/server";
import { MoodIcon } from "./ui";
import s from "./tagebuch.module.css";

/**
 * Vorschau für alle ohne Riding Space (seit 14.11.2026 eigenes Produkt; Bestandskäufer der
 * Reitakademie und Mitglieder schalten weiterhin frei).
 * Zeigt nur Beispielinhalte, die klar als Beispiel gekennzeichnet sind – keine echten Daten.
 */
const TEXT = {
  de: {
    title: "Reitertagebuch, Trainingsplaner & Rider Coach",
    sub: "Jede Reitstunde festhalten. Jede Woche planen. Hilfe, wenn es im Sattel hakt.",
    exampleLabel: "Beispielansicht",
    example: "Beispiel",
    month: "Nov.",
    meta: "Schulpferd Paula · Reitunterricht · 45 Min.",
    entry: "Zum ersten Mal ganz alleine angaloppiert – und Paula hat sofort verstanden, was ich wollte!",
    goalDone: "Ziel geschafft",
    goal: "Sicher angaloppieren",
    features: [
      "Steckbriefe für deine Pferde – eigenes Pferd, Reitbeteiligung oder Schulpferd",
      "Reitstunden in Sekunden eintragen, mit fünf Fragen zum Nachdenken",
      "Eigene Ziele setzen und abhaken – ohne Ranglisten, ohne Druck",
      "Trainingsplaner für Woche und Monat – mit Plan-Builder, Ruhetagen und Zielen mit Verlauf",
      "Rider Coach: Problem im Sattel beschreiben, passende Übungen und einen Wochenplan bekommen",
      "Lieblingsmomente sammeln und jeden Monat zurückblicken",
    ],
    price: (p: string) => `Riding Space – ${p} für 12 Monate`,
    terms:
      "Kein Abo: Der Zugang endet nach 12 Monaten automatisch. Alle Einträge bleiben privat auf eurem Gerät. Wer die Reitakademie vor dem 15.11.2026 gekauft hat, hat den Riding Space bereits inklusive.",
    buy: "Riding Space kaufen",
    unlock: "Schon gekauft? Freischalten",
  },
  en: {
    title: "Riding journal, training planner & Rider Coach",
    sub: "Record every riding session. Plan every week. Help when things aren't working in the saddle.",
    exampleLabel: "Example view",
    example: "Example",
    month: "Nov",
    meta: "School horse Paula · Riding lesson · 45 min",
    entry: "Cantered on completely on my own for the first time – and Paula understood straight away what I wanted!",
    goalDone: "Goal achieved",
    goal: "Confident canter transitions",
    features: [
      "Profiles for your horses – your own horse, a share horse or a riding school horse",
      "Log riding sessions in seconds, with five questions to reflect on",
      "Set your own goals and tick them off – no rankings, no pressure",
      "Training planner for the week and month – with plan builder, rest days and goals you can track",
      "Rider Coach: describe a problem in the saddle and get suitable exercises and a weekly plan",
      "Collect favourite moments and look back every month",
    ],
    price: (p: string) => `Riding Space – ${p} for 12 months`,
    terms:
      "No subscription: access ends automatically after 12 months. All entries stay private on your device. If you bought the Riding Academy before 15 November 2026, the Riding Space is already included.",
    buy: "Buy the Riding Space",
    unlock: "Already bought? Unlock",
  },
};
const ridingSpaceEnUrl = `https://www.horseandharmonie-shop.de/en/products/${ridingSpace.shopifyProductHandle}`;
const ICONS = ["horse", "pass", "check", "plan", "check", "star"] as const;

export async function DiaryPreview() {
  const locale = await getLocale();
  const t = TEXT[locale];
  return (
    <div className={`page ${s.diary}`}>
      <div className={s.stack}>
        <header className={s.hero}>
          <p className="eyebrow">Riding Space</p>
          <h1 className={s.heroTitle}>{t.title}</h1>
          <p className={s.heroSub}>{t.sub}</p>
        </header>

        <div className={s.previewStage} aria-label={t.exampleLabel}>
          <span className={s.previewBadge}>{t.example}</span>
          <div className={s.previewEntry}>
            <span className={s.entryDate}>
              <strong>14</strong>
              <span>{t.month}</span>
            </span>
            <span className={s.entryBody}>
              <span className={s.entryMeta}>{t.meta}</span>
              <span className={s.entryText}>{t.entry}</span>
            </span>
            <MoodIcon mood="super" className={`${s.entryMood} ${s.moodInk_super}`} />
          </div>
          <div className={s.previewGoal}>
            <span className={s.tag}>{t.goalDone}</span>
            <strong>{t.goal}</strong>
          </div>
        </div>

        <ul className={s.featureList}>
          {t.features.map((f, i) => (
            <li key={i}>
              <Icon name={ICONS[i]} /> {f}
            </li>
          ))}
        </ul>

        <section className={`${s.card} ${s.upgrade}`}>
          <h2 className={s.cardTitle}>{t.price(ridingSpacePriceLabel(locale))}</h2>
          <p className={s.small}>{t.terms}</p>
          <div className={s.actions}>
            <a href={locale === "en" ? ridingSpaceEnUrl : ridingSpace.checkoutUrl} target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>
              {t.buy}
            </a>
            <Link href="/eltern#riding-space" className={s.btnText}>
              {t.unlock}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
