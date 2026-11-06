"use client";

import { useState } from "react";
import Link from "@/i18n/Link";
import type { Notify } from "../DiaryApp";
import { formatDay, formatMinutes, monthKey, monthLabel, monthReview, shiftMonth } from "../stats";
import type { DiaryData } from "../types";
import { EmptyState, SubHeader } from "../ui";
import s from "../tagebuch.module.css";

export function ReviewView({ data }: { data: DiaryData; notify: Notify }) {
  const current = monthKey(new Date());
  const [key, setKey] = useState(current);

  if (data.entries.length === 0 && data.goals.every((g) => g.status !== "geschafft")) {
    return (
      <div className={s.stack}>
        <SubHeader title="Meine Entwicklung" />
        <EmptyState
          art="book"
          title="Hier wächst dein Monatsrückblick"
          text="Sobald du deine ersten Reitstunden einträgst, siehst du hier, wie viel du schon geritten bist und was du erreicht hast."
          action={
            <Link href="/tagebuch/stunde" className={s.btnPrimary}>
              + Reitstunde eintragen
            </Link>
          }
        />
      </div>
    );
  }

  const r = monthReview(data, key);
  const nothing = r.lessons === 0 && r.goalsDone.length === 0;

  return (
    <div className={s.stack}>
      <SubHeader title="Meine Entwicklung" intro="Dein Monatsrückblick – berechnet aus deinen eigenen Einträgen." />

      <div className={s.monthNav}>
        <button type="button" className={s.monthBtn} onClick={() => setKey(shiftMonth(key, -1))} aria-label="Vorheriger Monat">
          ‹
        </button>
        <p className={s.monthName} aria-live="polite">
          {monthLabel(key)}
        </p>
        <button type="button" className={s.monthBtn} onClick={() => setKey(shiftMonth(key, 1))} disabled={key >= current} aria-label="Nächster Monat">
          ›
        </button>
      </div>

      {nothing ? (
        <p className={`${s.card} ${s.muted}`}>In diesem Monat gibt es noch keine Einträge.</p>
      ) : (
        <>
          <dl className={s.reviewGrid}>
            <div>
              <dt>Reitstunden</dt>
              <dd>{r.lessons}</dd>
            </div>
            <div>
              <dt>Zeit im Sattel</dt>
              <dd>{formatMinutes(r.minutes)}</dd>
              {r.withoutMinutes > 0 && <span className={s.reviewNote}>{r.withoutMinutes} ohne Dauer</span>}
            </div>
            <div>
              <dt>Häufigste Disziplin</dt>
              <dd className={s.reviewWord}>{r.topDisciplines.join(" & ") || "–"}</dd>
            </div>
            <div>
              <dt>{r.topHorses.length > 1 ? "Häufigste Pferde" : "Häufigstes Pferd"}</dt>
              <dd className={s.reviewWord}>{r.topHorses.join(" & ") || "–"}</dd>
            </div>
            <div>
              <dt>Ziele geschafft</dt>
              <dd>{r.goalsDone.length}</dd>
            </div>
            <div>
              <dt>Lieblingsmomente</dt>
              <dd>{r.favorites.length}</dd>
            </div>
          </dl>

          {r.goalsDone.length > 0 && (
            <section className={s.card}>
              <h2 className={s.cardTitle}>Geschafft in diesem Monat</h2>
              <ul className={s.plainList}>
                {r.goalsDone.map((g) => (
                  <li key={g.id}>✓ {g.title}</li>
                ))}
              </ul>
            </section>
          )}

          {r.favorites.length > 0 && (
            <section className={s.card}>
              <h2 className={s.cardTitle}>Lieblingsmomente des Monats</h2>
              <ul className={s.plainList}>
                {r.favorites.map((e) => (
                  <li key={e.id}>
                    <Link href={`/tagebuch/eintrag/${e.id}`} className={s.inlineLink}>
                      ★ {formatDay(e.date, { day: "numeric", month: "long" })}
                    </Link>
                    {e.moment ? ` – ${e.moment}` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
