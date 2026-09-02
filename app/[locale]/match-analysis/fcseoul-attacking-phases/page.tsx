import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Everyone gets the ball to the same place — FC Seoul 2026 | Jin",
    description:
      "FC Seoul reach the centre of the box as often as anyone in the league. Ranking 25 matches by the xG each delivery produced separates them completely — and no attribute in the event data explains why.",
  },
  ko: {
    title: "골문 앞 중앙까지는, 어느 경기든 똑같이 간다 — FC서울 2026 | Jin",
    description:
      "FC서울이 골문 앞 중앙에 공을 넣는 비율은 리그 평균과 같다. 배달 한 번이 만든 기대득점으로 25경기를 줄 세우면 완전히 갈리는데, 이벤트 데이터의 어떤 속성으로도 그 차이가 설명되지 않는다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Self-contained HTML document (nine inline SVG figures, hover tooltips, nine embedded
// match clips served from /public/videos/fcseoul), embedded the same way
// /match-analysis/suwon-revision is.
// Korean: /public/fcseoul-attacking-phases.ko.html · English: /public/fcseoul-attacking-phases.html
export default async function FcSeoulAttackingPhasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/fcseoul-attacking-phases.ko.html" : "/fcseoul-attacking-phases.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="FC Seoul 2026 — the attacking phase"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
