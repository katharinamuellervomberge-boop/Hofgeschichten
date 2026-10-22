import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { provider } from "@/content/legal";
import { CancelForm } from "@/features/parents/CancelForm";
import { cancellationConfigured } from "@/lib/cancellation";

export const metadata: Metadata = { title: "Verträge hier kündigen" };
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <LegalPage title="Verträge hier kündigen" subtitle="Kündigung Ihrer Hof-Mitgliedschaft – ohne Anmeldung">
      <CancelForm online={cancellationConfigured()} email={provider.email} />
    </LegalPage>
  );
}
