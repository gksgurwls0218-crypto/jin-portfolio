import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approach — Variation Theory | Jin",
  description: "The full Variation Theory philosophy — answering the four questions it started from, with live animated diagrams.",
};

// The philosophy is authored as a self-contained animated HTML document
// (13 canvas animations). It is embedded here so every animation runs exactly
// as built. Source: /public/approach/variation-philosophy.html (KPI section removed).
export default function ApproachPage() {
  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src="/variation-philosophy.html"
        title="Variation Theory — the full philosophy"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
