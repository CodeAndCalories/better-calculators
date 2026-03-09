import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mode-of-numbers-calculator",
  title: "Mode of Numbers Calculator",
  description: "Find the mode (most frequently occurring value) from up to six numbers.",
  longDescription: "The mode is the value that appears most often in a dataset. This calculator accepts up to six numbers and identifies the mode. If all values are unique, the dataset has no mode.",
  category: "life",
  keywords: ["mode calculator", "most frequent value", "find mode", "statistics mode"],
  inputs: [
    { type: "number", key: "v1", label: "Value 1", defaultValue: 5 },
    { type: "number", key: "v2", label: "Value 2", defaultValue: 3 },
    { type: "number", key: "v3", label: "Value 3", defaultValue: 5 },
    { type: "number", key: "v4", label: "Value 4", defaultValue: 7 },
    { type: "number", key: "v5", label: "Value 5", defaultValue: 5 },
    { type: "number", key: "v6", label: "Value 6", defaultValue: 2 },
  ],
  compute(values: InputValues): ComputeResult {
    const nums = [values.v1, values.v2, values.v3, values.v4, values.v5, values.v6].map(Number);
    if (nums.some(isNaN)) return { outputs: [], error: "Please enter valid numbers for all values." };

    const freq: Record<number, number> = {};
    for (const n of nums) freq[n] = (freq[n] ?? 0) + 1;
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter((k) => freq[Number(k)] === maxFreq).map(Number);

    const isNoMode = modes.length === nums.length;
    const modeValue = isNoMode ? "No mode (all values unique)" : modes.join(", ");

    return {
      outputs: [
        { key: "mode", label: "Mode", value: modeValue, format: "text", highlight: true },
        { key: "frequency", label: "Frequency of Mode", value: isNoMode ? 1 : maxFreq, format: "number" },
        { key: "count", label: "Total Values", value: nums.length, format: "number" },
      ],
    };
  },
  howItWorks: "Each value's frequency is counted. The value (or values) with the highest frequency is the mode. If every value appears exactly once, the dataset has no mode.",
  examples: [
    {
      title: "Clear single mode",
      description: "Values 5, 3, 5, 7, 5, 2 — 5 appears three times.",
      inputs: { v1: 5, v2: 3, v3: 5, v4: 7, v5: 5, v6: 2 },
      result: "The mode is 5 with a frequency of 3.",
    },
    {
      title: "All unique values",
      description: "Values 1, 2, 3, 4, 5, 6.",
      inputs: { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6 },
      result: "No mode — all values appear exactly once.",
    },
  ],
  faqs: [
    { question: "Can a dataset have more than one mode?", answer: "Yes. If two or more values share the highest frequency, the dataset is bimodal or multimodal." },
    { question: "What if all values are the same?", answer: "If every value is identical, that value is the mode with a frequency equal to the total count." },
  ],
  relatedSlugs: ["median-of-five-calculator", "average-calculator", "range-of-numbers-calculator"],
};

export default def;
