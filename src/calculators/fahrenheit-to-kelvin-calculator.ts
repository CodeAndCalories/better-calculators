import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "fahrenheit-to-kelvin-calculator",
  title: "Fahrenheit to Kelvin Calculator",
  shortTitle: "°F to K",
  description: "Convert temperatures in Fahrenheit to Kelvin instantly.",
  longDescription: "Convert everyday Fahrenheit temperatures to Kelvin, the absolute temperature scale used in science. Kelvin starts at absolute zero (−459.67 °F) and uses the same degree size as Celsius.",
  category: "conversions",
  keywords: ["fahrenheit to kelvin", "F to K", "fahrenheit kelvin conversion"],
  inputs: [
    { type: "number", key: "value", label: "Fahrenheit (°F)", defaultValue: 72, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v)) return { outputs: [], error: "Please enter a valid number." };
    const result = (v - 32) * (5 / 9) + 273.15;
    if (result < 0) return { outputs: [], error: "Result is below absolute zero. Check your input." };
    return {
      outputs: [
        { key: "result", label: "Kelvin (K)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Formula: K = (°F − 32) × 5/9 + 273.15. First convert Fahrenheit to Celsius, then add 273.15 to get Kelvin.",
  examples: [
    { title: "32 °F", description: "Freezing point of water.", inputs: { value: 32 }, result: "32 °F = 273.15 K" },
    { title: "212 °F", description: "Boiling point of water.", inputs: { value: 212 }, result: "212 °F = 373.15 K" },
    { title: "98.6 °F", description: "Normal body temperature.", inputs: { value: 98.6 }, result: "98.6 °F = 310.15 K" },
  ],
  faqs: [
    { question: "Why add 273.15 to convert from Celsius to Kelvin?", answer: "Absolute zero (the coldest possible temperature) is −273.15 °C. Kelvin starts at absolute zero, so K = °C + 273.15." },
    { question: "Is there a negative Kelvin temperature?", answer: "No. Kelvin is an absolute scale — 0 K is the lowest possible temperature, and negative Kelvin values do not exist in classical thermodynamics." },
  ],
  relatedSlugs: ["kelvin-to-fahrenheit-calculator", "fahrenheit-to-celsius", "celsius-to-kelvin", "celsius-to-fahrenheit"],
};

export default def;
