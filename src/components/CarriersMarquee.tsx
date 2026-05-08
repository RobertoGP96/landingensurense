import { useBreakpoints } from "../hooks/useMediaQuery";

export default function CarriersMarquee() {
  const { isMobile } = useBreakpoints();
  const carriers = [
    "PROGRESSIVE",
    "TRAVELERS",
    "NATIONWIDE",
    "HARTFORD",
    "LIBERTY MUTUAL",
    "CHUBB",
    "ZURICH",
    "STATE AUTO",
    "BERKLEY",
    "MARKEL",
    "FOREMOST",
    "SAFECO",
  ];
  return (
    <div
      className="bg-paper overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
        padding: isMobile ? "20px 0" : "28px 0",
      }}
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{ gap: isMobile ? 32 : 64, animation: "marquee 38s linear infinite" }}
      >
        {[...carriers, ...carriers].map((c, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: isMobile ? 16 : 24,
              letterSpacing: "0.02em",
              color: "var(--color-ink)",
              opacity: 0.7,
            }}
          >
            {c}{" "}
            <span
              style={{
                marginLeft: isMobile ? 32 : 64,
                color: "var(--color-sky-ink)",
                opacity: 0.5,
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
