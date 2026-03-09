import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mph-to-kmh",
  title: "MPH to KM/H Calculator",
  shortTitle: "mph to km/h",
  description: "Convert miles per hour to kilometers per hour instantly.",
  longDescription:
    "Miles per hour (mph) is the standard speed unit in the United States and United Kingdom, while kilometers per hour (km/h) is used in most of the rest of the world. Whether you're driving abroad, reading a foreign speedometer, or comparing vehicle specs, this calculator gives you an instant and accurate conversion.",
  category: "conversions",
  keywords: ["mph to kmh", "miles per hour to kilometers per hour", "speed converter", "velocity conversion"],
  inputs: [
    {
      type: "number",
      key: "mph",
      label: "Miles Per Hour (mph)",
      defaultValue: 60,
      min: 0,
      step: 1,
      placeholder: "60",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const mph = Number(values.mph);

    if (isNaN(mph) || mph < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const kmh = mph * 1.60934;

    return {
      outputs: [
        {
          key: "kmh",
          label: "Kilometers Per Hour (km/h)",
          value: Number(kmh.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your mph value by 1.60934 — the exact number of kilometers in one international mile. This is the same factor used to convert miles to kilometers, applied to a per-hour rate.",
  examples: [
    {
      title: "Highway Speed Limit",
      description: "A common US highway speed limit of 60 mph.",
      inputs: { mph: 60 },
      result: "60 mph equals approximately 96.56 km/h.",
    },
    {
      title: "City Speed Limit",
      description: "A typical city speed limit of 30 mph.",
      inputs: { mph: 30 },
      result: "30 mph equals approximately 48.28 km/h.",
    },
    {
      title: "Top Speed Reference",
      description: "Converting 100 mph to km/h.",
      inputs: { mph: 100 },
      result: "100 mph equals approximately 160.93 km/h.",
    },
  ],
  faqs: [
    {
      question: "How many km/h is 1 mph?",
      answer: "1 mile per hour equals approximately 1.60934 kilometers per hour.",
    },
    {
      question: "Why do some countries use mph and others km/h?",
      answer: "Countries that historically used the imperial system (US, UK) use mph. Most other countries adopted the metric system and use km/h.",
    },
    {
      question: "Is this useful for running pace?",
      answer: "Yes. Treadmills and fitness apps in different countries display speed in either mph or km/h, so this converter is handy for cross-referencing workout speeds.",
    },
  ],
  relatedSlugs: ["kmh-to-mph", "miles-to-km", "feet-to-meters"],
};

export default def;
