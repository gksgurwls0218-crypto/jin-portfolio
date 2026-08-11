import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Was it the penetration, or the pressing? — Korea vs Jordan | Jin",
    description:
      "AFC Asian Cup Qatar 2023. Two claims tested in order: did the fall in penetration cause the drop in performance, or did the opponent's pressing?",
  },
  ko: {
    title: "침투가 원인이었나, 압박이 원인이었나 — 대한민국 vs 요르단 | Jin",
    description:
      "AFC 아시안컵 카타르 2023. 두 개의 가설을 순서대로 검증한다 — 침투 감소가 원인인가, 상대의 압박 방식이 원인인가.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Authored as a self-contained HTML document (19 inline-SVG figures + its own
// type/colour system), embedded the same way /approach embeds the philosophy —
// so the figures render exactly as built instead of being re-implemented in MDX.
// Korean: /public/korea-jordan.ko.html · English: /public/korea-jordan.html
export default async function KoreaJordanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/korea-jordan.ko.html" : "/korea-jordan.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Korea Republic vs Jordan — match analysis"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
