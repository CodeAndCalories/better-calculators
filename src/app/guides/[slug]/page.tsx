import type { Metadata } from "next";
import guideStyles from "../guide.module.css";

const SITE_URL = "https://bettercalculators.net";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

type GuideSection = {
  heading: string;
  body: string[];
  formula?: string;
};

/**
 * Optional contextual cross-link displayed after the top CTA.
 * Renders as: "{text} <a href={href}>{label}</a>{suffix}"
 */
type RelatedContent = {
  text: string;
  label: string;
  href: string;
  suffix?: string;
};

type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  calculatorSlug: string;
  calculatorLabel: string;
  /** When set, a contextual cross-link note appears below the top CTA. */
  relatedContent?: RelatedContent;
  sections: GuideSection[];
};

// ─────────────────────────────────────────────────────────────────
// Guide data
// ─────────────────────────────────────────────────────────────────

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

  // ─────────────────────────────────────────────────────────────────
  // Debt-to-Income Ratio
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "debt-to-income-ratio-guide",
    title: "Debt-to-Income Ratio: What It Is and How to Improve It",
    description:
      "Your debt-to-income ratio shows lenders how much of your gross monthly income is already committed to debt payments. Learn the 43% Rule, how to calculate DTI, and strategies to lower it.",
    keywords: [
      "debt to income ratio",
      "dti ratio",
      "dti calculator",
      "mortgage qualification",
      "debt ratio",
    ],
    calculatorSlug: "debt-to-income-calculator",
    calculatorLabel: "Debt-to-Income Calculator",
    relatedContent: {
      text: "If your DTI reveals a high debt load, see our",
      label: "Debt Snowball vs. Avalanche guide",
      href: "/guides/debt-snowball-vs-avalanche",
      suffix: " for a structured repayment plan.",
    },
    sections: [
      {
        heading: "Introduction",
        body: [
          "Your debt-to-income (DTI) ratio is one of the first numbers mortgage lenders, auto lenders, and credit card issuers examine when reviewing your application. It measures how much of your gross monthly income is already spoken for by debt obligations — and it directly influences whether you qualify for new credit and at what interest rate.",
          "A high DTI signals financial strain; a low DTI signals room to absorb additional debt. Understanding yours gives you a realistic picture of your borrowing power before you ever talk to a lender.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the debt-to-income calculator before applying for a mortgage, car loan, or personal loan to estimate how lenders will evaluate your application; after taking on new debt to understand how it shifts your financial standing; when developing a debt payoff plan to track progress toward a healthier ratio; or when comparing the impact of paying off specific debts.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "DTI is expressed as the percentage of your gross monthly income (before taxes) consumed by recurring debt payments:",
          "Example: If your gross monthly income is $6,000 and your monthly debt payments total $2,100 (rent $1,200, car payment $450, student loan $300, credit card minimums $150), your DTI is 2,100 ÷ 6,000 = 35%.",
          "The Mortgage Underwriting 43% Rule: Qualified mortgage standards generally require a maximum back-end DTI of 43%. Many conventional lenders prefer 36% or below. FHA loans may accept higher DTI ratios — sometimes up to 57% with compensating factors — but at higher rates and stricter terms.",
          "Front-end vs. Back-end DTI: Mortgage lenders calculate both. Front-end DTI counts only housing costs (mortgage principal, interest, taxes, and insurance). Back-end DTI includes all debt payments. Lenders typically want front-end below 28% and back-end below 43%.",
        ],
        formula: "DTI = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100",
      },
      {
        heading: "Practical Example",
        body: [
          "Maria earns $7,500/month gross. Her recurring debts: mortgage $1,800, car loan $380, student loan $290, credit card minimums $130. Total: $2,600.",
          "DTI = 2,600 ÷ 7,500 = 34.7%. This is below the 36% preferred threshold, meaning Maria is well-positioned for new credit at competitive rates.",
          "If Maria added a $400/month car payment for a second vehicle, her DTI would rise to 40% — still within the 43% qualified mortgage limit, but approaching the risk threshold that could raise her interest rate.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Using net income instead of gross: DTI always uses pre-tax income. Using take-home pay will dramatically overstate your ratio.",
          "Forgetting all debt obligations: Include minimum credit card payments, student loans, auto loans, personal loans, child support, and alimony. Omitting any of these understates your DTI.",
          "Ignoring the ratio when shopping for a home: Running DTI analysis after falling in love with a specific house leads to emotional decision-making. Calculate your maximum mortgage payment first, then shop accordingly.",
          "Confusing balance reduction with payment elimination: Reducing a credit card balance from $5,000 to $4,000 doesn't change DTI — only paying off the card entirely (eliminating the minimum payment) does.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter your gross monthly income and list all recurring monthly debt payments. The calculator instantly shows your front-end and back-end DTI ratios and flags whether they meet common lender thresholds for mortgage qualification.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Dividend Yield
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "dividend-yield-investing-guide",
    title: "Dividend Yield: How to Evaluate Dividend Income and Avoid the Yield Trap",
    description:
      "Dividend yield measures the annual dividend payment as a percentage of a stock's price. Learn how to calculate it, evaluate it in context, and recognize the yield trap that catches income investors.",
    keywords: [
      "dividend yield",
      "dividend yield calculator",
      "yield trap",
      "dividend investing",
      "dividend income",
    ],
    calculatorSlug: "dividend-yield-calculator",
    calculatorLabel: "Dividend Yield Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Dividend yield is one of the most commonly cited metrics in income investing. It tells you how much annual income you can expect from a stock's dividend relative to its current price — expressed as a percentage.",
          "At first glance, a higher yield appears more attractive. But dividend yield alone can be deeply misleading. Understanding what drives changes in yield — and recognizing the yield trap — is essential before making any dividend investment decision.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the dividend yield calculator to compare dividend income across multiple stocks or ETFs; evaluate whether a dividend stock's yield is competitive with bonds or other income instruments; estimate the annual income your portfolio would generate at a given yield; or calculate the yield on your cost basis for stocks you already own.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "Dividend yield is calculated using:",
          "Example: A stock pays an annual dividend of $3.00 per share and trades at $60. Dividend yield = (3.00 ÷ 60) × 100 = 5.0%.",
          "Why yield can rise without any dividend increase: Yield and stock price move inversely. If the same stock drops to $40 while the dividend stays at $3.00, the yield jumps to 7.5% — not because the company is paying more, but because the price fell.",
          "The Yield Trap: A sharply rising dividend yield is sometimes a warning signal rather than an opportunity. When a stock price falls rapidly because the market anticipates a dividend cut, declining earnings, or financial distress, the yield appears unusually high. Investors attracted by the apparent income may be buying into a deteriorating business. Always investigate the reason for an elevated yield before purchasing.",
        ],
        formula: "Dividend Yield = (Annual Dividend Per Share ÷ Stock Price) × 100",
      },
      {
        heading: "Practical Example",
        body: [
          "Company A has paid a stable $2.40 annual dividend for five years. The stock currently trades at $48, giving a yield of 5.0%. Earnings per share are $4.20, and the payout ratio is 57% — a comfortable level that suggests the dividend is well-supported.",
          "Company B also yields 5.0% — but one year ago it yielded 2.5%, and the stock has dropped 50% as the market priced in a likely dividend cut. The yield is high because the price crashed, not because the company is thriving. This is the yield trap in practice.",
          "The key comparison: always check the payout ratio (dividends ÷ earnings) alongside yield. A payout ratio above 80–90% leaves little buffer and may signal an unsustainable dividend.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Chasing yield without examining the payout ratio: A 9% yield from a company paying out 120% of earnings is a dividend cut waiting to happen.",
          "Using trailing yield when dividends have already been cut: Once a dividend is reduced, historical data overstates the current yield. Always verify the most recently declared dividend.",
          "Ignoring total return: A high-yield stock that declines 15% in price has delivered a negative total return despite the income. Price appreciation and yield must both factor into the investment thesis.",
          "Not adjusting for sector norms: A 2% yield is impressive for a technology company; it is below average for a utility or REIT. Always compare yield within the same sector context.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter the annual dividend per share and the current stock price to instantly calculate dividend yield. Use the result alongside the payout ratio and earnings history to form a complete picture of dividend sustainability.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Emergency Fund
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "emergency-fund-strategy",
    title: "Emergency Fund Strategy: How Much to Save and Where to Keep It",
    description:
      "An emergency fund protects your financial plan from unexpected shocks. Learn the tiered savings approach, how to calculate your target, and where to keep your emergency reserves.",
    keywords: [
      "emergency fund",
      "emergency savings",
      "emergency fund calculator",
      "how much emergency fund",
      "financial safety net",
    ],
    calculatorSlug: "emergency-fund-calculator",
    calculatorLabel: "Emergency Fund Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "An emergency fund is a dedicated cash reserve set aside exclusively for genuine financial emergencies: job loss, major medical expenses, urgent home repairs, or large unexpected costs. Without one, any financial disruption forces you to take on high-interest debt — credit cards, personal loans — at the worst possible moment.",
          "The emergency fund is often called the foundation of personal finance because every other financial goal — investing, debt payoff, saving for a home — becomes fragile without it.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the emergency fund calculator to determine your savings target based on monthly essential expenses; set a timeline for reaching each tier of your emergency fund goal; compare how different savings rates affect your time-to-fully-funded; or recalculate your target after major life changes such as a new mortgage, new dependents, or a change in income.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "The core formula calculates your target based on essential monthly expenses — not total spending:",
          "Essential expenses include: rent or mortgage, utilities, groceries, insurance premiums, minimum debt payments, and essential transportation costs. Discretionary spending — dining out, subscriptions, entertainment — is excluded because these can be paused during a genuine emergency.",
          "The Tiered Savings Approach makes the goal achievable in stages:",
          "Tier 1 — Starter Fund: $1,000 to $2,000. Handles the most common unexpected expenses (car repair, medical co-pay, appliance replacement) and prevents credit card reliance.",
          "Tier 2 — Intermediate Goal: 3 months of essential expenses. Covers a period of job search or unexpected income interruption without financial crisis.",
          "Tier 3 — Full Security: 6 months of essential expenses. The recommended target for most households. Self-employed individuals, single-income households, and those in volatile industries may benefit from 9–12 months.",
        ],
        formula: "Emergency Fund Target = Monthly Essential Expenses × Months of Coverage",
      },
      {
        heading: "Practical Example",
        body: [
          "James's monthly essential expenses: rent $1,300, utilities $180, groceries $350, insurance $200, car payment $280, minimum loan payment $150. Total: $2,460/month.",
          "Tier 1 target: $2,000 (immediate priority). Tier 2 target: $2,460 × 3 = $7,380. Tier 3 target: $2,460 × 6 = $14,760.",
          "Saving $300/month: Tier 1 in ~7 months, Tier 3 in ~49 months. Saving $500/month: Tier 3 fully funded in under 30 months.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Counting investment accounts as your emergency fund: A brokerage account can drop 30% right when you need it most, and withdrawals may trigger taxes and penalties. Emergency funds must be in liquid, stable accounts.",
          "Using a standard checking account: While accessible, a standard checking account earns little or no interest. Use a high-yield savings account (HYSA) to earn 4–5% APY without sacrificing liquidity.",
          "Raiding the fund for non-emergencies: An emergency fund is not a vacation fund or opportunity fund. Define 'emergency' clearly before you need to make a decision under stress.",
          "Not rebuilding after a withdrawal: After using emergency funds, immediately redirect savings toward replenishing the account before resuming other financial goals.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter your monthly essential expenses and your target coverage period (3, 6, or 12 months) to instantly see your savings target at each tier. Adjust your monthly savings amount to model your timeline to fully funded.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Decimal to Fraction
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "decimal-to-fraction-guide",
    title: "How to Convert Decimals to Fractions: The Place Value Method",
    description:
      "Learn the step-by-step place value method for converting any decimal to a fraction, how to simplify using the greatest common divisor, and how to handle repeating decimals.",
    keywords: [
      "decimal to fraction",
      "convert decimal to fraction",
      "place value method",
      "simplify fractions",
      "repeating decimals",
    ],
    calculatorSlug: "decimal-to-fraction-calculator",
    calculatorLabel: "Decimal to Fraction Calculator",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Converting decimals to fractions is a fundamental math skill used in cooking recipes, engineering measurements, carpentry, and academic work. A decimal like 0.75 is mathematically identical to the fraction 3/4 — but fractions are often more useful when working with ratios, proportions, or precise physical measurements.",
          "The conversion process follows a consistent method based on the decimal's place value, and simplification uses the greatest common divisor (GCD) to express the result in its lowest terms.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the decimal to fraction calculator when you need to convert measurement decimals for construction or crafting (e.g., 0.625 inches to 5/8\"); simplify calculated decimal results into readable fractions for reports or presentations; verify manual conversions; or handle repeating decimals that are difficult to convert by hand.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "The Place Value Method for terminating decimals works in three steps:",
          "Step 1 — Write the decimal over 1 as a fraction.",
          "Step 2 — Multiply numerator and denominator by 10 for each digit after the decimal point, removing the decimal from the numerator.",
          "Step 3 — Simplify by dividing both numerator and denominator by their greatest common divisor (GCD).",
          "Example: 0.75 → 75/100. GCD(75, 100) = 25. Simplified: 75÷25 / 100÷25 = 3/4.",
          "For Repeating Decimals — use algebraic substitution: Let x = 0.333... Then 10x = 3.333... Subtract: 9x = 3 → x = 3/9 = 1/3.",
        ],
        formula:
          "0.75  → 75/100  → GCD(75,100)=25   → 3/4\n0.625 → 625/1000 → GCD(625,1000)=125 → 5/8\n0.333... → let x=0.333..., 9x=3           → 1/3",
      },
      {
        heading: "Practical Example",
        body: [
          "You are reading a blueprint showing a measurement of 0.3125 inches and need the nearest standard fraction: 0.3125 = 3125/10000. GCD(3125, 10000) = 625. Result: 3125÷625 / 10000÷625 = 5/16.",
          "5/16\" is a standard drill bit size — so the measurement corresponds exactly to a 5/16-inch drill bit. Converting the decimal allowed you to select the right tool from a standard set.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Not simplifying the fraction: 75/100 is mathematically correct, but 3/4 is the expected simplified form. Always reduce to lowest terms by dividing by the GCD.",
          "Miscounting decimal places: 0.5 has one decimal place (denominator: 10), 0.05 has two (denominator: 100), 0.005 has three (denominator: 1,000). Each additional decimal place multiplies the denominator by 10.",
          "Treating repeating decimals as terminating: 0.333 is not exactly 1/3 — only 0.333... (infinitely repeating) equals 1/3. A truncated decimal produces only an approximation.",
          "Confusing improper fractions and mixed numbers: 1.75 as an improper fraction is 7/4; as a mixed number it is 1¾. Clarify which form is required for your context.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter any decimal — terminating or repeating — and the calculator instantly returns the simplified fraction in both improper fraction and mixed number form. Use it to verify manual calculations or convert complex decimals quickly.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Down Payment
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "down-payment-guide",
    title: "Down Payment Guide: How Much Do You Really Need to Buy a Home?",
    description:
      "The 20% down payment myth holds many buyers back unnecessarily. Learn actual requirements for FHA, conventional, and VA loans, how to calculate your savings target, and the real trade-offs.",
    keywords: [
      "down payment",
      "down payment calculator",
      "how much down payment",
      "fha loan down payment",
      "first time home buyer",
    ],
    calculatorSlug: "down-payment-calculator",
    calculatorLabel: "Down Payment Calculator",
    relatedContent: {
      text: "After purchasing, optimizing your mortgage terms is the natural next step — see our",
      label: "Mortgage Refinance Strategies guide",
      href: "/guides/mortgage-refinance-strategies",
      suffix: ".",
    },
    sections: [
      {
        heading: "Introduction",
        body: [
          "The 20% down payment is one of the most persistent myths in home buying. While 20% down has real advantages — eliminating private mortgage insurance and producing a lower monthly payment — it is not a requirement for most loan programs, and waiting until you have it may not make financial sense.",
          "Modern home loan programs allow buyers to purchase with as little as 3% down, and in some cases 0% for eligible veterans and USDA rural program participants. Understanding what down payment you actually need — and the real trade-offs of different amounts — helps you make a data-driven decision.",
        ],
      },
      {
        heading: "When to Use This Calculator",
        body: [
          "Use the down payment calculator to determine how much cash you need at closing for a target home price and down payment percentage; compare your monthly payment across different down payment scenarios; calculate how long it will take to save a target amount at a given monthly savings rate; or model the break-even point between paying PMI now versus waiting to save 20%.",
        ],
      },
      {
        heading: "How the Math Works",
        body: [
          "The core calculation is straightforward:",
          "Common loan program minimums for 2024–2025:",
          "FHA Loans: 3.5% down for borrowers with a credit score of 580 or higher; 10% for scores 500–579. Requires a mortgage insurance premium (MIP) for the life of the loan if less than 10% down.",
          "Conventional Loans: As low as 3% down for first-time buyers meeting income limits. Requires private mortgage insurance (PMI) until the loan-to-value ratio reaches 80%. PMI is cancellable unlike FHA MIP.",
          "VA Loans: 0% down for eligible veterans, active-duty service members, and surviving spouses. No PMI requirement. A VA funding fee (1.25–3.3%) applies and can be rolled into the loan.",
          "USDA Loans: 0% down for eligible rural and suburban properties meeting income limits. Requires an upfront guarantee fee and annual fee.",
          "Important: Down payment is only part of your closing costs. Budget an additional 2–5% of the purchase price for origination fees, appraisal, title insurance, and escrow.",
        ],
        formula:
          "Down Payment = Home Price × Down Payment %\n\nExamples on a $350,000 home:\n  3.0%  → $10,500   (Conventional minimum)\n  3.5%  → $12,250   (FHA minimum)\n  10.0% → $35,000\n  20.0% → $70,000   (PMI-free threshold)",
      },
      {
        heading: "Practical Example",
        body: [
          "Priya is buying a $320,000 home and has $18,000 saved. With an FHA loan at 3.5% down ($11,200), she can proceed today — but with only $6,800 remaining she needs to ensure she has enough for closing costs ($6,400–$16,000). It is tight and may require seller concessions.",
          "With a conventional loan at 5% down ($16,000), she has $2,000 left after the down payment — insufficient for closing costs without additional assistance.",
          "At 10% down ($32,000), she is $14,000 short. Saving $1,200/month, she reaches this target in about 12 months. During that time, home prices may rise — but so does her down payment buffer. The calculator helps model whether saving longer makes financial sense given current market conditions.",
        ],
      },
      {
        heading: "Common Mistakes",
        body: [
          "Treating 20% as a universal requirement: Millions of buyers purchase homes every year with less than 20% down. The trade-off is PMI — roughly 0.5–1.5% of the loan amount annually — but for many buyers the math still favors buying sooner.",
          "Not budgeting for closing costs: A buyer focused entirely on the down payment may arrive at closing short on funds. Always add 2–5% of the purchase price to your target savings figure.",
          "Draining the emergency fund for a larger down payment: Entering homeownership with no liquidity is risky. Major repairs can arise immediately after purchase. Maintain 3–6 months of expenses even if it means a smaller down payment.",
          "Ignoring the opportunity cost of the 20% wait: In an appreciating market, the home price increase during extra years of saving may significantly exceed the total PMI cost you were trying to avoid.",
        ],
      },
      {
        heading: "Use the Calculator",
        body: [
          "Enter the home purchase price and your target down payment percentage to instantly calculate the required amount, estimated PMI threshold, and resulting loan size. Adjust the percentage to compare different purchase scenarios and find the right balance for your financial situation.",
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

          {/* Top CTA — subtle inline link (Step 2) */}
          <a href={calculatorUrl} className={guideStyles.inlineCtaLink}>
            Try the {guide.calculatorLabel} →
          </a>

          {/* Contextual cross-link note (Step 3) */}
          {guide.relatedContent && (
            <p className={guideStyles.relatedNote}>
              {guide.relatedContent.text}{" "}
              <a href={guide.relatedContent.href}>{guide.relatedContent.label}</a>
              {guide.relatedContent.suffix ?? "."}
            </p>
          )}

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
