import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-payment-calculator",
  title: "Loan Payment Calculator",
  shortTitle: "Loan Payment",
  description: "Calculate monthly payments, total interest, and total cost for any personal or auto loan.",
  longDescription: "Whether it's a car loan, personal loan, or student loan, our loan payment calculator shows your exact monthly payment, total interest paid, and the total amount you'll repay over the life of the loan.",
  category: "finance",
  keywords: ["loan payment calculator", "monthly loan payment", "auto loan calculator", "personal loan calculator"],
  inputs: [
    { type: "number", key: "loanAmount", label: "Loan Amount", prefix: "$", defaultValue: 25000, min: 100, step: 500, placeholder: "25000" },
    { type: "number", key: "interestRate", label: "Annual Interest Rate", suffix: "%", defaultValue: 6.5, min: 0.1, max: 50, step: 0.1, placeholder: "6.5" },
    { type: "select", key: "loanTerm", label: "Loan Term", defaultValue: "60", options: [
      { label: "12 months (1 year)", value: "12" },
      { label: "24 months (2 years)", value: "24" },
      { label: "36 months (3 years)", value: "36" },
      { label: "48 months (4 years)", value: "48" },
      { label: "60 months (5 years)", value: "60" },
      { label: "72 months (6 years)", value: "72" },
      { label: "84 months (7 years)", value: "84" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const principal = Number(values.loanAmount);
    const annualRate = Number(values.interestRate);
    const numPayments = Number(values.loanTerm);
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numPayments;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    const interestPct = (totalInterest / principal) * 100;

    return {
      outputs: [
        { key: "monthlyPayment", label: "Monthly Payment", value: monthlyPayment, format: "currency", highlight: true },
        { key: "totalInterest", label: "Total Interest", value: totalInterest, format: "currency" },
        { key: "totalCost", label: "Total Amount Paid", value: totalPaid, format: "currency" },
        { key: "interestPct", label: "Interest as % of Loan", value: interestPct, format: "percentage" },
      ],
    };
  },
  howItWorks: `Monthly loan payments are calculated with the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1]. Here P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the number of monthly payments. Each payment covers that month's interest first, with the remainder applied to the principal balance.`,
  examples: [
    {
      title: "$25,000 Auto Loan — 5 Years at 6.5%",
      description: "A typical new car loan scenario.",
      inputs: { loanAmount: 25000, interestRate: 6.5, loanTerm: "60" },
      result: "$487.46/month, total interest of $4,248.",
    },
    {
      title: "$10,000 Personal Loan — 3 Years at 12%",
      description: "A personal loan at a higher rate for a shorter term.",
      inputs: { loanAmount: 10000, interestRate: 12, loanTerm: "36" },
      result: "$332.14/month, total interest of $1,957.",
    },
  ],
  faqs: [
    { question: "What is an amortized loan?", answer: "An amortized loan has fixed regular payments where each payment covers the accrued interest and reduces the principal. Early payments are mostly interest; later payments are mostly principal." },
    { question: "Should I choose a shorter or longer loan term?", answer: "A shorter term means higher monthly payments but less total interest paid. A longer term lowers your monthly payment but significantly increases the total cost of the loan." },
    { question: "How does extra payment affect a loan?", answer: "Making extra payments directly toward principal can reduce the total interest dramatically and shorten the loan term. Even one extra payment per year makes a meaningful difference." },
  ],
  relatedSlugs: ["mortgage-calculator", "credit-card-payoff-calculator", "compound-interest-calculator"],
};

export default def;
