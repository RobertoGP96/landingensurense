import type { Translation } from "../data/types";
import { Link } from "react-router";
import Eagle from "./Eagle";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function Hero({ t }: { t: Translation }) {
  const { isMobile, isSmall } = useBreakpoints();
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ paddingTop: isMobile ? 16 : 32, paddingBottom: isMobile ? 56 : 96 }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Eagle
          size={isMobile ? 600 : 1180}
          opacity={0.045}
          style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)" }}
        />
      </div>
      <div className="wrap relative">
        <div
          className="reveal d1 flex justify-between items-baseline"
          style={{ marginTop: isMobile ? 24 : 48, marginBottom: isMobile ? 32 : 56 }}
        >
          <span className="mono" style={{ opacity: 0.7 }}>{t.hero.eyebrow}</span>
          <span className="mono" style={{ opacity: 0.5 }}>FL · TX · GA</span>
        </div>

        <h1
          className="reveal d2 display"
          style={{
            fontSize: isMobile ? "clamp(48px, 14vw, 96px)" : "clamp(64px, 12vw, 184px)",
            margin: 0,
            color: "var(--color-ink)",
          }}
        >
          {t.hero.title_a}
          <br />
          <span className="serif-it" style={{ fontSize: "1.04em", color: "var(--color-sky-ink)" }}>
            {t.hero.title_b_it}
          </span>{" "}
          <span className="inline-flex items-center" style={{ gap: isMobile ? 12 : 24 }}>
            {t.hero.title_c}
            <span
              className="inline-block"
              style={{ height: "0.7em", width: 8, background: "var(--color-ink)" }}
            >
              {" "}
            </span>
          </span>
        </h1>

        <div
          className="reveal d3 grid items-end"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: isMobile ? 24 : 64,
            marginTop: isMobile ? 32 : 56,
          }}
        >
          <p
            style={{
              fontSize: isSmall ? 16 : isMobile ? 18 : 22,
              lineHeight: 1.45,
              maxWidth: 560,
              color: "var(--color-ink-soft)",
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.005em",
            }}
          >
            {t.hero.sub}
          </p>
          <div
            className="flex"
            style={{
              gap: 12,
              flexDirection: isSmall ? "column" : "row",
              justifyContent: isMobile ? "flex-start" : "flex-end",
              alignItems: isSmall ? "stretch" : "center",
            }}
          >
            <Link to="/quote" className="btn" style={isSmall ? { justifyContent: "center" } : undefined}>
              {t.cta.quote} <span className="arr">→</span>
            </Link>
            <Link to="/contact" className="btn outline" style={isSmall ? { justifyContent: "center" } : undefined}>
              {t.cta.agent}
            </Link>
          </div>
        </div>

        <div
          className="reveal d4 grid"
          style={{
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(3, 1fr) auto",
            gap: 0,
            marginTop: isMobile ? 56 : 96,
            borderTop: "1px solid var(--color-ink)",
            paddingTop: 24,
          }}
        >
          {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
            <div
              key={i}
              style={{
                borderRight: i < 2 ? "1px solid var(--color-rule)" : isMobile ? "none" : "1px solid var(--color-rule)",
                paddingRight: isMobile ? 12 : 24,
                paddingLeft: i === 0 ? 0 : isMobile ? 12 : 0,
              }}
            >
              <div
                className="display"
                style={{
                  fontSize: isSmall ? 26 : isMobile ? 34 : 56,
                  lineHeight: 1,
                  color: "var(--color-ink)",
                }}
              >
                {s.k}
              </div>
              <div
                className="mono"
                style={{ marginTop: 12, opacity: 0.7, fontSize: isSmall ? 9 : 11 }}
              >
                {s.v}
              </div>
            </div>
          ))}
          {!isMobile && (
            <div
              className="flex flex-col justify-between items-end"
              style={{ paddingLeft: 24 }}
            >
              <span className="tag">
                <span className="dot live"></span>
                {t.hero.live}
              </span>
              <span className="mono" style={{ opacity: 0.55 }}>↘ scroll</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
