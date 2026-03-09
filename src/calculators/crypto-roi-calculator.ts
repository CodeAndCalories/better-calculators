import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-roi-calculator",
  title: "Crypto ROI Calculator",
  shortTitle: "Crypto ROI",
  description: "Calculate the return on investment (ROI) for any crypto trade.",
  longDescription:
    "ROI measures how much your investment has grown relative to its cost. Enter your initial investment and current value to calculate ROI percentage — useful for tracking Bitcoin, Ethereum, altcoins, or any crypto position.",
  category: "finance",
  keywords: ["crypto ROI calculator", "cryptocurrency return on investment", "bitcoin ROI", "crypto investment return", "crypto gains"],
  inputs: [
    { type: "number", key: "initialInvestment", label: "Initial Investment ($)", defaultValue: 1000, min: 0.01, step: 10, placeholder: "1000" },
    { type: "number", key: "currentValue", label: "Current Value ($)", defaultValue: 4500, min: 0, step: 10, placeholder: "4500" },
    { type: "number", key: "fees", label: "Total Fees Paid ($)", defaultValue: 20, min: 0, step: 1, placeholder: "20" },
  ],
  compute(values: InputValues): ComputeResult {
    const initialInvestment = Number(values.initialInvestment);
    const currentValue = Number(values.currentValue);
    const fees = Number(values.fees);
    if ([initialInvestment, currentValue, fees].some(isNaN) || initialInvestment <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const netProfit = currentValue - initialInvestment - fees;
    const roi = (netProfit / initialInvestment) * 100;
    const multiplier = currentValue / initialInvestment;
    return {
      outputs: [
        { key: "roi", label: "ROI (%)", value: Number(roi.toFixed(2)), format: "number", highlight: true },
        { key: "netProfit", label: "Net Profit / Loss ($)", value: Number(netProfit.toFixed(2)), format: "number" },
        { key: "multiplier", label: "Return Multiplier (x)", value: Number(multiplier.toFixed(4)), format: "number" },
      ],
    };
  },
  howItWorks:
    "ROI = ((Current Value - Initial Investment - Fees) / Initial Investment) × 100. The multiplier shows how many times your investment has grown (e.g., 4.5x).",
  examples: [
    {
      title: "4x Return",
      description: "$1,000 invested, now worth $4,500, $20 in fees.",
      inputs: { initialInvestment: 1000, currentValue: 4500, fees: 20 },
      result: "ROI: 348% — Net profit: $3,480 — 4.5x return.",
    },
    {
      title: "Loss Scenario",
      description: "$2,000 invested in altcoin, now worth $800.",
      inputs: { initialInvestment: 2000, currentValue: 800, fees: 30 },
      result: "ROI: -61.5% — Net loss: -$1,230.",
    },
  ],
  faqs: [
    { question: "What is a good crypto ROI?", answer: "There is no universal answer — Bitcoin has returned 100x+ over a decade. Short-term 10–50% is considered strong for most assets." },
    { question: "How is crypto ROI different from stock ROI?", answer: "The math is identical. Crypto tends to have higher volatility, meaning both larger gains and losses are more common." },
    { question: "What fees should I include?", answer: "Include exchange trading fees, withdrawal fees, and gas fees paid during the investment period." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "roi-calculator", "crypto-dca-calculator"],
};

export default def;
