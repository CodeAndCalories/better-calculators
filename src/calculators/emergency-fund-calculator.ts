import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "emergency-fund-calculator",
  title: "Emergency Fund Calculator",
  shortTitle: "Emergency Fund",
  description: "Calculate how large your emergency fund should be.",
  longDescription: "Financial advisors recommend saving 3–6 months of living expenses as an emergency fund. Enter your monthly expenses and your preferred number of months to calculate your target savings amount.",
  category: "finance",
  keywords: ["emergency fund", "savings target", "financial safety net", "emergency savings"],
  inputs: [
    { type: "number", key: "monthlyExpenses", label: "Monthly Expenses ($)", defaultValue: 3000, min: 0, step: 100, placeholder: "3000" },
    { type: "number", key: "months", label: "Months of Coverage", defaultValue: 6, min: 1, max: 24, step: 1, placeholder: "6" },
  ],
  compute(values: InputValues): ComputeResult {
    const monthlyExpenses = Number(values.monthlyExpenses);
    const months = Number(values.months);
    if (isNaN(monthlyExpenses) || isNaN(months) || monthlyExpenses < 0 || months < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const target = monthlyExpenses * months;
    return {
      outputs: [
        { key: "target", label: "Emergency Fund Target ($)", value: Number(target.toFixed(2)), format: "number", highlight: true },
      ],
    };
  },
  howItWorks: "Multiplies your monthly expenses by the desired number of months of coverage.",
  examples: [
    {
      title: "Standard 6-Month Fund",
      description: "$3,000/month expenses, 6 months coverage.",
      inputs: { monthlyExpenses: 3000, months: 6 },
      result: "Target: $18,000.",
    },
    {
      title: "Lean 3-Month Fund",
      description: "$2,500/month expenses, 3 months coverage.",
      inputs: { monthlyExpenses: 2500, months: 3 },
      result: "Target: $7,500.",
    },
  ],
  faqs: [
    { question: "How many months should I save?", answer: "Most advisors recommend 3–6 months. Self-employed or single-income households may want 6–12." },
    { question: "What counts as monthly expenses?", answer: "Include rent/mortgage, utilities, groceries, insurance, minimum debt payments, and transportation." },
    { question: "Where should I keep my emergency fund?", answer: "A high-yield savings account — liquid and accessible, but separate from everyday spending." },
  ],
  relatedSlugs: ["savings-goal-calculator", "monthly-budget-calculator"],
};

export default def;
