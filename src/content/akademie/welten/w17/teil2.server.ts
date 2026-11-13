import "server-only";
import { head, item } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 12, Lektionen 5–8 */
export const teil2: DeepInput[] = [
  /* ---------- 5. Herde ---------- */
  {
    slug: "herdenverhalten",
    title: "Herdenverhalten und soziale Beziehungen",
    speaker: "ben",
    intro:
      "„Du musst der Leithengst sein, sonst tanzt dir dein Pferd auf der Nase herum.“ Solche Sätze beruhen auf einem veralteten Bild der Herde. Pferdegruppen funktionieren viel feiner – und der Mensch ist kein Pferd.",
    illustration: item("pferd"),
    terms: begriffe(
      ["Rangbeziehung", "Wer einem anderen in einer bestimmten Situation ausweicht – zum Beispiel am Futter."],
      ["Bevorzugter Partner", "Pferd, mit dem ein anderes besonders viel Zeit verbringt, frisst, ruht und sich putzt."],
      ["Dominanztheorie", "Veraltete Vorstellung, der Mensch müsse sich als ranghöchstes Herdenmitglied durchsetzen."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Wie Pferdegruppen leben",
          text: "Frei lebende Pferde leben in Familiengruppen mit einem oder wenigen Hengsten, mehreren Stuten und ihrem Nachwuchs; junge Hengste schließen sich zu Junggesellengruppen zusammen. Die Gruppen sind über Jahre stabil. Im Stall leben Pferde dagegen oft in zusammengewürfelten Gruppen, die sich durch Verkauf und Neuzugänge immer wieder verändern.\n\nDas Leben in der Gruppe bietet Schutz, Wärme, Fellpflege und Orientierung. Viele Pferde haben einen oder mehrere bevorzugte Partner, mit denen sie fressen, ruhen und sich putzen. Werden solche Freunde getrennt, kann das für beide großen Stress bedeuten.",
        },
        {
          heading: "Rang ist nicht alles",
          text: "In jeder Gruppe gibt es Rangbeziehungen: Ein Pferd weicht einem anderen am Futter oder an der Tränke aus. Diese Beziehungen sind aber nicht einfach eine starre Leiter von oben nach unten. Sie hängen von der Situation, der Ressource und den beteiligten Pferden ab.\n\nIn stabilen Gruppen gibt es wenig ernsthafte Auseinandersetzungen. Meist genügt ein Blick oder ein angelegtes Ohr, und das andere Pferd weicht aus. Wer eine Gruppe in Bewegung setzt, ist nicht unbedingt das „ranghöchste“ Pferd – Forschung zeigt, dass die Initiative für Ortswechsel von verschiedenen Pferden ausgehen kann. Das Bild der allmächtigen Leitstute ist deshalb zu einfach.",
        },
        {
          heading: "Warum der Mensch kein Leitpferd ist",
          text: "Pferde wissen, dass wir keine Pferde sind. Unsere Beziehung zu ihnen entsteht nicht dadurch, dass wir sie „dominieren“, sondern durch Lernen: Pferde lernen, welche Signale was bedeuten und welche Folgen ihr Verhalten hat. Klarheit, Verlässlichkeit und gutes Timing sind dafür entscheidend – nicht Rangkämpfe.\n\nWer die Dominanztheorie anwendet, deutet viele Probleme falsch: Ein Pferd, das drängelt, „testet“ nicht seinen Rang, sondern hat oft gelernt, dass Drängeln zum Ziel führt – oder es hat Angst, Schmerzen oder ist unsicher.",
        },
        {
          heading: "Gruppen gut zusammenstellen",
          text: "• Neue Pferde schrittweise eingewöhnen: erst über den Zaun, dann mit einem ruhigen Partner, dann in die Gruppe.\n• Möglichst stabile Gruppen; häufige Wechsel bedeuten Stress.\n• Ausreichend Platz und Ausweichmöglichkeiten, mehrere Futter- und Wasserstellen.\n• Pferde mit sehr unterschiedlichen Bedürfnissen (z. B. ein sehr verspielter Jungwallach und ein alter Senior) brauchen besondere Aufmerksamkeit.\n• Gemischte Gruppen aus Stuten und Wallachen sind möglich, getrennte Gruppen haben manchmal weniger Unruhe – das hängt von den Pferden ab.\n\nEin Pferd, das dauerhaft von der Gruppe gejagt wird, nicht an Futter und Wasser kommt und sich nicht hinlegen kann, gehört in eine andere Konstellation.",
        },
      ],
      praxis: {
        title: "Tivoli und Scrabble",
        text: "Tivoli und Scrabble stehen seit Jahren zusammen. Sie fressen nebeneinander, putzen sich gegenseitig am Widerrist und dösen Kopf an Schweif, damit jeder dem anderen die Fliegen vertreibt. Als Scrabble für ein Wochenende auf einen Lehrgang fährt, wiehert Tivoli immer wieder, läuft am Zaun auf und ab und frisst schlechter.\n\nHanna nimmt das ernst. Sie stellt Tivoli in der Zeit zu Tonga, mit der er sich gut versteht, und plant künftige Abwesenheiten so, dass er nicht allein bleibt.",
      },
      fehler: fehler(
        ["Sich als „Leitstute“ durchsetzen wollen.", "Klar, verlässlich und mit gutem Timing kommunizieren."],
        ["Pferdefreunde ohne Not trennen.", "Bevorzugte Partner möglichst zusammenlassen."],
        ["Neue Pferde direkt in die Gruppe stellen.", "Schrittweise eingewöhnen."],
        ["Drängeln als Rangtest deuten.", "Ursache suchen: gelerntes Verhalten, Angst, Unsicherheit."],
      ),
      richtig: [
        "Beobachte die Beziehungen in der Gruppe deines Pferdes.",
        "Erkenne bevorzugte Partner und Spannungen.",
        "Gewöhne neue Pferde schrittweise ein.",
        "Sorge für Platz und mehrere Ressourcen.",
        "Baue die Beziehung zu deinem Pferd über klares, verlässliches Training auf.",
      ],
      merke: [
        "Pferde leben in Beziehungen, nicht nur in einer Rangordnung.",
        "Rangbeziehungen hängen von Situation und Ressource ab.",
        "Der Mensch ist kein Leitpferd – Beziehung entsteht durch Lernen.",
        "Freundschaften zwischen Pferden sind wichtig.",
      ],
      weiter: weiter(["Grundkurs: Leben in der Herde", "ra-w9-l2"], ["Drohen, Beißen, Treten und Konfliktverhalten", "ra-w17-l6"], ["Haltungsformen", "ra-w15-l2"]),
    },
    exercise: [
      wahl(
        "ra-w17-l5-entscheidung",
        "Ein neues Pferd steht seit drei Tagen in einer Gruppe, wird am Heu immer vertrieben und steht abseits. Was ist sinnvoll?",
        "Eine zusätzliche Futterstelle einrichten, die Situation beobachten und es eventuell mit einem ruhigen Partner getrennt eingewöhnen",
        [
          ["Abwarten, das regeln die Pferde selbst", "Wenn ein Pferd nicht an Futter kommt, muss der Mensch die Bedingungen verbessern."],
          ["Das ranghöchste Pferd bestrafen", "Strafe ändert nichts an der Ressourcenknappheit."],
        ],
        "Richtig. Ressourcen verteilen und schrittweise eingewöhnen.",
      ),
    ],
    quiz: [
      frage("rang", "Was gilt für Rangbeziehungen in einer Pferdegruppe?", "Sie hängen von Situation und Ressource ab", [["Sie sind eine starre Leiter von oben nach unten", "Das Bild ist zu einfach."], ["Es gibt keine Rangbeziehungen", "Es gibt sie, aber sie sind vielfältig."]], "Genau. Meist reicht ein Signal, und ein Pferd weicht aus."),
      frage("mensch", "Wie entsteht eine gute Beziehung zwischen Mensch und Pferd?", "Durch klares, verlässliches Training mit gutem Timing", [["Dadurch, dass der Mensch das Leitpferd spielt", "Pferde wissen, dass wir keine Pferde sind."], ["Durch möglichst viele Leckerli", "Futter allein schafft keine klare Kommunikation."]], "Richtig. Pferde lernen über die Folgen ihres Verhaltens."),
      frage("freunde", "Was kann passieren, wenn befreundete Pferde getrennt werden?", "Beide können großen Stress haben", [["Nichts, Pferde haben keine Freunde", "Viele Pferde haben bevorzugte Partner."], ["Sie werden ruhiger", "Häufig ist das Gegenteil der Fall."]], "Genau. Rufen, Unruhe und schlechtes Fressen sind typisch."),
    ],
  },

  /* ---------- 6. Konfliktverhalten ---------- */
  {
    slug: "konfliktverhalten",
    title: "Drohen, Beißen, Treten und Konfliktverhalten",
    speaker: "lea",
    intro:
      "„Er hat ohne Vorwarnung gebissen!“ Fast immer gab es eine Vorwarnung – sie war nur leise. Pferde eskalieren in Stufen. Wer diese Stufen kennt, kann früh reagieren und sich schützen.",
    illustration: head("tivoli", "grummelig"),
    terms: begriffe(
      ["Drohen", "Signal, das eine mögliche Handlung ankündigt, z. B. Ohren anlegen, Hinterhand zudrehen."],
      ["Eskalation", "Schrittweise Steigerung von leisen Signalen bis zum Beißen oder Treten."],
      ["Ressourcenverteidigung", "Verteidigen von Futter, Wasser, Platz oder Partner."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Die Eskalationsleiter",
          text: "Pferde vermeiden ernsthafte Kämpfe, weil sie gefährlich sind. Deshalb kündigen sie Konflikte an – meist in Stufen:\n\n1. Anspannung: starrer Blick, Kopf hebt sich, Maul wird fest.\n2. Ohren anlegen, Nüstern ziehen sich zusammen.\n3. Kopf drohend in Richtung des anderen strecken, Schweif schlägt.\n4. Hinterhand zudrehen, ein Hinterbein heben.\n5. Andeuten: Zähne zeigen, mit dem Bein antäuschen.\n6. Beißen oder Treten.\n\nNicht jedes Pferd zeigt alle Stufen. Pferde, die für Warnsignale bestraft wurden, überspringen manchmal die leisen Stufen – dann wirkt es so, als käme der Biss „aus dem Nichts“.",
        },
        {
          heading: "Gründe für Konfliktverhalten",
          text: "Pferde drohen oder wehren sich, weil sie:\n\n• Futter, Wasser, Platz oder einen Partner verteidigen,\n• Schmerzen haben (zum Beispiel beim Satteln, Gurten, Putzen bestimmter Stellen),\n• Angst haben und nicht ausweichen können,\n• gelernt haben, dass Drohen unangenehme Dinge beendet,\n• überfordert oder frustriert sind,\n• hormonell beeinflusst sind (etwa rossige Stuten, Hengste).\n\nDas Verhalten selbst ist Kommunikation. Wer nur das Verhalten bestraft, ohne die Ursache zu ändern, verliert die Vorwarnung – und das Problem bleibt.",
        },
        {
          heading: "Sicher bleiben",
          text: "• Halte dich nicht im Bereich der Hinterhand eines Pferdes auf, das droht.\n• Stelle dich beim Füttern nie zwischen zwei Pferde.\n• Gehe nicht mit Futter in eine Gruppe.\n• Respektiere Warnsignale: Abstand gewinnen, ruhig bleiben, die Situation entschärfen.\n• Lerne die individuellen Zeichen des Pferdes kennen, mit dem du arbeitest.\n\nBei Pferden, die wiederholt beißen oder treten, ist professionelle Hilfe sinnvoll – und eine tierärztliche Untersuchung.",
        },
        {
          heading: "Was hilft langfristig",
          text: "Die Ursache bestimmt die Lösung. Bei Schmerzen: tierärztliche Abklärung, Sattel und Ausrüstung prüfen. Bei Ressourcenverteidigung: Fütterung so gestalten, dass keine Konkurrenz entsteht, nie aus der Hand füttern, wenn das Pferd dann drängelt. Bei Angst: in kleinen Schritten Vertrauen aufbauen. Bei gelerntem Verhalten: neues Verhalten trainieren, das sich für das Pferd lohnt (z. B. ruhig stehen beim Gurten, belohnt mit Pause).\n\nKurze, klare Grenzen sind in Gefahrensituationen manchmal nötig. Sie ersetzen aber nie die Suche nach der Ursache.",
        },
      ],
      praxis: {
        title: "Beißen beim Gurten",
        text: "Eine Einstellerstute dreht beim Gurten jedes Mal den Kopf, legt die Ohren an und schnappt in die Luft. Ihre Besitzerin hat sie dafür bisher angeschrien. Mila erzählt ihr von der Eskalationsleiter. Gemeinsam beobachten sie: Die Stute spannt sich schon an, wenn der Sattel kommt.\n\nDie Tierärztin findet Verspannungen in der Gurtlage und einen empfindlichen Magen, der Sattler passt den Sattel an. Die Besitzerin gurtet jetzt in mehreren kleinen Schritten mit Pausen. Nach einigen Wochen schnappt die Stute nicht mehr.",
      },
      fehler: fehler(
        ["Warnsignale bestrafen.", "Warnsignale ernst nehmen und Ursachen ändern."],
        ["Mit einem Futtereimer in eine Pferdegruppe gehen.", "Futter nie in die Gruppe mitnehmen."],
        ["Sich zwischen zwei streitende Pferde stellen.", "Abstand halten, Situation von außen entschärfen."],
        ["Beißen beim Gurten als „Zicke“ abtun.", "Schmerz, Sattel und Gurtung prüfen."],
      ),
      richtig: [
        "Lerne die Stufen der Eskalation kennen.",
        "Reagiere auf leise Signale mit Abstand und Ruhe.",
        "Finde die Ursache: Ressource, Schmerz, Angst, Lernen, Frust.",
        "Ändere die Bedingungen, nicht nur das Verhalten.",
        "Hol dir bei wiederholtem Beißen oder Treten professionelle Hilfe.",
      ],
      merke: [
        "Pferde warnen fast immer – oft leise.",
        "Wer Warnsignale bestraft, verliert die Vorwarnung.",
        "Bei Abwehr beim Satteln, Gurten oder Putzen: an Schmerz denken.",
        "Nie zwischen Pferde, nie mit Futter in die Gruppe.",
      ],
      weiter: weiter(["Herdenverhalten und soziale Beziehungen", "ra-w17-l5"], ["Wie Pferde lernen", "ra-w17-l7"], ["Sicher am Pferd", "ra-w1-l1"]),
    },
    exercise: [
      wahl(
        "ra-w17-l6-entscheidung",
        "Du gehst mit einem Eimer Möhren auf die Weide, drei Pferde kommen, eines legt die Ohren an und dreht die Hinterhand zu einem anderen. Was tust du?",
        "Den Eimer nicht weiter hineintragen, ruhig Abstand gewinnen und die Weide verlassen",
        [
          ["Stehen bleiben und die Möhren schnell verteilen", "Du stehst mitten in einem Ressourcenkonflikt – Trittgefahr."],
          ["Das drohende Pferd mit dem Eimer verscheuchen", "Das kann die Situation verschärfen."],
        ],
        "Richtig. Futter in der Gruppe löst Konflikte aus – sicher ist, gar nicht erst mit Futter hineinzugehen.",
      ),
    ],
    quiz: [
      frage("leise", "Was ist oft die erste Stufe der Eskalation?", "Anspannung mit starrem Blick und festem Maul", [["Ein direkter Tritt", "Treten steht ganz am Ende."], ["Lautes Wiehern", "Wiehern ist kein typisches Drohsignal."]], "Genau. Danach folgen meist angelegte Ohren."),
      frage("strafe", "Was kann passieren, wenn man Warnsignale bestraft?", "Das Pferd überspringt die leisen Signale und wird unberechenbarer", [["Es hört auf, sich zu wehren", "Die Ursache bleibt – nur die Warnung verschwindet."], ["Nichts", "Strafe verändert das Verhalten, oft zum Schlechteren."]], "Richtig. Dann kommt der Biss scheinbar „aus dem Nichts“."),
      frage("gurten", "Woran solltest du bei Beißen beim Gurten zuerst denken?", "An Schmerzen oder unpassende Ausrüstung", [["An Frechheit", "Häufig steckt eine körperliche Ursache dahinter."], ["An Langeweile", "Langeweile ist selten der Grund."]], "Genau. Tierarzt und Sattler einbeziehen."),
    ],
  },

  /* ---------- 7. Lerntheorie ---------- */
  {
    slug: "lerntheorie",
    title: "Wie Pferde lernen: Lerntheorie verständlich erklärt",
    speaker: "mila",
    intro:
      "Jedes Mal, wenn du mit einem Pferd zusammen bist, lernt es etwas – auch dann, wenn du gar nicht „trainieren“ willst. Die Frage ist nur, ob es das lernt, was du möchtest.",
    illustration: tabelle("Lerntheorie", "Vier Wege, wie Folgen Verhalten verändern", [
      ["", "etwas kommt dazu", "etwas fällt weg"],
      ["Verhalten wird häufiger", "positive Verstärkung (z. B. Futterlob)", "negative Verstärkung (Druck hört auf)"],
      ["Verhalten wird seltener", "positive Strafe (z. B. Ruck)", "negative Strafe (z. B. Futter weg)"],
    ]),
    terms: begriffe(
      ["Gewöhnung (Habituation)", "Ein Reiz verliert seine Wirkung, weil er wiederholt ohne Folgen auftritt."],
      ["Sensibilisierung", "Ein Pferd reagiert auf einen Reiz immer stärker, z. B. weil er unangenehm war."],
      ["Positive Verstärkung", "Etwas Angenehmes kommt dazu – das Verhalten wird häufiger."],
      ["Negative Verstärkung", "Etwas Unangenehmes hört auf – das Verhalten wird häufiger. So wirken viele Reiterhilfen."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Gewöhnung und Sensibilisierung",
          text: "Die einfachste Form des Lernens ist Gewöhnung: Ein Reiz, der immer wieder auftritt und nichts Schlimmes bedeutet, verliert seine Wirkung. So gewöhnen sich Pferde an Traktoren, Planen oder den Putzplatz. Wichtig ist, dass das Pferd dabei unterhalb seiner Reizschwelle bleibt.\n\nDas Gegenteil ist Sensibilisierung: Wird ein Reiz als unangenehm oder bedrohlich erlebt, reagiert das Pferd beim nächsten Mal stärker. Wer ein Pferd zu schnell an etwas „gewöhnen“ will, erreicht oft genau das. Die Methode, ein Pferd einem Reiz so lange auszusetzen, bis es aufgibt (Flooding), kann zu erlernter Hilflosigkeit führen und wird aus Tierschutzsicht abgelehnt.",
        },
        {
          heading: "Lernen durch Verknüpfung",
          text: "Pferde verknüpfen Signale mit dem, was danach passiert. Klappert der Futtereimer, kommen die Pferde – sie haben gelernt, dass nach dem Geräusch Futter kommt. Das nennt man klassische Konditionierung. Sie wirkt auch bei Gefühlen: Ein Pferd, das am Putzplatz oft Schmerzen hatte, kann allein beim Anblick des Putzplatzes angespannt werden.\n\nMan kann das gezielt nutzen. Beim Gegenkonditionieren wird ein Reiz, der Angst macht, mit etwas Angenehmem verknüpft – zum Beispiel ein flatterndes Band, das in sicherer Entfernung immer mit Futter verbunden wird.",
        },
        {
          heading: "Lernen durch Folgen",
          text: "Verhalten, das sich lohnt, wird häufiger; Verhalten, das unangenehme Folgen hat, seltener. Dafür gibt es vier Wege (siehe Tabelle):\n\n• Positive Verstärkung: Etwas Angenehmes kommt dazu, z. B. ein Futterlob oder Kraulen.\n• Negative Verstärkung: Etwas Unangenehmes hört auf. So funktionieren Druck und Nachgeben: Der Schenkel drückt, das Pferd geht vorwärts, der Druck hört sofort auf. Das Aufhören ist die Belohnung.\n• Positive Strafe: Etwas Unangenehmes kommt dazu.\n• Negative Strafe: Etwas Angenehmes wird weggenommen.\n\n„Positiv“ und „negativ“ bedeuten hier nur „dazu“ und „weg“, nicht „gut“ und „schlecht“. Gutes Pferdetraining setzt vor allem auf Verstärkung und kommt mit wenig oder keiner Strafe aus.",
        },
        {
          heading: "Timing, Klarheit, Konsequenz",
          text: "Pferde verknüpfen eine Folge mit dem, was sie in diesem Moment tun. Die Belohnung oder das Nachgeben muss deshalb innerhalb von ein bis zwei Sekunden kommen. Wer zu spät nachgibt, belohnt etwas anderes – oft das Gegenteil von dem, was er wollte.\n\nWeitere Grundsätze, wie sie auch die internationale Gesellschaft für Pferdewissenschaft (ISES) formuliert:\n• Ein Signal hat eine Bedeutung – nicht mehrere.\n• Signale sind leicht zu unterscheiden.\n• Ein Signal wird nicht gleichzeitig mit einem gegenteiligen gegeben (z. B. treiben und ziehen).\n• Neues wird in kleinen Schritten aufgebaut.\n• Druck so leicht wie möglich, so stark wie nötig – und sofortiges Nachgeben.\n• Ruhe und Entspannung sind Teil des Trainings.",
        },
        {
          heading: "Was Pferde nicht können",
          text: "Pferde lernen sehr gut, aber anders als wir. Sie denken nicht in Absichten wie „Der will mich ärgern“ und planen keine Rache. Eine Strafe, die Minuten nach einem Verhalten kommt, verstehen sie nicht als Folge dieses Verhaltens.\n\nPferde verallgemeinern außerdem nicht automatisch: Was es auf dem Reitplatz gelernt hat, kann es im Gelände erst einmal wieder unsicher machen. Gelerntes muss in verschiedenen Situationen geübt werden.",
        },
      ],
      praxis: {
        title: "Das Nachgeben kam zu spät",
        text: "Tilda möchte, dass Tonga an der Hand rückwärts geht. Sie drückt mit dem Strick, Tonga macht einen kleinen Schritt zurück – aber Tilda drückt weiter, bis Tonga drei Schritte gemacht hat. Danach wirft Tonga den Kopf hoch. Beim nächsten Mal geht es schlechter.\n\nDie Reitlehrerin erklärt: Tonga hat beim ersten Schritt das Richtige getan, aber der Druck hörte nicht auf. Sie lernte, dass Rückwärtsgehen nichts bringt – erst das Kopfhochwerfen „beendete“ die Übung. Tilda ändert das Timing: Druck, ein Schritt, sofort nachgeben und loben. Nach wenigen Minuten geht Tonga auf ein leichtes Signal rückwärts.",
      },
      fehler: fehler(
        ["Zu spät nachgeben oder belohnen.", "Innerhalb von ein bis zwei Sekunden reagieren."],
        ["Ein Pferd „mit Gewalt“ an etwas gewöhnen.", "Unterhalb der Reizschwelle, in kleinen Schritten."],
        ["Gleichzeitig treiben und am Zügel ziehen.", "Ein klares Signal zur Zeit."],
        ["Später strafen, „damit es weiß, was es getan hat“.", "Pferde verknüpfen nur, was im Moment passiert."],
      ),
      richtig: [
        "Überlege dir vorher genau, welches Verhalten du möchtest.",
        "Gib ein klares, leichtes Signal.",
        "Belohne oder gib nach, sobald das Pferd einen Schritt in die richtige Richtung macht.",
        "Baue Neues in kleinen Schritten auf und übe es in verschiedenen Situationen.",
        "Setze vor allem auf Verstärkung, möglichst wenig auf Strafe.",
        "Plane Pausen ein, in denen das Pferd verarbeiten kann.",
      ],
      merke: [
        "Pferde lernen immer – auch wenn du nicht trainieren willst.",
        "Bei Druck und Nachgeben ist das Nachgeben die Belohnung.",
        "Timing: innerhalb von ein bis zwei Sekunden.",
        "Ein Signal, eine Bedeutung – und keine widersprüchlichen Hilfen.",
        "Pferde planen keine Rache; späte Strafe verstehen sie nicht.",
      ],
      weiter: weiter(["Vertrauen und gute Kommunikation aufbauen", "ra-w17-l8"], ["Das Zusammenspiel der Hilfen und halbe Paraden", "ra-w18-l7"], ["Was sind Reiterhilfen?", "ra-w3-l1"]),
    },
    exercise: [
      wahl(
        "ra-w17-l7-entscheidung",
        "Du gibst einen Schenkeldruck, das Pferd geht vorwärts. Was ist jetzt lerntheoretisch am wichtigsten?",
        "Den Druck sofort aufhören lassen – das Nachgeben ist die Belohnung",
        [
          ["Den Schenkel weiter drücken, damit es im Tempo bleibt", "Dann lernt das Pferd, dass Vorwärtsgehen den Druck nicht beendet – es stumpft ab."],
          ["Mit der Gerte nachtreiben, damit es noch schneller wird", "Das bestraft das Pferd dafür, dass es richtig reagiert hat."],
        ],
        "Richtig. So lernt das Pferd, auf feine Hilfen zu reagieren.",
      ),
    ],
    quiz: [
      frage("negativ", "Was bedeutet negative Verstärkung?", "Etwas Unangenehmes hört auf, und das Verhalten wird häufiger", [["Das Pferd wird bestraft", "„Negativ“ heißt hier nur „etwas fällt weg“."], ["Das Pferd bekommt kein Futter", "Das wäre negative Strafe."]], "Genau. So wirken viele Reiterhilfen: Druck und Nachgeben."),
      frage("timing", "Innerhalb welcher Zeit sollte eine Belohnung oder das Nachgeben kommen?", "Innerhalb von ein bis zwei Sekunden", [["Innerhalb von fünf Minuten", "Dann verknüpft das Pferd die Belohnung nicht mehr mit dem Verhalten."], ["Am Ende der Stunde", "Viel zu spät."]], "Richtig. Gutes Timing ist das Wichtigste."),
      frage("flooding", "Was gilt für Flooding, also einen Reiz so lange auszusetzen, bis das Pferd aufgibt?", "Es kann zu erlernter Hilflosigkeit führen und wird abgelehnt", [["Es ist die schnellste und beste Methode", "Es kann schweren Schaden anrichten."], ["Es ist dasselbe wie Gewöhnung", "Gewöhnung findet unterhalb der Reizschwelle statt."]], "Genau. Besser: kleine Schritte und Gegenkonditionieren."),
      frage("rache", "Plant ein Pferd Rache?", "Nein – Pferde verknüpfen Folgen mit dem, was gerade passiert", [["Ja, Pferde sind nachtragend", "Pferde erinnern sich an Erfahrungen, planen aber keine Rache."], ["Nur Stuten", "Das ist ein Vorurteil."]], "Richtig. Darum hilft späte Strafe nichts."),
    ],
  },

  /* ---------- 8. Vertrauen ---------- */
  {
    slug: "vertrauen-kommunikation",
    title: "Vertrauen und gute Kommunikation aufbauen",
    speaker: "ben",
    intro:
      "„Er vertraut mir einfach nicht.“ Vertrauen ist kein Gefühl, das ein Pferd plötzlich hat. Es entsteht aus vielen kleinen Erfahrungen, in denen der Mensch verlässlich, verständlich und fair war.",
    illustration: head("tonga", "neugierig"),
    terms: begriffe(
      ["Vorhersehbarkeit", "Das Pferd kann erkennen, was als Nächstes passiert."],
      ["Kontrollierbarkeit", "Das Pferd kann durch sein Verhalten die Situation beeinflussen."],
      ["Ruhesignal", "Ein trainiertes Signal, auf das das Pferd sich entspannt, z. B. den Kopf senkt."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Woraus Vertrauen entsteht",
          text: "Aus Sicht der Lerntheorie entsteht Vertrauen, wenn Situationen für das Pferd vorhersehbar und kontrollierbar sind: Es versteht, was der Mensch möchte, und erlebt, dass richtiges Verhalten zu angenehmen Folgen führt. Unvorhersehbare Strafen, widersprüchliche Signale und Überforderung untergraben Vertrauen.\n\nVertrauen ist außerdem situationsabhängig. Ein Pferd kann dir am Putzplatz voll vertrauen und im Gelände trotzdem unsicher sein. Das ist kein Widerspruch – es braucht dort neue gute Erfahrungen.",
        },
        {
          heading: "Gute Kommunikation",
          text: "• Klare Signale: Jedes Signal bedeutet eine Sache.\n• Leise beginnen: Erst das feinste Signal, nur bei Bedarf deutlicher werden.\n• Sofort aufhören, wenn das Pferd reagiert.\n• Konsequent sein: Was heute gilt, gilt auch morgen.\n• Ruhe ausstrahlen: Pferde reagieren auf unsere Körperspannung, Atmung und Bewegungen.\n• Zuhören: Auf die Signale des Pferdes reagieren, statt sie zu übergehen.\n\nKommunikation läuft in beide Richtungen. Ein Pferd, das merkt, dass seine Signale – „Ich bin unsicher“, „Das tut weh“ – beachtet werden, muss nicht lauter werden.",
        },
        {
          heading: "Übungen, die Vertrauen stärken",
          text: "• Ruhiges Führen mit vielen Haltepunkten und Lob.\n• Ein Ruhesignal aufbauen: Das Pferd lernt, auf leichten Druck auf das Genick oder ein Wort den Kopf zu senken; ein gesenkter Kopf hilft beim Entspannen.\n• Gelassenheitstraining in kleinen Schritten mit Planen, Bällen, Flatterband – immer so, dass das Pferd neugierig bleibt und nicht flüchtet.\n• Gemeinsame Spaziergänge an der Hand, auch an neuen Orten.\n• Gleichbleibende Abläufe beim Putzen und Satteln.\n\nWichtig ist nicht die Übung selbst, sondern dass sie für das Pferd verständlich und erfolgreich ist.",
        },
        {
          heading: "Grenzen gehören dazu",
          text: "Vertrauen heißt nicht, dass alles erlaubt ist. Klare Grenzen geben Sicherheit – zum Beispiel, dass ein Pferd beim Führen nicht in den Menschen hineinläuft. Grenzen werden aber durch Training aufgebaut, nicht durch Einschüchterung: Das Pferd lernt, welches Verhalten erwünscht ist, und wird dafür belohnt.\n\nIn gefährlichen Situationen musst du dich schützen. Das ist kein Vertrauensbruch, solange es fair und vorhersehbar bleibt und danach wieder Ruhe einkehrt.",
        },
      ],
      praxis: {
        title: "Das Ruhesignal",
        text: "Ben bringt Tivoli bei, auf eine Hand am Genick den Kopf zu senken. Er legt die Hand ganz leicht auf, und sobald Tivoli den Kopf auch nur ein paar Zentimeter senkt, nimmt er die Hand weg und lobt. Nach einigen Tagen senkt Tivoli den Kopf auf eine leichte Berührung tief ab und kaut dabei.\n\nAls Tivoli sich auf dem Weg zum Paddock vor einem flatternden Absperrband anspannt, gibt Ben das Signal. Tivoli senkt den Kopf, atmet aus – und geht danach entspannt vorbei.",
      },
      fehler: fehler(
        ["Heute so, morgen anders reagieren.", "Verlässlich und konsequent bleiben."],
        ["Mit dem stärksten Signal beginnen.", "Leise beginnen, nur bei Bedarf deutlicher werden."],
        ["Signale des Pferdes übergehen.", "Zuhören und darauf eingehen."],
        ["Grenzen durch Einschüchterung setzen.", "Erwünschtes Verhalten trainieren und belohnen."],
      ),
      richtig: [
        "Sei verlässlich: gleiche Signale, gleiche Folgen.",
        "Beginne mit leisen Signalen und gib sofort nach.",
        "Achte auf deine eigene Ruhe und Körperspannung.",
        "Baue ein Ruhesignal auf.",
        "Übe neue Situationen in kleinen, erfolgreichen Schritten.",
      ],
      merke: [
        "Vertrauen entsteht aus Vorhersehbarkeit und Kontrollierbarkeit.",
        "Leise beginnen, sofort nachgeben.",
        "Zuhören gehört zur Kommunikation.",
        "Grenzen werden trainiert, nicht erzwungen.",
      ],
      weiter: weiter(["Wie Pferde lernen", "ra-w17-l7"], ["Körpersprache beim Führen", "ra-w17-l9"], ["Was bedeutet feines Reiten?", "ra-w8-l1"]),
    },
    exercise: [
      wahl(
        "ra-w17-l8-entscheidung",
        "Dein Pferd ist im Gelände unsicher, obwohl es dir im Stall völlig vertraut. Was ist die beste Erklärung?",
        "Vertrauen ist situationsabhängig – im Gelände braucht es neue gute Erfahrungen",
        [
          ["Es vertraut dir in Wahrheit gar nicht", "Vertrauen kann an einem Ort da sein und am anderen erst wachsen."],
          ["Es will dich im Gelände testen", "Pferde testen nicht absichtlich – es ist unsicher."],
        ],
        "Richtig. Neue Orte brauchen neue, gute Erfahrungen.",
      ),
    ],
    quiz: [
      frage("entsteht", "Woraus entsteht Vertrauen beim Pferd?", "Aus vorhersehbaren, verständlichen und fairen Erfahrungen", [["Aus möglichst viel Strenge", "Strenge ohne Klarheit verunsichert."], ["Aus Leckerli allein", "Futter hilft, ersetzt aber keine klare Kommunikation."]], "Genau. Viele kleine gute Erfahrungen."),
      frage("leise", "Wie beginnst du mit einem Signal?", "So leise wie möglich und nur bei Bedarf deutlicher", [["Gleich kräftig, damit es sicher reagiert", "So stumpft das Pferd ab."], ["Mit mehreren Signalen gleichzeitig", "Das verwirrt das Pferd."]], "Richtig. So bleibt das Pferd fein."),
      frage("grenzen", "Wie werden Grenzen am besten aufgebaut?", "Durch Training von erwünschtem Verhalten, das belohnt wird", [["Durch Einschüchterung", "Einschüchterung zerstört Vertrauen."], ["Gar nicht, Grenzen schaden dem Vertrauen", "Klare Grenzen geben Sicherheit."]], "Genau. Fair, klar und vorhersehbar."),
    ],
  },
];
