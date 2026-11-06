"use client";

import { useState } from "react";
import type { Notify } from "../DiaryApp";
import { saveProfile } from "../store";
import { DISCIPLINES, LEVELS, type DiaryData } from "../types";
import { Field, Select, SubHeader, TextArea } from "../ui";
import s from "../tagebuch.module.css";

export function ProfileView({ data, notify }: { data: DiaryData; notify: Notify }) {
  const p = data.profile;
  const [name, setName] = useState(p.name ?? "");
  const [since, setSince] = useState(p.ridingSince ?? "");
  const [level, setLevel] = useState(p.level ?? "");
  const [fav, setFav] = useState(p.favoriteDiscipline ?? "");
  const [wish, setWish] = useState(p.wish ?? "");
  const [proud, setProud] = useState(p.proud ?? "");
  const [busy, setBusy] = useState(false);

  return (
    <div className={s.stack}>
      <SubHeader title="Mein Reiterprofil" intro="Alles freiwillig. Ein Spitzname reicht völlig – deinen echten Namen brauchst du hier nicht." />
      <form
        className={s.form}
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await saveProfile({ name, ridingSince: since, level, favoriteDiscipline: fav, wish, proud });
            notify("Profil gespeichert");
          } catch {
            notify("Speichern hat nicht geklappt. Bitte nochmal versuchen.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className={s.card}>
          <Field label="Vorname oder Spitzname" value={name} onChange={setName} max={40} placeholder="z. B. Lotti" />
          <Field label="Seit wann reitest du?" value={since} onChange={setSince} max={40} placeholder="z. B. seit 2023 oder seit ich 7 bin" />
          <Select label="Reitniveau" value={level} onChange={setLevel} options={LEVELS.map((l) => ({ value: l, label: l }))} />
          <Select label="Lieblingsdisziplin" value={fav} onChange={setFav} options={DISCIPLINES.map((l) => ({ value: l, label: l }))} />
        </div>
        <div className={s.card}>
          <TextArea label="Mein größter Reitwunsch" value={wish} onChange={setWish} max={400} rows={2} />
          <TextArea label="Darauf bin ich stolz" value={proud} onChange={setProud} max={400} rows={2} />
        </div>
        <button type="submit" className={s.btnPrimary} disabled={busy}>
          {busy ? "Speichert …" : "Profil speichern"}
        </button>
      </form>
    </div>
  );
}
