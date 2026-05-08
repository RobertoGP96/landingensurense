import type { Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function Process({ t }: { t: Translation }) {
  const { isMobile, isSmall } = useBreakpoints();
  const cols = isSmall ? "1fr" : isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)";
  return (
    <section
      id="process"
      style={{
        padding: isMobile ? "72px 0" : "120px 0",
        background: "var(--color-ink)",
        color: "var(--color-paper)",
      }}
    >
      <div className="wrap">
        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 24 : 64,
            marginBottom: isMobile ? 48 : 96,
          }}
        >
          <div className="secnum" style={{ color: "var(--color-paper)" }}>
            <b>03 / </b>
            <span>{t.process.kicker}</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 6vw, 84px)",
              margin: 0,
              color: "var(--color-paper)",
              maxWidth: 920,
            }}
          >
            {t.process.heading_a}{" "}
            <span className="serif-it" style={{ color: "var(--color-sky)" }}>
              {t.process.heading_it}
            </span>
            {t.process.heading_b}
          </h2>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: cols,
            borderTop: "1px solid rgba(241,236,226,0.25)",
          }}
        >
          {t.process.steps.map((s, i) => {
            const lastInRow = isSmall
              ? true
              : isMobile
              ? (i + 1) % 2 === 0
              : i === 3;
            const isLast = i === t.process.steps.length - 1;
            return (
              <div
                key={i}
                className="relative"
                style={{
                  padding: isMobile ? "28px 0" : "40px 24px 40px 0",
                  borderRight: !isMobile && i < 3 ? "1px solid rgba(241,236,226,0.2)" : "none",
                  borderBottom:
                    isMobile && !isLast ? "1px solid rgba(241,236,226,0.18)" : "none",
                  paddingLeft: !isMobile && i > 0 ? 24 : 0,
                }}
              >
                <div
                  className="flex items-baseline justify-between"
                  style={{ marginBottom: isMobile ? 18 : 28 }}
                >
                  <span
                    className="display"
                    style={{
                      fontSize: isMobile ? 48 : 80,
                      color: "var(--color-paper)",
                      opacity: 0.95,
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 99,
                      border: "1px solid rgba(241,236,226,0.4)",
                      fontSize: 11,
                      opacity: 0.6,
                    }}
                  >
                    {!lastInRow ? "→" : "✓"}
                  </span>
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: isMobile ? 20 : 28,
                    margin: "0 0 14px 0",
                    color: "var(--color-paper)",
                  }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? 14 : 14.5,
                    lineHeight: 1.55,
                    color: "rgba(241,236,226,0.7)",
                    margin: 0,
                    maxWidth: 280,
                  }}
                >
                  {s.d}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
