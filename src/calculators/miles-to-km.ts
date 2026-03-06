import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "miles-to-km",
  title: "Miles to Kilometers Calculator",
  shortTitle: "Miles to km",
  description: "Convert miles to kilometers with precision.",
  longDescription:
    "Miles are used in the United States and United Kingdom, while kilometers are the standard in most of the world. Whether you're planning a road trip abroad, tracking a run, or reading a foreign map, this converter gives you an instant and accurate result.",
  category: "conversion",
  keywords: ["miles to km", "miles to kilometers", "distance converter", "length conversion"],
  inputs: [
    {
      type: "number",
      key: "miles",
      label: "Miles",
      defaultValue: 10,
      min: 0,
      step: 0.1,
      placeholder: "10",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const miles = Number(values.miles);

    if (isNaN(miles) || miles < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const kilometers = miles * 1.60934;

    return {
      outputs: [
        {
          key: "kilometers",
          label: "Kilometers (km)",
          value: Number(kilometers.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your mile value by 1.60934, the exact number of kilometers in one international mile. This factor is defined by the international yard and pound agreement of 1959.",
  examples: [
    {
      title: "5K Race Distance",
      description: "How many miles is a 5K race? Let's check the reverse — 3.1 miles in kilometers.",
      inputs: { miles: 3.1 },
      result: "3.1 miles equals 4.9890 km, very close to the standard 5K distance.",
    },
    {
      title: "Highway Speed Sign",
      description: "A speed limit sign says 60 miles — how far is that in km?",
      inputs: { miles: 60 },
      result: "60 miles equals 96.5604 km.",
    },
  ],
  faqs: [
    {
      question: "How many kilometers are in a mile?",
      answer: "One mile is equal to 1.60934 kilometers.",
    },
    {
      question: "Why is the US still using miles?",
      answer: "The US uses the customary system rooted in British Imperial units, which predates the global adoption of the metric system.",
    },
    {
      question: "Can I use this for running pace conversions?",
      answer: "This converts distance only. For pace, you would also need to factor in time (e.g., min/mile to min/km).",
    },
  ],
  relatedSlugs: ["kg-to-lbs", "inches-to-cm"],
};

export default def;
