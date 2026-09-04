import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about Hwaseong FC | Jin",
    description:
      "Hwaseong attempt the second-fewest passes in K League 2 and get more box shots out of each one than anybody. Third for long-pass share, last for duels, first for offsides — and 86 first-half shots become 154 after the break with possession unchanged.",
  },
  ko: {
    title: "데이터가 말하는 화성FC | Jin",
    description:
      "화성은 리그에서 두 번째로 패스를 적게 하면서 패스 한 번당 박스 안 슈팅은 가장 많이 만든다. 롱패스 비중 3위, 경합 총량 최하위, 오프사이드 1위 — 그리고 점유율은 그대로인 채 전반 슈팅 86개가 후반 154개가 된다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 1편. 자체 완결형 HTML 문서(인라인 SVG 그림 9종, 호버 툴팁)를
// /match-analysis/fcseoul-league-response 와 같은 방식으로 임베드한다.
// 한국어: /public/data-hwaseong.ko.html · 영문: /public/data-hwaseong.html
export default async function HwaseongDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-hwaseong.ko.html" : "/data-hwaseong.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about Hwaseong FC"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
