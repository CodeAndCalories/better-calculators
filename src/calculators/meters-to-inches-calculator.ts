import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-inches-calculator",
  title: "Meters to Inches Calculator",
  shortTitle: "m to in",
  description: "Convert meters to inches instantly.",
  longDescription: "One meter equals exactly 39.3701 inches. Use this calculator to convert any length in meters to its equivalent in inches — useful for engineering, construction, and everyday measurement conversions.",
  category: "conversions",
  keywords: ["meters to inches", "m to in", "meter inch conversion"],
  inputs: [
    { type: "number", key: "value", label: "Meters (m)", defaultValue: 1, min: 0, step: 0.01 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 39.3701;
    return {
      outputs: [
        { key: "result", label: "Inches (in)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply meters by 39.3701 to get inches. 1 meter = 39.3701 inches (exact: 1 m = 100/2.54 inches).",
  examples: [
    { title: "1 meter", description: "Convert 1 m to inches.", inputs: { value: 1 }, result: "1 m = 39.3701 in" },
    { title: "1.8 meters", description: "Average adult height.", inputs: { value: 1.8 }, result: "1.8 m = 70.866 in" },
  ],
  faqs: [
    { question: "How many inches are in a meter?", answer: "There are exactly 39.3701 inches in one meter." },
    { question: "How do I convert meters to feet and inches?", answer: "Divide the total inches by 12 to get feet, then take the remainder as inches." },
  ],
  relatedSlugs: ["inches-to-meters-calculator", "feet-to-inches-calculator", "meters-to-feet"],
};

export default def;
