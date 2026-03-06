import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kg-to-lbs",
  title: "Kilograms to Pounds Calculator",
  shortTitle: "kg to lbs",
  description: "Convert kilograms to pounds instantly.",
  longDescription:
    "Whether you're tracking your weight, shipping a package, or following a recipe, converting kilograms to pounds is a common need. This calculator applies the exact conversion factor to give you a precise result every time.",
  category: "conversion",
  keywords: ["kg to lbs", "kilograms to pounds", "weight converter", "mass conversion"],
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
    "The calculator multiplies your kilogram value by 2.20462, the exact number of pounds in one kilogram. This is derived from the international definition of the pound (0.45359237 kg).",
  examples: [
    {
      title: "Average Adult Weight",
      description: "Converting 70 kg (average adult body weight) to pounds.",
      inputs: { kilograms: 70 },
      result: "70 kg is equal to 154.3234 lbs.",
    },
    {
      title: "Luggage Weight Limit",
      description: "A 23 kg airline baggage allowance converted to pounds.",
      inputs: { kilograms: 23 },
      result: "23 kg equals 50.7063 lbs.",
    },
  ],
  faqs: [
    {
      question: "How many pounds are in a kilogram?",
      answer: "There are exactly 2.20462 pounds in one kilogram.",
    },
    {
      question: "Is this the same as converting kg to lb?",
      answer: "Yes. 'Lbs' and 'lb' are both abbreviations for the pound unit.",
    },
    {
      question: "Does this work for body weight?",
      answer: "Absolutely. Enter your weight in kilograms and get the equivalent in pounds.",
    },
  ],
  relatedSlugs: ["lbs-to-kg", "miles-to-km"],
};

export default def;
