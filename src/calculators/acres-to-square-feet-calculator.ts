import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "acres-to-square-feet-calculator",
  title: "Acres to Square Feet Calculator",
  shortTitle: "ac to ft²",
  description: "Convert acres to square feet instantly.",
  longDescription: "One acre equals exactly 43,560 square feet. This calculator converts land area in acres to square feet — essential for real estate, farming, land development, and property surveys.",
  category: "conversions",
  keywords: ["acres to square feet", "ac to ft2", "acre square feet conversion"],
  inputs: [
    { type: "number", key: "value", label: "Acres (ac)", defaultValue: 1, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 43560;
    return {
      outputs: [
        { key: "result", label: "Square Feet (ft²)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply acres by 43,560. One acre = 43,560 ft² (defined as 1 chain × 1 furlong = 66 ft × 660 ft).",
  examples: [
    { title: "1 acre", description: "Standard land acre.", inputs: { value: 1 }, result: "1 ac = 43,560 ft²" },
    { title: "0.25 acres", description: "Quarter-acre residential lot.", inputs: { value: 0.25 }, result: "0.25 ac = 10,890 ft²" },
  ],
  faqs: [
    { question: "How many square feet is an acre?", answer: "Exactly 43,560 square feet." },
    { question: "How many acres is a football field?", answer: "A US football field (including end zones) is about 1.32 acres (57,600 ft²)." },
  ],
  relatedSlugs: ["square-feet-to-acres-calculator", "square-feet-to-square-meters-calculator", "square-meters-to-square-feet-calculator"],
};

export default def;
