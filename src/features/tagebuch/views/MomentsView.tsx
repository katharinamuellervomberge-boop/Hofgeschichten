"use client";

import Link from "@/i18n/Link";
import type { Notify } from "../DiaryApp";
import { formatDay, sortEntries } from "../stats";
import type { DiaryData } from "../types";
import { EmptyState, HorsePic, SubHeader } from "../ui";
import s from "../tagebuch.module.css";

export function MomentsView({ data }: { data: DiaryData; notify: Notify }) {
  const moments = sortEntries(data.entries.filter((e) => e.favorite));
  return (
    <div className={s.stack}>
      <SubHeader title="Meine Reitmomente" intro="Deine Lieblingserinnerungen – markiere eine Reitstunde mit dem Stern, dann erscheint sie hier." />
      {moments.length === 0 ? (
        <EmptyState
          art="star"
          title="Noch kein Lieblingsmoment"
          text="War eine Stunde besonders schön? Öffne den Eintrag und tippe auf „Als Lieblingsmoment merken“."
          action={
            <Link href={data.entries.length ? "/tagebuch/eintraege" : "/tagebuch/stunde"} className={s.btnPrimary}>
              {data.entries.length ? "Zu meinen Einträgen" : "+ Reitstunde eintragen"}
            </Link>
          }
        />
      ) : (
        <ol className={s.timeline}>
          {moments.map((e) => {
            const horse = data.horses.find((h) => h.id === e.horseId);
            const text = e.moment ?? e.wentWell ?? e.learned;
            return (
              <li key={e.id} className={s.momentItem}>
                <Link href={`/tagebuch/eintrag/${e.id}`} className={s.moment}>
                  {e.photo ? (
                    <img src={e.photo} alt="" className={s.momentPhoto} />
                  ) : horse?.photo ? (
                    <img src={horse.photo} alt="" className={s.momentPhoto} />
                  ) : null}
                  <span className={s.momentBody}>
                    <span className={s.momentDate}>{formatDay(e.date)}</span>
                    <span className={s.momentTitle}>
                      {horse && !horse.photo && !e.photo && <HorsePic horse={horse} className={s.momentHorse} />}
                      {horse ? `Mit ${horse.name}` : "Mein Moment"}
                      {e.discipline ? ` · ${e.discipline}` : ""}
                    </span>
                    {text && <span className={s.momentText}>{text}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
