import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-calculator",
  title: "Loan Calculator",
  shortTitle: "Loan Payment",
  description: "Calculate monthly payments, total interest, and payoff time for any standard loan.",
  longDescription:
    "Whether you're taking out a mortgage, an auto loan, or an unsecured personal loan, this Loan Calculator will help you understand the true cost of borrowing. Simply enter your loan amount, interest rate, and term to see your required monthly payment and lifetime interest cost. You can also experiment with extra monthly payments to see how much time and money you can save.",
  category: "finance",
  keywords:["loan calculator", "amortization calculator", "monthly payment", "mortgage calculator", "auto loan calculator", "interest calculator"],
  inputs:[
    { type: "number", key: "loanAmount", label: "Loan Amount ($)", defaultValue: 250000, min: 1, step: 1000, placeholder: "250000" },
    { type: "number", key: "interestRate", label: "Annual Interest Rate (APR %)", defaultValue: 6.5, min: 0, step: 0.1, placeholder: "6.5" },
    { type: "number", key: "loanTermYears", label: "Loan Term (Years)", defaultValue: 30, min: 1, step: 1, placeholder: "30" },
    { type: "number", key: "extraMonthlyPayment", label: "Extra Monthly Payment ($)", defaultValue: 0, min: 0, step: 50, placeholder: "0" }
  ],

  compute(values: InputValues): ComputeResult {
    const loanAmount = Number(values.loanAmount);
    const interestRate = Number(values.interestRate);
    const loanTermYears = Number(values.loanTermYears);
    const extraMonthlyPayment = Number(values.extraMonthlyPayment) || 0;

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTermYears) || isNaN(extraMonthlyPayment)) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Please enter valid numeric values.", format: "text", highlight: true },
        ],
      };
    }

    if (loanAmount <= 0 || loanTermYears <= 0) {
      return {
        outputs:[
          { key: "error", label: "Result", value: "Loan amount and term must be greater than zero.", format: "text", highlight: true },
        ],
      };
    }

    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = loanTermYears * 12;

    let baseMonthlyPayment = 0;

    if (monthlyRate === 0) {
      baseMonthlyPayment = loanAmount / totalMonths;
    } else {
      baseMonthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const actualMonthlyPayment = baseMonthlyPayment + extraMonthlyPayment;

    if (monthlyRate > 0) {
  const firstMonthInterest = loanAmount * monthlyRate;
  if (actualMonthlyPayment <= firstMonthInterest) {
    return {
      outputs: [
        {
          key: "error",
          label: "Result",
          value:
            "Monthly payment is too low to cover interest. Increase the payment, lower the rate, or extend the term.",
          format: "text",
          highlight: true,
        },
      ],
    };
  }
}
    
    // Simulate amortization to find total interest and exact payoff time with extra payments
    let balance = loanAmount;
    let monthsElapsed = 0;
    let totalInterestPaid = 0;

    // Hard limit to prevent infinite loops from floating point errors
    while (balance > 0.001 && monthsElapsed < 1200) {
      const interestForMonth = balance * monthlyRate;
      totalInterestPaid += interestForMonth;
      
      let principalForMonth = actualMonthlyPayment - interestForMonth;
      
      // If payment exceeds remaining balance + interest
      if (principalForMonth > balance) {
        principalForMonth = balance;
      }
      
      balance -= principalForMonth;
      monthsElapsed++;
    }

    const totalPaid = loanAmount + totalInterestPaid;
    const payoffYears = Math.floor(monthsElapsed / 12);
    const payoffMonths = monthsElapsed % 12;
    
    let payoffTimeText = `${payoffYears} years, ${payoffMonths} months`;
    if (payoffYears === 0) payoffTimeText = `${payoffMonths} months`;

    return {
      outputs:[
        { key: "monthlyPayment", label: "Required Monthly Payment", value: Number(baseMonthlyPayment.toFixed(2)), format: "currency", highlight: true },
        { key: "totalPaid", label: "Total Amount Paid", value: Number(totalPaid.toFixed(2)), format: "currency" },
        { key: "totalInterest", label: "Total Interest Paid", value: Number(totalInterestPaid.toFixed(2)), format: "currency" },
        { key: "payoffTime", label: "Actual Payoff Time", value: payoffTimeText, format: "text" }
      ],
    };
  },

  howItWorks:
    "The calculator uses standard financial amortization formulas to determine your required minimum monthly payment. It divides your annual interest rate by 12 to find the monthly rate, then computes the fixed payment needed to bring the balance to exactly zero by the end of the term. If you include an extra monthly payment, it runs a month-by-month simulation to calculate how much quicker you will pay off the principal and how much interest you will save.",

  examples:[
    {
      title: "Standard 30-Year Mortgage",
      description: "A $250,000 home loan at 6.5% interest over 30 years with no extra payments.",
      inputs: { loanAmount: 250000, interestRate: 6.5, loanTermYears: 30, extraMonthlyPayment: 0 },
      result: "Yields a $1,580.17 monthly payment and a staggering $318,861 in total interest over 30 years."
    },
    {
      title: "Mortgage with Extra Payments",
      description: "The same $250,000 home loan at 6.5%, but adding $200 extra every month.",
      inputs: { loanAmount: 250000, interestRate: 6.5, loanTermYears: 30, extraMonthlyPayment: 200 },
      result: "Pays the loan off in just 22 years and 5 months, saving nearly $96,000 in interest."
    },
    {
      title: "5-Year Auto Loan",
      description: "Financing a $30,000 car at 8% interest over 5 years.",
      inputs: { loanAmount: 30000, interestRate: 8, loanTermYears: 5, extraMonthlyPayment: 0 },
      result: "Results in a $608.29 monthly payment and $6,497.51 in total interest."
    }
  ],

  faqs:[
    { question: "What does amortization mean?", answer: "Amortization is the process of spreading a loan out into a series of fixed payments over time. Early in the loan, a larger portion of your payment goes toward interest. Later, more goes toward the principal." },
    { question: "Are taxes and insurance included in this calculation?", answer: "No. For mortgages, your actual monthly bill will likely be higher because lenders often bundle property taxes and homeowners insurance into an escrow account. This calculator only shows Principal and Interest (P&I)." },
    { question: "Does applying extra payments really save that much money?", answer: "Yes! Because interest is calculated based on your remaining principal balance, making extra payments reduces the principal faster. This creates a snowball effect where you are charged less interest every subsequent month." },
    { question: "What happens if I have a 0% interest loan?", answer: "If your interest rate is 0%, the calculator simply divides the total loan amount by the total number of months to give you your monthly payment. You will pay $0 in interest." }
  ],

  relatedSlugs:[
    "mortgage-calculator",
    "loan-payment-calculator",
    "loan-affordability-calculator"
  ]
};

export default def;