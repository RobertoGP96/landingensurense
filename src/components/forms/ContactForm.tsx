import { useState } from "react";
import type { Translation } from "../../data/types";
import Field from "./Field";
import FormShell from "./FormShell";
import { useFormSubmit } from "./useFormSubmit";
import { useBreakpoints } from "../../hooks/useMediaQuery";

export default function ContactForm({ t }: { t: Translation }) {
  const cf = t.contact_form;
  const { isMobile } = useBreakpoints();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(cf.subjects[0]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const { submit, sent, submitting } = useFormSubmit("contact");

  const valid =
    name.trim() && email.trim() && phone.trim() && message.trim().length >= 10 && consent;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    void submit({ name, email, phone, subject, message, consent });
  };

  return (
    <FormShell
      badge="FORM · CONTACT"
      onSubmit={onSubmit}
      disabled={!valid}
      submitting={submitting}
      submittingLabel={t.forms.submitting}
      sent={sent}
      successTitle={t.forms.success_title}
      successBody={t.forms.success_body}
      submitLabel={cf.submit}
      footerNote={t.quote.note}
      viewTransitionName="vt-contact-card"
    >
      <div className="grid" style={{ gap: 24 }}>
        <Field
          label={cf.labels.name}
          value={name}
          onChange={setName}
          placeholder={cf.placeholders.name}
          required
          requiredHint={t.forms.required}
        />
        <div
          className="grid"
          style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}
        >
          <Field
            label={cf.labels.email}
            value={email}
            onChange={setEmail}
            type="email"
            placeholder={cf.placeholders.email}
            required
          />
          <Field
            label={cf.labels.phone}
            value={phone}
            onChange={setPhone}
            type="tel"
            placeholder={cf.placeholders.phone}
            required
          />
        </div>
        <Field
          label={cf.labels.subject}
          value={subject}
          onChange={setSubject}
          type="select"
          options={cf.subjects}
          required
        />
        <Field
          label={cf.labels.message}
          value={message}
          onChange={setMessage}
          type="textarea"
          placeholder={cf.placeholders.message}
          required
        />
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
          <span>{cf.labels.consent}</span>
        </label>
      </div>
    </FormShell>
  );
}
