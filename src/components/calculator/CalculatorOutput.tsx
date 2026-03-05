import type { OutputField } from "@/lib/types";
import { formatOutput } from "@/lib/format";
import styles from "./CalculatorOutput.module.css";

interface Props {
  outputs: OutputField[];
}

export default function CalculatorOutput({ outputs }: Props) {
  if (!outputs.length) return null;

  const highlighted = outputs.filter((o) => o.highlight);
  const regular = outputs.filter((o) => !o.highlight);

  return (
    <div className={styles.results}>
      {highlighted.map((output) => (
        <div key={output.key} className={styles.primary}>
          <p className={styles.primaryLabel}>{output.label}</p>
          <p className={styles.primaryValue}>{formatOutput(output.value, output.format)}</p>
          {output.helpText && <p className={styles.helpText}>{output.helpText}</p>}
        </div>
      ))}

      {regular.length > 0 && (
        <div className={styles.secondary}>
          {regular.map((output) => (
            <div key={output.key} className={styles.row}>
              <span className={styles.rowLabel}>{output.label}</span>
              <span className={styles.rowValue}>{formatOutput(output.value, output.format)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
