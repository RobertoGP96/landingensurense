import type { Translation } from "../data/types";
export default function Process({ t }: { t: Translation }) {
  return (
    <section
      id="process"
      style={{ padding: "120px 0", background: "var(--color-ink)", color: "var(--color-paper)" }}
    >
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 96 }}>
          <div className="secnum" style={{ color: "var(--color-paper)" }}>
            <b>03 / </b>
            <span>{t.process.kicker}</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 6vw, 84px)",
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
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid rgba(241,236,226,0.25)",
          }}
        >
          {t.process.steps.map((s, i) => (
            <div
              key={i}
              className="relative"
              style={{
                padding: "40px 24px 40px 0",
                borderRight: i < 3 ? "1px solid rgba(241,236,226,0.2)" : "none",
                paddingLeft: i > 0 ? 24 : 0,
              }}
            >
              <div
                className="flex items-baseline justify-between"
                style={{ marginBottom: 28 }}
              >
                <span
                  className="display"
                  style={{ fontSize: 80, color: "var(--color-paper)", opacity: 0.95 }}
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
                  {i < 3 ? "→" : "✓"}
                </span>
              </div>
              <h3 className="display" style={{ fontSize: 28, margin: "0 0 14px 0", color: "var(--color-paper)" }}>
                {s.t}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "rgba(241,236,226,0.7)",
                  margin: 0,
                  maxWidth: 280,
                }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
