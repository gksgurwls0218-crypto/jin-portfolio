"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/approach", label: "Approach" },
  { href: "/match-analysis", label: "Match Analysis" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-7 py-4"
      style={{
        background: "linear-gradient(to bottom, rgba(11,22,10,0.9) 0%, transparent 100%)",
        backdropFilter: "blur(0px)",
      }}
    >
      <Link
        href="/"
        className="mono text-xs tracking-widest"
        style={{ color: "var(--text-secondary)" }}
      >
        JIN · TACTICAL ANALYST
      </Link>

      <div className="flex gap-2">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm px-4 py-1.5 rounded-full transition-all duration-300"
              style={
                active
                  ? {
                      color: "rgba(200,230,195,0.95)",
                      background: "rgba(45,90,39,0.35)",
                      backdropFilter: "blur(8px)",
                      border: "0.5px solid rgba(100,180,90,0.25)",
                    }
                  : { color: "rgba(180,210,175,0.5)" }
              }
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
