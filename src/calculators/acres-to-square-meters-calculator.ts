import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "acres-to-square-meters-calculator",
  title: "Acres to Square Meters Calculator",
  shortTitle: "acres to m²",
  description: "Convert acres to square meters instantly.",
  longDescription:
    "Whether you're working with land surveys, agricultural plots, or international real estate, this calculator converts acres to square meters using the exact conversion factor of 4046.8564224 square meters per acre.",
  category: "conversions",
  keywords: ["acres to square meters", "acres to m2", "area converter", "land conversion"],
  inputs: [
    {
      type: "number",
      key: "acres",
      label: "Acres",
      defaultValue: 1,
      min: 0,
      step: 0.01,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const acres = Number(values.acres);
    if (isNaN(acres) || acres < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const squareMeters = acres * 4046.8564224;
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
  howItWorks:
    "The calculator multiplies your acre value by 4046.8564224, the exact number of square meters in one acre as defined by international standards.",
  examples: [
    {
      title: "One Acre Plot",
      description: "Converting 1 acre to square meters.",
      inputs: { acres: 1 },
      result: "1 acre equals 4046.8564 m².",
    },
    {
      title: "Small Farm",
      description: "Converting a 5-acre farm to square meters.",
      inputs: { acres: 5 },
      result: "5 acres equals 20,234.28 m².",
    },
  ],
  faqs: [
    {
      question: "How many square meters are in one acre?",
      answer: "There are exactly 4046.8564224 square meters in one acre.",
    },
    {
      question: "Why is the conversion factor not a round number?",
      answer: "The acre predates the metric system and is historically defined by traditional land measurement practices.",
    },
    {
      question: "Is this useful for agriculture?",
      answer: "Yes. Crop yield and planting density data often switches between acres and square meters.",
    },
  ],
  relatedSlugs: ["square-meters-to-acres-calculator"],
};

export default def;
