import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "celsius-to-fahrenheit",
  title: "Celsius to Fahrenheit Calculator",
  shortTitle: "°C to °F",
  description: "Convert Celsius to Fahrenheit instantly.",
  longDescription:
    "Celsius and Fahrenheit are the two most commonly used temperature scales in daily life. Celsius is the standard in most of the world, while Fahrenheit is primarily used in the United States. Enter any Celsius temperature to get the precise Fahrenheit equivalent.",
  category: "life",
  keywords: ["celsius to fahrenheit", "c to f", "temperature converter", "temperature conversion"],
  inputs: [
    {
      type: "number",
      key: "celsius",
      label: "Celsius (°C)",
      defaultValue: 100,
      step: 0.1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const celsius = Number(values.celsius);

    if (isNaN(celsius)) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const fahrenheit = (celsius * 9) / 5 + 32;

    return {
      outputs: [
        {
          key: "fahrenheit",
          label: "Fahrenheit (°F)",
          value: Number(fahrenheit.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies the Celsius value by 9/5 (1.8), then adds 32. This accounts for both the different scale size between the two units and the offset in their zero points.",
  examples: [
    {
      title: "Boiling Point of Water",
      description: "100°C is the boiling point of water at sea level.",
      inputs: { celsius: 100 },
      result: "100°C equals 212°F.",
    },
    {
      title: "Body Temperature",
      description: "Normal human body temperature is 37°C.",
      inputs: { celsius: 37 },
      result: "37°C equals 98.6°F.",
    },
    {
      title: "Freezing Point",
      description: "Water freezes at 0°C.",
      inputs: { celsius: 0 },
      result: "0°C equals 32°F.",
    },
  ],
  faqs: [
    {
      question: "What is the formula for Celsius to Fahrenheit?",
      answer: "The formula is °F = (°C × 9/5) + 32.",
    },
    {
      question: "At what temperature are Celsius and Fahrenheit equal?",
      answer: "Celsius and Fahrenheit are equal at -40°. Both scales read -40 at that point.",
    },
    {
      question: "Why does the US use Fahrenheit?",
      answer: "The US adopted Fahrenheit in the colonial era and never switched to Celsius when the metric system became the global standard.",
    },
  ],
  relatedSlugs: ["fahrenheit-to-celsius", "celsius-to-kelvin", "kelvin-to-celsius"],
};

export default def;
