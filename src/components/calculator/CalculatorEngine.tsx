"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { InputValues, CalculatorDef } from "@/lib/types";
import { validateInputs } from "@/lib/validate";
import { getCalculatorBySlug } from "@/calculators/index";
import CalculatorInput from "./CalculatorInput";
import CalculatorOutput from "./CalculatorOutput";
import styles from "./CalculatorEngine.module.css";

interface Props {
  slug: string;
  prefill?: InputValues;
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

function mergePrefill(defaults: InputValues, prefill?: InputValues): InputValues {
  if (!prefill) return defaults;
  return { ...defaults, ...prefill };
}

export default function CalculatorEngine({ slug, prefill }: Props) {
  const def = useMemo(() => getCalculatorBySlug(slug), [slug]);

  const [values, setValues] = useState<InputValues>(() => {
    if (!def) return {};
    return mergePrefill(getDefaultValues(def), prefill);
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [computeError, setComputeError] = useState<string | null>(null);
 const [outputs, setOutputs] = useState<ReturnType<CalculatorDef["compute"]>["outputs"]>([]);

  useEffect(() => {
    if (!def) return;
    const defaults = mergePrefill(getDefaultValues(def), prefill);
    setValues(defaults);
    setErrors({});
    setComputeError(null);
    const result = def.compute(defaults);
    if (result.error) {
      setComputeError(result.error);
      setOutputs([]);
    } else {
      setOutputs(result.outputs);
    }
  }, [def, prefill]);

  const handleChange = useCallback((key: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleCalculate = useCallback(() => {
    if (!def) return;
    const validationErrors = validateInputs(def.inputs, values);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((e) => {
        errorMap[e.key] = e.message;
      });
      setErrors(errorMap);
      setOutputs([]);
      setComputeError(null);
      return;
    }

    const result = def.compute(values);
    if (result.error) {
      setComputeError(result.error);
      setOutputs([]);
    } else {
      setComputeError(null);
      setOutputs(result.outputs);
    }
    setErrors({});
  }, [def, values]);

  const handleReset = useCallback(() => {
    if (!def) return;
    const defaults = mergePrefill(getDefaultValues(def), prefill);
    setValues(defaults);
    setErrors({});
    setComputeError(null);
    const result = def.compute(defaults);
    setOutputs(result.error ? [] : result.outputs);
  }, [def, prefill]);

  if (!def) {
    return <div className={styles.computeError}>Calculator not found.</div>;
  }

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
          <button className={styles.calcBtn} onClick={handleCalculate}>
            Calculate
          </button>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
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