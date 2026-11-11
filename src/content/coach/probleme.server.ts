import "server-only";
import type { CoachProblem, CoachQuestion } from "./types";

/**
 * Rider Coach – die ersten zehn Problem-Lösungswege (nur Server).
 *
 * Alle Inhalte sind fachlicher ENTWURF (review: "entwurf"): vor der Veröffentlichung von einer
 * Reitlehrkraft prüfen lassen. Ursachen sind Möglichkeiten, keine Diagnosen. Gesundheitliche
 * Warnzeichen führen immer zur Empfehlung einer fachlichen Abklärung („abklaeren“) bzw. bei
 * akuter Gefahr zu „stopp“ (keine Übungen mit Pferd).
 *
 * Aufbau je Problem: 1. Beobachtung (≥ 3 Antworten) · 2.–3. Eingrenzung, teils verzweigt (showIf) ·
 * Sicherheitsfrage (safety, zählt nicht zur Höchstzahl) · Ausbildungsstand. Höchstens 5 normale Fragen
 * je Weg – das prüft `npm run check:coach` über alle Antwortkombinationen.
 */

/** Gemeinsame Frage nach dem Ausbildungsstand (steuert die Übungsschwierigkeit) */
const STAND: CoachQuestion = {
  id: "stand",
  text: "Wie würdest du deinen Ausbildungsstand einschätzen?",
  options: [
    { id: "anfaenger", label: "Anfänger" },
    { id: "fortg-anfaenger", label: "Fortgeschrittener Anfänger" },
    { id: "fortgeschritten", label: "Fortgeschritten" },
    { id: "wiedereinsteiger", label: "Wiedereinsteiger" },
  ],
};

const CHECK_HORSE = ["Tierarzt", "Sattler", "Reitlehrkraft"];

export const coachProblemData: CoachProblem[] = [
  /* ===================================================== 1 */
  {
    id: "cp-01",
    slug: "aussitzen",
    title: "Ich kann nicht aussitzen.",
    category: "sitz",
    review: "entwurf",
    intro: "Aussitzen heißt nicht stillhalten, sondern mitgehen. Drei kurze Fragen, dann weißt du, wo du ansetzen kannst.",
    questions: [
      {
        id: "was",
        text: "Was passiert, wenn du aussitzen willst?",
        options: [
          { id: "huepfen", label: "Ich hüpfe im Sattel.", summary: "du hüpfst beim Aussitzen im Sattel", weights: { steif: 2, balance: 1, tempo: 1 } },
          { id: "steif", label: "Ich werde steif und halte die Luft an.", summary: "du wirst beim Aussitzen steif", weights: { steif: 3, atmung: 2 } },
          { id: "rutschen", label: "Ich rutsche zur Seite oder nach vorn.", summary: "du rutschst beim Aussitzen aus der Mitte", weights: { balance: 3 } },
          { id: "klammern", label: "Ich halte mich mit den Beinen oder am Zügel fest.", summary: "du hältst dich beim Aussitzen fest", weights: { balance: 2, steif: 1 } },
          { id: "unsicher", label: "Ich bin mir nicht sicher.", weights: { steif: 1, balance: 1 } },
        ],
      },
      {
        id: "pferd",
        text: "Wie trabt das Pferd, auf dem du übst?",
        options: [
          { id: "gross", label: "Mit großen, schwungvollen Tritten.", summary: "das Pferd hat einen schwungvollen Trab", weights: { tempo: 3 } },
          { id: "normal", label: "Ganz normal und ruhig.", weights: { steif: 1 } },
          { id: "eilig", label: "Eher eilig und schnell.", summary: "das Pferd trabt eher eilig", weights: { tempo: 2 } },
          { id: "unsicher", label: "Weiß ich nicht.", weights: {} },
        ],
      },
      {
        id: "dauer",
        text: "Wann wird es schwierig?",
        showIf: { q: "was", anyOf: ["huepfen", "steif", "unsicher"] },
        options: [
          { id: "sofort", label: "Gleich bei den ersten Tritten.", summary: "es klappt schon bei den ersten Tritten nicht", weights: { steif: 2, atmung: 1 } },
          { id: "spaeter", label: "Nach einigen Tritten.", summary: "es geht ein paar Tritte gut und wird dann schwerer", weights: { kraft: 3 } },
          { id: "uebergang", label: "Beim Wechsel vom Leichttraben zum Aussitzen.", summary: "der Wechsel vom Leichttraben ist schwierig", weights: { balance: 2 } },
        ],
      },
      {
        id: "schmerz",
        safety: true,
        text: "Hast du beim Aussitzen Schmerzen, zum Beispiel im Rücken oder in der Hüfte?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja, das tut weh.", flag: "abklaeren", summary: "du hast beim Aussitzen Schmerzen" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "steif",
        title: "Zu viel Spannung im Körper",
        text: "Wer versucht, möglichst still zu sitzen, macht sich oft fest. Ein festes Becken kann die Bewegung des Pferderückens nicht aufnehmen – du wirst nach oben geworfen. Lockerheit in Becken und Hüfte ist wichtiger als Kraft.",
        exercises: ["rc-01", "rc-02", "rc-05"],
        base: 1,
      },
      {
        id: "balance",
        title: "Die Balance ist noch nicht stabil",
        text: "Wenn du nicht ganz in der Mitte sitzt, versucht der Körper sich festzuhalten – mit Beinen, Händen oder Rücken. Ein ausbalancierter Sitz auf beiden Sitzbeinhöckern ist die Grundlage für ruhiges Aussitzen.",
        exercises: ["rc-04", "rc-03", "rc-01"],
      },
      {
        id: "atmung",
        title: "Luft anhalten",
        text: "Viele halten beim Aussitzen unbewusst den Atem an. Dadurch wird der Bauch hart und das Becken fest. Ruhiges Ausatmen hilft, wieder mitzugehen.",
        exercises: ["rc-05", "rc-02"],
      },
      {
        id: "tempo",
        title: "Ein großer oder eiliger Trab",
        text: "Manche Pferde haben viel Schwung im Rücken oder traben eilig. Das ist zum Aussitzen-Lernen schwer. Ein ruhigeres Tempo oder ein bequemeres Pferd kann am Anfang helfen.",
        exercises: ["rc-02", "rc-04"],
      },
      {
        id: "kraft",
        title: "Rumpf und Beckenmuskulatur werden müde",
        text: "Wenn es ein paar Tritte klappt und dann schwer wird, fehlt oft noch Ausdauer in der Rumpfmuskulatur. Kurze Phasen und Übungen zu Hause helfen mehr als lange Strecken.",
        exercises: ["rc-02", "rc-01"],
      },
    ],
    mistakes: [
      "Möglichst still sitzen wollen – dadurch wirst du steif.",
      "Zu lange aussitzen, bis Rücken und Beine verkrampfen.",
      "Sich am Zügel festhalten.",
      "Mit den Knien klemmen.",
    ],
    nextLesson: [
      "Bitte um einige Runden mit kurzen Aussitzphasen im ruhigen Trab.",
      "Zähle beim Aussitzen die Tritte und atme bei jedem zweiten aus.",
      "Frag, ob du eine Longenstunde für den Sitz bekommen kannst.",
    ],
    safety: ["Halte dich bei Bedarf am Halsriemen fest, nicht an den Zügeln.", "Kurze Einheiten sind besser als lange."],
    checkWhen: ["Wenn du beim Aussitzen Schmerzen hast: ärztlich oder physiotherapeutisch abklären lassen.", "Wenn das Pferd beim Aussitzen den Rücken wegdrückt oder Abwehr zeigt: Sattel und Rücken prüfen lassen."],
    lessons: ["ra-w5-l3", "ra-w2-l1", "ra-w12-l1"],
    riderLab: ["rl-09", "rl-10", "rl-12"],
    plan: {
      goal: "Sicherer aussitzen lernen",
      weeks: [
        { title: "Balance und Körpergefühl", focus: "Becken beweglich machen, ruhig atmen", exercises: ["rc-01", "rc-05"] },
        { title: "Kurze Aussitzphasen", focus: "4 bis 6 Tritte aussitzen, dann leichttraben", exercises: ["rc-02", "rc-01"] },
        { title: "Rhythmus und Beweglichkeit", focus: "Weich wechseln zwischen Leichttraben und Aussitzen", exercises: ["rc-03", "rc-05"] },
        { title: "Fortschritt überprüfen", focus: "Wie viele Tritte gelingen entspannt?", exercises: ["rc-02", "rc-03"] },
      ],
    },
  },

  /* ===================================================== 2 */
  {
    id: "cp-02",
    slug: "ferse-tief",
    title: "Meine Ferse bleibt nicht tief.",
    category: "sitz",
    review: "entwurf",
    intro: "Eine tiefe Ferse ist das Ergebnis eines langen, lockeren Beins – nicht von Drücken.",
    questions: [
      {
        id: "was",
        text: "Was beobachtest du an deinem Fuß?",
        options: [
          { id: "hoch", label: "Die Ferse rutscht immer wieder hoch.", summary: "deine Ferse rutscht immer wieder hoch", weights: { klemmen: 2, buegel: 1, beweglich: 1 } },
          { id: "druecken", label: "Ich drücke sie runter, dann wird das Bein steif.", summary: "du drückst die Ferse mit Kraft nach unten", weights: { druck: 3 } },
          { id: "zehen", label: "Ich stehe auf den Zehenspitzen im Bügel.", summary: "du stehst auf den Zehenspitzen im Bügel", weights: { buegel: 3 } },
          { id: "vor", label: "Das Bein rutscht nach vorn.", summary: "dein Bein rutscht nach vorn", weights: { balance: 2, buegel: 1 } },
          { id: "unsicher", label: "Ich bin mir nicht sicher.", weights: { beweglich: 1 } },
        ],
      },
      {
        id: "wann",
        text: "Wann passiert es am meisten?",
        options: [
          { id: "immer", label: "Eigentlich immer.", weights: { beweglich: 2, buegel: 1 } },
          { id: "trab", label: "Im Leichttraben.", summary: "es passiert vor allem beim Leichttraben", weights: { klemmen: 2, balance: 1 } },
          { id: "galopp", label: "Im Galopp oder beim Springen.", summary: "es passiert vor allem im Galopp", weights: { balance: 2, klemmen: 1 } },
          { id: "muede", label: "Wenn ich müde werde.", summary: "es passiert, wenn du müde wirst", weights: { druck: 1, beweglich: 1 } },
        ],
      },
      {
        id: "knie",
        text: "Was macht dabei dein Knie?",
        showIf: { q: "was", anyOf: ["hoch", "vor", "unsicher"] },
        options: [
          { id: "klemmt", label: "Es klemmt oder rutscht hoch.", summary: "dein Knie klemmt", weights: { klemmen: 3 } },
          { id: "locker", label: "Es bleibt locker.", weights: { beweglich: 1, buegel: 1 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: {} },
        ],
      },
      {
        id: "schmerz",
        safety: true,
        text: "Tut dir dabei etwas weh, zum Beispiel Knie, Sprunggelenk oder Hüfte?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "abklaeren", summary: "dir tut dabei etwas weh" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "druck",
        title: "Die Ferse wird mit Kraft heruntergedrückt",
        text: "„Fersen tief“ führt oft dazu, dass man die Ferse aktiv nach unten drückt. Dabei wird das ganze Bein fest, das Knie geht hoch und der Fuß schiebt nach vorn. Die Ferse sollte federnd sinken – durch Gewicht, nicht durch Kraft.",
        exercises: ["rc-07", "rc-06"],
      },
      {
        id: "klemmen",
        title: "Knie oder Oberschenkel klemmen",
        text: "Wer mit Knie oder Oberschenkel festhält, kann das Gewicht nicht bis in den Bügel fallen lassen. Die Ferse rutscht dann fast automatisch hoch.",
        exercises: ["rc-07", "rc-12", "rc-09"],
      },
      {
        id: "beweglich",
        title: "Wenig Beweglichkeit im Sprunggelenk oder in der Hüfte",
        text: "Ist die Wade kurz oder das Sprunggelenk wenig beweglich, kann die Ferse nicht nach unten federn. Das lässt sich zu Hause gut verbessern.",
        exercises: ["rc-06", "rc-12"],
        base: 1,
      },
      {
        id: "buegel",
        title: "Bügellänge oder Fußposition passen nicht",
        text: "Sind die Bügel zu lang, sucht der Fuß den Bügel mit der Spitze. Steht der Fuß zu weit vorn oder hinten im Bügel, kann die Ferse nicht federn.",
        exercises: ["rc-08", "rc-09"],
        base: 1,
      },
      {
        id: "balance",
        title: "Das Gleichgewicht liegt nicht über dem Bein",
        text: "Rutscht das Bein nach vorn, sitzt man oft etwas hinter der Bewegung. Dann sucht der Körper Halt – und das Bein wandert nach vorn.",
        exercises: ["rc-09", "rc-11"],
      },
    ],
    mistakes: ["Die Ferse mit Kraft runterdrücken.", "Die Fußspitze stark nach außen drehen.", "Bügel zu lang einstellen.", "Beim Hinsehen nach unten den Oberkörper kippen."],
    nextLesson: [
      "Lass die Bügellänge von deiner Lehrkraft prüfen.",
      "Denk nicht „Ferse runter“, sondern „Bein lang und schwer“.",
      "Ein paar Schritte im Halten mit dem Bein aus der Hüfte fallen lassen.",
    ],
    safety: ["Übungen ohne Bügel nur auf einem ruhigen Pferd und mit Anleitung."],
    checkWhen: ["Bei Schmerzen in Knie, Sprunggelenk oder Hüfte: ärztlich oder physiotherapeutisch abklären lassen."],
    lessons: ["ra-w2-l2", "ra-w2-l1"],
    riderLab: ["rl-03", "rl-01", "rl-04"],
    plan: {
      goal: "Ein langes Bein mit federnder Ferse",
      weeks: [
        { title: "Beweglich werden", focus: "Wade und Hüfte zu Hause dehnen, Bügel prüfen", exercises: ["rc-06", "rc-12", "rc-08"] },
        { title: "Bein aus der Hüfte", focus: "Bein fallen lassen statt Ferse drücken", exercises: ["rc-07", "rc-06"] },
        { title: "Gewicht in den Bügel", focus: "Kurz im Bügel stehen, Ferse federt", exercises: ["rc-09", "rc-07"] },
        { title: "Fortschritt überprüfen", focus: "Bleibt das Bein im Leichttraben lang?", exercises: ["rc-09", "rc-11"] },
      ],
    },
  },

  /* ===================================================== 3 */
  {
    id: "cp-03",
    slug: "trense",
    title: "Mein Pferd nimmt die Trense nicht an.",
    category: "umgang",
    review: "entwurf",
    intro: "Ein Pferd, das sich beim Trensen wehrt, will oft etwas mitteilen. Zuerst geht es darum, mögliche Ursachen auszuschließen – nie um Durchsetzen.",
    questions: [
      {
        id: "was",
        text: "Was macht dein Pferd beim Trensen?",
        options: [
          { id: "kopfhoch", label: "Es reißt den Kopf hoch.", summary: "dein Pferd reißt beim Trensen den Kopf hoch", weights: { erfahrung: 2, schmerz: 1, technik: 1 } },
          { id: "maulzu", label: "Es macht das Maul nicht auf.", summary: "dein Pferd öffnet das Maul nicht für das Gebiss", weights: { gebiss: 2, schmerz: 1, technik: 1 } },
          { id: "weg", label: "Es dreht sich weg oder geht rückwärts.", summary: "dein Pferd weicht beim Trensen aus", weights: { erfahrung: 2, schmerz: 1 } },
          { id: "ohren", label: "Es mag nicht an den Ohren angefasst werden.", summary: "dein Pferd mag nicht an den Ohren angefasst werden", weights: { ohren: 3 } },
          { id: "unsicher", label: "Ich bin mir nicht sicher.", weights: { erfahrung: 1 } },
        ],
      },
      {
        id: "wann",
        text: "Wann fängt es an?",
        options: [
          { id: "anblick", label: "Schon beim Anblick der Trense.", summary: "es beginnt schon beim Anblick der Trense", weights: { erfahrung: 3 } },
          { id: "gebiss", label: "Erst, wenn das Gebiss ins Maul soll.", summary: "es beginnt erst beim Gebiss", weights: { gebiss: 2, schmerz: 2 } },
          { id: "ohren", label: "Wenn die Trense über die Ohren geht.", summary: "es beginnt, wenn die Trense über die Ohren geht", weights: { ohren: 3 } },
          { id: "unterschiedlich", label: "Unterschiedlich.", weights: { technik: 1 } },
        ],
      },
      {
        id: "seit",
        text: "Seit wann ist das so?",
        options: [
          { id: "neu", label: "Erst seit Kurzem – vorher ging es.", summary: "das Verhalten ist neu", weights: { schmerz: 3 }, flag: "abklaeren" },
          { id: "immer", label: "Schon lange oder schon immer.", weights: { erfahrung: 2, technik: 1 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: { schmerz: 1 } },
        ],
      },
      {
        id: "zeichen",
        safety: true,
        text: "Bemerkst du eines dieser Zeichen: Futter fällt aus dem Maul, Kopfschlagen beim Reiten, Schwellungen oder Wunden im Maul, starkes Speicheln?",
        options: [
          { id: "nein", label: "Nein, nichts davon." },
          { id: "ja", label: "Ja, mindestens eines.", flag: "abklaeren", summary: "dir sind Warnzeichen am Maul aufgefallen", weights: { schmerz: 3 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: { schmerz: 1 } },
        ],
      },
      {
        id: "gefahr",
        safety: true,
        text: "Steigt, schlägt oder beißt dein Pferd dabei?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "stopp", summary: "dein Pferd steigt, schlägt oder beißt dabei" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "schmerz",
        title: "Mögliche Schmerzen in Maul, Zähnen oder Genick",
        text: "Zahnhaken, Verletzungen im Maul, Probleme im Genick oder an den Ohren können Trensen unangenehm machen. Ob das so ist, kann nur ein Tierarzt oder Pferdezahnarzt feststellen. Besonders wenn das Verhalten neu ist, sollte das zuerst abgeklärt werden.",
        exercises: ["rc-29"],
        check: true,
        base: 1,
      },
      {
        id: "gebiss",
        title: "Gebiss oder Trense passen nicht",
        text: "Ein zu schmales, zu breites, zu hoch verschnalltes oder im Winter eiskaltes Gebiss ist unangenehm. Auch ein kneifender Stirnriemen kann eine Rolle spielen.",
        exercises: ["rc-29"],
        check: true,
      },
      {
        id: "erfahrung",
        title: "Schlechte Erfahrungen oder Unsicherheit",
        text: "Hat ein Pferd gelernt, dass Trensen unangenehm ist (zum Beispiel an die Zähne geschlagenes Gebiss oder geknickte Ohren), erwartet es das wieder. Ruhige, vorhersehbare Wiederholungen helfen – aber erst, wenn Schmerzen ausgeschlossen sind.",
        exercises: ["rc-30", "rc-31"],
      },
      {
        id: "ohren",
        title: "Empfindliche Ohren",
        text: "Manche Pferde sind an den Ohren empfindlich. Die Trense lässt sich dann oft so verschnallen, dass die Ohren einzeln und vorsichtig durchgeführt werden. Ist die Empfindlichkeit neu, kann eine Verletzung oder Entzündung dahinterstecken.",
        exercises: ["rc-29", "rc-31"],
        check: true,
      },
      {
        id: "technik",
        title: "Der Ablauf beim Trensen",
        text: "Wer unsicher trenst, ist oft hektisch oder stößt mit dem Gebiss an die Zähne. Ein ruhiger, immer gleicher Ablauf gibt dem Pferd Sicherheit.",
        exercises: ["rc-30", "rc-29"],
      },
    ],
    mistakes: [
      "Den Kopf mit Kraft festhalten oder herunterziehen.",
      "Das Gebiss gegen die Zähne drücken.",
      "Das Verhalten als Ungehorsam bestrafen.",
      "Mögliche Schmerzen übersehen, weil es „schon immer“ so war.",
    ],
    nextLesson: [
      "Bitte deine Reitlehrkraft, beim Trensen zuzuschauen.",
      "Achte genau darauf, wann dein Pferd ausweicht – das ist ein wichtiger Hinweis.",
      "Wärme das Gebiss im Winter in der Hand an.",
    ],
    safety: ["Nie das Maul mit Gewalt öffnen und nie den Kopf festhalten – Pferde sind sehr viel stärker als wir.", "Kinder trensen nur mit einer erfahrenen erwachsenen Person."],
    checkWhen: [
      "Wenn das Verhalten neu ist oder plötzlich schlimmer wird: Tierarzt oder Pferdezahnarzt.",
      "Bei Futterverlust, Kopfschlagen, Schwellungen oder Wunden: Tierarzt.",
      "Bei Zweifeln an Trense oder Gebiss: Sattler oder Fachperson für Zäumung.",
    ],
    lessons: ["ra-w10-l4", "ra-w1-l3", "ra-w9-l1", "ra-w8-l4"],
    riderLab: [],
    plan: {
      goal: "Entspannt trensen",
      weeks: [
        { title: "Abklären und prüfen", focus: "Zähne, Maul und Trense prüfen lassen", exercises: ["rc-29"] },
        { title: "Vertrauen aufbauen", focus: "Kopf senken, kurze ruhige Momente", exercises: ["rc-31"] },
        { title: "Trens-Routine in kleinen Schritten", focus: "Jeden Schritt einzeln, mit guten Pausen", exercises: ["rc-30", "rc-31"] },
        { title: "Fortschritt überprüfen", focus: "Wie ruhig ist das Trensen jetzt?", exercises: ["rc-30"] },
      ],
    },
  },

  /* ===================================================== 4 (Demo) */
  {
    id: "cp-04",
    slug: "steigbuegel",
    title: "Ich verliere ständig meine Steigbügel.",
    category: "sitz",
    review: "entwurf",
    intro: "Verlorene Bügel sind kein Zeichen für schlechtes Reiten – meistens steckt eine von wenigen typischen Ursachen dahinter.",
    questions: [
      {
        id: "wann",
        text: "Wann verlierst du die Bügel?",
        options: [
          { id: "leichttraben", label: "Beim Leichttraben.", summary: "du verlierst die Bügel beim Leichttraben", weights: { klemmen: 2, balance: 1 } },
          { id: "aussitzen", label: "Beim Aussitzen.", summary: "du verlierst die Bügel beim Aussitzen", weights: { klemmen: 2, laenge: 1 } },
          { id: "galopp", label: "Im Galopp.", summary: "du verlierst die Bügel im Galopp", weights: { balance: 2, klemmen: 1 } },
          { id: "erschrecken", label: "Wenn das Pferd erschrickt oder sich schnell bewegt.", summary: "du verlierst die Bügel bei plötzlichen Bewegungen", weights: { balance: 3 } },
          { id: "immer", label: "Eigentlich ständig.", summary: "du verlierst die Bügel ständig", weights: { laenge: 2, fuss: 2 } },
        ],
      },
      {
        id: "fuss",
        text: "Wo liegt der Bügel meistens unter deinem Fuß?",
        options: [
          { id: "spitze", label: "Unter der Fußspitze.", summary: "der Bügel liegt unter deiner Fußspitze", weights: { fuss: 3, laenge: 1 } },
          { id: "ballen", label: "Unter dem Fußballen.", weights: { klemmen: 1, balance: 1 } },
          { id: "tief", label: "Ziemlich tief, fast in der Fußmitte.", weights: { fuss: 1 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: { fuss: 1 } },
        ],
      },
      {
        id: "knie",
        text: "Was machen deine Knie, kurz bevor der Bügel weg ist?",
        showIf: { q: "wann", anyOf: ["leichttraben", "aussitzen", "galopp", "immer"] },
        options: [
          { id: "hoch", label: "Sie rutschen hoch oder klemmen.", summary: "deine Knie rutschen hoch", weights: { klemmen: 3 } },
          { id: "locker", label: "Sie bleiben eher locker.", weights: { laenge: 1, fuss: 1 } },
          { id: "weissnicht", label: "Darauf habe ich noch nicht geachtet.", weights: {} },
        ],
      },
      {
        id: "laenge",
        text: "Musst du den Bügel mit der Fußspitze suchen, wenn du die Beine hängen lässt?",
        showIf: { q: "fuss", anyOf: ["spitze", "weissnicht"] },
        options: [
          { id: "ja", label: "Ja, er hängt eher tief.", summary: "deine Bügel sind möglicherweise zu lang", weights: { laenge: 3 } },
          { id: "nein", label: "Nein, er hängt etwa am Knöchel.", weights: { fuss: 1 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: { laenge: 1 } },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "laenge",
        title: "Die Bügel sind zu lang",
        text: "Sind die Bügel zu lang, reicht der Fuß nur mit der Spitze hinein. Bei jeder Bewegung rutscht er heraus. Eine passende Länge ist der schnellste Hebel.",
        exercises: ["rc-08", "rc-10"],
        base: 1,
      },
      {
        id: "klemmen",
        title: "Knie und Oberschenkel klemmen",
        text: "Wer mit den Knien festhält, zieht das Bein nach oben. Dann fehlt das Gewicht im Bügel und der Fuß verliert den Kontakt.",
        exercises: ["rc-07", "rc-09", "rc-12"],
      },
      {
        id: "fuss",
        title: "Der Fuß liegt nicht auf dem Ballen",
        text: "Liegt der Bügel unter der Fußspitze, genügt eine kleine Bewegung und er ist weg. Unter dem Ballen kann der Fuß den Bügel tragen und federn.",
        exercises: ["rc-08", "rc-10", "rc-06"],
      },
      {
        id: "balance",
        title: "Die Balance fehlt in schnellen Momenten",
        text: "Bei plötzlichen Bewegungen oder im Galopp hält sich der Körper reflexartig fest – oft mit den Beinen. Mehr Balance über dem Bügel hilft, ruhig zu bleiben.",
        exercises: ["rc-09", "rc-11", "rc-10"],
      },
    ],
    mistakes: ["Nach unten schauen, um den Bügel zu suchen.", "Die Bügel immer länger stellen, damit das Bein lang „aussieht“.", "Die Ferse mit Kraft runterdrücken."],
    nextLesson: [
      "Lass die Bügellänge vor dem Aufsteigen prüfen.",
      "Übe im Halten, den Bügel blind wiederzufinden.",
      "Denk beim Leichttraben an „Gewicht in den Bügel“ statt „Knie fest“.",
    ],
    safety: ["Schuhe mit kleinem Absatz tragen, damit der Fuß nicht durch den Bügel rutscht.", "Bügel nur im Halten verstellen."],
    checkWhen: ["Wenn du dich ohne Bügel unsicher fühlst: Lass dich an die Longe nehmen."],
    lessons: ["ra-w2-l2", "ra-w5-l2", "ra-w2-l1"],
    riderLab: ["rl-03", "rl-04", "rl-17"],
    plan: {
      goal: "Bügel sicher behalten",
      weeks: [
        { title: "Länge und Fuß prüfen", focus: "Bügel richtig einstellen, Fuß am Ballen", exercises: ["rc-08", "rc-06"] },
        { title: "Bein aus der Hüfte", focus: "Lockeres, langes Bein", exercises: ["rc-07", "rc-10"] },
        { title: "Gewicht in den Bügel", focus: "Kurz stehen, Ferse federt", exercises: ["rc-09", "rc-10"] },
        { title: "Fortschritt überprüfen", focus: "Wie oft geht der Bügel noch verloren?", exercises: ["rc-09", "rc-11"] },
      ],
    },
  },

  /* ===================================================== 5 */
  {
    id: "cp-05",
    slug: "angaloppieren",
    title: "Mein Pferd galoppiert nicht an.",
    category: "gangarten",
    review: "entwurf",
    intro: "Angaloppieren ist Timing, Vorbereitung und eine klare Hilfe. Manchmal steckt aber auch ein körperlicher Grund dahinter.",
    questions: [
      {
        id: "was",
        text: "Was passiert stattdessen?",
        options: [
          { id: "schneller", label: "Es trabt immer schneller.", summary: "dein Pferd trabt schneller statt anzugaloppieren", weights: { vorbereitung: 3, hilfe: 1 } },
          { id: "kaum", label: "Es reagiert kaum.", summary: "dein Pferd reagiert kaum auf die Galopphilfe", weights: { aufmerksamkeit: 3, hilfe: 1 } },
          { id: "falsch", label: "Es springt falsch an.", summary: "dein Pferd springt im falschen Galopp an", weights: { stellung: 3, hilfe: 1 } },
          { id: "kurz", label: "Es galoppiert nur wenige Sprünge.", summary: "dein Pferd galoppiert nur wenige Sprünge", weights: { balance: 2, aufmerksamkeit: 1 } },
          { id: "unsicher", label: "Ich bin mir nicht sicher.", weights: { hilfe: 1, vorbereitung: 1 } },
        ],
      },
      {
        id: "wann",
        text: "Wann tritt das Problem auf?",
        options: [
          { id: "immer", label: "Immer.", weights: { hilfe: 2 } },
          { id: "einehand", label: "Nur auf einer Hand.", summary: "es klappt nur auf einer Hand nicht", weights: { stellung: 2, koerper: 2 } },
          { id: "pferde", label: "Nur bei bestimmten Pferden.", summary: "es klappt nur bei bestimmten Pferden nicht", weights: { hilfe: 2, aufmerksamkeit: 1 } },
          { id: "spaeter", label: "Erst nach längerer Zeit.", summary: "es klappt erst nach längerer Zeit nicht mehr", weights: { koerper: 2, balance: 1 } },
          { id: "unterschiedlich", label: "Unterschiedlich.", weights: { vorbereitung: 1 } },
        ],
      },
      {
        id: "hilfe",
        text: "Wie gibst du die Galopphilfe?",
        showIf: { q: "was", anyOf: ["schneller", "kaum", "unsicher"] },
        options: [
          { id: "treiben", label: "Ich treibe immer stärker, bis es klappt.", summary: "du treibst immer stärker", weights: { vorbereitung: 2, hilfe: 2 } },
          { id: "lehnen", label: "Ich lehne mich nach vorn.", summary: "du lehnst dich beim Angaloppieren vor", weights: { hilfe: 3 } },
          { id: "korrekt", label: "Halbe Parade, innen stellen, dann innerer Schenkel am Gurt, äußerer hinten.", weights: { aufmerksamkeit: 1, koerper: 1 } },
          { id: "weissnicht", label: "Da bin ich mir nicht sicher.", summary: "du bist dir bei der Galopphilfe unsicher", weights: { hilfe: 3 } },
        ],
      },
      {
        id: "pferd",
        safety: true,
        text: "Zeigt dein Pferd beim Angaloppieren Abwehr – zum Beispiel Ohren anlegen, Schweifschlagen, Buckeln, Rücken wegdrücken – oder läuft es unregelmäßig?",
        help: "Diese Zeichen können auf Schmerzen hinweisen (Rücken, Sattel, Beine).",
        options: [
          { id: "nein", label: "Nein, nichts davon." },
          { id: "manchmal", label: "Manchmal.", flag: "abklaeren", summary: "dein Pferd zeigt manchmal Abwehr", weights: { koerper: 3 } },
          { id: "oft", label: "Ja, deutlich oder neu.", flag: "abklaeren", summary: "dein Pferd zeigt deutliche Abwehr", weights: { koerper: 4 } },
        ],
      },
      {
        id: "gefahr",
        safety: true,
        text: "Steigt oder buckelt dein Pferd so stark, dass du Angst hast?",
        showIf: { q: "pferd", anyOf: ["manchmal", "oft"] },
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "stopp", summary: "dein Pferd steigt oder buckelt stark" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "vorbereitung",
        title: "Die Vorbereitung fehlt",
        text: "Ohne halbe Parade und ohne ruhigen, gesetzten Trab ist das Pferd nicht bereit. Treibt man dann stärker, wird oft nur der Trab schneller – das Pferd fällt auf die Vorhand und kann schwer angaloppieren.",
        exercises: ["rc-18", "rc-20", "rc-24"],
        base: 1,
      },
      {
        id: "hilfe",
        title: "Die Galopphilfe ist nicht eindeutig",
        text: "Vorlehnen, unklare Schenkellage oder ein Dauertreiben machen es dem Pferd schwer zu verstehen, was gemeint ist. Eine klare, kurze Hilfe zum richtigen Zeitpunkt wirkt besser als viel Kraft.",
        exercises: ["rc-19", "rc-21", "rc-20"],
        base: 1,
      },
      {
        id: "aufmerksamkeit",
        title: "Das Pferd reagiert wenig auf die Hilfen",
        text: "Wenn ein Pferd auf treibende Hilfen kaum reagiert, hilft oft nicht mehr Kraft, sondern das Üben von Übergängen: kurze, feine Hilfe – Reaktion – Lob.",
        exercises: ["rc-18", "rc-21"],
      },
      {
        id: "stellung",
        title: "Stellung und Gewicht passen nicht zur Hand",
        text: "Springt ein Pferd falsch an, fehlt oft die Stellung nach innen oder das Gewicht liegt außen. Auch eine ungünstige Linie (lange Gerade statt Ecke oder Zirkel) erschwert den richtigen Galopp.",
        exercises: ["rc-20", "rc-19"],
      },
      {
        id: "balance",
        title: "Balance und Kraft des Pferdes",
        text: "Galoppiert ein Pferd nur wenige Sprünge, fehlt ihm vielleicht noch Kraft oder Balance – oder dem Reiter das Mitgehen. Kurze Galoppstrecken mit Pausen sind dann sinnvoll.",
        exercises: ["rc-21", "rc-18"],
      },
      {
        id: "koerper",
        title: "Mögliche körperliche Ursachen beim Pferd",
        text: "Abwehrverhalten, Probleme nur auf einer Hand oder erst nach längerer Zeit können auf Schmerzen, einen unpassenden Sattel oder Beschwerden an Rücken oder Beinen hinweisen. Das kann nur eine Fachperson beurteilen.",
        exercises: ["rc-18"],
        check: true,
      },
    ],
    mistakes: [
      "Den Trab immer schneller treiben.",
      "Sich nach vorn lehnen und am Zügel ziehen.",
      "Zu oft hintereinander angaloppieren, bis Pferd und Reiter müde sind.",
      "Abwehrverhalten als Ungehorsam abtun.",
    ],
    nextLesson: [
      "Frag nach einigen Übergängen Schritt–Trab, bevor ihr Galopp übt.",
      "Galopp auf dem Zirkel an der offenen Seite vorbereiten, nicht auf der langen Geraden.",
      "Wenn es nicht klappt: ruhig durchparieren und neu vorbereiten statt stärker treiben.",
    ],
    safety: ["Galopp nur in einem eingezäunten Reitplatz oder einer Halle üben.", "Abwehr ist ein Signal – nicht übergehen."],
    checkWhen: [
      "Bei Ohren anlegen, Schweifschlagen, Buckeln oder Rücken wegdrücken: Sattel prüfen lassen (Sattler) und Tierarzt.",
      "Wenn das Pferd unregelmäßig läuft oder es nur auf einer Hand nicht klappt: Tierarzt.",
    ],
    lessons: ["ra-w6-l3", "ra-w6-l2", "ra-w6-l4", "ra-w3-l5"],
    riderLab: ["rl-09", "rl-11"],
    plan: {
      goal: "Sicher angaloppieren",
      weeks: [
        { title: "Aufmerksamkeit durch Übergänge", focus: "Feine Hilfen, schnelle Reaktion, viel Lob", exercises: ["rc-18", "rc-19"] },
        { title: "Galopphilfe klar machen", focus: "Trocken üben, an der Longe den Moment finden", exercises: ["rc-19", "rc-21"] },
        { title: "Angaloppieren auf dem Zirkel", focus: "Vorbereiten, halbe Parade, klare Hilfe", exercises: ["rc-20", "rc-18"] },
        { title: "Fortschritt überprüfen", focus: "Wie oft klappt es beim ersten Versuch?", exercises: ["rc-20"] },
      ],
    },
  },

  /* ===================================================== 6 */
  {
    id: "cp-06",
    slug: "trab-schneller",
    title: "Mein Pferd wird im Trab immer schneller.",
    category: "gangarten",
    review: "entwurf",
    intro: "Eilige Pferde sind oft aus dem Gleichgewicht oder angespannt. Mit Ziehen wird es meist schlimmer.",
    questions: [
      {
        id: "was",
        text: "Wie zeigt sich das?",
        options: [
          { id: "eilt", label: "Es wird nach und nach immer schneller.", summary: "dein Pferd wird nach und nach schneller", weights: { balance: 2, rhythmus: 2 } },
          { id: "zieht", label: "Es zieht am Zügel und rennt.", summary: "dein Pferd zieht am Zügel", weights: { zug: 3, anspannung: 1 } },
          { id: "gerade", label: "Vor allem auf langen Geraden.", summary: "es passiert vor allem auf Geraden", weights: { balance: 3 } },
          { id: "angst", label: "Es wirkt angespannt oder schreckhaft.", summary: "dein Pferd wirkt angespannt", weights: { anspannung: 3 } },
        ],
      },
      {
        id: "reiter",
        text: "Was machst du, wenn es schneller wird?",
        options: [
          { id: "ziehen", label: "Ich ziehe am Zügel.", summary: "du ziehst am Zügel", weights: { zug: 3 } },
          { id: "klemmen", label: "Ich werde fest und klemme.", summary: "du wirst fest", weights: { rhythmus: 2, anspannung: 1 } },
          { id: "schnell", label: "Ich trabe schneller mit.", summary: "dein Leichttraben wird schneller", weights: { rhythmus: 3 } },
          { id: "parade", label: "Ich versuche halbe Paraden.", weights: { balance: 1 } },
        ],
      },
      {
        id: "beginn",
        text: "Seit wann ist das so?",
        showIf: { q: "was", anyOf: ["angst", "zieht"] },
        options: [
          { id: "immer", label: "Schon lange.", weights: { balance: 1 } },
          { id: "neu", label: "Erst seit Kurzem.", summary: "das Verhalten ist neu", flag: "abklaeren", weights: { koerper: 3 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: {} },
        ],
      },
      {
        id: "gefahr",
        safety: true,
        text: "Kannst du dein Pferd jederzeit sicher anhalten?",
        options: [
          { id: "ja", label: "Ja." },
          { id: "meist", label: "Meistens, aber es braucht lange." },
          { id: "nein", label: "Nein – es geht mir manchmal durch.", flag: "stopp", summary: "du kannst dein Pferd nicht immer sicher anhalten" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "balance",
        title: "Das Pferd sucht sein Gleichgewicht",
        text: "Viele Pferde laufen schneller, wenn sie auf die Vorhand fallen – sie „laufen ihren Beinen hinterher“. Gebogene Linien und Übergänge helfen ihnen, sich besser zu tragen.",
        exercises: ["rc-23", "rc-18"],
        base: 1,
      },
      {
        id: "rhythmus",
        title: "Der Reiter gibt den Takt nicht vor",
        text: "Wird das Leichttraben schneller oder höher, treibt das unbewusst mit. Ein ruhiger, kleiner Leichttrab im eigenen Takt kann das Pferd mitnehmen.",
        exercises: ["rc-22", "rc-05"],
        base: 1,
      },
      {
        id: "zug",
        title: "Dauerhafter Zug am Zügel",
        text: "Viele Pferde gehen gegen dauernden Druck an – sie ziehen zurück und werden schneller. Kurze halbe Paraden mit Nachgeben wirken meist besser.",
        exercises: ["rc-24", "rc-15"],
      },
      {
        id: "anspannung",
        title: "Anspannung oder Unsicherheit",
        text: "Ein angespanntes Pferd wird schneller, weil es „weg“ will. Ruhe beim Reiter, bekannte Abläufe und Pausen am langen Zügel helfen. Auch eine neue Umgebung kann Pferde nervös machen.",
        exercises: ["rc-05", "rc-18"],
      },
      {
        id: "koerper",
        title: "Mögliche körperliche Ursachen",
        text: "Ändert sich das Verhalten plötzlich, können Schmerzen, ein drückender Sattel oder Veränderungen in Fütterung und Haltung dahinterstecken. Das sollte eine Fachperson ansehen.",
        exercises: ["rc-18"],
        check: true,
      },
    ],
    mistakes: ["Dauerhaft am Zügel ziehen.", "Schneller und höher leichttraben.", "Lange gerade Strecken im Trab ohne Übergänge."],
    nextLesson: [
      "Bitte um eine Stunde mit vielen Übergängen und gebogenen Linien.",
      "Zähle beim Leichttraben leise mit und bleib bei deinem Takt.",
      "Plane Pausen am langen Zügel ein.",
    ],
    safety: [
      "Übe nur auf einem eingezäunten Platz oder in der Halle.",
      "Wenn du dein Pferd nicht sicher anhalten kannst, reite nicht allein – hol dir sofort Unterstützung von einer Reitlehrkraft.",
    ],
    checkWhen: ["Bei plötzlicher Verhaltensänderung: Tierarzt und Sattler.", "Wenn das Pferd dir durchgeht: nur noch mit Reitlehrkraft reiten, bis die Ursache geklärt ist."],
    lessons: ["ra-w12-l1", "ra-w5-l2", "ra-w6-l4", "ra-w3-l3"],
    riderLab: ["rl-06", "rl-05"],
    plan: {
      goal: "Ruhiges Tempo im Trab",
      weeks: [
        { title: "Eigener Takt", focus: "Ruhig leichttraben, ausatmen", exercises: ["rc-22", "rc-05"] },
        { title: "Viele Übergänge", focus: "Aufmerksamkeit statt Zug", exercises: ["rc-18", "rc-24"] },
        { title: "Gebogene Linien", focus: "Zirkel, Schlangenlinien, Volten", exercises: ["rc-23", "rc-22"] },
        { title: "Fortschritt überprüfen", focus: "Bleibt das Tempo eine Runde gleich?", exercises: ["rc-23", "rc-24"] },
      ],
    },
  },

  /* ===================================================== 7 */
  {
    id: "cp-07",
    slug: "knie-klemmen",
    title: "Ich klemme mit den Knien.",
    category: "sitz",
    review: "entwurf",
    intro: "Klemmen ist ein Schutzreflex. Er lässt nach, wenn Balance und Vertrauen wachsen.",
    questions: [
      {
        id: "wann",
        text: "Wann klemmst du am meisten?",
        options: [
          { id: "trab", label: "Beim Leichttraben.", summary: "du klemmst beim Leichttraben", weights: { balance: 2, technik: 2 } },
          { id: "galopp", label: "Im Galopp.", summary: "du klemmst im Galopp", weights: { balance: 2, angst: 1 } },
          { id: "unsicher", label: "Wenn ich mich unsicher fühle.", summary: "du klemmst, wenn du dich unsicher fühlst", weights: { angst: 3 } },
          { id: "immer", label: "Eigentlich immer.", summary: "du klemmst fast immer", weights: { beweglich: 2, balance: 1 } },
        ],
      },
      {
        id: "folge",
        text: "Was passiert dann?",
        options: [
          { id: "kniehoch", label: "Die Knie rutschen hoch, das Bein wird kurz.", summary: "dein Bein wird kurz", weights: { beweglich: 2, balance: 1 } },
          { id: "pferd", label: "Mein Pferd wird schneller.", summary: "dein Pferd wird schneller", weights: { technik: 2 } },
          { id: "buegel", label: "Ich verliere die Bügel.", summary: "du verlierst die Bügel", weights: { balance: 2 } },
          { id: "muede", label: "Meine Oberschenkel werden schnell müde.", summary: "deine Oberschenkel werden schnell müde", weights: { technik: 1, beweglich: 1 } },
        ],
      },
      {
        id: "angst",
        text: "Fühlst du dich auf deinem Pferd sicher?",
        showIf: { q: "wann", anyOf: ["galopp", "unsicher"] },
        options: [
          { id: "ja", label: "Ja, meistens.", weights: { balance: 1 } },
          { id: "teils", label: "Nicht immer.", summary: "du fühlst dich nicht immer sicher", weights: { angst: 2 } },
          { id: "nein", label: "Eher nicht.", summary: "du fühlst dich auf dem Pferd eher unsicher", weights: { angst: 3 } },
        ],
      },
      {
        id: "schmerz",
        safety: true,
        text: "Hast du Schmerzen in Hüfte, Knie oder Rücken?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "abklaeren", summary: "du hast Schmerzen" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "balance",
        title: "Der Körper sucht Halt",
        text: "Wenn die Balance nicht reicht, hält sich der Körper dort fest, wo er kann – an den Knien. Je sicherer du in der Mitte sitzt, desto weniger musst du klemmen.",
        exercises: ["rc-09", "rc-13", "rc-07"],
        base: 1,
      },
      {
        id: "beweglich",
        title: "Feste Hüfte",
        text: "Eine wenig bewegliche Hüfte zieht das Knie nach oben und innen. Übungen zu Hause machen das Bein länger und lockerer.",
        exercises: ["rc-12", "rc-07"],
        base: 1,
      },
      {
        id: "angst",
        title: "Unsicherheit oder Angst",
        text: "Wer sich unsicher fühlt, klemmt reflexartig. Das ist normal. Ein ruhiges, sicheres Pferd, kleine Schritte und eine vertraute Lehrkraft helfen mehr als „Locker lassen!“.",
        exercises: ["rc-05", "rc-07"],
      },
      {
        id: "technik",
        title: "Leichttraben aus dem Knie",
        text: "Wer sich beim Leichttraben mit den Knien hochdrückt, klemmt bei jedem Tritt. Aufstehen sollte aus dem Gewicht im Bügel und einer kleinen Hüftbewegung kommen.",
        exercises: ["rc-22", "rc-09"],
      },
    ],
    mistakes: ["„Locker lassen“ mit Gewalt wollen.", "Ohne Bügel reiten, bevor das Bein im Schritt locker ist.", "Klemmen beim Leichttraben als Hilfe zum Aufstehen nutzen."],
    nextLesson: [
      "Ein paar Schritte im Halten das Bein aus der Hüfte fallen lassen.",
      "Leichttraben mit wenig Aufstehen und ruhigem Takt.",
      "Sprich mit deiner Lehrkraft offen darüber, wenn du dich unsicher fühlst.",
    ],
    safety: ["Übungen ohne Bügel nur auf einem ruhigen Pferd und mit Anleitung."],
    checkWhen: ["Bei Schmerzen: ärztlich oder physiotherapeutisch abklären lassen.", "Bei großer Angst: offen mit der Reitlehrkraft sprechen, ggf. ein ruhigeres Pferd wählen."],
    lessons: ["ra-w2-l2", "ra-w2-l1", "ra-w12-l3", "ra-w12-l4"],
    riderLab: ["rl-01", "rl-02", "rl-04"],
    plan: {
      goal: "Ein langes Bein ohne Klemmen",
      weeks: [
        { title: "Hüfte öffnen", focus: "Zu Hause dehnen, ruhig atmen", exercises: ["rc-12", "rc-05"] },
        { title: "Bein aus der Hüfte", focus: "Bein fallen lassen im Halten und Schritt", exercises: ["rc-07", "rc-12"] },
        { title: "Gewicht in den Bügel", focus: "Aufstehen aus dem Bügel, nicht aus dem Knie", exercises: ["rc-09", "rc-22"] },
        { title: "Fortschritt überprüfen", focus: "Bleibt das Bein im Trab lang?", exercises: ["rc-13", "rc-22"] },
      ],
    },
  },

  /* ===================================================== 8 */
  {
    id: "cp-08",
    slug: "unruhige-haende",
    title: "Meine Hände sind unruhig.",
    category: "hilfen",
    review: "entwurf",
    intro: "Ruhige Hände kommen aus einem ruhigen Sitz. Darum schauen wir zuerst, woher die Unruhe kommt.",
    questions: [
      {
        id: "was",
        text: "Was machen deine Hände?",
        options: [
          { id: "hoch", label: "Sie wippen beim Leichttraben auf und ab.", summary: "deine Hände wippen beim Leichttraben", weights: { balance: 3 } },
          { id: "ziehen", label: "Ich ziehe oder halte mich am Zügel fest.", summary: "du hältst dich am Zügel fest", weights: { balance: 2, steif: 1 } },
          { id: "steif", label: "Meine Arme sind steif.", summary: "deine Arme sind steif", weights: { steif: 3 } },
          { id: "unterschiedlich", label: "Sie sind unterschiedlich hoch oder weit auseinander.", summary: "deine Hände sind ungleich", weights: { haltung: 3 } },
        ],
      },
      {
        id: "wann",
        text: "Wann ist es am stärksten?",
        options: [
          { id: "trab", label: "Im Trab.", weights: { balance: 2 } },
          { id: "galopp", label: "Im Galopp.", weights: { balance: 2, steif: 1 } },
          { id: "immer", label: "In allen Gangarten.", weights: { haltung: 2, steif: 1 } },
          { id: "wendung", label: "In Wendungen.", summary: "es ist in Wendungen am stärksten", weights: { haltung: 2 } },
        ],
      },
      {
        id: "pferd",
        text: "Wie reagiert dein Pferd?",
        showIf: { q: "was", anyOf: ["ziehen", "steif"] },
        options: [
          { id: "kopf", label: "Es schlägt mit dem Kopf oder sperrt das Maul.", summary: "dein Pferd schlägt mit dem Kopf", weights: { steif: 2 }, flag: "abklaeren" },
          { id: "ruhig", label: "Es bleibt ruhig.", weights: { haltung: 1 } },
          { id: "weissnicht", label: "Darauf habe ich nicht geachtet.", weights: {} },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "balance",
        title: "Die Hände gleichen die Balance aus",
        text: "Wenn der Sitz noch nicht stabil ist, bewegen sich die Hände mit dem Oberkörper mit – oder halten sich fest. Wird der Sitz ruhiger, werden es die Hände auch.",
        exercises: ["rc-16", "rc-14", "rc-09"],
        base: 1,
      },
      {
        id: "steif",
        title: "Steife Arme und Schultern",
        text: "Steife Ellbogen können die Nickbewegung des Pferdekopfes nicht mitgehen. Jeder Tritt kommt dann als Ruck im Maul an. Elastische Ellbogen sind der Schlüssel.",
        exercises: ["rc-15", "rc-14", "rc-05"],
      },
      {
        id: "haltung",
        title: "Zügelhaltung",
        text: "Flache Hände, zu lange oder ungleiche Zügel und zu weit auseinander gehaltene Fäuste machen ruhige Hände schwer.",
        exercises: ["rc-15", "rc-17"],
        base: 1,
      },
    ],
    mistakes: ["Hände mit Kraft stillhalten wollen.", "Am Zügel festhalten, um nicht das Gleichgewicht zu verlieren.", "Die Zügel durchrutschen lassen und ruckartig nachfassen."],
    nextLesson: ["Nimm einen Halsriemen mit und teste den Halsriemen-Trick.", "Achte auf die Linie Ellbogen – Hand – Pferdemaul.", "Bitte um ein Video von dir im Leichttraben."],
    safety: ["Halte dich bei Unsicherheit am Halsriemen fest, nie am Zügel."],
    checkWhen: ["Wenn das Pferd mit dem Kopf schlägt oder das Maul aufsperrt: auch Zähne und Gebiss prüfen lassen."],
    lessons: ["ra-w2-l3", "ra-w3-l4", "ra-w8-l1"],
    riderLab: ["rl-13", "rl-14", "rl-16"],
    plan: {
      goal: "Ruhigere Hände",
      weeks: [
        { title: "Hände unabhängig machen", focus: "Wasserglas-Übung zu Hause", exercises: ["rc-14", "rc-15"] },
        { title: "Balance statt Festhalten", focus: "Halsriemen-Trick im Leichttraben", exercises: ["rc-16", "rc-14"] },
        { title: "Elastische Ellbogen", focus: "Mitgehen in allen Gangarten", exercises: ["rc-15", "rc-16"] },
        { title: "Fortschritt überprüfen", focus: "Video vergleichen", exercises: ["rc-16", "rc-17"] },
      ],
    },
  },

  /* ===================================================== 9 */
  {
    id: "cp-09",
    slug: "zirkel-nach-innen",
    title: "Mein Pferd fällt auf dem Zirkel nach innen.",
    category: "gangarten",
    review: "entwurf",
    intro: "Wenn der Zirkel immer kleiner wird, drängt das Pferd über die innere Schulter. Oft hilft der äußere Zügel mehr als der innere.",
    questions: [
      {
        id: "was",
        text: "Was beobachtest du?",
        options: [
          { id: "kleiner", label: "Der Zirkel wird immer kleiner.", summary: "der Zirkel wird immer kleiner", weights: { aussen: 2, schenkel: 2 } },
          { id: "schulter", label: "Das Pferd drängt mit der Schulter nach innen.", summary: "dein Pferd drängt mit der Schulter nach innen", weights: { aussen: 3, innenzuegel: 1 } },
          { id: "offen", label: "Es klappt nur an der offenen Seite nicht.", summary: "es klappt an der offenen Zirkelseite nicht", weights: { linie: 3 } },
          { id: "kopf", label: "Es schaut nach außen und läuft nach innen.", summary: "dein Pferd schaut nach außen und läuft nach innen", weights: { innenzuegel: 1, aussen: 2 } },
        ],
      },
      {
        id: "hand",
        text: "Auf welcher Hand passiert es?",
        options: [
          { id: "beide", label: "Auf beiden Händen.", weights: { schenkel: 1, sitz: 1 } },
          { id: "eine", label: "Vor allem auf einer Hand.", summary: "es passiert vor allem auf einer Hand", weights: { schiefe: 3, sitz: 1 } },
          { id: "weissnicht", label: "Weiß ich nicht.", weights: {} },
        ],
      },
      {
        id: "reiter",
        text: "Was machst du, wenn das Pferd nach innen kommt?",
        options: [
          { id: "innen", label: "Ich nehme den inneren Zügel an.", summary: "du korrigierst mit dem inneren Zügel", weights: { innenzuegel: 3 } },
          { id: "aussen", label: "Ich ziehe den äußeren Zügel nach außen.", weights: { schenkel: 2 } },
          { id: "lehnen", label: "Ich lehne mich nach außen oder innen.", summary: "du lehnst dich in der Wendung", weights: { sitz: 3 } },
          { id: "schenkel", label: "Ich treibe mit dem inneren Schenkel.", weights: { aussen: 1 } },
        ],
      },
      {
        id: "schmerz",
        safety: true,
        showIf: { q: "hand", anyOf: ["eine"] },
        text: "Läuft dein Pferd auf dieser Hand auch unregelmäßig oder wirkt es unwillig?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "abklaeren", summary: "dein Pferd läuft auf einer Hand unregelmäßig" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "aussen",
        title: "Der äußere Zügel begrenzt nicht",
        text: "Der äußere Zügel ist wie eine Wand für die äußere Schulter. Gibt er zu viel nach, kann die Schulter nach außen wegdriften und das Pferd fällt innen über die andere Schulter in den Zirkel.",
        exercises: ["rc-25", "rc-26"],
        base: 1,
      },
      {
        id: "innenzuegel",
        title: "Zu viel innerer Zügel",
        text: "Zieht man den inneren Zügel an, biegt sich der Hals stark nach innen und die Schulter fällt erst recht hinein. Der innere Zügel stellt nur – die Wendung kommt aus Sitz, Schenkel und äußerem Zügel.",
        exercises: ["rc-25", "rc-15"],
      },
      {
        id: "schenkel",
        title: "Der innere Schenkel wirkt zu wenig",
        text: "Der innere Schenkel am Gurt schickt das Pferd an den äußeren Zügel. Fehlt er, hat das Pferd keinen Grund, außen zu bleiben.",
        exercises: ["rc-26", "rc-25"],
      },
      {
        id: "sitz",
        title: "Der Sitz schiebt das Pferd",
        text: "Wer in der Hüfte einknickt oder sich in die Wendung lehnt, verlagert das Gewicht ungünstig. Das Pferd folgt dem Gewicht.",
        exercises: ["rc-27", "rc-25"],
      },
      {
        id: "linie",
        title: "Die Linie ist nicht klar",
        text: "An der offenen Seite fehlt die Bande als Orientierung. Mit Markierungen und Blick zum nächsten Punkt wird die Linie runder.",
        exercises: ["rc-25", "rc-28"],
      },
      {
        id: "schiefe",
        title: "Natürliche Schiefe",
        text: "Fast jedes Pferd hat eine Seite, die ihm leichter fällt – wie Menschen eine Lieblingshand. Ein Problem nur auf einer Hand ist oft normal, sollte aber bei Unregelmäßigkeiten fachlich abgeklärt werden.",
        exercises: ["rc-26", "rc-27"],
      },
    ],
    mistakes: ["Den inneren Zügel anziehen.", "Sich in die Wendung lehnen.", "Nach unten auf den Pferdehals schauen."],
    nextLesson: ["Stell vier Pylonen auf den Zirkel.", "Denk an „innerer Schenkel an den äußeren Zügel“.", "Lass dich auf dem Zirkel einmal von hinten filmen."],
    safety: ["Bahnregeln beachten und Abstand zu anderen Reitern halten."],
    checkWhen: ["Wenn das Pferd auf einer Hand unregelmäßig läuft oder unwillig ist: Tierarzt."],
    lessons: ["ra-w7-l3", "ra-w11-l3", "ra-w13-l3", "ra-w3-l3"],
    riderLab: ["rl-12", "rl-19"],
    plan: {
      goal: "Runde Zirkel",
      weeks: [
        { title: "Linie sichtbar machen", focus: "Zirkel mit Pylonen, Blick voraus", exercises: ["rc-25", "rc-27"] },
        { title: "Äußerer Zügel, innerer Schenkel", focus: "Pferd an den äußeren Zügel schicken", exercises: ["rc-25", "rc-26"] },
        { title: "Zirkel vergrößern", focus: "Schritt für Schritt nach außen", exercises: ["rc-26", "rc-28"] },
        { title: "Fortschritt überprüfen", focus: "Bleibt der Zirkel auf beiden Händen rund?", exercises: ["rc-28", "rc-25"] },
      ],
    },
  },

  /* ===================================================== 10 */
  {
    id: "cp-10",
    slug: "aufsteigen",
    title: "Mein Pferd bleibt beim Aufsteigen nicht stehen.",
    category: "umgang",
    review: "entwurf",
    intro: "Ein Pferd, das beim Aufsteigen losläuft, hat das oft gelernt – oder es ist ihm unangenehm. Beides lässt sich herausfinden.",
    questions: [
      {
        id: "was",
        text: "Was macht dein Pferd?",
        options: [
          { id: "los", label: "Es läuft los, sobald ich im Sattel bin.", summary: "dein Pferd läuft los, sobald du sitzt", weights: { gelernt: 3 } },
          { id: "weg", label: "Es tritt weg, während ich aufsteige.", summary: "dein Pferd tritt beim Aufsteigen weg", weights: { unangenehm: 2, technik: 2 } },
          { id: "dreht", label: "Es dreht sich zu mir oder weg von der Aufstiegshilfe.", summary: "dein Pferd dreht sich von der Aufstiegshilfe weg", weights: { aufstiegshilfe: 3 } },
          { id: "zappelt", label: "Es ist unruhig und zappelt.", summary: "dein Pferd ist beim Aufsteigen unruhig", weights: { unruhe: 2, unangenehm: 1 } },
        ],
      },
      {
        id: "wie",
        text: "Wie steigst du meistens auf?",
        options: [
          { id: "boden", label: "Vom Boden aus.", summary: "du steigst vom Boden aus auf", weights: { technik: 2, unangenehm: 1 } },
          { id: "hilfe", label: "Mit einer Aufstiegshilfe.", weights: {} },
          { id: "unterschiedlich", label: "Unterschiedlich.", weights: { aufstiegshilfe: 1 } },
        ],
      },
      {
        id: "danach",
        text: "Was passiert direkt nach dem Aufsitzen?",
        showIf: { q: "was", anyOf: ["los", "zappelt"] },
        options: [
          { id: "sofort", label: "Wir reiten sofort los.", summary: "ihr reitet sofort nach dem Aufsitzen los", weights: { gelernt: 3 } },
          { id: "warten", label: "Ich warte, bis ich soweit bin.", weights: { unruhe: 1 } },
          { id: "weissnicht", label: "Weiß ich nicht genau.", weights: {} },
        ],
      },
      {
        id: "zeichen",
        safety: true,
        text: "Zeigt dein Pferd beim Satteln, Gurten oder Aufsteigen Abwehr – Ohren anlegen, nach dir schnappen, Rücken wegdrücken, buckeln?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "abklaeren", summary: "dein Pferd zeigt Abwehr beim Satteln oder Aufsteigen", weights: { unangenehm: 4 } },
        ],
      },
      {
        id: "gefahr",
        safety: true,
        showIf: { q: "zeichen", anyOf: ["ja"] },
        text: "Steigt oder buckelt dein Pferd beim Aufsteigen?",
        options: [
          { id: "nein", label: "Nein." },
          { id: "ja", label: "Ja.", flag: "stopp", summary: "dein Pferd steigt oder buckelt beim Aufsteigen" },
        ],
      },
      STAND,
    ],
    causes: [
      {
        id: "gelernt",
        title: "Losgehen ist zur Gewohnheit geworden",
        text: "Wenn nach dem Aufsitzen immer sofort losgeritten wird, lernt das Pferd: Gewicht im Sattel = Losgehen. Es nimmt die Bewegung vorweg.",
        exercises: ["rc-32", "rc-34"],
        base: 1,
      },
      {
        id: "unangenehm",
        title: "Aufsteigen ist dem Pferd unangenehm",
        text: "Ein drückender Sattel, ein zu schnell festgezogener Gurt oder Schmerzen im Rücken können Pferde ausweichen lassen. Aufsteigen vom Boden belastet den Rücken zusätzlich. Sattel und Rücken sollten fachlich geprüft werden.",
        exercises: ["rc-34"],
        check: true,
        base: 1,
      },
      {
        id: "technik",
        title: "Das Aufsteigen selbst",
        text: "Mit der Fußspitze in den Bauch stoßen, am Sattel ziehen oder in den Sattel plumpsen – das alles ist für das Pferd unangenehm.",
        exercises: ["rc-34"],
      },
      {
        id: "aufstiegshilfe",
        title: "Die Aufstiegshilfe ist dem Pferd nicht vertraut",
        text: "Manche Pferde mögen nicht nah an eine Aufstiegshilfe heran. Mit kleinen Schritten lernen sie, dort ruhig zu stehen.",
        exercises: ["rc-33", "rc-32"],
      },
      {
        id: "unruhe",
        title: "Unruhe und Ungeduld",
        text: "Unruhige Umgebung, andere Pferde, die losreiten, oder Bewegungsmangel können Pferde zappelig machen. Ruhe, Routine und ausreichend Bewegung helfen.",
        exercises: ["rc-32", "rc-33"],
      },
    ],
    mistakes: ["Nach dem Aufsitzen sofort losreiten.", "Das Pferd strafen, wenn es einen Schritt macht.", "Vom Boden aus am Sattel hochziehen.", "Gurt auf einmal ganz festziehen."],
    nextLesson: ["Bitte jemanden, das Pferd beim Aufsteigen zu halten.", "Nach dem Aufsitzen 10 Sekunden ruhig sitzen bleiben und loben.", "Gurt in mehreren Etappen nachgurten."],
    safety: ["Steigt oder buckelt dein Pferd beim Aufsteigen: nicht aufsteigen und eine Fachperson hinzuziehen.", "Immer mit Helm, auch beim Aufsteigen."],
    checkWhen: ["Bei Abwehr beim Satteln, Gurten oder Aufsteigen: Sattler (Passform) und Tierarzt (Rücken)."],
    lessons: ["ra-w1-l4", "ra-w9-l1", "ra-w1-l3", "ra-w10-l3"],
    riderLab: ["rl-01"],
    plan: {
      goal: "Ruhig stehen beim Aufsteigen",
      weeks: [
        { title: "Stehen auf Signal", focus: "Am Boden ruhig stehen üben", exercises: ["rc-32"] },
        { title: "Aufstiegshilfe kennenlernen", focus: "Kleine Schritte, viel Lob", exercises: ["rc-33", "rc-32"] },
        { title: "Weich aufsteigen", focus: "Leicht in den Sattel, dann stehen bleiben", exercises: ["rc-34", "rc-33"] },
        { title: "Fortschritt überprüfen", focus: "Wie lange bleibt dein Pferd stehen?", exercises: ["rc-34"] },
      ],
    },
  },
];

const bySlug = new Map(coachProblemData.map((p) => [p.slug, p]));
const byId = new Map(coachProblemData.map((p) => [p.id, p]));
export const loadProblem = (slug: string) => bySlug.get(slug);
export const loadProblemById = (id: string) => byId.get(id);
