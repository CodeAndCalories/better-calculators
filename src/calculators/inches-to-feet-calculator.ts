import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "inches-to-feet-calculator",
  title: "Inches to Feet Calculator",
  shortTitle: "in to ft",
  description: "Convert inches to feet instantly.",
  longDescription: "Divide any measurement in inches by 12 to get feet. This calculator handles decimal feet automatically, making it perfect for converting measurements from rulers, blueprints, or material spec sheets.",
  category: "conversions",
  keywords: ["inches to feet", "in to ft", "inch to foot conversion"],
  inputs: [
    { type: "number", key: "value", label: "Inches (in)", defaultValue: 72, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 12;
    return {
      outputs: [
        { key: "result", label: "Feet (ft)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide inches by 12. One foot = 12 inches, so 1 inch = 1/12 ft ≈ 0.083333 ft.",
  examples: [
    { title: "72 inches", description: "Six feet expressed in inches.", inputs: { value: 72 }, result: "72 in = 6 ft" },
    { title: "36 inches", description: "One yard in inches.", inputs: { value: 36 }, result: "36 in = 3 ft" },
  ],
  faqs: [
    { question: "How many feet is 60 inches?", answer: "60 ÷ 12 = 5 feet." },
    { question: "What is the decimal equivalent of 1 inch in feet?", answer: "1 inch = 0.083333... feet (1/12)." },
  ],
  relatedSlugs: ["feet-to-inches-calculator", "yards-to-feet-calculator", "feet-to-yards-calculator"],
};

export default def;
