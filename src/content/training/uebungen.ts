/**
 * Übungsbibliothek des Trainingsplaners (seit 14.11.2026).
 *
 * Eine Quelle für Riding Space (Plan-Builder, Einheiten, Bibliothek) und Rider Coach.
 * IDs `ex-…` nie ändern – sie stehen in den Tagebuchdaten der Nutzer (PlanItem.ex).
 *
 * Fachlicher Entwurf: vor der Veröffentlichung von einer Reitlehrkraft prüfen lassen.
 */

export type ExerciseCategory = "sitz" | "hilfen" | "uebergaenge" | "dressur" | "galopp" | "stangen" | "boden" | "gelaende" | "gymn";

export const EXERCISE_CATEGORIES: { id: ExerciseCategory; l: string }[] = [
  { id: "sitz", l: "Sitz & Balance" },
  { id: "hilfen", l: "Hilfengebung" },
  { id: "uebergaenge", l: "Übergänge" },
  { id: "dressur", l: "Dressur" },
  { id: "galopp", l: "Galopp" },
  { id: "stangen", l: "Stangenarbeit" },
  { id: "boden", l: "Bodenarbeit" },
  { id: "gelaende", l: "Geländetraining" },
  { id: "gymn", l: "Gymnastizierung" },
];

export type TrainingExercise = {
  id: string;
  name: string;
  cat: ExerciseCategory;
  /** 1 Einsteiger · 2 Fortgeschritten · 3 Erfahren */
  level: 1 | 2 | 3;
  /** ungefähre Minuten im Hauptteil */
  min: number;
  /** Skizze der Linienführung (Riding Space) */
  fig: "zirkel" | "gerade" | "halt" | "viertel" | "schlange" | "stangen" | "faecher" | null;
  goal: string;
  pre: string;
  steps: string[];
  /** typische Fehler */
  err: string[];
  /** Sicherheitshinweise */
  safe: string[];
  /** Wann abbrechen? */
  stopWhen: string[];
  /** Akademie-Lektionen (ra-…) */
  lessons: string[];
  /** Rider-Lab-Übungen (rl-…) */
  rl: string[];
  /** Merksatz / Worauf achten */
  tip: string;
};

export const EXERCISES: TrainingExercise[] = [
{id:"ex-sitz-1",stopWhen:["Du fühlst dich mit einer Hand am Zügel unsicher","Das Pferd wird eilig oder unaufmerksam"],name:"Balance-Check im Schritt",cat:"sitz",level:1,min:8,fig:"zirkel",goal:"Gleichmäßig auf beiden Gesäßknochen sitzen und die Bewegung des Pferdes zulassen.",pre:"Pferd geht ruhig im Schritt, abgeschlossene Bahn.",
 steps:["Im Schritt auf dem Zirkel reiten, Zügel in die äußere Hand nehmen und leichten Kontakt halten.","Die innere Hand locker auf den eigenen Oberschenkel legen. Spüre nach: Sitzt du auf beiden Gesäßknochen gleich schwer?","Ausatmen und die Beine lang nach unten fallen lassen, ohne die Knie festzuklemmen.","Nach einer Runde Hand wechseln und vergleichen."],
 err:["In der Hüfte nach innen einknicken","Sich mit der Zügelhand festhalten","Die Luft anhalten"],safe:["Nur auf einem ruhigen, vertrauten Pferd","Bei Unsicherheit die Zügel sofort wieder in beide Hände nehmen"],
 lessons:["ra-w2-l1"],rl:["rl-09"],tip:"Ruhig in den Bauch atmen – ein ruhiger Atem macht den Sitz weich."},
{id:"ex-sitz-2",stopWhen:["Du kannst dich nicht mehr halten oder rutschst nach vorn","Die Beine werden müde und unruhig"],name:"Leichter Sitz eine lange Seite halten",cat:"sitz",level:2,min:8,fig:"gerade",goal:"Balance im leichten Sitz finden, ohne sich abzustützen.",pre:"Sicheres Leichttraben.",
 steps:["Im Trab auf der langen Seite in den leichten Sitz gehen: Gesäß leicht aus dem Sattel, Oberkörper etwas vor, Gewicht in die Bügel.","Die Hände ein Stück am Hals entlang vorschieben, bei Bedarf in die Mähne fassen.","Die Fersen federn tief, die Knie bleiben weich.","In der Ecke zurück ins Leichttraben, auf der nächsten langen Seite wiederholen."],
 err:["Der Unterschenkel rutscht nach hinten, der Oberkörper kippt vor","Sich mit den Händen auf dem Hals abstützen","Die Knie festklemmen"],safe:["Bügel vorher ein bis zwei Loch kürzer schnallen","Erst in der Bahn üben, bis die Balance sicher ist"],
 lessons:["ra-w14-l1","ra-w2-l2"],rl:["rl-17","rl-20"],tip:"Der Unterschenkel bleibt am Gurt – er ist dein Fundament."},
{id:"ex-hilfe-1",stopWhen:["Das Pferd reagiert mit Kopfschlagen oder Spannung","Du merkst, dass du nur noch am Zügel ziehst"],name:"Halbe Paraden im Schritt",cat:"hilfen",level:1,min:6,fig:"gerade",goal:"Das Pferd aufmerksam machen, ohne anzuhalten.",pre:"Keine.",
 steps:["Im Mittelschritt auf dem Hufschlag reiten.","Kurz etwas tiefer in den Sattel sitzen, die Schenkel liegen an.","Mit beiden Händen kurz annehmen – und sofort wieder nachgeben.","Das Pferd wird aufmerksamer oder etwas kürzer; danach wieder fleißig vorwärts reiten."],
 err:["Nur am Zügel ziehen, ohne Gewicht und Schenkel","Annehmen, ohne nachzugeben"],safe:["Nicht ruckartig am Zügel arbeiten"],
 lessons:["ra-w3-l1","ra-w4-l4"],rl:["rl-14"],tip:"Annehmen und Nachgeben gehören zusammen – wie Ein- und Ausatmen."},
{id:"ex-hilfe-2",stopWhen:["Das Pferd eilt davon und lässt sich nicht ruhig zurückholen"],name:"Zügel aus der Hand kauen lassen",cat:"hilfen",level:1,min:5,fig:"zirkel",goal:"Prüfen, ob das Pferd losgelassen ist und vertrauensvoll an die Hand herandehnt.",pre:"Pferd geht gleichmäßig im Trab.",
 steps:["Im Leichttraben auf dem Zirkel reiten.","Die Zügel langsam Stück für Stück länger werden lassen.","Das Pferd folgt der Hand mit der Nase vorwärts-abwärts.","Takt und Tempo bleiben gleich; nach einer Runde die Zügel wieder aufnehmen."],
 err:["Die Zügel einfach wegwerfen","Das Pferd eilt davon, das Tempo wird nicht gehalten"],safe:["Nur in ruhiger Umgebung"],
 lessons:["ra-w12-l2"],rl:["rl-14"],tip:"Die Hand gibt nach – der Kontakt bleibt."},
{id:"ex-ueb-1",stopWhen:["Das Pferd wird beim Halten unruhig oder steigt an","Die Übergänge werden von Mal zu Mal abrupter"],name:"Halten an festen Punkten",cat:"uebergaenge",level:1,min:8,fig:"halt",goal:"Ganze Paraden vorbereitet und weich reiten.",pre:"Halbe Paraden sind bekannt.",
 steps:["Zwei Punkte festlegen, zum Beispiel B und E.","Etwa drei Pferdelängen vorher mit halben Paraden ankündigen.","Am Punkt zum Halten durchparieren, 3–5 Sekunden stehen bleiben, die Zügel leicht.","Mit leichter Schenkelhilfe im Schritt wieder antreten."],
 err:["Zu spät vorbereitet – das Halten kommt abrupt","Der Oberkörper kippt nach vorn"],safe:["Genug Abstand zu anderen Reitern halten"],
 lessons:["ra-w4-l4","ra-w6-l4"],rl:["rl-12"],tip:"Plane den Übergang, bevor du ihn reitest."},
{id:"ex-ueb-2",stopWhen:["Das Pferd wird mit jeder Wiederholung eiliger","Du verlierst beim Durchparieren die Balance"],name:"Trab–Schritt–Trab auf dem Zirkel",cat:"uebergaenge",level:2,min:10,fig:"zirkel",goal:"Fließende Übergänge bei gleichbleibender Anlehnung.",pre:"Halten an festen Punkten klappt.",
 steps:["Auf dem Zirkel leichttraben.","An der offenen Zirkelseite zum Schritt durchparieren: Gewicht, Schenkel, Hand – in dieser Reihenfolge.","Eine halbe Runde fleißig Schritt reiten.","Wieder antraben; den Übergang an jedem halben Zirkel wiederholen."],
 err:["Das Pferd fällt auseinander – zu wenig Schenkel","Die Hand hält fest, statt nachzugeben"],safe:["Bei Spannung mehr Schrittphasen einbauen"],
 lessons:["ra-w6-l4"],rl:["rl-09","rl-12"],tip:"Ein guter Übergang beginnt im Sitz, nicht in der Hand."},
{id:"ex-ueb-3",stopWhen:["Das Pferd wird hektisch oder fängt an zu rennen"],name:"Übergänge nach Zählen",cat:"uebergaenge",level:2,min:10,fig:"gerade",goal:"Übergänge planbar machen und den Rhythmus halten.",pre:"Trab–Schritt–Trab klappt sicher.",
 steps:["Auf einer geraden Linie zehn Tritte Trab, dann Schritt.","Zehn Tritte Schritt, dann wieder Trab.","Laut mitzählen hilft.","Wenn es gut klappt, auf acht und später sechs Tritte verkürzen."],
 err:["Zählen, ohne vorzubereiten","Zu früh zu kurze Abstände – das Pferd wird hektisch"],safe:["Nicht zu viele Wiederholungen am Stück – Pausen im Schritt einplanen"],
 lessons:["ra-w12-l1"],rl:["rl-06"],tip:"Weniger Wiederholungen, dafür gute."},
{id:"ex-gal-1",stopWhen:["Das Pferd buckelt, schlägt mit dem Kopf oder wird immer schneller","Du verlierst im Galopp den Sitz","Das Pferd atmet sehr schwer"],name:"Angaloppieren aus dem Trab auf dem Zirkel",cat:"galopp",level:2,min:10,fig:"zirkel",goal:"Im richtigen Galopp an der geplanten Stelle angaloppieren.",pre:"Einige Tritte ausbalanciert aussitzen; das Pferd kennt den Galopp.",
 steps:["Im Trab auf dem Zirkel kurz vor dem offenen Zirkelpunkt aussitzen.","Halbe Parade geben, das Pferd innen leicht stellen.","Der innere Schenkel treibt am Gurt, der äußere liegt eine Handbreit dahinter.","Eine halbe Runde galoppieren, dann ruhig zum Trab durchparieren."],
 err:["Mit dem Oberkörper nach vorn kippen","Das Pferd in einen schnellen Trab treiben, statt Galopp zu fordern","Nach unten schauen"],safe:["Den Gurt vorher nachziehen","Bei Buckeln oder Eile zurück zum Trab und ruhig neu vorbereiten"],
 lessons:["ra-w6-l3","ra-w6-l1"],rl:["rl-11"],tip:"Gut vorbereiten, dann eine klare Hilfe – nicht viele kleine."},
{id:"ex-gal-2",stopWhen:["Das Pferd wird hektisch oder fällt immer wieder auseinander","Das Pferd atmet sehr schwer oder schwitzt stark"],name:"Galopp–Trab–Galopp",cat:"galopp",level:3,min:12,fig:"zirkel",goal:"Kontrollierte Übergänge in den und aus dem Galopp.",pre:"Sicheres Angaloppieren auf beiden Händen.",
 steps:["Auf dem Zirkel angaloppieren.","Nach einer Runde zum Trab durchparieren, zehn Tritte Trab.","An derselben Stelle erneut angaloppieren.","Auf beiden Händen gleich oft üben."],
 err:["Nur mit dem Zügel durchparieren","Zu lange Galoppreprisen – das Pferd ermüdet"],safe:["Bei jungen Pferden: kurze Galoppreprisen, viele Pausen"],
 lessons:["ra-w6-l4"],rl:["rl-11","rl-12"],tip:"Die Pause im Trab ist genauso Training wie der Galopp."},
{id:"ex-dr-1",stopWhen:["Das Pferd wehrt sich deutlich gegen die Stellung"],name:"Zirkel und Volten mit Stellung",cat:"dressur",level:1,min:10,fig:"zirkel",goal:"Das Pferd auf gebogenen Linien gleichmäßig stellen und biegen.",pre:"Keine.",
 steps:["Einen 20-m-Zirkel im Schritt, dann im Trab reiten.","Den inneren Zügel leicht annehmen, bis du das innere Auge des Pferdes erkennst.","Der äußere Zügel begrenzt, der äußere Schenkel verhindert das Ausfallen der Hinterhand.","Aus dem Zirkel eine 15-m-Volte reiten, dann zurück auf den Zirkel."],
 err:["Zu viel innerer Zügel – der Hals knickt ab","Das Pferd drängt über die äußere Schulter"],safe:["Ausreichend Abstand auf dem Zirkel halten"],
 lessons:["ra-w11-l3","ra-w13-l3"],rl:["rl-02"],tip:"Stellung kommt vom inneren Zügel, Biegung vom inneren Schenkel."},
{id:"ex-dr-2",stopWhen:["Das Pferd wird hektisch oder läuft nur noch seitwärts davon"],name:"Schenkelweichen von der Viertellinie",cat:"dressur",level:2,min:10,fig:"viertel",goal:"Vorwärts-seitwärts treiben und das Pferd an den Schenkel stellen.",pre:"Das Pferd kennt die Vorhandwendung.",
 steps:["Im Schritt auf die Viertellinie abwenden und kurz geradeaus reiten.","Das Pferd leicht gegen die Bewegungsrichtung stellen.","Der innere Schenkel treibt eine Handbreit hinter dem Gurt vorwärts-seitwärts.","Den Hufschlag erreichen, geradeaus weiterreiten und loben."],
 err:["Das Pferd läuft mit der Schulter voraus","Zu viel Stellung, der Hals verbiegt sich"],safe:["Zuerst nur im Schritt üben"],
 lessons:["ra-w13-l6"],rl:["rl-19"],tip:"Vorwärts vor seitwärts."},
{id:"ex-dr-3",stopWhen:["Das Pferd verliert den Takt oder verspannt sich deutlich"],name:"Schulterherein im Schritt",cat:"dressur",level:3,min:10,fig:"gerade",goal:"Versammlung vorbereiten und die Hinterhand aktivieren.",pre:"Schenkelweichen sitzt; das Pferd lässt sich stellen und biegen.",
 steps:["Aus einer Ecke heraus die Vorhand etwa einen halben Schritt nach innen führen.","Der innere Schenkel am Gurt hält die Biegung und treibt.","Der äußere Zügel begrenzt die Abstellung.","Nach einer halben langen Seite geradeaus reiten und loben."],
 err:["Nur den Hals nach innen ziehen","Zu stark abstellen – das Pferd verliert den Takt"],safe:["Kurze Reprisen, damit das Pferd nicht verspannt"],
 lessons:["ra-w13-l7"],rl:["rl-02"],tip:"Lieber wenig Abstellung mit gutem Takt."},
{id:"ex-ger-1",stopWhen:["Das Pferd wird unsicher oder eilig ohne Bande"],name:"Geradeaus auf der Viertellinie",cat:"gymn",level:2,min:8,fig:"viertel",goal:"Das Pferd ohne Bande geraderichten.",pre:"Keine.",
 steps:["Auf die Viertellinie abwenden und geradeaus reiten.","Den Blick auf einen festen Punkt am Ende der Linie richten.","Beide Schenkel gleichmäßig, beide Zügel mit leichtem Kontakt.","Abweichungen mit dem Schenkel korrigieren, nicht mit dem Zügel."],
 err:["Nach unten schauen","Mit dem Zügel lenken"],safe:["Auf andere Reiter achten, die den Hufschlag nutzen"],
 lessons:["ra-w13-l3"],rl:["rl-19"],tip:"Dein Blick lenkt mit."},
{id:"ex-gy-1",stopWhen:["Das Pferd wird beim Umstellen hektisch"],name:"Schlangenlinien durch die ganze Bahn",cat:"gymn",level:2,min:10,fig:"schlange",goal:"Umstellen und biegen in beide Richtungen.",pre:"Zirkel mit Stellung klappt.",
 steps:["Drei Bögen durch die ganze Bahn reiten, im Schritt oder Trab.","Beim Überqueren der Mittellinie kurz geradeaus.","Dann Stellung und Biegung in die neue Richtung wechseln.","Im Leichttraben beim Umstellen den Fuß wechseln."],
 err:["Zu früh umstellen","Ungleich große Bögen"],safe:["Rechtzeitig auf andere Reiter achten"],
 lessons:["ra-w11-l3"],rl:["rl-02"],tip:"Erst gerade, dann umstellen."},
{id:"ex-gy-2",stopWhen:["Das Pferd eilt und fällt auf die Vorhand"],name:"Vorwärts-abwärts im Trab",cat:"gymn",level:1,min:8,fig:"zirkel",goal:"Den Rücken des Pferdes lösen.",pre:"Keine.",
 steps:["Auf einem großen Zirkel leichttraben.","Mit weicher Hand das Pferd die Nase nach vorn-unten strecken lassen.","Den Takt gleich halten, nicht eilen lassen.","Zwischendurch die Zügel wieder aufnehmen."],
 err:["Zu schnell – das Pferd läuft auf die Vorhand","Die Hand zieht nach unten"],safe:["Nur in vertrauter, ruhiger Umgebung"],
 lessons:["ra-w12-l2"],rl:["rl-14"],tip:"Die Nase geht nach vorn, nicht nur nach unten."},
{id:"ex-st-1",stopWhen:["Das Pferd stolpert oder springt über die Stangen","Das Pferd wird vor den Stangen eilig"],name:"Trabstangen auf gerader Linie",cat:"stangen",level:1,min:10,fig:"stangen",goal:"Takt, Rhythmus und Balance über Stangen.",pre:"Sicheres Leichttraben.",
 steps:["Drei bis vier Stangen im Abstand von ca. 1,20–1,40 m auf eine gerade Linie legen – den Abstand von der Reitlehrkraft an das Pferd anpassen lassen.","Zuerst im Schritt über die Stangen reiten.","Dann gerade und mittig im Leichttraben anreiten.","Blick nach vorn, ruhige Hände, das Pferd darf den Hals nutzen."],
 err:["Schief anreiten","Zu schnell auf die Stangen zureiten"],safe:["Stangen gegen Wegrollen sichern","Keine Stangen über Kreuz liegen lassen"],
 lessons:["ra-w12-l1"],rl:["rl-06"],tip:"Die Linie beginnt drei Pferdelängen vor der ersten Stange."},
{id:"ex-st-2",stopWhen:["Das Pferd stolpert oder wird hektisch"],name:"Fächerstangen auf dem Zirkel",cat:"stangen",level:2,min:10,fig:"faecher",goal:"Biegung und Rhythmus verbinden.",pre:"Trabstangen auf gerader Linie sitzen.",
 steps:["Drei Stangen fächerförmig auf den Zirkel legen.","Mittig überreiten (ca. 1,30 m Abstand); innen wird der Abstand kürzer, außen länger.","Die Biegung gleichmäßig halten.","Auf beiden Händen gleich oft üben."],
 err:["Das Pferd fällt nach innen","Die Linie wird verlassen"],safe:["Stangen gegen Wegrollen sichern"],
 lessons:["ra-w11-l3"],rl:["rl-02"],tip:"Weiter innen kürzere Tritte, weiter außen längere."},
{id:"ex-bo-1",stopWhen:["Das Pferd drängt, steigt oder wird respektlos – Abstand halten, Fachperson fragen"],name:"Führen: Anhalten und Antreten",cat:"boden",level:1,min:10,fig:null,goal:"Aufmerksamkeit und Respekt vom Boden aus.",pre:"Keine.",
 steps:["Das Pferd auf Schulterhöhe führen, der Führstrick hängt locker.","Selbst stehen bleiben und ausatmen – das Pferd soll mit anhalten.","Wenn nötig, leicht am Strick annehmen und sofort nachgeben, sobald es steht.","Mit Körpersprache wieder antreten. Von beiden Seiten üben."],
 err:["Vor dem Pferd laufen","Dauerhaft am Strick ziehen"],safe:["Handschuhe tragen","Den Strick nie um die Hand wickeln"],
 lessons:["ra-w10-l3","ra-w9-l1"],rl:[],tip:"Deine Körpersprache ist die Hilfe."},
{id:"ex-bo-2",stopWhen:["Das Pferd steigt oder schlägt aus"],name:"Rückwärtsrichten vom Boden",cat:"boden",level:1,min:6,fig:null,goal:"Weichen auf leichte Signale.",pre:"Führen klappt sicher.",
 steps:["Seitlich vor das Pferd stellen.","Mit leichtem Druck am Halfter nach hinten und Körpersprache Richtung Brust.","Jeden Schritt rückwärts sofort mit Nachlassen belohnen.","Zwei bis vier Schritte genügen."],
 err:["Zu viel Druck auf einmal","Das Pferd weicht schief aus"],safe:["Nicht direkt vor das Pferd stellen"],
 lessons:["ra-w9-l1"],rl:[],tip:"Der Druck hört auf, sobald das Pferd nachgibt."},
{id:"ex-bo-3",stopWhen:["Das Pferd lahmt, stolpert oder bockt stark","Du hast die Longe nicht mehr sicher in der Hand"],name:"Longieren mit Übergängen",cat:"boden",level:2,min:20,fig:"zirkel",goal:"Takt und Losgelassenheit ohne Reitergewicht.",pre:"Longieren unter Anleitung gelernt.",
 steps:["Einen Zirkel von mindestens 15 m nutzen, mit Kappzaum oder Trense.","Auf beiden Händen erst Schritt, dann Trab.","Übergänge mit Stimme, Körperhaltung und Longe ankündigen.","Insgesamt ca. 20 Minuten, nach etwa der Hälfte die Hand wechseln."],
 err:["Zu kleiner Zirkel","Die Longe hängt auf dem Boden"],safe:["Handschuhe und feste Schuhe tragen","Die Longe in Schlaufen halten, nie um die Hand wickeln"],
 lessons:["ra-w12-l2"],rl:[],tip:"Kleine Zirkel belasten die Gelenke – lieber groß."},
{id:"ex-ge-1",stopWhen:["Das Pferd wird so aufgeregt, dass du dich unsicher fühlst – absteigen und führen"],name:"Ruhiger Schritt im Gelände",cat:"gelaende",level:1,min:20,fig:null,goal:"Sicherheit und Vertrauen draußen.",pre:"Das Pferd ist geländesicher; Begleitung ist dabei.",
 steps:["Eine bekannte, ruhige Strecke wählen.","Am langen Zügel im Schritt reiten, aber reaktionsbereit bleiben.","Neues ansehen lassen und ruhig weiterreiten.","Kurze Trabstrecken auf geradem, festem Boden einbauen."],
 err:["Zu lange Zügel in unbekannter Umgebung","Angespannt die Luft anhalten"],safe:["Bei Unsicherheit nie allein ins Gelände","Helm tragen, Sicherheitsweste empfohlen, Handy dabei","Jemandem Route und Rückkehrzeit sagen"],
 lessons:["ra-w12-l4"],rl:["rl-19"],tip:"Ausatmen beruhigt euch beide."},
{id:"ex-ge-2",stopWhen:["Der Boden ist rutschig","Das Pferd eilt bergab"],name:"Bergauf und bergab im leichten Sitz",cat:"gelaende",level:2,min:15,fig:null,goal:"Balance im Gelände.",pre:"Der leichte Sitz ist sicher.",
 steps:["Bergauf: leichter Sitz, Oberkörper vor, das Pferd darf den Hals strecken.","Bergab: im Schritt, Oberkörper aufrecht, Gewicht tief in die Absätze.","Gerade bergab reiten, nicht schräg.","Oben und unten kurz durchatmen lassen."],
 err:["Bergab nach hinten lehnen und am Zügel ziehen","Bergauf im Sattel sitzen bleiben"],safe:["Bergab immer im Schritt","Nur bei trockenem, griffigem Boden"],
 lessons:["ra-w14-l1"],rl:["rl-17"],tip:"Bergab gerade und langsam."},
/* ---------- seit 14.11.2026 für den Rider Coach (Angaloppieren) ---------- */
{id:"ex-trab-1",name:"Ruhiges Trabtempo halten",cat:"uebergaenge",level:1,min:8,fig:"zirkel",goal:"Ein gleichmäßiges, ruhiges Trabtempo finden, bevor du etwas Neues verlangst.",pre:"Sicheres Leichttraben.",
 steps:["Auf einem großen Zirkel leichttraben.","Im Rhythmus leise mitzählen: „eins – zwei“ bei jedem Aufstehen und Hinsetzen.","Wird das Pferd schneller, stehst du etwas langsamer auf und gibst eine halbe Parade – nicht dauerhaft am Zügel halten.","Ziel: zwei ganze Runden im gleichen Tempo. Dann Hand wechseln."],
 err:["Mit dem Zügel bremsen statt mit dem Rhythmus des Leichttrabens","Selbst schneller aufstehen, wenn das Pferd eilt"],safe:["Ruhige Bahn ohne viele andere Reiter wählen"],stopWhen:["Das Pferd wird trotz halber Paraden immer schneller – zum Schritt durchparieren und ruhig neu beginnen"],
 lessons:["ra-w5-l2","ra-w12-l1"],rl:["rl-06"],tip:"Dein Rhythmus ist das Metronom für dein Pferd."},
{id:"ex-gal-3",name:"Angaloppieren mit Ansage",cat:"galopp",level:2,min:10,fig:"zirkel",goal:"Das Angaloppieren so vorbereiten, dass das Pferd aus einem ruhigen Trab gelassen anspringt.",pre:"Ruhiges Trabtempo auf dem Zirkel; das Pferd kennt den Galopp.",
 steps:["Auf dem Zirkel im ruhigen Arbeitstempo traben. Einen festen Punkt an der offenen Zirkelseite wählen.","Eine halbe Runde vorher: halbe Parade, aussitzen und innen leicht stellen.","Drei Tritte lang ruhig sitzen und zählen – erst dann eine klare Galopphilfe geben: innerer Schenkel am Gurt, äußerer eine Handbreit dahinter.","Trabt das Pferd nur schneller: nicht nachtreiben. Ruhig durchparieren, eine Runde Trab und neu vorbereiten.","Nach einer halben Runde ruhigem Galopp zum Trab durchparieren und loben."],
 err:["Die Hilfe mehrmals hintereinander geben, bis das Pferd losstürmt","Beim Angaloppieren nach vorn kippen","Am inneren Zügel festhalten"],safe:["Gurt vorher nachziehen","Nur auf einem Zirkel mit genug Platz und Abstand zu anderen Reitern"],stopWhen:["Das Pferd buckelt, steigt oder schlägt mit dem Kopf","Das Pferd wird von Versuch zu Versuch aufgeregter – Schritt am langen Zügel, an einem anderen Tag mit Reitlehrkraft weiterüben"],
 lessons:["ra-w18-l13","ra-w6-l3"],rl:["rl-09"],tip:"Erst Ruhe, dann die Hilfe – einmal, klar und rechtzeitig."},
{id:"ex-gal-4",name:"Kurze Galoppreprisen mit Trabpausen",cat:"galopp",level:2,min:10,fig:"zirkel",goal:"Galopp kurz und ruhig halten, damit das Pferd die Balance behalten kann.",pre:"Angaloppieren auf dem Zirkel klappt meistens.",
 steps:["Auf dem Zirkel angaloppieren.","Nur eine halbe Runde galoppieren, dann ruhig zum Trab durchparieren – bevor das Pferd schneller wird.","Eine ganze Runde ruhig traben, bis das Pferd wieder gelassen ist.","Höchstens drei Wiederholungen pro Hand, dann Schrittpause am langen Zügel."],
 err:["Zu lange galoppieren, bis das Pferd eilig wird","Nach dem Durchparieren sofort wieder angaloppieren"],safe:["Bei jungen oder wenig trainierten Pferden mit einer Viertelrunde beginnen"],stopWhen:["Das Pferd atmet sehr schwer oder schwitzt stark","Das Pferd wird mit jeder Reprise schneller oder stolpert"],
 lessons:["ra-w18-l16","ra-w6-l4"],rl:["rl-11"],tip:"Aufhören, solange es noch gut ist."},
];


export const exerciseById = (id: string): TrainingExercise | undefined => EXERCISES.find((e) => e.id === id);
