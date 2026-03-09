import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "lbs-to-kg",
  title: "Pounds to Kilograms Calculator",
  shortTitle: "lbs to kg",
  description: "Convert pounds to kilograms quickly and accurately.",
  longDescription:
    "The pound is the primary unit of weight in the United States, while the kilogram is the international standard. Use this calculator to convert any pound value to its kilogram equivalent for travel, fitness, science, or shipping.",
  category: "conversions",
  keywords: ["lbs to kg", "pounds to kilograms", "weight converter", "mass conversion"],
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

    const kilograms = pounds / 2.20462;

    return {
      outputs: [
        {
          key: "kilograms",
          label: "Kilograms (kg)",
          value: Number(kilograms.toFixed(4)),
          format: "kg",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your pound value by 2.20462, since one kilogram equals 2.20462 pounds. Dividing reverses the conversion and gives you the precise kilogram equivalent.",
  examples: [
    {
      title: "Body Weight",
      description: "A person weighing 150 lbs converted to kilograms.",
      inputs: { pounds: 150 },
      result: "150 lbs is approximately 68.0389 kg.",
    },
    {
      title: "Weight Limit",
      description: "A 100 lb weight limit expressed in kilograms.",
      inputs: { pounds: 100 },
      result: "100 lbs equals 45.3592 kg.",
    },
  ],
  faqs: [
    {
      question: "How many kilograms are in a pound?",
      answer: "One pound is equal to approximately 0.453592 kilograms.",
    },
    {
      question: "Why divide by 2.20462?",
      answer: "Because there are 2.20462 pounds per kilogram, dividing by that number converts in the opposite direction.",
    },
    {
      question: "Is this accurate for medical use?",
      answer: "This uses the standard conversion factor. For clinical purposes, always verify with a certified scale.",
    },
  ],
  relatedSlugs: ["kg-to-lbs", "miles-to-km"],
};

export default def;
