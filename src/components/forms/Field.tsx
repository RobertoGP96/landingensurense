import { useEffect, useState, type CSSProperties } from "react";
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
  /** When true and type is "select", appends an "Other" option that reveals a free-text input. */
  allowOther?: boolean;
  /** Label for the "other" option in the select dropdown. */
  otherLabel?: string;
  /** Placeholder for the manual-entry input that shows after picking "other". */
  otherPlaceholder?: string;
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

const OTHER_SENTINEL = "__other__";

export default function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  options,
  requiredHint,
  allowOther,
  otherLabel = "Otro / escribir manualmente",
  otherPlaceholder,
}: FieldProps) {
  const isInOptions = !!options && options.includes(value);
  const [otherMode, setOtherMode] = useState<boolean>(
    !!allowOther && value !== "" && !isInOptions
  );

  useEffect(() => {
    if (allowOther && value !== "" && !isInOptions) setOtherMode(true);
  }, [allowOther, value, isInOptions]);

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--color-ink)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--color-rule)";
  };

  const labelEl = (
    <span
      className="mono"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
        marginBottom: 8,
        opacity: 0.6,
        minHeight: 16,
        lineHeight: 1.2,
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>{label}</span>
      {required && requiredHint && (
        <span style={{ fontSize: 9, opacity: 0.5, flexShrink: 0 }}>{requiredHint}</span>
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
    const selectValue = otherMode ? OTHER_SENTINEL : value;
    return (
      <label className="block">
        {labelEl}
        <select
          value={selectValue}
          onChange={(e) => {
            const v = e.target.value;
            if (v === OTHER_SENTINEL) {
              setOtherMode(true);
              onChange("");
            } else {
              setOtherMode(false);
              onChange(v);
            }
          }}
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
          {allowOther && <option value={OTHER_SENTINEL}>{otherLabel}</option>}
        </select>
        {allowOther && otherMode && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={otherPlaceholder || placeholder || ""}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus
            style={{ ...baseInput, marginTop: 8, fontSize: 18 }}
          />
        )}
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
