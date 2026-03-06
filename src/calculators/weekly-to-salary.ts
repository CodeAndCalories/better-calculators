import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "weekly-to-salary",
  title: "Weekly Pay to Annual Salary Calculator",
  shortTitle: "Weekly to Salary",
  description: "Convert your weekly pay to an equivalent annual salary.",
  longDescription:
    "If you're paid weekly or know your weekly rate, this calculator extrapolates your equivalent annual salary. This is useful when comparing a weekly-pay job offer against a salaried position, or when filling out forms that ask for annual income.",
  category: "finance",
  keywords: ["weekly to salary", "weekly pay to annual salary", "salary calculator", "income converter"],
  inputs: [
    {
      type: "number",
      key: "weekly",
      label: "Weekly Pay ($)",
      defaultValue: 1000,
      min: 0,
      step: 50,
      placeholder: "1000",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const weekly = Number(values.weekly);

    if (isNaN(weekly) || weekly < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const salary = weekly * 52;

    return {
      outputs: [
        {
          key: "salary",
          label: "Annual Salary",
          value: Number(salary.toFixed(2)),
          format: "currency",
          highlight: true,
        },
      ],
    };
  },
  howItWorks:
    "The calculator multiplies your weekly gross pay by 52 weeks to produce an annualized salary figure. This is the reverse of dividing an annual salary by 52 and assumes you are paid every week of the year.",
  examples: [
    {
      title: "Weekly Rate of $1,000",
      description: "Annualizing a $1,000 weekly paycheck.",
      inputs: { weekly: 1000 },
      result: "$1,000 per week equals exactly $52,000 per year.",
    },
    {
      title: "Part-Time Work",
      description: "Annualizing a $500 weekly pay.",
      inputs: { weekly: 500 },
      result: "$500 per week equals $26,000 per year.",
    },
    {
      title: "High Earner",
      description: "Annualizing a $2,500 weekly rate.",
      inputs: { weekly: 2500 },
      result: "$2,500 per week equals $130,000 per year.",
    },
  ],
  faqs: [
    {
      question: "Is this gross or net pay?",
      answer: "Whatever you enter is treated as-is. If you enter your gross weekly pay, you get a gross annual figure. If you enter your net pay, you get an annualized net figure.",
    },
    {
      question: "Does this account for unpaid weeks?",
      answer: "No. This assumes 52 paid weeks per year. If you have unpaid time off, the actual annual total will be lower.",
    },
    {
      question: "Can I use this to compare a job offer?",
      answer: "Yes. If a job lists a weekly rate, multiply by 52 here to see how it compares to a salaried position quoted annually.",
    },
  ],
  relatedSlugs: ["salary-to-weekly", "daily-to-salary", "salary-to-daily"],
};

export default def;
