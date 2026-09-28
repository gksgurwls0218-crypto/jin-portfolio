import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Two Seasons in One | Jin",
    description:
      "Busan IPark were top of K League 2 in July and are sixth in September: 36 points from the 16 matches of the first half of the season, 5 from the 10 since. Measured by shot quality, the first half earned 23.1 expected points — Busan beat that by 12.9, by far the most in the league — and the second half 11.2 from nine matches with event data, 6.2 short. Non-penalty expected goal difference did fall (+0.30 to −0.19 per match), but that explains only about 12% of the drop; the rest is luck turning. What genuinely changed: xG per final-third entry fell 35%, time spent leading fell from 40% to 15%, and four matches in which Busan scored first yielded one point. Right-sided defender Jooseong Woo has been out of the squad since R16 (reason not public) — the ON/OFF gap is large but cannot be separated from the timing.",
  },
  ko: {
    title: "두 개의 시즌 | Jin",
    description:
      "부산아이파크는 7월에 K리그2 선두였고 9월엔 6위다. 전반기 16경기 승점 36, 후반기 10경기 승점 5. 슛의 질로 본 전반기 기대승점은 23.1 — 부산은 그보다 12.9점을 더 받았고(리그 압도적 1위), 후반기엔 이벤트가 있는 9경기 기대승점 11.2보다 6.2점을 덜 받았다. PK 제외 기대 득실차도 +0.30 → −0.19로 떨어졌지만, 추락폭의 약 12%만 설명한다. 나머지는 운이 돌아선 것이다. 진짜로 바뀐 것은 파이널서드 진입 한 번의 xG(35% 감소), 앞서는 시간(40% → 15%), 그리고 먼저 넣고도 승점 1만 남은 네 경기다. 오른쪽 수비수 우주성은 R16 이후 명단에서 빠졌다(사유 미공개) — ON/OFF 차이는 크지만 시기와 떼어 낼 수 없다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 18편(부산아이파크 · K리그2 네 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-busan.ko.html · 영문: /public/data-busan.html
export default async function BusanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-busan.ko.html" : "/data-busan.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Two Seasons in One"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
