import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "tablespoons-to-liters-calculator",
  title: "Tablespoons to Liters Calculator",
  shortTitle: "tbsp to L",
  description: "Convert US tablespoons to liters instantly.",
  longDescription:
    "Need to convert tablespoons to liters for a large batch recipe or storage container? This calculator multiplies by 0.0147868 — the volume of one US tablespoon in liters.",
  category: "conversions",
  keywords: ["tablespoons to liters", "tbsp to L", "volume converter", "cooking conversion"],
  inputs: [
    {
      type: "number",
      key: "tablespoons",
      label: "US Tablespoons (tbsp)",
      defaultValue: 16,
      min: 0,
      step: 1,
      placeholder: "16",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const tablespoons = Number(values.tablespoons);
    if (isNaN(tablespoons) || tablespoons < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const liters = tablespoons * 0.0147868;
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
  howItWorks: "Multiplies by 0.0147868, the US tablespoon volume in liters (14.7868 mL ÷ 1000).",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 US Tablespoons (tbsp) to Liters (L).",
      inputs: { tablespoons: 1 },
      result: "1 tbsp equals 0.014787 L.",
    },
    {
      title: "Example 2",
      description: "Converting 16 US Tablespoons (tbsp) to Liters (L).",
      inputs: { tablespoons: 16 },
      result: "16 tbsp (1 cup) equals approximately 0.2366 L.",
    },
  ],
  faqs: [
    {
      question: "How many liters in a tablespoon?",
      answer: "One US tablespoon equals approximately 0.0147868 liters (14.7868 mL).",
    },
    {
      question: "How many tablespoons in a cup?",
      answer: "16 US tablespoons equal 1 US cup.",
    },
    {
      question: "Is this for US tablespoons?",
      answer: "Yes. Australian tablespoons are 20 mL, slightly larger.",
    },
  ],
  relatedSlugs: ["liters-to-tablespoons-calculator", "teaspoons-to-liters-calculator"],
};

export default def;
