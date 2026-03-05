// filename: ratio-to-percentage-calculator.ts
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
  slug: "ratio-to-percentage-calculator",
  title: "Ratio to Percentage Calculator",
  description: "Convert any mathematical ratio into a clean percentage.",
  longDescription: "Understanding ratios is easier when they are converted into familiar percentages. This calculator takes a standard A:B ratio, simplifies it, calculates the exact decimal format, and outputs the equivalent percentage.",
  category: "life",
  keywords:["ratio to percentage", "ratio converter", "convert ratio", "percentage calculator"],
  inputs:[
    { type: "number", key: "a", label: "Value A (Numerator)", defaultValue: 3, min: 0 },
    { type: "number", key: "b", label: "Value B (Denominator)", defaultValue: 4, min: 1 }
  ],
  compute(values: InputValues): ComputeResult {
    const a = Number(values.a);
    const b = Number(values.b);

    if (isNaN(a) || isNaN(b)) {
      return { outputs:[], error: "Please enter valid numbers for the ratio." };
    }
    if (b === 0) {
      return { outputs:[], error: "Value B (Denominator) cannot be zero." };
    }

    const decimal = a / b;
    const percentage = decimal * 100;

    const gcd = getGcd(a, b);
    const ratio = `${a / gcd}:${b / gcd}`;

    return {
      outputs:[
        { key: "percentage", label: "Percentage", value: Number(percentage.toFixed(4)), format: "percentage", highlight: true },
        { key: "decimal", label: "Decimal Form", value: Number(decimal.toFixed(6)), format: "number" },
        { key: "ratio", label: "Simplified Ratio", value: ratio, format: "text" }
      ]
    };
  },
  howItWorks: "The calculator treats your ratio as a fraction (A divided by B). It divides the first number by the second number to get the decimal representation, then multiplies by 100 to get the percentage.",
  examples:[
    {
      title: "Standard 3 to 4 ratio",
      description: "Converting a 3:4 ratio to a percentage.",
      inputs: { a: 3, b: 4 },
      result: "The percentage is 75%, and the decimal is 0.75."
    },
    {
      title: "1 to 1 ratio",
      description: "Converting a ratio where both sides are equal.",
      inputs: { a: 50, b: 50 },
      result: "The percentage is exactly 100%."
    },
    {
      title: "Larger A value",
      description: "Converting a 5:2 ratio.",
      inputs: { a: 5, b: 2 },
      result: "The percentage is 250%."
    }
  ],
  faqs:[
    { question: "What does a 1:2 ratio mean as a percentage?", answer: "A 1:2 ratio treats the first number as the part and the second as the whole, making it 1/2 or 50%." },
    { question: "Can a ratio percentage be higher than 100%?", answer: "Yes! If the first number (A) is larger than the second number (B), the resulting percentage will be greater than 100%." },
    { question: "Why does the calculator simplify the ratio?", answer: "Simplifying a ratio (like turning 10:20 into 1:2) makes it easier to read and understand the core relationship between the two numbers, even though the percentage stays exactly the same." },
    { question: "What if my ratio is A:B:C?", answer: "This calculator only handles two-part ratios. For multi-part ratios, you would need to calculate each part against the total sum of the parts to find their individual percentages." }
  ],
  relatedSlugs: ["ratio-calculator", "percent-to-decimal-calculator"]
};

export default def;