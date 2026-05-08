/* global React */
const { useState: useStateB } = React;

// ============================================================================
// Process
// ============================================================================
function Process({ t }) {
  return (
    <section id="process" className="bg-ink text-paper" style={{ padding: "120px 0" }}>
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 96 }}>
          <div className="secnum" style={{ color: "var(--color-paper)" }}>
            <b>03 / </b>
            <span>{t.process.kicker}</span>
          </div>
          <h2 className="display m-0" style={{ fontSize: "clamp(40px, 6vw, 84px)", color: "var(--color-paper)", maxWidth: 920 }}>
            {t.process.heading_a} <span className="serif-it" style={{ color: "var(--color-sky)" }}>{t.process.heading_it}</span>{t.process.heading_b}
          </h2>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(241,236,226,0.25)" }}>
          {t.process.steps.map((s, i) => (
            <div
              key={i}
              className="relative"
              style={{
                padding: "40px 24px 40px 0",
                borderRight: i < 3 ? "1px solid rgba(241,236,226,0.2)" : "none",
                paddingLeft: i > 0 ? 24 : 0,
              }}
            >
              <div className="flex items-baseline justify-between" style={{ marginBottom: 28 }}>
                <span className="display" style={{ fontSize: 80, color: "var(--color-paper)", opacity: 0.95 }}>{s.n}</span>
                <span className="inline-flex items-center justify-center rounded-full" style={{ width: 28, height: 28, border: "1px solid rgba(241,236,226,0.4)", fontSize: 11, opacity: 0.6 }}>{i < 3 ? "→" : "✓"}</span>
              </div>
              <h3 className="display" style={{ fontSize: 28, margin: "0 0 14px 0", color: "var(--color-paper)" }}>{s.t}</h3>
              <p className="m-0" style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(241,236,226,0.7)", maxWidth: 280 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Quote
// ============================================================================
function Quote({ t, withTransition }) {
  const [type, setType] = useStateB(t.quote.types[0]);
  const [name, setName] = useStateB("");
  const [phone, setPhone] = useStateB("");
  const [zip, setZip] = useStateB("");
  const [langp, setLangp] = useStateB("ES");
  const [consent, setConsent] = useStateB(true);
  const [sent, setSent] = useStateB(false);

  const valid = name.trim() && phone.trim() && zip.trim().length >= 5 && consent;
  const codes = ["AU","HO","LI","HE","CO","TR","BO","UM"];

  return (
    <section id="quote" className="relative overflow-hidden" style={{ padding: "140px 0" }}>
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div className="secnum"><b>04 / </b><span>{t.quote.kicker}</span></div>
          <div>
            <h2 className="display m-0 text-ink" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
              {t.quote.heading_a} <span className="serif-it text-sky-ink">{t.quote.heading_it}</span>{t.quote.heading_b}
            </h2>
            <p className="text-ink-soft" style={{ marginTop: 20, fontSize: 17 }}>{t.quote.sub}</p>
          </div>
        </div>

        <div className="grid items-start" style={{ gridTemplateColumns: "1fr 1.6fr", gap: 48 }}>
          <div className="sticky" style={{ top: 100 }}>
            <div className="mono opacity-60" style={{ marginBottom: 16 }}>{t.quote.labels.type}</div>
            <div className="grid gap-2">
              {t.quote.types.map((tp, i) => (
                <button
                  key={i}
                  onClick={() => setType(tp)}
                  className="flex items-center justify-between text-left transition-all duration-200"
                  style={{
                    padding: "14px 18px",
                    border: type === tp ? "1px solid var(--color-ink)" : "1px solid var(--color-rule)",
                    background: type === tp ? "var(--color-ink)" : "transparent",
                    color: type === tp ? "var(--color-paper)" : "var(--color-ink)",
                    borderRadius: 4,
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 18,
                  }}
                >
                  <span>{tp}</span>
                  <span className="mono opacity-70" style={{ fontSize: 10 }}>0{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) withTransition(() => setSent(true));
            }}
            className="bg-paper border border-ink relative"
            style={{ padding: 48, borderRadius: 4, viewTransitionName: "vt-quote-card" }}
          >
            <div className="mono absolute opacity-50" style={{ top: 20, right: 20 }}>FORM · 04.{codes[t.quote.types.indexOf(type)] || "AU"}</div>
            {sent ? (
              <div className="text-center" style={{ padding: "60px 0" }}>
                <div className="serif-it text-sky-ink" style={{ fontSize: 48 }}>{t.quote.sent || "Recibido."}</div>
                <p className="text-ink-soft" style={{ marginTop: 16 }}>{t.quote.note}</p>
              </div>
            ) : (
              <>
                <div className="grid" style={{ gap: 24 }}>
                  <Field label={t.quote.labels.name} value={name} onChange={setName} placeholder={t.quote.placeholders.name} />
                  <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
                    <Field label={t.quote.labels.phone} value={phone} onChange={setPhone} placeholder={t.quote.placeholders.phone} />
                    <Field label={t.quote.labels.zip} value={zip} onChange={setZip} placeholder={t.quote.placeholders.zip} />
                  </div>
                  <div>
                    <label className="mono block opacity-60" style={{ marginBottom: 8 }}>{t.quote.labels.lang_pref}</label>
                    <div className="inline-flex border border-ink rounded-full" style={{ padding: 3 }}>
                      {["ES", "EN"].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLangp(l)}
                          className="rounded-full"
                          style={{
                            padding: "8px 18px",
                            border: 0,
                            background: langp === l ? "var(--color-ink)" : "transparent",
                            color: langp === l ? "var(--color-paper)" : "var(--color-ink)",
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            cursor: "pointer",
                          }}
                        >{l}</button>
                      ))}
                    </div>
                  </div>
                  <label className="flex text-ink-soft items-start cursor-pointer" style={{ gap: 12, fontSize: 13, lineHeight: 1.5 }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: 3, accentColor: "var(--color-ink)" }}
                    />
                    <span>{t.quote.labels.consent}</span>
                  </label>
                </div>
                <div className="flex justify-between items-center" style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--color-rule)" }}>
                  <span className="mono opacity-60">{t.quote.note}</span>
                  <button type="submit" disabled={!valid} className="btn" style={{ opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed" }}>
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

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mono block opacity-60" style={{ marginBottom: 8 }}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-ink outline-none"
        style={{
          padding: "14px 0",
          border: 0,
          borderBottom: "1px solid var(--color-rule)",
          fontFamily: "var(--font-display)",
          fontSize: 22,
          transition: "border-color .2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-ink)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-rule)")}
      />
    </label>
  );
}

// ============================================================================
// Testimonials
// ============================================================================
function Testimonials({ t, withTransition }) {
  const [active, setActive] = useStateB(0);
  const it = t.testimonials.items[active];
  const setActiveTransition = (i) => withTransition(() => setActive(i));

  return (
    <section className="bg-paper border-t border-b border-ink relative overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div className="secnum"><b>05 / </b><span>{t.testimonials.kicker}</span></div>
          <h2 className="display m-0 text-ink" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
            {t.testimonials.heading_a} <span className="serif-it text-sky-ink">{t.testimonials.heading_it}</span>{t.testimonials.heading_b}
          </h2>
        </div>

        <div className="grid items-start" style={{ gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div className="relative" style={{ minHeight: 360, viewTransitionName: "vt-testimonial-quote" }}>
            <span className="serif-it absolute italic" style={{ top: -30, left: -10, fontSize: 200, color: "var(--color-sky)", lineHeight: 1 }}>"</span>
            <p className="serif-it m-0 text-ink relative" style={{ fontSize: 32, lineHeight: 1.3, zIndex: 1, textWrap: "pretty" }}>
              {it.q}
            </p>
            <div className="flex items-center" style={{ marginTop: 40, gap: 16 }}>
              <span
                className="inline-flex items-center justify-center rounded-full bg-ink text-paper"
                style={{ width: 48, height: 48, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}
              >
                {it.a.charAt(0)}
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>{it.a}</div>
                <div className="mono opacity-60" style={{ marginTop: 4 }}>{it.r}</div>
              </div>
            </div>
          </div>

          <div>
            {t.testimonials.items.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveTransition(i)}
                className="block w-full text-left cursor-pointer transition-all duration-200"
                style={{
                  padding: "24px 0",
                  background: "transparent",
                  border: 0,
                  borderTop: "1px solid var(--color-rule)",
                  borderBottom: i === t.testimonials.items.length - 1 ? "1px solid var(--color-rule)" : "none",
                }}
              >
                <div className="flex justify-between items-baseline">
                  <span
                    className="display"
                    style={{
                      fontSize: active === i ? 32 : 22,
                      color: active === i ? "var(--color-ink)" : "var(--color-ink-soft)",
                      transition: "all .25s",
                    }}
                  >{c.a}</span>
                  <span className="mono opacity-50">0{i + 1} / 0{t.testimonials.items.length}</span>
                </div>
                <div className="mono" style={{ marginTop: 6, opacity: active === i ? 0.7 : 0.4 }}>{c.since}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Contact
// ============================================================================
function Contact({ t }) {
  return (
    <section id="contact" style={{ padding: "140px 0 120px" }}>
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 80 }}>
          <div className="secnum"><b>06 / </b><span>{t.contact.kicker}</span></div>
          <h2 className="display m-0 text-ink" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
            {t.contact.heading_a} <span className="serif-it text-sky-ink">{t.contact.heading_it}</span>{t.contact.heading_b}
          </h2>
        </div>

        <div className="grid border-t border-ink" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {t.contact.cards.map((c, i) => (
            <div
              key={i}
              style={{
                padding: "44px 32px 44px 0",
                borderRight: i < 2 ? "1px solid var(--color-rule)" : "none",
                paddingLeft: i > 0 ? 32 : 0,
              }}
            >
              <div className="mono opacity-55" style={{ marginBottom: 24 }}>0{i + 1} · {c.label}</div>
              <div className="display text-ink" style={{ fontSize: 28, marginBottom: 16, letterSpacing: "-0.02em" }}>{c.value}</div>
              <div className="text-ink-soft" style={{ fontSize: 14, lineHeight: 1.5 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="flex items-start" style={{ marginTop: 56, padding: 32, background: "var(--color-sky)", color: "var(--color-sky-ink)", borderRadius: 4, gap: 24 }}>
          <span className="mono shrink-0" style={{ background: "var(--color-sky-ink)", color: "var(--color-sky)", padding: "6px 10px", borderRadius: 4 }}>!</span>
          <div>
            <div className="display" style={{ fontSize: 20, marginBottom: 6, color: "var(--color-sky-ink)" }}>{t.contact.after}</div>
            <p className="m-0" style={{ fontSize: 14.5, lineHeight: 1.55 }}>{t.contact.after_d}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA banner
// ============================================================================
function CtaBanner({ t }) {
  return (
    <section className="bg-ink text-paper relative overflow-hidden" style={{ padding: "120px 0" }}>
      <img
        src="assets/eagle.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ width: 720, height: "auto", left: "50%", top: "50%", transform: "translate(-50%, -50%)", opacity: 0.08, filter: "invert(1)" }}
      />
      <div className="wrap relative text-center">
        <div className="mono opacity-50" style={{ marginBottom: 32, color: "var(--color-paper)" }}>— {t.cta.quote} · 47 min avg —</div>
        <h2 className="display m-0" style={{ fontSize: "clamp(56px, 9vw, 132px)", color: "var(--color-paper)" }}>
          {t.hero.title_a} <span className="serif-it" style={{ color: "var(--color-sky)" }}>{t.hero.title_b_it}</span> {t.hero.title_c}
        </h2>
        <div className="flex justify-center" style={{ marginTop: 48, gap: 16 }}>
          <a href="#quote" className="btn" style={{ background: "var(--color-paper)", color: "var(--color-ink)", borderColor: "var(--color-paper)" }}>{t.cta.quote} <span className="arr">→</span></a>
          <a href={`tel:${t.topbar.phone}`} className="btn outline" style={{ color: "var(--color-paper)", borderColor: "var(--color-paper)" }}>{t.cta.call} · {t.topbar.phone}</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Footer
// ============================================================================
function Footer({ t }) {
  return (
    <footer className="bg-bg border-t border-rule" style={{ padding: "80px 0 40px" }}>
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 56, borderBottom: "1px solid var(--color-rule)" }}>
          <div>
            <div className="flex items-center" style={{ gap: 14, marginBottom: 24 }}>
              <img src="assets/eagle.png" alt="" style={{ height: 48 }} />
              <div>
                <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>M C Solutions Insurance</div>
                <div className="mono opacity-60" style={{ marginTop: 4 }}>{t.footer.tag}</div>
              </div>
            </div>
            <p className="text-ink-soft" style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.55, marginTop: 16 }}>{t.footer.address}</p>
            <p className="mono opacity-55" style={{ marginTop: 16 }}>{t.footer.lic}</p>
          </div>
          {[
            { h: t.nav[0], items: t.coverage.items.slice(0, 4).map((i) => i.name) },
            { h: t.nav[3] || "Servicios", items: t.coverage.items.slice(4).map((i) => i.name) },
            { h: t.nav[4] || "Contacto", items: [t.topbar.phone, "hola@mcsolutionsins.com", t.footer.states] },
          ].map((col, i) => (
            <div key={i}>
              <div className="mono opacity-55" style={{ marginBottom: 18 }}>{col.h}</div>
              <ul className="m-0 grid gap-2.5" style={{ listStyle: "none", padding: 0 }}>
                {col.items.map((it, j) => (
                  <li key={j} className="text-ink" style={{ fontSize: 14 }}><a href="#">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap" style={{ marginTop: 28, gap: 16 }}>
          <span className="mono opacity-55">{t.footer.copy}</span>
          <div className="flex" style={{ gap: 24 }}>
            {t.footer.links.map((l, i) => (
              <a key={i} href="#" className="mono opacity-60">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Process = Process;
window.Quote = Quote;
window.Testimonials = Testimonials;
window.Contact = Contact;
window.CtaBanner = CtaBanner;
window.Footer = Footer;
