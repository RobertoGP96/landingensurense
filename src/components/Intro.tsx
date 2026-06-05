import type { Translation } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";
import { useAgentInfo } from "../hooks/useAgentInfo";

export default function Intro({ t }: { t: Translation }) {
  const { isMobile, isSmall } = useBreakpoints();
  const agent = useAgentInfo(t.intro.agent);
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
          <div className="grid" style={{ gap: isMobile ? 28 : 40 }}>
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
            {agent && (
              <div
                style={{
                  border: "1px solid var(--color-ink)",
                  borderRadius: 6,
                  padding: isMobile ? 20 : 28,
                  background: "var(--color-paper)",
                  display: "grid",
                  gap: 14,
                }}
              >
                <div className="flex items-center" style={{ gap: isMobile ? 16 : 20 }}>
                  {agent.photo && (
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      style={{
                        width: isMobile ? 72 : 96,
                        height: isMobile ? 72 : 96,
                        borderRadius: 6,
                        objectFit: "cover",
                        objectPosition: "center top",
                        flexShrink: 0,
                        border: "1px solid var(--color-rule)",
                      }}
                    />
                  )}
                  <div className="grid" style={{ gap: 6 }}>
                    <div
                      className="mono"
                      style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}
                    >
                      {agent.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isMobile ? 22 : 28,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "var(--color-ink)",
                      }}
                    >
                      {agent.name}
                    </div>
                    <div style={{ fontSize: 14, opacity: 0.7 }}>{agent.role}</div>
                  </div>
                </div>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                    gap: isMobile ? 12 : 20,
                    paddingTop: 12,
                    borderTop: "1px solid var(--color-rule)",
                  }}
                >
                  <a
                    href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                    className="mono"
                    style={{ fontSize: 13, color: "var(--color-ink)" }}
                  >
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="mono"
                    style={{ fontSize: 13, color: "var(--color-ink)", wordBreak: "break-all" }}
                  >
                    {agent.email}
                  </a>
                  <span className="mono" style={{ fontSize: 13, opacity: 0.8 }}>
                    {agent.address}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
