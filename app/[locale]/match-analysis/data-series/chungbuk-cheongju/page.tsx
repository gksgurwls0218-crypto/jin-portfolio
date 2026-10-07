import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Stoppable Goals | Jin",
    description:
      "Chungbuk Cheongju FC have the league's second-highest pass share, its fewest balls lost and few chances allowed, yet they have conceded 41 goals from 30.0 expected, an 11-goal gap that is by far the largest in K League 2. Phase by phase, the attack, the defensive block, transitions and set pieces hold up; the leak is in the last yard: a 52.9% save rate (league lowest), 18 goals from shots under a 10% chance, and 15 conceded while ahead from 5.9 expected. The result is 14 draws, the most in the league, and no win in the first 13 matches.",
  },
  ko: {
    title: "막을 수 있던 골 | Jin",
    description:
      "충북청주FC는 점유율 리그 2위, 볼 잃음 최소, 내주는 기회도 적은 팀이다. 그런데 실점은 41골, 상대 기대득점 30.0보다 11골 많다. K리그2에서 가장 큰 차이다. 공격·수비 블록·전환·세트피스 국면은 버틴다. 새는 곳은 골문 앞 마지막 한 칸이다. 유효슛 막은 비율 52.9%(리그 최하위), 득점 확률 10% 미만 슛에서 18실점, 앞선 상태에서 기대실점 5.9에 15실점. 그 결과가 리그 최다 무승부 14번, 첫 13경기 무승이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 23편(충북청주FC · K리그2 아홉 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-chungbuk-cheongju.ko.html · 영문: /public/data-chungbuk-cheongju.html
export default async function ChungbukCheongjuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-chungbuk-cheongju.ko.html" : "/data-chungbuk-cheongju.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Stoppable Goals"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
