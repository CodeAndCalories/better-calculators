import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "down-payment-calculator",
  title: "Down Payment Calculator",
  shortTitle: "Down Payment",
  description: "Calculate the down payment amount, loan amount needed, and LTV ratio for any purchase price.",
  longDescription:
    "Enter a purchase price and down payment percentage to instantly see the dollar amount needed as a down payment, the resulting loan amount, and your Loan-to-Value (LTV) ratio. Works for cars, homes, or any financed purchase.",
  category: "finance",
  keywords: ["down payment calculator", "down payment amount", "loan to value calculator", "LTV calculator", "mortgage down payment"],
  inputs: [
    {
      type: "number",
      key: "purchasePrice",
      label: "Purchase Price ($)",
      defaultValue: 300000,
      min: 1,
      step: 1000,
      placeholder: "300000",
    },
    {
      type: "number",
      key: "downPaymentPct",
      label: "Down Payment (%)",
      defaultValue: 20,
      min: 0.1,
      max: 99,
      step: 0.5,
      placeholder: "20",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const price = Number(values.purchasePrice);
    const pct = Number(values.downPaymentPct);

    if (!Number.isFinite(price) || !Number.isFinite(pct) || price <= 0 || pct <= 0 || pct >= 100) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const downPaymentAmount = price * (pct / 100);
    const loanAmount = price - downPaymentAmount;
    const ltv = (loanAmount / price) * 100;

    return {
      outputs: [
        { key: "downPaymentAmount", label: "Down Payment Amount", value: Math.round(downPaymentAmount * 100) / 100, format: "currency", highlight: true },
        { key: "loanAmount", label: "Loan Amount Needed", value: Math.round(loanAmount * 100) / 100, format: "currency" },
        { key: "ltv", label: "Loan-to-Value Ratio (%)", value: Math.round(ltv * 100) / 100, format: "number" },
      ],
    };
  },

  howItWorks: `Down payment = purchase price × (percentage ÷ 100). Loan amount = purchase price − down payment. LTV ratio = (loan amount ÷ purchase price) × 100. An LTV below 80% typically avoids Private Mortgage Insurance (PMI) on home loans.`,

  examples: [
    {
      title: "$300,000 home with 20% down",
      description: "The standard down payment that avoids PMI.",
      inputs: { purchasePrice: 300000, downPaymentPct: 20 },
      result: "$60,000 down, $240,000 loan, 80% LTV.",
    },
    {
      title: "$25,000 car with 10% down",
      description: "A typical car purchase down payment.",
      inputs: { purchasePrice: 25000, downPaymentPct: 10 },
      result: "$2,500 down, $22,500 loan, 90% LTV.",
    },
  ],

  faqs: [
    {
      question: "What is LTV ratio?",
      answer: "Loan-to-Value (LTV) is the loan amount as a percentage of the purchase price. Lenders use it to assess risk. For mortgages, an LTV above 80% usually triggers PMI (Private Mortgage Insurance).",
    },
    {
      question: "How much should I put down on a house?",
      answer: "20% is the conventional target to avoid PMI, but many programs accept 3–10% down. A larger down payment reduces monthly payments and total interest significantly.",
    },
  ],

  relatedSlugs: ["car-loan-calculator", "loan-interest-calculator", "savings-goal-calculator"],
};

export default def;
