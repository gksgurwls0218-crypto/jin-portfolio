import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "They Reach Less, and Shoot the Most | Jin",
    description:
      "Suwon FC have scored more goals than anyone in K League 2, yet rank 13th of 17 for reaching the final third. Once in, no team turns entries into shots more often (30.6%, first at all three lines tested). The defence is a mirror: more entries allowed, fewer chances allowed. Ahead, they allow the fewest open-play chances in the league; behind, every weapon switches off and penalties and set pieces carry them. Unbeaten in 13 since R14 — with the same number of entries.",
  },
  ko: {
    title: "적게 닿고, 가장 자주 쏜다 | Jin",
    description:
      "수원FC는 K리그2에서 가장 많은 골을 넣었지만 상대 파이널서드 도달은 17팀 중 13위다. 닿은 뒤 슛으로 끝내는 비율은 리그 1위(30.6%, 기준선 세 곳 모두 1위). 수비는 거울상이다 — 도달은 더 내주고 기회는 덜 내준다. 앞서면 리그에서 가장 적게 내주고, 뒤지면 모든 무기가 꺼져 PK와 세트피스가 버틴다. R14 이후 13경기 무패, 도달 횟수는 그대로였다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 15편(수원FC · K리그2 첫 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-suwonfc.ko.html · 영문: /public/data-suwonfc.html
export default async function SuwonFCPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-suwonfc.ko.html" : "/data-suwonfc.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="They Reach Less, and Shoot the Most"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
