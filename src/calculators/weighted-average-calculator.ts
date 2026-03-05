// filename: weighted-average-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "weighted-average-calculator",
  title: "Weighted Average Calculator",
  description: "Calculate the weighted average of two values based on their relative weights.",
  longDescription: "A weighted average takes into account the proportional relevance of each component, rather than treating them equally. This is commonly used in calculating final grades, portfolio returns, or inventory costs. Enter your values and their respective weights to find the true weighted mean.",
  category: "life",
  keywords: ["weighted average", "weighted mean", "grade calculator", "average calculator"],
  inputs:[
    { type: "number", key: "value1", label: "Value 1", defaultValue: 80 },
    { type: "number", key: "weight1", label: "Weight 1", defaultValue: 0.4 },
    { type: "number", key: "value2", label: "Value 2", defaultValue: 90 },
    { type: "number", key: "weight2", label: "Weight 2", defaultValue: 0.6 }
  ],
  compute(values: InputValues): ComputeResult {
    const v1 = Number(values.value1);
    const w1 = Number(values.weight1);
    const v2 = Number(values.value2);
    const w2 = Number(values.weight2);

    if (isNaN(v1) || isNaN(w1) || isNaN(v2) || isNaN(w2)) {
      return { outputs:[], error: "Please enter valid numeric values for all fields." };
    }

    const totalWeight = w1 + w2;

    if (totalWeight <= 0) {
      return { outputs:[], error: "Total weight must be greater than zero." };
    }

    const weightedAverage = (v1 * w1 + v2 * w2) / totalWeight;
    
    let note = "Weights look good.";
    if (Math.abs(totalWeight - 1) > 0.001 && Math.abs(totalWeight - 100) > 0.001) {
      note = "Note: Total weight does not equal 1 (or 100%). The average was calculated proportionally.";
    }

    return {
      outputs:[
        { key: "weightedAverage", label: "Weighted Average", value: Number(weightedAverage.toFixed(4)), format: "number", highlight: true },
        { key: "totalWeight", label: "Total Weight", value: Number(totalWeight.toFixed(4)), format: "number" },
        { key: "note", label: "Calculation Note", value: note, format: "text" }
      ]
    };
  },
  howItWorks: "The calculator multiplies each value by its corresponding weight, adds those results together, and then divides by the sum of all the weights to determine the proportional average.",
  examples:[
    {
      title: "Class Grades",
      description: "A midterm is an 80 (40% weight) and the final is a 90 (60% weight).",
      inputs: { value1: 80, weight1: 0.4, value2: 90, weight2: 0.6 },
      result: "The final weighted average is 86."
    },
    {
      title: "Investment Portfolio",
      description: "A stock returned 10% (invested $5000) and a bond returned 4% (invested $2000). Using the dollar amounts as weights.",
      inputs: { value1: 10, weight1: 5000, value2: 4, weight2: 2000 },
      result: "The weighted average return is 8.2857%."
    },
    {
      title: "Using Percentages as Weights",
      description: "Using whole numbers like 30 and 70 for weights instead of decimals.",
      inputs: { value1: 75, weight1: 30, value2: 85, weight2: 70 },
      result: "The weighted average is 82, and the total weight is 100."
    }
  ],
  faqs:[
    { question: "Do my weights have to add up to 1 or 100?", answer: "No. The calculator automatically divides by the total sum of the weights you provide. However, using decimals that sum to 1 or percentages that sum to 100 is the standard practice." },
    { question: "What is the difference between an average and a weighted average?", answer: "A standard average treats every number equally. A weighted average gives more importance (weight) to certain numbers over others." },
    { question: "Can I use dollar amounts as weights?", answer: "Yes! This is common in finance. You can input the principal amounts as the weights and the interest rates as the values to find the blended interest rate." },
    { question: "What happens if a weight is zero?", answer: "If a weight is exactly zero, its corresponding value is entirely ignored in the final calculation." }
  ],
  relatedSlugs: ["average-calculator", "ratio-calculator"]
};

export default def;