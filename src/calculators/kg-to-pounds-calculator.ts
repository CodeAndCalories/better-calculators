import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kg-to-pounds-calculator",
  title: "Kilograms to Pounds Calculator",
  shortTitle: "kg to lbs",
  description: "Convert kilograms to pounds instantly.",
  longDescription:
    "Need to convert a kilogram weight to pounds? This calculator uses the exact international conversion factor of 2.20462 pounds per kilogram, giving you a precise result for body weight, shipping, or any other use.",
  category: "conversions",
  keywords: ["kg to pounds", "kilograms to lbs", "weight converter", "mass conversion"],
  inputs: [
    {
      type: "number",
      key: "kilograms",
      label: "Kilograms (kg)",
      defaultValue: 70,
      min: 0,
      step: 0.1,
      placeholder: "70",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kilograms = Number(values.kilograms);
    if (isNaN(kilograms) || kilograms < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const pounds = kilograms * 2.20462;
    return {
      outputs: [
        {
          key: "pounds",
          label: "Pounds (lbs)",
          value: Number(pounds.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your kilogram value by 2.20462, derived from the exact pound definition of 0.45359237 kg (1 ÷ 0.45359237 ≈ 2.20462).",
  examples: [
    {
      title: "Average Adult Weight",
      description: "Converting 70 kg to pounds.",
      inputs: { kilograms: 70 },
      result: "70 kg equals approximately 154.3234 lbs.",
    },
    {
      title: "Gym Weights",
      description: "Converting a 20 kg dumbbell to pounds.",
      inputs: { kilograms: 20 },
      result: "20 kg equals approximately 44.0924 lbs.",
    },
  ],
  faqs: [
    {
      question: "How many pounds are in a kilogram?",
      answer: "There are approximately 2.20462 pounds in one kilogram.",
    },
    {
      question: "How is this different from the kg-to-lbs calculator?",
      answer: "This calculator returns the same result and uses the same formula — it's an alternate slug for the same conversion.",
    },
    {
      question: "Can I use this for fitness tracking?",
      answer: "Yes. Many gym machines and fitness apps use pounds, while health data may be recorded in kilograms.",
    },
  ],
  relatedSlugs: ["pounds-to-kg-calculator", "kg-to-lbs"],
};

export default def;
