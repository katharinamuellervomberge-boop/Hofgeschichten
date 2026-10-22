import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { withdrawal as w } from "@/content/legal";

export const metadata: Metadata = { title: "Widerrufsbelehrung" };

export default function Page() {
  return (
    <LegalPage
      title={w.title}
      subtitle={
        <>
          {w.subtitle}
          <br />
          {w.asOf}
        </>
      }
    >
      {w.sections.map((s) => (
        <LegalSection key={s.heading} heading={s.heading}>
          {s.paragraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </LegalSection>
      ))}
      <LegalSection heading={w.form.heading}>
        <p>{w.form.intro}</p>
        {w.form.lines.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </LegalSection>
    </LegalPage>
  );
}
