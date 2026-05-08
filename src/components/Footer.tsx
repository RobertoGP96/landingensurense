import type { Translation } from "../data/types";
export default function Footer({ t }: { t: Translation }) {
  return (
    <footer
      style={{
        padding: "80px 0 40px",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="wrap">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 56,
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
          {[
            { h: t.nav[0], items: t.coverage.items.slice(0, 4).map((i) => i.name) },
            { h: t.nav[3] || "Servicios", items: t.coverage.items.slice(4).map((i) => i.name) },
            {
              h: t.nav[4] || "Contacto",
              items: [t.topbar.phone, "hola@mcsolutionsins.com", t.footer.states],
            },
          ].map((col, i) => (
            <div key={i}>
              <div className="mono" style={{ opacity: 0.55, marginBottom: 18 }}>
                {col.h}
              </div>
              <ul
                className="grid"
                style={{ listStyle: "none", padding: 0, margin: 0, gap: 10 }}
              >
                {col.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 14, color: "var(--color-ink)" }}>
                    <a href="#">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
