import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-feet",
  title: "Meters to Feet Calculator",
  shortTitle: "m to ft",
  description: "Convert meters to feet quickly and accurately.",
  longDescription:
    "Whether you're reading an international specification, interpreting a metric measurement, or converting your height from meters to feet, this calculator gives you an instant result. Enter any meter value and get the precise equivalent in feet.",
  category: "conversions",
  keywords: ["meters to feet", "m to ft", "length converter", "distance conversion", "height converter"],
  inputs: [
    {
      type: "number",
      key: "meters",
      label: "Meters (m)",
      defaultValue: 1.8,
      min: 0,
      step: 0.01,
      placeholder: "1.8",
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
  howItWorks:
    "The calculator multiplies the meter value by 3.28084, the number of feet in one meter. This factor is the reciprocal of 0.3048 (feet per meter), giving a precise result for any input.",
  examples: [
    {
      title: "Average Height",
      description: "Converting 1.8 meters to feet.",
      inputs: { meters: 1.8 },
      result: "1.8 meters equals approximately 5.9055 feet.",
    },
    {
      title: "One Meter",
      description: "How many feet is exactly 1 meter?",
      inputs: { meters: 1 },
      result: "1 meter equals 3.28084 feet.",
    },
    {
      title: "100 Meters",
      description: "The length of an Olympic sprint in feet.",
      inputs: { meters: 100 },
      result: "100 meters equals 328.084 feet.",
    },
  ],
  faqs: [
    {
      question: "How many feet are in a meter?",
      answer: "There are approximately 3.28084 feet in one meter.",
    },
    {
      question: "How do I convert meters to feet and inches?",
      answer: "First multiply meters by 3.28084 to get decimal feet. Then take the decimal portion and multiply by 12 to get the remaining inches.",
    },
    {
      question: "Is this the same as converting metres to feet?",
      answer: "Yes. Meter and metre are two spellings of the same unit — American English uses 'meter' while British English uses 'metre'.",
    },
  ],
  relatedSlugs: ["feet-to-meters", "inches-to-cm", "miles-to-km"],
};

export default def;
