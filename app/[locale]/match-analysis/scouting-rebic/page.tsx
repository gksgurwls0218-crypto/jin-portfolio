import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Ante Rebić — one more Seo Jin-su type | Jin",
    description:
      "Scouting report: Ante Rebić (free agent, 33) as a second multi-role left forward of the Seo Jin-su type — 130 players screened across five routes. Web edition of the 25-slide report, in English and Korean.",
  },
  ko: {
    title: "안테 레비치 — 서진수 유형 한 명 더 | Jin",
    description:
      "스카웃팅 리포트: 서진수 유형의 두 번째 다기능 공격수, 안테 레비치(무소속, 33). 다섯 경로 130명을 같은 기준으로 검토한 25장 보고서의 웹판.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 스카웃팅 리포트 — 대전하나시티즌 선수분석 보고서(2026-09)의 웹판(국·영). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/scouting-rebic.ko.html · 영문: /public/scouting-rebic.html
export default async function RebicScoutingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/scouting-rebic.ko.html" : "/scouting-rebic.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Ante Rebić — one more Seo Jin-su type"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
