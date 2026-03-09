import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "liters-to-teaspoons-calculator",
  title: "Liters to Teaspoons Calculator",
  shortTitle: "L to tsp",
  description: "Convert liters to US teaspoons instantly.",
  longDescription:
    "Teaspoons are a standard unit in US cooking. This calculator converts liters to US teaspoons using the standard definition of one teaspoon as 4.92892 mL.",
  category: "conversions",
  keywords: ["liters to teaspoons", "L to tsp", "volume converter", "cooking conversion"],
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
    const teaspoons = liters * 202.884;
    return {
      outputs: [
        {
          key: "teaspoons",
          label: "US Teaspoons (tsp)",
          value: Number(teaspoons.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 202.884, derived from 1 US teaspoon = 4.92892 mL (1000 ÷ 4.92892 ≈ 202.884).",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Liters (L) to US Teaspoons (tsp).",
      inputs: { liters: 1 },
      result: "1 L equals approximately 202.884 tsp.",
    },
    {
      title: "Example 2",
      description: "Converting 0.1 Liters (L) to US Teaspoons (tsp).",
      inputs: { liters: 0.1 },
      result: "0.1 L equals approximately 20.288 tsp.",
    },
  ],
  faqs: [
    {
      question: "How many teaspoons in a liter?",
      answer: "Approximately 202.884 US teaspoons.",
    },
    {
      question: "How do teaspoons relate to tablespoons?",
      answer: "3 US teaspoons equal 1 US tablespoon.",
    },
    {
      question: "Does this use US teaspoons?",
      answer: "Yes. The US teaspoon is 4.92892 mL. UK and metric teaspoons may differ slightly.",
    },
  ],
  relatedSlugs: ["teaspoons-to-liters-calculator", "liters-to-tablespoons-calculator"],
};

export default def;
