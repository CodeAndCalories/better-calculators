import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kelvin-to-celsius",
  title: "Kelvin to Celsius Calculator",
  shortTitle: "K to °C",
  description: "Convert Kelvin to Celsius for everyday temperature understanding.",
  longDescription:
    "Kelvin values appear frequently in scientific literature, physics problems, and engineering specs. This calculator lets you quickly convert any Kelvin temperature to the more intuitive Celsius scale, helping you understand what a given value means in practical terms.",
  category: "life",
  keywords: ["kelvin to celsius", "k to c", "temperature converter", "kelvin conversion", "scientific temperature"],
  inputs: [
    {
      type: "number",
      key: "kelvin",
      label: "Kelvin (K)",
      defaultValue: 298,
      min: 0,
      step: 0.1,
      placeholder: "298",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kelvin = Number(values.kelvin);

    if (isNaN(kelvin) || kelvin < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const celsius = kelvin - 273.15;

    return {
      outputs: [
        {
          key: "celsius",
          label: "Celsius (°C)",
          value: Number(celsius.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "Since the Kelvin and Celsius scales share the same degree size, converting from Kelvin to Celsius simply requires subtracting 273.15 — the offset between their zero points.",
  examples: [
    {
      title: "Room Temperature",
      description: "A standard room temperature of 298 K.",
      inputs: { kelvin: 298 },
      result: "298 K equals 24.85°C.",
    },
    {
      title: "Absolute Zero",
      description: "The lowest possible temperature: 0 K.",
      inputs: { kelvin: 0 },
      result: "0 K equals −273.15°C.",
    },
    {
      title: "Boiling Point of Water",
      description: "Water boils at 373.15 K.",
      inputs: { kelvin: 373.15 },
      result: "373.15 K equals 100°C.",
    },
  ],
  faqs: [
    {
      question: "What is the formula for Kelvin to Celsius?",
      answer: "The formula is °C = K − 273.15.",
    },
    {
      question: "Can Kelvin be negative?",
      answer: "No. Kelvin cannot go below 0 K (absolute zero), as it represents the complete absence of thermal energy. Negative Kelvin values are physically impossible.",
    },
    {
      question: "When would I need to convert Kelvin to Celsius?",
      answer: "This conversion is common when interpreting scientific data, working through physics or chemistry problems, or reading research papers that report temperatures in Kelvin.",
    },
  ],
  relatedSlugs: ["celsius-to-kelvin", "celsius-to-fahrenheit", "fahrenheit-to-celsius"],
};

export default def;
