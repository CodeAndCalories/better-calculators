import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "median-of-ten-calculator",
  title: "Median of Ten Numbers Calculator",
  description: "Find the median of exactly ten numbers.",
  longDescription: "For an even count of values, the median is the average of the two middle values. With ten numbers, the median is the mean of the 5th and 6th values after sorting.",
  category: "life",
  keywords: ["median of ten", "median ten numbers", "even median", "middle value"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 10 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 20 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 30 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 40 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 50 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 60 },
    { type: "number", key: "v7", label: "Value 7", defaultValue: 70 },
    { type: "number", key: "v8", label: "Value 8", defaultValue: 80 },
    { type: "number", key: "v9", label: "Value 9", defaultValue: 90 },
    { type: "number", key: "v10", label: "Value 10", defaultValue: 100 },
  ],
  compute(values: InputValues): ComputeResult {
    const nums = [values.v1, values.v2, values.v3, values.v4, values.v5,
                  values.v6, values.v7, values.v8, values.v9, values.v10].map(Number);
    if (nums.some(isNaN)) return { outputs: [], error: "Please enter valid numbers for all ten values." };
    const sorted = [...nums].sort((a, b) => a - b);
    const median = (sorted[4] + sorted[5]) / 2;
    const sum = nums.reduce((a, b) => a + b, 0);
    return {
      outputs: [
        { key: "median", label: "Median", value: Number(median.toFixed(4)), format: "number", highlight: true },
        { key: "min", label: "Minimum", value: sorted[0], format: "number" },
        { key: "max", label: "Maximum", value: sorted[9], format: "number" },
        { key: "sum", label: "Sum", value: Number(sum.toFixed(4)), format: "number" },
        { key: "average", label: "Average (Mean)", value: Number((sum / 10).toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks: "The ten values are sorted in ascending order. Because ten is an even number, the median is calculated as the average of the 5th and 6th sorted values.",
  examples: [
    {
      title: "Sequential values",
      description: "Median of 10 through 100 in steps of 10.",
      inputs: { v1: 10, v2: 20, v3: 30, v4: 40, v5: 50, v6: 60, v7: 70, v8: 80, v9: 90, v10: 100 },
      result: "The 5th value is 50 and 6th is 60, so median = (50+60)/2 = 55.",
    },
  ],
  faqs: [
    { question: "Why is the median an average of two numbers?", answer: "When you have an even count of values, there is no single middle number. The median is defined as the average of the two central values." },
    { question: "When should I use median instead of mean?", answer: "Use the median when your data has outliers or is skewed, as it better represents the typical value." },
  ],
  relatedSlugs: ["median-of-five-calculator", "average-calculator", "standard-deviation-simple-calculator"],
};

export default def;
