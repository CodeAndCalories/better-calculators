import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "hourly-to-salary-calculator",
  title: "Hourly to Salary Calculator",
  shortTitle: "Hourly to Salary",

  description: "Convert hourly wage into yearly salary instantly.",

  longDescription:
    "The Hourly to Salary Calculator converts an hourly wage into annual income. Enter your hourly pay and hours per week to see your yearly salary estimate.",

  category: "finance",

  keywords: [
    "hourly to salary calculator",
    "convert hourly wage to salary",
    "annual salary from hourly pay",
  ],

  inputs: [
    {
      type: "number",
      key: "hourly",
      label: "Hourly Wage ($)",
      defaultValue: 20,
      min: 0,
      step: 0.01,
      placeholder: "20",
    },
    {
      type: "number",
      key: "hours",
      label: "Hours Per Week",
      defaultValue: 40,
      min: 0,
      step: 1,
      placeholder: "40",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const hourly = Number(values.hourly);
    const hours = Number(values.hours);

    const weekly = hourly * hours;
    const yearly = weekly * 52;
    const monthly = yearly / 12;

    return {
      outputs: [
        {
          key: "yearly",
          label: "Yearly Salary",
          value: Number(yearly.toFixed(2)),
          format: "number",
          highlight: true,
        },
        {
          key: "monthly",
          label: "Monthly Income",
          value: Number(monthly.toFixed(2)),
          format: "number",
        },
        {
          key: "weekly",
          label: "Weekly Income",
          value: Number(weekly.toFixed(2)),
          format: "number",
        },
      ],
    };
  },

  howItWorks:
    "Annual salary is calculated by multiplying hourly wage by hours per week and by 52 weeks per year.",

  examples: [
    {
      title: "$20/hour job",
      description: "Working 40 hours per week at $20/hour.",
      inputs: { hourly: 20, hours: 40 },
      result: "$41,600 yearly salary.",
    },
  ],

  faqs: [
    {
      question: "How do you convert hourly pay to salary?",
      answer:
        "Multiply hourly pay by hours per week and then multiply by 52 weeks in a year.",
    },
  ],

  relatedSlugs: [
    "salary-to-hourly-calculator",
  ],
};

export default def;