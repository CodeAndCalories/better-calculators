import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "pounds-to-ounces-calculator",
  title: "Pounds to Ounces Calculator",
  shortTitle: "lb to oz",
  description: "Convert pounds to ounces instantly.",
  longDescription: "One pound equals exactly 16 ounces (avoirdupois). Use this calculator to convert pounds to ounces for cooking, shipping weight limits, and nutrition calculations.",
  category: "conversions",
  keywords: ["pounds to ounces", "lb to oz", "pound ounce conversion"],
  inputs: [
    { type: "number", key: "value", label: "Pounds (lb)", defaultValue: 1, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 16;
    return {
      outputs: [
        { key: "result", label: "Ounces (oz)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply pounds by 16. One pound = 16 ounces (avoirdupois).",
  examples: [
    { title: "1 pound", description: "One pound in ounces.", inputs: { value: 1 }, result: "1 lb = 16 oz" },
    { title: "2.5 pounds", description: "Package weight.", inputs: { value: 2.5 }, result: "2.5 lb = 40 oz" },
  ],
  faqs: [
    { question: "How many ounces are in a pound?", answer: "Exactly 16 ounces in one avoirdupois pound." },
    { question: "Is this the same as fluid ounces?", answer: "No. Ounces here are weight (mass) ounces. Fluid ounces measure volume and are a different unit." },
  ],
  relatedSlugs: ["ounces-to-pounds-calculator", "kg-to-lbs", "grams-to-ounces"],
};

export default def;
