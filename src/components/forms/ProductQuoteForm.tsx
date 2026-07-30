import { useMemo, useState } from "react";
import type { Translation, FieldDef } from "../../data/types";
import Field from "./Field";
import FormShell from "./FormShell";
import { useFormSubmit } from "./useFormSubmit";
import { useBreakpoints } from "../../hooks/useMediaQuery";
import AutoQuoteForm from "./AutoQuoteForm";
import { useT } from "../../hooks/useT";

type Props = {
  t: Translation;
  productSlug?: string;
  /** Optional heading override; when omitted uses the standard quote heading. */
  hideHeader?: boolean;
};

const DEFAULT_PRODUCT = "auto";

const EXTERNAL_QUOTE_URLS: Record<string, string> = {
  dental:
    "https://customer.enroll.natgenhealth.com/quick-quote/?agent=CfDJ8HnG7iviitJBoT9st8R33ETiPJXYwnDEfwTcDZ_KntkIEfI7Ah2GHXryGKZpoAHOUPvCnwL-DCnPWlCy2qduCA2g0A&product=dvh",
  medico:
    "https://customer.enroll.natgenhealth.com/quick-quote/?agent=CfDJ8HnG7iviitJBoT9st8R33ETiPJXYwnDEfwTcDZ_KntkIEfI7Ah2GHXryGKZpoAHOUPvCnwL-DCnPWlCy2qduCA2g0A&product=dvh",
};

export default function ProductQuoteForm({ t, productSlug, hideHeader }: Props) {
  const initialSlug = productSlug || DEFAULT_PRODUCT;
  const [slug, setSlug] = useState(initialSlug);
  const [step, setStep] = useState(0);
  const { isMobile } = useBreakpoints();
  const { lang } = useT();

  // Step 1 — basics
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [langp, setLangp] = useState("ES");

  // Step 2 — product-specific dynamic fields
  const [extras, setExtras] = useState<Record<string, string>>({});

  // Step 3 — consent
  const [consent, setConsent] = useState(true);

  const { submit, sent, submitting } = useFormSubmit("product-quote", lang);

  const product = useMemo(
    () => t.products.items.find((p) => p.slug === slug),
    [t, slug]
  );
  const extraFields: FieldDef[] = useMemo(
    () => t.quote_extra[slug] || [],
    [t, slug]
  );

  const step1Valid = !!(name.trim() && phone.trim() && email.trim() && zip.trim().length >= 5);
  const step2Valid = extraFields.every((f) => !f.required || (extras[f.key] || "").trim());
  const step3Valid = consent;

  const total = 3;
  const canNext = step === 0 ? step1Valid : step === 1 ? step2Valid : step3Valid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < total - 1) {
      if (canNext) setStep((s) => s + 1);
      return;
    }
    if (!canNext) return;
    void submit(
      [
        { label: t.quote.labels.type, value: productName },
        { label: t.quote.labels.name, value: name },
        { label: t.quote.labels.phone, value: phone },
        { label: "Email", value: email },
        { label: t.quote.labels.zip, value: zip },
        { label: t.quote.labels.lang_pref, value: langp },
        ...extraFields.map((f) => ({ label: f.label, value: extras[f.key] || "" })),
      ],
      productName
    );
  };

  const setExtra = (k: string, v: string) => setExtras((p) => ({ ...p, [k]: v }));

  const productName = product?.name || slug;
  const stepLabel = `${t.forms.step} ${String(step + 1).padStart(2, "0")} ${t.forms.of} ${String(total).padStart(2, "0")}`;
  const submitLabel = step < total - 1 ? t.forms.next : t.quote.submit;

  return (
    <section
      id="quote"
      className="relative overflow-hidden"
      style={{ padding: isMobile ? "56px 0 72px" : "100px 0 120px" }}
    >
      <div className="wrap">
        {!hideHeader && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
              gap: isMobile ? 24 : 64,
              marginBottom: isMobile ? 32 : 56,
            }}
          >
            <div className="secnum">
              <b>04 / </b>
              <span>{t.quote.kicker}</span>
            </div>
            <div>
              <h2
                className="display"
                style={{
                  fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 6vw, 84px)",
                  margin: 0,
                  color: "var(--color-ink)",
                }}
              >
                {t.quote.heading_a}{" "}
                <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
                  {t.quote.heading_it}
                </span>
                {t.quote.heading_b}
              </h2>
              <p
                style={{
                  marginTop: isMobile ? 14 : 20,
                  fontSize: isMobile ? 15 : 17,
                  color: "var(--color-ink-soft)",
                }}
              >
                {t.quote.sub}
              </p>
            </div>
          </div>
        )}

        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
            gap: isMobile ? 24 : 48,
          }}
        >
          {/* Left column: product picker (only when not pre-selected) + summary */}
          <div className={isMobile ? "" : "sticky"} style={isMobile ? {} : { top: 100 }}>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>
              {t.quote.labels.type}
            </div>
            <div className="grid" style={{ gap: 8 }}>
              {!productSlug ? (
                t.products.items.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => {
                      setSlug(p.slug);
                      setExtras({});
                      if (step === 1) setStep(0);
                    }}
                    className="flex items-center justify-between text-left transition-all duration-200"
                    style={{
                      padding: "12px 16px",
                      border:
                        slug === p.slug
                          ? "1px solid var(--color-ink)"
                          : "1px solid var(--color-rule)",
                      background: slug === p.slug ? "var(--color-ink)" : "transparent",
                      color: slug === p.slug ? "var(--color-paper)" : "var(--color-ink)",
                      borderRadius: 4,
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    <span>{p.name}</span>
                    <span className="mono" style={{ fontSize: 10, opacity: 0.7 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))
              ) : (
                <div
                  style={{
                    padding: "18px 22px",
                    border: "1px solid var(--color-ink)",
                    background: "var(--color-ink)",
                    color: "var(--color-paper)",
                    borderRadius: 4,
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                  }}
                >
                  {productName}
                </div>
              )}
            </div>

            <div
              className="mono"
              style={{
                marginTop: 32,
                paddingTop: 16,
                borderTop: "1px solid var(--color-rule)",
                opacity: 0.65,
                lineHeight: 1.5,
              }}
            >
              {stepLabel}
            </div>
          </div>

          {/* Right column: form (or external redirect for dental/medico, dedicated auto form) */}
          {slug === "auto" ? (
            <AutoQuoteForm t={t} />
          ) : EXTERNAL_QUOTE_URLS[slug] ? (
            <div
              style={{
                border: "1px solid var(--color-ink)",
                borderRadius: 4,
                padding: isMobile ? 24 : 40,
                background: "var(--color-paper)",
                display: "grid",
                gap: 20,
              }}
            >
              <div className="mono" style={{ opacity: 0.6, fontSize: 11 }}>
                FORM · 04 · {slug.toUpperCase()}
              </div>
              <h3
                className="display"
                style={{
                  fontSize: isMobile ? 28 : 36,
                  margin: 0,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                {productName}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: isMobile ? 15 : 17,
                  lineHeight: 1.55,
                  color: "var(--color-ink-soft)",
                  maxWidth: 560,
                }}
              >
                {product?.body}
              </p>
              <div
                className="mono"
                style={{
                  padding: "14px 16px",
                  background: "var(--color-sky)",
                  color: "var(--color-sky-ink)",
                  borderRadius: 4,
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                Cotización instantánea en línea. Te llevamos directo al portal de cotización para que veas precios en tiempo real.
              </div>
              <div className="flex flex-wrap" style={{ gap: 12, marginTop: 4 }}>
                <a
                  href={EXTERNAL_QUOTE_URLS[slug]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {t.quote.submit} <span className="arr">↗</span>
                </a>
                <a
                  href={`tel:${t.topbar.phone.replace(/[^0-9+]/g, "")}`}
                  className="btn outline"
                >
                  {t.cta.call}
                </a>
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 8,
                  paddingTop: 16,
                  borderTop: "1px solid var(--color-rule)",
                  opacity: 0.6,
                  fontSize: 11,
                }}
              >
                {t.quote.note}
              </div>
            </div>
          ) : (
          <FormShell
            badge={`FORM · 04 · ${slug.toUpperCase()}`}
            onSubmit={onSubmit}
            disabled={!canNext}
            submitting={submitting}
            submittingLabel={t.forms.submitting}
            sent={sent}
            successTitle={t.forms.success_title}
            successBody={t.forms.success_body}
            submitLabel={submitLabel}
            footerNote={step === total - 1 ? t.quote.note : stepLabel}
            footerExtra={
              step > 0 ? (
                <button
                  type="button"
                  className="btn outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  style={{ padding: "10px 16px", fontSize: 12 }}
                >
                  ← {t.forms.back}
                </button>
              ) : null
            }
          >
            {step === 0 && (
              <div className="grid" style={{ gap: 24 }}>
                <Field
                  label={t.quote.labels.name}
                  value={name}
                  onChange={setName}
                  placeholder={t.quote.placeholders.name}
                  required
                  requiredHint={t.forms.required}
                />
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
                    gap: 24,
                  }}
                >
                  <Field
                    label={t.quote.labels.phone}
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                    placeholder={t.quote.placeholders.phone}
                    required
                  />
                  <Field
                    label={t.quote.labels.zip}
                    value={zip}
                    onChange={setZip}
                    placeholder={t.quote.placeholders.zip}
                    required
                  />
                </div>
                <Field
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  placeholder="email@example.com"
                  required
                />
                <div>
                  <label className="mono block" style={{ marginBottom: 8, opacity: 0.6 }}>
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
                          background: langp === l ? "var(--color-ink)" : "transparent",
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
              </div>
            )}

            {step === 1 && (
              <div className="grid" style={{ gap: 24 }}>
                <div className="mono" style={{ opacity: 0.6, marginBottom: -8 }}>
                  {productName} · {extraFields.length}{" "}
                  {extraFields.length === 1 ? "field" : "fields"}
                </div>
                {extraFields.length === 0 ? (
                  <p style={{ color: "var(--color-ink-soft)" }}>
                    {/* No extra fields for this product — proceed to review */}
                    —
                  </p>
                ) : (
                  extraFields.map((f) => (
                    <Field
                      key={f.key}
                      label={f.label}
                      value={extras[f.key] || ""}
                      onChange={(v) => setExtra(f.key, v)}
                      type={f.type}
                      placeholder={f.placeholder}
                      options={f.options}
                      required={f.required}
                      requiredHint={t.forms.required}
                    />
                  ))
                )}
              </div>
            )}

            {step === 2 && (
              <div className="grid" style={{ gap: 24 }}>
                <div className="mono" style={{ opacity: 0.6 }}>
                  {t.forms.summary}
                </div>
                <dl
                  className="grid"
                  style={{
                    gap: 12,
                    margin: 0,
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--color-rule)",
                  }}
                >
                  {[
                    [t.quote.labels.type, productName],
                    [t.quote.labels.name, name],
                    [t.quote.labels.phone, phone],
                    ["Email", email],
                    [t.quote.labels.zip, zip],
                    [t.quote.labels.lang_pref, langp],
                    ...extraFields.map((f): [string, string] => [f.label, extras[f.key] || "—"]),
                  ].map(([k, v], i) => (
                    <div
                      key={i}
                      className="flex justify-between"
                      style={{ gap: 12, fontSize: 14, flexWrap: "wrap" }}
                    >
                      <dt className="mono" style={{ opacity: 0.55, margin: 0 }}>
                        {k}
                      </dt>
                      <dd
                        className="text-right"
                        style={{
                          margin: 0,
                          color: "var(--color-ink)",
                          fontFamily: "var(--font-display)",
                          fontSize: 16,
                        }}
                      >
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
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
            )}
          </FormShell>
          )}
        </div>
      </div>
    </section>
  );
}
