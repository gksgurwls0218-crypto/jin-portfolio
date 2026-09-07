import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about Jeonbuk Hyundai | Jin",
    description:
      "Jeonbuk make almost the fewest defensive actions in K League 1 and concede the second fewest goals — because there is less to defend: third in the league once divided by exposure, with a lower PPDA than their opponents. But the same possession inverts going forward. Slow build-up returns 0.37× its expected goals against Ulsan's 0.78×, and the entire 12.2-goal shortfall in front of goal sits there.",
  },
  ko: {
    title: "데이터가 말하는 전북 현대 | Jin",
    description:
      "수비 행위는 리그 최하위권인데 실점은 두 번째로 적다. 수비를 못해서가 아니라 수비할 일이 적어서다 — 노출로 나누면 수비량 리그 3위, PPDA는 상대보다 낮다. 그런데 같은 소유가 공격에서는 반대로 작동한다. 지공 국면은 기대의 0.37배만 넣고(울산 0.78배), 기대에 못 미친 12.2골이 전부 거기서 나온다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 4편. 자체 완결형 HTML 문서(인라인 SVG 그림 12종, 호버 툴팁,
// 실제 규격 105×68m 피치 도식)를 /match-analysis/data-series/ulsan 과 같은 방식으로 임베드한다.
// 한국어: /public/data-jeonbuk.ko.html · 영문: /public/data-jeonbuk.html
export default async function JeonbukDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-jeonbuk.ko.html" : "/data-jeonbuk.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about Jeonbuk Hyundai"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
