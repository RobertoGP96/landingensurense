import { useState } from "react";
import { Link } from "react-router";
import type { CoverageItem, Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

type RowProps = {
  it: CoverageItem;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
};
function CoverageRow({ it, hovered, onEnter, onLeave, isMobile }: RowProps) {
  return (
    <Link
      to={`/coverage/${it.slug ?? it.name.toLowerCase()}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="grid items-center relative"
      style={{
        gridTemplateColumns: isMobile
          ? "auto 1fr 36px"
          : "80px minmax(180px, 240px) 1fr minmax(200px, 320px) 80px",
        gap: isMobile ? 12 : 24,
        padding: isMobile
          ? "20px 0"
          : hovered
          ? "36px 12px"
          : "28px 12px",
        borderBottom: "1px solid var(--color-rule)",
        background: hovered && !isMobile ? "var(--color-bg)" : "transparent",
        transition: "all .35s cubic-bezier(.2,.7,.2,1)",
        cursor: "pointer",
      }}
    >
      <span
        className="mono"
        style={{
          color: "var(--color-ink-soft)",
          fontSize: isMobile ? 10 : 11,
        }}
      >
        {it.num}
      </span>
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="display" style={{ fontSize: 22, color: "var(--color-ink)" }}>
            {it.name}
          </span>
          <span className="serif-it" style={{ fontSize: 16, color: "var(--color-ink-soft)" }}>
            {it.tagline}
          </span>
        </div>
      ) : (
        <>
          <span className="display" style={{ fontSize: 32, color: "var(--color-ink)" }}>
            {it.name}
          </span>
          <span className="serif-it" style={{ fontSize: 22, color: "var(--color-ink-soft)" }}>
            {it.tagline}
          </span>
          <div
            style={{
              opacity: hovered ? 1 : 0.5,
              transition: "opacity .25s ease",
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--color-ink-soft)",
              maxWidth: 320,
            }}
          >
            {it.body}
          </div>
        </>
      )}
      <span
        className="inline-flex items-center justify-center"
        style={{
          justifySelf: "end",
          width: isMobile ? 32 : 44,
          height: isMobile ? 32 : 44,
          borderRadius: 99,
          border: "1px solid var(--color-ink)",
          color: hovered ? "var(--color-paper)" : "var(--color-ink)",
          background: hovered ? "var(--color-ink)" : "transparent",
          transform: hovered ? "translateX(4px) rotate(-45deg)" : "rotate(-45deg)",
          transition: "all .25s ease",
        }}
      >
        <span style={{ fontSize: isMobile ? 13 : 16, color: hovered ? "var(--color-paper)" : "var(--color-ink)" }}>
          →
        </span>
      </span>
    </Link>
  );
}

export default function Coverage({ t }: { t: Translation }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { isMobile, isDesktop } = useBreakpoints();
  // The 5-column desktop row needs ~900px of track space; use the compact
  // layout for everything below the desktop breakpoint, not just phones.
  const compactRows = !isDesktop;
  return (
    <section
      id="coverage"
      style={{
        padding: isMobile ? "56px 0 64px" : "80px 0 120px",
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-ink)",
        borderBottom: "1px solid var(--color-ink)",
      }}
    >
      <div className="wrap">
        <div
          className="grid items-end"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 24 : 64,
            marginBottom: isMobile ? 40 : 72,
          }}
        >
          <div className="secnum">
            <b>01 / </b>
            <span>{t.coverage.kicker}</span>
          </div>
          <div>
            <h2
              className="display"
              style={{
                fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 6vw, 84px)",
                margin: 0,
                color: "var(--color-ink)",
              }}
            >
              {t.coverage.heading_a}{" "}
              <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                {t.coverage.heading_it}
              </span>
            </h2>
            <p
              style={{
                marginTop: isMobile ? 16 : 24,
                maxWidth: 540,
                fontSize: isMobile ? 15 : 17,
                lineHeight: 1.55,
                color: "var(--color-ink-soft)",
              }}
            >
              {t.coverage.lede}
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--color-ink)" }}>
          {t.coverage.items.map((it, i) => (
            <CoverageRow
              key={i}
              it={it}
              hovered={hovered === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
              isMobile={compactRows}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
