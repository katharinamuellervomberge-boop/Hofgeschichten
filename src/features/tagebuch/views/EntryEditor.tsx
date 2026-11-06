"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/i18n/Link";
import type { Notify } from "../DiaryApp";
import { saveEntry } from "../store";
import { today } from "../sanitize";
import { DISCIPLINES, MOODS, type DiaryData, type Discipline, type Mood } from "../types";
import { Chips, Field, MoodIcon, PhotoField, SubHeader, TextArea } from "../ui";
import s from "../tagebuch.module.css";

const QUESTIONS = [
  { key: "wentWell", label: "Was hat heute gut geklappt?" },
  { key: "learned", label: "Was habe ich heute gelernt?" },
  { key: "practice", label: "Was möchte ich noch üben?" },
  { key: "nextTime", label: "Was nehme ich mir für die nächste Stunde vor?" },
  { key: "moment", label: "Mein schönster Moment" },
] as const;
type QKey = (typeof QUESTIONS)[number]["key"];

export function EntryEditor({ data, notify, entryId }: { data: DiaryData; notify: Notify; entryId?: string }) {
  const router = useRouter();
  const old = entryId ? data.entries.find((e) => e.id === entryId) : undefined;
  const onlyHorse = data.horses.length === 1 ? data.horses[0].id : "";
  const [date, setDate] = useState(old?.date ?? today());
  const [horseId, setHorseId] = useState(old ? (old.horseId ?? "") : onlyHorse);
  const [minutes, setMinutes] = useState(old?.minutes ? String(old.minutes) : "");
  const [discipline, setDiscipline] = useState<Discipline | "">(old?.discipline ?? "");
  const [mood, setMood] = useState<Mood | "">(old?.mood ?? "");
  const [texts, setTexts] = useState<Record<QKey, string>>({
    wentWell: old?.wentWell ?? "",
    learned: old?.learned ?? "",
    practice: old?.practice ?? "",
    nextTime: old?.nextTime ?? "",
    moment: old?.moment ?? "",
  });
  const [favorite, setFavorite] = useState(old?.favorite ?? false);
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
        back={old ? `/tagebuch/eintrag/${old.id}` : "/tagebuch"}
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
              favorite: favorite || undefined,
              photo,
            });
            notify(old ? "Eintrag gespeichert" : "Reitstunde eingetragen");
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
