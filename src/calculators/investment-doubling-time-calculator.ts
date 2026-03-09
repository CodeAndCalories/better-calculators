import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "investment-doubling-time-calculator",
  title: "Investment Doubling Time Calculator",
  description: "Calculate how long it will take for an investment to double using the Rule of 72 and exact compound interest.",
  longDescription: "The Rule of 72 is a quick mental shortcut — divide 72 by your annual return rate to estimate doubling time in years. This calculator shows both the Rule of 72 estimate and the mathematically exact doubling time.",
  category: "finance",
  keywords: ["rule of 72", "doubling time calculator", "investment doubling", "how long to double money"],
  inputs: [
    { type: "number", key: "annualRate", label: "Annual Return Rate (%)", defaultValue: 8, min: 0.1, max: 100, step: 0.1, suffix: "%" },
    {
      type: "select",
      key: "compounding",
      label: "Compounding Frequency",
      defaultValue: 12,
      options: [
        { label: "Annually", value: 1 },
        { label: "Quarterly", value: 4 },
        { label: "Monthly", value: 12 },
        { label: "Daily", value: 365 },
      ],
    },
  ],
  compute(values: InputValues): ComputeResult {
    const rate = Number(values.annualRate);
    const n = Number(values.compounding);
    if (isNaN(rate) || rate <= 0) return { outputs: [], error: "Please enter a valid positive return rate." };

    const rule72 = 72 / rate;
    const exactYears = Math.log(2) / (n * Math.log(1 + rate / 100 / n));
    const tripleYears = Math.log(3) / (n * Math.log(1 + rate / 100 / n));

    return {
      outputs: [
        { key: "exact", label: "Exact Doubling Time (years)", value: Number(exactYears.toFixed(2)), format: "number", highlight: true },
        { key: "rule72", label: "Rule of 72 Estimate (years)", value: Number(rule72.toFixed(2)), format: "number" },
        { key: "triple", label: "Time to Triple (years)", value: Number(tripleYears.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks: "Exact doubling time = ln(2) ÷ (n × ln(1 + r/n)), where r is the annual rate and n is compounding periods per year. The Rule of 72 simplifies this to 72 ÷ annual rate %.",
  examples: [
    {
      title: "Stock market average",
      description: "8% annual return, monthly compounding.",
      inputs: { annualRate: 8, compounding: 12 },
      result: "Exact: 8.69 years. Rule of 72: 9 years.",
    },
    {
      title: "High-growth scenario",
      description: "12% annual return, monthly compounding.",
      inputs: { annualRate: 12, compounding: 12 },
      result: "Exact: 5.81 years. Rule of 72: 6 years.",
    },
  ],
  faqs: [
    { question: "How accurate is the Rule of 72?", answer: "It is very accurate for rates between 6% and 10%. For higher or lower rates, use the exact formula." },
    { question: "Does compounding frequency matter much?", answer: "Yes, but the difference is small at typical rates. Daily vs monthly compounding shaves only weeks off the doubling time." },
  ],
  relatedSlugs: ["savings-interest-calculator", "monthly-budget-calculator", "net-worth-calculator"],
};

export default def;
