import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "psi-to-bar-calculator",
  title: "PSI to Bar Calculator",
  shortTitle: "psi to bar",
  description: "Convert pressure in PSI to bar instantly.",
  longDescription: "One PSI (pound per square inch) equals approximately 0.0689476 bar. Use this calculator to convert PSI pressure readings to bar — useful when switching between US and European tools, tyre gauges, or pressure regulators.",
  category: "conversions",
  keywords: ["psi to bar", "psi bar conversion", "pressure conversion psi bar"],
  inputs: [
    { type: "number", key: "value", label: "PSI", defaultValue: 30, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Please enter a valid non-negative number." };
    const result = v * 0.0689476;
    return {
      outputs: [
        { key: "result", label: "Bar", value: Number(result.toFixed(6)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiply PSI by 0.0689476. 1 PSI = 6,894.76 Pa = 0.0689476 bar.",
  examples: [
    { title: "30 PSI", description: "Standard car tyre.", inputs: { value: 30 }, result: "30 PSI ≈ 2.068 bar" },
    { title: "14.696 PSI", description: "Standard atmosphere.", inputs: { value: 14.696 }, result: "14.696 PSI ≈ 1.013 bar" },
  ],
  faqs: [
    { question: "What is a normal tire pressure in bar?", answer: "Most car tyres require 2.0–2.5 bar (29–36 PSI). Check your vehicle's door placard for the exact value." },
    { question: "How do I convert PSI to kPa?", answer: "Multiply PSI by 6.89476 to get kilopascals." },
  ],
  relatedSlugs: ["bar-to-psi-calculator", "kelvin-to-fahrenheit-calculator", "fahrenheit-to-kelvin-calculator"],
};

export default def;
