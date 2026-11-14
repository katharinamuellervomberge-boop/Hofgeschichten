import type { CoachCategory, CoachProblemInfo } from "./types";

/** Kategorien A–F der Problembibliothek */
export const COACH_CATEGORIES: CoachCategory[] = [
  { id: "sitz", letter: "A", title: "Reitersitz & Balance", text: "Sitz, Bein, Hände, Balance" },
  { id: "hilfen", letter: "B", title: "Hilfengebung", text: "Schenkel, Zügel, Paraden, Anlehnung" },
  { id: "trab-galopp", letter: "C", title: "Trab & Galopp", text: "Tempo, Angaloppieren, Galopp" },
  { id: "biegung", letter: "D", title: "Balance, Stellung & Biegung", text: "Schulter, Zirkel, Wendungen" },
  { id: "dressur", letter: "E", title: "Dressur & weiterführend", text: "Seitengänge, Versammlung, Wechsel" },
  { id: "gelaende", letter: "F", title: "Gelände & Verhalten", text: "Erschrecken, Gruppe, Ausritt" },
];

/**
 * Problembibliothek – 50 typische Reitprobleme. IDs cp-01 … cp-50 nie ändern (stehen in Nutzerdaten).
 * `ready`: vollständiger Coaching-Fall vorhanden (cases/). Weitere Fälle: Inhalt in cases/ anlegen und in
 * cases/index.ts eintragen – `ready` wird daraus berechnet.
 */
const LIST: Omit<CoachProblemInfo, "ready">[] = [
  { id: "cp-01", slug: "kippe-beim-reiten-nach-vorne", title: "Ich kippe beim Reiten nach vorne.", category: "sitz", terms: ["kippe nach vorne", "oberkörper vor", "vornüber", "falle nach vorne", "nach vorn gebeugt"] },
  { id: "cp-02", slug: "bein-rutscht-nach-hinten", title: "Mein Bein rutscht nach hinten.", category: "sitz", terms: ["bein rutscht nach hinten", "unterschenkel hinten", "bein nach hinten", "schenkel rutscht"] },
  { id: "cp-03", slug: "unterschenkel-sind-unruhig", title: "Meine Unterschenkel sind unruhig.", category: "sitz", terms: ["unruhige beine", "schenkel wackelt", "bein klappert", "unterschenkel unruhig"] },
  { id: "cp-04", slug: "verliere-im-trab-die-balance", title: "Ich verliere im Trab die Balance.", category: "sitz", terms: ["balance trab", "gleichgewicht trab", "wackle im trab", "unsicher trab"] },
  { id: "cp-05", slug: "sitze-beim-aussitzen-nicht-ruhig", title: "Ich sitze beim Aussitzen nicht ruhig.", category: "sitz", terms: ["aussitzen", "hüpfe", "werde geworfen", "sitze nicht ruhig", "trab aussitzen"] },
  { id: "cp-06", slug: "haende-sind-unruhig", title: "Meine Hände sind unruhig.", category: "sitz", terms: ["unruhige hände", "hände wackeln", "hand unruhig", "hände springen", "zügelhand"] },
  { id: "cp-07", slug: "ziehe-unbewusst-am-zuegel", title: "Ich ziehe unbewusst am Zügel.", category: "sitz", terms: ["ziehe am zügel", "zügel ziehen", "hand zieht", "festhalten zügel", "rückwärts wirkende hand"] },
  { id: "cp-08", slug: "verliere-im-galopp-meinen-sitz", title: "Ich verliere im Galopp meinen Sitz.", category: "sitz", terms: ["sitz galopp", "rutsche im galopp", "galopp sitzen", "hüpfe galopp"] },
  { id: "cp-09", slug: "klemme-mit-den-knien", title: "Ich klemme mit den Knien.", category: "sitz", terms: ["knie klemmen", "knieschluss", "knie fest", "klemme"] },
  { id: "cp-10", slug: "habe-schwierigkeiten-mit-dem-leichten-sitz", title: "Ich habe Schwierigkeiten mit dem leichten Sitz.", category: "sitz", terms: ["leichter sitz", "springsitz", "entlastungssitz", "halbsitz"] },
  { id: "cp-11", slug: "reagiert-nicht-auf-den-schenkel", title: "Mein Pferd reagiert nicht auf den Schenkel.", category: "hilfen", terms: ["reagiert nicht auf schenkel", "faul", "träge", "geht nicht vorwärts", "treiben bringt nichts", "stumpf"] },
  { id: "cp-12", slug: "reagiert-zu-stark-auf-meine-hilfen", title: "Mein Pferd reagiert zu stark auf meine Hilfen.", category: "hilfen", terms: ["überreagiert", "zu empfindlich", "schießt los", "zu stark reagiert"] },
  { id: "cp-13", slug: "uebergaenge-funktionieren-nicht", title: "Meine Übergänge funktionieren nicht.", category: "hilfen", terms: ["übergänge", "durchparieren", "antraben klappt nicht", "übergang"] },
  { id: "cp-14", slug: "bleibt-beim-anhalten-nicht-stehen", title: "Mein Pferd bleibt beim Anhalten nicht stehen.", category: "hilfen", terms: ["anhalten", "steht nicht", "halten klappt nicht", "läuft weiter"] },
  { id: "cp-15", slug: "bekomme-keine-konstante-anlehnung", title: "Ich bekomme keine konstante Anlehnung.", category: "hilfen", terms: ["anlehnung", "kontakt zügel", "anlehnung schwankt", "anlehnung finden"] },
  { id: "cp-16", slug: "wird-hinter-dem-zuegel-eng", title: "Mein Pferd wird hinter dem Zügel eng.", category: "hilfen", terms: ["hinter dem zügel", "eng", "kriecht hinter den zügel", "rollt sich ein"] },
  { id: "cp-17", slug: "laeuft-gegen-die-hand", title: "Mein Pferd läuft gegen die Hand.", category: "hilfen", terms: ["gegen die hand", "zieht", "kopf hoch", "drückt gegen gebiss", "stark in der hand"] },
  { id: "cp-18", slug: "halben-paraden-funktionieren-nicht", title: "Meine halben Paraden funktionieren nicht.", category: "hilfen", terms: ["halbe parade", "paraden", "parade wirkt nicht"] },
  { id: "cp-19", slug: "wird-im-trab-immer-schneller", title: "Mein Pferd wird im Trab immer schneller.", category: "trab-galopp", terms: ["trab schneller", "eilt im trab", "rennt im trab", "tempo trab", "davonlaufen trab"] },
  { id: "cp-20", slug: "faellt-immer-wieder-aus-dem-trab", title: "Mein Pferd fällt immer wieder aus dem Trab.", category: "trab-galopp", terms: ["fällt aus dem trab", "trabt nicht weiter", "schritt statt trab", "bleibt nicht im trab"] },
  { id: "cp-21", slug: "galoppiert-nicht-an", title: "Mein Pferd galoppiert nicht an.", category: "trab-galopp", terms: ["galoppiert nicht an", "springt nicht an", "angaloppieren klappt nicht", "kein galopp"] },
  { id: "cp-22", slug: "rennt-beim-angaloppieren-los", title: "Mein Pferd rennt beim Angaloppieren los.", category: "trab-galopp", terms: ["rennt los", "stürmt los", "angaloppieren schnell", "eilig angaloppieren", "schießt los galopp", "rast beim angaloppieren", "trabt schneller statt galopp"] },
  { id: "cp-23", slug: "springt-im-falschen-galopp-an", title: "Mein Pferd springt im falschen Galopp an.", category: "trab-galopp", terms: ["falscher galopp", "außengalopp ungewollt", "falsche hand galopp"] },
  { id: "cp-24", slug: "faellt-aus-dem-galopp", title: "Mein Pferd fällt aus dem Galopp.", category: "trab-galopp", terms: ["fällt aus dem galopp", "galopp hört auf", "trabt zurück"] },
  { id: "cp-25", slug: "wird-im-galopp-zu-schnell", title: "Mein Pferd wird im Galopp zu schnell.", category: "trab-galopp", terms: ["galopp zu schnell", "rast im galopp", "galopp eilig", "galopp bremsen"] },
  { id: "cp-26", slug: "galoppiert-auf-einer-hand-schlechter", title: "Mein Pferd galoppiert auf einer Hand schlechter.", category: "trab-galopp", terms: ["eine hand galopp", "linke hand galopp", "rechte hand galopp", "schlechte seite galopp"] },
  { id: "cp-27", slug: "springt-im-kreuzgalopp", title: "Mein Pferd springt im Kreuzgalopp.", category: "trab-galopp", terms: ["kreuzgalopp", "disgalopp", "galopp durcheinander"] },
  { id: "cp-28", slug: "kann-im-galopp-nicht-richtig-mitsitzen", title: "Ich kann im Galopp nicht richtig mitsitzen.", category: "trab-galopp", terms: ["mitsitzen galopp", "galopp mitgehen", "galoppsitz", "mitschwingen"] },
  { id: "cp-29", slug: "faellt-ueber-die-aeussere-schulter", title: "Mein Pferd fällt über die äußere Schulter.", category: "biegung", terms: ["äußere schulter", "fällt über die schulter", "schulter fällt aus", "drängt nach außen"] },
  { id: "cp-30", slug: "faellt-auf-die-innere-schulter", title: "Mein Pferd fällt auf die innere Schulter.", category: "biegung", terms: ["innere schulter", "fällt nach innen", "zirkel wird kleiner", "drängt nach innen"] },
  { id: "cp-31", slug: "laesst-sich-schlecht-stellen", title: "Mein Pferd lässt sich schlecht stellen.", category: "biegung", terms: ["stellung", "lässt sich nicht stellen", "stellen klappt nicht"] },
  { id: "cp-32", slug: "biegt-sich-nicht-richtig", title: "Mein Pferd biegt sich nicht richtig.", category: "biegung", terms: ["biegung", "biegt sich nicht", "steif", "längsbiegung"] },
  { id: "cp-33", slug: "laeuft-auf-einer-hand-schlechter", title: "Mein Pferd läuft auf einer Hand schlechter.", category: "biegung", terms: ["eine hand schlechter", "schiefe", "schwierige seite", "einseitig"] },
  { id: "cp-34", slug: "draengt-zur-bande", title: "Mein Pferd drängt zur Bande.", category: "biegung", terms: ["drängt zur bande", "klebt an der bande", "bande"] },
  { id: "cp-35", slug: "laeuft-auf-dem-zirkel-nicht-gleichmaessig", title: "Mein Pferd läuft auf dem Zirkel nicht gleichmäßig.", category: "biegung", terms: ["zirkel ungleichmäßig", "zirkel eckig", "zirkel rund"] },
  { id: "cp-36", slug: "wird-in-wendungen-schneller", title: "Mein Pferd wird in Wendungen schneller.", category: "biegung", terms: ["wendung schneller", "ecken schneller", "volte eilig", "kurve schneller"] },
  { id: "cp-37", slug: "schenkelweichen-funktioniert-nicht", title: "Mein Schenkelweichen funktioniert nicht.", category: "dressur", terms: ["schenkelweichen", "seitwärts", "weicht nicht"] },
  { id: "cp-38", slug: "verliert-beim-schulterherein-den-takt", title: "Mein Pferd verliert beim Schulterherein den Takt.", category: "dressur", terms: ["schulterherein", "takt seitengang"] },
  { id: "cp-39", slug: "wird-bei-seitengaengen-hektisch", title: "Mein Pferd wird bei Seitengängen hektisch.", category: "dressur", terms: ["seitengänge hektisch", "travers", "renvers", "traversale"] },
  { id: "cp-40", slug: "laesst-sich-schlecht-geraderichten", title: "Mein Pferd lässt sich schlecht geraderichten.", category: "dressur", terms: ["geraderichten", "schief", "geradeaus"] },
  { id: "cp-41", slug: "uebergaenge-sind-nicht-fliessend", title: "Meine Übergänge sind nicht fließend.", category: "dressur", terms: ["übergänge fließend", "übergänge holprig", "abrupt"] },
  { id: "cp-42", slug: "verliert-bei-tempounterschieden-die-balance", title: "Mein Pferd verliert bei Tempounterschieden die Balance.", category: "dressur", terms: ["tempounterschiede", "zulegen", "einfangen", "verstärken"] },
  { id: "cp-43", slug: "faellt-bei-der-versammlung-auseinander", title: "Mein Pferd fällt bei der Versammlung auseinander.", category: "dressur", terms: ["versammlung", "versammeln", "auseinanderfallen"] },
  { id: "cp-44", slug: "versteht-die-galoppwechsel-nicht", title: "Mein Pferd versteht die Galoppwechsel nicht.", category: "dressur", terms: ["galoppwechsel", "fliegender wechsel", "einfacher wechsel"] },
  { id: "cp-45", slug: "erschrickt-haeufig", title: "Mein Pferd erschrickt häufig.", category: "gelaende", terms: ["erschrickt", "scheut", "schreckhaft", "schreckt"] },
  { id: "cp-46", slug: "moechte-nicht-alleine-ins-gelaende", title: "Mein Pferd möchte nicht alleine ins Gelände.", category: "gelaende", terms: ["alleine ausreiten", "allein ins gelände", "klebt", "will nicht weg"] },
  { id: "cp-47", slug: "wird-in-der-gruppe-hektisch", title: "Mein Pferd wird in der Gruppe hektisch.", category: "gelaende", terms: ["gruppe hektisch", "gruppenausritt", "andere pferde aufgeregt"] },
  { id: "cp-48", slug: "moechte-nicht-von-anderen-pferden-weg", title: "Mein Pferd möchte nicht von anderen Pferden weg.", category: "gelaende", terms: ["kleben", "herdentrieb", "will zu den anderen"] },
  { id: "cp-49", slug: "bleibt-vor-bestimmten-gegenstaenden-stehen", title: "Mein Pferd bleibt vor bestimmten Gegenständen stehen.", category: "gelaende", terms: ["bleibt stehen", "verweigert", "geht nicht vorbei", "gegenstände"] },
  { id: "cp-50", slug: "wird-beim-ausreiten-zu-schnell", title: "Mein Pferd wird beim Ausreiten zu schnell.", category: "gelaende", terms: ["ausreiten schnell", "rennt im gelände", "ausritt zu schnell", "heimwärts"] },
];

import { COACH_CASES } from "./cases";

export const COACH_PROBLEMS: CoachProblemInfo[] = LIST.map((p) => ({ ...p, ready: p.id in COACH_CASES }));

export const problemById = (id: string) => COACH_PROBLEMS.find((p) => p.id === id);
export const problemBySlug = (slug: string) => COACH_PROBLEMS.find((p) => p.slug === slug);
