import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "median-of-five-calculator",
  title: "Median of Five Numbers Calculator",
  description: "Find the median (middle value) of exactly five numbers.",
  longDescription: "The median is the middle value when a set of numbers is sorted in order. For five numbers, the median is the third value after sorting. This calculator finds the median of five inputs.",
  category: "life",
  keywords: ["median of five", "median calculator", "middle value", "find median"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 10 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 20 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 30 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 40 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 50 },
  ],
  compute(values: InputValues): ComputeResult {
    const nums = [values.v1, values.v2, values.v3, values.v4, values.v5].map(Number);
    if (nums.some(isNaN)) return { outputs: [], error: "Please enter valid numbers for all five values." };
    const sorted = [...nums].sort((a, b) => a - b);
    const median = sorted[2];
    const sum = nums.reduce((a, b) => a + b, 0);
    return {
      outputs: [
        { key: "median", label: "Median", value: median, format: "number", highlight: true },
        { key: "min", label: "Minimum", value: sorted[0], format: "number" },
        { key: "max", label: "Maximum", value: sorted[4], format: "number" },
        { key: "sum", label: "Sum", value: Number(sum.toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks: "All five values are sorted from smallest to largest. The third value in that sorted list is the median — the true middle value.",
  examples: [
    {
      title: "Simple sequence",
      description: "Finding the median of 10, 20, 30, 40, 50.",
      inputs: { v1: 10, v2: 20, v3: 30, v4: 40, v5: 50 },
      result: "The median is 30.",
    },
    {
      title: "Unsorted values",
      description: "Median of 5, 100, 3, 77, 42.",
      inputs: { v1: 5, v2: 100, v3: 3, v4: 77, v5: 42 },
      result: "Sorted: 3, 5, 42, 77, 100. The median is 42.",
    },
  ],
  faqs: [
    { question: "What is the median?", answer: "The median is the middle value of a sorted dataset. Half the values are above it and half are below." },
    { question: "How is median different from average?", answer: "The average sums all values and divides by count. The median simply finds the middle value and is less affected by extreme outliers." },
  ],
  relatedSlugs: ["median-of-ten-calculator", "average-calculator", "range-of-numbers-calculator"],
};

export default def;
