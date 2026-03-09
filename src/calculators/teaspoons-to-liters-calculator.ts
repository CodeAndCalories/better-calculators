import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "teaspoons-to-liters-calculator",
  title: "Teaspoons to Liters Calculator",
  shortTitle: "tsp to L",
  description: "Convert US teaspoons to liters instantly.",
  longDescription:
    "Need to scale a teaspoon-based recipe up to liters? This calculator multiplies by 0.00492892 — the volume of one US teaspoon in liters.",
  category: "conversions",
  keywords: ["teaspoons to liters", "tsp to L", "volume converter", "cooking conversion"],
  inputs: [
    {
      type: "number",
      key: "teaspoons",
      label: "US Teaspoons (tsp)",
      defaultValue: 48,
      min: 0,
      step: 1,
      placeholder: "48",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const teaspoons = Number(values.teaspoons);
    if (isNaN(teaspoons) || teaspoons < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const liters = teaspoons * 0.00492892;
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
  howItWorks: "Multiplies by 0.00492892, the US teaspoon volume in liters (4.92892 mL ÷ 1000).",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 US Teaspoons (tsp) to Liters (L).",
      inputs: { teaspoons: 1 },
      result: "1 tsp equals 0.004929 L.",
    },
    {
      title: "Example 2",
      description: "Converting 48 US Teaspoons (tsp) to Liters (L).",
      inputs: { teaspoons: 48 },
      result: "48 tsp (1 cup) equals approximately 0.2366 L.",
    },
  ],
  faqs: [
    {
      question: "How many liters in a teaspoon?",
      answer: "One US teaspoon equals approximately 0.00492892 liters.",
    },
    {
      question: "How many teaspoons in a cup?",
      answer: "48 US teaspoons equal 1 US cup.",
    },
    {
      question: "Is this for US teaspoons?",
      answer: "Yes. The US teaspoon is 4.92892 mL.",
    },
  ],
  relatedSlugs: ["liters-to-teaspoons-calculator", "tablespoons-to-liters-calculator"],
};

export default def;
