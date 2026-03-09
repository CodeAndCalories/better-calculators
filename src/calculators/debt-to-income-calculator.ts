import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "debt-to-income-calculator",
  title: "Debt-to-Income Ratio Calculator",
  description: "Calculate your debt-to-income (DTI) ratio — a key metric lenders use to evaluate loan applications.",
  longDescription: "Your debt-to-income ratio compares your total monthly debt payments to your gross monthly income. Lenders use it to assess your ability to manage additional debt. Most mortgage lenders prefer a DTI below 43%.",
  category: "finance",
  keywords: ["debt to income ratio", "DTI calculator", "loan eligibility", "debt ratio calculator"],
  inputs: [
    { type: "number", key: "grossIncome", label: "Gross Monthly Income ($)", defaultValue: 6000, min: 100, step: 100, prefix: "$" },
    { type: "number", key: "mortgage", label: "Mortgage / Rent Payment ($)", defaultValue: 1500, min: 0, step: 50, prefix: "$" },
    { type: "number", key: "carLoan", label: "Car Loan Payment ($)", defaultValue: 350, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "studentLoan", label: "Student Loan Payment ($)", defaultValue: 200, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "creditCards", label: "Credit Card Minimum Payments ($)", defaultValue: 100, min: 0, step: 10, prefix: "$" },
    { type: "number", key: "otherDebt", label: "Other Monthly Debt Payments ($)", defaultValue: 0, min: 0, step: 10, prefix: "$" },
  ],
  compute(values: InputValues): ComputeResult {
    const income = Number(values.grossIncome);
    const mortgage = Number(values.mortgage);
    const car = Number(values.carLoan);
    const student = Number(values.studentLoan);
    const cards = Number(values.creditCards);
    const other = Number(values.otherDebt);
    if ([income, mortgage, car, student, cards, other].some(isNaN) || income <= 0) {
      return { outputs: [], error: "Please enter valid values with a positive income." };
    }
    const totalDebt = mortgage + car + student + cards + other;
    const dti = (totalDebt / income) * 100;
    let rating = "Excellent (< 20%)";
    if (dti >= 50) rating = "High Risk (≥ 50%)";
    else if (dti >= 43) rating = "Elevated (43–50%)";
    else if (dti >= 36) rating = "Acceptable (36–43%)";
    else if (dti >= 20) rating = "Good (20–36%)";

    return {
      outputs: [
        { key: "dti", label: "Debt-to-Income Ratio", value: Number(dti.toFixed(1)), format: "percentage", highlight: true },
        { key: "rating", label: "DTI Rating", value: rating, format: "text" },
        { key: "totalDebt", label: "Total Monthly Debt Payments", value: Number(totalDebt.toFixed(2)), format: "currency" },
        { key: "remaining", label: "Income After Debt Payments", value: Number((income - totalDebt).toFixed(2)), format: "currency" },
      ],
    };
  },
  howItWorks: "DTI = (total monthly debt payments ÷ gross monthly income) × 100. Use gross (pre-tax) income, not take-home pay, as lenders typically use gross figures.",
  examples: [
    {
      title: "Mortgage applicant",
      description: "$6,000 income, $2,150 total debt.",
      inputs: { grossIncome: 6000, mortgage: 1500, carLoan: 350, studentLoan: 200, creditCards: 100, otherDebt: 0 },
      result: "DTI = 35.8% — Good. Likely to qualify for most loans.",
    },
  ],
  faqs: [
    { question: "What DTI do mortgage lenders require?", answer: "Most conventional lenders cap DTI at 43–45%. FHA loans may allow up to 50% with strong compensating factors." },
    { question: "Should I use gross or net income?", answer: "Use gross (pre-tax) income. Lenders calculate DTI based on gross monthly income." },
  ],
  relatedSlugs: ["net-worth-calculator", "monthly-budget-calculator", "car-loan-affordability-calculator"],
};

export default def;
