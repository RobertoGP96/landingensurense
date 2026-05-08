/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================================
// Eagle motif — uses the user's actual logo cutout
// ============================================================================
function Eagle({ size = 220, opacity = 1, style = {}, className = "" }) {
  return (
    <img
      src="assets/eagle.png"
      alt=""
      aria-hidden="true"
      className={className}
      style={{ width: size, height: "auto", opacity, pointerEvents: "none", userSelect: "none", ...style }}
    />
  );
}

// ============================================================================
// Header / topbar
// ============================================================================
function Topbar({ t, lang, setLang }) {
  return (
    <div style={{ background: "var(--ink)", color: "var(--paper)", fontSize: 12 }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 56px", fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 11 }}>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <span><span style={{ opacity: 0.5 }}>↳</span> {t.topbar.hours}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{t.topbar.license}</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#7ed5a4", display: "inline-block" }} />
            {t.hero.live}
          </a>
          <span style={{ opacity: 0.4 }}>·</span>
          <a href={`tel:${t.topbar.phone}`}>{t.topbar.phone}</a>
          <span style={{ opacity: 0.4 }}>·</span>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </div>
    </div>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <span style={{ display: "inline-flex", border: "1px solid rgba(241,236,226,0.3)", borderRadius: 99, overflow: "hidden", padding: 2 }}>
      {["es", "en"].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={{
            padding: "3px 10px",
            border: 0,
            background: lang === code ? "var(--paper)" : "transparent",
            color: lang === code ? "var(--ink)" : "var(--paper)",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            borderRadius: 99,
            cursor: "pointer",
            transition: "all .18s ease",
          }}
        >
          {code}
        </button>
      ))}
    </span>
  );
}

function Header({ t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(241,236,226,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      transition: "all .3s ease",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 56px" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="assets/eagle.png" alt="" style={{ height: 38, width: "auto" }} />
          <div style={{ lineHeight: 1, display: "grid", gap: 4 }}>
            <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>M C Solutions</span>
            <span className="mono" style={{ opacity: 0.55, fontSize: 9 }}>Insurance · LLC</span>
          </div>
        </a>
        <nav style={{ display: "flex", gap: 32 }}>
          {t.nav.map((n, i) => (
            <a key={i} href={`#${["coverage","quote","about","process","contact"][i]}`} style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", opacity: 0.85, transition: "opacity .15s" }}>{n}</a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 12 }}>
          <a className="btn outline" href="#quote" style={{ padding: "10px 18px", fontSize: 13 }}>{t.cta.quote} <span className="arr">→</span></a>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// Hero
// ============================================================================
function Hero({ t, showEagle }) {
  return (
    <section id="top" style={{ position: "relative", paddingTop: 32, paddingBottom: 96, overflow: "hidden" }}>
      {showEagle && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <Eagle size={1180} opacity={0.045} style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)" }} />
        </div>
      )}
      <div className="wrap" style={{ position: "relative" }}>
        <div className="reveal d1" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 48, marginBottom: 56 }}>
          <span className="mono" style={{ opacity: 0.7 }}>{t.hero.eyebrow}</span>
          <span className="mono" style={{ opacity: 0.5 }}>FL · TX · GA</span>
        </div>

        <h1 className="reveal d2 display" style={{ fontSize: "clamp(64px, 12vw, 184px)", margin: 0, color: "var(--ink)" }}>
          {t.hero.title_a}<br />
          <span className="serif-it" style={{ fontSize: "1.04em", color: "var(--sky-ink)" }}>{t.hero.title_b_it}</span>{" "}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 24 }}>
            {t.hero.title_c}
            <span style={{ display: "inline-block", height: "0.7em", width: 8, background: "var(--ink)" }}>{" "}</span>
          </span>
        </h1>

        <div className="reveal d3" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, marginTop: 56, alignItems: "end" }}>
          <p style={{ fontSize: 22, lineHeight: 1.45, maxWidth: 560, color: "var(--ink-soft)", margin: 0, fontWeight: 400, letterSpacing: "-0.005em" }}>{t.hero.sub}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <a href="#quote" className="btn">{t.cta.quote} <span className="arr">→</span></a>
            <a href="#contact" className="btn outline">{t.cta.agent}</a>
          </div>
        </div>

        <div className="reveal d4" style={{ marginTop: 96, display: "grid", gridTemplateColumns: "repeat(3, 1fr) auto", gap: 0, borderTop: "1px solid var(--ink)", paddingTop: 24 }}>
          {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? "1px solid var(--rule)" : "none", paddingRight: 24 }}>
              <div className="display" style={{ fontSize: 56, lineHeight: 1, color: "var(--ink)" }}>{s.k}</div>
              <div className="mono" style={{ marginTop: 12, opacity: 0.7 }}>{s.v}</div>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingLeft: 24 }}>
            <span className="tag"><span className="dot live"></span>{t.hero.live}</span>
            <span className="mono" style={{ opacity: 0.55 }}>↘ scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Marquee — names of carriers
// ============================================================================
function CarriersMarquee({ t }) {
  const carriers = ["PROGRESSIVE", "TRAVELERS", "NATIONWIDE", "HARTFORD", "LIBERTY MUTUAL", "CHUBB", "ZURICH", "STATE AUTO", "BERKLEY", "MARKEL", "FOREMOST", "SAFECO"];
  return (
    <div style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "28px 0", overflow: "hidden", background: "var(--paper)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 64, animation: "marquee 38s linear infinite", whiteSpace: "nowrap" }}>
        {[...carriers, ...carriers].map((c, i) => (
          <span key={i} style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 24, letterSpacing: "0.02em", color: "var(--ink)", opacity: 0.7 }}>
            {c} <span style={{ marginLeft: 64, color: "var(--sky-ink)", opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

// ============================================================================
// Intro / who we are
// ============================================================================
function Intro({ t }) {
  return (
    <section style={{ padding: "120px 0 96px" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: 64, alignItems: "start" }}>
          <div className="secnum">
            <b>00 / </b>
            <span>{t.intro.kicker}</span>
          </div>
          <p style={{ fontSize: 36, lineHeight: 1.2, margin: 0, fontWeight: 400, color: "var(--ink)", letterSpacing: "-0.015em", textWrap: "balance" }}>
            {t.intro.lead_a} <span className="serif-it" style={{ fontSize: "1.05em", color: "var(--sky-ink)" }}>{t.intro.lead_it}</span>{t.intro.lead_b}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Coverage grid
// ============================================================================
function Coverage({ t }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="coverage" style={{ padding: "80px 0 120px", background: "var(--paper)", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "end", marginBottom: 72 }}>
          <div className="secnum">
            <b>01 / </b>
            <span>{t.coverage.kicker}</span>
          </div>
          <div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--ink)" }}>
              {t.coverage.heading_a} <span className="serif-it" style={{ color: "var(--sky-ink)" }}>{t.coverage.heading_it}</span>
            </h2>
            <p style={{ marginTop: 24, maxWidth: 540, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)" }}>{t.coverage.lede}</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--ink)" }}>
          {t.coverage.items.map((it, i) => (
            <CoverageRow key={i} it={it} hovered={hovered === i} onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CoverageRow({ it, hovered, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 240px 1fr 320px 80px",
        gap: 24,
        padding: hovered ? "36px 12px" : "28px 12px",
        borderBottom: "1px solid var(--rule)",
        alignItems: "center",
        background: hovered ? "var(--bg)" : "transparent",
        transition: "all .35s cubic-bezier(.2,.7,.2,1)",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <span className="mono" style={{ color: "var(--ink-soft)" }}>{it.num}</span>
      <span className="display" style={{ fontSize: 32, color: "var(--ink)" }}>{it.name}</span>
      <span className="serif-it" style={{ fontSize: 22, color: "var(--ink-soft)" }}>{it.tagline}</span>
      <div style={{
        opacity: hovered ? 1 : 0.5,
        transition: "opacity .25s ease",
        fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)",
        maxWidth: 320,
      }}>{it.body}</div>
      <span style={{ justifySelf: "end", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 99, border: "1px solid var(--ink)", color: "var(--ink)", transition: "all .25s ease", background: hovered ? "var(--ink)" : "transparent", transform: hovered ? "translateX(4px) rotate(-45deg)" : "rotate(-45deg)" }}>
        <span style={{ color: hovered ? "var(--paper)" : "var(--ink)", fontSize: 16 }}>→</span>
      </span>
    </div>
  );
}

// ============================================================================
// Why us / values
// ============================================================================
function Why({ t, showEagle }) {
  return (
    <section id="about" style={{ padding: "140px 0", position: "relative", overflow: "hidden" }}>
      {showEagle && (
        <Eagle size={760} opacity={0.05} style={{ position: "absolute", right: -120, top: 80, transform: "rotate(8deg)" }} />
      )}
      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 96 }}>
          <div className="secnum"><b>02 / </b><span>{t.why.kicker}</span></div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--ink)", maxWidth: 880 }}>
            {t.why.heading_a} <span className="serif-it" style={{ color: "var(--sky-ink)" }}>{t.why.heading_it}</span>{t.why.heading_b}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--ink)" }}>
          {t.why.values.map((v, i) => (
            <div key={i} style={{
              padding: "44px 32px 44px 0",
              borderRight: i < 2 ? "1px solid var(--rule)" : "none",
              paddingLeft: i > 0 ? 32 : 0,
            }}>
              <div className="serif-it" style={{ fontSize: 56, color: "var(--sky-ink)", lineHeight: 1, marginBottom: 16 }}>{v.num}</div>
              <h3 className="display" style={{ fontSize: 32, margin: "0 0 16px 0", color: "var(--ink)" }}>{v.name}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", margin: 0, maxWidth: 360 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Header = Header;
window.Topbar = Topbar;
window.Hero = Hero;
window.CarriersMarquee = CarriersMarquee;
window.Intro = Intro;
window.Coverage = Coverage;
window.Why = Why;
window.Eagle = Eagle;
