import styles from "./RecommendedResources.module.css";

interface Resource {
  label: string;
  href: string;
  type: "guide" | "tool" | "comparison";
}

/**
 * Maps calculator slugs to related guides and tools.
 * Keys must match the actual `slug` field in each CalculatorDef.
 * Add entries here as new guides are published.
 */
const RESOURCES: Record<string, Resource[]> = {
  // ── Compound Interest ────────────────────────────────────────────
  "compound-interest-calculator": [
    {
      label: "How to Calculate Compound Interest",
      href: "/guides/how-to-calculate-compound-interest",
      type: "guide",
    },
    {
      label: "Simple Interest Calculator",
      href: "/calculators/simple-interest-calculator",
      type: "tool",
    },
  ],

  // ── Simple Interest ──────────────────────────────────────────────
  "simple-interest-calculator": [
    {
      label: "How to Calculate Compound Interest",
      href: "/guides/how-to-calculate-compound-interest",
      type: "guide",
    },
    {
      label: "Compound Interest Calculator",
      href: "/calculators/compound-interest-calculator",
      type: "tool",
    },
  ],

  // ── BMI ──────────────────────────────────────────────────────────
  "bmi-calculator": [
    {
      label: "How to Calculate BMI",
      href: "/guides/how-to-calculate-bmi",
      type: "guide",
    },
    { label: "Calorie Calculator", href: "/calculators/calorie-calculator", type: "tool" },
    { label: "Water Intake Calculator", href: "/calculators/water-intake-calculator", type: "tool" },
  ],

  // ── Calorie ──────────────────────────────────────────────────────
  "calorie-calculator": [
    { label: "BMI Calculator", href: "/calculators/bmi-calculator", type: "tool" },
    { label: "Water Intake Calculator", href: "/calculators/water-intake-calculator", type: "tool" },
  ],

  // ── Mortgage ─────────────────────────────────────────────────────
  "mortgage-calculator": [
    {
      label: "Mortgage Refinance Strategies",
      href: "/guides/mortgage-refinance-strategies",
      type: "guide",
    },
    { label: "Loan Payment Calculator", href: "/calculators/loan-payment-calculator", type: "tool" },
    { label: "APR Calculator", href: "/calculators/apr-calculator", type: "tool" },
  ],

  // ── Loan Payment ─────────────────────────────────────────────────
  "loan-payment-calculator": [
    { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator", type: "tool" },
    { label: "APR Calculator", href: "/calculators/apr-calculator", type: "tool" },
  ],

  // ── Profit Margin ────────────────────────────────────────────────
  "profit-margin-calculator": [
    {
      label: "Profit Margin Optimization Guide",
      href: "/guides/profit-margin-optimization",
      type: "guide",
    },
    { label: "Markup Calculator", href: "/calculators/markup-calculator", type: "tool" },
    { label: "Break-Even Calculator", href: "/calculators/break-even-calculator", type: "tool" },
  ],

  // ── Debt Payoff ──────────────────────────────────────────────────
  "debt-payoff-calculator": [
    {
      label: "Debt Snowball vs. Avalanche Guide",
      href: "/guides/debt-snowball-vs-avalanche",
      type: "guide",
    },
    {
      label: "Debt Snowball vs. Avalanche: Full Comparison",
      href: "/compare/debt-snowball-vs-avalanche",
      type: "comparison",
    },
    {
      label: "Credit Card Payoff Calculator",
      href: "/calculators/credit-card-payoff",
      type: "tool",
    },
    {
      label: "Debt-to-Income Calculator",
      href: "/calculators/debt-to-income-calculator",
      type: "tool",
    },
  ],
};

interface Props {
  slug: string;
}

export default function RecommendedResources({ slug }: Props) {
  const resources = RESOURCES[slug];
  if (!resources || resources.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="resources-heading">
      <h2 className={styles.heading} id="resources-heading">
        Recommended Resources
      </h2>
      <ul className={styles.list}>
        {resources.map((r, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.typeLabel}>
              {r.type === "guide"
                ? "Guide"
                : r.type === "comparison"
                ? "Comparison"
                : "Related Tool"}
            </span>
            <a href={r.href} className={styles.link}>
              {r.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
