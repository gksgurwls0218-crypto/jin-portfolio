import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Structural Zone Covering — Data & KPI Lab | Jin",
    description: "The space a man-marking press leaves behind is filled by the far side, as a structure. A defending principle built to deny the switch, with animated pitch diagrams.",
  },
  ko: {
    title: "구조적 존 커버링 — 데이터 & KPI 랩 | Jin",
    description: "맨마킹 압박이 비운 자리를 공이 없는 쪽이 구조로 메운다. 반대 전환을 허락하지 않는 수비 원리, 움직이는 피치 도식과 함께.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Lab entry (moved here from /approach/structural-zone-covering on 2026-10-25;
// the old URL redirects). Self-contained animated HTML document:
// /public/structural-zone-covering(.ko).html, shared player and styles in /public/szc/.
export default async function StructuralZoneCoveringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/structural-zone-covering.ko.html" : "/structural-zone-covering.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title={locale === "ko" ? "구조적 존 커버링" : "Structural Zone Covering"}
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
