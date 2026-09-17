import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Lost on Dead Balls | Jin",
    description:
      "Eighteen draws in 29 matches, six clear of any other club. Split the goal difference by phase and the season stops looking eleventh-placed: open play is 26:23, set pieces 2:13, and the whole of the −8 is the dead ball. While leading, 7.73 goals were expected and 14 arrived. Four explanations die under testing — no foreign target man, squad rotation, sitting deep, and a right-side weakness that was my own finding. What survives is the delivery, and a 192cm forward on the pitch for 31% of his own team's corners.",
  },
  ko: {
    title: "멈춘 공에서 잃었다 | Jin",
    description:
      "29경기에 무승부 18번, 2위 구단보다 여섯 경기 많다. 득실차를 국면으로 쪼개면 리그 11위 팀의 숫자가 아니다. 오픈플레이 26:23, 세트피스 2:13 — −8의 전부가 정지 상황이다. 리드 중 기대실점 7.73에 실점 14. 외국인 타겟맨 부재, 선수단 회전, 내려앉기, 그리고 내가 낸 오른쪽 약점까지 네 가지 설명이 검정에서 죽는다. 남는 것은 배달, 그리고 자기 팀 코너의 31%에만 그라운드에 있던 192cm 공격수다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 11편(김천 2/2). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-gimcheon.ko.html · 영문: /public/data-gimcheon.html
export default async function GimcheonDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gimcheon.ko.html" : "/data-gimcheon.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Lost on Dead Balls"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
