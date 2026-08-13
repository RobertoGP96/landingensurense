import { Link, useOutletContext, useParams } from "react-router";
import type { Translation, Lang } from "../data/types";
import ServiceForm from "../components/forms/ServiceForm";
import { useBreakpoints } from "../hooks/useMediaQuery";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function ServiceDetailPage() {
  const { t } = useOutletContext<Ctx>();
  const { slug } = useParams();
  const { isMobile, isDesktop } = useBreakpoints();

  const item = t.services.items.find((i) => i.slug === slug);

  if (!item) {
    return (
      <main className="wrap" style={{ padding: isMobile ? "80px 0" : "120px 0", minHeight: "60dvh" }}>
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
    <main style={{ padding: isMobile ? "48px 0 80px" : "80px 0 120px" }}>
      <div className="wrap">
        <div className="secnum" style={{ marginBottom: 24 }}>
          <b>{item.num} / </b>
          <span>{t.services.kicker}</span>
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(36px, 9vw, 120px)",
            margin: "0 0 24px",
            color: "var(--color-ink)",
          }}
        >
          {item.name}
        </h1>
        <p
          className="serif-it"
          style={{
            fontSize: isMobile ? 20 : 28,
            color: "var(--color-sky-ink)",
            margin: isMobile ? "0 0 32px" : "0 0 48px",
            maxWidth: 720,
          }}
        >
          {item.tagline}
        </p>

        <div
          className="grid"
          style={{
            gridTemplateColumns: isDesktop ? "1fr 1.6fr" : "1fr",
            gap: isMobile ? 32 : 48,
            marginTop: 32,
            paddingTop: isMobile ? 32 : 48,
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          <div
            className={isDesktop ? "sticky" : undefined}
            style={isDesktop ? { top: 100, alignSelf: "start" } : undefined}
          >
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
