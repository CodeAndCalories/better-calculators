import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "kmh-to-mph",
  title: "KM/H to MPH Calculator",
  shortTitle: "km/h to mph",
  description: "Convert kilometers per hour to miles per hour instantly.",
  longDescription:
    "When driving in the US or UK after traveling from a metric country, or reading a car's European spec sheet, converting km/h to mph is essential. This calculator applies the exact conversion factor so you always know what a given speed means in miles per hour.",
  category: "life",
  keywords: ["kmh to mph", "kilometers per hour to miles per hour", "speed converter", "velocity conversion"],
  inputs: [
    {
      type: "number",
      key: "kmh",
      label: "Kilometers Per Hour (km/h)",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const kmh = Number(values.kmh);

    if (isNaN(kmh) || kmh < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const mph = kmh / 1.60934;

    return {
      outputs: [
        {
          key: "mph",
          label: "Miles Per Hour (mph)",
          value: Number(mph.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your km/h value by 1.60934 — the number of kilometers per mile — to reverse the conversion and give you the equivalent speed in miles per hour.",
  examples: [
    {
      title: "European Motorway Limit",
      description: "A common European motorway speed limit of 130 km/h.",
      inputs: { kmh: 130 },
      result: "130 km/h equals approximately 80.78 mph.",
    },
    {
      title: "City Speed",
      description: "A standard urban speed limit of 50 km/h.",
      inputs: { kmh: 50 },
      result: "50 km/h equals approximately 31.07 mph.",
    },
    {
      title: "Round Number Reference",
      description: "Converting exactly 100 km/h to mph.",
      inputs: { kmh: 100 },
      result: "100 km/h equals approximately 62.14 mph.",
    },
  ],
  faqs: [
    {
      question: "How many mph is 100 km/h?",
      answer: "100 km/h is approximately 62.14 mph.",
    },
    {
      question: "Is 60 km/h the same as 60 mph?",
      answer: "No. 60 km/h is approximately 37.28 mph — significantly slower than 60 mph.",
    },
    {
      question: "Can I use this for wind speed conversion?",
      answer: "Yes. Wind speeds are often reported in both km/h and mph depending on the country, and this converter works for any speed value.",
    },
  ],
  relatedSlugs: ["mph-to-kmh", "miles-to-km", "meters-to-feet"],
};

export default def;
