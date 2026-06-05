import { Link, useOutletContext, useParams } from "react-router";
import type { Translation, Lang } from "../data/types";
import ProductQuoteForm from "../components/forms/ProductQuoteForm";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function ProductDetailPage() {
  const { t } = useOutletContext<Ctx>();
  const { slug } = useParams();

  const item = t.products.items.find((i) => i.slug === slug);

  if (!item) {
    return (
      <main className="wrap" style={{ padding: "120px 0", minHeight: "60vh" }}>
        <div className="secnum">
          <b>404 / </b>
          <span>{slug}</span>
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", margin: "32px 0 24px", color: "var(--color-ink)" }}
        >
          {t.products.detail.back}.
        </h1>
        <Link to="/products" className="btn outline">
          ← {t.products.detail.back}
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "80px 0 0" }}>
      <div className="wrap">
        <div className="secnum" style={{ marginBottom: 24 }}>
          <b>{item.num} / </b>
          <span>{t.products.kicker}</span>
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(64px, 11vw, 168px)", margin: "0 0 24px", color: "var(--color-ink)" }}
        >
          {item.name}
        </h1>
        <p
          className="serif-it"
          style={{ fontSize: 32, color: "var(--color-sky-ink)", margin: "0 0 48px", maxWidth: 720 }}
        >
          {item.tagline}
        </p>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.5fr",
            gap: 64,
            marginTop: 48,
            paddingTop: 48,
            borderTop: "1px solid var(--color-ink)",
            paddingBottom: 64,
          }}
        >
          <div className="sticky" style={{ top: 100, alignSelf: "start" }}>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.products.detail.coverage}
            </div>
            <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0, gap: item.details?.length ? 20 : 12 }}>
              {item.details?.length
                ? item.details.map((d, i) => (
                    <li key={i}>
                      <span className="display" style={{ fontSize: 22, color: "var(--color-ink)" }}>
                        {d.label}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: 4,
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: "var(--color-ink-soft)",
                        }}
                      >
                        {d.desc}
                      </span>
                    </li>
                  ))
                : item.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="display"
                      style={{ fontSize: 22, color: "var(--color-ink)" }}
                    >
                      · {b}
                    </li>
                  ))}
            </ul>
            <div
              className="tag"
              style={{
                marginTop: 24,
                background: "var(--color-sky)",
                color: "var(--color-sky-ink)",
              }}
            >
              <span className="dot" /> {t.products.categories[item.category]}
            </div>
          </div>

          <div>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.products.detail.overview}
            </div>
            <p
              style={{
                fontSize: 22,
                lineHeight: 1.55,
                color: "var(--color-ink-soft)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              {item.body}
            </p>

            <div className="flex flex-wrap" style={{ marginTop: 48, gap: 12 }}>
              <a href="#quote" className="btn">
                {t.products.detail.quote_cta} <span className="arr">↓</span>
              </a>
              <Link to="/products" className="btn outline">
                ← {t.products.detail.back}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-rule)" }}>
        <ProductQuoteForm t={t} productSlug={item.slug} />
      </div>
    </main>
  );
}
