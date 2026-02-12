"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fafafa", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ maxWidth: "28rem", width: "100%", background: "white", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#b91c1c", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
            {error.message?.toLowerCase().includes("internal") || error.message?.toLowerCase().includes("500")
              ? "A server error occurred. Check the terminal for details, or try again. If you just set up the project, add DATABASE_URL to frontend/.env.local for database features."
              : error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem", border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: "0.875rem" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
