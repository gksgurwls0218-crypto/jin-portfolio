import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Same Football, Different Season | Jin",
    description:
      "Cheonan City FC took 18 points from their first 13 matches and have not won in the 13 since. Yet the football barely changed: expected points per match went from 1.18 to 1.24, and non-penalty xG for and against stayed level. What changed was how often opponents' shots went in: 6.2 fewer goals conceded than expected up to R14, 3.9 more after it, and the switch coincides with a goalkeeper change. Split by phase, Cheonan win the ball back and lose it more than anyone; trailing, their attacks after a regain scored 11 from 5.8 xG, the best in the league; leading, all four penalties they conceded were equalisers.",
  },
  ko: {
    title: "같은 축구, 다른 시즌 | Jin",
    description:
      "천안시티FC는 첫 13경기에서 승점 18을 쌓고, 이후 13경기에서 한 번도 이기지 못했다. 그런데 경기 내용은 거의 그대로다. 경기당 기대승점은 1.18에서 1.24로 오히려 올랐고, PK 제외 xG와 상대 xG도 같다. 달라진 건 상대 슛이 골이 된 비율이다. R14까지는 기대보다 6.2골 덜 먹었고, 그 뒤로는 3.9골 더 먹었다. 그 경계에 골키퍼 교체가 겹친다. 국면별로는 리그에서 가장 많이 뺏고 가장 많이 잃는 팀이다. 뒤질 때 탈취 후 공격으로 xG 5.8에서 11골(리그 1위), 앞설 때 내준 PK 4개는 모두 동점골이었다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 26편(천안시티FC · K리그2 열두 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-cheonan.ko.html · 영문: /public/data-cheonan.html
export default async function CheonanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-cheonan.ko.html" : "/data-cheonan.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Same Football, Different Season"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
