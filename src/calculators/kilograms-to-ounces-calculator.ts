import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kilograms-to-ounces-calculator",
  title: "Kilograms to Ounces Calculator",
  shortTitle: "kg to oz",
  description: "Convert kilograms to ounces instantly.",
  longDescription:
    "Ounces are used in US cooking and postal measurements. This calculator multiplies your kilogram value by 35.274 to give the precise avoirdupois ounce equivalent.",
  category: "conversions",
  keywords: ["kilograms to ounces", "kg to oz", "weight converter", "mass conversion"],
  inputs: [
    {
      type: "number",
      key: "kilograms",
      label: "Kilograms (kg)",
      defaultValue: 1,
      min: 0,
      step: 0.01,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kilograms = Number(values.kilograms);
    if (isNaN(kilograms) || kilograms < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const ounces = kilograms * 35.274;
    return {
      outputs: [
        {
          key: "ounces",
          label: "Ounces (oz)",
          value: Number(ounces.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 35.274, derived from one ounce being exactly 28.349523125 grams.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Kilograms (kg) to Ounces (oz).",
      inputs: { kilograms: 1 },
      result: "1 kg equals approximately 35.274 oz.",
    },
    {
      title: "Example 2",
      description: "Converting 0.5 Kilograms (kg) to Ounces (oz).",
      inputs: { kilograms: 0.5 },
      result: "0.5 kg equals approximately 17.637 oz.",
    },
  ],
  faqs: [
    {
      question: "How many ounces in a kilogram?",
      answer: "Approximately 35.274 avoirdupois ounces.",
    },
    {
      question: "Is this the avoirdupois ounce?",
      answer: "Yes. This uses the standard avoirdupois ounce, not the troy ounce.",
    },
    {
      question: "Can I use this for cooking?",
      answer: "Yes — ingredient weights are often listed in ounces in US recipes.",
    },
  ],
  relatedSlugs: ["ounces-to-kilograms-calculator", "kilograms-to-pounds-calculator"],
};

export default def;
