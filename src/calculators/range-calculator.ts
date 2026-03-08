import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "range-calculator",
  title: "Range Calculator",
  shortTitle: "Range",
  description: "Calculate the statistical range (max minus min) for up to 8 numbers.",
  category: "math",
  keywords: ["range calculator", "min max", "statistical range", "data spread"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 5,  step: 0.01 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 12, step: 0.01 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 3,  step: 0.01 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 28, step: 0.01 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 7,  step: 0.01 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 19, step: 0.01 },
    { type: "toggle", key: "use7", label: "Include Value 7", defaultValue: false },
    { type: "number", key: "v7", label: "Value 7", defaultValue: 45, step: 0.01 },
    { type: "toggle", key: "use8", label: "Include Value 8", defaultValue: false },
    { type: "number", key: "v8", label: "Value 8", defaultValue: 2,  step: 0.01 },
  ],
  compute(values: InputValues): ComputeResult {
    const raw = [
      Number(values.v1), Number(values.v2), Number(values.v3),
      Number(values.v4), Number(values.v5), Number(values.v6),
    ];
    if (values.use7) raw.push(Number(values.v7));
    if (values.use8) raw.push(Number(values.v8));
    for (const n of raw) {
      if (!Number.isFinite(n)) return { outputs: [], error: "Please enter a valid number." };
    }
    const min = Math.min(...raw);
    const max = Math.max(...raw);
    const range = max - min;
    const mean = raw.reduce((a, b) => a + b, 0) / raw.length;
    const sorted = [...raw].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    return {
      outputs: [
        { key: "range",  label: "Range",   value: Math.round(range  * 10000) / 10000, format: "number", highlight: true },
        { key: "min",    label: "Minimum", value: Math.round(min    * 10000) / 10000, format: "number" },
        { key: "max",    label: "Maximum", value: Math.round(max    * 10000) / 10000, format: "number" },
        { key: "mean",   label: "Mean",    value: Math.round(mean   * 10000) / 10000, format: "number" },
        { key: "median", label: "Median",  value: Math.round(median * 10000) / 10000, format: "number" },
        { key: "count",  label: "Count",   value: raw.length,                          format: "number" },
      ],
    };
  },
  howItWorks: "Range = maximum − minimum. A complete summary of min, max, mean, and median is also provided.",
  relatedSlugs: ["median-calculator", "standard-deviation-calculator", "mode-calculator"],

  longDescription: "The range is the simplest measure of statistical spread — it is the difference between the largest and smallest values. A large range indicates high variability; a small range indicates the data is clustered together.",
  examples: [
    { title: "Values: 5, 12, 3, 28, 7, 19", description: "Max 28, min 3.", inputs: { v1: 5, v2: 12, v3: 3, v4: 28, v5: 7, v6: 19 }, result: "Range = 25." },
  ],
  faqs: [
    { question: "Is range a good measure of spread?", answer: "Range is simple but sensitive to outliers. For a more robust measure of spread, use standard deviation or interquartile range." },
  ],
};

export default def;
