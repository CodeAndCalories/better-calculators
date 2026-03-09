import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mortgage-payment-extra-principal-calculator",
  title: "Extra Mortgage Principal Payment Calculator",
  description: "See how much interest you save and how many years you cut from your mortgage by making extra principal payments.",
  longDescription: "Paying extra toward your mortgage principal each month can dramatically reduce the total interest paid and shorten your loan term. Enter your loan details and extra monthly payment to see the impact.",
  category: "finance",
  keywords: ["extra mortgage payment", "pay off mortgage early", "extra principal payment", "mortgage savings"],
  inputs: [
    { type: "number", key: "loanAmount", label: "Remaining Loan Balance ($)", defaultValue: 280000, min: 1000, step: 1000, prefix: "$" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 6.5, min: 0.1, max: 30, step: 0.1, suffix: "%" },
    { type: "number", key: "remainingYears", label: "Remaining Term (years)", defaultValue: 25, min: 1, max: 40, step: 1 },
    { type: "number", key: "extraMonthly", label: "Extra Monthly Payment ($)", defaultValue: 200, min: 0, step: 50, prefix: "$" },
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.loanAmount);
    const annualRate = Number(values.annualRate) / 100;
    const years = Math.round(Number(values.remainingYears));
    const extra = Number(values.extraMonthly);
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const r = annualRate / 12;
    const n = years * 12;
    const standardPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalStandard = standardPayment * n;

    // Simulate payoff with extra payment
    let balance = P;
    let months = 0;
    let totalPaidExtra = 0;
    const payment = standardPayment + extra;
    while (balance > 0 && months < n + 1) {
      const interest = balance * r;
      const principal = Math.min(payment - interest, balance);
      balance -= principal;
      totalPaidExtra += interest + principal;
      months++;
    }

    const interestStandard = totalStandard - P;
    const interestWithExtra = totalPaidExtra - P;
    const interestSaved = interestStandard - interestWithExtra;
    const yearsSaved = (n - months) / 12;

    return {
      outputs: [
        { key: "interestSaved", label: "Total Interest Saved", value: Number(interestSaved.toFixed(2)), format: "currency", highlight: true },
        { key: "yearsSaved", label: "Years Saved", value: Number(yearsSaved.toFixed(1)), format: "number" },
        { key: "newMonths", label: "New Payoff (months)", value: months, format: "number" },
        { key: "standardPayment", label: "Standard Monthly Payment", value: Number(standardPayment.toFixed(2)), format: "currency" },
      ],
    };
  },
  howItWorks: "The standard monthly payment is calculated via the amortisation formula. A month-by-month simulation is then run adding the extra payment each month until the balance reaches zero. Interest saved is the difference in total interest between both scenarios.",
  examples: [
    {
      title: "$280k, extra $200/mo",
      description: "$280,000 balance, 6.5%, 25 years remaining, $200 extra/month.",
      inputs: { loanAmount: 280000, annualRate: 6.5, remainingYears: 25, extraMonthly: 200 },
      result: "Save over $40,000 in interest and cut ~4 years from the loan.",
    },
  ],
  faqs: [
    { question: "Does extra payment go directly to principal?", answer: "In most mortgages yes, as long as you instruct the servicer to apply it to principal. Always verify with your lender." },
    { question: "Is it better to invest extra funds or pay down the mortgage?", answer: "It depends on your interest rate vs expected investment returns and your risk tolerance. Paying down debt is a guaranteed return equal to your interest rate." },
  ],
  relatedSlugs: ["mortgage-interest-only-calculator", "loan-total-interest-calculator", "loan-balance-remaining-calculator"],
};

export default def;
