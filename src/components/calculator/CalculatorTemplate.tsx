import type { CalculatorDef, InputValues } from "@/lib/types";
import { getRelatedCalculators } from "@/calculators/index";
import CalculatorEngine from "./CalculatorEngine";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "./CalculatorTemplate.module.css";

interface Props {
  def: CalculatorDef;
  prefill?: InputValues;
}

export default function CalculatorTemplate({ def, prefill }: Props) {
  const related = getRelatedCalculators(def.relatedSlugs);

  return (
    <main className={styles.page}>
      {/* ... */}
      <CalculatorEngine slug={def.slug} prefill={prefill} />
      {/* ... */}
    </main>
  );
}

function mergePrefill(defaults: InputValues, prefill?: InputValues): InputValues {
  if (!prefill) return defaults;
  return { ...defaults, ...prefill };
}

export default function CalculatorEngine({ slug, prefill }: Props) {
  // Always compute def in a stable way
  const def = useMemo(() => getCalculatorBySlug(slug), [slug]);

  // Hooks must always run, even if def is missing
  const [values, setValues] = useState<InputValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [computeError, setComputeError] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<ComputeResult["outputs"]>([]);

  // Initialize or re-init whenever slug/prefill changes
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
    if (result.error) {
      setComputeError(result.error);
      setOutputs([]);
    } else {
      setOutputs(result.outputs);
    }
  }, [def, prefill]);

  // Render "not found" state without early returning before hooks
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