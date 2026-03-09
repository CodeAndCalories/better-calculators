import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "square-feet-to-acres-calculator",
  title: "Square Feet to Acres Calculator",
  shortTitle: "ft² to ac",
  description: "Convert square feet to acres instantly.",
  longDescription: "One acre equals 43,560 square feet, so divide any square footage by 43,560 to get acres. Useful for real estate listings, land valuation, farming plots, and construction site planning.",
  category: "conversions",
  keywords: ["square feet to acres", "ft2 to acres", "square foot acre conversion"],
  inputs: [
    { type: "number", key: "value", label: "Square Feet (ft²)", defaultValue: 43560, min: 0, step: 100 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 43560;
    return {
      outputs: [
        { key: "result", label: "Acres (ac)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide square feet by 43,560. 1 acre = 43,560 ft².",
  examples: [
    { title: "43560 ft²", description: "Exactly one acre.", inputs: { value: 43560 }, result: "43,560 ft² = 1 acre" },
    { title: "10000 ft²", description: "Small commercial lot.", inputs: { value: 10000 }, result: "10,000 ft² ≈ 0.2296 acres" },
  ],
  faqs: [
    { question: "How many acres is 5,000 square feet?", answer: "5,000 ÷ 43,560 ≈ 0.1148 acres." },
    { question: "How many square feet is half an acre?", answer: "0.5 × 43,560 = 21,780 square feet." },
  ],
  relatedSlugs: ["acres-to-square-feet-calculator", "square-feet-to-square-meters-calculator", "square-meters-to-square-feet-calculator"],
};

export default def;
