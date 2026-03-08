import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mortgage-extra-payment-calculator",
  title: "Mortgage Extra Payment Calculator",
  shortTitle: "Extra Payment",
  description: "See how much interest and time you save by making extra monthly mortgage payments.",
  category: "finance",
  keywords: ["mortgage extra payment calculator", "pay off mortgage early", "extra payment savings", "mortgage overpayment"],
  inputs: [
    { type: "number", key: "balance",      label: "Loan Balance ($)",          defaultValue: 280000, min: 1000, step: 1000 },
    { type: "number", key: "annualRate",   label: "Annual Interest Rate (%)",  defaultValue: 6.75,   min: 0.01, max: 30, step: 0.1 },
    { type: "number", key: "termYears",    label: "Remaining Term (years)",    defaultValue: 27,     min: 1,    max: 40, step: 1   },
    { type: "number", key: "extraMonthly", label: "Extra Monthly Payment ($)", defaultValue: 200,    min: 0,    step: 25  },
  ],
  compute(values: InputValues): ComputeResult {
    const P   = Number(values.balance);
    const r   = Number(values.annualRate) / 100 / 12;
    const n   = Number(values.termYears) * 12;
    const ext = Number(values.extraMonthly);
    if ([P, r, n, ext].some((v) => !Number.isFinite(v)) || P <= 0 || r <= 0 || n <= 0 || ext < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    // Standard monthly payment
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    // Simulate original
    let bal = P, origInterest = 0;
    for (let i = 0; i < n; i++) {
      const interest = bal * r;
      origInterest += interest;
      bal = bal - (M - interest);
      if (bal < 0) bal = 0;
    }
    // Simulate with extra payment
    bal = P;
    let extraInterest = 0;
    let extraMonths = 0;
    while (bal > 0.01 && extraMonths < n * 2) {
      const interest = bal * r;
      extraInterest += interest;
      const payment = Math.min(M + ext, bal + interest);
      bal = bal + interest - payment;
      extraMonths++;
      if (bal < 0.01) { bal = 0; break; }
    }
    const savedInterest  = origInterest - extraInterest;
    const savedMonths    = n - extraMonths;
    const savedYears     = Math.floor(savedMonths / 12);
    const savedRemMonths = savedMonths % 12;
    return {
      outputs: [
        { key: "savedInterest",  label: "Interest Saved ($)",       value: Math.round(savedInterest),  format: "currency", highlight: true },
        { key: "savedTime",      label: "Time Saved",               value: `${savedYears}y ${savedRemMonths}m`, format: "text" },
        { key: "newPayoffMos",   label: "New Payoff (months)",      value: extraMonths,                 format: "number" },
        { key: "basePayment",    label: "Regular Monthly Payment",  value: Math.round(M * 100) / 100,   format: "currency" },
        { key: "totalPayment",   label: "New Monthly Payment",      value: Math.round((M + ext) * 100) / 100, format: "currency" },
        { key: "origInterest",   label: "Original Total Interest",  value: Math.round(origInterest),    format: "currency" },
      ],
    };
  },
  howItWorks: "Standard payment uses the amortisation formula. Both scenarios are then simulated month by month to calculate exact interest paid. Savings = original total interest − accelerated total interest.",
  relatedSlugs: ["amortization-calculator", "loan-early-payoff-calculator", "debt-payoff-calculator"],
};
export default def;
