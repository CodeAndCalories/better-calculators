import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "credit-card-payoff-calculator",
  title: "Credit Card Payoff Calculator",
  shortTitle: "CC Payoff",
  description: "Find out how long it takes to pay off your credit card and how much interest you'll pay.",
  longDescription: "Credit card debt is expensive. Our payoff calculator shows you exactly how long it will take to eliminate your balance, how much interest you'll pay, and compares different monthly payment strategies.",
  category: "finance",
  keywords: ["credit card payoff calculator", "credit card debt calculator", "pay off credit card", "credit card interest calculator"],
  inputs: [
    { type: "number", key: "balance", label: "Current Balance", prefix: "$", defaultValue: 5000, min: 1, step: 100, placeholder: "5000" },
    { type: "number", key: "apr", label: "Annual Percentage Rate (APR)", suffix: "%", defaultValue: 22.99, min: 0.1, max: 100, step: 0.1, placeholder: "22.99" },
    { type: "number", key: "monthlyPayment", label: "Monthly Payment", prefix: "$", defaultValue: 200, min: 1, step: 10, placeholder: "200" },
  ],
  compute(values: InputValues): ComputeResult {
    const balance = Number(values.balance);
    const apr = Number(values.apr);
    const monthlyPayment = Number(values.monthlyPayment);
    const monthlyRate = apr / 100 / 12;
    const minPayment = balance * monthlyRate * 1.01; // slightly above interest

    if (monthlyPayment <= balance * monthlyRate) {
      return {
        outputs: [],
        error: `Your payment of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(monthlyPayment)} doesn't cover the monthly interest of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(balance * monthlyRate)}. Please increase your monthly payment.`,
      };
    }

    let remaining = balance;
    let months = 0;
    let totalInterest = 0;

    while (remaining > 0 && months < 1200) {
      const interest = remaining * monthlyRate;
      totalInterest += interest;
      remaining = remaining + interest - monthlyPayment;
      if (remaining < 0) remaining = 0;
      months++;
    }

    const totalPaid = balance + totalInterest;
    const years = months / 12;

    return {
      outputs: [
        { key: "months", label: "Months to Pay Off", value: months, format: "number", highlight: true },
        { key: "years", label: "Years to Pay Off", value: years, format: "years" },
        { key: "totalInterest", label: "Total Interest Paid", value: totalInterest, format: "currency" },
        { key: "totalPaid", label: "Total Amount Paid", value: totalPaid, format: "currency" },
        { key: "interestPct", label: "Interest as % of Balance", value: (totalInterest / balance) * 100, format: "percentage" },
      ],
    };
  },
  howItWorks: `Each month, interest is charged on the remaining balance: Interest = Balance × (APR / 12). Your payment first covers that interest, and the remainder reduces the principal. We repeat this month-by-month until the balance reaches zero. The calculation shows the total months, total interest, and total amount paid.`,
  examples: [
    {
      title: "$5,000 at 22.99% APR — $200/month",
      description: "A typical credit card balance with a common payment amount.",
      inputs: { balance: 5000, apr: 22.99, monthlyPayment: 200 },
      result: "Paid off in 32 months with ~$1,380 in interest.",
    },
    {
      title: "$5,000 at 22.99% APR — $500/month",
      description: "Doubling the payment dramatically reduces interest and time.",
      inputs: { balance: 5000, apr: 22.99, monthlyPayment: 500 },
      result: "Paid off in 11 months with ~$530 in interest — saving $850.",
    },
  ],
  faqs: [
    { question: "What is the minimum payment trap?", answer: "Paying only the minimum on a credit card (usually 1–2% of the balance) can take decades to pay off and cost more in interest than the original balance. Always pay more than the minimum." },
    { question: "Does paying twice a month help?", answer: "Yes! Making bi-weekly payments reduces the average daily balance, which reduces the interest accrued each cycle, slightly accelerating payoff." },
    { question: "Should I pay off credit card debt or invest?", answer: "If your credit card APR (often 18–25%) is higher than your expected investment return (historically ~7–10%), paying off the debt first guarantees a higher return." },
  ],
  relatedSlugs: ["loan-payment-calculator", "mortgage-calculator", "compound-interest-calculator"],
};

export default def;
