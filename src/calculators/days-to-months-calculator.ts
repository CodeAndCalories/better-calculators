import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-to-months-calculator",
  title: "Days to Months Calculator",
  shortTitle: "days to mo",
  description: "Convert days to months using an average month length.",
  longDescription: "Using the average of 30.4375 days per month (365.25 ÷ 12), this calculator converts any number of days to months. Ideal for loan term calculations, lease conversions, and age estimates.",
  category: "conversions",
  keywords: ["days to months", "convert days months", "days months calculator"],
  inputs: [
    { type: "number", key: "value", label: "Days", defaultValue: 90, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 30.4375;
    return {
      outputs: [
        { key: "result", label: "Months (avg)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide days by 30.4375 (average days per month = 365.25 ÷ 12).",
  examples: [
    { title: "90 days", description: "Roughly a quarter year.", inputs: { value: 90 }, result: "90 days ≈ 2.957 months" },
    { title: "365 days", description: "One non-leap year.", inputs: { value: 365 }, result: "365 days ≈ 11.99 months" },
  ],
  faqs: [
    { question: "How many months is 180 days?", answer: "180 ÷ 30.4375 ≈ 5.91 months." },
    { question: "Why is the answer not a whole number?", answer: "Months vary in length (28–31 days). The calculator uses a precise average of 30.4375 days per month." },
  ],
  relatedSlugs: ["months-to-days-calculator", "days-to-weeks-calculator", "weeks-to-days-calculator"],
};

export default def;
