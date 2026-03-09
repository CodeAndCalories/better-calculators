import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "stock-profit-calculator",
  title: "Stock Profit Calculator",
  shortTitle: "Stock Profit",
  description: "Calculate your profit or loss from a stock trade.",
  longDescription: "Enter the number of shares, buy price, and sell price to instantly calculate your net profit or loss from a stock trade — before tax and fees.",
  category: "finance",
  keywords: ["stock profit", "stock gain", "trade profit calculator", "buy sell stock"],
  inputs: [
    { type: "number", key: "shares", label: "Number of Shares", defaultValue: 100, min: 1, step: 1, placeholder: "100" },
    { type: "number", key: "buyPrice", label: "Buy Price per Share ($)", defaultValue: 50, min: 0, step: 0.01, placeholder: "50" },
    { type: "number", key: "sellPrice", label: "Sell Price per Share ($)", defaultValue: 75, min: 0, step: 0.01, placeholder: "75" },
  ],
  compute(values: InputValues): ComputeResult {
    const shares = Number(values.shares);
    const buyPrice = Number(values.buyPrice);
    const sellPrice = Number(values.sellPrice);
    if ([shares, buyPrice, sellPrice].some(isNaN) || shares <= 0) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const profit = (sellPrice - buyPrice) * shares;
    const percentGain = buyPrice > 0 ? ((sellPrice - buyPrice) / buyPrice) * 100 : 0;
    return {
      outputs: [
        { key: "profit", label: "Net Profit / Loss ($)", value: Number(profit.toFixed(2)), format: "number", highlight: true },
        { key: "percentGain", label: "Percentage Gain / Loss (%)", value: Number(percentGain.toFixed(2)), format: "number" },
      ],
    };
  },
  howItWorks: "Subtracts the total buy cost (shares × buy price) from total sell value (shares × sell price). Negative results indicate a loss.",
  examples: [
    {
      title: "Profitable Trade",
      description: "100 shares bought at $50, sold at $75.",
      inputs: { shares: 100, buyPrice: 50, sellPrice: 75 },
      result: "Profit: $2,500 (50% gain).",
    },
    {
      title: "Loss Trade",
      description: "50 shares bought at $200, sold at $180.",
      inputs: { shares: 50, buyPrice: 200, sellPrice: 180 },
      result: "Loss: -$1,000 (-10%).",
    },
  ],
  faqs: [
    { question: "Does this include broker fees?", answer: "No. This calculates gross profit only. Subtract your broker commissions for net profit." },
    { question: "How is percentage gain calculated?", answer: "((Sell price - Buy price) / Buy price) × 100." },
    { question: "Can I use this for ETFs or mutual funds?", answer: "Yes — any investment with a per-unit buy and sell price works." },
  ],
  relatedSlugs: ["roi-calculator", "compound-interest"],
};

export default def;
