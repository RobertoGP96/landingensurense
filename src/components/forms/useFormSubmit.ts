import { useCallback, useState } from "react";
import { withViewTransition } from "../../hooks/useT";
import type { Lang } from "../../data/types";
import { WEB3FORMS_ACCESS_KEY } from "../../config/site";

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

// Servicio que entrega el formulario por correo sin backend propio. A diferencia
// de otros servicios, Web3Forms no requiere activación por correo ni por dominio:
// basta una access key (VITE_WEB3FORMS_ACCESS_KEY, ver .env.example) creada en
// web3forms.com, donde también se define el correo receptor.
const SUBMIT_ENDPOINT = "https://api.web3forms.com/submit";

// Etiqueta afirmativa por idioma para los campos booleanos del correo.
const YES: Record<Lang, string> = { es: "Sí", en: "Yes" };

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
  const yes = YES[lang];
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

// Envío real por HTTP: Web3Forms entrega el contenido al correo de la access key.
async function sendViaWeb3Forms(
  subject: string,
  pairs: [string, string][]
): Promise<void> {
  const payload: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    from_name: "Sitio web — M C Solutions Insurance",
    // Honeypot de Web3Forms: lo enviamos vacío (el chequeo real lo hace el
    // honeypot `_honey` de FormShell antes de llamar a submit).
    botcheck: "",
  };
  const replyTo = findReplyTo(pairs);
  if (replyTo) payload.replyto = replyTo;
  for (const [label, value] of pairs) payload[label] = value;

  const res = await fetch(SUBMIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const data: { success?: boolean; message?: string } = await res
    .json()
    .catch(() => ({}));
  if (!res.ok || data.success !== true) {
    throw new Error(data.message || `Web3Forms HTTP ${res.status}`);
  }
}

// Cada formulario llama a este hook con el idioma activo de la página; al
// enviar, la solicitud se manda por HTTP a Web3Forms, que la entrega al correo
// de la access key, sin que la persona tenga que abrir su cliente de correo. Si
// el envío por red falla, el motivo queda en `error` para que el formulario lo
// muestre y la persona pueda reintentar.
export function useFormSubmit(formName: string, lang: Lang): SubmitState {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (fields: SubmitField[], title?: string) => {
      setSubmitting(true);
      setError(null);
      if (!WEB3FORMS_ACCESS_KEY) {
        console.error("[forms] Falta VITE_WEB3FORMS_ACCESS_KEY; no se puede enviar.");
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
        await sendViaWeb3Forms(subject, pairs);
      } catch (e) {
        // Sin respaldo mailto: si la entrega por red falla se informa del error
        // y se conserva el formulario para que la persona pueda reintentar.
        setSubmitting(false);
        setError(e instanceof Error ? e.message : "Submit error");
        return;
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
