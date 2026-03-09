import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "freelance-hourly-rate-calculator",
  title: "Freelance Hourly Rate Calculator",
  shortTitle: "Freelance Rate",
  description: "Calculate the minimum hourly rate you need to charge as a freelancer.",
  longDescription:
    "Setting the right freelance rate is critical to financial sustainability. This calculator works backwards from your desired annual income, taxes, expenses, and billable hours to tell you the minimum hourly rate you must charge — and a recommended rate with profit buffer.",
  category: "finance",
  keywords: ["freelance rate calculator", "freelance hourly rate", "self employed rate", "consultant rate calculator", "minimum billable rate"],
  inputs: [
    { type: "number", key: "desiredIncome", label: "Desired Annual Take-Home ($)", defaultValue: 80000, min: 1000, step: 1000, placeholder: "80000" },
    { type: "number", key: "taxRate", label: "Self-Employment Tax Rate (%)", defaultValue: 30, min: 0, max: 60, step: 1, placeholder: "30" },
    { type: "number", key: "annualExpenses", label: "Annual Business Expenses ($)", defaultValue: 5000, min: 0, step: 500, placeholder: "5000" },
    { type: "number", key: "billableHours", label: "Billable Hours Per Year", defaultValue: 1000, min: 100, max: 2000, step: 50, placeholder: "1000", helpText: "Typically 50-60% of total working hours" },
  ],
  compute(values: InputValues): ComputeResult {
    const desiredIncome = Number(values.desiredIncome);
    const taxRate = Number(values.taxRate) / 100;
    const annualExpenses = Number(values.annualExpenses);
    const billableHours = Number(values.billableHours);
    if ([desiredIncome, taxRate, annualExpenses, billableHours].some(isNaN) || billableHours <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const grossNeeded = desiredIncome / (1 - taxRate);
    const totalNeeded = grossNeeded + annualExpenses;
    const minimumRate = totalNeeded / billableHours;
    const recommendedRate = minimumRate * 1.2; // 20% buffer
    return {
      outputs: [
        { key: "minimumRate", label: "Minimum Hourly Rate ($/hr)", value: Number(minimumRate.toFixed(2)), format: "number", highlight: true },
        { key: "recommendedRate", label: "Recommended Rate with 20% Buffer ($/hr)", value: Number(recommendedRate.toFixed(2)), format: "number" },
        { key: "grossNeeded", label: "Gross Revenue Needed ($)", value: Number(totalNeeded.toFixed(0)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Grosses up desired income for taxes, adds expenses, then divides by billable hours. Recommended rate adds a 20% buffer for scope creep, unpaid admin, and slow months.",
  examples: [
    {
      title: "Designer Targeting $80K",
      description: "$80K take-home, 30% tax, $5K expenses, 1,000 billable hours.",
      inputs: { desiredIncome: 80000, taxRate: 30, annualExpenses: 5000, billableHours: 1000 },
      result: "Minimum rate: ~$119/hr. Recommended: ~$143/hr.",
    },
    {
      title: "Developer Targeting $120K",
      description: "$120K take-home, 35% tax, $8K expenses, 1,200 hours.",
      inputs: { desiredIncome: 120000, taxRate: 35, annualExpenses: 8000, billableHours: 1200 },
      result: "Minimum rate: ~$160/hr. Recommended: ~$192/hr.",
    },
  ],
  faqs: [
    { question: "What are typical billable hours for a freelancer?", answer: "Most freelancers bill 800–1,200 hours per year. The rest is spent on admin, marketing, and non-billable work." },
    { question: "What should I include in business expenses?", answer: "Software subscriptions, equipment, health insurance, professional development, home office costs, and accounting fees." },
    { question: "Why add a 20% buffer?", answer: "Projects always take longer than quoted, clients are slow to pay, and slow months happen. The buffer protects your income floor." },
  ],
  relatedSlugs: ["hourly-rate-from-project-calculator", "salary-to-hourly-calculator", "net-income-calculator"],
};

export default def;
