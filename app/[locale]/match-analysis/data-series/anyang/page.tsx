import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Where the Ball Stops | Jin",
    description:
      "FC Anyang have scored 36 and conceded 46 in 29 matches, and the −10 is almost exactly what their chances predict: −9.8 on expected goals. Once the ball reaches the final third they shoot more often than their opponents do. The deficit is territory, not execution — and it opens in one phase, where 11.0% of middle-third passes reach the final third against 12.6%.",
  },
  ko: {
    title: "공은 어디서 멈추는가 | Jin",
    description:
      "안양FC는 29경기에서 36골을 넣고 46골을 내줬다. 득실차 −10은 기대 득실차 −9.8과 거의 같다. 그런데 공격진영에 도착한 뒤의 슈팅 효율은 오히려 상대보다 높다. 부족한 것은 마무리가 아니라 영토이고, 그 격차는 중앙3에서 공격3으로 나가는 한 국면에서 시작된다 — 전달률 11.0% 대 12.6%.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 12편(안양FC). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-anyang.ko.html · 영문: /public/data-anyang.html
export default async function AnyangPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-anyang.ko.html" : "/data-anyang.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Where the Ball Stops"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
