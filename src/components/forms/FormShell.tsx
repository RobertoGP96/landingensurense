import type { ReactNode } from "react";
import SuccessState from "./SuccessState";
import { useBreakpoints } from "../../hooks/useMediaQuery";

type Props = {
  badge?: string;
  children: ReactNode;
  footerNote?: string;
  footerExtra?: ReactNode;
  submitLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
  submitting?: boolean;
  submittingLabel?: string;
  sent: boolean;
  successTitle: string;
  successBody: string;
  viewTransitionName?: string;
};

export default function FormShell({
  badge,
  children,
  footerNote,
  footerExtra,
  submitLabel,
  onSubmit,
  disabled,
  submitting,
  submittingLabel,
  sent,
  successTitle,
  successBody,
  viewTransitionName = "vt-quote-card",
}: Props) {
  const { isMobile } = useBreakpoints();
  return (
    <form
      onSubmit={onSubmit}
      className="relative"
      style={{
        background: "var(--color-paper)",
        border: "1px solid var(--color-ink)",
        padding: isMobile ? 20 : 48,
        paddingTop: isMobile ? 56 : 48,
        borderRadius: 4,
        viewTransitionName,
      }}
    >
      {badge && (
        <div
          className="mono absolute"
          style={{
            top: isMobile ? 16 : 20,
            right: isMobile ? 16 : 20,
            opacity: 0.5,
            fontSize: isMobile ? 9 : 11,
          }}
        >
          {badge}
        </div>
      )}

      {sent ? (
        <SuccessState title={successTitle} body={successBody} />
      ) : (
        <>
          {children}
          <div
            className="flex justify-between items-center flex-wrap"
            style={{
              marginTop: 32,
              paddingTop: 28,
              borderTop: "1px solid var(--color-rule)",
              gap: 16,
            }}
          >
            <div className="flex items-center" style={{ gap: 16 }}>
              {footerExtra}
              {footerNote && (
                <span className="mono" style={{ opacity: 0.6 }}>
                  {footerNote}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={disabled || submitting}
              className="btn"
              style={{
                opacity: disabled || submitting ? 0.4 : 1,
                cursor: disabled || submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? submittingLabel || "…" : submitLabel} <span className="arr">→</span>
            </button>
          </div>
        </>
      )}
    </form>
  );
}
