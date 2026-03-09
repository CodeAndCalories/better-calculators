import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "random-number-range-calculator",
  title: "Random Number Range Calculator",
  description: "Find out how many integers exist within a given range and the total count of possible values.",
  longDescription: "Enter a minimum and maximum value to instantly see the count of integers in that range, the midpoint, and the total spread. Useful for probability, game design, or statistical sampling planning.",
  category: "life",
  keywords: ["random number range", "integer count in range", "range size calculator", "number range"],
  inputs: [
    { type: "number", key: "min", label: "Minimum Value", defaultValue: 1, step: 1 },
    { type: "number", key: "max", label: "Maximum Value", defaultValue: 100, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const min = Math.round(Number(values.min));
    const max = Math.round(Number(values.max));
    if (isNaN(min) || isNaN(max)) return { outputs: [], error: "Please enter valid numbers." };
    if (min >= max) return { outputs: [], error: "Maximum must be greater than minimum." };
    const count = max - min + 1;
    const midpoint = (min + max) / 2;
    const spread = max - min;
    return {
      outputs: [
        { key: "count", label: "Total Integers in Range", value: count, format: "number", highlight: true },
        { key: "spread", label: "Spread (Max − Min)", value: spread, format: "number" },
        { key: "midpoint", label: "Midpoint", value: midpoint, format: "number" },
        { key: "probability", label: "Probability of Any One Value (%)", value: Number(((1 / count) * 100).toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks: "The total count of integers is max − min + 1 (inclusive of both endpoints). The midpoint is (min + max) / 2. The probability of picking any single value at random is 1 ÷ count × 100.",
  examples: [
    {
      title: "Standard dice roll",
      description: "Range 1 to 6.",
      inputs: { min: 1, max: 6 },
      result: "6 integers, spread of 5, midpoint 3.5, each value has a 16.67% chance.",
    },
    {
      title: "Large lottery range",
      description: "Range 1 to 49.",
      inputs: { min: 1, max: 49 },
      result: "49 integers, each with a 2.04% probability.",
    },
  ],
  faqs: [
    { question: "Are both endpoints included?", answer: "Yes. The count formula is max − min + 1, which includes both the minimum and maximum values." },
    { question: "Does this actually generate a random number?", answer: "No. This calculator analyses the properties of a range. To generate a random number, use your device's built-in randomiser." },
  ],
  relatedSlugs: ["range-of-numbers-calculator", "average-calculator", "median-of-five-calculator"],
};

export default def;
