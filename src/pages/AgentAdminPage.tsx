import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";
import { useBreakpoints } from "../hooks/useMediaQuery";
import {
  type AgentInfo,
  clearAgentInfo,
  readAgentInfo,
  writeAgentInfo,
} from "../hooks/useAgentInfo";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

const EMPTY: AgentInfo = { label: "", name: "", role: "", phone: "", email: "", address: "" };

export default function AgentAdminPage() {
  const { t, lang } = useOutletContext<Ctx>();
  const { isMobile } = useBreakpoints();
  const fallback = t.intro.agent;
  const [form, setForm] = useState<AgentInfo>(EMPTY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = readAgentInfo();
    setForm({ ...EMPTY, ...(fallback ?? {}), ...(stored ?? {}) });
  }, [fallback]);

  const set = (key: keyof AgentInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setSaved(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    writeAgentInfo(form);
    setSaved(true);
  };

  const onReset = () => {
    clearAgentInfo();
    setForm({ ...EMPTY, ...(fallback ?? {}) });
    setSaved(false);
  };

  const heading = lang === "es" ? "Información del agente" : "Agent information";
  const sub =
    lang === "es"
      ? "Edita los datos del agente. Se guardan localmente y se muestran en la sección Nosotros."
      : "Edit the agent's details. They are saved locally and shown in the About section.";
  const savedLabel = lang === "es" ? "Guardado." : "Saved.";
  const resetLabel = lang === "es" ? "Restaurar predeterminado" : "Reset to default";
  const saveLabel = lang === "es" ? "Guardar" : "Save";

  const labels =
    lang === "es"
      ? {
          label: "Etiqueta",
          name: "Nombre completo",
          role: "Rol / Cargo",
          phone: "Teléfono",
          email: "Email",
          address: "Dirección",
        }
      : {
          label: "Label",
          name: "Full name",
          role: "Role / Title",
          phone: "Phone",
          email: "Email",
          address: "Address",
        };

  return (
    <main>
      <section style={{ padding: isMobile ? "56px 0 72px" : "100px 0 120px" }}>
        <div className="wrap">
          <div
            className="grid"
            style={{
              gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
              gap: isMobile ? 24 : 64,
              marginBottom: isMobile ? 32 : 56,
            }}
          >
            <div className="secnum">
              <b>00 / </b>
              <span>Admin</span>
            </div>
            <div>
              <h2
                className="display"
                style={{
                  fontSize: isMobile ? "clamp(28px, 7vw, 40px)" : "clamp(36px, 5vw, 64px)",
                  margin: 0,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                {heading}
              </h2>
              <p
                style={{
                  marginTop: isMobile ? 12 : 18,
                  fontSize: isMobile ? 15 : 17,
                  color: "var(--color-ink-soft)",
                  maxWidth: 640,
                }}
              >
                {sub}
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            style={{
              border: "1px solid var(--color-ink)",
              borderRadius: 4,
              padding: isMobile ? 24 : 40,
              background: "var(--color-paper)",
              display: "grid",
              gap: 20,
              maxWidth: 720,
            }}
          >
            <TextField label={labels.label} value={form.label} onChange={set("label")} />
            <TextField label={labels.name} value={form.name} onChange={set("name")} required />
            <TextField label={labels.role} value={form.role} onChange={set("role")} />
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 20,
              }}
            >
              <TextField label={labels.phone} value={form.phone} onChange={set("phone")} type="tel" />
              <TextField label={labels.email} value={form.email} onChange={set("email")} type="email" />
            </div>
            <TextAreaField label={labels.address} value={form.address} onChange={set("address")} />

            <div className="flex flex-wrap items-center" style={{ gap: 12, marginTop: 8 }}>
              <button type="submit" className="btn">
                {saveLabel} <span className="arr">→</span>
              </button>
              <button type="button" onClick={onReset} className="btn outline">
                {resetLabel}
              </button>
              {saved && (
                <span
                  className="mono"
                  style={{ fontSize: 12, color: "var(--color-sky-ink)", opacity: 0.85 }}
                >
                  ✓ {savedLabel}
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid" style={{ gap: 6 }}>
      <span className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: "0.08em" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          border: "1px solid var(--color-rule)",
          background: "transparent",
          borderRadius: 4,
          padding: "12px 14px",
          fontSize: 15,
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
        }}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <label className="grid" style={{ gap: 6 }}>
      <span className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: "0.08em" }}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        rows={2}
        style={{
          border: "1px solid var(--color-rule)",
          background: "transparent",
          borderRadius: 4,
          padding: "12px 14px",
          fontSize: 15,
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
          resize: "vertical",
        }}
      />
    </label>
  );
}
