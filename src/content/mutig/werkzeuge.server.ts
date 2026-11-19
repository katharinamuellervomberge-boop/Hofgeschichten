import "server-only";
import type { Tool } from "./types";

/** Die 8 Werkzeuge – ausgeliefert nur an Käuferinnen */
export const TOOLS: Tool[] = [
  {
    id: "atem", name: "Atem-Reset", dauer: "1–2 Min.", tag: 2,
    wann: "Vor dem Aufsteigen und in jedem angespannten Moment",
    warum: "Langes Ausatmen bremst das Alarmsystem. Der Körper wird ruhiger – und das Pferd erlebt weniger Spannung.",
    schritte: ["Setz oder stell dich bequem hin.", "Atme etwa 4 Sekunden durch die Nase ein.", "Atme 6 bis 8 Sekunden aus, als würdest du durch einen Strohhalm pusten.", "Wiederhole das fünfmal. Im Sattel reicht ein einziger langer Atemzug aus."],
  },
  {
    id: "locker", name: "Lockerungs-Check", dauer: "30 Sek.", tag: 3,
    wann: "Im Sattel, einmal pro Runde",
    warum: "Angst macht fest: Kiefer, Schultern, Hände. Wer diese drei Stellen kennt, kann sie gezielt loslassen.",
    schritte: ["Kiefer: Zähne auseinander, Zunge locker.", "Schultern: einmal hochziehen, fallen lassen.", "Hände: Finger kurz öffnen und wieder schließen.", "Ins Gesäß „schmelzen“."],
  },
  {
    id: "gedanken", name: "Gedanken-Check", dauer: "3 Min.", tag: 4,
    wann: "Zu Hause oder im Auto vor dem Stall",
    warum: "Ängstliche Gedanken fühlen sich wie Tatsachen an. Drei Fragen helfen, sie zu prüfen statt wegzudrücken.",
    schritte: ["Was denke ich gerade?", "Wie wahrscheinlich ist das wirklich?", "Was kann ich tun, wenn es doch passiert?"],
  },
  {
    id: "blick", name: "Weiter Blick", dauer: "10 Sek.", tag: 7,
    wann: "Sobald du merkst, dass du nach unten schaust",
    warum: "Wo der Blick hingeht, folgt der Körper. Ein Punkt in der Ferne richtet dich auf.",
    schritte: ["Merk, wohin du gerade schaust.", "Such dir einen Punkt am Ende der Bahn.", "Lass den Blick dort, bis du an der Ecke bist."],
  },
  {
    id: "satz", name: "Mutmacher-Satz", dauer: "5 Sek.", tag: 8,
    wann: "Beim Aufsteigen und in kritischen Momenten",
    warum: "Ein kurzer, eigener Satz lenkt die Aufmerksamkeit weg vom Kopfkino hin zu dem, was du tun kannst.",
    schritte: ["Nimm deinen Satz.", "Sag ihn leise oder in Gedanken.", "Atme dabei aus."],
  },
  {
    id: "ritual", name: "Mut-Ritual", dauer: "5 Min.", tag: 10,
    wann: "Vor jedem Aufsteigen",
    warum: "Ein fester Ablauf sammelt dich und gibt Sicherheit – jedes Mal gleich.",
    schritte: ["Pferd anschauen: Wie ist es heute?", "Ausrüstung prüfen.", "Atem-Reset.", "Mutmacher-Satz.", "Ein kleines Ziel für heute."],
  },
  {
    id: "plan", name: "Wenn-dann-Plan", dauer: "10 Min.", tag: 16,
    wann: "Für deine drei größten Ängste",
    warum: "Wer vorher weiß, was sie tut, muss im Moment weniger entscheiden.",
    schritte: ["Nenne die Situation: „Wenn mein Pferd erschrickt …“", "Lege die Reaktion fest: „… dann atme ich aus, sitze aufrecht, schaue nach vorn.“", "Übe den Plan im Kopf, dann mit deiner Reitlehrerin."],
  },
  {
    id: "film", name: "Mut-Film", dauer: "2 Min.", tag: 18,
    wann: "Abends oder auf dem Weg zum Stall",
    warum: "Mentales Training: Dein Kopf übt eine Situation, bevor du sie erlebst.",
    schritte: ["Schließ die Augen.", "Erlebe die nächste Stufe aus deiner Sicht, mit Geräuschen und Gefühlen.", "Lass den Film gut enden."],
  },
];
