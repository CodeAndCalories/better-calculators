import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-yards",
  title: "Meters to Yards Calculator",
  shortTitle: "m to yd",
  description: "Convert meters to yards instantly.",
  longDescription:
    "The meter is the international standard unit of length, while the yard is commonly used in the United States and United Kingdom for sports, fabric, and distance measurements. This calculator converts any meter value to its precise yard equivalent.",
  category: "life",
  keywords: ["meters to yards", "metres to yards", "length converter", "distance conversion"],
  inputs: [
    {
      type: "number",
      key: "meters",
      label: "Meters (m)",
      defaultValue: 100,
      min: 0,
      step: 0.1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const meters = Number(values.meters);

    if (isNaN(meters) || meters < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const yards = meters * 1.09361;

    return {
      outputs: [
        {
          key: "yards",
          label: "Yards (yd)",
          value: Number(yards.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your meter value by 1.09361, the number of yards in one meter. This factor is the reciprocal of 0.9144 (the exact meters per yard), giving a precise result for any input.",
  examples: [
    {
      title: "Olympic Sprint",
      description: "The 100-meter sprint distance in yards.",
      inputs: { meters: 100 },
      result: "100 meters equals approximately 109.361 yards.",
    },
    {
      title: "Swimming Pool",
      description: "A standard 50-meter Olympic pool in yards.",
      inputs: { meters: 50 },
      result: "50 meters equals approximately 54.681 yards.",
    },
    {
      title: "One Meter",
      description: "The base conversion: how many yards is one meter?",
      inputs: { meters: 1 },
      result: "1 meter equals approximately 1.09361 yards.",
    },
  ],
  faqs: [
    {
      question: "How many yards are in a meter?",
      answer: "One meter equals approximately 1.09361 yards.",
    },
    {
      question: "Is a meter longer than a yard?",
      answer: "Yes. A meter is slightly longer than a yard — about 9.36% longer.",
    },
    {
      question: "Why is this useful for sports?",
      answer: "Swimming and track events are measured in meters internationally but in yards in some US pools and courses, making this conversion handy for comparing records and times.",
    },
  ],
  relatedSlugs: ["yards-to-meters", "feet-to-meters", "meters-to-feet"],
};

export default def;
