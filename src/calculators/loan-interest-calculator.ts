import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-interest-calculator",
  title: "Loan Interest Calculator",
  shortTitle: "Loan Interest",
  description: "Calculate total interest paid and total cost for any fixed-rate loan.",
  longDescription:
    "Enter your loan principal, annual interest rate, and term in months or years. The calculator returns your monthly payment, total interest over the life of the loan, and total amount repaid — so you can clearly see what borrowing actually costs.",
  category: "finance",
  keywords: ["loan interest calculator", "total interest paid", "loan cost calculator", "personal loan calculator", "interest on a loan"],
  inputs: [
    {
      type: "number",
      key: "principal",
      label: "Loan Amount ($)",
      defaultValue: 20000,
      min: 1,
      step: 100,
      placeholder: "20000",
    },
    {
      type: "number",
      key: "annualRate",
      label: "Annual Interest Rate (%)",
      defaultValue: 8,
      min: 0.01,
      max: 100,
      step: 0.1,
      placeholder: "8",
    },
    {
      type: "number",
      key: "termYears",
      label: "Loan Term (years)",
      defaultValue: 5,
      min: 0.5,
      max: 30,
      step: 0.5,
      placeholder: "5",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const principal = Number(values.principal);
    const annualRate = Number(values.annualRate);
    const termYears = Number(values.termYears);

    if (
      !Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(termYears) ||
      principal <= 0 || annualRate <= 0 || termYears <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const r = annualRate / 100 / 12;
    const n = Math.round(termYears * 12);

    // Standard amortisation: M = P × r(1+r)^n / ((1+r)^n - 1)
    const monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - principal;

    return {
      outputs: [
        { key: "totalInterest", label: "Total Interest Paid", value: Math.round(totalInterest * 100) / 100, format: "currency", highlight: true },
        { key: "monthlyPayment", label: "Monthly Payment", value: Math.round(monthlyPayment * 100) / 100, format: "currency" },
        { key: "totalPaid", label: "Total Amount Repaid", value: Math.round(totalPaid * 100) / 100, format: "currency" },
      ],
    };
  },

  howItWorks: `Uses the standard amortisation formula: M = P × r(1+r)^n / ((1+r)^n − 1), where P = principal, r = monthly rate (annual ÷ 12), n = total months. Total interest = (M × n) − P.`,

  examples: [
    {
      title: "$20,000 personal loan at 8% for 5 years",
      description: "A typical personal loan for home improvement or debt consolidation.",
      inputs: { principal: 20000, annualRate: 8, termYears: 5 },
      result: "~$406/month. ~$4,332 total interest.",
    },
    {
      title: "$10,000 at 12% for 3 years",
      description: "A higher-rate short-term loan.",
      inputs: { principal: 10000, annualRate: 12, termYears: 3 },
      result: "~$332/month. ~$1,955 total interest.",
    },
  ],

  faqs: [
    {
      question: "How can I reduce total interest paid?",
      answer: "Pay more than the minimum each month, choose a shorter term, or shop for a lower rate. Even small extra payments reduce the principal faster and cut interest significantly.",
    },
    {
      question: "Does this work for mortgages?",
      answer: "Yes — the maths is identical. Enter the mortgage amount, rate, and term in years.",
    },
  ],

  relatedSlugs: ["car-loan-calculator", "down-payment-calculator", "debt-payoff-calculator"],
};

export default def;
