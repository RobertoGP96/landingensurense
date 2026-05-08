import { useState } from "react";
import { withViewTransition } from "../hooks/useT";
import type { Translation } from "../data/types";

export default function Testimonials({ t }: { t: Translation }) {
  const [active, setActive] = useState(0);
  const it = t.testimonials.items[active];
  const setActiveTransition = (i: number) => withViewTransition(() => setActive(i));

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "120px 0",
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-ink)",
        borderBottom: "1px solid var(--color-ink)",
      }}
    >
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 64 }}>
          <div className="secnum">
            <b>05 / </b>
            <span>{t.testimonials.kicker}</span>
          </div>
          <h2
            className="display"
            style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: 0, color: "var(--color-ink)" }}
          >
            {t.testimonials.heading_a}{" "}
            <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
              {t.testimonials.heading_it}
            </span>
            {t.testimonials.heading_b}
          </h2>
        </div>

        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 64 }}
        >
          <div
            className="relative"
            style={{ minHeight: 360, viewTransitionName: "vt-testimonial-quote" }}
          >
            <span
              className="serif-it absolute"
              style={{
                top: -30,
                left: -10,
                fontSize: 200,
                color: "var(--color-sky)",
                lineHeight: 1,
                fontStyle: "italic",
              }}
            >
              "
            </span>
            <p
              className="serif-it"
              style={{
                fontSize: 32,
                lineHeight: 1.3,
                margin: 0,
                color: "var(--color-ink)",
                position: "relative",
                zIndex: 1,
                textWrap: "pretty",
              }}
            >
              {it.q}
            </p>
            <div className="flex items-center" style={{ marginTop: 40, gap: 16 }}>
              <span
                className="inline-flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 99,
                  background: "var(--color-ink)",
                  color: "var(--color-paper)",
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {it.a.charAt(0)}
              </span>
              <div>
                <div
                  style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}
                >
                  {it.a}
                </div>
                <div className="mono" style={{ marginTop: 4, opacity: 0.6 }}>
                  {it.r}
                </div>
              </div>
            </div>
          </div>

          <div>
            {t.testimonials.items.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveTransition(i)}
                className="block w-full text-left transition-all duration-200"
                style={{
                  padding: "24px 0",
                  background: "transparent",
                  border: 0,
                  borderTop: "1px solid var(--color-rule)",
                  borderBottom:
                    i === t.testimonials.items.length - 1
                      ? "1px solid var(--color-rule)"
                      : "none",
                  cursor: "pointer",
                }}
              >
                <div className="flex justify-between items-baseline">
                  <span
                    className="display"
                    style={{
                      fontSize: active === i ? 32 : 22,
                      color:
                        active === i
                          ? "var(--color-ink)"
                          : "var(--color-ink-soft)",
                      transition: "all .25s",
                    }}
                  >
                    {c.a}
                  </span>
                  <span className="mono" style={{ opacity: 0.5 }}>
                    0{i + 1} / 0{t.testimonials.items.length}
                  </span>
                </div>
                <div
                  className="mono"
                  style={{ marginTop: 6, opacity: active === i ? 0.7 : 0.4 }}
                >
                  {c.since}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
