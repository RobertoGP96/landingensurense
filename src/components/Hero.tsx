import type { Translation } from "../data/types";
import Eagle from "./Eagle";

export default function Hero({ t }: { t: Translation }) {
  return (
    <section id="top" className="relative overflow-hidden" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Eagle
          size={1180}
          opacity={0.045}
          style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)" }}
        />
      </div>
      <div className="wrap relative">
        <div
          className="reveal d1 flex justify-between items-baseline"
          style={{ marginTop: 48, marginBottom: 56 }}
        >
          <span className="mono" style={{ opacity: 0.7 }}>{t.hero.eyebrow}</span>
          <span className="mono" style={{ opacity: 0.5 }}>FL · TX · GA</span>
        </div>

        <h1 className="reveal d2 display" style={{ fontSize: "clamp(64px, 12vw, 184px)", margin: 0, color: "var(--color-ink)" }}>
          {t.hero.title_a}
          <br />
          <span className="serif-it" style={{ fontSize: "1.04em", color: "var(--color-sky-ink)" }}>
            {t.hero.title_b_it}
          </span>{" "}
          <span className="inline-flex items-center" style={{ gap: 24 }}>
            {t.hero.title_c}
            <span
              className="inline-block"
              style={{ height: "0.7em", width: 8, background: "var(--color-ink)" }}
            >
              {" "}
            </span>
          </span>
        </h1>

        <div
          className="reveal d3 grid items-end"
          style={{ gridTemplateColumns: "1.1fr 0.9fr", gap: 64, marginTop: 56 }}
        >
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              maxWidth: 560,
              color: "var(--color-ink-soft)",
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.005em",
            }}
          >
            {t.hero.sub}
          </p>
          <div className="flex justify-end" style={{ gap: 12 }}>
            <a href="#quote" className="btn">
              {t.cta.quote} <span className="arr">→</span>
            </a>
            <a href="#contact" className="btn outline">
              {t.cta.agent}
            </a>
          </div>
        </div>

        <div
          className="reveal d4 grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr) auto",
            gap: 0,
            marginTop: 96,
            borderTop: "1px solid var(--color-ink)",
            paddingTop: 24,
          }}
        >
          {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
            <div
              key={i}
              style={{
                borderRight: i < 3 ? "1px solid var(--color-rule)" : "none",
                paddingRight: 24,
              }}
            >
              <div className="display" style={{ fontSize: 56, lineHeight: 1, color: "var(--color-ink)" }}>
                {s.k}
              </div>
              <div className="mono" style={{ marginTop: 12, opacity: 0.7 }}>
                {s.v}
              </div>
            </div>
          ))}
          <div
            className="flex flex-col justify-between items-end"
            style={{ paddingLeft: 24 }}
          >
            <span className="tag">
              <span className="dot live"></span>
              {t.hero.live}
            </span>
            <span className="mono" style={{ opacity: 0.55 }}>↘ scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
