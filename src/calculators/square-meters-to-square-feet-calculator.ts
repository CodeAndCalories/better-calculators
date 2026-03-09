import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "square-meters-to-square-feet-calculator",
  title: "Square Meters to Square Feet Calculator",
  shortTitle: "m² to ft²",
  description: "Convert square meters to square feet instantly.",
  longDescription: "One square meter equals approximately 10.7639 square feet. This converter is essential for real estate listings, flooring estimates, and comparing international property sizes.",
  category: "conversions",
  keywords: ["square meters to square feet", "m2 to ft2", "area conversion metric imperial"],
  inputs: [
    { type: "number", key: "value", label: "Square Meters (m²)", defaultValue: 50, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 10.7639;
    return {
      outputs: [
        { key: "result", label: "Square Feet (ft²)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply square meters by 10.7639. This factor comes from (1 m = 3.28084 ft)² = 10.7639 ft² per m².",
  examples: [
    { title: "50 m²", description: "Small apartment.", inputs: { value: 50 }, result: "50 m² ≈ 538.20 ft²" },
    { title: "100 m²", description: "Medium home.", inputs: { value: 100 }, result: "100 m² ≈ 1,076.39 ft²" },
  ],
  faqs: [
    { question: "How many square feet is 1 square meter?", answer: "1 m² ≈ 10.7639 ft²." },
    { question: "Is square meter the same as meter squared?", answer: "Yes. 1 square meter = 1 m² = a square with sides 1 meter long." },
  ],
  relatedSlugs: ["square-feet-to-square-meters-calculator", "acres-to-square-feet-calculator", "square-feet-to-acres-calculator"],
};

export default def;
