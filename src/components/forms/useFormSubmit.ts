import { useCallback, useState } from "react";
import { withViewTransition } from "../../hooks/useT";

export type SubmitState = {
  submit: (payload: Record<string, unknown>) => Promise<void>;
  reset: () => void;
  sent: boolean;
  submitting: boolean;
  error: string | null;
};

// TODO: replace with real API integration (Resend / Formspree / Supabase MCP).
// For now we log the payload and simulate a 700ms network round-trip so the UI
// flow is identical to the eventual real submission.
export function useFormSubmit(formName: string): SubmitState {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setSubmitting(true);
      setError(null);
      // eslint-disable-next-line no-console
      console.log(`[form:${formName}] payload`, payload);
      try {
        await new Promise((r) => setTimeout(r, 700));
        withViewTransition(() => {
          setSubmitting(false);
          setSent(true);
        });
      } catch (e) {
        setSubmitting(false);
        setError(e instanceof Error ? e.message : "Submit error");
      }
    },
    [formName]
  );

  const reset = useCallback(() => {
    setSent(false);
    setSubmitting(false);
    setError(null);
  }, []);

  return { submit, reset, sent, submitting, error };
}
