import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mortgage-interest-only-calculator",
  title: "Interest-Only Mortgage Calculator",
  description: "Calculate the monthly interest-only payment on a mortgage loan.",
  longDescription: "An interest-only mortgage requires you to pay only the interest on the loan each month — the principal balance does not reduce. This calculator shows your monthly interest payment, total interest paid over the interest-only period, and compares it to a standard P&I payment.",
  category: "finance",
  keywords: ["interest only mortgage", "interest only payment", "mortgage interest calculator", "IO mortgage"],
  inputs: [
    { type: "number", key: "loanAmount", label: "Loan Amount ($)", defaultValue: 300000, min: 1000, step: 1000, prefix: "$" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 6.5, min: 0.1, max: 30, step: 0.1, suffix: "%" },
    { type: "number", key: "ioPeriodYears", label: "Interest-Only Period (years)", defaultValue: 10, min: 1, max: 30, step: 1 },
    { type: "number", key: "totalTermYears", label: "Total Loan Term (years)", defaultValue: 30, min: 5, max: 40, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.loanAmount);
    const annualRate = Number(values.annualRate) / 100;
    const ioPeriod = Math.round(Number(values.ioPeriodYears));
    const totalTerm = Math.round(Number(values.totalTermYears));
    if (isNaN(P) || isNaN(annualRate) || P <= 0 || annualRate <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    if (ioPeriod >= totalTerm) {
      return { outputs: [], error: "Interest-only period must be shorter than the total loan term." };
    }
    const monthlyRate = annualRate / 12;
    const ioMonthly = P * monthlyRate;
    const totalIoPaid = ioMonthly * ioPeriod * 12;

    // P&I payment for remaining term after IO period
    const remainingMonths = (totalTerm - ioPeriod) * 12;
    const piMonthly = (P * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1);

    // Standard P&I for full term comparison
    const fullTermMonths = totalTerm * 12;
    const standardMonthly = (P * monthlyRate * Math.pow(1 + monthlyRate, fullTermMonths)) / (Math.pow(1 + monthlyRate, fullTermMonths) - 1);

    return {
      outputs: [
        { key: "ioMonthly", label: "Monthly Interest-Only Payment", value: Number(ioMonthly.toFixed(2)), format: "currency", highlight: true },
        { key: "piAfterIO", label: "P&I Payment After IO Period", value: Number(piMonthly.toFixed(2)), format: "currency" },
        { key: "standardPI", label: "Standard P&I (full term comparison)", value: Number(standardMonthly.toFixed(2)), format: "currency" },
        { key: "totalIo", label: "Total Interest Paid (IO period)", value: Number(totalIoPaid.toFixed(2)), format: "currency" },
      ],
    };
  },
  howItWorks: "Monthly interest = loan balance × (annual rate ÷ 12). The principal never reduces during the IO period. After the IO period, the full balance is amortised over the remaining term.",
  examples: [
    {
      title: "$300k at 6.5%, 10-year IO",
      description: "Standard 30-year mortgage with 10-year interest-only period.",
      inputs: { loanAmount: 300000, annualRate: 6.5, ioPeriodYears: 10, totalTermYears: 30 },
      result: "IO payment: $1,625/mo. P&I after IO: ~$2,108/mo.",
    },
  ],
  faqs: [
    { question: "Is an interest-only mortgage risky?", answer: "It can be. You build no equity during the IO period, and your payments jump significantly when amortisation begins." },
    { question: "Who benefits from interest-only mortgages?", answer: "They can suit investors who expect property appreciation or those with variable income who want lower short-term payments." },
  ],
  relatedSlugs: ["loan-total-interest-calculator", "loan-balance-remaining-calculator", "mortgage-payment-extra-principal-calculator"],
};

export default def;
