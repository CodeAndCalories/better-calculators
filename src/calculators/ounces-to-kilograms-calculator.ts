import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ounces-to-kilograms-calculator",
  title: "Ounces to Kilograms Calculator",
  shortTitle: "oz to kg",
  description: "Convert ounces to kilograms instantly.",
  longDescription:
    "Need to convert ounces to kilograms for a recipe or shipping label? This calculator multiplies by 0.0283495 — the mass of one avoirdupois ounce in kilograms.",
  category: "conversions",
  keywords: ["ounces to kilograms", "oz to kg", "weight converter", "mass conversion"],
  inputs: [
    {
      type: "number",
      key: "ounces",
      label: "Ounces (oz)",
      defaultValue: 16,
      min: 0,
      step: 0.5,
      placeholder: "16",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const ounces = Number(values.ounces);
    if (isNaN(ounces) || ounces < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const kilograms = ounces * 0.0283495;
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
  howItWorks: "Multiplies by 0.0283495, derived from the exact definition of one ounce as 28.349523125 grams.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 16 Ounces (oz) to Kilograms (kg).",
      inputs: { ounces: 16 },
      result: "16 oz (1 lb) equals approximately 0.4536 kg.",
    },
    {
      title: "Example 2",
      description: "Converting 1 Ounces (oz) to Kilograms (kg).",
      inputs: { ounces: 1 },
      result: "1 oz equals approximately 0.02835 kg.",
    },
  ],
  faqs: [
    {
      question: "How many kilograms in an ounce?",
      answer: "One avoirdupois ounce equals approximately 0.0283495 kg.",
    },
    {
      question: "Is this for avoirdupois or troy ounces?",
      answer: "Avoirdupois ounces — the standard everyday unit, not the troy ounce used for precious metals.",
    },
    {
      question: "Is 16 oz exactly 1 pound?",
      answer: "Yes. There are exactly 16 avoirdupois ounces in one pound.",
    },
  ],
  relatedSlugs: ["kilograms-to-ounces-calculator", "pounds-to-kilograms-calculator"],
};

export default def;
