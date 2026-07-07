export default function Footer() {
  return (
    <footer
      className="py-8 px-7 flex items-center justify-between"
      style={{ borderTop: "0.5px solid var(--border-subtle)" }}
    >
      <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>
        Jin · Tactical Analyst · {new Date().getFullYear()}
      </span>
      <a
        href="mailto:218apple@naver.com"
        className="mono text-xs transition-colors duration-200"
        style={{ color: "rgba(100,160,95,0.7)", borderBottom: "0.5px solid rgba(100,160,95,0.3)", paddingBottom: "1px" }}
      >
        218apple@naver.com
      </a>
    </footer>
  );
}
