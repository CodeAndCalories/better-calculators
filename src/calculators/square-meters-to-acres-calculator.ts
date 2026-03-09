import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "square-meters-to-acres-calculator",
  title: "Square Meters to Acres Calculator",
  shortTitle: "m² to acres",
  description: "Convert square meters to acres instantly.",
  longDescription:
    "Acres are commonly used in real estate and agriculture in the United States, while much of the world uses square meters. This calculator converts any area in square meters to acres using the precise conversion factor.",
  category: "conversions",
  keywords: ["square meters to acres", "m2 to acres", "area converter", "land conversion"],
  inputs: [
    {
      type: "number",
      key: "squareMeters",
      label: "Square Meters (m²)",
      defaultValue: 4047,
      min: 0,
      step: 1,
      placeholder: "4047",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const squareMeters = Number(values.squareMeters);
    if (isNaN(squareMeters) || squareMeters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const acres = squareMeters * 0.000247105;
    return {
      outputs: [
        {
          key: "acres",
          label: "Acres",
          value: Number(acres.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your square meter value by 0.000247105, which is derived from the definition of an acre as exactly 4046.8564224 square meters.",
  examples: [
    {
      title: "One Acre Reference",
      description: "Converting 4047 m² (approximately one acre) to acres.",
      inputs: { squareMeters: 4047 },
      result: "4047 m² equals approximately 1 acre.",
    },
    {
      title: "Small Farm",
      description: "Converting 20,000 m² to acres.",
      inputs: { squareMeters: 20000 },
      result: "20,000 m² equals approximately 4.942 acres.",
    },
  ],
  faqs: [
    {
      question: "How many square meters are in an acre?",
      answer: "One acre is exactly 4046.8564224 square meters.",
    },
    {
      question: "Is an acre a metric unit?",
      answer: "No. The acre is a traditional imperial unit of area, mainly used in the US and UK.",
    },
    {
      question: "Can I use this for real estate?",
      answer: "Yes. This is commonly used when comparing land sizes between countries using different measurement systems.",
    },
  ],
  relatedSlugs: ["acres-to-square-meters-calculator", "square-meters-to-acres-calculator"],
};

export default def;
