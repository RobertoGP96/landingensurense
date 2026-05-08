import type { Translation, Lang } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";

type LangSwitchProps = { lang: Lang; setLang: (l: Lang) => void };
function LangSwitch({ lang, setLang }: LangSwitchProps) {
  return (
    <span className="inline-flex border border-paper/30 rounded-full overflow-hidden p-0.5">
      {(["es", "en"] as const).map((code) => (
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

type TopbarProps = { t: Translation; lang: Lang; setLang: (l: Lang) => void };
export default function Topbar({ t, lang, setLang }: TopbarProps) {
  const { isMobile, isSmall } = useBreakpoints();
  return (
    <div className="bg-ink text-paper text-xs">
      <div
        className="wrap flex items-center justify-between"
        style={{
          padding: isMobile ? "8px 0" : "10px 56px",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: isMobile ? 10 : 11,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div
          className="flex items-center"
          style={{ gap: isMobile ? 12 : 28, flexWrap: "wrap" }}
        >
          <span>
            <span style={{ opacity: 0.5 }}>↳</span> {t.topbar.hours}
          </span>
          {!isSmall && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{t.topbar.license}</span>
            </>
          )}
        </div>
        <div
          className="flex items-center"
          style={{ gap: isMobile ? 12 : 24, flexWrap: "wrap" }}
        >
          {!isMobile && (
            <>
              <a href="#" className="inline-flex items-center" style={{ gap: 8 }}>
                <span
                  className="inline-block"
                  style={{ width: 6, height: 6, borderRadius: 99, background: "#7ed5a4" }}
                />
                {t.hero.live}
              </a>
              <span style={{ opacity: 0.4 }}>·</span>
            </>
          )}
          <a href={`tel:${t.topbar.phone}`}>{t.topbar.phone}</a>
          <span style={{ opacity: 0.4 }}>·</span>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </div>
    </div>
  );
}
