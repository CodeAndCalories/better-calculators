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
