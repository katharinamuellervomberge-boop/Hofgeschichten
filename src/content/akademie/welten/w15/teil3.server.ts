import "server-only";
import { item, no, ok } from "../../build";
import type { deepLessonsOf } from "../../types";

type Input = Parameters<typeof deepLessonsOf>[1][number];

/** Modul 10, Lektionen 10–14 */
export const teil3: Input[] = [
  /* ---------- 10. Weide ---------- */
  {
    slug: "weide-anweiden-giftpflanzen",
    title: "Weidehaltung, Anweiden und Giftpflanzen",
    speaker: "lea",
    intro:
      "Im April ist das Gras endlich da, und die Pferde stehen sehnsüchtig am Zaun. „Ein paar Stunden werden schon nicht schaden“, denkt man. Warum kann der erste Weidetag nach dem Winter für ein Pferd gefährlich werden?",
    illustration: item("gras"),
    terms: [
      { term: "Fruktan", meaning: "Speicherzucker der Gräser, der im Dünndarm kaum verdaut wird und im Dickdarm schnell vergärt." },
      { term: "Anweiden", meaning: "Schrittweise Gewöhnung an frisches Gras über mehrere Wochen." },
      { term: "EMS / PPID", meaning: "Equines Metabolisches Syndrom und Cushing-Erkrankung (PPID): Stoffwechselstörungen mit erhöhtem Hufrehe-Risiko." },
      { term: "Atypische Weidemyopathie", meaning: "Oft tödliche Muskelerkrankung, ausgelöst durch Giftstoffe in Samen und Keimlingen des Bergahorns." },
    ],
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Weide: Futter, Bewegung und Gesellschaft",
          text: "Auf der Weide können Pferde fressen, sich bewegen und mit Artgenossen zusammen sein – alles gleichzeitig. Kaum eine Haltungsform kommt den Grundbedürfnissen näher.\n\nDie Kehrseite: Junges Gras ist sehr energiereich und kann viel Zucker enthalten. Für leichtfuttrige Pferde und Ponys wird unbegrenzter Weidegang deshalb schnell zum Gesundheitsrisiko. Gutes Weidemanagement heißt, die Vorteile zu nutzen und die Risiken zu steuern.",
        },
        {
          heading: "Warum anweiden?",
          text: "Die Mikroorganismen im Dickdarm haben sich im Winter auf Heu eingestellt. Frisches Gras enthält mehr Wasser, mehr leicht verdauliche Kohlenhydrate und mehr Eiweiß. Kommt es plötzlich in großen Mengen, gerät die Darmflora aus dem Gleichgewicht. Mögliche Folgen sind Durchfall, Kotwasser, Kolik und – besonders gefürchtet – Hufrehe.\n\nAngeweidet wird deshalb schrittweise. Viele Fachquellen empfehlen, mit etwa 10 bis 15 Minuten pro Tag zu beginnen und die Zeit über zwei bis vier Wochen langsam zu steigern. Bei Pferden mit Hufrehe-Vorgeschichte, EMS, PPID oder Übergewicht wird noch vorsichtiger vorgegangen – mit einem Plan, den Tierärztin oder Tierarzt mit dir abstimmt.\n\nVor dem Weidegang sollte das Pferd Heu gefressen haben. Wer hungrig auf die Weide kommt, schlingt.",
        },
        {
          heading: "Fruktan, Wetter und Tageszeit",
          text: "Gräser bilden tagsüber durch Photosynthese Zucker und speichern einen Teil als Fruktan. Wachsen sie, verbrauchen sie diesen Vorrat – vor allem in warmen Nächten. Ist es nachts kalt (oft genannt: unter etwa 5 °C) und tagsüber sonnig, wachsen die Gräser kaum, und der Fruktangehalt bleibt hoch. Auch Trockenheit, Überweidung und Stress lassen die Gehalte steigen. Stängel und Halmbasis enthalten mehr Fruktan als die Blätter.\n\nPraktisch heißt das: Bei sonnigem Wetter nach kalten Nächten – typisch im Frühjahr und Herbst – ist für empfindliche Pferde besondere Vorsicht nötig. Nach warmen Nächten ist der Gehalt am frühen Morgen meist am niedrigsten. Fruktan ist dabei nicht die einzige Ursache von Hufrehe; Übergewicht und Stoffwechselstörungen spielen eine große Rolle.",
        },
        {
          heading: "Weidemanagement",
          text: "Eine gute Pferdeweide braucht Pflege:\n\n• Abäppeln: Kot regelmäßig entfernen. Das senkt den Parasitendruck und verhindert „Geilstellen“, an denen Pferde nicht fressen.\n• Ruhephasen und Nachmahd: Flächen abwechselnd nutzen, nach dem Beweiden überständiges Gras mähen.\n• Besatz anpassen: Wie viele Pferde eine Fläche verträgt, hängt von Boden, Aufwuchs und Jahreszeit ab. Kahle, zertretene Flächen sind ein Zeichen für Überbesatz.\n• Zaun: gut sichtbar, stabil, regelmäßig kontrolliert, Stromzaun mit ausreichender Spannung. Stacheldraht ist für Pferde ungeeignet.\n• Wasser und Schatten: jederzeit Wasser, Schutz vor Sonne und Wetter.\n• Begrenzen bei Bedarf: Fressbremse, Portionsweide oder stundenweiser Weidegang für leichtfuttrige Pferde.",
        },
        {
          heading: "Giftpflanzen erkennen",
          text: "Pferde meiden viele Giftpflanzen, wenn genug anderes Futter da ist. Auf kargen Weiden, im Heu oder bei jungen Pflanzen funktioniert das aber nicht zuverlässig. Wichtige Beispiele:\n\n• Jakobskreuzkraut: gelbe Korbblüten; die Giftstoffe schädigen die Leber und wirken über Wochen bis Monate zusammen. Bleibt auch im Heu giftig.\n• Herbstzeitlose: blassviolette Blüten im Herbst, Blätter im Frühjahr; sehr giftig, auch getrocknet.\n• Eibe: immergrüner Nadelbaum; schon kleine Mengen können tödlich sein – Gefahr durch Hecken und Gartenabfälle.\n• Bergahorn: Samen und Keimlinge können die atypische Weidemyopathie auslösen, vor allem im Herbst und Frühjahr.\n• Weitere: Robinie, Thuja, Buchsbaum, Oleander, Rhododendron, Fingerhut, Adlerfarn. Hahnenfuß ist frisch giftig, getrocknet im Heu unbedenklich.\n\nGartenabfälle und Rasenschnitt gehören nie auf die Weide: Sie gären schnell und enthalten oft Zierpflanzen.",
        },
        {
          heading: "Wann ist es ein Notfall?",
          text: "Bei Verdacht auf eine Vergiftung oder bei typischen Anzeichen einer Hufrehe gilt: sofort Tierarzt oder Tierärztin anrufen, nicht abwarten.\n\nWarnzeichen einer Hufrehe sind unter anderem ein klammer, vorsichtiger Gang, häufiges Gewichtsverlagern, warme Hufe, ein deutlich fühlbarer Puls an der Zehe und die typische „Sägebockstellung“ mit nach vorn gestellten Vorderbeinen.\n\nAnzeichen der atypischen Weidemyopathie sind Muskelzittern, Steifheit, Schwitzen, Schwäche, Festliegen und auffällig dunkler, kaffeebrauner Urin – oft bei Pferden, die im Herbst auf Weiden mit Bergahorn standen. Bis der Tierarzt kommt: Pferd ruhig halten, nicht bewegen, von der Weide nehmen, wenn das sicher möglich ist. Weitere Einzelheiten lernst du im Modul „Pferdegesundheit“.",
        },
      ],
      praxis: {
        title: "Der Anweideplan",
        text: "Hanna schreibt im März für jedes Pferd einen Anweideplan an die Stalltafel. Scrabble, gesund und gut im Futter, beginnt mit 15 Minuten nach dem Morgenheu und steigert alle zwei Tage um 15 Minuten. Tivoli, der im Winter zugelegt hat, startet mit 10 Minuten an der Hand, langsamer gesteigert, und bekommt später eine Fressbremse.\n\nAn einem sonnigen Morgen nach einer frostigen Nacht verschiebt Hanna die Weidezeit für Tivoli. Beim Abäppeln entdeckt Ben am Weiderand außerdem kleine Keimlinge unter einem Bergahorn vom Nachbargrundstück. Der Bereich wird ausgezäunt, und Hanna spricht mit dem Nachbarn.",
      },
      fehler: [
        { fehler: "Nach dem Winter direkt mehrere Stunden auf die Weide.", besser: "Über zwei bis vier Wochen schrittweise anweiden." },
        { fehler: "Hungrige Pferde auf die Weide lassen.", besser: "Vorher Heu füttern." },
        { fehler: "Gartenabfälle oder Rasenschnitt über den Zaun geben.", besser: "Niemals – sie gären schnell und enthalten oft Giftpflanzen." },
        { fehler: "Jakobskreuzkraut stehen lassen, weil die Pferde es meiden.", besser: "Pflanzen samt Wurzel entfernen und entsorgen – im Heu fressen Pferde es mit." },
      ],
      richtig: [
        "Plane das Anweiden für jedes Pferd einzeln; empfindliche Pferde nur nach Absprache mit der Tierärztin.",
        "Füttere vor dem Weidegang Heu und starte mit kurzen Zeiten.",
        "Achte auf das Wetter: sonnige Tage nach kalten Nächten sind riskant.",
        "Gehe Weide und Zaun regelmäßig ab und suche nach Giftpflanzen, Bergahorn-Samen und Schäden.",
        "Äpple regelmäßig ab und gönne Flächen Ruhephasen.",
        "Rufe bei Verdacht auf Hufrehe oder Vergiftung sofort den Tierarzt.",
      ],
      merke: [
        "Anweiden dauert Wochen, nicht Tage.",
        "Sonnige Tage nach kalten Nächten bedeuten oft viel Fruktan im Gras.",
        "Jakobskreuzkraut und Herbstzeitlose bleiben auch im Heu giftig.",
        "Bergahorn-Samen und -Keimlinge können die atypische Weidemyopathie auslösen.",
        "Hufrehe und Vergiftung sind Notfälle.",
      ],
      weiter: [
        { lesson: "ra-w15-l5", label: "Das Verdauungssystem verstehen" },
        { lesson: "ra-w15-l7", label: "Wie viel Futter braucht mein Pferd wirklich?" },
        { lesson: "ra-w16-l6", label: "Hufkrankheiten: Hufrehe, Strahlfäule, Abszesse" },
      ],
      pruefen: "Anweide-Zeiten; Fruktan-Mechanismus und 5-°C-Schwelle; Giftpflanzenliste (insb. Hahnenfuß getrocknet unbedenklich); Symptome atypische Weidemyopathie und Hufrehe; Sofortmaßnahmen.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l10-entscheidung",
        prompt: "Mitte April: Nachts gab es Bodenfrost, jetzt scheint die Sonne. Ein leichtfuttriges Pony mit Hufrehe-Vorgeschichte steht am Zaun. Was tust du?",
        options: [
          ok("warten", "Heute auf den Weidegang verzichten oder genau nach dem mit der Tierärztin abgesprochenen Plan handeln"),
          no("morgens", "Gleich morgens rauslassen, da ist am wenigsten Zucker im Gras", "Nach kalten Nächten bleibt der Fruktangehalt oft auch morgens hoch."),
          no("kurz", "Zwei Stunden reichen ja nicht für Hufrehe", "Bei empfindlichen Ponys kann schon eine kurze Zeit auf zuckerreichem Gras zu viel sein."),
        ],
        explain: "Richtig. Für Risikopferde zählt der individuelle Plan – und sonnige Tage nach Frost sind besonders heikel.",
      },
    ],
    quiz: [
      {
        id: "anweiden",
        prompt: "Wie wird ein gesundes Pferd nach dem Winter angeweidet?",
        options: [
          ok("schritt", "Mit kurzen Zeiten beginnen und über zwei bis vier Wochen steigern"),
          no("tag", "Am ersten Tag einen halben Tag, dann ganztags", "Das überfordert die Darmflora."),
          no("gar-nicht", "Gesunde Pferde muss man nicht anweiden", "Auch gesunde Pferde brauchen eine Umstellung."),
        ],
        explain: "Genau. So können sich die Mikroorganismen im Darm anpassen.",
      },
      {
        id: "fruktan",
        prompt: "Wann ist der Fruktangehalt im Gras oft besonders hoch?",
        options: [
          ok("frost", "An sonnigen Tagen nach kalten Nächten"),
          no("regen", "Nach warmen, regnerischen Nächten", "Dann wachsen die Gräser und verbrauchen ihre Zuckerreserven."),
          no("immer", "Immer gleich, das Wetter spielt keine Rolle", "Wetter, Tageszeit und Wachstum beeinflussen den Gehalt stark."),
        ],
        explain: "Richtig. Kälte bremst das Wachstum, die Sonne lässt die Zuckerproduktion weiterlaufen.",
      },
      {
        id: "heu-giftig",
        prompt: "Welche Pflanze bleibt auch im getrockneten Heu giftig?",
        options: [
          ok("jkk", "Jakobskreuzkraut"),
          no("hahnenfuss", "Hahnenfuß", "Hahnenfuß verliert beim Trocknen seine Giftwirkung."),
          no("klee", "Weißklee", "Weißklee ist keine typische Giftpflanze für Pferde."),
        ],
        explain: "Genau – ebenso die Herbstzeitlose.",
      },
      {
        id: "bergahorn",
        prompt: "Welche Erkrankung kann durch Bergahorn-Samen und -Keimlinge ausgelöst werden?",
        options: [
          ok("myopathie", "Die atypische Weidemyopathie"),
          no("mauke", "Mauke", "Mauke ist eine Hauterkrankung an den Fesseln."),
          no("husten", "Heuhusten", "Atemwegserkrankungen haben andere Ursachen."),
        ],
        explain: "Richtig. Sie ist ein Notfall und endet oft tödlich.",
      },
      {
        id: "garten",
        prompt: "Warum dürfen Rasenschnitt und Gartenabfälle nicht verfüttert werden?",
        options: [
          ok("gaerung", "Sie gären schnell und enthalten oft giftige Zierpflanzen"),
          no("lecker", "Weil Pferde sie nicht mögen", "Viele Pferde fressen sie gern – gerade das ist gefährlich."),
          no("verboten", "Nur weil es unordentlich aussieht", "Es geht um Kolik- und Vergiftungsgefahr."),
        ],
        explain: "Genau. Ein Haufen Rasenschnitt kann für ein Pferd lebensgefährlich sein.",
      },
    ],
  },

  /* ---------- 11. Winter ---------- */
  {
    slug: "winterhaltung-eindecken",
    title: "Winterhaltung, Winterfell, Scheren und Eindecken",
    speaker: "mila",
    intro:
      "Draußen sind es zwei Grad, und du frierst in deiner Jacke. Dein Pferd steht mit dickem Winterfell auf dem Paddock. Braucht es jetzt eine Decke? Viele Menschen übertragen ihr eigenes Kälteempfinden auf das Pferd – und liegen damit oft daneben.",
    illustration: item("decke"),
    terms: [
      { term: "Piloerektion", meaning: "Aufstellen der Haare. Dadurch entsteht ein isolierendes Luftpolster im Fell." },
      { term: "Thermoneutrale Zone", meaning: "Temperaturbereich, in dem ein Tier ohne zusätzlichen Energieaufwand seine Körpertemperatur hält." },
      { term: "Teilschur", meaning: "Nur an den Stellen geschorenes Fell, an denen das Pferd stark schwitzt, z. B. Hals, Brust und Bauch." },
    ],
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Wie Pferde sich warm halten",
          text: "Pferde haben eine wirksame Ausstattung gegen Kälte. Das Winterfell wächst ab dem Spätsommer, gesteuert vor allem durch die kürzer werdenden Tage. Bei Kälte stellt das Pferd die Haare auf und vergrößert so das isolierende Luftpolster. Die Fettschicht unter der Haut wärmt zusätzlich, und die Durchblutung von Haut und Beinen wird gedrosselt.\n\nDie wichtigste „Heizung“ sitzt im Bauch: Bei der Vergärung von Raufutter im Dickdarm entsteht Wärme. Mehr Heu bei Kälte ist deshalb die natürlichste Art, ein Pferd warm zu halten.\n\nGesunde, an das Wetter gewöhnte Pferde mit gutem Winterfell kommen mit Temperaturen deutlich unter dem Gefrierpunkt zurecht. Ihre Wohlfühltemperatur liegt viel niedriger als unsere.",
        },
        {
          heading: "Was Pferde wirklich frieren lässt",
          text: "Nicht die Temperatur allein entscheidet, sondern das Zusammenspiel mehrerer Faktoren:\n\n• Nässe: Durchnässtes Fell verliert seine Isolation.\n• Wind: Er drückt das Fell flach und trägt Wärme weg. Nässe plus Wind ist die kritischste Kombination.\n• Fehlender Witterungsschutz: kein Unterstand, keine Hecke, kein trockener Liegeplatz.\n• Körperzustand: magere, alte oder kranke Pferde frieren schneller.\n• Fell: geschorene Pferde, Pferde mit dünnem Fell oder Pferde, die das Winterfell (z. B. wegen ständigen Eindeckens) nicht vollständig ausgebildet haben.\n• Gewöhnung: Ein Pferd, das aus einem warmen Stall plötzlich in einen Offenstall kommt, ist noch nicht angepasst.\n\nAnzeichen, dass ein Pferd friert, sind Zittern, ein eingeklemmter Schweif, ein aufgekrümmter Rücken, das Abwenden der Hinterhand gegen den Wind und Teilnahmslosigkeit. Kalte Ohren allein sind kein zuverlässiges Zeichen.",
        },
        {
          heading: "Scheren: warum, wie viel, und was dann?",
          text: "Pferde, die im Winter regelmäßig so gearbeitet werden, dass sie stark schwitzen, trocknen mit dickem Fell nur sehr langsam. Ein nasses Pferd kühlt danach aus. Scheren kann dann sinnvoll sein.\n\nEs gibt verschiedene Schurarten – von einer kleinen Teilschur an Hals und Brust über Decken- und Jagdschur bis zur Vollschur. Die Regel lautet: so wenig wie möglich, so viel wie nötig. Wo das Pferd schwitzt, wird geschoren; wo es Schutz braucht, bleibt das Fell.\n\nWer schert, übernimmt Verantwortung: Ein geschorenes Pferd hat einen Teil seines Kälteschutzes verloren und braucht je nach Schur und Wetter eine passende Decke – im Stall, auf dem Paddock und nach der Arbeit eine Abschwitzdecke, bis es trocken ist.",
        },
        {
          heading: "Eindecken: individuell entscheiden",
          text: "Ob und wie dick ein Pferd eingedeckt wird, lässt sich nicht aus einer Temperaturtabelle ablesen. Entscheidend sind:\n\n• Ist das Pferd geschoren? Wie viel?\n• Wie dicht ist sein Winterfell?\n• Alter, Figur und Gesundheit\n• Nässe, Wind und Witterungsschutz\n• Bewegung: Steht es viel, oder läuft es im Offenstall herum?\n• Gewöhnung an das Klima\n\nEine Decke drückt das Fell flach. Bei einem nicht geschorenen, gesunden Pferd mit gutem Fell kann sie die eigene Wärmeregulation stören und zum Schwitzen unter der Decke führen. Ein feuchtes Pferd unter einer Decke kühlt dann eher aus.\n\nSo prüfst du: Schiebe die flache Hand unter die Decke an Schulter und Brust. Warm und trocken passt. Feucht oder heiß heißt zu warm. Kühl, mit Zittern, heißt zu kalt. Prüfe auch zu verschiedenen Tageszeiten – mittags kann es in der Sonne viel wärmer sein als morgens.",
        },
        {
          heading: "Passform und Alltag mit Decke",
          text: "Eine Decke muss passen: frei am Widerrist, ohne Druck an Schulter und Brust, so lang, dass sie die Kruppe bedeckt, und mit Beingurten oder Schweifriemen so gesichert, dass sie nicht verrutscht. Typische Scheuerstellen liegen an Schulter, Widerrist und Brust.\n\nEingedeckte Pferde werden täglich kontrolliert: Decke abnehmen, Haut und Fell prüfen, Decke richten. Nasse Decken werden getauscht. Und: Viele Pferde brauchen im Winter mehrere Decken für unterschiedliche Wetterlagen statt einer sehr dicken.\n\nZur Winterhaltung gehören außerdem mehr Raufutter bei Kälte, frostfreies Wasser (Lektion 9), trittsichere, nicht vereiste Wege und trockene Liegeplätze. Matsch begünstigt Hautprobleme wie Mauke an den Fesseln (Modul „Pferdegesundheit“).",
        },
      ],
      praxis: {
        title: "Drei Pferde, drei Entscheidungen",
        text: "Es ist ein nasskalter Januartag mit Wind. Hanna entscheidet für jedes Pferd einzeln:\n\nScrabble ist mit einer Jagdschur geschoren und wird regelmäßig gearbeitet. Er bekommt eine wasserdichte, mittelstarke Decke. Tonga hat dichtes Winterfell und nutzt den Unterstand im Offenstall – sie bleibt ohne Decke, Hanna kontrolliert aber nachmittags, ob ihr Fell unter dem Bauch trocken ist. Ein 26-jähriger Einstellerwallach mit wenig Fett und dünnem Fell bekommt eine leichte Regendecke und zusätzlich mehr Heu.\n\nAm nächsten Tag ist es trocken, sonnig und windstill. Scrabble behält eine leichtere Decke, der Senior bekommt seine abgenommen. Kein Pferd hat dieselbe Antwort – und an keinem Tag dieselbe.",
      },
      fehler: [
        { fehler: "Eindecken nach eigenem Kälteempfinden.", besser: "Pferd, Fell, Schur, Nässe, Wind und Schutz beurteilen." },
        { fehler: "Eine Temperaturtabelle für alle Pferde übernehmen.", besser: "Jedes Pferd einzeln einschätzen und unter der Decke kontrollieren." },
        { fehler: "Ein verschwitztes Pferd direkt mit der Stalldecke eindecken.", besser: "Erst mit Abschwitzdecke trocknen lassen." },
        { fehler: "Ein geschorenes Pferd ohne Decke in den Regen stellen.", besser: "Wer schert, muss für Ersatz-Kälteschutz sorgen." },
      ],
      richtig: [
        "Beurteile das Pferd: Fell, Schur, Figur, Alter, Gesundheit.",
        "Beurteile das Wetter: Nässe, Wind, Temperaturverlauf über den Tag.",
        "Beurteile die Haltung: Unterstand, trockener Liegeplatz, Bewegung.",
        "Entscheide und kontrolliere mit der flachen Hand unter der Decke an Schulter und Brust.",
        "Passe die Entscheidung täglich an – im Zweifel lieber leichter eindecken und häufiger prüfen.",
        "Gib bei Kälte mehr Raufutter und sorge für frostfreies Wasser.",
      ],
      merke: [
        "Gesunde, angepasste Pferde mit Winterfell vertragen Kälte gut.",
        "Nässe plus Wind ist kritischer als niedrige Temperatur allein.",
        "Es gibt keine Decken-Temperaturtabelle, die für alle Pferde passt.",
        "Wer schert, muss eindecken.",
        "Raufutter ist die beste Heizung von innen.",
      ],
      weiter: [
        { lesson: "ra-w15-l9", label: "Wasserbedarf und Salzversorgung" },
        { lesson: "ra-w15-l3", label: "Der optimale Pferdestall" },
        { lesson: "ra-w10-l5", label: "Nach dem Reiten" },
      ],
      pruefen: "Aussagen zur Kältetoleranz (bewusst ohne Zahlen); Zeichen von Frieren; Schurarten; Kontrolle unter der Decke.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l11-entscheidung",
        prompt: "Ein gesundes, nicht geschorenes Pferd mit dichtem Winterfell steht im Offenstall mit Unterstand. Es ist trocken, windstill, minus 3 Grad. Was ist meist richtig?",
        options: [
          ok("ohne", "Keine Decke – aber Raufutter und Wasser sichern und das Pferd beobachten"),
          no("dick", "Eine dicke Winterdecke, es ist ja unter null", "Die Temperatur allein entscheidet nicht. Dieses Pferd ist gut geschützt und kann unter einer dicken Decke schwitzen."),
          no("tabelle", "Die Decke nach der Temperaturtabelle aus dem Internet wählen", "Tabellen ignorieren Fell, Schur, Wind, Nässe und das einzelne Pferd."),
        ],
        explain: "Richtig. Bei trockener Kälte und gutem Schutz braucht ein solches Pferd meist keine Decke.",
      },
    ],
    quiz: [
      {
        id: "heizung",
        prompt: "Was hält ein Pferd im Winter von innen warm?",
        options: [
          ok("raufutter", "Die Vergärung von Raufutter im Dickdarm"),
          no("kraftfutter", "Vor allem Kraftfutter", "Raufutter liefert über die Vergärung deutlich mehr Wärme."),
          no("wasser", "Warmes Wasser allein", "Temperiertes Wasser hilft beim Trinken, die Hauptwärme kommt aus der Verdauung."),
        ],
        explain: "Genau. Bei Kälte ist mehr Heu sinnvoll.",
      },
      {
        id: "kritisch",
        prompt: "Welche Wetterlage ist für Pferde ohne Decke am kritischsten?",
        options: [
          ok("nass-wind", "Nässe zusammen mit Wind"),
          no("trocken-kalt", "Trockene, windstille Kälte", "Damit kommen gesunde Pferde mit Winterfell meist gut zurecht."),
          no("sonne", "Sonniger Wintertag", "Sonne wärmt eher – Vorsicht eher bei eingedeckten Pferden."),
        ],
        explain: "Richtig. Nasses, plattgedrücktes Fell isoliert kaum noch.",
      },
      {
        id: "pruefen",
        prompt: "Wie prüfst du, ob ein eingedecktes Pferd zu warm oder zu kalt hat?",
        options: [
          ok("hand", "Mit der flachen Hand unter der Decke an Schulter und Brust fühlen"),
          no("ohren", "An den Ohren fühlen", "Kalte Ohren allein sind kein zuverlässiges Zeichen."),
          no("thermometer", "Auf das Stallthermometer schauen", "Das Thermometer sagt nichts darüber, wie es dem einzelnen Pferd unter der Decke geht."),
        ],
        explain: "Genau. Warm und trocken passt, feucht oder kalt nicht.",
      },
      {
        id: "schur",
        prompt: "Warum werden manche Pferde im Winter geschoren?",
        options: [
          ok("schwitzen", "Weil sie bei regelmäßiger Arbeit stark schwitzen und mit dickem Fell schlecht trocknen"),
          no("schoen", "Weil es schöner aussieht", "Optik ist kein Grund, einem Pferd seinen Kälteschutz zu nehmen."),
          no("alle", "Weil alle Reitpferde geschoren werden müssen", "Viele Pferde brauchen keine Schur."),
        ],
        explain: "Richtig – und dann braucht das Pferd passenden Ersatz-Kälteschutz.",
      },
    ],
  },

  /* ---------- 12. Sommer ---------- */
  {
    slug: "sommer-hitze-insekten",
    title: "Sommerhaltung, Hitze und Insektenschutz",
    speaker: "ben",
    intro:
      "Viele Menschen machen sich im Winter Sorgen, dass ihr Pferd friert. Dabei kommen Pferde mit Kälte meist besser zurecht als mit Hitze. Warum ist ein schwüler Sommertag für ein Pferd oft anstrengender als ein frostiger Wintermorgen?",
    illustration: item("eimer"),
    terms: [
      { term: "Hitzestress", meaning: "Der Körper kann die entstehende Wärme nicht mehr ausreichend abgeben." },
      { term: "Anhidrose", meaning: "Unfähigkeit oder stark verminderte Fähigkeit zu schwitzen – ein seltenes, aber ernstes Problem bei Hitze." },
      { term: "Sommerekzem", meaning: "Juckende Allergie, meist gegen den Speichel von Gnitzen (winzige Stechmücken der Gattung Culicoides)." },
    ],
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Warum Hitze für Pferde anstrengend ist",
          text: "Ein Pferd ist groß und schwer, und seine arbeitenden Muskeln und die Verdauung erzeugen viel Wärme. Die wichtigste Möglichkeit, diese Wärme loszuwerden, ist Schwitzen: Wenn Schweiß verdunstet, kühlt er die Haut. Bei hoher Luftfeuchtigkeit verdunstet er schlechter – deshalb ist schwüle Hitze besonders belastend. Zusätzlich atmet das Pferd schneller, um Wärme über die Lunge abzugeben.\n\nBesonders gefährdet sind übergewichtige, untrainierte, alte und kranke Pferde, Pferde mit dunklem Fell in praller Sonne, Pferde mit noch dichtem Fell im Frühsommer sowie Pferde, die nicht oder kaum schwitzen.",
        },
        {
          heading: "Haltung im Sommer",
          text: "Pferde brauchen im Sommer echten Schatten. Bäume und gut belüftete Unterstände sind ideal; ein dunkler, stickiger Stall ist es nicht. Wasser muss jederzeit in ausreichender Menge da sein – bei Hitze kann der Bedarf auf ein Vielfaches steigen (Lektion 9). Salz und gegebenenfalls Elektrolyte gleichen Schweißverluste aus.\n\nViele Ställe stellen im Hochsommer um: Weidegang nachts oder in den frühen Morgenstunden, tagsüber im schattigen, luftigen Stall oder Unterstand. Das schützt auch vor Bremsen, die vor allem an warmen, sonnigen Tagen aktiv sind.\n\nPferde mit rosa Haut an Nase oder Blesse können einen Sonnenbrand bekommen. Hier helfen Schatten, Fliegenmasken mit UV-Schutz und – nach Rücksprache – geeignete Sonnenschutzmittel.",
        },
        {
          heading: "Reiten bei Hitze",
          text: "An heißen Tagen wird in die kühlen Morgen- oder Abendstunden ausgewichen. Intensität und Dauer werden reduziert, mit längeren Schrittphasen und mehr Pausen im Schatten. Ein Pferd, das noch nicht an die Hitze gewöhnt ist, braucht dafür einige Tage bis Wochen.\n\nNach der Arbeit wird gekühlt: Kaltes Wasser großzügig und wiederholt über den ganzen Körper laufen lassen, besonders über Hals, Brust und Beine, und das Pferd dazwischen im Schatten führen. Ob man das Wasser abzieht oder ablaufen lässt, wird in Fachkreisen unterschiedlich gesehen – entscheidend ist, so lange wiederholt zu kühlen, bis Atmung und Puls deutlich ruhiger sind.\n\nDanach Wasser zum Trinken anbieten. Ein erhitztes Pferd darf trinken; die alte Regel „erst abkühlen lassen, dann trinken“ gilt in dieser strengen Form als überholt.",
        },
        {
          heading: "Hitzschlag: ein Notfall",
          text: "Warnzeichen für einen Hitzschlag oder schweren Hitzestress sind: schnelle, flache Atmung, die auch in Ruhe nicht zurückgeht; geblähte Nüstern; ein anhaltend hoher Puls; Körpertemperatur deutlich über 39 °C; sehr starkes oder auffällig fehlendes Schwitzen; Schwäche, Taumeln, Teilnahmslosigkeit; Desinteresse an Futter und Wasser.\n\nDann gilt: Arbeit sofort beenden, in den Schatten bringen, mit viel kaltem Wasser kühlen, Wasser anbieten und Tierarzt oder Tierärztin rufen. Ein liegendes Pferd nicht zum Aufstehen zwingen.\n\nDie Normalwerte von Puls, Atmung und Temperatur und wie du sie richtig misst, lernst du im Modul „Pferdegesundheit“.",
        },
        {
          heading: "Insekten: wer sticht wann?",
          text: "• Bremsen sind groß, stechen schmerzhaft und fliegen vor allem an sonnig-warmen Tagen.\n• Stallfliegen und Augenfliegen sammeln sich um Augen und Wunden und können Bindehautentzündungen fördern.\n• Kriebelmücken stechen gern an Ohren, Bauch und Euter, oft in Gewässernähe.\n• Gnitzen sind winzig, sehr aktiv in der Dämmerung und Auslöser des Sommerekzems.\n\nSchutz bieten: Weidezeiten an die Aktivität der Insekten anpassen, Fliegendecken und -masken (bei Ekzem spezielle Ekzemerdecken), ein dunkler, luftiger Unterstand, regelmäßiges Abäppeln und das Entfernen von Mist in Stallnähe, Ventilatoren im Stall und Insektenschutzmittel. Diese Mittel sind teils als Biozide, teils als Tierarzneimittel zugelassen; die Verträglichkeit wird zuerst an einer kleinen Stelle getestet. Bei Sommerekzem oder Hautproblemen gehört die Behandlung zur Tierärztin.",
        },
      ],
      praxis: {
        title: "Die Hitzewelle",
        text: "Für die kommende Woche sind über 30 °C angekündigt. Hanna stellt den Stallplan um: Die Pferde gehen von abends bis zum Morgen auf die Weide, tagsüber stehen sie im luftigen Offenstall mit Schatten und zwei zusätzlichen Wasserkübeln. Reitstunden finden nur bis 10 Uhr statt, nur im Schritt und leichten Trab und mit vielen Pausen.\n\nNach dem Unterricht kühlen Lea und Ben Tivoli mit dem Schlauch, führen ihn im Schatten und kühlen erneut, bis er ruhig atmet. Weil Tivoli an der Blesse rosa Haut hat, bekommt er auf der Weide eine Fliegenmaske mit Nasenschutz.",
      },
      fehler: [
        { fehler: "Zur Mittagszeit in der prallen Sonne trainieren.", besser: "Auf kühle Morgen- oder Abendstunden ausweichen und kürzer reiten." },
        { fehler: "Ein erhitztes Pferd nur kurz an den Beinen abspritzen.", besser: "Großzügig und wiederholt am ganzen Körper kühlen, bis Atmung und Puls ruhiger sind." },
        { fehler: "Einem erhitzten Pferd das Trinken verbieten.", besser: "Wasser anbieten – Trinken hilft beim Abkühlen." },
        { fehler: "Pferde bei Gnitzenflug in der Dämmerung auf der Weide lassen, obwohl sie Ekzem haben.", besser: "Weidezeiten anpassen, Ekzemerdecke nutzen, Behandlung tierärztlich begleiten." },
      ],
      richtig: [
        "Sorge für Schatten, Luftzug und jederzeit reichlich Wasser.",
        "Plane Weidezeiten nach Hitze und Insektenaktivität.",
        "Reite an heißen Tagen früh oder spät, kürzer und mit mehr Pausen.",
        "Kühle nach der Arbeit großzügig und wiederholt, bis das Pferd ruhig atmet.",
        "Kenne die Warnzeichen von Hitzestress und rufe im Zweifel den Tierarzt.",
        "Schütze empfindliche Haut vor Sonne und Insekten.",
      ],
      merke: [
        "Pferde vertragen Hitze schlechter als Kälte – Schwüle ist besonders belastend.",
        "Schatten, Wasser und Salz sind im Sommer Pflicht.",
        "Großzügig und wiederholt kühlen, Wasser zum Trinken anbieten.",
        "Hitzschlag ist ein Notfall: Arbeit stoppen, kühlen, Tierarzt rufen.",
      ],
      weiter: [
        { lesson: "ra-w15-l9", label: "Wasserbedarf und Salzversorgung" },
        { lesson: "ra-w10-l5", label: "Nach dem Reiten" },
        { lesson: "ra-w16-l9", label: "Hautprobleme, Mauke, Pilz und Sommerekzem" },
      ],
      pruefen: "Kühlempfehlung (Abschaben vs. Ablaufen lassen); Aussage „Trinken nach Belastung“; Temperatur-Warnschwelle über 39 °C; Insektenarten und Aktivitätszeiten; Zulassungsstatus von Insektenschutzmitteln.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l12-entscheidung",
        prompt: "Nach einer Reitstunde an einem schwülen Tag atmet das Pferd auch nach zehn Minuten Schritt noch schnell und flach und wirkt matt. Was tust du?",
        options: [
          ok("kuehlen", "In den Schatten bringen, großzügig mit kaltem Wasser kühlen, Wasser anbieten und den Tierarzt anrufen"),
          no("box", "In die Box stellen und eine Stunde in Ruhe lassen", "Ohne Kühlung kann sich ein Hitzestress verschlimmern. Hier muss aktiv gekühlt und der Tierarzt verständigt werden."),
          no("decke", "Eine Abschwitzdecke auflegen, damit es sich nicht erkältet", "Eine Decke hält die Wärme fest – das Gegenteil von dem, was das Pferd braucht."),
        ],
        explain: "Richtig. Atmung, die nicht zur Ruhe kommt, und Mattigkeit sind Warnzeichen.",
      },
    ],
    quiz: [
      {
        id: "schwuel",
        prompt: "Warum ist schwüle Hitze für Pferde besonders belastend?",
        options: [
          ok("verdunstung", "Weil Schweiß bei hoher Luftfeuchtigkeit schlechter verdunstet und kaum noch kühlt"),
          no("trinken", "Weil Pferde bei Schwüle nicht trinken", "Das ist nicht der Grund – die Kühlung durch Schweiß funktioniert schlechter."),
          no("fell", "Weil das Fell dann nass wird", "Entscheidend ist, dass der Schweiß nicht verdunsten kann."),
        ],
        explain: "Genau. Ohne Verdunstung keine Kühlung.",
      },
      {
        id: "trinken",
        prompt: "Darf ein erhitztes Pferd nach der Arbeit trinken?",
        options: [
          ok("ja", "Ja, Wasser anbieten hilft beim Abkühlen"),
          no("nein", "Nein, erst nach einer Stunde", "Diese strenge Regel gilt als überholt. Trinken ist wichtig."),
          no("eis", "Nur Eiswasser in großen Mengen", "Normales, kühles Wasser zum freien Trinken reicht."),
        ],
        explain: "Richtig. Kühlen und trinken lassen gehören zusammen.",
      },
      {
        id: "gnitzen",
        prompt: "Welche Insekten lösen meist das Sommerekzem aus?",
        options: [
          ok("gnitzen", "Gnitzen, besonders in der Dämmerung"),
          no("bremsen", "Bremsen am Mittag", "Bremsen stechen schmerzhaft, lösen aber meist kein Ekzem aus."),
          no("bienen", "Bienen", "Bienen spielen beim Sommerekzem keine Rolle."),
        ],
        explain: "Genau. Deshalb sind Weidezeiten und Ekzemerdecken so wichtig.",
      },
      {
        id: "notfall",
        prompt: "Welches Zeichen spricht für einen Hitzschlag?",
        options: [
          ok("atmung", "Schnelle, flache Atmung, die in Ruhe nicht zurückgeht, und Taumeln"),
          no("schweiss", "Leichtes Schwitzen nach der Arbeit, das schnell abtrocknet", "Das ist normal."),
          no("hunger", "Großer Appetit nach dem Reiten", "Appetit ist eher ein gutes Zeichen."),
        ],
        explain: "Richtig. Dann sofort kühlen und den Tierarzt rufen.",
      },
    ],
  },

  /* ---------- 13. Stallmanagement ---------- */
  {
    slug: "stallmanagement",
    title: "Stallmanagement und tägliche Versorgung",
    speaker: "lea",
    intro:
      "Ein Pferd frisst morgens sein Heu nicht ganz auf. Niemandem fällt es auf, weil jeder nur „seinen“ Teil der Stallarbeit erledigt. Am Abend hat es eine Kolik. Gute Stallorganisation entscheidet oft darüber, ob Probleme früh bemerkt werden.",
    illustration: item("schubkarre"),
    terms: [
      { term: "Equidenpass", meaning: "Pflichtdokument jedes Pferdes mit Identität, Behandlungen und Angaben zur Lebensmittelgewinnung. Er gehört zum Pferd." },
      { term: "Matratzenmethode", meaning: "Einstreu wird nur teilweise erneuert, die unteren Schichten bleiben liegen – funktioniert nur bei sehr sorgfältigem Management." },
      { term: "Einstellervertrag", meaning: "Vertrag zwischen Pferdebesitzer und Stall über Leistungen wie Futter, Weidegang, Misten und Pflichten." },
    ],
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Der Tagesablauf im Stall",
          text: "Ein gut geführter Stall hat feste Kontrollpunkte:\n\n• Morgens: jedes Pferd kurz anschauen, Wasser prüfen, Raufutter vorlegen, Kraftfutter und Mineralfutter nach Plan, Reste vom Vortag kontrollieren, misten.\n• Tagsüber: Weide oder Auslauf, Zäune und Tränken kontrollieren, Pferde beobachten, weiteres Raufutter.\n• Abends: zweiter Rundgang, Futter, Wasser, Nachtheu, Tore und Türen sichern.\n\nWer arbeitet, trägt seine Beobachtungen ein – auf einer Stalltafel, in einem Stallbuch oder einer gemeinsamen Gruppe. So geht keine Information verloren, wenn mehrere Menschen sich die Versorgung teilen.",
        },
        {
          heading: "Der tägliche Blick auf jedes Pferd",
          text: "Die wichtigste Aufgabe der täglichen Versorgung ist, Veränderungen zu bemerken. Dazu gehört ein kurzer Check bei jedem Pferd:\n\n• Frisst es wie immer? Liegen Futterreste?\n• Hat es getrunken?\n• Wie sehen Menge und Beschaffenheit des Kots aus?\n• Ist das Verhalten normal – aufmerksam, interessiert, entspannt?\n• Gibt es Verletzungen, Schwellungen, Lahmheit?\n• Ausfluss aus Augen oder Nase, Husten?\n\nNur wer weiß, wie ein Pferd normalerweise ist, erkennt Abweichungen. Der ausführliche Gesundheitscheck folgt im Modul „Pferdegesundheit“.",
        },
        {
          heading: "Misten und Einstreu",
          text: "Gängige Einstreu-Arten:\n\n• Stroh: gibt Beschäftigung, weil Pferde es fressen, und ist weich. Es muss sauber und staubarm sein; bei Pferden mit Atemwegsproblemen oft ungeeignet.\n• Späne: staubarm (wenn entstaubt), saugfähig, nicht fressbar.\n• Pellets aus Stroh oder Holz: sehr saugfähig, wenig Volumen.\n\nNasse Stellen und Kot werden täglich entfernt. Bei der Matratzenmethode bleiben untere Schichten länger liegen; ohne sehr sorgfältige Pflege steigen dann Ammoniak und Keimbelastung. Regelmäßig wird die Box komplett ausgemistet und der Boden getrocknet.",
        },
        {
          heading: "Futterlager, Dokumente und Absprachen",
          text: "Kraftfutter wird verschlossen gelagert – ein Pferd, das in die Futterkammer gelangt, kann eine lebensbedrohliche Kolik oder Hufrehe bekommen. Heu und Stroh lagern trocken, belüftet und möglichst getrennt vom Stall.\n\nJedes Pferd braucht einen Equidenpass. Er gehört zum Pferd, muss am Standort verfügbar sein und bei Transporten mitgeführt werden. Darin werden unter anderem bestimmte Behandlungen eingetragen.\n\nIm Pensionsstall regelt der Einstellervertrag, was der Stall leistet und was der Besitzer übernimmt: Futterart und -menge, Weidegang, Eindecken, wer im Notfall entscheiden darf und wer den Tierarzt bezahlt. Klare, schriftliche Absprachen verhindern Missverständnisse – besonders dann, wenn es schnell gehen muss.",
        },
        {
          heading: "Notfallplan und Sicherheit",
          text: "Jeder Stall braucht einen gut sichtbaren Notfallplan: Telefonnummern von Tierarzt, Hufschmied und Besitzern, die genaue Adresse für den Rettungsdienst, die Lage von Feuerlöschern, Erste-Hilfe-Material für Mensch und Pferd und den Hinweis, wer einen Pferdeanhänger fahren kann.\n\nZur Sicherheit im Alltag gehören: Pferde nie unbeaufsichtigt in der Stallgasse stehen lassen, Werkzeug wegräumen, Türen und Tore schließen, festes Schuhwerk tragen und bei der Arbeit an Pferden ruhig und aufmerksam bleiben. Kinder und Jugendliche arbeiten im Stall nur mit klaren Aufgaben und einer ansprechbaren erwachsenen Person.",
        },
      ],
      praxis: {
        title: "Die Stalltafel",
        text: "Auf dem Hof teilen sich Hanna, Wilhelm und Mats die Stallarbeit. Früher wusste der Abenddienst oft nicht, was morgens passiert war. Seit einem halben Jahr hängt neben der Futterkammer eine Stalltafel: für jedes Pferd eine Zeile mit „Heu aufgefressen?“, „Kot normal?“, „Besonderheiten“.\n\nAn einem Dienstag schreibt Mats morgens: „Scrabble: Heu halb liegen gelassen, wenig Kot.“ Wilhelm liest das mittags, schaut genauer hin, bemerkt, dass Scrabble sich öfter nach dem Bauch umschaut, und ruft die Tierärztin. Eine beginnende Verstopfungskolik wird früh behandelt.",
      },
      fehler: [
        { fehler: "Futter vorlegen, ohne nach den Resten vom Vortag zu schauen.", besser: "Futterreste sind eine wichtige Information – notieren und weitergeben." },
        { fehler: "Beobachtungen nur mündlich weitergeben.", besser: "Stalltafel, Stallbuch oder gemeinsame Notizen nutzen." },
        { fehler: "Die Futterkammer offen lassen, „nur kurz“.", besser: "Immer schließen – auch für zwei Minuten." },
        { fehler: "Kein Notfallplan, weil „ja jeder den Tierarzt kennt“.", besser: "Nummern, Adresse und Abläufe gut sichtbar aushängen." },
      ],
      richtig: [
        "Lege einen festen Ablauf für Morgen- und Abendrunde fest.",
        "Kontrolliere bei jedem Pferd Futterreste, Wasser, Kot, Verhalten und Verletzungen.",
        "Notiere Auffälligkeiten schriftlich, sodass alle sie sehen.",
        "Miste nasse Stellen täglich aus und reinige die Box regelmäßig gründlich.",
        "Halte Futterlager verschlossen und Stallgasse frei.",
        "Hänge einen vollständigen Notfallplan aus und kläre Zuständigkeiten schriftlich.",
      ],
      merke: [
        "Gute Versorgung heißt vor allem: Veränderungen früh bemerken.",
        "Futterreste, Kot und Wasseraufnahme sind tägliche Gesundheitsinformationen.",
        "Was nicht aufgeschrieben wird, geht verloren.",
        "Kraftfutter immer verschlossen lagern.",
        "Jeder Stall braucht einen sichtbaren Notfallplan.",
      ],
      weiter: [
        { lesson: "ra-w15-l3", label: "Der optimale Pferdestall" },
        { lesson: "ra-w15-l14", label: "Gute Pferdehaltung erkennen und beurteilen" },
        { lesson: "ra-w10-l1", label: "Putzen Schritt für Schritt" },
        { lesson: "ra-w16-l3", label: "Der tägliche Gesundheitscheck" },
      ],
      pruefen: "Angaben zum Equidenpass (Mitführ- und Aufbewahrungspflicht); Einstreu-Aussagen.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l13-entscheidung",
        prompt: "Beim Morgendienst siehst du, dass ein Pferd die Hälfte seines Nachtheus liegen gelassen hat und kaum Kot in der Box ist. Was tust du?",
        options: [
          ok("melden", "Genauer hinschauen, die Beobachtung notieren und sofort an die verantwortliche Person weitergeben"),
          no("ignorieren", "Neues Heu dazulegen und weitermachen", "Futterreste und wenig Kot können frühe Zeichen einer Kolik sein."),
          no("abends", "Am Abend dem Besitzer davon erzählen", "Bis zum Abend kann wertvolle Zeit vergehen."),
        ],
        explain: "Richtig. Früh erkannte Probleme lassen sich oft gut behandeln.",
      },
    ],
    quiz: [
      {
        id: "reste",
        prompt: "Warum sind Futterreste eine wichtige Information?",
        options: [
          ok("gesundheit", "Weil verminderter Appetit ein frühes Krankheitszeichen sein kann"),
          no("geld", "Weil man sonst Futter verschwendet", "Wichtiger ist: Sie können auf ein Gesundheitsproblem hinweisen."),
          no("egal", "Sie sind unwichtig", "Futterreste gehören zu den wichtigsten Alltagsbeobachtungen."),
        ],
        explain: "Genau. Appetit, Kot und Wasseraufnahme sind tägliche Gesundheitsdaten.",
      },
      {
        id: "pass",
        prompt: "Was gilt für den Equidenpass?",
        options: [
          ok("pferd", "Er gehört zum Pferd, muss am Standort verfügbar sein und bei Transporten mit"),
          no("zuhause", "Er bleibt beim Besitzer zu Hause im Schrank", "Er muss beim Pferd verfügbar sein."),
          no("turnier", "Er ist nur für Turnierpferde nötig", "Jedes Pferd braucht einen Equidenpass."),
        ],
        explain: "Richtig. Darin stehen auch wichtige Behandlungsangaben.",
      },
      {
        id: "matratze",
        prompt: "Was ist das Risiko der Matratzenmethode?",
        options: [
          ok("ammoniak", "Ohne sehr sorgfältige Pflege steigen Ammoniak und Keimbelastung"),
          no("teuer", "Sie ist viel teurer als tägliches Komplettmisten", "Das Hauptrisiko betrifft die Stallluft und Hygiene."),
          no("rutschig", "Die Box wird zu hart", "Das Problem ist die Belastung durch Urin und Keime."),
        ],
        explain: "Genau. Nasse Stellen müssen trotzdem täglich raus.",
      },
      {
        id: "notfall",
        prompt: "Was gehört in einen Notfallplan im Stall?",
        options: [
          ok("nummern", "Telefonnummern, die genaue Adresse, Feuerlöscher und Erste-Hilfe-Material"),
          no("futter", "Nur der Futterplan", "Der Futterplan ist wichtig, ersetzt aber keinen Notfallplan."),
          no("nichts", "Nichts, im Notfall ruft man einfach 112", "Für Pferde braucht man den Tierarzt, für die Rettung die genaue Adresse."),
        ],
        explain: "Richtig. Im Notfall zählt jede Minute.",
      },
    ],
  },

  /* ---------- 14. Gute Haltung beurteilen ---------- */
  {
    slug: "gute-haltung-beurteilen",
    title: "Gute Pferdehaltung erkennen und beurteilen",
    speaker: "mila",
    intro:
      "Ein Stall mit gepflasterten Wegen, Blumenkübeln und frisch gestrichenen Boxen wirkt auf den ersten Blick wunderbar. Ein anderer ist schlicht, etwas unordentlich – aber die Pferde stehen entspannt in der Gruppe auf großen Paddocks. Welcher ist besser? Gute Haltung erkennst du nicht an der Optik, sondern am Pferd.",
    illustration: item("lupe"),
    terms: [
      { term: "Ressourcenbezogene Indikatoren", meaning: "Merkmale der Haltung, z. B. Platz, Futter, Wasser, Liegefläche." },
      { term: "Tierbezogene Indikatoren", meaning: "Merkmale am Pferd selbst, z. B. Figur, Verletzungen, Verhalten." },
      { term: "Veterinäramt", meaning: "Zuständige Behörde für Tierschutz; sie kann Haltungen prüfen und Auflagen erteilen." },
    ],
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Zwei Blickwinkel",
          text: "Fachleute beurteilen Tierhaltungen heute aus zwei Richtungen. Die erste fragt nach den Ressourcen: Wie viel Platz, Futter, Wasser, Bewegung und Kontakt bekommt das Pferd? Die zweite schaut auf das Pferd selbst: Wie sieht es aus, wie verhält es sich, ist es gesund? Bewertungsprotokolle aus der Forschung, etwa das europäische AWIN-Protokoll für Pferde, verbinden beide Blickwinkel.\n\nDer Grund: Eine Haltung kann auf dem Papier alle Mindestmaße erfüllen und trotzdem für ein bestimmtes Pferd nicht passen. Umgekehrt kann eine einfache Anlage sehr pferdegerecht sein. Am Ende zählt, wie es dem Pferd geht.",
        },
        {
          heading: "Die Haltung prüfen",
          text: "Diese Fragen helfen dir, einen Stall zu beurteilen:\n\n• Bewegung: Wie viele Stunden täglich bewegen sich die Pferde frei – auch im Winter und bei Regen?\n• Sozialkontakt: Leben sie in Gruppen oder haben sie direkten Kontakt zu Nachbarn?\n• Raufutter: Wie viel, wie oft, wie lang ist die längste Pause? Wie riecht und sieht das Heu aus?\n• Wasser: Jederzeit verfügbar, sauber, im Winter frostfrei?\n• Liegeplatz: Trocken, sauber, groß genug, dass alle gleichzeitig liegen können?\n• Luft und Licht: Riecht es stechend? Gibt es Fenster und Frischluft?\n• Sicherheit: Zäune, Böden, Stallgasse, Brandschutz.\n• Management: Wer kontrolliert die Pferde täglich? Gibt es einen Notfallplan? Wie werden Probleme kommuniziert?",
        },
        {
          heading: "Das Pferd beurteilen",
          text: "Mindestens genauso aufschlussreich ist der Blick auf die Pferde:\n\n• Figur: überwiegend normal, nicht auffällig mager oder fett?\n• Fell und Haut: glänzend, ohne kahle Stellen, Scheuerstellen oder Krusten?\n• Hufe: gepflegt, ohne lange, ausgebrochene oder stark ausgetretene Wände?\n• Verletzungen: Einzelne kleine Bissspuren sind in Gruppen normal; viele frische Verletzungen deuten auf Platzmangel oder eine unruhige Gruppe hin.\n• Augen und Nase: klar, ohne Ausfluss; kein Husten in der Stallgasse?\n• Verhalten: Sind die Pferde aufmerksam und neugierig, kommen sie entspannt auf Menschen zu? Oder wirken sie abgestumpft, ängstlich oder aggressiv? Zeigen mehrere Pferde Koppen, Weben oder Boxenlaufen?\n\nEin einzelnes auffälliges Pferd sagt wenig über einen ganzen Stall. Wiederholen sich die Auffälligkeiten bei vielen Pferden, ist das ein deutliches Signal.",
        },
        {
          heading: "Einen Pensionsstall besichtigen",
          text: "Besichtige einen Stall möglichst mehrmals und zu verschiedenen Zeiten – zum Beispiel zur Fütterung, am Abend und bei schlechtem Wetter. Viele Probleme zeigen sich nicht an einem sonnigen Samstagnachmittag.\n\nStelle konkrete Fragen: Wie viel Heu bekommt mein Pferd, und wann? Was passiert im Winter mit dem Weidegang? Wie werden neue Pferde in Gruppen integriert? Wer ruft den Tierarzt, wenn ich nicht erreichbar bin? Sprich, wenn möglich, auch mit anderen Einstellern.\n\nAchte auf den Umgangston: Wie gehen Stallbetreiber und Personal mit den Pferden um? Ruhige, freundliche, konsequente Menschen sind ein gutes Zeichen.",
        },
        {
          heading: "Wenn etwas nicht stimmt",
          text: "Wenn dir in einem Stall etwas Sorgen macht, ist der erste Schritt fast immer ein sachliches Gespräch mit den Verantwortlichen. Viele Probleme entstehen aus Unwissen oder Zeitmangel und lassen sich gemeinsam lösen.\n\nNotiere deine Beobachtungen mit Datum, und mache wenn möglich Fotos. Bei einem ernsthaften Verdacht auf Tierschutzverstöße – etwa dauerhaft fehlendes Wasser, stark abgemagerte oder unbehandelt verletzte Pferde – ist das zuständige Veterinäramt der richtige Ansprechpartner. Es prüft die Haltung und kann Auflagen erteilen.\n\nWichtig für Jugendliche: Sprich zuerst mit einer erwachsenen Vertrauensperson, bevor du selbst tätig wirst.",
        },
      ],
      praxis: {
        title: "Zwei Ställe, ein Pferd",
        text: "Mila hilft ihrer Tante bei der Suche nach einem Stall für deren älteres Pferd. Stall A ist neu gebaut, mit großen Innenboxen, Solarium und Hallenbad. Weidegang gibt es von Mai bis September zwei Stunden am Tag, im Winter nicht. Stall B ist schlichter: Offenstall mit sechs Pferden, befestigtem Auslauf, Heu aus mehreren Netzen und täglich Weide oder großem Winterpaddock.\n\nMila nutzt die Checkliste aus dieser Lektion und schaut sich die Pferde an. In Stall A wirken einige Pferde unruhig, zwei weben. In Stall B dösen die Pferde entspannt, eines davon ist 27 Jahre alt und gut im Futter. Für das ältere Pferd der Tante passt Stall B besser – auch wenn Stall A schöner aussieht.",
      },
      fehler: [
        { fehler: "Einen Stall nach der Optik beurteilen.", besser: "Haltung und Pferde anhand konkreter Kriterien prüfen." },
        { fehler: "Nur einmal bei schönem Wetter besichtigen.", besser: "Mehrmals zu verschiedenen Zeiten und bei schlechtem Wetter kommen." },
        { fehler: "Von einem einzelnen auffälligen Pferd auf den ganzen Stall schließen.", besser: "Auf wiederkehrende Muster bei mehreren Pferden achten." },
        { fehler: "Bei Problemen sofort öffentlich in sozialen Medien anprangern.", besser: "Erst das Gespräch suchen, Beobachtungen dokumentieren, bei ernstem Verdacht das Veterinäramt informieren." },
      ],
      richtig: [
        "Prüfe die Haltung: Bewegung, Kontakt, Raufutter, Wasser, Liegeplatz, Luft, Sicherheit, Management.",
        "Schau dir die Pferde an: Figur, Fell, Hufe, Verletzungen, Atemwege, Verhalten.",
        "Besichtige mehrmals, zu verschiedenen Zeiten und bei unterschiedlichem Wetter.",
        "Stelle konkrete Fragen und halte die Antworten schriftlich fest.",
        "Überlege, ob der Stall zu deinem einzelnen Pferd passt.",
        "Sprich Probleme sachlich an; bei ernstem Verdacht informiere das Veterinäramt.",
      ],
      merke: [
        "Gute Haltung erkennst du am Pferd, nicht an der Optik.",
        "Prüfe immer beides: die Haltung und die Pferde selbst.",
        "Wiederkehrende Auffälligkeiten bei mehreren Pferden sind ein deutliches Signal.",
        "Erst Gespräch, dann Dokumentation, bei ernstem Verdacht das Veterinäramt.",
      ],
      weiter: [
        { lesson: "ra-w15-l1", label: "Die natürlichen Grundbedürfnisse des Pferdes" },
        { lesson: "ra-w15-l2", label: "Haltungsformen im Vergleich" },
        { lesson: "ra-w15-l13", label: "Stallmanagement und tägliche Versorgung" },
        { lesson: "ra-w9-l1", label: "Körpersprache: Was sagt mein Pferd?" },
      ],
      pruefen: "Bezug auf AWIN-Protokoll; Hinweis Veterinäramt; Formulierungen zu Bissspuren und Stereotypien.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l14-entscheidung",
        prompt: "Du besichtigst einen Stall. Was ist das aussagekräftigste Zeichen für gute Haltung?",
        options: [
          ok("pferde", "Die meisten Pferde haben eine normale Figur, gesunde Hufe und wirken entspannt und neugierig"),
          no("optik", "Gepflasterte Wege und neue Boxentüren", "Schöne Optik sagt wenig darüber, wie es den Pferden geht."),
          no("solarium", "Ein Solarium und eine Führanlage", "Ausstattung ersetzt keine freie Bewegung, keinen Kontakt und kein Raufutter."),
        ],
        explain: "Genau. Am Ende zählt, wie es den Pferden geht.",
      },
    ],
    quiz: [
      {
        id: "zwei",
        prompt: "Welche zwei Blickwinkel nutzen Fachleute zur Beurteilung einer Haltung?",
        options: [
          ok("beide", "Die Haltung (Ressourcen) und das Pferd selbst (tierbezogene Merkmale)"),
          no("preis", "Preis und Lage", "Das sind wichtige Fragen für dich, sagen aber nichts über das Tierwohl."),
          no("optik", "Optik und Ausstattung", "Ausstattung allein beschreibt nicht, wie es den Pferden geht."),
        ],
        explain: "Richtig. Erst beides zusammen ergibt ein Bild.",
      },
      {
        id: "besichtigung",
        prompt: "Wie besichtigst du einen Pensionsstall am besten?",
        options: [
          ok("mehrmals", "Mehrmals, zu verschiedenen Zeiten und bei unterschiedlichem Wetter"),
          no("einmal", "Einmal am Wochenende bei Sonnenschein", "Dann zeigt sich ein Stall meist von seiner besten Seite."),
          no("online", "Nur über Fotos im Internet", "Fotos zeigen weder Geruch noch Verhalten der Pferde."),
        ],
        explain: "Genau. Fütterungszeiten und schlechtes Wetter sind besonders aufschlussreich.",
      },
      {
        id: "verletzungen",
        prompt: "Viele Pferde einer Gruppe haben frische Bissverletzungen. Was kann das bedeuten?",
        options: [
          ok("platz", "Möglicherweise Platzmangel, zu wenige Futterstellen oder eine unruhige Gruppe"),
          no("normal", "Das ist in jeder Gruppe völlig normal", "Einzelne kleine Spuren sind normal, viele frische Verletzungen nicht."),
          no("spiel", "Die Pferde spielen nur", "Spiel hinterlässt selten viele frische Verletzungen."),
        ],
        explain: "Richtig. Dann lohnt ein genauer Blick auf Platz und Ressourcen.",
      },
      {
        id: "veterinaeramt",
        prompt: "An wen wendest du dich bei einem ernsten Verdacht auf Tierschutzverstöße?",
        options: [
          ok("vet", "An das zuständige Veterinäramt"),
          no("polizei-sofort", "Sofort an die Presse", "Zuständig für Tierschutzkontrollen ist das Veterinäramt."),
          no("niemand", "An niemanden – das geht mich nichts an", "Tierschutz geht alle an. Ernste Verdachtsfälle gehören zur zuständigen Behörde."),
        ],
        explain: "Genau. Vorher Beobachtungen dokumentieren und, wenn möglich, das Gespräch suchen.",
      },
    ],
  },
];
