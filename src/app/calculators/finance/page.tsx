import type { Metadata } from "next";
import { getCalculatorsByCategory } from "@/calculators/index";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "../category.module.css";

export const metadata: Metadata = {
  title: "Finance Calculators — Mortgage, Loan, Interest & More",
  description: "Free finance calculators: mortgage payments, loan amortization, compound interest, credit card payoff, and more.",
  alternates: { canonical: "https://bettercalculators.net/calculators/finance" },
};

export default function FinancePage() {
  const calcs = getCalculatorsByCategory("finance");
  return (
    <main className={styles.page}>
      <div className={`container ${styles.header}`}>
        <span className="category-badge finance">Finance</span>
        <h1>Finance Calculators</h1>
        <p className={styles.subtitle}>Tools to help you make better decisions with your money — from mortgage payments to investment growth.</p>
      </div>
      <div className={`container ${styles.grid}`}>
        {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
      </div>
    </main>
  );
}
