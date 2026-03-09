import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "centimeters-to-millimeters-calculator",
  title: "Centimeters to Millimeters Calculator",
  shortTitle: "cm to mm",
  description: "Convert centimeters to millimeters instantly.",
  longDescription: "One centimeter equals exactly 10 millimeters. This converter is widely used in engineering, drafting, medical imaging, and anywhere fine measurements matter.",
  category: "conversions",
  keywords: ["centimeters to millimeters", "cm to mm", "centimeter millimeter conversion"],
  inputs: [
    { type: "number", key: "value", label: "Centimeters (cm)", defaultValue: 10, min: 0, step: 0.1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 10;
    return {
      outputs: [
        { key: "result", label: "Millimeters (mm)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply centimeters by 10. 1 cm = 10 mm.",
  examples: [
    { title: "10 cm", description: "Standard ruler.", inputs: { value: 10 }, result: "10 cm = 100 mm" },
    { title: "2.54 cm", description: "One inch in centimeters.", inputs: { value: 2.54 }, result: "2.54 cm = 25.4 mm" },
  ],
  faqs: [
    { question: "How many mm is 5 cm?", answer: "5 × 10 = 50 mm." },
    { question: "How do I convert cm to meters?", answer: "Divide centimeters by 100. 100 cm = 1 m." },
  ],
  relatedSlugs: ["millimeters-to-centimeters-calculator", "cm-to-inches", "meters-to-kilometers-calculator"],
};

export default def;
