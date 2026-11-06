"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { HorseHead } from "@/components/illustrations/HorseHead";
import type { HorseLook } from "@/content/types";
import { shrinkPhoto } from "./photo";
import type { Horse, Mood } from "./types";
import s from "./tagebuch.module.css";

/* ---------- Kopfzeile einer Unterseite ---------- */
export function SubHeader({ title, intro, back = "/tagebuch", action }: { title: string; intro?: string; back?: string; action?: ReactNode }) {
  return (
    <header className={s.subHeader}>
      <div className={s.subRow}>
        <Link href={back} className={s.back} aria-label="Zurück">
          <Icon name="back" />
        </Link>
        <h1 className={s.subTitle}>{title}</h1>
        {action}
      </div>
      {intro && <p className={s.lead}>{intro}</p>}
    </header>
  );
}

/* ---------- Formularfelder ---------- */
type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
  max?: number;
  error?: string;
  required?: boolean;
  type?: "text" | "date" | "number";
  inputMode?: "numeric" | "text";
  min?: string;
  maxValue?: string;
};

export function Field({ label, value, onChange, hint, placeholder, max = 80, error, required, type = "text", inputMode, min, maxValue }: FieldProps) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
        {!required && <span className={s.optional}> (freiwillig)</span>}
      </label>
      <input
        id={id}
        className={`${s.input} ${error ? s.inputError : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={type === "text" ? max : undefined}
        min={min}
        max={maxValue}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {(error || hint) && (
        <p id={`${id}-msg`} className={error ? s.error : s.hint}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function TextArea({ label, value, onChange, placeholder, max = 2000, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; max?: number; rows?: number }) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <textarea id={id} className={s.textarea} value={value} rows={rows} maxLength={max} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Select({ label, value, onChange, options, empty = "Bitte wählen" }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; empty?: string }) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label} <span className={s.optional}>(freiwillig)</span>
      </label>
      <select id={id} className={s.input} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{empty}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Auswahl als große Knöpfe (eine Wahl, nochmal tippen hebt sie auf) */
export function Chips<T extends string>({ label, value, onChange, options }: { label: string; value: T | ""; onChange: (v: T | "") => void; options: { value: T; label: string }[] }) {
  return (
    <fieldset className={s.fieldset}>
      <legend className={s.label}>{label}</legend>
      <div className={s.chips}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`${s.chip} ${value === o.value ? s.chipOn : ""}`}
            aria-pressed={value === o.value}
            onClick={() => onChange(value === o.value ? "" : o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- Foto (nur auf dem Gerät) ---------- */
export function PhotoField({ label, value, onChange }: { label: string; value?: string; onChange: (v: string | undefined) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className={s.field}>
      <span className={s.label}>
        {label} <span className={s.optional}>(freiwillig)</span>
      </span>
      <div className={s.photoRow}>
        {value ? (
          <img src={value} alt="" className={s.photoThumb} />
        ) : (
          <span className={s.photoEmpty} aria-hidden>
            <Icon name="star" />
          </span>
        )}
        <div className={s.photoBtns}>
          <button type="button" className={s.btnGhost} onClick={() => ref.current?.click()} disabled={busy}>
            {busy ? "Wird vorbereitet …" : value ? "Anderes Foto" : "Foto wählen"}
          </button>
          {value && (
            <button type="button" className={s.btnText} onClick={() => onChange(undefined)}>
              Foto entfernen
            </button>
          )}
        </div>
      </div>
      <p className={err ? s.error : s.hint}>{err ?? "Das Foto bleibt nur auf diesem Gerät und wird verkleinert gespeichert."}</p>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          setBusy(true);
          setErr(null);
          try {
            onChange(await shrinkPhoto(f));
          } catch {
            setErr("Dieses Bild konnte nicht geöffnet werden. Probiere ein anderes Foto.");
          } finally {
            setBusy(false);
          }
        }}
      />
    </div>
  );
}

/* ---------- Löschen mit Rückfrage (ohne Browser-Dialog) ---------- */
export function DeleteButton({ label = "Löschen", question, onConfirm }: { label?: string; question: string; onConfirm: () => Promise<void> | void }) {
  const [ask, setAsk] = useState(false);
  if (!ask)
    return (
      <button type="button" className={s.btnDanger} onClick={() => setAsk(true)}>
        {label}
      </button>
    );
  return (
    <div className={s.confirm} role="group" aria-label={question}>
      <p>{question}</p>
      <div className={s.actions}>
        <button type="button" className={s.btnDangerSolid} onClick={() => void onConfirm()}>
          Ja, löschen
        </button>
        <button type="button" className={s.btnGhost} onClick={() => setAsk(false)}>
          Abbrechen
        </button>
      </div>
    </div>
  );
}

/* ---------- Hinweise ---------- */
export function Toast({ text, onDone }: { text: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [text, onDone]);
  return (
    <div className={s.toastWrap} aria-live="polite">
      {text && <div className={s.toast}>{text}</div>}
    </div>
  );
}

export function EmptyState({ title, text, action, art = "horse" }: { title: string; text: string; action?: ReactNode; art?: "horse" | "star" | "book" }) {
  return (
    <div className={s.empty}>
      <span className={s.emptyArt} aria-hidden>
        {art === "horse" ? <HorseHead look={looks.fuchs} mood="neugierig" className={s.emptyHorse} /> : <Icon name={art === "star" ? "star" : "pass"} />}
      </span>
      <h2 className={s.emptyTitle}>{title}</h2>
      <p className={s.emptyText}>{text}</p>
      {action}
    </div>
  );
}

/* ---------- Stimmungs-Icons ---------- */
const MOUTH: Record<Mood, string> = {
  super: "M8 14.5c1.2 2 6.8 2 8 0",
  gut: "M8.5 14.5c1.2 1.2 5.8 1.2 7 0",
  gemischt: "M8.5 15h7",
  schwierig: "M8.5 16c1.2-1.4 5.8-1.4 7 0",
  lehrreich: "M9 15.2c1-.8 5-.8 6 0",
};

export function MoodIcon({ mood, className }: { mood: Mood; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r=".9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r=".9" fill="currentColor" stroke="none" />
      <path d={MOUTH[mood]} />
      {mood === "super" && <path d="M4.5 4.5 3 3M19.5 4.5 21 3" />}
      {mood === "lehrreich" && <path d="M17.5 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" stroke="none" />}
    </svg>
  );
}

/* ---------- Pferdebild: Foto oder gezeichneter Kopf in passender Fellfarbe ---------- */
const looks: Record<string, HorseLook> = {
  fuchs: { coat: "#b8673a", coatShade: "#8f4c2a", mane: "#9a5530", hoof: "#5e4636", face: "blaze" },
  braun: { coat: "#7a4a2c", coatShade: "#5a3420", mane: "#2c2a24", hoof: "#3a2e26", face: "star", points: "#2c2a24" },
  rappe: { coat: "#3a3632", coatShade: "#26231f", mane: "#1f1c19", hoof: "#2c2a24", face: "none" },
  schimmel: { coat: "#e9e4da", coatShade: "#cfc7b8", mane: "#d8d1c4", hoof: "#7c7468", face: "none", dapples: true },
  falbe: { coat: "#c9a46a", coatShade: "#a8834d", mane: "#3d3128", hoof: "#4a3c30", face: "none", points: "#3d3128" },
  isabell: { coat: "#e2c48c", coatShade: "#c6a56c", mane: "#f3ead6", hoof: "#7c6650", face: "blaze" },
  schecke: { coat: "#8a5a3a", coatShade: "#6a4228", mane: "#3a2e26", hoof: "#5e4636", face: "blaze", pinto: true },
};

function lookFor(color?: string): HorseLook {
  const c = (color ?? "").toLowerCase();
  if (/schimmel|grau|weiß/.test(c)) return looks.schimmel;
  if (/rapp|schwarz/.test(c)) return looks.rappe;
  if (/fuchs|rot/.test(c)) return looks.fuchs;
  if (/falb|dun/.test(c)) return looks.falbe;
  if (/isabell|palomino|cremello/.test(c)) return looks.isabell;
  if (/scheck|tobiano|overo|pinto|tiger/.test(c)) return looks.schecke;
  return looks.braun;
}

export function HorsePic({ horse, className }: { horse: Pick<Horse, "photo" | "color" | "name">; className?: string }) {
  if (horse.photo)
    return <img src={horse.photo} alt={`Foto von ${horse.name}`} className={`${s.horsePhoto} ${className ?? ""}`} />;
  return (
    <span className={`${s.horseDrawn} ${className ?? ""}`}>
      <HorseHead look={lookFor(horse.color)} mood="neugierig" title={horse.name} />
    </span>
  );
}

/* ---------- Erfolgsanimation beim Erreichen eines Ziels ---------- */
export function Celebration({ title, onClose }: { title: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3800);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={s.celebrate} role="status" onClick={onClose}>
      <div className={s.celebrateCard}>
        <span className={s.celebrateRing} aria-hidden>
          <Icon name="horseshoe" />
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} className={s.spark} style={{ ["--a" as string]: `${i * 45}deg` }} />
          ))}
        </span>
        <p className={s.eyebrowSmall}>Geschafft!</p>
        <p className={s.celebrateTitle}>{title}</p>
        <p className={s.celebrateText}>Darauf kannst du stolz sein.</p>
      </div>
    </div>
  );
}
