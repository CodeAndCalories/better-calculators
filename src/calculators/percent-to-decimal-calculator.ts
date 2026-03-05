// filename: percent-to-decimal-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percent-to-decimal-calculator",
  title: "Percent to Decimal Calculator",
  description: "Convert a percentage into a decimal number instantly.",
  longDescription: "When doing math with percentages, you almost always need to convert them into decimals first. This tool quickly takes any percentage and translates it into its decimal equivalent.",
  category: "life",
  keywords:["percent to decimal", "percentage converter", "convert percent to decimal", "decimal calculator"],
  inputs:[
    { type: "number", key: "percent", label: "Percentage (%)", defaultValue: 45, step: 0.1 }
  ],
  compute(values: InputValues): ComputeResult {
    const percent = Number(values.percent);

    if (isNaN(percent)) {
      return { outputs:[], error: "Please enter a valid percentage number." };
    }

    const decimal = percent / 100;
    const explanationText = `${percent}% divided by 100 equals ${Number(decimal.toFixed(6))}.`;

    return {
      outputs:[
        { key: "decimal", label: "Decimal Equivalent", value: Number(decimal.toFixed(6)), format: "number", highlight: true },
        { key: "explanation", label: "Explanation", value: explanationText, format: "text" }
      ]
    };
  },
  howItWorks: "The calculator takes your percentage and divides it by 100 (which is the equivalent of moving the decimal point two places to the left) to give you the decimal format.",
  examples:[
    {
      title: "Standard percentage",
      description: "Converting 65% to a decimal.",
      inputs: { percent: 65 },
      result: "The decimal is 0.65."
    },
    {
      title: "Single digit percentage",
      description: "Converting 8% to a decimal.",
      inputs: { percent: 8 },
      result: "The decimal is 0.08."
    },
    {
      title: "Over 100 percent",
      description: "Converting 150% to a decimal.",
      inputs: { percent: 150 },
      result: "The decimal is 1.5."
    }
  ],
  faqs:[
    { question: "How do you convert a percent to a decimal manually?", answer: "Divide the percentage by 100. Visually, you can just move the decimal point two places to the left." },
    { question: "Why do I need to convert percentages to decimals?", answer: "Most mathematical formulas and financial equations require decimals to multiply or divide properly. You cannot multiply directly by a raw percentage." },
    { question: "What is 100% as a decimal?", answer: "100% as a decimal is 1.0." },
    { question: "What is 0.5% as a decimal?", answer: "0.5% as a decimal is 0.005. You still move the decimal point two places to the left." }
  ],
  relatedSlugs:["decimal-to-percent-calculator", "percentage-of-number-calculator"]
};

export default def;