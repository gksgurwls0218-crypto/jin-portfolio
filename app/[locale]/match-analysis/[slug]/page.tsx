import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMatchSlugs, getMatchSource } from "@/lib/mdx";
import { mdxComponents } from "@/components/match/mdxComponents";
import MatchHeader from "@/components/match/MatchHeader";
import MatchVideo from "@/components/match/MatchVideo";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return getMatchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const { frontmatter } = getMatchSource(slug, isLocale(locale) ? locale : "en");
    const suffix = locale === "ko" ? "경기 분석" : "Match Analysis";
    return {
      title: `${frontmatter.home.name} ${frontmatter.home.score}–${frontmatter.away.score} ${frontmatter.away.name} | ${suffix}`,
      description: frontmatter.verdict3?.[0],
    };
  } catch {
    return {};
  }
}

export default async function MatchAnalysisPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  if (!getMatchSlugs().includes(slug)) notFound();
  const { frontmatter, content } = getMatchSource(slug, locale);
  const verdictLabel = locale === "ko" ? "분석관의 총평 — 3줄" : "Analyst’s verdict — 3 lines";

  return (
    <div style={{ background: "var(--stage)" }}>
      {frontmatter.video ? (
        <div className="mh-video">
          <MatchVideo src={frontmatter.video} captionsEn={frontmatter.captionsEn} captionsKo={frontmatter.captionsKo} />
        </div>
      ) : null}
      <MatchHeader frontmatter={frontmatter} locale={locale} />

      <div className="adv-in adv-narrow mh-body">
        <div className="mh-verdict">
          <p className="adv-blk-label">{verdictLabel}</p>
          <ol>
            {frontmatter.verdict3?.map((line, i) => (
              <li key={i}><b>{i + 1}</b><span>{line}</span></li>
            ))}
          </ol>
        </div>
        <MDXRemote source={content} components={mdxComponents} options={{ blockJS: false }} />
      </div>
    </div>
  );
}
