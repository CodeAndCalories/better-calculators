import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

const def: CalculatorDef = {
  slug: "salary-after-tax-calculator",
  title: "Salary After Tax Calculator",
  shortTitle: "Salary After Tax",
  description: "Estimate take home pay after taxes using a simple effective tax rate.",
  longDescription:
    "Estimate your take home pay after taxes using an effective tax rate. Enter your annual salary and an estimated combined tax rate (federal, state, local). This quick calculator is useful for budgeting, job offers, and planning monthly expenses.",
  category: "finance",
  keywords: ["salary after tax calculator", "take home pay calculator", "net salary"],
  inputs: [
    { type: "number", key: "salary", label: "Annual Salary", defaultValue: 80000, min: 0, step: 100, placeholder: "80000" },
    { type: "number", key: "taxRate", label: "Effective Tax Rate (%)", defaultValue: 25, min: 0, max: 60, step: 0.1, placeholder: "25" },
    { type: "number", key: "deductions", label: "Annual Pre Tax Deductions (optional)", defaultValue: 0, min: 0, step: 100, placeholder: "0" },
  ],

  compute(values: InputValues): ComputeResult {
    const salary = Number(values.salary);
    const taxRatePct = Number(values.taxRate);
    const deductions = Number(values.deductions);

    if (!Number.isFinite(salary) || salary < 0) {
      return { outputs: [{ key: "error", label: "Result", value: "Enter a valid annual salary.", format: "text", highlight: true }] };
    }

    const taxable = Math.max(0, salary - (Number.isFinite(deductions) ? deductions : 0));
    const rate = clamp((Number.isFinite(taxRatePct) ? taxRatePct : 0) / 100, 0, 0.95);

    const taxes = taxable * rate;
    const netAnnual = taxable - taxes;

    const netMonthly = netAnnual / 12;
    const netBiweekly = netAnnual / 26;
    const netWeekly = netAnnual / 52;

    return {
      outputs: [
        { key: "netAnnual", label: "Net Annual Pay", value: Number(netAnnual.toFixed(2)), format: "number", highlight: true },
        { key: "netMonthly", label: "Net Monthly Pay", value: Number(netMonthly.toFixed(2)), format: "number" },
        { key: "netBiweekly", label: "Net Biweekly Pay", value: Number(netBiweekly.toFixed(2)), format: "number" },
        { key: "netWeekly", label: "Net Weekly Pay", value: Number(netWeekly.toFixed(2)), format: "number" },
        { key: "taxable", label: "Taxable Income (after deductions)", value: Number(taxable.toFixed(2)), format: "number" },
        { key: "taxes", label: "Estimated Taxes", value: Number(taxes.toFixed(2)), format: "number" },
      ],
    };
  },

  howItWorks:
    "This calculator uses an effective tax rate. We subtract any pre tax deductions from salary, multiply the remainder by the tax rate to estimate taxes, then compute net pay. Monthly, weekly, and biweekly values are simple splits of annual net pay.",

  examples: [
    {
      title: "$80,000 salary at 25% tax rate",
      description: "A quick take home estimate without deductions.",
      inputs: { salary: 80000, taxRate: 25, deductions: 0 },
      result: "Net annual pay is about $60,000.",
    },
    {
      title: "Salary with deductions",
      description: "A salary with $5,000 of pre tax deductions.",
      inputs: { salary: 90000, taxRate: 28, deductions: 5000 },
      result: "Taxable income and net pay adjust accordingly.",
    },
  ],

  faqs: [
    { question: "What is an effective tax rate?", answer: "It is your estimated combined average tax rate after considering brackets and deductions. It is not the top bracket rate." },
    { question: "Is this exact for my state and filing status?", answer: "This is a fast estimate. Exact take home pay depends on location, filing status, benefits, and payroll rules. You can improve accuracy by adjusting the tax rate." },
    { question: "What should I enter for tax rate?", answer: "Many people fall between 20% and 35% combined. If you have a recent pay stub, you can estimate by dividing taxes withheld by gross pay." },
    { question: "Why include deductions?", answer: "Pre tax deductions like health insurance or retirement contributions reduce taxable income, which can reduce taxes and change net pay." },
  ],

  relatedSlugs: [
    "salary-to-hourly-calculator",
    "hourly-to-salary-calculator",
    "loan-affordability-calculator",
    "savings-goal-calculator",
  ],
};

export default def;
