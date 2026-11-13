import "server-only";
import type { ChoiceStep, StoryStep, Visual } from "@/engine/types";
import { head } from "./build";
import { scene, type AcademyGame } from "./types";

/**
 * Interaktive Übungen der Module 10–14 (Ausbau 13.11.2026):
 * Gesundheitsdetektiv (Pferdegesundheit), Pferdesprache-Quiz (Pferdeverhalten),
 * Gelände-Simulator (Gelände & Ausreiten). Gehören zur Reitakademie (nach Freischaltung).
 */

type Wrong = [label: string, feedback: string];

const card = (label: string, title: string, lines: string[]): Visual => ({ kind: "doc", doc: { style: "note", label, title, lines } });

const choice = (id: string, prompt: string, visual: Visual | undefined, right: string, wrong: Wrong[], explain: string): ChoiceStep => ({
  type: "choice",
  id,
  prompt,
  visual,
  layout: "list",
  options: [{ id: "a", label: right, correct: true }, ...wrong.map(([label, feedback], i) => ({ id: "bcd"[i], label, feedback }))],
  explain,
});

const story = (id: string, text: string, visual?: Visual): StoryStep => ({ type: "story", id, speaker: "erzaehler", text, visual });

/* ---------- Gesundheitsdetektiv ---------- */

const URGENCY = {
  watch: "Beobachten, messen und notieren",
  call: "Tierarzt heute anrufen und beraten lassen",
  now: "Notfall: Tierarzt sofort",
};

const urgency = (id: string, fall: Visual, right: keyof typeof URGENCY, explain: string, why: Partial<Record<keyof typeof URGENCY, string>>): ChoiceStep =>
  choice(
    id,
    "Wie dringend ist das?",
    fall,
    URGENCY[right],
    (Object.keys(URGENCY) as Array<keyof typeof URGENCY>).filter((k) => k !== right).map((k) => [URGENCY[k], why[k] ?? "Das passt nicht zu den Zeichen in diesem Fall."] as Wrong),
    explain,
  );

const gesundheitsdetektiv: AcademyGame = {
  id: "ra-spiel-gesundheitsdetektiv",
  slug: "gesundheitsdetektiv",
  title: "Gesundheitsdetektiv",
  teaser: "Sechs Fälle aus dem Stall: Was siehst du, wie dringend ist es, was tust du?",
  learns: "Krankheitszeichen erkennen, Dringlichkeit einschätzen (beobachten, Tierarzt anrufen, Notfall) und sichere Sofortmaßnahmen wählen – ohne Ferndiagnose und ohne Medikamente.",
  tint: "#E2E6DE",
  cover: scene("ak-sattelzeug"),
  activity: {
    id: "ra-spiel-gesundheitsdetektiv",
    title: "Gesundheitsdetektiv",
    intro: "Sechs Fälle aus dem Stall. Lies genau, schätze ein, wie dringend es ist, und wähle die sichere nächste Handlung. Eine Diagnose stellst du nicht – das macht der Tierarzt.",
    steps: [
      story("start", "Du bist heute Stalldienst. Bei deinem Rundgang fallen dir bei mehreren Pferden Dinge auf. Gehe Fall für Fall vor: beobachten, einordnen, handeln."),
      urgency(
        "fall1",
        card("Fall 1", "Wallach, 14 Jahre, 17 Uhr", ["Scharrt, legt sich hin, steht wieder auf", "Schaut zum Bauch", "Heu vom Mittag nicht angerührt", "Puls 58 / min"]),
        "now",
        "Richtig. Das sind deutliche Kolikzeichen mit erhöhtem Puls – sofort Tierarzt, Futter weg, auf Eigenschutz achten.",
        { watch: "Kolikzeichen mit erhöhtem Puls darf man nicht nur beobachten.", call: "Bei deutlichen Kolikzeichen wartest du nicht auf einen Rückruf – es ist ein Notfall." },
      ),
      choice(
        "fall1-tun",
        "Was tust du bis der Tierarzt kommt?",
        undefined,
        "Futter wegnehmen, nicht in die Box zu einem sich wälzenden Pferd, Werte notieren",
        [
          ["Ein Schmerzmittel aus der Stallapotheke geben", "Medikamente nur nach tierärztlicher Anweisung – sie können wichtige Zeichen verdecken."],
          ["Eine Stunde im Trab longieren", "Starke Belastung hilft nicht und kann schaden."],
        ],
        "Genau. Eigenschutz, Futter weg, beobachten – und genau das an den Tierarzt weitergeben.",
      ),
      urgency(
        "fall2",
        card("Fall 2", "Stute, 9 Jahre, morgens", ["Kleine, trockene Schürfung am Röhrbein", "Keine Schwellung, keine Wärme", "Geht klar, frisst normal"]),
        "watch",
        "Richtig. Oberflächlich, fern von Gelenken, ohne Lahmheit: säubern, beobachten, Tetanusschutz prüfen.",
        { call: "Für eine oberflächliche Schürfung ohne weitere Zeichen ist kein Anruf nötig – aber im Auge behalten.", now: "Das ist kein Notfall." },
      ),
      urgency(
        "fall3",
        card("Fall 3", "Pony, 12 Jahre, Frühling", ["Steht mit nach vorn gestellten Vorderbeinen", "Hufe vorne warm, Zehenarterie pocht", "Will nicht laufen"]),
        "now",
        "Richtig. Das sind typische Hufrehe-Zeichen – ein Notfall. Nicht bewegen, weich stellen, Futter weg, Wasser lassen.",
        { watch: "Hufrehe verschlimmert sich mit jeder Stunde – nicht abwarten.", call: "Bei diesen Zeichen ist es ein Notfall, nicht nur eine Beratung." },
      ),
      choice(
        "fall3-tun",
        "Welche Sofortmaßnahme ist sinnvoll?",
        undefined,
        "Das Pony nicht bewegen, auf weichen Boden stellen, Futter weg, Wasser lassen, Kühlen mit dem Tierarzt absprechen",
        [
          ["Schnell im Trab zum Stall führen", "Bewegung auf hartem Boden kann den Huf weiter schädigen."],
          ["Ein paar Möhren zur Beruhigung geben", "Futter wird weggenommen, bis der Tierarzt entscheidet."],
        ],
        "Genau. Ruhe, weicher Boden und schnelle tierärztliche Hilfe.",
      ),
      urgency(
        "fall4",
        card("Fall 4", "Wallach, 7 Jahre", ["Hustet seit drei Tagen beim Anreiten", "Temperatur 37,8 °C", "Frisst normal, wirkt munter"]),
        "call",
        "Richtig. Kein akuter Notfall, aber anhaltender Husten sollte tierärztlich abgeklärt werden.",
        { watch: "Husten seit mehreren Tagen ist ein Grund, den Tierarzt zu fragen.", now: "Ohne Fieber und Atemnot ist es kein akuter Notfall." },
      ),
      urgency(
        "fall5",
        card("Fall 5", "Stute, 18 Jahre, nach dem Füttern", ["Grünlicher Futterbrei läuft aus beiden Nüstern", "Würgt, streckt den Hals", "Hustet"]),
        "now",
        "Richtig. Das spricht für eine Schlundverstopfung – Futter und Wasser weg, Tierarzt sofort.",
        { watch: "Das Pferd kann nicht schlucken – nicht abwarten.", call: "Hier wird nicht nur beraten, der Tierarzt muss kommen." },
      ),
      choice(
        "fall5-tun",
        "Was tust du?",
        undefined,
        "Futter, Wasser und fressbare Einstreu entfernen, Pferd ruhig halten, Kopf senken lassen",
        [
          ["Mit einer Spritze Wasser ins Maul geben", "Wasser kann in die Lunge gelangen."],
          ["Kräftig am Hals massieren", "Das kann die Speiseröhre verletzen."],
        ],
        "Genau. Nichts ins Maul, Ruhe, Tierarzt.",
      ),
      urgency(
        "fall6",
        card("Fall 6", "Wallach, 11 Jahre", ["Kleine Stichwunde direkt über dem Sprunggelenk", "Blutet kaum", "Geht noch klar"]),
        "call",
        "Richtig. Gelenknahe Wunden müssen zeitnah tierärztlich beurteilt werden – auch wenn sie klein sind. Bei Lahmheit wäre es sofort.",
        { watch: "Gelenknahe Wunden werden oft unterschätzt – das Gelenk könnte betroffen sein.", now: "Solange das Pferd klar geht, ist es dringend, aber nicht unbedingt ein sofortiger Notfall – ruf heute an, wenn es lahmt, sofort." },
      ),
      story("ende", "Fall gelöst! Merke dir: Du beobachtest, misst und informierst. Notfälle sind Kolik, Hufrehe, Schlundverstopfung, starke Blutungen, Atemnot, Festliegen und Lahmheit, bei der ein Bein nicht belastet wird."),
    ],
  },
};

/* ---------- Pferdesprache-Quiz ---------- */

const pferdesprache: AcademyGame = {
  id: "ra-spiel-pferdesprache",
  slug: "pferdesprache-quiz",
  title: "Pferdesprache-Quiz",
  teaser: "Ohren, Augen, Maul, Schweif – was sagt dir dieses Pferd?",
  learns: "Körpersprache im Zusammenhang lesen: Entspannung, Aufmerksamkeit, Stress, Drohung und mögliche Schmerzzeichen unterscheiden.",
  tint: "#E3E7DA",
  cover: scene("ak-zonen"),
  activity: {
    id: "ra-spiel-pferdesprache",
    title: "Pferdesprache-Quiz",
    intro: "Schau genau hin: Welche Stimmung zeigt das Pferd? Denk daran – immer das ganze Pferd und die Situation betrachten.",
    steps: [
      choice("kopf1", "Ohren seitlich und locker, Augen halb geschlossen. Was zeigt dieses Pferd?", head("tonga", "entspannt"), "Entspannung", [["Ärger", "Bei Ärger wären die Ohren flach zurück und das Gesicht angespannt."], ["Angst", "Bei Angst wären Kopf und Ohren hoch und angespannt."]], "Genau. So sieht ein dösendes, entspanntes Pferd aus."),
      choice("kopf2", "Ohren nach vorn gerichtet, Blick offen, Kopf erhoben. Was zeigt dieses Pferd?", head("tivoli", "neugierig"), "Aufmerksamkeit und Neugier", [["Müdigkeit", "Ein müdes Pferd lässt Kopf und Ohren eher hängen."], ["Schmerz", "Schmerz zeigt sich eher in einem angespannten, verkniffenen Gesicht."]], "Richtig. Das Pferd interessiert sich für etwas vor sich."),
      choice("kopf3", "Ohren flach zurückgelegt, Nüstern schmal, Maul angespannt. Was kann das bedeuten?", head("scrabble", "grummelig"), "Abwehr oder Drohung – Abstand halten und Ursache suchen", [["Freude auf das Futter", "Freude sieht anders aus: Ohren nach vorn, wacher Blick."], ["Tiefe Entspannung", "Entspannte Pferde haben lockere, seitliche Ohren."]], "Genau. Achte darauf, was die Ursache ist: Futter, Schmerz, Bedrängnis?"),
      choice("kopf4", "Kopf hoch, Augenweiß sichtbar, Nüstern weit offen. Was zeigt dieses Pferd?", head("tonga", "aufgeregt"), "Starke Aufregung oder Angst", [["Ruhe", "Augenweiß und weite Nüstern sind Zeichen von Anspannung."], ["Langeweile", "Ein gelangweiltes Pferd wirkt eher passiv."]], "Richtig. Jetzt Abstand schaffen und dem Pferd Zeit geben."),
      choice(
        "situation1",
        "Beim Reiten zeigt ein Ohr nach hinten zum Reiter, das Pferd kaut leicht, der Schweif schwingt locker. Was bedeutet das Ohr?",
        card("Situation", "In der Reitstunde", ["Ein Ohr zeigt zum Reiter", "Leichtes Kauen", "Schweif schwingt locker", "Gleichmäßiger Takt"]),
        "Aufmerksamkeit für den Reiter",
        [["Ärger über den Reiter", "Dafür fehlen weitere Anspannungszeichen."], ["Schmerz", "Bei Schmerz würden mehrere Konfliktsignale gleichzeitig auftreten."]],
        "Genau. Das Gesamtbild ist entspannt – das Ohr hört zu.",
      ),
      choice(
        "situation2",
        "Ein Pferd hat steif nach hinten gerichtete Ohren, eine angespannte Partie über den Augen und ein verkniffenes Maul – auch in Ruhe. Woran denkst du?",
        card("Situation", "In der Box", ["Ohren steif nach hinten", "Falten über den Augen", "Kaumuskeln angespannt", "Steht teilnahmslos"]),
        "An mögliche Schmerzen – tierärztlich abklären lassen",
        [["An schlechte Laune", "Diese Kombination entspricht dem Schmerzgesicht (Horse Grimace Scale)."], ["An Müdigkeit", "Müde Pferde haben ein entspanntes, kein angespanntes Gesicht."]],
        "Richtig. Diese Merkmale beschreibt die Horse Grimace Scale als Schmerzzeichen.",
      ),
      choice(
        "situation3",
        "Beim Gurten dreht ein Pferd den Kopf, legt die Ohren an und hebt ein Hinterbein. Was ist richtig?",
        card("Situation", "Am Putzplatz", ["Kopf dreht zum Menschen", "Ohren angelegt", "Hinterbein gehoben"]),
        "Warnsignale ernst nehmen, langsam und in Schritten gurten, Sattel und Rücken prüfen lassen",
        [["Strenger werden, damit es das lässt", "Wer Warnsignale bestraft, verliert die Vorwarnung."], ["Ignorieren und schnell fest gurten", "So wird es beim nächsten Mal schlimmer – und gefährlich."]],
        "Genau. Das Pferd warnt dich – frag nach dem Warum.",
      ),
      choice(
        "situation4",
        "Ein Pferd im Gelände hebt den Kopf, hört auf zu kauen, die Ohren sind starr auf einen Busch gerichtet. Was tust du?",
        card("Situation", "Im Gelände", ["Kopf hoch", "Hört auf zu kauen", "Ohren starr nach vorn", "Muskeln spannen sich"]),
        "Tempo raus, ruhig bleiben, Abstand und Zeit zum Schauen geben",
        [["Zügig vorbeitreiben", "So überschreitest du leicht die Reizschwelle."], ["Mit der Gerte strafen", "Strafe verstärkt die Angst."]],
        "Richtig. Frühe Stresszeichen sind die beste Chance, ruhig zu reagieren.",
      ),
      story("ende", "Gut gelesen! Denk daran: Kein Signal allein – das ganze Pferd und die Situation entscheiden. Und bei wiederkehrenden Anspannungszeichen immer an Schmerz denken."),
    ],
  },
};

/* ---------- Gelände-Simulator ---------- */

const gelaendeSimulator: AcademyGame = {
  id: "ra-spiel-gelaende-simulator",
  slug: "gelaende-simulator",
  title: "Gelände-Simulator",
  teaser: "Ein Ausritt mit Überraschungen: Wie reagierst du?",
  learns: "Typische Situationen im Gelände sicher lösen: Gruppe, Begegnungen, Schreckmomente, Galoppstrecken, Durchgehen und Notfälle.",
  tint: "#E1E6D8",
  cover: scene("ak-reiter-leicht"),
  activity: {
    id: "ra-spiel-gelaende-simulator",
    title: "Gelände-Simulator",
    intro: "Du reitest mit drei Freundinnen und Freunden aus. Unterwegs passiert einiges. Wähle jeweils die sicherste Reaktion.",
    steps: [
      choice(
        "start",
        "Vor dem Losreiten: Was ist am wichtigsten?",
        card("Am Stall", "15:00 Uhr, November", ["Sonnenuntergang 16:30", "Geplant: Waldrunde", "Ein Pferd stand drei Tage"]),
        "Abmelden, kürzere Runde planen und das Pferd, das gestanden hat, vorher kurz auf dem Platz bewegen",
        [["Sofort los, die Zeit ist knapp", "Ohne Abmeldung und mit einem übermütigen Pferd steigt das Risiko."], ["Die lange Runde reiten, zur Not im Dunkeln", "Im Dunkeln im Gelände ist es deutlich gefährlicher."]],
        "Richtig. Gute Vorbereitung verhindert die meisten Probleme.",
      ),
      choice(
        "radfahrer",
        "Auf dem Waldweg nähert sich von hinten schnell ein Mountainbiker. Das Pferd vor dir wird unruhig.",
        undefined,
        "Gruppe warnen, Tempo raus, an den Rand, unsichere Pferde zum Radfahrer drehen, freundlich um Langsamfahrt bitten",
        [["Antraben, damit er nicht überholen kann", "Ein Wettrennen erhöht die Gefahr."], ["Nichts tun", "Ohne Vorbereitung erschrecken die Pferde leicht."]],
        "Genau. Kommunikation und Ruhe lösen die meisten Begegnungen.",
      ),
      choice(
        "galopp",
        "Ihr kommt an einen breiten, leicht ansteigenden Feldweg mit festem Boden. Jemand möchte galoppieren.",
        undefined,
        "Ansage machen, fragen, ob alle bereit sind, ruhig antraben und dann angaloppieren, rechtzeitig durchparieren",
        [["Sofort angaloppieren, die anderen kommen schon mit", "Ohne Ansage können hinten Pferde losstürmen."], ["Wer will, galoppiert vor, die anderen bleiben im Schritt", "Pferde, die zurückbleiben, wollen hinterher."]],
        "Richtig. Ansage, Rückfrage, ruhiges Tempo.",
      ),
      choice(
        "schreck",
        "Ein Reh springt aus dem Gebüsch. Dein Pferd springt zur Seite und steht jetzt angespannt.",
        undefined,
        "Tief sitzen, ausatmen, eine kleine Volte reiten, Abstand schaffen und kurz schauen lassen",
        [["Das Pferd für den Sprung bestrafen", "Es hatte Angst – Strafe macht es schlimmer."], ["Beide Zügel fest anziehen und festhalten", "Dauerzug macht ein ängstliches Pferd oft steifer."]],
        "Genau. Ruhe überträgt sich auf das Pferd.",
      ),
      choice(
        "durchgehen",
        "Ein Pferd in der Gruppe wird nach einem Knall immer schneller und reagiert nicht mehr auf Paraden. Was tun die anderen?",
        undefined,
        "Anhalten und ruhig bleiben, nicht hinterhergaloppieren",
        [["Hinterhergaloppieren, um es einzuholen", "Das treibt das Pferd zusätzlich an."], ["Laut rufen und winken", "Das kann die Panik verstärken."]],
        "Richtig. Die Reiterin auf dem durchgehenden Pferd bleibt sitzen, gibt Paraden mit Nachgeben und lenkt auf einen großen Bogen.",
      ),
      choice(
        "sturz",
        "Eine Mitreiterin stürzt und klagt über Nackenschmerzen und Kribbeln in den Händen.",
        card("Notfall", "Auf dem Waldweg", ["Ansprechbar", "Nackenschmerzen", "Kribbeln in den Händen", "Pferd läuft nicht weg"]),
        "Liegen lassen, beruhigen, Pferde sichern, 112 mit genauem Standort anrufen und auf Rückfragen warten",
        [["Ihr aufhelfen und sie nach Hause führen", "Bei Nackenschmerzen kann Bewegung schwere Schäden verursachen."], ["Den Stall anrufen und abwarten", "Hier braucht es den Rettungsdienst."]],
        "Genau. Nicht bewegen, Notruf, Rettungskräfte einweisen.",
      ),
      choice(
        "heimweg",
        "Auf dem Rückweg, 500 m vor dem Stall, schlägt jemand noch einen Galopp vor.",
        undefined,
        "Nicht galoppieren – Richtung Stall werden viele Pferde schneller und schwer kontrollierbar",
        [["Galoppieren, die Pferde wollen ja nach Hause", "Genau das macht es gefährlich."], ["Galoppieren, aber nur die Erfahrenen", "Die anderen Pferde wollen dann mit."]],
        "Richtig. Im Schritt nach Hause – und wieder zurückmelden.",
      ),
      story("ende", "Ausritt gemeistert! Vorbereitung, klare Gruppenregeln und Ruhe in Schreckmomenten machen das Gelände sicher."),
    ],
  },
};

export const ausbauAcademyGames: AcademyGame[] = [gesundheitsdetektiv, pferdesprache, gelaendeSimulator];
