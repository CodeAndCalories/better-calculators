import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "grams-to-kg-calculator",
  title: "Grams to Kilograms Calculator",
  shortTitle: "g to kg",
  description: "Convert grams to kilograms instantly.",
  longDescription: "One kilogram equals 1,000 grams, so one gram equals 0.001 kilograms. Use this calculator to convert small weight measurements in grams to the larger kilogram unit.",
  category: "conversions",
  keywords: ["grams to kilograms", "g to kg", "gram kilogram conversion"],
  inputs: [
    { type: "number", key: "value", label: "Grams (g)", defaultValue: 500, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 1000;
    return {
      outputs: [
        { key: "result", label: "Kilograms (kg)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide grams by 1,000. 1 gram = 0.001 kg.",
  examples: [
    { title: "500 g", description: "Half a kilogram.", inputs: { value: 500 }, result: "500 g = 0.5 kg" },
    { title: "250 g", description: "Quarter kilogram.", inputs: { value: 250 }, result: "250 g = 0.25 kg" },
  ],
  faqs: [
    { question: "How many kg is 1000 grams?", answer: "1,000 grams = exactly 1 kilogram." },
    { question: "How do I convert grams to pounds?", answer: "Divide grams by 453.592 to get pounds." },
  ],
  relatedSlugs: ["kg-to-grams-calculator", "ounces-to-grams", "lbs-to-kg"],
};

export default def;
