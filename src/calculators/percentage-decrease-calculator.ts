import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-decrease-calculator",
  title: "Percentage Decrease Calculator",
  shortTitle: "Percent Decrease",

  description: "Calculate the percentage decrease between two values instantly.",

  longDescription:
    "The Percentage Decrease Calculator helps you determine how much a value has dropped in percentage terms. Enter the original value and the new lower value to see the percent decrease.",

  category: "life",

  keywords: [
    "percentage decrease calculator",
    "percent decrease calculator",
    "calculate percent decrease",
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
      defaultValue: 80,
      min: 0,
      step: 1,
      placeholder: "80",
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

    const decrease = original - newValue;
    const percent = (decrease / original) * 100;

    return {
      outputs: [
        {
          key: "percentDecrease",
          label: "Percentage Decrease",
          value: Number(percent.toFixed(2)),
          format: "number",
          highlight: true,
        },
        {
          key: "difference",
          label: "Decrease Amount",
          value: Number(decrease.toFixed(2)),
          format: "number",
        },
      ],
    };
  },

  howItWorks:
    "Percentage decrease is calculated by subtracting the new value from the original value, dividing by the original value, then multiplying by 100.",

  examples: [
    {
      title: "Sale Discount",
      description: "An item drops from $100 to $80.",
      inputs: { original: 100, newValue: 80 },
      result: "20% decrease.",
    },
  ],

  faqs: [
    {
      question: "How do you calculate percentage decrease?",
      answer:
        "Subtract the new value from the original value, divide by the original value, and multiply by 100.",
    },
  ],

  relatedSlugs: [
    "percentage-increase-calculator",
  ],
};

export default def;