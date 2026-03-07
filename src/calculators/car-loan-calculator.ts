import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "car-loan-calculator",
  title: "Car Loan Calculator",
  shortTitle: "Car Loan",
  description: "Calculate your monthly car loan payment, total interest, and total cost.",
  longDescription:
    "Enter your loan amount, annual interest rate, and loan term to see your exact monthly payment, how much interest you'll pay over the life of the loan, and the total amount paid. Useful for comparing financing offers before buying.",
  category: "finance",
  keywords: ["car loan calculator", "auto loan calculator", "monthly car payment", "car finance calculator", "vehicle loan payment"],
  inputs: [
    {
      type: "number",
      key: "loanAmount",
      label: "Loan Amount ($)",
      defaultValue: 25000,
      min: 100,
      step: 100,
      placeholder: "25000",
    },
    {
      type: "number",
      key: "annualRate",
      label: "Annual Interest Rate (%)",
      defaultValue: 6.5,
      min: 0.01,
      max: 50,
      step: 0.1,
      placeholder: "6.5",
    },
    {
      type: "select",
      key: "termMonths",
      label: "Loan Term",
      defaultValue: "60",
      options: [
        { label: "24 months (2 years)", value: "24" },
        { label: "36 months (3 years)", value: "36" },
        { label: "48 months (4 years)", value: "48" },
        { label: "60 months (5 years)", value: "60" },
        { label: "72 months (6 years)", value: "72" },
        { label: "84 months (7 years)", value: "84" },
      ],
    },
  ],

  compute(values: InputValues): ComputeResult {
    const principal = Number(values.loanAmount);
    const annualRate = Number(values.annualRate);
    const n = Number(values.termMonths);

    if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || principal <= 0 || annualRate <= 0 || n <= 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const r = annualRate / 100 / 12;

    // Standard amortisation formula: M = P × r(1+r)^n / ((1+r)^n - 1)
    const monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - principal;

    return {
      outputs: [
        { key: "monthlyPayment", label: "Monthly Payment", value: Math.round(monthlyPayment * 100) / 100, format: "currency", highlight: true },
        { key: "totalInterest", label: "Total Interest Paid", value: Math.round(totalInterest * 100) / 100, format: "currency" },
        { key: "totalPaid", label: "Total Amount Paid", value: Math.round(totalPaid * 100) / 100, format: "currency" },
      ],
    };
  },

  howItWorks: `Uses the standard loan amortisation formula: M = P × r(1+r)^n / ((1+r)^n − 1), where P = principal, r = monthly interest rate (annual rate ÷ 12), n = number of monthly payments. Total interest = total paid − principal.`,

  examples: [
    {
      title: "$25,000 at 6.5% for 60 months",
      description: "A typical new car loan.",
      inputs: { loanAmount: 25000, annualRate: 6.5, termMonths: "60" },
      result: "~$489/month. ~$4,350 total interest.",
    },
    {
      title: "$15,000 at 9% for 48 months",
      description: "A used car loan at a higher rate.",
      inputs: { loanAmount: 15000, annualRate: 9, termMonths: "48" },
      result: "~$373/month. ~$2,900 total interest.",
    },
  ],

  faqs: [
    {
      question: "Does this include taxes or fees?",
      answer: "No — the calculator uses the loan amount only. Add taxes, registration, and dealer fees to the loan amount if they are being financed.",
    },
    {
      question: "Should I choose a shorter or longer term?",
      answer: "Shorter terms have higher monthly payments but significantly less total interest. Longer terms reduce monthly payments but cost much more overall.",
    },
  ],

  relatedSlugs: ["down-payment-calculator", "loan-interest-calculator", "compound-interest-calculator"],
};

export default def;
