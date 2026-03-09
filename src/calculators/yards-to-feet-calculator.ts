import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "yards-to-feet-calculator",
  title: "Yards to Feet Calculator",
  shortTitle: "yd to ft",
  description: "Convert yards to feet instantly.",
  longDescription: "One yard equals exactly 3 feet. Use this calculator to convert yards to feet for fabric, sports fields, landscaping, and construction measurements.",
  category: "conversions",
  keywords: ["yards to feet", "yd to ft", "yard foot conversion"],
  inputs: [
    { type: "number", key: "value", label: "Yards (yd)", defaultValue: 10, min: 0, step: 0.5 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 3;
    return {
      outputs: [
        { key: "result", label: "Feet (ft)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply yards by 3. One yard = 3 feet exactly.",
  examples: [
    { title: "10 yards", description: "Common sports measurement.", inputs: { value: 10 }, result: "10 yd = 30 ft" },
    { title: "100 yards", description: "Length of a US football field.", inputs: { value: 100 }, result: "100 yd = 300 ft" },
  ],
  faqs: [
    { question: "How many feet are in a yard?", answer: "There are exactly 3 feet in one yard." },
    { question: "How many yards is a mile?", answer: "One mile = 1,760 yards = 5,280 feet." },
  ],
  relatedSlugs: ["feet-to-yards-calculator", "inches-to-feet-calculator", "miles-to-feet-calculator"],
};

export default def;
