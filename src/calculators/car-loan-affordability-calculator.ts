import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "car-loan-affordability-calculator",
  title: "Car Loan Affordability Calculator",
  description: "Find the maximum car price you can afford based on your monthly budget, interest rate, and loan term.",
  longDescription: "Enter the monthly payment you can afford, the loan term, and the interest rate to find the maximum vehicle price within your budget. Also accounts for a down payment to show total purchasing power.",
  category: "finance",
  keywords: ["car loan affordability", "how much car can I afford", "auto loan budget", "car payment calculator"],
  inputs: [
    { type: "number", key: "monthlyBudget", label: "Monthly Payment Budget ($)", defaultValue: 400, min: 50, step: 10, prefix: "$" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 7.0, min: 0.1, max: 30, step: 0.1, suffix: "%" },
    { type: "number", key: "termYears", label: "Loan Term (years)", defaultValue: 5, min: 1, max: 8, step: 1 },
    { type: "number", key: "downPayment", label: "Down Payment ($)", defaultValue: 3000, min: 0, step: 500, prefix: "$" },
  ],
  compute(values: InputValues): ComputeResult {
    const payment = Number(values.monthlyBudget);
    const annualRate = Number(values.annualRate) / 100;
    const years = Math.round(Number(values.termYears));
    const down = Number(values.downPayment);
    if (isNaN(payment) || isNaN(annualRate) || payment <= 0 || annualRate <= 0 || years <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const r = annualRate / 12;
    const n = years * 12;
    const maxLoan = payment * ((1 - Math.pow(1 + r, -n)) / r);
    const maxPrice = maxLoan + down;
    const totalInterest = payment * n - maxLoan;
    return {
      outputs: [
        { key: "maxPrice", label: "Maximum Car Price", value: Number(maxPrice.toFixed(2)), format: "currency", highlight: true },
        { key: "maxLoan", label: "Maximum Loan Amount", value: Number(maxLoan.toFixed(2)), format: "currency" },
        { key: "totalInterest", label: "Total Interest Paid", value: Number(totalInterest.toFixed(2)), format: "currency" },
        { key: "totalPaid", label: "Total Cost of Loan", value: Number((payment * n).toFixed(2)), format: "currency" },
      ],
    };
  },
  howItWorks: "The present value formula for an annuity gives the maximum loan amount for a given payment, rate, and term. Max car price = max loan + down payment.",
  examples: [
    {
      title: "$400/mo budget, 5 years",
      description: "$400/month, 7% rate, 5-year term, $3,000 down.",
      inputs: { monthlyBudget: 400, annualRate: 7.0, termYears: 5, downPayment: 3000 },
      result: "Max loan ~$20,198. Total buying power ~$23,198.",
    },
  ],
  faqs: [
    { question: "Should I include insurance and tax in my budget?", answer: "This calculator covers loan payments only. Ensure your overall car budget also accounts for insurance, registration, fuel, and maintenance." },
    { question: "Is a longer loan term better?", answer: "A longer term reduces monthly payments but increases total interest paid and the risk of being underwater on the loan." },
  ],
  relatedSlugs: ["loan-total-interest-calculator", "loan-balance-remaining-calculator", "net-worth-calculator"],
};

export default def;
