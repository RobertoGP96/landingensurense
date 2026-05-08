import { Link, useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function ServicesPage() {
  const { t } = useOutletContext<Ctx>();

  return (
    <main style={{ padding: "80px 0 120px" }}>
      <div className="wrap">
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 80 }}
        >
          <div className="secnum">
            <b>00 / </b>
            <span>{t.services.kicker}</span>
          </div>
          <div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(48px, 8vw, 120px)",
                margin: 0,
                color: "var(--color-ink)",
              }}
            >
              {t.services.heading_a}{" "}
              <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                {t.services.heading_it}
              </span>
              {t.services.heading_b}
            </h1>
            <p
              style={{
                marginTop: 24,
                fontSize: 18,
                color: "var(--color-ink-soft)",
                maxWidth: 640,
                lineHeight: 1.55,
              }}
            >
              {t.services.lede}
            </p>
          </div>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
            borderTop: "1px solid var(--color-ink)",
            paddingTop: 32,
          }}
        >
          {t.services.items.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="block transition-all"
              style={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-rule)",
                padding: 28,
                borderRadius: 4,
                minHeight: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-ink)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-rule)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div>
                <span className="mono" style={{ opacity: 0.55 }}>
                  {s.num}
                </span>
                <h3
                  className="display"
                  style={{
                    fontSize: 28,
                    margin: "12px 0 8px",
                    color: "var(--color-ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="serif-it"
                  style={{
                    fontSize: 16,
                    color: "var(--color-sky-ink)",
                    margin: "0 0 16px",
                  }}
                >
                  {s.tagline}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--color-ink-soft)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {s.body}
                </p>
              </div>
              <div
                className="flex justify-between items-center"
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1px solid var(--color-rule)",
                }}
              >
                <span className="mono" style={{ opacity: 0.6 }}>
                  {t.services.detail.request}
                </span>
                <span className="arr" style={{ fontSize: 18 }}>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
