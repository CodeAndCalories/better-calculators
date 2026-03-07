import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "interest-only-loan-calculator",
  title: "Interest-Only Loan Calculator",
  shortTitle: "Interest-Only Loan",
  description: "Calculate the monthly interest-only payment on a loan and compare it to a fully amortising payment.",
  longDescription:
    "An interest-only loan requires you to pay only the interest each month — the principal stays unchanged. This results in lower short-term payments but no equity build-up during the interest-only period. This calculator shows your interest-only payment, the equivalent fully amortising payment, and the total interest cost difference over the loan term.",
  category: "finance",
  keywords: ["interest only loan calculator", "interest only mortgage calculator", "IO loan payment", "interest only vs principal and interest", "interest only period"],
  inputs: [
    {
      type: "number",
      key: "loanAmount",
      label: "Loan Amount ($)",
      defaultValue: 300000,
      min: 1000,
      step: 1000,
      placeholder: "300000",
    },
    {
      type: "number",
      key: "annualRate",
      label: "Annual Interest Rate (%)",
      defaultValue: 6.5,
      min: 0.01,
      max: 30,
      step: 0.1,
      placeholder: "6.5",
    },
    {
      type: "number",
      key: "loanTermYears",
      label: "Full Loan Term (years)",
      defaultValue: 30,
      min: 1,
      max: 40,
      step: 1,
      placeholder: "30",
    },
    {
      type: "number",
      key: "ioYears",
      label: "Interest-Only Period (years)",
      defaultValue: 5,
      min: 1,
      max: 15,
      step: 1,
      placeholder: "5",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const principal = Number(values.loanAmount);
    const annualRate = Number(values.annualRate);
    const termYears = Number(values.loanTermYears);
    const ioYears = Number(values.ioYears);

    if (
      !Number.isFinite(principal) || !Number.isFinite(annualRate) ||
      !Number.isFinite(termYears) || !Number.isFinite(ioYears) ||
      principal <= 0 || annualRate <= 0 || termYears <= 0 || ioYears <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    if (ioYears >= termYears) {
      return { outputs: [], error: "Interest-only period must be shorter than the full loan term." };
    }

    const r = annualRate / 100 / 12;
    const totalMonths = termYears * 12;
    const ioMonths = ioYears * 12;
    const amortMonths = totalMonths - ioMonths;

    // Interest-only monthly payment
    const ioMonthlyPayment = principal * r;

    // Fully amortising payment (for comparison, over full term)
    const fullAmortPayment = principal * (r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);

    // P&I payment after IO period ends (same principal, remaining amort months)
    const piPaymentAfterIO = principal * (r * Math.pow(1 + r, amortMonths)) / (Math.pow(1 + r, amortMonths) - 1);

    // Total interest: IO period + amortisation period
    const totalInterestIO = (ioMonthlyPayment * ioMonths) + (piPaymentAfterIO * amortMonths - principal);
    const totalInterestFullAmort = fullAmortPayment * totalMonths - principal;
    const extraInterest = totalInterestIO - totalInterestFullAmort;

    return {
      outputs: [
        { key: "ioPayment", label: "Monthly Interest-Only Payment", value: Math.round(ioMonthlyPayment * 100) / 100, format: "currency", highlight: true },
        { key: "piAfterIO", label: "P&I Payment After IO Period", value: Math.round(piPaymentAfterIO * 100) / 100, format: "currency" },
        { key: "fullAmortPayment", label: "Equivalent Full P&I Payment", value: Math.round(fullAmortPayment * 100) / 100, format: "currency" },
        { key: "extraInterest", label: "Extra Interest vs Full Amortisation", value: Math.round(extraInterest), format: "currency" },
        { key: "totalInterest", label: "Total Interest Paid (IO loan)", value: Math.round(totalInterestIO), format: "currency" },
      ],
    };
  },

  howItWorks: `Interest-only payment = loan amount × monthly rate. After the IO period, the full principal is amortised over the remaining term using the standard formula: M = P × r(1+r)^n / ((1+r)^n − 1). Extra interest = total interest paid on the IO loan minus total interest on a fully amortising loan over the same term.`,

  examples: [
    {
      title: "$300,000 at 6.5%, 30-year term, 5-year IO period",
      description: "A common interest-only mortgage structure.",
      inputs: { loanAmount: 300000, annualRate: 6.5, loanTermYears: 30, ioYears: 5 },
      result: "IO payment ~$1,625/month. P&I after IO ~$2,069/month.",
    },
  ],

  faqs: [
    {
      question: "Why does the payment jump after the interest-only period?",
      answer: "During the IO period no principal is repaid, so the same full principal must be amortised over a shorter remaining term — resulting in a significantly higher payment.",
    },
    {
      question: "Who uses interest-only loans?",
      answer: "Investors who expect property appreciation, borrowers who want lower early payments, or those with variable income. They carry risk if property values fall or income doesn't grow as expected.",
    },
  ],

  relatedSlugs: ["loan-interest-calculator", "amortization-calculator", "car-loan-calculator", "down-payment-calculator"],
};

export default def;
