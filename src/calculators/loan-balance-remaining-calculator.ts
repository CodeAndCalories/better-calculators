import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-balance-remaining-calculator",
  title: "Remaining Loan Balance Calculator",
  description: "Calculate how much you still owe on a loan after a number of payments.",
  longDescription: "Find your current outstanding loan balance at any point during a loan's life. Enter the original loan details and how many payments you have already made to see your remaining balance and equity built.",
  category: "finance",
  keywords: ["remaining loan balance", "loan payoff balance", "how much do I owe", "outstanding loan balance"],
  inputs: [
    { type: "number", key: "loanAmount", label: "Original Loan Amount ($)", defaultValue: 25000, min: 100, step: 100, prefix: "$" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 6.0, min: 0.1, max: 50, step: 0.1, suffix: "%" },
    { type: "number", key: "termYears", label: "Loan Term (years)", defaultValue: 5, min: 1, max: 40, step: 1 },
    { type: "number", key: "paymentsMade", label: "Payments Already Made", defaultValue: 24, min: 0, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.loanAmount);
    const annualRate = Number(values.annualRate) / 100;
    const years = Math.round(Number(values.termYears));
    const paid = Math.round(Number(values.paymentsMade));
    if (isNaN(P) || isNaN(annualRate) || P <= 0 || annualRate <= 0 || years <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const r = annualRate / 12;
    const n = years * 12;
    if (paid >= n) return { outputs: [{ key: "balance", label: "Remaining Balance", value: 0, format: "currency", highlight: true }] };

    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const balance = P * Math.pow(1 + r, paid) - monthly * ((Math.pow(1 + r, paid) - 1) / r);
    const principalPaid = P - balance;
    const paymentsLeft = n - paid;

    return {
      outputs: [
        { key: "balance", label: "Remaining Balance", value: Number(balance.toFixed(2)), format: "currency", highlight: true },
        { key: "principalPaid", label: "Principal Paid So Far", value: Number(principalPaid.toFixed(2)), format: "currency" },
        { key: "paymentsLeft", label: "Payments Remaining", value: paymentsLeft, format: "number" },
        { key: "monthly", label: "Monthly Payment", value: Number(monthly.toFixed(2)), format: "currency" },
      ],
    };
  },
  howItWorks: "The standard amortisation balance formula is used: Balance = P × (1+r)^n − Monthly × ((1+r)^n − 1) / r, where n is the number of payments made.",
  examples: [
    {
      title: "Car loan after 2 years",
      description: "$25,000 at 6%, 5-year term, 24 payments made.",
      inputs: { loanAmount: 25000, annualRate: 6.0, termYears: 5, paymentsMade: 24 },
      result: "Remaining balance ~$15,800.",
    },
  ],
  faqs: [
    { question: "Why does my balance drop slowly at first?", answer: "Early payments are mostly interest. As the balance decreases, a greater share of each payment goes toward principal." },
    { question: "Can I use this for a mortgage?", answer: "Yes. Enter your original loan amount, rate, term, and number of monthly payments made." },
  ],
  relatedSlugs: ["loan-total-interest-calculator", "mortgage-payment-extra-principal-calculator", "mortgage-interest-only-calculator"],
};

export default def;
