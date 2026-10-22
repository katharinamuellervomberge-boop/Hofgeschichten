import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { privacyAsOf, privacyText } from "@/content/datenschutz";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

/** **fett** und Links im Fließtext */
function inline(t: string): ReactNode[] {
  return t.split(/(\*\*[^*]+\*\*|https?:\/\/\S+)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part))
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    return part;
  });
}

type Section = { heading: string; blocks: string[][] };

function parse(text: string): Section[] {
  const sections: Section[] = [];
  for (const chunk of text.split(/\n(?=## )/)) {
    const lines = chunk.split("\n");
    const head = lines[0].replace(/^## /, "").trim();
    const blocks = lines
      .slice(1)
      .join("\n")
      .split(/\n\s*\n/)
      .map((b) => b.split("\n").map((l) => l.replace(/\s+$/, "")).filter(Boolean))
      .filter((b) => b.length && !(b.length === 1 && /^\*\*Stand:/.test(b[0])));
    if (head && !head.startsWith("**Stand")) sections.push({ heading: head, blocks });
  }
  return sections;
}

export default function Page() {
  const sections = parse(privacyText);
  return (
    <LegalPage title="Datenschutzerklärung" subtitle={<>Hof Stories – Die Hofgeschichten<br />{privacyAsOf}</>}>
      {sections.map((s) => (
        <LegalSection key={s.heading} heading={s.heading}>
          {s.blocks.map((b, i) =>
            b.every((l) => l.startsWith("- ")) ? (
              <ul key={i}>
                {b.map((l) => (
                  <li key={l}>{inline(l.slice(2))}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>
                {b.map((l, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {inline(l)}
                  </span>
                ))}
              </p>
            ),
          )}
        </LegalSection>
      ))}
    </LegalPage>
  );
}
