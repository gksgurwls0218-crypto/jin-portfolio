import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "At Home, at 0-0 | Jin",
    description:
      "Gimhae FC have taken 12 points from a performance worth 22.1 — the largest shortfall in K League 2 — and almost all of it was lost at home. Eleven analysed home matches brought 2 points against an expected 11.2 (P = 0.3%), while 13 away matches brought 10 against 10.9. The mechanism sits in the level-score minutes: 1.51 xG allowed per 90, the highest in the league, against 0.57 created. They have led for 206 minutes, the fewest in the league, and have not scored once while ahead. By phase: final-third entry 26.9% (16th), open-play goals minus xG −0.25 (17th), opponents' 15-second transition xG 0.451 (1st), one penalty won against six given away.",
  },
  ko: {
    title: "집에서, 0-0일 때 | Jin",
    description:
      "김해FC는 승점 12에 기대승점 22.1 — 리그에서 가장 큰 미달이고, 그 미달은 거의 전부 집에서 생겼다. 분석 대상 홈 11경기 승점 2(기대 11.2, P 0.3%), 원정 13경기 승점 10(기대 10.9). 메커니즘은 동점 구간이다. 스코어가 같은 동안 허용 xG 1.51/90으로 리그 1위, 같은 구간 자기 xG는 0.57이다. 앞선 시간 206분은 리그 최소이고 앞선 동안 득점은 0이다. 국면별로는 파이널서드 도달 26.9%(16위), 오픈플레이 골−xG −0.25(17위), 상대 15초 전환 xG 0.451(1위), PK는 1개 획득에 6개 허용이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 28편(김해FC · K리그2 열네 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-gimhae.ko.html · 영문: /public/data-gimhae.html
export default async function GimhaePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gimhae.ko.html" : "/data-gimhae.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="At Home, at 0-0"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
