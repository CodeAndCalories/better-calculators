import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "rent-affordability-calculator",
  title: "Rent Affordability Calculator",
  shortTitle: "Rent Affordability",
  description: "Find out how much rent you can afford based on your income and expenses.",
  longDescription:
    "The most common rule is that rent should not exceed 30% of your gross monthly income. This calculator applies that guideline and also calculates a conservative 25% threshold, your remaining budget after rent, and how your current rent compares — giving you a clearer picture before signing a lease.",
  category: "finance",
  keywords: ["rent affordability calculator", "how much rent can I afford", "30 percent rule rent", "rent budget calculator", "monthly rent income"],
  inputs: [
    {
      type: "number",
      key: "grossMonthlyIncome",
      label: "Gross Monthly Income ($)",
      defaultValue: 5000,
      min: 1,
      step: 100,
      placeholder: "5000",
      helpText: "Before-tax income per month",
    },
    {
      type: "number",
      key: "monthlyDebts",
      label: "Monthly Debt Payments ($)",
      defaultValue: 300,
      min: 0,
      step: 50,
      placeholder: "300",
      helpText: "Car loans, student loans, credit cards, etc.",
    },
    {
      type: "number",
      key: "currentRent",
      label: "Current or Target Rent ($)",
      defaultValue: 1500,
      min: 0,
      step: 50,
      placeholder: "1500",
      helpText: "Optional — used to show how your rent compares",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const income = Number(values.grossMonthlyIncome);
    const debts = Number(values.monthlyDebts);
    const currentRent = Number(values.currentRent);

    if (
      !Number.isFinite(income) || !Number.isFinite(debts) || !Number.isFinite(currentRent) ||
      income <= 0 || debts < 0 || currentRent < 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const max30 = income * 0.30;
    const max25 = income * 0.25;
    const remainingAfterRentAt30 = income - max30 - debts;

    let verdict = "";
    if (currentRent > 0) {
      const rentPct = (currentRent / income) * 100;
      if (rentPct <= 25) {
        verdict = `Comfortable — rent is ${rentPct.toFixed(1)}% of income`;
      } else if (rentPct <= 30) {
        verdict = `Manageable — rent is ${rentPct.toFixed(1)}% of income`;
      } else if (rentPct <= 40) {
        verdict = `Stretched — rent is ${rentPct.toFixed(1)}% of income`;
      } else {
        verdict = `High risk — rent is ${rentPct.toFixed(1)}% of income`;
      }
    }

    return {
      outputs: [
        { key: "max30", label: "Recommended Max Rent (30% rule)", value: Math.round(max30 * 100) / 100, format: "currency", highlight: true },
        { key: "max25", label: "Conservative Max Rent (25% rule)", value: Math.round(max25 * 100) / 100, format: "currency" },
        { key: "remaining", label: "Budget Left After Rent & Debts", value: Math.round(remainingAfterRentAt30 * 100) / 100, format: "currency" },
        ...(currentRent > 0 ? [{ key: "verdict", label: "Your Rent Assessment", value: verdict, format: "text" as const }] : []),
      ],
    };
  },

  howItWorks: `The 30% rule: recommended maximum rent = gross monthly income × 30%. The 25% rule is a more conservative threshold used by some financial advisors. Remaining budget = income − recommended rent − monthly debts. The verdict compares your current/target rent against your income as a percentage.`,

  examples: [
    {
      title: "$5,000/month income, $300 in debts",
      description: "A single earner in a mid-cost city.",
      inputs: { grossMonthlyIncome: 5000, monthlyDebts: 300, currentRent: 1500 },
      result: "Max rent ~$1,500 (30%). $1,500 at 30% — comfortable.",
    },
    {
      title: "$8,000/month income, $600 in debts",
      description: "A higher earner evaluating a more expensive rental.",
      inputs: { grossMonthlyIncome: 8000, monthlyDebts: 600, currentRent: 2800 },
      result: "Max rent ~$2,400 (30%). $2,800 at 35% — stretched.",
    },
  ],

  faqs: [
    {
      question: "Should I use gross or take-home income?",
      answer: "The 30% rule traditionally uses gross (pre-tax) income. For a more practical budget, apply the same calculation to your take-home pay — this gives a stricter, more realistic limit.",
    },
    {
      question: "What counts as monthly debt payments?",
      answer: "Include minimum payments on car loans, student loans, personal loans, and credit cards. Do not include utilities or subscriptions — those come out of your remaining budget.",
    },
  ],

  relatedSlugs: ["savings-rate-calculator", "down-payment-calculator", "rent-vs-buy-calculator"],
};

export default def;
