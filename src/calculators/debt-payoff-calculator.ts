import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "debt-payoff-calculator",
  title: "Debt Payoff Calculator",
  shortTitle: "Debt Payoff",
  description: "Find out how long it will take to pay off a debt and how much interest you'll pay in total.",
  longDescription:
    "Enter your current balance, annual interest rate, and fixed monthly payment. The calculator tells you exactly how many months until the debt is cleared and the total interest cost — making it easy to see how increasing your payment cuts both time and interest.",
  category: "finance",
  keywords: ["debt payoff calculator", "loan payoff calculator", "credit card payoff", "how long to pay off debt", "debt interest calculator"],
  inputs: [
    {
      type: "number",
      key: "balance",
      label: "Current Balance ($)",
      defaultValue: 5000,
      min: 1,
      step: 100,
      placeholder: "5000",
    },
    {
      type: "number",
      key: "interestRate",
      label: "Annual Interest Rate (%)",
      defaultValue: 20,
      min: 0.01,
      max: 100,
      step: 0.1,
      placeholder: "20",
      helpText: "Credit cards are typically 18–25%",
    },
    {
      type: "number",
      key: "monthlyPayment",
      label: "Monthly Payment ($)",
      defaultValue: 200,
      min: 1,
      step: 10,
      placeholder: "200",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const balance = Number(values.balance);
    const annualRate = Number(values.interestRate);
    const monthlyPayment = Number(values.monthlyPayment);

    if (
      !Number.isFinite(balance) || !Number.isFinite(annualRate) ||
      !Number.isFinite(monthlyPayment) ||
      balance <= 0 || annualRate <= 0 || monthlyPayment <= 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const monthlyRate = annualRate / 100 / 12;
    const minPayment = balance * monthlyRate;

    // Payment must exceed monthly interest or debt never clears
    if (monthlyPayment <= minPayment) {
      return {
        outputs: [],
        error: `Your monthly payment must be greater than $${minPayment.toFixed(2)} to cover interest and reduce the balance.`,
      };
    }

    // n = -ln(1 - (r × P / PMT)) / ln(1 + r)
    const monthsToPayoff = Math.ceil(
      -Math.log(1 - (monthlyRate * balance) / monthlyPayment) / Math.log(1 + monthlyRate)
    );

    // Simulate to get exact total interest (handles final partial payment)
    let remaining = balance;
    let totalInterestPaid = 0;
    for (let i = 0; i < monthsToPayoff; i++) {
      const interestThisMonth = remaining * monthlyRate;
      totalInterestPaid += interestThisMonth;
      remaining = remaining + interestThisMonth - monthlyPayment;
      if (remaining < 0) {
        // Overpaid on final month — subtract excess interest
        totalInterestPaid += remaining; // remaining is negative here
        break;
      }
    }

    return {
      outputs: [
        { key: "monthsToPayoff", label: "Months to Pay Off", value: monthsToPayoff, format: "number", highlight: true },
        { key: "totalInterestPaid", label: "Total Interest Paid", value: Math.round(totalInterestPaid * 100) / 100, format: "currency" },
      ],
    };
  },

  howItWorks: `Monthly interest rate r = annual rate ÷ 12. Months to payoff: n = −ln(1 − r × P / PMT) ÷ ln(1 + r), where P = balance, PMT = monthly payment. Total interest is calculated by simulating each month to account for the smaller final payment. If your payment doesn't exceed the monthly interest charge, the debt will never be paid off.`,

  examples: [
    {
      title: "$5,000 at 20% APR, $200/month",
      description: "A typical credit card balance scenario.",
      inputs: { balance: 5000, interestRate: 20, monthlyPayment: 200 },
      result: "32 months to pay off. ~$1,310 total interest.",
    },
    {
      title: "$12,000 at 14% APR, $350/month",
      description: "A personal loan or car loan scenario.",
      inputs: { balance: 12000, interestRate: 14, monthlyPayment: 350 },
      result: "42 months to pay off. ~$2,640 total interest.",
    },
  ],

  faqs: [
    {
      question: "What happens if I increase my payment?",
      answer: "Even small increases have a big impact. Paying an extra $50/month on a $5,000 balance at 20% APR cuts the payoff time by around 7 months and saves hundreds in interest.",
    },
    {
      question: "Why does my payment need to exceed the monthly interest?",
      answer: "If your payment only covers interest (or less), the principal never decreases and the debt never ends. The calculator flags this as an error.",
    },
    {
      question: "Does this work for mortgages?",
      answer: "Yes, but mortgages typically have lower rates and very long terms. The maths is identical — just enter your mortgage balance, rate, and monthly payment.",
    },
  ],

  relatedSlugs: ["compound-interest-calculator", "savings-goal-calculator"],
};

export default def;
