import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "feet-to-inches-calculator",
  title: "Feet to Inches Calculator",
  shortTitle: "ft to in",
  description: "Convert feet to inches instantly.",
  longDescription: "One foot contains exactly 12 inches. This simple converter lets you convert any measurement in feet to its equivalent in inches — useful for height, construction, and carpentry calculations.",
  category: "conversions",
  keywords: ["feet to inches", "ft to in", "foot to inch"],
  inputs: [
    { type: "number", key: "value", label: "Feet (ft)", defaultValue: 6, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 12;
    return {
      outputs: [
        { key: "result", label: "Inches (in)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply feet by 12. There are exactly 12 inches in one foot.",
  examples: [
    { title: "6 feet", description: "Typical adult height in feet.", inputs: { value: 6 }, result: "6 ft = 72 in" },
    { title: "5.5 feet", description: "5 feet 6 inches.", inputs: { value: 5.5 }, result: "5.5 ft = 66 in" },
  ],
  faqs: [
    { question: "How many inches are in a foot?", answer: "There are exactly 12 inches in one foot." },
    { question: "How do I convert 5 feet 10 inches to just inches?", answer: "Multiply 5 by 12 to get 60, then add 10 for a total of 70 inches." },
  ],
  relatedSlugs: ["inches-to-feet-calculator", "meters-to-inches-calculator", "yards-to-feet-calculator"],
};

export default def;
