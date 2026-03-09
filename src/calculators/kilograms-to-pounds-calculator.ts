import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kilograms-to-pounds-calculator",
  title: "Kilograms to Pounds Calculator",
  shortTitle: "kg to lbs",
  description: "Convert kilograms to pounds instantly.",
  longDescription:
    "Body weight, luggage limits, and gym equipment are often listed in both kilograms and pounds. This calculator applies the precise factor of 2.20462 lbs per kg.",
  category: "conversions",
  keywords: ["kilograms to pounds", "kg to lbs", "weight converter", "mass conversion"],
  inputs: [
    {
      type: "number",
      key: "kilograms",
      label: "Kilograms (kg)",
      defaultValue: 70,
      min: 0,
      step: 0.1,
      placeholder: "70",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kilograms = Number(values.kilograms);
    if (isNaN(kilograms) || kilograms < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const pounds = kilograms * 2.20462;
    return {
      outputs: [
        {
          key: "pounds",
          label: "Pounds (lbs)",
          value: Number(pounds.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 2.20462, derived from the exact pound definition of 0.45359237 kg.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 70 Kilograms (kg) to Pounds (lbs).",
      inputs: { kilograms: 70 },
      result: "70 kg equals approximately 154.32 lbs.",
    },
    {
      title: "Example 2",
      description: "Converting 100 Kilograms (kg) to Pounds (lbs).",
      inputs: { kilograms: 100 },
      result: "100 kg equals 220.46 lbs.",
    },
  ],
  faqs: [
    {
      question: "How many pounds in a kilogram?",
      answer: "Approximately 2.20462 pounds.",
    },
    {
      question: "Is this exact?",
      answer: "The factor 2.20462 is a rounded approximation. The exact value is 1 / 0.45359237.",
    },
    {
      question: "Can I use this for body weight?",
      answer: "Yes — enter your weight in kg to get the equivalent in lbs.",
    },
  ],
  relatedSlugs: ["pounds-to-kilograms-calculator", "kilograms-to-ounces-calculator"],
};

export default def;
