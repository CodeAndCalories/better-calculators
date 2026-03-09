import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kilometers-to-meters-calculator",
  title: "Kilometers to Meters Calculator",
  shortTitle: "km to m",
  description: "Convert kilometers to meters instantly.",
  longDescription: "One kilometer equals exactly 1,000 meters. This simple calculator converts distances in kilometers to meters — common in running, cycling, geography, and metric science.",
  category: "conversions",
  keywords: ["kilometers to meters", "km to m", "kilometer meter conversion"],
  inputs: [
    { type: "number", key: "value", label: "Kilometers (km)", defaultValue: 5, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 1000;
    return {
      outputs: [
        { key: "result", label: "Meters (m)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply kilometers by 1,000. The prefix 'kilo' means 1,000 in SI units.",
  examples: [
    { title: "5 km", description: "Common run distance.", inputs: { value: 5 }, result: "5 km = 5,000 m" },
    { title: "42.195 km", description: "Marathon distance.", inputs: { value: 42.195 }, result: "42.195 km = 42,195 m" },
  ],
  faqs: [
    { question: "How many meters in a kilometer?", answer: "Exactly 1,000 meters in one kilometer." },
    { question: "How many kilometers is a 1500 m race?", answer: "1,500 m ÷ 1,000 = 1.5 km." },
  ],
  relatedSlugs: ["meters-to-kilometers-calculator", "miles-to-km", "meters-to-feet"],
};

export default def;
