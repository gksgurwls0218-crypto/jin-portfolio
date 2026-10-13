import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "After the Lead | Jin",
    description:
      "On performance Ansan Greeners are the weakest side in K League 2 (0.71 expected points a match, 17th), and their points match that. But scoring first was not rare: 11 times in 25 matches with event data, and they won only two — 0.73 points a match after scoring first, the lowest in the league against an average of 2.00. They dropped 25 points from leading positions, the most in the league. Once ahead they defended deeper than anyone and faced 16 shots per 90. The seven home matches in which they scored first brought one point; all six remaining matches are away.",
  },
  ko: {
    title: "앞서고 나서 | Jin",
    description:
      "안산 그리너스는 경기 내용으로 K리그2에서 가장 약하고(경기당 기대승점 0.71, 17위), 승점도 그만큼 나왔다. 그런데 먼저 넣은 경기는 이벤트 25경기 중 11번이다. 그 11경기에서 두 번 이겼다 — 선제골 경기의 경기당 승점 0.73, 리그 최하위(평균 2.00). 앞선 경기에서 놓친 승점 25점도 리그 최다다. 앞서는 순간 리그에서 가장 깊이 내려서고, 90분당 슛 16개를 맞았다. 홈에서 먼저 넣은 7경기의 승점은 1, 남은 6경기는 모두 원정이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 27편(안산 그리너스 · K리그2 열세 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-ansan.ko.html · 영문: /public/data-ansan.html
export default async function AnsanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-ansan.ko.html" : "/data-ansan.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="After the Lead"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
