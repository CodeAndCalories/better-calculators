import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "pounds-to-kilograms-calculator",
  title: "Pounds to Kilograms Calculator",
  shortTitle: "lbs to kg",
  description: "Convert pounds to kilograms instantly.",
  longDescription:
    "Pounds are the standard weight unit in the US. This calculator uses the internationally defined conversion factor of exactly 0.45359237 kg per pound for precise results.",
  category: "conversions",
  keywords: ["pounds to kilograms", "lbs to kg", "weight converter", "mass conversion"],
  inputs: [
    {
      type: "number",
      key: "pounds",
      label: "Pounds (lbs)",
      defaultValue: 150,
      min: 0,
      step: 0.1,
      placeholder: "150",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const pounds = Number(values.pounds);
    if (isNaN(pounds) || pounds < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const kilograms = pounds * 0.45359237;
    return {
      outputs: [
        {
          key: "kilograms",
          label: "Kilograms (kg)",
          value: Number(kilograms.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 0.45359237, the exact international definition of one pound in kilograms.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 150 Pounds (lbs) to Kilograms (kg).",
      inputs: { pounds: 150 },
      result: "150 lbs equals approximately 68.04 kg.",
    },
    {
      title: "Example 2",
      description: "Converting 50 Pounds (lbs) to Kilograms (kg).",
      inputs: { pounds: 50 },
      result: "50 lbs equals approximately 22.68 kg.",
    },
  ],
  faqs: [
    {
      question: "How many kilograms in a pound?",
      answer: "One pound is exactly 0.45359237 kilograms.",
    },
    {
      question: "Is this conversion exact?",
      answer: "Yes — the pound has been defined as exactly 0.45359237 kg since 1959.",
    },
    {
      question: "Can I use this for body weight?",
      answer: "Yes — enter your weight in pounds to get the equivalent in kg.",
    },
  ],
  relatedSlugs: ["kilograms-to-pounds-calculator", "kilograms-to-grams-calculator"],
};

export default def;
