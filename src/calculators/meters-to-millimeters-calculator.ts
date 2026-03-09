import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-millimeters-calculator",
  title: "Meters to Millimeters Calculator",
  shortTitle: "m to mm",
  description: "Convert meters to millimeters instantly.",
  longDescription:
    "Millimeters are used in engineering, woodworking, and precision manufacturing. This calculator converts any meter value to millimeters using the exact factor of 1000 millimeters per meter.",
  category: "conversions",
  keywords: ["meters to millimeters", "m to mm", "length converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "meters",
      label: "Meters (m)",
      defaultValue: 1,
      min: 0,
      step: 0.001,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const meters = Number(values.meters);
    if (isNaN(meters) || meters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const millimeters = meters * 1000;
    return {
      outputs: [
        {
          key: "millimeters",
          label: "Millimeters (mm)",
          value: Number(millimeters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your meter value by 1000, since there are exactly 1000 millimeters in one meter.",
  examples: [
    {
      title: "One Meter Ruler",
      description: "Converting 1 meter to millimeters.",
      inputs: { meters: 1 },
      result: "1 m equals 1000 mm.",
    },
    {
      title: "Small Component",
      description: "Converting 0.05 meters (5 cm) to millimeters.",
      inputs: { meters: 0.05 },
      result: "0.05 m equals 50 mm.",
    },
  ],
  faqs: [
    {
      question: "How many millimeters are in a meter?",
      answer: "There are exactly 1000 millimeters in one meter.",
    },
    {
      question: "When would I use millimeters instead of centimeters?",
      answer: "Millimeters are preferred in engineering and manufacturing for greater precision.",
    },
    {
      question: "Is this conversion exact?",
      answer: "Yes. Both units are part of the SI metric system with an exact relationship.",
    },
  ],
  relatedSlugs: ["millimeters-to-meters-calculator", "meters-to-centimeters-calculator"],
};

export default def;
