"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/i18n/Link";
import type { Notify } from "../DiaryApp";
import { deleteHorse, saveHorse } from "../store";
import { lessonsWithHorse } from "../stats";
import { RELATIONS, SEXES, relationLabel, type DiaryData, type Horse, type Relation } from "../types";
import { DeleteButton, EmptyState, Field, HorsePic, PhotoField, Select, SubHeader, TextArea } from "../ui";
import s from "../tagebuch.module.css";

export function HorsesView({ data }: { data: DiaryData; notify: Notify }) {
  return (
    <div className={s.stack}>
      <SubHeader
        title="Meine Pferde"
        action={
          data.horses.length > 0 ? (
            <Link href="/tagebuch/pferde/neu" className={s.btnSmall}>
              + Pferd
            </Link>
          ) : undefined
        }
      />
      {data.horses.length === 0 ? (
        <EmptyState
          title="Noch kein Pferd im Stall"
          text="Leg dein erstes Pferd an. Name genügt – alles andere kannst du später ergänzen."
          action={
            <Link href="/tagebuch/pferde/neu" className={s.btnPrimary}>
              Erstes Pferd anlegen
            </Link>
          }
        />
      ) : (
        <ul className={s.horseGrid}>
          {data.horses.map((h) => (
            <li key={h.id}>
              <HorseCard horse={h} lessons={lessonsWithHorse(data, h.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function HorseCard({ horse: h, lessons }: { horse: Horse; lessons: number }) {
  const facts = [h.breed, h.sex, h.age, h.height, h.color].filter(Boolean).join(" · ");
  return (
    <Link href={`/tagebuch/pferde/${h.id}`} className={s.horseCard}>
      <HorsePic horse={h} className={s.horseCardPic} />
      <span className={s.horseCardBody}>
        {h.relation && <span className={s.tag}>{relationLabel(h.relation)}</span>}
        <span className={s.horseName}>{h.name}</span>
        {h.nickname && <span className={s.horseNick}>„{h.nickname}“</span>}
        {facts && <span className={s.horseFacts}>{facts}</span>}
        <span className={s.horseCount}>
          <strong>{lessons}</strong> {lessons === 1 ? "gemeinsame Reitstunde" : "gemeinsame Reitstunden"}
        </span>
      </span>
    </Link>
  );
}

export function HorseEditor({ data, notify, horseId }: { data: DiaryData; notify: Notify; horseId?: string }) {
  const router = useRouter();
  const old = horseId ? data.horses.find((h) => h.id === horseId) : undefined;
  const [f, setF] = useState({
    name: old?.name ?? "",
    nickname: old?.nickname ?? "",
    age: old?.age ?? "",
    breed: old?.breed ?? "",
    sex: old?.sex ?? "",
    height: old?.height ?? "",
    color: old?.color ?? "",
    relation: (old?.relation ?? "") as Relation | "",
    since: old?.since ?? "",
    likes: old?.likes ?? "",
    goodAt: old?.goodAt ?? "",
    workingOn: old?.workingOn ?? "",
    notes: old?.notes ?? "",
  });
  const [photo, setPhoto] = useState<string | undefined>(old?.photo);
  const [err, setErr] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF((x) => ({ ...x, [k]: v }));

  if (horseId && !old) {
    return (
      <div className={s.stack}>
        <SubHeader title="Pferd nicht gefunden" back="/tagebuch/pferde" />
        <p className={s.muted}>Dieses Pferd gibt es auf diesem Gerät nicht (mehr).</p>
      </div>
    );
  }

  const lessons = old ? lessonsWithHorse(data, old.id) : 0;

  return (
    <div className={s.stack}>
      <SubHeader title={old ? old.name : "Neues Pferd"} back="/tagebuch/pferde" intro={old ? `${lessons} gemeinsame Reitstunden im Tagebuch` : "Nur der Name ist nötig. Alles andere kannst du jederzeit ergänzen."} />
      <form
        className={s.form}
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (!f.name.trim()) {
            setErr("Wie heißt dein Pferd?");
            return;
          }
          setBusy(true);
          try {
            await saveHorse({ ...f, relation: f.relation || undefined, photo, id: old?.id });
            notify(old ? "Steckbrief gespeichert" : `${f.name.trim()} ist jetzt in deinem Stall`);
            router.push("/tagebuch/pferde");
          } catch {
            notify("Speichern hat nicht geklappt. Ist das Foto vielleicht zu groß?");
            setBusy(false);
          }
        }}
      >
        <div className={s.card}>
          <h2 className={s.cardTitle}>Steckbrief</h2>
          <Field label="Name" required value={f.name} onChange={(v) => { set("name")(v); setErr(undefined); }} max={40} error={err} />
          <PhotoField label="Foto" value={photo} onChange={setPhoto} />
          <Field label="Spitzname" value={f.nickname} onChange={set("nickname")} max={40} />
          <div className={s.twoCol}>
            <Field label="Alter oder Geburtsjahr" value={f.age} onChange={set("age")} max={20} placeholder="z. B. 12 oder 2014" />
            <Field label="Größe" value={f.height} onChange={set("height")} max={20} placeholder="z. B. 148 cm" />
          </div>
          <div className={s.twoCol}>
            <Field label="Rasse" value={f.breed} onChange={set("breed")} max={60} />
            <Field label="Fellfarbe" value={f.color} onChange={set("color")} max={40} placeholder="z. B. Fuchs" />
          </div>
          <Select label="Geschlecht" value={f.sex} onChange={set("sex")} options={SEXES.map((x) => ({ value: x, label: x }))} />
          <Select label="Wir zwei sind …" value={f.relation} onChange={set("relation")} options={RELATIONS.map((r) => ({ value: r.id, label: r.label }))} />
          <Field label="Seit wann reiten wir zusammen?" value={f.since} onChange={set("since")} max={40} placeholder="z. B. seit Sommer 2025" />
        </div>
        <div className={s.card}>
          <h2 className={s.cardTitle}>Wir beide</h2>
          <TextArea label="Das mag ich besonders an dir" value={f.likes} onChange={set("likes")} max={600} rows={2} />
          <TextArea label="Das können wir gut" value={f.goodAt} onChange={set("goodAt")} max={600} rows={2} />
          <TextArea label="Daran arbeiten wir" value={f.workingOn} onChange={set("workingOn")} max={600} rows={2} />
          <TextArea label="Freie Notizen" value={f.notes} onChange={set("notes")} rows={3} />
        </div>
        <button type="submit" className={s.btnPrimary} disabled={busy}>
          {busy ? "Speichert …" : old ? "Änderungen speichern" : "Pferd anlegen"}
        </button>
      </form>
      {old && (
        <DeleteButton
          label="Pferd löschen"
          question={`${old.name} wirklich löschen? Deine Reitstunden bleiben erhalten, nur ohne Pferd.`}
          onConfirm={async () => {
            try {
              await deleteHorse(old.id);
              notify(`${old.name} wurde gelöscht`);
              router.push("/tagebuch/pferde");
            } catch {
              notify("Löschen hat nicht geklappt.");
            }
          }}
        />
      )}
    </div>
  );
}
