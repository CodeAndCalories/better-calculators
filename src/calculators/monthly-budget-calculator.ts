import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "monthly-budget-calculator",
  title: "Monthly Budget Calculator",
  description: "Calculate your monthly surplus or deficit by entering your income and key expense categories.",
  longDescription: "Enter your monthly take-home income and major expense categories to see your remaining balance, savings rate, and whether you have a surplus or deficit. A simple first step toward understanding your personal finances.",
  category: "finance",
  keywords: ["monthly budget calculator", "budget planner", "income vs expenses", "personal budget"],
  inputs: [
    { type: "number", key: "income", label: "Monthly Take-Home Income ($)", defaultValue: 4500, min: 0, step: 100, prefix: "$" },
    { type: "number", key: "housing", label: "Housing (rent/mortgage) ($)", defaultValue: 1200, min: 0, step: 50, prefix: "$" },
    { type: "number", key: "food", label: "Food & Groceries ($)", defaultValue: 400, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "transport", label: "Transportation ($)", defaultValue: 300, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "utilities", label: "Utilities & Bills ($)", defaultValue: 200, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "other", label: "Other Expenses ($)", defaultValue: 300, min: 0, step: 10, prefix: "$" },
  ],
  compute(values: InputValues): ComputeResult {
    const income = Number(values.income);
    const housing = Number(values.housing);
    const food = Number(values.food);
    const transport = Number(values.transport);
    const utilities = Number(values.utilities);
    const other = Number(values.other);
    if ([income, housing, food, transport, utilities, other].some(isNaN)) {
      return { outputs: [], error: "Please enter valid numbers for all fields." };
    }
    const totalExpenses = housing + food + transport + utilities + other;
    const surplus = income - totalExpenses;
    const savingsRate = income > 0 ? (surplus / income) * 100 : 0;
    const housingRatio = income > 0 ? (housing / income) * 100 : 0;
    return {
      outputs: [
        { key: "surplus", label: surplus >= 0 ? "Monthly Surplus" : "Monthly Deficit", value: Number(Math.abs(surplus).toFixed(2)), format: "currency", highlight: true },
        { key: "totalExpenses", label: "Total Monthly Expenses", value: Number(totalExpenses.toFixed(2)), format: "currency" },
        { key: "savingsRate", label: "Savings Rate", value: Number(savingsRate.toFixed(1)), format: "percentage" },
        { key: "housingRatio", label: "Housing % of Income", value: Number(housingRatio.toFixed(1)), format: "percentage" },
      ],
    };
  },
  howItWorks: "All expenses are summed and subtracted from income. Savings rate = (surplus ÷ income) × 100. A healthy housing ratio is generally under 30% of gross income.",
  examples: [
    {
      title: "Comfortable budget",
      description: "$4,500 income, $2,400 in expenses.",
      inputs: { income: 4500, housing: 1200, food: 400, transport: 300, utilities: 200, other: 300 },
      result: "Surplus $2,100, savings rate 46.7%.",
    },
    {
      title: "Tight budget",
      description: "$3,000 income, $2,800 in expenses.",
      inputs: { income: 3000, housing: 1400, food: 500, transport: 300, utilities: 300, other: 300 },
      result: "Surplus $200, savings rate 6.7%.",
    },
  ],
  faqs: [
    { question: "What is a good savings rate?", answer: "Financial advisors often suggest saving 20% of take-home pay. Even 10% is a strong start." },
    { question: "Should I include debt payments in 'other expenses'?", answer: "Yes. Add minimum debt payments (credit cards, student loans, etc.) to your expense total for an accurate picture." },
  ],
  relatedSlugs: ["net-worth-calculator", "debt-to-income-calculator", "savings-interest-calculator"],
};

export default def;
