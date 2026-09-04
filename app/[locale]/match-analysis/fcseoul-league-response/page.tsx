import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "How the league learned to play FC Seoul — 2026 | Jin",
    description:
      "Sorting FC Seoul's opponents into high, mid and low blocks failed: the within-team correlation across rematches is negative. What survives is a direction — 8 of 11 teams dropped their block, and Seoul's xG per delivery fell 30% while their points per game held.",
  },
  ko: {
    title: "리그가 서울을 학습한 25경기 — FC서울 2026 | Jin",
    description:
      "상대를 하이·미들·로우 블록으로 분류하려다 실패했다. 재대결 팀 내 상관이 음수이기 때문이다. 남은 것은 방향이다 — 11팀 중 8팀이 블록을 낮췄고, 서울의 배달당 xG는 30% 떨어졌지만 승점은 유지됐다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Self-contained HTML document (seven inline SVG figures, hover tooltips), embedded the same way
// /match-analysis/fcseoul-attacking-phases is.
// Korean: /public/fcseoul-league-response.ko.html · English: /public/fcseoul-league-response.html
export default async function FcSeoulLeagueResponsePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/fcseoul-league-response.ko.html" : "/fcseoul-league-response.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="How the league learned to play FC Seoul"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
