import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "millimeters-to-centimeters-calculator",
  title: "Millimeters to Centimeters Calculator",
  shortTitle: "mm to cm",
  description: "Convert millimeters to centimeters instantly.",
  longDescription: "One centimeter equals 10 millimeters, so divide any millimeter value by 10 to get centimeters. Essential for precision engineering, woodworking, jewelry making, and medical measurements.",
  category: "conversions",
  keywords: ["millimeters to centimeters", "mm to cm", "millimeter centimeter conversion"],
  inputs: [
    { type: "number", key: "value", label: "Millimeters (mm)", defaultValue: 50, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 10;
    return {
      outputs: [
        { key: "result", label: "Centimeters (cm)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide millimeters by 10. 1 cm = 10 mm, so 1 mm = 0.1 cm.",
  examples: [
    { title: "10 mm", description: "One centimeter.", inputs: { value: 10 }, result: "10 mm = 1 cm" },
    { title: "25.4 mm", description: "One inch in mm.", inputs: { value: 25.4 }, result: "25.4 mm = 2.54 cm" },
  ],
  faqs: [
    { question: "How many mm is 1 cm?", answer: "Exactly 10 millimeters in one centimeter." },
    { question: "How many mm is 1 inch?", answer: "1 inch = 25.4 mm exactly." },
  ],
  relatedSlugs: ["centimeters-to-millimeters-calculator", "cm-to-inches", "inches-to-cm"],
};

export default def;
