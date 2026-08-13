import { Link, useOutletContext } from "react-router";
import type { Translation, Lang, ProductCategory, ProductItem } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

const ORDER: ProductCategory[] = ["personal", "commercial", "specialty"];

export default function ProductsPage() {
  const { t } = useOutletContext<Ctx>();
  const { isMobile } = useBreakpoints();

  const grouped = ORDER.reduce<Record<ProductCategory, ProductItem[]>>(
    (acc, cat) => {
      acc[cat] = t.products.items.filter((p) => p.category === cat);
      return acc;
    },
    { personal: [], commercial: [], specialty: [] }
  );

  return (
    <main style={{ padding: isMobile ? "48px 0 80px" : "80px 0 120px" }}>
      <div className="wrap">
        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 24 : 64,
            marginBottom: isMobile ? 48 : 80,
          }}
        >
          <div className="secnum">
            <b>00 / </b>
            <span>{t.products.kicker}</span>
          </div>
          <div>
            <h1
              className="display"
              style={{ fontSize: "clamp(40px, 9vw, 120px)", margin: 0, color: "var(--color-ink)" }}
            >
              {t.products.heading_a}{" "}
              <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                {t.products.heading_it}
              </span>
              {t.products.heading_b}
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
              {t.products.lede}
            </p>
          </div>
        </div>

        {ORDER.map((cat) => (
          <section key={cat} style={{ marginBottom: 80 }}>
            <div
              className="flex justify-between items-baseline"
              style={{
                paddingBottom: 24,
                borderBottom: "1px solid var(--color-ink)",
                marginBottom: 32,
              }}
            >
              <h2
                className="display"
                style={{ fontSize: 36, margin: 0, color: "var(--color-ink)" }}
              >
                {t.products.categories[cat]}
              </h2>
              <span className="mono" style={{ opacity: 0.55 }}>
                {String(grouped[cat].length).padStart(2, "0")}{" "}
                {grouped[cat].length === 1 ? "line" : "lines"}
              </span>
            </div>

            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                gap: 24,
              }}
            >
              {grouped[cat].map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="block transition-all"
                  style={{
                    background: "var(--color-paper)",
                    border: "1px solid var(--color-rule)",
                    padding: 24,
                    borderRadius: 4,
                    minHeight: 220,
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
                    <div
                      className="flex justify-between items-baseline"
                      style={{ marginBottom: 12 }}
                    >
                      <span className="mono" style={{ opacity: 0.55 }}>
                        {p.num}
                      </span>
                      <span className="mono" style={{ opacity: 0.4, fontSize: 9 }}>
                        {cat.toUpperCase()}
                      </span>
                    </div>
                    <h3
                      className="display"
                      style={{
                        fontSize: 32,
                        margin: "0 0 8px",
                        color: "var(--color-ink)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="serif-it"
                      style={{
                        fontSize: 16,
                        color: "var(--color-sky-ink)",
                        margin: 0,
                      }}
                    >
                      {p.tagline}
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
                      {t.cta.quote.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="arr" style={{ fontSize: 18 }}>
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div
          style={{
            padding: 32,
            background: "var(--color-sky)",
            color: "var(--color-sky-ink)",
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="display" style={{ fontSize: 22, marginBottom: 4 }}>
              {t.cta.agent}
            </div>
            <div className="mono" style={{ opacity: 0.7 }}>
              {t.topbar.phone} · {t.topbar.hours}
            </div>
          </div>
          <Link to="/contact" className="btn">
            {t.nav[5]} <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
