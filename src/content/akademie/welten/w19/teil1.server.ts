import "server-only";
import { item } from "../../build";
import { scene } from "../../types";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 14, Lektionen 1–4 */
export const teil1: DeepInput[] = [
  /* ---------- 1. Voraussetzungen ---------- */
  {
    slug: "voraussetzungen-ausreiten",
    title: "Voraussetzungen für sicheres Ausreiten",
    speaker: "ben",
    intro:
      "Auf dem Reitplatz ist alles berechenbar: Zaun, Boden, bekannte Geräusche. Im Gelände kann hinter jeder Kurve etwas Neues warten. Bevor du hinausreitest, solltest du ehrlich prüfen: Sind dein Pferd und du bereit dafür?",
    illustration: item("reiten"),
    terms: begriffe(
      ["Geländesicherheit", "Fähigkeit von Pferd und Reiter, auch bei unerwarteten Situationen ruhig und kontrolliert zu bleiben."],
      ["Rittigkeit", "Wie gut ein Pferd auf die Hilfen reagiert und sich regulieren lässt."],
      ["Sicherheitsweste", "Körperschutz, der bei Stürzen vor Verletzungen von Rücken und Rippen schützen soll."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Was der Reiter können sollte",
          text: "• In allen drei Grundgangarten ausbalanciert sitzen, auch im leichten Sitz.\n• Das Pferd jederzeit anhalten, wenden und das Tempo regulieren – auch wenn es aufgeregt ist.\n• Durchparieren auf engem Raum, eine Volte reiten, einen Fluchtversuch abfangen.\n• Absteigen und Aufsteigen ohne Aufstiegshilfe, im Notfall auch auf der rechten Seite.\n• Ein Pferd sicher führen, auch an Straßen.\n• Ruhig bleiben, wenn etwas Unerwartetes passiert.\n\nAnfänger sollten ihre ersten Ausritte mit einer erfahrenen Begleitperson und einem sehr geländesicheren Pferd machen.",
        },
        {
          heading: "Was das Pferd können sollte",
          text: "• Auf einfache Hilfen zuverlässig reagieren: anhalten, stehen, rückwärts, wenden.\n• Ruhig allein und in der Gruppe gehen, ohne zu drängeln oder zu kleben.\n• Grundlegende Umweltreize kennen: Fahrzeuge, Fahrräder, Hunde, Planen, Wasser.\n• Gesund und konditionell fit sein – Geländeritte sind anstrengender als eine Stunde in der Halle.\n• Sicher geführt werden und stillstehen beim Aufsteigen.\n\nPferde, die noch nie draußen waren, werden schrittweise an das Gelände gewöhnt, zuerst an der Hand, dann mit einem ruhigen Begleitpferd.",
        },
        {
          heading: "Ausrüstung",
          text: "• Reithelm nach aktueller Norm, korrekt verschlossen – immer.\n• Feste Reitstiefel oder Stiefeletten mit Absatz.\n• Handschuhe.\n• Sicherheitsweste, besonders für Jugendliche, Anfänger und bei schwierigem Gelände.\n• Reflektierende Kleidung oder Decken bei schlechter Sicht.\n• Handy am Körper, nicht am Sattel – falls ihr getrennt werdet.\n• Für das Pferd: gut sitzender Sattel, Trense, Halfter mit Strick (z. B. unter der Trense oder am Sattel befestigt).\n\nDie Ausrüstung wird vor jedem Ausritt kontrolliert: Gurt, Steigbügelriemen, Zügel, Verschnallungen.",
        },
        {
          heading: "Versicherung und Haftung",
          text: "Pferdehalter haften in Deutschland für Schäden, die ihr Pferd verursacht – auch ohne eigenes Verschulden. Eine Pferdehaftpflichtversicherung ist deshalb sehr wichtig. Wer ein fremdes Pferd reitet (Reitbeteiligung, Schulpferd), sollte klären, ob die Versicherung des Halters auch Fremdreiter einschließt.\n\nEine private Unfallversicherung für Reiter ist ebenfalls sinnvoll. Für Kinder und Jugendliche gilt: Ausritte nur mit Einverständnis der Erziehungsberechtigten und in Begleitung erfahrener Erwachsener.",
        },
      ],
      praxis: {
        title: "Die Checkliste vor dem ersten Ausritt",
        text: "Mila möchte zum ersten Mal mit Tonga ausreiten. Bevor es losgeht, geht Hanna mit ihr eine Checkliste durch: Kann Mila Tonga im Galopp auf dem Platz zuverlässig durchparieren? Ja. Steht Tonga beim Aufsteigen ohne Aufstiegshilfe? Noch nicht sicher – sie üben zwei Tage. Kennt Tonga Fahrräder und Traktoren? Ja.\n\nAm Samstag reiten sie zu dritt, mit Tivoli als ruhigem Führpferd, eine kurze Runde im Schritt. Mila trägt Helm, Weste und das Handy in der Jackentasche.",
      },
      fehler: fehler(
        ["Ohne Helm ausreiten, „nur ein kurzes Stück“.", "Helm immer, korrekt verschlossen."],
        ["Mit einem unerfahrenen Pferd allein ins Gelände.", "Schrittweise, mit ruhigem Begleitpferd."],
        ["Handy in der Satteltasche.", "Handy am Körper tragen."],
        ["Ausrüstung nicht kontrollieren.", "Vor jedem Ritt Gurt, Riemen und Zügel prüfen."],
      ),
      richtig: [
        "Prüfe ehrlich deine eigenen Fähigkeiten.",
        "Prüfe, ob dein Pferd geländesicher, gesund und fit ist.",
        "Trage Helm, feste Schuhe, Handschuhe und bei Bedarf Sicherheitsweste.",
        "Trage das Handy am Körper.",
        "Kläre Versicherungsschutz.",
        "Beginne mit kurzen Ausritten in Begleitung.",
      ],
      merke: [
        "Ins Gelände nur, wenn Reiter und Pferd die Grundlagen sicher beherrschen.",
        "Helm immer – Handy am Körper.",
        "Pferdehalter haften – Haftpflichtversicherung ist wichtig.",
        "Schrittweise beginnen, mit erfahrener Begleitung.",
      ],
      weiter: weiter(["Einen Ausritt richtig vorbereiten", "ra-w19-l2"], ["Warum wir einen Reithelm tragen", "ra-w1-l2"], ["Sicherer im Sattel werden", "ra-w12-l4"]),
    },
    exercise: [
      wahl(
        "ra-w19-l1-entscheidung",
        "Du möchtest zum ersten Mal ausreiten. Dein Pferd war noch nie im Gelände. Was ist am sichersten?",
        "Das Pferd erst an der Hand und mit einem ruhigen Begleitpferd an das Gelände gewöhnen",
        [
          ["Allein losreiten, dann lernt es am schnellsten", "Allein und unvorbereitet ist das Risiko hoch."],
          ["Gleich in einer großen Gruppe mitreiten und galoppieren", "Eine große, schnelle Gruppe kann ein unerfahrenes Pferd überfordern."],
        ],
        "Richtig. Schrittweise Gewöhnung gibt Sicherheit.",
      ),
    ],
    quiz: [
      frage("helm", "Was gilt für den Reithelm im Gelände?", "Immer tragen, korrekt verschlossen", [["Nur beim Galoppieren", "Unfälle passieren auch im Schritt."], ["Nur bei Turnieren", "Im Gelände ist das Risiko eher höher."]], "Genau. Ohne Ausnahme und immer korrekt verschlossen."),
      frage("handy", "Wo trägst du dein Handy beim Ausreiten?", "Am Körper", [["In der Satteltasche", "Wenn du vom Pferd fällst, ist es mit dem Pferd weg."], ["Zu Hause", "Im Notfall brauchst du es."]], "Richtig. So kannst du nach einem Sturz Hilfe rufen."),
      frage("haftung", "Warum ist eine Pferdehaftpflichtversicherung wichtig?", "Weil Pferdehalter für Schäden haften, die ihr Pferd verursacht", [["Weil sie den Tierarzt bezahlt", "Dafür gibt es andere Versicherungen."], ["Sie ist nicht wichtig", "Schäden können sehr teuer werden."]], "Genau. Auch ohne eigenes Verschulden."),
    ],
  },

  /* ---------- 2. Vorbereitung ---------- */
  {
    slug: "ausritt-vorbereiten",
    title: "Einen Ausritt richtig vorbereiten",
    speaker: "lea",
    intro:
      "Die meisten Probleme im Gelände entstehen nicht unterwegs, sondern schon vorher: falsche Route, schlechtes Wetter, niemand weiß Bescheid, das Pferd ist seit Tagen nicht bewegt worden. Gute Vorbereitung dauert zehn Minuten – und macht den Ausritt sicherer.",
    illustration: item("zettel"),
    terms: begriffe(
      ["Abmelden", "Jemandem mitteilen, wann man losreitet, welche Route man nimmt und wann man zurück sein will."],
      ["Rettungspunkt", "Nummerierter Treffpunkt im Wald, der Rettungskräften bekannt ist."],
      ["Notfallkarte", "Karte mit Namen, Notfallkontakten, Vorerkrankungen und Angaben zum Pferd."],
    ),
    deep: {
      minutes: 7,
      sections: [
        {
          heading: "Route und Wetter",
          text: "Wähle die Route passend zu Pferd, Reiter, Kondition und Jahreszeit. Plane Länge und Dauer realistisch: Im Schritt legt ein Pferd etwa 5 bis 7 km pro Stunde zurück. Kenne die Wege: Wo darf geritten werden? Wo gibt es Straßenüberquerungen, Brücken, Bahnübergänge, steile Stellen?\n\nPrüfe das Wetter: Gewitter, Sturm, Glatteis und Hitze sind Gründe, den Ausritt zu verschieben. Nach starkem Regen sind manche Wege rutschig oder tief. Im Herbst und Winter wird es früh dunkel – plane die Rückkehr deutlich vor der Dämmerung.",
        },
        {
          heading: "Abmelden und Notfallvorsorge",
          text: "Sag immer jemandem Bescheid, bevor du losreitest: Route, Begleitung, voraussichtliche Rückkehr. Melde dich zurück, wenn du wieder da bist. Kommt jemand nicht pünktlich zurück, weiß der Stall, wo gesucht werden muss.\n\nNimm eine Notfallkarte mit: Name, Notfallkontakt, wichtige Vorerkrankungen oder Allergien, Name und Stall des Pferdes. Speichere die Nummer deines Stalls und die 112 im Handy. In vielen Wäldern gibt es Rettungspunkte – merke dir den nächsten an deiner Strecke. Standortfreigabe im Handy kann im Notfall helfen.",
        },
        {
          heading: "Pferd vorbereiten",
          text: "• Ist das Pferd gesund? Kurzcheck vor dem Satteln.\n• Wurde es in den letzten Tagen bewegt? Ein Pferd, das tagelang gestanden hat, ist im Gelände oft übermütig – lieber erst auf dem Platz oder an der Longe abreagieren.\n• Hufe ausgekratzt, Eisen fest? Hufschuhe bei Bedarf.\n• Bei Hitze oder Insekten: Fliegenschutz, Wasserpausen planen.\n• Bei Dämmerung: Reflektoren, Leuchtgamaschen, Stiefellampe.",
        },
        {
          heading: "Was mitkommt",
          text: "• Handy (geladen) am Körper\n• Notfallkarte\n• Kleines Erste-Hilfe-Set für Mensch und Pferd (Binde, Wundauflage, Handschuhe)\n• Hufkratzer\n• Strick oder Halfter für das Pferd\n• Bei längeren Ritten: Wasser, Snack, Regenjacke\n\nWeniger ist mehr: Alles, was am Sattel herumbaumelt, kann verrutschen oder das Pferd erschrecken.",
        },
      ],
      praxis: {
        title: "Die Whiteboard-Regel",
        text: "Im Stall hängt neben der Sattelkammer ein Whiteboard. Wer ausreitet, schreibt drauf: Name, Pferd, Route, Abfahrt, geplante Rückkehr. Ben schreibt: „Ben, Tivoli, Waldrunde über die Mühle, 14:00, zurück 15:30.“\n\nAls Ben um 16:00 noch nicht zurück ist, ruft Mats ihn an. Ben hat einen Platten am Hufschuh und führt Tivoli langsam zurück. Alles in Ordnung – aber wäre er gestürzt, hätte Mats genau gewusst, wo er suchen muss.",
      },
      fehler: fehler(
        ["Ohne Bescheid zu sagen losreiten.", "Immer abmelden: Route, Begleitung, Rückkehr."],
        ["Ein Pferd nach Tagen Stehzeit direkt ins Gelände reiten.", "Erst auf dem Platz oder an der Longe bewegen."],
        ["Bei Gewitterwarnung trotzdem los.", "Ausritt verschieben."],
        ["Zu lange Strecken planen und in die Dämmerung geraten.", "Realistisch planen, früh zurück sein."],
      ),
      richtig: [
        "Plane Route und Dauer realistisch.",
        "Prüfe Wetter und Tageslicht.",
        "Melde dich ab und wieder an.",
        "Nimm Handy, Notfallkarte und kleines Erste-Hilfe-Set mit.",
        "Prüfe Gesundheit, Hufe und Ausrüstung des Pferdes.",
        "Bewege ein „frisches“ Pferd vorher auf dem Platz.",
      ],
      merke: [
        "Immer abmelden und zurückmelden.",
        "Gewitter, Sturm, Glatteis: zu Hause bleiben.",
        "Handy am Körper, Notfallkarte dabei.",
        "Ein Pferd mit viel Stehzeit erst auf dem Platz bewegen.",
      ],
      weiter: weiter(["Voraussetzungen für sicheres Ausreiten", "ra-w19-l1"], ["Sicheres Reiten in der Gruppe", "ra-w19-l3"], ["Unfälle, Stürze und Notfälle beim Ausritt", "ra-w19-l11"]),
    },
    exercise: [
      wahl(
        "ra-w19-l2-entscheidung",
        "Es ist 15:30 Uhr im November, Sonnenuntergang gegen 16:30 Uhr. Du planst einen zweistündigen Ausritt. Was tust du?",
        "Eine kürzere Runde wählen, damit du deutlich vor der Dämmerung zurück bist",
        [
          ["Trotzdem die lange Runde reiten, es wird schon reichen", "Im Dunkeln im Gelände steigt das Unfallrisiko deutlich."],
          ["Die Runde im Galopp abkürzen", "Tempo erhöht das Risiko, statt es zu senken."],
        ],
        "Richtig. Realistisch planen ist Teil der Sicherheit.",
      ),
    ],
    quiz: [
      frage("abmelden", "Was gehört zum Abmelden?", "Route, Begleitung und geplante Rückkehrzeit", [["Nur der Name", "Ohne Route weiß niemand, wo gesucht werden muss."], ["Nichts, wenn man erfahren ist", "Auch erfahrenen Reitern passieren Unfälle."]], "Genau. Und nach der Rückkehr wieder anmelden."),
      frage("tempo", "Wie viele Kilometer legt ein Pferd im Schritt ungefähr pro Stunde zurück?", "Etwa 5 bis 7 km", [["Etwa 20 km", "Das wäre eher im Trab."], ["Etwa 1 km", "Das ist viel zu langsam."]], "Richtig. Wichtig für die Planung."),
      frage("frisch", "Dein Pferd stand drei Tage. Was ist vor dem Ausritt sinnvoll?", "Es zuerst auf dem Platz oder an der Longe bewegen", [["Direkt im Gelände galoppieren, damit es sich austobt", "Im Gelände ist ein übermütiges Pferd schwer zu kontrollieren."], ["Gar nicht ausreiten", "Mit Vorbereitung ist der Ausritt möglich."]], "Genau. Ein übermütiges Pferd ist im Gelände ein Risiko."),
    ],
  },

  /* ---------- 3. Gruppe ---------- */
  {
    slug: "reiten-in-der-gruppe",
    title: "Sicheres Reiten in der Gruppe",
    speaker: "mila",
    intro:
      "Gemeinsam auszureiten macht Spaß und gibt vielen Pferden Sicherheit. Gleichzeitig steigt das Risiko: Wenn ein Pferd erschrickt, erschrecken oft alle. Gruppenregeln sorgen dafür, dass aus einem kleinen Schreck kein Chaos wird.",
    illustration: scene("ak-bahn-abteilung"),
    terms: begriffe(
      ["Tete", "Das vorderste Pferd einer Gruppe; Reiter bestimmt Tempo und Weg."],
      ["Schlusslicht", "Das letzte Pferd; Reiter behält die Gruppe im Blick."],
      ["Abstand", "Im Gelände mindestens eine Pferdelänge zum Vordermann."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Rollen in der Gruppe",
          text: "• Tete (vorn): eine erfahrene Person auf einem ruhigen, zuverlässigen Pferd. Sie bestimmt Tempo und Weg und kündigt Gangartwechsel und Hindernisse rechtzeitig an.\n• Schlusslicht (hinten): ebenfalls erfahren. Achtet darauf, dass niemand zurückbleibt, und meldet Probleme nach vorn.\n• Dazwischen: weniger erfahrene Reiter und unsichere Pferde.\n\nPferde, die schlagen, bekommen eine rote Schleife in den Schweif und reiten hinten. Junge Pferde bekommen eine grüne Schleife und brauchen besonders viel Rücksicht.",
        },
        {
          heading: "Die wichtigsten Regeln",
          text: "• Tempo richtet sich nach dem schwächsten Reiter und Pferd.\n• Abstand: mindestens eine Pferdelänge, im Trab und Galopp mehr.\n• Gangartwechsel werden angekündigt („Wir traben an!“) und nach hinten weitergegeben.\n• Niemand überholt ohne Absprache, niemand reitet vor oder „schießt“ an anderen vorbei.\n• Hindernisse, Löcher, Fahrzeuge werden nach hinten gemeldet.\n• Wer ein Problem hat, ruft laut – die Gruppe hält an.\n• Nach einem Galopp wird gemeinsam im Schritt durchpariert, und die Tete schaut zurück.\n• Niemand reitet allein vor, niemand bleibt allein zurück.",
        },
        {
          heading: "Warum diese Regeln so wichtig sind",
          text: "Pferde sind Herdentiere. In der Gruppe übertragen sich Stimmung und Tempo: Wird vorne getrabt, will hinten jeder mit. Galoppiert ein Pferd los, folgen die anderen oft. Ein Pferd, das zurückbleibt, versucht aufzuholen – manchmal in vollem Tempo.\n\nDeshalb sind langsame, angekündigte Gangartwechsel und ein Tempo, das alle halten können, so entscheidend. Abstand verhindert, dass Pferde sich gegenseitig auf die Hufe treten oder schlagen.",
        },
        {
          heading: "Rücksicht auf andere",
          text: "• Auf schmalen Wegen hintereinander reiten, auf breiten nur nebeneinander, wenn genug Platz ist und niemand behindert wird.\n• Fußgängern, Radfahrern und Fahrzeugen freundlich begegnen: im Schritt passieren, bedanken.\n• An Straßen geschlossen und hintereinander reiten.\n• Wer im Gelände Spaziergänger oder Hunde trifft, kündigt sich an und reduziert das Tempo.",
        },
      ],
      praxis: {
        title: "Der ungeplante Galopp",
        text: "Eine Gruppe von fünf Reitern ist unterwegs. An einer Wiese galoppiert die Tete ohne Ankündigung an. Hinten sitzt Lea auf Tivoli, der sofort losschießt, und ein Einstellerpony, das ganz hinten allein bleibt, beginnt zu buckeln, weil es den Anschluss verliert.\n\nAls alle wieder stehen, besprechen sie den Vorfall. Ab sofort gilt: Galopp nur nach Ansage, nach Rückfrage, ob alle bereit sind, und das Schlusslicht gibt das Okay. Beim nächsten Ausritt klappt es ruhig und geordnet.",
      },
      fehler: fehler(
        ["Ohne Ankündigung die Gangart wechseln.", "Laut ankündigen und nach hinten weitergeben."],
        ["Zu dicht auffahren.", "Mindestens eine Pferdelänge Abstand."],
        ["Tempo nach dem schnellsten Pferd richten.", "Nach dem schwächsten Reiter und Pferd."],
        ["Ein Pferd allein zurücklassen.", "Gruppe wartet, Schlusslicht achtet darauf."],
      ),
      richtig: [
        "Lege Tete und Schlusslicht fest – beide erfahren.",
        "Kündige jeden Gangartwechsel an und gib ihn weiter.",
        "Halte Abstand, überhole nicht ohne Absprache.",
        "Richte das Tempo nach dem schwächsten Paar.",
        "Melde Gefahren nach hinten.",
        "Kennzeichne schlagende Pferde mit roter Schleife.",
      ],
      merke: [
        "Tete und Schlusslicht sind erfahren.",
        "Gangartwechsel nur nach Ansage.",
        "Mindestens eine Pferdelänge Abstand.",
        "Das schwächste Paar bestimmt das Tempo.",
      ],
      weiter: weiter(["Abteilungsreiten und Kommandos", "ra-w11-l7"], ["Sicher traben und galoppieren im Gelände", "ra-w19-l8"], ["Herdenverhalten und soziale Beziehungen", "ra-w17-l5"]),
    },
    exercise: [
      wahl(
        "ra-w19-l3-entscheidung",
        "Du reitest als Tete und möchtest auf einem breiten Weg traben. Was tust du?",
        "Laut ankündigen, nach hinten fragen, ob alle bereit sind, und dann ruhig antraben",
        [
          ["Einfach antraben, die anderen merken es schon", "Ohne Ankündigung können hinten Pferde losstürmen."],
          ["Kurz angaloppieren, um zu zeigen, wo es langgeht", "Ein unangekündigter Galopp ist für die Gruppe gefährlich."],
        ],
        "Richtig. Ansage, Rückfrage, ruhiger Wechsel.",
      ),
    ],
    quiz: [
      frage("schleife", "Was bedeutet eine rote Schleife im Schweif?", "Das Pferd schlägt – Abstand halten", [["Das Pferd ist jung", "Das zeigt eine grüne Schleife."], ["Das Pferd hat Geburtstag", "Die rote Schleife ist ein Warnsignal."]], "Genau. Solche Pferde reiten meist hinten."),
      frage("abstand", "Wie viel Abstand hältst du mindestens im Gelände?", "Eine Pferdelänge", [["Gar keinen, damit die Gruppe zusammenbleibt", "Ohne Abstand drohen Tritte und Unfälle."], ["Hundert Meter", "So weit auseinander verliert man den Kontakt."]], "Richtig. Im Trab und Galopp mehr."),
      frage("tempo", "Wer bestimmt das Tempo in der Gruppe?", "Das schwächste Reiter-Pferd-Paar", [["Das schnellste Pferd", "So wird es für andere gefährlich."], ["Wer gerade Lust hat", "Das Tempo muss für alle passen."]], "Genau. Die Tete richtet sich danach."),
    ],
  },

  /* ---------- 4. Verkehr und Recht ---------- */
  {
    slug: "verkehrsregeln-reitrecht",
    title: "Verkehrsregeln, Waldwege und Reitrecht",
    speaker: "ben",
    intro:
      "Darf ich auf dem Radweg reiten? Und im Wald auf jedem Weg? Viele Reiter wissen es nicht genau – und in Deutschland ist die Antwort tatsächlich kompliziert: Manches regelt der Bund, vieles jedes Bundesland selbst.",
    illustration: tabelle("Reitrecht", "Bund und Länder", [
      ["Ebene", "Was gilt"],
      ["Bund: StVO", "Reiter gelten im Straßenverkehr sinngemäß als Fahrverkehr"],
      ["Bund: Bundeswaldgesetz", "Reiten im Wald nur auf Straßen und Wegen, auf eigene Gefahr"],
      ["Länder", "Regeln die Einzelheiten: welche Wege, Kennzeichnung, Reitplakette"],
      ["Vor Ort", "Kreise und Gemeinden können Wege sperren oder freigeben"],
    ]),
    terms: begriffe(
      ["StVO", "Straßenverkehrs-Ordnung; bundesweit gültig."],
      ["Reitweg-Schild", "Verkehrszeichen mit Reiter auf blauem Grund; der Weg ist für Reiter bestimmt."],
      ["Reitkennzeichen", "Plakette am Pferd, die in manchen Bundesländern (z. B. Nordrhein-Westfalen) für das Reiten in Wald und Landschaft vorgeschrieben ist."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Im Straßenverkehr: StVO (bundesweit)",
          text: "Nach § 28 der Straßenverkehrs-Ordnung gelten für Reiter und für Personen, die Pferde führen, die Regeln des Fahrverkehrs sinngemäß. Das heißt unter anderem:\n\n• Auf der Fahrbahn wird rechts geritten, nicht auf Gehwegen oder Radwegen.\n• Ist ein Reitweg ausgeschildert, ist er zu nutzen.\n• Verkehrszeichen und Ampeln gelten auch für Reiter.\n• Handzeichen beim Abbiegen helfen anderen Verkehrsteilnehmern.\n• Wer ein Pferd auf der Straße führt, geht am rechten Fahrbahnrand und links vom Pferd – also zwischen Pferd und Verkehr. So hast du das Pferd unter Kontrolle, und es kann nicht unbemerkt auf die Fahrbahn drängen.\n\nBei Dämmerung und Dunkelheit muss beim Führen eines Pferdes eine Leuchte mit weißem Licht mitgeführt werden. Für Reiter werden Stiefellampen (vorn weiß, hinten rot), Reflektoren und Warnwesten dringend empfohlen.",
        },
        {
          heading: "Im Wald: Bundeswaldgesetz und Landesrecht",
          text: "Das Bundeswaldgesetz legt in § 14 fest, dass Reiten im Wald nur auf Straßen und Wegen erlaubt ist und auf eigene Gefahr geschieht. Die Einzelheiten regeln die Bundesländer – und die Unterschiede sind groß:\n\n• In manchen Ländern ist Reiten auf Straßen und geeigneten Wegen erlaubt (z. B. Bayern, Baden-Württemberg mit Ausnahmen für schmale Wanderwege).\n• In anderen ist Reiten nur auf ausgewiesenen und gekennzeichneten Reitwegen erlaubt (z. B. Sachsen).\n• In Nordrhein-Westfalen braucht man zusätzlich ein Reitkennzeichen am Pferd.\n\nKreise und Gemeinden können außerdem einzelne Wege sperren oder freigeben. Informiere dich deshalb beim Landesreiterverband, beim Kreis oder beim Forstamt, was in deiner Region gilt.",
        },
        {
          heading: "Feld, Wiese und Privatgrund",
          text: "Das Reiten in der freien Landschaft regeln ebenfalls die Länder in ihren Naturschutz- oder Landschaftsgesetzen. Allgemein gilt: auf Wegen bleiben, nicht über Wiesen, Felder und Saaten reiten, Privatgrund nur mit Erlaubnis betreten. Schutzgebiete können besondere Verbote haben.\n\nWer Schäden an Wegen oder Flächen verursacht, haftet dafür. Rücksicht auf Landwirte, Förster und andere Erholungssuchende hält die Wege für Reiter offen.",
        },
        {
          heading: "Begegnungen und Verhalten",
          text: "• Fußgänger haben auf gemeinsamen Wegen Vorrang. Im Schritt passieren, Abstand halten, freundlich grüßen.\n• Radfahrer: Blickkontakt suchen, um langsame Vorbeifahrt bitten.\n• Fahrzeuge: Handzeichen geben, wenn nötig um Langsamfahrt bitten, bedanken.\n• Jäger: Bei Treibjagden im Herbst und Winter informieren und betroffene Gebiete meiden.\n\nDieser Text ist eine Orientierung, keine Rechtsberatung. Maßgeblich sind die aktuellen Gesetze von Bund und Land und die Regeln vor Ort.",
        },
      ],
      praxis: {
        title: "Urlaub mit Pferd in NRW",
        text: "Hanna plant mit Lea und Ben einen Wanderritt, der zwei Tage durch Nordrhein-Westfalen führt. Beim Planen stellt sie fest: Dort brauchen die Pferde ein Reitkennzeichen, und in manchen Waldgebieten ist das Reiten nur auf gekennzeichneten Reitwegen erlaubt.\n\nSie leiht über die Kreisverwaltung Kennzeichen für Urlauber aus, plant die Route anhand der Reitwegekarten und meldet die Gruppe beim Quartier an. Unterwegs gibt es keine Diskussion mit dem Förster – alles ist geregelt.",
      },
      fehler: fehler(
        ["Auf Rad- oder Gehwegen reiten.", "Auf der Fahrbahn rechts oder auf ausgeschilderten Reitwegen."],
        ["Annehmen, dass im Wald überall geritten werden darf.", "Landesrecht und Regeln vor Ort prüfen."],
        ["Querfeldein über Wiesen und Felder reiten.", "Auf Wegen bleiben, Privatgrund nur mit Erlaubnis."],
        ["Bei Dämmerung ohne Licht und Reflektoren reiten.", "Leuchte, Reflektoren, Warnweste."],
      ),
      richtig: [
        "Kenne die StVO-Grundregeln für Reiter.",
        "Informiere dich über das Waldrecht deines Bundeslandes.",
        "Prüfe, ob ein Reitkennzeichen nötig ist.",
        "Bleibe auf erlaubten Wegen.",
        "Sei bei Dämmerung gut sichtbar.",
        "Begegne anderen freundlich und rücksichtsvoll.",
      ],
      merke: [
        "Im Straßenverkehr gelten für Reiter die Regeln des Fahrverkehrs (StVO).",
        "Im Wald nur auf Straßen und Wegen – Einzelheiten regelt jedes Bundesland.",
        "In manchen Ländern ist ein Reitkennzeichen Pflicht.",
        "Rücksicht hält die Wege für Reiter offen.",
      ],
      weiter: weiter(["Begegnungen mit Hunden, Radfahrern und Wildtieren", "ra-w19-l10"], ["Einen Ausritt richtig vorbereiten", "ra-w19-l2"]),
    },
    exercise: [
      wahl(
        "ra-w19-l4-entscheidung",
        "Du willst in einem anderen Bundesland ausreiten. Was tust du vorher?",
        "Beim Landesreiterverband, Kreis oder Forstamt nachfragen, welche Wege erlaubt sind und ob ein Kennzeichen nötig ist",
        [
          ["Nichts – es gilt überall dasselbe", "Die Regeln unterscheiden sich von Land zu Land deutlich."],
          ["Einfach überall reiten, wo kein Verbotsschild steht", "In manchen Ländern ist Reiten nur auf gekennzeichneten Reitwegen erlaubt."],
        ],
        "Richtig. Das Landesrecht entscheidet über die Einzelheiten.",
      ),
    ],
    quiz: [
      frage("stvo", "Wo reitest du auf einer Straße ohne Reitweg?", "Auf der Fahrbahn rechts", [["Auf dem Gehweg", "Gehwege sind für Fußgänger."], ["Auf dem Radweg", "Radwege sind für Radfahrer."]], "Genau. Für Reiter gelten die Regeln des Fahrverkehrs sinngemäß."),
      frage("wald", "Was sagt das Bundeswaldgesetz zum Reiten im Wald?", "Nur auf Straßen und Wegen, auf eigene Gefahr – Einzelheiten regeln die Länder", [["Reiten im Wald ist überall erlaubt", "Querwaldein ist nicht erlaubt."], ["Reiten im Wald ist bundesweit verboten", "Es ist erlaubt, aber geregelt."]], "Richtig. Darum unterscheiden sich die Regeln je nach Bundesland."),
      frage("kennzeichen", "Wo ist zum Beispiel ein Reitkennzeichen vorgeschrieben?", "In Nordrhein-Westfalen", [["In ganz Deutschland", "Es ist Ländersache."], ["Nirgends", "In manchen Ländern ist es Pflicht."]], "Genau. Für Urlauber gibt es Leihkennzeichen."),
    ],
  },
];
