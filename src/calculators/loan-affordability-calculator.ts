import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "loan-affordability-calculator",
  title: "Loan Affordability Calculator",
  shortTitle: "Loan Affordability",
  description:
    "Find the maximum loan amount you can afford based on your monthly income, debts, interest rate, and loan term.",
  longDescription:
    "Before applying for a mortgage, auto loan, or personal loan, you need to know how much you can realistically borrow. This calculator works backwards from what you can afford to pay each month — factoring in your gross income, existing debt obligations, interest rate, and loan term — to show your maximum loan amount, the safe payment range based on standard debt-to-income ratios, and how much of your income different payment amounts would consume.",
  category: "finance",
  keywords: [
    "loan affordability calculator",
    "how much can I borrow",
    "maximum loan amount calculator",
    "debt to income ratio calculator",
    "mortgage affordability calculator",
    "how much loan can I afford",
  ],
  inputs: [
    {
      type: "number",
      key: "grossMonthlyIncome",
      label: "Gross Monthly Income",
      prefix: "$",
      defaultValue: 7500,
      min: 100,
      step: 100,
      placeholder: "7500",
      helpText: "Before taxes — all income sources combined",
    },
    {
      type: "number",
      key: "existingMonthlyDebt",
      label: "Existing Monthly Debt Payments",
      prefix: "$",
      defaultValue: 500,
      min: 0,
      step: 50,
      placeholder: "500",
      helpText: "Car loans, student loans, credit card minimums, etc.",
    },
    {
      type: "number",
      key: "interestRate",
      label: "Annual Interest Rate",
      suffix: "%",
      defaultValue: 7.0,
      min: 0.1,
      max: 50,
      step: 0.1,
      placeholder: "7.0",
    },
    {
      type: "select",
      key: "loanTermMonths",
      label: "Loan Term",
      defaultValue: "360",
      options: [
        { label: "12 months (1 year)",  value: "12"  },
        { label: "24 months (2 years)", value: "24"  },
        { label: "36 months (3 years)", value: "36"  },
        { label: "48 months (4 years)", value: "48"  },
        { label: "60 months (5 years)", value: "60"  },
        { label: "84 months (7 years)", value: "84"  },
        { label: "120 months (10 years)", value: "120" },
        { label: "180 months (15 years)", value: "180" },
        { label: "240 months (20 years)", value: "240" },
        { label: "360 months (30 years)", value: "360" },
      ],
    },
    {
      type: "select",
      key: "dtiTarget",
      label: "Debt-to-Income (DTI) Target",
      defaultValue: "0.36",
      options: [
        { label: "28% — Conservative (front-end housing guideline)", value: "0.28" },
        { label: "36% — Standard (most lenders prefer)", value: "0.36" },
        { label: "43% — Maximum (FHA / qualified mortgage limit)", value: "0.43" },
        { label: "50% — Aggressive (some lenders allow)", value: "0.50" },
      ],
      helpText: "Percentage of gross income toward ALL debt including this new loan",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const grossIncome      = Number(values.grossMonthlyIncome);
    const existingDebt     = Number(values.existingMonthlyDebt);
    const annualRate       = Number(values.interestRate);
    const n                = Number(values.loanTermMonths);
    const dtiLimit         = Number(values.dtiTarget);

    if (grossIncome <= 0)  return { outputs: [], error: "Gross monthly income must be greater than zero." };
    if (existingDebt < 0)  return { outputs: [], error: "Existing monthly debt cannot be negative." };
    if (annualRate <= 0)   return { outputs: [], error: "Interest rate must be greater than zero." };

    const r = annualRate / 100 / 12; // monthly rate

    // Maximum allowable total monthly debt under the chosen DTI
    const maxTotalDebt     = grossIncome * dtiLimit;
    // Room left for the new loan payment after existing obligations
    const maxNewPayment    = maxTotalDebt - existingDebt;

    if (maxNewPayment <= 0) {
      return {
        outputs: [],
        error: `Your existing debt of $${existingDebt.toLocaleString()}/month already exceeds the ${(dtiLimit * 100).toFixed(0)}% DTI limit of $${maxTotalDebt.toFixed(0)}/month. Try a lower DTI target or reduce existing debts.`,
      };
    }

    // Reverse amortization: solve for principal given payment, rate, n
    // P = PMT × [1 − (1+r)^−n] / r
    let maxLoanAmount: number;
    if (r === 0) {
      maxLoanAmount = maxNewPayment * n;
    } else {
      maxLoanAmount = maxNewPayment * (1 - Math.pow(1 + r, -n)) / r;
    }

    const totalPaid          = maxNewPayment * n;
    const totalInterest      = totalPaid - maxLoanAmount;
    const currentDTI         = existingDebt / grossIncome;
    const newDTI             = (existingDebt + maxNewPayment) / grossIncome;

    // Conservative 28% front-end check (for reference)
    const safePayment28      = grossIncome * 0.28 - existingDebt;

    return {
      outputs: [
        {
          key: "maxLoan",
          label: "Maximum Loan You Can Afford",
          value: maxLoanAmount,
          format: "currency",
          highlight: true,
          helpText: `At ${(dtiLimit * 100).toFixed(0)}% DTI with ${annualRate}% rate over ${n} months`,
        },
        {
          key: "maxMonthlyPayment",
          label: "Maximum Monthly Payment",
          value: maxNewPayment,
          format: "currency",
          helpText: "Room remaining after existing debts",
        },
        {
          key: "totalInterest",
          label: "Total Interest Over Loan Life",
          value: totalInterest > 0 ? totalInterest : 0,
          format: "currency",
        },
        {
          key: "totalCost",
          label: "Total Repayment Amount",
          value: totalPaid,
          format: "currency",
        },
        {
          key: "currentDTI",
          label: "Current DTI (Before New Loan)",
          value: currentDTI * 100,
          format: "percentage",
          helpText: "Your debt-to-income ratio right now",
        },
        {
          key: "newDTI",
          label: "DTI With New Loan",
          value: newDTI * 100,
          format: "percentage",
          helpText: `Target is ≤ ${(dtiLimit * 100).toFixed(0)}%`,
        },
      ],
    };
  },

  howItWorks: `We use the reverse amortization formula to solve for principal: P = PMT × [1 − (1 + r)^−n] / r, where PMT is the maximum monthly payment, r is the monthly interest rate (annual ÷ 12), and n is the number of months. The maximum payment is determined by your debt-to-income (DTI) limit: Max Total Debt = Gross Income × DTI%. Max New Payment = Max Total Debt − Existing Monthly Debt. Total interest equals (monthly payment × months) − principal. DTI is a key metric lenders use; 36% is the most common approval threshold.`,

  examples: [
    {
      title: "$7,500/month income, $500 existing debt, 30-year at 7%",
      description:
        "A typical first-time homebuyer scenario estimating mortgage affordability at a standard 36% DTI.",
      inputs: {
        grossMonthlyIncome: 7500,
        existingMonthlyDebt: 500,
        interestRate: 7.0,
        loanTermMonths: "360",
        dtiTarget: "0.36",
      },
      result:
        "Maximum loan of ~$266,000, max monthly payment of $2,200, total DTI at 36% with the new loan.",
    },
    {
      title: "$5,000/month income, $200 debt, 5-year auto loan at 6.5%",
      description:
        "Checking how much car loan someone with a tight budget can afford at a conservative 28% DTI.",
      inputs: {
        grossMonthlyIncome: 5000,
        existingMonthlyDebt: 200,
        interestRate: 6.5,
        loanTermMonths: "60",
        dtiTarget: "0.28",
      },
      result:
        "Maximum auto loan of ~$53,700, max monthly payment of $1,200, keeping total debt at 28% of income.",
    },
  ],

  faqs: [
    {
      question: "What is a debt-to-income (DTI) ratio?",
      answer:
        "DTI is the percentage of your gross monthly income that goes toward debt payments. Lenders calculate it as: Total Monthly Debt Payments ÷ Gross Monthly Income × 100. A ratio of 36% or below is considered healthy by most lenders. Above 43% typically disqualifies you from a qualified mortgage.",
    },
    {
      question: "What is the difference between front-end and back-end DTI?",
      answer:
        "Front-end DTI (also called the housing ratio) includes only housing-related costs — mortgage principal, interest, taxes, and insurance (PITI). The guideline is ≤ 28%. Back-end DTI includes all monthly debt payments (housing + car loans + student loans + credit cards). The guideline is ≤ 36–43%. This calculator uses back-end DTI.",
    },
    {
      question: "Should I use gross or net income?",
      answer:
        "Lenders always use gross income (before taxes) for DTI calculations. This calculator does the same. Using net income would give you a stricter, more conservative affordability estimate — which can actually be useful for personal budgeting even if lenders don't require it.",
    },
    {
      question: "What counts as existing monthly debt?",
      answer:
        "Include: minimum credit card payments, car loan payments, student loan payments, personal loan payments, child support or alimony, and any other recurring debt obligations. Do not include: utilities, insurance, groceries, subscriptions, or other living expenses — lenders exclude these from DTI.",
    },
  ],

  relatedSlugs: [
    "mortgage-calculator",
    "loan-payment-calculator",
    "credit-card-payoff-calculator",
  ],
};

export default def;
