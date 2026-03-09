import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "pounds-to-kg-calculator",
  title: "Pounds to Kilograms Calculator",
  shortTitle: "lbs to kg",
  description: "Convert pounds to kilograms instantly.",
  longDescription:
    "Whether you're tracking your weight, shipping goods, or following a fitness plan, converting pounds to kilograms is a common need. This calculator applies the exact conversion factor of 0.45359237 kg per pound.",
  category: "conversions",
  keywords: ["pounds to kg", "lbs to kilograms", "weight converter", "mass conversion"],
  inputs: [
    {
      type: "number",
      key: "pounds",
      label: "Pounds (lbs)",
      defaultValue: 150,
      min: 0,
      step: 0.1,
      placeholder: "150",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const pounds = Number(values.pounds);
    if (isNaN(pounds) || pounds < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const kilograms = pounds * 0.45359237;
    return {
      outputs: [
        {
          key: "kilograms",
          label: "Kilograms (kg)",
          value: Number(kilograms.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your pound value by 0.45359237, the exact international definition of one pound in kilograms.",
  examples: [
    {
      title: "Average Adult Weight",
      description: "Converting 150 lbs to kilograms.",
      inputs: { pounds: 150 },
      result: "150 lbs equals approximately 68.0389 kg.",
    },
    {
      title: "Checked Baggage Limit",
      description: "Converting a 50 lb airline baggage limit to kilograms.",
      inputs: { pounds: 50 },
      result: "50 lbs equals approximately 22.6796 kg.",
    },
  ],
  faqs: [
    {
      question: "How many kilograms are in a pound?",
      answer: "One pound equals exactly 0.45359237 kilograms.",
    },
    {
      question: "Is this the same as converting lb to kg?",
      answer: "Yes. 'Lbs' and 'lb' are both abbreviations for the pound unit.",
    },
    {
      question: "Can I use this for body weight?",
      answer: "Absolutely. Enter your weight in pounds to get the equivalent in kilograms.",
    },
  ],
  relatedSlugs: ["kg-to-pounds-calculator", "kg-to-lbs"],
};

export default def;
