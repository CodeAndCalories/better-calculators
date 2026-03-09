import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ml-to-liters-calculator",
  title: "Milliliters to Liters Calculator",
  shortTitle: "mL to L",
  description: "Convert milliliters to liters instantly.",
  longDescription: "One liter equals 1,000 milliliters, so one milliliter equals 0.001 liters. Use this calculator to convert small liquid measurements in milliliters to liters — essential for chemistry, cooking, and hydration tracking.",
  category: "conversions",
  keywords: ["milliliters to liters", "ml to l", "mL to L conversion"],
  inputs: [
    { type: "number", key: "value", label: "Milliliters (mL)", defaultValue: 500, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 1000;
    return {
      outputs: [
        { key: "result", label: "Liters (L)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide milliliters by 1,000. The prefix 'milli' means 1/1000.",
  examples: [
    { title: "500 mL", description: "Standard water bottle.", inputs: { value: 500 }, result: "500 mL = 0.5 L" },
    { title: "250 mL", description: "One cup approximate.", inputs: { value: 250 }, result: "250 mL = 0.25 L" },
  ],
  faqs: [
    { question: "How many mL is 1 liter?", answer: "1 liter = 1,000 milliliters." },
    { question: "How many mL is a standard drink?", answer: "A standard beverage serving is typically 355 mL (12 fl oz) for beer." },
  ],
  relatedSlugs: ["liters-to-ml-calculator", "cups-to-ml-calculator", "liters-to-gallons"],
};

export default def;
