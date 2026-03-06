import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "percent-error",
  title: "Percent Error Calculator",
  shortTitle: "Percent Error",
  description: "Calculate the percent error between an actual and expected value.",
  longDescription:
    "Percent error measures how far an experimental or observed value deviates from the true or expected value, expressed as a percentage. It's commonly used in science, engineering, and quality control to evaluate the accuracy of a measurement or estimate.",
  category: "finance",
  keywords: ["percent error", "percentage error", "error calculator", "accuracy calculator", "experimental error"],
  inputs: [
    {
      type: "number",
      key: "actual",
      label: "Actual Value",
      defaultValue: 95,
      step: 0.01,
      placeholder: "95",
    },
    {
      type: "number",
      key: "expected",
      label: "Expected Value",
      defaultValue: 100,
      step: 0.01,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const actual = Number(values.actual);
    const expected = Number(values.expected);

    if (isNaN(actual) || isNaN(expected)) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    if (expected === 0) {
      return { outputs: [], error: "Expected value cannot be zero." };
    }

    const percentError = (Math.abs(actual - expected) / Math.abs(expected)) * 100;

    return {
      outputs: [
        {
          key: "percentError",
          label: "Percent Error",
          value: Number(percentError.toFixed(4)),
          format: "percentage",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator takes the absolute difference between the actual and expected values, divides by the absolute expected value, and multiplies by 100. The absolute value ensures the result is always positive regardless of direction.",
  examples: [
    {
      title: "Lab Measurement",
      description: "An experiment yields 95 when the expected result was 100.",
      inputs: { actual: 95, expected: 100 },
      result: "The percent error is 5%.",
    },
    {
      title: "Overestimate",
      description: "A forecast of 110 against an actual outcome of 100.",
      inputs: { actual: 110, expected: 100 },
      result: "The percent error is 10%.",
    },
    {
      title: "Close Measurement",
      description: "A measured value of 9.98 against an expected 10.",
      inputs: { actual: 9.98, expected: 10 },
      result: "The percent error is 0.2%.",
    },
  ],
  faqs: [
    {
      question: "What is a good percent error?",
      answer: "It depends on the field. In many scientific experiments, a percent error under 5% is considered acceptable. In precision engineering, the threshold is much tighter.",
    },
    {
      question: "Why use absolute value in the formula?",
      answer: "The absolute value ensures that over- and under-estimates produce the same positive percentage, making it easier to compare magnitudes of error.",
    },
    {
      question: "What is the difference between percent error and percent difference?",
      answer: "Percent error compares a measurement to a known true value. Percent difference compares two measured values with no assumed 'correct' one.",
    },
  ],
  relatedSlugs: ["percent-growth", "roi-calculator", "profit-margin-calculator"],
};

export default def;
