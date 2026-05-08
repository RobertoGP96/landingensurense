import { Link, useOutletContext, useParams } from "react-router";
import type { Translation, Lang } from "../data/types";
import ServiceForm from "../components/forms/ServiceForm";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function ServiceDetailPage() {
  const { t } = useOutletContext<Ctx>();
  const { slug } = useParams();

  const item = t.services.items.find((i) => i.slug === slug);

  if (!item) {
    return (
      <main className="wrap" style={{ padding: "120px 0", minHeight: "60vh" }}>
        <div className="secnum">
          <b>404 / </b>
          <span>{slug}</span>
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            margin: "32px 0 24px",
            color: "var(--color-ink)",
          }}
        >
          {t.services.detail.back}.
        </h1>
        <Link to="/services" className="btn outline">
          ← {t.services.detail.back}
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "80px 0 120px" }}>
      <div className="wrap">
        <div className="secnum" style={{ marginBottom: 24 }}>
          <b>{item.num} / </b>
          <span>{t.services.kicker}</span>
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(56px, 9vw, 120px)",
            margin: "0 0 24px",
            color: "var(--color-ink)",
          }}
        >
          {item.name}
        </h1>
        <p
          className="serif-it"
          style={{
            fontSize: 28,
            color: "var(--color-sky-ink)",
            margin: "0 0 48px",
            maxWidth: 720,
          }}
        >
          {item.tagline}
        </p>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.6fr",
            gap: 48,
            marginTop: 32,
            paddingTop: 48,
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          <div className="sticky" style={{ top: 100, alignSelf: "start" }}>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.products.detail.overview}
            </div>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--color-ink-soft)",
                margin: 0,
              }}
            >
              {item.body}
            </p>
            <div style={{ marginTop: 32 }}>
              <Link to="/services" className="btn outline">
                ← {t.services.detail.back}
              </Link>
            </div>
          </div>

          <ServiceForm t={t} service={item} />
        </div>
      </div>
    </main>
  );
}
