import type { Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function Contact({ t }: { t: Translation }) {
  const { isMobile } = useBreakpoints();
  return (
    <section id="contact" style={{ padding: isMobile ? "72px 0" : "140px 0 120px" }}>
      <div className="wrap">
        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 24 : 64,
            marginBottom: isMobile ? 40 : 80,
          }}
        >
          <div className="secnum">
            <b>06 / </b>
            <span>{t.contact.kicker}</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 6vw, 84px)",
              margin: 0,
              color: "var(--color-ink)",
            }}
          >
            {t.contact.heading_a}{" "}
            <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
              {t.contact.heading_it}
            </span>
            {t.contact.heading_b}
          </h2>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          {t.contact.cards.map((c, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? "24px 0" : "44px 32px 44px 0",
                borderRight: !isMobile && i < 2 ? "1px solid var(--color-rule)" : "none",
                borderBottom:
                  isMobile && i < t.contact.cards.length - 1
                    ? "1px solid var(--color-rule)"
                    : "none",
                paddingLeft: !isMobile && i > 0 ? 32 : 0,
              }}
            >
              <div className="mono" style={{ opacity: 0.55, marginBottom: isMobile ? 14 : 24 }}>
                0{i + 1} · {c.label}
              </div>
              <div
                className="display"
                style={{
                  fontSize: isMobile ? 22 : 28,
                  color: "var(--color-ink)",
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                  wordBreak: "break-word",
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: 14, color: "var(--color-ink-soft)", lineHeight: 1.5 }}>
                {c.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-start"
          style={{
            marginTop: isMobile ? 32 : 56,
            padding: isMobile ? 20 : 32,
            background: "var(--color-sky)",
            color: "var(--color-sky-ink)",
            borderRadius: 4,
            gap: isMobile ? 16 : 24,
          }}
        >
          <span
            className="mono shrink-0"
            style={{
              background: "var(--color-sky-ink)",
              color: "var(--color-sky)",
              padding: "6px 10px",
              borderRadius: 4,
            }}
          >
            !
          </span>
          <div>
            <div
              className="display"
              style={{ fontSize: isMobile ? 18 : 20, marginBottom: 6, color: "var(--color-sky-ink)" }}
            >
              {t.contact.after}
            </div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55 }}>{t.contact.after_d}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
