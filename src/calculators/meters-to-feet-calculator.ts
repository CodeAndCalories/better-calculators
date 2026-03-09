import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-feet-calculator",
  title: "Meters to Feet Calculator",
  shortTitle: "m to ft",
  description: "Convert meters to feet instantly.",
  longDescription:
    "Meters and feet are used in different parts of the world for measuring length and height. This calculator applies the exact factor of 3.28084 feet per meter for precise conversions.",
  category: "conversions",
  keywords: ["meters to feet", "m to ft", "height converter", "metric to imperial"],
  inputs: [
    {
      type: "number",
      key: "meters",
      label: "Meters (m)",
      defaultValue: 1,
      min: 0,
      step: 0.01,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const meters = Number(values.meters);
    if (isNaN(meters) || meters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const feet = meters * 3.28084;
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
  howItWorks: "Multiplies your meter value by 3.28084, derived from the exact definition of one foot as 0.3048 meters.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Meters (m) to Feet (ft).",
      inputs: { meters: 1 },
      result: "1 m equals 3.2808 ft.",
    },
    {
      title: "Example 2",
      description: "Converting 1.8 Meters (m) to Feet (ft).",
      inputs: { meters: 1.8 },
      result: "1.8 m (average height) equals approximately 5.905 ft.",
    },
  ],
  faqs: [
    {
      question: "How many feet are in a meter?",
      answer: "There are approximately 3.28084 feet in one meter.",
    },
    {
      question: "Is this useful for height conversion?",
      answer: "Yes. Height is measured in meters in most countries and feet/inches in the US.",
    },
    {
      question: "Is the conversion exact?",
      answer: "The foot is defined as exactly 0.3048 m, so the factor 3.28084 is a rounded approximation of 1/0.3048.",
    },
  ],
  relatedSlugs: ["feet-to-meters-calculator", "meters-to-yards-calculator"],
};

export default def;
