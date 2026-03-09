import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kilograms-to-grams-calculator",
  title: "Kilograms to Grams Calculator",
  shortTitle: "kg to g",
  description: "Convert kilograms to grams instantly.",
  longDescription:
    "Grams are used in cooking, nutrition, and laboratory measurements. This calculator multiplies your kilogram value by 1000 to give the precise gram equivalent.",
  category: "conversions",
  keywords: ["kilograms to grams", "kg to g", "weight converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "kilograms",
      label: "Kilograms (kg)",
      defaultValue: 1,
      min: 0,
      step: 0.001,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kilograms = Number(values.kilograms);
    if (isNaN(kilograms) || kilograms < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const grams = kilograms * 1000;
    return {
      outputs: [
        {
          key: "grams",
          label: "Grams (g)",
          value: Number(grams.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 1000 since there are exactly 1000 grams in one kilogram.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Kilograms (kg) to Grams (g).",
      inputs: { kilograms: 1 },
      result: "1 kg equals 1000 g.",
    },
    {
      title: "Example 2",
      description: "Converting 0.5 Kilograms (kg) to Grams (g).",
      inputs: { kilograms: 0.5 },
      result: "0.5 kg equals 500 g.",
    },
  ],
  faqs: [
    {
      question: "How many grams are in a kilogram?",
      answer: "Exactly 1000 grams.",
    },
    {
      question: "Is this exact?",
      answer: "Yes. Both are SI metric units.",
    },
    {
      question: "Useful for cooking?",
      answer: "Yes — recipes often use grams while food is sold by the kilogram.",
    },
  ],
  relatedSlugs: ["grams-to-kilograms-calculator", "kilograms-to-pounds-calculator"],
};

export default def;
