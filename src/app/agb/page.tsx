import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { provider as p, terms } from "@/content/legal";

export const metadata: Metadata = { title: "AGB" };

export default function Page() {
  return (
    <LegalPage
      title={terms.title}
      subtitle={
        <>
          {terms.subtitle}
          <br />
          {terms.asOf}
        </>
      }
    >
      {terms.sections.map((s) => (
        <LegalSection key={s.heading} heading={s.heading}>
          {s.blocks.map((b, i) => (
            <div key={i} style={{ display: "grid", gap: "var(--space-2)" }}>
              {b.subheading && <h3>{b.subheading}</h3>}
              {b.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          ))}
        </LegalSection>
      ))}

      <LegalSection heading="Anbieter">
        <address>
          {p.company}
          <br />
          {p.street}
          <br />
          {p.city}
          <br />
          {p.country}
        </address>
        <p>
          Kontakt: <a href={`mailto:${p.email}`}>{p.email}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
