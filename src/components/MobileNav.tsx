import type { Translation } from "../data/types";
import { useEffect } from "react";
import { Link } from "react-router";

type Props = {
  open: boolean;
  onClose: () => void;
  t: Translation;
};

export default function MobileNav({ open, onClose, t }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const items: { label: string; href: string; isLink: boolean }[] = [
    { label: t.nav[0], href: "/#coverage", isLink: false },
    { label: t.nav[1], href: "/quote", isLink: true },
    { label: t.nav[2], href: "/products", isLink: true },
    { label: t.nav[3], href: "/services", isLink: true },
    { label: t.nav[4], href: "/#process", isLink: false },
    { label: t.nav[5], href: "/contact", isLink: true },
  ];

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,22,40,0.45)",
          zIndex: 90,
          animation: "fade-in 0.2s ease both",
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(86vw, 360px)",
          background: "var(--color-bg)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          padding: "20px 24px 32px",
          boxShadow: "-12px 0 40px -12px rgba(10,22,40,0.25)",
          animation: "fade-in-down 0.25s ease both",
          overflowY: "auto",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <span className="mono" style={{ opacity: 0.55 }}>
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              border: "1px solid var(--color-ink)",
              background: "transparent",
              borderRadius: 999,
              width: 36,
              height: 36,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginBottom: 24,
          }}
        >
          {items.map((it, i) => {
            const linkStyle = {
              display: "block",
              padding: "14px 4px",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 22,
              color: "var(--color-ink)",
              borderBottom: "1px solid var(--color-rule)",
            } as const;
            return it.isLink ? (
              <Link key={i} to={it.href} onClick={onClose} style={linkStyle}>
                {it.label}
              </Link>
            ) : (
              <a key={i} href={it.href} onClick={onClose} style={linkStyle}>
                {it.label}
              </a>
            );
          })}
        </nav>

        <Link
          to="/quote"
          onClick={onClose}
          className="btn"
          style={{ justifyContent: "center", marginTop: "auto" }}
        >
          {t.cta.quote} <span className="arr">→</span>
        </Link>
      </aside>
    </>
  );
}
