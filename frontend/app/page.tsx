"use client";

import { useState } from "react";
import { AnimatedSphere } from "@/components/landing/animated-sphere";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    summary?: string;
    dashboard_url?: string;
    status?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/query/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">

      {/* Grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {[...Array(8)].map((_, i) => (
          <div key={`h-${i}`} className="absolute h-px bg-black/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={`v-${i}`} className="absolute w-px bg-black/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
        ))}
      </div>

      {/* Sphere — right side, large */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "72vw",
          height: "72vw",
          maxWidth: "1100px",
          maxHeight: "1100px",
          opacity: 0.55,
        }}
      >
        <AnimatedSphere />
      </div>

      {/* Logo — top left */}
      <div className="relative z-10 px-8 pt-7">
        <span style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em" }}
          className="text-black font-sans">
          BioOracle
        </span>
      </div>

      {/* Main content — left aligned, vertically centered */}
      <div
        className="absolute z-10"
        style={{
          left: "5vw",
          top: "50%",
          transform: "translateY(-50%)",
          width: "72vw",
        }}
      >
        {/* Tagline */}
        <p className="flex items-center gap-3 mb-6"
          style={{ fontSize: "1.20rem", letterSpacing: "0.15em", color: "rgba(0,0,0,0.9)", fontFamily: "monospace", textTransform: "uppercase" }}>
          <span style={{ display: "inline-block", width: "2.5rem", height: "1px", background: "rgba(0,0,0,0.3)" }} />
          The platform for modern teams
        </p>

        {/* Heading — line 1: Where + Medical Literature (grey), all on one line */}
        <div style={{ lineHeight: 1.0, marginBottom: "0.15em" }}>
          <span style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)", fontWeight: 700, color: "#000", fontFamily: "sans-serif" }}>
            Where{" "}
          </span>
          <span className="text-glow-sweep" style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)", fontWeight: 700, fontFamily: "sans-serif" }}>
            Medical Literature
          </span>
        </div>

        {/* Heading — line 2: Becomes Intelligence */}
        <div style={{ lineHeight: 1.0, marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", fontWeight: 700, color: "#000", fontFamily: "sans-serif" }}>
            Becomes Intelligence.
          </span>
        </div>

        {/* Subtext */}
        <p style={{ fontSize: "1.45rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, marginBottom: "2rem", maxWidth: "700px" }}>
          Your toolkit to stop configuring and start innovating.{" "}
          <br />
          Securely fetch, process, and visualize biomedical research.
        </p>
        {/* Chatbox — wide, stretches into sphere */}
        <div
          className="relative chatbox-glow"
          style={{
            width: "90vw",
            maxWidth: "1100px",
            borderRadius: "1.5rem",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: "2.0rem",
            paddingRight: "6.0rem",
          }}
        >
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask to create medical dashboards..."
            style={{
              width: "100%",
              resize: "none",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "1.1rem",
              color: "#070101ff",
              minHeight: "90px",
              fontFamily: "sans-serif",
            }}
            rows={3}
            disabled={loading}
          />
          {/* Send button — large, right side */}
          <button
            onClick={handleSubmit}
            disabled={loading || !query.trim()}
            style={{
              position: "absolute",
              right: "1.2rem",
              bottom: "1.2rem",
              width: "3.2rem",
              height: "3.2rem",
              borderRadius: "50%",
              background: "#000",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: loading || !query.trim() ? 0.3 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? (
              <svg className="animate-spin" style={{ color: "white" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Result area */}
        {error && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#b91c1c", maxWidth: "900px" }}>
            {error}
          </div>
        )}
        {result && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "0.75rem", fontSize: "0.875rem", color: "#000", maxWidth: "900px" }}>
            {result.summary && <p>{result.summary}</p>}
            {result.dashboard_url && (
              <a href={`${API_BASE}${result.dashboard_url}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "0.25rem", textDecoration: "underline", fontWeight: 500 }}>
                View Dashboard →
              </a>
            )}
            {result.status && (
              <span style={{
                fontSize: "0.75rem", padding: "0.1rem 0.5rem", borderRadius: "999px",
                border: `1px solid ${result.status === "success" ? "#86efac" : "#fde68a"}`,
                color: result.status === "success" ? "#15803d" : "#92400e"
              }}>
                {result.status}
              </span>
            )}
          </div>
        )}
      </div>
    </main >
  );
}

