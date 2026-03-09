import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-compound-interest-calculator",
  title: "Crypto Compound Interest Calculator",
  shortTitle: "Crypto Compound",
  description: "Project crypto portfolio growth with compound interest or staking reinvestment.",
  longDescription:
    "Compound interest is the most powerful force in wealth building — and it applies directly to crypto staking, yield farming, and lending. Enter your starting balance, APY, and time period to see how reinvested rewards grow your holdings exponentially.",
  category: "finance",
  keywords: ["crypto compound interest", "crypto compound calculator", "DeFi compound", "staking compound interest", "crypto yield calculator"],
  inputs: [
    { type: "number", key: "principal", label: "Starting Balance ($)", defaultValue: 10000, min: 1, step: 100, placeholder: "10000" },
    { type: "number", key: "apy", label: "Annual Yield / APY (%)", defaultValue: 12, min: 0.01, max: 500, step: 0.1, placeholder: "12" },
    { type: "number", key: "years", label: "Time Period (years)", defaultValue: 5, min: 1, max: 30, step: 1, placeholder: "5" },
    { type: "number", key: "monthlyContribution", label: "Monthly Contribution ($)", defaultValue: 200, min: 0, step: 50, placeholder: "200" },
  ],
  compute(values: InputValues): ComputeResult {
    const principal = Number(values.principal);
    const apy = Number(values.apy) / 100;
    const years = Number(values.years);
    const monthly = Number(values.monthlyContribution);
    if ([principal, apy, years, monthly].some(isNaN) || principal <= 0 || years < 1) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const n = 12;
    const r = apy / n;
    const t = years * n;
    const futureValuePrincipal = principal * Math.pow(1 + r, t);
    const futureValueContributions = monthly > 0 ? monthly * ((Math.pow(1 + r, t) - 1) / r) : 0;
    const totalValue = futureValuePrincipal + futureValueContributions;
    const totalContributed = principal + monthly * t;
    const totalInterest = totalValue - totalContributed;
    return {
      outputs: [
        { key: "totalValue", label: "Final Portfolio Value ($)", value: Number(totalValue.toFixed(2)), format: "number", highlight: true },
        { key: "totalInterest", label: "Interest / Yield Earned ($)", value: Number(totalInterest.toFixed(2)), format: "number" },
        { key: "totalContributed", label: "Total Contributed ($)", value: Number(totalContributed.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Uses monthly compounding formula for both the starting principal and regular contributions. Total = Principal × (1 + r)^t + Monthly × ((1 + r)^t - 1) / r, where r = APY/12.",
  examples: [
    {
      title: "DeFi Yield Farming",
      description: "$10,000 at 12% APY for 5 years, adding $200/month.",
      inputs: { principal: 10000, apy: 12, years: 5, monthlyContribution: 200 },
      result: "Final value: ~$41,570 on $22,000 contributed.",
    },
    {
      title: "Staking Only",
      description: "$50,000 staked at 5% APY for 10 years, no extra contributions.",
      inputs: { principal: 50000, apy: 5, years: 10, monthlyContribution: 0 },
      result: "Final value: ~$81,445.",
    },
  ],
  faqs: [
    { question: "What is APY in crypto?", answer: "APY (Annual Percentage Yield) includes compounding. If staking rewards are reinvested, your effective return compounds over time." },
    { question: "Is 12% APY realistic in crypto?", answer: "Some staking and DeFi protocols offer 5–20% APY, but higher yields typically carry higher smart contract or protocol risk." },
    { question: "How does this differ from TradFi compound interest?", answer: "The math is identical — only the asset class and APY levels differ. Crypto yields tend to be higher but more volatile and risky." },
  ],
  relatedSlugs: ["crypto-staking-rewards-calculator", "compound-interest", "ethereum-staking-calculator"],
};

export default def;
