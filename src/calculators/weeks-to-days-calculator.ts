import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "weeks-to-days-calculator",
  title: "Weeks to Days Calculator",
  shortTitle: "wk to days",
  description: "Convert weeks to days instantly.",
  longDescription: "One week equals exactly 7 days. Use this calculator to convert weeks to days for project planning, pregnancy tracking, event countdowns, and subscription periods.",
  category: "conversions",
  keywords: ["weeks to days", "wk to days", "convert weeks days"],
  inputs: [
    { type: "number", key: "value", label: "Weeks", defaultValue: 4, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 7;
    return {
      outputs: [
        { key: "result", label: "Days", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply weeks by 7. One week = 7 days.",
  examples: [
    { title: "4 weeks", description: "Roughly one month.", inputs: { value: 4 }, result: "4 wk = 28 days" },
    { title: "52 weeks", description: "One year.", inputs: { value: 52 }, result: "52 wk = 364 days" },
  ],
  faqs: [
    { question: "How many days is 6 weeks?", answer: "6 × 7 = 42 days." },
    { question: "How many weeks in a month?", answer: "On average 4.33 weeks per month (52 weeks ÷ 12 months)." },
  ],
  relatedSlugs: ["days-to-weeks-calculator", "months-to-days-calculator", "days-to-months-calculator"],
};

export default def;
