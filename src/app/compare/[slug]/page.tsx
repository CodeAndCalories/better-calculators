import type { Metadata } from "next";
import legalStyles from "../legal.module.css";
import compareStyles from "../compare.module.css";

const SITE_URL = "https://bettercalculators.net";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

type ComparisonRow = {
  feature: string;
  left: string;
  right: string;
};

type ComparisonTable = {
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
};

type ComparisonSection = {
  heading: string;
  body: string[];
  formula?: string;
  table?: ComparisonTable;
};

type CtaLink = {
  label: string;
  href: string;
};

type Comparison = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  ctaLinks: CtaLink[];
  sections: ComparisonSection[];
};

// ─────────────────────────────────────────────────────────────────
// Comparison data
// ─────────────────────────────────────────────────────────────────

const comparisons: Comparison[] = [
  {
    slug: "debt-snowball-vs-avalanche",
    title: "Debt Snowball vs. Debt Avalanche: Which Strategy Is Best for You?",
    description:
      "Compare the two most popular debt payoff methods. Learn the mathematical difference between the interest-saving Avalanche and the momentum-building Snowball.",
    keywords: [
      "debt snowball vs avalanche",
      "debt snowball",
      "debt avalanche",
      "debt payoff strategy",
      "debt repayment comparison",
    ],
    ctaLinks: [
      {
        label: "Debt Payoff Calculator",
        href: "/calculators/debt-payoff-calculator",
      },
      {
        label: "Loan Payment Calculator",
        href: "/calculators/loan-payment-calculator",
      },
    ],
    sections: [
      {
        heading: "Introduction",
        body: [
          "When paying off multiple debts, two popular strategies dominate personal finance advice: the Debt Snowball and the Debt Avalanche. Both methods organize your debts into a structured repayment plan, but they prioritize them differently.",
          "The Snowball focuses on motivation and quick wins by eliminating smaller balances first. The Avalanche focuses on minimizing the total interest you pay by targeting the highest interest rate first.",
          "Understanding the difference between these strategies can help you choose the repayment plan that best fits your financial habits and goals.",
        ],
      },
      {
        heading: "The Key Difference",
        body: [
          "Debt Snowball — You pay off your smallest balance first, regardless of interest rate. Once that balance is eliminated, you roll the freed payment into the next smallest debt.",
          "Debt Avalanche — You pay off the debt with the highest interest rate first, minimizing the total interest cost over time.",
        ],
      },
      {
        heading: "The Mathematical Breakdown",
        body: [
          "From a purely financial perspective, the Avalanche method is mathematically optimal because it minimizes total interest.",
          "We can approximate total interest using:",
          "By targeting the highest interest rate first, the Avalanche method reduces the largest cost driver in the formula.",
          "However, behavioral finance studies show that motivation plays a major role in long-term debt repayment success. This is where the Snowball method excels — faster early wins increase the likelihood of staying the course.",
        ],
        formula: "Total Interest = Σ (Balance × Interest Rate × Time)",
      },
      {
        heading: "Comparison Table",
        body: [],
        table: {
          leftLabel: "Debt Snowball",
          rightLabel: "Debt Avalanche",
          rows: [
            {
              feature: "Primary Focus",
              left: "Smallest Balance",
              right: "Highest Interest Rate",
            },
            {
              feature: "Main Benefit",
              left: "Psychological Momentum",
              right: "Mathematical Interest Savings",
            },
            {
              feature: "Best For",
              left: "People who need motivation",
              right: "People focused on minimizing cost",
            },
            {
              feature: "Total Cost",
              left: "Usually higher",
              right: "Lowest possible",
            },
          ],
        },
      },
      {
        heading: "Which Strategy Should You Choose?",
        body: [
          "If you struggle with motivation or feel overwhelmed by multiple debts, the Snowball method can provide quick psychological wins that keep you on track.",
          "If you are disciplined and want to minimize the amount of interest you pay over time, the Avalanche method is the more efficient strategy.",
          "Many people start with the Snowball to build momentum and transition to the Avalanche as they gain confidence in their repayment plan.",
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Next.js route handlers
// ─────────────────────────────────────────────────────────────────

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comparison = comparisons.find((c) => c.slug === params.slug);
  if (!comparison) return {};

  const url = `${SITE_URL}/compare/${comparison.slug}`;

  return {
    title: comparison.title,
    description: comparison.description,
    keywords: comparison.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${comparison.title} | Better Calculators`,
      description: comparison.description,
      url,
      type: "article",
      siteName: "Better Calculators",
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.title,
      description: comparison.description,
    },
  };
}

export default function ComparePage({ params }: Props) {
  const comparison = comparisons.find((c) => c.slug === params.slug);
  if (!comparison) return null;

  const url = `${SITE_URL}/compare/${comparison.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
      { "@type": "ListItem", position: 3, name: comparison.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className={legalStyles.page}>
        <div className={`container ${legalStyles.content}`}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={compareStyles.breadcrumb}>
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <a href="/compare">Compare</a>
            <span aria-hidden="true">›</span>
            <span>{comparison.title}</span>
          </nav>

          <h1>{comparison.title}</h1>
          <p className={legalStyles.lead}>{comparison.description}</p>

          {/* Article sections */}
          {comparison.sections.map((section, i) => (
            <section key={i}>
              <h2>{section.heading}</h2>

              {section.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}

              {section.formula && (
                <pre className={compareStyles.formula}>
                  <code>{section.formula}</code>
                </pre>
              )}

              {section.table && (
                <div className={compareStyles.tableWrapper}>
                  <table className={compareStyles.table}>
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>{section.table.leftLabel}</th>
                        <th>{section.table.rightLabel}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, k) => (
                        <tr key={k}>
                          <td>{row.feature}</td>
                          <td>{row.left}</td>
                          <td>{row.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          <hr className={legalStyles.divider} />

          {/* Try the Calculators CTA */}
          <div className={compareStyles.calcCta}>
            <p>Ready to build your payoff plan? Try these free calculators:</p>
            <div className={compareStyles.ctaGroup}>
              {comparison.ctaLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className={i === 0 ? compareStyles.btnPrimary : compareStyles.btnSecondary}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
