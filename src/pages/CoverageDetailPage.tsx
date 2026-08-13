import { Link, useOutletContext, useParams } from "react-router";
import type { Translation, Lang } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function CoveragePage() {
  const { t } = useOutletContext<Ctx>();
  const { slug } = useParams();
  const { isMobile, isDesktop } = useBreakpoints();

  const needle = (slug || "").toLowerCase();
  const item = t.coverage.items.find(
    (i) => (i.slug && i.slug.toLowerCase() === needle) || i.name.toLowerCase() === needle
  );

  if (!item) {
    return (
      <main className="wrap" style={{ padding: isMobile ? "80px 0" : "120px 0", minHeight: "60dvh" }}>
        <div className="secnum">
          <b>404 / </b>
          <span>{slug}</span>
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", margin: "32px 0 24px", color: "var(--color-ink)" }}
        >
          Coverage not found.
        </h1>
        <Link to="/" className="btn outline">
          ← {t.cta.explore}
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: isMobile ? "48px 0 80px" : "80px 0 120px" }}>
      <div className="wrap">
        <div className="secnum" style={{ marginBottom: 24 }}>
          <b>{item.num} / </b>
          <span>{t.coverage.kicker}</span>
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(40px, 11vw, 168px)", margin: "0 0 24px", color: "var(--color-ink)" }}
        >
          {item.name}
        </h1>
        <p
          className="serif-it"
          style={{
            fontSize: isMobile ? 22 : 32,
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
            gridTemplateColumns: isDesktop ? "1fr 1.5fr" : "1fr",
            gap: isMobile ? 32 : 48,
            marginTop: isMobile ? 32 : 48,
            paddingTop: isMobile ? 32 : 48,
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          <div>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.cta.explore}
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
          </div>

          <div>
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

            <div className="flex flex-wrap" style={{ marginTop: isMobile ? 32 : 48, gap: 12 }}>
              <Link to="/quote" className="btn">
                {t.cta.quote} <span className="arr">→</span>
              </Link>
              <Link to="/" className="btn outline">
                ← {t.cta.explore}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
