import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "centimeters-to-meters-calculator",
  title: "Centimeters to Meters Calculator",
  shortTitle: "cm to m",
  description: "Convert centimeters to meters instantly.",
  longDescription:
    "Need to convert a centimeter measurement into meters? This calculator divides your value by 100 to give you the precise meter equivalent — useful for construction, science, or everyday measurement tasks.",
  category: "conversions",
  keywords: ["centimeters to meters", "cm to m", "length converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "centimeters",
      label: "Centimeters (cm)",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const centimeters = Number(values.centimeters);
    if (isNaN(centimeters) || centimeters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const meters = centimeters / 100;
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
    "The calculator divides your centimeter value by 100, since there are exactly 100 centimeters in one meter.",
  examples: [
    {
      title: "Average Person's Height",
      description: "Converting 175 cm (average adult height) to meters.",
      inputs: { centimeters: 175 },
      result: "175 cm is equal to 1.75 m.",
    },
    {
      title: "Short Distance",
      description: "Converting 50 cm to meters.",
      inputs: { centimeters: 50 },
      result: "50 cm equals 0.5 m.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a centimeter?",
      answer: "One centimeter equals 0.01 meters.",
    },
    {
      question: "Why divide by 100?",
      answer: "The prefix 'centi-' means one hundredth, so a centimeter is 1/100th of a meter.",
    },
    {
      question: "Can I use this for scientific measurements?",
      answer: "Yes. The conversion is exact within the SI metric system.",
    },
  ],
  relatedSlugs: ["meters-to-centimeters-calculator", "millimeters-to-meters-calculator"],
};

export default def;
