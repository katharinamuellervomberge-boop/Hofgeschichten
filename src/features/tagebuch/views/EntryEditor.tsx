"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "@/i18n/Link";
import type { Notify } from "../DiaryApp";
import { suggestGoalForEntry } from "../coach";
import { linkPlanEntry, saveEntry } from "../store";
import { today } from "../sanitize";
import { DISCIPLINES, MOODS, type DiaryData, type Discipline, type Mood } from "../types";
import { Chips, Field, MoodIcon, PhotoField, SubHeader, TextArea } from "../ui";
import s from "../tagebuch.module.css";

const QUESTIONS = [
  { key: "wentWell", label: "Was hat heute gut geklappt?" },
  { key: "learned", label: "Was habe ich heute gelernt?" },
  { key: "difficult", label: "Was war schwierig?" },
  { key: "practice", label: "Was möchte ich noch üben?" },
  { key: "nextTime", label: "Was nehme ich mir für die nächste Stunde vor?" },
  { key: "moment", label: "Mein schönster Moment" },
] as const;
type QKey = (typeof QUESTIONS)[number]["key"];

export function EntryEditor({ data, notify, entryId }: { data: DiaryData; notify: Notify; entryId?: string }) {
  const router = useRouter();
  const old = entryId ? data.entries.find((e) => e.id === entryId) : undefined;
  // Aus dem Trainingsplan: /tagebuch/stunde?plan=<id> füllt Datum, Pferd, Dauer und Disziplin vor
  const planId = useSearchParams().get("plan");
  const fromPlan = !old && planId ? data.plan.find((p) => p.id === planId && (p.kind === "reiten" || p.kind === "coach")) : undefined;
  const onlyHorse = data.horses.length === 1 ? data.horses[0].id : "";
  const [date, setDate] = useState(old?.date ?? (fromPlan && fromPlan.date <= today() ? fromPlan.date : today()));
  const [horseId, setHorseId] = useState(old ? (old.horseId ?? "") : (fromPlan?.horseId ?? onlyHorse));
  const [minutes, setMinutes] = useState(old?.minutes ? String(old.minutes) : fromPlan?.minutes ? String(fromPlan.minutes) : "");
  const [discipline, setDiscipline] = useState<Discipline | "">(old?.discipline ?? fromPlan?.discipline ?? "");
  const [mood, setMood] = useState<Mood | "">(old?.mood ?? "");
  const [texts, setTexts] = useState<Record<QKey, string>>({
    wentWell: old?.wentWell ?? "",
    learned: old?.learned ?? "",
    difficult: old?.difficult ?? "",
    practice: old?.practice ?? "",
    nextTime: old?.nextTime ?? "",
    moment: old?.moment ?? "",
  });
  const [favorite, setFavorite] = useState(old?.favorite ?? false);
  // Ziel-Zuordnung: nur nach Bestätigung. Vorschlag über die Texte (Rider-Coach-Suchbegriffe bzw. Zieltitel).
  const [goalId, setGoalId] = useState(old?.goalId ?? fromPlan?.goalId ?? "");
  const [dismissed, setDismissed] = useState<string | null>(null);
  const openGoals = data.goals.filter((g) => g.status !== "geschafft" || g.id === goalId);
  const suggested = !goalId ? suggestGoalForEntry(data, texts) : undefined;
  const [photo, setPhoto] = useState<string | undefined>(old?.photo);
  const [errors, setErrors] = useState<{ date?: string; minutes?: string }>({});
  const [busy, setBusy] = useState(false);

  if (entryId && !old) {
    return (
      <div className={s.stack}>
        <SubHeader title="Eintrag nicht gefunden" />
        <p className={s.muted}>Diesen Eintrag gibt es auf diesem Gerät nicht (mehr).</p>
      </div>
    );
  }

  function validate() {
    const e: typeof errors = {};
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) e.date = "Bitte ein Datum wählen.";
    else if (date > today()) e.date = "Das Datum liegt in der Zukunft.";
    if (minutes) {
      const n = Number(minutes);
      if (!Number.isInteger(n) || n < 1 || n > 600) e.minutes = "Bitte eine Zahl zwischen 1 und 600 eingeben.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className={s.stack}>
      <SubHeader
        title={old ? "Reitstunde bearbeiten" : "Reitstunde eintragen"}
        back={old ? `/tagebuch/eintrag/${old.id}` : fromPlan ? "/tagebuch/plan" : "/tagebuch"}
        intro={old ? undefined : "Nur das Datum ist nötig. Alles andere darfst du ausfüllen, wenn du magst."}
      />
      <form
        className={s.form}
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (!validate()) return;
          setBusy(true);
          try {
            const id = await saveEntry({
              id: old?.id,
              date,
              horseId: horseId || undefined,
              minutes: minutes ? Number(minutes) : undefined,
              discipline: discipline || undefined,
              mood: mood || undefined,
              ...texts,
              goalId: goalId || undefined,
              favorite: favorite || undefined,
              photo,
            });
            if (fromPlan) {
              try {
                await linkPlanEntry(fromPlan.id, id);
              } catch {
                /* Eintrag ist gespeichert – Abhaken im Plan ist nicht entscheidend */
              }
            }
            notify(old ? "Eintrag gespeichert" : fromPlan ? "Eingetragen und im Plan abgehakt" : "Reitstunde eingetragen");
            router.push(`/tagebuch/eintrag/${id}`);
          } catch {
            notify("Speichern hat nicht geklappt. Bitte nochmal versuchen.");
            setBusy(false);
          }
        }}
      >
        <div className={s.card}>
          <h2 className={s.cardTitle}>Grunddaten</h2>
          <div className={s.twoCol}>
            <Field label="Datum" required type="date" value={date} onChange={setDate} maxValue={today()} error={errors.date} />
            <Field label="Dauer in Minuten" type="number" inputMode="numeric" min="1" maxValue="600" value={minutes} onChange={setMinutes} error={errors.minutes} placeholder="z. B. 45" />
          </div>
          {data.horses.length > 0 ? (
            <Chips label="Mit welchem Pferd?" value={horseId} onChange={setHorseId} options={data.horses.map((h) => ({ value: h.id, label: h.name }))} />
          ) : (
            <p className={s.hint}>
              Noch kein Pferd angelegt.{" "}
              <Link href="/tagebuch/pferde/neu" className={s.inlineLink}>
                Pferd anlegen
              </Link>{" "}
              – oder einfach ohne Pferd eintragen.
            </p>
          )}
          <Chips label="Was habt ihr gemacht?" value={discipline} onChange={setDiscipline} options={DISCIPLINES.map((d) => ({ value: d, label: d }))} />
        </div>

        <fieldset className={`${s.card} ${s.fieldsetCard}`}>
          <legend className={s.cardTitle}>Wie war deine Stunde?</legend>
          <div className={s.moods}>
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`${s.mood} ${s[`mood_${m.id}`]} ${mood === m.id ? s.moodOn : ""}`}
                aria-pressed={mood === m.id}
                aria-label={m.label}
                onClick={() => setMood(mood === m.id ? "" : m.id)}
              >
                <MoodIcon mood={m.id} className={s.moodIcon} />
                <span>{m.short}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className={s.card}>
          <h2 className={s.cardTitle}>Nachgedacht</h2>
          {QUESTIONS.map((q) => (
            <TextArea key={q.key} label={q.label} value={texts[q.key]} rows={2} onChange={(v) => setTexts((t) => ({ ...t, [q.key]: v }))} />
          ))}
          {suggested && dismissed !== suggested.id && (
            <div className={s.suggestBox} role="status">
              <p>
                Passt dieser Eintrag zu deinem Ziel <strong>„{suggested.title}“</strong>?
              </p>
              <div className={s.actions}>
                <button type="button" className={s.btnPrimarySmall} onClick={() => setGoalId(suggested.id)}>
                  Ja, zuordnen
                </button>
                <button type="button" className={s.btnText} onClick={() => setDismissed(suggested.id)}>
                  Nein
                </button>
              </div>
            </div>
          )}
          {openGoals.length > 0 && (
            <Chips label="Gehört zu einem Ziel?" value={goalId} onChange={setGoalId} options={openGoals.map((g) => ({ value: g.id, label: g.title }))} />
          )}
          <PhotoField label="Foto von heute" value={photo} onChange={setPhoto} />
          <label className={s.favToggle}>
            <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
            <span className={s.favBox} aria-hidden>★</span>
            <span>Als Lieblingsmoment merken</span>
          </label>
        </div>

        <button type="submit" className={`${s.btnPrimary} ${s.sticky}`} disabled={busy}>
          {busy ? "Speichert …" : old ? "Änderungen speichern" : "Reitstunde speichern"}
        </button>
      </form>
    </div>
  );
}
