"use client";

import { useRouter } from "next/navigation";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import type { Notify } from "../DiaryApp";
import { relatedLessons } from "../academyLinks";
import { caseOfGoal, programProgress } from "../coach";
import { FeedbackCard } from "@/features/coach/FeedbackCard";
import { deleteEntry, toggleFavorite } from "../store";
import { formatDay, formatMinutes, monthKey, monthLabel, sortEntries } from "../stats";
import { moodLabel, type DiaryData, type DiaryEntry, type Horse } from "../types";
import { DeleteButton, EmptyState, HorsePic, MoodIcon, SubHeader } from "../ui";
import s from "../tagebuch.module.css";

/** Kurzer Vorschautext eines Eintrags */
function preview(e: DiaryEntry): string | undefined {
  return e.moment ?? e.wentWell ?? e.learned ?? e.practice ?? e.nextTime;
}

export function EntryCard({ entry: e, horses }: { entry: DiaryEntry; horses: Horse[] }) {
  const horse = horses.find((h) => h.id === e.horseId);
  const meta = [horse?.name, e.discipline, e.minutes ? formatMinutes(e.minutes) : undefined].filter(Boolean).join(" · ");
  const text = preview(e);
  return (
    <Link href={`/tagebuch/eintrag/${e.id}`} className={s.entryCard}>
      <span className={s.entryDate}>
        <strong>{formatDay(e.date, { day: "numeric" })}</strong>
        <span>{formatDay(e.date, { month: "short" })}</span>
      </span>
      <span className={s.entryBody}>
        <span className={s.entryMeta}>{meta || "Reitstunde"}</span>
        {text && <span className={s.entryText}>{text}</span>}
      </span>
      <span className={s.entrySide}>
        {e.mood && <MoodIcon mood={e.mood} className={`${s.entryMood} ${s[`moodInk_${e.mood}`]}`} />}
        {e.favorite && (
          <span className={s.entryFav} aria-label="Lieblingsmoment">
            ★
          </span>
        )}
      </span>
    </Link>
  );
}

export function EntriesView({ data }: { data: DiaryData; notify: Notify }) {
  const list = sortEntries(data.entries);
  const groups: { key: string; items: DiaryEntry[] }[] = [];
  for (const e of list) {
    const k = monthKey(e.date);
    const last = groups[groups.length - 1];
    if (last?.key === k) last.items.push(e);
    else groups.push({ key: k, items: [e] });
  }
  return (
    <div className={s.stack}>
      <SubHeader
        title="Alle Einträge"
        action={
          <Link href="/tagebuch/stunde" className={s.btnSmall}>
            + Reitstunde
          </Link>
        }
      />
      {list.length === 0 ? (
        <EmptyState
          art="book"
          title="Dein Tagebuch ist noch leer"
          text="Nach deiner nächsten Reitstunde kannst du hier festhalten, wie es war."
          action={
            <Link href="/tagebuch/stunde" className={s.btnPrimary}>
              + Reitstunde eintragen
            </Link>
          }
        />
      ) : (
        groups.map((g) => (
          <section key={g.key} className={s.section}>
            <h2 className={s.monthHead}>{monthLabel(g.key)}</h2>
            <ul className={s.list}>
              {g.items.map((e) => (
                <li key={e.id}>
                  <EntryCard entry={e} horses={data.horses} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

const ANSWERS = [
  { key: "wentWell", label: "Das hat gut geklappt" },
  { key: "learned", label: "Das habe ich gelernt" },
  { key: "difficult", label: "Das war schwierig" },
  { key: "practice", label: "Das möchte ich noch üben" },
  { key: "nextTime", label: "Für die nächste Stunde" },
  { key: "moment", label: "Mein schönster Moment" },
] as const;

export function EntryDetail({ data, notify, entryId }: { data: DiaryData; notify: Notify; entryId: string }) {
  const router = useRouter();
  const e = data.entries.find((x) => x.id === entryId);
  if (!e) {
    return (
      <div className={s.stack}>
        <SubHeader title="Eintrag nicht gefunden" back="/tagebuch/eintraege" />
        <p className={s.muted}>Diesen Eintrag gibt es auf diesem Gerät nicht (mehr).</p>
      </div>
    );
  }
  const horse = data.horses.find((h) => h.id === e.horseId);
  const lessons = relatedLessons(e);
  const hasText = ANSWERS.some((a) => e[a.key]);
  const goal = e.goalId ? data.goals.find((g) => g.id === e.goalId) : undefined;
  const coachCase = caseOfGoal(data, goal);
  const progress = goal ? programProgress(data, goal) : null;
  // Übungen der Woche, in der die Stunde lag (sonst der laufenden Woche)
  const weekIdx = goal?.program ? Math.min(Math.max(Math.floor((Date.parse(e.date) - Date.parse(goal.program.start)) / (7 * 86400000)), 0), goal.program.weeks.length - 1) : -1;
  const weekExercises = goal?.program && weekIdx >= 0 ? goal.program.weeks[weekIdx].exercises.slice(0, 2) : [];

  return (
    <div className={s.stack}>
      <SubHeader title={formatDay(e.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} back="/tagebuch/eintraege" />

      <article className={`${s.card} ${s.detail}`}>
        <div className={s.detailHead}>
          {horse && <HorsePic horse={horse} className={s.detailHorse} />}
          <div>
            <p className={s.detailHorseName}>{horse ? horse.name : "Reitstunde"}</p>
            <p className={s.detailMeta}>{[e.discipline, e.minutes ? formatMinutes(e.minutes) : undefined].filter(Boolean).join(" · ") || "Ohne weitere Angaben"}</p>
          </div>
        </div>
        {e.mood && (
          <p className={`${s.detailMood} ${s[`moodInk_${e.mood}`]}`}>
            <MoodIcon mood={e.mood} className={s.detailMoodIcon} />
            {moodLabel(e.mood)}
          </p>
        )}
        {e.photo && <img src={e.photo} alt="Foto dieser Reitstunde" className={s.detailPhoto} />}
        {hasText ? (
          <dl className={s.answers}>
            {ANSWERS.filter((a) => e[a.key]).map((a) => (
              <div key={a.key}>
                <dt>{a.label}</dt>
                <dd>{e[a.key]}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={s.muted}>Zu dieser Stunde hast du nichts aufgeschrieben – das ist völlig in Ordnung.</p>
        )}
      </article>

      <div className={s.actions}>
        <button
          type="button"
          className={e.favorite ? s.btnFavOn : s.btnGhost}
          aria-pressed={!!e.favorite}
          onClick={async () => {
            try {
              await toggleFavorite(e.id);
              notify(e.favorite ? "Nicht mehr als Lieblingsmoment markiert" : "Als Lieblingsmoment gemerkt");
            } catch {
              notify("Das hat nicht geklappt.");
            }
          }}
        >
          ★ {e.favorite ? "Lieblingsmoment" : "Als Lieblingsmoment merken"}
        </button>
        <Link href={`/tagebuch/stunde/${e.id}`} className={s.btnGhost}>
          Bearbeiten
        </Link>
      </div>

      {goal && (
        <section className={`${s.card} ${s.related}`} aria-labelledby="entry-goal">
          <h2 id="entry-goal" className={s.cardTitle}>
            Gehört zu deinem Ziel
          </h2>
          <Link href="/tagebuch/ziele" className={s.relatedLink}>
            <Icon name={coachCase ? "coach" : "star"} />
            <span>
              <strong>{goal.title}</strong>
              <span>{progress ? `Woche ${progress.week} von ${progress.weeks} · ${progress.done} von ${progress.total} Einheiten erledigt` : goal.status === "geschafft" ? "Geschafft" : "In Arbeit"}</span>
            </span>
          </Link>
          {coachCase && weekExercises.map((ex) => <FeedbackCard key={ex} caseId={coachCase.id} exercise={ex} entryId={e.id} />)}
        </section>
      )}

      {lessons.length > 0 && (
        <section className={`${s.card} ${s.related}`}>
          <h2 className={s.cardTitle}>Passt dazu in der Reitakademie</h2>
          <ul className={s.relatedList}>
            {lessons.map((l) => (
              <li key={l.id}>
                <Link href={l.href} className={s.relatedLink}>
                  <Icon name="academy" />
                  <span>
                    <strong>{l.title}</strong>
                    <span>{l.world}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <DeleteButton
        label="Eintrag löschen"
        question="Diesen Eintrag wirklich löschen? Das lässt sich nicht rückgängig machen."
        onConfirm={async () => {
          try {
            await deleteEntry(e.id);
            notify("Eintrag gelöscht");
            router.push("/tagebuch/eintraege");
          } catch {
            notify("Löschen hat nicht geklappt.");
          }
        }}
      />
    </div>
  );
}
