// filename: average-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "average-calculator",
  title: "Average Calculator",
  description: "Calculate the average (mean), sum, and count of two or three numbers.",
  longDescription: "The average is calculated by adding a group of numbers together and dividing by the count of those numbers. This simple calculator lets you easily find the mean of two or three values.",
  category: "life",
  keywords: ["average calculator", "mean calculator", "calculate average"],
  inputs:[
    { type: "number", key: "value1", label: "Value 1", defaultValue: 10, min: 0 },
    { type: "number", key: "value2", label: "Value 2", defaultValue: 20, min: 0 },
    { type: "number", key: "value3", label: "Value 3", defaultValue: 0, min: 0 },
    { type: "toggle", key: "includeValue3", label: "Include Value 3 in calculation?", defaultValue: false }
  ],
  compute(values: InputValues): ComputeResult {
    const val1 = Number(values.value1);
    const val2 = Number(values.value2);
    const val3 = Number(values.value3);
    const includeVal3 = Boolean(values.includeValue3);

    if (isNaN(val1) || isNaN(val2) || (includeVal3 && isNaN(val3))) {
      return { outputs:[], error: "Please enter valid numbers for all active inputs." };
    }

    let sum = val1 + val2;
    let count = 2;

    if (includeVal3) {
      sum += val3;
      count = 3;
    }

    const average = sum / count;

    return {
      outputs:[
        { key: "average", label: "Average (Mean)", value: Number(average.toFixed(4)), format: "number", highlight: true },
        { key: "sum", label: "Sum of Values", value: Number(sum.toFixed(4)), format: "number" },
        { key: "count", label: "Count of Values", value: count, format: "number" }
      ]
    };
  },
  howItWorks: "The calculator adds your provided numbers together to get the sum, and then divides that sum by the number of values (either 2 or 3) to determine the mean average.",
  examples:[
    {
      title: "Average of two test scores",
      description: "Calculating the average of an 85 and a 95.",
      inputs: { value1: 85, value2: 95, includeValue3: false },
      result: "The average is 90, the sum is 180, and the count is 2."
    },
    {
      title: "Average of three expenses",
      description: "Finding the mean of $120, $80, and $100.",
      inputs: { value1: 120, value2: 80, value3: 100, includeValue3: true },
      result: "The average is 100, the sum is 300, and the count is 3."
    },
    {
      title: "Including a zero value",
      description: "Averaging 50, 50, and 0.",
      inputs: { value1: 50, value2: 50, value3: 0, includeValue3: true },
      result: "The average is 33.3333, the sum is 100, and the count is 3."
    }
  ],
  faqs:[
    { question: "What is the difference between mean and average?", answer: "In everyday language, 'average' usually refers to the mathematical mean, which is the sum of a list of numbers divided by the number of items in the list." },
    { question: "Does a zero affect the average?", answer: "Yes, if you include a zero as one of your values, it adds 0 to the sum but increases the count by 1, which lowers the overall average." },
    { question: "Can the average be a negative number?", answer: "Yes, if the sum of the numbers is negative, the average will also be negative." },
    { question: "Why is my third value not changing the result?", answer: "Ensure the 'Include Value 3' toggle is switched on. Otherwise, the calculator will only average the first two values." }
  ],
  relatedSlugs: ["ratio-calculator", "percentage-of-number-calculator"]
};

export default def;