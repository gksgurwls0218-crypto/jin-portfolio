// Presentational "Enter →" tag. Place inside a parent Link that has the
// `group` class; hovering the card underlines the word and slides the arrow.
export default function EnterTag({ color = "var(--green-bright)", label = "Enter" }: { color?: string; label?: string }) {
  return (
    <span className="mono inline-flex items-center gap-2" style={{ fontSize: 13, color }}>
      <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors duration-300">{label}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
    </span>
  );
}
