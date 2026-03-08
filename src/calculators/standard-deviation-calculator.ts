import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "standard-deviation-calculator",
  title: "Standard Deviation Calculator",
  shortTitle: "Std Deviation",
  description: "Calculate population and sample standard deviation for up to 8 values.",
  category: "math",
  keywords: ["standard deviation calculator", "variance calculator", "statistics SD"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 2, step: 0.01 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 4, step: 0.01 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 4, step: 0.01 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 4, step: 0.01 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 5, step: 0.01 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 5, step: 0.01 },
    { type: "toggle", key: "use7", label: "Include Value 7", defaultValue: true },
    { type: "number", key: "v7", label: "Value 7", defaultValue: 7, step: 0.01 },
    { type: "toggle", key: "use8", label: "Include Value 8", defaultValue: true },
    { type: "number", key: "v8", label: "Value 8", defaultValue: 9, step: 0.01 },
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
    if (raw.length < 2) return { outputs: [], error: "At least 2 values are required." };
    const n = raw.length;
    const mean = raw.reduce((a, b) => a + b, 0) / n;
    const sumSq = raw.map((v) => Math.pow(v - mean, 2)).reduce((a, b) => a + b, 0);
    const populVar = sumSq / n;
    const sampleVar = sumSq / (n - 1);
    return {
      outputs: [
        { key: "sampleSD",  label: "Sample Std Dev (s)",       value: Math.round(Math.sqrt(sampleVar) * 10000) / 10000, format: "number", highlight: true },
        { key: "populSD",   label: "Population Std Dev (σ)",   value: Math.round(Math.sqrt(populVar)  * 10000) / 10000, format: "number" },
        { key: "sampleVar", label: "Sample Variance",          value: Math.round(sampleVar * 10000)   / 10000,          format: "number" },
        { key: "populVar",  label: "Population Variance",      value: Math.round(populVar  * 10000)   / 10000,          format: "number" },
        { key: "mean",      label: "Mean",                     value: Math.round(mean      * 10000)   / 10000,          format: "number" },
        { key: "count",     label: "Count",                    value: n,                                                 format: "number" },
      ],
    };
  },
  howItWorks: "Mean = sum / n. Variance = Σ(value − mean)² / n for population, or / (n−1) for sample. SD = √variance.",
  relatedSlugs: ["median-calculator", "range-calculator", "mode-calculator"],
};
export default def;
