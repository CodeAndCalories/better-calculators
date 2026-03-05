import Link from "next/link";
import type { CalculatorDef } from "@/lib/types";
import styles from "./CalculatorCard.module.css";

interface Props {
  calc: CalculatorDef;
}

const categoryIcon: Record<string, string> = {
  finance: "💰",
  health: "❤️",
  life: "✨",
};

export default function CalculatorCard({ calc }: Props) {
  return (
    <Link href={`/calculators/${calc.slug}`} className={styles.card}>
      <div className={styles.top}>
        <span className={`category-badge ${calc.category}`}>{calc.category}</span>
        <span className={styles.icon}>{categoryIcon[calc.category]}</span>
      </div>
      <h3 className={styles.title}>{calc.shortTitle ?? calc.title}</h3>
      <p className={styles.description}>{calc.description}</p>
      <span className={styles.cta}>Calculate →</span>
    </Link>
  );
}
