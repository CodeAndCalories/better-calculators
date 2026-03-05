// filename: fraction-calculator.ts
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
  slug: "fraction-calculator",
  title: "Fraction Calculator",
  description: "Simplify any fraction and calculate its decimal and percentage equivalents.",
  longDescription: "Working with large or unsimplified fractions can be tricky. This calculator quickly reduces any fraction to its simplest form. It also provides the exact decimal format and the percentage value, making it easier to compare or use the fraction in other mathematical equations.",
  category: "life",
  keywords: ["fraction calculator", "simplify fraction", "fraction to decimal", "reduce fraction"],
  inputs:[
    { type: "number", key: "numerator", label: "Numerator (Top Number)", defaultValue: 8, min: 0 },
    { type: "number", key: "denominator", label: "Denominator (Bottom Number)", defaultValue: 24, min: 1 }
  ],
  compute(values: InputValues): ComputeResult {
    const numerator = Number(values.numerator);
    const denominator = Number(values.denominator);

    if (isNaN(numerator) || isNaN(denominator)) {
      return { outputs:[], error: "Please enter valid numbers for the numerator and denominator." };
    }
    if (denominator === 0) {
      return { outputs:[], error: "Denominator cannot be zero." };
    }

    const decimal = numerator / denominator;
    const percent = decimal * 100;
    
    const gcd = getGcd(numerator, denominator);
    const simpNum = numerator / gcd;
    const simpDen = denominator / gcd;
    
    let simplifiedFraction = `${simpNum}/${simpDen}`;
    if (simpDen === 1) {
      simplifiedFraction = `${simpNum}`;
    } else if (simpDen === -1) {
      simplifiedFraction = `${-simpNum}`;
    }

    return {
      outputs:[
        { key: "simplifiedFraction", label: "Simplified Fraction", value: simplifiedFraction, format: "text", highlight: true },
        { key: "decimal", label: "Decimal Value", value: Number(decimal.toFixed(6)), format: "number" },
        { key: "percent", label: "Percentage", value: Number(percent.toFixed(4)), format: "percentage" }
      ]
    };
  },
  howItWorks: "The tool finds the Greatest Common Divisor (GCD) of both the top and bottom numbers, dividing them to find the simplest form. It then divides the numerator by the denominator to get the decimal, and multiplies by 100 to find the percentage.",
  examples:[
    {
      title: "Common reduction",
      description: "Simplifying 8 over 24.",
      inputs: { numerator: 8, denominator: 24 },
      result: "The fraction simplifies to 1/3, which is 0.333333 or 33.3333%."
    },
    {
      title: "Improper fraction",
      description: "A top-heavy fraction like 50/20.",
      inputs: { numerator: 50, denominator: 20 },
      result: "Simplifies to 5/2, a decimal of 2.5, and 250%."
    },
    {
      title: "Already simplified",
      description: "Entering a fraction like 3/7.",
      inputs: { numerator: 3, denominator: 7 },
      result: "Remains 3/7, converts to 0.428571 or 42.8571%."
    }
  ],
  faqs:[
    { question: "What is a numerator and denominator?", answer: "The numerator is the top number of a fraction representing the parts you have. The denominator is the bottom number representing the total parts in a whole." },
    { question: "Why does the calculator return a whole number sometimes?", answer: "If the numerator is perfectly divisible by the denominator (like 10/2), the simplified fraction is just the whole number (5)." },
    { question: "Can a fraction be negative?", answer: "Yes. If either the numerator or denominator is negative, the entire fraction's value is negative." },
    { question: "What is the Greatest Common Divisor (GCD)?", answer: "The GCD is the largest positive integer that divides both the numerator and the denominator without leaving a remainder. It is the key to simplifying fractions." }
  ],
  relatedSlugs:["ratio-calculator", "decimal-to-percent-calculator"]
};

export default def;