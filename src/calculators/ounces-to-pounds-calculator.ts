import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ounces-to-pounds-calculator",
  title: "Ounces to Pounds Calculator",
  shortTitle: "oz to lb",
  description: "Convert ounces to pounds instantly.",
  longDescription: "One pound equals 16 ounces, so one ounce equals 0.0625 pounds. Use this converter to turn ounce measurements into pounds — common in cooking, shipping, and food packaging.",
  category: "conversions",
  keywords: ["ounces to pounds", "oz to lb", "ounce pound conversion"],
  inputs: [
    { type: "number", key: "value", label: "Ounces (oz)", defaultValue: 16, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 16;
    return {
      outputs: [
        { key: "result", label: "Pounds (lb)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide ounces by 16. 1 oz = 1/16 lb = 0.0625 lb.",
  examples: [
    { title: "16 ounces", description: "Exactly one pound.", inputs: { value: 16 }, result: "16 oz = 1 lb" },
    { title: "8 ounces", description: "Half a pound.", inputs: { value: 8 }, result: "8 oz = 0.5 lb" },
  ],
  faqs: [
    { question: "How many pounds is 32 ounces?", answer: "32 ÷ 16 = 2 pounds." },
    { question: "How do I convert ounces to kilograms?", answer: "Divide ounces by 35.274 to get kilograms." },
  ],
  relatedSlugs: ["pounds-to-ounces-calculator", "ounces-to-grams", "lbs-to-kg"],
};

export default def;
