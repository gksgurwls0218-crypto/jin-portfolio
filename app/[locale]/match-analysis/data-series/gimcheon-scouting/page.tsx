import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "How to Beat Gimcheon Sangmu — Opposition Report | Jin",
    description:
      "A pre-match briefing written from the opposition's side. Five ways in, ranked by how strongly the data supports them: let them score first (2.58 conceded per 90 while leading against 1.42 expected), manufacture dead balls (set pieces 2:13), make contact in the box (six penalties conceded, none won), deliver away from the two centre-backs, and reach the byline. Plus four plans the data rejects, including one of my own.",
  },
  ko: {
    title: "김천상무를 어떻게 이기나 — 상대 분석 리포트 | Jin",
    description:
      "상대팀 코칭스태프 관점의 경기 전 브리핑. 데이터가 지지하는 순서대로 공략 지점 다섯 개 — 그들이 먼저 넣게 두어도 된다(리드 중 90분당 2.58실점, 기대 1.42), 데드볼을 만들어라(세트피스 2:13), 박스 안에서 접촉을 만들어라(피PK 6·획득 0), 센터백 둘을 피해서 올려라, 골라인까지 파고들어라. 그리고 검정에서 기각된 계획 네 가지.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 김천 연재의 동반 문서 — 같은 데이터셋을 상대팀 관점으로 다시 쓴 스카우팅 리포트.
// 한국어: /public/data-gimcheon-scouting.ko.html · 영문: /public/data-gimcheon-scouting.html
export default async function GimcheonScoutingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gimcheon-scouting.ko.html" : "/data-gimcheon-scouting.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="How to Beat Gimcheon Sangmu — Opposition Report"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
