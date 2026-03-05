import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-calculator",
  title: "Percentage Calculator",
  shortTitle: "Percentage",
  description: "Calculate percentages, percentage change, and what percentage one number is of another.",
  longDescription: "Our percentage calculator handles the three most common percentage problems: finding X% of a number, finding what percentage one number is of another, and calculating percentage increase or decrease.",
  category: "life",
  keywords: ["percentage calculator", "percent calculator", "percentage change calculator", "what percent of"],
  inputs: [
    { type: "select", key: "mode", label: "What do you want to calculate?", defaultValue: "of", options: [
      { label: "What is X% of Y?", value: "of" },
      { label: "X is what % of Y?", value: "what" },
      { label: "Percentage change from X to Y", value: "change" },
    ]},
    { type: "number", key: "valueA", label: "First Number (X)", defaultValue: 15, step: 0.01, placeholder: "15" },
    { type: "number", key: "valueB", label: "Second Number (Y)", defaultValue: 200, step: 0.01, placeholder: "200" },
  ],
  compute(values: InputValues): ComputeResult {
    const mode = values.mode as string;
    const a = Number(values.valueA);
    const b = Number(values.valueB);

    if (b === 0 && mode !== "of") {
      return { outputs: [], error: "The second number cannot be zero." };
    }

    if (mode === "of") {
      const result = (a / 100) * b;
      return {
        outputs: [
          { key: "result", label: `${a}% of ${b} is`, value: result, format: "number", highlight: true },
        ],
      };
    } else if (mode === "what") {
      const result = (a / b) * 100;
      return {
        outputs: [
          { key: "result", label: `${a} is what % of ${b}`, value: result, format: "percentage", highlight: true },
        ],
      };
    } else {
      if (a === 0) return { outputs: [], error: "Starting value (X) cannot be zero for percentage change." };
      const result = ((b - a) / Math.abs(a)) * 100;
      const direction = result >= 0 ? "increase" : "decrease";
      return {
        outputs: [
          { key: "result", label: `Percentage ${direction}`, value: Math.abs(result), format: "percentage", highlight: true },
          { key: "diff", label: "Absolute Difference", value: Math.abs(b - a), format: "number" },
        ],
      };
    }
  },
  howItWorks: `Three formulas: (1) X% of Y = (X/100) × Y. (2) X is what % of Y = (X/Y) × 100. (3) Percentage change from X to Y = ((Y - X) / |X|) × 100. A positive result is an increase; negative is a decrease.`,
  examples: [
    {
      title: "What is 15% of 200?",
      description: "Finding a percentage of a number — useful for tips, discounts, and taxes.",
      inputs: { mode: "of", valueA: 15, valueB: 200 },
      result: "15% of 200 = 30.",
    },
    {
      title: "45 is what percent of 180?",
      description: "Expressing one number as a percentage of another.",
      inputs: { mode: "what", valueA: 45, valueB: 180 },
      result: "45 is 25% of 180.",
    },
  ],
  faqs: [
    { question: "How do I calculate a percentage increase?", answer: "Subtract the old value from the new value, divide by the old value, then multiply by 100. Example: from 80 to 100 is (100-80)/80 × 100 = 25% increase." },
    { question: "What does per cent mean?", answer: "Per cent comes from the Latin 'per centum', meaning 'by the hundred'. A percentage is simply a ratio expressed as a fraction of 100." },
  ],
  relatedSlugs: ["discount-calculator", "tip-calculator", "simple-interest-calculator"],
};

export default def;
