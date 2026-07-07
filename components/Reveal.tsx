"use client";
import { useEffect, useRef, useState } from "react";

// Scroll-triggered fade-up reveal. Wraps any block; animates in once when it
// enters the viewport, then stops observing (no re-trigger on scroll back up).
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .6s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
