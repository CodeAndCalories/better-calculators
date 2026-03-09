import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "feet-to-kilometers-calculator",
  title: "Feet to Kilometers Calculator",
  shortTitle: "ft to km",
  description: "Convert feet to kilometers instantly.",
  longDescription:
    "Need to express a feet-based distance in kilometers? This calculator converts any value in feet to kilometers using the exact factor of 0.0003048 kilometers per foot, derived from the international definition of the foot.",
  category: "conversions",
  keywords: ["feet to kilometers", "ft to km", "distance converter", "imperial to metric"],
  inputs: [
    {
      type: "number",
      key: "feet",
      label: "Feet (ft)",
      defaultValue: 5000,
      min: 0,
      step: 1,
      placeholder: "5000",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const feet = Number(values.feet);
    if (isNaN(feet) || feet < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const kilometers = feet * 0.0003048;
    return {
      outputs: [
        {
          key: "kilometers",
          label: "Kilometers (km)",
          value: Number(kilometers.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your feet value by 0.0003048. One foot is defined as exactly 0.3048 meters, so dividing by 1000 gives kilometers.",
  examples: [
    {
      title: "Mile in Feet",
      description: "Converting 5280 feet (1 mile) to kilometers.",
      inputs: { feet: 5280 },
      result: "5280 ft equals approximately 1.609 km.",
    },
    {
      title: "Cruising Altitude",
      description: "Converting 35,000 ft airplane cruising altitude to kilometers.",
      inputs: { feet: 35000 },
      result: "35,000 ft equals approximately 10.668 km.",
    },
  ],
  faqs: [
    {
      question: "How many kilometers are in a foot?",
      answer: "One foot equals exactly 0.0003048 kilometers.",
    },
    {
      question: "What is 1 foot in meters first?",
      answer: "One foot is exactly 0.3048 meters, which is then divided by 1000 to get kilometers.",
    },
    {
      question: "Is this useful for aviation?",
      answer: "Yes. Altitude in aviation is given in feet, while meteorology and science often use kilometers.",
    },
  ],
  relatedSlugs: ["kilometers-to-feet-calculator", "meters-to-centimeters-calculator"],
};

export default def;
