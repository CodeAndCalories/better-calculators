import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "inflation-impact-on-savings-calculator",
  title: "Inflation Impact on Savings Calculator",
  shortTitle: "Inflation vs Savings",
  description: "See how inflation erodes the real value of your savings over time.",
  longDescription:
    "If your savings account earns less than the inflation rate, you are actually losing purchasing power each year. This calculator compares your savings interest rate to inflation to show you the real return on your money and how much purchasing power you gain or lose.",
  category: "finance",
  keywords: ["inflation impact on savings", "real return calculator", "savings vs inflation", "purchasing power savings", "real interest rate"],
  inputs: [
    { type: "number", key: "savingsAmount", label: "Savings Balance ($)", defaultValue: 20000, min: 1, step: 500, placeholder: "20000" },
    { type: "number", key: "savingsRate", label: "Savings Interest Rate (% APY)", defaultValue: 4.5, min: 0, max: 20, step: 0.1, placeholder: "4.5" },
    { type: "number", key: "inflationRate", label: "Annual Inflation Rate (%)", defaultValue: 3, min: 0, max: 30, step: 0.1, placeholder: "3" },
    { type: "number", key: "years", label: "Years", defaultValue: 10, min: 1, max: 50, step: 1, placeholder: "10" },
  ],
  compute(values: InputValues): ComputeResult {
    const savings = Number(values.savingsAmount);
    const savingsRate = Number(values.savingsRate) / 100;
    const inflation = Number(values.inflationRate) / 100;
    const years = Number(values.years);
    if ([savings, savingsRate, inflation, years].some(isNaN) || savings <= 0 || years < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const nominalValue = savings * Math.pow(1 + savingsRate, years);
    const realRate = (1 + savingsRate) / (1 + inflation) - 1;
    const realValue = savings * Math.pow(1 + realRate, years);
    const purchasingPowerLostOrGained = realValue - savings;
    const nominalGain = nominalValue - savings;
    return {
      outputs: [
        { key: "realValue", label: "Real Value (Today's Dollars)", value: Number(realValue.toFixed(2)), format: "number", highlight: true },
        { key: "nominalValue", label: "Nominal Value (Future Dollars)", value: Number(nominalValue.toFixed(2)), format: "number" },
        { key: "realRate", label: "Real Interest Rate (%)", value: Number((realRate * 100).toFixed(2)), format: "number" },
        { key: "purchasingPowerChange", label: "Purchasing Power Change ($)", value: Number(purchasingPowerLostOrGained.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Uses the Fisher equation: Real Rate = (1 + Nominal Rate) / (1 + Inflation) − 1. Real value = savings × (1 + real rate)^years. A negative real rate means inflation is outpacing your interest.",
  examples: [
    {
      title: "HYSA Beating Inflation",
      description: "$20,000 at 4.5% APY with 3% inflation for 10 years.",
      inputs: { savingsAmount: 20000, savingsRate: 4.5, inflationRate: 3, years: 10 },
      result: "Real value: ~$22,800 — you gained ~$2,800 in real purchasing power.",
    },
    {
      title: "Low-Rate Account Losing to Inflation",
      description: "$20,000 at 0.5% APY with 4% inflation for 10 years.",
      inputs: { savingsAmount: 20000, savingsRate: 0.5, inflationRate: 4, years: 10 },
      result: "Real value: ~$13,500 — you lost ~$6,500 in purchasing power.",
    },
  ],
  faqs: [
    { question: "What is the real interest rate?", answer: "The real rate is your savings rate minus inflation — it shows the true growth of purchasing power, not just the dollar amount." },
    { question: "How do I beat inflation?", answer: "Use a high-yield savings account (HYSA), I-bonds, TIPS, or invest in assets with historically higher real returns like index funds." },
    { question: "What inflation rate should I assume?", answer: "The US long-run average is ~3%. For conservative planning, use 3–4%. Check the current CPI for a real-time figure." },
  ],
  relatedSlugs: ["inflation-calculator", "savings-interest-calculator", "compound-interest"],
};

export default def;
