import type { InputSchema, InputValues } from "./types";

export interface ValidationError {
  key: string;
  message: string;
}

export function validateInputs(
  schemas: InputSchema[],
  values: InputValues
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const schema of schemas) {
    const value = values[schema.key];

    if (schema.type === "number") {
      const num = Number(value);
      if (value === "" || value === undefined || value === null) {
        errors.push({ key: schema.key, message: `${schema.label} is required.` });
        continue;
      }
      if (isNaN(num)) {
        errors.push({ key: schema.key, message: `${schema.label} must be a valid number.` });
        continue;
      }
      if (schema.min !== undefined && num < schema.min) {
        errors.push({ key: schema.key, message: `${schema.label} must be at least ${schema.min}.` });
      }
      if (schema.max !== undefined && num > schema.max) {
        errors.push({ key: schema.key, message: `${schema.label} must be at most ${schema.max}.` });
      }
    }
  }

  return errors;
}
