import Link from "next/link";
import { Horse } from "@/components/illustrations/Horse";
import { horses } from "@/content/horses";

export default function NotFound() {
  return (
    <div className="page" style={{ textAlign: "center", display: "grid", gap: "1.25rem", justifyItems: "center" }}>
      <div style={{ width: "min(280px, 80%)", marginTop: "2rem" }}>
        <Horse look={horses[1].look} uid="nf" />
      </div>
      <h1>Hier ist nur Weide.</h1>
      <p>Diese Seite gibt es nicht.</p>
      <Link
        href="/"
        style={{
          display: "inline-grid",
          placeItems: "center",
          minHeight: 56,
          padding: "0 1.5rem",
          borderRadius: 999,
          background: "var(--forest)",
          color: "#fbf8f1",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Zurück zum Hof
      </Link>
    </div>
  );
}
