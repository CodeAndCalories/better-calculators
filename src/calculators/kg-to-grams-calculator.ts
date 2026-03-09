import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kg-to-grams-calculator",
  title: "Kilograms to Grams Calculator",
  shortTitle: "kg to g",
  description: "Convert kilograms to grams instantly.",
  longDescription: "One kilogram equals exactly 1,000 grams. This calculator converts any weight in kilograms to grams — handy for cooking, chemistry, nutrition labels, and science experiments.",
  category: "conversions",
  keywords: ["kilograms to grams", "kg to g", "kilogram gram conversion"],
  inputs: [
    { type: "number", key: "value", label: "Kilograms (kg)", defaultValue: 1, min: 0, step: 0.001 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 1000;
    return {
      outputs: [
        { key: "result", label: "Grams (g)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply kilograms by 1,000. The prefix 'kilo' means 1,000 in SI units.",
  examples: [
    { title: "1 kg", description: "One kilogram in grams.", inputs: { value: 1 }, result: "1 kg = 1,000 g" },
    { title: "0.5 kg", description: "Half a kilogram.", inputs: { value: 0.5 }, result: "0.5 kg = 500 g" },
  ],
  faqs: [
    { question: "How many grams are in a kilogram?", answer: "Exactly 1,000 grams in one kilogram." },
    { question: "How many grams is 2.5 kg?", answer: "2.5 × 1,000 = 2,500 grams." },
  ],
  relatedSlugs: ["grams-to-kg-calculator", "kg-to-lbs", "grams-to-ounces"],
};

export default def;
