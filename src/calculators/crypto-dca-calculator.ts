import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "crypto-dca-calculator",
  title: "Crypto DCA Calculator",
  shortTitle: "Crypto DCA",
  description: "Calculate the outcome of dollar-cost averaging into cryptocurrency.",
  longDescription:
    "Dollar-cost averaging (DCA) means investing a fixed amount at regular intervals regardless of price. It reduces the impact of volatility by averaging your entry price over time. This calculator shows your total investment, average buy price, and potential profit.",
  category: "finance",
  keywords: ["crypto DCA calculator", "dollar cost averaging crypto", "bitcoin DCA", "DCA strategy calculator", "average crypto price"],
  inputs: [
    { type: "number", key: "periodicAmount", label: "Amount Per Purchase ($)", defaultValue: 100, min: 1, step: 10, placeholder: "100" },
    { type: "number", key: "purchases", label: "Number of Purchases", defaultValue: 12, min: 1, step: 1, placeholder: "12" },
    { type: "number", key: "avgBuyPrice", label: "Average Buy Price ($)", defaultValue: 45000, min: 0.000001, step: 1, placeholder: "45000" },
    { type: "number", key: "currentPrice", label: "Current Price ($)", defaultValue: 65000, min: 0.000001, step: 1, placeholder: "65000" },
  ],
  compute(values: InputValues): ComputeResult {
    const periodicAmount = Number(values.periodicAmount);
    const purchases = Number(values.purchases);
    const avgBuyPrice = Number(values.avgBuyPrice);
    const currentPrice = Number(values.currentPrice);
    if ([periodicAmount, purchases, avgBuyPrice, currentPrice].some(isNaN) || avgBuyPrice <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const totalInvested = periodicAmount * purchases;
    const coinsAccumulated = totalInvested / avgBuyPrice;
    const currentValue = coinsAccumulated * currentPrice;
    const profit = currentValue - totalInvested;
    const roi = (profit / totalInvested) * 100;
    return {
      outputs: [
        { key: "currentValue", label: "Current Portfolio Value ($)", value: Number(currentValue.toFixed(2)), format: "number", highlight: true },
        { key: "profit", label: "Total Profit / Loss ($)", value: Number(profit.toFixed(2)), format: "number" },
        { key: "roi", label: "ROI (%)", value: Number(roi.toFixed(2)), format: "number" },
        { key: "coinsAccumulated", label: "Coins Accumulated", value: Number(coinsAccumulated.toFixed(8)), format: "number" },
        { key: "totalInvested", label: "Total Invested ($)", value: Number(totalInvested.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Multiplies periodic amount by number of purchases for total invested. Divides total by average buy price to get coins held. Multiplies coins by current price for current value. ROI = (Profit / Total Invested) × 100.",
  examples: [
    {
      title: "Monthly BTC DCA",
      description: "$100/month for 12 months, avg buy $45,000, BTC now $65,000.",
      inputs: { periodicAmount: 100, purchases: 12, avgBuyPrice: 45000, currentPrice: 65000 },
      result: "Invested $1,200 — now worth ~$1,733 — ROI ~44%.",
    },
    {
      title: "Weekly ETH DCA",
      description: "$50/week for 52 weeks, avg buy $2,000, ETH now $3,500.",
      inputs: { periodicAmount: 50, purchases: 52, avgBuyPrice: 2000, currentPrice: 3500 },
      result: "Invested $2,600 — now worth ~$4,550 — ROI ~75%.",
    },
  ],
  faqs: [
    { question: "Why use DCA instead of lump sum?", answer: "DCA reduces the risk of buying at the top. You average in over time rather than betting on a single entry point." },
    { question: "How often should I DCA?", answer: "Weekly or monthly are the most popular frequencies. More frequent purchases reduce volatility impact but may increase fees." },
    { question: "Does DCA guarantee profit?", answer: "No — if the asset price falls below your average buy price, you will be at a loss. DCA reduces risk but does not eliminate it." },
  ],
  relatedSlugs: ["crypto-profit-calculator", "crypto-roi-calculator", "compound-interest"],
};

export default def;
