import { useCallback, useState } from "react";
import { withViewTransition } from "../../hooks/useT";
import type { Lang } from "../../data/types";

/** Un campo del correo, con su etiqueta ya traducida al idioma de la página. */
export type SubmitField = { label: string; value: unknown };

export type SubmitState = {
  submit: (fields: SubmitField[], title?: string) => Promise<void>;
  reset: () => void;
  sent: boolean;
  submitting: boolean;
  error: string | null;
};

// Correo de la empresa que recibe las solicitudes. Mantener sincronizado con
// el correo que se muestra en src/data/content.ts y src/components/Footer.tsx.
const COMPANY_EMAIL = "catillomaris120@gmail.com";

// Texto fijo del correo por idioma.
const TEXT: Record<Lang, { intro: string; footer: string; yes: string }> = {
  es: {
    intro: "Nueva solicitud recibida desde el sitio web:",
    footer: "— Enviado automáticamente desde el formulario web.",
    yes: "Sí",
  },
  en: {
    intro: "New request received from the website:",
    footer: "— Sent automatically from the website form.",
    yes: "Yes",
  },
};

// Asunto del correo según el formulario de origen y el idioma de la página.
// `title` aporta la parte dinámica (producto, servicio o asunto de contacto).
function buildSubject(formName: string, lang: Lang, title?: string): string {
  const t = title?.trim();
  if (lang === "es") {
    if (formName === "contact") return t ? `Contacto — ${t}` : "Nuevo mensaje de contacto";
    if (formName === "auto-quote") return "Solicitud de cotización — Auto";
    if (formName === "product-quote")
      return t ? `Solicitud de cotización — ${t}` : "Solicitud de cotización";
    if (formName.startsWith("service:"))
      return `Solicitud de servicio — ${t ?? formName.slice("service:".length)}`;
    return `Nueva solicitud — ${formName}`;
  }
  if (formName === "contact") return t ? `Contact — ${t}` : "New contact message";
  if (formName === "auto-quote") return "Insurance quote request — Auto";
  if (formName === "product-quote")
    return t ? `Insurance quote request — ${t}` : "Insurance quote request";
  if (formName.startsWith("service:"))
    return `Service request — ${t ?? formName.slice("service:".length)}`;
  return `New request — ${formName}`;
}

// Cuerpo del correo: una línea "Etiqueta: valor" por cada campo no vacío.
function buildBody(fields: SubmitField[], lang: Lang): string {
  const yes = TEXT[lang].yes;
  const lines = fields
    .filter((f) => f.value !== "" && f.value != null && f.value !== false)
    .map((f) => `${f.label}: ${f.value === true ? yes : String(f.value)}`);
  return [TEXT[lang].intro, "", ...lines, "", TEXT[lang].footer].join("\n");
}

// Cada formulario llama a este hook con el idioma activo de la página; al enviar
// abre el cliente de correo del usuario con destinatario, asunto y cuerpo ya
// formateados (mailto) en ese mismo idioma.
export function useFormSubmit(formName: string, lang: Lang): SubmitState {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (fields: SubmitField[], title?: string) => {
      setSubmitting(true);
      setError(null);
      try {
        const subject = buildSubject(formName, lang, title);
        const body = buildBody(fields, lang);
        const mailto = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        withViewTransition(() => {
          setSubmitting(false);
          setSent(true);
        });
      } catch (e) {
        setSubmitting(false);
        setError(e instanceof Error ? e.message : "Submit error");
      }
    },
    [formName, lang]
  );

  const reset = useCallback(() => {
    setSent(false);
    setSubmitting(false);
    setError(null);
  }, []);

  return { submit, reset, sent, submitting, error };
}
