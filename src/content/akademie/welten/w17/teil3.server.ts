import "server-only";
import { item } from "../../build";
import { scene } from "../../types";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 12, Lektionen 9–12 */
export const teil3: DeepInput[] = [
  /* ---------- 9. Führen ---------- */
  {
    slug: "koerpersprache-fuehren",
    title: "Körpersprache beim Führen und im täglichen Umgang",
    speaker: "lea",
    intro:
      "Manche Menschen führen ein Pferd mit lockerem Strick, und es geht ruhig neben ihnen her. Bei anderen drängelt dasselbe Pferd, bleibt stehen oder läuft vorneweg. Der Unterschied liegt selten im Strick – sondern im Körper des Menschen.",
    illustration: item("fuehren"),
    terms: begriffe(
      ["Führposition", "Position des Menschen etwa auf Höhe von Kopf bis Schulter des Pferdes, mit Abstand."],
      ["Treibende Zone", "Bereich hinter der Schulter; Körpersprache dorthin wirkt vorwärts."],
      ["Bremsende Zone", "Bereich vor der Schulter; Körpersprache dorthin bremst oder lässt das Pferd weichen."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Dein Körper spricht mit",
          text: "Pferde achten sehr genau auf Körperspannung, Blickrichtung, Tempo und Position des Menschen. Ein Mensch, der zögerlich und angespannt geht, ständig zum Pferd zurückschaut und am Strick zieht, sendet andere Signale als jemand, der ruhig, aufrecht und zielstrebig in die Richtung geht, in die er will.\n\nBeim Führen gilt: Du gehst etwa auf Höhe zwischen Kopf und Schulter, mit etwa einer Armlänge Abstand, und schaust dorthin, wohin du gehen möchtest. Der Strick hängt locker durch.",
        },
        {
          heading: "Anhalten, Losgehen, Wenden",
          text: "• Losgehen: Atme ein, richte dich auf, schau nach vorn und geh los. Viele Pferde folgen schon dieser Körpersprache. Reicht das nicht, ein leichter Impuls am Strick nach vorn, sofort wieder locker.\n• Anhalten: Langsamer werden, ausatmen, stehen bleiben, Körper leicht zum Pferd drehen. Erst wenn nötig, ein leichter Impuls am Strick nach hinten.\n• Wenden: Vom Pferd weg wenden ist einfacher und sicherer. Beim Wenden zum Pferd hin gehst du etwas voran und gibst mit Körper und Hand Raum vor.\n\nGenau wie beim Reiten gilt: leise beginnen, sofort nachgeben, wenn das Pferd reagiert.",
        },
        {
          heading: "Raum und Abstand",
          text: "Ein Pferd, das ständig in den Menschen hineinläuft, mit der Schulter drängelt oder ihm auf die Füße tritt, ist gefährlich – nicht, weil es „dominant“ ist, sondern weil es nie gelernt hat, Abstand zu halten, oder weil es unsicher ist und Nähe sucht.\n\nAbstand lässt sich trainieren: Ein Signal mit der Hand oder dem Strickende in Richtung Schulter bedeutet „Weich ein Stück“. Sobald das Pferd einen Schritt zur Seite macht, hört das Signal auf und es gibt Lob. Wichtig ist, dass das Pferd danach entspannt bleibt – das Ziel ist ein höflicher Abstand, kein ängstliches Pferd.",
        },
        {
          heading: "Typische Probleme beim Führen",
          text: "• Pferd zieht nach vorn: oft Eile, Unsicherheit oder ein Ziel (Weide, Futter). Häufiger anhalten, belohnen, wenn es neben dir bleibt.\n• Pferd bleibt stehen: Angst, Unsicherheit, Schmerz oder Unklarheit. Nicht ziehen – ein Pferd ist stärker. Seitlich einen Schritt machen, leicht schräg antreten lassen, Zeit geben.\n• Pferd drängelt in Kurven: Wende vorbereiten, Abstand trainieren.\n• Pferd frisst unterwegs Gras: klare Regel festlegen (z. B. nur nach einem Wort grasen) und konsequent bleiben.\n\nSicherheit: Strick nie um Hand oder Körper wickeln, Handschuhe tragen, festes Schuhwerk.",
        },
      ],
      praxis: {
        title: "Mila und der Zug zur Weide",
        text: "Wenn Mila Tonga zur Weide führt, zieht Tonga jeden Abend vorneweg, und Mila hängt am Strick. Hanna beobachtet und gibt Mila einen Tipp: kurz vor dem Tor alle paar Schritte anhalten, ausatmen, stehen bleiben – und erst weitergehen, wenn Tonga ruhig neben ihr steht. Jedes ruhige Stehen wird gelobt.\n\nAm ersten Abend dauert der Weg doppelt so lang. Nach einer Woche geht Tonga mit lockerem Strick bis zum Tor und wartet dort, bis Mila das Halfter abnimmt.",
      },
      fehler: fehler(
        ["Am Strick ziehen, wenn das Pferd stehen bleibt.", "Seitlich antreten lassen, Zeit geben, Ursache prüfen."],
        ["Strick um die Hand wickeln.", "Strick in Schlaufen halten, nie wickeln."],
        ["Ständig zum Pferd zurückschauen.", "In die Richtung schauen, in die du gehen willst."],
        ["Drängeln als Dominanz deuten.", "Abstand freundlich und klar trainieren."],
      ),
      richtig: [
        "Geh auf Höhe zwischen Kopf und Schulter, eine Armlänge Abstand.",
        "Schau nach vorn und halte den Strick locker.",
        "Lass deinen Körper die Signale geben: aufrichten zum Losgehen, ausatmen zum Anhalten.",
        "Gib am Strick nur leichte Impulse und lass sofort wieder locker.",
        "Trainiere Abstand mit einem klaren Signal und Lob.",
        "Trag Handschuhe und festes Schuhwerk.",
      ],
      merke: [
        "Dein Körper führt mit – der Strick ist nur ein Hilfsmittel.",
        "Leise Impulse, sofort nachgeben.",
        "Abstand ist trainierbar und schützt dich.",
        "Strick nie um die Hand wickeln.",
      ],
      weiter: weiter(["Grundkurs: Führen und sicher anbinden", "ra-w10-l3"], ["Vertrauen und gute Kommunikation aufbauen", "ra-w17-l8"], ["Wie Pferde lernen", "ra-w17-l7"]),
    },
    exercise: [
      wahl(
        "ra-w17-l9-entscheidung",
        "Dein Pferd bleibt beim Führen plötzlich stehen und schaut auf etwas. Was tust du?",
        "Nicht ziehen, kurz stehen lassen, dann seitlich einen Schritt machen und es leicht schräg antreten lassen",
        [
          ["Kräftig am Strick ziehen", "Ein Pferd ist stärker – Ziehen führt oft zu Gegenziehen."],
          ["Hinter das Pferd gehen und es antreiben", "Hinter einem unsicheren Pferd bist du in Gefahr."],
        ],
        "Richtig. Schräg antreten ist für ein Pferd leichter als geradeaus.",
      ),
    ],
    quiz: [
      frage("position", "Wo gehst du beim Führen?", "Etwa zwischen Kopf und Schulter, eine Armlänge Abstand", [["Direkt vor dem Pferd", "Dort kann es dich umrennen."], ["Hinter der Hinterhand", "Dort bist du in Trittgefahr."]], "Genau. So siehst du das Pferd und es sieht dich."),
      frage("anhalten", "Wie hältst du beim Führen am feinsten an?", "Langsamer werden, ausatmen, stehen bleiben – erst bei Bedarf ein leichter Strickimpuls", [["Ruckartig am Strick reißen", "Das ist unnötig hart und führt zu Spannung."], ["Weitergehen und hoffen", "Klare Körpersprache hilft dem Pferd."]], "Richtig. Viele Pferde reagieren schon auf die Körpersprache."),
      frage("strick", "Was gilt für den Führstrick?", "Nie um die Hand wickeln", [["Immer straff halten", "Der Strick hängt locker durch."], ["Um den Arm wickeln, damit er nicht rutscht", "Wenn das Pferd erschrickt, kannst du mitgerissen werden."]], "Genau. Schlaufen in der Hand, nie wickeln."),
    ],
  },

  /* ---------- 10. Reiten ---------- */
  {
    slug: "konfliktsignale-reiten",
    title: "Körpersprache und Konfliktsignale beim Reiten",
    speaker: "mila",
    intro:
      "Schweifschlagen, Zähneknirschen, Kopfschlagen, Zackeln: Unter dem Sattel zeigen Pferde viele Signale. Manche gelten als „Macken“. Studien zeigen aber, dass viele davon mit Schmerzen zusammenhängen.",
    illustration: scene("ak-reiter-sitz"),
    terms: begriffe(
      ["Konfliktverhalten", "Verhalten, mit dem ein Pferd Unwohlsein, Schmerz oder Überforderung beim Reiten zeigt."],
      ["Ridden Horse Pain Ethogram", "Wissenschaftlich entwickelte Liste von 24 Verhaltensweisen unter dem Sattel, die auf Schmerzen hinweisen können."],
      ["Zackeln", "Unruhiges Traben in kurzen Tritten, wenn das Pferd Schritt gehen soll."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Zufriedenes Pferd unter dem Sattel",
          text: "Ein Pferd, dem es unter dem Sattel gut geht, bewegt sich taktmäßig und losgelassen, trägt den Schweif ruhig und mitschwingend, kaut leicht auf dem Gebiss, hat ein ruhiges Maul, bewegliche Ohren und einen weichen Blick. Es reagiert auf feine Hilfen, ohne zu eilen oder sich festzumachen, und schnaubt ab.",
        },
        {
          heading: "Signale, die auf ein Problem hinweisen",
          text: "Die Tierärztin Sue Dyson und ihr Team haben mit dem „Ridden Horse Pain Ethogram“ 24 Verhaltensweisen beschrieben, die bei lahmen oder schmerzhaften Pferden deutlich häufiger auftreten. Dazu gehören zum Beispiel:\n\n• Kopf wiederholt hoch-runter oder seitlich schlagen, Kopf schief halten\n• Maul öffnen, Zunge herausstrecken, Zähneknirschen\n• Ohren dauerhaft zurück, starrer Blick, sichtbares Augenweiß\n• Kopf deutlich vor oder hinter der Senkrechten, Kopf zu hoch\n• Wiederholtes, heftiges Schweifschlagen, schief getragener Schweif\n• Eilen oder deutlich zu langsam, Taktfehler, Zackeln\n• Stolpern, Anhalten ohne Hilfe, Rückwärtsgehen, Steigen, Buckeln\n• Wechsel der Galoppfolge, falscher Galopp\n\nZeigt ein Pferd viele dieser Verhaltensweisen in einer Reiteinheit (in der Forschung acht oder mehr), ist die Wahrscheinlichkeit für Schmerzen hoch. Einzelne Signale können auch andere Gründe haben.",
        },
        {
          heading: "Andere Ursachen",
          text: "Nicht jedes Konfliktsignal bedeutet Schmerz. Mögliche weitere Ursachen sind:\n\n• Unpassende Ausrüstung: drückender Sattel, zu enger Nasenriemen, falsches Gebiss.\n• Reiterfehler: harte oder unruhige Hand, unausbalancierter Sitz, widersprüchliche Hilfen.\n• Überforderung: Lektionen, die das Pferd körperlich oder vom Verständnis her noch nicht kann.\n• Angst oder Umweltreize.\n• Erlerntes Verhalten: Ein Pferd hat gelernt, dass Kopfschlagen die Hand nachgeben lässt.\n\nDie Reihenfolge bei der Ursachensuche lautet: Schmerz und Ausrüstung zuerst, dann Reiter und Training.",
        },
        {
          heading: "Was du als Reiter tun kannst",
          text: "• Ehrlich hinschauen: Lass dich filmen und zähle Konfliktsignale.\n• Reitlehrer fragen, wie die Signale mit deinen Hilfen zusammenhängen.\n• Ausrüstung prüfen lassen: Sattel, Trense, Gebiss, Nasenriemen (zwei Finger Platz).\n• Bei wiederkehrenden oder vielen Signalen: tierärztliche Untersuchung, auch wenn das Pferd nicht offensichtlich lahmt.\n• Trainingsanforderungen anpassen.\n\nPferde, die Konfliktsignale zeigen, sind keine „schwierigen“ Pferde. Sie geben dir Informationen.",
        },
      ],
      praxis: {
        title: "Acht Signale in zehn Minuten",
        text: "Eine Einstellerin klagt, ihr Wallach sei „faul und stur“. Mila filmt eine Reiteinheit. Beim Anschauen zählen sie: Ohren dauernd zurück, Maul offen, Schweifschlagen beim Angaloppieren, falscher Galopp, Zähneknirschen, Kopf schräg, zweimal Stehenbleiben, Taktunreinheit im Trab.\n\nDie Einstellerin ist zuerst gekränkt, lässt den Wallach dann aber untersuchen. Die Tierärztin findet eine Lahmheit an beiden Hinterbeinen, die vorher niemand gesehen hatte. Nach der Behandlung zeigt der Wallach unter dem Sattel deutlich weniger Konfliktsignale – und ist plötzlich gar nicht mehr „faul“.",
      },
      fehler: fehler(
        ["Konfliktsignale als Macken oder Charakter abtun.", "Ursachen suchen: Schmerz, Ausrüstung, Reiter, Training."],
        ["Mit stärkerem Gebiss oder Hilfszügeln „lösen“.", "Erst Ursache klären – Zwang verdeckt das Problem."],
        ["Nur auf Lahmheit achten.", "Auch viele kleine Konfliktsignale können auf Schmerzen hinweisen."],
        ["Videos nur von gelungenen Momenten machen.", "Ganze Einheiten filmen und ehrlich auswerten."],
      ),
      richtig: [
        "Lerne, wie ein zufriedenes Pferd unter dem Sattel aussieht.",
        "Lass dich filmen und zähle Konfliktsignale.",
        "Prüfe zuerst Schmerz und Ausrüstung, dann Reiter und Training.",
        "Hol dir Rückmeldung von Reitlehrer, Sattler und Tierarzt.",
        "Passe die Anforderungen an das Pferd an.",
      ],
      merke: [
        "Viele Konfliktsignale unter dem Sattel hängen mit Schmerzen zusammen.",
        "Acht oder mehr Signale in einer Einheit: Schmerz wahrscheinlich – tierärztlich abklären.",
        "Erst Schmerz und Ausrüstung, dann Reiter und Training prüfen.",
        "Konfliktsignale sind Informationen, keine Macken.",
      ],
      weiter: weiter(["Grundkurs: Pferdeverhalten beim Reiten", "ra-w8-l3"], ["Lahmheit erkennen", "ra-w16-l12"], ["Trainingsprobleme erkennen und systematisch verbessern", "ra-w18-l20"]),
    },
    exercise: [
      wahl(
        "ra-w17-l10-entscheidung",
        "Ein Pferd schlägt beim Angaloppieren jedes Mal mit dem Schweif, öffnet das Maul und springt häufig falsch an. Was ist der beste erste Schritt?",
        "Schmerz und Ausrüstung abklären lassen, bevor am Training etwas geändert wird",
        [
          ["Mit Gerte und Sporen deutlicher werden", "Mehr Druck kann ein schmerzhaftes Pferd noch stärker belasten."],
          ["Einen engeren Nasenriemen verschnallen", "Damit wird nur ein Signal unterdrückt, nicht die Ursache gelöst."],
        ],
        "Richtig. Diese Kombination spricht für Schmerz oder ein Ausrüstungsproblem.",
      ),
    ],
    quiz: [
      frage("ethogramm", "Was beschreibt das Ridden Horse Pain Ethogram?", "Verhaltensweisen unter dem Sattel, die auf Schmerzen hinweisen können", [["Die richtige Sitzposition des Reiters", "Es geht um das Verhalten des Pferdes."], ["Eine Liste von Dressurlektionen", "Es ist ein Werkzeug zur Schmerzerkennung."]], "Genau. 24 Verhaltensweisen, die bei schmerzhaften Pferden häufiger sind."),
      frage("reihenfolge", "In welcher Reihenfolge suchst du nach Ursachen?", "Erst Schmerz und Ausrüstung, dann Reiter und Training", [["Erst Training, zuletzt Tierarzt", "Ein schmerzhaftes Pferd kann man nicht wegtrainieren."], ["Nur der Reiter ist schuld", "Mehrere Faktoren spielen zusammen."]], "Richtig. Schmerz zuerst ausschließen."),
      frage("nasenriemen", "Wie viel Platz sollte unter dem Nasenriemen sein?", "Etwa zwei Finger", [["Gar keiner", "Ein zu enger Nasenriemen verursacht Schmerzen."], ["Eine ganze Faust", "Dann sitzt er zu locker."]], "Genau. So kann das Pferd kauen."),
    ],
  },

  /* ---------- 11. Verhaltensprobleme ---------- */
  {
    slug: "verhaltensprobleme",
    title: "Häufige Verhaltensprobleme und mögliche Ursachen",
    speaker: "ben",
    intro:
      "Kleben am Stall, Steigen, Buckeln, Scheuen, nicht stillstehen beim Aufsteigen – für fast jedes Problem gibt es im Internet ein „Rezept“. Das Problem: Dasselbe Verhalten kann ganz unterschiedliche Ursachen haben, und ein Rezept passt nur, wenn die Ursache stimmt.",
    illustration: tabelle("Verhaltensprobleme", "Ein Verhalten – viele mögliche Ursachen", [
      ["Verhalten", "Mögliche Ursachen"],
      ["Buckeln", "Rücken- oder Sattelschmerz, Übermut, Kälte, Angst"],
      ["Steigen", "Schmerz (Maul, Rücken), Angst, widersprüchliche Hilfen"],
      ["Kleben", "Trennungsangst, Unsicherheit, Schmerz, Gelerntes"],
      ["Nicht stillstehen", "Sattel- oder Rückenschmerz, Ungeduld, Gelerntes"],
      ["Scheuen", "Wahrnehmung, Angst, Sehprobleme, Spannung des Reiters"],
    ]),
    terms: begriffe(
      ["Kleben", "Pferd will sich nicht von Stall oder Artgenossen entfernen."],
      ["Trennungsstress", "Starker Stress, wenn ein Pferd von seiner Gruppe getrennt wird."],
      ["Verhaltensberatung", "Fachliche Hilfe durch Tierärztinnen mit Zusatzbezeichnung Verhaltenstherapie oder qualifizierte Trainer."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Ein Verhalten, viele Ursachen",
          text: "Ein Pferd, das buckelt, kann Rückenschmerzen haben, einen drückenden Sattel, übermütig sein, frieren oder sich erschrecken. Ein Pferd, das steigt, kann Maulschmerzen haben, in Panik sein oder widersprüchliche Hilfen bekommen haben – vorwärts treiben und gleichzeitig am Zügel festhalten.\n\nDeshalb steht vor jeder Lösung die Frage nach dem Warum. Hilfreich sind folgende Fragen:\n• Seit wann zeigt das Pferd das Verhalten? Plötzlich oder schon immer?\n• In welchen Situationen genau? Wann nicht?\n• Hat sich etwas verändert: Haltung, Ausrüstung, Reiter, Futter, Gesundheit?\n• Was passiert direkt vorher und direkt danach?",
        },
        {
          heading: "Kleben und Trennungsstress",
          text: "Pferde sind Herdentiere. Sich von der Gruppe zu entfernen, ist für viele Pferde ein echter Stress, kein Trotz. Typische Zeichen: Wiehern, Zurückdrängen, Stehenbleiben, Drehen, Zackeln Richtung Stall.\n\nHilfreich: in kleinen Schritten trainieren, zuerst nur kurze Entfernungen, mit einem ruhigen Begleitpferd beginnen, auf dem Rückweg nicht eilen, sondern auch dort anhalten und Pausen machen, damit der Stall nicht zum einzigen „sicheren Ort“ wird. Ein Pferd, das allein im Stall zurückbleibt, braucht ebenfalls Gesellschaft.",
        },
        {
          heading: "Buckeln, Steigen, nicht stillstehen",
          text: "Diese Verhaltensweisen sind gefährlich und häufig mit Schmerzen verbunden. Ein Pferd, das beim Aufsteigen wegläuft, beim Angaloppieren buckelt oder plötzlich steigt, sollte tierärztlich untersucht und die Ausrüstung geprüft werden – bevor trainiert wird.\n\nIst Schmerz ausgeschlossen, hilft gezieltes Training: Stillstehen beim Aufsteigen wird an der Aufstiegshilfe Schritt für Schritt geübt und belohnt; beim Angaloppieren werden die Hilfen klarer und das Pferd körperlich vorbereitet. Steigende Pferde gehören in erfahrene Hände.",
        },
        {
          heading: "Wann Profis nötig sind",
          text: "Bei gefährlichen Verhaltensweisen (Steigen, Durchgehen, starkes Buckeln, Beißen, Schlagen), bei Problemen, die sich verschlimmern, oder wenn du selbst Angst hast, brauchst du Unterstützung: Tierarzt für die körperliche Abklärung, gute Reitlehrer oder Trainer mit pferdegerechten Methoden, gegebenenfalls Tierärztinnen mit Fachrichtung Verhalten.\n\nVorsicht bei Angeboten, die schnelle Lösungen durch Druck, Einschüchterung oder Hilfsmittel versprechen. Sie unterdrücken Verhalten oft nur, statt die Ursache zu lösen.",
        },
      ],
      praxis: {
        title: "Plötzlich nicht mehr stillstehen",
        text: "Scrabble stand beim Aufsteigen immer ruhig. Seit zwei Wochen geht er los, sobald Wilhelm den Fuß in den Bügel stellt. Wilhelm denkt kurz an Ungeduld, dann fällt ihm ein: Der Sattel wurde vor drei Wochen neu gepolstert.\n\nDie Sattlerin stellt fest, dass der Sattel jetzt am Widerrist drückt. Nach der Korrektur steht Scrabble wieder ruhig – und Wilhelm notiert sich: „Plötzliche Veränderung = zuerst nach Veränderungen suchen.“",
      },
      fehler: fehler(
        ["Für jedes Problem ein Rezept aus dem Internet nehmen.", "Erst die Ursache herausfinden."],
        ["Plötzliche Verhaltensänderungen als Erziehungsproblem sehen.", "Nach Veränderungen suchen und Schmerz ausschließen."],
        ["Gefährliche Probleme allein lösen wollen.", "Professionelle Hilfe holen."],
        ["Mit stärkeren Hilfsmitteln reagieren.", "Ursache lösen statt Verhalten unterdrücken."],
      ),
      richtig: [
        "Beschreibe das Verhalten genau: wann, wo, wie oft, seit wann.",
        "Suche nach Veränderungen in Haltung, Ausrüstung, Gesundheit, Training.",
        "Lass Schmerzen tierärztlich ausschließen.",
        "Trainiere in kleinen Schritten mit Belohnung.",
        "Hol dir bei gefährlichen Problemen professionelle Hilfe.",
      ],
      merke: [
        "Dasselbe Verhalten kann ganz unterschiedliche Ursachen haben.",
        "Plötzliche Veränderungen haben meist einen konkreten Auslöser.",
        "Buckeln, Steigen, nicht stillstehen: oft Schmerz – zuerst abklären.",
        "Gefährliche Probleme gehören in erfahrene Hände.",
      ],
      weiter: weiter(["Stress, Angst und Überforderung erkennen", "ra-w17-l4"], ["Pferdeverhalten anhand praktischer Situationen analysieren", "ra-w17-l12"], ["Schreckhafte Pferde und unerwartete Situationen", "ra-w19-l7"]),
    },
    exercise: [
      wahl(
        "ra-w17-l11-entscheidung",
        "Ein Pferd buckelt seit kurzem beim Angaloppieren. Vorher hat es das nie getan. Was ist der beste erste Schritt?",
        "Nach Veränderungen fragen (Sattel, Gesundheit, Training) und Schmerz tierärztlich ausschließen",
        [
          ["Ab sofort nur noch mit Ausbindern reiten", "Hilfszügel lösen keine Schmerzursache."],
          ["Öfter angaloppieren, bis es sich daran gewöhnt", "Wiederholung bei Schmerz verstärkt das Problem."],
        ],
        "Richtig. Plötzliche Veränderungen haben meist einen Auslöser.",
      ),
    ],
    quiz: [
      frage("kleben", "Was steckt hinter dem Kleben am Stall oft?", "Trennungsstress eines Herdentiers", [["Bosheit", "Pferde handeln nicht aus Bosheit."], ["Faulheit", "Kleben hat meist mit Unsicherheit zu tun."]], "Genau. In kleinen Schritten üben, mit Begleitpferd beginnen."),
      frage("ploetzlich", "Was ist bei einer plötzlichen Verhaltensänderung besonders wichtig?", "Nach Veränderungen suchen und Schmerz ausschließen", [["Sofort strenger werden", "Ohne Ursache zu kennen, kann das schaden."], ["Abwarten, es geht von allein weg", "Das Problem kann sich verschlimmern."]], "Richtig. Zum Beispiel ein neu gepolsterter Sattel."),
      frage("profi", "Wann brauchst du professionelle Hilfe?", "Bei gefährlichem Verhalten oder wenn du Angst hast", [["Nie, man muss alles allein schaffen", "Das ist gefährlich für Pferd und Mensch."], ["Nur bei Turnierpferden", "Jedes Pferd kann Unterstützung brauchen."]], "Genau. Bei Gefahr geht die Sicherheit von Mensch und Pferd vor."),
    ],
  },

  /* ---------- 12. Situationen analysieren ---------- */
  {
    slug: "situationen-analysieren",
    title: "Pferdeverhalten anhand praktischer Situationen analysieren",
    speaker: "lea",
    intro:
      "Du hast in diesem Modul gelernt, Körpersprache zu lesen, Stress zu erkennen und Ursachen zu suchen. In dieser Lektion setzt du alles zusammen – mit einer Methode, die du in jeder Situation anwenden kannst.",
    illustration: tabelle("Methode", "In vier Schritten zur Einschätzung", [
      ["Schritt", "Frage"],
      ["1. Beschreiben", "Was genau sehe ich? (ohne Deutung)"],
      ["2. Situation", "Was passiert um das Pferd herum?"],
      ["3. Ursachen", "Was kommt infrage? Schmerz zuerst!"],
      ["4. Handeln", "Was ist jetzt sicher und sinnvoll?"],
    ]),
    terms: begriffe(
      ["Beschreiben", "Beobachtbares festhalten, z. B. „Ohren flach zurück, Schweif schlägt“."],
      ["Deuten", "Eine Erklärung finden, z. B. „Es ist verärgert“. Erst nach dem Beschreiben."],
      ["Hypothese", "Vermutete Ursache, die man überprüft."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Schritt 1 und 2: Beschreiben und Situation",
          text: "Beginne mit einer neutralen Beschreibung. Statt „Er ist frech“ sagst du: „Er schiebt mit der Schulter in meine Richtung und geht schneller, als ich gehe.“ Statt „Sie ist zickig“: „Sie legt die Ohren an und dreht den Kopf zu mir, wenn ich den Gurt anziehe.“\n\nDann betrachtest du die Situation: Wo seid ihr? Was passiert um das Pferd herum? Wann tritt das Verhalten auf, wann nicht? Was war direkt vorher, was passiert direkt danach? Was hat sich in letzter Zeit verändert?",
        },
        {
          heading: "Schritt 3: Mögliche Ursachen",
          text: "Sammle mögliche Erklärungen und prüfe sie:\n\n• Körper: Schmerzen, Krankheit, Ausrüstung, Kondition.\n• Gefühle: Angst, Unsicherheit, Frust, Aufregung.\n• Umwelt: neue Reize, Wetter, Artgenossen, Haltung.\n• Lernen: Was hat das Pferd in ähnlichen Situationen gelernt? Was „bringt“ ihm das Verhalten?\n• Mensch: Hilfen, Spannung, Timing, Widersprüche.\n\nSchmerz steht immer am Anfang der Liste, weil er am leichtesten übersehen wird und weil Training ein schmerzhaftes Pferd nicht heilen kann.",
        },
        {
          heading: "Schritt 4: Sicher handeln",
          text: "• Akut: Für Sicherheit sorgen, Spannung herausnehmen, Abstand schaffen, die Anforderung verringern.\n• Kurzfristig: Ursachen prüfen – Tierarzt, Sattler, Reitlehrer.\n• Langfristig: Bedingungen verändern (Haltung, Ausrüstung, Training) und neues Verhalten in kleinen Schritten aufbauen.\n\nBeobachte danach, ob sich das Verhalten verändert. Wenn nicht, war die Hypothese vielleicht falsch – dann prüfst du die nächste.",
        },
        {
          heading: "Drei Beispiele zum Durchdenken",
          text: "1. Ein Pony lässt sich auf der Weide nicht einfangen, kommt aber angelaufen, wenn ein anderer Mensch ruft. → Beschreiben, Situation: Was passiert nach dem Einfangen bei mir? Vielleicht immer Arbeit, beim anderen Menschen manchmal nur Futter und Putzen.\n\n2. Eine Stute schlägt in der Box nach dem Nachbarn, aber nur zur Fütterungszeit. → Ressourcenverteidigung und Erwartungsstress; Fütterung entzerren, Sichtschutz am Trog.\n\n3. Ein Wallach scheut seit einer Woche immer an derselben Hallenecke, wo vorher nichts war. → Situation prüfen: Neue Geräusche, Licht, Gegenstände von außen? Und: Hat er Sehprobleme oder Schmerzen in einer Wendung auf dieser Hand?",
        },
      ],
      praxis: {
        title: "Die Lagebesprechung",
        text: "Hanna lässt Lea, Mila und Ben ein Problem analysieren: Ein Schulpferd tritt beim Hufeauskratzen hinten rechts nach Kindern, bei Erwachsenen nicht. Die drei gehen die Methode durch. Beschreiben: Es zieht das Bein weg und tritt nach hinten, wenn der Huf länger als ein paar Sekunden gehalten wird. Situation: Die Kinder halten das Bein höher und weiter seitlich als die Erwachsenen.\n\nUrsachen: Schmerz im Sprunggelenk oder in der Hüfte bei starker Beugung? Die Tierärztin bestätigt eine beginnende Arthrose. Die Kinder lernen, den Huf tief zu halten und dem Pferd kurze Pausen zu geben. Das Treten hört auf.",
      },
      fehler: fehler(
        ["Sofort deuten („Er ist frech“).", "Erst neutral beschreiben."],
        ["Nur eine Ursache in Betracht ziehen.", "Mehrere Hypothesen sammeln und prüfen."],
        ["Schmerz als letzte Möglichkeit prüfen.", "Schmerz immer zuerst ausschließen."],
        ["Etwas ändern und nicht überprüfen, ob es hilft.", "Beobachten und nachsteuern."],
      ),
      richtig: [
        "Beschreibe das Verhalten neutral.",
        "Halte Situation, Vorher und Nachher fest.",
        "Sammle mögliche Ursachen – Schmerz zuerst.",
        "Handle akut sicher, kläre kurzfristig ab, verändere langfristig die Bedingungen.",
        "Überprüfe, ob sich das Verhalten verändert.",
      ],
      merke: [
        "Beschreiben vor Deuten.",
        "Situation, Vorher und Nachher gehören zur Analyse.",
        "Schmerz steht immer am Anfang der Ursachenliste.",
        "Hypothesen prüfen und nachsteuern.",
      ],
      weiter: weiter(["Die Körpersprache des Pferdes verstehen", "ra-w17-l2"], ["Häufige Verhaltensprobleme", "ra-w17-l11"], ["Gute Pferdehaltung erkennen und beurteilen", "ra-w15-l14"]),
    },
    exercise: [
      wahl(
        "ra-w17-l12-entscheidung",
        "Welche Beschreibung ist neutral und hilfreich?",
        "„Er legt die Ohren an und dreht den Kopf zu mir, wenn ich den Gurt anziehe.“",
        [
          ["„Er ist zickig beim Gurten.“", "Das ist schon eine Deutung, keine Beschreibung."],
          ["„Er will mich ärgern.“", "Das unterstellt eine Absicht, die Pferde so nicht haben."],
        ],
        "Richtig. Eine neutrale Beschreibung ist der beste Start für die Ursachensuche.",
      ),
    ],
    quiz: [
      frage("erster", "Was ist der erste Schritt der Analyse?", "Das Verhalten neutral beschreiben", [["Eine Strafe festlegen", "Zuerst verstehen, dann handeln."], ["Im Internet nach einer Lösung suchen", "Ohne genaue Beschreibung passt keine Lösung."]], "Genau. Beschreiben vor Deuten."),
      frage("schmerz", "Warum steht Schmerz am Anfang der Ursachenliste?", "Weil er oft übersehen wird und Training ihn nicht heilen kann", [["Weil er die seltenste Ursache ist", "Er ist im Gegenteil häufig."], ["Weil Tierärzte das so wollen", "Es geht um das Wohl des Pferdes."]], "Richtig. Erst abklären, dann trainieren."),
      frage("pruefen", "Was tust du, wenn sich das Verhalten nach einer Änderung nicht bessert?", "Die nächste mögliche Ursache prüfen", [["Weitermachen wie bisher", "Dann bleibt das Problem."], ["Aufgeben", "Oft war nur die erste Vermutung falsch."]], "Genau. Analyse ist ein Kreislauf."),
    ],
  },
];
