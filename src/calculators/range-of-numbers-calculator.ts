import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "range-of-numbers-calculator",
  title: "Range of Numbers Calculator",
  description: "Calculate the range (difference between the largest and smallest values) of up to six numbers.",
  longDescription: "The range of a dataset is simply the largest value minus the smallest value. It gives a quick measure of how spread out your data is. Enter up to six numbers to find the range instantly.",
  category: "life",
  keywords: ["range calculator", "number range", "max minus min", "data spread"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 5 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 15 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 25 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 35 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 45 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 55 },
  ],
  compute(values: InputValues): ComputeResult {
    const nums = [values.v1, values.v2, values.v3, values.v4, values.v5, values.v6].map(Number);
    if (nums.some(isNaN)) return { outputs: [], error: "Please enter valid numbers for all values." };
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const range = max - min;
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    return {
      outputs: [
        { key: "range", label: "Range", value: Number(range.toFixed(4)), format: "number", highlight: true },
        { key: "min", label: "Minimum", value: min, format: "number" },
        { key: "max", label: "Maximum", value: max, format: "number" },
        { key: "average", label: "Average", value: Number(avg.toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks: "The calculator identifies the largest and smallest values among all inputs, then subtracts the minimum from the maximum to produce the range.",
  examples: [
    {
      title: "Test scores",
      description: "Scores of 55, 70, 80, 85, 90, 95.",
      inputs: { v1: 55, v2: 70, v3: 80, v4: 85, v5: 90, v6: 95 },
      result: "Range = 95 − 55 = 40.",
    },
    {
      title: "All equal values",
      description: "Six values all equal to 50.",
      inputs: { v1: 50, v2: 50, v3: 50, v4: 50, v5: 50, v6: 50 },
      result: "Range = 0 (no spread).",
    },
  ],
  faqs: [
    { question: "Is a larger range always bad?", answer: "Not necessarily. A larger range simply indicates greater variability. Whether that is good or bad depends on context." },
    { question: "How is range different from standard deviation?", answer: "Range only uses the two extreme values. Standard deviation considers every value and gives a more complete picture of spread." },
  ],
  relatedSlugs: ["standard-deviation-simple-calculator", "average-calculator", "median-of-five-calculator"],
};

export default def;
