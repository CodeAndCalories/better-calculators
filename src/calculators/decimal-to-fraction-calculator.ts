// filename: decimal-to-fraction-calculator.ts
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
  slug: "decimal-to-fraction-calculator",
  title: "Decimal to Fraction Calculator",
  description: "Convert a decimal number back into a precise or approximated fraction.",
  longDescription: "Sometimes measuring tools or math problems give you a decimal when you really need a fraction. This calculator finds the closest fraction representation of your decimal up to a maximum denominator that you specify.",
  category: "life",
  keywords:["decimal to fraction", "convert decimal", "fraction approximation", "decimal converter"],
  inputs:[
    { type: "number", key: "decimal", label: "Decimal Number", defaultValue: 0.75 },
    { type: "number", key: "maxDenominator", label: "Maximum Denominator", defaultValue: 100, min: 1 }
  ],
  compute(values: InputValues): ComputeResult {
    const decimal = Number(values.decimal);
    const maxDenominator = Number(values.maxDenominator);

    if (isNaN(decimal) || isNaN(maxDenominator)) {
      return { outputs:[], error: "Please enter valid numeric values." };
    }
    if (maxDenominator < 1) {
      return { outputs:[], error: "Maximum denominator must be at least 1." };
    }

    const isNegative = decimal < 0;
    const absDecimal = Math.abs(decimal);

    let bestN = 0;
    let bestD = 1;
    let minErr = Infinity;

    for (let d = 1; d <= maxDenominator; d++) {
      const n = Math.round(absDecimal * d);
      const err = Math.abs(absDecimal - (n / d));
      if (err < minErr) {
        minErr = err;
        bestN = n;
        bestD = d;
      }
    }

    if (isNegative) {
      bestN = -bestN;
    }

    const fractionString = `${bestN}/${bestD}`;
    
    const gcd = getGcd(bestN, bestD);
    const simpN = bestN / gcd;
    const simpD = bestD / gcd;
    
    let simplifiedFraction = `${simpN}/${simpD}`;
    if (simpD === 1) {
      simplifiedFraction = `${simpN}`; 
    } else if (simpD === -1) {
      simplifiedFraction = `${-simpN}`;
    }

    // Approximation error is actual value minus fraction value
    const approxError = decimal - (bestN / bestD);

    return {
      outputs:[
        { key: "fraction", label: "Best Fraction Match", value: fractionString, format: "text", highlight: true },
        { key: "simplifiedFraction", label: "Simplified Form", value: simplifiedFraction, format: "text" },
        { key: "approximationError", label: "Approximation Error", value: Number(approxError.toFixed(8)), format: "number" }
      ]
    };
  },
  howItWorks: "The calculator tests every possible denominator from 1 up to your maximum limit. For each denominator, it finds the closest numerator to match your decimal. It then selects the fraction that has the smallest mathematical error compared to your original input.",
  examples:[
    {
      title: "Clean conversion",
      description: "Converting 0.75 with a max denominator of 100.",
      inputs: { decimal: 0.75, maxDenominator: 100 },
      result: "Perfectly matches 75/100, which simplifies to 3/4 with an error of 0."
    },
    {
      title: "Repeating decimal",
      description: "Approximating 0.3333 with a max denominator of 10.",
      inputs: { decimal: 0.3333, maxDenominator: 10 },
      result: "Matches 3/9 (simplified to 1/3) with an extremely small error margin."
    },
    {
      title: "Tape measure conversion",
      description: "Finding the closest 16th of an inch for the decimal 0.3125.",
      inputs: { decimal: 0.3125, maxDenominator: 16 },
      result: "Perfectly matches 5/16."
    }
  ],
  faqs:[
    { question: "Why do I need to set a maximum denominator?", answer: "Without a limit, any decimal like 0.123 can trivially be written as 123/1000. Capping the denominator gives you more practical, readable fractions like 1/8." },
    { question: "What does the approximation error mean?", answer: "Because we cap the denominator, the fraction might not perfectly equal your decimal. The error shows exactly how far off the fraction is from your true decimal value." },
    { question: "Can it handle whole numbers with decimals?", answer: "Yes! If you enter 1.5, the calculator will return 3/2 (an improper fraction) representing exactly 1 and 1/2." },
    { question: "How does simplification work?", answer: "The calculator divides both the top and bottom of the best match by their Greatest Common Divisor (GCD) to give you the cleanest possible representation." }
  ],
  relatedSlugs:["fraction-to-decimal-calculator", "decimal-to-percent-calculator"]
};

export default def;