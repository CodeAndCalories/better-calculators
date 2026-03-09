import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cups-to-liters-calculator",
  title: "Cups to Liters Calculator",
  shortTitle: "cups to L",
  description: "Convert US cups to liters instantly.",
  longDescription:
    "Need to convert a recipe from US cups to liters or milliliters? This calculator converts US customary cups to liters using the standard definition of one cup as 236.588 mL.",
  category: "conversions",
  keywords: ["cups to liters", "cups to L", "volume converter", "cooking conversion"],
  inputs: [
    {
      type: "number",
      key: "cups",
      label: "US Cups",
      defaultValue: 4,
      min: 0,
      step: 0.25,
      placeholder: "4",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const cups = Number(values.cups);
    if (isNaN(cups) || cups < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const liters = cups * 0.236588;
    return {
      outputs: [
        {
          key: "liters",
          label: "Liters (L)",
          value: Number(liters.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your cup value by 0.236588, which is the volume of one US customary cup in liters (236.588 mL ÷ 1000).",
  examples: [
    {
      title: "4 Cups of Milk",
      description: "Converting 4 US cups to liters.",
      inputs: { cups: 4 },
      result: "4 cups equals approximately 0.9464 L.",
    },
    {
      title: "Single Cup",
      description: "Converting 1 US cup to liters.",
      inputs: { cups: 1 },
      result: "1 cup equals approximately 0.2366 L.",
    },
  ],
  faqs: [
    {
      question: "How many liters are in a US cup?",
      answer: "One US cup equals approximately 0.236588 liters (236.588 mL).",
    },
    {
      question: "What if my recipe uses metric cups?",
      answer: "A metric cup is 250 mL. Use 0.25 liters per metric cup instead of this calculator's factor.",
    },
    {
      question: "Can I enter fractional cups?",
      answer: "Yes. Common fractions like 0.25, 0.5, or 0.75 work fine as decimal inputs.",
    },
  ],
  relatedSlugs: ["liters-to-cups-calculator"],
};

export default def;
