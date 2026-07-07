import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMatchSlugs, getMatchSource } from "@/lib/mdx";
import { mdxComponents } from "@/components/match/mdxComponents";
import MatchHeader from "@/components/match/MatchHeader";
import MatchNav from "@/components/match/MatchNav";

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
    <div style={{ background: "#0e0a06" }}>
      <MatchHeader frontmatter={frontmatter} />

      <div className="px-6 md:px-12 pt-6">
        <div className="rounded-xl p-5 mb-2" style={{ background: "rgba(255,130,40,.07)", border: "0.5px solid rgba(255,155,70,.26)" }}>
          <p className="mono mb-2.5" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--amber-dim,rgba(255,155,70,.88))" }}>
            ANALYST&rsquo;S VERDICT — 3 LINES
          </p>
          {frontmatter.verdict3?.map((line, i) => (
            <p key={i} className="mb-1.5 last:mb-0" style={{ fontSize: 13, color: "rgba(232,224,212,.92)" }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <MatchNav />

      <div className="px-6 md:px-12 py-11 max-w-[880px]">
        <MDXRemote source={content} components={mdxComponents} options={{ blockJS: false }} />
      </div>
    </div>
  );
}
