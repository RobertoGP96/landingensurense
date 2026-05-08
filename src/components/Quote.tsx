import { useState } from "react";
import { withViewTransition } from "../hooks/useT";
import type { Translation } from "../data/types";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};
function Field({ label, value, onChange, placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="mono" style={{ display: "block", marginBottom: 8, opacity: 0.6 }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
        style={{
          padding: "14px 0",
          border: 0,
          borderBottom: "1px solid var(--color-rule)",
          fontFamily: "var(--font-display)",
          fontSize: 22,
          color: "var(--color-ink)",
          transition: "border-color .2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-ink)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-rule)")}
      />
    </label>
  );
}

export default function Quote({ t }: { t: Translation }) {
  const [type, setType] = useState(t.quote.types[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [langp, setLangp] = useState("ES");
  const [consent, setConsent] = useState(true);
  const [sent, setSent] = useState(false);

  const valid = name.trim() && phone.trim() && zip.trim().length >= 5 && consent;
  const codes = ["AU", "HO", "LI", "HE", "CO", "TR", "BO", "UM"];

  return (
    <section id="quote" className="relative overflow-hidden" style={{ padding: "140px 0" }}>
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div className="secnum">
            <b>04 / </b>
            <span>{t.quote.kicker}</span>
          </div>
          <div>
            <h2
              className="display"
              style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--color-ink)" }}
            >
              {t.quote.heading_a}{" "}
              <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                {t.quote.heading_it}
              </span>
              {t.quote.heading_b}
            </h2>
            <p style={{ marginTop: 20, fontSize: 17, color: "var(--color-ink-soft)" }}>
              {t.quote.sub}
            </p>
          </div>
        </div>

        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 1.6fr", gap: 48 }}
        >
          <div className="sticky" style={{ top: 100 }}>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.quote.labels.type}
            </div>
            <div className="grid" style={{ gap: 8 }}>
              {t.quote.types.map((tp, i) => (
                <button
                  key={i}
                  onClick={() => setType(tp)}
                  className="flex items-center justify-between text-left transition-all duration-200"
                  style={{
                    padding: "14px 18px",
                    border:
                      type === tp ? "1px solid var(--color-ink)" : "1px solid var(--color-rule)",
                    background: type === tp ? "var(--color-ink)" : "transparent",
                    color: type === tp ? "var(--color-paper)" : "var(--color-ink)",
                    borderRadius: 4,
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 18,
                  }}
                >
                  <span>{tp}</span>
                  <span className="mono" style={{ fontSize: 10, opacity: 0.7 }}>
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) withViewTransition(() => setSent(true));
            }}
            className="relative"
            style={{
              background: "var(--color-paper)",
              border: "1px solid var(--color-ink)",
              padding: 48,
              borderRadius: 4,
              viewTransitionName: "vt-quote-card",
            }}
          >
            <div
              className="mono absolute"
              style={{ top: 20, right: 20, opacity: 0.5 }}
            >
              FORM · 04.{codes[t.quote.types.indexOf(type)] || "AU"}
            </div>
            {sent ? (
              <div className="text-center" style={{ padding: "60px 0" }}>
                <div className="serif-it" style={{ fontSize: 48, color: "var(--color-sky-ink)" }}>
                  Recibido.
                </div>
                <p style={{ marginTop: 16, color: "var(--color-ink-soft)" }}>{t.quote.note}</p>
              </div>
            ) : (
              <>
                <div className="grid" style={{ gap: 24 }}>
                  <Field
                    label={t.quote.labels.name}
                    value={name}
                    onChange={setName}
                    placeholder={t.quote.placeholders.name}
                  />
                  <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
                    <Field
                      label={t.quote.labels.phone}
                      value={phone}
                      onChange={setPhone}
                      placeholder={t.quote.placeholders.phone}
                    />
                    <Field
                      label={t.quote.labels.zip}
                      value={zip}
                      onChange={setZip}
                      placeholder={t.quote.placeholders.zip}
                    />
                  </div>
                  <div>
                    <label
                      className="mono block"
                      style={{ marginBottom: 8, opacity: 0.6 }}
                    >
                      {t.quote.labels.lang_pref}
                    </label>
                    <div
                      className="inline-flex"
                      style={{
                        border: "1px solid var(--color-ink)",
                        padding: 3,
                        borderRadius: 99,
                      }}
                    >
                      {["ES", "EN"].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLangp(l)}
                          style={{
                            padding: "8px 18px",
                            border: 0,
                            background:
                              langp === l ? "var(--color-ink)" : "transparent",
                            color: langp === l ? "var(--color-paper)" : "var(--color-ink)",
                            borderRadius: 99,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            cursor: "pointer",
                          }}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label
                    className="flex items-start cursor-pointer"
                    style={{
                      gap: 12,
                      fontSize: 13,
                      color: "var(--color-ink-soft)",
                      lineHeight: 1.5,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: 3, accentColor: "var(--color-ink)" }}
                    />
                    <span>{t.quote.labels.consent}</span>
                  </label>
                </div>
                <div
                  className="flex justify-between items-center"
                  style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--color-rule)" }}
                >
                  <span className="mono" style={{ opacity: 0.6 }}>
                    {t.quote.note}
                  </span>
                  <button
                    type="submit"
                    disabled={!valid}
                    className="btn"
                    style={{ opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed" }}
                  >
                    {t.quote.submit} <span className="arr">→</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
