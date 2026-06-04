import type { Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";
import { Link } from "react-router";

export default function LifeFocus({ t }: { t: Translation }) {
  const { isMobile, isSmall } = useBreakpoints();
  return (
    <section
      style={{
        padding: isMobile ? "72px 0" : "120px 0",
        background: "var(--color-sky)",
        color: "var(--color-sky-ink)",
      }}
    >
      <div className="wrap">
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2.4fr",
            gap: isMobile ? 24 : 64,
            marginBottom: isMobile ? 36 : 56,
          }}
        >
          <div className="secnum" style={{ color: "var(--color-sky-ink)", opacity: 0.7 }}>
            <b>★ / </b>
            <span>{t.lifeFocus.kicker}</span>
          </div>
          <div>
            <h2
              className="display"
              style={{
                fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 6vw, 84px)",
                margin: 0,
                color: "var(--color-sky-ink)",
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              {t.lifeFocus.heading_a}{" "}
              <span className="serif-it" style={{ fontStyle: "italic" }}>
                {t.lifeFocus.heading_it}
              </span>
              {t.lifeFocus.heading_b}
            </h2>
            <p
              style={{
                marginTop: isMobile ? 20 : 28,
                fontSize: isSmall ? 18 : isMobile ? 20 : 26,
                lineHeight: 1.35,
                fontWeight: 400,
                maxWidth: 780,
                color: "var(--color-sky-ink)",
                opacity: 0.95,
                textWrap: "balance",
              }}
            >
              {t.lifeFocus.lead}
            </p>
          </div>
        </div>

        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 64,
            paddingTop: isMobile ? 28 : 40,
            borderTop: "1px solid var(--color-sky-ink)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? 15.5 : 17,
              lineHeight: 1.6,
              color: "var(--color-sky-ink)",
              opacity: 0.9,
              maxWidth: 560,
            }}
          >
            {t.lifeFocus.body}
          </p>

          <ul
            className="grid"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              gap: isMobile ? 14 : 16,
            }}
          >
            {t.lifeFocus.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start"
                style={{
                  gap: 14,
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.45,
                  color: "var(--color-sky-ink)",
                }}
              >
                <span
                  className="mono shrink-0"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    opacity: 0.6,
                    paddingTop: 3,
                    minWidth: 28,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-wrap"
          style={{
            marginTop: isMobile ? 36 : 48,
            gap: 16,
          }}
        >
          <Link
            to="/products/vida"
            className="display"
            style={{
              background: "var(--color-sky-ink)",
              color: "var(--color-sky)",
              padding: isMobile ? "14px 22px" : "16px 28px",
              fontSize: isMobile ? 15 : 16,
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            {t.cta.explore} →
          </Link>
          <Link
            to="/quote"
            className="mono"
            style={{
              padding: isMobile ? "14px 22px" : "16px 28px",
              fontSize: isMobile ? 13 : 14,
              border: "1px solid var(--color-sky-ink)",
              color: "var(--color-sky-ink)",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            {t.cta.quote}
          </Link>
        </div>
      </div>
    </section>
  );
}
