import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/calculators/index";
import CalculatorCard from "@/components/ui/CalculatorCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Better Calculators — Free Online Calculators for Finance, Health & Life",
  description:
    "Fast, accurate, free calculators. Mortgage, BMI, compound interest, tip, credit card payoff, calorie, and more — no signup required.",
  alternates: { canonical: "https://bettercalculators.net" },
};

// Slugs are sourced directly from each calculator's slug: field in the registry.
// Short-named files (mortgage, bmi, age, tip, calorie, percentage) use their
// filename as their slug with no "-calculator" suffix.
// Files imported as *Calculator use the full kebab name with "-calculator" suffix.
const featuredSlugs = [
  "mortgage",               // ./mortgage  → slug: "mortgage"
  "compound-growth-calculator", // ./compound-growth-calculator → confirmed slug
  "bmi",                    // ./bmi       → slug: "bmi"
  "calorie",                // ./calorie   → slug: "calorie"
  "percentage",             // ./percentage → slug: "percentage"
  "age",                    // ./age       → slug: "age"
  "days-between-dates-calculator", // ./days-between-dates-calculator → confirmed
  "tip",                    // ./tip       → slug: "tip"
];

const featuredCalcs = featuredSlugs.flatMap((slug) => {
  const c = calculators.find((x) => x.slug === slug);
  return c ? [c] : [];
});

const popularLinks: { label: string; slug: string }[] = [
  { label: "Age Calculator",        slug: "age" },
  { label: "Days Between Dates",    slug: "days-between-dates-calculator" },
  { label: "Percentage Calculator", slug: "percentage" },
  { label: "BMI Calculator",        slug: "bmi" },
  { label: "kg to lbs",             slug: "kg-to-lbs" },
  { label: "Salary to Hourly",      slug: "salary-to-hourly-calculator" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>✦ Free — No signup needed</p>
          <h1 className={styles.headline}>
            Better answers to<br />
            <span className={styles.accent}>everyday calculations</span>
          </h1>
          <p className={styles.subheadline}>
            100+ Fast, accurate, beautifully designed calculators for finance, health, and life. No data collected. Just answers.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/calculators" className={styles.primaryCta}>Browse all calculators</Link>
            <Link href="#featured" className={styles.secondaryCta}>See featured ↓</Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}><strong>100+</strong><span>Calculators</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>3</strong><span>Categories</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>100%</strong><span>Always Free</span></div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className={`container ${styles.section}`} id="featured">
        <div className={styles.sectionHeader}>
          <h2>Featured Calculators</h2>
          <Link href="/calculators" className={styles.seeAll}>View all →</Link>
        </div>
        <div className={styles.grid}>
          {featuredCalcs.map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2>Popular Calculators</h2>
        </div>
        <div className={styles.grid}>
          {popularLinks.map(({ slug }) => {
            const calc = calculators.find((x) => x.slug === slug);
            if (!calc) return null;
            return <CalculatorCard key={slug} calc={calc} />;
          })}
        </div>
      </section>

      {/* Categories */}
      <section className={`container ${styles.section}`}>
        <h2>Browse by Category</h2>
        <div className={styles.categories}>
          {[
            { slug: "finance", label: "Finance", icon: "💰", desc: "Mortgages, loans, interest, investments", count: calculators.filter((c) => c.category === "finance").length },
            { slug: "health", label: "Health", icon: "❤️", desc: "BMI, calories, hydration, wellness", count: calculators.filter((c) => c.category === "health").length },
            { slug: "life", label: "Life", icon: "✨", desc: "Percentages, tips, discounts, age", count: calculators.filter((c) => c.category === "life").length },
          ].map((cat) => (
            <Link key={cat.slug} href={`/calculators/${cat.slug}`} className={styles.categoryCard}>
              <span className={styles.catIcon}>{cat.icon}</span>
              <div>
                <p className={styles.catLabel}>{cat.label}</p>
                <p className={styles.catDesc}>{cat.desc}</p>
                <p className={styles.catCount}>{cat.count} calculators</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className={`container ${styles.section}`}>
        <div className={styles.trust}>
          <h2>Why Better Calculators?</h2>
          <div className={styles.trustGrid}>
            {[
              { icon: "⚡", title: "Instant results", desc: "No loading spinners. Results update as you type or on one click." },
              { icon: "🎯", title: "Accurate formulas", desc: "Every calculator uses the same formulas trusted by professionals." },
              { icon: "📱", title: "Works everywhere", desc: "Fully responsive and accessible on any device or screen size." },
              { icon: "🔒", title: "No data collected", desc: "Everything runs in your browser. We never store your numbers." },
            ].map((item) => (
              <div key={item.title} className={styles.trustItem}>
                <span className={styles.trustIcon}>{item.icon}</span>
                <div>
                  <p className={styles.trustTitle}>{item.title}</p>
                  <p className={styles.trustDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
