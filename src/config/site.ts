// Datos de contacto y ajustes que dependen del entorno. Se leen de variables
// VITE_* definidas en .env.local (desarrollo) o en el panel del hosting
// (producción); ver .env.example.
//
// Nota: Vite incrusta estos valores en el bundle público en tiempo de build.
// Sacarlos del código evita fijarlos en el repositorio y permite cambiarlos
// por entorno, pero no los oculta al navegador. Para que el correo receptor
// de los formularios sea realmente privado hace falta una función de servidor.

function read(name: string): string {
  const value = (import.meta.env as Record<string, unknown>)[name];
  return typeof value === "string" ? value.trim() : "";
}

/** Datos de contacto que se muestran en la web (topbar, footer, contacto). */
export const CONTACT = {
  email: read("VITE_CONTACT_EMAIL"),
  phone: read("VITE_CONTACT_PHONE"),
  address: read("VITE_CONTACT_ADDRESS"),
} as const;

/** Access key de Web3Forms (https://web3forms.com) que entrega los formularios.
 * Es pública por diseño (va incrustada en el bundle): solo enruta al correo
 * asociado a la key en web3forms.com, no permite cambiar el destinatario. El
 * correo receptor se configura al crear la key, no en estas variables. */
export const WEB3FORMS_ACCESS_KEY = read("VITE_WEB3FORMS_ACCESS_KEY");

/** Habilita la ruta /admin/agent (solo útil en desarrollo). */
export const ENABLE_AGENT_ADMIN = read("VITE_ENABLE_AGENT_ADMIN") === "true";

if (import.meta.env.DEV) {
  const missing = Object.entries(CONTACT)
    .filter(([, v]) => !v)
    .map(([k]) => `VITE_CONTACT_${k.toUpperCase()}`);
  if (missing.length) {
    console.warn(`[config] Variables sin definir: ${missing.join(", ")}. Copia .env.example a .env.local.`);
  }
}
