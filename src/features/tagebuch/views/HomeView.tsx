"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import type { Notify } from "../DiaryApp";
import { sortEntries, totals } from "../stats";
import type { DiaryData } from "../types";
import { EmptyState } from "../ui";
import { EntryCard } from "./EntriesView";
import { BackupPanel } from "./BackupPanel";
import s from "../tagebuch.module.css";

function greeting(name?: string): string {
  const h = new Date().getHours();
  const hello = h < 11 ? "Guten Morgen" : h < 18 ? "Schön, dass du da bist" : "Guten Abend";
  return name ? `${hello}, ${name}!` : `${hello}!`;
}

const CARDS = [
  { href: "/tagebuch/pferde", title: "Meine Pferde", text: "Steckbriefe deiner Pferde", icon: "horse", tone: "sage" },
  { href: "/tagebuch/stunde", title: "Neue Reitstunde", text: "Schnell eintragen, wie es war", icon: "pass", tone: "forest" },
  { href: "/tagebuch/ziele", title: "Meine Ziele", text: "Was du lernen möchtest", icon: "check", tone: "sand" },
  { href: "/tagebuch/momente", title: "Meine Reitmomente", text: "Deine Lieblingserinnerungen", icon: "star", tone: "honey" },
] as const;

export function HomeView({ data, notify, persisted }: { data: DiaryData; notify: Notify; persisted: boolean }) {
  const t = totals(data);
  const latest = sortEntries(data.entries).slice(0, 3);
  const firstTime = data.horses.length === 0 && data.entries.length === 0;

  return (
    <div className={s.stack}>
      <header className={s.hero}>
        <p className="eyebrow">Mein Reitertagebuch</p>
        <h1 className={s.heroTitle}>Dein Reitertagebuch</h1>
        <p className={s.heroSub}>Deine Pferde. Deine Fortschritte. Deine schönsten Momente.</p>
        <p className={s.greeting}>
          {greeting(data.profile.name)}{" "}
          <Link href="/tagebuch/profil" className={s.inlineLink}>
            {data.profile.name ? "Mein Reiterprofil" : "Erzähl etwas über dich"}
          </Link>
        </p>
      </header>

      {firstTime && (
        <EmptyState
          title="Wer ist dein Pferd?"
          text="Leg zuerst dein Pferd an – ob eigenes Pferd, Reitbeteiligung oder Schulpferd. Danach kannst du jede Reitstunde in wenigen Sekunden festhalten."
          action={
            <Link href="/tagebuch/pferde/neu" className={s.btnPrimary}>
              Erstes Pferd anlegen
            </Link>
          }
        />
      )}

      <nav aria-label="Bereiche des Tagebuchs" className={s.mainCards}>
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className={`${s.mainCard} ${s[`tone_${c.tone}`]}`}>
            <span className={s.mainIcon} aria-hidden>
              <Icon name={c.icon} />
            </span>
            <span className={s.mainTitle}>{c.title}</span>
            <span className={s.mainText}>{c.text}</span>
          </Link>
        ))}
      </nav>

      <dl className={s.statRow}>
        <div>
          <dt>Reitstunden</dt>
          <dd>{t.lessons}</dd>
        </div>
        <div>
          <dt>Ziele erreicht</dt>
          <dd>{t.goalsDone}</dd>
        </div>
        <div>
          <dt>Lieblingsmomente</dt>
          <dd>{t.favorites}</dd>
        </div>
      </dl>

      <section className={s.section}>
        <div className={s.sectionHead}>
          <h2 className={s.h2}>Zuletzt eingetragen</h2>
          {data.entries.length > 3 && (
            <Link href="/tagebuch/eintraege" className={s.more}>
              Alle Einträge
            </Link>
          )}
        </div>
        {latest.length === 0 ? (
          <p className={s.muted}>Noch keine Reitstunde eingetragen. Nach deiner nächsten Stunde einfach auf „Neue Reitstunde“ tippen.</p>
        ) : (
          <ul className={s.list}>
            {latest.map((e) => (
              <li key={e.id}>
                <EntryCard entry={e} horses={data.horses} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className={s.linkRow}>
        <Link href="/tagebuch/entwicklung" className={s.pillLink}>
          Meine Entwicklung
        </Link>
        <Link href="/tagebuch/profil" className={s.pillLink}>
          Mein Reiterprofil
        </Link>
        <Link href="/tagebuch/eintraege" className={s.pillLink}>
          Alle Einträge
        </Link>
      </div>

      <BackupPanel data={data} notify={notify} persisted={persisted} />
    </div>
  );
}
