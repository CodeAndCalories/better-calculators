import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "cups-to-ml-calculator",
  title: "Cups to Milliliters Calculator",
  shortTitle: "cups to mL",
  description: "Convert US cups to milliliters instantly.",
  longDescription: "One US cup equals exactly 236.588 mL. Use this calculator to convert cup measurements to milliliters — essential when following international recipes or using metric measuring equipment.",
  category: "conversions",
  keywords: ["cups to ml", "cups to milliliters", "cup ml conversion cooking"],
  inputs: [
    { type: "number", key: "value", label: "Cups (US)", defaultValue: 1, min: 0, step: 0.25 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 236.588;
    return {
      outputs: [
        { key: "result", label: "Milliliters (mL)", value: Number(result.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply US cups by 236.588. 1 US cup = 236.588 mL (8 US fluid ounces).",
  examples: [
    { title: "1 cup", description: "Standard recipe cup.", inputs: { value: 1 }, result: "1 cup = 236.59 mL" },
    { title: "0.5 cup", description: "Half cup.", inputs: { value: 0.5 }, result: "0.5 cup = 118.29 mL" },
  ],
  faqs: [
    { question: "Is a US cup the same as a metric cup?", answer: "No. A US cup = 236.588 mL. An Australian/metric cup = 250 mL. This calculator uses the US cup." },
    { question: "How many mL is 2 cups?", answer: "2 × 236.588 = 473.176 mL." },
  ],
  relatedSlugs: ["ml-to-cups-calculator", "tablespoons-to-teaspoons-calculator", "liters-to-ml-calculator"],
};

export default def;
