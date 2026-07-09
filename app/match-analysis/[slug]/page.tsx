import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMatchSlugs, getMatchSource } from "@/lib/mdx";
import { mdxComponents } from "@/components/match/mdxComponents";
import MatchHeader from "@/components/match/MatchHeader";

export function generateStaticParams() {
  return getMatchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getMatchSource(slug);
    return {
      title: `${frontmatter.home.name} ${frontmatter.home.score}–${frontmatter.away.score} ${frontmatter.away.name} | Match Analysis`,
      description: frontmatter.verdict3?.[0],
    };
  } catch {
    return {};
  }
}

export default async function MatchAnalysisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getMatchSlugs().includes(slug)) notFound();
  const { frontmatter, content } = getMatchSource(slug);

  return (
    <div style={{ background: "var(--stage)" }}>
      <MatchHeader frontmatter={frontmatter} />

      <div className="px-6 md:px-10 pt-10">
        <div className="max-w-[1000px] mx-auto rounded-2xl p-7" style={{ background: "var(--green-soft)", border: "0.5px solid var(--green-line)" }}>
          <p className="mono mb-4" style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-bright)" }}>
            Analyst&rsquo;s verdict — 3 lines
          </p>
          {frontmatter.verdict3?.map((line, i) => (
            <p key={i} className="mb-2.5 last:mb-0 flex gap-3" style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--ink)" }}>
              <span className="mono shrink-0" style={{ color: "var(--green-mid)" }}>{i + 1}</span>
              <span>{line}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-14">
        <div className="max-w-[1000px] mx-auto">
          <MDXRemote source={content} components={mdxComponents} options={{ blockJS: false }} />
        </div>
      </div>
    </div>
  );
}
