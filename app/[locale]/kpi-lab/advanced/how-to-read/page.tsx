import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { chartTitle, ZOOM_LABELS } from "@/components/kpi/AdvancedDetail";
import ChartZoomHost from "@/components/kpi/ChartZoomHost";
import { GUIDE_PAGE } from "@/lib/kpiGuideContent";
import { KPI_CHARTS } from "@/lib/kpiCharts";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const G = GUIDE_PAGE[isLocale(raw) ? raw : "en"];
  return { title: `${G.title} | KPI Lab`, description: G.intro };
}

const BACK: Record<Locale, string> = { en: "Advanced Data & KPIs", ko: "Advanced Data & KPI" };
const CHECK: Record<Locale, string> = { en: "Check", ko: "확인" };

export default async function HowToReadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const G = GUIDE_PAGE[locale];

  return (
    <section className="adv-wrap">
      <div className="adv-in adv-narrow">
        <LocaleLink href="/kpi-lab/advanced" className="adv-back">← {BACK[locale]}</LocaleLink>
        <div className="adv-kicker">{G.kicker}</div>
        <h1 className="adv-h1 adv-h1-detail">{G.title}</h1>
        <p className="adv-intro">{G.intro}</p>

        <ol className="adv-toc">
          {G.sections.map((s) => (
            <li key={s.n}><a href={`#s${s.n}`}><b>{s.n}</b>{s.h}</a></li>
          ))}
        </ol>

        {G.sections.map((s) => (
          <div key={s.n} id={`s${s.n}`} className="adv-gs">
            <div className="gn">{s.n}</div>
            <div className="gb">
              <h2>{s.h}</h2>
              <p>{s.p}</p>
              {s.extra ? <p>{s.extra}</p> : null}
              {s.v && KPI_CHARTS[s.v] ? (
                <figure className="adv-fig">
                  <div className="svg" dangerouslySetInnerHTML={{ __html: KPI_CHARTS[s.v][locale] }} />
                  {chartTitle(KPI_CHARTS[s.v][locale]) ? <figcaption>{chartTitle(KPI_CHARTS[s.v][locale])}</figcaption> : null}
                </figure>
              ) : null}
              <p className="adv-check"><b>{CHECK[locale]}</b>{s.check}</p>
            </div>
          </div>
        ))}

        <h2 className="adv-mh">{G.matrix_h}</h2>
        <div className="adv-tbl">
          <table>
            <thead><tr>{G.matrix_cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>
              {G.matrix.map((r) => (
                <tr key={r[0]}>{r.map((c, i) => <td key={i} data-label={G.matrix_cols[i]}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="adv-src">{G.sources}</p>

        <nav className="adv-pn">
          <LocaleLink href="/kpi-lab/advanced">← {BACK[locale]}</LocaleLink>
          <LocaleLink href="/kpi-lab/advanced/xt" className="r">xT →</LocaleLink>
        </nav>
      </div>
      <ChartZoomHost {...ZOOM_LABELS[locale]} />
    </section>
  );
}
