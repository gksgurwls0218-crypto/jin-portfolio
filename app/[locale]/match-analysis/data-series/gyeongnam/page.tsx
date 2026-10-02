import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "How Not to Lose | Jin",
    description:
      "Gyeongnam FC lost their goalkeeper Kihyun Lee to a sixth-minute red card on opening day; since he returned in R15 they have lost once in 12 matches, even though the chances they concede rose (non-penalty xG against 0.96 to 1.25 per match). Laying the match status of every game over its phases shows what not losing means here: they conceded first in 7 of 13 matches up to R14 and 4 of 12 since, time trailing fell from 34% to 12%, and matches drifted at level 73% of the time. Of 10 draws, 6 came after scoring first (2nd most in the league) and 3 after falling behind; Lee conceded 8 from 45 shots on target against a placement expectation of 13.1. The attack has the league's lowest xG per shot yet finishes 5.4 goals above xG.",
  },
  ko: {
    title: "지지 않는 법 | Jin",
    description:
      "경남FC는 개막전 6분 만에 골키퍼 이기현을 퇴장으로 잃었다. 그가 돌아온 R15 이후 12경기 1패 — 내준 기회(PK 제외 허용 xG 0.96 → 1.25)는 오히려 늘었는데도. 모든 경기의 스코어 흐름을 국면 위에 겹치면 '지지 않는다'의 실체가 보인다. 먼저 실점한 경기가 13경기 중 7경기에서 12경기 중 4경기로, 뒤진 시간이 34%에서 12%로 줄었고, 경기의 73%가 동점으로 흘렀다. 무승부 10번 중 6번은 먼저 넣고 비긴 경기(리그 2위), 3번은 먼저 먹고 따라붙은 경기다. 이기현은 유효슛 45개에 8실점(코스 기대 13.1). 공격은 슛 1개의 xG 리그 최하위인데 골은 xG보다 5.4골 많다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 21편(경남FC · K리그2 일곱 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-gyeongnam.ko.html · 영문: /public/data-gyeongnam.html
export default async function GyeongnamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gyeongnam.ko.html" : "/data-gyeongnam.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="How Not to Lose"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
