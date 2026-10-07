import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "The Goals They Kept Out | Jin",
    description:
      "Paju Frontier FC have the league's lowest pass share and allow the third-most expected goals, yet they have conceded 28 goals from 37.5 expected, 9.5 fewer and the largest gap in K League 2. Phase by phase they should concede more: the most opponent crosses, the second-most box entries allowed, and the fewest shots from their own final-third entries. The difference is in the last yard: a 78.2% save rate, the league's best, almost all of it in the 12 matches since Wonwoo Ryu took over in goal. The other face is the attack: after conceding first they took 3 points from 11 matches.",
  },
  ko: {
    title: "막아낸 골 | Jin",
    description:
      "파주 프런티어 FC는 패스 점유율 리그 최하위, 내준 기대실점은 리그 3위인 팀이다. 그런데 실점은 28골, 상대 기대득점 37.5보다 9.5골 적다. K리그2에서 가장 큰 차이다. 국면만 보면 더 먹어야 한다 — 상대 크로스 리그 최다, 상대 박스 진입 2위, 파이널서드 진입 → 슛 최하위. 차이는 골문 앞 마지막 한 칸에서 났다. 유효슛 막은 비율 78.2%로 리그 1위, 그 대부분이 류원우가 골문에 선 R15 이후 12경기에서 나왔다. 반대편 얼굴은 공격이다. 먼저 실점한 11경기에서 승점 3.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 24편(파주 프런티어 FC · K리그2 열 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-paju.ko.html · 영문: /public/data-paju.html
export default async function PajuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-paju.ko.html" : "/data-paju.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="The Goals They Kept Out"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
