import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about FC Seoul | Jin",
    description:
      "A possession side pushed wide: 82% of Seoul's entries into the final third go down a channel, 66% of their box entries are crosses, and 46.5% of those are cleared or blocked. The chances they build match the league's 2nd and 3rd best — the points are 15 clear. The difference is made at the last touch.",
  },
  ko: {
    title: "데이터가 말하는 FC서울 | Jin",
    description:
      "점유율 56.0%로 공을 갖는 팀인데 앞으로 갈수록 옆으로 밀린다. 파이널서드 진입의 82%가 측면, 박스 투입의 66%가 크로스, 그 크로스의 46.5%가 잘린다. 만든 기회의 양은 리그 2·3위와 같은데 승점은 15점 앞선다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 2편. 자체 완결형 HTML 문서(인라인 SVG 그림 11종, 호버 툴팁)를
// /match-analysis/data-series/hwaseong 과 같은 방식으로 임베드한다.
// 한국어: /public/data-fcseoul.ko.html · 영문: /public/data-fcseoul.html
export default async function FcSeoulDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-fcseoul.ko.html" : "/data-fcseoul.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about FC Seoul"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
