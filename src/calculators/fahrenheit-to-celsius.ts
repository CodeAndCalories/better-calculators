import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "fahrenheit-to-celsius",
  title: "Fahrenheit to Celsius Calculator",
  shortTitle: "°F to °C",
  description: "Convert Fahrenheit to Celsius instantly.",
  longDescription:
    "When traveling internationally or reading a foreign weather forecast, converting Fahrenheit to Celsius is an essential skill. This calculator takes any Fahrenheit value and gives you the precise Celsius equivalent using the standard conversion formula.",
  category: "life",
  keywords: ["fahrenheit to celsius", "f to c", "temperature converter", "temperature conversion"],
  inputs: [
    {
      type: "number",
      key: "fahrenheit",
      label: "Fahrenheit (°F)",
      defaultValue: 72,
      step: 0.1,
      placeholder: "72",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const fahrenheit = Number(values.fahrenheit);

    if (isNaN(fahrenheit)) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const celsius = ((fahrenheit - 32) * 5) / 9;

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
    "The calculator subtracts 32 from the Fahrenheit value to remove the zero-point offset, then multiplies by 5/9 to scale the result to the Celsius unit size.",
  examples: [
    {
      title: "Room Temperature",
      description: "A comfortable room temperature of 72°F.",
      inputs: { fahrenheit: 72 },
      result: "72°F equals approximately 22.2°C.",
    },
    {
      title: "Freezing Point",
      description: "Water freezes at 32°F.",
      inputs: { fahrenheit: 32 },
      result: "32°F equals 0°C.",
    },
    {
      title: "Fever",
      description: "A mild fever of 101°F.",
      inputs: { fahrenheit: 101 },
      result: "101°F equals approximately 38.33°C.",
    },
  ],
  faqs: [
    {
      question: "What is the formula for Fahrenheit to Celsius?",
      answer: "The formula is °C = (°F − 32) × 5/9.",
    },
    {
      question: "What is a normal outdoor temperature in Celsius?",
      answer: "A pleasant day is around 20–25°C (68–77°F). Hot summer days are typically above 30°C (86°F).",
    },
    {
      question: "Can I convert negative Fahrenheit values?",
      answer: "Yes. The formula works for any temperature, including negative values.",
    },
  ],
  relatedSlugs: ["celsius-to-fahrenheit", "celsius-to-kelvin", "kelvin-to-celsius"],
};

export default def;
