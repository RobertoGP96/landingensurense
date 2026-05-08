import type { Translation } from "../data/types";
export default function Intro({ t }: { t: Translation }) {
  return (
    <section style={{ padding: "120px 0 96px" }}>
      <div className="wrap">
        <div className="grid items-start" style={{ gridTemplateColumns: "1fr 2.4fr", gap: 64 }}>
          <div className="secnum">
            <b>00 / </b>
            <span>{t.intro.kicker}</span>
          </div>
          <p
            style={{
              fontSize: 36,
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
