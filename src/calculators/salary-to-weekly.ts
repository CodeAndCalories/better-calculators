import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "salary-to-weekly",
  title: "Salary to Weekly Pay Calculator",
  shortTitle: "Salary to Weekly",
  description: "Convert your annual salary to a weekly paycheck amount.",
  longDescription:
    "Knowing your weekly take-home equivalent helps with budgeting, comparing job offers, and understanding your true earning rate. This calculator divides your annual salary by 52 weeks to give you the gross weekly pay figure.",
  category: "finance",
  keywords: ["salary to weekly", "annual salary to weekly pay", "weekly paycheck calculator", "salary converter"],
  inputs: [
    {
      type: "number",
      key: "salary",
      label: "Annual Salary ($)",
      defaultValue: 52000,
      min: 0,
      step: 1000,
      placeholder: "52000",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const salary = Number(values.salary);

    if (isNaN(salary) || salary < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const weekly = salary / 52;

    return {
      outputs: [
        {
          key: "weekly",
          label: "Weekly Pay",
          value: Number(weekly.toFixed(2)),
          format: "currency",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your gross annual salary by 52, the number of weeks in a year. The result is your pre-tax weekly gross pay. It does not account for taxes, benefits, or deductions.",
  examples: [
    {
      title: "Median US Salary",
      description: "Calculating weekly pay for a $52,000 annual salary.",
      inputs: { salary: 52000 },
      result: "$52,000 per year equals exactly $1,000 per week.",
    },
    {
      title: "Six-Figure Salary",
      description: "Weekly equivalent of a $100,000 annual salary.",
      inputs: { salary: 100000 },
      result: "$100,000 per year equals approximately $1,923.08 per week.",
    },
    {
      title: "Entry Level",
      description: "Weekly pay for a $36,000 annual salary.",
      inputs: { salary: 36000 },
      result: "$36,000 per year equals approximately $692.31 per week.",
    },
  ],
  faqs: [
    {
      question: "Is this before or after taxes?",
      answer: "This calculator returns gross (pre-tax) weekly pay. Your actual take-home pay will be lower after federal, state, and local taxes.",
    },
    {
      question: "Why divide by 52?",
      answer: "There are exactly 52 weeks in a standard year, so dividing the annual salary by 52 gives the weekly equivalent.",
    },
    {
      question: "Does this account for paid time off?",
      answer: "No. This is a simple gross salary conversion and does not factor in PTO, holidays, or benefits.",
    },
  ],
  relatedSlugs: ["salary-to-daily", "weekly-to-salary", "daily-to-salary"],
};

export default def;
