import type { Translation } from "../data/types";
import Eagle from "./Eagle";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function Why({ t }: { t: Translation }) {
  const { isMobile, isDesktop } = useBreakpoints();
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ padding: isMobile ? "72px 0" : "140px 0" }}
    >
      <Eagle
        size={isMobile ? 380 : 760}
        opacity={0.05}
        style={{ position: "absolute", right: -120, top: 80, transform: "rotate(8deg)" }}
      />
      <div className="wrap relative">
        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 24 : 64,
            marginBottom: isMobile ? 48 : 96,
          }}
        >
          <div className="secnum">
            <b>02 / </b>
            <span>{t.why.kicker}</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(40px, 6vw, 84px)",
              margin: 0,
              color: "var(--color-ink)",
              maxWidth: 880,
            }}
          >
            {t.why.heading_a}{" "}
            <span className="serif-it" style={{ color: "var(--color-sky-ink)" }}>
              {t.why.heading_it}
            </span>
            {t.why.heading_b}
          </h2>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          {t.why.values.map((v, i) => (
            <div
              key={i}
              style={{
                padding: isMobile
                  ? "28px 0"
                  : isDesktop
                  ? "44px 32px 44px 0"
                  : "36px 20px 36px 0",
                borderRight: !isMobile && i < 2 ? "1px solid var(--color-rule)" : "none",
                borderBottom: isMobile && i < t.why.values.length - 1 ? "1px solid var(--color-rule)" : "none",
                paddingLeft: !isMobile && i > 0 ? (isDesktop ? 32 : 20) : 0,
              }}
            >
              <div
                className="serif-it"
                style={{
                  fontSize: isMobile ? 40 : 56,
                  color: "var(--color-sky-ink)",
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {v.num}
              </div>
              <h3
                className="display"
                style={{
                  fontSize: isMobile ? 24 : isDesktop ? 32 : 26,
                  margin: "0 0 16px 0",
                  color: "var(--color-ink)",
                }}
              >
                {v.name}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.55,
                  color: "var(--color-ink-soft)",
                  margin: 0,
                  maxWidth: 360,
                }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
