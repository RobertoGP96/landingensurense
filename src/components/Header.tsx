import type { Translation } from "../data/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Header({ t }: { t: Translation }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const targets = ["coverage", "quote", "about", "process", "contact"];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(227,237,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-rule)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between" style={{ padding: "20px 56px" }}>
        <Link to="/" className="flex items-center" style={{ gap: 14 }}>
          <img src="/assets/eagle.png" alt="" style={{ height: 38, width: "auto" }} />
          <div className="grid leading-none" style={{ gap: 4 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.02em",
              }}
            >
              M C Solutions
            </span>
            <span className="mono" style={{ opacity: 0.55, fontSize: 9 }}>
              Insurance · LLC
            </span>
          </div>
        </Link>
        <nav className="flex" style={{ gap: 32 }}>
          {t.nav.map((n, i) => (
            <a
              key={i}
              href={`/#${targets[i]}`}
              className="transition-opacity"
              style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink)", opacity: 0.85 }}
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="flex" style={{ gap: 12 }}>
          <Link className="btn outline" to="/quote" style={{ padding: "10px 18px", fontSize: 13 }}>
            {t.cta.quote} <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
