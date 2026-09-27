import { useEffect, useRef, useState } from "react";

/** Fade-and-rise once, the first time an element scrolls into view. */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <Tag
      // @ts-expect-error — ref type varies by tag
      ref={ref}
      className={`reveal${seen ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: seen ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
