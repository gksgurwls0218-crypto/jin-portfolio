import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Losing moved from volume to allocation — Qatar 2022 × North America 2026 | Jin",
    description:
      "Every official FIFA post-match report of both tournaments, parsed in full — 64 + 104 matches. In 2022 the side that ran more lost; in 2026 the side that pressed more lost. With the metric-definition audit and six robustness checks, including the one conclusion that failed.",
  },
  ko: {
    title: "패배의 원인은 총량에서 배분으로 옮겨갔다 — 2022 카타르 × 2026 북중미 | Jin",
    description:
      "두 대회 FIFA 공식 경기 리포트 전수 파싱 — 64경기 + 104경기. 2022에 진 팀은 많이 뛴 팀이고, 2026에 진 팀은 많이 압박한 팀이다. 지표 정의 변경 감사와 검증 6종, 그리고 검증을 통과하지 못한 결론 하나까지 그대로.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Authored as a self-contained HTML document (12 Chart.js figures + its own
// type/colour system), embedded the same way /match-analysis/korea-jordan and
// /match-analysis/suwon-cross-shot are — so the figures render exactly as built
// instead of being re-implemented in MDX.
// Korean: /public/wc2022-2026-champions.ko.html · English: /public/wc2022-2026-champions.html
export default async function WC2022x2026ChampionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/wc2022-2026-champions.ko.html" : "/wc2022-2026-champions.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Qatar 2022 × North America 2026 — losing moved from volume to allocation"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
