import "server-only";
import { card, head, no, ok } from "@/content/akademie/build";
import { noAudio, type AcademyLesson } from "@/content/akademie/types";

/**
 * Premium-Lektion der Reitakademie, Kapitel 1 „Die Sprache der Pferde“
 * (Freitag, 13. November 2026). Gleiches Format wie die kostenlosen Lektionen,
 * liegt aber nur auf dem Server und wird erst nach Prüfung von Mitgliedschaft
 * und Termin ausgeliefert. ID nie ändern (Fortschritt hängt daran).
 */
export const spracheDerPferde: AcademyLesson = {
  id: "ra-p1-l1",
  slug: "sprache-der-pferde",
  number: 1,
  title: "Die Sprache der Pferde",
  speaker: "mila",
  intro: {
    leicht: "Pferde sprechen nicht mit Worten. Sie sprechen mit Ohren, Augen und dem ganzen Körper.",
    mittel: "Pferde reden ständig mit uns – nur nicht mit Worten. Wer ihre Körpersprache lesen kann, versteht, wie es ihnen geht, und ist sicherer am Pferd.",
  },
  explanation: {
    leicht: [
      "Schau auf die Ohren! Zeigen beide Ohren nach vorn, ist das Pferd neugierig. Sind die Ohren locker zur Seite, ist es entspannt.",
      "Legt ein Pferd die Ohren ganz flach nach hinten, ist es ärgerlich. Dann gehst du nicht hin und holst einen Erwachsenen.",
      "Auch die Augen verraten viel: Weiche, halb geschlossene Augen heißen: Mir geht's gut. Weit aufgerissene Augen heißen: Ich habe Angst.",
    ],
    mittel: [
      "Die Ohren sind wie Antennen. Beide nach vorn gespitzt: Das Pferd ist aufmerksam oder neugierig. Locker zur Seite hängend: Es ist entspannt oder döst. Ein Ohr nach hinten gedreht, zum Beispiel beim Reiten: Es hört dir zu.",
      "Ganz flach nach hinten angelegte Ohren sind eine Warnung: Das Pferd ist ärgerlich oder fühlt sich bedrängt. Dazu kommen oft ein angespanntes Maul und ein schlagender Schweif. Dann hältst du Abstand und sagst einem Erwachsenen Bescheid.",
      "Augen und Körper ergänzen das Bild. Weiche Augen, gesenkter Kopf und ein angewinkelter Hinterhuf bedeuten Entspannung. Ein hoch erhobener Kopf, sichtbares Weiß im Auge, geblähte Nüstern und ein angespannter Körper zeigen Angst oder große Aufregung – ein Fluchttier ist dann bereit, wegzulaufen.",
    ],
  },
  illustration: head("tivoli", "neugierig"),
  terms: [
    { term: "Ohrenspiel", meaning: "Wie ein Pferd seine Ohren bewegt – es zeigt, worauf es achtet und wie es sich fühlt." },
    { term: "Nüstern", meaning: "Die Nasenlöcher des Pferdes. Bei Aufregung werden sie groß und weit." },
    { term: "Dösen", meaning: "Leichter Ruheschlaf im Stehen, oft mit einem angewinkelten Hinterbein." },
  ],
  exercise: [
    {
      type: "match",
      id: "ra-p1-l1-ohren",
      prompt: { leicht: "Wie fühlt sich das Pferd? Sortiere die Köpfe.", mittel: "Lies die Ohren: Ordne jeden Pferdekopf der passenden Stimmung zu." },
      targets: [
        { id: "gut", label: "Alles gut – du darfst ruhig hingehen" },
        { id: "abstand", label: "Vorsicht – Abstand halten" },
      ],
      items: [
        card("neugierig", "Ohren nach vorn", head("scrabble", "neugierig"), "gut", "Richtig! Neugierig und freundlich.", "Ohren nach vorn heißen: Ich bin neugierig."),
        card("entspannt", "Ohren locker zur Seite", head("tivoli", "entspannt"), "gut", "Genau. Das Pferd ist entspannt.", "Lockere Ohren heißen: Ich bin ganz entspannt."),
        card("grummelig", "Ohren flach nach hinten", head("tonga", "grummelig"), "abstand", "Richtig. Angelegte Ohren sind eine Warnung.", "Angelegte Ohren heißen: Bleib weg! Hier hältst du Abstand."),
        card("aufgeregt", "Kopf hoch, Augen weit", head("scrabble", "aufgeregt"), "abstand", "Stimmt. Das Pferd ist aufgeregt – gib ihm Zeit.", "Ein aufgeregtes Pferd kann plötzlich springen. Halte Abstand.", ["mittel"]),
      ],
    },
  ],
  quiz: [
    {
      id: "ohren-vorn",
      prompt: { leicht: "Beide Ohren zeigen nach vorn. Was heißt das?", mittel: "Ein Pferd spitzt beide Ohren nach vorn und schaut zum Tor. Was bedeutet das?" },
      visual: head("scrabble", "neugierig"),
      options: [
        ok("neugierig", "Es ist neugierig und passt auf"),
        no("schlaf", "Es schläft gleich ein", "Ein müdes Pferd lässt die Ohren locker hängen. Gespitzte Ohren heißen: Ich bin aufmerksam."),
        no("wut", "Es ist wütend", "Wütend legt ein Pferd die Ohren flach nach hinten. Nach vorn heißt: neugierig."),
      ],
      explain: { leicht: "Richtig! Es ist neugierig.", mittel: "Richtig! Gespitzte Ohren zeigen, wohin das Pferd seine Aufmerksamkeit richtet." },
    },
    {
      id: "angelegt",
      prompt: { leicht: "Ein Pferd legt die Ohren flach nach hinten. Was machst du?", mittel: "Ein Pferd in der Box legt die Ohren flach an, als du kommst. Was tust du?" },
      visual: head("tonga", "grummelig"),
      options: [
        ok("abstand", "Abstand halten und einen Erwachsenen holen"),
        no("streicheln", "Schnell hingehen und es streicheln", "Angelegte Ohren sind eine Warnung. Jetzt nicht hingehen – erst einen Erwachsenen holen."),
        no("leckerli", "Ein Leckerli hinhalten", "Mit Futter in der Hand kann es noch brenzliger werden. Halte Abstand."),
      ],
      explain: {
        leicht: "Richtig! Du bleibst weg und holst einen Erwachsenen.",
        mittel: "Richtig! Angelegte Ohren sagen: Lass mich in Ruhe. Du respektierst das, hältst Abstand und holst einen Erwachsenen.",
      },
    },
    {
      id: "entspannt",
      prompt: { leicht: "Woran erkennst du ein entspanntes Pferd?", mittel: "Welches Zeichen spricht für ein entspanntes, dösendes Pferd?" },
      options: [
        ok("bein", "Weiche Augen und ein angewinkeltes Hinterbein"),
        no("nuestern", "Weit geblähte Nüstern", "Große, weite Nüstern zeigen Aufregung, nicht Entspannung."),
        no("weiss", "Man sieht das Weiße im Auge", "Viel Weiß im Auge ist ein Zeichen für Angst."),
      ],
      explain: {
        leicht: "Richtig! Dann ruht sich das Pferd aus.",
        mittel: "Richtig! Ein entspanntes Pferd hat weiche Augen, lässt den Kopf sinken und stellt oft einen Hinterhuf locker auf die Spitze.",
      },
    },
    {
      id: "ohr-hinten",
      levels: ["mittel"],
      prompt: "Beim Reiten dreht das Pferd ein Ohr nach hinten zu dir. Was heißt das meistens?",
      options: [
        ok("zuhoeren", "Es hört dir zu und achtet auf dich"),
        no("aerger", "Es ärgert sich über dich", "Ärger zeigt das Pferd mit BEIDEN Ohren flach angelegt. Ein Ohr locker nach hinten heißt: Ich höre dir zu."),
        no("krank", "Es ist krank", "Ein Ohr nach hinten ist ganz normal – das Pferd achtet auf seine Reiterin."),
      ],
      explain: { leicht: "Richtig!", mittel: "Richtig! Das Pferd teilt seine Aufmerksamkeit: ein Ohr nach vorn auf den Weg, eins nach hinten zu dir." },
    },
  ],
  merksatz: {
    leicht: "Ohren vorn: neugierig. Ohren locker: entspannt. Ohren flach hinten: Abstand halten!",
    mittel: "Lies das ganze Pferd – Ohren, Augen, Nüstern, Kopf und Körper. Bei angelegten Ohren oder Angst hältst du Abstand und holst einen Erwachsenen.",
  },
  practiceNote: "Pferdekörpersprache am echten Pferd bitte nur gemeinsam mit einer erfahrenen Person beobachten.",
  audio: noAudio(),
  review: { status: "entwurf", note: "Fachliche Abnahme durch Reitlehrerin ausstehend" },
};
