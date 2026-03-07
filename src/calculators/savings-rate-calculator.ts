import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "savings-rate-calculator",
  title: "Savings Rate Calculator",
  shortTitle: "Savings Rate",
  description: "Calculate the percentage of your income you are saving each month.",
  longDescription:
    "Your savings rate is one of the most important numbers in personal finance — it directly determines how quickly you build financial independence. Enter your monthly income and monthly savings to see your savings rate, spending, and what percentage of income goes to expenses.",
  category: "finance",
  keywords: ["savings rate calculator", "personal savings rate", "how much am I saving", "savings percentage calculator", "financial independence savings rate"],
  inputs: [
    {
      type: "number",
      key: "monthlyIncome",
      label: "Monthly Income ($)",
      defaultValue: 5000,
      min: 1,
      step: 100,
      placeholder: "5000",
      helpText: "Use take-home (after-tax) income for the most useful result",
    },
    {
      type: "number",
      key: "monthlySavings",
      label: "Monthly Savings ($)",
      defaultValue: 1000,
      min: 0,
      step: 50,
      placeholder: "1000",
      helpText: "Include 401k, IRA, investments, and cash savings",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const income = Number(values.monthlyIncome);
    const savings = Number(values.monthlySavings);

    if (!Number.isFinite(income) || !Number.isFinite(savings) || income <= 0 || savings < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    if (savings > income) {
      return { outputs: [], error: "Savings cannot exceed income." };
    }

    const savingsRate = (savings / income) * 100;
    const spending = income - savings;
    const spendingRate = (spending / income) * 100;

    return {
      outputs: [
        { key: "savingsRate", label: "Savings Rate (%)", value: Math.round(savingsRate * 10) / 10, format: "number", highlight: true },
        { key: "monthlySpending", label: "Monthly Spending", value: Math.round(spending * 100) / 100, format: "currency" },
        { key: "spendingRate", label: "Spending Rate (%)", value: Math.round(spendingRate * 10) / 10, format: "number" },
      ],
    };
  },

  howItWorks: `Savings rate = (monthly savings ÷ monthly income) × 100. Spending = income − savings. Use take-home (after-tax) income for a real-world picture of how much of your available money you are actually saving.`,

  examples: [
    {
      title: "$5,000 income, $1,000 saved",
      description: "A 20% savings rate — a common personal finance target.",
      inputs: { monthlyIncome: 5000, monthlySavings: 1000 },
      result: "20% savings rate. $4,000 monthly spending.",
    },
    {
      title: "$8,000 income, $3,200 saved",
      description: "A 40% savings rate typical of aggressive FIRE-focused savers.",
      inputs: { monthlyIncome: 8000, monthlySavings: 3200 },
      result: "40% savings rate. $4,800 monthly spending.",
    },
  ],

  faqs: [
    {
      question: "What savings rate should I aim for?",
      answer: "Financial advisors often recommend 15–20% of income. FIRE (Financial Independence) enthusiasts often target 40–70%. Even a 10% rate is a meaningful start for many people.",
    },
    {
      question: "Should I use gross or take-home income?",
      answer: "Take-home (after-tax) income gives the most practical result because it reflects the money you actually control. Using gross income will make your savings rate appear lower.",
    },
  ],

  relatedSlugs: ["savings-goal-calculator", "compound-interest-calculator", "debt-payoff-calculator"],
};

export default def;
