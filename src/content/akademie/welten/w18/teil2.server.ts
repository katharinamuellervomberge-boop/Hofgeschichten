import "server-only";
import { scene } from "../../types";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 13, Lektionen 5–8 */
export const teil2: DeepInput[] = [
  /* ---------- 5. Schenkelhilfen ---------- */
  {
    slug: "schenkelhilfen",
    title: "Schenkelhilfen und ihre genaue Funktion",
    speaker: "ben",
    intro:
      "„Mehr Bein!“ – kaum ein Satz fällt in Reitstunden häufiger. Doch ein Pferd, das ständig gedrückt wird, reagiert irgendwann gar nicht mehr. Der Schlüssel zum fleißigen Pferd ist nicht mehr Druck, sondern der richtige Moment und das sofortige Aufhören.",
    illustration: scene("ak-reiter-schenkel"),
    terms: begriffe(
      ["Vorwärtstreibender Schenkel", "Liegt am Gurt und veranlasst das Pferd, mit dem gleichseitigen Hinterbein vorzutreten."],
      ["Vorwärts-seitwärtstreibender Schenkel", "Liegt etwa eine Handbreit hinter dem Gurt und veranlasst das Hinterbein, vorwärts-seitwärts zu treten."],
      ["Verwahrender Schenkel", "Liegt etwas hinter dem Gurt und verhindert, dass die Hinterhand ausweicht."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Drei Schenkellagen, drei Aufgaben",
          text: "• Vorwärtstreibend: Der Schenkel liegt am Gurt. Er regt das Pferd an, mit dem Hinterbein derselben Seite energischer vorzutreten. Er gibt außerdem die Biegung vor – in Wendungen ist der innere Schenkel am Gurt der Punkt, um den sich das Pferd biegt.\n• Vorwärts-seitwärtstreibend: etwa eine Handbreit hinter dem Gurt. Das Pferd soll mit dem Hinterbein dieser Seite vorwärts-seitwärts treten, z. B. im Schenkelweichen oder in der Vorhandwendung.\n• Verwahrend: ebenfalls hinter dem Gurt, aber passiv. Er begrenzt das Ausweichen der Hinterhand und ist zum Beispiel in Wendungen und beim Angaloppieren der äußere Schenkel.",
        },
        {
          heading: "Der richtige Moment",
          text: "Ein Pferd kann ein Hinterbein nur dann beeinflussen, wenn es gerade in der Luft ist oder abfußt. Ein treibender Schenkel wirkt deshalb am besten in dem Moment, in dem das Hinterbein derselben Seite vom Boden abhebt. Im Schritt spürst du das an der Bewegung des Bauchs: Der Bauch schwingt zu der Seite, deren Hinterbein gerade aufsetzt, und weg von der Seite, deren Hinterbein abfußt. In diesem Moment legt sich dein Schenkel fast von selbst an.\n\nWer im richtigen Moment treibt, braucht nur einen kleinen Impuls. Wer im falschen Moment drückt, braucht viel Kraft – und stumpft das Pferd ab.",
        },
        {
          heading: "Impuls statt Dauerdruck",
          text: "Eine Schenkelhilfe ist ein kurzer Impuls, kein Klammern. Reagiert das Pferd, hört die Hilfe sofort auf – das Aufhören ist die Belohnung. Reagiert es nicht, wird die Hilfe nicht länger, sondern kurz deutlicher, notfalls mit Unterstützung der Gerte direkt hinter dem Schenkel. Danach wird wieder mit der feinen Hilfe getestet.\n\nSo lernt das Pferd: Ein leichter Schenkel bedeutet „vorwärts“. Ein Reiter, der ständig drückt, bringt dem Pferd das Gegenteil bei: Schenkeldruck bedeutet nichts.",
        },
        {
          heading: "Wie es sich anfühlt und woran du es erkennst",
          text: "Richtig: Dein Bein liegt locker am Pferd, ohne zu klammern. Ein leichtes Anlegen der Wade genügt, und du spürst, wie das Pferd hinten energischer abfußt und sich der Rücken mehr bewegt. Danach liegt dein Bein wieder ruhig.\n\nWoran du erkennst, dass es funktioniert: Das Pferd reagiert auf leichte Hilfen, bleibt im gewählten Tempo, ohne dass du ständig nachtreiben musst (es ist „selbstständig fleißig“), und eilt nicht weg.",
        },
        {
          heading: "Typische Fehler, Ursachen, Übungen",
          text: "• Dauerdruck und Klammern: aus Unsicherheit oder Gewohnheit. Übung: Bein bewusst lösen, nach jeder Hilfe Pause.\n• Absatz hochziehen beim Treiben: Der Unterschenkel rutscht nach oben. Übung: Treiben mit der Wade, nicht mit der Ferse.\n• Treiben gegen die Hand: Schenkel treibt, Hand hält fest – widersprüchliche Signale. Übung: Hand bewusst nachgeben lassen.\n• Schenkel rutscht zu weit nach hinten: Das Pferd versteht seitwärts statt vorwärts.\n\nÜbung für das Timing: Im Schritt laut „jetzt“ sagen, wenn das Hinterbein deiner Seite abfußt; die Reitlehrerin kontrolliert. Übung für Feinheit: Zehn Übergänge Schritt–Trab nur mit dem leichtesten Schenkel; wenn nötig, einmal Gerte, dann wieder leicht.",
        },
      ],
      praxis: {
        title: "Tivoli wird fleißig",
        text: "Lea muss bei Tivoli ständig treiben, sonst wird er langsam. Ihre Beine sind nach der Stunde müde. Die Reitlehrerin lässt sie ein Experiment machen: Ein leichter Schenkelimpuls. Reagiert Tivoli nicht, ein einzelner, deutlicher Gertenimpuls direkt hinter dem Schenkel. Sobald er vorwärts geht, Bein still, Lob.\n\nNach einigen Wiederholungen reagiert Tivoli auf den leichten Schenkel. Lea muss jetzt nur noch treiben, wenn sie etwas verändern will. Am Ende der Stunde sagt sie: „Ich dachte, er ist faul. Dabei hat er nur gelernt, dass mein Bein nichts bedeutet.“",
      },
      fehler: fehler(
        ["Dauerhaft drücken.", "Kurzer Impuls, sofort aufhören, wenn das Pferd reagiert."],
        ["Mit der Ferse oder dem Sporn statt mit der Wade treiben.", "Mit der locker anliegenden Wade treiben."],
        ["Gleichzeitig treiben und am Zügel festhalten.", "Beim Treiben mit der Hand nachgeben."],
        ["Lauter werden statt wieder leise zu testen.", "Nach einer deutlicheren Hilfe wieder mit der feinen beginnen."],
      ),
      richtig: [
        "Lege den Schenkel für vorwärts am Gurt, für seitwärts eine Handbreit dahinter an.",
        "Gib den Impuls, wenn das gleichseitige Hinterbein abfußt.",
        "Höre sofort auf, wenn das Pferd reagiert.",
        "Bei fehlender Reaktion: einmal deutlicher, dann wieder fein testen.",
        "Lass dein Bein zwischen den Hilfen ruhig und locker liegen.",
      ],
      merke: [
        "Vorwärtstreibend am Gurt, vorwärts-seitwärts eine Handbreit dahinter, verwahrend hinter dem Gurt passiv.",
        "Treibe, wenn das gleichseitige Hinterbein abfußt.",
        "Impuls statt Dauerdruck – das Aufhören ist die Belohnung.",
        "Ein fleißiges Pferd entsteht durch feine Hilfen, nicht durch mehr Kraft.",
      ],
      weiter: weiter(["Grundkurs: Schenkelhilfen", "ra-w3-l2"], ["Zügelhilfen und korrekte Handhaltung", "ra-w18-l6"], ["Wie Pferde lernen", "ra-w17-l7"]),
    },
    exercise: [
      wahl(
        "ra-w18-l5-entscheidung",
        "Dein Pferd reagiert kaum auf den Schenkel. Was ist der beste Weg?",
        "Leichter Impuls, bei fehlender Reaktion einmal deutlicher mit Gerte, dann sofort Ruhe – und wieder leicht testen",
        [
          ["Dauerhaft fester drücken", "So lernt das Pferd, Druck zu ignorieren."],
          ["Sporen anlegen und ständig benutzen", "Sporen ersetzen kein Training; Dauereinsatz stumpft ab."],
        ],
        "Richtig. So lernt das Pferd, auf feine Hilfen zu reagieren.",
      ),
    ],
    quiz: [
      frage("lage", "Wo liegt der vorwärts-seitwärtstreibende Schenkel?", "Etwa eine Handbreit hinter dem Gurt", [["Direkt am Gurt", "Dort liegt der vorwärtstreibende Schenkel."], ["Vor dem Gurt", "Vor dem Gurt liegt der Schenkel nicht."]], "Genau. So veranlasst er das Hinterbein, seitwärts zu treten."),
      frage("moment", "Wann wirkt der treibende Schenkel am besten?", "Wenn das gleichseitige Hinterbein abfußt", [["Wenn das Hinterbein auf dem Boden steht", "Ein stehendes Bein kann nicht reagieren."], ["Jederzeit gleich gut", "Das Timing macht einen großen Unterschied."]], "Richtig. Dann kann das Pferd das Bein energischer vorsetzen."),
      frage("verwahrend", "Was macht der verwahrende Schenkel?", "Er verhindert, dass die Hinterhand ausweicht", [["Er treibt kräftig vorwärts", "Das ist der vorwärtstreibende Schenkel."], ["Er bremst das Pferd", "Bremsen geschieht über Paraden."]], "Genau. Zum Beispiel außen in Wendungen."),
      frage("belohnung", "Was ist bei einer Schenkelhilfe die Belohnung für das Pferd?", "Dass der Druck sofort aufhört", [["Dass der Druck stärker wird", "Das wäre eine Strafe für richtiges Verhalten."], ["Ein Leckerli nach der Stunde", "Viel zu spät, um mit der Hilfe verknüpft zu werden."]], "Richtig. Negative Verstärkung mit gutem Timing."),
    ],
  },

  /* ---------- 6. Zügelhilfen ---------- */
  {
    slug: "zuegelhilfen-handhaltung",
    title: "Zügelhilfen und korrekte Handhaltung",
    speaker: "lea",
    intro:
      "Am Ende des Zügels ist ein empfindliches Pferdemaul mit Zunge, Lippen und Kieferknochen. Jede Bewegung deiner Hand kommt dort an. Gute Reiter benutzen den Zügel deshalb nicht zum Lenken und Bremsen allein, sondern als feines Gespräch.",
    illustration: scene("ak-reiter-sitz-hand"),
    terms: begriffe(
      ["Annehmender Zügel", "Die Hand schließt sich oder dreht leicht nach innen; die Verbindung wird kurz stärker."],
      ["Nachgebender Zügel", "Die Hand gibt leicht vor; die Verbindung wird weicher."],
      ["Durchhaltender Zügel", "Die Hand bleibt stehen, ohne zu ziehen, bis das Pferd nachgibt."],
      ["Verwahrender Zügel", "Begrenzt Stellung und Biegung, meist der äußere Zügel."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Die korrekte Handhaltung",
          text: "Die Hände stehen aufrecht als Fäuste, die Daumen bilden ein Dach über dem Zügel, die Finger sind geschlossen, aber nicht verkrampft. Die Hände stehen etwa eine Handbreit über und vor dem Widerrist, eine Handbreit auseinander. Von der Seite gesehen bilden Ellbogen, Hand und Pferdemaul eine gerade Linie. Die Ellbogen liegen locker am Körper und federn mit der Bewegung.\n\nDie Hand ist nicht fest, sondern elastisch: Sie folgt im Schritt und Galopp der Nickbewegung von Kopf und Hals und bleibt im Trab ruhig stehen, während der Körper sich bewegt.",
        },
        {
          heading: "Die Zügelhilfen",
          text: "• Annehmend: Die Hand schließt sich oder dreht leicht nach innen, ohne nach hinten zu ziehen. Kurz – sofort danach nachgebend.\n• Nachgebend: Die Hand öffnet sich etwas oder geht ein wenig vor. Die Verbindung wird weicher.\n• Durchhaltend: Die Hand bleibt stehen, während Schenkel und Gewicht treiben. Sobald das Pferd nachgibt, gibt auch die Hand nach.\n• Verwahrend: Der äußere Zügel begrenzt, wie weit sich das Pferd stellt, und verhindert, dass es über die äußere Schulter ausweicht.\n• Seitwärtsweisend: Die Hand geht leicht zur Seite, um die Richtung zu zeigen – vor allem bei jungen Pferden.\n\nJede Zügelhilfe wird von Gewicht und Schenkel begleitet. Ein Zügel allein zieht nur am Maul.",
        },
        {
          heading: "Biomechanik: Was im Maul passiert",
          text: "Ein Wassertrensengebiss liegt auf Zunge und Laden. Zieht der Reiter, drückt es auf diese empfindlichen Strukturen. Pferde reagieren auf Druck im Maul zunächst mit Nachgeben im Genick, bei zu viel oder zu langem Druck mit Gegendrücken, Öffnen des Mauls, Kopfschlagen oder Verkriechen hinter dem Zügel.\n\nEin Pferd sucht die Verbindung nur, wenn die Hand für es angenehm und verlässlich ist: ruhig, elastisch, ohne Rucke. Die Verbindung entsteht also nicht durch die Hand, sondern durch das Pferd, das von hinten an eine Hand herantritt, die es annehmen kann.",
        },
        {
          heading: "Wie es sich anfühlt",
          text: "Eine gute Verbindung fühlt sich an wie ein weiches Gummiband oder wie das Halten eines kleinen Vogels: Du spürst ein Gewicht in der Hand, aber kein Ziehen. Auf beiden Seiten ist es ungefähr gleich. Das Pferd kaut leicht, der Schaum am Maul ist feucht.\n\nWenn du nachgibst, sucht das Pferd die Hand nach vorn-unten, statt den Kopf hochzuwerfen oder hinter den Zügel zu kriechen. Das zeigt: Es vertraut deiner Hand.",
        },
        {
          heading: "Typische Fehler, Ursachen, Übungen",
          text: "• Ziehen nach hinten: oft aus Unsicherheit oder um zu bremsen. Ursache meist fehlende Balance oder fehlende Paraden über Sitz und Schenkel.\n• Verdeckte Hände (Handrücken oben): Die Hand wird steif.\n• Zu breite oder zu tiefe Hände: Die Linie zum Maul bricht.\n• Unruhige Hand: Folge eines unausbalancierten Sitzes.\n• Rückwärtswirkende Hand ohne Nachgeben: Das Pferd geht gegen den Zügel oder kriecht dahinter.\n\nÜbungen: mit einer Gerte quer unter den Daumen reiten (zeigt, ob die Hände ruhig und gleich hoch sind), Zügel-aus-der-Hand-kauen-lassen in jeder Einheit, Überstreichen (beide Hände kurz eine Handbreit vorgeben – das Pferd soll Haltung und Tempo behalten).",
        },
      ],
      praxis: {
        title: "Das Überstreichen",
        text: "Mila hat das Gefühl, dass Tonga sich „auf die Hand legt“. Die Reitlehrerin lässt sie im Trab überstreichen: beide Hände kurz eine Handbreit am Mähnenkamm vorschieben, dann zurück. Tonga fällt jedes Mal auf die Vorhand und wird schneller – sie hat sich wirklich am Zügel abgestützt.\n\nMila reitet daraufhin mehr Übergänge und halbe Paraden über den Sitz und gibt mit der Hand häufiger kurz nach. Nach einigen Wochen bleibt Tonga beim Überstreichen im Gleichgewicht. Die Verbindung fühlt sich leichter an, obwohl Mila den Zügel nicht „lockerer“ hält.",
      },
      fehler: fehler(
        ["Mit dem Zügel bremsen.", "Paraden über Sitz und Schenkel, Zügel nur begleitend."],
        ["Hände verdeckt oder steif halten.", "Aufrechte Fäuste, Daumen als Dach, elastische Ellbogen."],
        ["Annehmen ohne Nachgeben.", "Jede annehmende Hilfe endet mit Nachgeben."],
        ["Die Hand „ruhig halten“, indem man sie festhält.", "Ruhige Hand entsteht aus einem ausbalancierten Sitz."],
      ),
      richtig: [
        "Halte die Hände aufrecht, eine Handbreit über dem Widerrist, Linie Ellbogen–Hand–Maul.",
        "Gib Zügelhilfen kurz und lass sofort wieder nach.",
        "Begleite jede Zügelhilfe mit Gewicht und Schenkel.",
        "Teste mit Überstreichen, ob das Pferd sich selbst trägt.",
        "Lass das Pferd in jeder Einheit Zügel aus der Hand kauen.",
      ],
      merke: [
        "Linie Ellbogen–Hand–Pferdemaul, aufrechte Fäuste.",
        "Annehmen immer mit Nachgeben verbinden.",
        "Die Verbindung entsteht von hinten, nicht durch Ziehen.",
        "Eine ruhige Hand kommt aus einem ruhigen Sitz.",
      ],
      weiter: weiter(["Grundkurs: Zügel- und Stimmhilfen", "ra-w3-l4"], ["Das Zusammenspiel der Hilfen und halbe Paraden", "ra-w18-l7"], ["Anlehnung, Selbsthaltung und Verbindung", "ra-w18-l8"]),
    },
    exercise: [
      wahl(
        "ra-w18-l6-entscheidung",
        "Beim Überstreichen fällt dein Pferd auf die Vorhand und wird schneller. Was bedeutet das?",
        "Es hat sich am Zügel abgestützt und trägt sich noch nicht selbst",
        [
          ["Das Überstreichen ist zu schwer für jedes Pferd", "Ein Pferd in Selbsthaltung bleibt dabei im Gleichgewicht."],
          ["Die Zügel sind zu lang", "Das Problem ist die fehlende Selbsthaltung, nicht die Zügellänge."],
        ],
        "Richtig. Mehr Übergänge und halbe Paraden über den Sitz helfen.",
      ),
    ],
    quiz: [
      frage("linie", "Welche Linie ist bei der Handhaltung wichtig?", "Ellbogen – Hand – Pferdemaul", [["Knie – Hand – Ohr", "Diese Linie gibt es nicht."], ["Schulter – Hand – Mähne", "Wichtig ist die gerade Verbindung zum Maul."]], "Genau. So wirken die Hilfen geradlinig."),
      frage("durchhalten", "Was ist ein durchhaltender Zügel?", "Die Hand bleibt stehen, ohne zu ziehen, bis das Pferd nachgibt", [["Die Hand zieht dauerhaft nach hinten", "Das wäre eine rückwärtswirkende Hand."], ["Der Zügel wird ganz losgelassen", "Das ist ein nachgebender Zügel."]], "Richtig. Danach gibt auch die Hand nach."),
      frage("verwahrend", "Welche Aufgabe hat der äußere, verwahrende Zügel?", "Er begrenzt Stellung und verhindert das Ausweichen über die äußere Schulter", [["Er lenkt das Pferd nach außen", "Er begrenzt, statt zu lenken."], ["Er hängt durch und hat keine Aufgabe", "Er ist sehr wichtig für die Kontrolle der Schulter."]], "Genau. Er gibt dem Pferd außen Halt."),
      frage("bremsen", "Womit bremst du in erster Linie?", "Mit Paraden über Sitz und Schenkel, der Zügel begleitet", [["Nur mit dem Zügel", "Ziehen allein führt zu Gegendruck."], ["Mit der Stimme allein", "Die Stimme kann unterstützen, ersetzt aber keine Paraden."]], "Richtig. Das Pferd wird von hinten nach vorn durchpariert."),
    ],
  },

  /* ---------- 7. Halbe Paraden ---------- */
  {
    slug: "halbe-paraden",
    title: "Das Zusammenspiel der Hilfen und halbe Paraden",
    speaker: "mila",
    intro:
      "„Halbe Parade!“ – viele Reiter ziehen dann kurz am Zügel. Eine halbe Parade ist aber kein Zügelruck, sondern ein kurzes Zusammenspiel aller Hilfen, das das Pferd aufmerksam macht, ausbalanciert und auf etwas Neues vorbereitet.",
    illustration: tabelle("Halbe Parade", "Was gleichzeitig passiert", [
      ["Hilfe", "Was du tust"],
      ["Gewicht", "kurz aufrichten, tiefer einsitzen"],
      ["Schenkel", "treibt die Hinterhand heran"],
      ["Zügel", "fängt die Energie kurz auf, gibt sofort nach"],
    ]),
    terms: begriffe(
      ["Halbe Parade", "Kurzes Zusammenwirken von Gewicht, Schenkel und Zügel; macht aufmerksam, verbessert die Balance, bereitet Übergänge vor."],
      ["Ganze Parade", "Mehrere halbe Paraden hintereinander bis zum Halten."],
      ["Durch das Genick", "Die Hilfe kommt von hinten über den Rücken bis ins Maul und das Pferd gibt im Genick nach."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Was eine halbe Parade bewirken soll",
          text: "Eine halbe Parade hat mehrere Aufgaben:\n• Aufmerksamkeit: „Achtung, gleich kommt etwas.“\n• Balance: Das Pferd soll mehr Gewicht nach hinten nehmen und sich vorn leichter machen.\n• Vorbereitung: auf Übergänge, Wendungen, Lektionen.\n• Tempo regulieren, ohne die Energie zu verlieren.\n• Versammlung: Viele halbe Paraden hintereinander lassen die Hinterhand mehr Last aufnehmen.\n\nBiomechanisch geht es darum, die Hinterbeine weiter unter den Körper treten zu lassen und die Energie, die dabei entsteht, kurz aufzufangen, sodass sie nicht nach vorn „verpufft“, sondern das Pferd aufrichtet.",
        },
        {
          heading: "Wie sie gegeben wird",
          text: "1. Gewicht: Du richtest dich kurz auf, spannst die Rumpfmuskulatur an und sitzt etwas tiefer ein (beidseitig belastende Gewichtshilfe).\n2. Schenkel: Beide Schenkel treiben gleichzeitig, damit die Hinterbeine weiter untertreten.\n3. Zügel: Die Hand schließt sich kurz (annehmend oder durchhaltend) und fängt die Energie auf.\n4. Nachgeben: Sofort danach gibt die Hand wieder nach, die Spannung im Körper löst sich.\n\nDas Ganze dauert etwa einen Schritt oder einen Trabtritt. Mehrere halbe Paraden können aufeinander folgen. Eine ganze Parade zum Halten besteht aus mehreren halben Paraden, bis das Pferd steht.",
        },
        {
          heading: "Wie es sich richtig anfühlt",
          text: "Wenn eine halbe Parade „durchkommt“, spürst du, wie das Pferd hinten etwas tiefer wird und vorn leichter. Der Hals wölbt sich ein wenig, das Pferd kaut, und das Gewicht in deiner Hand wird für einen Moment leichter statt schwerer. Das Tempo wird ruhiger, ohne dass das Pferd träge wird.\n\nKommt sie nicht durch, wird das Pferd schwerer in der Hand, wirft den Kopf hoch, wird langsam und schlapp oder drückt gegen den Zügel.",
        },
        {
          heading: "Typische Fehler und Ursachen",
          text: "• Nur Zügel: Das Pferd wird vorn kürzer, hinten passiert nichts. Ursache: Gewicht und Schenkel fehlen.\n• Kein Nachgeben: Das Pferd lernt, gegen die Hand zu drücken.\n• Zu lang: Aus der halben Parade wird ein Festhalten.\n• Falsches Timing: Im Trab wirkt die Parade am besten, wenn du im Aussitzen einsitzt bzw. beim Leichttraben im Moment des Hinsetzens.\n• Zu wenig vorbereitet: Ein Pferd, das nicht losgelassen ist, kann die Parade nicht durchlassen – zuerst Takt und Losgelassenheit.\n\nWoran du erkennst, dass es funktioniert: Übergänge werden flüssiger, das Pferd bleibt in der Hand gleichmäßig, es kommt nach der Parade mit mehr Energie, nicht mit weniger.",
        },
        {
          heading: "Übungen",
          text: "• Übergänge, Übergänge, Übergänge: Trab–Schritt–Trab auf dem Zirkel, je zehn Tritte. Vor jedem Übergang eine halbe Parade.\n• Tempounterschiede im Trab: drei Tritte zulegen, dann mit halben Paraden zurückführen.\n• „Fast-Übergang“: Eine halbe Parade, als wolltest du in den Schritt, aber du treibst im letzten Moment weiter – trainiert Aufmerksamkeit ohne Tempoverlust.\n• Halten an markierten Punkten: Wie viele Tritte brauchst du? Ziel: weniger Hilfe, gleiche Wirkung.",
        },
      ],
      praxis: {
        title: "Der Übergang zum Schritt",
        text: "Wenn Ben Tivoli vom Trab in den Schritt pariert, zieht er bisher am Zügel. Tivoli wirft den Kopf hoch, macht den Rücken fest und fällt auf die Vorhand in den Schritt. Die Reitlehrerin lässt ihn den Zügel ganz kurz vergessen: nur aufrichten, tief einsitzen, Schenkel leicht dran. Tivoli wird von allein ruhiger.\n\nDann fügt Ben dazu: Hand kurz schließen, sofort nachgeben. Nach ein paar Versuchen kommt Tivoli in einem ruhigen, gleichmäßigen Schritt an – der Kopf bleibt unten. Ben merkt: Die halbe Parade beginnt im Körper, nicht in der Hand.",
      },
      fehler: fehler(
        ["Halbe Parade nur mit dem Zügel geben.", "Gewicht und Schenkel zuerst, Zügel fängt auf."],
        ["Nach der Parade nicht nachgeben.", "Jede Parade endet mit Nachgeben."],
        ["Eine einzige, lange, starke Parade.", "Mehrere kurze, feine Paraden."],
        ["Parade geben, bevor das Pferd losgelassen ist.", "Erst Takt und Losgelassenheit sichern."],
      ),
      richtig: [
        "Richte dich auf, sitz tiefer ein.",
        "Treibe mit beiden Schenkeln, damit die Hinterhand herankommt.",
        "Schließe die Hand kurz und gib sofort nach.",
        "Wiederhole lieber mehrmals fein als einmal stark.",
        "Übe mit vielen Übergängen und Tempounterschieden.",
      ],
      merke: [
        "Eine halbe Parade ist ein Zusammenspiel aus Gewicht, Schenkel und Zügel.",
        "Sie dauert etwa einen Tritt und endet mit Nachgeben.",
        "Sie macht aufmerksam, balanciert aus und bereitet vor.",
        "Kommt sie durch, wird das Pferd vorn leichter und hinten aktiver.",
      ],
      weiter: weiter(["Grundkurs: Balance und Übergänge", "ra-w6-l4"], ["Anlehnung, Selbsthaltung und Verbindung", "ra-w18-l8"], ["Übergänge und Tempounterschiede", "ra-w18-l11"], ["Lernvideo „Halbe Paraden erklärt“"]),
    },
    exercise: [
      wahl(
        "ra-w18-l7-entscheidung",
        "Nach deiner halben Parade wird das Pferd schwer in der Hand und läuft auf die Vorhand. Was fehlt wahrscheinlich?",
        "Gewicht und Schenkel – die Hinterhand wurde nicht herangetrieben",
        [
          ["Mehr Zug am Zügel", "Mehr Zug macht das Pferd vorn noch schwerer."],
          ["Gar nichts, das ist normal", "Eine gelungene Parade macht das Pferd vorn leichter."],
        ],
        "Richtig. Ohne treibende Hilfen wirkt eine Parade nur vorn.",
      ),
    ],
    quiz: [
      frage("was", "Was ist eine halbe Parade?", "Ein kurzes Zusammenspiel von Gewicht, Schenkel und Zügel", [["Ein kurzer Ruck am Zügel", "Ein Zügelruck allein ist keine halbe Parade."], ["Das Anhalten des Pferdes", "Das ist die ganze Parade."]], "Genau. Sie dauert etwa einen Tritt."),
      frage("ende", "Womit endet jede halbe Parade?", "Mit Nachgeben der Hand", [["Mit festgehaltenem Zügel", "Dann lernt das Pferd, gegen die Hand zu drücken."], ["Mit einem Gertenklaps", "Die Gerte gehört nicht zur halben Parade."]], "Richtig. Das Nachgeben ist die Belohnung."),
      frage("gefuehl", "Wie fühlt sich eine gelungene halbe Parade an?", "Das Pferd wird vorn leichter und hinten aktiver", [["Das Pferd wird schwerer in der Hand", "Das zeigt, dass die Parade nicht durchkam."], ["Das Pferd bleibt stehen", "Eine halbe Parade soll nicht anhalten."]], "Genau. Der Hals wölbt sich leicht, das Pferd kaut."),
      frage("ganze", "Was ist eine ganze Parade?", "Mehrere halbe Paraden bis zum Halten", [["Eine besonders starke halbe Parade", "Stärke ist nicht das Ziel."], ["Eine Parade nur mit dem Zügel", "Auch die ganze Parade braucht alle Hilfen."]], "Richtig. Das Pferd wird von hinten nach vorn zum Halten gebracht."),
    ],
  },

  /* ---------- 8. Anlehnung ---------- */
  {
    slug: "anlehnung-selbsthaltung",
    title: "Anlehnung, Selbsthaltung und Verbindung",
    speaker: "ben",
    intro:
      "Ein Pferd mit hübsch gebogenem Hals, Nase an der Senkrechten – das sieht nach Anlehnung aus. Ob es wirklich Anlehnung ist, zeigt sich aber erst, wenn du die Zügel ein Stück nachgibst. Bleibt das Pferd in Balance und sucht die Hand nach vorn – oder fällt die schöne Form in sich zusammen?",
    illustration: scene("ak-reiter-sitz-hand"),
    terms: begriffe(
      ["Anlehnung", "Weiche, stete Verbindung zwischen Reiterhand und Pferdemaul, die durch das Herantreten des Pferdes von hinten entsteht."],
      ["Selbsthaltung", "Das Pferd trägt Kopf, Hals und sich selbst, ohne sich auf den Zügel zu stützen."],
      ["Hinter der Senkrechten", "Die Stirnlinie des Pferdes zeigt hinter die Senkrechte – das Pferd ist zu eng."],
      ["Falscher Knick", "Der höchste Punkt des Halses liegt nicht am Genick, sondern weiter hinten."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Anlehnung entsteht von hinten",
          text: "Anlehnung ist die dritte Stufe der Ausbildungsskala und baut auf Takt und Losgelassenheit auf. Das Pferd tritt mit der Hinterhand aktiv vor, der schwingende Rücken überträgt die Energie nach vorn, und das Pferd dehnt sich vertrauensvoll an eine ruhige, elastische Hand heran. Es gibt im Genick nach und kaut.\n\nDie Hand stellt die Anlehnung also nicht her – sie bietet sie an. Eine Kopfhaltung, die durch Ziehen, Riegeln oder Hilfszügel erzeugt wird, ist keine Anlehnung, sondern eine Haltung, aus der das Pferd bei der ersten Gelegenheit herausfällt.",
        },
        {
          heading: "Das richtige Bild",
          text: "In der Arbeitshaltung ist das Genick der höchste Punkt, die Stirnlinie befindet sich an oder leicht vor der Senkrechten, der Hals ist vom Widerrist bis zum Genick gleichmäßig gewölbt. Das Maul ist geschlossen, das Pferd kaut leicht, die Verbindung ist auf beiden Seiten gleich.\n\nIn der Dehnungshaltung sucht das Pferd die Hand vorwärts-abwärts, das Maul etwa auf Höhe des Buggelenks. Mit zunehmender Versammlung richtet sich das Pferd relativ auf: Die Aufrichtung entsteht, weil die Hinterhand tiefer wird – nicht, weil die Hand den Kopf hochzieht (absolute Aufrichtung, fehlerhaft).",
        },
        {
          heading: "Typische Anlehnungsfehler",
          text: "• Gegen den Zügel: Das Pferd drückt mit hohem Kopf und weggedrücktem Rücken gegen die Hand. Ursachen: harte Hand, fehlende Losgelassenheit, Schmerz.\n• Auf dem Zügel: Das Pferd stützt sich schwer auf die Hand, läuft auf der Vorhand. Ursachen: fehlende Hinterhandaktivität, ständig festhaltende Hand.\n• Hinter dem Zügel: Das Pferd weicht der Verbindung aus, rollt sich ein, die Zügel hängen. Ursachen: zu harte oder rückwärtswirkende Hand, Hilfszügel, Überforderung.\n• Hinter der Senkrechten und falscher Knick: oft eine Folge von Ziehen und Riegeln.\n• Zungenfehler, offenes Maul, Zähneknirschen: Hinweise auf Unwohlsein, Schmerz oder unpassende Ausrüstung.\n\nDie Ursache liegt fast nie vorn allein: Takt, Losgelassenheit, Hinterhand, Reiterhand und Ausrüstung prüfen.",
        },
        {
          heading: "Selbsthaltung prüfen",
          text: "Ein Pferd in echter Anlehnung trägt sich selbst. Das lässt sich testen:\n\n• Überstreichen: Beide Hände eine Handbreit vorgeben – das Pferd bleibt in Haltung, Takt und Tempo.\n• Zügel-aus-der-Hand-kauen-lassen: Das Pferd dehnt sich vorwärts-abwärts und bleibt im Gleichgewicht.\n• Übergänge: Das Pferd bleibt in der Verbindung, ohne sich hochzuwerfen oder auf die Hand zu legen.\n\nWie sich gute Anlehnung anfühlt: Ein gleichmäßiges, weiches Gewicht in beiden Händen, das mit der Bewegung „atmet“. Du hast das Gefühl, das Pferd zieht dich ein klein wenig nach vorn, ohne zu ziehen.",
        },
        {
          heading: "Übungen",
          text: "• Viele große gebogene Linien im Arbeitstempo, um Losgelassenheit zu sichern.\n• Übergänge zur Aktivierung der Hinterhand.\n• Dehnungsphasen nach jeder Arbeitsreprise.\n• Leichttraben mit ruhiger Hand und Fokus auf gleichmäßigem Takt.\n• Bei Pferden, die hinter dem Zügel gehen: Hand deutlich vorgeben, mehr vorwärts reiten, Pferd die Hand suchen lassen.\n• Bei Pferden, die auf dem Zügel liegen: halbe Paraden über den Sitz und sofortiges Nachgeben, Überstreichen.",
        },
      ],
      praxis: {
        title: "Das eingerollte Pferd",
        text: "Ein Einstellerwallach geht hübsch rund – aber die Nase ist weit hinter der Senkrechten, die Zügel hängen leicht durch. Seine Reiterin ist stolz auf die „Anlehnung“. Die Reitlehrerin bittet sie, Zügel aus der Hand kauen zu lassen. Der Wallach bleibt eingerollt, statt sich nach vorn zu dehnen.\n\nSie arbeiten mehrere Wochen mit nachgebender Hand, mehr Vorwärts, viel Dehnung und Übergängen. Der Wallach lernt, die Hand wieder zu suchen. Die Haltung sieht zuerst „weniger schön“ aus, weil die Nase vor der Senkrechten ist – aber jetzt arbeitet der Rücken, und das Pferd trägt sich selbst.",
      },
      fehler: fehler(
        ["Anlehnung mit der Hand herstellen.", "Von hinten über den schwingenden Rücken entwickeln."],
        ["Ein eingerolltes Pferd für gut in Anlehnung halten.", "Stirnlinie an oder vor der Senkrechten, Genick höchster Punkt."],
        ["Aufrichtung durch Hochziehen der Hand.", "Relative Aufrichtung durch Lastaufnahme der Hinterhand."],
        ["Anlehnungsprobleme nur am Maul suchen.", "Takt, Losgelassenheit, Hinterhand, Reiter und Ausrüstung prüfen."],
      ),
      richtig: [
        "Sichere zuerst Takt und Losgelassenheit.",
        "Biete eine ruhige, elastische Hand an.",
        "Treibe die Hinterhand heran, damit das Pferd an die Hand tritt.",
        "Prüfe Selbsthaltung durch Überstreichen und Zügel-aus-der-Hand-kauen-lassen.",
        "Bei Anlehnungsfehlern Ursache suchen statt Haltung erzwingen.",
      ],
      merke: [
        "Anlehnung entsteht von hinten nach vorn.",
        "Genick höchster Punkt, Stirnlinie an oder vor der Senkrechten.",
        "Selbsthaltung zeigt sich beim Nachgeben.",
        "Aufrichtung kommt aus der Hinterhand, nicht aus der Hand.",
      ],
      weiter: weiter(["Zügelhilfen und korrekte Handhaltung", "ra-w18-l6"], ["Stellung und Biegung richtig verstehen", "ra-w18-l9"], ["Versammlung und Tragkraft", "ra-w18-l19"], ["Lernvideo „Anlehnung verstehen“"]),
    },
    exercise: [
      wahl(
        "ra-w18-l8-entscheidung",
        "Beim Zügel-aus-der-Hand-kauen-lassen bleibt dein Pferd eingerollt und dehnt sich nicht. Was zeigt das?",
        "Es ist nicht in echter Anlehnung, sondern weicht der Hand aus",
        [
          ["Es ist besonders gut in Anlehnung", "Ein Pferd in Anlehnung sucht beim Nachgeben die Hand nach vorn."],
          ["Die Übung ist für dieses Pferd ungeeignet", "Die Übung ist für jedes Pferd ein wichtiger Test."],
        ],
        "Richtig. Mehr vorwärts, Hand vorgeben, Dehnung entwickeln.",
      ),
    ],
    quiz: [
      frage("entsteht", "Wodurch entsteht echte Anlehnung?", "Dadurch, dass das Pferd von hinten an eine ruhige Hand herantritt", [["Durch kurze Zügel", "Kurze Zügel erzeugen keine Anlehnung."], ["Durch Hilfszügel", "Hilfszügel erzeugen eine Haltung, keine Anlehnung."]], "Genau. Die Hand bietet an, das Pferd nimmt an."),
      frage("hoechster", "Was ist in der Arbeitshaltung der höchste Punkt des Halses?", "Das Genick", [["Der Widerrist", "Der Hals soll sich bis zum Genick aufwölben."], ["Die Mitte des Halses", "Das wäre ein falscher Knick."]], "Richtig. Die Stirnlinie ist an oder leicht vor der Senkrechten."),
      frage("hinter", "Was bedeutet „hinter dem Zügel“?", "Das Pferd weicht der Verbindung aus und rollt sich ein", [["Das Pferd drückt gegen die Hand", "Das ist „gegen den Zügel“."], ["Das Pferd stützt sich auf die Hand", "Das ist „auf dem Zügel“."]], "Genau. Oft eine Folge einer zu harten Hand."),
      frage("aufrichtung", "Wie entsteht korrekte Aufrichtung?", "Relativ, durch Lastaufnahme der Hinterhand", [["Absolut, indem die Hand den Kopf hochzieht", "Das ist fehlerhaft und drückt den Rücken weg."], ["Durch einen höheren Sattel", "Der Sattel erzeugt keine Aufrichtung."]], "Richtig. Die Hinterhand wird tiefer, die Vorhand leichter."),
    ],
  },
];
