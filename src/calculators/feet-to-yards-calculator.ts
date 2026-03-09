import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "feet-to-yards-calculator",
  title: "Feet to Yards Calculator",
  shortTitle: "ft to yd",
  description: "Convert feet to yards instantly.",
  longDescription: "Three feet make one yard. This calculator converts any length in feet to yards — great for fabric purchases, landscaping estimates, and sports field measurements.",
  category: "conversions",
  keywords: ["feet to yards", "ft to yd", "foot to yard conversion"],
  inputs: [
    { type: "number", key: "value", label: "Feet (ft)", defaultValue: 9, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 3;
    return {
      outputs: [
        { key: "result", label: "Yards (yd)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide feet by 3. One yard = 3 feet, so 1 foot = 0.3333... yards.",
  examples: [
    { title: "9 feet", description: "A standard room dimension.", inputs: { value: 9 }, result: "9 ft = 3 yd" },
    { title: "5280 feet", description: "One mile.", inputs: { value: 5280 }, result: "5280 ft = 1760 yd" },
  ],
  faqs: [
    { question: "How many yards is 15 feet?", answer: "15 ÷ 3 = 5 yards." },
    { question: "How many yards of fabric is 12 feet?", answer: "12 ÷ 3 = 4 yards of fabric." },
  ],
  relatedSlugs: ["yards-to-feet-calculator", "feet-to-inches-calculator", "feet-to-miles-calculator"],
};

export default def;
