import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cm-to-inches",
  title: "Centimeters to Inches Calculator",
  shortTitle: "cm to in",
  description: "Convert centimeters to inches instantly.",
  longDescription:
    "Centimeters are the standard unit for everyday length measurements in most of the world, while inches are common in the United States for heights, screen sizes, and dimensions. This calculator converts any centimeter value to its precise inch equivalent.",
  category: "conversions",
  keywords: ["cm to inches", "centimeters to inches", "length converter", "height conversion"],
  inputs: [
    {
      type: "number",
      key: "cm",
      label: "Centimeters (cm)",
      defaultValue: 30,
      min: 0,
      step: 0.1,
      placeholder: "30",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const cm = Number(values.cm);

    if (isNaN(cm) || cm < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const inches = cm / 2.54;

    return {
      outputs: [
        {
          key: "inches",
          label: "Inches (in)",
          value: Number(inches.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your centimeter value by 2.54, since one inch is defined as exactly 2.54 centimeters. Dividing reverses the relationship and gives you the precise inch equivalent.",
  examples: [
    {
      title: "Standard Ruler",
      description: "Converting 30 cm (the length of a standard ruler) to inches.",
      inputs: { cm: 30 },
      result: "30 cm equals approximately 11.811 inches.",
    },
    {
      title: "Screen Size",
      description: "A 40 cm display dimension converted to inches.",
      inputs: { cm: 40 },
      result: "40 cm equals approximately 15.748 inches.",
    },
    {
      title: "Average Height",
      description: "Converting 175 cm (average adult height) to inches.",
      inputs: { cm: 175 },
      result: "175 cm equals approximately 68.898 inches (about 5 ft 9 in).",
    },
  ],
  faqs: [
    {
      question: "How many inches are in a centimeter?",
      answer: "One centimeter equals approximately 0.3937 inches. Equivalently, one inch equals exactly 2.54 centimeters.",
    },
    {
      question: "How do I convert cm to feet and inches?",
      answer: "First divide by 2.54 to get total inches. Then divide by 12 for feet, and the remainder is the leftover inches.",
    },
    {
      question: "Is this the reverse of inches to cm?",
      answer: "Yes. This is the exact inverse of the inches-to-cm conversion, using the same defined factor of 2.54.",
    },
  ],
  relatedSlugs: ["inches-to-cm", "feet-to-meters", "meters-to-feet"],
};

export default def;
