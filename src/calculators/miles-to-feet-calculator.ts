import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "miles-to-feet-calculator",
  title: "Miles to Feet Calculator",
  shortTitle: "mi to ft",
  description: "Convert miles to feet instantly.",
  longDescription: "One mile equals exactly 5,280 feet. Use this calculator to convert distances in miles to feet — useful for running distances, engineering projects, and geography calculations.",
  category: "conversions",
  keywords: ["miles to feet", "mi to ft", "mile to foot conversion"],
  inputs: [
    { type: "number", key: "value", label: "Miles (mi)", defaultValue: 1, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 5280;
    return {
      outputs: [
        { key: "result", label: "Feet (ft)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply miles by 5,280. One mile = 5,280 feet = 1,760 yards.",
  examples: [
    { title: "1 mile", description: "A classic running distance.", inputs: { value: 1 }, result: "1 mi = 5,280 ft" },
    { title: "26.2 miles", description: "Marathon distance.", inputs: { value: 26.2 }, result: "26.2 mi = 138,336 ft" },
  ],
  faqs: [
    { question: "Why are there 5,280 feet in a mile?", answer: "The statute mile was historically set at 8 furlongs, each 660 feet, giving 8 × 660 = 5,280 feet." },
    { question: "How many feet is a half mile?", answer: "0.5 × 5,280 = 2,640 feet." },
  ],
  relatedSlugs: ["feet-to-miles-calculator", "yards-to-feet-calculator", "miles-to-km"],
};

export default def;
