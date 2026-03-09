import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "liters-to-tablespoons-calculator",
  title: "Liters to Tablespoons Calculator",
  shortTitle: "L to tbsp",
  description: "Convert liters to US tablespoons instantly.",
  longDescription:
    "Tablespoons are a common cooking measure in the US. This calculator converts liters to US tablespoons using the standard definition of one tablespoon as 14.7868 mL.",
  category: "conversions",
  keywords: ["liters to tablespoons", "L to tbsp", "volume converter", "cooking conversion"],
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
    const tablespoons = liters * 67.628;
    return {
      outputs: [
        {
          key: "tablespoons",
          label: "US Tablespoons (tbsp)",
          value: Number(tablespoons.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 67.628, derived from 1 US tablespoon = 14.7868 mL (so 1000 mL ÷ 14.7868 ≈ 67.628).",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Liters (L) to US Tablespoons (tbsp).",
      inputs: { liters: 1 },
      result: "1 L equals approximately 67.628 tbsp.",
    },
    {
      title: "Example 2",
      description: "Converting 0.25 Liters (L) to US Tablespoons (tbsp).",
      inputs: { liters: 0.25 },
      result: "0.25 L equals approximately 16.907 tbsp.",
    },
  ],
  faqs: [
    {
      question: "How many tablespoons in a liter?",
      answer: "Approximately 67.628 US tablespoons.",
    },
    {
      question: "Does this use US tablespoons?",
      answer: "Yes. The US tablespoon is 14.7868 mL. Australian and UK tablespoons differ.",
    },
    {
      question: "Can I use this for recipes?",
      answer: "Yes — great for scaling down metric recipes to tablespoon measures.",
    },
  ],
  relatedSlugs: ["tablespoons-to-liters-calculator", "liters-to-teaspoons-calculator"],
};

export default def;
