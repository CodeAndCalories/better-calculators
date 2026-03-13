import type { Metadata } from "next";
import guideStyles from "../guide.module.css";

const SITE_URL = "https://bettercalculators.net";

type GuideSection = {
  heading: string;
  body: string[];
  formula?: string;
};

type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  calculatorSlug: string;
  calculatorLabel: string;
  sections: GuideSection[];
};

const guides: Guide[] = [
  // ─────────────────────────────────────────────────────────────────
  // Compound Interest
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "how-to-calculate-compound-interest",
    title: "How to Calculate Compound Interest",
    description:
      "Understand the compound interest formula, how exponential growth works, and how to estimate investment growth over time.",
    keywords: [
      "compound interest",
      "compound interest formula",
      "investment growth",
      "interest calculator",
    ],
    calculatorSlug: "compound-interest-calculator",
    calculatorLabel: "Compound Interest Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Compound interest is the process of earning interest on both the initial principal and the interest accumulated from prior periods. Unlike simple interest, which only grows linearly, compound interest causes wealth to grow exponentially over time — making it one of the most powerful forces in personal finance.",
          "Understanding how compound interest works helps you make smarter decisions about savings accounts, investment portfolios, and the true cost of loans.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the compound interest calculator when you want to project the future value of a savings account or investment, compare the impact of different interest rates and compounding frequencies, calculate how long it takes to reach a specific financial goal, or understand the total interest cost of a loan over its lifetime.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "The standard compound interest formula is:",
          "Where A is the future value, P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years.",
          "Example: Depositing $5,000 at 6% annual rate compounded monthly for 10 years: A = 5,000 × (1 + 0.06/12)^(12×10) = $9,096.98.",
        ],
        formula: "A = P(1 + r/n)^(nt)",
      },
      {
        heading: "Practical Example",
        body: [
          "Sarah invests $10,000 in an index fund averaging 7% annual returns, compounded quarterly. After 20 years:",
          "A = 10,000 × (1 + 0.07/4)^(4×20) = $39,121.61",
          "Compounding turns her $10,000 into nearly $40,000 without a single additional contribution. Waiting just 5 more years would bring the total to approximately $55,000 — demonstrating why starting early matters so much.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Not adjusting for compounding frequency: The annual rate must be divided by n before applying the formula. An account compounding daily grows faster than one compounding annually at the same stated rate.",
          "Confusing nominal and effective rates: A 12% nominal rate compounded monthly has an effective annual rate of 12.68%. Always compare effective rates when evaluating financial products.",
          "Underestimating the time factor: A 1% rate increase compounded over 30 years can double the final value. Small differences compound into enormous outcomes.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter your principal, interest rate, compounding frequency, and time period to instantly see your projected balance and total interest earned. Adjust any variable to model different scenarios and find your optimal savings strategy.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Mortgage Refinance
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "mortgage-refinance-strategies",
    title: "Mortgage Refinance Strategies: When and How to Refinance",
    description:
      "Learn how mortgage refinancing works, when it makes financial sense, and how to calculate your break-even point before committing.",
    keywords: [
      "mortgage refinance",
      "refinancing strategies",
      "break-even refinance",
      "mortgage calculator",
    ],
    calculatorSlug: "mortgage-calculator",
    calculatorLabel: "Mortgage Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Refinancing your mortgage means replacing your existing home loan with a new one — typically to secure a lower interest rate, shorten the loan term, or access accumulated equity. Done strategically, refinancing can save tens of thousands of dollars in interest. Done without careful analysis, it can extend your debt and increase total costs.",
          "The key to a successful refinance is understanding the math behind monthly savings, closing costs, and break-even timelines.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the mortgage calculator when comparing your current loan terms against a refinance offer, estimating how a lower rate changes your monthly payment, calculating your break-even point based on closing costs, or deciding between a 15-year and 30-year refinance term.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "The standard monthly mortgage payment formula is:",
          "Where M is the monthly payment, P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments.",
          "To find your break-even point: divide total closing costs by your monthly payment savings. If closing costs are $4,500 and you save $224/month, break-even = 4,500 ÷ 224 = 20.1 months.",
        ],
        formula: "M = P × [r(1+r)^n] / [(1+r)^n − 1]",
      },
      {
        heading: "Practical Example",
        body: [
          "You have a $250,000 mortgage at 7.0% with 20 years remaining. A lender offers 5.5% on a new 20-year loan with $4,500 in closing costs.",
          "Current monthly payment: $1,938. New monthly payment: $1,714. Monthly savings: $224. Break-even: 20.1 months.",
          "If you plan to stay in the home for more than 21 months, refinancing makes financial sense. If you expect to move sooner, the upfront costs outweigh the interest savings.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Ignoring closing costs: Refinancing typically costs 2–5% of the loan amount. Always calculate the break-even point before deciding.",
          "Resetting to a 30-year term: Starting a new 30-year loan on a mortgage already 10 years paid can dramatically increase total interest — even at a lower rate.",
          "Not accounting for PMI removal: If refinancing pushes your equity above 20%, eliminating private mortgage insurance adds meaningful monthly savings to the equation.",
          "Chasing a tiny rate drop: A 0.25% rate reduction rarely justifies $5,000+ in closing costs unless you plan to stay in the home long-term.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter your current loan balance, interest rate, and remaining term, then input the refinance offer details. The calculator shows side-by-side monthly payments and total interest costs so you can make a data-driven decision.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Profit Margin
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "profit-margin-optimization",
    title: "Profit Margin Optimization: How to Calculate and Improve Your Margins",
    description:
      "Learn how to calculate gross, operating, and net profit margins and discover practical strategies for improving business profitability.",
    keywords: [
      "profit margin",
      "profit margin formula",
      "gross margin",
      "business profitability",
      "margin calculator",
    ],
    calculatorSlug: "profit-margin-calculator",
    calculatorLabel: "Profit Margin Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Profit margin is the percentage of revenue that remains after expenses. It is one of the most important metrics in business finance — revealing how efficiently a business converts sales into actual profit.",
          "Three margin types serve different analytical purposes: gross margin focuses on production costs, operating margin captures day-to-day business efficiency, and net margin reveals the bottom line after all obligations including taxes and interest.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the profit margin calculator when setting prices for new products or services, reviewing the profitability of individual product lines, preparing financial reports or investor presentations, or benchmarking your business margins against industry averages.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "The three core margin formulas are:",
          "Example: Revenue is $100,000 and cost of goods sold is $60,000 — gross margin is 40%. If operating expenses add another $20,000, operating margin drops to 20%. After taxes and interest, net margin might land at 14–16%.",
        ],
        formula:
          "Gross Margin    = (Revenue − COGS) / Revenue × 100\nOperating Margin = Operating Income / Revenue × 100\nNet Margin       = Net Income / Revenue × 100",
      },
      {
        heading: "Practical Example",
        body: [
          "A bakery generates $80,000 monthly revenue. Ingredients and labor cost $52,000. Fixed operating costs (rent, utilities, marketing) total $15,000.",
          "Gross margin: ($80,000 − $52,000) / $80,000 = 35%. Operating margin: ($80,000 − $67,000) / $80,000 = 16.25%.",
          "Negotiating ingredient costs down by just 5% ($2,600 monthly savings) improves gross margin to 38.25% — a significant gain that compounds as the business scales.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Confusing markup with margin: A 50% markup does not equal a 50% margin. Markup is calculated on cost; margin is calculated on revenue. A 50% markup produces only a 33.3% gross margin.",
          "Ignoring fixed cost allocation: Evaluating per-product margins without accounting for overhead can make unprofitable lines appear viable in isolation.",
          "Optimizing gross margin while neglecting operating expenses: A high gross margin business with uncontrolled fixed costs can still report a net loss.",
          "Benchmarking against the wrong sector: Acceptable margins vary widely — grocery retail targets 2–5% net margin while SaaS companies often target 20–40%.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter your revenue and cost figures to instantly calculate all three margin types. Adjust prices or costs to model operational changes and identify the most impactful levers for improving your bottom line.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Debt Snowball vs Avalanche
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "debt-snowball-vs-avalanche",
    title: "Debt Snowball vs. Avalanche: Which Payoff Strategy is Right for You?",
    description:
      "Compare the debt snowball and debt avalanche methods, understand the math behind each strategy, and choose the best approach for your situation.",
    keywords: [
      "debt snowball",
      "debt avalanche",
      "debt payoff strategy",
      "debt repayment",
      "debt calculator",
    ],
    calculatorSlug: "debt-payoff-calculator",
    calculatorLabel: "Debt Payoff Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "When carrying multiple debts — credit cards, student loans, personal loans — the order you pay them off has a real financial impact. Two evidence-backed strategies dominate personal finance: the debt snowball and the debt avalanche. Both work by concentrating extra payments on one debt at a time, but they differ in which debt is targeted first.",
          "Understanding both methods helps you choose the approach that fits your psychology and financial goals.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use a debt payoff calculator when you want to list all debts with their balances, interest rates, and minimum payments; compare exact payoff timelines between snowball and avalanche; calculate total interest paid under each strategy; or determine how much extra monthly payment is needed to hit a target payoff date.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "Both strategies require paying the minimum on all debts except your target, then directing all extra cash toward the target until it is eliminated. When one debt is gone, its freed payment is added to the next target — the 'snowball' or 'roll-over' effect.",
          "Avalanche: Target the highest interest rate first. Mathematically optimal — minimizes total interest paid across all debts.",
          "Snowball: Target the smallest balance first. Psychologically powerful — delivers quick wins that sustain motivation. Total interest cost is usually only marginally higher than the avalanche.",
        ],
        formula:
          "Avalanche → highest rate first (minimum total interest)\nSnowball  → smallest balance first (fastest early wins)",
      },
      {
        heading: "Practical Example",
        body: [
          "Three debts with $200/month extra available: Card A ($2,000 at 22% APR, $60 minimum), Card B ($5,000 at 18% APR, $100 minimum), Student Loan ($12,000 at 6% APR, $150 minimum).",
          "Avalanche order: Card A (highest rate at 22%), then Card B, then the student loan. Because Card A also happens to be the smallest balance, the snowball would target it first too — making both strategies identical in this case.",
          "Where they diverge: if Card A were low-rate and Card B were high-rate, the avalanche would jump to Card B first, saving meaningful interest — while the snowball would still start with the smaller Card A balance for the motivational win.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Forgetting minimums on non-target debts: Missing minimum payments incurs late fees and damages your credit score, negating the strategy's benefits.",
          "Not redirecting freed-up payments: After eliminating a debt, immediately roll its full monthly payment to the next target. Lifestyle inflation at this point eliminates most of the accelerated payoff benefit.",
          "Abandoning the strategy mid-way: The most effective method is the one you commit to. If the avalanche feels slow, the snowball's quick wins can rebuild discipline — choose accordingly.",
          "Ignoring 0% promotional APR opportunities: A balance transfer to a 0% card can reduce the interest cost of high-rate balances, complementing either strategy.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter all your debts, interest rates, minimum payments, and available extra monthly payment. The calculator models the exact payoff timeline and total interest cost — helping you choose and commit to a strategy.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // BMI
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI: Formula, Categories, and Limitations",
    description:
      "Learn how to calculate Body Mass Index using metric and imperial formulas, understand the WHO weight categories, and know the key limitations of BMI as a health metric.",
    keywords: [
      "how to calculate bmi",
      "bmi formula",
      "bmi categories",
      "body mass index",
      "bmi calculator",
    ],
    calculatorSlug: "bmi-calculator",
    calculatorLabel: "BMI Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Body Mass Index (BMI) is a numerical measure of body weight relative to height. Developed in the 19th century and adopted by the WHO as a population-level screening tool, it provides a quick, cost-free indicator of weight categories that may signal increased health risk.",
          "BMI is not a direct measure of body fat, and it has well-documented limitations for individuals. However, it remains a useful starting point for weight management discussions and personal health tracking.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the BMI calculator when tracking body composition changes over time, comparing your result against standard weight classification ranges, preparing for a healthcare appointment where weight-related health risk will be discussed, or setting specific weight management goals with clear numerical benchmarks.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "BMI is calculated differently depending on your unit system:",
          "Results are interpreted using WHO standard categories: Underweight (< 18.5), Normal weight (18.5–24.9), Overweight (25.0–29.9), and Obese (≥ 30.0).",
          "Metric example: A person weighing 75 kg at 1.75 m tall: BMI = 75 ÷ (1.75)² = 24.5 → Normal weight.",
        ],
        formula:
          "Metric:   BMI = weight (kg) ÷ height (m)²\nImperial: BMI = 703 × weight (lbs) ÷ height (in)²",
      },
      {
        heading: "Practical Example",
        body: [
          "Alex is 5 ft 10 in (70 inches) tall and weighs 195 lbs. Applying the imperial formula: BMI = 703 × 195 ÷ (70²) = 137,085 ÷ 4,900 = 27.98 → Overweight category.",
          "Alex's doctor considers this alongside waist circumference (38 inches), blood pressure (128/82), and activity level. BMI confirms a screening flag; the full clinical picture guides any recommendations.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Treating BMI as the sole health indicator: Athletes with high muscle mass frequently fall in the Overweight category despite excellent metabolic health. BMI is one data point among many.",
          "Not adjusting for age: Clinicians often use 25–27 as the overweight threshold for adults over 65, where slightly higher BMI may be associated with better survival outcomes.",
          "Comparing across ethnic groups without adjustment: Health risks associated with elevated BMI can occur at lower thresholds in some Asian populations, prompting alternate clinical cut-offs.",
          "Making dietary or medical decisions based on BMI alone: Always consult a licensed healthcare professional before beginning a weight management program.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter your height and weight in either metric or imperial units to instantly calculate your BMI and see your WHO weight category. Use the result as a starting point for a broader conversation about your health goals.",
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
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) return {};

  const url = `${SITE_URL}/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${guide.title} | Better Calculators`,
      description: guide.description,
      url,
      type: "article",
      siteName: "Better Calculators",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) return null;

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const calculatorUrl = `/calculators/${guide.calculatorSlug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className={guideStyles.page}>
        <div className={`container ${guideStyles.content}`}>
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className={guideStyles.breadcrumb}>
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <a href="/guides">Guides</a>
            <span aria-hidden="true">›</span>
            <span>{guide.title}</span>
          </nav>

          <h1>{guide.title}</h1>
          <p className={guideStyles.lead}>{guide.description}</p>

          {/* Back to Calculator — top */}
          <a href={calculatorUrl} className={guideStyles.backBtn}>
            ← Use the {guide.calculatorLabel}
          </a>

          {/* Article sections */}
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2>{section.heading}</h2>
              {section.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
              {section.formula && (
                <pre className={guideStyles.formula}>
                  <code>{section.formula}</code>
                </pre>
              )}
            </section>
          ))}

          <hr className={guideStyles.divider} />

          {/* Back to Calculator — bottom CTA */}
          <div className={guideStyles.calcCta}>
            <p>Ready to calculate? Try the {guide.calculatorLabel} now — free, instant, no sign-up required.</p>
            <a href={calculatorUrl} className={guideStyles.backBtn}>
              Open {guide.calculatorLabel} →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
