import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hourly-rate-from-project-calculator",
  title: "Effective Hourly Rate Calculator",
  shortTitle: "Effective Hourly Rate",
  description: "Find your effective hourly rate from a project fee and hours worked.",
  longDescription: "Freelancers and consultants can use this calculator to determine their effective hourly rate for any project. Divide your total project fee by the hours spent to see if the project was worth your time.",
  category: "finance",
  keywords: ["effective hourly rate", "freelance rate", "project rate calculator", "hourly from project"],
  inputs: [
    { type: "number", key: "projectFee", label: "Total Project Fee ($)", defaultValue: 1500, min: 0, step: 50, placeholder: "1500" },
    { type: "number", key: "hoursWorked", label: "Hours Worked", defaultValue: 20, min: 0.5, step: 0.5, placeholder: "20" },
  ],
  compute(values: InputValues): ComputeResult {
    const projectFee = Number(values.projectFee);
    const hoursWorked = Number(values.hoursWorked);
    if (isNaN(projectFee) || isNaN(hoursWorked) || hoursWorked <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const hourlyRate = projectFee / hoursWorked;
    return {
      outputs: [
        { key: "hourlyRate", label: "Effective Hourly Rate ($/hr)", value: Number(hourlyRate.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Divides the total project fee by the total hours worked to find the effective hourly rate.",
  examples: [
    {
      title: "Design Project",
      description: "$1,500 fee for 20 hours of work.",
      inputs: { projectFee: 1500, hoursWorked: 20 },
      result: "$75 per hour.",
    },
    {
      title: "Writing Contract",
      description: "$800 fee for 16 hours of work.",
      inputs: { projectFee: 800, hoursWorked: 16 },
      result: "$50 per hour.",
    },
  ],
  faqs: [
    { question: "Should I include unpaid admin time?", answer: "Yes — including emails, revisions, and meetings gives a more accurate picture of your true rate." },
    { question: "How do I know if my rate is competitive?", answer: "Compare to industry benchmarks. Freelancers often charge 2–3× their target hourly income to cover taxes and overhead." },
    { question: "What if I want a target rate?", answer: "Multiply your target hourly rate by your estimated hours to set the right project fee." },
  ],
  relatedSlugs: ["salary-to-hourly-calculator", "pay-per-hour-calculator"],
};

export default def;
