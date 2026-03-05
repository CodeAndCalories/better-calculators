// filename: compound-growth-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "compound-growth-calculator",
  title: "Compound Growth Calculator",
  description: "Calculate how your money will grow over time with compound interest.",
  longDescription: "Compound interest is the concept of earning interest on your interest. Over long periods, this creates a snowball effect that exponentially grows your initial investment. Enter your starting balance, expected rate, and compounding frequency to visualize your future wealth.",
  category: "finance",
  keywords:["compound interest", "compound growth", "investment calculator", "future value"],
  inputs:[
    { type: "number", key: "initialAmount", label: "Initial Principal Amount ($)", defaultValue: 1000, min: 0 },
    { type: "number", key: "ratePercent", label: "Annual Interest Rate (%)", defaultValue: 8, min: 0 },
    { type: "number", key: "timesPerYear", label: "Compounds Per Year", defaultValue: 12, min: 1 },
    { type: "number", key: "years", label: "Duration (Years)", defaultValue: 10, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const initialAmount = Number(values.initialAmount);
    const ratePercent = Number(values.ratePercent);
    const timesPerYear = Number(values.timesPerYear);
    const years = Number(values.years);

    if (isNaN(initialAmount) || isNaN(ratePercent) || isNaN(timesPerYear) || isNaN(years)) {
      return { outputs:[], error: "Please enter valid numeric values." };
    }
    if (timesPerYear < 1) {
      return { outputs:[], error: "Compounds per year must be at least 1." };
    }

    const r = ratePercent / 100;
    const finalAmount = initialAmount * Math.pow(1 + (r / timesPerYear), timesPerYear * years);
    const totalGrowth = finalAmount - initialAmount;
    
    let growthPercent = 0;
    if (initialAmount > 0) {
      growthPercent = (totalGrowth / initialAmount) * 100;
    }

    return {
      outputs:[
        { key: "finalAmount", label: "Final Amount", value: Number(finalAmount.toFixed(2)), format: "currency", highlight: true },
        { key: "totalGrowth", label: "Total Growth (Interest Earned)", value: Number(totalGrowth.toFixed(2)), format: "currency" },
        { key: "growthPercent", label: "Overall ROI", value: Number(growthPercent.toFixed(2)), format: "percentage" }
      ]
    };
  },
  howItWorks: "The calculator uses the standard compound interest formula: A = P(1 + r/n)^(nt). It divides your annual rate by the compounding frequency, adds 1, raises it to the power of the total number of compounding periods, and multiplies by your starting principal.",
  examples:[
    {
      title: "Stock Market Average",
      description: "Investing $1,000 at an 8% annual return, compounded annually over 10 years.",
      inputs: { initialAmount: 1000, ratePercent: 8, timesPerYear: 1, years: 10 },
      result: "The final amount is $2,158.92, more than doubling the initial investment."
    },
    {
      title: "High-Yield Savings",
      description: "Leaving $5,000 in a savings account with 4.5% interest, compounded monthly for 5 years.",
      inputs: { initialAmount: 5000, ratePercent: 4.5, timesPerYear: 12, years: 5 },
      result: "The final amount is $6,258.98, earning $1,258.98 in passive growth."
    },
    {
      title: "Long-Term Hold",
      description: "A $10,000 investment at 10% compounded quarterly for 30 years.",
      inputs: { initialAmount: 10000, ratePercent: 10, timesPerYear: 4, years: 30 },
      result: "The snowball effect pushes the final amount to an incredible $193,581.49."
    }
  ],
  faqs:[
    { question: "What does 'Compounds Per Year' mean?", answer: "This is how often the interest is calculated and added back to your principal. Monthly compounding is 12, quarterly is 4, and annual is 1." },
    { question: "Is it better to compound more frequently?", answer: "Yes. Compounding daily will result in slightly more money than compounding annually, because your newly earned interest starts earning its own interest much faster." },
    { question: "Does this account for monthly contributions?", answer: "No, this specific calculator assumes a single lump-sum initial investment with no additional deposits over the duration." },
    { question: "What is ROI?", answer: "ROI stands for Return on Investment. Here, it shows what percentage your money grew compared to the initial amount you put in." }
  ],
  relatedSlugs: ["roi-calculator", "cagr-calculator"]
};

export default def;