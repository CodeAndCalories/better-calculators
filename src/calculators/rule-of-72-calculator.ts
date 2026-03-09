import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "rule-of-72-calculator",
  title: "Rule of 72 Calculator",
  shortTitle: "Rule of 72",
  description: "Estimate how long it takes for an investment to double.",
  longDescription: "The Rule of 72 is a simple mental math shortcut: divide 72 by your annual interest rate to estimate the number of years it takes for an investment to double in value.",
  category: "finance",
  keywords: ["rule of 72", "investment doubling", "compound interest doubling time", "years to double money"],
  inputs: [
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 8, min: 0.1, step: 0.1, placeholder: "8" },
  ],
  compute(values: InputValues): ComputeResult {
    const annualRate = Number(values.annualRate);
    if (isNaN(annualRate) || annualRate <= 0) {
      return { outputs: [], error: "Please enter a positive interest rate." };
    }
    const years = 72 / annualRate;
    return {
      outputs: [
        { key: "years", label: "Years to Double", value: Number(years.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides 72 by the annual interest rate. This approximation works best for rates between 6% and 10%.",
  examples: [
    {
      title: "Stock Market Average",
      description: "Estimating doubling time at 8% annual return.",
      inputs: { annualRate: 8 },
      result: "Approximately 9 years to double.",
    },
    {
      title: "High-Yield Savings",
      description: "Estimating doubling time at 4.5% APY.",
      inputs: { annualRate: 4.5 },
      result: "Approximately 16 years to double.",
    },
  ],
  faqs: [
    { question: "How accurate is the Rule of 72?", answer: "Very accurate between 6–10%. For rates outside this range, accuracy decreases slightly." },
    { question: "Can I use this for debt?", answer: "Yes — use your credit card APR to see how fast your debt doubles if unpaid." },
    { question: "What is the exact formula?", answer: "The exact formula uses ln(2)/ln(1+r), but the Rule of 72 is a close approximation." },
  ],
  relatedSlugs: ["compound-interest", "investment-doubling-time-calculator"],
};

export default def;
