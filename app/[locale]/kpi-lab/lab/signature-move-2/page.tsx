import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Several Kinds of Football in One Match | Jin",
    description:
      "Position-specific fundamentals assume one position, one context. That is breaking in four directions: the press moved back, one player works in two shapes, blocks are mixed within a match, and their height moves 20 m+ during it.",
  },
  ko: {
    title: "한 경기 안의 여러 축구 | Jin",
    description:
      "포지션별 기본기는 한 포지션이 한 가지 맥락에서 볼을 받는다는 전제 위에 있다. 사람이 붙는 자리가 뒤로 왔고, 한 선수가 두 형태에서 일하고, 한 경기 안에 블록이 섞이고, 그 높이가 20m 넘게 움직인다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Signature Move 연재 2편. 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-signature-move-2.ko.html · 영문: /public/data-signature-move-2.html
export default async function SignatureMove2Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-signature-move-2.ko.html" : "/data-signature-move-2.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Several Kinds of Football in One Match"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
