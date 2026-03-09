import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "feet-to-meters-calculator",
  title: "Feet to Meters Calculator",
  shortTitle: "ft to m",
  description: "Convert feet to meters instantly.",
  longDescription:
    "The foot is used in the US and UK while meters are the global standard. This calculator multiplies by exactly 0.3048 — the international definition of one foot in meters.",
  category: "conversions",
  keywords: ["feet to meters", "ft to m", "height converter", "imperial to metric"],
  inputs: [
    {
      type: "number",
      key: "feet",
      label: "Feet (ft)",
      defaultValue: 10,
      min: 0,
      step: 0.1,
      placeholder: "10",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const feet = Number(values.feet);
    if (isNaN(feet) || feet < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const meters = feet * 0.3048;
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
  howItWorks: "Multiplies your foot value by exactly 0.3048, which is the internationally agreed definition of the foot.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Feet (ft) to Meters (m).",
      inputs: { feet: 1 },
      result: "1 ft equals 0.3048 m.",
    },
    {
      title: "Example 2",
      description: "Converting 6 Feet (ft) to Meters (m).",
      inputs: { feet: 6 },
      result: "6 ft equals 1.8288 m.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a foot?",
      answer: "One foot is exactly 0.3048 meters.",
    },
    {
      question: "Is this conversion exact?",
      answer: "Yes. The foot is defined as exactly 0.3048 m since 1959.",
    },
    {
      question: "Can I convert height with this?",
      answer: "Yes — enter your height in feet to get the equivalent in meters.",
    },
  ],
  relatedSlugs: ["meters-to-feet-calculator", "feet-to-yards-calculator"],
};

export default def;
