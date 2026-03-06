import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "salary-to-daily",
  title: "Salary to Daily Pay Calculator",
  shortTitle: "Salary to Daily",
  description: "Convert your annual salary to a daily rate.",
  longDescription:
    "Understanding your daily rate is useful when comparing salaried and contract work, calculating per diem rates, or simply knowing what each workday is worth. This calculator divides your annual salary by 260 — the standard number of working days in a year (52 weeks × 5 days).",
  category: "finance",
  keywords: ["salary to daily", "annual salary to daily rate", "daily pay calculator", "salary converter"],
  inputs: [
    {
      type: "number",
      key: "salary",
      label: "Annual Salary ($)",
      defaultValue: 65000,
      min: 0,
      step: 1000,
      placeholder: "65000",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const salary = Number(values.salary);

    if (isNaN(salary) || salary < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const daily = salary / 260;

    return {
      outputs: [
        {
          key: "daily",
          label: "Daily Pay",
          value: Number(daily.toFixed(2)),
          format: "currency",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator divides your annual salary by 260, which represents 52 weeks multiplied by 5 working days per week. This gives the gross daily rate for a standard Monday-to-Friday work schedule.",
  examples: [
    {
      title: "Common Salary",
      description: "Daily rate for a $65,000 annual salary.",
      inputs: { salary: 65000 },
      result: "$65,000 per year equals exactly $250 per day.",
    },
    {
      title: "Six-Figure Salary",
      description: "Daily rate for a $100,000 annual salary.",
      inputs: { salary: 100000 },
      result: "$100,000 per year equals approximately $384.62 per day.",
    },
    {
      title: "Junior Role",
      description: "Daily rate for a $40,000 annual salary.",
      inputs: { salary: 40000 },
      result: "$40,000 per year equals approximately $153.85 per day.",
    },
  ],
  faqs: [
    {
      question: "Why divide by 260?",
      answer: "260 is the standard number of working days per year: 52 weeks × 5 days. It excludes weekends but does not deduct holidays or vacation days.",
    },
    {
      question: "Is this useful for freelance rate comparisons?",
      answer: "Yes. Knowing your salaried daily rate helps you benchmark freelance or contract day rates against equivalent full-time employment.",
    },
    {
      question: "Does this include taxes?",
      answer: "No. This shows gross daily pay before any deductions. Net take-home will be lower depending on your tax bracket and deductions.",
    },
  ],
  relatedSlugs: ["salary-to-weekly", "daily-to-salary", "weekly-to-salary"],
};

export default def;
