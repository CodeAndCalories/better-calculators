import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-change-calculator",
  title: "Percentage Change Calculator",
  shortTitle: "Percent Change",
  description: "Calculate the percent change between two values and see increase or decrease.",
  longDescription:
    "Use this Percentage Change Calculator to find how much a value changed in percentage terms from an original value to a new value. It shows percent change (positive or negative), the absolute difference, and whether it was an increase or decrease.",
  category: "finance",
  keywords: ["percentage change calculator", "percent change", "percent increase decrease", "percentage difference"],
  inputs: [
    { type: "number", key: "original", label: "Original Value", defaultValue: 100, step: 1, placeholder: "100" },
    { type: "number", key: "newValue", label: "New Value", defaultValue: 120, step: 1, placeholder: "120" },
  ],

  compute(values: InputValues): ComputeResult {
    const original = Number(values.original);
    const newValue = Number(values.newValue);

    if (!Number.isFinite(original) || !Number.isFinite(newValue)) {
      return { outputs: [{ key: "error", label: "Result", value: "Enter valid numbers for both values.", format: "text", highlight: true }] };
    }
    if (original === 0) {
      return { outputs: [{ key: "error", label: "Result", value: "Original value cannot be zero for percent change.", format: "text", highlight: true }] };
    }

    const diff = newValue - original;
    const pct = (diff / original) * 100;

    const direction = diff > 0 ? "Increase" : diff < 0 ? "Decrease" : "No change";

    return {
      outputs: [
        { key: "percentChange", label: "Percent Change", value: Number(pct.toFixed(2)), format: "number", highlight: true },
        { key: "direction", label: "Change Type", value: direction, format: "text" },
        { key: "difference", label: "Difference", value: Number(diff.toFixed(2)), format: "number" },
        { key: "absoluteDifference", label: "Absolute Difference", value: Number(Math.abs(diff).toFixed(2)), format: "number" },
      ],
    };
  },

  howItWorks:
    "Percent change is calculated as (new − original) ÷ original × 100. A positive result means an increase, and a negative result means a decrease.",

  examples: [
    {
      title: "From 100 to 120",
      description: "A value increases from 100 to 120.",
      inputs: { original: 100, newValue: 120 },
      result: "Percent change is +20.00% (increase).",
    },
    {
      title: "From 80 to 60",
      description: "A value decreases from 80 to 60.",
      inputs: { original: 80, newValue: 60 },
      result: "Percent change is −25.00% (decrease).",
    },
  ],

  faqs: [
    { question: "What is percent change?", answer: "Percent change measures how much a value changed relative to the original value, expressed as a percentage." },
    { question: "Can percent change be negative?", answer: "Yes. Negative percent change indicates a decrease." },
    { question: "Why can't the original value be zero?", answer: "Percent change divides by the original value. Dividing by zero is undefined." },
    { question: "Is percent change the same as percent difference?", answer: "Not exactly. Percent difference often uses the average of two numbers in the denominator. Percent change uses the original value." },
  ],

  relatedSlugs: [
    "percentage-increase-calculator",
    "percentage-decrease-calculator",
    "discount",
    "compound-interest-calculator",
  ],
};

export default def;
