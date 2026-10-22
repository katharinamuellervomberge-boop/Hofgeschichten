import "server-only";

/** Ist der E-Mail-Versand für Kündigungsbestätigungen eingerichtet? (siehe /api/kuendigung) */
export function cancellationConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CANCEL_FROM_EMAIL);
}
