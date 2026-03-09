import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-to-weeks-calculator",
  title: "Days to Weeks Calculator",
  shortTitle: "days to wk",
  description: "Convert days to weeks instantly.",
  longDescription: "Divide any number of days by 7 to get weeks. This calculator is helpful for project management, pregnancy milestones, fitness challenges, and subscription timelines.",
  category: "conversions",
  keywords: ["days to weeks", "days to wk", "convert days weeks"],
  inputs: [
    { type: "number", key: "value", label: "Days", defaultValue: 28, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 7;
    return {
      outputs: [
        { key: "result", label: "Weeks", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide days by 7. One week = 7 days.",
  examples: [
    { title: "28 days", description: "Four weeks.", inputs: { value: 28 }, result: "28 days = 4 wk" },
    { title: "100 days", description: "Project milestone.", inputs: { value: 100 }, result: "100 days ≈ 14.286 wk" },
  ],
  faqs: [
    { question: "How many weeks is 90 days?", answer: "90 ÷ 7 ≈ 12.857 weeks." },
    { question: "How many weeks is a year?", answer: "365 ÷ 7 ≈ 52.14 weeks." },
  ],
  relatedSlugs: ["weeks-to-days-calculator", "days-to-months-calculator", "months-to-days-calculator"],
};

export default def;
