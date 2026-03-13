import type { Metadata } from "next";
import { getCalculatorsByCategory } from "@/calculators/index";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "../category.module.css";

export const metadata: Metadata = {
  title: "Conversion Calculators — Units, Temperature, Time & More",
  description: "Free unit conversion calculators: length, temperature, time, weight, speed, and more. Instant results with no sign-up required.",
  alternates: { canonical: "https://bettercalculators.net/calculators/conversions" },
};

export default function ConversionsPage() {
  const calcs = getCalculatorsByCategory("conversions");
  return (
    <main className={styles.page}>
      <div className={`container ${styles.header}`}>
        <span className="category-badge conversions">Conversions</span>
        <h1>Conversion Calculators</h1>
        <p className={styles.subtitle}>Instantly convert between units of length, temperature, time, weight, and more.</p>
      </div>
      <div className={`container ${styles.grid}`}>
        {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
      </div>
    </main>
  );
}
