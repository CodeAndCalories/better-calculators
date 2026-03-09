import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "liters-to-ml-calculator",
  title: "Liters to Milliliters Calculator",
  shortTitle: "L to mL",
  description: "Convert liters to milliliters instantly.",
  longDescription: "One liter equals exactly 1,000 milliliters. Use this calculator to convert liquid volumes in liters to milliliters — commonly needed for recipes, lab work, and medication dosages.",
  category: "conversions",
  keywords: ["liters to milliliters", "l to ml", "L to mL conversion"],
  inputs: [
    { type: "number", key: "value", label: "Liters (L)", defaultValue: 1, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 1000;
    return {
      outputs: [
        { key: "result", label: "Milliliters (mL)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply liters by 1,000. 1 L = 1,000 mL.",
  examples: [
    { title: "1 liter", description: "Standard water bottle.", inputs: { value: 1 }, result: "1 L = 1,000 mL" },
    { title: "1.5 liters", description: "Large water bottle.", inputs: { value: 1.5 }, result: "1.5 L = 1,500 mL" },
  ],
  faqs: [
    { question: "How many mL are in 2 liters?", answer: "2 × 1,000 = 2,000 mL." },
    { question: "How many mL is one tablespoon?", answer: "One tablespoon ≈ 14.787 mL." },
  ],
  relatedSlugs: ["ml-to-liters-calculator", "ml-to-cups-calculator", "gallons-to-liters"],
};

export default def;
