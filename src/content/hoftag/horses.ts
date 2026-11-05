import type { HorseId, HorseProfile } from "./types";

/**
 * Spielprofile der drei Hofpferde. Aussehen, Porträt und Steckbrief kommen aus
 * content/horses.ts – hier steht nur, wie sich jedes Pferd im Hoftag verhält.
 * Verhalten bleibt echtes Pferdeverhalten: keine Gedanken, keine Gefühle in Worten.
 */
export const horseProfiles: Record<HorseId, HorseProfile> = {
  tivoli: {
    id: "tivoli",
    traits: ["neugierig", "verfressen"],
    pitch: "Freundlich und manchmal ein bisschen frech. Tivoli schnuppert an allem – vor allem an Jackentaschen.",
    greeting: "Tivoli streckt den Kopf über die Boxentür, spitzt die Ohren und schnuppert an deiner Hand.",
    start: { wohl: 62, wasser: 55, futter: 25, pflege: 45, bewegung: 20, vertrauen: 40 },
    observations: [
      {
        id: "tivoli-waelzen",
        text: "Tivoli legt sich in den Sand, rollt sich hin und her und steht dann auf und schüttelt sich.",
        question: "Was macht Tivoli da?",
        options: [
          { id: "a", label: "Tivoli wälzt sich – das tut gut", correct: true, feedback: "Genau! Wälzen ist Fellpflege und entspannt die Muskeln." },
          { id: "b", label: "Tivoli ist hingefallen", correct: false, feedback: "Fast! Schau genau hin: Tivoli legt sich freiwillig hin und rollt sich." },
          { id: "c", label: "Tivoli will spielen", correct: false, feedback: "Nicht ganz. Tivoli kümmert sich gerade um sein Fell." },
        ],
        learn: "Pferde wälzen sich, um Haut und Fell zu pflegen. Danach schütteln sie sich – ein gutes Zeichen.",
        knowledgeCard: "waelzen",
      },
      {
        id: "tivoli-fressen",
        text: "Tivoli zupft Heu aus dem Heunetz und kaut und kaut und kaut.",
        question: "Wie lange fressen Pferde am Tag ungefähr?",
        options: [
          { id: "a", label: "Etwa eine Stunde", correct: false, feedback: "Viel länger! Schau, wie langsam Tivoli Halm für Halm frisst." },
          { id: "b", label: "Viele Stunden über den Tag verteilt", correct: true, feedback: "Richtig! Pferde fressen in der Natur 12 bis 16 Stunden am Tag." },
          { id: "c", label: "Nur morgens und abends", correct: false, feedback: "Fast! Pferde brauchen fast immer etwas zum Knabbern – darum gibt es Heu." },
        ],
        learn: "Der Pferdemagen ist klein. Darum brauchen Pferde viele kleine Portionen Raufutter.",
        knowledgeCard: "raufutter",
      },
    ],
  },
  tonga: {
    id: "tonga",
    traits: ["aufmerksam", "feinfühlig"],
    pitch: "Tonga merkt jede Kleinigkeit und mag einen ruhigen Umgang. Wer leise ist, gewinnt Tongas Vertrauen.",
    special: "Ruhig ansprechen, langsam bewegen.",
    greeting: "Tonga hebt den Kopf, ein Ohr zeigt zu dir. Dann kommt Tonga langsam an die Tür und bläst dir sanft in die Hand.",
    start: { wohl: 60, wasser: 58, futter: 25, pflege: 50, bewegung: 20, vertrauen: 35 },
    observations: [
      {
        id: "tonga-doesen",
        text: "Tonga steht entspannt in der Sonne. Die Unterlippe hängt locker, ein Hinterbein ist angewinkelt, die Augen sind halb zu.",
        question: "Wie geht es Tonga gerade?",
        options: [
          { id: "a", label: "Tonga döst entspannt", correct: true, feedback: "Genau! Ein angewinkeltes Hinterbein und eine lockere Lippe zeigen: Tonga ruht sich aus." },
          { id: "b", label: "Tonga hat Schmerzen im Bein", correct: false, feedback: "Fast! Schau noch einmal: Tonga wechselt das Bein ab und steht ganz locker." },
          { id: "c", label: "Tonga ist traurig", correct: false, feedback: "Nicht ganz. Lockere Lippe, halb geschlossene Augen – so sieht Ausruhen aus." },
        ],
        learn: "Pferde schlafen nicht nur nachts. Sie ruhen auch mehrmals über den Tag verteilt – oft im Stehen.",
        knowledgeCard: "doesen",
      },
      {
        id: "tonga-ohren",
        text: "Tonga steht am Zaun. Beide Ohren zeigen nach vorn zum Wald, der Kopf ist hoch.",
        question: "Was zeigen Tongas Ohren?",
        options: [
          { id: "a", label: "Tonga ist schläfrig", correct: false, feedback: "Fast! Schläfrige Pferde lassen die Ohren locker zur Seite hängen." },
          { id: "b", label: "Tonga hört und schaut aufmerksam", correct: true, feedback: "Richtig! Nach vorn gerichtete Ohren heißen: Da ist etwas Spannendes." },
          { id: "c", label: "Tonga ist wütend", correct: false, feedback: "Nicht ganz. Angelegte Ohren würden Ärger zeigen – Tongas Ohren sind gespitzt." },
        ],
        learn: "An den Ohren erkennst du, wohin ein Pferd seine Aufmerksamkeit richtet.",
        knowledgeCard: "ohren",
      },
    ],
  },
  scrabble: {
    id: "scrabble",
    traits: ["erfahren", "gelassen"],
    pitch: "Groß, ruhig und lieb. Scrabble hat Asthma – darum achten wir besonders auf Staub und frische Luft.",
    special: "Hat Asthma: staubarmes Heu und Einstreu, gute Stallluft.",
    greeting: "Scrabble brummelt leise, als du kommst, und senkt den großen Kopf zu dir herunter.",
    start: { wohl: 60, wasser: 55, futter: 25, pflege: 45, bewegung: 20, vertrauen: 45 },
    observations: [
      {
        id: "scrabble-atmen",
        text: "Scrabble steht im Paddock und atmet ruhig. Die Flanken heben und senken sich langsam und gleichmäßig.",
        question: "Ist Scrabbles Atmung in Ordnung?",
        options: [
          { id: "a", label: "Ja, ruhig und gleichmäßig", correct: true, feedback: "Genau! Ruhige, gleichmäßige Atmung ist gut – gerade bei Scrabble schauen wir darauf." },
          { id: "b", label: "Nein, Scrabble atmet zu langsam", correct: false, feedback: "Fast! Im Stehen atmen Pferde ganz ruhig, etwa 8- bis 16-mal pro Minute." },
        ],
        learn: "Bei einem Pferd mit Asthma ist frische Luft wichtig. Hustet es oder atmet es schwer, sagen wir sofort Bescheid.",
        knowledgeCard: "atmung",
      },
      {
        id: "scrabble-herde",
        text: "Scrabble steht dicht neben Tivoli. Die beiden kraulen sich gegenseitig am Widerrist.",
        question: "Warum machen die beiden das?",
        options: [
          { id: "a", label: "Sie streiten sich", correct: false, feedback: "Fast! Schau hin: Beide stehen ganz entspannt und kraulen sich vorsichtig." },
          { id: "b", label: "Sie pflegen ihre Freundschaft", correct: true, feedback: "Richtig! Gegenseitiges Kraulen zeigt: Die beiden mögen sich." },
        ],
        learn: "Pferde sind Herdentiere. Sie brauchen andere Pferde, um sich sicher und wohl zu fühlen.",
        knowledgeCard: "herde",
      },
    ],
  },
};

export const HORSE_IDS: HorseId[] = ["tivoli", "tonga", "scrabble"];
