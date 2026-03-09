import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "square-feet-to-square-meters-calculator",
  title: "Square Feet to Square Meters Calculator",
  shortTitle: "ft² to m²",
  description: "Convert square feet to square meters instantly.",
  longDescription: "One square foot equals approximately 0.0929 square meters. Use this converter when buying flooring from metric suppliers, comparing international real estate, or submitting metric floor plans.",
  category: "conversions",
  keywords: ["square feet to square meters", "ft2 to m2", "area conversion imperial metric"],
  inputs: [
    { type: "number", key: "value", label: "Square Feet (ft²)", defaultValue: 1000, min: 0, step: 10 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 0.092903;
    return {
      outputs: [
        { key: "result", label: "Square Meters (m²)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply square feet by 0.092903. This factor = (0.3048 m/ft)² = 0.092903 m² per ft².",
  examples: [
    { title: "1000 ft²", description: "Small home.", inputs: { value: 1000 }, result: "1,000 ft² ≈ 92.9 m²" },
    { title: "2500 ft²", description: "Average US home.", inputs: { value: 2500 }, result: "2,500 ft² ≈ 232.26 m²" },
  ],
  faqs: [
    { question: "How many square meters is 500 square feet?", answer: "500 × 0.092903 ≈ 46.45 m²." },
    { question: "How do I convert square feet to square yards?", answer: "Divide square feet by 9. 9 ft² = 1 yd²." },
  ],
  relatedSlugs: ["square-meters-to-square-feet-calculator", "acres-to-square-feet-calculator", "square-feet-to-acres-calculator"],
};

export default def;
