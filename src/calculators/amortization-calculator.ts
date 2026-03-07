import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "amortization-calculator",
  title: "Amortization Calculator",
  shortTitle: "Amortization",
  description: "Calculate your monthly payment and full amortization breakdown — principal, interest, and balance over time.",
  longDescription:
    "Amortization is the process of paying off a loan through scheduled, equal payments over time. Each payment covers accrued interest first, with the remainder reducing the principal. This calculator shows your monthly payment, total interest, total paid, and key balance milestones at years 1, 5, 10, and halfway through the loan.",
  category: "finance",
  keywords: ["amortization calculator", "loan amortization", "mortgage amortization schedule", "principal interest breakdown", "loan payoff schedule"],
  inputs: [
    {
      type: "number",
      key: "loanAmount",
      label: "Loan Amount ($)",
      defaultValue: 300000,
      min: 1,
      step: 1000,
      placeholder: "300000",
    },
    {
      type: "number",
      key: "annualRate",
      label: "Annual Interest Rate (%)",
      defaultValue: 7,
      min: 0.01,
      max: 30,
      step: 0.1,
      placeholder: "7",
    },
    {
      type: "number",
      key: "termYears",
      label: "Loan Term (years)",
      defaultValue: 30,
      min: 1,
      max: 40,
      step: 1,
      placeholder: "30",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const principal = Number(values.loanAmount);
    const annualRate = Number(values.annualRate);
    const termYears = Number(values.termYears);

    if (
      !Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(termYears) ||
      principal <= 0 || annualRate <= 0 || termYears <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const r = annualRate / 100 / 12;
    const n = termYears * 12;

    const monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - principal;

    // Simulate to find balance at key milestones
    let balance = principal;
    let interestAfterYear1 = 0;
    let principalAfterYear1 = 0;
    let balanceYear1 = 0;
    let balanceYear5 = 0;
    let balanceYear10 = 0;
    let balanceMidpoint = 0;
    const midpoint = Math.round(n / 2);

    for (let i = 1; i <= n; i++) {
      const interestThisMonth = balance * r;
      const principalThisMonth = monthlyPayment - interestThisMonth;
      balance -= principalThisMonth;

      if (i <= 12) {
        interestAfterYear1 += interestThisMonth;
        principalAfterYear1 += principalThisMonth;
      }
      if (i === 12) balanceYear1 = Math.max(0, balance);
      if (i === 60) balanceYear5 = Math.max(0, balance);
      if (i === 120) balanceYear10 = Math.max(0, balance);
      if (i === midpoint) balanceMidpoint = Math.max(0, balance);
    }

    return {
      outputs: [
        { key: "monthlyPayment", label: "Monthly Payment", value: Math.round(monthlyPayment * 100) / 100, format: "currency", highlight: true },
        { key: "totalInterest", label: "Total Interest Paid", value: Math.round(totalInterest), format: "currency" },
        { key: "totalPaid", label: "Total Amount Paid", value: Math.round(totalPaid), format: "currency" },
        { key: "interestYear1", label: "Interest Paid in Year 1", value: Math.round(interestAfterYear1), format: "currency" },
        { key: "balanceYear1", label: "Balance After Year 1", value: Math.round(balanceYear1), format: "currency" },
        ...(termYears >= 5 ? [{ key: "balanceYear5", label: "Balance After Year 5", value: Math.round(balanceYear5), format: "currency" as const }] : []),
        ...(termYears >= 10 ? [{ key: "balanceYear10", label: "Balance After Year 10", value: Math.round(balanceYear10), format: "currency" as const }] : []),
        { key: "balanceMidpoint", label: `Balance at Midpoint (Year ${Math.round(termYears / 2)})`, value: Math.round(balanceMidpoint), format: "currency" },
      ],
    };
  },

  howItWorks: `Monthly payment: M = P × r(1+r)^n / ((1+r)^n − 1), where P = principal, r = monthly rate (annual ÷ 12), n = total months. Each month: interest = balance × r, principal = M − interest, new balance = balance − principal. Balance milestones are calculated by simulating each payment in sequence.`,

  examples: [
    {
      title: "$300,000 at 7% for 30 years",
      description: "A typical 30-year fixed mortgage.",
      inputs: { loanAmount: 300000, annualRate: 7, termYears: 30 },
      result: "~$1,996/month. ~$418,000 total interest. Balance after 5 years: ~$279,000.",
    },
    {
      title: "$200,000 at 5.5% for 15 years",
      description: "A 15-year mortgage — higher payment, much less interest.",
      inputs: { loanAmount: 200000, annualRate: 5.5, termYears: 15 },
      result: "~$1,634/month. ~$94,000 total interest.",
    },
  ],

  faqs: [
    {
      question: "Why do I pay so much interest at the start?",
      answer: "Early payments go mostly to interest because the balance is highest. As principal decreases, each month's interest charge shrinks and more of your payment reduces the balance. This is why extra early payments are so powerful.",
    },
    {
      question: "What happens if I make extra payments?",
      answer: "Extra principal payments reduce the balance faster, which cuts future interest charges and shortens the loan term. Even one extra payment per year significantly reduces total interest on a 30-year mortgage.",
    },
  ],

  relatedSlugs: ["loan-interest-calculator", "interest-only-loan-calculator", "debt-payoff-calculator", "car-loan-calculator"],
};

export default def;
