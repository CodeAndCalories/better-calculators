"use client";
import { useState, useEffect, useCallback } from "react";
import type { InputValues, CalculatorDef } from "@/lib/types";
import { validateInputs } from "@/lib/validate";
import { getCalculatorBySlug } from "@/calculators/index";
import CalculatorInput from "./CalculatorInput";
import CalculatorOutput from "./CalculatorOutput";
import styles from "./CalculatorEngine.module.css";

interface Props {
  slug: string;
}

function getDefaultValues(def: CalculatorDef): InputValues {
  const vals: InputValues = {};
  for (const input of def.inputs) {
    if (input.defaultValue !== undefined) {
      vals[input.key] = input.defaultValue;
    } else if (input.type === "toggle") {
      vals[input.key] = false;
    } else if (input.type === "select") {
      vals[input.key] = input.options[0]?.value ?? "";
    } else {
      vals[input.key] = "";
    }
  }
  return vals;
}

export default function CalculatorEngine({ slug }: Props) {
  const def = getCalculatorBySlug(slug);
  const initialDef = def!; // guaranteed by page generating only valid slugs

  const [values, setValues] = useState<InputValues>(() => getDefaultValues(initialDef));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [computeError, setComputeError] = useState<string | null>(null);
  const [outputs, setOutputs] = useState(() => {
    const result = initialDef.compute(getDefaultValues(initialDef));
    return result.error ? [] : result.outputs;
  });

  const handleChange = useCallback((key: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleCalculate = useCallback(() => {
    const validationErrors = validateInputs(initialDef.inputs, values);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((e) => { errorMap[e.key] = e.message; });
      setErrors(errorMap);
      setOutputs([]);
      setComputeError(null);
      return;
    }
    const result = initialDef.compute(values);
    if (result.error) {
      setComputeError(result.error);
      setOutputs([]);
    } else {
      setComputeError(null);
      setOutputs(result.outputs);
    }
    setErrors({});
  }, [initialDef, values]);

  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    const defaults = getDefaultValues(initialDef);
    setValues(defaults);
    setErrors({});
    setComputeError(null);
    const result = initialDef.compute(defaults);
    setOutputs(result.error ? [] : result.outputs);
  };

  if (!def) return <div className={styles.computeError}>Calculator not found.</div>;

  return (
    <div className={styles.engine}>
      <div className={styles.inputPanel}>
        <div className={styles.inputGrid}>
          {def.inputs.map((input) => (
            <CalculatorInput
              key={input.key}
              schema={input}
              value={values[input.key]}
              onChange={handleChange}
              error={errors[input.key]}
            />
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.calcBtn} onClick={handleCalculate}>Calculate</button>
          <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className={styles.outputPanel}>
        {computeError && (
          <div className={styles.computeError} role="alert">
            <strong>Oops:</strong> {computeError}
          </div>
        )}
        {outputs.length > 0 && <CalculatorOutput outputs={outputs} />}
        {!computeError && outputs.length === 0 && (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🧮</span>
            <p>Enter your values and click Calculate</p>
          </div>
        )}
      </div>
    </div>
  );
}
