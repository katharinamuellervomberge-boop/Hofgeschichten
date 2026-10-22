import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { provider as p } from "@/content/legal";

export const metadata: Metadata = { title: "Impressum" };

export default function Page() {
  return (
    <LegalPage title="Impressum" subtitle="Angaben gemäß § 5 DDG">
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
        <p>Vertreten durch die Geschäftsführung: {p.representative}</p>
        <p>Hof Stories ist ein digitales Angebot der {p.company}.</p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: <a href={p.phoneHref}>{p.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${p.email}`}>{p.email}</a>
        </p>
      </LegalSection>

      <LegalSection heading="Handelsregister">
        <p>
          Registergericht: {p.registerCourt}
          <br />
          Registernummer: {p.registerNumber}
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer">
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {p.vatId}</p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV">
        <p>
          Soweit anwendbar: {p.representative}
          <br />
          Anschrift wie oben.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
