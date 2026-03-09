import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "grams-to-kilograms-calculator",
  title: "Grams to Kilograms Calculator",
  shortTitle: "g to kg",
  description: "Convert grams to kilograms instantly.",
  longDescription:
    "Need to express a gram measurement in kilograms? This calculator divides by 1000 using the exact metric relationship, useful in cooking, science, and shipping.",
  category: "conversions",
  keywords: ["grams to kilograms", "g to kg", "weight converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "grams",
      label: "Grams (g)",
      defaultValue: 500,
      min: 0,
      step: 1,
      placeholder: "500",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const grams = Number(values.grams);
    if (isNaN(grams) || grams < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const kilograms = grams / 1000;
    return {
      outputs: [
        {
          key: "kilograms",
          label: "Kilograms (kg)",
          value: Number(kilograms.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Divides by 1000 since 'kilo-' means one thousand grams.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 500 Grams (g) to Kilograms (kg).",
      inputs: { grams: 500 },
      result: "500 g equals 0.5 kg.",
    },
    {
      title: "Example 2",
      description: "Converting 2500 Grams (g) to Kilograms (kg).",
      inputs: { grams: 2500 },
      result: "2500 g equals 2.5 kg.",
    },
  ],
  faqs: [
    {
      question: "How many kilograms in a gram?",
      answer: "One gram equals 0.001 kilograms.",
    },
    {
      question: "Is this conversion exact?",
      answer: "Yes. Both are SI units.",
    },
    {
      question: "When would I convert g to kg?",
      answer: "Common when totaling ingredients or converting nutrition labels to shipping weights.",
    },
  ],
  relatedSlugs: ["kilograms-to-grams-calculator", "kilograms-to-pounds-calculator"],
};

export default def;
