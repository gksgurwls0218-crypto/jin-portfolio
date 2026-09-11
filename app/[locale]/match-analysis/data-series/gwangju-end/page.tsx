import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "No One at the End — Gwangju FC | Jin",
    description:
      "Gwangju's progression gap while behind is −4.6pp, and the distribution effect explains +0.06pp of it. Their midfielders already progress at league level. Their defenders complete more passes into the final third than the league at level score and fewer once behind — because the final third is empty. Gwangju log 116 final-third events per 90 while losing, last of 12, and they are the only side whose share of play in the final third fails to rise when they go behind.",
  },
  ko: {
    title: "통로 끝에 아무도 없다 — 광주FC | Jin",
    description:
      "지고 있을 때 광주의 전달률 격차는 −4.6pp이고, 그중 배분 효과는 +0.06pp다. 미드필더는 이미 리그 수준으로 전달한다. 수비수는 동점일 때 리그보다 잘 넘기고 열세가 되면 못 넘긴다 — final third가 비어 있기 때문이다. 열세 국면 final third 활동 116회/90분은 리그 최하위이고, 지고 있을 때 앞으로 무게를 옮기지 않는 팀은 광주뿐이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 8편. 7편(gwangju)의 결론 — "수비수가 문제" — 을 스코어 상태로 통제해
// 다시 검증한 후속편이다. 7편은 그대로 두고 이 편이 그 답을 고쳐 쓴다.
// 한국어: /public/data-gwangju-end.ko.html · 영문: /public/data-gwangju-end.html
export default async function GwangjuEndDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gwangju-end.ko.html" : "/data-gwangju-end.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="No One at the End — Gwangju FC"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
