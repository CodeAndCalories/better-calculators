import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-increase-calculator",
  title: "Percentage Increase Calculator",
  shortTitle: "Percent Increase",
  description: "Calculate the percentage increase between two numbers instantly.",
  longDescription:
    "The Percentage Increase Calculator determines how much a value has increased in percentage terms. Enter the original value and the new value to instantly see the percent increase. This is commonly used for price changes, salary increases, investments, and growth metrics.",

  category: "life",

  keywords: [
    "percentage increase calculator",
    "percent increase calculator",
    "calculate percentage increase",
  ],

  inputs: [
    {
      type: "number",
      key: "original",
      label: "Original Value",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100",
    },
    {
      type: "number",
      key: "newValue",
      label: "New Value",
      defaultValue: 120,
      min: 0,
      step: 1,
      placeholder: "120",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const original = Number(values.original);
    const newValue = Number(values.newValue);

    if (original === 0) {
      return {
        outputs: [
          {
            key: "error",
            label: "Error",
            value: "Original value cannot be zero.",
            format: "text",
            highlight: true,
          },
        ],
      };
    }

    const increase = newValue - original;
    const percent = (increase / original) * 100;

    return {
      outputs: [
        {
          key: "percentIncrease",
          label: "Percentage Increase",
          value: Number(percent.toFixed(2)),
          format: "number",
          highlight: true,
        },
        {
          key: "difference",
          label: "Increase Amount",
          value: Number(increase.toFixed(2)),
          format: "number",
        },
      ],
    };
  },

  howItWorks:
    "Percentage increase is calculated by subtracting the original value from the new value, dividing by the original value, then multiplying by 100.",

  examples: [
    {
      title: "Price Increase",
      description: "A product increases from $100 to $120.",
      inputs: { original: 100, newValue: 120 },
      result: "20% increase.",
    },
  ],

  faqs: [
    {
      question: "How do you calculate percentage increase?",
      answer:
        "Subtract the original value from the new value, divide the result by the original value, then multiply by 100.",
    },
    {
      question: "What is a percentage increase used for?",
      answer:
        "It is commonly used to measure growth in prices, salaries, investments, and statistics.",
    },
  ],

  relatedSlugs: [
    "percentage-decrease-calculator",
  ],
};

export default def;