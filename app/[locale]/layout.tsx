import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap", weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap", weight: ["400", "500"] });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META: Record<Locale, Metadata> = {
  en: {
    title: "Jin — Tactical Analyst",
    description: "Football tactical analyst building the next disruption. Variation theory, match analysis, data-driven approach.",
    openGraph: { title: "Jin — Tactical Analyst", description: "System adapts. Variation breaks it.", type: "website" },
  },
  ko: {
    title: "Jin — 전술 분석관",
    description: "다음 파괴를 준비하는 축구 전술 분석관. 변이 이론, 경기 분석, 데이터 기반 접근.",
    openGraph: { title: "Jin — 전술 분석관", description: "시스템은 적응한다. 변이가 그것을 깨뜨린다.", type: "website" },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--stage)", color: "var(--ink)" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
