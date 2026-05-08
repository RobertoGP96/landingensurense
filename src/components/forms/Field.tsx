import type { CSSProperties } from "react";
import type { FieldType } from "../../data/types";

export type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  requiredHint?: string;
};

const baseInput: CSSProperties = {
  padding: "14px 0",
  border: 0,
  borderBottom: "1px solid var(--color-rule)",
  fontFamily: "var(--font-display)",
  fontSize: 22,
  color: "var(--color-ink)",
  transition: "border-color .2s",
  width: "100%",
  background: "transparent",
  outline: "none",
};

export default function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  options,
  requiredHint,
}: FieldProps) {
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--color-ink)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--color-rule)";
  };

  const labelEl = (
    <span
      className="mono"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, opacity: 0.6 }}
    >
      <span>{label}</span>
      {required && requiredHint && (
        <span style={{ fontSize: 9, opacity: 0.5 }}>{requiredHint}</span>
      )}
    </span>
  );

  if (type === "textarea") {
    return (
      <label className="block">
        {labelEl}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            ...baseInput,
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.5,
            resize: "vertical",
            paddingTop: 12,
          }}
        />
      </label>
    );
  }

  if (type === "select" && options && options.length > 0) {
    return (
      <label className="block">
        {labelEl}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            ...baseInput,
            appearance: "none",
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\"><path fill=\"%230a1628\" d=\"M6 8 0 0h12z\"/></svg>')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 4px center",
            paddingRight: 24,
          }}
        >
          <option value="" disabled>
            {placeholder || "—"}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const htmlType = type === "tel" ? "tel" : type === "email" ? "email" : type === "date" ? "date" : type === "number" ? "number" : "text";

  return (
    <label className="block">
      {labelEl}
      <input
        type={htmlType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        style={baseInput}
      />
    </label>
  );
}
