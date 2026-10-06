import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "The Moment They Lead | Jin",
    description:
      "Seongnam FC went ahead in 13 matches and conceded while leading in 11 of them, the highest rate in K League 2. At level they play like a top-half side (open-play xG 0.99 : 0.66 per 90), but once ahead their defensive actions drop 10.5 points deeper, the largest shift in the league, and open-play xG flips to 0.45 : 1.11. Seven of the 13 goals conceded while ahead began within 30 m of their goal, seven came in the first 15 minutes of the second half. A change of head coach lifted results but not the pattern.",
  },
  ko: {
    title: "앞서는 순간 | Jin",
    description:
      "성남FC는 먼저 앞선 13경기 중 11경기에서 리드 중 실점했다. 리그에서 가장 높은 비율이다. 동점일 때는 리그 상위권(오픈플레이 xG 90분당 0.99 : 0.66)이지만, 앞서는 순간 수비 행동 위치가 10.5 내려앉아 리그에서 가장 크게 물러서고 xG는 0.45 : 1.11로 뒤집힌다. 리드 중 실점 13골 중 7골은 성남 진영 30m 안에서 시작한 공격, 7골은 후반 시작 15분 안에 나왔다. 감독 교체 뒤 결과는 올랐지만 이 모양은 바뀌지 않았다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 22편(성남FC · K리그2 여덟 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-seongnam.ko.html · 영문: /public/data-seongnam.html
export default async function SeongnamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-seongnam.ko.html" : "/data-seongnam.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="The Moment They Lead"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
