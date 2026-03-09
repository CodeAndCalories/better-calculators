import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "feet-to-miles-calculator",
  title: "Feet to Miles Calculator",
  shortTitle: "ft to mi",
  description: "Convert feet to miles instantly.",
  longDescription: "One mile equals 5,280 feet, so one foot equals approximately 0.000189394 miles. This calculator converts large distances in feet to miles — useful for surveyors, pilots, and trail planners.",
  category: "conversions",
  keywords: ["feet to miles", "ft to mi", "foot to mile conversion"],
  inputs: [
    { type: "number", key: "value", label: "Feet (ft)", defaultValue: 5280, min: 0, step: 100 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 5280;
    return {
      outputs: [
        { key: "result", label: "Miles (mi)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide feet by 5,280 to get miles. 1 foot = 1/5280 miles ≈ 0.000189394 miles.",
  examples: [
    { title: "5280 feet", description: "Exactly one mile.", inputs: { value: 5280 }, result: "5,280 ft = 1 mi" },
    { title: "10000 feet", description: "Typical skydiving altitude.", inputs: { value: 10000 }, result: "10,000 ft ≈ 1.8939 mi" },
  ],
  faqs: [
    { question: "How many miles is 10,000 feet?", answer: "10,000 ÷ 5,280 ≈ 1.894 miles." },
    { question: "How do I convert feet to nautical miles?", answer: "One nautical mile = 6,076.12 feet. Divide feet by 6,076.12 for nautical miles." },
  ],
  relatedSlugs: ["miles-to-feet-calculator", "feet-to-yards-calculator", "miles-to-km"],
};

export default def;
