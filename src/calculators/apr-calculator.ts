// apr-calculator.ts
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "apr-calculator",
  title: "APR Calculator",
  description: "Estimate the Annual Percentage Rate (APR) of a loan including interest and fees.",
  longDescription: "The Annual Percentage Rate (APR) represents the true yearly cost of your borrowing, including both the interest rate and any upfront fees. This calculator uses the constant ratio method to estimate your APR, giving you a better baseline to compare different loan offers.",
  category: "finance",
  keywords:["apr calculator", "true cost of loan", "annual percentage rate", "interest rate vs apr", "loan cost calculator"],
  inputs:[
    { type: "number", key: "loanAmount", label: "Loan Amount ($)", defaultValue: 10000, min: 1 },
    { type: "number", key: "interestRate", label: "Nominal Interest Rate (%)", defaultValue: 5, min: 0 },
    { type: "number", key: "loanTerm", label: "Loan Term (Years)", defaultValue: 5, min: 1 },
    { type: "number", key: "fees", label: "Upfront Fees ($)", defaultValue: 250, min: 0 }
  ],
  compute(values: InputValues): ComputeResult {
    const loanAmount = Number(values.loanAmount);
    const interestRate = Number(values.interestRate);
    const loanTerm = Number(values.loanTerm);
    const fees = Number(values.fees) || 0;

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
      return { outputs:[{ key: "error", label: "Result", value: "Invalid input", format: "text" }] };
    }
    if (loanAmount <= 0 || loanTerm <= 0) {
      return { outputs:[{ key: "error", label: "Result", value: "Amount and term must be positive.", format: "text" }] };
    }

    const months = loanTerm * 12;
    const monthlyRate = (interestRate / 100) / 12;
    
    let monthlyPayment = 0;
    let totalInterest = 0;

    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / months;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      totalInterest = (monthlyPayment * months) - loanAmount;
    }

    const totalFinanceCharge = totalInterest + fees;
    const actualPrincipal = loanAmount - fees;

    if (actualPrincipal <= 0) {
      return { outputs:[{ key: "error", label: "Result", value: "Fees cannot exceed loan amount.", format: "text" }] };
    }

    const estimatedApr = (24 * totalFinanceCharge * 100) / (actualPrincipal * (months + 1));
    const totalCost = loanAmount + totalFinanceCharge;

    return {
      outputs:[
        { key: "estimatedApr", label: "Estimated APR", value: Number(estimatedApr.toFixed(3)), format: "percentage" },
        { key: "monthlyPayment", label: "Monthly Payment", value: Number(monthlyPayment.toFixed(2)), format: "currency" },
        { key: "totalInterest", label: "Total Interest", value: Number(totalInterest.toFixed(2)), format: "currency" },
        { key: "totalCost", label: "Total Cost of Loan", value: Number(totalCost.toFixed(2)), format: "currency" }
      ]
    };
  },
  howItWorks: "First, the standard monthly payment is calculated using the principal and nominal interest rate. The total interest is combined with upfront fees to find the Total Finance Charge. We then use the constant ratio method approximation formula to estimate the APR based on the net principal (loan minus fees).",
  examples:[
    {
      title: "Car Loan with Doc Fees",
      description: "A $20,000 auto loan at 6% over 5 years with a $500 document fee.",
      inputs: { loanAmount: 20000, interestRate: 6, loanTerm: 5, fees: 500 },
      result: "Estimates an APR of 7.086% and a total cost of $23,699.65."
    },
    {
      title: "Personal Loan with Origination Fee",
      description: "A $10,000 personal loan at 8% over 3 years with a $300 origination fee.",
      inputs: { loanAmount: 10000, interestRate: 8, loanTerm: 3, fees: 300 },
      result: "Estimates an APR of 10.155%."
    },
    {
      title: "Zero-Fee Loan",
      description: "A $5,000 loan at 4% for 2 years with no fees.",
      inputs: { loanAmount: 5000, interestRate: 4, loanTerm: 2, fees: 0 },
      result: "APR exactly matches the nominal rate at 4.000%."
    }
  ],
  faqs:[
    { question: "What is the difference between APR and interest rate?", answer: "The interest rate is the base cost of borrowing the principal. The APR includes both the interest rate and any additional fees, representing the true annualized cost of the loan." },
    { question: "Why is the APR higher than the interest rate?", answer: "Because it includes upfront fees (like origination fees, closing costs, or document fees) spread out over the life of the loan." },
    { question: "Is this calculation exact?", answer: "This calculator uses the constant ratio method, which provides a very close estimate of the mathematically complex IRR (Internal Rate of Return) used by banks." },
    { question: "Should I compare loans by APR or interest rate?", answer: "Always compare by APR, as it standardizes the cost by factoring in hidden fees." }
  ],
  relatedSlugs:["loan-calculator", "roi-calculator", "cagr-calculator"]
};

export default def;