import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kelvin-to-fahrenheit-calculator",
  title: "Kelvin to Fahrenheit Calculator",
  shortTitle: "K to °F",
  description: "Convert temperatures in Kelvin to Fahrenheit instantly.",
  longDescription: "Kelvin is the SI base unit for temperature used in science, while Fahrenheit is common in everyday US usage. This calculator converts any Kelvin temperature to Fahrenheit using the exact two-step formula.",
  category: "conversions",
  keywords: ["kelvin to fahrenheit", "K to F", "kelvin fahrenheit conversion"],
  inputs: [
    { type: "number", key: "value", label: "Kelvin (K)", defaultValue: 300, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const v = Number(values.value);
    if (isNaN(v) || v < 0) return { outputs: [], error: "Kelvin cannot be negative (absolute zero = 0 K)." };
    const result = (v - 273.15) * (9 / 5) + 32;
    return {
      outputs: [
        { key: "result", label: "Fahrenheit (°F)", value: Number(result.toFixed(4)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Formula: °F = (K − 273.15) × 9/5 + 32. First convert Kelvin to Celsius by subtracting 273.15, then convert Celsius to Fahrenheit.",
  examples: [
    { title: "273.15 K", description: "Freezing point of water.", inputs: { value: 273.15 }, result: "273.15 K = 32 °F" },
    { title: "373.15 K", description: "Boiling point of water.", inputs: { value: 373.15 }, result: "373.15 K = 212 °F" },
    { title: "0 K", description: "Absolute zero.", inputs: { value: 0 }, result: "0 K = −459.67 °F" },
  ],
  faqs: [
    { question: "What is absolute zero in Fahrenheit?", answer: "Absolute zero (0 K) = −459.67 °F. It is the lowest possible temperature." },
    { question: "Is Kelvin ever used in daily life?", answer: "Rarely for weather, but commonly in physics, chemistry, astronomy, and colour temperature of light bulbs (e.g. 3000 K warm white)." },
  ],
  relatedSlugs: ["fahrenheit-to-kelvin-calculator", "celsius-to-kelvin", "kelvin-to-celsius", "celsius-to-fahrenheit"],
};

export default def;
