import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "compound-daily-interest-calculator",
  title: "Daily Compound Interest Calculator",
  shortTitle: "Daily Compound Interest",
  description: "Calculate investment growth with daily compounding and optional monthly contributions.",
  longDescription:
    "Daily compounding means interest is calculated and added to your balance every single day — giving you slightly more growth than monthly or annual compounding. Enter your starting balance, annual rate, time period, and optional monthly contribution to see your future value and total interest earned.",
  category: "finance",
  keywords: ["daily compound interest calculator", "compound interest daily", "daily compounding calculator", "investment growth calculator", "interest compounded daily"],
  inputs: [
    {
      type: "number",
      key: "principal",
      label: "Starting Balance ($)",
      defaultValue: 10000,
      min: 0,
      step: 100,
      placeholder: "10000",
    },
    {
      type: "number",
      key: "annualRate",
      label: "Annual Interest Rate (%)",
      defaultValue: 5,
      min: 0.01,
      max: 100,
      step: 0.1,
      placeholder: "5",
    },
    {
      type: "number",
      key: "years",
      label: "Time Period (years)",
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      placeholder: "10",
    },
    {
      type: "number",
      key: "monthlyContribution",
      label: "Monthly Contribution ($)",
      defaultValue: 0,
      min: 0,
      step: 50,
      placeholder: "0",
      helpText: "Optional — leave as 0 for lump-sum only",
    },
  ],

  compute(values: InputValues): ComputeResult {
    const principal = Number(values.principal);
    const annualRate = Number(values.annualRate);
    const years = Number(values.years);
    const monthlyContribution = Number(values.monthlyContribution);

    if (
      !Number.isFinite(principal) || !Number.isFinite(annualRate) ||
      !Number.isFinite(years) || !Number.isFinite(monthlyContribution) ||
      annualRate <= 0 || years <= 0 || principal < 0 || monthlyContribution < 0
    ) {
      return { outputs: [], error: "Please enter a valid number." };
    }

    const dailyRate = annualRate / 100 / 365;
    const totalDays = Math.round(years * 365);

    // Simulate day by day to handle monthly contributions accurately
    let balance = principal;
    const daysPerMonth = 365 / 12;

    for (let day = 1; day <= totalDays; day++) {
      balance *= (1 + dailyRate);
      // Add monthly contribution once every ~30.4 days
      if (monthlyContribution > 0 && day % Math.round(daysPerMonth) === 0) {
        balance += monthlyContribution;
      }
    }

    const totalContributions = principal + monthlyContribution * years * 12;
    const totalInterest = balance - totalContributions;

    return {
      outputs: [
        { key: "futureValue", label: "Future Value", value: Math.round(balance * 100) / 100, format: "currency", highlight: true },
        { key: "totalInterest", label: "Total Interest Earned", value: Math.round(totalInterest * 100) / 100, format: "currency" },
        { key: "totalContributions", label: "Total Contributions", value: Math.round(totalContributions * 100) / 100, format: "currency" },
      ],
    };
  },

  howItWorks: `Daily rate = annual rate ÷ 365. Each day: balance = balance × (1 + daily rate). Monthly contributions are added once every ~30.4 days. This day-by-day simulation handles contributions more accurately than a closed-form formula. Total interest = future value − total contributions (principal + all monthly deposits).`,

  examples: [
    {
      title: "$10,000 at 5% for 10 years, no contributions",
      description: "A lump-sum investment with daily compounding.",
      inputs: { principal: 10000, annualRate: 5, years: 10, monthlyContribution: 0 },
      result: "Future value ~$16,487. Total interest ~$6,487.",
    },
    {
      title: "$1,000 at 7% for 20 years, $200/month",
      description: "A long-term savings plan with regular contributions.",
      inputs: { principal: 1000, annualRate: 7, years: 20, monthlyContribution: 200 },
      result: "Future value ~$104,000+. Most of the growth comes from contributions compounding over time.",
    },
  ],

  faqs: [
    {
      question: "How much better is daily vs monthly compounding?",
      answer: "The difference is small but real. At 5% APR, $10,000 grows to ~$16,487 with daily compounding vs ~$16,470 with monthly — a difference of about $17 over 10 years. Daily compounding matters more at higher rates and longer timeframes.",
    },
    {
      question: "What does APY mean?",
      answer: "Annual Percentage Yield (APY) is the effective annual rate after compounding. For 5% APR compounded daily, APY = (1 + 0.05/365)^365 − 1 ≈ 5.127%. Banks often advertise APY to show the true return.",
    },
  ],

  relatedSlugs: ["compound-interest-calculator", "savings-goal-calculator", "savings-rate-calculator"],
};

export default def;
