import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "compound-interest-calculator",
  title: "Compound Interest Calculator",
  shortTitle: "Compound Interest",
  description: "See how your savings grow over time with the power of compounding interest.",
  longDescription: "Compound interest is the most powerful force in personal finance. Our calculator shows exactly how much your investment grows when interest earns interest, factoring in contribution frequency, compounding periods, and time horizon.",
  category: "finance",
  keywords: ["compound interest calculator", "investment growth calculator", "savings calculator", "interest calculator"],
  inputs: [
    { type: "number", key: "principal", label: "Initial Investment", prefix: "$", defaultValue: 10000, min: 0, step: 500, placeholder: "10000" },
    { type: "number", key: "monthlyContribution", label: "Monthly Contribution", prefix: "$", defaultValue: 500, min: 0, step: 50, placeholder: "500" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate", suffix: "%", defaultValue: 7, min: 0.01, max: 100, step: 0.1, placeholder: "7" },
    { type: "select", key: "compoundFreq", label: "Compounding Frequency", defaultValue: "12", options: [
      { label: "Daily (365x/year)", value: "365" },
      { label: "Monthly (12x/year)", value: "12" },
      { label: "Quarterly (4x/year)", value: "4" },
      { label: "Annually (1x/year)", value: "1" },
    ]},
    { type: "select", key: "years", label: "Time Period", defaultValue: "20", options: [
      { label: "5 years", value: "5" },
      { label: "10 years", value: "10" },
      { label: "15 years", value: "15" },
      { label: "20 years", value: "20" },
      { label: "25 years", value: "25" },
      { label: "30 years", value: "30" },
      { label: "40 years", value: "40" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.principal);
    const pmt = Number(values.monthlyContribution);
    const r = Number(values.annualRate) / 100;
    const n = Number(values.compoundFreq);
    const t = Number(values.years);

    // Compound interest with regular contributions
    const futureValuePrincipal = P * Math.pow(1 + r / n, n * t);

    // Future value of series (monthly contributions compounded)
    const monthlyRate = r / 12;
    const numMonths = t * 12;
    let futureValueContributions = 0;
    if (monthlyRate === 0) {
      futureValueContributions = pmt * numMonths;
    } else {
      futureValueContributions = pmt * ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate);
    }

    const totalValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = P + pmt * numMonths;
    const totalInterestEarned = totalValue - totalContributions;

    return {
      outputs: [
        { key: "finalBalance", label: "Final Balance", value: totalValue, format: "currency", highlight: true },
        { key: "totalContributions", label: "Total Contributions", value: totalContributions, format: "currency" },
        { key: "totalInterest", label: "Interest Earned", value: totalInterestEarned, format: "currency" },
        { key: "growthMultiple", label: "Growth Multiple", value: totalValue / Math.max(totalContributions, 1), format: "number" },
      ],
    };
  },
  howItWorks: `The future value of a lump sum with compounding is: FV = P(1 + r/n)^(nt). For regular contributions, we use the future value of annuity formula separately and add the two together. P is principal, r is the annual rate, n is the compounding frequency per year, and t is the number of years.`,
  examples: [
    {
      title: "$10,000 with $500/month for 20 years at 7%",
      description: "A classic long-term investment scenario showing the power of compounding.",
      inputs: { principal: 10000, monthlyContribution: 500, annualRate: 7, compoundFreq: "12", years: "20" },
      result: "Final balance of ~$271,000 on just $130,000 in contributions.",
    },
    {
      title: "$50,000 lump sum, no contributions, 30 years at 8%",
      description: "The power of a single investment left to grow.",
      inputs: { principal: 50000, monthlyContribution: 0, annualRate: 8, compoundFreq: "12", years: "30" },
      result: "Grows to ~$503,000 — over 10x the original investment.",
    },
  ],
  faqs: [
    { question: "How often should interest compound?", answer: "More frequent compounding means slightly more growth. Daily compounding yields a bit more than monthly, which yields more than annually. The difference is small at low rates but can matter over decades." },
    { question: "What is the Rule of 72?", answer: "Divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 7%, your money doubles roughly every 10 years (72 ÷ 7 ≈ 10.3)." },
    { question: "How is compound interest different from simple interest?", answer: "Simple interest only applies to the principal. Compound interest applies to both principal and accumulated interest, causing exponential growth over time." },
  ],
  relatedSlugs: ["simple-interest-calculator", "loan-payment-calculator", "mortgage-calculator"],
};

export default def;
