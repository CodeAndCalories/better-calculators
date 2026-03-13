import type { Metadata } from "next";
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
  /** Optional CTA box prompt text. Defaults to a generic message. */
  ctaPrompt?: string;
  ctaLinks: CtaLink[];
  sections: ComparisonSection[];
};

// ─────────────────────────────────────────────────────────────────
// Comparison data
// ─────────────────────────────────────────────────────────────────

const comparisons: Comparison[] = [
  // ── Debt Snowball vs. Avalanche ────────────────────────────────
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
    ctaPrompt: "Ready to build your payoff plan? Try these free calculators:",
    ctaLinks: [
      { label: "Debt Payoff Calculator", href: "/calculators/debt-payoff-calculator" },
      { label: "Loan Payment Calculator", href: "/calculators/loan-payment-calculator" },
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
            { feature: "Primary Focus", left: "Smallest Balance", right: "Highest Interest Rate" },
            { feature: "Main Benefit", left: "Psychological Momentum", right: "Mathematical Interest Savings" },
            { feature: "Best For", left: "People who need motivation", right: "People focused on minimizing cost" },
            { feature: "Total Cost", left: "Usually higher", right: "Lowest possible" },
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

  // ── APR vs Interest Rate ───────────────────────────────────────
  {
    slug: "apr-vs-interest-rate",
    title: "APR vs. Interest Rate: What's the Real Cost of Your Loan?",
    description:
      "APR includes lender fees and represents the true borrowing cost, while the interest rate only reflects the base cost of the principal. Learn which number to compare when shopping for loans.",
    keywords: [
      "apr vs interest rate",
      "annual percentage rate",
      "what is apr",
      "true cost of borrowing",
      "apr explained",
    ],
    ctaPrompt: "Compare loans with confidence — use these free financial calculators:",
    ctaLinks: [
      { label: "APR Calculator", href: "/calculators/apr-calculator" },
      { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
    ],
    sections: [
      {
        heading: "Introduction",
        body: [
          "When shopping for a mortgage, auto loan, or personal loan, two numbers typically appear side by side: the interest rate and the APR (Annual Percentage Rate). Many borrowers focus only on the interest rate, but the APR tells a more complete — and more honest — story.",
          "Understanding the difference between APR and interest rate helps you compare loan offers accurately and avoid underestimating the true cost of borrowing.",
        ],
      },
      {
        heading: "The Key Difference",
        body: [
          "Interest Rate — The base cost of borrowing the principal. It directly determines your monthly payment amount, but does not reflect the full cost of the loan. Two loans with identical interest rates can have very different total costs.",
          "APR (Annual Percentage Rate) — Includes the interest rate plus lender fees, origination charges, mortgage points, and other required financing costs. Because APR captures the total cost expressed as a single annual percentage, it is the correct number to compare across lenders.",
        ],
      },
      {
        heading: "The Mathematical Breakdown",
        body: [
          "APR is calculated by adding all fees to the total interest paid, dividing by the principal, and annualizing the result:",
          "An interest rate tells you how much interest accrues each period. APR standardizes all costs into a single annual percentage, making it an apples-to-apples comparison tool across different lenders and loan structures.",
          "Example: A $200,000 30-year mortgage with a 5.0% interest rate and $4,000 in origination fees carries an APR of roughly 5.21%. That 0.21% gap represents tens of thousands of dollars over the loan's life — far more than most borrowers realize.",
        ],
        formula:
          "APR = ((Total Interest + Fees) / Principal) / Loan Term (days) × 365 × 100",
      },
      {
        heading: "Comparison Table",
        body: [],
        table: {
          leftLabel: "Interest Rate",
          rightLabel: "APR",
          rows: [
            { feature: "What It Includes", left: "Base borrowing cost only", right: "Interest + all lender fees" },
            { feature: "Best Used For", left: "Estimating monthly payments", right: "Comparing total loan cost" },
            { feature: "Legally Required", left: "No", right: "Yes — Truth in Lending Act" },
            { feature: "Relative Value", left: "Always lower", right: "Equal to or higher than rate" },
            { feature: "Shopping Tool?", left: "No", right: "Yes" },
          ],
        },
      },
      {
        heading: "Which Number Should You Use?",
        body: [
          "Use the interest rate to estimate your monthly payment. Use APR to compare the true total cost across competing loan offers.",
          "When two loans carry the same interest rate but different APRs, the loan with the lower APR has lower fees and is the better deal overall.",
          "Always request the APR upfront when speaking to any lender. Lenders are legally required to disclose it — if one is reluctant to share it, that is a warning sign.",
        ],
      },
    ],
  },

  // ── Gross vs Net Profit ────────────────────────────────────────
  {
    slug: "gross-vs-net-profit",
    title: "Gross Profit vs. Net Profit: Understanding Business Profitability",
    description:
      "Gross profit measures production efficiency while net profit measures overall business profitability. Learn which metric to use, when to use it, and how to calculate both.",
    keywords: [
      "gross profit vs net profit",
      "gross vs net income",
      "gross profit margin",
      "net profit margin",
      "business profitability metrics",
    ],
    ctaPrompt: "Calculate your business profitability with these free tools:",
    ctaLinks: [
      { label: "Profit Margin Calculator", href: "/calculators/profit-margin-calculator" },
      { label: "Net Income Calculator", href: "/calculators/net-income-calculator" },
    ],
    sections: [
      {
        heading: "Introduction",
        body: [
          "Two of the most important numbers in any business are gross profit and net profit. Both appear on the income statement, but they answer entirely different questions about financial performance.",
          "Gross profit tells you how efficiently a business produces and sells its goods. Net profit tells you whether the business is actually making money after every expense is accounted for.",
          "Understanding the distinction helps owners, investors, and analysts assess where profits are being lost — and where to focus improvement efforts.",
        ],
      },
      {
        heading: "The Key Difference",
        body: [
          "Gross Profit — Revenue minus the direct costs of producing goods or services (Cost of Goods Sold, or COGS). It measures production efficiency and pricing strength, but ignores operating expenses like rent, salaries, and marketing.",
          "Net Profit — Revenue minus all expenses: COGS, operating expenses, administrative costs, taxes, and interest. It is the true 'bottom line' — the money the business actually keeps.",
        ],
      },
      {
        heading: "The Mathematical Breakdown",
        body: [
          "The two formulas are straightforward but capture very different cost layers:",
          "A business can show a healthy gross profit while posting a net loss if operating expenses are too high. This is why analysts always examine both figures together to fully understand cost structure.",
          "Example: A company earns $500,000 in revenue with $200,000 in COGS. Gross profit = $300,000 (60% margin). If operating expenses, taxes, and interest total $280,000, net profit is only $20,000 — a 4% net margin. Both numbers reveal different layers of the same business.",
        ],
        formula:
          "Gross Profit = Revenue − Cost of Goods Sold (COGS)\nNet Profit   = Revenue − COGS − Operating Expenses − Taxes − Interest",
      },
      {
        heading: "Comparison Table",
        body: [],
        table: {
          leftLabel: "Gross Profit",
          rightLabel: "Net Profit",
          rows: [
            { feature: "Formula", left: "Revenue − COGS", right: "Revenue − All Expenses" },
            { feature: "What It Measures", left: "Production efficiency", right: "Overall profitability" },
            { feature: "Includes Operating Costs", left: "No", right: "Yes" },
            { feature: "Includes Taxes & Interest", left: "No", right: "Yes" },
            { feature: "Also Known As", left: "Gross Income", right: "Bottom Line / Net Income" },
            { feature: "Higher Value", left: "Yes — always higher", right: "No" },
          ],
        },
      },
      {
        heading: "Which Metric Should You Use?",
        body: [
          "Use gross profit to evaluate pricing strategy and the efficiency of your production or delivery process. A shrinking gross margin signals that costs of goods are rising faster than prices.",
          "Use net profit to answer the fundamental question: is the business actually making money? Net profit is what flows to owners and investors after every obligation is met.",
          "For a complete picture, track both metrics and their margins as percentages of revenue. Comparing gross margin to industry benchmarks reveals competitive position; comparing net margin over time reveals operational trend.",
        ],
      },
    ],
  },

  // ── Markup vs Margin ───────────────────────────────────────────
  {
    slug: "markup-vs-margin",
    title: "Markup vs. Margin: Why 50% Markup Is Not 50% Margin",
    description:
      "Markup and margin are not the same thing. A 50% markup equals only a 33.3% margin. Learn the formulas, the key difference, and which metric to use for pricing and profitability analysis.",
    keywords: [
      "markup vs margin",
      "markup vs profit margin",
      "difference between markup and margin",
      "markup formula",
      "margin formula",
    ],
    ctaPrompt: "Check your pricing and margin calculations with these free tools:",
    ctaLinks: [
      { label: "Markup Calculator", href: "/calculators/markup-calculator" },
      { label: "Margin Calculator", href: "/calculators/margin-calculator" },
    ],
    sections: [
      {
        heading: "Introduction",
        body: [
          "Markup and margin are two pricing metrics that are frequently used interchangeably — but they are not the same thing. Confusing them can lead to serious pricing errors, unexpected losses, and distorted profitability reports.",
          "The core distinction: markup is calculated relative to cost, while margin is calculated relative to selling price. Because they use different bases, the same product will always have a higher markup percentage than margin percentage.",
        ],
      },
      {
        heading: "The Key Difference",
        body: [
          "Markup — The percentage added on top of your cost to arrive at a selling price. A 50% markup on a $100 item means you sell it for $150.",
          "Margin (Profit Margin) — The percentage of the selling price that is profit. On that same $150 sale with a $100 cost, the margin is 33.3% — not 50%.",
          "This gap is not a rounding error. It is a structural difference that applies at every price point and must be understood to price products correctly.",
        ],
      },
      {
        heading: "The Mathematical Breakdown",
        body: [
          "The two formulas use the same inputs but different denominators:",
          "To convert between them directly:",
          "Example: A product costs $80. You apply a 25% markup, so the selling price is $100. The margin is ($100 − $80) / $100 = 20%. The markup is ($100 − $80) / $80 = 25%. Same product, same price — two different percentages.",
        ],
        formula:
          "Markup % = (Selling Price − Cost) / Cost × 100\nMargin % = (Selling Price − Cost) / Selling Price × 100\n\nConvert:  Margin  = Markup / (1 + Markup)\n          Markup  = Margin / (1 − Margin)",
      },
      {
        heading: "Comparison Table",
        body: [],
        table: {
          leftLabel: "Markup",
          rightLabel: "Margin",
          rows: [
            { feature: "Based On", left: "Cost", right: "Selling Price" },
            { feature: "Formula", left: "(Price − Cost) / Cost", right: "(Price − Cost) / Price" },
            { feature: "50% Example (Cost $100)", left: "Sell for $150", right: "Sell for $200" },
            { feature: "Value vs the Other", left: "Always higher %", right: "Always lower %" },
            { feature: "Best Used For", left: "Setting prices from cost", right: "Measuring profitability" },
            { feature: "Common In", left: "Retail & wholesale pricing", right: "Financial reporting" },
          ],
        },
      },
      {
        heading: "Which Should You Use?",
        body: [
          "Use markup when you start with a cost and need to calculate a selling price. It is the natural pricing direction: cost → price.",
          "Use margin when analyzing profitability or comparing performance to industry benchmarks. Most financial reports, investor conversations, and industry data use margin — so always convert if you track markup internally.",
          "The safest practice: define which metric your team uses, document the formula, and be explicit when sharing numbers with others to avoid costly misinterpretation.",
        ],
      },
    ],
  },

  // ── TDEE vs BMR ────────────────────────────────────────────────
  {
    slug: "tdee-vs-bmr",
    title: "TDEE vs. BMR: What's the Difference and Which Should You Use?",
    description:
      "BMR is the calories your body burns at complete rest. TDEE adds your activity level to give your true daily calorie needs. Learn which metric to use for weight loss, maintenance, or muscle gain.",
    keywords: [
      "tdee vs bmr",
      "total daily energy expenditure",
      "basal metabolic rate",
      "how many calories do I need",
      "daily calorie calculator",
    ],
    ctaPrompt: "Calculate your daily calorie needs with these free tools:",
    ctaLinks: [
      { label: "Calorie Calculator", href: "/calculators/calorie-calculator" },
      { label: "BMI Calculator", href: "/calculators/bmi-calculator" },
    ],
    sections: [
      {
        heading: "Introduction",
        body: [
          "Two numbers are central to any evidence-based nutrition or weight management plan: BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure). Though closely related, they measure different things — and using the wrong one leads to incorrect calorie targets.",
          "Understanding both helps you set realistic, accurate goals whether you want to lose weight, maintain your current body composition, or build muscle.",
        ],
      },
      {
        heading: "The Key Difference",
        body: [
          "BMR — The number of calories your body burns at complete rest, doing nothing but keeping vital organs functioning: heart, lungs, kidneys, brain. It represents your minimum energy requirement and accounts for roughly 60–75% of total daily calorie expenditure for most people.",
          "TDEE — BMR multiplied by an activity factor that reflects your lifestyle. TDEE is the total number of calories you actually burn in a day, accounting for all physical movement — from walking to the kitchen to intense exercise sessions.",
        ],
      },
      {
        heading: "The Mathematical Breakdown",
        body: [
          "BMR is commonly calculated using the Mifflin-St Jeor equation, the most validated formula for most adults:",
          "TDEE is then derived by multiplying BMR by an activity factor:",
          "Example: A 30-year-old woman, 165 cm, 65 kg has a BMR of approximately 1,441 calories. If she exercises 3–5 days per week (moderately active, ×1.55), her TDEE is roughly 2,234 calories per day — the number that should inform her diet.",
        ],
        formula:
          "BMR (Men)   = (10 × kg) + (6.25 × cm) − (5 × age) + 5\nBMR (Women) = (10 × kg) + (6.25 × cm) − (5 × age) − 161\n\nTDEE = BMR × Activity Multiplier\n  Sedentary        × 1.20\n  Lightly active   × 1.375\n  Moderately active× 1.55\n  Very active      × 1.725\n  Extra active     × 1.90",
      },
      {
        heading: "Comparison Table",
        body: [],
        table: {
          leftLabel: "BMR",
          rightLabel: "TDEE",
          rows: [
            { feature: "Measures", left: "Calories burned at rest", right: "Total daily calories burned" },
            { feature: "Includes Activity", left: "No", right: "Yes" },
            { feature: "Use For", left: "Baseline metabolic insight", right: "Setting daily calorie targets" },
            { feature: "Higher Value", left: "No — always lower", right: "Yes — always higher" },
            { feature: "Best For", left: "Understanding metabolism", right: "Diet and nutrition planning" },
            { feature: "Actionable Alone?", left: "Rarely", right: "Yes" },
          ],
        },
      },
      {
        heading: "Which Should You Use?",
        body: [
          "BMR alone is rarely actionable — almost nobody spends a full day at complete rest. It is useful as a metabolic baseline and for understanding how factors like age, weight, and height affect energy needs.",
          "TDEE is the number that should drive your daily calorie targets: eat below TDEE to lose weight, at TDEE to maintain, and above TDEE to build muscle mass. The accuracy of your TDEE depends heavily on choosing the right activity multiplier.",
          "Start by estimating conservatively. Most people overestimate their activity level. If you are losing weight faster or slower than expected after two weeks, adjust your TDEE estimate accordingly.",
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

  const ctaPrompt = comparison.ctaPrompt ?? "Try these free calculators:";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className={compareStyles.page}>
        <div className={`container ${compareStyles.content}`}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={compareStyles.breadcrumb}>
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <a href="/compare">Compare</a>
            <span aria-hidden="true">›</span>
            <span>{comparison.title}</span>
          </nav>

          <h1>{comparison.title}</h1>
          <p className={compareStyles.lead}>{comparison.description}</p>

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

          <hr className={compareStyles.divider} />

          {/* Try the Calculators CTA */}
          <div className={compareStyles.calcCta}>
            <p>{ctaPrompt}</p>
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
