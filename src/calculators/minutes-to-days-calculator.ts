import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "minutes-to-days-calculator",
  title: "Minutes to Days Calculator",
  shortTitle: "min to days",
  description: "Convert minutes to days instantly.",
  longDescription: "One day contains 1,440 minutes (24 hours × 60 minutes). This calculator divides any number of minutes by 1,440 to get days — useful for time tracking, project estimates, and screen time totals.",
  category: "conversions",
  keywords: ["minutes to days", "min to days", "convert minutes days"],
  inputs: [
    { type: "number", key: "value", label: "Minutes (min)", defaultValue: 1440, min: 0, step: 60 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 1440;
    return {
      outputs: [
        { key: "result", label: "Days", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide minutes by 1,440 (24 hours × 60 minutes per hour). 1 day = 1,440 minutes.",
  examples: [
    { title: "1440 minutes", description: "One full day.", inputs: { value: 1440 }, result: "1,440 min = 1 day" },
    { title: "10080 minutes", description: "One week.", inputs: { value: 10080 }, result: "10,080 min = 7 days" },
  ],
  faqs: [
    { question: "How many days is 2,000 minutes?", answer: "2,000 ÷ 1,440 ≈ 1.389 days." },
    { question: "How many minutes in a week?", answer: "7 × 1,440 = 10,080 minutes." },
  ],
  relatedSlugs: ["days-to-minutes-calculator", "hours-to-days-calculator", "seconds-to-hours-calculator"],
};

export default def;
