// credit-utilization-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "credit-utilization-calculator",
  title: "Credit Utilization Calculator",
  description: "Calculate the percentage of available credit you are currently using.",
  longDescription: "Credit utilization is one of the most important factors in determining your credit score. It represents the ratio of your current credit card balances to your total credit limits. This calculator helps you see where you stand so you can optimize your score.",
  category: "finance",
  keywords:["credit utilization", "credit score calculator", "credit ratio", "debt to limit ratio", "credit card balance"],
  inputs:[
    { type: "number", key: "totalBalance", label: "Total Balances ($)", defaultValue: 1500, min: 0 },
    { type: "number", key: "totalCreditLimit", label: "Total Credit Limits ($)", defaultValue: 10000, min: 1 }
  ],
  compute(values: InputValues): ComputeResult {
    const totalBalance = Number(values.totalBalance);
    const totalCreditLimit = Number(values.totalCreditLimit);

    if (isNaN(totalBalance) || isNaN(totalCreditLimit)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }
    if (totalCreditLimit <= 0) {
      return { outputs:[{ key: "error", label: "Result", value: "Credit limit must be greater than zero.", format: "text" }] };
    }

    const utilization = (totalBalance / totalCreditLimit) * 100;
    const availableCredit = totalCreditLimit - totalBalance;

    return {
      outputs:[
        { key: "utilization", label: "Credit Utilization Ratio", value: Number(utilization.toFixed(2)), format: "percentage" },
        { key: "availableCredit", label: "Available Credit Remaining", value: Number(availableCredit.toFixed(2)), format: "currency" },
        { key: "totalBalance", label: "Total Debt Balance", value: Number(totalBalance.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator divides your total current balances by your total available credit limits, and multiplies by 100 to provide a clean percentage metric.",
  examples:[
    {
      title: "Excellent Utilization",
      description: "A cardholder has $500 in statement balances across all cards with a total limit of $10,000.",
      inputs: { totalBalance: 500, totalCreditLimit: 10000 },
      result: "Shows a utilization ratio of 5%, which is excellent for building a credit score."
    },
    {
      title: "Borderline Utilization",
      description: "Carrying a balance of $3,500 on a card with a $10,000 limit.",
      inputs: { totalBalance: 3500, totalCreditLimit: 10000 },
      result: "Shows a utilization ratio of 35%, slightly above the recommended threshold."
    },
    {
      title: "Maxed Out",
      description: "Balances total $4,800 against a $5,000 combined limit.",
      inputs: { totalBalance: 4800, totalCreditLimit: 5000 },
      result: "Calculates a 96% utilization ratio, which will severely drop a credit score."
    }
  ],
  faqs:[
    { question: "What is a good credit utilization ratio?", answer: "Financial experts highly recommend keeping your utilization below 30%. For the absolute best credit scores, try to keep it under 10%." },
    { question: "How much does utilization impact my credit score?", answer: "In standard FICO scoring models, 'amounts owed' (which heavily relies on utilization) accounts for 30% of your total credit score." },
    { question: "Does utilization apply per card or total?", answer: "Both. Credit bureaus look at your 'per-card' utilization as well as your total aggregate utilization across all revolving accounts." },
    { question: "How fast does my score recover if I pay it off?", answer: "Very fast. Utilization has no memory. Once your credit card company reports your newly paid-down balance (usually once a month), your score will immediately rebound." }
  ],
  relatedSlugs: ["apr-calculator", "loan-calculator"]
};

export default def;