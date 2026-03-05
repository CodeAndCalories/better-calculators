// filename: decimal-to-percent-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "decimal-to-percent-calculator",
  title: "Decimal to Percent Calculator",
  description: "Convert any decimal number into a percentage instantly.",
  longDescription: "Converting decimals to percentages is a foundational math skill. This tool quickly takes any decimal value and translates it into its percentage equivalent, saving you time on manual calculations.",
  category: "life",
  keywords:["decimal to percent", "convert decimal", "percentage calculator", "decimal converter"],
  inputs:[
    { type: "number", key: "decimal", label: "Decimal Number", defaultValue: 0.85, step: 0.01 }
  ],
  compute(values: InputValues): ComputeResult {
    const decimal = Number(values.decimal);

    if (isNaN(decimal)) {
      return { outputs:[], error: "Please enter a valid decimal number." };
    }

    const percent = decimal * 100;
    const explanationText = `${decimal} multiplied by 100 equals ${Number(percent.toFixed(4))}%.`;

    return {
      outputs:[
        { key: "percent", label: "Percentage", value: Number(percent.toFixed(4)), format: "percentage", highlight: true },
        { key: "explanation", label: "Explanation", value: explanationText, format: "text" }
      ]
    };
  },
  howItWorks: "The calculator takes your decimal number and multiplies it by 100 (which is the equivalent of moving the decimal point two places to the right) to give you the percentage.",
  examples:[
    {
      title: "Standard decimal",
      description: "Converting 0.75 to a percentage.",
      inputs: { decimal: 0.75 },
      result: "The percentage is 75%."
    },
    {
      title: "Decimal larger than 1",
      description: "Converting 1.25 to a percentage.",
      inputs: { decimal: 1.25 },
      result: "The percentage is 125%."
    },
    {
      title: "Small decimal",
      description: "Converting 0.005 to a percentage.",
      inputs: { decimal: 0.005 },
      result: "The percentage is 0.5%."
    }
  ],
  faqs:[
    { question: "How do you convert a decimal to a percent manually?", answer: "Simply multiply the decimal by 100, or visually move the decimal point two places to the right and add a % sign." },
    { question: "What is 1.0 as a percent?", answer: "1.0 as a percent is 100%. It represents a whole." },
    { question: "Can a decimal be converted to a percent over 100%?", answer: "Yes, any decimal greater than 1 (like 1.5) will result in a percentage greater than 100% (150%)." },
    { question: "Is 0.5 equal to 5% or 50%?", answer: "0.5 is equal to 50%. 0.05 would be equal to 5%." }
  ],
  relatedSlugs:["percent-to-decimal-calculator", "percentage-of-number-calculator"]
};

export default def;