"use client";

import { useId, useState } from "react";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import type { Notify } from "../DiaryApp";
import {
  PLAN_KIND_ICON,
  addDays,
  dayLabel,
  groupOptions,
  isWeek,
  itemsOfWeek,
  lessonOptions,
  refInfo,
  riderLabOptions,
  suggestionsFromGoals,
  weekDays,
  weekLabel,
  weekNumber,
  weekStart,
  weekStats,
  weekStreak,
  type RefOption,
  type Suggestion,
} from "../plan";
import { today } from "../sanitize";
import { caseOfGoal, coachExerciseHref, coachExerciseTitle } from "../coach";
import { FeedbackCard } from "@/features/coach/FeedbackCard";
import { addPlanItems, deletePlanItem, savePlanItem, setPlanDone, SaveError } from "../store";
import { DISCIPLINES, PLAN_KINDS, type DiaryData, type Discipline, type PlanItem, type PlanKind } from "../types";
import { Chips, DeleteButton, EmptyState, Field, SubHeader, TextArea } from "../ui";
import s from "../tagebuch.module.css";

type Draft = { item?: PlanItem; date: string; kind?: PlanKind; ref?: string; goalId?: string };

/**
 * Mein Trainingsplan (seit 09.11.2026): Woche für Woche Einheiten planen – Reiten,
 * Rider-Lab-Übungen, Lektionen der Reitakademie oder Eigenes – und abhaken.
 * Adresse: /tagebuch/plan (aktuelle Woche) oder /tagebuch/plan/<Montag als YYYY-MM-DD>.
 */
export function PlanView({ data, notify, week }: { data: DiaryData; notify: Notify; week?: string }) {
  const current = weekStart();
  const start = isWeek(week) ? week : current;
  const days = weekDays(start);
  const items = itemsOfWeek(data, start);
  const stats = weekStats(items);
  const streak = weekStreak(data);
  const prevItems = itemsOfWeek(data, addDays(start, -7));
  const nextItems = itemsOfWeek(data, addDays(start, 7));
  const suggestions = suggestionsFromGoals(data, items);
  const [draft, setDraft] = useState<Draft | null>(null);
  const todayStr = today();
  const defaultDay = start === current ? todayStr : start;

  async function toggle(p: PlanItem) {
    try {
      await setPlanDone(p.id, !p.done);
      if (!p.done) {
        const left = items.filter((x) => !x.done && x.id !== p.id).length;
        notify(left === 0 ? "Alles geschafft diese Woche – stark!" : "Erledigt ✓");
      }
    } catch {
      notify("Das hat nicht geklappt.");
    }
  }

  async function copyWeek(from: PlanItem[], offsetDays: number, msg: string) {
    try {
      await addPlanItems(
        from.map(({ date, kind, title, ref, minutes, horseId, discipline, note, goalId, exercises }) => ({ date: addDays(date, offsetDays), kind, title, ref, minutes, horseId, discipline, note, goalId, exercises })),
      );
      notify(msg);
    } catch (e) {
      notify(e instanceof SaveError && e.message === "full" ? "Der Plan ist voll. Lösche bitte alte Einheiten." : "Das hat nicht geklappt.");
    }
  }

  const weekHref = (w: string) => (w === current ? "/tagebuch/plan" : `/tagebuch/plan/${w}`);

  return (
    <div className={s.stack}>
      <SubHeader
        title="Mein Trainingsplan"
        intro="Plan deine Woche: Reiten, Übungen aus dem Rider Lab und Lektionen der Reitakademie. Abhaken, wenn’s geschafft ist."
        action={
          !draft ? (
            <button type="button" className={s.btnSmall} onClick={() => setDraft({ date: defaultDay })}>
              + Einheit
            </button>
          ) : undefined
        }
      />

      <nav className={s.weekNav} aria-label="Woche wählen">
        <Link href={weekHref(addDays(start, -7))} className={s.weekArrow} aria-label="Vorige Woche">
          <Icon name="back" />
        </Link>
        <div className={s.weekTitle}>
          <strong>
            KW {weekNumber(start)}
            {start === current ? " · diese Woche" : ""}
          </strong>
          <span>{weekLabel(start)}</span>
        </div>
        <Link href={weekHref(addDays(start, 7))} className={s.weekArrow} aria-label="Nächste Woche">
          <Icon name="back" style={{ transform: "rotate(180deg)" }} />
        </Link>
      </nav>
      {start !== current && (
        <Link href="/tagebuch/plan" className={`${s.more} ${s.center}`}>
          Zur aktuellen Woche
        </Link>
      )}

      {items.length > 0 && (
        <div className={s.planProgress}>
          <div className={s.planProgressText}>
            <strong>
              {stats.done} von {stats.total} erledigt
            </strong>
            <span>
              {[stats.minutes ? `${stats.minutes} Min. trainiert` : undefined, streak > 1 ? `${streak} Wochen am Stück dran` : undefined].filter(Boolean).join(" · ")}
            </span>
          </div>
          <span className={s.planBar} role="progressbar" aria-valuemin={0} aria-valuemax={stats.total} aria-valuenow={stats.done} aria-label="Fortschritt dieser Woche">
            <span style={{ width: `${stats.total ? (stats.done / stats.total) * 100 : 0}%` }} />
          </span>
        </div>
      )}

      {draft && (
        <PlanForm
          key={draft.item?.id ?? `${draft.date}-${draft.kind ?? ""}-${draft.ref ?? ""}`}
          data={data}
          draft={draft}
          onDone={(msg) => {
            setDraft(null);
            if (msg) notify(msg);
          }}
        />
      )}

      {!draft && items.length === 0 && (
        <EmptyState
          art="star"
          title="Diese Woche ist noch leer"
          text="Tipp auf „+ Einheit“ oder auf einen Tag. Zwei, drei Einheiten pro Woche sind ein guter Anfang."
          action={
            prevItems.length > 0 ? (
              <button type="button" className={s.btnPrimary} onClick={() => copyWeek(prevItems, 7, `${prevItems.length} Einheiten aus der Vorwoche übernommen`)}>
                Vorwoche übernehmen ({prevItems.length})
              </button>
            ) : undefined
          }
        />
      )}

      {!draft && suggestions.length > 0 && (
        <section className={`${s.card} ${s.related}`} aria-labelledby="plan-sugg">
          <h2 id="plan-sugg" className={s.h3}>
            Passt zu deinen Zielen
          </h2>
          <ul className={s.relatedList}>
            {suggestions.map((sg) => (
              <li key={sg.ref}>
                <button type="button" className={`${s.relatedLink} ${s.suggBtn}`} onClick={() => setDraft({ date: defaultDay, kind: sg.kind, ref: sg.ref, goalId: sg.goal.id })}>
                  <Icon name={PLAN_KIND_ICON[sg.kind]} />
                  <span>
                    <strong>+ {sg.title}</strong>
                    <span>{suggestionLine(sg)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ol className={s.days}>
        {days.map((d) => {
          const list = items.filter((p) => p.date === d);
          const lbl = dayLabel(d);
          const isToday = d === todayStr;
          return (
            <li key={d} className={`${s.day} ${isToday ? s.dayToday : ""}`}>
              <div className={s.dayHead}>
                <h2 className={s.dayName}>
                  <span>{lbl.long}</span> <span className={s.dayNum}>{lbl.num}</span>
                  {isToday && <span className={s.tag}>Heute</span>}
                </h2>
                {!draft && (
                  <button type="button" className={s.btnText} onClick={() => setDraft({ date: d })} aria-label={`Einheit am ${lbl.long} planen`}>
                    + planen
                  </button>
                )}
              </div>
              {list.length > 0 && (
                <ul className={s.planList}>
                  {list.map((p) => (
                    <PlanRow key={p.id} item={p} data={data} onToggle={() => toggle(p)} onEdit={() => setDraft({ item: p, date: p.date })} />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      {items.length > 0 && nextItems.length === 0 && (
        <button type="button" className={s.btnGhost} onClick={() => copyWeek(items, 7, "In die nächste Woche übernommen")}>
          Diese Woche für nächste Woche übernehmen
        </button>
      )}
    </div>
  );
}

function suggestionLine(sg: Suggestion): string {
  const kind = sg.kind === "riderlab" ? "Rider Lab" : "Lektion";
  return [kind, sg.dose, `für „${sg.goal.title}“`].filter(Boolean).join(" · ");
}

function PlanRow({ item: p, data, onToggle, onEdit }: { item: PlanItem; data: DiaryData; onToggle: () => void; onEdit: () => void }) {
  const info = refInfo(p.ref);
  const horse = data.horses.find((h) => h.id === p.horseId);
  const goal = data.goals.find((g) => g.id === p.goalId);
  const coachCase = p.kind === "coach" ? caseOfGoal(data, goal) : undefined;
  const meta = [
    p.kind === "riderlab" ? (info?.dose ? `Rider Lab · ${info.dose}` : "Rider Lab") : p.kind === "lektion" ? "Lektion" : p.kind === "coach" ? "Rider Coach" : p.discipline,
    p.minutes ? `${p.minutes} Min.` : undefined,
    horse ? `mit ${horse.name}` : undefined,
    goal ? `Ziel: ${goal.title}` : undefined,
  ].filter(Boolean);

  return (
    <li className={`${s.planItem} ${p.done ? s.planDone : ""}`}>
      <button type="button" className={s.planCheck} aria-pressed={!!p.done} aria-label={p.done ? `${p.title}: erledigt – zurücknehmen` : `${p.title}: als erledigt abhaken`} onClick={onToggle}>
        {p.done ? <Icon name="check" /> : <Icon name={PLAN_KIND_ICON[p.kind]} />}
      </button>
      <div className={s.planBody}>
        <p className={s.planTitle}>{p.title}</p>
        {meta.length > 0 && <p className={s.goalMeta}>{meta.join(" · ")}</p>}
        {p.note && <p className={s.planNote}>{p.note}</p>}
        {p.kind === "coach" && p.exercises && p.exercises.length > 0 && (
          <p className={s.exLinks}>
            {p.exercises.map((ex) => (
              <Link key={ex} href={coachExerciseHref(ex)} className={s.inlineLink}>
                {coachExerciseTitle(ex)}
              </Link>
            ))}
          </p>
        )}
        {p.kind === "coach" && p.done && coachCase && p.exercises?.[0] && <FeedbackCard caseId={coachCase.id} exercise={p.exercises[0]} planId={p.id} />}
        <div className={s.planActions}>
          {info && (
            <Link href={info.href} className={s.inlineLink}>
              {p.kind === "riderlab" ? "Übung öffnen" : "Lektion öffnen"}
            </Link>
          )}
          {(p.kind === "reiten" || p.kind === "coach") &&
            (p.entryId && data.entries.some((e) => e.id === p.entryId) ? (
              <Link href={`/tagebuch/eintrag/${p.entryId}`} className={s.inlineLink}>
                Zum Eintrag
              </Link>
            ) : p.date <= today() ? (
              <Link href={`/tagebuch/stunde?plan=${p.id}`} className={s.inlineLink}>
                {p.kind === "coach" ? "Training eintragen" : "Reitstunde eintragen"}
              </Link>
            ) : null)}
          <button type="button" className={s.btnText} onClick={onEdit}>
            Bearbeiten
          </button>
        </div>
      </div>
    </li>
  );
}

function RefSelect({ label, value, onChange, options, error }: { label: string; value: string; onChange: (v: string) => void; options: RefOption[]; error?: string }) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <select id={id} className={`${s.input} ${error ? s.inputError : ""}`} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={error ? true : undefined}>
        <option value="">Bitte wählen</option>
        {groupOptions(options).map((g) => (
          <optgroup key={g.group} label={g.group}>
            {g.options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.title}
                {o.dose ? ` (${o.dose})` : ""}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}

function PlanForm({ data, draft, onDone }: { data: DiaryData; draft: Draft; onDone: (msg?: string) => void }) {
  const old = draft.item;
  const onlyHorse = data.horses.length === 1 ? data.horses[0].id : "";
  const [kind, setKind] = useState<PlanKind | "">(old?.kind ?? draft.kind ?? "reiten");
  const [ref, setRef] = useState(old?.ref ?? draft.ref ?? "");
  const [title, setTitle] = useState(old?.kind === "reiten" || old?.kind === "eigenes" || old?.kind === "coach" ? old.title : "");
  const isCoach = old?.kind === "coach";
  const [date, setDate] = useState(old?.date ?? draft.date);
  const [minutes, setMinutes] = useState(old?.minutes ? String(old.minutes) : "");
  const [horseId, setHorseId] = useState(old ? (old.horseId ?? "") : onlyHorse);
  const [discipline, setDiscipline] = useState<Discipline | "">(old?.discipline ?? "");
  const [goalId, setGoalId] = useState(old?.goalId ?? draft.goalId ?? "");
  const [note, setNote] = useState(old?.note ?? "");
  const [errors, setErrors] = useState<{ ref?: string; title?: string; date?: string; minutes?: string; save?: string }>({});
  const [busy, setBusy] = useState(false);

  const openGoals = data.goals.filter((g) => g.status !== "geschafft" || g.id === goalId);
  const refOptions = kind === "riderlab" ? riderLabOptions : kind === "lektion" ? lessonOptions : [];

  function resolvedTitle(): string {
    if (kind === "riderlab" || kind === "lektion") return refInfo(ref)?.title ?? "";
    if (title.trim()) return title.trim();
    if (kind === "reiten") return discipline || "Reiten";
    return "";
  }

  function validate() {
    const e: typeof errors = {};
    if ((kind === "riderlab" || kind === "lektion") && !refInfo(ref)) e.ref = kind === "riderlab" ? "Bitte eine Übung wählen." : "Bitte eine Lektion wählen.";
    if ((kind === "eigenes" || kind === "coach") && !title.trim()) e.title = "Was hast du vor?";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) e.date = "Bitte ein Datum wählen.";
    if (minutes) {
      const n = Number(minutes);
      if (!Number.isInteger(n) || n < 1 || n > 600) e.minutes = "Bitte eine Zahl zwischen 1 und 600 eingeben.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className={s.stack}>
      <form
        className={`${s.card} ${s.form}`}
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (!kind || !validate()) return;
          setBusy(true);
          try {
            await savePlanItem({
              id: old?.id,
              date,
              kind,
              title: resolvedTitle(),
              ref: kind === "riderlab" || kind === "lektion" ? ref : undefined,
              minutes: minutes ? Number(minutes) : undefined,
              horseId: kind === "reiten" ? horseId || undefined : undefined,
              discipline: kind === "reiten" ? discipline || undefined : undefined,
              goalId: goalId || undefined,
              exercises: isCoach ? old?.exercises : undefined,
              note: note || undefined,
              done: old?.done,
              entryId: old?.entryId,
            });
            onDone(old ? "Einheit gespeichert" : `Geplant für ${dayLabel(date).long}`);
          } catch (err) {
            setBusy(false);
            setErrors({ save: err instanceof SaveError && err.message === "full" ? "Der Plan ist voll. Lösche bitte alte Einheiten." : "Speichern hat nicht geklappt. Bitte nochmal versuchen." });
          }
        }}
      >
        <h2 className={s.cardTitle}>{old ? "Einheit bearbeiten" : "Neue Einheit"}</h2>
        {isCoach ? (
          <p className={s.hint}>Einheit aus deinem Rider-Coach-Plan. Übungen änderst du beim Ziel unter „Plan anpassen“.</p>
        ) : (
          <>
            <Chips
              label="Was möchtest du machen?"
              value={kind}
              onChange={(v) => {
                setKind(v);
                setRef("");
                setErrors({});
              }}
              options={PLAN_KINDS.filter((k) => k.id !== "coach").map((k) => ({ value: k.id, label: k.label }))}
            />
            {kind && <p className={s.hint}>{PLAN_KINDS.find((k) => k.id === kind)?.hint}</p>}
          </>
        )}

        {(kind === "riderlab" || kind === "lektion") && (
          <RefSelect
            label={kind === "riderlab" ? "Welche Übung?" : "Welche Lektion?"}
            value={ref}
            onChange={(v) => {
              setRef(v);
              setErrors((x) => ({ ...x, ref: undefined }));
            }}
            options={refOptions}
            error={errors.ref}
          />
        )}

        {kind === "reiten" && (
          <>
            <Chips label="Was steht an?" value={discipline} onChange={setDiscipline} options={DISCIPLINES.map((d) => ({ value: d, label: d }))} />
            {data.horses.length > 0 && <Chips label="Mit welchem Pferd?" value={horseId} onChange={setHorseId} options={data.horses.map((h) => ({ value: h.id, label: h.name }))} />}
            <Field label="Eigener Titel" value={title} onChange={setTitle} max={120} placeholder="z. B. Reitstunde bei Hanna" />
          </>
        )}

        {(kind === "eigenes" || kind === "coach") && (
          <Field
            label="Was hast du vor?"
            required
            value={title}
            onChange={(v) => {
              setTitle(v);
              setErrors((x) => ({ ...x, title: undefined }));
            }}
            max={120}
            error={errors.title}
            placeholder="z. B. 10 Minuten dehnen"
          />
        )}

        <div className={s.twoCol}>
          <Field label="Tag" required type="date" value={date} onChange={setDate} error={errors.date} />
          <Field label="Dauer in Minuten" type="number" inputMode="numeric" min="1" maxValue="600" value={minutes} onChange={setMinutes} error={errors.minutes} placeholder="z. B. 15" />
        </div>

        {openGoals.length > 0 && <Chips label="Für welches Ziel? (freiwillig)" value={goalId} onChange={setGoalId} options={openGoals.map((g) => ({ value: g.id, label: g.title }))} />}

        <TextArea label="Notiz (freiwillig)" value={note} onChange={setNote} max={300} rows={2} placeholder="z. B. auf die Hände achten" />

        {errors.save && <p className={s.error}>{errors.save}</p>}
        <div className={s.actions}>
          <button type="submit" className={s.btnPrimary} disabled={busy || !kind}>
            {busy ? "Speichert …" : old ? "Speichern" : "Einplanen"}
          </button>
          <button type="button" className={s.btnGhost} onClick={() => onDone()}>
            Abbrechen
          </button>
        </div>
      </form>
      {old && (
        <DeleteButton
          label="Einheit löschen"
          question={`„${old.title}“ aus dem Plan löschen?`}
          onConfirm={async () => {
            try {
              await deletePlanItem(old.id);
              onDone("Einheit gelöscht");
            } catch {
              setErrors({ save: "Löschen hat nicht geklappt." });
            }
          }}
        />
      )}
    </div>
  );
}
