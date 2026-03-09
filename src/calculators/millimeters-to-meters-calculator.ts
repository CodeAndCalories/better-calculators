import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "millimeters-to-meters-calculator",
  title: "Millimeters to Meters Calculator",
  shortTitle: "mm to m",
  description: "Convert millimeters to meters instantly.",
  longDescription:
    "Working with small measurements and need to express them in meters? This calculator divides any millimeter value by 1000 to give you the precise meter equivalent, useful in engineering, science, and construction.",
  category: "conversions",
  keywords: ["millimeters to meters", "mm to m", "length converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "millimeters",
      label: "Millimeters (mm)",
      defaultValue: 1000,
      min: 0,
      step: 1,
      placeholder: "1000",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const millimeters = Number(values.millimeters);
    if (isNaN(millimeters) || millimeters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const meters = millimeters / 1000;
    return {
      outputs: [
        {
          key: "meters",
          label: "Meters (m)",
          value: Number(meters.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your millimeter value by 1000, since there are exactly 1000 millimeters in one meter.",
  examples: [
    {
      title: "Bolt Length",
      description: "A 50 mm bolt converted to meters.",
      inputs: { millimeters: 50 },
      result: "50 mm equals 0.05 m.",
    },
    {
      title: "Pipe Diameter",
      description: "Converting 250 mm pipe diameter to meters.",
      inputs: { millimeters: 250 },
      result: "250 mm equals 0.25 m.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a millimeter?",
      answer: "One millimeter equals 0.001 meters (one thousandth of a meter).",
    },
    {
      question: "Why divide by 1000?",
      answer: "The prefix 'milli-' means one thousandth, so a millimeter is 1/1000th of a meter.",
    },
    {
      question: "Is this useful for engineering drawings?",
      answer: "Yes. Engineering drawings often use millimeters, while formulas may require meters.",
    },
  ],
  relatedSlugs: ["meters-to-millimeters-calculator", "centimeters-to-meters-calculator"],
};

export default def;
