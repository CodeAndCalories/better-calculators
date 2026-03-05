// filename: fraction-to-decimal-calculator.ts
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
  slug: "fraction-to-decimal-calculator",
  title: "Fraction to Decimal Calculator",
  description: "Quickly convert any fraction into a decimal number and percentage.",
  longDescription: "Fractions represent parts of a whole, but they can be difficult to use in standard calculations. This tool divides the numerator by the denominator to give you the exact decimal equivalent, the corresponding percentage, and the fully simplified fraction.",
  category: "life",
  keywords: ["fraction to decimal", "convert fraction", "simplify fraction", "fraction calculator"],
  inputs:[
    { type: "number", key: "numerator", label: "Numerator (Top Number)", defaultValue: 1 },
    { type: "number", key: "denominator", label: "Denominator (Bottom Number)", defaultValue: 4 }
  ],
  compute(values: InputValues): ComputeResult {
    const numerator = Number(values.numerator);
    const denominator = Number(values.denominator);

    if (isNaN(numerator) || isNaN(denominator)) {
      return { outputs:[], error: "Please enter valid numeric values for the fraction." };
    }
    if (denominator === 0) {
      return { outputs:[], error: "Denominator cannot be zero. Division by zero is undefined." };
    }

    const decimal = numerator / denominator;
    const percent = decimal * 100;
    
    const gcd = getGcd(numerator, denominator);
    const simpNum = numerator / gcd;
    const simpDen = denominator / gcd;
    
    let simplifiedFraction = `${simpNum}/${simpDen}`;
    if (simpDen === 1) {
      simplifiedFraction = `${simpNum}`; // Whole number
    } else if (simpDen === -1) {
      simplifiedFraction = `${-simpNum}`;
    }

    return {
      outputs:[
        { key: "decimal", label: "Decimal Equivalent", value: Number(decimal.toFixed(6)), format: "number", highlight: true },
        { key: "percent", label: "Percentage Equivalent", value: Number(percent.toFixed(4)), format: "percentage" },
        { key: "simplifiedFraction", label: "Simplified Fraction", value: simplifiedFraction, format: "text" }
      ]
    };
  },
  howItWorks: "The calculator divides the top number (numerator) by the bottom number (denominator) to generate the decimal. It then multiplies that decimal by 100 to find the percentage, and calculates the Greatest Common Divisor (GCD) to simplify the original fraction.",
  examples:[
    {
      title: "Standard quarter",
      description: "Converting the fraction 1/4.",
      inputs: { numerator: 1, denominator: 4 },
      result: "The decimal is 0.25, which is equal to 25%."
    },
    {
      title: "Improper fraction",
      description: "Converting a top-heavy fraction like 5/2.",
      inputs: { numerator: 5, denominator: 2 },
      result: "The decimal is 2.5, which is equal to 250%."
    },
    {
      title: "Unsimplified fraction",
      description: "Converting 8/32 to its lowest terms and decimal form.",
      inputs: { numerator: 8, denominator: 32 },
      result: "The fraction simplifies to 1/4, with a decimal value of 0.25."
    }
  ],
  faqs:[
    { question: "How do I convert a fraction to a decimal manually?", answer: "Treat the fraction line as a division symbol. Divide the top number by the bottom number using long division or a calculator." },
    { question: "Why is the denominator not allowed to be zero?", answer: "In mathematics, you cannot divide a number into zero parts. It is an undefined operation that will result in an error." },
    { question: "What is an improper fraction?", answer: "An improper fraction is a fraction where the numerator is greater than or equal to the denominator, meaning the overall value is 1 or greater." },
    { question: "Does the calculator handle negative fractions?", answer: "Yes, you can make either the numerator or the denominator negative to find the negative decimal equivalent." }
  ],
  relatedSlugs:["decimal-to-fraction-calculator", "ratio-calculator"]
};

export default def;