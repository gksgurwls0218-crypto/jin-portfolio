import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about Gwangju FC | Jin",
    description:
      "The summer signings worked: box shots up 67%, xG per shot up 21%, expected points up 33%. Actual points went from 0.47 to 0.50. The one number that never moved is the middle third — 0.11 progressions per entry, identical before and after twelve new players. Gwangju's defenders progress at 8.7%, last in the league, and when the team goes behind the league raises that rate by 3.6 points while Gwangju's drop 2.6.",
  },
  ko: {
    title: "데이터가 말하는 광주FC | Jin",
    description:
      "여름 보강은 작동했다. 박스 안 슛 +67%, 슛당 xG +21%, 기대 승점 +33%. 실제 승점은 0.47에서 0.50으로 갔다. 27경기 내내 움직이지 않은 숫자는 중앙 지역이다 — 진입당 전달 0.11, 선수 12명을 바꾼 전후가 같다. 광주 수비수의 전달률 8.7%는 리그 최하위이고, 지고 있을 때 리그는 3.6%p 올리는데 광주는 2.6%p 내린다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 7편. 자체 완결형 HTML 문서(인라인 SVG 차트 6종)를
// /match-analysis/data-series/fcseoul 과 같은 방식으로 임베드한다.
// 한국어: /public/data-gwangju.ko.html · 영문: /public/data-gwangju.html
export default async function GwangjuDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gwangju.ko.html" : "/data-gwangju.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about Gwangju FC"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
