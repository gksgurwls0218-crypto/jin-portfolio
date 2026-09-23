import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "They Give Away the Least, and Concede More | Jin",
    description:
      "No K League 1 side allows fewer open-play chances than Incheon United, and on expected goal difference only Seoul rate higher — yet they sit seventh and have conceded 6.9 goals above a league-adjusted expectation. Being 5.8 points short is within the range of luck, but the excess has a shape: all of it sits in shots nobody got to, 147 of them producing 22 goals against an expected 15.2. Without penalties, the attack is ninth.",
  },
  ko: {
    title: "가장 적게 내주고, 더 많이 먹었다 | Jin",
    description:
      "인천유나이티드는 오픈플레이에서 리그에서 가장 적은 기회를 내주고, 기대 득실차는 서울 다음 2위다. 그런데 순위는 7위이고 실점은 리그 보정 기대보다 6.9골 많다. 승점 5.8점 부족은 운의 범위지만 초과 실점에는 모양이 있다 — 전부 아무도 붙지 않은 슛에서 나왔다(147개, 기대 15.2골에 22실점). PK를 빼면 공격은 리그 9위다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 14편(인천유나이티드). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-incheon.ko.html · 영문: /public/data-incheon.html
export default async function IncheonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-incheon.ko.html" : "/data-incheon.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="They Give Away the Least, and Concede More"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
