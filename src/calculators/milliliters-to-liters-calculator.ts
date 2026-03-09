import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "milliliters-to-liters-calculator",
  title: "Milliliters to Liters Calculator",
  shortTitle: "mL to L",
  description: "Convert milliliters to liters instantly.",
  longDescription:
    "Need to express milliliters in liters? This calculator divides by exactly 1000, useful for chemistry, cooking, and understanding bottle or container volumes.",
  category: "conversions",
  keywords: ["milliliters to liters", "mL to L", "volume converter", "metric conversion"],
  inputs: [
    {
      type: "number",
      key: "milliliters",
      label: "Milliliters (mL)",
      defaultValue: 500,
      min: 0,
      step: 1,
      placeholder: "500",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const milliliters = Number(values.milliliters);
    if (isNaN(milliliters) || milliliters < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const liters = milliliters / 1000;
    return {
      outputs: [
        {
          key: "liters",
          label: "Liters (L)",
          value: Number(liters.toFixed(6)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "Divides by 1000, since there are 1000 milliliters in one liter.",
  examples: [
    {
      title: "Example 1",
      description: "Converting 500 Milliliters (mL) to Liters (L).",
      inputs: { milliliters: 500 },
      result: "500 mL equals 0.5 L.",
    },
    {
      title: "Example 2",
      description: "Converting 250 Milliliters (mL) to Liters (L).",
      inputs: { milliliters: 250 },
      result: "250 mL equals 0.25 L.",
    },
  ],
  faqs: [
    {
      question: "How many liters in a milliliter?",
      answer: "One milliliter equals 0.001 liters.",
    },
    {
      question: "Is this exact?",
      answer: "Yes — both are SI units.",
    },
    {
      question: "Can I use this for drinks?",
      answer: "Yes — drink cans are often 330 mL or 355 mL, which this converts to liters.",
    },
  ],
  relatedSlugs: ["liters-to-milliliters-calculator", "liters-to-cups-calculator"],
};

export default def;
