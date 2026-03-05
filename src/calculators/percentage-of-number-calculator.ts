// filename: percentage-of-number-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percentage-of-number-calculator",
  title: "Percentage of a Number Calculator",
  description: "Easily find out what a specific percentage of a number is.",
  longDescription: "Need to know what 15% of 250 is? This percentage calculator quickly determines a percentage part of a whole number. This is incredibly useful for calculating tips, taxes, or analyzing statistics.",
  category: "life",
  keywords:["percentage of number calculator", "find percentage", "percent calculator", "calculate percent"],
  inputs:[
    { type: "number", key: "percent", label: "Percentage (%)", defaultValue: 20, min: 0 },
    { type: "number", key: "number", label: "Number (The Whole)", defaultValue: 150, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const percent = Number(values.percent);
    const number = Number(values.number);

    if (isNaN(percent) || isNaN(number)) {
      return { outputs:[], error: "Please enter valid numeric values." };
    }

    const result = (percent / 100) * number;
    const formulaText = `${percent}% of ${number} is ${Number(result.toFixed(4))}`;

    return {
      outputs:[
        { key: "result", label: "Result", value: Number(result.toFixed(4)), format: "number", highlight: true },
        { key: "formula", label: "Formula Explanation", value: formulaText, format: "text" }
      ]
    };
  },
  howItWorks: "To find the percentage of a number, the calculator converts the percentage into a decimal by dividing it by 100, and then multiplies that decimal by the whole number.",
  examples:[
    {
      title: "Calculating a 20% tip",
      description: "Finding 20% of a $75 restaurant bill.",
      inputs: { percent: 20, number: 75 },
      result: "The result is 15."
    },
    {
      title: "Finding 50%",
      description: "Calculating 50% of 450.",
      inputs: { percent: 50, number: 450 },
      result: "The result is 225."
    },
    {
      title: "Small percentage",
      description: "Finding 1.5% of 2000.",
      inputs: { percent: 1.5, number: 2000 },
      result: "The result is 30."
    }
  ],
  faqs:[
    { question: "How do I calculate the percentage of a number manually?", answer: "Divide the percentage by 100 to get a decimal, then multiply that decimal by the number you are evaluating." },
    { question: "Can a percentage be greater than 100?", answer: "Yes! 150% of 100 is 150. Percentages over 100 simply mean the result will be larger than the original number." },
    { question: "Is 20% of 50 the same as 50% of 20?", answer: "Yes! A mathematical trick with percentages is that they are reversible. X% of Y is always equal to Y% of X." },
    { question: "Does this work with negative numbers?", answer: "Yes, you can input a negative whole number. For instance, 50% of -100 is -50." }
  ],
  relatedSlugs:["decimal-to-percent-calculator", "percent-to-decimal-calculator", "ratio-calculator"]
};

export default def;