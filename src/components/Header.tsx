import type { Translation } from "../data/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useBreakpoints } from "../hooks/useMediaQuery";
import MobileNav from "./MobileNav";

type NavKind = "anchor" | "page" | "dropdown";
type DropdownKey = "products" | "services" | null;

export default function Header({ t }: { t: Translation }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile } = useBreakpoints();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile, mobileOpen]);

  // nav: [Coverage, Get a quote, Products, Services, About, Contact]
  const items: { label: string; kind: NavKind; href: string; dropdown?: DropdownKey }[] = [
    { label: t.nav[0], kind: "page", href: "/coverage" },
    { label: t.nav[1], kind: "page", href: "/quote" },
    { label: t.nav[2], kind: "dropdown", href: "/products", dropdown: "products" },
    { label: t.nav[3], kind: "dropdown", href: "/services", dropdown: "services" },
    { label: t.nav[4], kind: "page", href: "/about" },
    { label: t.nav[5], kind: "page", href: "/contact" },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(227,237,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-rule)" : "1px solid transparent",
      }}
    >
      <div
        className="wrap flex items-center justify-between"
        style={{ paddingTop: isMobile ? 14 : 20, paddingBottom: isMobile ? 14 : 20 }}
        onMouseLeave={() => setOpen(null)}
      >
        <Link to="/" className="flex items-center" style={{ gap: isMobile ? 10 : 14 }}>
          <img
            src="/assets/eagle.png"
            alt=""
            style={{ height: isMobile ? 30 : 38, width: "auto" }}
          />
          <div className="grid leading-none" style={{ gap: 4 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: isMobile ? 14 : 16,
                letterSpacing: "-0.02em",
              }}
            >
              M C Solutions
            </span>
            <span className="mono" style={{ opacity: 0.55, fontSize: 9 }}>
              Insurance · LLC
            </span>
          </div>
        </Link>

        {!isMobile && (
        <nav className="flex" style={{ gap: 28 }}>
          {items.map((it, i) => {
            const baseStyle = {
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-ink)",
              opacity: 0.85,
              cursor: "pointer",
            };

            if (it.kind === "dropdown") {
              const list = it.dropdown === "products" ? t.products.items : t.services.items;
              const basePath = it.dropdown === "products" ? "/products" : "/services";
              const isOpen = open === it.dropdown;
              return (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setOpen(it.dropdown!)}
                >
                  <Link to={it.href} style={baseStyle}>
                    {it.label}
                    <span style={{ marginLeft: 6, opacity: 0.6 }}>▾</span>
                  </Link>
                  {isOpen && (
                    <div
                      className="absolute"
                      style={{
                        top: "calc(100% + 16px)",
                        left: -16,
                        background: "var(--color-paper)",
                        border: "1px solid var(--color-ink)",
                        borderRadius: 4,
                        padding: 12,
                        minWidth: 260,
                        maxWidth: "calc(100vw - 48px)",
                        maxHeight: "min(480px, 70vh)",
                        overflowY: "auto",
                        boxShadow: "0 18px 40px -12px rgba(10,22,40,.18)",
                        zIndex: 60,
                      }}
                    >
                      <div className="grid" style={{ gap: 2 }}>
                        {list.map((entry) => (
                          <Link
                            key={entry.slug}
                            to={`${basePath}/${entry.slug}`}
                            onClick={() => setOpen(null)}
                            className="flex justify-between items-baseline"
                            style={{
                              padding: "8px 12px",
                              borderRadius: 4,
                              fontSize: 13,
                              color: "var(--color-ink)",
                              transition: "background .15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "var(--color-bg)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                              {entry.name}
                            </span>
                            <span className="mono" style={{ opacity: 0.5, fontSize: 9 }}>
                              {entry.num}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          paddingTop: 8,
                          borderTop: "1px solid var(--color-rule)",
                        }}
                      >
                        <Link
                          to={it.href}
                          onClick={() => setOpen(null)}
                          className="mono"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "6px 12px",
                            opacity: 0.7,
                          }}
                        >
                          <span>{it.label}</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (it.kind === "anchor") {
              return (
                <a key={i} href={it.href} style={baseStyle}>
                  {it.label}
                </a>
              );
            }

            return (
              <Link key={i} to={it.href} style={baseStyle}>
                {it.label}
              </Link>
            );
          })}
        </nav>
        )}

        <div className="flex items-center" style={{ gap: 12 }}>
          {!isMobile && (
            <Link className="btn outline" to="/quote" style={{ padding: "10px 18px", fontSize: 13 }}>
              {t.cta.quote} <span className="arr">→</span>
            </Link>
          )}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{
                border: "1px solid var(--color-ink)",
                background: "transparent",
                borderRadius: 999,
                width: 40,
                height: 40,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: 0,
              }}
            >
              <span style={{ width: 16, height: 1.5, background: "var(--color-ink)" }} />
              <span style={{ width: 16, height: 1.5, background: "var(--color-ink)" }} />
              <span style={{ width: 16, height: 1.5, background: "var(--color-ink)" }} />
            </button>
          )}
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} t={t} />
    </header>
  );
}
