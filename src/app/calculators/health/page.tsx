import type { Metadata } from "next";
import { getCalculatorsByCategory } from "@/calculators/index";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "../category.module.css";

export const metadata: Metadata = {
  title: "Health Calculators — BMI, Calories, Water Intake & More",
  description: "Free health calculators: BMI, daily calorie needs (TDEE), water intake, and more wellness tools.",
  alternates: { canonical: "https://bettercalculators.net/calculators/health" },
};

export default function HealthPage() {
  const calcs = getCalculatorsByCategory("health");
  return (
    <main className={styles.page}>
      <div className={`container ${styles.header}`}>
        <span className="category-badge health">Health</span>
        <h1>Health Calculators</h1>
        <p className={styles.subtitle}>Evidence-based calculators for your health and wellness journey.</p>
      </div>
      <div className={`container ${styles.grid}`}>
        {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
      </div>
    </main>
  );
}
