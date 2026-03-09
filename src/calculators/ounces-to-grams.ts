import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "ounces-to-grams",
  title: "Ounces to Grams Calculator",
  shortTitle: "oz to g",
  description: "Convert ounces to grams for cooking, nutrition, and shipping.",
  longDescription:
    "Whether you're following a metric recipe, reading a nutrition label, or calculating a shipping weight, converting ounces to grams is a frequent need. This calculator gives you an accurate result using the exact defined conversion factor.",
  category: "conversions",
  keywords: ["ounces to grams", "oz to g", "weight converter", "mass conversion", "cooking converter"],
  inputs: [
    {
      type: "number",
      key: "ounces",
      label: "Ounces (oz)",
      defaultValue: 8,
      min: 0,
      step: 0.1,
      placeholder: "8",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const ounces = Number(values.ounces);

    if (isNaN(ounces) || ounces < 0) {
      return { outputs: [], error: "Please enter a valid non-negative number." };
    }

    const grams = ounces * 28.3495;

    return {
      outputs: [
        {
          key: "grams",
          label: "Grams (g)",
          value: Number(grams.toFixed(4)),
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your ounce value by 28.3495, the exact mass of one avoirdupois ounce in grams. This gives a precise gram equivalent for any ounce input.",
  examples: [
    {
      title: "Half Cup of Flour",
      description: "A half cup of all-purpose flour weighs about 2 oz.",
      inputs: { ounces: 2 },
      result: "2 ounces equals approximately 56.699 grams.",
    },
    {
      title: "One Pound",
      description: "There are 16 ounces in a pound — converting to grams.",
      inputs: { ounces: 16 },
      result: "16 ounces equals approximately 453.592 grams.",
    },
    {
      title: "Protein Bar",
      description: "A typical protein bar weighs about 2.5 oz.",
      inputs: { ounces: 2.5 },
      result: "2.5 ounces equals approximately 70.874 grams.",
    },
  ],
  faqs: [
    {
      question: "How many grams are in an ounce?",
      answer: "One avoirdupois ounce equals exactly 28.3495 grams.",
    },
    {
      question: "What is the difference between a dry ounce and a fluid ounce?",
      answer: "A dry ounce measures mass (weight), while a fluid ounce measures volume. This calculator uses dry ounces.",
    },
    {
      question: "How do I convert pounds to grams?",
      answer: "First multiply your pounds by 16 to get ounces, then multiply by 28.3495. Or simply multiply your pounds by 453.592 directly.",
    },
  ],
  relatedSlugs: ["grams-to-ounces", "kg-to-lbs", "lbs-to-kg"],
};

export default def;
