import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "liters-to-cups-calculator",
  title: "Liters to Cups Calculator",
  shortTitle: "L to cups",
  description: "Convert liters to US cups instantly.",
  longDescription:
    "When cooking or baking with international recipes, you may need to convert liters to US cups. This calculator uses the standard US cup of 236.588 mL to give you a precise conversion every time.",
  category: "conversions",
  keywords: ["liters to cups", "L to cups", "volume converter", "cooking conversion"],
  inputs: [
    {
      type: "number",
      key: "liters",
      label: "Liters (L)",
      defaultValue: 1,
      min: 0,
      step: 0.01,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const liters = Number(values.liters);
    if (isNaN(liters) || liters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const cups = liters * 4.22675;
    return {
      outputs: [
        {
          key: "cups",
          label: "US Cups",
          value: Number(cups.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your liter value by 4.22675, derived from the US cup definition of exactly 236.5882365 mL (half a US pint).",
  examples: [
    {
      title: "One Liter of Water",
      description: "Converting 1 liter to US cups.",
      inputs: { liters: 1 },
      result: "1 L equals approximately 4.2268 cups.",
    },
    {
      title: "Large Pot of Soup",
      description: "Converting 3 liters of soup to cups.",
      inputs: { liters: 3 },
      result: "3 L equals approximately 12.68 cups.",
    },
  ],
  faqs: [
    {
      question: "How many cups are in a liter?",
      answer: "There are approximately 4.22675 US cups in one liter.",
    },
    {
      question: "Does this use US cups or metric cups?",
      answer: "This calculator uses the US customary cup (236.588 mL). The metric cup is 250 mL and gives a slightly different result.",
    },
    {
      question: "Can I use this for cooking?",
      answer: "Yes. It's ideal for adapting metric recipes to US cup measurements.",
    },
  ],
  relatedSlugs: ["cups-to-liters-calculator"],
};

export default def;
