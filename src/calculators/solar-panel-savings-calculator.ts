import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "solar-panel-savings-calculator",
  title: "Solar Panel Savings Calculator",
  shortTitle: "Solar Savings",
  description: "Estimate how much money solar panels could save you on electricity bills.",
  longDescription:
    "Solar panels can dramatically reduce your electricity bill. Enter your monthly electricity bill, the percentage offset solar will provide, and system cost to see your annual savings, payback period, and 25-year return.",
  category: "finance",
  keywords: ["solar panel savings calculator", "solar savings", "solar ROI", "solar payback period", "home solar cost"],
  inputs: [
    { type: "number", key: "monthlyBill", label: "Current Monthly Electric Bill ($)", defaultValue: 150, min: 1, step: 5, placeholder: "150" },
    { type: "number", key: "solarOffset", label: "Solar Offset (%)", defaultValue: 80, min: 1, max: 100, step: 5, placeholder: "80", helpText: "Percentage of your bill the solar system will cover" },
    { type: "number", key: "systemCost", label: "System Cost After Incentives ($)", defaultValue: 15000, min: 1000, step: 500, placeholder: "15000" },
    { type: "number", key: "annualIncrease", label: "Annual Electricity Rate Increase (%)", defaultValue: 3, min: 0, max: 15, step: 0.5, placeholder: "3" },
  ],
  compute(values: InputValues): ComputeResult {
    const monthlyBill = Number(values.monthlyBill);
    const solarOffset = Number(values.solarOffset) / 100;
    const systemCost = Number(values.systemCost);
    const annualIncrease = Number(values.annualIncrease) / 100;
    if ([monthlyBill, solarOffset, systemCost, annualIncrease].some(isNaN) || monthlyBill <= 0 || systemCost <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const annualSavingsYear1 = monthlyBill * 12 * solarOffset;
    // 25-year cumulative savings with annual rate increases
    let cumulative = 0;
    let paybackYear = 0;
    let runningCumulative = 0;
    for (let y = 1; y <= 25; y++) {
      const yearSavings = annualSavingsYear1 * Math.pow(1 + annualIncrease, y - 1);
      cumulative += yearSavings;
      if (paybackYear === 0) {
        runningCumulative += yearSavings;
        if (runningCumulative >= systemCost) paybackYear = y;
      }
    }
    const netProfit25yr = cumulative - systemCost;
    const paybackYears = paybackYear > 0 ? paybackYear : systemCost / annualSavingsYear1;
    return {
      outputs: [
        { key: "annualSavings", label: "Year 1 Annual Savings ($)", value: Number(annualSavingsYear1.toFixed(0)), format: "number", highlight: true },
        { key: "paybackYears", label: "Payback Period (years)", value: Number(paybackYears.toFixed(1)), format: "number" },
        { key: "savings25yr", label: "25-Year Total Savings ($)", value: Number(cumulative.toFixed(0)), format: "number" },
        { key: "netProfit25yr", label: "25-Year Net Profit ($)", value: Number(netProfit25yr.toFixed(0)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Year 1 savings = monthly bill × 12 × solar offset %. Cumulative savings compound annually by the electricity rate increase. Payback period = year when cumulative savings exceed system cost.",
  examples: [
    {
      title: "Average US Home",
      description: "$150/month bill, 80% offset, $15,000 system, 3% annual rate increase.",
      inputs: { monthlyBill: 150, solarOffset: 80, systemCost: 15000, annualIncrease: 3 },
      result: "~$1,440/yr savings, ~10 year payback, ~$25,000 net profit over 25 years.",
    },
    {
      title: "High-Bill Home",
      description: "$250/month bill, 90% offset, $20,000 system.",
      inputs: { monthlyBill: 250, solarOffset: 90, systemCost: 20000, annualIncrease: 3 },
      result: "~$2,700/yr savings, ~7 year payback.",
    },
  ],
  faqs: [
    { question: "What is solar offset?", answer: "The percentage of your electricity consumption your solar system will generate. A typical residential system offsets 70–100%." },
    { question: "Does this include the federal tax credit?", answer: "No — enter your cost after incentives. The US federal ITC currently offers a 30% tax credit on system cost." },
    { question: "How long do solar panels last?", answer: "Most panels are warranted for 25 years and often last 30+. They degrade about 0.5% per year in output." },
  ],
  relatedSlugs: ["fuel-cost-calculator", "roi-calculator", "break-even-calculator"],
};

export default def;
