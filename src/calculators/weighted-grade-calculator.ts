// filename: weighted-grade-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "weighted-grade-calculator",
  title: "Weighted Grade Calculator",
  description: "Calculate your final class grade based on assignments and exam weights.",
  longDescription: "Many classes don't treat all points equally. A final exam might be worth half your grade, while homework is only worth a fraction. This calculator lets you input your scores and their respective syllabus weights to find your true overall class grade.",
  category: "life",
  keywords:["weighted grade", "grade calculator", "final grade calculator", "class grade"],
  inputs:[
    { type: "number", key: "assignmentScore", label: "Assignments Average Score", defaultValue: 85, min: 0 },
    { type: "number", key: "assignmentWeight", label: "Assignments Weight (%)", defaultValue: 60, min: 0 },
    { type: "number", key: "examScore", label: "Exam Score", defaultValue: 92, min: 0 },
    { type: "number", key: "examWeight", label: "Exam Weight (%)", defaultValue: 40, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const assignmentScore = Number(values.assignmentScore);
    const assignmentWeight = Number(values.assignmentWeight);
    const examScore = Number(values.examScore);
    const examWeight = Number(values.examWeight);

    if (isNaN(assignmentScore) || isNaN(assignmentWeight) || isNaN(examScore) || isNaN(examWeight)) {
      return { outputs:[], error: "Please enter valid numbers for all fields." };
    }

    const totalWeight = assignmentWeight + examWeight;

    if (totalWeight <= 0) {
      return { outputs:[], error: "Total weight must be greater than zero." };
    }

    const finalGrade = ((assignmentScore * assignmentWeight) + (examScore * examWeight)) / totalWeight;

    return {
      outputs:[
        { key: "finalGrade", label: "Final Weighted Score", value: Number(finalGrade.toFixed(2)), format: "number", highlight: true },
        { key: "gradePercent", label: "Final Grade Percentage", value: Number(finalGrade.toFixed(2)), format: "percentage" }
      ]
    };
  },
  howItWorks: "The calculator multiplies your assignment score by its weight, and your exam score by its weight. It adds these together and divides by the total weight to find your exact proportional grade.",
  examples:[
    {
      title: "Standard syllabus",
      description: "Homework is 85% (weight 60), Exam is 92% (weight 40).",
      inputs: { assignmentScore: 85, assignmentWeight: 60, examScore: 92, examWeight: 40 },
      result: "Your final grade is an 87.80%."
    },
    {
      title: "Heavy final exam",
      description: "Entering a 90% average for coursework (weight 30) and an 80% on the final exam (weight 70).",
      inputs: { assignmentScore: 90, assignmentWeight: 30, examScore: 80, examWeight: 70 },
      result: "The final grade pulls heavily toward the exam, landing at 83.00%."
    },
    {
      title: "Incomplete weighting",
      description: "Weights don't equal 100 (e.g., Assignment weight 50, Exam weight 25).",
      inputs: { assignmentScore: 100, assignmentWeight: 50, examScore: 80, examWeight: 25 },
      result: "Calculates the proportional grade of 93.33% based only on the completed 75% of the class."
    }
  ],
  faqs:[
    { question: "Do my weights need to add up to 100%?", answer: "No. If you only input the assignments you have finished so far, the calculator will properly average your current standing based on the sum of the weights provided." },
    { question: "What if I have more than two categories?", answer: "This basic calculator handles two major categories. You can average all your minor categories into one 'Assignment' score, or use a more advanced multi-category calculator." },
    { question: "How do I know the weight of my assignments?", answer: "Check your class syllabus. Professors outline exactly how much percentage weight is assigned to homework, participation, midterms, and finals." },
    { question: "Is this the same as a GPA calculator?", answer: "No, a GPA calculator averages your letter grades across multiple different classes. This calculates your percentage score within a single class." }
  ],
  relatedSlugs:["weighted-average-calculator", "average-calculator"]
};

export default def;