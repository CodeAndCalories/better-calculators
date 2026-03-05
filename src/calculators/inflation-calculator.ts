import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "inflation-calculator",
  title: "Inflation Calculator",
  shortTitle: "Inflation",
  description:
    "Calculate the real purchasing power of money over time using a custom inflation rate — see what a past or future dollar amount is worth today.",
  longDescription:
    "Inflation silently erodes the value of money over time. Our inflation calculator shows you exactly what a sum of money from any year is worth in today's dollars, what today's amount will be worth in the future, and how much purchasing power has been lost or will be lost. Use it to compare salaries across years, understand the real cost of long-term debt, or plan for retirement.",
  category: "finance",
  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "real value of money",
    "inflation rate calculator",
    "CPI calculator",
    "cost of living calculator",
  ],
  inputs: [
    {
      type: "number",
      key: "amount",
      label: "Starting Amount",
      prefix: "$",
      defaultValue: 10000,
      min: 0.01,
      step: 100,
      placeholder: "10000",
    },
    {
      type: "select",
      key: "direction",
      label: "Calculate",
      defaultValue: "future",
      options: [
        { label: "Future value — what will this be worth later?", value: "future" },
        { label: "Past value — what would this have cost before?", value: "past" },
      ],
      helpText: "Future: accounts for rising prices. Past: shows equivalent historical cost.",
    },
    {
      type: "number",
      key: "years",
      label: "Number of Years",
      suffix: "yrs",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1,
      placeholder: "10",
    },
    {
      type: "number",
      key: "inflationRate",
      label: "Annual Inflation Rate",
      suffix: "%",
      defaultValue: 3.0,
      min: 0.1,
      max: 50,
      step: 0.1,
      placeholder: "3.0",
      helpText: "US avg: ~3% historical, ~2% Fed target, ~4–5% recent years",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const amount = Number(values.amount);
    const direction = values.direction as string;
    const years = Number(values.years);
    const inflationRate = Number(values.inflationRate) / 100;

    if (amount <= 0) return { outputs: [], error: "Amount must be greater than zero." };
    if (years < 1) return { outputs: [], error: "Years must be at least 1." };
    if (inflationRate <= 0) return { outputs: [], error: "Inflation rate must be greater than 0%." };

    // Future value: how much MORE you'll need to buy the same thing
    // Past value: how much LESS something cost before
    const adjustedAmount =
      direction === "future"
        ? amount * Math.pow(1 + inflationRate, years)
        : amount / Math.pow(1 + inflationRate, years);

    const purchasingPowerLoss =
      direction === "future"
        ? adjustedAmount - amount      // extra money needed in future
        : amount - adjustedAmount;     // amount lost to inflation in reverse

    const purchasingPowerPct =
      direction === "future"
        ? ((adjustedAmount - amount) / amount) * 100
        : ((amount - adjustedAmount) / amount) * 100;

    // Real value of original amount in future dollars (inverse for future direction)
    const realValueLabel =
      direction === "future"
        ? `What $${amount.toLocaleString()} buys in ${years} years`
        : `Past equivalent of today's $${amount.toLocaleString()}`;

    // Effective annual erosion rate (Rule of 70 approximation)
    const doublingYears = Math.log(2) / Math.log(1 + inflationRate);

    const futureLabel = direction === "future" ? "Future Equivalent Value" : "Past Equivalent Value";
    const lossLabel = direction === "future" ? "Extra Money Needed" : "Purchasing Power Lost";

    return {
      outputs: [
        {
          key: "adjustedAmount",
          label: futureLabel,
          value: adjustedAmount,
          format: "currency",
          highlight: true,
          helpText: realValueLabel,
        },
        {
          key: "purchasingPowerLoss",
          label: lossLabel,
          value: purchasingPowerLoss,
          format: "currency",
        },
        {
          key: "purchasingPowerPct",
          label: "Cumulative Inflation Over Period",
          value: purchasingPowerPct,
          format: "percentage",
        },
        {
          key: "doublingYears",
          label: "Years Until Prices Double",
          value: doublingYears,
          format: "years",
          helpText: `At ${(inflationRate * 100).toFixed(1)}% inflation`,
        },
      ],
    };
  },

  howItWorks: `Inflation adjustment uses compound growth: Future Value = Amount × (1 + Rate)^Years. To reverse it (find a past equivalent): Past Value = Amount ÷ (1 + Rate)^Years. The cumulative inflation percentage is (Future Value − Original) ÷ Original × 100. The "years until prices double" is derived from the Rule of 70: Years ≈ ln(2) ÷ ln(1 + Rate), which gives a precise answer (the Rule of 70 approximates this as 70 ÷ Rate%). All calculations assume a constant annual inflation rate throughout the period.`,

  examples: [
    {
      title: "$10,000 Today — What Will It Be Worth in 10 Years?",
      description:
        "Understanding how inflation erodes the purchasing power of savings sitting in a low-yield account.",
      inputs: { amount: 10000, direction: "future", years: 10, inflationRate: 3.0 },
      result:
        "You'd need $13,439 in 10 years to buy what $10,000 buys today — a loss of $3,439 in real purchasing power. Prices double every ~23.4 years at 3%.",
    },
    {
      title: "$75,000 Salary — What Was It Worth 20 Years Ago?",
      description:
        "Finding the historical equivalent of a current salary to compare compensation across decades.",
      inputs: { amount: 75000, direction: "past", years: 20, inflationRate: 3.5 },
      result:
        "A $75,000 salary today is equivalent to $37,807 twenty years ago — meaning your real wage has roughly doubled if your nominal salary kept pace.",
    },
  ],

  faqs: [
    {
      question: "What inflation rate should I use?",
      answer:
        "The US historical average is about 3% per year over the long run (1913–present). The Federal Reserve's target is 2%. Recent years (2021–2023) saw rates of 4–8%. For long-term retirement planning, 3% is a common conservative choice. For short-term projections, check the latest CPI data from the U.S. Bureau of Labor Statistics.",
    },
    {
      question: "What is the difference between nominal and real value?",
      answer:
        "Nominal value is the face value in current dollars — the number printed on the price tag. Real value adjusts for inflation to reflect actual purchasing power. A salary that rose from $50,000 to $55,000 over 10 years with 3% annual inflation has a higher nominal value but lower real value, since $55,000 buys less than $50,000 did a decade ago.",
    },
    {
      question: "How does the Rule of 70 work?",
      answer:
        "The Rule of 70 is a quick mental math shortcut: divide 70 by the annual inflation rate to estimate how many years it takes for prices to double. At 3% inflation, prices double in about 70 ÷ 3 ≈ 23 years. At 7% inflation, prices double in about 10 years. Our calculator uses the precise logarithmic formula rather than this approximation.",
    },
    {
      question: "Does this calculator use real CPI data?",
      answer:
        "No — this calculator uses a fixed annual rate that you choose, not live CPI data. This makes it more flexible for scenarios (e.g. planning with a specific assumed rate) but less precise for calculating the exact historical change between two real years. For exact historical CPI comparisons, use the BLS CPI Inflation Calculator at bls.gov.",
    },
  ],

  relatedSlugs: [
    "compound-interest-calculator",
    "mortgage-calculator",
    "simple-interest-calculator",
  ],
};

export default def;
