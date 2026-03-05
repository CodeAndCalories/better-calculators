// filename: ratio-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function getGcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

const def: CalculatorDef = {
  slug: "ratio-calculator",
  title: "Ratio Calculator",
  description: "Simplify ratios and convert them into decimals and percentages.",
  longDescription: "A ratio indicates how many times one number contains another. This calculator takes two numbers (A and B), simplifies them to their lowest terms, and converts the relationship into a decimal and a percentage.",
  category: "life",
  keywords:["ratio calculator", "simplify ratio", "ratio to percentage", "ratio to decimal"],
  inputs:[
    { type: "number", key: "a", label: "Value A", defaultValue: 10, min: 0 },
    { type: "number", key: "b", label: "Value B", defaultValue: 25, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const a = Number(values.a);
    const b = Number(values.b);

    if (isNaN(a) || isNaN(b)) {
      return { outputs:[], error: "Please enter valid numeric values for A and B." };
    }
    if (b === 0) {
      return { outputs:[], error: "Value B cannot be zero (division by zero)." };
    }

    const gcd = getGcd(a, b);
    const simplifiedA = a / gcd;
    const simplifiedB = b / gcd;
    const simplifiedRatio = `${simplifiedA}:${simplifiedB}`;
    
    const decimal = a / b;
    const percentage = decimal * 100;

    return {
      outputs:[
        { key: "simplifiedRatio", label: "Simplified Ratio", value: simplifiedRatio, format: "text", highlight: true },
        { key: "asDecimal", label: "As Decimal (A / B)", value: Number(decimal.toFixed(4)), format: "number" },
        { key: "asPercentage", label: "As Percentage (A / B)", value: Number(percentage.toFixed(2)), format: "percentage" }
      ]
    };
  },
  howItWorks: "The calculator finds the Greatest Common Divisor (GCD) of the two numbers and divides both by it to get the simplified ratio. It also divides A by B to find the decimal representation, and multiplies that by 100 to find the percentage.",
  examples:[
    {
      title: "Simplifying a common ratio",
      description: "Simplifying the ratio of 10 to 25.",
      inputs: { a: 10, b: 25 },
      result: "The simplified ratio is 2:5, the decimal is 0.4, and it equals 40%."
    },
    {
      title: "Equal values",
      description: "Comparing 50 to 50.",
      inputs: { a: 50, b: 50 },
      result: "The simplified ratio is 1:1, the decimal is 1, and it equals 100%."
    },
    {
      title: "A larger than B",
      description: "Using a larger numerator, like 150 to 50.",
      inputs: { a: 150, b: 50 },
      result: "The simplified ratio is 3:1, the decimal is 3, and it equals 300%."
    }
  ],
  faqs:[
    { question: "What does a ratio represent?", answer: "A ratio shows the relative sizes of two or more values, indicating how many times the first number contains the second." },
    { question: "Why can't Value B be zero?", answer: "A ratio of A to B involves dividing A by B. Mathematically, division by zero is undefined." },
    { question: "What is a simplified ratio?", answer: "A ratio is in its simplest form when the two numbers have no common factors other than 1. For example, 4:8 simplifies to 1:2." },
    { question: "How does the percentage relate to the ratio?", answer: "The percentage represents Value A as a fraction of Value B. If the ratio is 1:2, A is half of B, which is 50%." }
  ],
  relatedSlugs:["average-calculator", "percentage-of-number-calculator"]
};

export default def;