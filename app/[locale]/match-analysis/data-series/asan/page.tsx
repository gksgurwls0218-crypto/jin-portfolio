import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "They Only Win at Home | Jin",
    description:
      "Chungnam Asan took 25 points from 14 home matches and 9 from 11 away — the biggest home–away gap in K League 2 — yet by non-penalty xG difference they are worse at home (−0.22 per match) than away (+0.06). The split is about the ball. Attacks that start with a regain beat xG by 7.9 goals, the most in the league, and reach a first shot faster than anyone's; settled attacks have produced 2 goals, the fewest, and none away, with the league's lowest share of box entries ending in a shot. At home they have less of the ball (47%, 43% under André), score first 9 times in 14, and win; away they have more of it (51%), score first once in 11, and lose. The cost at home: 12 goals conceded from crosses worth 4.7 xG. Five of the last seven matches are away.",
  },
  ko: {
    title: "집에서만 이긴다 | Jin",
    description:
      "충남아산은 홈 14경기 승점 25, 원정 11경기 승점 9 — 홈·원정 승점 차가 K리그2 최대다. 그런데 PK 제외 기대 득실차는 홈 −0.22, 원정 +0.06으로 홈 경기력이 더 나쁘다. 갈림길은 공이다. 뺏어서 시작한 공격은 xG보다 7.9골 더 넣어 리그 1위이고 첫 슛까지 가장 빠르다. 공을 쥐고 만든 지공은 시즌 2골로 최하위, 원정 0골이며 박스에 들어간 뒤 슛 비율도 최하위다. 홈에서는 공을 덜 갖고(47%, 안드레 체제 43%) 14경기 중 9번 먼저 넣으며 이긴다. 원정에서는 공을 더 갖고(51%) 11경기 중 1번만 먼저 넣고 진다. 홈의 대가는 크로스 실점 — xG 4.7에서 12골. 남은 7경기 중 5경기가 원정이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 20편(충남아산 · K리그2 여섯 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-asan.ko.html · 영문: /public/data-asan.html
export default async function AsanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-asan.ko.html" : "/data-asan.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="They Only Win at Home"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
