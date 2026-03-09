import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "tablespoons-to-teaspoons-calculator",
  title: "Tablespoons to Teaspoons Calculator",
  shortTitle: "tbsp to tsp",
  description: "Convert tablespoons to teaspoons instantly.",
  longDescription: "One tablespoon equals exactly 3 teaspoons. This is one of the most common cooking conversions — use it whenever a recipe gives tablespoons but your measuring spoon is in teaspoons.",
  category: "conversions",
  keywords: ["tablespoons to teaspoons", "tbsp to tsp", "tablespoon teaspoon conversion"],
  inputs: [
    { type: "number", key: "value", label: "Tablespoons (tbsp)", defaultValue: 2, min: 0, step: 0.5 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 3;
    return {
      outputs: [
        { key: "result", label: "Teaspoons (tsp)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply tablespoons by 3. 1 tablespoon = 3 teaspoons (US customary).",
  examples: [
    { title: "1 tablespoon", description: "Single tablespoon.", inputs: { value: 1 }, result: "1 tbsp = 3 tsp" },
    { title: "4 tablespoons", description: "Quarter cup.", inputs: { value: 4 }, result: "4 tbsp = 12 tsp" },
  ],
  faqs: [
    { question: "How many teaspoons in a tablespoon?", answer: "Exactly 3 teaspoons per tablespoon (US)." },
    { question: "How many tablespoons are in a cup?", answer: "16 tablespoons = 1 US cup." },
  ],
  relatedSlugs: ["teaspoons-to-tablespoons-calculator", "cups-to-ml-calculator", "ml-to-cups-calculator"],
};

export default def;
