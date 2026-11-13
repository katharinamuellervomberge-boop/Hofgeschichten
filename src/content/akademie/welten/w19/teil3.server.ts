import "server-only";
import { item } from "../../build";
import { scene } from "../../types";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 14, Lektionen 9–12 */
export const teil3: DeepInput[] = [
  /* ---------- 9. Durchgehen ---------- */
  {
    slug: "durchgehen",
    title: "Durchgehen: Vorbeugung und Verhalten in Gefahrensituationen",
    speaker: "mila",
    intro:
      "Ein Pferd, das durchgeht, reagiert nicht mehr auf Hilfen und rennt in Panik davon. Das ist eine der gefährlichsten Situationen beim Reiten. Die wichtigste Erkenntnis vorweg: Das meiste lässt sich verhindern, bevor es passiert.",
    illustration: tabelle("Durchgehen", "Vom Warnzeichen zur Panik", [
      ["Stufe", "Was du merkst", "Was du tust"],
      ["Anspannung", "Kopf hoch, Ohren steif, Tempo zieht an", "früh Tempo raus, beschäftigen"],
      ["Eilen", "reagiert schlechter auf Paraden", "halbe Paraden, großer Bogen, Trab/Schritt"],
      ["Durchgehen", "keine Reaktion mehr, Panik", "sitzen bleiben, lenken, Platz nutzen"],
    ]),
    terms: begriffe(
      ["Durchgehen", "Panische Flucht, bei der das Pferd nicht mehr auf Hilfen reagiert."],
      ["Halbe Parade", "Kurzes Zusammenspiel von Gewicht, Schenkel und Zügel, hier zum Tempo-Regulieren."],
      ["Großer Bogen", "Das Pferd auf einer großen gebogenen Linie lenken, um das Tempo zu verringern."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Warum Pferde durchgehen",
          text: "Durchgehen ist meist eine Fluchtreaktion: Angst vor etwas, eine Gruppe, die losrennt, Schmerzen (z. B. ein drückender Sattel oder ein Insektenstich), Übermut bei einem Pferd, das sich zu wenig bewegen konnte, oder Überforderung. Manche Pferde haben auch gelernt, dass Losrennen eine unangenehme Situation beendet.\n\nSehr oft kündigt sich Durchgehen an: Das Pferd wird angespannt, hebt den Kopf, die Ohren werden steif, das Tempo zieht an, Paraden kommen schlechter durch. In dieser Phase kannst du noch gut eingreifen.",
        },
        {
          heading: "Vorbeugen",
          text: "• Grundanspannung senken: ausreichend Bewegung, Raufutter, Weidegang. Ein Pferd, das tagelang gestanden hat, nicht direkt ins Gelände.\n• Reiten im Rahmen der eigenen Fähigkeiten: Ein Pferd, das man auf dem Platz nicht sicher regulieren kann, gehört nicht ins Galoppgelände.\n• Ausrüstung prüfen: Sattel, Gebiss, Gurt.\n• Gruppenregeln beachten: Gangartwechsel nur nach Ansage, nicht Richtung Stall galoppieren.\n• Frühwarnzeichen ernst nehmen und Tempo rausnehmen, bevor es kritisch wird.\n• Regelmäßig trainieren, dass das Pferd auch aufgeregt auf halbe Paraden reagiert.",
        },
        {
          heading: "Wenn es passiert",
          text: "Es gibt keine Garantie, aber diese Grundsätze helfen:\n\n• Sitzen bleiben: Gewicht tief in die Bügel, Oberkörper aufrecht oder leicht vorn, festhalten (Mähne, Halsriemen) ist erlaubt. Nicht abspringen – das Verletzungsrisiko ist hoch.\n• Nicht an beiden Zügeln dauerhaft ziehen: Viele Pferde laufen gegen Dauerzug an. Besser: wiederholte, kurze, deutliche Paraden, abwechselnd mit Nachgeben.\n• Lenken: Wenn Platz ist, das Pferd auf einen großen Bogen lenken und den Bogen allmählich verkleinern. Bei hohem Tempo nie ruckartig den Kopf herumreißen – das Pferd kann stürzen.\n• Wenn möglich bergauf oder auf weichen Boden lenken – das bremst.\n• Weg von Straßen, Zäunen, Gräben.\n• Atmen, Stimme ruhig.\n\nIn der Gruppe: Die anderen halten an, niemand galoppiert hinterher – das treibt das Pferd zusätzlich an.",
        },
        {
          heading: "Danach",
          text: "Wenn das Pferd steht: absitzen, wenn du dich nicht sicher fühlst, Pferd beruhigen, auf Verletzungen prüfen (Pferd und Reiter), Ausrüstung kontrollieren. Ruhig nach Hause, im Zweifel führen.\n\nAnschließend: Ursache suchen. Gab es einen Auslöser? Schmerzen? Überforderung? Hilfe von Reitlehrer und Tierarzt holen und gezielt trainieren, bevor wieder ins Gelände geritten wird. Ein Pferd, das wiederholt durchgeht, gehört in erfahrene Hände.",
        },
      ],
      praxis: {
        title: "Die frühe Warnung",
        text: "Auf einem Feldweg spürt Lea, dass Tivoli im Trab immer schneller wird, der Kopf geht hoch, die Ohren zeigen steif nach vorn – irgendwo knallt es leise, vielleicht ein Schuss bei einer Jagd. Lea reagiert sofort: halbe Paraden, Tempo raus, Tivoli auf einen großen Bogen auf die Wiese am Wegrand lenken, wo sie reiten darf, dann Schritt.\n\nSie bleibt einen Moment stehen, lässt Tivoli schauen und atmet aus. Er schnaubt ab. Hätte sie gewartet, bis er galoppiert, wäre es viel schwerer geworden.",
      },
      fehler: fehler(
        ["Frühwarnzeichen ignorieren.", "Bei Anspannung sofort Tempo herausnehmen."],
        ["An beiden Zügeln dauerhaft ziehen.", "Kurze, deutliche Paraden mit Nachgeben."],
        ["Bei hohem Tempo den Kopf herumreißen.", "Großer Bogen, allmählich verkleinern."],
        ["In der Gruppe hinterhergaloppieren.", "Anhalten – das beruhigt eher."],
      ),
      richtig: [
        "Senke die Grundanspannung durch Bewegung und gute Haltung.",
        "Erkenne Frühwarnzeichen und reagiere früh.",
        "Bleib sitzen, Gewicht tief, festhalten erlaubt.",
        "Arbeite mit kurzen Paraden und Nachgeben.",
        "Lenke auf einen großen Bogen, bergauf oder auf weichen Boden.",
        "Suche danach die Ursache und hol dir Hilfe.",
      ],
      merke: [
        "Durchgehen kündigt sich meist an – früh reagieren.",
        "Kein Dauerzug, sondern Paraden mit Nachgeben.",
        "Großer Bogen statt Kopf herumreißen.",
        "Die Gruppe hält an.",
      ],
      weiter: weiter(["Schreckhafte Pferde und unerwartete Situationen", "ra-w19-l7"], ["Das Zusammenspiel der Hilfen und halbe Paraden", "ra-w18-l7"], ["Unfälle, Stürze und Notfälle beim Ausritt", "ra-w19-l11"], ["Gelände-Simulator (interaktive Übung)"]),
    },
    exercise: [
      wahl(
        "ra-w19-l9-entscheidung",
        "Im Galopp reagiert dein Pferd nicht mehr auf Paraden und wird immer schneller. Vor euch liegt eine große, freie Wiese. Was tust du?",
        "Sitzen bleiben, kurze Paraden mit Nachgeben geben und das Pferd auf einen großen Bogen über die Wiese lenken",
        [
          ["Abspringen", "Abspringen bei hohem Tempo ist sehr gefährlich."],
          ["Mit aller Kraft an beiden Zügeln ziehen", "Viele Pferde laufen gegen Dauerzug an."],
          ["Den Kopf ruckartig zur Seite reißen", "Bei hohem Tempo kann das Pferd stürzen."],
        ],
        "Richtig. Sitzen bleiben, Paraden mit Nachgeben, großer Bogen.",
      ),
    ],
    quiz: [
      frage("warn", "Welches ist ein Frühwarnzeichen fürs Durchgehen?", "Kopf hoch, steife Ohren, Tempo zieht an", [["Das Pferd schnaubt entspannt ab", "Das ist ein Zeichen von Entspannung."], ["Das Pferd geht ruhig im Schritt am langen Zügel", "Das ist ein ruhiges Pferd."]], "Genau. Dann sofort Tempo herausnehmen."),
      frage("zug", "Warum ist Dauerzug an beiden Zügeln ungünstig?", "Weil viele Pferde dagegen anlaufen", [["Weil es zu leise ist", "Es geht um die Wirkung im Maul."], ["Dauerzug ist richtig", "Kurze Paraden mit Nachgeben wirken besser."]], "Richtig. Paraden mit Nachgeben."),
      frage("gruppe", "Ein Pferd in der Gruppe geht durch. Was machen die anderen?", "Anhalten", [["Hinterhergaloppieren, um es einzuholen", "Das treibt das Pferd zusätzlich an."], ["Laut rufen und mit den Armen winken", "Das kann die Panik verstärken."]], "Genau. Ruhe in der Gruppe hilft."),
    ],
  },

  /* ---------- 10. Begegnungen ---------- */
  {
    slug: "begegnungen-gelaende",
    title: "Begegnungen mit Hunden, Radfahrern und Wildtieren",
    speaker: "ben",
    intro:
      "Ein Mountainbiker rast um die Kurve, ein Hund rennt bellend auf dich zu, ein Wildschwein bricht aus dem Unterholz. Im Gelände bist du nicht allein. Wer vorausschauend reitet und freundlich kommuniziert, kommt meist entspannt durch.",
    illustration: item("fahrrad"),
    terms: begriffe(
      ["Vorausschauend reiten", "Gefahren früh erkennen und das Tempo anpassen."],
      ["Kommunikation", "Andere ansprechen, um Rücksicht bitten, danken."],
      ["Wildwechsel", "Stellen, an denen Wildtiere regelmäßig Wege kreuzen."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Radfahrer und Jogger",
          text: "Schnelle, leise Bewegungen von hinten erschrecken viele Pferde. Deshalb:\n\n• Regelmäßig nach hinten schauen, vor allem auf beliebten Wegen.\n• Sobald du jemanden siehst: Tempo raus, zur Seite reiten, Pferd ruhig halten.\n• Freundlich ansprechen: „Würden Sie bitte langsam vorbeifahren? Danke!“ – Viele wissen nicht, dass Pferde schreckhaft sind.\n• Wenn dein Pferd unsicher ist, das Pferd zum Radfahrer hindrehen, damit es ihn sehen kann.\n• Danken – das sorgt für ein gutes Miteinander.\n\nZu Hause hilft gezieltes Training mit Fahrrad und Joggern in ruhiger Umgebung.",
        },
        {
          heading: "Hunde",
          text: "Ein frei laufender Hund kann ein Pferd erschrecken oder jagen. Pferde reagieren unterschiedlich: Manche fliehen, andere wehren sich und treten.\n\n• Ruhig bleiben, Tempo raus, im Schritt oder stehen.\n• Den Hundebesitzer freundlich bitten, den Hund anzuleinen oder festzuhalten.\n• Nie vor einem Hund davongaloppieren – das löst den Jagdtrieb aus.\n• Wenn ein Hund das Pferd verfolgt: Pferd zum Hund drehen, ruhig stehen bleiben; viele Hunde stoppen dann.\n• Mit dem eigenen Hund ausreiten nur, wenn er absolut zuverlässig ist und es erlaubt ist.",
        },
        {
          heading: "Wildtiere",
          text: "Rehe, Wildschweine oder Vögel tauchen oft plötzlich auf. Im Herbst und in der Dämmerung sind Wildtiere besonders aktiv. Achte auf Wildwechsel und Geräusche im Unterholz.\n\n• Bei Wildtieren: ruhig bleiben, Pferd beschäftigen, Abstand halten.\n• Bachen mit Frischlingen (junge Wildschweine) können angreifen – Abstand halten, ruhig weiterreiten oder umkehren.\n• Nicht in der Dämmerung oder nachts durch Wildgebiete reiten.\n• In der Brut- und Setzzeit (Frühjahr bis Sommer) auf Wegen bleiben und Wildtiere nicht stören.",
        },
        {
          heading: "Fahrzeuge und landwirtschaftliche Maschinen",
          text: "• Früh am Rand anhalten oder in eine Einfahrt ausweichen.\n• Fahrer per Handzeichen um Langsamfahrt bitten.\n• Pferd zum Fahrzeug hindrehen, wenn es unsicher ist – so sieht es, was kommt.\n• Bei großen Maschinen (Mähdrescher, Traktoren mit Anhänger) möglichst warten, bis sie vorbei sind.\n• Danken.\n\nIn der Gruppe gibt die Tete das Zeichen für die ganze Gruppe.",
        },
      ],
      praxis: {
        title: "Der Hund ohne Leine",
        text: "Auf dem Waldweg kommt ein großer Hund ohne Leine angerannt und bellt. Tonga spannt sich an. Tilda dreht sie ruhig zum Hund und bleibt stehen. Der Hund bleibt auch stehen und bellt weiter. Tilda ruft freundlich: „Könnten Sie Ihren Hund bitte zu sich holen? Mein Pferd hat etwas Angst.“\n\nDer Besitzer entschuldigt sich und leint den Hund an. Tilda bedankt sich und reitet im Schritt weiter. Hätte sie Tonga wegrennen lassen, hätte der Hund sie vermutlich gejagt.",
      },
      fehler: fehler(
        ["Vor einem Hund davongaloppieren.", "Stehen bleiben, Pferd zum Hund drehen, Besitzer ansprechen."],
        ["Radfahrer anschreien.", "Freundlich um Rücksicht bitten und danken."],
        ["In der Dämmerung durch Wildgebiete reiten.", "Bei Tageslicht und auf Wegen bleiben."],
        ["Nur nach vorn schauen.", "Regelmäßig auch nach hinten schauen."],
      ),
      richtig: [
        "Reite vorausschauend und schau regelmäßig nach hinten.",
        "Nimm bei Begegnungen das Tempo raus.",
        "Drehe ein unsicheres Pferd zum Auslöser hin.",
        "Kommuniziere freundlich und bedanke dich.",
        "Halte Abstand zu Wildtieren.",
        "Trainiere Begegnungen zu Hause.",
      ],
      merke: [
        "Vorausschauend reiten – auch nach hinten.",
        "Nie vor einem Hund davonrennen.",
        "Unsicheres Pferd zum Auslöser drehen.",
        "Freundlich bitten, freundlich danken.",
      ],
      weiter: weiter(["Verkehrsregeln, Waldwege und Reitrecht", "ra-w19-l4"], ["Schreckhafte Pferde", "ra-w19-l7"], ["Gelände-Simulator (interaktive Übung)"]),
    },
    exercise: [
      wahl(
        "ra-w19-l10-entscheidung",
        "Ein Radfahrer nähert sich schnell von hinten. Dein Pferd ist unsicher. Was tust du?",
        "Tempo raus, zur Seite, Pferd zum Radfahrer drehen und freundlich um langsame Vorbeifahrt bitten",
        [
          ["Schnell weitertraben, damit er nicht überholt", "Ein Wettrennen erhöht das Risiko."],
          ["Nichts tun und hoffen", "Ohne Vorbereitung kann das Pferd erschrecken."],
        ],
        "Richtig. Sehen, was kommt, gibt dem Pferd Sicherheit.",
      ),
    ],
    quiz: [
      frage("hund", "Ein Hund rennt bellend auf dein Pferd zu. Was tust du NICHT?", "Davongaloppieren", [["Pferd zum Hund drehen", "Das ist oft hilfreich."], ["Den Besitzer freundlich ansprechen", "Das ist richtig."]], "Genau. Wegrennen weckt den Jagdtrieb."),
      frage("wild", "Wann sind Wildtiere besonders aktiv?", "In der Dämmerung", [["Mittags bei Sonne", "Dann ruhen viele Wildtiere."], ["Nie", "Wildtiere sind besonders morgens und abends aktiv."]], "Richtig. Dann besser nicht durch Wildgebiete reiten."),
      frage("maschine", "Ein Traktor kommt entgegen. Was ist sinnvoll?", "Früh anhalten oder ausweichen und um Langsamfahrt bitten", [["Im Galopp vorbeireiten", "Das ist gefährlich."], ["Mitten auf dem Weg stehen bleiben", "So blockierst du und bringst dich in Gefahr."]], "Genau. Und hinterher freundlich bedanken."),
    ],
  },

  /* ---------- 11. Unfälle ---------- */
  {
    slug: "unfaelle-notfaelle-ausritt",
    title: "Unfälle, Stürze und Notfälle beim Ausritt",
    speaker: "lea",
    intro:
      "Niemand denkt gern daran, aber im Gelände kann ein Sturz passieren – weit weg von Stall und Telefonnetz. Wer vorher weiß, was zu tun ist, handelt im Ernstfall ruhiger und schneller.",
    illustration: tabelle("Notfall im Gelände", "Der Ablauf", [
      ["1", "Eigenschutz, Pferde sichern"],
      ["2", "Verletzte Person ansprechen, Lage einschätzen"],
      ["3", "Notruf 112: Wo? Was? Wie viele? Welche Verletzungen? Warten!"],
      ["4", "Erste Hilfe nach dem, was du gelernt hast"],
      ["5", "Rettungskräfte einweisen, Stall informieren"],
    ]),
    terms: begriffe(
      ["Notruf 112", "Europaweite Notrufnummer für Rettungsdienst und Feuerwehr."],
      ["Rettungspunkt", "Nummerierter, den Rettungskräften bekannter Punkt im Wald."],
      ["Stabile Seitenlage", "Lagerung einer bewusstlosen, atmenden Person, damit die Atemwege frei bleiben."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Nach einem Sturz",
          text: "1. Eigenschutz: Ist die Situation sicher? Straße? Andere Pferde?\n2. Pferde sichern: Die anderen Reiter halten an und steigen ggf. ab. Wer die Pferde hält, hält sie von der verletzten Person fern.\n3. Die gestürzte Person ansprechen: Antwortet sie? Ist sie bei Bewusstsein? Wo tut es weh?\n4. Nicht sofort aufstehen lassen: Bei Schmerzen im Rücken oder Nacken, Kribbeln, Taubheit oder Bewusstseinsstörung liegen bleiben lassen und den Notruf wählen.\n5. Erste Hilfe nach dem, was du im Erste-Hilfe-Kurs gelernt hast. Bei Bewusstlosigkeit müssen die Atemwege frei sein – dafür darf ein Helm vorsichtig, möglichst zu zweit und mit Stabilisierung des Kopfes, abgenommen werden.\n\nSelbst wenn sich die gestürzte Person gut fühlt: Bei Kopfaufprall und Helm mit sichtbaren Schäden ärztlich abklären lassen; der Helm wird ausgetauscht.",
        },
        {
          heading: "Der Notruf",
          text: "Wähle die 112 und beantworte die Fragen ruhig:\n• Wo ist der Notfall? (Weg, nächster Ort, Rettungspunkt, Standortfreigabe im Handy)\n• Was ist passiert?\n• Wie viele Verletzte?\n• Welche Verletzungen oder Zeichen?\n• Warten auf Rückfragen – nicht einfach auflegen.\n\nIm Wald ist der genaue Standort oft das größte Problem. Rettungspunkte, eine Karten-App mit Koordinaten oder die Ortungsfunktion des Handys helfen. Schick, wenn möglich, eine Person zum nächsten Weg oder zur Straße, um die Rettungskräfte einzuweisen.",
        },
        {
          heading: "Wenn das Pferd verletzt ist oder wegläuft",
          text: "Ein verletztes Pferd beruhigen, auf Wunden prüfen, Blutungen mit Druck stoppen (Modul 11), Tierarzt und Stall anrufen. Nicht weiterreiten, sondern führen oder abholen lassen.\n\nLäuft ein Pferd nach einem Sturz allein davon, rennt es meist Richtung Stall – oft über Straßen. Sofort den Stall anrufen, damit dort jemand aufpasst, und bei Gefahr für den Verkehr die Polizei (110) informieren. Nicht hinterhergaloppieren.",
        },
        {
          heading: "Vorbereitung",
          text: "• Erste-Hilfe-Kurs für Menschen auffrischen – viele Reitvereine bieten spezielle Kurse an.\n• Handy geladen am Körper, Notfallkarte, Abmelden im Stall.\n• Kleines Erste-Hilfe-Set dabei.\n• Rettungspunkte auf der Strecke kennen.\n• Vor allem Kinder und Jugendliche: nie allein ausreiten.\n• Sicherheitsweste und korrekt sitzender Helm.\n\nUnd: Nach einem Sturz erst wieder aufsteigen, wenn wirklich alles in Ordnung ist. Lieber nach Hause führen als mit Schwindel weiterreiten.",
        },
      ],
      praxis: {
        title: "Ein Sturz im Wald",
        text: "Auf einem Waldritt stolpert ein Einstellerpferd, die Reiterin fällt und bleibt liegen. Sie ist ansprechbar, klagt aber über Nackenschmerzen und ein Kribbeln in den Händen. Hanna lässt sie liegen, spricht beruhigend mit ihr und bittet sie, sich nicht zu bewegen. Mats hält die Pferde in einiger Entfernung.\n\nHanna ruft die 112, nennt den Rettungspunkt, an dem sie zehn Minuten vorher vorbeigekommen sind, und bleibt am Telefon, bis alle Fragen beantwortet sind. Ben reitet mit Tivoli langsam zur nächsten Wegkreuzung und weist den Rettungswagen ein. Die Reiterin wird gut versorgt – und Hanna hängt später eine Karte mit den Rettungspunkten der Hausrunden an die Stalltafel.",
      },
      fehler: fehler(
        ["Eine gestürzte Person mit Rückenschmerzen sofort aufstehen lassen.", "Liegen lassen, beruhigen, Notruf."],
        ["Beim Notruf nach dem ersten Satz auflegen.", "Warten auf Rückfragen."],
        ["Einem entlaufenen Pferd hinterhergaloppieren.", "Stall anrufen, Verkehr warnen."],
        ["Nach einem Kopfsturz denselben Helm weiter tragen.", "Ärztlich abklären, Helm austauschen."],
      ),
      richtig: [
        "Sichere zuerst dich selbst und die anderen Pferde.",
        "Sprich die verletzte Person an und schätze die Lage ein.",
        "Lass sie bei Rücken- oder Nackenschmerzen liegen.",
        "Wähle die 112 und nenne den genauen Standort.",
        "Leiste Erste Hilfe nach deinem Kurs.",
        "Weise die Rettungskräfte ein und informiere den Stall.",
      ],
      merke: [
        "Eigenschutz, Pferde sichern, ansprechen, Notruf, Erste Hilfe.",
        "Bei Rücken- und Nackenschmerzen nicht bewegen.",
        "Beim Notruf: Wo, was, wie viele, welche Verletzungen – und warten.",
        "Nach Kopfaufprall: ärztlich abklären und Helm tauschen.",
      ],
      weiter: weiter(["Erste Hilfe und Verhalten im Notfall (Pferd)", "ra-w16-l16"], ["Einen Ausritt richtig vorbereiten", "ra-w19-l2"], ["Warum wir einen Reithelm tragen", "ra-w1-l2"]),
    },
    exercise: [
      wahl(
        "ra-w19-l11-entscheidung",
        "Eine Mitreiterin ist gestürzt, ansprechbar, klagt über Nackenschmerzen. Was tust du?",
        "Sie liegen lassen, beruhigen, Pferde sichern und die 112 mit genauem Standort anrufen",
        [
          ["Ihr aufhelfen und sie auf ein Pferd setzen", "Bei Nackenschmerzen kann Bewegung schwere Schäden verursachen."],
          ["Den Helm sofort abnehmen, damit sie besser Luft bekommt", "Bei ansprechbaren Personen bleibt der Helm auf; abgenommen wird er nur, wenn die Atemwege gesichert werden müssen."],
        ],
        "Richtig. Nicht bewegen und professionelle Hilfe rufen.",
      ),
    ],
    quiz: [
      frage("notruf", "Was ist beim Notruf besonders wichtig?", "Den genauen Standort nennen und auf Rückfragen warten", [["Möglichst schnell wieder auflegen", "Die Leitstelle braucht Informationen."], ["Nur den eigenen Namen sagen", "Wichtiger sind Ort und Verletzungen."]], "Genau. Im Wald helfen Rettungspunkte."),
      frage("entlaufen", "Was tust du, wenn ein Pferd nach einem Sturz davonläuft?", "Den Stall anrufen und bei Gefahr den Verkehr warnen", [["Hinterhergaloppieren", "Das treibt das Pferd an und gefährdet alle."], ["Nichts, es kommt schon zurück", "Auf dem Weg kann es Straßen überqueren."]], "Richtig. Pferde laufen meist Richtung Stall."),
      frage("helm", "Was gilt für einen Helm nach einem Sturz mit Kopfaufprall?", "Er wird ausgetauscht", [["Er kann weiter benutzt werden, wenn keine Delle sichtbar ist", "Schäden im Inneren sieht man oft nicht."], ["Er wird nur gereinigt", "Die Schutzwirkung kann beeinträchtigt sein."]], "Genau. Und die Person ärztlich abklären lassen."),
    ],
  },

  /* ---------- 12. Geländetraining ---------- */
  {
    slug: "gelaendetraining-aufbauen",
    title: "Geländetraining sinnvoll aufbauen",
    speaker: "mila",
    intro:
      "Das Gelände ist nicht nur Freizeit, sondern eines der besten Trainingsgelände überhaupt: wechselnder Boden, Steigungen, neue Eindrücke. Mit einem durchdachten Aufbau wird dein Pferd fitter, trittsicherer und gelassener.",
    illustration: scene("ak-reiter-leicht"),
    terms: begriffe(
      ["Kondition", "Ausdauer, Kraft und Erholungsfähigkeit von Herz, Lunge und Muskeln."],
      ["Intervalltraining", "Wechsel von Belastungs- und Erholungsphasen."],
      ["Erholungspuls", "Wie schnell der Puls nach Belastung wieder sinkt – ein Maß für Fitness."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Warum Gelände trainiert",
          text: "• Wechselnder Untergrund verbessert Trittsicherheit und Koordination.\n• Steigungen kräftigen Hinterhand, Rücken und Bauchmuskeln.\n• Längere Strecken im Schritt und Trab bauen Ausdauer auf.\n• Neue Eindrücke fördern Gelassenheit.\n• Viele Pferde sind draußen motivierter und losgelassener als in der Halle.\n\nGeländetraining ergänzt die Arbeit auf dem Platz – Dressurpferde profitieren genauso wie Freizeitpferde.",
        },
        {
          heading: "Aufbau über Wochen",
          text: "• Woche 1–2: Schrittausritte von 45 bis 60 Minuten auf festem, ebenem Boden. Schritt ist die Grundlage für Sehnen und Bänder.\n• Woche 3–4: Längere Schrittstrecken, kurze Trabphasen (z. B. 3 × 3 Minuten), flache Steigungen im Schritt.\n• Woche 5–6: Trabphasen verlängern, erste kurze Galoppstrecken bergauf.\n• Danach: Intervalle aus Trab und Galopp mit Schrittpausen, längere Steigungen.\n\nSteigere Dauer und Intensität langsam. Sehnen, Bänder und Knochen passen sich deutlich langsamer an als Herz und Muskeln – ein Pferd kann sich fit „anfühlen“, bevor seine Beine es sind.",
        },
        {
          heading: "Belastung kontrollieren",
          text: "• Atmung: Nach einer Trab- oder Galoppreprise sollte sich die Atmung in den folgenden Minuten Schritt deutlich beruhigen.\n• Puls: Mit einem Pulsmesser oder an der Gesichtsarterie kannst du den Erholungspuls messen. Je schneller er nach Belastung sinkt, desto fitter ist das Pferd. Trainer nutzen dafür Richtwerte, die du mit deiner Reitlehrerin oder Tierärztin besprechen kannst.\n• Schweiß und Verhalten: starkes Schwitzen bei geringer Belastung, Stolpern und Unlust sind Zeichen von Überforderung.\n• Nach dem Ritt: Beine auf Wärme und Schwellungen prüfen.\n\nBei Hitze, hoher Luftfeuchtigkeit und tiefem Boden die Belastung deutlich reduzieren.",
        },
        {
          heading: "Typische Fehler und Übungen",
          text: "• Zu schnelle Steigerung: Sehnenschäden. → Langsam aufbauen, Schritt ist Training.\n• Immer dieselbe Runde: Das Pferd nimmt vorweg. → Strecken variieren.\n• Nur am Wochenende viel, unter der Woche nichts: → Regelmäßigkeit vor Umfang.\n• Erholung vergessen: → Ruhetage und Schrittphasen einplanen.\n\nÜbungen: Bergauf im Schritt mit langem Hals; Intervalle Trab–Schritt; Galopp bergauf im leichten Sitz; Schritt über unterschiedliche Böden (Wiese, Sand, Waldweg); Stangen oder Baumstämme im Schritt für Koordination.",
        },
      ],
      praxis: {
        title: "Tongas Fitnessplan",
        text: "Nach einer Winterpause soll Tonga im Frühjahr wieder fit werden. Tilda plant mit der Reitlehrerin sechs Wochen: zuerst Schrittausritte, dann kurze Trabphasen, dann Steigungen. Sie notiert nach jedem Ritt, wie schnell Tonga nach dem Trab wieder ruhig atmet.\n\nIn Woche 1 dauert es fast fünf Minuten, in Woche 6 nur noch etwa zwei. Tonga geht bergauf kräftiger, stolpert seltener und ist auf dem Platz losgelassener als je zuvor.",
      },
      fehler: fehler(
        ["Nach einer Pause sofort lange Galoppstrecken.", "Wochenweise aufbauen, Schritt zuerst."],
        ["Fitness nur am Atmen messen.", "Auch Beine, Verhalten und Erholung beobachten."],
        ["Immer dieselbe Runde reiten.", "Strecken und Böden variieren."],
        ["Bei Hitze normal trainieren.", "Belastung reduzieren, früh oder spät reiten."],
      ),
      richtig: [
        "Beginne mit längeren Schrittausritten.",
        "Steigere Trab- und Galoppanteile über Wochen.",
        "Nutze Steigungen gezielt im Schritt und später im Galopp.",
        "Kontrolliere Atmung, Puls und Beine.",
        "Plane Ruhetage und Abwechslung ein.",
        "Passe die Belastung an Wetter und Boden an.",
      ],
      merke: [
        "Gelände ist Training für Kraft, Ausdauer, Koordination und Gelassenheit.",
        "Sehnen und Bänder brauchen länger als Muskeln – langsam steigern.",
        "Erholungsatmung und -puls zeigen den Trainingsstand.",
        "Regelmäßigkeit vor Umfang.",
      ],
      weiter: weiter(["Biomechanik und Bewegungsabläufe", "ra-w18-l2"], ["Sommerhaltung, Hitze und Insektenschutz", "ra-w15-l12"], ["Puls, Atmung und Temperatur messen", "ra-w16-l2"]),
    },
    exercise: [
      wahl(
        "ra-w19-l12-entscheidung",
        "Dein Pferd hatte acht Wochen Pause. Wie beginnst du das Geländetraining?",
        "Mit Schrittausritten auf festem, ebenem Boden und langsamer Steigerung über Wochen",
        [
          ["Mit einem langen Galopp, um die Kondition zu testen", "Sehnen und Bänder sind nach der Pause nicht vorbereitet."],
          ["Mit möglichst vielen steilen Steigungen", "Das überfordert Muskeln und Sehnen."],
        ],
        "Richtig. Schritt ist die Grundlage.",
      ),
    ],
    quiz: [
      frage("sehnen", "Was passt sich bei Training am langsamsten an?", "Sehnen, Bänder und Knochen", [["Herz und Lunge", "Die passen sich vergleichsweise schnell an."], ["Die Muskeln", "Muskeln reagieren schneller als Sehnen."]], "Genau. Darum langsam steigern."),
      frage("erholung", "Woran erkennst du zunehmende Fitness?", "Atmung und Puls beruhigen sich nach Belastung schneller", [["Das Pferd schwitzt mehr", "Mehr Schweiß bei gleicher Belastung spricht eher für Überforderung."], ["Das Pferd wird langsamer", "Das ist kein Fitnesszeichen."]], "Richtig. Erholung ist ein guter Gradmesser."),
      frage("steigung", "Wofür ist Bergauf-Reiten im Schritt gut?", "Es kräftigt Hinterhand, Rücken und Bauchmuskeln", [["Es macht das Pferd schneller", "Es geht um Kraft, nicht um Tempo."], ["Es ist nur anstrengend und bringt nichts", "Es ist ein sehr wirksames Training."]], "Genau. Mit langem Hals und ruhigem Tempo."),
    ],
  },
];
