import type { Translation } from "../data/types";
import { Link } from "react-router";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function Footer({ t }: { t: Translation }) {
  const productCols = t.products.items.slice(0, 8);
  const services = t.services.items;
  const { isMobile, isSmall } = useBreakpoints();

  return (
    <footer
      style={{
        padding: isMobile ? "56px 0 32px" : "80px 0 40px",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="wrap">
        <div
          className="grid"
          style={{
            gridTemplateColumns: isSmall
              ? "1fr"
              : isMobile
              ? "1fr 1fr"
              : "2fr 1fr 1fr 1fr",
            gap: isMobile ? 32 : 48,
            paddingBottom: isMobile ? 32 : 56,
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div>
            <div className="flex items-center" style={{ gap: 14, marginBottom: 24 }}>
              <img src="/assets/eagle.png" alt="" style={{ height: 48 }} />
              <div>
                <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>
                  M C Solutions Insurance
                </div>
                <div className="mono" style={{ opacity: 0.6, marginTop: 4 }}>
                  {t.footer.tag}
                </div>
              </div>
            </div>
            <p
              style={{
                maxWidth: 360,
                fontSize: 14,
                color: "var(--color-ink-soft)",
                lineHeight: 1.55,
                marginTop: 16,
              }}
            >
              {t.footer.address}
            </p>
            <p className="mono" style={{ opacity: 0.55, marginTop: 16 }}>
              {t.footer.lic}
            </p>
          </div>

          <div>
            <div className="mono" style={{ opacity: 0.55, marginBottom: 18 }}>
              {t.footer.cols.products}
            </div>
            <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0, gap: 10 }}>
              {productCols.map((p) => (
                <li key={p.slug} style={{ fontSize: 14, color: "var(--color-ink)" }}>
                  <Link to={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
              <li style={{ fontSize: 13, color: "var(--color-ink)", opacity: 0.7 }}>
                <Link to="/products">→ {t.products.detail.back}</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mono" style={{ opacity: 0.55, marginBottom: 18 }}>
              {t.footer.cols.services}
            </div>
            <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0, gap: 10 }}>
              {services.map((s) => (
                <li key={s.slug} style={{ fontSize: 14, color: "var(--color-ink)" }}>
                  <Link to={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono" style={{ opacity: 0.55, marginBottom: 18 }}>
              {t.footer.cols.company}
            </div>
            <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0, gap: 10 }}>
              <li style={{ fontSize: 14 }}>
                <Link to="/quote">{t.nav[1]}</Link>
              </li>
              <li style={{ fontSize: 14 }}>
                <Link to="/contact">{t.nav[5]}</Link>
              </li>
              <li style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>{t.topbar.phone}</li>
              <li style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>
                hola@mcsolutionsins.com
              </li>
              <li style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>{t.footer.states}</li>
            </ul>
          </div>
        </div>

        <div
          className="flex justify-between items-center flex-wrap"
          style={{ marginTop: 28, gap: 16 }}
        >
          <span className="mono" style={{ opacity: 0.55 }}>
            {t.footer.copy}
          </span>
          <div className="flex" style={{ gap: 24 }}>
            {t.footer.links.map((l, i) => (
              <a key={i} href="#" className="mono" style={{ opacity: 0.6 }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
