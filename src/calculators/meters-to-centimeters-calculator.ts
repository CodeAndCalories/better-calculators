import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "meters-to-centimeters-calculator",
  title: "Meters to Centimeters Calculator",
  shortTitle: "m to cm",
  description: "Convert meters to centimeters instantly.",
  longDescription:
    "Converting meters to centimeters is a fundamental metric system conversion. Whether you're measuring fabric, room dimensions, or height, this calculator gives you an exact result using the standard factor of 100 centimeters per meter.",
  category: "conversions",
  keywords: ["meters to centimeters", "m to cm", "length converter", "metric conversion"],
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
    const centimeters = meters * 100;
    return {
      outputs: [
        {
          key: "centimeters",
          label: "Centimeters (cm)",
          value: Number(centimeters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your meter value by 100, since there are exactly 100 centimeters in one meter by definition of the metric system.",
  examples: [
    {
      title: "Standard Door Height",
      description: "A 2-meter door converted to centimeters.",
      inputs: { meters: 2 },
      result: "2 m is equal to 200 cm.",
    },
    {
      title: "Half a Meter",
      description: "Converting 0.5 meters to centimeters.",
      inputs: { meters: 0.5 },
      result: "0.5 m equals 50 cm.",
    },
  ],
  faqs: [
    {
      question: "How many centimeters are in a meter?",
      answer: "There are exactly 100 centimeters in one meter.",
    },
    {
      question: "Is this conversion exact?",
      answer: "Yes. The meter and centimeter are both SI units, so the conversion factor of 100 is exact.",
    },
    {
      question: "Can I use this for height measurements?",
      answer: "Absolutely. Enter your height in meters to get the equivalent in centimeters.",
    },
  ],
  relatedSlugs: ["centimeters-to-meters-calculator", "meters-to-millimeters-calculator"],
};

export default def;
