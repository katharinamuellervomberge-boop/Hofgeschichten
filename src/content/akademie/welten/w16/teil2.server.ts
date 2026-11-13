import "server-only";
import { item } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 11, Lektionen 6–9 */
export const teil2: DeepInput[] = [
  /* ---------- 6. Hufkrankheiten ---------- */
  {
    slug: "hufkrankheiten",
    title: "Hufkrankheiten: Hufrehe, Strahlfäule, Abszesse und Hornprobleme",
    speaker: "lea",
    intro:
      "Ein Pferd, das gestern noch fröhlich über die Weide getrabt ist, steht heute mit nach vorn gestellten Vorderbeinen da und will keinen Schritt gehen. Ist das eine Prellung, ein Abszess – oder Hufrehe? Die Unterscheidung ist Sache des Tierarztes. Deine Aufgabe ist, den Notfall zu erkennen.",
    illustration: tabelle("Überblick", "Hufprobleme und wie dringend sie sind", [
      ["Problem", "Typische Zeichen", "Dringlichkeit"],
      ["Hufrehe", "Sägebockstellung, warme Hufe, pochende Zehenarterie", "Notfall"],
      ["Hufabszess", "plötzlich stark lahm, ein Huf warm", "Tierarzt heute"],
      ["Nageltritt", "Fremdkörper in der Sohle", "Notfall"],
      ["Strahlfäule", "fauliger Geruch, schwarze Schmiere", "Tierarzt/Schmied zeitnah"],
      ["Hornspalt", "Riss in der Wand", "Schmied zeitnah"],
    ]),
    terms: begriffe(
      ["Hufrehe", "Entzündung der Huflederhaut; die Verbindung zwischen Hufbein und Hufwand ist gestört."],
      ["Sägebockstellung", "Typische Haltung bei Hufrehe: Vorderbeine nach vorn gestellt, Gewicht nach hinten verlagert."],
      ["Hufabszess", "Eitrige Entzündung unter dem Horn, meist nach eingedrungenem Schmutz."],
      ["Nageltritt", "Eindringen eines spitzen Gegenstands durch die Sohle oder den Strahl."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Hufrehe: ein Notfall",
          text: "Bei der Hufrehe entzündet sich die Huflederhaut, die das Hufbein mit der Hufwand verbindet. Im schlimmsten Fall löst sich die Verbindung, und das Hufbein senkt oder dreht sich in der Kapsel.\n\nUrsachen sind vielfältig. Am häufigsten stehen Stoffwechselstörungen dahinter, etwa das Equine Metabolische Syndrom (EMS) oder die Cushing-Erkrankung (PPID). Auch zu viel Stärke oder Zucker, Vergiftungen, schwere Infektionen oder Überlastung eines Beins, wenn das andere geschont wird, können Hufrehe auslösen.\n\nWarnzeichen: klammer, vorsichtiger Gang, besonders auf hartem Boden und in Wendungen; häufiges Gewichtsverlagern; Sägebockstellung; warme Hufe; deutlich pochender Puls an der Zehenarterie; Unwilligkeit, die Hufe anheben zu lassen; im schweren Fall Festliegen.\n\nSofort: Tierarzt anrufen. Pferd nicht bewegen, auf weichen, tiefen Boden stellen, Futter (insbesondere Gras und Kraftfutter) wegnehmen, Wasser lassen. Das Kühlen der Hufe in Eiswasser gilt als sinnvolle Erstmaßnahme – sprich sie mit dem Tierarzt am Telefon ab.",
        },
        {
          heading: "Hufabszess und Nageltritt",
          text: "Ein Hufabszess entsteht, wenn Keime über einen Riss, die weiße Linie oder einen Nagel unter das Horn gelangen und sich Eiter bildet. Typisch: Das Pferd ist plötzlich hochgradig lahm, oft so, dass es den Huf kaum aufsetzt; der Huf ist warm, die Zehenarterie pocht. Viele Abszesse sehen am Anfang aus wie ein Beinbruch – deshalb immer den Tierarzt rufen. Er oder der Hufschmied öffnen den Abszess, damit der Eiter abfließen kann.\n\nNageltritt: Steckt ein Nagel, Draht oder Holzsplitter in der Sohle oder im Strahl, ist das ein Notfall, weil wichtige Strukturen im Huf verletzt sein können. Den Fremdkörper möglichst nicht herausziehen; wenn er beim Gehen herauszufallen oder tiefer einzudringen droht, die Eintrittsstelle markieren (Foto, Stift) und dem Tierarzt genau zeigen. Er entscheidet über Röntgen und Behandlung.",
        },
        {
          heading: "Strahlfäule",
          text: "Strahlfäule ist eine bakterielle Zersetzung des Strahlhorns. Man erkennt sie an schwarzer, schmieriger Masse in den Strahlfurchen und einem fauligen Geruch. In fortgeschrittenen Fällen ist der Strahl zerklüftet, die mittlere Furche tief und empfindlich, das Pferd geht klamm.\n\nUrsachen sind vor allem feuchte, mistige Standflächen, zu wenig Bewegung, mangelnde Hufpflege und ein schlecht funktionierender Hufmechanismus. Die Basis der Behandlung ist deshalb immer: trocken und sauber stellen, täglich auskratzen, Bewegung. Der Hufschmied entfernt loses, zersetztes Horn; wie die Furchen weiter behandelt werden, sprichst du mit Tierarzt oder Hufschmied ab.",
        },
        {
          heading: "Hornspalten, Risse und lose Wände",
          text: "Kleine Risse am Tragrand entstehen oft durch zu lange Bearbeitungsintervalle oder trockenes Horn; sie werden bei der nächsten Bearbeitung entfernt. Längere Hornspalten, die vom Kronrand ausgehen oder bis in empfindliches Gewebe reichen, gehören zeitnah in die Hände des Hufschmieds und gegebenenfalls des Tierarztes.\n\nAuch eine abgelöste Wand oder Hohlräume in der weißen Linie (lose Wand) können Probleme verursachen, weil sich dort Schmutz sammelt. Regelmäßige Bearbeitung, saubere Böden und eine gute Fütterung beugen vor.",
        },
      ],
      praxis: {
        title: "Plötzlich dreibeinig",
        text: "Am Morgen steht Tivoli auf dem Paddock und belastet das rechte Vorderbein kaum. Ben erschrickt und denkt an einen Bruch. Hanna bleibt ruhig: Sie fühlt die Hufe ab – der rechte vordere ist deutlich wärmer, die Zehenarterie pocht. Ein Bein bricht man selten auf einem ebenen Paddock ohne Unfall, aber ausschließen kann sie es nicht.\n\nSie ruft die Tierärztin und bewegt Tivoli nicht. Die Tierärztin findet mit der Hufzange eine schmerzhafte Stelle und öffnet einen Abszess. Wenige Tage später geht Tivoli wieder fast klar. Wichtig war: nicht abwarten, nicht selbst herumschneiden, sondern tierärztlich abklären lassen.",
      },
      fehler: fehler(
        ["Ein Pferd mit Rehe-Verdacht „ein bisschen laufen lassen“.", "Nicht bewegen, auf weichen Boden stellen, Tierarzt sofort."],
        ["Einen Nagel aus der Sohle ziehen und weiterreiten.", "Notfall: möglichst stecken lassen, Stelle markieren, Tierarzt."],
        ["Strahlfäule nur mit einem Mittel behandeln, ohne die Haltung zu ändern.", "Trocken, sauber, Bewegung und fachgerechte Bearbeitung."],
        ["Einen Abszess selbst aufschneiden.", "Das macht der Tierarzt oder Hufschmied."],
      ),
      richtig: [
        "Kenne die Warnzeichen der Hufrehe: Sägebock, warme Hufe, pochende Zehenarterie, klammer Gang.",
        "Bei Rehe-Verdacht: Tierarzt sofort, Pferd nicht bewegen, weich stellen, Futter weg, Wasser lassen.",
        "Bei plötzlicher, starker Lahmheit immer den Tierarzt rufen.",
        "Fremdkörper in der Sohle möglichst nicht ziehen, Stelle markieren.",
        "Strahlfäule vorbeugen: trockene, saubere Böden, tägliches Auskratzen, Bewegung.",
      ],
      merke: [
        "Hufrehe ist ein Notfall – sofort Tierarzt.",
        "Plötzliche hochgradige Lahmheit mit warmem Huf: oft Abszess, aber immer tierärztlich abklären.",
        "Fremdkörper in der Sohle: Notfall, Stelle markieren.",
        "Gegen Strahlfäule helfen vor allem trockene Böden, Pflege und Bewegung.",
      ],
      weiter: weiter(["Aufbau und Funktion des Hufs", "ra-w16-l4"], ["Weidehaltung, Anweiden und Giftpflanzen", "ra-w15-l10"], ["Erste Hilfe und Verhalten im Notfall", "ra-w16-l16"]),
    },
    exercise: [
      wahl(
        "ra-w16-l6-entscheidung",
        "Ein Pony steht im Frühjahr auf der Weide mit nach vorn gestellten Vorderbeinen, die Hufe sind warm. Was tust du?",
        "Tierarzt sofort anrufen, das Pony ohne Druck von der Weide auf weichen Boden bringen, Futter weg, Wasser lassen",
        [
          ["Es zügig im Trab zum Stall führen, damit es schneller geht", "Bewegung, besonders auf hartem Boden, kann die Schäden im Huf verschlimmern."],
          ["Bis morgen beobachten", "Hufrehe ist ein Notfall – jede Stunde zählt."],
          ["Ein Schmerzmittel aus der Stallapotheke geben", "Medikamente nur nach tierärztlicher Anweisung."],
        ],
        "Richtig. Das sind typische Hufrehe-Zeichen, und Hufrehe ist ein Notfall.",
      ),
    ],
    quiz: [
      frage("saegebock", "Was ist die Sägebockstellung?", "Vorderbeine nach vorn gestellt, Gewicht nach hinten verlagert – typisch für Hufrehe", [["Ein Pferd, das mit angewinkeltem Hinterbein döst", "Das ist normales Ruheverhalten."], ["Ein Pferd, das sich streckt, um zu urinieren", "Das ist normales Verhalten."]], "Genau. Mit warmen Hufen und pochender Zehenarterie ein deutliches Warnzeichen."),
      frage("abszess", "Woran denkst du bei plötzlicher, starker Lahmheit mit einem warmen Huf zuerst?", "An einen Hufabszess – aber der Tierarzt muss es abklären", [["An Strahlfäule", "Strahlfäule entwickelt sich langsam."], ["An Muskelkater", "Muskelkater macht keinen warmen Huf."]], "Richtig. Ein Abszess ist häufig, ein Bruch muss aber ausgeschlossen werden."),
      frage("nagel", "Ein Nagel steckt im Strahl. Was ist richtig?", "Möglichst nicht ziehen, die Stelle markieren und sofort den Tierarzt rufen", [["Sofort herausziehen und weiterreiten", "Der Tierarzt muss sehen, wo und wie tief der Fremdkörper steckt."], ["Mit Klebeband abkleben und abwarten", "Nageltritt ist ein Notfall."]], "Genau. Wichtige Strukturen im Huf können verletzt sein."),
      frage("strahlfaeule", "Was hilft am meisten gegen Strahlfäule?", "Trockene, saubere Böden, tägliches Auskratzen und Bewegung", [["Hufe täglich nass machen", "Nässe fördert Strahlfäule."], ["Weniger Bewegung", "Bewegung unterstützt einen gesunden Strahl."]], "Richtig. Die Ursache liegt meist in der Haltung."),
    ],
  },

  /* ---------- 7. Zähne ---------- */
  {
    slug: "pferdezaehne",
    title: "Pferdezähne: Anatomie, Zahnwechsel und Zahngesundheit",
    speaker: "ben",
    intro:
      "Ein Pferd lässt beim Fressen Heuwickel fallen, kaut schief und geht am Gebiss unruhig. Viele denken zuerst an Erziehung oder Reitfehler. Oft liegt die Ursache aber im Maul.",
    illustration: tabelle("Gebiss", "Zähne eines erwachsenen Pferdes", [
      ["Zahnart", "Anzahl", "Aufgabe"],
      ["Schneidezähne", "12", "Gras abbeißen"],
      ["Hakenzähne", "0–4 (meist bei Hengsten/Wallachen)", "ohne Kaufunktion"],
      ["Wolfszähne", "0–4", "kleine, oft störende Reste"],
      ["Backenzähne", "24", "zermahlen"],
    ]),
    terms: begriffe(
      ["Hypsodont", "Hochkronige Zähne, die über viele Jahre aus dem Kiefer nachgeschoben werden."],
      ["Zahnhaken und scharfe Kanten", "Spitzen an den Backenzähnen, die Wangen und Zunge verletzen können."],
      ["Wolfszahn", "Kleiner Zahn vor den Backenzähnen; kann mit dem Gebiss in Konflikt kommen."],
      ["Laden", "Zahnlose Lücke im Unterkiefer, in der das Gebiss liegt."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Aufbau des Gebisses",
          text: "Ein erwachsenes Pferd hat 36 bis 44 Zähne: 12 Schneidezähne zum Abbeißen, 24 Backenzähne zum Zermahlen und je nach Geschlecht und Pferd bis zu vier Hakenzähne und bis zu vier Wolfszähne. Zwischen Schneide- und Backenzähnen liegt eine Lücke, die Lade – dort liegt das Gebiss.\n\nPferdezähne sind hochkronig. Ein großer Teil des Zahns steckt im Kiefer und wird über die Jahre nachgeschoben, während die Kaufläche durch das Kauen abgerieben wird. Im hohen Alter kann der Zahn aufgebraucht sein; dann fallen Zähne aus oder lockern sich.",
        },
        {
          heading: "Zahnwechsel",
          text: "Wie wir haben Pferde Milchzähne. Die Milchschneidezähne werden mit etwa zweieinhalb, dreieinhalb und viereinhalb Jahren gewechselt – erst die mittleren (Zangen), dann die Mittelzähne, dann die Eckzähne. Auch die vorderen Backenzähne werden in dieser Zeit gewechselt.\n\nWährend des Zahnwechsels können sich Milchzahnkappen nicht richtig lösen, das Zahnfleisch ist empfindlich, und junge Pferde reagieren manchmal auf das Gebiss. Deshalb ist eine Kontrolle gerade bei Jungpferden in der Ausbildung wichtig.",
        },
        {
          heading: "Typische Probleme",
          text: "Weil der Oberkiefer etwas breiter ist als der Unterkiefer, nutzen sich die Backenzähne nicht ganz gleichmäßig ab. Es entstehen scharfe Kanten – oben außen zur Wange, unten innen zur Zunge. Sie können die Schleimhaut verletzen. Dazu kommen Haken, Stufen, Wellen, lockere oder kranke Zähne und Entzündungen der Zahnwurzel. Bei älteren Pferden tritt an den Schneidezähnen manchmal eine schmerzhafte Erkrankung mit Zahnfleischentzündung und Auflösung der Zahnwurzeln auf (EOTRH).\n\nZeichen für Zahnprobleme: Heuwickel fallen aus dem Maul (Wickelkauen), langsames oder einseitiges Kauen, Futterreste, viele lange Fasern im Kot, Gewichtsverlust, übler Maulgeruch, einseitiger Nasenausfluss, Schwellungen am Kiefer, Kopfschlagen, Unruhe am Gebiss, Widersetzlichkeit beim Trensen.",
        },
        {
          heading: "Zahnkontrolle",
          text: "Ein Pferd sollte mindestens einmal im Jahr von einer Tierärztin oder einem Tierarzt mit Zahnspezialisierung untersucht werden; Jungpferde im Zahnwechsel und ältere Pferde oft zweimal. Die Untersuchung erfolgt mit Maulgatter, Licht und meist unter Sedierung, damit das ganze Gebiss gründlich angeschaut werden kann.\n\nNur Fachleute korrigieren Zähne. Zahnbehandlungen am Pferd sind tierärztliche Tätigkeiten oder gehören in fachkundige Hände unter tierärztlicher Aufsicht – nicht zuletzt, weil die Sedierung tierärztlich erfolgen muss.",
        },
      ],
      praxis: {
        title: "Die Heuwickel in der Box",
        text: "In Tongas Box liegen morgens immer wieder zusammengekaute Heuwickel. Sie hat etwas abgenommen und kaut langsam. Tilda vermutet zunächst, dass Tonga das Heu nicht mag. Die Tierärztin untersucht das Maul und findet scharfe Kanten an den Backenzähnen und eine kleine Verletzung an der Wange.\n\nNach der Zahnbehandlung frisst Tonga wieder gleichmäßig, und auch beim Reiten kaut sie ruhiger auf dem Gebiss. Seitdem steht der Zahntermin fest im Jahresplan.",
      },
      fehler: fehler(
        ["Unruhe am Gebiss nur als Erziehungs- oder Reitproblem sehen.", "Zähne als mögliche Ursache tierärztlich prüfen lassen."],
        ["Zahnkontrolle nur machen, wenn das Pferd abnimmt.", "Mindestens jährlich kontrollieren lassen."],
        ["Selbst mit einer Raspel an den Zähnen arbeiten.", "Zahnbehandlung gehört in tierärztliche Hände."],
        ["Heuwickel in der Box übersehen.", "Wickelkauen ist ein typisches Warnzeichen."],
      ),
      richtig: [
        "Achte beim Füttern auf Kauen, Futterreste und Heuwickel.",
        "Schau dir den Kot an: Viele lange Fasern können auf schlechtes Kauen hinweisen.",
        "Plane mindestens jährlich eine tierärztliche Zahnkontrolle, bei Jungpferden und Senioren oft halbjährlich.",
        "Beobachte das Pferd beim Trensen und Reiten auf Widerstand am Gebiss.",
        "Melde Maulgeruch, Kieferschwellungen und einseitigen Nasenausfluss dem Tierarzt.",
      ],
      merke: [
        "Erwachsene Pferde haben 36–44 Zähne; die Backenzähne werden über Jahre nachgeschoben.",
        "Scharfe Kanten entstehen durch ungleichmäßigen Abrieb.",
        "Heuwickel, schlechtes Kauen und Gebissprobleme können Zahnzeichen sein.",
        "Zahnkontrolle mindestens einmal jährlich durch Fachleute.",
      ],
      weiter: weiter(["Das Verdauungssystem verstehen", "ra-w15-l5"], ["Gesundheitsvorsorge und langfristiges Management", "ra-w16-l18"]),
    },
    exercise: [
      wahl(
        "ra-w16-l7-entscheidung",
        "Ein Pferd nimmt ab, obwohl es genug frisst, und im Kot sind viele lange Halme. Was ist ein sinnvoller Schritt?",
        "Zähne tierärztlich untersuchen lassen und die Fütterung besprechen",
        [
          ["Einfach mehr Kraftfutter geben", "Wenn das Pferd schlecht kaut, hilft mehr Futter wenig. Erst die Ursache klären."],
          ["Das Heu wechseln und abwarten", "Lange Fasern im Kot sprechen eher für ein Kauproblem."],
        ],
        "Richtig. Schlecht zerkautes Futter wird schlechter verwertet.",
      ),
    ],
    quiz: [
      frage("anzahl", "Wie viele Zähne hat ein erwachsenes Pferd ungefähr?", "36 bis 44", [["20", "Das ist deutlich zu wenig."], ["Über 60", "So viele Zähne hat ein Pferd nicht."]], "Genau. Die Zahl hängt von Haken- und Wolfszähnen ab."),
      frage("wickel", "Was kann Wickelkauen bedeuten?", "Zahnprobleme, z. B. scharfe Kanten", [["Dass das Heu besonders lecker ist", "Heuwickel sind ein Warnzeichen, kein Zeichen für gutes Heu."], ["Dass das Pferd satt ist", "Ein sattes Pferd hört auf zu fressen, es fallen aber keine Wickel."]], "Richtig. Dann die Zähne kontrollieren lassen."),
      frage("kontrolle", "Wie oft sollten Zähne mindestens kontrolliert werden?", "Einmal im Jahr", [["Alle fünf Jahre", "Das ist zu selten."], ["Nur bei Problemen", "Vorsorge findet Probleme früh."]], "Genau – bei jungen und alten Pferden oft zweimal."),
      frage("wechsel", "Wann werden die Milchschneidezähne gewechselt?", "Mit etwa zweieinhalb bis viereinhalb Jahren", [["Im ersten Lebensjahr", "Dann wachsen die Milchzähne erst."], ["Mit zehn Jahren", "Dann ist das bleibende Gebiss längst da."]], "Richtig. In dieser Zeit sind junge Pferde oft empfindlich im Maul."),
    ],
  },

  /* ---------- 8. Fell, Mähne, Schweif ---------- */
  {
    slug: "fell-maehne-schweif",
    title: "Richtige Fell-, Mähnen- und Schweifpflege",
    speaker: "mila",
    intro:
      "Glänzendes Fell, gewaschene Mähne, gekürzter Schweif – manches gepflegte Pferd hat dafür einen Teil seines Schutzes verloren. Gute Pflege heißt nicht, ein Pferd „schön“ zu machen, sondern Haut und Fell gesund zu halten.",
    illustration: item("striegel"),
    terms: begriffe(
      ["Talg", "Fettiger Schutzfilm der Haut, der das Fell wasserabweisend macht."],
      ["Gummistriegel", "Weicher Striegel für kreisende Bewegungen, löst Schmutz und Haare."],
      ["Tasthaare", "Lange Haare an Maul und Augen, mit denen das Pferd seine Umgebung ertastet."],
    ),
    deep: {
      minutes: 7,
      sections: [
        {
          heading: "Wozu Fellpflege dient",
          text: "Putzen entfernt Schmutz, Schweiß und lose Haare, regt die Durchblutung an und ist ein guter Moment für den Gesundheitscheck. Gleichzeitig ist das Fell ein Schutzorgan: Talg macht es wasserabweisend, das Winterfell isoliert. Zu häufiges Waschen mit Shampoo oder intensives Bürsten bei Offenstallpferden im Winter kann diesen Schutz verringern.\n\nDie Grundreihenfolge kennst du aus dem Grundkurs: Gummistriegel in kreisenden Bewegungen, dann Kardätsche in Haarrichtung, an empfindlichen Stellen weiche Bürste, Hufe auskratzen.",
        },
        {
          heading: "Pflege je nach Jahreszeit",
          text: "Im Fellwechsel im Frühjahr und Herbst hilft häufiges Striegeln, lose Haare zu entfernen. Im Winter reicht bei Pferden ohne Decke oft ein gründliches Entfernen von Schmutz an Sattel- und Gurtlage; das Fell darf ruhig etwas „Struktur“ behalten. Nass verschwitzte Stellen erst trocknen lassen, dann ausbürsten.\n\nIm Sommer nach dem Reiten Schweiß mit Wasser abwaschen – Shampoo nur selten und mild verwenden. Pferde mit heller Haut brauchen Schutz vor Sonne. Grundsätzlich gilt: Waschen ist kein Ersatz für Putzen.",
        },
        {
          heading: "Mähne und Schweif",
          text: "Die Mähne schützt den Hals vor Insekten und Wetter. Sie wird vorsichtig mit den Fingern oder einer groben Bürste entwirrt. Der Schweif ist eine Fliegenklatsche: Beim Kämmen gehen leicht viele Haare verloren, die Jahre zum Nachwachsen brauchen. Deshalb Schweifhaare vorsichtig mit den Fingern verlesen, bei Bedarf Entwirrspray nutzen und nur selten bürsten.\n\nDas Kürzen des Schweifs auf eine Länge, bei der er Insekten nicht mehr erreicht, schränkt das Pferd im Sommer ein. Tasthaare an Maul und Augen sind Sinnesorgane und sollten nicht abgeschnitten werden. Im Turniersport verbieten FN und FEI das Entfernen der Tasthaare, und aus Tierschutzsicht wird es generell abgelehnt.",
        },
        {
          heading: "Pflege als Gesundheitscheck",
          text: "Beim Putzen bemerkst du: Krusten, Schwellungen, Wunden, Hautveränderungen, Parasiten, empfindliche Stellen. Reagiert ein Pferd an einer Stelle immer wieder mit Ohrenanlegen, Schweifschlagen oder Wegdrehen, kann das auf Schmerzen hinweisen – etwa im Rücken oder an der Sattellage.\n\nJedes Pferd sollte eigenes Putzzeug haben, das regelmäßig gereinigt wird. So verhinderst du, dass Hautpilz oder andere Erreger von Pferd zu Pferd getragen werden.",
        },
      ],
      praxis: {
        title: "Der kurze Schweif",
        text: "Eine Einstellerin möchte den Schweif ihrer Stute auf Höhe der Sprunggelenke kürzen, weil er „ordentlicher“ aussieht. Wilhelm erklärt ihr, dass die Stute im Sommer auf der Weide den Schweif braucht, um Insekten zu vertreiben. Gemeinsam einigen sie sich darauf, nur die untersten Spitzen gerade abzuschneiden, sodass die Länge erhalten bleibt.\n\nZum Entwirren nimmt die Einstellerin jetzt die Finger statt der Bürste – nach einigen Monaten ist der Schweif deutlich voller.",
      },
      fehler: fehler(
        ["Pferde im Winter, die draußen leben, ständig waschen und glänzend bürsten.", "Schmutz an Sattel- und Gurtlage entfernen, Schutz des Fells erhalten."],
        ["Den Schweif täglich mit der Bürste kämmen.", "Mit den Fingern verlesen, nur selten bürsten."],
        ["Tasthaare abschneiden.", "Tasthaare sind Sinnesorgane und bleiben dran."],
        ["Putzzeug für mehrere Pferde teilen.", "Jedes Pferd hat eigenes Putzzeug."],
      ),
      richtig: [
        "Putze vor und nach dem Reiten und kontrolliere dabei Haut und Fell.",
        "Passe die Pflege der Jahreszeit und der Haltung an.",
        "Entwirre Mähne und Schweif vorsichtig mit den Fingern.",
        "Wasche selten, mild und nur bei Bedarf.",
        "Achte auf Reaktionen des Pferdes und notiere empfindliche Stellen.",
        "Reinige das Putzzeug regelmäßig und nutze es nur für ein Pferd.",
      ],
      merke: [
        "Fell ist Schutz – Pflege soll ihn erhalten, nicht entfernen.",
        "Schweifhaare wachsen langsam: Finger statt Bürste.",
        "Tasthaare bleiben dran.",
        "Putzen ist auch Gesundheitscheck.",
      ],
      weiter: weiter(["Putzen Schritt für Schritt", "ra-w10-l1"], ["Hautprobleme, Mauke, Pilz und Sommerekzem", "ra-w16-l9"]),
    },
    exercise: [
      wahl(
        "ra-w16-l8-entscheidung",
        "Beim Putzen legt dein Pferd jedes Mal die Ohren an und schlägt mit dem Schweif, sobald du an die Sattellage kommst. Was tust du?",
        "Sanfter putzen, die Stelle genau anschauen und die Beobachtung mit Sattler oder Tierarzt besprechen",
        [
          ["Strenger werden, damit es sich das abgewöhnt", "Das Pferd zeigt dir möglicherweise Schmerzen. Strafe löst das Problem nicht."],
          ["Ignorieren, manche Pferde sind halt kitzelig", "Wiederholte, deutliche Reaktionen an einer Stelle sollten abgeklärt werden."],
        ],
        "Richtig. Reaktionen beim Putzen sind wertvolle Hinweise.",
      ),
    ],
    quiz: [
      frage("talg", "Warum sollte man Pferde nicht zu oft mit Shampoo waschen?", "Weil dabei der schützende Talg entfernt wird", [["Weil Shampoo das Fell färbt", "Es geht um den Schutzfilm der Haut."], ["Weil Pferde Wasser nicht mögen", "Der Grund ist der Hautschutz."]], "Genau. Talg macht das Fell wasserabweisend."),
      frage("schweif", "Wie pflegst du den Schweif am schonendsten?", "Mit den Fingern verlesen und nur selten bürsten", [["Täglich mit einer feinen Bürste", "Dabei gehen viele Haare verloren."], ["Kurz schneiden, dann muss man ihn nicht pflegen", "Das Pferd braucht ihn gegen Insekten."]], "Richtig. Schweifhaare brauchen lange zum Nachwachsen."),
      frage("tasthaare", "Warum bleiben die Tasthaare am Maul dran?", "Weil sie Sinnesorgane sind, mit denen das Pferd seine Umgebung ertastet", [["Weil sie schnell nachwachsen", "Es geht um ihre Funktion."], ["Weil sie gegen Kälte schützen", "Sie dienen vor allem dem Tasten."]], "Genau. Im Turniersport ist ihr Entfernen verboten, und aus Tierschutzsicht wird es generell abgelehnt."),
      frage("putzzeug", "Warum hat jedes Pferd sein eigenes Putzzeug?", "Damit Erreger wie Hautpilz nicht übertragen werden", [["Damit die Bürsten länger halten", "Der Hauptgrund ist die Hygiene."], ["Weil es so vorgeschrieben ist", "Der Grund ist die Ansteckungsgefahr."]], "Richtig. Regelmäßig reinigen gehört dazu."),
    ],
  },

  /* ---------- 9. Hautprobleme ---------- */
  {
    slug: "hautprobleme",
    title: "Hautprobleme, Mauke, Pilz und Sommerekzem",
    speaker: "lea",
    intro:
      "Kleine, kreisrunde kahle Stellen am Hals. Krusten in der Fesselbeuge. Eine wundgescheuerte Mähne im Juli. Hautprobleme sehen sich oft ähnlich, haben aber sehr unterschiedliche Ursachen – und manche sind ansteckend.",
    illustration: item("buerste"),
    terms: begriffe(
      ["Mauke", "Entzündung der Haut in der Fesselbeuge mit Krusten, Schuppen oder nässenden Stellen."],
      ["Hautpilz (Dermatophytose)", "Ansteckende Pilzinfektion mit runden, kahlen, schuppigen Stellen; auch auf Menschen übertragbar."],
      ["Sommerekzem", "Allergie gegen den Speichel von Gnitzen mit starkem Juckreiz."],
      ["Mallenders", "Schuppige Hautveränderung in der Kniekehle; ähnlich: Sallenders in der Sprunggelenksbeuge."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Mauke",
          text: "Mauke ist keine einzelne Krankheit, sondern eine Entzündung der Haut in der Fesselbeuge mit vielen möglichen Ursachen: Dauernässe und Matsch, Bakterien, Pilze, Milben (häufig bei Pferden mit viel Fesselbehang), reizende Stoffe in Einstreu oder Boden, Sonnenempfindlichkeit an weißen Beinen oder ein geschwächtes Immunsystem.\n\nZeichen: Schuppen und Krusten, verklebte Haare, nässende oder rissige Haut, Schwellung, Wärme, Schmerz beim Abtasten, im schweren Fall Lahmheit.\n\nWas du tun kannst: Beine trocken und sauber halten, Matschflächen meiden, Krusten nicht gewaltsam abreißen. Weil die Ursachen so unterschiedlich sind, sollte der Tierarzt untersuchen, worum es sich handelt – er legt die Behandlung fest. Bei Schwellung, Lahmheit oder schneller Ausbreitung zügig.",
        },
        {
          heading: "Hautpilz",
          text: "Hautpilz zeigt sich meist als runde, kahle, schuppige Stellen, oft an Kopf, Hals, Sattel- und Gurtlage. Er juckt meist wenig. Der Pilz ist ansteckend für andere Pferde und auch für Menschen und wird über direkten Kontakt, Putzzeug, Decken, Sattelzeug und Zäune übertragen.\n\nBei Verdacht: Pferd möglichst von anderen trennen, eigenes Putzzeug und eigene Ausrüstung verwenden, nach dem Kontakt Hände waschen, Tierarzt informieren. Er bestätigt die Diagnose und legt die Behandlung fest. Auch Ausrüstung und Umgebung werden behandelt, sonst steckt sich das Pferd erneut an.",
        },
        {
          heading: "Sommerekzem",
          text: "Das Sommerekzem ist eine allergische Reaktion vor allem auf den Speichel von Gnitzen, winzigen Stechmücken, die besonders in der Dämmerung aktiv sind. Betroffene Pferde haben starken Juckreiz an Mähnenkamm, Schweifansatz und Bauchnaht. Sie scheuern sich, bis die Haut wund, verdickt und kahl ist.\n\nSommerekzem ist nicht heilbar, lässt sich aber gut managen: Weidegang außerhalb der Gnitzen-Hauptflugzeiten, Ekzemerdecken, Unterstand mit Luftzug und Insektenschutz, Abstand zu stehendem Wasser. Die Behandlung von Juckreiz und Hautentzündungen gehört in tierärztliche Hände. Pferde aus Island, die nach Mitteleuropa kommen, sind besonders häufig betroffen.",
        },
        {
          heading: "Weitere Hautprobleme",
          text: "• Scheuerstellen und Druckstellen: durch schlecht sitzende Decken, Sattel oder Gurt. Ursache abstellen.\n• Regenräude (Dermatophilose): bakterielle Infektion bei Dauernässe mit verklebten Haarbüscheln („Pinselhaare“).\n• Warzen und Sarkoide: Warzen bei Jungpferden verschwinden oft von selbst; Sarkoide sind Hauttumoren, die nicht manipuliert werden dürfen und tierärztlich beurteilt werden müssen.\n• Quaddeln (Nesselsucht): plötzliche, flache Schwellungen, oft allergisch. Bei Atemproblemen oder Schwellungen am Kopf: Notfall.\n• Läuse und Milben: Juckreiz, Haarausfall, vor allem im Winter.\n\nGrundregel: Hautveränderungen fotografieren, beobachten, ob sie sich ausbreiten, und tierärztlich abklären lassen. Selbstbehandlung mit Hausmitteln kann die Diagnose erschweren.",
        },
      ],
      praxis: {
        title: "Die runden Stellen",
        text: "Im Winter entdeckt Mila an der Gurtlage eines neuen Einstellerpferds mehrere runde, kahle Stellen. Sie sagt es Hanna, bevor sie weiterputzt. Hanna stellt das Pferd bis zur Untersuchung getrennt, legt eigenes Putzzeug bereit und bittet alle, nach dem Kontakt die Hände zu waschen.\n\nDie Tierärztin bestätigt Hautpilz. Neben der Behandlung des Pferdes werden auch Decke, Sattelgurt und Putzzeug behandelt. Weil früh reagiert wurde, bleibt es bei einem Pferd.",
      },
      fehler: fehler(
        ["Krusten bei Mauke gewaltsam abreißen.", "Sauber und trocken halten, Behandlung tierärztlich festlegen."],
        ["Bei Pilzverdacht weiter mit demselben Putzzeug alle Pferde putzen.", "Trennen, eigenes Putzzeug, Hände waschen."],
        ["Sommerekzem-Pferde in der Dämmerung auf der Weide lassen.", "Weidezeiten anpassen, Ekzemerdecke nutzen."],
        ["Sarkoide selbst abbinden oder behandeln.", "Nicht manipulieren, tierärztlich beurteilen lassen."],
      ),
      richtig: [
        "Prüfe Haut und Fell bei jedem Putzen, besonders Fesselbeugen, Mähnenkamm und Schweifansatz.",
        "Fotografiere Veränderungen und beobachte, ob sie sich ausbreiten.",
        "Halte Beine trocken und meide Matsch.",
        "Bei Verdacht auf Ansteckung: trennen, eigenes Zubehör, Hände waschen.",
        "Lass Hautveränderungen tierärztlich abklären, bevor du behandelst.",
        "Bei Quaddeln mit Atemproblemen oder Schwellungen am Kopf: sofort Tierarzt.",
      ],
      merke: [
        "Mauke hat viele Ursachen – trocken halten und tierärztlich abklären.",
        "Hautpilz ist ansteckend, auch für Menschen.",
        "Sommerekzem ist eine Allergie gegen Gnitzen – Management ist entscheidend.",
        "Hautveränderungen fotografieren und Verlauf beobachten.",
      ],
      weiter: weiter(["Sommerhaltung, Hitze und Insektenschutz", "ra-w15-l12"], ["Richtige Fell-, Mähnen- und Schweifpflege", "ra-w16-l8"], ["Infektionen, Impfungen und Parasiten", "ra-w16-l15"]),
    },
    exercise: [
      wahl(
        "ra-w16-l9-entscheidung",
        "Du findest bei einem Pferd runde, kahle, schuppige Stellen am Hals. Was ist der beste erste Schritt?",
        "Eigenes Putzzeug nutzen, Kontakt zu anderen Pferden begrenzen, Hände waschen und den Tierarzt informieren",
        [
          ["Mit deinem Putzzeug weiterputzen und danach die anderen Pferde", "So kann ein Pilz auf andere Pferde übertragen werden."],
          ["Ein Hausmittel aus dem Internet ausprobieren", "Erst die Ursache klären – Hausmittel können die Diagnose erschweren."],
        ],
        "Richtig. Das spricht für Hautpilz, und der ist ansteckend.",
      ),
    ],
    quiz: [
      frage("mauke", "Was begünstigt Mauke besonders?", "Dauernässe und Matsch", [["Viel Bewegung auf trockenem Boden", "Das beugt eher vor."], ["Regelmäßiges Hufeauskratzen", "Das ist gute Pflege."]], "Genau. Trockene, saubere Beine sind die beste Vorbeugung."),
      frage("pilz", "Was gilt für Hautpilz?", "Er ist ansteckend für Pferde und Menschen", [["Er ist harmlos und verschwindet immer von selbst", "Hautpilz muss behandelt werden, sonst breitet er sich aus."], ["Er betrifft nur die Hufe", "Typisch sind runde Stellen an Kopf, Hals und Gurtlage."]], "Richtig. Darum Hygiene und tierärztliche Behandlung."),
      frage("ekzem", "Was löst das Sommerekzem meist aus?", "Eine Allergie gegen den Speichel von Gnitzen", [["Zu viel Sonne", "Sonne kann Sonnenbrand auslösen, aber kein Sommerekzem."], ["Falsches Shampoo", "Ursache ist eine Allergie gegen Insekten."]], "Genau. Gnitzen fliegen vor allem in der Dämmerung."),
      frage("sarkoid", "Was gilt für Sarkoide?", "Nicht manipulieren und tierärztlich beurteilen lassen", [["Mit einem Faden abbinden", "Manipulation kann Sarkoide verschlimmern."], ["Sie sind immer harmlose Warzen", "Sarkoide sind Hauttumoren und können wachsen."]], "Richtig. Die Behandlung gehört in Fachhände."),
    ],
  },
];
