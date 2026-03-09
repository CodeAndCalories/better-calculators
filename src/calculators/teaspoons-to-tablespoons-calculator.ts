import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "teaspoons-to-tablespoons-calculator",
  title: "Teaspoons to Tablespoons Calculator",
  shortTitle: "tsp to tbsp",
  description: "Convert teaspoons to tablespoons instantly.",
  longDescription: "Three teaspoons make one tablespoon. This converter is handy when scaling recipes up or down, or when you only have a tablespoon measure available and need to know how many teaspoons to use.",
  category: "conversions",
  keywords: ["teaspoons to tablespoons", "tsp to tbsp", "teaspoon tablespoon conversion"],
  inputs: [
    { type: "number", key: "value", label: "Teaspoons (tsp)", defaultValue: 6, min: 0, step: 0.5 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 3;
    return {
      outputs: [
        { key: "result", label: "Tablespoons (tbsp)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide teaspoons by 3. 3 teaspoons = 1 tablespoon.",
  examples: [
    { title: "3 teaspoons", description: "Equals 1 tablespoon.", inputs: { value: 3 }, result: "3 tsp = 1 tbsp" },
    { title: "9 teaspoons", description: "Equals 3 tablespoons.", inputs: { value: 9 }, result: "9 tsp = 3 tbsp" },
  ],
  faqs: [
    { question: "How many teaspoons are in a tablespoon?", answer: "3 teaspoons = 1 tablespoon." },
    { question: "How many teaspoons are in a cup?", answer: "48 teaspoons = 1 US cup (16 tbsp × 3 tsp)." },
  ],
  relatedSlugs: ["tablespoons-to-teaspoons-calculator", "cups-to-ml-calculator", "ml-to-cups-calculator"],
};

export default def;
