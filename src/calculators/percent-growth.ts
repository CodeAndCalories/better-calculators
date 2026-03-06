import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percent-growth",
  title: "Percent Growth Calculator",
  shortTitle: "Percent Growth",
  description: "Calculate the percentage growth or decline between two values.",
  longDescription:
    "Percent growth (or percent change) tells you how much a value has increased or decreased relative to its starting point. It's widely used in finance, business, science, and everyday life — from tracking revenue growth to comparing population figures or measuring personal progress.",
  category: "finance",
  keywords: ["percent growth", "percentage growth", "percent change", "growth rate calculator", "rate of change"],
  inputs: [
    {
      type: "number",
      key: "oldValue",
      label: "Old Value",
      defaultValue: 200,
      step: 0.01,
      placeholder: "200",
    },
    {
      type: "number",
      key: "newValue",
      label: "New Value",
      defaultValue: 250,
      step: 0.01,
      placeholder: "250",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const oldValue = Number(values.oldValue);
    const newValue = Number(values.newValue);

    if (isNaN(oldValue) || isNaN(newValue)) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    if (oldValue === 0) {
      return { outputs: [], error: "Old value cannot be zero." };
    }

    const percentGrowth = ((newValue - oldValue) / Math.abs(oldValue)) * 100;

    return {
      outputs: [
        {
          key: "percentGrowth",
          label: "Percent Growth",
          value: Number(percentGrowth.toFixed(4)),
          format: "percentage",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator subtracts the old value from the new value, divides by the absolute old value, and multiplies by 100. A positive result means growth; a negative result means decline.",
  examples: [
    {
      title: "Revenue Increase",
      description: "Revenue grew from $200,000 to $250,000.",
      inputs: { oldValue: 200000, newValue: 250000 },
      result: "Revenue grew by 25%.",
    },
    {
      title: "Price Drop",
      description: "A product dropped from $80 to $60.",
      inputs: { oldValue: 80, newValue: 60 },
      result: "The price declined by 25%.",
    },
    {
      title: "User Growth",
      description: "Monthly active users went from 1,500 to 1,800.",
      inputs: { oldValue: 1500, newValue: 1800 },
      result: "User count grew by 20%.",
    },
  ],
  faqs: [
    {
      question: "Can the result be negative?",
      answer: "Yes. A negative percent growth indicates a decline. For example, going from 100 to 80 returns -20%.",
    },
    {
      question: "What is the difference between percent growth and percent error?",
      answer: "Percent growth measures directional change from one value to another. Percent error measures how far a value deviates from a known correct reference, always as a positive number.",
    },
    {
      question: "Can I use this for year-over-year comparisons?",
      answer: "Yes. Enter last year's figure as the old value and this year's figure as the new value to get the year-over-year growth rate.",
    },
  ],
  relatedSlugs: ["percent-error", "roi-calculator", "compound-growth-calculator"],
};

export default def;
