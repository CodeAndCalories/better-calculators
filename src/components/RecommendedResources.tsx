import styles from "./RecommendedResources.module.css";

interface Resource {
  label: string;
  href: string;
  type: "guide" | "tool";
}

/**
 * Maps calculator slugs to related guides and tools.
 * Add entries here as new guides are published.
 */
const RESOURCES: Record<string, Resource[]> = {
  "compound-interest": [
    {
      label: "How to Calculate Compound Interest",
      href: "/guides/how-to-calculate-compound-interest",
      type: "guide",
    },
    { label: "Simple Interest Calculator", href: "/calculators/simple-interest", type: "tool" },
  ],
  "simple-interest": [
    {
      label: "How to Calculate Compound Interest",
      href: "/guides/how-to-calculate-compound-interest",
      type: "guide",
    },
    { label: "Compound Interest Calculator", href: "/calculators/compound-interest", type: "tool" },
  ],
  bmi: [
    {
      label: "How to Calculate BMI",
      href: "/guides/how-to-calculate-bmi",
      type: "guide",
    },
    { label: "Calorie Calculator", href: "/calculators/calorie", type: "tool" },
    { label: "Water Intake Calculator", href: "/calculators/water-intake", type: "tool" },
  ],
  calorie: [
    { label: "BMI Calculator", href: "/calculators/bmi", type: "tool" },
    { label: "Water Intake Calculator", href: "/calculators/water-intake", type: "tool" },
  ],
  mortgage: [
    { label: "Loan Payment Calculator", href: "/calculators/loan-payment", type: "tool" },
    { label: "APR Calculator", href: "/calculators/apr-calculator", type: "tool" },
  ],
  "loan-payment": [
    { label: "Mortgage Calculator", href: "/calculators/mortgage", type: "tool" },
    { label: "APR Calculator", href: "/calculators/apr-calculator", type: "tool" },
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
              {r.type === "guide" ? "Guide" : "Related Tool"}
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
