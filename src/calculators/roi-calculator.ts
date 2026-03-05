// roi-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "roi-calculator",
  title: "Return on Investment (ROI) Calculator",
  description: "Calculate the profitability of an investment by determining its ROI.",
  longDescription: "Return on Investment (ROI) is a widely used financial metric that measures the probability of gaining a return from an investment. It is a simple ratio that compares the net profit of an investment to its initial cost.",
  category: "finance",
  keywords:["roi calculator", "return on investment", "investment return", "profitability calculator", "net return"],
  inputs:[
    { type: "number", key: "initialInvestment", label: "Initial Investment ($)", defaultValue: 5000, min: 0 },
    { type: "number", key: "finalValue", label: "Final Value / Revenue ($)", defaultValue: 6500, min: 0 },
    { type: "number", key: "expenses", label: "Additional Costs / Fees ($)", defaultValue: 100, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const initialInvestment = Number(values.initialInvestment);
    const finalValue = Number(values.finalValue);
    const expenses = Number(values.expenses) || 0;

    if (isNaN(initialInvestment) || isNaN(finalValue)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }
    if (initialInvestment === 0) {
      return { outputs:[{ key: "error", label: "Result", value: "Initial investment cannot be zero.", format: "text" }] };
    }

    const totalCost = initialInvestment + expenses;
    const netReturn = finalValue - totalCost;
    const roi = (netReturn / totalCost) * 100;

    return {
      outputs:[
        { key: "roi", label: "Return on Investment (ROI)", value: Number(roi.toFixed(2)), format: "percentage" },
        { key: "netReturn", label: "Net Profit / Loss", value: Number(netReturn.toFixed(2)), format: "currency" },
        { key: "totalCost", label: "Total Cost Basis", value: Number(totalCost.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "The calculator adds any additional expenses to your initial investment to find your Total Cost Basis. It then subtracts this total cost from your Final Value to determine Net Profit. Finally, it divides the Net Profit by the Total Cost and multiplies by 100 to get the ROI percentage.",
  examples:[
    {
      title: "Stock Market Gain",
      description: "Investing $1,000 in stocks, selling for $1,200 with $10 in trading fees.",
      inputs: { initialInvestment: 1000, finalValue: 1200, expenses: 10 },
      result: "Yields a Net Profit of $190 and an ROI of 18.81%."
    },
    {
      title: "Real Estate Flip",
      description: "Buying a house for $200,000, spending $50,000 on renovations, and selling for $300,000.",
      inputs: { initialInvestment: 200000, finalValue: 300000, expenses: 50000 },
      result: "Yields a Net Profit of $50,000 and an ROI of 20.00%."
    },
    {
      title: "Business Marketing Campaign",
      description: "Spending $2,000 on ads that generated $5,000 in sales, plus $200 in agency fees.",
      inputs: { initialInvestment: 2000, finalValue: 5000, expenses: 200 },
      result: "Yields a Net Profit of $2,800 and an ROI of 127.27%."
    }
  ],
  faqs:[
    { question: "What is a good ROI?", answer: "A 'good' ROI depends on the industry, risk tolerance, and timeframe. Historically, the stock market averages about 7-10% annual ROI." },
    { question: "Can ROI be negative?", answer: "Yes. If your final value is less than your total costs, you have suffered a loss, resulting in a negative ROI." },
    { question: "Does ROI account for time?", answer: "Standard ROI does not factor in how long you held the investment. For time-adjusted returns, use the CAGR (Compound Annual Growth Rate) Calculator." },
    { question: "Why do I need to include additional expenses?", answer: "Fees, taxes, and maintenance costs reduce your actual take-home profit. Including them ensures your ROI reflects reality." }
  ],
  relatedSlugs: ["cagr-calculator", "net-income-calculator", "break-even-calculator"]
};

export default def;