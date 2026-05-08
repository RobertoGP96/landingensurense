import { Link, useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function NotFoundPage() {
  const { t } = useOutletContext<Ctx>();
  return (
    <main className="wrap text-center" style={{ padding: "180px 0", minHeight: "60vh" }}>
      <div className="mono" style={{ marginBottom: 24, opacity: 0.6 }}>
        ERROR · 404
      </div>
      <h1
        className="display"
        style={{ fontSize: "clamp(72px, 14vw, 200px)", margin: 0, color: "var(--color-ink)" }}
      >
        Lost.
      </h1>
      <p
        className="serif-it"
        style={{ fontSize: 32, marginTop: 24, color: "var(--color-sky-ink)" }}
      >
        Even an eagle misses sometimes.
      </p>
      <div className="flex justify-center" style={{ gap: 12, marginTop: 48 }}>
        <Link to="/" className="btn">
          ← {t.nav[0]}
        </Link>
        <Link to="/quote" className="btn outline">
          {t.cta.quote}
        </Link>
      </div>
    </main>
  );
}
