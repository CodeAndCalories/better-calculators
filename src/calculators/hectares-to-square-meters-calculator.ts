import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hectares-to-square-meters-calculator",
  title: "Hectares to Square Meters Calculator",
  shortTitle: "ha to m²",
  description: "Convert hectares to square meters instantly.",
  longDescription:
    "Need to express land measured in hectares as square meters? This calculator multiplies by exactly 10,000 — the number of square meters in one hectare.",
  category: "conversions",
  keywords: ["hectares to square meters", "ha to m2", "area converter", "land conversion"],
  inputs: [
    {
      type: "number",
      key: "hectares",
      label: "Hectares (ha)",
      defaultValue: 1,
      min: 0,
      step: 0.01,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const hectares = Number(values.hectares);
    if (isNaN(hectares) || hectares < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const squareMeters = hectares * 10000;
    return {
      outputs: [
        {
          key: "squareMeters",
          label: "Square Meters (m²)",
          value: Number(squareMeters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 10,000 since one hectare is defined as a 100 m × 100 m square.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Hectares (ha) to Square Meters (m²).",
      inputs: { hectares: 1 },
      result: "1 hectare equals 10,000 m².",
    },
    {
      title: "Example 2",
      description: "Converting 0.5 Hectares (ha) to Square Meters (m²).",
      inputs: { hectares: 0.5 },
      result: "0.5 hectares equals 5,000 m².",
    },
  ],
  faqs: [
    {
      question: "How many square meters in a hectare?",
      answer: "Exactly 10,000 square meters.",
    },
    {
      question: "Is this useful for agriculture?",
      answer: "Yes — field sizes and crop yields are commonly expressed in hectares.",
    },
    {
      question: "How big is a hectare visually?",
      answer: "A hectare is roughly the size of a standard international football (soccer) field.",
    },
  ],
  relatedSlugs: ["square-meters-to-hectares-calculator", "acres-to-square-meters-calculator"],
};

export default def;
