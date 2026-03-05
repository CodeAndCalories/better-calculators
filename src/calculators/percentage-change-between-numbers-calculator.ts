// filename: percentage-change-between-numbers-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-change-between-numbers-calculator",
  title: "Percentage Change Calculator",
  description: "Calculate the percentage increase or decrease between an old value and a new value.",
  longDescription: "Tracking growth, losses, or price differences is much clearer when viewed as a percentage. The Percentage Change Calculator compares two numbers to instantly tell you the exact percent increase or decrease, as well as the raw numeric difference.",
  category: "life",
  keywords: ["percentage change", "percent increase", "percent decrease", "number difference calculator"],
  inputs:[
    { type: "number", key: "oldValue", label: "Original / Old Value", defaultValue: 50 },
    { type: "number", key: "newValue", label: "New / Current Value", defaultValue: 75 }
  ],
  compute(values: InputValues): ComputeResult {
    const oldValue = Number(values.oldValue);
    const newValue = Number(values.newValue);

    if (isNaN(oldValue) || isNaN(newValue)) {
      return { outputs:[], error: "Please enter valid numbers." };
    }
    if (oldValue === 0) {
      return { outputs:[], error: "Original value cannot be exactly zero to calculate a meaningful percentage change." };
    }

    const difference = newValue - oldValue;
    const percentChange = (difference / Math.abs(oldValue)) * 100;

    return {
      outputs:[
        { key: "percentChange", label: "Percentage Change", value: Number(percentChange.toFixed(4)), format: "percentage", highlight: true },
        { key: "difference", label: "Raw Difference", value: Number(difference.toFixed(4)), format: "number" }
      ]
    };
  },
  howItWorks: "We subtract the old value from the new value to find the raw difference. Then, we divide that difference by the absolute value of the original number and multiply by 100 to find the percentage change.",
  examples:[
    {
      title: "Price Increase",
      description: "A subscription goes from $10 a month up to $12.",
      inputs: { oldValue: 10, newValue: 12 },
      result: "Shows a 20% increase (a difference of 2)."
    },
    {
      title: "Weight Loss",
      description: "A person's weight drops from 200 lbs to 185 lbs.",
      inputs: { oldValue: 200, newValue: 185 },
      result: "Shows a -7.5% decrease (a difference of -15)."
    },
    {
      title: "Negative numbers",
      description: "A company's profits go from -$50,000 to -$20,000 (an improvement).",
      inputs: { oldValue: -50000, newValue: -20000 },
      result: "Shows a positive 60% change, indicating financial recovery."
    }
  ],
  faqs:[
    { question: "What does a negative percentage change mean?", answer: "A negative percentage indicates a decrease or drop from the original value." },
    { question: "Why can't the original value be zero?", answer: "In mathematics, dividing by zero is undefined. If you start with 0 and gain 10, the percentage growth is theoretically infinite." },
    { question: "Is percentage change the same as percentage difference?", answer: "No. Percentage change specifically measures movement from an 'old' value to a 'new' one over time. Percentage difference simply compares two values without implying one is older." },
    { question: "Can a percentage change be over 100%?", answer: "Yes! If your value doubles, that is a 100% increase. If it triples, it's a 200% increase." }
  ],
  relatedSlugs: ["percentage-of-number-calculator", "average-calculator"]
};

export default def;