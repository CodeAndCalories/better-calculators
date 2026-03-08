import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mode-calculator",
  title: "Mode Calculator",
  shortTitle: "Mode",
  description: "Find the most frequently occurring value in a set of up to 8 numbers.",
  category: "math",
  keywords: ["mode calculator", "most common number", "statistics mode", "frequency"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 3, step: 0.01 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 7, step: 0.01 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 3, step: 0.01 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 9, step: 0.01 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 3, step: 0.01 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 7, step: 0.01 },
    { type: "toggle", key: "use7", label: "Include Value 7", defaultValue: false },
    { type: "number", key: "v7", label: "Value 7", defaultValue: 5, step: 0.01 },
    { type: "toggle", key: "use8", label: "Include Value 8", defaultValue: false },
    { type: "number", key: "v8", label: "Value 8", defaultValue: 3, step: 0.01 },
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
    const freq: Record<string, number> = {};
    for (const n of raw) freq[String(n)] = (freq[String(n)] ?? 0) + 1;
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.entries(freq)
      .filter(([, f]) => f === maxFreq)
      .map(([v]) => Number(v))
      .sort((a, b) => a - b);
    const noMode = maxFreq === 1;
    return {
      outputs: [
        { key: "mode",       label: "Mode",            value: noMode ? "No mode" : modes.join(", "), format: "text",   highlight: true },
        { key: "frequency",  label: "Frequency",       value: maxFreq,                               format: "number" },
        { key: "multimodal", label: "Multimodal",      value: modes.length > 1 ? "Yes" : "No",       format: "text"   },
        { key: "count",      label: "Total Values",    value: raw.length,                             format: "number" },
      ],
    };
  },
  howItWorks: "Each value's frequency is tallied. The value(s) with the highest frequency are the mode. If all values appear once there is no mode.",
  relatedSlugs: ["median-calculator", "range-calculator", "standard-deviation-calculator"],
};
export default def;
