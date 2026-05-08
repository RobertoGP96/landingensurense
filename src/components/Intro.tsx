import type { Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

export default function Intro({ t }: { t: Translation }) {
  const { isMobile, isSmall } = useBreakpoints();
  return (
    <section style={{ padding: isMobile ? "64px 0 56px" : "120px 0 96px" }}>
      <div className="wrap">
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2.4fr",
            gap: isMobile ? 24 : 64,
          }}
        >
          <div className="secnum">
            <b>00 / </b>
            <span>{t.intro.kicker}</span>
          </div>
          <p
            style={{
              fontSize: isSmall ? 22 : isMobile ? 26 : 36,
              lineHeight: 1.2,
              margin: 0,
              fontWeight: 400,
              color: "var(--color-ink)",
              letterSpacing: "-0.015em",
              textWrap: "balance",
            }}
          >
            {t.intro.lead_a}{" "}
            <span className="serif-it" style={{ fontSize: "1.05em", color: "var(--color-sky-ink)" }}>
              {t.intro.lead_it}
            </span>
            {t.intro.lead_b}
          </p>
        </div>
      </div>
    </section>
  );
}
