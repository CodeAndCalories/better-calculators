// filename: salary-per-month-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "salary-per-month-calculator",
  title: "Salary Per Month Calculator",
  description: "Break down your annual salary into monthly, weekly, and daily earnings.",
  longDescription: "When evaluating a job offer or creating a personal budget, it's crucial to know exactly how your annual salary breaks down into smaller pay periods. This calculator converts your yearly gross income into monthly, weekly, and daily wage estimates.",
  category: "finance",
  keywords:["salary calculator", "monthly salary", "weekly salary", "wage calculator", "paycheck breakdown"],
  inputs:[
    { type: "number", key: "annualSalary", label: "Annual Salary ($)", defaultValue: 60000, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const annualSalary = Number(values.annualSalary);

    if (isNaN(annualSalary)) {
      return { outputs:[], error: "Please enter a valid numeric salary." };
    }
    if (annualSalary < 0) {
      return { outputs:[], error: "Salary cannot be negative." };
    }

    const monthlySalary = annualSalary / 12;
    const weeklySalary = annualSalary / 52;
    // Assuming 5 working days a week for 52 weeks = 260 working days
    const dailySalary = annualSalary / 260;

    return {
      outputs:[
        { key: "monthlySalary", label: "Monthly Salary (Gross)", value: Number(monthlySalary.toFixed(2)), format: "currency", highlight: true },
        { key: "weeklySalary", label: "Weekly Salary (Gross)", value: Number(weeklySalary.toFixed(2)), format: "currency" },
        { key: "dailySalary", label: "Daily Wage (Assuming 260 work days)", value: Number(dailySalary.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator divides your annual salary by 12 to find your monthly wage. It divides by 52 to find your weekly wage, and divides by 260 (the standard number of working days in a year) to estimate your daily earnings.",
  examples:[
    {
      title: "Average US Salary",
      description: "Breaking down a $60,000 annual salary.",
      inputs: { annualSalary: 60000 },
      result: "Provides $5,000.00 monthly, $1,153.85 weekly, and $230.77 daily."
    },
    {
      title: "Six-Figure Income",
      description: "Breaking down a $120,000 annual salary.",
      inputs: { annualSalary: 120000 },
      result: "Provides $10,000.00 monthly, $2,307.69 weekly, and $461.54 daily."
    },
    {
      title: "Entry Level Salary",
      description: "Breaking down a $40,000 annual salary.",
      inputs: { annualSalary: 40000 },
      result: "Provides $3,333.33 monthly, $769.23 weekly, and $153.85 daily."
    }
  ],
  faqs:[
    { question: "Does this calculation include taxes?", answer: "No. This calculates your gross pay before taxes, insurance, or retirement contributions are deducted. Your actual take-home paycheck will be lower." },
    { question: "Why divide by 260 for the daily rate?", answer: "There are 52 weeks in a year. Assuming a standard 5-day workweek, 52 * 5 = 260 working days a year. This provides a more accurate representation of what you earn per day worked." },
    { question: "What if I get paid bi-weekly?", answer: "If you get paid every two weeks, you receive 26 paychecks a year. You can multiply the 'Weekly Salary' output by 2 to see your gross bi-weekly paycheck amount." },
    { question: "Is this accurate for hourly workers?", answer: "If your hours fluctuate, an annual salary estimate is tough to rely on. This calculator assumes a steady, guaranteed salaried work schedule." }
  ],
  relatedSlugs: ["pay-per-hour-calculator", "hours-worked-calculator"]
};

export default def;