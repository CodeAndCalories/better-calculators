import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "pounds-to-stones-calculator",
  title: "Pounds to Stones Calculator",
  shortTitle: "lbs to st",
  description: "Convert pounds to stones instantly.",
  longDescription: "The stone is used in the UK and Ireland for body weight. This calculator divides your pound value by 14 to give the equivalent in stones — useful for reading UK weight references.",
  category: "conversions",
  keywords: ["pounds to stones", "lbs to st", "UK weight converter", "pounds in stones"],
  inputs: [
    { type: "number", key: "pounds", label: "Pounds (lbs)", defaultValue: 154, min: 0, step: 1, placeholder: "154" },
  ],
  compute(values: InputValues): ComputeResult {
    const pounds = Number(values.pounds);
    if (isNaN(pounds) || pounds < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }
    const stones = pounds / 14;
    const wholeStones = Math.floor(stones);
    const remainingLbs = pounds - wholeStones * 14;
    return {
      outputs: [
        { key: "stones", label: "Stones (decimal)", value: Number(stones.toFixed(3)), format: "number", highlight: true },
        { key: "stonesAndPounds", label: "Stones + Pounds (remaining)", value: Number((wholeStones + remainingLbs / 100).toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks: "Divides pounds by 14, since one stone equals exactly 14 pounds.",
  examples: [
    {
      title: "Average Adult",
      description: "154 lbs to stones.",
      inputs: { pounds: 154 },
      result: "11 stone exactly.",
    },
    {
      title: "Heavy Build",
      description: "200 lbs to stones.",
      inputs: { pounds: 200 },
      result: "14 stone 4 lbs (14.286 stone).",
    },
  ],
  faqs: [
    { question: "How many pounds are in a stone?", answer: "Exactly 14 pounds." },
    { question: "How do I express partial stones?", answer: "14.5 stone = 14 stone 7 lbs. Multiply the decimal part by 14 to get the remaining pounds." },
    { question: "Is stones used in the US?", answer: "No — the US uses pounds only. Stones are primarily used in the UK and Ireland." },
  ],
  relatedSlugs: ["stones-to-pounds-calculator", "lbs-to-kg", "kg-to-lbs"],
};

export default def;
