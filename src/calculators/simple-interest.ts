import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "simple-interest-calculator",
  title: "Simple Interest Calculator",
  shortTitle: "Simple Interest",
  description: "Calculate simple interest, total repayment, and interest rate for any loan or savings account.",
  longDescription: "Simple interest is straightforward — interest is calculated only on the principal, not on accumulated interest. This calculator finds the interest amount, total amount, and can work with different time units.",
  category: "finance",
  keywords: ["simple interest calculator", "interest calculator", "loan interest calculator"],
  inputs: [
    { type: "number", key: "principal", label: "Principal Amount", prefix: "$", defaultValue: 5000, min: 1, step: 100, placeholder: "5000" },
    { type: "number", key: "rate", label: "Annual Interest Rate", suffix: "%", defaultValue: 5, min: 0.01, max: 100, step: 0.1, placeholder: "5" },
    { type: "number", key: "time", label: "Time", defaultValue: 3, min: 0.01, step: 0.5, placeholder: "3" },
    { type: "select", key: "timeUnit", label: "Time Unit", defaultValue: "years", options: [
      { label: "Years", value: "years" },
      { label: "Months", value: "months" },
      { label: "Days", value: "days" },
    ]},
  ],
  compute(values: InputValues): ComputeResult {
    const P = Number(values.principal);
    const r = Number(values.rate) / 100;
    const timeRaw = Number(values.time);
    const unit = values.timeUnit as string;

    let t: number;
    if (unit === "months") t = timeRaw / 12;
    else if (unit === "days") t = timeRaw / 365;
    else t = timeRaw;

    const interest = P * r * t;
    const total = P + interest;
    const effectiveRate = (interest / P) * 100;

    return {
      outputs: [
        { key: "interest", label: "Interest Earned", value: interest, format: "currency", highlight: true },
        { key: "total", label: "Total Amount", value: total, format: "currency" },
        { key: "effectiveRate", label: "Effective Rate for Period", value: effectiveRate, format: "percentage" },
      ],
    };
  },
  howItWorks: `Simple interest is calculated with the formula I = P × R × T, where I is the interest, P is the principal, R is the annual interest rate (as a decimal), and T is the time in years. Total amount = P + I. Unlike compound interest, the interest is always based on the original principal only.`,
  examples: [
    {
      title: "$5,000 at 5% for 3 Years",
      description: "A simple savings scenario.",
      inputs: { principal: 5000, rate: 5, time: 3, timeUnit: "years" },
      result: "$750 interest, $5,750 total.",
    },
    {
      title: "$1,000 at 8% for 180 Days",
      description: "A short-term loan or deposit.",
      inputs: { principal: 1000, rate: 8, time: 180, timeUnit: "days" },
      result: "$39.45 interest, $1,039.45 total.",
    },
  ],
  faqs: [
    { question: "When is simple interest used?", answer: "Simple interest is common for short-term loans, car loans, certain savings accounts, and certificates of deposit. Most mortgages and savings accounts use compound interest instead." },
    { question: "Is simple or compound interest better for borrowers?", answer: "Simple interest is generally better for borrowers because the interest doesn't accumulate on itself. For savers, compound interest is better as it earns more over time." },
  ],
  relatedSlugs: ["compound-interest-calculator", "loan-payment-calculator", "mortgage-calculator"],
};

export default def;
