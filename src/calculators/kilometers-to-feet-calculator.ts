import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kilometers-to-feet-calculator",
  title: "Kilometers to Feet Calculator",
  shortTitle: "km to ft",
  description: "Convert kilometers to feet instantly.",
  longDescription:
    "Whether you're looking at trail distances, altitude readings, or comparing metric and imperial distances, this calculator converts kilometers to feet using the precise factor of 3280.84 feet per kilometer.",
  category: "conversions",
  keywords: ["kilometers to feet", "km to ft", "distance converter", "metric to imperial"],
  inputs: [
    {
      type: "number",
      key: "kilometers",
      label: "Kilometers (km)",
      defaultValue: 1,
      min: 0,
      step: 0.01,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kilometers = Number(values.kilometers);
    if (isNaN(kilometers) || kilometers < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const feet = kilometers * 3280.84;
    return {
      outputs: [
        {
          key: "feet",
          label: "Feet (ft)",
          value: Number(feet.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your kilometer value by 3280.84, which is derived from the exact definition: 1 meter = 3.28084 feet, and 1 kilometer = 1000 meters.",
  examples: [
    {
      title: "1 Kilometer Run",
      description: "Converting 1 km to feet.",
      inputs: { kilometers: 1 },
      result: "1 km equals 3280.84 ft.",
    },
    {
      title: "Mount Everest Base Camp",
      description: "Converting 5.364 km altitude to feet.",
      inputs: { kilometers: 5.364 },
      result: "5.364 km equals approximately 17,598 ft.",
    },
  ],
  faqs: [
    {
      question: "How many feet are in a kilometer?",
      answer: "There are 3280.84 feet in one kilometer.",
    },
    {
      question: "Why is this conversion not a round number?",
      answer: "The foot is an imperial unit not derived from the metric system, so the conversion factor is not a whole number.",
    },
    {
      question: "Can I use this for altitude conversions?",
      answer: "Yes. Altitude is commonly expressed in feet in aviation and in meters or kilometers in science.",
    },
  ],
  relatedSlugs: ["feet-to-kilometers-calculator", "meters-to-centimeters-calculator"],
};

export default def;
