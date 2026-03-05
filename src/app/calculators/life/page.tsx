import type { Metadata } from "next";
import { getCalculatorsByCategory } from "@/calculators/index";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "../category.module.css";

export const metadata: Metadata = {
  title: "Life Calculators — Percentage, Discount, Tip, Age & More",
  description: "Free everyday calculators: percentage, discount price, tip and bill split, exact age, and more.",
  alternates: { canonical: "https://bettercalculators.net/calculators/life" },
};

export default function LifePage() {
  const calcs = getCalculatorsByCategory("life");
  return (
    <main className={styles.page}>
      <div className={`container ${styles.header}`}>
        <span className="category-badge life">Life</span>
        <h1>Life Calculators</h1>
        <p className={styles.subtitle}>Quick tools for everyday calculations — percentages, tips, discounts, and more.</p>
      </div>
      <div className={`container ${styles.grid}`}>
        {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
      </div>
    </main>
  );
}
