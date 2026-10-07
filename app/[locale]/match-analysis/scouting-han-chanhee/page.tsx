import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Han Chan-hee — the No. 6 for the days without Kim Bong-soo | Jin",
    description:
      "Scouting report: Han Chan-hee (Suwon FC, 29) as the distributing No. 6 for the days without Kim Bong-soo — 116 Korean midfielders screened on the same distribution and recovery indices. Web edition of the 25-slide report, in English and Korean.",
  },
  ko: {
    title: "한찬희 — 김봉수가 빠진 날의 6번 | Jin",
    description:
      "스카웃팅 리포트: 김봉수가 빠진 날의 배급형 6번, 한찬희(수원FC, 29). 한국인 미드필더 116명을 같은 배급 · 회수 지수로 검토한 25장 보고서의 웹판.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 스카웃팅 리포트 — 대전하나시티즌 선수분석 보고서(2026-09)의 웹판(국·영). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/scouting-han-chanhee.ko.html · 영문: /public/scouting-han-chanhee.html
export default async function HanChanheeScoutingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/scouting-han-chanhee.ko.html" : "/scouting-han-chanhee.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Han Chan-hee — the No. 6 for the days without Kim Bong-soo"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
