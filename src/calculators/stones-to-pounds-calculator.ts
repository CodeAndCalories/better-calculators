import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "stones-to-pounds-calculator",
  title: "Stones to Pounds Calculator",
  shortTitle: "st to lbs",
  description: "Convert stones to pounds instantly.",
  longDescription: "The stone is a unit of weight used in the UK and Ireland, equal to exactly 14 pounds. This calculator converts any stone value to pounds.",
  category: "conversions",
  keywords: ["stones to pounds", "st to lbs", "UK weight converter", "stones and pounds"],
  inputs: [
    { type: "number", key: "stones", label: "Stones (st)", defaultValue: 10, min: 0, step: 0.5, placeholder: "10" },
  ],
  compute(values: InputValues): ComputeResult {
    const stones = Number(values.stones);
    if (isNaN(stones) || stones < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const pounds = stones * 14;
    return {
      outputs: [
        { key: "pounds", label: "Pounds (lbs)", value: Number(pounds.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiplies stones by 14, since one stone is defined as exactly 14 pounds.",
  examples: [
    {
      title: "Average Adult Weight",
      description: "10 stone in pounds.",
      inputs: { stones: 10 },
      result: "140 lbs.",
    },
    {
      title: "Heavyweight Boxer",
      description: "14 stone in pounds.",
      inputs: { stones: 14 },
      result: "196 lbs.",
    },
  ],
  faqs: [
    { question: "How many pounds are in a stone?", answer: "Exactly 14 pounds." },
    { question: "Is the stone still used today?", answer: "Yes — in the UK and Ireland, body weight is commonly expressed in stone and pounds." },
    { question: "How do I convert stones and pounds together?", answer: "Multiply the stone part by 14 and add the extra pounds." },
  ],
  relatedSlugs: ["pounds-to-stones-calculator", "kg-to-lbs", "lbs-to-kg"],
};

export default def;
