import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "mortgage-calculator",
  title: "Mortgage Calculator",
  shortTitle: "Mortgage",
  description: "Calculate your monthly mortgage payment, total interest paid, and full amortization breakdown.",
  longDescription: "Use our mortgage calculator to estimate your monthly payment based on home price, down payment, loan term, and interest rate. Understand the true cost of your loan including total interest paid over the life of the mortgage.",
  category: "finance",
  keywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "house payment calculator"],
  inputs: [
    { type: "number", key: "homePrice", label: "Home Price", prefix: "$", defaultValue: 400000, min: 1000, step: 1000, placeholder: "400000" },
    { type: "number", key: "downPayment", label: "Down Payment", prefix: "$", defaultValue: 80000, min: 0, step: 1000, placeholder: "80000" },
    { type: "number", key: "interestRate", label: "Annual Interest Rate", suffix: "%", defaultValue: 7.0, min: 0.1, max: 30, step: 0.1, placeholder: "7.0" },
    { type: "select", key: "loanTerm", label: "Loan Term", defaultValue: "30", options: [
      { label: "30 years", value: "30" },
      { label: "20 years", value: "20" },
      { label: "15 years", value: "15" },
      { label: "10 years", value: "10" },
    ]},
    { type: "number", key: "propertyTax", label: "Annual Property Tax", prefix: "$", defaultValue: 4800, min: 0, step: 100, placeholder: "4800", helpText: "Optional — leave 0 to exclude" },
    { type: "number", key: "insurance", label: "Annual Home Insurance", prefix: "$", defaultValue: 1200, min: 0, step: 100, placeholder: "1200", helpText: "Optional — leave 0 to exclude" },
  ],
  compute(values: InputValues): ComputeResult {
    const homePrice = Number(values.homePrice);
    const downPayment = Number(values.downPayment);
    const annualRate = Number(values.interestRate);
    const loanTermYears = Number(values.loanTerm);
    const propertyTax = Number(values.propertyTax) || 0;
    const insurance = Number(values.insurance) || 0;

    if (downPayment >= homePrice) {
      return { outputs: [], error: "Down payment cannot be equal to or greater than the home price." };
    }

    const principal = homePrice - downPayment;
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = loanTermYears * 12;

    let monthlyPI: number;
    if (monthlyRate === 0) {
      monthlyPI = principal / numPayments;
    } else {
      monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;
    const totalPaid = monthlyPI * numPayments;
    const totalInterest = totalPaid - principal;
    const downPaymentPct = (downPayment / homePrice) * 100;

    return {
      outputs: [
        { key: "monthlyPayment", label: "Monthly P&I Payment", value: monthlyPI, format: "currency", highlight: true },
        { key: "totalMonthly", label: "Total Monthly Payment", value: totalMonthly, format: "currency", helpText: "Including tax and insurance" },
        { key: "loanAmount", label: "Loan Amount", value: principal, format: "currency" },
        { key: "totalInterest", label: "Total Interest Paid", value: totalInterest, format: "currency" },
        { key: "totalCost", label: "Total Cost of Loan", value: totalPaid, format: "currency" },
        { key: "downPaymentPct", label: "Down Payment %", value: downPaymentPct, format: "percentage" },
      ],
    };
  },
  howItWorks: `The monthly mortgage payment is calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan principal (home price minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12). The total interest is found by multiplying the monthly P&I payment by the number of payments and subtracting the principal.`,
  examples: [
    {
      title: "$400,000 Home — 20% Down, 30-Year Fixed",
      description: "A typical first-time homebuyer scenario with a conventional 30-year mortgage.",
      inputs: { homePrice: 400000, downPayment: 80000, interestRate: 7.0, loanTerm: "30", propertyTax: 4800, insurance: 1200 },
      result: "Monthly P&I of ~$2,129, total interest of ~$446,500 over 30 years.",
    },
    {
      title: "$300,000 Home — 10% Down, 15-Year Fixed",
      description: "A shorter loan term saves significant interest despite higher monthly payments.",
      inputs: { homePrice: 300000, downPayment: 30000, interestRate: 6.5, loanTerm: "15", propertyTax: 3600, insurance: 900 },
      result: "Monthly P&I of ~$2,349, but total interest of only ~$152,800.",
    },
  ],
  faqs: [
    { question: "What is included in a mortgage payment?", answer: "A full mortgage payment typically includes Principal (paying down the loan), Interest (cost of borrowing), Property Taxes, and Homeowners Insurance — often abbreviated as PITI. Our calculator includes all four." },
    { question: "Does a higher down payment always make sense?", answer: "A larger down payment reduces your loan amount and monthly payment, and helps you avoid Private Mortgage Insurance (PMI) if you reach 20%. However, tying up cash in equity means less liquidity, so it's a tradeoff based on your financial situation." },
    { question: "What is the difference between 15-year and 30-year mortgages?", answer: "A 15-year mortgage has higher monthly payments but you pay far less total interest and build equity faster. A 30-year mortgage has lower monthly payments, making it more affordable month-to-month, but costs significantly more in total interest." },
    { question: "How does interest rate affect my payment?", answer: "Even a 0.5% difference in rate can change your monthly payment by hundreds of dollars on a large loan. On a $320,000 loan over 30 years, the difference between 6.5% and 7.0% is about $105/month and over $37,000 in total interest." },
  ],
  relatedSlugs: ["loan-payment-calculator", "compound-interest-calculator", "credit-card-payoff-calculator"],
};

export default def;
