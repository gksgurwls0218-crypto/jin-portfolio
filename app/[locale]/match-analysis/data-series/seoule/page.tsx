import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "They Get In, but They Cannot Shoot | Jin",
    description:
      "Teams facing Seoul E-Land reach the final third and still fail to finish with a shot more often than against anyone in K League 2 (22.3%, lowest at all three lines tested). Seoul E-Land move the ball out of their own third better than any side, second on expected goal difference, with results matching expectation. They are ordinary when ahead and strongest when behind. Their top scorer's minutes alone show a weaker team than the backup striker's; foreign players carry the ball, Korean players finish; they rotate more than anyone.",
  },
  ko: {
    title: "닿아도, 쏘지 못한다 | Jin",
    description:
      "서울 이랜드를 상대한 팀은 파이널서드에 닿아도 슛으로 끝내지 못한다 — 그 비율 22.3%는 K리그2 최저이고 기준선 세 곳 모두 최저다. 서울 이랜드는 자기 진영을 빠져나가는 비율 1위, 기대 득실차 2위이고 결과는 기대대로 나왔다. 앞서면 대등해지고 뒤지면 가장 강하다. 득점 1위 공격수만 뛴 시간보다 교체 공격수만 뛴 시간의 팀 기록이 더 좋았고, 외국인은 운반하고 국내 선수가 마무리하며, 리그에서 가장 많이 로테이션한다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 16편(서울 이랜드 · K리그2 두 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-seoule.ko.html · 영문: /public/data-seoule.html
export default async function SeoulELandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-seoule.ko.html" : "/data-seoule.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="They Get In, but They Cannot Shoot"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
