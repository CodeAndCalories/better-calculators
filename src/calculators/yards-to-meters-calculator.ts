import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "yards-to-meters-calculator",
  title: "Yards to Meters Calculator",
  shortTitle: "yd to m",
  description: "Convert yards to meters instantly.",
  longDescription:
    "The yard is a unit of length used in the US and UK. This calculator converts yards to meters using the exact definition of one yard as 0.9144 meters.",
  category: "conversions",
  keywords: ["yards to meters", "yd to m", "length converter", "imperial to metric"],
  inputs: [
    {
      type: "number",
      key: "yards",
      label: "Yards (yd)",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const yards = Number(values.yards);
    if (isNaN(yards) || yards < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const meters = yards * 0.9144;
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
  howItWorks: "Multiplies your yard value by exactly 0.9144, which is the internationally agreed definition of one yard.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Yards (yd) to Meters (m).",
      inputs: { yards: 1 },
      result: "1 yd equals 0.9144 m.",
    },
    {
      title: "Example 2",
      description: "Converting 100 Yards (yd) to Meters (m).",
      inputs: { yards: 100 },
      result: "100 yd equals 91.44 m.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a yard?",
      answer: "One yard is exactly 0.9144 meters.",
    },
    {
      question: "Is this conversion exact?",
      answer: "Yes. One yard is defined as exactly 0.9144 meters since 1959.",
    },
    {
      question: "Is a yard close to a meter?",
      answer: "Very close — a yard is about 91.4% of a meter.",
    },
  ],
  relatedSlugs: ["meters-to-yards-calculator", "feet-to-meters-calculator"],
};

export default def;
