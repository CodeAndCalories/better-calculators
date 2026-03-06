import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "inches-to-cm",
  title: "Inches to Centimeters Calculator",
  shortTitle: "Inches to cm",
  description: "Convert inches to centimeters instantly.",
  longDescription:
    "Inches are commonly used in the United States for measuring height, screen sizes, and dimensions, while centimeters are the international standard. This calculator gives you an exact conversion for any value you enter.",
  category: "life",
  keywords: ["inches to cm", "inches to centimeters", "length converter", "height conversion"],
  inputs: [
    {
      type: "number",
      key: "inches",
      label: "Inches (in)",
      defaultValue: 12,
      min: 0,
      step: 0.1,
      placeholder: "12",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const inches = Number(values.inches);

    if (isNaN(inches) || inches < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const centimeters = inches * 2.54;

    return {
      outputs: [
        {
          key: "centimeters",
          label: "Centimeters (cm)",
          value: Number(centimeters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your inch value by 2.54, the exact number of centimeters in one inch. This is an exact, defined conversion — not an approximation.",
  examples: [
    {
      title: "One Foot",
      description: "Converting 12 inches (one foot) to centimeters.",
      inputs: { inches: 12 },
      result: "12 inches equals exactly 30.48 cm.",
    },
    {
      title: "Screen Size",
      description: "A 15.6-inch laptop screen expressed in centimeters.",
      inputs: { inches: 15.6 },
      result: "15.6 inches equals 39.624 cm.",
    },
  ],
  faqs: [
    {
      question: "How many centimeters are in an inch?",
      answer: "There are exactly 2.54 centimeters in one inch. This is a defined constant, not a rounded approximation.",
    },
    {
      question: "How do I convert height in feet and inches?",
      answer: "First convert feet to inches (multiply by 12), add the remaining inches, then multiply the total by 2.54.",
    },
    {
      question: "Is this useful for clothing sizes?",
      answer: "Yes. Many international clothing size charts use centimeters for measurements like waist, chest, and inseam.",
    },
  ],
  relatedSlugs: ["miles-to-km", "kg-to-lbs"],
};

export default def;
