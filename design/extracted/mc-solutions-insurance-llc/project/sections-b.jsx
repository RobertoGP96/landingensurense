/* global React */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// ============================================================================
// Process — 4 steps
// ============================================================================
function Process({ t }) {
  return (
    <section id="process" style={{ padding: "120px 0", background: "var(--ink)", color: "var(--paper)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 96 }}>
          <div className="secnum" style={{ color: "var(--paper)" }}>
            <b>03 / </b>
            <span>{t.process.kicker}</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--paper)", maxWidth: 920 }}>
            {t.process.heading_a} <span className="serif-it" style={{ color: "var(--sky)" }}>{t.process.heading_it}</span>{t.process.heading_b}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(241,236,226,0.25)" }}>
          {t.process.steps.map((s, i) => (
            <div key={i} style={{
              padding: "40px 24px 40px 0",
              borderRight: i < 3 ? "1px solid rgba(241,236,226,0.2)" : "none",
              paddingLeft: i > 0 ? 24 : 0,
              position: "relative",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
                <span className="display" style={{ fontSize: 80, color: "var(--paper)", opacity: 0.95 }}>{s.n}</span>
                <span style={{ width: 28, height: 28, borderRadius: 99, border: "1px solid rgba(241,236,226,0.4)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, opacity: 0.6 }}>{i < 3 ? "→" : "✓"}</span>
              </div>
              <h3 className="display" style={{ fontSize: 28, margin: "0 0 14px 0", color: "var(--paper)" }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(241,236,226,0.7)", margin: 0, maxWidth: 280 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Quote form
// ============================================================================
function Quote({ t }) {
  const [type, setType] = useState(t.quote.types[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [langp, setLangp] = useState("ES");
  const [consent, setConsent] = useState(true);
  const [sent, setSent] = useState(false);

  const valid = name.trim() && phone.trim() && zip.trim().length >= 5 && consent;

  return (
    <section id="quote" style={{ padding: "140px 0", position: "relative", overflow: "hidden" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div className="secnum"><b>04 / </b><span>{t.quote.kicker}</span></div>
          <div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--ink)" }}>
              {t.quote.heading_a} <span className="serif-it" style={{ color: "var(--sky-ink)" }}>{t.quote.heading_it}</span>{t.quote.heading_b}
            </h2>
            <p style={{ marginTop: 20, fontSize: 17, color: "var(--ink-soft)" }}>{t.quote.sub}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}>
          {/* Left — type picker */}
          <div style={{ position: "sticky", top: 100 }}>
            <div className="mono" style={{ marginBottom: 16, opacity: 0.6 }}>{t.quote.labels.type}</div>
            <div style={{ display: "grid", gap: 8 }}>
              {t.quote.types.map((tp, i) => (
                <button
                  key={i}
                  onClick={() => setType(tp)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px",
                    border: type === tp ? "1px solid var(--ink)" : "1px solid var(--rule)",
                    background: type === tp ? "var(--ink)" : "transparent",
                    color: type === tp ? "var(--paper)" : "var(--ink)",
                    borderRadius: 4,
                    fontFamily: "var(--display)",
                    fontWeight: 500,
                    fontSize: 18,
                    transition: "all .2s ease",
                    textAlign: "left",
                  }}
                >
                  <span>{tp}</span>
                  <span className="mono" style={{ fontSize: 10, opacity: 0.7 }}>0{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }} style={{ background: "var(--paper)", border: "1px solid var(--ink)", padding: 48, borderRadius: 4, position: "relative" }}>
            <div className="mono" style={{ position: "absolute", top: 20, right: 20, opacity: 0.5 }}>FORM · 04.{["AU","HO","LI","HE","CO","TR","BO","UM"][t.quote.types.indexOf(type)] || "AU"}</div>
            {sent ? (
              <div style={{ padding: "60px 0", textAlign: "center" }}>
                <div className="serif-it" style={{ fontSize: 48, color: "var(--sky-ink)" }}>Recibido.</div>
                <p style={{ marginTop: 16, color: "var(--ink-soft)" }}>{t.quote.note}</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gap: 24 }}>
                  <Field label={t.quote.labels.name} value={name} onChange={setName} placeholder={t.quote.placeholders.name} />
                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
                    <Field label={t.quote.labels.phone} value={phone} onChange={setPhone} placeholder={t.quote.placeholders.phone} />
                    <Field label={t.quote.labels.zip} value={zip} onChange={setZip} placeholder={t.quote.placeholders.zip} />
                  </div>
                  <div>
                    <label className="mono" style={{ display: "block", marginBottom: 8, opacity: 0.6 }}>{t.quote.labels.lang_pref}</label>
                    <div style={{ display: "inline-flex", border: "1px solid var(--ink)", padding: 3, borderRadius: 99 }}>
                      {["ES", "EN"].map((l) => (
                        <button key={l} type="button" onClick={() => setLangp(l)} style={{ padding: "8px 18px", border: 0, background: langp === l ? "var(--ink)" : "transparent", color: langp === l ? "var(--paper)" : "var(--ink)", borderRadius: 99, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer" }}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <label style={{ display: "flex", gap: 12, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, cursor: "pointer", alignItems: "flex-start" }}>
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 3, accentColor: "var(--ink)" }} />
                    <span>{t.quote.labels.consent}</span>
                  </label>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--rule)" }}>
                  <span className="mono" style={{ opacity: 0.6 }}>{t.quote.note}</span>
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
    <label style={{ display: "block" }}>
      <span className="mono" style={{ display: "block", marginBottom: 8, opacity: 0.6 }}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 0",
          border: 0,
          borderBottom: "1px solid var(--rule)",
          background: "transparent",
          fontFamily: "var(--display)",
          fontSize: 22,
          color: "var(--ink)",
          outline: "none",
          transition: "border-color .2s",
        }}
        onFocus={(e) => e.target.style.borderColor = "var(--ink)"}
        onBlur={(e) => e.target.style.borderColor = "var(--rule)"}
      />
    </label>
  );
}

// ============================================================================
// Testimonials
// ============================================================================
function Testimonials({ t }) {
  const [active, setActive] = useState(0);
  const it = t.testimonials.items[active];
  return (
    <section style={{ padding: "120px 0", background: "var(--paper)", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)", position: "relative", overflow: "hidden" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div className="secnum"><b>05 / </b><span>{t.testimonials.kicker}</span></div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--ink)" }}>
            {t.testimonials.heading_a} <span className="serif-it" style={{ color: "var(--sky-ink)" }}>{t.testimonials.heading_it}</span>{t.testimonials.heading_b}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div style={{ position: "relative", minHeight: 360 }}>
            <span className="serif-it" style={{ position: "absolute", top: -30, left: -10, fontSize: 200, color: "var(--sky)", lineHeight: 1, fontStyle: "italic" }}>"</span>
            <p key={active} className="serif-it" style={{ fontSize: 32, lineHeight: 1.3, margin: 0, color: "var(--ink)", position: "relative", zIndex: 1, animation: "fadeIn .5s ease", textWrap: "pretty" }}>
              {it.q}
            </p>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 48, height: 48, borderRadius: 99, background: "var(--ink)", color: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontSize: 18, fontWeight: 600 }}>
                {it.a.charAt(0)}
              </span>
              <div>
                <div style={{ fontFamily: "var(--display)", fontSize: 18, fontWeight: 600 }}>{it.a}</div>
                <div className="mono" style={{ marginTop: 4, opacity: 0.6 }}>{it.r}</div>
              </div>
            </div>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
          </div>

          <div>
            {t.testimonials.items.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "24px 0",
                  borderTop: "1px solid var(--rule)",
                  borderBottom: i === t.testimonials.items.length - 1 ? "1px solid var(--rule)" : "none",
                  background: "transparent",
                  border: 0,
                  borderTop: "1px solid var(--rule)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all .2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="display" style={{ fontSize: active === i ? 32 : 22, color: active === i ? "var(--ink)" : "var(--ink-soft)", transition: "all .25s" }}>{c.a}</span>
                  <span className="mono" style={{ opacity: 0.5 }}>0{i + 1} / 03</span>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 80 }}>
          <div className="secnum"><b>06 / </b><span>{t.contact.kicker}</span></div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--ink)" }}>
            {t.contact.heading_a} <span className="serif-it" style={{ color: "var(--sky-ink)" }}>{t.contact.heading_it}</span>{t.contact.heading_b}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--ink)" }}>
          {t.contact.cards.map((c, i) => (
            <div key={i} style={{
              padding: "44px 32px 44px 0",
              borderRight: i < 2 ? "1px solid var(--rule)" : "none",
              paddingLeft: i > 0 ? 32 : 0,
            }}>
              <div className="mono" style={{ opacity: 0.55, marginBottom: 24 }}>0{i + 1} · {c.label}</div>
              <div className="display" style={{ fontSize: 28, color: "var(--ink)", marginBottom: 16, letterSpacing: "-0.02em" }}>{c.value}</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: 32, background: "var(--sky)", color: "var(--sky-ink)", borderRadius: 4, display: "flex", gap: 24, alignItems: "flex-start" }}>
          <span className="mono" style={{ background: "var(--sky-ink)", color: "var(--sky)", padding: "6px 10px", borderRadius: 4, flexShrink: 0 }}>!</span>
          <div>
            <div className="display" style={{ fontSize: 20, marginBottom: 6, color: "var(--sky-ink)" }}>{t.contact.after}</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55 }}>{t.contact.after_d}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA banner + Footer
// ============================================================================
function CtaBanner({ t, showEagle }) {
  return (
    <section style={{ padding: "120px 0", background: "var(--ink)", color: "var(--paper)", position: "relative", overflow: "hidden" }}>
      {showEagle && (
        <Eagle size={720} opacity={0.08} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", filter: "invert(1)" }} />
      )}
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <div className="mono" style={{ opacity: 0.5, marginBottom: 32, color: "var(--paper)" }}>— {t.cta.quote} · 47 min avg —</div>
        <h2 className="display" style={{ fontSize: "clamp(56px, 9vw, 132px)", margin: 0, color: "var(--paper)" }}>
          {t.hero.title_a} <span className="serif-it" style={{ color: "var(--sky)" }}>{t.hero.title_b_it}</span> {t.hero.title_c}
        </h2>
        <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center" }}>
          <a href="#quote" className="btn" style={{ background: "var(--paper)", color: "var(--ink)", borderColor: "var(--paper)" }}>{t.cta.quote} <span className="arr">→</span></a>
          <a href={`tel:${t.topbar.phone}`} className="btn outline" style={{ color: "var(--paper)", borderColor: "var(--paper)" }}>{t.cta.call} · {t.topbar.phone}</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ padding: "80px 0 40px", background: "var(--bg)", borderTop: "1px solid var(--rule)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 56, borderBottom: "1px solid var(--rule)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <img src="assets/eagle.png" alt="" style={{ height: 48 }} />
              <div>
                <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>M C Solutions Insurance</div>
                <div className="mono" style={{ opacity: 0.6, marginTop: 4 }}>{t.footer.tag}</div>
              </div>
            </div>
            <p style={{ maxWidth: 360, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55, marginTop: 16 }}>{t.footer.address}</p>
            <p className="mono" style={{ opacity: 0.55, marginTop: 16 }}>{t.footer.lic}</p>
          </div>
          {[
            { h: t.nav[0], items: t.coverage.items.slice(0, 4).map((i) => i.name) },
            { h: t.nav[3] || "Servicios", items: t.coverage.items.slice(4).map((i) => i.name) },
            { h: t.nav[4] || "Contacto", items: [t.topbar.phone, "hola@mcsolutionsins.com", t.footer.states] },
          ].map((col, i) => (
            <div key={i}>
              <div className="mono" style={{ opacity: 0.55, marginBottom: 18 }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {col.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 14, color: "var(--ink)" }}><a href="#">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className="mono" style={{ opacity: 0.55 }}>{t.footer.copy}</span>
          <div style={{ display: "flex", gap: 24 }}>
            {t.footer.links.map((l, i) => (
              <a key={i} href="#" className="mono" style={{ opacity: 0.6 }}>{l}</a>
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
