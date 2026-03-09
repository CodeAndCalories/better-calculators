import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-yards-calculator",
  title: "Meters to Yards Calculator",
  shortTitle: "m to yd",
  description: "Convert meters to yards instantly.",
  longDescription:
    "Yards are used in American football, golf, and fabric measurement. This calculator converts meters to yards using the precise factor of 1.09361 yards per meter.",
  category: "conversions",
  keywords: ["meters to yards", "m to yd", "length converter", "metric to imperial"],
  inputs: [
    {
      type: "number",
      key: "meters",
      label: "Meters (m)",
      defaultValue: 10,
      min: 0,
      step: 0.1,
      placeholder: "10",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const meters = Number(values.meters);
    if (isNaN(meters) || meters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
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
  howItWorks: "Multiplies your meter value by 1.09361, derived from one yard being exactly 0.9144 meters.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 100 Meters (m) to Yards (yd).",
      inputs: { meters: 100 },
      result: "100 m equals approximately 109.36 yd.",
    },
    {
      title: "Example 2",
      description: "Converting 1 Meters (m) to Yards (yd).",
      inputs: { meters: 1 },
      result: "1 m equals approximately 1.0936 yd.",
    },
  ],
  faqs: [
    {
      question: "How many yards are in a meter?",
      answer: "There are approximately 1.09361 yards in one meter.",
    },
    {
      question: "Is a yard bigger than a meter?",
      answer: "No. A yard (0.9144 m) is slightly shorter than a meter.",
    },
    {
      question: "Can I use this for fabric?",
      answer: "Yes. Fabric is often sold by the yard in the US.",
    },
  ],
  relatedSlugs: ["yards-to-meters-calculator", "meters-to-feet-calculator"],
};

export default def;
