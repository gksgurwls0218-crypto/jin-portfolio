export default function Footer() {
  return (
    <footer
      className="relative px-6 md:px-10 pt-20 pb-10"
      style={{ background: "var(--stage)", borderTop: "0.5px solid var(--edge)" }}
    >
      <div className="max-w-[1180px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="mono t-eyebrow" style={{ color: "var(--green-mid)" }}>Get in touch</span>
          <a
            href="mailto:218apple@naver.com"
            className="display group inline-flex items-center gap-3 w-fit transition-colors duration-300"
            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.03em" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--green-bright)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink)")}
          >
            218apple@naver.com
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: "var(--green-mid)" }}>→</span>
          </a>
        </div>
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "0.5px solid var(--edge)" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.04em" }}>
            Jin · Tactical Analyst · {new Date().getFullYear()}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.16em" }}>
            VARIATION THEORY
          </span>
        </div>
      </div>
    </footer>
  );
}
