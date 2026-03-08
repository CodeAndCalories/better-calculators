import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "median-calculator",
  title: "Median Calculator",
  shortTitle: "Median",
  description: "Find the median of up to 8 numbers.",
  category: "math",
  keywords: ["median calculator", "middle number", "statistics median"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 4,  step: 0.01 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 8,  step: 0.01 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 15, step: 0.01 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 16, step: 0.01 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 23, step: 0.01 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 42, step: 0.01 },
    { type: "toggle", key: "use7", label: "Include Value 7", defaultValue: false },
    { type: "number", key: "v7", label: "Value 7", defaultValue: 50, step: 0.01 },
    { type: "toggle", key: "use8", label: "Include Value 8", defaultValue: false },
    { type: "number", key: "v8", label: "Value 8", defaultValue: 60, step: 0.01 },
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
    const sorted = [...raw].sort((a, b) => a - b);
    const len = sorted.length;
    const mid = Math.floor(len / 2);
    const median = len % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const mean = raw.reduce((a, b) => a + b, 0) / len;
    return {
      outputs: [
        { key: "median", label: "Median",         value: Math.round(median * 10000) / 10000, format: "number", highlight: true },
        { key: "mean",   label: "Mean",            value: Math.round(mean   * 10000) / 10000, format: "number" },
        { key: "count",  label: "Count",           value: len,                                format: "number" },
        { key: "min",    label: "Minimum",         value: sorted[0],                          format: "number" },
        { key: "max",    label: "Maximum",         value: sorted[len - 1],                    format: "number" },
      ],
    };
  },
  howItWorks: "Values are sorted ascending. For odd count the median is the middle value; for even count it is the average of the two middle values.",
  relatedSlugs: ["mode-calculator", "range-calculator", "standard-deviation-calculator"],
};
export default def;
