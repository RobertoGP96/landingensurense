import { useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";
import ContactForm from "../components/forms/ContactForm";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function ContactPage() {
  const { t } = useOutletContext<Ctx>();
  const cf = t.contact_form;

  return (
    <main style={{ padding: "80px 0 120px" }}>
      <div className="wrap">
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 56 }}
        >
          <div className="secnum">
            <b>00 / </b>
            <span>{cf.kicker}</span>
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
              {cf.heading_a}{" "}
              <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                {cf.heading_it}
              </span>
              {cf.heading_b}
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
              {cf.sub}
            </p>
          </div>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--color-ink)",
            borderBottom: "1px solid var(--color-rule)",
            marginBottom: 56,
          }}
        >
          {t.contact.cards.map((c, i) => (
            <div
              key={i}
              style={{
                padding: "32px 24px 32px 0",
                borderRight: i < 2 ? "1px solid var(--color-rule)" : "none",
                paddingLeft: i > 0 ? 24 : 0,
              }}
            >
              <div className="mono" style={{ opacity: 0.55, marginBottom: 16 }}>
                0{i + 1} · {c.label}
              </div>
              <div
                className="display"
                style={{
                  fontSize: 22,
                  color: "var(--color-ink)",
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--color-ink-soft)", lineHeight: 1.5 }}>
                {c.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 1.6fr", gap: 48 }}
        >
          <div className="sticky" style={{ top: 100, alignSelf: "start" }}>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.contact.kicker}
            </div>
            <h2
              className="display serif-it"
              style={{
                fontSize: 36,
                margin: 0,
                color: "var(--color-sky-ink)",
                lineHeight: 1.1,
              }}
            >
              {t.contact.heading_a} {t.contact.heading_it}
              {t.contact.heading_b}
            </h2>

            <div
              className="flex items-start"
              style={{
                marginTop: 32,
                padding: 24,
                background: "var(--color-sky)",
                color: "var(--color-sky-ink)",
                borderRadius: 4,
                gap: 16,
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
                  style={{ fontSize: 18, marginBottom: 6, color: "var(--color-sky-ink)" }}
                >
                  {t.contact.after}
                </div>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>{t.contact.after_d}</p>
              </div>
            </div>
          </div>

          <ContactForm t={t} />
        </div>
      </div>
    </main>
  );
}
