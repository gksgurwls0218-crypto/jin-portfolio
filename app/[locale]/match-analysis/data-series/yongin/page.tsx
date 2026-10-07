import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "The Next Goal | Jin",
    description:
      "On performance Yongin FC are the seventh-best side in K League 2, yet they are 13th, 9.1 points below their expected points, the second-largest gap in the league. The goal totals are close to expected (30 scored from 30.7 xG, 32 conceded from 28.3); what differs is the order. When level, Yongin took 36% of the next goals against an expected 53%, the lowest in the league; when trailing they scored 14 from 10.0 xG. Split by phase, the losses while level come from open play: one goal from 315 settled attacks, and ten conceded to opponents' attacks after a regain. The result is twelve draws.",
  },
  ko: {
    title: "다음 골 | Jin",
    description:
      "용인FC는 경기 내용으로는 K리그2 7위 수준인데 순위는 13위, 승점이 기대보다 9.1점 적다. 리그에서 두 번째로 큰 차이다. 골의 합계는 기대와 비슷하다(득 30 · xG 30.7, 실 32 · 기대실점 28.3). 달랐던 건 순서다. 동점일 때 다음 골을 가져간 비율 36%(기대 53%)로 리그 최하위, 뒤질 때는 xG 10.0으로 14골. 국면별로 나누면 동점의 손실은 오픈플레이에서 나왔다 — 지공 315번에 1골, 상대의 탈취 후 공격에 10실점. 그 결과가 무승부 12번이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 25편(용인FC · K리그2 열한 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-yongin.ko.html · 영문: /public/data-yongin.html
export default async function YonginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-yongin.ko.html" : "/data-yongin.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="The Next Goal"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
