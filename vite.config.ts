import { readFileSync } from "node:fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// Variables sin las que la web saldría con datos de contacto vacíos.
const REQUIRED_ENV = ["VITE_CONTACT_EMAIL", "VITE_CONTACT_PHONE", "VITE_CONTACT_ADDRESS"];

// Lee public/_headers (formato Netlify) para que `vite preview` sirva las
// mismas cabeceras de seguridad que producción.
function securityHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  try {
    for (const raw of readFileSync("public/_headers", "utf8").split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#") || line.startsWith("/")) continue;
      const i = line.indexOf(":");
      if (i > 0) headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  } catch {
    // sin _headers: preview sin cabeceras extra
  }
  return headers;
}

export default defineConfig(({ command, mode }) => {
  if (command === "build") {
    const env = loadEnv(mode, process.cwd(), "VITE_");
    const missing = REQUIRED_ENV.filter((k) => !env[k]?.trim());
    if (missing.length) {
      // No se aborta la build para no bloquear el deploy, pero la web saldría
      // con datos de contacto vacíos: defínelas en el panel del hosting.
      console.warn(
        `\n[config] AVISO: faltan variables de entorno: ${missing.join(", ")}. ` +
          "Los datos de contacto saldrán vacíos. Copia .env.example a .env.local o " +
          "defínelas en el panel del hosting (Netlify: Site configuration > Environment variables).\n"
      );
    }
  }
  return {
    plugins: [react(), tailwindcss()],
    server: { port: 5173, open: true },
    preview: { port: 4173, headers: securityHeaders() },
  };
});
