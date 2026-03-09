import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "miles-to-meters-calculator",
  title: "Miles to Meters Calculator",
  shortTitle: "mi to m",
  description: "Convert miles to meters instantly.",
  longDescription:
    "Need to express miles in meters? This calculator multiplies by 1609.344 — the exact number of meters per international mile — giving you precise results for athletics, science, and navigation.",
  category: "conversions",
  keywords: ["miles to meters", "mi to m", "distance converter", "imperial to metric"],
  inputs: [
    {
      type: "number",
      key: "miles",
      label: "Miles (mi)",
      defaultValue: 1,
      min: 0,
      step: 0.1,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const miles = Number(values.miles);
    if (isNaN(miles) || miles < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const meters = miles * 1609.344;
    return {
      outputs: [
        {
          key: "meters",
          label: "Meters (m)",
          value: Number(meters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies your mile value by 1609.344, the internationally defined number of meters in one statute mile.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Miles (mi) to Meters (m).",
      inputs: { miles: 1 },
      result: "1 mile equals 1609.344 m.",
    },
    {
      title: "Example 2",
      description: "Converting 26.2 Miles (mi) to Meters (m).",
      inputs: { miles: 26.2 },
      result: "26.2 miles (marathon) equals approximately 42,164.7 m.",
    },
  ],
  faqs: [
    {
      question: "How many meters are in a mile?",
      answer: "Exactly 1609.344 meters.",
    },
    {
      question: "Is this the statute mile?",
      answer: "Yes. This calculator uses the international statute mile (1609.344 m), not the nautical mile.",
    },
    {
      question: "Can I use this for marathon distances?",
      answer: "Yes. A marathon is 26.2 miles, which equals approximately 42,165 meters.",
    },
  ],
  relatedSlugs: ["meters-to-miles-calculator", "kilometers-to-meters-calculator"],
};

export default def;
