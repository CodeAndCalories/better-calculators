import { CalculatorDef } from "@/lib/types";

const calculator: CalculatorDef = {
  slug: "percent-difference-calculator",
  title: "Percent Difference Calculator",
  description: "Find the percentage difference between two distinct values.",
  longDescription:
    "The Percent Difference Calculator compares two numbers to determine how far apart they are relative to their average. This is commonly used in statistics, science experiments, and data comparison when there is no clear 'starting' value.",

  category: "life",

  keywords: [
    "percent difference",
    "percentage difference",
    "compare numbers",
    "difference percentage"
  ],

  inputs: [
    {
      type: "number",
      key: "a",
      label: "First Value (A)",
      defaultValue: 150
    },
    {
      type: "number",
      key: "b",
      label: "Second Value (B)",
      defaultValue: 200
    }
  ],

  compute: (values) => {
    const a = Number(values.a);
    const b = Number(values.b);

    if (isNaN(a) || isNaN(b)) {
      return {
        outputs: [
          {
            key: "result",
            label: "Result",
            value: "Invalid input",
            format: "text"
          }
        ]
      };
    }

    const difference = Math.abs(a - b);
    const average = (Math.abs(a) + Math.abs(b)) / 2;

    if (average === 0) {
      return {
        outputs: [
          {
            key: "result",
            label: "Result",
            value: "Cannot divide by zero",
            format: "text"
          }
        ]
      };
    }

    const percentDifference = (difference / average) * 100;

    return {
      outputs: [
        {
          key: "percentDifference",
          label: "Percent Difference",
          value: Number(percentDifference.toFixed(2)),
          format: "percentage",
          highlight: true
        }
      ]
    };
  },

  howItWorks:
    "The calculator subtracts the two values to find the absolute difference. It then finds the average of the two numbers and divides the difference by that average. Multiplying by 100 converts the result into a percentage.",

  examples: [
    {
      title: "Comparing Lab Results",
      description: "Comparing experimental values of 45 and 55.",
      inputs: { a: 45, b: 55 },
      result: "20% percent difference"
    },
    {
      title: "Revenue Comparison",
      description: "Comparing $120,000 revenue vs $90,000.",
      inputs: { a: 120000, b: 90000 },
      result: "28.57% percent difference"
    },
    {
      title: "Distance Estimates",
      description: "Comparing 300 miles vs 315 miles estimates.",
      inputs: { a: 300, b: 315 },
      result: "4.88% percent difference"
    }
  ],

  faqs: [
    {
      question: "Is percent difference the same as percent change?",
      answer:
        "No. Percent change compares an old value to a new value. Percent difference compares two values equally using their average."
    },
    {
      question: "Can percent difference be negative?",
      answer:
        "No. Percent difference is always expressed as a positive value because it measures distance between numbers."
    },
    {
      question: "Why divide by the average?",
      answer:
        "Using the average prevents bias toward either number and treats both values equally."
    },
    {
      question: "What if one value is zero?",
      answer:
        "The formula still works. The average becomes half of the non-zero number."
    }
  ],

  relatedSlugs: ["percentage-change-calculator"]
};

export default calculator;