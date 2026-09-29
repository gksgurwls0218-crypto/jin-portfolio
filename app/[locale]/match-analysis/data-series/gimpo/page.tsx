import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Strongest at Home, Unable to Win There | Jin",
    description:
      "Gimpo FC played their first 13 matches of 2026 away while their pitch was re-turfed, and came home in June fifth in the table. Since then they have played the best home football in K League 2 — non-penalty xG difference +0.61 per match, 1st, and 1.78 expected points per home match, also 1st — yet taken 1.10 points per home match, 11th, 6.8 fewer than expected. Four of five summer home matches ended 1-1. The shortfall sits in the last cell in front of both goals: at home Gimpo turned 9.6 xG in the central box into 5 goals, and opponents' shots on target went in 5.1 more times than their placement in the goal suggests. Away, the regain-and-finish attack worked; at home, where weaker sides sit deep, the settled attack has to carry the load.",
  },
  ko: {
    title: "집에서 가장 강하고, 집에서 이기지 못한다 | Jin",
    description:
      "김포FC는 잔디 전면 교체로 2026시즌 첫 13경기를 모두 원정에서 치르고, 6월 5위로 집에 돌아왔다. 이후 김포는 K리그2에서 가장 좋은 홈 경기를 한다 — 홈 PK 제외 기대 득실차 경기당 +0.61(1위), 홈 기대승점 1.78(1위). 그런데 홈 승점은 경기당 1.10(11위), 기대보다 6.8점 적다. 여름 홈 다섯 경기 중 네 번이 1-1이었다. 모자란 승점은 양쪽 골문 앞 마지막 한 칸에 있다 — 홈 박스 중앙 xG 9.6에서 5골, 상대 유효슛은 골문 코스로 본 기대보다 5.1골 더 들어갔다. 원정에서는 뺏어서 끝내는 공격이 통했고, 약팀이 내려앉는 홈에서는 지공이 짐을 진다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 19편(김포FC · K리그2 다섯 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-gimpo.ko.html · 영문: /public/data-gimpo.html
export default async function GimpoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gimpo.ko.html" : "/data-gimpo.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Strongest at Home, Unable to Win There"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
