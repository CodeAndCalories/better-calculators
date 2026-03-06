import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "gallons-to-liters",
  title: "Gallons to Liters Calculator",
  shortTitle: "gal to L",
  description: "Convert US gallons to liters instantly.",
  longDescription:
    "Whether you're converting a fuel tank capacity, a recipe volume, or a product specification, this calculator converts US gallons to liters using the exact defined conversion factor. It's an essential tool for anyone working between the US customary and metric systems.",
  category: "life",
  keywords: ["gallons to liters", "gallons to litres", "volume converter", "liquid conversion", "fuel converter"],
  inputs: [
    {
      type: "number",
      key: "gallons",
      label: "Gallons (gal)",
      defaultValue: 5,
      min: 0,
      step: 0.1,
      placeholder: "5",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const gallons = Number(values.gallons);

    if (isNaN(gallons) || gallons < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const liters = gallons * 3.78541;

    return {
      outputs: [
        {
          key: "liters",
          label: "Liters (L)",
          value: Number(liters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your gallon value by 3.78541, the exact number of liters in one US liquid gallon. This is the defined conversion for the US gallon, which differs from the UK imperial gallon.",
  examples: [
    {
      title: "5-Gallon Jug",
      description: "A standard 5-gallon water jug converted to liters.",
      inputs: { gallons: 5 },
      result: "5 gallons equals approximately 18.927 liters.",
    },
    {
      title: "One Gallon of Milk",
      description: "A common US milk jug size.",
      inputs: { gallons: 1 },
      result: "1 gallon equals approximately 3.785 liters.",
    },
    {
      title: "Gas Tank",
      description: "A 15-gallon car fuel tank in liters.",
      inputs: { gallons: 15 },
      result: "15 gallons equals approximately 56.781 liters.",
    },
  ],
  faqs: [
    {
      question: "How many liters are in a gallon?",
      answer: "One US liquid gallon equals exactly 3.78541 liters.",
    },
    {
      question: "Does this work for UK gallons?",
      answer: "No. This calculator uses the US gallon. The UK imperial gallon is larger — approximately 4.54609 liters.",
    },
    {
      question: "How many liters is a half gallon?",
      answer: "Half a US gallon equals approximately 1.89271 liters.",
    },
  ],
  relatedSlugs: ["liters-to-gallons", "kg-to-lbs", "ounces-to-grams"],
};

export default def;
