import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ml-to-cups-calculator",
  title: "Milliliters to Cups Calculator",
  shortTitle: "mL to cups",
  description: "Convert milliliters to US cups instantly.",
  longDescription: "One US cup equals 236.588 mL, so one milliliter equals approximately 0.004227 cups. Use this calculator to convert metric liquid measurements to US cups when following American recipes.",
  category: "conversions",
  keywords: ["ml to cups", "milliliters to cups", "mL cup conversion"],
  inputs: [
    { type: "number", key: "value", label: "Milliliters (mL)", defaultValue: 250, min: 0, step: 10 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v / 236.588;
    return {
      outputs: [
        { key: "result", label: "Cups (US)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divide mL by 236.588 to get US cups. 1 US cup = 236.588 mL.",
  examples: [
    { title: "236.588 mL", description: "Exactly one US cup.", inputs: { value: 236.588 }, result: "236.588 mL = 1 cup" },
    { title: "500 mL", description: "Half a liter.", inputs: { value: 500 }, result: "500 mL ≈ 2.1134 cups" },
  ],
  faqs: [
    { question: "How many cups is 200 mL?", answer: "200 ÷ 236.588 ≈ 0.845 cups." },
    { question: "How many mL is a metric cup?", answer: "An Australian/metric cup = 250 mL. This calculator uses the US cup (236.588 mL)." },
  ],
  relatedSlugs: ["cups-to-ml-calculator", "ml-to-liters-calculator", "liters-to-ml-calculator"],
};

export default def;
