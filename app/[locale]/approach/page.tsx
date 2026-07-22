import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Approach — Variation Theory | Jin",
    description: "The full Variation Theory philosophy — answering the four questions it started from, with live animated diagrams.",
  },
  ko: {
    title: "변이 이론, Variation Theory | Jin",
    description: "변이 이론 철학의 전문 — 출발점이 된 네 개의 질문에 답하며, 살아 움직이는 애니메이션 다이어그램과 함께.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// The philosophy is authored as a self-contained animated HTML document
// (13 canvas animations), embedded so every animation runs exactly as built.
// Korean version: /public/variation-philosophy.ko.html — a full Korean
// translation of the same document, same animations, same structure.
export default async function ApproachPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/variation-philosophy.ko.html" : "/variation-philosophy.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Variation Theory — the full philosophy"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
