import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-difference-calculator",
  title: "Percentage Difference Calculator",
  shortTitle: "Percentage Difference",
  description:
    "Calculate the percentage difference between two numbers using the standard percent difference formula.",
  longDescription:
    "The percentage difference calculator finds how different two values are relative to their average. Unlike percentage change, percentage difference treats both values equally — there's no 'starting' value. This makes it ideal for comparing two measurements, prices, or quantities where neither is the baseline.",
  category: "life",
  keywords: [
    "percentage difference calculator",
    "percent difference formula",
    "difference between two numbers percentage",
    "how to calculate percentage difference",
  ],
  inputs: [
    {
      type: "number",
      key: "a",
      label: "First Value",
      defaultValue: 40,
      step: 0.01,
      placeholder: "40",
    },
    {
      type: "number",
      key: "b",
      label: "Second Value",
      defaultValue: 60,
      step: 0.01,
      placeholder: "60",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const a = Number(values.a);
    const b = Number(values.b);

    if (isNaN(a) || isNaN(b)) {
      return { outputs: [], error: "Please enter valid numbers for both values." };
    }

    const avg = (a + b) / 2;

    if (avg === 0) {
      return { outputs: [], error: "Percentage difference is undefined when both values are zero." };
    }

    const difference = Math.abs(a - b);
    const percentDiff = (difference / avg) * 100;

    return {
      outputs: [
        {
          key: "percentageDifference",
          label: "Percentage Difference",
          value: Number(percentDiff.toFixed(4)),
          format: "percentage",
          highlight: true,
        },
        {
          key: "absoluteDifference",
          label: "Absolute Difference",
          value: Number(difference.toFixed(4)),
          format: "number",
          helpText: "|A − B|",
        },
        {
          key: "average",
          label: "Average of Both Values",
          value: Number(avg.toFixed(4)),
          format: "number",
          helpText: "(A + B) / 2",
        },
      ],
    };
  },

  howItWorks: `Percentage difference is calculated as: |A − B| / ((A + B) / 2) × 100. First, the absolute difference between the two values is found. Then it's divided by their average (midpoint), and multiplied by 100 to express it as a percentage. This formula is symmetric — swapping A and B gives the same result.`,

  examples: [
    {
      title: "Comparing two prices: $40 vs $60",
      description: "Finding the percentage difference between two product prices.",
      inputs: { a: 40, b: 60 },
      result: "40% percentage difference.",
    },
    {
      title: "Comparing measurements: 95 vs 105",
      description: "Two lab measurements being compared for variance.",
      inputs: { a: 95, b: 105 },
      result: "Approximately 10% percentage difference.",
    },
  ],

  faqs: [
    {
      question: "What is the difference between percentage difference and percentage change?",
      answer:
        "Percentage change measures how much a value has changed from a starting point — it has a clear 'before' and 'after'. Percentage difference compares two values symmetrically with no defined direction. For example, going from 40 to 60 is a 50% increase, but the percentage difference between 40 and 60 is 40% (relative to their average of 50).",
    },
    {
      question: "Why do we divide by the average instead of one of the values?",
      answer:
        "Dividing by the average ensures the result is symmetric — it doesn't matter which value is A and which is B. If you divided by A, swapping the values would give a different answer. The average acts as a neutral reference point between the two numbers.",
    },
    {
      question: "When should I use percentage difference?",
      answer:
        "Use percentage difference when comparing two values that have equal standing — such as two competing prices, two experimental measurements, or two athletes' scores. Use percentage change instead when one value is clearly the original and the other is the new value (like a price increase over time).",
    },
  ],

  relatedSlugs: [
    "percentage-change-calculator",
    "percentage-increase-calculator",
    "percentage-decrease-calculator",
  ],
};

export default def;
