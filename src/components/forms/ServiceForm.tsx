import { useState } from "react";
import type { Translation, ServiceItem } from "../../data/types";
import Field from "./Field";
import FormShell from "./FormShell";
import { useFormSubmit } from "./useFormSubmit";
import { useT } from "../../hooks/useT";

type Props = {
  t: Translation;
  service: ServiceItem;
};

export default function ServiceForm({ t, service }: Props) {
  const { lang } = useT();
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(true);

  const { submit, sent, submitting } = useFormSubmit(`service:${service.slug}`, lang);

  const valid =
    consent &&
    service.formFields.every((f) => !f.required || (values[f.key] || "").trim());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    void submit(
      service.formFields.map((f) => ({ label: f.label, value: values[f.key] || "" })),
      service.name
    );
  };

  const setField = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  return (
    <FormShell
      badge={`SERVICE · ${service.num}`}
      onSubmit={onSubmit}
      disabled={!valid}
      submitting={submitting}
      submittingLabel={t.forms.submitting}
      sent={sent}
      successTitle={t.forms.success_title}
      successBody={t.forms.success_body}
      submitLabel={t.services.detail.request}
      viewTransitionName="vt-service-card"
    >
      <div className="grid" style={{ gap: 24 }}>
        {service.formFields.map((f) => (
          <Field
            key={f.key}
            label={f.label}
            value={values[f.key] || ""}
            onChange={(v) => setField(f.key, v)}
            type={f.type}
            placeholder={f.placeholder}
            options={f.options}
            required={f.required}
            requiredHint={t.forms.required}
          />
        ))}
        <label
          className="flex items-start cursor-pointer"
          style={{ gap: 12, fontSize: 13, color: "var(--color-ink-soft)", lineHeight: 1.5 }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ marginTop: 3, accentColor: "var(--color-ink)" }}
          />
          <span>{t.contact_form.labels.consent}</span>
        </label>
      </div>
    </FormShell>
  );
}
