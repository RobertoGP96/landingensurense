import type { Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function CtaBanner({ t }: { t: Translation }) {
  const { isMobile, isSmall } = useBreakpoints();
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: isMobile ? "64px 0" : "120px 0",
        background: "var(--color-ink)",
        color: "var(--color-paper)",
      }}
    >
      <img
        src="/assets/eagle.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          width: isMobile ? 360 : 720,
          maxWidth: "100%",
          height: "auto",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.08,
          filter: "invert(1)",
        }}
      />
      <div className="wrap relative text-center">
        <div
          className="mono"
          style={{
            opacity: 0.5,
            marginBottom: isMobile ? 20 : 32,
            color: "var(--color-paper)",
          }}
        >
          — {t.cta.quote} · 47 min avg —
        </div>
        <h2
          className="display"
          style={{
            fontSize: isMobile ? "clamp(40px, 11vw, 72px)" : "clamp(56px, 9vw, 132px)",
            margin: 0,
            color: "var(--color-paper)",
          }}
        >
          {t.hero.title_a}{" "}
          <span className="serif-it" style={{ color: "var(--color-sky)" }}>
            {t.hero.title_b_it}
          </span>{" "}
          {t.hero.title_c}
        </h2>
        <div
          className="flex justify-center"
          style={{
            marginTop: isMobile ? 32 : 48,
            gap: isSmall ? 10 : 16,
            flexDirection: isSmall ? "column" : "row",
            alignItems: isSmall ? "stretch" : "center",
          }}
        >
          <a
            href="#quote"
            className="btn"
            style={{
              background: "var(--color-paper)",
              color: "var(--color-ink)",
              borderColor: "var(--color-paper)",
              justifyContent: isSmall ? "center" : undefined,
            }}
          >
            {t.cta.quote} <span className="arr">→</span>
          </a>
          <a
            href={`tel:${t.topbar.phone}`}
            className="btn outline"
            style={{
              color: "var(--color-paper)",
              borderColor: "var(--color-paper)",
              justifyContent: isSmall ? "center" : undefined,
            }}
          >
            {t.cta.call} · {t.topbar.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
