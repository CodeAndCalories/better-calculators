import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "months-to-days-calculator",
  title: "Months to Days Calculator",
  shortTitle: "mo to days",
  description: "Convert months to days using a 30-day average month.",
  longDescription: "Calendar months vary between 28 and 31 days. This calculator uses the standard average of 30.4375 days per month (365.25 ÷ 12) for accurate general-purpose conversion. Useful for loan terms, lease durations, and planning timelines.",
  category: "conversions",
  keywords: ["months to days", "months days conversion", "how many days in months"],
  inputs: [
    { type: "number", key: "value", label: "Months", defaultValue: 6, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 30.4375;
    return {
      outputs: [
        { key: "result", label: "Days (avg)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply months by 30.4375 (the average days per month based on 365.25 days per year ÷ 12 months).",
  examples: [
    { title: "6 months", description: "Half a year.", inputs: { value: 6 }, result: "6 mo ≈ 182.625 days" },
    { title: "12 months", description: "One year.", inputs: { value: 12 }, result: "12 mo ≈ 365.25 days" },
  ],
  faqs: [
    { question: "Why 30.4375 and not 30?", answer: "365.25 days per year (accounting for leap years) divided by 12 months = 30.4375 days per month, which is more accurate than using 30." },
    { question: "How many days is 3 months?", answer: "3 × 30.4375 ≈ 91.3 days." },
  ],
  relatedSlugs: ["days-to-months-calculator", "weeks-to-days-calculator", "days-to-weeks-calculator"],
};

export default def;
