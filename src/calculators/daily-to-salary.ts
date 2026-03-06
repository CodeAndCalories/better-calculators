import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "daily-to-salary",
  title: "Daily Rate to Annual Salary Calculator",
  shortTitle: "Daily to Salary",
  description: "Convert your daily pay rate to an equivalent annual salary.",
  longDescription:
    "Freelancers, contractors, and day-rate workers often need to understand how their daily earnings translate to an annual salary equivalent. This calculator multiplies your daily rate by 260 working days to give you a comparable full-time annual figure.",
  category: "finance",
  keywords: ["daily to salary", "daily rate to annual salary", "day rate calculator", "income converter"],
  inputs: [
    {
      type: "number",
      key: "daily",
      label: "Daily Pay ($)",
      defaultValue: 250,
      min: 0,
      step: 25,
      placeholder: "250",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const daily = Number(values.daily);

    if (isNaN(daily) || daily < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const salary = daily * 260;

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
    "The calculator multiplies your daily rate by 260, the standard number of working days in a year (52 weeks × 5 days). This gives you an annualized salary equivalent for a full-time Monday-to-Friday schedule.",
  examples: [
    {
      title: "Standard Day Rate",
      description: "Annualizing a $250 daily rate.",
      inputs: { daily: 250 },
      result: "$250 per day equals exactly $65,000 per year.",
    },
    {
      title: "Senior Contractor",
      description: "Annualizing a $500 daily rate.",
      inputs: { daily: 500 },
      result: "$500 per day equals $130,000 per year.",
    },
    {
      title: "Entry Level",
      description: "Annualizing a $150 daily rate.",
      inputs: { daily: 150 },
      result: "$150 per day equals $39,000 per year.",
    },
  ],
  faqs: [
    {
      question: "Why multiply by 260?",
      answer: "260 represents 52 weeks × 5 working days, the standard number of working days in a year excluding weekends.",
    },
    {
      question: "Should contractors use this to set their day rate?",
      answer: "It's a useful starting point, but contractors should also factor in self-employment taxes, lack of benefits, and periods without work when setting their rates.",
    },
    {
      question: "What if I work fewer than 5 days a week?",
      answer: "Multiply your daily rate by your actual number of working days per year for a more accurate figure.",
    },
  ],
  relatedSlugs: ["salary-to-daily", "weekly-to-salary", "salary-to-weekly"],
};

export default def;
