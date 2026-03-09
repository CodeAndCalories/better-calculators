import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-miles-calculator",
  title: "Meters to Miles Calculator",
  shortTitle: "m to mi",
  description: "Convert meters to miles instantly.",
  longDescription:
    "Miles are used for road distances in the US and UK. This calculator divides your meter value by 1609.344 to give you the precise mile equivalent.",
  category: "conversions",
  keywords: ["meters to miles", "m to mi", "distance converter", "metric to imperial"],
  inputs: [
    {
      type: "number",
      key: "meters",
      label: "Meters (m)",
      defaultValue: 1609,
      min: 0,
      step: 1,
      placeholder: "1609",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const meters = Number(values.meters);
    if (isNaN(meters) || meters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const miles = meters / 1609.344;
    return {
      outputs: [
        {
          key: "miles",
          label: "Miles (mi)",
          value: Number(miles.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Divides your meter value by 1609.344, the exact number of meters in one international mile.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1609 Meters (m) to Miles (mi).",
      inputs: { meters: 1609 },
      result: "1609 m equals approximately 1 mile.",
    },
    {
      title: "Example 2",
      description: "Converting 5000 Meters (m) to Miles (mi).",
      inputs: { meters: 5000 },
      result: "5000 m equals approximately 3.107 miles.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a mile?",
      answer: "One mile is exactly 1609.344 meters.",
    },
    {
      question: "How close is 1600 m to a mile?",
      answer: "Very close — 1600 m is about 0.994 miles.",
    },
    {
      question: "Can I use this for running?",
      answer: "Yes. Many races use meters but display distances in miles.",
    },
  ],
  relatedSlugs: ["miles-to-meters-calculator", "meters-to-kilometers-calculator"],
};

export default def;
