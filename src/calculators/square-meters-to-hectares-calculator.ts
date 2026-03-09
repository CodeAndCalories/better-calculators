import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "square-meters-to-hectares-calculator",
  title: "Square Meters to Hectares Calculator",
  shortTitle: "m² to ha",
  description: "Convert square meters to hectares instantly.",
  longDescription:
    "Hectares are the standard unit for large land areas in agriculture and forestry. This calculator divides your square meter value by exactly 10,000 to convert to hectares.",
  category: "conversions",
  keywords: ["square meters to hectares", "m2 to ha", "area converter", "land conversion"],
  inputs: [
    {
      type: "number",
      key: "squareMeters",
      label: "Square Meters (m²)",
      defaultValue: 10000,
      min: 0,
      step: 100,
      placeholder: "10000",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const squareMeters = Number(values.squareMeters);
    if (isNaN(squareMeters) || squareMeters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const hectares = squareMeters / 10000;
    return {
      outputs: [
        {
          key: "hectares",
          label: "Hectares (ha)",
          value: Number(hectares.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Divides by 10,000 since one hectare is defined as exactly 10,000 square meters (100 m × 100 m).",
  examples: [
    {
      title: "Example 1",
      description: "Converting 10000 Square Meters (m²) to Hectares (ha).",
      inputs: { squareMeters: 10000 },
      result: "10,000 m² equals 1 hectare.",
    },
    {
      title: "Example 2",
      description: "Converting 50000 Square Meters (m²) to Hectares (ha).",
      inputs: { squareMeters: 50000 },
      result: "50,000 m² equals 5 hectares.",
    },
  ],
  faqs: [
    {
      question: "How many square meters in a hectare?",
      answer: "Exactly 10,000 square meters.",
    },
    {
      question: "Is a hectare a metric unit?",
      answer: "Yes. A hectare is a non-SI metric unit accepted for use with the SI system.",
    },
    {
      question: "How does a hectare compare to an acre?",
      answer: "One hectare equals approximately 2.471 acres.",
    },
  ],
  relatedSlugs: ["hectares-to-square-meters-calculator", "square-meters-to-acres-calculator"],
};

export default def;
