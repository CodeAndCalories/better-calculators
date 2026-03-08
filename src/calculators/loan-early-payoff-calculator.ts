import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-early-payoff-calculator",
  title: "Loan Early Payoff Calculator",
  shortTitle: "Early Payoff",
  description: "Calculate how much you save in interest by paying off a loan early with a lump sum.",
  category: "finance",
  keywords: ["loan early payoff calculator", "pay off loan early", "lump sum payoff", "loan interest savings"],
  inputs: [
    { type: "number", key: "balance",      label: "Current Loan Balance ($)",      defaultValue: 15000, min: 100,  step: 100  },
    { type: "number", key: "annualRate",   label: "Annual Interest Rate (%)",       defaultValue: 7.5,   min: 0.01, max: 40, step: 0.1 },
    { type: "number", key: "monthlyPmt",   label: "Current Monthly Payment ($)",    defaultValue: 350,   min: 1,    step: 10   },
    { type: "number", key: "lumpSum",      label: "Lump Sum Payment ($)",           defaultValue: 3000,  min: 0,    step: 100  },
  ],
  compute(values: InputValues): ComputeResult {
    const P   = Number(values.balance);
    const r   = Number(values.annualRate) / 100 / 12;
    const pmt = Number(values.monthlyPmt);
    const ls  = Number(values.lumpSum);
    if ([P, r, pmt, ls].some((v) => !Number.isFinite(v)) || P <= 0 || r <= 0 || pmt <= 0 || ls < 0) {
      return { outputs: [], error: "Please enter a valid number." };
    }
    if (pmt <= P * r) {
      return { outputs: [], error: "Monthly payment must be greater than the monthly interest charge." };
    }
    // Simulate original
    let bal = P, origMonths = 0, origInterest = 0;
    while (bal > 0.01 && origMonths < 1200) {
      const int = bal * r;
      origInterest += int;
      bal = bal + int - Math.min(pmt, bal + int);
      origMonths++;
    }
    // Simulate with lump sum
    bal = Math.max(0, P - ls);
    let newMonths = 0, newInterest = 0;
    while (bal > 0.01 && newMonths < 1200) {
      const int = bal * r;
      newInterest += int;
      bal = bal + int - Math.min(pmt, bal + int);
      newMonths++;
    }
    const savedMonths   = origMonths - newMonths;
    const savedInterest = origInterest - newInterest;
    return {
      outputs: [
        { key: "savedInterest",  label: "Interest Saved ($)",     value: Math.round(savedInterest),   format: "currency", highlight: true },
        { key: "savedMonths",    label: "Months Saved",           value: savedMonths,                  format: "number"   },
        { key: "newPayoffMos",   label: "New Payoff (months)",    value: newMonths,                    format: "number"   },
        { key: "origPayoffMos",  label: "Original Payoff (months)", value: origMonths,                 format: "number"   },
        { key: "balAfterLump",   label: "Balance After Lump Sum", value: Math.max(0, Math.round((P - ls) * 100) / 100), format: "currency" },
      ],
    };
  },
  howItWorks: "Both scenarios are simulated month by month. In the lump-sum scenario the initial balance is reduced by the lump sum before simulation begins. Savings = original total interest minus new total interest.",
  relatedSlugs: ["mortgage-extra-payment-calculator", "debt-payoff-calculator", "amortization-calculator"],

  longDescription: "A one-time lump sum payment directly reduces your loan principal, cutting future interest and shortening your payoff timeline. This calculator shows exactly how much interest you save and how many months sooner you will be debt-free.",
  examples: [
    { title: "USD 15,000 loan at 7.5%, USD 350/month payment, USD 3,000 lump sum", description: "Using a tax refund or bonus to pay down debt.", inputs: { balance: 15000, annualRate: 7.5, monthlyPmt: 350, lumpSum: 3000 }, result: "Saves several months of payments and reduces total interest." },
  ],
  faqs: [
    { question: "When is the best time to make a lump sum payment?", answer: "The earlier in the loan term you pay, the more interest you save — early payments prevent months or years of compounding interest on that principal." },
  ],
};

export default def;
