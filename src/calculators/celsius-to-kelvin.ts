import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "celsius-to-kelvin",
  title: "Celsius to Kelvin Calculator",
  shortTitle: "°C to K",
  description: "Convert Celsius to Kelvin for science and engineering.",
  longDescription:
    "Kelvin is the SI base unit of temperature and is widely used in physics, chemistry, and engineering. Unlike Celsius and Fahrenheit, Kelvin starts at absolute zero — the coldest theoretically possible temperature. Converting from Celsius to Kelvin is a common step in scientific calculations.",
  category: "life",
  keywords: ["celsius to kelvin", "c to k", "temperature converter", "kelvin conversion", "scientific temperature"],
  inputs: [
    {
      type: "number",
      key: "celsius",
      label: "Celsius (°C)",
      defaultValue: 25,
      step: 0.1,
      placeholder: "25",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const celsius = Number(values.celsius);

    if (isNaN(celsius)) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const kelvin = celsius + 273.15;

    return {
      outputs: [
        {
          key: "kelvin",
          label: "Kelvin (K)",
          value: Number(kelvin.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The Kelvin scale is offset from Celsius by exactly 273.15. Adding 273.15 to any Celsius temperature gives the equivalent Kelvin value. The size of one degree is identical in both scales.",
  examples: [
    {
      title: "Room Temperature",
      description: "A typical room temperature of 25°C.",
      inputs: { celsius: 25 },
      result: "25°C equals 298.15 K.",
    },
    {
      title: "Absolute Zero",
      description: "The coldest possible temperature: −273.15°C.",
      inputs: { celsius: -273.15 },
      result: "−273.15°C equals 0 K (absolute zero).",
    },
    {
      title: "Boiling Point of Water",
      description: "Water boils at 100°C.",
      inputs: { celsius: 100 },
      result: "100°C equals 373.15 K.",
    },
  ],
  faqs: [
    {
      question: "What is the formula for Celsius to Kelvin?",
      answer: "The formula is K = °C + 273.15.",
    },
    {
      question: "Why does Kelvin start at absolute zero?",
      answer: "Kelvin was designed as a thermodynamic scale where 0 K represents the complete absence of thermal energy — the lowest possible temperature in the universe.",
    },
    {
      question: "Does Kelvin use a degree symbol?",
      answer: "No. Kelvin values are written without a degree symbol — for example, 300 K, not 300°K.",
    },
  ],
  relatedSlugs: ["kelvin-to-celsius", "celsius-to-fahrenheit", "fahrenheit-to-celsius"],
};

export default def;
