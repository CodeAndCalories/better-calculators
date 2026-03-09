import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "savings-interest-calculator",
  title: "Savings Interest Calculator",
  description: "Calculate the interest earned on your savings over time with compound interest.",
  longDescription: "Enter your initial deposit, monthly contribution, annual interest rate, and time period to see how your savings grow with compound interest. Perfect for planning emergency funds, vacation savings, and general wealth building.",
  category: "finance",
  keywords: ["savings interest calculator", "compound savings", "how much will my savings earn", "interest on savings"],
  inputs: [
    { type: "number", key: "principal", label: "Initial Deposit ($)", defaultValue: 5000, min: 0, step: 100, prefix: "$" },
    { type: "number", key: "monthly", label: "Monthly Contribution ($)", defaultValue: 200, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "annualRate", label: "Annual Interest Rate (%)", defaultValue: 4.5, min: 0.01, max: 30, step: 0.1, suffix: "%" },
    { type: "number", key: "years", label: "Time Period (years)", defaultValue: 10, min: 1, max: 50, step: 1 },
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.principal);
    const monthly = Number(values.monthly);
    const annualRate = Number(values.annualRate) / 100;
    const years = Math.round(Number(values.years));
    if (isNaN(P) || isNaN(monthly) || isNaN(annualRate) || isNaN(years) || annualRate <= 0 || years <= 0) {
      return { outputs: [], error: "Please enter valid positive values." };
    }
    const r = annualRate / 12;
    const n = years * 12;
    const futureValuePrincipal = P * Math.pow(1 + r, n);
    const futureValueContributions = monthly * ((Math.pow(1 + r, n) - 1) / r);
    const totalFutureValue = futureValuePrincipal + futureValueContributions;
    const totalContributed = P + monthly * n;
    const totalInterest = totalFutureValue - totalContributed;
    return {
      outputs: [
        { key: "total", label: "Total Savings Balance", value: Number(totalFutureValue.toFixed(2)), format: "currency", highlight: true },
        { key: "interestEarned", label: "Total Interest Earned", value: Number(totalInterest.toFixed(2)), format: "currency" },
        { key: "totalContributed", label: "Total Contributed", value: Number(totalContributed.toFixed(2)), format: "currency" },
        { key: "interestRatio", label: "Interest as % of Final Balance", value: Number(((totalInterest / totalFutureValue) * 100).toFixed(1)), format: "percentage" },
      ],
    };
  },
  howItWorks: "Compound growth is applied to the initial deposit and each monthly contribution separately. The future value of contributions uses the annuity future value formula.",
  examples: [
    {
      title: "Emergency fund growth",
      description: "$5,000 initial, $200/month, 4.5%, 10 years.",
      inputs: { principal: 5000, monthly: 200, annualRate: 4.5, years: 10 },
      result: "Balance grows to ~$36,800 on ~$29,000 contributed — earning ~$7,800 in interest.",
    },
  ],
  faqs: [
    { question: "What is compound interest?", answer: "Interest earned on both the original deposit and previously earned interest. Over time this creates exponential growth." },
    { question: "How does APY differ from APR?", answer: "APY (Annual Percentage Yield) accounts for compounding. APR does not. Use APY for the most accurate savings growth estimate." },
  ],
  relatedSlugs: ["investment-doubling-time-calculator", "monthly-budget-calculator", "net-worth-calculator"],
};

export default def;
