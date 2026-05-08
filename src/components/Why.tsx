import type { Translation } from "../data/types";
import Eagle from "./Eagle";

export default function Why({ t }: { t: Translation }) {
  return (
    <section id="about" className="relative overflow-hidden" style={{ padding: "140px 0" }}>
      <Eagle
        size={760}
        opacity={0.05}
        style={{ position: "absolute", right: -120, top: 80, transform: "rotate(8deg)" }}
      />
      <div className="wrap relative">
        <div className="grid" style={{ gridTemplateColumns: "1fr 2fr", gap: 64, marginBottom: 96 }}>
          <div className="secnum">
            <b>02 / </b>
            <span>{t.why.kicker}</span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 6vw, 84px)",
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--color-ink)",
          }}
        >
          {t.why.values.map((v, i) => (
            <div
              key={i}
              style={{
                padding: "44px 32px 44px 0",
                borderRight: i < 2 ? "1px solid var(--color-rule)" : "none",
                paddingLeft: i > 0 ? 32 : 0,
              }}
            >
              <div
                className="serif-it"
                style={{ fontSize: 56, color: "var(--color-sky-ink)", lineHeight: 1, marginBottom: 16 }}
              >
                {v.num}
              </div>
              <h3 className="display" style={{ fontSize: 32, margin: "0 0 16px 0", color: "var(--color-ink)" }}>
                {v.name}
              </h3>
              <p
                style={{
                  fontSize: 16,
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
