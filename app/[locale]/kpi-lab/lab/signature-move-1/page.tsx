import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What Comes Out Under Pressure | Jin",
    description:
      "Escaping a press is a time-budget problem. A Signature Move buys the defender's time in two currencies: one disappears as opponents get better, the other does not. Count the time the attacker pays himself and the break-even point drops from 0.367 s to 0.20 s.",
  },
  ko: {
    title: "급할 때 나오는 것 | Jin",
    description:
      "압박을 벗기는 일은 시간 예산 문제다. Signature Move는 상대의 시간을 두 갈래로 사고, 공격수 본인이 치르는 시간까지 세면 손익분기점이 0.367초에서 0.20초로 내려온다. 육성에서 획일화가 멈춰야 할 지점이 드러난다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Signature Move 연재 1편. 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-signature-move.ko.html · 영문: /public/data-signature-move.html
export default async function SignatureMove1Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-signature-move.ko.html" : "/data-signature-move.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What Comes Out Under Pressure"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
