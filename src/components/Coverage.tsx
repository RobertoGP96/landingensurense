import { useState } from "react";
import { Link } from "react-router";
import type { CoverageItem, Translation } from "../data/types";

type RowProps = {
  it: CoverageItem;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
};
function CoverageRow({ it, hovered, onEnter, onLeave }: RowProps) {
  return (
    <Link
      to={`/coverage/${it.name.toLowerCase()}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="grid items-center relative"
      style={{
        gridTemplateColumns: "80px 240px 1fr 320px 80px",
        gap: 24,
        padding: hovered ? "36px 12px" : "28px 12px",
        borderBottom: "1px solid var(--color-rule)",
        background: hovered ? "var(--color-bg)" : "transparent",
        transition: "all .35s cubic-bezier(.2,.7,.2,1)",
        cursor: "pointer",
      }}
    >
      <span className="mono" style={{ color: "var(--color-ink-soft)" }}>{it.num}</span>
      <span className="display" style={{ fontSize: 32, color: "var(--color-ink)" }}>{it.name}</span>
      <span className="serif-it" style={{ fontSize: 22, color: "var(--color-ink-soft)" }}>{it.tagline}</span>
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
      <span
        className="inline-flex items-center justify-center"
        style={{
          justifySelf: "end",
          width: 44,
          height: 44,
          borderRadius: 99,
          border: "1px solid var(--color-ink)",
          color: hovered ? "var(--color-paper)" : "var(--color-ink)",
          background: hovered ? "var(--color-ink)" : "transparent",
          transform: hovered ? "translateX(4px) rotate(-45deg)" : "rotate(-45deg)",
          transition: "all .25s ease",
        }}
      >
        <span style={{ fontSize: 16, color: hovered ? "var(--color-paper)" : "var(--color-ink)" }}>→</span>
      </span>
    </Link>
  );
}

export default function Coverage({ t }: { t: Translation }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section
      id="coverage"
      style={{
        padding: "80px 0 120px",
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-ink)",
        borderBottom: "1px solid var(--color-ink)",
      }}
    >
      <div className="wrap">
        <div
          className="grid items-end"
          style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 72 }}
        >
          <div className="secnum">
            <b>01 / </b>
            <span>{t.coverage.kicker}</span>
          </div>
          <div>
            <h2
              className="display"
              style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--color-ink)" }}
            >
              {t.coverage.heading_a}{" "}
              <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                {t.coverage.heading_it}
              </span>
            </h2>
            <p
              style={{
                marginTop: 24,
                maxWidth: 540,
                fontSize: 17,
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
