import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "liters-to-gallons",
  title: "Liters to Gallons Calculator",
  shortTitle: "L to gal",
  description: "Convert liters to US gallons instantly.",
  longDescription:
    "The liter is the standard unit of volume in most of the world, while the US gallon is commonly used in the United States for fuel, beverages, and liquid measurements. This calculator converts any liter value to its US gallon equivalent using the exact conversion factor.",
  category: "conversions",
  keywords: ["liters to gallons", "litres to gallons", "volume converter", "liquid conversion", "fuel converter"],
  inputs: [
    {
      type: "number",
      key: "liters",
      label: "Liters (L)",
      defaultValue: 10,
      min: 0,
      step: 0.1,
      placeholder: "10",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const liters = Number(values.liters);

    if (isNaN(liters) || liters < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const gallons = liters * 0.264172;

    return {
      outputs: [
        {
          key: "gallons",
          label: "Gallons (gal)",
          value: Number(gallons.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your liter value by 0.264172, the number of US liquid gallons in one liter. Note that this uses the US gallon (3.78541 L), not the imperial gallon (4.54609 L) used in the UK.",
  examples: [
    {
      title: "Full Gas Tank",
      description: "A car with a 50-liter fuel tank.",
      inputs: { liters: 50 },
      result: "50 liters equals approximately 13.209 gallons.",
    },
    {
      title: "Water Bottle",
      description: "A standard 1-liter water bottle.",
      inputs: { liters: 1 },
      result: "1 liter equals approximately 0.2642 gallons.",
    },
    {
      title: "Large Container",
      description: "Converting 100 liters to gallons.",
      inputs: { liters: 100 },
      result: "100 liters equals approximately 26.417 gallons.",
    },
  ],
  faqs: [
    {
      question: "How many gallons are in a liter?",
      answer: "One liter equals approximately 0.264172 US liquid gallons.",
    },
    {
      question: "Is this US gallons or imperial gallons?",
      answer: "This calculator uses US liquid gallons. The US gallon is 3.78541 liters, while the imperial (UK) gallon is 4.54609 liters.",
    },
    {
      question: "Why is this useful for fuel costs?",
      answer: "Fuel prices in metric countries are listed per liter, while US prices are per gallon. Converting lets you directly compare fuel costs when traveling internationally.",
    },
  ],
  relatedSlugs: ["gallons-to-liters", "kg-to-lbs", "ounces-to-grams"],
};

export default def;
