import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-total-interest-calculator",
  title: "Loan Total Interest Calculator",
  description: "Calculate the total interest you will pay over the life of a loan.",
  longDescription: "Find out the full cost of borrowing by seeing the total interest paid over your loan's entire term, alongside your monthly payment and total amount paid. Works for mortgages, personal loans, auto loans, and more.",
  category: "finance",
  keywords: ["total interest calculator", "loan interest cost", "total loan cost", "how much interest will I pay"],
  inputs: [
    { type: "number", key: "loanAmount", label: "Loan Amount ($)", defaultValue: 20000, min: 100, step: 100, prefix: "$" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 7.0, min: 0.1, max: 50, step: 0.1, suffix: "%" },
    { type: "number", key: "termYears", label: "Loan Term (years)", defaultValue: 5, min: 1, max: 40, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.loanAmount);
    const annualRate = Number(values.annualRate) / 100;
    const years = Math.round(Number(values.termYears));
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const r = annualRate / 12;
    const n = years * 12;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;
    const interestRatio = (totalInterest / P) * 100;
    return {
      outputs: [
        { key: "totalInterest", label: "Total Interest Paid", value: Number(totalInterest.toFixed(2)), format: "currency", highlight: true },
        { key: "totalPaid", label: "Total Amount Paid", value: Number(totalPaid.toFixed(2)), format: "currency" },
        { key: "monthly", label: "Monthly Payment", value: Number(monthly.toFixed(2)), format: "currency" },
        { key: "interestRatio", label: "Interest as % of Principal", value: Number(interestRatio.toFixed(1)), format: "percentage" },
      ],
    };
  },
  howItWorks: "Monthly payment is calculated using the standard amortisation formula. Total paid = monthly payment × number of months. Total interest = total paid − original principal.",
  examples: [
    {
      title: "$20k personal loan",
      description: "$20,000 at 7% over 5 years.",
      inputs: { loanAmount: 20000, annualRate: 7.0, termYears: 5 },
      result: "Monthly payment ~$396. Total interest ~$3,761.",
    },
    {
      title: "$300k mortgage",
      description: "$300,000 at 6.5% over 30 years.",
      inputs: { loanAmount: 300000, annualRate: 6.5, termYears: 30 },
      result: "Monthly ~$1,896. Total interest ~$382,633.",
    },
  ],
  faqs: [
    { question: "Why does a longer term mean more total interest?", answer: "Although monthly payments are lower, you are paying interest for more months. The extra time compounds significantly." },
    { question: "How can I reduce total interest?", answer: "Choose the shortest term you can afford, make extra principal payments, or refinance to a lower rate." },
  ],
  relatedSlugs: ["loan-balance-remaining-calculator", "mortgage-interest-only-calculator", "mortgage-payment-extra-principal-calculator"],
};

export default def;
