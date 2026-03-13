import styles from "./RecommendedResources.module.css";

interface Resource {
  label: string;
  href: string;
  type: "guide" | "tool" | "comparison";
}

/**
 * Maps calculator slugs to related guides, comparisons, and tools.
 * Keys must match the actual `slug` field in each CalculatorDef.
 * Add entries here as new guides or comparison pages are published.
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
    {
      label: "TDEE vs. BMR: Which Should You Use?",
      href: "/compare/tdee-vs-bmr",
      type: "comparison",
    },
    { label: "Calorie Calculator", href: "/calculators/calorie-calculator", type: "tool" },
    { label: "Water Intake Calculator", href: "/calculators/water-intake-calculator", type: "tool" },
  ],

  // ── Calorie ──────────────────────────────────────────────────────
  "calorie-calculator": [
    {
      label: "TDEE vs. BMR: Which Should You Use?",
      href: "/compare/tdee-vs-bmr",
      type: "comparison",
    },
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
    {
      label: "APR vs. Interest Rate: What's the Real Cost?",
      href: "/compare/apr-vs-interest-rate",
      type: "comparison",
    },
    { label: "Loan Payment Calculator", href: "/calculators/loan-payment-calculator", type: "tool" },
    { label: "APR Calculator", href: "/calculators/apr-calculator", type: "tool" },
  ],

  // ── Loan Payment ─────────────────────────────────────────────────
  "loan-payment-calculator": [
    {
      label: "APR vs. Interest Rate: What's the Real Cost?",
      href: "/compare/apr-vs-interest-rate",
      type: "comparison",
    },
    { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator", type: "tool" },
    { label: "APR Calculator", href: "/calculators/apr-calculator", type: "tool" },
  ],

  // ── APR ──────────────────────────────────────────────────────────
  "apr-calculator": [
    {
      label: "APR vs. Interest Rate: What's the Real Cost?",
      href: "/compare/apr-vs-interest-rate",
      type: "comparison",
    },
    { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator", type: "tool" },
    { label: "Loan Payment Calculator", href: "/calculators/loan-payment-calculator", type: "tool" },
  ],

  // ── Profit Margin ────────────────────────────────────────────────
  "profit-margin-calculator": [
    {
      label: "Profit Margin Optimization Guide",
      href: "/guides/profit-margin-optimization",
      type: "guide",
    },
    {
      label: "Gross Profit vs. Net Profit Explained",
      href: "/compare/gross-vs-net-profit",
      type: "comparison",
    },
    { label: "Markup Calculator", href: "/calculators/markup-calculator", type: "tool" },
    { label: "Break-Even Calculator", href: "/calculators/break-even-calculator", type: "tool" },
  ],

  // ── Net Income ───────────────────────────────────────────────────
  "net-income-calculator": [
    {
      label: "Gross Profit vs. Net Profit Explained",
      href: "/compare/gross-vs-net-profit",
      type: "comparison",
    },
    { label: "Profit Margin Calculator", href: "/calculators/profit-margin-calculator", type: "tool" },
  ],

  // ── Markup ───────────────────────────────────────────────────────
  "markup-calculator": [
    {
      label: "Markup vs. Margin: Why They're Not the Same",
      href: "/compare/markup-vs-margin",
      type: "comparison",
    },
    { label: "Margin Calculator", href: "/calculators/margin-calculator", type: "tool" },
    { label: "Profit Margin Calculator", href: "/calculators/profit-margin-calculator", type: "tool" },
  ],

  // ── Margin ───────────────────────────────────────────────────────
  "margin-calculator": [
    {
      label: "Markup vs. Margin: Why They're Not the Same",
      href: "/compare/markup-vs-margin",
      type: "comparison",
    },
    { label: "Markup Calculator", href: "/calculators/markup-calculator", type: "tool" },
    { label: "Profit Margin Calculator", href: "/calculators/profit-margin-calculator", type: "tool" },
  ],

  // ── Debt-to-Income ───────────────────────────────────────────────
  "debt-to-income-calculator": [
    {
      label: "Debt-to-Income Ratio Guide",
      href: "/guides/debt-to-income-ratio-guide",
      type: "guide",
    },
    { label: "Debt Payoff Calculator", href: "/calculators/debt-payoff-calculator", type: "tool" },
  ],

  // ── Dividend Yield ───────────────────────────────────────────────
  "dividend-yield-calculator": [
    {
      label: "Dividend Yield: Avoiding the Yield Trap",
      href: "/guides/dividend-yield-investing-guide",
      type: "guide",
    },
  ],

  // ── Emergency Fund ───────────────────────────────────────────────
  "emergency-fund-calculator": [
    {
      label: "Emergency Fund Strategy Guide",
      href: "/guides/emergency-fund-strategy",
      type: "guide",
    },
  ],

  // ── Decimal to Fraction ──────────────────────────────────────────
  "decimal-to-fraction-calculator": [
    {
      label: "How to Convert Decimals to Fractions",
      href: "/guides/decimal-to-fraction-guide",
      type: "guide",
    },
  ],

  // ── Down Payment ─────────────────────────────────────────────────
  "down-payment-calculator": [
    {
      label: "Down Payment Guide",
      href: "/guides/down-payment-guide",
      type: "guide",
    },
    { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator", type: "tool" },
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
