import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Cross → shot was half of it — Suwon Samsung, re-examined | Jin",
    description:
      "A revision of my own report. Three corrections drawn from 279 shot coordinates and 23 pass matrices: the leak has two cut points, not one; the route I named had already fixed itself; and the 554 crosses included set pieces.",
  },
  ko: {
    title: "「크로스 → 슈팅」은 절반이었다 — 수원 삼성 재검증 | Jin",
    description:
      "내 리포트를 내가 고친다. 슈팅 좌표 279개와 패스 매트릭스 23경기로 얻은 세 가지 정정 — 결손 구간의 절단면은 하나가 아니라 둘이고, 내가 지목한 경로는 이미 스스로 고쳐지고 있었으며, 크로스 554회에는 세트피스가 섞여 있었다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Authored as a self-contained HTML document (four inline SVG figures plus its own
// type/colour system), embedded the same way /match-analysis/suwon-cross-shot is.
// Korean: /public/suwon-revision.ko.html · English: /public/suwon-revision.html
export default async function SuwonRevisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/suwon-revision.ko.html" : "/suwon-revision.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Suwon Samsung — the report, revised"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
