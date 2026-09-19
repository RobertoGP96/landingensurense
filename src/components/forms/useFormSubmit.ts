import { useCallback, useState } from "react";
import { withViewTransition } from "../../hooks/useT";
import type { Lang } from "../../data/types";
import { FORM_RECIPIENT_EMAIL } from "../../config/site";

/** Un campo del correo, con su etiqueta ya traducida al idioma de la página.
 * Con `section: true` el campo actúa como encabezado de sección (sin valor). */
export type SubmitField = { label: string; value: unknown; section?: boolean };

export type SubmitState = {
  submit: (fields: SubmitField[], title?: string) => Promise<void>;
  reset: () => void;
  sent: boolean;
  submitting: boolean;
  error: string | null;
};

// Correo que recibe las solicitudes. Se define en VITE_FORM_RECIPIENT_EMAIL (o
// VITE_CONTACT_EMAIL) — ver .env.example — para no fijarlo en el repositorio.
const COMPANY_EMAIL = FORM_RECIPIENT_EMAIL;

// Servicio que entrega el formulario por correo sin backend propio. La primera
// vez que llegue un envío, FormSubmit manda un correo de activación a
// COMPANY_EMAIL; hay que pulsar "Activate" una sola vez para que empiecen a
// entregarse las solicitudes.
const SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${COMPANY_EMAIL}`;

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

// Prefijo con el que un par se marca como encabezado de sección en el correo.
const SECTION_MARK = "— ";

function isSectionPair(pair: [string, string]): boolean {
  return pair[0].startsWith(SECTION_MARK);
}

// Campos no vacíos como pares etiqueta → texto, listos para el correo. Los
// encabezados de sección se conservan solo si les sigue al menos un campo.
function usableFields(fields: SubmitField[], lang: Lang): [string, string][] {
  const yes = TEXT[lang].yes;
  const pairs: [string, string][] = [];
  for (const f of fields) {
    if (f.section) {
      pairs.push([`${SECTION_MARK}${f.label} ${SECTION_MARK.trim()}`, "·"]);
      continue;
    }
    if (f.value === "" || f.value == null || f.value === false) continue;
    pairs.push([f.label, f.value === true ? yes : String(f.value)]);
  }
  return pairs.filter(
    (p, i) => !isSectionPair(p) || (pairs[i + 1] != null && !isSectionPair(pairs[i + 1]))
  );
}

// Honeypot: FormShell incluye un campo oculto `_honey` que las personas no ven.
// Si llega relleno, la petición viene de un bot y se descarta sin enviarla.
function honeypotTripped(): boolean {
  if (typeof document === "undefined") return false;
  const input = document.querySelector<HTMLInputElement>('input[name="_honey"]');
  return Boolean(input?.value);
}

// Primer valor con forma de email entre los campos: se usa como reply-to para
// que la empresa pueda responder directamente al solicitante.
function findReplyTo(pairs: [string, string][]): string | null {
  for (const [, value] of pairs) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return value.trim();
  }
  return null;
}

// Cuerpo del correo para el respaldo mailto: una línea "Etiqueta: valor" y
// las secciones como títulos separados por una línea en blanco.
function buildBody(pairs: [string, string][], lang: Lang): string {
  const lines = pairs.map((pair) =>
    isSectionPair(pair) ? `\n${pair[0]}` : `${pair[0]}: ${pair[1]}`
  );
  return [TEXT[lang].intro, ...lines, "", TEXT[lang].footer].join("\n");
}

// Envío real por HTTP: FormSubmit entrega el contenido a COMPANY_EMAIL.
async function sendViaFormSubmit(
  subject: string,
  pairs: [string, string][]
): Promise<void> {
  const payload: Record<string, string> = {
    _subject: subject,
    _template: "box",
    _captcha: "false",
  };
  const replyTo = findReplyTo(pairs);
  if (replyTo) payload._replyto = replyTo;
  for (const [label, value] of pairs) payload[label] = value;

  const res = await fetch(SUBMIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`FormSubmit HTTP ${res.status}`);
  const data: { success?: string | boolean } = await res.json();
  if (String(data.success) !== "true") throw new Error("FormSubmit rejected");
}

// Cada formulario llama a este hook con el idioma activo de la página; al
// enviar, la solicitud se manda por HTTP a COMPANY_EMAIL. Si el envío por red
// falla, como respaldo se abre el cliente de correo del usuario con el mensaje
// ya redactado (mailto) en ese mismo idioma.
export function useFormSubmit(formName: string, lang: Lang): SubmitState {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (fields: SubmitField[], title?: string) => {
      setSubmitting(true);
      setError(null);
      if (!COMPANY_EMAIL) {
        console.error("[forms] Falta VITE_FORM_RECIPIENT_EMAIL / VITE_CONTACT_EMAIL; no se puede enviar.");
        setSubmitting(false);
        setError("Form not configured");
        return;
      }
      if (honeypotTripped()) {
        // Se simula el éxito para no dar pistas al bot.
        withViewTransition(() => {
          setSubmitting(false);
          setSent(true);
        });
        return;
      }
      const subject = buildSubject(formName, lang, title);
      const pairs = usableFields(fields, lang);
      try {
        await sendViaFormSubmit(subject, pairs);
      } catch {
        // Respaldo: abrir el cliente de correo del usuario con el borrador.
        try {
          const body = buildBody(pairs, lang);
          const mailto = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;
          window.location.href = mailto;
        } catch (e) {
          setSubmitting(false);
          setError(e instanceof Error ? e.message : "Submit error");
          return;
        }
      }
      withViewTransition(() => {
        setSubmitting(false);
        setSent(true);
      });
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
