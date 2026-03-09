import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "standard-deviation-simple-calculator",
  title: "Standard Deviation Calculator",
  description: "Calculate the population standard deviation and variance for up to six numbers.",
  longDescription: "Standard deviation measures how spread out numbers are from the mean. A low standard deviation means values cluster near the mean; a high one means they are spread widely. This calculator computes the population standard deviation for up to six values.",
  category: "life",
  keywords: ["standard deviation calculator", "variance calculator", "stats calculator", "spread of data"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 10 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 20 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 30 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 40 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 50 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 60 },
  ],
  compute(values: InputValues): ComputeResult {
    const nums = [values.v1, values.v2, values.v3, values.v4, values.v5, values.v6].map(Number);
    if (nums.some(isNaN)) return { outputs: [], error: "Please enter valid numbers for all values." };
    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const variance = nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    return {
      outputs: [
        { key: "stddev", label: "Standard Deviation", value: Number(stdDev.toFixed(4)), format: "number", highlight: true },
        { key: "variance", label: "Variance", value: Number(variance.toFixed(4)), format: "number" },
        { key: "mean", label: "Mean", value: Number(mean.toFixed(4)), format: "number" },
        { key: "count", label: "Count", value: n, format: "number" },
      ],
    };
  },
  howItWorks: "The mean of all values is calculated first. Then, each value's squared difference from the mean is averaged to produce the variance. The square root of the variance is the standard deviation.",
  examples: [
    {
      title: "Evenly spaced values",
      description: "Values 10, 20, 30, 40, 50, 60.",
      inputs: { v1: 10, v2: 20, v3: 30, v4: 40, v5: 50, v6: 60 },
      result: "Mean = 35, Variance = 291.67, Std Dev ≈ 17.08.",
    },
    {
      title: "All equal values",
      description: "Six values all equal to 25.",
      inputs: { v1: 25, v2: 25, v3: 25, v4: 25, v5: 25, v6: 25 },
      result: "Std Dev = 0, Variance = 0 (no spread).",
    },
  ],
  faqs: [
    { question: "What is the difference between population and sample standard deviation?", answer: "Population standard deviation divides by N (all values). Sample standard deviation divides by N−1 to correct for sample bias. This calculator uses the population formula." },
    { question: "What is variance?", answer: "Variance is the average of the squared differences from the mean. Standard deviation is simply the square root of variance, expressed in the same units as the original data." },
  ],
  relatedSlugs: ["range-of-numbers-calculator", "average-calculator", "median-of-five-calculator"],
};

export default def;
