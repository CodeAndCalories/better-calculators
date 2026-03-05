"use client";
import type { InputSchema, InputValues } from "@/lib/types";
import styles from "./CalculatorInput.module.css";

interface Props {
  schema: InputSchema;
  value: string | number | boolean;
  onChange: (key: string, value: string | number | boolean) => void;
  error?: string;
}

export default function CalculatorInput({ schema, value, onChange, error }: Props) {
  const id = `input-${schema.key}`;

  return (
    <div className={`${styles.field} ${error ? styles.hasError : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {schema.label}
        {schema.helpText && <span className={styles.helpText}>{schema.helpText}</span>}
      </label>

      {schema.type === "number" && (
        <div className={styles.inputWrap}>
          {schema.prefix && <span className={styles.addon}>{schema.prefix}</span>}
          <input
            id={id}
            type="number"
            className={`${styles.input} ${schema.prefix ? styles.hasPrefix : ""} ${schema.suffix ? styles.hasSuffix : ""}`}
            value={value as string | number}
            onChange={(e) => onChange(schema.key, e.target.value)}
            min={schema.min}
            max={schema.max}
            step={schema.step}
            placeholder={schema.placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          {schema.suffix && <span className={`${styles.addon} ${styles.suffix}`}>{schema.suffix}</span>}
        </div>
      )}

      {schema.type === "select" && (
        <select
          id={id}
          className={styles.select}
          value={value as string}
          onChange={(e) => onChange(schema.key, e.target.value)}
          aria-invalid={!!error}
        >
          {schema.options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {schema.type === "toggle" && (
        <label className={styles.toggleWrap}>
          <input
            id={id}
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => onChange(schema.key, e.target.checked)}
            className={styles.toggleCheckbox}
          />
          <span className={styles.toggle} />
          <span className={styles.toggleLabel}>{value ? "On" : "Off"}</span>
        </label>
      )}

      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
