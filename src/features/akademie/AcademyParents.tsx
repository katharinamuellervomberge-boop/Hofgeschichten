"use client";

import { useEffect, useState } from "react";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { ACADEMY_TIERS, ACADEMY_TITLE, academyGames, PROFI_TITLE, worlds } from "@/content/akademie";
import { academyStamps, PROFI_STAMP_ID } from "@/content/akademie/stamps";
import { earnedStamps } from "@/lib/progress/stamps";
import { useProgress } from "@/lib/progress/store";
import { worldDoneCount, worldsDoneCount } from "./progress";
import parents from "@/features/parents/ParentsArea.module.css";
import styles from "./akademie.module.css";
import cert from "./certificate.module.css";

/**
 * Elternbereich: Lernziele, Fortschritt und druckbare Urkunde der Reitakademie.
 * Der Name für die Urkunde wird nicht gespeichert – er existiert nur, solange die Seite offen ist.
 */
export function AcademyParents() {
  const progress = useProgress();
  const earned = earnedStamps(progress);
  const profi = earned.has(PROFI_STAMP_ID);
  const doneWorlds = worldsDoneCount(progress);
  const [name, setName] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }));
  }, []);

  useEffect(() => {
    const after = () => document.body.classList.remove("hg-print-cert");
    window.addEventListener("afterprint", after);
    return () => window.removeEventListener("afterprint", after);
  }, []);

  const print = () => {
    document.body.classList.add("hg-print-cert");
    window.print();
    // Manche Browser lösen „afterprint“ nicht aus
    window.setTimeout(() => document.body.classList.remove("hg-print-cert"), 1500);
  };

  const badges = academyStamps().filter((s) => s.id !== PROFI_STAMP_ID);

  return (
    <>
      <section className={parents.card} aria-labelledby="p-akademie">
        <h2 id="p-akademie">{ACADEMY_TITLE}</h2>
        <p>
          Zwei Teile: Die <strong>{ACADEMY_TIERS.klein.short}</strong> ist kostenlos (Lernwelten 1–3 und zwei Mini-Spiele).
          Die <strong>{ACADEMY_TIERS.gross.short}</strong> (Lernwelten 4–8, zwei weitere Mini-Spiele, später Animationen und
          Lernvideos) ist in der Mitgliedschaft enthalten oder einzeln erhältlich. Jede Lektion hat einen Einstieg, eine
          Erklärung mit Bild, eine Übung, mindestens drei Quizfragen mit Rückmeldung und einen Merksatz – in den Stufen
          Leicht (4–7) und Mittel (8–12).
        </p>
        <ul className={styles.worldStats} aria-label="Fortschritt je Lernwelt">
          {worlds.map((w) => (
            <li key={w.id}>
              <span>
                {w.number}. {w.title}
                {w.tier === "gross" ? " (Große Akademie)" : ""}
              </span>
              <strong>
                {worldDoneCount(progress, w)} / {w.lessons.length}
              </strong>
            </li>
          ))}
        </ul>
        <ul className={parents.learnList}>
          {worlds.map((w) => (
            <li key={w.id}>
              <strong>{w.title}</strong>
              <p>{w.learns}</p>
            </li>
          ))}
          {academyGames.map((g) => (
            <li key={g.id}>
              <strong>
                Spiel: {g.title}
                {g.tier === "gross" ? " (Große Akademie)" : ""}
              </strong>
              <p>{g.learns}</p>
            </li>
          ))}
        </ul>
        <p className={styles.practice} style={{ textAlign: "left" }}>
          Wichtig: Die Akademie vermittelt Wissen und ersetzt keinen Reitunterricht. Praktische Übungen bitte nur unter
          Anleitung einer qualifizierten Reitlehrkraft. Der Fortschritt wird nur auf diesem Gerät gespeichert und kann beim
          Gerätewechsel oder Löschen der Browserdaten verloren gehen.
        </p>
      </section>

      <section className={parents.card} aria-labelledby="p-urkunde">
        <h2 id="p-urkunde">Urkunde „Reitwissen-Profi“</h2>
        {profi ? (
          <div className={styles.certForm}>
            <p>Alle acht Lernwelten sind geschafft. Sie können eine Urkunde mit einem frei gewählten Namen drucken.</p>
            <label>
              <span className="eyebrow">Name auf der Urkunde</span>
              <input
                className={styles.certInput}
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 40))}
                placeholder="z. B. Vorname"
                autoComplete="off"
                maxLength={40}
              />
            </label>
            <p className={styles.practice} style={{ textAlign: "left" }}>
              Der Name wird nicht gespeichert und nicht verschickt.
            </p>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={print}>
              Urkunde drucken
            </button>
          </div>
        ) : (
          <p>
            Die Urkunde wird freigeschaltet, sobald alle acht Lernwelten abgeschlossen sind ({doneWorlds} von {worlds.length}{" "}
            geschafft).
          </p>
        )}
        <p className={styles.practice} style={{ textAlign: "left" }}>
          Die Auszeichnung ist ein spielerischer Wissensnachweis – kein offizieller Reitpass und kein Nachweis praktischer
          Reitfähigkeiten.
        </p>
      </section>

      {profi && (
        <div className={`hg-cert ${cert.cert}`} aria-hidden>
          <div className={cert.frame}>
            <p className={cert.kicker}>Urkunde</p>
            <p className={cert.title}>{PROFI_TITLE}</p>
            <p className={cert.for}>für</p>
            <p className={cert.name}>{name.trim() || " "}</p>
            <p className={cert.text}>hat alle acht Lernwelten der kleinen Reitakademie mit 40 Lektionen erfolgreich abgeschlossen.</p>
            <div className={cert.seals}>
              {badges.map((s, i) => (
                <div key={s.id} className={cert.sealItem}>
                  <StampSeal stamp={s} earned tilt={i % 2 ? 5 : -5} className={cert.seal} />
                  <span>{s.title}</span>
                </div>
              ))}
            </div>
            <p className={cert.date}>{today}</p>
            <p className={cert.small}>
              Die Hofgeschichten · Spielerischer Wissensnachweis – kein offizieller Reitpass und kein Nachweis praktischer
              Reitfähigkeiten.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
