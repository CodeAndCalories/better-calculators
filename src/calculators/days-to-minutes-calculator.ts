import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "days-to-minutes-calculator",
  title: "Days to Minutes Calculator",
  shortTitle: "days to min",
  description: "Convert days to minutes instantly.",
  longDescription: "One day has 24 hours, each with 60 minutes, giving 1,440 minutes per day. Use this calculator to convert days to minutes for scheduling, event planning, and time budgeting.",
  category: "conversions",
  keywords: ["days to minutes", "days to min", "convert days minutes"],
  inputs: [
    { type: "number", key: "value", label: "Days", defaultValue: 1, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 1440;
    return {
      outputs: [
        { key: "result", label: "Minutes", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply days by 1,440 (24 hours × 60 minutes). 1 day = 1,440 minutes.",
  examples: [
    { title: "1 day", description: "One full day.", inputs: { value: 1 }, result: "1 day = 1,440 min" },
    { title: "7 days", description: "One week.", inputs: { value: 7 }, result: "7 days = 10,080 min" },
  ],
  faqs: [
    { question: "How many minutes are in a day?", answer: "24 × 60 = 1,440 minutes in a day." },
    { question: "How many minutes in a week?", answer: "7 × 1,440 = 10,080 minutes in a week." },
  ],
  relatedSlugs: ["days-to-hours", "days-to-seconds-calculator", "minutes-to-days-calculator"],
};

export default def;
