/* global React */
const { useState, useEffect } = React;

// ============================================================================
// Eagle motif
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
// Topbar
// ============================================================================
function Topbar({ t, lang, setLang }) {
  return (
    <div className="bg-ink text-paper text-xs">
      <div className="wrap flex items-center justify-between !py-[10px]" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 11 }}>
        <div className="flex items-center gap-7">
          <span><span className="opacity-50">↳</span> {t.topbar.hours}</span>
          <span className="opacity-40">·</span>
          <span>{t.topbar.license}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7ed5a4]" />
            {t.hero.live}
          </a>
          <span className="opacity-40">·</span>
          <a href={`tel:${t.topbar.phone}`}>{t.topbar.phone}</a>
          <span className="opacity-40">·</span>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </div>
    </div>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <span className="inline-flex border border-paper/30 rounded-full overflow-hidden p-0.5">
      {["es", "en"].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className="rounded-full transition-all duration-200"
          style={{
            padding: "3px 10px",
            border: 0,
            background: lang === code ? "var(--color-paper)" : "transparent",
            color: lang === code ? "var(--color-ink)" : "var(--color-paper)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {code}
        </button>
      ))}
    </span>
  );
}

// ============================================================================
// Header
// ============================================================================
function Header({ t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(227,237,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-rule)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between" style={{ padding: "20px 56px" }}>
        <a href="#top" className="flex items-center gap-[14px]">
          <img src="assets/eagle.png" alt="" className="h-[38px] w-auto" />
          <div className="grid gap-1 leading-none">
            <span className="font-display font-bold text-base tracking-[-0.02em]">M C Solutions</span>
            <span className="mono opacity-55" style={{ fontSize: 9 }}>Insurance · LLC</span>
          </div>
        </a>
        <nav className="flex gap-8">
          {t.nav.map((n, i) => (
            <a key={i} href={`#${["coverage","quote","about","process","contact"][i]}`} className="text-sm font-medium text-ink opacity-85 hover:opacity-100 transition-opacity">{n}</a>
          ))}
        </nav>
        <div className="flex gap-3">
          <a className="btn outline" href="#quote" style={{ padding: "10px 18px", fontSize: 13 }}>{t.cta.quote} <span className="arr">→</span></a>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// Hero
// ============================================================================
function Hero({ t }) {
  return (
    <section id="top" className="relative overflow-hidden" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Eagle size={1180} opacity={0.045} style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)" }} />
      </div>
      <div className="wrap relative">
        <div className="reveal d1 flex justify-between items-baseline" style={{ marginTop: 48, marginBottom: 56 }}>
          <span className="mono opacity-70">{t.hero.eyebrow}</span>
          <span className="mono opacity-50">FL · TX · GA</span>
        </div>

        <h1 className="reveal d2 display m-0 text-ink" style={{ fontSize: "clamp(64px, 12vw, 184px)" }}>
          {t.hero.title_a}<br />
          <span className="serif-it text-sky-ink" style={{ fontSize: "1.04em" }}>{t.hero.title_b_it}</span>{" "}
          <span className="inline-flex items-center gap-6">
            {t.hero.title_c}
            <span className="inline-block bg-ink" style={{ height: "0.7em", width: 8 }}>{" "}</span>
          </span>
        </h1>

        <div className="reveal d3 grid items-end" style={{ gridTemplateColumns: "1.1fr 0.9fr", gap: 64, marginTop: 56 }}>
          <p className="m-0 text-ink-soft font-normal" style={{ fontSize: 22, lineHeight: 1.45, maxWidth: 560, letterSpacing: "-0.005em" }}>{t.hero.sub}</p>
          <div className="flex gap-3 justify-end">
            <a href="#quote" className="btn">{t.cta.quote} <span className="arr">→</span></a>
            <a href="#contact" className="btn outline">{t.cta.agent}</a>
          </div>
        </div>

        <div className="reveal d4 grid border-t border-ink" style={{ gridTemplateColumns: "repeat(3, 1fr) auto", gap: 0, marginTop: 96, paddingTop: 24 }}>
          {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? "1px solid var(--color-rule)" : "none", paddingRight: 24 }}>
              <div className="display text-ink" style={{ fontSize: 56, lineHeight: 1 }}>{s.k}</div>
              <div className="mono opacity-70" style={{ marginTop: 12 }}>{s.v}</div>
            </div>
          ))}
          <div className="flex flex-col justify-between items-end" style={{ paddingLeft: 24 }}>
            <span className="tag"><span className="dot live"></span>{t.hero.live}</span>
            <span className="mono opacity-55">↘ scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Carriers Marquee
// ============================================================================
function CarriersMarquee() {
  const carriers = ["PROGRESSIVE", "TRAVELERS", "NATIONWIDE", "HARTFORD", "LIBERTY MUTUAL", "CHUBB", "ZURICH", "STATE AUTO", "BERKLEY", "MARKEL", "FOREMOST", "SAFECO"];
  return (
    <div className="border-t border-b border-rule overflow-hidden bg-paper" style={{ padding: "28px 0" }}>
      <div className="flex items-center whitespace-nowrap" style={{ gap: 64, animation: "marquee 38s linear infinite" }}>
        {[...carriers, ...carriers].map((c, i) => (
          <span key={i} className="font-display font-semibold text-ink opacity-70" style={{ fontSize: 24, letterSpacing: "0.02em" }}>
            {c} <span className="text-sky-ink opacity-50" style={{ marginLeft: 64 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Intro
// ============================================================================
function Intro({ t }) {
  return (
    <section style={{ padding: "120px 0 96px" }}>
      <div className="wrap">
        <div className="grid items-start" style={{ gridTemplateColumns: "1fr 2.4fr", gap: 64 }}>
          <div className="secnum">
            <b>00 / </b>
            <span>{t.intro.kicker}</span>
          </div>
          <p className="m-0 font-normal text-ink" style={{ fontSize: 36, lineHeight: 1.2, letterSpacing: "-0.015em", textWrap: "balance" }}>
            {t.intro.lead_a} <span className="serif-it text-sky-ink" style={{ fontSize: "1.05em" }}>{t.intro.lead_it}</span>{t.intro.lead_b}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Coverage
// ============================================================================
function Coverage({ t }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="coverage" className="bg-paper border-t border-b border-ink" style={{ padding: "80px 0 120px" }}>
      <div className="wrap">
        <div className="grid items-end" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 72 }}>
          <div className="secnum">
            <b>01 / </b>
            <span>{t.coverage.kicker}</span>
          </div>
          <div>
            <h2 className="display m-0 text-ink" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
              {t.coverage.heading_a} <span className="serif-it text-sky-ink">{t.coverage.heading_it}</span>
            </h2>
            <p className="text-ink-soft" style={{ marginTop: 24, maxWidth: 540, fontSize: 17, lineHeight: 1.55 }}>{t.coverage.lede}</p>
          </div>
        </div>

        <div className="border-t border-ink">
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
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="grid items-center border-b border-rule relative cursor-pointer"
      style={{
        gridTemplateColumns: "80px 240px 1fr 320px 80px",
        gap: 24,
        padding: hovered ? "36px 12px" : "28px 12px",
        background: hovered ? "var(--color-bg)" : "transparent",
        transition: "all .35s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <span className="mono text-ink-soft">{it.num}</span>
      <span className="display text-ink" style={{ fontSize: 32 }}>{it.name}</span>
      <span className="serif-it text-ink-soft" style={{ fontSize: 22 }}>{it.tagline}</span>
      <div
        className="text-ink-soft"
        style={{
          opacity: hovered ? 1 : 0.5,
          transition: "opacity .25s ease",
          fontSize: 13,
          lineHeight: 1.5,
          maxWidth: 320,
        }}
      >{it.body}</div>
      <span
        className="justify-self-end inline-flex items-center justify-center rounded-full border border-ink"
        style={{
          width: 44,
          height: 44,
          color: hovered ? "var(--color-paper)" : "var(--color-ink)",
          background: hovered ? "var(--color-ink)" : "transparent",
          transform: hovered ? "translateX(4px) rotate(-45deg)" : "rotate(-45deg)",
          transition: "all .25s ease",
        }}
      >
        <span style={{ fontSize: 16, color: hovered ? "var(--color-paper)" : "var(--color-ink)" }}>→</span>
      </span>
    </div>
  );
}

// ============================================================================
// Why
// ============================================================================
function Why({ t }) {
  return (
    <section id="about" className="relative overflow-hidden" style={{ padding: "140px 0" }}>
      <Eagle size={760} opacity={0.05} style={{ position: "absolute", right: -120, top: 80, transform: "rotate(8deg)" }} />
      <div className="wrap relative">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 96 }}>
          <div className="secnum"><b>02 / </b><span>{t.why.kicker}</span></div>
          <h2 className="display m-0 text-ink" style={{ fontSize: "clamp(40px, 6vw, 84px)", maxWidth: 880 }}>
            {t.why.heading_a} <span className="serif-it text-sky-ink">{t.why.heading_it}</span>{t.why.heading_b}
          </h2>
        </div>

        <div className="grid border-t border-ink" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {t.why.values.map((v, i) => (
            <div
              key={i}
              style={{
                padding: "44px 32px 44px 0",
                borderRight: i < 2 ? "1px solid var(--color-rule)" : "none",
                paddingLeft: i > 0 ? 32 : 0,
              }}
            >
              <div className="serif-it text-sky-ink" style={{ fontSize: 56, lineHeight: 1, marginBottom: 16 }}>{v.num}</div>
              <h3 className="display text-ink" style={{ fontSize: 32, margin: "0 0 16px 0" }}>{v.name}</h3>
              <p className="text-ink-soft m-0" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 360 }}>{v.body}</p>
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
