import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "liters-to-milliliters-calculator",
  title: "Liters to Milliliters Calculator",
  shortTitle: "L to mL",
  description: "Convert liters to milliliters instantly.",
  longDescription:
    "Milliliters are used in medicine, cooking, and chemistry for small volumes. This calculator multiplies your liter value by exactly 1000 to convert to milliliters.",
  category: "conversions",
  keywords: ["liters to milliliters", "L to mL", "volume converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "liters",
      label: "Liters (L)",
      defaultValue: 1,
      min: 0,
      step: 0.001,
      placeholder: "1",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const liters = Number(values.liters);
    if (isNaN(liters) || liters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const milliliters = liters * 1000;
    return {
      outputs: [
        {
          key: "milliliters",
          label: "Milliliters (mL)",
          value: Number(milliliters.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Multiplies by 1000, since 'milli-' means one thousandth of a liter.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 1 Liters (L) to Milliliters (mL).",
      inputs: { liters: 1 },
      result: "1 L equals 1000 mL.",
    },
    {
      title: "Example 2",
      description: "Converting 0.5 Liters (L) to Milliliters (mL).",
      inputs: { liters: 0.5 },
      result: "0.5 L equals 500 mL.",
    },
  ],
  faqs: [
    {
      question: "How many milliliters in a liter?",
      answer: "Exactly 1000 milliliters.",
    },
    {
      question: "Is this useful in medicine?",
      answer: "Yes — liquid medications and IV fluids are commonly measured in mL.",
    },
    {
      question: "Is the conversion exact?",
      answer: "Yes. Both are SI metric units.",
    },
  ],
  relatedSlugs: ["milliliters-to-liters-calculator", "liters-to-cups-calculator"],
};

export default def;
