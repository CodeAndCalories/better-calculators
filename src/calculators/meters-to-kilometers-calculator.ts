import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-kilometers-calculator",
  title: "Meters to Kilometers Calculator",
  shortTitle: "m to km",
  description: "Convert meters to kilometers instantly.",
  longDescription: "One kilometer equals 1,000 meters, so divide any meter value by 1,000 to get kilometers. Useful for converting race distances, property measurements, and geographic scales.",
  category: "conversions",
  keywords: ["meters to kilometers", "m to km", "meter kilometer conversion"],
  inputs: [
    { type: "number", key: "value", label: "Meters (m)", defaultValue: 1000, min: 0, step: 10 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 1000;
    return {
      outputs: [
        { key: "result", label: "Kilometers (km)", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide meters by 1,000. 1 km = 1,000 m, so 1 m = 0.001 km.",
  examples: [
    { title: "1000 meters", description: "Exactly one kilometer.", inputs: { value: 1000 }, result: "1,000 m = 1 km" },
    { title: "400 meters", description: "Standard track lap.", inputs: { value: 400 }, result: "400 m = 0.4 km" },
  ],
  faqs: [
    { question: "How many km is 5,000 meters?", answer: "5,000 ÷ 1,000 = 5 km." },
    { question: "How many meters is a mile?", answer: "One mile ≈ 1,609.34 meters." },
  ],
  relatedSlugs: ["kilometers-to-meters-calculator", "meters-to-feet", "miles-to-km"],
};

export default def;
