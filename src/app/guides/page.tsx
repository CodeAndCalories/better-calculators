import type { Metadata } from "next";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Calculator Guides",
  description:
    "Learn how to use our calculators with step-by-step guides covering compound interest, BMI, mortgage refinancing, profit margins, and debt payoff strategies.",
  alternates: { canonical: "https://bettercalculators.net/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Calculator Guides | Better Calculators",
    description:
      "Step-by-step guides on compound interest, BMI, mortgage refinancing, profit margins, and debt payoff strategies.",
    url: "https://bettercalculators.net/guides",
    siteName: "Better Calculators",
    type: "website",
  },
};

const guides = [
  {
    slug: "how-to-calculate-compound-interest",
    title: "How to Calculate Compound Interest",
    description: "Understand the compound interest formula and how to estimate investment growth over time.",
    category: "Finance",
  },
  {
    slug: "mortgage-refinance-strategies",
    title: "Mortgage Refinance Strategies",
    description: "Learn when refinancing makes sense and how to calculate your break-even point.",
    category: "Finance",
  },
  {
    slug: "profit-margin-optimization",
    title: "Profit Margin Optimization",
    description: "Calculate gross, operating, and net margins and find strategies to improve business profitability.",
    category: "Finance",
  },
  {
    slug: "debt-snowball-vs-avalanche",
    title: "Debt Snowball vs. Avalanche",
    description: "Compare the two leading debt payoff strategies and choose the right one for your situation.",
    category: "Finance",
  },
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI",
    description: "Learn how body mass index is calculated, how to interpret the results, and its key limitations.",
    category: "Health",
  },
  {
    slug: "debt-to-income-ratio-guide",
    title: "How to Calculate Your Debt-to-Income Ratio (DTI)",
    description: "Learn how lenders use DTI to evaluate your borrowing power and how to calculate your own ratio.",
    category: "Finance",
  },
  {
    slug: "dividend-yield-investing-guide",
    title: "Understanding Dividend Yield",
    description: "Discover how to evaluate dividend stocks, calculate yields, and avoid common yield traps.",
    category: "Finance",
  },
  {
    slug: "emergency-fund-strategy",
    title: "How to Build an Emergency Fund",
    description: "Learn the tiered approach to building a cash safety net that protects you from debt.",
    category: "Finance",
  },
  {
    slug: "decimal-to-fraction-guide",
    title: "Decimal to Fraction Conversion Guide",
    description: "Master the step-by-step process of converting any decimal into its simplest fractional form.",
    category: "Conversions",
  },
  {
    slug: "down-payment-guide",
    title: "The Ultimate Down Payment Guide",
    description: "Debunking the 20% down payment myth and exploring low-down-payment options for buyers.",
    category: "Finance",
  }
];

export default function GuidesPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1>Calculator Guides</h1>
        <p className={styles.lead}>
          Step-by-step guides to help you understand the math behind our most
          popular calculators.
        </p>

        <ul className={styles.list}>
          {guides.map((g) => (
            <li key={g.slug} className={styles.item}>
              <span className={styles.category}>{g.category}</span>
              <div className={styles.itemBody}>
                <a href={`/guides/${g.slug}`} className={styles.title}>
                  {g.title}
                </a>
                <p className={styles.desc}>{g.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
