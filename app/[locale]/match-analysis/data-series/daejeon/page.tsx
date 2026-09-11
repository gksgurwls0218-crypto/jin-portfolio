import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Nine Silences — Daejeon Hana Citizen | Jin",
    description:
      "Daejeon enter the final third more than all but two clubs and finish sixth for shots. Nine of 27 matches ended goalless and all nine fall before R19; from the fifteenth minute of those matches their left-side key passes ran 0.67 against 6.00. After R20 there was never another. No one was signed — the places settled, crosses began finding somebody, and the average shot moved 2.7m closer to goal.",
  },
  ko: {
    title: "아홉 번의 침묵 — 대전하나시티즌 | Jin",
    description:
      "대전은 파이널서드에 리그 3위로 들어가면서 슛은 6위에 그친다. 27경기 중 9경기가 무득점이고 그 아홉 번이 전부 R19 이전이다. 킥오프 15분 고정창에서 왼쪽 키패스는 0.67 대 6.00. R20 이후에는 한 번도 없었다. 영입은 없었고, 자리가 정해지자 크로스가 사람을 찾기 시작하면서 평균 슛 거리가 2.7m 당겨졌다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 9편. 2026시즌 대전의 공격을 무득점 9경기에서 그 해소까지 추적한다.
// 한국어: /public/data-daejeon.ko.html · 영문: /public/data-daejeon.html
export default async function DaejeonDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-daejeon.ko.html" : "/data-daejeon.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Nine Silences — Daejeon Hana Citizen"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
